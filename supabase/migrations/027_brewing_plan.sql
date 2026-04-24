-- Classification function
CREATE OR REPLACE FUNCTION classify_brewing_category(p_production_type text, p_name text)
RETURNS text LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_name ILIKE '%純米大吟醸%' THEN '純米大吟醸'
    WHEN p_name ILIKE '%大吟醸%' THEN '大吟醸'
    WHEN p_production_type ILIKE '純米吟醸%' OR p_name ILIKE '%純米吟醸%' THEN '純米吟醸'
    WHEN p_production_type ILIKE '純米酒%' OR (p_name ILIKE '%純米%' AND p_name NOT ILIKE '%吟醸%') THEN '純米'
    WHEN p_production_type ILIKE '吟醸%' OR p_name ILIKE '%吟醸%' THEN '本醸造'
    WHEN p_production_type ILIKE '本醸造%' OR p_name ILIKE '%本醸造%' OR p_name ILIKE '%原酒%' THEN '本醸造'
    WHEN p_production_type ILIKE 'その他(酒類)%' OR p_name ILIKE '%梅酒%' OR p_name ILIKE '%リキュール%' OR p_name ILIKE '%ザケ%' THEN 'リキュール'
    WHEN p_production_type ILIKE '普通酒%' THEN '普通酒'
    ELSE 'その他'
  END;
$$;

-- Brewing plan data RPC: fiscal year shipments by category
CREATE OR REPLACE FUNCTION get_brewing_plan_summary(p_fy_start date, p_fy_end date)
RETURNS TABLE(
  brew_category text,
  sub_category text,
  product_count int,
  total_shipment_qty numeric,
  total_shipment_ml numeric,
  monthly_avg_qty numeric,
  monthly_avg_ml numeric,
  current_stock_l numeric,
  months_remaining numeric
) LANGUAGE sql STABLE AS $$
  WITH categorized AS (
    SELECT
      classify_brewing_category(p.production_type_name, p.name) AS brew_cat,
      coalesce(p.production_type_name, 'その他') AS sub_cat,
      f.legacy_product_code,
      f.quantity,
      f.quantity * coalesce(p.volume_ml, 0) AS volume_ml,
      f.sales_date
    FROM daily_sales_fact f
    JOIN products p ON p.legacy_product_code = f.legacy_product_code
    WHERE f.sales_date >= p_fy_start AND f.sales_date <= p_fy_end
      AND p.production_type_name IS NOT NULL
      AND p.production_type_name NOT ILIKE 'セット品%'
      AND p.production_type_name NOT ILIKE 'その他(酒以外%'
  ),
  shipments AS (
    SELECT
      brew_cat,
      sub_cat,
      count(DISTINCT legacy_product_code) AS product_count,
      sum(quantity) AS total_qty,
      sum(volume_ml) AS total_ml
    FROM categorized
    GROUP BY brew_cat, sub_cat
  ),
  months_in_range AS (
    SELECT greatest(
      extract(year from age(p_fy_end, p_fy_start)) * 12
      + extract(month from age(p_fy_end, p_fy_start)) + 1,
      1
    ) AS months
  ),
  tank_stock AS (
    SELECT
      classify_brewing_category(p.production_type_name, p.name) AS brew_cat,
      sum(t.current_volume_l) AS stock_l
    FROM tanks t
    JOIN products p ON p.legacy_product_code = t.current_product_code
    WHERE t.status = 'in_use' AND t.current_volume_l > 0
    GROUP BY classify_brewing_category(p.production_type_name, p.name)
  )
  SELECT
    s.brew_cat,
    s.sub_cat,
    s.product_count::int,
    s.total_qty,
    s.total_ml,
    round(s.total_qty / m.months, 1) AS monthly_avg_qty,
    round(s.total_ml / m.months, 1) AS monthly_avg_ml,
    coalesce(ts.stock_l, 0) AS current_stock_l,
    CASE WHEN coalesce(round(s.total_ml / m.months, 1), 0) > 0
      THEN round(coalesce(ts.stock_l, 0) * 1000 / (s.total_ml / m.months), 1)
      ELSE 0 END AS months_remaining
  FROM shipments s
  CROSS JOIN months_in_range m
  LEFT JOIN tank_stock ts ON ts.brew_cat = s.brew_cat
  ORDER BY
    CASE s.brew_cat
      WHEN '純米大吟醸' THEN 1 WHEN '大吟醸' THEN 2 WHEN '純米吟醸' THEN 3 WHEN '純米' THEN 4
      WHEN '本醸造' THEN 5 WHEN '普通酒' THEN 6 WHEN 'リキュール' THEN 7
      ELSE 8
    END,
    s.total_ml DESC NULLS LAST;
$$;

-- Monthly trend by category for chart
CREATE OR REPLACE FUNCTION get_brewing_monthly_trend(p_fy_start date, p_fy_end date)
RETURNS TABLE(month text, brew_category text, shipment_ml numeric)
LANGUAGE sql STABLE AS $$
  SELECT
    to_char(f.sales_date, 'YYYY-MM') AS month,
    classify_brewing_category(p.production_type_name, p.name) AS brew_category,
    sum(f.quantity * coalesce(p.volume_ml, 0)) AS shipment_ml
  FROM daily_sales_fact f
  JOIN products p ON p.legacy_product_code = f.legacy_product_code
  WHERE f.sales_date >= p_fy_start AND f.sales_date <= p_fy_end
    AND p.production_type_name IS NOT NULL
    AND p.production_type_name NOT ILIKE 'セット品%'
    AND p.production_type_name NOT ILIKE 'その他(酒以外%'
  GROUP BY month, brew_category
  ORDER BY month, brew_category;
$$;
