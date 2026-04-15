import type { ColumnType, Generated } from "kysely";

type TimestampColumn = ColumnType<Date, Date | string, Date | string>;
type DateColumn = ColumnType<Date, Date | string, Date | string>;
type _NumericColumn = ColumnType<string, number | string, number | string>;
type NullableTimestampColumn = ColumnType<Date | null, Date | string | null, Date | string | null>;
type NullableDateColumn = ColumnType<Date | null, Date | string | null, Date | string | null>;
type NullableNumericColumn = ColumnType<string | null, number | string | null, number | string | null>;

export interface RawFileIngestionsTable {
  id: string;
  source_system: string;
  source_path: string;
  source_group: string;
  file_name: string;
  file_size: ColumnType<string, number | string | bigint, number | string | bigint>;
  file_mtime: TimestampColumn;
  content_hash: string | null;
  ingested_at: Generated<TimestampColumn>;
  status: string;
  error_message: string | null;
}

export interface CustomersTable {
  id: string;
  legacy_customer_code: string;
  legacy_customer_subcode: string | null;
  name: string;
  billing_name: string | null;
  phone: string | null;
  fax: string | null;
  postal_code: string | null;
  address1: string | null;
  address2: string | null;
  closing_day: number | null;
  payment_day: number | null;
  billing_cycle_type: string | null;
  is_active: boolean;
  source_updated_at: NullableTimestampColumn;
  synced_at: Generated<TimestampColumn>;
}

export interface ProductsTable {
  id: string;
  legacy_product_code: string;
  legacy_product_subcode: string | null;
  name: string;
  kana_name: string | null;
  spec: string | null;
  unit_name: string | null;
  category_code: string | null;
  jan_code: string | null;
  tax_code: string | null;
  is_active: boolean;
  source_updated_at: NullableTimestampColumn;
  synced_at: Generated<TimestampColumn>;
}

export interface SalesDocumentHeadersTable {
  id: string;
  legacy_document_no: string;
  legacy_customer_code: string;
  sales_date: NullableDateColumn;
  posting_date: NullableDateColumn;
  staff_code: string | null;
  department_code: string | null;
  document_type: string | null;
  status: string | null;
  subtotal_amount: NullableNumericColumn;
  tax_amount: NullableNumericColumn;
  total_amount: NullableNumericColumn;
  source_updated_at: NullableTimestampColumn;
  synced_at: Generated<TimestampColumn>;
}

export interface SalesDocumentLinesTable {
  id: string;
  sales_document_header_id: string | null;
  legacy_document_no: string;
  line_no: number;
  legacy_product_code: string | null;
  quantity: NullableNumericColumn;
  unit_price: NullableNumericColumn;
  line_amount: NullableNumericColumn;
  tax_amount: NullableNumericColumn;
  warehouse_code: string | null;
  note: string | null;
  source_updated_at: NullableTimestampColumn;
  synced_at: Generated<TimestampColumn>;
}

export interface PaymentReceiptsTable {
  id: string;
  legacy_payment_no: string;
  legacy_customer_code: string;
  payment_date: NullableDateColumn;
  payment_method: string | null;
  payment_amount: NullableNumericColumn;
  reference_document_no: string | null;
  note: string | null;
  source_updated_at: NullableTimestampColumn;
  synced_at: Generated<TimestampColumn>;
}

export interface AccountsReceivableBalancesTable {
  id: string;
  legacy_customer_code: string;
  as_of_date: DateColumn;
  billing_cycle_key: string | null;
  sales_amount: NullableNumericColumn;
  payment_amount: NullableNumericColumn;
  balance_amount: NullableNumericColumn;
  status: string;
  source_updated_at: NullableTimestampColumn;
  synced_at: Generated<TimestampColumn>;
}

export interface TaxCodesTable {
  id: string;
  legacy_tax_code: string;
  name: string | null;
  rate: NullableNumericColumn;
  is_active: boolean;
  source_updated_at: NullableTimestampColumn;
  synced_at: Generated<TimestampColumn>;
}

export interface SalesStaffTable {
  id: string;
  legacy_staff_code: string;
  name: string | null;
  department_name: string | null;
  is_active: boolean;
  source_updated_at: NullableTimestampColumn;
  synced_at: Generated<TimestampColumn>;
}

export interface DailySalesFactTable {
  sales_date: DateColumn;
  legacy_customer_code: string;
  legacy_product_code: string;
  sales_amount: NullableNumericColumn;
  quantity: NullableNumericColumn;
  document_count: number | null;
  updated_at: Generated<TimestampColumn>;
}

export interface CustomerPaymentStatusTable {
  legacy_customer_code: string;
  as_of_date: DateColumn;
  billed_amount: NullableNumericColumn;
  paid_amount: NullableNumericColumn;
  balance_amount: NullableNumericColumn;
  payment_status: string;
  updated_at: Generated<TimestampColumn>;
}

export interface InvoiceCandidateBatchesTable {
  id: string;
  legacy_customer_code: string;
  billing_cycle_key: string | null;
  period_from: NullableDateColumn;
  period_to: NullableDateColumn;
  candidate_amount: NullableNumericColumn;
  payment_status: string | null;
  export_status: string | null;
  updated_at: Generated<TimestampColumn>;
}

export interface Database {
  raw_file_ingestions: RawFileIngestionsTable;
  customers: CustomersTable;
  products: ProductsTable;
  sales_document_headers: SalesDocumentHeadersTable;
  sales_document_lines: SalesDocumentLinesTable;
  payment_receipts: PaymentReceiptsTable;
  accounts_receivable_balances: AccountsReceivableBalancesTable;
  tax_codes: TaxCodesTable;
  sales_staff: SalesStaffTable;
  daily_sales_fact: DailySalesFactTable;
  customer_payment_status: CustomerPaymentStatusTable;
  invoice_candidate_batches: InvoiceCandidateBatchesTable;
}
