import type { AnalyticsBreakdownRow, AnalyticsTab, SalesAnalytics } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

function formatMonth(value: string): string {
  return value.replace("-", "/");
}

function buildBars(points: SalesAnalytics["monthlySales"]): string {
  if (points.length === 0) {
    return `<div class="chart-empty">データなし</div>`;
  }

  const width = 760;
  const height = 280;
  const padding = { top: 16, right: 24, bottom: 36, left: 64 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...points.map((point) => point.amount), 1);
  const step = plotWidth / points.length;

  const axes = [0, 0.25, 0.5, 0.75, 1]
    .map((ratio) => {
      const y = padding.top + plotHeight - plotHeight * ratio;
      const label = `${Math.round((maxValue * ratio) / 10000).toLocaleString("ja-JP")}万円`;
      return `
        <g>
          <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid" />
          <text x="8" y="${y + 4}" class="chart-axis">${label}</text>
        </g>
      `;
    })
    .join("");

  const bars = points
    .map((point, index) => {
      const barHeight = (point.amount / maxValue) * plotHeight;
      const barWidth = Math.max(step - 18, 24);
      const x = padding.left + index * step + (step - barWidth) / 2;
      const y = padding.top + plotHeight - barHeight;
      return `
        <g>
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="6" class="analytics-bar" />
          <text x="${x + barWidth / 2}" y="${height - 10}" class="chart-axis centered-axis">${formatMonth(point.month)}</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${axes}
      ${bars}
    </svg>
  `;
}

function renderBreakdownRows(rows: AnalyticsBreakdownRow[]): string {
  if (rows.length === 0) {
    return `<tr><td colspan="5" class="empty-row">データなし</td></tr>`;
  }

  return rows
    .map(
      (row) => `
        <tr>
          <td class="mono">${row.code}</td>
          <td>${row.name}</td>
          <td class="numeric">${formatCurrency(row.amount)}</td>
          <td class="numeric">${row.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${row.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `
    )
    .join("");
}

export function renderSalesAnalytics(summary: SalesAnalytics, activeTab: AnalyticsTab): string {
  const tableTitle = activeTab === "products" ? "商品別集計" : "得意先別集計";
  const rows = activeTab === "products" ? summary.productTotals : summary.customerTotals;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>月別売上</h2>
            <p class="panel-caption">直近月の売上推移</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${buildBars(summary.monthlySales)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${tableTitle}</h2>
            <p class="panel-caption">売上金額順に表示</p>
          </div>
          <div class="tab-group">
            <button class="tab-button ${activeTab === "products" ? "active" : ""}" data-analytics-tab="products">商品別</button>
            <button class="tab-button ${activeTab === "customers" ? "active" : ""}" data-analytics-tab="customers">得意先別</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名称</th>
                <th class="numeric">売上額</th>
                <th class="numeric">数量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${renderBreakdownRows(rows)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `;
}
