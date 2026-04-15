-- =============================================================================
-- 004_purchase_tax.sql : 仕入・手形・税務
-- 対応する酒仙iファイル:
--   H5TOR.DAT (仕入取引 519MB)
--   H5NYU.DAT (原料受入)
--   H5KAIREN.DAT / H5KAI.DAT (買掛)
--   H5SEI.DAT (請求 36MB)
--   H5NKI.DAT (納期 43MB)
--   H5ZEI.MST (税区分)
--   H5IST.DAT (資材移動)
--   OCR (税務関連)
-- =============================================================================

-- 仕入伝票ヘッダ (H5TOR.DAT)
create table if not exists purchase_document_headers (
    id uuid primary key default gen_random_uuid(),
    legacy_document_no text unique not null,
    document_no text,
    document_type text default 'purchase',  -- purchase/return/adjust
    purchase_date date not null,
    supplier_code text references suppliers(legacy_supplier_code),
    legacy_supplier_code text,
    supplier_name text,
    subtotal_amount bigint default 0,
    tax_amount bigint default 0,
    total_amount bigint default 0,
    payment_status text default 'pending',  -- pending/confirmed/paid
    payment_method text,
    due_date date,
    paid_at timestamptz,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_purchase_date on purchase_document_headers(purchase_date desc);
create index if not exists idx_purchase_supplier on purchase_document_headers(supplier_code);

-- 仕入明細
create table if not exists purchase_document_lines (
    id uuid primary key default gen_random_uuid(),
    header_id uuid references purchase_document_headers(id) on delete cascade,
    line_no smallint default 0,
    item_type text,  -- raw_material/material/product
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

-- 買掛管理 (H5KAIREN.DAT / H5KAI.DAT)
create table if not exists supplier_payment_status (
    id uuid primary key default gen_random_uuid(),
    legacy_supplier_code text unique references suppliers(legacy_supplier_code),
    supplier_code text,
    total_purchase bigint default 0,
    paid_amount bigint default 0,
    balance bigint default 0,
    next_payment_date date,
    status text default 'unpaid',  -- unpaid/partial/paid
    last_payment_date date,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 支払履歴
create table if not exists supplier_payments (
    id uuid primary key default gen_random_uuid(),
    legacy_supplier_code text references suppliers(legacy_supplier_code),
    supplier_code text,
    payment_date date not null,
    amount bigint default 0,
    method text,  -- 振込/手形/現金
    bank_name text,
    reference_bill_no text,
    remarks text,
    created_at timestamptz default now()
);

-- 手形管理
create table if not exists bills_of_exchange (
    id uuid primary key default gen_random_uuid(),
    bill_no text unique not null,
    bill_type text default 'payable',  -- payable/receivable
    counterparty_code text,
    counterparty_name text,
    amount bigint not null,
    issue_date date not null,
    due_date date not null,
    bank_name text,
    status text default 'holding',  -- holding/due/cleared/discounted
    cleared_date date,
    discount_date date,
    discount_amount bigint,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_bills_due on bills_of_exchange(due_date);
create index if not exists idx_bills_status on bills_of_exchange(status);

-- =============================================================================
-- 酒税申告
-- =============================================================================

-- 月次酒税申告書
create table if not exists tax_declarations (
    id uuid primary key default gen_random_uuid(),
    target_year integer not null,
    target_month integer not null,
    declaration_type text default 'monthly',  -- monthly/year_end/correction
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
    status text default 'draft',  -- draft/submitted/accepted
    submitted_at timestamptz,
    accepted_at timestamptz,
    reference_no text,  -- eTax受付番号
    xml_data text,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(target_year, target_month, declaration_type)
);

create index if not exists idx_tax_decl_period on tax_declarations(target_year desc, target_month desc);

-- 酒税申告 区分明細
create table if not exists tax_declaration_rows (
    id uuid primary key default gen_random_uuid(),
    declaration_id uuid references tax_declarations(id) on delete cascade,
    tax_category_code text references tax_categories(code),
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

-- 酒税控除明細（輸出/見本/試験/欠減）
create table if not exists tax_deductions (
    id uuid primary key default gen_random_uuid(),
    declaration_id uuid references tax_declarations(id) on delete cascade,
    deduction_type text not null,  -- export/sample/research/loss
    tax_category_code text references tax_categories(code),
    volume numeric(12,2) not null,
    reason text,
    reference_document_no text,
    event_date date,
    created_at timestamptz default now()
);

create index if not exists idx_deductions_decl on tax_deductions(declaration_id);
