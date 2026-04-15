import type { SalesReport } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function renderSalesReport(report: SalesReport): string {
  const maxVal =
    Math.max(...report.salesByProduct.flatMap((s) => s.values), 1);

  const productChart = report.salesByProduct
    .map((series) => {
      const bars = series.values
        .map(
          (v, i) => `
          <div class="bar-col">
            <div class="bar" style="height:${Math.round((v / maxVal) * 120)}px" title="${report.months[i]}: ${formatCurrency(v)}"></div>
            <span class="bar-label">${report.months[i].replace("月", "")}</span>
          </div>
        `
        )
        .join("");
      return `
        <div class="chart-series">
          <p class="chart-series-label">${series.label}</p>
          <div class="bar-chart">${bars}</div>
        </div>
      `;
    })
    .join("");

  const costRows = report.costSimulation
    .map(
      (row) => `
      <tr>
        <td class="mono">${row.productCode}</td>
        <td>${row.productName}</td>
        <td class="numeric">${formatCurrency(row.costPrice)}</td>
        <td class="numeric">${formatCurrency(row.sellPrice)}</td>
        <td class="numeric">${formatCurrency(row.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${row.marginRate >= 40 ? "success" : "warning"}">${row.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `
    )
    .join("");

  const customerRows = report.salesByCustomer
    .map((c) => {
      const total = c.values.reduce((s, v) => s + v, 0);
      return `
        <tr>
          <td>${c.label}</td>
          ${c.values.map((v) => `<td class="numeric">${(v / 10000).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${formatCurrency(total)}</strong></td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">集計帳票</p>
        <h1>売上集計・原価シミュレーション</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品別月次売上</h2>
      </div>
      <div class="chart-wrap">${productChart}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>得意先別売上（年次）</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>得意先</th>
              ${report.months.map((m) => `<th class="numeric">${m}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${customerRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>原価シミュレーション</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>商品コード</th>
              <th>商品名</th>
              <th class="numeric">原価</th>
              <th class="numeric">売価</th>
              <th class="numeric">粗利</th>
              <th class="numeric">粗利率</th>
            </tr>
          </thead>
          <tbody>${costRows}</tbody>
        </table>
      </div>
    </section>
  `;
}
