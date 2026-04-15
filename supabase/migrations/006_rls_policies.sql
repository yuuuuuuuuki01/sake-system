-- =============================================================================
-- 006_rls_policies.sql : Row Level Security（セキュリティポリシー）
-- 運用に応じて厳格化/緩和を選択
-- =============================================================================

-- 現段階はリレーエージェントからの書き込み + WebUIからの読み取りのため、
-- anonロールに読み書き許可（開発・初期運用）
-- 本番運用時には認証必須に切替推奨

-- マスタ系
alter table customers enable row level security;
alter table products enable row level security;
alter table suppliers enable row level security;
alter table staff enable row level security;
alter table alcohol_categories enable row level security;
alter table tax_categories enable row level security;

-- 販売系
alter table sales_document_headers enable row level security;
alter table sales_document_lines enable row level security;
alter table customer_payment_status enable row level security;
alter table customer_payments enable row level security;
alter table shipment_documents enable row level security;
alter table delivery_schedules enable row level security;
alter table invoices enable row level security;
alter table daily_sales_fact enable row level security;

-- 蔵内系
alter table brewing_batches enable row level security;
alter table brewing_operations enable row level security;
alter table tanks enable row level security;
alter table tank_temperature_logs enable row level security;
alter table tank_transfers enable row level security;
alter table kentei_records enable row level security;
alter table materials enable row level security;
alter table material_transactions enable row level security;
alter table raw_materials enable row level security;

-- 仕入・税務系
alter table purchase_document_headers enable row level security;
alter table purchase_document_lines enable row level security;
alter table supplier_payment_status enable row level security;
alter table supplier_payments enable row level security;
alter table bills_of_exchange enable row level security;
alter table tax_declarations enable row level security;
alter table tax_declaration_rows enable row level security;
alter table tax_deductions enable row level security;

-- 店舗・メール・ログ
alter table store_sales enable row level security;
alter table store_orders enable row level security;
alter table store_order_lines enable row level security;
alter table email_campaigns enable row level security;
alter table email_sends enable row level security;
alter table relay_sync_log enable row level security;
alter table relay_settings enable row level security;
alter table audit_logs enable row level security;

-- ヘルパー: 全テーブルにanon読み書き許可（開発モード）
-- ※ 本番時は「anonは読み取り専用、authenticatedに書き込み許可」に変更
do $$
declare
    table_name text;
    tables text[] := array[
        'customers','products','suppliers','staff','alcohol_categories','tax_categories',
        'sales_document_headers','sales_document_lines','customer_payment_status',
        'customer_payments','shipment_documents','delivery_schedules','invoices',
        'daily_sales_fact',
        'brewing_batches','brewing_operations','tanks','tank_temperature_logs',
        'tank_transfers','kentei_records','materials','material_transactions','raw_materials',
        'purchase_document_headers','purchase_document_lines','supplier_payment_status',
        'supplier_payments','bills_of_exchange','tax_declarations','tax_declaration_rows',
        'tax_deductions',
        'store_sales','store_orders','store_order_lines',
        'email_campaigns','email_sends','relay_sync_log','relay_settings','audit_logs'
    ];
begin
    foreach table_name in array tables loop
        execute format('drop policy if exists anon_read on %I', table_name);
        execute format('create policy anon_read on %I for select using (true)', table_name);
        execute format('drop policy if exists anon_write on %I', table_name);
        execute format('create policy anon_write on %I for insert with check (true)', table_name);
        execute format('drop policy if exists anon_update on %I', table_name);
        execute format('create policy anon_update on %I for update using (true) with check (true)', table_name);
    end loop;
end $$;

-- 本番切替用メモ:
-- 本番運用時は上記policyを削除し、以下のように変更:
-- create policy auth_read on customers for select to authenticated using (true);
-- create policy auth_write on customers for insert to authenticated with check (true);
-- anonロールはauth_keyなしでは何もできなくする
