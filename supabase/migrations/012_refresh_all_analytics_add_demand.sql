-- refresh_all_analytics() に需要計画系RPCを追加
-- product_monthly_sales と product_safety_stock_params を daily_sales_fact 再集計後に更新する

CREATE OR REPLACE FUNCTION refresh_all_analytics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM refresh_daily_sales_fact();
  PERFORM refresh_product_monthly_sales();
  PERFORM refresh_safety_stock_params();
END;
$$;
