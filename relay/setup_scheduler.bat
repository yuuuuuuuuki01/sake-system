@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

REM ============================================================
REM  酒仙iリレー — タスクスケジューラ自動登録
REM ============================================================

echo.
echo ========================================================
echo   酒仙iリレー — タスクスケジューラ登録
echo ========================================================
echo.

REM --- 管理者権限チェック ---
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [エラー] このバッチは『管理者として実行』してください。
    echo.
    echo 手順:
    echo   1. setup_scheduler.bat を右クリック
    echo   2. 『管理者として実行』を選択
    echo   3. Windows の確認画面で『はい』を押す
    echo.
    pause
    exit /b 1
)

echo [OK] 管理者権限で実行中です。
echo.

REM --- Python の存在確認 ---
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo [エラー] Python が見つかりません。
    echo   Python 3.10 以上をインストールしてください。
    echo   https://www.python.org/downloads/
    echo   ※ インストール時に 『Add Python to PATH』 にチェック
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('python --version 2^>^&1') do set PYVER=%%i
echo [OK] Python 確認: %PYVER%
echo.

REM --- 現在のフォルダとファイル確認 ---
set SCRIPT_DIR=%~dp0
echo [INFO] 作業フォルダ: %SCRIPT_DIR%

if not exist "%SCRIPT_DIR%relay_agent.py" (
    echo [エラー] relay_agent.py が見つかりません。
    echo   このバッチは relay フォルダ内から実行してください。
    echo.
    pause
    exit /b 1
)
echo [OK] relay_agent.py 確認
echo.

REM --- タスク登録 ---
set TASK_NAME=SakeRelay
set TASK_CMD=cmd.exe /c "cd /d ""%SCRIPT_DIR%"" ^&^& python relay_agent.py"

echo [INFO] タスク名: %TASK_NAME%
echo [INFO] 実行間隔: 5分毎
echo.

schtasks /Create /TN "%TASK_NAME%" /TR "%TASK_CMD%" /SC MINUTE /MO 5 /RL HIGHEST /F

if %errorlevel% neq 0 (
    echo.
    echo ========================================================
    echo [失敗] タスク登録に失敗しました
    echo ========================================================
    echo.
    echo 考えられる原因:
    echo   1. セキュリティソフトがブロックしている
    echo   2. グループポリシーで制限されている
    echo.
    echo 手動登録方法:
    echo   1. スタート → 「タスク スケジューラ」 を開く
    echo   2. 右パネル 「基本タスクの作成」
    echo   3. 名前: SakeRelay
    echo   4. トリガー: 毎日、5 分毎 に繰り返し
    echo   5. 操作: プログラムの開始
    echo        プログラム: python
    echo        引数: relay_agent.py
    echo        開始: %SCRIPT_DIR%
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo [成功] タスク登録が完了しました！
echo ========================================================
echo.
echo 次の確認方法:
echo   1. スタートメニューで「タスク スケジューラ」を開く
echo   2. 左の「タスク スケジューラ ライブラリ」をクリック
echo   3. 一覧に 「SakeRelay」 があれば OK
echo.
echo 手動テスト:
echo   今すぐ動作確認したい場合は、コマンドプロンプトで:
echo     cd /d "%SCRIPT_DIR%"
echo     python relay_agent.py
echo   を実行してください。relay_log.txt にログが出ます。
echo.
echo このウィンドウは何かキーを押すと閉じます。
pause >nul
exit /b 0
