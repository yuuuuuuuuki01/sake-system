/* ─────────────────────────────────────────────
   日次営業KPIダッシュボード
   前年同月対比で得意先カバー状況を日次追跡
   ───────────────────────────────────────────── */

import type { DailyKpiData, DailyKpiCustomerRow, DailyKpiDayPoint, WeeklyMdPoint } from "../api";
import { makeSortableHeader, applySortToRows, type SortState } from "../utils/tableSort";

const COL_MAP: Record<string, keyof DailyKpiCustomerRow> = {
  customerCode: "customerCode", customerName: "customerName", staffCode: "staffCode",
  amountLastYearSameMonth: "amountLastYearSameMonth", amountThisMonth: "amountThisMonth",
  lastOrderDate: "lastOrderDate"
};

function fmtCurrency(v: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(v);
}

function fmtPct(v: number): string {
  return `${Math.round(v * 100)}%`;
}

function fmtCompact(v: number): string {
  if (v >= 10_000_000) return `${(v / 10_000_000).toFixed(1)}千万`;
  if (v >= 10_000) return `${Math.round(v / 10_000)}万`;
  return v.toLocaleString("ja-JP");
}

// ── KPIカード ──

function buildKpiCards(data: DailyKpiData): string {
  const prevTotal = data.customers.reduce((s, c) => s + c.amountLastYearSameMonth, 0);
  const currTotal = data.customers.reduce((s, c) => s + c.amountThisMonth, 0);
  const achievementRate = prevTotal > 0 ? currTotal / prevTotal : 0;

  const prevYearCusts = data.customers.filter(c => c.amountLastYearSameMonth > 0);
  const covered = prevYearCusts.filter(c => c.amountThisMonth > 0).length;
  const coverageRate = prevYearCusts.length > 0 ? covered / prevYearCusts.length : 0;

  const uncovered = prevYearCusts.filter(c => c.amountThisMonth === 0);
  const uncoveredImpact = uncovered.reduce((s, c) => s + c.amountLastYearSameMonth, 0);

  const achieveColor = achievementRate >= 1 ? "var(--green-600, #059669)" : achievementRate >= 0.8 ? "var(--amber-600, #d97706)" : "var(--red-600, #dc2626)";
  const coverColor = coverageRate >= 0.8 ? "var(--green-600, #059669)" : coverageRate >= 0.5 ? "var(--amber-600, #d97706)" : "var(--red-600, #dc2626)";

  return `
    <div class="kpi-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:16px;">
      <div class="panel" style="padding:16px;">
        <div style="font-size:12px;color:var(--text-secondary);">当月累計 vs 前年同月</div>
        <div style="font-size:24px;font-weight:700;color:${achieveColor};">${fmtPct(achievementRate)}</div>
        <div style="font-size:12px;color:var(--text-secondary);">¥${fmtCompact(currTotal)} / ¥${fmtCompact(prevTotal)}</div>
      </div>
      <div class="panel" style="padding:16px;">
        <div style="font-size:12px;color:var(--text-secondary);">注文済み / 前年実績先</div>
        <div style="font-size:24px;font-weight:700;color:${coverColor};">${covered} / ${prevYearCusts.length}</div>
        <div style="font-size:12px;color:var(--text-secondary);">アプローチ率 ${fmtPct(coverageRate)}</div>
      </div>
      <div class="panel" style="padding:16px;">
        <div style="font-size:12px;color:var(--text-secondary);">未注文先の前年売上</div>
        <div style="font-size:24px;font-weight:700;">¥${fmtCompact(uncoveredImpact)}</div>
        <div style="font-size:12px;color:var(--text-secondary);">${uncovered.length} 先が未注文</div>
      </div>
      <div class="panel" style="padding:16px;">
        <div style="font-size:12px;color:var(--text-secondary);">本日出荷件数</div>
        <div style="font-size:24px;font-weight:700;">${data.todayDocCount} 件</div>
        <div style="font-size:12px;color:var(--text-secondary);">前年同日 ${data.prevYearTodayDocCount} 件</div>
      </div>
    </div>
  `;
}

// ── 日次累積折れ線 ──

function buildCumulativeChart(current: DailyKpiDayPoint[], prevYear: DailyKpiDayPoint[]): string {
  const toCumulative = (pts: DailyKpiDayPoint[]): { day: number; cumulative: number }[] => {
    let cum = 0;
    return pts.map(p => { cum += p.amount; return { day: p.day, cumulative: cum }; });
  };
  const currCum = toCumulative(current);
  const prevCum = toCumulative(prevYear);
  if (currCum.length === 0 && prevCum.length === 0) return `<div class="chart-empty">データなし</div>`;

  const width = 760, height = 260;
  const padding = { top: 16, right: 24, bottom: 36, left: 64 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const maxDay = Math.max(...currCum.map(p => p.day), ...prevCum.map(p => p.day), 1);
  const maxVal = Math.max(...currCum.map(p => p.cumulative), ...prevCum.map(p => p.cumulative), 1);

  const toX = (day: number) => padding.left + ((day - 1) / Math.max(maxDay - 1, 1)) * plotW;
  const toY = (v: number) => padding.top + plotH - (v / maxVal) * plotH;

  const axes = [0, 0.25, 0.5, 0.75, 1].map(r => {
    const y = padding.top + plotH - plotH * r;
    const v = maxVal * r;
    const label = v >= 10_000 ? `${Math.round(v / 10_000)}万` : `${Math.round(v).toLocaleString()}`;
    return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid" />
      <text x="4" y="${y + 4}" class="chart-axis">${label}</text>`;
  }).join("");

  // X軸ラベル（5日おき）
  const xLabels = Array.from({ length: maxDay }, (_, i) => i + 1)
    .filter(d => d === 1 || d % 5 === 0 || d === maxDay)
    .map(d => `<text x="${toX(d)}" y="${height - 8}" class="chart-axis centered-axis">${d}</text>`)
    .join("");

  const makeLine = (pts: { day: number; cumulative: number }[], color: string, dash = false) => {
    if (pts.length === 0) return "";
    const d = pts.map(p => `${toX(p.day)},${toY(p.cumulative)}`).join(" ");
    const dashAttr = dash ? ` stroke-dasharray="6 4"` : "";
    const dots = pts.map(p =>
      `<circle cx="${toX(p.day)}" cy="${toY(p.cumulative)}" r="2.5" fill="${color}"><title>${p.day}日: ${fmtCurrency(p.cumulative)}</title></circle>`
    ).join("");
    return `<polyline points="${d}" fill="none" stroke="${color}" stroke-width="2"${dashAttr} opacity="0.8" />${dots}`;
  };

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="日次累積売上">
      ${axes}${xLabels}
      ${makeLine(prevCum, "#94a3b8", true)}
      ${makeLine(currCum, "#0F5B8D")}
      <g transform="translate(${width - 180}, 8)">
        <line x1="0" y1="5" x2="16" y2="5" stroke="#0F5B8D" stroke-width="2" />
        <text x="20" y="9" class="chart-axis" style="font-size:9px;">当年</text>
        <line x1="60" y1="5" x2="76" y2="5" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4" />
        <text x="80" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      </g>
    </svg>`;
}

// ── 担当別達成率バー ──

// ── 52週MDカレンダー ──

function buildWeeklyMdChart(current: WeeklyMdPoint[], prevYear: WeeklyMdPoint[]): string {
  if (current.length === 0 && prevYear.length === 0) return `<div class="chart-empty">データなし</div>`;

  const width = 760, height = 300;
  const padding = { top: 16, right: 24, bottom: 52, left: 64 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  // 1-53週のマップを作成
  const currMap = new Map(current.map(p => [p.week, p]));
  const prevMap = new Map(prevYear.map(p => [p.week, p]));
  const maxWeek = Math.max(...current.map(p => p.week), ...prevYear.map(p => p.week), 52);
  const weeks = Array.from({ length: maxWeek }, (_, i) => i + 1);

  const allAmounts = [
    ...current.map(p => p.amount),
    ...prevYear.map(p => p.amount)
  ];
  const maxVal = Math.max(...allAmounts, 1);

  const toX = (w: number) => padding.left + ((w - 1) / (maxWeek - 1)) * plotW;
  const toY = (v: number) => padding.top + plotH - (v / maxVal) * plotH;

  // 現在の週を特定
  const now = new Date();
  const jan4 = new Date(now.getFullYear(), 0, 4);
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000) + 1;
  const weekDay = (now.getDay() + 6) % 7;
  const currentWeek = Math.max(1, Math.min(53, Math.floor((dayOfYear - weekDay + 10) / 7)));

  // Y軸
  const yAxes = [0, 0.25, 0.5, 0.75, 1].map(r => {
    const y = padding.top + plotH - plotH * r;
    const v = maxVal * r;
    const label = v >= 10_000 ? `${Math.round(v / 10_000)}万` : `${Math.round(v).toLocaleString()}`;
    return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid" />
      <text x="4" y="${y + 4}" class="chart-axis">${label}</text>`;
  }).join("");

  // X軸ラベル（月の変わり目を表示）
  const monthLabels: string[] = [];
  const monthStarts = [1, 5, 9, 14, 18, 22, 27, 31, 35, 40, 44, 48]; // 各月のおおよその週
  const monthNames = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
  monthStarts.forEach((w, i) => {
    if (w <= maxWeek) {
      monthLabels.push(`<text x="${toX(w)}" y="${height - 24}" class="chart-axis centered-axis">${monthNames[i]}</text>`);
    }
  });
  // 週番号（4週ごと）
  const weekLabels = weeks
    .filter(w => w % 4 === 0 || w === 1)
    .map(w => `<text x="${toX(w)}" y="${height - 8}" class="chart-axis centered-axis" style="font-size:9px;fill:#94a3b8;">W${w}</text>`)
    .join("");

  // 現在週のマーカー
  const weekMarker = `<line x1="${toX(currentWeek)}" y1="${padding.top}" x2="${toX(currentWeek)}" y2="${padding.top + plotH}" stroke="#dc2626" stroke-width="1" stroke-dasharray="4 3" opacity="0.6" />
    <text x="${toX(currentWeek)}" y="${padding.top - 4}" class="chart-axis centered-axis" style="font-size:9px;fill:#dc2626;">今週</text>`;

  // 折れ線
  const makeLine = (map: Map<number, WeeklyMdPoint>, color: string, dash = false, yearLabel: string) => {
    const pts = weeks.filter(w => map.has(w));
    if (pts.length === 0) return "";
    const d = pts.map(w => `${toX(w)},${toY(map.get(w)!.amount)}`).join(" ");
    const dashAttr = dash ? ` stroke-dasharray="6 4"` : "";
    const dots = pts.map(w => {
      const p = map.get(w)!;
      return `<circle cx="${toX(w)}" cy="${toY(p.amount)}" r="2" fill="${color}" opacity="0.7"><title>W${w}(${yearLabel}): ${fmtCurrency(p.amount)} / ${p.docs}件</title></circle>`;
    }).join("");
    return `<polyline points="${d}" fill="none" stroke="${color}" stroke-width="2"${dashAttr} opacity="0.8" />${dots}`;
  };

  // 累積差分バー（当年-前年を週ごとに薄く表示）
  let cumCurr = 0, cumPrev = 0;
  const diffBars = weeks.map(w => {
    cumCurr += currMap.get(w)?.amount ?? 0;
    cumPrev += prevMap.get(w)?.amount ?? 0;
    return null; // 差分バーは省略（チャートが見づらくなるため）
  });

  const now_y = now.getFullYear();
  const legend = `
    <g transform="translate(${width - 200}, 6)">
      <line x1="0" y1="5" x2="16" y2="5" stroke="#0F5B8D" stroke-width="2" />
      <text x="20" y="9" class="chart-axis" style="font-size:9px;">${now_y}年</text>
      <line x1="70" y1="5" x2="86" y2="5" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4" />
      <text x="90" y="9" class="chart-axis" style="font-size:9px;">${now_y - 1}年</text>
    </g>`;

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="52週MD">
      ${yAxes}${monthLabels.join("")}${weekLabels}${weekMarker}
      ${makeLine(prevMap, "#94a3b8", true, String(now_y - 1))}
      ${makeLine(currMap, "#0F5B8D", false, String(now_y))}
      ${legend}
    </svg>`;
}

// 52週MDテーブル
function buildWeeklyMdTable(current: WeeklyMdPoint[], prevYear: WeeklyMdPoint[]): string {
  const currMap = new Map(current.map(p => [p.week, p]));
  const prevMap = new Map(prevYear.map(p => [p.week, p]));
  const now = new Date();
  const jan4 = new Date(now.getFullYear(), 0, 4);
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000) + 1;
  const weekDay = (now.getDay() + 6) % 7;
  const currentWeek = Math.max(1, Math.min(53, Math.floor((dayOfYear - weekDay + 10) / 7)));

  const maxWeek = Math.max(...current.map(p => p.week), ...prevYear.map(p => p.week), currentWeek);

  let cumCurr = 0, cumPrev = 0;
  const rows = Array.from({ length: maxWeek }, (_, i) => i + 1).map(w => {
    const c = currMap.get(w);
    const p = prevMap.get(w);
    cumCurr += c?.amount ?? 0;
    cumPrev += p?.amount ?? 0;
    const rate = p && p.amount > 0 ? (c?.amount ?? 0) / p.amount : -1;
    const isCurrent = w === currentWeek;
    const isFuture = w > currentWeek;
    const bgStyle = isCurrent ? "background:#eff6ff;" : isFuture ? "opacity:0.4;" : "";
    let badge = "";
    if (!isFuture && p && p.amount > 0) {
      if (!c || c.amount === 0) badge = `<span style="color:#dc2626;font-size:11px;">—</span>`;
      else if (rate >= 1) badge = `<span style="color:#059669;font-size:11px;">${Math.round(rate * 100)}%</span>`;
      else badge = `<span style="color:#d97706;font-size:11px;">${Math.round(rate * 100)}%</span>`;
    }
    return `<tr style="${bgStyle}">
      <td class="mono" style="font-size:12px;">${isCurrent ? "▶" : ""}W${w}</td>
      <td class="numeric" style="font-size:12px;">${c ? fmtCurrency(c.amount) : "—"}</td>
      <td class="numeric" style="font-size:12px;">${p ? fmtCurrency(p.amount) : "—"}</td>
      <td class="numeric" style="font-size:12px;">${badge}</td>
      <td class="numeric" style="font-size:12px;">${fmtCurrency(cumCurr)}</td>
      <td class="numeric" style="font-size:12px;">${fmtCurrency(cumPrev)}</td>
    </tr>`;
  }).join("");

  return `
    <div class="table-wrap" style="max-height:400px;overflow-y:auto;">
      <table>
        <thead><tr>
          <th style="font-size:12px;">週</th>
          <th class="numeric" style="font-size:12px;">当年</th>
          <th class="numeric" style="font-size:12px;">前年</th>
          <th class="numeric" style="font-size:12px;">前年比</th>
          <th class="numeric" style="font-size:12px;">累計(当)</th>
          <th class="numeric" style="font-size:12px;">累計(前)</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function buildStaffBars(staff: DailyKpiData["staffComparison"]): string {
  if (staff.length === 0) return "";
  const maxVal = Math.max(...staff.map(s => Math.max(s.currentAmount, s.prevYearAmount)), 1);
  const barH = 24, gap = 8, labelW = 40;
  const width = 760;
  const height = staff.length * (barH + gap) + 20;
  const plotW = width - labelW - 120;

  const bars = staff.map((s, i) => {
    const y = i * (barH + gap) + 10;
    const currW = (s.currentAmount / maxVal) * plotW;
    const prevW = (s.prevYearAmount / maxVal) * plotW;
    const rate = s.prevYearAmount > 0 ? s.currentAmount / s.prevYearAmount : 0;
    const color = rate >= 1 ? "#059669" : rate >= 0.8 ? "#d97706" : "#dc2626";
    return `
      <text x="${labelW - 4}" y="${y + barH / 2 + 4}" class="chart-axis" text-anchor="end">${s.staffCode}</text>
      <rect x="${labelW}" y="${y}" width="${prevW}" height="${barH}" rx="3" fill="#e2e8f0" />
      <rect x="${labelW}" y="${y}" width="${currW}" height="${barH}" rx="3" fill="${color}" opacity="0.8">
        <title>担当${s.staffCode}: ${fmtCurrency(s.currentAmount)} / 前年 ${fmtCurrency(s.prevYearAmount)}</title>
      </rect>
      <text x="${labelW + Math.max(currW, prevW) + 6}" y="${y + barH / 2 + 4}" class="chart-axis" style="font-size:10px;">${fmtPct(rate)}</text>
    `;
  }).join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="担当別達成率">
      ${bars}
    </svg>`;
}

// ── メイン ──

export type DailyKpiFilter = {
  staffCode: string;
  status: "" | "no_order" | "in_progress" | "achieved" | "new";
};

export function renderDailyKpi(
  data: DailyKpiData | null,
  filter: DailyKpiFilter,
  sortState: SortState
): string {
  if (!data) return `<section class="page-head"><h1>日次KPI</h1></section><div class="panel" style="padding:32px;text-align:center;">読み込み中...</div>`;

  // フィルタリング
  let rows = data.customers;
  if (filter.staffCode) rows = rows.filter(c => c.staffCode === filter.staffCode);
  if (filter.status === "no_order") rows = rows.filter(c => c.amountLastYearSameMonth > 0 && c.amountThisMonth === 0);
  else if (filter.status === "in_progress") rows = rows.filter(c => c.amountLastYearSameMonth > 0 && c.amountThisMonth > 0 && c.amountThisMonth < c.amountLastYearSameMonth);
  else if (filter.status === "achieved") rows = rows.filter(c => c.amountLastYearSameMonth > 0 && c.amountThisMonth >= c.amountLastYearSameMonth);
  else if (filter.status === "new") rows = rows.filter(c => c.amountLastYearSameMonth === 0 && c.amountThisMonth > 0);

  const sorted = applySortToRows(rows as unknown as Record<string, unknown>[], sortState, COL_MAP) as unknown as DailyKpiCustomerRow[];

  // 担当コード一覧
  const staffCodes = [...new Set(data.customers.map(c => c.staffCode).filter(Boolean))].sort();

  const now = new Date();
  const monthLabel = `${now.getFullYear()}年${now.getMonth() + 1}月`;

  const tableBody = sorted.length === 0
    ? `<tr><td colspan="7" class="empty-row">データなし</td></tr>`
    : sorted.map(c => {
        const rate = c.amountLastYearSameMonth > 0 ? c.amountThisMonth / c.amountLastYearSameMonth : -1;
        let badge: string;
        let badgeStyle: string;
        if (c.amountLastYearSameMonth === 0) {
          badge = "新規"; badgeStyle = "background:#dbeafe;color:#1d4ed8;";
        } else if (c.amountThisMonth === 0) {
          badge = "未注文"; badgeStyle = "background:#fee2e2;color:#dc2626;";
        } else if (rate >= 1) {
          badge = "達成"; badgeStyle = "background:#d1fae5;color:#059669;";
        } else {
          badge = `${Math.round(rate * 100)}%`; badgeStyle = "background:#fef3c7;color:#d97706;";
        }
        return `<tr>
          <td class="mono">${c.customerCode}</td>
          <td>${c.customerName}</td>
          <td class="mono">${c.staffCode || "—"}</td>
          <td class="numeric">${fmtCurrency(c.amountLastYearSameMonth)}</td>
          <td class="numeric">${c.amountThisMonth > 0 ? fmtCurrency(c.amountThisMonth) : "—"}</td>
          <td><span style="padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;${badgeStyle}">${badge}</span></td>
          <td class="mono">${c.lastOrderDate ? c.lastOrderDate.slice(5) : "—"}</td>
        </tr>`;
      }).join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">営業アクション</p>
        <h1>日次KPI — ${monthLabel}</h1>
      </div>
    </section>

    ${buildKpiCards(data)}

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header">
          <h2>日次累積売上</h2>
          <p class="panel-caption">当年 vs 前年同月の日別累積推移</p>
        </div>
        <div class="chart-scroll">
          ${buildCumulativeChart(data.dailyCurrent, data.dailyPrevYear)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <h2>担当別 前年同月比</h2>
        </div>
        <div class="chart-scroll">
          ${buildStaffBars(data.staffComparison)}
        </div>
      </article>
    </section>

    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header">
          <h2>52週MDカレンダー</h2>
          <p class="panel-caption">週別売上の年間推移 — 当年 vs 前年</p>
        </div>
        <div class="chart-scroll">
          ${buildWeeklyMdChart(data.weeklyCurrent, data.weeklyPrevYear)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <h2>週別 前年対比</h2>
        </div>
        ${buildWeeklyMdTable(data.weeklyCurrent, data.weeklyPrevYear)}
      </article>
    </section>

    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header">
          <h2>得意先別 前年同月対比</h2>
          <p class="panel-caption">前年同月売上の大きい順 — ${sorted.length}件</p>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
          <select id="kpi-staff-filter" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
            <option value="">全担当</option>
            ${staffCodes.map(sc => `<option value="${sc}" ${filter.staffCode === sc ? "selected" : ""}>担当${sc}</option>`).join("")}
          </select>
          <select id="kpi-status-filter" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
            <option value="" ${filter.status === "" ? "selected" : ""}>全ステータス</option>
            <option value="no_order" ${filter.status === "no_order" ? "selected" : ""}>未注文</option>
            <option value="in_progress" ${filter.status === "in_progress" ? "selected" : ""}>進行中</option>
            <option value="achieved" ${filter.status === "achieved" ? "selected" : ""}>達成</option>
            <option value="new" ${filter.status === "new" ? "selected" : ""}>新規</option>
          </select>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${makeSortableHeader("customerCode", "コード", sortState, "mono")}
                ${makeSortableHeader("customerName", "得意先名", sortState)}
                ${makeSortableHeader("staffCode", "担当", sortState, "mono")}
                ${makeSortableHeader("amountLastYearSameMonth", "前年同月", sortState, "numeric")}
                ${makeSortableHeader("amountThisMonth", "当月累計", sortState, "numeric")}
                <th>達成</th>
                ${makeSortableHeader("lastOrderDate", "最終注文", sortState, "mono")}
              </tr>
            </thead>
            <tbody>${tableBody}</tbody>
          </table>
        </div>
      </article>
    </section>
  `;
}
