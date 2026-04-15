import type { InvoiceFilter, InvoiceRecord } from "../api";

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

export function renderInvoiceSearch(records: InvoiceRecord[], filter: InvoiceFilter): string {
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
              <td class="numeric">${record.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${formatCurrency(record.amount)}</td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="5" class="empty-row">データなし</td></tr>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">伝票照会</p>
        <h1>売上伝票検索</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid invoice-filter-grid">
        <label class="field">
          <span>伝票番号</span>
          <input id="invoice-document-no" type="text" value="${filter.documentNo}" placeholder="D240100" />
        </label>
        <label class="field">
          <span>開始日</span>
          <input id="invoice-start" type="date" value="${filter.startDate}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="invoice-end" type="date" value="${filter.endDate}" />
        </label>
        <label class="field">
          <span>得意先コード</span>
          <input id="invoice-customer-code" type="text" value="${filter.customerCode}" placeholder="C0011" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="invoice-filter">絞り込む</button>
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
              <th class="numeric">明細数</th>
              <th class="numeric">金額</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${records.length === 0 ? '<p class="empty-note">条件に一致する伝票はありません。</p>' : ""}
    </section>
  `;
}
