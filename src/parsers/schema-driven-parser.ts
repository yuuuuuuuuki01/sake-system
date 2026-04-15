import { readFile } from "node:fs/promises";

import {
  detectRecordLength,
  readPackedDecimal,
  readShiftJisField,
  readUint16BE,
  readUint32BE
} from "./binary-utils.js";
import type { FileSchema, FieldDef } from "./field-schema.js";

type ParsedRecord = Record<string, unknown>;

function readDateYyyymmdd(buf: Buffer, offset: number, length: number): string | null {
  const raw = buf
    .subarray(offset, offset + length)
    .toString("latin1")
    .replace(/[\x00 ]+/gu, "");

  if (!/^\d{8}$/.test(raw)) {
    return raw.length > 0 ? raw : null;
  }

  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

function parseField(record: Buffer, field: FieldDef): unknown {
  switch (field.type) {
    case "shiftjis":
      return readShiftJisField(record, field.offset, field.length);
    case "uint16":
      return readUint16BE(record, field.offset);
    case "uint32":
      return readUint32BE(record, field.offset);
    case "packed_decimal":
      return readPackedDecimal(record, field.offset, field.length);
    case "date_yyyymmdd":
      return readDateYyyymmdd(record, field.offset, field.length);
    default: {
      const exhaustive: never = field.type;
      return exhaustive;
    }
  }
}

function pickNumber(record: ParsedRecord, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }

  return undefined;
}

function pickString(record: ParsedRecord, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return undefined;
}

export async function parseFile(
  filePath: string,
  schema: FileSchema
): Promise<Record<string, unknown>[]> {
  const buffer = await readFile(filePath);
  const detectedLength = detectRecordLength(
    buffer,
    Math.min(8, Math.max(2, Math.floor(buffer.length / schema.recordLength)))
  );

  if (detectedLength !== schema.recordLength) {
    throw new Error(
      `Record length mismatch for ${schema.fileCode}: schema=${schema.recordLength}, detected=${detectedLength}`
    );
  }

  const recordCount = Math.floor(buffer.length / schema.recordLength);
  const records: ParsedRecord[] = [];

  for (let index = 0; index < recordCount; index += 1) {
    const offset = index * schema.recordLength;
    const record = buffer.subarray(offset, offset + schema.recordLength);
    const parsed: ParsedRecord = {
      _recordIndex: index,
      _offset: offset
    };

    for (const field of schema.fields) {
      parsed[field.name] = parseField(record, field);
    }

    records.push(parsed);
  }

  return records;
}

export function validateCrossCheck(
  shdenRecords: Record<string, unknown>[],
  shtorRecords: Record<string, unknown>[]
): { matched: number; mismatched: number; details: string[] } {
  const detailLines: string[] = [];
  let matched = 0;
  let mismatched = 0;

  const lineAmountByDocument = new Map<string, number>();

  for (const record of shtorRecords) {
    const documentNo = pickString(record, ["documentNo", "denpyoNo", "slipNo"]);
    const lineAmount = pickNumber(record, ["lineAmount", "amount", "salesAmount"]);

    if (!documentNo || lineAmount === undefined) {
      continue;
    }

    lineAmountByDocument.set(documentNo, (lineAmountByDocument.get(documentNo) ?? 0) + lineAmount);
  }

  for (const record of shdenRecords) {
    const documentNo = pickString(record, ["documentNo", "denpyoNo", "slipNo"]);
    const totalAmount = pickNumber(record, ["totalAmount", "amount", "salesAmount"]);

    if (!documentNo || totalAmount === undefined) {
      continue;
    }

    const lineTotal = lineAmountByDocument.get(documentNo);
    if (lineTotal === undefined) {
      mismatched += 1;
      detailLines.push(`${documentNo}: no matching detail records found`);
      continue;
    }

    if (lineTotal === totalAmount) {
      matched += 1;
      continue;
    }

    mismatched += 1;
    detailLines.push(`${documentNo}: header=${totalAmount}, detail-sum=${lineTotal}`);
  }

  return {
    matched,
    mismatched,
    details: detailLines
  };
}
