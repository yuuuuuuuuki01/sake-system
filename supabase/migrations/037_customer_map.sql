-- =============================================================================
-- 037_customer_map.sql : 取引先マップ用カラム・ビュー・テーブル
-- =============================================================================

-- ── 1. customers に緯度経度カラム追加 ──
alter table customers
  add column if not exists lat double precision,
  add column if not exists lng double precision;

create index if not exists idx_customers_geo
  on customers(lat, lng) where lat is not null and lng is not null;

-- ── 2. 納品先テーブル ──
create table if not exists delivery_locations (
  id                uuid primary key default gen_random_uuid(),
  customer_code     text references customers(legacy_customer_code),
  name              text not null,
  postal_code       text,
  address           text,
  lat               double precision,
  lng               double precision,
  contact_name      text,
  phone             text,
  delivery_note     text,
  is_active         boolean default true,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

create index if not exists idx_dl_customer on delivery_locations(customer_code);
create index if not exists idx_dl_geo
  on delivery_locations(lat, lng) where lat is not null and lng is not null;

-- ── 3. 取引先マップビュー ──
create or replace view v_customer_map as
select
  c.legacy_customer_code  as customer_code,
  c.name,
  c.phone,
  c.delivery_area_code    as area_code,
  c.business_type,
  coalesce(
    case c.business_type
      when '01' then '酒店'
      when '02' then '飲食店'
      when '03' then 'スーパー'
      when '04' then 'コンビニ'
      when '05' then '百貨店'
      when '06' then '量販店'
      when '07' then '問屋'
      when '08' then 'ホテル・旅館'
      when '09' then '官公庁'
      when '10' then '一般消費者'
      else c.business_type
    end,
    '未分類'
  ) as business_type_name,
  c.address1,
  c.lat,
  c.lng,
  coalesce(css.is_at_risk, false)       as is_at_risk,
  coalesce(css.is_dormant, false)       as is_dormant,
  coalesce(css.amount_12m, 0)           as amount_12m,
  css.days_since_order
from customers c
left join customer_sales_summary css
  on css.customer_code = c.legacy_customer_code
where c.is_active
order by c.name;
