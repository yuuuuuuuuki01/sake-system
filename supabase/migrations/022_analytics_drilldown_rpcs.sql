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
