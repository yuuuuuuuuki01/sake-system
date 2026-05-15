-- 047_staff_weekly_day_limits.sql
-- 期間別出勤日数上限: 冬季に休みを取れていないスタッフの年間調整用
-- JSON形式: { "6": 3, "7": 3 } = 6月は週3日まで、7月は週3日まで
-- 空 or null = 制限なし（通常通り出勤可能日すべて割当対象）
alter table staff_members
  add column if not exists weekly_day_limits jsonb default null;

comment on column staff_members.weekly_day_limits is
  '月別の週あたり最大出勤日数。例: {"6":3,"7":3} = 6月・7月は週3日まで。nullなら制限なし。';
