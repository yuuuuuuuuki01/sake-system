import { mkdir, open, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface FixedRecordProbeArtifact {
  runId: string;
  generatedAt: string;
  probes: FixedRecordProbeResult[];
}

interface FixedRecordProbeResult {
  fileCode: string;
  sourcePath: string;
  candidatePageSize?: number;
  candidateRecordLength?: number;
  estimatedPayloadBytes?: number;
  estimatedRecordCount?: number;
  firstPayloadRecordIndex?: number;
  firstPayloadStartOffset?: number;
  recordPreviews: Array<{
    index: number;
    startOffset: number;
    hexPreview: string;
    printableAscii: string[];
  }>;
  notes: string[];
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

interface MasterInspection {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  firstPayloadRecordIndex: number;
  firstPayloadStartOffset: number;
  records: InspectedRecord[];
  notes: string[];
}

interface MasterInspectionArtifact {
  runId: string;
  generatedAt: string;
  inspections: MasterInspection[];
}

const TARGET_FILE_CODES = new Set(["SHSYO", "SHTKI"]);
const RECORDS_TO_CAPTURE = 3;
const CHUNK_BYTES = 16;
const MAX_BYTES_PER_RECORD = 128;

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before inspection.");
  }

  return context.artifactsDir;
}

function asciiView(buffer: Buffer): string {
  return buffer
    .toString("latin1")
    .replace(/[^\x20-\x7E]/g, ".");
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

export async function writeMasterRecordInspection(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const probePath = join(artifactsDir, "profiles", "fixed-record-probe.json");
  const content = await readFile(probePath, "utf8");
  const artifact = JSON.parse(content) as FixedRecordProbeArtifact;

  const inspections: MasterInspection[] = [];

  for (const probe of artifact.probes) {
    if (!TARGET_FILE_CODES.has(probe.fileCode)) {
      continue;
    }

    if (
      probe.candidateRecordLength === undefined ||
      probe.firstPayloadRecordIndex === undefined ||
      probe.firstPayloadStartOffset === undefined
    ) {
      inspections.push({
        fileCode: probe.fileCode,
        sourcePath: probe.sourcePath,
        recordLength: probe.candidateRecordLength ?? 0,
        firstPayloadRecordIndex: probe.firstPayloadRecordIndex ?? -1,
        firstPayloadStartOffset: probe.firstPayloadStartOffset ?? -1,
        records: [],
        notes: ["Inspection skipped because a payload-like record start was not found."]
      });
      continue;
    }

    const records: InspectedRecord[] = [];
    const bytesToRead = Math.min(probe.candidateRecordLength, MAX_BYTES_PER_RECORD);

    for (let i = 0; i < RECORDS_TO_CAPTURE; i += 1) {
      const recordIndex = probe.firstPayloadRecordIndex + i;
      const startOffset = probe.firstPayloadStartOffset + probe.candidateRecordLength * i;
      const record = await readRecord(probe.sourcePath, startOffset, bytesToRead);
      records.push({
        recordIndex,
        startOffset,
        chunks: chunkRecord(record)
      });
    }

    inspections.push({
      fileCode: probe.fileCode,
      sourcePath: probe.sourcePath,
      recordLength: probe.candidateRecordLength,
      firstPayloadRecordIndex: probe.firstPayloadRecordIndex,
      firstPayloadStartOffset: probe.firstPayloadStartOffset,
      records,
      notes: [
        "Chunked into 16-byte segments for manual field hypothesis work.",
        "Only the first 128 bytes per record are captured in this inspection artifact."
      ]
    });
  }

  const payload: MasterInspectionArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    inspections
  };

  const targetPath = join(artifactsDir, "profiles", "master-record-inspection.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
