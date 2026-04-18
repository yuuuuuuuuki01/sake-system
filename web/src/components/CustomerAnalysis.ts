import type { CustomerAnalysisData, CustomerRankRow } from "../api";

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

function buildMonthlyTable(data: CustomerAnalysisData): string {
  if (data.monthlyByCustomer.length === 0) {
    return `<p class="empty-row">データなし</p>`;
  }

  const headerCells = data.months.map((m) => `<th class="numeric">${m}</th>`).join("");
  const rows = data.monthlyByCustomer
    .map((c) => {
      const total = c.values.reduce((s, v) => s + v, 0);
      const cells = c.values.map((v) => `<td class="numeric">${v > 0 ? (v / 10000).toFixed(0) + "万" : "—"}</td>`).join("");
      return `
        <tr>
          <td>${c.label}</td>
          ${cells}
          <td class="numeric"><strong>${formatCurrency(total)}</strong></td>
        </tr>
      `;
    })
    .join("");

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>得意先</th>
            ${headerCells}
            <th class="numeric">合計</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

export function renderCustomerAnalysis(data: CustomerAnalysisData): string {
  const totalAmount = data.ranking.reduce((s, r) => s + r.amount, 0);
  const countA = data.ranking.filter((r) => r.abcRank === "A").length;
  const countB = data.ranking.filter((r) => r.abcRank === "B").length;
  const countC = data.ranking.filter((r) => r.abcRank === "C").length;
  const amountA = data.ranking.filter((r) => r.abcRank === "A").reduce((s, r) => s + r.amount, 0);
  const amountB = data.ranking.filter((r) => r.abcRank === "B").reduce((s, r) => s + r.amount, 0);
  const amountC = data.ranking.filter((r) => r.abcRank === "C").reduce((s, r) => s + r.amount, 0);

  const abcRows = data.ranking
    .map(
      (row) => `
        <tr>
          <td class="mono">${row.code}</td>
          <td>${row.name}</td>
          <td class="numeric">${formatCurrency(row.amount)}</td>
          <td class="numeric">${row.ratio.toFixed(1)}%</td>
          <td class="numeric">${row.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${row.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${abcClass(row.abcRank)}">${row.abcRank}</span></td>
        </tr>
      `
    )
    .join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">得意先分析</p>
        <h1>得意先別集計・ABC分析</h1>
      </div>
    </section>

    <section class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-label">得意先数</div>
        <div class="kpi-value">${data.ranking.length}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Aランク</div>
        <div class="kpi-value kpi-success">${countA}社 <span class="kpi-sub">${formatCurrency(amountA)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${countB}社 <span class="kpi-sub">${formatCurrency(amountB)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${countC}社 <span class="kpi-sub">${formatCurrency(amountC)}</span></div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先別売上ランキング</h2>
          <p class="panel-caption">売上金額上位15社</p>
        </div>
      </div>
      ${buildRankingChart(data.ranking)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先ABC分析</h2>
          <p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>得意先名</th>
              <th class="numeric">売上額</th>
              <th class="numeric">構成比</th>
              <th class="numeric">累積構成比</th>
              <th class="numeric">伝票数</th>
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
          <h2>得意先別月次推移</h2>
          <p class="panel-caption">上位得意先の月別売上推移</p>
        </div>
      </div>
      ${buildMonthlyTable(data)}
    </section>
  `;
}
