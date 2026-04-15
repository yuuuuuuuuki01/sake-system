import type { PayableRecord, PurchaseRecord } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function renderPurchase(purchases: PurchaseRecord[], payables: PayableRecord[]): string {
  const purchaseStatusLabel: Record<PurchaseRecord["status"], string> = {
    pending: "未確定",
    confirmed: "確定",
    paid: "支払済"
  };

  const purchaseStatusClass: Record<PurchaseRecord["status"], string> = {
    pending: "warning",
    confirmed: "neutral",
    paid: "success"
  };

  const payableStatusLabel: Record<PayableRecord["status"], string> = {
    unpaid: "未払い",
    partial: "一部支払",
    paid: "支払済"
  };

  const payableStatusClass: Record<PayableRecord["status"], string> = {
    unpaid: "warning",
    partial: "neutral",
    paid: "success"
  };

  const purchaseRows = purchases
    .map(
      (p) => `
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${formatCurrency(p.unitPrice)}</td>
        <td class="numeric"><strong>${formatCurrency(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${purchaseStatusClass[p.status]}">${purchaseStatusLabel[p.status]}</span>
        </td>
      </tr>
    `
    )
    .join("");

  const payableRows = payables
    .map(
      (p) => `
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${formatCurrency(p.totalPurchase)}</td>
        <td class="numeric">${formatCurrency(p.paidAmount)}</td>
        <td class="numeric"><strong>${formatCurrency(p.balance)}</strong></td>
        <td>${p.nextPaymentDate || "―"}</td>
        <td>
          <span class="status-pill ${payableStatusClass[p.status]}">${payableStatusLabel[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status === "paid" ? "disabled" : ""}>支払処理</button>
        </td>
      </tr>
    `
    )
    .join("");

  const totalPurchase = purchases.reduce((s, p) => s + p.amount, 0);
  const totalBalance = payables.reduce((s, p) => s + p.balance, 0);
  const unpaidCount = payables.filter((p) => p.status !== "paid").length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>仕入伝票・買掛管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="purchase-new">＋ 仕入入力</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">今月仕入合計</p>
        <p class="kpi-value">${formatCurrency(totalPurchase)}</p>
        <p class="kpi-sub">${purchases.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${formatCurrency(totalBalance)}</p>
        <p class="kpi-sub">未払い ${unpaidCount} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>仕入伝票一覧</h2>
        <p class="panel-caption">${purchases.length} 件</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>伝票番号</th>
              <th>仕入日</th>
              <th>仕入先コード</th>
              <th>仕入先名</th>
              <th>品目</th>
              <th class="numeric">数量</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>${purchaseRows || `<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>`}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>買掛残高一覧</h2>
        <p class="panel-caption">${payables.length} 社</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>仕入先コード</th>
              <th>仕入先名</th>
              <th class="numeric">仕入総額</th>
              <th class="numeric">支払済</th>
              <th class="numeric">残高</th>
              <th>次回支払日</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${payableRows || `<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}
