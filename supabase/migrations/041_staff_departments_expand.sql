-- 041_staff_departments_expand.sql
-- 詰口・貼場を分割、業務委託（配送）部門追加、越境・委託費フィールド追加

-- department check を拡張
alter table staff_members drop constraint if exists staff_members_department_check;
alter table staff_members add constraint staff_members_department_check
  check (department in ('soumu','route_sales','brewing','bottling','labeling','delivery'));

-- employment_type に contractor を追加
alter table staff_members drop constraint if exists staff_members_employment_type_check;
alter table staff_members add constraint staff_members_employment_type_check
  check (employment_type in ('employee','part_time','contractor'));

-- 兼務可能部門（越境）
alter table staff_members add column if not exists cross_departments text[] default '{}';

-- 業務委託月額費用
alter table staff_members add column if not exists contract_fee numeric;
