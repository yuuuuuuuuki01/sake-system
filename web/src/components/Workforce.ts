import type { StaffMember, StaffDepartment, BrewingScheduleRow } from '../api';
import { DEPT_LABEL } from '../api';

export type WorkforceTab = 'staff' | 'shift' | 'cost';

// ── 定数 ─────────────────────────────────────────────────────────────────────

const BOTTLING_LINE_SIZE = 4;       // 詰口・貼場ライン定員
const BOTTLING_MAX_DAILY = 4000;    // 日産最大本数（1800ml換算）

function fmtYen(n: number | null | undefined): string {
  if (n == null) return '—';
  return '¥' + Math.round(n).toLocaleString('ja-JP');
}

function monthName(m: number): string {
  return `${m}月`;
}

const DEPT_COLOR: Record<StaffDepartment, string> = {
  soumu:       '#3b82f6',
  route_sales: '#10b981',
  brewing:     '#8b5cf6',
  bottling:    '#f59e0b',
};

const EMP_TYPE_LABEL: Record<string, string> = {
  employee:  '社員',
  part_time: 'パート',
};

// ── スタッフ一覧タブ ──────────────────────────────────────────────────────────

function renderStaffTab(staff: StaffMember[], deptFilter: string): string {
  const depts = Object.keys(DEPT_LABEL) as StaffDepartment[];
  const filtered = deptFilter ? staff.filter(s => s.department === deptFilter) : staff;
  const active = filtered.filter(s => s.isActive);
  const inactive = filtered.filter(s => !s.isActive);

  function badge(dept: StaffDepartment): string {
    return `<span style="display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${DEPT_COLOR[dept]};">${DEPT_LABEL[dept]}</span>`;
  }

  function row(s: StaffMember): string {
    const wage = s.employmentType === 'employee'
      ? `月給 ${fmtYen(s.monthlySalary)}`
      : `時給 ${fmtYen(s.hourlyRate)}`;
    const months = s.availableMonths
      ? s.availableMonths.map(monthName).join('・')
      : '通年';
    return `<tr class="${s.isActive ? '' : 'row-inactive'}">
      <td>${s.name}${s.kana ? `<br><span style="font-size:11px;color:var(--text-secondary);">${s.kana}</span>` : ''}</td>
      <td>${badge(s.department)}</td>
      <td><span class="status-pill ${s.employmentType === 'employee' ? 'success' : 'neutral'}">${EMP_TYPE_LABEL[s.employmentType]}</span></td>
      <td>${wage}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${months}</td>
      <td>${s.notes || ''}</td>
      <td style="white-space:nowrap;">
        <button class="button secondary small" data-edit-staff="${s.id}">編集</button>
        <button class="button secondary small danger" data-delete-staff="${s.id}" data-staff-name="${s.name}" style="margin-left:4px;">削除</button>
      </td>
    </tr>`;
  }

  const filterButtons = ['', ...depts].map(d =>
    `<button class="button ${deptFilter === d ? 'primary' : 'secondary'} small" data-staff-dept-filter="${d}">${d ? DEPT_LABEL[d as StaffDepartment] : '全部門'}</button>`
  ).join('');

  return `
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${filterButtons}</div>
      <button class="button primary small" data-action="staff-new" style="margin-left:auto;">＋ スタッフ追加</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>氏名</th><th>部門</th><th>種別</th><th>賃金</th><th>稼働月</th><th>備考</th><th></th>
        </tr></thead>
        <tbody>
          ${active.map(row).join('') || '<tr><td colspan="7" class="empty-row">スタッフが登録されていません</td></tr>'}
          ${inactive.length > 0 ? `
            <tr><td colspan="7" style="padding:4px 8px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);">── 休職・退職 ──</td></tr>
            ${inactive.map(row).join('')}
          ` : ''}
        </tbody>
      </table>
    </div>
  `;
}

// ── スタッフ登録モーダル ───────────────────────────────────────────────────────

export function renderStaffModal(s?: StaffMember): string {
  const isEdit = !!s?.id;
  const availStr = s?.availableMonths ? s.availableMonths.join(',') : '';

  const deptOptions = (Object.keys(DEPT_LABEL) as StaffDepartment[]).map(d =>
    `<option value="${d}" ${s?.department === d ? 'selected' : ''}>${DEPT_LABEL[d]}</option>`
  ).join('');

  return `
    <div class="modal-overlay" id="staff-modal">
      <div class="modal-content panel" style="max-width:520px;">
        <h2>${isEdit ? 'スタッフ編集' : 'スタッフ追加'}</h2>
        <form id="staff-form" class="feature-form">
          <input type="hidden" id="sf-id" value="${s?.id ?? ''}" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="form-row" style="grid-column:1/-1;"><label>氏名 *</label><input type="text" id="sf-name" value="${s?.name ?? ''}" required /></div>
            <div class="form-row" style="grid-column:1/-1;"><label>カナ</label><input type="text" id="sf-kana" value="${s?.kana ?? ''}" /></div>
            <div class="form-row"><label>部門</label>
              <select id="sf-dept">${deptOptions}</select>
            </div>
            <div class="form-row"><label>種別</label>
              <select id="sf-emp-type">
                <option value="part_time" ${s?.employmentType === 'part_time' ? 'selected' : ''}>パート</option>
                <option value="employee"  ${s?.employmentType === 'employee'  ? 'selected' : ''}>社員</option>
              </select>
            </div>
            <div class="form-row" id="sf-hourly-row"><label>時給（円）</label><input type="number" id="sf-hourly" value="${s?.hourlyRate ?? ''}" min="0" /></div>
            <div class="form-row" id="sf-salary-row"><label>月給（円）</label><input type="number" id="sf-salary" value="${s?.monthlySalary ?? ''}" min="0" /></div>
            <div class="form-row"><label>1日勤務時間（h）</label><input type="number" id="sf-hours" value="${s?.workHoursPerDay ?? 8}" min="1" max="24" step="0.5" /></div>
            <div class="form-row"><label>月勤務日数</label><input type="number" id="sf-days" value="${s?.workDaysPerMonth ?? 22}" min="1" max="31" /></div>
            <div class="form-row" style="grid-column:1/-1;">
              <label>稼働月（空欄=通年、カンマ区切りで月番号 例: 9,10,11,12,1,2,3,4）</label>
              <input type="text" id="sf-months" value="${availStr}" placeholder="例: 9,10,11,12,1,2,3,4" />
            </div>
            <div class="form-row" style="grid-column:1/-1;"><label>備考</label><input type="text" id="sf-notes" value="${s?.notes ?? ''}" /></div>
            <div class="form-row" style="grid-column:1/-1;">
              <label><input type="checkbox" id="sf-active" ${s?.isActive !== false ? 'checked' : ''} /> 有効（在籍中）</label>
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

function calcMonthlyCost(s: StaffMember, year: number, month: number): number {
  if (!s.isActive) return 0;
  // 稼働月チェック
  if (s.availableMonths && !s.availableMonths.includes(month)) return 0;
  if (s.employmentType === 'employee') {
    return s.monthlySalary ?? 0;
  } else {
    return (s.hourlyRate ?? 0) * s.workHoursPerDay * s.workDaysPerMonth;
  }
}

function renderCostTab(staff: StaffMember[], yearMonth: string): string {
  const [y, m] = yearMonth.split('-').map(Number);
  const depts = Object.keys(DEPT_LABEL) as StaffDepartment[];

  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return `<option value="${ym}" ${ym === yearMonth ? 'selected' : ''}>${ym.replace('-', '年')}月</option>`;
  }).join('');

  let grandTotal = 0;
  const deptRows = depts.map(dept => {
    const members = staff.filter(s => s.department === dept);
    const total = members.reduce((sum, s) => sum + calcMonthlyCost(s, y, m), 0);
    grandTotal += total;
    const memberRows = members.map(s => {
      const cost = calcMonthlyCost(s, y, m);
      const inactive = !s.isActive || (s.availableMonths && !s.availableMonths.includes(m));
      return `<tr style="${inactive ? 'opacity:0.4;' : ''}">
        <td style="padding-left:24px;">${s.name}</td>
        <td><span class="status-pill ${s.employmentType === 'employee' ? 'success' : 'neutral'}">${EMP_TYPE_LABEL[s.employmentType]}</span></td>
        <td class="numeric">${s.employmentType === 'employee' ? fmtYen(s.monthlySalary) : `${fmtYen(s.hourlyRate)}/h × ${s.workHoursPerDay}h × ${s.workDaysPerMonth}日`}</td>
        <td class="numeric"><strong>${inactive ? '(稼働外)' : fmtYen(cost)}</strong></td>
      </tr>`;
    }).join('');
    return `
      <tr style="background:var(--surface-alt);">
        <td colspan="3"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${DEPT_COLOR[dept]};margin-right:6px;"></span><strong>${DEPT_LABEL[dept]}</strong> (${members.length}名)</td>
        <td class="numeric"><strong>${fmtYen(total)}</strong></td>
      </tr>
      ${memberRows}
    `;
  }).join('');

  const annualEstimate = grandTotal * 12;

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="cost-year-month" class="form-input" style="width:160px;">${monthOptions}</select>
      <div style="margin-left:auto;display:flex;gap:16px;flex-wrap:wrap;">
        <div class="kpi-card panel" style="padding:10px 16px;text-align:center;min-width:140px;">
          <p class="panel-title" style="font-size:11px;">月次人件費（概算）</p>
          <p class="kpi-value" style="font-size:22px;">${fmtYen(grandTotal)}</p>
        </div>
        <div class="kpi-card panel" style="padding:10px 16px;text-align:center;min-width:140px;">
          <p class="panel-title" style="font-size:11px;">年間概算（×12）</p>
          <p class="kpi-value" style="font-size:22px;">${fmtYen(annualEstimate)}</p>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>氏名 / 部門</th><th>種別</th><th>賃金設定</th><th class="numeric">月額（概算）</th></tr></thead>
        <tbody>${deptRows}</tbody>
        <tfoot>
          <tr style="font-weight:700;border-top:2px solid var(--border);">
            <td colspan="3">合計</td>
            <td class="numeric">${fmtYen(grandTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:8px;">※ パートは「時給 × 1日時間 × 月勤務日数」の概算。社員は月給固定。造りスタッフは稼働月のみカウント。</p>
  `;
}

// ── 月次シフトタブ ─────────────────────────────────────────────────────────────

function renderShiftTab(
  staff: StaffMember[],
  yearMonth: string,
  brewingSchedule: BrewingScheduleRow[],
  bottlingTargetQty: number   // その月の生産計画本数（0なら非表示）
): string {
  const [, m] = yearMonth.split('-').map(Number);
  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return `<option value="${ym}" ${ym === yearMonth ? 'selected' : ''}>${ym.replace('-', '年')}月</option>`;
  }).join('');

  // 醸造期間チェック
  const isBrewingMonth = brewingSchedule.some(s => {
    for (let i = 0; i < s.durationMonths; i++) {
      const month = ((s.brewMonth - 1 + i) % 12) + 1;
      if (month === m) return true;
    }
    return false;
  });

  // 部門別スタッフ
  const byDept = (dept: StaffDepartment) =>
    staff.filter(s => s.isActive && s.department === dept &&
      (!s.availableMonths || s.availableMonths.includes(m)));

  // 詰口・貼場: 日産本数から稼働日数と人数を計算
  const bottlingDays = bottlingTargetQty > 0
    ? Math.ceil(bottlingTargetQty / BOTTLING_MAX_DAILY)
    : null;

  function deptBlock(dept: StaffDepartment, members: StaffMember[], extraInfo?: string): string {
    if (members.length === 0) {
      return `<div class="panel" style="border-left:3px solid ${DEPT_COLOR[dept]};padding:12px 16px;margin-bottom:10px;">
        <p style="font-weight:700;color:${DEPT_COLOR[dept]};">${DEPT_LABEL[dept]}</p>
        <p style="color:var(--text-secondary);font-size:13px;">稼働予定スタッフなし${dept === 'brewing' && !isBrewingMonth ? '（醸造計画外の月）' : ''}</p>
      </div>`;
    }
    const memberList = members.map(s =>
      `<span style="display:inline-flex;align-items:center;gap:4px;background:var(--surface-alt);border-radius:14px;padding:2px 10px;font-size:13px;margin:2px;">
        <span style="width:6px;height:6px;border-radius:50%;background:${s.employmentType === 'employee' ? '#10b981' : '#f59e0b'};display:inline-block;"></span>
        ${s.name}
      </span>`
    ).join('');
    return `<div class="panel" style="border-left:3px solid ${DEPT_COLOR[dept]};padding:12px 16px;margin-bottom:10px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
        <p style="font-weight:700;color:${DEPT_COLOR[dept]};margin:0;">${DEPT_LABEL[dept]}</p>
        <span style="font-size:12px;color:var(--text-secondary);">${members.length}名</span>
        ${extraInfo ? `<span style="font-size:12px;color:var(--text-secondary);margin-left:auto;">${extraInfo}</span>` : ''}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:2px;">${memberList}</div>
    </div>`;
  }

  const bottlingExtra = bottlingTargetQty > 0
    ? `目標 ${bottlingTargetQty.toLocaleString('ja-JP')} 本 → 推定稼働 ${bottlingDays} 日（${BOTTLING_LINE_SIZE}名ライン）`
    : `生産計画と連動 (上限 ${BOTTLING_MAX_DAILY.toLocaleString('ja-JP')} 本/日・${BOTTLING_LINE_SIZE}名)`;

  const brewingExtra = isBrewingMonth ? '醸造計画期間内' : '醸造計画外の月';

  return `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="shift-year-month" class="form-input" style="width:160px;">${monthOptions}</select>
      <button class="button secondary small" data-action="shift-auto-generate" style="margin-left:auto;">
        ⚡ 醸造計画から自動生成
      </button>
    </div>

    <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">
      稼働月の設定に基づき、各スタッフの ${yearMonth.replace('-', '年')}月の配置予定を表示しています。
    </p>

    ${deptBlock('soumu',       byDept('soumu'))}
    ${deptBlock('route_sales', byDept('route_sales'))}
    ${deptBlock('brewing',     byDept('brewing'), brewingExtra)}
    ${deptBlock('bottling',    byDept('bottling'), bottlingExtra)}

    <div class="panel" style="background:var(--surface-alt);padding:12px 16px;margin-top:8px;">
      <p style="font-size:12px;color:var(--text-secondary);">
        🟢 社員 &nbsp; 🟡 パート &nbsp;｜&nbsp;
        稼働月が設定されているスタッフは対象月のみ表示されます。
        詳細なシフトカレンダーは「需要・生産計画」の生産カレンダータブで管理できます。
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
  bottlingTargetQty: number = 0
): string {
  const tabContent =
    activeTab === 'staff' ? renderStaffTab(staff, deptFilter) :
    activeTab === 'cost'  ? renderCostTab(staff, yearMonth) :
    renderShiftTab(staff, yearMonth, brewingSchedule, bottlingTargetQty);

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
