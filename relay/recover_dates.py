"""指定日付の売上明細を SHTOR.DAT からピンポイント回収するスクリプト。

ロジック:
  - SHTOR.DAT 全体を bytes.find で高速スキャンして対象日付の位置を列挙
  - 各位置 dl について:
      1. dl-31 に 6桁の得意先コードがあるか (METHOD 1 ヘッダ検証)
      2. dl+68 に 5〜6桁の得意先コードがあるか (ENTRY_PATTERN クロス検証)
         → 両方満たす場合のみ「正しい日付フィールド」と判定
  - decoder_sales_diff.py と同一の UUID / note フォーマット
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
LOG_PATH = BASE_DIR / "relay_log.txt"
CONFIG_PATH_LOCAL = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"

DATE_RE = re.compile(rb"20[12]\d(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])")
# dl-31 の得意先コード検証 (6バイト = スペース+5桁 or 6桁)
CUST_HDR_RE  = re.compile(rb"[\s\d]\d{4,5}")
# dl+68 のクロス検証 (ENTRY_PATTERN 得意先位置)
CUST_EP_RE   = re.compile(rb"\s?\d{5,6}")
# B-tree 構造解析で確認された偽陽性得意先コード（CSV照合で実在しないと確認済み）
KNOWN_FALSE_POSITIVE_CUSTS: frozenset[str] = frozenset({"150946", "110095", "151901"})


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("recover_dates")
    logger.setLevel(logging.INFO)
    logger.handlers.clear()
    for h in [logging.StreamHandler(),
              logging.FileHandler(LOG_PATH, encoding="utf-8")]:
        h.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
        logger.addHandler(h)
    return logger


def load_config() -> dict[str, Any]:
    p = CONFIG_PATH_LOCAL if CONFIG_PATH_LOCAL.exists() else CONFIG_PATH
    return json.loads(p.read_text(encoding="utf-8"))


def extract_for_dates(
    data: bytes,
    record_size: int,
    target_date_bytes: list[bytes],
    filepath_name: str,
    logger: logging.Logger,
    no_dedup: bool = False,
) -> list[dict[str, Any]]:
    total_slots = (len(data) - HEADER_SIZE) // record_size
    results: dict[str, dict] = {}
    seen_transactions: set[tuple] = set()
    candidates = 0

    for target in target_date_bytes:
        pos = 0
        while True:
            idx = data.find(target, pos)
            if idx == -1:
                break
            pos = idx + 1

            if idx < HEADER_SIZE:
                continue

            slot = (idx - HEADER_SIZE) // record_size
            if slot >= total_slots:
                continue

            slot_start = HEADER_SIZE + slot * record_size
            dl = idx - slot_start  # date offset within slot

            if dl < 0 or dl + 8 > record_size:
                continue

            # 削除フラグ / 空スロット
            # 0x01: 削除済み, 0x00: 未使用スロット (偽陽性の温床)
            if data[slot_start] in (0x00, 0x01):
                continue

            # ── クロス検証 ──────────────────────────────────────────────
            # 1) dl-31 に得意先コード (ヘッダ)
            co = dl - 31
            if co < 0 or co + 6 > record_size:
                continue
            cust_hdr = data[slot_start + co: slot_start + co + 6]
            if not CUST_HDR_RE.fullmatch(cust_hdr):
                continue

            # 2) dl+68 に得意先コード (ENTRY_PATTERN 側)
            #    6桁数字 + 直後がスペース(0x20) → 厳格なフォーマット確認
            ep = dl + 68
            if ep + 7 > record_size:
                continue
            cust_ep = data[slot_start + ep: slot_start + ep + 6]
            if not CUST_EP_RE.match(cust_ep):
                continue
            if data[slot_start + ep + 6] != 0x20:
                continue

            # 3) dl-31 と dl+68 の得意先コードが一致することを確認
            #    B-tree 内部ノードの偽陽性は2箇所の値が異なる場合がほとんど
            def _norm_cust(b: bytes) -> str:
                s = b.decode("ascii", errors="replace").strip().lstrip("0")
                return s or "0"
            if _norm_cust(cust_hdr) != _norm_cust(cust_ep[:6]):
                continue
            # ────────────────────────────────────────────────────────────

            # DATE_RE フルマッチ確認
            date_raw = data[slot_start + dl: slot_start + dl + 8]
            if not DATE_RE.fullmatch(date_raw):
                continue

            # 金額・数量
            ao = dl - 78
            qo = dl - 94
            if ao < 0 or qo < 0 or ao + 4 > record_size or qo + 4 > record_size:
                continue

            a = struct.unpack_from("<i", data, slot_start + ao)[0]
            q = struct.unpack_from("<i", data, slot_start + qo)[0]

            if abs(a) > 10_000_000 or abs(q) > 99_999:
                continue
            if a == 0 and q == 0:
                continue
            if a <= 0:
                continue

            sales_date = f"{date_raw[:4].decode()}-{date_raw[4:6].decode()}-{date_raw[6:8].decode()}"
            cust_raw = cust_hdr.decode("ascii", errors="replace").strip()
            cust_code = cust_raw.lstrip("0") or cust_raw

            if cust_code in KNOWN_FALSE_POSITIVE_CUSTS:
                continue

            # 商品コード (ao-69 付近)
            prod_code: str | None = None
            po = ao - 69
            if po >= 0 and po + 7 <= record_size:
                cand = data[slot_start + po: slot_start + po + 7].decode("ascii", errors="replace").strip()
                if re.match(r"^\d{3,7}$", cand):
                    prod_code = cand.lstrip("0") or cand

            uid = str(uuid.uuid5(SAKE_UUID_NS, f"diff:{filepath_name}:{slot}:{ao}"))
            if uid in results:
                continue

            # B-tree 重複排除: 同一 (date, cust, product, amount) は1件のみ残す
            # --no-dedup 指定時はスキップ (全スロットを強制挿入)
            if not no_dedup:
                dedup_key = (sales_date, cust_code, prod_code or "", a)
                if dedup_key in seen_transactions:
                    continue
                seen_transactions.add(dedup_key)

            candidates += 1
            results[uid] = {
                "id": uid,
                "legacy_document_no": f"D{slot}",
                "document_no": f"D{slot}",
                "line_no": 1,
                "legacy_product_code": prod_code,
                "product_name": None,
                "quantity": q,
                "unit_price": a // q if q else 0,
                "line_amount": a,
                "amount": a,
                "note": f"date:{sales_date} cust:{cust_code} src:diff",
            }

    logger.info("Candidate positions scanned, validated: %d → extracted: %d", candidates, len(results))
    return list(results.values())


def upsert(config: dict, records: list[dict], logger: logging.Logger, dry_run: bool) -> int:
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
        batch = records[i: i + 500]
        if dry_run:
            for r in batch[:5]:
                logger.info("[DRY-RUN] date=%s cust=%s amt=%s",
                            r["note"].split()[0].split(":")[1],
                            r["note"].split()[1].split(":")[1],
                            r["amount"])
            logger.info("[DRY-RUN] %d lines (showing first 5)", len(batch))
            total += len(batch)
        else:
            resp = session.post(
                f"{url}/rest/v1/sales_document_lines?on_conflict=id",
                json=batch, timeout=120,
            )
            if resp.ok:
                total += len(batch)
            else:
                logger.error("UPSERT error: %s %s", resp.status_code, resp.text[:200])
    return total


def main() -> int:
    import argparse
    parser = argparse.ArgumentParser(description="指定日付の売上スロットをピンポイント回収")
    parser.add_argument("dates", nargs="+", help="回収する日付 YYYYMMDD 形式 (複数可)")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--no-dedup", action="store_true",
                        help="seen_transactions の B-tree 重複排除を無効化して全スロットを挿入")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    filepath = Path(config["z_drive_path"]) / "sh" / "dat" / "SHTOR.DAT"
    if not filepath.exists():
        logger.error("File not found: %s", filepath)
        return 1

    target_date_bytes = [d.encode("ascii") for d in args.dates]
    logger.info("Target dates: %s", args.dates)

    logger.info("Reading %s ...", filepath)
    data = filepath.read_bytes()
    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size
    logger.info("record_size=%d, total_slots=%d", record_size, total_slots)

    if args.no_dedup:
        logger.warning("--no-dedup: B-tree dedup disabled — all slots inserted regardless of duplicates")
    lines = extract_for_dates(data, record_size, target_date_bytes, filepath.name, logger,
                              no_dedup=args.no_dedup)

    # 日付別サマリー
    by_date: dict[str, list[int]] = {}
    for r in lines:
        d = r["note"].split()[0].split(":")[1]
        by_date.setdefault(d, []).append(r["amount"])
    for d, amts in sorted(by_date.items()):
        logger.info("  %s: %d lines, total=%d", d, len(amts), sum(amts))

    if lines:
        total = upsert(config, lines, logger, args.dry_run)
        if not args.dry_run:
            logger.info("Upserted: %d lines", total)
    else:
        logger.info("No lines extracted")

    return 0


if __name__ == "__main__":
    sys.exit(main())
