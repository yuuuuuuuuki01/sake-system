import type { BrewingPlanRow, BrewingMonthlyTrend, BrewingProductDetail, BrewingStockEntry, BrewingCustomCategory, BrewingAlcoholSetting } from "../api";

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

/** 日本語カテゴリ名をDOM IDに安全に変換 */
function catToId(cat: string): string {
  // encodeURIComponent で一意性を保証し、%をハイフンに置換
  return "bc-" + encodeURIComponent(cat).replace(/%/g, "-");
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

function buildSummaryCards(data: BrewingPlanRow[], stockEntries: BrewingStockEntry[], alcoholSettings: Record<string, BrewingAlcoholSetting>): string {
  // Group by brew category
  const grouped = new Map<string, { rows: BrewingPlanRow[]; totalMl: number; avgMl: number; stockL: number }>();

  for (const row of data) {
    const cat = row.brewCategory;
    if (!grouped.has(cat)) {
      grouped.set(cat, { rows: [], totalMl: 0, avgMl: 0, stockL: 0 });
    }
    const g = grouped.get(cat)!;
    g.rows.push(row);
    g.totalMl += row.totalShipmentMl;
    g.avgMl += row.monthlyAvgMl;
    g.stockL = row.currentStockL;
  }

  // Stock entries grouped by category
  const entryMap = new Map<string, BrewingStockEntry[]>();
  for (const e of stockEntries) {
    if (!entryMap.has(e.brewCategory)) entryMap.set(e.brewCategory, []);
    entryMap.get(e.brewCategory)!.push(e);
  }

  const cards = CATEGORY_ORDER
    .filter(c => grouped.has(c))
    .map(cat => {
      const g = grouped.get(cat)!;
      const color = CATEGORY_COLORS[cat] ?? "#9ca3af";
      const catId = catToId(cat);
      const entries = entryMap.get(cat) ?? [];

      // アルコール度数設定
      const alc = alcoholSettings[cat] ?? { rawAlcoholPct: 18, targetAlcoholPct: 15 };
      const dilutionRatio = alc.targetAlcoholPct > 0 ? alc.rawAlcoholPct / alc.targetAlcoholPct : 1;

      // 計算（原酒ベース）
      const stockMl = g.stockL * 1000;
      const annualMl = g.totalMl;
      const monthlyAvgMl = g.avgMl;
      const annualL = annualMl / 1000;

      // 加水後の実効容量
      const effectiveStockL = Math.round(g.stockL * dilutionRatio * 10) / 10;
      const effectiveStockMl = effectiveStockL * 1000;

      // 残月数（加水後ベース）
      const monthsRaw = monthlyAvgMl > 0 ? Math.round(stockMl / monthlyAvgMl * 10) / 10 : 0;
      const monthsEffective = monthlyAvgMl > 0 ? Math.round(effectiveStockMl / monthlyAvgMl * 10) / 10 : 0;

      // 年間ベースの過不足（加水後）
      const surplusL = effectiveStockL - annualL;
      const safetyStockL = monthlyAvgMl > 0 ? Math.round(monthlyAvgMl * 2 / 1000 * 10) / 10 : 0;
      const isBelowSafety = effectiveStockL < safetyStockL;

      const sc = stockColor(monthsEffective);
      const sl = stockLabel(monthsEffective);
      const progressPct = Math.min(monthsEffective / 12 * 100, 100);

      const surplusColor = surplusL >= 0 ? "#22c55e" : "#ef4444";
      const surplusLabel = surplusL >= 0
        ? `+${fmtNum(Math.round(surplusL))}L 余裕`
        : `${fmtNum(Math.round(surplusL))}L 不足`;

      const showDilution = dilutionRatio > 1.001;

      return `
        <div class="card" style="border-top:3px solid ${color};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${color};">${cat}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${sc}20;color:${sc};font-weight:600;">${sl}</span>
              <button class="btn-edit-stock" data-cat-id="${catId}" data-cat="${cat}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${catId}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${fmtNum(g.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${fmtNum(Math.round(annualL))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${fmtL(monthlyAvgMl)}L</strong></div>
            </div>
            ${showDilution ? `
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${fmtNum(effectiveStockL)}L</div>
                <div style="color:#6b7280;">${alc.rawAlcoholPct}% → ${alc.targetAlcoholPct}%（×${dilutionRatio.toFixed(2)}）・残<strong>${monthsEffective.toFixed(1)}</strong>ヶ月</div>
              </div>
            ` : ""}
          </div>

          <div id="stock-edit-${catId}" style="display:none;margin-bottom:8px;">
            <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫を追加（合計が現在庫になります）</div>
            <div id="stock-entries-${catId}">
              ${(entries ?? []).map(e => `
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;" data-entry-id="${e.id}">
                  <input type="text" value="${e.label}" placeholder="タンク名"
                    style="width:100px;height:26px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" disabled />
                  <strong style="font-size:13px;min-width:50px;text-align:right;">${fmtNum(e.volumeL)}L</strong>
                  <button data-action="brew-delete-entry" data-id="${e.id}" data-cat="${cat}"
                    style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                </div>
              `).join("")}
            </div>
            <div style="display:flex;gap:4px;align-items:center;margin-top:4px;">
              <input id="new-entry-label-${catId}" type="text" placeholder="タンク名"
                style="width:90px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
              <input id="new-entry-vol-${catId}" type="number" min="0" step="1" placeholder="L"
                style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
              <button data-action="brew-add-entry" data-cat="${cat}" data-cat-id="${catId}"
                style="font-size:11px;padding:4px 10px;border:none;border-radius:4px;background:#0F5B8D;color:#fff;cursor:pointer;white-space:nowrap;">追加</button>
            </div>
            <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:8px;">
              <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">アルコール度数（加水計算用）</div>
              <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  原酒
                  <input id="alc-raw-${catId}" type="number" min="1" max="30" step="0.1" value="${alc.rawAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <span style="color:#6b7280;">→</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  出荷
                  <input id="alc-target-${catId}" type="number" min="1" max="30" step="0.1" value="${alc.targetAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <button data-action="brew-alc-save" data-cat="${cat}"
                  style="font-size:10px;padding:3px 8px;border:none;border-radius:4px;background:#2563eb;color:#fff;cursor:pointer;">保存</button>
              </div>
            </div>
            <div style="margin-top:6px;">
              <button class="btn-cancel-stock" data-cat-id="${catId}"
                style="font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">閉じる</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;flex-wrap:wrap;">
            <span style="color:${surplusColor};font-weight:600;">年間比 ${surplusLabel}</span>
            <span style="color:${isBelowSafety ? "#ef4444" : "#6b7280"};">安全在庫${fmtNum(safetyStockL)}L${isBelowSafety ? " ⚠下回り" : " ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${showDilution ? "（加水後）" : ""}</span>
            <span style="font-weight:600;color:${sc};">${monthsEffective.toFixed(1)}ヶ月</span>
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
          <tr class="sub-row-${catToId(cat)}" style="display:none;font-size:12px;">
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
  const cats = new Map<string, { avgMl: number; totalMl: number; stockL: number }>();
  for (const r of data) {
    if (!cats.has(r.brewCategory)) {
      cats.set(r.brewCategory, { avgMl: 0, totalMl: 0, stockL: r.currentStockL });
    }
    const c = cats.get(r.brewCategory)!;
    c.avgMl += r.monthlyAvgMl;
    c.totalMl += r.totalShipmentMl;
  }

  const bars = CATEGORY_ORDER
    .filter(c => cats.has(c))
    .map(cat => {
      const g = cats.get(cat)!;
      const months = g.avgMl > 0 ? Math.round(g.stockL * 1000 / g.avgMl * 10) / 10 : 0;
      const annualL = g.totalMl / 1000;
      const coveragePct = annualL > 0 ? Math.round(g.stockL / annualL * 100) : 0;
      const color = CATEGORY_COLORS[cat] ?? "#9ca3af";
      const sc = stockColor(months);
      const pct = Math.min(months / 12 * 100, 100);

      return `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:80px;font-size:12px;font-weight:500;color:${color};text-align:right;">${cat}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${sc};height:100%;width:${pct}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">
              ${months.toFixed(1)}ヶ月 / 年間の${coveragePct}%
            </span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${g.stockL > 0 ? "var(--text)" : "#ef4444"};">${fmtNum(g.stockL)}L</span>
        </div>
      `;
    }).join("");

  return `
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${bars}
    </div>
  `;
}

// ─── Product Detail per Category ─────────────────────────────────────────────

function buildProductDetail(
  products: BrewingProductDetail[],
  excluded: Set<string>,
  customCategories: BrewingCustomCategory[],
  overrides: Record<string, string>
): string {
  if (products.length === 0) return "";

  const customNames = customCategories.map(c => c.name);
  const allCategories = [...CATEGORY_ORDER, ...customNames];

  // 親区分→子カスタム区分のマップ
  const childCatsOf = new Map<string, BrewingCustomCategory[]>();
  for (const cc of customCategories) {
    if (!childCatsOf.has(cc.parentCategory)) childCatsOf.set(cc.parentCategory, []);
    childCatsOf.get(cc.parentCategory)!.push(cc);
  }

  // Group by brew category (RPC結果ベース: オーバーライド済み)
  const grouped = new Map<string, BrewingProductDetail[]>();
  for (const p of products) {
    if (!grouped.has(p.brewCategory)) grouped.set(p.brewCategory, []);
    grouped.get(p.brewCategory)!.push(p);
  }
  for (const cc of customNames) {
    if (!grouped.has(cc)) grouped.set(cc, []);
  }

  // 子区分に確定済みの商品コードセット
  const confirmedInChild = new Set<string>();
  for (const cc of customCategories) {
    for (const p of grouped.get(cc.name) ?? []) confirmedInChild.add(p.productCode);
  }

  // 親区分の全商品マップ（子区分の候補表示用）
  const parentProducts = new Map<string, BrewingProductDetail[]>();
  for (const cat of CATEGORY_ORDER) {
    parentProducts.set(cat, grouped.get(cat) ?? []);
  }

  const sections = allCategories
    .filter(cat => grouped.has(cat))
    .map(cat => {
      const color = CATEGORY_COLORS[cat] ?? "#6366f1";
      const customCat = customCategories.find(c => c.name === cat);
      const isCustom = !!customCat;
      const parentCat = customCat?.parentCategory ?? "";
      const hasChildren = childCatsOf.has(cat);

      if (isCustom) {
        // ── カスタム区分: 確定済み + 親の全商品を候補表示 ──
        const confirmedItems = grouped.get(cat) ?? [];
        const confirmedCodes = new Set(confirmedItems.map(p => p.productCode));
        // 親区分の商品（確定済みのものは除く、他の子区分に確定済みのものも除く）
        const parentItems = parentProducts.get(parentCat) ?? [];
        const candidates = parentItems.filter(p => !confirmedCodes.has(p.productCode) && !confirmedInChild.has(p.productCode));

        const totalMl = confirmedItems.reduce((s, p) => s + p.annualMl, 0);
        const monthlyMl = confirmedItems.reduce((s, p) => s + p.monthlyAvgMl, 0);

        const confirmedRows = confirmedItems.map(p => `
          <tr>
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${p.productCode}" data-cat="${cat}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${p.productName}"><strong>${p.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${p.subCategory}</td>
            <td style="text-align:right;">${fmtL(p.annualMl)}</td>
            <td style="text-align:right;">${fmtL(p.monthlyAvgMl)}</td>
          </tr>
        `).join("");

        const candidateRows = candidates.map(p => `
          <tr style="opacity:0.45;">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" data-action="brew-confirm-to-child" data-code="${p.productCode}" data-cat="${cat}"
                style="cursor:pointer;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${p.productName}">${p.productName}</td>
            <td style="font-size:11px;color:var(--text-secondary);">${p.subCategory}</td>
            <td style="text-align:right;">${fmtL(p.annualMl)}</td>
            <td style="text-align:right;">${fmtL(p.monthlyAvgMl)}</td>
          </tr>
        `).join("");

        return `
          <div style="margin-bottom:20px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
              <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${color};"></span>
              <h4 style="margin:0;font-size:14px;">${cat}<span style="font-size:11px;font-weight:400;color:var(--text-secondary);margin-left:4px;">(${parentCat}系)</span></h4>
              <button data-action="brew-delete-category" data-cat="${cat}"
                style="font-size:10px;padding:2px 8px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">削除</button>
              <span style="font-size:12px;color:var(--text-secondary);">
                <strong>${confirmedItems.length}</strong>品確定 ・ 年間${fmtL(totalMl)}L ・ 月平均${fmtL(monthlyMl)}L
              </span>
            </div>
            <div style="font-size:10px;color:var(--text-secondary);margin-bottom:6px;">チェックを入れると確定（親から移動）、外すと親に戻ります</div>
            <div class="table-wrap">
              <table class="data-table" style="font-size:12px;">
                <thead>
                  <tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr>
                </thead>
                <tbody>
                  ${confirmedRows}
                  ${candidateRows || `<tr><td colspan="5" style="text-align:center;color:var(--text-secondary);padding:8px;">候補なし</td></tr>`}
                </tbody>
                ${confirmedItems.length > 0 ? `<tfoot>
                  <tr style="font-weight:600;background:var(--surface-alt);">
                    <td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${fmtL(totalMl)}</td>
                    <td style="text-align:right;">${fmtL(monthlyMl)}</td>
                  </tr>
                </tfoot>` : ""}
              </table>
            </div>
          </div>
        `;
      } else {
        // ── 標準区分 ──
        const items = grouped.get(cat) ?? [];
        // 子区分に確定済みの商品は親から除外して表示
        const visibleItems = items.filter(p => !confirmedInChild.has(p.productCode));
        const totalMl = visibleItems.reduce((s, p) => s + p.annualMl, 0);
        const monthlyMl = visibleItems.reduce((s, p) => s + p.monthlyAvgMl, 0);
        const movedCount = items.length - visibleItems.length;

        const rows = visibleItems.map(p => `
          <tr>
            <td style="width:32px;"></td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${p.productName}">${p.productName}</td>
            <td style="font-size:11px;color:var(--text-secondary);">${p.subCategory}</td>
            <td style="text-align:right;">${fmtL(p.annualMl)}</td>
            <td style="text-align:right;">${fmtL(p.monthlyAvgMl)}</td>
          </tr>
        `).join("");

        return `
          <div style="margin-bottom:20px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
              <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${color};"></span>
              <h4 style="margin:0;font-size:14px;">${cat}</h4>
              <span style="font-size:12px;color:var(--text-secondary);">
                ${visibleItems.length}銘柄 ・ 年間${fmtL(totalMl)}L ・ 月平均${fmtL(monthlyMl)}L
                ${movedCount > 0 ? `<span style="color:#2563eb;">（${movedCount}品を子区分へ移動済）</span>` : ""}
              </span>
            </div>
            ${visibleItems.length > 0 ? `
              <div class="table-wrap">
                <table class="data-table" style="font-size:12px;">
                  <thead>
                    <tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr>
                  </thead>
                  <tbody>${rows}</tbody>
                  <tfoot>
                    <tr style="font-weight:600;background:var(--surface-alt);">
                      <td></td><td>計</td><td></td>
                      <td style="text-align:right;">${fmtL(totalMl)}</td>
                      <td style="text-align:right;">${fmtL(monthlyMl)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ` : ""}
          </div>
        `;
      }
    }).join("");

  return `
    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div>
          <h3 style="font-size:14px;margin:0;">製成種別 × 銘柄明細</h3>
          <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">子区分でチェックを入れると確定（親から自動で外れます）</p>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <select id="brew-new-category-parent" style="font-size:12px;padding:4px;border:1px solid var(--border);border-radius:4px;">
            <option value="">親区分</option>
            ${CATEGORY_ORDER.filter(c => c !== "その他").map(c => `<option value="${c}">${c}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${sections}
    </div>
  `;
}

// ─── Main Render ──────────────────────────────────────────────────────────────

export function renderBrewingPlan(
  data: BrewingPlanRow[],
  trend: BrewingMonthlyTrend[],
  fy: number,
  productDetail: BrewingProductDetail[] = [],
  excludedProducts: Set<string> = new Set(),
  customCategories: BrewingCustomCategory[] = [] as BrewingCustomCategory[],
  overrides: Record<string, string> = {},
  stockEntries: BrewingStockEntry[] = [],
  alcoholSettings: Record<string, BrewingAlcoholSetting> = {}
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

      ${buildSummaryCards(data, stockEntries, alcoholSettings)}

      ${buildStockProjection(data)}

      ${buildProductDetail(productDetail, excludedProducts, customCategories, overrides)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${buildDetailTable(data)}
      </div>
    </section>
  `;
}
