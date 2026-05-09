-- =============================================================================
-- 030_base_sake_master.sql
--
-- 原酒マスタ: 仕込み→製成→タンク貯蔵→商品瓶詰めの中間管理テーブル。
-- 仕込みバッチとタンクと商品を結ぶハブ。
-- =============================================================================

-- ── 1. 原酒マスタテーブル ─────────────────────────────────────────────────

create table if not exists base_sakes (
  id uuid primary key default gen_random_uuid(),

  -- 識別
  code text not null unique,                -- 原酒コード（例: "GS-R07-JDG01"）
  name text not null,                       -- 表示名（例: "R7BY 純米大吟醸 山田錦50 原酒"）

  -- 製成種別・スペック
  sake_type text,                           -- 純米大吟醸, 吟醸, 純米, 本醸造, 普通酒 等
  alcohol_degree numeric,                   -- アルコール度数
  acidity numeric,                          -- 酸度
  amino_acid numeric,                       -- アミノ酸度
  sakemeter_value numeric,                  -- 日本酒度
  rice_type text,                           -- 原料米（山田錦, 五百万石 等）
  polish_rate numeric,                      -- 精米歩合(%)

  -- 醸造年度
  brewing_year integer,                     -- 醸造年度(BY) 例: 7 = R7BY

  -- 仕込みリンク
  brewing_batch_id uuid references brewing_batches(id),
  batch_no text,                            -- 仕込み番号（冗長だが検索用）

  -- タンク貯蔵
  current_tank_id uuid references tanks(id),
  current_tank_no text,                     -- タンク番号（冗長だが表示用）
  current_volume_l numeric default 0,       -- 現在残量(L)

  -- 状態
  status text default 'aging'
    check (status in ('fermenting', 'pressing', 'aging', 'ready', 'empty', 'blended')),
  -- fermenting: 醗酵中, pressing: 上槽中, aging: 貯蔵熟成中
  -- ready: 瓶詰め可, empty: 使い切り, blended: ブレンド済み

  pressed_at date,                          -- 上槽日
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- インデックス
create index if not exists idx_base_sakes_type on base_sakes(sake_type);
create index if not exists idx_base_sakes_status on base_sakes(status);
create index if not exists idx_base_sakes_batch on base_sakes(brewing_batch_id) where brewing_batch_id is not null;
create index if not exists idx_base_sakes_tank on base_sakes(current_tank_id) where current_tank_id is not null;
create index if not exists idx_base_sakes_year on base_sakes(brewing_year);

-- RLS
alter table base_sakes enable row level security;
create policy "anon_select_base_sakes" on base_sakes for select to anon using (true);
create policy "anon_insert_base_sakes" on base_sakes for insert to anon with check (true);
create policy "anon_update_base_sakes" on base_sakes for update to anon using (true);
create policy "anon_delete_base_sakes" on base_sakes for delete to anon using (true);
create policy "auth_all_base_sakes" on base_sakes for all to authenticated using (true);

grant select, insert, update, delete on base_sakes to anon, authenticated;

-- ── 2. products.base_sake_id を base_sakes に参照変更 ─────────────────────

-- 既存の products.base_sake_id は products(id) への自己参照だったが、
-- base_sakes(id) への参照に変更。（既存データは空なので安全）
alter table products drop constraint if exists products_base_sake_id_fkey;
alter table products add constraint products_base_sake_id_fkey
  foreign key (base_sake_id) references base_sakes(id);

-- ── 3. 調整記録テーブル（割水・ブレンド） ─────────────────────────────────

create table if not exists sake_adjustments (
  id uuid primary key default gen_random_uuid(),
  base_sake_id uuid not null references base_sakes(id) on delete cascade,

  adjustment_type text not null
    check (adjustment_type in ('dilution', 'blend', 'filter', 'pasteurize', 'other')),
  -- dilution: 割水(加水), blend: ブレンド, filter: 濾過, pasteurize: 火入れ

  -- 調整前
  before_alcohol numeric,                   -- 調整前アルコール度数
  before_volume_l numeric,                  -- 調整前量(L)

  -- 調整後
  after_alcohol numeric,                    -- 調整後アルコール度数（＝製品の目標度数）
  after_volume_l numeric,                   -- 調整後量(L)

  -- ブレンド元（blend の場合）
  blend_source_id uuid references base_sakes(id),  -- ブレンド元の原酒
  blend_ratio numeric,                              -- ブレンド比率(%)

  -- 割水量
  water_added_l numeric default 0,          -- 加水量(L)

  adjusted_at date,                         -- 調整日
  operator text,                            -- 作業者
  notes text,
  created_at timestamptz default now()
);

create index if not exists idx_adjustments_base on sake_adjustments(base_sake_id);

alter table sake_adjustments enable row level security;
create policy "anon_select_adjustments" on sake_adjustments for select to anon using (true);
create policy "anon_insert_adjustments" on sake_adjustments for insert to anon with check (true);
create policy "anon_update_adjustments" on sake_adjustments for update to anon using (true);
create policy "anon_delete_adjustments" on sake_adjustments for delete to anon using (true);
create policy "auth_all_adjustments" on sake_adjustments for all to authenticated using (true);

grant select, insert, update, delete on sake_adjustments to anon, authenticated;

-- ── 4. 原酒→商品の紐付けビュー ───────────────────────────────────────────

create or replace view base_sake_products as
select
  bs.id as base_sake_id,
  bs.code as base_sake_code,
  bs.name as base_sake_name,
  bs.sake_type,
  bs.alcohol_degree,
  bs.brewing_year,
  bs.current_tank_no,
  bs.current_volume_l,
  bs.status,
  p.id as product_id,
  p.legacy_product_code as product_code,
  p.name as product_name,
  p.volume_ml,
  p.product_type
from base_sakes bs
left join products p on p.base_sake_id = bs.id
order by bs.sake_type, bs.alcohol_degree, p.legacy_product_code;

grant select on base_sake_products to anon, authenticated;

-- ── 4. タンク→原酒の紐付けビュー ─────────────────────────────────────────

create or replace view tank_contents as
select
  t.id as tank_id,
  t.tank_no,
  t.display_name as tank_name,
  t.capacity_l,
  t.current_volume_l as tank_volume_l,
  t.status as tank_status,
  t.location,
  bs.id as base_sake_id,
  bs.code as base_sake_code,
  bs.name as base_sake_name,
  bs.sake_type,
  bs.alcohol_degree,
  bs.brewing_year,
  bs.status as sake_status,
  bb.batch_no,
  bb.brand_name,
  bb.start_date as brew_start,
  bb.joso_date as press_date
from tanks t
left join base_sakes bs on bs.current_tank_id = t.id
left join brewing_batches bb on bb.id = bs.brewing_batch_id
order by t.tank_no;

grant select on tank_contents to anon, authenticated;
