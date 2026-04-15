from __future__ import annotations

import binascii
import struct
from pathlib import Path
from typing import Any

MAGIC_SIGNATURE_PREFIX = b"FC"
HEADER_SIZE = 0x200


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


KNOWN_LAYOUTS: dict[str, list[dict[str, Any]]] = {
    "SKDEN.DAT": [
        {"name": "document_no", "offset": 1, "length": 12, "type": "str"},
        {"name": "document_date", "offset": 13, "length": 8, "type": "str"},
        {"name": "customer_code", "offset": 21, "length": 10, "type": "str"},
        {"name": "staff_code", "offset": 31, "length": 6, "type": "str"},
        {"name": "gross_amount", "offset": 37, "length": 8, "type": "int"},
        {"name": "net_amount", "offset": 45, "length": 8, "type": "int"},
    ],
    "SKHSK.DAT": [
        {"name": "customer_code", "offset": 1, "length": 10, "type": "str"},
        {"name": "closing_date", "offset": 11, "length": 8, "type": "str"},
        {"name": "balance_amount", "offset": 19, "length": 8, "type": "int"},
        {"name": "payment_amount", "offset": 27, "length": 8, "type": "int"},
    ],
    "SK2MM.MST": [
        {"name": "customer_code", "offset": 1, "length": 10, "type": "str"},
        {"name": "customer_name", "offset": 11, "length": 40, "type": "str"},
        {"name": "kana_name", "offset": 51, "length": 40, "type": "str"},
        {"name": "phone", "offset": 91, "length": 16, "type": "str"},
        {"name": "postal_code", "offset": 107, "length": 8, "type": "str"},
    ],
    "H5SYO.MST": [
        {"name": "product_code", "offset": 1, "length": 16, "type": "str"},
        {"name": "product_name", "offset": 17, "length": 40, "type": "str"},
        {"name": "specification", "offset": 57, "length": 20, "type": "str"},
        {"name": "unit_price", "offset": 77, "length": 8, "type": "int"},
        {"name": "jan_code", "offset": 85, "length": 16, "type": "str"},
    ],
}


class MagicISAMReader:
    """Read records from a Magic/eDeveloper ISAM file."""

    def __init__(self, filepath: str | Path) -> None:
        self.filepath = Path(filepath)
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
        self.layout = KNOWN_LAYOUTS.get(self.filepath.name.upper()) or self.guess_fields(self.record_size)

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
        self.file.seek(HEADER_SIZE)
        index = 0
        while True:
            raw_record = self.file.read(self.record_size)
            if not raw_record or len(raw_record) < self.record_size:
                break
            index += 1
            deleted_flag = raw_record[0]
            if deleted_flag == 0x01:
                continue

            record: dict[str, Any] = {
                "_record_index": index,
                "_source_file": self.filepath.name,
            }
            for field in self.layout:
                start = field["offset"]
                end = start + field["length"]
                if end > len(raw_record):
                    continue
                chunk = raw_record[start:end]
                record[field["name"]] = self._decode_field(chunk, field["type"])

            record["_raw_hex"] = binascii.hexlify(raw_record[1:]).decode("ascii")
            yield record
