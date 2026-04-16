import type { MasterCustomer, MasterProduct, NewInvoiceLine } from "../api";

export interface MobileOrderState {
  step: "customer" | "products" | "review" | "done";
  selectedCustomer: MasterCustomer | null;
  cart: NewInvoiceLine[];
  customerQuery: string;
  productQuery: string;
  memo: string;
  submittedDocNo: string | null;
}

export function renderMobileOrder(
  state: MobileOrderState,
  customers: MasterCustomer[],
  products: MasterProduct[]
): string {
  const cartTotal = state.cart.reduce((s, l) => s + l.amount, 0);
  const cartItems = state.cart.reduce((s, l) => s + l.quantity, 0);

  return `
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${cartItems}<br/>
          <strong>¥${cartTotal.toLocaleString("ja-JP")}</strong>
        </div>
      </header>

      <!-- ステップインジケーター -->
      <nav class="mo-steps">
        <button class="mo-step ${state.step === "customer" ? "active" : state.selectedCustomer ? "done" : ""}" data-mo-step="customer">
          <span class="mo-step-num">1</span>
          <span class="mo-step-label">顧客</span>
        </button>
        <button class="mo-step ${state.step === "products" ? "active" : state.cart.length > 0 ? "done" : ""}" data-mo-step="products"
          ${!state.selectedCustomer ? "disabled" : ""}>
          <span class="mo-step-num">2</span>
          <span class="mo-step-label">商品</span>
        </button>
        <button class="mo-step ${state.step === "review" ? "active" : ""}" data-mo-step="review"
          ${state.cart.length === 0 ? "disabled" : ""}>
          <span class="mo-step-num">3</span>
          <span class="mo-step-label">確認</span>
        </button>
      </nav>

      ${renderStep(state, customers, products)}
    </div>
  `;
}

function renderStep(
  state: MobileOrderState,
  customers: MasterCustomer[],
  products: MasterProduct[]
): string {
  if (state.step === "customer") {
    const q = state.customerQuery.toLowerCase();
    const filtered = q
      ? customers.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
      : customers.slice(0, 20);
    return `
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${state.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${filtered
            .slice(0, 30)
            .map(
              (c) => `
            <button class="mo-item ${state.selectedCustomer?.id === c.id ? "selected" : ""}" data-mo-select-customer="${c.id}">
              <div class="mo-item-title">${c.name}</div>
              <div class="mo-item-sub mono">${c.code}</div>
            </button>
          `
            )
            .join("")}
        </div>
      </section>
      ${
        state.selectedCustomer
          ? `<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>`
          : ""
      }
    `;
  }

  if (state.step === "products") {
    const q = state.productQuery.toLowerCase();
    const filtered = q
      ? products.filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      : products.slice(0, 30);
    return `
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${state.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${filtered
            .slice(0, 50)
            .map((p) => {
              const inCart = state.cart.find((l) => l.productCode === p.code);
              return `
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${p.name}</div>
                  <div class="mo-item-sub">${p.category} / JAN ${p.janCode || "―"}</div>
                </div>
                ${
                  inCart
                    ? `<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${p.code}">−</button>
                      <span>${inCart.quantity}</span>
                      <button data-mo-qty="+1" data-mo-product="${p.code}">+</button>
                    </div>`
                    : `<button class="button primary" data-mo-add-product="${p.code}">＋</button>`
                }
              </div>
            `;
            })
            .join("")}
        </div>
      </section>
      <div class="mo-footer">
        <button class="button secondary" data-mo-step="customer">◀ 戻る</button>
        <button class="button primary mo-next" data-mo-step="review" ${state.cart.length === 0 ? "disabled" : ""}>確認へ ▶</button>
      </div>
    `;
  }

  if (state.step === "review") {
    return `
      <section class="panel">
        <h2 style="margin-top:0;">確認</h2>
        <div class="mo-review-customer">
          <p class="mo-item-sub">お客様</p>
          <h3>${state.selectedCustomer?.name ?? "―"}</h3>
        </div>

        <div class="mo-review-items">
          ${state.cart
            .map(
              (l, i) => `
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${l.productName}</div>
                <div class="mo-item-sub">${l.quantity} × ¥${l.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${l.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${i}">✕</button>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${state.cart.reduce((s, l) => s + l.amount, 0).toLocaleString("ja-JP")}</strong>
        </div>

        <label class="field" style="margin-top:16px;">
          <span>メモ</span>
          <textarea id="mo-memo" rows="2" placeholder="配達希望・特記事項等">${state.memo}</textarea>
        </label>
      </section>

      <div class="mo-footer">
        <button class="button secondary" data-mo-step="products">◀ 戻る</button>
        <button class="button primary" data-action="mo-submit">受注を送信</button>
      </div>
    `;
  }

  return `
    <section class="panel" style="text-align:center;padding:40px 20px;">
      <div style="font-size:48px;">✅</div>
      <h2>受注を送信しました</h2>
      <p class="mo-item-sub">伝票番号: <span class="mono">${state.submittedDocNo ?? "―"}</span></p>
      <button class="button primary" data-action="mo-reset">新しい受注を入力</button>
    </section>
  `;
}
