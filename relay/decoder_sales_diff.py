"""SHTOR.DAT ページ構造対応デコーダ — Btrieve ページ対応版。

Btrieve ページ構造を正しく読み、SHDEN.DAT から計上日を取得して
sales_document_lines に UPSERT する。

SHTOR.DAT: page_size=16384, phys_rec=229
  @4=inv_id, @8=line_no, @10=product, @64=qty, @80=amt, @127=cust, @158=入力日

SHDEN.DAT: page_size=2048, phys_rec=497, data_page=byte4==0x44
  構造C: header=23, @15=inv_id, @420=計上日  ← 最優先（精度98.4%）
  構造A: header=209, @326=inv_id, @330=cust, @234=計上日
  構造B: header=460, @75=inv_id, @79=cust(親コード先頭3桁), @480=計上日
"""
from __future__ import annotations

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

# Btrieve page constants
SHTOR_PAGE_SIZE = 16384
SHTOR_PHYS_REC = 229
SHTOR_KNOWN_HEADERS = [15, 41, 218, 192]

SHDEN_PAGE_SIZE = 2048
SHDEN_PHYS_REC = 497
SHDEN_DATA_PAGE_MARKER = 0x44  # byte @4 == 'D' for data pages
# 構造C: header=23, inv@15, date@420  — 最優先（精度98.4%）
SHDEN_HEADER_C = 23
# 構造A: header=209, inv@326, cust@330, date@234
SHDEN_HEADER_A = 209
# 構造B: header=460, inv@75, cust@79, date@480
SHDEN_HEADER_B = 460

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"
SNAPSHOT_PATH = BASE_DIR / ".shtor_snapshot"

PROD8_RE = re.compile(rb"[5-9][0-9]{7}")
DATE_RE = re.compile(rb"20[12]\d(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])")


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


def decode_cp932(raw: bytes) -> str:
    return raw.decode("cp932", errors="replace").replace("\x00", "").replace("\ufffd", "").strip()


# ---------------------------------------------------------------------------
# SHDEN 計上日マップ
# ---------------------------------------------------------------------------

def load_shden_posting_date_map(config: dict[str, Any],
                                logger: logging.Logger) -> dict[int, str]:
    """SHDEN.DAT から {inv_id: 計上日(YYYY-MM-DD)} マップを構築する。

    データページ (byte@4==0x44) のみスキャンし、構造 C → A → B の優先順で
    first-match を採用。4月CSV検証で 98.4% 精度。

    構造C: header=23, inv@15(LE4) + date@420(8桁ASCII)
    構造A: header=209, inv@326(LE4) + cust@330(6桁ASCII) + date@234(8桁ASCII)
    構造B: header=460, inv@75(LE4) + cust@79(先頭3桁) + date@480(8桁ASCII)
    """
    filepath = Path(config["z_drive_path"]) / "sh" / "dat" / "SHDEN.DAT"
    if not filepath.exists():
        logger.warning("SHDEN.DAT not found")
        return {}

    data = filepath.read_bytes()
    num_pages = len(data) // SHDEN_PAGE_SIZE
    date_map: dict[int, str] = {}
    struct_c_count = 0
    struct_a_count = 0
    struct_b_count = 0

    for pn in range(num_pages):
        ps = pn * SHDEN_PAGE_SIZE
        if data[ps + 4] != SHDEN_DATA_PAGE_MARKER:
            continue

        # --- 構造C (最優先): header=23, inv@15, date@420 ---
        recs_c = (SHDEN_PAGE_SIZE - SHDEN_HEADER_C) // SHDEN_PHYS_REC
        for k in range(recs_c):
            off = ps + SHDEN_HEADER_C + k * SHDEN_PHYS_REC
            if off + SHDEN_PHYS_REC > len(data):
                break
            inv_id = struct.unpack_from("<I", data, off + 15)[0]
            if not (1 <= inv_id <= 200_000) or inv_id in date_map:
                continue
            d420 = data[off + 420 : off + 428]
            if not DATE_RE.fullmatch(d420):
                continue
            d = d420.decode()
            date_map[inv_id] = f"{d[:4]}-{d[4:6]}-{d[6:8]}"
            struct_c_count += 1

        # --- 構造A: header=209, inv@326, cust@330, date@234 ---
        recs_a = (SHDEN_PAGE_SIZE - SHDEN_HEADER_A) // SHDEN_PHYS_REC
        for k in range(recs_a):
            off = ps + SHDEN_HEADER_A + k * SHDEN_PHYS_REC
            if off + SHDEN_PHYS_REC > len(data):
                break
            inv_id = struct.unpack_from("<I", data, off + 326)[0]
            if not (1 <= inv_id <= 200_000) or inv_id in date_map:
                continue
            if not re.fullmatch(rb"\d{6}", data[off + 330 : off + 336]):
                continue
            d234 = data[off + 234 : off + 242]
            if not DATE_RE.fullmatch(d234):
                continue
            d = d234.decode()
            date_map[inv_id] = f"{d[:4]}-{d[4:6]}-{d[6:8]}"
            struct_a_count += 1

        # --- 構造B: header=460, inv@75, cust@79, date@480 ---
        recs_b = (SHDEN_PAGE_SIZE - SHDEN_HEADER_B) // SHDEN_PHYS_REC
        for k in range(recs_b):
            off = ps + SHDEN_HEADER_B + k * SHDEN_PHYS_REC
            if off + SHDEN_PHYS_REC > len(data):
                break
            inv_id = struct.unpack_from("<I", data, off + 75)[0]
            if not (1 <= inv_id <= 200_000) or inv_id in date_map:
                continue
            if not re.fullmatch(rb"\d{3}", data[off + 79 : off + 82]):
                continue
            d480 = data[off + 480 : off + 488]
            if not DATE_RE.fullmatch(d480):
                continue
            d = d480.decode()
            date_map[inv_id] = f"{d[:4]}-{d[4:6]}-{d[6:8]}"
            struct_b_count += 1

    logger.info("SHDEN posting date map: %d entries (C=%d, A=%d, B=%d)",
                len(date_map), struct_c_count, struct_a_count, struct_b_count)
    return date_map


# ---------------------------------------------------------------------------
# SHTOR ページ構造対応レコード抽出
# ---------------------------------------------------------------------------

def _count_valid_records(page_data: bytes, header: int) -> int:
    """ページ内で指定ヘッダオフセットから有効レコード数をカウント。"""
    count = 0
    k = 0
    while header + k * SHTOR_PHYS_REC + SHTOR_PHYS_REC <= len(page_data):
        off = header + k * SHTOR_PHYS_REC
        inv_id = struct.unpack_from("<I", page_data, off + 4)[0]
        if (1 <= inv_id <= 200_000
                and PROD8_RE.fullmatch(page_data[off + 10 : off + 18])
                and re.fullmatch(rb"\d{6}", page_data[off + 127 : off + 133])):
            count += 1
        k += 1
    return count


SHTOR_DATA_PAGE_HEADER = 41  # byte4=0x44 データページの固定ヘッダ


def extract_page_records(page_data: bytes,
                         date_map: dict[int, str]) -> list[dict[str, Any]]:
    """1ページ (16384B) からレコードを抽出する。

    データページ (byte@4==0x44) は header=41 固定。
    それ以外のページは既知ヘッダから best-of-4 で選択。
    4月CSV検証で 99.7% 精度。
    """
    is_data_page = page_data[4] == 0x44

    if is_data_page:
        best_h = SHTOR_DATA_PAGE_HEADER
        best_count = _count_valid_records(page_data, best_h)
    else:
        best_h = -1
        best_count = 0
        for h in SHTOR_KNOWN_HEADERS:
            c = _count_valid_records(page_data, h)
            if c > best_count:
                best_count = c
                best_h = h

    if best_count == 0:
        return []

    results: list[dict[str, Any]] = []
    k = 0
    while best_h + k * SHTOR_PHYS_REC + SHTOR_PHYS_REC <= len(page_data):
        off = best_h + k * SHTOR_PHYS_REC
        rec = page_data[off : off + SHTOR_PHYS_REC]
        k += 1

        inv_id = struct.unpack_from("<I", rec, 4)[0]
        if not (1 <= inv_id <= 200_000):
            continue
        if not PROD8_RE.fullmatch(rec[10:18]):
            continue
        cust_raw = rec[127:133]
        if not re.fullmatch(rb"\d{6}", cust_raw):
            continue

        line_no = struct.unpack_from("<H", rec, 8)[0]
        if not (1 <= line_no <= 99):
            continue

        qty = struct.unpack_from("<I", rec, 64)[0]
        if qty > 9_999:
            continue
        # qty=0 を許可（貸与品・P箱・送料等）

        amt = struct.unpack_from("<I", rec, 80)[0]
        if amt > 10_000_000:
            continue

        # 日付: SHDEN 計上日マップ優先、なければ @158 入力日フォールバック
        date_str = date_map.get(inv_id)
        date_src = "shden"
        if not date_str:
            dr = rec[158:166]
            if DATE_RE.fullmatch(dr):
                d = dr.decode()
                date_str = f"{d[:4]}-{d[4:6]}-{d[6:8]}"
                date_src = "shtor"
            else:
                date_str = "unknown"
                date_src = "none"

        prod_str = rec[10:18].decode("ascii")
        prod_code = prod_str[2:].lstrip("0") or prod_str[2:]
        prod_name = decode_cp932(rec[18:58])
        cust = cust_raw.decode("ascii")

        results.append({
            "id": str(uuid.uuid5(SAKE_UUID_NS, f"shtor:{inv_id}:{line_no}")),
            "legacy_document_no": str(inv_id),
            "document_no": str(inv_id),
            "line_no": line_no,
            "legacy_product_code": prod_code or None,
            "product_name": prod_name or None,
            "quantity": qty,
            "unit_price": amt // qty if qty else 0,
            "line_amount": amt,
            "amount": amt,
            "note": f"date:{date_str} inv:{inv_id} cust:{cust} src:diff dsrc:{date_src}",
        })

    return results


# ---------------------------------------------------------------------------
# スナップショット（ページ単位）
# ---------------------------------------------------------------------------

def compute_page_snapshot(data: bytes) -> dict[int, bytes]:
    """ページ (16384B) ごとの md5 ハッシュを計算。"""
    num_pages = len(data) // SHTOR_PAGE_SIZE
    return {
        pn: hashlib.md5(data[pn * SHTOR_PAGE_SIZE : (pn + 1) * SHTOR_PAGE_SIZE]).digest()
        for pn in range(num_pages)
    }


def find_changed_pages(old_snap: dict[int, bytes],
                       new_snap: dict[int, bytes]) -> list[int]:
    """変更されたページ番号を返す。"""
    return [pn for pn, h in new_snap.items() if old_snap.get(pn) != h]


def _save_snapshot(new_snapshot: dict[int, bytes], data_len: int,
                   config: dict[str, Any]) -> None:
    """スナップショット + ファイルmtime を保存。"""
    import os
    shtor_path = Path(config["z_drive_path"]) / "sh" / "dat" / "SHTOR.DAT"
    shden_path = Path(config["z_drive_path"]) / "sh" / "dat" / "SHDEN.DAT"
    payload = {
        "snapshot": new_snapshot,
        "file_size": data_len,
        "shtor_mtime": os.path.getmtime(shtor_path) if shtor_path.exists() else 0,
        "shden_mtime": os.path.getmtime(shden_path) if shden_path.exists() else 0,
    }
    with SNAPSHOT_PATH.open("wb") as f:
        pickle.dump(payload, f)


# ---------------------------------------------------------------------------
# upsert
# ---------------------------------------------------------------------------

def upsert_lines(config: dict[str, Any], records: list[dict[str, Any]],
                 logger: logging.Logger, dry_run: bool = False) -> int:
    """sales_document_lines に UPSERT。"""
    if not records:
        return 0
    url = config["supabase_url"].rstrip("/") + "/rest/v1/sales_document_lines"
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
            resp = session.post(f"{url}?on_conflict=id", json=batch, timeout=120)
            if not resp.ok:
                logger.error("UPSERT error: %s %s", resp.status_code, resp.text[:200])
        total += len(batch)
    return total


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="SHTOR.DAT ページ構造対応デコーダ")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--init", action="store_true", help="初回スナップショット作成のみ")
    parser.add_argument("--full-scan", action="store_true",
                        help="差分比較をスキップして全ページを処理")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    filepath = Path(config["z_drive_path"]) / "sh" / "dat" / "SHTOR.DAT"
    if not filepath.exists():
        logger.error("File not found: %s", filepath)
        return 1

    # mtime チェック: ファイルが前回から変わっていなければスキップ（1.4GB読み込み回避）
    if not args.full_scan and SNAPSHOT_PATH.exists():
        import os
        mtime = os.path.getmtime(filepath)
        shden_path = Path(config["z_drive_path"]) / "sh" / "dat" / "SHDEN.DAT"
        shden_mtime = os.path.getmtime(shden_path) if shden_path.exists() else 0
        try:
            with SNAPSHOT_PATH.open("rb") as f:
                old_data = pickle.load(f)
            if (old_data.get("shtor_mtime") == mtime
                    and old_data.get("shden_mtime") == shden_mtime):
                logger.info("No file changes (mtime unchanged), skipping")
                return 0
        except Exception:
            pass

    logger.info("Reading: %s", filepath)
    data = filepath.read_bytes()
    num_pages = len(data) // SHTOR_PAGE_SIZE
    logger.info("page_size=%d, pages=%d, file_size=%d",
                SHTOR_PAGE_SIZE, num_pages, len(data))

    # SHDEN.DAT から計上日マップを構築
    date_map = load_shden_posting_date_map(config, logger)

    # スナップショット（ページ単位）
    new_snapshot = compute_page_snapshot(data)
    logger.info("Snapshot computed: %d pages", len(new_snapshot))

    if args.init:
        with SNAPSHOT_PATH.open("wb") as f:
            _save_snapshot(new_snapshot, len(data), config)
        logger.info("Initial snapshot saved")
        return 0

    # 処理対象ページの決定
    if args.full_scan:
        logger.info("Full-scan mode: processing all pages")
        target_pages = list(range(num_pages))
    elif not SNAPSHOT_PATH.exists():
        with SNAPSHOT_PATH.open("wb") as f:
            _save_snapshot(new_snapshot, len(data), config)
        logger.info("Initial snapshot created. Next run will detect changes.")
        return 0
    else:
        with SNAPSHOT_PATH.open("rb") as f:
            old_data = pickle.load(f)
        old_snapshot = old_data["snapshot"]
        target_pages = find_changed_pages(old_snapshot, new_snapshot)
        logger.info("Changed pages: %d / %d", len(target_pages), num_pages)
        if not target_pages:
            logger.info("No changes detected")
            with SNAPSHOT_PATH.open("wb") as f:
                _save_snapshot(new_snapshot, len(data), config)
            return 0

    # --- Pass1: データページ (byte4=0x44) からレコード抽出（正規データ） ---
    # 同一UUID（inv+line）が複数ページに異なる金額で存在する場合は多数決で採用。
    # Btrieve は修正時に旧データが残るため、修正後の値を持つページが複数ある。
    from collections import Counter as _Counter
    batch: dict[str, dict[str, Any]] = {}
    _vote: dict[str, _Counter] = {}  # uid -> Counter({amt: count})
    data_page_count = 0
    index_page_count = 0
    for pn in target_pages:
        page_data = data[pn * SHTOR_PAGE_SIZE : (pn + 1) * SHTOR_PAGE_SIZE]
        if page_data[4] == 0x44:
            rows = extract_page_records(page_data, date_map)
            if rows:
                data_page_count += 1
            for row in rows:
                uid = row["id"]
                amt = row.get("amount") or row.get("line_amount") or 0
                if uid not in _vote:
                    _vote[uid] = _Counter()
                _vote[uid][amt] += 1
                batch[uid] = row  # 後勝ち（暫定）

    # 多数決: 最も多く出現した金額のレコードを採用
    winning_amt: dict[str, int] = {}
    for uid, counter in _vote.items():
        if len(counter) > 1:
            winning_amt[uid] = counter.most_common(1)[0][0]

    if winning_amt:
        for pn in target_pages:
            page_data = data[pn * SHTOR_PAGE_SIZE : (pn + 1) * SHTOR_PAGE_SIZE]
            if page_data[4] != 0x44:
                continue
            rows = extract_page_records(page_data, date_map)
            for row in rows:
                uid = row["id"]
                if uid in winning_amt:
                    amt = row.get("amount") or row.get("line_amount") or 0
                    if amt == winning_amt[uid]:
                        batch[uid] = row

    data_only_count = len(batch)

    # --- Pass2: 非データページから不足分を補完 ---
    # date_map に存在するinv_idのみ受け入れ（偽陽性排除）
    for pn in target_pages:
        page_data = data[pn * SHTOR_PAGE_SIZE : (pn + 1) * SHTOR_PAGE_SIZE]
        if page_data[4] == 0x44:
            continue  # データページは Pass1 で処理済み
        rows = extract_page_records(page_data, date_map)
        if rows:
            index_page_count += 1
        for row in rows:
            inv_int = int(row["legacy_document_no"]) if row["legacy_document_no"].isdigit() else 0
            if row["id"] not in batch and inv_int in date_map:
                batch[row["id"]] = row

    records = list(batch.values())
    dated = sum(1 for r in records if "date:unknown" not in r["note"])
    shden_dates = sum(1 for r in records if "dsrc:shden" in r["note"])
    supplemented = len(records) - data_only_count
    logger.info("Extracted: %d records (data_pages=%d, supplemented=%d, dated=%d, shden=%d, unknown=%d)",
                len(records), data_only_count, supplemented, dated, shden_dates, len(records) - dated)

    if records:
        total = upsert_lines(config, records, logger, dry_run=args.dry_run)
        logger.info("Upserted: %d lines", total)
        # refresh_facts.py にリフレッシュが必要と通知
        if not args.dry_run:
            (BASE_DIR / ".needs_refresh").write_text("1")

    # スナップショット更新
    if not args.dry_run:
        with SNAPSHOT_PATH.open("wb") as f:
            _save_snapshot(new_snapshot, len(data), config)
        logger.info("Snapshot updated")

    # 明細 → ヘッダー FK 自動補完
    if not args.dry_run and records:
        for rpc in ("link_lines_to_headers", "backfill_header_amounts"):
            try:
                url_rpc = config["supabase_url"].rstrip("/") + f"/rest/v1/rpc/{rpc}"
                resp = requests.post(url_rpc, json={}, headers={
                    "apikey": config["supabase_anon_key"],
                    "Authorization": f"Bearer {config['supabase_anon_key']}",
                    "Content-Type": "application/json",
                }, timeout=60)
                if resp.ok:
                    logger.info("%s: OK", rpc)
                else:
                    logger.warning("%s failed: %d", rpc, resp.status_code)
            except Exception as exc:
                logger.warning("%s error: %s", rpc, exc)

    return 0


if __name__ == "__main__":
    sys.exit(main())
