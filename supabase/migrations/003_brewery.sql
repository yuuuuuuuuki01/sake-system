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
