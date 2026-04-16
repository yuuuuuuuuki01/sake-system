import type { ShopifyOrder } from "../api";

export function renderShopifyOrders(orders: ShopifyOrder[], lastSync: string | null): string {
  const totalAmount = orders.reduce((s, o) => s + o.totalAmount, 0);
  const paidCount = orders.filter((o) => o.financialStatus === "paid").length;
  const unfulfilled = orders.filter((o) => o.fulfillmentStatus !== "fulfilled" && o.fulfillmentStatus !== "shipped").length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">Shopify</p>
        <h1>EC注文 (Shopify連動)</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="shopify-sync">🔄 今すぐ同期</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">注文数</p>
        <p class="kpi-value">${orders.length}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">売上合計</p>
        <p class="kpi-value">¥${totalAmount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">支払済 ${paidCount}件</p>
      </article>
      <article class="panel kpi-card ${unfulfilled > 0 ? "kpi-alert" : ""}">
        <p class="panel-title">未発送</p>
        <p class="kpi-value">${unfulfilled}件</p>
        <p class="kpi-sub">出荷待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value" style="font-size:14px;">${lastSync ? lastSync.slice(0, 16).replace("T", " ") : "未同期"}</p>
        <p class="kpi-sub">Shopify Admin API</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>注文一覧</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>注文番号</th>
              <th>受注日時</th>
              <th>顧客</th>
              <th class="numeric">金額</th>
              <th>支払</th>
              <th>配送</th>
              <th>商品</th>
            </tr>
          </thead>
          <tbody>
            ${orders.length === 0 ? '<tr><td colspan="7" class="empty-row">注文がありません。「今すぐ同期」を押してください。</td></tr>' : ""}
            ${orders
              .map(
                (o) => `
              <tr>
                <td class="mono">${o.orderNumber}</td>
                <td>${o.orderDate.slice(0, 16).replace("T", " ")}</td>
                <td>${o.customerName}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${o.customerEmail}</span></td>
                <td class="numeric">¥${o.totalAmount.toLocaleString("ja-JP")}</td>
                <td>
                  <span class="status-pill ${o.financialStatus === "paid" ? "success" : "warning"}">${o.financialStatus}</span>
                </td>
                <td>
                  <span class="status-pill ${o.fulfillmentStatus === "fulfilled" || o.fulfillmentStatus === "shipped" ? "success" : "warning"}">${o.fulfillmentStatus || "未"}</span>
                </td>
                <td style="font-size:12px;">${o.lineItems.map((l) => `${l.name} ×${l.quantity}`).join("<br/>")}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}
