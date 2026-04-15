import type { BillingCustomer, BillingSummary } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

const statusLabel: Record<BillingCustomer["status"], string> = {
  open: "未締め",
  closed: "締め済"
};

export function renderBilling(summary: BillingSummary, yearMonth: string): string {
  const rows = summary.customers
    .map(
      (c) => `
      <tr>
        <td>
          <div class="table-title">${c.customerName}</div>
          <div class="table-sub mono">${c.customerCode}</div>
        </td>
        <td class="numeric">${c.closingDay}日</td>
        <td class="numeric">${formatCurrency(c.salesAmount)}</td>
        <td class="numeric">${formatCurrency(c.taxAmount)}</td>
        <td class="numeric">${formatCurrency(c.prevBalance)}</td>
        <td class="numeric">${formatCurrency(c.paymentAmount)}</td>
        <td class="numeric"><strong>${formatCurrency(c.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${c.status === "closed" ? "success" : "warning"}">${statusLabel[c.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="billing-print" data-code="${c.customerCode}" ${c.status === "closed" ? "" : "disabled"}>請求書</button>
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">月次請求</p>
        <h1>月次請求締め</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年月</span>
          <input id="billing-month" type="month" value="${yearMonth}" />
        </label>
        <label class="field">
          <span>締め日</span>
          <select id="billing-day">
            ${[10, 15, 20, 25, 31].map(d => `<option value="${d}" ${summary.closingDay === d ? "selected" : ""}>${d}日締め</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="billing-load">集計</button>
        </div>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">請求総額</p>
        <p class="kpi-value">${formatCurrency(summary.totalBilling)}</p>
        <p class="kpi-sub">${summary.targetYearMonth} / ${summary.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${summary.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${summary.customers.filter(c => c.status === "closed").length} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先別請求一覧</h2>
          <p class="panel-caption">${summary.targetYearMonth} 分</p>
        </div>
        <button class="button secondary" data-action="billing-close-all">一括締め</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>得意先</th>
              <th class="numeric">締日</th>
              <th class="numeric">売上額</th>
              <th class="numeric">消費税</th>
              <th class="numeric">前回残高</th>
              <th class="numeric">入金額</th>
              <th class="numeric">請求額</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}
