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
  | "/email";

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
  { path: "/setup", title: "連動設定" }
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
    sending: state.emailSending
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

  root.querySelector<HTMLButtonElement>("[data-action='email-send']")?.addEventListener("click", () => {
    collectEmailFormFromDom(root);
    state.actionLoading = true;
    state.emailSending = true;
    renderApp();
    const campaign = buildEmailCampaignPayload("sent");

    void sendEmailCampaign(campaign)
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

void loadData();
