create table if not exists raw_file_ingestions (
  id text primary key,
  source_system text not null,
  source_path text not null,
  source_group text not null,
  file_name text not null,
  file_size bigint not null,
  file_mtime timestamptz not null,
  content_hash text,
  ingested_at timestamptz not null default now(),
  status text not null,
  error_message text
);

create table if not exists customers (
  id text primary key,
  legacy_customer_code text not null unique,
  legacy_customer_subcode text,
  name text not null,
  billing_name text,
  phone text,
  fax text,
  postal_code text,
  address1 text,
  address2 text,
  closing_day integer,
  payment_day integer,
  billing_cycle_type text,
  is_active boolean not null default true,
  source_updated_at timestamptz,
  synced_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  legacy_product_code text not null unique,
  legacy_product_subcode text,
  name text not null,
  kana_name text,
  spec text,
  unit_name text,
  category_code text,
  jan_code text,
  tax_code text,
  is_active boolean not null default true,
  source_updated_at timestamptz,
  synced_at timestamptz not null default now()
);

create table if not exists sales_document_headers (
  id text primary key,
  legacy_document_no text not null unique,
  legacy_customer_code text not null,
  sales_date date,
  posting_date date,
  staff_code text,
  department_code text,
  document_type text,
  status text,
  subtotal_amount numeric(18,2),
  tax_amount numeric(18,2),
  total_amount numeric(18,2),
  source_updated_at timestamptz,
  synced_at timestamptz not null default now()
);

create table if not exists sales_document_lines (
  id text primary key,
  sales_document_header_id text references sales_document_headers(id),
  legacy_document_no text not null,
  line_no integer not null,
  legacy_product_code text,
  quantity numeric(18,4),
  unit_price numeric(18,4),
  line_amount numeric(18,2),
  tax_amount numeric(18,2),
  warehouse_code text,
  note text,
  source_updated_at timestamptz,
  synced_at timestamptz not null default now(),
  unique (legacy_document_no, line_no)
);

create table if not exists payment_receipts (
  id text primary key,
  legacy_payment_no text not null unique,
  legacy_customer_code text not null,
  payment_date date,
  payment_method text,
  payment_amount numeric(18,2),
  reference_document_no text,
  note text,
  source_updated_at timestamptz,
  synced_at timestamptz not null default now()
);

create table if not exists accounts_receivable_balances (
  id text primary key,
  legacy_customer_code text not null,
  as_of_date date not null,
  billing_cycle_key text,
  sales_amount numeric(18,2),
  payment_amount numeric(18,2),
  balance_amount numeric(18,2),
  status text not null,
  source_updated_at timestamptz,
  synced_at timestamptz not null default now(),
  unique (legacy_customer_code, as_of_date, billing_cycle_key)
);

create table if not exists tax_codes (
  id text primary key,
  legacy_tax_code text not null unique,
  name text,
  rate numeric(9,4),
  is_active boolean not null default true,
  source_updated_at timestamptz,
  synced_at timestamptz not null default now()
);

create table if not exists sales_staff (
  id text primary key,
  legacy_staff_code text not null unique,
  name text,
  department_name text,
  is_active boolean not null default true,
  source_updated_at timestamptz,
  synced_at timestamptz not null default now()
);

create table if not exists daily_sales_fact (
  sales_date date not null,
  legacy_customer_code text not null,
  legacy_product_code text not null,
  sales_amount numeric(18,2),
  quantity numeric(18,4),
  document_count integer,
  updated_at timestamptz not null default now(),
  primary key (sales_date, legacy_customer_code, legacy_product_code)
);

create table if not exists customer_payment_status (
  legacy_customer_code text not null,
  as_of_date date not null,
  billed_amount numeric(18,2),
  paid_amount numeric(18,2),
  balance_amount numeric(18,2),
  payment_status text not null,
  updated_at timestamptz not null default now(),
  primary key (legacy_customer_code, as_of_date)
);

create table if not exists invoice_candidate_batches (
  id text primary key,
  legacy_customer_code text not null,
  billing_cycle_key text,
  period_from date,
  period_to date,
  candidate_amount numeric(18,2),
  payment_status text,
  export_status text,
  updated_at timestamptz not null default now()
);

create index if not exists idx_sales_document_headers_customer_date
  on sales_document_headers (legacy_customer_code, sales_date);

create index if not exists idx_payment_receipts_customer_date
  on payment_receipts (legacy_customer_code, payment_date);

create index if not exists idx_ar_balances_customer_date
  on accounts_receivable_balances (legacy_customer_code, as_of_date);

create index if not exists idx_products_jan_code
  on products (jan_code);
