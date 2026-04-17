export interface RawTableInfo {
  tableName: string;
  displayName: string;
  rowCount: number;
  lastSyncAt: string | null;
}

export interface RawRecord {
  _source_file: string;
  _record_index: number;
  _record_size: number;
  _raw_b64: string;
  _source_path: string;
  _source_file_mtime: string;
  _synced_at: string;
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function truncateB64(b64: string, maxLen = 40): string {
  if (!b64 || b64.length <= maxLen) return b64 || "";
  return b64.slice(0, maxLen) + "…";
}

export function renderRawBrowser(
  selectedTable: string | null,
  records: RawRecord[],
  tableList: RawTableInfo[],
  page: number,
  totalCount: number
): string {
  const totalRecords = tableList.reduce((sum, t) => sum + t.rowCount, 0);
  const latestSync = tableList
    .map((t) => t.lastSyncAt)
    .filter((v): v is string => v !== null)
    .sort()
    .reverse()[0] ?? null;
  const pageSize = 100;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">raw同期データ</p>
        <h1>データブラウザ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">テーブル数</p>
        <p class="kpi-value">${tableList.length}</p>
        <p class="kpi-sub">酒仙iファイル</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">合計レコード</p>
        <p class="kpi-value">${totalRecords.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">全テーブル合計</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value">${latestSync ? formatDateTime(latestSync) : "---"}</p>
        <p class="kpi-sub">最も新しい同期</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>テーブル一覧</h2>
          <p class="panel-caption">テーブルを選択してレコードを確認</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;padding:0 0 16px;">
        ${tableList.map((t) => `
          <button
            class="panel kpi-card ${selectedTable === t.tableName ? "kpi-alert" : ""}"
            type="button"
            data-action="raw-select-table"
            data-table="${t.tableName}"
            style="cursor:pointer;text-align:left;border:2px solid ${selectedTable === t.tableName ? "var(--primary)" : "transparent"};transition:border-color .15s;"
          >
            <p class="panel-title" style="font-size:12px;">${t.displayName}</p>
            <p class="kpi-value" style="font-size:18px;">${t.rowCount.toLocaleString("ja-JP")}</p>
            <p class="kpi-sub" style="font-size:11px;">${t.lastSyncAt ? formatDateTime(t.lastSyncAt) : "未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${selectedTable ? `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${tableList.find((t) => t.tableName === selectedTable)?.displayName ?? selectedTable}</h2>
          <p class="panel-caption">${totalCount.toLocaleString("ja-JP")}件中 ${((page - 1) * pageSize + 1).toLocaleString("ja-JP")}-${Math.min(page * pageSize, totalCount).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${page <= 1 ? "disabled" : ""}>← 前</button>
          <span style="padding:0 8px;">${page} / ${totalPages}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${page >= totalPages ? "disabled" : ""}>次 →</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="numeric">Index</th>
              <th>ファイル</th>
              <th class="numeric">サイズ</th>
              <th>同期日時</th>
              <th>raw_b64 (先頭)</th>
            </tr>
          </thead>
          <tbody>
            ${records.map((r) => `
            <tr>
              <td class="numeric mono">${r._record_index}</td>
              <td class="mono">${r._source_file || ""}</td>
              <td class="numeric">${r._record_size ?? ""} B</td>
              <td>${r._synced_at ? formatDateTime(r._synced_at) : "---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${r._raw_b64 ? r._raw_b64.slice(0, 200) : ""}">${truncateB64(r._raw_b64)}</td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
    ` : `
    <section class="panel">
      <p style="padding:24px;text-align:center;color:var(--text-secondary);">上のテーブルを選択すると、レコードの詳細が表示されます。</p>
    </section>
    `}
  `;
}
