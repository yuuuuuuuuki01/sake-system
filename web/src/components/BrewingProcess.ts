// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface BrewingBatch {
  id: string;
  brewCategory: string;
  batchCode: string;
  fy: number;
  plannedVolumeL: number;
  tankNo: string;
  status: "planned" | "active" | "completed";
  startDate: string;
  targetEndDate: string;
  notes: string;
}

export interface BrewingProcessStep {
  id: string;
  batchId: string;
  stepOrder: number;
  stepName: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart: string;
  actualEnd: string;
  status: "未着手" | "進行中" | "完了";
  temperature: number | null;
  notes: string;
}

export interface ScheduleEntry {
  brewCategory: string;
  fy: number;
  brewMonth: number;
  durationMonths: number;
  plannedVolumeL: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "純米大吟醸": "#7c3aed", "大吟醸": "#a855f7", "純米吟醸": "#2563eb",
  "純米": "#059669", "本醸造": "#d97706", "普通酒": "#6b7280",
  "リキュール": "#e11d48", "その他": "#9ca3af",
};

const STATUS_LABELS: Record<BrewingBatch["status"], string> = { planned: "計画中", active: "進行中", completed: "完了" };
const STATUS_PILL: Record<BrewingBatch["status"], string> = { planned: "neutral", active: "warning", completed: "success" };
const STEP_COLORS: Record<BrewingProcessStep["status"], string> = { "未着手": "#e5e7eb", "進行中": "#3b82f6", "完了": "#22c55e" };
const DAY_PX = 8;

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }
function catColor(cat: string): string { return CATEGORY_COLORS[cat] ?? "#6366f1"; }
function daysBetween(a: string, b: string): number { return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000); }
function addDays(base: string, days: number): string { const d = new Date(base); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); }
function fmtMD(d: string): string { if (!d) return "―"; return d.slice(5).replace("-", "/"); }

// ─── 進行表（全バッチ横並びガント）────────────────────────────────────────────

function renderProgressChart(batches: BrewingBatch[], stepsByBatch: Record<string, BrewingProcessStep[]>): string {
  const activeBatches = batches.filter(b => b.status !== "completed" && b.startDate && b.targetEndDate);
  if (activeBatches.length === 0) return "";

  // 全バッチの日付範囲
  const allDates = activeBatches.flatMap(b => [b.startDate, b.targetEndDate]);
  allDates.sort();
  const origin = allDates[0];
  const last = allDates[allDates.length - 1];
  const totalDays = Math.min(daysBetween(origin, last) + 1, 150);
  const gridW = totalDays * DAY_PX;

  // 月ラベル
  const monthLabels: string[] = [];
  let prevMonth = "";
  for (let d = 0; d < totalDays; d++) {
    const dt = addDays(origin, d);
    const mk = dt.slice(0, 7);
    if (mk !== prevMonth) {
      monthLabels.push(`<span style="position:absolute;left:${d * DAY_PX}px;font-size:9px;color:#9ca3af;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(dt.slice(5, 7))}月</span>`);
      prevMonth = mk;
    }
  }

  // 今日の線
  const today = new Date().toISOString().slice(0, 10);
  const todayOff = daysBetween(origin, today);
  const todayLine = todayOff >= 0 && todayOff < totalDays
    ? `<div style="position:absolute;left:${todayOff * DAY_PX}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.6;"></div>`
    : "";

  const rows = activeBatches.map(b => {
    const steps = (stepsByBatch[b.id] ?? []).sort((a, c) => a.stepOrder - c.stepOrder);
    const color = catColor(b.brewCategory);
    const currentStep = steps.find(s => s.status === "進行中");
    const donePct = steps.length > 0 ? Math.round(steps.filter(s => s.status === "完了").length / steps.length * 100) : 0;

    const bars = steps.map(s => {
      const sOff = Math.max(daysBetween(origin, s.plannedStart), 0);
      const eOff = Math.min(daysBetween(origin, s.plannedEnd), totalDays - 1);
      const w = Math.max((eOff - sOff + 1) * DAY_PX, DAY_PX);
      const bc = STEP_COLORS[s.status];
      const tc = s.status === "未着手" ? "#666" : "#fff";
      return `<div style="position:absolute;left:${sOff * DAY_PX}px;top:3px;width:${w}px;height:18px;background:${bc};border-radius:2px;font-size:7px;line-height:18px;padding:0 2px;color:${tc};overflow:hidden;white-space:nowrap;" title="${s.stepName} ${fmtMD(s.plannedStart)}〜${fmtMD(s.plannedEnd)}">${s.stepOrder <= 3 ? "" : s.stepName.slice(0, 3)}</div>`;
    }).join("");

    return `
      <div style="display:flex;align-items:center;border-bottom:1px solid #f3f4f6;min-height:28px;">
        <div style="width:140px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
          <span style="color:${color};font-weight:600;">${b.batchCode}</span>
          <span style="color:#9ca3af;margin-left:4px;">${donePct}%</span>
          ${currentStep ? `<span style="color:#3b82f6;margin-left:2px;font-size:9px;">${currentStep.stepName}</span>` : ""}
        </div>
        <div style="position:relative;width:${gridW}px;height:24px;background:repeating-linear-gradient(90deg,transparent 0 ${DAY_PX * 7 - 1}px,#f3f4f6 ${DAY_PX * 7 - 1}px ${DAY_PX * 7}px);">
          ${bars}
        </div>
      </div>`;
  }).join("");

  return `
    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>進行表</h2><p class="panel-caption">全バッチの工程進捗を一覧表示</p></div>
      <div style="overflow-x:auto;">
        <div style="min-width:${gridW + 140}px;">
          <div style="display:flex;align-items:flex-end;">
            <div style="width:140px;flex-shrink:0;"></div>
            <div style="position:relative;width:${gridW}px;height:20px;">
              ${monthLabels.join("")}
            </div>
          </div>
          <div style="position:relative;">
            ${rows}
            ${todayLine}
          </div>
        </div>
      </div>
    </section>`;
}

// ─── バッチカード ────────────────────────────────────────────────────────────

function renderBatchCard(batch: BrewingBatch, batchSteps: BrewingProcessStep[], expanded: boolean): string {
  const sorted = [...batchSteps].sort((a, b) => a.stepOrder - b.stepOrder);
  const totalSteps = sorted.length;
  const doneSteps = sorted.filter(s => s.status === "完了").length;
  const pct = totalSteps > 0 ? Math.round(doneSteps / totalSteps * 100) : 0;
  const currentStep = sorted.find(s => s.status === "進行中");
  const color = catColor(batch.brewCategory);

  return `
    <article class="panel" style="border-left:4px solid ${color};margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="flex:1;min-width:0;cursor:pointer" data-action="bp-toggle-detail" data-batch-id="${batch.id}">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
            <strong style="font-size:0.95rem">${batch.batchCode}</strong>
            <span style="background:${color};color:#fff;font-size:0.65rem;padding:1px 6px;border-radius:9999px">${batch.brewCategory}</span>
            <span class="status-pill ${STATUS_PILL[batch.status]}" style="font-size:0.7rem">${STATUS_LABELS[batch.status]}</span>
          </div>
          <div style="font-size:0.78rem;color:#6b7280;margin-top:3px">
            ${fmtNum(batch.plannedVolumeL)}L ｜ ${fmtMD(batch.startDate)}〜${fmtMD(batch.targetEndDate)}
            ${currentStep ? ` ▸ ${currentStep.stepName}` : ""}
          </div>
        </div>
        <div style="width:100px;flex-shrink:0;text-align:right">
          <div style="font-size:0.7rem;color:#6b7280;margin-bottom:2px">${doneSteps}/${totalSteps}</div>
          <div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:${color};border-radius:3px"></div>
          </div>
        </div>
        <span style="font-size:1rem;color:#9ca3af;cursor:pointer" data-action="bp-toggle-detail" data-batch-id="${batch.id}">${expanded ? "▲" : "▼"}</span>
      </div>
      ${expanded ? renderBatchDetail(batch, sorted) : ""}
    </article>`;
}

function renderBatchDetail(batch: BrewingBatch, steps: BrewingProcessStep[]): string {
  if (steps.length === 0) return `<div style="padding:12px 0;color:#9ca3af;font-size:0.82rem">工程未登録</div>`;

  const allDates = steps.flatMap(s => [s.plannedStart, s.plannedEnd].filter(Boolean));
  if (allDates.length === 0) return `<div style="padding:12px 0;color:#9ca3af;font-size:0.82rem">日程未設定</div>`;
  allDates.sort();
  const origin = allDates[0];
  const last = allDates[allDates.length - 1];
  const cappedDays = Math.min(daysBetween(origin, last) + 1, 100);
  const gridW = cappedDays * DAY_PX;

  const monthLabels: string[] = [];
  let prev = "";
  for (let d = 0; d < cappedDays; d++) {
    const dt = addDays(origin, d);
    const mk = dt.slice(0, 7);
    if (mk !== prev) { monthLabels.push(`<span style="position:absolute;left:${d * DAY_PX}px;font-size:8px;color:#9ca3af;white-space:nowrap">${parseInt(dt.slice(5, 7))}月</span>`); prev = mk; }
  }

  const stepRows = steps.map(s => {
    const sOff = Math.max(daysBetween(origin, s.plannedStart), 0);
    const eOff = Math.min(daysBetween(origin, s.plannedEnd), cappedDays - 1);
    const bL = sOff * DAY_PX, bW = Math.max((eOff - sOff + 1) * DAY_PX, DAY_PX);
    const bc = STEP_COLORS[s.status], tc = s.status === "未着手" ? "#374151" : "#fff";
    return `
      <div style="display:flex;align-items:center;margin-bottom:1px;min-height:22px">
        <div style="width:90px;flex-shrink:0;font-size:10px;text-align:right;padding-right:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${s.status === "進行中" ? "font-weight:700;color:#2563eb;" : ""}">${s.stepName}</div>
        <div style="position:relative;width:${gridW}px;height:18px;background:repeating-linear-gradient(90deg,#f9fafb 0 ${DAY_PX - 1}px,#e5e7eb ${DAY_PX - 1}px ${DAY_PX}px);border-radius:2px">
          <div style="position:absolute;left:${bL}px;top:1px;width:${bW}px;height:16px;background:${bc};border-radius:2px;color:${tc};font-size:8px;line-height:16px;padding:0 3px;overflow:hidden;white-space:nowrap">${fmtMD(s.plannedStart)}–${fmtMD(s.plannedEnd)}</div>
        </div>
      </div>`;
  }).join("");

  const stepDetailRows = steps.map(s => `
    <tr style="border-bottom:1px solid #f3f4f6">
      <td style="padding:4px 6px;font-size:11px;font-weight:${s.status === "進行中" ? 700 : 400}">${s.stepName}</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280">${fmtMD(s.plannedStart)}〜${fmtMD(s.plannedEnd)}</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280">${s.actualStart ? fmtMD(s.actualStart) : "―"}〜${s.actualEnd ? fmtMD(s.actualEnd) : "―"}</td>
      <td style="padding:4px 3px">
        <select data-action="bp-step-status" data-step-id="${s.id}" data-batch-id="${s.batchId}" style="font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px">
          ${(["未着手", "進行中", "完了"] as const).map(o => `<option value="${o}"${s.status === o ? " selected" : ""}>${o}</option>`).join("")}
        </select>
      </td>
      <td style="padding:4px 3px"><input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${s.id}" value="${s.temperature ?? ""}" placeholder="℃" style="width:50px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
      <td style="padding:4px 3px"><input type="text" data-action="bp-step-notes" data-step-id="${s.id}" value="${s.notes}" placeholder="メモ" style="width:100px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
    </tr>`).join("");

  return `
    <div style="margin-top:10px;padding-top:10px;border-top:1px solid #e5e7eb">
      <!-- バッチ編集 -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;font-size:11px;">
        <label style="display:flex;align-items:center;gap:3px;">量
          <input type="number" min="0" step="100" value="${Math.round(batch.plannedVolumeL)}"
            data-action="bp-batch-vol" data-batch-id="${batch.id}"
            style="width:64px;height:24px;font-size:11px;text-align:right;border:1px solid #d1d5db;border-radius:3px;padding:0 4px;">L</label>
        <label style="display:flex;align-items:center;gap:3px;">開始
          <input type="date" value="${batch.startDate}"
            data-action="bp-batch-date" data-batch-id="${batch.id}"
            style="height:24px;font-size:11px;border:1px solid #d1d5db;border-radius:3px;padding:0 4px;"></label>
        <label style="display:flex;align-items:center;gap:3px;">ステータス
          <select data-action="bp-batch-status" data-batch-id="${batch.id}" style="height:24px;font-size:11px;border:1px solid #d1d5db;border-radius:3px;padding:0 4px;">
            ${(["planned", "active", "completed"] as const).map(o => `<option value="${o}"${batch.status === o ? " selected" : ""}>${STATUS_LABELS[o]}</option>`).join("")}
          </select></label>
        <button data-action="bp-show-delete-modal" data-batch-id="${batch.id}" data-batch-code="${batch.batchCode}" style="height:24px;font-size:11px;padding:0 10px;border:1px solid #ef4444;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">削除</button>
      </div>
      <!-- ミニガント -->
      <div style="overflow-x:auto;margin-bottom:12px">
        <div style="position:relative;height:14px;width:${gridW}px;margin-left:90px;margin-bottom:2px">${monthLabels.join("")}</div>
        ${stepRows}
      </div>
      <!-- 工程テーブル -->
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:500px">
          <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
            <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
            <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
          </tr></thead>
          <tbody>${stepDetailRows}</tbody>
        </table>
      </div>
    </div>`;
}

function renderNewBatchForm(categories: string[]): string {
  return `
    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header">新規バッチ登録</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;padding:10px 0;font-size:12px;">
        <label>区分<br><select id="bp-new-cat" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;">
          ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
        </select></label>
        <label>バッチコード<br><input id="bp-new-code" type="text" placeholder="JG-2026-01" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;width:120px;"></label>
        <label>醸造量(L)<br><input id="bp-new-vol" type="number" placeholder="1800" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;width:80px;"></label>
        <label>開始日<br><input id="bp-new-date" type="date" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;"></label>
        <button class="button primary" data-action="bp-create-batch" style="font-size:12px;padding:6px 16px;">登録</button>
      </div>
    </div>`;
}

// ─── Main Renderer ───────────────────────────────────────────────────────────

export function renderBrewingProcess(
  batches: BrewingBatch[],
  steps: BrewingProcessStep[],
  categories: string[],
  opts: { expandedBatchId?: string; showNewForm?: boolean; schedule?: ScheduleEntry[]; fy?: number } = {}
): string {
  const { expandedBatchId, showNewForm, schedule = [], fy = 2026 } = opts;

  const stepsByBatch: Record<string, BrewingProcessStep[]> = {};
  for (const s of steps) { (stepsByBatch[s.batchId] ??= []).push(s); }

  const activeCount = batches.filter(b => b.status === "active").length;
  const plannedCount = batches.filter(b => b.status === "planned").length;
  const completedCount = batches.filter(b => b.status === "completed").length;

  const visibleBatches = batches.filter(b => b.status !== "completed");
  const grouped: Record<string, BrewingBatch[]> = {};
  for (const b of visibleBatches) { (grouped[b.brewCategory] ??= []).push(b); }
  const orderedCats = categories.filter(c => grouped[c]?.length);

  const groupHtml = orderedCats.map(cat => {
    const catBatches = grouped[cat];
    const cards = catBatches.map(b => renderBatchCard(b, stepsByBatch[b.id] ?? [], expandedBatchId === b.id)).join("");
    return `<div style="margin-bottom:16px">
      <h3 style="font-size:0.85rem;color:${catColor(cat)};margin-bottom:6px;border-bottom:2px solid ${catColor(cat)};padding-bottom:3px;display:inline-block">${cat}（${catBatches.length}）</h3>
      ${cards}</div>`;
  }).join("");

  // 調達計画から取込セクション
  const importSection = schedule.length > 0 ? (() => {
    const existingKeys = new Set(batches.map(b => `${b.brewCategory}:${b.startDate?.slice(0, 7)}`));
    const unimported = schedule.filter(s => {
      const yr = s.brewMonth >= 10 ? s.fy : s.fy + 1;
      const key = `${s.brewCategory}:${yr}-${String(s.brewMonth).padStart(2, "0")}`;
      return !existingKeys.has(key) && s.plannedVolumeL > 0;
    });
    if (unimported.length === 0) return "";
    const rows = unimported.map(s => {
      const yr = s.brewMonth >= 10 ? s.fy : s.fy + 1;
      const startDate = `${yr}-${String(s.brewMonth).padStart(2, "0")}-01`;
      const code = `${s.brewCategory}-${s.fy}-${String(s.brewMonth).padStart(2, "0")}`;
      const color = catColor(s.brewCategory);
      return `<tr>
        <td style="padding:5px 6px"><span style="color:${color};font-weight:600;font-size:11px;">${s.brewCategory}</span></td>
        <td style="padding:5px 6px;font-size:11px;">${code}</td>
        <td style="padding:5px 6px;text-align:right;font-size:11px;">${fmtNum(Math.round(s.plannedVolumeL))}L</td>
        <td style="padding:5px 6px;font-size:11px;">${s.brewMonth}月（${startDate}）</td>
        <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${s.brewCategory}" data-month="${s.brewMonth}" data-vol="${Math.round(s.plannedVolumeL)}" data-date="${startDate}" data-code="${code}" checked></td>
      </tr>`;
    }).join("");
    return `<section class="panel" style="margin-bottom:16px">
      <div class="panel-header">
        <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括でバッチ作成</p></div>
        <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括登録</button>
      </div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
        <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
          <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
        </tr></thead><tbody>${rows}</tbody></table></div>
    </section>`;
  })() : "";

  return `
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack"><button class="button" data-action="bp-show-new-form">＋ 新規バッチ</button></div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">進行中</p><p class="kpi-value">${activeCount}</p><p class="kpi-sub">アクティブ</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${plannedCount}</p><p class="kpi-sub">未着手</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${completedCount}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${renderProgressChart(batches, stepsByBatch)}
    ${showNewForm ? renderNewBatchForm(categories) : ""}
    ${importSection}
    <section>${groupHtml || '<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">バッチ未登録。調達計画から取込むか、新規バッチを追加してください。</div>'}</section>

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">バッチを削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> を削除します。<br>関連する全工程データも削除されます。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`;
}
