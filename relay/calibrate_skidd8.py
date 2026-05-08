"""
SKIDO.DAT 受注抽出 — シグネチャ検索方式

全レコードに共通するシグネチャ: 44 00 00 00 03 80 01 00
→ このシグネチャの直前4バイトに日付情報がある
→ Type A (未来受注): シグネチャ前4バイト = [Reiwa年][月][00][00]
→ Type B (過去受注): シグネチャ前4バイト = int32 (連番?)

Step:
1. 全スロットでシグネチャを検索
2. 日付フィールドを特定
3. Reiwa 8 April 2026 以降のレコードを抽出
4. 各レコードから: 日付・商品コード・数量・単価を取得
"""
import struct, re, os, datetime

SKIDO_PATH = "Z:/sk/dat/SKIDO.DAT"
SKIDD_PATH = "Z:/sk/dat/SKIDD.DAT"
SHSYO_PATH = "Z:/sh/mst/SHSYO.MST"
HEADER_SIZE = 0x200
REC_MARKER = b"\x09\x2e\x38\x09"
SIGNATURE   = b"\x44\x00\x00\x00\x03\x80\x01\x00"  # constant in all SKIDO records

with open(SKIDO_PATH, "rb") as f:
    hdr = f.read(HEADER_SIZE)
skido_rec = struct.unpack_from("<H", hdr, 0x18)[0]
skido_size = os.path.getsize(SKIDO_PATH)
skido_slots = (skido_size - HEADER_SIZE) // skido_rec
print(f"SKIDO: rec={skido_rec}, slots={skido_slots}")

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
        products[norm] = {"name": name, "sale": sale, "purchase": purchase}
    pos = m + 1
print(f"商品マスタ: {len(products)} 件")

# ── シグネチャ検索 ─────────────────────────────────────────────────────────────
print("\n=== SKIDO シグネチャ検索 ===")

today_reiwa = 8  # Reiwa 8 = 2026
today_month = 4  # April

all_records = []   # (slot, sig_offset, date_bytes, marker_offset, rec)
typeA_count = 0
typeB_count = 0
typeA_future = []

with open(SKIDO_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    for si in range(skido_slots):
        rec = f.read(skido_rec)
        if not rec or len(rec) < skido_rec:
            break

        sig_pos = rec.find(SIGNATURE)
        if sig_pos < 0:
            continue

        # Date bytes are 4 bytes before signature
        date_start = sig_pos - 4
        if date_start < 0:
            continue

        date_bytes = rec[date_start:date_start+4]

        # Type A: date_bytes[0] = Reiwa year (1-20), date_bytes[1] = month (1-12), bytes[2-3] = 0x00
        ry = date_bytes[0]
        mo = date_bytes[1]
        is_type_a = (1 <= ry <= 20 and 1 <= mo <= 12 and date_bytes[2] == 0 and date_bytes[3] == 0)

        # Type B: date_bytes is int32 LE (sequential number or alt date)
        int_date = struct.unpack_from("<I", date_bytes)[0]

        # MARKER offset
        mk_pos = rec.find(REC_MARKER)

        all_records.append((si, sig_pos, date_bytes, mk_pos, is_type_a, ry if is_type_a else 0, mo if is_type_a else 0, bytes(rec)))

        if is_type_a:
            typeA_count += 1
            year = 2018 + ry
            if ry > today_reiwa or (ry == today_reiwa and mo >= today_month):
                typeA_future.append((si, sig_pos, ry, mo, year, mk_pos, bytes(rec)))
        else:
            typeB_count += 1

print(f"シグネチャ発見レコード: {len(all_records)}")
print(f"  Type A (Reiwa年月形式): {typeA_count}")
print(f"  Type B (int32形式): {typeB_count}")
print(f"  Type A 未来 (R8 Apr+): {len(typeA_future)}")

# ── Type A 日付分布 ───────────────────────────────────────────────────────────
from collections import Counter
date_dist = Counter((ry, mo) for _, _, _, _, ta, ry, mo, _ in all_records if ta)
print(f"\nType A 日付分布:")
for (ry, mo), cnt in sorted(date_dist.items()):
    yr = 2018 + ry
    flag = " ← 今月以降" if (ry > 8 or (ry == 8 and mo >= 4)) else ""
    print(f"  R{ry} ({yr})-{mo:02d}: {cnt}件{flag}")

# ── Type B int_date 分布確認 ─────────────────────────────────────────────────
typeB_dates = sorted(set(struct.unpack_from("<I", rec[sig_pos-4:sig_pos])[0]
                         for si, sig_pos, db, mk_pos, ta, ry, mo, rec in all_records if not ta))
print(f"\nType B int_date: 最小={min(typeB_dates) if typeB_dates else 0}, 最大={max(typeB_dates) if typeB_dates else 0}")
print(f"  分布 (先頭20件): {typeB_dates[:20]}")

# Reiwa epoch: 2019-05-01
reiwa_epoch = datetime.date(2019, 5, 1)
today = datetime.date(2026, 4, 29)
days_from_reiwa_to_today = (today - reiwa_epoch).days

# OADate epoch: 1899-12-30
oa_epoch = datetime.date(1899, 12, 30)
today_oa = (today - oa_epoch).days

print(f"\n日付参照:")
print(f"  Reiwa元年から今日まで: {days_from_reiwa_to_today} 日")
print(f"  今日のOADate: {today_oa}")
print(f"  Type B の最大値 {max(typeB_dates) if typeB_dates else 0} がどの日付か:")
if typeB_dates:
    v = max(typeB_dates)
    try:
        dt_reiwa = reiwa_epoch + datetime.timedelta(days=v)
        dt_oa = oa_epoch + datetime.timedelta(days=v)
        print(f"    Reiwa epoch 換算: {dt_reiwa}")
        print(f"    OADate 換算: {dt_oa}")
    except:
        pass

# ── Type A 未来受注の詳細 ─────────────────────────────────────────────────────
print(f"\n=== Type A 未来受注 詳細 ===")
for si, sig_pos, ry, mo, year, mk_pos, rec in sorted(typeA_future, key=lambda x: (x[2], x[3])):
    print(f"\n  slot {si}: {year}-{mo:02d} (Reiwa {ry}), sig@{sig_pos}, MARKER@{mk_pos}")

    # Full dump
    print(f"  ダンプ:")
    for row in range(0, skido_rec, 16):
        hexpart = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(16))
        chrpart = "".join(chr(rec[row+j]) if 32 <= rec[row+j] <= 126 else '.' for j in range(16) if row+j < len(rec))
        print(f"    {row:3d}: {hexpart}  {chrpart}")

    # After MARKER: find product, qty, price
    # Product: ASCII 3-4 digit codes
    codes_found = []
    for off in range(mk_pos if mk_pos >= 0 else 0, skido_rec - 4):
        chunk = rec[off:off+4]
        if chunk[:3].isdigit() and not chunk[3:4].isdigit():
            code = chunk[:3].decode("ascii")
            codes_found.append((off, code))
        elif chunk[:4].isdigit() and (off + 4 >= skido_rec or not rec[off+4:off+5].isdigit()):
            code = chunk[:4].decode("ascii")
            codes_found.append((off, code))

    print(f"  ASCII数字コード: {codes_found[:10]}")

    # All doubles
    print(f"  価格double候補:")
    for off in range(0, skido_rec - 7):
        v = struct.unpack_from("<d", rec, off)[0]
        if 10 <= abs(v) <= 500000 and not (v != v):
            # Match product
            match = []
            for _, code in codes_found:
                p = products.get(code, {})
                for k, pv in [("sale", p.get("sale",0)), ("purchase", p.get("purchase",0))]:
                    if pv > 1 and abs(v - pv) / pv < 0.05:
                        match.append(f"{code}_{k}={pv:.0f}")
            print(f"    off={off:3d}: {v:.2f}  {' '.join(match)}")

    # int32 candidates for qty (1-999)
    print(f"  int32 qty候補 (1-999):")
    for off in range(0, skido_rec - 3):
        v = struct.unpack_from("<I", rec, off)[0]
        if 1 <= v <= 999:
            print(f"    off={off}: {v}")

    # Customer: CP932 text
    print(f"  CP932テキスト:")
    try:
        text = rec.decode("cp932", errors="replace")
        i2 = 0
        segs = []
        while i2 < len(text):
            s = i2
            while i2 < len(text) and text[i2] not in ('\ufffd', '\x00') and text[i2].isprintable():
                i2 += 1
            seg = text[s:i2].strip()
            if len(seg) >= 2:
                segs.append((s, seg))
            i2 += 1
        for bp, seg in segs[:20]:
            print(f"    [{bp}] {seg!r}")
    except:
        pass

# ── SKIDD.DAT も確認 ─────────────────────────────────────────────────────────
print("\n=== SKIDD.DAT シグネチャ検索 ===")
with open(SKIDD_PATH, "rb") as f:
    hdr2 = f.read(HEADER_SIZE)
skidd_rec = struct.unpack_from("<H", hdr2, 0x18)[0]
skidd_size = os.path.getsize(SKIDD_PATH)
skidd_slots = (skidd_size - HEADER_SIZE) // skidd_rec
print(f"SKIDD: rec={skidd_rec}, slots={skidd_slots}")

skidd_found = []
with open(SKIDD_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    for si in range(skidd_slots):
        rec = f.read(skidd_rec)
        if not rec or len(rec) < skidd_rec:
            break
        sig_pos = rec.find(SIGNATURE)
        if sig_pos < 0:
            continue
        date_start = sig_pos - 4
        if date_start < 0:
            continue
        date_bytes = rec[date_start:date_start+4]
        ry = date_bytes[0]
        mo = date_bytes[1]
        is_type_a = (1 <= ry <= 20 and 1 <= mo <= 12 and date_bytes[2] == 0 and date_bytes[3] == 0)
        if is_type_a:
            skidd_found.append((si, sig_pos, ry, mo, bytes(rec)))

print(f"SKIDD Type A シグネチャ: {len(skidd_found)}")
skidd_date_dist = Counter((ry, mo) for _, _, ry, mo, _ in skidd_found)
for (ry, mo), cnt in sorted(skidd_date_dist.items())[:20]:
    yr = 2018 + ry
    flag = " ← 今月以降" if (ry > 8 or (ry == 8 and mo >= 4)) else ""
    print(f"  R{ry} ({yr})-{mo:02d}: {cnt}件{flag}")
