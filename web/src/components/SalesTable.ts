import type { SalesRecord } from "../api";

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

function toDateInputValue(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function renderSalesTable(records: SalesRecord[], startDate: string, endDate: string): string {
  const rows = records.length
    ? records
        .map(
          (record) => `
            <tr>
              <td class="mono">${record.documentNo}</td>
              <td>${formatDate(record.date)}</td>
              <td>
                <div class="table-title">${record.customerName}</div>
                <div class="table-sub mono">${record.customerCode}</div>
              </td>
              <td class="numeric">${formatCurrency(record.amount)}</td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="4" class="empty-row">該当する売上伝票はありません。</td></tr>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">売上一覧</p>
        <h1>売上伝票一覧</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>開始日</span>
          <input id="sales-start" type="date" value="${startDate || toDateInputValue(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${endDate || toDateInputValue(new Date())}" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="sales-filter">絞り込む</button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>伝票一覧</h2>
          <p class="panel-caption">${records.length.toLocaleString("ja-JP")} 件</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>伝票番号</th>
              <th>日付</th>
              <th>得意先</th>
              <th class="numeric">金額</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}
