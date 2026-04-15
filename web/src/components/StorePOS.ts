import type { StoreOrder, StoreSale } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function renderStorePOS(
  sales: StoreSale[],
  orders: StoreOrder[],
  activeTab: "pos" | "orders",
  salesDate: string
): string {
  const paymentLabel: Record<StoreSale["paymentMethod"], string> = {
    cash: "現金",
    card: "カード",
    paypay: "PayPay",
    other: "その他"
  };

  const orderStatusLabel: Record<StoreOrder["status"], string> = {
    new: "新規",
    processing: "処理中",
    shipped: "発送済",
    delivered: "配達済"
  };

  const orderStatusClass: Record<StoreOrder["status"], string> = {
    new: "warning",
    processing: "neutral",
    shipped: "success",
    delivered: "success"
  };

  const salesRows = sales
    .map(
      (s) => `
      <tr>
        <td>${s.saleTime}</td>
        <td class="mono">${s.productCode}</td>
        <td>${s.productName}</td>
        <td class="numeric">${s.quantity}</td>
        <td class="numeric">${formatCurrency(s.unitPrice)}</td>
        <td class="numeric"><strong>${formatCurrency(s.amount)}</strong></td>
        <td>${paymentLabel[s.paymentMethod]}</td>
      </tr>
    `
    )
    .join("");

  const orderRows = orders
    .map(
      (o) => `
      <tr>
        <td class="mono">${o.orderNo}</td>
        <td>${o.orderDate}</td>
        <td>${o.customerName}</td>
        <td>${o.postalCode} ${o.address}</td>
        <td>${o.items.map((i) => `${i.productName} ×${i.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${formatCurrency(o.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${orderStatusClass[o.status]}">${orderStatusLabel[o.status]}</span>
        </td>
        <td>${o.shippingDate || "―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${o.id}">詳細</button>
        </td>
      </tr>
    `
    )
    .join("");

  const totalSales = sales.reduce((s, item) => s + item.amount, 0);
  const newOrderCount = orders.filter((o) => o.status === "new").length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${formatCurrency(totalSales)}</p>
        <p class="kpi-sub">${sales.length} 件 / ${salesDate}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${newOrderCount} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">${orders.length} 件</p>
        <p class="kpi-sub">宅配・通販</p>
      </article>
    </section>

    <section class="panel">
      <div class="tab-bar">
        <button class="tab-btn ${activeTab === "pos" ? "active" : ""}" data-store-tab="pos">直売所レジ</button>
        <button class="tab-btn ${activeTab === "orders" ? "active" : ""}" data-store-tab="orders">受注・宅配</button>
      </div>

      ${
        activeTab === "pos"
          ? `
        <div class="panel-header">
          <div>
            <h2>直売所販売履歴</h2>
          </div>
          <label class="field" style="display:flex;align-items:center;gap:8px">
            <span style="white-space:nowrap">販売日</span>
            <input id="store-date" type="date" value="${salesDate}" style="width:160px" />
            <button class="button secondary" data-action="store-load">表示</button>
          </label>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>時刻</th>
                <th>商品コード</th>
                <th>商品名</th>
                <th class="numeric">数量</th>
                <th class="numeric">単価</th>
                <th class="numeric">金額</th>
                <th>支払方法</th>
              </tr>
            </thead>
            <tbody>${salesRows || `<tr><td colspan="7" class="empty-row">販売データがありません。</td></tr>`}</tbody>
          </table>
        </div>
        `
          : `
        <div class="panel-header">
          <h2>受注・宅配一覧</h2>
          <button class="button secondary" data-action="order-new">＋ 受注登録</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>注文番号</th>
                <th>受注日</th>
                <th>お客様名</th>
                <th>住所</th>
                <th>商品</th>
                <th class="numeric">合計</th>
                <th>状態</th>
                <th>発送日</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${orderRows || `<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>`}</tbody>
          </table>
        </div>
        `
      }
    </section>
  `;
}
