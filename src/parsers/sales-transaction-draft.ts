import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface TransactionInspectionArtifact {
  runId: string;
  generatedAt: string;
  inspections: TransactionInspection[];
}

interface TransactionInspection {
  fileCode: string;
  sourcePath: string;
  candidateRecordLength?: number;
  firstPayloadStartOffset?: number;
  records: Array<{
    recordIndex: number;
    startOffset: number;
  }>;
}

interface NamedTransactionFieldDraft {
  name: string;
  offset: number;
  widthBytes: number;
  confidence: "low" | "medium";
  rationale: string;
}

interface NamedSalesTransactionDraft {
  fileCode: "SHDEN" | "SHTOR";
  sourcePath: string;
  recordLength: number;
  firstPayloadStartOffset: number;
  fields: NamedTransactionFieldDraft[];
  notes: string[];
}

interface NamedSalesTransactionDraftArtifact {
  runId: string;
  generatedAt: string;
  drafts: NamedSalesTransactionDraft[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before sales transaction drafts.");
  }

  return context.artifactsDir;
}

function draftFieldsFor(fileCode: "SHDEN" | "SHTOR"): NamedTransactionFieldDraft[] {
  if (fileCode === "SHDEN") {
    return [
      {
        name: "legacy_document_no_candidate",
        offset: 8,
        widthBytes: 4,
        confidence: "medium",
        rationale: "Early varying slot in the header record; likely the primary sales document anchor."
      },
      {
        name: "legacy_customer_code_candidate",
        offset: 16,
        widthBytes: 4,
        confidence: "low",
        rationale: "Frequently populated near the document anchor and plausible as customer linkage."
      },
      {
        name: "sales_amount_candidate",
        offset: 48,
        widthBytes: 4,
        confidence: "low",
        rationale: "A recurring numeric slot in sampled records that may represent header amount state."
      },
      {
        name: "staff_or_status_code_candidate",
        offset: 80,
        widthBytes: 4,
        confidence: "low",
        rationale: "Later varying slot that may map to operator, status, or document classification."
      }
    ];
  }

  return [
    {
      name: "legacy_document_no_candidate",
      offset: 8,
      widthBytes: 4,
      confidence: "medium",
      rationale: "The line file needs a header join key, and this early varying slot is the leading candidate."
    },
    {
      name: "line_no_candidate",
      offset: 40,
      widthBytes: 4,
      confidence: "low",
      rationale: "A small recurring numeric slot near repeated markers that may represent line ordering."
    },
    {
      name: "legacy_product_code_candidate",
      offset: 80,
      widthBytes: 4,
      confidence: "low",
      rationale: "Later populated numeric slot and plausible as the line-level product/item reference."
    },
    {
      name: "line_amount_candidate",
      offset: 96,
      widthBytes: 4,
      confidence: "low",
      rationale: "Late numeric slot in the sampled records and a reasonable first amount hypothesis."
    }
  ];
}

export async function writeNamedSalesTransactionDraft(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const inspectionPath = join(artifactsDir, "profiles", "transaction-record-inspection.json");
  const artifact = JSON.parse(
    await readFile(inspectionPath, "utf8")
  ) as TransactionInspectionArtifact;

  const drafts = artifact.inspections
    .filter(
      (inspection): inspection is TransactionInspection & {
        fileCode: "SHDEN" | "SHTOR";
        candidateRecordLength: number;
        firstPayloadStartOffset: number;
      } =>
        (inspection.fileCode === "SHDEN" || inspection.fileCode === "SHTOR") &&
        inspection.candidateRecordLength !== undefined &&
        inspection.firstPayloadStartOffset !== undefined &&
        inspection.records.length > 0
    )
    .map((inspection) => ({
      fileCode: inspection.fileCode,
      sourcePath: inspection.sourcePath,
      recordLength: inspection.candidateRecordLength,
      firstPayloadStartOffset: inspection.firstPayloadStartOffset,
      fields: draftFieldsFor(inspection.fileCode),
      notes: [
        "These names are working transaction parser draft names, not confirmed legacy schema labels.",
        "Use them to bridge into provisional sales header/line extraction before reconciliation with office output."
      ]
    }));

  const payload: NamedSalesTransactionDraftArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    drafts
  };

  const targetPath = join(artifactsDir, "profiles", "sales-transaction-draft.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
