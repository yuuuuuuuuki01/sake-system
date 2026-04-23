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
                "staff_name": clean(row[10]),
                "business_type": clean(row[11]),
                "business_type_name": clean(row[12]),
                "delivery_area_code": clean(row[13]),
                "area_name": clean(row[14]),
                "sales_category_code": clean(row[15]),
                "sales_category_name": clean(row[16]) if len(row) > 16 else None,
                "customer_group1": clean(row[17]),
                "customer_group1_name": clean(row[18]) if len(row) > 18 else None,
                "customer_group2": clean(row[19]),
                "customer_group2_name": clean(row[20]) if len(row) > 20 else None,
                "price_group": clean(row[21]),
                "tax_calc_type": clean(row[22]),
                "tax_mode": clean(row[23]),
                "tax_round": clean(row[25]) if len(row) > 25 else None,
                "invoice_issue_type": clean(row[27]) if len(row) > 27 else None,
                "price_type": clean(row[28]),
                "closing_day": to_int(row[30]),
                "billing_code": clean(row[31]),
                "billing_name": clean(row[32]) if len(row) > 32 else None,
                "payment_type": clean(row[33]),
                "payment_type_name": clean(row[34]) if len(row) > 34 else None,
                "rebate_code": clean(row[35]) if len(row) > 35 else None,
                "payment_month": to_int(row[40]) if len(row) > 40 else None,
                "payment_day": to_int(row[41]) if len(row) > 41 else None,
                "comment": clean(row[42]) if len(row) > 42 else None,
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
                # 酒類
                "liquor_type_code": clean(row[6]),
                "liquor_type_name": clean(row[7]),
                "spec": clean(row[7]),
                # 製成
                "production_type_code": clean(row[8]),
                "production_type_name": clean(row[9]),
                "category_code": clean(row[8]),
                "rice_type": clean(row[9]),
                # 生/その他
                "raw_type_code": clean(row[10]),
                "raw_type_name": clean(row[11]) if len(row) > 11 else None,
                # 商品区分
                "product_type_code": clean(row[12]),
                "product_type_name": clean(row[13]) if len(row) > 13 else None,
                "unit_name": clean(row[13]) if len(row) > 13 else None,
                # 消費税区分
                "tax_code": clean(row[14]),
                "tax_category_name": clean(row[15]) if len(row) > 15 else None,
                # バラ価格
                "purchase_price": to_int(row[16]),
                "purchase_price_incl_tax": to_int(row[17]),
                "default_sale_price": to_int(row[18]),
                "sale_price_incl_tax": to_int(row[19]),
                "list_price": to_int(row[20]),
                "list_price_incl_tax": to_int(row[21]),
                "default_cost_price": to_int(row[22]),
                "cost_price_incl_tax": to_int(row[23]) if len(row) > 23 else None,
                "weight_kg": to_float(row[24]),
                # ケース
                "case_price_type": clean(row[26]) if len(row) > 26 else None,
                "case_qty": to_int(row[27]),
                "case_purchase_price": to_int(row[28]),
                "case_sale_price": to_int(row[30]),
                "case_list_price": to_int(row[32]),
                "case_cost_price": to_int(row[34]),
                "case_weight_kg": to_float(row[36]),
                # グループ
                "product_group1": clean(row[37]),
                "product_group1_name": clean(row[38]),
                "season": clean(row[38]),
                "product_group2": clean(row[39]),
                "product_group2_name": clean(row[40]),
                "bottle_type": clean(row[40]),
                "container_code": clean(row[39]),
                # 条件・容器
                "condition_code": clean(row[41]),
                "condition_name": clean(row[42]) if len(row) > 42 else None,
                "container_name": clean(row[44]) if len(row) > 44 else None,
                # 在庫
                "stock_process_type": clean(row[46]) if len(row) > 46 else None,
                "jan_code": parse_jan(row[47]),
                "stock_mgmt_type": clean(row[49]) if len(row) > 49 else None,
                "stock_price": to_int(row[50]) if len(row) > 50 else None,
                "optimal_stock": to_int(row[51]) if len(row) > 51 else None,
                # 終売
                "discontinued": clean(row[53]) if len(row) > 53 else None,
                "is_active": not (clean(row[53]) or "").startswith("終売") if len(row) > 53 else True,
                "comment": clean(row[54]) if len(row) > 54 else None,
                "updated_at": datetime.now(tz=UTC).isoformat(),
            })

    print(f"商品: {len(records)}件")
    t = upsert("products", "legacy_product_code", records)
    print(f"  → {t}件 upserted")


CHECKPOINT_PATH = BASE_DIR / ".csv_import_checkpoint.json"

CSV_FILES = {
    "customers": r"Z:\得意先ﾏｽﾀﾘｽﾄ.csv",
    "suppliers": r"Z:\仕入先ﾏｽﾀﾘｽﾄ.csv",
    "delivery": r"Z:\納品先ﾏｽﾀﾘｽﾄ.csv",
    "products": r"Z:\商品ﾏｽﾀﾘｽﾄ.csv",
}

IMPORTERS = {
    "customers": import_customers,
    "suppliers": import_suppliers,
    "delivery": import_delivery_destinations,
    "products": import_products,
}


def get_csv_mtimes() -> dict[str, float]:
    """各CSVファイルの最終更新時刻を取得。"""
    result: dict[str, float] = {}
    for key, path in CSV_FILES.items():
        p = Path(path)
        if p.exists():
            result[key] = p.stat().st_mtime
    return result


def load_checkpoint() -> dict[str, float]:
    if CHECKPOINT_PATH.exists():
        return json.loads(CHECKPOINT_PATH.read_text())
    return {}


def save_checkpoint(data: dict[str, float]) -> None:
    CHECKPOINT_PATH.write_text(json.dumps(data))


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="CSVマスタインポート")
    parser.add_argument("--force", action="store_true", help="変更チェックをスキップして全件投入")
    args = parser.parse_args()

    print("=== CSVマスタインポート ===")

    current_mtimes = get_csv_mtimes()
    prev_mtimes = {} if args.force else load_checkpoint()

    changed = []
    for key in CSV_FILES:
        cur = current_mtimes.get(key, 0)
        prev = prev_mtimes.get(key, 0)
        if cur != prev:
            changed.append(key)

    if not changed:
        print("全CSVファイルに変更なし — スキップ")
    else:
        print(f"変更検出: {changed}")
        print()
        for key in changed:
            if key in IMPORTERS:
                IMPORTERS[key]()

        save_checkpoint(current_mtimes)
        print()
        print("インポート完了")
