import type { ShipmentCalendarData, ShipmentDay, VolumeBreakdown } from "../api";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function fmtAmount(n: number): string {
  return n >= 10000
    ? `${Math.round(n / 1000)}千`
    : `${n.toLocaleString()}円`;
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

  const calendarHtml = cells.map((cell) => {
    if (cell.outside) return `<div class="sc-cell sc-outside"></div>`;

    const date = cell.date!;
    const day = Number(date.split("-")[2]);
    const weekday = new Date(`${date}T00:00:00`).getDay();
    const dayData = data?.[date];
    const isToday = date === today;
    const isSelected = date === selectedDate;

    let badge = "";
    let cities = "";
    if (dayData) {
      badge = `<span class="sc-badge">${dayData.count}件</span>`;
      cities = dayData.cityGroups
        .slice(0, 3)
        .map(
          (g) =>
            `<span class="sc-city-tag">${g.city}<em>${g.count}</em></span>`
        )
        .join("");
      if (dayData.cityGroups.length > 3) {
        cities += `<span class="sc-city-more">+${dayData.cityGroups.length - 3}</span>`;
      }
    }

    return `
      <div class="sc-cell ${isToday ? "sc-today" : ""} ${isSelected ? "sc-selected" : ""} ${dayData ? "sc-has-data" : ""}"
           data-sc-date="${date}">
        <div class="sc-day-header">
          <span class="sc-day-num ${weekday === 0 ? "sc-sun" : weekday === 6 ? "sc-sat" : ""}">${day}</span>
          ${badge}
        </div>
        <div class="sc-cities">${cities}</div>
      </div>
    `;
  }).join("");

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
          <div class="sc-weekdays">
            ${WEEKDAYS.map((w, i) =>
              `<div class="sc-weekday ${i === 0 ? "sc-sun" : i === 6 ? "sc-sat" : ""}">${w}</div>`
            ).join("")}
          </div>
          <div class="sc-grid">
            ${data === null
              ? `<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>`
              : calendarHtml}
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

      .sc-calendar-col { padding: 12px 16px; border-right: 1px solid var(--border, #e5e7eb); }
      .sc-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 4px; }
      .sc-weekday { text-align: center; font-size: 0.75rem; font-weight: 600; color: var(--text-muted, #6b7280); padding: 4px 0; }
      .sc-weekday.sc-sun { color: #ef4444; }
      .sc-weekday.sc-sat { color: #3b82f6; }

      .sc-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
      .sc-cell { min-height: 72px; border: 1px solid var(--border, #e5e7eb); border-radius: 6px; padding: 4px 6px; cursor: pointer; transition: background 0.1s, border-color 0.1s; }
      .sc-cell.sc-outside { background: transparent; border-color: transparent; cursor: default; }
      .sc-cell:not(.sc-outside):hover { background: var(--bg-hover, #f9fafb); border-color: var(--primary, #0F5B8D); }
      .sc-cell.sc-today { background: #eff6ff; border-color: #3b82f6; }
      .sc-cell.sc-selected { background: #dbeafe; border-color: #2563eb; border-width: 2px; }
      .sc-cell.sc-has-data .sc-day-num { font-weight: 700; }

      .sc-day-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
      .sc-day-num { font-size: 0.8rem; color: var(--text, #111); }
      .sc-day-num.sc-sun { color: #ef4444; }
      .sc-day-num.sc-sat { color: #3b82f6; }
      .sc-badge { font-size: 0.65rem; background: var(--primary, #0F5B8D); color: #fff; border-radius: 10px; padding: 1px 5px; }

      .sc-cities { display: flex; flex-wrap: wrap; gap: 2px; }
      .sc-city-tag { font-size: 0.6rem; background: #e0f2fe; color: #0369a1; border-radius: 4px; padding: 1px 4px; display: flex; align-items: center; gap: 2px; }
      .sc-city-tag em { font-style: normal; font-weight: 700; }
      .sc-city-more { font-size: 0.6rem; color: var(--text-muted, #6b7280); }

      .sc-loading { grid-column: 1/-1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; gap: 12px; color: var(--text-muted, #6b7280); }

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

      /* ── スマホ: 1画面レイアウト ── */
      @media (max-width: 640px) {
        .sc-header { padding: 10px 12px 8px; }
        .sc-title { font-size: 0.95rem; }
        .sc-title-row { margin-bottom: 6px; gap: 8px; }
        .sc-month-summary { font-size: 0.75rem; }
        .sc-nav-btn { padding: 3px 10px; }
        .sc-month-label { font-size: 0.9rem; min-width: 80px; }

        .sc-body { grid-template-columns: 1fr; min-height: unset; }
        .sc-calendar-col { padding: 6px 8px; border-right: none; }
        .sc-weekday { font-size: 0.7rem; padding: 2px 0; }

        /* セルを低くして6行が画面に収まるように */
        .sc-cell { min-height: 44px; padding: 2px 3px; border-radius: 4px; }
        .sc-day-num { font-size: 0.75rem; }
        .sc-badge { font-size: 0.6rem; padding: 1px 4px; }
        /* 都市タグはセル内に非表示 (タップで詳細表示するため) */
        .sc-cities { display: none; }

        /* 詳細パネル: 下から出るボトムシート */
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
