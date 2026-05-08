import struct, re
from pathlib import Path

DATE_RE = re.compile(rb"20[12]\d(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])")
HEADER_SIZE = 0x200

def analyze(filepath):
    path = Path(filepath)
    data = path.read_bytes()
    record_size = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // record_size
    print(f"\n=== {path.name} ===")
    print(f"file_size={len(data):,}, record_size={record_size}, total_slots={total_slots:,}")

    date_hits = {}
    active_slots = 0

    for i in range(min(total_slots, 500000)):
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
    if date_hits:
        sorted_dates = sorted(date_hits.items())
        print("Recent dates:")
        for d, cnt in sorted_dates[-20:]:
            print(f"  {d}: {cnt}")
    else:
        print("No ASCII YYYYMMDD dates found")

for f in ["Z:/sk/dat/SKIDO.DAT", "Z:/sk/dat/SKIDD.DAT", "Z:/sk/dat/SKIDG.DAT", "Z:/sk/dat/SKTOR.DAT", "Z:/sk/dat/SKDEN.DAT"]:
    try:
        analyze(f)
    except Exception as e:
        print(f"{f}: ERROR {e}")
