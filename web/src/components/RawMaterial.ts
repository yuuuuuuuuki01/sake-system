import type { BillRecord, RawMaterialStock } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function renderRawMaterial(bills: BillRecord[], rawStock: RawMaterialStock[]): string {
  const billStatusLabel: Record<BillRecord["status"], string> = {
    holding: "保有中",
    due: "期日到来",
    cleared: "決済済"
  };

  const billStatusClass: Record<BillRecord["status"], string> = {
    holding: "neutral",
    due: "warning",
    cleared: "success"
  };

  const billRows = bills
    .map(
      (b) => `
      <tr>
        <td class="mono">${b.billNo}</td>
        <td>${b.supplierName}</td>
        <td class="numeric">${formatCurrency(b.amount)}</td>
        <td>${b.issueDate}</td>
        <td>${b.dueDate}</td>
        <td>
          <span class="status-pill ${billStatusClass[b.status]}">${billStatusLabel[b.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${b.id}" ${b.status === "cleared" ? "disabled" : ""}>詳細</button>
        </td>
      </tr>
    `
    )
    .join("");

  const stockRows = rawStock
    .map((r) => {
      const isLow = r.minimumStock > 0 && r.currentStock < r.minimumStock * 1.2;
      return `
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${isLow ? "text-danger" : ""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${isLow ? `<span class="status-pill warning" style="margin-left:4px">要補充</span>` : ""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${formatCurrency(r.unitCost)}</td>
          <td class="numeric">${formatCurrency(r.currentStock * r.unitCost)}</td>
          <td>${r.lastPurchaseDate}</td>
        </tr>
      `;
    })
    .join("");

  const holdingBills = bills.filter((b) => b.status === "holding");
  const holdingTotal = holdingBills.reduce((s, b) => s + b.amount, 0);
  const totalRawValue = rawStock.reduce((s, r) => s + r.currentStock * r.unitCost, 0);
  const lowStockCount = rawStock.filter(
    (r) => r.minimumStock > 0 && r.currentStock < r.minimumStock * 1.2
  ).length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${formatCurrency(holdingTotal)}</p>
        <p class="kpi-sub">${holdingBills.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${formatCurrency(totalRawValue)}</p>
        <p class="kpi-sub">要補充 ${lowStockCount} 品目</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>手形一覧</h2>
        <p class="panel-caption">${bills.length} 枚</p>
        <button class="button secondary" data-action="bill-new">＋ 手形登録</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>手形番号</th>
              <th>振出先</th>
              <th class="numeric">金額</th>
              <th>振出日</th>
              <th>支払期日</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${billRows || `<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>`}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>原料在庫</h2>
        <p class="panel-caption">${rawStock.length} 品目</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>品名</th>
              <th class="numeric">現在庫</th>
              <th class="numeric">最低在庫</th>
              <th class="numeric">単価</th>
              <th class="numeric">在庫金額</th>
              <th>最終仕入日</th>
            </tr>
          </thead>
          <tbody>${stockRows || `<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}
