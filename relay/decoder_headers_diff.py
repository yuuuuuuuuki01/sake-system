"""SHDEN.DAT (売上伝票ヘッダ) 差分検出デコーダ。

SHTOR.DAT用 decoder_sales_diff.py と同じ chunk-based diff 方式。
前回スナップショットとの差分スロットだけを調べ、データノードを抽出して
sales_document_headers に UPSERT する。

データノード判定: @234 に YYYYMMDD 形式の日付があるレコード。

フィールドマップ (decoder_sales.py より):
  @50:  担当コード      (3B ASCII)
  @234: 計上日          (8B ASCII YYYYMMDD)
  @260: 請求日          (8B ASCII YYYYMMDD)
  @276: 締日            (2B ASCII)
  @330: 得意先コード    (6B ASCII)
  @337: 得意先名        (40B CP932)
  @390: 備考            (CP932, 40B)
  @444: 伝票番号        (12B ASCII)
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
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import requests

SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")
HEADER_SIZE = 0x200          # Magic ISAM ファイルヘッダサイズ
CHUNK_SIZE  = 1000           # スロット数 / チャンク

BASE_DIR         = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH      = BASE_DIR / "relay_config.json"
LOG_PATH         = BASE_DIR / "relay_log.txt"
SNAPSHOT_PATH    = BASE_DIR / ".shden_snapshot"

DATE_RE = re.compile(rb"20[12]\d(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])")


# ─── ユーティリティ ───────────────────────────────────────────────────────────

def setup_logging() -> logging.Logger:
    logger = logging.getLogger("decoder_headers_diff")
    logger.setLevel(logging.INFO)
    logger.handlers.clear()
    for h in [logging.StreamHandler(),
              logging.FileHandler(LOG_PATH, encoding="utf-8")]:
        h.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
        logger.addHandler(h)
    return logger


def load_config() -> dict[str, Any]:
    path = LOCAL_CONFIG_PATH if LOCAL_CONFIG_PATH.exists() else CONFIG_PATH
    with path.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def decode_cp932(raw: bytes) -> str:
    return raw.decode("cp932", errors="replace").strip("\x00 \ufffd")


# ─── スナップショット / diff ──────────────────────────────────────────────────

def compute_snapshot(data: bytes, record_size: int) -> dict[int, bytes]:
    total_slots = (len(data) - HEADER_SIZE) // record_size
    snap: dict[int, bytes] = {}
    for chunk in range((total_slots + CHUNK_SIZE - 1) // CHUNK_SIZE):
        start = HEADER_SIZE + chunk * CHUNK_SIZE * record_size
        end   = min(start + CHUNK_SIZE * record_size, len(data))
        snap[chunk] = hashlib.md5(data[start:end]).digest()
    return snap


def find_changed_slots(data: bytes, record_size: int,
                       old_snap: dict[int, bytes],
                       new_snap: dict[int, bytes]) -> list[int]:
    total_slots = (len(data) - HEADER_SIZE) // record_size
    slots: list[int] = []
    for chunk, digest in new_snap.items():
        if digest == old_snap.get(chunk):
            continue
        base = chunk * CHUNK_SIZE
        for i in range(CHUNK_SIZE):
            s = base + i
            if s >= total_slots:
                break
            slots.append(s)
    return slots


# ─── レコード抽出 ─────────────────────────────────────────────────────────────

def extract_headers(data: bytes, record_size: int,
                    slots: list[int]) -> list[dict[str, Any]]:
    """変更スロットからデータノードを抽出してヘッダ辞書リストを返す。

    データノード判定: @234 に YYYYMMDD 形式の日付 AND @330 に数字の得意先コードがあるレコード。
    decoder_sales.py と同じロジック。伝票番号(@444)が取れない場合はスロット番号を使う。
    """
    results: dict[str, dict[str, Any]] = {}   # doc_no → dict (重複排除)
    now = datetime.now(tz=UTC).isoformat()

    for slot in slots:
        offset = HEADER_SIZE + slot * record_size
        rec = data[offset: offset + record_size]
        if len(rec) < 450:
            continue

        # データノード判定: @234 に有効な計上日
        date_raw = rec[234:242]
        if not DATE_RE.fullmatch(date_raw):
            continue
        sales_date = f"{date_raw[:4].decode()}-{date_raw[4:6].decode()}-{date_raw[6:8].decode()}"

        # 得意先コード @330 (6B ASCII) — なければ非データノードとしてスキップ
        cust_raw = rec[330:336].decode("ascii", errors="replace").strip()
        if not cust_raw or not re.match(r"^\d+$", cust_raw):
            continue
        cust_code = cust_raw.lstrip("0") or cust_raw

        # 伝票番号 @444 (6B+ ASCII) — 取れなければスロット番号をフォールバック
        doc_raw = rec[444:456].decode("ascii", errors="replace").strip()
        if doc_raw and doc_raw.isdigit():
            doc_no = doc_raw
        else:
            doc_no = f"S{slot}"

        if doc_no in results:
            continue   # 同一伝票の重複スロットはスキップ

        # 請求日 @260
        bill_raw = rec[260:268]
        bill_date: str | None = None
        if DATE_RE.fullmatch(bill_raw):
            bill_date = f"{bill_raw[:4].decode()}-{bill_raw[4:6].decode()}-{bill_raw[6:8].decode()}"

        staff_code = rec[50:53].decode("ascii", errors="replace").strip() or None
        cust_name  = decode_cp932(rec[337:377]) or None
        remarks    = decode_cp932(rec[390:430]) or None

        results[doc_no] = {
            "id": str(uuid.uuid5(SAKE_UUID_NS, f"sales_header:{doc_no}")),
            "legacy_document_no": doc_no,
            "document_no": doc_no,
            "sales_date": sales_date,
            "document_date": bill_date or sales_date,
            "legacy_customer_code": cust_code,
            "customer_name": cust_name,
            "staff_code": staff_code,
            "note": remarks,
            "updated_at": now,
        }

    return list(results.values())


# ─── Supabase UPSERT ─────────────────────────────────────────────────────────

def upsert(config: dict[str, Any], headers: list[dict[str, Any]],
           logger: logging.Logger, dry_run: bool = False) -> int:
    if dry_run:
        logger.info("[DRY-RUN] would upsert %d headers", len(headers))
        return len(headers)

    url = config["supabase_url"].rstrip("/") + "/rest/v1/sales_document_headers"
    req_headers = {
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal",
    }
    batch = 500
    total = 0
    for i in range(0, len(headers), batch):
        chunk = headers[i: i + batch]
        resp = requests.post(url, json=chunk, headers=req_headers, timeout=60)
        if not resp.ok:
            logger.warning("UPSERT error: HTTP %d %s", resp.status_code, resp.text[:200])
        else:
            total += len(chunk)
    return total


def call_link_rpc(config: dict[str, Any], logger: logging.Logger) -> None:
    """明細テーブルの sales_document_header_id を自動補完する。"""
    try:
        url = config["supabase_url"].rstrip("/") + "/rest/v1/rpc/link_lines_to_headers"
        resp = requests.post(url, json={}, headers={
            "apikey": config["supabase_anon_key"],
            "Authorization": f"Bearer {config['supabase_anon_key']}",
            "Content-Type": "application/json",
        }, timeout=60)
        if resp.ok:
            logger.info("link_lines_to_headers: OK")
        else:
            logger.warning("link_lines_to_headers failed: %d", resp.status_code)
    except Exception as exc:
        logger.warning("link_lines_to_headers error: %s", exc)


# ─── エントリポイント ─────────────────────────────────────────────────────────

def main() -> int:
    import argparse
    parser = argparse.ArgumentParser(description="SHDEN.DAT 差分デコーダ")
    parser.add_argument("--init", action="store_true", help="初回スナップショット作成のみ")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force", action="store_true", help="差分なしでも全スロット処理")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    filepath = Path(config["z_drive_path"]) / "sh" / "dat" / "SHDEN.DAT"
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

    # 初回: スナップショット保存して全スロット処理
    if args.init or not SNAPSHOT_PATH.exists():
        with SNAPSHOT_PATH.open("wb") as f:
            pickle.dump({"snapshot": new_snapshot, "file_size": len(data)}, f)
        logger.info("Initial snapshot saved")
        if args.init:
            return 0

    # 差分検出
    with SNAPSHOT_PATH.open("rb") as f:
        old_data = pickle.load(f)
    old_snapshot = old_data["snapshot"]

    changed_chunks = sum(1 for k in new_snapshot if new_snapshot[k] != old_snapshot.get(k))
    logger.info("Changed chunks: %d / %d", changed_chunks, len(new_snapshot))

    if changed_chunks == 0 and not args.force:
        logger.info("No changes detected")
        with SNAPSHOT_PATH.open("wb") as f:
            pickle.dump({"snapshot": new_snapshot, "file_size": len(data)}, f)
        return 0

    all_slots = list(range(total_slots)) if args.force else \
        find_changed_slots(data, record_size, old_snapshot, new_snapshot)
    logger.info("Changed slots: %d", len(all_slots))

    headers = extract_headers(data, record_size, all_slots)
    logger.info("Extracted: %d headers from %d changed slots", len(headers), len(all_slots))

    if headers:
        total = upsert(config, headers, logger, dry_run=args.dry_run)
        logger.info("Upserted: %d headers", total)

    # スナップショット更新
    with SNAPSHOT_PATH.open("wb") as f:
        pickle.dump({"snapshot": new_snapshot, "file_size": len(data)}, f)
    logger.info("Snapshot updated")

    # 明細FK自動補完
    if not args.dry_run:
        call_link_rpc(config, logger)

    return 0


if __name__ == "__main__":
    sys.exit(main())
