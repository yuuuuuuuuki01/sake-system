import type { ShipmentCalendarData, ShipmentDay, VolumeBreakdown } from "../api";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function fmtAmount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10000) return `${Math.round(n / 1000)}千`;
  return `${n.toLocaleString()}円`;
}

function totalBottles(day: ShipmentDay | undefined): number {
  if (!day) return 0;
  return day.totalVolumes.reduce((s, v) => s + v.bottles, 0);
}

function buildCalendarCells(yearMonth: string): { date?: string; outside?: boolean }[] {
  const [year, month] = yearMonth.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const cells: { date?: string; outside?: boolean }[] = [];

  for (let i = 0; i < firstDay.getDay(); i++) cells.push({ outside: true });
  for (let d = 1; d <= lastDay.getDate(); d++) {
    cells.push({ date: `${yearMonth}-${String(d).padStart(2, "0")}` });
  }
  while (cells.length % 7 !== 0) cells.push({ outside: true });
  return cells;
}

/** 曜日別の集計を計算 */
function calcWeekdayStats(data: ShipmentCalendarData, yearMonth: string) {
  const [y, mo] = yearMonth.split("-").map(Number);
  const lastDay = new Date(y, mo, 0).getDate();
  const stats = Array.from({ length: 7 }, () => ({ count: 0, amount: 0, bottles: 0, days: 0 }));

  for (let d = 1; d <= lastDay; d++) {
    const dt = `${yearMonth}-${String(d).padStart(2, "0")}`;
    const wd = new Date(y, mo - 1, d).getDay();
    stats[wd].days++;
    const day = data[dt];
    if (day) {
      stats[wd].count += day.count;
      stats[wd].amount += day.totalAmount;
      stats[wd].bottles += totalBottles(day);
    }
  }
  return stats;
}

/** 週ごとの集計を計算（カレンダー行ごと = 日曜始まり） */
function calcWeeklyStats(data: ShipmentCalendarData, cells: { date?: string; outside?: boolean }[]) {
  const weeks: { count: number; amount: number; bottles: number; days: number }[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    const row = cells.slice(i, i + 7);
    let count = 0, amount = 0, bottles = 0, days = 0;
    for (const cell of row) {
      if (cell.date) {
        days++;
        const day = data[cell.date];
        if (day) {
          count += day.count;
          amount += day.totalAmount;
          bottles += totalBottles(day);
        }
      }
    }
    weeks.push({ count, amount, bottles, days });
  }
  return weeks;
}

export function renderShipmentCalendar(
  data: ShipmentCalendarData | null,
  yearMonth: string,
  selectedDate: string | null
): string {
  const [year, month] = yearMonth.split("-").map(Number);
  const prevDate = new Date(year, month - 2, 1);
  const nextDate = new Date(year, month, 1);
  const prevYM = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;
  const nextYM = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}`;
  const today = new Date().toISOString().slice(0, 10);

  const cells = buildCalendarCells(yearMonth);

  // 曜日別集計
  const wdStats = data ? calcWeekdayStats(data, yearMonth) : null;
  // 週別集計
  const weekStats = data ? calcWeeklyStats(data, cells) : null;

  // カレンダーセルHTML生成（週ごとに週計セルを追加）
  let calendarHtml = "";
  if (data === null) {
    calendarHtml = `<div class="sc-loading" style="grid-column:1/-1;"><div class="loading-spinner"></div><p>読み込み中…</p></div>`;
  } else {
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (cell.outside) {
        calendarHtml += `<div class="sc-cell sc-outside"></div>`;
      } else {
        const date = cell.date!;
        const day = Number(date.split("-")[2]);
        const weekday = new Date(`${date}T00:00:00`).getDay();
        const dayData = data[date];
        const isToday = date === today;
        const isSelected = date === selectedDate;

        let badge = "";
        let cities = "";
        if (dayData) {
          badge = `<span class="sc-badge">${dayData.count}件</span>`;
          cities = dayData.cityGroups
            .slice(0, 3)
            .map((g) => `<span class="sc-city-tag">${g.city}<em>${g.count}</em></span>`)
            .join("");
          if (dayData.cityGroups.length > 3) {
            cities += `<span class="sc-city-more">+${dayData.cityGroups.length - 3}</span>`;
          }
        }

        calendarHtml += `
          <div class="sc-cell ${isToday ? "sc-today" : ""} ${isSelected ? "sc-selected" : ""} ${dayData ? "sc-has-data" : ""}"
               data-sc-date="${date}">
            <div class="sc-day-header">
              <span class="sc-day-num ${weekday === 0 ? "sc-sun" : weekday === 6 ? "sc-sat" : ""}">${day}</span>
              ${badge}
            </div>
            <div class="sc-cities">${cities}</div>
          </div>`;
      }

      // 土曜（各行末）の後に週計セルを追加
      if ((i + 1) % 7 === 0 && weekStats) {
        const wk = weekStats[Math.floor(i / 7)];
        const wkAvg = wk.days > 0 ? (wk.count / wk.days) : 0;
        calendarHtml += `
          <div class="sc-cell sc-week-total">
            <div class="sc-wt-count">${wk.count}<small>件</small></div>
            <div class="sc-wt-amount">${fmtAmount(wk.amount)}</div>
            <div class="sc-wt-bottles">${wk.bottles}<small>本</small></div>
            <div class="sc-wt-avg">⌀${wkAvg.toFixed(1)}<small>件/日</small></div>
          </div>`;
      }
    }
  }

  // 曜日別サマリー行（曜日ヘッダーの直下）
  let wdSummaryHtml = "";
  if (wdStats) {
    wdSummaryHtml = wdStats.map((s, i) => {
      const avg = s.days > 0 ? (s.count / s.days) : 0;
      const cls = i === 0 ? "sc-sun" : i === 6 ? "sc-sat" : "";
      return `<div class="sc-wd-summary ${cls}">
        <span class="sc-wds-count">${s.count}<small>件</small></span>
        <span class="sc-wds-amt">${fmtAmount(s.amount)}</span>
        <span class="sc-wds-bottles">${s.bottles}<small>本</small></span>
        <span class="sc-wds-avg">⌀${avg.toFixed(1)}</span>
      </div>`;
    }).join("");
    // 月計（8列目）
    const monthCount = wdStats.reduce((a, s) => a + s.count, 0);
    const monthAmt = wdStats.reduce((a, s) => a + s.amount, 0);
    const monthBtl = wdStats.reduce((a, s) => a + s.bottles, 0);
    const monthDays = wdStats.reduce((a, s) => a + s.days, 0);
    const monthAvg = monthDays > 0 ? (monthCount / monthDays) : 0;
    wdSummaryHtml += `<div class="sc-wd-summary sc-wd-month-total">
      <span class="sc-wds-count">${monthCount}<small>件</small></span>
      <span class="sc-wds-amt">${fmtAmount(monthAmt)}</span>
      <span class="sc-wds-bottles">${monthBtl}<small>本</small></span>
      <span class="sc-wds-avg">⌀${monthAvg.toFixed(1)}</span>
    </div>`;
  }

  // 詳細パネル
  const detailHtml = selectedDate && data?.[selectedDate]
    ? renderDayDetail(data[selectedDate])
    : selectedDate
      ? `<div class="sc-detail-empty"><p>📦 ${selectedDate.slice(5)} は出荷なし</p></div>`
      : `<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>`;

  // 月合計
  const monthTotal = Object.values(data ?? {}).reduce((s, d) => s + d.count, 0);
  const monthAmount = Object.values(data ?? {}).reduce((s, d) => s + d.totalAmount, 0);

  return `
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${monthTotal > 0 ? `月計: <strong>${monthTotal}件</strong> / <strong>¥${monthAmount.toLocaleString()}</strong>` : ""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${prevYM}">◀</button>
          <span class="sc-month-label">${year}年${month}月</span>
          <button class="sc-nav-btn" data-sc-ym="${nextYM}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <!-- 曜日ヘッダー 8列 -->
          <div class="sc-weekdays-8">
            ${WEEKDAYS.map((w, i) =>
              `<div class="sc-weekday ${i === 0 ? "sc-sun" : i === 6 ? "sc-sat" : ""}">${w}</div>`
            ).join("")}
            <div class="sc-weekday sc-wk-header">週計</div>
          </div>

          <!-- 曜日別集計サマリー行 -->
          ${wdSummaryHtml ? `<div class="sc-wd-summary-row">${wdSummaryHtml}</div>` : ""}

          <!-- カレンダーグリッド 8列 -->
          <div class="sc-grid-8">
            ${calendarHtml}
          </div>
        </div>

        <div class="sc-detail-col${selectedDate ? " sc-detail-active" : ""}">
          ${detailHtml}
          ${selectedDate ? `<button class="sc-detail-close" data-sc-date="">✕ 閉じる</button>` : ""}
        </div>
      </div>
    </section>

    <style>
      .sc-panel { padding: 0; overflow: hidden; }
      .sc-header { padding: 16px 20px 12px; border-bottom: 1px solid var(--border, #e5e7eb); }
      .sc-title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
      .sc-title { font-size: 1.1rem; font-weight: 700; margin: 0; }
      .sc-month-summary { font-size: 0.85rem; color: var(--text-muted, #6b7280); }
      .sc-month-summary strong { color: var(--text, #111); }
      .sc-nav { display: flex; align-items: center; gap: 12px; }
      .sc-nav-btn { background: var(--bg-subtle, #f3f4f6); border: 1px solid var(--border, #e5e7eb); border-radius: 6px; padding: 4px 12px; cursor: pointer; font-size: 0.9rem; }
      .sc-nav-btn:hover { background: var(--bg-hover, #e5e7eb); }
      .sc-month-label { font-size: 1rem; font-weight: 600; min-width: 100px; text-align: center; }

      .sc-body { display: grid; grid-template-columns: 1fr 280px; min-height: 480px; }
      @media (max-width: 900px) { .sc-body { grid-template-columns: 1fr; } }

      .sc-calendar-col { padding: 12px 16px; border-right: 1px solid var(--border, #e5e7eb); overflow-x: auto; }

      /* 8列ヘッダー */
      .sc-weekdays-8 { display: grid; grid-template-columns: repeat(7, 1fr) 80px; margin-bottom: 0; }
      .sc-weekday { text-align: center; font-size: 0.75rem; font-weight: 600; color: var(--text-muted, #6b7280); padding: 4px 0; }
      .sc-weekday.sc-sun { color: #ef4444; }
      .sc-weekday.sc-sat { color: #3b82f6; }
      .sc-wk-header { background: #f0fdf4; color: #166534; font-weight: 700; border-radius: 4px 4px 0 0; }

      /* 曜日別集計サマリー行 */
      .sc-wd-summary-row { display: grid; grid-template-columns: repeat(7, 1fr) 80px; margin-bottom: 4px; border-bottom: 2px solid var(--border, #d1d5db); padding-bottom: 6px; }
      .sc-wd-summary { text-align: center; font-size: 0.65rem; line-height: 1.4; padding: 4px 2px; display: flex; flex-direction: column; align-items: center; gap: 1px; }
      .sc-wd-summary.sc-sun { color: #ef4444; }
      .sc-wd-summary.sc-sat { color: #3b82f6; }
      .sc-wd-summary.sc-wd-month-total { background: #f0fdf4; border-radius: 0 0 4px 4px; color: #166534; font-weight: 600; }
      .sc-wds-count { font-weight: 700; font-size: 0.72rem; }
      .sc-wds-amt { color: var(--text-muted, #6b7280); }
      .sc-wds-bottles { color: #92400e; }
      .sc-wds-avg { color: #0369a1; font-style: italic; }
      .sc-wd-summary small { font-size: 0.55rem; opacity: 0.7; }

      /* 8列グリッド */
      .sc-grid-8 { display: grid; grid-template-columns: repeat(7, 1fr) 80px; gap: 2px; }
      .sc-cell { min-height: 72px; border: 1px solid var(--border, #e5e7eb); border-radius: 6px; padding: 4px 6px; cursor: pointer; transition: background 0.1s, border-color 0.1s; }
      .sc-cell.sc-outside { background: transparent; border-color: transparent; cursor: default; }
      .sc-cell:not(.sc-outside):hover { background: var(--bg-hover, #f9fafb); border-color: var(--primary, #0F5B8D); }
      .sc-cell.sc-today { background: #eff6ff; border-color: #3b82f6; }
      .sc-cell.sc-selected { background: #dbeafe; border-color: #2563eb; border-width: 2px; }
      .sc-cell.sc-has-data .sc-day-num { font-weight: 700; }

      /* 週計セル */
      .sc-cell.sc-week-total {
        background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;
        padding: 4px 6px; cursor: default;
        display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2px;
        font-size: 0.7rem; color: #166534;
      }
      .sc-wt-count { font-weight: 700; font-size: 0.8rem; }
      .sc-wt-count small, .sc-wt-bottles small, .sc-wt-avg small { font-size: 0.55rem; opacity: 0.7; }
      .sc-wt-amount { font-size: 0.68rem; color: #15803d; }
      .sc-wt-bottles { color: #92400e; font-size: 0.68rem; }
      .sc-wt-avg { color: #0369a1; font-size: 0.62rem; font-style: italic; }

      .sc-day-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
      .sc-day-num { font-size: 0.8rem; color: var(--text, #111); }
      .sc-day-num.sc-sun { color: #ef4444; }
      .sc-day-num.sc-sat { color: #3b82f6; }
      .sc-badge { font-size: 0.65rem; background: var(--primary, #0F5B8D); color: #fff; border-radius: 10px; padding: 1px 5px; }

      .sc-cities { display: flex; flex-wrap: wrap; gap: 2px; }
      .sc-city-tag { font-size: 0.6rem; background: #e0f2fe; color: #0369a1; border-radius: 4px; padding: 1px 4px; display: flex; align-items: center; gap: 2px; }
      .sc-city-tag em { font-style: normal; font-weight: 700; }
      .sc-city-more { font-size: 0.6rem; color: var(--text-muted, #6b7280); }

      .sc-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; gap: 12px; color: var(--text-muted, #6b7280); }

      .sc-detail-col { padding: 16px; overflow-y: auto; max-height: 600px; }
      .sc-detail-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted, #6b7280); font-size: 0.9rem; text-align: center; padding: 40px 20px; }
      .sc-detail-close { display: none; }

      .sc-detail-date { font-size: 1rem; font-weight: 700; margin: 0 0 4px; }
      .sc-detail-meta { font-size: 0.8rem; color: var(--text-muted, #6b7280); margin-bottom: 12px; }
      .sc-city-section { margin-bottom: 12px; }
      .sc-city-label { font-size: 0.75rem; font-weight: 700; color: var(--primary, #0F5B8D); border-bottom: 1px solid #dbeafe; padding-bottom: 4px; margin-bottom: 6px; }
      .sc-customer-row { padding: 4px 0; font-size: 0.8rem; border-bottom: 1px solid var(--border, #e5e7eb); }
      .sc-customer-main { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
      .sc-customer-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .sc-customer-amt { flex-shrink: 0; color: var(--text-muted, #6b7280); font-size: 0.75rem; }
      .sc-customer-vols { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 2px; }
      .sc-vol-badge { font-size: 0.65rem; background: #fef3c7; color: #92400e; border-radius: 3px; padding: 1px 4px; display: flex; align-items: center; gap: 2px; }
      .sc-vol-badge em { font-style: normal; font-weight: 700; }
      .sc-day-volumes { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; padding: 8px; background: #fffbeb; border-radius: 6px; border: 1px solid #fde68a; }
      .sc-vol-tag { font-size: 0.8rem; color: #78350f; }
      .sc-vol-tag strong { margin-left: 2px; }

      /* ── スマホ ── */
      @media (max-width: 640px) {
        .sc-header { padding: 10px 12px 8px; }
        .sc-title { font-size: 0.95rem; }
        .sc-title-row { margin-bottom: 6px; gap: 8px; }
        .sc-month-summary { font-size: 0.75rem; }
        .sc-nav-btn { padding: 3px 10px; }
        .sc-month-label { font-size: 0.9rem; min-width: 80px; }

        .sc-body { grid-template-columns: 1fr; min-height: unset; }
        .sc-calendar-col { padding: 6px 8px; border-right: none; }
        .sc-weekdays-8 { grid-template-columns: repeat(7, 1fr) 56px; }
        .sc-wd-summary-row { grid-template-columns: repeat(7, 1fr) 56px; }
        .sc-grid-8 { grid-template-columns: repeat(7, 1fr) 56px; }
        .sc-weekday { font-size: 0.7rem; padding: 2px 0; }

        .sc-cell { min-height: 44px; padding: 2px 3px; border-radius: 4px; }
        .sc-day-num { font-size: 0.75rem; }
        .sc-badge { font-size: 0.6rem; padding: 1px 4px; }
        .sc-cities { display: none; }
        .sc-wd-summary-row { display: none; }

        .sc-detail-col { display: none; }
        .sc-detail-col.sc-detail-active {
          display: block;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #fff;
          border-top: 2px solid var(--primary, #0F5B8D);
          border-radius: 16px 16px 0 0;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.18);
          max-height: 50vh;
          overflow-y: auto;
          padding: 12px 16px 20px;
          z-index: 200;
        }
        .sc-detail-close {
          display: block;
          width: 100%;
          margin-top: 12px;
          padding: 8px;
          background: var(--bg-subtle, #f3f4f6);
          border: 1px solid var(--border, #e5e7eb);
          border-radius: 8px;
          font-size: 0.85rem;
          cursor: pointer;
          color: var(--text-muted, #6b7280);
        }
      }
    </style>
  `;
}

function renderVolumeBadges(volumes: VolumeBreakdown[]): string {
  if (!volumes.length) return "";
  return volumes.map(v =>
    `<span class="sc-vol-badge">${v.label}<em>${v.bottles}</em></span>`
  ).join("");
}

function renderDayDetail(day: ShipmentDay): string {
  const dateLabel = day.date.replace(/-/g, "/").slice(5);

  // 日合計の容量別本数
  const dayVolHtml = day.totalVolumes.length
    ? `<div class="sc-day-volumes">${day.totalVolumes.map(v =>
        `<span class="sc-vol-tag">${v.label} <strong>${v.bottles}本</strong></span>`
      ).join("")}</div>`
    : "";

  // 市区町村ごとにグループ化
  const byCity: Record<string, typeof day.entries> = {};
  for (const e of day.entries) {
    (byCity[e.city] ??= []).push(e);
  }

  const sections = Object.entries(byCity)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([city, entries]) => {
      const rows = entries
        .sort((a, b) => b.amount - a.amount)
        .map(
          (e) => `
          <div class="sc-customer-row">
            <div class="sc-customer-main">
              <span class="sc-customer-name" title="${e.customerName}">${e.customerName}</span>
              <span class="sc-customer-amt">${e.amount > 0 ? `¥${e.amount.toLocaleString()}` : "-"}${e.invoiceCount > 1 ? ` (${e.invoiceCount}伝票)` : ""}</span>
            </div>
            ${e.volumes.length ? `<div class="sc-customer-vols">${renderVolumeBadges(e.volumes)}</div>` : ""}
          </div>`
        )
        .join("");
      return `
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${city}（${entries.length}先）</div>
          ${rows}
        </div>`;
    })
    .join("");

  return `
    <p class="sc-detail-date">${dateLabel}の出荷</p>
    <p class="sc-detail-meta">${day.entries.length}先 ${day.count}伝票 / ¥${day.totalAmount.toLocaleString()}</p>
    ${dayVolHtml}
    ${sections}
  `;
}
