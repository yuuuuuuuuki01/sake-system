"""
SKJGS.DAT スキャン - 令和BCD日付 + 実データ確認
"""
import struct
from pathlib import Path

HEADER_SIZE = 0x200

path = Path("Z:/sk/dat/SKJGS.DAT")
data = path.read_bytes()
rec_size = struct.unpack_from("<H", data, 0x18)[0]
total = (len(data) - HEADER_SIZE) // rec_size
print(f"SKJGS: record_size={rec_size}, total_slots={total:,}")
print()

may_slots = []
date_dist = {}

for i in range(total):
    offset = HEADER_SIZE + i * rec_size
    rec = data[offset:offset + rec_size]
    
    # Skip nulls/empty
    if all(b in (0x00, 0xFF) for b in rec[:4]):
        continue
    
    # Search for Reiwa BCD date pattern: year(1-10), month(1-12), day(1-31)
    for off in range(len(rec) - 2):
        b0, b1, b2 = rec[off], rec[off+1], rec[off+2]
        if 1 <= b0 <= 10 and 1 <= b1 <= 12 and 1 <= b2 <= 31:
            try:
                from datetime import date
                d = date(2018 + b0, b1, b2)
                ym = f"{d.year}-{d.month:02d}"
                date_dist[ym] = date_dist.get(ym, 0) + 1
                if d.year == 2026 and d.month >= 5:
                    may_slots.append((i, off, d, rec))
                break  # Take first date hit per slot
            except ValueError:
                pass

print("Date distribution (all valid Reiwa dates):")
for k in sorted(date_dist.keys())[-12:]:
    print(f"  {k}: {date_dist[k]}")

print(f"\nMay+ 2026 SKJGS slots: {len(may_slots)}")
for slot_i, off, d, rec in may_slots[:10]:
    asc = ''.join(chr(b) if 32<=b<127 else '.' for b in rec)
    print(f"  slot {slot_i}: date={d} @off{off} | {asc}")
    print(f"         hex: {rec.hex()}")
