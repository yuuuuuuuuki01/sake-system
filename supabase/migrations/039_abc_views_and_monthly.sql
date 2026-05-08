-- =============================================================================
-- 039_abc_views_and_monthly.sql
--
-- ABC分析に必要なビューと月次内訳ビューを作成。
--
-- 問題: fetchCustomerAnalysis / fetchProductABC が mv_customer_abc /
--       mv_product_abc / mv_product_monthly_shipments を参照しているが
--       これらのオブジェクトが存在せずデータが一切表示されていなかった。
--       また salesByCustomer が月次実績ではなく均等分割の偽値を返していた。
-- =============================================================================

-- ── mv_customer_abc: 得意先ABC分析ビュー ─────────────────────────────────────
-- mv_customer_sales_totals（マテリアライズド）を土台にして
-- ABC ランクをウィンドウ関数で計算する regular view。
create or replace view mv_customer_abc as
with base as (
  select
    code,
    name,
    amount::numeric                        as amount,
    quantity::numeric                      as quantity,
    documents,
    sum(amount) over ()                    as grand_total
  from mv_customer_sales_totals
  where amount > 0
),
ranked as (
  select *,
    round((amount / nullif(grand_total, 0)) * 100, 2) as ratio,
    round(
      sum(amount) over (order by amount desc rows unbounded preceding)
      / nullif(grand_total, 0) * 100, 2
    ) as cum_ratio
  from base
)
select
  code,
  name,
  amount,
  quantity,
  documents,
  ratio,
  cum_ratio,
  case
    when cum_ratio <= 70 then 'A'
    when cum_ratio <= 90 then 'B'
    else 'C'
  end as abc_rank
from ranked
order by amount desc;

grant select on mv_customer_abc to anon, authenticated;

-- ── mv_product_abc: 商品ABC分析ビュー ────────────────────────────────────────
create or replace view mv_product_abc as
with base as (
  select
    code,
    name,
    amount::numeric                        as amount,
    quantity::numeric                      as quantity,
    documents,
    sum(amount) over ()                    as grand_total
  from mv_product_sales_totals
  where amount > 0
),
ranked as (
  select *,
    round((amount / nullif(grand_total, 0)) * 100, 2) as ratio,
    round(
      sum(amount) over (order by amount desc rows unbounded preceding)
      / nullif(grand_total, 0) * 100, 2
    ) as cum_ratio
  from base
)
select
  code,
  name,
  amount,
  quantity,
  documents,
  ratio,
  cum_ratio,
  case
    when cum_ratio <= 70 then 'A'
    when cum_ratio <= 90 then 'B'
    else 'C'
  end as abc_rank
from ranked
order by amount desc;

grant select on mv_product_abc to anon, authenticated;

-- ── mv_product_monthly_shipments: 商品×月別売上（fetchSalesReport 用）────────
-- 月ごとの行形式。既存 product_monthly_shipments テーブルは列形式のため別途作成。
create or replace view mv_product_monthly_shipments as
select
  f.legacy_product_code                   as code,
  coalesce(p.name, f.legacy_product_code) as name,
  to_char(f.sales_date, 'YYYY-MM')        as month,
  sum(f.sales_amount)                     as amount,
  sum(f.quantity)                         as quantity
from daily_sales_fact f
left join products p on p.legacy_product_code = f.legacy_product_code
where f.legacy_product_code is not null
  and f.sales_date is not null
group by f.legacy_product_code, p.name, to_char(f.sales_date, 'YYYY-MM');

grant select on mv_product_monthly_shipments to anon, authenticated;

-- ── mv_customer_monthly_sales: 得意先×月別売上（月次推移テーブル用）──────────
create or replace view mv_customer_monthly_sales as
select
  f.legacy_customer_code                   as code,
  coalesce(c.name, f.legacy_customer_code) as name,
  to_char(f.sales_date, 'YYYY-MM')         as month,
  sum(f.sales_amount)                      as amount
from daily_sales_fact f
left join customers c on c.legacy_customer_code = f.legacy_customer_code
where f.legacy_customer_code is not null
  and f.sales_date is not null
group by f.legacy_customer_code, c.name, to_char(f.sales_date, 'YYYY-MM');

grant select on mv_customer_monthly_sales to anon, authenticated;

-- ── get_abc_customer_by_period: 期間指定 得意先ABC RPC ────────────────────────
create or replace function get_abc_customer_by_period(
  p_date_from date default null,
  p_date_to   date default null
)
returns table(
  code text, name text,
  amount numeric, quantity numeric, documents bigint,
  ratio numeric, cum_ratio numeric, abc_rank text
)
language sql stable as $$
  with base as (
    select
      f.legacy_customer_code                   as code,
      coalesce(c.name, f.legacy_customer_code) as name,
      sum(f.sales_amount)                      as amount,
      sum(f.quantity)                          as quantity,
      sum(f.document_count)::bigint            as documents,
      sum(sum(f.sales_amount)) over ()         as grand_total
    from daily_sales_fact f
    left join customers c on c.legacy_customer_code = f.legacy_customer_code
    where f.legacy_customer_code is not null
      and (p_date_from is null or f.sales_date >= p_date_from)
      and (p_date_to   is null or f.sales_date <= p_date_to)
    group by f.legacy_customer_code, c.name
  ),
  ranked as (
    select *,
      round((base.amount / nullif(grand_total, 0)) * 100, 2) as ratio,
      round(
        sum(base.amount) over (order by base.amount desc rows unbounded preceding)
        / nullif(grand_total, 0) * 100, 2
      ) as cum_ratio
    from base
    where base.amount > 0
  )
  select
    code, name, amount, quantity, documents, ratio, cum_ratio,
    case when cum_ratio <= 70 then 'A' when cum_ratio <= 90 then 'B' else 'C' end
  from ranked
  order by amount desc;
$$;

-- ── get_abc_product_by_period: 期間指定 商品ABC RPC ──────────────────────────
create or replace function get_abc_product_by_period(
  p_date_from date default null,
  p_date_to   date default null
)
returns table(
  code text, name text,
  amount numeric, quantity numeric, documents bigint,
  ratio numeric, cum_ratio numeric, abc_rank text
)
language sql stable as $$
  with base as (
    select
      f.legacy_product_code                   as code,
      coalesce(p.name, f.legacy_product_code) as name,
      sum(f.sales_amount)                     as amount,
      sum(f.quantity)                         as quantity,
      sum(f.document_count)::bigint           as documents,
      sum(sum(f.sales_amount)) over ()        as grand_total
    from daily_sales_fact f
    left join products p on p.legacy_product_code = f.legacy_product_code
    where f.legacy_product_code is not null
      and (p_date_from is null or f.sales_date >= p_date_from)
      and (p_date_to   is null or f.sales_date <= p_date_to)
    group by f.legacy_product_code, p.name
  ),
  ranked as (
    select *,
      round((base.amount / nullif(grand_total, 0)) * 100, 2) as ratio,
      round(
        sum(base.amount) over (order by base.amount desc rows unbounded preceding)
        / nullif(grand_total, 0) * 100, 2
      ) as cum_ratio
    from base
    where base.amount > 0
  )
  select
    code, name, amount, quantity, documents, ratio, cum_ratio,
    case when cum_ratio <= 70 then 'A' when cum_ratio <= 90 then 'B' else 'C' end
  from ranked
  order by amount desc;
$$;
