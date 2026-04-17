' run_silent.vbs — ウィンドウ非表示で relay_agent.py を実行
' タスクスケジューラからこのVBSを呼び出すことでPowerShell/cmdウィンドウが開かない
Dim objShell, scriptDir
Set objShell = CreateObject("WScript.Shell")
scriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
objShell.CurrentDirectory = scriptDir
' 0 = vbHide (ウィンドウ非表示), False = 完了を待たない
objShell.Run "python relay_agent.py", 0, True
' デコーダも順次実行（商品・仕入先・特価）
objShell.Run "python decoder_products.py", 0, True
objShell.Run "python decoder_suppliers.py", 0, True
objShell.Run "python decoder_special_prices.py", 0, True
objShell.Run "python decoder_customers.py", 0, True
Set objShell = Nothing
