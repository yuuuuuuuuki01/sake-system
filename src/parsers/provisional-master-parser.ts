import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface MasterDraftExtractionArtifact {
  runId: string;
  generatedAt: string;
  files: MasterDraftExtraction[];
}

interface MasterDraftExtraction {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  firstPayloadStartOffset: number;
  extractedRecords: ExtractedRecord[];
}

interface ExtractedRecord {
  recordIndex: number;
  payloadStartOffset: number;
  values: ExtractedFieldValue[];
}

interface ExtractedFieldValue {
  fieldName: string;
  offset: number;
  widthBytes: number;
  confidence: "low" | "medium";
  hex: string;
  u16?: number;
  u32?: number;
  asciiPreview: string;
}

interface ProvisionalFieldValue {
  rawHex: string;
  numericCandidate?: number;
  numericDisplay?: string;
  asciiCandidate?: string;
}

interface ProvisionalProductRecord {
  recordIndex: number;
  payloadStartOffset: number;
  productCodeCandidate?: string;
  productCodeSource?: string;
  janCandidate?: string;
  janSource?: string;
  rawFields: Record<string, ProvisionalFieldValue>;
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
  rawFields: Record<string, ProvisionalFieldValue>;
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

interface ProvisionalMasterParserArtifact {
  runId: string;
  generatedAt: string;
  outputs: Array<ProvisionalProductOutput | ProvisionalCustomerOutput>;
  notes: string[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before provisional parsing.");
  }

  return context.artifactsDir;
}

function pickNumericCandidate(value: ExtractedFieldValue): number | undefined {
  const candidates = [value.u32, value.u16].filter((item): item is number => item !== undefined);
  return candidates.find((item) => item > 0 && item < 100_000_000);
}

function pickAsciiCandidate(value: ExtractedFieldValue): string | undefined {
  const normalized = value.asciiPreview.replace(/[^0-9A-Za-z]/g, "");
  return normalized.length >= 3 ? normalized : undefined;
}

function toFieldValue(value: ExtractedFieldValue): ProvisionalFieldValue {
  const numericCandidate = pickNumericCandidate(value);
  const asciiCandidate = pickAsciiCandidate(value);

  return {
    rawHex: value.hex,
    numericCandidate,
    numericDisplay: numericCandidate !== undefined ? String(numericCandidate) : undefined,
    asciiCandidate
  };
}

function chooseCodeCandidate(
  fields: Record<string, ProvisionalFieldValue>,
  preferredFields: string[]
): { value?: string; source?: string } {
  for (const fieldName of preferredFields) {
    const field = fields[fieldName];
    if (!field) {
      continue;
    }

    if (field.asciiCandidate && /^\d{3,}$/.test(field.asciiCandidate)) {
      return { value: field.asciiCandidate, source: `${fieldName}:ascii` };
    }

    if (field.numericDisplay && /^\d{1,8}$/.test(field.numericDisplay)) {
      return { value: field.numericDisplay, source: `${fieldName}:numeric` };
    }
  }

  return {};
}

function chooseDayCandidate(
  fields: Record<string, ProvisionalFieldValue>,
  preferredFields: string[]
): { value?: number; source?: string } {
  for (const fieldName of preferredFields) {
    const field = fields[fieldName];
    if (!field || field.numericCandidate === undefined) {
      continue;
    }

    if (field.numericCandidate >= 1 && field.numericCandidate <= 31) {
      return { value: field.numericCandidate, source: `${fieldName}:numeric` };
    }
  }

  return {};
}

function parseProducts(file: MasterDraftExtraction): ProvisionalProductOutput {
  return {
    fileCode: "SHSYO",
    sourcePath: file.sourcePath,
    records: file.extractedRecords.map((record) => {
      const rawFields = Object.fromEntries(
        record.values.map((value) => [value.fieldName, toFieldValue(value)])
      );
      const productCode = chooseCodeCandidate(rawFields, [
        "legacy_product_code_primary",
        "legacy_product_code_secondary"
      ]);
      const janCode = chooseCodeCandidate(rawFields, [
        "jan_or_external_code_part_b",
        "jan_or_external_code_part_a"
      ]);

      return {
        recordIndex: record.recordIndex,
        payloadStartOffset: record.payloadStartOffset,
        productCodeCandidate: productCode.value,
        productCodeSource: productCode.source,
        janCandidate: janCode.value,
        janSource: janCode.source,
        rawFields
      };
    })
  };
}

function parseCustomers(file: MasterDraftExtraction): ProvisionalCustomerOutput {
  return {
    fileCode: "SHTKI",
    sourcePath: file.sourcePath,
    records: file.extractedRecords.map((record) => {
      const rawFields = Object.fromEntries(
        record.values.map((value) => [value.fieldName, toFieldValue(value)])
      );
      const customerCode = chooseCodeCandidate(rawFields, [
        "legacy_customer_code_primary",
        "legacy_customer_code_secondary"
      ]);
      const closingDay = chooseDayCandidate(rawFields, ["billing_rule_or_closing_day"]);
      const collectionRule = chooseDayCandidate(rawFields, ["collection_rule_or_payment_day"]);

      return {
        recordIndex: record.recordIndex,
        payloadStartOffset: record.payloadStartOffset,
        customerCodeCandidate: customerCode.value,
        customerCodeSource: customerCode.source,
        closingDayCandidate: closingDay.value,
        closingDaySource: closingDay.source,
        collectionRuleCandidate: collectionRule.value,
        collectionRuleSource: collectionRule.source,
        rawFields
      };
    })
  };
}

export async function writeProvisionalMasterParser(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const extractPath = join(artifactsDir, "profiles", "master-draft-extract.json");
  const artifact = JSON.parse(await readFile(extractPath, "utf8")) as MasterDraftExtractionArtifact;

  const outputs = artifact.files.reduce<
    Array<ProvisionalProductOutput | ProvisionalCustomerOutput>
  >((items, file) => {
    if (file.fileCode === "SHSYO") {
      items.push(parseProducts(file));
    } else if (file.fileCode === "SHTKI") {
      items.push(parseCustomers(file));
    }

    return items;
  }, []);

  const payload: ProvisionalMasterParserArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    outputs,
    notes: [
      "This artifact is still heuristic and intended to bridge raw field hypotheses into named candidate values.",
      "Product code, customer code, and billing-term candidates should be validated against known business output before core ingestion."
    ]
  };

  const targetPath = join(artifactsDir, "profiles", "provisional-master-parser.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
