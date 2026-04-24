-- mv_monthly_sales に quantity, volume_ml を追加
drop materialized view if exists mv_monthly_sales cascade;
create materialized view mv_monthly_sales as
select
  to_char(f.sales_date, 'YYYY-MM') as month,
  sum(f.sales_amount)              as amount,
  sum(f.quantity)                  as quantity,
  sum(f.quantity * coalesce(p.volume_ml, 0)) as volume_ml
from daily_sales_fact f
left join products p on p.legacy_product_code = f.legacy_product_code
where f.sales_date is not null
group by to_char(f.sales_date, 'YYYY-MM')
order by month
with data;
create unique index if not exists idx_mv_monthly_sales_month on mv_monthly_sales(month);
grant select on mv_monthly_sales to anon, authenticated;
