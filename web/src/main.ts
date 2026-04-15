import {
  fetchBillingSummary,
  fetchBillList,
  fetchCustomerLedger,
  fetchDeliveryNote,
  fetchInvoices,
  fetchJikomiList,
  fetchKenteiList,
  fetchMasterStats,
  fetchMaterialList,
  fetchPayableList,
  fetchPaymentStatus,
  fetchPipelineMeta,
  fetchPurchaseList,
  fetchRawMaterialStock,
  fetchSalesAnalytics,
  fetchSalesReport,
  fetchSalesSummary,
  fetchStoreSales,
  fetchStoreOrders,
  fetchTankList,
  fetchTaxDeclaration,
  saveInvoice,
  type AnalyticsTab,
  type BillingSummary,
  type BillRecord,
  type CustomerLedger,
  type DeliveryNote,
  type InvoiceFilter,
  type InvoiceFormData,
  type InvoiceRecord,
  type JikomiRecord,
  type KenteiRecord,
  type MasterStatsSummary,
  type MasterTab,
  type MaterialRecord,
  type PayableRecord,
  type PaymentStatusSummary,
  type PipelineMeta,
  type PurchaseRecord,
  type RawMaterialStock,
  type SalesAnalytics,
  type SalesReport,
  type SalesSummary,
  type StoreSale,
  type StoreOrder,
  type TankRecord,
  type TaxDeclaration
} from "./api";
import { renderBilling } from "./components/Billing";
import { renderCustomerLedger } from "./components/CustomerLedger";
import { renderDashboard } from "./components/Dashboard";
import { renderDeliveryNote } from "./components/DeliveryNote";
import { renderInvoiceEntry } from "./components/InvoiceEntry";
import { renderInvoiceSearch } from "./components/InvoiceSearch";
import { renderJikomi } from "./components/Jikomi";
import { renderKentei } from "./components/Kentei";
import { renderMasterStats } from "./components/MasterStats";
import { renderMaterials } from "./components/Materials";
import { renderPaymentStatus } from "./components/PaymentStatus";
import { renderPurchase } from "./components/Purchase";
import { renderRawMaterial } from "./components/RawMaterial";
import { renderRelaySetup } from "./components/RelaySetup";
import { renderSalesAnalytics } from "./components/SalesAnalytics";
import { renderSalesReport } from "./components/SalesReport";
import { renderSalesTable } from "./components/SalesTable";
import { renderStorePOS } from "./components/StorePOS";
import { renderTankList } from "./components/TankList";
import { renderTaxDeclaration } from "./components/TaxDeclaration";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase";
import "./styles/main.css";

type RoutePath =
  | "/"
  | "/sales"
  | "/payment"
  | "/master"
  | "/invoice"
  | "/ledger"
  | "/analytics"
  | "/invoice-entry"
  | "/delivery"
  | "/billing"
  | "/report"
  | "/jikomi"
  | "/tanks"
  | "/kentei"
  | "/materials"
  | "/purchase"
  | "/raw-material"
  | "/tax"
  | "/store"
  | "/setup";

const ALL_ROUTES: RoutePath[] = [
  "/",
  "/sales",
  "/payment",
  "/master",
  "/invoice",
  "/ledger",
  "/analytics",
  "/invoice-entry",
  "/delivery",
  "/billing",
  "/report",
  "/jikomi",
  "/tanks",
  "/kentei",
  "/materials",
  "/purchase",
  "/raw-material",
  "/tax",
  "/store",
  "/setup"
];

function makeDefaultInvoiceForm(): InvoiceFormData {
  return {
    invoiceType: "sales",
    invoiceDate: new Date().toISOString().slice(0, 10),
    customerCode: "",
    customerName: "",
    staffCode: "",
    lines: [],
    note: ""
  };
}

const now = new Date();
const defaultYearMonth = now.toISOString().slice(0, 7);
const defaultTaxYear = now.getFullYear();
const defaultTaxMonth = now.getMonth() + 1;
const defaultStoreDate = now.toISOString().slice(0, 10);

interface AppState {
  // core data
  salesSummary: SalesSummary | null;
  paymentStatus: PaymentStatusSummary | null;
  masterStats: MasterStatsSummary | null;
  pipelineMeta: PipelineMeta | null;
  invoiceRecords: InvoiceRecord[];
  customerLedger: CustomerLedger | null;
  salesAnalytics: SalesAnalytics | null;
  // 販売
  invoiceForm: InvoiceFormData;
  invoiceSaving: boolean;
  invoiceSavedDocNo: string | null;
  deliveryNote: DeliveryNote | null;
  deliverySearchDocNo: string;
  billingSummary: BillingSummary | null;
  billingYearMonth: string;
  salesReport: SalesReport | null;
  // 蔵内
  jikomiList: JikomiRecord[];
  tankList: TankRecord[];
  kenteiList: KenteiRecord[];
  materialList: MaterialRecord[];
  // 仕入
  purchaseList: PurchaseRecord[];
  payableList: PayableRecord[];
  billList: BillRecord[];
  rawStockList: RawMaterialStock[];
  // 税務
  taxDeclaration: TaxDeclaration | null;
  taxYear: number;
  taxMonth: number;
  // 店舗
  storeSales: StoreSale[];
  storeOrders: StoreOrder[];
  storeTab: "pos" | "orders";
  storeSalesDate: string;
  // ui
  route: RoutePath;
  salesFilter: { startDate: string; endDate: string };
  invoiceFilter: InvoiceFilter;
  ledgerCustomerCode: string;
  masterTab: MasterTab;
  analyticsTab: AnalyticsTab;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
}

const defaultLedgerCustomerCode = "C0011";

const state: AppState = {
  salesSummary: null,
  paymentStatus: null,
  masterStats: null,
  pipelineMeta: null,
  invoiceRecords: [],
  customerLedger: null,
  salesAnalytics: null,
  invoiceForm: makeDefaultInvoiceForm(),
  invoiceSaving: false,
  invoiceSavedDocNo: null,
  deliveryNote: null,
  deliverySearchDocNo: "",
  billingSummary: null,
  billingYearMonth: defaultYearMonth,
  salesReport: null,
  jikomiList: [],
  tankList: [],
  kenteiList: [],
  materialList: [],
  purchaseList: [],
  payableList: [],
  billList: [],
  rawStockList: [],
  taxDeclaration: null,
  taxYear: defaultTaxYear,
  taxMonth: defaultTaxMonth,
  storeSales: [],
  storeOrders: [],
  storeTab: "pos",
  storeSalesDate: defaultStoreDate,
  route: normalizePath(location.pathname),
  salesFilter: { startDate: "", endDate: "" },
  invoiceFilter: { documentNo: "", startDate: "", endDate: "", customerCode: "" },
  ledgerCustomerCode: defaultLedgerCustomerCode,
  masterTab: "customers",
  analyticsTab: "products",
  loading: true,
  actionLoading: false,
  error: null
};

function normalizePath(pathname: string): RoutePath {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;
  const normalized = pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
  if ((ALL_ROUTES as string[]).includes(normalized)) {
    return normalized as RoutePath;
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
      if (start && recordDate < start) return false;
      if (end && recordDate > end) return false;
      return true;
    });
}

function navigate(path: RoutePath): void {
  const target = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path === "/" ? "/" : path}`;
  history.pushState(null, "", target);
  state.route = path;
  void loadRouteData(path);
}

async function loadRouteData(route: RoutePath): Promise<void> {
  state.actionLoading = true;
  renderApp();
  try {
    switch (route) {
      case "/delivery":
        if (!state.deliveryNote) {
          state.deliveryNote = await fetchDeliveryNote(state.deliverySearchDocNo || "D240122");
        }
        break;
      case "/billing":
        if (!state.billingSummary) {
          state.billingSummary = await fetchBillingSummary(state.billingYearMonth);
        }
        break;
      case "/report":
        if (!state.salesReport) {
          state.salesReport = await fetchSalesReport();
        }
        break;
      case "/jikomi":
        if (state.jikomiList.length === 0) {
          state.jikomiList = await fetchJikomiList();
        }
        break;
      case "/tanks":
        if (state.tankList.length === 0) {
          state.tankList = await fetchTankList();
        }
        break;
      case "/kentei":
        if (state.kenteiList.length === 0) {
          state.kenteiList = await fetchKenteiList();
        }
        break;
      case "/materials":
        if (state.materialList.length === 0) {
          state.materialList = await fetchMaterialList();
        }
        break;
      case "/purchase":
        if (state.purchaseList.length === 0 || state.payableList.length === 0) {
          [state.purchaseList, state.payableList] = await Promise.all([
            fetchPurchaseList(),
            fetchPayableList()
          ]);
        }
        break;
      case "/raw-material":
        if (state.billList.length === 0 || state.rawStockList.length === 0) {
          [state.billList, state.rawStockList] = await Promise.all([
            fetchBillList(),
            fetchRawMaterialStock()
          ]);
        }
        break;
      case "/tax":
        if (!state.taxDeclaration) {
          state.taxDeclaration = await fetchTaxDeclaration(state.taxYear, state.taxMonth);
        }
        break;
      case "/store":
        if (state.storeSales.length === 0 || state.storeOrders.length === 0) {
          [state.storeSales, state.storeOrders] = await Promise.all([
            fetchStoreSales(state.storeSalesDate),
            fetchStoreOrders()
          ]);
        }
        break;
      default:
        break;
    }
  } catch (err) {
    console.warn("Route data load error", err);
  } finally {
    state.actionLoading = false;
    renderApp();
  }
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

  // New screens that don't need core data
  switch (state.route) {
    case "/invoice-entry":
      return renderInvoiceEntry(state.invoiceForm, state.invoiceSavedDocNo, state.invoiceSaving);
    case "/delivery":
      return state.deliveryNote
        ? renderDeliveryNote(state.deliveryNote, state.deliverySearchDocNo)
        : `<section class="panel"><p>データを読み込んでいます…</p></section>`;
    case "/billing":
      return state.billingSummary
        ? renderBilling(state.billingSummary, state.billingYearMonth)
        : `<section class="panel"><p>データを読み込んでいます…</p></section>`;
    case "/report":
      return state.salesReport
        ? renderSalesReport(state.salesReport)
        : `<section class="panel"><p>データを読み込んでいます…</p></section>`;
    case "/jikomi":
      return renderJikomi(state.jikomiList);
    case "/tanks":
      return renderTankList(state.tankList);
    case "/kentei":
      return renderKentei(state.kenteiList);
    case "/materials":
      return renderMaterials(state.materialList);
    case "/purchase":
      return renderPurchase(state.purchaseList, state.payableList);
    case "/raw-material":
      return renderRawMaterial(state.billList, state.rawStockList);
    case "/tax":
      return state.taxDeclaration
        ? renderTaxDeclaration(state.taxDeclaration, state.taxYear, state.taxMonth)
        : `<section class="panel"><p>データを読み込んでいます…</p></section>`;
    case "/store":
      return renderStorePOS(
        state.storeSales,
        state.storeOrders,
        state.storeTab,
        state.storeSalesDate
      );
    case "/setup":
      return state.pipelineMeta
        ? renderRelaySetup(state.pipelineMeta, SUPABASE_URL, SUPABASE_ANON_KEY)
        : `<section class="panel"><p>データを読み込んでいます…</p></section>`;
    default:
      break;
  }

  if (
    !state.salesSummary ||
    !state.paymentStatus ||
    !state.masterStats ||
    !state.pipelineMeta ||
    !state.customerLedger ||
    !state.salesAnalytics
  ) {
    return "";
  }

  switch (state.route) {
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
    case "/invoice":
      return renderInvoiceSearch(state.invoiceRecords, state.invoiceFilter);
    case "/ledger":
      return renderCustomerLedger(state.customerLedger, state.ledgerCustomerCode);
    case "/analytics":
      return renderSalesAnalytics(state.salesAnalytics, state.analyticsTab);
    case "/":
    default:
      return renderDashboard(state.salesSummary, state.pipelineMeta, state.salesAnalytics);
  }
}

type NavGroup = {
  label: string;
  items: Array<{ path: RoutePath; label: string; kicker: string }>;
};

function renderShell(): string {
  const navGroups: NavGroup[] = [
    {
      label: "概要",
      items: [
        { path: "/", label: "ダッシュボード", kicker: "Home" },
        { path: "/sales", label: "売上一覧", kicker: "Sales" },
        { path: "/payment", label: "入金状況", kicker: "Payment" },
        { path: "/master", label: "マスタ", kicker: "Master" },
        { path: "/invoice", label: "伝票照会", kicker: "Invoice" },
        { path: "/ledger", label: "得意先台帳", kicker: "Ledger" },
        { path: "/analytics", label: "売上分析", kicker: "Analytics" }
      ]
    },
    {
      label: "販売管理",
      items: [
        { path: "/invoice-entry", label: "伝票入力", kicker: "Entry" },
        { path: "/delivery", label: "納品書", kicker: "Delivery" },
        { path: "/billing", label: "月次請求", kicker: "Billing" },
        { path: "/report", label: "集計帳票", kicker: "Report" }
      ]
    },
    {
      label: "蔵内管理",
      items: [
        { path: "/jikomi", label: "仕込管理", kicker: "Jikomi" },
        { path: "/tanks", label: "タンク管理", kicker: "Tank" },
        { path: "/kentei", label: "検定管理", kicker: "Kentei" },
        { path: "/materials", label: "資材管理", kicker: "Material" }
      ]
    },
    {
      label: "仕入管理",
      items: [
        { path: "/purchase", label: "仕入・買掛", kicker: "Purchase" },
        { path: "/raw-material", label: "手形・原料", kicker: "RawMat" }
      ]
    },
    {
      label: "その他",
      items: [
        { path: "/tax", label: "酒税申告", kicker: "Tax" },
        { path: "/store", label: "店舗・直売所", kicker: "Store" },
        { path: "/setup", label: "連動設定", kicker: "Setup" }
      ]
    }
  ];

  const navHtml = navGroups
    .map(
      (group) => `
      <div class="nav-group">
        <p class="nav-group-label">${group.label}</p>
        ${group.items
          .map(
            (item) => `
          <a href="${import.meta.env.BASE_URL.replace(/\/$/, "")}${item.path === "/" ? "/" : item.path}"
             class="nav-link ${state.route === item.path ? "active" : ""}"
             data-link="${item.path}">
            <div>
              <div class="nav-kicker">${item.kicker}</div>
              <div class="nav-label">${item.label}</div>
            </div>
          </a>
        `
          )
          .join("")}
      </div>
    `
    )
    .join("");

  return `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>酒仙i 次世代版</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          ${navHtml}
        </nav>
      </aside>
      <main class="main">
        <div class="view ${state.actionLoading ? "is-busy" : ""}">${renderView()}</div>
      </main>
    </div>
  `;
}

async function reloadInvoices(filter: InvoiceFilter): Promise<void> {
  state.actionLoading = true;
  renderApp();
  try {
    state.invoiceRecords = await fetchInvoices(filter);
  } finally {
    state.actionLoading = false;
    renderApp();
  }
}

async function reloadCustomerLedger(customerCode: string): Promise<void> {
  state.actionLoading = true;
  renderApp();
  try {
    state.customerLedger = await fetchCustomerLedger(customerCode);
  } finally {
    state.actionLoading = false;
    renderApp();
  }
}

function collectInvoiceFormFromDom(root: HTMLElement): void {
  state.invoiceForm = {
    invoiceType:
      (root.querySelector<HTMLSelectElement>("#inv-type")?.value as InvoiceFormData["invoiceType"]) ??
      state.invoiceForm.invoiceType,
    invoiceDate: root.querySelector<HTMLInputElement>("#inv-date")?.value ?? state.invoiceForm.invoiceDate,
    customerCode:
      root.querySelector<HTMLInputElement>("#inv-customer-code")?.value ??
      state.invoiceForm.customerCode,
    customerName:
      root.querySelector<HTMLInputElement>("#inv-customer-name")?.value ??
      state.invoiceForm.customerName,
    staffCode:
      root.querySelector<HTMLInputElement>("#inv-staff")?.value ?? state.invoiceForm.staffCode,
    lines: state.invoiceForm.lines.map((line, i) => {
      const qty =
        parseFloat(
          root.querySelector<HTMLInputElement>(`[data-line="${i}"][data-field="quantity"]`)?.value ??
            ""
        ) || 0;
      const price =
        parseFloat(
          root.querySelector<HTMLInputElement>(`[data-line="${i}"][data-field="unitPrice"]`)?.value ??
            ""
        ) || 0;
      return {
        ...line,
        productCode:
          root.querySelector<HTMLInputElement>(`[data-line="${i}"][data-field="productCode"]`)
            ?.value ?? line.productCode,
        productName:
          root.querySelector<HTMLInputElement>(`[data-line="${i}"][data-field="productName"]`)
            ?.value ?? line.productName,
        unit:
          root.querySelector<HTMLInputElement>(`[data-line="${i}"][data-field="unit"]`)?.value ??
          line.unit,
        quantity: qty,
        unitPrice: price,
        amount: qty * price
      };
    }),
    note: root.querySelector<HTMLTextAreaElement>("#inv-note")?.value ?? state.invoiceForm.note
  };
}

function bindEvents(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>("[data-link]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      navigate(element.dataset.link as RoutePath);
    });
  });

  // ── 売上一覧フィルタ ─────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='sales-filter']")?.addEventListener("click", () => {
    const start = root.querySelector<HTMLInputElement>("#sales-start")?.value ?? "";
    const end = root.querySelector<HTMLInputElement>("#sales-end")?.value ?? "";
    state.salesFilter = { startDate: start, endDate: end };
    renderApp();
  });

  // ── 伝票照会フィルタ ─────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='invoice-filter']")?.addEventListener("click", () => {
    const nextFilter: InvoiceFilter = {
      documentNo: root.querySelector<HTMLInputElement>("#invoice-document-no")?.value ?? "",
      startDate: root.querySelector<HTMLInputElement>("#invoice-start")?.value ?? "",
      endDate: root.querySelector<HTMLInputElement>("#invoice-end")?.value ?? "",
      customerCode: root.querySelector<HTMLInputElement>("#invoice-customer-code")?.value ?? ""
    };
    state.invoiceFilter = nextFilter;
    void reloadInvoices(nextFilter);
  });

  // ── 得意先台帳検索 ─────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='ledger-search']")?.addEventListener("click", () => {
    const customerCode = root.querySelector<HTMLInputElement>("#ledger-customer-code")?.value ?? "";
    state.ledgerCustomerCode = customerCode.trim().toUpperCase();
    void reloadCustomerLedger(state.ledgerCustomerCode);
  });

  // ── マスタ・分析タブ ─────────────────────────────────
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

  // ── 伝票入力 ─────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='add-line']")?.addEventListener("click", () => {
    collectInvoiceFormFromDom(root);
    state.invoiceForm.lines.push({
      productCode: "",
      productName: "",
      quantity: 0,
      unitPrice: 0,
      unit: "本",
      amount: 0
    });
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='remove-line']").forEach((button) => {
    button.addEventListener("click", () => {
      collectInvoiceFormFromDom(root);
      const idx = parseInt(button.dataset.line ?? "0", 10);
      state.invoiceForm.lines.splice(idx, 1);
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='invoice-clear']")?.addEventListener("click", () => {
    state.invoiceForm = makeDefaultInvoiceForm();
    state.invoiceSavedDocNo = null;
    renderApp();
  });

  root.querySelector<HTMLButtonElement>("[data-action='invoice-save']")?.addEventListener("click", () => {
    collectInvoiceFormFromDom(root);
    state.invoiceSaving = true;
    renderApp();
    void saveInvoice(state.invoiceForm).then((saved) => {
      state.invoiceSavedDocNo = saved.documentNo;
      state.invoiceSaving = false;
      state.invoiceForm = makeDefaultInvoiceForm();
      renderApp();
    });
  });

  // ── 納品書 ───────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='delivery-search']")?.addEventListener("click", () => {
    const docNo = root.querySelector<HTMLInputElement>("#delivery-docno")?.value ?? "";
    state.deliverySearchDocNo = docNo.trim();
    state.deliveryNote = null;
    state.actionLoading = true;
    renderApp();
    void fetchDeliveryNote(state.deliverySearchDocNo || "D240122").then((note) => {
      state.deliveryNote = note;
      state.actionLoading = false;
      renderApp();
    });
  });

  // ── 月次請求 ─────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='billing-load']")?.addEventListener("click", () => {
    const ym = root.querySelector<HTMLInputElement>("#billing-month")?.value ?? state.billingYearMonth;
    state.billingYearMonth = ym;
    state.billingSummary = null;
    state.actionLoading = true;
    renderApp();
    void fetchBillingSummary(ym).then((summary) => {
      state.billingSummary = summary;
      state.actionLoading = false;
      renderApp();
    });
  });

  // ── 税務申告 ─────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='tax-load']")?.addEventListener("click", () => {
    const year = parseInt(root.querySelector<HTMLSelectElement>("#tax-year")?.value ?? String(state.taxYear), 10);
    const month = parseInt(root.querySelector<HTMLSelectElement>("#tax-month")?.value ?? String(state.taxMonth), 10);
    state.taxYear = year;
    state.taxMonth = month;
    state.taxDeclaration = null;
    state.actionLoading = true;
    renderApp();
    void fetchTaxDeclaration(year, month).then((decl) => {
      state.taxDeclaration = decl;
      state.actionLoading = false;
      renderApp();
    });
  });

  // ── 店舗タブ ─────────────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-store-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.storeTab = button.dataset.storeTab as "pos" | "orders";
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='store-load']")?.addEventListener("click", () => {
    const date = root.querySelector<HTMLInputElement>("#store-date")?.value ?? state.storeSalesDate;
    state.storeSalesDate = date;
    state.storeSales = [];
    state.actionLoading = true;
    renderApp();
    void fetchStoreSales(date).then((sales) => {
      state.storeSales = sales;
      state.actionLoading = false;
      renderApp();
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='copy-config']").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.configValue ?? "";
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "コピー済み";
        window.setTimeout(() => {
          button.textContent = "コピー";
        }, 1600);
      } catch (error) {
        console.warn("Clipboard copy failed", error);
      }
    });
  });
}

function renderApp(): void {
  const app = document.querySelector<HTMLElement>("#app");
  if (!app) return;
  app.innerHTML = renderShell();
  bindEvents(app);
}

async function loadData(): Promise<void> {
  state.loading = true;
  renderApp();
  try {
    const [
      salesSummary,
      paymentStatus,
      masterStats,
      pipelineMeta,
      invoiceRecords,
      customerLedger,
      salesAnalytics
    ] = await Promise.all([
      fetchSalesSummary(),
      fetchPaymentStatus(),
      fetchMasterStats(),
      fetchPipelineMeta(),
      fetchInvoices(state.invoiceFilter),
      fetchCustomerLedger(state.ledgerCustomerCode),
      fetchSalesAnalytics()
    ]);
    state.salesSummary = salesSummary;
    state.paymentStatus = paymentStatus;
    state.masterStats = masterStats;
    state.pipelineMeta = pipelineMeta;
    state.invoiceRecords = invoiceRecords;
    state.customerLedger = customerLedger;
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
    if (!state.invoiceFilter.startDate || !state.invoiceFilter.endDate) {
      state.invoiceFilter = {
        ...state.invoiceFilter,
        startDate: state.salesFilter.startDate,
        endDate: state.salesFilter.endDate
      };
      state.invoiceRecords = await fetchInvoices(state.invoiceFilter);
    }
    state.error = null;
  } catch (error) {
    state.error = error instanceof Error ? error.message : "データの取得に失敗しました。";
  } finally {
    state.loading = false;
    renderApp();
    // Eagerly load data for initial route if it's a new-screen route
    void loadRouteData(state.route);
  }
}

window.addEventListener("popstate", () => {
  state.route = normalizePath(location.pathname);
  void loadRouteData(state.route);
});

void loadData();
