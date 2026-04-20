import type { ProductPower, CustomerEfficiency } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

function rankBadge(rank: string): string {
  const colors: Record<string, string> = { A: "#2f855a", B: "#2b6cb0", C: "#b7791f" };
  return `<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${colors[rank] || "#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${rank}</span>`;
}

function growthLabel(rate: number | null): string {
  if (rate == null) return `<span style="color:#9aa5b1;">新規</span>`;
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

export function renderProductPower(products: ProductPower[], activeFilter: ProductViewFilter = "all"): string {
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

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
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
        <p class="kpi-sub">前年比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${declining.length}</p>
        <p class="kpi-sub">前年比-10%以下</p>
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
              <th>ABC</th>
              <th>商品名</th>
              <th class="numeric">年間売上</th>
              <th class="numeric">構成比</th>
              <th class="numeric">本数</th>
              <th class="numeric">前年比</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.slice(0, 100).map((p) => `
              <tr>
                <td>${rankBadge(p.rank)}</td>
                <td>${p.name ? p.name.slice(0, 25) : p.code}${p.volumeMl ? ` <small>${p.volumeMl}ml</small>` : ""}</td>
                <td class="numeric">${formatCurrency(p.yearAmount)}</td>
                <td class="numeric">${p.sharePct}%</td>
                <td class="numeric">${p.yearQty.toLocaleString()}</td>
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

export function renderCustomerEfficiency(customers: CustomerEfficiency[]): string {
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
              <th>ABC</th>
              <th>得意先名</th>
              <th class="numeric">年間売上</th>
              <th class="numeric">構成比</th>
              <th class="numeric">受注日数</th>
              <th class="numeric">前年比</th>
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${customers.slice(0, 50).map((c) => `
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
