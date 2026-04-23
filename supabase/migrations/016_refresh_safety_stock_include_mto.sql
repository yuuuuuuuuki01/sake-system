-- refresh_safety_stock_params() を刷新
-- 変更点:
--   1. 出動月数1〜2の商品も make_to_order として取り込む（従来は count>=3 で除外）
--   2. ABC累積比率+季節性でINSERT時に production_type を自動設定
--   3. production_type はON CONFLICTのUPDATEに含めない（手動変更を保持）

CREATE OR REPLACE FUNCTION refresh_safety_stock_params()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cutoff text := to_char(date_trunc('month', now()) - interval '12 months', 'YYYY-MM');
BEGIN
  WITH all_stats AS (
    SELECT
      product_code,
      MAX(product_name)                                         AS product_name,
      COUNT(*)                                                  AS months_active,
      SUM(quantity)                                             AS total_qty,
      AVG(quantity)                                             AS avg_qty,
      STDDEV_POP(quantity)                                      AS std_qty,
      CASE WHEN AVG(quantity) > 0
           THEN STDDEV_POP(quantity) / AVG(quantity) ELSE 1
      END                                                       AS cv,
      COALESCE(
        SUM(quantity) FILTER (
          WHERE EXTRACT(MONTH FROM (year_month || '-01')::date) IN (11,12,1)
        ) / NULLIF(SUM(quantity), 0),
        0
      )                                                         AS winter_ratio
    FROM product_monthly_sales
    WHERE year_month >= cutoff
      AND quantity > 0
    GROUP BY product_code
  ),
  abc AS (
    SELECT *,
      SUM(total_qty) OVER (
        ORDER BY total_qty DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
      ) / NULLIF(SUM(total_qty) OVER (), 0)  AS cumulative_ratio
    FROM all_stats
  ),
  classified AS (
    SELECT *,
      CASE
        WHEN months_active <= 2                        THEN 'make_to_order'
        WHEN winter_ratio >= 0.5 AND cv > 0.6          THEN 'november'
        WHEN cumulative_ratio <= 0.80                  THEN 'monthly'
        ELSE 'annual'
      END AS auto_production_type
    FROM abc
  )
  INSERT INTO product_safety_stock_params
    (product_code, product_name, unit,
     avg_monthly_demand, demand_std_dev,
     lead_time_days, service_level,
     safety_stock_qty, reorder_point,
     last_calc_at, updated_at,
     production_type)
  SELECT
    product_code,
    product_name,
    '本'                                                          AS unit,
    CASE WHEN months_active >= 3 THEN ROUND(avg_qty::numeric, 2) ELSE 0 END
                                                                  AS avg_monthly_demand,
    CASE WHEN months_active >= 3 THEN ROUND(std_qty::numeric, 2) ELSE 0 END
                                                                  AS demand_std_dev,
    30                                                            AS lead_time_days,
    0.95                                                          AS service_level,
    CASE WHEN months_active >= 3
         THEN ROUND(1.65 * std_qty::numeric, 2) ELSE 0 END        AS safety_stock_qty,
    CASE WHEN months_active >= 3
         THEN ROUND(avg_qty::numeric + 1.65 * std_qty::numeric, 2) ELSE 0 END
                                                                  AS reorder_point,
    now()                                                         AS last_calc_at,
    now()                                                         AS updated_at,
    auto_production_type                                          AS production_type
  FROM classified
  ON CONFLICT (product_code) DO UPDATE SET
    product_name       = EXCLUDED.product_name,
    avg_monthly_demand = EXCLUDED.avg_monthly_demand,
    demand_std_dev     = EXCLUDED.demand_std_dev,
    safety_stock_qty   = EXCLUDED.safety_stock_qty,
    reorder_point      = EXCLUDED.reorder_point,
    last_calc_at       = EXCLUDED.last_calc_at,
    updated_at         = now()
    -- production_type は手動変更を保持するため UPDATE では触らない
  ;
END;
$$;
