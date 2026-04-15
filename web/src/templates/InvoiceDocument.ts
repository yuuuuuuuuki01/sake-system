import type {
  PrintCompanyInfo,
  PrintDocumentData,
  PrintOptions
} from "./printTypes";
import { calculateTotals, formatJpDate, formatYen } from "./printTypes";

// 請求書（月次）— freee風モダンテンプレート
// 特徴: 適格請求書対応、振込先、前月残高・入金を含めた集計、インボイス登録番号表示
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
        <td style="color:#636e72;font-size:9pt;">${line.note ?? ""}</td>
        <td>${line.productName}${line.spec ? ` <span style="color:#636e72;font-size:9pt;">/ ${line.spec}</span>` : ""}</td>
        <td class="numeric">${line.quantity.toLocaleString("ja-JP")}</td>
        ${opts.showUnit ? `<td>${line.unit}</td>` : ""}
        <td class="numeric">${formatYen(line.unitPrice)}</td>
        <td class="numeric">${formatYen(line.amount)}</td>
      </tr>
    `
    )
    .join("");

  const filler = Array.from({ length: Math.max(0, 6 - data.lines.length) })
    .map(
      () => `
      <tr class="freee-empty">
        <td></td><td></td><td></td>${opts.showUnit ? "<td></td>" : ""}<td></td><td></td>
      </tr>
    `
    )
    .join("");

  return `
    <div class="print-page invoice-freee ${opts.fontSize}">
      <!-- ヘッダー -->
      <div class="freee-header">
        <div>
          <h1 class="freee-title">御 請 求 書</h1>
          <p class="freee-doc-no">No. ${data.documentNo}</p>
        </div>
        <div class="freee-from">
          <p class="freee-company-name">${company.name}</p>
          <p>〒${company.postalCode}</p>
          <p>${company.address1}${company.address2 ? ` ${company.address2}` : ""}</p>
          <p>TEL: ${company.tel}　FAX: ${company.fax}</p>
          ${opts.showRegistrationNo ? `<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${company.registrationNo}</span></p>` : ""}
          ${
            opts.showSeal
              ? `<div class="freee-seal-wrap">${company.sealImageUrl ? `<img src="${company.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />` : '<div class="freee-seal-placeholder">印</div>'}</div>`
              : ""
          }
        </div>
      </div>

      <!-- 宛先 -->
      <div class="freee-to">
        ${data.customerPostalCode ? `<p class="freee-to-postal">〒${data.customerPostalCode}</p>` : ""}
        ${data.customerAddress ? `<p class="freee-to-addr">${data.customerAddress}</p>` : ""}
        <div class="freee-to-name">${data.customerName} ${data.customerHonorific}</div>
      </div>

      <!-- 日付 -->
      <dl class="freee-meta">
        <div><dt>請求日</dt><dd>${formatJpDate(data.documentDate)}</dd></div>
        ${data.dueDate ? `<div><dt>お支払期限</dt><dd>${formatJpDate(data.dueDate)}</dd></div>` : ""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${data.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${formatYen(billTotal)}</span>
          <span class="freee-total-tax">（税込）</span>
        </div>
      </div>

      <!-- 明細 -->
      <table class="freee-table">
        <thead>
          <tr>
            <th>日付 / 摘要</th>
            <th>品目</th>
            <th class="numeric">数量</th>
            ${opts.showUnit ? "<th>単位</th>" : ""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${rows}${filler}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${
            opts.showRegistrationNo
              ? `
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(data.taxRate * 100)}%対象: ${formatYen(subtotal)} / 消費税: ${formatYen(taxAmount)}</p>
            </div>`
              : ""
          }
        </div>
        <table class="freee-summary-table">
          ${prevBalance ? `<tr><th>前回御請求額</th><td>${formatYen(prevBalance)}</td></tr>` : ""}
          ${paymentAmount ? `<tr><th>ご入金額</th><td>▲ ${formatYen(paymentAmount)}</td></tr>` : ""}
          <tr><th>今回御請求 小計</th><td>${formatYen(subtotal)}</td></tr>
          <tr><th>消費税 (${Math.round(data.taxRate * 100)}%)</th><td>${formatYen(taxAmount)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${formatYen(billTotal)}</td></tr>
        </table>
      </div>

      <!-- 振込先 -->
      ${
        opts.showBankInfo
          ? `
        <div class="freee-bank">
          <h3>お振込先</h3>
          <p><strong>${company.bankName}</strong> ${company.bankBranch}　${company.bankAccountType} ${company.bankAccountNo}</p>
          <p>口座名義: ${company.bankAccountHolder}</p>
          <p class="freee-bank-note">※ お振込手数料はお客様にてご負担くださいますようお願い申し上げます。</p>
        </div>`
          : ""
      }

      <!-- 備考 -->
      ${
        opts.showRemarks && data.remarks
          ? `
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${data.remarks.replace(/\n/g, "<br />")}</p>
        </div>`
          : ""
      }
    </div>
  `;
}
