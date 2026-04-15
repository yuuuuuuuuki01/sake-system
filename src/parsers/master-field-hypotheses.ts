import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface ParsedSlot {
  offset: number;
  hex: string;
  u16le?: number;
  u32le?: number;
}

interface ParsedRecordStub {
  recordIndex: number;
  startOffset: number;
  first128Hex: string;
  candidateCodeSlots: Record<string, number | undefined>;
  slots: ParsedSlot[];
}

interface ParsedMasterStub {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  firstPayloadRecordIndex: number;
  firstPayloadStartOffset: number;
  records: ParsedRecordStub[];
  notes: string[];
}

interface ParsedMasterStubArtifact {
  runId: string;
  generatedAt: string;
  parsers: ParsedMasterStub[];
}

interface OffsetHypothesis {
  offset: number;
  u16UniqueCount: number;
  u32UniqueCount: number;
  minU16?: number;
  maxU16?: number;
  minU32?: number;
  maxU32?: number;
  zeroCount: number;
  sampleValues: number[];
  label: string;
  reason: string;
}

interface MasterFieldHypothesis {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  hypotheses: OffsetHypothesis[];
}

interface MasterFieldHypothesisArtifact {
  runId: string;
  generatedAt: string;
  files: MasterFieldHypothesis[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before field mapping.");
  }

  return context.artifactsDir;
}

function buildHypothesis(fileCode: string, offset: number, values: number[]): OffsetHypothesis | undefined {
  const unique = Array.from(new Set(values));
  const zeroCount = values.filter((value) => value === 0).length;
  const min = unique.length > 0 ? Math.min(...unique) : undefined;
  const max = unique.length > 0 ? Math.max(...unique) : undefined;

  if (unique.length <= 1 && zeroCount === values.length) {
    return undefined;
  }

  let label = "candidate_numeric_field";
  let reason = "Varies across sampled records and may represent a persisted business value.";

  if (fileCode === "SHSYO") {
    if (offset === 0 || offset === 8) {
      label = "candidate_product_code";
      reason = "Low-order values vary per record and are strong anchors for a product key candidate.";
    } else if (offset === 28 || offset === 32) {
      label = "candidate_jan_or_external_code";
      reason = "Values vary across product records and were already flagged as JAN/external-code hints in the stub parser.";
    } else if ((min ?? 0) > 1000 && (max ?? 0) < 60000) {
      label = "candidate_lookup_or_category_code";
      reason = "Stable mid-range integers may encode category, tax, or lookup references.";
    }
  }

  if (fileCode === "SHTKI") {
    if (offset === 0 || offset === 4 || offset === 8) {
      label = "candidate_customer_code";
      reason = "Early record offsets vary heavily and are plausible customer identity anchors.";
    } else if (offset === 28) {
      label = "candidate_closing_day_or_billing_rule";
      reason = "This offset was pre-flagged as a closing-day hint and varies in a bounded way.";
    } else if (offset === 32) {
      label = "candidate_payment_day_or_collection_rule";
      reason = "This offset was pre-flagged as a payment-day hint and varies independently.";
    } else if ((min ?? 0) > 0 && (max ?? 0) <= 366) {
      label = "candidate_day_or_term_value";
      reason = "Small positive integers may encode closing, payment, or billing term values.";
    }
  }

  return {
    offset,
    u16UniqueCount: unique.length,
    u32UniqueCount: unique.length,
    minU16: min,
    maxU16: max,
    minU32: min,
    maxU32: max,
    zeroCount,
    sampleValues: unique.slice(0, 8),
    label,
    reason
  };
}

function rankHypotheses(hypotheses: OffsetHypothesis[]): OffsetHypothesis[] {
  return hypotheses.sort((left, right) => {
    const score = (item: OffsetHypothesis): number => {
      let base = item.u16UniqueCount;
      if (item.label.includes("code")) {
        base += 100;
      }
      if (item.label.includes("day") || item.label.includes("billing")) {
        base += 75;
      }
      return base - item.zeroCount;
    };

    return score(right) - score(left) || left.offset - right.offset;
  });
}

export async function writeMasterFieldHypotheses(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const stubPath = join(artifactsDir, "profiles", "master-stub-parser.json");
  const content = await readFile(stubPath, "utf8");
  const artifact = JSON.parse(content) as ParsedMasterStubArtifact;

  const files: MasterFieldHypothesis[] = artifact.parsers.map((parser) => {
    const offsetMap = new Map<number, number[]>();

    for (const record of parser.records) {
      for (const slot of record.slots) {
        if (slot.u16le === undefined) {
          continue;
        }
        const current = offsetMap.get(slot.offset) ?? [];
        current.push(slot.u16le);
        offsetMap.set(slot.offset, current);
      }
    }

    const hypotheses = rankHypotheses(
      Array.from(offsetMap.entries())
        .map(([offset, values]) => buildHypothesis(parser.fileCode, offset, values))
        .filter((item): item is OffsetHypothesis => Boolean(item))
    ).slice(0, 12);

    return {
      fileCode: parser.fileCode,
      sourcePath: parser.sourcePath,
      recordLength: parser.recordLength,
      hypotheses
    };
  });

  const payload: MasterFieldHypothesisArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    files
  };

  const targetPath = join(artifactsDir, "profiles", "master-field-hypotheses.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
