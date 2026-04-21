/**
 * テーブルソートユーティリティ
 * - カラムヘッダークリックで昇降切替
 * - Shift+クリックで複数カラムソート
 * - 金額・本数・容量は数値ソート、その他は文字列ソート
 */

export interface SortKey {
  column: string;
  direction: "asc" | "desc";
}

export type SortState = SortKey[];

export function toggleSort(current: SortState, column: string, multiSort: boolean): SortState {
  const existing = current.findIndex((s) => s.column === column);

  if (existing >= 0) {
    // 既にソート中 → 方向を反転、3回目で解除
    const dir = current[existing].direction;
    if (dir === "asc") {
      const next = [...current];
      next[existing] = { column, direction: "desc" };
      return next;
    }
    // desc → 解除
    return current.filter((_, i) => i !== existing);
  }

  // 新規追加
  const newKey: SortKey = { column, direction: "asc" };
  return multiSort ? [...current, newKey] : [newKey];
}

export function sortIndicator(sortState: SortState, column: string): string {
  const idx = sortState.findIndex((s) => s.column === column);
  if (idx < 0) return `<span class="sort-icon">⇅</span>`;
  const arrow = sortState[idx].direction === "asc" ? "↑" : "↓";
  const badge = sortState.length > 1 ? `<small class="sort-badge">${idx + 1}</small>` : "";
  return `<span class="sort-icon active">${arrow}${badge}</span>`;
}

export function makeSortableHeader(column: string, label: string, sortState: SortState, extraClass: string = ""): string {
  return `<th class="sortable ${extraClass}" data-sort-col="${column}">${label} ${sortIndicator(sortState, column)}</th>`;
}

function parseValue(raw: unknown): number | string {
  if (raw == null) return "";
  const s = String(raw).replace(/[¥,円%本日L]/g, "").trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : s.toLowerCase();
}

export function applySortToRows<T extends Record<string, unknown>>(rows: T[], sortState: SortState, columnMap: Record<string, keyof T>): T[] {
  if (sortState.length === 0) return rows;
  return [...rows].sort((a, b) => {
    for (const { column, direction } of sortState) {
      const key = columnMap[column];
      if (!key) continue;
      const va = parseValue(a[key]);
      const vb = parseValue(b[key]);
      let cmp = 0;
      if (typeof va === "number" && typeof vb === "number") {
        cmp = va - vb;
      } else {
        cmp = String(va).localeCompare(String(vb), "ja");
      }
      if (cmp !== 0) return direction === "asc" ? cmp : -cmp;
    }
    return 0;
  });
}
