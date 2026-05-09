import type { TankMovement, TankRecord, Genzaishu } from "../api";

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

const TYPE_LABELS: Record<TankMovement["movementType"], string> = {
  transfer: "タンク移動", receive: "受入", ship: "出荷・移出",
  blend: "ブレンド", discard: "廃棄", adjust: "調整", warimizu: "割水"
};
const TYPE_COLORS: Record<TankMovement["movementType"], string> = {
  transfer: "#2563eb", receive: "#059669", ship: "#d97706",
  blend: "#7c3aed", discard: "#ef4444", adjust: "#6b7280", warimizu: "#0ea5e9"
};

export function renderTankMovements(movements: TankMovement[], tanks: TankRecord[], filterTank: string = "", genzaishu: Genzaishu[] = []): string {
  const filtered = filterTank
    ? movements.filter(m => m.fromTankNo === filterTank || m.toTankNo === filterTank)
    : movements;

  // タンク別の現在量を移動履歴から積上げ計算
  const tankBalance = new Map<string, number>();
  // 古い順に積み上げ
  const sorted = [...movements].sort((a, b) => a.movementDate.localeCompare(b.movementDate));
  for (const m of sorted) {
    if (m.fromTankNo) tankBalance.set(m.fromTankNo, (tankBalance.get(m.fromTankNo) ?? 0) - m.volumeL);
    if (m.toTankNo) tankBalance.set(m.toTankNo, (tankBalance.get(m.toTankNo) ?? 0) + m.volumeL);
  }

  const tankOptions = tanks.map(t =>
    `<option value="${t.tankNo}" ${t.tankNo === filterTank ? "selected" : ""}>${t.tankNo}${t.displayName ? ` (${t.displayName})` : ""}</option>`
  ).join("");

  const typeOptions = Object.entries(TYPE_LABELS).map(([k, v]) =>
    `<option value="${k}">${v}</option>`
  ).join("");

  // 移動履歴テーブル（新しい順）
  let runningBalance = 0;
  const rows = filtered.map(m => {
    const color = TYPE_COLORS[m.movementType] ?? "#6b7280";
    const isIn = filterTank && m.toTankNo === filterTank;
    const isOut = filterTank && m.fromTankNo === filterTank;
    if (filterTank) {
      runningBalance += isIn ? m.volumeL : isOut ? -m.volumeL : 0;
    }
    return `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:6px 8px;font-size:12px;white-space:nowrap;">${m.movementDate}</td>
      <td style="padding:6px 8px;"><span style="font-size:10px;padding:2px 6px;border-radius:3px;background:${color}15;color:${color};font-weight:600;">${TYPE_LABELS[m.movementType]}</span></td>
      <td style="padding:6px 8px;font-size:12px;font-weight:600;${isOut ? "color:#ef4444;" : ""}">${m.fromTankNo || "―"}</td>
      <td style="padding:6px 4px;font-size:12px;color:#9ca3af;">→</td>
      <td style="padding:6px 8px;font-size:12px;font-weight:600;${isIn ? "color:#059669;" : ""}">${m.toTankNo || "―"}</td>
      <td style="padding:6px 8px;font-size:13px;font-weight:700;text-align:right;">${fmtNum(m.volumeL)} L</td>
      <td style="padding:6px 8px;font-size:11px;">${m.productName || "―"}</td>
      <td style="padding:6px 8px;font-size:11px;color:#6b7280;">${m.batchCode || ""}</td>
      <td style="padding:6px 8px;font-size:11px;">${m.alcoholDegree != null ? m.alcoholDegree + "%" : ""}</td>
      <td style="padding:6px 8px;font-size:11px;">${m.temperature != null ? m.temperature + "℃" : ""}</td>
      <td style="padding:6px 8px;font-size:10px;color:#6b7280;">${m.recordedBy || ""}</td>
      <td style="padding:6px 8px;font-size:10px;color:#6b7280;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${m.notes || ""}</td>
      <td style="padding:6px 4px;"><button data-action="tm-delete" data-id="${m.id}" style="font-size:9px;padding:2px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
    </tr>`;
  }).join("");

  return `
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>移動簿</h1></div>
      <div style="display:flex;gap:8px;">
        <button class="button secondary" data-action="tm-print">印刷</button>
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>移動記録</h2><p class="panel-caption">タンク間の酒の移動をすべて記録</p></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;padding:8px 0;font-size:12px;border-bottom:1px solid var(--border);margin-bottom:12px;">
        <label>日付<br><input id="tm-date" type="date" value="${new Date().toISOString().slice(0, 10)}" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>種別<br><select id="tm-type" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;">${typeOptions}</select></label>
        <label>移動元<br><select id="tm-from" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"><option value="">（なし）</option>${tankOptions}</select></label>
        <label>移動先<br><select id="tm-to" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"><option value="">（なし）</option>${tankOptions}</select></label>
        <label>数量(L)<br><input id="tm-vol" type="number" step="1" placeholder="0" style="width:70px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>銘柄<br><select id="tm-product" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;max-width:140px;">
          <option value="">選択/直接入力</option>
          ${genzaishu.map(g => `<option value="${g.productName}" data-batch="${g.batchCode}" data-alc="${g.alcoholDegree ?? ""}">${g.productName}（${g.batchCode}）</option>`).join("")}
        </select></label>
        <label>仕込番号<br><input id="tm-batch" type="text" placeholder="" style="width:80px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>度数<br><input id="tm-alc" type="number" step="0.1" placeholder="%" style="width:50px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>温度<br><input id="tm-temp" type="number" step="0.1" placeholder="℃" style="width:50px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>メモ<br><input id="tm-notes" type="text" placeholder="" style="width:100px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <button class="button primary" data-action="tm-add" style="font-size:12px;padding:6px 16px;">記録</button>
      </div>

      <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
        <label style="font-size:12px;">タンク絞込:
          <select data-action="tm-filter-tank" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <option value="">全て</option>
            ${tankOptions}
          </select>
        </label>
        ${filterTank ? `<span style="font-size:12px;color:#2563eb;font-weight:600;">${filterTank} の移動履歴（${filtered.length}件）</span>` : ""}
      </div>

      <div id="tm-table" class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:10px;color:#6b7280;text-align:left;">
            <th style="padding:4px 8px;">日付</th>
            <th style="padding:4px 8px;">種別</th>
            <th style="padding:4px 8px;">移動元</th>
            <th style="padding:4px 4px;"></th>
            <th style="padding:4px 8px;">移動先</th>
            <th style="padding:4px 8px;text-align:right;">数量</th>
            <th style="padding:4px 8px;">銘柄</th>
            <th style="padding:4px 8px;">仕込</th>
            <th style="padding:4px 8px;">度数</th>
            <th style="padding:4px 8px;">温度</th>
            <th style="padding:4px 8px;">記録者</th>
            <th style="padding:4px 8px;">メモ</th>
            <th></th>
          </tr></thead>
          <tbody>${rows || `<tr><td colspan="13" style="padding:20px;text-align:center;color:#9ca3af;">移動記録がありません</td></tr>`}</tbody>
        </table>
      </div>
    </section>`;
}
