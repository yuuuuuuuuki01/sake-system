import type { MasterCustomer, FrequentItem } from "../api";
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

export function renderCustomerPicker(
  customers: MasterCustomer[],
  query: string,
  frequentCustomers: FrequentItem[] = []
): string {
  const normalizedQuery = normalize(query);
  const filtered = customers
    .filter((customer) => {
      if (!normalizedQuery) return true;
      return [customer.code, customer.name, customer.kanaName, customer.shortName]
        .map(normalize)
        .some((field) => field.includes(normalizedQuery));
    })
    .slice(0, 50);

  // よく使う得意先セクション
  const freqHtml = !normalizedQuery && frequentCustomers.length > 0
    ? `<div style="padding:8px 12px;border-bottom:2px solid var(--border,#e5e7eb);">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#6b7280);margin-bottom:6px;">よく使う得意先</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${frequentCustomers.map((c) =>
            `<button class="freq-chip" type="button" data-action="picker-select" data-code="${escapeHtml(c.code)}" data-name="${escapeHtml(c.name)}">${escapeHtml(c.name)} <small style="opacity:0.6">${c.count}件</small></button>`
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
                <th>カナ</th>
                <th>締日</th>
              </tr>
            </thead>
            <tbody>
              ${filtered
                .map(
                  (customer) => `
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${escapeHtml(customer.code)}"
                      data-name="${escapeHtml(customer.name)}"
                    >
                      <td class="mono">${escapeHtml(customer.code)}</td>
                      <td>${escapeHtml(customer.name)}</td>
                      <td style="font-size:0.8rem;color:var(--text-muted,#6b7280)">${escapeHtml(customer.kanaName || "")}</td>
                      <td>${customer.closingDay}日</td>
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
    title: "得意先検索",
    searchQuery: query,
    placeholder: "コード・名前・カナで検索",
    resultsHtml,
    emptyMessage: "該当する得意先が見つかりません。"
  });
}
