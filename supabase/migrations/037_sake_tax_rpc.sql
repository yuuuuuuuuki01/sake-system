-- =============================================================================
-- 037_sake_tax_rpc.sql
--
-- 酒税計算RPC get_sake_tax_by_month(p_year int, p_month int)
-- 清酒: 100,000円/KL一律
-- リキュール: 度数≦10 → 100,000円/KL、度数>10 → 度数×10,000円/KL
-- 戻り(type:580/600/650)を別集計、輸出は0（後日対応）
-- =============================================================================

CREATE OR REPLACE FUNCTION get_sake_tax_by_month(p_year int, p_month int)
RETURNS TABLE (
  sake_type        text,
  alc_degree       numeric,
  volume_sale_l    numeric,
  volume_return_l  numeric,
  volume_export_l  numeric,
  volume_net_l     numeric,
  tax_rate_per_kl  numeric,
  tax_amount       numeric
)
LANGUAGE sql STABLE AS $$
  WITH raw AS (
    SELECT
      CASE
        WHEN p.category_code LIKE '001%' THEN '清酒'
        WHEN p.category_code LIKE '11%'  THEN 'リキュール'
        ELSE NULL
      END AS sake_type,
      CASE
        WHEN p.category_code LIKE '001%' THEN NULL
        ELSE p.alcohol_degree
      END AS alc_degree,
      CASE
        WHEN l.note LIKE '%type:580%'
          OR l.note LIKE '%type:600%'
          OR l.note LIKE '%type:650%'
        THEN 'return'
        ELSE 'sale'
      END AS tx_type,
      COALESCE(l.quantity, 0) * COALESCE(p.volume_ml, 0) / 1000.0 AS vol_l
    FROM sales_document_headers h
    JOIN sales_document_lines l ON l.sales_document_header_id = h.id
    LEFT JOIN products p ON p.legacy_product_code = l.legacy_product_code
    WHERE EXTRACT(YEAR  FROM h.sales_date) = p_year
      AND EXTRACT(MONTH FROM h.sales_date) = p_month
      AND COALESCE(l.quantity, 0)    > 0
      AND COALESCE(p.volume_ml, 0)   > 0
  ),
  agg AS (
    SELECT
      sake_type,
      alc_degree,
      ROUND(SUM(CASE WHEN tx_type = 'sale'   THEN vol_l ELSE 0 END), 3) AS volume_sale_l,
      ROUND(SUM(CASE WHEN tx_type = 'return' THEN vol_l ELSE 0 END), 3) AS volume_return_l
    FROM raw
    WHERE sake_type IS NOT NULL
    GROUP BY sake_type, alc_degree
  )
  SELECT
    sake_type,
    alc_degree,
    volume_sale_l,
    volume_return_l,
    0::numeric AS volume_export_l,
    ROUND(volume_sale_l - volume_return_l, 3) AS volume_net_l,
    CASE sake_type
      WHEN '清酒' THEN 100000::numeric
      WHEN 'リキュール' THEN
        CASE
          WHEN alc_degree IS NULL  THEN NULL
          WHEN alc_degree <= 10    THEN 100000::numeric
          ELSE alc_degree * 10000
        END
      ELSE NULL
    END AS tax_rate_per_kl,
    CASE sake_type
      WHEN '清酒' THEN
        ROUND((volume_sale_l - volume_return_l) / 1000.0 * 100000, 0)
      WHEN 'リキュール' THEN
        CASE
          WHEN alc_degree IS NULL THEN 0::numeric
          WHEN alc_degree <= 10   THEN ROUND((volume_sale_l - volume_return_l) / 1000.0 * 100000, 0)
          ELSE ROUND((volume_sale_l - volume_return_l) / 1000.0 * (alc_degree * 10000), 0)
        END
      ELSE 0::numeric
    END AS tax_amount
  FROM agg
  ORDER BY sake_type DESC, alc_degree NULLS LAST;
$$;

GRANT EXECUTE ON FUNCTION get_sake_tax_by_month(int, int) TO anon, authenticated;
