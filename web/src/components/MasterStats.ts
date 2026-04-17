import type { MasterCustomer, MasterProduct, MasterStatsSummary, MasterTab } from "../api";

export interface MasterFilterState {
  query: string;
  businessType: string;
  areaCode: string;
  activeOnly: string;
  page: number;
}

export const defaultMasterFilter: MasterFilterState = {
  query: "",
  businessType: "",
  areaCode: "",
  activeOnly: "",
  page: 1
};

const PAGE_SIZE = 50;

export function filterCustomers(
  customers: MasterCustomer[],
  filter: MasterFilterState
): { filtered: MasterCustomer[]; paged: MasterCustomer[]; totalPages: number } {
  let filtered = customers;

  if (filter.query) {
    const q = filter.query.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        (c.kanaName && c.kanaName.toLowerCase().includes(q)) ||
        (c.address1 && c.address1.toLowerCase().includes(q)) ||
        (c.phone && c.phone.toLowerCase().includes(q))
    );
  }

  if (filter.businessType) {
    filtered = filtered.filter((c) => c.businessType === filter.businessType);
  }

  if (filter.areaCode) {
    filtered = filtered.filter((c) => c.areaCode === filter.areaCode);
  }

  if (filter.activeOnly === "active") {
    filtered = filtered.filter((c) => c.isActive);
  } else if (filter.activeOnly === "inactive") {
    filtered = filtered.filter((c) => !c.isActive);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(filter.page, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  return { filtered, paged, totalPages };
}

function renderPagination(total: number, page: number, totalPages: number): string {
  if (totalPages <= 1) {
    return `<div class="master-pagination"><span>${total}件</span></div>`;
  }

  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  const pages: string[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
      pages.push(
        `<button class="button ${i === page ? "primary" : "secondary"}" type="button" data-action="master-page" data-page="${i}" style="min-width:36px;padding:4px 8px;">${i}</button>`
      );
    } else if (i === page - 3 || i === page + 3) {
      pages.push(`<span style="padding:0 4px;color:var(--text-secondary);">…</span>`);
    }
  }

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${total.toLocaleString("ja-JP")}件中 ${start}-${end} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${page - 1}" ${page <= 1 ? "disabled" : ""} style="padding:4px 10px;">←</button>
        ${pages.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${page + 1}" ${page >= totalPages ? "disabled" : ""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `;
}

function renderFilterBar(customers: MasterCustomer[], filter: MasterFilterState): string {
  const businessTypes = [...new Set(customers.map((c) => c.businessType).filter(Boolean))].sort();
  const areaCodes = [...new Set(customers.map((c) => c.areaCode).filter(Boolean))].sort();

  return `
    <div style="display:flex;gap:8px;align-items:end;flex-wrap:wrap;padding:12px 0;">
      <div class="form-group" style="flex:1;min-width:200px;">
        <label class="form-label">検索</label>
        <input type="text" id="master-search" class="form-input" placeholder="コード・名前・カナ・住所・電話" value="${filter.query}">
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">業態</label>
        <select id="master-business-type" class="form-input">
          <option value="">すべて</option>
          ${businessTypes.map((bt) => `<option value="${bt}" ${filter.businessType === bt ? "selected" : ""}>${bt}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${areaCodes.map((ac) => `<option value="${ac}" ${filter.areaCode === ac ? "selected" : ""}>${ac}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">状態</label>
        <select id="master-active-only" class="form-input">
          <option value="" ${!filter.activeOnly ? "selected" : ""}>すべて</option>
          <option value="active" ${filter.activeOnly === "active" ? "selected" : ""}>有効のみ</option>
          <option value="inactive" ${filter.activeOnly === "inactive" ? "selected" : ""}>停止のみ</option>
        </select>
      </div>
      <button class="button primary" type="button" data-action="master-filter" style="height:36px;">絞り込む</button>
    </div>
  `;
}

function truncate(text: string, maxLen: number): string {
  if (!text || text.length <= maxLen) return text || "";
  return text.slice(0, maxLen) + "…";
}

function renderCustomerRows(customers: MasterCustomer[]): string {
  return customers
    .map(
      (customer) => `
        <tr>
          <td class="mono">${customer.code}</td>
          <td>${customer.kanaName || ""}</td>
          <td>${customer.name}</td>
          <td>${customer.phone || ""}</td>
          <td class="mono">${customer.postalCode || ""}</td>
          <td title="${customer.address1 || ""}">${truncate(customer.address1 || "", 20)}</td>
          <td>${customer.areaCode || ""}</td>
          <td>${customer.staffCode || ""}</td>
          <td class="mono">${customer.priceGroup || ""}</td>
          <td class="numeric">${customer.closingDay ? customer.closingDay + "日" : ""}</td>
          <td><span class="status-pill ${customer.isActive ? "success" : "neutral"}">${customer.isActive ? "有効" : "停止"}</span></td>
        </tr>
      `
    )
    .join("");
}

function renderProductRows(products: MasterProduct[]): string {
  return products
    .map(
      (product) => `
        <tr>
          <td class="mono">${product.code}</td>
          <td class="mono">${product.janCode}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td><span class="status-pill ${product.isActive ? "success" : "neutral"}">${product.isActive ? "有効" : "停止"}</span></td>
        </tr>
      `
    )
    .join("");
}

export function renderMasterStats(
  summary: MasterStatsSummary,
  activeTab: MasterTab,
  filter: MasterFilterState = defaultMasterFilter
): string {
  const { filtered, paged, totalPages } = filterCustomers(summary.customers, filter);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">マスタ</p>
        <h1>得意先・商品マスタ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先</p>
        <p class="kpi-value">${summary.summary.customerCount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">有効 ${summary.summary.activeCustomerCount.toLocaleString("ja-JP")} 件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品</p>
        <p class="kpi-value">${summary.summary.productCount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">有効 ${summary.summary.activeProductCount.toLocaleString("ja-JP")} 件</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header tabs-header">
        <div>
          <h2>マスタ一覧</h2>
          <p class="panel-caption">業務確認用の基本統計</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
          <div class="tab-group">
            <button class="tab-button ${activeTab === "customers" ? "active" : ""}" data-tab="customers">得意先一覧</button>
            <button class="tab-button ${activeTab === "products" ? "active" : ""}" data-tab="products">商品一覧</button>
          </div>
        </div>
      </div>
      ${
        activeTab === "customers"
          ? `
        ${renderFilterBar(summary.customers, filter)}
        ${renderPagination(filtered.length, filter.page, totalPages)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>カナ</th>
                <th>得意先名</th>
                <th>電話番号</th>
                <th>〒</th>
                <th>住所</th>
                <th>地区</th>
                <th>担当</th>
                <th>単価G</th>
                <th class="numeric">締日</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${renderCustomerRows(paged)}</tbody>
          </table>
        </div>
        ${renderPagination(filtered.length, filter.page, totalPages)}
      `
          : `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>商品コード</th>
                <th>JAN</th>
                <th>商品名</th>
                <th>カテゴリ</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${renderProductRows(summary.products)}</tbody>
          </table>
        </div>
      `
      }
    </section>
  `;
}
