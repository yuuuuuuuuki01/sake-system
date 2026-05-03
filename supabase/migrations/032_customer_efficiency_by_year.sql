CREATE OR REPLACE FUNCTION get_customer_efficiency(p_fiscal_year int DEFAULT NULL, p_group_by text DEFAULT 'billing')
RETURNS TABLE(
  legacy_customer_code text,
  customer_name text,
  address1 text,
  year_amount numeric,
  share_pct numeric,
  order_days int,
  prev_amount numeric,
  growth_rate numeric,
  current_rank text,
  prev_rank text
) LANGUAGE sql STABLE AS $$
WITH
  yr AS (
    SELECT COALESCE(p_fiscal_year,
      CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE)::int >= 4
           THEN EXTRACT(YEAR FROM CURRENT_DATE)::int
           ELSE EXTRACT(YEAR FROM CURRENT_DATE)::int - 1 END
    ) AS v
  ),
  dates AS (
    SELECT
      make_date(v, 4, 1)      AS y_start,
      make_date(v+1, 3, 31)   AS y_end,
      make_date(v-1, 4, 1)    AS p_start,
      make_date(v, 3, 31)     AS p_end
    FROM yr
  ),
  base AS (
    SELECT
      CASE
        WHEN p_group_by = 'billing'
          THEN COALESCE(NULLIF(c.billing_code,''), dsf.legacy_customer_code)
        ELSE dsf.legacy_customer_code
      END AS eff_code,
      SUM(CASE WHEN dsf.sales_date BETWEEN d.y_start AND d.y_end THEN dsf.sales_amount ELSE 0 END) AS year_amount,
      COUNT(DISTINCT CASE WHEN dsf.sales_date BETWEEN d.y_start AND d.y_end THEN dsf.sales_date ELSE NULL END)::int AS order_days,
      SUM(CASE WHEN dsf.sales_date BETWEEN d.p_start AND d.p_end THEN dsf.sales_amount ELSE 0 END) AS prev_amount
    FROM daily_sales_fact dsf
    LEFT JOIN customers c ON c.legacy_customer_code = dsf.legacy_customer_code
    CROSS JOIN dates d
    WHERE dsf.legacy_customer_code IS NOT NULL
    GROUP BY 1
    HAVING SUM(CASE WHEN dsf.sales_date BETWEEN d.y_start AND d.y_end THEN dsf.sales_amount ELSE 0 END) > 0
  ),
  ranked AS (
    SELECT
      eff_code, year_amount, order_days, prev_amount,
      SUM(year_amount) OVER () AS total_year,
      SUM(year_amount) OVER (ORDER BY year_amount DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative,
      ROUND(year_amount * 100.0 / NULLIF(SUM(year_amount) OVER (), 0), 2) AS share_pct
    FROM base
  ),
  prev_ranked AS (
    SELECT eff_code,
      SUM(prev_amount) OVER () AS prev_total,
      SUM(prev_amount) OVER (ORDER BY prev_amount DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS prev_cumulative,
      prev_amount
    FROM base WHERE prev_amount > 0
  )
SELECT
  r.eff_code,
  COALESCE(bc.name, r.eff_code),
  bc.address1,
  r.year_amount,
  r.share_pct,
  r.order_days,
  r.prev_amount,
  CASE WHEN r.prev_amount > 0 THEN ROUND((r.year_amount - r.prev_amount) / r.prev_amount * 100, 1) ELSE NULL END,
  CASE WHEN r.cumulative <= r.total_year * 0.7 THEN 'A'
       WHEN r.cumulative <= r.total_year * 0.9 THEN 'B'
       ELSE 'C' END,
  CASE WHEN pr.prev_cumulative IS NOT NULL AND pr.prev_cumulative <= pr.prev_total * 0.7 THEN 'A'
       WHEN pr.prev_cumulative IS NOT NULL AND pr.prev_cumulative <= pr.prev_total * 0.9 THEN 'B'
       WHEN pr.prev_amount > 0 THEN 'C'
       ELSE '' END
FROM ranked r
LEFT JOIN prev_ranked pr ON pr.eff_code = r.eff_code
LEFT JOIN customers bc ON bc.legacy_customer_code = r.eff_code
ORDER BY r.year_amount DESC;
$$;
