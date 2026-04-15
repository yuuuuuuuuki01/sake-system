import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface ProvisionalMasterParserArtifact {
  runId: string;
  generatedAt: string;
  outputs: Array<ProvisionalProductOutput | ProvisionalCustomerOutput>;
}

interface ProvisionalProductOutput {
  fileCode: "SHSYO";
  sourcePath: string;
  records: ProvisionalProductRecord[];
}

interface ProvisionalCustomerOutput {
  fileCode: "SHTKI";
  sourcePath: string;
  records: ProvisionalCustomerRecord[];
}

interface ProvisionalProductRecord {
  recordIndex: number;
  payloadStartOffset: number;
  productCodeCandidate?: string;
  productCodeSource?: string;
  janCandidate?: string;
  janSource?: string;
}

interface ProvisionalCustomerRecord {
  recordIndex: number;
  payloadStartOffset: number;
  customerCodeCandidate?: string;
  customerCodeSource?: string;
  closingDayCandidate?: number;
  closingDaySource?: string;
  collectionRuleCandidate?: number;
  collectionRuleSource?: string;
}

interface NormalizedProductRecord {
  legacyProductCode: string;
  productCodeConfidence: "provisional";
  janCode?: string;
  janCodeConfidence?: "provisional";
  sourcePath: string;
  recordIndex: number;
  payloadStartOffset: number;
  productCodeSource?: string;
  janCodeSource?: string;
}

interface NormalizedCustomerRecord {
  legacyCustomerCode: string;
  customerCodeConfidence: "provisional";
  closingDay?: number;
  collectionRule?: number;
  sourcePath: string;
  recordIndex: number;
  payloadStartOffset: number;
  customerCodeSource?: string;
  closingDaySource?: string;
  collectionRuleSource?: string;
}

interface MasterSnapshotArtifact {
  runId: string;
  generatedAt: string;
  products: NormalizedProductRecord[];
  customers: NormalizedCustomerRecord[];
  notes: string[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before master snapshot.");
  }

  return context.artifactsDir;
}

function isUsefulCode(value?: string): value is string {
  return Boolean(value && /^[0-9A-Za-z]{1,16}$/.test(value) && value !== "0");
}

function isUsefulJan(value?: string): value is string {
  return Boolean(value && /^[0-9]{3,13}$/.test(value));
}

export async function writeMasterSnapshot(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const provisionalPath = join(artifactsDir, "profiles", "provisional-master-parser.json");
  const provisional = JSON.parse(
    await readFile(provisionalPath, "utf8")
  ) as ProvisionalMasterParserArtifact;

  const products: NormalizedProductRecord[] = [];
  const customers: NormalizedCustomerRecord[] = [];

  for (const output of provisional.outputs) {
    if (output.fileCode === "SHSYO") {
      for (const record of output.records) {
        if (!isUsefulCode(record.productCodeCandidate)) {
          continue;
        }

        products.push({
          legacyProductCode: record.productCodeCandidate,
          productCodeConfidence: "provisional",
          janCode: isUsefulJan(record.janCandidate) ? record.janCandidate : undefined,
          janCodeConfidence: isUsefulJan(record.janCandidate) ? "provisional" : undefined,
          sourcePath: output.sourcePath,
          recordIndex: record.recordIndex,
          payloadStartOffset: record.payloadStartOffset,
          productCodeSource: record.productCodeSource,
          janCodeSource: isUsefulJan(record.janCandidate) ? record.janSource : undefined
        });
      }
      continue;
    }

    for (const record of output.records) {
      if (!isUsefulCode(record.customerCodeCandidate)) {
        continue;
      }

      customers.push({
        legacyCustomerCode: record.customerCodeCandidate,
        customerCodeConfidence: "provisional",
        closingDay: record.closingDayCandidate,
        collectionRule: record.collectionRuleCandidate,
        sourcePath: output.sourcePath,
        recordIndex: record.recordIndex,
        payloadStartOffset: record.payloadStartOffset,
        customerCodeSource: record.customerCodeSource,
        closingDaySource: record.closingDaySource,
        collectionRuleSource: record.collectionRuleSource
      });
    }
  }

  const payload: MasterSnapshotArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    products,
    customers,
    notes: [
      "This snapshot is generated from provisional master parser output and should be treated as a draft core-ingestion bridge.",
      "Use it to validate candidate product and customer codes before implementing full fixed-layout parsers."
    ]
  };

  const normalizationDir = join(artifactsDir, "normalization");
  const targetPath = join(normalizationDir, "masters.snapshot.json");
  await mkdir(normalizationDir, { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
