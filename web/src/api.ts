import { supabaseCount, supabaseInsert, supabaseQuery, supabaseRpc, supabaseUpdate } from "./supabase";
import type { TourInquiry } from "./components/BreweryTour";
export type { TourInquiry };

export type PipelineStatus = "success" | "warning" | "error" | "running";
export type PaymentState = "unpaid" | "partial" | "paid";
export type MasterTab = "customers" | "products";
export type AnalyticsTab = "products" | "customers";
export type EmailCampaignStatus = "draft" | "sent";

export interface EmailTemplate {
  id: "spring" | "summer" | "autumn" | "winter";
  season: string;
  subject: string;
  body: string;
}

export interface EmailCampaign {
  id?: string;
  subject: string;
  body: string;
  templateId: string;
  audienceMode: "all" | "area" | "history";
  audienceFilter: string;
  recipientCount: number;
  recipients?: string[];
  status: EmailCampaignStatus;
  createdAt?: string;
  updatedAt?: string;
}

export const SEASONAL_TEMPLATES: Record<EmailTemplate["id"], EmailTemplate> = {
  spring: {
    id: "spring",
    season: "春",
    subject: "新酒のご案内",
    body: `いつもお世話になっております。\n\n今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。\n\nご注文やご相談がございましたら、本メールへのご返信にてお知らせください。\n\n今後ともよろしくお願いいたします。`
  },
  summer: {
    id: "summer",
    season: "夏",
    subject: "夏の冷酒・リキュールのご案内",
    body: `いつもお世話になっております。\n\n夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。\n\nご希望の商品がございましたら、必要本数とあわせてご連絡ください。`
  },
  autumn: {
    id: "autumn",
    season: "秋",
    subject: "ひやおろしのご案内",
    body: `いつもお世話になっております。\n\n秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。\n\n導入をご検討の際は、お気軽にお問い合わせください。`
  },
  winter: {
    id: "winter",
    season: "冬",
    subject: "しぼりたて・にごり酒のご案内",
    body: `いつもお世話になっております。\n\n冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。\n\nご注文締切や納品希望日がございましたら、あわせてお知らせください。`
  }
};

export interface SalesDayPoint {
  date: string;
  amount: number;
  bottles: number;
  volumeMl: number;
  pricePerBottle: number;
  pricePerLiter: number;
}

export type SalesPeriod = "today" | "month" | "90days" | "year" | "all" | "custom";

export interface SalesRecord {
  id: string;
  documentNo: string;
  date: string;
  customerCode: string;
  customerName: string;
  amount: number;
}

export interface InvoiceFilter {
  documentNo: string;
  startDate: string;
  endDate: string;
  customerCode: string;
}

export interface InvoiceRecord {
  id: string;
  documentNo: string;
  date: string;
  customerCode: string;
  customerName: string;
  itemCount: number;
  amount: number;
}

export interface SalesSummary {
  generatedAt: string;
  kpis: {
    todaySales: number;
    todayDelta: number;
    monthSales: number;
    monthDelta: number;
    unpaidCount: number;
    unpaidAmount: number;
  };
  dailySales: SalesDayPoint[];
  allDailySales: SalesDayPoint[];
  salesRecords: SalesRecord[];
}

export interface PaymentRecord {
  id: string;
  customerCode: string;
  customerName: string;
  billedAmount: number;
  paymentAmount: number;
  balanceAmount: number;
  lastPaymentDate: string | null;
  status: PaymentState;
}

export interface PaymentStatusSummary {
  generatedAt: string;
  records: PaymentRecord[];
}

export interface MasterCustomer {
  id: string;
  code: string;
  name: string;
  kanaName: string;
  shortName: string;
  postalCode: string;
  address1: string;
  address2: string;
  phone: string;
  fax: string;
  staffCode: string;
  businessType: string;
  areaCode: string;
  closingDay: number;
  paymentDay: number;
  billingCycleType: string;
  priceGroup: string;
  isActive: boolean;
  lat?: number;
  lng?: number;
  address1?: string;
  businessType?: string;
  phone?: string;
}

export interface MasterProduct {
  id: string;
  code: string;
  janCode: string;
  name: string;
  category: string;
  isActive: boolean;
  purchasePrice: number;
  salePrice: number;
  alcoholDegree: number | null;
  volumeMl: number | null;
  bottleType: string;
  polishRate: number | null;
}

export interface MasterStatsSummary {
  generatedAt: string;
  summary: {
    customerCount: number;
    activeCustomerCount: number;
    productCount: number;
    activeProductCount: number;
  };
  customers: MasterCustomer[];
  products: MasterProduct[];
}

export interface PipelineMeta {
  generatedAt: string;
  lastSyncAt: string;
  status: PipelineStatus;
  jobName: string;
  message: string;
}

export interface LedgerSalesEntry {
  id: string;
  date: string;
  documentNo: string;
  amount: number;
}

export interface LedgerPaymentEntry {
  id: string;
  date: string;
  amount: number;
  method: string;
}

export interface CustomerLedger {
  customerCode: string;
  customerName: string;
  balanceAmount: number;
  salesTotal: number;
  paymentTotal: number;
  salesHistory: LedgerSalesEntry[];
  paymentHistory: LedgerPaymentEntry[];
}

export interface AnalyticsMonthlyPoint {
  month: string;
  amount: number;
}

export interface AnalyticsBreakdownRow {
  code: string;
  name: string;
  amount: number;
  quantity: number;
  documents: number;
}

export interface SalesAnalytics {
  generatedAt: string;
  monthlySales: AnalyticsMonthlyPoint[];
  productTotals: AnalyticsBreakdownRow[];
  customerTotals: AnalyticsBreakdownRow[];
}

interface DailySalesFactRow {
  sales_date: string;
  sales_amount: number | string | null;
  document_count: number | string | null;
  bottles: number | string | null;
  volume_ml: number | string | null;
  price_per_bottle: number | string | null;
  price_per_liter: number | string | null;
}

interface CustomerPaymentStatusRow {
  legacy_customer_code: string | null;
  billed_amount: number | string | null;
  paid_amount: number | string | null;
  balance_amount: number | string | null;
  payment_status: string | null;
}

interface SalesDocumentHeaderRow {
  id?: string | number | null;
  document_no?: string | null;
  legacy_document_no?: string | null;
  sales_date?: string | null;
  document_date?: string | null;
  customer_code?: string | null;
  legacy_customer_code?: string | null;
  customer_name?: string | null;
  billed_amount?: number | string | null;
  total_amount?: number | string | null;
}

interface SalesDocumentLineRow {
  id?: string | number | null;
  header_id?: string | number | null;
  document_header_id?: string | number | null;
  document_no?: string | null;
  product_code?: string | null;
  legacy_product_code?: string | null;
  product_name?: string | null;
  quantity?: number | string | null;
  amount?: number | string | null;
  line_amount?: number | string | null;
}

interface CustomerPaymentRow {
  id?: string | number | null;
  customer_code?: string | null;
  legacy_customer_code?: string | null;
  payment_date?: string | null;
  received_date?: string | null;
  amount?: number | string | null;
  payment_amount?: number | string | null;
  method?: string | null;
  payment_method?: string | null;
}

type LooseRow = Record<string, unknown>;

const mockSalesSummary: SalesSummary = {
  generatedAt: new Date().toISOString(),
  kpis: { todaySales: 0, todayDelta: 0, monthSales: 0, monthDelta: 0, unpaidCount: 0, unpaidAmount: 0 },
  dailySales: [],
  allDailySales: [],
  salesRecords: []
};

const mockPaymentStatus: PaymentStatusSummary = {
  generatedAt: new Date().toISOString(),
  records: []
};

const mockMasterStats: MasterStatsSummary = {
  generatedAt: new Date().toISOString(),
  summary: { customerCount: 0, activeCustomerCount: 0, productCount: 0, activeProductCount: 0 },
  customers: [],
  products: []
};

const mockPipelineMeta: PipelineMeta = {
  generatedAt: new Date().toISOString(),
  lastSyncAt: new Date().toISOString(),
  status: "success",
  jobName: "sake-relay",
  message: "データ未取得"
};

const mockInvoiceRecords: InvoiceRecord[] = [];

const mockLedgerData: Record<string, CustomerLedger> = {};

const mockSalesAnalytics: SalesAnalytics = {
  generatedAt: new Date().toISOString(),
  monthlySales: [],
  productTotals: [],
  customerTotals: []
};

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function mapPaymentState(value: string | null | undefined): PaymentState {
  switch ((value ?? "").toLowerCase()) {
    case "paid":
    case "complete":
    case "completed":
      return "paid";
    case "partial":
    case "partially_paid":
    case "partially paid":
      return "partial";
    default:
      return "unpaid";
  }
}

function isTruthyFlag(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  if (typeof value === "string") {
    return ["true", "1", "active", "enabled", "yes", "y"].includes(value.toLowerCase());
  }
  return false;
}

function getString(row: LooseRow, keys: string[], fallback = ""): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return fallback;
}

function getNumber(row: LooseRow, keys: string[], fallback = 0): number {
  for (const key of keys) {
    if (key in row) {
      return toNumber(row[key]);
    }
  }
  return fallback;
}

function getBoolean(row: LooseRow, keys: string[], fallback = true): boolean {
  for (const key of keys) {
    if (key in row) {
      return isTruthyFlag(row[key]);
    }
  }
  return fallback;
}

function getDateString(row: LooseRow, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value !== "string" || value.length === 0) {
      continue;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return new Date(`${value}T00:00:00Z`).toISOString();
    }
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }
  return fallback;
}

function formatMonthKey(value: string): string {
  return value.slice(0, 7);
}

function createInvoiceRecordFromHeader(row: SalesDocumentHeaderRow, index: number): InvoiceRecord {
  return {
    id: String(row.id ?? `invoice-${index + 1}`),
    documentNo:
      row.document_no ?? row.legacy_document_no ?? `D${String(240100 + index).padStart(6, "0")}`,
    date: getDateString(row as LooseRow, ["sales_date", "document_date"], new Date().toISOString()),
    customerCode:
      row.customer_code ?? row.legacy_customer_code ?? `C${String(index + 1).padStart(4, "0")}`,
    customerName: row.customer_name ?? row.customer_code ?? row.legacy_customer_code ?? "不明",
    itemCount: 0,
    amount: toNumber(row.total_amount ?? row.billed_amount)
  };
}

function applyInvoiceFilter(records: InvoiceRecord[], filter: InvoiceFilter): InvoiceRecord[] {
  const start = filter.startDate ? new Date(`${filter.startDate}T00:00:00`) : null;
  const end = filter.endDate ? new Date(`${filter.endDate}T23:59:59`) : null;
  const documentNo = filter.documentNo.trim().toLowerCase();
  const customerCode = filter.customerCode.trim().toLowerCase();

  return records
    .filter((record) => {
      const recordDate = new Date(record.date);
      if (start && recordDate < start) {
        return false;
      }
      if (end && recordDate > end) {
        return false;
      }
      if (documentNo && !record.documentNo.toLowerCase().includes(documentNo)) {
        return false;
      }
      if (customerCode && !record.customerCode.toLowerCase().includes(customerCode)) {
        return false;
      }
      return true;
    })
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());
}

function buildMockLedger(code: string): CustomerLedger {
  const normalizedCode = code.trim().toUpperCase();
  const directLedger = mockLedgerData[normalizedCode];
  if (directLedger) {
    return directLedger;
  }

  const record = mockSalesSummary.salesRecords.find(
    (item) => item.customerCode.toUpperCase() === normalizedCode
  );

  return {
    customerCode: normalizedCode || "未指定",
    customerName: record?.customerName ?? "該当得意先なし",
    balanceAmount: 0,
    salesTotal: 0,
    paymentTotal: 0,
    salesHistory: [],
    paymentHistory: []
  };
}

function aggregateMockAnalytics(): SalesAnalytics {
  const monthlyMap = new Map<string, number>();
  const customerMap = new Map<string, AnalyticsBreakdownRow>();
  const productMap = new Map<string, AnalyticsBreakdownRow>();

  mockInvoiceRecords.forEach((record, index) => {
    const month = formatMonthKey(record.date);
    monthlyMap.set(month, (monthlyMap.get(month) ?? 0) + record.amount);

    const customerEntry = customerMap.get(record.customerCode) ?? {
      code: record.customerCode,
      name: record.customerName,
      amount: 0,
      quantity: 0,
      documents: 0
    };
    customerEntry.amount += record.amount;
    customerEntry.quantity += record.itemCount;
    customerEntry.documents += 1;
    customerMap.set(record.customerCode, customerEntry);

    const productCode = `P${String((index % 4) + 1).padStart(5, "0")}`;
    const defaultProduct =
      mockSalesAnalytics.productTotals[index % mockSalesAnalytics.productTotals.length];
    const productEntry = productMap.get(productCode) ?? {
      code: productCode,
      name: defaultProduct?.name ?? `商品${index + 1}`,
      amount: 0,
      quantity: 0,
      documents: 0
    };
    productEntry.amount += record.amount;
    productEntry.quantity += record.itemCount * 12;
    productEntry.documents += 1;
    productMap.set(productCode, productEntry);
  });

  return {
    generatedAt: new Date().toISOString(),
    monthlySales: Array.from(monthlyMap.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([month, amount]) => ({ month, amount })),
    productTotals: Array.from(productMap.values()).sort(
      (left, right) => right.amount - left.amount
    ),
    customerTotals: Array.from(customerMap.values()).sort(
      (left, right) => right.amount - left.amount
    )
  };
}

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}${path}`, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`Failed to fetch ${path}, using fallback data`, error);
    return fallback;
  }
}

export async function fetchSalesSummary(): Promise<SalesSummary> {
  const salesRows = await supabaseQuery<DailySalesFactRow>("daily_sales_detail", {
    select: "sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",
    order: "sales_date.desc",
    limit: "3000"
  });

  if (salesRows.length > 0) {
    const [paymentRows, headerRows] = await Promise.all([
      supabaseQuery<CustomerPaymentStatusRow>("customer_payment_status", {
        select: "legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"
      }),
      supabaseQuery<SalesDocumentHeaderRow>("sales_document_headers", {
        select: "id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",
        order: "sales_date.desc",
        limit: "20"
      })
    ]);

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const monthKey = todayKey.slice(0, 7);
    const allDailySales = [...salesRows]
      .sort((left, right) => left.sales_date.localeCompare(right.sales_date))
      .map((row) => ({
        date: new Date(`${row.sales_date}T00:00:00Z`).toISOString(),
        amount: toNumber((row as Record<string, unknown>).amount ?? row.sales_amount),
        bottles: toNumber(row.bottles),
        volumeMl: toNumber(row.volume_ml),
        pricePerBottle: toNumber(row.price_per_bottle),
        pricePerLiter: toNumber(row.price_per_liter)
      }));
    const recentDailySales = allDailySales.slice(-30);

    const toAmt = (row: DailySalesFactRow) => toNumber((row as Record<string, unknown>).amount ?? row.sales_amount);
    const todaySales = salesRows.reduce((sum, row) => {
      return row.sales_date === todayKey ? sum + toAmt(row) : sum;
    }, 0);
    const monthSales = salesRows.reduce((sum, row) => {
      return row.sales_date.startsWith(monthKey) ? sum + toAmt(row) : sum;
    }, 0);
    const unpaidRows = paymentRows.filter((row) => toNumber(row.balance_amount) > 0);

    const salesRecords: SalesRecord[] = headerRows.map((row, index) => ({
      id: String(row.id ?? `sale-${index + 1}`),
      documentNo: row.document_no ?? row.legacy_document_no ?? "",
      date: row.sales_date ?? "",
      customerCode: row.legacy_customer_code ?? "",
      customerName: row.customer_name ?? row.legacy_customer_code ?? "",
      amount: toNumber(row.total_amount)
    }));

    return {
      generatedAt: new Date().toISOString(),
      kpis: {
        todaySales,
        todayDelta: 0,
        monthSales,
        monthDelta: 0,
        unpaidCount: unpaidRows.length,
        unpaidAmount: unpaidRows.reduce((sum, row) => sum + toNumber(row.balance_amount), 0)
      },
      dailySales: recentDailySales,
      allDailySales,
      salesRecords
    };
  }

  return fetchJson("data/api/latest/sales-summary.json", mockSalesSummary);
}

export async function fetchPaymentStatus(): Promise<PaymentStatusSummary> {
  const rows = await supabaseQuery<CustomerPaymentStatusRow>("customer_payment_status", {
    select: "legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"
  });

  if (rows.length > 0) {
    return {
      generatedAt: new Date().toISOString(),
      records: rows.map((row, index) => {
        const customerCode = row.legacy_customer_code ?? `UNKNOWN-${index + 1}`;
        return {
          id: `payment-${customerCode}-${index + 1}`,
          customerCode,
          customerName: customerCode,
          billedAmount: toNumber(row.billed_amount),
          paymentAmount: toNumber(row.paid_amount),
          balanceAmount: toNumber(row.balance_amount),
          lastPaymentDate: null,
          status: mapPaymentState(row.payment_status)
        };
      })
    };
  }

  return fetchJson("data/api/latest/payment-status.json", mockPaymentStatus);
}

export async function fetchMasterStats(): Promise<MasterStatsSummary> {
  const [customerRows, productRows] = await Promise.all([
    supabaseQuery<LooseRow>("customers"),
    supabaseQuery<LooseRow>("products")
  ]);

  if (customerRows.length > 0 || productRows.length > 0) {
    const customers = customerRows.length
      ? customerRows.map((row, index) => {
          const memo = typeof row.memo === "string" ? JSON.parse(row.memo || "{}") : (row.memo ?? {});
          return {
            id: getString(row, ["id", "customer_id", "code"], `customer-${index + 1}`),
            code: getString(
              row,
              ["code", "customer_code", "legacy_customer_code"],
              `C${String(index + 1).padStart(4, "0")}`
            ),
            name: getString(row, ["name", "customer_name", "display_name"], `Customer ${index + 1}`),
            kanaName: getString(row, ["kana_name"], ""),
            shortName: getString(row, ["short_name"], ""),
            postalCode: getString(row, ["postal_code"], ""),
            address1: getString(row, ["address1"], ""),
            address2: getString(row, ["address2"], ""),
            phone: getString(row, ["phone"], ""),
            fax: getString(row, ["fax"], ""),
            staffCode: getString(row, ["staff_code"], ""),
            businessType: getString(row, ["business_type"], ""),
            areaCode: getString(row, ["delivery_area_code"], ""),
            closingDay: getNumber(row, ["closing_day", "close_day"], 31),
            paymentDay: getNumber(row, ["payment_day", "due_day"], 15),
            billingCycleType: getString(row, ["billing_cycle_type"], ""),
            priceGroup: String(memo.price_group ?? ""),
            isActive: getBoolean(row, ["is_active", "active", "enabled"], true),
            lat: row["lat"] ? Number(row["lat"]) : undefined,
            lng: row["lng"] ? Number(row["lng"]) : undefined
          };
        })
      : mockMasterStats.customers;

    const products = productRows.length
      ? productRows.map((row, index) => ({
          id: getString(row, ["id", "product_id", "code"], `product-${index + 1}`),
          code: getString(row, ["code", "product_code", "legacy_product_code"], `P${String(index + 1).padStart(5, "0")}`),
          janCode: getString(row, ["jan_code", "jan", "barcode"], ""),
          name: getString(row, ["name", "product_name", "display_name"], `Product ${index + 1}`),
          category: getString(row, ["category", "category_name", "category_code"], "未分類"),
          isActive: getBoolean(row, ["is_active", "active", "enabled"], true),
          purchasePrice: getNumber(row, ["purchase_price"], 0),
          salePrice: getNumber(row, ["default_sale_price", "sale_price"], 0),
          alcoholDegree: row["alcohol_degree"] != null ? Number(row["alcohol_degree"]) : null,
          volumeMl: row["volume_ml"] != null ? Number(row["volume_ml"]) : null,
          bottleType: getString(row, ["bottle_type"], ""),
          polishRate: row["polish_rate"] != null ? Number(row["polish_rate"]) : null
        }))
      : mockMasterStats.products;

    return {
      generatedAt: new Date().toISOString(),
      summary: {
        customerCount: customerRows.length || mockMasterStats.summary.customerCount,
        activeCustomerCount: customerRows.length
          ? customers.filter((customer) => customer.isActive).length
          : mockMasterStats.summary.activeCustomerCount,
        productCount: productRows.length || mockMasterStats.summary.productCount,
        activeProductCount: productRows.length
          ? products.filter((product) => product.isActive).length
          : mockMasterStats.summary.activeProductCount
      },
      customers,
      products
    };
  }

  return fetchJson("data/api/latest/master-stats.json", mockMasterStats);
}

export function fetchPipelineMeta(): Promise<PipelineMeta> {
  return fetchJson("data/api/latest/pipeline-meta.json", mockPipelineMeta);
}

// ── 同期ダッシュボード ──────────────────────────────────

export interface SyncTableStatus {
  tableName: string;
  displayName: string;
  rowCount: number;
  lastSyncAt: string | null;
  tableType: "raw" | "normalized";
}

export interface SyncDashboard {
  tables: SyncTableStatus[];
  totalRawRecords: number;
  totalNormalizedRecords: number;
  lastOverallSync: string | null;
}

interface SyncSummaryRpc {
  total_raw_records: number;
  total_normalized_records: number;
  tables: Array<{
    name: string;
    display_name: string;
    count: number;
    last_sync: string | null;
    type: "raw" | "normalized";
  }>;
  overall_freshness: string | null;
  generated_at: string;
}

export async function fetchSyncDashboard(): Promise<SyncDashboard> {
  const rpcResult = await supabaseRpc<SyncSummaryRpc>("get_sync_summary");

  if (rpcResult && rpcResult.tables) {
    return {
      tables: rpcResult.tables.map((t) => ({
        tableName: t.name,
        displayName: t.display_name,
        rowCount: t.count,
        lastSyncAt: t.last_sync,
        tableType: t.type
      })),
      totalRawRecords: rpcResult.total_raw_records,
      totalNormalizedRecords: rpcResult.total_normalized_records,
      lastOverallSync: rpcResult.overall_freshness
    };
  }

  return {
    tables: [],
    totalRawRecords: 0,
    totalNormalizedRecords: 0,
    lastOverallSync: null
  };
}

export async function fetchInvoices(filter: InvoiceFilter): Promise<InvoiceRecord[]> {
  const [headerRows, lineRows] = await Promise.all([
    supabaseQuery<SalesDocumentHeaderRow>("sales_document_headers", {
      select:
        "id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",
      order: "sales_date.desc",
      limit: "200"
    }),
    supabaseQuery<SalesDocumentLineRow>("sales_document_lines", {
      select: "id,header_id,document_header_id,document_no,amount,line_amount"
    })
  ]);

  if (headerRows.length > 0) {
    const lineCountByHeader = new Map<string, number>();
    lineRows.forEach((row) => {
      const key = String(
        row.header_id ?? row.document_header_id ?? row.document_no ?? row.id ?? ""
      );
      if (!key) {
        return;
      }
      lineCountByHeader.set(key, (lineCountByHeader.get(key) ?? 0) + 1);
    });

    const records = headerRows.map((row, index) => {
      const invoice = createInvoiceRecordFromHeader(row, index);
      const lineKey = String(row.id ?? row.document_no ?? row.legacy_document_no ?? "");
      return {
        ...invoice,
        itemCount: lineCountByHeader.get(lineKey) ?? invoice.itemCount
      };
    });
    return applyInvoiceFilter(records, filter);
  }

  return applyInvoiceFilter(mockInvoiceRecords, filter);
}

export async function fetchCustomerLedger(code: string): Promise<CustomerLedger> {
  const normalizedCode = code.trim().toUpperCase();
  if (!normalizedCode) {
    return buildMockLedger("");
  }

  const [invoiceRows, paymentRows, balanceRows] = await Promise.all([
    supabaseQuery<SalesDocumentHeaderRow>("sales_document_headers", {
      select:
        "id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",
      or: `customer_code.eq.${normalizedCode},legacy_customer_code.eq.${normalizedCode}`,
      order: "sales_date.desc",
      limit: "50"
    }),
    supabaseQuery<CustomerPaymentRow>("customer_payments", {
      select:
        "id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",
      or: `customer_code.eq.${normalizedCode},legacy_customer_code.eq.${normalizedCode}`,
      order: "payment_date.desc",
      limit: "50"
    }),
    supabaseQuery<CustomerPaymentStatusRow>("customer_payment_status", {
      select: "legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"
    })
  ]);

  if (invoiceRows.length > 0 || paymentRows.length > 0) {
    const salesHistory = invoiceRows.map((row, index) => {
      const invoice = createInvoiceRecordFromHeader(row, index);
      return {
        id: invoice.id,
        date: invoice.date,
        documentNo: invoice.documentNo,
        amount: invoice.amount
      };
    });
    const paymentHistory = paymentRows.map((row, index) => ({
      id: String(row.id ?? `payment-${index + 1}`),
      date: getDateString(
        row as LooseRow,
        ["payment_date", "received_date"],
        new Date().toISOString()
      ),
      amount: toNumber(row.payment_amount ?? row.amount),
      method: row.payment_method ?? row.method ?? "入金"
    }));
    const balanceRow = balanceRows.find(
      (row) => (row.legacy_customer_code ?? "").toUpperCase() === normalizedCode
    );

    return {
      customerCode: normalizedCode,
      customerName:
        invoiceRows[0]?.customer_name ??
        invoiceRows[0]?.customer_code ??
        invoiceRows[0]?.legacy_customer_code ??
        normalizedCode,
      balanceAmount: toNumber(balanceRow?.balance_amount),
      salesTotal: salesHistory.reduce((sum, entry) => sum + entry.amount, 0),
      paymentTotal: paymentHistory.reduce((sum, entry) => sum + entry.amount, 0),
      salesHistory,
      paymentHistory
    };
  }

  return buildMockLedger(normalizedCode);
}

export async function fetchSalesAnalytics(): Promise<SalesAnalytics> {
  const [dailyRows, invoiceRows, lineRows] = await Promise.all([
    supabaseQuery<DailySalesFactRow>("daily_sales_detail", {
      select: "sales_date,amount,bottles,volume_ml,price_per_bottle,price_per_liter",
      order: "sales_date.asc",
      limit: "365"
    }),
    supabaseQuery<SalesDocumentHeaderRow>("sales_document_headers", {
      select:
        "id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",
      limit: "500"
    }),
    supabaseQuery<SalesDocumentLineRow>("sales_document_lines", {
      select:
        "id,header_id,document_header_id,document_no,product_code,legacy_product_code,product_name,quantity,amount,line_amount",
      limit: "1000"
    })
  ]);

  if (dailyRows.length > 0) {
    const monthlyMap = new Map<string, number>();
    dailyRows.forEach((row) => {
      const month = formatMonthKey(row.sales_date);
      monthlyMap.set(month, (monthlyMap.get(month) ?? 0) + toNumber(row.sales_amount));
    });

    const customerMap = new Map<string, AnalyticsBreakdownRow>();
    invoiceRows.forEach((row, index) => {
      const invoice = createInvoiceRecordFromHeader(row, index);
      const entry = customerMap.get(invoice.customerCode) ?? {
        code: invoice.customerCode,
        name: invoice.customerName,
        amount: 0,
        quantity: 0,
        documents: 0
      };
      entry.amount += invoice.amount;
      entry.documents += 1;
      customerMap.set(invoice.customerCode, entry);
    });

    const productMap = new Map<string, AnalyticsBreakdownRow>();
    lineRows.forEach((row, index) => {
      const productCode =
        row.product_code ?? row.legacy_product_code ?? `P${String(index + 1).padStart(5, "0")}`;
      const entry = productMap.get(productCode) ?? {
        code: productCode,
        name: row.product_name ?? productCode,
        amount: 0,
        quantity: 0,
        documents: 0
      };
      entry.amount += toNumber(row.line_amount ?? row.amount);
      entry.quantity += toNumber(row.quantity);
      entry.documents += 1;
      productMap.set(productCode, entry);
    });

    return {
      generatedAt: new Date().toISOString(),
      monthlySales: Array.from(monthlyMap.entries())
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([month, amount]) => ({ month, amount }))
        .slice(-12),
      productTotals:
        productMap.size > 0
          ? Array.from(productMap.values()).sort((left, right) => right.amount - left.amount)
          : mockSalesAnalytics.productTotals,
      customerTotals:
        customerMap.size > 0
          ? Array.from(customerMap.values()).sort((left, right) => right.amount - left.amount)
          : mockSalesAnalytics.customerTotals
    };
  }

  return aggregateMockAnalytics();
}

// ─── 伝票入力 ────────────────────────────────────────────────────────────────

export type InvoiceType = "sales" | "return" | "export_return";

export const INVOICE_TYPE_LABELS: Record<InvoiceType, string> = {
  sales: "売上",
  return: "返品",
  export_return: "輸出戻入"
};

export interface NewInvoiceLine {
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  unit: string;
  amount: number;
}

export interface InvoiceFormData {
  invoiceType: InvoiceType;
  invoiceDate: string;
  customerCode: string;
  customerName: string;
  staffCode: string;
  lines: NewInvoiceLine[];
  note: string;
}

export interface SavedInvoice {
  id: string;
  documentNo: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export async function saveInvoice(form: InvoiceFormData): Promise<SavedInvoice> {
  const totalAmount = form.lines.reduce((sum, l) => sum + l.amount, 0);
  const docNo = `D${Date.now().toString().slice(-6)}`;
  const row = await supabaseInsert<{ id: string }>("sales_document_headers", {
    legacy_document_no: docNo,
    legacy_customer_code: form.customerCode,
    sales_date: form.invoiceDate,
    document_type: form.invoiceType,
    staff_code: form.staffCode,
    total_amount: totalAmount,
    status: "confirmed"
  });
  return {
    id: row?.id ?? `local-${docNo}`,
    documentNo: docNo,
    totalAmount,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };
}

// ─── 納品書 ──────────────────────────────────────────────────────────────────

export interface DeliveryNote {
  documentNo: string;
  invoiceDate: string;
  customerCode: string;
  customerName: string;
  customerAddress: string;
  lines: NewInvoiceLine[];
  totalAmount: number;
  taxAmount: number;
  note: string;
}

const mockDeliveryNote: DeliveryNote = {
  documentNo: "", salesDate: "", customerCode: "", customerName: "",
  customerAddress: "", deliveryAddress: "", lines: [], subtotal: 0,
  taxAmount: 0, totalAmount: 0, remarks: ""
};

export async function fetchDeliveryNote(documentNo: string): Promise<DeliveryNote> {
  const rows = await supabaseQuery<LooseRow>("sales_document_headers", {
    select: "*",
    legacy_document_no: `eq.${documentNo}`
  });
  if (rows.length > 0) {
    const row = rows[0];
    const total = toNumber(row["total_amount"]);
    return {
      documentNo,
      invoiceDate: getString(row, ["sales_date", "document_date"], ""),
      customerCode: getString(row, ["legacy_customer_code", "customer_code"], ""),
      customerName: getString(row, ["customer_name", "legacy_customer_code"], ""),
      customerAddress: "",
      lines: [],
      totalAmount: total,
      taxAmount: Math.floor((total * 10) / 110),
      note: ""
    };
  }
  return { ...mockDeliveryNote, documentNo: documentNo || mockDeliveryNote.documentNo };
}

// ─── 月次請求締め ─────────────────────────────────────────────────────────────

export interface BillingCustomer {
  customerCode: string;
  customerName: string;
  closingDay: number;
  salesAmount: number;
  taxAmount: number;
  prevBalance: number;
  paymentAmount: number;
  billingAmount: number;
  status: "open" | "closed";
}

export interface BillingSummary {
  targetYearMonth: string;
  closingDay: number;
  totalBilling: number;
  customers: BillingCustomer[];
}

const mockBilling: BillingSummary = {
  yearMonth: "", generatedAt: new Date().toISOString(), customers: []
};

export async function fetchBillingSummary(yearMonth: string): Promise<BillingSummary> {
  return fetchJson(`data/api/latest/billing-${yearMonth}.json`, { ...mockBilling, targetYearMonth: yearMonth });
}

// ─── 集計帳票・原価シミュレーション ───────────────────────────────────────────

export interface CostSimRow {
  productCode: string;
  productName: string;
  costPrice: number;
  sellPrice: number;
  margin: number;
  marginRate: number;
}

export interface SalesReport {
  generatedAt: string;
  months: string[];
  salesByProduct: { label: string; values: number[] }[];
  salesByCustomer: { label: string; values: number[] }[];
  costSimulation: CostSimRow[];
}

const MONTHS = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

const mockReport: SalesReport = {
  generatedAt: new Date().toISOString(), yearMonth: "",
  totalSales: 0, totalCost: 0, grossProfit: 0, grossMarginRate: 0,
  byProduct: [], byCustomer: [], byArea: []
};

export async function fetchSalesReport(): Promise<SalesReport> {
  return fetchJson("data/api/latest/sales-report.json", mockReport);
}

// ─── 機能要望 ────────────────────────────────────────────────────────────────

export async function submitFeatureRequest(title: string, category: string, description: string): Promise<boolean> {
  try {
    await supabaseInsert("feature_requests", { title, category, description });
    return true;
  } catch {
    return false;
  }
}

// ─── マスタ編集 ─────────────────────────────────────────────────────────────

export async function updateCustomer(id: string, data: Record<string, unknown>): Promise<boolean> {
  return supabaseUpdate("customers", id, data);
}

export async function updateProduct(id: string, data: Record<string, unknown>): Promise<boolean> {
  return supabaseUpdate("products", id, data);
}

// ─── 特価テーブル ───────────────────────────────────────────────────────────

export interface SpecialPrice {
  productCode: string;
  price: number;
}

export async function fetchSpecialPrices(priceGroup: string): Promise<SpecialPrice[]> {
  if (!priceGroup) return [];
  const rows = await supabaseQuery<{ legacy_product_code: string; special_price: number }>(
    "customer_product_prices",
    { price_group: `eq.${priceGroup}`, select: "legacy_product_code,special_price" }
  );
  return rows.map((r) => ({ productCode: r.legacy_product_code, price: r.special_price }));
}

export function getCustomerPriceGroup(customers: MasterCustomer[], customerCode: string): string {
  const c = customers.find((cust) => cust.code === customerCode);
  return c?.priceGroup || customerCode;
}

// ─── 得意先別集計・ABC分析 ──────────────────────────────────────────────────

export interface CustomerRankRow {
  code: string;
  name: string;
  amount: number;
  documents: number;
  ratio: number;
  cumRatio: number;
  abcRank: "A" | "B" | "C";
}

export interface CustomerAnalysisData {
  generatedAt: string;
  ranking: CustomerRankRow[];
  months: string[];
  monthlyByCustomer: { label: string; values: number[] }[];
}

export interface ProductRankRow {
  code: string;
  name: string;
  amount: number;
  quantity: number;
  ratio: number;
  cumRatio: number;
  abcRank: "A" | "B" | "C";
}

export interface ProductABCData {
  generatedAt: string;
  totalAmount: number;
  ranking: ProductRankRow[];
  months: string[];
  monthlyByProduct: { label: string; values: number[] }[];
}

function buildAbcRanking<T extends { amount: number }>(
  rows: T[]
): (T & { ratio: number; cumRatio: number; abcRank: "A" | "B" | "C" })[] {
  const sorted = [...rows].sort((a, b) => b.amount - a.amount);
  const total = sorted.reduce((s, r) => s + r.amount, 0);
  if (total === 0) return [];
  let cum = 0;
  return sorted.map((row) => {
    const ratio = (row.amount / total) * 100;
    cum += ratio;
    const abcRank: "A" | "B" | "C" = cum <= 70 ? "A" : cum <= 90 ? "B" : "C";
    return { ...row, ratio, cumRatio: cum, abcRank };
  });
}

export async function fetchCustomerAnalysis(): Promise<CustomerAnalysisData> {
  const [analytics, report] = await Promise.all([
    fetchSalesAnalytics(),
    fetchSalesReport()
  ]);

  const ranking = buildAbcRanking(
    analytics.customerTotals.map((c) => ({
      code: c.code,
      name: c.name,
      amount: c.amount,
      documents: c.documents
    }))
  );

  return {
    generatedAt: new Date().toISOString(),
    ranking,
    months: report.months,
    monthlyByCustomer: report.salesByCustomer
  };
}

export async function fetchProductABC(): Promise<ProductABCData> {
  const [analytics, report] = await Promise.all([
    fetchSalesAnalytics(),
    fetchSalesReport()
  ]);

  const ranking = buildAbcRanking(
    analytics.productTotals.map((p) => ({
      code: p.code,
      name: p.name,
      amount: p.amount,
      quantity: p.quantity
    }))
  );

  const totalAmount = ranking.reduce((s, r) => s + r.amount, 0);

  // Monthly data for A-rank products only
  const aRankNames = new Set(ranking.filter((r) => r.abcRank === "A").map((r) => r.name));
  const monthlyByProduct = report.salesByProduct.filter((p) => aRankNames.has(p.label));

  return {
    generatedAt: new Date().toISOString(),
    totalAmount,
    ranking,
    months: report.months,
    monthlyByProduct: monthlyByProduct.length > 0 ? monthlyByProduct : report.salesByProduct
  };
}

// ─── 蔵内管理 ────────────────────────────────────────────────────────────────

export type JikomiStatus = "planned" | "active" | "done";

export const JIKOMI_STATUS_LABELS: Record<JikomiStatus, string> = {
  planned: "計画中",
  active: "仕込中",
  done: "完了"
};

export interface JikomiRecord {
  id: string;
  jikomiNo: string;
  productName: string;
  riceType: string;
  plannedKg: number;
  actualKg: number;
  startDate: string;
  expectedDoneDate: string;
  status: JikomiStatus;
  tankNo: string;
  note: string;
}

const mockJikomi: JikomiRecord[] = [];

export async function fetchJikomiList(): Promise<JikomiRecord[]> {
  return fetchJson("data/api/latest/jikomi.json", mockJikomi);
}

export interface TankRecord {
  id: string;
  tankNo: string;
  capacity: number;
  currentVolume: number;
  productName: string;
  jikomiNo: string;
  status: "empty" | "in_use" | "aging";
  lastUpdated: string;
}

const mockTanks: TankRecord[] = [];

export async function fetchTankList(): Promise<TankRecord[]> {
  return fetchJson("data/api/latest/tanks.json", mockTanks);
}

export interface KenteiRecord {
  id: string;
  kenteiNo: string;
  jikomiNo: string;
  productName: string;
  kenteiDate: string;
  alcoholDegree: number;
  extractDegree: number;
  sakaMeterValue: number;
  volume: number;
  taxCategory: string;
  status: "pending" | "submitted" | "approved";
}

const mockKentei: KenteiRecord[] = [];

export async function fetchKenteiList(): Promise<KenteiRecord[]> {
  return fetchJson("data/api/latest/kentei.json", mockKentei);
}

export interface MaterialRecord {
  id: string;
  code: string;
  name: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  unitCost: number;
  lastUpdated: string;
}

const mockMaterials: MaterialRecord[] = [];

export async function fetchMaterialList(): Promise<MaterialRecord[]> {
  return fetchJson("data/api/latest/materials.json", mockMaterials);
}

// ─── 仕入・買掛管理 ───────────────────────────────────────────────────────────

export interface PurchaseRecord {
  id: string;
  documentNo: string;
  purchaseDate: string;
  supplierCode: string;
  supplierName: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  status: "pending" | "confirmed" | "paid";
}

const mockPurchases: PurchaseRecord[] = [];

export interface PayableRecord {
  supplierCode: string;
  supplierName: string;
  totalPurchase: number;
  paidAmount: number;
  balance: number;
  nextPaymentDate: string;
  status: "unpaid" | "partial" | "paid";
}

const mockPayables: PayableRecord[] = [];

export interface BillRecord {
  id: string;
  billNo: string;
  supplierName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "holding" | "due" | "cleared";
}

const mockBills: BillRecord[] = [];

export interface RawMaterialStock {
  code: string;
  name: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  lastPurchaseDate: string;
  unitCost: number;
}

const mockRawStock: RawMaterialStock[] = [];

export async function fetchPurchaseList(): Promise<PurchaseRecord[]> {
  return fetchJson("data/api/latest/purchases.json", mockPurchases);
}

export async function fetchPayableList(): Promise<PayableRecord[]> {
  return fetchJson("data/api/latest/payables.json", mockPayables);
}

export async function fetchBillList(): Promise<BillRecord[]> {
  return fetchJson("data/api/latest/bills.json", mockBills);
}

export async function fetchRawMaterialStock(): Promise<RawMaterialStock[]> {
  return fetchJson("data/api/latest/raw-stock.json", mockRawStock);
}

// ─── 税務管理（eTax連携対応） ───────────────────────────────────────────────

export interface TaxRateCategory {
  code: string;
  name: string;
  taxRatePerLiter: number;
}

export const TAX_RATE_CATEGORIES: TaxRateCategory[] = [
  { code: "01", name: "清酒（普通酒）", taxRatePerLiter: 100 },
  { code: "02", name: "清酒（純米酒）", taxRatePerLiter: 100 },
  { code: "03", name: "清酒（吟醸酒）", taxRatePerLiter: 100 },
  { code: "04", name: "清酒（大吟醸酒）", taxRatePerLiter: 100 },
  { code: "05", name: "本格焼酎", taxRatePerLiter: 250 },
  { code: "06", name: "リキュール", taxRatePerLiter: 200 },
  { code: "07", name: "果実酒", taxRatePerLiter: 100 },
  { code: "08", name: "その他醸造酒", taxRatePerLiter: 100 }
];

export interface TaxDeductionRow {
  type: "export" | "sample" | "research" | "loss";
  categoryCode: string;
  volume: number;
  reason: string;
  documentNo?: string;
}

export const TAX_DEDUCTION_LABELS: Record<TaxDeductionRow["type"], string> = {
  export: "輸出",
  sample: "見本",
  research: "試験醸造",
  loss: "欠減"
};

export interface TaxDeclarationRow {
  taxCategory: string;
  taxCategoryName: string;
  alcoholDegree: number;
  volume: number;
  taxRate: number;
  taxAmount: number;
  // eTax連携用拡張フィールド
  productionVolume: number;
  previousBalance: number;
  currentAdjustment: number;
  exportDeduction: number;
  sampleDeduction: number;
  taxableVolume: number;
}

export interface TaxDeclaration {
  targetYear: number;
  targetMonth: number;
  companyName: string;
  companyNo: string;
  companyAddress: string;
  companyRepresentative: string;
  taxOffice: string;
  rows: TaxDeclarationRow[];
  deductions: TaxDeductionRow[];
  totalVolume: number;
  totalTax: number;
  status: "draft" | "submitted" | "accepted";
  submittedAt: string | null;
}

const mockTaxDeclaration: TaxDeclaration = {
  targetYear: 0, targetMonth: 0, companyName: "", companyNo: "",
  companyAddress: "", companyRepresentative: "", taxOffice: "",
  rows: [], totalTaxAmount: 0, filingDeadline: ""
};

export async function fetchTaxDeclaration(year: number, month: number): Promise<TaxDeclaration> {
  return fetchJson(`data/api/latest/tax-${year}-${String(month).padStart(2, "0")}.json`, {
    ...mockTaxDeclaration,
    targetYear: year,
    targetMonth: month
  });
}

// XMLエスケープ
function xmlEscape(value: string | number): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// eTax互換 XML生成
export function generateTaxXML(decl: TaxDeclaration): string {
  const rowsXml = decl.rows
    .map(
      (r) => `    <Category>
      <Code>${xmlEscape(r.taxCategory)}</Code>
      <Name>${xmlEscape(r.taxCategoryName)}</Name>
      <AlcoholDegree>${r.alcoholDegree}</AlcoholDegree>
      <ProductionVolume>${r.productionVolume}</ProductionVolume>
      <PreviousBalance>${r.previousBalance}</PreviousBalance>
      <CurrentAdjustment>${r.currentAdjustment}</CurrentAdjustment>
      <ExportDeduction>${r.exportDeduction}</ExportDeduction>
      <SampleDeduction>${r.sampleDeduction}</SampleDeduction>
      <TaxableVolume>${r.taxableVolume}</TaxableVolume>
      <TaxRate>${r.taxRate}</TaxRate>
      <TaxAmount>${r.taxAmount}</TaxAmount>
    </Category>`
    )
    .join("\n");

  const dedXml = decl.deductions
    .map(
      (d) => `    <Deduction type="${xmlEscape(d.type)}">
      <CategoryCode>${xmlEscape(d.categoryCode)}</CategoryCode>
      <Volume>${d.volume}</Volume>
      <Reason>${xmlEscape(d.reason)}</Reason>${d.documentNo ? `\n      <DocumentNo>${xmlEscape(d.documentNo)}</DocumentNo>` : ""}
    </Deduction>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${decl.targetYear}</TargetYear>
    <TargetMonth>${String(decl.targetMonth).padStart(2, "0")}</TargetMonth>
    <TaxpayerId>${xmlEscape(decl.companyNo)}</TaxpayerId>
    <TaxpayerName>${xmlEscape(decl.companyName)}</TaxpayerName>
    <TaxpayerAddress>${xmlEscape(decl.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${xmlEscape(decl.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${xmlEscape(decl.taxOffice)}</TaxOffice>
    <Status>${decl.status}</Status>
  </Header>
  <Categories>
${rowsXml}
  </Categories>
  <Deductions>
${dedXml}
  </Deductions>
  <Total>
    <TotalVolume>${decl.totalVolume}</TotalVolume>
    <TotalTax>${decl.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`;
}

// CSVエスケープ
function csvEscape(value: string | number): string {
  const s = String(value);
  if (/[,"\n]/.test(s)) {
    return `"${s.replaceAll('"', '""')}"`;
  }
  return s;
}

// eTax互換 CSV生成
export function generateTaxCSV(decl: TaxDeclaration): string {
  const bom = "\uFEFF";
  const header = [
    "酒類コード",
    "区分名",
    "アルコール度数",
    "製造数量",
    "前月繰越",
    "当月調整",
    "輸出控除",
    "見本等控除",
    "課税数量",
    "税率(円/L)",
    "税額(円)"
  ].join(",");
  const rows = decl.rows.map((r) =>
    [
      r.taxCategory,
      r.taxCategoryName,
      r.alcoholDegree,
      r.productionVolume,
      r.previousBalance,
      r.currentAdjustment,
      r.exportDeduction,
      r.sampleDeduction,
      r.taxableVolume,
      r.taxRate,
      r.taxAmount
    ]
      .map(csvEscape)
      .join(",")
  );
  const footer = `,合計,,${decl.rows.reduce((s, r) => s + r.productionVolume, 0)},,,${decl.rows.reduce((s, r) => s + r.exportDeduction, 0)},${decl.rows.reduce((s, r) => s + r.sampleDeduction, 0)},${decl.totalVolume},,${decl.totalTax}`;
  return bom + [header, ...rows, footer].join("\n") + "\n";
}

// 課税数量と税額を自動再計算（イミュータブル）
export function recalculateTaxDeclaration(decl: TaxDeclaration): TaxDeclaration {
  const rows = decl.rows.map((r) => {
    const taxableVolume = Math.max(
      0,
      r.productionVolume + r.previousBalance + r.currentAdjustment - r.exportDeduction - r.sampleDeduction
    );
    const taxAmount = Math.round(taxableVolume * r.taxRate);
    return { ...r, taxableVolume, volume: taxableVolume, taxAmount };
  });
  const totalVolume = rows.reduce((s, r) => s + r.taxableVolume, 0);
  const totalTax = rows.reduce((s, r) => s + r.taxAmount, 0);
  return { ...decl, rows, totalVolume, totalTax };
}

export async function saveTaxDeclaration(decl: TaxDeclaration): Promise<void> {
  const { supabaseInsert } = await import("./supabase");
  await supabaseInsert("tax_declarations", {
    target_year: decl.targetYear,
    target_month: decl.targetMonth,
    company_name: decl.companyName,
    company_no: decl.companyNo,
    company_address: decl.companyAddress,
    company_representative: decl.companyRepresentative,
    tax_office: decl.taxOffice,
    total_taxable_volume: decl.totalVolume,
    total_tax_amount: decl.totalTax,
    status: decl.status,
    xml_data: generateTaxXML(decl),
    submitted_at: decl.submittedAt
  });
}

// ─── 店舗・直売所 ─────────────────────────────────────────────────────────────

export interface StoreSale {
  id: string;
  saleDate: string;
  saleTime: string;
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  paymentMethod: "cash" | "card" | "paypay" | "other";
}

export interface StoreOrder {
  id: string;
  orderNo: string;
  orderDate: string;
  customerName: string;
  postalCode: string;
  address: string;
  items: { productName: string; quantity: number; amount: number }[];
  totalAmount: number;
  status: "new" | "processing" | "shipped" | "delivered";
  shippingDate: string;
}

const mockStoreSales: StoreSale[] = [];

const mockStoreOrders: StoreOrder[] = [];

export async function fetchStoreSales(date: string): Promise<StoreSale[]> {
  return fetchJson(`data/api/latest/store-sales-${date}.json`, mockStoreSales);
}

export async function fetchStoreOrders(): Promise<StoreOrder[]> {
  return fetchJson("data/api/latest/store-orders.json", mockStoreOrders);
}

export async function saveEmailCampaign(campaign: EmailCampaign): Promise<EmailCampaign> {
  const row = await supabaseInsert<{
    id?: string;
    subject?: string;
    body?: string;
    template_id?: string;
    audience_mode?: string;
    audience_filter?: string;
    recipient_count?: number;
    sent_count?: number;
    status?: string;
    sent_at?: string;
    created_at?: string;
    updated_at?: string;
  }>("email_campaigns", {
    subject: campaign.subject,
    body: campaign.body,
    template_id: campaign.templateId,
    audience_mode: campaign.audienceMode,
    audience_filter: campaign.audienceFilter,
    recipient_count: campaign.recipientCount,
    sent_count: campaign.status === "sent" ? campaign.recipientCount : 0,
    status: campaign.status,
    sent_at: campaign.status === "sent" ? new Date().toISOString() : null
  });

  return {
    id: row?.id ?? `local-email-${Date.now()}`,
    subject: row?.subject ?? campaign.subject,
    body: row?.body ?? campaign.body,
    templateId: row?.template_id ?? campaign.templateId,
    audienceMode: (row?.audience_mode as EmailCampaign["audienceMode"] | undefined) ?? campaign.audienceMode,
    audienceFilter: row?.audience_filter ?? campaign.audienceFilter,
    recipientCount: row?.recipient_count ?? campaign.recipientCount,
    status: (row?.status as EmailCampaignStatus | undefined) ?? campaign.status,
    createdAt: row?.created_at ?? new Date().toISOString(),
    updatedAt: row?.updated_at ?? new Date().toISOString()
  };
}

export async function sendEmailCampaign(
  campaign: EmailCampaign,
  sender?: MailSender
): Promise<{ sent: number; failed: number }> {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_RESEND_API_KEY is not configured");
  }

  const recipients = campaign.recipients ?? [];
  const fromAddr = sender
    ? sender.displayName
      ? `${sender.displayName} <${sender.email}>`
      : sender.email
    : "brewery@kaneishuzo.co.jp";
  const replyTo = sender?.replyTo;
  const signature = sender?.signature ? `\n\n${sender.signature}` : "";
  let sent = 0;
  let failed = 0;

  await Promise.all(
    recipients.map(async (recipient) => {
      try {
        const body: Record<string, unknown> = {
          from: fromAddr,
          to: [recipient],
          subject: campaign.subject,
          text: campaign.body + signature
        };
        if (replyTo) body.reply_to = replyTo;
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        sent += 1;
      } catch (error) {
        console.warn(`Failed to send email to ${recipient}`, error);
        failed += 1;
      }
    })
  );

  return { sent, failed };
}

// ─── 帳票レイアウト（フォームデザイナー配置データ） ──────────────────────────

export interface PrintLayout {
  id: string;
  name: string;
  templateKey: string;
  positions: Record<string, { x: number; y: number }>;
  isDefault?: boolean;
  note?: string;
  updatedAt?: string;
}

// Supabaseから全レイアウト取得
export async function fetchPrintLayouts(templateKey?: string): Promise<PrintLayout[]> {
  const params: Record<string, string> = { order: "updated_at.desc" };
  if (templateKey) params.template_key = `eq.${templateKey}`;
  const rows = await supabaseQuery<LooseRow>("print_layouts", params);
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    name: getString(r, ["name"], ""),
    templateKey: getString(r, ["template_key"], ""),
    positions: (r["positions"] as Record<string, { x: number; y: number }>) ?? {},
    isDefault: getBoolean(r, ["is_default"], false),
    note: getString(r, ["note"], ""),
    updatedAt: getString(r, ["updated_at"], "")
  }));
}

// レイアウト保存（UPSERT）
export async function savePrintLayout(layout: PrintLayout): Promise<PrintLayout | null> {
  const { supabaseInsert } = await import("./supabase");
  const body = {
    id: layout.id,
    name: layout.name,
    template_key: layout.templateKey,
    positions: layout.positions,
    is_default: layout.isDefault ?? false,
    note: layout.note ?? "",
    updated_at: new Date().toISOString()
  };
  const result = await supabaseInsert<LooseRow>("print_layouts", body);
  if (!result) return null;
  return {
    id: getString(result, ["id"], layout.id),
    name: getString(result, ["name"], layout.name),
    templateKey: getString(result, ["template_key"], layout.templateKey),
    positions: (result["positions"] as Record<string, { x: number; y: number }>) ?? layout.positions,
    isDefault: getBoolean(result, ["is_default"], false),
    note: getString(result, ["note"], ""),
    updatedAt: getString(result, ["updated_at"], "")
  };
}

// レイアウト削除
export async function deletePrintLayout(id: string): Promise<boolean> {
  const url = new URL(`/rest/v1/print_layouts`, "https://loarwnuyvfxiscjjsmiz.supabase.co");
  url.searchParams.set("id", `eq.${id}`);
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!key) return false;
  try {
    const resp = await fetch(url.toString(), {
      method: "DELETE",
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    return resp.ok;
  } catch {
    return false;
  }
}

// ─── メール送信元プロファイル ────────────────────────────────────────────────

export interface MailSender {
  id: string;
  name: string;
  email: string;
  displayName?: string;
  signature?: string;
  replyTo?: string;
  isDefault?: boolean;
  isVerified?: boolean;
  note?: string;
}

export async function fetchMailSenders(): Promise<MailSender[]> {
  const rows = await supabaseQuery<LooseRow>("mail_senders", { order: "is_default.desc,name.asc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    name: getString(r, ["name"], ""),
    email: getString(r, ["email"], ""),
    displayName: getString(r, ["display_name"], ""),
    signature: getString(r, ["signature"], ""),
    replyTo: getString(r, ["reply_to"], ""),
    isDefault: getBoolean(r, ["is_default"], false),
    isVerified: getBoolean(r, ["is_verified"], false),
    note: getString(r, ["note"], "")
  }));
}

export async function saveMailSender(sender: MailSender): Promise<MailSender | null> {
  const { supabaseInsert } = await import("./supabase");
  const result = await supabaseInsert<LooseRow>("mail_senders", {
    id: sender.id,
    name: sender.name,
    email: sender.email,
    display_name: sender.displayName ?? "",
    signature: sender.signature ?? "",
    reply_to: sender.replyTo ?? "",
    is_default: sender.isDefault ?? false,
    is_verified: sender.isVerified ?? false,
    note: sender.note ?? "",
    updated_at: new Date().toISOString()
  });
  if (!result) return null;
  return {
    id: getString(result, ["id"], sender.id),
    name: getString(result, ["name"], sender.name),
    email: getString(result, ["email"], sender.email),
    displayName: getString(result, ["display_name"], ""),
    signature: getString(result, ["signature"], ""),
    replyTo: getString(result, ["reply_to"], ""),
    isDefault: getBoolean(result, ["is_default"], false),
    isVerified: getBoolean(result, ["is_verified"], false)
  };
}

export async function deleteMailSender(id: string): Promise<boolean> {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!key) return false;
  try {
    const url = new URL(`/rest/v1/mail_senders`, "https://loarwnuyvfxiscjjsmiz.supabase.co");
    url.searchParams.set("id", `eq.${id}`);
    const r = await fetch(url.toString(), {
      method: "DELETE",
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    return r.ok;
  } catch {
    return false;
  }
}

// ─── カレンダーイベント ──────────────────────────────────────────────────────

export type CalendarCategory = "delivery" | "tour" | "meeting" | "brewing" | "general";

export const CALENDAR_CATEGORY_LABELS: Record<CalendarCategory, string> = {
  delivery: "🚚 納品",
  tour: "🏭 蔵見学",
  meeting: "📋 商談",
  brewing: "🍶 仕込",
  general: "📌 その他"
};

export const CALENDAR_CATEGORY_COLORS: Record<CalendarCategory, string> = {
  delivery: "#9C27B0",
  tour: "#FF9800",
  meeting: "#2196F3",
  brewing: "#4CAF50",
  general: "#0F5B8D"
};

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  category: CalendarCategory;
  startsAt: string; // ISO
  endsAt?: string;
  isAllDay?: boolean;
  location?: string;
  attendees?: string[];
  relatedCustomerCode?: string;
  relatedOrderId?: string;
  color?: string;
  googleEventId?: string;
}

export async function fetchCalendarEvents(yearMonth: string): Promise<CalendarEvent[]> {
  const start = `${yearMonth}-01T00:00:00Z`;
  const [y, m] = yearMonth.split("-").map((s) => parseInt(s, 10));
  const lastDay = new Date(y, m, 0).getDate();
  const end = `${yearMonth}-${String(lastDay).padStart(2, "0")}T23:59:59Z`;
  const rows = await supabaseQuery<LooseRow>("calendar_events", {
    starts_at: `gte.${start}`,
    and: `(starts_at.lte.${end})`,
    order: "starts_at.asc"
  });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    title: getString(r, ["title"], ""),
    description: getString(r, ["description"], ""),
    category: (getString(r, ["category"], "general") as CalendarCategory) || "general",
    startsAt: getString(r, ["starts_at"], new Date().toISOString()),
    endsAt: getString(r, ["ends_at"], ""),
    isAllDay: getBoolean(r, ["is_all_day"], false),
    location: getString(r, ["location"], ""),
    attendees: (r["attendees"] as string[]) ?? [],
    relatedCustomerCode: getString(r, ["related_customer_code"], ""),
    relatedOrderId: getString(r, ["related_order_id"], ""),
    color: getString(r, ["color"], ""),
    googleEventId: getString(r, ["google_event_id"], "")
  }));
}

export async function saveCalendarEvent(event: CalendarEvent): Promise<CalendarEvent | null> {
  const { supabaseInsert } = await import("./supabase");
  const result = await supabaseInsert<LooseRow>("calendar_events", {
    id: event.id,
    title: event.title,
    description: event.description ?? "",
    category: event.category,
    starts_at: event.startsAt,
    ends_at: event.endsAt || null,
    is_all_day: event.isAllDay ?? false,
    location: event.location ?? "",
    attendees: event.attendees ?? [],
    related_customer_code: event.relatedCustomerCode ?? null,
    related_order_id: event.relatedOrderId ?? null,
    color: event.color ?? CALENDAR_CATEGORY_COLORS[event.category],
    updated_at: new Date().toISOString()
  });
  if (!result) return null;
  return event;
}

export async function deleteCalendarEvent(id: string): Promise<boolean> {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!key) return false;
  try {
    const url = new URL(`/rest/v1/calendar_events`, "https://loarwnuyvfxiscjjsmiz.supabase.co");
    url.searchParams.set("id", `eq.${id}`);
    const r = await fetch(url.toString(), {
      method: "DELETE",
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    return r.ok;
  } catch {
    return false;
  }
}

// ─── 外部サービス連携設定 ──────────────────────────────────────────────────

export interface IntegrationSetting {
  id: string;
  name: string;
  provider: string;
  config: Record<string, string>;
  isEnabled: boolean;
  lastSyncAt?: string;
  lastStatus?: string;
}

export async function fetchIntegrationSettings(): Promise<IntegrationSetting[]> {
  const rows = await supabaseQuery<LooseRow>("integration_settings", { order: "name.asc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    name: getString(r, ["name"], ""),
    provider: getString(r, ["provider"], ""),
    config: (r["config"] as Record<string, string>) ?? {},
    isEnabled: getBoolean(r, ["is_enabled"], false),
    lastSyncAt: getString(r, ["last_sync_at"], ""),
    lastStatus: getString(r, ["last_status"], "")
  }));
}

export async function saveIntegrationSetting(s: IntegrationSetting): Promise<IntegrationSetting | null> {
  const { supabaseInsert } = await import("./supabase");
  const result = await supabaseInsert<LooseRow>("integration_settings", {
    id: s.id,
    name: s.name,
    provider: s.provider,
    config: s.config,
    is_enabled: s.isEnabled,
    last_sync_at: s.lastSyncAt || null,
    last_status: s.lastStatus || null,
    updated_at: new Date().toISOString()
  });
  if (!result) return null;
  return s;
}

// ─── Shopify注文取得 ─────────────────────────────────────────────────────

export interface ShopifyOrder {
  id: string;
  shopifyOrderId: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  financialStatus: string;
  fulfillmentStatus: string;
  lineItems: Array<{ name: string; quantity: number; price: number }>;
}

export async function syncShopifyOrders(setting: IntegrationSetting): Promise<{ count: number; error?: string }> {
  const shopDomain = setting.config["shop_domain"];
  const adminToken = setting.config["admin_token"];
  if (!shopDomain || !adminToken) {
    return { count: 0, error: "shop_domain と admin_token を設定してください" };
  }
  try {
    // Shopify Admin API: GET /admin/api/2024-01/orders.json
    const url = `https://${shopDomain}/admin/api/2024-01/orders.json?status=any&limit=50`;
    const resp = await fetch(url, {
      headers: { "X-Shopify-Access-Token": adminToken, "Content-Type": "application/json" }
    });
    if (!resp.ok) {
      return { count: 0, error: `HTTP ${resp.status}` };
    }
    const data = (await resp.json()) as { orders: Array<Record<string, unknown>> };
    const { supabaseInsert } = await import("./supabase");
    let count = 0;
    for (const order of data.orders) {
      const id = `shopify_${order["id"]}`;
      await supabaseInsert("shopify_orders", {
        id,
        shopify_order_id: String(order["id"]),
        order_number: String(order["order_number"] ?? ""),
        order_date: String(order["created_at"] ?? new Date().toISOString()),
        customer_name: String((order["customer"] as Record<string, unknown>)?.["first_name"] ?? "") + " " + String((order["customer"] as Record<string, unknown>)?.["last_name"] ?? ""),
        customer_email: String((order["customer"] as Record<string, unknown>)?.["email"] ?? ""),
        total_amount: Math.round(parseFloat(String(order["total_price"] ?? "0"))),
        financial_status: String(order["financial_status"] ?? ""),
        fulfillment_status: String(order["fulfillment_status"] ?? "unfulfilled"),
        line_items: order["line_items"] ?? [],
        shipping_address: order["shipping_address"] ?? null,
        raw_payload: order
      });
      count++;
    }
    await saveIntegrationSetting({
      ...setting,
      lastSyncAt: new Date().toISOString(),
      lastStatus: `${count}件取得成功`
    });
    return { count };
  } catch (e) {
    return { count: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function fetchShopifyOrders(): Promise<ShopifyOrder[]> {
  const rows = await supabaseQuery<LooseRow>("shopify_orders", { order: "order_date.desc", limit: "50" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    shopifyOrderId: getString(r, ["shopify_order_id"], ""),
    orderNumber: getString(r, ["order_number"], ""),
    orderDate: getString(r, ["order_date"], ""),
    customerName: getString(r, ["customer_name"], ""),
    customerEmail: getString(r, ["customer_email"], ""),
    totalAmount: toNumber(r["total_amount"]),
    financialStatus: getString(r, ["financial_status"], ""),
    fulfillmentStatus: getString(r, ["fulfillment_status"], ""),
    lineItems: (r["line_items"] as Array<{ name: string; quantity: number; price: number }>) ?? []
  }));
}

// ─── Google Calendar 連携（基本同期） ────────────────────────────────────

async function refreshGoogleToken(
  setting: IntegrationSetting
): Promise<{ token: string; error?: string }> {
  const refreshToken = setting.config["refresh_token"];
  const clientId = setting.config["client_id"];
  const clientSecret = setting.config["client_secret"];
  if (!refreshToken || !clientId || !clientSecret) {
    return { token: "", error: "refresh_token / client_id / client_secret が未設定です" };
  }
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret
    })
  });
  if (!resp.ok) return { token: "", error: `トークンリフレッシュ失敗: HTTP ${resp.status}` };
  const data = (await resp.json()) as { access_token: string };
  const newToken = data.access_token;
  await saveIntegrationSetting({
    ...setting,
    config: { ...setting.config, oauth_token: newToken }
  });
  setting.config["oauth_token"] = newToken;
  return { token: newToken };
}

export async function syncGoogleCalendar(
  setting: IntegrationSetting
): Promise<{ count: number; error?: string }> {
  let token = setting.config["oauth_token"];
  const calendarId = setting.config["calendar_id"] || "primary";
  if (!token && !setting.config["refresh_token"]) {
    return { count: 0, error: "oauth_token または refresh_token を設定してください" };
  }
  try {
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 30 * 86400 * 1000).toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

    let resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

    // トークン期限切れなら自動リフレッシュ
    if (resp.status === 401) {
      const refreshed = await refreshGoogleToken(setting);
      if (refreshed.error) return { count: 0, error: refreshed.error };
      token = refreshed.token;
      resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    }

    if (!resp.ok) return { count: 0, error: `HTTP ${resp.status}` };
    const data = (await resp.json()) as { items: Array<Record<string, unknown>> };
    const { supabaseInsert } = await import("./supabase");
    let count = 0;
    for (const ev of data.items) {
      const id = `gcal_${ev["id"]}`;
      const start = (ev["start"] as Record<string, unknown>)?.["dateTime"] ?? (ev["start"] as Record<string, unknown>)?.["date"] ?? "";
      const end = (ev["end"] as Record<string, unknown>)?.["dateTime"] ?? (ev["end"] as Record<string, unknown>)?.["date"] ?? "";
      await supabaseInsert("calendar_events", {
        id,
        title: String(ev["summary"] ?? "(無題)"),
        description: String(ev["description"] ?? ""),
        category: "general",
        starts_at: String(start),
        ends_at: String(end),
        location: String(ev["location"] ?? ""),
        google_event_id: String(ev["id"] ?? ""),
        updated_at: new Date().toISOString()
      });
      count++;
    }
    await saveIntegrationSetting({
      ...setting,
      lastSyncAt: new Date().toISOString(),
      lastStatus: `${count}件取得`
    });
    return { count };
  } catch (e) {
    return { count: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

// ─── FAX OCR (Cloud Vision) ──────────────────────────────────────────────

export interface FaxRecord {
  id: string;
  receivedAt: string;
  senderPhone?: string;
  senderName?: string;
  imageUrl?: string;
  ocrStatus: "pending" | "processing" | "done" | "failed";
  ocrText?: string;
  extractedData?: Record<string, unknown>;
  linkedInvoiceId?: string;
}

export async function fetchFaxInbox(): Promise<FaxRecord[]> {
  const rows = await supabaseQuery<LooseRow>("fax_inbox", { order: "received_at.desc", limit: "50" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    receivedAt: getString(r, ["received_at"], ""),
    senderPhone: getString(r, ["sender_phone"], ""),
    senderName: getString(r, ["sender_name"], ""),
    imageUrl: getString(r, ["image_url"], ""),
    ocrStatus: (getString(r, ["ocr_status"], "pending") as FaxRecord["ocrStatus"]) || "pending",
    ocrText: getString(r, ["ocr_text"], ""),
    extractedData: (r["extracted_data"] as Record<string, unknown>) ?? {},
    linkedInvoiceId: getString(r, ["linked_invoice_id"], "")
  }));
}

export async function ocrFaxImage(
  setting: IntegrationSetting,
  base64Image: string
): Promise<{ text: string; error?: string }> {
  const apiKey = setting.config["api_key"];
  if (!apiKey) return { text: "", error: "Cloud Vision API key 未設定" };
  try {
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image.replace(/^data:image\/\w+;base64,/, "") },
            features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
            imageContext: { languageHints: ["ja"] }
          }
        ]
      })
    });
    if (!resp.ok) return { text: "", error: `HTTP ${resp.status}` };
    const data = (await resp.json()) as { responses: Array<{ fullTextAnnotation?: { text: string } }> };
    const text = data.responses?.[0]?.fullTextAnnotation?.text ?? "";
    return { text };
  } catch (e) {
    return { text: "", error: e instanceof Error ? e.message : String(e) };
  }
}

export async function saveFaxRecord(record: FaxRecord): Promise<FaxRecord | null> {
  const { supabaseInsert } = await import("./supabase");
  const result = await supabaseInsert<LooseRow>("fax_inbox", {
    id: record.id,
    received_at: record.receivedAt,
    sender_phone: record.senderPhone || null,
    sender_name: record.senderName || null,
    image_url: record.imageUrl || null,
    ocr_status: record.ocrStatus,
    ocr_text: record.ocrText || null,
    extracted_data: record.extractedData || null,
    linked_invoice_id: record.linkedInvoiceId || null
  });
  if (!result) return null;
  return record;
}

// ─── ユーザー管理 ──────────────────────────────────────────────────────────

export type UserRole = "admin" | "manager" | "staff";
export type UserDepartment = "all" | "sales" | "brewery" | "management";

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "👑 管理者",
  manager: "📋 マネージャー",
  staff: "👤 スタッフ"
};

export const DEPT_LABELS: Record<UserDepartment, string> = {
  all: "全体",
  sales: "営業",
  brewery: "蔵人",
  management: "管理"
};

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  staffCode?: string;
  department: UserDepartment;
  role: UserRole;
  defaultMailSenderId?: string;
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  lastSignInAt?: string;
  createdAt?: string;
}

export async function fetchUserProfiles(): Promise<UserProfile[]> {
  const rows = await supabaseQuery<LooseRow>("user_profiles", { order: "display_name.asc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    email: getString(r, ["email"], ""),
    displayName: getString(r, ["display_name"], ""),
    staffCode: getString(r, ["staff_code"], ""),
    department: (getString(r, ["department"], "all") as UserDepartment) || "all",
    role: (getString(r, ["role"], "staff") as UserRole) || "staff",
    defaultMailSenderId: getString(r, ["default_mail_sender_id"], ""),
    phone: getString(r, ["phone"], ""),
    avatarUrl: getString(r, ["avatar_url"], ""),
    isActive: getBoolean(r, ["is_active"], true),
    lastSignInAt: getString(r, ["last_sign_in_at"], ""),
    createdAt: getString(r, ["created_at"], "")
  }));
}

export async function fetchMyProfile(email: string): Promise<UserProfile | null> {
  if (!email) return null;
  const rows = await supabaseQuery<LooseRow>("user_profiles", { email: `eq.${email}` });
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: getString(r, ["id"], ""),
    email: getString(r, ["email"], ""),
    displayName: getString(r, ["display_name"], ""),
    staffCode: getString(r, ["staff_code"], ""),
    department: (getString(r, ["department"], "all") as UserDepartment) || "all",
    role: (getString(r, ["role"], "staff") as UserRole) || "staff",
    defaultMailSenderId: getString(r, ["default_mail_sender_id"], ""),
    phone: getString(r, ["phone"], ""),
    avatarUrl: getString(r, ["avatar_url"], ""),
    isActive: getBoolean(r, ["is_active"], true),
    lastSignInAt: getString(r, ["last_sign_in_at"], "")
  };
}

export async function saveUserProfile(profile: UserProfile): Promise<UserProfile | null> {
  const { supabaseInsert } = await import("./supabase");
  const result = await supabaseInsert<LooseRow>("user_profiles", {
    id: profile.id,
    email: profile.email,
    display_name: profile.displayName,
    staff_code: profile.staffCode || null,
    department: profile.department,
    role: profile.role,
    default_mail_sender_id: profile.defaultMailSenderId || null,
    phone: profile.phone || null,
    avatar_url: profile.avatarUrl || null,
    is_active: profile.isActive,
    updated_at: new Date().toISOString()
  });
  if (!result) return null;
  return profile;
}

export async function deleteUserProfile(id: string): Promise<boolean> {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!key) return false;
  try {
    const url = new URL(`/rest/v1/user_profiles`, "https://loarwnuyvfxiscjjsmiz.supabase.co");
    url.searchParams.set("id", `eq.${id}`);
    const r = await fetch(url.toString(), {
      method: "DELETE",
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    return r.ok;
  } catch {
    return false;
  }
}

// ─── 操作ログ（audit_logs） ───────────────────────────────────────────────

export interface AuditLog {
  id: string;
  action: string;
  entityType?: string;
  entityId?: string;
  userEmail?: string;
  changes?: Record<string, unknown>;
  createdAt: string;
}

export async function recordAudit(log: {
  action: string;
  entityType?: string;
  entityId?: string;
  userEmail?: string;
  changes?: Record<string, unknown>;
}): Promise<void> {
  const { supabaseInsert } = await import("./supabase");
  await supabaseInsert("audit_logs", {
    action: log.action,
    entity_type: log.entityType ?? null,
    entity_id: log.entityId ?? null,
    user_email: log.userEmail ?? null,
    changes: log.changes ?? null
  });
}

export async function fetchAuditLogs(limit = 100): Promise<AuditLog[]> {
  const rows = await supabaseQuery<LooseRow>("audit_logs", {
    order: "created_at.desc",
    limit: String(limit)
  });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    action: getString(r, ["action"], ""),
    entityType: getString(r, ["entity_type"], ""),
    entityId: getString(r, ["entity_id"], ""),
    userEmail: getString(r, ["user_email"], ""),
    changes: (r["changes"] as Record<string, unknown>) ?? {},
    createdAt: getString(r, ["created_at"], "")
  }));
}

// ─── Slack通知 ────────────────────────────────────────────────────────────

export type SlackEventType = "new_order" | "payment_overdue" | "low_stock" | "fax_received" | "tour_inquiry" | "new_prospect";

export const SLACK_EVENT_LABELS: Record<SlackEventType, string> = {
  new_order: "🛒 新規受注",
  payment_overdue: "⚠️ 入金遅延",
  low_stock: "📦 低在庫",
  fax_received: "📠 FAX受信",
  tour_inquiry: "🏭 見学問合せ",
  new_prospect: "🎯 新規見込客"
};

export interface SlackNotificationRule {
  id: string;
  eventType: SlackEventType;
  enabled: boolean;
  channel: string;
  condition: Record<string, unknown>;
  lastTriggeredAt?: string;
}

export interface SlackNotificationLog {
  id: string;
  eventType: string;
  channel: string;
  message: string;
  status: "sent" | "failed";
  error?: string;
  sentAt: string;
}

export async function fetchSlackRules(): Promise<SlackNotificationRule[]> {
  const rows = await supabaseQuery<LooseRow>("slack_notifications", { order: "event_type.asc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    eventType: (getString(r, ["event_type"], "new_order") as SlackEventType),
    enabled: getBoolean(r, ["enabled"], true),
    channel: getString(r, ["channel"], ""),
    condition: (r["condition"] as Record<string, unknown>) ?? {},
    lastTriggeredAt: getString(r, ["last_triggered_at"], "")
  }));
}

export async function saveSlackRule(rule: SlackNotificationRule): Promise<SlackNotificationRule | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("slack_notifications", {
    id: rule.id,
    event_type: rule.eventType,
    enabled: rule.enabled,
    channel: rule.channel,
    condition: rule.condition
  });
  return r ? rule : null;
}

export async function fetchSlackLogs(limit = 50): Promise<SlackNotificationLog[]> {
  const rows = await supabaseQuery<LooseRow>("slack_notification_logs", {
    order: "sent_at.desc",
    limit: String(limit)
  });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    eventType: getString(r, ["event_type"], ""),
    channel: getString(r, ["channel"], ""),
    message: getString(r, ["message"], ""),
    status: (getString(r, ["status"], "sent") as "sent" | "failed"),
    error: getString(r, ["error"], ""),
    sentAt: getString(r, ["sent_at"], "")
  }));
}

export async function sendSlackNotification(
  eventType: SlackEventType,
  message: string,
  channel?: string
): Promise<{ ok: boolean; error?: string }> {
  const settings = await fetchIntegrationSettings();
  const slack = settings.find((s) => s.provider === "slack");
  if (!slack || !slack.isEnabled) {
    return { ok: false, error: "Slack連携が無効です" };
  }
  const webhookUrl = slack.config["webhook_url"];
  if (!webhookUrl) return { ok: false, error: "Webhook URL未設定" };

  const rules = await fetchSlackRules();
  const rule = rules.find((r) => r.eventType === eventType && r.enabled);
  if (!rule) return { ok: false, error: "通知ルールが無効" };
  const targetChannel = channel ?? rule.channel ?? slack.config["default_channel"] ?? "#general";

  try {
    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `${SLACK_EVENT_LABELS[eventType]} ${message}`,
        channel: targetChannel
      })
    });
    const ok = resp.ok;
    const { supabaseInsert } = await import("./supabase");
    await supabaseInsert("slack_notification_logs", {
      id: `slack_${Date.now()}`,
      event_type: eventType,
      channel: targetChannel,
      message,
      status: ok ? "sent" : "failed",
      error: ok ? null : `HTTP ${resp.status}`
    });
    return ok ? { ok: true } : { ok: false, error: `HTTP ${resp.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// ─── 見込客（新規営業）管理 ──────────────────────────────────────────────

export type ProspectStage = "cold" | "warm" | "hot" | "contacted" | "negotiating" | "won" | "lost";

export const PROSPECT_STAGE_LABELS: Record<ProspectStage, string> = {
  cold: "❄️ 未接触",
  warm: "🌡️ 関心あり",
  hot: "🔥 見込み高",
  contacted: "📞 アプローチ中",
  negotiating: "💬 商談中",
  won: "🎉 受注",
  lost: "💔 失注"
};

export const PROSPECT_STAGE_COLORS: Record<ProspectStage, string> = {
  cold: "#90A4AE",
  warm: "#FFA726",
  hot: "#EF5350",
  contacted: "#42A5F5",
  negotiating: "#AB47BC",
  won: "#66BB6A",
  lost: "#757575"
};

export interface Prospect {
  id: string;
  companyName: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  businessType?: string;
  stage: ProspectStage;
  source?: string;
  expectedAmount: number;
  probability: number;
  assignedStaffCode?: string;
  nextActionDate?: string;
  nextAction?: string;
  note?: string;
  lastContactAt?: string;
  wonAt?: string;
  lostAt?: string;
  lostReason?: string;
  convertedCustomerCode?: string;
  createdAt?: string;
}

export interface ProspectActivity {
  id: string;
  prospectId: string;
  activityType: "call" | "visit" | "email" | "proposal" | "demo" | "sample";
  title?: string;
  description?: string;
  activityDate: string;
  result?: string;
  staffCode?: string;
}

export async function fetchProspects(): Promise<Prospect[]> {
  const rows = await supabaseQuery<LooseRow>("prospects", { order: "updated_at.desc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    companyName: getString(r, ["company_name"], ""),
    contactName: getString(r, ["contact_name"], ""),
    email: getString(r, ["email"], ""),
    phone: getString(r, ["phone"], ""),
    address: getString(r, ["address"], ""),
    website: getString(r, ["website"], ""),
    businessType: getString(r, ["business_type"], ""),
    stage: (getString(r, ["stage"], "cold") as ProspectStage),
    source: getString(r, ["source"], ""),
    expectedAmount: toNumber(r["expected_amount"]),
    probability: toNumber(r["probability"]),
    assignedStaffCode: getString(r, ["assigned_staff_code"], ""),
    nextActionDate: getString(r, ["next_action_date"], ""),
    nextAction: getString(r, ["next_action"], ""),
    note: getString(r, ["note"], ""),
    lastContactAt: getString(r, ["last_contact_at"], ""),
    wonAt: getString(r, ["won_at"], ""),
    lostAt: getString(r, ["lost_at"], ""),
    lostReason: getString(r, ["lost_reason"], ""),
    convertedCustomerCode: getString(r, ["converted_customer_code"], ""),
    createdAt: getString(r, ["created_at"], "")
  }));
}

export async function saveProspect(p: Prospect): Promise<Prospect | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("prospects", {
    id: p.id,
    company_name: p.companyName,
    contact_name: p.contactName || null,
    email: p.email || null,
    phone: p.phone || null,
    address: p.address || null,
    website: p.website || null,
    business_type: p.businessType || null,
    stage: p.stage,
    source: p.source || null,
    expected_amount: p.expectedAmount,
    probability: p.probability,
    assigned_staff_code: p.assignedStaffCode || null,
    next_action_date: p.nextActionDate || null,
    next_action: p.nextAction || null,
    note: p.note || null,
    updated_at: new Date().toISOString()
  });
  return r ? p : null;
}

export async function deleteProspect(id: string): Promise<boolean> {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!key) return false;
  try {
    const url = new URL(`/rest/v1/prospects`, "https://loarwnuyvfxiscjjsmiz.supabase.co");
    url.searchParams.set("id", `eq.${id}`);
    const r = await fetch(url.toString(), {
      method: "DELETE",
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function fetchProspectActivities(prospectId: string): Promise<ProspectActivity[]> {
  const rows = await supabaseQuery<LooseRow>("prospect_activities", {
    prospect_id: `eq.${prospectId}`,
    order: "activity_date.desc"
  });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    prospectId: getString(r, ["prospect_id"], ""),
    activityType: (getString(r, ["activity_type"], "call") as ProspectActivity["activityType"]),
    title: getString(r, ["title"], ""),
    description: getString(r, ["description"], ""),
    activityDate: getString(r, ["activity_date"], ""),
    result: getString(r, ["result"], ""),
    staffCode: getString(r, ["staff_code"], "")
  }));
}

export async function saveProspectActivity(activity: ProspectActivity): Promise<ProspectActivity | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("prospect_activities", {
    id: activity.id,
    prospect_id: activity.prospectId,
    activity_type: activity.activityType,
    title: activity.title || null,
    description: activity.description || null,
    activity_date: activity.activityDate,
    result: activity.result || null,
    staff_code: activity.staffCode || null
  });
  return r ? activity : null;
}

// ─── 副資材(瓶/ラベル/キャップ/箱等) 登録・編集 ──────────────────────────

export const MATERIAL_CATEGORIES = [
  "瓶 (720ml)",
  "瓶 (1.8L)",
  "瓶 (300ml)",
  "瓶 (500ml)",
  "キャップ・栓",
  "ラベル(表)",
  "ラベル(裏)",
  "首掛け",
  "化粧箱",
  "ダンボール",
  "包装紙",
  "熨斗・水引",
  "和紙",
  "リボン",
  "その他"
];

export async function saveMaterial(record: MaterialRecord): Promise<MaterialRecord | null> {
  const { supabaseInsert } = await import("./supabase");
  const result = await supabaseInsert<LooseRow>("materials", {
    id: record.id,
    legacy_material_code: record.code,
    material_code: record.code,
    name: record.name,
    unit: record.unit,
    material_type: (record as MaterialRecord & { materialType?: string }).materialType || null,
    current_stock: record.currentStock,
    minimum_stock: record.minimumStock,
    unit_cost: record.unitCost,
    last_purchase_date: record.lastUpdated,
    is_active: true,
    updated_at: new Date().toISOString()
  });
  return result ? record : null;
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!key) return false;
  try {
    const url = new URL(`/rest/v1/materials`, "https://loarwnuyvfxiscjjsmiz.supabase.co");
    url.searchParams.set("id", `eq.${id}`);
    const r = await fetch(url.toString(), {
      method: "DELETE",
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    return r.ok;
  } catch {
    return false;
  }
}

// ─── 納品先 (delivery_locations) ────────────────────────────────────────

export interface DeliveryLocation {
  id: string;
  customerCode?: string;
  name: string;
  postalCode?: string;
  address?: string;
  lat?: number;
  lng?: number;
  contactName?: string;
  phone?: string;
  deliveryNote?: string;
  isActive: boolean;
}

export async function fetchDeliveryLocations(): Promise<DeliveryLocation[]> {
  const rows = await supabaseQuery<LooseRow>("delivery_locations", { order: "name.asc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    customerCode: getString(r, ["customer_code"], ""),
    name: getString(r, ["name"], ""),
    postalCode: getString(r, ["postal_code"], ""),
    address: getString(r, ["address"], ""),
    lat: r["lat"] ? Number(r["lat"]) : undefined,
    lng: r["lng"] ? Number(r["lng"]) : undefined,
    contactName: getString(r, ["contact_name"], ""),
    phone: getString(r, ["phone"], ""),
    deliveryNote: getString(r, ["delivery_note"], ""),
    isActive: getBoolean(r, ["is_active"], true)
  }));
}

export async function saveDeliveryLocation(loc: DeliveryLocation): Promise<DeliveryLocation | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("delivery_locations", {
    id: loc.id,
    customer_code: loc.customerCode || null,
    name: loc.name,
    postal_code: loc.postalCode || null,
    address: loc.address || null,
    lat: loc.lat ?? null,
    lng: loc.lng ?? null,
    contact_name: loc.contactName || null,
    phone: loc.phone || null,
    delivery_note: loc.deliveryNote || null,
    is_active: loc.isActive
  });
  return r ? loc : null;
}

// ─── 通話履歴 (IVRy連携) ──────────────────────────────────────────────

export type CallDirection = "inbound" | "outbound";
export type CallStatus = "answered" | "missed" | "busy" | "no_answer";

export interface CallLog {
  id: string;
  callDirection: CallDirection;
  fromNumber?: string;
  toNumber?: string;
  matchedCustomerCode?: string;
  matchedProspectId?: string;
  durationSeconds?: number;
  callStatus?: CallStatus;
  recordingUrl?: string;
  transcript?: string;
  ivryCallId?: string;
  startedAt?: string;
  endedAt?: string;
  notes?: string;
}

export async function fetchCallLogs(limit = 50): Promise<CallLog[]> {
  const rows = await supabaseQuery<LooseRow>("call_logs", {
    order: "started_at.desc",
    limit: String(limit)
  });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    callDirection: (getString(r, ["call_direction"], "inbound") as CallDirection),
    fromNumber: getString(r, ["from_number"], ""),
    toNumber: getString(r, ["to_number"], ""),
    matchedCustomerCode: getString(r, ["matched_customer_code"], ""),
    matchedProspectId: getString(r, ["matched_prospect_id"], ""),
    durationSeconds: toNumber(r["duration_seconds"]),
    callStatus: (getString(r, ["call_status"], "answered") as CallStatus),
    recordingUrl: getString(r, ["recording_url"], ""),
    transcript: getString(r, ["transcript"], ""),
    ivryCallId: getString(r, ["ivry_call_id"], ""),
    startedAt: getString(r, ["started_at"], ""),
    endedAt: getString(r, ["ended_at"], ""),
    notes: getString(r, ["notes"], "")
  }));
}

export async function saveCallLog(log: CallLog): Promise<CallLog | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("call_logs", {
    id: log.id,
    call_direction: log.callDirection,
    from_number: log.fromNumber || null,
    to_number: log.toNumber || null,
    matched_customer_code: log.matchedCustomerCode || null,
    matched_prospect_id: log.matchedProspectId || null,
    duration_seconds: log.durationSeconds ?? 0,
    call_status: log.callStatus ?? "answered",
    started_at: log.startedAt || null,
    ended_at: log.endedAt || null,
    notes: log.notes || null,
    ivry_call_id: log.ivryCallId || null
  });
  return r ? log : null;
}

// IVRy API から通話履歴同期
export async function syncIvryCallLogs(setting: IntegrationSetting): Promise<{ count: number; error?: string }> {
  const apiKey = setting.config["api_key"];
  const teamId = setting.config["team_id"];
  if (!apiKey || !teamId) {
    return { count: 0, error: "IVRy API key または team_id 未設定" };
  }
  try {
    // IVRy API想定エンドポイント (実際のAPI仕様に合わせて調整が必要)
    const url = `https://api.ivry.jp/v1/teams/${teamId}/calls?limit=100`;
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }
    });
    if (!resp.ok) return { count: 0, error: `HTTP ${resp.status}` };
    const data = (await resp.json()) as { calls: Array<Record<string, unknown>> };
    const calls = data.calls ?? [];
    let count = 0;
    for (const c of calls) {
      await saveCallLog({
        id: `ivry_${c["id"]}`,
        callDirection: (String(c["direction"] ?? "inbound") as CallDirection),
        fromNumber: String(c["from"] ?? ""),
        toNumber: String(c["to"] ?? ""),
        durationSeconds: Number(c["duration"] ?? 0),
        callStatus: (String(c["status"] ?? "answered") as CallStatus),
        recordingUrl: String(c["recording_url"] ?? ""),
        startedAt: String(c["started_at"] ?? ""),
        endedAt: String(c["ended_at"] ?? ""),
        ivryCallId: String(c["id"] ?? "")
      });
      count++;
    }
    await saveIntegrationSetting({
      ...setting,
      lastSyncAt: new Date().toISOString(),
      lastStatus: `${count}件取得`
    });
    return { count };
  } catch (e) {
    return { count: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

// IVRy 電話帳へ顧客/見込客をpush
export async function syncPhoneBookToIvry(
  setting: IntegrationSetting,
  contacts: Array<{ name: string; phone: string; customerCode?: string; note?: string }>
): Promise<{ synced: number; error?: string }> {
  const apiKey = setting.config["api_key"];
  const teamId = setting.config["team_id"];
  if (!apiKey || !teamId) {
    return { synced: 0, error: "IVRy API key または team_id 未設定" };
  }
  try {
    let synced = 0;
    for (const c of contacts) {
      if (!c.phone) continue;
      const resp = await fetch(`https://api.ivry.jp/v1/teams/${teamId}/contacts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          name: c.name,
          phone_number: c.phone,
          external_id: c.customerCode ?? "",
          note: c.note ?? ""
        })
      });
      if (resp.ok) synced++;
    }
    return { synced };
  } catch (e) {
    return { synced: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

// ─── リスト取得ツール (新規営業のリード獲得) ──────────────────────────────

export interface LeadList {
  id: string;
  name: string;
  query?: string;
  area?: string;
  businessType?: string;
  totalCount: number;
  source: "google_places" | "manual" | "csv" | "sample";
  createdAt?: string;
}

export interface LeadItem {
  id: string;
  listId: string;
  companyName: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  businessType?: string;
  rating?: number;
  reviewCount?: number;
  lat?: number;
  lng?: number;
  placeId?: string;
  status: "new" | "imported" | "excluded";
  convertedProspectId?: string;
  note?: string;
}

export async function fetchLeadLists(): Promise<LeadList[]> {
  const rows = await supabaseQuery<LooseRow>("lead_lists", { order: "created_at.desc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    name: getString(r, ["name"], ""),
    query: getString(r, ["query"], ""),
    area: getString(r, ["area"], ""),
    businessType: getString(r, ["business_type"], ""),
    totalCount: toNumber(r["total_count"]),
    source: (getString(r, ["source"], "manual") as LeadList["source"]),
    createdAt: getString(r, ["created_at"], "")
  }));
}

export async function fetchLeadItems(listId: string): Promise<LeadItem[]> {
  const rows = await supabaseQuery<LooseRow>("lead_items", {
    list_id: `eq.${listId}`,
    order: "rating.desc.nullslast"
  });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    listId: getString(r, ["list_id"], ""),
    companyName: getString(r, ["company_name"], ""),
    address: getString(r, ["address"], ""),
    phone: getString(r, ["phone"], ""),
    website: getString(r, ["website"], ""),
    email: getString(r, ["email"], ""),
    businessType: getString(r, ["business_type"], ""),
    rating: r["rating"] ? Number(r["rating"]) : undefined,
    reviewCount: toNumber(r["review_count"]),
    lat: r["lat"] ? Number(r["lat"]) : undefined,
    lng: r["lng"] ? Number(r["lng"]) : undefined,
    placeId: getString(r, ["place_id"], ""),
    status: (getString(r, ["status"], "new") as LeadItem["status"]),
    convertedProspectId: getString(r, ["converted_prospect_id"], ""),
    note: getString(r, ["note"], "")
  }));
}

export async function saveLeadList(list: LeadList): Promise<LeadList | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("lead_lists", {
    id: list.id,
    name: list.name,
    query: list.query || null,
    area: list.area || null,
    business_type: list.businessType || null,
    total_count: list.totalCount,
    source: list.source
  });
  return r ? list : null;
}

export async function saveLeadItem(item: LeadItem): Promise<LeadItem | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("lead_items", {
    id: item.id,
    list_id: item.listId,
    company_name: item.companyName,
    address: item.address || null,
    phone: item.phone || null,
    website: item.website || null,
    email: item.email || null,
    business_type: item.businessType || null,
    rating: item.rating ?? null,
    review_count: item.reviewCount ?? null,
    lat: item.lat ?? null,
    lng: item.lng ?? null,
    place_id: item.placeId || null,
    status: item.status,
    converted_prospect_id: item.convertedProspectId || null,
    note: item.note || null
  });
  return r ? item : null;
}

// Google Places Text Search でリスト取得
export async function searchPlaces(
  setting: IntegrationSetting,
  query: string,
  area: string
): Promise<{ results: LeadItem[]; error?: string }> {
  const apiKey = setting.config["api_key"];
  if (!apiKey) return { results: [], error: "Google Maps API key 未設定" };

  const fullQuery = `${query} ${area}`.trim();
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(fullQuery)}&language=ja&key=${apiKey}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) return { results: [], error: `HTTP ${resp.status}` };
    const data = (await resp.json()) as { results: Array<Record<string, unknown>>; status: string };
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      return { results: [], error: `API status: ${data.status}` };
    }
    const results: LeadItem[] = data.results.map((r) => {
      const geo = (r["geometry"] as { location?: { lat: number; lng: number } })?.location;
      return {
        id: `place_${r["place_id"]}`,
        listId: "",
        companyName: String(r["name"] ?? ""),
        address: String(r["formatted_address"] ?? ""),
        rating: r["rating"] ? Number(r["rating"]) : undefined,
        reviewCount: r["user_ratings_total"] ? Number(r["user_ratings_total"]) : undefined,
        lat: geo?.lat,
        lng: geo?.lng,
        placeId: String(r["place_id"] ?? ""),
        status: "new" as const
      };
    });
    return { results };
  } catch (e) {
    return { results: [], error: e instanceof Error ? e.message : String(e) };
  }
}

// リード → 見込客(prospect)へ変換
export async function convertLeadToProspect(item: LeadItem): Promise<Prospect | null> {
  const prospect: Prospect = {
    id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    companyName: item.companyName,
    phone: item.phone,
    address: item.address,
    lat: item.lat,
    lng: item.lng,
    businessType: item.businessType,
    stage: "cold",
    source: "リスト",
    expectedAmount: 100000,
    probability: 10,
    note: item.note ?? (item.rating ? `Google評価: ⭐${item.rating} (${item.reviewCount}件)` : "")
  };
  const saved = await saveProspect(prospect);
  if (saved) {
    await saveLeadItem({ ...item, status: "imported", convertedProspectId: prospect.id });
  }
  return saved;
}

// ─── 受注ワークフロー (DB版) ──────────────────────────────────────────────

export async function fetchWorkflowOrdersFromDb(): Promise<WorkflowOrder[]> {
  const rows = await supabaseQuery<LooseRow>("workflow_orders", { order: "order_date.desc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    orderNo: getString(r, ["order_no"], ""),
    customerName: getString(r, ["customer_name"], ""),
    customerCode: getString(r, ["customer_code"], ""),
    orderDate: getString(r, ["order_date"], ""),
    deliveryDate: getString(r, ["delivery_date"], ""),
    stage: (getString(r, ["stage"], "new") as WorkflowOrder["stage"]),
    totalAmount: toNumber(r["total_amount"]),
    itemCount: toNumber(r["item_count"]),
    priority: (getString(r, ["priority"], "normal") as WorkflowOrder["priority"]),
    staffName: getString(r, ["staff_name"], ""),
    notes: getString(r, ["notes"], "")
  }));
}

export async function saveWorkflowOrder(o: WorkflowOrder): Promise<WorkflowOrder | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("workflow_orders", {
    id: o.id,
    order_no: o.orderNo,
    customer_name: o.customerName,
    customer_code: o.customerCode || null,
    order_date: o.orderDate,
    delivery_date: o.deliveryDate || null,
    stage: o.stage,
    total_amount: o.totalAmount,
    item_count: o.itemCount,
    priority: o.priority,
    staff_name: o.staffName || null,
    notes: o.notes || null,
    updated_at: new Date().toISOString()
  });
  return r ? o : null;
}

// Workflow order 型定義 (既存のOrderWorkflow.tsと合わせる)
export interface WorkflowOrder {
  id: string;
  orderNo: string;
  customerName: string;
  customerCode?: string;
  orderDate: string;
  deliveryDate?: string;
  stage: "new" | "picking" | "packed" | "shipped" | "delivered";
  totalAmount: number;
  itemCount: number;
  priority: "normal" | "urgent";
  staffName?: string;
  notes?: string;
}

// ─── 蔵見学問合せ (DB版) ─────────────────────────────────────────────────

export async function fetchTourInquiriesFromDb(): Promise<TourInquiry[]> {
  const rows = await supabaseQuery<LooseRow>("tour_inquiries", { order: "created_at.desc" });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    name: getString(r, ["name"], ""),
    email: getString(r, ["email"], ""),
    phone: getString(r, ["phone"], ""),
    visitDate: getString(r, ["visit_date"], ""),
    partySize: toNumber(r["party_size"]) || 1,
    language: (getString(r, ["language"], "ja") as TourInquiry["language"]),
    purpose: getString(r, ["purpose"], ""),
    message: getString(r, ["message"], ""),
    status: (getString(r, ["status"], "new") as TourInquiry["status"]),
    repliedAt: getString(r, ["replied_at"], ""),
    confirmedTime: getString(r, ["confirmed_time"], ""),
    createdAt: getString(r, ["created_at"], new Date().toISOString())
  }));
}

export async function saveTourInquiry(t: TourInquiry): Promise<TourInquiry | null> {
  const { supabaseInsert } = await import("./supabase");
  const r = await supabaseInsert<LooseRow>("tour_inquiries", {
    id: t.id,
    name: t.name,
    email: t.email,
    phone: t.phone || null,
    visit_date: t.visitDate || null,
    party_size: t.partySize,
    language: t.language,
    purpose: t.purpose || null,
    message: t.message || null,
    status: t.status,
    replied_at: t.repliedAt || null,
    confirmed_time: t.confirmedTime || null
  });
  return r ? t : null;
}

// ── rawデータブラウザ ────────────────────────────────────

export type { RawTableInfo, RawRecord } from "./components/RawBrowser";

const RAW_TABLE_DEFS: { table: string; display: string }[] = [
  { table: "sake_sales_document_lines", display: "売上伝票明細" },
  { table: "sake_purchase_document_lines", display: "仕入伝票明細" },
  { table: "sake_sales_document_headers", display: "売上伝票ヘッダ" },
  { table: "sake_purchase_document_headers", display: "仕入伝票ヘッダ" },
  { table: "sake_inventory_movements_sk", display: "在庫移動(SK)" },
  { table: "sake_current_stock_sh", display: "在庫(SH)" },
  { table: "sake_inventory_movements_k5", display: "在庫移動(K5)" },
  { table: "sake_current_stock_h5", display: "在庫(H5)" },
  { table: "sake_special_prices_sh", display: "特価(SH)" },
  { table: "sake_products_sh", display: "商品(SH)" },
  { table: "sake_special_prices_h5", display: "特価(H5)" },
  { table: "sake_products_sk", display: "商品(SK)" },
  { table: "sake_products_k5", display: "商品(K5)" },
  { table: "sake_products_h5", display: "商品(H5)" },
  { table: "sake_customers", display: "得意先" },
  { table: "sake_suppliers", display: "仕入先" },
  { table: "sake_delivery_destinations", display: "納品先" },
  { table: "sake_trading_partners", display: "取引先" },
  { table: "sake_current_stock_sk", display: "在庫(SK)" },
];

export async function fetchRawTableList(): Promise<import("./components/RawBrowser").RawTableInfo[]> {
  const results = await Promise.all(
    RAW_TABLE_DEFS.map(async (def) => {
      const [count, latestRows] = await Promise.all([
        supabaseCount(def.table),
        supabaseQuery<{ _synced_at?: string }>(def.table, {
          select: "_synced_at",
          order: "_synced_at.desc",
          limit: "1"
        })
      ]);
      return {
        tableName: def.table,
        displayName: def.display,
        rowCount: count,
        lastSyncAt: latestRows[0]?._synced_at ?? null
      };
    })
  );
  return results.sort((a, b) => b.rowCount - a.rowCount);
}

export async function fetchRawRecords(
  table: string,
  page: number,
  pageSize = 100
): Promise<{ records: import("./components/RawBrowser").RawRecord[]; total: number }> {
  const offset = (page - 1) * pageSize;
  const [records, total] = await Promise.all([
    supabaseQuery<import("./components/RawBrowser").RawRecord>(table, {
      select: "_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",
      order: "_record_index.asc",
      limit: String(pageSize),
      offset: String(offset)
    }),
    supabaseCount(table)
  ]);
  return { records, total };
}

// ── 単価グループ / 特価検索 ─────────────────────────────

export async function fetchCustomerPriceGroup(customerCode: string): Promise<string> {
  const rows = await supabaseQuery<LooseRow>("customers", {
    select: "memo",
    or: `legacy_customer_code.eq.${customerCode},customer_code.eq.${customerCode}`,
    limit: "1"
  });
  if (rows.length === 0) return "";
  const memo = rows[0].memo;
  if (typeof memo === "string" && memo) {
    try {
      const parsed = JSON.parse(memo);
      return String(parsed.price_group ?? "");
    } catch {
      return "";
    }
  }
  return "";
}

interface SpecialPriceRow {
  special_price?: number | string | null;
}

interface ProductPriceRow {
  default_sale_price?: number | string | null;
}

export async function fetchProductPrice(
  priceGroup: string,
  productCode: string
): Promise<number> {
  // 1. 特価テーブルを優先
  if (priceGroup) {
    const specialRows = await supabaseQuery<SpecialPriceRow>("customer_product_prices", {
      select: "special_price",
      price_group: `eq.${priceGroup}`,
      legacy_product_code: `eq.${productCode}`,
      limit: "1"
    });
    if (specialRows.length > 0 && specialRows[0].special_price) {
      return toNumber(specialRows[0].special_price);
    }
  }

  // 2. 商品マスタの標準単価にフォールバック
  const productRows = await supabaseQuery<ProductPriceRow>("products", {
    select: "default_sale_price",
    or: `legacy_product_code.eq.${productCode},product_code.eq.${productCode}`,
    limit: "1"
  });
  if (productRows.length > 0 && productRows[0].default_sale_price) {
    return toNumber(productRows[0].default_sale_price);
  }

  return 0;
}
