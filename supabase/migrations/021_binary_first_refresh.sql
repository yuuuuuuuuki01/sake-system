-- =============================================================================
-- 021_binary_first_refresh.sql
--
-- refresh_daily_sales_fact() をバイナリ優先ロジックに変更。
--
-- 旧ロジック: CSV を先に全件投入 → バイナリは csv_max_date 以降のみ
--   → CSV の max_date がバイナリより先に進むとバイナリが全件スキップされる
--   → ダッシュボードの数字がCSV依存で古くなる
--
-- 新ロジック: バイナリ(src:diff) を第一ソースとして全日付分投入
--   → CSV(src:csv) は ON CONFLICT DO NOTHING で歴史ギャップのみ補完
--   → バイナリが存在する日はバイナリが常に優先される
--
-- 追加: 全分析MVをリフレッシュし、sync後すぐダッシュボードに反映。
-- =============================================================================

create or replace function public.refresh_daily_sales_fact()
returns void
language plpgsql
security definer
set statement_timeout to '300s'
as $function$
begin
  delete from daily_sales_fact where true;

  -- ① バイナリ由来 (src:diff) — 全日付分を第一ソースとして投入
  insert into daily_sales_fact
    (sales_date, legacy_customer_code, legacy_product_code,
     sales_amount, quantity, document_count, updated_at)
  select sd, cc, prod,
         sum(amt)::numeric, sum(qty)::numeric, count(*)::int, now()
  from (
    select
      (regexp_match(note, 'date:(\d{4}-\d{2}-\d{2})'))[1]::date as sd,
      (regexp_match(note, 'cust:(\d+)'))[1]                      as cc,
      coalesce(legacy_product_code, 'unknown')                    as prod,
      amount                                                      as amt,
      quantity                                                    as qty
    from sales_document_lines
    where note like '%src:diff%'
  ) sub
  where sd is not null and cc is not null
  group by sd, cc, prod;

  -- ② CSV由来 — バイナリにない日付×得意先×商品だけ補完
  --    500/550/560 は加算、580/600/650 は減算（戻入・値引き）
  insert into daily_sales_fact
    (sales_date, legacy_customer_code, legacy_product_code,
     sales_amount, quantity, document_count, updated_at)
  select sd, cc, prod,
         sum(adj_amt)::numeric, sum(qty)::numeric, count(*)::int, now()
  from (
    select
      (regexp_match(note, 'date:(\d{4}-\d{2}-\d{2})'))[1]::date as sd,
      (regexp_match(note, 'cust:(\d+)'))[1]                      as cc,
      coalesce(legacy_product_code, 'unknown')                    as prod,
      case
        when note like '%type:580%'
          or note like '%type:600%'
          or note like '%type:650%' then -amount
        else amount
      end                                                         as adj_amt,
      quantity                                                    as qty
    from sales_document_lines
    where note like '%src:csv%'
      and (note like '%type:500%' or note like '%type:550%'
        or note like '%type:560%' or note like '%type:580%'
        or note like '%type:600%' or note like '%type:650%')
  ) sub
  where sd is not null and cc is not null
  group by sd, cc, prod
  on conflict (sales_date, legacy_customer_code, legacy_product_code)
    do nothing;   -- バイナリが優先、CSV は補完のみ

  -- ③ ダッシュボード用マテリアライズドビューをすべて更新
  refresh materialized view concurrently daily_sales_agg;
  refresh materialized view concurrently mv_monthly_sales;
  refresh materialized view concurrently mv_product_sales_totals;
  refresh materialized view concurrently mv_customer_sales_totals;
end;
$function$;
