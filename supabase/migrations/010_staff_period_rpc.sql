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
