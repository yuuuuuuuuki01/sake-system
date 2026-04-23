-- product_safety_stock_params に production_type 列を追加
-- 過去データのパターンから自動分類（初期値）

ALTER TABLE product_safety_stock_params
  ADD COLUMN IF NOT EXISTS production_type text NOT NULL DEFAULT 'monthly';

-- product_monthly_sales からパターン指標を計算して分類
WITH stats AS (
  SELECT
    product_code,
    AVG(quantity)                                           AS avg_qty,
    STDDEV(quantity)                                        AS std_qty,
    CASE WHEN AVG(quantity) > 0
         THEN STDDEV(quantity) / AVG(quantity) ELSE 1 END  AS cv,
    COUNT(*) FILTER (
      WHERE year_month >= to_char(now() - interval '12 months','YYYY-MM')
    )                                                       AS months_active_12,
    CASE WHEN SUM(quantity) > 0
      THEN SUM(quantity) FILTER (
             WHERE EXTRACT(MONTH FROM (year_month || '-01')::date) IN (11,12,1)
           ) / SUM(quantity)
      ELSE 0
    END                                                     AS winter_ratio
  FROM product_monthly_sales
  GROUP BY product_code
),
classified AS (
  SELECT
    product_code,
    CASE
      WHEN avg_qty < 10 OR months_active_12 <= 2   THEN 'make_to_order'
      WHEN winter_ratio >= 0.5 AND cv > 0.6        THEN 'november'
      WHEN months_active_12 <= 4                   THEN 'annual'
      ELSE 'monthly'
    END AS production_type
  FROM stats
)
UPDATE product_safety_stock_params p
SET production_type = c.production_type
FROM classified c
WHERE p.product_code = c.product_code;

-- 既存の production_plan 行も同期
UPDATE production_plan pp
SET production_type = sp.production_type
FROM product_safety_stock_params sp
WHERE pp.product_code = sp.product_code;
