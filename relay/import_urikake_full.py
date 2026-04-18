"""売掛金元帳CSV 全件インポーター。

15年分の売掛金元帳CSVをsales_document_linesにインポート。
伝票番号+行番号をキーにupsert。バイナリデコーダとは別のIDネームスペースを使用。

CSVカラム:
  0: 得意先コード, 1: 得意先名, 2: 計上日, 3: 伝票番号,
  4: 取引区分, 5: 取引区分名, 6: 商品コード, 7: 商品名,
  8: 容量, 9: アル分, 10: 入数, 11: ケース数, 12: バラ数,
  13: 総本数, 14: 単価, 15: 売上金額, 16: 入金金額,
  17: 売掛残高, 18: 摘要
"""
from __future__ import annotations

import csv
import json
import logging
import sys
import uuid
from datetime import datetime, UTC
from pathlib import Path
from typing import Any

import requests

SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("import_urikake_full")
    logger.setLevel(logging.INFO)
    logger.handlers.clear()
    h = logging.StreamHandler()
    h.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(h)
    fh = logging.FileHandler(LOG_PATH, encoding="utf-8")
    fh.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(fh)
    return logger


def load_config() -> dict[str, Any]:
    path = LOCAL_CONFIG_PATH if LOCAL_CONFIG_PATH.exists() else CONFIG_PATH
    with path.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def parse_date(date_str: str) -> str | None:
    """'2026/4/3' → '2026-04-03'"""
    try:
        parts = date_str.split("/")
        return f"{int(parts[0]):04d}-{int(parts[1]):02d}-{int(parts[2]):02d}"
    except (ValueError, IndexError):
        return None


def parse_csv(csv_path: Path, logger: logging.Logger) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    """CSVを読み込み、ヘッダーと明細のリストを返す。"""
    headers: dict[str, dict[str, Any]] = {}
    lines: list[dict[str, Any]] = []
    line_counts: dict[str, int] = {}

    with csv_path.open("r", encoding="cp932", errors="replace") as f:
        next(f)  # 期間行スキップ
        reader = csv.reader(f)
        next(reader, None)  # ヘッダー行スキップ

        for row in reader:
            if len(row) < 16:
                continue
            date_str = row[2].strip()
            if not date_str or "/" not in date_str:
                continue
            doc_no = row[3].strip()
            if not doc_no or not doc_no.isdigit():
                continue

            cust_code = row[0].strip()
            cust_name = row[1].strip()
            trade_code = row[4].strip()
            trade_name = row[5].strip()
            prod_code = row[6].strip()
            prod_name = row[7].strip()
            sales_date = parse_date(date_str)
            if not sales_date:
                continue

            try:
                qty = int(row[13].strip()) if row[13].strip() else 0
                unit_price = int(row[14].strip()) if row[14].strip() else 0
                amount = int(row[15].strip()) if row[15].strip() else 0
            except ValueError:
                continue

            # ヘッダー集約
            if doc_no not in headers:
                headers[doc_no] = {
                    "id": str(uuid.uuid5(SAKE_UUID_NS, f"csv_header:{doc_no}")),
                    "legacy_document_no": doc_no,
                    "document_no": doc_no,
                    "sales_date": sales_date,
                    "document_date": sales_date,
                    "legacy_customer_code": cust_code,
                    "customer_name": cust_name,
                    "total_amount": 0,
                    "updated_at": datetime.now(tz=UTC).isoformat(),
                }
            if trade_code in ("500", "550", "560", "580"):
                headers[doc_no]["total_amount"] += amount

            # 明細
            line_counts[doc_no] = line_counts.get(doc_no, 0) + 1
            line_no = line_counts[doc_no]

            lines.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"csv_line:{doc_no}:{line_no}")),
                "legacy_document_no": doc_no,
                "document_no": doc_no,
                "line_no": line_no,
                "legacy_product_code": prod_code or None,
                "product_name": prod_name or None,
                "quantity": qty,
                "unit_price": unit_price,
                "line_amount": amount,
                "amount": amount,
                "note": f"date:{sales_date} cust:{cust_code} type:{trade_code}({trade_name}) src:csv",
            })

    header_list = list(headers.values())
    logger.info("Parsed CSV: %d headers, %d lines", len(header_list), len(lines))
    return header_list, lines


def upsert_batch(session: requests.Session, url: str, table: str, records: list[dict[str, Any]], conflict: str, logger: logging.Logger, dry_run: bool) -> int:
    total = 0
    for i in range(0, len(records), 500):
        batch = records[i : i + 500]
        if dry_run:
            logger.info("[DRY-RUN] %s: %d records", table, len(batch))
        else:
            resp = session.post(
                f"{url}/rest/v1/{table}?on_conflict={conflict}",
                json=batch,
                timeout=120,
            )
            if not resp.ok:
                logger.error("UPSERT %s error: %s %s", table, resp.status_code, resp.text[:200])
                # 1件ずつリトライ
                for rec in batch:
                    r2 = session.post(f"{url}/rest/v1/{table}?on_conflict={conflict}", json=[rec], timeout=30)
                    if r2.ok:
                        total += 1
                continue
        total += len(batch)
        if total % 10000 == 0:
            logger.info("UPSERT %s: %d/%d", table, total, len(records))
    return total


def main() -> int:
    import argparse
    parser = argparse.ArgumentParser(description="売掛金元帳CSV → 全件インポート")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--csv-path", default=None, help="CSVファイルパス（デフォルト: Z:\\売掛金元帳.csv）")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    csv_path = Path(args.csv_path) if args.csv_path else Path(config["z_drive_path"]) / "売掛金元帳.csv"
    if not csv_path.exists():
        logger.error("CSV not found: %s", csv_path)
        return 1

    logger.info("Importing: %s", csv_path)
    header_list, lines = parse_csv(csv_path, logger)

    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update({
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,missing=default",
    })

    h_total = upsert_batch(session, url, "sales_document_headers", header_list, "id", logger, args.dry_run)
    logger.info("Headers upserted: %d", h_total)

    l_total = upsert_batch(session, url, "sales_document_lines", lines, "id", logger, args.dry_run)
    logger.info("Lines upserted: %d", l_total)

    logger.info("Done: %d headers, %d lines", h_total, l_total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
