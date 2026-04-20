"""マスタファイル(SHTKI.MST/SHSYO.MST)の差分検出デコーダ。

前回スナップショットとファイルのmtimeを比較し、
変更があれば既存のデコーダを実行する。
スナップショットにはファイルのmtimeとサイズを保存。
"""
from __future__ import annotations

import json
import logging
import os
import pickle
import subprocess
import sys
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parent
LOCAL_CONFIG_PATH = BASE_DIR / "relay_config.local.json"
CONFIG_PATH = BASE_DIR / "relay_config.json"
LOG_PATH = BASE_DIR / "relay_log.txt"
SNAPSHOT_PATH = BASE_DIR / ".master_snapshot"


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("decoder_master_diff")
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


def get_file_info(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"mtime": 0, "size": 0}
    stat = path.stat()
    return {"mtime": stat.st_mtime, "size": stat.st_size}


def main() -> int:
    logger = setup_logging()
    config = load_config()
    z_drive = Path(config["z_drive_path"])

    masters = {
        "customers": {
            "file": z_drive / "sh" / "mst" / "SHTKI.MST",
            "command": ["python", str(BASE_DIR / "decoder_customers.py")],
        },
        "products": {
            "file": z_drive / "sh" / "mst" / "SHSYO.MST",
            "command": ["python", str(BASE_DIR / "decoder_products.py"), "--from-file"],
        },
    }

    # スナップショット読み込み
    old_snapshot: dict[str, dict] = {}
    if SNAPSHOT_PATH.exists():
        with SNAPSHOT_PATH.open("rb") as f:
            old_snapshot = pickle.load(f)

    new_snapshot: dict[str, dict] = {}
    changed = []

    for name, info in masters.items():
        file_info = get_file_info(info["file"])
        new_snapshot[name] = file_info

        old_info = old_snapshot.get(name, {"mtime": 0, "size": 0})
        if file_info["mtime"] != old_info["mtime"] or file_info["size"] != old_info["size"]:
            changed.append(name)
            logger.info("%s changed: mtime %s→%s size %s→%s",
                        name, old_info["mtime"], file_info["mtime"],
                        old_info["size"], file_info["size"])

    if not changed:
        logger.info("No master file changes detected")
        with SNAPSHOT_PATH.open("wb") as f:
            pickle.dump(new_snapshot, f)
        return 0

    # 変更があったマスタのデコーダを実行
    for name in changed:
        cmd = masters[name]["command"]
        logger.info("Running decoder for %s: %s", name, " ".join(cmd))
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300, cwd=str(BASE_DIR))
        if result.returncode != 0:
            logger.error("%s decoder failed: %s", name, result.stderr[:300])
        else:
            logger.info("%s decoder completed", name)

    # スナップショット更新
    with SNAPSHOT_PATH.open("wb") as f:
        pickle.dump(new_snapshot, f)

    logger.info("Master diff check complete: %s updated", ", ".join(changed))
    return 0


if __name__ == "__main__":
    sys.exit(main())
