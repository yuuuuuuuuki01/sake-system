"""SHTOR.DAT (売上伝票明細) のデコーダ — データノード直接読取方式 v2。

B-Treeのデータノード（リーフ）を直接識別し、金額・数量を正確に抽出する。
キャリブレーション済みオフセット（CSV正解データで検証済み）:

金額(int32)を基準とした相対オフセット:
  金額 - 16: 数量 (int32 LE)
  金額 + 0:  金額 (int32 LE)
  金額 + 46~48: 得意先コード (6B ASCII)
  金額 + 78: 計上日 (8B ASCII YYYYMMDD)

商品コードは可変位置のため、取得できる場合のみ抽出。
"""
from __future__ import annotations

import json
import logging
import re
import struct
import sys
import uuid
from pathlib import Path
from typing import Any

import requests

SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")
HEADER_SIZE = 0x200

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"

DATE_RE = re.compile(rb"20[12]\d(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])")
PROD_RE = re.compile(rb"(\d{3,7})\s{1,3}[\x80-\xff]")


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


def decode_cp932_clean(raw: bytes) -> str:
    return (
        raw.decode("cp932", errors="replace")
        .replace("\x00", "")
        .replace("\ufffd", "")
        .strip()
    )


def try_extract_product(rec: bytes, amt_off: int, prev_rec: bytes | None = None) -> tuple[str, str]:
    """商品コードと商品名の抽出を試みる。取れない場合は空文字を返す。"""
    # 方法1: amt_off - 69 にゼロ埋め商品コード(7B)がある場合（同一スロット内）
    prod_off = amt_off - 69
    if prod_off >= 0 and prod_off + 7 <= len(rec):
        candidate = rec[prod_off : prod_off + 7].decode("ascii", errors="replace").strip()
        if re.match(r"^\d{3,7}$", candidate):
            name_start = prod_off + 9
            name_end = min(name_start + 40, len(rec))
            name = decode_cp932_clean(rec[name_start:name_end])
            return candidate.lstrip("0") or candidate, name

    # 方法2: エントリが前スロットと跨っている場合（amt_off < 69）
    if prod_off < 0 and prev_rec is not None:
        prev_prod_off = len(prev_rec) + prod_off  # 前スロット末尾からの位置
        if 0 <= prev_prod_off and prev_prod_off + 7 <= len(prev_rec):
            candidate = prev_rec[prev_prod_off : prev_prod_off + 7].decode("ascii", errors="replace").strip()
            if re.match(r"^\d{3,7}$", candidate):
                name_start = prev_prod_off + 9
                name_end = min(name_start + 40, len(prev_rec))
                name = decode_cp932_clean(prev_rec[name_start:name_end])
                return candidate.lstrip("0") or candidate, name

    # 方法3: rec[0:7] に商品コードがある場合
    candidate = rec[0:7].decode("ascii", errors="replace").strip()
    if re.match(r"^\d{3,7}$", candidate):
        name = decode_cp932_clean(rec[9:49])
        return candidate.lstrip("0") or candidate, name

    return "", ""


def extract_lines(filepath: Path, logger: logging.Logger) -> list[dict[str, Any]]:
    data = filepath.read_bytes()
    if len(data) < HEADER_SIZE or data[:2] != b"FC":
        raise ValueError(f"Not a Magic ISAM file: {filepath}")

    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size
    logger.info(
        "File: %s, record_size=%d, slots=%d", filepath.name, record_size, total_slots
    )

    lines: list[dict[str, Any]] = []
    seen: set[str] = set()
    prev_rec: bytes | None = None

    for slot_idx in range(total_slots):
        offset = HEADER_SIZE + slot_idx * record_size
        rec = data[offset : offset + record_size]
        if rec[0] == 0x01:
            prev_rec = rec
            continue

        for m in DATE_RE.finditer(rec):
            date_local = m.start()
            amt_off = date_local - 78
            qty_off = date_local - 94
            cust_off = date_local - 31

            if amt_off < 0 or qty_off < 0 or cust_off < 0:
                continue
            if amt_off + 4 > record_size or cust_off + 6 > record_size:
                continue

            amt = struct.unpack_from("<i", rec, amt_off)[0]
            if abs(amt) > 10_000_000:
                continue

            qty = struct.unpack_from("<i", rec, qty_off)[0]
            if abs(qty) > 99_999:
                continue

            # 金額も数量も両方ゼロ → データなし（B-Tree空ノード）
            if amt == 0 and qty == 0:
                continue

            cust_raw = rec[cust_off : cust_off + 6].decode("ascii", errors="replace").strip()
            if not re.match(r"^\d{3,6}$", cust_raw):
                continue

            date_str = m.group().decode("ascii")
            sales_date = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:8]}"
            cust_code = cust_raw.lstrip("0") or cust_raw

            prod_code, prod_name = try_extract_product(rec, amt_off, prev_rec)
            unit_price = amt // qty if qty else 0

            key = f"{slot_idx}:{date_local}"
            if key in seen:
                continue
            seen.add(key)

            lines.append(
                {
                    "id": str(
                        uuid.uuid5(SAKE_UUID_NS, f"sales_line_v2:{slot_idx}:{date_local}")
                    ),
                    "legacy_document_no": f"B{slot_idx}",
                    "document_no": f"B{slot_idx}",
                    "line_no": 1,
                    "legacy_product_code": prod_code or None,
                    "product_name": prod_name or None,
                    "quantity": qty,
                    "unit_price": unit_price,
                    "line_amount": amt,
                    "amount": amt,
                    "note": f"date:{sales_date} cust:{cust_code} src:binary",
                }
            )
            break

        prev_rec = rec

        if (slot_idx + 1) % 1_000_000 == 0:
            logger.info(
                "Scanned %d/%d slots, found %d lines",
                slot_idx + 1,
                total_slots,
                len(lines),
            )

    return lines


def upsert(
    config: dict[str, Any],
    records: list[dict[str, Any]],
    logger: logging.Logger,
    dry_run: bool = False,
) -> int:
    if not records:
        return 0

    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update(
        {
            "apikey": config["supabase_anon_key"],
            "Authorization": f"Bearer {config['supabase_anon_key']}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates,missing=default",
        }
    )

    total = 0
    for i in range(0, len(records), 500):
        batch = records[i : i + 500]
        if dry_run:
            logger.info("[DRY-RUN] would upsert %d lines", len(batch))
        else:
            resp = session.post(
                f"{url}/rest/v1/sales_document_lines?on_conflict=id",
                json=batch,
                timeout=120,
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

    parser = argparse.ArgumentParser(
        description="SHTOR.DAT → sales_document_lines デコーダ (v2: データノード直接読取)"
    )
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
                ln["legacy_product_code"],
                ln["product_name"],
                ln["quantity"],
                ln["unit_price"],
                ln["amount"],
                ln["note"],
            )

    if not lines:
        logger.warning("No sales lines decoded")
        return 1

    total = upsert(config, lines, logger, dry_run=args.dry_run)
    logger.info("Done: %d sales lines upserted", total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
