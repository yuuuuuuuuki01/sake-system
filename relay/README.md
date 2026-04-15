# 酒仙i → Supabase リレーエージェント

Windows の `WEB連動用PC_A` で 5 分ごとに実行し、LAN 上の酒仙iサーバーの Magic/eDeveloper データを Supabase に UPSERT するためのリレーです。`relay_agent.py` は ODBC 読み取りを優先し、失敗時は ISAM ファイルを直接解析します。

## 構成

- `relay_agent.py`: メイン同期処理
- `relay_config.json`: 設定テンプレート
- `parsers/magic_isam.py`: Magic ISAM バイナリ読み取り
- `parsers/odbc_reader.py`: ODBC 経由読み取り
- `setup_scheduler.bat`: タスクスケジューラ登録
- `requirements.txt`: 依存パッケージ
- `relay_log.txt`: 実行ログ
- `.last_run`: 前回成功時刻

## セットアップ手順

1. Python 3.10 以上をインストールします。
2. 管理者権限のコマンドプロンプトまたは PowerShell で `relay/` に移動し、`pip install -r requirements.txt` を実行します。
3. `relay_config.json` を編集し、`supabase_anon_key` と `z_drive_path` を実環境に合わせて設定します。
4. ODBC を使う場合は Magic ISAM ODBC ドライバをインストールし、Windows の「ODBC データ ソース アドミニストレーター」から DSN `MagicSake` を登録します。
5. DSN では酒仙iデータの配置先を `Z:\` に向け、アプリから参照するテーブル名が実データと一致することを確認します。
6. `setup_scheduler.bat` を管理者として実行し、5 分間隔の `SakeRelay` タスクを登録します。

## ODBC 設定の要点

- 32bit 版の Magic ドライバなら `C:\Windows\SysWOW64\odbcad32.exe` から DSN を作成します。
- 64bit 版ドライバなら通常の ODBC 管理ツールを使います。
- DSN 名は `relay_config.json` の `odbc_dsn` と一致させてください。
- `pyodbc` が未導入、DSN 未登録、接続失敗のいずれかの場合は ISAM 直接読み取りへフォールバックします。

## 動作概要

1. `relay_config.json` を読み込みます。
2. `Z:\` 以下から対象モジュールの `.DAT` / `.MST` を走査します。
3. `.last_run` より更新日時が新しいファイルだけを処理します。
4. ODBC で読めればそちらを使い、失敗時は `parsers/magic_isam.py` で直接読み込みます。
5. Supabase REST API に 100 件ずつ UPSERT します。
6. 成功時のみ `.last_run` を現在時刻に更新します。
7. 実行結果を `relay_log.txt` に追記します。

## ログ確認

- ログファイル: `relay_log.txt`
- 前回成功時刻: `.last_run`
- 手動実行: `python relay_agent.py`
- エラー時はログにスタックトレースを出力し、終了コード `1` で終了します。

## 補足

- 既知のファイル対応:
  - `SKDEN.DAT` → `sales_document_headers`
  - `SKHSK.DAT` → `customer_payment_status`
  - `SK2MM.MST` → `customers`
  - `H5SYO.MST` → `products`
- 未知ファイルはファイル名から推定したテーブル名へ送信し、ISAM 直接読み取り時は推定レイアウトで辞書化します。
