"""
Magic.ini の DateMode=J から、Magicの日付整数エポックを特定する

SHTOR.DATはASCII日付（20260428）を使用。
SKIDOのptrフィールド d5 31 0b 00 = 733141 が何かを解明する。
"""
from datetime import date

# Python ordinalで確認
d_today = date(2026, 4, 28)
d_may1 = date(2026, 5, 1)

print(f"2026-04-28 Python ordinal: {d_today.toordinal()}")
print(f"2026-05-01 Python ordinal: {d_may1.toordinal()}")
print()

# Magicの日付エポック候補
epochs = [
    ("1900-01-01 (Excel-like)", date(1900, 1, 1).toordinal() - 1),  # day1=Jan1,1900
    ("1899-12-30 (Excel actual)", date(1899, 12, 30).toordinal()),  
    ("1970-01-01 (Unix)", date(1970, 1, 1).toordinal()),
    ("Python ordinal (year 1)", 0),
]

for name, epoch_ord in epochs:
    days_today = d_today.toordinal() - epoch_ord
    days_may1 = d_may1.toordinal() - epoch_ord
    import struct
    b_today = struct.pack('<I', days_today)
    b_may1 = struct.pack('<I', days_may1)
    print(f"Epoch {name}:")
    print(f"  2026-04-28 = {days_today} = bytes {b_today.hex()}")
    print(f"  2026-05-01 = {days_may1} = bytes {b_may1.hex()}")
    print()

# SKIDOのptrフィールド d5 31 0b 00 = 733141 がどのエポックで何の日付か
ptr_val = 0x000B31D5  # = 733141
print(f"\nSKIDO ptr value: {ptr_val} = 0x{ptr_val:08x}")
for name, epoch_ord in epochs:
    try:
        d = date.fromordinal(ptr_val + epoch_ord)
        print(f"  Epoch {name}: {d}")
    except:
        print(f"  Epoch {name}: out of range")
