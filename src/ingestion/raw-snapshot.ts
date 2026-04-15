import { createHash } from "node:crypto";
import { mkdir, open, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface CandidateSnapshot {
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

interface RunSnapshot {
  runId: string;
  startedAt: string;
  analysisDir: string;
  legacyRoot: string;
  candidateCount: number;
  canonicalCount: number;
  candidates: CandidateSnapshot[];
}

const SAMPLE_BYTES = 256;

async function readSample(path: string): Promise<{ sampleHash: string; sampleHex: string }> {
  const handle = await open(path, "r");

  try {
    const buffer = Buffer.alloc(SAMPLE_BYTES);
    const { bytesRead } = await handle.read(buffer, 0, SAMPLE_BYTES, 0);
    const sample = buffer.subarray(0, bytesRead);
    return {
      sampleHash: createHash("sha256").update(sample).digest("hex"),
      sampleHex: sample.toString("hex")
    };
  } finally {
    await handle.close();
  }
}

export async function persistRawSnapshot(context: JobContext): Promise<{
  artifactsDir: string;
  snapshotPath: string;
}> {
  const artifactsDir = join(context.config.workDir, "runs", context.runId);
  const snapshotPath = join(artifactsDir, "raw-ingestion.json");
  const summaryPath = join(artifactsDir, "context.json");

  await mkdir(artifactsDir, { recursive: true });

  const candidates: CandidateSnapshot[] = [];

  for (const candidate of context.candidates) {
    try {
      const { sampleHash, sampleHex } = await readSample(candidate.sourcePath);
      candidates.push({
        fileCode: candidate.fileCode,
        sourcePath: candidate.sourcePath,
        sourceRole: candidate.sourceRole,
        score: candidate.score,
        fileSize: candidate.fileSize,
        fileMtime: candidate.fileMtime,
        exists: true,
        sampleHash,
        sampleHex
      });
    } catch (error) {
      candidates.push({
        fileCode: candidate.fileCode,
        sourcePath: candidate.sourcePath,
        sourceRole: candidate.sourceRole,
        score: candidate.score,
        fileSize: candidate.fileSize,
        fileMtime: candidate.fileMtime,
        exists: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  const payload: RunSnapshot = {
    runId: context.runId,
    startedAt: context.startedAt,
    analysisDir: context.config.analysisDir,
    legacyRoot: context.config.legacyRoot,
    candidateCount: candidates.length,
    canonicalCount: candidates.filter((candidate) => candidate.sourceRole === "canonical").length,
    candidates
  };

  await writeFile(snapshotPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  await writeFile(
    summaryPath,
    `${JSON.stringify(
      {
        runId: context.runId,
        startedAt: context.startedAt,
        artifactsDir,
        notes: context.notes
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  await mkdir(join(dirname(snapshotPath), "markers"), { recursive: true });
  await writeFile(join(dirname(snapshotPath), "markers", "raw-ingestion.complete"), "", "utf8");

  return {
    artifactsDir,
    snapshotPath
  };
}
