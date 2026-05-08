-- 044_staff_fixed_days_off.sql
-- 固定休み曜日: JS getDay() 準拠 (0=日, 1=月, 2=火, 3=水, 4=木, 5=金, 6=土)
alter table staff_members
  add column if not exists fixed_days_off smallint[] default '{}';

-- 部門長フラグ: 部門長がいる日だけ詰口・造り等が稼働する
alter table staff_members
  add column if not exists is_dept_leader boolean default false;
