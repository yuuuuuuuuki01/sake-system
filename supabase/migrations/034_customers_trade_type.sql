-- 取引先区分（B2B / B2B2C / B2C）を customers テーブルに追加
-- B2B    : 卸取引        → 価格区分 002（卸価格）
-- B2B2C  : 生産者向け取引 → 価格区分 000（生産者価格）
-- B2C    : 小売・直販    → 価格区分 001（小売価格）

ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS trade_type text
  CHECK (trade_type IN ('B2B', 'B2B2C', 'B2C') OR trade_type IS NULL);

COMMENT ON COLUMN customers.trade_type IS
  'B2B=卸(002価格), B2B2C=生産者向け(000価格), B2C=小売・直販(001価格)';

CREATE INDEX IF NOT EXISTS idx_customers_trade_type ON customers(trade_type);
