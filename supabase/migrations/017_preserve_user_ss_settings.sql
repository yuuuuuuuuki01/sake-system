-- refresh_safety_stock_params() を再修正:
-- service_level / lead_time_days をユーザー設定値として保持（上書きしない）
-- safety_stock_qty / reorder_point は保存済みの service_level / lead_time_days で再計算

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
    product_code, product_name, '本',
    CASE WHEN months_active >= 3 THEN ROUND(avg_qty::numeric, 2) ELSE 0 END,
    CASE WHEN months_active >= 3 THEN ROUND(std_qty::numeric, 2) ELSE 0 END,
    30, 0.95,
    CASE WHEN months_active >= 3 THEN ROUND(1.65 * std_qty::numeric, 2) ELSE 0 END,
    CASE WHEN months_active >= 3
         THEN ROUND(avg_qty::numeric + 1.65 * std_qty::numeric, 2) ELSE 0 END,
    now(), now(),
    auto_production_type
  FROM classified
  ON CONFLICT (product_code) DO UPDATE SET
    product_name       = EXCLUDED.product_name,
    avg_monthly_demand = EXCLUDED.avg_monthly_demand,
    demand_std_dev     = EXCLUDED.demand_std_dev,
    safety_stock_qty   = ROUND(
      (SELECT CASE
        WHEN product_safety_stock_params.service_level >= 0.99 THEN 2.33
        WHEN product_safety_stock_params.service_level >= 0.97 THEN 1.88
        WHEN product_safety_stock_params.service_level >= 0.95 THEN 1.65
        WHEN product_safety_stock_params.service_level >= 0.90 THEN 1.28
        ELSE 1.04 END
      ) * EXCLUDED.demand_std_dev
        * SQRT(product_safety_stock_params.lead_time_days::numeric / 30), 2),
    reorder_point      = ROUND(
      EXCLUDED.avg_monthly_demand
        * (product_safety_stock_params.lead_time_days::numeric / 30)
      + (SELECT CASE
          WHEN product_safety_stock_params.service_level >= 0.99 THEN 2.33
          WHEN product_safety_stock_params.service_level >= 0.97 THEN 1.88
          WHEN product_safety_stock_params.service_level >= 0.95 THEN 1.65
          WHEN product_safety_stock_params.service_level >= 0.90 THEN 1.28
          ELSE 1.04 END
        ) * EXCLUDED.demand_std_dev
          * SQRT(product_safety_stock_params.lead_time_days::numeric / 30), 2),
    last_calc_at       = EXCLUDED.last_calc_at,
    updated_at         = now()
    -- service_level / lead_time_days / production_type はユーザー設定を保持
  ;
END;
$$;
