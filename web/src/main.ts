import {
  currentUser,
  getSession,
  signIn,
  signUp,
  signOut
} from "./auth";
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
  fetchCustomerPriceGroup,
  fetchPipelineMeta,
  fetchProductPrice,
  fetchRawRecords,
  fetchRawTableList,
  fetchSyncDashboard,
  fetchPurchaseList,
  fetchRawMaterialStock,
  fetchCustomerAnalysis,
  fetchProductABC,
  fetchSalesAnalytics,
  fetchSalesReport,
  submitFeatureRequest,
  updateCustomer,
  updateProduct,
  fetchCustomerPricing,
  resolveProductPrice,
  fetchProductPower,
  fetchProductDaily,
  type ProductDailyRow,
  fetchCustomerEfficiency,
  type CustomerPricing,
  type ProductPower,
  type CustomerEfficiency,
  fetchSalesSummary,
  fetchStoreOrders,
  fetchStoreSales,
  fetchTankList,
  fetchTaxDeclaration,
  saveEmailCampaign,
  sendEmailCampaign,
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
  type SyncDashboard,
  type PurchaseRecord,
  type RawMaterialStock,
  type CustomerAnalysisData,
  type ProductABCData,
  type SalesAnalytics,
  type SalesReport,
  type SalesPeriod,
  type SalesSummary,
  type MailSender,
  type CalendarEvent,
  type IntegrationSetting,
  type ShopifyOrder,
  type FaxRecord,
  type UserProfile,
  type AuditLog,
  type Prospect,
  type ProspectActivity,
  type SlackNotificationRule,
  type SlackNotificationLog,
  type DeliveryLocation,
  type CallLog,
  type LeadList,
  type LeadItem,
  type StoreOrder,
  type StoreSale,
  type TankRecord,
  type TaxDeclaration,
  fetchAnnouncements,
  type SystemAnnouncement
} from "./api";
import { REQUIRE_AUTH } from "./config";
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
import { renderGlobalSearch } from "./components/GlobalSearch";
import { renderCustomerPicker } from "./components/CustomerPicker";
import { renderInvoiceEntry } from "./components/InvoiceEntry";
import { renderQuoteBuilder, defaultQuoteState, generateQuotePdf, type QuoteState } from "./components/QuoteBuilder";
import { toggleSort, type SortState } from "./utils/tableSort";
import { renderProductPower, renderCustomerEfficiency, type ProductViewFilter, type ProductPeriod } from "./components/BusinessIntelligence";
import { renderInvoiceSearch } from "./components/InvoiceSearch";
import { renderJikomiCalendar } from "./components/JikomiCalendar";
import { renderJikomi } from "./components/Jikomi";
import { renderKentei } from "./components/Kentei";
import { renderLoginScreen } from "./components/LoginScreen";
import { renderMasterStats, renderEditCustomerModal, renderEditProductModal, defaultMasterFilter, type MasterFilterState } from "./components/MasterStats";
import { renderMaterials } from "./components/Materials";
import { renderPaymentStatus } from "./components/PaymentStatus";
import { renderProductPicker } from "./components/ProductPicker";
import { renderPurchase } from "./components/Purchase";
import { renderRawMaterial } from "./components/RawMaterial";
import { renderRelaySetup } from "./components/RelaySetup";
import { renderCustomerAnalysis } from "./components/CustomerAnalysis";
import { renderProductABC } from "./components/ProductABC";
import { renderSalesAnalytics } from "./components/SalesAnalytics";
import { renderSalesReport } from "./components/SalesReport";
import { renderSalesTable } from "./components/SalesTable";
import { renderStorePOS } from "./components/StorePOS";
import { renderDataImport } from "./components/DataImport";
import { collectFieldPositions, renderFormDesigner } from "./components/FormDesigner";
import { renderCustomerMap, type GeoCustomer } from "./components/CustomerMap";
import { renderOrderWorkflow, type WorkflowOrder } from "./components/OrderWorkflow";
import { renderMobileOrder, type MobileOrderState } from "./components/MobileOrder";
import {
  renderBreweryTour,
  TOUR_TEMPLATE_CONFIRM,
  TOUR_TEMPLATE_DECLINE,
  type TourInquiry
} from "./components/BreweryTour";
import { renderMailSenders } from "./components/MailSenders";
import { renderCalendar, type CalendarEditState } from "./components/Calendar";
import { renderIntegrations } from "./components/Integrations";
import { renderShopifyOrders } from "./components/ShopifyOrders";
import { renderFaxOcr } from "./components/FaxOcr";
import { renderUserManagement } from "./components/UserManagement";
import { renderUserProfile, renderAuditLogs } from "./components/UserProfile";
import { updatePassword } from "./auth";
import { renderProspects, type ProspectsViewState } from "./components/Prospects";
import { renderSlackSettings } from "./components/SlackSettings";
import { renderMaterialEditModal } from "./components/Materials";
import { renderCallLogs } from "./components/CallLogs";
import type { MapFilters } from "./components/CustomerMap";
import { renderListBuilder, type ListBuilderState } from "./components/ListBuilder";
import { renderPrintCenter } from "./components/PrintCenter";
import {
  DEFAULT_COMPANY_INFO,
  DEFAULT_PRINT_OPTIONS,
  type PrintCompanyInfo,
  type PrintDocumentData,
  type PrintOptions,
  type PrintTemplateKey
} from "./templates/printTypes";
import {
  generateTemplateCSV,
  importToSupabase,
  parseCSV,
  validateImport,
  type ImportPreview,
  type ImportableEntity
} from "./utils/import";
import { renderRawBrowser, type RawTableInfo, type RawRecord } from "./components/RawBrowser";
import { renderDemandForecast, buildForecastsFromShipments, buildDeliveriesFromSchedule, renderDeliveryCalendarWidget, defaultDemandForecastState, type DemandForecastState, type DeliveryCalendarEntry, type ProductionSegment } from "./components/DemandForecast";
import { renderDemandPlanning, type DemandTab } from "./components/DemandPlanning";
import { renderChurnAlert, buildChurnAlertData, type ChurnAlertData } from "./components/ChurnAlert";
import { renderSeasonalCalendar, buildSeasonalData, type SeasonalCalendarState } from "./components/SeasonalCalendar";
import { renderShipmentCalendar } from "./components/ShipmentCalendar";
import { renderVisitPlanner, buildVisitPlan, type VisitPlannerState } from "./components/VisitPlanner";
import { renderTankList } from "./components/TankList";
import { renderTaxDeclaration } from "./components/TaxDeclaration";
import { showToast } from "./components/Toast";
import { showConfirm } from "./components/ConfirmModal";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase";
import "./styles/main.css";
import { downloadCSV, type CSVColumn } from "./utils/csv";

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
  | "/customer-analysis"
    | "/product-power"
  | "/customer-efficiency"
  | "/invoice-entry"
  | "/quote"
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
  | "/email"
  | "/import"
  | "/print"
  | "/form-designer"
  | "/map"
  | "/workflow"
  | "/mobile-order"
  | "/tour"
  | "/mail-senders"
  | "/calendar"
  | "/integrations"
  | "/shopify"
  | "/fax"
  | "/users"
  | "/profile"
  | "/audit"
  | "/prospects"
  | "/slack"
  | "/calls"
  | "/list-builder"
  | "/raw-browser"
  | "/demand-forecast"
  | "/churn-alert"
  | "/seasonal-calendar"
  | "/visit-planner"
  | "/demand"
  | "/shipment-calendar";

type CategoryKey = "dashboard" | "sales" | "analytics" | "crm" | "orders" | "brewery" | "master" | "settings";

type NavGroup = {
  label: string;
  items: Array<{ path: RoutePath; label: string; kicker: string }>;
};

interface EmailRecipientRecord extends EmailRecipientPreview {
  historySegment: "seasonal" | "premium" | "liqueur";
}

interface PageSearchItem {
  path: RoutePath;
  title: string;
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
  "/customer-analysis",
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
  "/email",
  "/import",
  "/print",
  "/form-designer",
  "/map",
  "/workflow",
  "/mobile-order",
  "/tour",
  "/mail-senders",
  "/calendar",
  "/integrations",
  "/shopify",
  "/fax",
  "/users",
  "/profile",
  "/audit",
  "/prospects",
  "/slack",
  "/calls",
  "/list-builder",
  "/raw-browser",
  "/demand-forecast",
  "/churn-alert",
  "/seasonal-calendar",
  "/visit-planner",
  "/demand",
  "/shipment-calendar"
];

let EMAIL_RECIPIENTS: EmailRecipientRecord[] = [];

async function loadEmailRecipients(): Promise<void> {
  const { supabaseQueryAll } = await import("./supabase");
  const rows = await supabaseQueryAll<Record<string, unknown>>("customers", {
    select: "name,email,delivery_area_code",
    email: "neq.",
    is_active: "eq.true"
  });
  EMAIL_RECIPIENTS = rows
    .filter((r) => typeof r.email === "string" && r.email.length > 0)
    .map((r) => ({
      name: String(r.name ?? ""),
      email: String(r.email ?? ""),
      area: String(r.delivery_area_code ?? ""),
      historySegment: "seasonal" as const
    }));
}

const PAGE_SEARCH_ITEMS: PageSearchItem[] = [
  { path: "/sales", title: "売上一覧" },
  { path: "/payment", title: "入金状況" },
  { path: "/master", title: "マスタ" },
  { path: "/invoice", title: "伝票照会" },
  { path: "/ledger", title: "得意先台帳" },
  { path: "/analytics", title: "売上分析" },
  { path: "/invoice-entry", title: "伝票入力" },
  { path: "/delivery", title: "納品書" },
  { path: "/billing", title: "月次請求" },
  { path: "/report", title: "集計帳票" },
  { path: "/customer-analysis", title: "得意先分析" },
    { path: "/jikomi", title: "仕込管理" },
  { path: "/tanks", title: "タンク管理" },
  { path: "/kentei", title: "検定管理" },
  { path: "/materials", title: "資材管理" },
  { path: "/purchase", title: "仕入・買掛" },
  { path: "/raw-material", title: "手形・原料" },
  { path: "/tax", title: "酒税申告" },
  { path: "/store", title: "店舗・直売所" },
  { path: "/setup", title: "連動設定" },
  { path: "/import", title: "CSV/Excelインポート" },
  { path: "/print", title: "印刷センター" },
  { path: "/form-designer", title: "帳票デザイナー" },
  { path: "/map", title: "取引先マップ" },
  { path: "/workflow", title: "受注ワークフロー" },
  { path: "/mobile-order", title: "モバイル受注" },
  { path: "/tour", title: "酒蔵見学" },
  { path: "/mail-senders", title: "メール送信元管理" },
  { path: "/calendar", title: "カレンダー" },
  { path: "/integrations", title: "外部連携設定" },
  { path: "/shopify", title: "Shopify注文" },
  { path: "/fax", title: "FAX OCR" },
  { path: "/users", title: "ユーザー管理" },
  { path: "/profile", title: "プロフィール" },
  { path: "/audit", title: "操作ログ" },
  { path: "/prospects", title: "新規営業" },
  { path: "/slack", title: "Slack通知" },
  { path: "/calls", title: "通話履歴(IVRy)" },
  { path: "/list-builder", title: "リスト取得ツール" },
  { path: "/raw-browser", title: "データブラウザ" },
  { path: "/churn-alert", title: "離反アラート・休眠顧客" },
  { path: "/seasonal-calendar", title: "季節提案カレンダー" },
  { path: "/visit-planner", title: "訪問計画・ルート最適化" },
  { path: "/demand", title: "需要分析・安全在庫・生産計画" },
  { path: "/shipment-calendar", title: "出荷カレンダー" }
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
  syncDashboard: SyncDashboard | null;
  rawTableList: RawTableInfo[];
  rawRecords: RawRecord[];
  rawSelectedTable: string | null;
  rawPage: number;
  rawTotalCount: number;
  invoiceRecords: InvoiceRecord[];
  customerLedger: CustomerLedger | null;
  salesAnalytics: SalesAnalytics | null;
  customerAnalysis: CustomerAnalysisData | null;
  productABC: ProductABCData | null;
  invoiceForm: InvoiceFormData;
  invoiceSaving: boolean;
  invoiceSavedDocNo: string | null;
  invoicePriceGroup: string;
  pickerMode: "customer" | "product" | null;
  pickerQuery: string;
  pickerTargetLine: number | null;
  invoiceErrors: Record<string, string>;
  deliveryNote: DeliveryNote | null;
  deliverySearchDocNo: string;
  shipmentCalendarData: import("./api").ShipmentCalendarData | null;
  shipmentCalendarYearMonth: string;
  shipmentCalendarSelectedDate: string | null;
  billingSummary: BillingSummary | null;
  billingYearMonth: string;
  salesReport: SalesReport | null;
  jikomiList: JikomiRecord[];
  jikomiView: "list" | "calendar";
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
  importEntity: ImportableEntity;
  importPreview: ImportPreview | null;
  importing: boolean;
  importResult: string | null;
  fdDesignMode: boolean;
  fdSavedPositions: Record<string, { x: number; y: number }> | null;
  fdActiveFieldId: string | null;
  mapRegionFilter: string;
  workflowOrders: WorkflowOrder[];
  mobileOrder: MobileOrderState;
  tourInquiries: TourInquiry[];
  tourActiveId: string | null;
  mailSenders: MailSender[];
  mailSenderEditingId: string | null;
  emailSenderId: string;
  calendarEvents: CalendarEvent[];
  calendarYearMonth: string;
  calendarFilterCategory: string;
  calendarEdit: CalendarEditState | null;
  integrations: IntegrationSetting[];
  integrationEditingId: string | null;
  shopifyOrders: ShopifyOrder[];
  faxRecords: FaxRecord[];
  faxProcessing: boolean;
  faxOcrText: string | null;
  userProfiles: UserProfile[];
  userEditingId: string | null;
  myProfile: UserProfile | null;
  auditLogs: AuditLog[];
  prospects: Prospect[];
  prospectActivities: ProspectActivity[];
  prospectEditingId: string | null;
  prospectViewMode: "kanban" | "list";
  slackRules: SlackNotificationRule[];
  slackLogs: SlackNotificationLog[];
  materialEditing: MaterialRecord | null;
  materialEditingIsNew: boolean;
  deliveryLocations: DeliveryLocation[];
  callLogs: CallLog[];
  mapFilters: MapFilters;
  leadLists: LeadList[];
  leadItems: LeadItem[];
  leadActiveListId: string | null;
  leadSearchQuery: string;
  leadSearchArea: string;
  leadSearchType: string;
  leadSearching: boolean;
  leadSearchResults: LeadItem[];
  printTemplate: PrintTemplateKey;
  printOptions: PrintOptions;
  printCompany: PrintCompanyInfo;
  printData: PrintDocumentData;
  storeSalesDate: string;
  route: RoutePath;
  currentCategory: CategoryKey;
  sidebarOpen: boolean;
  announcements: SystemAnnouncement[];
  dismissedAnnouncements: Set<string>;
  updateAvailable: boolean;
  salesFilter: { startDate: string; endDate: string };
  invoiceFilter: InvoiceFilter;
  ledgerCustomerCode: string;
  salesPeriod: SalesPeriod;
  customRange: { start: string; end: string };
  quoteState: QuoteState;
  quoteCustomerQuery: string;
  quoteProductQuery: string;
  quotePricing: CustomerPricing | null;
  productPower: ProductPower[];
  customerEfficiency: CustomerEfficiency[];
  masterTab: MasterTab;
  masterFilter: MasterFilterState;
  analyticsTab: AnalyticsTab;
  analyticsPeriod: import("./api").AnalyticsPeriod;
  analyticsPeriodFilter: string;
  analyticsPeriodRows: import("./api").PeriodBreakdownRow[];
  analyticsPeriodOptions: string[];
  analyticsStaffFilter: string;
  analyticsTagFilter: string;
  analyticsStaffPeriod: import("./api").AnalyticsPeriod;
  analyticsStaffPeriodFilter: string;
  analyticsStaffPeriodOptions: string[];
  analyticsStaffTotals: import("./api").AnalyticsBreakdownRow[];
  analyticsStaffDrilldown: { code: string; name: string; breakdownTab: "customers" | "products"; customerRows: import("./api").StaffBreakdownRow[]; productRows: import("./api").StaffBreakdownRow[] } | null;
  emailAudienceMode: EmailAudienceMode;
  emailRegion: string;
  emailHistorySegment: string;
  emailTemplateId: string;
  emailSubject: string;
  emailBody: string;
  emailSaveMessage: string | null;
  emailSending: boolean;
  demandForecast: DemandForecastState;
  churnAlert: ChurnAlertData | null;
  seasonalCalendar: SeasonalCalendarState | null;
  visitPlanner: VisitPlannerState | null;
  demandAnalysis: import("./api").DemandAnalysis | null;
  safetyStockParams: import("./api").SafetyStockParams[];
  productionPlan: import("./api").ProductionPlanRow[];
  demandTab: DemandTab;
  demandPlanYearMonth: string;
  demandYearsBack: number;
  globalSearchOpen: boolean;
  globalQuery: string;
  authSkipped: boolean;
  authSubmitting: boolean;
  authError: string | null;
  user: { email: string } | null;
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
    case "/invoice-entry":
    case "/quote":
    case "/delivery":
    case "/billing":
    case "/invoice":
    case "/ledger":
    case "/shipment-calendar":
      return "sales";
    case "/analytics":
    case "/customer-analysis":
    case "/product-power":
    case "/customer-efficiency":
    case "/report":
      return "analytics";
    case "/prospects":
    case "/map":
    case "/list-builder":
    case "/calls":
    case "/email":
    case "/mail-senders":
    case "/workflow":
    case "/mobile-order":
    case "/shopify":
    case "/fax":
    case "/churn-alert":
    case "/seasonal-calendar":
    case "/visit-planner":
      return "crm";
    case "/purchase":
    case "/raw-material":
      return "orders";
    case "/jikomi":
    case "/tanks":
    case "/kentei":
    case "/materials":
    case "/tax":
    case "/demand":
      return "brewery";
    case "/master":
    case "/calendar":
    case "/store":
    case "/tour":
    case "/print":
    case "/form-designer":
      return "master";
    case "/setup":
    case "/integrations":
    case "/slack":
    case "/import":
    case "/raw-browser":
    case "/users":
    case "/profile":
    case "/audit":
      return "settings";
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
  syncDashboard: null,
  rawTableList: [],
  rawRecords: [],
  rawSelectedTable: null,
  rawPage: 1,
  rawTotalCount: 0,
  invoiceRecords: [],
  customerLedger: null,
  salesAnalytics: null,
  customerAnalysis: null,
  productABC: null,
  invoiceForm: makeDefaultInvoiceForm(),
  invoiceSaving: false,
  invoiceSavedDocNo: null,
  invoicePriceGroup: "",
  pickerMode: null,
  pickerQuery: "",
  pickerTargetLine: null,
  invoiceErrors: {},
  deliveryNote: null,
  deliverySearchDocNo: "",
  billingSummary: null,
  billingYearMonth: defaultYearMonth,
  salesReport: null,
  jikomiList: [],
  jikomiView: "list",
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
  importEntity: "customers",
  importPreview: null,
  importing: false,
  importResult: null,
  fdDesignMode: true,
  fdSavedPositions: null,
  fdActiveFieldId: null,
  mapRegionFilter: "",
  workflowOrders: [],
  mobileOrder: {
    step: "customer",
    selectedCustomer: null,
    cart: [],
    customerQuery: "",
    productQuery: "",
    memo: "",
    submittedDocNo: null
  },
  tourInquiries: [],
  tourActiveId: null,
  mailSenders: [],
  mailSenderEditingId: null,
  emailSenderId: "default",
  calendarEvents: [],
  calendarYearMonth: new Date().toISOString().slice(0, 7),
  calendarFilterCategory: "",
  calendarEdit: null,
  integrations: [],
  integrationEditingId: null,
  shopifyOrders: [],
  faxRecords: [],
  faxProcessing: false,
  faxOcrText: null,
  userProfiles: [],
  userEditingId: null,
  myProfile: null,
  auditLogs: [],
  prospects: [],
  prospectActivities: [],
  prospectEditingId: null,
  prospectViewMode: "kanban",
  slackRules: [],
  slackLogs: [],
  materialEditing: null,
  materialEditingIsNew: false,
  deliveryLocations: [],
  callLogs: [],
  mapFilters: {
    showCustomers: true,
    showProspects: true,
    showDelivery: true,
    filterRegion: "",
    filterBusinessType: ""
  },
  leadLists: [],
  leadItems: [],
  leadActiveListId: null,
  leadSearchQuery: "",
  leadSearchArea: "",
  leadSearchType: "",
  leadSearching: false,
  leadSearchResults: [],
  printTemplate: "chain_store",
  printOptions: {
    ...DEFAULT_PRINT_OPTIONS,
    overlayImageUrl: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/reference/chainstore_ref.png`
  },
  printCompany: { ...DEFAULT_COMPANY_INFO },
  printData: {
    documentNo: "D" + new Date().toISOString().slice(0, 10).replaceAll("-", ""),
    documentDate: new Date().toISOString().slice(0, 10),
    orderDate: new Date().toISOString().slice(0, 10),
    deliveryDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    customerName: "株式会社〇〇商事",
    customerHonorific: "御中",
    customerPostalCode: "100-0001",
    customerAddress: "東京都千代田区〇〇1-2-3",
    customerCode: "C0001",
    chainStoreCode: "0123",
    categoryCode: "21",
    slipTypeCode: "11",
    orderNo: "PO-" + new Date().toISOString().slice(5, 10).replaceAll("-", ""),
    vendorCode: "V0001",
    departmentCode: "101",
    settlementPrint: false,
    title: "",
    remarks: "",
    lines: [
      { productCode: "P00012", productName: "純米吟醸 金井の雫", spec: "720ml", quantity: 12, unit: "本", unitPrice: 1500, amount: 18000, retailPrice: 2200, janCode: "4901234567891", caseQty: 6 },
      { productCode: "P00008", productName: "本醸造 辛口", spec: "1.8L", quantity: 6, unit: "本", unitPrice: 1800, amount: 10800, retailPrice: 2400, janCode: "4901234567908", caseQty: 6 },
      { productCode: "P00021", productName: "梅酒 熟成", spec: "500ml", quantity: 12, unit: "本", unitPrice: 1200, amount: 14400, retailPrice: 1800, janCode: "4901234567915", caseQty: 12 }
    ],
    taxRate: 0.10,
    previousBalance: 0,
    paymentAmount: 0
  },
  storeSalesDate: defaultStoreDate,
  route: initialRoute,
  currentCategory: inferCurrentCategory(initialRoute),
  sidebarOpen: false,
  announcements: [] as SystemAnnouncement[],
  dismissedAnnouncements: new Set<string>(),
  updateAvailable: false,
  salesFilter: { startDate: "", endDate: "" },
  invoiceFilter: { documentNo: "", startDate: "", endDate: "", customerCode: "" },
  ledgerCustomerCode: defaultLedgerCustomerCode,
  salesPeriod: "month",
  customRange: { start: "", end: "" },
  quoteState: (() => {
    const s = { ...defaultQuoteState };
    try { const seal = localStorage.getItem("quote-seal"); if (seal) s.sealSettings = JSON.parse(seal); } catch {}
    return s;
  })(),
  quoteCustomerQuery: "",
  quoteProductQuery: "",
  quotePricing: null,
  productPower: [],
  productFilter: "all" as ProductViewFilter,
  productPeriod: "year" as ProductPeriod,
  productDaily: [] as ProductDailyRow[],
  productCustomStart: "",
  productCustomEnd: "",
  productSortState: [] as SortState,
  customerSortState: [] as SortState,
  dashboardSortState: [] as SortState,
  masterSortState: [] as SortState,
  customerEfficiency: [],
  masterTab: "customers",
  masterFilter: { ...defaultMasterFilter },
  analyticsTab: "products",
  analyticsPeriod: "all" as import("./api").AnalyticsPeriod,
  analyticsPeriodFilter: "",
  analyticsPeriodRows: [] as import("./api").PeriodBreakdownRow[],
  analyticsPeriodOptions: [] as string[],
  analyticsStaffFilter: "",
  analyticsTagFilter: "",
  analyticsStaffPeriod: "all" as import("./api").AnalyticsPeriod,
  analyticsStaffPeriodFilter: "",
  analyticsStaffPeriodOptions: [] as string[],
  analyticsStaffTotals: [] as import("./api").AnalyticsBreakdownRow[],
  analyticsStaffDrilldown: null as { code: string; name: string; breakdownTab: "customers" | "products"; customerRows: import("./api").StaffBreakdownRow[]; productRows: import("./api").StaffBreakdownRow[] } | null,
  emailAudienceMode: defaultEmailState.mode,
  emailRegion: defaultEmailState.region,
  emailHistorySegment: defaultEmailState.historySegment,
  emailTemplateId: defaultEmailState.templateId,
  emailSubject: defaultEmailState.subject,
  emailBody: defaultEmailState.body,
  emailSaveMessage: defaultEmailState.saveMessage,
  emailSending: false,
  demandForecast: { ...defaultDemandForecastState },
  shipmentCalendarData: null,
  shipmentCalendarYearMonth: new Date().toISOString().slice(0, 7),
  shipmentCalendarSelectedDate: null,
  churnAlert: null,
  seasonalCalendar: null,
  visitPlanner: null,
  demandAnalysis: null,
  safetyStockParams: [],
  productionPlan: [],
  demandTab: "demand",
  demandPlanYearMonth: new Date().toISOString().slice(0, 7),
  demandYearsBack: 3,
  globalSearchOpen: false,
  globalQuery: "",
  authSkipped: false,
  authSubmitting: false,
  authError: null,
  user: null,
  loading: true,
  actionLoading: false,
  error: null
};

function formatDateInput(value: string): string {
  return value.slice(0, 10);
}

function cloneInvoiceLine(line: InvoiceFormData["lines"][number]): InvoiceFormData["lines"][number] {
  return { ...line };
}

function closePicker(): void {
  state.pickerMode = null;
  state.pickerQuery = "";
  state.pickerTargetLine = null;
}

function clearInvoiceForm(): void {
  state.invoiceForm = makeDefaultInvoiceForm();
  state.invoiceSavedDocNo = null;
  state.invoicePriceGroup = "";
  state.invoiceErrors = {};
  closePicker();
}

function validateInvoice(form: InvoiceFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.invoiceDate.trim()) {
    errors.invoiceDate = "伝票日付は必須です。";
  }
  if (!form.customerCode.trim()) {
    errors.customerCode = "得意先コードは必須です。";
  }
  if (form.lines.length === 0) {
    errors.lines = "明細を1行以上入力してください。";
  }

  form.lines.forEach((line, index) => {
    if (!line.productCode.trim()) {
      errors[`lines.${index}.productCode`] = "商品コードは必須です。";
    }
    if (!line.productName.trim()) {
      errors[`lines.${index}.productName`] = "商品名は必須です。";
    }
    if (line.quantity <= 0) {
      errors[`lines.${index}.quantity`] = "数量は1以上を入力してください。";
    }
    if (line.unitPrice < 0) {
      errors[`lines.${index}.unitPrice`] = "単価は0円以上で入力してください。";
    }
  });

  return errors;
}

function duplicateInvoiceLine(lineIndex: number): void {
  const sourceLine = state.invoiceForm.lines[lineIndex];
  if (!sourceLine) return;
  state.invoiceForm.lines.splice(lineIndex + 1, 0, cloneInvoiceLine(sourceLine));
}

function copyPastInvoice(): void {
  const latestInvoice = state.invoiceRecords[0];
  const fallbackCustomer = state.masterStats?.customers[0];
  const fallbackProducts = state.masterStats?.products.slice(0, 2) ?? [];

  state.invoiceForm = {
    invoiceType: "sales",
    invoiceDate: new Date().toISOString().slice(0, 10),
    customerCode: latestInvoice?.customerCode ?? fallbackCustomer?.code ?? "",
    customerName: latestInvoice?.customerName ?? fallbackCustomer?.name ?? "",
    staffCode: state.invoiceForm.staffCode || "S001",
    lines: fallbackProducts.map((product, index) => {
      const quantity = index === 0 ? 1 : 2;
      const unitPrice = 1200 * (index + 1);
      return {
        productCode: product.code,
        productName: product.name,
        quantity,
        unitPrice,
        unit: "本",
        amount: quantity * unitPrice
      };
    }),
    note: latestInvoice
      ? `過去伝票 ${latestInvoice.documentNo} をもとに複製`
      : "直近のサンプル伝票をもとに複製"
  };
  state.invoiceSavedDocNo = null;
  state.invoiceErrors = {};
}

function tryAutofillCustomerByCode(code: string): boolean {
  const customer = state.masterStats?.customers.find(
    (item) => item.code.toLowerCase() === code.trim().toLowerCase()
  );
  if (!customer) return false;
  state.invoiceForm.customerCode = customer.code;
  state.invoiceForm.customerName = customer.name;
  state.invoicePriceGroup = customer.priceGroup || "";
  return true;
}

function tryAutofillCustomerByName(name: string): boolean {
  const customer = state.masterStats?.customers.find((item) => item.name === name.trim());
  if (!customer) return false;
  state.invoiceForm.customerCode = customer.code;
  state.invoiceForm.customerName = customer.name;
  state.invoicePriceGroup = customer.priceGroup || "";
  return true;
}

function persistInvoice(root: HTMLElement): void {
  collectInvoiceFormFromDom(root);
  state.invoiceErrors = validateInvoice(state.invoiceForm);
  if (Object.keys(state.invoiceErrors).length > 0) {
    renderApp();
    return;
  }

  state.invoiceSaving = true;
  renderApp();
  void saveInvoice(state.invoiceForm)
    .then((saved) => {
      state.invoiceSavedDocNo = saved.documentNo;
      state.invoiceSaving = false;
      state.invoiceErrors = {};
      state.invoiceForm = makeDefaultInvoiceForm();
      renderApp();
    })
    .catch(() => {
      state.invoiceSaving = false;
      renderApp();
    });
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
    saveMessage: state.emailSaveMessage,
    sending: state.emailSending,
    senderId: state.emailSenderId,
    senders: state.mailSenders
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
    recipients: recipients.map((recipient) => recipient.email),
    status
  };
}

function shouldShowLogin(): boolean {
  if (state.user) return false;
  // REQUIRE_AUTH=false のときはログイン画面をスキップして即座にアプリ表示
  if (!REQUIRE_AUTH) return false;
  return !state.authSkipped;
}

function closeGlobalSearch(): void {
  state.globalSearchOpen = false;
  state.globalQuery = "";
}

function getGlobalSearchResults() {
  const query = state.globalQuery.trim().toLowerCase();
  if (!query) {
    return {
      customers: [] as { code: string; name: string }[],
      products: [] as { code: string; name: string }[],
      documents: [] as { documentNo: string; customerName: string; date: string }[],
      pages: PAGE_SEARCH_ITEMS
    };
  }

  return {
    customers:
      state.masterStats?.customers.filter(
        (customer) =>
          customer.code.toLowerCase().includes(query) || customer.name.toLowerCase().includes(query)
      ) ?? [],
    products:
      state.masterStats?.products.filter(
        (product) =>
          product.code.toLowerCase().includes(query) || product.name.toLowerCase().includes(query)
      ) ?? [],
    documents: state.invoiceRecords.filter(
      (record) =>
        record.documentNo.toLowerCase().includes(query) ||
        record.customerName.toLowerCase().includes(query) ||
        record.date.toLowerCase().includes(query)
    ),
    pages: PAGE_SEARCH_ITEMS.filter(
      (page) => page.path.toLowerCase().includes(query) || page.title.toLowerCase().includes(query)
    )
  };
}

function exportCurrentRouteCsv(): void {
  let rows: Record<string, unknown>[] = [];
  let columns: CSVColumn[] | undefined;
  let filename = "export.csv";

  switch (state.route) {
    case "/sales":
      rows = (state.salesSummary ? filterSalesRecords(state.salesSummary) : []).map((record) => ({
        documentNo: record.documentNo,
        date: record.date,
        customerCode: record.customerCode,
        customerName: record.customerName,
        amount: record.amount
      }));
      columns = [
        { key: "documentNo", label: "伝票番号" },
        { key: "date", label: "日付" },
        { key: "customerCode", label: "得意先コード" },
        { key: "customerName", label: "得意先名" },
        { key: "amount", label: "金額" }
      ];
      filename = "sales.csv";
      break;
    case "/payment":
      rows = [...(state.paymentStatus?.records ?? [])]
        .sort((left, right) => right.balanceAmount - left.balanceAmount)
        .map((record) => ({ ...record }));
      columns = [
        { key: "customerCode", label: "得意先コード" },
        { key: "customerName", label: "得意先名" },
        { key: "billedAmount", label: "請求額" },
        { key: "paymentAmount", label: "入金額" },
        { key: "balanceAmount", label: "請求残" },
        { key: "lastPaymentDate", label: "最終入金日" },
        { key: "status", label: "状態" }
      ];
      filename = "payment-status.csv";
      break;
    case "/invoice":
      rows = state.invoiceRecords.map((record) => ({ ...record }));
      columns = [
        { key: "documentNo", label: "伝票番号" },
        { key: "date", label: "日付" },
        { key: "customerCode", label: "得意先コード" },
        { key: "customerName", label: "得意先名" },
        { key: "itemCount", label: "明細数" },
        { key: "amount", label: "金額" }
      ];
      filename = "invoices.csv";
      break;
    case "/purchase":
      rows = state.purchaseList.map((record) => ({ ...record }));
      columns = [
        { key: "documentNo", label: "伝票番号" },
        { key: "purchaseDate", label: "仕入日" },
        { key: "supplierCode", label: "仕入先コード" },
        { key: "supplierName", label: "仕入先名" },
        { key: "itemName", label: "品目" },
        { key: "quantity", label: "数量" },
        { key: "unitPrice", label: "単価" },
        { key: "amount", label: "金額" },
        { key: "status", label: "状態" }
      ];
      filename = "purchase.csv";
      break;
    case "/jikomi":
      rows = state.jikomiList.map((record) => ({ ...record }));
      columns = [
        { key: "jikomiNo", label: "仕込番号" },
        { key: "productName", label: "銘柄" },
        { key: "riceType", label: "原料米" },
        { key: "plannedKg", label: "計画量" },
        { key: "actualKg", label: "実績量" },
        { key: "startDate", label: "開始日" },
        { key: "expectedDoneDate", label: "完了予定日" },
        { key: "tankNo", label: "タンク" },
        { key: "status", label: "状態" },
        { key: "note", label: "備考" }
      ];
      filename = "jikomi.csv";
      break;
    case "/tanks":
      rows = state.tankList.map((record) => ({ ...record }));
      columns = [
        { key: "tankNo", label: "タンクNo." },
        { key: "capacity", label: "容量" },
        { key: "currentVolume", label: "現在量" },
        { key: "productName", label: "銘柄" },
        { key: "jikomiNo", label: "仕込番号" },
        { key: "status", label: "状態" },
        { key: "lastUpdated", label: "更新日" }
      ];
      filename = "tanks.csv";
      break;
    case "/kentei":
      rows = state.kenteiList.map((record) => ({ ...record }));
      columns = [
        { key: "kenteiNo", label: "検定番号" },
        { key: "jikomiNo", label: "仕込番号" },
        { key: "productName", label: "銘柄" },
        { key: "kenteiDate", label: "検定日" },
        { key: "alcoholDegree", label: "アルコール度数" },
        { key: "extractDegree", label: "エキス分" },
        { key: "sakaMeterValue", label: "酒度" },
        { key: "volume", label: "容量" },
        { key: "taxCategory", label: "酒類区分" },
        { key: "status", label: "状態" }
      ];
      filename = "kentei.csv";
      break;
    case "/materials":
      rows = state.materialList.map((record) => ({ ...record }));
      columns = [
        { key: "code", label: "コード" },
        { key: "name", label: "品名" },
        { key: "unit", label: "単位" },
        { key: "currentStock", label: "現在庫" },
        { key: "minimumStock", label: "最低在庫" },
        { key: "unitCost", label: "単価" },
        { key: "lastUpdated", label: "更新日" }
      ];
      filename = "materials.csv";
      break;
    case "/master":
      if (state.masterTab === "customers") {
        rows = state.masterStats?.customers.map((record) => ({ ...record })) ?? [];
        columns = [
          { key: "code", label: "得意先コード" },
          { key: "name", label: "得意先名" },
          { key: "closingDay", label: "締日" },
          { key: "paymentDay", label: "入金日" },
          { key: "isActive", label: "有効" }
        ];
        filename = "master-customers.csv";
      } else {
        rows = state.masterStats?.products.map((record) => ({ ...record })) ?? [];
        columns = [
          { key: "code", label: "商品コード" },
          { key: "janCode", label: "JAN" },
          { key: "name", label: "商品名" },
          { key: "category", label: "カテゴリ" },
          { key: "isActive", label: "有効" }
        ];
        filename = "master-products.csv";
      }
      break;
    default:
      return;
  }

  downloadCSV(filename, rows, columns);
}

function navigate(path: RoutePath): void {
  const target = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path === "/" ? "/" : path}`;
  history.pushState(null, "", target);
  state.route = path;
  state.currentCategory = inferCurrentCategory(path);
  state.sidebarOpen = false;
  closeGlobalSearch();
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
      case "/shipment-calendar": {
        const { fetchShipmentCalendar } = await import("./api");
        state.shipmentCalendarData = await fetchShipmentCalendar(state.shipmentCalendarYearMonth);
        break;
      }
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
      case "/product-power":
        if (state.productPower.length === 0) {
          state.productPower = await fetchProductPower();
        }
        break;
      case "/customer-efficiency":
        if (state.customerEfficiency.length === 0) {
          state.customerEfficiency = await fetchCustomerEfficiency();
        }
        break;
      case "/customer-analysis":
        if (!state.customerAnalysis) {
          state.customerAnalysis = await fetchCustomerAnalysis();
        }
        break;
      case "/demand-forecast":
        if (state.demandForecast.forecasts.length === 0) {
          const { fetchDemandForecasts, fetchDeliverySchedule } = await import("./api");
          const [dbForecasts, schedule] = await Promise.all([
            fetchDemandForecasts(),
            fetchDeliverySchedule()
          ]);
          // DB計算済みの予測をそのままstateに変換
          state.demandForecast.forecasts = dbForecasts.map((f) => ({
            code: f.productCode,
            name: f.productName,
            segment: f.segment as ProductionSegment,
            monthlyQuantity: new Array(12).fill(0),
            avgMonthly: Math.round(f.avgMonthly),
            adjustedAvg: Math.round(f.avgMonthly),
            nextMonthForecast: Math.round(f.forecastQuantity),
            annualForecast: Math.round(f.avgMonthly * 12),
            safetyStock: Math.round(f.safetyStock)
          }));
          state.demandForecast.deliveries = buildDeliveriesFromSchedule(schedule);
        }
        break;
      case "/churn-alert":
        if (!state.churnAlert) {
          // DB集計テーブルから読み取り → なければフォールバック
          const { fetchChurnAlerts } = await import("./api");
          const dbAlerts = await fetchChurnAlerts();
          if (dbAlerts.length > 0) {
            const dormant = dbAlerts.filter(a => a.is_dormant).map(a => ({
              code: a.customer_code, name: a.customer_name, businessType: a.business_type,
              areaCode: a.area_code, phone: a.phone, lastOrderDate: a.last_order_date,
              daysSinceLastOrder: a.days_since_order, totalAmountLast12m: a.amount_12m, status: "dormant" as const
            }));
            const atRisk = dbAlerts.filter(a => a.is_at_risk).map(a => ({
              code: a.customer_code, name: a.customer_name, businessType: a.business_type,
              areaCode: a.area_code, phone: a.phone, lastOrderDate: a.last_order_date,
              daysSinceLastOrder: a.days_since_order, totalAmountLast12m: a.amount_12m, status: "at-risk" as const
            }));
            state.churnAlert = { dormantCustomers: dormant, atRiskCustomers: atRisk };
          } else {
            // フォールバック: クライアント計算
            const { supabaseQueryAll } = await import("./supabase");
            const [headers, customers] = await Promise.all([
              supabaseQueryAll<{sales_date: string; legacy_customer_code: string; customer_name: string; total_amount: number | string}>("sales_document_headers", {
                select: "sales_date,legacy_customer_code,customer_name,total_amount"
              }),
              state.masterStats ? Promise.resolve(state.masterStats.customers) : fetchMasterStats().then(m => m.customers)
            ]);
            state.churnAlert = buildChurnAlertData(
              headers.map(h => ({ sales_date: h.sales_date || "", legacy_customer_code: h.legacy_customer_code || "", customer_name: h.customer_name || "", total_amount: Number(h.total_amount) || 0 })),
              (state.masterStats?.customers ?? customers).map(c => ({ code: c.code, name: c.name, businessType: c.businessType, areaCode: c.areaCode, phone: c.phone }))
            );
          }
        }
        break;
      case "/seasonal-calendar":
        if (!state.seasonalCalendar) {
          // DB集計テーブルから読み取り → なければフォールバック
          const { fetchProductShipmentsFromTable } = await import("./api");
          const dbShipments = await fetchProductShipmentsFromTable();
          if (dbShipments.length > 0) {
            state.seasonalCalendar = buildSeasonalData(
              dbShipments.map(s => ({ code: s.code, name: s.name, category: "", monthlyQuantity: s.monthlyQuantity }))
            );
          } else {
            const { fetchProductMonthlyShipments: fetchShipments } = await import("./api");
            const shipmentData = await fetchShipments();
            state.seasonalCalendar = buildSeasonalData(
              shipmentData.map(s => ({ code: s.code, name: s.name, category: "", monthlyQuantity: s.monthlyQuantity }))
            );
          }
        }
        break;
      case "/visit-planner":
        if (!state.visitPlanner) {
          // DB集計テーブルから読み取り → なければフォールバック
          const { fetchVisitPriorities } = await import("./api");
          const dbVisits = await fetchVisitPriorities();
          if (dbVisits.length > 0) {
            state.visitPlanner = {
              candidates: dbVisits.map(v => ({
                code: v.customer_code, name: v.customer_name, phone: v.phone,
                address: v.address, areaCode: v.area_code, businessType: v.business_type,
                priorityScore: v.priority_score, reasons: v.reasons,
                lastOrderDate: v.last_order_date, daysSinceOrder: v.days_since_order,
                annualRevenue: v.annual_revenue, recommendedAction: v.recommended_action
              })),
              weekPlan: [], filterArea: "", filterMinScore: 0
            };
            // 週間プランはクライアントで生成 (地区別グルーピング)
            state.visitPlanner = buildVisitPlan(
              dbVisits.map(v => ({
                code: v.customer_code, name: v.customer_name, phone: v.phone,
                address1: v.address, areaCode: v.area_code, businessType: v.business_type,
                annualRevenue: v.annual_revenue, lastOrderDate: v.last_order_date,
                hasSeasonalProposal: v.reasons.some(r => r.includes("季節"))
              }))
            );
          } else {
            // フォールバック
            const { supabaseQueryAll: queryAll } = await import("./supabase");
            const [hdrs, custs] = await Promise.all([
              queryAll<{sales_date: string; legacy_customer_code: string; total_amount: number | string}>("sales_document_headers", {
                select: "sales_date,legacy_customer_code,total_amount"
              }),
              state.masterStats ? Promise.resolve(state.masterStats.customers) : fetchMasterStats().then(m => m.customers)
            ]);
            const customerList = state.masterStats?.customers ?? custs;
            const revenueMap = new Map<string, { lastDate: string; total: number }>();
            hdrs.forEach(h => {
              const code = (h as Record<string, unknown>).legacy_customer_code as string || "";
              const date = (h as Record<string, unknown>).sales_date as string || "";
              const amt = Number((h as Record<string, unknown>).total_amount) || 0;
              const existing = revenueMap.get(code);
              if (!existing || date > existing.lastDate) {
                revenueMap.set(code, { lastDate: date, total: (existing?.total ?? 0) + amt });
              } else {
                existing.total += amt;
              }
            });
            state.visitPlanner = buildVisitPlan(
              customerList.filter(c => c.isActive).map(c => ({
                code: c.code, name: c.name, phone: c.phone, address1: c.address1,
                areaCode: c.areaCode, businessType: c.businessType,
                annualRevenue: revenueMap.get(c.code)?.total ?? 0,
                lastOrderDate: revenueMap.get(c.code)?.lastDate ?? "",
                hasSeasonalProposal: false
              }))
            );
          }
        }
        break;
      case "/demand": {
        const { fetchDemandAnalysis, fetchSafetyStockParams, fetchProductionPlan } = await import("./api");
        if (!state.demandAnalysis) {
          const [analysis, ssParams] = await Promise.all([
            fetchDemandAnalysis(state.demandYearsBack * 12),
            fetchSafetyStockParams()
          ]);
          state.demandAnalysis = analysis;
          state.safetyStockParams = ssParams;
        }
        // 生産計画: DBにあれば使い、なければ分析データから自動生成
        if (state.productionPlan.length === 0) {
          const dbPlan = await fetchProductionPlan(state.demandPlanYearMonth);
          if (dbPlan.length > 0) {
            state.productionPlan = dbPlan;
          } else if (state.demandAnalysis && state.safetyStockParams.length > 0) {
            const ym = state.demandPlanYearMonth;
            const recentMonths = state.demandAnalysis.months.filter((m) => m < ym).slice(-3);
            state.productionPlan = state.safetyStockParams
              .filter((p) => (state.demandAnalysis!.productAvg[p.productCode] ?? 0) >= 10)
              .map((p) => {
                const qtys = recentMonths.map((m) => state.demandAnalysis!.matrix[p.productCode]?.[m] ?? 0);
                const forecast = qtys.length > 0
                  ? Math.ceil(qtys.reduce((s, v) => s + v, 0) / qtys.length)
                  : Math.ceil(p.avgMonthlyDemand);
                const ss = Math.ceil(p.safetyStockQty);
                return {
                  id: "", yearMonth: ym,
                  productCode: p.productCode, productName: p.productName,
                  demandForecast: forecast, safetyStockTarget: ss, openingStock: 0,
                  requiredProduction: Math.max(0, forecast + ss),
                  plannedQty: Math.max(0, forecast + ss), actualQty: 0,
                  status: "draft" as const, productionType: "monthly" as const, notes: ""
                };
              });
          }
        }
        break;
      }
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
      case "/mail-senders":
      case "/email":
        {
          const { fetchMailSenders } = await import("./api");
          state.mailSenders = await fetchMailSenders();
          if (!state.emailSenderId || !state.mailSenders.find((s) => s.id === state.emailSenderId)) {
            const def = state.mailSenders.find((s) => s.isDefault) ?? state.mailSenders[0];
            if (def) state.emailSenderId = def.id;
          }
        }
        break;
      case "/calendar":
        {
          const { fetchCalendarEvents } = await import("./api");
          state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
        }
        break;
      case "/integrations":
        {
          const { fetchIntegrationSettings } = await import("./api");
          state.integrations = await fetchIntegrationSettings();
        }
        break;
      case "/shopify":
        {
          const { fetchShopifyOrders, fetchIntegrationSettings } = await import("./api");
          state.shopifyOrders = await fetchShopifyOrders();
          if (state.integrations.length === 0) state.integrations = await fetchIntegrationSettings();
        }
        break;
      case "/fax":
        {
          const { fetchFaxInbox, fetchIntegrationSettings } = await import("./api");
          state.faxRecords = await fetchFaxInbox();
          if (state.integrations.length === 0) state.integrations = await fetchIntegrationSettings();
        }
        break;
      case "/users":
        {
          const { fetchUserProfiles } = await import("./api");
          state.userProfiles = await fetchUserProfiles();
        }
        break;
      case "/profile":
        {
          const { fetchMyProfile, fetchAuditLogs, fetchMailSenders } = await import("./api");
          const email = state.user?.email ?? state.myProfile?.email ?? "";
          if (email) state.myProfile = await fetchMyProfile(email);
          if (state.mailSenders.length === 0) state.mailSenders = await fetchMailSenders();
          state.auditLogs = await fetchAuditLogs(50);
        }
        break;
      case "/audit":
        {
          const { fetchAuditLogs } = await import("./api");
          state.auditLogs = await fetchAuditLogs(200);
        }
        break;
      case "/prospects":
        {
          const { fetchProspects } = await import("./api");
          state.prospects = await fetchProspects();
        }
        break;
      case "/map":
        {
          const { fetchProspects, fetchDeliveryLocations, fetchIntegrationSettings } = await import("./api");
          state.prospects = await fetchProspects();
          state.deliveryLocations = await fetchDeliveryLocations();
          if (state.integrations.length === 0) state.integrations = await fetchIntegrationSettings();
        }
        break;
      case "/calls":
        {
          const { fetchCallLogs, fetchIntegrationSettings } = await import("./api");
          state.callLogs = await fetchCallLogs(100);
          if (state.integrations.length === 0) state.integrations = await fetchIntegrationSettings();
        }
        break;
      case "/list-builder":
        {
          const { fetchLeadLists, fetchIntegrationSettings } = await import("./api");
          state.leadLists = await fetchLeadLists();
          if (state.integrations.length === 0) state.integrations = await fetchIntegrationSettings();
        }
        break;
      case "/workflow":
        {
          const { fetchWorkflowOrdersFromDb } = await import("./api");
          state.workflowOrders = await fetchWorkflowOrdersFromDb();
        }
        break;
      case "/tour":
        {
          const { fetchTourInquiriesFromDb } = await import("./api");
          state.tourInquiries = await fetchTourInquiriesFromDb();
        }
        break;
      case "/slack":
        {
          const { fetchSlackRules, fetchSlackLogs, fetchIntegrationSettings } = await import("./api");
          state.slackRules = await fetchSlackRules();
          state.slackLogs = await fetchSlackLogs(50);
          if (state.integrations.length === 0) state.integrations = await fetchIntegrationSettings();
        }
        break;
      case "/":
        {
          // ダッシュボード追加データ取得
          const {
            fetchProspects,
            fetchCalendarEvents,
            fetchWorkflowOrdersFromDb,
            fetchTourInquiriesFromDb
          } = await import("./api");
          if (state.prospects.length === 0) state.prospects = await fetchProspects();
          if (state.calendarEvents.length === 0) state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
          if (state.materialList.length === 0) state.materialList = await fetchMaterialList();
          if (state.workflowOrders.length === 0) state.workflowOrders = await fetchWorkflowOrdersFromDb();
          if (state.tourInquiries.length === 0) state.tourInquiries = await fetchTourInquiriesFromDb();
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
  if (shouldShowLogin()) {
    return renderLoginScreen(state.authError, state.authSubmitting);
  }

  if (state.loading) {
    return `
      <section class="panel">
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
          <p class="loading-text">データを読み込んでいます…</p>
        </div>
      </section>`;
  }

  if (state.error) {
    return `
      <section class="panel error-card">
        <div class="empty-state-icon" style="background:#fbe9e9;color:var(--danger);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5"/><path d="M8 8L16 16M16 8L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${state.error}</p>
        <button class="button primary" onclick="location.reload()">再読込する</button>
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
      return renderInvoiceEntry(
        state.invoiceForm,
        state.invoiceSavedDocNo,
        state.invoiceSaving,
        state.invoiceErrors
      );
    case "/quote":
      return renderQuoteBuilder(
        state.quoteState,
        state.masterStats?.customers ?? [],
        state.masterStats?.products ?? [],
        state.quoteCustomerQuery,
        state.quoteProductQuery,
        state.quotePricing
      );
    case "/email":
      return renderEmailBroadcast(buildEmailViewState());
    case "/delivery":
      return state.deliveryNote
        ? renderDeliveryNote(state.deliveryNote, state.deliverySearchDocNo)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>`;
    case "/shipment-calendar":
      return renderShipmentCalendar(
        state.shipmentCalendarData,
        state.shipmentCalendarYearMonth,
        state.shipmentCalendarSelectedDate
      );
    case "/billing":
      return state.billingSummary
        ? renderBilling(state.billingSummary, state.billingYearMonth)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>`;
    case "/report":
      return state.salesReport
        ? renderSalesReport(state.salesReport)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>`;
    case "/product-power":
      return renderProductPower(state.productPower, state.productFilter as ProductViewFilter, state.productDaily, state.productPeriod as ProductPeriod, state.productCustomStart, state.productCustomEnd, state.productSortState);
    case "/customer-efficiency":
      return renderCustomerEfficiency(state.customerEfficiency, state.customerSortState);
    case "/customer-analysis":
      return state.customerAnalysis
        ? renderCustomerAnalysis(state.customerAnalysis)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>`;
    case "/product-power":
    case "/customer-efficiency":
      return state.productABC
        ? renderProductABC(state.productABC)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>`;
    case "/demand-forecast":
      return renderDemandForecast(state.demandForecast);
    case "/demand":
      return renderDemandPlanning(
        state.demandAnalysis,
        state.safetyStockParams,
        state.productionPlan,
        state.demandTab,
        state.demandPlanYearMonth,
        state.demandYearsBack
      );
    case "/churn-alert":
      return state.churnAlert
        ? renderChurnAlert(state.churnAlert)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>`;
    case "/seasonal-calendar":
      return state.seasonalCalendar
        ? renderSeasonalCalendar(state.seasonalCalendar)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>`;
    case "/visit-planner":
      return state.visitPlanner
        ? renderVisitPlanner(state.visitPlanner)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>`;
    case "/jikomi":
      return state.jikomiView === "calendar"
        ? `${renderJikomi(state.jikomiList, state.jikomiView)}${renderJikomiCalendar(state.jikomiList)}`
        : renderJikomi(state.jikomiList, state.jikomiView);
    case "/tanks":
      return renderTankList(state.tankList);
    case "/kentei":
      return renderKentei(state.kenteiList);
    case "/materials":
      return renderMaterials(state.materialList) + renderMaterialEditModal(state.materialEditing, state.materialEditingIsNew);
    case "/purchase":
      return renderPurchase(state.purchaseList, state.payableList);
    case "/raw-material":
      return renderRawMaterial(state.billList, state.rawStockList);
    case "/tax":
      return state.taxDeclaration
        ? renderTaxDeclaration(state.taxDeclaration, state.taxYear, state.taxMonth)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>`;
    case "/store":
      return renderStorePOS(
        state.storeSales,
        state.storeOrders,
        state.storeTab,
        state.storeSalesDate
      );
    case "/setup":
      return state.pipelineMeta
        ? renderRelaySetup(state.pipelineMeta, SUPABASE_URL, SUPABASE_ANON_KEY, state.syncDashboard)
        : `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>`;
    case "/raw-browser":
      return renderRawBrowser(
        state.rawSelectedTable,
        state.rawRecords,
        state.rawTableList,
        state.rawPage,
        state.rawTotalCount
      );
    case "/import":
      return renderDataImport(state.importEntity, state.importPreview, state.importing, state.importResult);
    case "/print":
      return renderPrintCenter(state.printTemplate, state.printOptions, state.printCompany, state.printData);
    case "/form-designer":
      return renderFormDesigner(state.printData, state.printCompany, state.printOptions, state.fdSavedPositions, state.fdDesignMode);
    case "/map": {
      // DBの実座標を優先、未設定の場合のみ仮配置
      const mapCustomers: GeoCustomer[] = (state.masterStats?.customers ?? []).slice(0, 200).map((c, i) => {
        const existing = c as unknown as { lat?: number; lng?: number; address1?: string; businessType?: string };
        return {
          ...c,
          lat: existing.lat ?? 35.37 + (i % 12) * 0.05 + (Math.random() - 0.5) * 0.02,
          lng: existing.lng ?? 139.29 + Math.floor(i / 12) * 0.05 + (Math.random() - 0.5) * 0.02,
          address1: existing.address1 ?? "",
          businessType: existing.businessType ?? "",
          lastOrderAmount: 0
        };
      });
      const gmKey = state.integrations.find((i) => i.provider === "google_maps")?.config["api_key"];
      const useGoogleMaps = Boolean(gmKey);
      return renderCustomerMap(
        mapCustomers,
        state.prospects,
        state.deliveryLocations,
        state.mapFilters,
        useGoogleMaps
      );
    }
    case "/workflow":
      return renderOrderWorkflow(state.workflowOrders);
    case "/mobile-order":
      return renderMobileOrder(
        state.mobileOrder,
        state.masterStats?.customers ?? [],
        state.masterStats?.products ?? []
      );
    case "/tour":
      return renderBreweryTour(state.tourInquiries, state.tourActiveId);
    case "/mail-senders":
      return renderMailSenders(state.mailSenders, state.mailSenderEditingId);
    case "/calendar":
      return renderCalendar(
        state.calendarEvents,
        state.calendarYearMonth,
        state.calendarFilterCategory,
        state.calendarEdit
      );
    case "/integrations":
      return renderIntegrations(state.integrations, state.integrationEditingId);
    case "/shopify": {
      const shopify = state.integrations.find((i) => i.id === "shopify");
      return renderShopifyOrders(state.shopifyOrders, shopify?.lastSyncAt ?? null);
    }
    case "/fax":
      return renderFaxOcr(state.faxRecords, state.faxProcessing, state.faxOcrText);
    case "/users":
      return renderUserManagement(state.userProfiles, state.userEditingId, state.myProfile);
    case "/profile":
      return renderUserProfile(
        state.myProfile,
        state.auditLogs.filter((l) => l.userEmail === state.myProfile?.email),
        state.mailSenders
      );
    case "/audit":
      return renderAuditLogs(state.auditLogs);
    case "/prospects": {
      const vs: ProspectsViewState = {
        prospects: state.prospects,
        activeId: null,
        activities: state.prospectActivities,
        editingId: state.prospectEditingId,
        viewMode: state.prospectViewMode
      };
      return renderProspects(vs);
    }
    case "/slack": {
      const slack = state.integrations.find((i) => i.provider === "slack") ?? null;
      return renderSlackSettings(slack, state.slackRules, state.slackLogs);
    }
    case "/calls": {
      const ivry = state.integrations.find((i) => i.provider === "ivry");
      return renderCallLogs(
        state.callLogs,
        state.masterStats?.customers ?? [],
        ivry?.lastSyncAt ?? null,
        ivry?.isEnabled ?? false
      );
    }
    case "/list-builder": {
      const vs: ListBuilderState = {
        lists: state.leadLists,
        activeListId: state.leadActiveListId,
        items: state.leadItems,
        searchQuery: state.leadSearchQuery,
        searchArea: state.leadSearchArea,
        searchBusinessType: state.leadSearchType,
        searching: state.leadSearching,
        searchResults: state.leadSearchResults
      };
      return renderListBuilder(vs);
    }
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
      return renderMasterStats(state.masterStats, state.masterTab, state.masterFilter, state.masterSortState);
    case "/invoice":
      return renderInvoiceSearch(state.invoiceRecords, state.invoiceFilter);
    case "/ledger":
      return renderCustomerLedger(state.customerLedger, state.ledgerCustomerCode);
    case "/analytics":
      return renderSalesAnalytics(state.salesAnalytics, state.analyticsTab, state.analyticsPeriod, state.analyticsPeriodFilter, state.analyticsPeriodRows, state.analyticsPeriodOptions, state.analyticsStaffFilter, state.analyticsTagFilter, state.analyticsStaffDrilldown, state.analyticsStaffPeriod, state.analyticsStaffPeriodFilter, state.analyticsStaffPeriodOptions, state.analyticsStaffTotals);
    case "/":
    default:
      return renderDashboard(state.salesSummary, state.pipelineMeta, state.salesAnalytics, {
        prospects: state.prospects,
        upcomingEvents: state.calendarEvents,
        tourInquiries: state.tourInquiries,
        workflowOrdersCount: {
          new: state.workflowOrders.filter((o) => o.stage === "new").length,
          picking: state.workflowOrders.filter((o) => o.stage === "picking").length,
          packed: state.workflowOrders.filter((o) => o.stage === "packed").length,
          shipped: state.workflowOrders.filter((o) => o.stage === "shipped").length,
          total: state.workflowOrders.length
        },
        lowStockCount: state.materialList.filter((m) => m.currentStock < m.minimumStock * 1.5).length,
        masterCounts: state.masterStats ? {
          customers: state.masterStats.summary.customerCount,
          products: state.masterStats.summary.productCount,
          suppliers: state.syncDashboard?.tables.find((t) => t.tableName === "suppliers")?.rowCount ?? 0,
          specialPrices: state.syncDashboard?.tables.find((t) => t.tableName === "customer_product_prices")?.rowCount ?? 0
        } : undefined
      }, state.salesPeriod, state.customRange, state.dashboardSortState);
  }
}

function renderAnnouncementBar(): string {
  const LEVEL_STYLES: Record<string, { bg: string; border: string; icon: string }> = {
    info: { bg: "#edf6ff", border: "#b8d4e8", icon: "ℹ️" },
    warning: { bg: "#fff8e6", border: "#e6c54d", icon: "⚠️" },
    maintenance: { bg: "#fff3e0", border: "#f5a623", icon: "🔧" },
    update: { bg: "#e8f5e9", border: "#66bb6a", icon: "🆕" }
  };

  const visibleAnnouncements = state.announcements.filter(
    (a) => !state.dismissedAnnouncements.has(a.id)
  );

  const bars = visibleAnnouncements.map((a) => {
    const s = LEVEL_STYLES[a.level] ?? LEVEL_STYLES.info;
    return `
      <div class="announcement-bar" style="background:${s.bg};border-bottom:2px solid ${s.border};">
        <span class="announcement-text">${s.icon} ${a.message}</span>
        ${a.dismissible ? `<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${a.id}" aria-label="閉じる">✕</button>` : ""}
      </div>`;
  }).join("");

  const updateBar = state.updateAvailable
    ? `<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`
    : "";

  return bars + updateBar;
}

function renderShell(): string {
  if (shouldShowLogin()) {
    return `
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${renderView()}</div>
        </main>
      </div>
    `;
  }

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
        label: "販売業務",
        items: [
          { path: "/invoice-entry", label: "伝票入力", kicker: "Entry" },
          { path: "/quote", label: "見積作成", kicker: "Quote" },
          { path: "/delivery", label: "納品書", kicker: "Delivery" },
          { path: "/shipment-calendar", label: "出荷カレンダー", kicker: "ShipCal" },
          { path: "/billing", label: "月次請求", kicker: "Billing" },
          { path: "/invoice", label: "伝票照会", kicker: "Invoice" },
          { path: "/ledger", label: "得意先台帳", kicker: "Ledger" }
        ]
      }
    ],
    analytics: [
      {
        label: "分析",
        items: [
          { path: "/analytics", label: "売上分析", kicker: "Analytics" },
          { path: "/customer-analysis", label: "得意先分析", kicker: "CustABC" },
                    { path: "/product-power", label: "商品力分析", kicker: "Power" },
          { path: "/customer-efficiency", label: "営業効率", kicker: "Efficiency" },
          { path: "/report", label: "集計帳票", kicker: "Report" }
        ]
      }
    ],
    crm: [
      {
        label: "営業ツール",
        items: [
          { path: "/churn-alert", label: "離反アラート", kicker: "Churn" },
          { path: "/seasonal-calendar", label: "季節提案", kicker: "Season" },
          { path: "/visit-planner", label: "訪問計画", kicker: "Visit" },
          { path: "/prospects", label: "新規営業", kicker: "Prospects" },
          { path: "/map", label: "取引先マップ", kicker: "Map" },
          { path: "/list-builder", label: "リスト取得", kicker: "ListBuild" },
          { path: "/calls", label: "通話履歴", kicker: "Calls" },
          { path: "/email", label: "メール配信", kicker: "Mail" }
        ]
      },
      {
        label: "受注・出荷",
        items: [
          { path: "/workflow", label: "受注ワークフロー", kicker: "Workflow" },
          { path: "/mobile-order", label: "モバイル受注", kicker: "Mobile" },
          { path: "/shopify", label: "Shopify注文", kicker: "Shopify" },
          { path: "/fax", label: "FAX OCR", kicker: "FAX" }
        ]
      }
    ],
    orders: [
      {
        label: "仕入・調達",
        items: [
          { path: "/purchase", label: "仕入・買掛", kicker: "Purchase" },
          { path: "/raw-material", label: "手形・原料", kicker: "RawMat" }
        ]
      }
    ],
    brewery: [
      {
        label: "製造管理",
        items: [
          { path: "/jikomi", label: "仕込管理", kicker: "Jikomi" },
          { path: "/tanks", label: "タンク管理", kicker: "Tank" },
          { path: "/kentei", label: "検定管理", kicker: "Kentei" },
          { path: "/materials", label: "資材管理", kicker: "Material" },
          { path: "/tax", label: "酒税申告", kicker: "Tax" },
          { path: "/demand", label: "需要・生産計画", kicker: "Demand" }
        ]
      }
    ],
    master: [
      {
        label: "マスタ・ツール",
        items: [
          { path: "/master", label: "マスタ管理", kicker: "Master" },
          { path: "/calendar", label: "カレンダー", kicker: "Calendar" },
          { path: "/store", label: "店舗・直売所", kicker: "Store" },
          { path: "/tour", label: "酒蔵見学", kicker: "Tour" },
          { path: "/print", label: "印刷", kicker: "Print" }
        ]
      }
    ],
    settings: [
      {
        label: "システム設定",
        items: [
          { path: "/setup", label: "連動設定", kicker: "Setup" },
          { path: "/integrations", label: "外部連携", kicker: "API" },
          { path: "/slack", label: "Slack通知", kicker: "Slack" },
          { path: "/import", label: "データ取込", kicker: "Import" },
          { path: "/raw-browser", label: "データブラウザ", kicker: "RawData" },
          { path: "/users", label: "ユーザー管理", kicker: "Users" },
          { path: "/profile", label: "プロフィール", kicker: "Profile" },
          { path: "/audit", label: "操作ログ", kicker: "Audit" }
        ]
      }
    ]
  };

  const topLevelItems: Array<{ category: CategoryKey; path: RoutePath; label: string }> = [
    { category: "dashboard", path: "/", label: "ダッシュボード" },
    { category: "sales", path: "/invoice-entry", label: "販売" },
    { category: "analytics", path: "/analytics", label: "分析" },
    { category: "crm", path: "/prospects", label: "営業" },
    { category: "orders", path: "/purchase", label: "仕入" },
    { category: "brewery", path: "/jikomi", label: "製造" },
    { category: "master", path: "/master", label: "マスタ" },
    { category: "settings", path: "/setup", label: "設定" }
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

  const pickerHtml =
    state.pickerMode && state.masterStats
      ? state.pickerMode === "customer"
        ? renderCustomerPicker(state.masterStats.customers, state.pickerQuery)
        : renderProductPicker(state.masterStats.products, state.pickerQuery)
      : "";

  const globalSearchHtml = state.globalSearchOpen
    ? renderGlobalSearch(state.globalQuery, getGlobalSearchResults())
    : "";

  const userHtml = state.user
    ? `
        <div class="user-badge">
          <span>${state.user.email}</span>
          <button class="button secondary" type="button" data-action="auth-logout">ログアウト</button>
        </div>
      `
    : state.authSkipped
      ? `<div class="user-badge demo">デモモード</div>`
      : "";

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
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${userHtml}
        </header>
        ${renderAnnouncementBar()}
        <div class="view ${state.actionLoading ? "is-busy" : ""}">${renderView()}</div>
      </main>
      ${pickerHtml}
      ${globalSearchHtml}
    </div>
  `;
}

async function reloadSalesSummary(): Promise<void> {
  state.actionLoading = true;
  renderApp();
  try {
    const { fetchSalesSummary } = await import("./api");
    state.salesSummary = await fetchSalesSummary();
  } finally {
    state.actionLoading = false;
    renderApp();
  }
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
  state.invoiceForm.customerCode = state.invoiceForm.customerCode.trim().toUpperCase();
  state.invoiceForm.customerName = state.invoiceForm.customerName.trim();
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
  root.querySelector<HTMLButtonElement>("[data-action='global-search-open']")?.addEventListener("click", () => {
    state.globalSearchOpen = true;
    renderApp();
  });

  root.querySelectorAll<HTMLElement>("[data-action='global-search-close']").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (
        element.classList.contains("global-search") &&
        event.target instanceof HTMLElement &&
        !event.target.classList.contains("global-search")
      ) {
        return;
      }
      closeGlobalSearch();
      renderApp();
    });
  });

  root.querySelector<HTMLInputElement>("#global-search-input")?.addEventListener("input", (event) => {
    state.globalQuery = (event.target as HTMLInputElement).value;
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='global-nav']").forEach((button) => {
    button.addEventListener("click", () => {
      const path = button.dataset.path as RoutePath | undefined;
      if (!path) return;
      closeGlobalSearch();
      navigate(path);
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='csv-export']")?.addEventListener("click", () => {
    exportCurrentRouteCsv();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-jikomi-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.jikomiView = button.dataset.jikomiTab as "list" | "calendar";
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='auth-login']")?.addEventListener("click", () => {
    const email = root.querySelector<HTMLInputElement>("#auth-email")?.value.trim() ?? "";
    const password = root.querySelector<HTMLInputElement>("#auth-password")?.value ?? "";
    state.authSubmitting = true;
    state.authError = null;
    renderApp();
    void signIn(email, password)
      .then(async (user) => {
        state.user = user;
        state.authSkipped = false;
        state.authSubmitting = false;
        state.authError = null;
        const { fetchMyProfile, recordAudit } = await import("./api");
        state.myProfile = await fetchMyProfile(user.email);
        await recordAudit({ action: "sign_in", userEmail: user.email });
        renderApp();
      })
      .catch(async (error) => {
        try {
          const user = await signUp(email, password);
          state.user = user;
          state.authSkipped = false;
          state.authError = null;
          const { fetchMyProfile } = await import("./api");
          state.myProfile = await fetchMyProfile(user.email);
        } catch {
          state.authError = error instanceof Error ? error.message : "ログインに失敗しました。";
        } finally {
          state.authSubmitting = false;
          renderApp();
        }
      });
  });

  root.querySelector<HTMLButtonElement>("[data-action='auth-skip']")?.addEventListener("click", () => {
    state.authSkipped = true;
    state.authError = null;
    renderApp();
  });

  root.querySelector<HTMLButtonElement>("[data-action='auth-logout']")?.addEventListener("click", () => {
    void signOut().finally(() => {
      location.reload();
    });
  });

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

  // サイドバーのスワイプで閉じる
  const sidebar = root.querySelector<HTMLElement>(".sidebar");
  if (sidebar && state.sidebarOpen) {
    let touchStartX = 0;
    sidebar.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    sidebar.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (dx < -60) {
        state.sidebarOpen = false;
        renderApp();
      }
    }, { passive: true });
  }

  // お知らせバーの閉じるボタン
  root.querySelectorAll<HTMLButtonElement>("[data-action='dismiss-announcement']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id ?? "";
      state.dismissedAnnouncements.add(id);
      renderApp();
    });
  });

  // アプデ通知のリロードボタン
  root.querySelector<HTMLButtonElement>("[data-action='reload-app']")?.addEventListener("click", () => {
    location.reload();
  });

  root.querySelectorAll<HTMLElement>("[data-link]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      navigate(element.dataset.link as RoutePath);
    });
  });

  root.querySelector<HTMLFormElement>("#feature-request-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = root.querySelector<HTMLInputElement>("#fr-title")?.value ?? "";
    const category = root.querySelector<HTMLSelectElement>("#fr-category")?.value ?? "feature";
    const description = root.querySelector<HTMLTextAreaElement>("#fr-description")?.value ?? "";
    const result = root.querySelector<HTMLSpanElement>("#fr-result");
    if (!title.trim()) return;
    const ok = await submitFeatureRequest(title, category, description);
    if (result) {
      result.textContent = ok ? "送信しました" : "送信に失敗しました";
      result.className = `fr-result ${ok ? "success" : "error"}`;
    }
    if (ok) {
      const form = root.querySelector<HTMLFormElement>("#feature-request-form");
      if (form) form.reset();
    }
  });

  root.querySelectorAll<HTMLButtonElement>("[data-period]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.salesPeriod = btn.dataset.period as SalesPeriod;
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='apply-range']")?.addEventListener("click", () => {
    const start = root.querySelector<HTMLInputElement>("#range-start")?.value ?? "";
    const end = root.querySelector<HTMLInputElement>("#range-end")?.value ?? "";
    if (start && end) {
      state.customRange = { start, end };
      state.salesPeriod = "custom";
      renderApp();
    }
  });

  // マスタ編集ボタン
  root.querySelectorAll<HTMLButtonElement>("[data-edit-customer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.editCustomer ?? "";
      const cust = state.masterStats?.customers.find((c) => c.id === id);
      if (!cust) return;
      const modal = document.createElement("div");
      modal.innerHTML = renderEditCustomerModal(cust);
      document.body.appendChild(modal.firstElementChild!);
      document.querySelector("[data-action='close-modal']")?.addEventListener("click", () => {
        document.getElementById("edit-modal")?.remove();
      });
      document.getElementById("edit-customer-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const r = document.getElementById("edit-result") as HTMLSpanElement;
        const ok = await updateCustomer(id, {
          name: (document.getElementById("ec-name") as HTMLInputElement).value,
          kana_name: (document.getElementById("ec-kana") as HTMLInputElement).value,
          phone: (document.getElementById("ec-phone") as HTMLInputElement).value,
          fax: (document.getElementById("ec-fax") as HTMLInputElement).value,
          postal_code: (document.getElementById("ec-postal") as HTMLInputElement).value,
          address1: (document.getElementById("ec-address") as HTMLInputElement).value,
          closing_day: parseInt((document.getElementById("ec-closing") as HTMLInputElement).value) || null,
          payment_day: parseInt((document.getElementById("ec-payment") as HTMLInputElement).value) || null,
          manual_override: true,
        });
        if (r) { r.textContent = ok ? "保存しました" : "保存に失敗"; r.className = `fr-result ${ok ? "success" : "error"}`; }
        if (ok) { document.getElementById("edit-modal")?.remove(); void loadData(); }
      });
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-edit-product]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.editProduct ?? "";
      const prod = state.masterStats?.products.find((p) => p.id === id);
      if (!prod) return;
      const modal = document.createElement("div");
      modal.innerHTML = renderEditProductModal(prod);
      document.body.appendChild(modal.firstElementChild!);
      document.querySelector("[data-action='close-modal']")?.addEventListener("click", () => {
        document.getElementById("edit-modal")?.remove();
      });
      document.getElementById("edit-product-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const r = document.getElementById("edit-result") as HTMLSpanElement;
        const ok = await updateProduct(id, {
          name: (document.getElementById("ep-name") as HTMLInputElement).value,
          category_code: (document.getElementById("ep-category") as HTMLInputElement).value,
          alcohol_degree: parseFloat((document.getElementById("ep-alcohol") as HTMLInputElement).value) || null,
          volume_ml: parseInt((document.getElementById("ep-volume") as HTMLInputElement).value) || null,
          bottle_type: (document.getElementById("ep-bottle") as HTMLInputElement).value,
          purchase_price: parseInt((document.getElementById("ep-purchase") as HTMLInputElement).value) || null,
          default_sale_price: parseInt((document.getElementById("ep-sale") as HTMLInputElement).value) || null,
          manual_override: true,
        });
        if (r) { r.textContent = ok ? "保存しました" : "保存に失敗"; r.className = `fr-result ${ok ? "success" : "error"}`; }
        if (ok) { document.getElementById("edit-modal")?.remove(); void loadData(); }
      });
    });
  });

  // 見積もり作成
  root.querySelector<HTMLInputElement>("#q-cust-search")?.addEventListener("input", (e) => {
    state.quoteCustomerQuery = (e.target as HTMLInputElement).value;
    renderApp();
  });
  root.querySelector<HTMLInputElement>("#q-prod-search")?.addEventListener("input", (e) => {
    state.quoteProductQuery = (e.target as HTMLInputElement).value;
    renderApp();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-select-customer]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const custCode = btn.dataset.selectCustomer ?? "";
      state.quoteState.customerCode = custCode;
      state.quoteState.customerName = btn.dataset.custName ?? "";
      state.quoteState.customerAddress = btn.dataset.custAddr ?? "";
      state.quoteCustomerQuery = "";
      // 価格テーブル読込（個別単価 + price_type）
      state.quotePricing = await fetchCustomerPricing(state.masterStats?.customers ?? [], custCode);
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-add-product]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.addProduct ?? "";
      const name = btn.dataset.prodName ?? "";
      const price = parseInt(btn.dataset.prodPrice ?? "0");
      state.quoteState.lines.push({ productCode: code, productName: name, quantity: 1, unit: "本", unitPrice: price, amount: price });
      state.quoteProductQuery = "";
      renderApp();
    });
  });
  root.querySelectorAll<HTMLInputElement>(".qty-input").forEach((inp) => {
    inp.addEventListener("change", () => {
      const idx = parseInt(inp.dataset.lineIdx ?? "0");
      const line = state.quoteState.lines[idx];
      if (line) { line.quantity = parseInt(inp.value) || 0; line.amount = line.quantity * line.unitPrice; renderApp(); }
    });
  });
  root.querySelectorAll<HTMLInputElement>(".price-input").forEach((inp) => {
    inp.addEventListener("change", () => {
      const idx = parseInt(inp.dataset.lineIdx ?? "0");
      const line = state.quoteState.lines[idx];
      if (line) { line.unitPrice = parseInt(inp.value) || 0; line.amount = line.quantity * line.unitPrice; renderApp(); }
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-remove-line]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.removeLine ?? "0");
      state.quoteState.lines.splice(idx, 1);
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='save-quote']")?.addEventListener("click", async () => {
    const q = state.quoteState;
    q.quoteNo = q.quoteNo || `Q${Date.now().toString(36).toUpperCase()}`;
    q.quoteDate = (document.getElementById("q-date") as HTMLInputElement)?.value ?? q.quoteDate;
    q.validUntil = (document.getElementById("q-valid") as HTMLInputElement)?.value ?? "";
    q.subject = (document.getElementById("q-subject") as HTMLInputElement)?.value ?? "";
    q.remarks = (document.getElementById("q-remarks") as HTMLTextAreaElement)?.value ?? "";
    q.deliveryDate = (document.getElementById("q-delivery-date") as HTMLInputElement)?.value ?? q.deliveryDate;
    q.paymentTerms = (document.getElementById("q-payment-terms") as HTMLInputElement)?.value ?? q.paymentTerms;
    q.deliveryPlace = (document.getElementById("q-delivery-place") as HTMLInputElement)?.value ?? q.deliveryPlace;
    q.fieldConfig.headerNote = (document.getElementById("q-header-note") as HTMLInputElement)?.value ?? q.fieldConfig.headerNote;
    q.fieldConfig.footerNote = (document.getElementById("q-footer-note") as HTMLInputElement)?.value ?? q.fieldConfig.footerNote;
    const subtotal = q.lines.reduce((s, l) => s + l.amount, 0);
    const tax = Math.round(subtotal * q.taxRate / 100);
    const { supabaseInsert: insert } = await import("./supabase");
    const saved = await insert<{ id: string }>("quotes", {
      quote_no: q.quoteNo, quote_date: q.quoteDate, valid_until: q.validUntil || null,
      legacy_customer_code: q.customerCode, customer_name: q.customerName,
      customer_address: q.customerAddress, subject: q.subject,
      subtotal, tax_amount: tax, total_amount: subtotal + tax, remarks: q.remarks
    });
    if (saved?.id) {
      for (let i = 0; i < q.lines.length; i++) {
        const l = q.lines[i];
        await insert("quote_lines", {
          quote_id: saved.id, line_no: i + 1,
          legacy_product_code: l.productCode, product_name: l.productName,
          quantity: l.quantity, unit: l.unit, unit_price: l.unitPrice, amount: l.amount
        });
      }
      alert(`見積 ${q.quoteNo} を保存しました`);
      state.quoteState = { ...defaultQuoteState };
      renderApp();
    }
  });

  // Quote: preview mode toggle
  root.querySelector<HTMLButtonElement>("[data-action='quote-preview-mode']")?.addEventListener("click", () => {
    const q = state.quoteState;
    q.quoteDate = (document.getElementById("q-date") as HTMLInputElement)?.value ?? q.quoteDate;
    q.validUntil = (document.getElementById("q-valid") as HTMLInputElement)?.value ?? q.validUntil;
    q.subject = (document.getElementById("q-subject") as HTMLInputElement)?.value ?? q.subject;
    q.remarks = (document.getElementById("q-remarks") as HTMLTextAreaElement)?.value ?? q.remarks;
    q.quoteNo = (document.getElementById("q-no") as HTMLInputElement)?.value ?? q.quoteNo;
    q.deliveryDate = (document.getElementById("q-delivery-date") as HTMLInputElement)?.value ?? q.deliveryDate;
    q.paymentTerms = (document.getElementById("q-payment-terms") as HTMLInputElement)?.value ?? q.paymentTerms;
    q.deliveryPlace = (document.getElementById("q-delivery-place") as HTMLInputElement)?.value ?? q.deliveryPlace;
    q.fieldConfig.headerNote = (document.getElementById("q-header-note") as HTMLInputElement)?.value ?? q.fieldConfig.headerNote;
    q.fieldConfig.footerNote = (document.getElementById("q-footer-note") as HTMLInputElement)?.value ?? q.fieldConfig.footerNote;
    q.previewMode = true;
    renderApp();
  });

  root.querySelector<HTMLButtonElement>("[data-action='quote-edit-mode']")?.addEventListener("click", () => {
    state.quoteState.previewMode = false;
    renderApp();
  });

  // Quote: PDF download
  root.querySelector<HTMLButtonElement>("[data-action='quote-download-pdf']")?.addEventListener("click", () => {
    const q = state.quoteState;
    // Sync current form values before PDF
    if (!q.previewMode) {
      q.quoteDate = (document.getElementById("q-date") as HTMLInputElement)?.value ?? q.quoteDate;
      q.validUntil = (document.getElementById("q-valid") as HTMLInputElement)?.value ?? q.validUntil;
      q.subject = (document.getElementById("q-subject") as HTMLInputElement)?.value ?? q.subject;
      q.remarks = (document.getElementById("q-remarks") as HTMLTextAreaElement)?.value ?? q.remarks;
      q.quoteNo = (document.getElementById("q-no") as HTMLInputElement)?.value ?? q.quoteNo;
      q.deliveryDate = (document.getElementById("q-delivery-date") as HTMLInputElement)?.value ?? q.deliveryDate;
      q.paymentTerms = (document.getElementById("q-payment-terms") as HTMLInputElement)?.value ?? q.paymentTerms;
      q.deliveryPlace = (document.getElementById("q-delivery-place") as HTMLInputElement)?.value ?? q.deliveryPlace;
      q.fieldConfig.headerNote = (document.getElementById("q-header-note") as HTMLInputElement)?.value ?? q.fieldConfig.headerNote;
      q.fieldConfig.footerNote = (document.getElementById("q-footer-note") as HTMLInputElement)?.value ?? q.fieldConfig.footerNote;
    }
    generateQuotePdf(q);
  });

  // Quote: field config toggles
  root.querySelectorAll<HTMLInputElement>("[data-field-toggle]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const key = cb.dataset.fieldToggle as keyof typeof state.quoteState.fieldConfig;
      if (key && typeof state.quoteState.fieldConfig[key] === "boolean") {
        (state.quoteState.fieldConfig as Record<string, unknown>)[key] = cb.checked;
        renderApp();
      }
    });
  });

  // Quote: seal file upload
  root.querySelector<HTMLInputElement>("#q-seal-file")?.addEventListener("change", (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.quoteState.sealSettings = { imageDataUrl: reader.result as string, size: 72 };
      // Persist to localStorage
      localStorage.setItem("quote-seal", JSON.stringify(state.quoteState.sealSettings));
      renderApp();
    };
    reader.readAsDataURL(file);
  });

  // Quote: seal size slider
  root.querySelector<HTMLInputElement>("#q-seal-size")?.addEventListener("input", (e) => {
    const size = parseInt((e.target as HTMLInputElement).value);
    if (state.quoteState.sealSettings) {
      state.quoteState.sealSettings.size = size;
      localStorage.setItem("quote-seal", JSON.stringify(state.quoteState.sealSettings));
      renderApp();
    }
  });

  // Quote: remove seal
  root.querySelector<HTMLButtonElement>("[data-action='remove-seal']")?.addEventListener("click", () => {
    state.quoteState.sealSettings = null;
    localStorage.removeItem("quote-seal");
    renderApp();
  });

  // Demand forecast: calendar navigation
  root.querySelectorAll<HTMLButtonElement>("[data-action='dcal-prev'],[data-action='dcal-next']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const month = btn.dataset.month;
      if (month) { state.demandForecast.calendarMonth = month; renderApp(); }
    });
  });
  // Demand forecast: segment filter
  root.querySelectorAll<HTMLButtonElement>("[data-action='forecast-segment']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const seg = btn.dataset.segment as ProductionSegment | "all";
      state.demandForecast.selectedSegment = seg;
      renderApp();
    });
  });

  // Demand planning: tab switch
  root.querySelectorAll<HTMLButtonElement>("[data-demand-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.demandTab as DemandTab;
      if (tab) { state.demandTab = tab; renderApp(); }
    });
  });

  // Demand planning: 需要実績から生産計画を自動生成するヘルパー
  function buildPlanFromAnalysis(ym: string): import("./api").ProductionPlanRow[] {
    const analysis = state.demandAnalysis;
    const ssParams = state.safetyStockParams;
    if (!analysis || ssParams.length === 0) return [];

    // 対象月より前の直近3ヶ月
    const recentMonths = analysis.months.filter((m) => m < ym).slice(-3);

    return ssParams
      .filter((p) => (analysis.productAvg[p.productCode] ?? 0) >= 10)
      .map((p) => {
        const recentQtys = recentMonths.map((m) => analysis.matrix[p.productCode]?.[m] ?? 0);
        const forecast = recentQtys.length > 0
          ? Math.ceil(recentQtys.reduce((s, v) => s + v, 0) / recentQtys.length)
          : Math.ceil(p.avgMonthlyDemand);
        const ss = Math.ceil(p.safetyStockQty);
        const required = Math.max(0, forecast + ss);
        return {
          id: "",
          yearMonth: ym,
          productCode: p.productCode,
          productName: p.productName,
          demandForecast: forecast,
          safetyStockTarget: ss,
          openingStock: 0,
          requiredProduction: required,
          plannedQty: required,
          actualQty: 0,
          status: "draft" as const,
          productionType: (p as any).productionType ?? "monthly",
          notes: ""
        };
      });
  }

  // Demand planning: 対象期間（年数）変更 → 分析データを再取得
  root.querySelector<HTMLSelectElement>("[data-action='demand-years-back']")?.addEventListener("change", async (e) => {
    const years = parseInt((e.target as HTMLSelectElement).value) || 3;
    state.demandYearsBack = years;
    state.demandAnalysis = null;  // 再取得トリガー
    const { fetchDemandAnalysis } = await import("./api");
    state.demandAnalysis = await fetchDemandAnalysis(years * 12);
    renderApp();
  });

  // Demand planning: 安全在庫 一括適用
  root.querySelector<HTMLButtonElement>("[data-action='bulk-apply-safety']")?.addEventListener("click", () => {
    const sl = parseFloat((document.getElementById("bulk-service-level") as HTMLSelectElement)?.value ?? "0.95");
    const lt = parseInt((document.getElementById("bulk-lead-time") as HTMLInputElement)?.value ?? "30");
    state.safetyStockParams = state.safetyStockParams.map((p) => {
      const z = sl >= 0.99 ? 2.33 : sl >= 0.97 ? 1.88 : sl >= 0.95 ? 1.65 : sl >= 0.90 ? 1.28 : 1.04;
      const ltMonths = lt / 30;
      const ss = Math.ceil(z * p.demandStdDev * Math.sqrt(ltMonths));
      const rop = Math.ceil(p.avgMonthlyDemand * ltMonths + ss);
      return { ...p, serviceLevel: sl, leadTimeDays: lt, safetyStockQty: ss, reorderPoint: rop };
    });
    renderApp();
  });

  // Demand planning: 生産区分変更（即座にstate反映）
  root.querySelectorAll<HTMLSelectElement>("[data-action='plan-prod-type']").forEach((sel) => {
    sel.addEventListener("change", () => {
      const code = sel.dataset.code ?? "";
      const pt = sel.value as import("./api").ProductionType;
      state.productionPlan = state.productionPlan.map((r) =>
        r.productCode === code ? { ...r, productionType: pt } : r
      );
    });
  });

  // Demand planning: 年月切り替え → DBから取得し、空なら自動生成
  root.querySelector<HTMLSelectElement>("[data-action='plan-year-month']")?.addEventListener("change", async (e) => {
    const ym = (e.target as HTMLSelectElement).value;
    if (!ym) return;
    state.demandPlanYearMonth = ym;
    const { fetchProductionPlan } = await import("./api");
    const rows = await fetchProductionPlan(ym);
    state.productionPlan = rows.length > 0 ? rows : buildPlanFromAnalysis(ym);
    renderApp();
  });

  // Demand planning: 需要予測を再計算ボタン
  root.querySelector<HTMLButtonElement>("[data-action='plan-recalc']")?.addEventListener("click", () => {
    state.productionPlan = buildPlanFromAnalysis(state.demandPlanYearMonth);
    renderApp();
  });

  // Demand planning: 計画を保存ボタン（全行一括）
  root.querySelector<HTMLButtonElement>("[data-action='plan-save']")?.addEventListener("click", async () => {
    if (state.productionPlan.length === 0) return;
    // 画面上の入力値を state に反映してから保存
    root.querySelectorAll<HTMLInputElement>("[data-action='plan-qty']").forEach((input) => {
      const code = input.dataset.code ?? "";
      const row = state.productionPlan.find((r) => r.productCode === code);
      if (row) row.plannedQty = parseFloat(input.value) || 0;
    });
    const { saveProductionPlan } = await import("./api");
    await Promise.all(state.productionPlan.map((r) => saveProductionPlan(r)));
    // 保存後 state.productionPlan の id を DB から再取得して同期
    const { fetchProductionPlan } = await import("./api");
    state.productionPlan = await fetchProductionPlan(state.demandPlanYearMonth);
    renderApp();
  });

  // Seasonal calendar: month selection
  root.querySelectorAll<HTMLButtonElement>("[data-action='select-month']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const month = parseInt(btn.dataset.month ?? "0");
      if (state.seasonalCalendar) { state.seasonalCalendar.selectedMonth = month; renderApp(); }
    });
  });

  // Visit planner: area filter
  root.querySelector<HTMLSelectElement>("#visit-filter-area")?.addEventListener("change", (e) => {
    if (state.visitPlanner) { state.visitPlanner.filterArea = (e.target as HTMLSelectElement).value; renderApp(); }
  });
  root.querySelector<HTMLInputElement>("#visit-filter-score")?.addEventListener("change", (e) => {
    if (state.visitPlanner) { state.visitPlanner.filterMinScore = parseInt((e.target as HTMLInputElement).value) || 0; renderApp(); }
  });

  root.querySelectorAll<HTMLElement>("[data-sort-col]").forEach((th) => {
    th.addEventListener("click", (e) => {
      const col = th.dataset.sortCol ?? "";
      const multi = (e as MouseEvent).shiftKey;
      if (state.route === "/product-power") {
        state.productSortState = toggleSort(state.productSortState, col, multi);
      } else if (state.route === "/customer-efficiency") {
        state.customerSortState = toggleSort(state.customerSortState, col, multi);
      } else if (state.route === "/" || state.route === "/sales") {
        state.dashboardSortState = toggleSort(state.dashboardSortState, col, multi);
      } else if (state.route === "/master") {
        state.masterSortState = toggleSort(state.masterSortState, col, multi);
      }
      renderApp();
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-product-period]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.productPeriod = (btn.dataset.productPeriod ?? "year") as ProductPeriod;
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='pp-apply-range']")?.addEventListener("click", () => {
    const start = (document.getElementById("pp-range-start") as HTMLInputElement)?.value ?? "";
    const end = (document.getElementById("pp-range-end") as HTMLInputElement)?.value ?? "";
    if (start && end) {
      state.productCustomStart = start;
      state.productCustomEnd = end;
      state.productPeriod = "custom";
      renderApp();
    }
  });

  root.querySelectorAll<HTMLButtonElement>("[data-product-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.productFilter = (btn.dataset.productFilter ?? "all") as ProductViewFilter;
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='dashboard-refresh']")?.addEventListener("click", async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = "更新中…";
    await loadData();
    btn.disabled = false;
    btn.textContent = "↻ 更新";
    showToast("ダッシュボードを更新しました", "success");
  });

  root.querySelector<HTMLButtonElement>("[data-action='sales-filter']")?.addEventListener("click", () => {
    const start = root.querySelector<HTMLInputElement>("#sales-start")?.value ?? "";
    const end = root.querySelector<HTMLInputElement>("#sales-end")?.value ?? "";
    state.salesFilter = { startDate: start, endDate: end };
    void reloadSalesSummary();
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
      state.masterFilter = { ...defaultMasterFilter };
      renderApp();
    });
  });

  // マスタ検索・フィルタ
  root.querySelector<HTMLButtonElement>("[data-action='master-filter']")?.addEventListener("click", () => {
    state.masterFilter = {
      query: root.querySelector<HTMLInputElement>("#master-search")?.value ?? "",
      businessType: root.querySelector<HTMLSelectElement>("#master-business-type")?.value ?? "",
      areaCode: root.querySelector<HTMLSelectElement>("#master-area-code")?.value ?? "",
      activeOnly: root.querySelector<HTMLSelectElement>("#master-active-only")?.value ?? "",
      page: 1
    };
    renderApp();
  });

  root.querySelector<HTMLInputElement>("#master-search")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      root.querySelector<HTMLButtonElement>("[data-action='master-filter']")?.click();
    }
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='master-page']").forEach((button) => {
    button.addEventListener("click", () => {
      const page = Number(button.dataset.page);
      if (page >= 1) {
        state.masterFilter = { ...state.masterFilter, page };
        renderApp();
      }
    });
  });

  // rawデータブラウザ
  root.querySelectorAll<HTMLButtonElement>("[data-action='raw-select-table']").forEach((button) => {
    button.addEventListener("click", async () => {
      const table = button.dataset.table;
      if (!table) return;
      state.rawSelectedTable = table;
      state.rawPage = 1;
      const result = await fetchRawRecords(table, 1);
      state.rawRecords = result.records;
      state.rawTotalCount = result.total;
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='raw-page-prev']")?.addEventListener("click", async () => {
    if (!state.rawSelectedTable || state.rawPage <= 1) return;
    state.rawPage -= 1;
    const result = await fetchRawRecords(state.rawSelectedTable, state.rawPage);
    state.rawRecords = result.records;
    state.rawTotalCount = result.total;
    renderApp();
  });

  root.querySelector<HTMLButtonElement>("[data-action='raw-page-next']")?.addEventListener("click", async () => {
    if (!state.rawSelectedTable) return;
    state.rawPage += 1;
    const result = await fetchRawRecords(state.rawSelectedTable, state.rawPage);
    state.rawRecords = result.records;
    state.rawTotalCount = result.total;
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-analytics-tab]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.analyticsTab = button.dataset.analyticsTab as AnalyticsTab;
      state.analyticsStaffDrilldown = null;
      if (state.analyticsTab === "staff") {
        // staffタブは独自期間状態を維持、products/customers期間は触らない
      } else if (state.analyticsPeriod !== "all") {
        const { fetchAnalyticsByPeriod, fetchAvailablePeriods } = await import("./api");
        state.analyticsPeriodOptions = await fetchAvailablePeriods(state.analyticsTab, state.analyticsPeriod);
        state.analyticsPeriodFilter = state.analyticsPeriodOptions[0] ?? "";
        state.analyticsPeriodRows = await fetchAnalyticsByPeriod(state.analyticsTab, state.analyticsPeriod, state.analyticsPeriodFilter);
      }
      renderApp();
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-analytics-period]").forEach((button) => {
    button.addEventListener("click", async () => {
      const { fetchAnalyticsByPeriod, fetchAvailablePeriods } = await import("./api");
      const period = button.dataset.analyticsPeriod as import("./api").AnalyticsPeriod;
      state.analyticsPeriod = period;
      if (period === "all") {
        state.analyticsPeriodRows = [];
        state.analyticsPeriodOptions = [];
        state.analyticsPeriodFilter = "";
      } else {
        state.analyticsPeriodOptions = await fetchAvailablePeriods(state.analyticsTab, period);
        state.analyticsPeriodFilter = state.analyticsPeriodOptions[0] ?? "";
        state.analyticsPeriodRows = await fetchAnalyticsByPeriod(state.analyticsTab, period, state.analyticsPeriodFilter);
      }
      renderApp();
    });
  });

  root.querySelector<HTMLSelectElement>("#analytics-period-select")?.addEventListener("change", async (e) => {
    const { fetchAnalyticsByPeriod } = await import("./api");
    state.analyticsPeriodFilter = (e.target as HTMLSelectElement).value;
    state.analyticsPeriodRows = await fetchAnalyticsByPeriod(state.analyticsTab, state.analyticsPeriod, state.analyticsPeriodFilter);
    renderApp();
  });

  // 担当フィルター
  root.querySelector<HTMLInputElement>("#staff-filter-input")?.addEventListener("input", (e) => {
    state.analyticsStaffFilter = (e.target as HTMLInputElement).value;
    renderApp();
  });

  // 担当詳細ドリルダウン
  root.querySelectorAll<HTMLButtonElement>("[data-staff-drilldown]").forEach((button) => {
    button.addEventListener("click", async () => {
      const staffCode = button.dataset.staffDrilldown ?? "";
      const staffName = button.dataset.staffName ?? "";
      const { fetchStaffCustomerBreakdown, fetchStaffProductBreakdown, periodToDateRange } = await import("./api");
      const range = periodToDateRange(state.analyticsStaffPeriod, state.analyticsStaffPeriodFilter);
      const prevTab = state.analyticsStaffDrilldown?.breakdownTab ?? "customers";
      const [customerRows, productRows] = await Promise.all([
        fetchStaffCustomerBreakdown(staffCode, range?.from, range?.to),
        fetchStaffProductBreakdown(staffCode, range?.from, range?.to)
      ]);
      state.analyticsStaffDrilldown = { code: staffCode, name: staffName, breakdownTab: prevTab, customerRows, productRows };
      renderApp();
    });
  });

  // 担当ドリルダウン 得意先/商品サブタブ切替
  root.querySelectorAll<HTMLButtonElement>("[data-staff-breakdown-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.analyticsStaffDrilldown) return;
      state.analyticsStaffDrilldown = { ...state.analyticsStaffDrilldown, breakdownTab: button.dataset.staffBreakdownTab as "customers" | "products" };
      renderApp();
    });
  });

  // 担当ドリルダウン閉じる
  root.querySelector<HTMLButtonElement>("[data-action='close-staff-drilldown']")?.addEventListener("click", () => {
    state.analyticsStaffDrilldown = null;
    renderApp();
  });

  // 担当ドリルダウン タグ/名称フィルター
  root.querySelector<HTMLInputElement>("[data-analytics-tag-filter]")?.addEventListener("input", (e) => {
    state.analyticsTagFilter = (e.target as HTMLInputElement).value;
    renderApp();
  });

  // 担当タブ 期間ボタン
  root.querySelectorAll<HTMLButtonElement>("[data-staff-period]").forEach((button) => {
    button.addEventListener("click", async () => {
      const { fetchAvailablePeriods, fetchStaffTotalsByPeriod, periodToDateRange } = await import("./api");
      const period = button.dataset.staffPeriod as import("./api").AnalyticsPeriod;
      state.analyticsStaffPeriod = period;
      state.analyticsStaffDrilldown = null;
      if (period === "all") {
        state.analyticsStaffPeriodFilter = "";
        state.analyticsStaffPeriodOptions = [];
        state.analyticsStaffTotals = [];
      } else {
        state.analyticsStaffPeriodOptions = await fetchAvailablePeriods("staff", period);
        state.analyticsStaffPeriodFilter = state.analyticsStaffPeriodOptions[0] ?? "";
        const range = periodToDateRange(period, state.analyticsStaffPeriodFilter);
        state.analyticsStaffTotals = await fetchStaffTotalsByPeriod(range?.from, range?.to);
      }
      renderApp();
    });
  });

  // 担当タブ 期間セレクト
  root.querySelector<HTMLSelectElement>("#staff-period-select")?.addEventListener("change", async (e) => {
    const { fetchStaffTotalsByPeriod, periodToDateRange } = await import("./api");
    state.analyticsStaffPeriodFilter = (e.target as HTMLSelectElement).value;
    const range = periodToDateRange(state.analyticsStaffPeriod, state.analyticsStaffPeriodFilter);
    state.analyticsStaffTotals = await fetchStaffTotalsByPeriod(range?.from, range?.to);
    state.analyticsStaffDrilldown = null;
    renderApp();
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
    state.invoiceErrors = {};
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='remove-line']").forEach((button) => {
    button.addEventListener("click", () => {
      collectInvoiceFormFromDom(root);
      const idx = parseInt(button.dataset.line ?? "0", 10);
      state.invoiceForm.lines.splice(idx, 1);
      state.invoiceErrors = validateInvoice(state.invoiceForm);
      renderApp();
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='duplicate-line']").forEach((button) => {
    button.addEventListener("click", () => {
      collectInvoiceFormFromDom(root);
      duplicateInvoiceLine(parseInt(button.dataset.line ?? "0", 10));
      state.invoiceErrors = {};
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='copy-past-invoice']")?.addEventListener("click", () => {
    copyPastInvoice();
    renderApp();
  });

  root.querySelector<HTMLButtonElement>("[data-action='open-customer-picker']")?.addEventListener("click", () => {
    collectInvoiceFormFromDom(root);
    state.pickerMode = "customer";
    state.pickerTargetLine = null;
    state.pickerQuery = state.invoiceForm.customerCode || state.invoiceForm.customerName;
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='open-product-picker']").forEach((button) => {
    button.addEventListener("click", () => {
      collectInvoiceFormFromDom(root);
      const lineIndex = parseInt(button.dataset.line ?? "0", 10);
      const line = state.invoiceForm.lines[lineIndex];
      state.pickerMode = "product";
      state.pickerTargetLine = lineIndex;
      state.pickerQuery = line ? line.productCode || line.productName : "";
      renderApp();
    });
  });

  root.querySelectorAll<HTMLElement>("[data-action='modal-close']").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (
        element.classList.contains("modal-backdrop") &&
        event.target instanceof HTMLElement &&
        !event.target.classList.contains("modal-backdrop")
      ) {
        return;
      }
      closePicker();
      renderApp();
    });
  });

  root.querySelectorAll<HTMLElement>("[data-action='picker-select']").forEach((row) => {
    const selectHandler = async () => {
      const code = row.dataset.code ?? "";
      const name = row.dataset.name ?? "";

      if (state.pickerMode === "customer") {
        state.invoiceForm.customerCode = code;
        state.invoiceForm.customerName = name;
        delete state.invoiceErrors.customerCode;
        // 得意先の単価グループを取得
        const customer = state.masterStats?.customers.find((c) => c.code === code);
        state.invoicePriceGroup = customer?.priceGroup || "";
        if (!state.invoicePriceGroup && code) {
          state.invoicePriceGroup = await fetchCustomerPriceGroup(code);
        }
      } else if (state.pickerMode === "product" && state.pickerTargetLine !== null) {
        const line = state.invoiceForm.lines[state.pickerTargetLine];
        if (line) {
          line.productCode = code;
          line.productName = name;
          // 単価グループから特価を自動取得
          const price = await fetchProductPrice(state.invoicePriceGroup, code);
          if (price > 0) {
            line.unitPrice = price;
          }
          line.amount = line.quantity * line.unitPrice;
          delete state.invoiceErrors[`lines.${state.pickerTargetLine}.productCode`];
          delete state.invoiceErrors[`lines.${state.pickerTargetLine}.productName`];
        }
      }

      closePicker();
      renderApp();
    };

    row.addEventListener("click", selectHandler);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        selectHandler();
      }
    });
  });

  root.querySelector<HTMLInputElement>("#modal-search")?.addEventListener("input", (event) => {
    state.pickerQuery = (event.target as HTMLInputElement).value;
    renderApp();
  });

  root.querySelector<HTMLButtonElement>("[data-action='invoice-clear']")?.addEventListener("click", () => {
    clearInvoiceForm();
    renderApp();
  });

  root.querySelector<HTMLButtonElement>("[data-action='invoice-save']")?.addEventListener("click", () => {
    persistInvoice(root);
  });

  root.querySelector<HTMLInputElement>("#inv-customer-code")?.addEventListener("blur", async () => {
    collectInvoiceFormFromDom(root);
    if (tryAutofillCustomerByCode(state.invoiceForm.customerCode)) {
      delete state.invoiceErrors.customerCode;
      // priceGroupがローカルになければSupabaseから取得
      if (!state.invoicePriceGroup && state.invoiceForm.customerCode) {
        state.invoicePriceGroup = await fetchCustomerPriceGroup(state.invoiceForm.customerCode);
      }
      renderApp();
    }
  });

  root.querySelector<HTMLInputElement>("#inv-customer-name")?.addEventListener("blur", () => {
    collectInvoiceFormFromDom(root);
    if (tryAutofillCustomerByName(state.invoiceForm.customerName)) {
      delete state.invoiceErrors.customerCode;
      renderApp();
    }
  });

  root
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type"
    )
    .forEach((element) => {
      element.addEventListener("input", () => {
        collectInvoiceFormFromDom(root);
        state.invoiceSavedDocNo = null;
        // 数量・単価変更時は金額を即時反映
        const field = element.dataset.field;
        if (field === "quantity" || field === "unitPrice") {
          renderApp();
        }
      });
    });

  root.querySelector<HTMLSelectElement>("#inv-type")?.addEventListener("change", () => {
    collectInvoiceFormFromDom(root);
    state.invoiceSavedDocNo = null;
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

  root.querySelector<HTMLButtonElement>("[data-action='tax-export-xml']")?.addEventListener("click", async () => {
    if (!state.taxDeclaration) return;
    const { generateTaxXML } = await import("./api");
    const xml = generateTaxXML(state.taxDeclaration);
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tax-${state.taxYear}-${String(state.taxMonth).padStart(2, "0")}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  });

  root.querySelector<HTMLButtonElement>("[data-action='tax-export-csv']")?.addEventListener("click", async () => {
    if (!state.taxDeclaration) return;
    const { generateTaxCSV } = await import("./api");
    const csv = generateTaxCSV(state.taxDeclaration);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tax-${state.taxYear}-${String(state.taxMonth).padStart(2, "0")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  root.querySelector<HTMLButtonElement>("[data-action='tax-save-draft']")?.addEventListener("click", async () => {
    if (!state.taxDeclaration) return;
    const { saveTaxDeclaration } = await import("./api");
    try {
      await saveTaxDeclaration(state.taxDeclaration);
      showToast("下書き保存しました");
    } catch (e) {
      showToast("保存に失敗: " + (e instanceof Error ? e.message : String(e)), "error");
    }
  });

  // ── 税務: 区分・控除・製造場情報の編集 ─────────────
  root.querySelectorAll<HTMLInputElement>("[data-tax-row][data-tax-field]").forEach((input) => {
    input.addEventListener("change", async () => {
      if (!state.taxDeclaration) return;
      const idx = Number(input.dataset.taxRow);
      const field = input.dataset.taxField as string;
      const value = input.type === "number" ? Number(input.value) || 0 : input.value;
      const rows = [...state.taxDeclaration.rows];
      rows[idx] = { ...rows[idx], [field]: value };
      const { recalculateTaxDeclaration } = await import("./api");
      state.taxDeclaration = recalculateTaxDeclaration({ ...state.taxDeclaration, rows });
      renderApp();
    });
  });

  root.querySelectorAll<HTMLInputElement>("[data-ded-row][data-ded-field]").forEach((input) => {
    input.addEventListener("change", () => {
      if (!state.taxDeclaration) return;
      const idx = Number(input.dataset.dedRow);
      const field = input.dataset.dedField as string;
      const value = input.type === "number" ? Number(input.value) || 0 : input.value;
      const deductions = [...state.taxDeclaration.deductions];
      deductions[idx] = { ...deductions[idx], [field]: value };
      state.taxDeclaration = { ...state.taxDeclaration, deductions };
      renderApp();
    });
  });

  root.querySelectorAll<HTMLInputElement>("input[data-tax-field]:not([data-tax-row])").forEach((input) => {
    input.addEventListener("change", () => {
      if (!state.taxDeclaration) return;
      const field = input.dataset.taxField as string;
      state.taxDeclaration = { ...state.taxDeclaration, [field]: input.value };
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='tax-add-category']")?.addEventListener("click", async () => {
    if (!state.taxDeclaration) return;
    const { recalculateTaxDeclaration, TAX_RATE_CATEGORIES } = await import("./api");
    const firstCat = TAX_RATE_CATEGORIES[0];
    const newRow = {
      taxCategory: firstCat.code,
      taxCategoryName: firstCat.name,
      alcoholDegree: 15.0,
      productionVolume: 0,
      previousBalance: 0,
      currentAdjustment: 0,
      exportDeduction: 0,
      sampleDeduction: 0,
      taxableVolume: 0,
      volume: 0,
      taxRate: firstCat.taxRatePerLiter,
      taxAmount: 0
    };
    state.taxDeclaration = recalculateTaxDeclaration({
      ...state.taxDeclaration,
      rows: [...state.taxDeclaration.rows, newRow]
    });
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='tax-remove-category']").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!state.taxDeclaration) return;
      const idx = Number(button.dataset.taxRow);
      const { recalculateTaxDeclaration } = await import("./api");
      const rows = state.taxDeclaration.rows.filter((_, i) => i !== idx);
      state.taxDeclaration = recalculateTaxDeclaration({ ...state.taxDeclaration, rows });
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='tax-add-deduction']")?.addEventListener("click", () => {
    if (!state.taxDeclaration) return;
    const newDed = { type: "export" as const, categoryCode: "01", volume: 0, reason: "", documentNo: "" };
    state.taxDeclaration = {
      ...state.taxDeclaration,
      deductions: [...state.taxDeclaration.deductions, newDed]
    };
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='tax-remove-deduction']").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.taxDeclaration) return;
      const idx = Number(button.dataset.dedRow);
      const deductions = state.taxDeclaration.deductions.filter((_, i) => i !== idx);
      state.taxDeclaration = { ...state.taxDeclaration, deductions };
      renderApp();
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-store-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.storeTab = button.dataset.storeTab as "pos" | "orders";
      renderApp();
    });
  });

  // ── CSV/Excelインポート ─────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-import-entity]").forEach((button) => {
    button.addEventListener("click", () => {
      state.importEntity = button.dataset.importEntity as ImportableEntity;
      state.importPreview = null;
      state.importResult = null;
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='download-template']")?.addEventListener("click", () => {
    const csv = generateTemplateCSV(state.importEntity);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `template_${state.importEntity}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  root.querySelector<HTMLButtonElement>("[data-action='import-parse']")?.addEventListener("click", () => {
    const input = root.querySelector<HTMLInputElement>("#import-file");
    const file = input?.files?.[0];
    if (!file) {
      showToast("CSVファイルを選択してください", "warning");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const { columns, rows } = parseCSV(text);
      state.importPreview = validateImport(state.importEntity, columns, rows);
      state.importResult = null;
      renderApp();
    };
    reader.readAsText(file, "utf-8");
  });

  root.querySelector<HTMLButtonElement>("[data-action='import-cancel']")?.addEventListener("click", () => {
    state.importPreview = null;
    state.importResult = null;
    renderApp();
  });

  // ── 印刷センター ────────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-print-template]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.printTemplate = btn.dataset.printTemplate as PrintTemplateKey;
      renderApp();
    });
  });

  root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[data-print-field]").forEach((input) => {
    input.addEventListener("change", () => {
      const field = input.dataset.printField as keyof PrintDocumentData;
      let value: unknown = input.value;
      if (field === "taxRate" || field === "previousBalance" || field === "paymentAmount") {
        value = Number(input.value) || 0;
      }
      state.printData = { ...state.printData, [field]: value } as PrintDocumentData;
      renderApp();
    });
  });

  root.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-print-opt]").forEach((input) => {
    const handler = () => {
      const field = input.dataset.printOpt as keyof PrintOptions;
      let value: unknown;
      if (input.type === "checkbox") {
        value = (input as HTMLInputElement).checked;
      } else if (field === "copies") {
        value = Number(input.value) || 1;
      } else if (field === "overlayOpacity" || field === "calibrationOffsetX" || field === "calibrationOffsetY") {
        value = Number(input.value) || 0;
      } else {
        value = input.value;
      }
      state.printOptions = { ...state.printOptions, [field]: value } as PrintOptions;
      renderApp();
    };
    input.addEventListener("change", handler);
    if (input.type === "range") input.addEventListener("input", handler);
  });

  root.querySelectorAll<HTMLInputElement>("[data-print-line][data-print-lfield]").forEach((input) => {
    input.addEventListener("change", () => {
      const idx = Number(input.dataset.printLine);
      const field = input.dataset.printLfield as string;
      const lines = [...state.printData.lines];
      let v: unknown = input.value;
      if (field === "quantity" || field === "unitPrice") {
        v = Number(input.value) || 0;
      }
      lines[idx] = { ...lines[idx], [field]: v };
      // 金額自動計算
      lines[idx].amount = (Number(lines[idx].quantity) || 0) * (Number(lines[idx].unitPrice) || 0);
      state.printData = { ...state.printData, lines };
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='print-add-line']")?.addEventListener("click", () => {
    state.printData = {
      ...state.printData,
      lines: [
        ...state.printData.lines,
        { productCode: "", productName: "", spec: "", quantity: 0, unit: "本", unitPrice: 0, amount: 0 }
      ]
    };
    renderApp();
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='print-remove-line']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.printLine);
      state.printData = {
        ...state.printData,
        lines: state.printData.lines.filter((_, i) => i !== idx)
      };
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='print-save-settings']")?.addEventListener("click", () => {
    try {
      localStorage.setItem("sake_print_options", JSON.stringify(state.printOptions));
      localStorage.setItem("sake_print_company", JSON.stringify(state.printCompany));
      showToast("印刷設定を保存しました");
    } catch (e) {
      showToast("保存失敗: " + (e instanceof Error ? e.message : String(e)), "error");
    }
  });

  root.querySelector<HTMLButtonElement>("[data-action='print-open-company']")?.addEventListener("click", () => {
    const current = state.printCompany;
    const name = prompt("会社名", current.name);
    if (name === null) return;
    const postal = prompt("郵便番号", current.postalCode) ?? current.postalCode;
    const addr = prompt("住所", current.address1) ?? current.address1;
    const tel = prompt("TEL", current.tel) ?? current.tel;
    const fax = prompt("FAX", current.fax) ?? current.fax;
    const reg = prompt("適格請求書登録番号 (T+13桁)", current.registrationNo) ?? current.registrationNo;
    const bank = prompt("取引銀行名", current.bankName) ?? current.bankName;
    const branch = prompt("支店名", current.bankBranch) ?? current.bankBranch;
    const accNo = prompt("口座番号", current.bankAccountNo) ?? current.bankAccountNo;
    const holder = prompt("口座名義", current.bankAccountHolder) ?? current.bankAccountHolder;
    state.printCompany = {
      ...current,
      name,
      postalCode: postal,
      address1: addr,
      tel,
      fax,
      registrationNo: reg,
      bankName: bank,
      bankBranch: branch,
      bankAccountNo: accNo,
      bankAccountHolder: holder
    };
    renderApp();
  });

  // ── フォームデザイナー（ドラッグ配置） ──────────────
  root.querySelector<HTMLButtonElement>("[data-action='fd-toggle-design']")?.addEventListener("click", () => {
    state.fdDesignMode = !state.fdDesignMode;
    renderApp();
  });

  // クラウド保存
  root.querySelector<HTMLButtonElement>("[data-action='fd-save-cloud']")?.addEventListener("click", async () => {
    const canvas = root.querySelector<HTMLElement>(".fd-canvas");
    if (!canvas) return;
    const nameInput = root.querySelector<HTMLInputElement>("#fd-layout-name");
    const name = (nameInput?.value ?? "").trim() || "デフォルト";
    const positions = collectFieldPositions(canvas);
    const { savePrintLayout } = await import("./api");
    const layout = {
      id: `bp1701_${name.replaceAll(/[^a-zA-Z0-9_-]/g, "_")}_${Date.now()}`,
      name,
      templateKey: "chain_store" as const,
      positions
    };
    try {
      const saved = await savePrintLayout(layout);
      if (saved) {
        showToast(`クラウド保存成功: ${name}`);
        state.fdSavedPositions = positions;
        localStorage.setItem("sake_fd_positions", JSON.stringify(positions));
        renderApp();
      } else {
        showToast("クラウド保存に失敗しました。ローカルには保存されました", "warning");
        localStorage.setItem("sake_fd_positions", JSON.stringify(positions));
      }
    } catch (e) {
      showToast("保存エラー: " + (e instanceof Error ? e.message : ""), "error");
    }
  });

  // ローカル保存（従来のlocalStorage）
  root.querySelector<HTMLButtonElement>("[data-action='fd-save-local']")?.addEventListener("click", () => {
    const canvas = root.querySelector<HTMLElement>(".fd-canvas");
    if (!canvas) return;
    const positions = collectFieldPositions(canvas);
    state.fdSavedPositions = positions;
    try {
      localStorage.setItem("sake_fd_positions", JSON.stringify(positions));
      showToast(`ローカル保存完了: ${Object.keys(positions).length}件`);
    } catch (e) {
      showToast("保存失敗: " + (e instanceof Error ? e.message : ""), "error");
    }
  });

  // JSONエクスポート
  root.querySelector<HTMLButtonElement>("[data-action='fd-export-json']")?.addEventListener("click", () => {
    const canvas = root.querySelector<HTMLElement>(".fd-canvas");
    if (!canvas) return;
    const positions = collectFieldPositions(canvas);
    const data = { templateKey: "chain_store", positions, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bp1701_layout_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // JSONインポート
  root.querySelector<HTMLButtonElement>("[data-action='fd-import-json']")?.addEventListener("click", () => {
    root.querySelector<HTMLInputElement>("#fd-import-file")?.click();
  });
  root.querySelector<HTMLInputElement>("#fd-import-file")?.addEventListener("change", async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const positions = parsed.positions as Record<string, { x: number; y: number }>;
      if (!positions) throw new Error("positions field not found");
      state.fdSavedPositions = positions;
      localStorage.setItem("sake_fd_positions", JSON.stringify(positions));
      showToast(`インポート成功: ${Object.keys(positions).length}件`);
      renderApp();
    } catch (err) {
      showToast("インポート失敗: " + (err instanceof Error ? err.message : ""), "error");
    }
  });

  // 保存済みレイアウト一覧を取得して表示
  const savedLayoutsDiv = root.querySelector<HTMLElement>("#fd-saved-layouts");
  if (savedLayoutsDiv && state.route === "/form-designer" && state.fdDesignMode) {
    void (async () => {
      const { fetchPrintLayouts } = await import("./api");
      const layouts = await fetchPrintLayouts("chain_store");
      if (layouts.length === 0) {
        savedLayoutsDiv.innerHTML = "☁️ クラウドに保存されたレイアウトはありません";
      } else {
        savedLayoutsDiv.innerHTML = `☁️ クラウド保存済み (${layouts.length}件):<br/>` +
          layouts
            .map(
              (l) =>
                `<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${l.id}" style="margin:4px 4px 0 0;">${l.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${l.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`
            )
            .join("");
        // 読込ハンドラ
        savedLayoutsDiv.querySelectorAll<HTMLButtonElement>("[data-action='fd-load-layout']").forEach((btn) => {
          btn.addEventListener("click", () => {
            const id = btn.dataset.layoutId;
            const layout = layouts.find((l) => l.id === id);
            if (!layout) return;
            state.fdSavedPositions = layout.positions;
            localStorage.setItem("sake_fd_positions", JSON.stringify(layout.positions));
            showToast(`読込完了: ${layout.name}`);
            renderApp();
          });
        });
        // 削除ハンドラ
        savedLayoutsDiv.querySelectorAll<HTMLButtonElement>("[data-action='fd-delete-layout']").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const id = btn.dataset.layoutId;
            if (!id) return;
            if (!await showConfirm("このレイアウトを削除しますか？", { variant: "danger", confirmLabel: "削除する" })) return;
            const { deletePrintLayout } = await import("./api");
            const ok = await deletePrintLayout(id);
            if (ok) {
              showToast("削除しました");
              renderApp();
            } else showToast("削除失敗", "error");
          });
        });
      }
    })();
  }

  root.querySelector<HTMLButtonElement>("[data-action='fd-reset-positions']")?.addEventListener("click", async () => {
    if (!await showConfirm("フィールド位置を初期値に戻しますか？")) return;
    state.fdSavedPositions = null;
    localStorage.removeItem("sake_fd_positions");
    renderApp();
  });

  // ドラッグ処理 — X/Y入力で微調整のみ（ドラッグはグローバルハンドラに移設）
  const fdSelX = root.querySelector<HTMLInputElement>("#fd-sel-x");
  const fdSelY = root.querySelector<HTMLInputElement>("#fd-sel-y");
  [fdSelX, fdSelY].forEach((input) => {
    input?.addEventListener("change", () => {
      if (!state.fdActiveFieldId) return;
      const el = document.querySelector<HTMLElement>(`[data-fd-id="${state.fdActiveFieldId}"]`);
      if (!el) return;
      if (fdSelX) el.style.left = fdSelX.value + "mm";
      if (fdSelY) el.style.top = fdSelY.value + "mm";
    });
  });

  // ── 取引先マップ (Leaflet) ──────────────────────────
  const mapEl = root.querySelector<HTMLElement>("#customer-map");
  if (mapEl && state.route === "/map") {
    initCustomerMap(mapEl);
  }

  // ── 受注ワークフロー (カンバン) ────────────────────
  root.querySelectorAll<HTMLElement>(".wf-card").forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      card.classList.add("wf-dragging");
      (e as DragEvent).dataTransfer?.setData("text/plain", card.dataset.wfOrder ?? "");
    });
    card.addEventListener("dragend", () => card.classList.remove("wf-dragging"));
  });
  root.querySelectorAll<HTMLElement>(".wf-col").forEach((col) => {
    col.addEventListener("dragover", (e) => e.preventDefault());
    col.addEventListener("drop", (e) => {
      e.preventDefault();
      const orderId = (e as DragEvent).dataTransfer?.getData("text/plain");
      const stage = col.dataset.wfStage as WorkflowOrder["stage"];
      if (!orderId || !stage) return;
      const order = state.workflowOrders.find((o) => o.id === orderId);
      if (order) {
        order.stage = stage;
        renderApp();
      }
    });
  });

  // ── モバイル受注 ────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-mo-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = btn.dataset.moStep as MobileOrderState["step"];
      if (btn.disabled) return;
      state.mobileOrder.step = step;
      renderApp();
    });
  });

  root.querySelector<HTMLInputElement>("#mo-customer-q")?.addEventListener("input", (e) => {
    state.mobileOrder.customerQuery = (e.target as HTMLInputElement).value;
    renderApp();
  });
  root.querySelector<HTMLInputElement>("#mo-product-q")?.addEventListener("input", (e) => {
    state.mobileOrder.productQuery = (e.target as HTMLInputElement).value;
    renderApp();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-mo-select-customer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.moSelectCustomer;
      const cust = state.masterStats?.customers.find((c) => c.id === id);
      if (cust) state.mobileOrder.selectedCustomer = cust;
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-mo-add-product]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.moAddProduct;
      const p = state.masterStats?.products.find((pp) => pp.code === code);
      if (!p) return;
      const price = 1800; // デフォルト単価（商品マスタに追加すべき）
      state.mobileOrder.cart.push({
        productCode: p.code,
        productName: p.name,
        quantity: 1,
        unit: "本",
        unitPrice: price,
        amount: price
      });
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-mo-qty]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const diff = Number(btn.dataset.moQty);
      const code = btn.dataset.moProduct;
      const line = state.mobileOrder.cart.find((l) => l.productCode === code);
      if (!line) return;
      line.quantity = Math.max(0, line.quantity + diff);
      line.amount = line.quantity * line.unitPrice;
      if (line.quantity === 0) state.mobileOrder.cart = state.mobileOrder.cart.filter((l) => l.productCode !== code);
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-mo-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.moRemove);
      state.mobileOrder.cart.splice(idx, 1);
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='mo-submit']")?.addEventListener("click", async () => {
    const memoEl = root.querySelector<HTMLTextAreaElement>("#mo-memo");
    state.mobileOrder.memo = memoEl?.value ?? "";
    const docNo = "MO" + Date.now().toString().slice(-8);
    state.mobileOrder.submittedDocNo = docNo;
    state.mobileOrder.step = "done";
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='mo-reset']")?.addEventListener("click", () => {
    state.mobileOrder = {
      step: "customer",
      selectedCustomer: null,
      cart: [],
      customerQuery: "",
      productQuery: "",
      memo: "",
      submittedDocNo: null
    };
    renderApp();
  });

  // ── 酒蔵見学 ────────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-tour-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.tourActiveId = btn.dataset.tourId ?? null;
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='tour-insert-template']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const active = state.tourInquiries.find((i) => i.id === state.tourActiveId);
      if (!active) return;
      const tmpl = btn.dataset.template === "confirm" ? TOUR_TEMPLATE_CONFIRM : TOUR_TEMPLATE_DECLINE;
      const confirmedTimeEl = root.querySelector<HTMLInputElement>("#tour-confirmed-time");
      const rendered = tmpl
        .replaceAll("{name}", active.name)
        .replaceAll("{partySize}", String(active.partySize))
        .replaceAll("{confirmedTime}", confirmedTimeEl?.value ?? active.visitDate);
      const bodyEl = root.querySelector<HTMLTextAreaElement>("#tour-reply-body");
      if (bodyEl) bodyEl.value = rendered;
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='tour-send-reply']")?.addEventListener("click", () => {
    const id = (document.querySelector<HTMLButtonElement>("[data-action='tour-send-reply']")?.dataset.tourId) ?? "";
    const inq = state.tourInquiries.find((i) => i.id === id);
    if (!inq) return;
    const confirmedTimeEl = root.querySelector<HTMLInputElement>("#tour-confirmed-time");
    inq.status = "confirmed";
    inq.repliedAt = new Date().toISOString();
    inq.confirmedTime = confirmedTimeEl?.value ?? "";
    showToast("返信メールを下書き保存し、ステータスを確定にしました");
    renderApp();
  });

  // ── リスト取得ツール ────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='lb-search']")?.addEventListener("click", async () => {
    const type = root.querySelector<HTMLSelectElement>("#lb-type")?.value ?? "";
    const area = root.querySelector<HTMLInputElement>("#lb-area")?.value ?? "";
    const keyword = root.querySelector<HTMLInputElement>("#lb-keyword")?.value ?? "";
    if (!type && !keyword) { showToast("業種かキーワードを入力してください", "warning"); return; }
    state.leadSearchType = type;
    state.leadSearchArea = area;
    state.leadSearchQuery = keyword;
    state.leadSearching = true;
    renderApp();
    const setting = state.integrations.find((i) => i.provider === "google_maps");
    if (!setting || !setting.config["api_key"]) {
      showToast("Google Maps APIキーが /integrations で未設定です", "warning");
      state.leadSearching = false;
      renderApp();
      return;
    }
    const { searchPlaces } = await import("./api");
    const query = [type, keyword].filter(Boolean).join(" ");
    const result = await searchPlaces(setting, query, area);
    state.leadSearching = false;
    if (result.error) {
      showToast("検索失敗: " + result.error, "error");
    } else {
      state.leadSearchResults = result.results;
    }
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='lb-clear-search']")?.addEventListener("click", () => {
    state.leadSearchResults = [];
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='lb-save-list']")?.addEventListener("click", async () => {
    if (state.leadSearchResults.length === 0) return;
    const name = prompt("リスト名を入力:", `${state.leadSearchType} ${state.leadSearchArea}`);
    if (!name) return;
    const listId = `ll_${Date.now()}`;
    const list: LeadList = {
      id: listId,
      name,
      query: state.leadSearchQuery,
      area: state.leadSearchArea,
      businessType: state.leadSearchType,
      totalCount: state.leadSearchResults.length,
      source: "google_places"
    };
    const { saveLeadList, saveLeadItem, fetchLeadLists, fetchLeadItems } = await import("./api");
    await saveLeadList(list);
    const checks = root.querySelectorAll<HTMLInputElement>(".lb-search-check:checked");
    const selectedIndices = Array.from(checks).map((c) => Number(c.dataset.idx));
    for (const idx of selectedIndices) {
      const item = state.leadSearchResults[idx];
      if (!item) continue;
      await saveLeadItem({
        ...item,
        id: `li_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        listId,
        businessType: state.leadSearchType
      });
    }
    state.leadLists = await fetchLeadLists();
    state.leadActiveListId = listId;
    state.leadItems = await fetchLeadItems(listId);
    state.leadSearchResults = [];
    showToast(`${selectedIndices.length}件を「${name}」として保存しました`);
    renderApp();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='lb-select-list']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id ?? null;
      state.leadActiveListId = id;
      if (id) {
        const { fetchLeadItems } = await import("./api");
        state.leadItems = await fetchLeadItems(id);
      }
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='lb-exclude']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id ?? "";
      const item = state.leadItems.find((i) => i.id === id);
      if (!item) return;
      const { saveLeadItem, fetchLeadItems } = await import("./api");
      await saveLeadItem({ ...item, status: "excluded" });
      if (state.leadActiveListId) state.leadItems = await fetchLeadItems(state.leadActiveListId);
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='lb-convert-one']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id ?? "";
      const item = state.leadItems.find((i) => i.id === id);
      if (!item) return;
      const { convertLeadToProspect, fetchLeadItems } = await import("./api");
      const result = await convertLeadToProspect(item);
      if (result) {
        showToast("見込客に追加しました: " + item.companyName);
        if (state.leadActiveListId) state.leadItems = await fetchLeadItems(state.leadActiveListId);
        renderApp();
      }
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='lb-bulk-convert']")?.addEventListener("click", async () => {
    const checks = root.querySelectorAll<HTMLInputElement>(".lb-item-check:checked");
    if (checks.length === 0) {
      if (!await showConfirm("全ての新規アイテムを見込客に変換しますか？")) return;
    }
    const ids = checks.length > 0
      ? Array.from(checks).map((c) => c.dataset.id!)
      : state.leadItems.filter((i) => i.status === "new").map((i) => i.id);
    const { convertLeadToProspect, fetchLeadItems } = await import("./api");
    let converted = 0;
    for (const id of ids) {
      const item = state.leadItems.find((i) => i.id === id);
      if (item && item.status === "new") {
        if (await convertLeadToProspect(item)) converted++;
      }
    }
    showToast(`${converted}件を見込客に変換しました`);
    if (state.leadActiveListId) state.leadItems = await fetchLeadItems(state.leadActiveListId);
    renderApp();
  });

  // ── マップフィルタ ──────────────────────────────
  root.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-map-filter]").forEach((input) => {
    input.addEventListener("change", () => {
      const field = input.dataset.mapFilter as keyof MapFilters;
      let value: unknown;
      if (input.type === "checkbox") {
        value = (input as HTMLInputElement).checked;
      } else {
        value = input.value;
      }
      state.mapFilters = { ...state.mapFilters, [field]: value } as MapFilters;
      renderApp();
    });
  });

  // ── IVRy 通話履歴 ──────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='ivry-sync']")?.addEventListener("click", async () => {
    const setting = state.integrations.find((i) => i.provider === "ivry");
    if (!setting || !setting.isEnabled) {
      showToast("IVRy連携が無効です。/integrations で有効化してください", "warning");
      return;
    }
    const { syncIvryCallLogs, fetchCallLogs } = await import("./api");
    const result = await syncIvryCallLogs(setting);
    if (result.error) showToast("同期失敗: " + result.error, "error");
    else {
      showToast(`${result.count}件の通話履歴を同期しました`);
      state.callLogs = await fetchCallLogs(100);
      renderApp();
    }
  });
  root.querySelector<HTMLButtonElement>("[data-action='ivry-push-phonebook']")?.addEventListener("click", async () => {
    const setting = state.integrations.find((i) => i.provider === "ivry");
    if (!setting || !setting.isEnabled) {
      showToast("IVRy連携が無効です", "warning");
      return;
    }
    if (!await showConfirm("全ての取引先と見込客の電話帳をIVRyに送信しますか？")) return;
    const { syncPhoneBookToIvry } = await import("./api");
    const contacts: Array<{ name: string; phone: string; customerCode?: string; note?: string }> = [];
    state.masterStats?.customers.forEach((c) => {
      contacts.push({ name: c.name, phone: "", customerCode: c.code, note: "既存取引先" });
    });
    state.prospects.forEach((p) => {
      if (p.phone) contacts.push({ name: p.companyName, phone: p.phone, customerCode: p.id, note: `見込客 (${p.stage})` });
    });
    const result = await syncPhoneBookToIvry(setting, contacts);
    if (result.error) showToast("送信失敗: " + result.error, "error");
    else showToast(`${result.synced}件の連絡先を送信しました`);
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='call-link-customer']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id ?? "";
      const phone = btn.dataset.phone ?? "";
      const code = prompt(`電話番号 ${phone} を顧客コードに紐付け\n顧客コードを入力:`);
      if (!code) return;
      const log = state.callLogs.find((l) => l.id === id);
      if (!log) return;
      const { saveCallLog, fetchCallLogs } = await import("./api");
      await saveCallLog({ ...log, matchedCustomerCode: code });
      state.callLogs = await fetchCallLogs(100);
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='call-memo']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id ?? "";
      const log = state.callLogs.find((l) => l.id === id);
      if (!log) return;
      const note = prompt("メモを入力:", log.notes ?? "");
      if (note === null) return;
      const { saveCallLog, fetchCallLogs } = await import("./api");
      await saveCallLog({ ...log, notes: note });
      state.callLogs = await fetchCallLogs(100);
      renderApp();
    });
  });

  // ── 新規営業 ────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-prospect-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.prospectViewMode = btn.dataset.prospectView as "kanban" | "list";
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='prospect-new']")?.addEventListener("click", () => {
    state.prospectEditingId = "__new__";
    renderApp();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='prospect-edit']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id ?? null;
      state.prospectEditingId = id;
      if (id) {
        const { fetchProspectActivities } = await import("./api");
        state.prospectActivities = await fetchProspectActivities(id);
      }
      renderApp();
    });
  });
  // カードクリックで編集
  root.querySelectorAll<HTMLElement>(".pk-card[data-prospect-id]").forEach((card) => {
    card.addEventListener("click", async () => {
      const id = card.dataset.prospectId ?? null;
      state.prospectEditingId = id;
      if (id) {
        const { fetchProspectActivities } = await import("./api");
        state.prospectActivities = await fetchProspectActivities(id);
      }
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='prospect-close']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.currentTarget !== e.target && !(e.target as HTMLElement).matches("button")) return;
      state.prospectEditingId = null;
      state.prospectActivities = [];
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='prospect-save']")?.addEventListener("click", async () => {
    const isNew = state.prospectEditingId === "__new__";
    const id = isNew ? `p_${Date.now()}` : state.prospectEditingId ?? "";
    const p: Prospect = {
      id,
      companyName: root.querySelector<HTMLInputElement>("#prospect-company")?.value ?? "",
      contactName: root.querySelector<HTMLInputElement>("#prospect-contact")?.value ?? "",
      email: root.querySelector<HTMLInputElement>("#prospect-email")?.value ?? "",
      phone: root.querySelector<HTMLInputElement>("#prospect-phone")?.value ?? "",
      businessType: root.querySelector<HTMLSelectElement>("#prospect-business-type")?.value ?? "",
      stage: (root.querySelector<HTMLSelectElement>("#prospect-stage")?.value as Prospect["stage"]) ?? "cold",
      source: root.querySelector<HTMLSelectElement>("#prospect-source")?.value ?? "",
      expectedAmount: Number(root.querySelector<HTMLInputElement>("#prospect-amount")?.value) || 0,
      probability: Number(root.querySelector<HTMLInputElement>("#prospect-probability")?.value) || 0,
      assignedStaffCode: root.querySelector<HTMLInputElement>("#prospect-staff")?.value ?? "",
      nextActionDate: root.querySelector<HTMLInputElement>("#prospect-next-date")?.value ?? "",
      nextAction: root.querySelector<HTMLInputElement>("#prospect-next-action")?.value ?? "",
      note: root.querySelector<HTMLTextAreaElement>("#prospect-note")?.value ?? ""
    };
    if (!p.companyName) { showToast("会社名は必須です", "warning"); return; }
    const { saveProspect, fetchProspects, recordAudit, sendSlackNotification } = await import("./api");
    const saved = await saveProspect(p);
    if (saved) {
      if (isNew) {
        await sendSlackNotification("new_prospect", `新規見込客: ${p.companyName} / 想定 ¥${p.expectedAmount.toLocaleString("ja-JP")}`).catch(() => undefined);
      }
      await recordAudit({ action: isNew ? "prospect_create" : "prospect_update", entityType: "prospect", entityId: id, userEmail: state.user?.email });
      state.prospects = await fetchProspects();
      state.prospectEditingId = null;
      renderApp();
    } else showToast("保存失敗", "error");
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='prospect-delete']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!await showConfirm("削除しますか？", { variant: "danger", confirmLabel: "削除する" })) return;
      const id = btn.dataset.id ?? "";
      const { deleteProspect, fetchProspects } = await import("./api");
      if (await deleteProspect(id)) {
        state.prospects = await fetchProspects();
        renderApp();
      }
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='prospect-add-activity']")?.addEventListener("click", async () => {
    const pid = (root.querySelector<HTMLButtonElement>("[data-action='prospect-add-activity']")?.dataset.id) ?? "";
    const type = root.querySelector<HTMLSelectElement>("#prospect-activity-type")?.value ?? "call";
    const title = root.querySelector<HTMLInputElement>("#prospect-activity-title")?.value ?? "";
    if (!title) { showToast("内容を入力してください", "warning"); return; }
    const { saveProspectActivity, fetchProspectActivities } = await import("./api");
    await saveProspectActivity({
      id: `act_${Date.now()}`,
      prospectId: pid,
      activityType: type as ProspectActivity["activityType"],
      title,
      activityDate: new Date().toISOString(),
      staffCode: state.myProfile?.staffCode
    });
    state.prospectActivities = await fetchProspectActivities(pid);
    renderApp();
  });
  // カンバンドラッグ
  root.querySelectorAll<HTMLElement>(".pk-card[data-prospect-id]").forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      (e as DragEvent).dataTransfer?.setData("text/plain", card.dataset.prospectId ?? "");
    });
  });
  root.querySelectorAll<HTMLElement>(".pk-col[data-prospect-stage]").forEach((col) => {
    col.addEventListener("dragover", (e) => e.preventDefault());
    col.addEventListener("drop", async (e) => {
      e.preventDefault();
      const id = (e as DragEvent).dataTransfer?.getData("text/plain");
      const stage = col.dataset.prospectStage as Prospect["stage"];
      if (!id) return;
      const p = state.prospects.find((x) => x.id === id);
      if (p && p.stage !== stage) {
        const updated = { ...p, stage };
        const { saveProspect } = await import("./api");
        await saveProspect(updated);
        p.stage = stage;
        renderApp();
      }
    });
  });

  // ── Slack通知設定 ────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='slack-save']")?.addEventListener("click", async () => {
    const { fetchIntegrationSettings, saveIntegrationSetting } = await import("./api");
    const settings = state.integrations.length > 0 ? state.integrations : await fetchIntegrationSettings();
    const slack = settings.find((s) => s.provider === "slack");
    if (!slack) return;
    const webhookUrl = root.querySelector<HTMLInputElement>("#slack-webhook")?.value ?? "";
    const defaultChannel = root.querySelector<HTMLInputElement>("#slack-default-channel")?.value ?? "";
    const enabled = root.querySelector<HTMLInputElement>("#slack-enabled")?.checked ?? false;
    await saveIntegrationSetting({
      ...slack,
      config: { ...slack.config, webhook_url: webhookUrl, default_channel: defaultChannel },
      isEnabled: enabled
    });
    state.integrations = await fetchIntegrationSettings();
    showToast("保存しました");
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='slack-save-rules']")?.addEventListener("click", async () => {
    const { saveSlackRule, fetchSlackRules } = await import("./api");
    for (const rule of state.slackRules) {
      const enabled = root.querySelector<HTMLInputElement>(`[data-slack-rule-id="${rule.id}"][data-slack-field="enabled"]`)?.checked ?? rule.enabled;
      const channel = root.querySelector<HTMLInputElement>(`[data-slack-rule-id="${rule.id}"][data-slack-field="channel"]`)?.value ?? rule.channel;
      await saveSlackRule({ ...rule, enabled, channel });
    }
    state.slackRules = await fetchSlackRules();
    showToast("ルールを保存しました");
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='slack-test']")?.addEventListener("click", async () => {
    const { sendSlackNotification } = await import("./api");
    const result = await sendSlackNotification("new_order", "🧪 これはテスト通知です (syusen-cloud)");
    if (result.ok) showToast("テスト送信成功");
    else showToast("送信失敗: " + (result.error ?? ""), "error");
  });

  // ── 副資材 編集 ────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='material-receive']")?.addEventListener("click", () => {
    state.materialEditing = null;
    state.materialEditingIsNew = true;
    renderApp();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='material-adjust']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id ?? "";
      const m = state.materialList.find((x) => x.id === id);
      if (m) {
        state.materialEditing = m;
        state.materialEditingIsNew = false;
        renderApp();
      }
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='material-close']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.currentTarget !== e.target && !(e.target as HTMLElement).matches("button")) return;
      state.materialEditing = null;
      state.materialEditingIsNew = false;
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='material-save']")?.addEventListener("click", async () => {
    const id = state.materialEditingIsNew ? `mat_${Date.now()}` : (state.materialEditing?.id ?? "");
    const record: MaterialRecord = {
      id,
      code: root.querySelector<HTMLInputElement>("#mat-code")?.value ?? "",
      name: root.querySelector<HTMLInputElement>("#mat-name")?.value ?? "",
      unit: root.querySelector<HTMLInputElement>("#mat-unit")?.value ?? "個",
      currentStock: Number(root.querySelector<HTMLInputElement>("#mat-stock")?.value) || 0,
      minimumStock: Number(root.querySelector<HTMLInputElement>("#mat-min")?.value) || 0,
      unitCost: Number(root.querySelector<HTMLInputElement>("#mat-cost")?.value) || 0,
      lastUpdated: root.querySelector<HTMLInputElement>("#mat-last-date")?.value ?? new Date().toISOString().slice(0, 10)
    };
    (record as MaterialRecord & { materialType?: string }).materialType = root.querySelector<HTMLSelectElement>("#mat-type")?.value ?? "";
    if (!record.code || !record.name) { showToast("コードと品名は必須です", "warning"); return; }
    const { saveMaterial, fetchMaterialList } = await import("./api");
    const saved = await saveMaterial(record);
    if (saved) {
      state.materialList = await fetchMaterialList();
      state.materialEditing = null;
      state.materialEditingIsNew = false;
      showToast("保存しました");
      renderApp();
    } else showToast("保存失敗", "error");
  });
  root.querySelector<HTMLButtonElement>("[data-action='material-delete']")?.addEventListener("click", async () => {
    const id = (document.querySelector<HTMLButtonElement>("[data-action='material-delete']")?.dataset.id) ?? "";
    if (!id) return;
    if (!await showConfirm("削除しますか？", { variant: "danger", confirmLabel: "削除する" })) return;
    const { deleteMaterial, fetchMaterialList } = await import("./api");
    if (await deleteMaterial(id)) {
      state.materialList = await fetchMaterialList();
      state.materialEditing = null;
      renderApp();
    }
  });

  // ── ユーザー管理 ────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='user-new']")?.addEventListener("click", () => {
    state.userEditingId = "__new__";
    renderApp();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='user-edit']").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.userEditingId = btn.dataset.id ?? null;
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='user-cancel']")?.addEventListener("click", () => {
    state.userEditingId = null;
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='user-save']")?.addEventListener("click", async () => {
    const isNew = state.userEditingId === "__new__";
    const id = isNew ? crypto.randomUUID() : (state.userEditingId ?? "");
    const email = root.querySelector<HTMLInputElement>("#user-email")?.value.trim() ?? "";
    const name = root.querySelector<HTMLInputElement>("#user-name")?.value.trim() ?? "";
    if (!email || !name) {
      showToast("名前とメールアドレスは必須です", "warning");
      return;
    }
    const profile: UserProfile = {
      id,
      email,
      displayName: name,
      staffCode: root.querySelector<HTMLInputElement>("#user-code")?.value ?? "",
      department: (root.querySelector<HTMLSelectElement>("#user-dept")?.value as UserProfile["department"]) ?? "all",
      role: (root.querySelector<HTMLSelectElement>("#user-role")?.value as UserProfile["role"]) ?? "staff",
      phone: root.querySelector<HTMLInputElement>("#user-phone")?.value ?? "",
      isActive: root.querySelector<HTMLInputElement>("#user-active")?.checked ?? true
    };
    if (isNew) {
      const password = root.querySelector<HTMLInputElement>("#user-password")?.value ?? "";
      if (password.length < 8) {
        showToast("パスワードは8文字以上必要です", "warning");
        return;
      }
      try {
        await signUp(email, password);
      } catch (e) {
        showToast("Auth登録失敗: " + (e instanceof Error ? e.message : ""), "error");
        return;
      }
    }
    const { saveUserProfile, fetchUserProfiles, recordAudit } = await import("./api");
    const saved = await saveUserProfile(profile);
    if (saved) {
      await recordAudit({
        action: isNew ? "user_create" : "user_update",
        entityType: "user",
        entityId: id,
        userEmail: state.user?.email
      });
      state.userProfiles = await fetchUserProfiles();
      state.userEditingId = null;
      showToast("保存しました");
      renderApp();
    } else showToast("保存失敗", "error");
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='user-delete']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!await showConfirm("削除しますか？", { variant: "danger", confirmLabel: "削除する" })) return;
      const id = btn.dataset.id ?? "";
      const { deleteUserProfile, fetchUserProfiles, recordAudit } = await import("./api");
      const ok = await deleteUserProfile(id);
      if (ok) {
        await recordAudit({ action: "user_delete", entityType: "user", entityId: id, userEmail: state.user?.email });
        state.userProfiles = await fetchUserProfiles();
        renderApp();
      } else showToast("削除失敗", "error");
    });
  });

  // ── プロフィール ──────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='profile-save-sender']")?.addEventListener("click", async () => {
    if (!state.myProfile) return;
    const senderId = root.querySelector<HTMLSelectElement>("#profile-sender")?.value ?? "";
    const updated: UserProfile = { ...state.myProfile, defaultMailSenderId: senderId };
    const { saveUserProfile } = await import("./api");
    await saveUserProfile(updated);
    state.myProfile = updated;
    showToast("保存しました");
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='profile-change-password']")?.addEventListener("click", async () => {
    const pw = root.querySelector<HTMLInputElement>("#profile-new-password")?.value ?? "";
    if (pw.length < 8) {
      showToast("8文字以上のパスワードを入力してください", "warning");
      return;
    }
    try {
      await updatePassword(pw);
      showToast("パスワードを変更しました");
    } catch (e) {
      showToast("変更失敗: " + (e instanceof Error ? e.message : ""), "error");
    }
  });

  // ── 外部連携設定 ────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-action='int-edit']").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.integrationEditingId = btn.dataset.id ?? null;
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='int-cancel']")?.addEventListener("click", () => {
    state.integrationEditingId = null;
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='int-save']")?.addEventListener("click", async () => {
    const id = (document.querySelector<HTMLButtonElement>("[data-action='int-save']")?.dataset.id) ?? "";
    const original = state.integrations.find((i) => i.id === id);
    if (!original) return;
    const config: Record<string, string> = { ...original.config };
    Object.keys(config).forEach((k) => {
      const inp = root.querySelector<HTMLInputElement>(`#int-${k}`);
      if (inp) config[k] = inp.value;
    });
    const enabled = root.querySelector<HTMLInputElement>("#int-enabled")?.checked ?? false;
    const { saveIntegrationSetting, fetchIntegrationSettings } = await import("./api");
    const saved = await saveIntegrationSetting({ ...original, config, isEnabled: enabled });
    if (saved) {
      state.integrations = await fetchIntegrationSettings();
      state.integrationEditingId = null;
      showToast("保存しました");
      renderApp();
    } else showToast("保存失敗", "error");
  });

  // Shopify同期
  root.querySelectorAll<HTMLButtonElement>("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const setting = state.integrations.find((i) => i.provider === "shopify");
      if (!setting) {
        showToast("Shopify連携が未設定です", "warning");
        return;
      }
      btn.textContent = "同期中…";
      (btn as HTMLButtonElement).disabled = true;
      const { syncShopifyOrders, fetchShopifyOrders } = await import("./api");
      const result = await syncShopifyOrders(setting);
      if (result.error) {
        showToast("同期失敗: " + result.error, "error");
      } else {
        showToast(`${result.count}件を同期しました`);
        state.shopifyOrders = await fetchShopifyOrders();
      }
      renderApp();
    });
  });

  // Google Calendar同期
  root.querySelectorAll<HTMLButtonElement>("[data-action='int-sync-gcal']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const setting = state.integrations.find((i) => i.provider === "google_calendar");
      if (!setting) return;
      btn.textContent = "同期中…";
      (btn as HTMLButtonElement).disabled = true;
      const { syncGoogleCalendar, fetchCalendarEvents } = await import("./api");
      const result = await syncGoogleCalendar(setting);
      if (result.error) showToast("同期失敗: " + result.error, "error");
      else {
        showToast(`${result.count}件を同期しました`);
        state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
      }
      renderApp();
    });
  });

  // FAX OCRアップロード
  root.querySelector<HTMLButtonElement>("[data-action='fax-upload']")?.addEventListener("click", async () => {
    const fileInput = root.querySelector<HTMLInputElement>("#fax-file");
    const file = fileInput?.files?.[0];
    if (!file) {
      showToast("FAX画像を選択してください", "warning");
      return;
    }
    const setting = state.integrations.find((i) => i.provider === "cloud_vision");
    if (!setting || !setting.config["api_key"]) {
      showToast("Cloud Vision API Key が設定されていません。/integrations で設定してください", "warning");
      return;
    }
    state.faxProcessing = true;
    state.faxOcrText = null;
    renderApp();
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = String(reader.result ?? "");
        const { ocrFaxImage, saveFaxRecord, fetchFaxInbox } = await import("./api");
        const result = await ocrFaxImage(setting, base64);
        const senderName = root.querySelector<HTMLInputElement>("#fax-sender-name")?.value ?? "";
        const senderPhone = root.querySelector<HTMLInputElement>("#fax-sender-phone")?.value ?? "";
        await saveFaxRecord({
          id: `fax_${Date.now()}`,
          receivedAt: new Date().toISOString(),
          senderName,
          senderPhone,
          ocrStatus: result.error ? "failed" : "done",
          ocrText: result.text
        });
        state.faxOcrText = result.error ? `エラー: ${result.error}` : result.text;
        state.faxRecords = await fetchFaxInbox();
        state.faxProcessing = false;
        renderApp();
      };
      reader.readAsDataURL(file);
    } catch (e) {
      showToast("OCR失敗: " + (e instanceof Error ? e.message : ""), "error");
      state.faxProcessing = false;
      renderApp();
    }
  });

  // ── メール送信元管理 ──────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='ms-new']")?.addEventListener("click", () => {
    state.mailSenderEditingId = "__new__";
    renderApp();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='ms-edit']").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.mailSenderEditingId = btn.dataset.id ?? null;
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='ms-cancel']")?.addEventListener("click", () => {
    state.mailSenderEditingId = null;
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='ms-save']")?.addEventListener("click", async () => {
    const id = (root.querySelector<HTMLButtonElement>("[data-action='ms-save']")?.dataset.id) || `sender_${Date.now()}`;
    const sender: MailSender = {
      id,
      name: root.querySelector<HTMLInputElement>("#ms-name")?.value || "",
      email: root.querySelector<HTMLInputElement>("#ms-email")?.value || "",
      displayName: root.querySelector<HTMLInputElement>("#ms-display-name")?.value || "",
      replyTo: root.querySelector<HTMLInputElement>("#ms-reply-to")?.value || "",
      signature: root.querySelector<HTMLTextAreaElement>("#ms-signature")?.value || "",
      isDefault: root.querySelector<HTMLInputElement>("#ms-default")?.checked ?? false,
      isVerified: state.mailSenders.find((s) => s.id === id)?.isVerified ?? false
    };
    if (!sender.name || !sender.email) {
      showToast("名前とメールアドレスは必須です", "warning");
      return;
    }
    const { saveMailSender, fetchMailSenders } = await import("./api");
    const saved = await saveMailSender(sender);
    if (saved) {
      state.mailSenders = await fetchMailSenders();
      state.mailSenderEditingId = null;
      showToast("保存しました");
      renderApp();
    } else {
      showToast("保存に失敗しました", "error");
    }
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='ms-delete']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!await showConfirm("削除しますか？", { variant: "danger", confirmLabel: "削除する" })) return;
      const id = btn.dataset.id ?? "";
      const { deleteMailSender, fetchMailSenders } = await import("./api");
      const ok = await deleteMailSender(id);
      if (ok) {
        state.mailSenders = await fetchMailSenders();
        renderApp();
      } else showToast("削除失敗", "error");
    });
  });

  // ── 出荷カレンダー ────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-sc-ym]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ym = btn.dataset.scYm;
      if (!ym) return;
      state.shipmentCalendarYearMonth = ym;
      state.shipmentCalendarData = null;
      state.shipmentCalendarSelectedDate = null;
      renderApp();
      const { fetchShipmentCalendar } = await import("./api");
      state.shipmentCalendarData = await fetchShipmentCalendar(ym);
      renderApp();
    });
  });
  root.querySelectorAll<HTMLElement>("[data-sc-date]").forEach((cell) => {
    cell.addEventListener("click", () => {
      const date = cell.dataset.scDate;
      if (!date) return;
      state.shipmentCalendarSelectedDate = state.shipmentCalendarSelectedDate === date ? null : date;
      renderApp();
    });
  });

  // ── カレンダー ────────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      state.calendarYearMonth = btn.dataset.ym ?? state.calendarYearMonth;
      const { fetchCalendarEvents } = await import("./api");
      state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
      renderApp();
    });
  });
  root.querySelector<HTMLInputElement>("#cal-month-input")?.addEventListener("change", async (e) => {
    state.calendarYearMonth = (e.target as HTMLInputElement).value;
    const { fetchCalendarEvents } = await import("./api");
    state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
    renderApp();
  });
  root.querySelector<HTMLSelectElement>("#cal-filter-category")?.addEventListener("change", (e) => {
    state.calendarFilterCategory = (e.target as HTMLSelectElement).value;
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='cal-new']")?.addEventListener("click", () => {
    const now = new Date();
    state.calendarEdit = {
      isOpen: true,
      isNew: true,
      event: {
        id: `evt_${Date.now()}`,
        title: "",
        category: "general",
        startsAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
        isAllDay: false
      }
    };
    renderApp();
  });
  // 日付セルクリックで新規作成
  root.querySelectorAll<HTMLElement>("[data-cal-date]").forEach((cell) => {
    if (cell.tagName === "BUTTON") return; // ボタンは除外
    cell.addEventListener("click", (e) => {
      // イベント自体のクリックは除外
      if ((e.target as HTMLElement).closest(".cal-event")) return;
      const date = cell.dataset.calDate ?? "";
      state.calendarEdit = {
        isOpen: true,
        isNew: true,
        event: {
          id: `evt_${Date.now()}`,
          title: "",
          category: "general",
          startsAt: `${date}T10:00:00`,
          isAllDay: false
        }
      };
      renderApp();
    });
  });
  // イベントクリックで編集
  root.querySelectorAll<HTMLButtonElement>("[data-cal-event-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.calEventId;
      const ev = state.calendarEvents.find((x) => x.id === id);
      if (!ev) return;
      state.calendarEdit = { isOpen: true, isNew: false, event: { ...ev } };
      renderApp();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='cal-close']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.currentTarget !== e.target && !(e.target as HTMLElement).matches("button")) return;
      state.calendarEdit = null;
      renderApp();
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='cal-save']")?.addEventListener("click", async () => {
    if (!state.calendarEdit) return;
    const { saveCalendarEvent, fetchCalendarEvents, CALENDAR_CATEGORY_COLORS } = await import("./api");
    const id = (document.querySelector<HTMLButtonElement>("[data-action='cal-save']")?.dataset.id) || state.calendarEdit.event.id || `evt_${Date.now()}`;
    const cat = (root.querySelector<HTMLSelectElement>("#cal-category")?.value ?? "general") as keyof typeof CALENDAR_CATEGORY_COLORS;
    const ev: CalendarEvent = {
      id,
      title: root.querySelector<HTMLInputElement>("#cal-title")?.value ?? "",
      category: cat,
      startsAt: new Date(root.querySelector<HTMLInputElement>("#cal-starts")?.value ?? new Date().toISOString()).toISOString(),
      endsAt: root.querySelector<HTMLInputElement>("#cal-ends")?.value ? new Date(root.querySelector<HTMLInputElement>("#cal-ends")!.value).toISOString() : undefined,
      isAllDay: root.querySelector<HTMLInputElement>("#cal-allday")?.checked ?? false,
      location: root.querySelector<HTMLInputElement>("#cal-location")?.value ?? "",
      relatedCustomerCode: root.querySelector<HTMLInputElement>("#cal-customer")?.value ?? "",
      description: root.querySelector<HTMLTextAreaElement>("#cal-description")?.value ?? "",
      color: CALENDAR_CATEGORY_COLORS[cat]
    };
    if (!ev.title) {
      showToast("タイトルは必須です", "warning");
      return;
    }
    const saved = await saveCalendarEvent(ev);
    if (saved) {
      state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
      state.calendarEdit = null;
      showToast("保存しました");
      renderApp();
    } else showToast("保存失敗", "error");
  });
  root.querySelector<HTMLButtonElement>("[data-action='cal-delete']")?.addEventListener("click", async () => {
    const id = (document.querySelector<HTMLButtonElement>("[data-action='cal-delete']")?.dataset.id) ?? "";
    if (!id) return;
    if (!await showConfirm("削除しますか？", { variant: "danger", confirmLabel: "削除する" })) return;
    const { deleteCalendarEvent, fetchCalendarEvents } = await import("./api");
    const ok = await deleteCalendarEvent(id);
    if (ok) {
      state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
      state.calendarEdit = null;
      showToast("削除しました");
      renderApp();
    } else showToast("削除失敗", "error");
  });

  root.querySelector<HTMLButtonElement>("[data-action='import-execute']")?.addEventListener("click", async () => {
    if (!state.importPreview) return;
    state.importing = true;
    renderApp();
    try {
      const validRows = state.importPreview.rows.filter((r) => r._valid);
      const result = await importToSupabase(state.importEntity, validRows);
      state.importResult = `取り込み完了: ${result.inserted}件成功 / ${result.failed}件失敗`;
      state.importPreview = null;
    } catch (e) {
      state.importResult = `エラー: ${e instanceof Error ? e.message : String(e)}`;
    } finally {
      state.importing = false;
      renderApp();
    }
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

  root.querySelector<HTMLButtonElement>("[data-action='download-relay-config']")?.addEventListener("click", () => {
    const config = {
      supabase_url: SUPABASE_URL,
      supabase_anon_key: SUPABASE_ANON_KEY || "（Supabaseダッシュボードから取得して貼り付け）",
      z_drive_path: "Z:\\",
      sync_modules: ["sk", "sh", "k5", "h5"],
      interval_minutes: 5,
      use_odbc: false,
      odbc_dsn: "MagicSake",
      log_level: "INFO"
    };
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "relay_config.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='copy-code']").forEach((button) => {
    button.addEventListener("click", async () => {
      const encoded = button.dataset.code ?? "";
      if (!encoded) return;
      try {
        await navigator.clipboard.writeText(decodeURIComponent(encoded));
        button.textContent = "コピー済み";
        window.setTimeout(() => {
          button.textContent = "コピー";
        }, 1600);
      } catch (error) {
        console.warn("Clipboard code copy failed", error);
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
    const linkLine = "\n\n商品詳細はこちら: https://kaneishuzo.co.jp/products";
    if (!state.emailBody.includes("https://kaneishuzo.co.jp/products")) {
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

  // 送信元セレクタ
  root.querySelector<HTMLSelectElement>("#email-sender")?.addEventListener("change", (e) => {
    state.emailSenderId = (e.target as HTMLSelectElement).value;
  });

  root.querySelector<HTMLButtonElement>("[data-action='email-send']")?.addEventListener("click", () => {
    collectEmailFormFromDom(root);
    state.actionLoading = true;
    state.emailSending = true;
    renderApp();
    const campaign = buildEmailCampaignPayload("sent");
    const sender = state.mailSenders.find((s) => s.id === state.emailSenderId);

    void sendEmailCampaign(campaign, sender)
      .then(async (result) => {
        await saveEmailCampaign({
          ...campaign,
          recipientCount: result.sent
        });
        state.emailSaveMessage = `${result.sent.toLocaleString("ja-JP")} 件送信しました。`;
        state.actionLoading = false;
        state.emailSending = false;
        renderApp();
        showToast(`${result.sent}件送信完了`);
      })
      .catch(async () => {
        await saveEmailCampaign(buildEmailCampaignPayload("draft"));
        state.emailSaveMessage = "APIキー未設定のため下書きを保存しました。";
        state.actionLoading = false;
        state.emailSending = false;
        renderApp();
        showToast("APIキー未設定のため下書き保存しました", "warning");
      });
  });
}

function renderApp(): void {
  const app = document.querySelector<HTMLElement>("#app");
  if (!app) return;
  app.innerHTML = renderShell();
  bindEvents(app);
  if (state.pickerMode) {
    app.querySelector<HTMLInputElement>("#modal-search")?.focus();
  }
  if (state.globalSearchOpen) {
    app.querySelector<HTMLInputElement>("#global-search-input")?.focus();
  }
  if (shouldShowLogin()) {
    app.querySelector<HTMLInputElement>("#auth-email")?.focus();
  }
  // フォームデザイナー + 印刷プレビューを画面幅に合わせてスケーリング
  requestAnimationFrame(() => {
    for (const scalerId of ["fd-scaler", "print-scaler"]) {
      const scaler = app.querySelector<HTMLElement>(`#${scalerId}`);
      const inner = scaler?.querySelector<HTMLElement>(".fd-canvas, .print-preview");
      const printPage = inner?.querySelector<HTMLElement>(".print-page") ?? inner;
      if (!scaler || !printPage) continue;
      const panelWidth = scaler.parentElement?.clientWidth ?? 0;
      const contentWidth = printPage.offsetWidth;
      if (panelWidth > 0 && contentWidth > 0 && contentWidth > panelWidth - 24) {
        const scale = (panelWidth - 24) / contentWidth;
        scaler.style.transform = `scale(${scale})`;
        scaler.style.transformOrigin = "top left";
        scaler.style.height = `${(printPage.offsetHeight + 48) * scale}px`;
      } else {
        scaler.style.transform = "";
        scaler.style.height = "";
      }
    }
  });

  // サイドバー・モーダル開放時のbodyスクロールロック
  const isLocked = state.sidebarOpen || state.pickerMode !== null || state.globalSearchOpen;
  document.body.style.overflow = isLocked ? "hidden" : "";
  document.body.style.touchAction = isLocked ? "none" : "";
}

const CACHE_KEY = "sake-cloud-cache";
// リレーが5分毎に同期するため、キャッシュはそれに合わせて5分
// 伝票・売上などのトランザクションデータはキャッシュしない
const CACHE_TTL = 5 * 60 * 1000; // 5分

function saveCache(): void {
  try {
    const cache = {
      ts: Date.now(),
      // masterStats のみキャッシュ（マスタは頻繁に変わらない）
      masterStats: state.masterStats,
      pipelineMeta: state.pipelineMeta,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* quota超えは無視 */ }
}

function restoreCache(): boolean {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    const cache = JSON.parse(raw);
    if (Date.now() - cache.ts > CACHE_TTL) return false;
    if (cache.masterStats) state.masterStats = cache.masterStats;
    if (cache.pipelineMeta) state.pipelineMeta = cache.pipelineMeta;
    return true;
  } catch { return false; }
}

let lastLoadTime = 0;

async function loadData(): Promise<void> {
  // キャッシュから即座に復元して表示
  const cached = restoreCache();
  if (cached) {
    state.loading = false;
    renderApp();
  }

  state.loading = !cached;
  if (!cached) renderApp();
  try {
    const [
      salesSummary,
      paymentStatus,
      masterStats,
      pipelineMeta,
      invoiceRecords,
      customerLedger,
      salesAnalytics,
      syncDashboard
    ] = await Promise.all([
      fetchSalesSummary(),
      fetchPaymentStatus(),
      fetchMasterStats(),
      fetchPipelineMeta(),
      fetchInvoices(state.invoiceFilter),
      fetchCustomerLedger(state.ledgerCustomerCode),
      fetchSalesAnalytics(),
      fetchSyncDashboard()
    ]);

    state.salesSummary = salesSummary;
    state.paymentStatus = paymentStatus;
    state.masterStats = masterStats;
    state.pipelineMeta = pipelineMeta;
    state.invoiceRecords = invoiceRecords;
    state.customerLedger = customerLedger;
    state.salesAnalytics = salesAnalytics;
    state.syncDashboard = syncDashboard;

    // お知らせ取得
    fetchAnnouncements().then((list) => {
      state.announcements = list;
      renderApp();
    });

    // メール配信先をバックグラウンドで取得
    if (EMAIL_RECIPIENTS.length === 0) {
      void loadEmailRecipients();
    }

    // rawブラウザのテーブル一覧をバックグラウンドで取得
    if (state.rawTableList.length === 0) {
      fetchRawTableList().then((list) => {
        state.rawTableList = list;
        if (state.route === "/raw-browser") renderApp();
      });
    }

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
    saveCache();
  } catch (error) {
    if (!cached) {
      state.error = error instanceof Error ? error.message : "データの取得に失敗しました。";
    }
  } finally {
    state.loading = false;
    renderApp();
    void loadRouteData(state.route);
    lastLoadTime = Date.now();
  }
}

window.addEventListener("popstate", () => {
  state.route = normalizePath(location.pathname);
  state.currentCategory = inferCurrentCategory(state.route);
  state.sidebarOpen = false;
  closeGlobalSearch();
  void loadRouteData(state.route);
});

window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    state.globalSearchOpen = true;
    renderApp();
    return;
  }

  if (event.key === "Escape") {
    if (state.globalSearchOpen) {
      closeGlobalSearch();
      renderApp();
      return;
    }
    if (state.pickerMode) {
      closePicker();
      renderApp();
      return;
    }
    if (state.route === "/invoice-entry" && !state.invoiceSaving) {
      clearInvoiceForm();
      renderApp();
    }
    return;
  }

  if (
    state.route === "/invoice-entry" &&
    !state.invoiceSaving &&
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "s"
  ) {
    event.preventDefault();
    const app = document.querySelector<HTMLElement>("#app");
    if (app) {
      persistInvoice(app);
    }
  }
});

state.user = getSession() ? currentUser() : null;

// ログイン済みならプロフィールをロード
if (state.user?.email) {
  void (async () => {
    const { fetchMyProfile } = await import("./api");
    state.myProfile = await fetchMyProfile(state.user!.email);
    renderApp();
  })();
}

// localStorage から印刷設定を復元
try {
  const savedOpts = localStorage.getItem("sake_print_options");
  if (savedOpts) state.printOptions = { ...state.printOptions, ...JSON.parse(savedOpts) };
  const savedCompany = localStorage.getItem("sake_print_company");
  if (savedCompany) state.printCompany = { ...state.printCompany, ...JSON.parse(savedCompany) };
  const savedFdPos = localStorage.getItem("sake_fd_positions");
  if (savedFdPos) state.fdSavedPositions = JSON.parse(savedFdPos);
} catch {
  // 無視して既定値を使う
}


// ===== グローバルドラッグハンドラ（renderAppの外で常駐） =====
// イベント委任: document上でmousedown → .fd-draggable を検出して処理
(function setupGlobalDrag() {
  let dragEl: HTMLElement | null = null;
  let startX = 0;
  let startY = 0;
  let origLeft = 0;
  let origTop = 0;
  let mmPerPx = 1;

  document.addEventListener("mousedown", (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(".fd-draggable");
    if (!target || !state.fdDesignMode) return;
    e.preventDefault();

    const canvas = target.closest<HTMLElement>(".fd-canvas");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    mmPerPx = 228.6 / rect.width;

    dragEl = target;
    startX = e.clientX;
    startY = e.clientY;
    origLeft = parseFloat(target.style.left) || 0;
    origTop = parseFloat(target.style.top) || 0;

    // アクティブ表示
    document.querySelectorAll<HTMLElement>(".fd-active").forEach((a) => a.classList.remove("fd-active"));
    target.classList.add("fd-active", "fd-dragging");
    state.fdActiveFieldId = target.dataset.fdId ?? null;

    const info = document.querySelector<HTMLElement>("#fd-selected-info");
    if (info) info.textContent = `選択中: ${target.title}`;
    const selX = document.querySelector<HTMLInputElement>("#fd-sel-x");
    const selY = document.querySelector<HTMLInputElement>("#fd-sel-y");
    if (selX) selX.value = String(origLeft);
    if (selY) selY.value = String(origTop);
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragEl) return;
    const dx = (e.clientX - startX) * mmPerPx;
    const dy = (e.clientY - startY) * mmPerPx;
    const newX = Math.round((origLeft + dx) * 2) / 2;
    const newY = Math.round((origTop + dy) * 2) / 2;
    dragEl.style.left = newX + "mm";
    dragEl.style.top = newY + "mm";

    const selX = document.querySelector<HTMLInputElement>("#fd-sel-x");
    const selY = document.querySelector<HTMLInputElement>("#fd-sel-y");
    if (selX) selX.value = String(newX);
    if (selY) selY.value = String(newY);
  });

  document.addEventListener("mouseup", () => {
    if (dragEl) {
      dragEl.classList.remove("fd-dragging");
      dragEl = null;
    }
  });

  // キーボード方向キーで0.5mm移動
  document.addEventListener("keydown", (e) => {
    if (!state.fdDesignMode || !state.fdActiveFieldId) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    // input内なら無視
    if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;

    const el = document.querySelector<HTMLElement>(`[data-fd-id="${state.fdActiveFieldId}"]`);
    if (!el) return;

    e.preventDefault();
    const step = 0.5;
    let x = parseFloat(el.style.left) || 0;
    let y = parseFloat(el.style.top) || 0;

    if (e.key === "ArrowLeft") x -= step;
    else if (e.key === "ArrowRight") x += step;
    else if (e.key === "ArrowUp") y -= step;
    else if (e.key === "ArrowDown") y += step;

    el.style.left = x + "mm";
    el.style.top = y + "mm";
    const selX = document.querySelector<HTMLInputElement>("#fd-sel-x");
    const selY = document.querySelector<HTMLInputElement>("#fd-sel-y");
    if (selX) selX.value = String(x);
    if (selY) selY.value = String(y);
  });
})();

// Leaflet customer map initialization
declare const L: {
  map: (id: HTMLElement) => unknown;
  tileLayer: (url: string, opts?: Record<string, unknown>) => unknown;
  marker: (latlng: [number, number]) => unknown;
};

// Google Maps instance (managed internally by initCustomerMap)
function initCustomerMap(container: HTMLElement) {
  const gm = (window as unknown as { google?: { maps: typeof google.maps } }).google?.maps;
  if (!gm) {
    container.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-secondary);">Google Maps 読込中…</div>';
    setTimeout(() => initCustomerMap(container), 500);
    return;
  }

  container.innerHTML = "";
  const map = new gm.Map(container, {
    center: { lat: 35.45, lng: 139.4 },
    zoom: 10,
    mapId: "sake-system-map",
    gestureHandling: "greedy"
  });

  const infoWindow = new gm.InfoWindow();

  function addMarker(lat: number, lng: number, color: string, label: string, popupHtml: string) {
    const marker = new gm.marker.AdvancedMarkerElement({
      map,
      position: { lat, lng },
      content: (() => {
        const el = document.createElement("div");
        el.style.cssText = `background:${color};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-weight:700;font-size:11px;cursor:pointer;`;
        el.textContent = label;
        return el;
      })()
    });
    marker.addListener("click", () => {
      infoWindow.setContent(popupHtml);
      infoWindow.open({ anchor: marker, map });
    });
  }

  // 既存取引先 (青)
  if (state.mapFilters.showCustomers) {
    const customers = state.masterStats?.customers ?? [];
    customers.forEach((c) => {
      if (!c.lat || !c.lng) return;
      if (state.mapFilters.filterBusinessType && c.businessType !== state.mapFilters.filterBusinessType) return;
      addMarker(c.lat, c.lng, "#2196F3", "既",
        `<div style="min-width:180px;"><strong>${c.name}</strong><br/><span style="color:#666;font-size:11px;">${c.code}</span><br/>既存取引先<br/>締日${c.closingDay}日 / 支払日${c.paymentDay}日${c.address1 ? `<br/>${c.address1}` : ""}</div>`);
    });
  }

  // 新規見込客 (緑)
  if (state.mapFilters.showProspects) {
    state.prospects.forEach((p) => {
      if (!p.lat || !p.lng) return;
      if (state.mapFilters.filterBusinessType && p.businessType !== state.mapFilters.filterBusinessType) return;
      const color = p.stage === "hot" || p.stage === "negotiating" ? "#EF5350" : p.stage === "won" ? "#66BB6A" : "#4CAF50";
      addMarker(p.lat, p.lng, color, "新",
        `<div style="min-width:200px;"><strong>${p.companyName}</strong><br/><span style="color:#666;font-size:11px;">${p.contactName ?? ""}</span><br/>新規見込客 (${p.stage})<br/>想定 ¥${p.expectedAmount.toLocaleString("ja-JP")} / 確度 ${p.probability}%${p.nextAction ? `<br/>${p.nextAction}` : ""}</div>`);
    });
  }

  // 納品先 (オレンジ)
  if (state.mapFilters.showDelivery) {
    state.deliveryLocations.forEach((d) => {
      if (!d.lat || !d.lng) return;
      addMarker(d.lat, d.lng, "#FF9800", "納",
        `<div style="min-width:180px;"><strong>${d.name}</strong><br/>納品先${d.customerCode ? ` (${d.customerCode})` : ""}<br/>${d.address ?? ""}${d.contactName ? `<br/>${d.contactName}` : ""}${d.deliveryNote ? `<br/>${d.deliveryNote}` : ""}</div>`);
    });
  }
}

void loadData();

// 全ページ自動更新（5分間隔）— リレー同期と合わせて常に最新を表示
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000;
setInterval(() => {
  if (!state.loading && !document.hidden) {
    void loadData();
  }
}, AUTO_REFRESH_INTERVAL);

// フォアグラウンド復帰時にデータ再取得（1分以上経過していれば）
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && Date.now() - lastLoadTime > 60 * 1000) {
    void loadData();
  }
});

// アプデ検知（2分間隔でindex.htmlのハッシュを比較）
let initialHtml = "";
fetch(`${location.origin}${import.meta.env.BASE_URL}index.html?_t=${Date.now()}`)
  .then((r) => r.text())
  .then((t) => { initialHtml = t; })
  .catch(() => {});

setInterval(async () => {
  if (!initialHtml || document.hidden) return;
  try {
    const resp = await fetch(`${location.origin}${import.meta.env.BASE_URL}index.html?_t=${Date.now()}`);
    const text = await resp.text();
    if (text !== initialHtml && !state.updateAvailable) {
      state.updateAvailable = true;
      renderApp();
    }
  } catch { /* ネットワークエラーは無視 */ }
}, 2 * 60 * 1000);
