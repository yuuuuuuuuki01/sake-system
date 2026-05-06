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

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

export function renderProcurement(
  needByCategory: Record<string, number>,
  riceParams: Record<string, BrewingRiceParams>,
  customCategories: BrewingCustomCategory[],
  schedule: BrewingScheduleRow[] = [],
  fy: number = 2026,
  riceVarieties: RiceVariety[] = [],
  commitments: RicePurchaseCommitment[] = []
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

    // 杜氏の醸造予定量（スケジュールにplanned_volume_lがあればそれ、なければ必要醸造量を使用）
    const tojiTotalL = catSchedule.reduce((s, r) => s + r.plannedVolumeL, 0);
    // スケジュールが存在すればその値（0含む=醸造しない判断）、なければ予測値
    const hasSchedule = catSchedule.length > 0;
    const brewingL = hasSchedule ? tojiTotalL : needL;

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

    // 醸造月バー
    const monthBar = FY_MONTHS.map((m, i) => {
      const vol = monthlyL[i];
      const hasSchedule = catSchedule.some(s => s.brewMonth === m);
      return `<td style="text-align:center;padding:2px;${vol > 0 ? `background:${color}18;` : ""}">
        ${hasSchedule ? `<div style="font-size:10px;font-weight:600;color:${color};">${fmtNum(Math.round(vol))}</div>` : vol > 0 ? `<div style="font-size:9px;color:var(--text-secondary);">${fmtNum(Math.round(vol))}</div>` : ""}
      </td>`;
    }).join("");

    // スケジュール入力行
    const scheduleInputs = `
      <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;margin-top:6px;">
        <select data-action="proc-add-month-select" data-cat="${cat}" style="font-size:11px;height:24px;border:1px solid var(--border);border-radius:3px;">
          <option value="">+月追加</option>
          ${FY_MONTHS.map((m, i) => `<option value="${m}">${MONTH_LABELS[i]}</option>`).join("")}
        </select>
        <input data-action="proc-add-month-vol" data-cat="${cat}" type="number" min="0" step="100" placeholder="醸造L"
          style="width:70px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
        <button data-action="proc-add-schedule" data-cat="${cat}"
          style="font-size:10px;padding:2px 8px;border:none;border-radius:3px;background:${color};color:#fff;cursor:pointer;">追加</button>
        ${catSchedule.map(s => `
          <span style="font-size:10px;padding:2px 6px;border-radius:3px;background:${color}18;color:${color};display:inline-flex;align-items:center;gap:2px;">
            ${s.brewMonth}月:${fmtNum(Math.round(s.plannedVolumeL))}L
            <button data-action="proc-remove-schedule" data-cat="${cat}" data-month="${s.brewMonth}"
              style="border:none;background:none;cursor:pointer;color:#ef4444;font-size:11px;padding:0 1px;">×</button>
          </span>
        `).join("")}
      </div>
    `;

    return `
      <div class="card" style="border-top:3px solid ${color};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${color};">${cat}</h4>
          <div style="font-size:12px;">${brewingL > 0 ? `予算 <strong>¥${fmtNum(kojiCost + kakeCost)}</strong>` : `<span style="color:#6b7280;font-weight:600;">醸造しない</span>`}</div>
        </div>
        <div style="display:flex;gap:10px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(brewingL)}"
              data-action="proc-edit-vol" data-cat="${cat}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;font-weight:600;" />L
          </label>
          ${alcRatio > 0 ? `
            <span style="color:var(--text-secondary);">− アル添${Math.round(alcRatio * 100)}%</span>
            <span style="font-weight:600;">= 米由来 ${fmtNum(Math.round(riceBasedL))}L</span>
          ` : ""}
          ${needL > 0 && needL !== brewingL ? `<span style="color:var(--text-secondary);">(予測: ${fmtNum(Math.round(needL))}L)</span>` : ""}
        </div>

        <div style="overflow-x:auto;margin-bottom:8px;">
          <table style="width:100%;font-size:10px;border-collapse:collapse;">
            <tr>${MONTH_LABELS.map(l => `<th style="text-align:center;padding:2px;font-weight:500;color:var(--text-secondary);">${l}</th>`).join("")}</tr>
            <tr>${monthBar}</tr>
          </table>
        </div>
        ${scheduleInputs}

        <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${inp("ricePerLiterKg", cat, p.ricePerLiterKg, "52px", "0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹比率 ${inp("kojiRatio", cat, p.kojiRatio, "52px", "0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">精米歩合 ${inp("polishingRatio", cat, p.polishingRatio, "52px", "0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">アル添 ${inp("alcoholAdditionRatio", cat, p.alcoholAdditionRatio ?? 0, "48px", "0.01")}</label>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">
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
      <div class="panel-header"><h2>月別 米調達量</h2><p class="panel-caption">醸造スケジュールに基づく月別の玄米必要量</p></div>
      <div style="display:grid;grid-template-columns:repeat(12,1fr);gap:4px;padding:8px;">
        ${monthlyChart}
      </div>
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
            <input id="proc-commit-supplier" type="text" placeholder="仕入先"
              style="width:100px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
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
