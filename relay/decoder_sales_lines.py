"""SHTOR.DAT (売上伝票明細) のデコーダ。

Z:\sh\dat\SHTOR.DAT からデータレコードを抽出し、
sales_document_lines テーブルに UPSERT する。

SHTOR.DATはB-Tree構造。データノード判定:
  @47にint16日付(2020-2027年範囲)があるレコード

フィールドマップ (確定済み):
  @47:  計上日 (int16, 1900/1/1からの日数)
  @73:  得意先コード (6B ASCII)
  @86:  取引区分 (3B ASCII, 500=売上)
  @89:  商品コード (5B ASCII)
  @96:  商品名 (36B CP932)
  @140: 数量 (int32 LE)
  @148: 金額 (double LE)
"""
from __future__ import annotations

import json
import logging
import struct
import sys
import uuid
from datetime import date, timedelta
from pathlib import Path
from typing import Any

import requests

SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")
EPOCH = date(1900, 1, 1)
HEADER_SIZE = 0x200

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("decoder_sales_lines")
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


def extract_lines(filepath: Path, logger: logging.Logger) -> list[dict[str, Any]]:
    data = filepath.read_bytes()
    if len(data) < HEADER_SIZE or data[:2] != b"FC":
        raise ValueError(f"Not a Magic ISAM file: {filepath}")

    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size
    logger.info("File: %s, record_size=%d, slots=%d", filepath.name, record_size, total_slots)

    min_days = (date(2020, 1, 1) - EPOCH).days
    max_days = (date(2027, 12, 31) - EPOCH).days

    lines: list[dict[str, Any]] = []
    seen: set[str] = set()

    for i in range(total_slots):
        offset = HEADER_SIZE + i * record_size
        rec = data[offset : offset + record_size]

        if len(rec) < 160:
            continue

        # データノード判定: @47 に妥当な日付
        day_val = struct.unpack_from("<H", rec, 47)[0]
        if not (min_days <= day_val <= max_days):
            continue

        sales_date = EPOCH + timedelta(days=day_val)

        # 得意先コード
        cust_code = rec[73:79].decode("ascii", errors="replace").strip()
        if not cust_code or not cust_code[0].isdigit():
            continue

        # 取引区分 (500=売上, 600=返品, 700=値引等)
        trade_type = rec[86:89].decode("ascii", errors="replace").strip()
        if not trade_type or not trade_type.isdigit():
            continue

        # 商品コード
        prod_code = rec[89:94].decode("ascii", errors="replace").strip()
        if not prod_code or not prod_code.replace(" ", "").isdigit():
            continue

        # 商品名 (NULLバイト + 制御文字除去)
        prod_name_raw = rec[96:132].decode("cp932", errors="replace")
        prod_name = "".join(c for c in prod_name_raw if c.isprintable() or c in " \u3000").strip()

        # 数量 (妥当な範囲チェック)
        qty = struct.unpack_from("<i", rec, 140)[0] if len(rec) > 143 else 0
        if qty < -9999 or qty > 99999:
            continue  # B-Treeノードの誤判定

        # 金額
        amount = 0.0
        if len(rec) > 155:
            amount = struct.unpack_from("<d", rec, 148)[0]
            import math
            if math.isnan(amount) or math.isinf(amount) or abs(amount) > 999999999:
                amount = 0.0

        # 重複チェック
        key = f"{sales_date}:{cust_code}:{prod_code}:{i}"
        if key in seen:
            continue
        seen.add(key)

        amt_int = int(amount) if amount else 0
        unit_price = int(amount / qty) if qty and amount else 0

        doc_id = f"L{i}"
        lines.append({
            "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_line:{i}")),
            "legacy_document_no": doc_id,
            "document_no": doc_id,
            "line_no": 1,
            "legacy_product_code": prod_code.lstrip("0") or prod_code,
            "product_name": prod_name or None,
            "quantity": qty,
            "unit_price": unit_price,
            "line_amount": amt_int,
            "amount": amt_int,
            "note": f"date:{sales_date.isoformat()} cust:{cust_code.lstrip('0')} type:{trade_type}",
        })

    return lines


def upsert(config: dict[str, Any], records: list[dict[str, Any]], logger: logging.Logger, dry_run: bool = False) -> int:
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
            logger.info("[DRY-RUN] would upsert %d lines", len(batch))
        else:
            resp = session.post(
                f"{url}/rest/v1/sales_document_lines?on_conflict=id",
                json=batch, timeout=120,
            )
            if not resp.ok:
                logger.error("UPSERT error: %s %s", resp.status_code, resp.text[:300])
                resp.raise_for_status()
        total += len(batch)
        logger.info("UPSERT sales_lines: batch=%d total=%d", len(batch), total)

    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="SHTOR.DAT → sales_document_lines デコーダ")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--show-sample", type=int, default=0)
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    filepath = Path(config["z_drive_path"]) / "sh" / "dat" / "SHTOR.DAT"
    logger.info("Decoding: %s", filepath)

    lines = extract_lines(filepath, logger)
    logger.info("Decoded: %d sales lines", len(lines))

    if args.show_sample and lines:
        for ln in lines[: args.show_sample]:
            logger.info(
                "  prod=%s [%s] qty=%s unit=%s amt=%s | %s",
                ln["legacy_product_code"], ln["product_name"],
                ln["quantity"], ln["unit_price"], ln["amount"], ln["note"],
            )

    if not lines:
        logger.warning("No sales lines decoded")
        return 1

    total = upsert(config, lines, logger, dry_run=args.dry_run)
    logger.info("Done: %d sales lines upserted", total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
