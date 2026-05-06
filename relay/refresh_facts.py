"""daily_sales_fact をPython側で集計してupsertする。

旧方式（RPC経由）は672K行のregex処理でタイムアウトしていた。
新方式: REST APIでsales_document_linesをページング取得 → Python集計 → batch upsert。
"""
from __future__ import annotations

import json
import logging
import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any

import requests

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"

NOTE_DATE_RE = re.compile(r"date:(\d{4}-\d{2}-\d{2})")
NOTE_CUST_RE = re.compile(r"cust:(\d+)")


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("refresh_facts")
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


def _session(config: dict[str, Any]) -> requests.Session:
    s = requests.Session()
    s.headers.update({
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type": "application/json",
    })
    return s


# ---------------------------------------------------------------------------
# Step 1: Fetch sales_document_lines and aggregate in Python
# ---------------------------------------------------------------------------

def fetch_and_aggregate(config: dict[str, Any],
                        logger: logging.Logger) -> list[dict[str, Any]]:
    """REST API でページング取得し、daily_sales_fact 相当の集計を行う。"""
    base = config["supabase_url"].rstrip("/")
    sess = _session(config)

    agg: dict[tuple[str, str, str], dict] = {}  # (date, cust, prod) -> {amt, qty, cnt}
    offset = 0
    page_size = 1000
    total_rows = 0

    while True:
        url = (f"{base}/rest/v1/sales_document_lines"
               f"?select=note,amount,quantity,legacy_product_code"
               f"&note=like.*src:diff*"
               f"&order=id"
               f"&limit={page_size}&offset={offset}")
        resp = sess.get(url, timeout=60)
        if not resp.ok:
            logger.error("Fetch error at offset %d: %s", offset, resp.text[:200])
            break
        rows = resp.json()
        if not rows:
            break

        for r in rows:
            note = r.get("note") or ""
            dm = NOTE_DATE_RE.search(note)
            cm = NOTE_CUST_RE.search(note)
            if not dm or not cm:
                continue
            sd = dm.group(1)
            cc = cm.group(1)
            prod = r.get("legacy_product_code") or "unknown"
            amt = r.get("amount") or 0
            qty = r.get("quantity") or 0

            key = (sd, cc, prod)
            if key not in agg:
                agg[key] = {"amt": 0, "qty": 0, "cnt": 0}
            agg[key]["amt"] += amt
            agg[key]["qty"] += qty
            agg[key]["cnt"] += 1

        total_rows += len(rows)
        offset += page_size
        if len(rows) < page_size:
            break

    logger.info("Fetched %d rows, aggregated into %d fact rows", total_rows, len(agg))

    facts = []
    for (sd, cc, prod), v in agg.items():
        facts.append({
            "sales_date": sd,
            "legacy_customer_code": cc,
            "legacy_product_code": prod,
            "sales_amount": v["amt"],
            "quantity": v["qty"],
            "document_count": v["cnt"],
        })
    return facts


# ---------------------------------------------------------------------------
# Step 2: Delete old facts and upsert new ones
# ---------------------------------------------------------------------------

def upsert_facts(config: dict[str, Any], facts: list[dict[str, Any]],
                 logger: logging.Logger) -> None:
    base = config["supabase_url"].rstrip("/")
    sess = _session(config)

    # Delete all existing facts
    logger.info("Deleting old daily_sales_fact rows...")
    resp = sess.delete(
        f"{base}/rest/v1/daily_sales_fact?sales_date=gte.2000-01-01",
        timeout=120,
    )
    if not resp.ok:
        logger.error("Delete failed: %s %s", resp.status_code, resp.text[:200])
        return
    logger.info("Deleted old facts")

    # Batch insert (delete already cleared the table)
    total = 0
    batch_size = 500
    for i in range(0, len(facts), batch_size):
        batch = facts[i:i + batch_size]
        url = f"{base}/rest/v1/daily_sales_fact"
        resp = sess.post(url, json=batch, timeout=120)
        if not resp.ok:
            logger.error("Upsert error at %d: %s %s",
                         i, resp.status_code, resp.text[:200])
        total += len(batch)

    logger.info("Upserted %d fact rows", total)


# ---------------------------------------------------------------------------
# Step 3: Refresh downstream (product_monthly_sales, safety_stock via RPC)
# ---------------------------------------------------------------------------

def sync_headers_from_lines(config: dict[str, Any],
                            logger: logging.Logger) -> None:
    """sales_document_lines の note から sales_document_headers を補完する。

    ダッシュボードの直近伝票表示はヘッダテーブルから取得するため、
    バイナリ由来のレコードからヘッダを生成して投入する。
    """
    import uuid
    SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")

    base = config["supabase_url"].rstrip("/")
    sess = _session(config)

    # 直近3ヶ月の lines から伝票情報を集約
    from datetime import date, timedelta
    cutoff = (date.today() - timedelta(days=90)).isoformat()
    inv_data: dict[str, dict] = {}
    offset = 0
    while True:
        url = (f"{base}/rest/v1/sales_document_lines"
               f"?select=document_no,note,amount"
               f"&note=like.*src:diff*"
               f"&note=like.*date:{cutoff[:4]}*"
               f"&order=id&limit=1000&offset={offset}")
        resp = sess.get(url, timeout=60)
        if not resp.ok or not resp.json():
            break
        for r in resp.json():
            inv = r["document_no"]
            note = r.get("note") or ""
            dm = NOTE_DATE_RE.search(note)
            cm = NOTE_CUST_RE.search(note)
            if dm and cm:
                if inv not in inv_data:
                    inv_data[inv] = {"date": dm.group(1), "cust": cm.group(1),
                                     "total": 0}
                inv_data[inv]["total"] += r.get("amount") or 0
        offset += 1000
        if len(resp.json()) < 1000:
            break

    if not inv_data:
        logger.info("No recent lines to sync headers from")
        return

    # 既存ヘッダを確認
    existing: set[str] = set()
    resp = sess.get(
        f"{base}/rest/v1/sales_document_headers"
        f"?select=legacy_document_no&sales_date=gte.{cutoff}&limit=5000",
        timeout=30)
    if resp.ok:
        existing = {r["legacy_document_no"] for r in resp.json()}

    # 得意先名
    cust_names: dict[str, str] = {}
    resp = sess.get(
        f"{base}/rest/v1/customers?select=legacy_customer_code,name&limit=2000",
        timeout=30)
    if resp.ok:
        for c in resp.json():
            if c.get("legacy_customer_code"):
                cust_names[c["legacy_customer_code"]] = c.get("name", "")

    new_headers = []
    for inv_no, data in inv_data.items():
        if inv_no in existing:
            continue
        uid = str(uuid.uuid5(SAKE_UUID_NS, f"shden_header:{inv_no}"))
        new_headers.append({
            "id": uid,
            "legacy_document_no": inv_no,
            "document_no": inv_no,
            "document_type": "sales",
            "sales_date": data["date"],
            "document_date": data["date"],
            "legacy_customer_code": data["cust"],
            "customer_name": cust_names.get(data["cust"], ""),
            "total_amount": data["total"],
            "closing_status": "open",
        })

    if new_headers:
        sess.headers["Prefer"] = "resolution=merge-duplicates"
        for i in range(0, len(new_headers), 500):
            batch = new_headers[i:i + 500]
            sess.post(f"{base}/rest/v1/sales_document_headers?on_conflict=id",
                      json=batch, timeout=60)
        logger.info("Synced %d new headers from lines", len(new_headers))
    else:
        logger.info("Headers up to date")


def refresh_product_monthly_sales(config: dict[str, Any],
                                   logger: logging.Logger) -> None:
    """product_monthly_sales をPython側で集計して再構築する。"""
    base = config["supabase_url"].rstrip("/")
    sess = _session(config)

    # Fetch daily_sales_fact
    logger.info("Fetching daily_sales_fact for product_monthly_sales...")
    agg: dict[str, dict] = {}  # "YYYY-MM:prod" -> {qty, amt, cnt, name}
    offset = 0
    while True:
        url = (f"{base}/rest/v1/daily_sales_fact"
               f"?select=sales_date,legacy_product_code,quantity,sales_amount,document_count"
               f"&legacy_product_code=neq.unknown"
               f"&order=sales_date"
               f"&limit=1000&offset={offset}")
        resp = sess.get(url, timeout=60)
        if not resp.ok or not resp.json():
            break
        for r in resp.json():
            ym = r["sales_date"][:7]  # YYYY-MM
            prod = r["legacy_product_code"]
            key = f"{ym}:{prod}"
            if key not in agg:
                agg[key] = {"ym": ym, "prod": prod, "qty": 0, "amt": 0, "cnt": 0}
            agg[key]["qty"] += r.get("quantity") or 0
            agg[key]["amt"] += r.get("sales_amount") or 0
            agg[key]["cnt"] += r.get("document_count") or 0
        offset += 1000
        if len(resp.json()) < 1000:
            break

    logger.info("Aggregated %d product-month rows", len(agg))

    # Delete old
    sess.delete(f"{base}/rest/v1/product_monthly_sales?year_month=gte.2000-01", timeout=60)

    # Fetch product names
    prod_names: dict[str, str] = {}
    offset = 0
    while True:
        resp = sess.get(f"{base}/rest/v1/products?select=legacy_product_code,name&limit=1000&offset={offset}", timeout=30)
        if not resp.ok or not resp.json():
            break
        for r in resp.json():
            if r.get("legacy_product_code"):
                prod_names[r["legacy_product_code"]] = r.get("name") or r["legacy_product_code"]
        offset += 1000
        if len(resp.json()) < 1000:
            break

    rows = []
    for key, v in agg.items():
        rows.append({
            "id": key,
            "year_month": v["ym"],
            "product_code": v["prod"],
            "product_name": prod_names.get(v["prod"], v["prod"]),
            "quantity": v["qty"],
            "amount": v["amt"],
            "document_count": v["cnt"],
        })

    # Batch insert
    for i in range(0, len(rows), 500):
        batch = rows[i:i + 500]
        resp = sess.post(f"{base}/rest/v1/product_monthly_sales", json=batch, timeout=60)
        if not resp.ok:
            logger.warning("product_monthly_sales insert error: %s", resp.text[:200])

    logger.info("product_monthly_sales: %d rows inserted", len(rows))


def refresh_downstream(config: dict[str, Any], logger: logging.Logger) -> None:
    base = config["supabase_url"].rstrip("/")
    sess = _session(config)

    # Product monthly sales (Python-based)
    refresh_product_monthly_sales(config, logger)

    # Safety stock (RPC still works)
    logger.info("Calling refresh_safety_stock_params ...")
    resp = sess.post(f"{base}/rest/v1/rpc/refresh_safety_stock_params", json={}, timeout=120)
    if resp.ok:
        logger.info("refresh_safety_stock_params: OK")
    else:
        logger.warning("refresh_safety_stock_params: %s %s", resp.status_code, resp.text[:200])


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

REFRESH_FLAG_PATH = BASE_DIR / ".needs_refresh"


def main() -> int:
    logger = setup_logging()
    config = load_config()

    # decoder_sales_diff.py が変更を検出した場合のみ実行
    # --force フラグで強制実行も可能
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true",
                        help="差分フラグに関係なく強制リフレッシュ")
    args = parser.parse_args()

    if not args.force and not REFRESH_FLAG_PATH.exists():
        logger.info("No refresh needed (flag absent). Use --force to override.")
        return 0

    # フラグを消す（処理開始前に）
    if REFRESH_FLAG_PATH.exists():
        REFRESH_FLAG_PATH.unlink()

    # Step 1: Aggregate
    facts = fetch_and_aggregate(config, logger)
    if not facts:
        logger.warning("No facts to upsert")
        return 1

    # Step 2: Upsert
    upsert_facts(config, facts, logger)

    # Step 3: Sync headers from lines (for dashboard recent transactions)
    sync_headers_from_lines(config, logger)

    # Step 4: Downstream refreshes
    refresh_downstream(config, logger)

    logger.info("Done")
    return 0


if __name__ == "__main__":
    sys.exit(main())
