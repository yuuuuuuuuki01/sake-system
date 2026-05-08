import type { QuoteListItem } from "../api";

function fmt(n: number): string {
  return "¥" + n.toLocaleString("ja-JP");
}
function fmtDate(s: string): string {
  if (!s) return "";
  const d = new Date(s);
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}`;
}
const STATUS_LABEL: Record<string, string> = { draft: "下書き", sent: "送付済", accepted: "受注", rejected: "失注" };
const STATUS_CLASS: Record<string, string> = { draft: "badge-gray", sent: "badge-blue", accepted: "badge-green", rejected: "badge-red" };
const TPL_LABEL: Record<string, string> = { sake: "酒販用", standard: "通常" };

export function renderQuoteList(
  quotes: QuoteListItem[],
  loading: boolean,
  customerFilter: string = "",
  customerFilterName: string = ""
): string {
  const filtered = customerFilter
    ? quotes.filter(q => q.legacy_customer_code === customerFilter)
    : quotes;

  const colSpan = 8;
  const rows = loading
    ? `<tr><td colspan="${colSpan}" class="empty-row">読み込み中…</td></tr>`
    : filtered.length === 0
    ? `<tr><td colspan="${colSpan}" class="empty-row">見積書がありません</td></tr>`
    : filtered.map(q => `
      <tr>
        <td class="mono">${q.quote_no}</td>
        <td>${fmtDate(q.quote_date)}</td>
        <td>${q.customer_name || "（未選択）"}</td>
        <td>${q.subject || ""}</td>
        <td class="numeric">${fmt(q.total_amount)}</td>
        <td><span class="badge ${STATUS_CLASS[q.status] ?? "badge-gray"}">${STATUS_LABEL[q.status] ?? q.status}</span></td>
        <td>${TPL_LABEL[q.template_type] ?? q.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${q.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${q.id}" data-quote-no="${q.quote_no}">削除</button>
        </td>
      </tr>
    `).join("");

  const filterBanner = customerFilter
    ? `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--primary-bg,#eff6ff);border-radius:6px;margin-bottom:12px;border:1px solid var(--primary,#3b82f6);">
        <span style="font-size:13px;color:var(--primary,#3b82f6);font-weight:600;">🔍 ${customerFilterName || customerFilter} の見積のみ表示中</span>
        <button class="button secondary small" data-action="quote-clear-filter" style="margin-left:auto;">全件表示に戻す</button>
      </div>`
    : "";

  return `
    <section class="page-head">
      <div><p class="eyebrow">見積書</p><h1>見積一覧</h1></div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="quote-new">＋ 新規作成</button>
        <a class="button secondary" href="/quote-settings" data-link="/quote-settings">⚙ 会社設定</a>
      </div>
    </section>

    <section class="panel">
      ${filterBanner}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>見積番号</th>
              <th>日付</th>
              <th>得意先</th>
              <th>件名</th>
              <th class="numeric">合計</th>
              <th>ステータス</th>
              <th>種別</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}
