"""
SKIDO.DAT 未来受注 最終デコーダー

確定した構造:
  SIGNATURE = 44 00 00 00 03 80 01 00
  日付: sig_pos-4 = [Reiwa年][月][00][00]
  MARKER: sig_pos+12 (SIGNATURE 8byte + timestamp 4byte)

  MARKER後のデータ構造:
    MARKER+81 付近: qty (int32, 1-999)
    MARKER+105付近: product_code (ASCII 3-4桁)
    code+23: price1 (double)
    code+63: price2 (double)

目標:
  1. 86件の未来受注を全抽出
  2. 顧客コード/名称の特定
  3. 商品・数量・単価の抽出
  4. JSON/CSV出力
"""
import struct, re, os, json, datetime
from collections import Counter, defaultdict

SKIDO_PATH = "Z:/sk/dat/SKIDO.DAT"
SKIDD_PATH = "Z:/sk/dat/SKIDD.DAT"
SHSYO_PATH = "Z:/sh/mst/SHSYO.MST"
HEADER_SIZE = 0x200
REC_MARKER = b"\x09\x2e\x38\x09"
SIGNATURE  = b"\x44\x00\x00\x00\x03\x80\x01\x00"

# ── ファイル情報 ──────────────────────────────────────────────────────────────
with open(SKIDO_PATH, "rb") as f:
    hdr = f.read(HEADER_SIZE)
skido_rec  = struct.unpack_from("<H", hdr, 0x18)[0]
skido_size = os.path.getsize(SKIDO_PATH)
skido_slots = (skido_size - HEADER_SIZE) // skido_rec
print(f"SKIDO: rec={skido_rec}, slots={skido_slots}")

# ── SHSYO.MST 商品マスタ（参照用） ───────────────────────────────────────────
products = {}
try:
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
                sale     = struct.unpack_from("<d", raw_shsyo, ds+98)[0]
                purchase = struct.unpack_from("<d", raw_shsyo, ds+90)[0]
            else:
                sale = purchase = 0.0
            products[norm] = {"name": name, "sale": sale, "purchase": purchase}
        pos = m + 1
    print(f"SHSYO商品マスタ: {len(products)} 件")
except Exception as e:
    print(f"SHSYO読み込みエラー: {e}")

# ── 全スロットスキャン: SIGNATUREで全Type A未来受注を収集 ─────────────────────
print("\n=== SKIDO 全スキャン ===")
future_records = []  # (slot, sig_pos, mk_pos, ry, mo, rec)

with open(SKIDO_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    for si in range(skido_slots):
        rec = f.read(skido_rec)
        if not rec or len(rec) < skido_rec:
            break

        sig_pos = rec.find(SIGNATURE)
        if sig_pos < 4:
            continue

        date_bytes = rec[sig_pos-4:sig_pos]
        ry = date_bytes[0]
        mo = date_bytes[1]
        is_type_a = (1 <= ry <= 20 and 1 <= mo <= 12
                     and date_bytes[2] == 0 and date_bytes[3] == 0)
        if not is_type_a:
            continue

        # 未来 = Reiwa 8 April 2026 以降
        if not (ry > 8 or (ry == 8 and mo >= 4)):
            continue

        mk_pos = rec.find(REC_MARKER)
        future_records.append((si, sig_pos, mk_pos, ry, mo, bytes(rec)))

print(f"未来 Type A レコード: {len(future_records)} 件")

# ── ヘルパー: double値が価格らしいか ─────────────────────────────────────────
def is_price(v):
    return (not (v != v)) and (1.0 <= abs(v) <= 200000.0) and (v != 8.4)

def is_qty(v):
    return 1 <= v <= 9999

# ── 全未来受注の詳細解析 ─────────────────────────────────────────────────────
print("\n=== 未来受注 詳細解析 ===")
print("=" * 100)

orders = []

for si, sig_pos, mk_pos, ry, mo, rec in sorted(future_records, key=lambda x: (x[3], x[4])):
    year = 2018 + ry
    print(f"\n─── slot {si}: {year}-{mo:02d} (Reiwa {ry})  sig@{sig_pos}  MARKER@{mk_pos} ───")

    # ── 全体ダンプ ────────────────────────────────────────────────────────────
    print(f"  [全体ダンプ]")
    for row in range(0, skido_rec, 16):
        hexpart = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(16))
        chrpart = "".join(
            chr(rec[row+j]) if 32 <= rec[row+j] <= 126 else '.'
            for j in range(16) if row+j < len(rec)
        )
        print(f"    {row:3d}: {hexpart}  {chrpart}")

    # ── CP932テキストセグメント ───────────────────────────────────────────────
    print(f"  [CP932テキスト]")
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
        for bp, seg in segs[:25]:
            print(f"    [{bp:3d}] {seg!r}")
    except Exception as e:
        print(f"    ERROR: {e}")

    # ── 商品コード: MARKER後のASCII数字 ───────────────────────────────────────
    print(f"  [商品コード候補]")
    codes_found = []
    search_start = mk_pos if mk_pos >= 0 else sig_pos + 12
    for off in range(search_start, skido_rec - 4):
        chunk = rec[off:off+5]
        # 4桁コード
        if chunk[:4].isdigit() and (off+4 >= skido_rec or not rec[off+4:off+5].isdigit()):
            code = chunk[:4].decode("ascii")
            codes_found.append((off, code, 4))
        # 3桁コード
        elif chunk[:3].isdigit() and (off+3 >= skido_rec or not rec[off+3:off+4].isdigit()):
            code = chunk[:3].decode("ascii")
            codes_found.append((off, code, 3))
    print(f"    {codes_found[:15]}")

    # ── 価格double値 ──────────────────────────────────────────────────────────
    print(f"  [価格double候補]")
    price_doubles = []
    for off in range(0, skido_rec - 7):
        v = struct.unpack_from("<d", rec, off)[0]
        if is_price(v):
            # 商品マスタとの照合
            matches = []
            for cd, _, clen in codes_found:
                code_str = rec[cd:cd+clen].decode("ascii")
                p = products.get(code_str.lstrip("0") or "0", {})
                for k, pv in [("sale", p.get("sale",0)), ("purchase", p.get("purchase",0))]:
                    if pv > 1 and abs(v - pv) / pv < 0.05:
                        matches.append(f"{code_str}_{k}={pv:.0f}")
            match_str = " ← " + " ".join(matches) if matches else ""
            print(f"    off={off:3d}: {v:>12.2f}{match_str}")
            price_doubles.append((off, v))

    # ── int32 数量候補 ────────────────────────────────────────────────────────
    print(f"  [数量int32候補 1-9999]")
    qty_candidates = []
    for off in range(0, skido_rec - 3):
        v = struct.unpack_from("<I", rec, off)[0]
        if is_qty(v):
            qty_candidates.append((off, v))
    print(f"    {qty_candidates[:20]}")

    # ── MARKER後のオフセット相対解析 ──────────────────────────────────────────
    if mk_pos >= 0:
        print(f"  [MARKER後: +70〜+160 ダンプ]")
        start = mk_pos + 70
        end   = min(mk_pos + 200, skido_rec)
        if start < skido_rec:
            for row in range(start, end, 16):
                hexpart = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(16))
                chrpart = "".join(
                    chr(rec[row+j]) if 32 <= rec[row+j] <= 126 else '.'
                    for j in range(16) if row+j < len(rec)
                )
                print(f"    MK+{row-mk_pos:3d} ({row:3d}): {hexpart}  {chrpart}")

    # ── 顧客コード特定試行: SIG前の領域 ──────────────────────────────────────
    print(f"  [SIG前データ (0〜sig_pos-4)]")
    pre_data = rec[:sig_pos-4]
    # int32値で顧客コードになりそうなもの (1〜9999)
    pre_ints = []
    for off in range(0, len(pre_data) - 3):
        v = struct.unpack_from("<I", pre_data, off)[0]
        if 1 <= v <= 9999:
            pre_ints.append((off, v))
    print(f"    int32(1-9999): {pre_ints[:20]}")
    # 非ゼロバイト位置
    nonzero = [(off, pre_data[off]) for off in range(len(pre_data)) if pre_data[off] != 0]
    print(f"    非ゼロバイト: {nonzero[:30]}")

print("\n" + "=" * 100)
print(f"解析完了: {len(future_records)} 件の未来受注")
