import type { MasterCustomer } from "../api";
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

export function renderCustomerPicker(customers: MasterCustomer[], query: string): string {
  const normalizedQuery = normalize(query);
  const filtered = customers
    .filter((customer) => {
      if (!normalizedQuery) return true;
      return [customer.code, customer.name, customer.name]
        .map(normalize)
        .some((field) => field.includes(normalizedQuery));
    })
    .slice(0, 50);

  const resultsHtml = filtered.length
    ? `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名前</th>
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
                      <td>${customer.closingDay}日</td>
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
    title: "得意先検索",
    searchQuery: query,
    placeholder: "コード・名前で検索",
    resultsHtml,
    emptyMessage: "該当する得意先が見つかりません。"
  });
}
