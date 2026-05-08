import type { MasterProduct, FrequentItem } from "../api";
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

export function renderProductPicker(
  products: MasterProduct[],
  query: string,
  frequentProducts: FrequentItem[] = []
): string {
  const normalizedQuery = normalize(query);
  const filtered = products.filter((product) => {
    if (!normalizedQuery) return true;
    return [product.code, product.name, product.kanaName, product.janCode, product.category]
      .map(normalize)
      .some((field) => field.includes(normalizedQuery));
  });

  // よく使う商品セクション
  const freqHtml = !normalizedQuery && frequentProducts.length > 0
    ? `<div style="padding:8px 12px;border-bottom:2px solid var(--border,#e5e7eb);">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#6b7280);margin-bottom:6px;">よく使う商品</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${frequentProducts.map((p) =>
            `<button class="freq-chip" type="button" data-action="picker-select" data-code="${escapeHtml(p.code)}" data-name="${escapeHtml(p.name)}">${escapeHtml(p.name)} <small style="opacity:0.6">${p.count}回</small></button>`
          ).join("")}
        </div>
      </div>`
    : "";

  const resultsHtml = filtered.length
    ? `
        ${freqHtml}
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
    : freqHtml;

  return renderSearchModal({
    title: "商品検索",
    searchQuery: query,
    placeholder: "コード・名前・カナ・カテゴリで検索",
    resultsHtml,
    emptyMessage: "該当する商品が見つかりません。"
  });
}
