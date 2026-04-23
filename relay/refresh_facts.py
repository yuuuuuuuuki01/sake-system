"""daily_sales_fact を再集計する（RPC経由）。

import_urikake.py の後に実行し、ダッシュボードKPIを最新化する。
Supabase の refresh_daily_sales_fact() 関数を呼び出す。
"""
from __future__ import annotations

import json
import logging
import sys
from pathlib import Path
from typing import Any

import requests

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("refresh_facts")
    logger.setLevel(logging.INFO)
    logger.handlers.clear()
    h = logging.StreamHandler()
    h.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(h)
    fh = logging.FileHandler(LOG_PATH, encoding="utf-8")
    fh.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(fh)
    return logger


def load_config() -> dict[str, Any]:
    path = LOCAL_CONFIG_PATH if LOCAL_CONFIG_PATH.exists() else CONFIG_PATH
    with path.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def main() -> int:
    logger = setup_logging()
    config = load_config()

    url = config["supabase_url"].rstrip("/")
    headers = {
        "apikey": config["supabase_anon_key"],
        "Authorization": f"Bearer {config['supabase_anon_key']}",
        "Content-Type": "application/json",
    }

    logger.info("Refreshing daily_sales_fact via RPC...")

    resp = requests.post(
        f"{url}/rest/v1/rpc/refresh_daily_sales_fact",
        json={},
        headers=headers,
        timeout=120,
    )

    if not resp.ok:
        logger.error("Failed: %s %s", resp.status_code, resp.text[:300])
        return 1

    logger.info("daily_sales_fact refreshed successfully")
    return 0


if __name__ == "__main__":
    sys.exit(main())
