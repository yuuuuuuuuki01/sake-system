import type { DemandAnalysis, SafetyStockParams, ProductionPlanRow } from "../api";

export type DemandTab = "demand" | "safety" | "plan";

// ─── ユーティリティ ────────────────────────────────────────────────────────────

function fmtQty(n: number): string {
  return n.toLocaleString("ja-JP");
}

function fmtMonth(ym: string): string {
  const [y, m] = ym.split("-");
  return `${y.slice(2)}/${m}`;
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

function renderDemandTab(analysis: DemandAnalysis): string {
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
        <div><h2>月次出荷数量（商品別積み上げ）</h2><p class="panel-caption">直近12ヶ月</p></div>
        <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
      </div>
      ${buildDemandChart(analysis)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
      </div>
      ${buildDemandMatrix(analysis)}
    </section>
  `;
}

// ─── 安全在庫タブ ─────────────────────────────────────────────────────────────

function renderSafetyTab(params: SafetyStockParams[]): string {
  const rows = params.map((p) => {
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

    <section class="panel">
      <div class="panel-header">
        <div><h2>商品別 安全在庫パラメータ</h2><p class="panel-caption">リードタイムとサービス率を変更すると安全在庫が再計算されます</p></div>
        <button class="button primary" type="button" data-action="ss-save-all">安全在庫を保存</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>商品名</th>
              <th class="numeric">月平均需要</th>
              <th class="numeric">標準偏差</th>
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              <th class="numeric">安全在庫[算出]</th>
              <th class="numeric">発注点</th>
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

function renderPlanTab(plan: ProductionPlanRow[], yearMonth: string): string {
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

  const rows = plan.map((row) => {
    const required = Math.max(0, row.demandForecast + row.safetyStockTarget - row.openingStock);
    const variance = row.plannedQty > 0
      ? ((row.actualQty - row.plannedQty) / row.plannedQty) * 100
      : null;
    const varClass = variance !== null ? (variance >= 0 ? "text-success" : "text-danger") : "";

    return `
      <tr>
        <td style="white-space:nowrap;">${row.productName}</td>
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
        <td>
          <span class="status-pill ${statusClass[row.status] ?? "neutral"}">${statusLabel[row.status] ?? row.status}</span>
        </td>
      </tr>
    `;
  }).join("");

  // 合計行
  const totalForecast = plan.reduce((s, r) => s + r.demandForecast, 0);
  const totalRequired = plan.reduce(
    (s, r) => s + Math.max(0, r.demandForecast + r.safetyStockTarget - r.openingStock), 0
  );
  const totalPlanned  = plan.reduce((s, r) => s + r.plannedQty, 0);
  const totalActual   = plan.reduce((s, r) => s + r.actualQty, 0);

  // 年月セレクタ（前後12ヶ月）
  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return `<option value="${ym}" ${ym === yearMonth ? "selected" : ""}>${ym.replace("-", "年")}月</option>`;
  }).join("");

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${monthOptions}</select>
      </label>
      <button class="button secondary" type="button" data-action="plan-recalc">需要予測を再計算</button>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>月次生産計画 — ${yearMonth.replace("-", "年")}月</h2>
          <p class="panel-caption">必要生産数 = 需要予測 + 安全在庫目標 − 期首在庫</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="button secondary" type="button" data-action="plan-csv-export">CSV出力</button>
          <button class="button primary" type="button" data-action="plan-save">計画を保存</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>商品名</th>
              <th class="numeric">需要予測</th>
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              <th class="numeric">必要生産数</th>
              <th class="numeric">計画数</th>
              <th class="numeric">実績数</th>
              <th class="numeric">達成率</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${rows || `<tr><td colspan="9" class="empty-row">データなし</td></tr>`}
            ${plan.length > 0 ? `
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td class="numeric">${fmtQty(Math.round(totalForecast))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${fmtQty(Math.round(totalRequired))}</td>
                <td class="numeric">${fmtQty(totalPlanned)}</td>
                <td class="numeric">${totalActual > 0 ? fmtQty(totalActual) : "—"}</td>
                <td class="numeric">—</td>
                <td>—</td>
              </tr>` : ""}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ─── メインエクスポート ────────────────────────────────────────────────────────

export function renderDemandPlanning(
  analysis: DemandAnalysis | null,
  safetyStockParams: SafetyStockParams[],
  productionPlan: ProductionPlanRow[],
  tab: DemandTab,
  planYearMonth: string
): string {
  const tabDefs: Array<{ key: DemandTab; label: string }> = [
    { key: "demand", label: "需要実績" },
    { key: "safety", label: "安全在庫" },
    { key: "plan",   label: "生産計画" }
  ];

  const tabs = tabDefs.map((t) =>
    `<button class="tab-button ${tab === t.key ? "active" : ""}"
       data-demand-tab="${t.key}">${t.label}</button>`
  ).join("");

  let body = "";
  if (tab === "demand") {
    body = analysis
      ? renderDemandTab(analysis)
      : `<section class="panel"><p>データを読み込んでいます…</p></section>`;
  } else if (tab === "safety") {
    body = renderSafetyTab(safetyStockParams);
  } else {
    body = renderPlanTab(productionPlan, planYearMonth);
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
