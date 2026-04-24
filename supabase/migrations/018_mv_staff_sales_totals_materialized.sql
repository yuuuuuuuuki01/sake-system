-- =============================================================================
-- 018_mv_staff_sales_totals_materialized.sql
--
-- 分析「担当」タブが REST API タイムアウトを起こす問題を修正。
-- 原因: mv_staff_sales_totals が通常ビューで sales_document_lines を
--       JOIN すると fan-out バグ + 5秒超のタイムアウトが発生。
-- 対策:
--   1. 通常ビュー mv_staff_sales_totals を削除してマテリアライズドビューに変更。
--      hdr/lns の CTE 分離で fan-out バグも同時に修正。
--   2. get_staff_totals_by_period() も CTE 方式に書き直す。
--   3. refresh_analytics() に REFRESH MATERIALIZED VIEW CONCURRENTLY を追加。
-- =============================================================================

-- ── 通常ビューを削除してマテリアライズドビューに置き換え ─────────────────────
drop view if exists mv_staff_sales_totals cascade;

create materialized view mv_staff_sales_totals as
with hdr as (
  -- ヘッダ側: 金額・伝票数を集計（lines を join しない → fan-out 防止）
  select
    coalesce(c.staff_code, '―')                              as staff_code,
    coalesce(s.name, '担当' || c.staff_code, '未設定')       as staff_name,
    sum(h.total_amount)                                       as amount,
    count(distinct h.id)                                      as documents
  from sales_document_headers h
  left join customers c on c.legacy_customer_code = h.legacy_customer_code
  left join staff s on s.legacy_staff_code = c.staff_code
  where h.sales_date is not null
  group by c.staff_code, s.name
),
lns as (
  -- 明細側: 本数のみ集計（ヘッダ金額を含めない）
  select
    coalesce(c.staff_code, '―') as staff_code,
    sum(l.quantity)              as quantity
  from sales_document_headers h
  left join customers c on c.legacy_customer_code = h.legacy_customer_code
  join sales_document_lines l on l.sales_document_header_id = h.id
  where h.sales_date is not null
  group by c.staff_code
)
select
  hdr.staff_code  as code,
  hdr.staff_name  as name,
  hdr.amount,
  coalesce(lns.quantity, 0) as quantity,
  hdr.documents
from hdr
left join lns on lns.staff_code = hdr.staff_code
order by hdr.amount desc nulls last
with data;

-- REFRESH CONCURRENTLY に必要なユニークインデックス
create unique index idx_mv_staff_sales_totals_code on mv_staff_sales_totals(code);
grant select on mv_staff_sales_totals to anon, authenticated;

-- ── get_staff_totals_by_period() を CTE 方式に書き直し ───────────────────────
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
  with hdr as (
    select
      coalesce(c.staff_code, '―')                              as staff_code,
      coalesce(s.name, '担当' || c.staff_code, '未設定')       as staff_name,
      sum(h.total_amount)                                       as amount,
      count(distinct h.id)                                      as documents
    from sales_document_headers h
    left join customers c on c.legacy_customer_code = h.legacy_customer_code
    left join staff s on s.legacy_staff_code = c.staff_code
    where h.sales_date is not null
      and (p_date_from is null or h.sales_date >= p_date_from)
      and (p_date_to   is null or h.sales_date <= p_date_to)
    group by c.staff_code, s.name
  ),
  lns as (
    select
      coalesce(c.staff_code, '―') as staff_code,
      sum(l.quantity)              as quantity
    from sales_document_headers h
    left join customers c on c.legacy_customer_code = h.legacy_customer_code
    join sales_document_lines l on l.sales_document_header_id = h.id
    where h.sales_date is not null
      and (p_date_from is null or h.sales_date >= p_date_from)
      and (p_date_to   is null or h.sales_date <= p_date_to)
    group by c.staff_code
  )
  select
    hdr.staff_code                as code,
    hdr.staff_name                as name,
    hdr.amount,
    coalesce(lns.quantity, 0)     as quantity,
    hdr.documents
  from hdr
  left join lns on lns.staff_code = hdr.staff_code
  order by hdr.amount desc nulls last;
$$;

-- ── refresh_analytics() に mv_staff_sales_totals リフレッシュを追加 ──────────
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

  -- ────────────────────────────────────────────────────────
  -- E) mv_staff_sales_totals（マテリアライズドビュー）
  -- ────────────────────────────────────────────────────────
  refresh materialized view concurrently mv_staff_sales_totals;

end;
$$;
