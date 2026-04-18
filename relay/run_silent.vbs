' run_silent.vbs — ウィンドウ非表示で同期処理を実行
' タスクスケジューラからこのVBSを呼び出すことでPowerShell/cmdウィンドウが開かない
'
' 実行順序:
'   1. relay_agent.py — 酒仙iバイナリ→Supabase sake_*テーブルにraw同期
'   2. decoder_customers.py — 得意先デコード（MSTファイル直読み）
'   3. decoder_products.py --from-file — 商品デコード（MSTファイル直読み）
'   4. decoder_sales_lines.py — 売上明細デコード（SHTOR.DATバイナリ直読み）
'   5. import_urikake.py — 売掛金元帳CSV取込（あれば正解データで上書き）
'   6. refresh_facts.py — ダッシュボード集計テーブル更新
'   7. decoder_suppliers.py — 仕入先デコード（raw→Supabase経由）
'   8. decoder_special_prices.py — 特価デコード（raw→Supabase経由）
'   9. import_csv_all.py — CSVが更新されていれば補完投入

Dim objShell, fso, scriptDir
Set objShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
objShell.CurrentDirectory = scriptDir

' 0 = vbHide (ウィンドウ非表示), True = 完了を待つ

' 1. raw同期
objShell.Run "python relay_agent.py", 0, True

' 2. マスタデコーダ（MSTファイル直読み — 高品質）
objShell.Run "python decoder_customers.py", 0, True
objShell.Run "python decoder_products.py --from-file", 0, True

' 3. 売上明細（SHTOR.DATバイナリ直読み — リアルタイム）
objShell.Run "python decoder_sales_lines.py", 0, True

' 4. 売掛金元帳CSV取込（あれば正解データで補正）
If fso.FileExists("Z:\売掛金元帳.csv") Then
    objShell.Run "python import_urikake.py", 0, True
End If

' 5. ダッシュボード集計更新（バイナリ+CSV両方から集計）
objShell.Run "python refresh_facts.py", 0, True

' 6. Supabase raw経由デコーダ
objShell.Run "python decoder_suppliers.py", 0, True
objShell.Run "python decoder_special_prices.py", 0, True

' 7. CSVが更新されていれば補完
If fso.FileExists("Z:\得意先ﾏｽﾀﾘｽﾄ.csv") Then
    objShell.Run "python import_csv_all.py", 0, True
End If

Set fso = Nothing
Set objShell = Nothing
