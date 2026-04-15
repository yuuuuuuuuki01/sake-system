import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface NormalizationSource {
  fileCode: string;
  sourcePath: string;
  fileMtime: string;
  fileSize: number;
  sourceRole: "canonical" | "auxiliary";
  score: number;
}

interface NormalizationEntityPlan {
  entity: string;
  targetTable: string;
  sourceFiles: NormalizationSource[];
  grain: string;
  keys: string[];
  notes: string[];
}

interface NormalizationArtifact {
  runId: string;
  generatedAt: string;
  artifactType: "masters" | "sales" | "payments";
  entities: NormalizationEntityPlan[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before normalization.");
  }

  return context.artifactsDir;
}

function pickSources(context: JobContext, fileCodes: string[]): NormalizationSource[] {
  return context.candidates
    .filter(
      (candidate) => fileCodes.includes(candidate.fileCode) && candidate.sourceRole === "canonical"
    )
    .map((candidate) => ({
      fileCode: candidate.fileCode,
      sourcePath: candidate.sourcePath,
      fileMtime: candidate.fileMtime,
      fileSize: candidate.fileSize,
      sourceRole: candidate.sourceRole,
      score: candidate.score
    }));
}

async function writeArtifact(
  context: JobContext,
  fileName: string,
  payload: NormalizationArtifact
): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const normalizationDir = join(artifactsDir, "normalization");
  const targetPath = join(normalizationDir, fileName);

  await mkdir(normalizationDir, { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}

export async function writeMasterNormalizationPlan(context: JobContext): Promise<string> {
  const payload: NormalizationArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    artifactType: "masters",
    entities: [
      {
        entity: "product",
        targetTable: "products",
        sourceFiles: pickSources(context, ["SHSYO"]),
        grain: "one row per legacy product code",
        keys: ["legacy_product_code"],
        notes: [
          "Prefer SHSYO.MST as the primary product source.",
          "Keep JAN extraction separate until the field layout is confirmed."
        ]
      },
      {
        entity: "customer",
        targetTable: "customers",
        sourceFiles: pickSources(context, ["SHTKI"]),
        grain: "one row per legacy customer code",
        keys: ["legacy_customer_code"],
        notes: [
          "Treat SHTKI.MST as the MVP customer source.",
          "Billing and collection rules will be refined after field mapping."
        ]
      },
      {
        entity: "sales_staff",
        targetTable: "sales_staff",
        sourceFiles: pickSources(context, ["SHTAN"]),
        grain: "one row per legacy staff code",
        keys: ["legacy_staff_code"],
        notes: [
          "SHTANT.MST currently wins canonical selection because it is larger and newer.",
          "SHTAN.MST may still need to be merged later if it contains a narrower active staff subset."
        ]
      },
      {
        entity: "tax_code",
        targetTable: "tax_codes",
        sourceFiles: pickSources(context, ["SHZEI"]),
        grain: "one row per legacy tax code",
        keys: ["legacy_tax_code"],
        notes: [
          "Use SHZEI.MST as the canonical tax source.",
          "Ignore OCR and _NEW variants during MVP normalization."
        ]
      }
    ]
  };

  return writeArtifact(context, "masters.plan.json", payload);
}

export async function writeSalesNormalizationPlan(context: JobContext): Promise<string> {
  const payload: NormalizationArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    artifactType: "sales",
    entities: [
      {
        entity: "sales_document_header",
        targetTable: "sales_document_headers",
        sourceFiles: pickSources(context, ["SHDEN"]),
        grain: "one row per legacy sales document number",
        keys: ["legacy_document_no"],
        notes: [
          "SHDEN.DAT is treated as the canonical sales header source.",
          "SHDEN1.DAT remains auxiliary until the split between live and archive segments is clarified."
        ]
      },
      {
        entity: "sales_document_line",
        targetTable: "sales_document_lines",
        sourceFiles: pickSources(context, ["SHTOR"]),
        grain: "one row per legacy document number and line number",
        keys: ["legacy_document_no", "line_no"],
        notes: [
          "SHTOR.DAT is treated as the canonical sales line source.",
          "OCR work files are excluded from MVP normalization."
        ]
      },
      {
        entity: "daily_sales_fact",
        targetTable: "daily_sales_fact",
        sourceFiles: pickSources(context, ["SHDEN", "SHTOR", "SHSYO", "SHTKI"]),
        grain: "one row per sales date, customer, and product",
        keys: ["sales_date", "legacy_customer_code", "legacy_product_code"],
        notes: [
          "Derived after header and line normalization succeeds.",
          "This artifact backs the first dashboard slice."
        ]
      }
    ]
  };

  return writeArtifact(context, "sales.plan.json", payload);
}

export async function writePaymentNormalizationPlan(context: JobContext): Promise<string> {
  const payload: NormalizationArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    artifactType: "payments",
    entities: [
      {
        entity: "payment_receipt",
        targetTable: "payment_receipts",
        sourceFiles: pickSources(context, ["SHNKI"]),
        grain: "one row per legacy payment receipt number",
        keys: ["legacy_payment_no"],
        notes: [
          "SHNKI is the lead payment source for MVP.",
          "Linking to sales documents stays provisional until field layouts are decoded."
        ]
      },
      {
        entity: "accounts_receivable_balance",
        targetTable: "accounts_receivable_balances",
        sourceFiles: pickSources(context, ["SHSUJ", "SHTNSUJ", "SHTEGATA"]),
        grain: "one row per customer and billing cycle snapshot",
        keys: ["legacy_customer_code", "as_of_date", "billing_cycle_key"],
        notes: [
          "SHSUJ and SHTNSUJ are treated as receivable summary candidates.",
          "SHTEGATA is included as a special collection side source."
        ]
      },
      {
        entity: "customer_payment_status",
        targetTable: "customer_payment_status",
        sourceFiles: pickSources(context, ["SHNKI", "SHSUJ", "SHTNSUJ"]),
        grain: "one row per customer and snapshot date",
        keys: ["legacy_customer_code", "as_of_date"],
        notes: [
          "This is the dashboard-facing payment aggregate.",
          "freee relay should consume invoice candidates after this layer is stable."
        ]
      }
    ]
  };

  return writeArtifact(context, "payments.plan.json", payload);
}

export async function readNormalizationArtifact(
  context: JobContext,
  fileName: string
): Promise<NormalizationArtifact> {
  const artifactsDir = requireArtifactsDir(context);
  const content = await readFile(join(artifactsDir, "normalization", fileName), "utf8");
  return JSON.parse(content) as NormalizationArtifact;
}
