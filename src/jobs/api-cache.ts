import { mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

import type { JobContext, JobResult } from "./job-types.js";

interface DailySalesFactRow {
  salesDate: string;
  legacyCustomerCode: string;
  legacyProductCode: string;
  salesAmount?: number;
  documentCount?: number;
}

interface CustomerPaymentStatusRow {
  legacyCustomerCode: string;
  balanceAmount?: number;
  paymentStatus: string;
}

interface MasterSnapshotArtifact {
  products: unknown[];
  customers: unknown[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error(
      "artifactsDir is not set. ingestRawFiles must run before publishing API cache."
    );
  }

  return context.artifactsDir;
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

function normalizePaymentStatus(value: string): "未入金" | "一部入金" | "完済" {
  if (value === "一部入金" || value === "完済") {
    return value;
  }
  return value === "paid" ? "完済" : value === "partially_paid" ? "一部入金" : "未入金";
}

export async function writeApiCache(context: JobContext): Promise<string> {
  const artifactsDir = requireArtifactsDir(context);
  const apiDir = join(artifactsDir, "api");
  const martDir = join(artifactsDir, "mart");

  const [salesMart, paymentMart, masterSnapshot] = await Promise.all([
    readJson<DailySalesFactRow[]>(join(martDir, "daily_sales_fact.json")),
    readJson<CustomerPaymentStatusRow[]>(join(martDir, "customer_payment_status.json")),
    readJson<MasterSnapshotArtifact>(join(artifactsDir, "normalization", "masters.snapshot.json"))
  ]);

  const salesSummary = [...salesMart].sort(
    (a, b) =>
      a.salesDate.localeCompare(b.salesDate) ||
      a.legacyCustomerCode.localeCompare(b.legacyCustomerCode) ||
      a.legacyProductCode.localeCompare(b.legacyProductCode)
  );

  const paymentStatusCounts = paymentMart.reduce<
    Record<string, { customerCount: number; balanceAmount: number }>
  >((accumulator, row) => {
    const status = normalizePaymentStatus(row.paymentStatus);
    const current = accumulator[status] ?? { customerCount: 0, balanceAmount: 0 };
    current.customerCount += 1;
    current.balanceAmount += row.balanceAmount ?? 0;
    accumulator[status] = current;
    return accumulator;
  }, {});

  const paymentStatus = ["未入金", "一部入金", "完済"].map((status) => ({
    paymentStatus: status,
    customerCount: paymentStatusCounts[status]?.customerCount ?? 0,
    balanceAmount: paymentStatusCounts[status]?.balanceAmount ?? 0
  }));

  const masterStats = {
    customerCount: masterSnapshot.customers.length,
    productCount: masterSnapshot.products.length,
    lastSyncedAt: context.candidates.reduce(
      (latest, candidate) => (candidate.fileMtime > latest ? candidate.fileMtime : latest),
      context.startedAt
    )
  };

  const publishResult: JobResult = {
    jobName: "publishApiCache",
    ok: true,
    detail: `Published API cache artifacts to ${apiDir}.`
  };

  const pipelineMeta = {
    runId: context.runId,
    startedAt: context.startedAt,
    jobResults: [...context.jobResults, publishResult]
  };

  await mkdir(apiDir, { recursive: true });
  await Promise.all([
    writeFile(
      join(apiDir, "sales-summary.json"),
      `${JSON.stringify(salesSummary, null, 2)}\n`,
      "utf8"
    ),
    writeFile(
      join(apiDir, "payment-status.json"),
      `${JSON.stringify(paymentStatus, null, 2)}\n`,
      "utf8"
    ),
    writeFile(
      join(apiDir, "master-stats.json"),
      `${JSON.stringify(masterStats, null, 2)}\n`,
      "utf8"
    ),
    writeFile(
      join(apiDir, "pipeline-meta.json"),
      `${JSON.stringify(pipelineMeta, null, 2)}\n`,
      "utf8"
    )
  ]);

  const apiRootDir = join(context.config.workDir, "api");
  const latestLinkPath = join(apiRootDir, "latest");
  await mkdir(apiRootDir, { recursive: true });
  await rm(latestLinkPath, { force: true, recursive: true });
  await symlink(relative(apiRootDir, apiDir), latestLinkPath, "dir");

  return apiDir;
}
