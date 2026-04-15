import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { readNormalizationArtifact } from "../normalization/plans.js";
import type { JobContext } from "./job-types.js";

interface ProvisionalPaymentStatusRow {
  legacyCustomerCode?: string;
  balanceAmount?: number;
  paymentStatus?: string;
}

interface ProvisionalPaymentArtifact {
  rows?: ProvisionalPaymentStatusRow[];
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error(
      "artifactsDir is not set. ingestRawFiles must run before refreshing payment marts."
    );
  }

  return context.artifactsDir;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

function isUsefulCode(value?: string): value is string {
  return Boolean(value && /^[0-9A-Za-z]{1,32}$/.test(value) && value !== "0");
}

function normalizePaymentStatus(value?: string): string {
  if (value === "未入金" || value === "一部入金" || value === "完済") {
    return value;
  }
  if (value === "paid") {
    return "完済";
  }
  if (value === "partially_paid") {
    return "一部入金";
  }
  return "未入金";
}

export async function refreshPaymentMarts(
  context: JobContext
): Promise<{ legacyCustomerCode: string; balanceAmount: number; paymentStatus: string }[]> {
  const artifactsDir = requireArtifactsDir(context);
  const martDir = join(artifactsDir, "mart");
  const targetPath = join(martDir, "customer_payment_status.json");

  const paymentsPlan = await readNormalizationArtifact(context, "payments.plan.json");
  const hasCustomerPaymentStatus = paymentsPlan.entities.some(
    (entity) => entity.entity === "customer_payment_status"
  );
  if (!hasCustomerPaymentStatus) {
    throw new Error("payments.plan.json does not define the customer_payment_status entity.");
  }

  const provisionalArtifactPath = join(artifactsDir, "normalization", "payments.snapshot.json");
  const rows: { legacyCustomerCode: string; balanceAmount: number; paymentStatus: string }[] = [];

  if (await pathExists(provisionalArtifactPath)) {
    const provisional = await readJson<ProvisionalPaymentArtifact>(provisionalArtifactPath);
    for (const row of provisional.rows ?? []) {
      if (!isUsefulCode(row.legacyCustomerCode)) {
        continue;
      }

      rows.push({
        legacyCustomerCode: row.legacyCustomerCode,
        balanceAmount: row.balanceAmount ?? 0,
        paymentStatus: normalizePaymentStatus(row.paymentStatus)
      });
    }
  }

  rows.sort(
    (a, b) =>
      a.legacyCustomerCode.localeCompare(b.legacyCustomerCode) ||
      a.paymentStatus.localeCompare(b.paymentStatus)
  );

  await mkdir(martDir, { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(rows, null, 2)}\n`, "utf8");

  return rows;
}
