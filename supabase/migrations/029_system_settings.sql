-- システム設定テーブル
-- 見積書の会社情報・印章画像などをDBに保存する
create table if not exists system_settings (
  key        text primary key,
  value      jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- RLS: 認証済みユーザーのみ読み書き可
alter table system_settings enable row level security;

create policy "authenticated read system_settings"
  on system_settings for select
  to authenticated using (true);

create policy "authenticated write system_settings"
  on system_settings for all
  to authenticated using (true) with check (true);
