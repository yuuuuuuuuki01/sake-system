import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface NamedMasterDraftArtifact {
  runId: string;
  generatedAt: string;
  drafts: NamedMasterDraft[];
}

interface NamedMasterDraft {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  fields: NamedFieldDraft[];
  notes: string[];
}

interface NamedFieldDraft {
  name: string;
  offset: number;
  widthBytes: number;
  sourceHypothesisLabel: string;
  confidence: "low" | "medium";
  rationale: string;
}

interface FixedRecordProbeArtifact {
  runId: string;
  generatedAt: string;
  probes: FixedRecordProbe[];
}

interface FixedRecordProbe {
  fileCode: string;
  sourcePath: string;
  candidateRecordLength?: number;
  estimatedRecordCount: number;
  firstPayloadRecordIndex: number;
  firstPayloadStartOffset: number;
}

interface ExtractedFieldValue {
  fieldName: string;
  offset: number;
  widthBytes: number;
  confidence: "low" | "medium";
  hex: string;
  u16?: number;
  u32?: number;
  asciiPreview: string;
}

interface ExtractedRecord {
  recordIndex: number;
  payloadStartOffset: number;
  values: ExtractedFieldValue[];
}

interface MasterDraftExtraction {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  firstPayloadStartOffset: number;
  extractedRecords: ExtractedRecord[];
}

interface MasterDraftExtractionArtifact {
  runId: string;
  generatedAt: string;
  files: MasterDraftExtraction[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before draft extraction.");
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
  if (value.length < 2) {
    return undefined;
  }

  return value.readUInt16LE(0);
}

function readU32(value: Buffer): number | undefined {
  if (value.length < 4) {
    return undefined;
  }

  return value.readUInt32LE(0);
}

function findProbe(artifact: FixedRecordProbeArtifact, fileCode: string): FixedRecordProbe {
  const probe = artifact.probes.find((item) => item.fileCode === fileCode);
  if (!probe) {
    throw new Error(`Missing fixed-record probe for ${fileCode}.`);
  }

  return probe;
}

export async function writeMasterDraftExtraction(
  context: JobContext,
  maxRecords = 10
): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const draftPath = join(artifactsDir, "profiles", "named-master-draft.json");
  const probePath = join(artifactsDir, "profiles", "fixed-record-probe.json");
  const draftArtifact = JSON.parse(await readFile(draftPath, "utf8")) as NamedMasterDraftArtifact;
  const probeArtifact = JSON.parse(await readFile(probePath, "utf8")) as FixedRecordProbeArtifact;

  const files: MasterDraftExtraction[] = [];

  for (const draft of draftArtifact.drafts) {
    const probe = findProbe(probeArtifact, draft.fileCode);
    const content = await readFile(draft.sourcePath);
    const extractedRecords: ExtractedRecord[] = [];
    const recordLength = probe.candidateRecordLength ?? draft.recordLength;

    for (let recordIndex = 0; recordIndex < maxRecords; recordIndex += 1) {
      const payloadStartOffset = probe.firstPayloadStartOffset + recordIndex * recordLength;
      const payloadEndOffset = payloadStartOffset + recordLength;
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
      recordLength,
      firstPayloadStartOffset: probe.firstPayloadStartOffset,
      extractedRecords
    });
  }

  const payload: MasterDraftExtractionArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    files
  };

  const targetPath = join(artifactsDir, "profiles", "master-draft-extract.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
