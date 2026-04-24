import type { AnalyticsBreakdownRow, AnalyticsTab, AnalyticsPeriod, SalesAnalytics, StaffBreakdownRow, DrilldownBreakdownRow } from "../api";
import { makeSortableHeader, applySortToRows, type SortState } from "../utils/tableSort";

const ANALYTICS_COL_MAP: Record<string, keyof AnalyticsBreakdownRow> = {
  code: "code", name: "name", amount: "amount", quantity: "quantity", documents: "documents"
};

export type AnalyticsDrilldown = {
  tab: "products" | "customers";
  code: string;
  name: string;
  monthlySales: { month: string; amount: number }[];
  breakdownRows: DrilldownBreakdownRow[];
} | null;

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

function buildBars(points: { month: string; amount: number }[], color = "#0F5B8D"): string {
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
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="6" fill="${color}" opacity="${0.58 + (index / points.length) * 0.34}" />
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

function renderBreakdownRows(rows: AnalyticsBreakdownRow[], showDrilldownButton = false): string {
  if (rows.length === 0) {
    return `<tr><td colspan="${showDrilldownButton ? 6 : 5}" class="empty-row">データなし</td></tr>`;
  }
  return rows.map((row) => `
    <tr>
      <td class="mono">${row.code}</td>
      <td>${row.name}</td>
      <td class="numeric">${formatCurrency(row.amount)}</td>
      <td class="numeric">${row.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${row.documents.toLocaleString("ja-JP")}</td>
      ${showDrilldownButton ? `<td><button class="button secondary small" data-analytics-drilldown="${row.code}" data-drilldown-name="${row.name}">詳細</button></td>` : ""}
    </tr>
  `).join("");
}

function renderDrilldownBreakdownRows(rows: DrilldownBreakdownRow[]): string {
  if (rows.length === 0) {
    return `<tr><td colspan="6" class="empty-row">データなし</td></tr>`;
  }
  return rows.map((r) => `
    <tr>
      <td class="mono">${r.code || "―"}</td>
      <td>${r.name || "不明"}</td>
      <td class="mono">${r.tag || "―"}</td>
      <td class="numeric">${formatCurrency(r.amount)}</td>
      <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${r.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("");
}

type StaffDrilldown = {
  code: string;
  name: string;
  breakdownTab: "customers" | "products";
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
  periodRows: AnalyticsBreakdownRow[] = [],
  periodOptions: string[] = [],
  staffFilter: string = "",
  tagFilter: string = "",
  staffDrilldown: StaffDrilldown = null,
  staffPeriod: AnalyticsPeriod = "all",
  staffPeriodFilter: string = "",
  staffPeriodOptions: string[] = [],
  staffPeriodTotals: AnalyticsBreakdownRow[] = [],
  sortState: SortState = [],
  drilldown: AnalyticsDrilldown = null
): string {
  const tableTitle = activeTab === "products" ? "商品別集計" : activeTab === "customers" ? "得意先別集計" : "担当別集計";
  const baseRows = activeTab === "products" ? summary.productTotals : activeTab === "customers" ? summary.customerTotals : summary.staffTotals;
  const showPeriodData = activePeriod !== "all" && periodRows.length > 0 && activeTab !== "staff";
  // ソートを適用
  const rawRows = showPeriodData ? periodRows : baseRows;
  const rows = applySortToRows(rawRows as Record<string, unknown>[], sortState, ANALYTICS_COL_MAP) as AnalyticsBreakdownRow[];

  // ドリルダウン中のチャートデータ
  const chartPoints = drilldown && drilldown.monthlySales.length > 0
    ? drilldown.monthlySales.slice(-24)
    : summary.monthlySales;
  const chartTitle = drilldown
    ? `${drilldown.name} の月別売上推移`
    : "月別売上";
  const chartCaption = drilldown
    ? `${drilldown.tab === "customers" ? "得意先" : "商品"}: ${drilldown.code}`
    : "直近月の売上推移";
  const chartColor = drilldown ? "#0968e5" : "#0F5B8D";

  const periodButtons = (["all", "yearly", "monthly", "weekly", "daily"] as AnalyticsPeriod[])
    .map((p) => `<button class="button ${p === activePeriod ? "primary" : "secondary"} small" type="button" data-analytics-period="${p}">${PERIOD_LABELS[p]}</button>`)
    .join("");

  const periodSelect = activePeriod !== "all" && periodOptions.length > 0 && activeTab !== "staff"
    ? `<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${periodOptions.map((o) => `<option value="${o}" ${o === periodFilter ? "selected" : ""}>${o}</option>`).join("")}
      </select>`
    : "";

  // ── 担当タブ ─────────────────────────────────────────────────────────────────
  let staffTableHtml = "";
  let drilldownHtml = "";
  if (activeTab === "staff") {
    // 期間ボタン（担当専用）
    const staffPeriodButtons = (["all", "yearly", "monthly", "weekly", "daily"] as AnalyticsPeriod[])
      .map((p) => `<button class="button ${p === staffPeriod ? "primary" : "secondary"} small" type="button" data-staff-period="${p}">${PERIOD_LABELS[p]}</button>`)
      .join("");

    const staffPeriodSelect = staffPeriod !== "all" && staffPeriodOptions.length > 0
      ? `<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${staffPeriodOptions.map((o) => `<option value="${o}" ${o === staffPeriodFilter ? "selected" : ""}>${o}</option>`).join("")}
        </select>`
      : "";

    // 表示する行: 期間フィルタ中はRPC結果、全期間はキャッシュ済みのstaffTotals
    const displayRows = staffPeriodTotals.length > 0 ? staffPeriodTotals : summary.staffTotals;
    const filteredStaff = displayRows.filter((r) =>
      !staffFilter || r.name.includes(staffFilter) || r.code.includes(staffFilter)
    );

    const periodLabel = staffPeriod !== "all" && staffPeriodFilter ? ` (${staffPeriodFilter})` : "";

    staffTableHtml = `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${staffPeriodButtons}</div>
        ${staffPeriodSelect}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${staffFilter}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${periodLabel ? `<span style="font-size:12px;color:var(--text-secondary);">${periodLabel}</span>` : ""}
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
      const activeBreakdownTab = staffDrilldown.breakdownTab;
      const periodRangeNote = staffPeriod !== "all" && staffPeriodFilter
        ? `<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${staffPeriodFilter}</span>`
        : "";

      drilldownHtml = `
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${staffDrilldown.name} の内訳${periodRangeNote}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${activeBreakdownTab === "customers" ? "active" : ""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${activeBreakdownTab === "products" ? "active" : ""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${tagFilter}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${activeBreakdownTab === "customers"
            ? renderDrilldownTable(staffDrilldown.customerRows, tagFilter, "得意先名")
            : renderDrilldownTable(staffDrilldown.productRows, tagFilter, "商品名")
          }
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
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${chartTitle}</h2>
            <p class="panel-caption">${chartCaption}</p>
          </div>
          ${drilldown ? `<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>` : ""}
        </div>
        <div class="chart-scroll">
          ${buildBars(chartPoints, chartColor)}
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
                  ${makeSortableHeader("code",      "コード", sortState, "mono")}
                  ${makeSortableHeader("name",      "名称",   sortState)}
                  ${makeSortableHeader("amount",    "売上額", sortState, "numeric")}
                  ${makeSortableHeader("quantity",  "数量",   sortState, "numeric")}
                  ${makeSortableHeader("documents", "伝票数", sortState, "numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${renderBreakdownRows(rows, true)}</tbody>
            </table>
          </div>
        ` : staffTableHtml}
      </article>
    </section>

    ${drilldown ? `
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${drilldown.name} の${drilldown.tab === "customers" ? "商品別" : "得意先別"}内訳</h2>
            <p class="panel-caption">${drilldown.tab === "customers" ? "この得意先が購入した商品" : "この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${drilldown.tab === "customers" ? "商品名" : "得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">数量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${renderDrilldownBreakdownRows(drilldown.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    ` : ""}

    ${drilldownHtml}
  `;
}
