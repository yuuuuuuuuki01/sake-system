import struct, zlib
from pathlib import Path

ecf = Path("Z:/販売管理.ecf").read_bytes()

# ヘッダ後のブロック構造を探す
# Magic ECFはチャンクに分かれている可能性
print("=== ECF先頭100バイトの詳細 ===")
for i in range(0, min(100, len(ecf)), 4):
    v = struct.unpack_from("<I", ecf, i)[0]
    print(f"  @{i:3d}: {ecf[i:i+4].hex()} = {v:10d}")

print()
# ヘッダ: 0x16バイト目以降のデータサイズを確認
data_start = 0x16
print(f"data at 0x16: {ecf[data_start:data_start+20].hex()}")

# "LZMA" ストリームの特徴: 最初の5バイトがプロパティ
# LZMA properties: pb=2, lp=0, lc=3 → byte = 0x5D
lzma_pos = ecf.find(b'\x5d\x00\x00')
if lzma_pos >= 0:
    print(f"\nLZMA marker (5D 00 00) at pos {lzma_pos}")
    import lzma
    for off in range(max(0, lzma_pos-4), lzma_pos+5):
        try:
            r = lzma.decompress(ecf[off:], format=lzma.FORMAT_ALONE)
            print(f"  LZMA SUCCESS at off={off}: {len(r):,} bytes")
            print(f"  First 100: {r[:100]}")
            break
        except Exception as e:
            pass

# zlib deflate raw を全オフセットで試す
print("\n=== Raw deflate scan ===")
for off in range(0x16, min(0x200, len(ecf))):
    try:
        r = zlib.decompress(ecf[off:], wbits=-15)
        if len(r) > 1000:
            print(f"  deflate at off=0x{off:x}: {len(r):,} bytes → {r[:60]}")
    except:
        pass
