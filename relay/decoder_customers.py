"""SHTKI.MST (得意先マスタ) のデコーダ。

Magic ISAM の B-Tree leaf ページから顧客レコードを抽出し、
Supabase の customers テーブルに UPSERT する。

方針:
- 固定オフセットではなく、マーカーパターン (\t.8\t + 6桁数字) を検索
- マーカーの後に続くフィールドを相対オフセットで抽出
- レイアウトは 相州長屋 (130725) のレコード解析から確定済み
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

# 決定的UUID生成用の名前空間 (顧客コードから同じUUIDを再現可能にする)
SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"

HEADER_SIZE = 0x200
# マーカー: TAB + ".8" + TAB (Magic内部のフィールド区切り)
RECORD_MARKER = b"\x09\x2e\x38\x09"


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("decoder_customers")
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


def extract_customers(filepath: Path) -> list[dict[str, Any]]:
    """SHTKI.MST からマーカーベースで顧客レコードを抽出。"""
    data = filepath.read_bytes()
    if len(data) < HEADER_SIZE or data[:2] != b"FC":
        raise ValueError(f"Not a Magic ISAM file: {filepath}")

    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size

    customers: list[dict[str, Any]] = []
    seen_codes: set[str] = set()

    # 全スロットをスキャンし、マーカーを検出
    # スロット境界を跨ぐレコードに対応するため、隣接スロットを連結して読む
    for slot_idx in range(total_slots):
        slot_start = HEADER_SIZE + slot_idx * record_size
        # 現スロット + 次スロットを連結（境界跨ぎ対応）
        next_end = min(slot_start + record_size * 2, len(data))
        extended_data = data[slot_start:next_end]
        slot_data = data[slot_start : slot_start + record_size]

        # スロット内の全マーカー位置を検出
        search_from = 0
        while True:
            marker_pos = slot_data.find(RECORD_MARKER, search_from)
            if marker_pos < 0:
                break

            # マーカー直後の位置
            data_start = marker_pos + len(RECORD_MARKER)
            remaining = len(extended_data) - data_start

            # 最低限必要なバイト数（コード7 + カナ10 + 名前30 = 47バイト）
            if remaining < 50:
                search_from = marker_pos + 1
                continue

            # 6桁数字 + スペースのパターンをチェック
            code_bytes = extended_data[data_start : data_start + 7]
            code_str = code_bytes.decode("ascii", errors="replace").strip()

            # 顧客コード検証: 数字のみ（5〜6桁）
            if not code_str or not code_str.replace(" ", "").isdigit():
                search_from = marker_pos + 1
                continue

            code = code_str.strip()

            # 重複除外（同一コードが複数のB-Treeノードに出現する）
            if code in seen_codes:
                search_from = marker_pos + 1
                continue

            # フィールド抽出（連結データから読むことでスロット境界跨ぎに対応）
            try:
                rec = _extract_fields(extended_data, data_start, remaining)
            except Exception:
                search_from = marker_pos + 1
                continue

            if rec and rec.get("legacy_customer_code"):
                seen_codes.add(code)
                customers.append(rec)

            search_from = marker_pos + 1

    return customers


def _extract_fields(slot_data: bytes, start: int, remaining: int) -> dict[str, Any] | None:
    """マーカー直後のバイト列からフィールドを抽出。

    相対オフセット（マーカー+4 からの距離）:
      0:   得意先コード (7 bytes, ASCII)
      7:   カナコード (10 bytes, CP932半角カナ)
     17:   得意先名略称 (26 bytes, CP932)
     43:   得意先名 (40 bytes, CP932)
     83:   郵便番号 (8 bytes, ASCII)
     91:   住所上段 (40 bytes, CP932)
    131:   住所下段 (32 bytes, CP932)
    171:   電話番号 (12 bytes, ASCII)
    184:   FAX (12 bytes, ASCII)
    197:   納品書発行 (1 byte, ASCII)
    198:   担当コード (2 bytes, ASCII)
    200:   業態 (2 bytes, ASCII)
    203:   地区 (3 bytes, ASCII)
    206:   販売区分 (2 bytes, ASCII)
    209:   単価グループ (7 bytes, ASCII) ← SHTAN.MST 連携キー
    216:   消費税計算 (1 byte, binary)
    218:   消費税端数 (1 byte, binary)
    222:   締日 (1 byte, binary)
    224:   請求先コード (7 bytes, ASCII)
    231:   入金予定月 (1 byte, binary)
    233:   入金予定日 (1 byte, binary)
    235:   予定入金種 (10 bytes, ASCII)
    249:   使用単価区分 (3 bytes, ASCII)
    252:   得意先グループ1 (3 bytes, ASCII)
    255:   得意先グループ2 (2 bytes, ASCII)
    257:   日付 (8 bytes, ASCII YYYYMMDD)
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
    postal_code = decode_cp932(s(83, 8))
    address1 = decode_cp932(s(91, 40))
    address2 = decode_cp932(s(131, 32))
    phone = decode_cp932(s(171, 12))
    fax = decode_cp932(s(184, 12))

    # 名前が空なら無効レコード
    if not name and not short_name:
        return None

    # 業務フィールド
    invoice_issue = decode_cp932(s(197, 1))
    staff_code = decode_cp932(s(198, 2))
    business_type = decode_cp932(s(200, 2))
    area_code = decode_cp932(s(203, 3))
    sales_category = decode_cp932(s(206, 2))
    price_group = decode_cp932(s(209, 7))

    # バイナリフィールド
    tax_calc = s(216, 1)[0] if remaining > 216 else None
    tax_round = s(218, 1)[0] if remaining > 218 else None
    closing_day = s(222, 1)[0] if remaining > 222 else None
    billing_code = decode_cp932(s(224, 7)) if remaining > 230 else None
    payment_month = s(231, 1)[0] if remaining > 231 else None
    payment_day = s(233, 1)[0] if remaining > 233 else None
    payment_type = decode_cp932(s(235, 10)) if remaining > 244 else None
    price_type = decode_cp932(s(249, 3)) if remaining > 251 else None
    customer_group1 = decode_cp932(s(252, 3)) if remaining > 254 else None
    customer_group2 = decode_cp932(s(255, 2)) if remaining > 256 else None

    return {
        "id": str(uuid.uuid5(SAKE_UUID_NS, f"customer:{code}")),
        "legacy_customer_code": code,
        "customer_code": code,
        "name": name or short_name,
        "kana_name": kana or None,
        "short_name": short_name if short_name != name else None,
        "postal_code": postal_code or None,
        "address1": address1 or None,
        "address2": address2 or None,
        "phone": phone or None,
        "fax": fax or None,
        "staff_code": staff_code or None,
        "business_type": business_type or None,
        "delivery_area_code": area_code or None,
        "closing_day": closing_day if closing_day and closing_day < 32 else None,
        "payment_day": payment_day if payment_day and payment_day < 32 else None,
        "billing_cycle_type": payment_type or None,
        "tax_mode": str(tax_calc) if tax_calc is not None else None,
        "memo": json.dumps({
            "invoice_issue": invoice_issue,
            "sales_category": sales_category,
            "price_group": price_group,
            "price_type": price_type,
            "customer_group1": customer_group1,
            "customer_group2": customer_group2,
            "tax_round": tax_round,
            "billing_code": billing_code,
            "payment_month": payment_month,
        }, ensure_ascii=False) if price_group else None,
        "is_active": True,
        "updated_at": datetime.now(tz=UTC).isoformat(),
    }


def upsert_to_supabase(
    config: dict[str, Any],
    customers: list[dict[str, Any]],
    logger: logging.Logger,
    dry_run: bool = False,
) -> int:
    """customers テーブルへ UPSERT。"""
    if not customers:
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

    # 手動編集されたレコードをスキップ
    protected: set[str] = set()
    try:
        resp = session.get(
            f"{url}/rest/v1/customers?manual_override=eq.true&select=legacy_customer_code",
            timeout=30,
        )
        if resp.ok:
            protected = {r["legacy_customer_code"] for r in resp.json()}
            if protected:
                logger.info("Skipping %d manually edited customers", len(protected))
    except Exception:
        pass

    batch_size = 200
    total = 0
    for i in range(0, len(customers), batch_size):
        batch = [c for c in customers[i : i + batch_size] if c.get("legacy_customer_code") not in protected]
        if not batch:
            continue
        if dry_run:
            logger.info("[DRY-RUN] would upsert %d customers (sample: %s)", len(batch), batch[0]["legacy_customer_code"])
        else:
            resp = session.post(
                f"{url}/rest/v1/customers?on_conflict=legacy_customer_code",
                json=batch,
                timeout=60,
            )
            resp.raise_for_status()
        total += len(batch)
        logger.info("UPSERT customers: batch=%d total=%d", len(batch), total)

    return total


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="SHTKI.MST → customers テーブルデコーダ")
    parser.add_argument("--dry-run", action="store_true", help="Supabaseに書かず表示のみ")
    parser.add_argument("--show-sample", type=int, default=0, help="デコード結果のサンプルN件を表示")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    filepath = Path(config["z_drive_path"]) / "sh" / "mst" / "SHTKI.MST"
    logger.info("Decoding: %s", filepath)

    customers = extract_customers(filepath)
    logger.info("Decoded: %d unique customers", len(customers))

    if args.show_sample and customers:
        for c in customers[: args.show_sample]:
            logger.info(
                "  %s | %s | %s | %s | %s",
                c["legacy_customer_code"],
                c["kana_name"],
                c["name"],
                c["postal_code"],
                c["address1"],
            )

    if not customers:
        logger.warning("No customers decoded")
        return 1

    total = upsert_to_supabase(config, customers, logger, dry_run=args.dry_run)
    logger.info("Done: %d customers upserted", total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
