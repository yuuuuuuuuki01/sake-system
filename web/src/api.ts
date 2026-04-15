import { supabaseQuery } from "./supabase";

export type PipelineStatus = "success" | "warning" | "error" | "running";
export type PaymentState = "unpaid" | "partial" | "paid";
export type MasterTab = "customers" | "products";

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

type LooseRow = Record<string, unknown>;

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
          code: getString(row, ["code", "customer_code", "legacy_customer_code"], `C${String(index + 1).padStart(4, "0")}`),
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

export interface InvoiceRecord {
  id: string;
  documentNo: string;
  date: string;
  customerCode: string;
  customerName: string;
  lineCount: number;
  totalAmount: number;
  status: string;
}

export interface InvoiceFilter {
  docNo: string;
  customerCode: string;
  startDate: string;
  endDate: string;
}

export interface LedgerSalesRecord {
  date: string;
  documentNo: string;
  amount: number;
}

export interface LedgerPaymentRecord {
  date: string;
  amount: number;
}

export interface CustomerLedgerSummary {
  customerCode: string;
  customerName: string;
  totalSales: number;
  totalPayments: number;
  balance: number;
  salesHistory: LedgerSalesRecord[];
  paymentHistory: LedgerPaymentRecord[];
}

export type AnalyticsTab = "products" | "customers";

export interface AnalyticsRankRow {
  rank: number;
  code: string;
  name: string;
  totalAmount: number;
  share: number;
}

export interface MonthlyPoint {
  month: string;
  amount: number;
}

export interface SalesAnalytics {
  generatedAt: string;
  monthlyTrend: MonthlyPoint[];
  byProduct: AnalyticsRankRow[];
  byCustomer: AnalyticsRankRow[];
}

const mockInvoices: InvoiceRecord[] = Array.from({ length: 12 }, (_, index) => {
  const day = new Date("2026-04-15T00:00:00+09:00");
  day.setDate(day.getDate() - index);
  return {
    id: `invoice-${index + 1}`,
    documentNo: `INV-${String(240001 + index).padStart(6, "0")}`,
    date: day.toISOString(),
    customerCode: `C${String((index % 6) + 11).padStart(4, "0")}`,
    customerName: ["青葉商事", "北斗酒販", "中央フーズ", "東海酒店", "三和物産", "南星リカー"][index % 6],
    lineCount: 2 + (index % 5),
    totalAmount: 78000 + index * 18200,
    status: ["確定", "保留", "処理中"][index % 3]
  };
});

const mockCustomerLedgers: CustomerLedgerSummary[] = [
  {
    customerCode: "C0011",
    customerName: "青葉商事",
    totalSales: 2480000,
    totalPayments: 1930000,
    balance: 550000,
    salesHistory: [
      { date: "2026-04-14T00:00:00+09:00", documentNo: "D240122", amount: 420000 },
      { date: "2026-04-08T00:00:00+09:00", documentNo: "D240097", amount: 380000 },
      { date: "2026-03-28T00:00:00+09:00", documentNo: "D240051", amount: 610000 }
    ],
    paymentHistory: [
      { date: "2026-04-10T00:00:00+09:00", amount: 300000 },
      { date: "2026-03-31T00:00:00+09:00", amount: 520000 },
      { date: "2026-03-15T00:00:00+09:00", amount: 1110000 }
    ]
  },
  {
    customerCode: "C0012",
    customerName: "北斗酒販",
    totalSales: 3120000,
    totalPayments: 2980000,
    balance: 140000,
    salesHistory: [
      { date: "2026-04-12T00:00:00+09:00", documentNo: "D240115", amount: 540000 },
      { date: "2026-04-06T00:00:00+09:00", documentNo: "D240086", amount: 460000 },
      { date: "2026-03-21T00:00:00+09:00", documentNo: "D240033", amount: 720000 }
    ],
    paymentHistory: [
      { date: "2026-04-11T00:00:00+09:00", amount: 300000 },
      { date: "2026-03-29T00:00:00+09:00", amount: 1180000 },
      { date: "2026-03-12T00:00:00+09:00", amount: 1500000 }
    ]
  }
];

const mockSalesAnalytics: SalesAnalytics = {
  generatedAt: "2026-04-15T09:15:00+09:00",
  monthlyTrend: Array.from({ length: 12 }, (_, index) => ({
    month: `${index + 5}月`,
    amount: 8200000 + ((index + 3) * 913000) % 4600000
  })),
  byProduct: [
    { rank: 1, code: "P00012", name: "純米吟醸 720ml", totalAmount: 4220000, share: 18.4 },
    { rank: 2, code: "P00008", name: "本醸造 1.8L", totalAmount: 3650000, share: 15.9 },
    { rank: 3, code: "P00021", name: "梅酒 500ml", totalAmount: 3080000, share: 13.5 },
    { rank: 4, code: "P00031", name: "特別純米 300ml", totalAmount: 2540000, share: 11.1 },
    { rank: 5, code: "P00044", name: "麦焼酎 900ml", totalAmount: 1990000, share: 8.7 }
  ],
  byCustomer: [
    { rank: 1, code: "C0012", name: "北斗酒販", totalAmount: 5840000, share: 21.6 },
    { rank: 2, code: "C0011", name: "青葉商事", totalAmount: 4980000, share: 18.4 },
    { rank: 3, code: "C0014", name: "東海酒店", totalAmount: 4620000, share: 17.1 },
    { rank: 4, code: "C0013", name: "中央フーズ", totalAmount: 3870000, share: 14.3 },
    { rank: 5, code: "C0016", name: "南星リカー", totalAmount: 2960000, share: 10.9 }
  ]
};

export async function fetchInvoices(filter: InvoiceFilter): Promise<InvoiceRecord[]> {
  const rows = await supabaseQuery<LooseRow>("invoices");

  const source = rows.length
    ? rows.map((row, index) => ({
        id: getString(row, ["id", "invoice_id", "document_no"], `invoice-${index + 1}`),
        documentNo: getString(row, ["document_no", "invoice_no", "slip_no"], `INV-${String(index + 1).padStart(6, "0")}`),
        date: getString(row, ["invoice_date", "date", "sales_date"], new Date().toISOString()),
        customerCode: getString(row, ["customer_code", "legacy_customer_code"], `C${String(index + 1).padStart(4, "0")}`),
        customerName: getString(row, ["customer_name", "display_name"], ""),
        lineCount: getNumber(row, ["line_count", "item_count", "detail_count"], 0),
        totalAmount: getNumber(row, ["total_amount", "amount", "sales_amount"], 0),
        status: getString(row, ["status", "invoice_status"], "処理中")
      }))
    : mockInvoices;

  return source.filter((record) => {
    if (filter.docNo && !record.documentNo.toLowerCase().includes(filter.docNo.toLowerCase())) {
      return false;
    }
    if (
      filter.customerCode &&
      !record.customerCode.toLowerCase().includes(filter.customerCode.toLowerCase())
    ) {
      return false;
    }
    if (filter.startDate && new Date(record.date) < new Date(filter.startDate)) {
      return false;
    }
    if (filter.endDate && new Date(record.date) > new Date(`${filter.endDate}T23:59:59`)) {
      return false;
    }
    return true;
  });
}

export async function fetchCustomerLedger(code: string): Promise<CustomerLedgerSummary | null> {
  const normalizedCode = code.trim().toLowerCase();
  if (!normalizedCode) {
    return null;
  }

  const rows = await supabaseQuery<LooseRow>("customer_payment_status");
  if (rows.length > 0) {
    const matched = rows.find((row) =>
      getString(row, ["legacy_customer_code", "customer_code"]).toLowerCase() === normalizedCode
    );

    if (matched) {
      const customerCode = getString(matched, ["legacy_customer_code", "customer_code"], code);
      return {
        customerCode,
        customerName: getString(matched, ["customer_name", "display_name"], customerCode),
        totalSales: getNumber(matched, ["billed_amount", "total_sales"], 0),
        totalPayments: getNumber(matched, ["paid_amount", "total_payments"], 0),
        balance: getNumber(matched, ["balance_amount", "balance"], 0),
        salesHistory: [],
        paymentHistory: []
      };
    }
  }

  return (
    mockCustomerLedgers.find((ledger) => ledger.customerCode.toLowerCase() === normalizedCode) ?? null
  );
}

export async function fetchSalesAnalytics(): Promise<SalesAnalytics> {
  const rows = await supabaseQuery<DailySalesFactRow>("daily_sales_fact", {
    select: "sales_date,sales_amount",
    order: "sales_date.asc",
    limit: "365"
  });

  if (rows.length > 0) {
    const byMonth = new Map<string, number>();
    rows.forEach((row) => {
      const month = row.sales_date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + toNumber(row.sales_amount));
    });

    const monthlyTrend = [...byMonth.entries()].slice(-12).map(([month, amount]) => ({
      month: `${Number(month.slice(5, 7))}月`,
      amount
    }));

    return {
      generatedAt: new Date().toISOString(),
      monthlyTrend,
      byProduct: mockSalesAnalytics.byProduct,
      byCustomer: mockSalesAnalytics.byCustomer
    };
  }

  return mockSalesAnalytics;
}
