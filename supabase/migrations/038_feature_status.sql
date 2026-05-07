-- =============================================================================
-- 038_feature_status.sql
--
-- 機能確認ステータス管理テーブル
-- HOME画面のNEWバッジ・連動ページのチェック管理に使用
-- =============================================================================

CREATE TABLE IF NOT EXISTS app_feature_status (
  feature_id   text PRIMARY KEY,
  confirmed_at timestamptz,
  confirmed_by text,
  notes        text,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON app_feature_status TO anon, authenticated;
