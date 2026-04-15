function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderSearchModal(config: {
  title: string;
  searchQuery: string;
  placeholder: string;
  resultsHtml: string;
  emptyMessage?: string;
}): string {
  const results = config.resultsHtml.trim()
    ? config.resultsHtml
    : `<p class="empty-note">${escapeHtml(config.emptyMessage ?? "該当データがありません。")}</p>`;

  return `
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${escapeHtml(config.title)}">
        <div class="modal-header">
          <h2>${escapeHtml(config.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${escapeHtml(config.placeholder)}"
            value="${escapeHtml(config.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${results}</div>
        </div>
      </div>
    </div>
  `;
}
