import type { KenteiRecord, Genzaishu } from "../api";

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

const PRODUCTION_TYPES = ["純米大吟醸酒", "大吟醸酒", "純米吟醸酒", "吟醸酒", "特別純米酒", "純米酒", "特別本醸造酒", "本醸造酒", "普通酒"];

export function renderKentei(records: KenteiRecord[], genzaishu: Genzaishu[] = [], showForm: boolean = false, editRecord?: KenteiRecord): string {
  const statusLabel: Record<KenteiRecord["status"], string> = { pending: "検定待ち", submitted: "検定済", approved: "現在酒登録済" };
  const statusClass: Record<KenteiRecord["status"], string> = { pending: "neutral", submitted: "warning", approved: "success" };

  const rows = records.map(r => `
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:6px 8px;font-size:12px;font-weight:600;">${r.batchCode || r.kenteiNo}</td>
      <td style="padding:6px 8px;font-size:12px;">${r.productName || "―"}</td>
      <td style="padding:6px 8px;font-size:12px;">${r.kenteiDate || "―"}</td>
      <td style="padding:6px 8px;font-size:12px;">${r.productionTypeName || "―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${r.alcoholDegree || "―"}%</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${r.sakaMeterValue || "―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${r.acidity || "―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${r.aminoAcid || "―"}</td>
      <td style="padding:6px 8px;font-size:12px;">${r.riceType || "―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${r.polishRate ? (r.polishRate * 100).toFixed(0) + "%" : "―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${r.volume > 0 ? fmtNum(r.volume) + "L" : "―"}</td>
      <td style="padding:6px 8px;"><span class="status-pill ${statusClass[r.status]}">${statusLabel[r.status]}</span></td>
      <td style="padding:6px 4px;white-space:nowrap;">
        <button class="button-sm secondary" data-action="kentei-edit" data-id="${r.id}" style="margin-right:4px;">編集</button>
        ${r.status !== "approved" ? `<button class="button-sm primary" data-action="kentei-register" data-id="${r.id}">現在酒登録</button>` : ""}
      </td>
    </tr>`).join("");

  const ptOptions = PRODUCTION_TYPES.map(t => `<option value="${t}" ${editRecord?.productionTypeName === t ? "selected" : ""}>${t}</option>`).join("");
  const today = new Date().toISOString().slice(0, 10);

  const formHtml = showForm ? `
    <section class="panel" style="margin-bottom:16px;border:2px solid #2563eb;">
      <div class="panel-header"><h2>${editRecord ? "検定記録編集" : "検定記録登録"}</h2></div>
      <input type="hidden" id="kentei-edit-id" value="${editRecord?.id ?? ""}">
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;padding:8px 0;font-size:12px;">
        <label>仕込番号<br><input id="kf-batch" type="text" value="${editRecord?.batchCode ?? ""}" style="width:90px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>銘柄名<br><input id="kf-name" type="text" value="${editRecord?.productName ?? ""}" style="width:120px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>検定日<br><input id="kf-date" type="date" value="${editRecord?.kenteiDate ?? today}" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>特定名称<br><select id="kf-type" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"><option value="">選択</option>${ptOptions}</select></label>
        <label>度数<br><input id="kf-alc" type="number" step="0.1" value="${editRecord?.alcoholDegree ?? ""}" placeholder="%" style="width:50px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>日本酒度<br><input id="kf-sake" type="number" step="0.1" value="${editRecord?.sakaMeterValue ?? ""}" style="width:55px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>酸度<br><input id="kf-acid" type="number" step="0.01" value="${editRecord?.acidity ?? ""}" style="width:50px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>アミノ酸度<br><input id="kf-amino" type="number" step="0.01" value="${editRecord?.aminoAcid ?? ""}" style="width:55px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>使用米<br><input id="kf-rice" type="text" value="${editRecord?.riceType ?? ""}" style="width:80px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>精米歩合<br><input id="kf-polish" type="number" step="0.01" value="${editRecord?.polishRate ?? ""}" placeholder="0.60" style="width:55px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>数量(L)<br><input id="kf-vol" type="number" step="1" value="${editRecord?.volume ?? ""}" style="width:60px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <button class="button primary" data-action="kentei-save" style="font-size:12px;padding:5px 14px;">保存</button>
        <button class="button secondary" data-action="kentei-cancel" style="font-size:12px;padding:5px 10px;">閉じる</button>
      </div>
    </section>` : "";

  // 現在酒一覧
  const gzRows = genzaishu.map(g => `
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:5px 8px;font-size:12px;font-weight:600;">${g.batchCode}</td>
      <td style="padding:5px 8px;font-size:12px;">${g.productName}</td>
      <td style="padding:5px 8px;font-size:12px;">${g.productionTypeName || "―"}</td>
      <td style="padding:5px 8px;font-size:12px;">${g.tankNo || "―"}</td>
      <td style="padding:5px 8px;font-size:12px;text-align:right;">${fmtNum(g.volumeL)}L</td>
      <td style="padding:5px 8px;font-size:12px;text-align:right;">${g.alcoholDegree ?? "―"}%</td>
      <td style="padding:5px 8px;font-size:12px;text-align:right;">${g.sakeMeterValue ?? "―"}</td>
      <td style="padding:5px 8px;font-size:12px;">${g.riceType || "―"}</td>
      <td style="padding:5px 8px;font-size:12px;">${g.kenteiDate || "―"}</td>
    </tr>`).join("");

  return `
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>検定管理・現在酒</h1></div>
      <button class="button primary" data-action="kentei-show-form">＋ 検定記録</button>
    </section>

    ${formHtml}

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>検定記録</h2><p class="panel-caption">${records.length}件</p></div>
      <div class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:10px;color:#6b7280;text-align:left;">
            <th style="padding:4px 8px;">仕込番号</th><th style="padding:4px 8px;">銘柄</th><th style="padding:4px 8px;">検定日</th>
            <th style="padding:4px 8px;">特定名称</th><th style="padding:4px 8px;text-align:right;">度数</th>
            <th style="padding:4px 8px;text-align:right;">日本酒度</th><th style="padding:4px 8px;text-align:right;">酸度</th>
            <th style="padding:4px 8px;text-align:right;">ｱﾐﾉ酸度</th><th style="padding:4px 8px;">使用米</th>
            <th style="padding:4px 8px;text-align:right;">精米歩合</th><th style="padding:4px 8px;text-align:right;">数量</th>
            <th style="padding:4px 8px;">状態</th><th></th>
          </tr></thead>
          <tbody>${rows || `<tr><td colspan="13" style="padding:20px;text-align:center;color:#9ca3af;">検定記録がありません</td></tr>`}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>現在酒一覧</h2><p class="panel-caption">検定完了→登録された酒（移動簿の銘柄に連動）</p></div>
      <div class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:10px;color:#6b7280;text-align:left;">
            <th style="padding:4px 8px;">仕込番号</th><th style="padding:4px 8px;">銘柄</th><th style="padding:4px 8px;">特定名称</th>
            <th style="padding:4px 8px;">タンク</th><th style="padding:4px 8px;text-align:right;">数量</th>
            <th style="padding:4px 8px;text-align:right;">度数</th><th style="padding:4px 8px;text-align:right;">日本酒度</th>
            <th style="padding:4px 8px;">使用米</th><th style="padding:4px 8px;">検定日</th>
          </tr></thead>
          <tbody>${gzRows || `<tr><td colspan="9" style="padding:20px;text-align:center;color:#9ca3af;">現在酒がありません</td></tr>`}</tbody>
        </table>
      </div>
    </section>`;
}
