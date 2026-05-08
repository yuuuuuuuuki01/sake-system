"""
SKIDO.DAT 未来受注 最終デコーダー

確定した構造:
  SIGNATURE   = 44 00 00 00 03 80 01 00  (全レコード共通)
  MARKER      = 09 2e 38 09
  日付        : rec[sig_pos-4] = Reiwa年(binary), rec[sig_pos-3] = 月(binary)
  MARKER位置  : sig_pos + 12 (SIGNATURE 8byte + timestamp 4byte)

  MARKER後オフセット:
    MK+ 4.. 10: 7 zeros
    MK+11      : 月 (BCD encoded — 10月=0x10, 11月=0x11, etc.)
    MK+12,+13  : 顧客参照コード (int16 LE, 同一顧客は同値)
    MK+81      : 数量 (int32 LE, 1-9999)
    MK+105     : 商品コード (ASCII 3桁)
    MK+108     : 商品名 (CP932, 20byte padding)
    MK+128     : 金額1 (double — 単価または税率8.4)
    MK+168     : 金額2 (double — 単価)

  マルチ商品レコード: MK+105の最初の商品後に追加商品コードが連続する

出力: future_orders.csv, future_orders.json
"""
import struct, re, os, json, csv, datetime
from collections import Counter

SKIDO_PATH = "Z:/sk/dat/SKIDO.DAT"
SHSYO_PATH = "Z:/sh/mst/SHSYO.MST"
SKSYO_PATH = "Z:/sk/mst/SKSYO.MST"
OUTPUT_CSV  = "future_orders.csv"
OUTPUT_JSON = "future_orders.json"
HEADER_SIZE = 0x200
REC_MARKER  = b"\x09\x2e\x38\x09"
SIGNATURE   = b"\x44\x00\x00\x00\x03\x80\x01\x00"

# ── ファイル情報 ──────────────────────────────────────────────────────────────
with open(SKIDO_PATH, "rb") as f:
    hdr = f.read(HEADER_SIZE)
skido_rec   = struct.unpack_from("<H", hdr, 0x18)[0]
skido_size  = os.path.getsize(SKIDO_PATH)
skido_slots = (skido_size - HEADER_SIZE) // skido_rec
print(f"SKIDO: rec={skido_rec}, slots={skido_slots}")

# ── SKSYO.MST SK商品マスタ ───────────────────────────────────────────────────
products_sk = {}
try:
    with open(SKSYO_PATH, "rb") as f:
        raw_sksyo = f.read()
    pos = HEADER_SIZE
    while True:
        m = raw_sksyo.find(REC_MARKER, pos)
        if m < 0: break
        ds = m + 4
        if ds + 50 > len(raw_sksyo): break
        code_bytes = raw_sksyo[ds:ds+5]
        if code_bytes.isdigit():
            full_code = code_bytes.decode("ascii")
            code3 = full_code[-3:]  # last 3 digits = SKIDO product code
            if code3.isdigit() and 100 <= int(code3) <= 999 and code3 not in products_sk:
                name_raw = raw_sksyo[ds+5:ds+45].rstrip(b"\x00 ")
                name = name_raw.decode("cp932", errors="replace").strip()
                products_sk[code3] = {"full_code": full_code, "name": name}
        pos = m + 1
    print(f"SKSYO商品マスタ: {len(products_sk)} 件")
except Exception as e:
    print(f"SKSYO読み込みエラー: {e}")

# ── SHSYO.MST 商品マスタ (参照用 — SHモジュール) ──────────────────────────────
products_sh = {}
try:
    with open(SHSYO_PATH, "rb") as f:
        raw_shsyo = f.read()
    pos = 0
    while True:
        m = raw_shsyo.find(REC_MARKER, pos)
        if m < 0: break
        ds = m + 4
        if ds + 130 > len(raw_shsyo): break
        code = raw_shsyo[ds:ds+7].rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
        norm = code.lstrip("0") or "0"
        if norm.isdigit() and 100 <= int(norm) <= 900:
            name = raw_shsyo[ds+43:ds+75].rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
            if ds + 114 <= len(raw_shsyo):
                sale     = struct.unpack_from("<d", raw_shsyo, ds+98)[0]
                purchase = struct.unpack_from("<d", raw_shsyo, ds+90)[0]
            else:
                sale = purchase = 0.0
            products_sh[norm] = {"name": name, "sale": sale, "purchase": purchase}
        pos = m + 1
    print(f"SHSYO商品マスタ: {len(products_sh)} 件")
except Exception as e:
    print(f"SHSYO読み込みエラー: {e}")

# ── ヘルパー ─────────────────────────────────────────────────────────────────
def safe_double(rec, off):
    """doubleとして読み取る。範囲外またはNaN/InfはNoneを返す"""
    if off + 8 > len(rec):
        return None
    v = struct.unpack_from("<d", rec, off)[0]
    if v != v or abs(v) == float('inf'):  # NaN or Inf
        return None
    return v

def is_price(v):
    """価格として妥当か (税率8.4%は除外)"""
    if v is None or v != v or abs(v) == float('inf'):
        return False
    if abs(v) < 1.0 or abs(v) > 500000.0:
        return False
    # 税率(8.0〜9.0の範囲)は除外 — 浮動小数点誤差を考慮して範囲で判定
    if 8.0 <= abs(v) <= 9.0:
        return False
    return True

def extract_cp932(rec, start, end):
    """指定範囲のCP932テキストを抽出"""
    chunk = rec[max(0,start):min(len(rec),end)]
    try:
        return chunk.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
    except:
        return ""

def find_all_products(rec, mk_pos, rec_len):
    """MARKER後の全商品コード(3桁ASCII, 100-999)を検索"""
    codes = []
    start = mk_pos + 100  # MK+100 以降を検索
    for off in range(start, rec_len - 3):
        chunk = rec[off:off+4]
        # 正確に3桁: 前後が数字でないこと
        if (chunk[:3].isdigit() and
            (off == 0 or not rec[off-1:off].isdigit()) and
            (off+3 >= rec_len or not rec[off+3:off+4].isdigit())):
            code = chunk[:3].decode("ascii")
            n = int(code)
            if 100 <= n <= 999:
                codes.append((off, code))
    return codes

def extract_record(si, sig_pos, mk_pos, ry, mo, rec):
    """1レコードから受注情報を抽出"""
    year = 2018 + ry

    # ── 顧客参照コード (MK+12, MK+13) ──────────────────────────────────────
    cust_ref = 0
    if mk_pos + 14 <= len(rec):
        cust_ref = struct.unpack_from("<H", rec, mk_pos + 12)[0]

    # ── 数量 (MK+81 優先) ───────────────────────────────────────────────────
    qty = 0
    qty_src = ""
    if mk_pos + 85 <= len(rec):
        v = struct.unpack_from("<I", rec, mk_pos + 81)[0]
        if 1 <= v <= 9999:
            qty = v
            qty_src = "MK+81"

    # ── 商品コード (MK+105) ─────────────────────────────────────────────────
    all_codes = find_all_products(rec, mk_pos, len(rec))
    primary_code = ""
    primary_code_off = -1
    # MK+105 周辺 (±5byte) で最初に見つかったコードを主商品とする
    target_off = mk_pos + 105
    for off, code in all_codes:
        if abs(off - target_off) <= 5:
            primary_code = code
            primary_code_off = off
            break
    if not primary_code and all_codes:
        # フォールバック: 最初のコード
        primary_code_off, primary_code = all_codes[0]

    # ── 商品名: レコード内CP932優先 → SKSYO/SHSYOはフォールバック ──────────────
    # SKSYOの末尾3桁マッチは複数候補があり誤ヒットするため、レコード内テキストを優先
    product_name = ""
    if primary_code_off >= 0:
        code_len = len(primary_code)
        name_end = min(primary_code_off + code_len + 20, len(rec))
        in_record = extract_cp932(rec, primary_code_off + code_len, name_end)
        if in_record and not all(c in "　 " for c in in_record):
            product_name = in_record
    if not product_name:
        norm = primary_code.lstrip("0") or "0"
        if norm in products_sk:
            product_name = products_sk[norm]["name"]
        elif norm in products_sh and products_sh[norm]["name"]:
            product_name = products_sh[norm]["name"]

    # ── qty フォールバック: code+47 ─────────────────────────────────────────
    if qty == 0 and primary_code_off >= 0:
        off = primary_code_off + 47
        if off + 4 <= len(rec):
            v = struct.unpack_from("<I", rec, off)[0]
            if 1 <= v <= 9999:
                qty = v
                qty_src = f"code+47"

    # ── 単価 (double) ────────────────────────────────────────────────────────
    unit_price = 0.0
    unit_price_src = ""
    price_mk128 = 0.0   # MK+128の値 (参考)
    price_mk168 = 0.0   # MK+168の値 (参考)

    # MK+128: 最初の価格フィールド
    if mk_pos + 136 <= len(rec):
        v = safe_double(rec, mk_pos + 128)
        if v is not None:
            price_mk128 = v
        if is_price(v):
            unit_price = v
            unit_price_src = "MK+128"

    # MK+168: 2番目の価格フィールド (税率の場合の代替)
    if mk_pos + 176 <= len(rec):
        v = safe_double(rec, mk_pos + 168)
        if v is not None:
            price_mk168 = v

    if not is_price(unit_price) and is_price(price_mk168):
        unit_price = price_mk168
        unit_price_src = "MK+168"

    # それでもなければ: code+63 あたりを探す
    if not is_price(unit_price) and primary_code_off >= 0:
        for delta in [63, 55, 47, 71, 79]:
            off = primary_code_off + delta
            if off + 8 > len(rec):
                continue
            v = safe_double(rec, off)
            if is_price(v):
                unit_price = v
                unit_price_src = f"code+{delta}"
                break

    # ── マスタ単価 (SHSYO参照) ────────────────────────────────────────────────
    master_sale = 0.0
    if primary_code:
        code_norm = primary_code.lstrip("0") or "0"
        p = products_sh.get(code_norm, {})
        master_sale = p.get("sale", 0.0)

    # ── 合計 (絶対値で計算: 負の単価は仕入価格の慣習) ─────────────────────────
    total = qty * abs(unit_price) if qty > 0 and abs(unit_price) > 0 else 0.0

    # ── 全商品コード (副商品) ────────────────────────────────────────────────
    all_code_strs = [code for _, code in all_codes]

    return {
        "slot":          si,
        "year":          year,
        "month":         mo,
        "reiwa_year":    ry,
        "delivery_date": f"{year}-{mo:02d}",
        "cust_ref":      cust_ref,
        "product_code":  primary_code,
        "product_name":  product_name[:30] if product_name else "",
        "qty":           qty,
        "unit_price":    round(unit_price, 2) if unit_price else 0.0,
        "price_mk128":   round(price_mk128, 2),
        "price_mk168":   round(price_mk168, 2),
        "total":         round(total, 0),
        "master_sale":   round(master_sale, 2),
        "all_codes":     all_code_strs[:8],
        "sig_pos":       sig_pos,
        "mk_pos":        mk_pos,
        "qty_src":       qty_src,
        "price_src":     unit_price_src,
    }

# ── 全スロットスキャン ────────────────────────────────────────────────────────
print("\n=== SKIDO スキャン中 ===")
future_orders = []
all_type_a    = []

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

        mk_pos = sig_pos + 12  # SIGNATURE(8) + timestamp(4)
        if mk_pos + 4 > skido_rec:
            continue

        # MARKER確認
        if rec[mk_pos:mk_pos+4] != REC_MARKER:
            mk_pos = rec.find(REC_MARKER)
            if mk_pos < 0:
                continue

        all_type_a.append((si, ry, mo))

        # 未来 = Reiwa 8 April 2026 以降
        is_future = (ry > 8 or (ry == 8 and mo >= 4))
        if not is_future:
            continue

        info = extract_record(si, sig_pos, mk_pos, ry, mo, bytes(rec))
        future_orders.append(info)

print(f"Type A レコード合計: {len(all_type_a)} 件")
print(f"未来受注 (R8 Apr 2026+): {len(future_orders)} 件")

# ── 顧客別集計 ────────────────────────────────────────────────────────────────
cust_counter = Counter(o["cust_ref"] for o in future_orders)
print(f"\n顧客参照コード別 件数:")
for cref, cnt in sorted(cust_counter.items()):
    sample = [o for o in future_orders if o["cust_ref"] == cref][:1]
    codes = ", ".join(sorted(set(o["product_code"] for o in future_orders if o["cust_ref"] == cref)))
    print(f"  cust_ref={cref:6d}: {cnt}件  商品例: {codes}")

# ── 商品別集計 ────────────────────────────────────────────────────────────────
prod_counter = Counter(o["product_code"] for o in future_orders)
print(f"\n商品コード別 件数:")
for code, cnt in sorted(prod_counter.items()):
    prices = [o["unit_price"] for o in future_orders if o["product_code"] == code and o["unit_price"] > 0]
    avg_p = sum(prices)/len(prices) if prices else 0
    print(f"  {code}: {cnt}件  単価平均={avg_p:.0f}")

# ── 結果表示 ─────────────────────────────────────────────────────────────────
print(f"\n=== 未来受注 一覧 ===")
print(f"{'slot':>7} {'納期':12} {'cust':6} {'商品':6} {'qty':5} {'単価':>10} {'合計':>10} {'商品名':30} {'全商品'}")
print("-" * 120)
for o in sorted(future_orders, key=lambda x: (x["year"], x["month"], x["cust_ref"])):
    name_str = o["product_name"][:28] if o["product_name"] else "(不明)"
    try:
        name_str = name_str.encode("cp932", errors="replace").decode("cp932", errors="replace")
    except:
        pass
    codes_str = " ".join(o["all_codes"][:5])
    print(f"  {o['slot']:5d} {o['delivery_date']:12} {o['cust_ref']:6d} {o['product_code']:6} "
          f"{o['qty']:5d} {o['unit_price']:10.0f} {o['total']:10.0f} {name_str:30} {codes_str}")

# ── CSV出力 ───────────────────────────────────────────────────────────────────
fieldnames = ["slot","delivery_date","year","month","reiwa_year",
              "cust_ref","product_code","product_name","qty",
              "unit_price","price_mk128","price_mk168","total","master_sale","all_codes",
              "sig_pos","mk_pos","qty_src","price_src"]
with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
    w.writeheader()
    for o in sorted(future_orders, key=lambda x: (x["year"], x["month"], x["cust_ref"])):
        row = dict(o)
        row["all_codes"] = "|".join(o["all_codes"])
        w.writerow(row)
print(f"\nCSV保存: {OUTPUT_CSV}")

# ── JSON出力 ──────────────────────────────────────────────────────────────────
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    out = []
    for o in sorted(future_orders, key=lambda x: (x["year"], x["month"], x["cust_ref"])):
        out.append({
            "slot":         o["slot"],
            "delivery_date": o["delivery_date"],
            "cust_ref":     o["cust_ref"],
            "product_code": o["product_code"],
            "product_name": o["product_name"],
            "qty":          o["qty"],
            "unit_price":   o["unit_price"],
            "total":        o["total"],
        })
    json.dump(out, f, ensure_ascii=False, indent=2)
print(f"JSON保存: {OUTPUT_JSON}")

# ── 品質チェック ──────────────────────────────────────────────────────────────
missing_qty   = [o for o in future_orders if o["qty"] == 0]
missing_price = [o for o in future_orders if o["unit_price"] == 0]
missing_code  = [o for o in future_orders if not o["product_code"]]
print(f"\n品質チェック:")
print(f"  数量不明: {len(missing_qty)} 件")
print(f"  単価不明: {len(missing_price)} 件")
print(f"  商品不明: {len(missing_code)} 件")
if missing_qty:
    print(f"    数量不明 slots: {[o['slot'] for o in missing_qty[:10]]}")
if missing_price:
    print(f"    単価不明 slots: {[o['slot'] for o in missing_price[:10]]}")
