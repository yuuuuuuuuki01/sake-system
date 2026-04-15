// 印刷テンプレート共通型

export type PrintTemplateKey = "chain_store" | "quotation" | "invoice_monthly";

export const PRINT_TEMPLATE_LABELS: Record<PrintTemplateKey, string> = {
  chain_store: "チェーンストア伝票",
  quotation: "見積書",
  invoice_monthly: "請求書（月次）"
};

export interface PrintCompanyInfo {
  name: string;
  postalCode: string;
  address1: string;
  address2: string;
  tel: string;
  fax: string;
  email: string;
  registrationNo: string; // 適格請求書発行事業者番号
  bankName: string;
  bankBranch: string;
  bankAccountType: string; // 普通/当座
  bankAccountNo: string;
  bankAccountHolder: string;
  sealImageUrl: string; // base64 or URL
}

export interface PrintLineItem {
  productCode: string;
  janCode?: string;
  productName: string;
  spec?: string; // 規格（720ml等）
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
  note?: string;
}

export interface PrintDocumentData {
  documentNo: string;
  documentDate: string; // YYYY-MM-DD
  dueDate?: string;
  expireDate?: string;
  customerCode?: string;
  customerName: string;
  customerPostalCode?: string;
  customerAddress?: string;
  customerHonorific: string; // "御中" / "様"
  title?: string; // 見積件名等
  remarks?: string;
  lines: PrintLineItem[];
  taxRate: number; // 0.10 / 0.08
  previousBalance?: number; // 請求書の前月残高
  paymentAmount?: number;
}

export interface PrintOptions {
  pageSize: "A4" | "A5" | "B5";
  orientation: "portrait" | "landscape";
  fontSize: "small" | "medium" | "large";
  showSeal: boolean;
  showRegistrationNo: boolean; // インボイス番号表示
  showBankInfo: boolean;
  showRemarks: boolean;
  showJanCode: boolean;
  showUnit: boolean;
  colorMode: "color" | "mono";
  copies: number; // 控え枚数（甲/乙/丙）
}

export const DEFAULT_PRINT_OPTIONS: PrintOptions = {
  pageSize: "A4",
  orientation: "portrait",
  fontSize: "medium",
  showSeal: true,
  showRegistrationNo: true,
  showBankInfo: true,
  showRemarks: true,
  showJanCode: true,
  showUnit: true,
  colorMode: "color",
  copies: 1
};

export const DEFAULT_COMPANY_INFO: PrintCompanyInfo = {
  name: "金井酒造店",
  postalCode: "257-0014",
  address1: "神奈川県秦野市堀山下182",
  address2: "",
  tel: "0463-88-1511",
  fax: "0463-88-5885",
  email: "info@kaneishuzo.co.jp",
  registrationNo: "T1234567890123",
  bankName: "横浜銀行",
  bankBranch: "秦野支店",
  bankAccountType: "普通",
  bankAccountNo: "1234567",
  bankAccountHolder: "カ）カナイシュゾウテン",
  sealImageUrl: ""
};

export function formatYen(amount: number): string {
  return "¥" + amount.toLocaleString("ja-JP");
}

export function formatJpDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function calculateTotals(lines: PrintLineItem[], taxRate: number) {
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const taxAmount = Math.floor(subtotal * taxRate);
  const total = subtotal + taxAmount;
  return { subtotal, taxAmount, total };
}
