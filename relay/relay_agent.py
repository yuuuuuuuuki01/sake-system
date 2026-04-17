from __future__ import annotations

import argparse
import json
import logging
import sys
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import requests

from parsers import MagicISAMReader, MagicODBCReader

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LAST_RUN_PATH = BASE_DIR / ".last_run.json"
LOG_PATH = BASE_DIR / "relay_log.txt"
DEFAULT_BATCH_SIZE = 500

# 業務で同期が必要と確認済みの対象ファイル (相対パス、Z_DRIVE_PATH からの)
# 酒仙iの画面機能と対応づけて決定済みの対象のみ。
DEFAULT_SYNC_TARGETS: list[str] = [
    # 1. 取引先マスタ
    "sk/mst/SKTRI.MST",
    # 2. 得意先マスタ
    "sh/mst/SHTKI.MST",
    # 3. 納品先マスタ
    "sh/mst/SHNOU.MST",
    # 4. 仕入先マスタ
    "h5/mst/H5TKI.MST",
    # 5. 商品マスタ (モジュール毎に別属性)
    "sk/mst/SKSYO.MST",
    "k5/mst/K5SYO.MST",
    "h5/mst/H5SYO.MST",
    "sh/mst/SHSYO.MST",
    # 6. 特定単価
    "sh/mst/SHTAN.MST",
    "h5/mst/H5TAN.MST",
    # 7. 売上伝票
    "sh/dat/SHDEN.DAT",
    "h5/dat/H5DEN.DAT",
    # 8. 売上明細
    "sh/dat/SHTOR.DAT",
    "h5/dat/H5TOR.DAT",
    # 9. 移動簿 (400割水 もこの中に含まれる)
    "sk/dat/SKIDO.DAT",
    "k5/dat/K5IDO.DAT",
    # 10. 現在酒
    "sh/dat/sHZAI.DAT",
    "h5/dat/H5ZAI.DAT",
    "sk/dat/SKZAI.DAT",
]

# ファイル名 -> Supabase テーブル名 (全テーブル sake_ プレフィクス付きで衝突回避)
FILE_TABLE_MAP: dict[str, str] = {
    "SKTRI.MST": "sake_trading_partners",
    "SHTKI.MST": "sake_customers",
    "SHNOU.MST": "sake_delivery_destinations",
    "H5TKI.MST": "sake_suppliers",
    "SKSYO.MST": "sake_products_sk",
    "K5SYO.MST": "sake_products_k5",
    "H5SYO.MST": "sake_products_h5",
    "SHSYO.MST": "sake_products_sh",
    "SHTAN.MST": "sake_special_prices_sh",
    "H5TAN.MST": "sake_special_prices_h5",
    "SHDEN.DAT": "sake_sales_document_headers",
    "H5DEN.DAT": "sake_purchase_document_headers",
    "SHTOR.DAT": "sake_sales_document_lines",
    "H5TOR.DAT": "sake_purchase_document_lines",
    "SKIDO.DAT": "sake_inventory_movements_sk",
    "K5IDO.DAT": "sake_inventory_movements_k5",
    "SHZAI.DAT": "sake_current_stock_sh",
    "H5ZAI.DAT": "sake_current_stock_h5",
    "SKZAI.DAT": "sake_current_stock_sk",
}

# レイアウトを検証済みでフィールド展開に耐えうるファイル。
# 現時点ではゼロ（レイアウトがすべて要再検証のため）。
# 確定したら "SKTRI.MST" のようにセットする。
LAYOUT_VERIFIED: set[str] = set()


def setup_logging(level_name: str) -> logging.Logger:
    logger = logging.getLogger("relay_agent")
    logger.setLevel(getattr(logging, level_name.upper(), logging.INFO))
    logger.handlers.clear()

    handler = logging.FileHandler(LOG_PATH, encoding="utf-8")
    handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(handler)

    stream = logging.StreamHandler()
    stream.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(stream)
    return logger


def load_config() -> dict[str, Any]:
    # ローカル設定（secret等を含む、git管理外）が存在すれば優先
    path = LOCAL_CONFIG_PATH if LOCAL_CONFIG_PATH.exists() else CONFIG_PATH
    with path.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def load_checkpoints() -> dict[str, str]:
    """ファイル単位のチェックポイント ({source_file: mtime_iso}) をロード。"""
    if not LAST_RUN_PATH.exists():
        return {}
    try:
        raw = LAST_RUN_PATH.read_text(encoding="utf-8").strip()
        if not raw:
            return {}
        data = json.loads(raw)
        if isinstance(data, dict):
            return data
    except Exception:
        pass
    return {}


def save_checkpoints(checkpoints: dict[str, str]) -> None:
    LAST_RUN_PATH.write_text(json.dumps(checkpoints, ensure_ascii=False, indent=2), encoding="utf-8")


def to_table_name(path: Path) -> str:
    key = path.name.upper()
    if key in FILE_TABLE_MAP:
        return FILE_TABLE_MAP[key]
    # fallback: stem を lower case に正規化
    return path.stem.lower().replace("-", "_")


def resolve_targets(z_drive_path: Path, targets: list[str]) -> list[Path]:
    """設定された相対パスリストを絶対パスに解決し、存在確認する。"""
    resolved: list[Path] = []
    for rel in targets:
        candidate = (z_drive_path / rel).resolve()
        if candidate.exists() and candidate.is_file():
            resolved.append(candidate)
        else:
            # 大文字小文字違いを許容してリトライ
            parent = (z_drive_path / rel).parent
            target_name = Path(rel).name.lower()
            if parent.exists():
                for p in parent.iterdir():
                    if p.name.lower() == target_name and p.is_file():
                        resolved.append(p.resolve())
                        break
    return resolved


def batched(rows: list[dict[str, Any]], size: int) -> Any:
    for start in range(0, len(rows), size):
        yield rows[start : start + size]


def sanitize_record(
    record: dict[str, Any],
    source_path: Path,
    source_mtime_iso: str,
    synced_at_iso: str,
) -> dict[str, Any]:
    """レコードに同期メタ情報を付加。mtime / synced_at は呼び出し側で
    事前計算し、レコード毎の stat() を避ける（旧実装のI/Oボトルネック対策）。"""
    sanitized: dict[str, Any] = {}
    for key, value in record.items():
        if isinstance(value, datetime):
            sanitized[key] = value.isoformat()
        else:
            sanitized[key] = value
    sanitized["_synced_at"] = synced_at_iso
    sanitized["_source_path"] = str(source_path)
    sanitized["_source_file_mtime"] = source_mtime_iso
    return sanitized


class SupabaseClient:
    def __init__(self, url: str, anon_key: str) -> None:
        self.base_url = url.rstrip("/")
        self.session = requests.Session()
        self.session.headers.update(
            {
                "apikey": anon_key,
                "Authorization": f"Bearer {anon_key}",
                "Content-Type": "application/json",
                "Prefer": "resolution=merge-duplicates",
            }
        )

    def upsert_rows(self, table_name: str, rows: list[dict[str, Any]], max_retries: int = 3) -> None:
        endpoint = f"{self.base_url}/rest/v1/{table_name}"
        import time
        for attempt in range(max_retries):
            try:
                response = self.session.post(endpoint, json=rows, timeout=120)
                response.raise_for_status()
                return
            except requests.exceptions.HTTPError as exc:
                status = exc.response.status_code if exc.response is not None else 0
                if status in (502, 503, 504, 429) and attempt < max_retries - 1:
                    wait = 2 ** (attempt + 1)  # 2s, 4s, 8s
                    time.sleep(wait)
                    continue
                raise


class DryRunClient:
    """Supabaseに送らず、サマリだけ表示する動作確認用クライアント。"""

    def __init__(self, logger: logging.Logger) -> None:
        self.logger = logger
        self.total_by_table: dict[str, int] = {}

    def upsert_rows(self, table_name: str, rows: list[dict[str, Any]]) -> None:
        self.total_by_table[table_name] = self.total_by_table.get(table_name, 0) + len(rows)
        # 最初の1件の構造を見せる
        if rows:
            sample = rows[0]
            self.logger.info(
                "[DRY-RUN] would upsert table=%s rows=%s sample_keys=%s b64_len=%s",
                table_name,
                len(rows),
                list(sample.keys()),
                len(sample.get("_raw_b64", "")),
            )


def sync_single_file(
    path: Path,
    client: SupabaseClient | DryRunClient,
    batch_size: int,
    logger: logging.Logger,
) -> tuple[int, int]:
    """1ファイルをストリーミング同期する。
    - 逐次読み込み → バッチ貯めが閾値超えたらUPSERT → メモリ解放
    - 戻り値: (total_rows_synced, total_slots_read)
    戻るまでメモリにバッファするのは最大 batch_size レコードのみ。
    """
    table_name = to_table_name(path)
    mtime_iso = datetime.fromtimestamp(path.stat().st_mtime, tz=UTC).isoformat()
    synced_at_iso = datetime.now(tz=UTC).isoformat()

    use_layout = path.name.upper() in LAYOUT_VERIFIED

    logger.info(
        "Sync start: %s -> %s (layout=%s)",
        path.name,
        table_name,
        "verified" if use_layout else "raw-preserve",
    )

    buffer: list[dict[str, Any]] = []
    total_synced = 0
    total_slots = 0

    with MagicISAMReader(path, use_layout=use_layout) as reader:
        for record in reader.read_records():
            total_slots += 1
            buffer.append(sanitize_record(record, path, mtime_iso, synced_at_iso))
            if len(buffer) >= batch_size:
                client.upsert_rows(table_name, buffer)
                total_synced += len(buffer)
                logger.info(
                    "UPSERT: %s batch=%s total=%s",
                    table_name,
                    len(buffer),
                    total_synced,
                )
                buffer.clear()

        if buffer:
            client.upsert_rows(table_name, buffer)
            total_synced += len(buffer)
            logger.info("UPSERT: %s final_batch=%s total=%s", table_name, len(buffer), total_synced)
            buffer.clear()

    logger.info(
        "Sync complete: %s rows=%s (active records; slot scan=%s)",
        path.name,
        total_synced,
        total_slots,
    )
    return total_synced, total_slots


def run(dry_run: bool = False, only: list[str] | None = None, force: bool = False, batch_size_override: int | None = None) -> int:
    logger = setup_logging("INFO")

    try:
        config = load_config()
        logger = setup_logging(config.get("log_level", "INFO"))
        z_drive_path = Path(config["z_drive_path"])
        batch_size = batch_size_override or int(config.get("batch_size", DEFAULT_BATCH_SIZE))

        # 対象ファイルリスト: CLI の --only > config の sync_targets > デフォルト
        if only:
            target_list = only
        else:
            target_list = config.get("sync_targets") or DEFAULT_SYNC_TARGETS
        all_targets = resolve_targets(z_drive_path, target_list)

        checkpoints = load_checkpoints()
        logger.info(
            "Relay start: targets=%s/%s checkpoints=%s dry_run=%s force=%s",
            len(all_targets),
            len(target_list),
            len(checkpoints),
            dry_run,
            force,
        )

        # 各ファイルの mtime を前回と比較し、変更があるものだけ処理
        to_sync: list[Path] = []
        for path in all_targets:
            mtime_iso = datetime.fromtimestamp(path.stat().st_mtime, tz=UTC).isoformat()
            prev = checkpoints.get(path.name.upper())
            if prev == mtime_iso and not force:
                logger.info("Skip unchanged: %s (mtime=%s)", path.name, mtime_iso)
                continue
            to_sync.append(path)

        if not to_sync:
            logger.info("No changes detected")
            return 0

        client: SupabaseClient | DryRunClient
        if dry_run:
            client = DryRunClient(logger)
        else:
            client = SupabaseClient(config["supabase_url"], config["supabase_anon_key"])

        total_rows = 0
        errors: list[tuple[str, str]] = []
        for path in to_sync:
            try:
                synced, _slots = sync_single_file(path, client, batch_size, logger)
                total_rows += synced
                # ファイル単位でチェックポイント保存（途中失敗しても次回スキップ可能）
                # dry-run 時は checkpoint を更新しない
                if not dry_run:
                    mtime_iso = datetime.fromtimestamp(path.stat().st_mtime, tz=UTC).isoformat()
                    checkpoints[path.name.upper()] = mtime_iso
                    save_checkpoints(checkpoints)
            except Exception as exc:
                logger.exception("Sync failed: %s -> %s", path.name, exc)
                errors.append((path.name, str(exc)))
                # このファイルは checkpoint 更新せず次回リトライ
                continue

        logger.info(
            "Relay finished: processed=%s rows=%s errors=%s",
            len(to_sync),
            total_rows,
            len(errors),
        )
        if errors:
            for name, err in errors:
                logger.warning("  - %s: %s", name, err)
            return 2
        return 0
    except Exception:
        logger.exception("Relay failed catastrophically")
        return 1


def main() -> int:
    parser = argparse.ArgumentParser(description="酒仙i → Supabase リレーエージェント")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Supabaseに書き込まず、送る内容のサマリのみ表示",
    )
    parser.add_argument(
        "--only",
        nargs="+",
        metavar="REL_PATH",
        help="指定した相対パス(複数可)のみ対象にする。例: sk/mst/SKTRI.MST",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="チェックポイントを無視して強制再同期",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=0,
        metavar="N",
        help="UPSERTバッチサイズ (既定: config値 or 500)",
    )
    args = parser.parse_args()
    return run(dry_run=args.dry_run, only=args.only, force=args.force, batch_size_override=args.batch_size or None)


if __name__ == "__main__":
    sys.exit(main())
