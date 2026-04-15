import type { JikomiRecord } from "../api";
import { JIKOMI_STATUS_LABELS } from "../api";

export function renderJikomi(records: JikomiRecord[]): string {
  const statusClass: Record<JikomiRecord["status"], string> = {
    planned: "neutral",
    active: "warning",
    done: "success"
  };

  const rows = records
    .map(
      (r) => `
      <tr>
        <td class="mono">${r.jikomiNo}</td>
        <td>${r.productName}</td>
        <td>${r.riceType}</td>
        <td class="numeric">${r.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${r.actualKg > 0 ? r.actualKg.toLocaleString("ja-JP") + " kg" : "―"}</td>
        <td>${r.startDate}</td>
        <td>${r.expectedDoneDate}</td>
        <td class="mono">${r.tankNo}</td>
        <td>
          <span class="status-pill ${statusClass[r.status]}">${JIKOMI_STATUS_LABELS[r.status]}</span>
        </td>
        <td>${r.note || "―"}</td>
      </tr>
    `
    )
    .join("");

  const activeCount = records.filter((r) => r.status === "active").length;
  const doneCount = records.filter((r) => r.status === "done").length;
  const plannedCount = records.filter((r) => r.status === "planned").length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>仕込管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="jikomi-new">＋ 新規仕込</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">仕込中</p>
        <p class="kpi-value">${activeCount} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${plannedCount} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${doneCount} 本</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>仕込一覧</h2>
        <p class="panel-caption">${records.length} 件</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>仕込番号</th>
              <th>銘柄</th>
              <th>原料米</th>
              <th class="numeric">計画量</th>
              <th class="numeric">実績量</th>
              <th>開始日</th>
              <th>完了予定日</th>
              <th>タンク</th>
              <th>状態</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}
