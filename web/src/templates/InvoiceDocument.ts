import type {
  PrintCompanyInfo,
  PrintDocumentData,
  PrintOptions
} from "./printTypes";
import { calculateTotals, formatJpDate, formatYen } from "./printTypes";

// 請求書（月次） — 適格請求書対応、振込先付き
export function renderInvoiceDocument(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  opts: PrintOptions
): string {
  const { subtotal, taxAmount, total } = calculateTotals(data.lines, data.taxRate);
  const prevBalance = data.previousBalance ?? 0;
  const paymentAmount = data.paymentAmount ?? 0;
  const billTotal = prevBalance - paymentAmount + total;

  const rows = data.lines
    .map(
      (line) => `
      <tr>
        <td>${line.note ?? ""}</td>
        <td class="inv-name">${line.productName}${line.spec ? ` <span class="inv-spec">${line.spec}</span>` : ""}</td>
        <td class="inv-qty numeric">${line.quantity.toLocaleString("ja-JP")}</td>
        ${opts.showUnit ? `<td class="inv-unit">${line.unit}</td>` : ""}
        <td class="inv-price numeric">${formatYen(line.unitPrice)}</td>
        <td class="inv-amount numeric">${formatYen(line.amount)}</td>
      </tr>
    `
    )
    .join("");

  const filler = Array.from({ length: Math.max(0, 8 - data.lines.length) })
    .map(
      () => `
      <tr class="inv-filler">
        <td></td><td></td><td></td>
        ${opts.showUnit ? "<td></td>" : ""}
        <td></td><td></td>
      </tr>
    `
    )
    .join("");

  return `
    <div class="print-page invoice-doc ${opts.fontSize}">
      <div class="inv-masthead">
        <h1>請　求　書</h1>
        <p class="inv-sub mono">No. ${data.documentNo}</p>
      </div>

      <div class="inv-header">
        <div class="inv-to">
          ${data.customerPostalCode ? `<p>〒${data.customerPostalCode}</p>` : ""}
          ${data.customerAddress ? `<p>${data.customerAddress}</p>` : ""}
          <h2 class="inv-to-name">${data.customerName} ${data.customerHonorific}</h2>
        </div>
        <div class="inv-meta">
          <table class="inv-meta-table">
            <tr><th>請求日</th><td>${formatJpDate(data.documentDate)}</td></tr>
            ${data.dueDate ? `<tr><th>お支払期限</th><td>${formatJpDate(data.dueDate)}</td></tr>` : ""}
          </table>
        </div>
      </div>

      <div class="inv-amount-box">
        <div class="inv-amount-label">ご請求金額</div>
        <div class="inv-amount-value">${formatYen(billTotal)}（税込）</div>
      </div>

      <p class="inv-intro">下記の通りご請求申し上げます。</p>

      <table class="inv-table">
        <thead>
          <tr>
            <th>日付/摘要</th>
            <th class="inv-name">品名・規格</th>
            <th class="inv-qty">数量</th>
            ${opts.showUnit ? "<th class='inv-unit'>単位</th>" : ""}
            <th class="inv-price">単価</th>
            <th class="inv-amount">金額</th>
          </tr>
        </thead>
        <tbody>${rows}${filler}</tbody>
      </table>

      <div class="inv-summary">
        <table class="inv-summary-table">
          ${prevBalance ? `<tr><th>前回御請求額</th><td class="numeric">${formatYen(prevBalance)}</td></tr>` : ""}
          ${paymentAmount ? `<tr><th>ご入金額</th><td class="numeric">▲ ${formatYen(paymentAmount)}</td></tr>` : ""}
          <tr><th>今回ご請求額 (小計)</th><td class="numeric">${formatYen(subtotal)}</td></tr>
          <tr><th>消費税 (${Math.round(data.taxRate * 100)}%)</th><td class="numeric">${formatYen(taxAmount)}</td></tr>
          <tr class="inv-grand"><th>合計請求額</th><td class="numeric">${formatYen(billTotal)}</td></tr>
        </table>
      </div>

      ${
        opts.showBankInfo
          ? `
      <div class="inv-bank">
        <h3>お振込先</h3>
        <p>${company.bankName} ${company.bankBranch}　${company.bankAccountType} ${company.bankAccountNo}</p>
        <p>口座名義: ${company.bankAccountHolder}</p>
        <p class="inv-note">※ お振込手数料はお客様ご負担でお願いいたします。</p>
      </div>
      `
          : ""
      }

      ${opts.showRemarks && data.remarks ? `<div class="inv-remarks"><h3>備考</h3><p>${data.remarks}</p></div>` : ""}

      <div class="inv-footer">
        <div class="inv-from">
          <p class="inv-from-name">${company.name}</p>
          <p>〒${company.postalCode}</p>
          <p>${company.address1}${company.address2 ? ` ${company.address2}` : ""}</p>
          <p>TEL: ${company.tel}　FAX: ${company.fax}</p>
          ${opts.showRegistrationNo ? `<p class="mono">登録番号: ${company.registrationNo}</p>` : ""}
        </div>
        ${opts.showSeal ? (company.sealImageUrl ? `<img class="inv-seal" src="${company.sealImageUrl}" alt="印" />` : '<div class="inv-seal-placeholder">印</div>') : ""}
      </div>
    </div>
  `;
}
