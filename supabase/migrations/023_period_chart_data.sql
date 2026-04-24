-- =============================================================================
-- 023_period_chart_data.sql
--
-- 期間に応じた粒度のチャートデータを返すRPC
-- yearly → 月別 / monthly → 日別 / weekly → 日別 / daily → 1日分
-- =============================================================================

create or replace function get_period_chart_data(p_period text, p_filter text)
returns table(label text, amount numeric)
language sql stable as $$
  select
    case p_period
      when 'yearly'  then to_char(sales_date, 'YYYY-MM')
      when 'monthly' then to_char(sales_date, 'MM/DD')
      when 'weekly'  then to_char(sales_date, 'MM/DD')
      when 'daily'   then to_char(sales_date, 'MM/DD')
      else to_char(sales_date, 'YYYY-MM')
    end as label,
    sum(sales_amount) as amount
  from daily_sales_fact
  where case p_period
    when 'yearly'  then to_char(sales_date, 'YYYY') = p_filter
    when 'monthly' then to_char(sales_date, 'YYYY-MM') = p_filter
    when 'weekly'  then
      to_char(date_trunc('week', sales_date)::date, 'IYYY')
      || '-W' || lpad(extract(week from sales_date)::text, 2, '0') = p_filter
    when 'daily'   then to_char(sales_date, 'YYYY-MM-DD') = p_filter
    else true
  end
  group by label
  order by min(sales_date);
$$;
