import type { AnalyticsBreakdownRow, AnalyticsTab, AnalyticsPeriod, SalesAnalytics, StaffBreakdownRow, DrilldownBreakdownRow, PeriodChartPoint, AnalyticsMonthlyPoint } from "../api";
import { makeSortableHeader, applySortToRows, type SortState } from "../utils/tableSort";

const ANALYTICS_COL_MAP: Record<string, keyof AnalyticsBreakdownRow> = {
  code: "code", name: "name", amount: "amount", quantity: "quantity", documents: "documents", volumeMl: "volumeMl"
};

export type ChartMetric = "amount" | "quantity" | "volume";
export type FiscalMode = "calendar" | "fiscal";
const CHART_METRIC_LABELS: Record<ChartMetric, string> = { amount: "売上額", quantity: "出荷本数", volume: "移出量" };
const FISCAL_START_MONTH = 10; // 決算期: 10月始まり

/** 月→決算年度に変換 (2026-01 → 2025, 2025-10 → 2025, 2025-09 → 2024) */
export function monthToFiscalYear(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return m >= FISCAL_START_MONTH ? y : y - 1;
}

/** 決算年度→日付範囲 (2025 → 2025-10-01 ~ 2026-09-30) */
export function fiscalYearToDateRange(fy: number): { from: string; to: string } {
  const endMonth = FISCAL_START_MONTH - 1;
  const lastDay = new Date(fy + 1, endMonth, 0).getDate();
  return {
    from: `${fy}-${String(FISCAL_START_MONTH).padStart(2, "0")}-01`,
    to: `${fy + 1}-${String(endMonth).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`
  };
}

export type AnalyticsDrilldown = {
  tab: "products" | "customers";
  code: string;
  name: string;
  monthlySales: PeriodChartPoint[];
  breakdownRows: DrilldownBreakdownRow[];
} | null;

/** 月別データから年別に集約して全年チャートを生成 */
function buildYearlyFromMonthly(all: AnalyticsMonthlyPoint[], metric: ChartMetric, fiscal: FiscalMode): { curr: { month: string; amount: number }[] } {
  const getValue = (p: AnalyticsMonthlyPoint) => metric === "quantity" ? p.quantity : metric === "volume" ? p.volumeMl : p.amount;
  const yearMap = new Map<string, number>();
  for (const p of all) {
    const key = fiscal === "fiscal"
      ? `${monthToFiscalYear(p.month)}年度`
      : p.month.slice(0, 4);
    yearMap.set(key, (yearMap.get(key) ?? 0) + getValue(p));
  }
  const years = [...yearMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  return { curr: years.map(([y, v]) => ({ month: y, amount: v })) };
}

/** 月別データから決算年度の選択肢を生成 */
function buildFiscalYearOptions(all: AnalyticsMonthlyPoint[]): string[] {
  const fySet = new Set<number>();
  for (const p of all) fySet.add(monthToFiscalYear(p.month));
  return [...fySet].sort((a, b) => b - a).map(String);
}

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

function buildBars(
  points: { month: string; amount: number }[],
  color = "#0F5B8D",
  prevPoints: { month: string; amount: number }[] = [],
  metric: ChartMetric = "amount"
): string {
  if (points.length === 0) {
    return `<div class="chart-empty">データなし</div>`;
  }

  const hasPrev = prevPoints.length > 0 && prevPoints.some(p => p.amount > 0);
  const width = 760;
  const height = 280;
  const padding = { top: 16, right: 24, bottom: 36, left: metric === "amount" ? 64 : 56 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const allAmounts = [...points.map(p => p.amount), ...prevPoints.map(p => p.amount)];
  const maxValue = Math.max(...allAmounts, 1);
  const step = plotWidth / points.length;

  function axisLabel(value: number): string {
    if (metric === "quantity") {
      return value >= 10000 ? `${(value / 10000).toFixed(1)}万本` : `${Math.round(value).toLocaleString()}本`;
    }
    if (metric === "volume") {
      const liters = value / 1000;
      return liters >= 10000 ? `${(liters / 1000).toFixed(0)}kL` : `${Math.round(liters).toLocaleString()} L`;
    }
    return `${Math.round(value / 10000).toLocaleString("ja-JP")}万円`;
  }

  function tooltipLabel(value: number): string {
    if (metric === "quantity") return `${value.toLocaleString()}本`;
    if (metric === "volume") return fmtVol(value);
    return formatCurrency(value);
  }

  const axes = [0, 0.25, 0.5, 0.75, 1]
    .map((ratio) => {
      const y = padding.top + plotHeight - plotHeight * ratio;
      const label = axisLabel(maxValue * ratio);
      return `<g>
        <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid" />
        <text x="4" y="${y + 4}" class="chart-axis">${label}</text>
      </g>`;
    }).join("");

  const bars = points.map((point, index) => {
    const barWidth = hasPrev ? Math.max((step - 18) / 2, 10) : Math.max(step - 18, 24);
    const gap = hasPrev ? 2 : 0;
    const x = padding.left + index * step + (step - (hasPrev ? barWidth * 2 + gap : barWidth)) / 2;
    const barH = (point.amount / maxValue) * plotHeight;
    const barY = padding.top + plotHeight - barH;

    // 前年バー（位置ベースで照合 — ラベルが年違いでも正しく対応）
    const prevAmt = prevPoints[index]?.amount ?? 0;
    const prevH = (prevAmt / maxValue) * plotHeight;
    const prevY = padding.top + plotHeight - prevH;
    const prevBar = hasPrev
      ? `<rect x="${x}" y="${prevY}" width="${barWidth}" height="${prevH}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${tooltipLabel(prevAmt)}</title></rect>`
      : "";

    // 当年バー
    const currX = hasPrev ? x + barWidth + gap : x;
    return `<g>
      ${prevBar}
      <rect x="${currX}" y="${barY}" width="${barWidth}" height="${barH}" rx="4" fill="${color}" opacity="${0.6 + (index / points.length) * 0.35}"><title>${tooltipLabel(point.amount)}</title></rect>
      <text x="${padding.left + index * step + step / 2}" y="${height - 8}" class="chart-axis centered-axis">${formatMonth(point.month)}</text>
    </g>`;
  }).join("");

  const legend = hasPrev ? `
    <g transform="translate(${width - 160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${color}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>` : "";

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${axes}${bars}${legend}
    </svg>
  `;
}

function fmtVol(ml: number): string {
  return ml >= 1000 ? `${(ml / 1000).toLocaleString("ja-JP", { maximumFractionDigits: 1 })} L` : `${ml.toLocaleString("ja-JP")} ml`;
}

function renderBreakdownRows(rows: AnalyticsBreakdownRow[], showDrilldownButton = false): string {
  const cols = showDrilldownButton ? 7 : 6;
  if (rows.length === 0) {
    return `<tr><td colspan="${cols}" class="empty-row">データなし</td></tr>`;
  }
  return rows.map((row) => `
    <tr>
      <td class="mono">${row.code}</td>
      <td>${row.name}</td>
      <td class="numeric">${formatCurrency(row.amount)}</td>
      <td class="numeric">${row.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${fmtVol(row.volumeMl)}</td>
      <td class="numeric">${row.documents.toLocaleString("ja-JP")}</td>
      ${showDrilldownButton ? `<td><button class="button secondary small" data-analytics-drilldown="${row.code}" data-drilldown-name="${row.name}">詳細</button></td>` : ""}
    </tr>
  `).join("");
}

function renderDrilldownBreakdownRows(rows: DrilldownBreakdownRow[]): string {
  if (rows.length === 0) {
    return `<tr><td colspan="7" class="empty-row">データなし</td></tr>`;
  }
  return rows.map((r) => `
    <tr>
      <td class="mono">${r.code || "―"}</td>
      <td>${r.name || "不明"}</td>
      <td class="mono">${r.tag || "―"}</td>
      <td class="numeric">${formatCurrency(r.amount)}</td>
      <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${fmtVol(r.volumeMl)}</td>
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
  drilldown: AnalyticsDrilldown = null,
  periodChartData: PeriodChartPoint[] = [],
  prevYearChartData: PeriodChartPoint[] = [],
  chartMetric: ChartMetric = "amount",
  fiscalMode: FiscalMode = "calendar"
): string {
  const tableTitle = activeTab === "products" ? "商品別集計" : activeTab === "customers" ? "得意先別集計" : "担当別集計";
  const baseRows = activeTab === "products" ? summary.productTotals : activeTab === "customers" ? summary.customerTotals : summary.staffTotals;
  const showPeriodData = activePeriod !== "all" && periodRows.length > 0 && activeTab !== "staff";
  // ソートを適用
  const rawRows = showPeriodData ? periodRows : baseRows;
  const rows = applySortToRows(rawRows as Record<string, unknown>[], sortState, ANALYTICS_COL_MAP) as AnalyticsBreakdownRow[];

  // チャートデータの優先順位: ドリルダウン > 期間フィルタ > 全体月別
  const PERIOD_CHART_LABELS: Record<AnalyticsPeriod, string> = {
    all: "月別", yearly: "月別推移", monthly: "日別推移", weekly: "日別推移", daily: "当日"
  };
  const metricLabel = CHART_METRIC_LABELS[chartMetric];
  const metricPick = (p: PeriodChartPoint) => chartMetric === "quantity" ? p.quantity : chartMetric === "volume" ? p.volumeMl : p.amount;
  const metricFmt = (v: number) => chartMetric === "quantity" ? `${v.toLocaleString()}本` : chartMetric === "volume" ? fmtVol(v) : formatCurrency(v);

  let chartPoints: { month: string; amount: number }[];
  let chartPrevPoints: { month: string; amount: number }[] = [];
  let chartTitle: string;
  let chartCaption: string;
  let chartColor: string;

  if (drilldown && drilldown.monthlySales.length > 0) {
    chartPoints = drilldown.monthlySales.slice(-24).map(p => ({ month: p.month, amount: metricPick(p) }));
    chartTitle = `${drilldown.name} の月別${metricLabel}`;
    chartCaption = `${drilldown.tab === "customers" ? "得意先" : "商品"}: ${drilldown.code}`;
    chartColor = "#0968e5";
  } else if (periodChartData.length > 0 && activePeriod !== "all") {
    chartPoints = periodChartData.map(p => ({ month: p.month, amount: metricPick(p) }));
    chartPrevPoints = prevYearChartData.map(p => ({ month: p.month, amount: metricPick(p) }));
    const currTotal = chartPoints.reduce((s, p) => s + p.amount, 0);
    const prevTotal = chartPrevPoints.reduce((s, p) => s + p.amount, 0);
    const yoyPct = prevTotal > 0 ? ((currTotal - prevTotal) / prevTotal * 100) : 0;
    const yoySign = yoyPct > 0 ? "+" : "";
    chartTitle = `${PERIOD_CHART_LABELS[activePeriod]} ${metricLabel}（${periodFilter}）`;
    chartCaption = `${metricFmt(currTotal)}${prevTotal > 0 ? ` / 前年比 ${yoySign}${yoyPct.toFixed(1)}%` : ""}`;
    chartColor = "#2f855a";
  } else {
    // 全期間: 年別バーチャート（暦年 or 決算年度）
    const yearly = buildYearlyFromMonthly(summary.monthlySales, chartMetric, fiscalMode);
    chartPoints = yearly.curr;
    chartPrevPoints = [];
    const total = chartPoints.reduce((s, p) => s + p.amount, 0);
    const yearLabel = fiscalMode === "fiscal" ? "決算年度別" : "暦年別";
    chartTitle = `${yearLabel}${metricLabel}`;
    chartCaption = `累計 ${metricFmt(total)}（${chartPoints.length}${fiscalMode === "fiscal" ? "期" : "年"}）`;
    chartColor = "#0F5B8D";
  }

  // チャートメトリック切替タブ
  const chartMetricTabs = (["amount", "quantity", "volume"] as ChartMetric[])
    .map(m => `<button class="tab-button ${m === chartMetric ? "active" : ""}" data-chart-metric="${m}">${CHART_METRIC_LABELS[m]}</button>`)
    .join("");

  const periodButtons = (["all", "yearly", "monthly", "weekly", "daily"] as AnalyticsPeriod[])
    .map((p) => `<button class="button ${p === activePeriod ? "primary" : "secondary"} small" type="button" data-analytics-period="${p}">${PERIOD_LABELS[p]}</button>`)
    .join("");

  // 決算期+年次のときは決算年度オプションを上書き
  const effectiveOptions = (fiscalMode === "fiscal" && activePeriod === "yearly")
    ? buildFiscalYearOptions(summary.monthlySales)
    : periodOptions;
  const effectiveFilter = (fiscalMode === "fiscal" && activePeriod === "yearly" && !effectiveOptions.includes(periodFilter))
    ? effectiveOptions[0] ?? "" : periodFilter;

  const periodSelect = activePeriod !== "all" && effectiveOptions.length > 0 && activeTab !== "staff"
    ? `<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${effectiveOptions.map((o) => `<option value="${o}" ${o === effectiveFilter ? "selected" : ""}>${fiscalMode === "fiscal" && activePeriod === "yearly" ? o + "年度" : o}</option>`).join("")}
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
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${fiscalMode === "calendar" ? "active" : ""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${fiscalMode === "fiscal" ? "active" : ""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${chartTitle}</h2>
            <p class="panel-caption">${chartCaption}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${chartMetricTabs}</div>
            ${drilldown ? `<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>` : ""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${buildBars(chartPoints, chartColor, chartPrevPoints, chartMetric)}
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
                  ${makeSortableHeader("quantity",  "本数",   sortState, "numeric")}
                  ${makeSortableHeader("volumeMl",  "移出量", sortState, "numeric")}
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
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
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
