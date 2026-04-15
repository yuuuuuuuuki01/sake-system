import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { JobContext } from "../jobs/job-types.js";

interface MasterFieldHypothesisArtifact {
  runId: string;
  generatedAt: string;
  files: MasterFieldHypothesis[];
}

interface MasterFieldHypothesis {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  hypotheses: OffsetHypothesis[];
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

interface NamedFieldDraft {
  name: string;
  offset: number;
  widthBytes: number;
  sourceHypothesisLabel: string;
  confidence: "low" | "medium";
  rationale: string;
}

interface NamedMasterDraft {
  fileCode: string;
  sourcePath: string;
  recordLength: number;
  fields: NamedFieldDraft[];
  notes: string[];
}

interface NamedMasterDraftArtifact {
  runId: string;
  generatedAt: string;
  drafts: NamedMasterDraft[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error("artifactsDir is not set. ingestRawFiles must run before named drafts.");
  }

  return context.artifactsDir;
}

function findHypothesis(file: MasterFieldHypothesis, offset: number): OffsetHypothesis | undefined {
  return file.hypotheses.find((item) => item.offset === offset);
}

function draftFieldsFor(file: MasterFieldHypothesis): NamedFieldDraft[] {
  if (file.fileCode === "SHSYO") {
    return [
      {
        name: "legacy_product_code_primary",
        offset: 8,
        widthBytes: 4,
        sourceHypothesisLabel: findHypothesis(file, 8)?.label ?? "candidate_product_code",
        confidence: "medium",
        rationale: "Offset 8 varied strongly across sampled records and ranked highest as a product code candidate."
      },
      {
        name: "legacy_product_code_secondary",
        offset: 0,
        widthBytes: 4,
        sourceHypothesisLabel: findHypothesis(file, 0)?.label ?? "candidate_product_code",
        confidence: "low",
        rationale: "Offset 0 also varies per record and may be part of a compound key or alternate code."
      },
      {
        name: "jan_or_external_code_part_a",
        offset: 28,
        widthBytes: 4,
        sourceHypothesisLabel: findHypothesis(file, 28)?.label ?? "candidate_jan_or_external_code",
        confidence: "low",
        rationale: "Offset 28 was consistently surfaced as a JAN or external-code hint but needs layout confirmation."
      },
      {
        name: "jan_or_external_code_part_b",
        offset: 32,
        widthBytes: 4,
        sourceHypothesisLabel: findHypothesis(file, 32)?.label ?? "candidate_jan_or_external_code",
        confidence: "low",
        rationale: "Offset 32 varies alongside offset 28 and may belong to the same external code family."
      }
    ];
  }

  return [
    {
      name: "legacy_customer_code_primary",
      offset: 0,
      widthBytes: 4,
      sourceHypothesisLabel: findHypothesis(file, 0)?.label ?? "candidate_customer_code",
      confidence: "medium",
      rationale: "Offset 0 is an early varying slot and remains the strongest customer identity anchor."
    },
    {
      name: "legacy_customer_code_secondary",
      offset: 4,
      widthBytes: 4,
      sourceHypothesisLabel: findHypothesis(file, 4)?.label ?? "candidate_customer_code",
      confidence: "low",
      rationale: "Offset 4 looks related to early identity fields and may be a branch or sub-code."
    },
    {
      name: "billing_rule_or_closing_day",
      offset: 28,
      widthBytes: 4,
      sourceHypothesisLabel: findHypothesis(file, 28)?.label ?? "candidate_closing_day_or_billing_rule",
      confidence: "low",
      rationale: "Offset 28 was already treated as a closing or billing rule hint in the prior hypothesis pass."
    },
    {
      name: "collection_rule_or_payment_day",
      offset: 32,
      widthBytes: 4,
      sourceHypothesisLabel: findHypothesis(file, 32)?.label ?? "candidate_payment_day_or_collection_rule",
      confidence: "low",
      rationale: "Offset 32 varies separately from offset 28 and is a likely collection term candidate."
    }
  ];
}

export async function writeNamedMasterDraft(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const hypothesisPath = join(artifactsDir, "profiles", "master-field-hypotheses.json");
  const content = await readFile(hypothesisPath, "utf8");
  const artifact = JSON.parse(content) as MasterFieldHypothesisArtifact;

  const drafts: NamedMasterDraft[] = artifact.files.map((file) => ({
    fileCode: file.fileCode,
    sourcePath: file.sourcePath,
    recordLength: file.recordLength,
    fields: draftFieldsFor(file),
    notes: [
      "These names are working parser draft names, not confirmed legacy schema labels.",
      "Use them to implement provisional extraction before field validation against business output."
    ]
  }));

  const payload: NamedMasterDraftArtifact = {
    runId: context.runId,
    generatedAt: new Date().toISOString(),
    drafts
  };

  const targetPath = join(artifactsDir, "profiles", "named-master-draft.json");
  await mkdir(join(artifactsDir, "profiles"), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return targetPath;
}
