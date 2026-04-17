@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

REM ============================================================
REM  酒仙iリレー — タスクスケジューラ自動登録
REM  改善版: バックグラウンド実行（ウィンドウ非表示・UAC不要）
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

if not exist "%SCRIPT_DIR%run_silent.vbs" (
    echo [エラー] run_silent.vbs が見つかりません。
    echo   relay フォルダに run_silent.vbs があることを確認してください。
    echo.
    pause
    exit /b 1
)

echo [OK] relay_agent.py 確認
echo [OK] run_silent.vbs 確認
echo.

REM --- 既存タスクを削除（あれば） ---
schtasks /Delete /TN "SakeRelay" /F >nul 2>&1

REM --- 新タスク登録 ---
REM  ポイント:
REM   1. wscript.exe で run_silent.vbs を呼び出し → ウィンドウが開かない
REM   2. /RL LIMITED → UACダイアログが出ない（管理者権限不要）
REM   3. /SC MINUTE /MO 5 → 5分ごとに実行
set TASK_NAME=SakeRelay
set TASK_CMD=wscript.exe "%SCRIPT_DIR%run_silent.vbs"

echo [INFO] タスク名: %TASK_NAME%
echo [INFO] 実行方法: wscript.exe (バックグラウンド・ウィンドウ非表示)
echo [INFO] 実行間隔: 5分毎
echo.

schtasks /Create /TN "%TASK_NAME%" /TR "%TASK_CMD%" /SC MINUTE /MO 5 /RL LIMITED /F

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
    echo        プログラム: wscript.exe
    echo        引数: "%SCRIPT_DIR%run_silent.vbs"
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo [成功] タスク登録が完了しました！
echo ========================================================
echo.
echo 変更点（旧バージョンとの違い）:
echo   - ウィンドウが開かずバックグラウンドで実行されます
echo   - 管理者確認（UACダイアログ）が毎回出なくなります
echo   - 同期後に自動でデコーダ（商品・仕入先・特価・得意先）も実行します
echo.
echo 確認方法:
echo   1. スタートメニューで「タスク スケジューラ」を開く
echo   2. 左の「タスク スケジューラ ライブラリ」をクリック
echo   3. 一覧に 「SakeRelay」 があれば OK
echo.
echo ログ確認:
echo   relay_log.txt を開くとリアルタイムで同期状況が確認できます
echo.
echo このウィンドウは何かキーを押すと閉じます。
pause >nul
exit /b 0
