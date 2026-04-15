import { existsSync } from "node:fs";
import { resolve } from "node:path";

import {
  SYUSEN_ANALYSIS_DIR,
  SYUSEN_LEGACY_ROOT,
  SYUSEN_PRIMARY_CODES,
  SYUSEN_SECONDARY_CODES,
  SYUSEN_WORK_DIR
} from "./env.js";

export interface PipelineConfig {
  analysisDir: string;
  legacyRoot: string;
  workDir: string;
  primaryFileCodes: string[];
  secondaryFileCodes: string[];
}

function splitCsv(value: string | undefined, fallback: string[]): string[] {
  if (!value) {
    return fallback;
  }

  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function loadConfig(): PipelineConfig {
  const analysisDir = resolve(SYUSEN_ANALYSIS_DIR);
  const legacyRoot = resolve(SYUSEN_LEGACY_ROOT);
  const workDir = resolve(SYUSEN_WORK_DIR);
  const primaryFileCodes = splitCsv(SYUSEN_PRIMARY_CODES, [
    "SHDEN",
    "SHTOR",
    "SHSYO",
    "SHTKI",
    "SHNKI"
  ]);
  const secondaryFileCodes = splitCsv(SYUSEN_SECONDARY_CODES, [
    "SHSUJ",
    "SHTNSUJ",
    "SHTEGATA",
    "SHZEI",
    "SHTAN",
    "SHTANT"
  ]);

  if (!existsSync(analysisDir)) {
    throw new Error(`Analysis directory not found: ${analysisDir}`);
  }

  return {
    analysisDir,
    legacyRoot,
    workDir,
    primaryFileCodes,
    secondaryFileCodes
  };
}
