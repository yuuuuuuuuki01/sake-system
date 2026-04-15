# 酒仙i → syusen-cloud エンティティマップ

旧システム（Magic/eDeveloper）の438ファイルを新システム（Supabase）のテーブルへ対応付けた完全リスト。

## モジュール対応

| 酒仙iモジュール | 意味 | 新システム対応 |
|---|---|---|
| SK | 販売管理 | sales_document_* / customer_* |
| SH | 出荷管理 | shipment_documents / delivery_schedules |
| K5 | 蔵内管理 | brewing_batches / tanks / kentei_records |
| H5 | 原料・仕入 | purchase_document_* / raw_materials / materials |
| OCR | 税務 | tax_declarations / tax_categories |
| ST | 店舗 | store_sales / store_orders |

## 主要ファイル → テーブル対応表

| 酒仙iファイル | サイズ | 新テーブル | フィールド精度 |
|---|---|---|---|
| **sk2mm.mst** | 15MB | customers | 高（10+フィールド定義済） |
| SKDEN.DAT | 81KB | sales_document_headers | 高 |
| SKHSK.DAT | 106KB | customer_payment_status | 中 |
| SKKAI.DAT | 81KB | customer_payments | 中 |
| SKSYO.MST | 798KB | products | 高 |
| SKALC.MST | 40KB | alcohol_categories | 中 |
| SKDAI.MST | 45KB | staff (代行/代理) | 低 |
| **SHDEN.DAT** | 463MB | shipment_documents | 中 |
| SHTOR.DAT | 928MB | （アーカイブ、読み取り低優先） | 低 |
| SHSEI.DAT | 66MB | invoices | 中 |
| SHNKI.DAT | 79MB | delivery_schedules | 低（推定） |
| SHSYO.MST | 2.3MB | products | 中 |
| K52MM.MST | 12.6MB | customers (蔵内用コピー) | 高 |
| K5SYO.MST | 677KB | products | 中 |
| K5HSK.DAT | 49KB | customer_payment_status | 中 |
| K5HATOR.DAT | 39KB | brewing_operations | 低 |
| K5TOR.DAT | 24KB | brewing_operations | 低 |
| K5ALC.MST | 18KB | alcohol_categories | 中 |
| H5TOR.DAT | 519MB | purchase_document_headers | 中 |
| H5SYO.MST | 950KB | products | 中 |
| H5SIR.MST | 69KB | suppliers | 高 |
| H5NYU.DAT | 13KB | raw_materials | 中 |
| H5IST.DAT | 71KB | material_transactions | 中 |
| H5KAI.DAT | 24KB | supplier_payments | 中 |
| H5ZEI.MST | 86KB | tax_categories | 中 |
| H5NKI.DAT | 43MB | （納期管理） | 低 |
| H5SEI.DAT | 36MB | supplier_payment_status | 中 |

## 網羅率

- **主要エンティティ 30種類** → すべて Supabase テーブル化済み
- **438ファイル中、約20ファイル（80%以上のデータ量）**のフィールド定義を整備
- 残りは parsers の `guess_fields()` で自動推定（精度低）
- 実データで1度流せば、推定結果を基に精度を上げられる

## 精度補正の手順

1. relay 実行 → Supabase に投入
2. 新WebUI画面で、取り込まれたデータの数値を確認
3. 旧酒仙i画面と突き合わせ、ズレた箇所を特定
4. `relay/parsers/magic_isam.py` の `KNOWN_LAYOUTS` を修正
5. 再実行 → 再検証

## 未対応・低優先ファイル群

- `*.BAK` / `*.old` : バックアップ（取り込み対象外）
- `SH_CYENSTORE_*` : 店舗POS連携用（ST系実装時に対応）
- `S5_*` : 旧系統アーカイブ（履歴のみ、取り込み対象外）
- `*.ecf` / `*.prg` / `*.mcf` : Magic プログラム定義ファイル（データなし）

## 整合率の見込み

| 段階 | 整合率 | 条件 |
|---|---|---|
| 現在（モック） | 30-40% | モックデータで動作 |
| **migration + parsers 更新後** | **75%** | **← 今ここを目指す** |
| 実データ流し込み後 | 85-90% | 全画面突合・補正後 |
| 実運用1ヶ月後 | 95% | バグ修正・追加フィールド整備 |
