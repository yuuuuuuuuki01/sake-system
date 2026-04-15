import { z } from "zod";

import type {
  Customer,
  PaymentReceipt,
  Product,
  SalesDocumentHeader,
  SalesDocumentLine,
} from "../domain/types.js";
import type { FileIngestionCandidate } from "../jobs/job-types.js";

const positiveNumber = z.number().positive();
const nonNegativeNumber = z.number().min(0);
const dayOfMonth = z.number().int().min(1).max(31);
const isoDateString = z
  .string()
  .refine(
    (value) =>
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      !Number.isNaN(Date.parse(`${value}T00:00:00Z`)),
    { message: "must be an ISO8601 date string (YYYY-MM-DD)" },
  );

export const CustomerSchema: z.ZodType<Customer> = z.object({
  id: z.string(),
  legacyCustomerCode: z.string().trim().min(1),
  name: z.string(),
  billingName: z.string().optional(),
  closingDay: dayOfMonth.optional(),
  paymentDay: dayOfMonth.optional(),
  isActive: z.boolean(),
  sourceUpdatedAt: z.string().optional(),
});

export const ProductSchema: z.ZodType<Product> = z.object({
  id: z.string(),
  legacyProductCode: z.string(),
  name: z.string(),
  janCode: z.string().regex(/^\d{13}$/).optional(),
  taxCode: z.string().optional(),
  isActive: z.boolean(),
  sourceUpdatedAt: z.string().optional(),
});

export const SalesHeaderSchema: z.ZodType<SalesDocumentHeader> = z.object({
  id: z.string(),
  legacyDocumentNo: z.string(),
  legacyCustomerCode: z.string(),
  salesDate: isoDateString.optional(),
  totalAmount: positiveNumber.optional(),
  taxAmount: z.number().optional(),
  staffCode: z.string().optional(),
  status: z.string().optional(),
  sourceUpdatedAt: z.string().optional(),
});

export const SalesLineSchema: z.ZodType<SalesDocumentLine> = z.object({
  id: z.string(),
  legacyDocumentNo: z.string(),
  lineNo: z.number().int().min(1),
  legacyProductCode: z.string().optional(),
  quantity: nonNegativeNumber.optional(),
  unitPrice: nonNegativeNumber.optional(),
  lineAmount: z.number().optional(),
  sourceUpdatedAt: z.string().optional(),
});

export const PaymentReceiptSchema: z.ZodType<PaymentReceipt> = z.object({
  id: z.string(),
  legacyPaymentNo: z.string(),
  legacyCustomerCode: z.string(),
  paymentDate: z.string().optional(),
  paymentAmount: positiveNumber.optional(),
  paymentMethod: z.string().optional(),
  sourceUpdatedAt: z.string().optional(),
});

export const FileIngestionCandidateSchema: z.ZodType<FileIngestionCandidate> =
  z.object({
    sourcePath: z.string(),
    fileCode: z.enum([
      "SHDEN",
      "SHTOR",
      "SHSYO",
      "SHTKI",
      "SHNKI",
      "SHSUJ",
      "SHTNSUJ",
      "SHTEGATA",
      "SHZEI",
      "SHTAN",
      "SHTANT",
    ]),
    fileSize: nonNegativeNumber,
    fileMtime: z.string(),
    sourceRole: z.enum(["canonical", "auxiliary"]),
    score: z.number(),
    contentHash: z.string().optional(),
  });
