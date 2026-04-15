function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

interface GlobalSearchResults {
  customers: { code: string; name: string }[];
  products: { code: string; name: string }[];
  documents: { documentNo: string; customerName: string; date: string }[];
  pages: { path: string; title: string }[];
}

function renderSection(
  title: string,
  items: string[]
): string {
  if (items.length === 0) {
    return "";
  }

  return `
    <section class="search-section">
      <p class="search-section-title">${title}</p>
      <div class="search-result-list">
        ${items.join("")}
      </div>
    </section>
  `;
}

export function renderGlobalSearch(query: string, results: GlobalSearchResults): string {
  const sections = [
    renderSection(
      "得意先",
      results.customers.map(
        (customer) => `
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${escapeHtml(customer.name)}</strong>
            <span class="table-sub mono">${escapeHtml(customer.code)}</span>
          </button>
        `
      )
    ),
    renderSection(
      "商品",
      results.products.map(
        (product) => `
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${escapeHtml(product.name)}</strong>
            <span class="table-sub mono">${escapeHtml(product.code)}</span>
          </button>
        `
      )
    ),
    renderSection(
      "伝票",
      results.documents.map(
        (document) => `
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${escapeHtml(document.documentNo)}</strong>
            <span class="table-sub">${escapeHtml(document.customerName)} / ${escapeHtml(document.date)}</span>
          </button>
        `
      )
    ),
    renderSection(
      "ページ",
      results.pages.map(
        (page) => `
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${escapeHtml(page.path)}"
          >
            <strong>${escapeHtml(page.title)}</strong>
            <span class="table-sub mono">${escapeHtml(page.path)}</span>
          </button>
        `
      )
    )
  ]
    .filter(Boolean)
    .join("");

  const emptyState = query.trim()
    ? `<p class="empty-note">該当する検索結果がありません。</p>`
    : `<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>`;

  return `
    <div class="modal-backdrop global-search" data-action="global-search-close">
      <div
        class="modal-panel global-search-panel"
        role="dialog"
        aria-modal="true"
        aria-label="グローバル検索"
      >
        <div class="modal-header">
          <h2>グローバル検索</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="global-search-close">×</button>
        </div>
        <div class="modal-body global-search-body">
          <input
            id="global-search-input"
            type="search"
            value="${escapeHtml(query)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${sections || emptyState}
          </div>
        </div>
      </div>
    </div>
  `;
}
