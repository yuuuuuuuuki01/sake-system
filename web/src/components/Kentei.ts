import type { KenteiRecord } from "../api";

export function renderKentei(records: KenteiRecord[]): string {
  const statusLabel: Record<KenteiRecord["status"], string> = {
    pending: "未実施",
    submitted: "申請中",
    approved: "承認済"
  };

  const statusClass: Record<KenteiRecord["status"], string> = {
    pending: "neutral",
    submitted: "warning",
    approved: "success"
  };

  const rows = records
    .map(
      (r) => `
      <tr>
        <td class="mono">${r.kenteiNo}</td>
        <td class="mono">${r.jikomiNo}</td>
        <td>${r.productName}</td>
        <td>${r.kenteiDate}</td>
        <td class="numeric">${r.alcoholDegree > 0 ? r.alcoholDegree.toFixed(1) + "度" : "―"}</td>
        <td class="numeric">${r.extractDegree > 0 ? r.extractDegree.toFixed(1) : "―"}</td>
        <td class="numeric">${r.sakaMeterValue !== 0 ? r.sakaMeterValue.toFixed(1) : "―"}</td>
        <td class="numeric">${r.volume > 0 ? r.volume.toLocaleString("ja-JP") + " L" : "―"}</td>
        <td>${r.taxCategory}</td>
        <td>
          <span class="status-pill ${statusClass[r.status]}">${statusLabel[r.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${r.id}">
            ${r.status === "pending" ? "入力" : "詳細"}
          </button>
        </td>
      </tr>
    `
    )
    .join("");

  const approvedCount = records.filter((r) => r.status === "approved").length;
  const submittedCount = records.filter((r) => r.status === "submitted").length;
  const pendingCount = records.filter((r) => r.status === "pending").length;
  const totalVolume = records.filter((r) => r.status === "approved").reduce((s, r) => s + r.volume, 0);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>検定管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="kentei-new">＋ 新規検定</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">承認済容量</p>
        <p class="kpi-value">${totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${submittedCount} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${pendingCount} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>検定一覧</h2>
          <p class="panel-caption">承認済 ${approvedCount} 件 / 合計 ${records.length} 件</p>
        </div>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>検定番号</th>
              <th>仕込番号</th>
              <th>銘柄</th>
              <th>検定日</th>
              <th class="numeric">アルコール度数</th>
              <th class="numeric">エキス分</th>
              <th class="numeric">酒度</th>
              <th class="numeric">容量</th>
              <th>酒類区分</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}
