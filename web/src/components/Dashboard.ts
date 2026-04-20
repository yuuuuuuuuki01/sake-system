import type { PipelineMeta, SalesSummary, SalesAnalytics, Prospect, CalendarEvent, TourInquiry, SalesPeriod, SalesDayPoint } from "../api";
import { PROSPECT_STAGE_COLORS, PROSPECT_STAGE_LABELS } from "../api";

const PERIOD_LABELS: Record<SalesPeriod, string> = {
  today: "当日",
  month: "当月",
  "90days": "90日",
  year: "1年",
  all: "全期間",
  custom: "指定期間"
};

function shiftYear(isoDate: string, years: number): string {
  const d = new Date(isoDate);
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString();
}

function filterByPeriod(allDays: SalesDayPoint[], period: SalesPeriod, customRange?: { start: string; end: string }): SalesDayPoint[] {
  if (period === "all") return allDays;
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const cutoff = new Date(now);

  switch (period) {
    case "today":
      return allDays.filter((d) => d.date.slice(0, 10) === todayKey);
    case "month":
      return allDays.filter((d) => d.date.slice(0, 7) === todayKey.slice(0, 7));
    case "90days":
      cutoff.setDate(cutoff.getDate() - 90);
      return allDays.filter((d) => d.date >= cutoff.toISOString());
    case "year":
      cutoff.setFullYear(cutoff.getFullYear() - 1);
      return allDays.filter((d) => d.date >= cutoff.toISOString());
    case "custom":
      if (!customRange?.start || !customRange?.end) return allDays;
      return allDays.filter((d) => {
        const dateKey = d.date.slice(0, 10);
        return dateKey >= customRange.start && dateKey <= customRange.end;
      });
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function readNumericValue(source: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function formatMonthlyGrossMargin(analytics: SalesAnalytics | null): string {
  const rows = analytics?.productTotals;
  if (!rows || rows.length === 0) {
    return "―";
  }

  const weightedMargin = rows.reduce(
    (accumulator, row) => {
      const amount = readNumericValue(row as unknown as Record<string, unknown>, ["amount", "salesAmount"]);
      const marginRate = readNumericValue(row as unknown as Record<string, unknown>, ["marginRate", "grossMarginRate"]);

      if (amount === null || amount <= 0 || marginRate === null) {
        return accumulator;
      }

      return {
        weightedAmount: accumulator.weightedAmount + amount,
        weightedRate: accumulator.weightedRate + amount * marginRate
      };
    },
    { weightedAmount: 0, weightedRate: 0 }
  );

  if (weightedMargin.weightedAmount > 0) {
    return `${(weightedMargin.weightedRate / weightedMargin.weightedAmount).toFixed(1)}%`;
  }

  const totals = rows.reduce(
    (accumulator, row) => {
      const values = row as unknown as Record<string, unknown>;
      const amount = readNumericValue(values, ["amount", "salesAmount"]);
      const directGross = readNumericValue(values, ["grossProfit", "grossAmount", "margin"]);
      const cost = readNumericValue(values, ["costAmount", "cost", "costPrice"]);

      if (amount === null || amount <= 0) {
        return accumulator;
      }

      const gross = directGross ?? (cost !== null ? amount - cost : null);
      if (gross === null) {
        return accumulator;
      }

      return {
        sales: accumulator.sales + amount,
        gross: accumulator.gross + gross
      };
    },
    { sales: 0, gross: 0 }
  );

  return totals.sales > 0 ? `${((totals.gross / totals.sales) * 100).toFixed(1)}%` : "―";
}

function buildBars(dailySales: SalesSummary["dailySales"]): string {
  const width = 760;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...dailySales.map((point) => point.amount), 1);
  const step = plotWidth / dailySales.length;

  const bars = dailySales
    .map((point, index) => {
      const barHeight = (point.amount / maxValue) * plotHeight;
      const x = padding.left + index * step + 4;
      const y = padding.top + plotHeight - barHeight;
      const label = new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric" }).format(
        new Date(point.date)
      );
      return `
        <g>
          <rect x="${x}" y="${y}" width="${Math.max(step - 8, 8)}" height="${barHeight}" rx="4" fill="#0F5B8D" opacity="${0.58 + (index / dailySales.length) * 0.34}" />
          ${index % 5 === 0 ? `<text x="${x + 6}" y="${height - 8}" class="chart-axis">${label}</text>` : ""}
        </g>
      `;
    })
    .join("");

  const yAxis = [0, 0.25, 0.5, 0.75, 1]
    .map((ratio) => {
      const y = padding.top + plotHeight - plotHeight * ratio;
      const label = Math.round((maxValue * ratio) / 1000);
      return `
        <g>
          <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid" />
          <text x="6" y="${y + 4}" class="chart-axis">${label.toLocaleString("ja-JP")}千円</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${yAxis}
      ${bars}
    </svg>
  `;
}

export interface DashboardExtras {
  prospects: Prospect[];
  upcomingEvents: CalendarEvent[];
  tourInquiries: TourInquiry[];
  workflowOrdersCount: { new: number; picking: number; packed: number; shipped: number; total: number };
  lowStockCount: number;
  masterCounts?: { customers: number; products: number; suppliers: number; specialPrices: number };
}

export function renderDashboard(
  summary: SalesSummary,
  pipeline: PipelineMeta,
  analytics: SalesAnalytics | null,
  extras?: DashboardExtras,
  activePeriod: SalesPeriod = "month",
  customRange?: { start: string; end: string }
): string {
  const statusLabelMap = {
    success: "正常",
    warning: "注意",
    error: "異常",
    running: "実行中"
  };

  const filteredDays = filterByPeriod(summary.allDailySales, activePeriod, customRange);
  const periodTotal = filteredDays.reduce((s, d) => s + d.amount, 0);
  const periodBottles = filteredDays.reduce((s, d) => s + d.bottles, 0);
  const periodVolume = filteredDays.reduce((s, d) => s + d.volumeMl, 0);
  const periodDays = filteredDays.length;
  const avgPricePerBottle = periodBottles > 0 ? Math.round(periodTotal / periodBottles) : 0;
  const avgPricePerLiter = periodVolume > 0 ? Math.round(periodTotal / (periodVolume / 1000)) : 0;

  // 昨対比較: 同じ期間の前年データを抽出
  const lastYearDays = filteredDays.length > 0
    ? summary.allDailySales.filter((d) => {
        const currentStart = filteredDays[0]?.date ?? "";
        const currentEnd = filteredDays[filteredDays.length - 1]?.date ?? "";
        const lyStart = shiftYear(currentStart, -1);
        const lyEnd = shiftYear(currentEnd, -1);
        return d.date >= lyStart && d.date <= lyEnd;
      })
    : [];
  const lastYearTotal = lastYearDays.reduce((s, d) => s + d.amount, 0);
  const yoyDelta = lastYearTotal > 0 ? ((periodTotal - lastYearTotal) / lastYearTotal) * 100 : 0;
  const yoySign = yoyDelta > 0 ? "+" : "";

  const recentSalesRows = summary.salesRecords
    .slice(0, 10)
    .map(
      (record) => `
            <tr>
              <td class="mono">${record.documentNo}</td>
              <td>${formatDateTime(record.date)}</td>
              <td>${record.customerName}</td>
              <td class="numeric">${formatCurrency(record.amount)}</td>
            </tr>
          `
    )
    .join("");

  const periodButtons = (["today", "month", "90days", "year", "all"] as SalesPeriod[])
    .map((p) => `<button class="button ${p === activePeriod ? "primary" : "secondary"} small" type="button" data-period="${p}">${PERIOD_LABELS[p]}</button>`)
    .join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${pipeline.status}">${statusLabelMap[pipeline.status]}</span>
        <span class="meta-note">最終同期 ${formatDateTime(pipeline.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${periodButtons}</div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="range-start" class="range-input" />
        <span>〜</span>
        <input type="date" id="range-end" class="range-input" />
        <button class="button secondary small" type="button" data-action="apply-range">適用</button>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${formatCurrency(summary.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${summary.kpis.todayDelta > 0 ? "+" : ""}${summary.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">${PERIOD_LABELS[activePeriod]}売上</p>
        <p class="kpi-value">${formatCurrency(periodTotal)}</p>
        <p class="kpi-sub">${periodDays}日間${periodDays > 0 ? ` / 日平均 ${formatCurrency(Math.round(periodTotal / periodDays))}` : ""}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${yoyDelta >= 0 ? "#2f855a" : "#c53d3d"}">${lastYearTotal > 0 ? `${yoySign}${yoyDelta.toFixed(1)}%` : "―"}</p>
        <p class="kpi-sub">前年同期 ${lastYearTotal > 0 ? formatCurrency(lastYearTotal) : "データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${summary.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${formatCurrency(summary.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${formatMonthlyGrossMargin(analytics)}</p>
        <p class="kpi-sub">売上分析データから集計</p>
      </article>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${periodBottles.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${formatCurrency(avgPricePerBottle)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(periodVolume / 1000).toLocaleString("ja-JP", { maximumFractionDigits: 0 })} L</p>
        <p class="kpi-sub">L単価 ${formatCurrency(avgPricePerLiter)}</p>
      </article>
    </section>

    ${extras?.masterCounts ? `
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先マスタ</p>
        <p class="kpi-value">${extras.masterCounts.customers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品マスタ</p>
        <p class="kpi-value">${extras.masterCounts.products.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">仕入先</p>
        <p class="kpi-value">${extras.masterCounts.suppliers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
    </section>
    ` : ""}

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">${PERIOD_LABELS[activePeriod]} (${filteredDays.length}日分)</p>
          </div>
        </div>
        ${buildBars(filteredDays.length > 0 ? filteredDays : summary.dailySales)}
      </article>

      <aside class="panel sync-panel">
        <div>
          <div class="panel-header">
            <div>
              <h2>パイプライン状況</h2>
              <p class="panel-caption">データ同期の最新状態</p>
            </div>
          </div>
          <dl class="meta-list">
            <div>
              <dt>ジョブ</dt>
              <dd>${pipeline.jobName}</dd>
            </div>
            <div>
              <dt>最終同期</dt>
              <dd>${formatDateTime(pipeline.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${formatDateTime(pipeline.generatedAt)}</dd>
            </div>
          </dl>
        </div>
        <div class="sync-panel-bottom">
          <p class="sync-message">${pipeline.message}</p>
          <div class="quick-links">
            <div class="panel-header">
              <div>
                <h2>クイックリンク</h2>
                <p class="panel-caption">よく使う業務画面へ移動</p>
              </div>
            </div>
            <div class="quick-link-grid">
              <button class="button secondary" type="button" data-link="/invoice-entry">伝票入力</button>
              <button class="button secondary" type="button" data-link="/delivery">納品書</button>
              <button class="button secondary" type="button" data-link="/billing">月次請求</button>
            </div>
          </div>
        </div>
      </aside>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>直近の取引</h2>
          <p class="panel-caption">最新10件の売上伝票</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>伝票番号</th>
              <th>日付</th>
              <th>得意先</th>
              <th class="numeric">金額</th>
            </tr>
          </thead>
          <tbody>${recentSalesRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${PERIOD_LABELS[activePeriod]} — 売上・本数・液体量・単価</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th class="numeric">売上</th>
              <th class="numeric">本数</th>
              <th class="numeric">液体量(L)</th>
              <th class="numeric">本単価</th>
              <th class="numeric">L単価</th>
            </tr>
          </thead>
          <tbody>${filteredDays.slice().reverse().slice(0, 31).map((d) => `
            <tr>
              <td class="mono">${d.date.slice(0, 10)}</td>
              <td class="numeric">${formatCurrency(d.amount)}</td>
              <td class="numeric">${d.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(d.volumeMl / 1000).toLocaleString("ja-JP", { maximumFractionDigits: 0 })}</td>
              <td class="numeric">${formatCurrency(d.pricePerBottle)}</td>
              <td class="numeric">${formatCurrency(d.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </section>

    ${extras ? renderExtraWidgets(extras) : ""}

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>機能要望・フィードバック</h2>
          <p class="panel-caption">改善のご要望やバグ報告をお寄せください</p>
        </div>
      </div>
      <form id="feature-request-form" class="feature-form">
        <div class="form-row">
          <label for="fr-title">タイトル</label>
          <input type="text" id="fr-title" placeholder="要望の概要" required />
        </div>
        <div class="form-row">
          <label for="fr-category">カテゴリ</label>
          <select id="fr-category">
            <option value="feature">機能追加</option>
            <option value="improvement">改善</option>
            <option value="bug">バグ報告</option>
            <option value="question">質問</option>
          </select>
        </div>
        <div class="form-row">
          <label for="fr-description">詳細</label>
          <textarea id="fr-description" rows="3" placeholder="具体的な内容"></textarea>
        </div>
        <button type="submit" class="button primary">送信</button>
        <span id="fr-result" class="fr-result"></span>
      </form>
    </section>
  `;
}

function renderExtraWidgets(extras: DashboardExtras): string {
  // 新規営業パイプライン
  const pipelineTotal = extras.prospects.reduce((s, p) => s + (p.expectedAmount * p.probability) / 100, 0);
  const hotProspects = extras.prospects.filter((p) => p.stage === "hot" || p.stage === "negotiating").length;
  // 今日/直近の予定
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = extras.upcomingEvents
    .filter((e) => e.startsAt.slice(0, 10) >= today)
    .slice(0, 5);
  // 未対応 見学問合せ
  const newTourInquiries = extras.tourInquiries.filter((i) => i.status === "new").length;

  return `
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">受注処理中</p>
        <p class="kpi-value">${extras.workflowOrdersCount.new + extras.workflowOrdersCount.picking + extras.workflowOrdersCount.packed}件</p>
        <p class="kpi-sub">新規 ${extras.workflowOrdersCount.new} / ピッキング ${extras.workflowOrdersCount.picking} / 梱包 ${extras.workflowOrdersCount.packed}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規営業</p>
        <p class="kpi-value">¥${Math.round(pipelineTotal).toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">${extras.prospects.length}件 / ホット ${hotProspects}</p>
      </article>
      <article class="panel kpi-card ${newTourInquiries > 0 ? "kpi-alert" : ""}">
        <p class="panel-title">未対応問合せ</p>
        <p class="kpi-value">${newTourInquiries}件</p>
        <p class="kpi-sub">蔵見学申込</p>
      </article>
      <article class="panel kpi-card ${extras.lowStockCount > 0 ? "kpi-alert" : ""}">
        <p class="panel-title">低在庫</p>
        <p class="kpi-value">${extras.lowStockCount}品目</p>
        <p class="kpi-sub">要補充</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div><h2>🎯 営業パイプライン</h2><p class="panel-caption">ステージ別件数</p></div>
          <button class="button secondary" data-link="/prospects">詳細を見る</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));gap:8px;">
          ${(["cold", "warm", "hot", "contacted", "negotiating", "won"] as const)
            .map((stage) => {
              const count = extras.prospects.filter((p) => p.stage === stage).length;
              const amount = extras.prospects.filter((p) => p.stage === stage).reduce((s, p) => s + p.expectedAmount, 0);
              return `
              <div style="background:${PROSPECT_STAGE_COLORS[stage]};color:white;padding:12px;border-radius:6px;text-align:center;">
                <div style="font-size:11px;">${PROSPECT_STAGE_LABELS[stage]}</div>
                <div style="font-size:20px;font-weight:700;margin:4px 0;">${count}</div>
                <div style="font-size:10px;opacity:0.9;">¥${(amount / 10000).toFixed(0)}万</div>
              </div>
            `;
            })
            .join("")}
        </div>
      </article>

      <aside class="panel">
        <div class="panel-header">
          <div><h2>📅 直近の予定</h2></div>
          <button class="button secondary" data-link="/calendar">カレンダー</button>
        </div>
        ${
          upcoming.length === 0
            ? '<p class="empty-note">予定なし</p>'
            : `<div style="display:grid;gap:8px;">${upcoming
                .map((e) => {
                  const d = new Date(e.startsAt);
                  return `
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${e.color || "#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${d.getMonth() + 1}/${d.getDate()} ${e.isAllDay ? "終日" : d.toTimeString().slice(0, 5)}</div>
                  <div style="font-weight:700;">${e.title}</div>
                  ${e.location ? `<div style="font-size:11px;color:var(--text-secondary);">📍 ${e.location}</div>` : ""}
                </div>`;
                })
                .join("")}</div>`
        }
      </aside>
    </section>
  `;
}
