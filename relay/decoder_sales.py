"""SHDEN.DAT / SHTOR.DAT (売上伝票ヘッダ・明細) のデコーダ。

sake_sales_document_headers / sake_sales_document_lines の _raw_b64 から
売上伝票をデコードし、sales_document_headers / sales_document_lines に UPSERT。

ローカルDATファイル不要 — Supabase上のrawデータから直接デコード。
"""
from __future__ import annotations

import base64
import json
import logging
import struct
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
    logger = logging.getLogger("decoder_sales")
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


def decode_cp932_or_none(raw: bytes) -> str | None:
    text = decode_cp932(raw)
    return text if text else None


def fetch_raw_records(
    config: dict[str, Any],
    table: str,
    logger: logging.Logger,
    limit: int = 0,
) -> list[dict[str, Any]]:
    """Supabase上のrawテーブルからレコードを取得。"""
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
            f"{url}/rest/v1/{table}",
            params={
                "select": "_record_index,_raw_b64,_record_size",
                "order": "_record_index.asc",
                "limit": str(batch),
                "offset": str(offset),
            },
            timeout=120,
        )
        resp.raise_for_status()
        rows = resp.json()
        if not rows:
            break
        all_rows.extend(rows)
        offset += len(rows)
        logger.info("Fetched %d raw records from %s (total: %d)", len(rows), table, len(all_rows))
        if len(rows) < batch:
            break
        if limit and len(all_rows) >= limit:
            all_rows = all_rows[:limit]
            break

    return all_rows


def decode_date_field(raw: bytes) -> str | None:
    """日付フィールド (8 bytes YYYYMMDD or packed) をデコード。"""
    text = raw.decode("ascii", errors="replace").strip()
    if len(text) == 8 and text.isdigit():
        y, m, d = text[:4], text[4:6], text[6:8]
        if 1990 <= int(y) <= 2099 and 1 <= int(m) <= 12 and 1 <= int(d) <= 31:
            return f"{y}-{m}-{d}"
    return None


def decode_sales_headers(raw_rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """sake_sales_document_headers の rawレコードをデコード。

    SHDEN.DAT レコード構造（推定）:
    Magic ISAM B-Tree形式。マーカー走査で実データを特定。
    ヘッダフィールド候補:
      0:  伝票番号 (7 bytes)
      7:  日付 (8 bytes YYYYMMDD)
     15:  得意先コード (7 bytes)
     22:  担当コード (2 bytes)
     24:  合計金額 (4 bytes int32)
    """
    headers: list[dict[str, Any]] = []
    seen_doc_nos: set[str] = set()

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

            if remaining < 30:
                search_from = marker_pos + 1
                continue

            def s(offset: int, length: int) -> bytes:
                return slot_data[data_start + offset : data_start + offset + length]

            # 伝票番号 (7 bytes)
            doc_no_raw = s(0, 7)
            doc_no = doc_no_raw.decode("ascii", errors="replace").strip()

            if not doc_no or not doc_no.replace(" ", "").isdigit():
                search_from = marker_pos + 1
                continue

            if doc_no in seen_doc_nos:
                search_from = marker_pos + 1
                continue

            # 日付 (8 bytes)
            sales_date = decode_date_field(s(7, 8)) if remaining > 14 else None

            # 得意先コード (7 bytes)
            customer_code = decode_cp932_or_none(s(15, 7)) if remaining > 21 else None

            # 担当コード (2 bytes)
            staff_code = decode_cp932_or_none(s(22, 2)) if remaining > 23 else None

            # 金額フィールド (int32)
            total_amount = None
            if remaining > 27:
                try:
                    amt = struct.unpack_from("<i", slot_data, data_start + 24)[0]
                    if 0 <= amt <= 99_999_999:
                        total_amount = amt
                except (struct.error, IndexError):
                    pass

            # 日付が取れないレコー��はスキップ（インデックスノードの可能性）
            if not sales_date:
                search_from = marker_pos + 1
                continue

            seen_doc_nos.add(doc_no)
            headers.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_header:{doc_no}")),
                "legacy_document_no": doc_no,
                "document_no": doc_no,
                "sales_date": sales_date,
                "legacy_customer_code": customer_code,
                "staff_code": staff_code,
                "total_amount": total_amount,
                "updated_at": datetime.now(tz=UTC).isoformat(),
            })

            search_from = marker_pos + 1

    return headers


def upsert_to_supabase(
    config: dict[str, Any],
    table: str,
    conflict_col: str,
    records: list[dict[str, Any]],
    logger: logging.Logger,
    dry_run: bool = False,
) -> int:
    if not records:
        return 0

    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update({
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,missing=default",
    })

    batch_size = 500
    total = 0
    for i in range(0, len(records), batch_size):
        batch = records[i : i + batch_size]
        if dry_run:
            logger.info("[DRY-RUN] would upsert %d to %s", len(batch), table)
        else:
            resp = session.post(
                f"{url}/rest/v1/{table}?on_conflict={conflict_col}",
                json=batch,
                timeout=120,
            )
            resp.raise_for_status()
        total += len(batch)
        logger.info("UPSERT %s: batch=%d total=%d", table, len(batch), total)

    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="売上伝票デコーダ (raw → 正規化)")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--show-sample", type=int, default=0)
    parser.add_argument("--limit", type=int, default=0, help="取得するrawレコード数上限 (0=全件)")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    # ── 売上伝票ヘッダ ──
    logger.info("Fetching raw sales headers from sake_sales_document_headers...")
    raw_headers = fetch_raw_records(config, "sake_sales_document_headers", logger, limit=args.limit)
    logger.info("Fetched %d raw header records", len(raw_headers))

    headers = decode_sales_headers(raw_headers)
    logger.info("Decoded: %d unique sales headers", len(headers))

    if args.show_sample and headers:
        for h in headers[: args.show_sample]:
            logger.info(
                "  %s | %s | customer=%s | amount=%s",
                h["document_no"], h["sales_date"], h["legacy_customer_code"], h["total_amount"],
            )

    if headers:
        total = upsert_to_supabase(
            config, "sales_document_headers", "legacy_document_no",
            headers, logger, dry_run=args.dry_run,
        )
        logger.info("Done headers: %d upserted", total)
    else:
        logger.warning("No sales headers decoded")

    return 0


if __name__ == "__main__":
    sys.exit(main())
