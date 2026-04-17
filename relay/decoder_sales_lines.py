"""SHTOR.DAT (売上伝票明細) のデコーダ — パターンマッチ方式。

B-Treeの全スロットをスキャンし、
得意先コード + 取引区分 + 商品コード のパターンを検出。
商品名(CP932)が後続するエントリをデータとして抽出。

フィールドパターン (可変オフセット):
  得意先コード(6B数字) + 空白 + ... + 取引区分(3B: 500/600/700) + 商品コード(5B数字)
  商品コードの+2Bに商品名(CP932)、その後に数量(int32)・金額(double)
"""
from __future__ import annotations

import json
import logging
import math
import re
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

# 得意先(5-6桁、先頭スペース可) + 数バイト + 取引区分(500/600/700) + 商品(5桁)
ENTRY_PATTERN = re.compile(rb"(\s?\d{5,6})\x20.{0,10}(500|600|700)(\d{5})")


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

    min_days = (date(2000, 1, 1) - EPOCH).days
    max_days = (date(2027, 12, 31) - EPOCH).days

    lines: list[dict[str, Any]] = []
    seen: set[str] = set()
    scanned = 0

    for i in range(total_slots):
        offset = HEADER_SIZE + i * record_size
        rec = data[offset : offset + record_size]
        if rec[0] == 0x01:
            continue

        entry_in_slot = 0
        for m in ENTRY_PATTERN.finditer(rec):
            entry_in_slot += 1
            cust_code = m.group(1).decode("ascii").strip()
            trade_type = m.group(2).decode("ascii")
            prod_code = m.group(3).decode("ascii").strip()

            prod_end = m.end()

            # データノード判定: 商品コードの+2Bに CP932テキスト(>0x80)があるか
            if prod_end + 4 >= len(rec):
                continue
            next_bytes = rec[prod_end + 2 : prod_end + 6]
            if not any(b > 0x80 for b in next_bytes):
                continue  # インデックスノード(テキストなし)

            # 商品名 (商品コード+2Bの後、36B CP932)
            name_start = prod_end + 2
            prod_name_raw = rec[name_start : name_start + 36].decode("cp932", errors="replace")
            prod_name = "".join(c for c in prod_name_raw if c.isprintable() or c in " \u3000").strip()

            # 数量・金額: 商品名の後に配置
            # 固定オフセットから相対計算: @140=数量, @148=金額 (slot[20891]で確認)
            # 商品コード@89→数量@140 = +51B。prod_pos(m.start(3))から+51B
            qty_offset = m.start(3) + 51
            amt_offset = m.start(3) + 59

            qty = 0
            if qty_offset + 4 <= len(rec):
                qty = struct.unpack_from("<i", rec, qty_offset)[0]
                if qty < -999 or qty > 9999:
                    qty = 0

            amount = 0.0
            if amt_offset + 8 <= len(rec):
                amount = struct.unpack_from("<d", rec, amt_offset)[0]
                if math.isnan(amount) or math.isinf(amount) or abs(amount) > 999999999:
                    amount = 0.0

            # 日付: 得意先コードの-26B(= @47 for cust@73)
            sales_date = None
            date_offset = m.start(1) - 26
            if 0 <= date_offset and date_offset + 2 <= len(rec):
                day_val = struct.unpack_from("<H", rec, date_offset)[0]
                if min_days <= day_val <= max_days:
                    sales_date = EPOCH + timedelta(days=day_val)

            # 重複チェック
            key = f"{i}:{m.start()}"
            if key in seen:
                continue
            seen.add(key)

            amt_int = int(amount) if amount else 0
            unit_price = int(amount / qty) if qty and amount else 0

            lines.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_line:{i}:{m.start()}")),
                "legacy_document_no": f"L{i}",
                "document_no": f"L{i}",
                "line_no": entry_in_slot,
                "legacy_product_code": prod_code.lstrip("0") or prod_code,
                "product_name": prod_name or None,
                "quantity": qty if qty else 1,
                "unit_price": unit_price,
                "line_amount": amt_int,
                "amount": amt_int,
                "note": f"date:{sales_date.isoformat() if sales_date else 'unknown'} cust:{cust_code.lstrip('0')} type:{trade_type}",
            })

        scanned += 1
        if scanned % 500000 == 0:
            logger.info("Scanned %d/%d slots, found %d lines", scanned, total_slots, len(lines))

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
                logger.error("UPSERT error: %s %s", resp.status_code, resp.text[:200])
                resp.raise_for_status()
        total += len(batch)
        if total % 5000 == 0:
            logger.info("UPSERT sales_lines: total=%d/%d", total, len(records))

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
