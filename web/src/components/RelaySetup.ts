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
          <h2>WEB連動PC_A セットアップ手順</h2>
        </div>
      </div>
      <div class="setup-step" data-step="1">
        <h3>Python 3.10以上をインストール</h3>
        <p>python.org からダウンロードしてインストールします。</p>
      </div>
      <div class="setup-step" data-step="2">
        <h3>GitHubからファイル取得</h3>
        <pre class="code-block">git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay</pre>
      </div>
      <div class="setup-step" data-step="3">
        <h3>依存パッケージインストール</h3>
        <pre class="code-block">pip install -r requirements.txt</pre>
      </div>
      <div class="setup-step" data-step="4">
        <h3>relay_config.json を編集</h3>
        <p>下の設定セクションを参照して必要な値を設定します。</p>
      </div>
      <div class="setup-step" data-step="5">
        <h3>タスクスケジューラ登録</h3>
        <p>管理者権限で <span class="mono">setup_scheduler.bat</span> を実行します。</p>
      </div>
      <div class="setup-step" data-step="6">
        <h3>動作確認</h3>
        <pre class="code-block">python relay_agent.py</pre>
        <p><span class="mono">relay_log.txt</span> を確認します。</p>
      </div>
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
          <pre class="code-block">{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}</pre>
        </div>
        <div>
          <h3>ODBCなし</h3>
          <pre class="code-block">{
  "use_odbc": false
}</pre>
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

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>接続情報</h2>
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
            <span class="config-value">${escapeHtml(supabaseAnonKey)}</span>
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
  `;
}
