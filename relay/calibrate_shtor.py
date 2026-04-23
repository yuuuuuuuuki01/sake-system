"""SHTOR.DAT キャリブレーション — CSV正解データとバイナリを照合して金額オフセットを特定する。

手順:
1. CSV正解データ（ユニークな金額を持つ取引）をリストアップ
2. SHTOR.DATの全スロットから、対応する得意先+商品コードのパターンを検出
3. パターン位置の周辺バイトを走査し、正解の金額・数量がどのオフセットにあるか探す
"""
from __future__ import annotations

import json
import struct
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"

HEADER_SIZE = 0x200
ENTRY_PATTERN = re.compile(rb"(\s?\d{5,6})\x20.{0,10}(500|600|700)(\d{5})")


def load_config():
    path = LOCAL_CONFIG_PATH if LOCAL_CONFIG_PATH.exists() else CONFIG_PATH
    with path.open("r", encoding="utf-8") as fp:
        return json.load(fp)


# CSV正解データ: (customer_code, product_code, amount, quantity, unit_price)
CALIBRATION_TARGETS = [
    ("140820", "129701", 153400, 295, 520),    # 鶴岡八幡宮180ml
    ("110274", "10062",  65224,  1,   65224),   # 大磯 四斗化粧樽
    ("120465", "10320",  46800,  90,  520),     # 鵠沼伏見稲荷神社
    ("31165",  "50561",  36000,  24,  1500),    # 春笹うすにごり
    ("210012", "975",    38256,  12,  3188),    # 白笹鼓 大吟醸
    ("61410",  "810",    37500,  100, 375),     # 冷や酒 300ml
    ("130582", "191",    32130,  18,  1785),    # 純米酒 1800ml
    ("130650", "13280",  65040,  60,  1084),    # 純米酒 三浦
    ("171120", "11048",  38300,  100, 383),     # 湯けむり
    ("120400", "10195",  51300,  36,  1425),    # 葉山 田遊び
]


def search_value_in_record(rec: bytes, match_start: int, value: int, label: str):
    """レコード内で value を int16/int32/double/float として探す。"""
    findings = []

    # int32 (little-endian)
    for off in range(len(rec) - 4):
        v = struct.unpack_from("<i", rec, off)[0]
        if v == value:
            rel = off - match_start
            findings.append(f"  {label}={value} found as int32 @ absolute={off}, relative_to_pattern={rel:+d}")

    # int16 (小さい値のみ)
    if 0 < value < 32768:
        for off in range(len(rec) - 2):
            v = struct.unpack_from("<h", rec, off)[0]
            if v == value:
                rel = off - match_start
                findings.append(f"  {label}={value} found as int16 @ absolute={off}, relative_to_pattern={rel:+d}")

    # double (little-endian)
    fval = float(value)
    for off in range(len(rec) - 8):
        v = struct.unpack_from("<d", rec, off)[0]
        if abs(v - fval) < 0.01 and v != 0.0:
            rel = off - match_start
            findings.append(f"  {label}={value} found as double @ absolute={off}, relative_to_pattern={rel:+d}")

    return findings


def main():
    config = load_config()
    filepath = Path(config["z_drive_path"]) / "sh" / "dat" / "SHTOR.DAT"
    data = filepath.read_bytes()

    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size
    print(f"SHTOR.DAT: record_size={record_size}, total_slots={total_slots}")
    print()

    for cust, prod, amount, qty, uprice in CALIBRATION_TARGETS:
        # 得意先コードを6桁ゼロ埋め、商品コードを5桁ゼロ埋め
        cust_padded = cust.zfill(6)
        prod_padded = prod.zfill(5)

        print(f"=== Target: cust={cust} prod={prod} amt={amount} qty={qty} uprice={uprice} ===")

        found_count = 0
        for i in range(total_slots):
            offset = HEADER_SIZE + i * record_size
            rec = data[offset: offset + record_size]
            if rec[0] == 0x01:
                continue

            for m in ENTRY_PATTERN.finditer(rec):
                mc = m.group(1).decode("ascii").strip()
                mp = m.group(3).decode("ascii").strip()

                # 得意先+商品のマッチ（ゼロ埋めあり/なし両方）
                cust_match = mc == cust_padded or mc == cust or mc.lstrip("0") == cust.lstrip("0")
                prod_match = mp == prod_padded or mp == prod or mp.lstrip("0") == prod.lstrip("0")

                if cust_match and prod_match:
                    trade = m.group(2).decode("ascii")
                    print(f"  MATCH slot={i} trade={trade} pattern_start={m.start()} pattern_end={m.end()}")

                    # 商品名確認
                    name_start = m.end() + 2
                    if name_start + 36 <= len(rec):
                        pname = rec[name_start:name_start + 36].decode("cp932", errors="replace")
                        pname = "".join(c for c in pname if c.isprintable()).strip()
                        print(f"  product_name: {pname}")

                    # 金額・数量・単価をレコード内で探す
                    findings = []
                    findings += search_value_in_record(rec, m.start(3), amount, "amount")
                    findings += search_value_in_record(rec, m.start(3), qty, "qty")
                    findings += search_value_in_record(rec, m.start(3), uprice, "uprice")

                    if findings:
                        for f in findings:
                            print(f)
                    else:
                        print("  *** NO amount/qty/uprice found in this record ***")

                    found_count += 1
                    if found_count >= 3:
                        break
            if found_count >= 3:
                break

        if found_count == 0:
            print("  NO MATCH found in SHTOR.DAT")
        print()


if __name__ == "__main__":
    main()
