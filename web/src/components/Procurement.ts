import type { BrewingRiceParams, BrewingCustomCategory, BrewingScheduleRow, RiceVariety, RicePurchaseCommitment } from "../api";

const CATEGORY_COLORS: Record<string, string> = {
  "純米大吟醸": "#7c3aed", "大吟醸": "#a855f7", "純米吟醸": "#2563eb",
  "純米": "#059669", "本醸造": "#d97706", "普通酒": "#6b7280",
  "リキュール": "#e11d48", "その他": "#9ca3af"
};
const CATEGORY_ORDER = ["純米大吟醸", "大吟醸", "純米吟醸", "純米", "本醸造", "普通酒", "リキュール", "その他"];

// 会計年度の月順（10月〜9月）
const FY_MONTHS = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const MONTH_LABELS = ["10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月"];
// 醸造期間タイムライン用（9月〜5月）
const BREW_MONTHS = [9, 10, 11, 12, 1, 2, 3, 4, 5];
const BREW_MONTH_LABELS = ["9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月"];

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

export function renderProcurement(
  needByCategory: Record<string, number>,
  riceParams: Record<string, BrewingRiceParams>,
  customCategories: BrewingCustomCategory[],
  schedule: BrewingScheduleRow[] = [],
  fy: number = 2026,
  riceVarieties: RiceVariety[] = [],
  commitments: RicePurchaseCommitment[] = [],
  decisions: Record<string, number> = {}
): string {
  // needByCategoryにある区分 + スケジュールだけ入っている区分（新規ブランド等）を統合
  const catSet = new Set([
    ...Object.keys(needByCategory).filter(c => needByCategory[c] > 0),
    ...schedule.filter(s => s.plannedVolumeL > 0).map(s => s.brewCategory)
  ]);
  const allCats = [...catSet];
  if (allCats.length === 0) {
    return `<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>`;
  }

  const order = [...CATEGORY_ORDER, ...customCategories.map(c => c.name)];
  allCats.sort((a, b) => (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b)));

  const defaultP: BrewingRiceParams = {
    brewCategory: "", polishingRatio: 0.70, ricePerLiterKg: 0.50,
    kojiRatio: 0.30, kojiVariety: "山田錦", kojiPricePerKg: 600,
    kakeVariety: "一般米", kakePricePerKg: 350, alcoholAdditionRatio: 0
  };

  // スケジュールを区分→月マップに
  const scheduleMap = new Map<string, BrewingScheduleRow[]>();
  for (const s of schedule) {
    if (!scheduleMap.has(s.brewCategory)) scheduleMap.set(s.brewCategory, []);
    scheduleMap.get(s.brewCategory)!.push(s);
  }

  const inp = (field: string, cat: string, val: number, w: string, step: string) =>
    `<input type="number" step="${step}" value="${val}" data-action="brew-rice-edit" data-cat="${cat}" data-field="${field}"
        style="width:${w};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`;

  const varietySelect = (field: string, cat: string, current: string) =>
    `<select data-action="brew-rice-variety-select" data-cat="${cat}" data-field="${field}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${riceVarieties.map(v => `<option value="${v.name}" ${v.name === current ? "selected" : ""}>${v.name}${v.region ? ` (${v.region})` : ""}</option>`).join("")}
      ${!riceVarieties.some(v => v.name === current) && current ? `<option value="${current}" selected>${current}</option>` : ""}
    </select>`;

  let tKojiWhite = 0, tKakWhite = 0, tKojiBrown = 0, tKakBrown = 0, tKojiCost = 0, tKakCost = 0;
  // 月別集計
  const monthlyBrownKg: number[] = FY_MONTHS.map(() => 0);
  // 品種別集計
  const varietyMap = new Map<string, { brownKg: number; pricePerKg: number; cost: number; usage: Array<{ cat: string; type: string; kg: number }> }>();

  const sections = allCats.map(cat => {
    const needL = needByCategory[cat] ?? 0;
    const p = riceParams[cat] ?? defaultP;
    const color = CATEGORY_COLORS[cat] ?? "#6366f1";
    const catSchedule = scheduleMap.get(cat) ?? [];

    // 醸造量の決定: decisions（確定入力）> スケジュール > 予測
    const hasDecision = cat in decisions;
    const tojiTotalL = catSchedule.reduce((s, r) => s + r.plannedVolumeL, 0);
    const hasSchedule = catSchedule.length > 0;
    const brewingL = hasDecision ? decisions[cat] : (hasSchedule ? tojiTotalL : needL);

    // アル添比率: この分は米由来ではない
    const alcRatio = p.alcoholAdditionRatio ?? 0;
    const riceBasedL = brewingL * (1 - alcRatio);

    const whiteKg = Math.round(riceBasedL * p.ricePerLiterKg);
    const kojiWhiteKg = Math.round(whiteKg * p.kojiRatio);
    const kakeWhiteKg = whiteKg - kojiWhiteKg;
    const kojiBrownKg = Math.round(kojiWhiteKg / p.polishingRatio);
    const kakeBrownKg = Math.round(kakeWhiteKg / p.polishingRatio);
    const totalBrownKg = kojiBrownKg + kakeBrownKg;
    const kojiCost = Math.round(kojiBrownKg * p.kojiPricePerKg);
    const kakeCost = Math.round(kakeBrownKg * p.kakePricePerKg);

    tKojiWhite += kojiWhiteKg; tKakWhite += kakeWhiteKg;
    tKojiBrown += kojiBrownKg; tKakBrown += kakeBrownKg;
    tKojiCost += kojiCost; tKakCost += kakeCost;

    // 品種別に蓄積
    for (const [variety, kg, price, type] of [
      [p.kojiVariety, kojiBrownKg, p.kojiPricePerKg, "麹米"] as const,
      [p.kakeVariety, kakeBrownKg, p.kakePricePerKg, "掛米"] as const
    ]) {
      if (kg <= 0) continue;
      if (!varietyMap.has(variety)) varietyMap.set(variety, { brownKg: 0, pricePerKg: price, cost: 0, usage: [] });
      const v = varietyMap.get(variety)!;
      v.brownKg += kg;
      v.cost += Math.round(kg * price);
      v.pricePerKg = Math.round((v.cost) / v.brownKg); // 加重平均単価
      v.usage.push({ cat, type, kg });
    }

    // 月別の醸造量配分（スケジュールがあればそれに従う、なければ均等配分）
    const monthlyL: number[] = FY_MONTHS.map(() => 0);
    if (catSchedule.length > 0) {
      for (const s of catSchedule) {
        const idx = FY_MONTHS.indexOf(s.brewMonth);
        if (idx >= 0) monthlyL[idx] += s.plannedVolumeL;
      }
    } else {
      // 均等配分（全月）
      const perMonth = brewingL / 12;
      for (let i = 0; i < 12; i++) monthlyL[i] = perMonth;
    }

    // 月別の玄米必要量
    const totalL = monthlyL.reduce((s, v) => s + v, 0) || 1;
    for (let i = 0; i < 12; i++) {
      const ratio = monthlyL[i] / totalL;
      monthlyBrownKg[i] += Math.round(totalBrownKg * ratio);
    }


    return `
      <div class="card" style="border-top:3px solid ${color};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${color};">${cat}</h4>
          <div style="font-size:12px;">${brewingL > 0 ? `予算 <strong>¥${fmtNum(kojiCost + kakeCost)}</strong>` : `<span style="color:#6b7280;font-weight:600;">醸造しない</span>`}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(brewingL)}"
              data-action="proc-edit-vol" data-cat="${cat}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${hasDecision ? "#2563eb" : "var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${hasDecision ? "background:rgba(37,99,235,0.04);" : ""}" />L
          </label>
          ${alcRatio > 0 ? `<span style="color:var(--text-secondary);">−${Math.round(alcRatio*100)}%→${fmtNum(Math.round(riceBasedL))}L</span>` : ""}
          ${needL > 0 && Math.abs(needL - brewingL) > 10 ? `<span style="color:var(--text-secondary);font-size:11px;">(予測${fmtNum(Math.round(needL))})</span>` : ""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${color};margin-bottom:6px;">醸造スケジュール${catSchedule.length > 0 ? ` (${fmtNum(Math.round(catSchedule.reduce((s, r) => s + r.plannedVolumeL, 0)))}L / ${fmtNum(Math.round(brewingL))}L)` : ""}</div>
          ${catSchedule.length > 0 ? `
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${catSchedule.map(s => `
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${color}15;border:1px solid ${color}30;">
                  <span style="font-size:11px;font-weight:600;color:${color};">${s.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(brewingL)}" step="100" value="${Math.round(s.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${cat}" data-month="${s.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${cat}" data-month="${s.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          ` : `<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>`}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${cat}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(m => !catSchedule.some(s => s.brewMonth === m)).map(m => `<option value="${m}">${m}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(brewingL)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${cat}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${cat}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${color};background:${color}10;color:${color};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${inp("ricePerLiterKg", cat, p.ricePerLiterKg, "48px", "0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${inp("kojiRatio", cat, p.kojiRatio, "44px", "0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${inp("polishingRatio", cat, p.polishingRatio, "44px", "0.01")}</label>
          ${alcRatio > 0 || cat === '本醸造' || cat === '普通酒' ? `<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${inp("alcoholAdditionRatio", cat, p.alcoholAdditionRatio ?? 0, "44px", "0.01")}</label>` : ""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${varietySelect("kojiVariety", cat, p.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${inp("kojiPricePerKg", cat, p.kojiPricePerKg, "52px", "10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${fmtNum(kojiBrownKg)}kg</strong> <span style="color:var(--text-secondary);">(${(kojiBrownKg/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${fmtNum(kojiCost)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${varietySelect("kakeVariety", cat, p.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${inp("kakePricePerKg", cat, p.kakePricePerKg, "52px", "10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${fmtNum(kakeBrownKg)}kg</strong> <span style="color:var(--text-secondary);">(${(kakeBrownKg/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${fmtNum(kakeCost)}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const totalBrown = tKojiBrown + tKakBrown;
  const totalCost = tKojiCost + tKakCost;

  // 月別米調達バー
  const maxMonthly = Math.max(...monthlyBrownKg, 1);
  const monthlyChart = FY_MONTHS.map((m, i) => {
    const kg = monthlyBrownKg[i];
    const pct = (kg / maxMonthly) * 100;
    return `
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${pct}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${kg > 0 ? 2 : 0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${MONTH_LABELS[i]}</div>
        <div style="font-size:10px;font-weight:600;">${kg > 0 ? fmtNum(kg) : ""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${kg > 0 ? (kg/60).toFixed(0) + "俵" : ""}</div>
      </div>
    `;
  }).join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">製造管理</p>
        <h1>原料米 調達計画 — ${fy}年度</h1>
      </div>
    </section>

    <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:10px;background:var(--surface-alt);border-radius:8px;">
      <span style="font-size:12px;font-weight:600;">一括設定:</span>
      <label style="font-size:12px;display:flex;align-items:center;gap:4px;">
        白米/L <input id="rice-bulk-per-l" type="number" min="0.1" max="2" step="0.01" value="0.50"
          style="width:56px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />
      </label>
      <label style="font-size:12px;display:flex;align-items:center;gap:4px;">
        麹比率 <input id="rice-bulk-koji" type="number" min="0.05" max="0.5" step="0.01" value="0.30"
          style="width:56px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />
      </label>
      <button data-action="brew-rice-bulk-apply" class="button primary"
        style="font-size:12px;padding:4px 12px;">全区分に適用</button>
    </div>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>醸造タイムライン（9月〜5月）</h2><p class="panel-caption">バーをドラッグで移動・端をドラッグでリサイズ・タップ/ダブルクリックで量編集</p></div>
      <div id="gantt-timeline" style="overflow-x:auto;user-select:none;-webkit-user-select:none;touch-action:none;">
        <div style="display:grid;grid-template-columns:80px repeat(${BREW_MONTHS.length},1fr);font-size:11px;min-width:500px;">
          <div style="padding:4px;font-weight:600;">区分</div>
          ${BREW_MONTH_LABELS.map(l => `<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${l}</div>`).join("")}
        </div>
        ${(() => {
          const rows: string[] = [];
          const nCols = BREW_MONTHS.length;
          // 米入荷行
          const deliveryByVariety = new Map<string, number[]>();
          for (const c of commitments) {
            if (!c.deliveryMonth) continue;
            if (!deliveryByVariety.has(c.varietyName)) deliveryByVariety.set(c.varietyName, []);
            deliveryByVariety.get(c.varietyName)!.push(c.deliveryMonth);
          }
          for (const [variety, months] of deliveryByVariety) {
            const cells = BREW_MONTHS.map(m => {
              const has = months.includes(m);
              const bales = commitments.filter(c => c.varietyName === variety && c.deliveryMonth === m).reduce((s, c) => s + c.committedBales, 0);
              return `<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${has ? "background:#dcfce7;" : ""}">
                ${has ? `<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${bales}俵</div>` : ""}
              </div>`;
            }).join("");
            rows.push(`<div style="display:grid;grid-template-columns:80px repeat(${nCols},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${variety}</div>${cells}
            </div>`);
          }
          // 醸造行（バー重なり→段組み対応）
          const BAR_H = 34;
          const BAR_GAP = 2;
          for (const cat of allCats) {
            const catSched = scheduleMap.get(cat) ?? [];
            const color = CATEGORY_COLORS[cat] ?? "#6366f1";
            const hasDec = cat in decisions;
            const tojiL = catSched.reduce((s, r) => s + r.plannedVolumeL, 0);
            const hasSched = catSched.length > 0;
            const maxL = hasDec ? decisions[cat] : (hasSched ? tojiL : (needByCategory[cat] ?? 0));
            // 各バーのレーン割当（重なったら下段へ）
            type BarInfo = { s: typeof catSched[0]; startIdx: number; dur: number; lane: number };
            const barInfos: BarInfo[] = [];
            const sorted = [...catSched].sort((a, b) => BREW_MONTHS.indexOf(a.brewMonth) - BREW_MONTHS.indexOf(b.brewMonth));
            const laneEnds: number[] = []; // laneEnds[i] = end index of last bar in lane i
            for (const s of sorted) {
              const startIdx = BREW_MONTHS.indexOf(s.brewMonth);
              if (startIdx < 0) continue;
              const dur = Math.min(s.durationMonths, nCols - startIdx);
              const endIdx = startIdx + dur;
              let lane = 0;
              while (lane < laneEnds.length && laneEnds[lane] > startIdx) lane++;
              if (lane >= laneEnds.length) laneEnds.push(endIdx);
              else laneEnds[lane] = endIdx;
              barInfos.push({ s, startIdx, dur, lane });
            }
            const numLanes = Math.max(laneEnds.length, 1);
            const rowH = numLanes * (BAR_H + BAR_GAP) + BAR_GAP;
            // グリッド背景
            const gridCells = BREW_MONTHS.map(() =>
              `<div style="border-left:1px solid var(--border);height:${rowH}px;"></div>`
            ).join("");
            // バー要素
            const bars = barInfos.map(({ s, startIdx, dur, lane }) => {
              const leftPct = (startIdx / nCols * 100).toFixed(2);
              const widthPct = (dur / nCols * 100).toFixed(2);
              const topPx = BAR_GAP + lane * (BAR_H + BAR_GAP);
              return `<div class="gantt-bar" data-cat="${cat}" data-month="${s.brewMonth}" data-dur="${dur}" data-vol="${Math.round(s.plannedVolumeL)}" data-max="${Math.round(maxL)}"
                style="position:absolute;left:${leftPct}%;width:${widthPct}%;top:${topPx}px;height:${BAR_H}px;
                  background:${color}30;border:2px solid ${color};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${color};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${fmtNum(Math.round(s.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`;
            }).join("");
            rows.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${color};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${cat}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${nCols},1fr);">
                ${gridCells}
                <div class="gantt-bar-container" data-cat="${cat}" data-max="${Math.round(maxL)}" data-cols="${nCols}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${bars}
                </div>
              </div>
            </div>`);
          }
          return rows.join("") || `<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>`;
        })()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(() => {
        // 全区分のデータを集めてバーチャート
        const barData = allCats.map(cat => {
          const p = riceParams[cat] ?? defaultP;
          const catSched = scheduleMap.get(cat) ?? [];
          const hasDec = cat in decisions;
          const tojiL = catSched.reduce((s, r) => s + r.plannedVolumeL, 0);
          const hasSched = catSched.length > 0;
          const bL = hasDec ? decisions[cat] : (hasSched ? tojiL : (needByCategory[cat] ?? 0));
          const riceL = bL * (1 - (p.alcoholAdditionRatio ?? 0));
          const whiteKg = Math.round(riceL * p.ricePerLiterKg);
          const brownKg = Math.round(whiteKg / p.polishingRatio);
          return { cat, brewingL: bL, brownKg, color: CATEGORY_COLORS[cat] ?? "#6366f1" };
        }).filter(d => d.brewingL > 0 || d.brownKg > 0);
        const maxBrown = Math.max(...barData.map(d => d.brownKg), 1);
        return barData.map(d => {
          const pct = Math.min(d.brownKg / maxBrown * 100, 100);
          return `
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${d.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${d.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${d.color};opacity:0.7;height:100%;width:${pct}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${fmtNum(d.brownKg)}kg (${Math.ceil(d.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${fmtNum(Math.round(d.brewingL))}L</span>
            </div>
          `;
        }).join("");
      })()}
    </section>

    ${sections}

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>品種別 仕入リスト</h2><p class="panel-caption">どの品種の米をどれくらい仕入れるか</p></div>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>品種</th>
              <th style="text-align:right;">玄米(kg)</th>
              <th style="text-align:right;">俵数</th>
              <th style="text-align:right;">平均単価</th>
              <th style="text-align:right;">金額</th>
              <th>用途内訳</th>
            </tr>
          </thead>
          <tbody>
            ${[...varietyMap.entries()].sort((a, b) => b[1].brownKg - a[1].brownKg).map(([variety, v]) => {
              const bales = (v.brownKg / 60).toFixed(1);
              const breakdown = v.usage.map(u =>
                `<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${u.type === "麹米" ? "rgba(99,102,241,0.08)" : "rgba(183,121,31,0.08)"};margin-right:3px;">${u.cat}/${u.type} ${fmtNum(u.kg)}kg</span>`
              ).join("");
              return `
                <tr>
                  <td style="font-weight:600;">${variety}</td>
                  <td style="text-align:right;font-weight:600;">${fmtNum(v.brownKg)}</td>
                  <td style="text-align:right;">${bales}</td>
                  <td style="text-align:right;">¥${fmtNum(v.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${fmtNum(v.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${breakdown}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${fmtNum(totalBrown)}</td>
              <td style="text-align:right;">${Math.ceil(totalBrown / 60)}</td>
              <td></td>
              <td style="text-align:right;">¥${fmtNum(totalCost)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>集計</h2></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
        <div style="background:rgba(99,102,241,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#6366f1;font-weight:600;">麹米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${fmtNum(tKojiBrown)}kg</strong> <span style="color:var(--text-secondary);">(${(tKojiBrown/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${fmtNum(tKojiCost)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${fmtNum(tKakBrown)}kg</strong> <span style="color:var(--text-secondary);">(${(tKakBrown/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${fmtNum(tKakCost)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${fmtNum(totalBrown)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(totalBrown/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${fmtNum(totalCost)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(totalCost/10000).toFixed(0)}万)</span></div>
        </div>
      </div>
    </section>

    <section class="panel" style="margin-top:16px;">
      <div class="panel-header">
        <div>
          <h2>作付け予定 vs 必要量</h2>
          <p class="panel-caption">購入確定分（作付け）に対して、醸造計画でどれだけ消費するか</p>
        </div>
      </div>
      ${(() => {
        // 品種別の必要量（上のvarietyMapから）
        const needed = new Map<string, number>();
        for (const [variety, v] of varietyMap) needed.set(variety, v.brownKg);

        // 作付け予定
        const committedByVariety = new Map<string, { bales: number; kg: number; cost: number; suppliers: string[] }>();
        for (const c of commitments) {
          if (!committedByVariety.has(c.varietyName)) committedByVariety.set(c.varietyName, { bales: 0, kg: 0, cost: 0, suppliers: [] });
          const cv = committedByVariety.get(c.varietyName)!;
          cv.bales += c.committedBales;
          cv.kg += c.committedBales * 60;
          cv.cost += c.committedBales * 60 * c.pricePerKg;
          if (c.supplier && !cv.suppliers.includes(c.supplier)) cv.suppliers.push(c.supplier);
        }

        // 全品種（確定 + 必要）
        const allVarieties = [...new Set([...needed.keys(), ...committedByVariety.keys()])];
        let totalCommittedKg = 0, totalNeededKg = 0, totalSaved = 0;

        const rows = allVarieties.map(variety => {
          const neededKg = needed.get(variety) ?? 0;
          const committed = committedByVariety.get(variety);
          const committedKg = committed?.kg ?? 0;
          const surplus = committedKg - neededKg;
          totalCommittedKg += committedKg;
          totalNeededKg += neededKg;
          if (surplus > 0) totalSaved += surplus;

          const surplusColor = surplus >= 0 ? "#22c55e" : "#ef4444";
          const surplusLabel = surplus >= 0 ? `+${fmtNum(Math.round(surplus))}kg余裕` : `${fmtNum(Math.round(surplus))}kg不足`;

          // 使用率バー
          const usePct = committedKg > 0 ? Math.min(neededKg / committedKg * 100, 100) : 0;

          return `
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${variety}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${fmtNum(Math.round(committedKg))}kg (${committed?.bales ?? 0}俵)</span>
                  <span>必要 ${fmtNum(Math.round(neededKg))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${usePct}%;background:${committedKg > 0 ? (surplus >= 0 ? "#22c55e" : "#ef4444") : "#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${surplusColor};">${committedKg > 0 ? surplusLabel : "未確保"}</span>
            </div>
          `;
        }).join("");

        const totalSurplus = totalCommittedKg - totalNeededKg;

        return `
          <div style="margin-bottom:12px;">
            ${rows || `<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>`}
          </div>
          ${totalCommittedKg > 0 ? `
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${fmtNum(Math.round(totalCommittedKg))}kg</strong> (${Math.ceil(totalCommittedKg/60)}俵)</span>
              <span>必要合計: <strong>${fmtNum(Math.round(totalNeededKg))}kg</strong></span>
              <span style="color:${totalSurplus >= 0 ? "#22c55e" : "#ef4444"};font-weight:600;">
                ${totalSurplus >= 0 ? `余裕 ${fmtNum(Math.round(totalSurplus))}kg` : `不足 ${fmtNum(Math.round(-totalSurplus))}kg`}
              </span>
            </div>
          ` : ""}
          <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap;">
            <select id="proc-commit-variety" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;">
              ${riceVarieties.map(v => `<option value="${v.name}">${v.name}</option>`).join("")}
            </select>
            <input id="proc-commit-bales" type="number" min="0" step="1" placeholder="俵数"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <input id="proc-commit-price" type="number" min="0" step="10" placeholder="円/kg"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <select id="proc-commit-month" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">
              <option value="">入荷月</option>
              ${FY_MONTHS.map((m, i) => `<option value="${m}">${MONTH_LABELS[i]}</option>`).join("")}
            </select>
            <input id="proc-commit-supplier" type="text" placeholder="仕入先"
              style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <button data-action="proc-add-commitment" class="button primary"
              style="font-size:12px;padding:4px 12px;">追加</button>
          </div>
        `;
      })()}
    </section>

    <section class="panel" style="margin-top:16px;">
      <div class="panel-header"><h2>米品種マスタ</h2><p class="panel-caption">プルダウンに表示される品種の追加・削除</p></div>
      <div style="margin-bottom:8px;">
        ${riceVarieties.map(v => `
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${v.name}</strong>
            <span style="color:var(--text-secondary);">¥${fmtNum(v.defaultPricePerKg)}/kg</span>
            ${v.region ? `<span style="color:var(--text-secondary);font-size:10px;">${v.region}</span>` : ""}
            <button data-action="proc-delete-variety" data-id="${v.id}"
              style="border:none;background:none;cursor:pointer;color:#ef4444;font-size:12px;padding:0 2px;">×</button>
          </div>
        `).join("")}
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <input id="proc-variety-name" type="text" placeholder="品種名"
          style="font-size:12px;padding:6px 10px;border:1px solid var(--border);border-radius:4px;width:120px;" />
        <input id="proc-variety-price" type="number" step="10" placeholder="円/kg"
          style="font-size:12px;padding:6px 10px;border:1px solid var(--border);border-radius:4px;width:80px;text-align:right;" />
        <button data-action="proc-add-variety" class="button primary"
          style="font-size:12px;padding:6px 12px;">追加</button>
      </div>
    </section>

    <section class="panel" style="margin-top:16px;">
      <div class="panel-header"><h2>区分を追加</h2><p class="panel-caption">新しい銘柄・ブランドの醸造を追加</p></div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <input id="proc-new-cat-name" type="text" placeholder="区分名（例: 新ブランドA）"
          style="font-size:12px;padding:6px 10px;border:1px solid var(--border);border-radius:4px;width:180px;" />
        <input id="proc-new-cat-vol" type="number" min="0" step="100" placeholder="醸造予定(L)"
          style="font-size:12px;padding:6px 10px;border:1px solid var(--border);border-radius:4px;width:120px;text-align:right;" />
        <button data-action="proc-add-new-cat" class="button primary"
          style="font-size:12px;padding:6px 14px;">追加</button>
      </div>
    </section>
  `;
}
