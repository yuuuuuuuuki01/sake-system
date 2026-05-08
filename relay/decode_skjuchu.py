"""
SKIDD.DAT (受注明細データ) - 受注伝票データを読み解く

SKIDO.DAT はB-treeインデックス: (令和年, 月, key) → record_ref
record_ref (4-byte LE) がSKIDD.DATのスロット番号と仮定して解析
"""
import struct
from pathlib import Path

HEADER_SIZE = 0x200

# Load SKIDO index
ido_path = Path("Z:/sk/dat/SKIDO.DAT")
ido_data = ido_path.read_bytes()
ido_rec_size = struct.unpack_from("<H", ido_data, 0x18)[0]
ido_total = (len(ido_data) - HEADER_SIZE) // ido_rec_size
print(f"SKIDO: record_size={ido_rec_size}, total_slots={ido_total:,}")

# Load SKIDD data 
idd_path = Path("Z:/sk/dat/SKIDD.DAT")
idd_data = idd_path.read_bytes()
idd_rec_size = struct.unpack_from("<H", idd_data, 0x18)[0]
idd_total = (len(idd_data) - HEADER_SIZE) // idd_rec_size
print(f"SKIDD: record_size={idd_rec_size}, total_slots={idd_total:,}")
print()

# Search SKIDO for May+ 2026 entries (Reiwa year=8, month>=5)
# Pattern: [year=08] [month>=05] [any] [4-byte ptr] [4-byte record_ref]
may_refs = []
for slot_i in range(ido_total):
    offset = HEADER_SIZE + slot_i * ido_rec_size
    rec = ido_data[offset:offset + ido_rec_size]
    if rec[0] in (0x00, 0x01, 0xFF) and all(b in (0x00, 0xFF) for b in rec[:8]):
        continue
    
    # Scan within this slot for May+ 2026 B-tree entries
    for off in range(0, len(rec) - 10):
        b = rec[off:off+11]
        # Look for pattern: 08 [05-12] [any] [4-byte] [2-byte record_ref_lo] ...
        if b[0] == 0x08 and 5 <= b[1] <= 12 and b[2] != 0x00:
            # Try to extract record reference at off+7 or off+3
            # Based on slot 8356 pattern: year(1) month(1) key(1) ptr(4) recref(2)
            if off + 11 <= len(rec):
                rec_ref_v1 = struct.unpack_from("<H", rec, off+7)[0]  # after 3-byte date + 4-byte ptr
                rec_ref_v2 = struct.unpack_from("<H", rec, off+3)[0]  # after 3-byte date
                if 20000 <= rec_ref_v1 <= 50000:
                    may_refs.append((slot_i, off, b[1], rec_ref_v1, rec[off:off+12].hex()))
                elif 20000 <= rec_ref_v2 <= 50000:
                    may_refs.append((slot_i, off, b[1], rec_ref_v2, rec[off:off+12].hex()))

print(f"May+ 2026 index entries found: {len(may_refs)}")
for item in may_refs[:20]:
    print(f"  slot {item[0]}, off {item[1]}, month={item[2]}, rec_ref={item[3]} ({item[3]:04x}), raw={item[4]}")

print()
# Now look at specific record ranges in SKIDD.DAT for May orders
# From slot 8356, May records were at 40 77 = 30528, 41 77 = 30529 etc.
print("=== SKIDD.DAT records around slot 30528 (May orders) ===")
for slot_i in range(30520, 30560):
    if slot_i >= idd_total:
        break
    offset = HEADER_SIZE + slot_i * idd_rec_size
    rec = idd_data[offset:offset + idd_rec_size]
    if all(b == 0x00 for b in rec[:8]) or all(b == 0xFF for b in rec[:8]):
        continue
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in rec[:80])
    print(f"  SKIDD slot {slot_i}: {asc}")
    print(f"              {rec[:80].hex()}")
