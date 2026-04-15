import { loadConfig } from "../config.js";
import { buildCandidates } from "../discovery/candidate-builder.js";
import { persistRawSnapshot } from "../ingestion/raw-snapshot.js";
import { createLogger, logger } from "../logger.js";
import { writeApiCache } from "./api-cache.js";
import { writeMasterSnapshot } from "../normalization/master-snapshot.js";
import {
  writeMasterNormalizationPlan,
  writePaymentNormalizationPlan,
  writeSalesNormalizationPlan
} from "../normalization/plans.js";
import { refreshPaymentMarts } from "./payment-mart.js";
import { writeMasterDraftExtraction } from "../parsers/extract-master-draft.js";
import { writeFixedRecordProbe } from "../parsers/fixed-record-probe.js";
import { writeMasterFieldHypotheses } from "../parsers/master-field-hypotheses.js";
import { writeMasterRecordInspection } from "../parsers/master-record-inspection.js";
import { writeMasterStubParsers } from "../parsers/master-stub-parser.js";
import { writeNamedMasterDraft } from "../parsers/named-master-draft.js";
import { writeCanonicalProfiles } from "../parsers/profile.js";
import { writeProvisionalMasterParser } from "../parsers/provisional-master-parser.js";
import { writeNamedSalesTransactionDraft } from "../parsers/sales-transaction-draft.js";
import { writeSalesTransactionDraftExtraction } from "../parsers/sales-transaction-extract.js";
import { writeProvisionalSalesParser } from "../parsers/provisional-sales-parser.js";
import { writeTransactionRecordInspection } from "../parsers/transaction-record-inspection.js";
import { runFreeeExport } from "./freee-export.js";
import { refreshSalesMarts } from "./sales-mart.js";
import { notifyPipelineComplete, notifyPipelineError } from "../notifications/index.js";
import type { JobContext, JobName, JobResult } from "./job-types.js";

const orderedJobs: JobName[] = [
  "discoverChangedFiles",
  "ingestRawFiles",
  "profileCanonicalFiles",
  "probeFixedRecords",
  "inspectMasterRecords",
  "inspectTransactionRecords",
  "draftSalesTransactionFields",
  "extractSalesTransactionDraftFields",
  "parseProvisionalSalesFields",
  "parseMasterStubFields",
  "mapMasterFieldHypotheses",
  "draftNamedMasterFields",
  "extractNamedMasterDraftFields",
  "parseProvisionalMasterFields",
  "normalizeMasters",
  "normalizeSales",
  "normalizePayments",
  "refreshSalesMarts",
  "refreshPaymentMarts",
  "freeeExport",
  "publishApiCache"
];

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

function createContext(): JobContext {
  const config = loadConfig();

  return {
    runId: `run_${Date.now()}`,
    startedAt: new Date().toISOString(),
    config,
    candidates: [],
    jobResults: [],
    notes: [
      "MVP assumes the legacy Syusen system remains the source of truth.",
      `Primary sync scope: ${config.primaryFileCodes.join(", ")}.`,
      `Secondary sync scope: ${config.secondaryFileCodes.join(", ")}.`,
      `Analysis source: ${config.analysisDir}`,
      `Legacy root: ${config.legacyRoot}`,
      `Work dir: ${config.workDir}`
    ]
  };
}

function summarizeCandidates(context: JobContext, codes: string[]): string {
  const matched = context.candidates.filter(
    (candidate) => codes.includes(candidate.fileCode) && candidate.sourceRole === "canonical"
  );
  if (matched.length === 0) {
    return "no matching files discovered";
  }

  return matched.map((candidate) => `${candidate.fileCode}:${candidate.sourcePath}`).join(", ");
}

async function executeJob(jobName: JobName, context: JobContext): Promise<JobResult> {
  switch (jobName) {
    case "discoverChangedFiles": {
      context.candidates = await buildCandidates(context.config);
      return {
        jobName,
        ok: true,
        detail: `Discovered ${context.candidates.length} legacy candidates from analysis output.`
      };
    }
    case "ingestRawFiles": {
      const { artifactsDir, snapshotPath } = await persistRawSnapshot(context);
      context.artifactsDir = artifactsDir;
      return {
        jobName,
        ok: true,
        detail: `Persisted raw ingestion snapshot for ${context.candidates.length} candidates at ${snapshotPath}.`
      };
    }
    case "normalizeMasters": {
      const targetPath = await writeMasterNormalizationPlan(context);
      const snapshotPath = await writeMasterSnapshot(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote master normalization plan to ${targetPath}. Sources: ${summarizeCandidates(
          context,
          ["SHSYO", "SHTKI", "SHZEI", "SHTAN", "SHTANT"]
        )}. Snapshot: ${snapshotPath}`
      };
    }
    case "profileCanonicalFiles": {
      const targetPath = await writeCanonicalProfiles(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote canonical file profiles to ${targetPath}.`
      };
    }
    case "probeFixedRecords": {
      const targetPath = await writeFixedRecordProbe(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote fixed-record probe results to ${targetPath}.`
      };
    }
    case "inspectMasterRecords": {
      const targetPath = await writeMasterRecordInspection(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote master record inspection artifact to ${targetPath}.`
      };
    }
    case "inspectTransactionRecords": {
      const targetPath = await writeTransactionRecordInspection(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote transaction record inspection artifact to ${targetPath}.`
      };
    }
    case "draftSalesTransactionFields": {
      const targetPath = await writeNamedSalesTransactionDraft(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote sales transaction draft artifact to ${targetPath}.`
      };
    }
    case "extractSalesTransactionDraftFields": {
      const targetPath = await writeSalesTransactionDraftExtraction(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote sales transaction draft extraction artifact to ${targetPath}.`
      };
    }
    case "parseProvisionalSalesFields": {
      const targetPath = await writeProvisionalSalesParser(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote provisional sales parser artifact to ${targetPath}.`
      };
    }
    case "parseMasterStubFields": {
      const targetPath = await writeMasterStubParsers(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote master stub parser artifact to ${targetPath}.`
      };
    }
    case "mapMasterFieldHypotheses": {
      const targetPath = await writeMasterFieldHypotheses(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote master field hypothesis artifact to ${targetPath}.`
      };
    }
    case "draftNamedMasterFields": {
      const targetPath = await writeNamedMasterDraft(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote named master draft artifact to ${targetPath}.`
      };
    }
    case "extractNamedMasterDraftFields": {
      const targetPath = await writeMasterDraftExtraction(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote named master draft extraction artifact to ${targetPath}.`
      };
    }
    case "parseProvisionalMasterFields": {
      const targetPath = await writeProvisionalMasterParser(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote provisional master parser artifact to ${targetPath}.`
      };
    }
    case "normalizeSales": {
      const targetPath = await writeSalesNormalizationPlan(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote sales normalization plan to ${targetPath}. Sources: ${summarizeCandidates(context, ["SHDEN", "SHTOR"])}`
      };
    }
    case "normalizePayments": {
      const targetPath = await writePaymentNormalizationPlan(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote payment normalization plan to ${targetPath}. Sources: ${summarizeCandidates(
          context,
          ["SHNKI", "SHSUJ", "SHTNSUJ", "SHTEGATA"]
        )}`
      };
    }
    case "refreshSalesMarts": {
      const summary = await refreshSalesMarts(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote daily sales mart with ${summary.length} sales-date summaries.`
      };
    }
    case "refreshPaymentMarts": {
      const rows = await refreshPaymentMarts(context);
      return {
        jobName,
        ok: true,
        detail: `Wrote customer payment status mart with ${rows.length} rows.`
      };
    }
    case "freeeExport":
      return runFreeeExport(context);
    case "publishApiCache": {
      const apiDir = await writeApiCache(context);
      return {
        jobName,
        ok: true,
        detail: `Published API cache snapshots to ${apiDir}.`
      };
    }
    default: {
      const exhaustive: never = jobName;
      throw new Error(`Unhandled job: ${exhaustive}`);
    }
  }
}

async function main(): Promise<void> {
  const context = createContext();
  const startedAtMs = Date.now();
  const pipelineLogger = createLogger({ scope: "pipeline", runId: context.runId });
  pipelineLogger.info({ startedAt: context.startedAt }, "pipeline start");

  for (const note of context.notes) {
    pipelineLogger.info({ note }, "pipeline note");
  }

  for (const jobName of orderedJobs) {
    const jobLogger = createLogger({ scope: "pipeline", runId: context.runId, jobName });
    const jobStartedAtMs = Date.now();
    jobLogger.info({ jobName, runId: context.runId }, "job start");

    try {
      const result = await executeJob(jobName, context);
      const durationMs = Date.now() - jobStartedAtMs;
      context.jobResults.push(result);

      if (jobName === "discoverChangedFiles") {
        for (const candidate of context.candidates) {
          pipelineLogger.info({ candidate }, "pipeline candidate");
        }
      }

      if (!result.ok) {
        const err = new Error(result.detail);
        jobLogger.error(
          { jobName, runId: context.runId, durationMs, detail: result.detail, err },
          "job failed"
        );

        try {
          await notifyPipelineError(context.runId, result.jobName, err);
        } catch (notificationError) {
          pipelineLogger.error({ err: toError(notificationError) }, "slack notification failed");
        }
        process.exitCode = 1;
        break;
      }

      jobLogger.info(
        { jobName, runId: context.runId, durationMs, detail: result.detail },
        "job end"
      );
    } catch (error) {
      const err = toError(error);
      const durationMs = Date.now() - jobStartedAtMs;
      jobLogger.error({ jobName, runId: context.runId, durationMs, err }, "job failed");

      try {
        await notifyPipelineError(context.runId, jobName, err);
      } catch (notificationError) {
        pipelineLogger.error({ err: toError(notificationError) }, "slack notification failed");
      }

      throw err;
    }
  }

  pipelineLogger.info(
    { runId: context.runId, durationMs: Date.now() - startedAtMs },
    "pipeline done"
  );
  if (context.artifactsDir) {
    pipelineLogger.info({ artifactsDir: context.artifactsDir }, "pipeline artifacts");
  }

  if (process.exitCode !== 1) {
    try {
      await notifyPipelineComplete(
        context.runId,
        context.jobResults.length,
        Date.now() - startedAtMs
      );
    } catch (notificationError) {
      pipelineLogger.error({ err: toError(notificationError) }, "slack notification failed");
    }
  }
}

main().catch((error) => {
  logger.error({ err: toError(error) }, "pipeline fatal");
  process.exitCode = 1;
});
