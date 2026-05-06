-- リレー同期実行ログ
create table if not exists relay_sync_log (
  id            bigint generated always as identity primary key,
  started_at    timestamptz not null default now(),
  finished_at   timestamptz not null default now(),
  status        text not null check (status in ('success', 'warning', 'error', 'no_change')),
  files_checked int not null default 0,
  files_synced  int not null default 0,
  rows_synced   int not null default 0,
  errors        jsonb not null default '[]'::jsonb,
  message       text not null default ''
);

create index if not exists idx_relay_sync_log_finished on relay_sync_log (finished_at desc);

-- RLS: anon/authenticated で読み書き可能（relay_agent は anon_key で書く）
alter table relay_sync_log enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'relay_sync_log' and policyname = 'relay_sync_log_all') then
    execute 'create policy "relay_sync_log_all" on relay_sync_log for all using (true) with check (true)';
  end if;
end $$;
