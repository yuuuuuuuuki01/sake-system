import type { MasterCustomer, MasterProduct, MasterStatsSummary, MasterTab } from "../api";

function renderCustomerRows(customers: MasterCustomer[]): string {
  return customers
    .map(
      (customer) => `
        <tr>
          <td class="mono">${customer.code}</td>
          <td>${customer.name}</td>
          <td class="numeric">${customer.closingDay}日</td>
          <td class="numeric">${customer.paymentDay}日</td>
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

export function renderMasterStats(summary: MasterStatsSummary, activeTab: MasterTab): string {
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
      <div class="table-wrap">
        ${
          activeTab === "customers"
            ? `
          <table>
            <thead>
              <tr>
                <th>得意先コード</th>
                <th>得意先名</th>
                <th class="numeric">締日</th>
                <th class="numeric">入金日</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${renderCustomerRows(summary.customers)}</tbody>
          </table>
        `
            : `
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
        `
        }
      </div>
    </section>
  `;
}
