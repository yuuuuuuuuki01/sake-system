"""
得意先マスタの住所から緯度・経度を取得して customers テーブルを更新する。

使用API: OpenStreetMap Nominatim（無料・APIキー不要）
  利用規約: https://operations.osmfoundation.org/policies/nominatim/
  レート制限: 1リクエスト/秒

実行方法:
  python geocode_customers.py          # 未ジオコーディングのみ
  python geocode_customers.py --all    # 全件再取得
"""
from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path

import requests

sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG = BASE_DIR / "relay_config.local.json"
CONFIG = BASE_DIR / "relay_config.json"
config = json.loads((LOCAL_CONFIG if LOCAL_CONFIG.exists() else CONFIG).read_text())

url = config["supabase_url"].rstrip("/")
session = requests.Session()
session.headers.update({
    "apikey": config["supabase_anon_key"],
    "Authorization": f"Bearer {config['supabase_anon_key']}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal",
})

NOM_SESSION = requests.Session()
NOM_SESSION.headers.update({
    "User-Agent": "KaneiShuzo-SakeSystem/1.0 (matsuzaki@kaneishuzo.co.jp)"
})


def fetch_customers(only_missing: bool) -> list[dict]:
    params = {
        "select": "id,legacy_customer_code,name,address1,postal_code,lat,lng",
        "is_active": "eq.true",
        "limit": "2000",
    }
    if only_missing:
        params["lat"] = "is.null"
    resp = session.get(f"{url}/rest/v1/customers", params=params, timeout=30)
    resp.raise_for_status()
    return resp.json()


def _nominatim(query: str) -> tuple[float, float] | None:
    try:
        r = NOM_SESSION.get(
            "https://nominatim.openstreetmap.org/search",
            params={"q": query, "format": "json", "limit": 1, "countrycodes": "jp"},
            timeout=10,
        )
        data = r.json()
        if data:
            return float(data[0]["lat"]), float(data[0]["lon"])
    except Exception as e:
        print(f"  geocode error: {e}")
    return None


def geocode(address: str, postal: str = "") -> tuple[float, float] | None:
    """住所→(lat, lng)。詳細住所で失敗したら段階的に短くして再試行。"""
    import re

    # 1. 全住所で試す
    result = _nominatim(address)
    if result:
        return result
    time.sleep(0.5)

    # 2. 番地・部屋番号を削除して市区町村レベルで試す
    #    例: 神奈川県相模原市南区古淵2-10-1 → 神奈川県相模原市南区古淵
    trimmed = re.sub(r"[\d\-ー－]+[号棟階室F号室]*$", "", address).strip()
    trimmed = re.sub(r"\s?\d+.*$", "", trimmed).strip()
    if trimmed and trimmed != address:
        result = _nominatim(trimmed)
        if result:
            return result
        time.sleep(0.5)

    # 3. 郵便番号で試す
    if postal:
        result = _nominatim(f"{postal} 日本")
        if result:
            return result

    return None


def update_lat_lng(customer_id: str, lat: float, lng: float) -> bool:
    resp = session.patch(
        f"{url}/rest/v1/customers?id=eq.{customer_id}",
        json={"lat": lat, "lng": lng},
        timeout=15,
    )
    return resp.ok


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="全件再ジオコーディング")
    args = parser.parse_args()

    customers = fetch_customers(only_missing=not args.all)
    print(f"対象: {len(customers)} 件")

    ok = skip = fail = 0
    for i, c in enumerate(customers, 1):
        addr = (c.get("address1") or "").strip()
        postal = (c.get("postal_code") or "").strip()
        name = c.get("name", "")
        cid = c["id"]

        # 住所がない場合はスキップ
        if not addr and not postal:
            skip += 1
            continue

        # 検索クエリ: 住所が優先、なければ郵便番号
        query = addr if addr else f"〒{postal} 日本"

        print(f"[{i}/{len(customers)}] {name} / {addr[:30]}", end=" ... ", flush=True)
        result = geocode(addr, postal)

        if result:
            lat, lng = result
            if update_lat_lng(cid, lat, lng):
                print(f"OK ({lat:.4f}, {lng:.4f})")
                ok += 1
            else:
                print("UPDATE FAIL")
                fail += 1
        else:
            print("NOT FOUND")
            fail += 1

        # Nominatim レート制限: 1秒に1件
        time.sleep(1.1)

    print(f"\n完了: 成功={ok}, スキップ={skip}, 失敗={fail}")
    print("マップを確認するには Supabase マテリアライズドビューをリフレッシュしてください。")


if __name__ == "__main__":
    main()
