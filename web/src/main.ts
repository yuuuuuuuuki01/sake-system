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
  fetchCustomerEfficiencyByYear,
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
  type MapCustomer,
  type CallLog,
  type LeadList,
  type LeadItem,
  type StoreOrder,
  type StoreSale,
  type TankRecord,
  type TaxDeclaration,
  fetchAnnouncements,
  type SystemAnnouncement,
  type ChurnNote,
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
import { renderQuoteList } from "./components/QuoteList";
import { renderQuoteSettings, loadQuoteSettings, saveQuoteSettings, defaultCompanySettings, type QuoteCompanySettings } from "./components/QuoteSettings";
import { renderQuoteBuilder, makeDefaultQuoteState, generateQuotePdf, syncQuoteFormToState, defaultQuoteState, type QuoteState, type QuoteTemplateType } from "./components/QuoteBuilder";
import { fetchQuoteList, fetchQuoteWithLines, fetchSystemSetting, upsertSystemSetting, type QuoteListItem } from "./api";
import { supabaseDelete } from "./supabase";
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
import { renderCustomerMap } from "./components/CustomerMap";
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
import { renderDemandPlanning, buildDefaultShifts, optimizeShifts, DEFAULT_PART_CAPACITY, DEFAULT_EMP_CAPACITY, type DemandTab, type DemandSortState, type DayShift, type CalendarCapacity } from "./components/DemandPlanning";
import { renderBrewingPlan } from "./components/BrewingPlan";
import { renderProcurement } from "./components/Procurement";
import { renderChurnAlert, buildChurnAlertFromRows, type ChurnAlertData } from "./components/ChurnAlert";
import { CHURN_REASONS } from "./api";
const CHURN_REASONS_MAP: Record<string, string> = Object.fromEntries(CHURN_REASONS.map((r) => [r.value, r.label]));

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
  | "/quote-settings"
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
  | "/shipment-calendar"
  | "/brewing-plan"
  | "/procurement";

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
  "/quote",
  "/quote-settings",
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
  "/shipment-calendar",
  "/brewing-plan",
  "/procurement"
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
  { path: "/shipment-calendar", title: "出荷カレンダー" },
  { path: "/brewing-plan", title: "醸造計画" },
  { path: "/procurement", title: "調達計画" }
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
  mapCustomers: MapCustomer[];
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
  quoteList: QuoteListItem[];
  quoteListLoading: boolean;
  quoteEditId: string | null;
  quoteCompanySettings: QuoteCompanySettings;
  productPower: ProductPower[];
  productFilter: ProductViewFilter;
  productPeriod: ProductPeriod;
  productDaily: ProductDailyRow[];
  productCustomStart: string;
  productCustomEnd: string;
  productSortState: SortState;
  customerEfficiency: CustomerEfficiency[];
  customerEfficiencyYear: number;
  customerEfficiencyGroupBy: 'billing' | 'delivery';
  customerSortState: SortState;
  dashboardSortState: SortState;
  masterSortState: SortState;
  analyticsSortState: SortState;
  masterTab: MasterTab;
  masterFilter: MasterFilterState;
  analyticsTab: AnalyticsTab;
  analyticsPeriod: import("./api").AnalyticsPeriod;
  analyticsPeriodFilter: string;
  analyticsPeriodRows: import("./api").AnalyticsBreakdownRow[];
  analyticsPeriodOptions: string[];
  analyticsPeriodChartData: import("./api").PeriodChartPoint[];
  analyticsPrevYearChartData: import("./api").PeriodChartPoint[];
  analyticsChartMetric: import("./components/SalesAnalytics").ChartMetric;
  analyticsFiscalMode: import("./components/SalesAnalytics").FiscalMode;
  analyticsDrilldown: import("./components/SalesAnalytics").AnalyticsDrilldown | null;
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
  churnNotes: ChurnNote[];
  seasonalCalendar: SeasonalCalendarState | null;
  visitPlanner: VisitPlannerState | null;
  demandAnalysis: import("./api").DemandAnalysis | null;
  safetyStockParams: import("./api").SafetyStockParams[];
  productionPlan: import("./api").ProductionPlanRow[];
  demandTab: DemandTab;
  demandPlanYearMonth: string;
  demandYearsBack: number;
  demandPlanTypeFilter: string;
  brewingPlanData: import("./api").BrewingPlanRow[];
  brewingMonthlyTrend: import("./api").BrewingMonthlyTrend[];
  brewingPlanFY: number;
  demandSort: DemandSortState;
  calendarShifts: DayShift[];
  calendarDefaultPart: number;
  calendarDefaultEmp: number;
  calendarSelectedDate: string | null;
  calendarLabelExcluded: Set<string>;
  calendarCapacity: CalendarCapacity;
  brewingSchedule: import("./api").BrewingScheduleRow[];
  brewingProductDetail: import("./api").BrewingProductDetail[];
  brewingExcludedProducts: Set<string>;
  brewingCustomCategories: import("./api").BrewingCustomCategory[];
  brewingOverrides: Record<string, string>;
  brewingStockEntries: import("./api").BrewingStockEntry[];
  brewingTypeLinks: Record<string, string[]>;
  brewingAvailableTypes: string[];
  brewingAlcoholSettings: Record<string, import("./api").BrewingAlcoholSetting>;
  brewingYearlyShipments: import("./api").BrewingYearlyShipment[];
  brewingSeasonalPattern: import("./api").BrewingSeasonalPattern[];
  brewingForecastOverrides: Record<string, number>;
  brewingRiceParams: Record<string, import("./api").BrewingRiceParams>;
  riceVarieties: import("./api").RiceVariety[];
  ricePurchaseCommitments: import("./api").RicePurchaseCommitment[];
  procurementDecisions: Record<string, number>;
  globalSearchOpen: boolean;
  globalQuery: string;
  orderHeaders: import("./api").OrderHeader[];
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
    case "/quote-settings":
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
    case "/brewing-plan":
    case "/procurement":
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
  mapCustomers: [],
  callLogs: [],
  mapFilters: {
    filterStatus: "all",
    filterArea: "",
    filterBiz: ""
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
  quoteState: makeDefaultQuoteState(loadQuoteSettings()),
  quoteCustomerQuery: "",
  quoteProductQuery: "",
  quotePricing: null,
  quoteList: [] as QuoteListItem[],
  quoteListLoading: false,
  quoteEditId: null as string | null,
  quoteCompanySettings: loadQuoteSettings(),
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
  analyticsSortState: [] as SortState,
  customerEfficiency: [],
  customerEfficiencyYear: (() => { const now = new Date(); return now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1; })(),
  customerEfficiencyGroupBy: 'billing' as 'billing' | 'delivery',
  masterTab: "customers",
  masterFilter: { ...defaultMasterFilter },
  analyticsTab: "products",
  analyticsPeriod: "all" as import("./api").AnalyticsPeriod,
  analyticsPeriodFilter: "",
  analyticsPeriodRows: [] as import("./api").AnalyticsBreakdownRow[],
  analyticsPeriodChartData: [] as import("./api").PeriodChartPoint[],
  analyticsPrevYearChartData: [] as import("./api").PeriodChartPoint[],
  analyticsChartMetric: "amount" as import("./components/SalesAnalytics").ChartMetric,
  analyticsFiscalMode: "calendar" as import("./components/SalesAnalytics").FiscalMode,
  analyticsPeriodOptions: [] as string[],
  analyticsStaffFilter: "",
  analyticsTagFilter: "",
  analyticsStaffPeriod: "all" as import("./api").AnalyticsPeriod,
  analyticsStaffPeriodFilter: "",
  analyticsStaffPeriodOptions: [] as string[],
  analyticsStaffTotals: [] as import("./api").AnalyticsBreakdownRow[],
  analyticsStaffDrilldown: null as { code: string; name: string; breakdownTab: "customers" | "products"; customerRows: import("./api").StaffBreakdownRow[]; productRows: import("./api").StaffBreakdownRow[] } | null,
  analyticsDrilldown: null as import("./components/SalesAnalytics").AnalyticsDrilldown,
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
  churnNotes: [],
  seasonalCalendar: null,
  visitPlanner: null,
  demandAnalysis: null,
  safetyStockParams: [],
  productionPlan: [],
  demandTab: "demand",
  demandPlanYearMonth: new Date().toISOString().slice(0, 7),
  demandYearsBack: 3,
  demandPlanTypeFilter: "monthly",
  brewingPlanData: [] as import("./api").BrewingPlanRow[],
  brewingMonthlyTrend: [] as import("./api").BrewingMonthlyTrend[],
  brewingPlanFY: (() => { const now = new Date(); return now.getMonth() >= 9 ? now.getFullYear() : now.getFullYear() - 1; })(),
  demandSort: null as DemandSortState,
  calendarShifts: buildDefaultShifts(new Date().toISOString().slice(0, 7), 1, 0),
  calendarDefaultPart: 1,
  calendarDefaultEmp: 0,
  calendarSelectedDate: null as string | null,
  calendarLabelExcluded: new Set<string>(),
  calendarCapacity: { partCapacity: DEFAULT_PART_CAPACITY, empCapacity: DEFAULT_EMP_CAPACITY } as CalendarCapacity,
  brewingSchedule: [] as import("./api").BrewingScheduleRow[],
  brewingProductDetail: [] as import("./api").BrewingProductDetail[],
  brewingExcludedProducts: new Set<string>(),
  brewingCustomCategories: [] as import("./api").BrewingCustomCategory[],
  brewingOverrides: {} as Record<string, string>,
  brewingStockEntries: [] as import("./api").BrewingStockEntry[],
  brewingTypeLinks: {} as Record<string, string[]>,
  brewingAvailableTypes: [] as string[],
  brewingAlcoholSettings: {} as Record<string, import("./api").BrewingAlcoholSetting>,
  brewingYearlyShipments: [] as import("./api").BrewingYearlyShipment[],
  brewingSeasonalPattern: [] as import("./api").BrewingSeasonalPattern[],
  brewingForecastOverrides: {} as Record<string, number>,
  brewingRiceParams: {} as Record<string, import("./api").BrewingRiceParams>,
  riceVarieties: [] as import("./api").RiceVariety[],
  ricePurchaseCommitments: [] as import("./api").RicePurchaseCommitment[],
  procurementDecisions: {} as Record<string, number>,
  globalSearchOpen: false,
  globalQuery: "",
  orderHeaders: [],
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
      case "/quote":
        if (state.quoteEditId === null && state.quoteList.length === 0) {
          state.quoteListLoading = true;
          renderApp();
          state.quoteList = await fetchQuoteList();
          state.quoteListLoading = false;
        }
        if (state.prospects.length === 0) {
          const { fetchProspects } = await import("./api");
          state.prospects = await fetchProspects();
        }
        break;
      case "/invoice":
        if (state.invoiceRecords.length === 0) {
          state.invoiceRecords = await fetchInvoices(state.invoiceFilter);
        }
        break;
      case "/analytics":
        if (!state.salesAnalytics || state.salesAnalytics.monthlySales.length === 0) {
          state.salesAnalytics = await fetchSalesAnalytics();
        }
        break;
      case "/delivery":
        if (!state.deliveryNote) {
          state.deliveryNote = await fetchDeliveryNote(state.deliverySearchDocNo);
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
        state.customerEfficiency = await fetchCustomerEfficiencyByYear(state.customerEfficiencyYear, state.customerEfficiencyGroupBy);
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
      case "/churn-alert": {
        const { fetchChurnAlerts, fetchChurnNotes } = await import("./api");
        if (!state.churnAlert) {
          const dbAlerts = await fetchChurnAlerts();
          state.churnAlert = buildChurnAlertFromRows(dbAlerts);
        }
        // ノートは毎回最新を取得（保存直後に反映させるため）
        state.churnNotes = await fetchChurnNotes();
        break;
      }
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
        const { fetchDemandAnalysis, fetchSafetyStockParams, fetchProductionPlan, fetchLabelExclusions } = await import("./api");
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
            state.productionPlan = buildPlanFromAnalysis(state.demandPlanYearMonth);
          }
        }
        // ラベル除外設定をDBからロード
        const savedExcl = await fetchLabelExclusions(state.demandPlanYearMonth);
        state.calendarLabelExcluded = new Set(savedExcl);
        // 除外設定を反映して最適化
        if (state.productionPlan.length > 0) {
          const labelPlan = state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode));
          optimizeShifts(state.calendarShifts, labelPlan, state.calendarCapacity);
        }
        break;
      }
      case "/procurement":
      case "/brewing-plan": {
        const { fetchBrewingPlanSummary, fetchBrewingMonthlyTrend, fetchBrewingSchedule, fetchBrewingProductDetail, fetchBrewingCustomCategories, fetchBrewingCategoryOverrides, fetchAllBrewingStockEntries, fetchCategoryTypeLinks, fetchAvailableProductionTypes, fetchBrewingAlcoholSettings, fetchBrewingYearlyShipments, fetchBrewingSeasonalPattern, fetchBrewingForecastOverrides, fetchBrewingRiceParams, fetchRiceVarieties, fetchRicePurchaseCommitments, fetchProcurementDecisions } = await import("./api");
        const fy = state.brewingPlanFY;
        const fyStart = `${fy}-10-01`;
        const fyEnd = `${fy + 1}-09-30`;
        const [summary, trend, schedule, products, customCats, overrides, stockEntries, typeLinks, availTypes, alcSettings, yearlyShipments, seasonal, forecastOvr, riceParams, riceVars, commitments, procDecisions] = await Promise.all([
          fetchBrewingPlanSummary(fyStart, fyEnd).catch(() => []),
          fetchBrewingMonthlyTrend(fyStart, fyEnd).catch(() => []),
          fetchBrewingSchedule(fy).catch(() => []),
          fetchBrewingProductDetail(fyStart, fyEnd).catch(() => []),
          fetchBrewingCustomCategories().catch(() => []),
          fetchBrewingCategoryOverrides().catch(() => ({})),
          fetchAllBrewingStockEntries().catch(() => []),
          fetchCategoryTypeLinks().catch(() => ({})),
          fetchAvailableProductionTypes().catch(() => []),
          fetchBrewingAlcoholSettings().catch(() => ({})),
          fetchBrewingYearlyShipments().catch(() => []),
          fetchBrewingSeasonalPattern().catch(() => []),
          fetchBrewingForecastOverrides().catch(() => ({})),
          fetchBrewingRiceParams().catch(() => ({})),
          fetchRiceVarieties().catch(() => []),
          fetchRicePurchaseCommitments(fy).catch(() => []),
          fetchProcurementDecisions(fy).catch(() => ({}))
        ]);
        state.brewingPlanData = summary;
        state.brewingMonthlyTrend = trend;
        state.brewingSchedule = schedule;
        state.brewingProductDetail = products;
        state.brewingCustomCategories = customCats;
        state.brewingOverrides = overrides;
        state.brewingStockEntries = stockEntries;
        state.brewingTypeLinks = typeLinks;
        state.brewingAvailableTypes = availTypes;
        state.brewingYearlyShipments = yearlyShipments;
        state.brewingSeasonalPattern = seasonal;
        state.brewingForecastOverrides = forecastOvr;
        state.brewingRiceParams = riceParams;
        state.riceVarieties = riceVars;
        state.ricePurchaseCommitments = commitments;
        state.procurementDecisions = procDecisions;
        state.brewingAlcoholSettings = alcSettings;
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
          const { fetchMapCustomers, fetchDeliveryLocations } = await import("./api");
          const [mapCustomers, deliveries] = await Promise.all([
            fetchMapCustomers(),
            fetchDeliveryLocations()
          ]);
          state.mapCustomers = mapCustomers;
          state.deliveryLocations = deliveries;
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
            fetchTourInquiriesFromDb,
            fetchOrderHeaders
          } = await import("./api");
          if (state.prospects.length === 0) state.prospects = await fetchProspects();
          if (state.calendarEvents.length === 0) state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
          if (state.materialList.length === 0) state.materialList = await fetchMaterialList();
          if (state.workflowOrders.length === 0) state.workflowOrders = await fetchWorkflowOrdersFromDb();
          if (state.tourInquiries.length === 0) state.tourInquiries = await fetchTourInquiriesFromDb();
          if (state.orderHeaders.length === 0) state.orderHeaders = await fetchOrderHeaders();
        }
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("Route data load error:", route, err);
    showToast(`データ読み込みエラー: ${(err as Error).message ?? "不明"}`, "error");
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
      if (state.quoteEditId === null) {
        return renderQuoteList(state.quoteList, state.quoteListLoading);
      }
      return renderQuoteBuilder(
        state.quoteState,
        state.masterStats?.customers ?? [],
        state.masterStats?.products ?? [],
        state.quoteCustomerQuery,
        state.quoteProductQuery,
        state.quotePricing,
        state.quoteCompanySettings
      );
    case "/quote-settings":
      return renderQuoteSettings(state.quoteCompanySettings);
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
      return renderCustomerEfficiency(state.customerEfficiency, state.customerSortState, state.customerEfficiencyYear, state.customerEfficiencyGroupBy);
    case "/customer-analysis":
      return state.customerAnalysis
        ? renderCustomerAnalysis(state.customerAnalysis)
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
        state.demandYearsBack,
        state.demandPlanTypeFilter,
        state.demandSort,
        state.calendarShifts,
        state.calendarSelectedDate,
        state.calendarLabelExcluded,
        state.calendarCapacity
      );
    case "/brewing-plan":
      return renderBrewingPlan(state.brewingPlanData, state.brewingMonthlyTrend, state.brewingPlanFY, state.brewingProductDetail, state.brewingExcludedProducts, state.brewingCustomCategories, state.brewingOverrides, state.brewingStockEntries, state.brewingAlcoholSettings, state.brewingYearlyShipments, state.brewingSeasonalPattern, state.brewingForecastOverrides, state.brewingRiceParams);
    case "/procurement": {
      // 必要醸造量を計算（forecastと同じロジック）
      const needByCategory: Record<string, number> = {};
      if (state.brewingYearlyShipments.length > 0) {
        const now = new Date();
        const curMonth = now.getMonth() + 1;
        const curFYStart = curMonth >= 10 ? now.getFullYear() : now.getFullYear() - 1;
        const completedFYs = [...new Set(state.brewingYearlyShipments.map(s => s.fy))].filter(fy => fy < curFYStart).sort();
        const seasonMap = new Map<string, Map<number, number>>();
        for (const sp of state.brewingSeasonalPattern) {
          if (!seasonMap.has(sp.brewCategory)) seasonMap.set(sp.brewCategory, new Map());
          seasonMap.get(sp.brewCategory)!.set(sp.monthNum, sp.avgMonthlyL);
        }
        const remainMonths: number[] = [];
        for (let m = curMonth; m <= 9; m++) remainMonths.push(m);
        if (curMonth >= 10) for (let m = 1; m <= 9; m++) remainMonths.push(m);

        const catData = new Map<string, Map<number, { shipL: number; annualL: number }>>();
        for (const s of state.brewingYearlyShipments) {
          if (!catData.has(s.brewCategory)) catData.set(s.brewCategory, new Map());
          catData.get(s.brewCategory)!.set(s.fy, { shipL: s.shipmentL, annualL: s.annualizedL });
        }
        for (const [cat, data] of catData) {
          const cVals = completedFYs.filter(fy => data.has(fy)).map(fy => data.get(fy)!.shipL);
          let gr = 0;
          if (cVals.length >= 2) {
            const rates: number[] = [];
            for (let i = 1; i < cVals.length; i++) { if (cVals[i-1] > 0) rates.push((cVals[i]-cVals[i-1])/cVals[i-1]); }
            gr = rates.length > 0 ? rates.reduce((a,b)=>a+b,0)/rates.length : 0;
          }
          const effGr = (cat in state.brewingForecastOverrides) ? state.brewingForecastOverrides[cat] : gr;
          const base = cVals.length > 0 ? cVals[cVals.length-1] : (data.get(curFYStart)?.annualL ?? 0);
          const seasonal = seasonMap.get(cat) ?? new Map();
          const rem = remainMonths.reduce((s, m) => s + (seasonal.get(m) ?? 0), 0);
          const stk = state.brewingStockEntries.filter(e => e.brewCategory === cat).reduce((a, e) => a + e.volumeL, 0);
          const alc = state.brewingAlcoholSettings[cat];
          const dil = alc && alc.targetAlcoholPct > 0 ? alc.rawAlcoholPct / alc.targetAlcoholPct : 1;
          const effStock = Math.round(stk * dil);
          const projOct = Math.max(0, effStock - Math.round(rem));
          const fc = Math.round(base * (1 + effGr));
          needByCategory[cat] = Math.max(0, fc - projOct);
        }
      }
      return renderProcurement(needByCategory, state.brewingRiceParams, state.brewingCustomCategories, state.brewingSchedule, state.brewingPlanFY, state.riceVarieties, state.ricePurchaseCommitments, state.procurementDecisions);
    }
    case "/churn-alert":
      return state.churnAlert
        ? renderChurnAlert(state.churnAlert, state.churnNotes)
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
    case "/map":
      if (state.mapCustomers.length === 0) {
        return `<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>`;
      }
      return renderCustomerMap(state.mapCustomers, state.deliveryLocations, state.mapFilters);
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
      return renderSalesAnalytics(state.salesAnalytics, state.analyticsTab, state.analyticsPeriod, state.analyticsPeriodFilter, state.analyticsPeriodRows, state.analyticsPeriodOptions, state.analyticsStaffFilter, state.analyticsTagFilter, state.analyticsStaffDrilldown, state.analyticsStaffPeriod, state.analyticsStaffPeriodFilter, state.analyticsStaffPeriodOptions, state.analyticsStaffTotals, state.analyticsSortState, state.analyticsDrilldown, state.analyticsPeriodChartData, state.analyticsPrevYearChartData, state.analyticsChartMetric, state.analyticsFiscalMode);
    case "/":
      return renderHome();
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
        } : undefined,
        churnSummary: state.churnAlert ? {
          atRiskCount: state.churnAlert.atRiskCustomers.length,
          dormantCount: state.churnAlert.dormantCustomers.length,
          decliningCount: state.churnAlert.decliningCustomers.length,
          totalImpact: [...state.churnAlert.atRiskCustomers, ...state.churnAlert.dormantCustomers, ...state.churnAlert.decliningCustomers]
            .reduce((s, c) => s + c.totalAmountLast12m, 0)
        } : undefined,
        orderHeaders: state.orderHeaders
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

function renderHome(): string {
  function card(path: RoutePath, icon: string, label: string, desc: string): string {
    const href = `${import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}${path}`;
    return `<a href="${href}" data-link="${path}" class="home-card">
      <span class="home-card-icon">${icon}</span>
      <span class="home-card-label">${label}</span>
      <span class="home-card-desc">${desc}</span>
    </a>`;
  }

  const sections: Array<{ title: string; color: string; cards: string }> = [
    {
      title: "販売業務",
      color: "#1a56db",
      cards: [
        card("/invoice-entry", "📝", "伝票入力", "売上・返品を入力"),
        card("/quote", "📄", "見積作成", "見積書の作成・管理"),
        card("/invoice", "🔍", "伝票照会", "過去伝票の照会"),
        card("/delivery", "🚚", "納品書", "納品書の発行"),
        card("/billing", "💳", "月次請求", "請求書・入金管理"),
        card("/ledger", "📒", "得意先台帳", "取引履歴の確認"),
      ].join(""),
    },
    {
      title: "分析・レポート",
      color: "#7e3af2",
      cards: [
        card("/analytics", "📊", "売上分析", "期間・商品・得意先別"),
        card("/customer-analysis", "👥", "得意先分析", "ABC分析・ランク"),
        card("/product-power", "📦", "商品力分析", "商品別販売力"),
        card("/customer-efficiency", "⚡", "営業効率", "訪問効率・コスト"),
        card("/report", "📈", "集計帳票", "各種集計帳票"),
        card("/sales", "📋", "売上一覧", "売上明細一覧"),
      ].join(""),
    },
    {
      title: "営業・顧客管理",
      color: "#0e9f6e",
      cards: [
        card("/churn-alert", "🎯", "営業アクション", "離反リスク・フォロー"),
        card("/visit-planner", "📅", "訪問計画", "訪問スケジュール"),
        card("/map", "🗺️", "取引先マップ", "地図で取引先を確認"),
        card("/prospects", "🌱", "新規営業", "新規開拓の進捗"),
        card("/email", "✉️", "メール配信", "一斉メール配信"),
        card("/seasonal-calendar", "🌸", "季節提案", "季節別提案管理"),
      ].join(""),
    },
    {
      title: "受注・仕入",
      color: "#e3a008",
      cards: [
        card("/workflow", "🔄", "受注ワークフロー", "受注から出荷まで"),
        card("/shopify", "🛒", "Shopify注文", "EC受注の確認"),
        card("/purchase", "📥", "仕入・買掛", "仕入管理・買掛金"),
        card("/payment", "💰", "入金状況", "入金・回収状況"),
      ].join(""),
    },
    {
      title: "製造管理",
      color: "#e02424",
      cards: [
        card("/jikomi", "🍶", "仕込管理", "仕込帳・製造記録"),
        card("/tanks", "🛢️", "タンク管理", "タンク在庫の管理"),
        card("/tax", "📋", "酒税申告", "酒税申告書の作成"),
        card("/demand", "📆", "需要・生産計画", "需要予測・生産計画"),
        card("/brewing-plan", "🗓️", "醸造計画", "年間醸造スケジュール"),
        card("/procurement", "🌾", "調達計画", "原料米の調達・予算"),
      ].join(""),
    },
    {
      title: "マスタ・設定",
      color: "#6b7280",
      cards: [
        card("/master", "⚙️", "マスタ管理", "商品・得意先マスタ"),
        card("/store", "🏪", "店舗・直売所", "直売所の販売管理"),
        card("/tour", "🏯", "酒蔵見学", "見学予約の管理"),
        card("/setup", "🔗", "連動設定", "酒仙iとの連動"),
        card("/import", "📤", "データ取込", "CSVデータ取込"),
        card("/users", "👤", "ユーザー管理", "アカウント管理"),
      ].join(""),
    },
  ];

  return `
    <div class="home-page">
      <div class="home-welcome">
        <p class="home-welcome-date">${new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</p>
        <h2 class="home-welcome-title">何をしますか？</h2>
      </div>
      ${sections.map(s => `
        <div class="home-section">
          <h3 class="home-section-title" style="--section-color:${s.color}">
            <span class="home-section-bar"></span>${s.title}
          </h3>
          <div class="home-card-grid">${s.cards}</div>
        </div>
      `).join("")}
    </div>
  `;
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

  const PAGE_TITLES: Partial<Record<RoutePath, string>> = {
    "/invoice-entry": "伝票入力",
    "/quote": state.quoteEditId ? (state.quoteEditId === "new" ? "見積作成" : "見積編集") : "見積一覧",
    "/quote-settings": "見積設定",
    "/email": "メール配信",
    "/delivery": "納品書",
    "/shipment-calendar": "出荷カレンダー",
    "/billing": "月次請求",
    "/report": "集計帳票",
    "/invoice": "伝票照会",
    "/ledger": "得意先台帳",
    "/payment": "入金状況",
    "/sales": "売上一覧",
    "/analytics": "売上分析",
    "/customer-analysis": "得意先分析",
    "/product-power": "商品力分析",
    "/customer-efficiency": "営業効率",
    "/churn-alert": "営業アクション",
    "/visit-planner": "訪問計画",
    "/seasonal-calendar": "季節提案",
    "/map": "取引先マップ",
    "/prospects": "新規営業",
    "/list-builder": "リスト取得",
    "/calls": "通話履歴",
    "/workflow": "受注ワークフロー",
    "/mobile-order": "モバイル受注",
    "/shopify": "Shopify注文",
    "/fax": "FAX OCR",
    "/purchase": "仕入・買掛",
    "/raw-material": "手形・原料",
    "/jikomi": "仕込管理",
    "/tanks": "タンク管理",
    "/kentei": "検定管理",
    "/materials": "資材管理",
    "/tax": "酒税申告",
    "/demand": "需要・生産計画",
    "/brewing-plan": "醸造計画",
    "/procurement": "調達計画",
    "/master": "マスタ管理",
    "/calendar": "カレンダー",
    "/store": "店舗・直売所",
    "/tour": "酒蔵見学",
    "/print": "印刷",
    "/setup": "連動設定",
    "/integrations": "外部連携",
    "/slack": "Slack通知",
    "/import": "データ取込",
    "/raw-browser": "データブラウザ",
    "/users": "ユーザー管理",
    "/profile": "プロフィール",
    "/audit": "操作ログ",
  };

  const isHome = state.route === "/";
  const pageTitle = PAGE_TITLES[state.route] ?? "";

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
    ? `<span class="app-header-user">${state.user.email}</span>
       <button class="button secondary small" type="button" data-action="auth-logout">ログアウト</button>`
    : state.authSkipped
      ? `<span class="app-header-user">デモモード</span>`
      : "";

  const leftHtml = isHome
    ? `<div class="app-brand">
        <span class="app-brand-mark">syusen-cloud</span>
        <span class="app-brand-name">酒仙i クラウド</span>
       </div>`
    : `<a href="${import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}" data-link="/" class="app-back-btn">← ホーム</a>
       <span class="app-page-title">${pageTitle}</span>`;

  return `
    <div class="shell-v2">
      <header class="app-header">
        <div class="app-header-left">${leftHtml}</div>
        <div class="app-header-right">
          <button class="button secondary small" type="button" data-action="global-search-open">検索 <kbd>Ctrl+K</kbd></button>
          ${userHtml}
        </div>
      </header>
      ${renderAnnouncementBar()}
      <main class="main-v2">
        <div class="view ${state.actionLoading ? "is-busy" : ""}">${renderView()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
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
        const tradeTypeVal = (document.getElementById("ec-trade-type") as HTMLSelectElement)?.value || null;
        const ok = await updateCustomer(id, {
          name: (document.getElementById("ec-name") as HTMLInputElement).value,
          kana_name: (document.getElementById("ec-kana") as HTMLInputElement).value,
          phone: (document.getElementById("ec-phone") as HTMLInputElement).value,
          fax: (document.getElementById("ec-fax") as HTMLInputElement).value,
          postal_code: (document.getElementById("ec-postal") as HTMLInputElement).value,
          address1: (document.getElementById("ec-address") as HTMLInputElement).value,
          closing_day: parseInt((document.getElementById("ec-closing") as HTMLInputElement).value) || null,
          payment_day: parseInt((document.getElementById("ec-payment") as HTMLInputElement).value) || null,
          trade_type: tradeTypeVal,
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

  // ── 見積 ──────────────────────────────────────────────────────────────────

  // 新規作成ボタン（一覧画面）
  root.querySelector<HTMLButtonElement>("[data-action='quote-new']")?.addEventListener("click", () => {
    state.quoteState = makeDefaultQuoteState(state.quoteCompanySettings);
    state.quoteEditId = "new";
    state.quoteCustomerQuery = "";
    state.quoteProductQuery = "";
    state.quotePricing = null;
    renderApp();
  });

  // 既存見積を開く
  root.querySelectorAll<HTMLButtonElement>("[data-open-quote]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.openQuote!;
      const detail = await fetchQuoteWithLines(id);
      if (!detail) { showToast("見積の読み込みに失敗しました", "error"); return; }
      state.quoteState = {
        id: detail.id,
        quoteNo: detail.quote_no,
        quoteDate: detail.quote_date,
        validUntil: detail.valid_until ?? "",
        customerCode: detail.legacy_customer_code ?? "",
        customerName: detail.customer_name,
        customerAddress: detail.customer_address,
        subject: detail.subject,
        lines: detail.lines.map(l => ({
          productCode: l.legacy_product_code ?? "",
          productName: l.product_name,
          janCode: l.jan_code ?? "",
          caseQty: l.case_qty,
          quantity: l.quantity,
          unit: l.unit,
          unitPrice: l.unit_price,
          retailPrice: l.retail_price,
          amount: l.amount
        })),
        remarks: detail.remarks,
        taxRate: detail.tax_rate,
        deliveryDate: detail.delivery_date,
        paymentTerms: detail.payment_terms,
        deliveryPlace: detail.delivery_place,
        templateType: (detail.template_type as QuoteTemplateType) ?? "sake",
        previewMode: false
      };
      state.quoteEditId = id;
      state.quoteCustomerQuery = "";
      state.quoteProductQuery = "";
      state.quotePricing = null;
      renderApp();
    });
  });

  // 見積削除
  root.querySelectorAll<HTMLButtonElement>("[data-delete-quote]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.deleteQuote!;
      const no = btn.dataset.quoteNo ?? id;
      const ok = await showConfirm(`見積 ${no} を削除しますか？`);
      if (!ok) return;
      const deleted = await supabaseDelete("quotes", id);
      if (deleted) {
        state.quoteList = state.quoteList.filter(q => q.id !== id);
        showToast("削除しました", "success");
        renderApp();
      } else {
        showToast("削除に失敗しました", "error");
      }
    });
  });

  // 一覧に戻る
  root.querySelector<HTMLButtonElement>("[data-action='quote-back-list']")?.addEventListener("click", () => {
    state.quoteEditId = null;
    state.quoteListLoading = true;
    renderApp();
    fetchQuoteList().then(list => {
      state.quoteList = list;
      state.quoteListLoading = false;
      renderApp();
    });
  });

  // テンプレート切替
  root.querySelectorAll<HTMLInputElement>("[name='q-template']").forEach(radio => {
    radio.addEventListener("change", () => {
      state.quoteState.templateType = radio.value as QuoteTemplateType;
      renderApp();
    });
  });

  // 検索ボックス用エスケープ
  function qEsc(v: string): string {
    return (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ── 得意先リスト描画（全件表示 → 絞り込み方式）──────────────────────
  function buildCustListHtml(customers: typeof state.masterStats.customers): string {
    if (!customers.length) return `<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>`;
    return customers.map(c =>
      `<button class="search-item" type="button" data-select-customer="${qEsc(c.code)}" data-cust-name="${qEsc(c.name)}" data-cust-addr="${qEsc(c.address1 || "")}">` +
      `<span class="mono">${qEsc(c.code)}</span>` +
      `<span style="font-size:13px;font-weight:600;">${qEsc(c.name)}</span>` +
      `</button>`
    ).join("");
  }

  function showCustList(div: HTMLElement) {
    div.querySelectorAll<HTMLButtonElement>("[data-select-customer]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const code = btn.dataset.selectCustomer ?? "";
        state.quoteState.customerCode = code;
        state.quoteState.customerName = btn.dataset.custName ?? "";
        state.quoteState.customerAddress = btn.dataset.custAddr ?? "";
        state.quoteCustomerQuery = "";
        const custEl = root.querySelector<HTMLInputElement>("#q-cust-search");
        if (custEl) custEl.value = "";
        div.remove();
        state.quotePricing = await fetchCustomerPricing(state.masterStats?.customers ?? [], code);
        renderApp();
      });
    });
  }

  function updateCustSearchResults(query: string) {
    const formRow = root.querySelector<HTMLElement>("#q-cust-search")?.closest<HTMLElement>(".form-row");
    if (!formRow) return;
    let div = document.getElementById("cust-search-results") as HTMLElement | null;
    if (!div) {
      div = document.createElement("div");
      div.id = "cust-search-results";
      div.className = "search-results";
      formRow.after(div); // form-rowの直後の兄弟要素として挿入
    }
    const all = state.masterStats?.customers ?? [];
    const q = query.trim().toLowerCase();
    const list = q.length === 0 ? all : all.filter(c =>
      c.name.includes(query) || c.kanaName.includes(query) || c.code.includes(query) ||
      c.name.toLowerCase().includes(q) || c.kanaName.toLowerCase().includes(q)
    );
    div.innerHTML = buildCustListHtml(list);
    showCustList(div);
  }

  // ── 商品リスト描画（全件表示 → 絞り込み方式）──────────────────────
  function buildProdListHtml(products: typeof state.masterStats.products, pricing: typeof state.quotePricing): string {
    if (!products.length) return `<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>`;
    return products.map(p => {
      // 納入価格: 得意先のpriceTypeに基づいて解決
      const resolved = pricing ? resolveProductPrice(p, pricing) : { price: p.salePrice || 0, label: "卸価格" };
      // 希望小売価格: 商品マスタのlistPrice（定価）
      const retail = p.listPrice || 0;
      const isSpecial = resolved.label !== "標準価格" && resolved.label !== "卸価格";
      return `<button class="search-item" type="button"` +
        ` data-add-product="${qEsc(p.code)}"` +
        ` data-prod-name="${qEsc(p.name)}"` +
        ` data-prod-price="${resolved.price}"` +
        ` data-prod-retail="${retail}"` +
        ` data-prod-jan="${qEsc(p.janCode ?? "")}"` +
        ` data-prod-unit="${qEsc(p.unit)}"` +
        ` data-prod-case="${p.caseQty ?? ""}">` +
        `<span class="mono">${qEsc(p.code)}</span>` +
        `<span style="font-size:13px;font-weight:600;line-height:1.4;">${qEsc(p.name)}</span>` +
        `<span class="numeric"${isSpecial ? ' style="color:#2f855a;font-weight:700;"' : ""}>` +
        `納入 ¥${resolved.price ? resolved.price.toLocaleString("ja-JP") : "未設定"}` +
        `<small style="font-weight:400;margin-left:4px;">(${qEsc(resolved.label)})</small>` +
        `${retail ? `　定価 ¥${retail.toLocaleString("ja-JP")}` : ""}` +
        `</span>` +
        `</button>`;
    }).join("");
  }

  function bindProdListClicks(div: HTMLElement) {
    div.querySelectorAll<HTMLButtonElement>("[data-add-product]").forEach(btn => {
      btn.addEventListener("click", () => {
        const code = btn.dataset.addProduct ?? "";
        const name = btn.dataset.prodName ?? "";
        const price = parseInt(btn.dataset.prodPrice ?? "0");        // 納入価格
        const retail = parseInt(btn.dataset.prodRetail ?? "0") || null; // 希望小売価格
        const jan = btn.dataset.prodJan ?? "";
        const unit = btn.dataset.prodUnit || "本";
        const caseQtyRaw = btn.dataset.prodCase ?? "";
        const caseQty = caseQtyRaw ? parseInt(caseQtyRaw) : null;
        state.quoteState.lines.push({
          productCode: code, productName: name,
          janCode: jan, caseQty,
          quantity: 1, unit,
          unitPrice: price,    // 納入価格（得意先priceTypeで解決済み）
          retailPrice: retail, // 希望小売価格（listPrice）
          amount: price
        });
        state.quoteProductQuery = "";
        const prodEl = root.querySelector<HTMLInputElement>("#q-prod-search");
        if (prodEl) prodEl.value = "";
        renderApp();
      });
    });
  }

  function updateProdSearchResults(query: string) {
    const formRow = root.querySelector<HTMLElement>("#q-prod-search")?.closest<HTMLElement>(".form-row");
    if (!formRow) return;
    let div = document.getElementById("prod-search-results") as HTMLElement | null;
    if (!div) {
      div = document.createElement("div");
      div.id = "prod-search-results";
      div.className = "search-results";
      formRow.after(div); // form-rowの直後の兄弟要素として挿入
    }
    if (!state.masterStats) {
      div.innerHTML = `<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>`;
      return;
    }
    const all = state.masterStats.products;
    const q = query.trim().toLowerCase();
    const list = q.length === 0 ? all : all.filter(p =>
      p.name.includes(query) || p.kanaName.includes(query) || p.code.includes(query) ||
      p.name.toLowerCase().includes(q) || p.kanaName.toLowerCase().includes(q)
    );
    div.innerHTML = buildProdListHtml(list, state.quotePricing);
    bindProdListClicks(div);
  }

  // 検索ドロップダウンを外部タップで閉じるユーティリティ
  // blurではなくdocumentへのtouchstart/mousedownで閉じる
  // → キーボード閉じてもdropdownは閉じない
  function attachOutsideClose(inputEl: HTMLInputElement, dropdownId: string) {
    let handler: ((e: Event) => void) | null = null;
    function open() {
      if (handler) return;
      handler = (e: Event) => {
        const drop = document.getElementById(dropdownId);
        if (!drop) { document.removeEventListener("touchstart", handler!); document.removeEventListener("mousedown", handler!); handler = null; return; }
        if (inputEl.contains(e.target as Node) || drop.contains(e.target as Node)) return;
        drop.remove();
        document.removeEventListener("touchstart", handler!);
        document.removeEventListener("mousedown", handler!);
        handler = null;
      };
      document.addEventListener("touchstart", handler, { passive: true });
      document.addEventListener("mousedown", handler);
    }
    return open;
  }

  // 得意先検索
  (function() {
    const el = root.querySelector<HTMLInputElement>("#q-cust-search");
    if (!el) return;
    const openOutsideClose = attachOutsideClose(el, "cust-search-results");
    el.addEventListener("focus", () => {
      updateCustSearchResults(el.value);
      openOutsideClose();
    });
    el.addEventListener("compositionend", () => {
      state.quoteCustomerQuery = el.value;
      updateCustSearchResults(el.value);
    });
    el.addEventListener("input", e => {
      if ((e as InputEvent).isComposing) return;
      state.quoteCustomerQuery = el.value;
      updateCustSearchResults(el.value);
    });
    if (el.value) updateCustSearchResults(el.value);
  })();

  // 商品検索
  (function() {
    const el = root.querySelector<HTMLInputElement>("#q-prod-search");
    if (!el) return;
    const openOutsideClose = attachOutsideClose(el, "prod-search-results");
    el.addEventListener("focus", () => {
      updateProdSearchResults(el.value);
      openOutsideClose();
    });
    el.addEventListener("compositionend", () => {
      state.quoteProductQuery = el.value;
      updateProdSearchResults(el.value);
    });
    el.addEventListener("input", e => {
      if ((e as InputEvent).isComposing) return;
      state.quoteProductQuery = el.value;
      updateProdSearchResults(el.value);
    });
    if (el.value) updateProdSearchResults(el.value);
  })();

  // 得意先選択（初期レンダリング時にすでに表示されている場合）
  root.querySelectorAll<HTMLButtonElement>("[data-select-customer]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const code = btn.dataset.selectCustomer ?? "";
      state.quoteState.customerCode = code;
      state.quoteState.customerName = btn.dataset.custName ?? "";
      state.quoteState.customerAddress = btn.dataset.custAddr ?? "";
      state.quoteState.isProspect = false;
      state.quoteState.manualPriceType = undefined; // マスタ設定に戻す
      state.quoteCustomerQuery = "";
      state.quotePricing = await fetchCustomerPricing(state.masterStats?.customers ?? [], code);
      renderApp();
    });
  });

  // 販売区分（手動単価ベース）切り替え
  root.querySelector<HTMLSelectElement>("#q-price-type")?.addEventListener("change", (e) => {
    const priceType = (e.target as HTMLSelectElement).value as import("./api").PriceType;
    state.quoteState.manualPriceType = priceType;
    // quotePricing を手動区分で上書き（個別単価は既存のものを維持）
    if (state.quotePricing) {
      state.quotePricing = { ...state.quotePricing, priceType };
    } else {
      state.quotePricing = { priceType, priceGroup: "", individualPrices: new Map() };
    }
    renderApp();
  });

  // 商品追加（初期レンダリング時にすでに表示されている場合）
  root.querySelectorAll<HTMLButtonElement>("[data-add-product]").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.addProduct ?? "";
      const name = btn.dataset.prodName ?? "";
      const price = parseInt(btn.dataset.prodPrice ?? "0");
      const retail = parseInt(btn.dataset.prodRetail ?? "0") || null;
      const jan = btn.dataset.prodJan ?? "";
      const unit = btn.dataset.prodUnit || "本";
      const caseQtyRaw = btn.dataset.prodCase ?? "";
      const caseQty = caseQtyRaw ? parseInt(caseQtyRaw) : null;
      state.quoteState.lines.push({
        productCode: code, productName: name,
        janCode: jan, caseQty,
        quantity: 1, unit,
        unitPrice: price, retailPrice: retail,
        amount: price
      });
      state.quoteProductQuery = "";
      renderApp();
    });
  });

  // ── 見込み顧客検索・選択 ──────────────────────────────────────────────
  (() => {
    const el = root.querySelector<HTMLInputElement>("#q-prospect-search");
    if (!el) return;

    const openOutsideClose = attachOutsideClose(el, "q-prospect-results");

    function buildProspectResults(query: string) {
      let resultsDiv = document.getElementById("q-prospect-results") as HTMLElement | null;
      if (!resultsDiv) return;
      const q = query.trim();
      const list = q.length === 0
        ? state.prospects.slice(0, 8)
        : state.prospects.filter(p =>
            p.companyName.includes(q) ||
            (p.contactName ?? "").includes(q)
          ).slice(0, 8);
      if (list.length === 0) {
        resultsDiv.innerHTML = "";
        return;
      }
      resultsDiv.className = "search-results";
      resultsDiv.innerHTML = list.map(p =>
        `<button class="search-item" type="button" data-select-prospect="${p.id}" ` +
        `data-prospect-name="${qEsc(p.companyName)}" data-prospect-addr="${qEsc(p.address ?? "")}">` +
        `<span style="font-size:13px;font-weight:600;">${qEsc(p.companyName)}</span>` +
        `<span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${qEsc(p.contactName ?? "")} ${p.address ? "· " + p.address.slice(0, 20) : ""}</span>` +
        `</button>`
      ).join("");
      resultsDiv.querySelectorAll<HTMLButtonElement>("[data-select-prospect]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.quoteState.customerCode = "";
          state.quoteState.customerName = btn.dataset.prospectName ?? "";
          state.quoteState.customerAddress = btn.dataset.prospectAddr ?? "";
          state.quoteState.isProspect = true;
          state.quoteState.prospectId = btn.dataset.selectProspect ?? "";
          // 販売区分が手動設定済みなら維持、なければ初期化
          const pt = (state.quoteState.manualPriceType ?? "") as import("./api").PriceType;
          state.quotePricing = { priceType: pt, priceGroup: "", individualPrices: new Map() };
          el.value = "";
          if (resultsDiv) resultsDiv.innerHTML = "";
          renderApp();
        });
      });
    }

    el.addEventListener("focus", () => {
      buildProspectResults(el.value);
      openOutsideClose();
    });
    el.addEventListener("input", (e) => {
      if ((e as InputEvent).isComposing) return;
      buildProspectResults(el.value);
    });
    el.addEventListener("compositionend", () => buildProspectResults(el.value));
  })();

  // 見込み顧客から新規登録モーダル
  root.querySelector<HTMLButtonElement>("[data-action='new-prospect-from-quote']")?.addEventListener("click", () => {
    const prefilledName = root.querySelector<HTMLInputElement>("#q-prospect-search")?.value.trim() ?? "";
    const overlay = document.createElement("div");
    overlay.className = "modal-backdrop";
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;";
    overlay.innerHTML = `
      <div class="modal-panel" onclick="event.stopPropagation()" style="width:min(480px,96%);background:var(--surface);border-radius:12px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.3);margin:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="margin:0;font-size:16px;">新規見込み顧客を登録</h3>
          <button id="prospect-quick-close" style="background:none;border:none;font-size:24px;line-height:1;cursor:pointer;color:var(--text-secondary);padding:4px 8px;min-width:44px;min-height:44px;">×</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <label class="field">
            <span style="font-size:13px;font-weight:600;">会社名 <span style="color:var(--danger);">*</span></span>
            <input id="pq-company" type="text" value="${prefilledName.replace(/"/g,'&quot;')}" placeholder="株式会社〇〇" style="margin-top:4px;" autocomplete="organization" />
          </label>
          <label class="field">
            <span style="font-size:13px;font-weight:600;">担当者名</span>
            <input id="pq-contact" type="text" placeholder="山田 太郎" style="margin-top:4px;" autocomplete="name" />
          </label>
          <label class="field">
            <span style="font-size:13px;font-weight:600;">住所</span>
            <input id="pq-address" type="text" placeholder="神奈川県〇〇市…" style="margin-top:4px;" autocomplete="street-address" />
          </label>
          <label class="field">
            <span style="font-size:13px;font-weight:600;">電話番号</span>
            <input id="pq-phone" type="tel" placeholder="045-000-0000" style="margin-top:4px;" autocomplete="tel" />
          </label>
          <label class="field">
            <span style="font-size:13px;font-weight:600;">メモ</span>
            <textarea id="pq-note" rows="2" placeholder="商談状況など" style="margin-top:4px;width:100%;box-sizing:border-box;"></textarea>
          </label>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px;">
          <button id="prospect-quick-close2" class="button secondary" style="min-height:44px;">キャンセル</button>
          <button id="prospect-quick-save" class="button primary" style="min-height:44px;">登録して見積に使用</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    (overlay.querySelector("#pq-company") as HTMLInputElement)?.focus();

    const closeModal = () => overlay.remove();
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
    overlay.querySelector("#prospect-quick-close")?.addEventListener("click", closeModal);
    overlay.querySelector("#prospect-quick-close2")?.addEventListener("click", closeModal);
    overlay.querySelector("#prospect-quick-save")?.addEventListener("click", async () => {
      const companyName = (overlay.querySelector<HTMLInputElement>("#pq-company")?.value ?? "").trim();
      if (!companyName) { showToast("会社名は必須です", "warning"); return; }
      const newProspect: import("./api").Prospect = {
        id: `p_${Date.now()}`,
        companyName,
        contactName: overlay.querySelector<HTMLInputElement>("#pq-contact")?.value.trim() || undefined,
        address: overlay.querySelector<HTMLInputElement>("#pq-address")?.value.trim() || undefined,
        phone: overlay.querySelector<HTMLInputElement>("#pq-phone")?.value.trim() || undefined,
        note: overlay.querySelector<HTMLTextAreaElement>("#pq-note")?.value.trim() || undefined,
        stage: "warm",
        expectedAmount: 0,
        probability: 30
      };
      const { saveProspect, fetchProspects } = await import("./api");
      const saved = await saveProspect(newProspect);
      if (!saved) { showToast("登録失敗", "error"); return; }
      state.prospects = await fetchProspects();
      state.quoteState.customerCode = "";
      state.quoteState.customerName = saved.companyName;
      state.quoteState.customerAddress = saved.address ?? "";
      state.quoteState.isProspect = true;
      state.quoteState.prospectId = saved.id;
      const pt2 = (state.quoteState.manualPriceType ?? "") as import("./api").PriceType;
      state.quotePricing = { priceType: pt2, priceGroup: "", individualPrices: new Map() };
      closeModal();
      showToast(`${saved.companyName} を見込み顧客として登録しました`, "success");
      renderApp();
    });
  });

  // 見積プレビューをライブ更新（フォーム入力中にスクロール位置やフォーカスを保持）
  function refreshQuotePreview() {
    syncQuoteFormToState(state.quoteState);
    const scaler = root.querySelector<HTMLElement>("#q-preview-scaler");
    if (!scaler) return;
    scaler.innerHTML = renderQuoteBuilder(state.quoteState, state.masterStats?.customers ?? [], state.masterStats?.products ?? [], state.quoteCustomerQuery, state.quoteProductQuery, state.quotePricing, state.quoteCompanySettings);
    // Re-run scaler after content update
    const inner = scaler.querySelector<HTMLElement>(".q-preview-doc");
    const panelWidth = scaler.parentElement?.clientWidth ?? 0;
    const contentWidth = inner?.offsetWidth ?? 0;
    if (panelWidth > 0 && contentWidth > 0 && contentWidth > panelWidth - 24) {
      const scale = (panelWidth - 24) / contentWidth;
      scaler.style.transform = `scale(${scale})`;
      scaler.style.transformOrigin = "top left";
      scaler.style.height = `${((inner?.offsetHeight ?? 0) + 48) * scale}px`;
    } else {
      scaler.style.transform = "";
      scaler.style.height = "";
    }
  }

  // テキスト入力のライブプレビュー（フォーカス保持のためrenderApp不要）
  for (const id of ["q-no", "q-date", "q-valid", "q-subject", "q-payment-terms", "q-delivery-date", "q-delivery-place"]) {
    root.querySelector<HTMLInputElement>(`#${id}`)?.addEventListener("input", refreshQuotePreview);
  }
  root.querySelector<HTMLTextAreaElement>("#q-remarks")?.addEventListener("input", refreshQuotePreview);

  // 数量変更
  root.querySelectorAll<HTMLInputElement>(".qty-input").forEach(inp => {
    inp.addEventListener("change", () => {
      const idx = parseInt(inp.dataset.lineIdx ?? "0");
      const line = state.quoteState.lines[idx];
      if (line) { line.quantity = parseFloat(inp.value) || 0; line.amount = line.quantity * line.unitPrice; refreshQuotePreview(); }
    });
  });

  // 単価変更
  root.querySelectorAll<HTMLInputElement>(".price-input").forEach(inp => {
    inp.addEventListener("change", () => {
      const idx = parseInt(inp.dataset.lineIdx ?? "0");
      const line = state.quoteState.lines[idx];
      if (line) { line.unitPrice = parseInt(inp.value) || 0; line.amount = line.quantity * line.unitPrice; refreshQuotePreview(); }
    });
  });

  // JANコード変更
  root.querySelectorAll<HTMLInputElement>(".jan-input").forEach(inp => {
    inp.addEventListener("change", () => {
      const idx = parseInt(inp.dataset.lineIdx ?? "0");
      const line = state.quoteState.lines[idx];
      if (line) { line.janCode = inp.value; refreshQuotePreview(); }
    });
  });

  // 入数変更
  root.querySelectorAll<HTMLInputElement>(".case-qty-input").forEach(inp => {
    inp.addEventListener("change", () => {
      const idx = parseInt(inp.dataset.lineIdx ?? "0");
      const line = state.quoteState.lines[idx];
      if (line) { line.caseQty = inp.value ? parseInt(inp.value) : null; refreshQuotePreview(); }
    });
  });

  // 希望小売価格変更
  root.querySelectorAll<HTMLInputElement>(".retail-price-input").forEach(inp => {
    inp.addEventListener("change", () => {
      const idx = parseInt(inp.dataset.lineIdx ?? "0");
      const line = state.quoteState.lines[idx];
      if (line) { line.retailPrice = inp.value ? parseInt(inp.value) : null; refreshQuotePreview(); }
    });
  });

  // 行削除
  root.querySelectorAll<HTMLButtonElement>("[data-remove-line]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.removeLine ?? "0");
      state.quoteState.lines.splice(idx, 1);
      renderApp();
    });
  });

  // プレビューモード切替
  root.querySelector<HTMLButtonElement>("[data-action='quote-preview-mode']")?.addEventListener("click", () => {
    syncQuoteFormToState(state.quoteState);
    state.quoteState.previewMode = true;
    renderApp();
  });
  root.querySelector<HTMLButtonElement>("[data-action='quote-edit-mode']")?.addEventListener("click", () => {
    state.quoteState.previewMode = false;
    renderApp();
  });

  // PDF ダウンロード
  root.querySelector<HTMLButtonElement>("[data-action='quote-download-pdf']")?.addEventListener("click", async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = "生成中…";
    syncQuoteFormToState(state.quoteState);
    try {
      await generateQuotePdf(state.quoteState, state.quoteCompanySettings);
    } finally {
      btn.disabled = false;
      btn.textContent = "PDF";
    }
  });

  // 保存
  root.querySelector<HTMLButtonElement>("[data-action='save-quote']")?.addEventListener("click", async () => {
    syncQuoteFormToState(state.quoteState);
    const q = state.quoteState;

    const subtotal = q.lines.reduce((s, l) => s + l.amount, 0);
    const tax = Math.round(subtotal * q.taxRate / 100);
    const total = subtotal + tax;

    // 見積番号が未採番なら発番
    if (!q.quoteNo) {
      try {
        const { supabaseRpc } = await import("./supabase");
        const generated = await supabaseRpc<string>("generate_quote_no", {});
        q.quoteNo = generated ?? `Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1000).toString().padStart(3,"0")}`;
      } catch {
        q.quoteNo = `Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1000).toString().padStart(3,"0")}`;
      }
    }

    const today = new Date().toISOString().slice(0, 10);
    const templateType = (q.templateType === "sake" || q.templateType === "standard") ? q.templateType : "sake";
    const quotePayload: Record<string, unknown> = {
      quote_no: q.quoteNo,
      quote_date: q.quoteDate || today,          // 空なら今日
      valid_until: q.validUntil || null,          // 空ならNULL
      legacy_customer_code: q.customerCode || null,
      customer_name: q.customerName || "",
      customer_address: q.customerAddress || "",
      subject: q.subject || "",
      template_type: templateType,               // check制約対応
      subtotal,
      tax_amount: tax,
      total_amount: total,
      tax_rate: q.taxRate || 10,
      remarks: q.remarks || "",
      delivery_date: q.deliveryDate || "",
      payment_terms: q.paymentTerms || "",
      delivery_place: q.deliveryPlace || "",
      updated_at: new Date().toISOString(),
    };

    try {
      let quoteId = q.id;

      if (q.id) {
        // 既存レコードを更新
        const res = await fetch(`${SUPABASE_URL}/rest/v1/quotes?id=eq.${encodeURIComponent(q.id)}`, {
          method: "PATCH",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(quotePayload),
        });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`quotes更新失敗 ${res.status}: ${errText}`);
        }
        // 明細を全削除してから再投入
        await fetch(`${SUPABASE_URL}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(q.id)}`, {
          method: "DELETE",
          headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        });
      } else {
        // 新規作成
        const res = await fetch(`${SUPABASE_URL}/rest/v1/quotes`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify(quotePayload),
        });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`quotes作成失敗 ${res.status}: ${errText}`);
        }
        const rows = await res.json() as { id: string }[];
        if (!rows?.[0]?.id) throw new Error("IDが返りませんでした");
        quoteId = rows[0].id;
        q.id = quoteId;
      }

      // 明細行を一括 upsert
      if (q.lines.length > 0) {
        const linesPayload = q.lines.map((l, i) => ({
          quote_id: quoteId,
          line_no: i + 1,
          legacy_product_code: l.productCode || null,
          product_name: l.productName,
          jan_code: l.janCode || null,
          case_qty: l.caseQty ?? null,
          quantity: l.quantity,
          unit: l.unit,
          unit_price: l.unitPrice,
          retail_price: l.retailPrice ?? null,
          amount: l.amount,
        }));
        const linesRes = await fetch(`${SUPABASE_URL}/rest/v1/quote_lines`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(linesPayload),
        });
        if (!linesRes.ok) {
          const errText = await linesRes.text();
          throw new Error(`明細保存失敗 ${linesRes.status}: ${errText}`);
        }
      }

      showToast(`見積 ${q.quoteNo} を保存しました`, "success");
      renderApp();
    } catch (err) {
      console.error("[save-quote]", err);
      showToast(`保存失敗: ${String(err).slice(0, 120)}`, "error");
    }
  });

  // ── 会社設定 ──────────────────────────────────────────────────────────────

  // 設定保存
  root.querySelector<HTMLButtonElement>("[data-action='save-quote-settings']")?.addEventListener("click", () => {
    const g = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLSelectElement)?.value ?? "";
    const newSettings: QuoteCompanySettings = {
      ...state.quoteCompanySettings,
      companyName: g("qs-company-name"),
      companyPostal: g("qs-company-postal"),
      companyAddress1: g("qs-company-addr1"),
      companyAddress2: g("qs-company-addr2"),
      companyTel: g("qs-company-tel"),
      companyFax: g("qs-company-fax"),
      companyEmail: g("qs-company-email"),
      companyRegistrationNo: g("qs-company-regno"),
      bankName: g("qs-bank-name"),
      bankBranch: g("qs-bank-branch"),
      bankAccountType: g("qs-bank-type"),
      bankAccountNo: g("qs-bank-no"),
      bankAccountHolder: g("qs-bank-holder"),
      defaultPaymentTerms: g("qs-payment-terms"),
      defaultHeaderNote: g("qs-header-note"),
      defaultFooterNote: g("qs-footer-note"),
      accentColor: (document.getElementById("qs-accent-color") as HTMLInputElement)?.value || state.quoteCompanySettings.accentColor || "#0968e5"
    };
    saveQuoteSettings(newSettings); // localStorage（オフライン用）
    void upsertSystemSetting("quote_company", newSettings); // DB保存
    state.quoteCompanySettings = newSettings;
    showToast("設定を保存しました", "success");
    renderApp();
  });

  // 設定ページ: カラープリセット
  root.querySelectorAll<HTMLButtonElement>("[data-action='set-accent-color']").forEach(btn => {
    btn.addEventListener("click", () => {
      const color = btn.dataset.color ?? "#0968e5";
      state.quoteCompanySettings = { ...state.quoteCompanySettings, accentColor: color };
      saveQuoteSettings(state.quoteCompanySettings);
      void upsertSystemSetting("quote_company", state.quoteCompanySettings);
      renderApp();
    });
  });

  // 設定ページ: カスタムカラーリアルタイムプレビュー
  root.querySelector<HTMLInputElement>("#qs-accent-color")?.addEventListener("input", e => {
    const color = (e.target as HTMLInputElement).value;
    state.quoteCompanySettings = { ...state.quoteCompanySettings, accentColor: color };
    saveQuoteSettings(state.quoteCompanySettings);
    renderApp();
  });

  // 設定ページ: 社印アップロード
  root.querySelector<HTMLInputElement>("#qs-seal-file")?.addEventListener("change", e => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.quoteCompanySettings = { ...state.quoteCompanySettings, sealImageDataUrl: reader.result as string };
      saveQuoteSettings(state.quoteCompanySettings);
      void upsertSystemSetting("quote_company", state.quoteCompanySettings);
      renderApp();
    };
    reader.readAsDataURL(file);
  });

  // 設定ページ: 社印サイズ
  root.querySelector<HTMLInputElement>("#qs-seal-size")?.addEventListener("input", e => {
    const size = parseInt((e.target as HTMLInputElement).value);
    state.quoteCompanySettings = { ...state.quoteCompanySettings, sealSize: size };
    saveQuoteSettings(state.quoteCompanySettings);
    void upsertSystemSetting("quote_company", state.quoteCompanySettings);
    renderApp();
  });

  // 設定ページ: 社印削除
  root.querySelector<HTMLButtonElement>("[data-action='remove-company-seal']")?.addEventListener("click", () => {
    state.quoteCompanySettings = { ...state.quoteCompanySettings, sealImageDataUrl: "" };
    saveQuoteSettings(state.quoteCompanySettings);
    void upsertSystemSetting("quote_company", state.quoteCompanySettings);
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
      if (!tab) return;
      state.demandTab = tab;
      // カレンダータブなら今日を自動選択
      if (tab === "calendar") {
        const today = new Date().toISOString().slice(0, 10);
        if (today.startsWith(state.demandPlanYearMonth)) {
          state.calendarSelectedDate = today;
        }
      }
      renderApp();
    });
  });

  // Demand planning: 需要実績から生産計画を自動生成するヘルパー
  function buildPlanFromAnalysis(ym: string): import("./api").ProductionPlanRow[] {
    const analysis = state.demandAnalysis;
    const ssParams = state.safetyStockParams;
    if (!analysis || ssParams.length === 0) return [];

    // 昨対ベース: 前年同月を第一優先、なければ直近3ヶ月平均にフォールバック
    const [yStr, mStr] = ym.split("-");
    const lastYearMonth = `${parseInt(yStr) - 1}-${mStr}`;
    const recentMonths = analysis.months.filter((m) => m < ym).slice(-3);

    return ssParams.map((p) => {
        const isMTO = (p as any).productionType === "make_to_order";

        // 前年同月の実績
        const lastYearQty = analysis.matrix[p.productCode]?.[lastYearMonth] ?? 0;
        // 直近3ヶ月平均（フォールバック用）
        const recentQtys = recentMonths.map((m) => analysis.matrix[p.productCode]?.[m] ?? 0);
        const recentAvg = recentQtys.length > 0
          ? recentQtys.reduce((s, v) => s + v, 0) / recentQtys.length
          : p.avgMonthlyDemand;

        const forecast = isMTO ? 0
          : lastYearQty > 0 ? Math.ceil(lastYearQty)
          : Math.ceil(recentAvg);

        const ss = isMTO ? 0 : Math.ceil(p.safetyStockQty);
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
          plannedQty: isMTO ? 0 : required,
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

  // Demand planning: 安全在庫 個別行変更（リードタイム）
  root.querySelectorAll<HTMLInputElement>("[data-action='ss-lead-time']").forEach((input) => {
    input.addEventListener("change", () => {
      const code = input.dataset.code ?? "";
      const lt = parseInt(input.value) || 30;
      state.safetyStockParams = state.safetyStockParams.map((p) => {
        if (p.productCode !== code) return p;
        const z = p.serviceLevel >= 0.99 ? 2.33 : p.serviceLevel >= 0.97 ? 1.88 : p.serviceLevel >= 0.95 ? 1.65 : p.serviceLevel >= 0.90 ? 1.28 : 1.04;
        const ltMonths = lt / 30;
        const ss = Math.ceil(z * p.demandStdDev * Math.sqrt(ltMonths));
        const rop = Math.ceil(p.avgMonthlyDemand * ltMonths + ss);
        return { ...p, leadTimeDays: lt, safetyStockQty: ss, reorderPoint: rop };
      });
      renderApp();
    });
  });

  // Demand planning: 安全在庫 個別行変更（サービス率）
  root.querySelectorAll<HTMLSelectElement>("[data-action='ss-service-level']").forEach((sel) => {
    sel.addEventListener("change", () => {
      const code = sel.dataset.code ?? "";
      const sl = parseFloat(sel.value) || 0.95;
      state.safetyStockParams = state.safetyStockParams.map((p) => {
        if (p.productCode !== code) return p;
        const z = sl >= 0.99 ? 2.33 : sl >= 0.97 ? 1.88 : sl >= 0.95 ? 1.65 : sl >= 0.90 ? 1.28 : 1.04;
        const ltMonths = p.leadTimeDays / 30;
        const ss = Math.ceil(z * p.demandStdDev * Math.sqrt(ltMonths));
        const rop = Math.ceil(p.avgMonthlyDemand * ltMonths + ss);
        return { ...p, serviceLevel: sl, safetyStockQty: ss, reorderPoint: rop };
      });
      renderApp();
    });
  });

  // Demand planning: 安全在庫 保存ボタン
  root.querySelector<HTMLButtonElement>("[data-action='ss-save-all']")?.addEventListener("click", async (e) => {
    if (state.safetyStockParams.length === 0) return;
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = "保存中…";
    const { saveSafetyStockParamsBulk } = await import("./api");
    const ok = await saveSafetyStockParamsBulk(state.safetyStockParams);
    btn.disabled = false;
    btn.textContent = ok ? "✓ 保存しました" : "✗ 保存失敗";
    setTimeout(() => { btn.textContent = "安全在庫を保存"; }, 2500);
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
    state.calendarShifts = buildDefaultShifts(ym, 1, 0);
    const { fetchProductionPlan } = await import("./api");
    const rows = await fetchProductionPlan(ym);
    state.productionPlan = rows.length > 0 ? rows : buildPlanFromAnalysis(ym);
    optimizeShifts(state.calendarShifts, state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode)), state.calendarCapacity);
    renderApp();
  });

  // Demand planning: 生産区分フィルタ
  root.querySelectorAll<HTMLButtonElement>("[data-action='plan-type-filter']").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.demandPlanTypeFilter = btn.dataset.filter ?? "all";
      renderApp();
    });
  });

  // Demand planning: テーブルソート
  root.querySelectorAll<HTMLElement>("[data-action='demand-sort']").forEach((th) => {
    th.addEventListener("click", () => {
      const col = th.dataset.sortCol ?? "";
      if (state.demandSort?.column === col) {
        state.demandSort = state.demandSort.dir === "desc"
          ? { column: col, dir: "asc" }
          : null;
      } else {
        state.demandSort = { column: col, dir: "desc" };
      }
      renderApp();
    });
  });

  // Demand planning: 需要予測を再計算ボタン
  root.querySelector<HTMLButtonElement>("[data-action='plan-recalc']")?.addEventListener("click", () => {
    state.productionPlan = buildPlanFromAnalysis(state.demandPlanYearMonth);
    renderApp();
  });

  // Demand planning: CSVインポート（在庫数・計画数）
  root.querySelector<HTMLInputElement>("[data-action='plan-csv-import']")?.addEventListener("change", (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const { parseCSV } = await import("./utils/import");
      const { columns, rows } = parseCSV(reader.result as string);
      const statusEl = document.getElementById("csv-import-status");

      // カラムの自動マッピング: 商品コード/在庫数/計画数を柔軟に検出
      const codeCol = columns.find(c => /商品コード|product_code|code|コード/i.test(c));
      const stockCol = columns.find(c => /在庫|stock|期首|opening/i.test(c));
      const planCol = columns.find(c => /計画|plan|planned|生産/i.test(c));

      if (!codeCol) {
        if (statusEl) {
          statusEl.style.display = "block";
          statusEl.style.background = "rgba(197,61,61,0.1)";
          statusEl.style.color = "#c53d3d";
          statusEl.textContent = `エラー: 商品コード列が見つかりません。列名: ${columns.join(", ")}`;
        }
        return;
      }

      let matched = 0;
      let stockUpdated = 0;
      let planUpdated = 0;

      for (const csvRow of rows) {
        const code = (csvRow[codeCol] ?? "").trim();
        if (!code) continue;
        const planRow = state.productionPlan.find(r => r.productCode === code);
        if (!planRow) continue;
        matched++;

        if (stockCol && csvRow[stockCol] !== undefined && csvRow[stockCol] !== "") {
          const val = parseFloat(csvRow[stockCol]) || 0;
          planRow.openingStock = val;
          // 必要生産数を再計算
          planRow.requiredProduction = Math.max(0, planRow.demandForecast + planRow.safetyStockTarget - val);
          if (planRow.plannedQty > 0 && !planCol) {
            planRow.plannedQty = planRow.requiredProduction;
          }
          stockUpdated++;
        }

        if (planCol && csvRow[planCol] !== undefined && csvRow[planCol] !== "") {
          planRow.plannedQty = parseFloat(csvRow[planCol]) || 0;
          planUpdated++;
        }
      }

      if (statusEl) {
        statusEl.style.display = "block";
        if (matched === 0) {
          statusEl.style.background = "rgba(183,121,31,0.1)";
          statusEl.style.color = "#b7791f";
          statusEl.textContent = `一致する商品コードが見つかりませんでした（CSV: ${rows.length}行）`;
        } else {
          statusEl.style.background = "rgba(47,133,90,0.1)";
          statusEl.style.color = "#2f855a";
          statusEl.textContent = `${matched}商品に反映: 在庫${stockUpdated}件${planUpdated > 0 ? ` / 計画${planUpdated}件` : ""} 更新`;
        }
        setTimeout(() => { statusEl.style.display = "none"; }, 5000);
      }

      renderApp();
    };
    reader.readAsText(file, "UTF-8");
    // 同じファイルを再選択可能にする
    (e.target as HTMLInputElement).value = "";
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

  // Production calendar: 日タップで稼働ON/OFF切替 → 人数自動最適化
  root.querySelectorAll<HTMLElement>("[data-action='cal-toggle-day']").forEach((el) => {
    el.addEventListener("click", () => {
      const date = el.dataset.date ?? "";
      const shift = state.calendarShifts.find(s => s.date === date);
      if (!shift) return;

      if (shift.confirmed) {
        // 確定済みなら詳細表示のみ
        state.calendarSelectedDate = state.calendarSelectedDate === date ? null : date;
      } else if (shift.partTimers > 0 || shift.employees > 0) {
        // 稼働日 → 休日にする
        shift.partTimers = 0;
        shift.employees = 0;
        optimizeShifts(state.calendarShifts, state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode)), state.calendarCapacity);
        state.calendarSelectedDate = date;
      } else {
        // 休日 → 稼働日にする（仮で1,1を入れてoptimizeに任せる）
        shift.partTimers = 1;
        shift.employees = 0;
        optimizeShifts(state.calendarShifts, state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode)), state.calendarCapacity);
        state.calendarSelectedDate = date;
      }
      renderApp();
    });
  });

  // Production calendar: ラベル除外設定をDBに保存
  root.querySelector<HTMLButtonElement>("[data-action='cal-save-exclusions']")?.addEventListener("click", async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = "保存中…";
    const { saveLabelExclusions } = await import("./api");
    const codes = [...state.calendarLabelExcluded];
    const ok = await saveLabelExclusions(state.demandPlanYearMonth, codes);
    btn.disabled = false;
    btn.textContent = ok ? "✓ 保存しました" : "✗ 保存失敗";
    setTimeout(() => { btn.textContent = "設定を保存"; }, 2500);
  });

  // Production calendar: ラベル対象 個別ON/OFF（スクロール位置保持）
  root.querySelectorAll<HTMLInputElement>("[data-action='cal-label-toggle']").forEach((cb) => {
    cb.addEventListener("change", () => {
      const code = cb.dataset.code ?? "";
      const listEl = document.getElementById("cal-label-list");
      const scrollTop = listEl?.scrollTop ?? 0;

      if (cb.checked) {
        state.calendarLabelExcluded.delete(code);
      } else {
        state.calendarLabelExcluded.add(code);
      }
      const labelPlan = state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode));
      optimizeShifts(state.calendarShifts, labelPlan, state.calendarCapacity);
      renderApp();

      requestAnimationFrame(() => {
        const newList = document.getElementById("cal-label-list");
        if (newList) newList.scrollTop = scrollTop;
      });
    });
  });

  // Production calendar: ラベル対象 区分まとめてON/OFF
  root.querySelectorAll<HTMLInputElement>("[data-action='cal-label-toggle-group']").forEach((cb) => {
    cb.addEventListener("change", () => {
      const type = cb.dataset.type ?? "";
      const listEl = document.getElementById("cal-label-list");
      const scrollTop = listEl?.scrollTop ?? 0;

      const items = state.productionPlan.filter(r => r.productionType === type);
      if (cb.checked) {
        // 全部ONにする
        for (const r of items) state.calendarLabelExcluded.delete(r.productCode);
      } else {
        // 全部OFFにする
        for (const r of items) state.calendarLabelExcluded.add(r.productCode);
      }
      const labelPlan = state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode));
      optimizeShifts(state.calendarShifts, labelPlan, state.calendarCapacity);
      renderApp();

      requestAnimationFrame(() => {
        const newList = document.getElementById("cal-label-list");
        if (newList) newList.scrollTop = scrollTop;
      });
    });
  });

  // Production calendar: パート日産キャパ変更
  root.querySelector<HTMLInputElement>("[data-action='cal-cap-part']")?.addEventListener("change", (e) => {
    const val = parseInt((e.target as HTMLInputElement).value) || DEFAULT_PART_CAPACITY;
    state.calendarCapacity.partCapacity = val;
    const labelPlan = state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode));
    optimizeShifts(state.calendarShifts, labelPlan, state.calendarCapacity);
    renderApp();
  });

  // Production calendar: 社員日産キャパ変更
  root.querySelector<HTMLInputElement>("[data-action='cal-cap-emp']")?.addEventListener("change", (e) => {
    const val = parseInt((e.target as HTMLInputElement).value) || DEFAULT_EMP_CAPACITY;
    state.calendarCapacity.empCapacity = val;
    const labelPlan = state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode));
    optimizeShifts(state.calendarShifts, labelPlan, state.calendarCapacity);
    renderApp();
  });

  // Production calendar: 詳細パネルからパート人数変更
  root.querySelectorAll<HTMLInputElement>("[data-action='cal-shift-part']").forEach((input) => {
    input.addEventListener("change", () => {
      const date = input.dataset.date ?? "";
      const val = parseInt(input.value) || 0;
      const shift = state.calendarShifts.find(s => s.date === date);
      if (shift) { shift.partTimers = val; }
      renderApp();
    });
  });

  // Production calendar: 詳細パネルから社員人数変更
  root.querySelectorAll<HTMLInputElement>("[data-action='cal-shift-emp']").forEach((input) => {
    input.addEventListener("change", () => {
      const date = input.dataset.date ?? "";
      const val = parseInt(input.value) || 0;
      const shift = state.calendarShifts.find(s => s.date === date);
      if (shift) { shift.employees = val; }
      renderApp();
    });
  });

  // Production calendar: 年月切り替え
  root.querySelector<HTMLSelectElement>("[data-action='cal-year-month']")?.addEventListener("change", async (e) => {
    const ym = (e.target as HTMLSelectElement).value;
    if (!ym) return;
    state.demandPlanYearMonth = ym;
    state.calendarSelectedDate = null;
    state.calendarShifts = buildDefaultShifts(ym, 1, 0);
    const { fetchProductionPlan, fetchLabelExclusions } = await import("./api");
    const [rows, savedExcl] = await Promise.all([
      fetchProductionPlan(ym),
      fetchLabelExclusions(ym)
    ]);
    state.productionPlan = rows.length > 0 ? rows : buildPlanFromAnalysis(ym);
    state.calendarLabelExcluded = new Set(savedExcl);
    optimizeShifts(state.calendarShifts, state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode)), state.calendarCapacity);
    renderApp();
  });

  // Production calendar: デフォルトパート人数変更（旧: 互換用残す）
  root.querySelector<HTMLSelectElement>("[data-action='cal-default-part']")?.addEventListener("change", (e) => {
    const val = parseInt((e.target as HTMLSelectElement).value) || 0;
    state.calendarDefaultPart = val;
    for (const shift of state.calendarShifts) {
      if (!shift.confirmed) {
        const weekend = new Date(shift.date).getDay() === 0 || new Date(shift.date).getDay() === 6;
        shift.partTimers = weekend ? 0 : val;
      }
    }
    renderApp();
  });

  // Production calendar: デフォルト社員人数変更
  root.querySelector<HTMLSelectElement>("[data-action='cal-default-emp']")?.addEventListener("change", (e) => {
    const val = parseInt((e.target as HTMLSelectElement).value) || 0;
    state.calendarDefaultEmp = val;
    for (const shift of state.calendarShifts) {
      if (!shift.confirmed) {
        const weekend = new Date(shift.date).getDay() === 0 || new Date(shift.date).getDay() === 6;
        shift.employees = weekend ? 0 : val;
      }
    }
    renderApp();
  });

  // Production calendar: シフトリセット（平日ON→自動最適化）
  root.querySelector<HTMLButtonElement>("[data-action='cal-reset-shifts']")?.addEventListener("click", () => {
    state.calendarShifts = buildDefaultShifts(state.demandPlanYearMonth, 1, 0);
    optimizeShifts(state.calendarShifts, state.productionPlan.filter(r => !state.calendarLabelExcluded.has(r.productCode)), state.calendarCapacity);
    renderApp();
  });

  // Production calendar: 全日確定
  root.querySelector<HTMLButtonElement>("[data-action='cal-confirm-all']")?.addEventListener("click", () => {
    for (const shift of state.calendarShifts) {
      shift.confirmed = true;
    }
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
      } else if (state.route === "/analytics") {
        state.analyticsSortState = toggleSort(state.analyticsSortState, col, multi);
      }
      renderApp();
    });
  });

  // 営業効率: 年度切り替え（ボタン）
  root.querySelectorAll<HTMLButtonElement>("[data-action='efficiency-year-change']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const year = parseInt(btn.dataset.year ?? "", 10);
      if (!year) return;
      state.customerEfficiencyYear = year;
      state.customerEfficiency = await fetchCustomerEfficiencyByYear(year, state.customerEfficiencyGroupBy);
      renderApp();
    });
  });
  // 営業効率: 年度切り替え（セレクト・過去年度）
  root.querySelector<HTMLSelectElement>("[data-action='efficiency-year-select']")?.addEventListener("change", async (e) => {
    const year = parseInt((e.target as HTMLSelectElement).value, 10);
    if (!year) return;
    state.customerEfficiencyYear = year;
    state.customerEfficiency = await fetchCustomerEfficiencyByYear(year, state.customerEfficiencyGroupBy);
    renderApp();
  });
  // 営業効率: 得意先/店舗 切り替え
  root.querySelectorAll<HTMLButtonElement>("[data-action='efficiency-groupby-change']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const groupBy = (btn.dataset.groupby ?? "billing") as 'billing' | 'delivery';
      state.customerEfficiencyGroupBy = groupBy;
      state.customerEfficiency = await fetchCustomerEfficiencyByYear(state.customerEfficiencyYear, groupBy);
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
      tradeType: root.querySelector<HTMLSelectElement>("#master-trade-type")?.value ?? "",
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
      state.analyticsDrilldown = null;
      state.analyticsPeriodChartData = [];
      state.analyticsPrevYearChartData = [];
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
      const { fetchAnalyticsByPeriod, fetchAvailablePeriods, fetchPeriodChartData, prevYearFilter } = await import("./api");
      const period = button.dataset.analyticsPeriod as import("./api").AnalyticsPeriod;
      state.analyticsPeriod = period;
      state.analyticsDrilldown = null;
      if (period === "all") {
        state.analyticsPeriodRows = [];
        state.analyticsPeriodOptions = [];
        state.analyticsPeriodFilter = "";
        state.analyticsPeriodChartData = [];
        state.analyticsPrevYearChartData = [];
      } else {
        state.analyticsPeriodOptions = await fetchAvailablePeriods(state.analyticsTab, period);
        state.analyticsPeriodFilter = state.analyticsPeriodOptions[0] ?? "";
        const pf = state.analyticsPeriodFilter;
        const [rows, chart, prevChart] = await Promise.all([
          fetchAnalyticsByPeriod(state.analyticsTab, period, pf),
          fetchPeriodChartData(period, pf),
          fetchPeriodChartData(period, prevYearFilter(pf))
        ]);
        state.analyticsPeriodRows = rows;
        state.analyticsPeriodChartData = chart;
        state.analyticsPrevYearChartData = prevChart;
      }
      renderApp();
    });
  });

  root.querySelector<HTMLSelectElement>("#analytics-period-select")?.addEventListener("change", async (e) => {
    const { fetchAnalyticsByPeriod, fetchPeriodChartData, prevYearFilter } = await import("./api");
    state.analyticsPeriodFilter = (e.target as HTMLSelectElement).value;
    state.analyticsDrilldown = null;
    const pf = state.analyticsPeriodFilter;
    const isFiscalYearly = state.analyticsFiscalMode === "fiscal" && state.analyticsPeriod === "yearly";

    if (isFiscalYearly) {
      // 決算年度: 日付範囲に変換してRPC呼び出し
      const { fiscalYearToDateRange } = await import("./components/SalesAnalytics");
      const fy = parseInt(pf);
      const range = fiscalYearToDateRange(fy);
      const prevRange = fiscalYearToDateRange(fy - 1);
      const rpcName = state.analyticsTab === "customers" ? "get_customer_totals_by_period" : "get_product_totals_by_period";
      const { supabaseRpc } = await import("./supabase");
      const [rpcResult, chart, prevChart] = await Promise.all([
        supabaseRpc<Record<string, unknown>[]>(rpcName, { p_date_from: range.from, p_date_to: range.to }),
        fetchPeriodChartData("yearly", pf),
        fetchPeriodChartData("yearly", String(fy - 1))
      ]);
      state.analyticsPeriodRows = (rpcResult ?? []).map(r => ({
        code: String(r.code ?? ""), name: String(r.name ?? ""),
        amount: Number(r.amount ?? 0), quantity: Number(r.quantity ?? 0),
        documents: Number(r.documents ?? 0), volumeMl: Number(r.volume_ml ?? 0)
      }));
      state.analyticsPeriodChartData = (chart ?? []).map(p => ({ ...p }));
      state.analyticsPrevYearChartData = (prevChart ?? []).map(p => ({ ...p }));
    } else {
      const [rows, chart, prevChart] = await Promise.all([
        fetchAnalyticsByPeriod(state.analyticsTab, state.analyticsPeriod, pf),
        fetchPeriodChartData(state.analyticsPeriod, pf),
        fetchPeriodChartData(state.analyticsPeriod, prevYearFilter(pf))
      ]);
      state.analyticsPeriodRows = rows;
      state.analyticsPeriodChartData = chart;
      state.analyticsPrevYearChartData = prevChart;
    }
    renderApp();
  });

  // ── 暦年/決算期 切替 ─────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-fiscal-mode]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      state.analyticsFiscalMode = btn.dataset.fiscalMode as import("./components/SalesAnalytics").FiscalMode;
      // 年次期間中ならデータをリセットして再取得を促す
      if (state.analyticsPeriod === "yearly") {
        state.analyticsPeriodRows = [];
        state.analyticsPeriodChartData = [];
        state.analyticsPrevYearChartData = [];
        state.analyticsPeriodFilter = "";
        // 決算モードなら決算年度オプションを生成
        if (state.analyticsFiscalMode === "fiscal") {
          const { monthToFiscalYear } = await import("./components/SalesAnalytics");
          const fySet = new Set<number>();
          for (const m of state.salesAnalytics.monthlySales) fySet.add(monthToFiscalYear(m.month));
          state.analyticsPeriodOptions = [...fySet].sort((a, b) => b - a).map(String);
        } else {
          const { fetchAvailablePeriods } = await import("./api");
          state.analyticsPeriodOptions = await fetchAvailablePeriods(state.analyticsTab, "yearly");
        }
      }
      renderApp();
    });
  });

  // ── チャートメトリック切替（売上額/出荷本数/移出量）──
  root.querySelectorAll<HTMLButtonElement>("[data-chart-metric]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.analyticsChartMetric = btn.dataset.chartMetric as import("./components/SalesAnalytics").ChartMetric;
      renderApp();
    });
  });

  // ── 商品/得意先ドリルダウン ─────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-analytics-drilldown]").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.dataset.analyticsDrilldown ?? "";
      const name = button.dataset.drilldownName ?? code;
      const tab = state.analyticsTab as "products" | "customers";
      const {
        fetchCustomerProductBreakdown,
        fetchProductCustomerBreakdown,
        fetchEntityMonthlySales,
        periodToDateRange
      } = await import("./api");
      const range = state.analyticsPeriod !== "all" && state.analyticsPeriodFilter
        ? periodToDateRange(state.analyticsPeriod, state.analyticsPeriodFilter) : null;
      const [monthlySales, breakdownRows] = await Promise.all([
        fetchEntityMonthlySales(code, tab === "customers" ? "customer" : "product"),
        tab === "customers"
          ? fetchCustomerProductBreakdown(code, range?.from, range?.to)
          : fetchProductCustomerBreakdown(code, range?.from, range?.to)
      ]);
      state.analyticsDrilldown = { tab, code, name, monthlySales, breakdownRows };
      renderApp();
    });
  });

  root.querySelector<HTMLButtonElement>("[data-action='close-analytics-drilldown']")?.addEventListener("click", () => {
    state.analyticsDrilldown = null;
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
    if (!state.deliverySearchDocNo) {
      showToast("伝票番号を入力してください", "error");
      state.actionLoading = false;
      renderApp();
      return;
    }
    void fetchDeliveryNote(state.deliverySearchDocNo).then((note) => {
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
    const btn = root.querySelector<HTMLButtonElement>("[data-action='mo-submit']");
    if (btn) { btn.disabled = true; btn.textContent = "送信中…"; }
    const cartTotal = state.mobileOrder.cart.reduce((s, l) => s + l.amount, 0);
    try {
      const { saveStoreOrder } = await import("./api");
      await saveStoreOrder(
        docNo,
        state.mobileOrder.selectedCustomer?.name ?? "不明",
        state.mobileOrder.selectedCustomer?.code ?? null,
        cartTotal,
        state.mobileOrder.memo,
        state.mobileOrder.cart
      );
    } catch (e) {
      console.error("受注保存失敗:", e);
      showToast("送信に失敗しました", "error");
      if (btn) { btn.disabled = false; btn.textContent = "受注を送信"; }
      return;
    }
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

  // ── 離反理由 選択 → 保存 ────────────────────────────
  root.querySelectorAll<HTMLSelectElement>(".churn-reason-select").forEach((sel) => {
    sel.addEventListener("change", async () => {
      const code   = sel.dataset.churnCode ?? "";
      const reason = sel.value;
      try {
        const { saveChurnNote } = await import("./api");
        await saveChurnNote({ customerCode: code, reason: reason as import("./api").ChurnReasonValue, memo: "", actionedAt: null });
        // notesを更新して理由バッジを再描画
        const existing = state.churnNotes.find((n) => n.customerCode === code);
        if (existing) {
          existing.reason = reason as import("./api").ChurnReasonValue;
        } else {
          state.churnNotes.push({ customerCode: code, reason: reason as import("./api").ChurnReasonValue, memo: "", actionedAt: null, updatedAt: new Date().toISOString() });
        }
        // バッジだけ更新（フルre-render不要）
        const row = sel.closest<HTMLTableRowElement>("tr");
        if (row) {
          const nameCell = row.querySelector("td:nth-child(2)");
          if (nameCell) {
            let badge = nameCell.querySelector<HTMLElement>(".reason-badge");
            if (!badge && reason) {
              badge = document.createElement("span");
              badge.className = "status-pill info reason-badge";
              (badge as HTMLElement).style.fontSize = "0.72rem";
              nameCell.appendChild(badge);
            }
            if (badge) badge.textContent = reason ? (CHURN_REASONS_MAP[reason] ?? "") : "";
          }
        }
        showToast("理由を保存しました");
      } catch (e) {
        showToast("保存に失敗しました", "error");
        console.error(e);
      }
    });
  });

  // ── 離反 対応済みチェック → 保存 ──────────────────
  root.querySelectorAll<HTMLInputElement>(".churn-actioned-check").forEach((cb) => {
    cb.addEventListener("change", async () => {
      const code     = cb.dataset.churnCode ?? "";
      const actioned = cb.checked;
      const row      = cb.closest<HTMLTableRowElement>("tr");
      if (row) {
        row.style.opacity = actioned ? "0.45" : "";
        row.setAttribute("data-actioned", actioned ? "1" : "0");
      }
      try {
        const { saveChurnNote } = await import("./api");
        const existing = state.churnNotes.find((n) => n.customerCode === code);
        const reason   = (existing?.reason ?? "") as import("./api").ChurnReasonValue;
        const today    = new Date().toISOString().slice(0, 10);
        await saveChurnNote({ customerCode: code, reason, memo: "", actionedAt: actioned ? today : null });
        if (existing) {
          existing.actionedAt = actioned ? today : null;
        } else {
          state.churnNotes.push({ customerCode: code, reason, memo: "", actionedAt: actioned ? today : null, updatedAt: new Date().toISOString() });
        }
        showToast(actioned ? "対応済みにしました" : "対応済みを解除しました");
      } catch (e) {
        showToast("保存に失敗しました", "error");
        console.error(e);
      }
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
  // 見込み顧客から見積作成
  root.querySelectorAll<HTMLButtonElement>("[data-action='prospect-quote-create']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id ?? "";
      const name = btn.dataset.name ?? "";
      const addr = btn.dataset.addr ?? "";
      state.quoteState = makeDefaultQuoteState(state.quoteCompanySettings);
      state.quoteState.customerCode = "";
      state.quoteState.customerName = name;
      state.quoteState.customerAddress = addr;
      state.quoteState.isProspect = true;
      state.quoteState.prospectId = id;
      state.quotePricing = null;
      state.quoteEditId = "new";
      navigate("/quote");
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

  // ── 汎用印刷ハンドラ（納品書・請求書・酒税申告）──────────
  root.querySelector<HTMLButtonElement>("[data-action='delivery-print']")?.addEventListener("click", () => {
    window.print();
  });
  root.querySelector<HTMLButtonElement>("[data-action='billing-print']")?.addEventListener("click", () => {
    window.print();
  });
  root.querySelector<HTMLButtonElement>("[data-action='tax-print']")?.addEventListener("click", () => {
    window.print();
  });
  root.querySelector<HTMLButtonElement>("[data-action='print-page']")?.addEventListener("click", () => {
    // 折りたたみパネルを全部開いてから印刷
    root.querySelectorAll<HTMLDetailsElement>("details").forEach(d => { d.open = true; });
    window.print();
  });

  // ── 需要計画 CSV エクスポート ──────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='demand-csv-export']")?.addEventListener("click", () => {
    if (!state.demandAnalysis) { showToast("データなし", "error"); return; }
    const analysis = state.demandAnalysis;
    const rows = Object.entries(analysis.matrix).map(([code, months]) => {
      const r: Record<string, unknown> = { productCode: code };
      analysis.months.forEach(m => { r[m] = months[m] ?? 0; });
      return r;
    });
    const columns: import("./utils/csv").CSVColumn[] = [
      { key: "productCode", label: "商品コード" },
      ...analysis.months.map(m => ({ key: m, label: m }))
    ];
    downloadCSV("demand-analysis.csv", rows, columns);
  });
  root.querySelector<HTMLButtonElement>("[data-action='plan-csv-export']")?.addEventListener("click", () => {
    if (state.productionPlan.length === 0) { showToast("データなし", "error"); return; }
    const rows = state.productionPlan.map(p => ({ ...p }));
    const columns: import("./utils/csv").CSVColumn[] = [
      { key: "productCode", label: "商品コード" },
      { key: "productName", label: "商品名" },
      { key: "productionType", label: "生産区分" },
      { key: "demandForecast", label: "需要予測" },
      { key: "safetyStockTarget", label: "安全在庫" },
      { key: "openingStock", label: "在庫数" },
      { key: "requiredProduction", label: "必要生産量" },
      { key: "plannedQty", label: "計画数" },
      { key: "actualQty", label: "実績" },
      { key: "status", label: "ステータス" }
    ];
    downloadCSV("production-plan.csv", rows, columns);
  });

  // ── 請求 ────────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='billing-close-all']")?.addEventListener("click", async () => {
    const ok = await showConfirm("当月の全請求を締め切りますか？");
    if (!ok) return;
    // 請求データをリロード（締め処理はDB側で実装が必要）
    showToast("締め処理はデータベース側の設定が必要です", "info");
  });

  // ── 醸造計画 ────────────────────────────────────────
  root.querySelector<HTMLSelectElement>("#brewing-fy-select")?.addEventListener("change", async (e) => {
    const fy = parseInt((e.target as HTMLSelectElement).value);
    state.brewingPlanFY = fy;
    const { fetchBrewingPlanSummary, fetchBrewingMonthlyTrend, fetchBrewingSchedule, fetchBrewingProductDetail, fetchBrewingCustomCategories, fetchBrewingCategoryOverrides, fetchAllBrewingStockEntries } = await import("./api");
    const [summary, trend, schedule, products, customCats, overrides, stockEntries] = await Promise.all([
      fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
      fetchBrewingMonthlyTrend(`${fy}-10-01`, `${fy + 1}-09-30`),
      fetchBrewingSchedule(fy),
      fetchBrewingProductDetail(`${fy}-10-01`, `${fy + 1}-09-30`),
      fetchBrewingCustomCategories(),
      fetchBrewingCategoryOverrides(),
      fetchAllBrewingStockEntries()
    ]);
    state.brewingPlanData = summary;
    state.brewingMonthlyTrend = trend;
    state.brewingSchedule = schedule;
    state.brewingProductDetail = products;
    state.brewingStockEntries = stockEntries;
    state.brewingCustomCategories = customCats;
    state.brewingOverrides = overrides;
    state.brewingExcludedProducts = new Set();
    renderApp();
  });

  // 醸造計画: 親でチェックOFF → 子区分へ移動（子が1つなら直接、複数なら最初の子へ）
  root.querySelectorAll<HTMLInputElement>("[data-action='brew-move-to-child']").forEach((cb) => {
    cb.addEventListener("change", async () => {
      const code = cb.dataset.code ?? "";
      const parentCat = cb.dataset.parent ?? "";
      if (!code || !parentCat) return;

      if (cb.checked) {
        // チェックON → 未振分から親に戻す
        state.brewingExcludedProducts.delete(code);
        renderApp();
        return;
      }

      // チェックOFF → 未振分にする（excludedに追加）
      state.brewingExcludedProducts.add(code);

      // 子が1つだけの場合は直接移動
      const children = state.brewingCustomCategories.filter(c => c.parentCategory === parentCat);
      if (children.length === 1) {
        const { setBrewingCategoryOverride, fetchBrewingPlanSummary, fetchBrewingProductDetail, fetchBrewingCategoryOverrides } = await import("./api");
        await setBrewingCategoryOverride(code, children[0].name);
        const fy = state.brewingPlanFY;
        const { fetchBrewingYearlyShipments } = await import("./api");
        const [summary, products, overrides, yearlyShips] = await Promise.all([
          fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchBrewingProductDetail(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchBrewingCategoryOverrides(),
          fetchBrewingYearlyShipments()
        ]);
        state.brewingPlanData = summary;
        state.brewingProductDetail = products;
        state.brewingOverrides = overrides;
        state.brewingYearlyShipments = yearlyShips;
        state.brewingExcludedProducts.delete(code);
      }
      renderApp();
    });
  });

  // 醸造計画: 子区分でチェックON → 確定（オーバーライド作成）
  root.querySelectorAll<HTMLInputElement>("[data-action='brew-confirm-to-child']").forEach((cb) => {
    cb.addEventListener("change", async () => {
      const code = cb.dataset.code ?? "";
      const cat = cb.dataset.cat ?? "";
      if (!code || !cat) return;
      const { setBrewingCategoryOverride, fetchBrewingPlanSummary, fetchBrewingProductDetail, fetchBrewingCategoryOverrides, fetchBrewingYearlyShipments } = await import("./api");
      await setBrewingCategoryOverride(code, cat);
      const fy = state.brewingPlanFY;
      const [summary, products, overrides, yearlyShips] = await Promise.all([
        fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
        fetchBrewingProductDetail(`${fy}-10-01`, `${fy + 1}-09-30`),
        fetchBrewingCategoryOverrides(),
        fetchBrewingYearlyShipments()
      ]);
      state.brewingPlanData = summary;
      state.brewingProductDetail = products;
      state.brewingOverrides = overrides;
      state.brewingYearlyShipments = yearlyShips;
      renderApp();
    });
  });

  // 醸造計画: 子区分でチェックOFF → 親に戻す（オーバーライド削除）
  root.querySelectorAll<HTMLInputElement>("[data-action='brew-unconfirm']").forEach((cb) => {
    cb.addEventListener("change", async () => {
      const code = cb.dataset.code ?? "";
      if (!code) return;
      const { setBrewingCategoryOverride, fetchBrewingPlanSummary, fetchBrewingProductDetail, fetchBrewingCategoryOverrides, fetchBrewingYearlyShipments } = await import("./api");
      await setBrewingCategoryOverride(code, null);
      const fy = state.brewingPlanFY;
      const [summary, products, overrides, yearlyShips] = await Promise.all([
        fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
        fetchBrewingProductDetail(`${fy}-10-01`, `${fy + 1}-09-30`),
        fetchBrewingCategoryOverrides(),
        fetchBrewingYearlyShipments()
      ]);
      state.brewingPlanData = summary;
      state.brewingProductDetail = products;
      state.brewingOverrides = overrides;
      state.brewingYearlyShipments = yearlyShips;
      renderApp();
    });
  });

  // 調達計画: 醸造月スケジュール追加
  root.querySelectorAll<HTMLButtonElement>("[data-action='proc-add-schedule']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const cat = btn.dataset.cat ?? "";
      const monthSel = root.querySelector<HTMLSelectElement>(`[data-action='proc-add-month-select'][data-cat='${cat}']`);
      const volInput = root.querySelector<HTMLInputElement>(`[data-action='proc-add-month-vol'][data-cat='${cat}']`);
      const month = parseInt(monthSel?.value ?? "0");
      const vol = parseFloat(volInput?.value ?? "0");
      if (!cat || !month || vol <= 0) return;
      // 既存スケジュールに追加
      const existing = state.brewingSchedule.filter(s => s.brewCategory === cat);
      const rows = [...existing.map(s => ({ brewMonth: s.brewMonth, durationMonths: s.durationMonths, plannedVolumeL: s.plannedVolumeL })),
        { brewMonth: month, durationMonths: 2, plannedVolumeL: vol }];
      const { saveBrewingSchedule, fetchBrewingSchedule } = await import("./api");
      await saveBrewingSchedule(cat, state.brewingPlanFY, rows);
      state.brewingSchedule = await fetchBrewingSchedule(state.brewingPlanFY);
      renderApp();
    });
  });

  // 調達計画: 醸造月スケジュール削除
  root.querySelectorAll<HTMLButtonElement>("[data-action='proc-remove-schedule']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const cat = btn.dataset.cat ?? "";
      const month = parseInt(btn.dataset.month ?? "0");
      if (!cat || !month) return;
      const rows = state.brewingSchedule
        .filter(s => s.brewCategory === cat && s.brewMonth !== month)
        .map(s => ({ brewMonth: s.brewMonth, durationMonths: s.durationMonths, plannedVolumeL: s.plannedVolumeL }));
      const { saveBrewingSchedule, fetchBrewingSchedule } = await import("./api");
      await saveBrewingSchedule(cat, state.brewingPlanFY, rows);
      state.brewingSchedule = await fetchBrewingSchedule(state.brewingPlanFY);
      renderApp();
    });
  });

  // 調達計画: 醸造量直接編集 → スケジュール更新
  root.querySelectorAll<HTMLInputElement>("[data-action='proc-edit-vol']").forEach((input) => {
    input.addEventListener("change", async () => {
      const cat = input.dataset.cat ?? "";
      const vol = parseFloat(input.value) || 0;
      if (!cat) return;
      const { saveProcurementDecision } = await import("./api");
      await saveProcurementDecision(cat, state.brewingPlanFY, vol);
      state.procurementDecisions[cat] = vol;
      renderApp();
    });
  });

  // 調達計画: 作付け予定追加
  root.querySelector<HTMLButtonElement>("[data-action='proc-add-commitment']")?.addEventListener("click", async () => {
    const variety = (root.querySelector<HTMLSelectElement>("#proc-commit-variety")?.value ?? "").trim();
    const bales = parseFloat((root.querySelector<HTMLInputElement>("#proc-commit-bales")?.value ?? "0"));
    const price = parseFloat((root.querySelector<HTMLInputElement>("#proc-commit-price")?.value ?? "0"));
    const deliveryMonth = parseInt((root.querySelector<HTMLSelectElement>("#proc-commit-month")?.value ?? "0")) || null;
    const supplier = (root.querySelector<HTMLInputElement>("#proc-commit-supplier")?.value ?? "").trim();
    if (!variety || bales <= 0) return;
    const { saveRicePurchaseCommitment, fetchRicePurchaseCommitments } = await import("./api");
    await saveRicePurchaseCommitment({ varietyName: variety, committedBales: bales, pricePerKg: price, deliveryMonth, supplier, fy: state.brewingPlanFY });
    state.ricePurchaseCommitments = await fetchRicePurchaseCommitments(state.brewingPlanFY);
    renderApp();
  });

  // 調達計画: 米品種マスタ追加
  root.querySelector<HTMLButtonElement>("[data-action='proc-add-variety']")?.addEventListener("click", async () => {
    const nameInput = root.querySelector<HTMLInputElement>("#proc-variety-name");
    const priceInput = root.querySelector<HTMLInputElement>("#proc-variety-price");
    const name = nameInput?.value.trim() ?? "";
    const price = parseFloat(priceInput?.value ?? "400") || 400;
    if (!name) return;
    const { addRiceVariety, fetchRiceVarieties } = await import("./api");
    const ok = await addRiceVariety(name, price);
    if (ok) {
      state.riceVarieties = await fetchRiceVarieties();
      if (nameInput) nameInput.value = "";
      if (priceInput) priceInput.value = "";
      showToast(`「${name}」を追加しました`);
    }
    renderApp();
  });

  // 調達計画: 米品種マスタ削除
  root.querySelectorAll<HTMLButtonElement>("[data-action='proc-delete-variety']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id ?? "";
      const { deleteRiceVariety, fetchRiceVarieties } = await import("./api");
      const ok = await deleteRiceVariety(id);
      if (ok) state.riceVarieties = await fetchRiceVarieties();
      renderApp();
    });
  });

  // 調達計画: 品種プルダウン変更 → riceParams保存
  root.querySelectorAll<HTMLSelectElement>("[data-action='brew-rice-variety-select']").forEach((sel) => {
    sel.addEventListener("change", async () => {
      const cat = sel.dataset.cat ?? "";
      const field = sel.dataset.field ?? "";
      const variety = sel.value;
      if (!cat || !field) return;
      const current = state.brewingRiceParams[cat] ?? {
        brewCategory: cat, polishingRatio: 0.70, ricePerLiterKg: 0.50,
        kojiRatio: 0.30, kojiVariety: "山田錦", kojiPricePerKg: 600,
        kakeVariety: "一般米", kakePricePerKg: 350, alcoholAdditionRatio: 0
      };
      (current as any)[field] = variety;
      // 品種変更時にデフォルト単価も連動
      const v = state.riceVarieties.find(r => r.name === variety);
      if (v) {
        if (field === "kojiVariety") current.kojiPricePerKg = v.defaultPricePerKg;
        if (field === "kakeVariety") current.kakePricePerKg = v.defaultPricePerKg;
      }
      state.brewingRiceParams[cat] = current;
      const { saveBrewingRiceParams } = await import("./api");
      await saveBrewingRiceParams(cat, current);
      renderApp();
    });
  });

  // 調達計画: 新規区分追加（スケジュール経由）
  root.querySelector<HTMLButtonElement>("[data-action='proc-add-new-cat']")?.addEventListener("click", async () => {
    const nameInput = root.querySelector<HTMLInputElement>("#proc-new-cat-name");
    const volInput = root.querySelector<HTMLInputElement>("#proc-new-cat-vol");
    const name = nameInput?.value.trim() ?? "";
    const vol = parseFloat(volInput?.value ?? "0");
    if (!name) { showToast("区分名を入力してください", "warning"); return; }
    if (vol <= 0) { showToast("醸造予定量を入力してください", "warning"); return; }
    // スケジュールとして追加（10月に全量仕込みとして仮登録）
    const { saveBrewingSchedule, fetchBrewingSchedule } = await import("./api");
    await saveBrewingSchedule(name, state.brewingPlanFY, [{ brewMonth: 10, durationMonths: 2, plannedVolumeL: vol }]);
    state.brewingSchedule = await fetchBrewingSchedule(state.brewingPlanFY);
    if (nameInput) nameInput.value = "";
    if (volInput) volInput.value = "";
    showToast(`「${name}」を追加しました`);
    renderApp();
  });

  // 醸造計画: 米パラメータ一括適用
  root.querySelector<HTMLButtonElement>("[data-action='brew-rice-bulk-apply']")?.addEventListener("click", async () => {
    const perL = parseFloat((root.querySelector<HTMLInputElement>("#rice-bulk-per-l")?.value ?? "0.50"));
    const koji = parseFloat((root.querySelector<HTMLInputElement>("#rice-bulk-koji")?.value ?? "0.30"));
    if (isNaN(perL) || isNaN(koji)) return;
    const { saveBrewingRiceParams } = await import("./api");
    const cats = Object.keys(state.brewingRiceParams);
    // 未登録の区分も含めるため、予測に出ている区分を全部対象にする
    const allCats = new Set([...cats, ...state.brewingYearlyShipments.map(s => s.brewCategory)]);
    for (const cat of allCats) {
      const current = state.brewingRiceParams[cat] ?? {
        brewCategory: cat, polishingRatio: 0.70, ricePerLiterKg: 0.50,
        kojiRatio: 0.30, kojiVariety: "山田錦", kojiPricePerKg: 600,
        kakeVariety: "一般米", kakePricePerKg: 350, alcoholAdditionRatio: 0
      };
      current.ricePerLiterKg = perL;
      current.kojiRatio = koji;
      state.brewingRiceParams[cat] = current;
      await saveBrewingRiceParams(cat, current);
    }
    renderApp();
  });

  // 醸造計画: 米パラメータ変更
  root.querySelectorAll<HTMLInputElement>("[data-action='brew-rice-edit']").forEach((input) => {
    input.addEventListener("change", async () => {
      const cat = input.dataset.cat ?? "";
      const field = input.dataset.field ?? "";
      const val = parseFloat(input.value);
      if (!cat || !field || isNaN(val)) return;
      const current = state.brewingRiceParams[cat] ?? {
        brewCategory: cat, polishingRatio: 0.70, ricePerLiterKg: 0.50,
        kojiRatio: 0.30, kojiVariety: "山田錦", kojiPricePerKg: 600,
        kakeVariety: "一般米", kakePricePerKg: 350, alcoholAdditionRatio: 0
      };
      (current as any)[field] = val;
      state.brewingRiceParams[cat] = current;
      const { saveBrewingRiceParams } = await import("./api");
      await saveBrewingRiceParams(cat, current);
      renderApp();
    });
  });

  // 醸造計画: 増減率の手動補正
  root.querySelectorAll<HTMLInputElement>("[data-action='brew-growth-edit']").forEach((input) => {
    input.addEventListener("change", async () => {
      const cat = input.dataset.cat ?? "";
      const pct = parseFloat(input.value);
      if (!cat) return;
      const { saveBrewingForecastOverride } = await import("./api");
      if (isNaN(pct)) {
        await saveBrewingForecastOverride(cat, null);
        delete state.brewingForecastOverrides[cat];
      } else {
        const rate = pct / 100;
        await saveBrewingForecastOverride(cat, rate);
        state.brewingForecastOverrides[cat] = rate;
      }
      renderApp();
    });
  });

  // 醸造計画: アルコール度数変更
  root.querySelectorAll<HTMLInputElement>("[data-action='brew-alc-save']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const cat = btn.dataset.cat ?? "";
      const catId = "bc-" + encodeURIComponent(cat).replace(/%/g, "-");
      const rawInput = root.querySelector<HTMLInputElement>(`#alc-raw-${catId}`);
      const targetInput = root.querySelector<HTMLInputElement>(`#alc-target-${catId}`);
      const rawPct = parseFloat(rawInput?.value ?? "18") || 18;
      const targetPct = parseFloat(targetInput?.value ?? "15") || 15;
      const { saveBrewingAlcoholSetting } = await import("./api");
      const ok = await saveBrewingAlcoholSetting(cat, rawPct, targetPct);
      if (ok) {
        state.brewingAlcoholSettings[cat] = { brewCategory: cat, rawAlcoholPct: rawPct, targetAlcoholPct: targetPct };
      }
      renderApp();
    });
  });

  // 醸造計画: 銘柄の区分変更ドロップダウン
  root.querySelectorAll<HTMLSelectElement>("[data-action='brew-move-product']").forEach((sel) => {
    sel.addEventListener("change", async () => {
      const code = sel.dataset.code ?? "";
      const newCat = sel.value;
      const currentCat = sel.dataset.current ?? "";
      if (newCat === currentCat) return;
      const { setBrewingCategoryOverride, fetchBrewingPlanSummary, fetchBrewingProductDetail, fetchBrewingCategoryOverrides } = await import("./api");
      const ok = await setBrewingCategoryOverride(code, newCat);
      if (ok) {
        const fy = state.brewingPlanFY;
        const [summary, products, overrides] = await Promise.all([
          fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchBrewingProductDetail(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchBrewingCategoryOverrides()
        ]);
        state.brewingPlanData = summary;
        state.brewingProductDetail = products;
        state.brewingOverrides = overrides;
      }
      renderApp();
    });
  });

  // 醸造計画: 製成種別をカスタム区分に紐づけ
  root.querySelectorAll<HTMLSelectElement>("[data-action='brew-link-type']").forEach((sel) => {
    sel.addEventListener("change", async () => {
      const cat = sel.dataset.cat ?? "";
      const typeName = sel.value;
      if (!cat || !typeName) return;
      const { linkTypeToCategory, fetchBrewingPlanSummary, fetchBrewingProductDetail, fetchBrewingCategoryOverrides, fetchCategoryTypeLinks } = await import("./api");
      await linkTypeToCategory(cat, typeName);
      const fy = state.brewingPlanFY;
      const [summary, products, overrides, typeLinks] = await Promise.all([
        fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
        fetchBrewingProductDetail(`${fy}-10-01`, `${fy + 1}-09-30`),
        fetchBrewingCategoryOverrides(),
        fetchCategoryTypeLinks()
      ]);
      state.brewingPlanData = summary;
      state.brewingProductDetail = products;
      state.brewingOverrides = overrides;
      state.brewingTypeLinks = typeLinks;
      renderApp();
    });
  });

  // 醸造計画: 製成種別の紐づけ解除
  root.querySelectorAll<HTMLButtonElement>("[data-action='brew-unlink-type']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const cat = btn.dataset.cat ?? "";
      const typeName = btn.dataset.type ?? "";
      if (!cat || !typeName) return;
      const { unlinkTypeFromCategory, fetchBrewingPlanSummary, fetchBrewingProductDetail, fetchBrewingCategoryOverrides, fetchCategoryTypeLinks } = await import("./api");
      await unlinkTypeFromCategory(cat, typeName);
      const fy = state.brewingPlanFY;
      const [summary, products, overrides, typeLinks] = await Promise.all([
        fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
        fetchBrewingProductDetail(`${fy}-10-01`, `${fy + 1}-09-30`),
        fetchBrewingCategoryOverrides(),
        fetchCategoryTypeLinks()
      ]);
      state.brewingPlanData = summary;
      state.brewingProductDetail = products;
      state.brewingOverrides = overrides;
      state.brewingTypeLinks = typeLinks;
      renderApp();
    });
  });

  // 醸造計画: カスタム区分の追加
  root.querySelector<HTMLButtonElement>("[data-action='brew-add-category']")?.addEventListener("click", async () => {
    const input = root.querySelector<HTMLInputElement>("#brew-new-category-name");
    const parentSelect = root.querySelector<HTMLSelectElement>("#brew-new-category-parent");
    const name = input?.value.trim() ?? "";
    const parent = parentSelect?.value ?? "";
    if (!name) return;
    if (!parent) { showToast("親区分を選択してください", "warning"); return; }
    const allCatNames = [...["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"], ...state.brewingCustomCategories.map(c => c.name)];
    if (allCatNames.includes(name)) {
      showToast("同名の区分が既に存在します", "warning");
      return;
    }
    const { addBrewingCustomCategory } = await import("./api");
    const ok = await addBrewingCustomCategory(name, parent);
    if (ok) {
      state.brewingCustomCategories.push({ name, parentCategory: parent });
      if (input) input.value = "";
      showToast(`「${name}」を追加しました（${parent}系）`);
    } else {
      showToast("追加に失敗しました", "error");
    }
    renderApp();
  });

  // 醸造計画: カスタム区分の削除
  root.querySelectorAll<HTMLButtonElement>("[data-action='brew-delete-category']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const name = btn.dataset.cat ?? "";
      if (!name) return;
      const { deleteBrewingCustomCategory, fetchBrewingPlanSummary, fetchBrewingProductDetail } = await import("./api");
      const ok = await deleteBrewingCustomCategory(name);
      if (ok) {
        state.brewingCustomCategories = state.brewingCustomCategories.filter(c => c.name !== name);
        // オーバーライドも消えているのでstate反映
        for (const [code, cat] of Object.entries(state.brewingOverrides)) {
          if (cat === name) delete state.brewingOverrides[code];
        }
        const fy = state.brewingPlanFY;
        const [summary, products] = await Promise.all([
          fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchBrewingProductDetail(`${fy}-10-01`, `${fy + 1}-09-30`)
        ]);
        state.brewingPlanData = summary;
        state.brewingProductDetail = products;
        showToast(`「${name}」を削除しました`);
      }
      renderApp();
    });
  });

  // 醸造計画: タンクエントリ追加
  root.querySelectorAll<HTMLButtonElement>("[data-action='brew-add-entry']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const cat = btn.dataset.cat ?? "";
      const catId = btn.dataset.catId ?? "";
      const targetSelect = root.querySelector<HTMLSelectElement>(`#new-entry-target-${catId}`);
      const targetCat = targetSelect?.value ?? cat;
      const labelInput = root.querySelector<HTMLInputElement>(`#new-entry-label-${catId}`);
      const volInput = root.querySelector<HTMLInputElement>(`#new-entry-vol-${catId}`);
      const label = labelInput?.value.trim() ?? "";
      const vol = parseFloat(volInput?.value ?? "0");
      if (vol <= 0) return;
      const { addBrewingStockEntry, fetchBrewingPlanSummary, fetchAllBrewingStockEntries } = await import("./api");
      const ok = await addBrewingStockEntry(targetCat, label || `タンク${(state.brewingStockEntries.filter(e => e.brewCategory === targetCat).length + 1)}`, vol);
      if (ok) {
        const fy = state.brewingPlanFY;
        const [summary, entries] = await Promise.all([
          fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchAllBrewingStockEntries()
        ]);
        state.brewingPlanData = summary;
        state.brewingStockEntries = entries;
      }
      renderApp();
      // 編集パネルを再表示
      requestAnimationFrame(() => {
        const display = document.getElementById(`stock-display-${catId}`);
        const edit = document.getElementById(`stock-edit-${catId}`);
        const editBtn = document.querySelector<HTMLButtonElement>(`.btn-edit-stock[data-cat-id="${catId}"]`);
        if (display) display.style.display = "none";
        if (edit) edit.style.display = "";
        if (editBtn) editBtn.style.display = "none";
      });
    });
  });

  // 醸造計画: タンクエントリ削除
  // 醸造計画: タンクの区分変更（ドロップダウン）
  root.querySelectorAll<HTMLSelectElement>("[data-action='brew-reassign-entry']").forEach((sel) => {
    sel.addEventListener("change", async () => {
      const id = sel.dataset.id ?? "";
      const newCat = sel.value;
      if (!id || !newCat) return;
      const { reassignBrewingStockEntry, fetchBrewingPlanSummary, fetchAllBrewingStockEntries } = await import("./api");
      const ok = await reassignBrewingStockEntry(id, newCat);
      if (ok) {
        const fy = state.brewingPlanFY;
        const [summary, entries] = await Promise.all([
          fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchAllBrewingStockEntries()
        ]);
        state.brewingPlanData = summary;
        state.brewingStockEntries = entries;
      }
      renderApp();
      // 編集パネルを再表示
      requestAnimationFrame(() => {
        root.querySelectorAll<HTMLButtonElement>(".btn-edit-stock").forEach(b => {
          const display = document.getElementById(`stock-display-${b.dataset.catId}`);
          const edit = document.getElementById(`stock-edit-${b.dataset.catId}`);
          // 変更元のカードの編集パネルを開き直す
          if (edit && edit.querySelector(`[data-id="${id}"]`)) {
            if (display) display.style.display = "none";
            edit.style.display = "";
            b.style.display = "none";
          }
        });
      });
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-action='brew-delete-entry']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id ?? "";
      const cat = btn.dataset.cat ?? "";
      const catId = "bc-" + encodeURIComponent(cat).replace(/%/g, "-");
      const { deleteBrewingStockEntry, fetchBrewingPlanSummary, fetchAllBrewingStockEntries } = await import("./api");
      const ok = await deleteBrewingStockEntry(id);
      if (ok) {
        const fy = state.brewingPlanFY;
        const [summary, entries] = await Promise.all([
          fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchAllBrewingStockEntries()
        ]);
        state.brewingPlanData = summary;
        state.brewingStockEntries = entries;
      }
      renderApp();
      requestAnimationFrame(() => {
        const display = document.getElementById(`stock-display-${catId}`);
        const edit = document.getElementById(`stock-edit-${catId}`);
        const editBtn = document.querySelector<HTMLButtonElement>(`.btn-edit-stock[data-cat-id="${catId}"]`);
        if (display) display.style.display = "none";
        if (edit) edit.style.display = "";
        if (editBtn) editBtn.style.display = "none";
      });
    });
  });

  // 醸造計画: 編集ボタン
  root.querySelectorAll<HTMLButtonElement>(".btn-edit-stock").forEach((btn) => {
    btn.addEventListener("click", () => {
      const catId = btn.dataset.catId ?? "";
      const display = root.querySelector<HTMLElement>(`#stock-display-${catId}`);
      const edit = root.querySelector<HTMLElement>(`#stock-edit-${catId}`);
      if (display) display.style.display = "none";
      if (edit) edit.style.display = "";
      btn.style.display = "none";
    });
  });

  // 醸造計画: 取消
  root.querySelectorAll<HTMLButtonElement>(".btn-cancel-stock").forEach((btn) => {
    btn.addEventListener("click", () => {
      const catId = btn.dataset.catId ?? "";
      const display = root.querySelector<HTMLElement>(`#stock-display-${catId}`);
      const edit = root.querySelector<HTMLElement>(`#stock-edit-${catId}`);
      const editBtn = root.querySelector<HTMLButtonElement>(`.btn-edit-stock[data-cat-id="${catId}"]`);
      if (display) display.style.display = "";
      if (edit) edit.style.display = "none";
      if (editBtn) editBtn.style.display = "";
    });
  });

  // 醸造計画: 仕込み行を追加
  root.querySelectorAll<HTMLButtonElement>(".btn-add-schedule-row").forEach((btn) => {
    btn.addEventListener("click", () => {
      const catId = btn.dataset.catId ?? "";
      const container = root.querySelector(`#schedule-rows-${catId}`);
      if (!container) return;
      const idx = container.querySelectorAll(".schedule-edit-row").length;
      const div = document.createElement("div");
      div.innerHTML = buildScheduleEditRowHTML(catId, idx, 9, 2, 0, "");
      const row = div.firstElementChild as HTMLElement;
      container.appendChild(row);
      // 削除ボタンをワイヤーアップ
      row.querySelector<HTMLButtonElement>(".btn-remove-schedule-row")?.addEventListener("click", () => row.remove());
    });
  });

  // 醸造計画: 既存の仕込み削除ボタン
  root.querySelectorAll<HTMLButtonElement>(".btn-remove-schedule-row").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest(".schedule-edit-row")?.remove());
  });

  // 醸造計画: 保存
  root.querySelectorAll<HTMLButtonElement>(".btn-save-stock").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const cat = btn.dataset.cat ?? "";
      const catId = btn.dataset.catId ?? "";
      const stockInput = root.querySelector<HTMLInputElement>(`#stock-input-${catId}`);
      const stockL = parseFloat(stockInput?.value ?? "");
      if (isNaN(stockL) || stockL < 0) { alert("有効な数値を入力してください"); return; }

      btn.textContent = "保存中...";
      btn.setAttribute("disabled", "true");
      try {
        const { upsertBrewingStock, fetchBrewingPlanSummary, fetchBrewingMonthlyTrend } = await import("./api");
        const fy = state.brewingPlanFY;
        await upsertBrewingStock(cat, stockL, 0);
        const [summary, trend] = await Promise.all([
          fetchBrewingPlanSummary(`${fy}-10-01`, `${fy + 1}-09-30`),
          fetchBrewingMonthlyTrend(`${fy}-10-01`, `${fy + 1}-09-30`)
        ]);
        state.brewingPlanData = summary;
        state.brewingMonthlyTrend = trend;
        renderApp();
      } catch (err) {
        console.error("[brewing save]", err);
        alert(`保存エラー: ${String(err)}`);
        btn.textContent = "保存";
        btn.removeAttribute("disabled");
      }
    });
  });

  // Toggle sub-category rows in brewing plan table
  root.querySelectorAll<HTMLTableRowElement>("[data-toggle-cat]").forEach((row) => {
    row.addEventListener("click", () => {
      const cat = row.dataset.toggleCat ?? "";
      const className = `sub-row-${"bc-" + encodeURIComponent(cat).replace(/%/g, "-")}`;
      const subRows = root.querySelectorAll<HTMLTableRowElement>(`.${className}`);
      const icon = row.querySelector<HTMLSpanElement>(".toggle-icon");
      const isOpen = subRows[0]?.style.display !== "none";
      subRows.forEach((sr) => { sr.style.display = isOpen ? "none" : ""; });
      if (icon) icon.innerHTML = isOpen ? "&#9654;" : "&#9660;";
    });
  });

  // ── 仕込 ────────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='jikomi-new']")?.addEventListener("click", () => {
    showToast("新規仕込の登録はマスタ管理から行ってください", "info");
  });

  // ── 検定 ────────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='kentei-new']")?.addEventListener("click", () => {
    showToast("新規検定の登録はマスタ管理から行ってください", "info");
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='kentei-edit']").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("検定の編集はマスタ管理から行ってください", "info");
    });
  });

  // ── 仕入 ────────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='purchase-new']")?.addEventListener("click", () => {
    showToast("新規仕入の登録はマスタ管理から行ってください", "info");
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='payable-pay']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ok = await showConfirm("この買掛を入金済みにしますか？");
      if (!ok) return;
      showToast("入金処理はデータベース側の設定が必要です", "info");
    });
  });

  // ── 原材料 ──────────────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-action='bill-detail']").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("請求書詳細は印刷センターから確認してください", "info");
    });
  });
  root.querySelector<HTMLButtonElement>("[data-action='bill-new']")?.addEventListener("click", () => {
    showToast("新規請求書の作成は伝票入力から行ってください", "info");
  });

  // ── タンク ──────────────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-action='tank-detail']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tankNo = btn.closest("tr")?.querySelector("td")?.textContent ?? "";
      showToast(`タンク ${tankNo} の詳細: 仕込台帳を参照してください`, "info");
    });
  });

  // ── 店舗POS ─────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='order-new']")?.addEventListener("click", () => {
    showToast("新規注文はモバイル注文画面から行ってください", "info");
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='order-detail']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const orderNo = btn.closest("tr")?.querySelector("td")?.textContent ?? "";
      showToast(`注文 ${orderNo} の詳細を表示します`, "info");
    });
  });

  // ── FAX OCR ─────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='fax-create-invoice']")?.addEventListener("click", () => {
    showToast("FAXから伝票を起票するには、伝票入力画面をご利用ください", "info");
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='fax-view']").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("FAX詳細の表示は準備中です", "info");
    });
  });

  // ── 蔵見学 ──────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='tour-show-form']")?.addEventListener("click", () => {
    window.open("/tour-form", "_blank");
  });

  // ── 見込客 ──────────────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='prospect-convert']")?.addEventListener("click", () => {
    showToast("得意先化するにはマスタ管理で得意先を作成してください", "info");
  });

  // ── 季節カレンダー ──────────────────────────────────
  root.querySelectorAll<HTMLButtonElement>("[data-action='create-proposal']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.customer ?? "";
      showToast(`得意先 ${code} への提案書を作成するには見積作成画面をご利用ください`, "info");
    });
  });

  // ── リストビルダー ──────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='lb-new-manual']")?.addEventListener("click", () => {
    showToast("手動リスト作成は準備中です", "info");
  });
  root.querySelector<HTMLButtonElement>("[data-action='lb-delete-list']")?.addEventListener("click", async () => {
    const id = (root.querySelector<HTMLButtonElement>("[data-action='lb-delete-list']") as HTMLElement)?.dataset.id;
    if (!id) return;
    const ok = await showConfirm("このリストを削除しますか？");
    if (!ok) return;
    const { supabaseDelete } = await import("./supabase");
    const deleted = await supabaseDelete("lead_lists", id);
    if (deleted) {
      const { fetchLeadLists } = await import("./api");
      state.leadLists = await fetchLeadLists();
      showToast("削除しました", "success");
      renderApp();
    } else {
      showToast("削除に失敗しました", "error");
    }
  });

  // ── 受注ワークフロー ────────────────────────────────
  root.querySelector<HTMLButtonElement>("[data-action='wf-new-order']")?.addEventListener("click", () => {
    showToast("新規受注の登録はモバイル注文画面から行ってください", "info");
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
  try {
    app.innerHTML = renderShell();
  } catch (err) {
    console.error("[renderApp] render error:", err);
    app.innerHTML = `<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(err)}\n\n${(err as Error)?.stack ?? ""}</div>`;
    return;
  }
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
  // フォームデザイナー + 印刷プレビュー + 見積プレビューを画面幅に合わせてスケーリング
  requestAnimationFrame(() => {
    for (const scalerId of ["fd-scaler", "print-scaler", "q-preview-scaler"]) {
      const scaler = app.querySelector<HTMLElement>(`#${scalerId}`);
      const inner = scaler?.querySelector<HTMLElement>(".fd-canvas, .print-preview, .q-preview-doc");
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
      syncDashboard,
      dbCompanySettings,
    ] = await Promise.all([
      fetchSalesSummary(),
      fetchPaymentStatus(),
      fetchMasterStats(),
      fetchPipelineMeta(),
      fetchInvoices(state.invoiceFilter),
      fetchCustomerLedger(state.ledgerCustomerCode),
      fetchSalesAnalytics(),
      fetchSyncDashboard(),
      fetchSystemSetting<QuoteCompanySettings>("quote_company"),
    ]);

    state.salesSummary = salesSummary;
    state.paymentStatus = paymentStatus;
    state.masterStats = masterStats;
    state.pipelineMeta = pipelineMeta;
    state.invoiceRecords = invoiceRecords;
    state.customerLedger = customerLedger;
    state.salesAnalytics = salesAnalytics;
    state.syncDashboard = syncDashboard;

    // DB設定をローカル設定にマージ（DB優先）
    if (dbCompanySettings) {
      const merged = { ...defaultCompanySettings, ...loadQuoteSettings(), ...dbCompanySettings };
      state.quoteCompanySettings = merged;
      saveQuoteSettings(merged); // localStorageにも書き戻す（オフライン用）
    }

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

// Map is now rendered via Leaflet inline script in CustomerMap.ts
function initCustomerMap(_container: HTMLElement) {
  // no-op: kept for TypeScript reference
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
