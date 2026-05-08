import struct
from pathlib import Path

path = Path("Z:/sk/dat/SKIDO.DAT")
data = path.read_bytes()
record_size = struct.unpack_from("<H", data, 0x18)[0]
HEADER_SIZE = 0x200

# Confirmed Apr 28 (令和8年4月28日 = 0x08 0x04 0x1C) positions
confirmed_positions = [3654106, 3689059, 3735755, 3741793, 4703049]

print("=== Context around confirmed 2026-04-28 dates ===")
for pos in confirmed_positions:
    slot_num = (pos - HEADER_SIZE) // record_size
    slot_offset = HEADER_SIZE + slot_num * record_size
    date_rel = pos - slot_offset
    rec = data[slot_offset:slot_offset + record_size]
    
    print(f"\nPosition {pos:,} → slot {slot_num}, date at rel offset {date_rel}")
    # Print context around the date
    ctx_start = max(0, pos - 16)
    ctx_end = min(len(data), pos + 20)
    ctx = data[ctx_start:ctx_end]
    hex_ctx = ' '.join(f'{b:02x}' for b in ctx)
    asc_ctx = ''.join(chr(b) if 32 <= b < 127 else '.' for b in ctx)
    print(f"  hex: {hex_ctx}")
    print(f"  asc: {asc_ctx}")
    
    # Check what's in the full slot
    print(f"  full slot hex: {rec.hex()}")
    print(f"  full slot asc: {''.join(chr(b) if 32<=b<127 else '.' for b in rec)}")
    
    # Try CP932 decode of sections
    for section_start in range(0, len(rec)-10, 10):
        chunk = rec[section_start:section_start+20]
        try:
            txt = chunk.decode('cp932', errors='strict').replace('\x00', '').strip()
            if len(txt) >= 3 and any(c.isalnum() for c in txt):
                print(f"  CP932@{section_start}: {txt!r}")
        except:
            pass
