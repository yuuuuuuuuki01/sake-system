import type { ProductPower, CustomerEfficiency } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

function rankBadge(rank: string): string {
  const colors: Record<string, string> = { A: "#2f855a", B: "#2b6cb0", C: "#b7791f", D: "#9aa5b1" };
  return `<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${colors[rank] || "#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${rank}</span>`;
}

function growthLabel(rate: number | null): string {
  if (rate == null) return `<span style="color:#9aa5b1;">新規</span>`;
  const color = rate >= 0 ? "#2f855a" : "#c53d3d";
  return `<span style="color:${color};font-weight:700;">${rate >= 0 ? "+" : ""}${rate.toFixed(1)}%</span>`;
}

function rankChange(current: string, prev: string): string {
  if (current === prev) return "";
  const up = current < prev; // A < B alphabetically = upgrade
  return up
    ? `<span style="color:#2f855a;font-size:11px;">↑${prev}→${current}</span>`
    : `<span style="color:#c53d3d;font-size:11px;">↓${prev}→${current}</span>`;
}

export function renderProductPower(products: ProductPower[]): string {
  const rankCounts = { A: 0, B: 0, C: 0, D: 0 };
  const growing = products.filter((p) => p.growthRate != null && p.growthRate > 10).length;
  const declining = products.filter((p) => p.growthRate != null && p.growthRate < -10).length;
  products.forEach((p) => { rankCounts[p.rank as keyof typeof rankCounts]++; });

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク</p>
        <p class="kpi-value">${rankCounts.A}</p>
        <p class="kpi-sub">50万円以上/3ヶ月</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${growing}</p>
        <p class="kpi-sub">前年比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${declining}</p>
        <p class="kpi-sub">前年比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>商品ランキング（直近3ヶ月）</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ランク</th>
              <th>商品名</th>
              <th class="numeric">売上</th>
              <th class="numeric">本数</th>
              <th class="numeric">前年比</th>
            </tr>
          </thead>
          <tbody>
            ${products.slice(0, 50).map((p) => `
              <tr>
                <td>${rankBadge(p.rank)}</td>
                <td>${p.name ? p.name.slice(0, 25) : p.code}${p.volumeMl ? ` <small>${p.volumeMl}ml</small>` : ""}</td>
                <td class="numeric">${formatCurrency(p.recentAmount)}</td>
                <td class="numeric">${p.recentQty.toLocaleString()}</td>
                <td class="numeric">${growthLabel(p.growthRate)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

export function renderCustomerEfficiency(customers: CustomerEfficiency[]): string {
  const rankCounts = { A: 0, B: 0, C: 0, D: 0 };
  const upgraded = customers.filter((c) => c.currentRank < c.prevRank).length;
  const downgraded = customers.filter((c) => c.currentRank > c.prevRank && c.prevRank !== "D").length;
  customers.forEach((c) => { rankCounts[c.currentRank as keyof typeof rankCounts]++; });

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>営業効率分析</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク得意先</p>
        <p class="kpi-value">${rankCounts.A}</p>
        <p class="kpi-sub">50万円以上/3ヶ月</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${upgraded}</p>
        <p class="kpi-sub">前年よりランク上昇</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${downgraded}</p>
        <p class="kpi-sub">前年よりランク低下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先ランキング（直近3ヶ月）</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ランク</th>
              <th>得意先名</th>
              <th class="numeric">売上</th>
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
                <td class="numeric">${formatCurrency(c.recentAmount)}</td>
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
