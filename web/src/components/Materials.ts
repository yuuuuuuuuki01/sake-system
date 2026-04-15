import type { MaterialRecord } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function renderMaterials(materials: MaterialRecord[]): string {
  const rows = materials
    .map((m) => {
      const stockRatio = m.minimumStock > 0 ? m.currentStock / m.minimumStock : Infinity;
      const isLow = stockRatio < 1.5;
      return `
        <tr>
          <td class="mono">${m.code}</td>
          <td>${m.name}</td>
          <td class="numeric ${isLow ? "text-danger" : ""}">
            ${m.currentStock.toLocaleString("ja-JP")} ${m.unit}
            ${isLow ? `<span class="status-pill warning" style="margin-left:4px">要補充</span>` : ""}
          </td>
          <td class="numeric">${m.minimumStock.toLocaleString("ja-JP")} ${m.unit}</td>
          <td class="numeric">${formatCurrency(m.unitCost)}</td>
          <td class="numeric">${formatCurrency(m.currentStock * m.unitCost)}</td>
          <td>${m.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${m.id}">調整</button>
          </td>
        </tr>
      `;
    })
    .join("");

  const lowStockCount = materials.filter(
    (m) => m.minimumStock > 0 && m.currentStock / m.minimumStock < 1.5
  ).length;
  const totalValue = materials.reduce((s, m) => s + m.currentStock * m.unitCost, 0);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>資材在庫管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="material-receive">＋ 資材受入</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">在庫評価額</p>
        <p class="kpi-value">${formatCurrency(totalValue)}</p>
        <p class="kpi-sub">${materials.length} 品目</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">要補充</p>
        <p class="kpi-value ${lowStockCount > 0 ? "text-danger" : ""}">${lowStockCount} 品目</p>
        <p class="kpi-sub">最低在庫を下回る恐れ</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>資材一覧</h2>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>品名</th>
              <th class="numeric">現在庫</th>
              <th class="numeric">最低在庫</th>
              <th class="numeric">単価</th>
              <th class="numeric">在庫金額</th>
              <th>更新日</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="8" class="empty-row">資材データがありません。</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}
