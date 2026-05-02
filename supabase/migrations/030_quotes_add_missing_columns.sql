-- 030: quotesテーブルに不足カラムを追加
-- CREATE TABLE IF NOT EXISTS では既存テーブルにカラムが追加されないため ALTER TABLE で対応

alter table quotes
  add column if not exists template_type  text not null default 'sake'
    check (template_type in ('sake', 'standard')),
  add column if not exists tax_rate       int  not null default 10,
  add column if not exists delivery_date  text not null default '',
  add column if not exists payment_terms  text not null default '月末締め翌月末払い',
  add column if not exists delivery_place text not null default '';
