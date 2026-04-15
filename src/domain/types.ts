export type LegacyFileCode =
  | "SHDEN"
  | "SHTOR"
  | "SHSYO"
  | "SHTKI"
  | "SHNKI"
  | "SHSUJ"
  | "SHTNSUJ"
  | "SHTEGATA"
  | "SHZEI"
  | "SHTAN"
  | "SHTANT";

export type PaymentStatus =
  | "unbilled"
  | "billed"
  | "partially_paid"
  | "paid"
  | "special_collection";

export interface Customer {
  id: string;
  legacyCustomerCode: string;
  name: string;
  billingName?: string;
  closingDay?: number;
  paymentDay?: number;
  isActive: boolean;
  sourceUpdatedAt?: string;
}

export interface Product {
  id: string;
  legacyProductCode: string;
  name: string;
  janCode?: string;
  taxCode?: string;
  isActive: boolean;
  sourceUpdatedAt?: string;
}

export interface SalesDocumentHeader {
  id: string;
  legacyDocumentNo: string;
  legacyCustomerCode: string;
  salesDate?: string;
  totalAmount?: number;
  taxAmount?: number;
  staffCode?: string;
  status?: string;
  sourceUpdatedAt?: string;
}

export interface SalesDocumentLine {
  id: string;
  legacyDocumentNo: string;
  lineNo: number;
  legacyProductCode?: string;
  quantity?: number;
  unitPrice?: number;
  lineAmount?: number;
  sourceUpdatedAt?: string;
}

export interface PaymentReceipt {
  id: string;
  legacyPaymentNo: string;
  legacyCustomerCode: string;
  paymentDate?: string;
  paymentAmount?: number;
  paymentMethod?: string;
  sourceUpdatedAt?: string;
}

export interface AccountsReceivableBalance {
  id: string;
  legacyCustomerCode: string;
  asOfDate: string;
  billingCycleKey?: string;
  salesAmount?: number;
  paymentAmount?: number;
  balanceAmount?: number;
  status: PaymentStatus;
  sourceUpdatedAt?: string;
}
