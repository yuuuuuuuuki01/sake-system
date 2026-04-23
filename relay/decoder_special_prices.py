"""SHTAN.MST (得意先別特価テーブル) のデコーダ。

sake_special_prices_sh の _raw_b64 から特価レコードをデコードし、
customer_product_prices テーブルに UPSERT する。

レコード構造 (マーカー \x09\x2e\x38\x09 の後):
  +0: 不明 (2 bytes)
  +2: 単価グループコード (7 bytes ASCII) ← 得意先.price_group と一致
  +9: 商品コード (7 bytes ASCII)
 +16: 特別単価 (8 bytes IEEE 754 double LE)
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
    logger = logging.getLogger("decoder_special_prices")
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


def fetch_raw_records(config: dict[str, Any], logger: logging.Logger) -> list[dict[str, Any]]:
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
            f"{url}/rest/v1/sake_special_prices_sh",
            params={
                "select": "_record_index,_raw_b64",
                "order": "_source_file.asc,_record_index.asc",
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


def decode_special_prices(raw_rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    prices: list[dict[str, Any]] = []
    seen: set[tuple[str, str]] = set()

    for row in raw_rows:
        raw_b64 = row.get("_raw_b64", "")
        if not raw_b64:
            continue

        data = base64.b64decode(raw_b64)
        search_from = 0

        while True:
            mpos = data.find(RECORD_MARKER, search_from)
            if mpos < 0:
                break

            ds = mpos + 4
            remaining = len(data) - ds

            if remaining < 24:
                search_from = mpos + 1
                continue

            group = data[ds + 2 : ds + 9].decode("ascii", errors="replace").strip().lstrip("0") or "0"
            product = data[ds + 9 : ds + 16].decode("ascii", errors="replace").strip().lstrip("0") or "0"

            if not group or not group.replace(" ", "").isdigit():
                search_from = mpos + 1
                continue
            if not product or not product.replace(" ", "").isdigit():
                search_from = mpos + 1
                continue

            key = (group, product)
            if key in seen:
                search_from = mpos + 1
                continue

            price = struct.unpack_from("<d", data, ds + 16)[0] if ds + 24 <= len(data) else 0

            if price > 0 and price < 9999999:
                seen.add(key)
                prices.append({
                    "id": str(uuid.uuid5(SAKE_UUID_NS, f"sp:{group}:{product}")),
                    "price_group": group,
                    "legacy_product_code": product,
                    "special_price": int(price),
                    "updated_at": datetime.now(tz=UTC).isoformat(),
                })

            search_from = mpos + 1

    return prices


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

    batch_size = 500
    total = 0
    for i in range(0, len(records), batch_size):
        batch = records[i : i + batch_size]
        if dry_run:
            logger.info("[DRY-RUN] would upsert %d special prices", len(batch))
        else:
            resp = session.post(
                f"{url}/rest/v1/customer_product_prices?on_conflict=price_group,legacy_product_code",
                json=batch,
                timeout=60,
            )
            resp.raise_for_status()
        total += len(batch)
        logger.info("UPSERT special_prices: batch=%d total=%d", len(batch), total)

    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="SHTAN.MST → customer_product_prices デコーダ")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--show-sample", type=int, default=0)
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    logger.info("Fetching raw records from sake_special_prices_sh...")
    raw_rows = fetch_raw_records(config, logger)
    logger.info("Fetched %d raw records", len(raw_rows))

    prices = decode_special_prices(raw_rows)
    logger.info("Decoded: %d unique special prices", len(prices))

    if args.show_sample and prices:
        for p in prices[: args.show_sample]:
            logger.info(
                "  group=%s product=%s price=%s",
                p["price_group"], p["legacy_product_code"], p["special_price"],
            )

    if not prices:
        logger.warning("No special prices decoded")
        return 1

    total = upsert_to_supabase(config, prices, logger, dry_run=args.dry_run)
    logger.info("Done: %d special prices upserted", total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
