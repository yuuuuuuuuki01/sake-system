import type { ProductABCData, ProductRankRow } from "../api";

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

function buildParetoChart(rows: ProductRankRow[]): string {
  if (rows.length === 0) {
    return `<div class="chart-empty">データなし</div>`;
  }

  const top = rows.slice(0, 20);
  const width = 760;
  const height = 320;
  const padding = { top: 24, right: 56, bottom: 60, left: 72 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxAmount = Math.max(...top.map((r) => r.amount), 1);
  const step = plotWidth / top.length;

  // Y-axis gridlines (left: amount)
  const axes = [0, 0.25, 0.5, 0.75, 1]
    .map((ratio) => {
      const y = padding.top + plotHeight - plotHeight * ratio;
      const label = `${Math.round((maxAmount * ratio) / 10000)}万`;
      return `
        <g>
          <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid" />
          <text x="4" y="${y + 4}" class="chart-axis">${label}</text>
        </g>
      `;
    })
    .join("");

  // Right Y-axis labels (cumulative %)
  const rightAxes = [0, 25, 50, 70, 90, 100]
    .map((pct) => {
      const y = padding.top + plotHeight - (plotHeight * pct) / 100;
      const isDashed = pct === 70 || pct === 90;
      return `
        <g>
          <text x="${width - 4}" y="${y + 4}" class="chart-axis" text-anchor="end">${pct}%</text>
          ${isDashed ? `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="${pct === 70 ? "#2F855A" : "#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />` : ""}
        </g>
      `;
    })
    .join("");

  // Bars
  const bars = top
    .map((row, i) => {
      const barHeight = (row.amount / maxAmount) * plotHeight;
      const barWidth = Math.max(step - 10, 16);
      const x = padding.left + i * step + (step - barWidth) / 2;
      const y = padding.top + plotHeight - barHeight;
      const color = row.abcRank === "A" ? "#2F855A" : row.abcRank === "B" ? "#B7791F" : "#718096";
      const label = row.name.length > 6 ? row.name.slice(0, 6) + "…" : row.name;
      return `
        <g>
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="4" fill="${color}" opacity="0.8" />
          <text x="${x + barWidth / 2}" y="${height - 8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${x + barWidth / 2} ${height - 16})">${label}</text>
        </g>
      `;
    })
    .join("");

  // Cumulative line
  const linePoints = top
    .map((row, i) => {
      const x = padding.left + i * step + step / 2;
      const y = padding.top + plotHeight - (plotHeight * row.cumRatio) / 100;
      return `${x},${y}`;
    })
    .join(" ");

  const dots = top
    .map((row, i) => {
      const x = padding.left + i * step + step / 2;
      const y = padding.top + plotHeight - (plotHeight * row.cumRatio) / 100;
      return `<circle cx="${x}" cy="${y}" r="3.5" fill="#C53D3D" />`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${axes}
      ${rightAxes}
      ${bars}
      <polyline points="${linePoints}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${dots}
    </svg>
  `;
}

export function renderProductABC(data: ProductABCData): string {
  const countA = data.ranking.filter((r) => r.abcRank === "A").length;
  const countB = data.ranking.filter((r) => r.abcRank === "B").length;
  const countC = data.ranking.filter((r) => r.abcRank === "C").length;
  const amountA = data.ranking.filter((r) => r.abcRank === "A").reduce((s, r) => s + r.amount, 0);

  const abcRows = data.ranking
    .map(
      (row) => `
        <tr>
          <td class="mono">${row.code}</td>
          <td>${row.name}</td>
          <td class="numeric">${formatCurrency(row.amount)}</td>
          <td class="numeric">${row.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${row.ratio.toFixed(1)}%</td>
          <td class="numeric">${row.cumRatio.toFixed(1)}%</td>
          <td><span class="status-pill ${abcClass(row.abcRank)}">${row.abcRank}</span></td>
        </tr>
      `
    )
    .join("");

  // Monthly breakdown for top products
  const monthlyHtml = data.monthlyByProduct.length > 0
    ? (() => {
        const headerCells = data.months.map((m) => `<th class="numeric">${m}</th>`).join("");
        const rows = data.monthlyByProduct
          .map((p) => {
            const total = p.values.reduce((s, v) => s + v, 0);
            const cells = p.values.map((v) => `<td class="numeric">${v > 0 ? (v / 10000).toFixed(0) + "万" : "—"}</td>`).join("");
            return `<tr><td>${p.label}</td>${cells}<td class="numeric"><strong>${formatCurrency(total)}</strong></td></tr>`;
          })
          .join("");
        return `
          <div class="table-wrap">
            <table>
              <thead><tr><th>商品名</th>${headerCells}<th class="numeric">合計</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        `;
      })()
    : `<p class="empty-row">データなし</p>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">商品分析</p>
        <h1>商品別ABC分析</h1>
      </div>
    </section>

    <section class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-label">商品数</div>
        <div class="kpi-value">${data.ranking.length}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Aランク</div>
        <div class="kpi-value kpi-success">${countA}品 <span class="kpi-sub">${((amountA / data.totalAmount) * 100).toFixed(1)}%</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${countB}品</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${countC}品</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>パレート図</h2>
          <p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p>
        </div>
      </div>
      ${buildParetoChart(data.ranking)}
      <div class="pareto-legend">
        <span class="legend-item"><span class="legend-dot" style="background:#2F855A"></span>Aランク（〜70%）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#B7791F"></span>Bランク（70〜90%）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#718096"></span>Cランク（90%〜）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#C53D3D"></span>累積構成比</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>商品ABC一覧</h2>
          <p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>商品名</th>
              <th class="numeric">売上額</th>
              <th class="numeric">数量</th>
              <th class="numeric">構成比</th>
              <th class="numeric">累積構成比</th>
              <th>ランク</th>
            </tr>
          </thead>
          <tbody>${abcRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>上位商品 月次推移</h2>
          <p class="panel-caption">Aランク商品の月別売上</p>
        </div>
      </div>
      ${monthlyHtml}
    </section>
  `;
}
