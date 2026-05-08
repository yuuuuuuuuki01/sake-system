import type { TankRecord } from "../api";

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

export function renderTankList(tanks: TankRecord[]): string {
  const statusLabel: Record<TankRecord["status"], string> = { empty: "空", in_use: "使用中", aging: "熟成中" };
  const statusClass: Record<TankRecord["status"], string> = { empty: "neutral", in_use: "warning", aging: "success" };

  const rows = tanks.map(t => {
    const fillRate = t.capacity > 0 ? Math.round((t.currentVolume / t.capacity) * 100) : 0;
    return `
      <tr data-tank-id="${t.id}">
        <td class="mono"><strong>${t.tankNo}</strong></td>
        <td>${t.displayName || "―"}</td>
        <td class="numeric">${t.depthMm > 0 ? fmtNum(t.depthMm) : "―"}</td>
        <td class="numeric">${t.capacity > 0 ? fmtNum(t.capacity) : "―"}</td>
        <td class="numeric">${t.litersPerMm > 0 ? t.litersPerMm.toFixed(2) : "―"}</td>
        <td class="numeric">${t.currentVolume > 0 ? fmtNum(t.currentVolume) : "―"}</td>
        <td>
          <div class="progress-wrap"><div class="progress-bar" style="width:${fillRate}%"></div></div>
          <span class="progress-label">${fillRate}%</span>
        </td>
        <td><span class="status-pill ${statusClass[t.status]}">${statusLabel[t.status]}</span></td>
        <td style="white-space:nowrap;">
          <button class="button-sm secondary" data-action="tank-edit" data-tank-id="${t.id}" style="margin-right:4px;">編集</button>
          <button class="button-sm" data-action="tank-delete" data-tank-id="${t.id}" style="color:#ef4444;border-color:#fca5a5;">削除</button>
        </td>
      </tr>`;
  }).join("");

  const inUseCount = tanks.filter(t => t.status === "in_use").length;
  const agingCount = tanks.filter(t => t.status === "aging").length;
  const emptyCount = tanks.filter(t => t.status === "empty").length;
  const totalCapacity = tanks.reduce((s, t) => s + t.capacity, 0);
  const totalVolume = tanks.reduce((s, t) => s + t.currentVolume, 0);

  return `
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>タンク管理</h1></div>
      <button class="button primary" data-action="tank-show-add">＋ タンク登録</button>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${fmtNum(totalCapacity)} L</p>
        <p class="kpi-sub">使用率 ${totalCapacity > 0 ? Math.round((totalVolume / totalCapacity) * 100) : 0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${inUseCount} 基</p>
        <p class="kpi-sub">熟成中 ${agingCount} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${emptyCount} 基</p>
        <p class="kpi-sub">登録 ${tanks.length} 基</p>
      </article>
    </section>

    <div id="tank-form-area"></div>

    <section class="panel">
      <div class="panel-header">
        <h2>タンク一覧</h2>
        <p class="panel-caption">${tanks.length} 基</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>容器番号</th>
              <th>容器名</th>
              <th class="numeric">容器深(mm)</th>
              <th class="numeric">容量(L)</th>
              <th class="numeric">L/mm</th>
              <th class="numeric">現在量</th>
              <th>充填率</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="9" class="empty-row">タンクが登録されていません</td></tr>`}</tbody>
        </table>
      </div>
    </section>`;
}

export function renderTankForm(tank?: TankRecord): string {
  const isEdit = !!tank;
  return `
    <section class="panel" style="margin-bottom:16px;border:2px solid #2563eb;">
      <div class="panel-header"><h2>${isEdit ? "タンク編集" : "タンク登録"}</h2></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;padding:8px 0;font-size:12px;">
        <input type="hidden" id="tank-edit-id" value="${tank?.id ?? ""}">
        <label>容器番号<br><input id="tank-f-no" type="text" value="${tank?.tankNo ?? ""}" placeholder="1号" style="width:60px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>容器名<br><input id="tank-f-name" type="text" value="${tank?.displayName ?? ""}" placeholder="醸造タンク1" style="width:120px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>容器深(mm)<br><input id="tank-f-depth" type="number" step="1" value="${tank?.depthMm ?? ""}" placeholder="1500" style="width:80px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>容量(L)<br><input id="tank-f-cap" type="number" step="1" value="${tank?.capacity ?? ""}" placeholder="3000" style="width:80px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>L/mm<br><input id="tank-f-lpmm" type="number" step="0.01" value="${tank?.litersPerMm ?? ""}" placeholder="2.00" style="width:70px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>備考<br><input id="tank-f-remarks" type="text" value="${tank?.remarks ?? ""}" placeholder="" style="width:140px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <button class="button primary" data-action="tank-save" style="font-size:12px;padding:6px 16px;">${isEdit ? "更新" : "登録"}</button>
        <button class="button secondary" data-action="tank-cancel" style="font-size:12px;padding:6px 12px;">キャンセル</button>
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin-top:4px;">容器深 ÷ 容量 で L/mm を自動計算できます</p>
    </section>`;
}
