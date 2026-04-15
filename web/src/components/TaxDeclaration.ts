import type { TaxDeclaration } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function renderTaxDeclaration(
  decl: TaxDeclaration,
  targetYear: number,
  targetMonth: number
): string {
  const rows = decl.rows
    .map(
      (r) => `
      <tr>
        <td class="mono">${r.taxCategory}</td>
        <td>${r.taxCategoryName}</td>
        <td class="numeric">${r.alcoholDegree.toFixed(1)}度</td>
        <td class="numeric">${r.volume.toLocaleString("ja-JP")} L</td>
        <td class="numeric">${r.taxRate.toLocaleString("ja-JP")} 円/L</td>
        <td class="numeric"><strong>${formatCurrency(r.taxAmount)}</strong></td>
      </tr>
    `
    )
    .join("");

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">税務管理</p>
        <h1>酒税申告書</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${decl.status === "submitted" ? "success" : "warning"}">
          ${decl.status === "submitted" ? "申告済" : "下書き"}
        </span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年</span>
          <select id="tax-year">
            ${[2025, 2026].map((y) => `<option value="${y}" ${targetYear === y ? "selected" : ""}>${y}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${months.map((m) => `<option value="${m}" ${targetMonth === m ? "selected" : ""}>${m}月</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="tax-load">集計</button>
        </div>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">酒税総額</p>
        <p class="kpi-value">${formatCurrency(decl.totalTax)}</p>
        <p class="kpi-sub">${decl.targetYear}年${decl.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${decl.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${decl.rows.length} 区分</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>酒税申告書明細</h2>
          <p class="panel-caption">${decl.companyName} / 製造者番号 ${decl.companyNo}</p>
        </div>
        <button class="button secondary" data-action="tax-print" onclick="window.print()">印刷</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>酒類コード</th>
              <th>酒類区分</th>
              <th class="numeric">アルコール度数</th>
              <th class="numeric">数量（L）</th>
              <th class="numeric">税率</th>
              <th class="numeric">酒税額</th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="6" class="empty-row">申告データがありません。</td></tr>`}</tbody>
          <tfoot>
            <tr>
              <th colspan="3">合計</th>
              <th class="numeric">${decl.totalVolume.toLocaleString("ja-JP")} L</th>
              <th></th>
              <th class="numeric">${formatCurrency(decl.totalTax)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="tax-save-draft">下書き保存</button>
        <button class="button primary" data-action="tax-submit" ${decl.status === "submitted" ? "disabled" : ""}>
          ${decl.status === "submitted" ? "申告済" : "申告する"}
        </button>
      </div>
    </section>
  `;
}
