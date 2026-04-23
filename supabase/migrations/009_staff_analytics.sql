-- =============================================================================
-- 009_staff_analytics.sql : 担当者別売上分析ビュー
-- =============================================================================

-- 担当者別売上合計（得意先マスタのstaff_codeを使用）
create or replace view mv_staff_sales_totals as
select
  coalesce(c.staff_code, '―') as code,
  coalesce(s.name, '担当' || c.staff_code, '未設定') as name,
  coalesce(sum(h.total_amount), 0) as amount,
  coalesce(sum(l.quantity), 0) as quantity,
  count(distinct h.id) as documents
from sales_document_headers h
left join customers c on c.legacy_customer_code = h.legacy_customer_code
left join staff s on s.legacy_staff_code = c.staff_code
left join sales_document_lines l on l.sales_document_header_id = h.id
where h.sales_date is not null
group by c.staff_code, s.name
order by amount desc;

-- 担当者×得意先別内訳
create or replace view mv_staff_customer_breakdown as
select
  coalesce(c.staff_code, '―') as staff_code,
  coalesce(s.name, '担当' || c.staff_code, '未設定') as staff_name,
  coalesce(h.legacy_customer_code, '―') as code,
  coalesce(c.name, h.legacy_customer_code) as name,
  coalesce(c.business_type, '') as tag,
  coalesce(sum(h.total_amount), 0) as amount,
  count(distinct h.id) as documents,
  0::numeric as quantity
from sales_document_headers h
left join customers c on c.legacy_customer_code = h.legacy_customer_code
left join staff s on s.legacy_staff_code = c.staff_code
where h.sales_date is not null
group by c.staff_code, s.name, h.legacy_customer_code, c.name, c.business_type
order by amount desc;

-- 担当者×商品別内訳
create or replace view mv_staff_product_breakdown as
select
  coalesce(c.staff_code, '―') as staff_code,
  coalesce(s.name, '担当' || c.staff_code, '未設定') as staff_name,
  coalesce(l.legacy_product_code) as code,
  coalesce(p.name, l.product_name, l.legacy_product_code) as name,
  coalesce(p.category_code, '') as tag,
  coalesce(sum(l.line_amount), 0) as amount,
  coalesce(sum(l.quantity), 0) as quantity,
  count(distinct h.id) as documents
from sales_document_lines l
join sales_document_headers h on l.sales_document_header_id = h.id
left join customers c on c.legacy_customer_code = h.legacy_customer_code
left join staff s on s.legacy_staff_code = c.staff_code
left join products p on p.legacy_product_code = l.legacy_product_code
where h.sales_date is not null
group by c.staff_code, s.name, l.legacy_product_code, p.name, l.product_name, p.category_code
order by amount desc;
