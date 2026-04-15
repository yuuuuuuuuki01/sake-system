import type { PaymentRecord } from "../api";

function formatDate(value: string | null): string {
  if (!value) {
    return "-";
  }
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

const paymentLabel: Record<PaymentRecord["status"], string> = {
  unpaid: "未入金",
  partial: "一部入金",
  paid: "入金済"
};

export function renderPaymentStatus(records: PaymentRecord[]): string {
  const rows = records
    .map(
      (record) => `
        <tr>
          <td>
            <div class="table-title">${record.customerName}</div>
            <div class="table-sub mono">${record.customerCode}</div>
          </td>
          <td class="numeric">${formatCurrency(record.billedAmount)}</td>
          <td class="numeric">${formatCurrency(record.paymentAmount)}</td>
          <td class="numeric">${formatCurrency(record.balanceAmount)}</td>
          <td>${formatDate(record.lastPaymentDate)}</td>
          <td><span class="status-pill ${record.status === "paid" ? "success" : record.status === "partial" ? "warning" : "danger"}">${paymentLabel[record.status]}</span></td>
        </tr>
      `
    )
    .join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">入金状況</p>
        <h1>得意先別入金ステータス</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>請求残一覧</h2>
          <p class="panel-caption">未入金・一部入金を優先表示</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>得意先</th>
              <th class="numeric">請求額</th>
              <th class="numeric">入金額</th>
              <th class="numeric">請求残</th>
              <th>最終入金日</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}
