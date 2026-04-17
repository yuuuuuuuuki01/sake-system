from __future__ import annotations

import base64
import binascii
import struct
from pathlib import Path
from typing import Any

MAGIC_SIGNATURE_PREFIX = b"FC"
HEADER_SIZE = 0x200
FREELIST_MARKER = b"\xfe\xff\xff\xff"


def is_empty_or_freelist(raw: bytes) -> bool:
    """削除済/空/フリーリストのスロットを検出する。

    Magic ISAM では、削除レコードは byte[0] == 0x01 でマーク、
    未使用/空きスロットは全ゼロ、あるいは fe ff ff ff のフリーリスト
    ポインタで埋められている。これらを全て除外する。
    """
    if not raw:
        return True
    if raw[0] == 0x01:
        return True
    # 全ゼロ（完全に空のスロット）
    if not any(raw):
        return True
    # フリーリストマーカが支配的 (32バイトに1個以上の fe ff ff ff)
    if raw.count(FREELIST_MARKER) > max(len(raw) // 32, 1):
        return True
    # 非ゼロバイトが極少 = 実質空
    nonzero_ratio = sum(1 for b in raw if b != 0) / len(raw)
    if nonzero_ratio < 0.05:
        return True
    return False


def _decode_cp932(value: bytes) -> str:
    return value.rstrip(b"\x00 ").decode("cp932", errors="ignore").strip()


def _decode_int_le(value: bytes) -> int:
    return int.from_bytes(value, byteorder="little", signed=False)


def _decode_bcd(value: bytes) -> int:
    digits: list[str] = []
    for byte in value:
        digits.append(str((byte >> 4) & 0x0F))
        digits.append(str(byte & 0x0F))
    return int("".join(digits).lstrip("0") or "0")


# =============================================================================
# KNOWN_LAYOUTS: 主要ファイルのフィールドレイアウト定義
# 注意: オフセット/長さはMagic/eDeveloperの慣習（得意先コード10桁、商品コード16桁等）
#       に基づく推定。実データで検証後、必要に応じて修正してください。
# =============================================================================
KNOWN_LAYOUTS: dict[str, list[dict[str, Any]]] = {
    # ---- 販売管理 (SK) ----
    "SKDEN.DAT": [
        {"name": "document_no", "offset": 1, "length": 12, "type": "str"},
        {"name": "sales_date", "offset": 13, "length": 8, "type": "str"},
        {"name": "document_date", "offset": 21, "length": 8, "type": "str"},
        {"name": "customer_code", "offset": 29, "length": 10, "type": "str"},
        {"name": "staff_code", "offset": 39, "length": 6, "type": "str"},
        {"name": "delivery_area_code", "offset": 45, "length": 4, "type": "str"},
        {"name": "subtotal_amount", "offset": 49, "length": 8, "type": "int"},
        {"name": "tax_amount", "offset": 57, "length": 8, "type": "int"},
        {"name": "total_amount", "offset": 65, "length": 8, "type": "int"},
        {"name": "remarks", "offset": 73, "length": 40, "type": "str"},
    ],
    "SKHSK.DAT": [
        {"name": "customer_code", "offset": 1, "length": 10, "type": "str"},
        {"name": "closing_date", "offset": 11, "length": 8, "type": "str"},
        {"name": "billed_amount", "offset": 19, "length": 8, "type": "int"},
        {"name": "paid_amount", "offset": 27, "length": 8, "type": "int"},
        {"name": "balance_amount", "offset": 35, "length": 8, "type": "int"},
        {"name": "last_payment_date", "offset": 43, "length": 8, "type": "str"},
    ],
    "SKKAI.DAT": [
        {"name": "customer_code", "offset": 1, "length": 10, "type": "str"},
        {"name": "payment_date", "offset": 11, "length": 8, "type": "str"},
        {"name": "amount", "offset": 19, "length": 8, "type": "int"},
        {"name": "method_code", "offset": 27, "length": 4, "type": "str"},
        {"name": "bank_name", "offset": 31, "length": 20, "type": "str"},
        {"name": "remarks", "offset": 51, "length": 40, "type": "str"},
    ],
    "SK2MM.MST": [
        {"name": "customer_code", "offset": 1, "length": 10, "type": "str"},
        {"name": "customer_name", "offset": 11, "length": 40, "type": "str"},
        {"name": "kana_name", "offset": 51, "length": 40, "type": "str"},
        {"name": "short_name", "offset": 91, "length": 20, "type": "str"},
        {"name": "phone", "offset": 111, "length": 16, "type": "str"},
        {"name": "fax", "offset": 127, "length": 16, "type": "str"},
        {"name": "postal_code", "offset": 143, "length": 8, "type": "str"},
        {"name": "address1", "offset": 151, "length": 40, "type": "str"},
        {"name": "address2", "offset": 191, "length": 40, "type": "str"},
        {"name": "closing_day", "offset": 231, "length": 2, "type": "int"},
        {"name": "payment_day", "offset": 233, "length": 2, "type": "int"},
        {"name": "credit_limit", "offset": 235, "length": 8, "type": "int"},
        {"name": "staff_code", "offset": 243, "length": 6, "type": "str"},
    ],
    "SKSYO.MST": [
        {"name": "product_code", "offset": 1, "length": 16, "type": "str"},
        {"name": "product_name", "offset": 17, "length": 40, "type": "str"},
        {"name": "kana_name", "offset": 57, "length": 40, "type": "str"},
        {"name": "short_name", "offset": 97, "length": 20, "type": "str"},
        {"name": "jan_code", "offset": 117, "length": 16, "type": "str"},
        {"name": "category_code", "offset": 133, "length": 4, "type": "str"},
        {"name": "volume_ml", "offset": 137, "length": 4, "type": "int"},
        {"name": "list_price", "offset": 141, "length": 8, "type": "int"},
        {"name": "default_sale_price", "offset": 149, "length": 8, "type": "int"},
        {"name": "default_cost_price", "offset": 157, "length": 8, "type": "int"},
    ],
    "SKALC.MST": [
        {"name": "code", "offset": 1, "length": 4, "type": "str"},
        {"name": "name", "offset": 5, "length": 30, "type": "str"},
        {"name": "min_degree_x10", "offset": 35, "length": 2, "type": "int"},  # ×10で格納
        {"name": "max_degree_x10", "offset": 37, "length": 2, "type": "int"},
        {"name": "tax_rate_per_liter", "offset": 39, "length": 8, "type": "int"},
    ],

    # ---- 出荷管理 (SH) ----
    "SHDEN.DAT": [
        {"name": "document_no", "offset": 1, "length": 12, "type": "str"},
        {"name": "shipment_date", "offset": 13, "length": 8, "type": "str"},
        {"name": "delivery_date", "offset": 21, "length": 8, "type": "str"},
        {"name": "customer_code", "offset": 29, "length": 10, "type": "str"},
        {"name": "total_amount", "offset": 39, "length": 8, "type": "int"},
        {"name": "shipping_method_code", "offset": 47, "length": 4, "type": "str"},
        {"name": "tracking_no", "offset": 51, "length": 20, "type": "str"},
    ],
    "SHSYO.MST": [
        {"name": "product_code", "offset": 1, "length": 16, "type": "str"},
        {"name": "product_name", "offset": 17, "length": 40, "type": "str"},
        {"name": "jan_code", "offset": 57, "length": 16, "type": "str"},
        {"name": "tax_category_code", "offset": 73, "length": 4, "type": "str"},
    ],

    # ---- 蔵内管理 (K5) ----
    "K52MM.MST": [
        # 得意先マスタ(蔵内用コピー)
        {"name": "customer_code", "offset": 1, "length": 10, "type": "str"},
        {"name": "customer_name", "offset": 11, "length": 40, "type": "str"},
        {"name": "kana_name", "offset": 51, "length": 40, "type": "str"},
    ],
    "K5SYO.MST": [
        {"name": "product_code", "offset": 1, "length": 16, "type": "str"},
        {"name": "product_name", "offset": 17, "length": 40, "type": "str"},
        {"name": "rice_type", "offset": 57, "length": 20, "type": "str"},
        {"name": "polish_rate_x10", "offset": 77, "length": 2, "type": "int"},
        {"name": "volume_ml", "offset": 79, "length": 4, "type": "int"},
    ],
    "K5HSK.DAT": [
        {"name": "customer_code", "offset": 1, "length": 10, "type": "str"},
        {"name": "closing_date", "offset": 11, "length": 8, "type": "str"},
        {"name": "billed_amount", "offset": 19, "length": 8, "type": "int"},
        {"name": "balance_amount", "offset": 27, "length": 8, "type": "int"},
    ],
    "K5ALC.MST": [
        {"name": "code", "offset": 1, "length": 4, "type": "str"},
        {"name": "name", "offset": 5, "length": 30, "type": "str"},
        {"name": "tax_rate_per_liter", "offset": 35, "length": 8, "type": "int"},
    ],
    "K5TOR.DAT": [
        # 仕込取引記録
        {"name": "batch_no", "offset": 1, "length": 10, "type": "str"},
        {"name": "operation_date", "offset": 11, "length": 8, "type": "str"},
        {"name": "operation_type_code", "offset": 19, "length": 2, "type": "int"},
        {"name": "tank_no", "offset": 21, "length": 6, "type": "str"},
        {"name": "rice_kg_x100", "offset": 27, "length": 6, "type": "int"},
        {"name": "volume_l_x10", "offset": 33, "length": 6, "type": "int"},
    ],
    "K5HATOR.DAT": [
        {"name": "batch_no", "offset": 1, "length": 10, "type": "str"},
        {"name": "operation_date", "offset": 11, "length": 8, "type": "str"},
        {"name": "tank_no", "offset": 19, "length": 6, "type": "str"},
        {"name": "alcohol_degree_x10", "offset": 25, "length": 2, "type": "int"},
        {"name": "volume_l_x10", "offset": 27, "length": 6, "type": "int"},
    ],

    # ---- 原料・仕入 (H5) ----
    "H5SIR.MST": [
        {"name": "supplier_code", "offset": 1, "length": 8, "type": "str"},
        {"name": "supplier_name", "offset": 9, "length": 40, "type": "str"},
        {"name": "kana_name", "offset": 49, "length": 40, "type": "str"},
        {"name": "phone", "offset": 89, "length": 16, "type": "str"},
        {"name": "closing_day", "offset": 105, "length": 2, "type": "int"},
        {"name": "payment_day", "offset": 107, "length": 2, "type": "int"},
    ],
    "H5SYO.MST": [
        {"name": "product_code", "offset": 1, "length": 16, "type": "str"},
        {"name": "product_name", "offset": 17, "length": 40, "type": "str"},
        {"name": "kana_name", "offset": 57, "length": 40, "type": "str"},
        {"name": "jan_code", "offset": 97, "length": 16, "type": "str"},
        {"name": "unit", "offset": 113, "length": 8, "type": "str"},
        {"name": "unit_price", "offset": 121, "length": 8, "type": "int"},
    ],
    "H5TOR.DAT": [
        # 仕入伝票ヘッダ
        {"name": "document_no", "offset": 1, "length": 12, "type": "str"},
        {"name": "purchase_date", "offset": 13, "length": 8, "type": "str"},
        {"name": "supplier_code", "offset": 21, "length": 8, "type": "str"},
        {"name": "total_amount", "offset": 29, "length": 8, "type": "int"},
        {"name": "tax_amount", "offset": 37, "length": 8, "type": "int"},
    ],
    "H5NYU.DAT": [
        # 原料受入
        {"name": "material_code", "offset": 1, "length": 12, "type": "str"},
        {"name": "receive_date", "offset": 13, "length": 8, "type": "str"},
        {"name": "supplier_code", "offset": 21, "length": 8, "type": "str"},
        {"name": "quantity_x100", "offset": 29, "length": 6, "type": "int"},
        {"name": "unit_cost", "offset": 35, "length": 8, "type": "int"},
        {"name": "lot_no", "offset": 43, "length": 12, "type": "str"},
    ],
    "H5IST.DAT": [
        # 資材移動
        {"name": "material_code", "offset": 1, "length": 12, "type": "str"},
        {"name": "transaction_date", "offset": 13, "length": 8, "type": "str"},
        {"name": "transaction_type_code", "offset": 21, "length": 2, "type": "int"},
        {"name": "quantity_x100", "offset": 23, "length": 6, "type": "int"},
    ],
    "H5KAI.DAT": [
        {"name": "supplier_code", "offset": 1, "length": 8, "type": "str"},
        {"name": "payment_date", "offset": 9, "length": 8, "type": "str"},
        {"name": "amount", "offset": 17, "length": 8, "type": "int"},
        {"name": "method_code", "offset": 25, "length": 4, "type": "str"},
    ],
    "H5ZEI.MST": [
        # 税区分マスタ
        {"name": "code", "offset": 1, "length": 4, "type": "str"},
        {"name": "name", "offset": 5, "length": 30, "type": "str"},
        {"name": "tax_rate_per_liter", "offset": 35, "length": 8, "type": "int"},
        {"name": "effective_from", "offset": 43, "length": 8, "type": "str"},
    ],
}

# ファイル名 → Supabaseテーブル名のマッピング
FILE_TABLE_MAP: dict[str, str] = {
    # 販売
    "SKDEN.DAT": "sales_document_headers",
    "SKHSK.DAT": "customer_payment_status",
    "SKKAI.DAT": "customer_payments",
    "SK2MM.MST": "customers",
    "SKSYO.MST": "products",
    "SKALC.MST": "alcohol_categories",
    # 出荷
    "SHDEN.DAT": "shipment_documents",
    "SHSYO.MST": "products",
    # 蔵内
    "K52MM.MST": "customers",
    "K5SYO.MST": "products",
    "K5HSK.DAT": "customer_payment_status",
    "K5ALC.MST": "alcohol_categories",
    "K5TOR.DAT": "brewing_operations",
    "K5HATOR.DAT": "brewing_operations",
    # 原料・仕入
    "H5SIR.MST": "suppliers",
    "H5SYO.MST": "products",
    "H5TOR.DAT": "purchase_document_headers",
    "H5NYU.DAT": "raw_materials",
    "H5IST.DAT": "material_transactions",
    "H5KAI.DAT": "supplier_payments",
    "H5ZEI.MST": "tax_categories",
}


class MagicISAMReader:
    """Read records from a Magic/eDeveloper ISAM file.

    デフォルトは raw-preserve モード: 各レコードの生バイト列を
    そのまま base64 として保持する。既存の KNOWN_LAYOUTS 解釈は
    オフセット不正であることが確認されているため使用しない。
    正しいレイアウトが確定したファイルについてのみ、
    use_layout=True で個別適用する。
    """

    def __init__(
        self,
        filepath: str | Path,
        use_layout: bool = False,
    ) -> None:
        self.filepath = Path(filepath)
        self.use_layout = use_layout
        self.file = self.filepath.open("rb")
        self.header = self.file.read(HEADER_SIZE)
        if len(self.header) < HEADER_SIZE:
            raise ValueError(f"Incomplete Magic header: {self.filepath}")
        if self.header[:2] != MAGIC_SIGNATURE_PREFIX:
            raise ValueError(f"Unexpected Magic signature: {self.filepath}")

        self.record_count = struct.unpack_from("<I", self.header, 0x04)[0]
        self.field_count = struct.unpack_from("<H", self.header, 0x14)[0]
        self.data_area_size = struct.unpack_from("<H", self.header, 0x16)[0]
        self.record_size = struct.unpack_from("<H", self.header, 0x18)[0]
        # レイアウト適用は明示指定時のみ
        self.layout = (
            KNOWN_LAYOUTS.get(self.filepath.name.upper())
            if use_layout
            else None
        )

    def close(self) -> None:
        self.file.close()

    def __enter__(self) -> "MagicISAMReader":
        return self

    def __exit__(self, exc_type: Any, exc: Any, tb: Any) -> None:
        self.close()

    def guess_fields(self, record_size: int) -> list[dict[str, Any]]:
        usable_size = max(record_size - 1, 0)
        fields: list[dict[str, Any]] = []
        offset = 1
        index = 1
        while usable_size > 0:
            chunk = min(32, usable_size)
            field_type = "str" if chunk >= 8 else "bytes"
            fields.append(
                {
                    "name": f"field_{index:02d}",
                    "offset": offset,
                    "length": chunk,
                    "type": field_type,
                }
            )
            offset += chunk
            usable_size -= chunk
            index += 1
        return fields

    def _decode_field(self, chunk: bytes, field_type: str) -> Any:
        if field_type == "str":
            return _decode_cp932(chunk)
        if field_type == "int":
            return _decode_int_le(chunk)
        if field_type == "bcd":
            return _decode_bcd(chunk)
        return binascii.hexlify(chunk).decode("ascii")

    def read_records(self) -> Any:
        """有効レコードだけを順次 yield する。

        raw-preserve モード時はレイアウト解釈を行わず、
        生バイトを base64 として持たせる（Supabase側で後日デコード可能）。
        """
        self.file.seek(HEADER_SIZE)
        index = 0
        while True:
            raw_record = self.file.read(self.record_size)
            if not raw_record or len(raw_record) < self.record_size:
                break
            index += 1

            # 削除/空/フリーリストを除外
            if is_empty_or_freelist(raw_record):
                continue

            record: dict[str, Any] = {
                "_record_index": index,
                "_source_file": self.filepath.name,
                "_record_size": self.record_size,
                "_raw_b64": base64.b64encode(raw_record).decode("ascii"),
            }

            # レイアウト指定がある場合のみフィールド展開
            if self.layout:
                for field in self.layout:
                    start = field["offset"]
                    end = start + field["length"]
                    if end > len(raw_record):
                        continue
                    chunk = raw_record[start:end]
                    record[field["name"]] = self._decode_field(chunk, field["type"])

            yield record
