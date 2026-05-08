import type { CustomerAnalysisData, CustomerRankRow, ProductABCData, ProductRankRow } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

function abcClass(rank: "A" | "B" | "C"): string {
  switch (rank) {
    case "A": return "success";
    case "B": return "warning";
    case "C": return "neutral";
  }
}

function buildRankingChart(rows: CustomerRankRow[]): string {
  if (rows.length === 0) {
    return `<div class="chart-empty">データなし</div>`;
  }

  const top = rows.slice(0, 15);
  const maxAmount = Math.max(...top.map((r) => r.amount), 1);
  const barHeight = 28;
  const gap = 6;
  const labelWidth = 140;
  const valueWidth = 100;
  const chartWidth = 760;
  const plotWidth = chartWidth - labelWidth - valueWidth;
  const svgHeight = top.length * (barHeight + gap) + 16;

  const bars = top
    .map((row, i) => {
      const w = (row.amount / maxAmount) * plotWidth;
      const y = i * (barHeight + gap) + 8;
      const color = row.abcRank === "A" ? "#2F855A" : row.abcRank === "B" ? "#B7791F" : "#718096";
      return `
        <g>
          <text x="${labelWidth - 8}" y="${y + barHeight / 2 + 5}" class="chart-axis" text-anchor="end">${row.name.length > 10 ? row.name.slice(0, 10) + "…" : row.name}</text>
          <rect x="${labelWidth}" y="${y}" width="${w}" height="${barHeight}" rx="4" fill="${color}" opacity="0.85" />
          <text x="${labelWidth + w + 8}" y="${y + barHeight / 2 + 5}" class="chart-axis">${(row.amount / 10000).toFixed(0)}万円</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${chartWidth} ${svgHeight}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${bars}
    </svg>
  `;
}

function buildMonthlyTable(
  items: { label: string; values: number[] }[],
  months: string[],
  rowLabel = "得意先"
): string {
  if (items.length === 0 || months.length === 0) {
    return `<p class="empty-row">データなし</p>`;
  }

  const headerCells = months.map((m) => `<th class="numeric">${m}</th>`).join("");
  // 月ごとの合計
  const monthTotals = months.map((_, mi) => items.reduce((s, c) => s + (c.values[mi] ?? 0), 0));
  const grandTotal = monthTotals.reduce((s, v) => s + v, 0);

  const rows = items.map((c) => {
    const rowTotal = c.values.reduce((s, v) => s + v, 0);
    const cells = c.values.map((v) => `<td class="numeric">${v > 0 ? (v / 10000).toFixed(0) + "万" : "—"}</td>`).join("");
    return `<tr>
      <td>${c.label}</td>
      ${cells}
      <td class="numeric"><strong>${(rowTotal / 10000).toFixed(0)}万</strong></td>
    </tr>`;
  }).join("");

  const footerCells = monthTotals.map((v) => `<td class="numeric"><strong>${v > 0 ? (v / 10000).toFixed(0) + "万" : "—"}</strong></td>`).join("");

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${rowLabel}</th>
            ${headerCells}
            <th class="numeric">合計</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr style="background:var(--surface-raised,#f5f5f5);font-weight:600;">
            <td>月次合計</td>
            ${footerCells}
            <td class="numeric">${(grandTotal / 10000).toFixed(0)}万</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

// ── 商品ABC（ProductABC.ts から移植） ─────────────────────────────────

function abcClassProduct(rank: "A" | "B" | "C"): string {
  return abcClass(rank);
}

function buildParetoChart(rows: ProductRankRow[]): string {
  if (rows.length === 0) return `<div class="chart-empty">データなし</div>`;

  const top = rows.slice(0, 20);
  const width = 760;
  const height = 320;
  const padding = { top: 24, right: 56, bottom: 60, left: 72 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxAmount = Math.max(...top.map((r) => r.amount), 1);
  const step = plotWidth / top.length;

  const axes = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = padding.top + plotHeight - plotHeight * ratio;
    return `<g>
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid" />
      <text x="4" y="${y + 4}" class="chart-axis">${Math.round((maxAmount * ratio) / 10000)}万</text>
    </g>`;
  }).join("");

  const rightAxes = [0, 25, 50, 70, 90, 100].map((pct) => {
    const y = padding.top + plotHeight - (plotHeight * pct) / 100;
    const isDashed = pct === 70 || pct === 90;
    return `<g>
      <text x="${width - 4}" y="${y + 4}" class="chart-axis" text-anchor="end">${pct}%</text>
      ${isDashed ? `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="${pct === 70 ? "#2F855A" : "#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />` : ""}
    </g>`;
  }).join("");

  const bars = top.map((row, i) => {
    const barHeight = (row.amount / maxAmount) * plotHeight;
    const barWidth = Math.max(step - 10, 16);
    const x = padding.left + i * step + (step - barWidth) / 2;
    const y = padding.top + plotHeight - barHeight;
    const color = row.abcRank === "A" ? "#2F855A" : row.abcRank === "B" ? "#B7791F" : "#718096";
    const label = row.name.length > 6 ? row.name.slice(0, 6) + "…" : row.name;
    return `<g>
      <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="4" fill="${color}" opacity="0.8" />
      <text x="${x + barWidth / 2}" y="${height - 8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${x + barWidth / 2} ${height - 16})">${label}</text>
    </g>`;
  }).join("");

  const linePoints = top.map((row, i) => {
    const x = padding.left + i * step + step / 2;
    const y = padding.top + plotHeight - (plotHeight * row.cumRatio) / 100;
    return `${x},${y}`;
  }).join(" ");

  const dots = top.map((row, i) => {
    const x = padding.left + i * step + step / 2;
    const y = padding.top + plotHeight - (plotHeight * row.cumRatio) / 100;
    return `<circle cx="${x}" cy="${y}" r="3.5" fill="#C53D3D" />`;
  }).join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${axes}${rightAxes}${bars}
      <polyline points="${linePoints}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${dots}
    </svg>`;
}

function renderProductPanel(data: ProductABCData): string {
  const countA = data.ranking.filter((r) => r.abcRank === "A").length;
  const countB = data.ranking.filter((r) => r.abcRank === "B").length;
  const countC = data.ranking.filter((r) => r.abcRank === "C").length;
  const amountA = data.ranking.filter((r) => r.abcRank === "A").reduce((s, r) => s + r.amount, 0);

  const abcRows = data.ranking.map((row) => `
    <tr>
      <td class="mono">${row.code}</td>
      <td>${row.name}</td>
      <td class="numeric">${formatCurrency(row.amount)}</td>
      <td class="numeric">${row.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${row.ratio.toFixed(1)}%</td>
      <td class="numeric">${row.cumRatio.toFixed(1)}%</td>
      <td><span class="status-pill ${abcClassProduct(row.abcRank)}">${row.abcRank}</span></td>
    </tr>`).join("");

  const monthlyHtml = buildMonthlyTable(data.monthlyByProduct, data.months, "商品名");

  return `
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">商品数</div><div class="kpi-value">${data.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${countA}品 <span class="kpi-sub">${((amountA / data.totalAmount) * 100).toFixed(1)}%</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${countB}品</div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${countC}品</div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>パレート図</h2><p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p></div></div>
      <div class="chart-scroll">${buildParetoChart(data.ranking)}</div>
      <div class="pareto-legend">
        <span class="legend-item"><span class="legend-dot" style="background:#2F855A"></span>Aランク（〜70%）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#B7791F"></span>Bランク（70〜90%）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#718096"></span>Cランク（90%〜）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#C53D3D"></span>累積構成比</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>商品ABC一覧</h2><p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>コード</th><th>商品名</th><th class="numeric">売上額</th><th class="numeric">数量</th><th class="numeric">構成比</th><th class="numeric">累積構成比</th><th>ランク</th></tr></thead>
          <tbody>${abcRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>上位商品 月次推移</h2><p class="panel-caption">Aランク商品の月別売上</p></div></div>
      ${monthlyHtml}
    </section>`;
}

// ── 得意先ABC ────────────────────────────────────────────────────────────

function renderCustomerPanel(data: CustomerAnalysisData): string {
  const countA = data.ranking.filter((r) => r.abcRank === "A").length;
  const countB = data.ranking.filter((r) => r.abcRank === "B").length;
  const countC = data.ranking.filter((r) => r.abcRank === "C").length;
  const amountA = data.ranking.filter((r) => r.abcRank === "A").reduce((s, r) => s + r.amount, 0);
  const amountB = data.ranking.filter((r) => r.abcRank === "B").reduce((s, r) => s + r.amount, 0);
  const amountC = data.ranking.filter((r) => r.abcRank === "C").reduce((s, r) => s + r.amount, 0);

  const abcRows = data.ranking.map((row) => `
    <tr>
      <td class="mono">${row.code}</td>
      <td>${row.name}</td>
      <td class="numeric">${formatCurrency(row.amount)}</td>
      <td class="numeric">${row.ratio.toFixed(1)}%</td>
      <td class="numeric">${row.cumRatio.toFixed(1)}%</td>
      <td class="numeric">${row.documents.toLocaleString("ja-JP")}</td>
      <td><span class="status-pill ${abcClass(row.abcRank)}">${row.abcRank}</span></td>
    </tr>`).join("");

  return `
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">得意先数</div><div class="kpi-value">${data.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${countA}社 <span class="kpi-sub">${formatCurrency(amountA)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${countB}社 <span class="kpi-sub">${formatCurrency(amountB)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${countC}社 <span class="kpi-sub">${formatCurrency(amountC)}</span></div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別売上ランキング</h2><p class="panel-caption">売上金額上位15社</p></div></div>
      <div class="chart-scroll">${buildRankingChart(data.ranking)}</div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先ABC分析</h2><p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>コード</th><th>得意先名</th><th class="numeric">売上額</th><th class="numeric">構成比</th><th class="numeric">累積構成比</th><th class="numeric">伝票数</th><th>ランク</th></tr></thead>
          <tbody>${abcRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別月次推移</h2><p class="panel-caption">上位10得意先の月別売上推移</p></div></div>
      ${buildMonthlyTable(data.monthlyByCustomer, data.months, "得意先")}
    </section>`;
}

export function renderCustomerAnalysis(
  data: CustomerAnalysisData,
  productData: ProductABCData | null,
  activeTab: "customer" | "product",
  period = ""
): string {
  const tabContent = activeTab === "customer"
    ? renderCustomerPanel(data)
    : productData
      ? renderProductPanel(productData)
      : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>`;

  // 利用可能な年リスト（データから自動生成）
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));
  const selYear = period.length === 4 ? period : period.slice(0, 4);
  const selMonth = period.length === 7 ? period.slice(5, 7) : "";
  const months12 = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  const monthNames: Record<string, string> = { "01":"1月","02":"2月","03":"3月","04":"4月","05":"5月","06":"6月","07":"7月","08":"8月","09":"9月","10":"10月","11":"11月","12":"12月" };

  const periodLabel = period
    ? (period.length === 7 ? `${period.slice(0,4)}年${monthNames[period.slice(5)] ?? period.slice(5)}` : `${period}年`)
    : "全期間";

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>ABC分析 <span style="font-size:0.75em;font-weight:400;color:var(--text-secondary);">${periodLabel}</span></h1>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="analysis-period-year" class="input-sm">
          <option value="">全期間</option>
          ${years.map((y) => `<option value="${y}" ${selYear === y ? "selected" : ""}>${y}年</option>`).join("")}
        </select>
        <select id="analysis-period-month" class="input-sm" ${!selYear ? "disabled" : ""}>
          <option value="">全月</option>
          ${months12.map((m) => `<option value="${m}" ${selMonth === m ? "selected" : ""}>${monthNames[m]}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="tab-bar" style="margin-bottom:16px;">
      <button class="tab-btn ${activeTab === "customer" ? "active" : ""}" type="button" data-analysis-tab="customer">👥 得意先ABC分析</button>
      <button class="tab-btn ${activeTab === "product"  ? "active" : ""}" type="button" data-analysis-tab="product">📦 商品ABC分析</button>
    </div>

    ${tabContent}
  `;
}
