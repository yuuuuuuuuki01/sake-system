"""
SKIDD.DAT スロット30520-30560をCP932デコードして
5月受注データが読めるか確認
"""
import struct
from pathlib import Path

HEADER_SIZE = 0x200
path = Path("Z:/sk/dat/SKIDD.DAT")
data = path.read_bytes()
rec_size = struct.unpack_from("<H", data, 0x18)[0]

print(f"SKIDD: rec_size={rec_size}")
print()

for slot_i in range(30510, 30560):
    offset = HEADER_SIZE + slot_i * rec_size
    rec = data[offset:offset + rec_size]
    
    # 空スロットをスキップ
    if all(b == 0x00 for b in rec[:16]) or all(b == 0xFF for b in rec[:16]):
        continue
    
    # CP932でデコード
    try:
        text = rec.decode('cp932', errors='replace')
        # 印字可能な部分を取り出す
        printable = ''.join(c if c.isprintable() and c != '\ufffd' else ' ' for c in text)
        # 意味のある文字列があるか
        words = [w.strip() for w in printable.split() if len(w.strip()) >= 2]
        if words:
            print(f"slot {slot_i}: {printable[:100].strip()}")
            # 数値を探す (金額かも)
            nums = []
            for i in range(0, len(rec)-3, 1):
                v = struct.unpack_from("<I", rec, i)[0]
                if 1000 <= v <= 10000000:  # 1千〜1千万円の範囲
                    nums.append((i, v))
            if nums:
                print(f"         数値: {[(f'@{i}:{v:,}') for i, v in nums[:5]]}")
    except:
        pass
