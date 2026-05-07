-- =============================================================================
-- 036_analytics_add_volume_ml.sql
--
-- 移出量（volume_ml）を商品別・得意先別の集計MVとRPCに追加。
-- 背景: mv_product_sales_totals / mv_customer_sales_totals は migration 020
--       で作成されたが volume_ml カラムが欠落していた。
--       mv_monthly_sales は migration 026 で追加済み。
--       期間別RPC も volume_ml を返していなかった。
-- =============================================================================

-- ── mv_product_sales_totals に volume_ml を追加 ───────────────────────────────
drop materialized view if exists mv_product_sales_totals cascade;
create materialized view mv_product_sales_totals as
select
  f.legacy_product_code                             as code,
  coalesce(p.name, f.legacy_product_code)           as name,
  coalesce(p.category_code, '')                     as tag,
  sum(f.sales_amount)                               as amount,
  sum(f.quantity)                                   as quantity,
  sum(f.document_count)::bigint                     as documents,
  sum(f.quantity * coalesce(p.volume_ml, 0))        as volume_ml
from daily_sales_fact f
left join products p on p.legacy_product_code = f.legacy_product_code
where f.legacy_product_code is not null
group by f.legacy_product_code, p.name, p.category_code
order by sum(f.sales_amount) desc nulls last
with data;

create unique index if not exists idx_mv_product_sales_totals_code
  on mv_product_sales_totals(code);
grant select on mv_product_sales_totals to anon, authenticated;

-- ── mv_customer_sales_totals に volume_ml を追加 ──────────────────────────────
drop materialized view if exists mv_customer_sales_totals cascade;
create materialized view mv_customer_sales_totals as
select
  f.legacy_customer_code                            as code,
  coalesce(c.name, f.legacy_customer_code)          as name,
  coalesce(c.business_type, '')                     as tag,
  sum(f.sales_amount)                               as amount,
  sum(f.quantity)                                   as quantity,
  sum(f.document_count)::bigint                     as documents,
  sum(f.quantity * coalesce(p.volume_ml, 0))        as volume_ml
from daily_sales_fact f
left join customers c on c.legacy_customer_code = f.legacy_customer_code
left join products p on p.legacy_product_code = f.legacy_product_code
where f.legacy_customer_code is not null
group by f.legacy_customer_code, c.name, c.business_type
order by sum(f.sales_amount) desc nulls last
with data;

create unique index if not exists idx_mv_customer_sales_totals_code
  on mv_customer_sales_totals(code);
grant select on mv_customer_sales_totals to anon, authenticated;

-- ── get_product_totals_by_period に volume_ml を追加 ─────────────────────────
create or replace function get_product_totals_by_period(
  p_date_from date default null,
  p_date_to   date default null
)
returns table(code text, name text, tag text, amount numeric, quantity numeric, documents bigint, volume_ml numeric)
language sql stable as $$
  select
    f.legacy_product_code                             as code,
    coalesce(p.name, f.legacy_product_code)           as name,
    coalesce(p.category_code, '')                     as tag,
    sum(f.sales_amount)                               as amount,
    sum(f.quantity)                                   as quantity,
    sum(f.document_count)::bigint                     as documents,
    sum(f.quantity * coalesce(p.volume_ml, 0))        as volume_ml
  from daily_sales_fact f
  left join products p on p.legacy_product_code = f.legacy_product_code
  where f.legacy_product_code is not null
    and (p_date_from is null or f.sales_date >= p_date_from)
    and (p_date_to   is null or f.sales_date <= p_date_to)
  group by f.legacy_product_code, p.name, p.category_code
  order by sum(f.sales_amount) desc nulls last;
$$;

-- ── get_customer_totals_by_period に volume_ml を追加 ────────────────────────
create or replace function get_customer_totals_by_period(
  p_date_from date default null,
  p_date_to   date default null
)
returns table(code text, name text, tag text, amount numeric, quantity numeric, documents bigint, volume_ml numeric)
language sql stable as $$
  select
    f.legacy_customer_code                            as code,
    coalesce(c.name, f.legacy_customer_code)          as name,
    coalesce(c.business_type, '')                     as tag,
    sum(f.sales_amount)                               as amount,
    sum(f.quantity)                                   as quantity,
    sum(f.document_count)::bigint                     as documents,
    sum(f.quantity * coalesce(p.volume_ml, 0))        as volume_ml
  from daily_sales_fact f
  left join customers c on c.legacy_customer_code = f.legacy_customer_code
  left join products p on p.legacy_product_code = f.legacy_product_code
  where f.legacy_customer_code is not null
    and (p_date_from is null or f.sales_date >= p_date_from)
    and (p_date_to   is null or f.sales_date <= p_date_to)
  group by f.legacy_customer_code, c.name, c.business_type
  order by sum(f.sales_amount) desc nulls last;
$$;
