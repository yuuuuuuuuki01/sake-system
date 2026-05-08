Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c ""C:\sake-system\sake-system\relay\run_relay.bat""", 0, False
Set WshShell = Nothing
