"""
Btrieve ファイルヘッダからキー定義を読む
キー定義 = フィールドのバイトオフセット・型・長さ
"""
import struct
from pathlib import Path

# Btrieve データ型コード (Pervasive PSQL)
DATA_TYPES = {
    0: "String", 1: "Integer", 2: "Float", 3: "Date", 4: "Time",
    5: "Decimal", 6: "Money", 7: "Logical", 8: "Numeric", 9: "Bfloat",
    10: "Lstring", 11: "Zstring", 12: "Note", 13: "Lvar", 14: "Unsigned Binary",
    15: "Autoincrement", 18: "Currency", 19: "Timestamp", 20: "DoubleInt",
}

def parse_header(data):
    sig = data[0:2]
    rec_size = struct.unpack_from("<H", data, 0x18)[0]
    num_keys = struct.unpack_from("<H", data, 0x14)[0]
    page_size_code = struct.unpack_from("<H", data, 0x0C)[0]
    
    print(f"  Signature: {sig.hex()} ({'FC' if sig == b'FC' else '?'})")
    print(f"  Record size: {rec_size}")
    print(f"  Num keys: {num_keys}")
    print(f"  Page size code: 0x{page_size_code:04x}")
    
    # キー定義はヘッダ内の固定位置にある
    # Btrieve 6.x: 各キー仕様は16バイト、ヘッダの0x110から開始
    # Btrieve pre-6: 各キー仕様は8バイト
    
    print(f"\n  === Key Definitions (16-byte format from 0x110) ===")
    for k in range(min(num_keys, 20)):
        off = 0x110 + k * 16
        if off + 16 > 0x200:
            break
        pos = struct.unpack_from("<H", data, off)[0]
        length = struct.unpack_from("<H", data, off+2)[0]
        flags = struct.unpack_from("<H", data, off+4)[0]
        dtype = struct.unpack_from("<H", data, off+14)[0]
        dtype_name = DATA_TYPES.get(dtype, f"type_{dtype}")
        dup = "dup" if flags & 0x0001 else ""
        mod = "mod" if flags & 0x0002 else ""
        null = "null" if flags & 0x0004 else ""
        print(f"  Key{k}: pos={pos:4d}, len={length:3d}, type={dtype_name:15s} flags=0x{flags:04x} {dup} {mod} {null}")
    
    print(f"\n  === Key Definitions (8-byte format from 0x110) ===")
    for k in range(min(num_keys*2, 30)):
        off = 0x110 + k * 8
        if off + 8 > 0x200:
            break
        pos = struct.unpack_from("<H", data, off)[0]
        length = struct.unpack_from("<H", data, off+2)[0]
        flags = struct.unpack_from("<H", data, off+4)[0]
        num_count = struct.unpack_from("<H", data, off+6)[0]
        if pos < 1000 and length < 200 and length > 0:
            print(f"  Key{k}: pos={pos:4d}, len={length:3d}, flags=0x{flags:04x}")


files = [
    ("SHTOR.DAT", "Z:/sh/dat/SHTOR.DAT"),
    ("SKIDO.DAT", "Z:/sk/dat/SKIDO.DAT"),
    ("SKIDD.DAT", "Z:/sk/dat/SKIDD.DAT"),
    ("SKJGS.DAT", "Z:/sk/dat/SKJGS.DAT"),
]

for name, path in files:
    print(f"\n{'='*50}")
    print(f"=== {name} ===")
    data = Path(path).read_bytes()
    # ヘッダ (最初の0x200バイト)
    header = data[:0x200]
    parse_header(header)
