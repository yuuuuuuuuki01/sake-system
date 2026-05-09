-- =============================================================================
-- 029_product_hierarchy_materials.sql
--
-- 商品マスタに階層構造（原酒→マスター商品→PB商品）と
-- 資材紐付け（瓶・キャップ・ラベル）を追加。
-- =============================================================================

-- ── 1. products テーブルに階層カラム追加 ─────────────────────────────────

-- 原酒リンク: この商品の中身となる原酒（products内の別レコード）
alter table products add column if not exists base_sake_id uuid references products(id);

-- 親商品リンク: PB商品の場合、元になるマスター商品
alter table products add column if not exists parent_product_id uuid references products(id);

-- 商品種別
alter table products add column if not exists product_type text
  default 'standard'
  check (product_type in ('base_sake', 'standard', 'pb', 'material', 'misc'));

-- インデックス
create index if not exists idx_products_base_sake on products(base_sake_id) where base_sake_id is not null;
create index if not exists idx_products_parent on products(parent_product_id) where parent_product_id is not null;
create index if not exists idx_products_type on products(product_type);

-- ── 2. 資材紐付けテーブル ─────────────────────────────────────────────────

create table if not exists product_materials (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  material_type text not null check (material_type in ('bottle', 'cap', 'label', 'box', 'other')),
  material_name text not null,              -- 例: "茶瓶 720ml", "王冠キャップ 金"
  material_code text,                       -- 仕入先の品番
  supplier_code text,                       -- 仕入先コード
  supplier_name text,                       -- 仕入先名
  unit_cost numeric default 0,              -- 1個あたり仕入単価
  quantity_per_product numeric default 1,   -- 1商品あたりの使用数（通常1）
  notes text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- 同一商品×資材種別×資材名でユニーク
  unique (product_id, material_type, material_name)
);

-- RLS
alter table product_materials enable row level security;
create policy "anon_select_product_materials" on product_materials for select to anon using (true);
create policy "anon_insert_product_materials" on product_materials for insert to anon with check (true);
create policy "anon_update_product_materials" on product_materials for update to anon using (true);
create policy "anon_delete_product_materials" on product_materials for delete to anon using (true);
create policy "auth_all_product_materials" on product_materials for all to authenticated using (true);

-- インデックス
create index if not exists idx_product_materials_product on product_materials(product_id);
create index if not exists idx_product_materials_type on product_materials(material_type);

grant select, insert, update, delete on product_materials to anon, authenticated;

-- ── 3. 便利ビュー: 商品階層+資材を一覧 ───────────────────────────────────

create or replace view product_hierarchy as
select
  p.id,
  p.legacy_product_code as code,
  p.name,
  p.volume_ml,
  p.product_type,
  p.is_active,
  -- 原酒
  bs.legacy_product_code as base_sake_code,
  bs.name as base_sake_name,
  -- 親商品（PBの場合）
  pp.legacy_product_code as parent_code,
  pp.name as parent_name,
  -- PB子商品数
  (select count(*) from products c where c.parent_product_id = p.id) as pb_count,
  -- 資材数
  (select count(*) from product_materials m where m.product_id = p.id and m.is_active) as material_count
from products p
left join products bs on bs.id = p.base_sake_id
left join products pp on pp.id = p.parent_product_id
order by p.legacy_product_code;

grant select on product_hierarchy to anon, authenticated;
