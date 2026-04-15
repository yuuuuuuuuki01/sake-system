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
    if (import.meta.env.DEV) {
      return fallback;
    }
    console.warn(`Failed to fetch ${path}`, error);
    throw error;
  }
}

export function fetchSalesSummary(): Promise<SalesSummary> {
  return fetchJson("data/api/latest/sales-summary.json", mockSalesSummary);
}

export function fetchPaymentStatus(): Promise<PaymentStatusSummary> {
  return fetchJson("data/api/latest/payment-status.json", mockPaymentStatus);
}

export function fetchMasterStats(): Promise<MasterStatsSummary> {
  return fetchJson("data/api/latest/master-stats.json", mockMasterStats);
}

export function fetchPipelineMeta(): Promise<PipelineMeta> {
  return fetchJson("data/api/latest/pipeline-meta.json", mockPipelineMeta);
}
