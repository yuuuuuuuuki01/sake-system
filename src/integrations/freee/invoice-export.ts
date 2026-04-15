import { FREEE_DRY_RUN } from "../../env.js";
import type { CreateInvoiceParams, ExportResult, InvoiceCandidate } from "./types.js";
import { createFreeeClientFromEnv } from "./client.js";

function isDryRunEnabled(): boolean {
  return FREEE_DRY_RUN;
}

function toCreateInvoiceParams(
  candidate: InvoiceCandidate,
  partnerId: number
): CreateInvoiceParams {
  return {
    issue_date: candidate.issueDate,
    due_date: candidate.dueDate,
    partner_id: partnerId,
    title: candidate.title,
    memo: candidate.memo,
    invoice_contents: candidate.lines?.map((line) => ({
      description: line.description ?? line.legacyProductCode,
      quantity: line.quantity,
      unit_price: line.unitPrice,
      amount: line.amount
    }))
  };
}

export async function exportInvoiceCandidates(
  candidates: InvoiceCandidate[],
  mapping: Map<string, number>
): Promise<{ exported: number; failed: number; results: ExportResult[] }> {
  const dryRun = isDryRunEnabled();
  const client = dryRun ? null : createFreeeClientFromEnv();
  const results: ExportResult[] = [];
  let exported = 0;
  let failed = 0;

  for (const candidate of candidates) {
    const partnerId = mapping.get(candidate.legacyCustomerCode);
    if (!partnerId) {
      results.push({
        candidateId: candidate.id,
        legacyCustomerCode: candidate.legacyCustomerCode,
        success: false,
        dryRun,
        message: "freee partner mapping was not found."
      });
      failed += 1;
      continue;
    }

    if (dryRun) {
      results.push({
        candidateId: candidate.id,
        legacyCustomerCode: candidate.legacyCustomerCode,
        success: true,
        dryRun: true,
        message: "dry run: skipped freee invoice creation."
      });
      exported += 1;
      continue;
    }

    try {
      const invoice = await client!.createInvoice(toCreateInvoiceParams(candidate, partnerId));
      results.push({
        candidateId: candidate.id,
        legacyCustomerCode: candidate.legacyCustomerCode,
        success: true,
        dryRun: false,
        freeeInvoiceId: invoice.id,
        message: "exported to freee."
      });
      exported += 1;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "unknown error while exporting invoice.";
      results.push({
        candidateId: candidate.id,
        legacyCustomerCode: candidate.legacyCustomerCode,
        success: false,
        dryRun: false,
        message
      });
      failed += 1;
    }
  }

  return { exported, failed, results };
}
