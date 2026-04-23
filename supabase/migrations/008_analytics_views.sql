-- =============================================================================
-- 008_analytics_views.sql : 営業分析ビュー・集計テーブル・日次更新関数
--
-- 以下を提供:
--   1. daily_sales_detail ビュー (日次売上集計)
--   2. customer_sales_summary テーブル (得意先別売上集計 - 日次更新)
--   3. product_monthly_shipments テーブル (商品×月別出荷量 - 日次更新)
--   4. churn_alert ビュー (離反/休眠アラート)
--   5. product_seasonal_profile テーブル (季節プロファイル - 日次更新)
--   6. visit_priority テーブル (訪問優先度スコア - 日次更新)
--   7. refresh_analytics() 関数 (全集計テーブルを一括更新)
--   8. pg_cron で毎日5:00 JSTに自動実行
-- =============================================================================

-- ── 1. 日次売上サマリー (ビュー) ───────────────────────────────────────────

create or replace view daily_sales_detail as
select
  h.sales_date,
  count(distinct h.id)          as document_count,
  coalesce(sum(h.total_amount), 0) as amount,
  coalesce(sum(l.quantity), 0)  as bottles,
  coalesce(sum(l.quantity * coalesce(p.volume_ml, 0)), 0) as volume_ml,
  case when coalesce(sum(l.quantity), 0) > 0
       then round(sum(h.total_amount)::numeric / sum(l.quantity), 0)
       else 0 end               as price_per_bottle,
  case when coalesce(sum(l.quantity * coalesce(p.volume_ml, 0)), 0) > 0
       then round(sum(h.total_amount)::numeric / (sum(l.quantity * coalesce(p.volume_ml, 0))::numeric / 1000), 0)
       else 0 end               as price_per_liter
from sales_document_headers h
left join sales_document_lines l on l.sales_document_header_id = h.id
left join products p on p.legacy_product_code = l.legacy_product_code
where h.sales_date is not null
group by h.sales_date
order by h.sales_date;

-- ── 2. 得意先別売上集計テーブル ─────────────────────────────────────────────

create table if not exists customer_sales_summary (
  customer_code       text primary key,
  customer_name       text,
  business_type       text,
  area_code           text,
  phone               text,
  last_order_date     date,
  days_since_order    integer,
  order_count_12m     integer default 0,
  amount_12m          bigint default 0,
  order_count_3m      integer default 0,
  amount_3m           bigint default 0,
  amount_last_year_same_month bigint default 0,
  amount_this_month   bigint default 0,
  is_dormant          boolean default false,  -- 12ヶ月内注文あり＆3ヶ月ゼロ
  is_at_risk          boolean default false,  -- 前年同月注文あり＆今月ゼロ
  annual_revenue      bigint default 0,
  updated_at          timestamptz default now()
);

create index if not exists idx_css_dormant on customer_sales_summary(is_dormant) where is_dormant;
create index if not exists idx_css_at_risk on customer_sales_summary(is_at_risk) where is_at_risk;

-- ── 3. 商品×月別出荷量テーブル ──────────────────────────────────────────────

create table if not exists product_monthly_shipments (
  product_code        text primary key,
  product_name        text,
  category            text,
  m01 integer default 0, m02 integer default 0, m03 integer default 0,
  m04 integer default 0, m05 integer default 0, m06 integer default 0,
  m07 integer default 0, m08 integer default 0, m09 integer default 0,
  m10 integer default 0, m11 integer default 0, m12 integer default 0,
  total_quantity       integer default 0,
  total_amount         bigint default 0,
  updated_at           timestamptz default now()
);

-- ── 4. 離反/休眠アラート (ビュー — customer_sales_summaryから導出) ────────

create or replace view churn_alert as
select
  customer_code,
  customer_name,
  business_type,
  area_code,
  phone,
  last_order_date,
  days_since_order,
  amount_12m,
  case
    when is_dormant then '休眠'
    when is_at_risk then '離反リスク'
  end as alert_type
from customer_sales_summary
where is_dormant or is_at_risk
order by amount_12m desc;

-- ── 5. 商品季節プロファイル ──────────────────────────────────────────────────

create table if not exists product_seasonal_profile (
  product_code        text primary key,
  product_name        text,
  season_type         text default 'year-round',  -- year-round/seasonal/year-end
  peak_months         integer[] default '{}',       -- 0-indexed months
  proposal_month      integer,                      -- 提案開始月 (0-indexed)
  avg_monthly_qty     integer default 0,
  updated_at          timestamptz default now()
);

-- ── 6. 訪問優先度テーブル ───────────────────────────────────────────────────

create table if not exists visit_priority (
  customer_code       text primary key,
  customer_name       text,
  phone               text,
  address             text,
  area_code           text,
  business_type       text,
  priority_score      integer default 0,
  reasons             text[] default '{}',
  last_order_date     date,
  days_since_order    integer,
  annual_revenue      bigint default 0,
  recommended_action  text,
  updated_at          timestamptz default now()
);

create index if not exists idx_vp_score on visit_priority(priority_score desc);
create index if not exists idx_vp_area on visit_priority(area_code);

-- ── 7. 全集計テーブル一括更新関数 ───────────────────────────────────────────

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
  -- ────────────────────────────────────────────────────────
  -- A) customer_sales_summary
  -- ────────────────────────────────────────────────────────
  truncate customer_sales_summary;

  insert into customer_sales_summary (
    customer_code, customer_name, business_type, area_code, phone,
    last_order_date, days_since_order,
    order_count_12m, amount_12m, order_count_3m, amount_3m,
    amount_last_year_same_month, amount_this_month,
    is_dormant, is_at_risk, annual_revenue, updated_at
  )
  select
    c.legacy_customer_code,
    c.name,
    c.business_type,
    c.delivery_area_code,
    c.phone,
    max(h.sales_date),
    v_today - max(h.sales_date),
    -- 12ヶ月
    count(distinct h.id) filter (where h.sales_date >= v_12m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    -- 3ヶ月
    count(distinct h.id) filter (where h.sales_date >= v_3m_ago),
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_3m_ago), 0),
    -- 前年同月
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_ly_month), 0),
    -- 今月
    coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_this_month), 0),
    -- 休眠: 12ヶ月内注文あり & 3ヶ月ゼロ
    (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
     and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0),
    -- 離反リスク: 前年同月注文あり & 今月ゼロ (休眠でない)
    (sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_ly_month) > 0
     and coalesce(sum(h.total_amount) filter (where to_char(h.sales_date, 'YYYY-MM') = v_this_month), 0) = 0
     and not (count(distinct h.id) filter (where h.sales_date >= v_12m_ago) > 0
              and count(distinct h.id) filter (where h.sales_date >= v_3m_ago) = 0)),
    -- 年間売上
    coalesce(sum(h.total_amount) filter (where h.sales_date >= v_12m_ago), 0),
    now()
  from customers c
  left join sales_document_headers h
    on h.legacy_customer_code = c.legacy_customer_code
  where c.is_active = true
  group by c.legacy_customer_code, c.name, c.business_type, c.delivery_area_code, c.phone;

  -- ────────────────────────────────────────────────────────
  -- B) product_monthly_shipments
  -- ────────────────────────────────────────────────────────
  truncate product_monthly_shipments;

  insert into product_monthly_shipments (
    product_code, product_name, category,
    m01, m02, m03, m04, m05, m06,
    m07, m08, m09, m10, m11, m12,
    total_quantity, total_amount, updated_at
  )
  select
    coalesce(l.product_code, l.legacy_product_code),
    coalesce(l.product_name, p.name, l.product_code),
    coalesce(p.category, ''),
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 1), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 2), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 3), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 4), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 5), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 6), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 7), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 8), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 9), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 10), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 11), 0)::int,
    coalesce(sum(l.quantity) filter (where extract(month from h.sales_date) = 12), 0)::int,
    coalesce(sum(l.quantity), 0)::int,
    coalesce(sum(coalesce(l.line_amount, l.amount)), 0),
    now()
  from sales_document_lines l
  join sales_document_headers h on h.id = l.header_id
  left join products p on p.legacy_product_code = coalesce(l.product_code, l.legacy_product_code)
  where coalesce(l.product_code, l.legacy_product_code) is not null
  group by coalesce(l.product_code, l.legacy_product_code),
           coalesce(l.product_name, p.name, l.product_code),
           coalesce(p.category, '')
  having sum(l.quantity) > 0;

  -- ────────────────────────────────────────────────────────
  -- C) product_seasonal_profile
  -- ────────────────────────────────────────────────────────
  truncate product_seasonal_profile;

  insert into product_seasonal_profile (
    product_code, product_name, season_type, peak_months, proposal_month, avg_monthly_qty, updated_at
  )
  select
    s.product_code,
    s.product_name,
    case
      -- 歳暮: 11+12月が全体の50%超
      when (s.m11 + s.m12)::numeric / greatest(s.total_quantity, 1) > 0.5 then 'year-end'
      -- 季節品: 出荷月が6ヶ月以下
      when (case when s.m01>0 then 1 else 0 end + case when s.m02>0 then 1 else 0 end
          + case when s.m03>0 then 1 else 0 end + case when s.m04>0 then 1 else 0 end
          + case when s.m05>0 then 1 else 0 end + case when s.m06>0 then 1 else 0 end
          + case when s.m07>0 then 1 else 0 end + case when s.m08>0 then 1 else 0 end
          + case when s.m09>0 then 1 else 0 end + case when s.m10>0 then 1 else 0 end
          + case when s.m11>0 then 1 else 0 end + case when s.m12>0 then 1 else 0 end) <= 6
      then 'seasonal'
      else 'year-round'
    end,
    -- peak_months: 平均の150%超の月 (0-indexed)
    array(
      select m - 1 from (
        values (1, s.m01),(2, s.m02),(3, s.m03),(4, s.m04),(5, s.m05),(6, s.m06),
               (7, s.m07),(8, s.m08),(9, s.m09),(10, s.m10),(11, s.m11),(12, s.m12)
      ) as v(m, qty)
      where qty > (s.total_quantity::numeric / 12) * 1.5
      order by m
    ),
    -- proposal_month: ピーク月の2ヶ月前 (最初のピーク月基準, 0-indexed)
    (select ((m - 1 + 10) % 12) from (
      values (1, s.m01),(2, s.m02),(3, s.m03),(4, s.m04),(5, s.m05),(6, s.m06),
             (7, s.m07),(8, s.m08),(9, s.m09),(10, s.m10),(11, s.m11),(12, s.m12)
    ) as v(m, qty)
    where qty > (s.total_quantity::numeric / 12) * 1.5
    order by m limit 1),
    s.total_quantity / 12,
    now()
  from product_monthly_shipments s
  where s.total_quantity > 0;

  -- ────────────────────────────────────────────────────────
  -- D) visit_priority
  -- ────────────────────────────────────────────────────────
  truncate visit_priority;

  insert into visit_priority (
    customer_code, customer_name, phone, address, area_code, business_type,
    priority_score, reasons, last_order_date, days_since_order,
    annual_revenue, recommended_action, updated_at
  )
  select
    cs.customer_code,
    cs.customer_name,
    cs.phone,
    c.address1,
    cs.area_code,
    cs.business_type,
    -- スコア計算
    (case when cs.days_since_order > 60 then 50 else 0 end)          -- 離反リスク
    + (case when exists (
        select 1 from product_seasonal_profile sp
        where sp.proposal_month = extract(month from current_date) - 1 -- 0-indexed current month
      ) then 30 else 0 end)                                           -- 季節提案
    + (case when cs.days_since_order between 30 and 59 then 20 else 0 end) -- 定期巡回
    + least(20, (cs.annual_revenue::numeric / greatest(
        (select max(annual_revenue) from customer_sales_summary), 1
      ) * 20)::int),                                                   -- 金額ウェイト
    -- reasons
    array_remove(array[
      case when cs.days_since_order > 60 then '離反リスク(' || cs.days_since_order || '日)' end,
      case when cs.days_since_order between 30 and 59 then '定期巡回(' || cs.days_since_order || '日)' end,
      case when exists (
        select 1 from product_seasonal_profile sp
        where sp.proposal_month = extract(month from current_date) - 1
      ) then '季節提案あり' end
    ], null),
    cs.last_order_date,
    cs.days_since_order,
    cs.annual_revenue,
    case
      when cs.is_dormant then '再開アプローチ — 新商品/季節品で接点復活'
      when cs.is_at_risk then 'フォロー電話 — 前年同月の注文確認'
      when cs.days_since_order between 30 and 59 then '定期訪問 — 在庫確認・追加提案'
      else '維持訪問'
    end,
    now()
  from customer_sales_summary cs
  join customers c on c.legacy_customer_code = cs.customer_code
  where cs.annual_revenue > 0
    and cs.last_order_date is not null
  order by priority_score desc;

end;
$$;

-- ── 8. 初回実行 ─────────────────────────────────────────────────────────────
-- マイグレーション適用時に一度実行
select refresh_analytics();

-- ── 9. pg_cron 日次スケジュール (毎日05:00 JST = 20:00 UTC) ────────────────
-- pg_cron拡張が有効な場合のみ実行。エラーが出ても無視する。
do $$
begin
  -- pg_cron が使える場合のみ
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule('refresh_analytics_daily');
    perform cron.schedule(
      'refresh_analytics_daily',
      '0 20 * * *',  -- 20:00 UTC = 05:00 JST
      'select refresh_analytics()'
    );
  end if;
exception when others then
  raise notice 'pg_cron not available — set up external scheduler for refresh_analytics()';
end;
$$;
