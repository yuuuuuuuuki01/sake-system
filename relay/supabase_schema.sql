-- ============================================================================
-- Supabase 側テーブル定義 (Magic ISAM raw-preserve 受け取り用)
--
-- 方針:
--   - 既存テーブルとの衝突を避けるため、全テーブル名に sake_ プレフィクス
--   - レイアウト未確定のため、全ファイルを共通構造で保管
--   - primary key: (_source_file, _record_index)
--   - _raw_b64: レコードの生バイトを base64 保持 (layout 確定後にデコード可能)
--
-- 使い方: Supabase Dashboard → SQL Editor でこの SQL を実行。
-- ============================================================================

-- 1. テーブル作成 ------------------------------------------------------------
DO $$
DECLARE
    tbl text;
    target_tables text[] := ARRAY[
        'sake_trading_partners',          -- SKTRI.MST
        'sake_customers',                 -- SHTKI.MST
        'sake_delivery_destinations',     -- SHNOU.MST
        'sake_suppliers',                 -- H5TKI.MST
        'sake_products_sk',               -- SKSYO.MST
        'sake_products_k5',               -- K5SYO.MST
        'sake_products_h5',               -- H5SYO.MST
        'sake_products_sh',               -- SHSYO.MST
        'sake_special_prices_sh',         -- SHTAN.MST
        'sake_special_prices_h5',         -- H5TAN.MST
        'sake_sales_document_headers',    -- SHDEN.DAT
        'sake_purchase_document_headers', -- H5DEN.DAT
        'sake_sales_document_lines',      -- SHTOR.DAT
        'sake_purchase_document_lines',   -- H5TOR.DAT
        'sake_inventory_movements_sk',    -- SKIDO.DAT
        'sake_inventory_movements_k5',    -- K5IDO.DAT
        'sake_current_stock_sh',          -- sHZAI.DAT
        'sake_current_stock_h5',          -- H5ZAI.DAT
        'sake_current_stock_sk'           -- SKZAI.DAT
    ];
BEGIN
    FOREACH tbl IN ARRAY target_tables
    LOOP
        EXECUTE format($f$
            CREATE TABLE IF NOT EXISTS %I (
                _source_file        text        NOT NULL,
                _record_index       integer     NOT NULL,
                _record_size        integer,
                _raw_b64            text        NOT NULL,
                _source_path        text,
                _source_file_mtime  timestamptz,
                _synced_at          timestamptz NOT NULL DEFAULT now(),
                PRIMARY KEY (_source_file, _record_index)
            );
        $f$, tbl);

        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS %I ON %I (_synced_at);',
            tbl || '_synced_at_idx', tbl
        );
    END LOOP;
END
$$;

-- 2. RLS ポリシー: anon キーで INSERT / SELECT / UPDATE 許可 ------------------
-- 注意: 「誰でも書き込み可」の簡易設定。本番は service_role key か別経路推奨。
DO $$
DECLARE
    tbl text;
    target_tables text[] := ARRAY[
        'sake_trading_partners', 'sake_customers', 'sake_delivery_destinations',
        'sake_suppliers', 'sake_products_sk', 'sake_products_k5',
        'sake_products_h5', 'sake_products_sh', 'sake_special_prices_sh',
        'sake_special_prices_h5', 'sake_sales_document_headers',
        'sake_purchase_document_headers', 'sake_sales_document_lines',
        'sake_purchase_document_lines', 'sake_inventory_movements_sk',
        'sake_inventory_movements_k5', 'sake_current_stock_sh',
        'sake_current_stock_h5', 'sake_current_stock_sk'
    ];
BEGIN
    FOREACH tbl IN ARRAY target_tables
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', tbl);

        -- 既存 policy を一度削除してから作り直し（idempotent に）
        EXECUTE format(
            'DROP POLICY IF EXISTS %I ON %I;',
            tbl || '_allow_all', tbl
        );
        EXECUTE format($p$
            CREATE POLICY %I ON %I
            FOR ALL TO anon, authenticated
            USING (true) WITH CHECK (true);
        $p$, tbl || '_allow_all', tbl);
    END LOOP;
END
$$;
