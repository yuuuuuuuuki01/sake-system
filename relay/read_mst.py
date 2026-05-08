import struct, re
from pathlib import Path

HEADER_SIZE = 0x200

def analyze_mst(filepath):
    path = Path(filepath)
    data = path.read_bytes()
    rec_size = struct.unpack_from("<H", data, 0x18)[0]
    total = (len(data) - HEADER_SIZE) // rec_size
    print(f"\n=== {path.name} === rec_size={rec_size}, total={total}")
    
    shown = 0
    for i in range(total):
        off = HEADER_SIZE + i * rec_size
        rec = data[off:off+rec_size]
        if all(b in (0, 0xFF) for b in rec[:4]):
            continue
        # CP932デコード
        try:
            text = rec.decode('cp932', errors='replace').replace('\x00', ' ').strip()
            printable = ''.join(c if c.isprintable() else ' ' for c in text)
            if len(printable.strip()) < 3:
                continue
            asc = ''.join(chr(b) if 32<=b<127 else '.' for b in rec)
            print(f"  slot {i:4d}: {asc[:80]}")
            shown += 1
            if shown >= 15:
                break
        except:
            pass

for f in ["Z:/sk/mst/SKSYU.MST", "Z:/sk/mst/SKMEI.MST", "Z:/sk/mst/SKTRI.MST"]:
    analyze_mst(f)
