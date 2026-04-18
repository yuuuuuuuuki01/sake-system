"""SHTOR.DAT (売上伝票明細) のデコーダ v3 — 日付ベース+スロット跨ぎ検出。

Phase 1: 日付(YYYYMMDD)が現スロット内にあるエントリ（~75%カバー）
Phase 2: 日付が次スロット先頭にあるエントリ（~20%追加カバー）

確定済みオフセット（CSV照合で検証済み）:
  date - 78: 金額 (int32 LE)
  date - 94: 数量 (int32 LE)
  date - 31: 得意先コード (6B ASCII)
  amt - 69:  商品コード (7B ASCII, 前スロットの場合あり)

フィルタ:
  - 既知の得意先コードのみ（CSVまたはcustomersテーブルから取得）
  - amt > 0, qty > 0（売上のみ。消費税/サンプル/戻入は別途対応予定）
"""
from __future__ import annotations

import csv
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


def load_known_customers(config: dict[str, Any]) -> set[str]:
    """既知の得意先コード（6桁ゼロ埋め）を取得。"""
    known: set[str] = set()
    # Supabaseから取得
    try:
        url = config["supabase_url"].rstrip("/")
        resp = requests.get(
            f"{url}/rest/v1/customers?select=id",
            headers={
                "apikey": config["supabase_anon_key"],
                "Authorization": f"Bearer {config['supabase_anon_key']}",
            },
            timeout=30,
        )
        if resp.ok:
            for row in resp.json():
                cid = str(row.get("id", "")).strip()
                if cid:
                    known.add(cid.zfill(6))
    except Exception:
        pass
    # CSVからも補完
    csv_path = Path(config.get("z_drive_path", "Z:\\")) / "売掛金元帳.csv"
    if csv_path.exists():
        try:
            with csv_path.open("r", encoding="cp932", errors="replace") as f:
                next(f)
                reader = csv.reader(f)
                next(reader, None)
                for row in reader:
                    if row and row[0].strip():
                        known.add(row[0].strip().zfill(6))
        except Exception:
            pass
    return known


def decode_cp932_clean(raw: bytes) -> str:
    return (
        raw.decode("cp932", errors="replace")
        .replace("\x00", "")
        .replace("\ufffd", "")
        .strip()
    )


def try_extract_product(rec: bytes, amt_off: int, prev_rec: bytes | None = None) -> tuple[str, str]:
    """商品コードと商品名の抽出を試みる。"""
    prod_off = amt_off - 69
    if prod_off >= 0 and prod_off + 7 <= len(rec):
        candidate = rec[prod_off : prod_off + 7].decode("ascii", errors="replace").strip()
        if re.match(r"^\d{3,7}$", candidate):
            name_start = prod_off + 9
            name_end = min(name_start + 40, len(rec))
            name = decode_cp932_clean(rec[name_start:name_end])
            return candidate.lstrip("0") or candidate, name

    if prod_off < 0 and prev_rec is not None:
        prev_prod_off = len(prev_rec) + prod_off
        if 0 <= prev_prod_off and prev_prod_off + 7 <= len(prev_rec):
            candidate = prev_rec[prev_prod_off : prev_prod_off + 7].decode("ascii", errors="replace").strip()
            if re.match(r"^\d{3,7}$", candidate):
                name_start = prev_prod_off + 9
                name_end = min(name_start + 40, len(prev_rec))
                name = decode_cp932_clean(prev_rec[name_start:name_end])
                return candidate.lstrip("0") or candidate, name

    candidate = rec[0:7].decode("ascii", errors="replace").strip()
    if re.match(r"^\d{3,7}$", candidate):
        name = decode_cp932_clean(rec[9:49])
        return candidate.lstrip("0") or candidate, name

    return "", ""


def extract_lines(filepath: Path, logger: logging.Logger, known_custs: set[str]) -> list[dict[str, Any]]:
    data = filepath.read_bytes()
    if len(data) < HEADER_SIZE or data[:2] != b"FC":
        raise ValueError(f"Not a Magic ISAM file: {filepath}")

    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size
    logger.info("File: %s, record_size=%d, slots=%d", filepath.name, record_size, total_slots)

    lines: list[dict[str, Any]] = []
    seen: set[str] = set()
    prev_rec: bytes | None = None

    for slot_idx in range(total_slots - 1):
        rec = data[HEADER_SIZE + slot_idx * record_size : HEADER_SIZE + (slot_idx + 1) * record_size]
        next_rec = data[HEADER_SIZE + (slot_idx + 1) * record_size : HEADER_SIZE + (slot_idx + 2) * record_size]

        if rec[0] == 0x01:
            prev_rec = rec
            continue

        found = False

        # Phase 1: 日付が現スロット内
        for m in DATE_RE.finditer(rec):
            dl = m.start()
            ao = dl - 78
            qo = dl - 94
            co = dl - 31
            if ao < 0 or qo < 0 or co < 0 or ao + 4 > record_size or co + 6 > record_size:
                continue
            a = struct.unpack_from("<i", rec, ao)[0]
            q = struct.unpack_from("<i", rec, qo)[0]
            if a <= 0 or a > 5_000_000 or q <= 0 or q > 10_000:
                continue
            c = rec[co : co + 6].decode("ascii", errors="replace")
            if c not in known_custs:
                continue

            key = f"{slot_idx}:{ao}"
            if key in seen:
                continue
            seen.add(key)

            date_str = m.group().decode("ascii")
            sales_date = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:8]}"
            cust_code = c.lstrip("0") or c
            prod_code, prod_name = try_extract_product(rec, ao, prev_rec)

            lines.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_v3:{filepath.name}:{slot_idx}:{ao}")),
                "legacy_document_no": f"B{slot_idx}",
                "document_no": f"B{slot_idx}",
                "line_no": 1,
                "legacy_product_code": prod_code or None,
                "product_name": prod_name or None,
                "quantity": q,
                "unit_price": a // q if q else 0,
                "line_amount": a,
                "amount": a,
                "note": f"date:{sales_date} cust:{cust_code} src:binary",
            })
            found = True
            break

        # Phase 2: 日付が次スロット先頭にある
        if not found and next_rec[0] != 0x01:
            for m in DATE_RE.finditer(next_rec):
                dl = m.start()
                if dl >= 78:
                    break
                ao_prev = record_size + dl - 78
                qo_prev = ao_prev - 16
                if ao_prev < 0 or ao_prev + 4 > record_size or qo_prev < 0:
                    continue
                a = struct.unpack_from("<i", rec, ao_prev)[0]
                q = struct.unpack_from("<i", rec, qo_prev)[0]
                if a <= 0 or a > 5_000_000 or q <= 0 or q > 10_000:
                    continue

                co = dl - 31
                if co >= 0 and co + 6 <= record_size:
                    c = next_rec[co : co + 6].decode("ascii", errors="replace")
                else:
                    co_prev = record_size + co
                    if 0 <= co_prev and co_prev + 6 <= record_size:
                        c = rec[co_prev : co_prev + 6].decode("ascii", errors="replace")
                    else:
                        continue
                if c not in known_custs:
                    continue

                key = f"{slot_idx}:{ao_prev}"
                if key in seen:
                    continue
                seen.add(key)

                date_str = m.group().decode("ascii")
                sales_date = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:8]}"
                cust_code = c.lstrip("0") or c
                prod_code, prod_name = try_extract_product(rec, ao_prev, prev_rec)

                lines.append({
                    "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_v3:{filepath.name}:{slot_idx}:{ao_prev}")),
                    "legacy_document_no": f"B{slot_idx}",
                    "document_no": f"B{slot_idx}",
                    "line_no": 1,
                    "legacy_product_code": prod_code or None,
                    "product_name": prod_name or None,
                    "quantity": q,
                    "unit_price": a // q if q else 0,
                    "line_amount": a,
                    "amount": a,
                    "note": f"date:{sales_date} cust:{cust_code} src:binary",
                })
                break

        prev_rec = rec

        if (slot_idx + 1) % 1_000_000 == 0:
            logger.info("Scanned %d/%d slots, found %d lines", slot_idx + 1, total_slots, len(lines))

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
            resp = session.post(f"{url}/rest/v1/sales_document_lines?on_conflict=id", json=batch, timeout=120)
            if not resp.ok:
                logger.error("UPSERT error: %s %s", resp.status_code, resp.text[:200])
                resp.raise_for_status()
        total += len(batch)
        if total % 5000 == 0:
            logger.info("UPSERT sales_lines: total=%d/%d", total, len(records))
    return total


def main() -> int:
    import argparse
    parser = argparse.ArgumentParser(description="SHTOR.DAT → sales_document_lines デコーダ v3")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--show-sample", type=int, default=0)
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    known_custs = load_known_customers(config)
    logger.info("Known customer codes: %d", len(known_custs))

    filepath = Path(config["z_drive_path"]) / "sh" / "dat" / "SHTOR.DAT"
    if not filepath.exists():
        logger.error("File not found: %s", filepath)
        return 1

    lines = extract_lines(filepath, logger, known_custs)
    logger.info("Total decoded: %d sales lines", len(lines))

    if args.show_sample and lines:
        for ln in lines[: args.show_sample]:
            logger.info("  prod=%s [%s] qty=%s amt=%s | %s",
                ln["legacy_product_code"], ln["product_name"],
                ln["quantity"], ln["amount"], ln["note"])

    if not lines:
        logger.warning("No sales lines decoded")
        return 1

    total = upsert(config, lines, logger, dry_run=args.dry_run)
    logger.info("Done: %d sales lines upserted", total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
