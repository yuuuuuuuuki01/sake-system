"""
SKIDD.DAT field offset calibration — アプローチ4
SKIDO.DAT の日付インデックスから今後の受注スロットを特定し、
SKIDD レコードの構造を徹底解析する。

手順:
1. SHSYO.MST から SKIDDに出現する商品コード(100-220, 500+)の価格取得
2. SKIDO.DAT を全スキャンして Reiwa 8+ (2026+) の日付エントリを収集
3. 各 SKIDO エントリから SKIDD スロット番号を特定
4. SKIDD スロットの ASCII 商品コード位置・間隔を分析
5. SKIDD スロット内で価格(double)・数量(int32/int16)・日付の候補を特定
"""
import struct, re

SKIDD_PATH = "Z:/sk/dat/SKIDD.DAT"
SKIDO_PATH = "Z:/sk/dat/SKIDO.DAT"
SHSYO_PATH = "Z:/sh/mst/SHSYO.MST"
REC_MARKER = b"\x09\x2e\x38\x09"
HEADER_SIZE = 0x200

# ── 1. SHSYO.MST 商品データ取得 (SK モジュール全コード) ──────────────────────
# SKIDD に出現する商品コード範囲を広めに取る
norm_targets = set()
for i in range(100, 250):
    norm_targets.add(str(i))
for i in range(400, 900):
    norm_targets.add(str(i))

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
        short_raw = raw[ds+17:ds+43]
        short_name = short_raw.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
        if ds + 114 <= len(raw):
            purchase = struct.unpack_from("<d", raw, ds+90)[0]
            sale     = struct.unpack_from("<d", raw, ds+98)[0]
            list_p   = struct.unpack_from("<d", raw, ds+106)[0]
        else:
            purchase = sale = list_p = 0.0
        products[norm] = {
            "code": code,
            "name": name or short_name,
            "purchase": purchase,
            "sale": sale,
            "list": list_p,
        }
    pos = m + 1

print(f"=== SHSYO.MST: {len(products)} 商品 ===")
for k in sorted(products, key=lambda x: int(x) if x.isdigit() else 9999)[:30]:
    v = products[k]
    safe_name = v['name'][:20].encode('cp932', errors='replace').decode('cp932', errors='replace')
    print(f"  {k:5s} {safe_name:20s}  sale={v['sale']:.0f}  purchase={v['purchase']:.0f}")

# ── 2. SKIDD.DAT ヘッダ確認 ──────────────────────────────────────────────────
with open(SKIDD_PATH, "rb") as f:
    hdr = f.read(HEADER_SIZE)
skidd_rec = struct.unpack_from("<H", hdr, 0x18)[0]
print(f"\nSKIDD rec_size={skidd_rec}")

# ── 3. SKIDO.DAT 全スキャン → 未来日付エントリ収集 ──────────────────────────
with open(SKIDO_PATH, "rb") as f:
    hdr2 = f.read(HEADER_SIZE)
skido_rec = struct.unpack_from("<H", hdr2, 0x18)[0]
print(f"SKIDO rec_size={skido_rec}")

future_entries = []   # (skido_slot, date_str, raw_bytes)
all_date_offsets = {}  # offset -> count

import os
skido_size = os.path.getsize(SKIDO_PATH)
total_skido_slots = (skido_size - HEADER_SIZE) // skido_rec
print(f"SKIDO total_slots={total_skido_slots}")

# Reiwa 8 = 2026, 9 = 2027, etc.
# Format at SKIDO slot 5084 off 220-221: 08 05 → Reiwa 8, May
# Check multiple date encodings

with open(SKIDO_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    for si in range(total_skido_slots):
        rec = f.read(skido_rec)
        if not rec or len(rec) < skido_rec:
            break
        # Skip B-tree pages (all-zero or all-FF prefix)
        if all(b == 0x00 for b in rec[:8]) or all(b == 0xFF for b in rec[:4]):
            continue
        # Skip deleted records
        if rec[0] in (0x00, 0xFF, 0xFE):
            continue

        found_date = None
        # Check all offsets for Reiwa date patterns
        for off in range(0, min(skido_rec - 3, 300)):
            e = rec[off]
            y = rec[off+1]
            m = rec[off+2]
            d = rec[off+3] if off+3 < skido_rec else 0
            # Reiwa 8 or 9 (2026, 2027)
            if e == 8 and 1 <= y <= 12 and 1 <= m <= 12 and (d == 0 or 1 <= d <= 31):
                # year=Reiwa 8 = 2026, month=y, day=m?
                # OR era=8(Reiwa), year=y, month=m
                western_year = 2018 + y  # Reiwa 1 = 2019, Reiwa 8 = 2026
                if western_year >= 2026 and 1 <= m <= 12:
                    found_date = (off, f"R{y}-{m:02d}", "reiwa_ym")
                    all_date_offsets[off] = all_date_offsets.get(off, 0) + 1
                    break
            if e == 8 and 1 <= y <= 12 and 1 <= m <= 12 and 1 <= d <= 31:
                western_year = 2018 + y
                if western_year >= 2026:
                    found_date = (off, f"R{y}-{m:02d}-{d:02d}", "reiwa_ymd")
                    all_date_offsets[off] = all_date_offsets.get(off, 0) + 1
                    break
        # Also check yyyymmdd int32 LE for 2026+
        if not found_date:
            for off in range(0, min(skido_rec - 3, 300)):
                v = struct.unpack_from("<I", rec, off)[0]
                if 20260101 <= v <= 20271231:
                    y2, m2, d2 = v//10000, (v//100)%100, v%100
                    if 1<=m2<=12 and 1<=d2<=31:
                        found_date = (off, f"{y2}-{m2:02d}-{d2:02d}", "yyyymmdd_LE")
                        all_date_offsets[off] = all_date_offsets.get(off, 0) + 1
                        break

        if found_date:
            future_entries.append((si, found_date, bytes(rec)))

print(f"\nSKIDO 未来日付エントリ: {len(future_entries)} 件")
print(f"日付オフセット分布: {sorted(all_date_offsets.items(), key=lambda x: -x[1])[:10]}")

# ── 4. SKIDO エントリから SKIDD スロット番号を抽出 ─────────────────────────────
# SKIDO エントリ内の int32/int16 値で SKIDD スロット範囲(0〜41228)に収まるものを探す
print("\n=== SKIDO→SKIDD スロットポインタ候補 ===")
skidd_slot_hits = []   # (skido_slot, date_str, skidd_slot_candidate, pointer_offset)

for si, (date_off, date_str, kind), rec in future_entries[:200]:
    # Search for int32 LE values in reasonable SKIDD slot range
    for off in range(0, len(rec) - 3):
        v32 = struct.unpack_from("<I", rec, off)[0]
        if 1 <= v32 <= 50000:
            skidd_slot_hits.append((si, date_str, v32, off))
    # int16 as well
    for off in range(0, len(rec) - 1):
        v16 = struct.unpack_from("<H", rec, off)[0]
        if 100 <= v16 <= 50000:
            # int16 hits are noisy, only store unique
            pass

# Show first 20 SKIDO future entries with context
print(f"\n最初の20件の未来日付 SKIDO スロット:")
shown = set()
for si, (date_off, date_str, kind), rec in future_entries[:20]:
    if si in shown:
        continue
    shown.add(si)
    print(f"\n  SKIDO slot {si}: {date_str} ({kind}) @ off={date_off}")
    # Hex dump around date
    start = max(0, date_off - 8)
    end = min(len(rec), date_off + 24)
    hx = " ".join(f"{rec[i]:02x}" for i in range(start, end))
    ch = "".join(chr(rec[i]) if 32 <= rec[i] <= 126 else '.' for i in range(start, end))
    print(f"    [{start}-{end}] {hx}  {ch}")
    # Find int32 values in SKIDD slot range near date offset
    print(f"    int32 candidates (slot range 1-50000):")
    for off in range(max(0, date_off-32), min(len(rec)-3, date_off+64)):
        v = struct.unpack_from("<I", rec, off)[0]
        if 1 <= v <= 50000:
            print(f"      off={off}: {v}")
    # Also show CP932 text
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
        for bp, seg in segs[:10]:
            print(f"    text[{bp}]: {seg!r}")
    except:
        pass

# ── 5. SKIDO 内 RECORD_MARKER 位置のポインタ分析 ─────────────────────────────
print("\n=== SKIDO RECORD_MARKER 周辺のポインタ ===")
marker_pointer_offsets = {}
for si, (date_off, date_str, kind), rec in future_entries[:100]:
    m_pos = rec.find(REC_MARKER)
    if m_pos >= 0:
        # After marker: usually 4 bytes are the slot/page pointer
        if m_pos + 8 <= len(rec):
            v = struct.unpack_from("<I", rec, m_pos + 4)[0]
            marker_pointer_offsets[m_pos + 4] = marker_pointer_offsets.get(m_pos + 4, 0) + 1
            if 1 <= v <= 50000:
                print(f"  SKIDO slot {si}: MARKER@{m_pos}, pointer@{m_pos+4}={v} (date={date_str})")

# ── 6. 確定した SKIDD スロットを詳細解析 ─────────────────────────────────────
# RECORD_MARKER の後の int32 が SKIDD スロット番号と仮定してダンプ
print("\n=== SKIDD スロット詳細解析 ===")

def read_skidd_slot(slot_num):
    with open(SKIDD_PATH, "rb") as f:
        f.seek(HEADER_SIZE + slot_num * skidd_rec)
        return f.read(skidd_rec)

def find_ascii_product_codes(rec):
    """3〜6桁の数字列で、商品マスタに存在するコードを探す"""
    found = []
    for m2 in re.finditer(rb'[0-9]{3,6}', rec):
        v = m2.group().decode()
        norm = v.lstrip("0") or "0"
        if norm in products:
            found.append((m2.start(), norm, products[norm]["name"][:15]))
    return found

def scan_doubles_for_products(rec, prod_codes_found):
    """発見商品コードの価格に近い double 値を探す"""
    price_map = {}
    for _, norm, _ in prod_codes_found:
        p = products[norm]
        for k, v in [("sale", p["sale"]), ("purchase", p["purchase"]), ("list", p["list"])]:
            if v > 0:
                price_map[f"{norm}_{k}"] = v
    found = []
    for off in range(0, len(rec) - 7):
        v = struct.unpack_from("<d", rec, off)[0]
        for label, ev in price_map.items():
            if ev > 10 and abs(v - ev) / ev < 0.02:
                found.append((off, label, v))
    return found

def scan_int32_for_products(rec, prod_codes_found):
    """合計金額(整数)の候補を探す"""
    # qtys to check: 1, 2, 3, 6, 10, 12, 15, 20, 24
    candidates = []
    for norm, _, _ in [(n, None, None) for _, n, _ in prod_codes_found]:
        p = products.get(norm, {})
        for q in [1, 2, 3, 6, 10, 12, 15, 20, 24]:
            for price_key in ["sale", "purchase", "list"]:
                price = p.get(price_key, 0)
                if price > 0:
                    total = int(price * q)
                    if total > 100:
                        candidates.append((total, f"{norm}×{q}×{price_key}"))
    found = []
    for off in range(0, len(rec) - 3):
        v32 = struct.unpack_from("<I", rec, off)[0]
        v16 = struct.unpack_from("<H", rec, off)[0]
        for total, label in candidates:
            if v32 == total:
                found.append((off, label, "int32", total))
            if total < 65536 and v16 == total:
                found.append((off, label, "int16", total))
    return found

# 最初のいくつかの SKIDO 未来エントリに対応する SKIDD スロットを試す
# まず RECORD_MARKER 後の int32 ポインタ方式でチェック
target_skidd_slots = set()
for si, (date_off, date_str, kind), rec in future_entries[:500]:
    m_pos = rec.find(REC_MARKER)
    if m_pos >= 0 and m_pos + 8 <= len(rec):
        v = struct.unpack_from("<I", rec, m_pos + 4)[0]
        if 100 <= v <= 50000:
            target_skidd_slots.add(v)

print(f"SKIDD ターゲットスロット候補: {len(target_skidd_slots)} 個")
print(f"  先頭20: {sorted(target_skidd_slots)[:20]}")

# 各 SKIDD スロットを解析
analyzed = 0
for slot_num in sorted(target_skidd_slots)[:15]:
    try:
        rec = read_skidd_slot(slot_num)
    except:
        continue
    if all(b == 0x00 for b in rec[:8]):
        continue

    prod_found = find_ascii_product_codes(rec)
    if not prod_found:
        continue

    print(f"\n{'='*60}")
    print(f"SKIDD slot {slot_num}  商品コード: {[(off, code) for off, code, _ in prod_found]}")

    # ヘックスダンプ (全体)
    print(f"  全体ダンプ ({skidd_rec}バイト):")
    for row in range(0, skidd_rec, 16):
        hexpart = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(16))
        chrpart = "".join(chr(rec[row+j]) if 32 <= rec[row+j] <= 126 else '.' for j in range(16) if row+j < len(rec))
        print(f"    {row:3d}: {hexpart}  {chrpart}")

    # 価格 double
    dbls = scan_doubles_for_products(rec, prod_found)
    if dbls:
        print(f"  価格 double マッチ:")
        for off, label, val in dbls:
            print(f"    off={off}: {label}={val:.2f}")

    # 合計 int
    ints = scan_int32_for_products(rec, prod_found)
    if ints:
        print(f"  合計 int マッチ:")
        for off, label, typ, val in ints[:10]:
            print(f"    off={off}: {label} ({typ})={val}")

    # 日付候補
    print(f"  日付候補:")
    for off in range(0, len(rec) - 3):
        e, y, m2, d = rec[off], rec[off+1], rec[off+2], (rec[off+3] if off+3 < len(rec) else 0)
        if e == 8 and 1 <= y <= 12 and 1 <= m2 <= 12:
            print(f"    off={off}: Reiwa {y}-{m2:02d} (era_ym)")
        v32 = struct.unpack_from("<I", rec, off)[0]
        if 20250101 <= v32 <= 20271231:
            y2, m3, d2 = v32//10000, (v32//100)%100, v32%100
            if 1<=m3<=12 and 1<=d2<=31:
                print(f"    off={off}: {y2}-{m3:02d}-{d2:02d} (yyyymmdd_LE)")
        # OADate (days since 1899-12-30)
        if off + 7 < len(rec):
            oa = struct.unpack_from("<d", rec, off)[0]
            if 45000 <= oa <= 48000:
                import datetime
                try:
                    dt = datetime.date(1899, 12, 30) + datetime.timedelta(days=oa)
                    if dt.year >= 2025:
                        print(f"    off={off}: {dt} (OADate_LE={oa:.1f})")
                except:
                    pass

    # CP932 テキスト
    print(f"  CP932テキスト:")
    try:
        text = rec.decode("cp932", errors="replace")
        i2 = 0
        while i2 < len(text):
            s = i2
            while i2 < len(text) and text[i2] not in ('\ufffd', '\x00') and text[i2].isprintable():
                i2 += 1
            seg = text[s:i2].strip()
            if len(seg) >= 2:
                print(f"    [{s}] {seg!r}")
            i2 += 1
    except:
        pass

    analyzed += 1
    if analyzed >= 10:
        break

print(f"\n=== 解析完了: {analyzed} スロット ===")
