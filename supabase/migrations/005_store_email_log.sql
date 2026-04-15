-- =============================================================================
-- 005_store_email_log.sql : 店舗POS / メール配信 / 同期ログ
-- 対応する酒仙iファイル:
--   ST系 (店舗POS)
-- =============================================================================

-- 店舗売上（直売所POS）
create table if not exists store_sales (
    id uuid primary key default gen_random_uuid(),
    sale_date date not null,
    sale_time time,
    product_code text references products(legacy_product_code),
    product_name text,
    quantity numeric(12,2) default 1,
    unit_price bigint default 0,
    amount bigint not null,
    payment_method text,  -- cash/card/paypay/other
    staff_code text,
    customer_code text,  -- 会員等の紐付け（任意）
    receipt_no text,
    tax_amount bigint default 0,
    remarks text,
    created_at timestamptz default now()
);

create index if not exists idx_store_sales_date on store_sales(sale_date desc);
create index if not exists idx_store_sales_product on store_sales(product_code);

-- 通販・受注
create table if not exists store_orders (
    id uuid primary key default gen_random_uuid(),
    order_no text unique not null,
    order_date date not null,
    channel text default 'online',  -- online/phone/walk_in/fax
    customer_name text not null,
    customer_email text,
    customer_phone text,
    postal_code text,
    shipping_address text,
    gift_flag boolean default false,
    noshi_type text,  -- 熨斗区分
    wrapping_type text,
    total_amount bigint default 0,
    shipping_cost bigint default 0,
    status text default 'new',  -- new/processing/shipped/delivered/cancelled
    shipping_date date,
    tracking_no text,
    remarks text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_orders_date on store_orders(order_date desc);
create index if not exists idx_orders_status on store_orders(status);

-- 受注明細
create table if not exists store_order_lines (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references store_orders(id) on delete cascade,
    line_no smallint default 0,
    product_code text references products(legacy_product_code),
    product_name text,
    quantity numeric(12,2) default 1,
    unit_price bigint default 0,
    amount bigint default 0,
    remarks text
);

-- =============================================================================
-- メール配信
-- =============================================================================

-- メールキャンペーン
create table if not exists email_campaigns (
    id uuid primary key default gen_random_uuid(),
    campaign_name text,
    subject text not null,
    body text not null,
    template_key text,  -- spring/summer/autumn/winter/custom
    audience_mode text default 'all',  -- all/area/history
    audience_filter jsonb,  -- 絞り込み条件
    recipient_count integer default 0,
    sent_count integer default 0,
    failed_count integer default 0,
    status text default 'draft',  -- draft/scheduled/sent/failed
    scheduled_at timestamptz,
    sent_at timestamptz,
    created_by text,
    created_at timestamptz default now()
);

-- 送信履歴
create table if not exists email_sends (
    id uuid primary key default gen_random_uuid(),
    campaign_id uuid references email_campaigns(id) on delete cascade,
    customer_code text references customers(legacy_customer_code),
    to_email text not null,
    status text default 'pending',  -- pending/sent/failed
    resend_message_id text,  -- Resend APIのID
    error_message text,
    sent_at timestamptz,
    opened_at timestamptz,
    clicked_at timestamptz,
    created_at timestamptz default now()
);

create index if not exists idx_sends_campaign on email_sends(campaign_id);

-- =============================================================================
-- リレー同期ログ
-- =============================================================================

-- リレーエージェント実行ログ
create table if not exists relay_sync_log (
    id uuid primary key default gen_random_uuid(),
    sync_started_at timestamptz not null,
    sync_ended_at timestamptz,
    status text default 'running',  -- running/success/failed/partial
    modules_synced text[],
    files_scanned integer default 0,
    files_updated integer default 0,
    rows_upserted integer default 0,
    errors jsonb,
    agent_version text,
    agent_hostname text,
    log_text text,
    created_at timestamptz default now()
);

create index if not exists idx_relay_log_started on relay_sync_log(sync_started_at desc);

-- リレー設定（WebUIから変更可能な動的設定）
create table if not exists relay_settings (
    id uuid primary key default gen_random_uuid(),
    key text unique not null,
    value jsonb,
    description text,
    updated_at timestamptz default now(),
    updated_by text
);

-- 初期設定
insert into relay_settings (key, value, description) values
('sync_interval_minutes', '5', '同期間隔（分）'),
('sync_modules', '["sk","sh","k5","h5"]', '同期対象モジュール'),
('log_level', '"INFO"', 'ログレベル')
on conflict (key) do nothing;

-- 操作ログ（監査用）
create table if not exists audit_logs (
    id uuid primary key default gen_random_uuid(),
    action text not null,
    entity_type text,
    entity_id text,
    user_email text,
    changes jsonb,
    ip_address inet,
    user_agent text,
    created_at timestamptz default now()
);

create index if not exists idx_audit_entity on audit_logs(entity_type, entity_id);
create index if not exists idx_audit_user on audit_logs(user_email);
