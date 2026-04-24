# relay ディレクトリ — Claude Code 向けガイド

## 必読ドキュメント

バイナリデコーダを触る前に **必ず** 以下を読むこと:

- [`docs/SHDEN_FIELDMAP.md`](docs/SHDEN_FIELDMAP.md)
  — SHDEN.DAT のフィールドオフセット確定版。よくある間違いと正しいロジックを記載。

## パイプライン概要

```
run_silent.vbs
  ├─ relay_agent.py           # バイナリ → Supabase raw テーブル
  ├─ decoder_master_diff.py   # 得意先・商品マスタ diff
  ├─ decoder_headers_diff.py  # SHDEN.DAT → sales_document_headers
  ├─ decoder_sales_diff.py    # SHTOR.DAT → sales_document_lines
  ├─ refresh_facts.py         # daily_sales_fact 集計更新
  ├─ decoder_suppliers.py
  ├─ decoder_special_prices.py
  └─ import_csv_all.py        # 得意先マスタCSVが更新されていれば実行
```

## 重要な設計判断

### ダッシュボード集計は FK を必要としない
`refresh_daily_sales_fact()` は `sales_document_lines.note` フィールドの
`src:csv` / `src:diff` タグを直接読む。ヘッダとのFK結合は不要。

### データソースの優先順位（021_binary_first_refresh で変更済み）
- **第一ソース**: `decoder_sales_diff.py` が SHTOR.DAT から検出（src:diff）
  - 全日付分を無条件で daily_sales_fact に投入
- **補完ソース**: `import_urikake_full.py` が `売掛金元帳.csv` から投入（src:csv）
  - バイナリにない日付×得意先×商品の組み合わせのみ ON CONFLICT DO NOTHING で補完

### SHDEN.DAT デコーダ（`decoder_headers_diff.py`）
参照実装は `decoder_sales.py`。フィールドオフセットの詳細は
[`docs/SHDEN_FIELDMAP.md`](docs/SHDEN_FIELDMAP.md) を参照。
