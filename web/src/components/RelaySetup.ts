import type { PipelineMeta } from "../api";

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderCodeBlock(code: string): string {
  return `
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(code)}"
      >
        コピー
      </button>
      <pre class="code-block">${escapeHtml(code)}</pre>
    </div>
  `;
}

function renderCopyButton(code: string): string {
  return `
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(code)}"
    >
      コピー
    </button>
  `;
}

function renderInlineCommand(command: string): string {
  return `
    <div class="setup-command-row">
      <code class="inline-code">${escapeHtml(command)}</code>
      ${renderCopyButton(command)}
    </div>
  `;
}

function renderSetupStep(config: {
  step: number;
  title: string;
  purpose: string;
  instructions: string[];
  success: string[];
  errors: string[];
  code?: string;
}): string {
  return `
    <div class="setup-step" data-step="${config.step}">
      <h3>${escapeHtml(config.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${escapeHtml(config.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${config.instructions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
      </div>
      ${config.code ? renderCodeBlock(config.code) : ""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${config.success.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${config.errors.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function renderPrepStep(config: {
  stepLabel: string;
  title: string;
  purpose: string;
  body: string;
}): string {
  return `
    <div class="setup-step setup-step-compact" data-step="${escapeHtml(config.stepLabel)}">
      <h3>${escapeHtml(config.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${escapeHtml(config.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${config.body}
      </div>
    </div>
  `;
}

export function renderRelaySetup(
  pipeline: PipelineMeta,
  supabaseUrl: string,
  supabaseAnonKey: string
): string {
  const statusLabelMap = {
    success: "正常",
    warning: "注意",
    error: "異常",
    running: "実行中"
  };

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${formatDateTime(pipeline.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${pipeline.status}">${statusLabelMap[pipeline.status]}</span>
        </p>
        <p class="kpi-sub">${escapeHtml(pipeline.message)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期ファイル数</p>
        <p class="kpi-value">4モジュール</p>
        <p class="kpi-sub">固定表示</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>このページでできること</h2>
        </div>
      </div>
      <div class="summary-list">
        <div>
          <dt>なぜ連動が必要か</dt>
          <dd>酒仙iサーバーのデータを自動でWebに反映し、現場とWebUIの数字を揃えるためです。</dd>
        </div>
        <div>
          <dt>何が起きるか</dt>
          <dd>設定後は約5分ごとに同期が走り、売上・入金・マスタがWebUIへ反映されます。</dd>
        </div>
        <div>
          <dt>準備するもの</dt>
          <dd>WindowsのPC1台、酒仙iサーバーへのネットワークアクセス、インターネット接続が必要です。</dd>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>WEB連動PC_A セットアップ手順</h2>
        </div>
      </div>
      <div class="setup-step setup-step-compact" data-step="準備">
        <h3>事前準備 — 必要なソフトウェアの確認</h3>
        <p>以下のソフトウェアがPCにインストールされているか確認します。入っていない場合は指示に従ってインストールしてください。</p>
      </div>
      <div class="setup-step setup-step-compact" data-step="補足">
        <h3>コマンドプロンプトの開き方</h3>
        <ol class="setup-list">
          <li>Windowsキー + R を押す</li>
          <li>表示されたウィンドウに「cmd」と入力してEnter</li>
          <li>黒い画面が開く（これがコマンドプロンプト）</li>
        </ol>
      </div>
      ${renderPrepStep({
        stepLabel: "準備1",
        title: "Git（ソースコード取得に使用）",
        purpose: "GitHubからファイルをダウンロードするためのツール",
        body: `
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${renderInlineCommand("git --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>「認識されていません」等のエラーが出れば未インストールです。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>方法A（推奨）: <a href="https://git-scm.com/download/win" target="_blank" rel="noreferrer">https://git-scm.com/download/win</a> にアクセスし、64bit Gitをダウンロードしてインストーラーを「次へ」のまま進めて完了します。</p>
          <p>方法B（Gitを入れたくない場合）:</p>
          <ol class="setup-list">
            <li><a href="https://github.com/yuuuuuuuuki01/sake-system" target="_blank" rel="noreferrer">https://github.com/yuuuuuuuuki01/sake-system</a> にアクセス</li>
            <li>緑の「Code」ボタン→「Download ZIP」をクリック</li>
            <li>ダウンロードしたZIPを C:\\sake-relay\\ に解凍</li>
            <li>Step2の「git clone」はスキップしてOK</li>
          </ol>
        `
      })}
      ${renderPrepStep({
        stepLabel: "準備2",
        title: "Python（同期スクリプトの実行環境）",
        purpose: "リレースクリプトを動かす",
        body: `
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${renderInlineCommand("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `
      })}
      ${renderPrepStep({
        stepLabel: "準備3",
        title: "pip（Pythonのパッケージ管理ツール）",
        purpose: "requests, pyodbc などのライブラリを入れる",
        body: `
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${renderInlineCommand("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${renderInlineCommand("python get-pip.py")}
        `
      })}
      ${renderPrepStep({
        stepLabel: "準備4",
        title: "テキストエディタ（設定ファイル編集用）",
        purpose: "relay_config.json を編集するため",
        body: `
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `
      })}
      ${renderSetupStep({
        step: 1,
        title: "Python 3.12 をインストール",
        purpose: "Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",
        instructions: [
          "ブラウザで https://www.python.org/downloads/ を開きます。",
          "大きな黄色ボタン『Download Python 3.12.x』をクリックします。",
          "ダウンロードしたインストーラーを実行します。",
          "最初の画面で『Add Python to PATH』に必ずチェックを入れます。",
          "『Install Now』をクリックして完了まで待ちます。"
        ],
        success: [
          "Windows のコマンドプロンプトを開いて python --version と入力します。",
          "Python 3.12.1 のようなバージョン番号が表示されれば成功です。"
        ],
        errors: [
          "『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。",
          "会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"
        ]
      })}
      ${renderSetupStep({
        step: 2,
        title: "GitHub から relay ファイルを取得",
        purpose: "自動同期に必要なスクリプト一式を Windows PC に配置します。",
        instructions: [
          "作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。",
          "コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。",
          "Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。",
          "ダウンロード完了後、relay フォルダに移動できていることを確認します。"
        ],
        code: `git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,
        success: [
          "エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。",
          "cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"
        ],
        errors: [
          "git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。",
          "アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"
        ]
      })}
      ${renderSetupStep({
        step: 3,
        title: "必要な部品をインストール",
        purpose: "relay スクリプトが使うライブラリをまとめて準備します。",
        instructions: [
          "Step2 で開いた relay フォルダのまま、下のコマンドを実行します。",
          "数分かかることがあるので、完了表示が出るまで待ちます。"
        ],
        code: "pip install -r requirements.txt",
        success: [
          "Successfully installed が表示されれば成功です。",
          "赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"
        ],
        errors: [
          "pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。",
          "SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"
        ]
      })}
      ${renderSetupStep({
        step: 4,
        title: "relay_config.json を設定",
        purpose: "どのサーバーのどのデータを、どこへ送るかを設定します。",
        instructions: [
          "relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。",
          "下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。",
          "酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。",
          "編集後はファイルを上書き保存します。"
        ],
        success: [
          "relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。",
          "Supabase URL と Anon Key が空欄でないことを確認してください。"
        ],
        errors: [
          "JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。",
          "Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"
        ]
      })}
      ${renderSetupStep({
        step: 5,
        title: "タスクスケジューラへ登録",
        purpose: "Windows が5分ごとに自動で relay を実行するようにします。",
        instructions: [
          "エクスプローラーで relay フォルダを開きます。",
          "setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。",
          "Windows の確認ダイアログが出たら『はい』を押します。",
          "タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"
        ],
        success: [
          "タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。",
          "トリガーが 5 分おきになっていれば自動実行設定は完了です。"
        ],
        errors: [
          "タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。",
          "セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"
        ]
      })}
      ${renderSetupStep({
        step: 6,
        title: "手動実行で動作確認",
        purpose: "本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",
        instructions: [
          "relay フォルダで下のコマンドを実行します。",
          "処理完了後、relay_log.txt を開いて最後の行を確認します。",
          "Web UI 側の最終同期日時が更新されるかも確認します。"
        ],
        code: "python relay_agent.py",
        success: [
          "relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。",
          "この画面の『最終同期日時』が新しい時刻に変われば連動できています。"
        ],
        errors: [
          "relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。",
          "Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"
        ]
      })}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>ODBCドライバ確認</h2>
        </div>
      </div>
      <p>確認方法: 「スタート」→「ODBCデータソース（64ビット）」→「ドライバー」タブ</p>
      <p>Magic ODBCドライバがあれば <span class="mono">use_odbc: true</span> を設定します。</p>
      <p>なければ <span class="mono">use_odbc: false</span> でバイナリ直読みモードを使います。</p>
      <div class="content-grid relay-odbc-grid">
        <div>
          <h3>ODBCあり</h3>
          ${renderCodeBlock(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${renderCodeBlock(`{
  "use_odbc": false
}`)}
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>relay_config.json 設定項目</h2>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>キー</th>
              <th>説明</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="mono">supabase_url</td>
              <td>SupabaseのプロジェクトURL</td>
              <td class="mono">https://xxx.supabase.co</td>
            </tr>
            <tr>
              <td class="mono">supabase_anon_key</td>
              <td>Supabase Anon Key</td>
              <td>Settings &gt; API から取得</td>
            </tr>
            <tr>
              <td class="mono">z_drive_path</td>
              <td>酒仙iサーバーのZドライブパス</td>
              <td class="mono">Z:\\</td>
            </tr>
            <tr>
              <td class="mono">sync_modules</td>
              <td>同期するモジュール</td>
              <td class="mono">["sk","sh","k5","h5"]</td>
            </tr>
            <tr>
              <td class="mono">interval_minutes</td>
              <td>同期間隔（分）</td>
              <td class="mono">5</td>
            </tr>
            <tr>
              <td class="mono">use_odbc</td>
              <td>ODBCドライバを使うか</td>
              <td class="mono">true / false</td>
            </tr>
            <tr>
              <td class="mono">odbc_dsn</td>
              <td>ODBCデータソース名</td>
              <td class="mono">MagicSake</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel kpi-alert">
      <div class="panel-header">
        <div>
          <h2>⚡ かんたんセットアップ：設定ファイルを自動生成</h2>
          <p class="panel-caption">ボタン1つで設定済みの <code>relay_config.json</code> をダウンロードできます。中身は編集不要で、そのまま relay フォルダに保存するだけでOKです。</p>
        </div>
      </div>
      <div class="action-bar-large">
        <button
          class="button primary"
          type="button"
          data-action="download-relay-config"
          style="font-size: 15px; padding: 14px 28px;"
        >
          📥 relay_config.json をダウンロード
        </button>
      </div>
      <p class="form-hint" style="margin-top: 12px;">
        保存場所: WEB連動PCの <code>relay\</code> フォルダ（<code>relay_agent.py</code> と同じ場所）に置いてください。上書き保存でOKです。
      </p>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>接続情報（手動で設定する方用）</h2>
        </div>
      </div>
      <div class="relay-config-list">
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase URL</p>
            <span class="config-value">${escapeHtml(supabaseUrl)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${escapeHtml(supabaseUrl)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${escapeHtml(supabaseAnonKey || "（未設定：Supabaseダッシュボードから取得してください）")}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${escapeHtml(supabaseAnonKey)}"
          >
            コピー
          </button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>よくある質問</h2>
        </div>
      </div>
      <div class="summary-list">
        <div>
          <dt>Q. relay_log.txt が作られない</dt>
          <dd>A. 権限エラーの可能性があります。フォルダを書き込み可能な場所（例: C:\\sake-relay\\）へ移動してください。</dd>
        </div>
        <div>
          <dt>Q. Z: ドライブが見えない</dt>
          <dd>A. 酒仙iサーバーの共有フォルダが正しく繋がっているか確認してください。</dd>
        </div>
        <div>
          <dt>Q. ODBCドライバがない</dt>
          <dd>A. use_odbc: false に設定し、バイナリ直読みモードで動かしてください。</dd>
        </div>
        <div>
          <dt>Q. Supabase に接続できない</dt>
          <dd>A. supabase_anon_key が正しいか、インターネット接続があるか確認してください。</dd>
        </div>
        <div>
          <dt>Q. 同期が動かない</dt>
          <dd>A. タスクスケジューラに SakeRelay があるか確認し、手動実行は python relay_agent.py を使ってログを確認してください。</dd>
        </div>
        <div>
          <dt>Q. Webページを開くと 404 が表示される</dt>
          <dd>A. ブラウザのキャッシュが古い可能性があります。Ctrl+Shift+R（Mac: Cmd+Shift+R）でハードリフレッシュするか、シークレット/プライベートウィンドウで開き直してください。それでも出る場合はトップページ(/sake-system/)から辿ってください。</dd>
        </div>
        <div>
          <dt>Q. バッチファイル(setup_scheduler.bat)がすぐ閉じる</dt>
          <dd>A. ダブルクリックではなく右クリック→「管理者として実行」を使ってください。管理者権限がないとタスク登録自体が失敗します。</dd>
        </div>
        <div>
          <dt>Q. タスクスケジューラで5分間隔が選べない</dt>
          <dd>A. 「基本タスクの作成」では日単位までしか選べません。作成後にタスクをダブルクリック → 「トリガー」タブ → トリガーをダブルクリック → 「繰り返し間隔」を有効化して5分に設定してください。</dd>
        </div>
        <div>
          <dt>Q. ネットワークドライブに認証情報が必要だがパスワードが分からない</dt>
          <dd>A. 既に接続できているPCで「資格情報マネージャー」を開き、「資格情報のバックアップ」で.crdファイルを作成。新PCに持ち込んで「資格情報の復元」すればパスワードを覗かずに移行できます。パスワードを表示したい場合はNirSoft社の無料ツール NetPass（https://www.nirsoft.net/utils/network_password_recovery.html）が使えます（管理者権限で実行、一部セキュリティソフトが警告する場合あり）。</dd>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>用語集</h2>
        </div>
      </div>
      <div class="summary-list">
        <div><dt>Python</dt><dd>今回の同期スクリプトを動かすプログラミング言語です。</dd></div>
        <div><dt>ODBC</dt><dd>データベースに標準で繋ぐ仕組みです。Magic にこれがあれば高速かつ正確に同期できます。</dd></div>
        <div><dt>DSN</dt><dd>ODBC の接続設定名です。</dd></div>
        <div><dt>Supabase</dt><dd>クラウドデータベースです。WebUI が読むデータをここに保存します。</dd></div>
        <div><dt>タスクスケジューラ</dt><dd>Windows 標準の定期実行機能です。</dd></div>
        <div><dt>Anon Key</dt><dd>Supabase に接続するための暗号のようなパスワードです。</dd></div>
        <div><dt>Z:ドライブ</dt><dd>酒仙i サーバーのデータ保管場所です。</dd></div>
      </div>
    </section>
  `;
}
