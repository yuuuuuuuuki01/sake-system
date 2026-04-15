import type { Insertable } from "kysely";

import type {
  Customer,
  PaymentReceipt,
  Product,
  SalesDocumentHeader,
  SalesDocumentLine
} from "../domain/types.js";
import { db } from "./client.js";
import type {
  CustomersTable,
  PaymentReceiptsTable,
  ProductsTable,
  SalesDocumentHeadersTable,
  SalesDocumentLinesTable
} from "./schema.js";

function nowIso(): string {
  return new Date().toISOString();
}

function mapCustomer(row: Customer): Insertable<CustomersTable> {
  return {
    id: row.id,
    legacy_customer_code: row.legacyCustomerCode,
    legacy_customer_subcode: null,
    name: row.name,
    billing_name: row.billingName ?? null,
    phone: null,
    fax: null,
    postal_code: null,
    address1: null,
    address2: null,
    closing_day: row.closingDay ?? null,
    payment_day: row.paymentDay ?? null,
    billing_cycle_type: null,
    is_active: row.isActive,
    source_updated_at: row.sourceUpdatedAt ?? null,
    synced_at: nowIso()
  };
}

function mapProduct(row: Product): Insertable<ProductsTable> {
  return {
    id: row.id,
    legacy_product_code: row.legacyProductCode,
    legacy_product_subcode: null,
    name: row.name,
    kana_name: null,
    spec: null,
    unit_name: null,
    category_code: null,
    jan_code: row.janCode ?? null,
    tax_code: row.taxCode ?? null,
    is_active: row.isActive,
    source_updated_at: row.sourceUpdatedAt ?? null,
    synced_at: nowIso()
  };
}

function mapSalesHeader(row: SalesDocumentHeader): Insertable<SalesDocumentHeadersTable> {
  return {
    id: row.id,
    legacy_document_no: row.legacyDocumentNo,
    legacy_customer_code: row.legacyCustomerCode,
    sales_date: row.salesDate ?? null,
    posting_date: null,
    staff_code: row.staffCode ?? null,
    department_code: null,
    document_type: null,
    status: row.status ?? null,
    subtotal_amount: null,
    tax_amount: row.taxAmount ?? null,
    total_amount: row.totalAmount ?? null,
    source_updated_at: row.sourceUpdatedAt ?? null,
    synced_at: nowIso()
  };
}

function mapSalesLine(row: SalesDocumentLine): Insertable<SalesDocumentLinesTable> {
  return {
    id: row.id,
    sales_document_header_id: null,
    legacy_document_no: row.legacyDocumentNo,
    line_no: row.lineNo,
    legacy_product_code: row.legacyProductCode ?? null,
    quantity: row.quantity ?? null,
    unit_price: row.unitPrice ?? null,
    line_amount: row.lineAmount ?? null,
    tax_amount: null,
    warehouse_code: null,
    note: null,
    source_updated_at: row.sourceUpdatedAt ?? null,
    synced_at: nowIso()
  };
}

function mapPaymentReceipt(row: PaymentReceipt): Insertable<PaymentReceiptsTable> {
  return {
    id: row.id,
    legacy_payment_no: row.legacyPaymentNo,
    legacy_customer_code: row.legacyCustomerCode,
    payment_date: row.paymentDate ?? null,
    payment_method: row.paymentMethod ?? null,
    payment_amount: row.paymentAmount ?? null,
    reference_document_no: null,
    note: null,
    source_updated_at: row.sourceUpdatedAt ?? null,
    synced_at: nowIso()
  };
}

export async function upsertCustomers(rows: Customer[]): Promise<void> {
  if (rows.length === 0) {
    return;
  }

  await db
    .insertInto("customers")
    .values(rows.map(mapCustomer))
    .onConflict((oc) =>
      oc.column("legacy_customer_code").doUpdateSet((eb) => ({
        id: eb.ref("excluded.id"),
        legacy_customer_subcode: eb.ref("excluded.legacy_customer_subcode"),
        name: eb.ref("excluded.name"),
        billing_name: eb.ref("excluded.billing_name"),
        phone: eb.ref("excluded.phone"),
        fax: eb.ref("excluded.fax"),
        postal_code: eb.ref("excluded.postal_code"),
        address1: eb.ref("excluded.address1"),
        address2: eb.ref("excluded.address2"),
        closing_day: eb.ref("excluded.closing_day"),
        payment_day: eb.ref("excluded.payment_day"),
        billing_cycle_type: eb.ref("excluded.billing_cycle_type"),
        is_active: eb.ref("excluded.is_active"),
        source_updated_at: eb.ref("excluded.source_updated_at"),
        synced_at: eb.ref("excluded.synced_at")
      }))
    )
    .execute();
}

export async function upsertProducts(rows: Product[]): Promise<void> {
  if (rows.length === 0) {
    return;
  }

  await db
    .insertInto("products")
    .values(rows.map(mapProduct))
    .onConflict((oc) =>
      oc.column("legacy_product_code").doUpdateSet((eb) => ({
        id: eb.ref("excluded.id"),
        legacy_product_subcode: eb.ref("excluded.legacy_product_subcode"),
        name: eb.ref("excluded.name"),
        kana_name: eb.ref("excluded.kana_name"),
        spec: eb.ref("excluded.spec"),
        unit_name: eb.ref("excluded.unit_name"),
        category_code: eb.ref("excluded.category_code"),
        jan_code: eb.ref("excluded.jan_code"),
        tax_code: eb.ref("excluded.tax_code"),
        is_active: eb.ref("excluded.is_active"),
        source_updated_at: eb.ref("excluded.source_updated_at"),
        synced_at: eb.ref("excluded.synced_at")
      }))
    )
    .execute();
}

export async function upsertSalesHeaders(rows: SalesDocumentHeader[]): Promise<void> {
  if (rows.length === 0) {
    return;
  }

  await db
    .insertInto("sales_document_headers")
    .values(rows.map(mapSalesHeader))
    .onConflict((oc) =>
      oc.column("legacy_document_no").doUpdateSet((eb) => ({
        id: eb.ref("excluded.id"),
        legacy_customer_code: eb.ref("excluded.legacy_customer_code"),
        sales_date: eb.ref("excluded.sales_date"),
        posting_date: eb.ref("excluded.posting_date"),
        staff_code: eb.ref("excluded.staff_code"),
        department_code: eb.ref("excluded.department_code"),
        document_type: eb.ref("excluded.document_type"),
        status: eb.ref("excluded.status"),
        subtotal_amount: eb.ref("excluded.subtotal_amount"),
        tax_amount: eb.ref("excluded.tax_amount"),
        total_amount: eb.ref("excluded.total_amount"),
        source_updated_at: eb.ref("excluded.source_updated_at"),
        synced_at: eb.ref("excluded.synced_at")
      }))
    )
    .execute();
}

export async function upsertSalesLines(rows: SalesDocumentLine[]): Promise<void> {
  if (rows.length === 0) {
    return;
  }

  await db
    .insertInto("sales_document_lines")
    .values(rows.map(mapSalesLine))
    .onConflict((oc) =>
      oc.columns(["legacy_document_no", "line_no"]).doUpdateSet((eb) => ({
        id: eb.ref("excluded.id"),
        sales_document_header_id: eb.ref("excluded.sales_document_header_id"),
        legacy_product_code: eb.ref("excluded.legacy_product_code"),
        quantity: eb.ref("excluded.quantity"),
        unit_price: eb.ref("excluded.unit_price"),
        line_amount: eb.ref("excluded.line_amount"),
        tax_amount: eb.ref("excluded.tax_amount"),
        warehouse_code: eb.ref("excluded.warehouse_code"),
        note: eb.ref("excluded.note"),
        source_updated_at: eb.ref("excluded.source_updated_at"),
        synced_at: eb.ref("excluded.synced_at")
      }))
    )
    .execute();
}

export async function upsertPaymentReceipts(rows: PaymentReceipt[]): Promise<void> {
  if (rows.length === 0) {
    return;
  }

  await db
    .insertInto("payment_receipts")
    .values(rows.map(mapPaymentReceipt))
    .onConflict((oc) =>
      oc.column("legacy_payment_no").doUpdateSet((eb) => ({
        id: eb.ref("excluded.id"),
        legacy_customer_code: eb.ref("excluded.legacy_customer_code"),
        payment_date: eb.ref("excluded.payment_date"),
        payment_method: eb.ref("excluded.payment_method"),
        payment_amount: eb.ref("excluded.payment_amount"),
        reference_document_no: eb.ref("excluded.reference_document_no"),
        note: eb.ref("excluded.note"),
        source_updated_at: eb.ref("excluded.source_updated_at"),
        synced_at: eb.ref("excluded.synced_at")
      }))
    )
    .execute();
}
