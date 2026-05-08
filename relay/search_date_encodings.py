import struct, re
from pathlib import Path
from datetime import date

# Target dates: April 2026 to May 2026
# Try different date encodings

def date_to_encodings(d):
    """Return various binary encodings of a date."""
    enc = {}
    # Python ordinal
    ord_val = d.toordinal()
    enc['ordinal'] = struct.pack('<I', ord_val)
    # Excel serial (1900-01-01 = 1, with Excel's leap-year bug)
    excel_val = (d - date(1899, 12, 30)).days
    enc['excel'] = struct.pack('<I', excel_val)
    # Reiwa year (令和 started 2019-05-01)
    # So 2026-05-01 = Reiwa 8, month 5, day 1
    reiwa_year = d.year - 2018
    enc['reiwa_bcd'] = bytes([reiwa_year, d.month, d.day])
    # Heisei year (平成 1989-01-08 to 2019-04-30)
    # 2026 is Reiwa era
    # Gregorian 2-digit year: 26
    enc['gg_bcd'] = bytes([d.year % 100, d.month, d.day])
    # YYYYMMDD as 4-byte LE integer
    ymdhex = d.year * 10000 + d.month * 100 + d.day
    enc['ymd_int'] = struct.pack('<I', ymdhex)
    return enc

# Check a range of dates
target_dates = [date(2026, m, day) for m in [4, 5] for day in range(1, 32) 
                if m == 4 and day <= 30 or m == 5 and day <= 31]

print("Encodings for 2026-04-28 (today):")
for name, val in date_to_encodings(date(2026, 4, 28)).items():
    print(f"  {name}: {val.hex()} ({struct.unpack('<I', val.ljust(4, b'\x00')[:4])[0]})")
print()
print("Encodings for 2026-05-01 (next month):")
for name, val in date_to_encodings(date(2026, 5, 1)).items():
    print(f"  {name}: {val.hex()} ({struct.unpack('<I', val.ljust(4, b'\x00')[:4])[0]})")
print()

# Now search for these encodings in SKIDO.DAT
print("=== Searching SKIDO.DAT for binary date patterns ===")
path = Path("Z:/sk/dat/SKIDO.DAT")
data = path.read_bytes()

for target_date in [date(2026, 4, 28), date(2026, 5, 1), date(2026, 5, 10)]:
    enc_map = date_to_encodings(target_date)
    for name, pattern in enc_map.items():
        positions = []
        start = 0
        while True:
            pos = data.find(pattern, start)
            if pos < 0:
                break
            positions.append(pos)
            start = pos + 1
        if positions:
            print(f"{target_date} {name} ({pattern.hex()}): found at {positions[:5]}")
