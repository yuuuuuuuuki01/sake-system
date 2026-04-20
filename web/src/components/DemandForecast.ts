import type { ProductMonthlyShipment, DeliveryScheduleEntry } from "../api";

// ── Types ───────────────────────────────────────────────

export type ProductionSegment = "monthly" | "made-to-order" | "november-only" | "annual-batch";

export interface ProductForecast {
  code: string;
  name: string;
  segment: ProductionSegment;
  monthlyQuantity: number[]; // 0=Jan...11=Dec
  avgMonthly: number;
  adjustedAvg: number;
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

// ── Forecast computation from real data ─────────────────

function inferSegment(monthlyQty: number[]): ProductionSegment {
  const nonZeroMonths = monthlyQty.filter((v) => v > 0).length;
  const total = monthlyQty.reduce((s, v) => s + v, 0);
  if (total === 0) return "made-to-order";

  const novShare = monthlyQty[10] / total;
  const decShare = monthlyQty[11] / total;

  // November-only: >50% of annual shipments in Nov (歳暮系)
  if (novShare > 0.5) return "november-only";
  // Made-to-order: only ships in 1-3 months sporadically
  if (nonZeroMonths <= 3) return "made-to-order";
  // Annual batch: concentrated in 1-4 months (not Nov)
  if (nonZeroMonths <= 4 && novShare < 0.3) return "annual-batch";
  // Monthly: ships regularly
  return "monthly";
}

function computeAdjustedAvg(monthlyQty: number[], segment: ProductionSegment): number {
  if (segment === "monthly") {
    // Exclude December (index 11) to avoid gift-season spike
    const withoutDec = monthlyQty.filter((_, i) => i !== 11);
    const nonZero = withoutDec.filter((v) => v > 0);
    if (nonZero.length === 0) return 0;
    // Trimmed mean: also remove highest value for robustness
    const sorted = [...nonZero].sort((a, b) => a - b);
    if (sorted.length > 2) {
      const trimmed = sorted.slice(0, -1);
      return Math.round(trimmed.reduce((s, v) => s + v, 0) / trimmed.length);
    }
    return Math.round(nonZero.reduce((s, v) => s + v, 0) / nonZero.length);
  }
  if (segment === "november-only") {
    return monthlyQty[10];
  }
  if (segment === "annual-batch") {
    return monthlyQty.reduce((s, v) => s + v, 0);
  }
  // made-to-order
  const nonZero = monthlyQty.filter((v) => v > 0);
  return nonZero.length > 0 ? Math.round(nonZero.reduce((s, v) => s + v, 0) / nonZero.length) : 0;
}

function computeNextMonthForecast(monthlyQty: number[], segment: ProductionSegment): number {
  const nextMonth = (new Date().getMonth() + 1) % 12;
  if (segment === "november-only") {
    return nextMonth === 10 ? monthlyQty[10] : 0;
  }
  if (segment === "annual-batch") {
    const maxMonth = monthlyQty.indexOf(Math.max(...monthlyQty));
    return nextMonth === maxMonth ? monthlyQty.reduce((s, v) => s + v, 0) : 0;
  }
  if (segment === "made-to-order") {
    return 0;
  }
  // monthly: use historical value for that specific month if available, otherwise adjusted avg
  if (monthlyQty[nextMonth] > 0) return monthlyQty[nextMonth];
  return computeAdjustedAvg(monthlyQty, segment);
}

export function buildForecastsFromShipments(shipments: ProductMonthlyShipment[]): ProductForecast[] {
  return shipments.slice(0, 50).map((product) => {
    const monthlyQty = product.monthlyQuantity;
    const segment = inferSegment(monthlyQty);
    const avgMonthly = Math.round(product.totalQuantity / 12);
    const adjustedAvg = computeAdjustedAvg(monthlyQty, segment);
    const nextMonthForecast = computeNextMonthForecast(monthlyQty, segment);
    const annualForecast = segment === "monthly"
      ? adjustedAvg * 11 + monthlyQty[11]
      : product.totalQuantity;
    const safetyStock = segment === "monthly"
      ? Math.round(adjustedAvg * 1.5)
      : segment === "november-only"
        ? Math.round(monthlyQty[10] * 0.1)
        : 0;

    return {
      code: product.code,
      name: product.name,
      segment,
      monthlyQuantity: monthlyQty,
      avgMonthly,
      adjustedAvg,
      nextMonthForecast,
      annualForecast,
      safetyStock
    };
  });
}

export function buildDeliveriesFromSchedule(entries: DeliveryScheduleEntry[]): DeliveryCalendarEntry[] {
  const today = new Date().toISOString().slice(0, 10);
  return entries.map((e) => ({
    date: e.date,
    customerName: e.customerName,
    productName: e.productName,
    quantity: e.quantity,
    status: e.date > today ? "scheduled" : "delivered"
  }));
}

// ── Delivery calendar rendering ─────────────────────────

function getDaysInMonth(yearMonth: string): number {
  const [y, m] = yearMonth.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

function getFirstDayOfWeek(yearMonth: string): number {
  const [y, m] = yearMonth.split("-").map(Number);
  return new Date(y, m - 1, 1).getDay();
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

  // Summary for this month
  const monthDeliveries = deliveries.filter((d) => d.date.slice(0, 7) === calendarMonth);
  const monthTotal = monthDeliveries.reduce((s, d) => s + d.quantity, 0);
  const monthDays = new Set(monthDeliveries.map((d) => d.date)).size;

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
        const dayQty = entries.reduce((s, e) => s + e.quantity, 0);
        cells += `
          <td class="dcal-cell ${isToday ? "dcal-today" : ""}">
            <div class="dcal-day">${dayCounter}</div>
            ${entries.length > 0 ? `
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${entries[0].status}">${entries.length}件 ${dayQty}本</div>
              </div>
            ` : ""}
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
          <p class="panel-caption">${y}年${m}月: ${monthDays}日稼働 / ${monthDeliveries.length}件 / 合計${monthTotal.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${prevMonth}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${y}年${m}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${nextMonth}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
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

  const currentMonth = new Date().getMonth();

  const rows = filtered.map((f) => {
    const maxQty = Math.max(...f.monthlyQuantity, 1);
    const heatmap = f.monthlyQuantity.map((v, i) => {
      const intensity = v / maxQty;
      const bg = i === currentMonth
        ? `rgba(15,91,141,${0.15 + intensity * 0.55})`
        : i === 11
          ? `rgba(200,50,50,${intensity * 0.4})`  // Dec in red tone
          : `rgba(100,100,100,${intensity * 0.35})`;
      return `<td class="forecast-heat" style="background:${bg};" title="${MONTHS_SHORT[i]}: ${v.toLocaleString()}本">${v > 0 ? v.toLocaleString() : "—"}</td>`;
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

  if (forecasts.length === 0) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div><h2>需要予測</h2></div>
        </div>
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
          <p class="loading-text">出荷データを読み込んでいます…</p>
        </div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>需要予測・在庫適正化</h2>
          <p class="panel-caption">商品×月の実出荷量ベース（12月歳暮スパイクを補正）</p>
        </div>
      </div>

      <div class="forecast-info">
        <div class="forecast-info-card">
          <strong>セグメント自動分類</strong>
          <ul>
            <li><span class="segment-badge" style="background:${SEGMENT_COLORS["monthly"]};">月次生産</span> 通年出荷品。12月を除いたトリム平均で予測</li>
            <li><span class="segment-badge" style="background:${SEGMENT_COLORS["made-to-order"]};">受注生産</span> 年3回以下の不定期出荷品。予測不可</li>
            <li><span class="segment-badge" style="background:${SEGMENT_COLORS["november-only"]};">11月限定</span> 歳暮等の年末商戦品（11月出荷50%超）</li>
            <li><span class="segment-badge" style="background:${SEGMENT_COLORS["annual-batch"]};">年間一括</span> 年1〜4回の集中出荷品</li>
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
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
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
