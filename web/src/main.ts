import {
  fetchCustomerLedger,
  fetchInvoices,
  fetchMasterStats,
  fetchPaymentStatus,
  fetchPipelineMeta,
  fetchSalesAnalytics,
  fetchSalesSummary,
  type AnalyticsTab,
  type CustomerLedgerSummary,
  type InvoiceFilter,
  type InvoiceRecord,
  type MasterStatsSummary,
  type MasterTab,
  type PaymentStatusSummary,
  type PipelineMeta,
  type SalesAnalytics,
  type SalesSummary
} from "./api";
import { renderCustomerLedger } from "./components/CustomerLedger";
import { renderDashboard } from "./components/Dashboard";
import { renderInvoiceSearch } from "./components/InvoiceSearch";
import { renderMasterStats } from "./components/MasterStats";
import { renderPaymentStatus } from "./components/PaymentStatus";
import { renderSalesAnalytics } from "./components/SalesAnalytics";
import { renderSalesTable } from "./components/SalesTable";
import "./styles/main.css";

type RoutePath = "/" | "/sales" | "/payment" | "/master" | "/invoice" | "/ledger" | "/analytics";

interface AppState {
  salesSummary: SalesSummary | null;
  paymentStatus: PaymentStatusSummary | null;
  masterStats: MasterStatsSummary | null;
  pipelineMeta: PipelineMeta | null;
  invoiceRecords: InvoiceRecord[];
  ledgerSummary: CustomerLedgerSummary | null;
  salesAnalytics: SalesAnalytics | null;
  route: RoutePath;
  salesFilter: {
    startDate: string;
    endDate: string;
  };
  invoiceFilter: InvoiceFilter;
  ledgerCode: string;
  masterTab: MasterTab;
  analyticsTab: AnalyticsTab;
  loading: boolean;
  error: string | null;
}

const state: AppState = {
  salesSummary: null,
  paymentStatus: null,
  masterStats: null,
  pipelineMeta: null,
  invoiceRecords: [],
  ledgerSummary: null,
  salesAnalytics: null,
  route: normalizePath(location.pathname),
  salesFilter: {
    startDate: "",
    endDate: ""
  },
  invoiceFilter: {
    docNo: "",
    customerCode: "",
    startDate: "",
    endDate: ""
  },
  ledgerCode: "",
  masterTab: "customers",
  analyticsTab: "products",
  loading: true,
  error: null
};

function normalizePath(pathname: string): RoutePath {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;
  const normalized = pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
  if (
    normalized === "/sales" ||
    normalized === "/payment" ||
    normalized === "/master" ||
    normalized === "/invoice" ||
    normalized === "/ledger" ||
    normalized === "/analytics"
  ) {
    return normalized;
  }
  return "/";
}

function formatDateInput(value: string): string {
  return value.slice(0, 10);
}

function filterSalesRecords(summary: SalesSummary): SalesSummary["salesRecords"] {
  const start = state.salesFilter.startDate ? new Date(state.salesFilter.startDate) : null;
  const end = state.salesFilter.endDate ? new Date(`${state.salesFilter.endDate}T23:59:59`) : null;

  return [...summary.salesRecords]
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .filter((record) => {
      const recordDate = new Date(record.date);
      if (start && recordDate < start) {
        return false;
      }
      if (end && recordDate > end) {
        return false;
      }
      return true;
    });
}

function navigate(path: RoutePath): void {
  const target = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path === "/" ? "/" : path}`;
  history.pushState(null, "", target);
  state.route = path;
  renderApp();
}

function renderView(): string {
  if (state.loading) {
    return `<section class="panel"><p>データを読み込んでいます。</p></section>`;
  }

  if (state.error) {
    return `
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${state.error}</p>
      </section>
    `;
  }

  if (
    !state.salesSummary ||
    !state.paymentStatus ||
    !state.masterStats ||
    !state.pipelineMeta ||
    !state.salesAnalytics
  ) {
    return "";
  }

  switch (state.route) {
    case "/invoice":
      return renderInvoiceSearch(state.invoiceRecords, state.invoiceFilter);
    case "/ledger":
      return renderCustomerLedger(state.ledgerSummary, state.ledgerCode);
    case "/analytics":
      return renderSalesAnalytics(state.salesAnalytics, state.analyticsTab);
    case "/sales":
      return renderSalesTable(
        filterSalesRecords(state.salesSummary),
        state.salesFilter.startDate,
        state.salesFilter.endDate
      );
    case "/payment":
      return renderPaymentStatus(
        [...state.paymentStatus.records].sort(
          (left, right) => right.balanceAmount - left.balanceAmount
        )
      );
    case "/master":
      return renderMasterStats(state.masterStats, state.masterTab);
    case "/":
    default:
      return renderDashboard(state.salesSummary, state.pipelineMeta);
  }
}

function renderShell(): string {
  const navItems: Array<{ path: RoutePath; label: string; kicker: string }> = [
    { path: "/", label: "ダッシュボード", kicker: "Summary" },
    { path: "/sales", label: "売上一覧", kicker: "Sales" },
    { path: "/payment", label: "入金状況", kicker: "Payment" },
    { path: "/master", label: "マスタ", kicker: "Master" },
    { path: "/invoice", label: "伝票照会", kicker: "Invoice" },
    { path: "/ledger", label: "得意先台帳", kicker: "Ledger" },
    { path: "/analytics", label: "売上分析", kicker: "Analytics" }
  ];

  return `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>売上・入金・マスタの確認を一画面で。</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          ${navItems
            .map(
              (item) => `
                <a href="${import.meta.env.BASE_URL.replace(/\/$/, "")}${item.path === "/" ? "/" : item.path}" class="nav-link ${state.route === item.path ? "active" : ""}" data-link="${item.path}">
                  <div>
                    <div class="nav-kicker">${item.kicker}</div>
                    <div class="nav-label">${item.label}</div>
                  </div>
                </a>
              `
            )
            .join("")}
        </nav>
      </aside>
      <main class="main">
        <div class="view">${renderView()}</div>
      </main>
    </div>
  `;
}

function bindEvents(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>("[data-link]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      navigate(element.dataset.link as RoutePath);
    });
  });

  root
    .querySelector<HTMLButtonElement>("[data-action='invoice-filter']")
    ?.addEventListener("click", async () => {
      const nextFilter: InvoiceFilter = {
        docNo: root.querySelector<HTMLInputElement>("#invoice-docno")?.value ?? "",
        customerCode: root.querySelector<HTMLInputElement>("#invoice-customer")?.value ?? "",
        startDate: root.querySelector<HTMLInputElement>("#invoice-start")?.value ?? "",
        endDate: root.querySelector<HTMLInputElement>("#invoice-end")?.value ?? ""
      };
      state.invoiceFilter = nextFilter;
      state.loading = true;
      renderApp();
      try {
        state.invoiceRecords = await fetchInvoices(nextFilter);
        state.error = null;
      } catch (error) {
        state.error = error instanceof Error ? error.message : "伝票データの取得に失敗しました。";
      } finally {
        state.loading = false;
        renderApp();
      }
    });

  root
    .querySelector<HTMLButtonElement>("[data-action='ledger-search']")
    ?.addEventListener("click", async () => {
      const code = root.querySelector<HTMLInputElement>("#ledger-code")?.value ?? "";
      state.ledgerCode = code;
      state.loading = true;
      renderApp();
      try {
        state.ledgerSummary = await fetchCustomerLedger(code);
        state.error = null;
      } catch (error) {
        state.error =
          error instanceof Error ? error.message : "得意先台帳データの取得に失敗しました。";
      } finally {
        state.loading = false;
        renderApp();
      }
    });

  root
    .querySelector<HTMLButtonElement>("[data-action='sales-filter']")
    ?.addEventListener("click", () => {
      const start = root.querySelector<HTMLInputElement>("#sales-start")?.value ?? "";
      const end = root.querySelector<HTMLInputElement>("#sales-end")?.value ?? "";
      state.salesFilter = { startDate: start, endDate: end };
      renderApp();
    });

  root.querySelectorAll<HTMLButtonElement>("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.masterTab = button.dataset.tab as MasterTab;
      renderApp();
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-analytics-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.analyticsTab = button.dataset.analyticsTab as AnalyticsTab;
      renderApp();
    });
  });
}

function renderApp(): void {
  const app = document.querySelector<HTMLElement>("#app");
  if (!app) {
    return;
  }
  app.innerHTML = renderShell();
  bindEvents(app);
}

async function loadData(): Promise<void> {
  state.loading = true;
  renderApp();
  try {
    const [salesSummary, paymentStatus, masterStats, pipelineMeta, invoiceRecords, salesAnalytics] =
      await Promise.all([
      fetchSalesSummary(),
      fetchPaymentStatus(),
      fetchMasterStats(),
      fetchPipelineMeta(),
      fetchInvoices(state.invoiceFilter),
      fetchSalesAnalytics()
    ]);
    state.salesSummary = salesSummary;
    state.paymentStatus = paymentStatus;
    state.masterStats = masterStats;
    state.pipelineMeta = pipelineMeta;
    state.invoiceRecords = invoiceRecords;
    state.salesAnalytics = salesAnalytics;
    if (!state.salesFilter.startDate || !state.salesFilter.endDate) {
      const sortedRecords = [...salesSummary.salesRecords].sort(
        (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime()
      );
      const latestDate = sortedRecords[0]?.date ?? new Date().toISOString();
      const latest = new Date(latestDate);
      const earliest = new Date(latest);
      earliest.setDate(latest.getDate() - 30);
      state.salesFilter = {
        startDate: formatDateInput(earliest.toISOString()),
        endDate: formatDateInput(latest.toISOString())
      };
    }
    state.error = null;
  } catch (error) {
    state.error = error instanceof Error ? error.message : "データの取得に失敗しました。";
  } finally {
    state.loading = false;
    renderApp();
  }
}

window.addEventListener("popstate", () => {
  state.route = normalizePath(location.pathname);
  renderApp();
});

void loadData();
