import { existsSync } from "node:fs";
import { basename, join } from "node:path";

import type { PipelineConfig } from "../config.js";
import type { LegacyFileCode } from "../domain/types.js";
import type { FileIngestionCandidate } from "../jobs/job-types.js";
import type { AnalysisManifestEntry } from "./analysis-reader.js";
import { readFileManifest } from "./analysis-reader.js";
import { attachSelectionMetadata } from "./selection.js";

const ALL_FILE_CODES: LegacyFileCode[] = [
  "SHDEN",
  "SHTOR",
  "SHSYO",
  "SHTKI",
  "SHNKI",
  "SHSUJ",
  "SHTNSUJ",
  "SHTEGATA",
  "SHZEI",
  "SHTAN",
  "SHTANT"
];

function resolveLegacyCode(entry: AnalysisManifestEntry): LegacyFileCode | undefined {
  const value = (
    entry.name ??
    entry.Name ??
    basename(entry.path ?? entry.fullPath ?? entry.FullName ?? "")
  ).toUpperCase();
  return ALL_FILE_CODES.find((code) => value.startsWith(code));
}

function resolveSourcePath(entry: AnalysisManifestEntry, legacyRoot: string): string {
  const rawPath = entry.path ?? entry.fullPath ?? entry.FullName ?? "";
  const normalized = rawPath.replace(/\\/g, "/");

  if (existsSync(rawPath)) {
    return rawPath;
  }

  const withoutDrive = normalized.replace(/^[A-Za-z]:\//, "");
  return join(legacyRoot, withoutDrive);
}

function resolveFileSize(entry: AnalysisManifestEntry): number {
  return entry.size ?? entry.length ?? entry.Length ?? 0;
}

function resolveFileMtime(entry: AnalysisManifestEntry): string {
  return (
    entry.lastWriteTime ?? entry.last_write_time ?? entry.LastWriteTime ?? new Date(0).toISOString()
  );
}

export async function buildCandidates(config: PipelineConfig): Promise<FileIngestionCandidate[]> {
  const manifest = await readFileManifest(config.analysisDir);
  const allowedCodes = new Set([...config.primaryFileCodes, ...config.secondaryFileCodes]);

  const candidates = manifest
    .map((entry) => {
      const fileCode = resolveLegacyCode(entry);
      if (!fileCode || !allowedCodes.has(fileCode)) {
        return undefined;
      }

      return {
        sourcePath: resolveSourcePath(entry, config.legacyRoot),
        fileCode,
        fileSize: resolveFileSize(entry),
        fileMtime: resolveFileMtime(entry)
      };
    })
    .filter((candidate): candidate is Omit<FileIngestionCandidate, "sourceRole" | "score"> =>
      Boolean(candidate)
    );

  return attachSelectionMetadata(candidates);
}
