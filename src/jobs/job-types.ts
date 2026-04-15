import type { PipelineConfig } from "../config.js";
import type { LegacyFileCode } from "../domain/types.js";

export type JobName =
  | "discoverChangedFiles"
  | "ingestRawFiles"
  | "profileCanonicalFiles"
  | "probeFixedRecords"
  | "inspectMasterRecords"
  | "inspectTransactionRecords"
  | "draftSalesTransactionFields"
  | "extractSalesTransactionDraftFields"
  | "parseProvisionalSalesFields"
  | "parseMasterStubFields"
  | "mapMasterFieldHypotheses"
  | "draftNamedMasterFields"
  | "extractNamedMasterDraftFields"
  | "parseProvisionalMasterFields"
  | "normalizeMasters"
  | "normalizeSales"
  | "normalizePayments"
  | "refreshSalesMarts"
  | "refreshPaymentMarts"
  | "publishApiCache";

export interface FileIngestionCandidate {
  sourcePath: string;
  fileCode: LegacyFileCode;
  fileSize: number;
  fileMtime: string;
  sourceRole: "canonical" | "auxiliary";
  score: number;
  contentHash?: string;
}

export interface JobContext {
  runId: string;
  startedAt: string;
  config: PipelineConfig;
  candidates: FileIngestionCandidate[];
  artifactsDir?: string;
  notes: string[];
}

export interface JobResult {
  jobName: JobName;
  ok: boolean;
  detail: string;
}
