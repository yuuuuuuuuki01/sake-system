import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Customer } from "../domain/types.js";
import {
  exportInvoiceCandidates,
  loadFreeeCustomerMapping,
  syncCustomersToFreee,
  type InvoiceCandidate
} from "../integrations/freee/index.js";
import type { JobContext, JobResult } from "./job-types.js";

type InvoiceCandidateEnvelope =
  | InvoiceCandidate[]
  | {
      candidates?: unknown;
      batches?: unknown;
    };

const invoiceCandidateArtifactCandidates = [
  ["invoice_candidate_batches.json"],
  ["normalization", "invoice_candidate_batches.json"],
  ["exports", "invoice_candidate_batches.json"]
];

function ensureArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before freee export.");
  }

  return context.artifactsDir;
}

function isInvoiceCandidate(value: unknown): value is InvoiceCandidate {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<InvoiceCandidate>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.legacyCustomerCode === "string" &&
    typeof candidate.issueDate === "string" &&
    typeof candidate.totalAmount === "number"
  );
}

function collectInvoiceCandidates(value: unknown): InvoiceCandidate[] {
  if (Array.isArray(value)) {
    return value.filter(isInvoiceCandidate);
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const envelope = value as Record<string, unknown>;
  const directCandidates = collectInvoiceCandidates(envelope.candidates);
  if (directCandidates.length > 0) {
    return directCandidates;
  }

  if (!Array.isArray(envelope.batches)) {
    return [];
  }

  return envelope.batches.flatMap((batch) => {
    if (!batch || typeof batch !== "object") {
      return [];
    }

    const record = batch as Record<string, unknown>;
    return collectInvoiceCandidates(record.candidates ?? record.items);
  });
}

async function loadInvoiceCandidates(context: JobContext): Promise<InvoiceCandidate[]> {
  const artifactsDir = ensureArtifactsDir(context);

  for (const parts of invoiceCandidateArtifactCandidates) {
    try {
      const content = await readFile(join(artifactsDir, ...parts), "utf8");
      return collectInvoiceCandidates(JSON.parse(content) as InvoiceCandidateEnvelope);
    } catch {
      continue;
    }
  }

  return [];
}

function buildCustomerSyncSeed(candidates: InvoiceCandidate[]): Customer[] {
  const customerMap = new Map<string, Customer>();

  for (const candidate of candidates) {
    if (customerMap.has(candidate.legacyCustomerCode)) {
      continue;
    }

    customerMap.set(candidate.legacyCustomerCode, {
      id: candidate.legacyCustomerCode,
      legacyCustomerCode: candidate.legacyCustomerCode,
      name: candidate.customerName ?? candidate.legacyCustomerCode,
      billingName: candidate.customerName,
      isActive: true
    });
  }

  return [...customerMap.values()];
}

export async function runFreeeExport(context: JobContext): Promise<JobResult> {
  try {
    const candidates = await loadInvoiceCandidates(context);
    if (candidates.length === 0) {
      return {
        jobName: "freeeExport",
        ok: true,
        detail: "No invoice candidates found for freee export."
      };
    }

    const customerSeed = buildCustomerSyncSeed(candidates);
    const existingMapping = await loadFreeeCustomerMapping();
    const missingCustomers = customerSeed.filter(
      (customer) => !existingMapping.has(customer.legacyCustomerCode)
    );
    const syncResult =
      missingCustomers.length > 0
        ? await syncCustomersToFreee(missingCustomers)
        : { synced: 0, failed: 0, mapping: new Map<string, number>() };

    const mergedMapping = new Map<string, number>([
      ...existingMapping.entries(),
      ...syncResult.mapping.entries()
    ]);
    const exportResult = await exportInvoiceCandidates(candidates, mergedMapping);

    return {
      jobName: "freeeExport",
      ok: exportResult.failed === 0,
      detail: `freee export processed ${candidates.length} invoice candidates. exported=${exportResult.exported} failed=${exportResult.failed} customer_sync=${syncResult.synced}/${missingCustomers.length}`
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown freee export failure";
    return {
      jobName: "freeeExport",
      ok: false,
      detail: message
    };
  }
}
