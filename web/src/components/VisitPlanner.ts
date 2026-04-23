/**
 * 訪問計画 / ルート最適化 (Visit Route Planner)
 * Prioritizes customer visits based on churn risk, seasonal proposals,
 * regular route cadence, and revenue weight. Groups by area for route efficiency.
 */

// ---------- Interfaces ----------

export interface VisitCandidate {
  code: string;
  name: string;
  phone: string;
  address: string;
  areaCode: string;
  businessType: string;
  priorityScore: number;
  reasons: string[];
  lastOrderDate: string;
  daysSinceOrder: number;
  annualRevenue: number;
  recommendedAction: string;
}

export interface DayPlan {
  dayLabel: string;
  area: string;
  visits: VisitCandidate[];
}

export interface VisitPlannerState {
  candidates: VisitCandidate[];
  weekPlan: DayPlan[];
  filterArea: string;
  filterMinScore: number;
}

// ---------- Input type ----------

export interface CustomerInput {
  code: string;
  name: string;
  phone: string;
  address1: string;
  areaCode: string;
  businessType: string;
  annualRevenue: number;
  lastOrderDate: string;
  hasSeasonalProposal: boolean;
}

// ---------- Helpers ----------

const JPY = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

const DAYS_OF_WEEK = ["月", "火", "水", "木", "金"];
const MAX_VISITS_PER_DAY = 6;

function daysBetween(dateStr: string, now: Date): number {
  if (!dateStr) return 9999;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 9999;
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function revenuePercentile(revenue: number, allRevenues: number[]): number {
  if (allRevenues.length === 0) return 0;
  const sorted = [...allRevenues].sort((a, b) => a - b);
  const rank = sorted.filter((r) => r <= revenue).length;
  return rank / sorted.length;
}

function recommendAction(reasons: string[], daysSince: number): string {
  if (reasons.includes("離反リスク")) {
    return "緊急訪問 - 離反防止ヒアリング";
  }
  if (reasons.includes("季節提案タイミング")) {
    return "季節商品の提案・試飲サンプル持参";
  }
  if (daysSince > 30) {
    return "定期巡回 - 状況確認・追加注文確認";
  }
  return "関係維持 - ご挨拶";
}

// ---------- Core Logic ----------

export function buildVisitPlan(customers: CustomerInput[]): VisitPlannerState {
  const now = new Date();
  const allRevenues = customers.map((c) => c.annualRevenue);

  // Score each customer
  const candidates: VisitCandidate[] = customers
    .map((c) => {
      const daysSince = daysBetween(c.lastOrderDate, now);
      let score = 0;
      const reasons: string[] = [];

      // 離反リスク: hasn't ordered in 60+ days
      if (daysSince >= 60) {
        score += 50;
        reasons.push("離反リスク");
      }

      // 季節提案タイミング
      if (c.hasSeasonalProposal) {
        score += 30;
        reasons.push("季節提案タイミング");
      }

      // 定期巡回: hasn't been visited in 30+ days (approximated by order date)
      if (daysSince >= 30 && daysSince < 60) {
        score += 20;
        reasons.push("定期巡回");
      }

      // 金額ウェイト: 0-20 based on revenue percentile
      const pct = revenuePercentile(c.annualRevenue, allRevenues);
      const revenuePoints = Math.round(pct * 20);
      if (revenuePoints > 0) {
        score += revenuePoints;
        reasons.push("金額ウェイト");
      }

      const recommendedAction = recommendAction(reasons, daysSince);

      return {
        code: c.code,
        name: c.name,
        phone: c.phone,
        address: c.address1,
        areaCode: c.areaCode,
        businessType: c.businessType,
        priorityScore: score,
        reasons,
        lastOrderDate: c.lastOrderDate,
        daysSinceOrder: daysSince,
        annualRevenue: c.annualRevenue,
        recommendedAction,
      };
    })
    .filter((c) => c.priorityScore > 0)
    .sort((a, b) => b.priorityScore - a.priorityScore);

  // Group by area for weekly plan
  const areaGroups = new Map<string, VisitCandidate[]>();
  for (const c of candidates) {
    const area = c.areaCode || "その他";
    if (!areaGroups.has(area)) areaGroups.set(area, []);
    areaGroups.get(area)!.push(c);
  }

  // Sort areas by total priority (highest first)
  const sortedAreas = [...areaGroups.entries()].sort(
    (a, b) =>
      b[1].reduce((s, v) => s + v.priorityScore, 0) -
      a[1].reduce((s, v) => s + v.priorityScore, 0)
  );

  // Distribute areas across days of the week
  const weekPlan: DayPlan[] = [];
  let dayIndex = 0;

  for (const [area, visits] of sortedAreas) {
    // Split large area groups into chunks of MAX_VISITS_PER_DAY
    const sorted = visits.sort((a, b) => b.priorityScore - a.priorityScore);
    for (let i = 0; i < sorted.length; i += MAX_VISITS_PER_DAY) {
      if (dayIndex >= DAYS_OF_WEEK.length) break;
      const chunk = sorted.slice(i, i + MAX_VISITS_PER_DAY);
      weekPlan.push({
        dayLabel: DAYS_OF_WEEK[dayIndex],
        area,
        visits: chunk,
      });
      dayIndex++;
    }
    if (dayIndex >= DAYS_OF_WEEK.length) break;
  }

  return {
    candidates,
    weekPlan,
    filterArea: "",
    filterMinScore: 0,
  };
}

// ---------- Render ----------

export function renderVisitPlanner(state: VisitPlannerState): string {
  const { candidates, weekPlan, filterArea, filterMinScore } = state;

  // Apply filters
  const filtered = candidates.filter((c) => {
    if (filterArea && c.areaCode !== filterArea) return false;
    if (filterMinScore > 0 && c.priorityScore < filterMinScore) return false;
    return true;
  });

  // Unique areas for filter dropdown
  const areas = Array.from(new Set(candidates.map((c) => c.areaCode))).sort();

  // KPI summary
  const totalCandidates = filtered.length;
  const highPriority = filtered.filter((c) => c.priorityScore >= 50).length;
  const churnRisk = filtered.filter((c) => c.reasons.includes("離反リスク")).length;
  const weeklyVisits = weekPlan.reduce((s, d) => s + d.visits.length, 0);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">営業支援</p>
        <h1>訪問計画 / ルート最適化</h1>
      </div>
    </section>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">${totalCandidates}</div>
        <div>訪問候補</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${highPriority}</div>
        <div>高優先度 (50+)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${churnRisk}</div>
        <div>離反リスク</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${weeklyVisits}</div>
        <div>今週予定</div>
      </div>
    </div>

    <section class="panel">
      <h2 class="panel-title">フィルター</h2>
      <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;padding:0.5rem 0;">
        <label>
          エリア:
          <select data-action="visit-filter-area">
            <option value="">全エリア</option>
            ${areas.map((a) => `<option value="${a}"${filterArea === a ? " selected" : ""}>${a}</option>`).join("")}
          </select>
        </label>
        <label>
          最低スコア:
          <input type="number" min="0" max="100" step="10" value="${filterMinScore}" data-action="visit-filter-score" style="width:5rem;" />
        </label>
        <button class="button" data-action="visit-apply-filter">絞り込み</button>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">週間訪問プラン</h2>
      ${weekPlan.length === 0 ? "<p>訪問候補がありません。</p>" : renderWeekPlan(weekPlan)}
    </section>

    <section class="panel">
      <h2 class="panel-title">訪問候補一覧（優先度順）</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>優先度</th>
              <th>取引先</th>
              <th>エリア</th>
              <th>理由</th>
              <th>最終受注</th>
              <th>年間売上</th>
              <th>推奨アクション</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map((c) => renderCandidateRow(c)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderWeekPlan(weekPlan: DayPlan[]): string {
  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1rem;">
      ${weekPlan
        .map(
          (day) => `
        <div class="kpi-card" style="text-align:left;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <strong>${day.dayLabel}曜日</strong>
            <span class="status-pill">${day.area}</span>
          </div>
          <div style="font-size:0.85rem;">
            ${day.visits
              .map(
                (v) => `
              <div style="padding:0.25rem 0;border-bottom:1px solid var(--border, #eee);">
                <span class="mono">${v.priorityScore}</span>
                ${v.name}
              </div>
            `
              )
              .join("")}
          </div>
          <div style="margin-top:0.5rem;font-size:0.75rem;color:var(--muted, #888);">
            ${day.visits.length}件
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function renderCandidateRow(c: VisitCandidate): string {
  const scoreBadge =
    c.priorityScore >= 50
      ? "background:var(--danger, #fee);color:var(--danger-fg, #c00);"
      : c.priorityScore >= 30
        ? "background:var(--warning, #fff3cd);color:var(--warning-fg, #856404);"
        : "";

  return `
    <tr>
      <td>
        <span class="status-pill" style="${scoreBadge}">
          <span class="numeric">${c.priorityScore}</span>
        </span>
      </td>
      <td>
        <div>${c.name}</div>
        <div class="mono" style="font-size:0.75rem;">${c.code}</div>
      </td>
      <td>${c.areaCode}</td>
      <td>${c.reasons.map((r) => `<span class="status-pill">${r}</span>`).join(" ")}</td>
      <td class="mono">${c.lastOrderDate || "—"}<br/><span style="font-size:0.75rem;">(${c.daysSinceOrder === 9999 ? "—" : c.daysSinceOrder + "日前"})</span></td>
      <td class="numeric">${JPY.format(c.annualRevenue)}</td>
      <td>${c.recommendedAction}</td>
    </tr>
  `;
}
