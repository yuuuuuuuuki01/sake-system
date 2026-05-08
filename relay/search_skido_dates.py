import struct, re
from pathlib import Path
from datetime import date

def reiwa_bcd(d):
    """令和BCD: 1バイト令和年 + 1バイト月 + 1バイト日"""
    reiwa_year = d.year - 2018
    return bytes([reiwa_year, d.month, d.day])

HEADER_SIZE = 0x200
path = Path("Z:/sk/dat/SKIDO.DAT")
data = path.read_bytes()
record_size = struct.unpack_from("<H", data, 0x18)[0]
total_slots = (len(data) - HEADER_SIZE) // record_size

print(f"record_size={record_size}, total_slots={total_slots:,}")
print()

# Count dates by month/year for all slots
date_counts = {}
may_slots = []

for i in range(total_slots):
    offset = HEADER_SIZE + i * record_size
    rec = data[offset:offset + record_size]
    if rec[0] in (0x00, 0x01, 0xFF):
        continue
    
    # Search for Reiwa BCD dates within this record
    found_dates = []
    for off in range(len(rec) - 2):
        b0, b1, b2 = rec[off], rec[off+1], rec[off+2]
        # Reiwa year 1-10 (2019-2028), valid month, valid day
        if 1 <= b0 <= 10 and 1 <= b1 <= 12 and 1 <= b2 <= 31:
            year = 2018 + b0
            try:
                d = date(year, b1, b2)
                found_dates.append((off, d))
            except ValueError:
                pass
    
    if found_dates:
        # Take the first date found as the main date for this record
        _, main_date = found_dates[0]
        key = f"{main_date.year}-{main_date.month:02d}"
        date_counts[key] = date_counts.get(key, 0) + 1
        
        if main_date >= date(2026, 5, 1):
            may_slots.append((i, main_date, rec))

print("Date distribution (by month):")
for k in sorted(date_counts.keys())[-24:]:
    print(f"  {k}: {date_counts[k]} slots")

print(f"\nMay 2026+ slots: {len(may_slots)}")
if may_slots:
    print("\nSample May 2026+ records:")
    for slot_i, d, rec in may_slots[:5]:
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in rec[:60])
        print(f"  slot {slot_i}: date={d} | {asc}")
