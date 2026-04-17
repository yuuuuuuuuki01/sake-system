"""H5TKI.MST (仕入先マスタ) のデコーダ。

sake_suppliers テーブルの _raw_b64 から仕入先レコードをデコードし、
Supabase の suppliers テーブルに UPSERT する。

ローカルMSTファイル不要 — Supabase上のrawデータから直接デコード。
"""
from __future__ import annotations

import base64
import json
import logging
import sys
import uuid
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import requests

SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"

RECORD_MARKER = b"\x09\x2e\x38\x09"


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("decoder_suppliers")
    logger.setLevel(logging.INFO)
    logger.handlers.clear()
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(handler)
    fh = logging.FileHandler(LOG_PATH, encoding="utf-8")
    fh.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(fh)
    return logger


def load_config() -> dict[str, Any]:
    path = LOCAL_CONFIG_PATH if LOCAL_CONFIG_PATH.exists() else CONFIG_PATH
    with path.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def decode_cp932(raw: bytes) -> str:
    return raw.decode("cp932", errors="replace").strip()


def fetch_raw_records(config: dict[str, Any], logger: logging.Logger) -> list[dict[str, Any]]:
    """sake_suppliers テーブルから全rawレコードを取得。"""
    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update({
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Accept": "application/json",
    })

    all_rows: list[dict[str, Any]] = []
    offset = 0
    batch = 1000
    while True:
        resp = session.get(
            f"{url}/rest/v1/sake_suppliers",
            params={
                "select": "_record_index,_raw_b64,_record_size",
                "order": "_record_index.asc",
                "limit": str(batch),
                "offset": str(offset),
            },
            timeout=60,
        )
        resp.raise_for_status()
        rows = resp.json()
        if not rows:
            break
        all_rows.extend(rows)
        offset += len(rows)
        logger.info("Fetched %d raw records (total: %d)", len(rows), len(all_rows))
        if len(rows) < batch:
            break

    return all_rows


def decode_suppliers(raw_rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """rawレコードから仕入先データをデコード。"""
    suppliers: list[dict[str, Any]] = []
    seen_codes: set[str] = set()

    for row in raw_rows:
        raw_b64 = row.get("_raw_b64", "")
        if not raw_b64:
            continue

        slot_data = base64.b64decode(raw_b64)

        search_from = 0
        while True:
            marker_pos = slot_data.find(RECORD_MARKER, search_from)
            if marker_pos < 0:
                break

            data_start = marker_pos + len(RECORD_MARKER)
            remaining = len(slot_data) - data_start

            if remaining < 50:
                search_from = marker_pos + 1
                continue

            code_bytes = slot_data[data_start : data_start + 7]
            code_str = code_bytes.decode("ascii", errors="replace").strip()

            if not code_str or not code_str.replace(" ", "").isdigit():
                search_from = marker_pos + 1
                continue

            code = code_str.strip()
            if code in seen_codes:
                search_from = marker_pos + 1
                continue

            try:
                rec = _extract_fields(slot_data, data_start, remaining, code)
            except Exception:
                search_from = marker_pos + 1
                continue

            if rec:
                seen_codes.add(code)
                suppliers.append(rec)

            search_from = marker_pos + 1

    return suppliers


def _extract_fields(slot_data: bytes, start: int, remaining: int, code: str) -> dict[str, Any] | None:
    """仕入先フィールドを抽出。

    H5TKI.MSTはSHTKI.MSTと類似構造を想定:
      0:   仕入先コード (7 bytes)
      7:   カナ (10 bytes)
     17:   略称 (26 bytes)
     43:   仕入先名 (40 bytes)
     83:   郵便番号 (8 bytes)
     91:   住所1 (40 bytes)
    131:   住所2 (32 bytes)
    171:   電話番号 (12 bytes)
    184:   FAX (12 bytes)
    """
    if remaining < 50:
        return None

    def s(offset: int, length: int) -> bytes:
        return slot_data[start + offset : start + offset + length]

    kana = decode_cp932(s(7, 10))
    short_name = decode_cp932(s(17, 26))
    name = decode_cp932(s(43, 40)) if remaining > 82 else ""

    if not name and not short_name:
        return None

    postal_code = decode_cp932(s(83, 8)) if remaining > 90 else None
    address1 = decode_cp932(s(91, 40)) if remaining > 130 else None
    address2 = decode_cp932(s(131, 32)) if remaining > 162 else None
    phone = decode_cp932(s(171, 12)) if remaining > 182 else None
    fax = decode_cp932(s(184, 12)) if remaining > 195 else None

    return {
        "id": str(uuid.uuid5(SAKE_UUID_NS, f"supplier:{code}")),
        "legacy_supplier_code": code,
        "name": name or short_name,
        "kana_name": kana or None,
        "postal_code": postal_code or None,
        "address1": address1 or None,
        "address2": address2 or None,
        "phone": phone or None,
        "fax": fax or None,
        "is_active": True,
        "updated_at": datetime.now(tz=UTC).isoformat(),
    }


def upsert_to_supabase(
    config: dict[str, Any],
    suppliers: list[dict[str, Any]],
    logger: logging.Logger,
    dry_run: bool = False,
) -> int:
    if not suppliers:
        return 0

    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update({
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,missing=default",
    })

    batch_size = 200
    total = 0
    for i in range(0, len(suppliers), batch_size):
        batch = suppliers[i : i + batch_size]
        if dry_run:
            logger.info("[DRY-RUN] would upsert %d suppliers (sample: %s)", len(batch), batch[0]["legacy_supplier_code"])
        else:
            resp = session.post(
                f"{url}/rest/v1/suppliers?on_conflict=legacy_supplier_code",
                json=batch,
                timeout=60,
            )
            resp.raise_for_status()
        total += len(batch)
        logger.info("UPSERT suppliers: batch=%d total=%d", len(batch), total)

    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="sake_suppliers → suppliers テーブルデコーダ")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--show-sample", type=int, default=0)
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    logger.info("Fetching raw records from sake_suppliers...")
    raw_rows = fetch_raw_records(config, logger)
    logger.info("Fetched %d raw records", len(raw_rows))

    suppliers = decode_suppliers(raw_rows)
    logger.info("Decoded: %d unique suppliers", len(suppliers))

    if args.show_sample and suppliers:
        for s in suppliers[: args.show_sample]:
            logger.info("  %s | %s | %s | %s", s["legacy_supplier_code"], s["kana_name"], s["name"], s["address1"])

    if not suppliers:
        logger.warning("No suppliers decoded")
        return 1

    total = upsert_to_supabase(config, suppliers, logger, dry_run=args.dry_run)
    logger.info("Done: %d suppliers upserted", total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
