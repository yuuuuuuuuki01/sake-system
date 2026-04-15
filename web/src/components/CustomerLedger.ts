import type { CustomerLedgerSummary } from "../api";

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

export function renderCustomerLedger(
  summary: CustomerLedgerSummary | null,
  searchCode: string
): string {
  const salesRows = summary?.salesHistory.length
    ? summary.salesHistory
        .map(
          (record) => `
            <tr>
              <td>${formatDate(record.date)}</td>
              <td class="mono">${record.documentNo}</td>
              <td class="numeric">${formatCurrency(record.amount)}</td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="3" class="empty-row">売上履歴はありません。</td></tr>`;

  const paymentRows = summary?.paymentHistory.length
    ? summary.paymentHistory
        .map(
          (record) => `
            <tr>
              <td>${formatDate(record.date)}</td>
              <td class="numeric">${formatCurrency(record.amount)}</td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="2" class="empty-row">入金履歴はありません。</td></tr>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">得意先台帳</p>
        <h1>得意先別 売掛・入金履歴</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>得意先コード</span>
          <input id="ledger-code" type="text" value="${searchCode}" placeholder="例: C0011" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="ledger-search">検索する</button>
        </div>
      </div>
    </section>

    ${
      summary
        ? `
      <section class="page-head">
        <div>
          <p class="panel-caption mono">${summary.customerCode}</p>
          <h1>${summary.customerName}</h1>
        </div>
      </section>

      <section class="kpi-grid">
        <article class="panel kpi-card">
          <p class="panel-title">売上累計</p>
          <p class="kpi-value">${formatCurrency(summary.totalSales)}</p>
        </article>
        <article class="panel kpi-card">
          <p class="panel-title">入金累計</p>
          <p class="kpi-value">${formatCurrency(summary.totalPayments)}</p>
        </article>
        <article class="panel kpi-card kpi-alert">
          <p class="panel-title">残高</p>
          <p class="kpi-value">${formatCurrency(summary.balance)}</p>
        </article>
      </section>

      <section class="content-grid">
        <article class="panel">
          <div class="panel-header">
            <div>
              <h2>売上履歴</h2>
              <p class="panel-caption">${summary.salesHistory.length.toLocaleString("ja-JP")} 件</p>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>日付</th>
                  <th>伝票番号</th>
                  <th class="numeric">金額</th>
                </tr>
              </thead>
              <tbody>${salesRows}</tbody>
            </table>
          </div>
        </article>

        <aside class="panel">
          <div class="panel-header">
            <div>
              <h2>入金履歴</h2>
              <p class="panel-caption">${summary.paymentHistory.length.toLocaleString("ja-JP")} 件</p>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>入金日</th>
                  <th class="numeric">入金額</th>
                </tr>
              </thead>
              <tbody>${paymentRows}</tbody>
            </table>
          </div>
        </aside>
      </section>
    `
        : `
      <section class="panel">
        <p>得意先コードを入力してください</p>
      </section>
    `
    }
  `;
}
