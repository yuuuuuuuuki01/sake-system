import type { BrewingPlanRow, BrewingMonthlyTrend, BrewingProductDetail, BrewingStockEntry, BrewingCustomCategory, BrewingAlcoholSetting, BrewingYearlyShipment, BrewingSeasonalPattern, BrewingRiceParams } from "../api";

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

function buildSummaryCards(data: BrewingPlanRow[], stockEntries: BrewingStockEntry[], alcoholSettings: Record<string, BrewingAlcoholSetting>, customCategories: BrewingCustomCategory[]): string {
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
            ${(() => {
              const children = customCategories.filter(c => c.parentCategory === cat);
              if (children.length === 0) return "";
              return children.map(cc => {
                const ccEntries = stockEntries.filter(e => e.brewCategory === cc.name);
                const ccStock = ccEntries.reduce((s, e) => s + e.volumeL, 0);
                return `<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${cc.name}</span>
                  ${ccStock > 0 ? `<span style="margin-left:4px;">${fmtNum(ccStock)}L</span>` : `<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>`}
                </div>`;
              }).join("");
            })()}
          </div>

          <div id="stock-edit-${catId}" style="display:none;margin-bottom:8px;">
            ${(() => {
              const children = customCategories.filter(c => c.parentCategory === cat);
              // 親＋子全部のタンクをまとめて表示
              const allCatsForStock = [{ name: cat, label: cat }, ...children.map(c => ({ name: c.name, label: c.name }))];
              const allEntries = allCatsForStock.flatMap(c => {
                const es = stockEntries.filter(e => e.brewCategory === c.name);
                return es.map(e => ({ ...e, catLabel: c.label }));
              });
              const targetOptions = allCatsForStock.map(c =>
                `<option value="${c.name}">${c.label}</option>`
              ).join("");
              return `
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${allEntries.map(e => `
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${e.label || "タンク"}</span>
                      <strong style="font-size:13px;">${fmtNum(e.volumeL)}L</strong>
                      ${allCatsForStock.length > 1 ? `
                        <select data-action="brew-reassign-entry" data-id="${e.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${allCatsForStock.map(c =>
                            `<option value="${c.name}" ${c.name === e.brewCategory ? "selected" : ""}>${c.label}</option>`
                          ).join("")}
                        </select>
                      ` : `<span style="font-size:10px;color:var(--text-secondary);">${e.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${e.id}" data-cat="${e.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("") || `<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>`}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${allCatsForStock.length > 1 ? `<select id="new-entry-target-${catId}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${targetOptions}</select>` : ""}
                  <input id="new-entry-label-${catId}" type="text" placeholder="タンク名"
                    style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <input id="new-entry-vol-${catId}" type="number" min="0" step="1" placeholder="L"
                    style="width:60px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <button data-action="brew-add-entry" data-cat="${cat}" data-cat-id="${catId}"
                    style="font-size:11px;padding:4px 10px;border:none;border-radius:4px;background:#0F5B8D;color:#fff;cursor:pointer;white-space:nowrap;">追加</button>
                </div>
              `;
            })()}
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

// ─── Forecast ──────────────────────────────────────────────────────────────��─

function buildForecastWithNeed(
  yearlyShipments: BrewingYearlyShipment[],
  stockEntries: BrewingStockEntry[],
  alcoholSettings: Record<string, BrewingAlcoholSetting>,
  customCategories: BrewingCustomCategory[],
  seasonalPattern: BrewingSeasonalPattern[],
  forecastOverrides: Record<string, number> = {}
): { html: string; needByCategory: Record<string, number> } {
  const empty = { html: "", needByCategory: {} };
  if (yearlyShipments.length === 0) return empty;

  const needByCategory: Record<string, number> = {};
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentFYStart = currentMonth >= 10 ? now.getFullYear() : now.getFullYear() - 1;
  const forecastFY = currentFYStart + 1; // 来年度

  // 区分ごとに年度別データ
  const catData = new Map<string, Map<number, { shipL: number; annualL: number }>>();
  for (const s of yearlyShipments) {
    if (!catData.has(s.brewCategory)) catData.set(s.brewCategory, new Map());
    catData.get(s.brewCategory)!.set(s.fy, { shipL: s.shipmentL, annualL: s.annualizedL });
  }

  // 季節パターン: 区分×月 → 平均出荷L
  const seasonMap = new Map<string, Map<number, number>>();
  for (const sp of seasonalPattern) {
    if (!seasonMap.has(sp.brewCategory)) seasonMap.set(sp.brewCategory, new Map());
    seasonMap.get(sp.brewCategory)!.set(sp.monthNum, sp.avgMonthlyL);
  }

  const allFYs = [...new Set(yearlyShipments.map(s => s.fy))].sort();
  const allCats = [...catData.keys()].sort((a, b) => {
    const order = [...CATEGORY_ORDER, ...customCategories.map(c => c.name)];
    return (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b));
  });

  // 残り月（今月〜9月）
  const remainingMonths: number[] = [];
  for (let m = currentMonth; m <= 9; m++) remainingMonths.push(m);
  // 今月が10月以降なら来年の1-9月も含む（ただし通常は10月以降はforecast年度の話）
  if (currentMonth >= 10) {
    for (let m = 1; m <= 9; m++) remainingMonths.push(m);
  }

  // 完了年度（12ヶ月フルのデータがある年度）と当年度を分離
  const completedFYs = allFYs.filter(fy => {
    // 当年度 = currentFYStart。それ以前は完了年度
    return fy < currentFYStart;
  });
  const currentFYData = allFYs.includes(currentFYStart);

  const rows = allCats.map(cat => {
    const data = catData.get(cat)!;
    const fys = allFYs.filter(fy => data.has(fy));
    const color = CATEGORY_COLORS[cat] ?? "#6366f1";
    const seasonal = seasonMap.get(cat) ?? new Map();

    // 完了年度の実績値だけで増減率を計算
    const completedVals = completedFYs.filter(fy => data.has(fy)).map(fy => data.get(fy)!.shipL);
    let growthRate = 0;
    if (completedVals.length >= 2) {
      const rates: number[] = [];
      for (let i = 1; i < completedVals.length; i++) {
        if (completedVals[i - 1] > 0) rates.push((completedVals[i] - completedVals[i - 1]) / completedVals[i - 1]);
      }
      growthRate = rates.length > 0 ? rates.reduce((s, r) => s + r, 0) / rates.length : 0;
    }

    // 予測のベース = 直近の完了年度の実績
    const baseAnnual = completedVals.length > 0 ? completedVals[completedVals.length - 1] : (data.get(currentFYStart)?.annualL ?? 0);

    // 今月〜9月の残り出荷量（季節パターンベース）
    const remainingShipL = remainingMonths.reduce((s, m) => s + (seasonal.get(m) ?? 0), 0);

    // 現在庫（加水後）
    const stockL = stockEntries.filter(e => e.brewCategory === cat).reduce((s, e) => s + e.volumeL, 0);
    const alc = alcoholSettings[cat];
    const dilution = alc && alc.targetAlcoholPct > 0 ? alc.rawAlcoholPct / alc.targetAlcoholPct : 1;
    const effectiveStockNow = Math.round(stockL * dilution);

    // 10月時点の予想在庫
    const projectedStockOct = Math.max(0, effectiveStockNow - Math.round(remainingShipL));

    // 増減率（手動上書きがあればそちらを優先）
    const hasOverride = cat in forecastOverrides;
    const effectiveGrowth = hasOverride ? forecastOverrides[cat] : growthRate;
    const effectiveGrowthPct = Math.round(effectiveGrowth * 100);

    // 翌年度の出荷予測
    const forecastL = Math.round(baseAnnual * (1 + effectiveGrowth));

    // 必要醸造量
    const needL = Math.max(0, forecastL - projectedStockOct);
    needByCategory[cat] = needL;

    const growthColor = effectiveGrowthPct > 0 ? "#22c55e" : effectiveGrowthPct < 0 ? "#ef4444" : "#6b7280";
    const autoGrowthPct = Math.round(growthRate * 100);

    const currentFYAnnualized = data.get(currentFYStart)?.annualL ?? 0;

    return `
      <tr>
        <td style="color:${color};font-weight:600;white-space:nowrap;">${cat}</td>
        ${completedFYs.map(fy => `<td style="text-align:right;">${data.has(fy) ? fmtNum(Math.round(data.get(fy)!.shipL)) : "—"}</td>`).join("")}
        ${currentFYData ? `<td style="text-align:right;color:var(--text-secondary);" title="年換算">${fmtNum(Math.round(currentFYAnnualized))}*</td>` : ""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${effectiveGrowthPct}"
            data-action="brew-growth-edit" data-cat="${cat}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${hasOverride ? "#2563eb" : "var(--border)"};border-radius:3px;padding:0 2px;
              color:${growthColor};font-weight:600;${hasOverride ? "background:rgba(37,99,235,0.06);" : ""}"
            title="${hasOverride ? `手動設定（自動: ${completedVals.length >= 2 ? autoGrowthPct + "%" : "—"}）` : "自動算出"}" />%
        </td>
        <td style="text-align:right;">${fmtNum(effectiveStockNow)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${fmtNum(Math.round(remainingShipL))}</td>
        <td style="text-align:right;font-weight:600;">${fmtNum(projectedStockOct)}</td>
        <td style="text-align:right;">${fmtNum(forecastL)}</td>
        <td style="text-align:right;color:${needL > 0 ? "#ef4444" : "#22c55e"};font-weight:700;">${needL > 0 ? fmtNum(needL) : "余裕"}</td>
      </tr>
    `;
  }).join("");

  // 合計
  let totalStockNow = 0, totalRemaining = 0, totalProjectedOct = 0, totalForecast = 0, totalNeed = 0;
  for (const cat of allCats) {
    const data = catData.get(cat)!;
    const seasonal = seasonMap.get(cat) ?? new Map();
    const cVals = completedFYs.filter(fy => data.has(fy)).map(fy => data.get(fy)!.shipL);
    let gr = 0;
    if (cVals.length >= 2) {
      const rates: number[] = [];
      for (let i = 1; i < cVals.length; i++) { if (cVals[i-1] > 0) rates.push((cVals[i]-cVals[i-1])/cVals[i-1]); }
      gr = rates.length > 0 ? rates.reduce((a,b)=>a+b,0)/rates.length : 0;
    }
    const base = cVals.length > 0 ? cVals[cVals.length - 1] : (data.get(currentFYStart)?.annualL ?? 0);
    const stk = stockEntries.filter(e => e.brewCategory === cat).reduce((a, e) => a + e.volumeL, 0);
    const alc = alcoholSettings[cat];
    const dil = alc && alc.targetAlcoholPct > 0 ? alc.rawAlcoholPct / alc.targetAlcoholPct : 1;
    const effNow = Math.round(stk * dil);
    const rem = remainingMonths.reduce((s, m) => s + (seasonal.get(m) ?? 0), 0);
    const projOct = Math.max(0, effNow - Math.round(rem));
    const effGr = (cat in forecastOverrides) ? forecastOverrides[cat] : gr;
    const fc = Math.round(base * (1 + effGr));
    totalStockNow += effNow;
    totalRemaining += Math.round(rem);
    totalProjectedOct += projOct;
    totalForecast += fc;
    totalNeed += Math.max(0, fc - projOct);
  }

  const monthLabel = currentMonth <= 9 ? `${currentMonth}月〜9月` : `${currentMonth}月〜翌9月`;

  return { needByCategory, html: `
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 4px 0;">${forecastFY}年度 必要醸造量（${forecastFY}/10〜${forecastFY+1}/9）</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 12px;">
        増減率は完了年度（12ヶ月分）のみで算出。当年度(*)は年換算参考値。
      </p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>区分</th>
              ${completedFYs.map(fy => `<th style="text-align:right;">${fy}(L)</th>`).join("")}
              ${currentFYData ? `<th style="text-align:right;">${currentFYStart}*</th>` : ""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${monthLabel}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${forecastFY}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${completedFYs.map(() => `<td></td>`).join("")}
              ${currentFYData ? `<td></td>` : ""}
              <td></td>
              <td style="text-align:right;">${fmtNum(totalStockNow)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${fmtNum(totalRemaining)}</td>
              <td style="text-align:right;">${fmtNum(totalProjectedOct)}</td>
              <td style="text-align:right;">${fmtNum(totalForecast)}</td>
              <td style="text-align:right;color:#ef4444;">${fmtNum(totalNeed)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  ` };
}

// ─── Rice Procurement Plan ────────────────────────────────────────��───────────

function buildRiceProcurement(
  needByCategory: Record<string, number>,
  riceParams: Record<string, BrewingRiceParams>,
  customCategories: BrewingCustomCategory[]
): string {
  const cats = Object.keys(needByCategory).filter(c => needByCategory[c] > 0);
  if (cats.length === 0) return "";

  const order = [...CATEGORY_ORDER, ...customCategories.map(c => c.name)];
  cats.sort((a, b) => (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b)));

  const defaultP: BrewingRiceParams = {
    brewCategory: "", polishingRatio: 0.70, ricePerLiterKg: 0.50,
    kojiRatio: 0.30, kojiVariety: "山田錦", kojiPricePerKg: 600,
    kakeVariety: "一般米", kakePricePerKg: 350
  };

  const inputStyle = `width:48px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 2px;`;

  let tKojiWhite = 0, tKakWhite = 0, tKojiBrown = 0, tKakBrown = 0, tKojiCost = 0, tKakCost = 0;

  const rows = cats.map(cat => {
    const needL = needByCategory[cat];
    const p = riceParams[cat] ?? defaultP;
    const color = CATEGORY_COLORS[cat] ?? "#6366f1";

    const whiteKg = Math.round(needL * p.ricePerLiterKg);
    const kojiWhiteKg = Math.round(whiteKg * p.kojiRatio);
    const kakeWhiteKg = whiteKg - kojiWhiteKg;
    const kojiBrownKg = Math.round(kojiWhiteKg / p.polishingRatio);
    const kakeBrownKg = Math.round(kakeWhiteKg / p.polishingRatio);
    const kojiCost = Math.round(kojiBrownKg * p.kojiPricePerKg);
    const kakeCost = Math.round(kakeBrownKg * p.kakePricePerKg);

    tKojiWhite += kojiWhiteKg; tKakWhite += kakeWhiteKg;
    tKojiBrown += kojiBrownKg; tKakBrown += kakeBrownKg;
    tKojiCost += kojiCost; tKakCost += kakeCost;

    return `
      <tr>
        <td style="color:${color};font-weight:600;white-space:nowrap;" rowspan="2">${cat}</td>
        <td style="text-align:right;" rowspan="2">${fmtNum(Math.round(needL))}</td>
        <td style="text-align:right;" rowspan="2">
          <input type="number" min="0.1" max="2" step="0.01" value="${p.ricePerLiterKg}"
            data-action="brew-rice-edit" data-cat="${cat}" data-field="ricePerLiterKg" style="${inputStyle}" />
        </td>
        <td style="text-align:right;" rowspan="2">
          <input type="number" min="0.05" max="0.5" step="0.01" value="${p.kojiRatio}"
            data-action="brew-rice-edit" data-cat="${cat}" data-field="kojiRatio" style="${inputStyle}" />
        </td>
        <td style="text-align:right;" rowspan="2">
          <input type="number" min="0.2" max="1" step="0.01" value="${p.polishingRatio}"
            data-action="brew-rice-edit" data-cat="${cat}" data-field="polishingRatio" style="${inputStyle}" />
        </td>
        <td style="font-size:11px;color:#6366f1;">麹米</td>
        <td style="text-align:right;">${fmtNum(kojiWhiteKg)}</td>
        <td style="text-align:right;font-weight:600;">${fmtNum(kojiBrownKg)}<span style="font-size:10px;color:var(--text-secondary);margin-left:2px;">${(kojiBrownKg/60).toFixed(1)}俵</span></td>
        <td style="font-size:10px;">${p.kojiVariety}</td>
        <td style="text-align:right;">
          <input type="number" min="0" step="10" value="${p.kojiPricePerKg}"
            data-action="brew-rice-edit" data-cat="${cat}" data-field="kojiPricePerKg" style="${inputStyle}" />
        </td>
        <td style="text-align:right;">¥${fmtNum(kojiCost)}</td>
      </tr>
      <tr style="border-top:none;">
        <td style="font-size:11px;color:#b7791f;">掛米</td>
        <td style="text-align:right;">${fmtNum(kakeWhiteKg)}</td>
        <td style="text-align:right;font-weight:600;">${fmtNum(kakeBrownKg)}<span style="font-size:10px;color:var(--text-secondary);margin-left:2px;">${(kakeBrownKg/60).toFixed(1)}俵</span></td>
        <td style="font-size:10px;">${p.kakeVariety}</td>
        <td style="text-align:right;">
          <input type="number" min="0" step="10" value="${p.kakePricePerKg}"
            data-action="brew-rice-edit" data-cat="${cat}" data-field="kakePricePerKg" style="${inputStyle}" />
        </td>
        <td style="text-align:right;">¥${fmtNum(kakeCost)}</td>
      </tr>
    `;
  }).join("");

  const totalBrown = tKojiBrown + tKakBrown;
  const totalCost = tKojiCost + tKakCost;

  return `
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 4px 0;">原料米 調達計画</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 8px;">
        醸造量 × 白米/L = 白米kg → 麹米比率で分割 → ÷ 精米歩合 = 玄米kg → × 単価 = 予算
      </p>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap;padding:8px;background:var(--surface-alt);border-radius:6px;">
        <span style="font-size:11px;font-weight:600;">一括設定:</span>
        <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
          白米/L <input id="rice-bulk-per-l" type="number" min="0.1" max="2" step="0.01" value="0.50"
            style="width:48px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 2px;" />
        </label>
        <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
          麹比率 <input id="rice-bulk-koji" type="number" min="0.05" max="0.5" step="0.01" value="0.30"
            style="width:48px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 2px;" />
        </label>
        <button data-action="brew-rice-bulk-apply" class="button primary"
          style="font-size:11px;padding:3px 10px;">全区分に適用</button>
      </div>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>区分</th>
              <th style="text-align:right;">醸造(L)</th>
              <th style="text-align:right;">白米/L</th>
              <th style="text-align:right;">麹比率</th>
              <th style="text-align:right;">精米歩合</th>
              <th></th>
              <th style="text-align:right;">白米(kg)</th>
              <th style="text-align:right;">玄米(kg)</th>
              <th>品種</th>
              <th style="text-align:right;">円/kg</th>
              <th style="text-align:right;">予算</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td><td></td><td></td><td></td><td></td>
              <td style="font-size:11px;color:#6366f1;">麹米</td>
              <td style="text-align:right;">${fmtNum(tKojiWhite)}</td>
              <td style="text-align:right;">${fmtNum(tKojiBrown)}<span style="font-size:10px;color:var(--text-secondary);margin-left:2px;">${(tKojiBrown/60).toFixed(1)}俵</span></td>
              <td></td><td></td>
              <td style="text-align:right;">¥${fmtNum(tKojiCost)}</td>
            </tr>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td></td><td></td><td></td><td></td><td></td>
              <td style="font-size:11px;color:#b7791f;">掛米</td>
              <td style="text-align:right;">${fmtNum(tKakWhite)}</td>
              <td style="text-align:right;">${fmtNum(tKakBrown)}<span style="font-size:10px;color:var(--text-secondary);margin-left:2px;">${(tKakBrown/60).toFixed(1)}俵</span></td>
              <td></td><td></td>
              <td style="text-align:right;">¥${fmtNum(tKakCost)}</td>
            </tr>
            <tr style="font-weight:700;border-top:2px solid var(--border);">
              <td>総合計</td><td></td><td></td><td></td><td></td><td></td>
              <td style="text-align:right;">${fmtNum(tKojiWhite + tKakWhite)}</td>
              <td style="text-align:right;">${fmtNum(totalBrown)}<span style="font-size:10px;color:var(--text-secondary);margin-left:2px;">${Math.ceil(totalBrown/60)}俵</span></td>
              <td></td><td></td>
              <td style="text-align:right;">¥${fmtNum(totalCost)}<span style="font-size:10px;color:var(--text-secondary);margin-left:2px;">(${(totalCost/10000).toFixed(0)}万)</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
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
  overrides: Record<string, string>,
  stockEntries: BrewingStockEntry[]
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

  // 標準区分のみ表示（カスタム区分は親の中にインライン）
  // 子区分に入れる先の選択肢（親に子が複数ある場合）
  const childSelectOptions = (parentCat: string, currentChild: string = "") => {
    const children = childCatsOf.get(parentCat) ?? [];
    if (children.length === 0) return "";
    if (children.length === 1) return `<input type="hidden" value="${children[0].name}" />`;
    return `<select style="font-size:10px;padding:1px 2px;border:1px solid var(--border);border-radius:3px;">
      ${children.map(c => `<option value="${c.name}" ${c.name === currentChild ? "selected" : ""}>${c.name}</option>`).join("")}
    </select>`;
  };

  const sections = CATEGORY_ORDER
    .filter(cat => grouped.has(cat))
    .map(cat => {
      const items = grouped.get(cat) ?? [];
      const color = CATEGORY_COLORS[cat] ?? "#9ca3af";
      const children = childCatsOf.get(cat) ?? [];
      const hasChildren = children.length > 0;

      const allMl = items.reduce((s, p) => s + p.annualMl, 0);
      const allMonthlyMl = items.reduce((s, p) => s + p.monthlyAvgMl, 0);
      // 子に確定済みでない商品（未振分含む）
      const visibleItems = items.filter(p => !confirmedInChild.has(p.productCode));
      // 未振分でもない = 純粋に親に残っている商品
      const activeItems = visibleItems.filter(p => !excluded.has(p.productCode));
      const activeMl = activeItems.reduce((s, p) => s + p.annualMl, 0);
      const activeMonthlyMl = activeItems.reduce((s, p) => s + p.monthlyAvgMl, 0);
      // 未振分商品
      const unassignedItems = visibleItems.filter(p => excluded.has(p.productCode));

      // 親の商品行（子がある場合はチェックボックス付き）
      const parentRows = visibleItems.map(p => {
        const isUnassigned = excluded.has(p.productCode);
        return `
          <tr style="${isUnassigned ? "opacity:0.5;background:rgba(183,121,31,0.06);" : ""}">
            <td style="width:32px;text-align:center;">
              ${hasChildren
                ? `<input type="checkbox" ${isUnassigned ? "" : "checked"} data-action="brew-move-to-child" data-code="${p.productCode}" data-parent="${cat}"
                    style="cursor:pointer;" />`
                : ""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${isUnassigned ? "color:#b7791f;" : ""}" title="${p.productName}">
              ${p.productName}${isUnassigned ? ` <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>` : ""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${p.subCategory}</td>
            <td style="text-align:right;">${fmtL(p.annualMl)}</td>
            <td style="text-align:right;">${fmtL(p.monthlyAvgMl)}</td>
          </tr>
        `;
      }).join("");

      // 子区分インラインセクション
      const childSections = children.map(cc => {
        const childItems = grouped.get(cc.name) ?? [];
        const childMl = childItems.reduce((s, p) => s + p.annualMl, 0);
        const childMonthlyMl = childItems.reduce((s, p) => s + p.monthlyAvgMl, 0);
        const childEntries = stockEntries.filter(e => e.brewCategory === cc.name);
        const childStockL = childEntries.reduce((s, e) => s + e.volumeL, 0);
        const ccId = catToId(cc.name);

        // 確定済み行
        const childRows = childItems.map(p => `
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${p.productCode}" data-cat="${cc.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${p.productName}"><strong>${p.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${p.subCategory}</td>
            <td style="text-align:right;">${fmtL(p.annualMl)}</td>
            <td style="text-align:right;">${fmtL(p.monthlyAvgMl)}</td>
          </tr>
        `).join("");

        // 未振分の候補行（親でチェック外されたがまだどの子にも入っていない商品）
        const candidateRows = unassignedItems
          .filter(p => !childItems.some(ci => ci.productCode === p.productCode))
          .map(p => `
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${p.productCode}" data-cat="${cc.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${p.productName}">${p.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${p.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${fmtL(p.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${fmtL(p.monthlyAvgMl)}</td>
            </tr>
          `).join("");

        return `
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${cc.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${childItems.length}品 ・ ${fmtL(childMl)}L/年${childStockL > 0 ? ` ・ 在庫${fmtNum(childStockL)}L` : ""}</span>
                <button class="btn-edit-stock" data-cat-id="${ccId}" data-cat="${cc.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${cc.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${ccId}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${childEntries.map(e => `
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${e.label || "タンク"}</span>
                    <strong style="font-size:11px;">${fmtNum(e.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${e.id}" data-cat="${cc.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${ccId}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${ccId}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${cc.name}" data-cat-id="${ccId}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${ccId}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${childRows.length > 0 || candidateRows.length > 0 ? `
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${childRows}
                    ${candidateRows}
                  </tbody>
                  ${childItems.length > 0 ? `<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${fmtL(childMl)}</td><td style="text-align:right;">${fmtL(childMonthlyMl)}</td>
                  </tr></tfoot>` : ""}
                </table>
              ` : `<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>`}
            </div>
          </td></tr>
        `;
      }).join("");

      return `
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${color};"></span>
            <h4 style="margin:0;font-size:14px;">${cat}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${items.length}銘柄 ・ 年間${fmtL(allMl)}L
              ${hasChildren ? `（内 ${children.map(c => `${c.name}:${(grouped.get(c.name) ?? []).length}品`).join(" / ")}）` : ""}
            </span>
          </div>
          ${hasChildren ? `<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>` : ""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${parentRows}
                ${childSections}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${fmtL(allMl)}</td><td style="text-align:right;">${fmtL(allMonthlyMl)}</td></tr>
                ${hasChildren ? `<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${fmtL(activeMl)}</td><td style="text-align:right;">${fmtL(activeMonthlyMl)}</td></tr>` : ""}
                ${unassignedItems.length > 0 ? `<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${unassignedItems.length}品</td>
                  <td style="text-align:right;">${fmtL(unassignedItems.reduce((s, p) => s + p.annualMl, 0))}</td>
                  <td style="text-align:right;">${fmtL(unassignedItems.reduce((s, p) => s + p.monthlyAvgMl, 0))}</td></tr>` : ""}
              </tfoot>
            </table>
          </div>
        </div>
      `;
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
  alcoholSettings: Record<string, BrewingAlcoholSetting> = {},
  yearlyShipments: BrewingYearlyShipment[] = [],
  seasonalPattern: BrewingSeasonalPattern[] = [],
  forecastOverrides: Record<string, number> = {},
  riceParams: Record<string, BrewingRiceParams> = {}
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

      ${buildSummaryCards(data, stockEntries, alcoholSettings, customCategories)}

      ${(() => {
        // 予測セ���ション + 調達計画を連続描画（必要醸造量を共有）
        const forecastResult = buildForecastWithNeed(yearlyShipments, stockEntries, alcoholSettings, customCategories, seasonalPattern, forecastOverrides);
        return forecastResult.html;
      })()}

      ${buildStockProjection(data)}

      ${buildProductDetail(productDetail, excludedProducts, customCategories, overrides, stockEntries)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${buildDetailTable(data)}
      </div>
    </section>
  `;
}
