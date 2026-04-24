-- =============================================================================
-- 020_analytics_period_views.sql
--
-- 分析ページの期間別フィルタが機能していなかった問題を修正。
-- 原因: mv_monthly_sales / mv_product_sales_totals / mv_customer_sales_totals
--       が存在せず、fetchSalesAnalytics / fetchAnalyticsByPeriod が常に空を返す。
--       加えて get_distinct_periods RPC が未作成で期間選択肢も表示されなかった。
-- 対策: マテリアライズドビュー3本 + RPC 3本を作成し、
--       refresh_analytics() にリフレッシュ処理を追加。
-- =============================================================================

-- ── mv_monthly_sales: 月別売上チャートデータ ─────────────────────────────────
create materialized view if not exists mv_monthly_sales as
select
  to_char(sales_date, 'YYYY-MM') as month,
  sum(sales_amount)              as amount,
  sum(quantity)                  as quantity
from daily_sales_fact
where sales_date is not null
group by to_char(sales_date, 'YYYY-MM')
order by month
with data;

create unique index if not exists idx_mv_monthly_sales_month
  on mv_monthly_sales(month);
grant select on mv_monthly_sales to anon, authenticated;

-- ── mv_product_sales_totals: 商品別全期間集計 ─────────────────────────────────
create materialized view if not exists mv_product_sales_totals as
select
  f.legacy_product_code                     as code,
  coalesce(p.name, f.legacy_product_code)   as name,
  coalesce(p.category_code, '')             as tag,
  sum(f.sales_amount)                       as amount,
  sum(f.quantity)                           as quantity,
  sum(f.document_count)::bigint             as documents
from daily_sales_fact f
left join products p on p.legacy_product_code = f.legacy_product_code
where f.legacy_product_code is not null
group by f.legacy_product_code, p.name, p.category_code
order by sum(f.sales_amount) desc nulls last
with data;

create unique index if not exists idx_mv_product_sales_totals_code
  on mv_product_sales_totals(code);
grant select on mv_product_sales_totals to anon, authenticated;

-- ── mv_customer_sales_totals: 得意先別全期間集計 ──────────────────────────────
create materialized view if not exists mv_customer_sales_totals as
select
  f.legacy_customer_code                    as code,
  coalesce(c.name, f.legacy_customer_code)  as name,
  coalesce(c.business_type, '')             as tag,
  sum(f.sales_amount)                       as amount,
  sum(f.quantity)                           as quantity,
  sum(f.document_count)::bigint             as documents
from daily_sales_fact f
left join customers c on c.legacy_customer_code = f.legacy_customer_code
where f.legacy_customer_code is not null
group by f.legacy_customer_code, c.name, c.business_type
order by sum(f.sales_amount) desc nulls last
with data;

create unique index if not exists idx_mv_customer_sales_totals_code
  on mv_customer_sales_totals(code);
grant select on mv_customer_sales_totals to anon, authenticated;

-- ── get_available_periods: 期間選択肢一覧を返す RPC ──────────────────────────
-- p_type: 'daily' | 'weekly' | 'monthly' | 'yearly'
create or replace function get_available_periods(p_type text)
returns table(period_val text)
language sql stable as $$
  select distinct
    case p_type
      when 'daily'   then to_char(sales_date, 'YYYY-MM-DD')
      when 'weekly'  then
        to_char(date_trunc('week', sales_date)::date, 'IYYY')
        || '-W' || lpad(extract(week from sales_date)::text, 2, '0')
      when 'yearly'  then to_char(sales_date, 'YYYY')
      else to_char(sales_date, 'YYYY-MM')   -- monthly (default)
    end as period_val
  from daily_sales_fact
  where sales_date is not null
  order by period_val desc;
$$;

-- ── get_product_totals_by_period: 期間フィルタ付き商品集計 ───────────────────
create or replace function get_product_totals_by_period(
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
  where f.legacy_product_code is not null
    and (p_date_from is null or f.sales_date >= p_date_from)
    and (p_date_to   is null or f.sales_date <= p_date_to)
  group by f.legacy_product_code, p.name, p.category_code
  order by sum(f.sales_amount) desc nulls last;
$$;

-- ── get_customer_totals_by_period: 期間フィルタ付き得意先集計 ────────────────
create or replace function get_customer_totals_by_period(
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
  where f.legacy_customer_code is not null
    and (p_date_from is null or f.sales_date >= p_date_from)
    and (p_date_to   is null or f.sales_date <= p_date_to)
  group by f.legacy_customer_code, c.name, c.business_type
  order by sum(f.sales_amount) desc nulls last;
$$;

-- ── refresh_analytics(): 新MVのリフレッシュを追加 ─────────────────────────────
create or replace function refresh_analytics()
returns void
language plpgsql
security definer
as $$
declare
  v_today       date := current_date;
  v_3m_ago      date := current_date - interval '3 months';
  v_12m_ago     date := current_date - interval '12 months';
  v_this_month  text := to_char(current_date, 'YYYY-MM');
  v_ly_month    text := to_char(current_date - interval '1 year', 'YYYY-MM');
begin
  -- A) customer_sales_summary
  truncate customer_sales_summary;
  insert into customer_sales_summary (
    customer_code, customer_name, business_type, area_code, phone,
    last_order_date, days_since_order,
    order_count_12m, amount_12m, order_count_3m, amount_3m,
    amount_last_year_same_month, amount_this_month,
    is_dormant, is_at_risk, annual_revenue, updated_at
  )
  select
    c.legacy_customer_code, c.name, c.business_type, c.delivery_area_code, c.phone,
    max(h.sales_date),
    v_today - max(h.sales_date),
    count(distinct h.id) filter (where h.sales_date >= v_12m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    count(distinct h.id) filter (where h.sales_date >= v_3m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_3m_ago), 0),
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date,'YYYY-MM') = v_ly_month), 0),
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date,'YYYY-MM') = v_this_month), 0),
    (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
     and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0),
    (sum(h.total_amount) filter (where to_char(h.sales_date,'YYYY-MM') = v_ly_month) > 0
     and coalesce(sum(h.total_amount) filter (where to_char(h.sales_date,'YYYY-MM') = v_this_month), 0) = 0
     and not (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
              and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0)),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    now()
  from customers c
  left join sales_document_headers h on h.legacy_customer_code = c.legacy_customer_code
  where c.is_active = true
  group by c.legacy_customer_code, c.name, c.business_type, c.delivery_area_code, c.phone;

  -- B) product_monthly_shipments
  truncate product_monthly_shipments;
  insert into product_monthly_shipments (
    product_code, product_name, category,
    m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,
    total_quantity, total_amount, updated_at
  )
  select
    coalesce(l.product_code, l.legacy_product_code),
    coalesce(l.product_name, p.name, l.product_code),
    coalesce(p.category, ''),
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=1),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=2),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=3),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=4),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=5),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=6),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=7),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=8),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=9),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=10),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=11),0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date)=12),0)::int,
    coalesce(sum(l.quantity),0)::int,
    coalesce(sum(coalesce(l.line_amount, l.amount)),0),
    now()
  from sales_document_lines l
  join sales_document_headers h on h.id = l.header_id
  left join products p on p.legacy_product_code = coalesce(l.product_code, l.legacy_product_code)
  where coalesce(l.product_code, l.legacy_product_code) is not null
  group by coalesce(l.product_code, l.legacy_product_code),
           coalesce(l.product_name, p.name, l.product_code),
           coalesce(p.category, '')
  having sum(l.quantity) > 0;

  -- C) product_seasonal_profile
  truncate product_seasonal_profile;
  insert into product_seasonal_profile (
    product_code, product_name, season_type, peak_months, proposal_month, avg_monthly_qty, updated_at
  )
  select
    s.product_code, s.product_name,
    case
      when (s.m11+s.m12)::numeric/greatest(s.total_quantity,1) > 0.5 then 'year-end'
      when (case when s.m01>0 then 1 else 0 end+case when s.m02>0 then 1 else 0 end
           +case when s.m03>0 then 1 else 0 end+case when s.m04>0 then 1 else 0 end
           +case when s.m05>0 then 1 else 0 end+case when s.m06>0 then 1 else 0 end
           +case when s.m07>0 then 1 else 0 end+case when s.m08>0 then 1 else 0 end
           +case when s.m09>0 then 1 else 0 end+case when s.m10>0 then 1 else 0 end
           +case when s.m11>0 then 1 else 0 end+case when s.m12>0 then 1 else 0 end) <= 6
      then 'seasonal'
      else 'year-round'
    end,
    array(select m-1 from (values(1,s.m01),(2,s.m02),(3,s.m03),(4,s.m04),(5,s.m05),(6,s.m06),
      (7,s.m07),(8,s.m08),(9,s.m09),(10,s.m10),(11,s.m11),(12,s.m12)) as v(m,qty)
      where qty>(s.total_quantity::numeric/12)*1.5 order by m),
    (select ((m-1+10)%12) from (values(1,s.m01),(2,s.m02),(3,s.m03),(4,s.m04),(5,s.m05),(6,s.m06),
      (7,s.m07),(8,s.m08),(9,s.m09),(10,s.m10),(11,s.m11),(12,s.m12)) as v(m,qty)
      where qty>(s.total_quantity::numeric/12)*1.5 order by m limit 1),
    s.total_quantity/12, now()
  from product_monthly_shipments s where s.total_quantity>0;

  -- D) visit_priority
  truncate visit_priority;
  insert into visit_priority (
    customer_code, customer_name, phone, address, area_code, business_type,
    priority_score, reasons, last_order_date, days_since_order,
    annual_revenue, recommended_action, updated_at
  )
  select
    cs.customer_code, cs.customer_name, cs.phone, c.address1, cs.area_code, cs.business_type,
    (case when cs.days_since_order>60 then 50 else 0 end)
    +(case when exists(select 1 from product_seasonal_profile sp
        where sp.proposal_month=extract(month from current_date)-1) then 30 else 0 end)
    +(case when cs.days_since_order between 30 and 59 then 20 else 0 end)
    +least(20,(cs.annual_revenue::numeric/greatest(
        (select max(annual_revenue) from customer_sales_summary),1)*20)::int),
    array_remove(array[
      case when cs.days_since_order>60 then '離反リスク('||cs.days_since_order||'日)' end,
      case when cs.days_since_order between 30 and 59 then '定期巡回('||cs.days_since_order||'日)' end,
      case when exists(select 1 from product_seasonal_profile sp
        where sp.proposal_month=extract(month from current_date)-1) then '季節提案あり' end
    ], null),
    cs.last_order_date, cs.days_since_order, cs.annual_revenue,
    case when cs.is_dormant then '再開アプローチ — 新商品/季節品で接点復活'
         when cs.is_at_risk then 'フォロー電話 — 前年同月の注文確認'
         when cs.days_since_order between 30 and 59 then '定期訪問 — 在庫確認・追加提案'
         else '維持訪問' end,
    now()
  from customer_sales_summary cs
  join customers c on c.legacy_customer_code=cs.customer_code
  where cs.annual_revenue>0 and cs.last_order_date is not null
  order by priority_score desc;

  -- E) mv_staff_sales_totals
  refresh materialized view concurrently mv_staff_sales_totals;

  -- F) 分析集計MV（本マイグレーションで追加）
  refresh materialized view concurrently mv_monthly_sales;
  refresh materialized view concurrently mv_product_sales_totals;
  refresh materialized view concurrently mv_customer_sales_totals;

end;
$$;
