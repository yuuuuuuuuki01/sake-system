import type { SalesRecord, InvoiceLineDetail } from "../api";

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

export function renderSalesTable(
  records: SalesRecord[],
  startDate: string,
  endDate: string,
  selectedDocNo: string | null = null,
  selectedLines: InvoiceLineDetail[] | null = null
): string {
  const rows = records.length
    ? records
        .map(
          (record) => `
            <tr class="clickable-row${record.documentNo === selectedDocNo ? " selected-row" : ""}"
                data-doc-no="${record.documentNo}">
              <td class="mono">${record.documentNo}</td>
              <td>${formatDate(record.date)}</td>
              <td>
                <div class="table-title">${record.customerName}</div>
                <div class="table-sub mono">${record.customerCode}</div>
              </td>
              <td class="numeric">${formatCurrency(record.amount)}</td>
            </tr>
            ${record.documentNo === selectedDocNo ? renderLineDetail(selectedLines) : ""}
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
          <p class="panel-caption">${records.length.toLocaleString("ja-JP")} 件　※行タップで明細表示</p>
        </div>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
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

    <style>
      .clickable-row { cursor: pointer; }
      .clickable-row:hover { background: var(--bg-hover, #f0f4ff); }
      .selected-row { background: var(--bg-selected, #e8f0fe) !important; }
      .line-detail-row td { padding: 0 !important; border-top: none !important; }
      .line-detail-panel {
        background: var(--bg-detail, #f8f9fa);
        padding: 12px 16px;
        border-left: 3px solid var(--accent, #4a6cf7);
      }
      .line-detail-panel table { margin: 0; font-size: 0.9em; }
      .line-detail-panel th { font-weight: 600; font-size: 0.85em; color: #666; }
    </style>
  `;
}

function renderLineDetail(lines: InvoiceLineDetail[] | null): string {
  if (!lines) {
    return `<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;
  }
  if (lines.length === 0) {
    return `<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;
  }

  const lineRows = lines.map(
    (ln) => `
      <tr>
        <td class="mono" style="width:40px">${ln.lineNo}</td>
        <td class="mono" style="width:70px">${ln.productCode}</td>
        <td>${ln.productName}</td>
        <td class="numeric" style="width:50px">${ln.quantity}</td>
        <td class="numeric" style="width:80px">${formatCurrency(ln.unitPrice)}</td>
        <td class="numeric" style="width:90px">${formatCurrency(ln.amount)}</td>
      </tr>`
  ).join("");

  const total = lines.reduce((sum, ln) => sum + ln.amount, 0);

  return `<tr class="line-detail-row"><td colspan="4">
    <div class="line-detail-panel">
      <table>
        <thead>
          <tr>
            <th>行</th><th>商品CD</th><th>商品名</th>
            <th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>
          ${lineRows}
          <tr style="font-weight:600;border-top:2px solid #ccc">
            <td colspan="5" style="text-align:right">合計</td>
            <td class="numeric">${formatCurrency(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`;
}
