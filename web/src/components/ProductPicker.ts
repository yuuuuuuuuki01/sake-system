import type { MasterProduct } from "../api";
import { renderSearchModal } from "./SearchModal";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function renderProductPicker(products: MasterProduct[], query: string): string {
  const normalizedQuery = normalize(query);
  const filtered = products.filter((product) => {
    if (!normalizedQuery) return true;
    return [product.code, product.name, product.janCode]
      .map(normalize)
      .some((field) => field.includes(normalizedQuery));
  });

  const resultsHtml = filtered.length
    ? `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名前</th>
                <th>JAN</th>
                <th>カテゴリ</th>
              </tr>
            </thead>
            <tbody>
              ${filtered
                .map(
                  (product) => `
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${escapeHtml(product.code)}"
                      data-name="${escapeHtml(product.name)}"
                    >
                      <td class="mono">${escapeHtml(product.code)}</td>
                      <td>${escapeHtml(product.name)}</td>
                      <td class="mono">${escapeHtml(product.janCode)}</td>
                      <td>${escapeHtml(product.category)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `
    : "";

  return renderSearchModal({
    title: "商品検索",
    searchQuery: query,
    placeholder: "コード・名前・JANで検索",
    resultsHtml,
    emptyMessage: "該当する商品が見つかりません。"
  });
}
