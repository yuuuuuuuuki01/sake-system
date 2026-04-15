import { mkdir, open, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface CanonicalProfileArtifact {
  runId: string;
  generatedAt: string;
  profiles: CanonicalProfile[];
}

interface RawSnapshotArtifact {
  runId: string;
  startedAt: string;
  analysisDir: string;
  legacyRoot: string;
  candidateCount: number;
  canonicalCount: number;
  candidates: RawCandidateSnapshot[];
}

interface RawCandidateSnapshot {
  fileCode: string;
  sourcePath: string;
  sourceRole: "canonical" | "auxiliary";
  score: number;
  fileSize: number;
  fileMtime: string;
  exists: boolean;
  sampleHash?: string;
  sampleHex?: string;
  error?: string;
}

interface CanonicalProfile {
  fileCode: string;
  sourcePath: string;
  fileSize: number;
  fileMtime: string;
  offsetValues: Array<{
    offset: number;
    hex: string;
    u16le?: number;
    u32le?: number;
  }>;
}

interface RecordChunk {
  offset: number;
  length: number;
  hex: string;
  ascii: string;
}

interface InspectedRecord {
  recordIndex: number;
  startOffset: number;
  chunks: RecordChunk[];
}

interface TransactionInspection {
  fileCode: string;
  sourcePath: string;
  candidatePageSize?: number;
  candidateRecordLength?: number;
  estimatedRecordCount?: number;
  firstPayloadRecordIndex?: number;
  firstPayloadStartOffset?: number;
  records: InspectedRecord[];
  notes: string[];
}

interface TransactionInspectionArtifact {
  runId: string;
  generatedAt: string;
  inspections: TransactionInspection[];
}

const TARGET_FILE_CODES = new Set(["SHDEN", "SHTOR", "SHNKI", "SHSUJ", "SHTNSUJ", "SHTEGATA"]);
const RECORDS_TO_CAPTURE = 3;
const CHUNK_BYTES = 16;
const MAX_BYTES_PER_RECORD = 128;
const PAYLOAD_SEARCH_RECORDS = 256;

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before transaction inspection.");
  }

  return context.artifactsDir;
}

function asciiView(buffer: Buffer): string {
  return buffer.toString("latin1").replace(/[^\x20-\x7E]/g, ".");
}

function findOffsetValue(profile: CanonicalProfile, offset: number): number | undefined {
  const match = profile.offsetValues.find((value) => value.offset === offset);
  return match?.u16le;
}

function guessPageSize(profile: CanonicalProfile): number | undefined {
  const candidates = [findOffsetValue(profile, 8), findOffsetValue(profile, 12), findOffsetValue(profile, 20)]
    .filter((value): value is number => Boolean(value))
    .filter((value) => value >= 512 && value <= 16384 && value % 2 === 0);

  return candidates[0];
}

function guessRecordLength(profile: CanonicalProfile): number | undefined {
  const candidates = [findOffsetValue(profile, 24), findOffsetValue(profile, 28), findOffsetValue(profile, 40)]
    .filter((value): value is number => Boolean(value))
    .filter((value) => value >= 32 && value <= 4096);

  return candidates[0];
}

function toOffsetValues(sampleHex: string): Array<{ offset: number; u16le?: number }> {
  const buffer = Buffer.from(sampleHex, "hex");
  const values: Array<{ offset: number; u16le?: number }> = [];
  const maxOffset = Math.min(buffer.length, 64);

  for (let offset = 0; offset < maxOffset; offset += 4) {
    const slice = buffer.subarray(offset, Math.min(offset + 4, buffer.length));
    values.push({
      offset,
      u16le: slice.length >= 2 ? slice.readUInt16LE(0) : undefined
    });
  }

  return values;
}

function guessPageSizeFromSample(sampleHex: string): number | undefined {
  const values = toOffsetValues(sampleHex);
  return [8, 12, 20]
    .map((offset) => values.find((value) => value.offset === offset)?.u16le)
    .filter((value): value is number => Boolean(value))
    .find((value) => value >= 512 && value <= 16384 && value % 2 === 0);
}

function guessRecordLengthFromSample(sampleHex: string): number | undefined {
  const values = toOffsetValues(sampleHex);
  return [24, 28, 40]
    .map((offset) => values.find((value) => value.offset === offset)?.u16le)
    .filter((value): value is number => Boolean(value))
    .find((value) => value >= 32 && value <= 4096);
}

function findAuxiliaryHint(
  rawArtifact: RawSnapshotArtifact,
  fileCode: string
): { pageSize?: number; recordLength?: number; sourcePath?: string } {
  for (const candidate of rawArtifact.candidates) {
    if (
      candidate.fileCode !== fileCode ||
      candidate.sourceRole !== "auxiliary" ||
      !candidate.exists ||
      !candidate.sampleHex
    ) {
      continue;
    }

    const pageSize = guessPageSizeFromSample(candidate.sampleHex);
    const recordLength = guessRecordLengthFromSample(candidate.sampleHex);
    if (pageSize || recordLength) {
      return {
        pageSize,
        recordLength,
        sourcePath: candidate.sourcePath
      };
    }
  }

  return {};
}

async function readRecord(filePath: string, startOffset: number, length: number): Promise<Buffer> {
  const handle = await open(filePath, "r");

  try {
    const buffer = Buffer.alloc(length);
    const { bytesRead } = await handle.read(buffer, 0, length, startOffset);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

function chunkRecord(buffer: Buffer): RecordChunk[] {
  const chunks: RecordChunk[] = [];

  for (let offset = 0; offset < buffer.length; offset += CHUNK_BYTES) {
    const slice = buffer.subarray(offset, Math.min(offset + CHUNK_BYTES, buffer.length));
    chunks.push({
      offset,
      length: slice.length,
      hex: slice.toString("hex"),
      ascii: asciiView(slice)
    });
  }

  return chunks;
}

function isHeaderLike(preview: Buffer): boolean {
  const hex = preview.toString("hex");
  const ascii = asciiView(preview);
  return hex.startsWith("46430000") || /^0*$/.test(hex) || ascii === ".".repeat(preview.length);
}

async function findFirstPayloadRecord(
  filePath: string,
  pageSize: number,
  recordLength: number
): Promise<{ recordIndex?: number; startOffset?: number }> {
  for (let index = 0; index < PAYLOAD_SEARCH_RECORDS; index += 1) {
    const startOffset = pageSize + recordLength * index;
    const preview = await readRecord(filePath, startOffset, 16);
    if (!isHeaderLike(preview)) {
      return { recordIndex: index, startOffset };
    }
  }

  return {};
}

function notesFor(fileCode: string): string[] {
  switch (fileCode) {
    case "SHDEN":
      return [
        "Sales header candidate. Confirm document number, customer code, sales date, and total amount fields."
      ];
    case "SHTOR":
      return [
        "Sales line candidate. Confirm header linkage, line number, product code, quantity, and line amount."
      ];
    case "SHNKI":
      return [
        "Payment receipt candidate. Confirm receipt number, customer code, payment date, and payment amount."
      ];
    default:
      return ["Transaction-side inspection artifact for parser hypothesis work."];
  }
}

export async function writeTransactionRecordInspection(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const profilePath = join(artifactsDir, "profiles", "canonical-file-profiles.json");
  const rawPath = join(artifactsDir, "raw-ingestion.json");
  const artifact = JSON.parse(
    await readFile(profilePath, "utf8")
  ) as CanonicalProfileArtifact;
  const rawArtifact = JSON.parse(await readFile(rawPath, "utf8")) as RawSnapshotArtifact;

  const inspections: TransactionInspection[] = [];

  for (const profile of artifact.profiles) {
    if (!TARGET_FILE_CODES.has(profile.fileCode)) {
      continue;
    }

    const auxiliaryHint = findAuxiliaryHint(rawArtifact, profile.fileCode);
    const candidatePageSize = guessPageSize(profile) ?? auxiliaryHint.pageSize;
    const candidateRecordLength = guessRecordLength(profile) ?? auxiliaryHint.recordLength;
    const notes = notesFor(profile.fileCode);

    if (guessPageSize(profile) === undefined && auxiliaryHint.pageSize !== undefined) {
      notes.push(`Page size heuristic was inherited from auxiliary variant ${auxiliaryHint.sourcePath}.`);
    }

    if (guessRecordLength(profile) === undefined && auxiliaryHint.recordLength !== undefined) {
      notes.push(`Record length heuristic was inherited from auxiliary variant ${auxiliaryHint.sourcePath}.`);
    }

    if (!candidatePageSize || !candidateRecordLength) {
      inspections.push({
        fileCode: profile.fileCode,
        sourcePath: profile.sourcePath,
        candidatePageSize,
        candidateRecordLength,
        records: [],
        notes: [
          ...notes,
          "Inspection skipped because page-size or record-length heuristics were not found from the file header sample."
        ]
      });
      continue;
    }

    const estimatedPayloadBytes =
      profile.fileSize > candidatePageSize ? profile.fileSize - candidatePageSize : 0;
    const estimatedRecordCount = Math.floor(estimatedPayloadBytes / candidateRecordLength);
    const firstPayload = await findFirstPayloadRecord(
      profile.sourcePath,
      candidatePageSize,
      candidateRecordLength
    );

    if (
      firstPayload.recordIndex === undefined ||
      firstPayload.startOffset === undefined
    ) {
      inspections.push({
        fileCode: profile.fileCode,
        sourcePath: profile.sourcePath,
        candidatePageSize,
        candidateRecordLength,
        estimatedRecordCount,
        records: [],
        notes: [
          ...notes,
          "Inspection skipped because a payload-like record start was not found in the first search window."
        ]
      });
      continue;
    }

    const records: InspectedRecord[] = [];
    const bytesToRead = Math.min(candidateRecordLength, MAX_BYTES_PER_RECORD);

    for (let i = 0; i < RECORDS_TO_CAPTURE; i += 1) {
      const recordIndex = firstPayload.recordIndex + i;
      const startOffset = firstPayload.startOffset + candidateRecordLength * i;
      const record = await readRecord(profile.sourcePath, startOffset, bytesToRead);
      records.push({
        recordIndex,
        startOffset,
        chunks: chunkRecord(record)
      });
    }

    inspections.push({
      fileCode: profile.fileCode,
      sourcePath: profile.sourcePath,
      candidatePageSize,
      candidateRecordLength,
      estimatedRecordCount,
      firstPayloadRecordIndex: firstPayload.recordIndex,
      firstPayloadStartOffset: firstPayload.startOffset,
      records,
      notes: [
        ...notes,
        "Chunked into 16-byte segments for transaction field hypothesis work.",
        "Only the first 128 bytes per record are captured in this inspection artifact."
      ]
    });
  }

  const payload: TransactionInspectionArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    inspections
  };

  const targetPath = join(artifactsDir, "profiles", "transaction-record-inspection.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
