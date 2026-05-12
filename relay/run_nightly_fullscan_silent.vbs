Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c ""C:\sake-system\sake-system\relay\run_nightly_fullscan.bat""", 0, False
Set WshShell = Nothing
