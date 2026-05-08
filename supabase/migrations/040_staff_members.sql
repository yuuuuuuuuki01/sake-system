-- 040_staff_members.sql
create table if not exists staff_members (
  id                  uuid default gen_random_uuid() primary key,
  name                text not null,
  kana                text,
  employment_type     text not null default 'part_time'
    check (employment_type in ('employee','part_time')),
  department          text not null default 'bottling'
    check (department in ('soumu','route_sales','brewing','bottling')),
  hourly_rate         numeric,          -- パート時給
  monthly_salary      numeric,          -- 社員月給
  work_hours_per_day  numeric default 8,
  work_days_per_month integer default 22,
  available_months    integer[],        -- null=通年、[9,10,11,12,1,2,3,4]=造りのみ
  notes               text,
  is_active           boolean default true,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

alter table staff_members enable row level security;
create policy "staff_all" on staff_members for all using (true) with check (true);
grant select, insert, update, delete on staff_members to authenticated;
grant select on staff_members to anon;
