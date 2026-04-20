import type { MasterCustomer, MasterProduct } from "../api";

export interface QuoteLine {
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

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
  taxRate: 10
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

export function renderQuoteBuilder(
  quote: QuoteState,
  customers: MasterCustomer[],
  products: MasterProduct[],
  customerQuery: string,
  productQuery: string
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

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">見積作成</p>
        <h1>見積書</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote">保存</button>
        <button class="button secondary" type="button" data-action="print-quote">印刷</button>
      </div>
    </section>

    <section class="panel">
      <div class="quote-header-grid">
        <div class="form-row">
          <label>見積番号</label>
          <input type="text" id="q-no" value="${quote.quoteNo}" placeholder="自動採番" />
        </div>
        <div class="form-row">
          <label>見積日</label>
          <input type="date" id="q-date" value="${quote.quoteDate}" />
        </div>
        <div class="form-row">
          <label>有効期限</label>
          <input type="date" id="q-valid" value="${quote.validUntil}" />
        </div>
        <div class="form-row">
          <label>件名</label>
          <input type="text" id="q-subject" value="${quote.subject}" placeholder="御見積の件" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${customerQuery}" placeholder="得意先名またはコードで検索" />
      </div>
      ${filteredCustomers.length > 0 ? `
        <div class="search-results">
          ${filteredCustomers.map((c) => `
            <button class="search-item" type="button" data-select-customer="${c.code}" data-cust-name="${c.name}" data-cust-addr="${c.address1 || ""}">
              <span class="mono">${c.code}</span> ${c.name}
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${quote.customerName ? `
        <div class="selected-item">
          <span class="mono">${quote.customerCode}</span> <strong>${quote.customerName}</strong>
          ${quote.customerAddress ? `<br/><span style="color:var(--text-secondary);font-size:13px;">${quote.customerAddress}</span>` : ""}
        </div>
      ` : ""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${productQuery}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${filteredProducts.length > 0 ? `
        <div class="search-results">
          ${filteredProducts.map((p) => `
            <button class="search-item" type="button" data-add-product="${p.code}" data-prod-name="${p.name}" data-prod-price="${p.salePrice || 0}">
              <span class="mono">${p.code}</span> ${p.name} <span class="numeric">${p.salePrice ? formatCurrency(p.salePrice) : ""}</span>
            </button>
          `).join("")}
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
                <td>${line.productName}</td>
                <td class="numeric"><input type="number" class="qty-input" data-line-idx="${i}" value="${line.quantity}" min="0" style="width:60px;text-align:right;" /></td>
                <td>${line.unit}</td>
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
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="2">${quote.remarks}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${formatCurrency(subtotal)}</span></div>
          <div><span>消費税(${quote.taxRate}%)</span><span class="numeric">${formatCurrency(tax)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${formatCurrency(total)}</span></div>
        </div>
      </div>
    </section>
  `;
}
