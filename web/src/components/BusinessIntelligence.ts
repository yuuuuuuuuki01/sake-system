import type { ProductPower, CustomerEfficiency, ProductDailyRow } from "../api";
import { makeSortableHeader, applySortToRows, type SortState } from "../utils/tableSort";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

function rankBadge(rank: string): string {
  const colors: Record<string, string> = { A: "#2f855a", B: "#2b6cb0", C: "#b7791f" };
  return `<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${colors[rank] || "#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${rank}</span>`;
}

function growthLabel(rate: number | null): string {
  if (rate == null) return `<span style="color:#9aa5b1;">―</span>`;
  const color = rate >= 0 ? "#2f855a" : "#c53d3d";
  return `<span style="color:${color};font-weight:700;">${rate >= 0 ? "+" : ""}${rate.toFixed(1)}%</span>`;
}

function rankChange(current: string, prev: string): string {
  if (!prev || current === prev) return "";
  const up = current < prev;
  return up
    ? `<span style="color:#2f855a;font-size:11px;">&#x2191;${prev}&#x2192;${current}</span>`
    : `<span style="color:#c53d3d;font-size:11px;">&#x2193;${prev}&#x2192;${current}</span>`;
}

export type ProductViewFilter = "all" | "A" | "B" | "C" | "growing" | "declining";
export type ProductPeriod = "week" | "month" | "90days" | "year" | "custom";

interface AggregatedProduct {
  code: string; name: string; volumeMl: number | null;
  amount: number; qty: number; sharePct: number; rank: string;
  prevAmount: number; growthRate: number | null;
}

function aggregateByPeriod(
  daily: ProductDailyRow[],
  startDate: string,
  endDate: string,
  prevStartDate: string,
  prevEndDate: string
): AggregatedProduct[] {
  // 現期間集計
  const current = new Map<string, { name: string; vol: number | null; amt: number; qty: number }>();
  const prev = new Map<string, number>();

  for (const r of daily) {
    if (r.date >= startDate && r.date <= endDate) {
      const existing = current.get(r.productCode);
      if (existing) {
        existing.amt += r.amount;
        existing.qty += r.qty;
      } else {
        current.set(r.productCode, { name: r.productName, vol: r.volumeMl, amt: r.amount, qty: r.qty });
      }
    }
    if (r.date >= prevStartDate && r.date <= prevEndDate) {
      prev.set(r.productCode, (prev.get(r.productCode) ?? 0) + r.amount);
    }
  }

  // ソートして構成比計算
  const sorted = [...current.entries()]
    .map(([code, d]) => ({ code, ...d }))
    .sort((a, b) => b.amt - a.amt);

  const total = sorted.reduce((s, p) => s + p.amt, 0);
  let cumulative = 0;

  return sorted.map((p) => {
    cumulative += p.amt;
    const sharePct = total > 0 ? Math.round(p.amt * 10000 / total) / 100 : 0;
    const rank = cumulative <= total * 0.7 ? "A" : cumulative <= total * 0.9 ? "B" : "C";
    const prevAmt = prev.get(p.code) ?? 0;
    const growthRate = prevAmt > 0 ? Math.round(((p.amt - prevAmt) / prevAmt) * 1000) / 10 : null;
    return {
      code: p.code, name: p.name, volumeMl: p.vol,
      amount: p.amt, qty: p.qty, sharePct, rank,
      prevAmount: prevAmt, growthRate
    };
  });
}

function calcDates(period: ProductPeriod, customStart?: string, customEnd?: string): { start: string; end: string; prevStart: string; prevEnd: string; label: string } {
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  let start = todayKey, end = todayKey, label = "";

  switch (period) {
    case "week": {
      const d = new Date(now); d.setDate(d.getDate() - 7);
      start = d.toISOString().slice(0, 10); end = todayKey; label = "直近7日間";
      break;
    }
    case "month": {
      start = todayKey.slice(0, 7) + "-01"; end = todayKey; label = "当月";
      break;
    }
    case "90days": {
      const d = new Date(now); d.setDate(d.getDate() - 90);
      start = d.toISOString().slice(0, 10); end = todayKey; label = "直近90日間";
      break;
    }
    case "year": {
      const d = new Date(now); d.setFullYear(d.getFullYear() - 1);
      start = d.toISOString().slice(0, 10); end = todayKey; label = "直近1年間";
      break;
    }
    case "custom": {
      start = customStart || todayKey; end = customEnd || todayKey;
      label = `${start} 〜 ${end}`;
      break;
    }
  }

  // 前年同期間
  const sDate = new Date(start); sDate.setFullYear(sDate.getFullYear() - 1);
  const eDate = new Date(end); eDate.setFullYear(eDate.getFullYear() - 1);
  return { start, end, prevStart: sDate.toISOString().slice(0, 10), prevEnd: eDate.toISOString().slice(0, 10), label };
}

export function renderProductPower(
  _staticProducts: ProductPower[],
  activeFilter: ProductViewFilter = "all",
  daily: ProductDailyRow[] = [],
  period: ProductPeriod = "year",
  customStart?: string,
  customEnd?: string,
  sortState: SortState = []
): string {
  const dates = calcDates(period, customStart, customEnd);
  const products = daily.length > 0
    ? aggregateByPeriod(daily, dates.start, dates.end, dates.prevStart, dates.prevEnd)
    : _staticProducts.map((p) => ({
        code: p.code, name: p.name, volumeMl: p.volumeMl,
        amount: p.yearAmount, qty: p.yearQty, sharePct: p.sharePct,
        rank: p.rank, prevAmount: p.prevAmount, growthRate: p.growthRate
      }));

  const aCount = products.filter((p) => p.rank === "A").length;
  const bCount = products.filter((p) => p.rank === "B").length;
  const cCount = products.filter((p) => p.rank === "C").length;
  const growing = products.filter((p) => p.growthRate != null && p.growthRate > 10);
  const declining = products.filter((p) => p.growthRate != null && p.growthRate < -10);

  let filtered = products;
  let filterLabel = "全商品";
  switch (activeFilter) {
    case "A": filtered = products.filter((p) => p.rank === "A"); filterLabel = "Aランク"; break;
    case "B": filtered = products.filter((p) => p.rank === "B"); filterLabel = "Bランク"; break;
    case "C": filtered = products.filter((p) => p.rank === "C"); filterLabel = "Cランク"; break;
    case "growing": filtered = growing; filterLabel = "成長商品(+10%以上)"; break;
    case "declining": filtered = declining; filterLabel = "衰退商品(-10%以下)"; break;
  }

  const filterBtn = (key: ProductViewFilter, label: string, count: number) =>
    `<button class="button ${activeFilter === key ? "primary" : "secondary"} small" data-product-filter="${key}">${label} (${count})</button>`;

  const periodBtn = (key: ProductPeriod, label: string) =>
    `<button class="button ${period === key ? "primary" : "secondary"} small" data-product-period="${key}">${label}</button>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${periodBtn("week", "週次")}
        ${periodBtn("month", "月次")}
        ${periodBtn("90days", "90日")}
        ${periodBtn("year", "年間")}
        ${periodBtn("custom", "指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${customStart || ""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${customEnd || ""}" />
        <button class="button secondary small" type="button" data-action="pp-apply-range">適用</button>
        <span style="color:var(--text-secondary);font-size:13px;margin-left:8px;">${dates.label}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${aCount} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">Bランク（70-90%）</p>
        <p class="kpi-value">${bCount} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${growing.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${declining.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${filterLabel} (${filtered.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${filterBtn("all", "全て", products.length)}
        ${filterBtn("A", "A", aCount)}
        ${filterBtn("B", "B", bCount)}
        ${filterBtn("C", "C", cCount)}
        ${filterBtn("growing", "成長", growing.length)}
        ${filterBtn("declining", "衰退", declining.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${makeSortableHeader("rank", "ABC", sortState)}
              ${makeSortableHeader("name", "商品名", sortState)}
              ${makeSortableHeader("amount", "売上", sortState, "numeric")}
              ${makeSortableHeader("sharePct", "構成比", sortState, "numeric")}
              ${makeSortableHeader("qty", "本数", sortState, "numeric")}
              ${makeSortableHeader("growthRate", "前年同期比", sortState, "numeric")}
            </tr>
          </thead>
          <tbody>
            ${applySortToRows(filtered, sortState, {
              rank: "rank", name: "name", amount: "amount", sharePct: "sharePct", qty: "qty", growthRate: "growthRate"
            }).slice(0, 100).map((p) => `
              <tr>
                <td>${rankBadge(p.rank)}</td>
                <td>${p.name ? p.name.slice(0, 25) : p.code}${p.volumeMl ? ` <small>${p.volumeMl}ml</small>` : ""}</td>
                <td class="numeric">${formatCurrency(p.amount)}</td>
                <td class="numeric">${p.sharePct}%</td>
                <td class="numeric">${p.qty.toLocaleString()}</td>
                <td class="numeric">${growthLabel(p.growthRate)}</td>
              </tr>
            `).join("")}
            ${filtered.length === 0 ? `<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>` : ""}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

export function renderCustomerEfficiency(customers: CustomerEfficiency[], sortState: SortState = []): string {
  const aCount = customers.filter((c) => c.currentRank === "A").length;
  const upgraded = customers.filter((c) => c.prevRank && c.currentRank < c.prevRank).length;
  const downgraded = customers.filter((c) => c.prevRank && c.currentRank > c.prevRank).length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>営業効率分析</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${aCount} 社</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${upgraded} 社</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${downgraded} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先ABC分析（年間売上構成比）</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${makeSortableHeader("currentRank", "ABC", sortState)}
              ${makeSortableHeader("name", "得意先名", sortState)}
              ${makeSortableHeader("yearAmount", "年間売上", sortState, "numeric")}
              ${makeSortableHeader("sharePct", "構成比", sortState, "numeric")}
              ${makeSortableHeader("orderDays", "受注日数", sortState, "numeric")}
              ${makeSortableHeader("growthRate", "前年比", sortState, "numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${applySortToRows(customers, sortState, {
              currentRank: "currentRank", name: "name", yearAmount: "yearAmount", sharePct: "sharePct", orderDays: "orderDays", growthRate: "growthRate"
            }).slice(0, 50).map((c) => `
              <tr>
                <td>${rankBadge(c.currentRank)}</td>
                <td>${c.name || c.code}</td>
                <td class="numeric">${formatCurrency(c.yearAmount)}</td>
                <td class="numeric">${c.sharePct}%</td>
                <td class="numeric">${c.orderDays}日</td>
                <td class="numeric">${growthLabel(c.growthRate)}</td>
                <td>${rankChange(c.currentRank, c.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}
