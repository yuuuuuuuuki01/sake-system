-- 042_staff_shift_monthly_tasks.sql
alter table staff_members
  add column if not exists shift_preference text
    check (shift_preference in ('morning','afternoon','both')),
  add column if not exists monthly_tasks text[] default '{}';
