/* ─────────────────────────────────────────────
   離反アラート / 休眠顧客検知
   ───────────────────────────────────────────── */

// ── Interfaces ──────────────────────────────

export interface ChurnCustomer {
  code: string;
  name: string;
  businessType: string;
  areaCode: string;
  phone: string;
  lastOrderDate: string;
  daysSinceLastOrder: number;
  totalAmountLast12m: number;
  status: "dormant" | "at-risk";
}

export interface ChurnAlertData {
  dormantCustomers: ChurnCustomer[]; // ordered 12mo ago but not last 3mo
  atRiskCustomers: ChurnCustomer[];  // ordered same month last year but not this month
}

// ── Helpers ─────────────────────────────────

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor(Math.abs(b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function statusLabel(status: "dormant" | "at-risk"): string {
  return status === "dormant" ? "休眠" : "離反リスク";
}

function statusClass(status: "dormant" | "at-risk"): string {
  return status === "dormant" ? "warning" : "danger";
}

// ── Data Builder ────────────────────────────

export function buildChurnAlertData(
  headers: Array<{
    sales_date: string;
    legacy_customer_code: string;
    customer_name: string;
    total_amount: number;
  }>,
  customers: Array<{
    code: string;
    name: string;
    businessType: string;
    areaCode: string;
    phone: string;
  }>
): ChurnAlertData {
  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const twelveMonthsAgo = new Date(today);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  // Same month last year
  const sameMonthLastYear = new Date(today);
  sameMonthLastYear.setFullYear(sameMonthLastYear.getFullYear() - 1);
  const sameMonthLastYearStart = new Date(sameMonthLastYear.getFullYear(), sameMonthLastYear.getMonth(), 1);
  const sameMonthLastYearEnd = new Date(sameMonthLastYear.getFullYear(), sameMonthLastYear.getMonth() + 1, 0);

  // This month
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // Customer lookup map
  const customerMap = new Map(customers.map((c) => [c.code, c]));

  // Group headers by customer
  const customerOrders = new Map<string, typeof headers>();
  for (const h of headers) {
    if (!h.legacy_customer_code) continue;
    const list = customerOrders.get(h.legacy_customer_code) || [];
    list.push(h);
    customerOrders.set(h.legacy_customer_code, list);
  }

  const dormantCustomers: ChurnCustomer[] = [];
  const atRiskCustomers: ChurnCustomer[] = [];
  const seen = new Set<string>();

  for (const [code, orders] of customerOrders.entries()) {
    const cust = customerMap.get(code);
    const name = cust?.name || (orders[0]?.customer_name ?? code);

    // Determine date boundaries
    let lastOrderDate: Date | null = null;
    let totalLast12m = 0;
    let orderedInLast3m = false;
    let orderedInLast12m = false;
    let orderedSameMonthLastYear = false;
    let orderedThisMonth = false;

    for (const o of orders) {
      const d = new Date(o.sales_date);
      if (!lastOrderDate || d > lastOrderDate) lastOrderDate = d;

      if (d >= twelveMonthsAgo) {
        orderedInLast12m = true;
        totalLast12m += o.total_amount;
      }
      if (d >= threeMonthsAgo) {
        orderedInLast3m = true;
      }
      if (d >= sameMonthLastYearStart && d <= sameMonthLastYearEnd) {
        orderedSameMonthLastYear = true;
      }
      if (d >= thisMonthStart) {
        orderedThisMonth = true;
      }
    }

    if (!lastOrderDate) continue;

    const base: ChurnCustomer = {
      code,
      name,
      businessType: cust?.businessType ?? "",
      areaCode: cust?.areaCode ?? "",
      phone: cust?.phone ?? "",
      lastOrderDate: lastOrderDate.toISOString().slice(0, 10),
      daysSinceLastOrder: daysBetween(lastOrderDate, today),
      totalAmountLast12m: totalLast12m,
      status: "dormant"
    };

    // Dormant: ordered in past 12m but NOT in last 3m
    if (orderedInLast12m && !orderedInLast3m) {
      dormantCustomers.push({ ...base, status: "dormant" });
      seen.add(code);
    }

    // At-risk: ordered same month last year but not this month
    if (orderedSameMonthLastYear && !orderedThisMonth && !seen.has(code)) {
      atRiskCustomers.push({ ...base, status: "at-risk" });
    }
  }

  // Sort by days since last order desc
  dormantCustomers.sort((a, b) => b.daysSinceLastOrder - a.daysSinceLastOrder);
  atRiskCustomers.sort((a, b) => b.totalAmountLast12m - a.totalAmountLast12m);

  return { dormantCustomers, atRiskCustomers };
}

// ── Render ──────────────────────────────────

export function renderChurnAlert(data: ChurnAlertData): string {
  const allCustomers = [...data.dormantCustomers, ...data.atRiskCustomers];
  const dormantCount = data.dormantCustomers.length;
  const atRiskCount = data.atRiskCustomers.length;
  const dormantRevenue = data.dormantCustomers.reduce((s, c) => s + c.totalAmountLast12m, 0);

  const tableRows = allCustomers
    .map(
      (c) => `
        <tr data-status="${c.status}" data-area="${c.areaCode}" data-biz="${c.businessType}">
          <td class="mono">${c.code}</td>
          <td>${c.name}</td>
          <td>${c.businessType}</td>
          <td>${c.areaCode}</td>
          <td class="mono">${c.lastOrderDate}</td>
          <td class="numeric">${c.daysSinceLastOrder}日</td>
          <td class="numeric">${formatCurrency(c.totalAmountLast12m)}</td>
          <td><span class="status-pill ${statusClass(c.status)}">${statusLabel(c.status)}</span></td>
        </tr>
      `
    )
    .join("");

  // Unique values for filters
  const areas = [...new Set(allCustomers.map((c) => c.areaCode).filter(Boolean))].sort();
  const bizTypes = [...new Set(allCustomers.map((c) => c.businessType).filter(Boolean))].sort();

  const areaOptions = areas.map((a) => `<option value="${a}">${a}</option>`).join("");
  const bizOptions = bizTypes.map((b) => `<option value="${b}">${b}</option>`).join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">顧客維持</p>
        <h1>離反アラート / 休眠顧客検知</h1>
      </div>
    </section>

    <section class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">休眠顧客数</div>
        <div class="kpi-value">${dormantCount}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">離反リスク数</div>
        <div class="kpi-value">${atRiskCount}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">休眠顧客の前年売上合計</div>
        <div class="kpi-value">${formatCurrency(dormantRevenue)}</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2 class="panel-title">顧客一覧</h2>
        <div class="panel-actions" id="churn-filters">
          <select id="churn-filter-status" class="input-sm">
            <option value="">ステータス: すべて</option>
            <option value="dormant">休眠</option>
            <option value="at-risk">離反リスク</option>
          </select>
          <select id="churn-filter-area" class="input-sm">
            <option value="">エリア: すべて</option>
            ${areaOptions}
          </select>
          <select id="churn-filter-biz" class="input-sm">
            <option value="">業種: すべて</option>
            ${bizOptions}
          </select>
        </div>
      </div>
      <div class="table-wrap">
        <table id="churn-table">
          <thead>
            <tr>
              <th data-sort="code">得意先コード</th>
              <th data-sort="name">得意先名</th>
              <th data-sort="businessType">業種</th>
              <th data-sort="areaCode">エリア</th>
              <th data-sort="lastOrderDate">最終注文日</th>
              <th data-sort="daysSinceLastOrder" class="numeric">経過日数</th>
              <th data-sort="totalAmountLast12m" class="numeric">12ヶ月売上</th>
              <th data-sort="status">ステータス</th>
            </tr>
          </thead>
          <tbody id="churn-tbody">
            ${tableRows}
          </tbody>
        </table>
      </div>
    </section>

    <script type="module">
      (function () {
        const table = document.getElementById("churn-table");
        const tbody = document.getElementById("churn-tbody");
        if (!table || !tbody) return;

        // ── Sorting ──
        let sortKey = "";
        let sortAsc = true;

        table.querySelectorAll("th[data-sort]").forEach((th) => {
          th.style.cursor = "pointer";
          th.addEventListener("click", () => {
            const key = th.getAttribute("data-sort");
            if (sortKey === key) {
              sortAsc = !sortAsc;
            } else {
              sortKey = key;
              sortAsc = true;
            }
            sortTable();
          });
        });

        function sortTable() {
          const rows = Array.from(tbody.querySelectorAll("tr"));
          const colIndex = Array.from(table.querySelectorAll("th[data-sort]"))
            .findIndex((th) => th.getAttribute("data-sort") === sortKey);
          if (colIndex < 0) return;

          rows.sort((a, b) => {
            const aText = a.children[colIndex]?.textContent?.trim() ?? "";
            const bText = b.children[colIndex]?.textContent?.trim() ?? "";
            const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ""));
            const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ""));
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return sortAsc ? aNum - bNum : bNum - aNum;
            }
            return sortAsc ? aText.localeCompare(bText, "ja") : bText.localeCompare(aText, "ja");
          });

          rows.forEach((r) => tbody.appendChild(r));
        }

        // ── Filtering ──
        const filterStatus = document.getElementById("churn-filter-status");
        const filterArea = document.getElementById("churn-filter-area");
        const filterBiz = document.getElementById("churn-filter-biz");

        function applyFilters() {
          const status = filterStatus?.value || "";
          const area = filterArea?.value || "";
          const biz = filterBiz?.value || "";

          tbody.querySelectorAll("tr").forEach((row) => {
            const matchStatus = !status || row.getAttribute("data-status") === status;
            const matchArea = !area || row.getAttribute("data-area") === area;
            const matchBiz = !biz || row.getAttribute("data-biz") === biz;
            row.style.display = matchStatus && matchArea && matchBiz ? "" : "none";
          });
        }

        filterStatus?.addEventListener("change", applyFilters);
        filterArea?.addEventListener("change", applyFilters);
        filterBiz?.addEventListener("change", applyFilters);
      })();
    </script>
  `;
}
