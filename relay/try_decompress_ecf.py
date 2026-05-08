import zlib, lzma, bz2, struct
from pathlib import Path

ecf = Path("Z:/販売管理.ecf").read_bytes()
print(f"ECF size: {len(ecf):,}")
print(f"Header: {ecf[:32].hex()}")
print(f"Header text: {ecf[:32]}")
print()

# ヘッダ長を特定してから様々なオフセットで圧縮解凍を試す
offsets = [0x16, 0x20, 0x28, 0x40, 0x50, 0x100, 0x200]

for off in offsets:
    chunk = ecf[off:]
    for name, func in [
        ("zlib", lambda d: zlib.decompress(d)),
        ("zlib_wbits-15", lambda d: zlib.decompress(d, -15)),
        ("lzma", lambda d: lzma.decompress(d)),
        ("bz2", lambda d: bz2.decompress(d)),
    ]:
        try:
            result = func(chunk)
            print(f"SUCCESS at offset 0x{off:x} with {name}: {len(result):,} bytes")
            print(f"  First bytes: {result[:64]}")
        except Exception as e:
            pass  # 失敗は無視

# Magic固有: 0x28 0x28 = "((" がシグネチャかも
# XORデコードを試す
print("\nXOR試行:")
for xor_key in [0x28, 0x55, 0xFF, 0xAA, 0x5A]:
    xored = bytes(b ^ xor_key for b in ecf[22:])
    # XOR後にzlibシグネチャ(0x78)があるか
    pos = xored.find(b'\x78\x9c')
    if pos >= 0:
        print(f"  XOR 0x{xor_key:02x}: zlib marker at pos {pos}")
        try:
            result = zlib.decompress(xored[pos:])
            print(f"    Decompressed! {len(result):,} bytes: {result[:64]}")
        except:
            print(f"    zlib failed")
