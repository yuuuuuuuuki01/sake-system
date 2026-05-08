"""
SKIDD.DAT / SKIDO.DAT 解析 アプローチ5
- Reiwa 8年(2026) 以降の受注を特定
- SKIDO 内の日付エンコード方法を正確に把握
- SKIDD 末尾スロット（最新受注）を直接ダンプ

前回判明:
- SKIDO slot 5084 off 220-221: 08 05 → Reiwa 8, May 2026
  → byte[off]=Reiwa年(8=2026), byte[off+1]=月(5)
- SKIDO には RECORD_MARKER @ 236、product "400"、doubles @ 400-432
- SKIDD rec=487, SKIDO rec=447
"""
import struct, re, os

SKIDD_PATH = "Z:/sk/dat/SKIDD.DAT"
SKIDO_PATH = "Z:/sk/dat/SKIDO.DAT"
SHSYO_PATH = "Z:/sh/mst/SHSYO.MST"
HEADER_SIZE = 0x200
REC_MARKER = b"\x09\x2e\x38\x09"

# ── ファイルサイズ確認 ────────────────────────────────────────────────────────
def file_info(path, label):
    with open(path, "rb") as f:
        hdr = f.read(HEADER_SIZE)
    rec = struct.unpack_from("<H", hdr, 0x18)[0]
    sz = os.path.getsize(path)
    slots = (sz - HEADER_SIZE) // rec
    print(f"{label}: rec={rec}, slots={slots}, size={sz//1024}KB")
    return rec, slots

skidd_rec, skidd_slots = file_info(SKIDD_PATH, "SKIDD")
skido_rec, skido_slots = file_info(SKIDO_PATH, "SKIDO")

# ── SKIDD 末尾スロットを直接ダンプ（最新受注を探す） ──────────────────────────
print("\n=== SKIDD 末尾50スロットの商品コード出現 ===")

def read_slot(path, rec_size, slot_num):
    with open(path, "rb") as f:
        f.seek(HEADER_SIZE + slot_num * rec_size)
        return f.read(rec_size)

# ASCII 3-6桁数字コードを抽出
def find_codes(rec):
    hits = []
    for m in re.finditer(rb'[0-9]{3,6}', rec):
        v = m.group().decode()
        # 数字のみでゼロ除去して100-900の商品っぽい範囲
        norm = v.lstrip("0") or "0"
        if 100 <= int(norm) <= 900:
            hits.append((m.start(), v, norm))
    return hits

tail_start = max(0, skidd_slots - 100)
print(f"スロット {tail_start}〜{skidd_slots-1} を確認:")
slot_codes = {}
for si in range(tail_start, skidd_slots):
    rec = read_slot(SKIDD_PATH, skidd_rec, si)
    if all(b == 0x00 for b in rec[:8]) or all(b == 0xFF for b in rec[:4]):
        continue
    codes = find_codes(rec)
    if codes:
        slot_codes[si] = codes
        print(f"  slot {si}: {[(off, v) for off, v, n in codes[:8]]}")

# ── SKIDO を全スキャン、Reiwa 8+ の日付エントリを収集 ──────────────────────────
# エンコード: byte[off]=Reiwa年(8=2026), byte[off+1]=月(1-12)
# 2026年4月以降 = Reiwa 8年4月以降
print("\n=== SKIDO: Reiwa 8+ 日付エントリ収集 ===")

# まず既知スロット 5084 の構造を確認
print("\nSKIDO slot 5084 全体ダンプ:")
try:
    rec5084 = read_slot(SKIDO_PATH, skido_rec, 5084)
    for row in range(0, skido_rec, 16):
        hexpart = " ".join(f"{rec5084[row+j]:02x}" if row+j < len(rec5084) else "  " for j in range(16))
        chrpart = "".join(chr(rec5084[row+j]) if 32 <= rec5084[row+j] <= 126 else '.' for j in range(16) if row+j < len(rec5084))
        print(f"  {row:3d}: {hexpart}  {chrpart}")
except Exception as e:
    print(f"  ERROR: {e}")

# SKIDO 全スキャン
# Reiwa 8年以降 = byte=8..20, 次の byte=1..12
future_slots_found = []   # (skido_slot_i, offset, reiwa_year, month, raw)

BATCH = 10000
with open(SKIDO_PATH, "rb") as f:
    f.seek(HEADER_SIZE)
    for si in range(skido_slots):
        rec = f.read(skido_rec)
        if not rec or len(rec) < skido_rec:
            break
        # B-tree / deleted ページスキップ
        if all(b == 0x00 for b in rec[:8]) or all(b == 0xFF for b in rec[:4]):
            continue

        # Reiwa 年/月 パターン探索
        for off in range(0, min(300, skido_rec - 2)):
            ry = rec[off]      # Reiwa年
            mo = rec[off+1]    # 月
            if 8 <= ry <= 20 and 4 <= mo <= 12:
                # Reiwa 8年4月以降 (今月以降)
                # ただし ry=8 の場合は mo>=4
                if (ry == 8 and mo >= 4) or ry > 8:
                    future_slots_found.append((si, off, ry, mo, bytes(rec)))
                    break

print(f"\nSKIDO 未来日付エントリ: {len(future_slots_found)} 件")

# オフセット分布
from collections import Counter
offset_dist = Counter(off for _, off, _, _, _ in future_slots_found)
print(f"オフセット分布 top10: {offset_dist.most_common(10)}")
month_dist = Counter((ry, mo) for _, _, ry, mo, _ in future_slots_found)
print(f"年月分布 top20: {sorted(month_dist.most_common(20))}")

# ── 最も出現オフセットで SKIDO エントリ→SKIDD ポインタを特定 ─────────────────
if future_slots_found:
    most_common_off = offset_dist.most_common(1)[0][0]
    print(f"\n最多オフセット: {most_common_off}")

    # 先頭10件を詳細ダンプ
    count = 0
    skidd_candidates = []
    for si, off, ry, mo, rec in future_slots_found:
        if off != most_common_off:
            continue
        if count >= 10:
            break
        count += 1
        print(f"\n  SKIDO slot {si}: Reiwa{ry}-{mo:02d} @ off={off}")
        # 周辺ダンプ
        start = max(0, off - 16)
        end = min(len(rec), off + 32)
        hx = " ".join(f"{rec[i]:02x}" for i in range(start, end))
        ch = "".join(chr(rec[i]) if 32 <= rec[i] <= 126 else '.' for i in range(start, end))
        print(f"    [{start}-{end}] {hx}  {ch}")

        # RECORD_MARKER の位置
        mk_pos = rec.find(REC_MARKER)
        if mk_pos >= 0:
            print(f"    RECORD_MARKER @ off={mk_pos}")
            if mk_pos + 8 <= len(rec):
                v = struct.unpack_from("<I", rec, mk_pos + 4)[0]
                print(f"    Marker後int32 = {v}")
                if 1 <= v <= 100000:
                    skidd_candidates.append((si, v))
                    print(f"    → SKIDD slot候補: {v}")

        # int32 LE で SKIDD スロット範囲内の値
        print(f"    int32候補(1-100000):")
        for p in range(0, min(len(rec)-3, 300)):
            v = struct.unpack_from("<I", rec, p)[0]
            if 1 <= v <= 100000:
                print(f"      off={p}: {v}")

        # CP932テキスト
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
            for bp, seg in segs[:8]:
                print(f"    text[{bp}]: {seg!r}")
        except:
            pass

# ── SKIDO 既知スロット5084 周辺スロットも確認 ──────────────────────────────────
print("\n=== SKIDO スロット 5080-5090 ===")
for si in range(5080, 5091):
    try:
        rec = read_slot(SKIDO_PATH, skido_rec, si)
    except:
        continue
    if all(b == 0x00 for b in rec[:8]):
        print(f"  slot {si}: B-tree/empty")
        continue

    # 日付候補を探す
    date_candidates = []
    for off in range(0, min(300, skido_rec - 2)):
        ry = rec[off]
        mo = rec[off+1]
        if 1 <= ry <= 20 and 1 <= mo <= 12:
            date_candidates.append((off, ry, mo))

    # yyyymmdd
    for off in range(0, min(300, skido_rec - 3)):
        v = struct.unpack_from("<I", rec, off)[0]
        if 20230101 <= v <= 20271231:
            y2, m2, d2 = v//10000, (v//100)%100, v%100
            if 1<=m2<=12 and 1<=d2<=31:
                date_candidates.append((off, f"{y2}-{m2:02d}-{d2:02d}", "yyyymmdd"))

    # ASCII 数字
    ascii_codes = [(m.start(), m.group().decode()) for m in re.finditer(rb'[0-9]{3,6}', rec) if len(m.group()) >= 3]

    print(f"\n  slot {si}:")
    for off in range(0, skido_rec, 16):
        hexpart = " ".join(f"{rec[off+j]:02x}" if off+j < len(rec) else "  " for j in range(16))
        chrpart = "".join(chr(rec[off+j]) if 32 <= rec[off+j] <= 126 else '.' for j in range(16) if off+j < len(rec))
        print(f"    {off:3d}: {hexpart}  {chrpart}")

    mk_pos = rec.find(REC_MARKER)
    if mk_pos >= 0:
        print(f"    MARKER@{mk_pos}")
    if ascii_codes:
        print(f"    ASCII数字: {ascii_codes[:10]}")
    interesting_dates = [c for c in date_candidates if isinstance(c[1], int) and c[1] >= 7]
    if interesting_dates:
        print(f"    Reiwa日付候補: {interesting_dates[:10]}")

# ── SKIDD 特定スロットの徹底ダンプ ──────────────────────────────────────────
# slot_codes から商品コードが見つかったスロット3つをダンプ
print("\n=== SKIDD 最新スロット詳細ダンプ ===")
dump_count = 0
for si in sorted(slot_codes.keys(), reverse=True):
    if dump_count >= 3:
        break
    rec = read_slot(SKIDD_PATH, skidd_rec, si)
    codes = slot_codes[si]
    print(f"\nSKIDD slot {si}: codes={[(o, v) for o, v, n in codes]}")
    for row in range(0, skidd_rec, 16):
        hexpart = " ".join(f"{rec[row+j]:02x}" if row+j < len(rec) else "  " for j in range(16))
        chrpart = "".join(chr(rec[row+j]) if 32 <= rec[row+j] <= 126 else '.' for j in range(16) if row+j < len(rec))
        print(f"    {row:3d}: {hexpart}  {chrpart}")

    # 日付候補
    print("  日付候補:")
    for off in range(0, skidd_rec - 1):
        ry = rec[off]; mo = rec[off+1]
        if 6 <= ry <= 12 and 1 <= mo <= 12:
            print(f"    off={off}: Reiwa{ry}-{mo:02d}")
    for off in range(0, skidd_rec - 3):
        v = struct.unpack_from("<I", rec, off)[0]
        if 20230101 <= v <= 20271231:
            y2, m2, d2 = v//10000, (v//100)%100, v%100
            if 1<=m2<=12 and 1<=d2<=31:
                print(f"    off={off}: {y2}-{m2:02d}-{d2:02d} (yyyymmdd)")
        # OADate
        if off + 7 < skidd_rec:
            oa = struct.unpack_from("<d", rec, off)[0]
            if 44927 <= oa <= 47848:  # 2023-01-01 to 2030-12-31
                import datetime
                try:
                    dt = datetime.date(1899, 12, 30) + datetime.timedelta(days=int(oa))
                    print(f"    off={off}: {dt} (OADate={oa:.0f})")
                except:
                    pass

    dump_count += 1
