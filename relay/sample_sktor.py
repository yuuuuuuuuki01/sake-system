import struct, re
from pathlib import Path

HEADER_SIZE = 0x200

path = Path("Z:/sk/dat/SKTOR.DAT")
data = path.read_bytes()
record_size = struct.unpack_from("<H", data, 0x18)[0]
total_slots = (len(data) - HEADER_SIZE) // record_size

print(f"record_size={record_size}, total_slots={total_slots}")

shown = 0
for i in range(total_slots):
    offset = HEADER_SIZE + i * record_size
    rec = data[offset:offset + record_size]
    if rec[0] in (0x00, 0x01, 0xFF):
        continue
    unique = len(set(rec))
    if unique < 5:
        continue
    hex_str = rec.hex()
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in rec)
    try:
        cp932 = ''.join(c if c.isprintable() else '?' for c in rec.decode('cp932', errors='replace'))
    except:
        cp932 = "?"
    print(f"slot {i:4d}: {asc}")
    print(f"         {hex_str[:60]}")
    print(f"  CP932: {cp932}")
    print()
    shown += 1
    if shown >= 10:
        break
