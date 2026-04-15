import type { AnalyticsTab, SalesAnalytics } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
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

function buildBars(monthlyTrend: SalesAnalytics["monthlyTrend"]): string {
  const width = 760;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 36, left: 50 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...monthlyTrend.map((point) => point.amount), 1);
  const step = plotWidth / monthlyTrend.length;

  const bars = monthlyTrend
    .map((point, index) => {
      const barHeight = (point.amount / maxValue) * plotHeight;
      const x = padding.left + index * step + 8;
      const y = padding.top + plotHeight - barHeight;
      return `
        <g>
          <rect x="${x}" y="${y}" width="${Math.max(step - 16, 16)}" height="${barHeight}" rx="6" fill="var(--primary)" opacity="${0.55 + (index / monthlyTrend.length) * 0.35}" />
          <text x="${x}" y="${height - 10}" class="chart-axis">${point.month}</text>
        </g>
      `;
    })
    .join("");

  const yAxis = [0, 0.25, 0.5, 0.75, 1]
    .map((ratio) => {
      const y = padding.top + plotHeight - plotHeight * ratio;
      const label = Math.round((maxValue * ratio) / 10000);
      return `
        <g>
          <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid" />
          <text x="8" y="${y + 4}" class="chart-axis">${label.toLocaleString("ja-JP")}万円</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="月別売上推移">
      ${yAxis}
      ${bars}
    </svg>
  `;
}

export function renderSalesAnalytics(
  analytics: SalesAnalytics,
  activeTab: AnalyticsTab
): string {
  const rows = (activeTab === "products" ? analytics.byProduct : analytics.byCustomer)
    .map(
      (row) => `
        <tr>
          <td class="numeric">${row.rank}</td>
          <td class="mono">${row.code}</td>
          <td>${row.name}</td>
          <td class="numeric">${formatCurrency(row.totalAmount)}</td>
          <td class="numeric">${row.share.toFixed(1)}%</td>
        </tr>
      `
    )
    .join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月次推移と売上構成</h1>
      </div>
      <div class="meta-stack">
        <span class="meta-note">集計生成 ${formatDateTime(analytics.generatedAt)}</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>月別売上推移</h2>
          <p class="panel-caption">直近12か月の売上金額</p>
        </div>
      </div>
      ${buildBars(analytics.monthlyTrend)}
    </section>

    <section class="panel">
      <div class="panel-header tabs-header">
        <div>
          <h2>売上ランキング</h2>
          <p class="panel-caption">${activeTab === "products" ? "商品別" : "得意先別"}の売上構成</p>
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
              <th class="numeric">ランク</th>
              <th>コード</th>
              <th>名称</th>
              <th class="numeric">売上合計</th>
              <th class="numeric">構成比</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}
