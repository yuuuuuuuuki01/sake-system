import type { CustomerLedger } from "../api";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

function renderSalesRows(ledger: CustomerLedger): string {
  if (ledger.salesHistory.length === 0) {
    return `<tr><td colspan="3" class="empty-row">データなし</td></tr>`;
  }

  return ledger.salesHistory
    .map(
      (entry) => `
        <tr>
          <td>${formatDate(entry.date)}</td>
          <td class="mono">${entry.documentNo}</td>
          <td class="numeric">${formatCurrency(entry.amount)}</td>
        </tr>
      `
    )
    .join("");
}

function renderPaymentRows(ledger: CustomerLedger): string {
  if (ledger.paymentHistory.length === 0) {
    return `<tr><td colspan="3" class="empty-row">データなし</td></tr>`;
  }

  return ledger.paymentHistory
    .map(
      (entry) => `
        <tr>
          <td>${formatDate(entry.date)}</td>
          <td>${entry.method}</td>
          <td class="numeric">${formatCurrency(entry.amount)}</td>
        </tr>
      `
    )
    .join("");
}

export function renderCustomerLedger(ledger: CustomerLedger, customerCode: string): string {
  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">得意先台帳</p>
        <h1>得意先別売上・入金台帳</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid ledger-filter-grid">
        <label class="field">
          <span>得意先コード</span>
          <input id="ledger-customer-code" type="text" value="${customerCode}" placeholder="C0011" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="ledger-search">検索</button>
        </div>
      </div>
    </section>

    <section class="ledger-grid">
      <article class="panel ledger-summary">
        <div class="panel-header">
          <div>
            <h2>${ledger.customerName}</h2>
            <p class="panel-caption mono">${ledger.customerCode}</p>
          </div>
        </div>
        <dl class="summary-list">
          <div>
            <dt>売上累計</dt>
            <dd>${formatCurrency(ledger.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${formatCurrency(ledger.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${ledger.balanceAmount > 0 ? "balance-warning" : ""}">${formatCurrency(ledger.balanceAmount)}</dd>
          </div>
        </dl>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>売上履歴</h2>
            <p class="panel-caption">直近伝票ベース</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>伝票番号</th>
                <th class="numeric">売上額</th>
              </tr>
            </thead>
            <tbody>${renderSalesRows(ledger)}</tbody>
          </table>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>入金履歴</h2>
            <p class="panel-caption">入金方法と金額</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>入金方法</th>
                <th class="numeric">入金額</th>
              </tr>
            </thead>
            <tbody>${renderPaymentRows(ledger)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `;
}
