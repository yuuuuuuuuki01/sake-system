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
  fetchStoreOrders,
  fetchStoreSales,
  fetchTankList,
  fetchTaxDeclaration,
  saveEmailCampaign,
  saveInvoice,
  SEASONAL_TEMPLATES,
  type AnalyticsTab,
  type BillingSummary,
  type BillRecord,
  type CustomerLedger,
  type DeliveryNote,
  type EmailCampaign,
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
  type StoreOrder,
  type StoreSale,
  type TankRecord,
  type TaxDeclaration
} from "./api";
import { renderBilling } from "./components/Billing";
import { renderCategoryHome } from "./components/CategoryHome";
import { renderCustomerLedger } from "./components/CustomerLedger";
import { renderDashboard } from "./components/Dashboard";
import { renderDeliveryNote } from "./components/DeliveryNote";
import {
  renderEmailBroadcast,
  type EmailAudienceMode,
  type EmailBroadcastViewState,
  type EmailRecipientPreview
} from "./components/EmailBroadcast";
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
  | "/cat/sales"
  | "/cat/brewery"
  | "/cat/purchase"
  | "/cat/more"
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
  | "/setup"
  | "/email";

type CategoryKey = "dashboard" | "sales" | "brewery" | "purchase" | "more" | "email";

type NavGroup = {
  label: string;
  items: Array<{ path: RoutePath; label: string; kicker: string }>;
};

interface EmailRecipientRecord extends EmailRecipientPreview {
  historySegment: "seasonal" | "premium" | "liqueur";
}

const ALL_ROUTES: RoutePath[] = [
  "/",
  "/cat/sales",
  "/cat/brewery",
  "/cat/purchase",
  "/cat/more",
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
  "/setup",
  "/email"
];

const EMAIL_RECIPIENTS: EmailRecipientRecord[] = [
  { name: "青葉商事", email: "aoba@example.jp", area: "関東", historySegment: "seasonal" },
  { name: "北斗酒販", email: "hokuto@example.jp", area: "北海道", historySegment: "premium" },
  { name: "中央フーズ", email: "chuo@example.jp", area: "関東", historySegment: "seasonal" },
  { name: "東海酒店", email: "tokai@example.jp", area: "中部", historySegment: "premium" },
  { name: "三和物産", email: "sanwa@example.jp", area: "関西", historySegment: "liqueur" },
  { name: "南星リカー", email: "nansei@example.jp", area: "九州", historySegment: "seasonal" },
  { name: "山川酒店", email: "yamakawa@example.jp", area: "関西", historySegment: "premium" },
  { name: "瑞穂商店", email: "mizuho@example.jp", area: "中部", historySegment: "seasonal" }
];

function getTemplateContent(templateId: string): { subject: string; body: string } {
  const template = SEASONAL_TEMPLATES[templateId as keyof typeof SEASONAL_TEMPLATES];
  return template ? { subject: template.subject, body: template.body } : { subject: "", body: "" };
}

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

function makeDefaultEmailState() {
  const initial = getTemplateContent("spring");
  return {
    mode: "all" as EmailAudienceMode,
    region: "all",
    historySegment: "seasonal",
    templateId: "spring",
    subject: initial.subject,
    body: initial.body,
    saveMessage: null as string | null
  };
}

const now = new Date();
const defaultYearMonth = now.toISOString().slice(0, 7);
const defaultTaxYear = now.getFullYear();
const defaultTaxMonth = now.getMonth() + 1;
const defaultStoreDate = now.toISOString().slice(0, 10);
const defaultLedgerCustomerCode = "C0011";
const defaultEmailState = makeDefaultEmailState();

interface AppState {
  salesSummary: SalesSummary | null;
  paymentStatus: PaymentStatusSummary | null;
  masterStats: MasterStatsSummary | null;
  pipelineMeta: PipelineMeta | null;
  invoiceRecords: InvoiceRecord[];
  customerLedger: CustomerLedger | null;
  salesAnalytics: SalesAnalytics | null;
  invoiceForm: InvoiceFormData;
  invoiceSaving: boolean;
  invoiceSavedDocNo: string | null;
  deliveryNote: DeliveryNote | null;
  deliverySearchDocNo: string;
  billingSummary: BillingSummary | null;
  billingYearMonth: string;
  salesReport: SalesReport | null;
  jikomiList: JikomiRecord[];
  tankList: TankRecord[];
  kenteiList: KenteiRecord[];
  materialList: MaterialRecord[];
  purchaseList: PurchaseRecord[];
  payableList: PayableRecord[];
  billList: BillRecord[];
  rawStockList: RawMaterialStock[];
  taxDeclaration: TaxDeclaration | null;
  taxYear: number;
  taxMonth: number;
  storeSales: StoreSale[];
  storeOrders: StoreOrder[];
  storeTab: "pos" | "orders";
  storeSalesDate: string;
  route: RoutePath;
  currentCategory: CategoryKey;
  sidebarOpen: boolean;
  salesFilter: { startDate: string; endDate: string };
  invoiceFilter: InvoiceFilter;
  ledgerCustomerCode: string;
  masterTab: MasterTab;
  analyticsTab: AnalyticsTab;
  emailAudienceMode: EmailAudienceMode;
  emailRegion: string;
  emailHistorySegment: string;
  emailTemplateId: string;
  emailSubject: string;
  emailBody: string;
  emailSaveMessage: string | null;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
}

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

function inferCurrentCategory(route: RoutePath): CategoryKey {
  switch (route) {
    case "/cat/sales":
    case "/invoice":
    case "/ledger":
    case "/invoice-entry":
    case "/delivery":
    case "/billing":
    case "/report":
      return "sales";
    case "/cat/brewery":
    case "/jikomi":
    case "/tanks":
    case "/kentei":
    case "/materials":
      return "brewery";
    case "/cat/purchase":
    case "/purchase":
    case "/raw-material":
      return "purchase";
    case "/cat/more":
    case "/master":
    case "/analytics":
    case "/tax":
    case "/store":
    case "/setup":
      return "more";
    case "/email":
      return "email";
    default:
      return "dashboard";
  }
}

const initialRoute = normalizePath(location.pathname);

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
  route: initialRoute,
  currentCategory: inferCurrentCategory(initialRoute),
  sidebarOpen: false,
  salesFilter: { startDate: "", endDate: "" },
  invoiceFilter: { documentNo: "", startDate: "", endDate: "", customerCode: "" },
  ledgerCustomerCode: defaultLedgerCustomerCode,
  masterTab: "customers",
  analyticsTab: "products",
  emailAudienceMode: defaultEmailState.mode,
  emailRegion: defaultEmailState.region,
  emailHistorySegment: defaultEmailState.historySegment,
  emailTemplateId: defaultEmailState.templateId,
  emailSubject: defaultEmailState.subject,
  emailBody: defaultEmailState.body,
  emailSaveMessage: defaultEmailState.saveMessage,
  loading: true,
  actionLoading: false,
  error: null
};

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

function getFilteredEmailRecipients(): EmailRecipientRecord[] {
  switch (state.emailAudienceMode) {
    case "area":
      return state.emailRegion === "all"
        ? EMAIL_RECIPIENTS
        : EMAIL_RECIPIENTS.filter((recipient) => recipient.area === state.emailRegion);
    case "history":
      return EMAIL_RECIPIENTS.filter(
        (recipient) => recipient.historySegment === state.emailHistorySegment
      );
    case "all":
    default:
      return EMAIL_RECIPIENTS;
  }
}

function buildEmailViewState(): EmailBroadcastViewState {
  const recipients = getFilteredEmailRecipients();
  return {
    audienceMode: state.emailAudienceMode,
    region: state.emailRegion,
    historySegment: state.emailHistorySegment,
    selectedTemplateId: state.emailTemplateId,
    subject: state.emailSubject,
    body: state.emailBody,
    recipientCount: recipients.length,
    previewRecipients: recipients.slice(0, 5),
    saveMessage: state.emailSaveMessage
  };
}

function buildEmailCampaignPayload(status: EmailCampaign["status"]): EmailCampaign {
  const recipients = getFilteredEmailRecipients();
  const audienceFilter =
    state.emailAudienceMode === "area"
      ? state.emailRegion
      : state.emailAudienceMode === "history"
        ? state.emailHistorySegment
        : "all";

  return {
    subject: state.emailSubject.trim(),
    body: state.emailBody.trim(),
    templateId: state.emailTemplateId,
    audienceMode: state.emailAudienceMode,
    audienceFilter,
    recipientCount: recipients.length,
    status
  };
}

function navigate(path: RoutePath): void {
  const target = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path === "/" ? "/" : path}`;
  history.pushState(null, "", target);
  state.route = path;
  state.currentCategory = inferCurrentCategory(path);
  state.sidebarOpen = false;
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

  switch (state.route) {
    case "/cat/sales":
      return renderCategoryHome("sales");
    case "/cat/brewery":
      return renderCategoryHome("brewery");
    case "/cat/purchase":
      return renderCategoryHome("purchase");
    case "/cat/more":
      return renderCategoryHome("more");
    case "/invoice-entry":
      return renderInvoiceEntry(state.invoiceForm, state.invoiceSavedDocNo, state.invoiceSaving);
    case "/email":
      return renderEmailBroadcast(buildEmailViewState());
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

function renderShell(): string {
  const navGroups: Record<CategoryKey, NavGroup[]> = {
    dashboard: [
      {
        label: "概要",
        items: [
          { path: "/", label: "ダッシュボード", kicker: "Home" },
          { path: "/sales", label: "売上一覧", kicker: "Sales" },
          { path: "/payment", label: "入金状況", kicker: "Payment" }
        ]
      }
    ],
    sales: [
      {
        label: "販売管理",
        items: [
          { path: "/cat/sales", label: "販売管理トップ", kicker: "Category" },
          { path: "/invoice-entry", label: "伝票入力", kicker: "Entry" },
          { path: "/delivery", label: "納品書", kicker: "Delivery" },
          { path: "/billing", label: "月次請求", kicker: "Billing" },
          { path: "/report", label: "集計帳票", kicker: "Report" },
          { path: "/invoice", label: "伝票照会", kicker: "Invoice" },
          { path: "/ledger", label: "得意先台帳", kicker: "Ledger" }
        ]
      }
    ],
    brewery: [
      {
        label: "蔵内管理",
        items: [
          { path: "/cat/brewery", label: "蔵内管理トップ", kicker: "Category" },
          { path: "/jikomi", label: "仕込管理", kicker: "Jikomi" },
          { path: "/tanks", label: "タンク管理", kicker: "Tank" },
          { path: "/kentei", label: "検定管理", kicker: "Kentei" },
          { path: "/materials", label: "資材管理", kicker: "Material" }
        ]
      }
    ],
    purchase: [
      {
        label: "仕入管理",
        items: [
          { path: "/cat/purchase", label: "仕入管理トップ", kicker: "Category" },
          { path: "/purchase", label: "仕入・買掛", kicker: "Purchase" },
          { path: "/raw-material", label: "手形・原料", kicker: "RawMat" }
        ]
      }
    ],
    more: [
      {
        label: "その他",
        items: [
          { path: "/cat/more", label: "その他トップ", kicker: "Category" },
          { path: "/tax", label: "酒税申告", kicker: "Tax" },
          { path: "/store", label: "店舗・直売所", kicker: "Store" },
          { path: "/analytics", label: "売上分析", kicker: "Analytics" },
          { path: "/master", label: "マスタ", kicker: "Master" },
          { path: "/email", label: "メール配信", kicker: "Mail" },
          { path: "/setup", label: "連動設定", kicker: "Setup" }
        ]
      }
    ],
    email: [
      {
        label: "メール配信",
        items: [{ path: "/email", label: "季節商品案内", kicker: "Mail" }]
      }
    ]
  };

  const topLevelItems: Array<{ category: CategoryKey; path: RoutePath; label: string }> = [
    { category: "dashboard", path: "/", label: "ダッシュボード" },
    { category: "sales", path: "/cat/sales", label: "販売管理" },
    { category: "brewery", path: "/cat/brewery", label: "蔵内管理" },
    { category: "purchase", path: "/cat/purchase", label: "仕入管理" },
    { category: "more", path: "/cat/more", label: "その他" },
    { category: "email", path: "/email", label: "メール配信" }
  ];

  const navHtml = navGroups[state.currentCategory]
    .map(
      (group) => `
        <div class="nav-group">
          <p class="nav-group-label">${group.label}</p>
          ${group.items
            .map(
              (item) => `
                <a
                  href="${import.meta.env.BASE_URL.replace(/\/$/, "")}${item.path === "/" ? "/" : item.path}"
                  class="nav-link ${state.route === item.path ? "active" : ""}"
                  data-link="${item.path}"
                >
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

  const topLevelHtml = topLevelItems
    .map(
      (item) => `
        <a
          href="${import.meta.env.BASE_URL.replace(/\/$/, "")}${item.path === "/" ? "/" : item.path}"
          class="category-link ${state.currentCategory === item.category ? "active" : ""}"
          data-link="${item.path}"
        >
          ${item.label}
        </a>
      `
    )
    .join("");

  return `
    <div class="shell">
      <button
        class="menu-toggle"
        type="button"
        aria-label="メニューを開く"
        data-action="${state.sidebarOpen ? "sidebar-close" : "sidebar-open"}"
      >
        ☰
      </button>
      <button
        class="sidebar-backdrop ${state.sidebarOpen ? "open" : ""}"
        type="button"
        aria-label="メニューを閉じる"
        data-action="sidebar-close"
      ></button>
      <aside class="sidebar ${state.sidebarOpen ? "open" : ""}">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>酒仙i 次世代版</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          <div class="category-nav">${topLevelHtml}</div>
          <div class="subnav">${navHtml}</div>
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
    invoiceDate:
      root.querySelector<HTMLInputElement>("#inv-date")?.value ?? state.invoiceForm.invoiceDate,
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

function collectEmailFormFromDom(root: HTMLElement): void {
  const selectedAudience =
    root.querySelector<HTMLInputElement>("input[name='email-audience-mode']:checked")?.value ??
    state.emailAudienceMode;

  state.emailAudienceMode = selectedAudience as EmailAudienceMode;
  state.emailRegion = root.querySelector<HTMLSelectElement>("#email-region")?.value ?? state.emailRegion;
  state.emailHistorySegment =
    root.querySelector<HTMLSelectElement>("#email-history-segment")?.value ??
    state.emailHistorySegment;
  state.emailSubject =
    root.querySelector<HTMLInputElement>("#email-subject")?.value ?? state.emailSubject;
  state.emailBody = root.querySelector<HTMLTextAreaElement>("#email-body")?.value ?? state.emailBody;
}

function bindEvents(root: HTMLElement): void {
  root.querySelector<HTMLButtonElement>("[data-action='sidebar-open']")?.addEventListener("click", () => {
    state.sidebarOpen = true;
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='sidebar-close']").forEach((button) => {
    button.addEventListener("click", () => {
      state.sidebarOpen = false;
      renderApp();
    });
  });

  root.querySelectorAll<HTMLElement>("[data-link]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      navigate(element.dataset.link as RoutePath);
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='sales-filter']")?.addEventListener("click", () => {
    const start = root.querySelector<HTMLInputElement>("#sales-start")?.value ?? "";
    const end = root.querySelector<HTMLInputElement>("#sales-end")?.value ?? "";
    state.salesFilter = { startDate: start, endDate: end };
    renderApp();
  });

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

  root.querySelector<HTMLButtonElement>("[data-action='ledger-search']")?.addEventListener("click", () => {
    const customerCode = root.querySelector<HTMLInputElement>("#ledger-customer-code")?.value ?? "";
    state.ledgerCustomerCode = customerCode.trim().toUpperCase();
    void reloadCustomerLedger(state.ledgerCustomerCode);
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

  root.querySelector<HTMLButtonElement>("[data-action='tax-load']")?.addEventListener("click", () => {
    const year = parseInt(
      root.querySelector<HTMLSelectElement>("#tax-year")?.value ?? String(state.taxYear),
      10
    );
    const month = parseInt(
      root.querySelector<HTMLSelectElement>("#tax-month")?.value ?? String(state.taxMonth),
      10
    );
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

  root.querySelectorAll<HTMLInputElement>("input[name='email-audience-mode']").forEach((input) => {
    input.addEventListener("change", () => {
      collectEmailFormFromDom(root);
      state.emailSaveMessage = null;
      renderApp();
    });
  });

  root.querySelectorAll<HTMLSelectElement>("#email-region, #email-history-segment").forEach((select) => {
    select.addEventListener("change", () => {
      collectEmailFormFromDom(root);
      state.emailSaveMessage = null;
      renderApp();
    });
  });

  root.querySelector<HTMLInputElement>("#email-subject")?.addEventListener("input", () => {
    collectEmailFormFromDom(root);
    state.emailSaveMessage = null;
  });

  root.querySelector<HTMLTextAreaElement>("#email-body")?.addEventListener("input", () => {
    collectEmailFormFromDom(root);
    state.emailSaveMessage = null;
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='template-select']").forEach((button) => {
    button.addEventListener("click", () => {
      state.emailTemplateId = button.dataset.templateId ?? "custom";
      const selected = getTemplateContent(state.emailTemplateId);
      state.emailSubject = selected.subject;
      state.emailBody = selected.body;
      state.emailSaveMessage = null;
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='email-insert-link']")?.addEventListener("click", () => {
    collectEmailFormFromDom(root);
    const linkLine = "\n\n商品詳細はこちら: https://example.jp/products/seasonal";
    if (!state.emailBody.includes("https://example.jp/products/seasonal")) {
      state.emailBody = `${state.emailBody.trimEnd()}${linkLine}`;
    }
    state.emailSaveMessage = null;
    renderApp();
  });

  root.querySelector<HTMLButtonElement>("[data-action='email-save']")?.addEventListener("click", () => {
    collectEmailFormFromDom(root);
    state.actionLoading = true;
    renderApp();
    void saveEmailCampaign(buildEmailCampaignPayload("draft")).then((saved) => {
      state.emailSaveMessage = `下書きを保存しました。${new Intl.DateTimeFormat("ja-JP", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(saved.updatedAt ?? new Date().toISOString()))}`;
      state.actionLoading = false;
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='email-send']")?.addEventListener("click", () => {
    collectEmailFormFromDom(root);
    state.actionLoading = true;
    renderApp();
    void saveEmailCampaign(buildEmailCampaignPayload("draft")).then((saved) => {
      state.emailSaveMessage = `送信処理用の下書きを保存しました。${saved.recipientCount.toLocaleString("ja-JP")} 件`;
      state.actionLoading = false;
      renderApp();
      window.confirm("送信しました（下書き保存）");
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
    void loadRouteData(state.route);
  }
}

window.addEventListener("popstate", () => {
  state.route = normalizePath(location.pathname);
  state.currentCategory = inferCurrentCategory(state.route);
  state.sidebarOpen = false;
  void loadRouteData(state.route);
});

void loadData();
