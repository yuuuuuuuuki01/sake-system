import type { SalesDayPoint, AnalyticsBreakdownRow, AnalyticsMonthlyPoint } from "../api";

// ── Types ───────────────────────────────────────────────

export type ProductionSegment = "monthly" | "made-to-order" | "november-only" | "annual-batch";

export interface ProductForecast {
  code: string;
  name: string;
  segment: ProductionSegment;
  monthlyShipments: number[]; // index 0 = Jan, 11 = Dec
  avgMonthly: number;
  adjustedAvg: number; // excluding Dec outlier for "monthly" segment
  nextMonthForecast: number;
  annualForecast: number;
  safetyStock: number;
}

export interface DeliveryCalendarEntry {
  date: string;
  customerName: string;
  productName: string;
  quantity: number;
  status: "scheduled" | "dispatched" | "delivered";
}

export interface DemandForecastState {
  forecasts: ProductForecast[];
  deliveries: DeliveryCalendarEntry[];
  calendarMonth: string; // YYYY-MM
  selectedSegment: ProductionSegment | "all";
}

export const defaultDemandForecastState: DemandForecastState = {
  forecasts: [],
  deliveries: [],
  calendarMonth: new Date().toISOString().slice(0, 7),
  selectedSegment: "all"
};

// ── Segment labels ──────────────────────────────────────

export const SEGMENT_LABELS: Record<ProductionSegment, string> = {
  "monthly": "月次生産",
  "made-to-order": "受注生産",
  "november-only": "11月限定",
  "annual-batch": "年間一括"
};

const SEGMENT_COLORS: Record<ProductionSegment, string> = {
  "monthly": "#0F5B8D",
  "made-to-order": "#6b46c1",
  "november-only": "#c05621",
  "annual-batch": "#2f855a"
};

// ── Forecast computation ────────────────────────────────

function inferSegment(monthlyShipments: number[]): ProductionSegment {
  const nonZeroMonths = monthlyShipments.filter((v) => v > 0).length;
  const total = monthlyShipments.reduce((s, v) => s + v, 0);
  const novShare = total > 0 ? monthlyShipments[10] / total : 0;
  const decShare = total > 0 ? monthlyShipments[11] / total : 0;

  // November-only: >60% of annual shipments in November
  if (novShare > 0.6) return "november-only";
  // Made-to-order: only ships in 1-3 months sporadically
  if (nonZeroMonths <= 3) return "made-to-order";
  // Annual batch: concentrated in 1-2 months but not Nov
  if (nonZeroMonths <= 4 && novShare < 0.3) return "annual-batch";
  // Monthly: ships regularly
  return "monthly";
}

function computeAdjustedAvg(monthlyShipments: number[], segment: ProductionSegment): number {
  if (segment === "monthly") {
    // Exclude December (index 11) to avoid gift-season spike distorting the average
    const withoutDec = monthlyShipments.filter((_, i) => i !== 11);
    const nonZero = withoutDec.filter((v) => v > 0);
    if (nonZero.length === 0) return 0;
    // Use trimmed mean (remove highest) for further robustness
    const sorted = [...nonZero].sort((a, b) => a - b);
    if (sorted.length > 2) {
      const trimmed = sorted.slice(0, -1);
      return Math.round(trimmed.reduce((s, v) => s + v, 0) / trimmed.length);
    }
    return Math.round(nonZero.reduce((s, v) => s + v, 0) / nonZero.length);
  }
  if (segment === "november-only") {
    return monthlyShipments[10]; // November value
  }
  if (segment === "annual-batch") {
    return monthlyShipments.reduce((s, v) => s + v, 0); // total annual
  }
  // made-to-order: average of non-zero months
  const nonZero = monthlyShipments.filter((v) => v > 0);
  return nonZero.length > 0 ? Math.round(nonZero.reduce((s, v) => s + v, 0) / nonZero.length) : 0;
}

function computeNextMonthForecast(monthlyShipments: number[], segment: ProductionSegment): number {
  const nextMonth = (new Date().getMonth() + 1) % 12; // 0-indexed month for next month
  if (segment === "november-only") {
    return nextMonth === 10 ? monthlyShipments[10] : 0;
  }
  if (segment === "annual-batch") {
    // Ship in the peak month
    const maxMonth = monthlyShipments.indexOf(Math.max(...monthlyShipments));
    return nextMonth === maxMonth ? monthlyShipments.reduce((s, v) => s + v, 0) : 0;
  }
  if (segment === "made-to-order") {
    return 0; // cannot forecast
  }
  // monthly: use adjusted average, but if next month is Dec, use actual Dec historical
  if (nextMonth === 11) return monthlyShipments[11];
  return computeAdjustedAvg(monthlyShipments, segment);
}

export function buildForecasts(
  productTotals: AnalyticsBreakdownRow[],
  monthlySales: AnalyticsMonthlyPoint[],
  allDailySales: SalesDayPoint[]
): ProductForecast[] {
  // Build monthly shipments per product from available data
  // We'll distribute product quantities proportionally across months based on monthlySales pattern
  const monthlyAmounts = new Array(12).fill(0);
  monthlySales.forEach((m) => {
    const monthIdx = parseInt(m.month.slice(5, 7)) - 1;
    monthlyAmounts[monthIdx] += m.amount;
  });
  const totalAmount = monthlyAmounts.reduce((s, v) => s + v, 0);

  return productTotals.slice(0, 30).map((product) => {
    // Distribute product's annual quantity across months based on overall monthly pattern
    const monthlyShipments = monthlyAmounts.map((mAmount) => {
      if (totalAmount === 0) return 0;
      return Math.round(product.quantity * (mAmount / totalAmount));
    });

    const segment = inferSegment(monthlyShipments);
    const avgMonthly = Math.round(product.quantity / 12);
    const adjustedAvg = computeAdjustedAvg(monthlyShipments, segment);
    const nextMonthForecast = computeNextMonthForecast(monthlyShipments, segment);
    const annualForecast = segment === "monthly"
      ? adjustedAvg * 11 + monthlyShipments[11]
      : product.quantity;

    // Safety stock: 1.5x adjusted avg for monthly, 0 for made-to-order
    const safetyStock = segment === "monthly"
      ? Math.round(adjustedAvg * 1.5)
      : segment === "november-only"
        ? Math.round(monthlyShipments[10] * 0.1)
        : 0;

    return {
      code: product.code,
      name: product.name,
      segment,
      monthlyShipments,
      avgMonthly,
      adjustedAvg,
      nextMonthForecast,
      annualForecast,
      safetyStock
    };
  });
}

// ── Delivery calendar rendering ─────────────────────────

function getDaysInMonth(yearMonth: string): number {
  const [y, m] = yearMonth.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

function getFirstDayOfWeek(yearMonth: string): number {
  const [y, m] = yearMonth.split("-").map(Number);
  return new Date(y, m - 1, 1).getDay(); // 0=Sun
}

function renderDeliveryCalendar(deliveries: DeliveryCalendarEntry[], calendarMonth: string): string {
  const daysInMonth = getDaysInMonth(calendarMonth);
  const firstDay = getFirstDayOfWeek(calendarMonth);
  const [y, m] = calendarMonth.split("-").map(Number);

  // Group deliveries by date
  const byDate = new Map<string, DeliveryCalendarEntry[]>();
  deliveries.forEach((d) => {
    if (d.date.slice(0, 7) === calendarMonth) {
      const key = d.date.slice(0, 10);
      if (!byDate.has(key)) byDate.set(key, []);
      byDate.get(key)!.push(d);
    }
  });

  const today = new Date().toISOString().slice(0, 10);

  const headerCells = ["日", "月", "火", "水", "木", "金", "土"]
    .map((d) => `<th class="dcal-header">${d}</th>`)
    .join("");

  let cells = "";
  let dayCounter = 1;

  for (let row = 0; row < 6; row++) {
    if (dayCounter > daysInMonth && row > 0) break;
    cells += "<tr>";
    for (let col = 0; col < 7; col++) {
      if ((row === 0 && col < firstDay) || dayCounter > daysInMonth) {
        cells += `<td class="dcal-cell dcal-empty"></td>`;
      } else {
        const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(dayCounter).padStart(2, "0")}`;
        const entries = byDate.get(dateStr) || [];
        const isToday = dateStr === today;
        const statusDot = entries.length > 0
          ? entries.some((e) => e.status === "scheduled")
            ? '<span class="dcal-dot scheduled"></span>'
            : entries.some((e) => e.status === "dispatched")
              ? '<span class="dcal-dot dispatched"></span>'
              : '<span class="dcal-dot delivered"></span>'
          : "";
        cells += `
          <td class="dcal-cell ${isToday ? "dcal-today" : ""}">
            <div class="dcal-day">${dayCounter}</div>
            ${entries.length > 0 ? `<div class="dcal-entries">${entries.slice(0, 2).map((e) => `<div class="dcal-entry dcal-${e.status}">${e.quantity}本</div>`).join("")}${entries.length > 2 ? `<div class="dcal-more">+${entries.length - 2}</div>` : ""}</div>` : ""}
            ${statusDot}
          </td>`;
        dayCounter++;
      }
    }
    cells += "</tr>";
  }

  const [prevY, prevM] = m === 1 ? [y - 1, 12] : [y, m - 1];
  const [nextY, nextM] = m === 12 ? [y + 1, 1] : [y, m + 1];
  const prevMonth = `${prevY}-${String(prevM).padStart(2, "0")}`;
  const nextMonth = `${nextY}-${String(nextM).padStart(2, "0")}`;

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">月別の納品予定・実績</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${prevMonth}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${y}年${m}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${nextMonth}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot dispatched"></span>出荷済</span>
        <span><span class="dcal-dot delivered"></span>配達完了</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${headerCells}</tr></thead>
        <tbody>${cells}</tbody>
      </table>
    </section>
  `;
}

// ── Forecast table rendering ────────────────────────────

const MONTHS_SHORT = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

function renderForecastTable(forecasts: ProductForecast[], selectedSegment: ProductionSegment | "all"): string {
  const filtered = selectedSegment === "all" ? forecasts : forecasts.filter((f) => f.segment === selectedSegment);

  const segmentCounts = {
    all: forecasts.length,
    monthly: forecasts.filter((f) => f.segment === "monthly").length,
    "made-to-order": forecasts.filter((f) => f.segment === "made-to-order").length,
    "november-only": forecasts.filter((f) => f.segment === "november-only").length,
    "annual-batch": forecasts.filter((f) => f.segment === "annual-batch").length
  };

  const tabs = (["all", "monthly", "made-to-order", "november-only", "annual-batch"] as const)
    .map((seg) => `
      <button class="button ${selectedSegment === seg ? "primary" : "secondary"} small" type="button" data-action="forecast-segment" data-segment="${seg}">
        ${seg === "all" ? "全て" : SEGMENT_LABELS[seg]} (${segmentCounts[seg]})
      </button>
    `).join("");

  const currentMonth = new Date().getMonth(); // 0-indexed

  const rows = filtered.map((f) => {
    const heatmap = f.monthlyShipments.map((v, i) => {
      const max = Math.max(...f.monthlyShipments, 1);
      const intensity = v / max;
      const bg = i === currentMonth
        ? `rgba(15,91,141,${0.2 + intensity * 0.6})`
        : `rgba(100,100,100,${intensity * 0.3})`;
      return `<td class="forecast-heat" style="background:${bg};" title="${MONTHS_SHORT[i]}: ${v.toLocaleString()}">${v > 0 ? v.toLocaleString() : ""}</td>`;
    }).join("");

    return `
      <tr>
        <td class="mono">${f.code}</td>
        <td>${f.name}</td>
        <td><span class="segment-badge" style="background:${SEGMENT_COLORS[f.segment]};">${SEGMENT_LABELS[f.segment]}</span></td>
        ${heatmap}
        <td class="numeric" style="font-weight:700;">${f.nextMonthForecast.toLocaleString()}</td>
        <td class="numeric">${f.adjustedAvg.toLocaleString()}</td>
        <td class="numeric">${f.safetyStock.toLocaleString()}</td>
      </tr>
    `;
  }).join("");

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>需要予測・在庫適正化</h2>
          <p class="panel-caption">商品セグメント別の月次出荷予測（12月スパイクを補正済み）</p>
        </div>
      </div>

      <div class="forecast-info">
        <div class="forecast-info-card">
          <strong>セグメント分類ロジック</strong>
          <ul>
            <li><span class="segment-badge" style="background:${SEGMENT_COLORS["monthly"]};">月次生産</span> 通年出荷（12月を除外した補正平均で予測）</li>
            <li><span class="segment-badge" style="background:${SEGMENT_COLORS["made-to-order"]};">受注生産</span> 年3回以下の不定期出荷品</li>
            <li><span class="segment-badge" style="background:${SEGMENT_COLORS["november-only"]};">11月限定</span> 歳暮等の年末商戦品（11月出荷60%超）</li>
            <li><span class="segment-badge" style="background:${SEGMENT_COLORS["annual-batch"]};">年間一括</span> 年1-2回の集中出荷品</li>
          </ul>
        </div>
      </div>

      <div class="button-group" style="margin-bottom:12px;">${tabs}</div>

      <div class="table-wrap">
        <table class="forecast-table">
          <thead>
            <tr>
              <th>コード</th>
              <th>商品名</th>
              <th>区分</th>
              ${MONTHS_SHORT.map((m, i) => `<th class="forecast-month-th ${i === currentMonth ? "current-month" : ""}">${m}</th>`).join("")}
              <th class="numeric">翌月予測</th>
              <th class="numeric">補正平均</th>
              <th class="numeric">安全在庫</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

// ── Main render ─────────────────────────────────────────

export function renderDemandForecast(state: DemandForecastState): string {
  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">業務ツール</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">出荷実績から商品別の需要を予測し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${renderDeliveryCalendar(state.deliveries, state.calendarMonth)}
    ${renderForecastTable(state.forecasts, state.selectedSegment)}
  `;
}

// ── Dashboard widget (compact) ──────────────────────────

export function renderDeliveryCalendarWidget(deliveries: DeliveryCalendarEntry[], calendarMonth: string): string {
  return renderDeliveryCalendar(deliveries, calendarMonth);
}
