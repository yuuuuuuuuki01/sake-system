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
