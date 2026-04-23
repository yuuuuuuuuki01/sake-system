-- production_plan に production_type 列を追加
-- refresh_product_monthly_sales() の対象期間を 36 → 60 ヶ月に拡張

ALTER TABLE production_plan
  ADD COLUMN IF NOT EXISTS production_type text NOT NULL DEFAULT 'monthly';

CREATE OR REPLACE FUNCTION refresh_product_monthly_sales()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM product_monthly_sales
  WHERE year_month >= to_char(now() - interval '60 months', 'YYYY-MM');

  INSERT INTO product_monthly_sales (year_month, product_code, product_name, quantity, amount, document_count)
  SELECT
    to_char(sale_date, 'YYYY-MM')        AS year_month,
    product_code,
    MIN(product_name)                    AS product_name,
    SUM(quantity)                        AS quantity,
    SUM(amount)                          AS amount,
    COUNT(DISTINCT slip_number)          AS document_count
  FROM daily_sales_fact
  WHERE sale_date >= (date_trunc('month', now()) - interval '60 months')
    AND sale_type IN ('normal', 'return')
  GROUP BY to_char(sale_date, 'YYYY-MM'), product_code
  ON CONFLICT (year_month, product_code) DO UPDATE
    SET product_name   = EXCLUDED.product_name,
        quantity       = EXCLUDED.quantity,
        amount         = EXCLUDED.amount,
        document_count = EXCLUDED.document_count,
        updated_at     = now();
END;
$$;
