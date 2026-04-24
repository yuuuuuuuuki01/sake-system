import { supabaseCount, supabaseInsert, supabaseQuery, supabaseQueryAll, supabaseRpc, supabaseUpdate } from "./supabase";
import type { TourInquiry } from "./components/BreweryTour";
export type { TourInquiry };

export type PipelineStatus = "success" | "warning" | "error" | "running";
export type PaymentState = "unpaid" | "partial" | "paid";
export type MasterTab = "customers" | "products";
export type AnalyticsTab = "products" | "customers" | "staff";
export type AnalyticsPeriod = "all" | "yearly" | "monthly" | "weekly" | "daily";
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
  email: string;
  staffCode: string;
  businessType: string;
  areaCode: string;
  salesCategory: string;
  closingDay: number;
  paymentDay: number;
  paymentMonth: number;
  paymentCycle: string;
  billingCycleType: string;
  billingCode: string;
  creditLimit: number;
  taxMode: string;
  taxRound: string;
  invoiceIssue: string;
  invoiceType: string;
  priceGroup: string;
  priceType: string;
  customerGroup1: string;
  customerGroup2: string;
  bankName: string;
  bankBranch: string;
  bankAccount: string;
  isActive: boolean;
  lat?: number;
  lng?: number;
}

export interface MasterProduct {
  id: string;
  code: string;
  janCode: string;
  name: string;
  kanaName: string;
  shortName: string;
  category: string;
  taxCategoryCode: string;
  isActive: boolean;
  listPrice: number;       // 定価（小売価格）
  purchasePrice: number;   // 仕入単価（生産者価格）
  salePrice: number;       // 卸価格（デフォルト売価）
  costPrice: number;       // 原価
  alcoholDegree: number | null;
  volumeMl: number | null;
  unit: string;
  bottleType: string;
  containerCode: string;
  polishRate: number | null;
  riceType: string;
  season: string;
  agingYears: number;
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
  lastDataAt: string;   // daily_sales_fact の最新データ日
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
  staffTotals: AnalyticsBreakdownRow[];
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
  lastDataAt: new Date().toISOString(),
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
  customerTotals: [],
  staffTotals: []
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
    ),
    staffTotals: []
  };
}


export async function fetchSalesSummary(): Promise<SalesSummary> {
  const salesRows = await supabaseQueryAll<DailySalesFactRow>("daily_sales_detail", {
    select: "sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",
    order: "sales_date.desc"
  });

  if (salesRows.length > 0) {
    const [paymentRows, headerRows] = await Promise.all([
      supabaseQuery<CustomerPaymentStatusRow>("customer_payment_status", {
        select: "legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"
      }),
      supabaseQuery<SalesDocumentHeaderRow>("sales_document_headers", {
        select: "id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",
        order: "sales_date.desc",
        limit: "500"
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

  console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり");
  return mockSalesSummary;
}

export async function fetchPaymentStatus(): Promise<PaymentStatusSummary> {
  const rows = await supabaseQueryAll<CustomerPaymentStatusRow>("customer_payment_status", {
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

  return mockPaymentStatus;
}

export async function fetchMasterStats(): Promise<MasterStatsSummary> {
  const [customerRows, productRows] = await Promise.all([
    supabaseQueryAll<LooseRow>("customers"),
    supabaseQueryAll<LooseRow>("products")
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
            email: getString(row, ["email"], ""),
            staffCode: getString(row, ["staff_code"], ""),
            businessType: getString(row, ["business_type"], ""),
            areaCode: getString(row, ["delivery_area_code"], ""),
            salesCategory: String(memo.sales_category ?? ""),
            closingDay: getNumber(row, ["closing_day", "close_day"], 31),
            paymentDay: getNumber(row, ["payment_day", "due_day"], 15),
            paymentMonth: Number(memo.payment_month ?? 0),
            paymentCycle: getString(row, ["payment_cycle"], ""),
            billingCycleType: getString(row, ["billing_cycle_type"], ""),
            billingCode: String(memo.billing_code ?? ""),
            creditLimit: getNumber(row, ["credit_limit"], 0),
            taxMode: getString(row, ["tax_mode"], ""),
            taxRound: String(memo.tax_round ?? ""),
            invoiceIssue: String(memo.invoice_issue ?? ""),
            invoiceType: getString(row, ["invoice_type"], ""),
            priceGroup: String(memo.price_group ?? ""),
            priceType: String(memo.price_type ?? ""),
            customerGroup1: String(memo.customer_group1 ?? ""),
            customerGroup2: String(memo.customer_group2 ?? ""),
            bankName: getString(row, ["bank_name"], ""),
            bankBranch: getString(row, ["bank_branch"], ""),
            bankAccount: getString(row, ["bank_account"], ""),
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
          kanaName: getString(row, ["kana_name"], ""),
          shortName: getString(row, ["short_name"], ""),
          category: getString(row, ["category", "category_name", "category_code"], "未分類"),
          taxCategoryCode: getString(row, ["tax_category_code"], ""),
          isActive: getBoolean(row, ["is_active", "active", "enabled"], true),
          listPrice: getNumber(row, ["list_price"], 0),
          purchasePrice: getNumber(row, ["purchase_price"], 0),
          salePrice: getNumber(row, ["default_sale_price", "sale_price"], 0),
          costPrice: getNumber(row, ["default_cost_price"], 0),
          alcoholDegree: row["alcohol_degree"] != null ? Number(row["alcohol_degree"]) : null,
          volumeMl: row["volume_ml"] != null ? Number(row["volume_ml"]) : null,
          unit: getString(row, ["unit"], "本"),
          bottleType: getString(row, ["bottle_type"], ""),
          containerCode: getString(row, ["container_code"], ""),
          polishRate: row["polish_rate"] != null ? Number(row["polish_rate"]) : null,
          riceType: getString(row, ["rice_type"], ""),
          season: getString(row, ["season"], ""),
          agingYears: getNumber(row, ["aging_years"], 0)
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

  return mockMasterStats;
}

export async function fetchPipelineMeta(): Promise<PipelineMeta> {
  const [rows, factRows] = await Promise.all([
    supabaseQuery<LooseRow>("relay_sync_log", {
      order: "sync_ended_at.desc.nullslast",
      limit: "1"
    }),
    supabaseQuery<LooseRow>("daily_sales_fact", {
      select: "sales_date",
      order: "sales_date.desc",
      limit: "1"
    })
  ]);
  const lastDataAt = factRows.length > 0
    ? getDateString(factRows[0] as LooseRow, ["sales_date"], new Date().toISOString())
    : new Date().toISOString();

  if (rows.length > 0) {
    const row = rows[0];
    const status = getString(row, ["status"], "success");
    const errors = row["errors"];
    const hasErrors = Array.isArray(errors) ? errors.length > 0 : Boolean(errors);
    return {
      generatedAt: new Date().toISOString(),
      lastSyncAt: getDateString(row, ["sync_ended_at", "sync_started_at"], new Date().toISOString()),
      lastDataAt,
      status: (hasErrors ? "warning" : status === "error" ? "error" : "success") as PipelineStatus,
      jobName: getString(row, ["agent_hostname"], "sake-relay"),
      message: `${getNumber(row, ["rows_upserted"], 0)}行同期 / ${getNumber(row, ["files_updated"], 0)}ファイル更新`
    };
  }
  return { ...mockPipelineMeta, lastDataAt };
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
  const params: Record<string, string> = {
    select: "id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",
    order: "sales_date.desc",
    limit: "500"
  };
  if (filter.startDate && filter.endDate) {
    params["and"] = `(sales_date.gte.${filter.startDate},sales_date.lte.${filter.endDate})`;
  } else if (filter.startDate) {
    params["sales_date"] = `gte.${filter.startDate}`;
  } else if (filter.endDate) {
    params["sales_date"] = `lte.${filter.endDate}`;
  }
  const orClauses: string[] = [];
  if (filter.customerCode.trim()) orClauses.push(`customer_code.ilike.*${filter.customerCode.trim()}*`, `legacy_customer_code.ilike.*${filter.customerCode.trim()}*`);
  if (filter.documentNo.trim()) orClauses.push(`document_no.ilike.*${filter.documentNo.trim()}*`, `legacy_document_no.ilike.*${filter.documentNo.trim()}*`);
  if (orClauses.length > 0) params["or"] = `(${orClauses.join(",")})`;

  const rows = await supabaseQuery<LooseRow>("mv_invoice_with_line_count", params);

  if (rows.length > 0) {
    return rows.map((row, index) => ({
      id: getString(row, ["id"], `invoice-${index}`),
      documentNo: getString(row, ["document_no", "legacy_document_no"], ""),
      date: getDateString(row, ["sales_date"], ""),
      customerCode: getString(row, ["legacy_customer_code", "customer_code"], ""),
      customerName: getString(row, ["customer_name", "legacy_customer_code"], ""),
      itemCount: getNumber(row, ["line_count"], 0),
      amount: getNumber(row, ["total_amount", "billed_amount"], 0)
    }));
  }

  return [];
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
  const [monthlyRows, customerRows, productRows, staffRows] = await Promise.all([
    supabaseQuery<LooseRow>("mv_monthly_sales", { order: "month.asc" }),
    supabaseQuery<LooseRow>("mv_customer_sales_totals", { order: "amount.desc", limit: "100" }),
    supabaseQuery<LooseRow>("mv_product_sales_totals", { order: "amount.desc", limit: "100" }),
    supabaseQuery<LooseRow>("mv_staff_sales_totals", { order: "amount.desc", limit: "50" })
  ]);

  if (monthlyRows.length > 0) {
    return {
      generatedAt: new Date().toISOString(),
      monthlySales: monthlyRows.slice(-12).map((r) => ({
        month: getString(r, ["month"], ""),
        amount: getNumber(r, ["amount"], 0)
      })),
      productTotals: productRows.map((r) => ({
        code: getString(r, ["code"], ""),
        name: getString(r, ["name"], ""),
        amount: getNumber(r, ["amount"], 0),
        quantity: getNumber(r, ["quantity"], 0),
        documents: getNumber(r, ["documents"], 0)
      })),
      customerTotals: customerRows.map((r) => ({
        code: getString(r, ["code"], ""),
        name: getString(r, ["name"], ""),
        amount: getNumber(r, ["amount"], 0),
        quantity: getNumber(r, ["quantity"], 0),
        documents: getNumber(r, ["documents"], 0)
      })),
      staffTotals: staffRows.map((r) => ({
        code: getString(r, ["code"], ""),
        name: getString(r, ["name"], ""),
        amount: getNumber(r, ["amount"], 0),
        quantity: getNumber(r, ["quantity"], 0),
        documents: getNumber(r, ["documents"], 0)
      }))
    };
  }

  return mockSalesAnalytics;
}

export interface PeriodBreakdownRow {
  code: string;
  name: string;
  period: string;
  amount: number;
  quantity: number;
  documents: number;
}

// 期間フィルタ付き商品・得意先集計 — RPC ベースに統一（ビュー不要）
export async function fetchAnalyticsByPeriod(
  tab: AnalyticsTab,
  period: AnalyticsPeriod,
  periodFilter?: string
): Promise<AnalyticsBreakdownRow[]> {
  if (period === "all") return [];
  const range = periodFilter ? periodToDateRange(period, periodFilter) : null;
  const rpcName = tab === "customers"
    ? "get_customer_totals_by_period"
    : "get_product_totals_by_period";
  const result = await supabaseRpc<LooseRow[]>(rpcName, {
    p_date_from: range?.from ?? null,
    p_date_to:   range?.to   ?? null
  });
  if (!result) return [];
  return result.map((r) => ({
    code:      getString(r, ["code"],      ""),
    name:      getString(r, ["name"],      ""),
    amount:    getNumber(r, ["amount"],    0),
    quantity:  getNumber(r, ["quantity"],  0),
    documents: getNumber(r, ["documents"], 0)
  }));
}

export async function fetchAvailablePeriods(
  _tab: AnalyticsTab,
  period: AnalyticsPeriod
): Promise<string[]> {
  if (period === "all") return [];
  // get_available_periods RPC: daily_sales_fact から期間一覧を返す
  const result = await supabaseRpc<{ period_val: string }[]>("get_available_periods", {
    p_type: period
  });
  if (!result || result.length === 0) return [];
  return result.map((r) => r.period_val).filter(Boolean);
}

/** 期間文字列 → 日付範囲に変換 */
export function periodToDateRange(
  period: AnalyticsPeriod,
  periodFilter: string
): { from: string; to: string } | null {
  if (period === "all" || !periodFilter) return null;
  if (period === "daily") {
    return { from: periodFilter, to: periodFilter };
  }
  if (period === "monthly") {
    const [year, month] = periodFilter.split("-").map(Number);
    const from = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const to = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    return { from, to };
  }
  if (period === "yearly") {
    return { from: `${periodFilter}-01-01`, to: `${periodFilter}-12-31` };
  }
  if (period === "weekly") {
    const match = periodFilter.match(/^(\d{4})-W(\d{2})$/);
    if (!match) return null;
    const year = parseInt(match[1]);
    const week = parseInt(match[2]);
    const jan4 = new Date(year, 0, 4);
    const dow = jan4.getDay() || 7;
    const week1Mon = new Date(jan4);
    week1Mon.setDate(jan4.getDate() - dow + 1);
    const start = new Date(week1Mon);
    start.setDate(week1Mon.getDate() + (week - 1) * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { from: start.toISOString().slice(0, 10), to: end.toISOString().slice(0, 10) };
  }
  return null;
}

export interface StaffBreakdownRow {
  staffCode: string;
  staffName: string;
  code: string;
  name: string;
  tag: string;
  amount: number;
  quantity: number;
  documents: number;
}

function mapStaffRows(rows: LooseRow[]): StaffBreakdownRow[] {
  return rows.map((r) => ({
    staffCode: getString(r, ["staff_code"], ""),
    staffName: getString(r, ["staff_name"], ""),
    code: getString(r, ["code"], ""),
    name: getString(r, ["name"], ""),
    tag: getString(r, ["tag"], ""),
    amount: getNumber(r, ["amount"], 0),
    quantity: getNumber(r, ["quantity"], 0),
    documents: getNumber(r, ["documents"], 0)
  }));
}

export async function fetchStaffTotalsByPeriod(
  dateFrom?: string,
  dateTo?: string
): Promise<AnalyticsBreakdownRow[]> {
  const result = await supabaseRpc<LooseRow[]>("get_staff_totals_by_period", {
    p_date_from: dateFrom ?? null,
    p_date_to: dateTo ?? null
  });
  if (!result) return [];
  return result.map((r) => ({
    code: getString(r, ["code"], ""),
    name: getString(r, ["name"], ""),
    amount: getNumber(r, ["amount"], 0),
    quantity: getNumber(r, ["quantity"], 0),
    documents: getNumber(r, ["documents"], 0)
  }));
}

export async function fetchStaffCustomerBreakdown(
  staffCode: string,
  dateFrom?: string,
  dateTo?: string
): Promise<StaffBreakdownRow[]> {
  const result = await supabaseRpc<LooseRow[]>("get_staff_customer_breakdown", {
    p_staff_code: staffCode,
    p_date_from: dateFrom ?? null,
    p_date_to: dateTo ?? null
  });
  if (!result) return [];
  return mapStaffRows(result);
}

export async function fetchStaffProductBreakdown(
  staffCode: string,
  dateFrom?: string,
  dateTo?: string
): Promise<StaffBreakdownRow[]> {
  const result = await supabaseRpc<LooseRow[]>("get_staff_product_breakdown", {
    p_staff_code: staffCode,
    p_date_from: dateFrom ?? null,
    p_date_to: dateTo ?? null
  });
  if (!result) return [];
  return mapStaffRows(result);
}

// ─── 期間別チャートデータ ──────────────────────────────────────────────────────

export async function fetchPeriodChartData(
  period: AnalyticsPeriod,
  periodFilter: string
): Promise<{ month: string; amount: number }[]> {
  if (period === "all" || !periodFilter) return [];
  const result = await supabaseRpc<LooseRow[]>("get_period_chart_data", {
    p_period: period,
    p_filter: periodFilter
  });
  if (!result) return [];
  return result.map(r => ({
    month: getString(r, ["label"], ""),
    amount: getNumber(r, ["amount"], 0)
  }));
}

// ─── 分析ドリルダウン ─────────────────────────────────────────────────────────

export interface DrilldownBreakdownRow {
  code: string;
  name: string;
  tag: string;
  amount: number;
  quantity: number;
  documents: number;
}

export async function fetchCustomerProductBreakdown(
  customerCode: string, dateFrom?: string, dateTo?: string
): Promise<DrilldownBreakdownRow[]> {
  const result = await supabaseRpc<LooseRow[]>("get_customer_product_breakdown", {
    p_customer_code: customerCode,
    p_date_from: dateFrom ?? null, p_date_to: dateTo ?? null
  });
  if (!result) return [];
  return result.map(r => ({
    code: getString(r, ["code"], ""), name: getString(r, ["name"], ""),
    tag: getString(r, ["tag"], ""), amount: getNumber(r, ["amount"], 0),
    quantity: getNumber(r, ["quantity"], 0), documents: getNumber(r, ["documents"], 0)
  }));
}

export async function fetchProductCustomerBreakdown(
  productCode: string, dateFrom?: string, dateTo?: string
): Promise<DrilldownBreakdownRow[]> {
  const result = await supabaseRpc<LooseRow[]>("get_product_customer_breakdown", {
    p_product_code: productCode,
    p_date_from: dateFrom ?? null, p_date_to: dateTo ?? null
  });
  if (!result) return [];
  return result.map(r => ({
    code: getString(r, ["code"], ""), name: getString(r, ["name"], ""),
    tag: getString(r, ["tag"], ""), amount: getNumber(r, ["amount"], 0),
    quantity: getNumber(r, ["quantity"], 0), documents: getNumber(r, ["documents"], 0)
  }));
}

export async function fetchEntityMonthlySales(
  code: string, type: "customer" | "product"
): Promise<{ month: string; amount: number }[]> {
  const result = await supabaseRpc<LooseRow[]>("get_entity_monthly_sales", {
    p_code: code, p_type: type
  });
  if (!result) return [];
  return result.map(r => ({
    month: getString(r, ["month"], ""),
    amount: getNumber(r, ["amount"], 0)
  }));
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
  documentNo: "", invoiceDate: "", customerCode: "", customerName: "",
  customerAddress: "", lines: [], totalAmount: 0, taxAmount: 0, note: ""
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
  targetYearMonth: "", closingDay: 31, totalBilling: 0, customers: []
};

export async function fetchBillingSummary(yearMonth: string): Promise<BillingSummary> {
  const rows = await supabaseQuery<LooseRow>("mv_billing_summary", {
    year_month: `eq.${yearMonth}`,
    order: "sales_amount.desc"
  });

  if (rows.length > 0) {
    const customers: BillingCustomer[] = rows.map((r) => {
      const salesAmount = getNumber(r, ["sales_amount"], 0);
      const taxAmount = getNumber(r, ["tax_amount"], 0);
      return {
        customerCode: getString(r, ["customer_code"], ""),
        customerName: getString(r, ["customer_name"], ""),
        closingDay: 31,
        salesAmount,
        taxAmount,
        prevBalance: 0,
        paymentAmount: 0,
        billingAmount: salesAmount,
        status: "open" as const
      };
    });
    const totalBilling = customers.reduce((s, c) => s + c.billingAmount, 0);
    return { targetYearMonth: yearMonth, closingDay: 31, totalBilling, customers };
  }

  return { ...mockBilling, targetYearMonth: yearMonth } as BillingSummary;
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
  generatedAt: new Date().toISOString(),
  months: [],
  salesByProduct: [],
  salesByCustomer: [],
  costSimulation: []
};

export async function fetchSalesReport(): Promise<SalesReport> {
  const [monthlyRows, productMonthlyRows, customerRows] = await Promise.all([
    supabaseQuery<LooseRow>("mv_monthly_sales", { order: "month.asc" }),
    supabaseQuery<LooseRow>("mv_product_monthly_shipments", { order: "code.asc,month.asc" }),
    supabaseQuery<LooseRow>("mv_customer_sales_totals", { order: "amount.desc", limit: "10" })
  ]);

  if (monthlyRows.length === 0) return mockReport;

  const months = monthlyRows.slice(-12).map((r) => getString(r, ["month"], ""));

  // 商品別月次データをピボット
  const productMap = new Map<string, { name: string; monthValues: Map<string, number> }>();
  productMonthlyRows.forEach((r) => {
    const code = getString(r, ["code"], "");
    if (!productMap.has(code)) {
      productMap.set(code, { name: getString(r, ["name"], code), monthValues: new Map() });
    }
    productMap.get(code)!.monthValues.set(getString(r, ["month"], ""), getNumber(r, ["amount"], 0));
  });

  // 上位10商品のみ
  const productTotals = Array.from(productMap.entries())
    .map(([code, data]) => ({
      code,
      name: data.name,
      total: months.reduce((s, m) => s + (data.monthValues.get(m) ?? 0), 0),
      monthValues: data.monthValues
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const salesByProduct = productTotals.map((p) => ({
    label: p.name,
    values: months.map((m) => p.monthValues.get(m) ?? 0)
  }));

  const salesByCustomer = customerRows.map((r) => ({
    label: getString(r, ["name"], ""),
    values: months.map(() => Math.round(getNumber(r, ["amount"], 0) / months.length))
  }));

  return {
    generatedAt: new Date().toISOString(),
    months,
    salesByProduct,
    salesByCustomer,
    costSimulation: []
  };
}

// ─── 需要予測用: 商品×月別出荷量 ──────────────────────────────────────────────

export interface ProductMonthlyShipment {
  code: string;
  name: string;
  monthlyQuantity: number[]; // index 0=Jan ... 11=Dec (数量)
  monthlyAmount: number[];   // index 0=Jan ... 11=Dec (金額)
  totalQuantity: number;
  totalAmount: number;
}

export async function fetchProductMonthlyShipments(): Promise<ProductMonthlyShipment[]> {
  const rows = await supabaseQueryAll<LooseRow>("mv_product_monthly_shipments", {
    order: "code.asc,month.asc"
  });

  if (rows.length === 0) return [];

  // ピボット: code → { name, qty[12], amt[12] }
  const productMap = new Map<string, { name: string; qty: number[]; amt: number[] }>();

  rows.forEach((r) => {
    const code = getString(r, ["code"], "");
    if (!code) return;
    const month = getString(r, ["month"], "");
    const monthIdx = parseInt(month.slice(5, 7)) - 1;
    if (monthIdx < 0 || monthIdx > 11) return;

    let entry = productMap.get(code);
    if (!entry) {
      entry = { name: getString(r, ["name"], code), qty: new Array(12).fill(0), amt: new Array(12).fill(0) };
      productMap.set(code, entry);
    }
    entry.qty[monthIdx] += getNumber(r, ["quantity"], 0);
    entry.amt[monthIdx] += getNumber(r, ["amount"], 0);
  });

  return Array.from(productMap.entries())
    .map(([code, data]) => ({
      code,
      name: data.name,
      monthlyQuantity: data.qty,
      monthlyAmount: data.amt,
      totalQuantity: data.qty.reduce((s, v) => s + v, 0),
      totalAmount: data.amt.reduce((s, v) => s + v, 0)
    }))
    .filter((p) => p.totalQuantity > 0)
    .sort((a, b) => b.totalAmount - a.totalAmount);
}

// ─── 需要予測（DB計算済み）─────────────────────────────────────────────────────

export interface DemandForecastRow {
  productCode: string;
  productName: string;
  forecastMonth: string;
  segment: string;
  avgMonthly: number;
  forecastQuantity: number;
  forecastAmount: number;
  safetyStock: number;
  calculatedAt: string;
}

export async function fetchDemandForecasts(): Promise<DemandForecastRow[]> {
  const rows = await supabaseQuery<LooseRow>("product_demand_forecasts", {
    order: "forecast_amount.desc"
  });
  return rows.map((r) => ({
    productCode: getString(r, ["product_code"], ""),
    productName: getString(r, ["product_name"], ""),
    forecastMonth: getString(r, ["forecast_month"], ""),
    segment: getString(r, ["segment"], "monthly"),
    avgMonthly: getNumber(r, ["avg_monthly"], 0),
    forecastQuantity: getNumber(r, ["forecast_quantity"], 0),
    forecastAmount: getNumber(r, ["forecast_amount"], 0),
    safetyStock: getNumber(r, ["safety_stock"], 0),
    calculatedAt: getDateString(r, ["calculated_at"], "")
  }));
}

// ─── 納品カレンダー用: 直近の伝票から納品予定を構築 ─────────────────────────────

export interface DeliveryScheduleEntry {
  date: string;
  customerName: string;
  productName: string;
  quantity: number;
  documentNo: string;
}

export async function fetchDeliverySchedule(): Promise<DeliveryScheduleEntry[]> {
  // 直近3ヶ月の伝票から納品実績/予定を取得
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 1);
  const cutoffDate = threeMonthsAgo.toISOString().slice(0, 10);

  const headers = await supabaseQueryAll<SalesDocumentHeaderRow>("sales_document_headers", {
    select: "id,document_no,legacy_document_no,sales_date,document_date,customer_name",
    order: "sales_date.desc",
    sales_date: `gte.${cutoffDate}`
  });

  if (headers.length === 0) return [];

  const headerIds = headers.map((h) => String(h.id)).filter(Boolean);
  // lineを取得（header_idで絞る）
  const lines = await supabaseQueryAll<SalesDocumentLineRow>("sales_document_lines", {
    select: "header_id,document_header_id,product_name,quantity"
  });

  // headerIdマップ
  const headerMap = new Map<string, SalesDocumentHeaderRow>();
  headers.forEach((h) => {
    if (h.id) headerMap.set(String(h.id), h);
  });

  const entries: DeliveryScheduleEntry[] = [];
  lines.forEach((line) => {
    const headerId = String(line.header_id ?? line.document_header_id ?? "");
    const header = headerMap.get(headerId);
    if (!header) return;
    const date = header.sales_date ?? header.document_date ?? "";
    if (!date || date < cutoffDate) return;

    entries.push({
      date: date.slice(0, 10),
      customerName: header.customer_name ?? "不明",
      productName: line.product_name ?? "不明",
      quantity: toNumber(line.quantity),
      documentNo: header.document_no ?? header.legacy_document_no ?? ""
    });
  });

  return entries.sort((a, b) => a.date.localeCompare(b.date));
}

// ─── システムお知らせ ────────────────────────────────────────────────────────

export interface SystemAnnouncement {
  id: string;
  message: string;
  level: "info" | "warning" | "maintenance" | "update";
  startsAt: string;
  endsAt: string | null;
  dismissible: boolean;
}

export async function fetchAnnouncements(): Promise<SystemAnnouncement[]> {
  const now = new Date().toISOString();
  const rows = await supabaseQuery<LooseRow>("system_announcements", {
    is_active: "eq.true",
    starts_at: `lte.${now}`,
    or: `(ends_at.is.null,ends_at.gte.${now})`,
    order: "created_at.desc"
  });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    message: getString(r, ["message"], ""),
    level: getString(r, ["level"], "info") as SystemAnnouncement["level"],
    startsAt: getDateString(r, ["starts_at"], ""),
    endsAt: r["ends_at"] ? getDateString(r, ["ends_at"], "") : null,
    dismissible: getBoolean(r, ["dismissible"], true)
  }));
}

// ─── 事前計算テーブルから読み取る営業分析API ────────────────────────────────────

export interface ChurnAlertRow {
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
}

export async function fetchChurnAlerts(): Promise<ChurnAlertRow[]> {
  // 全アクティブ顧客を取得（離反・休眠・下落中の判定をクライアントで行う）
  const rows = await supabaseQueryAll<LooseRow>("customer_sales_summary", {
    select: "customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",
    amount_12m: "gt.0",
    order: "amount_12m.desc"
  });
  if (rows.length > 0) {
    return rows.map((r) => ({
      customer_code: getString(r, ["customer_code"], ""),
      customer_name: getString(r, ["customer_name"], ""),
      business_type: getString(r, ["business_type"], ""),
      area_code: getString(r, ["area_code"], ""),
      phone: getString(r, ["phone"], ""),
      last_order_date: getString(r, ["last_order_date"], ""),
      days_since_order: getNumber(r, ["days_since_order"], 0),
      amount_12m: getNumber(r, ["amount_12m"], 0),
      amount_3m: getNumber(r, ["amount_3m"], 0),
      amount_this_month: getNumber(r, ["amount_this_month"], 0),
      amount_last_year_same_month: getNumber(r, ["amount_last_year_same_month"], 0),
      annual_revenue: getNumber(r, ["annual_revenue"], 0),
      is_dormant: getBoolean(r, ["is_dormant"], false),
      is_at_risk: getBoolean(r, ["is_at_risk"], false)
    }));
  }
  return [];
}

export interface VisitPriorityRow {
  customer_code: string;
  customer_name: string;
  phone: string;
  address: string;
  area_code: string;
  business_type: string;
  priority_score: number;
  reasons: string[];
  last_order_date: string;
  days_since_order: number;
  annual_revenue: number;
  recommended_action: string;
}

export async function fetchVisitPriorities(): Promise<VisitPriorityRow[]> {
  const rows = await supabaseQueryAll<LooseRow>("visit_priority", {
    select: "customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",
    order: "priority_score.desc"
  });
  return rows.map((r) => ({
    customer_code: getString(r, ["customer_code"], ""),
    customer_name: getString(r, ["customer_name"], ""),
    phone: getString(r, ["phone"], ""),
    address: getString(r, ["address"], ""),
    area_code: getString(r, ["area_code"], ""),
    business_type: getString(r, ["business_type"], ""),
    priority_score: getNumber(r, ["priority_score"], 0),
    reasons: Array.isArray(r["reasons"]) ? (r["reasons"] as string[]) : [],
    last_order_date: getString(r, ["last_order_date"], ""),
    days_since_order: getNumber(r, ["days_since_order"], 0),
    annual_revenue: getNumber(r, ["annual_revenue"], 0),
    recommended_action: getString(r, ["recommended_action"], "")
  }));
}

export interface SeasonalProfileRow {
  product_code: string;
  product_name: string;
  season_type: string;
  peak_months: number[];
  proposal_month: number | null;
  avg_monthly_qty: number;
}

export async function fetchSeasonalProfiles(): Promise<SeasonalProfileRow[]> {
  const rows = await supabaseQueryAll<LooseRow>("product_seasonal_profile", {
    select: "product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"
  });
  return rows.map((r) => ({
    product_code: getString(r, ["product_code"], ""),
    product_name: getString(r, ["product_name"], ""),
    season_type: getString(r, ["season_type"], "year-round"),
    peak_months: Array.isArray(r["peak_months"]) ? (r["peak_months"] as number[]) : [],
    proposal_month: r["proposal_month"] != null ? Number(r["proposal_month"]) : null,
    avg_monthly_qty: getNumber(r, ["avg_monthly_qty"], 0)
  }));
}

export async function fetchProductShipmentsFromTable(): Promise<ProductMonthlyShipment[]> {
  const rows = await supabaseQueryAll<LooseRow>("product_monthly_shipments", {
    select: "product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",
    order: "total_amount.desc"
  });
  return rows.map((r) => ({
    code: getString(r, ["product_code"], ""),
    name: getString(r, ["product_name"], ""),
    monthlyQuantity: [
      getNumber(r, ["m01"], 0), getNumber(r, ["m02"], 0), getNumber(r, ["m03"], 0),
      getNumber(r, ["m04"], 0), getNumber(r, ["m05"], 0), getNumber(r, ["m06"], 0),
      getNumber(r, ["m07"], 0), getNumber(r, ["m08"], 0), getNumber(r, ["m09"], 0),
      getNumber(r, ["m10"], 0), getNumber(r, ["m11"], 0), getNumber(r, ["m12"], 0)
    ],
    monthlyAmount: [0,0,0,0,0,0,0,0,0,0,0,0],
    totalQuantity: getNumber(r, ["total_quantity"], 0),
    totalAmount: getNumber(r, ["total_amount"], 0)
  })).filter((p) => p.totalQuantity > 0);
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

// ─── 価格テーブル ───────────────────────────────────────────────────────────
// 価格優先順位:
//   1. customer_product_prices (個別単価)
//   2. price_type別の標準価格:
//      000 → purchase_price (生産者価格)
//      001 → list_price (小売価格)
//      002 → default_sale_price (卸価格)
//   3. default_sale_price (フォールバック)

export type PriceType = "000" | "001" | "002" | "";

export interface CustomerPricing {
  priceType: PriceType;
  priceGroup: string;
  individualPrices: Map<string, number>;
}

export async function fetchCustomerPricing(customers: MasterCustomer[], customerCode: string): Promise<CustomerPricing> {
  const c = customers.find((cust) => cust.code === customerCode);
  const priceType = (c?.priceGroup ? "" : "") as PriceType; // fallback
  const priceGroup = c?.priceGroup || customerCode;

  // memoからprice_typeを取得（フロントではpriceGroupフィールドに格納）
  // 実際のprice_typeはSupabaseから取得
  let actualPriceType: PriceType = "";
  try {
    const rows = await supabaseQuery<{ memo: string }>( "customers", {
      select: "memo", legacy_customer_code: `eq.${customerCode}`, limit: "1"
    });
    if (rows[0]?.memo) {
      const memo = typeof rows[0].memo === "string" ? JSON.parse(rows[0].memo) : rows[0].memo;
      actualPriceType = (memo?.price_type ?? "") as PriceType;
    }
  } catch { /* ignore */ }

  // 個別単価を取得
  const individualPrices = new Map<string, number>();
  if (priceGroup) {
    const rows = await supabaseQuery<{ legacy_product_code: string; special_price: number }>(
      "customer_product_prices",
      { price_group: `eq.${priceGroup}`, select: "legacy_product_code,special_price" }
    );
    for (const r of rows) {
      individualPrices.set(r.legacy_product_code, r.special_price);
    }
  }

  return { priceType: actualPriceType, priceGroup, individualPrices };
}

export function resolveProductPrice(product: MasterProduct, pricing: CustomerPricing): { price: number; label: string } {
  // 1. 個別単価
  const individual = pricing.individualPrices.get(product.code);
  if (individual != null && individual > 0) {
    return { price: individual, label: "個別単価" };
  }
  // 2. price_type別の標準価格
  switch (pricing.priceType) {
    case "000":
      if (product.purchasePrice > 0) return { price: product.purchasePrice, label: "生産者価格" };
      break;
    case "001":
      if (product.listPrice > 0) return { price: product.listPrice, label: "小売価格" };
      break;
    case "002":
      if (product.salePrice > 0) return { price: product.salePrice, label: "卸価格" };
      break;
  }
  // 3. フォールバック
  return { price: product.salePrice || 0, label: "標準価格" };
}

// ─── 商品力・営業効率 ───────────────────────────────────────────────────────

export interface ProductPower {
  code: string; name: string; volumeMl: number | null; category: string;
  yearAmount: number; yearQty: number;
  recentAmount: number; recentQty: number; prevAmount: number;
  sharePct: number; growthRate: number | null; rank: string;
}

export interface CustomerEfficiency {
  code: string; name: string; address: string;
  yearAmount: number; sharePct: number;
  recentAmount: number; recentQty: number; orderDays: number;
  prevAmount: number; growthRate: number | null;
  currentRank: string; prevRank: string;
}

export async function fetchProductPower(): Promise<ProductPower[]> {
  const rows = await supabaseQuery<Record<string, unknown>>("product_power", {
    select: "legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",
    order: "year_amount.desc", limit: "100"
  });
  return rows.map((r) => ({
    code: String(r.legacy_product_code ?? ""),
    name: String(r.product_name ?? ""),
    volumeMl: r.volume_ml ? Number(r.volume_ml) : null,
    category: String(r.category_code ?? ""),
    yearAmount: Number(r.year_amount ?? 0),
    yearQty: Number(r.year_qty ?? 0),
    recentAmount: Number(r.recent_amount ?? 0),
    recentQty: Number(r.recent_qty ?? 0),
    prevAmount: Number(r.prev_amount ?? 0),
    sharePct: Number(r.share_pct ?? 0),
    growthRate: r.growth_rate != null ? Number(r.growth_rate) : null,
    rank: String(r.rank ?? "C")
  }));
}

export interface ProductDailyRow {
  date: string;
  productCode: string;
  productName: string;
  volumeMl: number | null;
  amount: number;
  qty: number;
}

export async function fetchProductDaily(): Promise<ProductDailyRow[]> {
  const rows = await supabaseQueryAll<Record<string, unknown>>("product_daily", {
    select: "sales_date,legacy_product_code,product_name,volume_ml,amount,qty",
    order: "sales_date.desc"
  });
  return rows.map((r) => ({
    date: String(r.sales_date ?? ""),
    productCode: String(r.legacy_product_code ?? ""),
    productName: String(r.product_name ?? ""),
    volumeMl: r.volume_ml ? Number(r.volume_ml) : null,
    amount: Number(r.amount ?? 0),
    qty: Number(r.qty ?? 0)
  }));
}

export async function fetchCustomerEfficiency(): Promise<CustomerEfficiency[]> {
  const rows = await supabaseQuery<Record<string, unknown>>("customer_efficiency", {
    select: "legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",
    order: "year_amount.desc", limit: "100"
  });
  return rows.map((r) => ({
    code: String(r.legacy_customer_code ?? ""),
    name: String(r.customer_name ?? ""),
    address: String(r.address1 ?? ""),
    yearAmount: Number(r.year_amount ?? 0),
    sharePct: Number(r.share_pct ?? 0),
    recentAmount: Number(r.recent_amount ?? 0),
    recentQty: Number(r.recent_qty ?? 0),
    orderDays: Number(r.order_days ?? 0),
    prevAmount: Number(r.prev_amount ?? 0),
    growthRate: r.growth_rate != null ? Number(r.growth_rate) : null,
    currentRank: String(r.current_rank ?? "C"),
    prevRank: String(r.prev_rank ?? "")
  }));
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
  const [abcRows, report] = await Promise.all([
    supabaseQuery<LooseRow>("mv_customer_abc", { order: "amount.desc" }),
    fetchSalesReport()
  ]);

  const ranking: CustomerRankRow[] = abcRows.map((r) => ({
    code: getString(r, ["code"], ""),
    name: getString(r, ["name"], ""),
    amount: getNumber(r, ["amount"], 0),
    documents: getNumber(r, ["documents"], 0),
    ratio: getNumber(r, ["ratio"], 0),
    cumRatio: getNumber(r, ["cum_ratio"], 0),
    abcRank: (getString(r, ["abc_rank"], "C") as "A" | "B" | "C")
  }));

  return {
    generatedAt: new Date().toISOString(),
    ranking,
    months: report.months,
    monthlyByCustomer: report.salesByCustomer
  };
}

export async function fetchProductABC(): Promise<ProductABCData> {
  const [abcRows, report] = await Promise.all([
    supabaseQuery<LooseRow>("mv_product_abc", { order: "amount.desc" }),
    fetchSalesReport()
  ]);

  const ranking: ProductRankRow[] = abcRows.map((r) => ({
    code: getString(r, ["code"], ""),
    name: getString(r, ["name"], ""),
    amount: getNumber(r, ["amount"], 0),
    quantity: getNumber(r, ["quantity"], 0),
    ratio: getNumber(r, ["ratio"], 0),
    cumRatio: getNumber(r, ["cum_ratio"], 0),
    abcRank: (getString(r, ["abc_rank"], "C") as "A" | "B" | "C")
  }));

  const totalAmount = ranking.reduce((s, r) => s + r.amount, 0);
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


export async function fetchJikomiList(): Promise<JikomiRecord[]> {
  const rows = await supabaseQuery<LooseRow>("brewing_batches", { order: "start_date.desc" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: getString(row, ["id"], ""),
      jikomiNo: getString(row, ["batch_no", "legacy_batch_no"], ""),
      productName: getString(row, ["brand_name"], ""),
      riceType: getString(row, ["rice_type"], ""),
      plannedKg: getNumber(row, ["planned_rice_kg"], 0),
      actualKg: getNumber(row, ["actual_rice_kg"], 0),
      startDate: getDateString(row, ["start_date"], ""),
      expectedDoneDate: getDateString(row, ["expected_done_date"], ""),
      status: (getString(row, ["status"], "planned") as JikomiStatus),
      tankNo: getString(row, ["tank_no"], ""),
      note: getString(row, ["remarks"], "")
    }));
  }
  return [];
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


export async function fetchTankList(): Promise<TankRecord[]> {
  const rows = await supabaseQuery<LooseRow>("tanks", { order: "tank_no.asc" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: getString(row, ["id"], ""),
      tankNo: getString(row, ["tank_no"], ""),
      capacity: getNumber(row, ["capacity_l"], 0),
      currentVolume: getNumber(row, ["current_volume_l"], 0),
      productName: getString(row, ["current_product_code"], ""),
      jikomiNo: getString(row, ["current_batch_id"], ""),
      status: (getString(row, ["status"], "empty") as TankRecord["status"]),
      lastUpdated: getDateString(row, ["last_updated_at"], "")
    }));
  }
  return [];
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


export async function fetchKenteiList(): Promise<KenteiRecord[]> {
  const rows = await supabaseQuery<LooseRow>("kentei_records", { order: "kentei_date.desc" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: getString(row, ["id"], ""),
      kenteiNo: getString(row, ["kentei_no"], ""),
      jikomiNo: getString(row, ["batch_id"], ""),
      productName: getString(row, ["product_code"], ""),
      kenteiDate: getDateString(row, ["kentei_date"], ""),
      alcoholDegree: getNumber(row, ["alcohol_degree"], 0),
      extractDegree: getNumber(row, ["extract_degree"], 0),
      sakaMeterValue: getNumber(row, ["sakemeter_value"], 0),
      volume: getNumber(row, ["volume_l"], 0),
      taxCategory: getString(row, ["tax_category_code"], ""),
      status: (getString(row, ["status"], "pending") as KenteiRecord["status"])
    }));
  }
  return [];
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


export async function fetchMaterialList(): Promise<MaterialRecord[]> {
  const rows = await supabaseQuery<LooseRow>("materials", { order: "name.asc" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: getString(row, ["id"], ""),
      code: getString(row, ["material_code", "legacy_material_code"], ""),
      name: getString(row, ["name"], ""),
      unit: getString(row, ["unit"], ""),
      currentStock: getNumber(row, ["current_stock"], 0),
      minimumStock: getNumber(row, ["minimum_stock"], 0),
      unitCost: getNumber(row, ["unit_cost"], 0),
      lastUpdated: getDateString(row, ["updated_at"], "")
    }));
  }
  return [];
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


export interface PayableRecord {
  supplierCode: string;
  supplierName: string;
  totalPurchase: number;
  paidAmount: number;
  balance: number;
  nextPaymentDate: string;
  status: "unpaid" | "partial" | "paid";
}


export interface BillRecord {
  id: string;
  billNo: string;
  supplierName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "holding" | "due" | "cleared";
}


export interface RawMaterialStock {
  code: string;
  name: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  lastPurchaseDate: string;
  unitCost: number;
}


export async function fetchPurchaseList(): Promise<PurchaseRecord[]> {
  const rows = await supabaseQuery<LooseRow>("purchase_document_headers", { order: "purchase_date.desc" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: getString(row, ["id"], ""),
      documentNo: getString(row, ["document_no", "legacy_document_no"], ""),
      purchaseDate: getDateString(row, ["purchase_date"], ""),
      supplierCode: getString(row, ["supplier_code", "legacy_supplier_code"], ""),
      supplierName: getString(row, ["supplier_name"], ""),
      itemName: "",
      quantity: 0,
      unitPrice: 0,
      amount: getNumber(row, ["total_amount"], 0),
      status: (getString(row, ["payment_status"], "pending") as PurchaseRecord["status"])
    }));
  }
  return [];
}

export async function fetchPayableList(): Promise<PayableRecord[]> {
  const rows = await supabaseQuery<LooseRow>("supplier_payment_status", { order: "legacy_supplier_code.asc" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      supplierCode: getString(row, ["supplier_code", "legacy_supplier_code"], ""),
      supplierName: getString(row, ["legacy_supplier_code"], ""),
      totalPurchase: getNumber(row, ["total_purchase"], 0),
      paidAmount: getNumber(row, ["paid_amount"], 0),
      balance: getNumber(row, ["balance"], 0),
      nextPaymentDate: getDateString(row, ["next_payment_date"], ""),
      status: (getString(row, ["status"], "unpaid") as PayableRecord["status"])
    }));
  }
  return [];
}

export async function fetchBillList(): Promise<BillRecord[]> {
  const rows = await supabaseQuery<LooseRow>("bills_of_exchange", { order: "due_date.desc" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: getString(row, ["id"], ""),
      billNo: getString(row, ["bill_no"], ""),
      supplierName: getString(row, ["counterparty_name"], ""),
      amount: getNumber(row, ["amount"], 0),
      issueDate: getDateString(row, ["issue_date"], ""),
      dueDate: getDateString(row, ["due_date"], ""),
      status: (getString(row, ["status"], "holding") as BillRecord["status"])
    }));
  }
  return [];
}

export async function fetchRawMaterialStock(): Promise<RawMaterialStock[]> {
  const rows = await supabaseQuery<LooseRow>("raw_materials", { order: "name.asc" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      code: getString(row, ["material_code", "legacy_material_code"], ""),
      name: getString(row, ["name"], ""),
      unit: getString(row, ["unit"], ""),
      currentStock: getNumber(row, ["current_stock"], 0),
      minimumStock: getNumber(row, ["minimum_stock"], 0),
      lastPurchaseDate: getDateString(row, ["last_purchase_date"], ""),
      unitCost: getNumber(row, ["unit_cost"], 0)
    }));
  }
  return [];
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
  rows: [], deductions: [], totalVolume: 0, totalTax: 0,
  status: "draft", submittedAt: null
};

export async function fetchTaxDeclaration(year: number, month: number): Promise<TaxDeclaration> {
  const declRows = await supabaseQuery<LooseRow>("tax_declarations", {
    target_year: `eq.${year}`,
    target_month: `eq.${month}`,
    limit: "1"
  });

  if (declRows.length > 0) {
    const decl = declRows[0];
    const declId = getString(decl, ["id"], "");

    const [taxRows, dedRows] = await Promise.all([
      supabaseQuery<LooseRow>("tax_declaration_rows", {
        declaration_id: `eq.${declId}`,
        order: "tax_category_code.asc"
      }),
      supabaseQuery<LooseRow>("tax_deductions", {
        declaration_id: `eq.${declId}`
      })
    ]);

    const rows: TaxDeclarationRow[] = taxRows.map((r) => ({
      taxCategory: getString(r, ["tax_category_code"], ""),
      taxCategoryName: getString(r, ["tax_category_name"], ""),
      alcoholDegree: getNumber(r, ["alcohol_degree"], 0),
      volume: getNumber(r, ["taxable_volume"], 0),
      taxRate: getNumber(r, ["tax_rate"], 0),
      taxAmount: getNumber(r, ["tax_amount"], 0),
      productionVolume: getNumber(r, ["production_volume"], 0),
      previousBalance: getNumber(r, ["previous_balance"], 0),
      currentAdjustment: getNumber(r, ["current_adjustment"], 0),
      exportDeduction: getNumber(r, ["export_deduction"], 0),
      sampleDeduction: getNumber(r, ["sample_deduction"], 0),
      taxableVolume: getNumber(r, ["taxable_volume"], 0)
    }));

    const deductions: TaxDeductionRow[] = dedRows.map((d) => ({
      type: getString(d, ["deduction_type"], "sample") as TaxDeductionRow["type"],
      categoryCode: getString(d, ["tax_category_code"], ""),
      volume: getNumber(d, ["volume"], 0),
      reason: getString(d, ["reason"], ""),
      documentNo: getString(d, ["reference_document_no"], "") || undefined
    }));

    return {
      targetYear: year,
      targetMonth: month,
      companyName: getString(decl, ["company_name"], ""),
      companyNo: getString(decl, ["company_no"], ""),
      companyAddress: getString(decl, ["company_address"], ""),
      companyRepresentative: getString(decl, ["company_representative"], ""),
      taxOffice: getString(decl, ["tax_office"], ""),
      rows,
      deductions,
      totalVolume: getNumber(decl, ["total_taxable_volume"], 0),
      totalTax: getNumber(decl, ["total_tax_amount"], 0),
      status: getString(decl, ["status"], "draft") as TaxDeclaration["status"],
      submittedAt: getString(decl, ["submitted_at"], "") || null
    };
  }

  return {
    ...mockTaxDeclaration,
    targetYear: year,
    targetMonth: month
  } as TaxDeclaration;
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


export async function fetchStoreSales(date: string): Promise<StoreSale[]> {
  const rows = await supabaseQuery<LooseRow>("store_sales", {
    sale_date: `eq.${date}`,
    order: "sale_time.asc"
  });
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: getString(row, ["id"], ""),
      saleDate: getString(row, ["sale_date"], date),
      saleTime: getString(row, ["sale_time"], ""),
      productCode: getString(row, ["product_code"], ""),
      productName: getString(row, ["product_name"], ""),
      quantity: getNumber(row, ["quantity"], 0),
      unitPrice: getNumber(row, ["unit_price"], 0),
      amount: getNumber(row, ["amount"], 0),
      paymentMethod: (getString(row, ["payment_method"], "cash") as StoreSale["paymentMethod"])
    }));
  }
  return [];
}

export async function fetchStoreOrders(): Promise<StoreOrder[]> {
  const rows = await supabaseQuery<LooseRow>("store_orders", { order: "order_date.desc", limit: "100" });
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: getString(row, ["id"], ""),
      orderNo: getString(row, ["order_no"], ""),
      orderDate: getDateString(row, ["order_date"], ""),
      customerName: getString(row, ["customer_name"], ""),
      postalCode: getString(row, ["postal_code"], ""),
      address: getString(row, ["shipping_address"], ""),
      items: [],
      totalAmount: getNumber(row, ["total_amount"], 0),
      status: (getString(row, ["status"], "new") as StoreOrder["status"]),
      shippingDate: getDateString(row, ["shipping_date"], "")
    }));
  }
  return [];
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

// ── 取引先マップ ──────────────────────────────────────────
export interface MapCustomer {
  customerCode: string;
  name: string;
  phone: string;
  areaCode: string;
  businessType: string;
  businessTypeName: string;
  address1: string;
  lat: number;
  lng: number;
  isAtRisk: boolean;
  isDormant: boolean;
  amount12m: number;
  daysSinceOrder: number | null;
}

export async function fetchMapCustomers(): Promise<MapCustomer[]> {
  const rows = await supabaseQueryAll<LooseRow>("v_customer_map");
  return rows
    .filter((r) => r["lat"] && r["lng"])
    .map((r) => ({
      customerCode: getString(r, ["customer_code"], ""),
      name: getString(r, ["name"], ""),
      phone: getString(r, ["phone"], ""),
      areaCode: getString(r, ["area_code"], ""),
      businessType: getString(r, ["business_type"], ""),
      businessTypeName: getString(r, ["business_type_name"], ""),
      address1: getString(r, ["address1"], ""),
      lat: Number(r["lat"]),
      lng: Number(r["lng"]),
      isAtRisk: getBoolean(r, ["is_at_risk"], false),
      isDormant: getBoolean(r, ["is_dormant"], false),
      amount12m: getNumber(r, ["amount_12m"], 0),
      daysSinceOrder: r["days_since_order"] != null ? Number(r["days_since_order"]) : null
    }));
}

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

// =============================================================================
// 需要分析・安全在庫・生産計画
// =============================================================================

export interface DemandMonthlyRow {
  yearMonth: string;
  productCode: string;
  productName: string;
  quantity: number;
  amount: number;
}

export interface DemandAnalysis {
  months: string[];
  products: { code: string; name: string }[];
  matrix: Record<string, Record<string, number>>;
  totals: Record<string, number>;
  productTotals: Record<string, number>;
  productAvg: Record<string, number>;
  productStdDev: Record<string, number>;
}

export type ProductionType = "monthly" | "annual" | "make_to_order" | "november";

export interface SafetyStockParams {
  productCode: string;
  productName: string;
  unit: string;
  avgMonthlyDemand: number;
  demandStdDev: number;
  leadTimeDays: number;
  serviceLevel: number;
  safetyStockQty: number;
  reorderPoint: number;
  memo: string;
  productionType: ProductionType;
}

export interface ProductionPlanRow {
  id: string;
  yearMonth: string;
  productCode: string;
  productName: string;
  demandForecast: number;
  safetyStockTarget: number;
  openingStock: number;
  requiredProduction: number;
  plannedQty: number;
  actualQty: number;
  status: "draft" | "confirmed" | "actual";
  productionType: ProductionType;
  notes: string;
}

// ─── モックデータ ─────────────────────────────────────────────────────────────

const _DEMAND_MOCK_PRODUCTS = [
  { code: "SAK001", name: "純米大吟醸　金井" },
  { code: "SAK002", name: "純米吟醸　金井" },
  { code: "SAK003", name: "本醸造　金井" },
  { code: "SAK004", name: "純米酒　金井" }
];

const _SAKE_SEASONAL = [1.6, 0.7, 1.3, 1.2, 0.9, 0.7, 0.6, 0.7, 0.9, 1.0, 1.1, 1.5];

const _DEMAND_BASES: Record<string, number> = {
  SAK001: 80,
  SAK002: 150,
  SAK003: 220,
  SAK004: 180
};

function _buildMockDemandAnalysis(): DemandAnalysis {
  const now = new Date();
  const months: string[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  const products = _DEMAND_MOCK_PRODUCTS;
  const matrix: Record<string, Record<string, number>> = {};
  const totals: Record<string, number> = {};
  for (const p of products) {
    matrix[p.code] = {};
    for (const ym of months) {
      const monthIdx = parseInt(ym.split("-")[1]) - 1;
      const base = _DEMAND_BASES[p.code] ?? 100;
      const qty = Math.round(base * _SAKE_SEASONAL[monthIdx] * (0.85 + Math.random() * 0.3));
      matrix[p.code][ym] = qty;
      totals[ym] = (totals[ym] ?? 0) + qty;
    }
  }
  const productTotals: Record<string, number> = {};
  const productAvg: Record<string, number> = {};
  const productStdDev: Record<string, number> = {};
  for (const p of products) {
    const vals = months.map((m) => matrix[p.code][m] ?? 0);
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
    const variance = vals.reduce((s, v) => s + (v - avg) ** 2, 0) / vals.length;
    productTotals[p.code] = vals.reduce((s, v) => s + v, 0);
    productAvg[p.code] = avg;
    productStdDev[p.code] = Math.sqrt(variance);
  }
  return { months, products, matrix, totals, productTotals, productAvg, productStdDev };
}

// ─── API 関数 ─────────────────────────────────────────────────────────────────

export async function fetchDemandAnalysis(monthsBack = 36): Promise<DemandAnalysis> {
  const cutoff = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() - monthsBack);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  })();
  const rows = await supabaseQueryAll<LooseRow>("product_monthly_sales", {
    select: "year_month,product_code,product_name,quantity",
    year_month: `gte.${cutoff}`,
    order: "year_month.asc"
  });
  if (rows.length === 0) return _buildMockDemandAnalysis();

  const monthSet = new Set<string>();
  const productMap = new Map<string, string>();
  const matrix: Record<string, Record<string, number>> = {};
  const totals: Record<string, number> = {};
  for (const r of rows) {
    const ym = getString(r, ["year_month"], "");
    const pc = getString(r, ["product_code"], "");
    const pn = getString(r, ["product_name"], pc);
    const qty = getNumber(r, ["quantity"], 0);
    if (!ym || !pc) continue;
    monthSet.add(ym);
    productMap.set(pc, pn);
    if (!matrix[pc]) matrix[pc] = {};
    matrix[pc][ym] = qty;
    totals[ym] = (totals[ym] ?? 0) + qty;
  }
  const months = [...monthSet].sort();
  const products = [...productMap.entries()].map(([code, name]) => ({ code, name }));
  const productTotals: Record<string, number> = {};
  const productAvg: Record<string, number> = {};
  const productStdDev: Record<string, number> = {};
  for (const p of products) {
    const vals = months.map((m) => matrix[p.code]?.[m] ?? 0);
    const avg = vals.reduce((s, v) => s + v, 0) / (vals.length || 1);
    const variance = vals.reduce((s, v) => s + (v - avg) ** 2, 0) / (vals.length || 1);
    productTotals[p.code] = vals.reduce((s, v) => s + v, 0);
    productAvg[p.code] = avg;
    productStdDev[p.code] = Math.sqrt(variance);
  }
  return { months, products, matrix, totals, productTotals, productAvg, productStdDev };
}

export async function fetchSafetyStockParams(): Promise<SafetyStockParams[]> {
  const rows = await supabaseQuery<LooseRow>("product_safety_stock_params", {
    order: "product_code.asc"
  });
  return rows.map((r) => ({
    productCode: getString(r, ["product_code"], ""),
    productName: getString(r, ["product_name"], ""),
    unit: getString(r, ["unit"], "本"),
    avgMonthlyDemand: getNumber(r, ["avg_monthly_demand"], 0),
    demandStdDev: getNumber(r, ["demand_std_dev"], 0),
    leadTimeDays: getNumber(r, ["lead_time_days"], 30),
    serviceLevel: getNumber(r, ["service_level"], 0.95),
    safetyStockQty: getNumber(r, ["safety_stock_qty"], 0),
    reorderPoint: getNumber(r, ["reorder_point"], 0),
    memo: getString(r, ["memo"], ""),
    productionType: getString(r, ["production_type"], "monthly") as ProductionType
  }));
}

export async function fetchProductionPlan(yearMonth: string): Promise<ProductionPlanRow[]> {
  const rows = await supabaseQuery<LooseRow>("production_plan", {
    year_month: `eq.${yearMonth}`,
    order: "product_code.asc"
  });
  return rows.map((r) => ({
    id: getString(r, ["id"], ""),
    yearMonth: getString(r, ["year_month"], yearMonth),
    productCode: getString(r, ["product_code"], ""),
    productName: getString(r, ["product_name"], ""),
    demandForecast: getNumber(r, ["demand_forecast"], 0),
    safetyStockTarget: getNumber(r, ["safety_stock_target"], 0),
    openingStock: getNumber(r, ["opening_stock"], 0),
    requiredProduction: getNumber(r, ["required_production"], 0),
    plannedQty: getNumber(r, ["planned_qty"], 0),
    actualQty: getNumber(r, ["actual_qty"], 0),
    status: getString(r, ["status"], "draft") as ProductionPlanRow["status"],
    productionType: getString(r, ["production_type"], "monthly") as ProductionPlanRow["productionType"],
    notes: getString(r, ["notes"], "")
  }));
}

export async function saveSafetyStockParamsBulk(paramsList: SafetyStockParams[]): Promise<boolean> {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = await import("./supabase");
  if (!SUPABASE_ANON_KEY || paramsList.length === 0) return false;
  try {
    const body = paramsList.map((p) => ({
      product_code: p.productCode,
      product_name: p.productName,
      unit: p.unit,
      avg_monthly_demand: p.avgMonthlyDemand,
      demand_std_dev: p.demandStdDev,
      lead_time_days: p.leadTimeDays,
      service_level: p.serviceLevel,
      safety_stock_qty: p.safetyStockQty,
      reorder_point: p.reorderPoint,
      production_type: p.productionType,
      memo: p.memo,
      last_calc_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    const url = new URL(`/rest/v1/product_safety_stock_params`, SUPABASE_URL);
    const resp = await fetch(url.toString(), {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal,resolution=merge-duplicates"
      },
      body: JSON.stringify(body)
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.error("saveSafetyStockParamsBulk failed:", resp.status, text);
      return false;
    }
    return true;
  } catch (err) {
    console.error("saveSafetyStockParamsBulk error:", err);
    return false;
  }
}

export async function saveProductionPlan(row: ProductionPlanRow): Promise<boolean> {
  const { supabaseUpsert } = await import("./supabase");
  const result = await supabaseUpsert("production_plan", {
    ...(row.id ? { id: row.id } : {}),
    year_month: row.yearMonth,
    product_code: row.productCode,
    product_name: row.productName,
    demand_forecast: row.demandForecast,
    safety_stock_target: row.safetyStockTarget,
    opening_stock: row.openingStock,
    required_production: row.requiredProduction,
    planned_qty: row.plannedQty,
    actual_qty: row.actualQty,
    status: row.status,
    production_type: row.productionType,
    notes: row.notes,
    updated_at: new Date().toISOString()
  });
  return result !== null;
}

// ─── 出荷カレンダー ──────────────────────────────────────────────────────────

export interface ShipmentEntry {
  customerCode: string;
  customerName: string;
  city: string;
  amount: number;
}

export interface ShipmentDay {
  date: string;
  entries: ShipmentEntry[];
  cityGroups: { city: string; count: number }[];
  totalAmount: number;
  count: number;
}

export type ShipmentCalendarData = Record<string, ShipmentDay>;

/** 住所文字列から市区町村を抽出する */
function extractCity(address: string): string {
  if (!address) return "不明";
  // 都道府県を除去
  const noPref = address.replace(/^.+?[都道府県]/, "");
  // 郡XX町/村、または 市/区/町/村 で終わる最短マッチ
  const m = noPref.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);
  return m ? m[1] : noPref.substring(0, 6);
}

export async function fetchShipmentCalendar(yearMonth: string): Promise<ShipmentCalendarData> {
  const [y, mo] = yearMonth.split("-").map(Number);
  const startDate = `${yearMonth}-01`;
  // 月末日を計算
  const lastDay = new Date(y, mo, 0).getDate();
  const endDate = `${yearMonth}-${String(lastDay).padStart(2, "0")}`;

  // 月内の伝票ヘッダを取得
  const headers = await supabaseQueryAll<{
    sales_date: string;
    customer_name: string;
    legacy_customer_code: string;
    total_amount: number | string;
  }>("sales_document_headers", {
    select: "sales_date,customer_name,legacy_customer_code,total_amount",
    and: `(sales_date.gte.${startDate},sales_date.lte.${endDate})`,
    order: "sales_date.asc"
  });

  // 得意先住所マップを取得
  const customers = await supabaseQueryAll<{
    id: string;
    address1: string | null;
  }>("customers", {
    select: "id,address1",
    address1: "not.is.null"
  });

  const cityMap: Record<string, string> = {};
  for (const c of customers) {
    if (c.address1) cityMap[c.id] = extractCity(c.address1);
  }

  // 日付ごとに集計
  const result: ShipmentCalendarData = {};
  for (const h of headers) {
    const date = h.sales_date;
    if (!date) continue;
    const city = cityMap[h.legacy_customer_code] || "住所未登録";
    const amount = Number(h.total_amount) || 0;

    if (!result[date]) {
      result[date] = { date, entries: [], cityGroups: [], totalAmount: 0, count: 0 };
    }
    result[date].entries.push({
      customerCode: h.legacy_customer_code || "",
      customerName: h.customer_name || "",
      city,
      amount
    });
    result[date].totalAmount += amount;
    result[date].count++;
  }

  // 市区町村グループを集計
  for (const day of Object.values(result)) {
    const cityCount: Record<string, number> = {};
    for (const e of day.entries) {
      cityCount[e.city] = (cityCount[e.city] || 0) + 1;
    }
    day.cityGroups = Object.entries(cityCount)
      .sort((a, b) => b[1] - a[1])
      .map(([city, count]) => ({ city, count }));
  }

  return result;
}

// ── 見積 ─────────────────────────────────────────────────────────────────────

export interface QuoteListItem {
  id: string;
  quote_no: string;
  quote_date: string;
  valid_until: string | null;
  customer_name: string;
  subject: string;
  total_amount: number;
  template_type: string;
  status: string;
  created_at: string;
}

export interface QuoteLineRecord {
  id: string;
  quote_id: string;
  line_no: number;
  legacy_product_code: string | null;
  product_name: string;
  jan_code: string | null;
  case_qty: number | null;
  quantity: number;
  unit: string;
  unit_price: number;
  retail_price: number | null;
  amount: number;
}

export async function fetchQuoteList(): Promise<QuoteListItem[]> {
  return supabaseQuery<QuoteListItem>("quotes", {
    select: "id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",
    order: "quote_date.desc,created_at.desc",
    limit: "200"
  });
}

export async function fetchQuoteWithLines(quoteId: string): Promise<(QuoteListItem & { tax_rate: number; remarks: string; delivery_date: string; payment_terms: string; delivery_place: string; legacy_customer_code: string; customer_address: string; lines: QuoteLineRecord[] }) | null> {
  const rows = await supabaseQuery<QuoteListItem & { tax_rate: number; remarks: string; delivery_date: string; payment_terms: string; delivery_place: string; legacy_customer_code: string; customer_address: string }>("quotes", {
    select: "*",
    id: `eq.${quoteId}`
  });
  if (!rows[0]) return null;
  const lines = await supabaseQuery<QuoteLineRecord>("quote_lines", {
    select: "*",
    quote_id: `eq.${quoteId}`,
    order: "line_no.asc"
  });
  return { ...rows[0], lines };
}
