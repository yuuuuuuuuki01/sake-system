import type { BrewingPlanRow, BrewingMonthlyTrend } from "../api";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "純米大吟醸": "#7c3aed",
  "大吟醸": "#a855f7",
  "純米吟醸": "#2563eb",
  "純米": "#059669",
  "本醸造": "#d97706",
  "普通酒": "#6b7280",
  "リキュール": "#e11d48",
  "その他": "#9ca3af"
};

const CATEGORY_ORDER = ["純米大吟醸", "大吟醸", "純米吟醸", "純米", "本醸造", "普通酒", "リキュール", "その他"];

// ─── Utilities ────────────────────────────────────────────────────────────────

function fmtNum(n: number): string {
  return n.toLocaleString("ja-JP");
}

function fmtL(ml: number): string {
  return (ml / 1000).toLocaleString("ja-JP", { maximumFractionDigits: 1 });
}

function stockColor(months: number): string {
  if (months < 2) return "#ef4444";
  if (months <= 4) return "#eab308";
  return "#22c55e";
}

function stockLabel(months: number): string {
  if (months < 2) return "要醸造";
  if (months <= 4) return "注意";
  return "余裕あり";
}

// ─── Chart ────────────────────────────────────────────────────────────────────

function buildMonthlyChart(trend: BrewingMonthlyTrend[]): string {
  if (trend.length === 0) {
    return `<div class="chart-empty">出荷データなし</div>`;
  }

  const months = [...new Set(trend.map(t => t.month))].sort();
  const categories = CATEGORY_ORDER.filter(c => trend.some(t => t.brewCategory === c));

  // Build month->category->value map
  const dataMap: Record<string, Record<string, number>> = {};
  for (const t of trend) {
    if (!dataMap[t.month]) dataMap[t.month] = {};
    dataMap[t.month][t.brewCategory] = t.shipmentMl;
  }

  const width = 820;
  const height = 300;
  const pad = { top: 20, right: 20, bottom: 50, left: 70 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Calculate max stacked value
  const monthTotals = months.map(m =>
    categories.reduce((s, c) => s + (dataMap[m]?.[c] ?? 0), 0)
  );
  const maxVal = Math.max(...monthTotals, 1);
  const step = plotW / months.length;
  const barW = Math.max(step - 8, 14);

  // Y-axis grid
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
    const y = pad.top + plotH - plotH * ratio;
    const val = maxVal * ratio / 1000; // Convert to L
    return `
      <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" class="chart-grid" />
      <text x="6" y="${y + 4}" class="chart-axis">${Math.round(val).toLocaleString("ja-JP")}L</text>
    `;
  }).join("");

  // Stacked bars
  const bars = months.map((m, mi) => {
    let yBase = pad.top + plotH;
    const x = pad.left + mi * step + (step - barW) / 2;
    const segments = categories.map(c => {
      const val = dataMap[m]?.[c] ?? 0;
      const barH = (val / maxVal) * plotH;
      yBase -= barH;
      return barH > 0 ? `<rect x="${x}" y="${yBase}" width="${barW}" height="${barH}" fill="${CATEGORY_COLORS[c] ?? "#9ca3af"}" opacity="0.85" rx="1"><title>${c}: ${fmtL(val)}L</title></rect>` : "";
    }).join("");
    const [y, mo] = m.split("-");
    const monthNum = parseInt(mo);
    const showLabel = monthNum === 10 || mi % 2 === 0;
    const label = monthNum === 10 ? `${y}年度` : `${monthNum}月`;
    return `<g>${segments}${showLabel ? `<text x="${x + barW / 2}" y="${height - 12}" class="chart-axis centered-axis" style="font-size:10px;">${label}</text>` : ""}</g>`;
  }).join("");

  // Legend
  const legend = categories.map(c =>
    `<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${CATEGORY_COLORS[c] ?? "#9ca3af"};"></span>
       ${c}
     </span>`
  ).join("");

  return `
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${gridLines}${bars}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${pad.left}px;display:flex;flex-wrap:wrap;">${legend}</div>
  `;
}

// ─── Summary Cards ────────────────────────────────────────────────────────────

function buildSummaryCards(data: BrewingPlanRow[]): string {
  // Group by brew category
  const grouped = new Map<string, { rows: BrewingPlanRow[]; totalMl: number; avgMl: number; stockL: number; months: number }>();

  for (const row of data) {
    const cat = row.brewCategory;
    if (!grouped.has(cat)) {
      grouped.set(cat, { rows: [], totalMl: 0, avgMl: 0, stockL: 0, months: 0 });
    }
    const g = grouped.get(cat)!;
    g.rows.push(row);
    g.totalMl += row.totalShipmentMl;
    g.avgMl += row.monthlyAvgMl;
    g.stockL = row.currentStockL; // Same for all sub-categories
    g.months = row.monthsRemaining; // Use the max from sub-categories
  }

  // Recalculate months remaining at category level
  for (const [, g] of grouped) {
    if (g.avgMl > 0) {
      g.months = Math.round(g.stockL * 1000 / g.avgMl * 10) / 10;
    }
  }

  const cards = CATEGORY_ORDER
    .filter(c => grouped.has(c))
    .map(cat => {
      const g = grouped.get(cat)!;
      const color = CATEGORY_COLORS[cat] ?? "#9ca3af";
      const sc = stockColor(g.months);
      const sl = stockLabel(g.months);
      const progressPct = Math.min(g.months / 6 * 100, 100);

      return `
        <div class="card" style="border-top:3px solid ${color};min-width:220px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${color};">${cat}</h4>
            <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${sc}20;color:${sc};font-weight:600;">${sl}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:12px;margin-bottom:8px;">
            <div><span style="color:#6b7280;">現在庫</span><br><strong>${fmtNum(g.stockL)}L</strong></div>
            <div><span style="color:#6b7280;">月平均移出</span><br><strong>${fmtL(g.avgMl)}L</strong></div>
          </div>
          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数</span>
            <span style="font-weight:600;color:${sc};">${g.months.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${sc};height:100%;width:${progressPct}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `;
    }).join("");

  return `<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${cards}</div>`;
}

// ─── Detail Table ─────────────────────────────────────────────────────────────

function buildDetailTable(data: BrewingPlanRow[]): string {
  if (data.length === 0) {
    return `<div class="chart-empty">データなし</div>`;
  }

  // Group by brew category
  const grouped = new Map<string, BrewingPlanRow[]>();
  for (const row of data) {
    if (!grouped.has(row.brewCategory)) grouped.set(row.brewCategory, []);
    grouped.get(row.brewCategory)!.push(row);
  }

  const headerRow = `
    <tr>
      <th style="text-align:left;min-width:120px;">区分</th>
      <th style="text-align:left;min-width:140px;">サブ区分</th>
      <th style="text-align:right;">商品数</th>
      <th style="text-align:right;">年間出荷(本)</th>
      <th style="text-align:right;">年間移出(L)</th>
      <th style="text-align:right;">月平均(本)</th>
      <th style="text-align:right;">月平均(L)</th>
      <th style="text-align:right;">現在庫(L)</th>
      <th style="text-align:right;">残月数</th>
    </tr>
  `;

  const bodyRows: string[] = [];
  for (const cat of CATEGORY_ORDER) {
    const rows = grouped.get(cat);
    if (!rows) continue;

    const color = CATEGORY_COLORS[cat] ?? "#9ca3af";
    const hasSubs = rows.length > 1;

    // Category summary row
    const totQty = rows.reduce((s, r) => s + r.totalShipmentQty, 0);
    const totMl = rows.reduce((s, r) => s + r.totalShipmentMl, 0);
    const avgQty = rows.reduce((s, r) => s + r.monthlyAvgQty, 0);
    const avgMl = rows.reduce((s, r) => s + r.monthlyAvgMl, 0);
    const prodCount = rows.reduce((s, r) => s + r.productCount, 0);
    const stockL = rows[0].currentStockL;
    const monthsRem = avgMl > 0 ? Math.round(stockL * 1000 / avgMl * 10) / 10 : 0;
    const sc = stockColor(monthsRem);

    bodyRows.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${hasSubs ? "pointer" : "default"};" ${hasSubs ? `data-toggle-cat="${cat}"` : ""}>
        <td style="color:${color};">
          ${hasSubs ? `<span class="toggle-icon" data-cat="${cat}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>` : `<span style="display:inline-block;width:16px;"></span>`}
          ${cat}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${prodCount}</td>
        <td style="text-align:right;">${fmtNum(totQty)}</td>
        <td style="text-align:right;">${fmtL(totMl)}</td>
        <td style="text-align:right;">${fmtNum(avgQty)}</td>
        <td style="text-align:right;">${fmtL(avgMl)}</td>
        <td style="text-align:right;">${fmtNum(stockL)}</td>
        <td style="text-align:right;color:${sc};font-weight:700;">${monthsRem.toFixed(1)}</td>
      </tr>
    `);

    // Sub-category rows (hidden by default)
    if (hasSubs) {
      for (const r of rows) {
        bodyRows.push(`
          <tr class="sub-row-${cat.replace(/[^a-zA-Z0-9]/g, "_")}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${r.subCategory}</td>
            <td style="text-align:right;">${r.productCount}</td>
            <td style="text-align:right;">${fmtNum(r.totalShipmentQty)}</td>
            <td style="text-align:right;">${fmtL(r.totalShipmentMl)}</td>
            <td style="text-align:right;">${fmtNum(r.monthlyAvgQty)}</td>
            <td style="text-align:right;">${fmtL(r.monthlyAvgMl)}</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
          </tr>
        `);
      }
    }
  }

  return `
    <div class="table-wrap">
      <table class="data-table">
        <thead>${headerRow}</thead>
        <tbody>${bodyRows.join("")}</tbody>
      </table>
    </div>
  `;
}

// ─── Stock Projection Bars ────────────────────────────────────────────────────

function buildStockProjection(data: BrewingPlanRow[]): string {
  // Aggregate per category
  const cats = new Map<string, { avgMl: number; stockL: number }>();
  for (const r of data) {
    if (!cats.has(r.brewCategory)) {
      cats.set(r.brewCategory, { avgMl: 0, stockL: r.currentStockL });
    }
    cats.get(r.brewCategory)!.avgMl += r.monthlyAvgMl;
  }

  const bars = CATEGORY_ORDER
    .filter(c => cats.has(c))
    .map(cat => {
      const g = cats.get(cat)!;
      const months = g.avgMl > 0 ? Math.round(g.stockL * 1000 / g.avgMl * 10) / 10 : 0;
      const color = CATEGORY_COLORS[cat] ?? "#9ca3af";
      const sc = stockColor(months);
      const pct = Math.min(months / 8 * 100, 100);

      return `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:80px;font-size:12px;font-weight:500;color:${color};text-align:right;">${cat}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:20px;overflow:hidden;position:relative;">
            <div style="background:${sc};height:100%;width:${pct}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:2px;left:8px;font-size:11px;font-weight:600;color:#374151;">${months.toFixed(1)}ヶ月</span>
          </div>
        </div>
      `;
    }).join("");

  return `
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫残月数プロジェクション</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕あり</span>
      </div>
      ${bars}
    </div>
  `;
}

// ─── Main Render ──────────────────────────────────────────────────────────────

export function renderBrewingPlan(
  data: BrewingPlanRow[],
  trend: BrewingMonthlyTrend[],
  fy: number
): string {
  const now = new Date();
  const currentFY = now.getMonth() >= 9 ? now.getFullYear() : now.getFullYear() - 1;
  const fyOptions = Array.from({ length: 5 }, (_, i) => {
    const y = currentFY - i;
    return `<option value="${y}" ${y === fy ? "selected" : ""}>${y}年度 (${y}/10-${y + 1}/9)</option>`;
  }).join("");

  const loading = data.length === 0 && trend.length === 0
    ? `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>`
    : "";

  if (loading) return loading;

  return `
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${fyOptions}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${buildMonthlyChart(trend)}
      </div>

      ${buildSummaryCards(data)}

      ${buildStockProjection(data)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${buildDetailTable(data)}
      </div>
    </section>
  `;
}
