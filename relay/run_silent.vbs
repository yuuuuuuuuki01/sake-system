' run_silent.vbs — ウィンドウ非表示で同期処理を実行
' タスクスケジューラからこのVBSを呼び出すことでPowerShell/cmdウィンドウが開かない
'
' 実行順序:
'   1. relay_agent.py  — 酒仙iのバイナリデータをSupabaseのsake_*テーブルにraw同期
'   2. import_csv_all.py — Z:\のCSVマスタリストを正としてSupabaseの正規化テーブルに投入
'   3. decoder_special_prices.py — 特価テーブルのみバイナリデコード（CSVにないため）
'
' ※ バイナリデコーダ(decoder_customers/products/suppliers)は使わない
'   → CSVが正のマスターデータ。バイナリデコーダはCSVデータを劣化版で上書きしてしまうため。

Dim objShell, fso, scriptDir
Set objShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
objShell.CurrentDirectory = scriptDir

' 0 = vbHide (ウィンドウ非表示), True = 完了を待つ

' 1. raw同期（酒仙i → Supabase sake_*テーブル）
objShell.Run "python relay_agent.py", 0, True

' 2. CSVマスタインポート（Z:\のCSVが正）
'    CSVファイルが存在する場合のみ実行
If fso.FileExists("Z:\得意先ﾏｽﾀﾘｽﾄ.csv") Then
    objShell.Run "python import_csv_all.py", 0, True
End If

' 3. 特価テーブルのみバイナリデコード（CSVに特価データがないため）
objShell.Run "python decoder_special_prices.py", 0, True

Set fso = Nothing
Set objShell = Nothing
