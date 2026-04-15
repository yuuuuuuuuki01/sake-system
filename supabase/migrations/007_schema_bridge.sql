-- =============================================================================
-- 007_schema_bridge.sql : 既存スキーマとの互換レイヤー
-- 既存テーブルに不足カラムを追加し、不足テーブルを新規作成する。
-- すべてidempotent（何度実行しても同じ結果）。
-- =============================================================================

-- ─── 既存テーブルへカラム追加 ────────────────────────────────────────────────

-- customers に UI想定フィールドを追加
alter table customers add column if not exists kana_name text;
alter table customers add column if not exists short_name text;
alter table customers add column if not exists customer_code text;
alter table customers add column if not exists email text;
alter table customers add column if not exists credit_limit bigint default 0;
alter table customers add column if not exists tax_mode text default 'tax_included';
alter table customers add column if not exists staff_code text;
alter table customers add column if not exists delivery_area_code text;
alter table customers add column if not exists business_type text;
alter table customers add column if not exists memo text;
alter table customers add column if not exists created_at timestamptz default now();
alter table customers add column if not exists updated_at timestamptz default now();

-- products に UI想定フィールドを追加
alter table products add column if not exists product_code text;
alter table products add column if not exists short_name text;
alter table products add column if not exists alcohol_degree numeric(4,1);
alter table products add column if not exists volume_ml integer;
alter table products add column if not exists purchase_price bigint default 0;
alter table products add column if not exists list_price bigint default 0;
alter table products add column if not exists default_sale_price bigint default 0;
alter table products add column if not exists default_cost_price bigint default 0;
alter table products add column if not exists bottle_type text;
alter table products add column if not exists container_code text;
alter table products add column if not exists season text;
alter table products add column if not exists rice_type text;
alter table products add column if not exists polish_rate numeric(4,1);
alter table products add column if not exists aging_years integer default 0;
alter table products add column if not exists memo text;
alter table products add column if not exists created_at timestamptz default now();
alter table products add column if not exists updated_at timestamptz default now();

-- sales_document_headers に追加
alter table sales_document_headers add column if not exists document_no text;
alter table sales_document_headers add column if not exists document_date date;
alter table sales_document_headers add column if not exists delivery_date date;
alter table sales_document_headers add column if not exists customer_code text;
alter table sales_document_headers add column if not exists customer_name text;
alter table sales_document_headers add column if not exists customer_address text;
alter table sales_document_headers add column if not exists delivery_area_code text;
alter table sales_document_headers add column if not exists billed_amount bigint default 0;
alter table sales_document_headers add column if not exists payment_amount bigint default 0;
alter table sales_document_headers add column if not exists balance_amount bigint default 0;
alter table sales_document_headers add column if not exists remarks text;
alter table sales_document_headers add column if not exists closing_status text default 'open';
alter table sales_document_headers add column if not exists closed_at timestamptz;
alter table sales_document_headers add column if not exists created_at timestamptz default now();
alter table sales_document_headers add column if not exists updated_at timestamptz default now();

-- sales_document_lines に追加
alter table sales_document_lines add column if not exists document_no text;
alter table sales_document_lines add column if not exists legacy_product_code text;
alter table sales_document_lines add column if not exists product_name text;
alter table sales_document_lines add column if not exists amount bigint default 0;
alter table sales_document_lines add column if not exists tax_category_code text;
alter table sales_document_lines add column if not exists tax_amount bigint default 0;
alter table sales_document_lines add column if not exists discount_amount bigint default 0;
alter table sales_document_lines add column if not exists remarks text;

-- customer_payment_status に追加
alter table customer_payment_status add column if not exists customer_code text;
alter table customer_payment_status add column if not exists last_invoice_date date;
alter table customer_payment_status add column if not exists last_payment_date date;
alter table customer_payment_status add column if not exists due_date date;
alter table customer_payment_status add column if not exists created_at timestamptz default now();

-- ─── 不足テーブル新規作成（idをtext型に統一） ─────────────────────────────

create table if not exists suppliers (
    id text primary key,
    legacy_supplier_code text unique not null,
    supplier_code text,
    name text not null,
    kana_name text,
    postal_code text,
    address1 text,
    address2 text,
    phone text,
    fax text,
    email text,
    contact_person text,
    closing_day smallint,
    payment_day smallint,
    supplier_type text,
    is_active boolean default true,
    memo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
create index if not exists idx_suppliers_legacy_code on suppliers(legacy_supplier_code);

create table if not exists staff (
    id text primary key,
    legacy_staff_code text unique not null,
    staff_code text,
    name text not null,
    kana_name text,
    department text,
    is_active boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists alcohol_categories (
    code text primary key,
    name text not null,
    min_degree numeric(4,1),
    max_degree numeric(4,1),
    tax_rate_per_liter bigint not null,
    note text
);

create table if not exists tax_categories (
    code text primary key,
    name text not null,
    tax_rate_per_liter bigint not null,
    alcohol_min numeric(4,1),
    alcohol_max numeric(4,1),
    effective_from date,
    effective_to date,
    note text
);

-- 初期データ
insert into tax_categories (code, name, tax_rate_per_liter, alcohol_min, alcohol_max, effective_from) values
('01', '清酒（普通酒）', 100, 0, 16, '2026-01-01'),
('02', '清酒（純米酒）', 100, 0, 16, '2026-01-01'),
('03', '清酒（吟醸酒）', 100, 0, 16, '2026-01-01'),
('04', '清酒（大吟醸酒）', 100, 0, 17, '2026-01-01'),
('05', '本格焼酎', 250, 20, 45, '2026-01-01'),
('06', 'リキュール', 200, 0, 20, '2026-01-01'),
('07', '果実酒（梅酒含む）', 100, 0, 15, '2026-01-01'),
('08', 'その他醸造酒', 100, 0, 20, '2026-01-01')
on conflict (code) do nothing;

-- 販売系 追加テーブル
create table if not exists customer_payments (
    id text primary key,
    legacy_customer_code text,
    customer_code text,
    payment_date date not null,
    received_date date,
    amount bigint default 0,
    payment_amount bigint default 0,
    method text,
    payment_method text,
    bank_name text,
    reference_document_no text,
    remarks text,
    created_at timestamptz default now()
);
create index if not exists idx_payments_date on customer_payments(payment_date desc);

create table if not exists shipment_documents (
    id text primary key,
    legacy_document_no text unique,
    linked_sales_document_id text,
    shipment_date date not null,
    delivery_date date,
    customer_code text,
    customer_name text,
    customer_address text,
    shipping_method text,
    tracking_no text,
    carrier text,
    weight_kg numeric(10,2),
    package_count smallint,
    shipping_cost bigint default 0,
    status text default 'prepared',
    shipped_at timestamptz,
    delivered_at timestamptz,
    remarks text,
    created_at timestamptz default now()
);

create table if not exists delivery_schedules (
    id text primary key,
    linked_sales_document_id text,
    customer_code text,
    planned_delivery_date date not null,
    confirmed_delivery_date date,
    product_code text,
    quantity numeric(12,2),
    unit text,
    status text default 'planned',
    priority smallint default 0,
    remarks text,
    created_at timestamptz default now()
);

create table if not exists invoices (
    id text primary key,
    invoice_no text unique not null,
    legacy_invoice_no text,
    customer_code text,
    invoice_month date not null,
    closing_day smallint,
    subtotal_amount bigint default 0,
    tax_amount bigint default 0,
    previous_balance bigint default 0,
    payment_amount bigint default 0,
    billed_amount bigint default 0,
    due_date date,
    status text default 'draft',
    issued_at timestamptz,
    paid_at timestamptz,
    pdf_url text,
    created_at timestamptz default now()
);

-- 蔵内系
create table if not exists brewing_batches (
    id text primary key,
    legacy_batch_no text unique not null,
    batch_no text,
    brewing_year integer,
    brand_name text,
    product_code text,
    rice_type text,
    rice_polish_rate numeric(4,1),
    planned_rice_kg numeric(12,2),
    actual_rice_kg numeric(12,2),
    planned_volume_l numeric(12,2),
    actual_volume_l numeric(12,2),
    yeast_type text,
    tank_no text,
    start_date date,
    soe_date date,
    naka_date date,
    tome_date date,
    moto_date date,
    joso_date date,
    expected_done_date date,
    status text default 'planned',
    alcohol_degree numeric(4,1),
    acidity numeric(4,1),
    amino_acid numeric(4,1),
    sakemeter_value numeric(4,1),
    toji_name text,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists brewing_operations (
    id text primary key,
    batch_id text,
    operation_type text not null,
    operated_at timestamptz not null,
    rice_kg numeric(12,2),
    water_l numeric(12,2),
    koji_kg numeric(12,2),
    yeast_amount text,
    temperature_c numeric(5,2),
    notes text,
    operator_name text,
    created_at timestamptz default now()
);

create table if not exists tanks (
    id text primary key,
    tank_no text unique not null,
    display_name text,
    capacity_l numeric(12,2),
    location text,
    tank_type text,
    current_volume_l numeric(12,2) default 0,
    current_product_code text,
    current_batch_id text,
    status text default 'empty',
    last_cleaned_at date,
    last_updated_at timestamptz default now(),
    remarks text,
    created_at timestamptz default now()
);

create table if not exists tank_temperature_logs (
    id text primary key,
    tank_id text,
    tank_no text,
    logged_at timestamptz not null,
    temperature_c numeric(5,2) not null,
    notes text,
    created_at timestamptz default now()
);

create table if not exists tank_transfers (
    id text primary key,
    transfer_date date not null,
    from_tank_no text,
    to_tank_no text,
    batch_id text,
    volume_l numeric(12,2),
    product_code text,
    transfer_type text,
    reason text,
    operator_name text,
    created_at timestamptz default now()
);

create table if not exists kentei_records (
    id text primary key,
    kentei_no text unique,
    batch_id text,
    product_code text,
    kentei_date date not null,
    alcohol_degree numeric(4,1),
    extract_degree numeric(4,1),
    sakemeter_value numeric(4,1),
    volume_l numeric(12,2) not null,
    tax_category_code text,
    tax_amount bigint,
    status text default 'pending',
    submitted_at timestamptz,
    approved_at timestamptz,
    inspector text,
    remarks text,
    created_at timestamptz default now()
);

create table if not exists materials (
    id text primary key,
    legacy_material_code text unique not null,
    material_code text,
    name text not null,
    unit text default '個',
    material_type text,
    current_stock numeric(14,2) default 0,
    minimum_stock numeric(14,2) default 0,
    unit_cost bigint default 0,
    supplier_code text,
    last_purchase_date date,
    is_active boolean default true,
    memo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists material_transactions (
    id text primary key,
    material_id text,
    material_code text,
    transaction_date date not null,
    transaction_type text not null,
    quantity numeric(14,2) not null,
    unit_cost bigint,
    total_amount bigint,
    related_batch_id text,
    related_purchase_id text,
    remarks text,
    operator_name text,
    created_at timestamptz default now()
);

create table if not exists raw_materials (
    id text primary key,
    legacy_material_code text unique not null,
    material_code text,
    name text not null,
    material_type text,
    rice_type text,
    polish_rate numeric(4,1),
    unit text default 'kg',
    current_stock numeric(14,2) default 0,
    minimum_stock numeric(14,2) default 0,
    unit_cost bigint default 0,
    last_purchase_date date,
    supplier_code text,
    storage_location text,
    lot_no text,
    is_active boolean default true,
    memo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 仕入系
create table if not exists purchase_document_headers (
    id text primary key,
    legacy_document_no text unique not null,
    document_no text,
    document_type text default 'purchase',
    purchase_date date not null,
    supplier_code text,
    legacy_supplier_code text,
    supplier_name text,
    subtotal_amount bigint default 0,
    tax_amount bigint default 0,
    total_amount bigint default 0,
    payment_status text default 'pending',
    payment_method text,
    due_date date,
    paid_at timestamptz,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists purchase_document_lines (
    id text primary key,
    header_id text,
    line_no smallint default 0,
    item_type text,
    item_code text,
    item_name text,
    quantity numeric(12,2) default 0,
    unit text,
    unit_price bigint default 0,
    line_amount bigint default 0,
    tax_category_code text,
    tax_amount bigint default 0,
    remarks text,
    created_at timestamptz default now()
);

create table if not exists supplier_payment_status (
    id text primary key,
    legacy_supplier_code text unique,
    supplier_code text,
    total_purchase bigint default 0,
    paid_amount bigint default 0,
    balance bigint default 0,
    next_payment_date date,
    status text default 'unpaid',
    last_payment_date date,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists supplier_payments (
    id text primary key,
    legacy_supplier_code text,
    supplier_code text,
    payment_date date not null,
    amount bigint default 0,
    method text,
    bank_name text,
    reference_bill_no text,
    remarks text,
    created_at timestamptz default now()
);

create table if not exists bills_of_exchange (
    id text primary key,
    bill_no text unique not null,
    bill_type text default 'payable',
    counterparty_code text,
    counterparty_name text,
    amount bigint not null,
    issue_date date not null,
    due_date date not null,
    bank_name text,
    status text default 'holding',
    cleared_date date,
    discount_date date,
    discount_amount bigint,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 税務系
create table if not exists tax_declarations (
    id text primary key,
    target_year integer not null,
    target_month integer not null,
    declaration_type text default 'monthly',
    company_name text,
    company_no text,
    company_address text,
    company_representative text,
    tax_office text,
    total_production_volume numeric(14,2) default 0,
    total_taxable_volume numeric(14,2) default 0,
    total_deduction_volume numeric(14,2) default 0,
    total_tax_amount bigint default 0,
    previous_carryover numeric(14,2) default 0,
    status text default 'draft',
    submitted_at timestamptz,
    accepted_at timestamptz,
    reference_no text,
    xml_data text,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists tax_declaration_rows (
    id text primary key,
    declaration_id text,
    tax_category_code text,
    tax_category_name text,
    alcohol_degree numeric(4,1),
    production_volume numeric(12,2) default 0,
    previous_balance numeric(12,2) default 0,
    current_adjustment numeric(12,2) default 0,
    export_deduction numeric(12,2) default 0,
    sample_deduction numeric(12,2) default 0,
    taxable_volume numeric(12,2) default 0,
    tax_rate bigint not null,
    tax_amount bigint default 0,
    remarks text,
    created_at timestamptz default now()
);

create table if not exists tax_deductions (
    id text primary key,
    declaration_id text,
    deduction_type text not null,
    tax_category_code text,
    volume numeric(12,2) not null,
    reason text,
    reference_document_no text,
    event_date date,
    created_at timestamptz default now()
);
