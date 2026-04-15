import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

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
}

interface NamedSalesTransactionDraftArtifact {
  runId: string;
  generatedAt: string;
  drafts: NamedSalesTransactionDraft[];
}

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

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error(
      "artifactsDir is not set. ingestRawFiles must run before transaction extraction."
    );
  }

  return context.artifactsDir;
}

function sanitizeAscii(value: Buffer): string {
  return value
    .toString("latin1")
    .replace(/[^\x20-\x7E]/g, ".")
    .trim();
}

function toHex(value: Buffer): string {
  return value.toString("hex").toUpperCase();
}

function readU16(value: Buffer): number | undefined {
  return value.length >= 2 ? value.readUInt16LE(0) : undefined;
}

function readU32(value: Buffer): number | undefined {
  return value.length >= 4 ? value.readUInt32LE(0) : undefined;
}

export async function writeSalesTransactionDraftExtraction(
  context: JobContext,
  maxRecords = 10
): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const draftPath = join(artifactsDir, "profiles", "sales-transaction-draft.json");
  const draftArtifact = JSON.parse(
    await readFile(draftPath, "utf8")
  ) as NamedSalesTransactionDraftArtifact;

  const files: SalesTransactionExtraction[] = [];

  for (const draft of draftArtifact.drafts) {
    const content = await readFile(draft.sourcePath);
    const extractedRecords: ExtractedTransactionRecord[] = [];

    for (let recordIndex = 0; recordIndex < maxRecords; recordIndex += 1) {
      const payloadStartOffset = draft.firstPayloadStartOffset + recordIndex * draft.recordLength;
      const payloadEndOffset = payloadStartOffset + draft.recordLength;
      if (payloadEndOffset > content.length) {
        break;
      }

      const values = draft.fields.map((field) => {
        const fieldStart = payloadStartOffset + field.offset;
        const fieldEnd = fieldStart + field.widthBytes;
        const rawValue = content.subarray(fieldStart, fieldEnd);

        return {
          fieldName: field.name,
          offset: field.offset,
          widthBytes: field.widthBytes,
          confidence: field.confidence,
          hex: toHex(rawValue),
          u16: readU16(rawValue),
          u32: readU32(rawValue),
          asciiPreview: sanitizeAscii(rawValue)
        };
      });

      extractedRecords.push({
        recordIndex,
        payloadStartOffset,
        values
      });
    }

    files.push({
      fileCode: draft.fileCode,
      sourcePath: draft.sourcePath,
      recordLength: draft.recordLength,
      firstPayloadStartOffset: draft.firstPayloadStartOffset,
      extractedRecords
    });
  }

  const payload: SalesTransactionExtractionArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    files
  };

  const targetPath = join(artifactsDir, "profiles", "sales-transaction-extract.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
