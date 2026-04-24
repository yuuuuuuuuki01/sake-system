-- =============================================================================
-- 019_quotes.sql : 見積書テーブル
-- =============================================================================

create table if not exists quotes (
  id                    uuid primary key default gen_random_uuid(),
  quote_no              text unique not null,
  quote_date            date not null default current_date,
  valid_until           date,
  legacy_customer_code  text,
  customer_name         text not null default '',
  customer_address      text not null default '',
  subject               text not null default '',
  template_type         text not null default 'sake'
                          check (template_type in ('sake', 'standard')),
  subtotal              bigint not null default 0,
  tax_amount            bigint not null default 0,
  total_amount          bigint not null default 0,
  tax_rate              int not null default 10,
  remarks               text not null default '',
  delivery_date         text not null default '',
  payment_terms         text not null default '月末締め翌月末払い',
  delivery_place        text not null default '',
  status                text not null default 'draft'
                          check (status in ('draft', 'sent', 'accepted', 'rejected')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create table if not exists quote_lines (
  id                    uuid primary key default gen_random_uuid(),
  quote_id              uuid not null references quotes(id) on delete cascade,
  line_no               int not null,
  legacy_product_code   text,
  product_name          text not null default '',
  jan_code              text,
  case_qty              int,
  quantity              numeric not null default 0,
  unit                  text not null default '本',
  unit_price            bigint not null default 0,
  retail_price          bigint,
  amount                bigint not null default 0,
  unique (quote_id, line_no)
);

create index if not exists idx_quotes_date        on quotes(quote_date desc);
create index if not exists idx_quotes_customer    on quotes(legacy_customer_code);
create index if not exists idx_quote_lines_qid    on quote_lines(quote_id);

alter table quotes      enable row level security;
alter table quote_lines enable row level security;

create policy "quotes_public"      on quotes      for all using (true) with check (true);
create policy "quote_lines_public" on quote_lines for all using (true) with check (true);

grant select, insert, update, delete on quotes      to anon, authenticated;
grant select, insert, update, delete on quote_lines to anon, authenticated;

-- 採番: Q2026-001 形式
create or replace function generate_quote_no()
returns text language plpgsql as $$
declare
  yr  text := to_char(current_date, 'YYYY');
  seq int;
begin
  select coalesce(max(
    case when quote_no ~ ('^Q' || yr || '-\d+$')
         then (regexp_match(quote_no, '\d+$'))[1]::int
         else 0 end
  ), 0) + 1
  into seq
  from quotes
  where quote_no like 'Q' || yr || '-%';
  return 'Q' || yr || '-' || lpad(seq::text, 3, '0');
end;
$$;
