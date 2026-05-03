"""
print_agent.py - モバイル受注 自動印刷エージェント（事務所PC常駐）

概要:
  スマホから送信されたモバイル受注 (channel='mobile', status='new') を
  Supabase にポーリングし、新規受注を検知したら事務所プリンターへ自動印刷する。

使い方:
  python print_agent.py                         # デフォルトプリンター、15秒間隔
  python print_agent.py --printer "EPSON TM-T" # プリンター名を指定
  python print_agent.py --interval 10           # チェック間隔を10秒に変更
  python print_agent.py --dry-run               # 印刷せず内容をコンソール表示

依存:
  pip install requests
  pip install pywin32    # Windows 印刷に必要（win32api / win32print）

設定:
  relay_config.json または relay_config.local.json に
  supabase_url と supabase_anon_key が必要（relay_agent.py と共用）
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import sys
import tempfile
import time
from datetime import datetime
from pathlib import Path

import requests

BASE_DIR = Path(__file__).resolve().parent
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
PRINTED_PATH = BASE_DIR / ".printed_orders.json"
LOG_PATH = BASE_DIR / "print_agent_log.txt"


# ─────────────────────────────────────────────
# 設定ロード
# ─────────────────────────────────────────────

def load_config() -> dict:
    cfg: dict = {}
    if CONFIG_PATH.exists():
        cfg.update(json.loads(CONFIG_PATH.read_text("utf-8")))
    if LOCAL_CONFIG_PATH.exists():
        cfg.update(json.loads(LOCAL_CONFIG_PATH.read_text("utf-8")))
    return cfg


# ─────────────────────────────────────────────
# 印刷済み記録（重複印刷防止）
# ─────────────────────────────────────────────

def load_printed() -> set[str]:
    if PRINTED_PATH.exists():
        return set(json.loads(PRINTED_PATH.read_text("utf-8")))
    return set()


def save_printed(printed: set[str]) -> None:
    ids = list(printed)[-1000:]  # 最大1000件保持
    PRINTED_PATH.write_text(json.dumps(ids), encoding="utf-8")


# ─────────────────────────────────────────────
# Supabase REST API
# ─────────────────────────────────────────────

def _headers(config: dict) -> dict:
    key = config["supabase_anon_key"]
    return {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Accept": "application/json",
    }


def fetch_new_orders(config: dict, logger: logging.Logger) -> list[dict]:
    """channel='mobile', status='new' の受注を取得（古い順）"""
    url = config["supabase_url"].rstrip("/") + "/rest/v1/store_orders"
    params = {
        "status": "eq.new",
        "channel": "eq.mobile",
        "order": "created_at.asc",
        "select": "*",
    }
    try:
        resp = requests.get(url, headers=_headers(config), params=params, timeout=15)
        if resp.ok:
            return resp.json()
        logger.warning(f"fetch_new_orders HTTP {resp.status_code}: {resp.text[:200]}")
        return []
    except Exception as e:
        logger.error(f"fetch_new_orders: {e}")
        return []


def fetch_order_lines(config: dict, order_id: str, logger: logging.Logger) -> list[dict]:
    """受注明細を取得"""
    url = config["supabase_url"].rstrip("/") + "/rest/v1/store_order_lines"
    params = {
        "order_id": f"eq.{order_id}",
        "order": "line_no.asc",
        "select": "*",
    }
    try:
        resp = requests.get(url, headers=_headers(config), params=params, timeout=15)
        if resp.ok:
            return resp.json()
        return []
    except Exception as e:
        logger.error(f"fetch_order_lines: {e}")
        return []


def mark_order_processing(config: dict, order_id: str, logger: logging.Logger) -> None:
    """受注ステータスを processing に更新（再印刷防止）"""
    url = config["supabase_url"].rstrip("/") + f"/rest/v1/store_orders?id=eq.{order_id}"
    hdrs = {**_headers(config), "Content-Type": "application/json", "Prefer": "return=minimal"}
    try:
        requests.patch(url, headers=hdrs, json={"status": "processing"}, timeout=15)
    except Exception as e:
        logger.error(f"mark_order_processing: {e}")


# ─────────────────────────────────────────────
# 伝票テキスト生成
# ─────────────────────────────────────────────

def build_receipt_text(order: dict, lines: list[dict]) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    order_no = order.get("order_no", "")
    order_date = order.get("order_date", "")
    customer = order.get("customer_name", "")
    customer_code = order.get("legacy_customer_code") or ""
    remarks = order.get("remarks") or ""
    total = int(order.get("total_amount") or 0)

    sep = "─" * 44
    lines_str = ""
    for l in lines:
        name = str(l.get("product_name") or "")[:20]
        qty = int(l.get("quantity") or 0)
        amt = int(l.get("amount") or 0)
        lines_str += f"  {name:<20}  {qty:>4}本  ¥{amt:>9,}\n"

    return (
        "\n"
        "============================================\n"
        "         金 井 酒 造 店  受 注 伝 票\n"
        "============================================\n"
        f"伝票番号 : {order_no}\n"
        f"受注日付 : {order_date}\n"
        f"印刷日時 : {now}\n"
        f"{sep}\n"
        f"得意先   : {customer}\n"
        f"コード   : {customer_code}\n"
        f"{sep}\n"
        f"商品名                         数量       金額\n"
        f"{sep}\n"
        f"{lines_str}"
        f"{sep}\n"
        f"合  計                              ¥{total:>9,}\n"
        f"{sep}\n"
        f"備考 : {remarks}\n"
        "============================================\n"
        "   【モバイル受注 — 内容確認の上で処理してください】\n"
        "============================================\n"
        "\n\n\n"  # 用紙送り
    )


# ─────────────────────────────────────────────
# Windows 印刷
# ─────────────────────────────────────────────

def print_text_windows(text: str, printer_name: str | None, logger: logging.Logger) -> bool:
    """テキストをWindowsプリンターへ送る。win32api がない場合はコンソール出力。"""
    try:
        import win32api  # type: ignore
        import win32print  # type: ignore

        target = printer_name or win32print.GetDefaultPrinter()
        logger.info(f"印刷先: {target}")

        # UTF-8 → CP932 変換して一時ファイルへ書き出し
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".txt", encoding="cp932",
            delete=False, errors="replace"
        ) as f:
            f.write(text)
            tmp_path = f.name

        win32api.ShellExecute(
            0, "print", tmp_path, f'/d:"{target}"', ".", 0
        )
        time.sleep(4)  # ShellExecute は非同期なので少し待ってから削除
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        return True

    except ImportError:
        logger.warning("pywin32 が見つかりません。コンソールに出力します。")
        print(text)
        return True
    except Exception as e:
        logger.error(f"印刷エラー: {e}")
        return False


# ─────────────────────────────────────────────
# メインループ
# ─────────────────────────────────────────────

def run_agent(
    config: dict,
    printer_name: str | None,
    interval: int,
    logger: logging.Logger,
) -> None:
    printed = load_printed()
    logger.info(
        f"Print agent 起動。間隔={interval}秒 / プリンター={printer_name or 'デフォルト'}"
    )
    logger.info(f"印刷済み件数（起動時）: {len(printed)}")

    while True:
        orders = fetch_new_orders(config, logger)
        for order in orders:
            oid = str(order.get("id", ""))
            if not oid or oid in printed:
                continue

            order_no = order.get("order_no", "")
            customer = order.get("customer_name", "")
            logger.info(f"新規受注検知: {order_no} / {customer}")

            lines = fetch_order_lines(config, oid, logger)
            text = build_receipt_text(order, lines)
            ok = print_text_windows(text, printer_name, logger)

            if ok:
                printed.add(oid)
                save_printed(printed)
                mark_order_processing(config, oid, logger)
                logger.info(f"印刷・ステータス更新完了: {order_no}")
            else:
                logger.error(f"印刷失敗（次回リトライ）: {order_no}")

        time.sleep(interval)


# ─────────────────────────────────────────────
# エントリーポイント
# ─────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="モバイル受注 自動印刷エージェント")
    parser.add_argument(
        "--printer", default=None,
        help="プリンター名（省略時はWindowsデフォルトプリンター）"
    )
    parser.add_argument(
        "--interval", type=int, default=15,
        help="ポーリング間隔（秒） default=15"
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="印刷せず伝票テキストをコンソールに表示してテスト終了"
    )
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler(LOG_PATH, encoding="utf-8"),
            logging.StreamHandler(sys.stdout),
        ],
    )
    logger = logging.getLogger("print_agent")

    config = load_config()
    if "supabase_url" not in config or "supabase_anon_key" not in config:
        logger.error(
            "relay_config.json に supabase_url / supabase_anon_key が見つかりません。"
        )
        sys.exit(1)

    if args.dry_run:
        logger.info("=== DRY RUN ===")
        orders = fetch_new_orders(config, logger)
        if not orders:
            logger.info("未処理の受注はありません。")
            return
        for o in orders:
            lines = fetch_order_lines(config, o["id"], logger)
            print(build_receipt_text(o, lines))
        return

    run_agent(config, args.printer, args.interval, logger)


if __name__ == "__main__":
    main()
