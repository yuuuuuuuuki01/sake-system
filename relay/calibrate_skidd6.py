"""
SKIDO.DAT 詳細解析 — 正しい日付スキャン + double 値の計算
SKIDO slot 5084: off 220-221 = 08 05 = Reiwa 8 May 2026
→ 同様の構造を持つ全スロットをスキャン
"""
import struct, re, os

SKIDD_PATH = "Z:/sk/dat/SKIDD.DAT"
SKIDO_PATH = "Z:/sk/dat/SKIDO.DAT"
SHSYO_PATH = "Z:/sh/mst/SHSYO.MST"
HEADER_SIZE = 0x200
REC_MARKER = b"\x09\x2e\x38\x09"

with open(SKIDO_PATH, "rb") as f:
    hdr = f.read(HEADER_SIZE)
skido_rec = struct.unpack_from("<H", hdr, 0x18)[0]
skido_size = os.path.getsize(SKIDO_PATH)
skido_slots = (skido_size - HEADER_SIZE) // skido_rec

print(f"SKIDO: rec={skido_rec}, slots={skido_slots}")

def read_slot(path, rec_size, slot_num):
    with open(path, "rb") as f:
        f.seek(HEADER_SIZE + slot_num * rec_size)
        return f.read(rec_size)

# ── Step 1: SKIDO slot 5085 の全 double 値を出力 ──────────────────────────────
print("\n=== SKIDO slot 5085 全 double 値 ===")
rec = read_slot(SKIDO_PATH, skido_rec, 5085)
marker_pos = rec.find(REC_MARKER)
print(f"MARKER @ offset {marker_pos}")
print(f"off 128-200 ASCII: {rec[128:200]!r}")
print(f"off 220-225 hex: {rec[220:226].hex()}")

doubles_found = []
for off in range(0, skido_rec - 7, 1):
    v = struct.unpack_from("<d", rec, off)[0]
    if 10 <= abs(v) <= 1000000 and not (v != v):  # reasonable range, not NaN
        doubles_found.append((off, v))
if doubles_found:
    print("  reasonable doubles (10-1M):")
    for off, v in doubles_found:
        print(f"    off={off:3d}: {v:.4f}")

print(f"\n=== SKIDO slot 5086 全 double 値 ===")
rec86 = read_slot(SKIDO_PATH, skido_rec, 5086)
marker86 = rec86.find(REC_MARKER)
print(f"MARKER @ offset {marker86}")
doubles86 = []
for off in range(0, skido_rec - 7, 1):
    v = struct.unpack_from("<d", rec86, off)[0]
    if 10 <= abs(v) <= 1000000 and not (v != v):
        doubles86.append((off, v))
if doubles86:
    print("  reasonable doubles (10-1M):")
    for off, v in doubles86:
        print(f"    off={off:3d}: {v:.4f}")

print(f"\n=== SKIDO slot 5087 全 double 値 ===")
rec87 = read_slot(SKIDO_PATH, skido_rec, 5087)
marker87 = rec87.find(REC_MARKER)
print(f"MARKER @ offset {marker87}")
doubles87 = []
for off in range(0, skido_rec - 7, 1):
    v = struct.unpack_from("<d", rec87, off)[0]
    if 10 <= abs(v) <= 1000000 and not (v != v):
        doubles87.append((off, v))
if doubles87:
    print("  reasonable doubles (10-1M):")
    for off, v in doubles87:
        print(f"    off={off:3d}: {v:.4f}")

# ── Step 2: SKIDO slot 5084 の全 double ──────────────────────────────────────
print(f"\n=== SKIDO slot 5084 全 double 値 ===")
rec84 = read_slot(SKIDO_PATH, skido_rec, 5084)
marker84 = rec84.find(REC_MARKER)
print(f"MARKER @ offset {marker84}")
print(f"off 220-225 hex: {rec84[220:226].hex()}")  # should be 08 05
doubles84 = []
for off in range(0, skido_rec - 7, 1):
    v = struct.unpack_from("<d", rec84, off)[0]
    if 10 <= abs(v) <= 1000000 and not (v != v):
        doubles84.append((off, v))
if doubles84:
    print("  reasonable doubles (10-1M):")
    for off, v in doubles84:
        print(f"    off={off:3d}: {v:.4f}")
else:
    print("  (none found)")

# ── Step 3: SHSYO.MST 商品価格取得 ────────────────────────────────────────────
print("\n=== SHSYO.MST 商品価格 (コード 100-900) ===")
norm_targets = set(str(i) for i in range(100, 900))

products = {}
with open(SHSYO_PATH, "rb") as f:
    raw = f.read()

pos = 0
while True:
    m = raw.find(REC_MARKER, pos)
    if m < 0:
        break
    ds = m + 4
    if ds + 130 > len(raw):
        break
    code_bytes = raw[ds:ds+7]
    code = code_bytes.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
    norm = code.lstrip("0") or "0"
    if norm in norm_targets:
        name_raw = raw[ds+43:ds+75]
        name = name_raw.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
        if ds + 114 <= len(raw):
            purchase = struct.unpack_from("<d", raw, ds+90)[0]
            sale     = struct.unpack_from("<d", raw, ds+98)[0]
            list_p   = struct.unpack_from("<d", raw, ds+106)[0]
        else:
            purchase = sale = list_p = 0.0
        products[norm] = {"code": code, "name": name, "purchase": purchase, "sale": sale, "list": list_p}
    pos = m + 1

# Show products that appear in slots 5085/5086/5087
target_codes = ["105", "120", "107", "160", "410", "150", "151"]
print("  関連商品:")
for code in target_codes:
    p = products.get(code)
    if p:
        try:
            name = p['name'][:20].encode('cp932', errors='replace').decode('cp932', errors='replace')
        except:
            name = repr(p['name'][:10])
        print(f"    {code}: {name}  sale={p['sale']:.2f}  purchase={p['purchase']:.2f}  list={p['list']:.2f}")
    else:
        print(f"    {code}: (not found in SHSYO)")

# ── Step 4: 正しい日付スキャン — offset 220-221 に 08 XX (Reiwa 8, XX月) を探す ──
# Reiwa 8 = 2026, so any month from 4 (April, today) onwards is future
print("\n=== SKIDO: offset 220-221 が Reiwa 8+ の全スロット ===")
future_records = []

# Check what's at offset 220-221 for all slots
# But also check other specific offsets where date might be stored

# First determine: is offset 220 always the date in these records?
# Check slots 5085, 5086, 5087, 5088 for comparison
for si in [5085, 5086, 5087, 5088]:
    rec = read_slot(SKIDO_PATH, skido_rec, si)
    print(f"  slot {si}: off 218-225 = {rec[218:226].hex()}  (off 220-221: {rec[220]:02x} {rec[221]:02x})")

# Scan all slots looking for Reiwa date at various offsets
# Strategy: look for RECORD_MARKER, then look for date byte-pairs nearby

print("\n  全スロットスキャン (off 220-221 で Reiwa 8,月>=4 を探す):")
from collections import Counter
date_at_220 = Counter()

with open(SKIDO_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    for si in range(skido_slots):
        rec = f.read(skido_rec)
        if not rec or len(rec) < skido_rec:
            break
        # Don't skip based on first 8 bytes — slot 5084 has zeros there but is valid!
        # Only skip if first 220 bytes are all zeros
        if all(b == 0 for b in rec[:8]):
            ry = rec[220] if len(rec) > 221 else 0
            mo = rec[221] if len(rec) > 221 else 0
        else:
            ry = rec[220] if len(rec) > 221 else 0
            mo = rec[221] if len(rec) > 221 else 0

        if 1 <= ry <= 20 and 1 <= mo <= 12:
            date_at_220[(ry, mo)] += 1
            if ry >= 8 and (ry > 8 or mo >= 4):  # Reiwa 8 April+ or later
                future_records.append((si, ry, mo, bytes(rec)))

print(f"  Date at off-220 distribution: {sorted(date_at_220.most_common(20), key=lambda x: x[0])}")
print(f"  Future slots found (Reiwa 8 Apr+): {len(future_records)}")

# ── Step 5: 未来スロットの詳細ダンプと価格解析 ────────────────────────────────
print("\n=== 未来受注スロットの詳細解析 ===")
analyzed = 0
for si, ry, mo, rec in sorted(future_records, key=lambda x: x[0])[:10]:
    mk_pos = rec.find(REC_MARKER)
    print(f"\n  SKIDO slot {si}: Reiwa{ry}-{mo:02d}, MARKER@{mk_pos}")

    # Full dump
    print(f"  ダンプ:")
    for row in range(0, skido_rec, 16):
        hexpart = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(16))
        chrpart = "".join(chr(rec[row+j]) if 32 <= rec[row+j] <= 126 else '.' for j in range(16) if row+j < len(rec))
        print(f"    {row:3d}: {hexpart}  {chrpart}")

    # Reasonable doubles
    dbl_found = []
    for off in range(0, skido_rec - 7):
        v = struct.unpack_from("<d", rec, off)[0]
        if 10 <= abs(v) <= 10000000 and not (v != v):
            dbl_found.append((off, v))

    if dbl_found:
        print(f"  reasonable doubles:")
        for off, v in dbl_found:
            # Check if it matches any product price
            matches = []
            for code, p in products.items():
                for k, pv in [("sale", p["sale"]), ("purchase", p["purchase"]), ("list", p["list"])]:
                    if pv > 10 and abs(v - pv) / pv < 0.02:
                        matches.append(f"{code}_{k}={pv:.0f}")
            match_str = " ".join(matches) if matches else ""
            print(f"    off={off:3d}: {v:.4f}  {match_str}")

    # int32 values in reasonable quantity range
    int_found = []
    for off in range(0, skido_rec - 3):
        v32 = struct.unpack_from("<I", rec, off)[0]
        if 1 <= v32 <= 10000:
            int_found.append((off, v32))
    if int_found:
        print(f"  int32 (1-10000): {int_found[:15]}")

    # CP932 text
    try:
        text = rec.decode("cp932", errors="replace")
        segs = []
        i2 = 0
        while i2 < len(text):
            s = i2
            while i2 < len(text) and text[i2] not in ('\ufffd', '\x00') and text[i2].isprintable():
                i2 += 1
            seg = text[s:i2].strip()
            if len(seg) >= 2:
                segs.append((s, seg))
            i2 += 1
        print(f"  CP932 text:")
        for bp, seg in segs[:15]:
            print(f"    [{bp}] {seg!r}")
    except:
        pass

    analyzed += 1
    if analyzed >= 5:
        break

print(f"\n=== 完了 ===")

# ── Step 6: SKIDD.DAT 末尾スロットに商品コードがあるか確認 ─────────────────────
print("\n=== SKIDD: 末尾200スロットの非空スロット確認 ===")
with open(SKIDD_PATH, "rb") as f:
    hdr3 = f.read(HEADER_SIZE)
skidd_rec = struct.unpack_from("<H", hdr3, 0x18)[0]
skidd_slots = (os.path.getsize(SKIDD_PATH) - HEADER_SIZE) // skidd_rec

tail_start = max(0, skidd_slots - 200)
non_empty = []
with open(SKIDD_PATH, "rb") as f:
    f.seek(HEADER_SIZE + tail_start * skidd_rec)
    for si in range(tail_start, skidd_slots):
        rec = f.read(skidd_rec)
        if rec and not all(b == 0x00 for b in rec[:8]) and not all(b == 0xFF for b in rec[:4]):
            ascii_codes = [m.group().decode() for m in re.finditer(rb'[0-9]{3,6}', rec) if 3 <= len(m.group()) <= 6]
            if ascii_codes:
                non_empty.append((si, ascii_codes[:5]))

print(f"末尾200スロットで非空: {len(non_empty)} スロット")
for si, codes in non_empty[:10]:
    print(f"  slot {si}: codes={codes}")
