-- 031: quote_linesテーブルに不足カラムを追加
alter table quote_lines
  add column if not exists jan_code      text,
  add column if not exists case_qty      int,
  add column if not exists retail_price  bigint;
