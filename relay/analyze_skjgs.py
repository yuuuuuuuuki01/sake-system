import struct, re
from pathlib import Path

path = Path("Z:/sk/dat/SKJGS.DAT")
data = path.read_bytes()

HEADER_SIZE = 0x200
record_size = struct.unpack_from("<H", data, 0x18)[0]
total_slots = (len(data) - HEADER_SIZE) // record_size

print(f"file_size={len(data)}, record_size={record_size}, total_slots={total_slots}")
print()

DATE_RE = re.compile(rb"20[12]\d(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])")

date_hits = {}
active_slots = 0

for i in range(min(total_slots, 200000)):
    offset = HEADER_SIZE + i * record_size
    rec = data[offset:offset + record_size]
    if rec[0] == 0x01 or all(b == 0xFF for b in rec[:4]):
        continue
    
    dates = DATE_RE.findall(rec)
    if dates:
        active_slots += 1
        for d in dates:
            ds = d.decode('ascii')
            date_hits[ds] = date_hits.get(ds, 0) + 1

print(f"Active slots with dates: {active_slots}")
print()

if date_hits:
    sorted_dates = sorted(date_hits.items())
    print("Dates found:")
    for d, cnt in sorted_dates[-30:]:
        print(f"  {d}: {cnt} slots")
else:
    print("No ASCII YYYYMMDD dates found")
    print("\nSample non-trivial slots:")
    shown = 0
    for i in range(min(total_slots, 10000)):
        offset = HEADER_SIZE + i * record_size
        rec = data[offset:offset + record_size]
        if rec[0] not in (0x01, 0x00, 0xFF) and len(set(rec)) > 5:
            print(f"  slot {i}: {rec.hex()}")
            shown += 1
            if shown >= 5:
                break
