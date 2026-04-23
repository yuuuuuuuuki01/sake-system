' run_silent.vbs — ウィンドウ非表示で同期処理を実行
' タスクスケジューラからこのVBSを呼び出すことでPowerShell/cmdウィンドウが開かない
'
' 実行順序:
'   1. relay_agent.py      — マスタ・在庫バイナリ→Supabase（SHDEN/SHTOR除く）
'   2. decoder_master_diff.py — 得意先・商品マスタdiff
'   3. decoder_headers_diff.py — 売上伝票ヘッダ（SHDEN.DAT直接diff）
'   4. decoder_sales_diff.py   — 売上明細（SHTOR.DAT直接diff）+ FK自動補完
'   5. refresh_facts.py    — ダッシュボード集計テーブル更新
'   6. decoder_suppliers.py / decoder_special_prices.py
'   7. import_csv_all.py   — マスタCSVが更新されていれば補完

Dim objShell, fso, scriptDir
Set objShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
objShell.CurrentDirectory = scriptDir

' 0 = vbHide (ウィンドウ非表示), True = 完了を待つ

' 1. raw同期
objShell.Run "python relay_agent.py", 0, True

' 2. マスタデコーダ（MSTファイル変更時のみ実行）
objShell.Run "python decoder_master_diff.py", 0, True

' 3. 売上伝票ヘッダ（SHDEN.DAT差分検出 — 新規伝票をsales_document_headersに登録）
objShell.Run "python decoder_headers_diff.py", 0, True

' 4. 売上明細（SHTOR.DAT差分検出 — 変更されたスロットのみ + FK自動補完）
objShell.Run "python decoder_sales_diff.py", 0, True

' 4. ダッシュボード集計更新
objShell.Run "python refresh_facts.py", 0, True

' 5. Supabase raw経由デコーダ
objShell.Run "python decoder_suppliers.py", 0, True
objShell.Run "python decoder_special_prices.py", 0, True

' 6. マスタCSVが更新されていれば補完
If fso.FileExists("Z:\得意先ﾏｽﾀﾘｽﾄ.csv") Then
    objShell.Run "python import_csv_all.py", 0, True
End If

Set fso = Nothing
Set objShell = Nothing
