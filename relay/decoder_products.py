"""SHSYO.MST (商品マスタ) のデコーダ。

sake_products_sh の _raw_b64 から商品レコードをデコードし、
Supabase の products テーブルに UPSERT する。

2つのモード:
  --from-supabase (デフォルト): Supabase上のrawデータから直接デコード
  --from-file: ローカルのMSTファイルから直接読み込み
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

HEADER_SIZE = 0x200
RECORD_MARKER = b"\x09\x2e\x38\x09"


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("decoder_products")
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


def decode_cp932(raw: bytes) -> str:
    return raw.decode("cp932", errors="replace").replace("\x00", "").strip()


def decode_cp932_or_none(raw: bytes) -> str | None:
    text = decode_cp932(raw)
    return text if text else None


def fetch_raw_records(config: dict[str, Any], logger: logging.Logger) -> list[dict[str, Any]]:
    """sake_products_sh テーブルから全rawレコードを取得。"""
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
            f"{url}/rest/v1/sake_products_sh",
            params={
                "select": "_record_index,_raw_b64,_record_size",
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


def _read_clean(slot_data: bytes, start: int, length: int) -> str:
    """NULLバイトで終端してCP932デコード。末尾の制御文字も除去。"""
    raw = slot_data[start : start + length]
    end = raw.find(b"\x00")
    if end >= 0:
        raw = raw[:end]
    text = raw.decode("cp932", errors="replace").strip()
    # 末尾の制御文字 (U+0000-U+001F, U+007F, U+FFFD) を除去
    while text and (ord(text[-1]) < 0x20 or text[-1] == "\ufffd" or text[-1] == "\x7f"):
        text = text[:-1]
    return text.strip()


def _extract_fields_from_slot(slot_data: bytes, data_start: int, remaining: int) -> dict[str, Any] | None:
    """マーカー直後のバイト列からフィールドを抽出。

    確定済みレイアウト (マーカー+4 からの相対):
      0:   商品コード (7 bytes, ASCII)
      7:   カナ名 (10 bytes, CP932半角カナ)
     17:   商品名略称 (26 bytes, CP932)
     43:   商品名 (32 bytes, CP932) ← NULLパディングあり
     75:   (4 bytes 予約)
     79:   容量コード (1 byte)
     80:   'A' (1 byte)
     81:   分類コード (5 bytes, ASCII) e.g. "00103"
     86:   (4 bytes フラグ)
     90:   仕入単価 (8 bytes, IEEE 754 double LE)
     98:   売価 (8 bytes, IEEE 754 double LE)
    """
    if remaining < 50:
        return None

    code = _read_clean(slot_data, data_start, 7)
    if not code:
        return None

    kana = _read_clean(slot_data, data_start + 7, 10)
    short_name = _read_clean(slot_data, data_start + 17, 26)
    name = _read_clean(slot_data, data_start + 43, 32)

    # フィールド境界が曖昧な場合: 7-75の全体テキストから最長の意味あるテキストを取得
    full_text = _read_clean(slot_data, data_start + 7, 68)
    # nameが容量だけ(数字+ml)の場合、full_textから商品名を復元
    if not name or (len(name) < 8 and "ml" in name.lower()):
        name = full_text
    # short_nameが壊れている場合も復元
    if short_name and len(short_name) < 4:
        short_name = None

    if not name and not short_name:
        return None

    category_code = None
    if remaining > 86:
        category_code = _read_clean(slot_data, data_start + 81, 5) or None

    # 価格 (IEEE 754 double, little-endian)
    purchase_price = None
    sale_price = None

    if remaining > 98:
        try:
            pp = struct.unpack_from("<d", slot_data, data_start + 90)[0]
            if 1 < pp < 9999999:
                purchase_price = int(pp)
        except (struct.error, IndexError):
            pass

    if remaining > 106:
        try:
            sp = struct.unpack_from("<d", slot_data, data_start + 98)[0]
            if 1 < sp < 9999999:
                sale_price = int(sp)
        except (struct.error, IndexError):
            pass

    return {
        "id": str(uuid.uuid5(SAKE_UUID_NS, f"product:{code}")),
        "legacy_product_code": code,
        "product_code": code,
        "name": name or short_name,
        "kana_name": kana or None,
        "short_name": short_name if short_name != name else None,
        "category_code": category_code,
        "purchase_price": purchase_price,
        "default_sale_price": sale_price,
        "is_active": True,
        "updated_at": datetime.now(tz=UTC).isoformat(),
    }


def decode_products_from_raw(raw_rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Supabase rawレコードから商品データをデコード。"""
    products: list[dict[str, Any]] = []
    seen_codes: set[str] = set()

    for row in raw_rows:
        raw_b64 = row.get("_raw_b64", "")
        if not raw_b64:
            continue

        slot_data = base64.b64decode(raw_b64)
        search_from = 0

        while True:
            marker_pos = slot_data.find(RECORD_MARKER, search_from)
            if marker_pos < 0:
                break

            data_start = marker_pos + len(RECORD_MARKER)
            remaining = len(slot_data) - data_start

            if remaining < 50:
                search_from = marker_pos + 1
                continue

            code_bytes = slot_data[data_start : data_start + 7]
            code_str = code_bytes.decode("ascii", errors="replace").strip()

            if not code_str or not code_str.replace(" ", "").isdigit():
                search_from = marker_pos + 1
                continue

            code = code_str.strip()
            if code in seen_codes:
                search_from = marker_pos + 1
                continue

            try:
                rec = _extract_fields_from_slot(slot_data, data_start, remaining)
            except Exception:
                search_from = marker_pos + 1
                continue

            if rec and rec.get("legacy_product_code"):
                seen_codes.add(code)
                products.append(rec)

            search_from = marker_pos + 1

    return products


def extract_products_from_file(filepath: Path) -> list[dict[str, Any]]:
    """ローカルMSTファイルからマーカーベースで商品レコードを抽出。"""
    data = filepath.read_bytes()
    if len(data) < HEADER_SIZE or data[:2] != b"FC":
        raise ValueError(f"Not a Magic ISAM file: {filepath}")

    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size

    products: list[dict[str, Any]] = []
    seen_codes: set[str] = set()

    for slot_idx in range(total_slots):
        slot_start = HEADER_SIZE + slot_idx * record_size
        slot_data = data[slot_start : slot_start + record_size]
        search_from = 0

        while True:
            marker_pos = slot_data.find(RECORD_MARKER, search_from)
            if marker_pos < 0:
                break

            data_start = marker_pos + len(RECORD_MARKER)
            remaining = len(slot_data) - data_start

            if remaining < 50:
                search_from = marker_pos + 1
                continue

            code_bytes = slot_data[data_start : data_start + 7]
            code_str = code_bytes.decode("ascii", errors="replace").strip()

            if not code_str or not code_str.replace(" ", "").isdigit():
                search_from = marker_pos + 1
                continue

            code = code_str.strip()
            if code in seen_codes:
                search_from = marker_pos + 1
                continue

            try:
                rec = _extract_fields_from_slot(slot_data, data_start, remaining)
            except Exception:
                search_from = marker_pos + 1
                continue

            if rec and rec.get("legacy_product_code"):
                seen_codes.add(code)
                products.append(rec)

            search_from = marker_pos + 1

    return products


def upsert_to_supabase(
    config: dict[str, Any],
    products: list[dict[str, Any]],
    logger: logging.Logger,
    dry_run: bool = False,
) -> int:
    if not products:
        return 0

    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update({
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,missing=default",
    })

    batch_size = 200
    total = 0
    for i in range(0, len(products), batch_size):
        batch = products[i : i + batch_size]
        if dry_run:
            logger.info("[DRY-RUN] would upsert %d products (sample: %s)", len(batch), batch[0]["legacy_product_code"])
        else:
            resp = session.post(
                f"{url}/rest/v1/products?on_conflict=legacy_product_code",
                json=batch,
                timeout=60,
            )
            resp.raise_for_status()
        total += len(batch)
        logger.info("UPSERT products: batch=%d total=%d", len(batch), total)

    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="SHSYO.MST → products テーブルデコーダ")
    parser.add_argument("--dry-run", action="store_true", help="Supabaseに書かず表示のみ")
    parser.add_argument("--show-sample", type=int, default=0, help="デコード結果のサンプルN件を表示")
    parser.add_argument("--from-file", action="store_true", help="ローカルMSTファイルから読み込み（デフォルト: Supabase raw）")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    if args.from_file:
        filepath = Path(config["z_drive_path"]) / "sh" / "mst" / "SHSYO.MST"
        logger.info("Decoding from file: %s", filepath)
        products = extract_products_from_file(filepath)
    else:
        logger.info("Decoding from Supabase raw (sake_products_sh)...")
        raw_rows = fetch_raw_records(config, logger)
        logger.info("Fetched %d raw records", len(raw_rows))
        products = decode_products_from_raw(raw_rows)

    logger.info("Decoded: %d unique products", len(products))

    if args.show_sample and products:
        for p in products[: args.show_sample]:
            logger.info(
                "  %s | %s | %s | cat=%s | cost=%s | sale=%s",
                p["legacy_product_code"],
                p["kana_name"],
                p["name"],
                p["category_code"],
                p["purchase_price"],
                p["default_sale_price"],
            )

    if not products:
        logger.warning("No products decoded")
        return 1

    total = upsert_to_supabase(config, products, logger, dry_run=args.dry_run)
    logger.info("Done: %d products upserted", total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
