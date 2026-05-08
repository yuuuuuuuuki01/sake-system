import type { StaffMember, StaffDepartment, BrewingScheduleRow, MonthlyTask, WorkforceMetrics, DailyShiftPlan, ProductionPlanRow } from '../api';
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
    const leaderBadge = s.isDeptLeader
      ? `<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#f59e0b20;color:#d97706;border:1px solid #f59e0b40;margin-left:4px;">部門長</span>`
      : '';
    return `<tr class="${s.isActive ? '' : 'row-inactive'}">
      <td>
        ${s.name}${leaderBadge}${s.kana ? `<br><span style="font-size:11px;color:var(--text-secondary);">${s.kana}</span>` : ''}
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

            <!-- 固定休み曜日 -->
            <div class="form-row" style="grid-column:1/-1;">
              <label>固定休み曜日</label>
              <div style="display:flex;gap:8px;padding:4px 0;flex-wrap:wrap;">
                ${([1,2,3,4,5,6] as const).map(dow => {
                  const labels = ['','月','火','水','木','金','土'];
                  return `<label style="display:inline-flex;align-items:center;gap:3px;font-size:13px;">
                    <input type="checkbox" name="sf-day-off" value="${dow}" ${s?.fixedDaysOff?.includes(dow) ? 'checked' : ''} />
                    ${labels[dow]}
                  </label>`;
                }).join('')}
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
            <div class="form-row" style="grid-column:1/-1;display:flex;gap:20px;">
              <label>
                <input type="checkbox" id="sf-leader" ${s?.isDeptLeader ? 'checked' : ''} />
                部門長（この人の日程を軸にシフトが決まる）
              </label>
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

/** 1人が1日に処理できる出荷伝票数（目安） */
const DOCS_PER_PERSON_DAY = 25;
/** 1人が午前中に対応できる来客・電話件数（目安） */
const VISITORS_PER_PERSON_AM = 15;
/** 貼場: 1人1日あたりの貼付本数 (80本/h × 8h) */
const LABELING_CAPACITY_PER_PERSON_DAY = 640;
/** 詰口: 1酒質あたりの日産上限（単一銘柄フル稼働時） */
// 複数酒質を1日に詰める場合は切り替え・洗浄ロスがあるため実効容量が下がる

export function generateAutoShifts(
  yearMonth: string,
  staff: StaffMember[],
  brewingSchedule: BrewingScheduleRow[],
  bottlingTargetQty: number,
  metrics: WorkforceMetrics | null,
  productionPlan: ProductionPlanRow[] = [],
  calendarShifts: { date: string; partTimers: number; employees: number }[] = []
): DailyShiftPlan[] {
  const [y, m] = yearMonth.split('-').map(Number);
  const pad = (n: number) => String(n).padStart(2, '0');
  const daysInMonth = new Date(y, m, 0).getDate();
  const workingDays = metrics?.workingDays ?? 26; // 月〜土: 約26日

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
  const baseMonthlyVisitors = metrics?.directSalesCount ?? 0;

  const avgDailyDocs     = workingDays > 0 ? baseMonthlyDocs     / workingDays : 0;
  const avgDailyRoute    = workingDays > 0 ? baseMonthlyRoute    / workingDays : 0;
  const avgDailyVisitors = workingDays > 0 ? baseMonthlyVisitors / workingDays : 0;

  // ── スタッフ分類ヘルパー（稼働月フィルタ）
  function byDept(dept: StaffDepartment, types?: string[]): StaffMember[] {
    return staff.filter(s =>
      s.isActive &&
      (s.department === dept || s.crossDepartments.includes(dept)) &&
      (!s.availableMonths || s.availableMonths.includes(m)) &&
      (!types || types.includes(s.employmentType))
    );
  }

  // ── 業務日リスト（月〜土、日曜のみ除外）
  const businessDays: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (new Date(y, m - 1, d).getDay() !== 0) businessDays.push(d); // 0=日のみ除外
  }
  const inventorySet = new Set(businessDays.slice(-5)); // 月末5営業日＝棚卸週

  // ── 固定休み考慮: 各日に出勤可能なスタッフを返す
  function availableOn(candidates: StaffMember[], dayNum: number): StaffMember[] {
    const dow = new Date(y, m - 1, dayNum).getDay();
    return candidates.filter(s => !(s.fixedDaysOff ?? []).includes(dow));
  }

  // ── 部門長チェック: 部門長がいる日だけその部門が稼働する
  // 部門長が設定されていない部門は全員が候補
  function leaderAvailableOn(deptMembers: StaffMember[], dayNum: number): boolean {
    const leaders = deptMembers.filter(s => s.isDeptLeader);
    if (leaders.length === 0) return true; // 部門長未設定 → 常に稼働
    return availableOn(leaders, dayNum).length > 0;
  }

  // 部門員を「部門長 → 社員 → パート → 委託」の順に並べ替え（リーダー優先配置）
  function sortByRole(members: StaffMember[]): StaffMember[] {
    return [...members].sort((a, b) => {
      const score = (s: StaffMember) =>
        s.isDeptLeader ? 0 :
        s.employmentType === 'employee' ? 1 :
        s.employmentType === 'part_time' ? 2 : 3;
      return score(a) - score(b);
    });
  }

  // ── 総務 スタッフ分類
  const soumuEmps    = byDept('soumu', ['employee']);
  const soumuPartsAM = byDept('soumu', ['part_time']).filter(s => (s.shiftPreference ?? 'both') !== 'afternoon');
  const soumuPartsPM = byDept('soumu', ['part_time']).filter(s => (s.shiftPreference ?? 'both') !== 'morning');

  const soumuNeededBase = Math.max(
    soumuEmps.length,
    Math.ceil(avgDailyDocs / DOCS_PER_PERSON_DAY),
    Math.ceil(avgDailyVisitors / VISITORS_PER_PERSON_AM)
  );
  const soumuGap = Math.max(0, soumuNeededBase - soumuEmps.length);

  // ── ルートセールス・配送 スタッフ分類
  const routeEmps         = byDept('route_sales', ['employee']);
  const deliveryConts     = byDept('delivery', ['contractor']);
  const routeEmpCap       = routeEmps.length * DELIVERY_CAPACITY_PER_VEHICLE;
  const dailyOverflow     = Math.max(0, avgDailyRoute - routeEmpCap);
  const contractorsNeeded = dailyOverflow > 0
    ? Math.min(deliveryConts.length, Math.ceil(dailyOverflow / DELIVERY_CAPACITY_PER_VEHICLE))
    : 0;

  // ── 需要・生産計画集計
  const planDemandTotal   = productionPlan.reduce((s, r) => s + r.demandForecast,    0);
  const planRequiredTotal = productionPlan.reduce((s, r) => s + r.requiredProduction, 0)
                          || productionPlan.reduce((s, r) => s + r.plannedQty,        0);

  // 貼場の計画本数: 需要計画 > 前年実績 > 当月実績
  const labelingTotal =
    planDemandTotal > 0                        ? planDemandTotal :
    (metrics?.prevYearTotalQuantity ?? 0) > 0  ? metrics!.prevYearTotalQuantity :
    (metrics?.currentTotalQuantity  ?? 0) > 0  ? metrics!.currentTotalQuantity  : 0;

  // 詰口の計画本数: 手動入力 > 必要生産本数 > 貼場と同数
  const bottlingTotal =
    bottlingTargetQty > 0 ? bottlingTargetQty :
    planRequiredTotal > 0 ? planRequiredTotal  :
    labelingTotal;

  // ── 詰口スケジュール: 製品ごとにまとめてバッチ稼働（切り替え・洗浄ロス回避）
  // 同一酒質は日産 LINE_MAX_DAILY 本で連続稼働、複数酒質は1日1銘柄原則
  const bottlingAll  = byDept('bottling');
  const labelingAll  = byDept('labeling');
  const brewingAll   = byDept('brewing');

  // 製品別の必要稼働日を計算してバッチ割り当て
  // productionPlan に製品別データがあれば製品ごと、なければ合計をまとめて扱う
  interface ProductRun { productCode: string; productName: string; qty: number; daysNeeded: number; }
  const productRuns: ProductRun[] = productionPlan.length > 0
    ? productionPlan
        .filter(r => (r.requiredProduction || r.plannedQty) > 0)
        .map(r => ({
          productCode: r.productCode,
          productName: r.productName,
          qty: r.requiredProduction || r.plannedQty,
          daysNeeded: Math.max(1, Math.ceil((r.requiredProduction || r.plannedQty) / LINE_MAX_DAILY)),
        }))
    : bottlingTotal > 0
      ? [{ productCode: '', productName: '詰口計画', qty: bottlingTotal, daysNeeded: Math.ceil(bottlingTotal / LINE_MAX_DAILY) }]
      : [];

  // calendarShifts から今月の稼働日を抽出（需要計画カレンダーと連動）
  const calMonthPrefix = `${y}-${pad(m)}`;
  const calStaffedDays = calendarShifts
    .filter(s => s.date.startsWith(calMonthPrefix) && (s.partTimers > 0 || s.employees > 0))
    .sort((a, b) => a.date.localeCompare(b.date));
  const hasCalData = calStaffedDays.length >= 5;

  const activeDayNums = hasCalData
    ? calStaffedDays.map(s => parseInt(s.date.slice(-2))).filter(d => !inventorySet.has(d))
    : businessDays.filter(d => !inventorySet.has(d));

  const calDayMap = new Map(calStaffedDays.map(s => [parseInt(s.date.slice(-2)), s]));

  // 詰口日セット: 製品ごとに連続した日を割り当て（前詰め）
  // bottlingDayMap: 日 → { productCode, productName, dailyQty }
  const bottlingDayMap = new Map<number, { productCode: string; productName: string; dailyQty: number }>();
  let dayIdx = 0;
  for (const run of productRuns) {
    for (let i = 0; i < run.daysNeeded && dayIdx < activeDayNums.length; i++, dayIdx++) {
      const d = activeDayNums[dayIdx];
      const remainingQty = run.qty - i * LINE_MAX_DAILY;
      const dailyQty = Math.min(remainingQty, LINE_MAX_DAILY);
      bottlingDayMap.set(d, { productCode: run.productCode, productName: run.productName, dailyQty });
    }
  }

  // 貼場: 月後半に集中配置（出荷直前）
  const labelingHeadcount = Math.max(LABELING_MIN, Math.min(labelingAll.length || 1, 3));
  const labelingPersonDaysNeeded = labelingTotal > 0
    ? Math.ceil(labelingTotal / (LABELING_CAPACITY_PER_PERSON_DAY * labelingHeadcount)) : 0;
  const labelingCandidates = activeDayNums.slice(Math.floor(activeDayNums.length / 2));
  const labelingDaySet = new Set<number>();
  if (labelingPersonDaysNeeded > 0 && labelingCandidates.length > 0) {
    const step = labelingCandidates.length / Math.min(labelingPersonDaysNeeded, labelingCandidates.length);
    for (let i = 0; i < labelingPersonDaysNeeded && i < labelingCandidates.length; i++) {
      labelingDaySet.add(labelingCandidates[Math.min(Math.round(i * step), labelingCandidates.length - 1)]);
    }
  }

  const dailyLabelingQty = labelingDaySet.size > 0 ? Math.ceil(labelingTotal / labelingDaySet.size) : 0;
  const dailyLabelingHeadcount = Math.max(LABELING_MIN, Math.min(
    labelingAll.length || 1,
    Math.ceil(dailyLabelingQty / LABELING_CAPACITY_PER_PERSON_DAY)
  ));

  // 根拠テキスト（詰口・貼場）
  const bottlingBasisSrc =
    bottlingTargetQty > 0  ? `手動入力 ${bottlingTargetQty.toLocaleString('ja-JP')}本` :
    planRequiredTotal > 0  ? `需要計画（必要生産 ${planRequiredTotal.toLocaleString('ja-JP')}本）` :
    (metrics?.prevYearTotalQuantity ?? 0) > 0 ? `前年同月実績 ${metrics!.prevYearTotalQuantity.toLocaleString('ja-JP')}本` :
    (metrics?.currentTotalQuantity  ?? 0) > 0 ? `当月実績 ${metrics!.currentTotalQuantity.toLocaleString('ja-JP')}本` :
    '実績データなし';

  const labelingBasisSrc =
    planDemandTotal > 0 ? `需要計画 出荷見込み ${planDemandTotal.toLocaleString('ja-JP')}本` :
    bottlingBasisSrc;

  // ── プラン生成
  const plans: DailyShiftPlan[] = [];

  for (const d of businessDays) {
    const dateStr     = `${y}-${pad(m)}-${pad(d)}`;
    const isInventory = inventorySet.has(d);
    const bottlingRun = bottlingDayMap.get(d);
    const isBottling  = bottlingRun !== undefined;
    const isLabeling  = labelingDaySet.has(d);

    // ── 総務（部門長ありき → 業務量ベースでパート補充）
    const soumuAll       = sortByRole(byDept('soumu'));
    const soumuToday     = availableOn(soumuAll, d);
    const soumuEmpsToday = soumuToday.filter(s => s.employmentType === 'employee');
    const soumuAMToday   = soumuToday.filter(s => s.employmentType === 'part_time' && (s.shiftPreference ?? 'both') !== 'afternoon');
    const soumuPMToday   = soumuToday.filter(s => s.employmentType === 'part_time' && (s.shiftPreference ?? 'both') !== 'morning');
    const soumuHasLeader = leaderAvailableOn(soumuAll, d);
    const soumuAssigned: string[] = soumuEmpsToday.map(s => s.id);
    let gap = Math.max(0, soumuNeededBase - soumuEmpsToday.length) + (isInventory ? 1 : 0);
    for (const s of soumuAMToday) { if (gap <= 0) break; soumuAssigned.push(s.id); gap--; }
    for (const s of soumuPMToday) {
      if (gap <= 0) break;
      if (!soumuAssigned.includes(s.id)) { soumuAssigned.push(s.id); gap--; }
    }
    const soumuNoteBase = [
      isInventory ? '棚卸週（月末棚卸対応）' : null,
      !soumuHasLeader ? '⚠ 部門長不在' : null,
      `伝票${Math.round(avgDailyDocs)}件/日 ÷ ${DOCS_PER_PERSON_DAY}件/人 = ${Math.ceil(avgDailyDocs/DOCS_PER_PERSON_DAY)}名必要`,
      `来客${Math.round(avgDailyVisitors)}件/日 ÷ ${VISITORS_PER_PERSON_AM}件/人 = ${Math.ceil(avgDailyVisitors/VISITORS_PER_PERSON_AM)}名必要(AM)`,
    ].filter(Boolean).join(' | ');
    plans.push({
      planDate: dateStr, department: 'soumu',
      staffMemberIds: soumuAssigned,
      notes: soumuNoteBase,
    });

    // ── ルートセールス（部門長ありき・社員全員・固定休み考慮）
    const routeAll   = sortByRole(byDept('route_sales'));
    const routeToday = availableOn(routeAll, d);
    const routeHasLeader = leaderAvailableOn(routeAll, d);
    plans.push({
      planDate: dateStr, department: 'route_sales',
      staffMemberIds: routeToday.map(s => s.id),
      notes: [
        !routeHasLeader ? '⚠ 部門長不在' : null,
        `前年同月日次平均 ${fmtYen(avgDailyRoute)}`,
        `社員${routeToday.length}台 × 積載 ${fmtYen(DELIVERY_CAPACITY_PER_VEHICLE)}/台`,
      ].filter(Boolean).join(' | '),
    });

    // ── 配送委託（社員キャパ超過分のみ・固定休み考慮）
    const contsToday = availableOn(sortByRole(deliveryConts), d).slice(0, contractorsNeeded);
    plans.push({
      planDate: dateStr, department: 'delivery',
      staffMemberIds: contsToday.map(s => s.id),
      notes: contractorsNeeded === 0
        ? `社員${routeToday.length}台（${fmtYen(routeEmpCap)}/日）で対応可 | 超過なし`
        : `社員キャパ超過 ${fmtYen(dailyOverflow)}/日 → 委託${contractorsNeeded}台追加`,
    });

    // ── 造り（醸造月のみ・部門長ありき・固定休み考慮）
    if (isBrewingMonth) {
      const brewAll   = sortByRole(brewingAll);
      const brewToday = availableOn(brewAll, d);
      const brewHasLeader = leaderAvailableOn(brewAll, d);
      if (brewToday.length > 0) {
        plans.push({
          planDate: dateStr, department: 'brewing',
          staffMemberIds: brewToday.map(s => s.id),
          notes: [
            !brewHasLeader ? '⚠ 部門長不在（代行要確認）' : null,
            `醸造月（${m}月） | 調達計画に基づく仕込み`,
          ].filter(Boolean).join(' | '),
        });
      }
    }

    // ── 詰口（部門長ありきで稼働判断・製品ごとバッチ・前詰め）
    if (isBottling && bottlingRun) {
      const bottAll   = sortByRole(bottlingAll);
      const bottHasLeader = leaderAvailableOn(bottAll, d);
      if (bottHasLeader || bottAll.filter(s => s.isDeptLeader).length === 0) {
        const calShift  = calDayMap.get(d);
        const targetHead = calShift
          ? Math.max(BOTTLING_LINE_SIZE, calShift.partTimers + calShift.employees)
          : BOTTLING_LINE_SIZE;
        const bottlingToday = availableOn(bottAll, d).slice(0, Math.min(bottAll.length, targetHead));
        const productLabel  = bottlingRun.productName
          ? `${bottlingRun.productName}（${bottlingRun.productCode}）`
          : bottlingBasisSrc;
        plans.push({
          planDate: dateStr, department: 'bottling',
          staffMemberIds: bottlingToday.map(s => s.id),
          notes: bottlingToday.length < BOTTLING_LINE_SIZE
            ? `⚠ 要員不足 ${bottlingToday.length}/${BOTTLING_LINE_SIZE}名 | ${productLabel}`
            : `${productLabel} | 本日目標 ${bottlingRun.dailyQty.toLocaleString('ja-JP')}本 | 日産上限 ${LINE_MAX_DAILY.toLocaleString('ja-JP')}本/単一酒質`,
        });
      }
      // 部門長不在の場合は翌稼働日に繰り越し（プランなし）
    }

    // ── 貼場（出荷直前・月後半集中・固定休み考慮）
    // ※ 貼場は部門長設定なし（全員対象）
    if (isLabeling) {
      const labelingToday = availableOn(sortByRole(labelingAll), d).slice(0, dailyLabelingHeadcount);
      plans.push({
        planDate: dateStr, department: 'labeling',
        staffMemberIds: labelingToday.map(s => s.id),
        notes: labelingToday.length < LABELING_MIN
          ? `⚠ 要員不足 ${labelingToday.length}/${LABELING_MIN}名`
          : `${labelingBasisSrc} | 本日目標 ${dailyLabelingQty.toLocaleString('ja-JP')}本 (${dailyLabelingHeadcount}名 × ${LABELING_CAPACITY_PER_PERSON_DAY}本/人日)`,
      });
    }
  }

  return plans;
}

// ── 月次シフト カレンダータブ ──────────────────────────────────────────────────

function renderShiftTab(
  staff: StaffMember[],
  yearMonth: string,
  _brewingSchedule: BrewingScheduleRow[],
  bottlingTargetQty: number,
  metrics: WorkforceMetrics | null,
  dailyPlans: DailyShiftPlan[],
  selectedDay: string | null
): string {
  const [y, m] = yearMonth.split('-').map(Number);
  const pad = (n: number) => String(n).padStart(2, '0');
  const daysInMonth = new Date(y, m, 0).getDate();

  const firstDow = new Date(y, m - 1, 1).getDay();
  const firstOffset = firstDow === 0 ? 6 : firstDow - 1;
  const todayStr = new Date().toISOString().slice(0, 10);

  const staffMap = new Map(staff.map(s => [s.id, s]));

  // plans を日付→部門リストに変換
  const planByDate = new Map<string, DailyShiftPlan[]>();
  for (const p of dailyPlans) {
    const arr = planByDate.get(p.planDate) ?? [];
    arr.push(p);
    planByDate.set(p.planDate, arr);
  }

  const hasPlans = dailyPlans.length > 0;

  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d  = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return `<option value="${ym}" ${ym === yearMonth ? 'selected' : ''}>${ym.replace('-', '年')}月</option>`;
  }).join('');

  // ── カレンダーヘッダ（月〜日）、土曜は通常営業日として表示
  const DOW_LABELS = ['月','火','水','木','金','土','日'];
  const headerCells = DOW_LABELS.map((label, i) =>
    `<div style="text-align:center;padding:5px 2px;font-size:11px;font-weight:700;color:${i===6?'#ef4444':'var(--text-secondary)'};background:var(--surface-alt);border-radius:4px;">${label}</div>`
  ).join('');

  const emptyCells = Array(firstOffset).fill('<div></div>').join('');

  // ── 日セル
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const d       = i + 1;
    const dateStr = `${y}-${pad(m)}-${pad(d)}`;
    const dow     = new Date(y, m - 1, d).getDay(); // 0=日,6=土
    const isSun   = dow === 0;
    const isToday = dateStr === todayStr;
    const isSel   = dateStr === selectedDay;

    const dayPlans      = planByDate.get(dateStr) ?? [];
    const hasInventory  = dayPlans.some(p => p.notes?.includes('棚卸'));
    const hasWarning    = dayPlans.some(p => p.notes?.includes('⚠'));

    const deptBadges = dayPlans.map(p => {
      const color = DEPT_COLOR[p.department];
      const cnt   = p.staffMemberIds.length;
      const names = p.staffMemberIds.map(id => staffMap.get(id)?.name ?? '?').join(', ');
      return `<span style="display:inline-flex;align-items:center;gap:1px;font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;background:${color}22;color:${color};font-weight:700;border:1px solid ${color}44;cursor:pointer;" title="${DEPT_LABEL[p.department]}: ${names}">
        ${DEPT_SHORT[p.department]}<span style="font-size:8px;opacity:0.85;">${cnt}</span>
      </span>`;
    }).join('');

    const border = isSel
      ? '2px solid var(--accent)'
      : isToday ? '2px solid #f59e0b' : '1px solid var(--border)';
    const bg = isSun ? 'var(--surface-alt)' : 'var(--surface)';

    return `<div data-shift-day="${dateStr}" style="border:${border};border-radius:4px;padding:3px 4px;min-height:72px;background:${bg};cursor:pointer;position:relative;${isSun?'opacity:0.5;':''}${dayPlans.length===0&&!isSun?'opacity:0.35;':''}">
      <div style="font-size:10px;font-weight:700;color:${dow===6?'#6b7280':isSun?'#ef4444':isToday?'#f59e0b':isSel?'var(--accent)':'var(--text-secondary)'};margin-bottom:2px;">
        ${d}${isToday?' ●':''}
      </div>
      <div style="display:flex;flex-wrap:wrap;">${deptBadges}</div>
      ${hasInventory ? '<div style="font-size:7px;color:#7c3aed;font-weight:700;margin-top:1px;">棚卸</div>' : ''}
      ${hasWarning   ? '<div style="font-size:7px;color:#ef4444;font-weight:700;margin-top:1px;">⚠要確認</div>' : ''}
    </div>`;
  }).join('');

  // ── 選択日の詳細パネル
  const DOW_JP = ['日','月','火','水','木','金','土'];
  const detailPanel = selectedDay ? (() => {
    const [dy, dm, dd] = selectedDay.split('-').map(Number);
    const dowLabel = DOW_JP[new Date(dy, dm - 1, dd).getDay()];
    const dayPlans = planByDate.get(selectedDay) ?? [];

    if (dayPlans.length === 0) {
      return `<div class="panel" style="margin-top:12px;padding:14px 16px;">
        <p style="font-weight:700;margin:0 0 6px;">${dy}年${dm}月${dd}日（${dowLabel}）</p>
        <p style="font-size:12px;color:var(--text-secondary);">この日のシフト計画はありません（日曜または未生成）。</p>
      </div>`;
    }

    const sections = dayPlans.map(p => {
      const color = DEPT_COLOR[p.department];
      const members = p.staffMemberIds.map(id => staffMap.get(id)).filter(Boolean) as StaffMember[];
      const leaderNames = members.filter(s => s.isDeptLeader).map(s => s.name);
      const otherNames  = members.filter(s => !s.isDeptLeader).map(s => s.name);

      const nameHtml = members.length === 0
        ? '<span style="color:var(--text-secondary);font-size:11px;">担当なし</span>'
        : [
            ...leaderNames.map(n => `<span style="font-weight:700;color:${color};">${n}★</span>`),
            ...otherNames.map(n => `<span>${n}</span>`),
          ].join('、');

      // notes を | で分割して行表示
      const noteLines = (p.notes ?? '').split(' | ').filter(Boolean);

      return `<div style="padding:10px 0;border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${color};flex-shrink:0;"></span>
          <strong style="color:${color};font-size:13px;">${DEPT_LABEL[p.department]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);">${members.length}名</span>
        </div>
        <div style="font-size:12px;margin-bottom:4px;">出勤: ${nameHtml}</div>
        <div style="font-size:11px;color:var(--text-secondary);display:flex;flex-direction:column;gap:2px;">
          ${noteLines.map(l => `<span style="padding:1px 0;${l.startsWith('⚠')?'color:#ef4444;font-weight:600;':''}">${l}</span>`).join('')}
        </div>
      </div>`;
    }).join('');

    return `<div class="panel" style="margin-top:12px;padding:14px 16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <p style="font-weight:700;margin:0;font-size:14px;">${dy}年${dm}月${dd}日（${dowLabel}）の配置</p>
        <button class="button secondary small" data-action="shift-day-close">閉じる</button>
      </div>
      ${sections}
    </div>`;
  })() : `<div style="margin-top:8px;padding:10px 14px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);border-radius:6px;">
    日付をクリックすると出勤者・根拠が表示されます。★=部門長
  </div>`;

  // ── メトリクスパネル
  const metricsPanel = metrics ? (() => {
    const maxLoad  = DELIVERY_CAPACITY_PER_VEHICLE * MAX_DELIVERY_VEHICLES * metrics.workingDays;
    const loadPct  = maxLoad > 0 ? Math.min(100, Math.round(metrics.routeSalesAmount / maxLoad * 100)) : 0;
    const loadColor = loadPct >= 90 ? '#ef4444' : loadPct >= 70 ? '#f59e0b' : '#10b981';
    const pyLoad   = maxLoad > 0 ? Math.min(100, Math.round(metrics.prevYearRouteSalesAmount / maxLoad * 100)) : 0;
    return `<div class="panel" style="padding:10px 16px;margin-top:8px;">
      <p style="font-size:11px;font-weight:700;margin:0 0 8px;color:var(--text-secondary);">自動生成の根拠データ（前年同月比較）</p>
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
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">詰口・貼場 出荷見込み本数</p>
          <strong>${(metrics.prevYearTotalQuantity || metrics.currentTotalQuantity || 0).toLocaleString('ja-JP')}本</strong>
          <span style="font-size:10px;color:var(--text-secondary);margin-left:6px;">
            ${metrics.prevYearTotalQuantity ? `前年同月 ${metrics.prevYearTotalQuantity.toLocaleString('ja-JP')}本` : metrics.currentTotalQuantity ? `当月実績 ${metrics.currentTotalQuantity.toLocaleString('ja-JP')}本` : '実績なし'}
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
      「自動生成」で月次シフトを作成します。需要・生産計画・部門長スケジュール・固定休みをもとに担当者を自動配置します。
    </div>` : ''}

    <div style="overflow-x:auto;">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;min-width:490px;">
        ${headerCells}
        ${emptyCells}
        ${dayCells}
      </div>
    </div>

    <!-- 凡例 -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:6px;font-size:11px;color:var(--text-secondary);">
      ${(Object.keys(DEPT_LABEL) as StaffDepartment[]).map(d =>
        `<span style="display:inline-flex;align-items:center;gap:3px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${DEPT_COLOR[d]};"></span>
          <strong style="color:${DEPT_COLOR[d]};">${DEPT_SHORT[d]}</strong>${DEPT_LABEL[d]}
        </span>`
      ).join('')}
      <span>| 数字=配置人数 | ★=部門長 | 月〜土が営業日</span>
    </div>

    ${detailPanel}
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
  dailyPlans: DailyShiftPlan[] = [],
  selectedDay: string | null = null
): string {
  const tabContent =
    activeTab === 'staff' ? renderStaffTab(staff, deptFilter) :
    activeTab === 'cost'  ? renderCostTab(staff, yearMonth) :
    renderShiftTab(staff, yearMonth, brewingSchedule, bottlingTargetQty, metrics, dailyPlans, selectedDay);

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
