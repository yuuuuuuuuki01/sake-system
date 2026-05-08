"""
decoder_skido.py — SKIDO.DAT 未来受注 差分デコーダー

run_relay.bat から定期実行される。
前回スナップショットと比較して変更スロットのみ処理し、
future_orders テーブルに UPSERT する。

slot をユニークキーとして:
  - 新規スロット → INSERT
  - 変更スロット → UPDATE
  - ゼロクリアスロット（deleted） → DELETE
"""
import struct, os, json, pickle, logging, sys, requests, datetime
from pathlib import Path
from collections import Counter

# ── パス設定 ─────────────────────────────────────────────────────────────────
BASE_DIR      = Path(__file__).parent
CONFIG_PATH   = BASE_DIR / "relay_config.json"
LOCAL_CONFIG  = BASE_DIR / "relay_config.local.json"
SNAPSHOT_PATH = BASE_DIR / "skido_snapshot.pkl"

HEADER_SIZE = 0x200
REC_MARKER  = b"\x09\x2e\x38\x09"
SIGNATURE   = b"\x44\x00\x00\x00\x03\x80\x01\x00"

# 今日の令和年・月（未来判定用）
_today = datetime.date.today()
TODAY_REIWA = _today.year - 2018   # 令和年 (2026 → 8)
TODAY_MONTH = _today.month

# ── ログ ─────────────────────────────────────────────────────────────────────
def setup_logging() -> logging.Logger:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler(BASE_DIR / "decoder_skido.log", encoding="utf-8"),
        ],
    )
    return logging.getLogger("decoder_skido")

# ── 設定読み込み ──────────────────────────────────────────────────────────────
def load_config() -> dict:
    path = LOCAL_CONFIG if LOCAL_CONFIG.exists() else CONFIG_PATH
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)

# ── 商品マスタ読み込み ────────────────────────────────────────────────────────
def load_products_from_supabase(config: dict, logger) -> dict:
    """Supabase products テーブルから legacy_product_code → name マップを作成"""
    products = {}
    try:
        url = config["supabase_url"].rstrip("/")
        headers = {
            "apikey":        config["supabase_anon_key"],
            "Authorization": f"Bearer {config['supabase_anon_key']}",
        }
        resp = requests.get(
            f"{url}/rest/v1/products?select=legacy_product_code,name&limit=1000",
            headers=headers, timeout=30
        )
        if resp.ok:
            for row in resp.json():
                code = (row.get("legacy_product_code") or "").strip()
                name = (row.get("name") or "").strip()
                if code and name:
                    # 3桁の数字コードに正規化
                    norm = code.lstrip("0") or "0"
                    if norm.isdigit() and 100 <= int(norm) <= 999:
                        products[norm] = name
            logger.info("Supabase products loaded: %d", len(products))
        else:
            logger.warning("Supabase products fetch failed: %s %s", resp.status_code, resp.text[:200])
    except Exception as e:
        logger.warning("Supabase products fetch error: %s", e)
    return products


def load_products(z_drive: str) -> dict:
    """SKSYO.MST と SHSYO.MST から商品コード → 名称マップを作成（フォールバック用）"""
    products = {}

    # SKSYO.MST (SK モジュール — SKIDOと同系列)
    sksyo_path = Path(z_drive) / "sk" / "mst" / "SKSYO.MST"
    if sksyo_path.exists():
        raw = sksyo_path.read_bytes()
        pos = HEADER_SIZE
        while True:
            m = raw.find(REC_MARKER, pos)
            if m < 0: break
            ds = m + 4
            if ds + 50 > len(raw): break
            cb = raw[ds:ds+5]
            if cb.isdigit():
                fc = cb.decode("ascii")
                c3 = fc[-3:]
                if c3.isdigit() and 100 <= int(c3) <= 999 and c3 not in products:
                    name = raw[ds+5:ds+45].rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
                    products[c3] = name
            pos = m + 1

    # SHSYO.MST (SH モジュール — フォールバック)
    shsyo_path = Path(z_drive) / "sh" / "mst" / "SHSYO.MST"
    if shsyo_path.exists():
        raw = shsyo_path.read_bytes()
        pos = 0
        while True:
            m = raw.find(REC_MARKER, pos)
            if m < 0: break
            ds = m + 4
            if ds + 130 > len(raw): break
            code = raw[ds:ds+7].rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
            norm = code.lstrip("0") or "0"
            if norm.isdigit() and 100 <= int(norm) <= 999 and norm not in products:
                name = raw[ds+43:ds+75].rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
                if name:
                    products[norm] = name
            pos = m + 1

    return products

# ── デコードヘルパー ──────────────────────────────────────────────────────────
def safe_double(rec: bytes, off: int):
    if off + 8 > len(rec): return None
    v = struct.unpack_from("<d", rec, off)[0]
    if v != v or abs(v) == float("inf"): return None
    return v

def is_price(v) -> bool:
    if v is None: return False
    if abs(v) < 1.0 or abs(v) > 500000.0: return False
    if 8.0 <= abs(v) <= 9.0: return False   # 税率除外
    return True

def find_products(rec: bytes, mk_pos: int) -> list:
    codes = []
    for off in range(mk_pos + 100, len(rec) - 3):
        chunk = rec[off:off+4]
        if (chunk[:3].isdigit()
                and (off == 0 or not rec[off-1:off].isdigit())
                and (off+3 >= len(rec) or not rec[off+3:off+4].isdigit())):
            n = int(chunk[:3])
            if 100 <= n <= 999:
                codes.append((off, chunk[:3].decode("ascii")))
    return codes

def decode_slot(si: int, sig_pos: int, mk_pos: int, ry: int, mo: int,
                rec: bytes, products: dict) -> dict:
    year = 2018 + ry
    delivery_date = f"{year}-{mo:02d}"

    # 顧客参照コード
    cust_ref = 0
    if mk_pos + 14 <= len(rec):
        cust_ref = struct.unpack_from("<H", rec, mk_pos + 12)[0]

    # 数量
    qty = 0
    if mk_pos + 85 <= len(rec):
        v = struct.unpack_from("<I", rec, mk_pos + 81)[0]
        if 1 <= v <= 9999:
            qty = v

    # 商品コード・名称
    all_codes = find_products(rec, mk_pos)
    primary_code = ""
    primary_off  = -1
    target = mk_pos + 105
    for off, code in all_codes:
        if abs(off - target) <= 5:
            primary_code = code
            primary_off  = off
            break
    if not primary_code and all_codes:
        primary_off, primary_code = all_codes[0]

    # 商品名: DBマスター(products)を最優先 → なければレコード内CP932テキスト
    product_name = ""
    if primary_code:
        product_name = products.get(primary_code, "")
    if not product_name and primary_off >= 0:
        code_len = len(primary_code)
        chunk = rec[primary_off + code_len:primary_off + code_len + 20]
        in_record = chunk.rstrip(b"\x00 ").decode("cp932", errors="replace").strip()
        # 文字化け（REPLACEMENT CHARACTER U+FFFD）を含む場合は採用しない
        if in_record and "\ufffd" not in in_record and not all(c in "　 " for c in in_record):
            product_name = in_record

    # qty フォールバック
    if qty == 0 and primary_off >= 0:
        off = primary_off + 47
        if off + 4 <= len(rec):
            v = struct.unpack_from("<I", rec, off)[0]
            if 1 <= v <= 9999:
                qty = v

    # 単価
    unit_price = 0.0
    p128 = safe_double(rec, mk_pos + 128) if mk_pos + 136 <= len(rec) else None
    p168 = safe_double(rec, mk_pos + 168) if mk_pos + 176 <= len(rec) else None
    if is_price(p128):
        unit_price = p128
    elif is_price(p168):
        unit_price = p168
    elif primary_off >= 0:
        for delta in [63, 55, 47, 71, 79]:
            v = safe_double(rec, primary_off + delta)
            if is_price(v):
                unit_price = v
                break

    total = round(qty * abs(unit_price)) if qty > 0 and abs(unit_price) > 0 else 0

    return {
        "slot":           si,
        "delivery_date":  delivery_date,
        "delivery_year":  year,
        "delivery_month": mo,
        "cust_ref":       cust_ref,
        "product_code":   primary_code,
        "product_name":   product_name[:40] if product_name else "",
        "qty":            qty,
        "unit_price":     round(unit_price, 2),
        "total":          total,
        "source_slot":    si,
    }

# ── スナップショット (slot → md5) ─────────────────────────────────────────────
def compute_snapshot(data: bytes, rec_size: int) -> dict:
    import hashlib
    snap = {}
    n = (len(data) - HEADER_SIZE) // rec_size
    for si in range(n):
        off = HEADER_SIZE + si * rec_size
        chunk = data[off:off + rec_size]
        snap[si] = hashlib.md5(chunk).digest()
    return snap

# ── Supabase UPSERT ───────────────────────────────────────────────────────────
def upsert_future_orders(records: list, config: dict, logger) -> int:
    if not records: return 0
    url = config["supabase_url"].rstrip("/")
    session = requests.Session()
    session.headers.update({
        "apikey":        config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type":  "application/json",
        "Prefer":        "resolution=merge-duplicates,missing=default",
    })
    total = 0
    for i in range(0, len(records), 200):
        batch = records[i:i+200]
        resp = session.post(
            f"{url}/rest/v1/future_orders?on_conflict=slot",
            json=batch, timeout=60
        )
        if not resp.ok:
            logger.error("UPSERT error: %s %s", resp.status_code, resp.text[:300])
        else:
            total += len(batch)
    return total

def delete_future_orders(slots: list, config: dict, logger) -> int:
    """ゼロクリアされたスロット（受注削除）を future_orders から除去"""
    if not slots: return 0
    url = config["supabase_url"].rstrip("/")
    headers = {
        "apikey":        config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type":  "application/json",
    }
    # slot in (x,y,z,...)
    slot_list = ",".join(str(s) for s in slots)
    resp = requests.delete(
        f"{url}/rest/v1/future_orders?slot=in.({slot_list})",
        headers=headers, timeout=60
    )
    if not resp.ok:
        logger.error("DELETE error: %s %s", resp.status_code, resp.text[:200])
        return 0
    return len(slots)

# ── メイン ────────────────────────────────────────────────────────────────────
def main() -> int:
    import argparse
    parser = argparse.ArgumentParser(description="SKIDO.DAT 未来受注 差分デコーダー")
    parser.add_argument("--dry-run",  action="store_true", help="Supabase書き込みをスキップ")
    parser.add_argument("--init",     action="store_true", help="初回スナップショット作成のみ")
    parser.add_argument("--force",    action="store_true", help="全スロット強制処理")
    args = parser.parse_args()

    logger = setup_logging()
    config = load_config()

    skido_path = Path(config["z_drive_path"]) / "sk" / "dat" / "SKIDO.DAT"
    if not skido_path.exists():
        logger.error("SKIDO.DAT not found: %s", skido_path)
        return 1

    logger.info("Reading SKIDO.DAT: %s", skido_path)
    data = skido_path.read_bytes()
    rec_size   = struct.unpack_from("<H", data, 0x18)[0]
    total_slots = (len(data) - HEADER_SIZE) // rec_size
    logger.info("rec_size=%d, total_slots=%d", rec_size, total_slots)

    # 商品マスタ: Supabase products テーブルを優先、不足分はバイナリMSTで補完
    products = load_products_from_supabase(config, logger)
    if len(products) < 3:
        # Supabase接続失敗時はバイナリMSTにフォールバック
        logger.warning("Supabase products insufficient (%d), falling back to MST files", len(products))
        products = load_products(config["z_drive_path"])
    else:
        # Supabase にないコードをバイナリMSTで補完
        mst_products = load_products(config["z_drive_path"])
        for code, name in mst_products.items():
            if code not in products:
                products[code] = name
        logger.info("Products after MST supplement: %d", len(products))

    # スナップショット比較
    # pickle には {"snap": {slot: hash}, "future_slots": set()} を保存
    new_snap = compute_snapshot(data, rec_size)

    if args.init or not SNAPSHOT_PATH.exists():
        # 初回: スナップショットのみ保存（future_slots は空 = 全スロット処理）
        with SNAPSHOT_PATH.open("wb") as f:
            pickle.dump({"snap": new_snap, "future_slots": set()}, f)
        logger.info("Initial snapshot saved (%d slots)", len(new_snap))
        if args.init:
            return 0
        old_snap        = {}
        old_future_slots = set()
    else:
        with SNAPSHOT_PATH.open("rb") as f:
            saved = pickle.load(f)
        # 旧形式（dictのみ）との互換性
        if isinstance(saved, dict) and "snap" in saved:
            old_snap         = saved["snap"]
            old_future_slots = saved.get("future_slots", set())
        else:
            old_snap         = saved
            old_future_slots = set()
        logger.info("Previous snapshot: %d slots, %d future slots",
                    len(old_snap), len(old_future_slots))

    # 変更スロットを特定
    if args.force:
        changed_slots = set(range(total_slots))
    else:
        changed_slots = {si for si, h in new_snap.items() if old_snap.get(si) != h}
    logger.info("Changed slots: %d", len(changed_slots))

    # 変更スロットをデコード
    upsert_records  = []
    delete_slots    = []
    new_future_slots = set(old_future_slots)  # 今回の実行後の未来スロット集合

    for si in sorted(changed_slots):
        off = HEADER_SIZE + si * rec_size
        rec = data[off:off + rec_size]

        sig_pos = rec.find(SIGNATURE)
        if sig_pos < 4:
            # SIGNATURE なし → 受注レコードでない or 削除済み
            # 以前は未来受注だったなら削除
            if si in old_future_slots:
                delete_slots.append(si)
                new_future_slots.discard(si)
            continue

        date_bytes = rec[sig_pos-4:sig_pos]
        ry = date_bytes[0]
        mo = date_bytes[1]
        is_type_a = (1 <= ry <= 20 and 1 <= mo <= 12
                     and date_bytes[2] == 0 and date_bytes[3] == 0)
        if not is_type_a:
            continue

        is_future = (ry > TODAY_REIWA or (ry == TODAY_REIWA and mo >= TODAY_MONTH))

        mk_pos = sig_pos + 12
        if mk_pos + 4 > rec_size:
            continue
        if rec[mk_pos:mk_pos+4] != REC_MARKER:
            mk_pos = rec.find(REC_MARKER)
            if mk_pos < 0:
                continue

        if is_future:
            row = decode_slot(si, sig_pos, mk_pos, ry, mo, bytes(rec), products)
            upsert_records.append(row)
            new_future_slots.add(si)
        else:
            # 期日超過 or 過去受注: 以前は未来受注だったなら削除
            if si in old_future_slots:
                delete_slots.append(si)
                new_future_slots.discard(si)

    logger.info("UPSERT: %d件, DELETE: %d件", len(upsert_records), len(delete_slots))

    if args.dry_run:
        logger.info("[DRY-RUN] upsert=%d delete=%d", len(upsert_records), len(delete_slots))
        for r in upsert_records[:5]:
            logger.info("  sample: slot=%d %s prod=%s qty=%d price=%.0f total=%.0f",
                        r["slot"], r["delivery_date"], r["product_code"],
                        r["qty"], r["unit_price"], r["total"])
    else:
        n_up = upsert_future_orders(upsert_records, config, logger)
        n_del = delete_future_orders(delete_slots, config, logger)
        logger.info("Done: upserted=%d deleted=%d", n_up, n_del)

    # スナップショット更新（future_slots も保存）
    if not args.dry_run:
        with SNAPSHOT_PATH.open("wb") as f:
            pickle.dump({"snap": new_snap, "future_slots": new_future_slots}, f)
        logger.info("Snapshot updated (future_slots=%d)", len(new_future_slots))

    return 0


if __name__ == "__main__":
    sys.exit(main())
