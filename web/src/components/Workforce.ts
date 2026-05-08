import type { StaffMember, StaffDepartment, BrewingScheduleRow, MonthlyTask, WorkforceMetrics, DailyShiftPlan } from '../api';
import { DEPT_LABEL, MONTHLY_TASK_LABEL, SHIFT_PREF_LABEL } from '../api';

export type WorkforceTab = 'staff' | 'shift' | 'cost';

// ── 定数 ─────────────────────────────────────────────────────────────────────

const BOTTLING_LINE_SIZE             = 4;       // 詰口ライン定員（最低4名）
const LABELING_MIN                   = 1;       // 貼場最小人数（1名〜）
const LINE_MAX_DAILY                 = 4000;    // 日産最大本数（1800ml換算）
const DELIVERY_CAPACITY_PER_VEHICLE  = 300_000; // 1台あたり積載目安（円/日）
const MAX_DELIVERY_VEHICLES          = 2;       // 最大車両台数

const DEPT_SHORT: Record<StaffDepartment, string> = {
  soumu:       '総',
  route_sales: 'ル',
  brewing:     '造',
  bottling:    '詰',
  labeling:    '貼',
  delivery:    '配',
};

function fmtYen(n: number | null | undefined): string {
  if (n == null) return '—';
  return '¥' + Math.round(n).toLocaleString('ja-JP');
}

function monthName(m: number): string { return `${m}月`; }

const DEPT_COLOR: Record<StaffDepartment, string> = {
  soumu:       '#3b82f6',
  route_sales: '#10b981',
  brewing:     '#8b5cf6',
  bottling:    '#f59e0b',
  labeling:    '#ec4899',
  delivery:    '#6b7280',
};

const EMP_TYPE_LABEL: Record<string, string> = {
  employee:   '社員',
  part_time:  'パート',
  contractor: '業務委託',
};

const EMP_TYPE_COLOR: Record<string, string> = {
  employee:   '#10b981',
  part_time:  '#f59e0b',
  contractor: '#6b7280',
};

// ── スタッフ一覧タブ ──────────────────────────────────────────────────────────

function renderStaffTab(staff: StaffMember[], deptFilter: string): string {
  const depts = Object.keys(DEPT_LABEL) as StaffDepartment[];
  const filtered = deptFilter ? staff.filter(s => s.department === deptFilter) : staff;
  const active   = filtered.filter(s => s.isActive);
  const inactive = filtered.filter(s => !s.isActive);

  function deptBadge(dept: StaffDepartment): string {
    return `<span style="display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${DEPT_COLOR[dept]};">${DEPT_LABEL[dept]}</span>`;
  }

  function crossBadges(s: StaffMember): string {
    if (!s.crossDepartments.length) return '';
    return s.crossDepartments.map(d =>
      `<span style="display:inline-block;padding:0 5px;border-radius:8px;font-size:10px;border:1px solid ${DEPT_COLOR[d]};color:${DEPT_COLOR[d]};margin-left:3px;">${DEPT_LABEL[d]}</span>`
    ).join('');
  }

  function wageLabel(s: StaffMember): string {
    if (s.employmentType === 'employee')   return `月給 ${fmtYen(s.monthlySalary)}`;
    if (s.employmentType === 'contractor') return `委託 ${fmtYen(s.contractFee)}/日`;
    const pref = s.shiftPreference ? SHIFT_PREF_LABEL[s.shiftPreference] : '';
    return `時給 ${fmtYen(s.hourlyRate)}${pref ? `・${pref}` : ''}`;
  }

  function taskBadges(s: StaffMember): string {
    if (!s.monthlyTasks.length) return '';
    return s.monthlyTasks.map(t =>
      `<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#7c3aed20;color:#7c3aed;border:1px solid #7c3aed40;margin-left:3px;">${MONTHLY_TASK_LABEL[t]}</span>`
    ).join('');
  }

  function row(s: StaffMember): string {
    const months = s.availableMonths ? s.availableMonths.map(monthName).join('・') : '通年';
    return `<tr class="${s.isActive ? '' : 'row-inactive'}">
      <td>
        ${s.name}${s.kana ? `<br><span style="font-size:11px;color:var(--text-secondary);">${s.kana}</span>` : ''}
        ${taskBadges(s)}
      </td>
      <td>${deptBadge(s.department)}${crossBadges(s)}</td>
      <td><span class="status-pill" style="background:${EMP_TYPE_COLOR[s.employmentType]}20;color:${EMP_TYPE_COLOR[s.employmentType]};border:1px solid ${EMP_TYPE_COLOR[s.employmentType]}40;">${EMP_TYPE_LABEL[s.employmentType]}</span></td>
      <td style="font-size:13px;">${wageLabel(s)}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${months}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${s.notes || ''}</td>
      <td style="white-space:nowrap;">
        <button class="button secondary small" data-edit-staff="${s.id}">編集</button>
        <button class="button secondary small danger" data-delete-staff="${s.id}" data-staff-name="${s.name}" style="margin-left:4px;">削除</button>
      </td>
    </tr>`;
  }

  const filterButtons = ['', ...depts].map(d =>
    `<button class="button ${deptFilter === d ? 'primary' : 'secondary'} small" data-staff-dept-filter="${d}">${d ? DEPT_LABEL[d as StaffDepartment] : '全部門'}</button>`
  ).join('');

  const colSpan = 7;
  return `
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      <div style="display:flex;gap:4px;flex-wrap:wrap;">${filterButtons}</div>
      <button class="button primary small" data-action="staff-new" style="margin-left:auto;">＋ スタッフ追加</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>氏名</th><th>主部門 / 兼務</th><th>種別</th><th>賃金</th><th>稼働月</th><th>備考</th><th></th>
        </tr></thead>
        <tbody>
          ${active.map(row).join('') || `<tr><td colspan="${colSpan}" class="empty-row">スタッフが登録されていません</td></tr>`}
          ${inactive.length > 0 ? `
            <tr><td colspan="${colSpan}" style="padding:4px 8px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);">── 休職・退職・終了 ──</td></tr>
            ${inactive.map(row).join('')}
          ` : ''}
        </tbody>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:6px;">
      枠付きバッジ = 兼務可能部門（越境）
    </p>
  `;
}

// ── スタッフ登録モーダル ───────────────────────────────────────────────────────

export function renderStaffModal(s?: StaffMember): string {
  const isEdit   = !!s?.id;
  const availStr = s?.availableMonths ? s.availableMonths.join(',') : '';
  const depts    = Object.keys(DEPT_LABEL) as StaffDepartment[];

  const deptOptions = depts.map(d =>
    `<option value="${d}" ${s?.department === d ? 'selected' : ''}>${DEPT_LABEL[d]}</option>`
  ).join('');

  // 兼務チェックボックス
  const crossChecks = depts.map(d => `
    <label style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;font-size:13px;">
      <input type="checkbox" name="sf-cross" value="${d}" ${s?.crossDepartments?.includes(d) ? 'checked' : ''} />
      ${DEPT_LABEL[d]}
    </label>`
  ).join('');

  return `
    <div class="modal-overlay" id="staff-modal">
      <div class="modal-content panel" style="max-width:540px;max-height:90vh;overflow-y:auto;">
        <h2>${isEdit ? 'スタッフ編集' : 'スタッフ追加'}</h2>
        <form id="staff-form" class="feature-form">
          <input type="hidden" id="sf-id" value="${s?.id ?? ''}" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">

            <div class="form-row" style="grid-column:1/-1;">
              <label>氏名 *</label>
              <input type="text" id="sf-name" value="${s?.name ?? ''}" required />
            </div>
            <div class="form-row" style="grid-column:1/-1;">
              <label>カナ</label>
              <input type="text" id="sf-kana" value="${s?.kana ?? ''}" />
            </div>

            <div class="form-row">
              <label>主部門</label>
              <select id="sf-dept">${deptOptions}</select>
            </div>
            <div class="form-row">
              <label>雇用形態</label>
              <select id="sf-emp-type">
                <option value="part_time"  ${s?.employmentType === 'part_time'  ? 'selected' : ''}>パート（呼び出し型）</option>
                <option value="employee"   ${s?.employmentType === 'employee'   ? 'selected' : ''}>社員</option>
                <option value="contractor" ${s?.employmentType === 'contractor' ? 'selected' : ''}>業務委託</option>
              </select>
            </div>

            <!-- パート用 -->
            <div class="form-row" id="sf-hourly-row">
              <label>時給（円）</label>
              <input type="number" id="sf-hourly" value="${s?.hourlyRate ?? ''}" min="0" />
            </div>
            <div class="form-row" id="sf-hours-row">
              <label>1回あたり勤務時間（h）</label>
              <input type="number" id="sf-hours" value="${s?.workHoursPerDay ?? 8}" min="0.5" max="24" step="0.5" />
            </div>

            <!-- 社員用 -->
            <div class="form-row" id="sf-salary-row" style="grid-column:1/-1;">
              <label>月給（円）</label>
              <input type="number" id="sf-salary" value="${s?.monthlySalary ?? ''}" min="0" />
            </div>

            <!-- 業務委託用 -->
            <div class="form-row" id="sf-contract-row" style="grid-column:1/-1;">
              <label>日額委託費（円/日）</label>
              <input type="number" id="sf-contract-fee" value="${s?.contractFee ?? ''}" min="0" />
            </div>

            <!-- パート用：シフト区分 -->
            <div class="form-row" id="sf-shift-pref-row" style="grid-column:1/-1;">
              <label>シフト区分</label>
              <div style="display:flex;gap:12px;padding:4px 0;">
                ${(['morning','afternoon','both'] as const).map(v => `
                  <label style="display:inline-flex;align-items:center;gap:4px;font-size:13px;">
                    <input type="radio" name="sf-shift-pref" value="${v}" ${(s?.shiftPreference ?? 'both') === v ? 'checked' : ''} />
                    ${SHIFT_PREF_LABEL[v]}
                  </label>`).join('')}
              </div>
            </div>

            <!-- 月次業務（全員対象） -->
            <div class="form-row" style="grid-column:1/-1;">
              <label>月次業務担当</label>
              <div style="display:flex;gap:14px;padding:4px 0;">
                ${(['billing','inventory'] as MonthlyTask[]).map(t => `
                  <label style="display:inline-flex;align-items:center;gap:4px;font-size:13px;">
                    <input type="checkbox" name="sf-task" value="${t}" ${s?.monthlyTasks?.includes(t) ? 'checked' : ''} />
                    ${MONTHLY_TASK_LABEL[t]}
                  </label>`).join('')}
              </div>
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>稼働月（空欄=通年、例: 9,10,11,12,1,2,3,4）</label>
              <input type="text" id="sf-months" value="${availStr}" placeholder="例: 9,10,11,12,1,2,3,4（造りスタッフ等）" />
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>兼務可能部門（越境）</label>
              <div style="padding:4px 0;display:flex;flex-wrap:wrap;">${crossChecks}</div>
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>備考</label>
              <input type="text" id="sf-notes" value="${s?.notes ?? ''}" />
            </div>
            <div class="form-row" style="grid-column:1/-1;">
              <label>
                <input type="checkbox" id="sf-active" ${s?.isActive !== false ? 'checked' : ''} />
                有効（在籍中）
              </label>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
            <button type="button" class="button secondary" data-action="close-staff-modal">キャンセル</button>
            <button type="submit" class="button primary">${isEdit ? '保存' : '登録'}</button>
          </div>
          <span id="staff-form-result" class="fr-result"></span>
        </form>
      </div>
    </div>
  `;
}

// ── 人件費タブ ────────────────────────────────────────────────────────────────

function calcMonthlyCost(s: StaffMember, month: number): number {
  if (!s.isActive) return 0;
  if (s.availableMonths && !s.availableMonths.includes(month)) return 0;
  if (s.employmentType === 'employee') return s.monthlySalary ?? 0;
  // 業務委託は日額単価のため月次集計は実績ベース、パートも同様
  return 0;
}

function renderCostTab(staff: StaffMember[], yearMonth: string): string {
  const [, m] = yearMonth.split('-').map(Number);
  const depts  = Object.keys(DEPT_LABEL) as StaffDepartment[];

  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d  = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return `<option value="${ym}" ${ym === yearMonth ? 'selected' : ''}>${ym.replace('-', '年')}月</option>`;
  }).join('');

  let fixedTotal = 0; // 社員+委託（固定費）
  const deptRows = depts.map(dept => {
    const members = staff.filter(s => s.department === dept);
    if (members.length === 0) return '';
    const deptFixed = members.reduce((sum, s) => sum + calcMonthlyCost(s, m), 0);
    fixedTotal += deptFixed;

    const memberRows = members.map(s => {
      const cost      = calcMonthlyCost(s, m);
      const isOut     = !s.isActive || (s.availableMonths && !s.availableMonths.includes(m));
      const wageDesc  = s.employmentType === 'employee'
        ? `月給 ${fmtYen(s.monthlySalary)}`
        : s.employmentType === 'contractor'
        ? `委託 ${fmtYen(s.contractFee)}/日`
        : `時給 ${fmtYen(s.hourlyRate)} × ${s.workHoursPerDay}h（呼び出し）`;
      const costCell  = isOut ? '<span style="color:var(--text-secondary);font-size:11px;">稼働外</span>'
        : s.employmentType === 'part_time' || s.employmentType === 'contractor'
          ? '<span style="color:var(--text-secondary);font-size:11px;">実績で集計</span>'
          : fmtYen(cost);

      return `<tr style="${isOut ? 'opacity:0.45;' : ''}">
        <td style="padding-left:20px;">${s.name}</td>
        <td><span style="font-size:11px;padding:1px 6px;border-radius:8px;background:${EMP_TYPE_COLOR[s.employmentType]}20;color:${EMP_TYPE_COLOR[s.employmentType]};">${EMP_TYPE_LABEL[s.employmentType]}</span></td>
        <td style="font-size:12px;">${wageDesc}</td>
        <td class="numeric"><strong>${costCell}</strong></td>
      </tr>`;
    }).join('');

    return `
      <tr style="background:var(--surface-alt);">
        <td colspan="3">
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${DEPT_COLOR[dept]};margin-right:6px;"></span>
          <strong>${DEPT_LABEL[dept]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);margin-left:6px;">${members.length}名</span>
        </td>
        <td class="numeric"><strong>${deptFixed > 0 ? fmtYen(deptFixed) : '—'}</strong></td>
      </tr>
      ${memberRows}`;
  }).join('');

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="cost-year-month" class="form-input" style="width:160px;">${monthOptions}</select>
      <div style="margin-left:auto;display:flex;gap:12px;flex-wrap:wrap;">
        <div class="panel" style="padding:10px 16px;text-align:center;min-width:140px;">
          <p class="panel-title" style="font-size:11px;">固定費（社員+委託）</p>
          <p class="kpi-value" style="font-size:20px;">${fmtYen(fixedTotal)}</p>
        </div>
        <div class="panel" style="padding:10px 16px;text-align:center;min-width:140px;">
          <p class="panel-title" style="font-size:11px;">年間概算（×12）</p>
          <p class="kpi-value" style="font-size:20px;">${fmtYen(fixedTotal * 12)}</p>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>氏名 / 部門</th><th>種別</th><th>賃金設定</th><th class="numeric">月額</th></tr></thead>
        <tbody>${deptRows || '<tr><td colspan="4" class="empty-row">スタッフなし</td></tr>'}</tbody>
        <tfoot>
          <tr style="font-weight:700;border-top:2px solid var(--border);">
            <td colspan="3">固定費合計（社員・業務委託）</td>
            <td class="numeric">${fmtYen(fixedTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:8px;">
      ※ 社員は月給固定。業務委託・パートは「実績で集計」（業務委託は日額単価×稼働日数）。造りスタッフは稼働月のみカウント。
    </p>
  `;
}

// ── 月次シフトタブ ─────────────────────────────────────────────────────────────

// ── シフト自動生成ロジック ─────────────────────────────────────────────────────
// 前年同月の実績工数をベースに今年の最適人員配置を算出する

/** 1人が1日に処理できる出荷伝票数（目安） */
const DOCS_PER_PERSON_DAY = 25;
/** 1人が午前中に対応できる来客・電話件数（目安） */
const VISITORS_PER_PERSON_AM = 15;

export function generateAutoShifts(
  yearMonth: string,
  staff: StaffMember[],
  brewingSchedule: BrewingScheduleRow[],
  bottlingTargetQty: number,
  metrics: WorkforceMetrics | null
): DailyShiftPlan[] {
  const [y, m] = yearMonth.split('-').map(Number);
  const pad = (n: number) => String(n).padStart(2, '0');
  const daysInMonth = new Date(y, m, 0).getDate();
  const workingDays = metrics?.workingDays ?? 22;

  // ── 醸造月判定
  const isBrewingMonth = brewingSchedule.some(s => {
    for (let i = 0; i < s.durationMonths; i++) {
      if (((s.brewMonth - 1 + i) % 12) + 1 === m) return true;
    }
    return false;
  });

  // ── 前年同月 or 当月の日次平均指標（前年優先）
  const baseMonthlyDocs     = (metrics?.prevYearDocumentCount    ?? 0) || (metrics?.monthlyDocumentCount    ?? 0);
  const baseMonthlyRoute    = (metrics?.prevYearRouteSalesAmount ?? 0) || (metrics?.routeSalesAmount        ?? 0);
  const baseMonthlyVisitors = metrics?.directSalesCount ?? 0; // 上様来店（当月値で代用）

  const avgDailyDocs     = workingDays > 0 ? baseMonthlyDocs     / workingDays : 0;
  const avgDailyRoute    = workingDays > 0 ? baseMonthlyRoute    / workingDays : 0;
  const avgDailyVisitors = workingDays > 0 ? baseMonthlyVisitors / workingDays : 0;

  // ── スタッフ分類ヘルパー
  function byDept(dept: StaffDepartment, types?: string[]): StaffMember[] {
    return staff.filter(s =>
      s.isActive &&
      (s.department === dept || s.crossDepartments.includes(dept)) &&
      (!s.availableMonths || s.availableMonths.includes(m)) &&
      (!types || types.includes(s.employmentType))
    );
  }

  // ── 業務日リスト
  const businessDays: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (![0, 6].includes(new Date(y, m - 1, d).getDay())) businessDays.push(d);
  }
  const inventorySet = new Set(businessDays.slice(-5)); // 月末5営業日＝棚卸週

  // ── 総務 スタッフ分類
  const soumuEmps     = byDept('soumu', ['employee']);
  const soumuPartsAM  = byDept('soumu', ['part_time']).filter(s => (s.shiftPreference ?? 'both') !== 'afternoon');
  const soumuPartsPM  = byDept('soumu', ['part_time']).filter(s => (s.shiftPreference ?? 'both') !== 'morning');

  // 通常日に必要な総務人員（社員1人あたりの処理上限で算出）
  const soumuNeededBase = Math.max(
    soumuEmps.length,                                         // 社員は最低限出勤
    Math.ceil(avgDailyDocs / DOCS_PER_PERSON_DAY),           // 伝票数から逆算
    Math.ceil(avgDailyVisitors / VISITORS_PER_PERSON_AM)     // 来客数から逆算
  );
  const soumuGap = Math.max(0, soumuNeededBase - soumuEmps.length); // パートで補う人数

  // ── ルートセールス・配送 スタッフ分類
  const routeEmps        = byDept('route_sales', ['employee']);
  const deliveryConts    = byDept('delivery', ['contractor']);
  const routeEmpCap      = routeEmps.length * DELIVERY_CAPACITY_PER_VEHICLE; // 社員のみの積載上限/日

  // 社員キャパを超える日次平均分のみ委託を使う
  const dailyOverflow        = Math.max(0, avgDailyRoute - routeEmpCap);
  const contractorsNeeded    = dailyOverflow > 0
    ? Math.min(deliveryConts.length, Math.ceil(dailyOverflow / DELIVERY_CAPACITY_PER_VEHICLE))
    : 0;
  const assignedDeliveryConts = deliveryConts.slice(0, contractorsNeeded);

  // ── 詰口・貼場（需要・生産計画から算定）
  // 優先順位: 1.手動入力 2.前年同月出荷本数 3.前年ルート売上÷単価粗算
  const demandQty =
    bottlingTargetQty > 0                    ? bottlingTargetQty :
    (metrics?.prevYearTotalQuantity ?? 0) > 0 ? metrics!.prevYearTotalQuantity :
    baseMonthlyRoute > 0                     ? Math.round(baseMonthlyRoute / 800) : 0;
  const bottlingDaysNeeded = demandQty > 0
    ? Math.min(18, Math.ceil(demandQty / LINE_MAX_DAILY)) : 0;
  const bottlingBasis =
    bottlingTargetQty > 0
      ? `入力値 ${bottlingTargetQty.toLocaleString('ja-JP')}本`
      : (metrics?.prevYearTotalQuantity ?? 0) > 0
      ? `前年同月実績 ${metrics!.prevYearTotalQuantity.toLocaleString('ja-JP')}本`
      : baseMonthlyRoute > 0
      ? `前年売上推計 ${Math.round(baseMonthlyRoute / 800).toLocaleString('ja-JP')}本`
      : '計画なし';

  const bottlingCandidates = businessDays.filter(d => !inventorySet.has(d));
  const bottlingDaySet = new Set<number>();
  if (bottlingDaysNeeded > 0 && bottlingCandidates.length > 0) {
    const step = bottlingCandidates.length / bottlingDaysNeeded;
    for (let i = 0; i < bottlingDaysNeeded && i < bottlingCandidates.length; i++) {
      bottlingDaySet.add(bottlingCandidates[Math.min(Math.round(i * step), bottlingCandidates.length - 1)]);
    }
  }

  // 詰口・貼場はパート含む（生産ラインはパートが主力）
  const bottlingAll = byDept('bottling');
  const labelingAll = byDept('labeling');

  // ── 造り
  const brewingAll = byDept('brewing'); // 社員+パート両方

  // ── プラン生成
  const plans: DailyShiftPlan[] = [];

  for (const d of businessDays) {
    const dateStr     = `${y}-${pad(m)}-${pad(d)}`;
    const isInventory = inventorySet.has(d);
    const isBottling  = bottlingDaySet.has(d);

    // ── 総務（業務量ベース配置）
    const soumuAssigned: string[] = soumuEmps.map(s => s.id);
    let gap = soumuGap + (isInventory ? 1 : 0); // 棚卸週は+1
    // 午前パートから充当
    for (const s of soumuPartsAM) {
      if (gap <= 0) break;
      soumuAssigned.push(s.id);
      gap--;
    }
    // 午後パートで補完
    for (const s of soumuPartsPM) {
      if (gap <= 0) break;
      if (!soumuAssigned.includes(s.id)) { soumuAssigned.push(s.id); gap--; }
    }
    plans.push({
      planDate: dateStr, department: 'soumu',
      staffMemberIds: soumuAssigned,
      notes: isInventory ? '棚卸週' : `伝票${Math.round(avgDailyDocs)}件・来客${Math.round(avgDailyVisitors)}件/日`,
    });

    // ── ルートセールス（社員全員）
    plans.push({
      planDate: dateStr, department: 'route_sales',
      staffMemberIds: routeEmps.map(s => s.id),
      notes: `日次目標 ${fmtYen(avgDailyRoute)}`,
    });

    // ── 配送委託（社員キャパ超過分のみ）
    plans.push({
      planDate: dateStr, department: 'delivery',
      staffMemberIds: assignedDeliveryConts.map(s => s.id),
      notes: contractorsNeeded === 0
        ? `社員(${routeEmps.length}台)で対応可`
        : `超過 ${fmtYen(dailyOverflow)}/日`,
    });

    // ── 造り（醸造月のみ・全員）
    if (isBrewingMonth) {
      plans.push({ planDate: dateStr, department: 'brewing', staffMemberIds: brewingAll.map(s => s.id), notes: '' });
    }

    // ── 詰口・貼場（生産計画日のみ・パート含む全員）
    // 詰口と貼場は同じ需要・生産計画から稼働日が決まる
    if (isBottling) {
      plans.push({
        planDate: dateStr, department: 'bottling',
        staffMemberIds: bottlingAll.map(s => s.id),
        notes: bottlingAll.length < BOTTLING_LINE_SIZE
          ? `要員不足 ${bottlingAll.length}/${BOTTLING_LINE_SIZE}名`
          : bottlingBasis,
      });
      plans.push({
        planDate: dateStr, department: 'labeling',
        staffMemberIds: labelingAll.map(s => s.id),
        notes: labelingAll.length < LABELING_MIN
          ? `要員不足 ${labelingAll.length}/${LABELING_MIN}名`
          : `詰口と同日稼働`,
      });
    }
  }

  return plans;
}

// ── 月次シフト カレンダータブ ──────────────────────────────────────────────────

function renderShiftTab(
  _staff: StaffMember[],
  yearMonth: string,
  _brewingSchedule: BrewingScheduleRow[],
  bottlingTargetQty: number,
  metrics: WorkforceMetrics | null,
  dailyPlans: DailyShiftPlan[]
): string {
  const [y, m] = yearMonth.split('-').map(Number);
  const pad = (n: number) => String(n).padStart(2, '0');
  const daysInMonth = new Date(y, m, 0).getDate();

  // 月の1日の曜日（月曜始まり: 0=月…6=日）
  const firstDow = new Date(y, m - 1, 1).getDay();
  const firstOffset = firstDow === 0 ? 6 : firstDow - 1;

  const todayStr = new Date().toISOString().slice(0, 10);

  // plans を日付→部門リストに変換
  const planByDate = new Map<string, DailyShiftPlan[]>();
  for (const p of dailyPlans) {
    const arr = planByDate.get(p.planDate) ?? [];
    arr.push(p);
    planByDate.set(p.planDate, arr);
  }

  const hasPlans = dailyPlans.length > 0;

  // 月選択
  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d  = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return `<option value="${ym}" ${ym === yearMonth ? 'selected' : ''}>${ym.replace('-', '年')}月</option>`;
  }).join('');

  // ── カレンダーヘッダ（月〜日）
  const DOW = ['月','火','水','木','金','土','日'];
  const headerCells = DOW.map((label, i) => {
    const isWe = i >= 5;
    return `<div style="text-align:center;padding:5px 2px;font-size:11px;font-weight:700;color:${i===5?'#3b82f6':i===6?'#ef4444':'var(--text-secondary)'};background:var(--surface-alt);border-radius:4px;">${label}</div>`;
  }).join('');

  const emptyCells = Array(firstOffset).fill('<div></div>').join('');

  // ── 日セル
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const d      = i + 1;
    const dateStr = `${y}-${pad(m)}-${pad(d)}`;
    const dow    = new Date(y, m - 1, d).getDay(); // 0=日,6=土
    const isSat  = dow === 6;
    const isSun  = dow === 0;
    const isWe   = isSat || isSun;
    const isToday = dateStr === todayStr;

    const plans  = planByDate.get(dateStr) ?? [];
    const hasInventory = plans.some(p => p.notes?.includes('棚卸'));

    const deptBadges = plans.map(p => {
      const color = DEPT_COLOR[p.department];
      const cnt   = p.staffMemberIds.length;
      return `<span style="display:inline-flex;align-items:center;gap:1px;font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;background:${color}22;color:${color};font-weight:700;border:1px solid ${color}44;" title="${DEPT_LABEL[p.department]} ${cnt}名">
        ${DEPT_SHORT[p.department]}<span style="font-size:8px;opacity:0.85;">${cnt}</span>
      </span>`;
    }).join('');

    return `<div style="border:1px solid ${isToday?'var(--accent)':'var(--border)'};border-radius:4px;padding:3px 4px;min-height:68px;background:${isWe?'var(--surface-alt)':'var(--surface)'};${isToday?'outline:2px solid var(--accent);':''}${plans.length===0&&!isWe?'opacity:0.4;':''}">
      <div style="font-size:10px;font-weight:700;color:${isSat?'#3b82f6':isSun?'#ef4444':isToday?'var(--accent)':'var(--text-secondary)'};margin-bottom:2px;">${d}</div>
      <div style="display:flex;flex-wrap:wrap;">${deptBadges}</div>
      ${hasInventory ? '<div style="font-size:8px;color:#7c3aed;font-weight:700;margin-top:2px;">棚卸</div>' : ''}
    </div>`;
  }).join('');

  // ── 前年比メトリクスパネル
  const metricsPanel = metrics ? (() => {
    const maxLoad = DELIVERY_CAPACITY_PER_VEHICLE * MAX_DELIVERY_VEHICLES * metrics.workingDays;
    const loadPct = maxLoad > 0 ? Math.min(100, Math.round(metrics.routeSalesAmount / maxLoad * 100)) : 0;
    const loadColor = loadPct >= 90 ? '#ef4444' : loadPct >= 70 ? '#f59e0b' : '#10b981';
    const pyLoad  = maxLoad > 0 ? Math.min(100, Math.round(metrics.prevYearRouteSalesAmount / maxLoad * 100)) : 0;
    return `<div class="panel" style="padding:10px 16px;margin-top:8px;">
      <p style="font-size:11px;font-weight:700;margin:0 0 8px;color:var(--text-secondary);">稼働指標（前年同月比較）</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;font-size:12px;">
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">総務 処理伝票数</p>
          <strong>${metrics.monthlyDocumentCount}件</strong>
          <span style="font-size:10px;color:var(--text-secondary);margin-left:6px;">前年: ${metrics.prevYearDocumentCount}件</span>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">直売来店（上様）</p>
          <strong>${metrics.directSalesCount}件 ${fmtYen(metrics.directSalesAmount)}</strong>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">詰口・貼場 計画本数（需要計画）</p>
          <strong>${(metrics.prevYearTotalQuantity || metrics.currentTotalQuantity || 0).toLocaleString('ja-JP')}本</strong>
          <span style="font-size:10px;color:var(--text-secondary);margin-left:6px;">
            ${metrics.prevYearTotalQuantity ? `前年同月実績 ${metrics.prevYearTotalQuantity.toLocaleString('ja-JP')}本` : metrics.currentTotalQuantity ? `当月実績 ${metrics.currentTotalQuantity.toLocaleString('ja-JP')}本` : '実績なし'}
          </span>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">配送積載率（2台 ${fmtYen(DELIVERY_CAPACITY_PER_VEHICLE)}/日）</p>
          <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
            <div style="flex:1;background:var(--border);border-radius:3px;height:5px;">
              <div style="width:${loadPct}%;height:100%;background:${loadColor};border-radius:3px;"></div>
            </div>
            <strong style="color:${loadColor};font-size:11px;">${loadPct}%</strong>
          </div>
          <span style="font-size:10px;color:var(--text-secondary);">${fmtYen(metrics.routeSalesAmount)} ／ 前年 ${fmtYen(metrics.prevYearRouteSalesAmount)}（${pyLoad}%）</span>
        </div>
      </div>
    </div>`;
  })() : '';

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="shift-year-month" class="form-input" style="width:160px;">${monthOptions}</select>
      <div style="display:flex;align-items:center;gap:6px;">
        <label style="font-size:12px;white-space:nowrap;">詰口計画（本/月）</label>
        <input type="number" id="shift-bottling-target" class="form-input" style="width:110px;"
          value="${bottlingTargetQty || ''}" min="0" step="100"
          placeholder="${metrics?.prevYearTotalQuantity ? `前年 ${metrics.prevYearTotalQuantity.toLocaleString('ja-JP')}本` : '自動算出'}" />
        <span style="font-size:10px;color:var(--text-secondary);">空欄＝需要計画から自動算出</span>
      </div>
      <span style="font-size:11px;color:var(--text-secondary);">
        ${hasPlans ? `${dailyPlans.length}件登録済み` : '未生成'}
      </span>
      <button class="button ${hasPlans?'secondary':'primary'} small" data-action="shift-auto-generate" style="margin-left:auto;">
        ⚡ 自動生成${hasPlans?' (再生成)':''}
      </button>
    </div>

    ${!hasPlans ? `<div style="padding:12px 16px;font-size:12px;color:var(--text-secondary);background:var(--surface-alt);border-radius:8px;margin-bottom:12px;">
      「自動生成」で日次シフトを作成します。醸造計画・前年同月データをもとに詰口・造り稼働日を自動配置します。
    </div>` : ''}

    <div style="overflow-x:auto;">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;min-width:490px;">
        ${headerCells}
        ${emptyCells}
        ${dayCells}
      </div>
    </div>

    <!-- 凡例 -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px;font-size:11px;color:var(--text-secondary);">
      ${(Object.keys(DEPT_LABEL) as StaffDepartment[]).map(d =>
        `<span style="display:inline-flex;align-items:center;gap:3px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${DEPT_COLOR[d]};"></span>
          <strong style="color:${DEPT_COLOR[d]};">${DEPT_SHORT[d]}</strong>${DEPT_LABEL[d]}
        </span>`
      ).join('')}
      <span>| 数字=配置人数</span>
    </div>

    ${metricsPanel}
  `;
}

// ── メインレンダラー ──────────────────────────────────────────────────────────

export function renderWorkforce(
  staff: StaffMember[],
  activeTab: WorkforceTab,
  deptFilter: string,
  yearMonth: string,
  brewingSchedule: BrewingScheduleRow[],
  bottlingTargetQty: number = 0,
  metrics: WorkforceMetrics | null = null,
  dailyPlans: DailyShiftPlan[] = []
): string {
  const tabContent =
    activeTab === 'staff' ? renderStaffTab(staff, deptFilter) :
    activeTab === 'cost'  ? renderCostTab(staff, yearMonth) :
    renderShiftTab(staff, yearMonth, brewingSchedule, bottlingTargetQty, metrics, dailyPlans);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">人員管理</p>
        <h1>人員・シフト管理</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header tabs-header">
        <div class="tab-group">
          <button class="tab-button ${activeTab === 'staff' ? 'active' : ''}" data-workforce-tab="staff">スタッフ一覧</button>
          <button class="tab-button ${activeTab === 'shift' ? 'active' : ''}" data-workforce-tab="shift">月次シフト</button>
          <button class="tab-button ${activeTab === 'cost'  ? 'active' : ''}" data-workforce-tab="cost">人件費</button>
        </div>
      </div>
      ${tabContent}
    </section>
  `;
}
