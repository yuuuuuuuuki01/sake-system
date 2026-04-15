import { mkdir, open, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface CanonicalProfileArtifact {
  runId: string;
  generatedAt: string;
  profiles: CanonicalProfile[];
}

interface CanonicalProfile {
  fileCode: string;
  sourcePath: string;
  fileSize: number;
  fileMtime: string;
  sampleHash?: string;
  sampleByteCount: number;
  printableAscii: string[];
  offsetValues: Array<{
    offset: number;
    hex: string;
    u16le?: number;
    u32le?: number;
  }>;
  parserReadiness: "needs_layout_mapping" | "candidate_for_fixed_record_probe";
  notes: string[];
}

interface ProbeRecordPreview {
  index: number;
  startOffset: number;
  hexPreview: string;
  printableAscii: string[];
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
  recordPreviews: ProbeRecordPreview[];
  notes: string[];
}

interface FixedRecordProbeArtifact {
  runId: string;
  generatedAt: string;
  probes: FixedRecordProbeResult[];
}

const MAX_RECORDS = 5;
const PAYLOAD_SEARCH_RECORDS = 20;
const PREVIEW_BYTES = 96;

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before probing.");
  }

  return context.artifactsDir;
}

function findOffsetValue(profile: CanonicalProfile, offset: number): number | undefined {
  const match = profile.offsetValues.find((value) => value.offset === offset);
  return match?.u16le;
}

function guessPageSize(profile: CanonicalProfile): number | undefined {
  const candidates = [findOffsetValue(profile, 8), findOffsetValue(profile, 20)]
    .filter((value): value is number => Boolean(value))
    .filter((value) => value >= 512 && value <= 16384 && value % 2 === 0);

  return candidates[0];
}

function guessRecordLength(profile: CanonicalProfile): number | undefined {
  const candidates = [
    findOffsetValue(profile, 24),
    findOffsetValue(profile, 28),
    findOffsetValue(profile, 40)
  ]
    .filter((value): value is number => Boolean(value))
    .filter((value) => value >= 32 && value <= 4096);

  return candidates[0];
}

function toPrintableAscii(buffer: Buffer): string[] {
  const text = buffer
    .toString("latin1")
    .replace(/[^\x20-\x7E]+/g, "\n")
    .split("\n")
    .map((part) => part.trim())
    .filter((part) => part.length >= 2);

  return Array.from(new Set(text)).slice(0, 10);
}

async function readPreview(
  filePath: string,
  startOffset: number,
  byteCount: number
): Promise<Buffer> {
  const handle = await open(filePath, "r");

  try {
    const buffer = Buffer.alloc(byteCount);
    const { bytesRead } = await handle.read(buffer, 0, byteCount, startOffset);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

export async function writeFixedRecordProbe(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const profilePath = join(artifactsDir, "profiles", "canonical-file-profiles.json");
  const content = await readFile(profilePath, "utf8");
  const artifact = JSON.parse(content) as CanonicalProfileArtifact;

  const probes: FixedRecordProbeResult[] = [];

  for (const profile of artifact.profiles) {
    if (profile.parserReadiness !== "candidate_for_fixed_record_probe") {
      continue;
    }

    const candidatePageSize = guessPageSize(profile);
    const candidateRecordLength = guessRecordLength(profile);
    const notes: string[] = [];

    if (!candidatePageSize) {
      notes.push("No page size heuristic was found in the current header sample.");
    }

    if (!candidateRecordLength) {
      notes.push("No record length heuristic was found in the current header sample.");
    }

    const estimatedPayloadBytes =
      candidatePageSize && profile.fileSize > candidatePageSize
        ? profile.fileSize - candidatePageSize
        : undefined;
    const estimatedRecordCount =
      estimatedPayloadBytes && candidateRecordLength
        ? Math.floor(estimatedPayloadBytes / candidateRecordLength)
        : undefined;

    const recordPreviews: ProbeRecordPreview[] = [];
    let firstPayloadRecordIndex: number | undefined;
    let firstPayloadStartOffset: number | undefined;

    if (candidatePageSize && candidateRecordLength) {
      for (let index = 0; index < MAX_RECORDS; index += 1) {
        const startOffset = candidatePageSize + candidateRecordLength * index;
        const preview = await readPreview(profile.sourcePath, startOffset, PREVIEW_BYTES);
        recordPreviews.push({
          index,
          startOffset,
          hexPreview: preview.toString("hex"),
          printableAscii: toPrintableAscii(preview)
        });
      }

      for (let index = 0; index < PAYLOAD_SEARCH_RECORDS; index += 1) {
        const startOffset = candidatePageSize + candidateRecordLength * index;
        const preview = await readPreview(profile.sourcePath, startOffset, 8);
        const hex = preview.toString("hex");
        const isHeaderLike = hex.startsWith("46430000");
        const isAllZero = /^0*$/.test(hex);

        if (!isHeaderLike && !isAllZero) {
          firstPayloadRecordIndex = index;
          firstPayloadStartOffset = startOffset;
          break;
        }
      }

      if (firstPayloadRecordIndex === undefined) {
        notes.push("No non-header payload candidate found in the first 20 record windows.");
      } else {
        notes.push(
          `First payload-like window starts at record index ${firstPayloadRecordIndex} (offset ${firstPayloadStartOffset}).`
        );
      }
    }

    probes.push({
      fileCode: profile.fileCode,
      sourcePath: profile.sourcePath,
      candidatePageSize,
      candidateRecordLength,
      estimatedPayloadBytes,
      estimatedRecordCount,
      firstPayloadRecordIndex,
      firstPayloadStartOffset,
      recordPreviews,
      notes
    });
  }

  const payload: FixedRecordProbeArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    probes
  };

  const targetPath = join(artifactsDir, "profiles", "fixed-record-probe.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
