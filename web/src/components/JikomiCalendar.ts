import type { JikomiRecord } from "../api";

interface WeekCell {
  start: Date;
  end: Date;
  label: string;
}

function startOfMonth(base: Date): Date {
  return new Date(base.getFullYear(), base.getMonth(), 1);
}

function addMonths(base: Date, diff: number): Date {
  return new Date(base.getFullYear(), base.getMonth() + diff, 1);
}

function addDays(base: Date, diff: number): Date {
  const next = new Date(base);
  next.setDate(next.getDate() + diff);
  return next;
}

function startOfWeek(base: Date): Date {
  const next = new Date(base);
  const day = next.getDay();
  next.setDate(next.getDate() - day);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfWeek(base: Date): Date {
  const next = addDays(startOfWeek(base), 6);
  next.setHours(23, 59, 59, 999);
  return next;
}

function parseDate(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

function formatDate(value: Date): string {
  return `${value.getMonth() + 1}/${value.getDate()}`;
}

function escapeAttribute(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function buildWeeks(): WeekCell[] {
  const today = new Date();
  const from = startOfWeek(addMonths(startOfMonth(today), -3));
  const to = endOfWeek(new Date(today.getFullYear(), today.getMonth() + 4, 0));
  const weeks: WeekCell[] = [];
  let cursor = new Date(from);

  while (cursor <= to) {
    const end = endOfWeek(cursor);
    weeks.push({
      start: new Date(cursor),
      end,
      label: `${formatDate(cursor)} - ${formatDate(end)}`
    });
    cursor = addDays(cursor, 7);
  }

  return weeks;
}

export function renderJikomiCalendar(records: JikomiRecord[]): string {
  const weeks = buildWeeks();
  const gridTemplate = `160px repeat(${weeks.length}, minmax(56px, 1fr))`;

  const header = weeks
    .map(
      (week) => `
        <div class="gantt-week">
          <span>${week.label}</span>
        </div>
      `
    )
    .join("");

  const rows = records.length
    ? records
        .map((record) => {
          const start = parseDate(record.startDate);
          const end = parseDate(record.expectedDoneDate);
          const startIndex = Math.max(0, weeks.findIndex((week) => week.end >= start));
          const endIndex = Math.max(
            startIndex,
            weeks.reduce((latest, week, index) => (week.start <= end ? index : latest), startIndex)
          );
          const tooltip = [
            `仕込番号: ${record.jikomiNo}`,
            `銘柄: ${record.productName}`,
            `期間: ${record.startDate} - ${record.expectedDoneDate}`,
            `タンク: ${record.tankNo}`,
            `備考: ${record.note || "なし"}`
          ].join("\n");

          return `
            <div class="gantt-row" style="grid-template-columns:${gridTemplate}">
              <div class="gantt-label">
                <strong>${record.jikomiNo}</strong>
                <span class="table-sub">${record.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${weeks.length}">
                <div
                  class="gantt-bar ${record.status}"
                  style="grid-column:${startIndex + 1} / ${endIndex + 2}"
                  title="${escapeAttribute(tooltip)}"
                >
                  ${record.jikomiNo} / ${record.productName}
                </div>
              </div>
            </div>
          `;
        })
        .join("")
    : `<p class="empty-note">仕込データがありません。</p>`;

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>仕込カレンダー</h2>
          <p class="panel-caption">現在月を中心に前後3ヶ月を週単位で表示</p>
        </div>
      </div>
      <div class="gantt-wrap">
        <div class="gantt-grid" style="grid-template-columns:${gridTemplate}">
          <div class="gantt-corner">仕込</div>
          ${header}
        </div>
        ${rows}
      </div>
    </section>
  `;
}
