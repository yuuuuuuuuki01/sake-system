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
