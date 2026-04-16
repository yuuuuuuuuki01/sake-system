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
  type PurchaseRecord,
  type RawMaterialStock,
  type SalesAnalytics,
  type SalesReport,
  type SalesSummary,
  type MailSender,
  type CalendarEvent,
  type IntegrationSetting,
  type ShopifyOrder,
  type FaxRecord,
  type StoreOrder,
  type StoreSale,
  type TankRecord,
  type TaxDeclaration
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
import { renderInvoiceSearch } from "./components/InvoiceSearch";
import { renderJikomiCalendar } from "./components/JikomiCalendar";
import { renderJikomi } from "./components/Jikomi";
import { renderKentei } from "./components/Kentei";
import { renderLoginScreen } from "./components/LoginScreen";
import { renderMasterStats } from "./components/MasterStats";
import { renderMaterials } from "./components/Materials";
import { renderPaymentStatus } from "./components/PaymentStatus";
import { renderProductPicker } from "./components/ProductPicker";
import { renderPurchase } from "./components/Purchase";
import { renderRawMaterial } from "./components/RawMaterial";
import { renderRelaySetup } from "./components/RelaySetup";
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
import { renderTankList } from "./components/TankList";
import { renderTaxDeclaration } from "./components/TaxDeclaration";
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
  | "/fax";

type CategoryKey = "dashboard" | "sales" | "brewery" | "purchase" | "more" | "email";

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
  "/fax"
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
  { path: "/fax", title: "FAX OCR" }
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
  pickerMode: "customer" | "product" | null;
  pickerQuery: string;
  pickerTargetLine: number | null;
  invoiceErrors: Record<string, string>;
  deliveryNote: DeliveryNote | null;
  deliverySearchDocNo: string;
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
  printTemplate: PrintTemplateKey;
  printOptions: PrintOptions;
  printCompany: PrintCompanyInfo;
  printData: PrintDocumentData;
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
  emailSending: boolean;
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
  workflowOrders: [
    { id: "o1", orderNo: "ORD-240416-001", customerName: "青葉商事", orderDate: "2026-04-16", deliveryDate: "2026-04-18", stage: "new", totalAmount: 54000, itemCount: 3, priority: "urgent", staffName: "田中" },
    { id: "o2", orderNo: "ORD-240416-002", customerName: "北斗酒販", orderDate: "2026-04-16", deliveryDate: "2026-04-20", stage: "new", totalAmount: 36000, itemCount: 2, priority: "normal" },
    { id: "o3", orderNo: "ORD-240415-003", customerName: "中央フーズ", orderDate: "2026-04-15", deliveryDate: "2026-04-17", stage: "picking", totalAmount: 128000, itemCount: 6, priority: "urgent", staffName: "佐藤" },
    { id: "o4", orderNo: "ORD-240415-001", customerName: "東海酒店", orderDate: "2026-04-15", stage: "packed", totalAmount: 72000, itemCount: 4, priority: "normal", staffName: "山田" },
    { id: "o5", orderNo: "ORD-240414-002", customerName: "西川商店", orderDate: "2026-04-14", deliveryDate: "2026-04-15", stage: "shipped", totalAmount: 96000, itemCount: 5, priority: "normal" },
    { id: "o6", orderNo: "ORD-240413-001", customerName: "南部酒販", orderDate: "2026-04-13", stage: "delivered", totalAmount: 48000, itemCount: 3, priority: "normal" }
  ],
  mobileOrder: {
    step: "customer",
    selectedCustomer: null,
    cart: [],
    customerQuery: "",
    productQuery: "",
    memo: "",
    submittedDocNo: null
  },
  tourInquiries: [
    { id: "t1", name: "鈴木 太郎", email: "suzuki@example.com", phone: "090-1234-5678", visitDate: "2026-04-22", partySize: 4, language: "ja", purpose: "家族旅行の記念に", message: "蔵見学と試飲を希望します。予算は1人5000円程度です。", status: "new", createdAt: "2026-04-16T09:00:00" },
    { id: "t2", name: "John Smith", email: "john@example.com", visitDate: "2026-04-25", partySize: 2, language: "en", purpose: "Sake tourism research", message: "We are journalists writing about Japanese sake culture. Would love to interview the toji-san.", status: "replied", createdAt: "2026-04-15T14:30:00" },
    { id: "t3", name: "田中 花子", email: "tanaka@example.com", phone: "03-9999-0000", visitDate: "2026-04-28", partySize: 8, language: "ja", purpose: "会社の親睦会", message: "団体での訪問になります。可能であればランチも一緒にお願いします。", status: "confirmed", createdAt: "2026-04-14T10:00:00", confirmedTime: "2026-04-28T14:00" }
  ],
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
  emailSending: false,
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
  return true;
}

function tryAutofillCustomerByName(name: string): boolean {
  const customer = state.masterStats?.customers.find((item) => item.name === name.trim());
  if (!customer) return false;
  state.invoiceForm.customerCode = customer.code;
  state.invoiceForm.customerName = customer.name;
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
      return renderInvoiceEntry(
        state.invoiceForm,
        state.invoiceSavedDocNo,
        state.invoiceSaving,
        state.invoiceErrors
      );
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
      return state.jikomiView === "calendar"
        ? `${renderJikomi(state.jikomiList, state.jikomiView)}${renderJikomiCalendar(state.jikomiList)}`
        : renderJikomi(state.jikomiList, state.jikomiView);
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
    case "/import":
      return renderDataImport(state.importEntity, state.importPreview, state.importing, state.importResult);
    case "/print":
      return renderPrintCenter(state.printTemplate, state.printOptions, state.printCompany, state.printData);
    case "/form-designer":
      return renderFormDesigner(state.printData, state.printCompany, state.printOptions, state.fdSavedPositions, state.fdDesignMode);
    case "/map": {
      const mapCustomers: GeoCustomer[] = (state.masterStats?.customers ?? []).slice(0, 100).map((c, i) => ({
        ...c,
        lat: 35.37 + (i % 10) * 0.02 + Math.random() * 0.01,
        lng: 139.29 + (i % 10) * 0.02 + Math.random() * 0.01,
        address1: ["神奈川県秦野市", "東京都新宿区", "横浜市西区", "川崎市幸区"][i % 4],
        businessType: ["酒店", "飲食店", "百貨店", "スーパー"][i % 4],
        lastOrderAmount: 50000 + (i % 10) * 20000
      }));
      return renderCustomerMap(mapCustomers, state.mapRegionFilter);
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
        <div class="view ${state.actionLoading ? "is-busy" : ""}">${renderView()}</div>
      </main>
      ${pickerHtml}
      ${globalSearchHtml}
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
      .then((user) => {
        state.user = user;
        state.authSkipped = false;
        state.authSubmitting = false;
        state.authError = null;
        renderApp();
      })
      .catch(async (error) => {
        try {
          const user = await signUp(email, password);
          state.user = user;
          state.authSkipped = false;
          state.authError = null;
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
    const selectHandler = () => {
      const code = row.dataset.code ?? "";
      const name = row.dataset.name ?? "";

      if (state.pickerMode === "customer") {
        state.invoiceForm.customerCode = code;
        state.invoiceForm.customerName = name;
        delete state.invoiceErrors.customerCode;
      } else if (state.pickerMode === "product" && state.pickerTargetLine !== null) {
        const line = state.invoiceForm.lines[state.pickerTargetLine];
        if (line) {
          line.productCode = code;
          line.productName = name;
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

  root.querySelector<HTMLInputElement>("#inv-customer-code")?.addEventListener("blur", () => {
    collectInvoiceFormFromDom(root);
    if (tryAutofillCustomerByCode(state.invoiceForm.customerCode)) {
      delete state.invoiceErrors.customerCode;
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
      alert("下書き保存しました（Supabase tax_declarationsに保存）");
    } catch (e) {
      alert("保存に失敗: " + (e instanceof Error ? e.message : String(e)));
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
      alert("CSVファイルを選択してください");
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
      alert("印刷設定を保存しました（次回以降も使えます）");
    } catch (e) {
      alert("保存失敗: " + (e instanceof Error ? e.message : String(e)));
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
        alert(`☁️ クラウド保存成功: ${name}`);
        state.fdSavedPositions = positions;
        localStorage.setItem("sake_fd_positions", JSON.stringify(positions));
        renderApp();
      } else {
        alert("保存に失敗しました。ローカルには保存されました。");
        localStorage.setItem("sake_fd_positions", JSON.stringify(positions));
      }
    } catch (e) {
      alert("保存エラー: " + (e instanceof Error ? e.message : ""));
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
      alert(`📁 このPCに保存: ${Object.keys(positions).length}件`);
    } catch (e) {
      alert("保存失敗: " + (e instanceof Error ? e.message : ""));
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
      alert(`📥 インポート成功: ${Object.keys(positions).length}件`);
      renderApp();
    } catch (err) {
      alert("インポート失敗: " + (err instanceof Error ? err.message : ""));
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
            alert(`読込完了: ${layout.name}`);
            renderApp();
          });
        });
        // 削除ハンドラ
        savedLayoutsDiv.querySelectorAll<HTMLButtonElement>("[data-action='fd-delete-layout']").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const id = btn.dataset.layoutId;
            if (!id || !confirm("このレイアウトを削除しますか？")) return;
            const { deletePrintLayout } = await import("./api");
            const ok = await deletePrintLayout(id);
            if (ok) {
              alert("削除しました");
              renderApp();
            } else alert("削除失敗");
          });
        });
      }
    })();
  }

  root.querySelector<HTMLButtonElement>("[data-action='fd-reset-positions']")?.addEventListener("click", () => {
    if (!confirm("フィールド位置を初期値に戻しますか？")) return;
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
    alert("返信メールを下書き保存し、ステータスを確定にしました（実送信はSupabase連携で実装）");
    renderApp();
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
      alert("保存しました");
      renderApp();
    } else alert("保存失敗");
  });

  // Shopify同期
  root.querySelectorAll<HTMLButtonElement>("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const setting = state.integrations.find((i) => i.provider === "shopify");
      if (!setting) {
        alert("Shopify連携が未設定です");
        return;
      }
      btn.textContent = "同期中…";
      (btn as HTMLButtonElement).disabled = true;
      const { syncShopifyOrders, fetchShopifyOrders } = await import("./api");
      const result = await syncShopifyOrders(setting);
      if (result.error) {
        alert("同期失敗: " + result.error);
      } else {
        alert(`${result.count}件を同期しました`);
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
      if (result.error) alert("同期失敗: " + result.error);
      else {
        alert(`${result.count}件を同期しました`);
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
      alert("FAX画像を選択してください");
      return;
    }
    const setting = state.integrations.find((i) => i.provider === "cloud_vision");
    if (!setting || !setting.config["api_key"]) {
      alert("Cloud Vision API Key が設定されていません (/integrations で設定してください)");
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
      alert("OCR失敗: " + (e instanceof Error ? e.message : ""));
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
      alert("名前とメールアドレスは必須です");
      return;
    }
    const { saveMailSender, fetchMailSenders } = await import("./api");
    const saved = await saveMailSender(sender);
    if (saved) {
      state.mailSenders = await fetchMailSenders();
      state.mailSenderEditingId = null;
      alert("保存しました");
      renderApp();
    } else {
      alert("保存に失敗しました");
    }
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action='ms-delete']").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!confirm("削除しますか？")) return;
      const id = btn.dataset.id ?? "";
      const { deleteMailSender, fetchMailSenders } = await import("./api");
      const ok = await deleteMailSender(id);
      if (ok) {
        state.mailSenders = await fetchMailSenders();
        renderApp();
      } else alert("削除失敗");
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
      alert("タイトルは必須です");
      return;
    }
    const saved = await saveCalendarEvent(ev);
    if (saved) {
      state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
      state.calendarEdit = null;
      renderApp();
    } else alert("保存失敗");
  });
  root.querySelector<HTMLButtonElement>("[data-action='cal-delete']")?.addEventListener("click", async () => {
    const id = (document.querySelector<HTMLButtonElement>("[data-action='cal-delete']")?.dataset.id) ?? "";
    if (!id || !confirm("削除しますか？")) return;
    const { deleteCalendarEvent, fetchCalendarEvents } = await import("./api");
    const ok = await deleteCalendarEvent(id);
    if (ok) {
      state.calendarEvents = await fetchCalendarEvents(state.calendarYearMonth);
      state.calendarEdit = null;
      renderApp();
    } else alert("削除失敗");
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
        window.alert(`${result.sent}件送信完了`);
      })
      .catch(async () => {
        await saveEmailCampaign(buildEmailCampaignPayload("draft"));
        state.emailSaveMessage = "APIキー未設定のため下書きを保存しました。";
        state.actionLoading = false;
        state.emailSending = false;
        renderApp();
        window.alert("APIキー未設定のため下書き保存しました");
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

let mapInstance: { setView: (latlng: [number, number], zoom: number) => unknown; remove: () => void } | null = null;
function initCustomerMap(container: HTMLElement) {
  const Lref = (window as unknown as { L?: typeof L }).L;
  if (!Lref) {
    container.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-secondary);">Leaflet読込中…</div>';
    setTimeout(() => initCustomerMap(container), 500);
    return;
  }
  if (mapInstance) {
    try {
      mapInstance.remove();
    } catch {
      // ignore
    }
    mapInstance = null;
  }
  container.innerHTML = "";
  const m = Lref.map(container) as { setView: (l: [number, number], z: number) => unknown; remove: () => void; addLayer?: (layer: unknown) => unknown };
  m.setView([35.378, 139.295], 11); // 秦野市中心
  const tile = Lref.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19
  }) as { addTo: (m: unknown) => unknown };
  tile.addTo(m);

  // ダミー顧客のマーカー配置
  const customers = state.masterStats?.customers ?? [];
  customers.slice(0, 50).forEach((c, i) => {
    const lat = 35.37 + (i % 10) * 0.02 + (Math.random() - 0.5) * 0.01;
    const lng = 139.29 + Math.floor(i / 10) * 0.04 + (Math.random() - 0.5) * 0.02;
    const marker = (Lref.marker([lat, lng]) as { addTo: (m: unknown) => unknown; bindPopup: (h: string) => unknown }).addTo(m);
    marker.bindPopup(`<strong>${c.name}</strong><br/><span style="color:#666;">${c.code}</span>`);
  });
  mapInstance = m as typeof mapInstance;
}

void loadData();
