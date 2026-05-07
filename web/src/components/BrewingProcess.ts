// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface BrewingBatch {
  id: string; brewCategory: string; batchCode: string; fy: number;
  plannedVolumeL: number; tankNo: string; status: "planned" | "active" | "completed";
  startDate: string; targetEndDate: string; notes: string;
}
export interface BrewingProcessStep {
  id: string; batchId: string; stepOrder: number; stepName: string;
  plannedStart: string; plannedEnd: string; actualStart: string; actualEnd: string;
  status: "未着手" | "進行中" | "完了"; temperature: number | null; notes: string;
}
export interface ScheduleEntry {
  brewCategory: string; fy: number; brewMonth: number; durationMonths: number; plannedVolumeL: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "純米大吟醸": "#7c3aed", "大吟醸": "#a855f7", "純米吟醸": "#2563eb",
  "純米": "#059669", "本醸造": "#d97706", "普通酒": "#6b7280",
  "リキュール": "#e11d48", "その他": "#9ca3af",
};
const STATUS_LABELS: Record<BrewingBatch["status"], string> = { planned: "計画中", active: "進行中", completed: "完了" };
const STATUS_PILL: Record<BrewingBatch["status"], string> = { planned: "neutral", active: "warning", completed: "success" };
const STEP_COLORS: Record<BrewingProcessStep["status"], string> = { "未着手": "#d1d5db", "進行中": "#3b82f6", "完了": "#22c55e" };
const DAY_PX = 6;

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }
function catColor(cat: string): string { return CATEGORY_COLORS[cat] ?? "#6366f1"; }
function daysBetween(a: string, b: string): number { return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000); }
function addDays(base: string, days: number): string { const d = new Date(base); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); }
function fmtMD(d: string): string { if (!d) return "―"; return d.slice(5).replace("-", "/"); }
function abbrev(name: string): string { return name.length <= 3 ? name : name.slice(0, 3); }

// ─── 1. Main Gantt Chart ─────────────────────────────────────────────────────

function renderGantt(batches: BrewingBatch[], stepsByBatch: Record<string, BrewingProcessStep[]>, selectedId?: string): string {
  const visible = batches.filter(b => b.status !== "completed" && b.startDate && b.targetEndDate);
  if (visible.length === 0) return "";

  const allDates = visible.flatMap(b => [b.startDate, b.targetEndDate]);
  const stepsAll = visible.flatMap(b => stepsByBatch[b.id] ?? []);
  for (const s of stepsAll) { if (s.plannedStart) allDates.push(s.plannedStart); if (s.plannedEnd) allDates.push(s.plannedEnd); }
  allDates.sort();
  const origin = allDates[0];
  const last = allDates[allDates.length - 1];
  const totalDays = Math.min(daysBetween(origin, last) + 7, 180);
  const gridW = totalDays * DAY_PX;

  // Month labels
  const months: string[] = [];
  let prevM = "";
  for (let d = 0; d < totalDays; d++) {
    const dt = addDays(origin, d);
    const mk = dt.slice(0, 7);
    if (mk !== prevM) {
      months.push(`<span style="position:absolute;left:${d * DAY_PX}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(dt.slice(5, 7))}月</span>`);
      prevM = mk;
    }
  }

  // Today line
  const today = new Date().toISOString().slice(0, 10);
  const todayOff = daysBetween(origin, today);
  const todayLine = todayOff >= 0 && todayOff < totalDays
    ? `<div style="position:absolute;left:${todayOff * DAY_PX}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`
    : "";

  const rowH = 30;
  const rows = visible.map(b => {
    const steps = (stepsByBatch[b.id] ?? []).sort((a, c) => a.stepOrder - c.stepOrder);
    const color = catColor(b.brewCategory);
    const sel = selectedId === b.id;

    const bars = steps.map(s => {
      const sOff = Math.max(daysBetween(origin, s.plannedStart), 0);
      const eOff = Math.min(daysBetween(origin, s.plannedEnd), totalDays - 1);
      const left = sOff * DAY_PX;
      const w = Math.max((eOff - sOff + 1) * DAY_PX, DAY_PX);
      const bg = STEP_COLORS[s.status];
      const tc = s.status === "未着手" ? "#555" : "#fff";
      return `<div class="bp-gantt-bar" data-step-id="${s.id}" data-batch-id="${s.batchId}" data-step-order="${s.stepOrder}" data-planned-start="${s.plannedStart}" data-planned-end="${s.plannedEnd}" style="position:absolute;left:${left}px;top:4px;width:${w}px;height:22px;background:${bg};border-radius:3px;font-size:7px;line-height:22px;color:${tc};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${s.status === "未着手" ? "#bbb" : bg};" title="${s.stepName} ${fmtMD(s.plannedStart)}〜${fmtMD(s.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${w > 24 ? abbrev(s.stepName) : ""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`;
    }).join("");

    return `<div style="display:flex;align-items:center;border-bottom:1px solid ${sel ? "#3b82f6" : "#f3f4f6"};min-height:${rowH}px;background:${sel ? "#eff6ff" : "transparent"};" data-action="bp-toggle-detail" data-batch-id="${b.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${color};font-weight:600;">${b.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${b.brewCategory}</span>
      </div>
      <div style="position:relative;width:${gridW}px;height:${rowH}px;background:repeating-linear-gradient(90deg,transparent 0 ${DAY_PX * 7 - 1}px,#f3f4f6 ${DAY_PX * 7 - 1}px ${DAY_PX * 7}px);">${bars}</div>
    </div>`;
  }).join("");

  return `<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">バッチをクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${gridW + 120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${gridW}px;height:20px;">${months.join("")}</div>
        </div>
        <div style="position:relative;">${rows}${todayLine}</div>
      </div>
    </div>
  </section>`;
}

// ─── 2. Network / Flow Diagram ───────────────────────────────────────────────

function renderNetwork(batch: BrewingBatch, steps: BrewingProcessStep[]): string {
  const sorted = [...steps].sort((a, b) => a.stepOrder - b.stepOrder);
  if (sorted.length === 0) return "";

  const nodeW = 120, nodeH = 50, gapX = 40, gapY = 20, cols = 5;
  const rows = Math.ceil(sorted.length / cols);
  const svgW = cols * (nodeW + gapX) - gapX + 20;
  const svgH = rows * (nodeH + gapY) - gapY + 20;

  const pos = (i: number) => {
    const row = Math.floor(i / cols);
    const col = row % 2 === 0 ? i % cols : (cols - 1) - (i % cols); // snake layout
    return { x: 10 + col * (nodeW + gapX), y: 10 + row * (nodeH + gapY) };
  };

  const nodes = sorted.map((s, i) => {
    const p = pos(i);
    const fill = STEP_COLORS[s.status];
    const border = s.status === "進行中" ? "#1d4ed8" : s.status === "完了" ? "#15803d" : "#9ca3af";
    const textColor = s.status === "未着手" ? "#374151" : "#fff";
    return `<g>
      <rect x="${p.x}" y="${p.y}" width="${nodeW}" height="${nodeH}" rx="6" fill="${fill}" stroke="${border}" stroke-width="2"/>
      <text x="${p.x + nodeW / 2}" y="${p.y + 20}" text-anchor="middle" fill="${textColor}" font-size="11" font-weight="600">${s.stepName}</text>
      <text x="${p.x + nodeW / 2}" y="${p.y + 36}" text-anchor="middle" fill="${textColor}" font-size="9" opacity="0.8">${fmtMD(s.plannedStart)}〜${fmtMD(s.plannedEnd)}</text>
    </g>`;
  }).join("");

  const arrows = sorted.slice(1).map((_, i) => {
    const from = pos(i), to = pos(i + 1);
    const fx = from.x + nodeW / 2, fy = from.y + nodeH / 2;
    const tx = to.x + nodeW / 2, ty = to.y + nodeH / 2;
    // Determine connection points
    const sameRow = Math.floor(i / cols) === Math.floor((i + 1) / cols);
    if (sameRow) {
      const dir = tx > fx ? 1 : -1;
      const sx = from.x + (dir > 0 ? nodeW : 0), sy = fy;
      const ex = to.x + (dir > 0 ? 0 : nodeW), ey = ty;
      return `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`;
    } else {
      const sy = from.y + nodeH, ey = to.y;
      return `<line x1="${fx}" y1="${sy}" x2="${tx}" y2="${ey}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`;
    }
  }).join("");

  const color = catColor(batch.brewCategory);
  return `<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${color};">●</span> ${batch.batchCode} 工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${svgW}" height="${svgH}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${arrows}${nodes}
        </svg>
      </div>
    </section>
  </div>`;
}

// ─── 3. Batch List ───────────────────────────────────────────────────────────

function renderBatchList(batches: BrewingBatch[], stepsByBatch: Record<string, BrewingProcessStep[]>, selectedId?: string): string {
  if (batches.length === 0) return `<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">バッチ未登録。調達計画から取込むか、新規バッチを追加してください。</div>`;

  const rows = batches.map(b => {
    const steps = stepsByBatch[b.id] ?? [];
    const total = steps.length;
    const done = steps.filter(s => s.status === "完了").length;
    const pct = total > 0 ? Math.round(done / total * 100) : 0;
    const color = catColor(b.brewCategory);
    const sel = selectedId === b.id;

    return `<tr style="border-bottom:1px solid #f3f4f6;background:${sel ? "#eff6ff" : "transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${b.id}">
      <td style="padding:6px;font-size:12px;font-weight:600;color:${color};">${b.batchCode}</td>
      <td style="padding:6px;font-size:11px;"><span style="background:${color};color:#fff;padding:1px 6px;border-radius:9999px;font-size:10px;">${b.brewCategory}</span></td>
      <td style="padding:6px;font-size:11px;text-align:right;">
        <input type="number" min="0" step="100" value="${Math.round(b.plannedVolumeL)}" data-action="bp-batch-vol" data-batch-id="${b.id}" style="width:60px;font-size:11px;text-align:right;border:1px solid #e5e7eb;border-radius:3px;padding:2px 4px;" onclick="event.stopPropagation()">L
      </td>
      <td style="padding:6px;font-size:11px;">
        <input type="date" value="${b.startDate}" data-action="bp-batch-date" data-batch-id="${b.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
      </td>
      <td style="padding:6px;">
        <select data-action="bp-batch-status" data-batch-id="${b.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
          ${(["planned", "active", "completed"] as const).map(o => `<option value="${o}"${b.status === o ? " selected" : ""}>${STATUS_LABELS[o]}</option>`).join("")}
        </select>
      </td>
      <td style="padding:6px;width:80px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
            <div style="width:${pct}%;height:100%;background:${color};border-radius:3px;"></div>
          </div>
          <span style="font-size:9px;color:#6b7280;white-space:nowrap;">${pct}%</span>
        </div>
      </td>
      <td style="padding:6px;text-align:center;">
        <button data-action="bp-show-delete-modal" data-batch-id="${b.id}" data-batch-code="${b.batchCode}" style="font-size:10px;padding:2px 8px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;" onclick="event.stopPropagation()">削除</button>
      </td>
    </tr>`;
  }).join("");

  return `<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>バッチ一覧</h2><p class="panel-caption">${batches.length}件 ／ 行クリックでフロー図表示</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:600px;">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left;">
          <th style="padding:4px 6px;">コード</th><th style="padding:4px 6px;">区分</th>
          <th style="padding:4px 6px;text-align:right;">醸造量</th><th style="padding:4px 6px;">開始日</th>
          <th style="padding:4px 6px;">状態</th><th style="padding:4px 6px;">進捗</th><th style="padding:4px 6px;text-align:center;">操作</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </section>`;
}

// ─── 4. Import from Procurement ──────────────────────────────────────────────

function renderImportSection(schedule: ScheduleEntry[], batches: BrewingBatch[]): string {
  if (schedule.length === 0) return "";
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
}

// ─── 5. New Batch Form ───────────────────────────────────────────────────────

function renderNewBatchForm(categories: string[]): string {
  return `<div class="panel" style="margin-bottom:16px">
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

// ─── 6. Expanded Batch Detail (step table for selected batch) ────────────────

function renderStepDetail(batch: BrewingBatch, steps: BrewingProcessStep[]): string {
  const sorted = [...steps].sort((a, b) => a.stepOrder - b.stepOrder);
  if (sorted.length === 0) return "";

  const rows = sorted.map(s => `<tr style="border-bottom:1px solid #f3f4f6">
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

  const color = catColor(batch.brewCategory);
  return `<section class="panel" style="margin-bottom:16px;border-left:4px solid ${color};">
    <div class="panel-header"><h2>${batch.batchCode} 工程詳細</h2><p class="panel-caption">${batch.brewCategory} ｜ ${fmtNum(batch.plannedVolumeL)}L ｜ ${fmtMD(batch.startDate)}〜${fmtMD(batch.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </section>`;
}

// ─── Main Renderer ───────────────────────────────────────────────────────────

export interface WorkerSettingsView { workerCount: number; weeklyHoursLimit: number; dayStartHour: number; }
export interface StepLaborView { stepName: string; laborHours: number; workerCountNeeded: number; }

function renderWorkerChart(steps: BrewingProcessStep[], workerSettings: WorkerSettingsView, stepLabor: StepLaborView[]): string {
  if (steps.length === 0 || stepLabor.length === 0) return "";
  const laborMap = new Map(stepLabor.map(l => [l.stepName, l]));
  // 週別の作業時間を集計
  const weekHours = new Map<string, number>();
  for (const s of steps) {
    if (!s.plannedStart || !s.plannedEnd) continue;
    const lb = laborMap.get(s.stepName);
    if (!lb) continue;
    const startD = new Date(s.plannedStart);
    const endD = new Date(s.plannedEnd);
    const totalDays = Math.max(Math.round((endD.getTime() - startD.getTime()) / 86400000) + 1, 1);
    // 日曜を除いた稼働日数
    let workDays = 0;
    for (let i = 0; i < totalDays; i++) { const t = new Date(startD.getTime() + i * 86400000); if (t.getDay() !== 0) workDays++; }
    if (workDays === 0) continue;
    const hoursPerDay = lb.laborHours / workDays;
    for (let d = new Date(startD); d <= endD; d = new Date(d.getTime() + 86400000)) {
      if (d.getDay() === 0) continue; // 日曜スキップ
      const tmp = new Date(d); tmp.setDate(tmp.getDate() + 3 - (tmp.getDay() + 6) % 7);
      const w1 = new Date(tmp.getFullYear(), 0, 4);
      const wn = 1 + Math.round(((tmp.getTime() - w1.getTime()) / 86400000 - 3 + (w1.getDay() + 6) % 7) / 7);
      const key = `${tmp.getFullYear()}-W${String(wn).padStart(2, "0")}`;
      weekHours.set(key, (weekHours.get(key) ?? 0) + hoursPerDay);
    }
  }
  if (weekHours.size === 0) return "";
  const weeks = [...weekHours.keys()].sort();
  const maxCap = workerSettings.workerCount * workerSettings.weeklyHoursLimit;
  const maxH = Math.max(...weekHours.values(), maxCap);

  const bars = weeks.map(w => {
    const h = weekHours.get(w) ?? 0;
    const pct = Math.min(h / maxH * 100, 100);
    const over = h > maxCap;
    const color = over ? "#ef4444" : h > maxCap * 0.8 ? "#f59e0b" : "#22c55e";
    const label = w.replace(/^\d{4}-W/, "W");
    return `<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${pct}%;background:${color};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(h)}h / ${maxCap}h"></div>
      </div>
      <div style="font-size:8px;color:#9ca3af;margin-top:2px;">${label}</div>
      <div style="font-size:9px;font-weight:600;color:${over ? "#ef4444" : "#374151"};">${Math.round(h)}h</div>
    </div>`;
  }).join("");

  return `<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header">
      <div><h2>週別労働時間</h2><p class="panel-caption">上限: ${workerSettings.workerCount}名 × ${workerSettings.weeklyHoursLimit}h = ${maxCap}h/週（赤=超過）</p></div>
      <div style="display:flex;gap:6px;align-items:center;font-size:11px;">
        <label>人数 <input type="number" min="1" max="10" value="${workerSettings.workerCount}" data-action="bp-worker-count" style="width:40px;height:22px;font-size:11px;text-align:center;border:1px solid #d1d5db;border-radius:3px;"></label>
        <label>上限h <input type="number" min="20" max="60" value="${workerSettings.weeklyHoursLimit}" data-action="bp-worker-hours" style="width:44px;height:22px;font-size:11px;text-align:center;border:1px solid #d1d5db;border-radius:3px;"></label>
        <label>開始 <input type="number" min="4" max="10" step="0.5" value="${workerSettings.dayStartHour}" data-action="bp-worker-start" style="width:40px;height:22px;font-size:11px;text-align:center;border:1px solid #d1d5db;border-radius:3px;">時</label>
      </div>
    </div>
    <div style="display:flex;gap:2px;overflow-x:auto;padding:4px 0;">
      <div style="width:40px;flex-shrink:0;display:flex;align-items:flex-end;justify-content:flex-end;padding-bottom:18px;">
        <div style="border-top:2px dashed #ef4444;width:100%;position:relative;top:${-60 * (maxCap / maxH) + 60}px;">
          <span style="font-size:7px;color:#ef4444;position:absolute;right:0;top:-10px;">${maxCap}h</span>
        </div>
      </div>
      ${bars}
    </div>
  </section>`;
}

export function renderBrewingProcess(
  batches: BrewingBatch[],
  steps: BrewingProcessStep[],
  categories: string[],
  opts: { expandedBatchId?: string; showNewForm?: boolean; schedule?: ScheduleEntry[]; fy?: number; workerSettings?: WorkerSettingsView; stepLabor?: StepLaborView[] } = {}
): string {
  const { expandedBatchId, showNewForm, schedule = [], fy = 2026, workerSettings = { workerCount: 2, weeklyHoursLimit: 40, dayStartHour: 6 }, stepLabor = [] } = opts;

  const stepsByBatch: Record<string, BrewingProcessStep[]> = {};
  for (const s of steps) { (stepsByBatch[s.batchId] ??= []).push(s); }

  const activeCount = batches.filter(b => b.status === "active").length;
  const plannedCount = batches.filter(b => b.status === "planned").length;
  const completedCount = batches.filter(b => b.status === "completed").length;

  // Network diagram for selected batch
  const selectedBatch = expandedBatchId ? batches.find(b => b.id === expandedBatchId) : null;
  const networkHtml = selectedBatch ? renderNetwork(selectedBatch, stepsByBatch[selectedBatch.id] ?? []) : "";
  const stepDetailHtml = selectedBatch ? renderStepDetail(selectedBatch, stepsByBatch[selectedBatch.id] ?? []) : "";

  return `
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規バッチ</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">進行中</p><p class="kpi-value">${activeCount}</p><p class="kpi-sub">アクティブ</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${plannedCount}</p><p class="kpi-sub">未着手</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${completedCount}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${renderGantt(batches, stepsByBatch, expandedBatchId)}
    ${renderWorkerChart(steps, workerSettings, stepLabor)}
    ${showNewForm ? renderNewBatchForm(categories) : ""}
    ${renderImportSection(schedule, batches)}
    ${networkHtml}
    ${stepDetailHtml}
    ${renderBatchList(batches, stepsByBatch, expandedBatchId)}

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
