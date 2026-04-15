import type {
  PrintCompanyInfo,
  PrintDocumentData,
  PrintOptions
} from "./printTypes";
import { calculateTotals, formatJpDate, formatYen } from "./printTypes";

// チェーンストア伝票 — 大手小売向けの標準フォーマット
// 4行目に品名、数量・単価・金額がコンパクトに並ぶ横長レイアウト
export function renderChainStoreSlip(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  opts: PrintOptions
): string {
  const { subtotal, taxAmount, total } = calculateTotals(data.lines, data.taxRate);

  const rows = data.lines
    .map(
      (line, i) => `
      <tr>
        <td class="cs-num">${i + 1}</td>
        <td class="cs-code mono">${line.productCode}</td>
        ${opts.showJanCode ? `<td class="mono">${line.janCode ?? ""}</td>` : ""}
        <td class="cs-name">${line.productName}${line.spec ? ` ${line.spec}` : ""}</td>
        <td class="cs-qty numeric">${line.quantity.toLocaleString("ja-JP")}</td>
        ${opts.showUnit ? `<td class="cs-unit">${line.unit}</td>` : ""}
        <td class="cs-price numeric">${formatYen(line.unitPrice)}</td>
        <td class="cs-amount numeric">${formatYen(line.amount)}</td>
      </tr>
    `
    )
    .join("");

  // 空行で埋めて罫線感を出す（行数調整）
  const filler = Array.from({ length: Math.max(0, 8 - data.lines.length) })
    .map(
      () => `
      <tr class="cs-filler">
        <td></td><td></td>
        ${opts.showJanCode ? "<td></td>" : ""}
        <td></td><td></td>
        ${opts.showUnit ? "<td></td>" : ""}
        <td></td><td></td>
      </tr>
    `
    )
    .join("");

  return `
    <div class="print-page chain-store ${opts.fontSize}">
      <div class="cs-header">
        <div class="cs-title">
          <h1>チェーンストア伝票</h1>
          <p class="cs-sub">伝票番号: <span class="mono">${data.documentNo}</span></p>
        </div>
        <div class="cs-date">
          <div><label>納品日</label><span>${formatJpDate(data.documentDate)}</span></div>
        </div>
      </div>

      <div class="cs-parties">
        <div class="cs-to">
          <p class="cs-label">納品先</p>
          ${data.customerPostalCode ? `<p class="cs-postal">〒${data.customerPostalCode}</p>` : ""}
          ${data.customerAddress ? `<p>${data.customerAddress}</p>` : ""}
          <p class="cs-to-name">${data.customerName} ${data.customerHonorific}</p>
          ${data.customerCode ? `<p class="cs-code-line mono">取引先CD: ${data.customerCode}</p>` : ""}
        </div>
        <div class="cs-from">
          <p class="cs-from-name">${company.name}</p>
          <p>〒${company.postalCode}</p>
          <p>${company.address1}${company.address2 ? ` ${company.address2}` : ""}</p>
          <p>TEL: ${company.tel}　FAX: ${company.fax}</p>
          ${opts.showRegistrationNo ? `<p class="mono">登録番号: ${company.registrationNo}</p>` : ""}
          ${opts.showSeal && company.sealImageUrl ? `<img class="cs-seal" src="${company.sealImageUrl}" alt="印" />` : opts.showSeal ? '<div class="cs-seal-placeholder">印</div>' : ""}
        </div>
      </div>

      <table class="cs-table">
        <thead>
          <tr>
            <th class="cs-num">No</th>
            <th class="cs-code">商品CD</th>
            ${opts.showJanCode ? "<th>JAN</th>" : ""}
            <th class="cs-name">品名・規格</th>
            <th class="cs-qty">数量</th>
            ${opts.showUnit ? "<th class='cs-unit'>単位</th>" : ""}
            <th class="cs-price">単価</th>
            <th class="cs-amount">金額</th>
          </tr>
        </thead>
        <tbody>${rows}${filler}</tbody>
      </table>

      <div class="cs-totals">
        <div class="cs-total-row"><span>小計</span><span class="numeric">${formatYen(subtotal)}</span></div>
        <div class="cs-total-row"><span>消費税（${Math.round(data.taxRate * 100)}%）</span><span class="numeric">${formatYen(taxAmount)}</span></div>
        <div class="cs-total-row cs-total-main"><span>合計</span><span class="numeric">${formatYen(total)}</span></div>
      </div>

      ${opts.showRemarks && data.remarks ? `<div class="cs-remarks"><p class="cs-label">備考</p><p>${data.remarks}</p></div>` : ""}

      <div class="cs-footer">
        <div class="cs-sign-box"><label>検印</label></div>
        <div class="cs-sign-box"><label>受領印</label></div>
        <div class="cs-sign-box"><label>担当</label></div>
      </div>
    </div>
  `;
}
