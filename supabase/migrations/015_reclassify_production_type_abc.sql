-- ABC分析 + 出動月数ベースで生産区分を再分類
-- 優先順位: 受注生産(月2以下) > 11月生産(冬季集中) > 月次(上位80%) > 年次(残り)

WITH stats AS (
  SELECT
    product_code,
    SUM(quantity)                                             AS total_qty,
    AVG(quantity)                                             AS avg_qty,
    STDDEV(quantity)                                          AS std_qty,
    CASE WHEN AVG(quantity) > 0
         THEN STDDEV(quantity) / AVG(quantity) ELSE 1 END    AS cv,
    COUNT(*) FILTER (
      WHERE year_month >= to_char(now() - interval '12 months','YYYY-MM')
    )                                                         AS months_active_12,
    CASE WHEN SUM(quantity) > 0
      THEN SUM(quantity) FILTER (
             WHERE EXTRACT(MONTH FROM (year_month || '-01')::date) IN (11,12,1)
           ) / SUM(quantity)
      ELSE 0
    END                                                       AS winter_ratio
  FROM product_monthly_sales
  GROUP BY product_code
),
abc AS (
  SELECT
    product_code,
    total_qty,
    avg_qty,
    cv,
    months_active_12,
    winter_ratio,
    SUM(total_qty) OVER (ORDER BY total_qty DESC
                         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
      / NULLIF(SUM(total_qty) OVER (), 0)  AS cumulative_ratio
  FROM stats
),
classified AS (
  SELECT
    product_code,
    CASE
      WHEN months_active_12 <= 2                    THEN 'make_to_order'
      WHEN winter_ratio >= 0.5 AND cv > 0.6         THEN 'november'
      WHEN cumulative_ratio <= 0.80                 THEN 'monthly'
      ELSE 'annual'
    END AS production_type
  FROM abc
)
UPDATE product_safety_stock_params p
SET production_type = c.production_type
FROM classified c
WHERE p.product_code = c.product_code;

-- production_plan も同期
UPDATE production_plan pp
SET production_type = sp.production_type
FROM product_safety_stock_params sp
WHERE pp.product_code = sp.product_code;
