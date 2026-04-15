import type { DeliveryNote } from "../api";

function formatDate(value: string): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(value)
  );
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

export function renderDeliveryNote(note: DeliveryNote, searchDocNo: string): string {
  const lineRows = note.lines.length
    ? note.lines
        .map(
          (line, i) => `
          <tr>
            <td class="numeric">${i + 1}</td>
            <td class="mono">${line.productCode}</td>
            <td>${line.productName}</td>
            <td class="numeric">${line.quantity.toLocaleString("ja-JP")}</td>
            <td>${line.unit}</td>
            <td class="numeric">${formatCurrency(line.unitPrice)}</td>
            <td class="numeric">${formatCurrency(line.amount)}</td>
          </tr>
        `
        )
        .join("")
    : `<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>`;

  const subtotal = note.totalAmount - note.taxAmount;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">納品書</p>
        <h1>納品書作成・印刷</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="delivery-print" onclick="window.print()">印刷する</button>
      </div>
    </section>

    <section class="panel filter-panel no-print">
      <div class="filter-grid">
        <label class="field">
          <span>伝票番号</span>
          <input id="delivery-docno" type="text" placeholder="D240122" value="${searchDocNo}" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="delivery-search">呼出し</button>
        </div>
      </div>
    </section>

    <article class="panel delivery-note-body" id="delivery-print-area">
      <div class="delivery-header">
        <div class="delivery-to">
          <p class="delivery-address">${note.customerAddress}</p>
          <h2 class="delivery-customer">${note.customerName} 御中</h2>
          <p class="delivery-label-large">納　品　書</p>
        </div>
        <div class="delivery-meta">
          <table class="delivery-meta-table">
            <tr><th>伝票番号</th><td class="mono">${note.documentNo}</td></tr>
            <tr><th>納品日</th><td>${formatDate(note.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${formatCurrency(note.totalAmount)}（税込）</td></tr>
          </table>
          <p class="delivery-company">
            金井酒造店<br />
            〒000-0000 〇〇県〇〇市〇〇<br />
            TEL: 000-000-0000
          </p>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="numeric">No.</th>
              <th>商品コード</th>
              <th>商品名</th>
              <th class="numeric">数量</th>
              <th>単位</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
            </tr>
          </thead>
          <tbody>${lineRows}</tbody>
        </table>
      </div>

      <div class="delivery-footer">
        <div class="delivery-totals">
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${formatCurrency(subtotal)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${formatCurrency(note.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${formatCurrency(note.totalAmount)}</span></div>
        </div>
        ${note.note ? `<p class="delivery-note-text">備考：${note.note}</p>` : ""}
      </div>
    </article>
  `;
}
