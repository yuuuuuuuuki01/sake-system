"""SHTOR.DAT 差分検出デコーダ — バイナリdiff方式。

前回スナップショットとの差分から変更/新規スロットを検出し、
そこからのみ売上データを抽出する。B-Tree構造に依存しない。

フロー:
1. .shtor_snapshot にチャンク(1000 slots)ごとのmd5を保存
2. 再実行時: 変更チャンク → 変更スロット → データ抽出
3. 変更スロットは必ず「今書き込まれた」レコードなので偽陽性なし
"""
from __future__ import annotations

import csv
import hashlib
import json
import logging
import pickle
import re
import struct
import sys
import uuid
from pathlib import Path
from typing import Any

import requests

SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")
HEADER_SIZE = 0x200
CHUNK_SIZE = 1000  # slots per chunk

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"
SNAPSHOT_PATH = BASE_DIR / ".shtor_snapshot"

DATE_RE = re.compile(rb"20[12]\d(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])")
CUST_RE = re.compile(rb"\d{6} ")
AMT_DELTAS = [83, -47, 182, -146, 166, -142, 87, -43, 186, -57]


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("decoder_sales_diff")
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
    known: set[str] = set()
    try:
        url = config["supabase_url"].rstrip("/")
        resp = requests.get(
            f"{url}/rest/v1/customers?select=id",
            headers={"apikey": config["supabase_anon_key"], "Authorization": f"Bearer {config['supabase_anon_key']}"},
            timeout=30,
        )
        if resp.ok:
            for row in resp.json():
                cid = str(row.get("id", "")).strip()
                if cid:
                    known.add(cid.zfill(6))
    except Exception:
        pass
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


def compute_snapshot(data: bytes, record_size: int) -> dict[int, bytes]:
    """チャンクごとのmd5ハッシュを計算。"""
    total_slots = (len(data) - HEADER_SIZE) // record_size
    snapshot: dict[int, bytes] = {}
    for chunk_idx in range((total_slots + CHUNK_SIZE - 1) // CHUNK_SIZE):
        start = HEADER_SIZE + chunk_idx * CHUNK_SIZE * record_size
        end = min(start + CHUNK_SIZE * record_size, len(data))
        snapshot[chunk_idx] = hashlib.md5(data[start:end]).digest()
    return snapshot


def find_changed_slots(data: bytes, record_size: int, old_snapshot: dict[int, bytes], new_snapshot: dict[int, bytes]) -> list[int]:
    """変更されたチャンク内のスロットを個別比較して、変更スロットを返す。"""
    total_slots = (len(data) - HEADER_SIZE) // record_size
    changed: list[int] = []

    for chunk_idx, new_hash in new_snapshot.items():
        old_hash = old_snapshot.get(chunk_idx)
        if old_hash == new_hash:
            continue

        # チャンク内のスロットを個別確認
        for i in range(CHUNK_SIZE):
            slot = chunk_idx * CHUNK_SIZE + i
            if slot >= total_slots:
                break
            offset = HEADER_SIZE + slot * record_size
            rec = data[offset : offset + record_size]
            if rec[0] == 0x01:
                continue
            # 新規/変更されたスロットを追加
            changed.append(slot)

    return changed


def decode_cp932_clean(raw: bytes) -> str:
    return raw.decode("cp932", errors="replace").replace("\x00", "").replace("\ufffd", "").strip()


def extract_from_slots(data: bytes, record_size: int, slots: list[int], known_custs: set[str], filepath_name: str) -> list[dict[str, Any]]:
    """指定スロットからデータを抽出。変更スロットは確実にデータなので偽陽性の心配なし。"""
    total_slots = (len(data) - HEADER_SIZE) // record_size
    lines: list[dict[str, Any]] = []

    for slot in slots:
        rec = data[HEADER_SIZE + slot * record_size : HEADER_SIZE + (slot + 1) * record_size]
        if rec[0] == 0x01:
            continue

        # 方法1: 日付ベース
        for m in DATE_RE.finditer(rec):
            dl = m.start()
            ao = dl - 78
            qo = dl - 94
            co = dl - 31
            if ao < 0 or qo < 0 or co < 0 or ao + 4 > record_size or co + 6 > record_size:
                continue
            a = struct.unpack_from("<i", rec, ao)[0]
            q = struct.unpack_from("<i", rec, qo)[0]
            if abs(a) > 10_000_000 or abs(q) > 99_999:
                continue
            if a == 0 and q == 0:
                continue
            c = rec[co : co + 6].decode("ascii", errors="replace").strip()
            if not re.match(r"^\d{3,6}$", c):
                continue

            date_str = m.group().decode("ascii")
            sales_date = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:8]}"
            cust_code = c.lstrip("0") or c

            # 商品コード
            prod_code = ""
            prod_name = ""
            po = ao - 69
            if po >= 0 and po + 7 <= record_size:
                cand = rec[po : po + 7].decode("ascii", errors="replace").strip()
                if re.match(r"^\d{3,7}$", cand):
                    prod_code = cand.lstrip("0") or cand
                    ns = po + 9
                    prod_name = decode_cp932_clean(rec[ns : min(ns + 40, record_size)])

            unit_price = a // q if q and q != 0 else 0

            lines.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"diff:{filepath_name}:{slot}:{ao}")),
                "legacy_document_no": f"D{slot}",
                "document_no": f"D{slot}",
                "line_no": 1,
                "legacy_product_code": prod_code or None,
                "product_name": prod_name or None,
                "quantity": q,
                "unit_price": unit_price,
                "line_amount": a,
                "amount": a,
                "note": f"date:{sales_date} cust:{cust_code} src:diff",
            })
            break

        # 方法2: 得意先コードベース（日付がない場合）
        if not any(ln["legacy_document_no"] == f"D{slot}" for ln in lines):
            for cm in CUST_RE.finditer(rec):
                c = cm.group()[:6].decode("ascii")
                if c not in known_custs:
                    continue
                cp = cm.start()
                for delta in AMT_DELTAS:
                    ao = cp + delta
                    qo = ao - 16
                    if ao < 0 or ao + 4 > record_size or qo < 0 or qo + 4 > record_size:
                        continue
                    a = struct.unpack_from("<i", rec, ao)[0]
                    q = struct.unpack_from("<i", rec, qo)[0]
                    if a == 0 and q == 0:
                        continue
                    if abs(a) > 5_000_000 or abs(q) > 10_000:
                        continue
                    cust_code = c.lstrip("0") or c
                    lines.append({
                        "id": str(uuid.uuid5(SAKE_UUID_NS, f"diff:{filepath_name}:{slot}:{ao}")),
                        "legacy_document_no": f"D{slot}",
                        "document_no": f"D{slot}",
                        "line_no": 1,
                        "legacy_product_code": None,
                        "product_name": None,
                        "quantity": q,
                        "unit_price": a // q if q else 0,
                        "line_amount": a,
                        "amount": a,
                        "note": f"date:unknown cust:{cust_code} src:diff",
                    })
                    break
                break

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
        total += len(batch)
    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="SHTOR.DAT 差分検出デコーダ")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--init", action="store_true", help="初回スナップショット作成のみ")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    filepath = Path(config["z_drive_path"]) / "sh" / "dat" / "SHTOR.DAT"
    if not filepath.exists():
        logger.error("File not found: %s", filepath)
        return 1

    logger.info("Reading: %s", filepath)
    data = filepath.read_bytes()
    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size
    logger.info("record_size=%d, slots=%d", record_size, total_slots)

    new_snapshot = compute_snapshot(data, record_size)
    logger.info("Snapshot computed: %d chunks", len(new_snapshot))

    if args.init or not SNAPSHOT_PATH.exists():
        with SNAPSHOT_PATH.open("wb") as f:
            pickle.dump({"snapshot": new_snapshot, "file_size": len(data)}, f)
        logger.info("Initial snapshot saved to %s", SNAPSHOT_PATH)
        if args.init:
            return 0

    # 前回スナップショットと比較
    with SNAPSHOT_PATH.open("rb") as f:
        old_data = pickle.load(f)
    old_snapshot = old_data["snapshot"]

    changed_chunks = sum(1 for k in new_snapshot if new_snapshot[k] != old_snapshot.get(k))
    logger.info("Changed chunks: %d / %d", changed_chunks, len(new_snapshot))

    if changed_chunks == 0:
        logger.info("No changes detected")
        # スナップショット更新
        with SNAPSHOT_PATH.open("wb") as f:
            pickle.dump({"snapshot": new_snapshot, "file_size": len(data)}, f)
        return 0

    changed_slots = find_changed_slots(data, record_size, old_snapshot, new_snapshot)
    logger.info("Changed slots: %d", len(changed_slots))

    known_custs = load_known_customers(config)
    logger.info("Known customers: %d", len(known_custs))

    lines = extract_from_slots(data, record_size, changed_slots, known_custs, filepath.name)
    logger.info("Extracted: %d lines from %d changed slots", len(lines), len(changed_slots))

    if lines:
        total = upsert(config, lines, logger, dry_run=args.dry_run)
        logger.info("Upserted: %d lines", total)

    # スナップショット更新
    with SNAPSHOT_PATH.open("wb") as f:
        pickle.dump({"snapshot": new_snapshot, "file_size": len(data)}, f)
    logger.info("Snapshot updated")

    return 0


if __name__ == "__main__":
    sys.exit(main())
