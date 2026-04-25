import type { DemandAnalysis, SafetyStockParams, ProductionPlanRow } from "../api";

export type DemandTab = "demand" | "safety" | "plan" | "calendar";
export type DemandSortState = { column: string; dir: "asc" | "desc" } | null;

/** 日別シフト: 何人配置するか */
export interface DayShift {
  date: string;        // "YYYY-MM-DD"
  headcount: number;   // 配置人数 (0 = 休み)
  confirmed: boolean;  // 確定フラグ
}

/** カレンダー上の日別生産割り当て */
export interface DayProduction {
  date: string;
  headcount: number;
  confirmed: boolean;
  capacity: number;    // headcount × LABEL_BOTTLES_PER_PERSON_DAY
  items: Array<{
    productCode: string;
    productName: string;
    productionType: string;
    qty: number;
  }>;
  totalQty: number;
  utilization: number; // totalQty / capacity (0-1)
}

// ─── ユーティリティ ────────────────────────────────────────────────────────────

function fmtQty(n: number): string {
  return n.toLocaleString("ja-JP");
}

function fmtMonth(ym: string): string {
  const [y, m] = ym.split("-");
  return `${y.slice(2)}/${m}`;
}

function sortIndicator(sort: DemandSortState, col: string): string {
  if (!sort || sort.column !== col) return `<span style="opacity:0.3;margin-left:2px;">⇅</span>`;
  return sort.dir === "asc"
    ? `<span style="margin-left:2px;">↑</span>`
    : `<span style="margin-left:2px;">↓</span>`;
}

function sortableHeader(label: string, col: string, sort: DemandSortState, cls: string = ""): string {
  return `<th class="${cls}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${col}">${label}${sortIndicator(sort, col)}</th>`;
}

function zScore(serviceLevel: number): number {
  if (serviceLevel >= 0.99) return 2.33;
  if (serviceLevel >= 0.97) return 1.88;
  if (serviceLevel >= 0.95) return 1.65;
  if (serviceLevel >= 0.90) return 1.28;
  return 1.04;
}

// ─── 需要実績タブ ─────────────────────────────────────────────────────────────

function buildDemandChart(analysis: DemandAnalysis): string {
  const { months, matrix } = analysis;
  if (months.length === 0 || analysis.products.length === 0) {
    return `<div class="chart-empty">データなし</div>`;
  }

  // チャートは上位6商品のみ表示（積み上げ棒グラフの視認性を確保）
  const products = analysis.products
    .slice()
    .sort((a, b) => (analysis.productTotals[b.code] ?? 0) - (analysis.productTotals[a.code] ?? 0))
    .slice(0, 6);

  const COLORS = ["#0F5B8D", "#2F855A", "#B7791F", "#C53D3D", "#6B46C1", "#2B6CB0"];
  const width = 820;
  const height = 280;
  const pad = { top: 20, right: 20, bottom: 40, left: 60 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // 各月の合計を積み上げ用に計算
  const monthTotals = months.map((m) =>
    products.reduce((s, p) => s + (matrix[p.code]?.[m] ?? 0), 0)
  );
  const maxVal = Math.max(...monthTotals, 1);
  const step = plotW / months.length;
  const barW = Math.max(step - 10, 14);

  // Y 軸ガイドライン
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = pad.top + plotH - plotH * ratio;
    const label = `${Math.round((maxVal * ratio) / 100) * 100}`;
    return `
      <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" class="chart-grid" />
      <text x="6" y="${y + 4}" class="chart-axis">${Number(label).toLocaleString("ja-JP")}</text>
    `;
  }).join("");

  // 積み上げ棒
  const bars = months.map((m, mi) => {
    let yBase = pad.top + plotH;
    const x = pad.left + mi * step + (step - barW) / 2;
    const segments = products.map((p, pi) => {
      const qty = matrix[p.code]?.[m] ?? 0;
      const barH = (qty / maxVal) * plotH;
      yBase -= barH;
      return `<rect x="${x}" y="${yBase}" width="${barW}" height="${barH}" fill="${COLORS[pi % COLORS.length]}" opacity="0.85" rx="${pi === products.length - 1 ? 3 : 0}" />`;
    }).join("");
    // 1月は "25年" と年を表示、それ以外は3ヶ月おきに "4月" 形式
    const [y, mo] = m.split("-");
    const monthNum = parseInt(mo);
    const showLabel = monthNum === 1 || mi % 3 === 0;
    const label = monthNum === 1 ? `${y.slice(2)}年` : `${monthNum}月`;
    return `<g>${segments}${showLabel ? `<text x="${x + barW / 2}" y="${height - 10}" class="chart-axis centered-axis">${label}</text>` : ""}</g>`;
  }).join("");

  // 凡例
  const legend = products.map((p, pi) =>
    `<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${COLORS[pi % COLORS.length]};"></span>
       ${p.name}
     </span>`
  ).join("");

  return `
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${gridLines}${bars}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${pad.left}px;display:flex;flex-wrap:wrap;">${legend}</div>
  `;
}

function buildDemandMatrix(analysis: DemandAnalysis): string {
  const { months, products } = analysis;

  // 商品が多すぎる場合は上位50件に絞る（レンダリング負荷対策）
  const topProducts = products
    .slice()
    .sort((a, b) => (analysis.productTotals[b.code] ?? 0) - (analysis.productTotals[a.code] ?? 0))
    .slice(0, 50);

  const headerCols = months.map((m) => {
    const [y, mo] = m.split("-");
    const monthNum = parseInt(mo);
    const label = monthNum === 1 ? `${y.slice(2)}年1月` : `${monthNum}月`;
    return `<th class="numeric" style="min-width:52px;white-space:nowrap;">${label}</th>`;
  }).join("");

  const rows = topProducts.map((p) => {
    const cells = months.map((m) => {
      const qty = analysis.matrix[p.code]?.[m] ?? 0;
      return `<td class="numeric">${qty > 0 ? fmtQty(qty) : "—"}</td>`;
    }).join("");
    return `
      <tr>
        <td class="mono">${p.code}</td>
        <td style="white-space:nowrap;">${p.name}</td>
        ${cells}
        <td class="numeric"><strong>${fmtQty(analysis.productTotals[p.code] ?? 0)}</strong></td>
        <td class="numeric">${fmtQty(Math.round(analysis.productAvg[p.code] ?? 0))}</td>
        <td class="numeric">${fmtQty(Math.round(analysis.productStdDev[p.code] ?? 0))}</td>
      </tr>
    `;
  }).join("");

  return `
    <div class="table-wrap" style="overflow-x:auto;">
      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>商品名</th>
            ${headerCols}
            <th class="numeric">合計</th>
            <th class="numeric">月平均</th>
            <th class="numeric">標準偏差</th>
          </tr>
        </thead>
        <tbody>${rows || `<tr><td colspan="${months.length + 5}" class="empty-row">データなし</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function renderDemandTab(analysis: DemandAnalysis, yearsBack: number): string {
  const latestMonth = analysis.months[analysis.months.length - 1] ?? "";
  const prevMonth   = analysis.months[analysis.months.length - 2] ?? "";
  const yearAgoIdx  = analysis.months.length - 13;
  const yearAgoMonth = yearAgoIdx >= 0 ? analysis.months[yearAgoIdx] : "";

  const currentTotal = analysis.products.reduce(
    (s, p) => s + (analysis.matrix[p.code]?.[latestMonth] ?? 0), 0
  );
  const prevTotal = analysis.products.reduce(
    (s, p) => s + (analysis.matrix[p.code]?.[prevMonth] ?? 0), 0
  );
  const yoyTotal = yearAgoMonth
    ? analysis.products.reduce((s, p) => s + (analysis.matrix[p.code]?.[yearAgoMonth] ?? 0), 0)
    : 0;

  const momRate = prevTotal > 0 ? ((currentTotal - prevTotal) / prevTotal) * 100 : 0;
  const yoyRate = yoyTotal > 0 ? ((currentTotal - yoyTotal) / yoyTotal) * 100 : 0;
  const sign = (n: number) => n >= 0 ? "+" : "";

  const yearOptions = [1, 2, 3, 5].map((y) =>
    `<option value="${y}" ${y === yearsBack ? "selected" : ""}>${y}年</option>`
  ).join("");

  return `
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${fmtQty(currentTotal)} 本</p>
        <p class="kpi-sub">${fmtMonth(latestMonth)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${momRate >= 0 ? "" : "text-danger"}">${sign(momRate)}${momRate.toFixed(1)}%</p>
        <p class="kpi-sub">${fmtMonth(prevMonth)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${yoyRate >= 0 ? "" : "text-danger"}">${yoyTotal > 0 ? `${sign(yoyRate)}${yoyRate.toFixed(1)}%` : "—"}</p>
        <p class="kpi-sub">${yearAgoMonth ? `${fmtMonth(yearAgoMonth)} 比` : "前年データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">取扱商品数</p>
        <p class="kpi-value">${analysis.products.length} SKU</p>
        <p class="kpi-sub">集計対象</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div><h2>月次出荷数量（商品別積み上げ）</h2><p class="panel-caption">上位6商品</p></div>
        <div style="display:flex;align-items:center;gap:10px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
            対象期間
            <select data-action="demand-years-back" style="width:80px;">${yearOptions}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${buildDemandChart(analysis)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${analysis.months.length}ヶ月</p>
      </div>
      ${buildDemandMatrix(analysis)}
    </section>
  `;
}

// ─── 安全在庫タブ ─────────────────────────────────────────────────────────────

function renderSafetyTab(params: SafetyStockParams[], sort: DemandSortState): string {
  // ソート
  const sorted = params.slice().sort((a, b) => {
    if (!sort) return 0;
    const dir = sort.dir === "asc" ? 1 : -1;
    switch (sort.column) {
      case "ss-name": return dir * a.productName.localeCompare(b.productName, "ja");
      case "ss-avg": return dir * (a.avgMonthlyDemand - b.avgMonthlyDemand);
      case "ss-std": return dir * (a.demandStdDev - b.demandStdDev);
      case "ss-ss": {
        const ssA = Math.ceil(zScore(a.serviceLevel) * a.demandStdDev * Math.sqrt(a.leadTimeDays / 30));
        const ssB = Math.ceil(zScore(b.serviceLevel) * b.demandStdDev * Math.sqrt(b.leadTimeDays / 30));
        return dir * (ssA - ssB);
      }
      case "ss-rop": {
        const ropA = Math.ceil(a.avgMonthlyDemand * (a.leadTimeDays / 30) + zScore(a.serviceLevel) * a.demandStdDev * Math.sqrt(a.leadTimeDays / 30));
        const ropB = Math.ceil(b.avgMonthlyDemand * (b.leadTimeDays / 30) + zScore(b.serviceLevel) * b.demandStdDev * Math.sqrt(b.leadTimeDays / 30));
        return dir * (ropA - ropB);
      }
      default: return 0;
    }
  });

  const rows = sorted.map((p) => {
    const z = zScore(p.serviceLevel);
    const ltMonths = p.leadTimeDays / 30;
    const calcSS = Math.ceil(z * p.demandStdDev * Math.sqrt(ltMonths));
    const calcROP = Math.ceil(p.avgMonthlyDemand * ltMonths + calcSS);
    const gap = calcSS - p.safetyStockQty;
    const gapClass = gap > 0 ? "text-danger" : gap < -calcSS * 0.3 ? "text-warning" : "";

    const slOptions = [0.90, 0.95, 0.99].map((v) =>
      `<option value="${v}" ${Math.abs(p.serviceLevel - v) < 0.01 ? "selected" : ""}>${(v * 100).toFixed(0)}%</option>`
    ).join("");

    return `
      <tr>
        <td style="white-space:nowrap;">${p.productName}</td>
        <td class="numeric">${fmtQty(Math.round(p.avgMonthlyDemand))}</td>
        <td class="numeric">${fmtQty(Math.round(p.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${p.leadTimeDays}"
            data-action="ss-lead-time" data-code="${p.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${p.productCode}"
            style="width:64px;">${slOptions}</select>
        </td>
        <td class="numeric"><strong>${fmtQty(calcSS)}</strong></td>
        <td class="numeric">${fmtQty(calcROP)}</td>
        <td class="numeric ${gapClass}">
          ${gap > 0 ? `+${fmtQty(gap)}` : fmtQty(gap)}
          ${gap > 0 ? `<span class="status-pill warning" style="margin-left:4px">不足</span>` : ""}
        </td>
      </tr>
    `;
  }).join("");

  const bulkSlOptions = [0.90, 0.95, 0.99].map((v) =>
    `<option value="${v}" ${v === 0.95 ? "selected" : ""}>${(v * 100).toFixed(0)}%</option>`
  ).join("");

  return `
    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>計算式</h2></div>
      <div style="padding:12px 16px;background:var(--surface-alt);border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.8;">
        SS = Z × σ × √(LT / 30)<br>
        発注点 = 月平均需要 × (LT / 30) + SS<br>
        <span style="color:var(--text-secondary);font-size:12px;">
          Z: サービス率係数（90%→1.28 / 95%→1.65 / 99%→2.33）　σ: 月次需要の標準偏差　LT: リードタイム（日）
        </span>
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>一括変更</h2></div>
      <div style="display:flex;align-items:flex-end;gap:16px;padding:4px 0 8px;">
        <label class="field" style="margin:0;">
          <span>サービス率（全商品）</span>
          <select id="bulk-service-level" style="width:90px;">${bulkSlOptions}</select>
        </label>
        <label class="field" style="margin:0;">
          <span>リードタイム・日（全商品）</span>
          <input id="bulk-lead-time" type="number" min="1" max="180" value="30"
            style="width:72px;text-align:right;" />
        </label>
        <button class="button secondary" type="button" data-action="bulk-apply-safety"
          style="margin-bottom:2px;">全商品に適用して再計算</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div><h2>商品別 安全在庫パラメータ</h2><p class="panel-caption">個別に調整するか、一括変更を使用してください</p></div>
        <button class="button primary" type="button" data-action="ss-save-all">安全在庫を保存</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${sortableHeader("商品名", "ss-name", sort)}
              ${sortableHeader("月平均需要", "ss-avg", sort, "numeric")}
              ${sortableHeader("標準偏差", "ss-std", sort, "numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${sortableHeader("安全在庫[算出]", "ss-ss", sort, "numeric")}
              ${sortableHeader("発注点", "ss-rop", sort, "numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="8" class="empty-row">データなし</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

// ─── 生産計画タブ ─────────────────────────────────────────────────────────────

const PRODUCTION_TYPE_LABELS: Record<string, string> = {
  monthly:       "月次",
  annual:        "年次",
  make_to_order: "受注生産",
  november:      "11月生産"
};

function renderPlanTab(plan: ProductionPlanRow[], yearMonth: string, typeFilter: string, sort: DemandSortState): string {
  const statusLabel: Record<string, string> = {
    draft: "下書き",
    confirmed: "確定",
    actual: "実績入力済"
  };
  const statusClass: Record<string, string> = {
    draft: "neutral",
    confirmed: "info",
    actual: "success"
  };

  const ptOptions = (current: string) =>
    Object.entries(PRODUCTION_TYPE_LABELS).map(([v, l]) =>
      `<option value="${v}" ${v === current ? "selected" : ""}>${l}</option>`
    ).join("");

  // ラベル貼り工数定数: 表+裏の手貼り 80本/時 × 8時間 = 640本/人日
  const LABEL_BOTTLES_PER_PERSON_DAY = 640;

  const buildRows = (source: ProductionPlanRow[]) => source.map((row) => {
    const required = Math.max(0, row.demandForecast + row.safetyStockTarget - row.openingStock);
    const qtyForLabel = row.plannedQty > 0 ? row.plannedQty : Math.round(required);
    const labelDays = qtyForLabel > 0
      ? Math.ceil((qtyForLabel / LABEL_BOTTLES_PER_PERSON_DAY) * 10) / 10
      : 0;
    const variance = row.plannedQty > 0
      ? ((row.actualQty - row.plannedQty) / row.plannedQty) * 100
      : null;
    const varClass = variance !== null ? (variance >= 0 ? "text-success" : "text-danger") : "";

    return `
      <tr>
        <td style="white-space:nowrap;">${row.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${row.productCode}"
            style="width:92px;">${ptOptions(row.productionType)}</select>
        </td>
        <td class="numeric">${fmtQty(Math.round(row.demandForecast))}</td>
        <td class="numeric">${fmtQty(Math.round(row.safetyStockTarget))}</td>
        <td class="numeric">${fmtQty(Math.round(row.openingStock))}</td>
        <td class="numeric"><strong>${fmtQty(Math.round(required))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${row.plannedQty}"
            data-action="plan-qty" data-code="${row.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${row.actualQty > 0 ? fmtQty(row.actualQty) : "—"}</td>
        <td class="numeric ${varClass}">
          ${variance !== null ? `${variance >= 0 ? "+" : ""}${variance.toFixed(1)}%` : "—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${labelDays > 0 ? `${labelDays.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>` : "—"}
        </td>
        <td>
          <span class="status-pill ${statusClass[row.status] ?? "neutral"}">${statusLabel[row.status] ?? row.status}</span>
        </td>
      </tr>
    `;
  }).join("");

  // フィルタ後のテーブル用データ（buildRows より先に定義）
  const filtered = typeFilter === "all" ? plan : plan.filter(r => r.productionType === typeFilter);

  // ソート
  const filteredPlan = filtered.slice().sort((a, b) => {
    if (!sort) return 0;
    const dir = sort.dir === "asc" ? 1 : -1;
    const reqA = Math.max(0, a.demandForecast + a.safetyStockTarget - a.openingStock);
    const reqB = Math.max(0, b.demandForecast + b.safetyStockTarget - b.openingStock);
    switch (sort.column) {
      case "plan-name": return dir * a.productName.localeCompare(b.productName, "ja");
      case "plan-forecast": return dir * (a.demandForecast - b.demandForecast);
      case "plan-required": return dir * (reqA - reqB);
      case "plan-planned": return dir * (a.plannedQty - b.plannedQty);
      case "plan-actual": return dir * (a.actualQty - b.actualQty);
      case "plan-label": {
        const qA = a.plannedQty > 0 ? a.plannedQty : Math.round(reqA);
        const qB = b.plannedQty > 0 ? b.plannedQty : Math.round(reqB);
        return dir * (qA - qB);
      }
      default: return 0;
    }
  });

  const filteredRows = buildRows(filteredPlan);

  // 区分別サマリ
  const typeKeys: Array<{ key: string; label: string }> = [
    { key: "all",          label: "全て" },
    { key: "monthly",      label: "月次" },
    { key: "annual",       label: "年次" },
    { key: "november",     label: "11月生産" },
    { key: "make_to_order",label: "受注生産" }
  ];

  const labelDaysByType = (type: string) => {
    const subset = type === "all" ? plan : plan.filter(r => r.productionType === type);
    const qty = subset.reduce((s, r) => {
      const req = Math.max(0, r.demandForecast + r.safetyStockTarget - r.openingStock);
      return s + (r.plannedQty > 0 ? r.plannedQty : Math.round(req));
    }, 0);
    return Math.ceil((qty / LABEL_BOTTLES_PER_PERSON_DAY) * 10) / 10;
  };

  const summaryCards = typeKeys.filter(t => t.key !== "all").map(t => {
    const days = labelDaysByType(t.key);
    const count = plan.filter(r => r.productionType === t.key).length;
    const mtoOrders = t.key === "make_to_order"
      ? plan.filter(r => r.productionType === "make_to_order" && r.plannedQty > 0).length
      : null;
    return `
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${t.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${days > 0 ? days.toFixed(1) : "—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${count}商品${mtoOrders !== null ? ` · 受注${mtoOrders}件` : ""}</p>
      </div>
    `;
  }).join("");

  // 合計（フィルタ後）
  const totalForecast = filteredPlan.reduce((s, r) => s + r.demandForecast, 0);
  const totalRequired = filteredPlan.reduce(
    (s, r) => s + Math.max(0, r.demandForecast + r.safetyStockTarget - r.openingStock), 0
  );
  const totalPlanned  = filteredPlan.reduce((s, r) => s + r.plannedQty, 0);
  const totalActual   = filteredPlan.reduce((s, r) => s + r.actualQty, 0);
  const totalLabelDays = labelDaysByType(typeFilter);

  // 年月セレクタ（前後12ヶ月）
  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return `<option value="${ym}" ${ym === yearMonth ? "selected" : ""}>${ym.replace("-", "年")}月</option>`;
  }).join("");

  // フィルタボタン
  const filterButtons = typeKeys.map(t =>
    `<button class="button ${typeFilter === t.key ? "primary" : "secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${t.key}"
       style="padding:4px 12px;font-size:13px;">${t.label}</button>`
  ).join("");

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${monthOptions}</select>
      </label>
      <button class="button secondary" type="button" data-action="plan-recalc">需要予測を再計算</button>
    </div>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>ラベル工数サマリ</h2><p class="panel-caption">表+裏 手貼り 80本/時 × 8h = 640本/人日</p></div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${summaryCards}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>生産計画 — ${yearMonth.replace("-", "年")}月</h2>
          <p class="panel-caption">必要生産数 = 需要予測 + 安全在庫目標 − 期首在庫</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="button secondary" type="button" data-action="plan-csv-export">CSV出力</button>
          <button class="button primary" type="button" data-action="plan-save">計画を保存</button>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${filterButtons}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${sortableHeader("商品名", "plan-name", sort)}
              <th>生産区分</th>
              ${sortableHeader("需要予測", "plan-forecast", sort, "numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${sortableHeader("必要生産数", "plan-required", sort, "numeric")}
              ${sortableHeader("計画数", "plan-planned", sort, "numeric")}
              ${sortableHeader("実績数", "plan-actual", sort, "numeric")}
              <th class="numeric">達成率</th>
              ${sortableHeader("ラベル工数", "plan-label", sort, "numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${filteredRows || `<tr><td colspan="11" class="empty-row">データなし</td></tr>`}
            ${filteredPlan.length > 0 ? `
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${fmtQty(Math.round(totalForecast))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${fmtQty(Math.round(totalRequired))}</td>
                <td class="numeric">${fmtQty(totalPlanned)}</td>
                <td class="numeric">${totalActual > 0 ? fmtQty(totalActual) : "—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${totalLabelDays.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>` : ""}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ─── 生産カレンダータブ ───────────────────────────────────────────────────────

const LABEL_BOTTLES_PER_PERSON_DAY_CAL = 640;

/** 月の日付一覧を生成 */
function daysInMonth(ym: string): string[] {
  const [y, m] = ym.split("-").map(Number);
  const count = new Date(y, m, 0).getDate();
  return Array.from({ length: count }, (_, i) => {
    const d = i + 1;
    return `${ym}-${String(d).padStart(2, "0")}`;
  });
}

function dayOfWeekJa(dateStr: string): string {
  const dow = new Date(dateStr).getDay();
  return ["日", "月", "火", "水", "木", "金", "土"][dow];
}

function isWeekend(dateStr: string): boolean {
  const dow = new Date(dateStr).getDay();
  return dow === 0 || dow === 6;
}

/** 月間生産計画を日別に配分する */
export function allocateProductionToDays(
  plan: ProductionPlanRow[],
  shifts: DayShift[]
): DayProduction[] {
  const shiftMap = new Map(shifts.map(s => [s.date, s]));

  // 稼働日（headcount > 0）を取得
  const workingDays = shifts
    .filter(s => s.headcount > 0)
    .map(s => s.date)
    .sort();

  if (workingDays.length === 0) {
    return shifts.map(s => ({
      date: s.date,
      headcount: s.headcount,
      confirmed: s.confirmed,
      capacity: 0,
      items: [],
      totalQty: 0,
      utilization: 0
    }));
  }

  // 生産アイテムを優先度順にソート: monthly > november > annual > make_to_order
  const priorityOrder: Record<string, number> = { monthly: 0, november: 1, annual: 2, make_to_order: 3 };
  const sortedItems = plan
    .filter(r => r.plannedQty > 0 || Math.max(0, r.demandForecast + r.safetyStockTarget - r.openingStock) > 0)
    .map(r => ({
      productCode: r.productCode,
      productName: r.productName,
      productionType: r.productionType,
      remaining: r.plannedQty > 0 ? r.plannedQty : Math.max(0, r.demandForecast + r.safetyStockTarget - r.openingStock)
    }))
    .filter(r => r.remaining > 0)
    .sort((a, b) => (priorityOrder[a.productionType] ?? 99) - (priorityOrder[b.productionType] ?? 99)
      || b.remaining - a.remaining);

  // 日別の割り当て結果
  const dayMap = new Map<string, DayProduction>();
  for (const s of shifts) {
    dayMap.set(s.date, {
      date: s.date,
      headcount: s.headcount,
      confirmed: s.confirmed,
      capacity: s.headcount * LABEL_BOTTLES_PER_PERSON_DAY_CAL,
      items: [],
      totalQty: 0,
      utilization: 0
    });
  }

  // 各アイテムを稼働日に均等配分 → キャパシティ超過分は翌日に繰り越し
  for (const item of sortedItems) {
    let remaining = item.remaining;
    if (remaining <= 0) continue;

    // この商品を何日に分けるか: キャパから概算
    const totalCapacity = workingDays.reduce((s, d) => {
      const dp = dayMap.get(d)!;
      return s + Math.max(0, dp.capacity - dp.totalQty);
    }, 0);
    if (totalCapacity <= 0) break;

    for (const date of workingDays) {
      if (remaining <= 0) break;
      const dp = dayMap.get(date)!;
      const available = Math.max(0, dp.capacity - dp.totalQty);
      if (available <= 0) continue;

      const alloc = Math.min(remaining, available);
      dp.items.push({
        productCode: item.productCode,
        productName: item.productName,
        productionType: item.productionType,
        qty: alloc
      });
      dp.totalQty += alloc;
      dp.utilization = dp.capacity > 0 ? dp.totalQty / dp.capacity : 0;
      remaining -= alloc;
    }
  }

  return shifts.map(s => dayMap.get(s.date)!);
}

/** デフォルトシフト生成: 平日2人、土日0人（全て仮） */
export function buildDefaultShifts(ym: string, defaultHeadcount: number = 2): DayShift[] {
  return daysInMonth(ym).map(date => ({
    date,
    headcount: isWeekend(date) ? 0 : defaultHeadcount,
    confirmed: false
  }));
}

function renderCalendarTab(
  plan: ProductionPlanRow[],
  yearMonth: string,
  shifts: DayShift[],
  selectedDate: string | null = null
): string {
  const days = daysInMonth(yearMonth);
  const allocation = allocateProductionToDays(plan, shifts);
  const allocMap = new Map(allocation.map(a => [a.date, a]));

  // 月間サマリ
  const totalPlanned = plan.reduce((s, r) => s + (r.plannedQty > 0 ? r.plannedQty : Math.max(0, r.demandForecast + r.safetyStockTarget - r.openingStock)), 0);
  const totalAllocated = allocation.reduce((s, d) => s + d.totalQty, 0);
  const workDays = shifts.filter(s => s.headcount > 0).length;
  const totalCapacity = allocation.reduce((s, d) => s + d.capacity, 0);
  const totalHeadcount = shifts.reduce((s, d) => s + d.headcount, 0);

  // デフォルト人数
  const defaultHc = shifts.find(s => s.headcount > 0)?.headcount ?? 2;
  const hcOptions = [1, 2, 3, 4, 5].map(n =>
    `<option value="${n}" ${n === defaultHc ? "selected" : ""}>${n}人</option>`
  ).join("");

  // 年月セレクタ
  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return `<option value="${ym}" ${ym === yearMonth ? "selected" : ""}>${ym.replace("-", "年")}月</option>`;
  }).join("");

  // カレンダーグリッド（モバイル対応: コンパクトセル）
  const firstDow = new Date(days[0]).getDay();
  const calCells: string[] = [];

  for (let i = 0; i < firstDow; i++) {
    calCells.push(`<div style="min-height:44px;"></div>`);
  }

  for (const date of days) {
    const alloc = allocMap.get(date);
    const dow = new Date(date).getDay();
    const dayNum = parseInt(date.split("-")[2]);
    const hc = alloc?.headcount ?? 0;
    const total = alloc?.totalQty ?? 0;
    const util = alloc?.utilization ?? 0;
    const selected = date === selectedDate;

    // 稼働率で背景色を決定
    const bg = hc === 0 ? "var(--surface-alt)"
      : util > 0.95 ? "rgba(197,61,61,0.12)"
      : util > 0.7 ? "rgba(183,121,31,0.10)"
      : util > 0 ? "rgba(47,133,90,0.08)"
      : "var(--surface)";

    // 稼働率バーの色
    const barColor = hc === 0 ? "transparent"
      : util > 0.95 ? "#c53d3d"
      : util > 0.7 ? "#b7791f"
      : util > 0 ? "#2f855a"
      : "var(--border)";

    const dayColor = dow === 0 ? "#c53d3d" : dow === 6 ? "#0F5B8D" : "var(--text)";

    calCells.push(`
      <div data-action="cal-select-day" data-date="${date}"
        style="min-height:44px;padding:3px;border:${selected ? "2px solid #0F5B8D" : "1px solid var(--border)"};border-radius:6px;
          background:${bg};cursor:pointer;position:relative;display:flex;flex-direction:column;
          ${selected ? "box-shadow:0 0 0 2px rgba(15,91,141,0.2);" : ""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${dayColor};line-height:1;">${dayNum}</span>
          ${hc > 0 ? `<span style="font-size:9px;color:var(--text-secondary);">${hc}人</span>` : ""}
        </div>
        ${hc > 0 ? `
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${total > 0 ? fmtQty(total) : ""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(util * 100, 100)}%;background:${barColor};border-radius:2px;"></div>
          </div>
        ` : `<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>`}
      </div>
    `);
  }

  // 末尾の空セル
  const totalCells = calCells.length;
  const remainder = totalCells % 7;
  if (remainder > 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      calCells.push(`<div style="min-height:44px;"></div>`);
    }
  }

  // 選択日の詳細パネル
  const selectedAlloc = selectedDate ? allocMap.get(selectedDate) : null;
  const selectedShift = selectedDate ? shifts.find(s => s.date === selectedDate) : null;
  const detailPanel = selectedDate && selectedAlloc ? (() => {
    const d = selectedAlloc;
    const dayNum = parseInt(selectedDate.split("-")[2]);
    const dowLabel = dayOfWeekJa(selectedDate);
    const utilPct = Math.round(d.utilization * 100);

    const typeColorMap: Record<string, string> = {
      monthly: "#0F5B8D", november: "#B7791F", annual: "#6B46C1", make_to_order: "#999"
    };
    const typeLabelMap: Record<string, string> = {
      monthly: "月次", november: "11月", annual: "年次", make_to_order: "受注"
    };

    const itemRows = d.items.map(it => `
      <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="width:8px;height:8px;border-radius:50%;background:${typeColorMap[it.productionType] ?? "#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${it.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${typeLabelMap[it.productionType] ?? it.productionType}</div>
        </div>
        <div style="font-size:14px;font-weight:700;white-space:nowrap;">${fmtQty(it.qty)}<span style="font-size:11px;font-weight:400;">本</span></div>
      </div>
    `).join("");

    return `
      <section class="panel" style="margin-top:12px;border:2px solid #0F5B8D;">
        <div class="panel-header" style="padding-bottom:8px;">
          <div>
            <h2>${dayNum}日（${dowLabel}）の生産内訳</h2>
            <p class="panel-caption">${d.headcount}人配置 ・ キャパ${fmtQty(d.capacity)}本 ・ 稼働率${utilPct}%</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <label style="font-size:11px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
              人数
              <input type="number" min="0" max="10" value="${d.headcount}"
                data-action="cal-shift" data-date="${selectedDate}"
                style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />
            </label>
          </div>
        </div>
        ${d.items.length > 0 ? `
          <div style="padding:0 4px;">
            ${itemRows}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${fmtQty(d.totalQty)}本</span>
            </div>
          </div>
        ` : `<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>`}
      </section>
    `;
  })() : selectedDate && !selectedAlloc ? `
    <section class="panel" style="margin-top:12px;">
      <p style="color:var(--text-secondary);padding:16px;text-align:center;">${parseInt(selectedDate.split("-")[2])}日（${dayOfWeekJa(selectedDate)}）— 休日</p>
    </section>
  ` : "";

  // 凡例
  const legend = [
    { color: "#0F5B8D", label: "月次" },
    { color: "#B7791F", label: "11月" },
    { color: "#6B46C1", label: "年次" },
    { color: "#999", label: "受注" }
  ].map(l => `<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${l.color};"></span>${l.label}
  </span>`).join(" ");

  return `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${monthOptions}</select>
      </label>
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>人数</span>
        <select data-action="cal-default-hc" style="width:68px;">${hcOptions}</select>
      </label>
      <button class="button secondary" type="button" data-action="cal-reset-shifts"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">リセット</button>
      <button class="button primary" type="button" data-action="cal-confirm-all"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">全日確定</button>
    </div>

    <div style="display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap;font-size:12px;">
      <span><strong>${fmtQty(Math.round(totalPlanned))}</strong>本予定</span>
      <span><strong>${fmtQty(Math.round(totalAllocated))}</strong>本配分${totalPlanned > 0 ? `（${Math.round(totalAllocated / totalPlanned * 100)}%）` : ""}</span>
      <span><strong>${workDays}</strong>日稼働 / <strong>${totalHeadcount}</strong>人日</span>
      <span>キャパ<strong>${fmtQty(totalCapacity)}</strong>本</span>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${yearMonth.replace("-", "年")}月</span>
        <span>${legend}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((d, i) =>
          `<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${i === 0 ? '#c53d3d' : i === 6 ? '#0F5B8D' : 'var(--text-secondary)'};">${d}</div>`
        ).join("")}
        ${calCells.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付をタップで詳細表示</p>
    </section>

    ${detailPanel}
  `;
}

// ─── メインエクスポート ────────────────────────────────────────────────────────

export function renderDemandPlanning(
  analysis: DemandAnalysis | null,
  safetyStockParams: SafetyStockParams[],
  productionPlan: ProductionPlanRow[],
  tab: DemandTab,
  planYearMonth: string,
  yearsBack: number,
  planTypeFilter: string = "all",
  sort: DemandSortState = null,
  shifts: DayShift[] = [],
  selectedDate: string | null = null
): string {
  const tabDefs: Array<{ key: DemandTab; label: string }> = [
    { key: "demand",   label: "需要実績" },
    { key: "safety",   label: "安全在庫" },
    { key: "plan",     label: "生産計画" },
    { key: "calendar", label: "生産カレンダー" }
  ];

  const tabs = tabDefs.map((t) =>
    `<button class="tab-button ${tab === t.key ? "active" : ""}"
       data-demand-tab="${t.key}">${t.label}</button>`
  ).join("");

  let body = "";
  if (tab === "demand") {
    body = analysis
      ? renderDemandTab(analysis, yearsBack)
      : `<section class="panel"><p>データを読み込んでいます…</p></section>`;
  } else if (tab === "safety") {
    body = renderSafetyTab(safetyStockParams, sort);
  } else if (tab === "plan") {
    body = renderPlanTab(productionPlan, planYearMonth, planTypeFilter, sort);
  } else if (tab === "calendar") {
    try {
      body = renderCalendarTab(productionPlan, planYearMonth, shifts, selectedDate);
    } catch (err) {
      console.error("[renderCalendarTab] error:", err);
      body = `<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(err)}\n${(err as Error)?.stack ?? ""}</div></section>`;
    }
  }

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${tabs}
    </div>

    ${body}
  `;
}
