"""
SKIDD.DAT フィールドオフセット特定
既知データ:
  得意先: 161210 (ハシモト)
  商品1: 00510 白笹鼓純米吟醸 720ml
  商品2: 00810 冷や酒 300ml
  取引種別: 500

1. SHSYO.MST から 510/810 の単価を取得
2. SKIDD.DAT 全スロットから 161210 + 510 or 810 を探す
3. 発見スロットを徹底解析してフィールドオフセットを確定
"""
import struct, re

SKIDD_PATH = "Z:/sk/dat/SKIDD.DAT"
SHSYO_PATH = "Z:/sh/mst/SHSYO.MST"
REC_MARKER = b"\x09\x2e\x38\x09"
HEADER_SIZE = 0x200

# ── 1. SHSYO.MST から対象商品の価格取得 ──────────────────────────────
target_codes = {"510", "00510", "810", "00810", "510", "810"}
norm_targets = {"510", "810"}
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
        products[norm] = {"code": code, "name": name, "purchase": purchase,
                          "sale": sale, "list": list_p}
    pos = m + 1

print("=== SHSYO.MST 商品データ ===")
for k, v in sorted(products.items()):
    print(f"  {k} ({v['code']}): {v['name']}")
    print(f"       purchase={v['purchase']:.2f}  sale={v['sale']:.2f}  list={v['list']:.2f}")

# ── 2. SKIDD.DAT をフルスキャン ──────────────────────────────────────
with open(SKIDD_PATH, "rb") as f:
    header = f.read(HEADER_SIZE)
rec_size = struct.unpack_from("<H", header, 0x18)[0]
print(f"\nSKIDD: rec_size={rec_size}")

# 検索パターン
CUST = b"161210"
PROD_510 = [b"00510", b"  510", b"510"]
PROD_810 = [b"00810", b"  810", b"810"]
# 伝票番号 181337 (ASCII + int32 LE)
DENPYO_ASCII = b"181337"
DENPYO_INT32 = struct.pack("<I", 181337)  # D9 C3 02 00
DENPYO_INT32B = struct.pack(">I", 181337) # 00 02 C3 D9

hits = []  # (slot, offset_cust, offset_prod, prod_norm)

with open(SKIDD_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    slot_i = 0
    while True:
        rec = f.read(rec_size)
        if not rec or len(rec) < rec_size:
            break
        # 先頭が全0 or 全FFのスロットは B-tree ページ
        if all(b == 0x00 for b in rec[:8]) or all(b == 0xFF for b in rec[:4]):
            slot_i += 1
            continue

        # 伝票番号で探す（最優先）
        denpyo_found = False
        for dpat in [DENPYO_ASCII, DENPYO_INT32, DENPYO_INT32B]:
            idx = rec.find(dpat)
            if idx >= 0:
                denpyo_found = True
                hits.append((slot_i, -1, -1, f"denpyo@{idx}(pat={dpat.hex()})", rec[:]))
                break

        # 得意先コードを探す
        if not denpyo_found:
            p = 0
            while True:
                idx = rec.find(CUST, p)
                if idx < 0:
                    break
                for pats, norm in [(PROD_510, "510"), (PROD_810, "810")]:
                    for pat in pats:
                        pp = rec.find(pat)
                        if pp >= 0:
                            hits.append((slot_i, idx, pp, norm, rec[:]))
                p = idx + 1
        slot_i += 1

print(f"\n=== 検索結果: {len(hits)} ヒット ===")

# ── 3. ヒットスロットの詳細解析 ──────────────────────────────────────
def scan_doubles(rec, target_values, tol=0.05):
    found = []
    for off in range(0, len(rec)-7):
        v = struct.unpack_from("<d", rec, off)[0]
        for label, ev in target_values.items():
            if ev > 10 and abs(v - ev) / ev < tol:
                found.append((off, label, v))
    return found

def scan_ints(rec, target_values):
    found = []
    for off in range(0, len(rec)-3):
        v32 = struct.unpack_from("<I", rec, off)[0]
        v16 = struct.unpack_from("<H", rec, off)[0]
        for label, ev in target_values.items():
            if ev == v32:
                found.append((off, label, "int32", v32))
            if 0 < ev < 65536 and ev == v16:
                found.append((off, label, "int16", v16))
    return found

def scan_dates(rec):
    candidates = []
    for off in range(0, len(rec)-3):
        # yyyymmdd int32 LE
        v = struct.unpack_from("<I", rec, off)[0]
        if 20240101 <= v <= 20270101:
            y,m,d = v//10000,(v//100)%100,v%100
            if 1<=m<=12 and 1<=d<=31:
                candidates.append((off, f"{y}-{m:02d}-{d:02d}", "yyyymmdd_LE"))
        # Reiwa era BCD: byte[era=08] [yy] [mm] [dd]
        if off+3 < len(rec):
            e,y,m,d = rec[off],rec[off+1],rec[off+2],rec[off+3]
            if e==8 and 1<=y<=10 and 1<=m<=12 and 1<=d<=31:
                candidates.append((off, f"R{y}-{m:02d}-{d:02d}", "reiwa_bcd"))
        # days since 1900 (Magic epoch) int32 LE
        # 2026-04-28 = days from 1900-01-01
        import datetime
        try:
            if 44000 <= v <= 47000:
                dt = datetime.date(1900,1,1) + datetime.timedelta(days=v)
                candidates.append((off, str(dt), "days_1900_LE"))
        except:
            pass
        # int16 days
        v16 = struct.unpack_from("<H", rec, off)[0]
        if 44000 <= v16 <= 47000:
            try:
                dt = datetime.date(1900,1,1) + datetime.timedelta(days=v16)
                candidates.append((off, str(dt), "days_1900_LE16"))
            except:
                pass
    # deduplicate by offset
    seen = set()
    out = []
    for c in candidates:
        if c[0] not in seen:
            seen.add(c[0])
            out.append(c)
    return out

already_shown = set()
for slot_i, off_cust, off_prod, norm, rec in hits:
    if slot_i in already_shown:
        continue
    already_shown.add(slot_i)

    print(f"\n{'='*60}")
    print(f"スロット {slot_i}  得意先@{off_cust}  商品{norm}@{off_prod}")
    print(f"  得意先: {rec[off_cust:off_cust+6].decode('ascii','replace')}")
    prod_off = off_prod
    print(f"  商品  : {rec[prod_off:prod_off+5].decode('ascii','replace')}")

    # ヘックスダンプ (先頭200バイト)
    print(f"\n  先頭200バイトのダンプ:")
    for row in range(0, min(200, rec_size), 16):
        hex_part = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(16))
        chr_part = "".join(chr(rec[row+j]) if 32<=rec[row+j]<=126 else '.' for j in range(16) if row+j < len(rec))
        print(f"    {row:3d}: {hex_part}  {chr_part}")

    # 価格マッチング
    price_targets = {}
    for n, p in products.items():
        for k2, v2 in [("sale", p["sale"]), ("purchase", p["purchase"]), ("list", p["list"])]:
            if v2 > 0:
                price_targets[f"{n}_{k2}"] = v2
    print(f"\n  価格候補 (double): {price_targets}")
    dbls = scan_doubles(rec, price_targets)
    if dbls:
        for off, label, val in dbls:
            print(f"    double@{off}: {label}={val:.2f}")
    else:
        print("    (doubleマッチなし)")

    # 整数マッチ
    int_targets = {k: int(v) for k, v in price_targets.items() if v == int(v)}
    int_targets["qty_guess_1"] = 1
    int_targets["qty_guess_6"] = 6
    int_targets["qty_guess_12"] = 12
    ints = scan_ints(rec, int_targets)
    for off, label, typ, val in ints[:15]:
        print(f"    {typ}@{off}: {label}={val}")

    # 日付マッチ
    dates = scan_dates(rec)
    if dates:
        print(f"\n  日付候補:")
        for off, val, kind in dates[:15]:
            print(f"    @{off}: {val} ({kind})")

    # CP932テキスト抽出
    print(f"\n  CP932テキスト:")
    try:
        text = rec.decode("cp932", errors="replace")
        words = []
        i2 = 0
        while i2 < len(text):
            start = i2
            while i2 < len(text) and text[i2] not in ('\ufffd', '\x00') and text[i2].isprintable():
                i2 += 1
            segment = text[start:i2].strip()
            if len(segment) >= 2:
                words.append((start, segment))
            i2 += 1
        for byte_pos, word in words[:30]:
            print(f"    [{byte_pos}] {word!r}")
    except:
        pass

print("\n=== 同スロット内の他商品コードも確認 ===")
for slot_i, off_cust, off_prod, norm, rec in hits[:3]:
    print(f"\nスロット {slot_i} - 全ASCIIコード列:")
    import re as re2
    for m in re2.finditer(rb'[0-9]{3,8}', rec):
        v = m.group().decode()
        # 商品コードらしい3-6桁
        if 3 <= len(v) <= 6:
            print(f"  offset={m.start():3d}: {v}")
