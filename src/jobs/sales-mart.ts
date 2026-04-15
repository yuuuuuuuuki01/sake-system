import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { readNormalizationArtifact } from "../normalization/plans.js";
import type { JobContext } from "./job-types.js";

interface ProvisionalSalesHeaderRecord {
  legacyDocumentNoCandidate?: string;
  legacyCustomerCodeCandidate?: string;
  salesAmountCandidate?: number;
}

interface ProvisionalSalesLineRecord {
  legacyDocumentNoCandidate?: string;
  legacyProductCodeCandidate?: string;
  lineAmountCandidate?: number;
}

interface ProvisionalSalesParserArtifact {
  outputs: Array<
    | {
        fileCode: "SHDEN";
        records: ProvisionalSalesHeaderRecord[];
      }
    | {
        fileCode: "SHTOR";
        records: ProvisionalSalesLineRecord[];
      }
  >;
}

interface DailySalesFactRow {
  salesDate: string;
  legacyCustomerCode: string;
  legacyProductCode: string;
  salesAmount: number;
  quantity: number | null;
  documentCount: number;
}

interface SalesFactAccumulator {
  salesDate: string;
  legacyCustomerCode: string;
  legacyProductCode: string;
  salesAmount: number;
  quantity: number | null;
  documentNos: Set<string>;
}

interface SalesSummaryAccumulator {
  salesDate: string;
  totalAmount: number;
  documentNos: Set<string>;
}

function requireArtifactsDir(context: JobContext): string {
  if (!context.artifactsDir) {
    throw new Error(
      "artifactsDir is not set. ingestRawFiles must run before refreshing sales marts."
    );
  }

  return context.artifactsDir;
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

function isUsefulCode(value?: string): value is string {
  return Boolean(value && /^[0-9A-Za-z]{1,32}$/.test(value) && value !== "0");
}

function makeFactKey(
  salesDate: string,
  legacyCustomerCode: string,
  legacyProductCode: string
): string {
  return `${salesDate}::${legacyCustomerCode}::${legacyProductCode}`;
}

function addFactRow(
  factMap: Map<string, SalesFactAccumulator>,
  summaryMap: Map<string, SalesSummaryAccumulator>,
  input: {
    salesDate: string;
    legacyCustomerCode: string;
    legacyProductCode: string;
    salesAmount: number;
    legacyDocumentNo: string;
  }
): void {
  const factKey = makeFactKey(input.salesDate, input.legacyCustomerCode, input.legacyProductCode);
  const existingFact = factMap.get(factKey);
  if (existingFact) {
    existingFact.salesAmount += input.salesAmount;
    existingFact.documentNos.add(input.legacyDocumentNo);
  } else {
    factMap.set(factKey, {
      salesDate: input.salesDate,
      legacyCustomerCode: input.legacyCustomerCode,
      legacyProductCode: input.legacyProductCode,
      salesAmount: input.salesAmount,
      quantity: null,
      documentNos: new Set([input.legacyDocumentNo])
    });
  }

  const existingSummary = summaryMap.get(input.salesDate);
  if (existingSummary) {
    existingSummary.totalAmount += input.salesAmount;
    existingSummary.documentNos.add(input.legacyDocumentNo);
  } else {
    summaryMap.set(input.salesDate, {
      salesDate: input.salesDate,
      totalAmount: input.salesAmount,
      documentNos: new Set([input.legacyDocumentNo])
    });
  }
}

export async function refreshSalesMarts(
  context: JobContext
): Promise<{ salesDate: string; totalAmount: number; documentCount: number }[]> {
  const artifactsDir = requireArtifactsDir(context);
  const martDir = join(artifactsDir, "mart");
  const targetPath = join(martDir, "daily_sales_fact.json");
  const fallbackSalesDate = context.startedAt.slice(0, 10);

  const salesPlan = await readNormalizationArtifact(context, "sales.plan.json");
  const hasDailySalesFact = salesPlan.entities.some(
    (entity) => entity.entity === "daily_sales_fact"
  );
  if (!hasDailySalesFact) {
    throw new Error("sales.plan.json does not define the daily_sales_fact entity.");
  }

  const provisional = await readJson<ProvisionalSalesParserArtifact>(
    join(artifactsDir, "profiles", "provisional-sales-parser.json")
  );

  const headers = provisional.outputs.find((output) => output.fileCode === "SHDEN");
  const lines = provisional.outputs.find((output) => output.fileCode === "SHTOR");

  const headerByDocument = new Map<
    string,
    { legacyCustomerCode: string; salesAmount: number; salesDate: string }
  >();

  for (const record of headers?.records ?? []) {
    if (
      !isUsefulCode(record.legacyDocumentNoCandidate) ||
      !isUsefulCode(record.legacyCustomerCodeCandidate)
    ) {
      continue;
    }

    headerByDocument.set(record.legacyDocumentNoCandidate, {
      legacyCustomerCode: record.legacyCustomerCodeCandidate,
      salesAmount: record.salesAmountCandidate ?? 0,
      salesDate: fallbackSalesDate
    });
  }

  const factMap = new Map<string, SalesFactAccumulator>();
  const summaryMap = new Map<string, SalesSummaryAccumulator>();
  const documentsCoveredByLines = new Set<string>();

  for (const record of lines?.records ?? []) {
    if (!isUsefulCode(record.legacyDocumentNoCandidate)) {
      continue;
    }

    const header = headerByDocument.get(record.legacyDocumentNoCandidate);
    if (!header) {
      continue;
    }

    documentsCoveredByLines.add(record.legacyDocumentNoCandidate);
    addFactRow(factMap, summaryMap, {
      salesDate: header.salesDate,
      legacyCustomerCode: header.legacyCustomerCode,
      legacyProductCode: isUsefulCode(record.legacyProductCodeCandidate)
        ? record.legacyProductCodeCandidate
        : "UNSPECIFIED",
      salesAmount: record.lineAmountCandidate ?? 0,
      legacyDocumentNo: record.legacyDocumentNoCandidate
    });
  }

  for (const [legacyDocumentNo, header] of headerByDocument.entries()) {
    if (documentsCoveredByLines.has(legacyDocumentNo)) {
      continue;
    }

    addFactRow(factMap, summaryMap, {
      salesDate: header.salesDate,
      legacyCustomerCode: header.legacyCustomerCode,
      legacyProductCode: "UNSPECIFIED",
      salesAmount: header.salesAmount,
      legacyDocumentNo
    });
  }

  const dailySalesFact: DailySalesFactRow[] = Array.from(factMap.values())
    .map((item) => ({
      salesDate: item.salesDate,
      legacyCustomerCode: item.legacyCustomerCode,
      legacyProductCode: item.legacyProductCode,
      salesAmount: item.salesAmount,
      quantity: item.quantity,
      documentCount: item.documentNos.size
    }))
    .sort(
      (a, b) =>
        a.salesDate.localeCompare(b.salesDate) ||
        a.legacyCustomerCode.localeCompare(b.legacyCustomerCode) ||
        a.legacyProductCode.localeCompare(b.legacyProductCode)
    );

  const summary = Array.from(summaryMap.values())
    .map((item) => ({
      salesDate: item.salesDate,
      totalAmount: item.totalAmount,
      documentCount: item.documentNos.size
    }))
    .sort((a, b) => a.salesDate.localeCompare(b.salesDate));

  await mkdir(martDir, { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(dailySalesFact, null, 2)}\n`, "utf8");

  return summary;
}
