-- =============================================================================
-- 002_sales.sql : 販売系（SK/SH）
-- 対応する酒仙iファイル:
--   SKDEN.DAT (伝票ヘッダ)
--   SKHSK.DAT (掛売管理)
--   SKHATOR.DAT / SKTOR.DAT (取引)
--   SKMEI.MST (明細)
--   SKKAI.DAT (回収/掛)
--   SHDEN.DAT (出荷伝票ヘッダ 463MB)
--   SHMEI.MST / SHIST_NEW.DAT (出荷明細)
--   SHSEI.DAT (請求 66MB)
--   SHNKI.DAT (納期 79MB)
--   SHOKU.DAT (送り状)
-- =============================================================================

-- 売上伝票ヘッダ (SKDEN.DAT)
create table if not exists sales_document_headers (
    id uuid primary key default gen_random_uuid(),
    legacy_document_no text unique not null,
    document_no text,
    document_type text default 'sales',  -- sales/return/export_return
    sales_date date not null,
    document_date date,
    delivery_date date,
    customer_code text references customers(legacy_customer_code),
    legacy_customer_code text,
    customer_name text,
    customer_address text,
    staff_code text,
    delivery_area_code text,
    subtotal_amount bigint default 0,
    tax_amount bigint default 0,
    total_amount bigint default 0,
    billed_amount bigint default 0,
    payment_amount bigint default 0,
    balance_amount bigint default 0,
    remarks text,
    closing_status text default 'open',  -- open/closed/invoiced
    closed_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_sales_headers_date on sales_document_headers(sales_date desc);
create index if not exists idx_sales_headers_customer on sales_document_headers(customer_code);
create index if not exists idx_sales_headers_docno on sales_document_headers(legacy_document_no);

-- 売上伝票明細 (SKMEI.MST / SKSHI_MEISAI.DAT)
create table if not exists sales_document_lines (
    id uuid primary key default gen_random_uuid(),
    header_id uuid references sales_document_headers(id) on delete cascade,
    document_header_id uuid,
    document_no text,
    line_no smallint default 0,
    product_code text references products(legacy_product_code),
    legacy_product_code text,
    product_name text,
    quantity numeric(12,2) default 0,
    unit text,
    unit_price bigint default 0,
    cost_price bigint default 0,
    line_amount bigint default 0,
    amount bigint default 0,  -- 互換
    tax_category_code text,
    tax_amount bigint default 0,
    discount_amount bigint default 0,
    remarks text,
    created_at timestamptz default now()
);

create index if not exists idx_sales_lines_header on sales_document_lines(header_id);
create index if not exists idx_sales_lines_product on sales_document_lines(product_code);

-- 顧客別掛売/入金状況 (SKHSK.DAT)
create table if not exists customer_payment_status (
    id uuid primary key default gen_random_uuid(),
    legacy_customer_code text unique references customers(legacy_customer_code),
    customer_code text,
    billed_amount bigint default 0,
    paid_amount bigint default 0,
    balance_amount bigint default 0,
    payment_status text default 'unpaid',  -- unpaid/partial/paid
    last_invoice_date date,
    last_payment_date date,
    due_date date,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_cps_customer on customer_payment_status(legacy_customer_code);
create index if not exists idx_cps_status on customer_payment_status(payment_status);

-- 入金履歴 (SKKAI.DAT)
create table if not exists customer_payments (
    id uuid primary key default gen_random_uuid(),
    legacy_customer_code text references customers(legacy_customer_code),
    customer_code text,
    payment_date date not null,
    received_date date,
    amount bigint default 0,
    payment_amount bigint default 0,
    method text,                -- 振込/現金/手形/その他
    payment_method text,
    bank_name text,
    reference_document_no text,
    remarks text,
    created_at timestamptz default now()
);

create index if not exists idx_payments_customer on customer_payments(legacy_customer_code);
create index if not exists idx_payments_date on customer_payments(payment_date desc);

-- 出荷伝票 (SHDEN.DAT) - 納品書/出荷記録
create table if not exists shipment_documents (
    id uuid primary key default gen_random_uuid(),
    legacy_document_no text unique,
    linked_sales_document_id uuid references sales_document_headers(id),
    shipment_date date not null,
    delivery_date date,
    customer_code text references customers(legacy_customer_code),
    customer_name text,
    customer_address text,
    shipping_method text,
    tracking_no text,
    carrier text,
    weight_kg numeric(10,2),
    package_count smallint,
    shipping_cost bigint default 0,
    status text default 'prepared',  -- prepared/shipped/delivered
    shipped_at timestamptz,
    delivered_at timestamptz,
    remarks text,
    created_at timestamptz default now()
);

create index if not exists idx_shipments_date on shipment_documents(shipment_date desc);
create index if not exists idx_shipments_customer on shipment_documents(customer_code);

-- 納品予定・納期 (SHNKI.DAT)
create table if not exists delivery_schedules (
    id uuid primary key default gen_random_uuid(),
    linked_sales_document_id uuid references sales_document_headers(id),
    customer_code text references customers(legacy_customer_code),
    planned_delivery_date date not null,
    confirmed_delivery_date date,
    product_code text references products(legacy_product_code),
    quantity numeric(12,2),
    unit text,
    status text default 'planned',  -- planned/confirmed/shipped/delivered
    priority smallint default 0,
    remarks text,
    created_at timestamptz default now()
);

create index if not exists idx_schedules_planned on delivery_schedules(planned_delivery_date);
create index if not exists idx_schedules_status on delivery_schedules(status);

-- 請求書 (SHSEI.DAT / SKMJKAI.MST)
create table if not exists invoices (
    id uuid primary key default gen_random_uuid(),
    invoice_no text unique not null,
    legacy_invoice_no text,
    customer_code text references customers(legacy_customer_code),
    invoice_month date not null,  -- 対象月（月初日で表現）
    closing_day smallint,
    subtotal_amount bigint default 0,
    tax_amount bigint default 0,
    previous_balance bigint default 0,
    payment_amount bigint default 0,
    billed_amount bigint default 0,
    due_date date,
    status text default 'draft',  -- draft/issued/paid/overdue
    issued_at timestamptz,
    paid_at timestamptz,
    pdf_url text,
    created_at timestamptz default now()
);

create index if not exists idx_invoices_customer_month on invoices(customer_code, invoice_month desc);

-- 日次売上集計 (daily_sales_fact)
create table if not exists daily_sales_fact (
    id uuid primary key default gen_random_uuid(),
    sales_date date unique not null,
    document_count integer default 0,
    total_quantity numeric(14,2) default 0,
    sales_amount bigint default 0,
    tax_amount bigint default 0,
    return_amount bigint default 0,
    net_amount bigint default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_daily_sales_date on daily_sales_fact(sales_date desc);
