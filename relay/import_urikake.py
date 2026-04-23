"""売掛金元帳CSV → sales_document_headers / sales_document_lines に投入。

Z:\売掛金元帳.csv を読み込み、伝票ヘッダと明細をSupabaseにUPSERT。
ファイルのmtimeチェックで変更時のみ実行。

使い方:
  python import_urikake.py          # 変更時のみ実行
  python import_urikake.py --force   # 強制実行
"""
from __future__ import annotations

import csv
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
CHECKPOINT_PATH = BASE_DIR / ".urikake_checkpoint.json"
CSV_PATH = Path(r"Z:\売掛金元帳.csv")


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("import_urikake")
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


def clean(v: str) -> str | None:
    v = (v or "").strip().replace("\x00", "")
    return v if v else None


def to_int(v: str) -> int | None:
    try:
        return int(v) if v and v.strip() else None
    except Exception:
        return None


def to_float(v: str) -> float | None:
    try:
        f = float(v)
        return f if f != 0 else None
    except Exception:
        return None


def parse_date(v: str) -> str | None:
    """'2026/4/3' → '2026-04-03'"""
    if not v or not v.strip():
        return None
    parts = v.strip().split("/")
    if len(parts) == 3:
        try:
            return f"{int(parts[0]):04d}-{int(parts[1]):02d}-{int(parts[2]):02d}"
        except ValueError:
            return None
    return None


def should_run(force: bool) -> bool:
    if force:
        return True
    if not CSV_PATH.exists():
        return False
    current_mtime = CSV_PATH.stat().st_mtime
    if CHECKPOINT_PATH.exists():
        prev = json.loads(CHECKPOINT_PATH.read_text())
        if prev.get("mtime") == current_mtime:
            return False
    return True


def save_checkpoint() -> None:
    if CSV_PATH.exists():
        CHECKPOINT_PATH.write_text(json.dumps({"mtime": CSV_PATH.stat().st_mtime}))


def parse_csv(logger: logging.Logger) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    """CSVを解析して (headers, lines) を返す。"""
    headers: dict[str, dict[str, Any]] = {}
    lines: list[dict[str, Any]] = []
    line_counts: dict[str, int] = {}

    with open(CSV_PATH, "r", encoding="cp932", errors="replace") as f:
        reader = csv.reader(f)
        next(reader)  # 期間行
        next(reader)  # ヘッダ行

        for row in reader:
            if len(row) < 18:
                continue
            cust_code = clean(row[0])
            cust_name = clean(row[1])
            sale_date = parse_date(row[2])
            doc_no = clean(row[3])
            trade_code = clean(row[4])
            trade_name = clean(row[5])
            prod_code = clean(row[6])
            prod_name = clean(row[7])
            total_qty = to_int(row[13])
            bara_count = to_int(row[12])
            unit_price = to_int(row[14])
            sales_amount = to_int(row[15])
            payment_amount = to_int(row[16])
            remarks = clean(row[18]) if len(row) > 18 else None

            if not doc_no or not doc_no.isdigit():
                continue
            if not cust_code:
                continue

            # 伝票ヘッダ集約
            if doc_no not in headers:
                headers[doc_no] = {
                    "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_header:{doc_no}")),
                    "legacy_document_no": doc_no,
                    "document_no": doc_no,
                    "sales_date": sale_date,
                    "document_date": sale_date,
                    "legacy_customer_code": cust_code,
                    "customer_name": cust_name,
                    "total_amount": 0,
                    "updated_at": datetime.now(tz=UTC).isoformat(),
                }
            if sales_amount:
                headers[doc_no]["total_amount"] = (headers[doc_no]["total_amount"] or 0) + sales_amount

            # 明細
            line_counts[doc_no] = line_counts.get(doc_no, 0) + 1
            line_no = line_counts[doc_no]

            lines.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_line:{doc_no}:{line_no}")),
                "legacy_document_no": doc_no,
                "document_no": doc_no,
                "line_no": line_no,
                "legacy_product_code": prod_code,
                "product_name": prod_name,
                "quantity": total_qty or bara_count or 1,
                "unit_price": unit_price,
                "line_amount": sales_amount or 0,
                "amount": sales_amount or 0,
                "note": f"date:{sale_date} cust:{cust_code} type:{trade_code}({trade_name}) src:csv",
            })

    return list(headers.values()), lines


def fetch_existing_header_ids(session: requests.Session, url: str) -> dict[str, str]:
    """既存の sales_document_headers の (legacy_document_no → id) を取得。
    id の上書きによる FK 違反を防ぐため、既存行には元の id を使う。
    """
    mapping: dict[str, str] = {}
    limit = 1000
    offset = 0
    while True:
        resp = session.get(
            f"{url}/rest/v1/sales_document_headers",
            params={"select": "legacy_document_no,id", "limit": limit, "offset": offset},
            timeout=60,
        )
        if not resp.ok:
            break
        rows = resp.json()
        for row in rows:
            mapping[row["legacy_document_no"]] = row["id"]
        if len(rows) < limit:
            break
        offset += limit
    return mapping


def upsert_batch(session: requests.Session, url: str, table: str, conflict: str,
                 records: list[dict[str, Any]], logger: logging.Logger) -> int:
    total = 0
    for i in range(0, len(records), 200):
        batch = records[i : i + 200]
        resp = session.post(
            f"{url}/rest/v1/{table}?on_conflict={conflict}",
            json=batch, timeout=60,
        )
        if not resp.ok:
            logger.error("UPSERT %s error: %s %s", table, resp.status_code, resp.text[:200])
            # 1件ずつリトライ
            for rec in batch:
                try:
                    session.post(
                        f"{url}/rest/v1/{table}?on_conflict={conflict}",
                        json=[rec], timeout=30,
                    ).raise_for_status()
                    total += 1
                except Exception:
                    pass
        else:
            total += len(batch)
    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="売掛金元帳CSV → 売上伝票インポート")
    parser.add_argument("--force", action="store_true", help="変更チェックをスキップ")
    args = parser.parse_args()

    logger = setup_logging()

    if not CSV_PATH.exists():
        logger.info("売掛金元帳CSVが見つかりません: %s", CSV_PATH)
        return 0

    if not should_run(args.force):
        logger.info("売掛金元帳CSV変更なし — スキップ")
        return 0

    logger.info("売掛金元帳CSVインポート開始: %s", CSV_PATH)

    headers, lines = parse_csv(logger)
    logger.info("解析完了: ヘッダ%d件, 明細%d件", len(headers), len(lines))

    if not headers:
        logger.warning("有効な伝票データなし")
        return 1

    config = load_config()
    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update({
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,missing=default",
    })

    # 既存レコードのIDを取得し、id変更によるFK違反を防ぐ
    logger.info("既存ヘッダID取得中...")
    existing_ids = fetch_existing_header_ids(session, url)
    logger.info("既存ヘッダ: %d件", len(existing_ids))
    for h in headers:
        if h["legacy_document_no"] in existing_ids:
            h["id"] = existing_ids[h["legacy_document_no"]]

    h_count = upsert_batch(session, url, "sales_document_headers", "id", headers, logger)
    logger.info("ヘッダ upserted: %d/%d", h_count, len(headers))

    l_count = upsert_batch(session, url, "sales_document_lines", "id", lines, logger)
    logger.info("明細 upserted: %d/%d", l_count, len(lines))

    save_checkpoint()
    logger.info("売掛金元帳インポート完了")
    return 0


if __name__ == "__main__":
    sys.exit(main())
