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
  notes: string[];
}

interface ParsedSlot {
  offset: number;
  hex: string;
  u16le?: number;
  u32le?: number;
}

interface ParsedRecordStub {
  recordIndex: number;
  startOffset: number;
  first128Hex: string;
  candidateCodeSlots: Record<string, number | undefined>;
  slots: ParsedSlot[];
}

interface ParsedMasterStub {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  firstPayloadRecordIndex: number;
  firstPayloadStartOffset: number;
  records: ParsedRecordStub[];
  notes: string[];
}

interface ParsedMasterStubArtifact {
  runId: string;
  generatedAt: string;
  parsers: ParsedMasterStub[];
}

const TARGET_CODES = new Set(["SHSYO", "SHTKI"]);
const RECORDS_TO_PARSE = 10;
const BYTES_TO_CAPTURE = 128;
const SLOT_STRIDE = 4;

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before parser stubs.");
  }

  return context.artifactsDir;
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

function parseSlots(buffer: Buffer): ParsedSlot[] {
  const slots: ParsedSlot[] = [];

  for (let offset = 0; offset < buffer.length; offset += SLOT_STRIDE) {
    const slice = buffer.subarray(offset, Math.min(offset + SLOT_STRIDE, buffer.length));
    const slot: ParsedSlot = {
      offset,
      hex: slice.toString("hex")
    };

    if (slice.length >= 2) {
      slot.u16le = slice.readUInt16LE(0);
    }

    if (slice.length >= 4) {
      slot.u32le = slice.readUInt32LE(0);
    }

    slots.push(slot);
  }

  return slots;
}

function candidateCodeSlots(fileCode: string, slots: ParsedSlot[]): Record<string, number | undefined> {
  const byOffset = new Map<number, ParsedSlot>(slots.map((slot) => [slot.offset, slot]));

  if (fileCode === "SHSYO") {
    return {
      code_u16_0: byOffset.get(0)?.u16le,
      code_u16_2: byOffset.get(2)?.u16le,
      code_u16_4: byOffset.get(4)?.u16le,
      jan_hint_u16_28: byOffset.get(28)?.u16le,
      jan_hint_u16_32: byOffset.get(32)?.u16le
    };
  }

  return {
    customer_u16_0: byOffset.get(0)?.u16le,
    customer_u16_2: byOffset.get(2)?.u16le,
    billing_u16_16: byOffset.get(16)?.u16le,
    closing_day_hint_u16_28: byOffset.get(28)?.u16le,
    payment_day_hint_u16_32: byOffset.get(32)?.u16le
  };
}

export async function writeMasterStubParsers(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const probePath = join(artifactsDir, "profiles", "fixed-record-probe.json");
  const content = await readFile(probePath, "utf8");
  const artifact = JSON.parse(content) as FixedRecordProbeArtifact;

  const parsers: ParsedMasterStub[] = [];

  for (const probe of artifact.probes) {
    if (!TARGET_CODES.has(probe.fileCode)) {
      continue;
    }

    if (
      probe.candidateRecordLength === undefined ||
      probe.firstPayloadRecordIndex === undefined ||
      probe.firstPayloadStartOffset === undefined
    ) {
      parsers.push({
        fileCode: probe.fileCode,
        sourcePath: probe.sourcePath,
        recordLength: probe.candidateRecordLength ?? 0,
        firstPayloadRecordIndex: probe.firstPayloadRecordIndex ?? -1,
        firstPayloadStartOffset: probe.firstPayloadStartOffset ?? -1,
        records: [],
        notes: ["Parser stub skipped because the probe did not identify a payload start."]
      });
      continue;
    }

    const records: ParsedRecordStub[] = [];

    for (let i = 0; i < RECORDS_TO_PARSE; i += 1) {
      const recordIndex = probe.firstPayloadRecordIndex + i;
      const startOffset = probe.firstPayloadStartOffset + probe.candidateRecordLength * i;
      const record = await readRecord(probe.sourcePath, startOffset, Math.min(probe.candidateRecordLength, BYTES_TO_CAPTURE));
      const slots = parseSlots(record);

      records.push({
        recordIndex,
        startOffset,
        first128Hex: record.toString("hex"),
        candidateCodeSlots: candidateCodeSlots(probe.fileCode, slots),
        slots
      });
    }

    parsers.push({
      fileCode: probe.fileCode,
      sourcePath: probe.sourcePath,
      recordLength: probe.candidateRecordLength,
      firstPayloadRecordIndex: probe.firstPayloadRecordIndex,
      firstPayloadStartOffset: probe.firstPayloadStartOffset,
      records,
      notes: [
        "This is a parser stub artifact, not a confirmed field map.",
        "Candidate slots are heuristic anchors for the next field-mapping pass."
      ]
    });
  }

  const payload: ParsedMasterStubArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    parsers
  };

  const targetPath = join(artifactsDir, "profiles", "master-stub-parser.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
