@echo off
setlocal

set SCRIPT_DIR=%~dp0
set TASK_NAME=SakeRelay
set PYTHON_EXE=python.exe
set TASK_CMD=cmd.exe /c "cd /d ""%SCRIPT_DIR%"" && %PYTHON_EXE% relay_agent.py"

schtasks /Create /TN "%TASK_NAME%" /TR "%TASK_CMD%" /SC MINUTE /MO 5 /F

if errorlevel 1 (
  echo Task registration failed.
  exit /b 1
)

echo Task "%TASK_NAME%" registered successfully.
exit /b 0
