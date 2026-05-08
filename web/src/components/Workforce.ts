import type { StaffMember, StaffDepartment, BrewingScheduleRow, MonthlyTask, WorkforceMetrics } from '../api';
import { DEPT_LABEL, MONTHLY_TASK_LABEL, SHIFT_PREF_LABEL } from '../api';

export type WorkforceTab = 'staff' | 'shift' | 'cost';

// ── 定数 ─────────────────────────────────────────────────────────────────────

const BOTTLING_LINE_SIZE             = 4;       // 詰口ライン定員（最低4名）
const LABELING_MIN                   = 1;       // 貼場最小人数（1名〜）
const LINE_MAX_DAILY                 = 4000;    // 日産最大本数（1800ml換算）
const DELIVERY_CAPACITY_PER_VEHICLE  = 300_000; // 1台あたり積載目安（円/日）
const MAX_DELIVERY_VEHICLES          = 2;       // 最大車両台数

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

function renderShiftTab(
  staff: StaffMember[],
  yearMonth: string,
  brewingSchedule: BrewingScheduleRow[],
  bottlingTargetQty: number,
  metrics: WorkforceMetrics | null
): string {
  const [, m] = yearMonth.split('-').map(Number);
  const now   = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d  = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return `<option value="${ym}" ${ym === yearMonth ? 'selected' : ''}>${ym.replace('-', '年')}月</option>`;
  }).join('');

  const isBrewingMonth = brewingSchedule.some(s => {
    for (let i = 0; i < s.durationMonths; i++) {
      if (((s.brewMonth - 1 + i) % 12) + 1 === m) return true;
    }
    return false;
  });

  // その月に稼働可能なスタッフ（主部門 or 兼務）
  function byDept(dept: StaffDepartment): StaffMember[] {
    return staff.filter(s => s.isActive &&
      (s.department === dept || s.crossDepartments.includes(dept)) &&
      (!s.availableMonths || s.availableMonths.includes(m)));
  }

  const bottlingDays = bottlingTargetQty > 0
    ? Math.ceil(bottlingTargetQty / LINE_MAX_DAILY) : null;

  function staffChip(s: StaffMember, dept: StaffDepartment): string {
    const isCross = s.department !== dept;
    return `<span style="display:inline-flex;align-items:center;gap:4px;background:${isCross ? DEPT_COLOR[dept] + '15' : 'var(--surface-alt)'};border:1px solid ${isCross ? DEPT_COLOR[dept] + '60' : 'transparent'};border-radius:14px;padding:2px 10px;font-size:13px;margin:2px;" title="${isCross ? '兼務（越境）' : ''}">
      <span style="width:6px;height:6px;border-radius:50%;background:${EMP_TYPE_COLOR[s.employmentType]};display:inline-block;"></span>
      ${s.name}${isCross ? ' <span style="font-size:9px;opacity:0.6;">越</span>' : ''}
    </span>`;
  }

  function deptBlock(dept: StaffDepartment, extraInfo?: string, workloadNote?: string): string {
    const members = byDept(dept);
    const color   = DEPT_COLOR[dept];
    if (members.length === 0) {
      return `<div class="panel" style="border-left:3px solid ${color};padding:10px 16px;margin-bottom:8px;opacity:0.6;">
        <p style="font-weight:700;color:${color};margin:0;">${DEPT_LABEL[dept]}</p>
        <p style="color:var(--text-secondary);font-size:12px;margin:4px 0 0;">スタッフ未登録${dept === 'brewing' && !isBrewingMonth ? ' / 醸造計画外の月' : ''}</p>
      </div>`;
    }
    return `<div class="panel" style="border-left:3px solid ${color};padding:10px 16px;margin-bottom:8px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
        <p style="font-weight:700;color:${color};margin:0;">${DEPT_LABEL[dept]}</p>
        <span style="font-size:12px;color:var(--text-secondary);">${members.length}名</span>
        ${extraInfo ? `<span style="font-size:11px;color:var(--text-secondary);margin-left:auto;">${extraInfo}</span>` : ''}
      </div>
      <div style="display:flex;flex-wrap:wrap;">${members.map(s => staffChip(s, dept)).join('')}</div>
      ${workloadNote ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);">${workloadNote}</div>` : ''}
    </div>`;
  }

  // ── 稼働指標ノート ────────────────────────────────────────────────────────
  function metricChip(label: string, value: string): string {
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);border-radius:6px;padding:2px 8px;margin:2px;">
      <span style="opacity:0.7;">${label}</span>
      <strong style="color:var(--text-primary);">${value}</strong>
    </span>`;
  }

  function capacityBar(used: number, total: number): string {
    const pct   = total > 0 ? Math.min(100, Math.round(used / total * 100)) : 0;
    const color = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#10b981';
    return `<div style="margin-top:4px;display:flex;align-items:center;gap:6px;">
      <div style="flex:1;background:var(--border);border-radius:4px;height:6px;overflow:hidden;">
        <div style="width:${pct}%;height:100%;background:${color};border-radius:4px;transition:width .3s;"></div>
      </div>
      <span style="font-size:11px;font-weight:700;color:${color};min-width:32px;">${pct}%</span>
    </div>`;
  }

  const soumuNote = metrics ? `
    <div style="display:flex;flex-wrap:wrap;gap:4px;">
      ${metricChip('処理伝票', `${metrics.monthlyDocumentCount.toLocaleString('ja-JP')}件/月`)}
      ${metricChip('直売来店', `${metrics.directSalesCount}件（${fmtYen(metrics.directSalesAmount)}）`)}
    </div>
    <p style="font-size:10px;color:var(--text-secondary);margin:4px 0 0;">伝票数＝受注・発送工数の目安 / 直売来店＝上様売上件数</p>
  ` : '';

  const maxDeliveryMonthly = DELIVERY_CAPACITY_PER_VEHICLE * MAX_DELIVERY_VEHICLES * (metrics?.workingDays ?? 22);
  const deliveryNote = metrics ? `
    <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">
      ${metricChip('ルート売上', fmtYen(metrics.routeSalesAmount))}
      ${metricChip('積載上限', `${fmtYen(DELIVERY_CAPACITY_PER_VEHICLE)}/台/日 × ${MAX_DELIVERY_VEHICLES}台 × ${metrics.workingDays}日`)}
    </div>
    ${capacityBar(metrics.routeSalesAmount, maxDeliveryMonthly)}
    <p style="font-size:10px;color:var(--text-secondary);margin:4px 0 0;">積載率 = 月間ルート売上 ÷ 最大積載量（${fmtYen(maxDeliveryMonthly)}）</p>
  ` : '';

  const bottlingInfo = bottlingTargetQty > 0
    ? `目標 ${bottlingTargetQty.toLocaleString('ja-JP')} 本 → 推定 ${bottlingDays} 日稼働（${BOTTLING_LINE_SIZE}名固定）`
    : `最大 ${LINE_MAX_DAILY.toLocaleString('ja-JP')} 本/日・${BOTTLING_LINE_SIZE}名固定`;
  const labelingInfo = bottlingTargetQty > 0
    ? `詰口と同日稼働（${LABELING_MIN}名〜、量に応じて増員）`
    : `${LABELING_MIN}名〜（量に応じて増員）`;

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="shift-year-month" class="form-input" style="width:160px;">${monthOptions}</select>
      <button class="button secondary small" data-action="shift-auto-generate" style="margin-left:auto;">
        ⚡ 醸造計画から自動生成
      </button>
    </div>

    <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">
      ${yearMonth.replace('-', '年')}月の稼働予定。越境スタッフは枠付きで表示。
    </p>

    ${deptBlock('soumu', undefined, soumuNote)}
    ${deptBlock('route_sales')}
    ${deptBlock('delivery', undefined, deliveryNote)}
    ${deptBlock('brewing', isBrewingMonth ? '醸造計画期間内' : '醸造計画外の月')}
    ${deptBlock('bottling', bottlingInfo)}
    ${deptBlock('labeling', labelingInfo)}

    <div class="panel" style="background:var(--surface-alt);padding:10px 16px;margin-top:6px;">
      <p style="font-size:11px;color:var(--text-secondary);margin:0;">
        <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;margin-right:3px;"></span>社員 &nbsp;
        <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#f59e0b;margin-right:3px;"></span>パート &nbsp;
        <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#6b7280;margin-right:3px;"></span>業務委託 &nbsp;｜&nbsp;
        枠付き = 越境（兼務）スタッフ
      </p>
    </div>
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
  metrics: WorkforceMetrics | null = null
): string {
  const tabContent =
    activeTab === 'staff' ? renderStaffTab(staff, deptFilter) :
    activeTab === 'cost'  ? renderCostTab(staff, yearMonth) :
    renderShiftTab(staff, yearMonth, brewingSchedule, bottlingTargetQty, metrics);

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
