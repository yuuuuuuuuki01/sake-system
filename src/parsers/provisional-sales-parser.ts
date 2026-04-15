import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface ExtractedTransactionFieldValue {
  fieldName: string;
  offset: number;
  widthBytes: number;
  confidence: "low" | "medium";
  hex: string;
  u16?: number;
  u32?: number;
  asciiPreview: string;
}

interface ExtractedTransactionRecord {
  recordIndex: number;
  payloadStartOffset: number;
  values: ExtractedTransactionFieldValue[];
}

interface SalesTransactionExtraction {
  fileCode: "SHDEN" | "SHTOR";
  sourcePath: string;
  recordLength: number;
  firstPayloadStartOffset: number;
  extractedRecords: ExtractedTransactionRecord[];
}

interface SalesTransactionExtractionArtifact {
  runId: string;
  generatedAt: string;
  files: SalesTransactionExtraction[];
}

interface ProvisionalFieldValue {
  rawHex: string;
  numericCandidate?: number;
  numericDisplay?: string;
  asciiCandidate?: string;
}

interface ProvisionalSalesHeaderRecord {
  recordIndex: number;
  payloadStartOffset: number;
  legacyDocumentNoCandidate?: string;
  legacyCustomerCodeCandidate?: string;
  salesAmountCandidate?: number;
  rawFields: Record<string, ProvisionalFieldValue>;
}

interface ProvisionalSalesLineRecord {
  recordIndex: number;
  payloadStartOffset: number;
  legacyDocumentNoCandidate?: string;
  lineNoCandidate?: number;
  legacyProductCodeCandidate?: string;
  lineAmountCandidate?: number;
  rawFields: Record<string, ProvisionalFieldValue>;
}

interface ProvisionalSalesParserArtifact {
  runId: string;
  generatedAt: string;
  outputs: Array<
    | {
        fileCode: "SHDEN";
        sourcePath: string;
        records: ProvisionalSalesHeaderRecord[];
      }
    | {
        fileCode: "SHTOR";
        sourcePath: string;
        records: ProvisionalSalesLineRecord[];
      }
  >;
  notes: string[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before provisional sales parsing.");
  }

  return context.artifactsDir;
}

function pickNumericCandidate(value: ExtractedTransactionFieldValue): number | undefined {
  const candidates = [value.u32, value.u16].filter((item): item is number => item !== undefined);
  return candidates.find((item) => item > 0 && item < 100_000_000);
}

function pickAsciiCandidate(value: ExtractedTransactionFieldValue): string | undefined {
  const normalized = value.asciiPreview.replace(/[^0-9A-Za-z]/g, "");
  return normalized.length >= 3 ? normalized : undefined;
}

function toFieldValue(value: ExtractedTransactionFieldValue): ProvisionalFieldValue {
  const numericCandidate = pickNumericCandidate(value);
  const asciiCandidate = pickAsciiCandidate(value);

  return {
    rawHex: value.hex,
    numericCandidate,
    numericDisplay: numericCandidate !== undefined ? String(numericCandidate) : undefined,
    asciiCandidate
  };
}

function chooseCodeCandidate(field?: ProvisionalFieldValue): string | undefined {
  if (!field) {
    return undefined;
  }

  if (field.asciiCandidate && /^\d{3,}$/.test(field.asciiCandidate)) {
    return field.asciiCandidate;
  }

  if (field.numericDisplay && /^\d{1,8}$/.test(field.numericDisplay)) {
    return field.numericDisplay;
  }

  return undefined;
}

function chooseAmountCandidate(field?: ProvisionalFieldValue): number | undefined {
  if (!field || field.numericCandidate === undefined) {
    return undefined;
  }

  return field.numericCandidate > 0 ? field.numericCandidate : undefined;
}

function parseHeaders(file: SalesTransactionExtraction) {
  return {
    fileCode: "SHDEN" as const,
    sourcePath: file.sourcePath,
    records: file.extractedRecords.map((record) => {
      const rawFields = Object.fromEntries(
        record.values.map((value) => [value.fieldName, toFieldValue(value)])
      );

      return {
        recordIndex: record.recordIndex,
        payloadStartOffset: record.payloadStartOffset,
        legacyDocumentNoCandidate: chooseCodeCandidate(rawFields.legacy_document_no_candidate),
        legacyCustomerCodeCandidate: chooseCodeCandidate(rawFields.legacy_customer_code_candidate),
        salesAmountCandidate: chooseAmountCandidate(rawFields.sales_amount_candidate),
        rawFields
      };
    })
  };
}

function parseLines(file: SalesTransactionExtraction) {
  return {
    fileCode: "SHTOR" as const,
    sourcePath: file.sourcePath,
    records: file.extractedRecords.map((record) => {
      const rawFields = Object.fromEntries(
        record.values.map((value) => [value.fieldName, toFieldValue(value)])
      );

      return {
        recordIndex: record.recordIndex,
        payloadStartOffset: record.payloadStartOffset,
        legacyDocumentNoCandidate: chooseCodeCandidate(rawFields.legacy_document_no_candidate),
        lineNoCandidate: chooseAmountCandidate(rawFields.line_no_candidate),
        legacyProductCodeCandidate: chooseCodeCandidate(rawFields.legacy_product_code_candidate),
        lineAmountCandidate: chooseAmountCandidate(rawFields.line_amount_candidate),
        rawFields
      };
    })
  };
}

export async function writeProvisionalSalesParser(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const extractPath = join(artifactsDir, "profiles", "sales-transaction-extract.json");
  const artifact = JSON.parse(
    await readFile(extractPath, "utf8")
  ) as SalesTransactionExtractionArtifact;

  const outputs = artifact.files.reduce<ProvisionalSalesParserArtifact["outputs"]>((items, file) => {
    if (file.fileCode === "SHDEN") {
      items.push(parseHeaders(file));
    } else if (file.fileCode === "SHTOR") {
      items.push(parseLines(file));
    }

    return items;
  }, []);

  const payload: ProvisionalSalesParserArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    outputs,
    notes: [
      "This artifact is still heuristic and is intended to bridge raw transaction slots into provisional sales header and line candidates.",
      "Document linkage, customer mapping, product mapping, and monetary fields still need reconciliation against office output."
    ]
  };

  const targetPath = join(artifactsDir, "profiles", "provisional-sales-parser.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
