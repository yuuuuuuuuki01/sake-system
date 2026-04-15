import type { TankRecord } from "../api";

export function renderTankList(tanks: TankRecord[]): string {
  const statusLabel: Record<TankRecord["status"], string> = {
    empty: "空",
    in_use: "使用中",
    aging: "熟成中"
  };

  const statusClass: Record<TankRecord["status"], string> = {
    empty: "neutral",
    in_use: "warning",
    aging: "success"
  };

  const rows = tanks
    .map((t) => {
      const fillRate = t.capacity > 0 ? Math.round((t.currentVolume / t.capacity) * 100) : 0;
      return `
        <tr>
          <td class="mono"><strong>${t.tankNo}</strong></td>
          <td class="numeric">${t.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${t.currentVolume > 0 ? t.currentVolume.toLocaleString("ja-JP") + " L" : "―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${fillRate}%"></div>
            </div>
            <span class="progress-label">${fillRate}%</span>
          </td>
          <td>${t.productName || "―"}</td>
          <td class="mono">${t.jikomiNo || "―"}</td>
          <td>
            <span class="status-pill ${statusClass[t.status]}">${statusLabel[t.status]}</span>
          </td>
          <td>${t.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${t.id}">詳細</button>
          </td>
        </tr>
      `;
    })
    .join("");

  const inUseCount = tanks.filter((t) => t.status === "in_use").length;
  const agingCount = tanks.filter((t) => t.status === "aging").length;
  const emptyCount = tanks.filter((t) => t.status === "empty").length;
  const totalCapacity = tanks.reduce((s, t) => s + t.capacity, 0);
  const totalVolume = tanks.reduce((s, t) => s + t.currentVolume, 0);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${totalCapacity.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${totalCapacity > 0 ? Math.round((totalVolume / totalCapacity) * 100) : 0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${inUseCount} 基</p>
        <p class="kpi-sub">熟成中 ${agingCount} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${emptyCount} 基</p>
        <p class="kpi-sub">使用可能</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>タンク一覧</h2>
        <p class="panel-caption">${tanks.length} 基</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>タンクNo.</th>
              <th class="numeric">容量</th>
              <th class="numeric">現在量</th>
              <th>充填率</th>
              <th>銘柄</th>
              <th>仕込番号</th>
              <th>状態</th>
              <th>更新日</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}
