"""
SKIDD.DAT フィールドマップ解析スクリプト。

既知の商品コード (SHSYO.MST から抽出) を SKIDD.DAT レコード内で検索し、
各フィールドのオフセットを確定する。

手順:
1. SHSYO.MST から商品コード一覧を抽出
2. SKIDD.DAT の各スロット内で商品コードを検索
3. ヒットした位置 + 周辺バイトを表示してフィールドマップを推定
"""
from __future__ import annotations

import struct
import os
import re
from pathlib import Path

Z_DRIVE = "Z:"
SHSYO_PATH  = f"{Z_DRIVE}/sh/mst/SHSYO.MST"
SKIDD_PATH  = f"{Z_DRIVE}/sk/dat/SKIDD.DAT"
HEADER_SIZE = 0x200

# SHSYO.MST のマーカー (decoder_products.py から)
RECORD_MARKER = b"\x09\x2e\x38\x09"


def load_shsyo_products(path: str) -> dict[str, str]:
    """SHSYO.MST から {商品コード: 商品名} を抽出。"""
    with open(path, 'rb') as f:
        data = f.read()

    if data[:2] != b'FC':
        raise ValueError("Not Magic ISAM header")

    rec_size = struct.unpack_from('<H', data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // rec_size

    products: dict[str, str] = {}

    for slot_idx in range(total_slots):
        slot_start = HEADER_SIZE + slot_idx * rec_size
        # 次スロットも連結してスロット境界跨ぎ対応
        next_end = min(slot_start + rec_size * 2, len(data))
        extended = data[slot_start:next_end]

        pos = 0
        while True:
            marker_pos = extended.find(RECORD_MARKER, pos)
            if marker_pos < 0:
                break

            data_start = marker_pos + len(RECORD_MARKER)
            remaining = len(extended) - data_start

            if remaining < 7:
                pos = marker_pos + 1
                continue

            code_raw = extended[data_start:data_start + 7]
            code_str = code_raw.decode('ascii', errors='replace').strip()

            if code_str and re.fullmatch(r'\d{1,7}', code_str):
                # 商品名は offset 7+10+26=43 から 32 bytes
                name_raw = extended[data_start + 7:data_start + 75]
                name = name_raw.decode('cp932', errors='replace').replace('\x00', '').strip()
                name = re.sub(r'[\ufffd\x01-\x08]', '', name).strip()
                if name:
                    products[code_str] = name

            pos = marker_pos + 1

    return products


def read_skidd_record(data: bytes, slot_idx: int, rec_size: int) -> bytes:
    slot_start = HEADER_SIZE + slot_idx * rec_size
    return data[slot_start:slot_start + rec_size]


def decode_potential_date(b: bytes, offset: int) -> str:
    """オフセット位置から日付候補を読む (BCD Reiwa/Heisei, little-endian int32)."""
    results = []

    if offset + 3 <= len(b):
        y = b[offset]
        m = b[offset + 1]
        d = b[offset + 2]
        # Reiwa: year 1-10, month 1-12, day 1-31
        if 1 <= y <= 10 and 1 <= m <= 12 and 1 <= d <= 31:
            results.append(f"Reiwa{y+2018}/{m:02d}/{d:02d}")
        # Heisei: year 1-32 → 1989-2019
        if 1 <= y <= 32 and 1 <= m <= 12 and 1 <= d <= 31:
            results.append(f"Heisei{y+1988}/{m:02d}/{d:02d}")

    if offset + 4 <= len(b):
        val = struct.unpack_from('<i', b, offset)[0]
        # Magic internal date format: days since some epoch
        # Try 1900-01-01 epoch (Magic default)
        if 45000 <= val <= 50000:
            # Around 2023-2037 in Excel serial (days since 1899-12-30)
            import datetime
            try:
                d = datetime.date(1899, 12, 30) + datetime.timedelta(days=val)
                results.append(f"Excel:{d}")
            except:
                pass
        # Try 0 = 1988-01-01 (Heisei start)
        if 10000 <= val <= 20000:
            import datetime
            try:
                d = datetime.date(1988, 1, 1) + datetime.timedelta(days=val)
                results.append(f"Heisei_epoch:{d}")
            except:
                pass

    return ', '.join(results) if results else ''


def decode_potential_amount(b: bytes, offset: int) -> str:
    """金額候補を読む (double, int32, int16)."""
    results = []

    if offset + 8 <= len(b):
        try:
            d = struct.unpack_from('<d', b, offset)[0]
            if 100 <= d <= 9_999_999:
                results.append(f"double={d:.0f}円")
        except:
            pass

    if offset + 4 <= len(b):
        v = struct.unpack_from('<i', b, offset)[0]
        if 100 <= v <= 9_999_999:
            results.append(f"int32={v}円")

    if offset + 2 <= len(b):
        v = struct.unpack_from('<H', b, offset)[0]
        if 1 <= v <= 9999:
            results.append(f"uint16={v}")

    return ', '.join(results) if results else ''


def analyze_slot_with_product(slot: bytes, code: str, hit_offset: int, rec_size: int) -> None:
    """商品コードのヒット位置 + 前後のバイト解析を表示。"""
    print(f"  code='{code}' @ offset {hit_offset:3d}/{rec_size}")
    print(f"  hex: ...{slot[max(0,hit_offset-8):hit_offset].hex()} [{slot[hit_offset:hit_offset+len(code)+1].hex()}] {slot[hit_offset+len(code)+1:hit_offset+len(code)+25].hex()}")

    # 前後64バイトをまとめて hex+CP932 表示
    start = max(0, hit_offset - 16)
    end = min(len(slot), hit_offset + 80)
    chunk = slot[start:end]
    readable = ''.join(chr(b) if 0x20 <= b <= 0x7e else '.' for b in chunk)
    cp932 = chunk.decode('cp932', errors='replace').replace('\x00', '.')
    print(f"  ASCII ({start}-{end}): {readable}")
    print(f"  CP932 ({start}-{end}): {cp932}")

    # 前後の各オフセットを解析
    print("  --- 周辺フィールド候補 ---")
    for off in range(max(0, hit_offset - 32), min(len(slot), hit_offset + 60), 2):
        date_str = decode_potential_date(slot, off)
        amt_str = decode_potential_amount(slot, off)
        if date_str or amt_str:
            print(f"    offset {off:3d}: {date_str} {amt_str}")


def main():
    print("=== SKIDD.DAT フィールドマップ解析 ===")
    print()

    # 1. 商品マスタ読み込み
    print(f"商品マスタ読み込み: {SHSYO_PATH}")
    products = load_shsyo_products(SHSYO_PATH)
    print(f"  {len(products)} 商品コードを取得")
    # サンプル表示
    sample = list(products.items())[:10]
    for code, name in sample:
        print(f"  {code}: {name}")
    print()

    # 2. SKIDD.DAT 読み込み
    print(f"SKIDD.DAT 読み込み中...")
    skidd_size = os.path.getsize(SKIDD_PATH)
    with open(SKIDD_PATH, 'rb') as f:
        skidd_data = f.read()

    if skidd_data[:2] != b'FC':
        raise ValueError("SKIDD.DAT: Not Magic ISAM header")

    rec_size = struct.unpack_from('<H', skidd_data, 0x18)[0]
    total_slots = (skidd_size - HEADER_SIZE) // rec_size
    print(f"  rec_size={rec_size}, total_slots={total_slots}")
    print()

    # 3. 商品コードパターン検索
    # スロット 30500-30600 に集中（SKIDO B-tree で May 2026 を参照している範囲）
    SEARCH_START = 30400
    SEARCH_END   = min(total_slots, 30700)

    # 商品コードを bytes に変換 (ASCII, 3-7桁)
    # 短いコード (1-2桁) は誤検出が多いのでスキップ
    code_patterns: list[tuple[bytes, str, str]] = []
    for code, name in products.items():
        if len(code) >= 3:
            code_patterns.append((code.encode('ascii'), code, name))

    print(f"検索範囲: slot {SEARCH_START}-{SEARCH_END} (対象商品コード {len(code_patterns)}種)")
    print()

    hits: dict[int, list[tuple[int, str, str]]] = {}  # slot_idx → [(offset, code, name)]

    for slot_idx in range(SEARCH_START, SEARCH_END):
        slot = read_skidd_record(skidd_data, slot_idx, rec_size)

        if not any(b != 0 for b in slot):
            continue

        for code_bytes, code, name in code_patterns:
            pos = 0
            while True:
                found = slot.find(code_bytes, pos)
                if found < 0:
                    break
                # NULL前後チェック: 商品コードはNULLか空白で区切られているはず
                before_ok = found == 0 or slot[found - 1] in (0x00, 0x20)
                after_byte = slot[found + len(code_bytes)] if found + len(code_bytes) < len(slot) else 0x00
                after_ok = after_byte in (0x00, 0x20) or not (0x30 <= after_byte <= 0x39)

                if before_ok and after_ok:
                    if slot_idx not in hits:
                        hits[slot_idx] = []
                    hits[slot_idx].append((found, code, name))

                pos = found + 1

    print(f"ヒットしたスロット数: {len(hits)}")
    print()

    # 4. 各ヒットスロットを詳細表示
    for slot_idx in sorted(hits.keys()):
        slot = read_skidd_record(skidd_data, slot_idx, rec_size)
        slot_hits = hits[slot_idx]

        # 先頭8バイト表示 (フラグ/状態)
        print(f"=== SKIDD slot {slot_idx} ===")
        print(f"  先頭16B: {slot[:16].hex()}")
        print(f"  商品コードヒット: {[(off, code) for off, code, _ in slot_hits]}")

        # 最初のヒットだけ詳細解析
        if slot_hits:
            off, code, name = slot_hits[0]
            analyze_slot_with_product(slot, code, off, rec_size)

        print()


if __name__ == "__main__":
    main()
