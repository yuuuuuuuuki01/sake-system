-- =============================================================================
-- 001_masters.sql : マスタテーブル定義
-- 対応する酒仙iファイル:
--   sk2mm.mst (15MB, 得意先マスタ)
--   SKSYO.MST / K5SYO.MST / H5SYO.MST / SHSYO.MST (商品マスタ群)
--   H5SIR.MST / SHSIR.MST (仕入先マスタ)
--   SKALC.MST (アルコール区分)
--   H5ZEI.MST / SHZEI.MST (税区分)
--   SKDAI.MST / K5DAI.MST (代行/代理)
-- =============================================================================

-- 得意先マスタ (sk2mm.mst / k52mm.mst)
create table if not exists customers (
    id uuid primary key default gen_random_uuid(),
    legacy_customer_code text unique not null,  -- SK: 得意先コード（10桁）
    customer_code text,
    name text not null,
    kana_name text,
    short_name text,
    postal_code text,
    address1 text,
    address2 text,
    phone text,
    fax text,
    email text,
    closing_day smallint default 31,  -- 締め日
    payment_day smallint default 15,  -- 支払日
    payment_cycle text,  -- 支払サイト
    credit_limit bigint default 0,  -- 与信限度額
    tax_mode text default 'tax_included',
    invoice_type text,
    bank_name text,
    bank_branch text,
    bank_account text,
    staff_code text,
    delivery_area_code text,
    business_type text,  -- 業種区分（酒店/飲食店/百貨店など）
    is_active boolean default true,
    memo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_customers_legacy_code on customers(legacy_customer_code);
create index if not exists idx_customers_name_kana on customers(kana_name);
create index if not exists idx_customers_active on customers(is_active) where is_active;

-- 商品マスタ (SKSYO.MST / K5SYO.MST / H5SYO.MST)
-- 注: モジュールごとに似たファイルがあるが統合管理
create table if not exists products (
    id uuid primary key default gen_random_uuid(),
    legacy_product_code text unique not null,
    product_code text,
    jan_code text,
    name text not null,
    kana_name text,
    short_name text,
    category text,              -- 酒類区分(清酒/焼酎/リキュール等)
    tax_category_code text,     -- 酒税区分コード
    alcohol_degree numeric(4,1),
    volume_ml integer,
    unit text default '本',
    purchase_price bigint default 0,
    list_price bigint default 0,  -- 定価
    default_sale_price bigint default 0,
    default_cost_price bigint default 0,
    bottle_type text,           -- 720ml/1.8L等
    container_code text,
    is_active boolean default true,
    season text,                -- 季節商品フラグ
    rice_type text,             -- 原料米
    polish_rate numeric(4,1),   -- 精米歩合
    aging_years integer default 0,
    memo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_products_legacy_code on products(legacy_product_code);
create index if not exists idx_products_jan on products(jan_code);
create index if not exists idx_products_category on products(category);

-- 仕入先マスタ (H5SIR.MST / SHSIR.MST)
create table if not exists suppliers (
    id uuid primary key default gen_random_uuid(),
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
    supplier_type text,  -- 原料/資材/瓶など
    is_active boolean default true,
    memo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_suppliers_legacy_code on suppliers(legacy_supplier_code);

-- 担当者マスタ
create table if not exists staff (
    id uuid primary key default gen_random_uuid(),
    legacy_staff_code text unique not null,
    staff_code text,
    name text not null,
    kana_name text,
    department text,
    is_active boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- アルコール度区分マスタ (SKALC.MST)
create table if not exists alcohol_categories (
    code text primary key,
    name text not null,
    min_degree numeric(4,1),
    max_degree numeric(4,1),
    tax_rate_per_liter bigint not null,
    note text
);

-- 酒税区分マスタ (H5ZEI.MST / SHZEI.MST)
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

-- 初期データ: 酒類コード
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
-- =============================================================================
-- 003_brewery.sql : 蔵内管理系 (K5)
-- 対応する酒仙iファイル:
--   K5HATOR.DAT / K5TOR.DAT (仕込取引)
--   K5HSK.DAT (蔵内掛)
--   K5MEI.MST (蔵内明細)
--   K5GENGJI.DAT / K5GENJGN.DAT (減免/控除)
--   K5DJGNSK.DAT / K5DJGNSS.DAT (自区分)
--   K5ALC.MST (アルコール度区分)
--   H5JTOR.DAT (仕入取引)
--   H5NYU.DAT (原料受入)
--   H5IST.DAT (資材移動)
-- =============================================================================

-- 仕込記録 (K5HATOR.DAT / K5TOR.DAT)
create table if not exists brewing_batches (
    id uuid primary key default gen_random_uuid(),
    legacy_batch_no text unique not null,
    batch_no text,
    brewing_year integer,
    brand_name text,
    product_code text references products(legacy_product_code),
    rice_type text,              -- 原料米（山田錦など）
    rice_polish_rate numeric(4,1),  -- 精米歩合
    planned_rice_kg numeric(12,2),
    actual_rice_kg numeric(12,2),
    planned_volume_l numeric(12,2),
    actual_volume_l numeric(12,2),
    yeast_type text,
    tank_no text,
    start_date date,
    soe_date date,              -- 添仕込日
    naka_date date,             -- 仲仕込日
    tome_date date,             -- 留仕込日
    moto_date date,             -- 酒母立日
    joso_date date,             -- 上槽日
    expected_done_date date,
    status text default 'planned',  -- planned/active/done/abandoned
    alcohol_degree numeric(4,1),
    acidity numeric(4,1),
    amino_acid numeric(4,1),
    sakemeter_value numeric(4,1),  -- 日本酒度
    toji_name text,              -- 杜氏
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_batches_brewing_year on brewing_batches(brewing_year desc);
create index if not exists idx_batches_status on brewing_batches(status);
create index if not exists idx_batches_tank on brewing_batches(tank_no);

-- 仕込作業ログ（添/仲/留 投入実績） (K5GENJGN系)
create table if not exists brewing_operations (
    id uuid primary key default gen_random_uuid(),
    batch_id uuid references brewing_batches(id) on delete cascade,
    operation_type text not null,  -- moto/soe/naka/tome/upper/transfer等
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

create index if not exists idx_ops_batch on brewing_operations(batch_id);
create index if not exists idx_ops_type on brewing_operations(operation_type);

-- タンク (K5* 内のタンク情報、個別テーブル)
create table if not exists tanks (
    id uuid primary key default gen_random_uuid(),
    tank_no text unique not null,
    display_name text,
    capacity_l numeric(12,2),
    location text,
    tank_type text,  -- 仕込/貯蔵/熟成
    current_volume_l numeric(12,2) default 0,
    current_product_code text,
    current_batch_id uuid references brewing_batches(id),
    status text default 'empty',  -- empty/in_use/aging/cleaning
    last_cleaned_at date,
    last_updated_at timestamptz default now(),
    remarks text,
    created_at timestamptz default now()
);

create index if not exists idx_tanks_status on tanks(status);

-- タンク温度ログ
create table if not exists tank_temperature_logs (
    id uuid primary key default gen_random_uuid(),
    tank_id uuid references tanks(id),
    tank_no text,
    logged_at timestamptz not null,
    temperature_c numeric(5,2) not null,
    notes text,
    created_at timestamptz default now()
);

create index if not exists idx_temp_tank_time on tank_temperature_logs(tank_id, logged_at desc);

-- タンク入出庫履歴
create table if not exists tank_transfers (
    id uuid primary key default gen_random_uuid(),
    transfer_date date not null,
    from_tank_no text,
    to_tank_no text,
    batch_id uuid references brewing_batches(id),
    volume_l numeric(12,2),
    product_code text,
    transfer_type text,  -- transfer/bottling/loss
    reason text,
    operator_name text,
    created_at timestamptz default now()
);

-- 検定記録 (酒税法対応)
create table if not exists kentei_records (
    id uuid primary key default gen_random_uuid(),
    kentei_no text unique,
    batch_id uuid references brewing_batches(id),
    product_code text references products(legacy_product_code),
    kentei_date date not null,
    alcohol_degree numeric(4,1),
    extract_degree numeric(4,1),
    sakemeter_value numeric(4,1),
    volume_l numeric(12,2) not null,
    tax_category_code text references tax_categories(code),
    tax_amount bigint,
    status text default 'pending',  -- pending/submitted/approved/rejected
    submitted_at timestamptz,
    approved_at timestamptz,
    inspector text,
    remarks text,
    created_at timestamptz default now()
);

create index if not exists idx_kentei_date on kentei_records(kentei_date desc);
create index if not exists idx_kentei_status on kentei_records(status);

-- 資材在庫 (H5IST.DAT / H5MEI.MST)
create table if not exists materials (
    id uuid primary key default gen_random_uuid(),
    legacy_material_code text unique not null,
    material_code text,
    name text not null,
    unit text default '個',
    material_type text,  -- 瓶/キャップ/ラベル/化粧箱
    current_stock numeric(14,2) default 0,
    minimum_stock numeric(14,2) default 0,
    unit_cost bigint default 0,
    supplier_code text references suppliers(legacy_supplier_code),
    last_purchase_date date,
    is_active boolean default true,
    memo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_materials_code on materials(legacy_material_code);

-- 資材入出庫
create table if not exists material_transactions (
    id uuid primary key default gen_random_uuid(),
    material_id uuid references materials(id),
    material_code text,
    transaction_date date not null,
    transaction_type text not null,  -- receive/issue/adjust/loss
    quantity numeric(14,2) not null,
    unit_cost bigint,
    total_amount bigint,
    related_batch_id uuid references brewing_batches(id),
    related_purchase_id uuid,
    remarks text,
    operator_name text,
    created_at timestamptz default now()
);

create index if not exists idx_mtrx_material_date on material_transactions(material_id, transaction_date desc);

-- 原料在庫 (H5 原料系)
create table if not exists raw_materials (
    id uuid primary key default gen_random_uuid(),
    legacy_material_code text unique not null,
    material_code text,
    name text not null,
    material_type text,  -- 米/麹/酵母/アルコール
    rice_type text,
    polish_rate numeric(4,1),
    unit text default 'kg',
    current_stock numeric(14,2) default 0,
    minimum_stock numeric(14,2) default 0,
    unit_cost bigint default 0,
    last_purchase_date date,
    supplier_code text references suppliers(legacy_supplier_code),
    storage_location text,
    lot_no text,
    is_active boolean default true,
    memo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_raw_code on raw_materials(legacy_material_code);
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
-- =============================================================================
-- 005_store_email_log.sql : 店舗POS / メール配信 / 同期ログ
-- 対応する酒仙iファイル:
--   ST系 (店舗POS)
-- =============================================================================

-- 店舗売上（直売所POS）
create table if not exists store_sales (
    id uuid primary key default gen_random_uuid(),
    sale_date date not null,
    sale_time time,
    product_code text references products(legacy_product_code),
    product_name text,
    quantity numeric(12,2) default 1,
    unit_price bigint default 0,
    amount bigint not null,
    payment_method text,  -- cash/card/paypay/other
    staff_code text,
    customer_code text,  -- 会員等の紐付け（任意）
    receipt_no text,
    tax_amount bigint default 0,
    remarks text,
    created_at timestamptz default now()
);

create index if not exists idx_store_sales_date on store_sales(sale_date desc);
create index if not exists idx_store_sales_product on store_sales(product_code);

-- 通販・受注
create table if not exists store_orders (
    id uuid primary key default gen_random_uuid(),
    order_no text unique not null,
    order_date date not null,
    channel text default 'online',  -- online/phone/walk_in/fax
    customer_name text not null,
    customer_email text,
    customer_phone text,
    postal_code text,
    shipping_address text,
    gift_flag boolean default false,
    noshi_type text,  -- 熨斗区分
    wrapping_type text,
    total_amount bigint default 0,
    shipping_cost bigint default 0,
    status text default 'new',  -- new/processing/shipped/delivered/cancelled
    shipping_date date,
    tracking_no text,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_orders_date on store_orders(order_date desc);
create index if not exists idx_orders_status on store_orders(status);

-- 受注明細
create table if not exists store_order_lines (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references store_orders(id) on delete cascade,
    line_no smallint default 0,
    product_code text references products(legacy_product_code),
    product_name text,
    quantity numeric(12,2) default 1,
    unit_price bigint default 0,
    amount bigint default 0,
    remarks text
);

-- =============================================================================
-- メール配信
-- =============================================================================

-- メールキャンペーン
create table if not exists email_campaigns (
    id uuid primary key default gen_random_uuid(),
    campaign_name text,
    subject text not null,
    body text not null,
    template_key text,  -- spring/summer/autumn/winter/custom
    audience_mode text default 'all',  -- all/area/history
    audience_filter jsonb,  -- 絞り込み条件
    recipient_count integer default 0,
    sent_count integer default 0,
    failed_count integer default 0,
    status text default 'draft',  -- draft/scheduled/sent/failed
    scheduled_at timestamptz,
    sent_at timestamptz,
    created_by text,
    created_at timestamptz default now()
);

-- 送信履歴
create table if not exists email_sends (
    id uuid primary key default gen_random_uuid(),
    campaign_id uuid references email_campaigns(id) on delete cascade,
    customer_code text references customers(legacy_customer_code),
    to_email text not null,
    status text default 'pending',  -- pending/sent/failed
    resend_message_id text,  -- Resend APIのID
    error_message text,
    sent_at timestamptz,
    opened_at timestamptz,
    clicked_at timestamptz,
    created_at timestamptz default now()
);

create index if not exists idx_sends_campaign on email_sends(campaign_id);

-- =============================================================================
-- リレー同期ログ
-- =============================================================================

-- リレーエージェント実行ログ
create table if not exists relay_sync_log (
    id uuid primary key default gen_random_uuid(),
    sync_started_at timestamptz not null,
    sync_ended_at timestamptz,
    status text default 'running',  -- running/success/failed/partial
    modules_synced text[],
    files_scanned integer default 0,
    files_updated integer default 0,
    rows_upserted integer default 0,
    errors jsonb,
    agent_version text,
    agent_hostname text,
    log_text text,
    created_at timestamptz default now()
);

create index if not exists idx_relay_log_started on relay_sync_log(sync_started_at desc);

-- リレー設定（WebUIから変更可能な動的設定）
create table if not exists relay_settings (
    id uuid primary key default gen_random_uuid(),
    key text unique not null,
    value jsonb,
    description text,
    updated_at timestamptz default now(),
    updated_by text
);

-- 初期設定
insert into relay_settings (key, value, description) values
('sync_interval_minutes', '5', '同期間隔（分）'),
('sync_modules', '["sk","sh","k5","h5"]', '同期対象モジュール'),
('log_level', '"INFO"', 'ログレベル')
on conflict (key) do nothing;

-- 操作ログ（監査用）
create table if not exists audit_logs (
    id uuid primary key default gen_random_uuid(),
    action text not null,
    entity_type text,
    entity_id text,
    user_email text,
    changes jsonb,
    ip_address inet,
    user_agent text,
    created_at timestamptz default now()
);

create index if not exists idx_audit_entity on audit_logs(entity_type, entity_id);
create index if not exists idx_audit_user on audit_logs(user_email);
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
-- =============================================================================
-- 008_analytics_views.sql : 営業分析ビュー・集計テーブル・日次更新関数
--
-- 以下を提供:
--   1. daily_sales_detail ビュー (日次売上集計)
--   2. customer_sales_summary テーブル (得意先別売上集計 - 日次更新)
--   3. product_monthly_shipments テーブル (商品×月別出荷量 - 日次更新)
--   4. churn_alert ビュー (離反/休眠アラート)
--   5. product_seasonal_profile テーブル (季節プロファイル - 日次更新)
--   6. visit_priority テーブル (訪問優先度スコア - 日次更新)
--   7. refresh_analytics() 関数 (全集計テーブルを一括更新)
--   8. pg_cron で毎日5:00 JSTに自動実行
-- =============================================================================

-- ── 0. パフォーマンス用インデックス ────────────────────────────────────────
-- sales_document_lines(700K件)の JOIN を高速化するため必須
create index if not exists idx_sdl_header_id  on sales_document_lines(sales_document_header_id);
create index if not exists idx_sdl_product_code on sales_document_lines(legacy_product_code);
create index if not exists idx_sdh_sales_date  on sales_document_headers(sales_date);

-- ── 1. 日次売上サマリー (マテリアライズドビュー + ビュー) ────────────────────
-- 直接 JOIN すると REST API のタイムアウト(8-10秒)に引っかかるため、
-- マテリアライズドビュー daily_sales_agg に事前集計する。
-- refresh_daily_sales_fact() が呼ばれるたびに CONCURRENTLY リフレッシュされる。

create materialized view if not exists daily_sales_agg as
with hdr as (
  select sales_date, count(*) as document_count, sum(total_amount) as amount
  from sales_document_headers where sales_date is not null group by sales_date
),
lns as (
  select h.sales_date,
    sum(l.quantity) as bottles,
    sum(l.quantity * coalesce(p.volume_ml, 0)) as volume_ml
  from sales_document_headers h
  join sales_document_lines l on l.sales_document_header_id = h.id
  left join products p on p.legacy_product_code = l.legacy_product_code
  where h.sales_date is not null group by h.sales_date
)
select hdr.sales_date, hdr.document_count, hdr.amount,
  coalesce(lns.bottles, 0) as bottles, coalesce(lns.volume_ml, 0) as volume_ml,
  case when coalesce(lns.bottles, 0) > 0
       then round(hdr.amount / coalesce(lns.bottles, 0), 0) else 0 end as price_per_bottle,
  case when coalesce(lns.volume_ml, 0) > 0
       then round(hdr.amount / (coalesce(lns.volume_ml, 0) / 1000.0), 0) else 0 end as price_per_liter
from hdr left join lns on lns.sales_date = hdr.sales_date
order by hdr.sales_date with data;

-- REFRESH CONCURRENTLY に必要なユニークインデックス
create unique index if not exists idx_daily_sales_agg_date on daily_sales_agg(sales_date);
grant select on daily_sales_agg to anon, authenticated;

-- ダッシュボードはこのビュー経由でアクセス (互換性維持)
create or replace view daily_sales_detail as
select * from daily_sales_agg order by sales_date;

-- ── 2. 得意先別売上集計テーブル ─────────────────────────────────────────────

create table if not exists customer_sales_summary (
  customer_code       text primary key,
  customer_name       text,
  business_type       text,
  area_code           text,
  phone               text,
  last_order_date     date,
  days_since_order    integer,
  order_count_12m     integer default 0,
  amount_12m          bigint default 0,
  order_count_3m      integer default 0,
  amount_3m           bigint default 0,
  amount_last_year_same_month bigint default 0,
  amount_this_month   bigint default 0,
  is_dormant          boolean default false,  -- 12ヶ月内注文あり＆3ヶ月ゼロ
  is_at_risk          boolean default false,  -- 前年同月注文あり＆今月ゼロ
  annual_revenue      bigint default 0,
  updated_at          timestamptz default now()
);

create index if not exists idx_css_dormant on customer_sales_summary(is_dormant) where is_dormant;
create index if not exists idx_css_at_risk on customer_sales_summary(is_at_risk) where is_at_risk;

-- ── 3. 商品×月別出荷量テーブル ──────────────────────────────────────────────

create table if not exists product_monthly_shipments (
  product_code        text primary key,
  product_name        text,
  category            text,
  m01 integer default 0, m02 integer default 0, m03 integer default 0,
  m04 integer default 0, m05 integer default 0, m06 integer default 0,
  m07 integer default 0, m08 integer default 0, m09 integer default 0,
  m10 integer default 0, m11 integer default 0, m12 integer default 0,
  total_quantity       integer default 0,
  total_amount         bigint default 0,
  updated_at           timestamptz default now()
);

-- ── 4. 離反/休眠アラート (ビュー — customer_sales_summaryから導出) ────────

create or replace view churn_alert as
select
  customer_code,
  customer_name,
  business_type,
  area_code,
  phone,
  last_order_date,
  days_since_order,
  amount_12m,
  case
    when is_dormant then '休眠'
    when is_at_risk then '離反リスク'
  end as alert_type
from customer_sales_summary
where is_dormant or is_at_risk
order by amount_12m desc;

-- ── 5. 商品季節プロファイル ──────────────────────────────────────────────────

create table if not exists product_seasonal_profile (
  product_code        text primary key,
  product_name        text,
  season_type         text default 'year-round',  -- year-round/seasonal/year-end
  peak_months         integer[] default '{}',       -- 0-indexed months
  proposal_month      integer,                      -- 提案開始月 (0-indexed)
  avg_monthly_qty     integer default 0,
  updated_at          timestamptz default now()
);

-- ── 6. 訪問優先度テーブル ───────────────────────────────────────────────────

create table if not exists visit_priority (
  customer_code       text primary key,
  customer_name       text,
  phone               text,
  address             text,
  area_code           text,
  business_type       text,
  priority_score      integer default 0,
  reasons             text[] default '{}',
  last_order_date     date,
  days_since_order    integer,
  annual_revenue      bigint default 0,
  recommended_action  text,
  updated_at          timestamptz default now()
);

create index if not exists idx_vp_score on visit_priority(priority_score desc);
create index if not exists idx_vp_area on visit_priority(area_code);

-- ── 7. 全集計テーブル一括更新関数 ───────────────────────────────────────────

create or replace function refresh_analytics()
returns void
language plpgsql
security definer
as $$
declare
  v_today       date := current_date;
  v_3m_ago      date := current_date - interval '3 months';
  v_12m_ago     date := current_date - interval '12 months';
  v_this_month  text := to_char(current_date, 'YYYY-MM');
  v_ly_month    text := to_char(current_date - interval '1 year', 'YYYY-MM');
begin
  -- ────────────────────────────────────────────────────────
  -- A) customer_sales_summary
  -- ────────────────────────────────────────────────────────
  truncate customer_sales_summary;

  insert into customer_sales_summary (
    customer_code, customer_name, business_type, area_code, phone,
    last_order_date, days_since_order,
    order_count_12m, amount_12m, order_count_3m, amount_3m,
    amount_last_year_same_month, amount_this_month,
    is_dormant, is_at_risk, annual_revenue, updated_at
  )
  select
    c.legacy_customer_code,
    c.name,
    c.business_type,
    c.delivery_area_code,
    c.phone,
    max(h.sales_date),
    v_today - max(h.sales_date),
    -- 12ヶ月
    count(distinct h.id) filter (where h.sales_date >= v_12m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    -- 3ヶ月
    count(distinct h.id) filter (where h.sales_date >= v_3m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_3m_ago), 0),
    -- 前年同月
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_ly_month), 0),
    -- 今月
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_this_month), 0),
    -- 休眠: 12ヶ月内注文あり & 3ヶ月ゼロ
    (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
     and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0),
    -- 離反リスク: 前年同月注文あり & 今月ゼロ (休眠でない)
    (sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_ly_month) > 0
     and coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_this_month), 0) = 0
     and not (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
              and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0)),
    -- 年間売上
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    now()
  from customers c
  left join sales_document_headers h
    on h.legacy_customer_code = c.legacy_customer_code
  where c.is_active = true
  group by c.legacy_customer_code, c.name, c.business_type, c.delivery_area_code, c.phone;

  -- ────────────────────────────────────────────────────────
  -- B) product_monthly_shipments
  -- ────────────────────────────────────────────────────────
  truncate product_monthly_shipments;

  insert into product_monthly_shipments (
    product_code, product_name, category,
    m01, m02, m03, m04, m05, m06,
    m07, m08, m09, m10, m11, m12,
    total_quantity, total_amount, updated_at
  )
  select
    coalesce(l.product_code, l.legacy_product_code),
    coalesce(l.product_name, p.name, l.product_code),
    coalesce(p.category, ''),
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 1), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 2), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 3), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 4), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 5), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 6), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 7), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 8), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 9), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 10), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 11), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 12), 0)::int,
    coalesce(sum(l.quantity), 0)::int,
    coalesce(sum(coalesce(l.line_amount, l.amount)), 0),
    now()
  from sales_document_lines l
  join sales_document_headers h on h.id = l.header_id
  left join products p on p.legacy_product_code = coalesce(l.product_code, l.legacy_product_code)
  where coalesce(l.product_code, l.legacy_product_code) is not null
  group by coalesce(l.product_code, l.legacy_product_code),
           coalesce(l.product_name, p.name, l.product_code),
           coalesce(p.category, '')
  having sum(l.quantity) > 0;

  -- ────────────────────────────────────────────────────────
  -- C) product_seasonal_profile
  -- ────────────────────────────────────────────────────────
  truncate product_seasonal_profile;

  insert into product_seasonal_profile (
    product_code, product_name, season_type, peak_months, proposal_month, avg_monthly_qty, updated_at
  )
  select
    s.product_code,
    s.product_name,
    case
      -- 歳暮: 11+12月が全体の50%超
      when (s.m11 + s.m12)::numeric / greatest(s.total_quantity, 1) > 0.5 then 'year-end'
      -- 季節品: 出荷月が6ヶ月以下
      when (case when s.m01>0 then 1 else 0 end + case when s.m02>0 then 1 else 0 end
          + case when s.m03>0 then 1 else 0 end + case when s.m04>0 then 1 else 0 end
          + case when s.m05>0 then 1 else 0 end + case when s.m06>0 then 1 else 0 end
          + case when s.m07>0 then 1 else 0 end + case when s.m08>0 then 1 else 0 end
          + case when s.m09>0 then 1 else 0 end + case when s.m10>0 then 1 else 0 end
          + case when s.m11>0 then 1 else 0 end + case when s.m12>0 then 1 else 0 end) <= 6
      then 'seasonal'
      else 'year-round'
    end,
    -- peak_months: 平均の150%超の月 (0-indexed)
    array(
      select m - 1 from (
        values (1, s.m01),(2, s.m02),(3, s.m03),(4, s.m04),(5, s.m05),(6, s.m06),
               (7, s.m07),(8, s.m08),(9, s.m09),(10, s.m10),(11, s.m11),(12, s.m12)
      ) as v(m, qty)
      where qty > (s.total_quantity::numeric / 12) * 1.5
      order by m
    ),
    -- proposal_month: ピーク月の2ヶ月前 (最初のピーク月基準, 0-indexed)
    (select ((m - 1 + 10) % 12) from (
      values (1, s.m01),(2, s.m02),(3, s.m03),(4, s.m04),(5, s.m05),(6, s.m06),
             (7, s.m07),(8, s.m08),(9, s.m09),(10, s.m10),(11, s.m11),(12, s.m12)
    ) as v(m, qty)
    where qty > (s.total_quantity::numeric / 12) * 1.5
    order by m limit 1),
    s.total_quantity / 12,
    now()
  from product_monthly_shipments s
  where s.total_quantity > 0;

  -- ────────────────────────────────────────────────────────
  -- D) visit_priority
  -- ────────────────────────────────────────────────────────
  truncate visit_priority;

  insert into visit_priority (
    customer_code, customer_name, phone, address, area_code, business_type,
    priority_score, reasons, last_order_date, days_since_order,
    annual_revenue, recommended_action, updated_at
  )
  select
    cs.customer_code,
    cs.customer_name,
    cs.phone,
    c.address1,
    cs.area_code,
    cs.business_type,
    -- スコア計算
    (case when cs.days_since_order > 60 then 50 else 0 end)          -- 離反リスク
    + (case when exists (
        select 1 from product_seasonal_profile sp
        where sp.proposal_month = extract(month from current_date) - 1 -- 0-indexed current month
      ) then 30 else 0 end)                                           -- 季節提案
    + (case when cs.days_since_order between 30 and 59 then 20 else 0 end) -- 定期巡回
    + least(20, (cs.annual_revenue::numeric / greatest(
        (select max(annual_revenue) from customer_sales_summary), 1
      ) * 20)::int),                                                   -- 金額ウェイト
    -- reasons
    array_remove(array[
      case when cs.days_since_order > 60 then '離反リスク(' || cs.days_since_order || '日)' end,
      case when cs.days_since_order between 30 and 59 then '定期巡回(' || cs.days_since_order || '日)' end,
      case when exists (
        select 1 from product_seasonal_profile sp
        where sp.proposal_month = extract(month from current_date) - 1
      ) then '季節提案あり' end
    ], null),
    cs.last_order_date,
    cs.days_since_order,
    cs.annual_revenue,
    case
      when cs.is_dormant then '再開アプローチ — 新商品/季節品で接点復活'
      when cs.is_at_risk then 'フォロー電話 — 前年同月の注文確認'
      when cs.days_since_order between 30 and 59 then '定期訪問 — 在庫確認・追加提案'
      else '維持訪問'
    end,
    now()
  from customer_sales_summary cs
  join customers c on c.legacy_customer_code = cs.customer_code
  where cs.annual_revenue > 0
    and cs.last_order_date is not null
  order by priority_score desc;

end;
$$;

-- ── 8. 初回実行 ─────────────────────────────────────────────────────────────
-- マイグレーション適用時に一度実行
select refresh_analytics();

-- ── 9. pg_cron 日次スケジュール (毎日05:00 JST = 20:00 UTC) ────────────────
-- pg_cron拡張が有効な場合のみ実行。エラーが出ても無視する。
do $$
begin
  -- pg_cron が使える場合のみ
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule('refresh_analytics_daily');
    perform cron.schedule(
      'refresh_analytics_daily',
      '0 20 * * *',  -- 20:00 UTC = 05:00 JST
      'select refresh_analytics()'
    );
  end if;
exception when others then
  raise notice 'pg_cron not available — set up external scheduler for refresh_analytics()';
end;
$$;
-- =============================================================================
-- 009_staff_analytics.sql : 担当者別売上分析ビュー
-- =============================================================================

-- 担当者別売上合計（得意先マスタのstaff_codeを使用）
create or replace view mv_staff_sales_totals as
select
  coalesce(c.staff_code, '―') as code,
  coalesce(s.name, '担当' || c.staff_code, '未設定') as name,
  coalesce(sum(h.total_amount), 0) as amount,
  coalesce(sum(l.quantity), 0) as quantity,
  count(distinct h.id) as documents
from sales_document_headers h
left join customers c on c.legacy_customer_code = h.legacy_customer_code
left join staff s on s.legacy_staff_code = c.staff_code
left join sales_document_lines l on l.sales_document_header_id = h.id
where h.sales_date is not null
group by c.staff_code, s.name
order by amount desc;

-- 担当者×得意先別内訳
create or replace view mv_staff_customer_breakdown as
select
  coalesce(c.staff_code, '―') as staff_code,
  coalesce(s.name, '担当' || c.staff_code, '未設定') as staff_name,
  coalesce(h.legacy_customer_code, '―') as code,
  coalesce(c.name, h.legacy_customer_code) as name,
  coalesce(c.business_type, '') as tag,
  coalesce(sum(h.total_amount), 0) as amount,
  count(distinct h.id) as documents,
  0::numeric as quantity
from sales_document_headers h
left join customers c on c.legacy_customer_code = h.legacy_customer_code
left join staff s on s.legacy_staff_code = c.staff_code
where h.sales_date is not null
group by c.staff_code, s.name, h.legacy_customer_code, c.name, c.business_type
order by amount desc;

-- 担当者×商品別内訳
create or replace view mv_staff_product_breakdown as
select
  coalesce(c.staff_code, '―') as staff_code,
  coalesce(s.name, '担当' || c.staff_code, '未設定') as staff_name,
  coalesce(l.legacy_product_code) as code,
  coalesce(p.name, l.product_name, l.legacy_product_code) as name,
  coalesce(p.category_code, '') as tag,
  coalesce(sum(l.line_amount), 0) as amount,
  coalesce(sum(l.quantity), 0) as quantity,
  count(distinct h.id) as documents
from sales_document_lines l
join sales_document_headers h on l.sales_document_header_id = h.id
left join customers c on c.legacy_customer_code = h.legacy_customer_code
left join staff s on s.legacy_staff_code = c.staff_code
left join products p on p.legacy_product_code = l.legacy_product_code
where h.sales_date is not null
group by c.staff_code, s.name, l.legacy_product_code, p.name, l.product_name, p.category_code
order by amount desc;
-- =============================================================================
-- 010_staff_period_rpc.sql : 担当者別売上 - 期間フィルター対応RPC
-- =============================================================================

-- 担当者別合計（期間指定）
create or replace function get_staff_totals_by_period(
  p_date_from date default null,
  p_date_to   date default null
)
returns table (
  code      text,
  name      text,
  amount    numeric,
  quantity  numeric,
  documents bigint
)
language sql stable as $$
  select
    coalesce(c.staff_code, '―')                              as code,
    coalesce(s.name, '担当' || c.staff_code, '未設定')       as name,
    coalesce(sum(h.total_amount), 0)                          as amount,
    coalesce(sum(l.quantity), 0)                              as quantity,
    count(distinct h.id)                                      as documents
  from sales_document_headers h
  left join customers c on c.legacy_customer_code = h.legacy_customer_code
  left join staff s on s.legacy_staff_code = c.staff_code
  left join sales_document_lines l on l.sales_document_header_id = h.id
  where h.sales_date is not null
    and (p_date_from is null or h.sales_date >= p_date_from)
    and (p_date_to   is null or h.sales_date <= p_date_to)
  group by c.staff_code, s.name
  order by sum(h.total_amount) desc nulls last;
$$;

-- 担当者×得意先内訳（期間指定）
create or replace function get_staff_customer_breakdown(
  p_staff_code text,
  p_date_from  date default null,
  p_date_to    date default null
)
returns table (
  staff_code  text,
  staff_name  text,
  code        text,
  name        text,
  tag         text,
  amount      numeric,
  quantity    numeric,
  documents   bigint
)
language sql stable as $$
  select
    coalesce(c.staff_code, '―')                              as staff_code,
    coalesce(s.name, '担当' || c.staff_code, '未設定')       as staff_name,
    coalesce(h.legacy_customer_code, '―')                    as code,
    coalesce(c.name, h.legacy_customer_code)                  as name,
    coalesce(c.business_type, '')                             as tag,
    coalesce(sum(h.total_amount), 0)                          as amount,
    0::numeric                                                as quantity,
    count(distinct h.id)                                      as documents
  from sales_document_headers h
  left join customers c on c.legacy_customer_code = h.legacy_customer_code
  left join staff s on s.legacy_staff_code = c.staff_code
  where h.sales_date is not null
    and coalesce(c.staff_code, '―') = p_staff_code
    and (p_date_from is null or h.sales_date >= p_date_from)
    and (p_date_to   is null or h.sales_date <= p_date_to)
  group by c.staff_code, s.name, h.legacy_customer_code, c.name, c.business_type
  order by sum(h.total_amount) desc nulls last;
$$;

-- 担当者×商品内訳（期間指定）
create or replace function get_staff_product_breakdown(
  p_staff_code text,
  p_date_from  date default null,
  p_date_to    date default null
)
returns table (
  staff_code  text,
  staff_name  text,
  code        text,
  name        text,
  tag         text,
  amount      numeric,
  quantity    numeric,
  documents   bigint
)
language sql stable as $$
  select
    coalesce(c.staff_code, '―')                              as staff_code,
    coalesce(s.name, '担当' || c.staff_code, '未設定')       as staff_name,
    coalesce(l.legacy_product_code, '―')                     as code,
    coalesce(p.name, l.product_name, l.legacy_product_code)  as name,
    coalesce(p.category_code, '')                             as tag,
    coalesce(sum(l.line_amount), 0)                           as amount,
    coalesce(sum(l.quantity), 0)                              as quantity,
    count(distinct h.id)                                      as documents
  from sales_document_lines l
  join sales_document_headers h on l.sales_document_header_id = h.id
  left join customers c on c.legacy_customer_code = h.legacy_customer_code
  left join staff s on s.legacy_staff_code = c.staff_code
  left join products p on p.legacy_product_code = l.legacy_product_code
  where h.sales_date is not null
    and coalesce(c.staff_code, '―') = p_staff_code
    and (p_date_from is null or h.sales_date >= p_date_from)
    and (p_date_to   is null or h.sales_date <= p_date_to)
  group by c.staff_code, s.name, l.legacy_product_code, p.name, l.product_name, p.category_code
  order by sum(l.line_amount) desc nulls last;
$$;
-- =============================================================================
-- 009_demand_planning.sql : 需要分析・安全在庫・生産計画
-- Step 1: 月次商品別売上実績マート
-- Step 2: 商品別安全在庫パラメータ
-- Step 3: 月次生産計画
-- =============================================================================

-- ─── Step 1: 月次商品別売上実績マート ────────────────────────────────────────
-- sales_document_lines を月×商品単位で集約したマートテーブル。
-- パイプライン同期時またはバッチで再計算することを想定。

create table if not exists product_monthly_sales (
    id                  text primary key default gen_random_uuid()::text,
    year_month          text        not null,  -- 'YYYY-MM'
    product_code        text        not null,
    product_name        text,
    quantity            numeric(14,2) default 0,
    amount              bigint        default 0,
    document_count      integer       default 0,
    created_at          timestamptz   default now(),
    updated_at          timestamptz   default now(),
    unique(year_month, product_code)
);

create index if not exists idx_pms_year_month on product_monthly_sales(year_month desc);
create index if not exists idx_pms_product    on product_monthly_sales(product_code);

-- ─── Step 2: 商品別安全在庫パラメータ ────────────────────────────────────────
-- 安全在庫 SS = Z × σ × √(lead_time_days / 30)
--   Z          = サービス率係数 (0.90→1.28 / 0.95→1.65 / 0.99→2.33)
--   σ          = 月次需要の標準偏差 (実績から算出)
--   lead_time  = 発注〜入荷までの日数

create table if not exists product_safety_stock_params (
    product_code        text        primary key,
    product_name        text,
    unit                text        default '本',
    avg_monthly_demand  numeric(14,2) default 0,   -- 直近12ヶ月平均
    demand_std_dev      numeric(14,2) default 0,   -- 月次標準偏差
    lead_time_days      integer       default 30,  -- リードタイム（日）
    service_level       numeric(4,2)  default 0.95, -- 目標サービス率
    safety_stock_qty    numeric(14,2) default 0,   -- 算出安全在庫数
    reorder_point       numeric(14,2) default 0,   -- 発注点
    last_calc_at        timestamptz,
    memo                text,
    created_at          timestamptz   default now(),
    updated_at          timestamptz   default now()
);

-- ─── Step 3: 月次生産計画 ────────────────────────────────────────────────────
-- 必要生産数 = demand_forecast + safety_stock_target - opening_stock
-- planned_qty は人が調整して入力する。actual_qty は確定後に入力。

create table if not exists production_plan (
    id                  text        primary key default gen_random_uuid()::text,
    year_month          text        not null,  -- 'YYYY-MM'
    product_code        text        not null,
    product_name        text,
    demand_forecast     numeric(14,2) default 0,  -- 需要予測（移動平均）
    safety_stock_target numeric(14,2) default 0,  -- 安全在庫目標
    opening_stock       numeric(14,2) default 0,  -- 期首在庫（前月繰越）
    required_production numeric(14,2) default 0,  -- 必要生産 = forecast + ss - opening
    planned_qty         numeric(14,2) default 0,  -- 計画数（人が調整）
    actual_qty          numeric(14,2) default 0,  -- 実績数
    status              text          default 'draft',  -- draft/confirmed/actual
    notes               text,
    created_at          timestamptz   default now(),
    updated_at          timestamptz   default now(),
    unique(year_month, product_code)
);

create index if not exists idx_pp_year_month  on production_plan(year_month desc);
create index if not exists idx_pp_product     on production_plan(product_code);
create index if not exists idx_pp_status      on production_plan(status);
-- refresh_all_analytics() に需要計画系RPCを追加
-- product_monthly_sales と product_safety_stock_params を daily_sales_fact 再集計後に更新する

CREATE OR REPLACE FUNCTION refresh_all_analytics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM refresh_daily_sales_fact();
  PERFORM refresh_product_monthly_sales();
  PERFORM refresh_safety_stock_params();
END;
$$;
-- production_plan に production_type 列を追加
-- refresh_product_monthly_sales() の対象期間を 36 → 60 ヶ月に拡張

ALTER TABLE production_plan
  ADD COLUMN IF NOT EXISTS production_type text NOT NULL DEFAULT 'monthly';

CREATE OR REPLACE FUNCTION refresh_product_monthly_sales()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM product_monthly_sales
  WHERE year_month >= to_char(now() - interval '60 months', 'YYYY-MM');

  INSERT INTO product_monthly_sales (year_month, product_code, product_name, quantity, amount, document_count)
  SELECT
    to_char(sale_date, 'YYYY-MM')        AS year_month,
    product_code,
    MIN(product_name)                    AS product_name,
    SUM(quantity)                        AS quantity,
    SUM(amount)                          AS amount,
    COUNT(DISTINCT slip_number)          AS document_count
  FROM daily_sales_fact
  WHERE sale_date >= (date_trunc('month', now()) - interval '60 months')
    AND sale_type IN ('normal', 'return')
  GROUP BY to_char(sale_date, 'YYYY-MM'), product_code
  ON CONFLICT (year_month, product_code) DO UPDATE
    SET product_name   = EXCLUDED.product_name,
        quantity       = EXCLUDED.quantity,
        amount         = EXCLUDED.amount,
        document_count = EXCLUDED.document_count,
        updated_at     = now();
END;
$$;
-- product_safety_stock_params に production_type 列を追加
-- 過去データのパターンから自動分類（初期値）

ALTER TABLE product_safety_stock_params
  ADD COLUMN IF NOT EXISTS production_type text NOT NULL DEFAULT 'monthly';

-- product_monthly_sales からパターン指標を計算して分類
WITH stats AS (
  SELECT
    product_code,
    AVG(quantity)                                           AS avg_qty,
    STDDEV(quantity)                                        AS std_qty,
    CASE WHEN AVG(quantity) > 0
         THEN STDDEV(quantity) / AVG(quantity) ELSE 1 END  AS cv,
    COUNT(*) FILTER (
      WHERE year_month >= to_char(now() - interval '12 months','YYYY-MM')
    )                                                       AS months_active_12,
    CASE WHEN SUM(quantity) > 0
      THEN SUM(quantity) FILTER (
             WHERE EXTRACT(MONTH FROM (year_month || '-01')::date) IN (11,12,1)
           ) / SUM(quantity)
      ELSE 0
    END                                                     AS winter_ratio
  FROM product_monthly_sales
  GROUP BY product_code
),
classified AS (
  SELECT
    product_code,
    CASE
      WHEN avg_qty < 10 OR months_active_12 <= 2   THEN 'make_to_order'
      WHEN winter_ratio >= 0.5 AND cv > 0.6        THEN 'november'
      WHEN months_active_12 <= 4                   THEN 'annual'
      ELSE 'monthly'
    END AS production_type
  FROM stats
)
UPDATE product_safety_stock_params p
SET production_type = c.production_type
FROM classified c
WHERE p.product_code = c.product_code;

-- 既存の production_plan 行も同期
UPDATE production_plan pp
SET production_type = sp.production_type
FROM product_safety_stock_params sp
WHERE pp.product_code = sp.product_code;
-- ABC分析 + 出動月数ベースで生産区分を再分類
-- 優先順位: 受注生産(月2以下) > 11月生産(冬季集中) > 月次(上位80%) > 年次(残り)

WITH stats AS (
  SELECT
    product_code,
    SUM(quantity)                                             AS total_qty,
    AVG(quantity)                                             AS avg_qty,
    STDDEV(quantity)                                          AS std_qty,
    CASE WHEN AVG(quantity) > 0
         THEN STDDEV(quantity) / AVG(quantity) ELSE 1 END    AS cv,
    COUNT(*) FILTER (
      WHERE year_month >= to_char(now() - interval '12 months','YYYY-MM')
    )                                                         AS months_active_12,
    CASE WHEN SUM(quantity) > 0
      THEN SUM(quantity) FILTER (
             WHERE EXTRACT(MONTH FROM (year_month || '-01')::date) IN (11,12,1)
           ) / SUM(quantity)
      ELSE 0
    END                                                       AS winter_ratio
  FROM product_monthly_sales
  GROUP BY product_code
),
abc AS (
  SELECT
    product_code,
    total_qty,
    avg_qty,
    cv,
    months_active_12,
    winter_ratio,
    SUM(total_qty) OVER (ORDER BY total_qty DESC
                         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      / NULLIF(SUM(total_qty) OVER (), 0)  AS cumulative_ratio
  FROM stats
),
classified AS (
  SELECT
    product_code,
    CASE
      WHEN months_active_12 <= 2                    THEN 'make_to_order'
      WHEN winter_ratio >= 0.5 AND cv > 0.6         THEN 'november'
      WHEN cumulative_ratio <= 0.80                 THEN 'monthly'
      ELSE 'annual'
    END AS production_type
  FROM abc
)
UPDATE product_safety_stock_params p
SET production_type = c.production_type
FROM classified c
WHERE p.product_code = c.product_code;

-- production_plan も同期
UPDATE production_plan pp
SET production_type = sp.production_type
FROM product_safety_stock_params sp
WHERE pp.product_code = sp.product_code;
-- refresh_safety_stock_params() を刷新
-- 変更点:
--   1. 出動月数1〜2の商品も make_to_order として取り込む（従来は count>=3 で除外）
--   2. ABC累積比率+季節性でINSERT時に production_type を自動設定
--   3. production_type はON CONFLICTのUPDATEに含めない（手動変更を保持）

CREATE OR REPLACE FUNCTION refresh_safety_stock_params()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cutoff text := to_char(date_trunc('month', now()) - interval '12 months', 'YYYY-MM');
BEGIN
  WITH all_stats AS (
    SELECT
      product_code,
      MAX(product_name)                                         AS product_name,
      COUNT(*)                                                  AS months_active,
      SUM(quantity)                                             AS total_qty,
      AVG(quantity)                                             AS avg_qty,
      STDDEV_POP(quantity)                                      AS std_qty,
      CASE WHEN AVG(quantity) > 0
           THEN STDDEV_POP(quantity) / AVG(quantity) ELSE 1
      END                                                       AS cv,
      COALESCE(
        SUM(quantity) FILTER (
          WHERE EXTRACT(MONTH FROM (year_month || '-01')::date) IN (11,12,1)
        ) / NULLIF(SUM(quantity), 0),
        0
      )                                                         AS winter_ratio
    FROM product_monthly_sales
    WHERE year_month >= cutoff
      AND quantity > 0
    GROUP BY product_code
  ),
  abc AS (
    SELECT *,
      SUM(total_qty) OVER (
        ORDER BY total_qty DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
      ) / NULLIF(SUM(total_qty) OVER (), 0)  AS cumulative_ratio
    FROM all_stats
  ),
  classified AS (
    SELECT *,
      CASE
        WHEN months_active <= 2                        THEN 'make_to_order'
        WHEN winter_ratio >= 0.5 AND cv > 0.6          THEN 'november'
        WHEN cumulative_ratio <= 0.80                  THEN 'monthly'
        ELSE 'annual'
      END AS auto_production_type
    FROM abc
  )
  INSERT INTO product_safety_stock_params
    (product_code, product_name, unit,
     avg_monthly_demand, demand_std_dev,
     lead_time_days, service_level,
     safety_stock_qty, reorder_point,
     last_calc_at, updated_at,
     production_type)
  SELECT
    product_code,
    product_name,
    '本'                                                          AS unit,
    CASE WHEN months_active >= 3 THEN ROUND(avg_qty::numeric, 2) ELSE 0 END
                                                                  AS avg_monthly_demand,
    CASE WHEN months_active >= 3 THEN ROUND(std_qty::numeric, 2) ELSE 0 END
                                                                  AS demand_std_dev,
    30                                                            AS lead_time_days,
    0.95                                                          AS service_level,
    CASE WHEN months_active >= 3
         THEN ROUND(1.65 * std_qty::numeric, 2) ELSE 0 END        AS safety_stock_qty,
    CASE WHEN months_active >= 3
         THEN ROUND(avg_qty::numeric + 1.65 * std_qty::numeric, 2) ELSE 0 END
                                                                  AS reorder_point,
    now()                                                         AS last_calc_at,
    now()                                                         AS updated_at,
    auto_production_type                                          AS production_type
  FROM classified
  ON CONFLICT (product_code) DO UPDATE SET
    product_name       = EXCLUDED.product_name,
    avg_monthly_demand = EXCLUDED.avg_monthly_demand,
    demand_std_dev     = EXCLUDED.demand_std_dev,
    safety_stock_qty   = EXCLUDED.safety_stock_qty,
    reorder_point      = EXCLUDED.reorder_point,
    last_calc_at       = EXCLUDED.last_calc_at,
    updated_at         = now()
    -- production_type は手動変更を保持するため UPDATE では触らない
  ;
END;
$$;
-- =============================================================================
-- 017_daily_sales_agg_materialized.sql
--
-- daily_sales_detail ビューが REST API タイムアウトを起こす問題を修正。
-- 原因: sales_document_lines (70万件) のフルスキャンで 8-10秒超過。
-- 対策: マテリアライズドビュー daily_sales_agg に事前集計し、
--       daily_sales_detail はそれへの薄いラッパーに変更。
--       refresh_daily_sales_fact() 末尾で CONCURRENTLY リフレッシュ。
-- =============================================================================

-- ── インデックス追加 ─────────────────────────────────────────────────────────
create index if not exists idx_sdl_header_id    on sales_document_lines(sales_document_header_id);
create index if not exists idx_sdl_product_code on sales_document_lines(legacy_product_code);
create index if not exists idx_sdh_sales_date   on sales_document_headers(sales_date);

-- ── マテリアライズドビュー作成 ───────────────────────────────────────────────
-- 注意: ヘッダ集計（金額・伝票数）と明細集計（本数・液体量）を CTE で分離すること。
-- 同一 GROUP BY に両方入れると sum(h.total_amount) が明細行数倍に膨張する (fan-out バグ)。
create materialized view if not exists daily_sales_agg as
with hdr as (
  -- 伝票ヘッダだけで集計（金額の fan-out を防ぐ）
  select
    sales_date,
    count(*)          as document_count,
    sum(total_amount) as amount
  from sales_document_headers
  where sales_date is not null
  group by sales_date
),
lns as (
  -- 明細+商品マスタで本数・液体量を集計
  select
    h.sales_date,
    sum(l.quantity)                            as bottles,
    sum(l.quantity * coalesce(p.volume_ml, 0)) as volume_ml
  from sales_document_headers h
  join sales_document_lines l on l.sales_document_header_id = h.id
  left join products p on p.legacy_product_code = l.legacy_product_code
  where h.sales_date is not null
  group by h.sales_date
)
select
  hdr.sales_date,
  hdr.document_count,
  hdr.amount,
  coalesce(lns.bottles,   0) as bottles,
  coalesce(lns.volume_ml, 0) as volume_ml,
  case when coalesce(lns.bottles,   0) > 0
       then round(hdr.amount / coalesce(lns.bottles, 0), 0)
       else 0 end             as price_per_bottle,
  case when coalesce(lns.volume_ml, 0) > 0
       then round(hdr.amount / (coalesce(lns.volume_ml, 0) / 1000.0), 0)
       else 0 end             as price_per_liter
from hdr
left join lns on lns.sales_date = hdr.sales_date
order by hdr.sales_date
with data;

create unique index if not exists idx_daily_sales_agg_date on daily_sales_agg(sales_date);
grant select on daily_sales_agg to anon, authenticated;

-- ── daily_sales_detail を薄いラッパーに変更 ─────────────────────────────────
create or replace view daily_sales_detail as
select * from daily_sales_agg order by sales_date;

-- ── refresh_daily_sales_fact に REFRESH を追加 ───────────────────────────────
create or replace function public.refresh_daily_sales_fact()
returns void
language plpgsql
security definer
set statement_timeout to '300s'
as $function$
declare
  csv_max_date date;
begin
  delete from daily_sales_fact where true;

  select max((regexp_match(note, 'date:(\d{4}-\d{2}-\d{2})'))[1]::date)
  into csv_max_date
  from sales_document_lines where note like '%src:csv%';

  -- CSV由来: 500+560 を加算、580+600+650 を減算
  insert into daily_sales_fact (sales_date, legacy_customer_code, legacy_product_code, sales_amount, quantity, document_count, updated_at)
  select sd, cc, prod, sum(adj_amt)::numeric, sum(qty)::numeric, count(*)::int, now()
  from (
    select
      (regexp_match(note, 'date:(\d{4}-\d{2}-\d{2})'))[1]::date as sd,
      (regexp_match(note, 'cust:(\d+)'))[1] as cc,
      coalesce(legacy_product_code, 'unknown') as prod,
      case
        when note like '%type:580%' or note like '%type:600%' or note like '%type:650%' then -amount
        else amount
      end as adj_amt,
      quantity as qty
    from sales_document_lines
    where note like '%src:csv%'
      and (note like '%type:500%' or note like '%type:550%' or note like '%type:560%'
           or note like '%type:580%' or note like '%type:600%' or note like '%type:650%')
  ) sub where sd is not null and cc is not null
  group by sd, cc, prod;

  -- バイナリ由来（CSV最終日より後のみ）
  if csv_max_date is not null then
    insert into daily_sales_fact (sales_date, legacy_customer_code, legacy_product_code, sales_amount, quantity, document_count, updated_at)
    select sd, cc, prod, sum(amt)::numeric, sum(qty)::numeric, count(*)::int, now()
    from (
      select
        (regexp_match(note, 'date:(\d{4}-\d{2}-\d{2})'))[1]::date as sd,
        (regexp_match(note, 'cust:(\d+)'))[1] as cc,
        coalesce(legacy_product_code, 'unknown') as prod,
        amount as amt, quantity as qty
      from sales_document_lines
      where note like '%src:diff%' and amount > 0 and quantity > 0
    ) sub where sd is not null and cc is not null and sd > csv_max_date
    group by sd, cc, prod
    on conflict (sales_date, legacy_customer_code, legacy_product_code) do nothing;
  end if;

  -- daily_sales_agg を最新データで更新（ダッシュボード高速化）
  refresh materialized view concurrently daily_sales_agg;
end;
$function$;
-- refresh_safety_stock_params() を再修正:
-- service_level / lead_time_days をユーザー設定値として保持（上書きしない）
-- safety_stock_qty / reorder_point は保存済みの service_level / lead_time_days で再計算

CREATE OR REPLACE FUNCTION refresh_safety_stock_params()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cutoff text := to_char(date_trunc('month', now()) - interval '12 months', 'YYYY-MM');
BEGIN
  WITH all_stats AS (
    SELECT
      product_code,
      MAX(product_name)                                         AS product_name,
      COUNT(*)                                                  AS months_active,
      SUM(quantity)                                             AS total_qty,
      AVG(quantity)                                             AS avg_qty,
      STDDEV_POP(quantity)                                      AS std_qty,
      CASE WHEN AVG(quantity) > 0
           THEN STDDEV_POP(quantity) / AVG(quantity) ELSE 1
      END                                                       AS cv,
      COALESCE(
        SUM(quantity) FILTER (
          WHERE EXTRACT(MONTH FROM (year_month || '-01')::date) IN (11,12,1)
        ) / NULLIF(SUM(quantity), 0),
        0
      )                                                         AS winter_ratio
    FROM product_monthly_sales
    WHERE year_month >= cutoff
      AND quantity > 0
    GROUP BY product_code
  ),
  abc AS (
    SELECT *,
      SUM(total_qty) OVER (
        ORDER BY total_qty DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
      ) / NULLIF(SUM(total_qty) OVER (), 0)  AS cumulative_ratio
    FROM all_stats
  ),
  classified AS (
    SELECT *,
      CASE
        WHEN months_active <= 2                        THEN 'make_to_order'
        WHEN winter_ratio >= 0.5 AND cv > 0.6          THEN 'november'
        WHEN cumulative_ratio <= 0.80                  THEN 'monthly'
        ELSE 'annual'
      END AS auto_production_type
    FROM abc
  )
  INSERT INTO product_safety_stock_params
    (product_code, product_name, unit,
     avg_monthly_demand, demand_std_dev,
     lead_time_days, service_level,
     safety_stock_qty, reorder_point,
     last_calc_at, updated_at,
     production_type)
  SELECT
    product_code, product_name, '本',
    CASE WHEN months_active >= 3 THEN ROUND(avg_qty::numeric, 2) ELSE 0 END,
    CASE WHEN months_active >= 3 THEN ROUND(std_qty::numeric, 2) ELSE 0 END,
    30, 0.95,
    CASE WHEN months_active >= 3 THEN ROUND(1.65 * std_qty::numeric, 2) ELSE 0 END,
    CASE WHEN months_active >= 3
         THEN ROUND(avg_qty::numeric + 1.65 * std_qty::numeric, 2) ELSE 0 END,
    now(), now(),
    auto_production_type
  FROM classified
  ON CONFLICT (product_code) DO UPDATE SET
    product_name       = EXCLUDED.product_name,
    avg_monthly_demand = EXCLUDED.avg_monthly_demand,
    demand_std_dev     = EXCLUDED.demand_std_dev,
    safety_stock_qty   = ROUND(
      (SELECT CASE
        WHEN product_safety_stock_params.service_level >= 0.99 THEN 2.33
        WHEN product_safety_stock_params.service_level >= 0.97 THEN 1.88
        WHEN product_safety_stock_params.service_level >= 0.95 THEN 1.65
        WHEN product_safety_stock_params.service_level >= 0.90 THEN 1.28
        ELSE 1.04 END
      ) * EXCLUDED.demand_std_dev
        * SQRT(product_safety_stock_params.lead_time_days::numeric / 30), 2),
    reorder_point      = ROUND(
      EXCLUDED.avg_monthly_demand
        * (product_safety_stock_params.lead_time_days::numeric / 30)
      + (SELECT CASE
          WHEN product_safety_stock_params.service_level >= 0.99 THEN 2.33
          WHEN product_safety_stock_params.service_level >= 0.97 THEN 1.88
          WHEN product_safety_stock_params.service_level >= 0.95 THEN 1.65
          WHEN product_safety_stock_params.service_level >= 0.90 THEN 1.28
          ELSE 1.04 END
        ) * EXCLUDED.demand_std_dev
          * SQRT(product_safety_stock_params.lead_time_days::numeric / 30), 2),
    last_calc_at       = EXCLUDED.last_calc_at,
    updated_at         = now()
    -- service_level / lead_time_days / production_type はユーザー設定を保持
  ;
END;
$$;
-- =============================================================================
-- 018_mv_staff_sales_totals_materialized.sql
--
-- 分析「担当」タブが REST API タイムアウトを起こす問題を修正。
-- 原因: mv_staff_sales_totals が通常ビューで sales_document_lines を
--       JOIN すると fan-out バグ + 5秒超のタイムアウトが発生。
-- 対策:
--   1. 通常ビュー mv_staff_sales_totals を削除してマテリアライズドビューに変更。
--      hdr/lns の CTE 分離で fan-out バグも同時に修正。
--   2. get_staff_totals_by_period() も CTE 方式に書き直す。
--   3. refresh_analytics() に REFRESH MATERIALIZED VIEW CONCURRENTLY を追加。
-- =============================================================================

-- ── 通常ビューを削除してマテリアライズドビューに置き換え ─────────────────────
drop view if exists mv_staff_sales_totals cascade;

create materialized view mv_staff_sales_totals as
with hdr as (
  -- ヘッダ側: 金額・伝票数を集計（lines を join しない → fan-out 防止）
  select
    coalesce(c.staff_code, '―')                              as staff_code,
    coalesce(s.name, '担当' || c.staff_code, '未設定')       as staff_name,
    sum(h.total_amount)                                       as amount,
    count(distinct h.id)                                      as documents
  from sales_document_headers h
  left join customers c on c.legacy_customer_code = h.legacy_customer_code
  left join staff s on s.legacy_staff_code = c.staff_code
  where h.sales_date is not null
  group by c.staff_code, s.name
),
lns as (
  -- 明細側: 本数のみ集計（ヘッダ金額を含めない）
  select
    coalesce(c.staff_code, '―') as staff_code,
    sum(l.quantity)              as quantity
  from sales_document_headers h
  left join customers c on c.legacy_customer_code = h.legacy_customer_code
  join sales_document_lines l on l.sales_document_header_id = h.id
  where h.sales_date is not null
  group by c.staff_code
)
select
  hdr.staff_code  as code,
  hdr.staff_name  as name,
  hdr.amount,
  coalesce(lns.quantity, 0) as quantity,
  hdr.documents
from hdr
left join lns on lns.staff_code = hdr.staff_code
order by hdr.amount desc nulls last
with data;

-- REFRESH CONCURRENTLY に必要なユニークインデックス
create unique index idx_mv_staff_sales_totals_code on mv_staff_sales_totals(code);
grant select on mv_staff_sales_totals to anon, authenticated;

-- ── get_staff_totals_by_period() を CTE 方式に書き直し ───────────────────────
create or replace function get_staff_totals_by_period(
  p_date_from date default null,
  p_date_to   date default null
)
returns table (
  code      text,
  name      text,
  amount    numeric,
  quantity  numeric,
  documents bigint
)
language sql stable as $$
  with hdr as (
    select
      coalesce(c.staff_code, '―')                              as staff_code,
      coalesce(s.name, '担当' || c.staff_code, '未設定')       as staff_name,
      sum(h.total_amount)                                       as amount,
      count(distinct h.id)                                      as documents
    from sales_document_headers h
    left join customers c on c.legacy_customer_code = h.legacy_customer_code
    left join staff s on s.legacy_staff_code = c.staff_code
    where h.sales_date is not null
      and (p_date_from is null or h.sales_date >= p_date_from)
      and (p_date_to   is null or h.sales_date <= p_date_to)
    group by c.staff_code, s.name
  ),
  lns as (
    select
      coalesce(c.staff_code, '―') as staff_code,
      sum(l.quantity)              as quantity
    from sales_document_headers h
    left join customers c on c.legacy_customer_code = h.legacy_customer_code
    join sales_document_lines l on l.sales_document_header_id = h.id
    where h.sales_date is not null
      and (p_date_from is null or h.sales_date >= p_date_from)
      and (p_date_to   is null or h.sales_date <= p_date_to)
    group by c.staff_code
  )
  select
    hdr.staff_code                as code,
    hdr.staff_name                as name,
    hdr.amount,
    coalesce(lns.quantity, 0)     as quantity,
    hdr.documents
  from hdr
  left join lns on lns.staff_code = hdr.staff_code
  order by hdr.amount desc nulls last;
$$;

-- ── refresh_analytics() に mv_staff_sales_totals リフレッシュを追加 ──────────
create or replace function refresh_analytics()
returns void
language plpgsql
security definer
as $$
declare
  v_today       date := current_date;
  v_3m_ago      date := current_date - interval '3 months';
  v_12m_ago     date := current_date - interval '12 months';
  v_this_month  text := to_char(current_date, 'YYYY-MM');
  v_ly_month    text := to_char(current_date - interval '1 year', 'YYYY-MM');
begin
  -- ────────────────────────────────────────────────────────
  -- A) customer_sales_summary
  -- ────────────────────────────────────────────────────────
  truncate customer_sales_summary;

  insert into customer_sales_summary (
    customer_code, customer_name, business_type, area_code, phone,
    last_order_date, days_since_order,
    order_count_12m, amount_12m, order_count_3m, amount_3m,
    amount_last_year_same_month, amount_this_month,
    is_dormant, is_at_risk, annual_revenue, updated_at
  )
  select
    c.legacy_customer_code,
    c.name,
    c.business_type,
    c.delivery_area_code,
    c.phone,
    max(h.sales_date),
    v_today - max(h.sales_date),
    -- 12ヶ月
    count(distinct h.id) filter (where h.sales_date >= v_12m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    -- 3ヶ月
    count(distinct h.id) filter (where h.sales_date >= v_3m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_3m_ago), 0),
    -- 前年同月
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_ly_month), 0),
    -- 今月
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_this_month), 0),
    -- 休眠: 12ヶ月内注文あり & 3ヶ月ゼロ
    (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
     and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0),
    -- 離反リスク: 前年同月注文あり & 今月ゼロ (休眠でない)
    (sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_ly_month) > 0
     and coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_this_month), 0) = 0
     and not (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
              and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0)),
    -- 年間売上
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    now()
  from customers c
  left join sales_document_headers h
    on h.legacy_customer_code = c.legacy_customer_code
  where c.is_active = true
  group by c.legacy_customer_code, c.name, c.business_type, c.delivery_area_code, c.phone;

  -- ────────────────────────────────────────────────────────
  -- B) product_monthly_shipments
  -- ────────────────────────────────────────────────────────
  truncate product_monthly_shipments;

  insert into product_monthly_shipments (
    product_code, product_name, category,
    m01, m02, m03, m04, m05, m06,
    m07, m08, m09, m10, m11, m12,
    total_quantity, total_amount, updated_at
  )
  select
    coalesce(l.product_code, l.legacy_product_code),
    coalesce(l.product_name, p.name, l.product_code),
    coalesce(p.category, ''),
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 1), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 2), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 3), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 4), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 5), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 6), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 7), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 8), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 9), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 10), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 11), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 12), 0)::int,
    coalesce(sum(l.quantity), 0)::int,
    coalesce(sum(coalesce(l.line_amount, l.amount)), 0),
    now()
  from sales_document_lines l
  join sales_document_headers h on h.id = l.header_id
  left join products p on p.legacy_product_code = coalesce(l.product_code, l.legacy_product_code)
  where coalesce(l.product_code, l.legacy_product_code) is not null
  group by coalesce(l.product_code, l.legacy_product_code),
           coalesce(l.product_name, p.name, l.product_code),
           coalesce(p.category, '')
  having sum(l.quantity) > 0;

  -- ────────────────────────────────────────────────────────
  -- C) product_seasonal_profile
  -- ────────────────────────────────────────────────────────
  truncate product_seasonal_profile;

  insert into product_seasonal_profile (
    product_code, product_name, season_type, peak_months, proposal_month, avg_monthly_qty, updated_at
  )
  select
    s.product_code,
    s.product_name,
    case
      -- 歳暮: 11+12月が全体の50%超
      when (s.m11 + s.m12)::numeric / greatest(s.total_quantity, 1) > 0.5 then 'year-end'
      -- 季節品: 出荷月が6ヶ月以下
      when (case when s.m01>0 then 1 else 0 end + case when s.m02>0 then 1 else 0 end
          + case when s.m03>0 then 1 else 0 end + case when s.m04>0 then 1 else 0 end
          + case when s.m05>0 then 1 else 0 end + case when s.m06>0 then 1 else 0 end
          + case when s.m07>0 then 1 else 0 end + case when s.m08>0 then 1 else 0 end
          + case when s.m09>0 then 1 else 0 end + case when s.m10>0 then 1 else 0 end
          + case when s.m11>0 then 1 else 0 end + case when s.m12>0 then 1 else 0 end) <= 6
      then 'seasonal'
      else 'year-round'
    end,
    -- peak_months: 平均の150%超の月 (0-indexed)
    array(
      select m - 1 from (
        values (1, s.m01),(2, s.m02),(3, s.m03),(4, s.m04),(5, s.m05),(6, s.m06),
               (7, s.m07),(8, s.m08),(9, s.m09),(10, s.m10),(11, s.m11),(12, s.m12)
      ) as v(m, qty)
      where qty > (s.total_quantity::numeric / 12) * 1.5
      order by m
    ),
    -- proposal_month: ピーク月の2ヶ月前 (最初のピーク月基準, 0-indexed)
    (select ((m - 1 + 10) % 12) from (
      values (1, s.m01),(2, s.m02),(3, s.m03),(4, s.m04),(5, s.m05),(6, s.m06),
             (7, s.m07),(8, s.m08),(9, s.m09),(10, s.m10),(11, s.m11),(12, s.m12)
    ) as v(m, qty)
    where qty > (s.total_quantity::numeric / 12) * 1.5
    order by m limit 1),
    s.total_quantity / 12,
    now()
  from product_monthly_shipments s
  where s.total_quantity > 0;

  -- ────────────────────────────────────────────────────────
  -- D) visit_priority
  -- ────────────────────────────────────────────────────────
  truncate visit_priority;

  insert into visit_priority (
    customer_code, customer_name, phone, address, area_code, business_type,
    priority_score, reasons, last_order_date, days_since_order,
    annual_revenue, recommended_action, updated_at
  )
  select
    cs.customer_code,
    cs.customer_name,
    cs.phone,
    c.address1,
    cs.area_code,
    cs.business_type,
    -- スコア計算
    (case when cs.days_since_order > 60 then 50 else 0 end)          -- 離反リスク
    + (case when exists (
        select 1 from product_seasonal_profile sp
        where sp.proposal_month = extract(month from current_date) - 1 -- 0-indexed current month
      ) then 30 else 0 end)                                           -- 季節提案
    + (case when cs.days_since_order between 30 and 59 then 20 else 0 end) -- 定期巡回
    + least(20, (cs.annual_revenue::numeric / greatest(
        (select max(annual_revenue) from customer_sales_summary), 1
      ) * 20)::int),                                                   -- 金額ウェイト
    -- reasons
    array_remove(array[
      case when cs.days_since_order > 60 then '離反リスク(' || cs.days_since_order || '日)' end,
      case when cs.days_since_order between 30 and 59 then '定期巡回(' || cs.days_since_order || '日)' end,
      case when exists (
        select 1 from product_seasonal_profile sp
        where sp.proposal_month = extract(month from current_date) - 1
      ) then '季節提案あり' end
    ], null),
    cs.last_order_date,
    cs.days_since_order,
    cs.annual_revenue,
    case
      when cs.is_dormant then '再開アプローチ — 新商品/季節品で接点復活'
      when cs.is_at_risk then 'フォロー電話 — 前年同月の注文確認'
      when cs.days_since_order between 30 and 59 then '定期訪問 — 在庫確認・追加提案'
      else '維持訪問'
    end,
    now()
  from customer_sales_summary cs
  join customers c on c.legacy_customer_code = cs.customer_code
  where cs.annual_revenue > 0
    and cs.last_order_date is not null
  order by priority_score desc;

  -- ────────────────────────────────────────────────────────
  -- E) mv_staff_sales_totals（マテリアライズドビュー）
  -- ────────────────────────────────────────────────────────
  refresh materialized view concurrently mv_staff_sales_totals;

end;
$$;
-- =============================================================================
-- 019_quotes.sql : 見積書テーブル
-- =============================================================================

create table if not exists quotes (
  id                    uuid primary key default gen_random_uuid(),
  quote_no              text unique not null,
  quote_date            date not null default current_date,
  valid_until           date,
  legacy_customer_code  text,
  customer_name         text not null default '',
  customer_address      text not null default '',
  subject               text not null default '',
  template_type         text not null default 'sake'
                          check (template_type in ('sake', 'standard')),
  subtotal              bigint not null default 0,
  tax_amount            bigint not null default 0,
  total_amount          bigint not null default 0,
  tax_rate              int not null default 10,
  remarks               text not null default '',
  delivery_date         text not null default '',
  payment_terms         text not null default '月末締め翌月末払い',
  delivery_place        text not null default '',
  status                text not null default 'draft'
                          check (status in ('draft', 'sent', 'accepted', 'rejected')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create table if not exists quote_lines (
  id                    uuid primary key default gen_random_uuid(),
  quote_id              uuid not null references quotes(id) on delete cascade,
  line_no               int not null,
  legacy_product_code   text,
  product_name          text not null default '',
  jan_code              text,
  case_qty              int,
  quantity              numeric not null default 0,
  unit                  text not null default '本',
  unit_price            bigint not null default 0,
  retail_price          bigint,
  amount                bigint not null default 0,
  unique (quote_id, line_no)
);

create index if not exists idx_quotes_date        on quotes(quote_date desc);
create index if not exists idx_quotes_customer    on quotes(legacy_customer_code);
create index if not exists idx_quote_lines_qid    on quote_lines(quote_id);

alter table quotes      enable row level security;
alter table quote_lines enable row level security;

create policy "quotes_public"      on quotes      for all using (true) with check (true);
create policy "quote_lines_public" on quote_lines for all using (true) with check (true);

grant select, insert, update, delete on quotes      to anon, authenticated;
grant select, insert, update, delete on quote_lines to anon, authenticated;

-- 採番: Q2026-001 形式
create or replace function generate_quote_no()
returns text language plpgsql as $$
declare
  yr  text := to_char(current_date, 'YYYY');
  seq int;
begin
  select coalesce(max(
    case when quote_no ~ ('^Q' || yr || '-\d+$')
         then (regexp_match(quote_no, '\d+$'))[1]::int
         else 0 end
  ), 0) + 1
  into seq
  from quotes
  where quote_no like 'Q' || yr || '-%';
  return 'Q' || yr || '-' || lpad(seq::text, 3, '0');
end;
$$;
-- =============================================================================
-- 020_analytics_period_views.sql
--
-- 分析ページの期間別フィルタが機能していなかった問題を修正。
-- 原因: mv_monthly_sales / mv_product_sales_totals / mv_customer_sales_totals
--       が存在せず、fetchSalesAnalytics / fetchAnalyticsByPeriod が常に空を返す。
--       加えて get_distinct_periods RPC が未作成で期間選択肢も表示されなかった。
-- 対策: マテリアライズドビュー3本 + RPC 3本を作成し、
--       refresh_analytics() にリフレッシュ処理を追加。
-- =============================================================================

-- ── mv_monthly_sales: 月別売上チャートデータ ─────────────────────────────────
create materialized view if not exists mv_monthly_sales as
select
  to_char(sales_date, 'YYYY-MM') as month,
  sum(sales_amount)              as amount,
  sum(quantity)                  as quantity
from daily_sales_fact
where sales_date is not null
group by to_char(sales_date, 'YYYY-MM')
order by month
with data;

create unique index if not exists idx_mv_monthly_sales_month
  on mv_monthly_sales(month);
grant select on mv_monthly_sales to anon, authenticated;

-- ── mv_product_sales_totals: 商品別全期間集計 ─────────────────────────────────
create materialized view if not exists mv_product_sales_totals as
select
  f.legacy_product_code                     as code,
  coalesce(p.name, f.legacy_product_code)   as name,
  coalesce(p.category_code, '')             as tag,
  sum(f.sales_amount)                       as amount,
  sum(f.quantity)                           as quantity,
  sum(f.document_count)::bigint             as documents
from daily_sales_fact f
left join products p on p.legacy_product_code = f.legacy_product_code
where f.legacy_product_code is not null
group by f.legacy_product_code, p.name, p.category_code
order by sum(f.sales_amount) desc nulls last
with data;

create unique index if not exists idx_mv_product_sales_totals_code
  on mv_product_sales_totals(code);
grant select on mv_product_sales_totals to anon, authenticated;

-- ── mv_customer_sales_totals: 得意先別全期間集計 ──────────────────────────────
create materialized view if not exists mv_customer_sales_totals as
select
  f.legacy_customer_code                    as code,
  coalesce(c.name, f.legacy_customer_code)  as name,
  coalesce(c.business_type, '')             as tag,
  sum(f.sales_amount)                       as amount,
  sum(f.quantity)                           as quantity,
  sum(f.document_count)::bigint             as documents
from daily_sales_fact f
left join customers c on c.legacy_customer_code = f.legacy_customer_code
where f.legacy_customer_code is not null
group by f.legacy_customer_code, c.name, c.business_type
order by sum(f.sales_amount) desc nulls last
with data;

create unique index if not exists idx_mv_customer_sales_totals_code
  on mv_customer_sales_totals(code);
grant select on mv_customer_sales_totals to anon, authenticated;

-- ── get_available_periods: 期間選択肢一覧を返す RPC ──────────────────────────
-- p_type: 'daily' | 'weekly' | 'monthly' | 'yearly'
create or replace function get_available_periods(p_type text)
returns table(period_val text)
language sql stable as $$
  select distinct
    case p_type
      when 'daily'   then to_char(sales_date, 'YYYY-MM-DD')
      when 'weekly'  then
        to_char(date_trunc('week', sales_date)::date, 'IYYY')
        || '-W' || lpad(extract(week from sales_date)::text, 2, '0')
      when 'yearly'  then to_char(sales_date, 'YYYY')
      else to_char(sales_date, 'YYYY-MM')   -- monthly (default)
    end as period_val
  from daily_sales_fact
  where sales_date is not null
  order by period_val desc;
$$;

-- ── get_product_totals_by_period: 期間フィルタ付き商品集計 ───────────────────
create or replace function get_product_totals_by_period(
  p_date_from date default null,
  p_date_to   date default null
)
returns table(code text, name text, tag text, amount numeric, quantity numeric, documents bigint)
language sql stable as $$
  select
    f.legacy_product_code                     as code,
    coalesce(p.name, f.legacy_product_code)   as name,
    coalesce(p.category_code, '')             as tag,
    sum(f.sales_amount)                       as amount,
    sum(f.quantity)                           as quantity,
    sum(f.document_count)::bigint             as documents
  from daily_sales_fact f
  left join products p on p.legacy_product_code = f.legacy_product_code
  where f.legacy_product_code is not null
    and (p_date_from is null or f.sales_date >= p_date_from)
    and (p_date_to   is null or f.sales_date <= p_date_to)
  group by f.legacy_product_code, p.name, p.category_code
  order by sum(f.sales_amount) desc nulls last;
$$;

-- ── get_customer_totals_by_period: 期間フィルタ付き得意先集計 ────────────────
create or replace function get_customer_totals_by_period(
  p_date_from date default null,
  p_date_to   date default null
)
returns table(code text, name text, tag text, amount numeric, quantity numeric, documents bigint)
language sql stable as $$
  select
    f.legacy_customer_code                    as code,
    coalesce(c.name, f.legacy_customer_code)  as name,
    coalesce(c.business_type, '')             as tag,
    sum(f.sales_amount)                       as amount,
    sum(f.quantity)                           as quantity,
    sum(f.document_count)::bigint             as documents
  from daily_sales_fact f
  left join customers c on c.legacy_customer_code = f.legacy_customer_code
  where f.legacy_customer_code is not null
    and (p_date_from is null or f.sales_date >= p_date_from)
    and (p_date_to   is null or f.sales_date <= p_date_to)
  group by f.legacy_customer_code, c.name, c.business_type
  order by sum(f.sales_amount) desc nulls last;
$$;

-- ── refresh_analytics(): 新MVのリフレッシュを追加 ─────────────────────────────
create or replace function refresh_analytics()
returns void
language plpgsql
security definer
as $$
declare
  v_today       date := current_date;
  v_3m_ago      date := current_date - interval '3 months';
  v_12m_ago     date := current_date - interval '12 months';
  v_this_month  text := to_char(current_date, 'YYYY-MM');
  v_ly_month    text := to_char(current_date - interval '1 year', 'YYYY-MM');
begin
  -- A) customer_sales_summary
  truncate customer_sales_summary;
  insert into customer_sales_summary (
    customer_code, customer_name, business_type, area_code, phone,
    last_order_date, days_since_order,
    order_count_12m, amount_12m, order_count_3m, amount_3m,
    amount_last_year_same_month, amount_this_month,
    is_dormant, is_at_risk, annual_revenue, updated_at
  )
  select
    c.legacy_customer_code, c.name, c.business_type, c.delivery_area_code, c.phone,
    max(h.sales_date),
    v_today - max(h.sales_date),
    count(distinct h.id) filter (where h.sales_date >= v_12m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    count(distinct h.id) filter (where h.sales_date >= v_3m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_3m_ago), 0),
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date,'YYYY-MM') = v_ly_month), 0),
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date,'YYYY-MM') = v_this_month), 0),
    (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
     and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0),
    (sum(h.total_amount) filter (where to_char(h.sales_date,'YYYY-MM') = v_ly_month) > 0
     and coalesce(sum(h.total_amount) filter (where to_char(h.sales_date,'YYYY-MM') = v_this_month), 0) = 0
     and not (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
              and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0)),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    now()
  from customers c
  left join sales_document_headers h on h.legacy_customer_code = c.legacy_customer_code
  where c.is_active = true
  group by c.legacy_customer_code, c.name, c.business_type, c.delivery_area_code, c.phone;

  -- B) product_monthly_shipments
  truncate product_monthly_shipments;
  insert into product_monthly_shipments (
    product_code, product_name, category,
    m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,
    total_quantity, total_amount, updated_at
  )
  select
    coalesce(l.product_code, l.legacy_product_code),
    coalesce(l.product_name, p.name, l.product_code),
    coalesce(p.category, ''),
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=1),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=2),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=3),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=4),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=5),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=6),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=7),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=8),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=9),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=10),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=11),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=12),0)::int,
    coalesce(sum(l.quantity),0)::int,
    coalesce(sum(coalesce(l.line_amount, l.amount)),0),
    now()
  from sales_document_lines l
  join sales_document_headers h on h.id = l.header_id
  left join products p on p.legacy_product_code = coalesce(l.product_code, l.legacy_product_code)
  where coalesce(l.product_code, l.legacy_product_code) is not null
  group by coalesce(l.product_code, l.legacy_product_code),
           coalesce(l.product_name, p.name, l.product_code),
           coalesce(p.category, '')
  having sum(l.quantity) > 0;

  -- C) product_seasonal_profile
  truncate product_seasonal_profile;
  insert into product_seasonal_profile (
    product_code, product_name, season_type, peak_months, proposal_month, avg_monthly_qty, updated_at
  )
  select
    s.product_code, s.product_name,
    case
      when (s.m11+s.m12)::numeric/greatest(s.total_quantity,1) > 0.5 then 'year-end'
      when (case when s.m01>0 then 1 else 0 end+case when s.m02>0 then 1 else 0 end
           +case when s.m03>0 then 1 else 0 end+case when s.m04>0 then 1 else 0 end
           +case when s.m05>0 then 1 else 0 end+case when s.m06>0 then 1 else 0 end
           +case when s.m07>0 then 1 else 0 end+case when s.m08>0 then 1 else 0 end
           +case when s.m09>0 then 1 else 0 end+case when s.m10>0 then 1 else 0 end
           +case when s.m11>0 then 1 else 0 end+case when s.m12>0 then 1 else 0 end) <= 6
      then 'seasonal'
      else 'year-round'
    end,
    array(select m-1 from (values(1,s.m01),(2,s.m02),(3,s.m03),(4,s.m04),(5,s.m05),(6,s.m06),
      (7,s.m07),(8,s.m08),(9,s.m09),(10,s.m10),(11,s.m11),(12,s.m12)) as v(m,qty)
      where qty>(s.total_quantity::numeric/12)*1.5 order by m),
    (select ((m-1+10)%12) from (values(1,s.m01),(2,s.m02),(3,s.m03),(4,s.m04),(5,s.m05),(6,s.m06),
      (7,s.m07),(8,s.m08),(9,s.m09),(10,s.m10),(11,s.m11),(12,s.m12)) as v(m,qty)
      where qty>(s.total_quantity::numeric/12)*1.5 order by m limit 1),
    s.total_quantity/12, now()
  from product_monthly_shipments s where s.total_quantity>0;

  -- D) visit_priority
  truncate visit_priority;
  insert into visit_priority (
    customer_code, customer_name, phone, address, area_code, business_type,
    priority_score, reasons, last_order_date, days_since_order,
    annual_revenue, recommended_action, updated_at
  )
  select
    cs.customer_code, cs.customer_name, cs.phone, c.address1, cs.area_code, cs.business_type,
    (case when cs.days_since_order>60 then 50 else 0 end)
    +(case when exists(select 1 from product_seasonal_profile sp
        where sp.proposal_month=extract(month from current_date)-1) then 30 else 0 end)
    +(case when cs.days_since_order between 30 and 59 then 20 else 0 end)
    +least(20,(cs.annual_revenue::numeric/greatest(
        (select max(annual_revenue) from customer_sales_summary),1)*20)::int),
    array_remove(array[
      case when cs.days_since_order>60 then '離反リスク('||cs.days_since_order||'日)' end,
      case when cs.days_since_order between 30 and 59 then '定期巡回('||cs.days_since_order||'日)' end,
      case when exists(select 1 from product_seasonal_profile sp
        where sp.proposal_month=extract(month from current_date)-1) then '季節提案あり' end
    ], null),
    cs.last_order_date, cs.days_since_order, cs.annual_revenue,
    case when cs.is_dormant then '再開アプローチ — 新商品/季節品で接点復活'
         when cs.is_at_risk then 'フォロー電話 — 前年同月の注文確認'
         when cs.days_since_order between 30 and 59 then '定期訪問 — 在庫確認・追加提案'
         else '維持訪問' end,
    now()
  from customer_sales_summary cs
  join customers c on c.legacy_customer_code=cs.customer_code
  where cs.annual_revenue>0 and cs.last_order_date is not null
  order by priority_score desc;

  -- E) mv_staff_sales_totals
  refresh materialized view concurrently mv_staff_sales_totals;

  -- F) 分析集計MV（本マイグレーションで追加）
  refresh materialized view concurrently mv_monthly_sales;
  refresh materialized view concurrently mv_product_sales_totals;
  refresh materialized view concurrently mv_customer_sales_totals;

end;
$$;
-- =============================================================================
-- 022_analytics_drilldown_rpcs.sql
--
-- 売上分析ドリルダウン用RPC: 得意先→商品内訳、商品→得意先内訳、月別推移
-- =============================================================================

create or replace function get_customer_product_breakdown(
  p_customer_code text,
  p_date_from date default null,
  p_date_to   date default null
)
returns table(code text, name text, tag text, amount numeric, quantity numeric, documents bigint)
language sql stable as $$
  select
    f.legacy_product_code                     as code,
    coalesce(p.name, f.legacy_product_code)   as name,
    coalesce(p.category_code, '')             as tag,
    sum(f.sales_amount)                       as amount,
    sum(f.quantity)                           as quantity,
    sum(f.document_count)::bigint             as documents
  from daily_sales_fact f
  left join products p on p.legacy_product_code = f.legacy_product_code
  where f.legacy_customer_code = p_customer_code
    and f.legacy_product_code is not null
    and (p_date_from is null or f.sales_date >= p_date_from)
    and (p_date_to   is null or f.sales_date <= p_date_to)
  group by f.legacy_product_code, p.name, p.category_code
  order by sum(f.sales_amount) desc nulls last;
$$;

create or replace function get_product_customer_breakdown(
  p_product_code text,
  p_date_from date default null,
  p_date_to   date default null
)
returns table(code text, name text, tag text, amount numeric, quantity numeric, documents bigint)
language sql stable as $$
  select
    f.legacy_customer_code                    as code,
    coalesce(c.name, f.legacy_customer_code)  as name,
    coalesce(c.business_type, '')             as tag,
    sum(f.sales_amount)                       as amount,
    sum(f.quantity)                           as quantity,
    sum(f.document_count)::bigint             as documents
  from daily_sales_fact f
  left join customers c on c.legacy_customer_code = f.legacy_customer_code
  where f.legacy_product_code = p_product_code
    and f.legacy_customer_code is not null
    and (p_date_from is null or f.sales_date >= p_date_from)
    and (p_date_to   is null or f.sales_date <= p_date_to)
  group by f.legacy_customer_code, c.name, c.business_type
  order by sum(f.sales_amount) desc nulls last;
$$;

create or replace function get_entity_monthly_sales(
  p_code text,
  p_type text
)
returns table(month text, amount numeric)
language sql stable as $$
  select
    to_char(sales_date, 'YYYY-MM') as month,
    sum(sales_amount)              as amount
  from daily_sales_fact
  where case p_type
    when 'customer' then legacy_customer_code = p_code
    when 'product'  then legacy_product_code  = p_code
    else false
  end
  group by to_char(sales_date, 'YYYY-MM')
  order by month;
$$;
-- =============================================================================
-- 023_period_chart_data.sql
--
-- 期間に応じた粒度のチャートデータを返すRPC
-- yearly → 月別 / monthly → 日別 / weekly → 日別 / daily → 1日分
-- =============================================================================

create or replace function get_period_chart_data(p_period text, p_filter text)
returns table(label text, amount numeric)
language sql stable as $$
  select
    case p_period
      when 'yearly'  then to_char(sales_date, 'YYYY-MM')
      when 'monthly' then to_char(sales_date, 'MM/DD')
      when 'weekly'  then to_char(sales_date, 'MM/DD')
      when 'daily'   then to_char(sales_date, 'MM/DD')
      else to_char(sales_date, 'YYYY-MM')
    end as label,
    sum(sales_amount) as amount
  from daily_sales_fact
  where case p_period
    when 'yearly'  then to_char(sales_date, 'YYYY') = p_filter
    when 'monthly' then to_char(sales_date, 'YYYY-MM') = p_filter
    when 'weekly'  then
      to_char(date_trunc('week', sales_date)::date, 'IYYY')
      || '-W' || lpad(extract(week from sales_date)::text, 2, '0') = p_filter
    when 'daily'   then to_char(sales_date, 'YYYY-MM-DD') = p_filter
    else true
  end
  group by label
  order by min(sales_date);
$$;
-- =============================================================================
-- 024_analytics_yoy_volume.sql
--
-- 分析全体に前年比較 + 移出量(ml) + 本数を追加。
-- 全RPC・MVの戻り値に volume_ml を追加。
-- チャートデータに quantity/volume_ml を追加。
-- 前年比較はフロントエンドで同RPCを前年フィルタで2回呼んで算出。
-- =============================================================================

-- (内容は apply_migration で既に適用済み — ファイルは記録用)

-- get_period_chart_data → +quantity, +volume_ml
-- get_product_totals_by_period → +volume_ml
-- get_customer_totals_by_period → +volume_ml (products JOIN追加)
-- get_customer_product_breakdown → +volume_ml
-- get_product_customer_breakdown → +volume_ml
-- get_entity_monthly_sales → +quantity, +volume_ml
-- mv_product_sales_totals → 再作成 +volume_ml
-- mv_customer_sales_totals → 再作成 +volume_ml (products JOIN追加)
-- =============================================================================
-- 025_fix_product_monthly_sales_refresh.sql
--
-- refresh_product_monthly_sales() が旧スキーマのカラム名を参照していた問題を修正。
-- 旧: sale_date, product_code, slip_number, sale_type（存在しないカラム）
-- 新: sales_date, legacy_product_code（daily_sales_fact の実カラム）
--
-- 修正前: product_monthly_sales の4月数量 = 11,425（旧データ残り or 不一致）
-- 修正後: product_monthly_sales の4月数量 = 7,426（daily_sales_fact と完全一致）
-- =============================================================================

create or replace function refresh_product_monthly_sales()
returns void
language plpgsql
security definer
as $$
begin
  delete from product_monthly_sales;

  insert into product_monthly_sales
    (id, year_month, product_code, product_name, quantity, amount, document_count)
  select
    to_char(f.sales_date, 'YYYY-MM') || ':' || f.legacy_product_code as id,
    to_char(f.sales_date, 'YYYY-MM')                                 as year_month,
    f.legacy_product_code                                             as product_code,
    coalesce(p.name, f.legacy_product_code)                           as product_name,
    sum(f.quantity)                                                   as quantity,
    sum(f.sales_amount)::bigint                                       as amount,
    sum(f.document_count)                                             as document_count
  from daily_sales_fact f
  left join products p on p.legacy_product_code = f.legacy_product_code
  where f.sales_date >= (date_trunc('month', now()) - interval '60 months')::date
    and f.legacy_product_code is not null
    and f.legacy_product_code != 'unknown'
  group by to_char(f.sales_date, 'YYYY-MM'), f.legacy_product_code, p.name;
end;
$$;
-- mv_monthly_sales に quantity, volume_ml を追加
drop materialized view if exists mv_monthly_sales cascade;
create materialized view mv_monthly_sales as
select
  to_char(f.sales_date, 'YYYY-MM') as month,
  sum(f.sales_amount)              as amount,
  sum(f.quantity)                  as quantity,
  sum(f.quantity * coalesce(p.volume_ml, 0)) as volume_ml
from daily_sales_fact f
left join products p on p.legacy_product_code = f.legacy_product_code
where f.sales_date is not null
group by to_char(f.sales_date, 'YYYY-MM')
order by month
with data;
create unique index if not exists idx_mv_monthly_sales_month on mv_monthly_sales(month);
grant select on mv_monthly_sales to anon, authenticated;
-- Classification function
CREATE OR REPLACE FUNCTION classify_brewing_category(p_production_type text, p_name text)
RETURNS text LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_name ILIKE '%純米大吟醸%' THEN '純米大吟醸'
    WHEN p_name ILIKE '%大吟醸%' THEN '大吟醸'
    WHEN p_production_type ILIKE '純米吟醸%' OR p_name ILIKE '%純米吟醸%' THEN '純米吟醸'
    WHEN p_production_type ILIKE '純米酒%' OR (p_name ILIKE '%純米%' AND p_name NOT ILIKE '%吟醸%') THEN '純米'
    WHEN p_production_type ILIKE '吟醸%' OR p_name ILIKE '%吟醸%' THEN '本醸造'
    WHEN p_production_type ILIKE '本醸造%' OR p_name ILIKE '%本醸造%' OR p_name ILIKE '%原酒%' THEN '本醸造'
    WHEN p_production_type ILIKE 'その他(酒類)%' OR p_name ILIKE '%梅酒%' OR p_name ILIKE '%リキュール%' OR p_name ILIKE '%ザケ%' THEN 'リキュール'
    WHEN p_production_type ILIKE '普通酒%' THEN '普通酒'
    ELSE 'その他'
  END;
$$;

-- Brewing plan data RPC: fiscal year shipments by category
CREATE OR REPLACE FUNCTION get_brewing_plan_summary(p_fy_start date, p_fy_end date)
RETURNS TABLE(
  brew_category text,
  sub_category text,
  product_count int,
  total_shipment_qty numeric,
  total_shipment_ml numeric,
  monthly_avg_qty numeric,
  monthly_avg_ml numeric,
  current_stock_l numeric,
  months_remaining numeric
) LANGUAGE sql STABLE AS $$
  WITH categorized AS (
    SELECT
      classify_brewing_category(p.production_type_name, p.name) AS brew_cat,
      coalesce(p.production_type_name, 'その他') AS sub_cat,
      f.legacy_product_code,
      f.quantity,
      f.quantity * coalesce(p.volume_ml, 0) AS volume_ml,
      f.sales_date
    FROM daily_sales_fact f
    JOIN products p ON p.legacy_product_code = f.legacy_product_code
    WHERE f.sales_date >= p_fy_start AND f.sales_date <= p_fy_end
      AND p.production_type_name IS NOT NULL
      AND p.production_type_name NOT ILIKE 'セット品%'
      AND p.production_type_name NOT ILIKE 'その他(酒以外%'
  ),
  shipments AS (
    SELECT
      brew_cat,
      sub_cat,
      count(DISTINCT legacy_product_code) AS product_count,
      sum(quantity) AS total_qty,
      sum(volume_ml) AS total_ml
    FROM categorized
    GROUP BY brew_cat, sub_cat
  ),
  months_in_range AS (
    SELECT greatest(
      extract(year from age(p_fy_end, p_fy_start)) * 12
      + extract(month from age(p_fy_end, p_fy_start)) + 1,
      1
    ) AS months
  ),
  tank_stock AS (
    SELECT
      classify_brewing_category(p.production_type_name, p.name) AS brew_cat,
      sum(t.current_volume_l) AS stock_l
    FROM tanks t
    JOIN products p ON p.legacy_product_code = t.current_product_code
    WHERE t.status = 'in_use' AND t.current_volume_l > 0
    GROUP BY classify_brewing_category(p.production_type_name, p.name)
  )
  SELECT
    s.brew_cat,
    s.sub_cat,
    s.product_count::int,
    s.total_qty,
    s.total_ml,
    round(s.total_qty / m.months, 1) AS monthly_avg_qty,
    round(s.total_ml / m.months, 1) AS monthly_avg_ml,
    coalesce(ts.stock_l, 0) AS current_stock_l,
    CASE WHEN coalesce(round(s.total_ml / m.months, 1), 0) > 0
      THEN round(coalesce(ts.stock_l, 0) * 1000 / (s.total_ml / m.months), 1)
      ELSE 0 END AS months_remaining
  FROM shipments s
  CROSS JOIN months_in_range m
  LEFT JOIN tank_stock ts ON ts.brew_cat = s.brew_cat
  ORDER BY
    CASE s.brew_cat
      WHEN '純米大吟醸' THEN 1 WHEN '大吟醸' THEN 2 WHEN '純米吟醸' THEN 3 WHEN '純米' THEN 4
      WHEN '本醸造' THEN 5 WHEN '普通酒' THEN 6 WHEN 'リキュール' THEN 7
      ELSE 8
    END,
    s.total_ml DESC NULLS LAST;
$$;

-- Monthly trend by category for chart
CREATE OR REPLACE FUNCTION get_brewing_monthly_trend(p_fy_start date, p_fy_end date)
RETURNS TABLE(month text, brew_category text, shipment_ml numeric)
LANGUAGE sql STABLE AS $$
  SELECT
    to_char(f.sales_date, 'YYYY-MM') AS month,
    classify_brewing_category(p.production_type_name, p.name) AS brew_category,
    sum(f.quantity * coalesce(p.volume_ml, 0)) AS shipment_ml
  FROM daily_sales_fact f
  JOIN products p ON p.legacy_product_code = f.legacy_product_code
  WHERE f.sales_date >= p_fy_start AND f.sales_date <= p_fy_end
    AND p.production_type_name IS NOT NULL
    AND p.production_type_name NOT ILIKE 'セット品%'
    AND p.production_type_name NOT ILIKE 'その他(酒以外%'
  GROUP BY month, brew_category
  ORDER BY month, brew_category;
$$;
-- システム設定テーブル
-- 見積書の会社情報・印章画像などをDBに保存する
create table if not exists system_settings (
  key        text primary key,
  value      jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- RLS: 認証済みユーザーのみ読み書き可
alter table system_settings enable row level security;

create policy "authenticated read system_settings"
  on system_settings for select
  to authenticated using (true);

create policy "authenticated write system_settings"
  on system_settings for all
  to authenticated using (true) with check (true);
-- 030: quotesテーブルに不足カラムを追加
-- CREATE TABLE IF NOT EXISTS では既存テーブルにカラムが追加されないため ALTER TABLE で対応

alter table quotes
  add column if not exists template_type  text not null default 'sake'
    check (template_type in ('sake', 'standard')),
  add column if not exists tax_rate       int  not null default 10,
  add column if not exists delivery_date  text not null default '',
  add column if not exists payment_terms  text not null default '月末締め翌月末払い',
  add column if not exists delivery_place text not null default '';
-- 031: quote_linesテーブルに不足カラムを追加
alter table quote_lines
  add column if not exists jan_code      text,
  add column if not exists case_qty      int,
  add column if not exists retail_price  bigint;
CREATE OR REPLACE FUNCTION get_customer_efficiency(p_fiscal_year int DEFAULT NULL, p_group_by text DEFAULT 'billing')
RETURNS TABLE(
  legacy_customer_code text,
  customer_name text,
  address1 text,
  year_amount numeric,
  share_pct numeric,
  order_days int,
  prev_amount numeric,
  growth_rate numeric,
  current_rank text,
  prev_rank text
) LANGUAGE sql STABLE AS $$
WITH
  yr AS (
    SELECT COALESCE(p_fiscal_year,
      CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE)::int >= 4
           THEN EXTRACT(YEAR FROM CURRENT_DATE)::int
           ELSE EXTRACT(YEAR FROM CURRENT_DATE)::int - 1 END
    ) AS v
  ),
  dates AS (
    SELECT
      make_date(v, 4, 1)      AS y_start,
      make_date(v+1, 3, 31)   AS y_end,
      make_date(v-1, 4, 1)    AS p_start,
      make_date(v, 3, 31)     AS p_end
    FROM yr
  ),
  base AS (
    SELECT
      CASE
        WHEN p_group_by = 'billing'
          THEN COALESCE(NULLIF(c.billing_code,''), dsf.legacy_customer_code)
        ELSE dsf.legacy_customer_code
      END AS eff_code,
      SUM(CASE WHEN dsf.sales_date BETWEEN d.y_start AND d.y_end THEN dsf.sales_amount ELSE 0 END) AS year_amount,
      COUNT(DISTINCT CASE WHEN dsf.sales_date BETWEEN d.y_start AND d.y_end THEN dsf.sales_date ELSE NULL END)::int AS order_days,
      SUM(CASE WHEN dsf.sales_date BETWEEN d.p_start AND d.p_end THEN dsf.sales_amount ELSE 0 END) AS prev_amount
    FROM daily_sales_fact dsf
    LEFT JOIN customers c ON c.legacy_customer_code = dsf.legacy_customer_code
    CROSS JOIN dates d
    WHERE dsf.legacy_customer_code IS NOT NULL
    GROUP BY 1
    HAVING SUM(CASE WHEN dsf.sales_date BETWEEN d.y_start AND d.y_end THEN dsf.sales_amount ELSE 0 END) > 0
  ),
  ranked AS (
    SELECT
      eff_code, year_amount, order_days, prev_amount,
      SUM(year_amount) OVER () AS total_year,
      SUM(year_amount) OVER (ORDER BY year_amount DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative,
      ROUND(year_amount * 100.0 / NULLIF(SUM(year_amount) OVER (), 0), 2) AS share_pct
    FROM base
  ),
  prev_ranked AS (
    SELECT eff_code,
      SUM(prev_amount) OVER () AS prev_total,
      SUM(prev_amount) OVER (ORDER BY prev_amount DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS prev_cumulative,
      prev_amount
    FROM base WHERE prev_amount > 0
  )
SELECT
  r.eff_code,
  COALESCE(bc.name, r.eff_code),
  bc.address1,
  r.year_amount,
  r.share_pct,
  r.order_days,
  r.prev_amount,
  CASE WHEN r.prev_amount > 0 THEN ROUND((r.year_amount - r.prev_amount) / r.prev_amount * 100, 1) ELSE NULL END,
  CASE WHEN r.cumulative <= r.total_year * 0.7 THEN 'A'
       WHEN r.cumulative <= r.total_year * 0.9 THEN 'B'
       ELSE 'C' END,
  CASE WHEN pr.prev_cumulative IS NOT NULL AND pr.prev_cumulative <= pr.prev_total * 0.7 THEN 'A'
       WHEN pr.prev_cumulative IS NOT NULL AND pr.prev_cumulative <= pr.prev_total * 0.9 THEN 'B'
       WHEN pr.prev_amount > 0 THEN 'C'
       ELSE '' END
FROM ranked r
LEFT JOIN prev_ranked pr ON pr.eff_code = r.eff_code
LEFT JOIN customers bc ON bc.legacy_customer_code = r.eff_code
ORDER BY r.year_amount DESC;
$$;

-- ============ 追加マイグレーション（apply_migrationで直接適用したもの） ============

-- カレンダーラベル除外
CREATE TABLE IF NOT EXISTS calendar_label_exclusions (
  year_month text NOT NULL,
  product_code text NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (year_month, product_code)
);

-- 醸造区分オーバーライド
CREATE TABLE IF NOT EXISTS brewing_category_overrides (
  product_code text PRIMARY KEY,
  brew_category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- カスタム醸造区分
CREATE TABLE IF NOT EXISTS brewing_custom_categories (
  name text PRIMARY KEY,
  parent_category text,
  sort_order int DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

-- カスタム区分×製成種別リンク
CREATE TABLE IF NOT EXISTS brewing_custom_category_type_links (
  category_name text NOT NULL REFERENCES brewing_custom_categories(name) ON DELETE CASCADE,
  production_type_name text NOT NULL,
  PRIMARY KEY (category_name, production_type_name)
);

-- 醸造在庫エントリ（複数タンク）
CREATE TABLE IF NOT EXISTS brewing_stock_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brew_category text NOT NULL,
  label text NOT NULL DEFAULT '',
  volume_l numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_bse_category ON brewing_stock_entries(brew_category);

-- アルコール度数設定
CREATE TABLE IF NOT EXISTS brewing_alcohol_settings (
  brew_category text PRIMARY KEY,
  raw_alcohol_pct numeric NOT NULL DEFAULT 18,
  target_alcohol_pct numeric NOT NULL DEFAULT 15,
  updated_at timestamptz DEFAULT now()
);

-- 醸造予測オーバーライド
CREATE TABLE IF NOT EXISTS brewing_forecast_overrides (
  brew_category text PRIMARY KEY,
  forecast_l numeric,
  growth_rate numeric,
  notes text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- 米パラメータ
CREATE TABLE IF NOT EXISTS brewing_rice_params (
  brew_category text PRIMARY KEY,
  polishing_ratio numeric NOT NULL DEFAULT 0.70,
  rice_per_liter_kg numeric NOT NULL DEFAULT 0.50,
  rice_variety text DEFAULT '一般米',
  rice_price_per_kg numeric NOT NULL DEFAULT 400,
  koji_ratio numeric NOT NULL DEFAULT 0.30,
  koji_variety text DEFAULT '山田錦',
  koji_price_per_kg numeric DEFAULT 600,
  kake_variety text DEFAULT '一般米',
  kake_price_per_kg numeric DEFAULT 350,
  alcohol_addition_ratio numeric DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- 米品種マスタ
CREATE TABLE IF NOT EXISTS rice_varieties (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  default_price_per_kg numeric DEFAULT 400,
  region text DEFAULT '',
  sort_order int DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

INSERT INTO rice_varieties (name, default_price_per_kg, region, sort_order) VALUES
  ('山田錦', 800, '兵庫・岡山', 10),
  ('五百万石', 600, '新潟・富山', 20),
  ('美山錦', 550, '長野・秋田', 30),
  ('雄町', 700, '岡山', 40),
  ('出羽燦々', 550, '山形', 50),
  ('一般米', 350, '', 90),
  ('加工用米', 300, '', 91)
ON CONFLICT (name) DO NOTHING;

-- 醸造計画RPCs
CREATE OR REPLACE FUNCTION classify_brewing_category(p_production_type text, p_name text)
RETURNS text LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_name ILIKE '%純米大吟醸%' THEN '純米大吟醸'
    WHEN p_name ILIKE '%大吟醸%' THEN '大吟醸'
    WHEN p_production_type ILIKE '純米吟醸%' OR p_name ILIKE '%純米吟醸%' THEN '純米吟醸'
    WHEN p_production_type ILIKE '純米酒%' OR (p_name ILIKE '%純米%' AND p_name NOT ILIKE '%吟醸%') THEN '純米'
    WHEN p_production_type ILIKE '吟醸%' OR p_name ILIKE '%吟醸%' THEN '本醸造'
    WHEN p_production_type ILIKE '本醸造%' OR p_name ILIKE '%本醸造%' OR p_name ILIKE '%原酒%' THEN '本醸造'
    WHEN p_production_type ILIKE 'その他(酒類)%' OR p_name ILIKE '%梅酒%' OR p_name ILIKE '%リキュール%' OR p_name ILIKE '%ザケ%' THEN 'リキュール'
    WHEN p_production_type ILIKE '普通酒%' THEN '普通酒'
    ELSE 'その他'
  END;
$$;

