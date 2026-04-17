"""SHSYO.MST (商品マスタ) のデコーダ。

Magic ISAM の B-Tree leaf ページから商品レコードを抽出し、
Supabase の products テーブルに UPSERT する。

方針:
- 固定オフセットではなく、マーカーパターン (\t.8\t + コード) を検索
- マーカーの後に続くフィールドを相対オフセットで抽出
- レイアウトは decoder_customers.py と同パターン
"""
from __future__ import annotations

import json
import logging
import struct
import sys
import uuid
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import requests

# 決定的UUID生成用の名前空間 (顧客デコーダと同じ)
SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"

HEADER_SIZE = 0x200
# マーカー: TAB + ".8" + TAB (Magic内部のフィールド区切り)
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
    """CP932バイト列をデコードして前後の空白を除去。"""
    return raw.decode("cp932", errors="replace").strip()


def decode_cp932_or_none(raw: bytes) -> str | None:
    text = decode_cp932(raw)
    return text if text else None


def extract_products(filepath: Path) -> list[dict[str, Any]]:
    """SHSYO.MST からマーカーベースで商品レコードを抽出。"""
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

            # 商品コード (7 bytes ASCII)
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
                rec = _extract_fields(slot_data, data_start, remaining)
            except Exception:
                search_from = marker_pos + 1
                continue

            if rec and rec.get("legacy_product_code"):
                seen_codes.add(code)
                products.append(rec)

            search_from = marker_pos + 1

    return products


def _extract_fields(slot_data: bytes, start: int, remaining: int) -> dict[str, Any] | None:
    """マーカー直後のバイト列からフィールドを抽出。

    相対オフセット（マーカー+4 からの距離）:
      0:   商品コード (7 bytes, ASCII)
      7:   カナ名 (10 bytes, CP932半角カナ)
     17:   商品名略称 (26 bytes, CP932)
     43:   商品名 (40 bytes, CP932)
     83:   規格 (20 bytes, CP932)
    103:   単位 (4 bytes, CP932)
    107:   分類コード (3 bytes, ASCII)
    110:   税区分 (2 bytes, ASCII)
    112:   JANコード (13 bytes, ASCII)
    125:   仕入単価 (4 bytes, little-endian int32)
    129:   定価 (4 bytes, little-endian int32)
    133:   売価 (4 bytes, little-endian int32)
    137:   原価 (4 bytes, little-endian int32)

    ※ オフセットは推定値。実データで検証が必要。
    """
    if remaining < 100:
        return None

    def s(offset: int, length: int) -> bytes:
        return slot_data[start + offset : start + offset + length]

    code = decode_cp932(s(0, 7))
    if not code:
        return None

    kana = decode_cp932(s(7, 10))
    short_name = decode_cp932(s(17, 26))
    name = decode_cp932(s(43, 40))

    # 名前が空なら無効レコード
    if not name and not short_name:
        return None

    spec = decode_cp932_or_none(s(83, 20)) if remaining > 102 else None
    unit_name = decode_cp932_or_none(s(103, 4)) if remaining > 106 else None
    category_code = decode_cp932_or_none(s(107, 3)) if remaining > 109 else None
    tax_code = decode_cp932_or_none(s(110, 2)) if remaining > 111 else None
    jan_code = decode_cp932_or_none(s(112, 13)) if remaining > 124 else None

    # 価格フィールド (4 bytes little-endian int32)
    # 推定オフセット - 値が妥当な範囲かチェック
    purchase_price = None
    list_price = None
    sale_price = None
    cost_price = None

    if remaining > 140:
        try:
            pp = struct.unpack_from("<i", slot_data, start + 125)[0]
            lp = struct.unpack_from("<i", slot_data, start + 129)[0]
            sp = struct.unpack_from("<i", slot_data, start + 133)[0]
            cp = struct.unpack_from("<i", slot_data, start + 137)[0]
            # 価格は0〜999999の範囲が妥当
            if 0 <= pp <= 999999:
                purchase_price = pp
            if 0 <= lp <= 999999:
                list_price = lp
            if 0 <= sp <= 999999:
                sale_price = sp
            if 0 <= cp <= 999999:
                cost_price = cp
        except (struct.error, IndexError):
            pass

    # JAN コードの妥当性チェック (数字のみ、8桁 or 13桁)
    if jan_code and not (jan_code.isdigit() and len(jan_code) in (8, 13)):
        jan_code = None

    # デバッグ用: 未確定フィールドの生バイトをhexで保存
    raw_hint = None
    if remaining > 141:
        raw_tail = slot_data[start + 141 : start + min(remaining, 200)]
        raw_hint = raw_tail.hex()

    return {
        "id": str(uuid.uuid5(SAKE_UUID_NS, f"product:{code}")),
        "legacy_product_code": code,
        "product_code": code,
        "name": name or short_name,
        "kana_name": kana or None,
        "short_name": short_name if short_name != name else None,
        "spec": spec,
        "unit_name": unit_name,
        "category_code": category_code,
        "tax_code": tax_code,
        "jan_code": jan_code,
        "purchase_price": purchase_price,
        "list_price": list_price,
        "default_sale_price": sale_price,
        "default_cost_price": cost_price,
        "is_active": True,
        "memo": json.dumps({
            "raw_tail_hex": raw_hint,
        }, ensure_ascii=False) if raw_hint else None,
        "updated_at": datetime.now(tz=UTC).isoformat(),
    }


def upsert_to_supabase(
    config: dict[str, Any],
    products: list[dict[str, Any]],
    logger: logging.Logger,
    dry_run: bool = False,
) -> int:
    """products テーブルへ UPSERT。"""
    if not products:
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
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    filepath = Path(config["z_drive_path"]) / "sh" / "mst" / "SHSYO.MST"
    logger.info("Decoding: %s", filepath)

    products = extract_products(filepath)
    logger.info("Decoded: %d unique products", len(products))

    if args.show_sample and products:
        for p in products[: args.show_sample]:
            logger.info(
                "  %s | %s | %s | %s | sale=%s",
                p["legacy_product_code"],
                p["kana_name"],
                p["name"],
                p["spec"],
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
