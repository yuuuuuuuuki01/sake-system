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
  color?: string; // 色
  size?: string; // サイズ
  caseQty?: number; // 入数
  quantity: number;
  unit: string;
  unitPrice: number; // 原単価
  retailPrice?: number; // 売単価
  amount: number; // 原価金額
  discount?: number; // 引(引下)
  correctedQuantity?: number; // 訂正後数量
  receivedAmount?: number; // 受領金額
  returnAmount?: number; // 返品金額
  note?: string;
}

export interface PrintDocumentData {
  documentNo: string;
  documentDate: string; // YYYY-MM-DD
  orderDate?: string; // 発注日
  deliveryDate?: string; // 納品日
  dueDate?: string;
  expireDate?: string;
  customerCode?: string;
  customerName: string;
  customerPostalCode?: string;
  customerAddress?: string;
  customerHonorific: string; // "御中" / "様"
  // チェーンストア統一伝票用
  chainStoreCode?: string; // 柱店コード
  categoryCode?: string; // 分類コード
  slipTypeCode?: string; // 伝票区分
  orderNo?: string; // 発注番号/受注No
  vendorCode?: string; // 取引先コード
  departmentCode?: string; // 部門コード
  settlementPrint?: boolean; // 決算出力フラグ
  // 共通
  title?: string; // 見積件名等
  remarks?: string;
  lines: PrintLineItem[];
  taxRate: number; // 0.10 / 0.08
  previousBalance?: number; // 請求書の前月残高
  paymentAmount?: number;
}

export interface PrintOptions {
  pageSize: "A4" | "A5" | "B5" | "custom";
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
  // チェーンストア伝票の画像下敷き機能
  showReferenceOverlay: boolean;
  overlayOpacity: number; // 0 - 1 (透明度: 1=完全に見える, 0=完全に隠れる)
  overlayImageUrl: string; // /sake-system/reference/chainstore_ref.png
  // 印刷キャリブレーション（プリンタごとの位置調整: +方向=右/下, mm単位）
  calibrationOffsetX: number;
  calibrationOffsetY: number;
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
  copies: 1,
  showReferenceOverlay: false,
  overlayOpacity: 0.4,
  overlayImageUrl: "reference/chainstore_ref.png",
  calibrationOffsetX: 0,
  calibrationOffsetY: 0
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
