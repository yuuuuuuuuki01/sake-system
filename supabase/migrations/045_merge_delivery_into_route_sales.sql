-- 045_merge_delivery_into_route_sales.sql
-- delivery 部門を route_sales に統合し、名称を「配送」に統一
-- route_sales が配送業務全般（ルートセールス＋委託配送）を包含する

-- 1. staff_members: delivery → route_sales に移行
update staff_members
  set department = 'route_sales', updated_at = now()
  where department = 'delivery';

-- cross_departments からも delivery → route_sales に置換
update staff_members
  set cross_departments = array_replace(cross_departments, 'delivery', 'route_sales'),
      updated_at = now()
  where 'delivery' = any(cross_departments);

-- cross_departments の重複除去（route_sales が2つ入る可能性）
update staff_members
  set cross_departments = (
    select array_agg(distinct val)
    from unnest(cross_departments) as val
  ),
  updated_at = now()
  where array_length(cross_departments, 1) > 0;

-- 2. daily_shift_plans: delivery → route_sales に移行
update daily_shift_plans
  set department = 'route_sales', updated_at = now()
  where department = 'delivery';

-- 3. CHECK制約を更新（delivery を除外）
alter table staff_members drop constraint if exists staff_members_department_check;
alter table staff_members add constraint staff_members_department_check
  check (department in ('soumu','route_sales','brewing','bottling','labeling'));

alter table daily_shift_plans drop constraint if exists daily_shift_plans_department_check;
alter table daily_shift_plans add constraint daily_shift_plans_department_check
  check (department in ('soumu','route_sales','brewing','bottling','labeling'));
