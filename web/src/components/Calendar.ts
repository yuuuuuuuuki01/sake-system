import type { CalendarEvent } from "../api";
import { CALENDAR_CATEGORY_COLORS, CALENDAR_CATEGORY_LABELS } from "../api";

export interface CalendarEditState {
  isOpen: boolean;
  isNew: boolean;
  event: Partial<CalendarEvent>;
}

export function renderCalendar(
  events: CalendarEvent[],
  yearMonth: string, // "YYYY-MM"
  filterCategory: string,
  editState: CalendarEditState | null
): string {
  const [year, month] = yearMonth.split("-").map((s) => parseInt(s, 10));
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();

  // 月のセル数 (前月空白 + 当月日数 を 7週で揃える)
  const cells: { date?: Date; isOutside?: boolean }[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push({ isOutside: true });
  for (let d = 1; d <= totalDays; d++) cells.push({ date: new Date(year, month - 1, d) });
  while (cells.length % 7 !== 0) cells.push({ isOutside: true });

  const filtered = filterCategory
    ? events.filter((e) => e.category === filterCategory)
    : events;

  // 日付ごとにイベントをグループ化
  const eventsByDate: Record<string, CalendarEvent[]> = {};
  filtered.forEach((e) => {
    const key = e.startsAt.slice(0, 10);
    eventsByDate[key] ??= [];
    eventsByDate[key].push(e);
  });

  const today = new Date().toISOString().slice(0, 10);
  const cellsHtml = cells
    .map((c) => {
      if (c.isOutside) return '<div class="cal-cell cal-outside"></div>';
      const d = c.date as Date;
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const dayEvents = eventsByDate[dateKey] ?? [];
      const isToday = dateKey === today;
      const weekday = d.getDay();
      return `
        <div class="cal-cell ${isToday ? "cal-today" : ""} ${weekday === 0 ? "cal-sun" : weekday === 6 ? "cal-sat" : ""}"
             data-cal-date="${dateKey}">
          <div class="cal-day-num">${d.getDate()}</div>
          <div class="cal-events">
            ${dayEvents
              .slice(0, 3)
              .map(
                (e) => `
              <button class="cal-event" data-cal-event-id="${e.id}"
                      style="background:${e.color || CALENDAR_CATEGORY_COLORS[e.category] || "#0F5B8D"};"
                      title="${e.title}">
                <span class="cal-event-time">${e.isAllDay ? "終日" : new Date(e.startsAt).toTimeString().slice(0, 5)}</span>
                <span class="cal-event-title">${e.title}</span>
              </button>
            `
              )
              .join("")}
            ${dayEvents.length > 3 ? `<button class="cal-event-more" data-cal-date="${dateKey}">+${dayEvents.length - 3}件</button>` : ""}
          </div>
        </div>
      `;
    })
    .join("");

  // 編集モーダル
  const modalHtml = editState?.isOpen ? renderEventModal(editState) : "";

  // ナビゲーション
  const prevMonth = new Date(year, month - 2, 1);
  const nextMonth = new Date(year, month, 1);
  const prevYM = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, "0")}`;
  const nextYM = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`;
  const todayYM = (() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}`;
  })();

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${year}年 ${month}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${prevYM}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${todayYM}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${nextYM}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${yearMonth}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(CALENDAR_CATEGORY_LABELS)
                .map(([k, v]) => `<option value="${k}" ${filterCategory === k ? "selected" : ""}>${v}</option>`)
                .join("")}
            </select>
          </label>
        </div>
      </div>

      <div class="cal-grid">
        <div class="cal-weekday cal-sun">日</div>
        <div class="cal-weekday">月</div>
        <div class="cal-weekday">火</div>
        <div class="cal-weekday">水</div>
        <div class="cal-weekday">木</div>
        <div class="cal-weekday">金</div>
        <div class="cal-weekday cal-sat">土</div>
        ${cellsHtml}
      </div>
    </section>

    ${modalHtml}
  `;
}

function renderEventModal(state: CalendarEditState): string {
  const e = state.event;
  return `
    <div class="modal-backdrop" data-action="cal-close">
      <div class="modal-panel" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>${state.isNew ? "新規予定" : "予定の編集"}</h3>
          <button class="modal-close" data-action="cal-close">×</button>
        </div>
        <div class="modal-body">
          <label class="field">
            <span>タイトル</span>
            <input id="cal-title" type="text" value="${e.title ?? ""}" placeholder="例: 青葉商事 納品" />
          </label>
          <div style="display:flex;gap:8px;">
            <label class="field" style="flex:1;">
              <span>分類</span>
              <select id="cal-category">
                ${Object.entries(CALENDAR_CATEGORY_LABELS)
                  .map(([k, v]) => `<option value="${k}" ${e.category === k ? "selected" : ""}>${v}</option>`)
                  .join("")}
              </select>
            </label>
            <label style="display:flex;align-items:center;gap:6px;align-self:flex-end;padding-bottom:8px;">
              <input id="cal-allday" type="checkbox" ${e.isAllDay ? "checked" : ""} />
              終日
            </label>
          </div>
          <div style="display:flex;gap:8px;">
            <label class="field" style="flex:1;">
              <span>開始</span>
              <input id="cal-starts" type="datetime-local" value="${e.startsAt ? toLocalInput(e.startsAt) : ""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${e.endsAt ? toLocalInput(e.endsAt) : ""}" />
            </label>
          </div>
          <label class="field">
            <span>場所</span>
            <input id="cal-location" type="text" value="${e.location ?? ""}" placeholder="蔵 / 客先 / Zoom など" />
          </label>
          <label class="field">
            <span>関連顧客コード (任意)</span>
            <input id="cal-customer" type="text" value="${e.relatedCustomerCode ?? ""}" />
          </label>
          <label class="field">
            <span>メモ</span>
            <textarea id="cal-description" rows="3" placeholder="持参物・備考など">${e.description ?? ""}</textarea>
          </label>
        </div>
        <div class="action-bar" style="padding:12px 20px;border-top:1px solid var(--border);">
          ${
            !state.isNew
              ? `<button class="button secondary" data-action="cal-delete" data-id="${e.id}" style="color:var(--danger);margin-right:auto;">削除</button>`
              : ""
          }
          <button class="button secondary" data-action="cal-close">キャンセル</button>
          <button class="button primary" data-action="cal-save" data-id="${e.id ?? ""}">保存</button>
        </div>
      </div>
    </div>
  `;
}

function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
