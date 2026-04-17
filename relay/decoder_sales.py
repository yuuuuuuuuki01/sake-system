"""SHDEN.DAT (売上伝票ヘッダ) のデコーダ。

sake_sales_document_headers の _raw_b64 からデータレコードを抽出し、
sales_document_headers テーブルに UPSERT する。

SHDEN.DATはB-Tree構造でデータノードは全体の0.02%程度。
データノードの判定: @234に日付(YYYYMMDD)があるレコード。

フィールドマップ (確定済み):
  @50:  担当コード (3B ASCII)
  @234: 計上日 (8B ASCII YYYYMMDD)
  @260: 請求日 (8B ASCII YYYYMMDD)
  @276: 締日 (2B ASCII)
  @330: 得意先コード (6B ASCII)
  @337: 得意先名 (40B CP932)
  @390: 備考 (CP932)
  @444: 伝票番号 (6B+ ASCII)
"""
from __future__ import annotations

import base64
import json
import logging
import re
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


def decode_cp932_clean(raw: bytes) -> str:
    return raw.decode("cp932", errors="replace").replace("\x00", "").strip()


def fetch_and_decode(config: dict[str, Any], logger: logging.Logger, limit: int = 0) -> list[dict[str, Any]]:
    """Supabase上のrawレコードからデータノードを抽出してデコード。"""
    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update({
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Accept": "application/json",
    })

    headers_list: list[dict[str, Any]] = []
    seen_docs: set[str] = set()
    offset = 0
    batch = 200  # 大きなテーブルなので小バッチ

    while True:
        resp = session.get(
            f"{url}/rest/v1/sake_sales_document_headers",
            params={
                "select": "_record_index,_raw_b64",
                "order": "_source_file.asc,_record_index.asc",
                "limit": str(batch),
                "offset": str(offset),
            },
            timeout=120,
        )
        resp.raise_for_status()
        rows = resp.json()
        if not rows:
            break

        for row in rows:
            raw_b64 = row.get("_raw_b64", "")
            if not raw_b64:
                continue

            rec = base64.b64decode(raw_b64)
            if len(rec) < 450:
                continue

            # データノード判定: @234に日付(YYYYMMDD)があるか
            date_raw = rec[234:242].decode("ascii", errors="replace").strip()
            if not (len(date_raw) == 8 and date_raw.isdigit() and date_raw[:4] in
                    ("2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027")):
                continue

            # フィールド抽出
            sales_date = f"{date_raw[:4]}-{date_raw[4:6]}-{date_raw[6:8]}"

            bill_raw = rec[260:268].decode("ascii", errors="replace").strip()
            bill_date = None
            if len(bill_raw) == 8 and bill_raw.isdigit():
                bill_date = f"{bill_raw[:4]}-{bill_raw[4:6]}-{bill_raw[6:8]}"

            staff_code = rec[50:53].decode("ascii", errors="replace").strip() or None
            closing_day = rec[276:278].decode("ascii", errors="replace").strip() or None

            cust_code = rec[330:336].decode("ascii", errors="replace").strip()
            cust_name = decode_cp932_clean(rec[337:377])
            remarks = decode_cp932_clean(rec[390:430])
            doc_no = rec[444:456].decode("ascii", errors="replace").strip()

            # 得意先コードが数字でないものはスキップ
            if not cust_code or not re.match(r"^\d+$", cust_code):
                continue

            # 伝票番号がなければレコードインデックスを使う
            if not doc_no or not doc_no.isdigit():
                doc_no = f"R{row['_record_index']}"

            if doc_no in seen_docs:
                continue
            seen_docs.add(doc_no)

            headers_list.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_header:{doc_no}")),
                "legacy_document_no": doc_no,
                "document_no": doc_no,
                "sales_date": sales_date,
                "document_date": bill_date or sales_date,
                "legacy_customer_code": cust_code.lstrip("0") or cust_code,
                "customer_name": cust_name or None,
                "staff_code": staff_code,
                "updated_at": datetime.now(tz=UTC).isoformat(),
            })

        offset += len(rows)
        if offset % 10000 == 0:
            logger.info("Scanned %d raw records, found %d sales headers", offset, len(headers_list))

        if limit and offset >= limit:
            break
        if len(rows) < batch:
            break

    return headers_list


def upsert_to_supabase(
    config: dict[str, Any],
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

    total = 0
    for i in range(0, len(records), 500):
        batch = records[i : i + 500]
        if dry_run:
            logger.info("[DRY-RUN] would upsert %d sales headers", len(batch))
        else:
            resp = session.post(
                f"{url}/rest/v1/sales_document_headers?on_conflict=legacy_document_no",
                json=batch,
                timeout=120,
            )
            resp.raise_for_status()
        total += len(batch)
        logger.info("UPSERT sales_headers: batch=%d total=%d", len(batch), total)

    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="SHDEN.DAT → sales_document_headers デコーダ")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--show-sample", type=int, default=0)
    parser.add_argument("--limit", type=int, default=0, help="スキャンするrawレコード数上限")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    logger.info("Decoding sales headers from sake_sales_document_headers...")
    headers = fetch_and_decode(config, logger, limit=args.limit)
    logger.info("Decoded: %d unique sales headers", len(headers))

    if args.show_sample and headers:
        for h in headers[: args.show_sample]:
            logger.info(
                "  doc=%s date=%s cust=%s name=%s",
                h["document_no"], h["sales_date"], h["legacy_customer_code"], h["customer_name"],
            )

    if not headers:
        logger.warning("No sales headers decoded")
        return 1

    total = upsert_to_supabase(config, headers, logger, dry_run=args.dry_run)
    logger.info("Done: %d sales headers upserted", total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
