import type { MasterCustomer, MasterProduct, CustomerPricing } from "../api";
import { resolveProductPrice } from "../api";
import type { QuoteCompanySettings } from "./QuoteSettings";

export type QuoteTemplateType = "sake" | "standard";

export interface QuoteLine {
  productCode: string;
  productName: string;
  janCode: string;
  caseQty: number | null;
  quantity: number;
  unit: string;
  unitPrice: number;   // 納入価格
  retailPrice: number | null; // 希望小売価格
  amount: number;
}

export interface QuoteState {
  id: string | null;      // null = new quote
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
  templateType: QuoteTemplateType;
  previewMode: boolean;
}

function defaultValidUntil(): string {
  const d = new Date();
  // Last day of month 2 months from now: new Date(y, m+3, 0)
  const last = new Date(d.getFullYear(), d.getMonth() + 3, 0);
  return last.toISOString().slice(0, 10);
}

export function makeDefaultQuoteState(settings?: QuoteCompanySettings): QuoteState {
  return {
    id: null,
    quoteNo: "",
    quoteDate: new Date().toISOString().slice(0, 10),
    validUntil: defaultValidUntil(),
    customerCode: "",
    customerName: "",
    customerAddress: "",
    subject: "",
    lines: [],
    remarks: "",
    taxRate: 10,
    deliveryDate: "",
    paymentTerms: settings?.defaultPaymentTerms ?? "月末締め翌月末払い",
    deliveryPlace: "",
    templateType: "sake",
    previewMode: false
  };
}

// Keep the old export name for backwards compat
export const defaultQuoteState: QuoteState = makeDefaultQuoteState();

function esc(v: string): string {
  return (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function fmt(n: number): string {
  return "¥" + n.toLocaleString("ja-JP");
}
function fmtDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
}

// ─── Color helpers ────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function toHex(r: number, g: number, b: number): string {
  return "#" + [r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
}
function lighten(hex: string, amount: number): string {
  const [r,g,b] = hexToRgb(hex);
  return toHex(r+(255-r)*amount, g+(255-g)*amount, b+(255-b)*amount);
}
function darken(hex: string, amount: number): string {
  const [r,g,b] = hexToRgb(hex);
  return toHex(r*(1-amount), g*(1-amount), b*(1-amount));
}

function makeDocCss(accent: string): string {
  const accentDark    = darken(accent, 0.15);
  const accentLight   = lighten(accent, 0.88);
  const accentMidTint = lighten(accent, 0.96);
  const sellerBg      = lighten(accent, 0.94);
  const sellerBorder  = lighten(accent, 0.62);
  return `
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:11px; color:#1a1a2e; padding:16mm 18mm; }
.q-doc { max-width: 720px; margin: 0 auto; }
.q-title-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; border-bottom:3px solid ${accent}; padding-bottom:8px; }
.q-title { font-size:20px; font-weight:700; letter-spacing:0.3em; color:${accent}; }
.q-meta-table { font-size:10px; border-collapse:collapse; }
.q-meta-table th { text-align:right; padding:1px 6px 1px 0; color:#555; white-space:nowrap; }
.q-meta-table td { font-weight:600; }
.q-parties { display:flex; justify-content:space-between; gap:16px; margin-bottom:14px; }
.q-customer { flex:1; }
.q-customer-name { font-size:16px; font-weight:700; border-bottom:1px solid #333; padding-bottom:3px; margin-bottom:3px; }
.q-customer-addr { font-size:10px; color:#555; }
.q-seller { width:195px; background:${sellerBg}; border:1px solid ${sellerBorder}; border-radius:4px; padding:10px 12px 10px 12px; font-size:10px; min-height:90px; }
.q-seller-name { font-size:13px; font-weight:700; margin-bottom:4px; }
.q-seller-sub { color:#444; margin-top:1px; }
.q-regno { color:#777; font-size:9px; }
.q-total-banner { display:flex; justify-content:space-between; align-items:center; background:${accent}; color:white; padding:10px 16px; border-radius:4px; margin-bottom:14px; }
.q-total-label { font-size:12px; }
.q-total-amount { font-size:20px; font-weight:700; }
.q-subject { font-size:12px; font-weight:600; margin-bottom:8px; }
.q-note { font-size:10px; color:#555; margin-bottom:10px; }
.q-items { width:100%; border-collapse:collapse; margin-bottom:12px; font-size:10px; }
.q-items th { background:${accent}; color:white; padding:5px 6px; font-weight:600; text-align:center; border:1px solid ${accentDark}; }
.q-items td { padding:4px 6px; border:1px solid #d0d8e8; }
.q-items tbody tr:nth-child(even) td { background:${accentMidTint}; }
.q-items tfoot td { padding:4px 6px; border:1px solid #d0d8e8; }
.q-total-row td { font-weight:700; font-size:12px; background:${accentLight}; border-top:2px solid ${accent}; }
.q-conditions { width:55%; border-collapse:collapse; margin-bottom:12px; font-size:10px; }
.q-conditions th { background:#f0f0f0; padding:4px 8px; text-align:left; border:1px solid #ccc; width:90px; font-weight:600; }
.q-conditions td { padding:4px 8px; border:1px solid #ccc; }
.q-remarks { border:1px solid #ddd; padding:8px; font-size:10px; margin-bottom:10px; border-radius:3px; }
.q-remarks-label { font-weight:700; margin-bottom:3px; }
.q-footer-note { font-size:9px; color:#777; margin-bottom:8px; }
.billing-box { border-top:1px solid #e0e0e0; padding-top:8px; font-size:10px; color:#555; line-height:1.6; }
@media print { body { padding:10mm 12mm; } }
`;
}

// ─── freee-style document HTML ────────────────────────────────────────────────

function renderDocHtml(quote: QuoteState, settings: QuoteCompanySettings): string {
  const subtotal = quote.lines.reduce((s, l) => s + l.amount, 0);
  const tax = Math.round(subtotal * quote.taxRate / 100);
  const total = subtotal + tax;
  const isSake = quote.templateType === "sake";

  const sakeHeaders = isSake
    ? `<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>`
    : "";
  const headColspan = isSake ? 9 : 6;

  const lineRows = quote.lines.map((l, i) => {
    const sakeColsSake = isSake
      ? `<td style="font-size:9px;">${esc(l.janCode)}</td><td style="text-align:center;">${l.caseQty ?? ""}</td><td style="text-align:right;">${l.retailPrice != null ? fmt(l.retailPrice) : ""}</td>`
      : "";
    return `<tr>
      <td style="text-align:center;">${i+1}</td>
      <td class="mono" style="font-size:9px;">${esc(l.productCode)}</td>
      <td>${esc(l.productName)}</td>
      ${sakeColsSake}
      <td style="text-align:right;">${l.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${esc(l.unit)}</td>
      <td style="text-align:right;">${fmt(l.unitPrice)}</td>
      <td style="text-align:right;">${fmt(l.amount)}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="${headColspan}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`;

  const conditions: string[] = [];
  if (quote.validUntil) conditions.push(`<tr><th>有効期限</th><td>${fmtDate(quote.validUntil)}</td></tr>`);
  if (quote.paymentTerms) conditions.push(`<tr><th>支払条件</th><td>${esc(quote.paymentTerms)}</td></tr>`);
  if (quote.deliveryDate) conditions.push(`<tr><th>納期</th><td>${esc(quote.deliveryDate)}</td></tr>`);
  if (quote.deliveryPlace) conditions.push(`<tr><th>納品場所</th><td>${esc(quote.deliveryPlace)}</td></tr>`);

  const billingSection = (settings.billingName || settings.billingAddress) ? `
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【請求書送付先】</p>
      ${settings.billingPostal ? `<p>〒${esc(settings.billingPostal)}</p>` : ""}
      ${settings.billingAddress ? `<p>${esc(settings.billingAddress)}</p>` : ""}
      ${settings.billingName ? `<p>${esc(settings.billingName)}</p>` : ""}
    </div>
  ` : "";

  const sealHtml = settings.sealImageDataUrl ? `
    <div style="position:absolute;right:0;top:0;">
      <img src="${settings.sealImageDataUrl}" style="width:${settings.sealSize}px;height:${settings.sealSize}px;border-radius:50%;opacity:0.9;" />
    </div>` : "";

  return `
<div class="q-doc">
  <div class="q-title-row">
    <h1 class="q-title">${isSake ? "御 見 積 書（酒販用）" : "御 見 積 書"}</h1>
    <table class="q-meta-table">
      ${quote.quoteNo ? `<tr><th>見積番号</th><td>${esc(quote.quoteNo)}</td></tr>` : ""}
      <tr><th>見積日</th><td>${fmtDate(quote.quoteDate)}</td></tr>
      ${quote.validUntil ? `<tr><th>有効期限</th><td>${fmtDate(quote.validUntil)}</td></tr>` : ""}
    </table>
  </div>

  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${esc(quote.customerName || "（得意先未選択）")} 御中</p>
      ${quote.customerAddress ? `<p class="q-customer-addr">${esc(quote.customerAddress)}</p>` : ""}
    </div>
    <div class="q-seller" style="position:relative;">
      ${sealHtml}
      <p class="q-seller-name">${esc(settings.companyName)}</p>
      ${settings.companyPostal ? `<p class="q-seller-sub">〒${esc(settings.companyPostal)}</p>` : ""}
      ${settings.companyAddress1 ? `<p class="q-seller-sub">${esc(settings.companyAddress1)}${settings.companyAddress2 ? " " + esc(settings.companyAddress2) : ""}</p>` : ""}
      ${settings.companyTel ? `<p class="q-seller-sub">TEL: ${esc(settings.companyTel)}</p>` : ""}
      ${settings.companyFax ? `<p class="q-seller-sub">FAX: ${esc(settings.companyFax)}</p>` : ""}
      ${settings.companyRegistrationNo ? `<p class="q-seller-sub q-regno">登録番号: ${esc(settings.companyRegistrationNo)}</p>` : ""}
    </div>
  </div>

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${fmt(total)}（税込）</span>
  </div>

  ${quote.subject ? `<p class="q-subject">件名：${esc(quote.subject)}</p>` : ""}
  ${settings.defaultHeaderNote ? `<p class="q-note">${esc(settings.defaultHeaderNote)}</p>` : ""}

  <table class="q-items">
    <thead>
      <tr>
        <th style="width:28px;">No.</th>
        <th style="width:60px;">品番</th>
        <th>品名</th>
        ${sakeHeaders}
        <th style="width:42px;">数量</th>
        <th style="width:32px;">単位</th>
        <th style="width:80px;">${isSake ? "納入価格" : "単価"}</th>
        <th style="width:90px;">金額</th>
      </tr>
    </thead>
    <tbody>${lineRows}</tbody>
    <tfoot>
      <tr><td colspan="${headColspan - 1}" style="text-align:right;">小計</td><td style="text-align:right;">${fmt(subtotal)}</td></tr>
      <tr><td colspan="${headColspan - 1}" style="text-align:right;">消費税(${quote.taxRate}%)</td><td style="text-align:right;">${fmt(tax)}</td></tr>
      <tr class="q-total-row"><td colspan="${headColspan - 1}" style="text-align:right;">合計</td><td style="text-align:right;">${fmt(total)}</td></tr>
    </tfoot>
  </table>

  ${conditions.length > 0 ? `<table class="q-conditions">${conditions.join("")}</table>` : ""}

  ${quote.remarks ? `<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${esc(quote.remarks).replace(/\n/g,"<br/>")}</p></div>` : ""}

  ${settings.defaultFooterNote ? `<p class="q-footer-note">${esc(settings.defaultFooterNote)}</p>` : ""}

  ${billingSection}
</div>`;
}


// ─── Edit-mode renderer ───────────────────────────────────────────────────────

export function renderQuoteBuilder(
  quote: QuoteState,
  customers: MasterCustomer[],
  products: MasterProduct[],
  customerQuery: string,
  productQuery: string,
  pricing: CustomerPricing | null | undefined,
  settings: QuoteCompanySettings
): string {
  const subtotal = quote.lines.reduce((s, l) => s + l.amount, 0);
  const tax = Math.round(subtotal * quote.taxRate / 100);
  const total = subtotal + tax;
  const isSake = quote.templateType === "sake";

  const filteredCustomers = customerQuery.length >= 1
    ? customers.filter(c => c.name.includes(customerQuery) || c.code.includes(customerQuery)).slice(0, 8)
    : [];
  const filteredProducts = productQuery.length >= 1
    ? products.filter(p => p.name.includes(productQuery) || p.code.includes(productQuery)).slice(0, 8)
    : [];

  if (quote.previewMode) {
    return `
      <section class="page-head">
        <div><p class="eyebrow">見積書</p><h1>プレビュー</h1></div>
        <div class="meta-stack">
          <button class="button secondary" type="button" data-action="quote-edit-mode">← 編集に戻る</button>
          <button class="button primary" type="button" data-action="quote-download-pdf">PDF ダウンロード</button>
          <button class="button secondary" type="button" data-action="save-quote">保存</button>
        </div>
      </section>
      <div style="background:white;border:1px solid #ddd;border-radius:6px;padding:24px;margin-top:8px;">
        ${renderDocHtml(quote, settings)}
      </div>
      <style>${makeDocCss(settings.accentColor || "#0968e5")}</style>
    `;
  }

  const sakeLineHeaders = isSake
    ? `<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:80px;">希望小売価格</th>`
    : "";

  const lineRows = quote.lines.map((line, i) => {
    const sakeCols = isSake ? `
      <td><input type="text" class="jan-input" data-line-idx="${i}" value="${esc(line.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${i}" value="${line.caseQty ?? ""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${i}" value="${line.retailPrice ?? ""}" min="0" style="width:75px;text-align:right;" /></td>
    ` : "";
    return `<tr>
      <td class="mono" style="font-size:11px;">${esc(line.productCode)}</td>
      <td>${esc(line.productName)}</td>
      ${sakeCols}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${i}" value="${line.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${esc(line.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${i}" value="${line.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${fmt(line.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${i}">×</button></td>
    </tr>`;
  }).join("") || `<tr><td colspan="${isSake ? 10 : 7}" style="text-align:center;color:var(--text-secondary);padding:20px;">商品を検索して追加</td></tr>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">見積書</p>
        <h1>${quote.id ? "見積編集" : "新規見積"}</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote">保存</button>
        <button class="button secondary" type="button" data-action="quote-preview-mode">プレビュー</button>
        <button class="button secondary" type="button" data-action="quote-download-pdf">PDF</button>
        <button class="button secondary" type="button" data-action="quote-back-list">← 一覧</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>基本情報</h2></div>
      <div class="form-grid-2">
        <div class="form-row"><label>テンプレート種別</label>
          <div style="display:flex;gap:12px;margin-top:4px;">
            <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="q-template" value="sake" ${quote.templateType === "sake" ? "checked" : ""} id="q-tpl-sake" /> 酒販用（JAN・希望小売価格あり）
            </label>
            <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="q-template" value="standard" ${quote.templateType === "standard" ? "checked" : ""} id="q-tpl-standard" /> 通常
            </label>
          </div>
        </div>
        <div class="form-row"><label>見積番号</label>
          <input type="text" id="q-no" value="${esc(quote.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${quote.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${quote.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${esc(quote.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${esc(quote.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${esc(quote.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${esc(quote.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${esc(customerQuery)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${filteredCustomers.length > 0 ? `<div class="search-results">${filteredCustomers.map(c => `
        <button class="search-item" type="button" data-select-customer="${c.code}" data-cust-name="${esc(c.name)}" data-cust-addr="${esc(c.address1 || "")}">
          <span class="mono">${c.code}</span> ${esc(c.name)}
        </button>`).join("")}</div>` : ""}
      ${quote.customerName ? `<div class="selected-item"><span class="mono">${esc(quote.customerCode)}</span> <strong>${esc(quote.customerName)}</strong>${quote.customerAddress ? `<br/><span style="color:var(--text-secondary);font-size:13px;">${esc(quote.customerAddress)}</span>` : ""}</div>` : ""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${esc(productQuery)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${filteredProducts.length > 0 ? `<div class="search-results">${filteredProducts.map(p => {
        const resolved = pricing ? resolveProductPrice(p, pricing) : { price: p.salePrice || 0, label: "標準価格" };
        const isSpecial = resolved.label !== "標準価格";
        return `<button class="search-item" type="button" data-add-product="${p.code}" data-prod-name="${esc(p.name)}" data-prod-price="${resolved.price}" data-prod-jan="${esc((p as any).janCode ?? "")}" data-prod-case="${(p as any).caseQty ?? ""}">
          <span class="mono">${p.code}</span> ${esc(p.name)}
          <span class="numeric" ${isSpecial ? 'style="color:#2f855a;font-weight:700;"' : ""}>${resolved.price ? fmt(resolved.price) : ""} <small>(${resolved.label})</small></span>
        </button>`;
      }).join("")}</div>` : ""}

      <div class="table-wrap" style="margin-top:10px;">
        <table>
          <thead>
            <tr>
              <th>品番</th><th>品名</th>
              ${isSake ? `<th>JANコード</th><th>入数</th><th class="numeric">希望小売価格</th>` : ""}
              <th class="numeric">数量</th><th>単位</th><th class="numeric">${isSake ? "納入価格" : "単価"}</th><th class="numeric">金額</th><th></th>
            </tr>
          </thead>
          <tbody>${lineRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${esc(quote.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${fmt(subtotal)}</span></div>
          <div><span>消費税(${quote.taxRate}%)</span><span class="numeric">${fmt(tax)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${fmt(total)}</span></div>
        </div>
      </div>
    </section>
  `;
}

export function generateQuotePdf(quote: QuoteState, settings: QuoteCompanySettings): void {
  const docHtml = renderDocHtml(quote, settings);
  const win = window.open("", "_blank", "width=860,height=1100");
  if (!win) { alert("ポップアップがブロックされました。許可してください。"); return; }
  win.document.write(`<!DOCTYPE html>
<html lang="ja"><head><meta charset="UTF-8" />
<title>見積書 ${quote.quoteNo || ""}</title>
<style>${makeDocCss(settings.accentColor || "#0968e5")}</style>
</head><body>${docHtml}
<script>window.onload=function(){window.print();}<\/script>
</body></html>`);
  win.document.close();
}

// Sync form values back to state before save/preview/pdf
export function syncQuoteFormToState(quote: QuoteState): void {
  const g = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value ?? "";
  quote.quoteNo       = g("q-no");
  quote.quoteDate     = g("q-date");
  quote.validUntil    = g("q-valid");
  quote.subject       = g("q-subject");
  quote.paymentTerms  = g("q-payment-terms");
  quote.deliveryDate  = g("q-delivery-date");
  quote.deliveryPlace = g("q-delivery-place");
  quote.remarks       = (document.getElementById("q-remarks") as HTMLTextAreaElement)?.value ?? "";
}
