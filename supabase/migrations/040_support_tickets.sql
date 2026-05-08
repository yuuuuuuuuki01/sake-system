-- support_tickets: チャットウィジェットからの問い合わせ管理テーブル
create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'other',
  message text not null,
  user_email text not null,
  status text not null default 'open',
  admin_reply text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table support_tickets enable row level security;

create policy "Users can read own tickets"
  on support_tickets for select
  using (true);

create policy "Users can insert tickets"
  on support_tickets for insert
  with check (true);

create index if not exists idx_support_tickets_email on support_tickets(user_email);
create index if not exists idx_support_tickets_status on support_tickets(status);
create index if not exists idx_support_tickets_created on support_tickets(created_at desc);
