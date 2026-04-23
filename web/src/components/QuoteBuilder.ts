import type { MasterCustomer, MasterProduct, CustomerPricing } from "../api";
import { resolveProductPrice } from "../api";

export interface QuoteLine {
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface QuoteSealSettings {
  imageDataUrl: string;
  size: number; // px
}

export interface QuoteFieldConfig {
  showQuoteNo: boolean;
  showValidUntil: boolean;
  showSubject: boolean;
  showDeliveryDate: boolean;
  showPaymentTerms: boolean;
  showDeliveryPlace: boolean;
  showRemarks: boolean;
  showSeal: boolean;
  headerNote: string;
  footerNote: string;
}

export const defaultFieldConfig: QuoteFieldConfig = {
  showQuoteNo: true,
  showValidUntil: true,
  showSubject: true,
  showDeliveryDate: false,
  showPaymentTerms: true,
  showDeliveryPlace: false,
  showRemarks: true,
  showSeal: true,
  headerNote: "",
  footerNote: ""
};

export interface QuoteState {
  quoteNo: string;
  quoteDate: string;
  validUntil: string;
  customerCode: string;
  customerName: string;
  customerAddress: string;
  subject: string;
  lines: QuoteLine[];
  remarks: string;
  taxRate: number;
  deliveryDate: string;
  paymentTerms: string;
  deliveryPlace: string;
  previewMode: boolean;
  sealSettings: QuoteSealSettings | null;
  fieldConfig: QuoteFieldConfig;
}

export const defaultQuoteState: QuoteState = {
  quoteNo: "",
  quoteDate: new Date().toISOString().slice(0, 10),
  validUntil: "",
  customerCode: "",
  customerName: "",
  customerAddress: "",
  subject: "",
  lines: [],
  remarks: "",
  taxRate: 10,
  deliveryDate: "",
  paymentTerms: "月末締め翌月末払い",
  deliveryPlace: "",
  previewMode: false,
  sealSettings: null,
  fieldConfig: { ...defaultFieldConfig }
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPreview(quote: QuoteState): string {
  const subtotal = quote.lines.reduce((s, l) => s + l.amount, 0);
  const tax = Math.round(subtotal * quote.taxRate / 100);
  const total = subtotal + tax;
  const cfg = quote.fieldConfig;

  const conditionRows: string[] = [];
  if (cfg.showValidUntil && quote.validUntil) conditionRows.push(`<tr><th>有効期限</th><td>${quote.validUntil}</td></tr>`);
  if (cfg.showDeliveryDate && quote.deliveryDate) conditionRows.push(`<tr><th>納期</th><td>${escapeHtml(quote.deliveryDate)}</td></tr>`);
  if (cfg.showPaymentTerms && quote.paymentTerms) conditionRows.push(`<tr><th>支払条件</th><td>${escapeHtml(quote.paymentTerms)}</td></tr>`);
  if (cfg.showDeliveryPlace && quote.deliveryPlace) conditionRows.push(`<tr><th>納品場所</th><td>${escapeHtml(quote.deliveryPlace)}</td></tr>`);

  return `
    <div class="quote-preview" id="quote-preview-area">
      <div class="quote-preview-inner">
        <h2 class="quote-preview-title">御 見 積 書</h2>

        <div class="quote-preview-meta">
          <div class="quote-preview-customer">
            <p class="quote-preview-customer-name">${escapeHtml(quote.customerName || "（得意先未選択）")} 御中</p>
            ${quote.customerAddress ? `<p class="quote-preview-addr">${escapeHtml(quote.customerAddress)}</p>` : ""}
          </div>
          <div class="quote-preview-info">
            ${cfg.showQuoteNo && quote.quoteNo ? `<p>No. ${escapeHtml(quote.quoteNo)}</p>` : ""}
            <p>${quote.quoteDate}</p>
            <p class="quote-preview-company">金井酒造店</p>
            <p class="quote-preview-company-sub">〒259-1205 神奈川県平塚市土屋2556</p>
            <p class="quote-preview-company-sub">TEL 0463-58-0006</p>
            ${cfg.showSeal && quote.sealSettings?.imageDataUrl ? `
              <div class="quote-preview-seal">
                <img src="${quote.sealSettings.imageDataUrl}" alt="社印" style="width:${quote.sealSettings.size}px;height:${quote.sealSettings.size}px;" />
              </div>
            ` : ""}
          </div>
        </div>

        ${cfg.headerNote ? `<p class="quote-preview-note">${escapeHtml(cfg.headerNote)}</p>` : ""}

        ${cfg.showSubject && quote.subject ? `<p class="quote-preview-subject">件名: ${escapeHtml(quote.subject)}</p>` : ""}

        <div class="quote-preview-total-banner">
          <span>合計金額</span>
          <span class="quote-preview-total-value">${formatCurrency(total)}（税込）</span>
        </div>

        <table class="quote-preview-table">
          <thead>
            <tr>
              <th style="width:40px;">No.</th>
              <th>品名</th>
              <th style="width:60px;">数量</th>
              <th style="width:40px;">単位</th>
              <th style="width:90px;">単価</th>
              <th style="width:100px;">金額</th>
            </tr>
          </thead>
          <tbody>
            ${quote.lines.map((line, i) => `
              <tr>
                <td style="text-align:center;">${i + 1}</td>
                <td>${escapeHtml(line.productName)}</td>
                <td style="text-align:right;">${line.quantity.toLocaleString()}</td>
                <td style="text-align:center;">${escapeHtml(line.unit)}</td>
                <td style="text-align:right;">${formatCurrency(line.unitPrice)}</td>
                <td style="text-align:right;">${formatCurrency(line.amount)}</td>
              </tr>
            `).join("")}
            ${quote.lines.length === 0 ? `<tr><td colspan="6" style="text-align:center;padding:20px;color:#999;">明細なし</td></tr>` : ""}
          </tbody>
          <tfoot>
            <tr><td colspan="5" style="text-align:right;font-weight:700;">小計</td><td style="text-align:right;">${formatCurrency(subtotal)}</td></tr>
            <tr><td colspan="5" style="text-align:right;">消費税(${quote.taxRate}%)</td><td style="text-align:right;">${formatCurrency(tax)}</td></tr>
            <tr class="quote-preview-total-row"><td colspan="5" style="text-align:right;font-weight:700;">合計</td><td style="text-align:right;font-weight:700;">${formatCurrency(total)}</td></tr>
          </tfoot>
        </table>

        ${conditionRows.length > 0 ? `
          <table class="quote-preview-conditions">
            ${conditionRows.join("")}
          </table>
        ` : ""}

        ${cfg.showRemarks && quote.remarks ? `
          <div class="quote-preview-remarks">
            <p class="quote-preview-remarks-label">備考</p>
            <p>${escapeHtml(quote.remarks).replace(/\n/g, "<br/>")}</p>
          </div>
        ` : ""}

        ${cfg.footerNote ? `<p class="quote-preview-footer-note">${escapeHtml(cfg.footerNote)}</p>` : ""}
      </div>
    </div>
  `;
}

function renderFieldSettings(cfg: QuoteFieldConfig): string {
  const toggle = (key: keyof QuoteFieldConfig, label: string, checked: boolean) => `
    <label class="quote-field-toggle">
      <input type="checkbox" data-field-toggle="${key}" ${checked ? "checked" : ""} />
      <span>${label}</span>
    </label>
  `;

  return `
    <section class="panel">
      <div class="panel-header"><h2>表示項目設定</h2></div>
      <div class="quote-field-grid">
        ${toggle("showQuoteNo", "見積番号", cfg.showQuoteNo)}
        ${toggle("showValidUntil", "有効期限", cfg.showValidUntil)}
        ${toggle("showSubject", "件名", cfg.showSubject)}
        ${toggle("showDeliveryDate", "納期", cfg.showDeliveryDate)}
        ${toggle("showPaymentTerms", "支払条件", cfg.showPaymentTerms)}
        ${toggle("showDeliveryPlace", "納品場所", cfg.showDeliveryPlace)}
        ${toggle("showRemarks", "備考", cfg.showRemarks)}
        ${toggle("showSeal", "社印", cfg.showSeal)}
      </div>
      <div class="quote-notes-grid" style="margin-top:12px;">
        <div class="form-row">
          <label>ヘッダーメモ（見積書上部に表示）</label>
          <input type="text" id="q-header-note" value="${escapeHtml(cfg.headerNote)}" placeholder="例: 下記のとおりお見積り申し上げます" />
        </div>
        <div class="form-row">
          <label>フッターメモ（見積書���部に表示）</label>
          <input type="text" id="q-footer-note" value="${escapeHtml(cfg.footerNote)}" placeholder="例: 本見積書に関するご不明点はお気軽にお問合せください" />
        </div>
      </div>
    </section>
  `;
}

function renderSealSettings(seal: QuoteSealSettings | null): string {
  return `
    <section class="panel">
      <div class="panel-header"><h2>社印設定</h2></div>
      <div class="quote-seal-area">
        ${seal?.imageDataUrl ? `
          <div class="quote-seal-preview">
            <img src="${seal.imageDataUrl}" alt="社印プレビュー" style="width:${seal.size}px;height:${seal.size}px;" />
          </div>
          <div class="quote-seal-controls">
            <label>サイズ: <input type="range" id="q-seal-size" min="40" max="120" value="${seal.size}" style="width:120px;" /> ${seal.size}px</label>
            <button class="button secondary small" type="button" data-action="remove-seal">削除</button>
          </div>
        ` : `
          <p style="color:var(--text-secondary);font-size:13px;">社印画像（PNG推奨、透過背景）をアップロー��してください。</p>
        `}
        <div class="quote-seal-upload">
          <label class="button secondary" style="cursor:pointer;">
            画像を選択
            <input type="file" id="q-seal-file" accept="image/png,image/jpeg,image/gif" style="display:none;" />
          </label>
        </div>
      </div>
    </section>
  `;
}

export function renderQuoteBuilder(
  quote: QuoteState,
  customers: MasterCustomer[],
  products: MasterProduct[],
  customerQuery: string,
  productQuery: string,
  pricing?: CustomerPricing | null
): string {
  const subtotal = quote.lines.reduce((s, l) => s + l.amount, 0);
  const tax = Math.round(subtotal * quote.taxRate / 100);
  const total = subtotal + tax;

  const filteredCustomers = customerQuery.length >= 1
    ? customers.filter((c) => c.name.includes(customerQuery) || c.code.includes(customerQuery)).slice(0, 8)
    : [];

  const filteredProducts = productQuery.length >= 1
    ? products.filter((p) => p.name.includes(productQuery) || p.code.includes(productQuery)).slice(0, 8)
    : [];

  const cfg = quote.fieldConfig;

  // Preview mode
  if (quote.previewMode) {
    return `
      <section class="page-head">
        <div>
          <p class="eyebrow">見積作成</p>
          <h1>見積書プレビュー</h1>
        </div>
        <div class="meta-stack">
          <button class="button secondary" type="button" data-action="quote-edit-mode">← 編集に戻る</button>
          <button class="button primary" type="button" data-action="quote-download-pdf">PDF ダウンロード</button>
        </div>
      </section>
      ${renderPreview(quote)}
    `;
  }

  // Edit mode
  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">見積作成</p>
        <h1>見積書</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote">保存</button>
        <button class="button secondary" type="button" data-action="quote-preview-mode">プレビュー</button>
        <button class="button secondary" type="button" data-action="quote-download-pdf">PDF</button>
      </div>
    </section>

    <section class="panel">
      <div class="quote-header-grid">
        ${cfg.showQuoteNo ? `
        <div class="form-row">
          <label>見積番号</label>
          <input type="text" id="q-no" value="${escapeHtml(quote.quoteNo)}" placeholder="自動採番" />
        </div>` : ""}
        <div class="form-row">
          <label>見積日</label>
          <input type="date" id="q-date" value="${quote.quoteDate}" />
        </div>
        ${cfg.showValidUntil ? `
        <div class="form-row">
          <label>有効期限</label>
          <input type="date" id="q-valid" value="${quote.validUntil}" />
        </div>` : ""}
        ${cfg.showSubject ? `
        <div class="form-row">
          <label>件名</label>
          <input type="text" id="q-subject" value="${escapeHtml(quote.subject)}" placeholder="御見積の件" />
        </div>` : ""}
        ${cfg.showDeliveryDate ? `
        <div class="form-row">
          <label>納期</label>
          <input type="text" id="q-delivery-date" value="${escapeHtml(quote.deliveryDate)}" placeholder="例: 受注後2週間" />
        </div>` : ""}
        ${cfg.showPaymentTerms ? `
        <div class="form-row">
          <label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${escapeHtml(quote.paymentTerms)}" placeholder="月末締め翌月末���い" />
        </div>` : ""}
        ${cfg.showDeliveryPlace ? `
        <div class="form-row">
          <label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${escapeHtml(quote.deliveryPlace)}" placeholder="例: 貴社指定場所" />
        </div>` : ""}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${escapeHtml(customerQuery)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${filteredCustomers.length > 0 ? `
        <div class="search-results">
          ${filteredCustomers.map((c) => `
            <button class="search-item" type="button" data-select-customer="${c.code}" data-cust-name="${escapeHtml(c.name)}" data-cust-addr="${escapeHtml(c.address1 || "")}">
              <span class="mono">${c.code}</span> ${escapeHtml(c.name)}
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${quote.customerName ? `
        <div class="selected-item">
          <span class="mono">${quote.customerCode}</span> <strong>${escapeHtml(quote.customerName)}</strong>
          ${quote.customerAddress ? `<br/><span style="color:var(--text-secondary);font-size:13px;">${escapeHtml(quote.customerAddress)}</span>` : ""}
        </div>
      ` : ""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${escapeHtml(productQuery)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${filteredProducts.length > 0 ? `
        <div class="search-results">
          ${filteredProducts.map((p) => {
            const resolved = pricing ? resolveProductPrice(p, pricing) : { price: p.salePrice || 0, label: "標準価格" };
            const isSpecial = resolved.label !== "標準価格";
            return `
            <button class="search-item" type="button" data-add-product="${p.code}" data-prod-name="${escapeHtml(p.name)}" data-prod-price="${resolved.price}">
              <span class="mono">${p.code}</span> ${escapeHtml(p.name)}
              <span class="numeric" ${isSpecial ? 'style="color:#2f855a;font-weight:700;"' : ""}>${resolved.price ? formatCurrency(resolved.price) : ""} <small>(${resolved.label})</small></span>
            </button>`;
          }).join("")}
        </div>
      ` : ""}

      <div class="table-wrap" style="margin-top:12px;">
        <table>
          <thead>
            <tr>
              <th>商品コード</th>
              <th>商品名</th>
              <th class="numeric">数量</th>
              <th>単位</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${quote.lines.map((line, i) => `
              <tr>
                <td class="mono">${line.productCode}</td>
                <td>${escapeHtml(line.productName)}</td>
                <td class="numeric"><input type="number" class="qty-input" data-line-idx="${i}" value="${line.quantity}" min="0" style="width:60px;text-align:right;" /></td>
                <td>${escapeHtml(line.unit)}</td>
                <td class="numeric"><input type="number" class="price-input" data-line-idx="${i}" value="${line.unitPrice}" min="0" style="width:80px;text-align:right;" /></td>
                <td class="numeric">${formatCurrency(line.amount)}</td>
                <td><button class="button secondary small" data-remove-line="${i}">×</button></td>
              </tr>
            `).join("")}
            ${quote.lines.length === 0 ? `<tr><td colspan="7" style="text-align:center;color:var(--text-secondary);padding:24px;">商品を検索して追加してください</td></tr>` : ""}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        ${cfg.showRemarks ? `
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="2">${escapeHtml(quote.remarks)}</textarea>
        </div>` : ""}
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${formatCurrency(subtotal)}</span></div>
          <div><span>消費税(${quote.taxRate}%)</span><span class="numeric">${formatCurrency(tax)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${formatCurrency(total)}</span></div>
        </div>
      </div>
    </section>

    ${renderFieldSettings(cfg)}
    ${renderSealSettings(quote.sealSettings)}
  `;
}

/** Generate PDF by opening a print-ready window */
export function generateQuotePdf(quote: QuoteState): void {
  const preview = renderPreview(quote);
  const printWindow = window.open("", "_blank", "width=800,height=1100");
  if (!printWindow) { alert("ポップアップがブロックされました。許可してください。"); return; }

  printWindow.document.write(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<title>見積書 ${quote.quoteNo || ""}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif; font-size: 12px; line-height: 1.6; padding: 20mm; color: #1a1a1a; }
  .quote-preview-inner { max-width: 700px; margin: 0 auto; }
  .quote-preview-title { text-align: center; font-size: 22px; letter-spacing: 0.5em; margin-bottom: 24px; border-bottom: 2px solid #1a1a1a; padding-bottom: 8px; }
  .quote-preview-meta { display: flex; justify-content: space-between; margin-bottom: 20px; }
  .quote-preview-customer { flex: 1; }
  .quote-preview-customer-name { font-size: 16px; font-weight: 700; border-bottom: 1px solid #1a1a1a; padding-bottom: 4px; margin-bottom: 4px; }
  .quote-preview-addr { font-size: 11px; color: #444; }
  .quote-preview-info { text-align: right; font-size: 11px; }
  .quote-preview-company { font-weight: 700; font-size: 13px; margin-top: 8px; }
  .quote-preview-company-sub { font-size: 10px; color: #444; }
  .quote-preview-seal { margin-top: 8px; text-align: right; }
  .quote-preview-seal img { border-radius: 50%; }
  .quote-preview-note { font-size: 11px; margin-bottom: 12px; }
  .quote-preview-subject { font-size: 13px; font-weight: 700; margin-bottom: 12px; }
  .quote-preview-total-banner { display: flex; justify-content: space-between; align-items: center; background: #f5f5f5; border: 1px solid #ccc; padding: 8px 16px; margin-bottom: 16px; font-size: 14px; }
  .quote-preview-total-value { font-size: 18px; font-weight: 700; }
  .quote-preview-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  .quote-preview-table th, .quote-preview-table td { border: 1px solid #999; padding: 6px 8px; font-size: 11px; }
  .quote-preview-table th { background: #f0f0f0; font-weight: 700; text-align: center; }
  .quote-preview-table tfoot td { border-top: 2px solid #666; }
  .quote-preview-total-row td { font-weight: 700; border-top: 2px solid #333; }
  .quote-preview-conditions { width: 50%; border-collapse: collapse; margin-bottom: 16px; }
  .quote-preview-conditions th, .quote-preview-conditions td { border: 1px solid #ccc; padding: 4px 8px; font-size: 11px; }
  .quote-preview-conditions th { background: #f8f8f8; width: 100px; }
  .quote-preview-remarks { margin-top: 12px; padding: 8px; border: 1px solid #ddd; background: #fafafa; font-size: 11px; }
  .quote-preview-remarks-label { font-weight: 700; margin-bottom: 4px; }
  .quote-preview-footer-note { margin-top: 16px; font-size: 10px; color: #666; }
  @media print { body { padding: 10mm; } }
</style>
</head>
<body>
${preview}
<script>
  window.onload = function() { window.print(); };
</script>
</body>
</html>`);
  printWindow.document.close();
}
