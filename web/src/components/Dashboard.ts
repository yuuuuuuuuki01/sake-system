import type { PipelineMeta, SalesSummary } from "../api";

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

export function renderDashboard(summary: SalesSummary, pipeline: PipelineMeta): string {
  const statusLabelMap = {
    success: "正常",
    warning: "注意",
    error: "異常",
    running: "実行中"
  };

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${pipeline.status}">${statusLabelMap[pipeline.status]}</span>
        <span class="meta-note">最終同期 ${formatDateTime(pipeline.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${formatCurrency(summary.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${summary.kpis.todayDelta > 0 ? "+" : ""}${summary.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${formatCurrency(summary.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${summary.kpis.monthDelta > 0 ? "+" : ""}${summary.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${summary.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${formatCurrency(summary.kpis.unpaidAmount)}</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">直近30日の売上推移</p>
          </div>
        </div>
        ${buildBars(summary.dailySales)}
      </article>

      <aside class="panel sync-panel">
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
        <p class="sync-message">${pipeline.message}</p>
      </aside>
    </section>
  `;
}
