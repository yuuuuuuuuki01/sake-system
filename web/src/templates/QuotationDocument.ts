import type {
  PrintCompanyInfo,
  PrintDocumentData,
  PrintOptions
} from "./printTypes";
import { calculateTotals, formatJpDate, formatYen } from "./printTypes";

// 見積書 — 縦A4が基本
export function renderQuotation(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  opts: PrintOptions
): string {
  const { subtotal, taxAmount, total } = calculateTotals(data.lines, data.taxRate);

  const rows = data.lines
    .map(
      (line, i) => `
      <tr>
        <td class="q-num">${i + 1}</td>
        <td class="q-name">${line.productName}${line.spec ? ` <span class="q-spec">${line.spec}</span>` : ""}</td>
        <td class="q-qty numeric">${line.quantity.toLocaleString("ja-JP")}</td>
        ${opts.showUnit ? `<td class="q-unit">${line.unit}</td>` : ""}
        <td class="q-price numeric">${formatYen(line.unitPrice)}</td>
        <td class="q-amount numeric">${formatYen(line.amount)}</td>
      </tr>
    `
    )
    .join("");

  const filler = Array.from({ length: Math.max(0, 6 - data.lines.length) })
    .map(
      () => `
      <tr class="q-filler">
        <td></td><td></td><td></td>
        ${opts.showUnit ? "<td></td>" : ""}
        <td></td><td></td>
      </tr>
    `
    )
    .join("");

  return `
    <div class="print-page quotation ${opts.fontSize}">
      <div class="q-masthead">
        <h1>御見積書</h1>
      </div>

      <div class="q-header">
        <div class="q-to">
          ${data.customerPostalCode ? `<p class="q-postal">〒${data.customerPostalCode}</p>` : ""}
          ${data.customerAddress ? `<p>${data.customerAddress}</p>` : ""}
          <p class="q-to-name">${data.customerName} ${data.customerHonorific}</p>
          ${data.title ? `<p class="q-title">件名: ${data.title}</p>` : ""}
        </div>
        <div class="q-meta">
          <table class="q-meta-table">
            <tr><th>見積番号</th><td class="mono">${data.documentNo}</td></tr>
            <tr><th>見積日</th><td>${formatJpDate(data.documentDate)}</td></tr>
            ${data.expireDate ? `<tr><th>有効期限</th><td>${formatJpDate(data.expireDate)}</td></tr>` : ""}
          </table>
        </div>
      </div>

      <div class="q-total-box">
        <div class="q-total-label">御見積金額</div>
        <div class="q-total-value">${formatYen(total)}（税込）</div>
      </div>

      <p class="q-intro">下記の通りお見積り申し上げます。</p>

      <table class="q-table">
        <thead>
          <tr>
            <th class="q-num">No</th>
            <th class="q-name">品名・規格</th>
            <th class="q-qty">数量</th>
            ${opts.showUnit ? "<th class='q-unit'>単位</th>" : ""}
            <th class="q-price">単価</th>
            <th class="q-amount">金額</th>
          </tr>
        </thead>
        <tbody>${rows}${filler}</tbody>
        <tfoot>
          <tr>
            <td colspan="${opts.showUnit ? 4 : 3}"></td>
            <th class="q-right">小計</th>
            <td class="numeric">${formatYen(subtotal)}</td>
          </tr>
          <tr>
            <td colspan="${opts.showUnit ? 4 : 3}"></td>
            <th class="q-right">消費税 (${Math.round(data.taxRate * 100)}%)</th>
            <td class="numeric">${formatYen(taxAmount)}</td>
          </tr>
          <tr class="q-grand">
            <td colspan="${opts.showUnit ? 4 : 3}"></td>
            <th class="q-right">合計</th>
            <td class="numeric">${formatYen(total)}</td>
          </tr>
        </tfoot>
      </table>

      ${opts.showRemarks && data.remarks ? `<div class="q-remarks"><p class="q-label">備考</p><p>${data.remarks}</p></div>` : ""}

      <div class="q-footer">
        <div class="q-from">
          <p class="q-from-name">${company.name}</p>
          <p>〒${company.postalCode}</p>
          <p>${company.address1}${company.address2 ? ` ${company.address2}` : ""}</p>
          <p>TEL: ${company.tel}　FAX: ${company.fax}</p>
          ${opts.showRegistrationNo ? `<p class="mono">登録番号: ${company.registrationNo}</p>` : ""}
        </div>
        ${opts.showSeal ? (company.sealImageUrl ? `<img class="q-seal" src="${company.sealImageUrl}" alt="印" />` : '<div class="q-seal-placeholder">印</div>') : ""}
      </div>
    </div>
  `;
}
