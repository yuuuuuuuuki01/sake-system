import type { RawMaterialEntry } from "../api";

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

const TYPE_LABELS: Record<RawMaterialEntry["transactionType"], string> = {
  receive: "受入", use: "使用", return: "返品", adjust: "調整"
};
const TYPE_COLORS: Record<RawMaterialEntry["transactionType"], string> = {
  receive: "#059669", use: "#d97706", return: "#ef4444", adjust: "#6b7280"
};

const MATERIAL_TYPES = ["米", "麹", "醸造アルコール", "酵母", "その他"];

export function renderRawMaterialLedger(entries: RawMaterialEntry[], filterType: string = ""): string {
  const filtered = filterType ? entries.filter(e => e.materialType === filterType) : entries;

  // 原料種別ごとの残高を古い順に積上げ計算
  const balanceByType = new Map<string, number>();
  const sortedAll = [...entries].sort((a, b) => a.ledgerDate.localeCompare(b.ledgerDate));
  for (const e of sortedAll) {
    const prev = balanceByType.get(e.materialType) ?? 0;
    const sign = (e.transactionType === "receive" || e.transactionType === "return") ? 1 : -1;
    balanceByType.set(e.materialType, prev + sign * e.quantityKg);
  }

  // 表示用: filtered の各行に残高を付与（新しい順表示なので逆算）
  const sortedFiltered = [...filtered]; // already desc from API
  const rowBalances: number[] = new Array(sortedFiltered.length).fill(0);
  if (filterType) {
    let bal = balanceByType.get(filterType) ?? 0;
    for (let i = 0; i < sortedFiltered.length; i++) {
      rowBalances[i] = bal;
      const e = sortedFiltered[i];
      const sign = (e.transactionType === "receive" || e.transactionType === "return") ? 1 : -1;
      bal -= sign * e.quantityKg;
    }
  }

  const typeOptions = MATERIAL_TYPES.map(t =>
    `<option value="${t}">${t}</option>`
  ).join("");

  const txTypeOptions = Object.entries(TYPE_LABELS).map(([k, v]) =>
    `<option value="${k}">${v}</option>`
  ).join("");

  const filterOptions = MATERIAL_TYPES.map(t =>
    `<option value="${t}" ${t === filterType ? "selected" : ""}>${t}</option>`
  ).join("");

  const rows = sortedFiltered.map((e, i) => {
    const color = TYPE_COLORS[e.transactionType] ?? "#6b7280";
    const sign = (e.transactionType === "receive" || e.transactionType === "return") ? 1 : -1;
    return `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:4px 6px;font-size:11px;white-space:nowrap;">${e.ledgerDate}</td>
      <td style="padding:4px 6px;font-size:11px;">${e.materialType}</td>
      <td style="padding:4px 6px;font-size:11px;">${e.materialName || "―"}</td>
      <td style="padding:4px 6px;"><span style="font-size:10px;padding:2px 6px;border-radius:3px;background:${color}15;color:${color};font-weight:600;">${TYPE_LABELS[e.transactionType]}</span></td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;font-weight:600;color:${sign > 0 ? "#059669" : "#d97706"};">${sign > 0 ? "+" : ""}${fmtNum(e.quantityKg)} kg</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${e.unitPrice ? fmtNum(e.unitPrice) + " 円" : ""}</td>
      <td style="padding:4px 6px;font-size:11px;">${e.supplier || ""}</td>
      <td style="padding:4px 6px;font-size:11px;">${e.batchCode || ""}</td>
      ${filterType ? `<td style="padding:4px 6px;font-size:11px;text-align:right;font-weight:700;">${fmtNum(rowBalances[i])} kg</td>` : ""}
      <td style="padding:4px 6px;font-size:10px;color:#6b7280;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.notes || ""}</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280;">${e.recordedBy || ""}</td>
      <td style="padding:4px 4px;"><button data-action="rml-delete" data-id="${e.id}" style="font-size:9px;padding:2px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
    </tr>`;
  }).join("");

  // 残高サマリカード
  const summaryCards = MATERIAL_TYPES.map(t => {
    const bal = balanceByType.get(t) ?? 0;
    return `<div style="padding:8px 12px;background:var(--surface);border:1px solid var(--border);border-radius:6px;min-width:100px;">
      <div style="font-size:10px;color:#6b7280;">${t}</div>
      <div style="font-size:16px;font-weight:700;">${fmtNum(bal)} <span style="font-size:11px;font-weight:400;">kg</span></div>
    </div>`;
  }).join("");

  return `
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>原料受払簿</h1></div>
      <div style="display:flex;gap:8px;">
        <button class="button secondary" data-action="rml-print">印刷</button>
      </div>
    </section>

    <section class="panel" style="margin-bottom:12px;">
      <div class="panel-header"><h2>原料残高</h2></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:4px 0;">${summaryCards}</div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>受払記録</h2><p class="panel-caption">原料の入出庫をすべて記録</p></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;padding:8px 0;font-size:11px;border-bottom:1px solid var(--border);margin-bottom:12px;">
        <label>日付<br><input id="rml-date" type="date" value="${new Date().toISOString().slice(0, 10)}" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>区分<br><select id="rml-material-type" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;">${typeOptions}</select></label>
        <label>品名<br><input id="rml-material-name" type="text" placeholder="品名" style="width:100px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>取引種別<br><select id="rml-tx-type" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;">${txTypeOptions}</select></label>
        <label>数量(kg)<br><input id="rml-qty" type="number" step="0.1" placeholder="0" style="width:70px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>単価<br><input id="rml-price" type="number" step="1" placeholder="0" style="width:70px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>仕入先<br><input id="rml-supplier" type="text" placeholder="" style="width:80px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>仕込番号<br><input id="rml-batch" type="text" placeholder="" style="width:70px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>メモ<br><input id="rml-notes" type="text" placeholder="" style="width:80px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <button class="button primary" data-action="rml-add" style="font-size:11px;padding:5px 14px;">記録</button>
      </div>

      <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
        <label style="font-size:11px;">原料絞込:
          <select data-action="rml-filter" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;">
            <option value="">全て</option>
            ${filterOptions}
          </select>
        </label>
        ${filterType ? `<span style="font-size:11px;color:#2563eb;font-weight:600;">${filterType} の受払履歴（${filtered.length}件）</span>` : `<span style="font-size:11px;color:#6b7280;">全${filtered.length}件</span>`}
      </div>

      <div id="rml-table" class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:10px;color:#6b7280;text-align:left;">
            <th style="padding:4px 6px;">日付</th>
            <th style="padding:4px 6px;">区分</th>
            <th style="padding:4px 6px;">品名</th>
            <th style="padding:4px 6px;">種別</th>
            <th style="padding:4px 6px;text-align:right;">数量</th>
            <th style="padding:4px 6px;text-align:right;">単価</th>
            <th style="padding:4px 6px;">仕入先</th>
            <th style="padding:4px 6px;">仕込</th>
            ${filterType ? `<th style="padding:4px 6px;text-align:right;">残高</th>` : ""}
            <th style="padding:4px 6px;">メモ</th>
            <th style="padding:4px 6px;">記録者</th>
            <th></th>
          </tr></thead>
          <tbody>${rows || `<tr><td colspan="${filterType ? 12 : 11}" style="padding:20px;text-align:center;color:#9ca3af;">受払記録がありません</td></tr>`}</tbody>
        </table>
      </div>
    </section>`;
}
