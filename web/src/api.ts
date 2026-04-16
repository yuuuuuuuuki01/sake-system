import { supabaseInsert, supabaseQuery } from "./supabase";

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
}

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
  closingDay: number;
  paymentDay: number;
  isActive: boolean;
}

export interface MasterProduct {
  id: string;
  code: string;
  janCode: string;
  name: string;
  category: string;
  isActive: boolean;
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
  generatedAt: "2026-04-15T09:15:00+09:00",
  kpis: {
    todaySales: 1248000,
    todayDelta: 8.2,
    monthSales: 18245000,
    monthDelta: 5.6,
    unpaidCount: 7,
    unpaidAmount: 2640000
  },
  dailySales: Array.from({ length: 30 }, (_, index) => {
    const day = new Date("2026-03-17T00:00:00+09:00");
    day.setDate(day.getDate() + index);
    return {
      date: day.toISOString(),
      amount: 420000 + ((index * 73123) % 620000)
    };
  }),
  salesRecords: Array.from({ length: 20 }, (_, index) => {
    const day = new Date("2026-04-15T00:00:00+09:00");
    day.setDate(day.getDate() - index);
    return {
      id: `sale-${index + 1}`,
      documentNo: `D${String(240100 + index).padStart(6, "0")}`,
      date: day.toISOString(),
      customerCode: `C${String(index + 11).padStart(4, "0")}`,
      customerName: ["青葉商事", "北斗酒販", "中央フーズ", "東海酒店"][index % 4],
      amount: 68000 + (index % 6) * 24500
    };
  })
};

const mockPaymentStatus: PaymentStatusSummary = {
  generatedAt: "2026-04-15T09:15:00+09:00",
  records: [
    {
      id: "pay-1",
      customerCode: "C0011",
      customerName: "青葉商事",
      billedAmount: 540000,
      paymentAmount: 0,
      balanceAmount: 540000,
      lastPaymentDate: null,
      status: "unpaid"
    },
    {
      id: "pay-2",
      customerCode: "C0012",
      customerName: "北斗酒販",
      billedAmount: 720000,
      paymentAmount: 300000,
      balanceAmount: 420000,
      lastPaymentDate: "2026-04-11T14:30:00+09:00",
      status: "partial"
    },
    {
      id: "pay-3",
      customerCode: "C0013",
      customerName: "中央フーズ",
      billedAmount: 680000,
      paymentAmount: 680000,
      balanceAmount: 0,
      lastPaymentDate: "2026-04-14T10:00:00+09:00",
      status: "paid"
    },
    {
      id: "pay-4",
      customerCode: "C0014",
      customerName: "東海酒店",
      billedAmount: 410000,
      paymentAmount: 180000,
      balanceAmount: 230000,
      lastPaymentDate: "2026-04-10T09:10:00+09:00",
      status: "partial"
    }
  ]
};

const mockMasterStats: MasterStatsSummary = {
  generatedAt: "2026-04-15T09:15:00+09:00",
  summary: {
    customerCount: 164,
    activeCustomerCount: 152,
    productCount: 486,
    activeProductCount: 461
  },
  customers: Array.from({ length: 12 }, (_, index) => ({
    id: `customer-${index + 1}`,
    code: `C${String(index + 1).padStart(4, "0")}`,
    name: ["青葉商事", "北斗酒販", "中央フーズ", "東海酒店", "三和物産", "南星リカー"][index % 6],
    closingDay: [15, 20, 25, 31][index % 4],
    paymentDay: [5, 10, 15, 20][index % 4],
    isActive: index % 5 !== 0
  })),
  products: Array.from({ length: 12 }, (_, index) => ({
    id: `product-${index + 1}`,
    code: `P${String(index + 1).padStart(5, "0")}`,
    janCode: `4901234567${String(index).padStart(3, "0")}`,
    name: ["純米吟醸 720ml", "本醸造 1.8L", "特別純米 300ml", "梅酒 500ml"][index % 4],
    category: ["清酒", "焼酎", "リキュール"][index % 3],
    isActive: index % 6 !== 0
  }))
};

const mockPipelineMeta: PipelineMeta = {
  generatedAt: "2026-04-15T09:15:00+09:00",
  lastSyncAt: "2026-04-15T09:12:21+09:00",
  status: "success",
  jobName: "daily-sync",
  message: "同期完了。売上・入金・マスタを最新化しました。"
};

const mockInvoiceRecords: InvoiceRecord[] = mockSalesSummary.salesRecords.map((record, index) => ({
  ...record,
  itemCount: (index % 4) + 1
}));

const mockLedgerData: Record<string, CustomerLedger> = {
  C0011: {
    customerCode: "C0011",
    customerName: "青葉商事",
    balanceAmount: 540000,
    salesTotal: 1140000,
    paymentTotal: 600000,
    salesHistory: [
      {
        id: "ledger-sale-1",
        date: "2026-04-15T00:00:00+09:00",
        documentNo: "D240100",
        amount: 420000
      },
      {
        id: "ledger-sale-2",
        date: "2026-04-08T00:00:00+09:00",
        documentNo: "D240087",
        amount: 390000
      },
      {
        id: "ledger-sale-3",
        date: "2026-03-28T00:00:00+09:00",
        documentNo: "D240059",
        amount: 330000
      }
    ],
    paymentHistory: [
      {
        id: "ledger-payment-1",
        date: "2026-04-10T00:00:00+09:00",
        amount: 300000,
        method: "振込"
      },
      {
        id: "ledger-payment-2",
        date: "2026-03-31T00:00:00+09:00",
        amount: 300000,
        method: "振込"
      }
    ]
  },
  C0012: {
    customerCode: "C0012",
    customerName: "北斗酒販",
    balanceAmount: 420000,
    salesTotal: 1020000,
    paymentTotal: 600000,
    salesHistory: [
      {
        id: "ledger-sale-4",
        date: "2026-04-14T00:00:00+09:00",
        documentNo: "D240101",
        amount: 360000
      },
      {
        id: "ledger-sale-5",
        date: "2026-04-05T00:00:00+09:00",
        documentNo: "D240082",
        amount: 320000
      },
      {
        id: "ledger-sale-6",
        date: "2026-03-25T00:00:00+09:00",
        documentNo: "D240054",
        amount: 340000
      }
    ],
    paymentHistory: [
      {
        id: "ledger-payment-3",
        date: "2026-04-11T00:00:00+09:00",
        amount: 300000,
        method: "振込"
      },
      {
        id: "ledger-payment-4",
        date: "2026-03-30T00:00:00+09:00",
        amount: 300000,
        method: "現金"
      }
    ]
  }
};

const mockSalesAnalytics: SalesAnalytics = {
  generatedAt: "2026-04-15T09:15:00+09:00",
  monthlySales: [
    { month: "2025-11", amount: 12840000 },
    { month: "2025-12", amount: 13620000 },
    { month: "2026-01", amount: 14110000 },
    { month: "2026-02", amount: 13380000 },
    { month: "2026-03", amount: 15860000 },
    { month: "2026-04", amount: 18245000 }
  ],
  productTotals: [
    { code: "P00001", name: "純米吟醸 720ml", amount: 5840000, quantity: 820, documents: 148 },
    { code: "P00002", name: "本醸造 1.8L", amount: 4980000, quantity: 610, documents: 131 },
    { code: "P00003", name: "特別純米 300ml", amount: 3560000, quantity: 1240, documents: 112 },
    { code: "P00004", name: "梅酒 500ml", amount: 2870000, quantity: 540, documents: 89 }
  ],
  customerTotals: [
    { code: "C0011", name: "青葉商事", amount: 4620000, quantity: 320, documents: 54 },
    { code: "C0012", name: "北斗酒販", amount: 4380000, quantity: 294, documents: 49 },
    { code: "C0013", name: "中央フーズ", amount: 3910000, quantity: 276, documents: 45 },
    { code: "C0014", name: "東海酒店", amount: 3240000, quantity: 221, documents: 37 }
  ]
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
  const salesRows = await supabaseQuery<DailySalesFactRow>("daily_sales_fact", {
    select: "sales_date,sales_amount,document_count",
    order: "sales_date.desc",
    limit: "60"
  });

  if (salesRows.length > 0) {
    const paymentRows = await supabaseQuery<CustomerPaymentStatusRow>("customer_payment_status", {
      select: "legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"
    });

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const monthKey = todayKey.slice(0, 7);
    const recentDailySales = [...salesRows]
      .sort((left, right) => left.sales_date.localeCompare(right.sales_date))
      .slice(-30)
      .map((row) => ({
        date: new Date(`${row.sales_date}T00:00:00Z`).toISOString(),
        amount: toNumber(row.sales_amount)
      }));

    const todaySales = salesRows.reduce((sum, row) => {
      return row.sales_date === todayKey ? sum + toNumber(row.sales_amount) : sum;
    }, 0);
    const monthSales = salesRows.reduce((sum, row) => {
      return row.sales_date.startsWith(monthKey) ? sum + toNumber(row.sales_amount) : sum;
    }, 0);
    const unpaidRows = paymentRows.filter((row) => toNumber(row.balance_amount) > 0);

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
      salesRecords: mockSalesSummary.salesRecords
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
      ? customerRows.map((row, index) => ({
          id: getString(row, ["id", "customer_id", "code"], `customer-${index + 1}`),
          code: getString(
            row,
            ["code", "customer_code", "legacy_customer_code"],
            `C${String(index + 1).padStart(4, "0")}`
          ),
          name: getString(row, ["name", "customer_name", "display_name"], `Customer ${index + 1}`),
          closingDay: getNumber(row, ["closing_day", "close_day"], 31),
          paymentDay: getNumber(row, ["payment_day", "due_day"], 15),
          isActive: getBoolean(row, ["is_active", "active", "enabled"], true)
        }))
      : mockMasterStats.customers;

    const products = productRows.length
      ? productRows.map((row, index) => ({
          id: getString(row, ["id", "product_id", "code"], `product-${index + 1}`),
          code: getString(row, ["code", "product_code"], `P${String(index + 1).padStart(5, "0")}`),
          janCode: getString(row, ["jan_code", "jan", "barcode"], ""),
          name: getString(row, ["name", "product_name", "display_name"], `Product ${index + 1}`),
          category: getString(row, ["category", "category_name"], "未分類"),
          isActive: getBoolean(row, ["is_active", "active", "enabled"], true)
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
    supabaseQuery<DailySalesFactRow>("daily_sales_fact", {
      select: "sales_date,sales_amount",
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
  documentNo: "D240122",
  invoiceDate: "2026-04-14",
  customerCode: "C0011",
  customerName: "青葉商事 株式会社",
  customerAddress: "〒123-4567 東京都千代田区〇〇 1-2-3",
  lines: [
    { productCode: "P00012", productName: "純米吟醸 720ml", quantity: 6, unitPrice: 12000, unit: "本", amount: 72000 },
    { productCode: "P00008", productName: "本醸造 1.8L", quantity: 4, unitPrice: 8500, unit: "本", amount: 34000 },
    { productCode: "P00021", productName: "梅酒 500ml", quantity: 12, unitPrice: 5800, unit: "本", amount: 69600 }
  ],
  totalAmount: 175600,
  taxAmount: 15960,
  note: ""
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
  targetYearMonth: "2026-04",
  closingDay: 15,
  totalBilling: 4820000,
  customers: [
    { customerCode: "C0011", customerName: "青葉商事", closingDay: 15, salesAmount: 540000, taxAmount: 54000, prevBalance: 280000, paymentAmount: 280000, billingAmount: 594000, status: "open" },
    { customerCode: "C0012", customerName: "北斗酒販", closingDay: 15, salesAmount: 720000, taxAmount: 72000, prevBalance: 140000, paymentAmount: 140000, billingAmount: 792000, status: "closed" },
    { customerCode: "C0013", customerName: "中央フーズ", closingDay: 15, salesAmount: 380000, taxAmount: 38000, prevBalance: 0, paymentAmount: 0, billingAmount: 418000, status: "open" },
    { customerCode: "C0014", customerName: "東海酒店", closingDay: 15, salesAmount: 610000, taxAmount: 61000, prevBalance: 230000, paymentAmount: 150000, billingAmount: 751000, status: "open" }
  ]
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
  generatedAt: new Date().toISOString(),
  months: MONTHS,
  salesByProduct: [
    { label: "純米吟醸 720ml", values: [380,410,520,480,390,320,450,480,510,420,380,350].map(v => v * 10000) },
    { label: "本醸造 1.8L", values: [290,310,380,340,280,250,320,360,390,310,280,260].map(v => v * 10000) },
    { label: "梅酒 500ml", values: [210,240,310,290,230,180,260,300,320,250,200,190].map(v => v * 10000) }
  ],
  salesByCustomer: [
    { label: "青葉商事", values: [480,510,620,590,480,390,540,580,610,510,460,430].map(v => v * 10000) },
    { label: "北斗酒販", values: [390,420,520,490,400,330,460,500,530,430,380,360].map(v => v * 10000) }
  ],
  costSimulation: [
    { productCode: "P00012", productName: "純米吟醸 720ml", costPrice: 7200, sellPrice: 12000, margin: 4800, marginRate: 40.0 },
    { productCode: "P00008", productName: "本醸造 1.8L", costPrice: 4800, sellPrice: 8500, margin: 3700, marginRate: 43.5 },
    { productCode: "P00021", productName: "梅酒 500ml", costPrice: 3200, sellPrice: 5800, margin: 2600, marginRate: 44.8 }
  ]
};

export async function fetchSalesReport(): Promise<SalesReport> {
  return fetchJson("data/api/latest/sales-report.json", mockReport);
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

const mockJikomi: JikomiRecord[] = [
  { id: "j1", jikomiNo: "J2026-01", productName: "純米吟醸", riceType: "山田錦", plannedKg: 400, actualKg: 400, startDate: "2026-01-10", expectedDoneDate: "2026-02-20", status: "done", tankNo: "T01", note: "" },
  { id: "j2", jikomiNo: "J2026-02", productName: "本醸造", riceType: "日本晴", plannedKg: 600, actualKg: 600, startDate: "2026-02-01", expectedDoneDate: "2026-03-15", status: "done", tankNo: "T02", note: "" },
  { id: "j3", jikomiNo: "J2026-03", productName: "特別純米", riceType: "五百万石", plannedKg: 500, actualKg: 480, startDate: "2026-03-05", expectedDoneDate: "2026-04-20", status: "active", tankNo: "T03", note: "経過良好" },
  { id: "j4", jikomiNo: "J2026-04", productName: "純米大吟醸", riceType: "山田錦", plannedKg: 300, actualKg: 0, startDate: "2026-04-15", expectedDoneDate: "2026-06-01", status: "planned", tankNo: "T04", note: "" }
];

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

const mockTanks: TankRecord[] = [
  { id: "t1", tankNo: "T01", capacity: 3000, currentVolume: 0, productName: "", jikomiNo: "", status: "empty", lastUpdated: "2026-03-01" },
  { id: "t2", tankNo: "T02", capacity: 4000, currentVolume: 0, productName: "", jikomiNo: "", status: "empty", lastUpdated: "2026-03-20" },
  { id: "t3", tankNo: "T03", capacity: 3500, currentVolume: 2800, productName: "特別純米", jikomiNo: "J2026-03", status: "in_use", lastUpdated: "2026-04-10" },
  { id: "t4", tankNo: "T04", capacity: 2000, currentVolume: 0, productName: "純米大吟醸", jikomiNo: "J2026-04", status: "in_use", lastUpdated: "2026-04-15" },
  { id: "t5", tankNo: "T05", capacity: 5000, currentVolume: 3200, productName: "本醸造（貯蔵）", jikomiNo: "J2026-02", status: "aging", lastUpdated: "2026-03-20" }
];

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

const mockKentei: KenteiRecord[] = [
  { id: "k1", kenteiNo: "K2026-001", jikomiNo: "J2026-01", productName: "純米吟醸", kenteiDate: "2026-02-25", alcoholDegree: 16.2, extractDegree: 3.8, sakaMeterValue: 2.5, volume: 2850, taxCategory: "清酒", status: "approved" },
  { id: "k2", kenteiNo: "K2026-002", jikomiNo: "J2026-02", productName: "本醸造", kenteiDate: "2026-03-18", alcoholDegree: 15.5, extractDegree: 4.1, sakaMeterValue: 1.8, volume: 3600, taxCategory: "清酒", status: "submitted" },
  { id: "k3", kenteiNo: "K2026-003", jikomiNo: "J2026-03", productName: "特別純米", kenteiDate: "2026-04-18", alcoholDegree: 0, extractDegree: 0, sakaMeterValue: 0, volume: 0, taxCategory: "清酒", status: "pending" }
];

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

const mockMaterials: MaterialRecord[] = [
  { id: "m1", code: "M001", name: "720ml瓶", unit: "本", currentStock: 2400, minimumStock: 500, unitCost: 85, lastUpdated: "2026-04-10" },
  { id: "m2", code: "M002", name: "1.8L瓶", unit: "本", currentStock: 1800, minimumStock: 300, unitCost: 140, lastUpdated: "2026-04-10" },
  { id: "m3", code: "M003", name: "300ml瓶", unit: "本", currentStock: 3600, minimumStock: 600, unitCost: 55, lastUpdated: "2026-04-08" },
  { id: "m4", code: "M004", name: "キャップ（金）", unit: "個", currentStock: 8000, minimumStock: 1000, unitCost: 12, lastUpdated: "2026-04-05" },
  { id: "m5", code: "M005", name: "ラベル（純米吟醸）", unit: "枚", currentStock: 1200, minimumStock: 300, unitCost: 28, lastUpdated: "2026-04-01" },
  { id: "m6", code: "M006", name: "化粧箱（720ml）", unit: "個", currentStock: 180, minimumStock: 100, unitCost: 320, lastUpdated: "2026-04-01" }
];

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

const mockPurchases: PurchaseRecord[] = [
  { id: "p1", documentNo: "K240050", purchaseDate: "2026-04-05", supplierCode: "S001", supplierName: "山田農場", itemName: "山田錦（精米65%）", quantity: 500, unitPrice: 480, amount: 240000, status: "confirmed" },
  { id: "p2", documentNo: "K240051", purchaseDate: "2026-04-06", supplierCode: "S002", supplierName: "日本瓶工業", itemName: "720ml瓶", quantity: 1200, unitPrice: 85, amount: 102000, status: "confirmed" },
  { id: "p3", documentNo: "K240052", purchaseDate: "2026-04-10", supplierCode: "S003", supplierName: "山本麹店", itemName: "米麹", quantity: 80, unitPrice: 1200, amount: 96000, status: "pending" },
  { id: "p4", documentNo: "K240053", purchaseDate: "2026-04-12", supplierCode: "S001", supplierName: "山田農場", itemName: "五百万石（精米60%）", quantity: 300, unitPrice: 420, amount: 126000, status: "pending" }
];

export interface PayableRecord {
  supplierCode: string;
  supplierName: string;
  totalPurchase: number;
  paidAmount: number;
  balance: number;
  nextPaymentDate: string;
  status: "unpaid" | "partial" | "paid";
}

const mockPayables: PayableRecord[] = [
  { supplierCode: "S001", supplierName: "山田農場", totalPurchase: 366000, paidAmount: 240000, balance: 126000, nextPaymentDate: "2026-04-30", status: "partial" },
  { supplierCode: "S002", supplierName: "日本瓶工業", totalPurchase: 102000, paidAmount: 102000, balance: 0, nextPaymentDate: "", status: "paid" },
  { supplierCode: "S003", supplierName: "山本麹店", totalPurchase: 96000, paidAmount: 0, balance: 96000, nextPaymentDate: "2026-04-30", status: "unpaid" }
];

export interface BillRecord {
  id: string;
  billNo: string;
  supplierName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "holding" | "due" | "cleared";
}

const mockBills: BillRecord[] = [
  { id: "b1", billNo: "H240001", supplierName: "山田農場", amount: 240000, issueDate: "2026-03-31", dueDate: "2026-04-30", status: "holding" },
  { id: "b2", billNo: "H240002", supplierName: "大阪資材", amount: 185000, issueDate: "2026-03-31", dueDate: "2026-05-31", status: "holding" },
  { id: "b3", billNo: "H230045", supplierName: "中部農業", amount: 320000, issueDate: "2026-02-28", dueDate: "2026-03-31", status: "cleared" }
];

export interface RawMaterialStock {
  code: string;
  name: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  lastPurchaseDate: string;
  unitCost: number;
}

const mockRawStock: RawMaterialStock[] = [
  { code: "R001", name: "山田錦（精米65%）", unit: "kg", currentStock: 380, minimumStock: 100, lastPurchaseDate: "2026-04-05", unitCost: 480 },
  { code: "R002", name: "五百万石（精米60%）", unit: "kg", currentStock: 290, minimumStock: 100, lastPurchaseDate: "2026-04-12", unitCost: 420 },
  { code: "R003", name: "米麹", unit: "kg", currentStock: 62, minimumStock: 20, lastPurchaseDate: "2026-04-10", unitCost: 1200 },
  { code: "R004", name: "醸造用アルコール", unit: "L", currentStock: 240, minimumStock: 50, lastPurchaseDate: "2026-03-20", unitCost: 180 },
  { code: "R005", name: "清酒用酵母", unit: "g", currentStock: 500, minimumStock: 100, lastPurchaseDate: "2026-02-15", unitCost: 3200 }
];

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
  targetYear: 2026,
  targetMonth: 3,
  companyName: "金井酒造店",
  companyNo: "1234567890123",
  companyAddress: "神奈川県秦野市堀山下182",
  companyRepresentative: "金井 和雄",
  taxOffice: "小田原税務署",
  rows: [
    {
      taxCategory: "01",
      taxCategoryName: "清酒（普通酒）",
      alcoholDegree: 15.5,
      productionVolume: 3800,
      previousBalance: 0,
      currentAdjustment: 0,
      exportDeduction: 100,
      sampleDeduction: 100,
      taxableVolume: 3600,
      volume: 3600,
      taxRate: 100,
      taxAmount: 360000
    },
    {
      taxCategory: "02",
      taxCategoryName: "清酒（純米酒）",
      alcoholDegree: 16.2,
      productionVolume: 2900,
      previousBalance: 0,
      currentAdjustment: 0,
      exportDeduction: 0,
      sampleDeduction: 50,
      taxableVolume: 2850,
      volume: 2850,
      taxRate: 100,
      taxAmount: 285000
    },
    {
      taxCategory: "03",
      taxCategoryName: "清酒（吟醸酒）",
      alcoholDegree: 16.5,
      productionVolume: 1250,
      previousBalance: 0,
      currentAdjustment: 0,
      exportDeduction: 0,
      sampleDeduction: 50,
      taxableVolume: 1200,
      volume: 1200,
      taxRate: 100,
      taxAmount: 120000
    }
  ],
  deductions: [
    { type: "export", categoryCode: "01", volume: 100, reason: "シンガポール向け輸出", documentNo: "EX2026-003" },
    { type: "sample", categoryCode: "01", volume: 100, reason: "展示会サンプル出荷" },
    { type: "sample", categoryCode: "02", volume: 50, reason: "品評会出品" },
    { type: "sample", categoryCode: "03", volume: 50, reason: "全国新酒鑑評会出品" }
  ],
  totalVolume: 7650,
  totalTax: 765000,
  status: "draft",
  submittedAt: null
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

const mockStoreSales: StoreSale[] = Array.from({ length: 10 }, (_, i) => ({
  id: `ss${i + 1}`,
  saleDate: "2026-04-15",
  saleTime: `${9 + i}:${String(i * 7 % 60).padStart(2, "0")}`,
  productCode: `P${String((i % 4) + 1).padStart(5, "0")}`,
  productName: ["純米吟醸 720ml", "本醸造 1.8L", "梅酒 500ml", "特別純米 300ml"][i % 4],
  quantity: 1 + (i % 3),
  unitPrice: [2200, 1800, 980, 680][i % 4],
  amount: (1 + (i % 3)) * [2200, 1800, 980, 680][i % 4],
  paymentMethod: (["cash", "card", "paypay", "cash"] as const)[i % 4]
}));

const mockStoreOrders: StoreOrder[] = [
  { id: "o1", orderNo: "ORD-2604001", orderDate: "2026-04-13", customerName: "鈴木 太郎", postalCode: "150-0001", address: "東京都渋谷区〇〇1-1", items: [{ productName: "純米吟醸 720ml", quantity: 2, amount: 4400 }], totalAmount: 4400, status: "shipped", shippingDate: "2026-04-14" },
  { id: "o2", orderNo: "ORD-2604002", orderDate: "2026-04-14", customerName: "田中 花子", postalCode: "530-0001", address: "大阪府大阪市北区〇〇2-3", items: [{ productName: "梅酒 500ml", quantity: 3, amount: 2940 }, { productName: "本醸造 1.8L", quantity: 1, amount: 1800 }], totalAmount: 4740, status: "processing", shippingDate: "" },
  { id: "o3", orderNo: "ORD-2604003", orderDate: "2026-04-15", customerName: "佐藤 一郎", postalCode: "460-0001", address: "愛知県名古屋市中区〇〇3-5", items: [{ productName: "特別純米 300ml ×6本セット", quantity: 1, amount: 3980 }], totalAmount: 3980, status: "new", shippingDate: "" }
];

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
  campaign: EmailCampaign
): Promise<{ sent: number; failed: number }> {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_RESEND_API_KEY is not configured");
  }

  const recipients = campaign.recipients ?? [];
  let sent = 0;
  let failed = 0;

  await Promise.all(
    recipients.map(async (recipient) => {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "brewery@kaneishuzo.co.jp",
            to: [recipient],
            subject: campaign.subject,
            text: campaign.body
          })
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
