import struct, re
from pathlib import Path

HEADER_SIZE = 0x200

path = Path("Z:/sk/dat/SKIDO.DAT")
data = path.read_bytes()
record_size = struct.unpack_from("<H", data, 0x18)[0]
total_slots = (len(data) - HEADER_SIZE) // record_size

print(f"record_size={record_size}, total_slots={total_slots}")

# Find slots with varied content (not all 00/FF)
shown = 0
for i in range(min(total_slots, 50000)):
    offset = HEADER_SIZE + i * record_size
    rec = data[offset:offset + record_size]
    # Skip empty/index pages
    if rec[0] in (0x00, 0x01, 0xFF):
        continue
    unique = len(set(rec))
    if unique < 8:
        continue
    # Show hex + ASCII
    hex_str = rec[:80].hex()
    # Look for any readable ASCII
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in rec[:80])
    # Look for CP932 readable sections
    print(f"slot {i:6d}: {hex_str}")
    print(f"         {asc}")
    print()
    shown += 1
    if shown >= 8:
        break
