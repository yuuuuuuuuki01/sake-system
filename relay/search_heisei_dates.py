"""
平成BCD日付を検索: 2026年 = 平成38年 = 0x26
2026-04-28 = bytes: 26 04 1c
2026-05-01 = bytes: 26 05 01
"""
import struct
from pathlib import Path

def heisei_year(y):
    """西暦年を平成年に変換"""
    return y - 1988

def heisei_bcd(y, m, d):
    hy = heisei_year(y)
    return bytes([hy, m, d])

from datetime import date

# Target dates
today = date(2026, 4, 28)
print(f"2026-04-28 Heisei BCD: {heisei_bcd(2026, 4, 28).hex()} ({heisei_year(2026)}.{4}.{28})")
print(f"2026-05-01 Heisei BCD: {heisei_bcd(2026, 5, 1).hex()}")
print()

files_to_scan = [
    "Z:/sk/dat/SKIDO.DAT",
    "Z:/sk/dat/SKIDD.DAT", 
    "Z:/sk/dat/SKJGS.DAT",
    "Z:/sk/dat/SKKGS.DAT",
]

for fpath in files_to_scan:
    path = Path(fpath)
    try:
        data = path.read_bytes()
    except:
        print(f"{path.name}: NOT FOUND")
        continue
    
    # Search for Heisei dates: 2024-2027 = Heisei 36-39
    count_by_month = {}
    may_positions = []
    
    for pos in range(len(data) - 2):
        b0, b1, b2 = data[pos], data[pos+1], data[pos+2]
        # Heisei year 35-40 (2023-2028), valid month, valid day
        if 35 <= b0 <= 40 and 1 <= b1 <= 12 and 1 <= b2 <= 31:
            try:
                year = 1988 + b0
                d = date(year, b1, b2)
                ym = f"{year}-{b1:02d}"
                count_by_month[ym] = count_by_month.get(ym, 0) + 1
                if year == 2026 and b1 >= 5:
                    may_positions.append((pos, d, data[max(0,pos-4):pos+8].hex()))
            except ValueError:
                pass
    
    print(f"=== {path.name} ===")
    for k in sorted(count_by_month.keys()):
        print(f"  {k}: {count_by_month[k]}")
    if may_positions:
        print(f"  May+ 2026 positions: {len(may_positions)}")
        for pos, d, ctx in may_positions[:5]:
            print(f"    pos={pos:,} date={d} ctx={ctx}")
    print()
