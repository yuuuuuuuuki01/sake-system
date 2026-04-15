import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

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

interface RawSnapshotArtifact {
  runId: string;
  startedAt: string;
  candidateCount: number;
  canonicalCount: number;
  candidates: RawCandidateSnapshot[];
}

interface OffsetValue {
  offset: number;
  hex: string;
  u16le?: number;
  u32le?: number;
}

interface CanonicalFileProfile {
  fileCode: string;
  sourcePath: string;
  fileSize: number;
  fileMtime: string;
  sampleHash?: string;
  sampleByteCount: number;
  printableAscii: string[];
  offsetValues: OffsetValue[];
  parserReadiness: "needs_layout_mapping" | "candidate_for_fixed_record_probe";
  notes: string[];
}

interface CanonicalProfileArtifact {
  runId: string;
  generatedAt: string;
  profiles: CanonicalFileProfile[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before profiling.");
  }

  return context.artifactsDir;
}

function toPrintableAscii(buffer: Buffer): string[] {
  const text = buffer
    .toString("latin1")
    .replace(/[^\x20-\x7E]+/g, "\n")
    .split("\n")
    .map((part) => part.trim())
    .filter((part) => part.length >= 4);

  return Array.from(new Set(text)).slice(0, 20);
}

function toOffsetValues(buffer: Buffer): OffsetValue[] {
  const values: OffsetValue[] = [];
  const maxOffset = Math.min(buffer.length, 64);

  for (let offset = 0; offset < maxOffset; offset += 4) {
    const slice = buffer.subarray(offset, Math.min(offset + 4, buffer.length));
    const value: OffsetValue = {
      offset,
      hex: slice.toString("hex")
    };

    if (slice.length >= 2) {
      value.u16le = slice.readUInt16LE(0);
    }

    if (slice.length >= 4) {
      value.u32le = slice.readUInt32LE(0);
    }

    values.push(value);
  }

  return values;
}

function parserReadinessFor(fileCode: string): CanonicalFileProfile["parserReadiness"] {
  if (["SHSYO", "SHTKI", "SHZEI", "SHTAN"].includes(fileCode)) {
    return "candidate_for_fixed_record_probe";
  }

  return "needs_layout_mapping";
}

function notesFor(fileCode: string): string[] {
  switch (fileCode) {
    case "SHSYO":
      return [
        "Primary product master candidate.",
        "JAN extraction should start here before CYENSTORE side tables."
      ];
    case "SHTKI":
      return [
        "Primary customer master candidate.",
        "Used by both sales entry and payment entry flows."
      ];
    case "SHDEN":
      return [
        "Likely sales header data.",
        "Field-level parsing should confirm document number, customer code, and dates."
      ];
    case "SHTOR":
      return [
        "Likely sales line data.",
        "Field-level parsing should confirm document number linkage and line sequencing."
      ];
    case "SHNKI":
      return [
        "Lead payment receipt candidate.",
        "Likely contains customer code, receipt date, and amount."
      ];
    default:
      return ["Profile generated for parser preparation."];
  }
}

export async function writeCanonicalProfiles(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const rawIngestionPath = join(artifactsDir, "raw-ingestion.json");
  const content = await readFile(rawIngestionPath, "utf8");
  const rawArtifact = JSON.parse(content) as RawSnapshotArtifact;

  const profiles: CanonicalFileProfile[] = rawArtifact.candidates
    .filter((candidate) => candidate.sourceRole === "canonical")
    .map((candidate) => {
      const sample = Buffer.from(candidate.sampleHex ?? "", "hex");
      return {
        fileCode: candidate.fileCode,
        sourcePath: candidate.sourcePath,
        fileSize: candidate.fileSize,
        fileMtime: candidate.fileMtime,
        sampleHash: candidate.sampleHash,
        sampleByteCount: sample.length,
        printableAscii: toPrintableAscii(sample),
        offsetValues: toOffsetValues(sample),
        parserReadiness: parserReadinessFor(candidate.fileCode),
        notes: notesFor(candidate.fileCode)
      };
    });

  const payload: CanonicalProfileArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    profiles
  };

  const profileDir = join(artifactsDir, "profiles");
  const targetPath = join(profileDir, "canonical-file-profiles.json");
  await mkdir(profileDir, { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
