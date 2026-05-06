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

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "純米大吟醸": "#7c3aed",
  "大吟醸": "#a855f7",
  "純米吟醸": "#2563eb",
  "純米": "#059669",
  "本醸造": "#d97706",
  "普通酒": "#6b7280",
  "リキュール": "#e11d48",
  "その他": "#9ca3af",
};

const STATUS_LABELS: Record<BrewingBatch["status"], string> = {
  planned: "計画中",
  active: "進行中",
  completed: "完了",
};

const STATUS_PILL: Record<BrewingBatch["status"], string> = {
  planned: "neutral",
  active: "warning",
  completed: "success",
};

const STEP_COLORS: Record<BrewingProcessStep["status"], string> = {
  "未着手": "#e5e7eb",
  "進行中": "#3b82f6",
  "完了": "#22c55e",
};

const DAY_COL_PX = 12;

// ─── Utilities ───────────────────────────────────────────────────────────────

function fmtNum(n: number): string {
  return n.toLocaleString("ja-JP");
}

function daysBetween(a: string, b: string): number {
  const msA = new Date(a).getTime();
  const msB = new Date(b).getTime();
  return Math.round((msB - msA) / 86_400_000);
}

function addDays(base: string, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function catColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? "#9ca3af";
}

// ─── Sub-renderers ───────────────────────────────────────────────────────────

function renderBatchCard(
  batch: BrewingBatch,
  batchSteps: BrewingProcessStep[],
  expanded: boolean
): string {
  const sorted = [...batchSteps].sort((a, b) => a.stepOrder - b.stepOrder);
  const totalSteps = sorted.length;
  const doneSteps = sorted.filter((s) => s.status === "完了").length;
  const pct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;
  const currentStep = sorted.find((s) => s.status === "進行中");
  const color = catColor(batch.brewCategory);

  return `
    <article class="panel" style="border-left:4px solid ${color};margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:12px;cursor:pointer"
           data-action="bp-toggle-detail" data-batch-id="${batch.id}">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <strong style="font-size:1.05rem">${batch.batchCode}</strong>
            <span style="background:${color};color:#fff;font-size:0.7rem;padding:2px 8px;border-radius:9999px">
              ${batch.brewCategory}
            </span>
            <span class="status-pill ${STATUS_PILL[batch.status]}">${STATUS_LABELS[batch.status]}</span>
          </div>
          <div style="font-size:0.82rem;color:#6b7280;margin-top:4px">
            タンク ${batch.tankNo} ｜ ${fmtNum(batch.plannedVolumeL)} L ｜ ${batch.startDate} 〜 ${batch.targetEndDate}
          </div>
        </div>
        <div style="width:140px;flex-shrink:0;text-align:right">
          <div style="font-size:0.75rem;color:#6b7280;margin-bottom:2px">
            ${doneSteps}/${totalSteps} 工程 ${currentStep ? "▸ " + currentStep.stepName : ""}
          </div>
          <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:${color};border-radius:3px"></div>
          </div>
        </div>
        <span style="font-size:1.1rem;color:#9ca3af">${expanded ? "▲" : "▼"}</span>
      </div>
      ${expanded ? renderBatchDetail(batch, sorted) : ""}
    </article>`;
}

function renderBatchDetail(
  batch: BrewingBatch,
  steps: BrewingProcessStep[]
): string {
  if (steps.length === 0) {
    return `<div style="padding:16px 0;color:#9ca3af;font-size:0.85rem">工程が登録されていません</div>`;
  }

  // Compute timeline range from all steps
  const allDates = steps.flatMap((s) => [s.plannedStart, s.plannedEnd].filter(Boolean));
  if (allDates.length === 0) {
    return `<div style="padding:16px 0;color:#9ca3af;font-size:0.85rem">日程未設定</div>`;
  }
  allDates.sort();
  const origin = allDates[0];
  const last = allDates[allDates.length - 1];
  const totalDays = Math.max(daysBetween(origin, last) + 1, 1);
  const cappedDays = Math.min(totalDays, 80);
  const gridW = cappedDays * DAY_COL_PX;

  // Month labels
  const monthLabels: string[] = [];
  let prevLabel = "";
  for (let d = 0; d < cappedDays; d++) {
    const dt = addDays(origin, d);
    const label = dt.slice(5, 7) + "/" + dt.slice(8, 10);
    const monthKey = dt.slice(0, 7);
    if (monthKey !== prevLabel) {
      monthLabels.push(
        `<span style="position:absolute;left:${d * DAY_COL_PX}px;font-size:0.65rem;color:#9ca3af;white-space:nowrap">${dt.slice(5, 7)}月</span>`
      );
      prevLabel = monthKey;
    }
  }

  // Step rows
  const stepRows = steps
    .map((s) => {
      const startOff = Math.max(daysBetween(origin, s.plannedStart), 0);
      const endOff = Math.min(daysBetween(origin, s.plannedEnd), cappedDays - 1);
      const barLeft = startOff * DAY_COL_PX;
      const barWidth = Math.max((endOff - startOff + 1) * DAY_COL_PX, DAY_COL_PX);
      const barColor = STEP_COLORS[s.status];
      const textColor = s.status === "未着手" ? "#374151" : "#fff";

      return `
      <div style="display:flex;align-items:center;gap:0;margin-bottom:2px;min-height:28px">
        <div style="width:120px;flex-shrink:0;font-size:0.78rem;padding-right:6px;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis${
          s.status === "進行中" ? ";font-weight:700;color:#2563eb" : ""
        }">${s.stepName}</div>
        <div style="position:relative;width:${gridW}px;height:22px;background:repeating-linear-gradient(90deg,#f3f4f6 0 ${DAY_COL_PX - 1}px,#e5e7eb ${DAY_COL_PX - 1}px ${DAY_COL_PX}px);border-radius:3px">
          <div style="position:absolute;left:${barLeft}px;top:2px;width:${barWidth}px;height:18px;background:${barColor};border-radius:3px;color:${textColor};font-size:0.65rem;line-height:18px;padding:0 4px;overflow:hidden;white-space:nowrap">
            ${s.plannedStart.slice(5)} – ${s.plannedEnd.slice(5)}
          </div>
        </div>
      </div>`;
    })
    .join("");

  // Step detail table
  const stepDetailRows = steps
    .map(
      (s) => `
    <tr style="border-bottom:1px solid #f3f4f6">
      <td style="padding:6px 8px;font-size:0.82rem;font-weight:${s.status === "進行中" ? 700 : 400}">${s.stepName}</td>
      <td style="padding:6px 8px;font-size:0.78rem;color:#6b7280">${s.plannedStart} 〜 ${s.plannedEnd}</td>
      <td style="padding:6px 8px;font-size:0.78rem;color:#6b7280">${s.actualStart || "―"} 〜 ${s.actualEnd || "―"}</td>
      <td style="padding:6px 4px">
        <select data-action="bp-step-status" data-step-id="${s.id}" style="font-size:0.78rem;padding:2px 4px;border:1px solid #d1d5db;border-radius:4px">
          ${(["未着手", "進行中", "完了"] as const).map(
            (opt) => `<option value="${opt}"${s.status === opt ? " selected" : ""}>${opt}</option>`
          ).join("")}
        </select>
      </td>
      <td style="padding:6px 4px">
        <input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${s.id}"
               value="${s.temperature ?? ""}" placeholder="℃"
               style="width:60px;font-size:0.78rem;padding:2px 4px;border:1px solid #d1d5db;border-radius:4px">
      </td>
      <td style="padding:6px 4px">
        <input type="text" data-action="bp-step-notes" data-step-id="${s.id}"
               value="${s.notes}" placeholder="メモ"
               style="width:120px;font-size:0.78rem;padding:2px 4px;border:1px solid #d1d5db;border-radius:4px">
      </td>
    </tr>`
    )
    .join("");

  return `
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e5e7eb">
      <!-- Gantt -->
      <div style="overflow-x:auto;margin-bottom:16px">
        <div style="position:relative;height:18px;width:${gridW}px;margin-left:120px;margin-bottom:4px">
          ${monthLabels.join("")}
        </div>
        ${stepRows}
      </div>
      <!-- Step table -->
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:2px solid #e5e7eb;font-size:0.75rem;color:#6b7280;text-align:left">
            <th style="padding:4px 8px">工程</th>
            <th style="padding:4px 8px">予定</th>
            <th style="padding:4px 8px">実績</th>
            <th style="padding:4px 4px">ステータス</th>
            <th style="padding:4px 4px">温度</th>
            <th style="padding:4px 4px">メモ</th>
          </tr>
        </thead>
        <tbody>${stepDetailRows}</tbody>
      </table>
      ${batch.notes ? `<div style="margin-top:8px;font-size:0.8rem;color:#6b7280">備考: ${batch.notes}</div>` : ""}
    </div>`;
}

function renderNewBatchForm(categories: string[]): string {
  const options = categories
    .map((c) => `<option value="${c}">${c}</option>`)
    .join("");

  return `
    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header">新規バッチ登録</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;padding:12px 0">
        <label style="font-size:0.82rem">
          カテゴリ
          <select data-field="bp-category" style="width:100%;margin-top:4px;padding:6px;border:1px solid #d1d5db;border-radius:6px;font-size:0.85rem">
            ${options}
          </select>
        </label>
        <label style="font-size:0.82rem">
          バッチコード
          <input type="text" data-field="bp-batch-code" placeholder="R8-J01"
                 style="width:100%;margin-top:4px;padding:6px;border:1px solid #d1d5db;border-radius:6px;font-size:0.85rem">
        </label>
        <label style="font-size:0.82rem">
          計画数量 (L)
          <input type="number" data-field="bp-volume" placeholder="1800"
                 style="width:100%;margin-top:4px;padding:6px;border:1px solid #d1d5db;border-radius:6px;font-size:0.85rem">
        </label>
        <label style="font-size:0.82rem">
          開始日
          <input type="date" data-field="bp-start-date"
                 style="width:100%;margin-top:4px;padding:6px;border:1px solid #d1d5db;border-radius:6px;font-size:0.85rem">
        </label>
      </div>
      <div style="text-align:right;padding-top:4px">
        <button class="button" data-action="bp-create-batch">登録</button>
      </div>
    </div>`;
}

// ─── Main Renderer ───────────────────────────────────────────────────────────

export function renderBrewingProcess(
  batches: BrewingBatch[],
  steps: BrewingProcessStep[],
  categories: string[],
  opts: { expandedBatchId?: string; showNewForm?: boolean } = {}
): string {
  const { expandedBatchId, showNewForm } = opts;

  // Build step lookup
  const stepsByBatch: Record<string, BrewingProcessStep[]> = {};
  for (const s of steps) {
    (stepsByBatch[s.batchId] ??= []).push(s);
  }

  // KPI counts
  const activeCount = batches.filter((b) => b.status === "active").length;
  const plannedCount = batches.filter((b) => b.status === "planned").length;
  const completedCount = batches.filter((b) => b.status === "completed").length;

  // Group non-completed batches by category
  const visibleBatches = batches.filter((b) => b.status !== "completed");
  const grouped: Record<string, BrewingBatch[]> = {};
  for (const b of visibleBatches) {
    (grouped[b.brewCategory] ??= []).push(b);
  }
  const orderedCats = categories.filter((c) => grouped[c]?.length);

  // Render category groups
  const groupHtml = orderedCats
    .map((cat) => {
      const catBatches = grouped[cat];
      const cards = catBatches
        .map((b) =>
          renderBatchCard(b, stepsByBatch[b.id] ?? [], expandedBatchId === b.id)
        )
        .join("");
      return `
        <div style="margin-bottom:20px">
          <h3 style="font-size:0.9rem;color:${catColor(cat)};margin-bottom:8px;border-bottom:2px solid ${catColor(cat)};padding-bottom:4px;display:inline-block">
            ${cat}（${catBatches.length}）
          </h3>
          ${cards}
        </div>`;
    })
    .join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>醸造工程管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button" data-action="bp-show-new-form">＋ 新規バッチ</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">進行中</p>
        <p class="kpi-value">${activeCount} 本</p>
        <p class="kpi-sub">アクティブバッチ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${plannedCount} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${completedCount} 本</p>
        <p class="kpi-sub">今期累計</p>
      </article>
    </section>

    ${showNewForm ? renderNewBatchForm(categories) : ""}

    <section>
      ${groupHtml || '<div class="panel" style="padding:24px;text-align:center;color:#9ca3af">バッチが登録されていません</div>'}
    </section>`;
}
