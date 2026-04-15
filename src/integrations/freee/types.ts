export interface FreeePartner {
  id: number;
  name: string;
  code?: string;
}

export interface FreeeItem {
  id: number;
  name: string;
  code?: string;
}

export interface FreeeInvoice {
  id: number;
  issue_date: string;
  partner_id: number;
  total_amount: number;
  status: string;
}

export interface FreeeApiError {
  status_code: number;
  errors: {
    type: string;
    messages: string[];
  }[];
}

export interface CreateInvoiceLineParams {
  item_id?: number;
  description?: string;
  quantity?: number;
  unit_price?: number;
  amount?: number;
}

export interface CreateInvoiceParams {
  issue_date: string;
  partner_id: number;
  due_date?: string;
  title?: string;
  memo?: string;
  invoice_contents?: CreateInvoiceLineParams[];
}

export interface InvoiceCandidateLine {
  legacyProductCode?: string;
  description?: string;
  quantity?: number;
  unitPrice?: number;
  amount?: number;
}

export interface InvoiceCandidate {
  id: string;
  legacyCustomerCode: string;
  customerName?: string;
  issueDate: string;
  dueDate?: string;
  totalAmount: number;
  title?: string;
  memo?: string;
  lines?: InvoiceCandidateLine[];
}

export interface ExportResult {
  candidateId: string;
  legacyCustomerCode: string;
  success: boolean;
  dryRun: boolean;
  freeeInvoiceId?: number;
  message: string;
}
