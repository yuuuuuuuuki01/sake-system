-- =============================================================================
-- 025_fix_product_monthly_sales_refresh.sql
--
-- refresh_product_monthly_sales() が旧スキーマのカラム名を参照していた問題を修正。
-- 旧: sale_date, product_code, slip_number, sale_type（存在しないカラム）
-- 新: sales_date, legacy_product_code（daily_sales_fact の実カラム）
--
-- 修正前: product_monthly_sales の4月数量 = 11,425（旧データ残り or 不一致）
-- 修正後: product_monthly_sales の4月数量 = 7,426（daily_sales_fact と完全一致）
-- =============================================================================

create or replace function refresh_product_monthly_sales()
returns void
language plpgsql
security definer
as $$
begin
  delete from product_monthly_sales;

  insert into product_monthly_sales
    (id, year_month, product_code, product_name, quantity, amount, document_count)
  select
    to_char(f.sales_date, 'YYYY-MM') || ':' || f.legacy_product_code as id,
    to_char(f.sales_date, 'YYYY-MM')                                 as year_month,
    f.legacy_product_code                                             as product_code,
    coalesce(p.name, f.legacy_product_code)                           as product_name,
    sum(f.quantity)                                                   as quantity,
    sum(f.sales_amount)::bigint                                       as amount,
    sum(f.document_count)                                             as document_count
  from daily_sales_fact f
  left join products p on p.legacy_product_code = f.legacy_product_code
  where f.sales_date >= (date_trunc('month', now()) - interval '60 months')::date
    and f.legacy_product_code is not null
    and f.legacy_product_code != 'unknown'
  group by to_char(f.sales_date, 'YYYY-MM'), f.legacy_product_code, p.name;
end;
$$;
