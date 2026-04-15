import { existsSync } from "node:fs";
import { resolve } from "node:path";

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
  const analysisDir = resolve(
    process.env.SYUSEN_ANALYSIS_DIR ?? "C:/agent/codex/syusen_analysis/20260414_165347"
  );
  const legacyRoot = resolve(process.env.SYUSEN_LEGACY_ROOT ?? "Z:/");
  const workDir = resolve(process.env.SYUSEN_WORK_DIR ?? "C:/agent/codex/syusen-cloud/data");
  const primaryFileCodes = splitCsv(process.env.SYUSEN_PRIMARY_CODES, [
    "SHDEN",
    "SHTOR",
    "SHSYO",
    "SHTKI",
    "SHNKI"
  ]);
  const secondaryFileCodes = splitCsv(process.env.SYUSEN_SECONDARY_CODES, [
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
