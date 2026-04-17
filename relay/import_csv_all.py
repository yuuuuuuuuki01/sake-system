"""全マスタCSVインポート — CSVが正のマスターデータ。
得意先・仕入先・納品先・商品をCSVから一括投入。
コードはCSVのまま（ゼロ埋めしない）。
"""
from __future__ import annotations

import csv
import json
import sys
import uuid
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import requests

sys.stdout.reconfigure(encoding="utf-8")

SAKE_UUID_NS = uuid.UUID("b7e3f1a0-4c2d-4e8f-9a1b-0c3d5e7f9a2b")
BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG = BASE_DIR / "relay_config.local.json"
CONFIG = BASE_DIR / "relay_config.json"
config = json.loads((LOCAL_CONFIG if LOCAL_CONFIG.exists() else CONFIG).read_text())


def to_int(v: str) -> int | None:
    try:
        f = float(v)
        return int(f) if f != 0 else None
    except Exception:
        return None


def to_float(v: str) -> float | None:
    try:
        f = float(v)
        return f if f > 0 else None
    except Exception:
        return None


def clean(v: str) -> str | None:
    v = (v or "").strip().replace("\x00", "")
    return v if v else None


def parse_jan(v: str) -> str | None:
    if not v or not v.strip():
        return None
    try:
        n = int(float(v.strip()))
        s = str(n)
        if len(s) in (8, 13):
            return s
    except Exception:
        pass
    return None


url = config["supabase_url"].rstrip("/")
session = requests.Session()
session.headers.update({
    "apikey": config["supabase_anon_key"],
    "Authorization": f"Bearer {config['supabase_anon_key']}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates,missing=default",
})


def upsert(table: str, conflict: str, records: list[dict[str, Any]]) -> int:
    total = 0
    for i in range(0, len(records), 100):
        batch = records[i : i + 100]
        try:
            resp = session.post(
                f"{url}/rest/v1/{table}?on_conflict={conflict}",
                json=batch, timeout=60,
            )
            resp.raise_for_status()
            total += len(batch)
        except Exception:
            for p in batch:
                try:
                    session.post(
                        f"{url}/rest/v1/{table}?on_conflict={conflict}",
                        json=[p], timeout=30,
                    ).raise_for_status()
                    total += 1
                except Exception as e2:
                    print(f"  FAIL: {p.get('legacy_customer_code') or p.get('legacy_supplier_code') or p.get('legacy_product_code') or p.get('name','?')}")
    return total


def import_customers() -> None:
    """得意先CSV → customers テーブル"""
    records: list[dict[str, Any]] = []
    with open(r"Z:\得意先ﾏｽﾀﾘｽﾄ.csv", "r", encoding="cp932", errors="replace") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            if len(row) < 40:
                continue
            code = row[0].strip()
            if not code:
                continue
            name = clean(row[3]) or clean(row[2])
            if not name:
                continue
            records.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"customer:{code}")),
                "legacy_customer_code": code,
                "customer_code": code,
                "name": name,
                "kana_name": clean(row[1]),
                "short_name": clean(row[2]),
                "postal_code": clean(row[4]),
                "address1": clean(row[5]),
                "address2": clean(row[6]),
                "phone": clean(row[7]),
                "fax": clean(row[8]),
                "staff_code": clean(row[9]),
                "business_type": clean(row[12]),       # 業態名
                "delivery_area_code": clean(row[13]),   # 地区コード
                "closing_day": to_int(row[30]),
                "payment_day": to_int(row[41]),
                "billing_cycle_type": clean(row[34]),   # 予定入金種名
                "tax_mode": clean(row[23]),             # 消費税計算名
                "memo": json.dumps({k: v for k, v in {
                    "staff_name": clean(row[10]),
                    "biz_code": clean(row[11]), "biz_name": clean(row[12]),
                    "area_code": clean(row[13]), "area_name": clean(row[14]),
                    "sales_cat_code": clean(row[15]), "sales_cat_name": clean(row[16]),
                    "grp1_code": clean(row[17]), "grp1_name": clean(row[18]),
                    "grp2_code": clean(row[19]), "grp2_name": clean(row[20]),
                    "price_group": clean(row[21]),
                    "tax_calc_code": clean(row[22]), "tax_calc_name": clean(row[23]),
                    "tax_round_code": clean(row[24]), "tax_round_name": clean(row[25]),
                    "invoice_issue_code": clean(row[26]), "invoice_issue_name": clean(row[27]),
                    "price_type_code": clean(row[28]), "price_type_name": clean(row[29]),
                    "billing_code": clean(row[31]), "billing_name": clean(row[32]),
                    "payment_type_code": clean(row[33]), "payment_type_name": clean(row[34]),
                    "rebate_code": clean(row[35]),
                    "rebate_tax_code": clean(row[36]), "rebate_tax_name": clean(row[37]),
                    "rebate_round_code": clean(row[38]), "rebate_round_name": clean(row[39]),
                    "payment_month": to_int(row[40]),
                    "comment": clean(row[42]) if len(row) > 42 else None,
                }.items() if v is not None}, ensure_ascii=False) or None,
                "is_active": True,
                "updated_at": datetime.now(tz=UTC).isoformat(),
            })

    print(f"得意先: {len(records)}件")
    t = upsert("customers", "legacy_customer_code", records)
    print(f"  → {t}件 upserted")


def import_suppliers() -> None:
    """仕入先CSV → suppliers テーブル"""
    records: list[dict[str, Any]] = []
    with open(r"Z:\仕入先ﾏｽﾀﾘｽﾄ.csv", "r", encoding="cp932", errors="replace") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            if len(row) < 10:
                continue
            code = row[0].strip()
            if not code:
                continue
            name = clean(row[1])
            if not name:
                continue
            records.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"supplier:{code}")),
                "legacy_supplier_code": code,
                "name": name,
                "postal_code": clean(row[2]),
                "address1": clean(row[3]),
                "address2": clean(row[4]) if len(row) > 4 else None,
                "phone": clean(row[5]),
                "fax": clean(row[6]),
                "closing_day": to_int(row[7]),
                "payment_day": to_int(row[14]) if len(row) > 14 else None,
                "memo": json.dumps({k: v for k, v in {
                    "price_group": clean(row[8]),
                    "tax_calc_code": clean(row[9]),
                    "tax_calc_name": clean(row[10]) if len(row) > 10 else None,
                    "tax_round_code": clean(row[11]) if len(row) > 11 else None,
                    "tax_round_name": clean(row[12]) if len(row) > 12 else None,
                    "payment_month": to_int(row[13]) if len(row) > 13 else None,
                    "payment_type": clean(row[15]) if len(row) > 15 else None,
                }.items() if v is not None}, ensure_ascii=False) or None,
                "is_active": True,
                "updated_at": datetime.now(tz=UTC).isoformat(),
            })

    print(f"仕入先: {len(records)}件")
    t = upsert("suppliers", "legacy_supplier_code", records)
    print(f"  → {t}件 upserted")


def import_delivery_destinations() -> None:
    """納品先CSV → delivery_locations テーブル"""
    records: list[dict[str, Any]] = []
    with open(r"Z:\納品先ﾏｽﾀﾘｽﾄ.csv", "r", encoding="cp932", errors="replace") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            if len(row) < 10:
                continue
            code = row[0].strip()
            if not code:
                continue
            name = clean(row[3]) or clean(row[2])
            if not name:
                continue
            addr_parts = [clean(row[5]), clean(row[6])]
            address = " ".join(p for p in addr_parts if p) or None
            records.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"delivery:{code}")),
                "name": name,
                "postal_code": clean(row[4]),
                "address": address,
                "phone": clean(row[7]),
                "customer_code": clean(row[9]),
                "delivery_note": json.dumps({k: v for k, v in {
                    "delivery_code": code,
                    "kana": clean(row[1]),
                    "short_name": clean(row[2]),
                    "fax": clean(row[8]),
                    "customer_name": clean(row[10]),
                    "area_code": clean(row[11]),
                    "area_name": clean(row[12]) if len(row) > 12 else None,
                    "biz_code": clean(row[13]) if len(row) > 13 else None,
                    "biz_name": clean(row[14]) if len(row) > 14 else None,
                    "grp1_code": clean(row[15]) if len(row) > 15 else None,
                    "grp1_name": clean(row[16]) if len(row) > 16 else None,
                    "grp2_code": clean(row[17]) if len(row) > 17 else None,
                    "grp2_name": clean(row[18]) if len(row) > 18 else None,
                    "comment": clean(row[19]) if len(row) > 19 else None,
                }.items() if v is not None}, ensure_ascii=False) or None,
                "is_active": True,
            })

    print(f"納品先: {len(records)}件")
    t = upsert("delivery_locations", "id", records)
    print(f"  → {t}件 upserted")


def import_products() -> None:
    """商品CSV → products テーブル"""
    records: list[dict[str, Any]] = []
    with open(r"Z:\商品ﾏｽﾀﾘｽﾄ.csv", "r", encoding="cp932", errors="replace") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            if len(row) < 50:
                continue
            code = row[0].strip()
            if not code:
                continue
            name = clean(row[3]) or clean(row[2])
            if not name:
                continue
            records.append({
                "id": str(uuid.uuid5(SAKE_UUID_NS, f"product:{code}")),
                "legacy_product_code": code,
                "product_code": code,
                "name": name,
                "kana_name": clean(row[1]),
                "short_name": clean(row[2]),
                "volume_ml": to_int(row[4]),
                "alcohol_degree": to_float(row[5]),
                "category_code": clean(row[8]),           # 製成コード
                "tax_code": clean(row[14]),                # 消費税区分コード
                "purchase_price": to_int(row[16]),         # 生産者価格
                "default_sale_price": to_int(row[18]),     # 卸売価格
                "list_price": to_int(row[20]),             # 小売価格
                "default_cost_price": to_int(row[22]),     # 原価
                "jan_code": parse_jan(row[47]),
                "bottle_type": clean(row[40]),             # 商品グループ2名 = 容器表示
                "container_code": clean(row[39]),          # 商品グループ2コード
                "spec": clean(row[7]),                     # 酒類名
                "unit_name": clean(row[13]),                # 商品区分名
                "season": clean(row[38]),                   # 商品グループ1名
                "rice_type": clean(row[9]),                 # 製成名
                "memo": json.dumps({k: v for k, v in {
                    "liquor_code": clean(row[6]), "liquor_name": clean(row[7]),
                    "sei_code": clean(row[8]), "sei_name": clean(row[9]),
                    "raw_code": clean(row[10]), "raw_name": clean(row[11]),
                    "cat_code": clean(row[12]), "cat_name": clean(row[13]),
                    "tax_code": clean(row[14]), "tax_name": clean(row[15]),
                    "grp1_code": clean(row[37]), "grp1_name": clean(row[38]),
                    "grp2_code": clean(row[39]), "grp2_name": clean(row[40]),
                    "cond_code": clean(row[41]), "cond_name": clean(row[42]),
                    "container_code2": clean(row[43]), "container_name2": clean(row[44]),
                    "stock_mgmt_code": clean(row[45]), "stock_mgmt_name": clean(row[46]),
                    "inv_mgmt_code": clean(row[48]), "inv_mgmt_name": clean(row[49]),
                    "case_qty": to_int(row[27]),
                    "weight_kg": to_float(row[24]),
                    "stock_price": to_int(row[50]),
                    "optimal_stock": to_int(row[51]),
                    "discontinued_code": clean(row[52]),
                    "discontinued_name": clean(row[53]) if len(row) > 53 else None,
                    "comment": clean(row[54]) if len(row) > 54 else None,
                }.items() if v is not None}, ensure_ascii=False) or None,
                "is_active": not (clean(row[53]) or "").startswith("終売") if len(row) > 53 else True,
                "updated_at": datetime.now(tz=UTC).isoformat(),
            })

    print(f"商品: {len(records)}件")
    t = upsert("products", "legacy_product_code", records)
    print(f"  → {t}件 upserted")


if __name__ == "__main__":
    print("=== CSVマスタインポート（全テーブル一括） ===")
    print()
    import_customers()
    import_suppliers()
    import_delivery_destinations()
    import_products()
    print()
    print("全マスタインポート完了")
