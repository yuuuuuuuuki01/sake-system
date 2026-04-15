import "dotenv/config";

import { z } from "zod";

const LOG_LEVEL_VALUES = ["trace", "debug", "info", "warn", "error"] as const;

const emptyStringToUndefined = (value: unknown): unknown => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

const optionalString = z.preprocess(emptyStringToUndefined, z.string().optional());

const optionalPositiveInt = z.preprocess((value) => {
  const normalized = emptyStringToUndefined(value);
  if (normalized === undefined) {
    return undefined;
  }

  if (typeof normalized === "string") {
    return Number(normalized);
  }

  return normalized;
}, z.number().int().positive().optional());

const envSchema = z.object({
  DATABASE_URL: z.preprocess(emptyStringToUndefined, z.string().min(1)),
  FREEE_ACCESS_TOKEN: optionalString,
  FREEE_COMPANY_ID: optionalPositiveInt,
  FREEE_DRY_RUN: z.preprocess((value) => {
    const normalized = emptyStringToUndefined(value);
    if (normalized === undefined) {
      return false;
    }

    if (normalized === "true") {
      return true;
    }

    if (normalized === "false") {
      return false;
    }

    return normalized;
  }, z.boolean()),
  LOG_LEVEL: z.preprocess((value) => emptyStringToUndefined(value) ?? "info", z.enum(LOG_LEVEL_VALUES)),
  SLACK_WEBHOOK_URL: optionalString,
  SYUSEN_ANALYSIS_DIR: z.preprocess(
    (value) => emptyStringToUndefined(value) ?? "./references/analysis/current",
    z.string()
  ),
  SYUSEN_ANALYSIS_IMPORT_DIR: optionalString,
  SYUSEN_LEGACY_ROOT: z.preprocess(
    (value) => emptyStringToUndefined(value) ?? "./references/legacy-root",
    z.string()
  ),
  SYUSEN_WORK_DIR: z.preprocess((value) => emptyStringToUndefined(value) ?? "./data", z.string()),
  SYUSEN_PRIMARY_CODES: z.preprocess(
    (value) => emptyStringToUndefined(value) ?? "SHDEN,SHTOR,SHSYO,SHTKI,SHNKI",
    z.string()
  ),
  SYUSEN_SECONDARY_CODES: z.preprocess(
    (value) => emptyStringToUndefined(value) ?? "SHSUJ,SHTNSUJ,SHTEGATA,SHZEI,SHTAN,SHTANT",
    z.string()
  )
});

export function validateEnv(): { ok: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!process.env.DATABASE_URL?.trim()) {
    missing.push("DATABASE_URL");
  }

  return {
    ok: missing.length === 0,
    missing
  };
}

const validation = validateEnv();
if (!validation.ok) {
  throw new Error(`Missing required environment variables: ${validation.missing.join(", ")}`);
}

const env = envSchema.parse(process.env);

export const DATABASE_URL: string = env.DATABASE_URL;
export const FREEE_ACCESS_TOKEN: string | undefined = env.FREEE_ACCESS_TOKEN;
export const FREEE_COMPANY_ID: number | undefined = env.FREEE_COMPANY_ID;
export const FREEE_DRY_RUN: boolean = env.FREEE_DRY_RUN;
export const LOG_LEVEL: (typeof LOG_LEVEL_VALUES)[number] = env.LOG_LEVEL;
export const SLACK_WEBHOOK_URL: string | undefined = env.SLACK_WEBHOOK_URL;
export const SYUSEN_ANALYSIS_DIR: string = env.SYUSEN_ANALYSIS_DIR;
export const SYUSEN_ANALYSIS_IMPORT_DIR: string | undefined = env.SYUSEN_ANALYSIS_IMPORT_DIR;
export const SYUSEN_LEGACY_ROOT: string = env.SYUSEN_LEGACY_ROOT;
export const SYUSEN_WORK_DIR: string = env.SYUSEN_WORK_DIR;
export const SYUSEN_PRIMARY_CODES: string = env.SYUSEN_PRIMARY_CODES;
export const SYUSEN_SECONDARY_CODES: string = env.SYUSEN_SECONDARY_CODES;
