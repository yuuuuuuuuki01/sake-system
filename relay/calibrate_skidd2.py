"""
SKIDD.DAT field offset calibration using SHSYO.MST cross-reference.
Known: product codes 103, 130, 109, 170 appear in SKIDD slots 30520+
Strategy:
  1. Load SHSYO.MST → get names/prices for target codes
  2. Scan SKIDD slots 30400-30700 → find code byte offsets
  3. Search nearby for double prices → confirm amount/price offsets
  4. Search for date patterns (Reiwa BCD or int16 yyyymmdd style)
"""
import struct, sys, re

SKIDD_PATH = "Z:/sk/dat/SKIDD.DAT"
SHSYO_PATH = "Z:/sh/mst/SHSYO.MST"
REC_MARKER = b"\x09\x2e\x38\x09"
HEADER_SIZE = 0x200
REC_SIZE = 487

# ── 1. Load SHSYO.MST product master ──────────────────────────────────────────
target_codes = {"103", "130", "109", "170", "107", "150", "100", "105", "110", "120"}

products = {}   # code -> {name, purchase, sale, list_price}
with open(SHSYO_PATH, "rb") as f:
    raw = f.read()

pos = 0
while True:
    m = raw.find(REC_MARKER, pos)
    if m < 0:
        break
    ds = m + 4  # data start after marker
    if ds + 130 > len(raw):
        break
    # code: 7 bytes at ds+0
    code_bytes = raw[ds:ds+7]
    code = code_bytes.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
    if code in target_codes:
        # kana: 10B at ds+7
        # short_name: 26B at ds+17
        # name: 32B at ds+43
        name_raw = raw[ds+43:ds+75]
        name = name_raw.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
        short_raw = raw[ds+17:ds+43]
        short_name = short_raw.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
        # prices at ds+90, ds+98, ds+106
        if ds + 114 <= len(raw):
            purchase = struct.unpack_from("<d", raw, ds+90)[0]
            sale     = struct.unpack_from("<d", raw, ds+98)[0]
            list_p   = struct.unpack_from("<d", raw, ds+106)[0]
        else:
            purchase = sale = list_p = 0.0
        products[code] = {
            "name": name or short_name,
            "purchase": purchase,
            "sale": sale,
            "list": list_p,
        }
    pos = m + 1

print("=== Product master (SHSYO.MST) ===")
for code in sorted(products):
    p = products[code]
    print(f"  {code}: {p['name']}  purchase={p['purchase']:.2f}  sale={p['sale']:.2f}  list={p['list']:.2f}")

# ── 2. Scan SKIDD.DAT slots ────────────────────────────────────────────────────
print()
with open(SKIDD_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    # Read slots 30400-30700
    slot_start = 30400
    slot_end   = 30700
    f.seek(HEADER_SIZE + slot_start * REC_SIZE)
    count = slot_end - slot_start
    data = f.read(count * REC_SIZE)

def get_slot(idx):
    """Return raw bytes of slot (relative to slot_start)."""
    off = idx * REC_SIZE
    return data[off:off+REC_SIZE]

# Search for product codes as ASCII in each slot
code_hits = {}  # slot_abs -> [(offset_in_rec, code)]
for i in range(count):
    slot_abs = slot_start + i
    rec = get_slot(i)
    for code in target_codes:
        cb = code.encode("ascii")
        pos2 = 0
        while True:
            p = rec.find(cb, pos2)
            if p < 0:
                break
            # Confirm it's isolated enough (next byte not digit)
            after = rec[p+len(cb):p+len(cb)+1]
            if not after or not after.isdigit():
                code_hits.setdefault(slot_abs, []).append((p, code))
            pos2 = p + 1

print("=== Product code occurrences in slots 30400-30700 ===")
for slot_abs in sorted(code_hits):
    hits = code_hits[slot_abs]
    rec = get_slot(slot_abs - slot_start)
    print(f"\nSlot {slot_abs}:")
    for off, code in sorted(hits):
        ctx = rec[max(0,off-8):off+len(code)+8].hex()
        print(f"  offset {off:3d}: code={code}  ctx={ctx}")

# ── 3. Focused analysis of slots with known codes ─────────────────────────────
# From previous session: slot 30520 has "103" at off=2, "130" at off=25 and 48
# slot 30524 has "109" at off=102, "170" at off=125 and 148
# Let's dump those slots completely and look for prices and dates

def find_doubles(rec, expected_values, tolerance=0.02):
    """Find IEEE754 doubles in rec matching expected_values."""
    found = []
    for off in range(0, len(rec)-7, 1):
        val = struct.unpack_from("<d", rec, off)[0]
        for name, ev in expected_values.items():
            if ev > 0 and abs(val - ev) / ev < tolerance:
                found.append((off, name, val))
    return found

def scan_dates(rec):
    """Look for date-like patterns."""
    candidates = []
    # BCD Reiwa: year 8 = Reiwa, month, day packed
    # int16 LE or BE for year around 2024-2026
    for off in range(0, len(rec)-3):
        # Little-endian int32: could be yyyymmdd
        v32 = struct.unpack_from("<I", rec, off)[0]
        if 20240101 <= v32 <= 20261231:
            y,m,d = v32//10000, (v32//100)%100, v32%100
            if 1<=m<=12 and 1<=d<=31:
                candidates.append((off, "yyyymmdd_LE", f"{y}-{m:02d}-{d:02d}"))
        # Big-endian int32
        v32b = struct.unpack_from(">I", rec, off)[0]
        if 20240101 <= v32b <= 20261231:
            y,m,d = v32b//10000, (v32b//100)%100, v32b%100
            if 1<=m<=12 and 1<=d<=31:
                candidates.append((off, "yyyymmdd_BE", f"{y}-{m:02d}-{d:02d}"))
        # Japanese era BCD: 08=Reiwa, then YY, MM, DD as BCD bytes
        # e.g. Reiwa 8 May 2026 = 0x08 0x08 0x05 ...
        if off+3 < len(rec):
            e,y,m,d2 = rec[off], rec[off+1], rec[off+2], rec[off+3]
            if e == 0x08 and 1<=y<=20 and 1<=m<=12 and 1<=d2<=31:
                candidates.append((off, "era_ymd", f"R{y}-{m:02d}-{d2:02d}"))
        # int16 LE year 2020-2030
        if off+1 < len(rec):
            y16 = struct.unpack_from("<H", rec, off)[0]
            if 2020 <= y16 <= 2030:
                candidates.append((off, "year_LE16", f"year={y16}"))
        # Magic internal date: days since 1900-01-01 as int32
        # 2026-05-01 = 45,958 days from 1900
        v32c = struct.unpack_from("<I", rec, off)[0]
        if 44000 <= v32c <= 47000:  # approx 2020-2028
            candidates.append((off, "days_1900_LE", f"day#{v32c}"))
        # int16 version
        v16 = struct.unpack_from("<H", rec, off)[0]
        if 44000 <= v16 <= 47000:
            candidates.append((off, "days_1900_LE16", f"day#{v16}"))
        # Japanese era int16: era*10000 + yy*100 + mm as packed int
        # e.g. Reiwa=5, y=8, m=5: 50805
        if 40101 <= v16 <= 59999:  # plausible era-encoded range
            era = v16 // 10000
            ym  = v16 % 10000
            y2  = ym // 100
            m2  = ym % 100
            if era in (4,5) and 1<=y2<=40 and 1<=m2<=12:
                candidates.append((off, "era_packed16", f"era={era} y={y2} m={m2}"))

    # Remove duplicates (same offset, multiple hits — keep all)
    seen = set()
    unique = []
    for c in candidates:
        key = (c[0], c[1])
        if key not in seen:
            seen.add(key)
            unique.append(c)
    return unique

focus_slots = [30520, 30524, 30525, 30526, 30528, 30530]
print("\n=== Focused analysis of key slots ===")
for sa in focus_slots:
    if sa < slot_start or sa >= slot_end:
        continue
    rec = get_slot(sa - slot_start)
    print(f"\n--- Slot {sa} (first 200 bytes hex) ---")
    for row in range(0, min(200, REC_SIZE), 16):
        hexpart = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(16))
        chrpart = "".join(chr(rec[row+j]) if 32<=rec[row+j]<=126 else '.' for j in range(16) if row+j < len(rec))
        print(f"  {row:3d}: {hexpart}  {chrpart}")

    # Date candidates
    dates = scan_dates(rec)
    if dates:
        print(f"  Date candidates:")
        for off, kind, val in dates[:20]:
            print(f"    off={off:3d} {kind}: {val}")

    # Price doubles
    # Collect relevant prices from products found in this slot
    relevant_prices = {}
    if sa in code_hits:
        for off, code in code_hits[sa]:
            if code in products:
                p = products[code]
                relevant_prices[f"{code}_sale"]     = p["sale"]
                relevant_prices[f"{code}_purchase"] = p["purchase"]
                relevant_prices[f"{code}_list"]     = p["list"]
    if relevant_prices:
        dbl_hits = find_doubles(rec, relevant_prices)
        if dbl_hits:
            print(f"  Price double matches:")
            for off, name, val in dbl_hits[:20]:
                print(f"    off={off:3d} {name}: {val:.2f}")
        else:
            print(f"  (no double price matches found)")
            print(f"  Reference prices: {relevant_prices}")

# ── 4. Cross-slot field consistency check ─────────────────────────────────────
# Look at all slots where a code was found, check if offset is consistent
print("\n=== Code offset consistency across slots ===")
offset_by_code = {}
for slot_abs, hits in sorted(code_hits.items()):
    for off, code in hits:
        offset_by_code.setdefault(code, []).append((slot_abs, off))

for code in sorted(offset_by_code):
    occ = offset_by_code[code]
    offsets = [o for _, o in occ]
    print(f"  Code '{code}': found at offsets {sorted(set(offsets))} in {len(occ)} slots")
