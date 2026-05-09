import type { MasterCustomer, MasterProduct, MasterStatsSummary, MasterTab, ProductMaterial } from "../api";
import { makeSortableHeader, applySortToRows, type SortState } from "../utils/tableSort";

export function renderEditCustomerModal(c: MasterCustomer): string {
  return `
    <div class="modal-overlay" id="edit-modal">
      <div class="modal-content panel" style="max-width:600px;">
        <h2>得意先編集: ${c.code}</h2>
        <form id="edit-customer-form" class="feature-form">
          <input type="hidden" id="ec-id" value="${c.id}" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="form-row"><label>得意先名</label><input type="text" id="ec-name" value="${c.name}" /></div>
            <div class="form-row"><label>カナ</label><input type="text" id="ec-kana" value="${c.kanaName || ""}" /></div>
            <div class="form-row"><label>略称</label><input type="text" id="ec-short" value="${c.shortName || ""}" /></div>
            <div class="form-row"><label>業態</label><input type="text" id="ec-business" value="${c.businessType || ""}" /></div>
            <div class="form-row"><label>電話番号</label><input type="text" id="ec-phone" value="${c.phone || ""}" /></div>
            <div class="form-row"><label>FAX</label><input type="text" id="ec-fax" value="${c.fax || ""}" /></div>
            <div class="form-row"><label>メール</label><input type="email" id="ec-email" value="${c.email || ""}" /></div>
            <div class="form-row"><label>郵便番号</label><input type="text" id="ec-postal" value="${c.postalCode || ""}" /></div>
            <div class="form-row" style="grid-column:1/-1;"><label>住所1</label><input type="text" id="ec-address" value="${c.address1 || ""}" /></div>
            <div class="form-row" style="grid-column:1/-1;"><label>住所2</label><input type="text" id="ec-address2" value="${c.address2 || ""}" /></div>
            <div class="form-row"><label>締日</label><input type="number" id="ec-closing" value="${c.closingDay || ""}" /></div>
            <div class="form-row"><label>支払日</label><input type="number" id="ec-payment" value="${c.paymentDay || ""}" /></div>
            <div class="form-row"><label>支払サイト</label><input type="text" id="ec-pay-cycle" value="${c.paymentCycle || ""}" /></div>
            <div class="form-row"><label>与信限度額</label><input type="number" id="ec-credit" value="${c.creditLimit || ""}" /></div>
            <div class="form-row"><label>取引区分</label>
              <select id="ec-trade-type">
                <option value="" ${!c.tradeType ? "selected" : ""}>―未設定―</option>
                <option value="B2B"   ${c.tradeType === "B2B"   ? "selected" : ""}>B2B（卸取引）</option>
                <option value="B2B2C" ${c.tradeType === "B2B2C" ? "selected" : ""}>B2B2C（生産者向け）</option>
                <option value="B2C"   ${c.tradeType === "B2C"   ? "selected" : ""}>B2C（小売・直販）</option>
              </select>
            </div>
            <div class="form-row"><label>価格区分</label>
              <select id="ec-price-type">
                <option value="" ${!c.priceType ? "selected" : ""}>未設定</option>
                <option value="000" ${c.priceType === "000" ? "selected" : ""}>000: 生産者価格</option>
                <option value="001" ${c.priceType === "001" ? "selected" : ""}>001: 小売価格</option>
                <option value="002" ${c.priceType === "002" ? "selected" : ""}>002: 卸価格</option>
              </select>
            </div>
            <div class="form-row"><label>地区コード</label><input type="text" id="ec-area" value="${c.areaCode || ""}" /></div>
            <div class="form-row"><label>担当者コード</label><input type="text" id="ec-staff" value="${c.staffCode || ""}" /></div>
            <div class="form-row"><label>税区分</label><input type="text" id="ec-tax" value="${c.taxMode || ""}" /></div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
            <button type="button" class="button secondary" data-action="close-modal">キャンセル</button>
            <button type="submit" class="button primary">保存</button>
          </div>
          <span id="edit-result" class="fr-result"></span>
        </form>
      </div>
    </div>
  `;
}

const PRODUCT_TYPE_LABELS: Record<string, string> = {
  base_sake: "原酒",
  standard: "マスター商品",
  pb: "PB商品",
  material: "資材",
  misc: "その他"
};

const MATERIAL_TYPE_LABELS: Record<string, string> = {
  bottle: "瓶",
  cap: "キャップ",
  label: "ラベル",
  box: "箱・カートン",
  other: "その他"
};

export function renderEditProductModal(
  p: MasterProduct,
  allProducts?: MasterProduct[],
  materials?: ProductMaterial[] | null
): string {
  const baseSakeOptions = (allProducts ?? [])
    .filter(pr => pr.id !== p.id && (pr.productType === "base_sake" || pr.name.includes("原酒")))
    .map(pr => `<option value="${pr.id}" ${p.baseSakeId === pr.id ? "selected" : ""}>[${pr.code}] ${pr.name}</option>`)
    .join("");

  const parentOptions = (allProducts ?? [])
    .filter(pr => pr.id !== p.id && pr.productType !== "pb" && pr.productType !== "material")
    .map(pr => `<option value="${pr.id}" ${p.parentProductId === pr.id ? "selected" : ""}>[${pr.code}] ${pr.name}</option>`)
    .join("");

  const materialRows = (materials ?? []).map(m => `
    <tr data-material-id="${m.id}">
      <td>${MATERIAL_TYPE_LABELS[m.materialType] || m.materialType}</td>
      <td>${m.materialName}</td>
      <td class="mono">${m.materialCode || ""}</td>
      <td>${m.supplierName || ""}</td>
      <td class="numeric">${m.unitCost ? `¥${m.unitCost.toLocaleString()}` : "―"}</td>
      <td class="numeric">${m.quantityPerProduct}</td>
      <td><button type="button" class="button secondary small" data-delete-material="${m.id}">削除</button></td>
    </tr>
  `).join("");

  return `
    <div class="modal-overlay" id="edit-modal">
      <div class="modal-content panel" style="max-width:720px;max-height:90vh;overflow-y:auto;">
        <h2>商品編集: [${p.code}] ${p.name}</h2>
        <form id="edit-product-form" class="feature-form">
          <input type="hidden" id="ep-id" value="${p.id}" />

          <fieldset style="border:1px solid var(--border);border-radius:6px;padding:12px;margin:0 0 12px;">
            <legend style="font-weight:700;font-size:13px;">商品種別・階層</legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div class="form-row">
                <label>商品種別</label>
                <select id="ep-product-type">
                  ${Object.entries(PRODUCT_TYPE_LABELS).map(([k, v]) =>
                    `<option value="${k}" ${p.productType === k ? "selected" : ""}>${v}</option>`
                  ).join("")}
                </select>
              </div>
              <div class="form-row">
                <label>原酒リンク</label>
                <select id="ep-base-sake"><option value="">―なし―</option>${baseSakeOptions}</select>
              </div>
              <div class="form-row" style="grid-column:1/-1;">
                <label>親商品（PBの場合）</label>
                <select id="ep-parent-product"><option value="">―なし―</option>${parentOptions}</select>
              </div>
            </div>
          </fieldset>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="form-row" style="grid-column:1/-1;"><label>商品名</label><input type="text" id="ep-name" value="${p.name}" /></div>
            <div class="form-row"><label>カナ</label><input type="text" id="ep-kana" value="${p.kanaName || ""}" /></div>
            <div class="form-row"><label>略称</label><input type="text" id="ep-short" value="${p.shortName || ""}" /></div>
            <div class="form-row"><label>分類</label><input type="text" id="ep-category" value="${p.category || ""}" /></div>
            <div class="form-row"><label>酒税区分</label><input type="text" id="ep-tax-cat" value="${p.taxCategoryCode || ""}" /></div>
            <div class="form-row"><label>度数(%)</label><input type="number" step="0.1" id="ep-alcohol" value="${p.alcoholDegree ?? ""}" /></div>
            <div class="form-row"><label>容量(ml)</label><input type="number" id="ep-volume" value="${p.volumeMl ?? ""}" /></div>
            <div class="form-row"><label>容器</label><input type="text" id="ep-bottle" value="${p.bottleType || ""}" /></div>
            <div class="form-row"><label>単位</label><input type="text" id="ep-unit" value="${p.unit || "本"}" /></div>
          </div>
          <fieldset style="border:1px solid var(--border);border-radius:6px;padding:12px;margin:12px 0;">
            <legend style="font-weight:700;font-size:13px;">価格設定</legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div class="form-row"><label>生産者価格(仕入)</label><input type="number" id="ep-purchase" value="${p.purchasePrice || ""}" /></div>
              <div class="form-row"><label>卸価格(デフォルト売価)</label><input type="number" id="ep-sale" value="${p.salePrice || ""}" /></div>
              <div class="form-row"><label>定価(小売価格)</label><input type="number" id="ep-list" value="${p.listPrice || ""}" /></div>
              <div class="form-row"><label>原価</label><input type="number" id="ep-cost" value="${p.costPrice || ""}" /></div>
            </div>
          </fieldset>
          <fieldset style="border:1px solid var(--border);border-radius:6px;padding:12px;margin:12px 0;">
            <legend style="font-weight:700;font-size:13px;">醸造情報</legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div class="form-row"><label>精米歩合(%)</label><input type="number" step="0.1" id="ep-polish" value="${p.polishRate ?? ""}" /></div>
              <div class="form-row"><label>原料米</label><input type="text" id="ep-rice" value="${p.riceType || ""}" /></div>
              <div class="form-row"><label>季節</label><input type="text" id="ep-season" value="${p.season || ""}" /></div>
              <div class="form-row"><label>熟成年数</label><input type="number" id="ep-aging" value="${p.agingYears || ""}" /></div>
            </div>
          </fieldset>

          <fieldset style="border:1px solid var(--border);border-radius:6px;padding:12px;margin:12px 0;">
            <legend style="font-weight:700;font-size:13px;">資材（瓶・キャップ・ラベル）</legend>
            ${materials === null
              ? '<p style="color:var(--text-muted);font-size:0.85rem;">読み込み中...</p>'
              : materials && materials.length > 0
                ? `<div class="table-wrap"><table style="font-size:0.85rem;">
                    <thead><tr><th>種別</th><th>資材名</th><th>品番</th><th>仕入先</th><th class="numeric">単価</th><th class="numeric">数量</th><th></th></tr></thead>
                    <tbody>${materialRows}</tbody>
                  </table></div>`
                : '<p style="color:var(--text-muted);font-size:0.85rem;">資材未登録</p>'
            }
            <div style="margin-top:8px;padding:8px;background:var(--bg-subtle,#f9fafb);border-radius:6px;">
              <div style="font-size:0.8rem;font-weight:600;margin-bottom:6px;">資材を追加</div>
              <div style="display:grid;grid-template-columns:auto 1fr 1fr;gap:6px;align-items:end;">
                <div class="form-row">
                  <label>種別</label>
                  <select id="mat-type" style="font-size:0.85rem;">
                    ${Object.entries(MATERIAL_TYPE_LABELS).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}
                  </select>
                </div>
                <div class="form-row"><label>資材名</label><input type="text" id="mat-name" placeholder="茶瓶 720ml" style="font-size:0.85rem;" /></div>
                <div class="form-row"><label>仕入先</label><input type="text" id="mat-supplier" placeholder="東洋ガラス" style="font-size:0.85rem;" /></div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:6px;margin-top:6px;align-items:end;">
                <div class="form-row"><label>品番</label><input type="text" id="mat-code" style="font-size:0.85rem;" /></div>
                <div class="form-row"><label>単価</label><input type="number" id="mat-cost" value="0" style="font-size:0.85rem;" /></div>
                <div class="form-row"><label>数量/本</label><input type="number" id="mat-qty" value="1" style="font-size:0.85rem;" /></div>
                <button type="button" class="button primary small" data-action="add-material" style="height:32px;">追加</button>
              </div>
            </div>
          </fieldset>

          <div style="display:flex;gap:8px;justify-content:flex-end;">
            <button type="button" class="button secondary" data-action="close-modal">キャンセル</button>
            <button type="submit" class="button primary">保存</button>
          </div>
          <span id="edit-result" class="fr-result"></span>
        </form>
      </div>
    </div>
  `;
}

export interface MasterFilterState {
  query: string;
  businessType: string;
  tradeType: string;
  areaCode: string;
  activeOnly: string;
  page: number;
}

export const defaultMasterFilter: MasterFilterState = {
  query: "",
  businessType: "",
  tradeType: "",
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

  if (filter.tradeType) {
    filtered = filtered.filter((c) => c.tradeType === filter.tradeType);
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
      <div class="form-group" style="min-width:120px;">
        <label class="form-label">取引区分</label>
        <select id="master-trade-type" class="form-input">
          <option value="">すべて</option>
          ${Object.entries(TRADE_TYPE_LABELS).map(([k, v]) => `<option value="${k}" ${filter.tradeType === k ? "selected" : ""}>${v}</option>`).join("")}
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

function formatPriceType(pt: string): string {
  switch (pt) {
    case "000": return "生産者";
    case "001": return "小売";
    case "002": return "卸";
    default: return pt || "―";
  }
}

const TRADE_TYPE_LABELS: Record<string, string> = {
  "B2B":   "B2B（卸）",
  "B2B2C": "B2B2C（生産者）",
  "B2C":   "B2C（小売）",
};

function tradeTypeBadge(tt: string): string {
  if (!tt) return "―";
  const colors: Record<string, string> = {
    B2B:   "#3b82f6",
    B2B2C: "#8b5cf6",
    B2C:   "#10b981",
  };
  const bg = colors[tt] ?? "#999";
  return `<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${bg};">${tt}</span>`;
}

function renderCustomerRows(customers: MasterCustomer[]): string {
  return customers
    .map(
      (customer) => `
        <tr>
          <td class="mono">${customer.code}</td>
          <td>${customer.name}</td>
          <td>${customer.kanaName || ""}</td>
          <td>${customer.shortName || ""}</td>
          <td>${customer.businessType || ""}</td>
          <td>${customer.salesCategory || ""}</td>
          <td>${tradeTypeBadge(customer.tradeType)}</td>
          <td>${formatPriceType(customer.priceType)}</td>
          <td>${customer.priceGroup || ""}</td>
          <td>${customer.phone || ""}</td>
          <td>${customer.fax || ""}</td>
          <td>${customer.postalCode || ""}</td>
          <td title="${customer.address1 || ""}">${truncate(customer.address1 || "", 16)}</td>
          <td>${truncate(customer.address2 || "", 12)}</td>
          <td>${customer.staffCode || ""}</td>
          <td>${customer.areaCode || ""}</td>
          <td class="numeric">${customer.closingDay ? customer.closingDay + "日" : ""}</td>
          <td class="numeric">${customer.paymentDay ? customer.paymentDay + "日" : ""}</td>
          <td>${customer.billingCycleType || ""}</td>
          <td>${customer.billingCode || ""}</td>
          <td>${customer.customerGroup1 || ""}</td>
          <td>${customer.customerGroup2 || ""}</td>
          <td><span class="status-pill ${customer.isActive ? "success" : "neutral"}">${customer.isActive ? "有効" : "停止"}</span></td>
          <td style="white-space:nowrap;">
            <button class="button secondary small" data-edit-customer="${customer.id}">編集</button>
            <button class="button secondary small" data-view-customer-quotes="${customer.code}" data-customer-name="${customer.name}" style="margin-left:4px;">見積</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function fmtPrice(v: number): string {
  return v ? `¥${v.toLocaleString("ja-JP")}` : "―";
}

function productTypeBadge(pt: string): string {
  const colors: Record<string, string> = {
    base_sake: "#dc2626", standard: "#2563eb", pb: "#7c3aed", material: "#059669", misc: "#6b7280"
  };
  const labels: Record<string, string> = {
    base_sake: "原酒", standard: "標準", pb: "PB", material: "資材", misc: "他"
  };
  const bg = colors[pt] ?? "#999";
  const label = labels[pt] ?? pt;
  return `<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${bg};">${label}</span>`;
}

function renderProductRows(products: MasterProduct[]): string {
  return products
    .map(
      (product) => `
        <tr>
          <td class="mono">${product.code}</td>
          <td>${truncate(product.name, 20)}</td>
          <td>${productTypeBadge(product.productType)}</td>
          <td>${product.category}</td>
          <td>${product.taxCategoryCode || ""}</td>
          <td class="numeric">${product.alcoholDegree != null ? `${product.alcoholDegree}` : ""}</td>
          <td class="numeric">${product.volumeMl != null ? `${product.volumeMl}` : ""}</td>
          <td>${product.unit || ""}</td>
          <td>${product.bottleType || ""}</td>
          <td class="numeric">${fmtPrice(product.purchasePrice)}</td>
          <td class="numeric">${fmtPrice(product.salePrice)}</td>
          <td class="numeric">${fmtPrice(product.listPrice)}</td>
          <td class="numeric">${fmtPrice(product.costPrice)}</td>
          <td>${product.riceType || ""}</td>
          <td class="numeric">${product.polishRate != null ? `${product.polishRate}` : ""}</td>
          <td>${product.season || ""}</td>
          <td class="numeric">${product.agingYears || ""}</td>
          <td><span class="status-pill ${product.isActive ? "success" : "neutral"}">${product.isActive ? "有効" : "停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${product.id}">編集</button></td>
        </tr>
      `
    )
    .join("");
}

export function renderMasterStats(
  summary: MasterStatsSummary,
  activeTab: MasterTab,
  filter: MasterFilterState = defaultMasterFilter,
  sortState: SortState = []
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
                ${makeSortableHeader("code", "コード", sortState)}
                ${makeSortableHeader("name", "得意先名", sortState)}
                ${makeSortableHeader("kanaName", "カナ", sortState)}
                <th>略称</th>
                ${makeSortableHeader("businessType", "業態", sortState)}
                <th>販売区分</th>
                <th>取引区分</th>
                <th>価格区分</th>
                <th>単価G</th>
                <th>電話</th>
                <th>FAX</th>
                <th>〒</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>担当</th>
                ${makeSortableHeader("areaName", "地区", sortState)}
                ${makeSortableHeader("closingDay", "締日", sortState, "numeric")}
                ${makeSortableHeader("paymentDay", "支払日", sortState, "numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${renderCustomerRows(applySortToRows(paged, sortState, {
              code: "code", name: "name", kanaName: "kanaName", businessType: "businessType",
              areaName: "areaName", closingDay: "closingDay", paymentDay: "paymentDay"
            }) as MasterCustomer[])}</tbody>
          </table>
        </div>
        ${renderPagination(filtered.length, filter.page, totalPages)}
      `
          : `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${makeSortableHeader("code", "コード", sortState)}
                ${makeSortableHeader("name", "商品名", sortState)}
                <th>種別</th>
                ${makeSortableHeader("category", "分類", sortState)}
                <th>酒税区分</th>
                ${makeSortableHeader("alcoholDegree", "度数", sortState, "numeric")}
                ${makeSortableHeader("volumeMl", "容量ml", sortState, "numeric")}
                <th>単位</th>
                <th>容器</th>
                ${makeSortableHeader("purchasePrice", "生産者価格", sortState, "numeric")}
                ${makeSortableHeader("salePrice", "卸価格", sortState, "numeric")}
                ${makeSortableHeader("listPrice", "定価(小売)", sortState, "numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${renderProductRows(applySortToRows(summary.products, sortState, {
              code: "code", name: "name", category: "category", alcoholDegree: "alcoholDegree",
              volumeMl: "volumeMl", purchasePrice: "purchasePrice", salePrice: "salePrice", listPrice: "listPrice"
            }) as MasterProduct[])}</tbody>
          </table>
        </div>
      `
      }
    </section>
  `;
}
