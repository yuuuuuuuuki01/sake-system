import type { AnalyticsBreakdownRow, AnalyticsTab, AnalyticsPeriod, PeriodBreakdownRow, SalesAnalytics, StaffBreakdownRow } from "../api";

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

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  all: "全期間",
  yearly: "年次",
  monthly: "月次",
  weekly: "週次",
  daily: "日次"
};

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

function renderPeriodRows(rows: PeriodBreakdownRow[]): string {
  if (rows.length === 0) {
    return `<tr><td colspan="6" class="empty-row">データなし</td></tr>`;
  }

  return rows
    .map(
      (row) => `
        <tr>
          <td class="mono">${row.code}</td>
          <td>${row.name}</td>
          <td class="mono">${row.period}</td>
          <td class="numeric">${formatCurrency(row.amount)}</td>
          <td class="numeric">${row.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${row.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `
    )
    .join("");
}

type StaffDrilldown = {
  code: string;
  name: string;
  customerRows: StaffBreakdownRow[];
  productRows: StaffBreakdownRow[];
} | null;

function renderDrilldownTable(rows: StaffBreakdownRow[], tagFilter: string, colLabel: string): string {
  const filtered = tagFilter
    ? rows.filter((r) => r.tag.includes(tagFilter) || r.name.includes(tagFilter))
    : rows;

  const bodyHtml = filtered.length === 0
    ? `<tr><td colspan="5" class="empty-row">データなし</td></tr>`
    : filtered.map((r) => `
        <tr>
          <td class="mono">${r.code || "―"}</td>
          <td>${r.name || "未設定"}</td>
          <td class="mono">${r.tag || "―"}</td>
          <td class="numeric">${formatCurrency(r.amount)}</td>
          <td class="numeric">${r.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("");

  return `
    <div class="table-wrap" style="margin-top:8px;">
      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>${colLabel}</th>
            <th>タグ</th>
            <th class="numeric">売上額</th>
            <th class="numeric">伝票数</th>
          </tr>
        </thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>
  `;
}

export function renderSalesAnalytics(
  summary: SalesAnalytics,
  activeTab: AnalyticsTab,
  activePeriod: AnalyticsPeriod = "all",
  periodFilter: string = "",
  periodRows: PeriodBreakdownRow[] = [],
  periodOptions: string[] = [],
  staffFilter: string = "",
  tagFilter: string = "",
  staffDrilldown: StaffDrilldown = null
): string {
  const tableTitle = activeTab === "products" ? "商品別集計" : activeTab === "customers" ? "得意先別集計" : "担当別集計";
  const rows = activeTab === "products" ? summary.productTotals : activeTab === "customers" ? summary.customerTotals : summary.staffTotals;
  const showPeriodData = activePeriod !== "all" && periodRows.length > 0 && activeTab !== "staff";

  const periodButtons = (["all", "yearly", "monthly", "weekly", "daily"] as AnalyticsPeriod[])
    .map((p) => `<button class="button ${p === activePeriod ? "primary" : "secondary"} small" type="button" data-analytics-period="${p}">${PERIOD_LABELS[p]}</button>`)
    .join("");

  const periodSelect = activePeriod !== "all" && periodOptions.length > 0 && activeTab !== "staff"
    ? `<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${periodOptions.map((o) => `<option value="${o}" ${o === periodFilter ? "selected" : ""}>${o}</option>`).join("")}
      </select>`
    : "";

  // Staff tab content
  let staffTableHtml = "";
  let drilldownHtml = "";
  if (activeTab === "staff") {
    const filteredStaff = summary.staffTotals.filter((r) =>
      !staffFilter || r.name.includes(staffFilter) || r.code.includes(staffFilter)
    );

    staffTableHtml = `
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${staffFilter}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>担当コード</th>
              <th>担当名</th>
              <th class="numeric">売上額</th>
              <th class="numeric">数量</th>
              <th class="numeric">伝票数</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${filteredStaff.length === 0 ? '<tr><td colspan="6" class="empty-row">データなし</td></tr>' :
              filteredStaff.map((row) => `
                <tr>
                  <td class="mono">${row.code || "―"}</td>
                  <td>${row.name || "未設定"}</td>
                  <td class="numeric">${formatCurrency(row.amount)}</td>
                  <td class="numeric">${row.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${row.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${row.code}" data-staff-name="${row.name}">詳細</button></td>
                </tr>
              `).join("")
            }
          </tbody>
        </table>
      </div>
    `;

    if (staffDrilldown) {
      drilldownHtml = `
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${staffDrilldown.name} の得意先・商品内訳</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${tagFilter}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>
          <h3 style="margin:12px 0 4px;font-size:14px;color:var(--text-secondary);">得意先別</h3>
          ${renderDrilldownTable(staffDrilldown.customerRows, tagFilter, "得意先名")}
          <h3 style="margin:16px 0 4px;font-size:14px;color:var(--text-secondary);">商品別</h3>
          ${renderDrilldownTable(staffDrilldown.productRows, tagFilter, "商品名")}
        </article>
      `;
    }
  }

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
            <button class="tab-button ${activeTab === "staff" ? "active" : ""}" data-analytics-tab="staff">担当別</button>
          </div>
        </div>

        ${activeTab !== "staff" ? `
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
            <div class="button-group">${periodButtons}</div>
            ${periodSelect}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>コード</th>
                  <th>名称</th>
                  ${showPeriodData ? "<th>期間</th>" : ""}
                  <th class="numeric">売上額</th>
                  <th class="numeric">数量</th>
                  <th class="numeric">伝票数</th>
                </tr>
              </thead>
              <tbody>${showPeriodData ? renderPeriodRows(periodRows) : renderBreakdownRows(rows)}</tbody>
            </table>
          </div>
        ` : staffTableHtml}
      </article>
    </section>
    ${drilldownHtml}
  `;
}
