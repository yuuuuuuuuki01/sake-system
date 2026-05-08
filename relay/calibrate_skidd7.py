"""
SKIDO.DAT 受注抽出 — 確定した構造を使って全未来受注を取得

2種類のレコードが存在:
  Type A: MARKER@236, off0-219=zeros, off220=Reiwa年, off221=月 → 未来受注
          product@336, price_double@404 and @420, qty(int32)@368
  Type B: MARKER@138, off0-~120=zeros, data starts earlier → 別形式
          product@240-243, price_double@266 and @306, qty ASCII @361-363

今回:
  1. Type A レコードを確認・全スキャン
  2. Type B レコードを確認・全スキャン
  3. 日付・得意先・商品・数量・単価を抽出
  4. Reiwa 8年(2026) 4月以降の未来受注のみ出力
"""
import struct, re, os

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

def read_slot(rec_size, slot_num):
    with open(SKIDO_PATH, "rb") as f:
        f.seek(HEADER_SIZE + slot_num * rec_size)
        return f.read(rec_size)

# ── SHSYO.MST 商品マスタ ──────────────────────────────────────────────────────
products = {}
with open(SHSYO_PATH, "rb") as f:
    raw_shsyo = f.read()

pos = 0
while True:
    m = raw_shsyo.find(REC_MARKER, pos)
    if m < 0:
        break
    ds = m + 4
    if ds + 130 > len(raw_shsyo):
        break
    code = raw_shsyo[ds:ds+7].rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
    norm = code.lstrip("0") or "0"
    if norm.isdigit() and 100 <= int(norm) <= 900:
        name = raw_shsyo[ds+43:ds+75].rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
        if ds + 114 <= len(raw_shsyo):
            sale = struct.unpack_from("<d", raw_shsyo, ds+98)[0]
            purchase = struct.unpack_from("<d", raw_shsyo, ds+90)[0]
        else:
            sale = purchase = 0.0
        products[norm] = {"name": name[:25], "sale": sale, "purchase": purchase}
    pos = m + 1

print(f"商品マスタ: {len(products)} 商品")

# ── 既知スロット確認 (Type A: slot 5084) ─────────────────────────────────────
print("\n=== Type A: slot 5084 詳細確認 ===")
rec = read_slot(skido_rec, 5084)
print(f"  off 0-7:   {rec[0:8].hex()}")
print(f"  off 218-225: {rec[218:226].hex()}  (date @ 220-221: {rec[220]:02x} {rec[221]:02x})")
mk = rec.find(REC_MARKER)
print(f"  MARKER @ {mk}")
# Product at various offsets
for probe in [320, 328, 336, 344]:
    chunk = rec[probe:probe+12]
    ascii_part = "".join(chr(b) if 32 <= b <= 126 else '.' for b in chunk)
    print(f"  off {probe}: {chunk.hex()}  [{ascii_part}]")
# Doubles at 404 and 420
for off in [364, 372, 380, 388, 396, 404, 412, 420, 428]:
    v = struct.unpack_from("<d", rec, off)[0]
    print(f"  double@{off}: {v:.4f}")
# int32 around 368
for off in [360, 364, 368, 372, 376]:
    v = struct.unpack_from("<I", rec, off)[0]
    print(f"  int32@{off}: {v}")

# ── 既知スロット確認 (Type B: slot 2042) ─────────────────────────────────────
print("\n=== Type B: slot 2042 詳細確認 ===")
rec42 = read_slot(skido_rec, 2042)
mk42 = rec42.find(REC_MARKER)
print(f"  MARKER @ {mk42}")
print(f"  off 110-130: {rec42[110:130].hex()}")
# Date before MARKER
for off in [118, 120, 122, 124, 126]:
    print(f"  off {off}: {rec42[off]:02x} {rec42[off+1]:02x}")
# Product around 240
for probe in [240, 244, 248]:
    chunk = rec42[probe:probe+12]
    ascii_part = "".join(chr(b) if 32 <= b <= 126 else '.' for b in chunk)
    print(f"  off {probe}: {chunk.hex()}  [{ascii_part}]")
# Doubles
for off in [258, 266, 274, 282, 290, 298, 306, 314, 322]:
    v = struct.unpack_from("<d", rec42, off)[0]
    if 0.01 <= abs(v) < 10000000:
        print(f"  double@{off}: {v:.4f}")
# Quantity around 361
print(f"  off 358-366: {rec42[358:366].hex()}  [{rec42[358:366].decode('ascii','replace')}]")
# int32 for quantity
for off in [216, 220, 224, 228]:
    v = struct.unpack_from("<I", rec42, off)[0]
    if v < 10000:
        print(f"  int32@{off}: {v}")

# ── 全スキャン: Type A レコード (first 219 bytes ≒ zeros, MARKER@236) ─────────
print("\n=== Type A スキャン: 全スロット ===")
typeA_records = []
typeB_records = []
other_records = []

with open(SKIDO_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    for si in range(skido_slots):
        rec = f.read(skido_rec)
        if not rec or len(rec) < skido_rec:
            break

        # Check for MARKER
        mk_pos = rec.find(REC_MARKER)
        if mk_pos < 0:
            continue

        # Type A: MARKER at ~236, first 210+ bytes nearly all zeros
        if 230 <= mk_pos <= 242:
            # Check first 208 bytes are mostly zeros
            zeros_in_first208 = sum(1 for b in rec[:208] if b == 0)
            if zeros_in_first208 >= 200:
                # Extract date
                ry = rec[220]  # Reiwa year
                mo = rec[221]  # Month
                if 1 <= ry <= 20 and 1 <= mo <= 12:
                    typeA_records.append((si, ry, mo, bytes(rec)))

        # Type B: MARKER at ~138
        elif 130 <= mk_pos <= 145:
            zeros_in_first110 = sum(1 for b in rec[:110] if b == 0)
            if zeros_in_first110 >= 100:
                typeB_records.append((si, mk_pos, bytes(rec)))

print(f"Type A: {len(typeA_records)} レコード")
print(f"Type B: {len(typeB_records)} レコード")

# ── Type A の日付分布 ──────────────────────────────────────────────────────────
from collections import Counter
dateA = Counter((ry, mo) for _, ry, mo, _ in typeA_records)
print(f"\nType A 日付分布:")
for (ry, mo), cnt in sorted(dateA.items()):
    yr = 2018 + ry
    future = " ← 未来" if (ry > 8 or (ry == 8 and mo >= 4)) else ""
    print(f"  Reiwa{ry} ({yr})-{mo:02d}: {cnt} 件{future}")

# ── Type A: Reiwa 8 4月以降の未来受注を抽出 ──────────────────────────────────
print("\n=== Type A 未来受注 (Reiwa 8 April 2026 以降) ===")

def extract_typeA(si, ry, mo, rec):
    """Type A レコードから受注情報を抽出"""
    year = 2018 + ry
    # Product at off 336 (approx)
    product_code = ""
    product_name = ""
    for off in range(330, 350):
        chunk = rec[off:off+4]
        if chunk[:3].isdigit():
            code = chunk[:3].decode("ascii")
            product_code = code
            # CP932 name follows
            name_bytes = rec[off+3:off+25]
            try:
                product_name = name_bytes.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
            except:
                product_name = ""
            break
        elif chunk[:4].isdigit() and not chunk[:5].isdigit():
            code = chunk[:4].decode("ascii")
            product_code = code
            name_bytes = rec[off+4:off+26]
            try:
                product_name = name_bytes.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
            except:
                product_name = ""
            break

    # Price doubles at off 404 and 420
    price1 = struct.unpack_from("<d", rec, 404)[0] if len(rec) >= 412 else 0.0
    price2 = struct.unpack_from("<d", rec, 420)[0] if len(rec) >= 428 else 0.0
    unit_price = price1 if abs(price1) > 0.01 else price2

    # Quantity: int32 at off 368
    qty = struct.unpack_from("<I", rec, 368)[0] if len(rec) >= 372 else 0
    if qty > 1000 or qty == 0:
        # Try other offsets
        for off in [360, 364, 372, 376]:
            v = struct.unpack_from("<I", rec, off)[0]
            if 1 <= v <= 999:
                qty = v
                break

    # Customer: look for CP932 text at off 256 area
    customer_name = ""
    try:
        # The "00 + CP932" pattern at off ~256-276
        chunk = rec[256:310]
        text = chunk.decode("cp932", errors="replace")
        # Extract readable segments
        segs = [s for s in text.replace('\x00', ' ').split() if len(s) >= 2]
        customer_name = " ".join(segs[:2])
    except:
        pass

    # The sequence/order at off 248
    seq = struct.unpack_from("<H", rec, 248)[0] if len(rec) >= 250 else 0

    # Total = qty × price
    total = qty * abs(unit_price) if qty > 0 and abs(unit_price) > 0 else 0

    return {
        "slot": si, "year": year, "month": mo, "reiwa_year": ry,
        "product_code": product_code.strip(), "product_name": product_name,
        "unit_price": unit_price, "qty": qty, "total": total,
        "customer": customer_name, "seq": seq,
    }

future_A = [(si, ry, mo, rec) for si, ry, mo, rec in typeA_records
            if ry > 8 or (ry == 8 and mo >= 4)]
print(f"未来 Type A: {len(future_A)} 件")

for si, ry, mo, rec in sorted(future_A, key=lambda x: (x[1], x[2]))[:30]:
    info = extract_typeA(si, ry, mo, rec)
    p = products.get(info["product_code"], {})
    master_sale = p.get("sale", 0)
    try:
        pname = info['product_name'][:15].encode('cp932', errors='replace').decode('cp932', errors='replace')
    except:
        pname = "?"
    print(f"  slot {si}: {info['year']}-{info['month']:02d}  "
          f"prod={info['product_code']} {pname}  "
          f"qty={info['qty']} price={info['unit_price']:.0f} total={info['total']:.0f}  "
          f"master_sale={master_sale:.0f}")

# ── Type B の詳細確認 ──────────────────────────────────────────────────────────
print("\n=== Type B 詳細 (先頭10件) ===")
for si, mk_pos, rec in typeB_records[:10]:
    # Date: bytes just before MARKER (at mk_pos - ~14 to mk_pos - ~10)
    # slot 2042: MARKER@138, date-like at off 122-123
    date_off = mk_pos - 16
    ry = rec[date_off] if date_off >= 0 else 0
    mo = rec[date_off+1] if date_off + 1 < len(rec) else 0

    # Product around off 240 (or mk_pos + 100)
    prod_off = mk_pos + 100  # approximate
    product_code = ""
    for off in range(prod_off - 10, prod_off + 20):
        chunk = rec[off:off+4]
        if 0 < off < len(rec) - 4 and chunk[:3].isdigit() and not chunk[3:4].isdigit():
            product_code = chunk[:3].decode("ascii")
            break

    # Price double at mk_pos + 128 (approx)
    price_off = mk_pos + 128
    price = struct.unpack_from("<d", rec, price_off)[0] if price_off + 8 <= len(rec) else 0.0

    # Order number or something at off mk_pos - 8
    seq = struct.unpack_from("<H", rec, mk_pos - 2)[0] if mk_pos >= 2 else 0

    print(f"  slot {si}: MARKER@{mk_pos}, date_off={date_off}: "
          f"{ry:02x} {mo:02x}, prod={product_code}, price@{price_off}={price:.4f}")
    # More context
    print(f"    off {date_off-4}..{date_off+8}: {rec[date_off-4:date_off+8].hex()}")
    # All reasonable doubles
    dbls = []
    for off in range(0, skido_rec - 7):
        v = struct.unpack_from("<d", rec, off)[0]
        if 10 <= abs(v) <= 100000 and not (v != v):
            dbls.append((off, v))
    print(f"    doubles: {dbls[:8]}")

# ── Type B の日付を特定 ────────────────────────────────────────────────────────
print("\n=== Type B 日付オフセット特定 ===")
# 複数スロットで一致するオフセットを探す
# Type B slot 2042 は MARKER@138、何かが off 122 に
# Type B slot 2043 は MARKER@138 と推定
for si, mk_pos, rec in typeB_records[:5]:
    print(f"\n  slot {si}: MARKER@{mk_pos}")
    # dump 100-145
    for row in range(100, min(155, skido_rec), 8):
        hexpart = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(8))
        chrpart = "".join(chr(rec[row+j]) if 32 <= rec[row+j] <= 126 else '.' for j in range(8) if row+j < len(rec))
        print(f"    {row:3d}: {hexpart}  {chrpart}")
    # Check which offset before MARKER has Reiwa-like date (byte1 <= 12, byte2 <= 12)
    for off in range(max(0, mk_pos-30), mk_pos):
        b1 = rec[off]
        b2 = rec[off+1] if off+1 < len(rec) else 0
        if 1 <= b1 <= 20 and 1 <= b2 <= 12:
            print(f"    date candidate @ off {off}: {b1} (Reiwa) / {b2} (month)")

# ── 全スキャンサマリー ────────────────────────────────────────────────────────
print(f"\n=== スキャンサマリー ===")
print(f"  Type A (MARKER@~236): {len(typeA_records)} 件")
print(f"    → 未来 (R8 Apr+): {len(future_A)} 件")
print(f"  Type B (MARKER@~138): {len(typeB_records)} 件")
print(f"  Total meaningful: {len(typeA_records) + len(typeB_records)} 件")
