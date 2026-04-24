-- =============================================================================
-- 024_analytics_yoy_volume.sql
--
-- 分析全体に前年比較 + 移出量(ml) + 本数を追加。
-- 全RPC・MVの戻り値に volume_ml を追加。
-- チャートデータに quantity/volume_ml を追加。
-- 前年比較はフロントエンドで同RPCを前年フィルタで2回呼んで算出。
-- =============================================================================

-- (内容は apply_migration で既に適用済み — ファイルは記録用)

-- get_period_chart_data → +quantity, +volume_ml
-- get_product_totals_by_period → +volume_ml
-- get_customer_totals_by_period → +volume_ml (products JOIN追加)
-- get_customer_product_breakdown → +volume_ml
-- get_product_customer_breakdown → +volume_ml
-- get_entity_monthly_sales → +quantity, +volume_ml
-- mv_product_sales_totals → 再作成 +volume_ml
-- mv_customer_sales_totals → 再作成 +volume_ml (products JOIN追加)
