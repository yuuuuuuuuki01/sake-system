from __future__ import annotations

import json
import logging
import sys
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import requests

from parsers import MagicISAMReader, MagicODBCReader

BASE_DIR = Path(__file__).resolve().parent
CONFIG_PATH = BASE_DIR / "relay_config.json"
LAST_RUN_PATH = BASE_DIR / ".last_run"
LOG_PATH = BASE_DIR / "relay_log.txt"
BATCH_SIZE = 100

FILE_TABLE_MAP = {
    "SKDEN.DAT": "sales_document_headers",
    "SKHSK.DAT": "customer_payment_status",
    "SK2MM.MST": "customers",
    "H5SYO.MST": "products",
}

MODULE_PATTERNS = {
    "sk": ["SK*.DAT", "SK*.MST", "sk*.dat", "sk*.mst"],
    "sh": ["SH*.DAT", "SH*.MST", "sh*.dat", "sh*.mst"],
    "k5": ["K5*.DAT", "K5*.MST", "k5*.dat", "k5*.mst"],
    "h5": ["H5*.DAT", "H5*.MST", "h5*.dat", "h5*.mst"],
}


def setup_logging(level_name: str) -> logging.Logger:
    logger = logging.getLogger("relay_agent")
    logger.setLevel(getattr(logging, level_name.upper(), logging.INFO))
    logger.handlers.clear()

    handler = logging.FileHandler(LOG_PATH, encoding="utf-8")
    handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
    logger.addHandler(handler)
    return logger


def load_config() -> dict[str, Any]:
    with CONFIG_PATH.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def load_last_run() -> datetime:
    if not LAST_RUN_PATH.exists():
        return datetime.fromtimestamp(0, tz=UTC)
    value = LAST_RUN_PATH.read_text(encoding="utf-8").strip()
    if not value:
        return datetime.fromtimestamp(0, tz=UTC)
    return datetime.fromisoformat(value)


def save_last_run(now: datetime) -> None:
    LAST_RUN_PATH.write_text(now.isoformat(), encoding="utf-8")


def to_table_name(path: Path) -> str:
    return FILE_TABLE_MAP.get(path.name.upper(), path.stem.lower().replace("-", "_"))


def scan_candidate_files(root: Path, modules: list[str]) -> list[Path]:
    seen: set[Path] = set()
    candidates: list[Path] = []
    for module in modules:
        for pattern in MODULE_PATTERNS.get(module.lower(), []):
            for path in root.rglob(pattern):
                if path.is_file() and path not in seen:
                    seen.add(path)
                    candidates.append(path)
    return sorted(candidates)


def filter_updated_files(files: list[Path], last_run: datetime) -> list[Path]:
    updated: list[Path] = []
    for path in files:
        modified = datetime.fromtimestamp(path.stat().st_mtime, tz=UTC)
        if modified > last_run:
            updated.append(path)
    return updated


def batched(rows: list[dict[str, Any]], size: int) -> Any:
    for start in range(0, len(rows), size):
        yield rows[start : start + size]


def sanitize_record(record: dict[str, Any], source_path: Path) -> dict[str, Any]:
    sanitized: dict[str, Any] = {}
    for key, value in record.items():
        if isinstance(value, datetime):
            sanitized[key] = value.isoformat()
        else:
            sanitized[key] = value
    sanitized["_synced_at"] = datetime.now(tz=UTC).isoformat()
    sanitized["_source_path"] = str(source_path)
    sanitized["_source_file_mtime"] = datetime.fromtimestamp(source_path.stat().st_mtime, tz=UTC).isoformat()
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

    def upsert_rows(self, table_name: str, rows: list[dict[str, Any]]) -> None:
        endpoint = f"{self.base_url}/rest/v1/{table_name}"
        response = self.session.post(endpoint, json=rows, timeout=60)
        response.raise_for_status()


def read_via_odbc(dsn: str, files: list[Path], logger: logging.Logger) -> dict[str, list[dict[str, Any]]]:
    data: dict[str, list[dict[str, Any]]] = {}
    reader = MagicODBCReader(dsn)
    try:
        for path in files:
            table_name = to_table_name(path)
            logger.info("ODBC read start: %s -> %s", path.name, table_name)
            rows = reader.fetch_table(path.name)
            data.setdefault(table_name, []).extend(sanitize_record(row, path) for row in rows)
            logger.info("ODBC read complete: %s rows=%s", path.name, len(rows))
    finally:
        reader.close()
    return data


def read_via_isam(files: list[Path], logger: logging.Logger) -> dict[str, list[dict[str, Any]]]:
    data: dict[str, list[dict[str, Any]]] = {}
    for path in files:
        table_name = to_table_name(path)
        logger.info("ISAM read start: %s -> %s", path.name, table_name)
        with MagicISAMReader(path) as reader:
            rows = [sanitize_record(record, path) for record in reader.read_records()]
        data.setdefault(table_name, []).extend(rows)
        logger.info("ISAM read complete: %s rows=%s", path.name, len(rows))
    return data


def sync_to_supabase(client: SupabaseClient, table_rows: dict[str, list[dict[str, Any]]], logger: logging.Logger) -> int:
    total_rows = 0
    for table_name, rows in table_rows.items():
        if not rows:
            logger.info("Skip UPSERT: table=%s rows=0", table_name)
            continue
        for batch in batched(rows, BATCH_SIZE):
            client.upsert_rows(table_name, batch)
            total_rows += len(batch)
            logger.info("UPSERT complete: table=%s batch_rows=%s", table_name, len(batch))
    return total_rows


def run() -> int:
    logger = setup_logging("INFO")

    try:
        config = load_config()
        logger = setup_logging(config.get("log_level", "INFO"))
        now = datetime.now(tz=UTC)
        z_drive_path = Path(config["z_drive_path"])
        last_run = load_last_run()
        modules = config.get("sync_modules", [])

        logger.info("Relay start: modules=%s last_run=%s", ",".join(modules), last_run.isoformat())
        files = scan_candidate_files(z_drive_path, modules)
        updated_files = filter_updated_files(files, last_run)
        logger.info("Scan complete: candidates=%s updated=%s", len(files), len(updated_files))

        if not updated_files:
            logger.info("No updated files detected")
            save_last_run(now)
            return 0

        table_rows: dict[str, list[dict[str, Any]]]
        if config.get("use_odbc", True):
            try:
                table_rows = read_via_odbc(config["odbc_dsn"], updated_files, logger)
            except Exception as exc:
                logger.warning("ODBC read failed, fallback to ISAM: %s", exc)
                table_rows = read_via_isam(updated_files, logger)
        else:
            table_rows = read_via_isam(updated_files, logger)

        client = SupabaseClient(config["supabase_url"], config["supabase_anon_key"])
        total_rows = sync_to_supabase(client, table_rows, logger)
        save_last_run(now)
        logger.info("Relay success: files=%s rows=%s", len(updated_files), total_rows)
        return 0
    except Exception:
        logger.exception("Relay failed")
        return 1


if __name__ == "__main__":
    sys.exit(run())
