-- =============================================================================
-- 038_invoice_entry_enhance.sql : 売上伝票入力画面の強化
-- =============================================================================

-- ── 1. sales_document_headers に納品日・登録者カラム追加 ──
alter table sales_document_headers
  add column if not exists delivery_date date,
  add column if not exists registered_by text;
