export type OrderStage = "new" | "picking" | "packed" | "shipped" | "delivered";

export interface WorkflowOrder {
  id: string;
  orderNo: string;
  customerName: string;
  customerCode?: string;
  orderDate: string;
  deliveryDate?: string;
  stage: OrderStage;
  totalAmount: number;
  itemCount: number;
  priority: "normal" | "urgent";
  staffName?: string;
  notes?: string;
}

const STAGE_CONFIG: Record<OrderStage, { label: string; color: string; icon: string }> = {
  new: { label: "新規受注", color: "#2196F3", icon: "📥" },
  picking: { label: "ピッキング中", color: "#FF9800", icon: "🔍" },
  packed: { label: "梱包完了", color: "#4CAF50", icon: "📦" },
  shipped: { label: "発送済", color: "#9C27B0", icon: "🚚" },
  delivered: { label: "配達完了", color: "#4CAF50", icon: "✅" }
};

export const ORDER_STAGES: OrderStage[] = ["new", "picking", "packed", "shipped", "delivered"];

export function renderOrderWorkflow(orders: WorkflowOrder[]): string {
  const byStage: Record<OrderStage, WorkflowOrder[]> = {
    new: [],
    picking: [],
    packed: [],
    shipped: [],
    delivered: []
  };
  orders.forEach((o) => byStage[o.stage].push(o));

  const columns = ORDER_STAGES.map((stage) => {
    const cfg = STAGE_CONFIG[stage];
    const items = byStage[stage];
    return `
      <div class="wf-col" data-wf-stage="${stage}">
        <div class="wf-col-header" style="--wf-color:${cfg.color};">
          <span class="wf-col-icon">${cfg.icon}</span>
          <span class="wf-col-label">${cfg.label}</span>
          <span class="wf-col-count">${items.length}</span>
        </div>
        <div class="wf-col-body">
          ${
            items.length === 0
              ? '<div class="wf-empty">―</div>'
              : items
                  .map(
                    (o) => `
            <div class="wf-card ${o.priority === "urgent" ? "wf-urgent" : ""}" data-wf-order="${o.id}" draggable="true">
              <div class="wf-card-header">
                <span class="wf-card-no mono">${o.orderNo}</span>
                ${o.priority === "urgent" ? '<span class="wf-card-priority">🔥 急</span>' : ""}
              </div>
              <div class="wf-card-customer">${o.customerName}</div>
              <div class="wf-card-meta">
                <span>📅 ${o.orderDate}</span>
                ${o.deliveryDate ? `<span>🚚 ${o.deliveryDate}</span>` : ""}
              </div>
              <div class="wf-card-footer">
                <span>${o.itemCount}品</span>
                <strong>¥${o.totalAmount.toLocaleString("ja-JP")}</strong>
              </div>
              ${o.staffName ? `<div class="wf-card-staff">👤 ${o.staffName}</div>` : ""}
            </div>
          `
                  )
                  .join("")
          }
        </div>
      </div>
    `;
  }).join("");

  const totalAmount = orders.reduce((s, o) => s + o.totalAmount, 0);
  const urgentCount = orders.filter((o) => o.priority === "urgent").length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">受注管理</p>
        <h1>受注ワークフロー</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="wf-new-order">＋ 新規受注</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">進行中受注</p>
        <p class="kpi-value">${orders.filter((o) => o.stage !== "delivered").length}件</p>
        <p class="kpi-sub">処理待ち</p>
      </article>
      <article class="panel kpi-card ${urgentCount > 0 ? "kpi-alert" : ""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${urgentCount}件</p>
        <p class="kpi-sub">当日出荷</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">¥${totalAmount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">今表示分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${byStage.delivered.length}件</p>
        <p class="kpi-sub">配達済</p>
      </article>
    </section>

    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">
        カードを<b>ドラッグして次の段階へ移動</b>できます。急ぎマークは🔥で強調。
      </p>
      <div class="wf-board">
        ${columns}
      </div>
    </section>
  `;
}
