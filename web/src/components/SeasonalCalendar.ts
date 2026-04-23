// ── Seasonal Proposal Calendar ─────────────────────────
// 季節提案カレンダー: helps the brewery plan when to propose
// each product to customers, based on historical shipping peaks.

// ── Types ───────────────────────────────────────────────

export interface ProductSeasonalInfo {
  code: string;
  name: string;
  category: string;
  peakMonths: number[];  // 0-indexed months where shipment is >150% of average
  proposalStartMonth: number; // 2 months before first peak
  seasonType: "year-round" | "seasonal" | "year-end";
  monthlyQuantity: number[];
}

export interface SeasonalProposal {
  month: number; // 0-11
  products: ProductSeasonalInfo[];
  targetCustomers: Array<{code: string; name: string; lastYearAmount: number}>;
}

export interface SeasonalCalendarState {
  products: ProductSeasonalInfo[];
  proposals: SeasonalProposal[];
  selectedMonth: number;
}

// ── Month labels ────────────────────────────────────────

const MONTH_LABELS = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

const SEASON_TYPE_LABELS: Record<ProductSeasonalInfo["seasonType"], string> = {
  "year-round": "通年品",
  "seasonal": "季節品",
  "year-end": "歳暮品"
};

const SEASON_TYPE_COLORS: Record<ProductSeasonalInfo["seasonType"], string> = {
  "year-round": "#0F5B8D",
  "seasonal": "#2f855a",
  "year-end": "#c05621"
};

// ── Helpers ─────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

function inferSeasonType(monthlyQty: number[]): ProductSeasonalInfo["seasonType"] {
  const total = monthlyQty.reduce((s, v) => s + v, 0);
  if (total === 0) return "year-round";

  // Year-end gift: Nov+Dec > 50% of total
  const yearEndShare = (monthlyQty[10] + monthlyQty[11]) / total;
  if (yearEndShare > 0.5) return "year-end";

  // Seasonal: fewer than 6 months with meaningful shipments (>10% of max)
  const maxQty = Math.max(...monthlyQty);
  const activeMonths = monthlyQty.filter((v) => v > maxQty * 0.1).length;
  if (activeMonths <= 6) return "seasonal";

  return "year-round";
}

function computePeakMonths(monthlyQty: number[]): number[] {
  const total = monthlyQty.reduce((s, v) => s + v, 0);
  if (total === 0) return [];
  const avg = total / 12;
  const threshold = avg * 1.5;
  const peaks: number[] = [];
  for (let i = 0; i < 12; i++) {
    if (monthlyQty[i] > threshold) {
      peaks.push(i);
    }
  }
  // If no month exceeds 150%, use the single highest month
  if (peaks.length === 0) {
    const maxVal = Math.max(...monthlyQty);
    if (maxVal > 0) {
      peaks.push(monthlyQty.indexOf(maxVal));
    }
  }
  return peaks.sort((a, b) => a - b);
}

function computeProposalStart(peakMonths: number[]): number {
  if (peakMonths.length === 0) return 0;
  const firstPeak = peakMonths[0];
  // 2 months before peak, wrapping around
  return (firstPeak - 2 + 12) % 12;
}

// ── Build state from raw shipment data ──────────────────

export function buildSeasonalData(
  shipments: Array<{code: string; name: string; category: string; monthlyQuantity: number[]}>
): SeasonalCalendarState {
  const currentMonth = new Date().getMonth();

  const products: ProductSeasonalInfo[] = shipments.map((s) => {
    const seasonType = inferSeasonType(s.monthlyQuantity);
    const peakMonths = computePeakMonths(s.monthlyQuantity);
    const proposalStartMonth = computeProposalStart(peakMonths);
    return {
      code: s.code,
      name: s.name,
      category: s.category,
      peakMonths,
      proposalStartMonth,
      seasonType,
      monthlyQuantity: s.monthlyQuantity
    };
  });

  // Build proposals for each month
  const proposals: SeasonalProposal[] = [];
  for (let m = 0; m < 12; m++) {
    const monthProducts = products.filter((p) => {
      // Product should be proposed in month m if:
      // m is the proposalStartMonth, or m is between proposalStart and first peak (inclusive)
      if (p.peakMonths.length === 0) return false;
      const start = p.proposalStartMonth;
      const end = p.peakMonths[0];
      if (start <= end) {
        return m >= start && m <= end;
      }
      // Wraps around year boundary
      return m >= start || m <= end;
    });
    proposals.push({
      month: m,
      products: monthProducts,
      targetCustomers: [] // Populated externally with customer data
    });
  }

  return {
    products,
    proposals,
    selectedMonth: currentMonth
  };
}

// ── Render ──────────────────────────────────────────────

export function renderSeasonalCalendar(state: SeasonalCalendarState): string {
  const { products, proposals, selectedMonth } = state;
  const currentMonth = new Date().getMonth();

  // Group products by season type
  const grouped: Record<ProductSeasonalInfo["seasonType"], ProductSeasonalInfo[]> = {
    "year-round": [],
    "seasonal": [],
    "year-end": []
  };
  products.forEach((p) => grouped[p.seasonType].push(p));

  // Current month proposal
  const currentProposal = proposals[selectedMonth];

  // KPI cards
  const totalProducts = products.length;
  const proposalCount = currentProposal?.products.length ?? 0;
  const peakThisMonth = products.filter((p) => p.peakMonths.includes(selectedMonth)).length;
  const targetCount = currentProposal?.targetCustomers.length ?? 0;

  return `
<div class="panel">
  <div class="page-head">
    <div>
      <span class="eyebrow">営業支援</span>
      <h2>季節提案カレンダー</h2>
    </div>
  </div>

  <!-- KPI Grid -->
  <div class="kpi-grid" style="margin-bottom:1.5rem">
    <div class="kpi-card">
      <div class="eyebrow">対象商品数</div>
      <div class="mono numeric" style="font-size:1.5rem">${totalProducts}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${MONTH_LABELS[selectedMonth]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${proposalCount}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${MONTH_LABELS[selectedMonth]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${peakThisMonth}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${targetCount}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${MONTH_LABELS.map((label, i) => {
      const isCurrent = i === currentMonth;
      const isSelected = i === selectedMonth;
      const bg = isSelected ? "#0F5B8D" : isCurrent ? "#e2e8f0" : "transparent";
      const color = isSelected ? "#fff" : "#333";
      const border = isCurrent && !isSelected ? "2px solid #0F5B8D" : "1px solid #cbd5e0";
      return `<button class="button" style="padding:4px 10px;background:${bg};color:${color};border:${border};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${i}">${label}${isCurrent ? " ●" : ""}</button>`;
    }).join("")}
  </div>

  <!-- Timeline Grid -->
  <div class="table-wrap" style="margin-bottom:1.5rem">
    <h3 style="margin-bottom:0.75rem;font-size:0.95rem">提案タイムライン</h3>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:0.8rem">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #e2e8f0;min-width:120px">商品</th>
            <th style="text-align:left;padding:6px 4px;border-bottom:2px solid #e2e8f0;min-width:40px">区分</th>
            ${MONTH_LABELS.map((label, i) => {
              const highlight = i === currentMonth ? "background:#f0f7ff;" : "";
              return `<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${highlight}">${label.replace("月","")}</th>`;
            }).join("")}
          </tr>
        </thead>
        <tbody>
          ${renderTimelineRows(grouped, currentMonth)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${renderProductGroups(grouped, selectedMonth)}

  <!-- Target customer list for selected month -->
  ${renderTargetCustomers(currentProposal)}
</div>`;
}

function renderTimelineRows(
  grouped: Record<ProductSeasonalInfo["seasonType"], ProductSeasonalInfo[]>,
  currentMonth: number
): string {
  const rows: string[] = [];
  const order: ProductSeasonalInfo["seasonType"][] = ["year-round", "seasonal", "year-end"];

  for (const type of order) {
    const prods = grouped[type];
    if (prods.length === 0) continue;

    // Group header
    rows.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${SEASON_TYPE_COLORS[type]}15;color:${SEASON_TYPE_COLORS[type]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${SEASON_TYPE_LABELS[type]}</span>
    </td></tr>`);

    for (const p of prods) {
      const cells = MONTH_LABELS.map((_, i) => {
        const isPeak = p.peakMonths.includes(i);
        const isProposal = isInProposalRange(p, i);
        const highlight = i === currentMonth ? "outline:2px solid #0F5B8D;outline-offset:-1px;" : "";
        let bg = "transparent";
        if (isPeak) bg = SEASON_TYPE_COLORS[p.seasonType];
        else if (isProposal) bg = SEASON_TYPE_COLORS[p.seasonType] + "40";
        const barStyle = (isPeak || isProposal)
          ? `background:${bg};border-radius:3px;height:18px;width:100%;`
          : "";
        return `<td style="padding:2px;text-align:center;${highlight}"><div style="${barStyle}" title="${isPeak ? "ピーク" : isProposal ? "提案期間" : ""}"></div></td>`;
      }).join("");

      rows.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${p.name}"><span class="mono" style="font-size:0.7rem;color:#888">${p.code}</span> ${p.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${SEASON_TYPE_COLORS[p.seasonType]}15;color:${SEASON_TYPE_COLORS[p.seasonType]}">${SEASON_TYPE_LABELS[p.seasonType]}</span></td>
        ${cells}
      </tr>`);
    }
  }
  return rows.join("");
}

function isInProposalRange(p: ProductSeasonalInfo, month: number): boolean {
  if (p.peakMonths.length === 0) return false;
  if (p.peakMonths.includes(month)) return false; // Peak shown differently
  const start = p.proposalStartMonth;
  const end = p.peakMonths[0];
  if (start <= end) {
    return month >= start && month < end;
  }
  // Wraps around year boundary
  return month >= start || month < end;
}

function renderProductGroups(
  grouped: Record<ProductSeasonalInfo["seasonType"], ProductSeasonalInfo[]>,
  selectedMonth: number
): string {
  const order: ProductSeasonalInfo["seasonType"][] = ["year-round", "seasonal", "year-end"];
  const sections = order.map((type) => {
    const prods = grouped[type];
    if (prods.length === 0) return "";

    // Filter to products relevant this month (proposal or peak)
    const relevant = prods.filter((p) =>
      p.peakMonths.includes(selectedMonth) || isInProposalRange(p, selectedMonth)
    );

    if (relevant.length === 0) return "";

    const rows = relevant.map((p) => {
      const isPeak = p.peakMonths.includes(selectedMonth);
      const status = isPeak
        ? `<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>`
        : `<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>`;
      const totalQty = p.monthlyQuantity.reduce((s, v) => s + v, 0);
      return `<tr>
        <td class="mono" style="padding:6px 8px">${p.code}</td>
        <td style="padding:6px 8px">${p.name}</td>
        <td style="padding:6px 8px">${status}</td>
        <td class="mono numeric" style="padding:6px 8px">${p.monthlyQuantity[selectedMonth].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${totalQty.toLocaleString()}</td>
        <td style="padding:6px 8px">${p.peakMonths.map((m) => MONTH_LABELS[m]).join(", ")}</td>
      </tr>`;
    }).join("");

    return `
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${SEASON_TYPE_COLORS[type]}15;color:${SEASON_TYPE_COLORS[type]}">${SEASON_TYPE_LABELS[type]}</span>
        <span style="font-size:0.85rem;color:#666">${MONTH_LABELS[selectedMonth]}の対象: ${relevant.length}品</span>
      </h4>
      <table style="width:100%;border-collapse:collapse;font-size:0.8rem">
        <thead>
          <tr style="border-bottom:2px solid #e2e8f0">
            <th style="text-align:left;padding:6px 8px">コード</th>
            <th style="text-align:left;padding:6px 8px">商品名</th>
            <th style="text-align:left;padding:6px 8px">状態</th>
            <th style="text-align:right;padding:6px 8px">当月出荷</th>
            <th style="text-align:right;padding:6px 8px">年間合計</th>
            <th style="text-align:left;padding:6px 8px">ピーク月</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }).filter(Boolean);

  if (sections.length === 0) {
    return `<div style="padding:1rem;color:#666;text-align:center">${MONTH_LABELS[selectedMonth]}に提案対象の商品はありません</div>`;
  }
  return sections.join("");
}

function renderTargetCustomers(proposal: SeasonalProposal | undefined): string {
  if (!proposal || proposal.targetCustomers.length === 0) {
    return `
    <div class="table-wrap" style="margin-top:1rem">
      <h3 style="margin-bottom:0.5rem;font-size:0.95rem">提案対象リスト</h3>
      <p style="color:#888;font-size:0.85rem;padding:1rem 0;text-align:center">対象顧客データがありません。前年同月の出荷実績データを読み込んでください。</p>
    </div>`;
  }

  const rows = proposal.targetCustomers.map((c) => `
    <tr style="border-bottom:1px solid #f0f0f0">
      <td class="mono" style="padding:6px 8px">${c.code}</td>
      <td style="padding:6px 8px">${c.name}</td>
      <td class="mono numeric" style="padding:6px 8px">${formatCurrency(c.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${c.code}">提案作成</button></td>
    </tr>
  `).join("");

  return `
  <div class="table-wrap" style="margin-top:1rem">
    <h3 style="margin-bottom:0.5rem;font-size:0.95rem">提案対象リスト</h3>
    <p style="color:#666;font-size:0.8rem;margin-bottom:0.5rem">前年同月に購入実績があり、今年未注文の顧客</p>
    <table style="width:100%;border-collapse:collapse;font-size:0.8rem">
      <thead>
        <tr style="border-bottom:2px solid #e2e8f0">
          <th style="text-align:left;padding:6px 8px">顧客コード</th>
          <th style="text-align:left;padding:6px 8px">顧客名</th>
          <th style="text-align:right;padding:6px 8px">前年実績</th>
          <th style="text-align:left;padding:6px 8px">アクション</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}
