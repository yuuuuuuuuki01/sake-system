import type { InvoiceRecord } from "../api";

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

export function renderInvoiceSearch(
  records: InvoiceRecord[],
  filter: { docNo: string; customerCode: string; startDate: string; endDate: string }
): string {
  const rows = records.length
    ? records
        .map(
          (record) => `
            <tr>
              <td class="mono">${record.documentNo}</td>
              <td>${formatDate(record.date)}</td>
              <td class="mono">${record.customerCode}</td>
              <td>${record.customerName}</td>
              <td class="numeric">${record.lineCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${formatCurrency(record.totalAmount)}</td>
              <td><span class="status-pill ${record.status === "確定" ? "success" : record.status === "保留" ? "warning" : "info"}">${record.status}</span></td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="7" class="empty-row">該当する伝票はありません。</td></tr>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">伝票照会</p>
        <h1>請求伝票検索</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>伝票番号</span>
          <input id="invoice-docno" type="text" value="${filter.docNo}" placeholder="例: INV-240001" />
        </label>
        <label class="field">
          <span>得意先コード</span>
          <input id="invoice-customer" type="text" value="${filter.customerCode}" placeholder="例: C0011" />
        </label>
        <label class="field">
          <span>開始日</span>
          <input id="invoice-start" type="date" value="${filter.startDate}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="invoice-end" type="date" value="${filter.endDate}" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="invoice-filter">絞り込む</button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>請求伝票一覧</h2>
          <p class="panel-caption">${records.length.toLocaleString("ja-JP")} 件</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>伝票番号</th>
              <th>日付</th>
              <th>得意先コード</th>
              <th>得意先名</th>
              <th class="numeric">商品数</th>
              <th class="numeric">合計金額</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}
