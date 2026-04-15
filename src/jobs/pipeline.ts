import { loadConfig } from "../config.js";
import { buildCandidates } from "../discovery/candidate-builder.js";
import { persistRawSnapshot } from "../ingestion/raw-snapshot.js";
import { writeMasterSnapshot } from "../normalization/master-snapshot.js";
import {
  readNormalizationArtifact,
  writeMasterNormalizationPlan,
  writePaymentNormalizationPlan,
  writeSalesNormalizationPlan
} from "../normalization/plans.js";
import { writeMasterDraftExtraction } from "../parsers/extract-master-draft.js";
import { writeFixedRecordProbe } from "../parsers/fixed-record-probe.js";
import { writeMasterFieldHypotheses } from "../parsers/master-field-hypotheses.js";
import { writeMasterRecordInspection } from "../parsers/master-record-inspection.js";
import { writeMasterStubParsers } from "../parsers/master-stub-parser.js";
import { writeNamedMasterDraft } from "../parsers/named-master-draft.js";
import { writeCanonicalProfiles } from "../parsers/profile.js";
import { writeProvisionalMasterParser } from "../parsers/provisional-master-parser.js";
import { writeTransactionRecordInspection } from "../parsers/transaction-record-inspection.js";
import type { JobContext, JobName, JobResult } from "./job-types.js";

const orderedJobs: JobName[] = [
  "discoverChangedFiles",
  "ingestRawFiles",
  "profileCanonicalFiles",
  "probeFixedRecords",
  "inspectMasterRecords",
  "inspectTransactionRecords",
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
  "publishApiCache"
];

function createContext(): JobContext {
  const config = loadConfig();

  return {
    runId: `run_${Date.now()}`,
    startedAt: new Date().toISOString(),
    config,
    candidates: [],
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

  return matched
    .map((candidate) => `${candidate.fileCode}:${candidate.sourcePath}`)
    .join(", ");
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
    case "ingestRawFiles":
      {
        const { artifactsDir, snapshotPath } = await persistRawSnapshot(context);
        context.artifactsDir = artifactsDir;
        return {
          jobName,
          ok: true,
          detail: `Persisted raw ingestion snapshot for ${context.candidates.length} candidates at ${snapshotPath}.`
        };
      }
    case "normalizeMasters":
      {
        const targetPath = await writeMasterNormalizationPlan(context);
        const snapshotPath = await writeMasterSnapshot(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote master normalization plan to ${targetPath}. Sources: ${summarizeCandidates(context, [
            "SHSYO",
            "SHTKI",
            "SHZEI",
            "SHTAN",
            "SHTANT"
          ])}. Snapshot: ${snapshotPath}`
        };
      }
    case "profileCanonicalFiles":
      {
        const targetPath = await writeCanonicalProfiles(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote canonical file profiles to ${targetPath}.`
        };
      }
    case "probeFixedRecords":
      {
        const targetPath = await writeFixedRecordProbe(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote fixed-record probe results to ${targetPath}.`
        };
      }
    case "inspectMasterRecords":
      {
        const targetPath = await writeMasterRecordInspection(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote master record inspection artifact to ${targetPath}.`
        };
      }
    case "inspectTransactionRecords":
      {
        const targetPath = await writeTransactionRecordInspection(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote transaction record inspection artifact to ${targetPath}.`
        };
      }
    case "parseMasterStubFields":
      {
        const targetPath = await writeMasterStubParsers(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote master stub parser artifact to ${targetPath}.`
        };
      }
    case "mapMasterFieldHypotheses":
      {
        const targetPath = await writeMasterFieldHypotheses(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote master field hypothesis artifact to ${targetPath}.`
        };
      }
    case "draftNamedMasterFields":
      {
        const targetPath = await writeNamedMasterDraft(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote named master draft artifact to ${targetPath}.`
        };
      }
    case "extractNamedMasterDraftFields":
      {
        const targetPath = await writeMasterDraftExtraction(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote named master draft extraction artifact to ${targetPath}.`
        };
      }
    case "parseProvisionalMasterFields":
      {
        const targetPath = await writeProvisionalMasterParser(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote provisional master parser artifact to ${targetPath}.`
        };
      }
    case "normalizeSales":
      {
        const targetPath = await writeSalesNormalizationPlan(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote sales normalization plan to ${targetPath}. Sources: ${summarizeCandidates(context, ["SHDEN", "SHTOR"])}`
        };
      }
    case "normalizePayments":
      {
        const targetPath = await writePaymentNormalizationPlan(context);
        return {
          jobName,
          ok: true,
          detail: `Wrote payment normalization plan to ${targetPath}. Sources: ${summarizeCandidates(context, [
            "SHNKI",
            "SHSUJ",
            "SHTNSUJ",
            "SHTEGATA"
          ])}`
        };
      }
    case "refreshSalesMarts":
      {
        const artifact = await readNormalizationArtifact(context, "sales.plan.json");
        return {
          jobName,
          ok: true,
          detail: `Prepared sales mart refresh inputs from ${artifact.entities.length} normalized sales entities.`
        };
      }
    case "refreshPaymentMarts":
      {
        const artifact = await readNormalizationArtifact(context, "payments.plan.json");
        return {
          jobName,
          ok: true,
          detail: `Prepared payment mart refresh inputs from ${artifact.entities.length} normalized payment entities.`
        };
      }
    case "publishApiCache":
      return {
        jobName,
        ok: true,
        detail: "TODO: publish cache snapshots for dashboard and API consumers."
      };
    default: {
      const exhaustive: never = jobName;
      throw new Error(`Unhandled job: ${exhaustive}`);
    }
  }
}

async function main(): Promise<void> {
  const context = createContext();
  console.log(`[pipeline] start ${context.runId}`);

  for (const note of context.notes) {
    console.log(`[pipeline] note: ${note}`);
  }

  for (const jobName of orderedJobs) {
    const result = await executeJob(jobName, context);
    console.log(`[pipeline] ${result.jobName}: ${result.ok ? "ok" : "ng"} - ${result.detail}`);

    if (jobName === "discoverChangedFiles") {
      for (const candidate of context.candidates) {
        console.log(
          `[pipeline] candidate ${candidate.fileCode} role=${candidate.sourceRole} score=${candidate.score} ${candidate.sourcePath} size=${candidate.fileSize} mtime=${candidate.fileMtime}`
        );
      }
    }

    if (!result.ok) {
      process.exitCode = 1;
      break;
    }
  }

  console.log(`[pipeline] done ${context.runId}`);
  if (context.artifactsDir) {
    console.log(`[pipeline] artifacts ${context.artifactsDir}`);
  }
}

main().catch((error) => {
  console.error("[pipeline] fatal", error);
  process.exitCode = 1;
});
