/* ─────────────────────────────────────────────
   営業アクション — 既存顧客ケア
   離反リスク / 休眠 / 売上下落中
   ───────────────────────────────────────────── */

export interface ChurnCustomer {
  code: string;
  name: string;
  businessType: string;
  areaCode: string;
  phone: string;
  lastOrderDate: string;
  daysSinceLastOrder: number;
  totalAmountLast12m: number;
  amount3m: number;
  amountThisMonth: number;
  amountLastYearSameMonth: number;
  annualRevenue: number;
  yoyRatio: number; // 前年同月比 (0〜1)
  status: "at-risk" | "dormant" | "declining";
}

export interface ChurnAlertData {
  atRiskCustomers: ChurnCustomer[];   // 前年同月に注文あり、今月なし（最優先）
  dormantCustomers: ChurnCustomer[];  // 12ヶ月以内注文あり、3ヶ月以上空白
  decliningCustomers: ChurnCustomer[]; // 前年同月比80%未満（休眠・離反以外）
}

// ── Helpers ─────────────────────────────────

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 10_000) return `${Math.round(amount / 10_000)}万`;
  return new Intl.NumberFormat("ja-JP").format(amount) + "円";
}

function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

// ── Data Builder from DB rows ────────────────

export function buildChurnAlertFromRows(rows: Array<{
  customer_code: string;
  customer_name: string;
  business_type: string;
  area_code: string;
  phone: string;
  last_order_date: string;
  days_since_order: number;
  amount_12m: number;
  amount_3m: number;
  amount_this_month: number;
  amount_last_year_same_month: number;
  annual_revenue: number;
  is_dormant: boolean;
  is_at_risk: boolean;
}>): ChurnAlertData {
  const atRiskCustomers: ChurnCustomer[] = [];
  const dormantCustomers: ChurnCustomer[] = [];
  const decliningCustomers: ChurnCustomer[] = [];

  for (const r of rows) {
    const yoyRatio = r.amount_last_year_same_month > 0
      ? r.amount_this_month / r.amount_last_year_same_month
      : 1;

    const base: ChurnCustomer = {
      code: r.customer_code,
      name: r.customer_name,
      businessType: r.business_type,
      areaCode: r.area_code,
      phone: r.phone,
      lastOrderDate: r.last_order_date,
      daysSinceLastOrder: r.days_since_order,
      totalAmountLast12m: r.amount_12m,
      amount3m: r.amount_3m,
      amountThisMonth: r.amount_this_month,
      amountLastYearSameMonth: r.amount_last_year_same_month,
      annualRevenue: r.annual_revenue,
      yoyRatio,
      status: "dormant"
    };

    if (r.is_at_risk) {
      atRiskCustomers.push({ ...base, status: "at-risk" });
    } else if (r.is_dormant) {
      dormantCustomers.push({ ...base, status: "dormant" });
    } else if (r.amount_last_year_same_month > 0 && yoyRatio < 0.8) {
      decliningCustomers.push({ ...base, status: "declining" });
    }
  }

  // 離反リスク: 年間売上の大きい順
  atRiskCustomers.sort((a, b) => b.totalAmountLast12m - a.totalAmountLast12m);
  // 休眠: 経過日数の長い順
  dormantCustomers.sort((a, b) => b.daysSinceLastOrder - a.daysSinceLastOrder);
  // 下落中: 前年同月比の低い順（落ち幅が大きい順）
  decliningCustomers.sort((a, b) => a.yoyRatio - b.yoyRatio);

  return { atRiskCustomers, dormantCustomers, decliningCustomers };
}

// ── Render ──────────────────────────────────

function renderCustomerRow(c: ChurnCustomer): string {
  const statusConf = {
    "at-risk": { label: "離反リスク", cls: "danger" },
    "dormant":  { label: "休眠",       cls: "warning" },
    "declining":{ label: "下落中",     cls: "info" }
  }[c.status];

  const yoyCell = c.status === "declining" && c.amount_last_year_same_month > 0
    ? `<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(c.yoyRatio * 100)}%</td>`
    : c.status === "dormant"
      ? `<td class="numeric" style="color:var(--color-warning);">${c.daysSinceLastOrder}日</td>`
      : `<td class="numeric" style="color:var(--color-danger);">今月未注文</td>`;

  return `
    <tr data-status="${c.status}" data-area="${c.areaCode}" data-biz="${c.businessType}">
      <td><span class="status-pill ${statusConf.cls}">${statusConf.label}</span></td>
      <td>${c.name}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${c.areaCode}</td>
      <td style="font-size:0.8rem;">${c.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${c.lastOrderDate}</td>
      ${yoyCell}
      <td class="numeric">${formatCurrency(c.totalAmountLast12m)}</td>
      <td><a href="tel:${c.phone}" class="button secondary small" style="white-space:nowrap;">${c.phone || "—"}</a></td>
    </tr>`;
}

function renderSection(
  id: string,
  title: string,
  subtitle: string,
  badgeCls: string,
  customers: ChurnCustomer[],
  impactAmount: number,
  thLabel: string
): string {
  if (customers.length === 0) return "";
  const rows = customers.map(renderCustomerRow).join("");

  return `
    <section class="panel" id="${id}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${badgeCls}" style="margin-right:8px;">${customers.length}社</span>${title}</h2>
          <p class="panel-caption">${subtitle} — 対象売上合計: ${formatCurrencyFull(impactAmount)}</p>
        </div>
      </div>
      <div class="table-wrap">
        <table class="churn-table" data-section="${id}">
          <thead>
            <tr>
              <th>区分</th>
              <th data-sort="name">得意先名</th>
              <th>エリア</th>
              <th>業種</th>
              <th data-sort="lastOrderDate">最終注文日</th>
              <th class="numeric">${thLabel}</th>
              <th class="numeric" data-sort="amount12m">12ヶ月売上</th>
              <th>電話</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`;
}

export function renderChurnAlert(data: ChurnAlertData): string {
  const { atRiskCustomers, dormantCustomers, decliningCustomers } = data;
  const totalAlert = atRiskCustomers.length + dormantCustomers.length + decliningCustomers.length;

  const atRiskImpact = atRiskCustomers.reduce((s, c) => s + c.totalAmountLast12m, 0);
  const dormantImpact = dormantCustomers.reduce((s, c) => s + c.totalAmountLast12m, 0);
  const decliningImpact = decliningCustomers.reduce((s, c) => s + c.totalAmountLast12m, 0);
  const totalImpact = atRiskImpact + dormantImpact + decliningImpact;

  const allCustomers = [...atRiskCustomers, ...dormantCustomers, ...decliningCustomers];
  const areas = [...new Set(allCustomers.map((c) => c.areaCode).filter(Boolean))].sort();
  const bizTypes = [...new Set(allCustomers.map((c) => c.businessType).filter(Boolean))].sort();

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">既存顧客ケア</p>
        <h1>営業アクション</h1>
        <p class="meta-note">離反・休眠・売上下落の顧客を早期に把握し、フォローに活かします。</p>
      </div>
    </section>

    <section class="kpi-grid">
      <div class="kpi-card" style="border-top:3px solid var(--color-danger);">
        <div class="kpi-label">🔴 離反リスク</div>
        <div class="kpi-value">${atRiskCustomers.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-danger);">${formatCurrency(atRiskImpact)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${dormantCustomers.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${formatCurrency(dormantImpact)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${decliningCustomers.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #718096;">
        <div class="kpi-label">合計 対応必要</div>
        <div class="kpi-value">${totalAlert}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend">${formatCurrency(totalImpact)} リスク</div>
      </div>
    </section>

    <div class="button-group" style="margin-bottom:8px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${totalAlert})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${atRiskCustomers.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${dormantCustomers.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${decliningCustomers.length})</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${areas.map((a) => `<option value="${a}">${a}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${bizTypes.map((b) => `<option value="${b}">${b}</option>`).join("")}
      </select>
    </div>

    ${renderSection("at-risk", "離反リスク", "前年同月に注文があったが今月まだない顧客", "danger", atRiskCustomers, atRiskImpact, "状況")}
    ${renderSection("dormant", "休眠顧客", "12ヶ月以内に注文があったが3ヶ月以上空白がある顧客", "warning", dormantCustomers, dormantImpact, "経過日数")}
    ${renderSection("declining", "売上下落中", "前年同月比80%未満の顧客（離反・休眠を除く）", "info", decliningCustomers, decliningImpact, "前年同月比")}

    <script type="module">
      (function () {
        let activeFilter = "all";

        function applyFilters() {
          const area = document.getElementById("churn-filter-area")?.value || "";
          const biz  = document.getElementById("churn-filter-biz")?.value  || "";

          document.querySelectorAll(".churn-table tbody tr").forEach((row) => {
            const status = row.getAttribute("data-status") || "";
            const rowArea = row.getAttribute("data-area") || "";
            const rowBiz  = row.getAttribute("data-biz")  || "";
            const matchFilter = activeFilter === "all" || status === activeFilter;
            const matchArea   = !area || rowArea === area;
            const matchBiz    = !biz  || rowBiz  === biz;
            row.style.display = matchFilter && matchArea && matchBiz ? "" : "none";
          });

          // セクション単位で全行が非表示なら section も隠す
          ["at-risk", "dormant", "declining"].forEach((sec) => {
            const section = document.getElementById(sec + "-section");
            if (!section) return;
            const visible = section.querySelectorAll("tbody tr:not([style*='none'])").length;
            section.style.display = (activeFilter === "all" || activeFilter === sec) ? "" : "none";
          });

          document.querySelectorAll("[data-churn-filter]").forEach((btn) => {
            btn.classList.toggle("primary", btn.getAttribute("data-churn-filter") === activeFilter);
            btn.classList.toggle("secondary", btn.getAttribute("data-churn-filter") !== activeFilter);
          });
        }

        document.querySelectorAll("[data-churn-filter]").forEach((btn) => {
          btn.addEventListener("click", () => {
            activeFilter = btn.getAttribute("data-churn-filter") || "all";
            applyFilters();
          });
        });

        document.getElementById("churn-filter-area")?.addEventListener("change", applyFilters);
        document.getElementById("churn-filter-biz")?.addEventListener("change",  applyFilters);

        // 列ソート
        document.querySelectorAll(".churn-table th[data-sort]").forEach((th) => {
          th.style.cursor = "pointer";
          th.addEventListener("click", () => {
            const table = th.closest("table");
            const tbody = table?.querySelector("tbody");
            if (!tbody) return;
            const colIdx = Array.from(th.parentElement.children).indexOf(th);
            const asc = th.getAttribute("data-asc") !== "1";
            th.setAttribute("data-asc", asc ? "1" : "0");
            const rows = Array.from(tbody.querySelectorAll("tr"));
            rows.sort((a, b) => {
              const at = a.children[colIdx]?.textContent?.trim() ?? "";
              const bt = b.children[colIdx]?.textContent?.trim() ?? "";
              const an = parseFloat(at.replace(/[^0-9.-]/g, ""));
              const bn = parseFloat(bt.replace(/[^0-9.-]/g, ""));
              if (!isNaN(an) && !isNaN(bn)) return asc ? an - bn : bn - an;
              return asc ? at.localeCompare(bt, "ja") : bt.localeCompare(at, "ja");
            });
            rows.forEach((r) => tbody.appendChild(r));
          });
        });

        applyFilters();
      })();
    </script>`;
}
