import type { StaffMember, StaffDepartment, BrewingScheduleRow, MonthlyTask, WorkforceMetrics, DailyShiftPlan, ProductionPlanRow, BottlingScheduleItem } from '../api';
import { DEPT_LABEL, MONTHLY_TASK_LABEL, SHIFT_PREF_LABEL, buildBottlingSchedule } from '../api';

export type WorkforceTab = 'staff' | 'shift' | 'bottling' | 'cost';

// ── 定数 ─────────────────────────────────────────────────────────────────────

const BOTTLING_LINE_SIZE             = 4;       // 詰口ライン定員（最低4名）
const LABELING_MIN                   = 1;       // 貼場最小人数（1名〜）
const LINE_MAX_DAILY                 = 4000;    // 日産最大本数（1800ml換算）
const DELIVERY_CAPACITY_PER_VEHICLE  = 300_000; // 1台あたり積載目安（円/日）
const MAX_DELIVERY_VEHICLES          = 2;       // 最大車両台数

const DEPT_SHORT: Record<StaffDepartment, string> = {
  soumu:       '総',
  route_sales: '配',
  brewing:     '造',
  bottling:    '詰',
  labeling:    '貼',
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
  const workingDays = metrics?.workingDays ?? 26;

  // ── 部門タイプ定義 ──────────────────────────────────────────────────────────
  // 営業日ベース: 営業日なら常に稼働（部門長有無に関係なし）
  // 工程ベース:   工程がある日だけ稼働（部門長出勤が前提）
  const BUSINESS_DAY_DEPTS: StaffDepartment[] = ['soumu', 'route_sales'];
  const PROCESS_BASED_DEPTS: StaffDepartment[] = ['brewing', 'bottling', 'labeling'];

  // ── 醸造月判定
  const isBrewingMonth = brewingSchedule.some(s => {
    for (let i = 0; i < s.durationMonths; i++) {
      if (((s.brewMonth - 1 + i) % 12) + 1 === m) return true;
    }
    return false;
  });

  // ── 指標
  const baseMonthlyDocs     = (metrics?.prevYearDocumentCount    ?? 0) || (metrics?.monthlyDocumentCount    ?? 0);
  const baseMonthlyRoute    = (metrics?.prevYearRouteSalesAmount ?? 0) || (metrics?.routeSalesAmount        ?? 0);
  const baseMonthlyVisitors = metrics?.directSalesCount ?? 0;
  const avgDailyDocs     = workingDays > 0 ? baseMonthlyDocs     / workingDays : 0;
  const avgDailyRoute    = workingDays > 0 ? baseMonthlyRoute    / workingDays : 0;
  const avgDailyVisitors = workingDays > 0 ? baseMonthlyVisitors / workingDays : 0;

  // ── ヘルパー ────────────────────────────────────────────────────────────────

  /** 主部門のメンバーのみ（越境者を含まない） */
  function primaryMembers(dept: StaffDepartment): StaffMember[] {
    return staff.filter(s =>
      s.isActive && s.department === dept &&
      (!s.availableMonths || s.availableMonths.includes(m))
    );
  }

  function availableOn(candidates: StaffMember[], dayNum: number): StaffMember[] {
    const dow = new Date(y, m - 1, dayNum).getDay();
    return candidates.filter(s => !(s.fixedDaysOff ?? []).includes(dow));
  }

  function leaderAvailableOn(deptMembers: StaffMember[], dayNum: number): boolean {
    const leaders = deptMembers.filter(s => s.isDeptLeader);
    if (leaders.length === 0) return true;
    return availableOn(leaders, dayNum).length > 0;
  }

  function sortByRole(members: StaffMember[]): StaffMember[] {
    return [...members].sort((a, b) => {
      const score = (s: StaffMember) =>
        s.isDeptLeader ? 0 : s.employmentType === 'employee' ? 1 :
        s.employmentType === 'part_time' ? 2 : 3;
      return score(a) - score(b);
    });
  }

  // ── 業務日リスト
  const businessDays: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (new Date(y, m - 1, d).getDay() !== 0) businessDays.push(d);
  }
  const inventorySet = new Set(businessDays.slice(-5));

  // ── 需要・生産計画集計
  const planDemandTotal   = productionPlan.reduce((s, r) => s + r.demandForecast, 0);
  const planRequiredTotal = productionPlan.reduce((s, r) => s + r.requiredProduction, 0)
                          || productionPlan.reduce((s, r) => s + r.plannedQty, 0);

  const labelingTotal =
    planDemandTotal > 0                        ? planDemandTotal :
    (metrics?.prevYearTotalQuantity ?? 0) > 0  ? metrics!.prevYearTotalQuantity :
    (metrics?.currentTotalQuantity  ?? 0) > 0  ? metrics!.currentTotalQuantity  : 0;

  const bottlingTotal =
    bottlingTargetQty > 0 ? bottlingTargetQty :
    planRequiredTotal > 0 ? planRequiredTotal  : labelingTotal;

  // ── 根拠テキスト
  const bottlingBasisSrc =
    bottlingTargetQty > 0  ? `手動入力 ${bottlingTargetQty.toLocaleString('ja-JP')}本` :
    planRequiredTotal > 0  ? `需要計画（必要生産 ${planRequiredTotal.toLocaleString('ja-JP')}本）` :
    (metrics?.prevYearTotalQuantity ?? 0) > 0 ? `前年同月実績 ${metrics!.prevYearTotalQuantity.toLocaleString('ja-JP')}本` :
    (metrics?.currentTotalQuantity  ?? 0) > 0 ? `当月実績 ${metrics!.currentTotalQuantity.toLocaleString('ja-JP')}本` :
    '実績データなし';
  const labelingBasisSrc =
    planDemandTotal > 0 ? `需要計画 出荷見込み ${planDemandTotal.toLocaleString('ja-JP')}本` : bottlingBasisSrc;

  // ── 詰口スケジュール（優先スコアベース）─────────────────────────────────────
  const calMonthPrefix = `${y}-${pad(m)}`;
  const calStaffedDays = calendarShifts
    .filter(s => s.date.startsWith(calMonthPrefix) && (s.partTimers > 0 || s.employees > 0))
    .sort((a, b) => a.date.localeCompare(b.date));
  const hasCalData = calStaffedDays.length >= 5;
  const activeDayNums = hasCalData
    ? calStaffedDays.map(s => parseInt(s.date.slice(-2))).filter(d => !inventorySet.has(d))
    : businessDays.filter(d => !inventorySet.has(d));
  const calDayMap = new Map(calStaffedDays.map(s => [parseInt(s.date.slice(-2)), s]));

  // buildBottlingSchedule で在庫逼迫度・納期・同酒質まとめを考慮した順序を生成
  const bottlingSchedule = buildBottlingSchedule(productionPlan, yearMonth);

  const bottlingDayMap = new Map<number, { productCode: string; productName: string; dailyQty: number; brewCategory: string; priorityScore: number }>();
  let dayIdx = 0;
  for (const item of bottlingSchedule) {
    const qty = item.plannedQty > 0 ? item.plannedQty : item.requiredQty;
    for (let i = 0; i < item.daysNeeded && dayIdx < activeDayNums.length; i++, dayIdx++) {
      const d = activeDayNums[dayIdx];
      bottlingDayMap.set(d, {
        productCode: item.productCode,
        productName: item.productName,
        dailyQty: Math.min(qty - i * LINE_MAX_DAILY, LINE_MAX_DAILY),
        brewCategory: item.brewCategory,
        priorityScore: item.priorityScore,
      });
    }
  }

  // ── 貼場スケジュール
  const labelingPrimaryCount = primaryMembers('labeling').length || 1;
  const labelingHeadcount = Math.max(LABELING_MIN, Math.min(labelingPrimaryCount, 3));
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
    labelingPrimaryCount, Math.ceil(dailyLabelingQty / LABELING_CAPACITY_PER_PERSON_DAY)
  ));

  // ── 総務の必要人数
  const soumuPrimary = primaryMembers('soumu');
  const soumuEmps    = soumuPrimary.filter(s => s.employmentType === 'employee');
  const soumuNeededBase = Math.max(
    soumuEmps.length,
    Math.ceil(avgDailyDocs / DOCS_PER_PERSON_DAY),
    Math.ceil(avgDailyVisitors / VISITORS_PER_PERSON_AM)
  );

  // ── 配送の必要人数
  const routePrimary = primaryMembers('route_sales');
  const routeEmps    = routePrimary.filter(s => s.employmentType === 'employee');
  const routeConts   = routePrimary.filter(s => s.employmentType === 'contractor');
  const routeEmpCap  = routeEmps.length * DELIVERY_CAPACITY_PER_VEHICLE;
  const dailyOverflow = Math.max(0, avgDailyRoute - routeEmpCap);
  const contractorsNeeded = dailyOverflow > 0
    ? Math.min(routeConts.length, Math.ceil(dailyOverflow / DELIVERY_CAPACITY_PER_VEHICLE)) : 0;

  // ══════════════════════════════════════════════════════════════════════════
  // 2パス方式: Pass1 = 主部門配置、Pass2 = 越境による不足補充
  // ══════════════════════════════════════════════════════════════════════════

  const plans: DailyShiftPlan[] = [];

  for (const d of businessDays) {
    const dateStr     = `${y}-${pad(m)}-${pad(d)}`;
    const isInventory = inventorySet.has(d);
    const bottlingRun = bottlingDayMap.get(d);
    const isBottling  = bottlingRun !== undefined;
    const isLabeling  = labelingDaySet.has(d);

    // ── Pass 1: 各部門に主部門メンバーだけを配置 ─────────────────────────────

    // 各部門の「この日に稼働するか」「配置済みID」「必要人数」「不足人数」を記録
    interface DeptSlot {
      dept: StaffDepartment;
      active: boolean;           // この日に稼働するか
      assignedIds: string[];     // 配置済みスタッフID
      neededCount: number;       // 必要人数
      shortage: number;          // 不足人数（Pass2で越境者を入れる基準）
      notes: string;
    }
    const slots = new Map<StaffDepartment, DeptSlot>();

    // ── 総務（営業日ベース: 常に稼働）
    {
      const members = sortByRole(availableOn(soumuPrimary, d));
      const empsToday = members.filter(s => s.employmentType === 'employee');
      const partsAM   = members.filter(s => s.employmentType === 'part_time' && (s.shiftPreference ?? 'both') !== 'afternoon');
      const partsPM   = members.filter(s => s.employmentType === 'part_time' && (s.shiftPreference ?? 'both') !== 'morning');
      const needed = soumuNeededBase + (isInventory ? 1 : 0);
      const assigned: string[] = empsToday.map(s => s.id);
      let g = Math.max(0, needed - empsToday.length);
      for (const s of partsAM)  { if (g <= 0) break; assigned.push(s.id); g--; }
      for (const s of partsPM)  { if (g <= 0) break; if (!assigned.includes(s.id)) { assigned.push(s.id); g--; } }
      slots.set('soumu', {
        dept: 'soumu', active: true, assignedIds: assigned,
        neededCount: needed, shortage: Math.max(0, needed - assigned.length),
        notes: [
          isInventory ? '棚卸週（月末棚卸対応）' : null,
          `伝票${Math.round(avgDailyDocs)}件/日 ÷ ${DOCS_PER_PERSON_DAY}件/人 = ${Math.ceil(avgDailyDocs/DOCS_PER_PERSON_DAY)}名必要`,
          `来客${Math.round(avgDailyVisitors)}件/日 ÷ ${VISITORS_PER_PERSON_AM}件/人 = ${Math.ceil(avgDailyVisitors/VISITORS_PER_PERSON_AM)}名必要(AM)`,
        ].filter(Boolean).join(' | '),
      });
    }

    // ── 配送（営業日ベース: 常に稼働）
    {
      const empsToday  = availableOn(routeEmps, d);
      const contsToday = availableOn(routeConts, d).slice(0, contractorsNeeded);
      const assigned = [...empsToday, ...contsToday].map(s => s.id);
      const needed = empsToday.length + contractorsNeeded;
      slots.set('route_sales', {
        dept: 'route_sales', active: true, assignedIds: assigned,
        neededCount: needed, shortage: 0,
        notes: [
          `前年同月日次平均 ${fmtYen(avgDailyRoute)}`,
          `社員${empsToday.length}台 × 積載 ${fmtYen(DELIVERY_CAPACITY_PER_VEHICLE)}/台`,
          contractorsNeeded > 0 ? `委託${contsToday.length}台追加（超過 ${fmtYen(dailyOverflow)}/日）` : null,
        ].filter(Boolean).join(' | '),
      });
    }

    // ── 造り（工程ベース: 醸造月 + 部門長出勤）
    {
      const members = primaryMembers('brewing');
      const todayMembers = sortByRole(availableOn(members, d));
      const hasLeader = leaderAvailableOn(members, d);
      const active = isBrewingMonth && hasLeader && todayMembers.length > 0;
      slots.set('brewing', {
        dept: 'brewing', active,
        assignedIds: active ? todayMembers.map(s => s.id) : [],
        neededCount: active ? todayMembers.length : 0, shortage: 0,
        notes: active
          ? `醸造月（${m}月） | 調達計画に基づく仕込み`
          : !isBrewingMonth ? '醸造期間外' : '部門長不在',
      });
    }

    // ── 詰口（工程ベース: 生産計画あり + 部門長出勤）
    {
      const members = primaryMembers('bottling');
      const hasLeader = leaderAvailableOn(members, d);
      const active = isBottling && !!bottlingRun && (hasLeader || members.filter(s => s.isDeptLeader).length === 0);
      const calShift = calDayMap.get(d);
      const targetHead = calShift
        ? Math.max(BOTTLING_LINE_SIZE, calShift.partTimers + calShift.employees)
        : BOTTLING_LINE_SIZE;
      const todayMembers = active ? sortByRole(availableOn(members, d)).slice(0, targetHead) : [];
      const productLabel = bottlingRun?.productName
        ? `${bottlingRun.productName}（${bottlingRun.productCode}）` : bottlingBasisSrc;
      const catLabel = bottlingRun && 'brewCategory' in bottlingRun ? `[${bottlingRun.brewCategory}]` : '';
      const scoreLabel = bottlingRun && 'priorityScore' in bottlingRun ? `優先度${Math.round(bottlingRun.priorityScore)}` : '';
      slots.set('bottling', {
        dept: 'bottling', active,
        assignedIds: todayMembers.map(s => s.id),
        neededCount: active ? targetHead : 0,
        shortage: active ? Math.max(0, BOTTLING_LINE_SIZE - todayMembers.length) : 0,
        notes: !active ? (isBottling ? '部門長不在' : '詰口予定なし')
          : todayMembers.length < BOTTLING_LINE_SIZE
            ? `⚠ 要員不足 ${todayMembers.length}/${BOTTLING_LINE_SIZE}名 | ${catLabel} ${productLabel}`
            : `${catLabel} ${productLabel} | ${scoreLabel} | 本日目標 ${bottlingRun!.dailyQty.toLocaleString('ja-JP')}本`,
      });
    }

    // ── 貼場（工程ベース: 貼場スケジュールあり + 部門長出勤）
    {
      const members = primaryMembers('labeling');
      const hasLeader = leaderAvailableOn(members, d);
      const active = isLabeling && (hasLeader || members.filter(s => s.isDeptLeader).length === 0);
      const todayMembers = active ? sortByRole(availableOn(members, d)).slice(0, dailyLabelingHeadcount) : [];
      slots.set('labeling', {
        dept: 'labeling', active,
        assignedIds: todayMembers.map(s => s.id),
        neededCount: active ? dailyLabelingHeadcount : 0,
        shortage: active ? Math.max(0, LABELING_MIN - todayMembers.length) : 0,
        notes: !active ? '貼場予定なし'
          : todayMembers.length < LABELING_MIN
            ? `⚠ 要員不足 ${todayMembers.length}/${LABELING_MIN}名`
            : `${labelingBasisSrc} | 本日目標 ${dailyLabelingQty.toLocaleString('ja-JP')}本 (${dailyLabelingHeadcount}名 × ${LABELING_CAPACITY_PER_PERSON_DAY}本/人日)`,
      });
    }

    // ── Pass 2: 越境による不足補充 ────────────────────────────────────────────
    // 自部門に作業がない日のスタッフを、不足度が高い部門に優先配置

    // 自部門が非稼働のスタッフを収集
    const crossCandidates: StaffMember[] = [];
    const assignedGlobal = new Set<string>();
    for (const slot of slots.values()) {
      for (const id of slot.assignedIds) assignedGlobal.add(id);
    }

    for (const s of staff) {
      if (!s.isActive) continue;
      if (s.availableMonths && !s.availableMonths.includes(m)) continue;
      if (s.crossDepartments.length === 0) continue;
      if (assignedGlobal.has(s.id)) continue;
      // 固定休みチェック
      const dow = new Date(y, m - 1, d).getDay();
      if ((s.fixedDaysOff ?? []).includes(dow)) continue;
      // 自部門が稼働中なら越境不可
      const ownSlot = slots.get(s.department as StaffDepartment);
      if (ownSlot && ownSlot.active) continue;
      crossCandidates.push(s);
    }

    // 不足がある部門を不足度降順にソート
    const shortageSlots = [...slots.values()]
      .filter(s => s.active && s.shortage > 0)
      .sort((a, b) => b.shortage - a.shortage);

    for (const slot of shortageSlots) {
      if (slot.shortage <= 0) continue;
      // この部門に越境可能な候補を探す
      const candidates = crossCandidates.filter(s =>
        s.crossDepartments.includes(slot.dept) && !assignedGlobal.has(s.id)
      );
      // 社員優先でソート
      candidates.sort((a, b) => {
        const score = (s: StaffMember) => s.employmentType === 'employee' ? 0 : s.employmentType === 'part_time' ? 1 : 2;
        return score(a) - score(b);
      });
      for (const c of candidates) {
        if (slot.shortage <= 0) break;
        slot.assignedIds.push(c.id);
        slot.shortage--;
        assignedGlobal.add(c.id);
        // notes に越境者を記録
        slot.notes += ` | 越境: ${c.name}（${DEPT_LABEL[c.department as StaffDepartment] ?? c.department}）`;
      }
    }

    // ── プラン出力（稼働部門のみ）
    for (const slot of slots.values()) {
      if (!slot.active && slot.assignedIds.length === 0) continue;
      // 営業日ベース部門は常に出力、工程ベースは稼働日のみ
      if (!slot.active && PROCESS_BASED_DEPTS.includes(slot.dept)) continue;
      plans.push({
        planDate: dateStr,
        department: slot.dept,
        staffMemberIds: slot.assignedIds,
        notes: slot.shortage > 0
          ? `⚠ ${slot.shortage}名不足（越境候補なし） | ${slot.notes}`
          : slot.notes,
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

// ── 詰口スケジュールタブ ─────────────────────────────────────────────────────

const BREW_CAT_COLOR: Record<string, string> = {
  '純米大吟醸': '#8b5cf6',
  '大吟醸':     '#6366f1',
  '純米吟醸':   '#3b82f6',
  '純米':       '#10b981',
  '本醸造':     '#f59e0b',
  '普通酒':     '#6b7280',
  'リキュール': '#ec4899',
  'その他':     '#9ca3af',
};

function urgencyBar(score: number, label: string): string {
  const color = score >= 70 ? '#ef4444' : score >= 40 ? '#f59e0b' : '#10b981';
  return `<div style="display:flex;align-items:center;gap:4px;min-width:80px;">
    <div style="flex:1;background:var(--border);border-radius:2px;height:4px;">
      <div style="width:${Math.min(score, 100)}%;height:100%;background:${color};border-radius:2px;"></div>
    </div>
    <span style="font-size:10px;color:${color};font-weight:600;white-space:nowrap;">${Math.round(score)}</span>
  </div>`;
}

function renderBottlingTab(
  productionPlan: ProductionPlanRow[],
  yearMonth: string,
  bottlingSchedule: BottlingScheduleItem[]
): string {
  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return `<option value="${ym}" ${ym === yearMonth ? 'selected' : ''}>${ym.replace('-', '年')}月</option>`;
  }).join('');

  const totalQty = bottlingSchedule.reduce((s, it) => s + (it.plannedQty > 0 ? it.plannedQty : it.requiredQty), 0);
  const totalDays = bottlingSchedule.reduce((s, it) => s + it.daysNeeded, 0);
  const categories = [...new Set(bottlingSchedule.map(it => it.brewCategory))];
  const urgentCount = bottlingSchedule.filter(it => it.stockUrgency >= 60).length;

  // 酒質ごとの集計
  const catSummary = categories.map(cat => {
    const items = bottlingSchedule.filter(it => it.brewCategory === cat);
    const qty = items.reduce((s, it) => s + (it.plannedQty > 0 ? it.plannedQty : it.requiredQty), 0);
    const days = items.reduce((s, it) => s + it.daysNeeded, 0);
    const color = BREW_CAT_COLOR[cat] ?? '#9ca3af';
    return `<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:${color}10;border:1px solid ${color}30;border-radius:6px;">
      <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${color};flex-shrink:0;"></span>
      <div>
        <div style="font-size:12px;font-weight:600;color:${color};">${cat}</div>
        <div style="font-size:10px;color:var(--text-secondary);">${items.length}品 ${qty.toLocaleString('ja-JP')}本 ${days}日</div>
      </div>
    </div>`;
  }).join('');

  // スケジュールテーブル（順序 = 詰口順）
  let runningDay = 0;
  let prevCat = '';
  const rows = bottlingSchedule.map((it, idx) => {
    const qty = it.plannedQty > 0 ? it.plannedQty : it.requiredQty;
    const color = BREW_CAT_COLOR[it.brewCategory] ?? '#9ca3af';
    const catChanged = it.brewCategory !== prevCat;
    prevCat = it.brewCategory;
    runningDay += it.daysNeeded;

    const typeLabel: Record<string, string> = {
      monthly: '月次', annual: '年次', make_to_order: '受注', november: '11月'
    };
    const monthLabel = it.yearMonth === yearMonth ? '' : `<span style="font-size:10px;color:var(--text-secondary);margin-left:4px;">${it.yearMonth.replace('-', '/')}</span>`;

    return `${catChanged && idx > 0 ? `<tr><td colspan="9" style="padding:2px;background:var(--border);"></td></tr>` : ''}
      <tr data-bottling-idx="${idx}" style="cursor:grab;">
        <td style="text-align:center;font-size:11px;color:var(--text-secondary);width:30px;">${idx + 1}</td>
        <td>
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color};margin-right:4px;"></span>
          <span style="font-size:11px;color:${color};font-weight:600;">${it.brewCategory}</span>
        </td>
        <td style="white-space:nowrap;">
          ${it.productName}${monthLabel}
        </td>
        <td><span style="font-size:11px;padding:1px 6px;border-radius:8px;background:var(--surface-alt);">${typeLabel[it.productionType] ?? it.productionType}</span></td>
        <td class="numeric">${qty.toLocaleString('ja-JP')}</td>
        <td class="numeric">${it.daysNeeded}日</td>
        <td>${urgencyBar(it.stockUrgency, '在庫')}</td>
        <td>${urgencyBar(it.deadlineUrgency, '納期')}</td>
        <td>
          <div style="display:flex;gap:2px;">
            <button class="button secondary small" data-bottling-move="up" data-bottling-idx="${idx}" style="padding:2px 6px;font-size:10px;" ${idx === 0 ? 'disabled' : ''}>▲</button>
            <button class="button secondary small" data-bottling-move="down" data-bottling-idx="${idx}" style="padding:2px 6px;font-size:10px;" ${idx === bottlingSchedule.length - 1 ? 'disabled' : ''}>▼</button>
          </div>
        </td>
      </tr>`;
  }).join('');

  // ガントバー（簡易）
  const maxDays = Math.max(totalDays, 1);
  let ganttOffset = 0;
  prevCat = '';
  const ganttBars = bottlingSchedule.map(it => {
    const qty = it.plannedQty > 0 ? it.plannedQty : it.requiredQty;
    const color = BREW_CAT_COLOR[it.brewCategory] ?? '#9ca3af';
    const widthPct = (it.daysNeeded / maxDays) * 100;
    const leftPct = (ganttOffset / maxDays) * 100;
    ganttOffset += it.daysNeeded;
    return `<div title="${it.productName} ${qty.toLocaleString('ja-JP')}本 ${it.daysNeeded}日"
      style="position:absolute;left:${leftPct}%;width:${widthPct}%;height:100%;background:${color};opacity:0.8;border-right:1px solid var(--surface);"></div>`;
  }).join('');

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">基準月</label>
      <select id="bottling-year-month" class="form-input" style="width:160px;">${monthOptions}</select>
      <span style="font-size:11px;color:var(--text-secondary);">3ヶ月分の生産計画から詰口順を自動算出</span>
      <button class="button primary small" data-action="bottling-recalc" style="margin-left:auto;">再計算</button>
    </div>

    <!-- KPI -->
    <div class="kpi-grid compact" style="margin-bottom:16px;">
      <article class="panel kpi-card">
        <p class="panel-title">詰口対象</p>
        <p class="kpi-value">${bottlingSchedule.length}<span style="font-size:13px;font-weight:400;">品</span></p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">合計本数</p>
        <p class="kpi-value">${totalQty.toLocaleString('ja-JP')}<span style="font-size:13px;font-weight:400;">本</span></p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">必要稼働日</p>
        <p class="kpi-value">${totalDays}<span style="font-size:13px;font-weight:400;">日</span></p>
      </article>
      <article class="panel kpi-card ${urgentCount > 0 ? 'text-danger' : ''}">
        <p class="panel-title">在庫逼迫</p>
        <p class="kpi-value">${urgentCount}<span style="font-size:13px;font-weight:400;">品</span></p>
      </article>
    </div>

    <!-- 酒質サマリ -->
    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>酒質別サマリ</h2><p class="panel-caption">同じ酒質はまとめて連続稼働（切り替えロス最小化）</p></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:4px 0 8px;">${catSummary}</div>
    </section>

    <!-- ガントバー -->
    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>詰口タイムライン</h2><p class="panel-caption">${totalDays}稼働日 | 日産上限 ${LINE_MAX_DAILY.toLocaleString('ja-JP')}本</p></div>
      <div style="position:relative;height:28px;background:var(--surface-alt);border-radius:4px;overflow:hidden;margin:4px 0 8px;">
        ${ganttBars}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;font-size:10px;">
        ${categories.map(cat => {
          const color = BREW_CAT_COLOR[cat] ?? '#9ca3af';
          return `<span style="display:inline-flex;align-items:center;gap:2px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color};"></span>${cat}
          </span>`;
        }).join('')}
      </div>
    </section>

    <!-- 詰口順テーブル -->
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>詰口順序</h2>
          <p class="panel-caption">在庫逼迫度×納期×量から自動算出。▲▼で順番を調整できます。</p>
        </div>
        <button class="button primary small" data-action="bottling-save">順序を保存</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:30px;">#</th>
              <th>酒質</th>
              <th>商品名</th>
              <th>区分</th>
              <th class="numeric">本数</th>
              <th class="numeric">日数</th>
              <th style="min-width:80px;">在庫逼迫</th>
              <th style="min-width:80px;">納期逼迫</th>
              <th style="width:50px;"></th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="9" class="empty-row">生産計画データなし</td></tr>'}
            ${bottlingSchedule.length > 0 ? `
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td></td><td></td><td>合計</td><td></td>
                <td class="numeric">${totalQty.toLocaleString('ja-JP')}</td>
                <td class="numeric">${totalDays}日</td>
                <td colspan="3"></td>
              </tr>` : ''}
          </tbody>
        </table>
      </div>
    </section>
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
  selectedDay: string | null = null,
  productionPlan: ProductionPlanRow[] = [],
  bottlingSchedule: BottlingScheduleItem[] = []
): string {
  const tabContent =
    activeTab === 'staff'    ? renderStaffTab(staff, deptFilter) :
    activeTab === 'cost'     ? renderCostTab(staff, yearMonth) :
    activeTab === 'bottling' ? renderBottlingTab(productionPlan, yearMonth, bottlingSchedule) :
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
          <button class="tab-button ${activeTab === 'bottling' ? 'active' : ''}" data-workforce-tab="bottling">詰口スケジュール</button>
          <button class="tab-button ${activeTab === 'cost'  ? 'active' : ''}" data-workforce-tab="cost">人件費</button>
        </div>
      </div>
      ${tabContent}
    </section>
  `;
}
