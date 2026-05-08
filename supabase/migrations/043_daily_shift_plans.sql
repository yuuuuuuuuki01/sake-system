-- 043_daily_shift_plans.sql
create table if not exists daily_shift_plans (
  id               uuid primary key default gen_random_uuid(),
  plan_date        date not null,
  department       text not null
    check (department in ('soumu','route_sales','brewing','bottling','labeling','delivery')),
  staff_member_ids uuid[] default '{}',
  notes            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now(),
  unique (plan_date, department)
);

create index if not exists idx_shift_plans_date on daily_shift_plans(plan_date);

alter table daily_shift_plans enable row level security;
create policy "shift_plans_all" on daily_shift_plans for all using (true) with check (true);
grant select, insert, update, delete on daily_shift_plans to anon, authenticated;
