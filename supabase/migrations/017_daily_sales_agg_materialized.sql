-- =============================================================================
-- 017_daily_sales_agg_materialized.sql
--
-- daily_sales_detail ビューが REST API タイムアウトを起こす問題を修正。
-- 原因: sales_document_lines (70万件) のフルスキャンで 8-10秒超過。
-- 対策: マテリアライズドビュー daily_sales_agg に事前集計し、
--       daily_sales_detail はそれへの薄いラッパーに変更。
--       refresh_daily_sales_fact() 末尾で CONCURRENTLY リフレッシュ。
-- =============================================================================

-- ── インデックス追加 ─────────────────────────────────────────────────────────
create index if not exists idx_sdl_header_id    on sales_document_lines(sales_document_header_id);
create index if not exists idx_sdl_product_code on sales_document_lines(legacy_product_code);
create index if not exists idx_sdh_sales_date   on sales_document_headers(sales_date);

-- ── マテリアライズドビュー作成 ───────────────────────────────────────────────
create materialized view if not exists daily_sales_agg as
select
  h.sales_date,
  count(distinct h.id)                                                          as document_count,
  coalesce(sum(h.total_amount), 0)                                              as amount,
  coalesce(sum(l.quantity), 0)                                                  as bottles,
  coalesce(sum(l.quantity * coalesce(p.volume_ml, 0)), 0)                       as volume_ml,
  case when coalesce(sum(l.quantity), 0) > 0
       then round(sum(h.total_amount)::numeric / sum(l.quantity), 0)
       else 0 end                                                                as price_per_bottle,
  case when coalesce(sum(l.quantity * coalesce(p.volume_ml, 0)), 0) > 0
       then round(sum(h.total_amount)::numeric / (sum(l.quantity * coalesce(p.volume_ml, 0))::numeric / 1000), 0)
       else 0 end                                                                as price_per_liter
from sales_document_headers h
left join sales_document_lines l on l.sales_document_header_id = h.id
left join products p on p.legacy_product_code = l.legacy_product_code
where h.sales_date is not null
group by h.sales_date
order by h.sales_date
with data;

create unique index if not exists idx_daily_sales_agg_date on daily_sales_agg(sales_date);
grant select on daily_sales_agg to anon, authenticated;

-- ── daily_sales_detail を薄いラッパーに変更 ─────────────────────────────────
create or replace view daily_sales_detail as
select * from daily_sales_agg order by sales_date;

-- ── refresh_daily_sales_fact に REFRESH を追加 ───────────────────────────────
create or replace function public.refresh_daily_sales_fact()
returns void
language plpgsql
security definer
set statement_timeout to '300s'
as $function$
declare
  csv_max_date date;
begin
  delete from daily_sales_fact where true;

  select max((regexp_match(note, 'date:(\d{4}-\d{2}-\d{2})'))[1]::date)
  into csv_max_date
  from sales_document_lines where note like '%src:csv%';

  -- CSV由来: 500+560 を加算、580+600+650 を減算
  insert into daily_sales_fact (sales_date, legacy_customer_code, legacy_product_code, sales_amount, quantity, document_count, updated_at)
  select sd, cc, prod, sum(adj_amt)::numeric, sum(qty)::numeric, count(*)::int, now()
  from (
    select
      (regexp_match(note, 'date:(\d{4}-\d{2}-\d{2})'))[1]::date as sd,
      (regexp_match(note, 'cust:(\d+)'))[1] as cc,
      coalesce(legacy_product_code, 'unknown') as prod,
      case
        when note like '%type:580%' or note like '%type:600%' or note like '%type:650%' then -amount
        else amount
      end as adj_amt,
      quantity as qty
    from sales_document_lines
    where note like '%src:csv%'
      and (note like '%type:500%' or note like '%type:550%' or note like '%type:560%'
           or note like '%type:580%' or note like '%type:600%' or note like '%type:650%')
  ) sub where sd is not null and cc is not null
  group by sd, cc, prod;

  -- バイナリ由来（CSV最終日より後のみ）
  if csv_max_date is not null then
    insert into daily_sales_fact (sales_date, legacy_customer_code, legacy_product_code, sales_amount, quantity, document_count, updated_at)
    select sd, cc, prod, sum(amt)::numeric, sum(qty)::numeric, count(*)::int, now()
    from (
      select
        (regexp_match(note, 'date:(\d{4}-\d{2}-\d{2})'))[1]::date as sd,
        (regexp_match(note, 'cust:(\d+)'))[1] as cc,
        coalesce(legacy_product_code, 'unknown') as prod,
        amount as amt, quantity as qty
      from sales_document_lines
      where note like '%src:diff%' and amount > 0 and quantity > 0
    ) sub where sd is not null and cc is not null and sd > csv_max_date
    group by sd, cc, prod
    on conflict (sales_date, legacy_customer_code, legacy_product_code) do nothing;
  end if;

  -- daily_sales_agg を最新データで更新（ダッシュボード高速化）
  refresh materialized view concurrently daily_sales_agg;
end;
$function$;
