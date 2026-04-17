# 酒仙i → Supabase リレーエージェント

Windows の `WEB連動用PC_A` で定期実行し、LAN 上の酒仙iサーバー (Magic/eDeveloper ISAM) の業務データを Supabase にストリーム UPSERT するリレーです。

## 同期対象

業務観点で必要なマスタ・伝票データのみに限定しています (酒仙iの画面機能と対応づけ済み)。

| 業務 | ファイル |
|---|---|
| 取引先マスタ | `sk/mst/SKTRI.MST` |
| 得意先マスタ | `sh/mst/SHTKI.MST` |
| 納品先マスタ | `sh/mst/SHNOU.MST` |
| 仕入先マスタ | `h5/mst/H5TKI.MST` |
| 商品マスタ (モジュール毎) | `sk/mst/SKSYO.MST`, `k5/mst/K5SYO.MST`, `h5/mst/H5SYO.MST`, `sh/mst/SHSYO.MST` |
| 特定単価 | `sh/mst/SHTAN.MST`, `h5/mst/H5TAN.MST` |
| 売上伝票 | `sh/dat/SHDEN.DAT`, `h5/dat/H5DEN.DAT` |
| 売上明細 | `sh/dat/SHTOR.DAT`, `h5/dat/H5TOR.DAT` |
| 移動簿 (割水含む) | `sk/dat/SKIDO.DAT`, `k5/dat/K5IDO.DAT` |
| 現在酒 | `sh/dat/sHZAI.DAT`, `h5/dat/H5ZAI.DAT`, `sk/dat/SKZAI.DAT` |

対象の追加・変更は `relay_config.local.json` の `sync_targets` で上書き可能です。

## データ保存方針 (raw-preserve)

Magic ISAM のレコードフォーマットは B-Tree 構造で、スロット内部にインデックスノードと実データノードが混在します。正しいフィールド展開を行うには対象ファイルごとのレイアウト検証が必要ですが、まずは **データを失わない** ことを最優先とし、現在は全レコードの生バイトを base64 (`_raw_b64` カラム) として Supabase に格納しています。

フィールドを正しく展開できるレイアウトが検証できたファイルから順次 `LAYOUT_VERIFIED` に追加していきます。

## 構成

- `relay_agent.py` — メイン同期処理。ストリーミング方式 (読み → UPSERT → メモリ解放)。
- `relay_config.json` — 設定テンプレート (git 管理)
- `relay_config.local.json` — 実 secret を入れる設定 (git 管理外)
- `parsers/magic_isam.py` — ISAM バイナリ読み取り。raw-preserve モード対応
- `parsers/odbc_reader.py` — ODBC 経由読み取り (ドライバー未入手時は未使用)
- `supabase_schema.sql` — Supabase 側テーブル作成 SQL
- `setup_scheduler.bat` — タスクスケジューラ登録
- `requirements.txt` — 依存パッケージ
- `relay_log.txt` — 実行ログ
- `.last_run.json` — ファイル単位チェックポイント (mtime 記録)

## セットアップ手順

1. Python 3.10 以上をインストールします。
2. `relay/` で `pip install -r requirements.txt` を実行します。
3. `relay_config.local.json` を作成し、`supabase_anon_key` と `z_drive_path` を実環境に合わせて設定します (テンプレートは `relay_config.json`)。
4. Supabase Dashboard の SQL Editor で `supabase_schema.sql` を実行し、テーブル一式を作成します。
5. `setup_scheduler.bat` を管理者として実行し、定期実行タスクを登録します。

## 動作概要

1. 設定 (ローカル優先) を読み込む
2. `sync_targets` の各ファイルについて mtime を取得し、前回の `.last_run.json` と比較
3. 変更があるファイルだけストリーミング同期:
   - 1 レコードずつ読み込み
   - 空・削除・フリーリストスロットを検出して除外
   - `_raw_b64` 付きレコードをバッファに追加
   - バッファが `batch_size` (既定 500) に達したら Supabase REST API へ UPSERT してバッファ解放
4. ファイル単位で checkpoint を保存 (中断時も次回再開可能)
5. エラー発生ファイルは checkpoint 未更新のまま次へ進み、最後にまとめて警告ログ

## ログ確認

- ログファイル: `relay_log.txt`
- チェックポイント: `.last_run.json` (ファイル名 → 最後に同期した mtime)
- 手動実行: `python relay_agent.py`
- 終了コード: `0` 全成功, `2` 一部ファイルで失敗, `1` 致命的例外

## 未対応 / 今後

- ODBC ドライバー入手後は `read_via_odbc` で一気に高速化可能
- レイアウト検証が済んだファイルは `LAYOUT_VERIFIED` に登録し、フィールド展開を有効化
- 5 分 cadence で大型 DAT ファイル (SHTOR 906MB 等) を回すには、mtime-then-byte-diff の差分読み取りが必要
