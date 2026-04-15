import iconv from "iconv-lite";

const DEFAULT_SAMPLE_SIZE = 8;
const MIN_RECORD_LENGTH = 16;
const MAX_RECORD_LENGTH = 4096;

function assertReadable(buf: Buffer, offset: number, length: number): void {
  if (offset < 0 || length < 0 || offset + length > buf.length) {
    throw new RangeError(
      `Buffer read is out of range: offset=${offset}, length=${length}, size=${buf.length}`
    );
  }
}

function classifyByte(byte: number): string {
  if (byte === 0x00) {
    return "zero";
  }

  if (byte === 0x20) {
    return "space";
  }

  if (byte >= 0x30 && byte <= 0x39) {
    return "digit";
  }

  if ((byte >= 0x41 && byte <= 0x5a) || (byte >= 0x61 && byte <= 0x7a)) {
    return "alpha";
  }

  return "other";
}

function trimPadding(field: Buffer): Buffer {
  let end = field.length;

  while (end > 0 && (field[end - 1] === 0x00 || field[end - 1] === 0x20)) {
    end -= 1;
  }

  let start = 0;
  while (start < end && (field[start] === 0x00 || field[start] === 0x20)) {
    start += 1;
  }

  return field.subarray(start, end);
}

export function readShiftJisField(buf: Buffer, offset: number, length: number): string {
  assertReadable(buf, offset, length);
  const rawField = buf.subarray(offset, offset + length);
  const trimmed = trimPadding(rawField);
  return trimmed.length === 0 ? "" : iconv.decode(trimmed, "shift_jis").trim();
}

export function readUint16BE(buf: Buffer, offset: number): number {
  assertReadable(buf, offset, 2);
  return buf.readUInt16BE(offset);
}

export function readUint32BE(buf: Buffer, offset: number): number {
  assertReadable(buf, offset, 4);
  return buf.readUInt32BE(offset);
}

export function readPackedDecimal(buf: Buffer, offset: number, length: number): number {
  assertReadable(buf, offset, length);

  let digits = "";
  let signNibble = 0x0f;

  for (let index = 0; index < length; index += 1) {
    const byte = buf[offset + index];
    const high = (byte >> 4) & 0x0f;
    const low = byte & 0x0f;

    if (index === length - 1) {
      digits += String(high);
      signNibble = low;
      continue;
    }

    digits += `${high}${low}`;
  }

  if (!/^\d+$/.test(digits)) {
    throw new Error(`Invalid packed decimal digits at offset=${offset}, length=${length}`);
  }

  const numericValue = Number.parseInt(digits, 10);
  const isNegative = signNibble === 0x0d || signNibble === 0x0b;
  return isNegative ? -numericValue : numericValue;
}

export function detectRecordLength(buf: Buffer, sampleSize = DEFAULT_SAMPLE_SIZE): number {
  if (buf.length < MIN_RECORD_LENGTH * 2) {
    throw new Error("Buffer is too small to infer a fixed record length.");
  }

  const effectiveSampleSize = Math.max(2, Math.min(sampleSize, Math.floor(buf.length / MIN_RECORD_LENGTH)));
  const maxCandidateLength = Math.min(MAX_RECORD_LENGTH, Math.floor(buf.length / effectiveSampleSize));

  let bestLength = 0;
  let bestScore = -1;

  for (let candidate = MIN_RECORD_LENGTH; candidate <= maxCandidateLength; candidate += 1) {
    const recordCount = Math.floor(buf.length / candidate);
    if (recordCount < effectiveSampleSize) {
      continue;
    }

    let stableColumns = 0;
    let paddedColumns = 0;

    for (let column = 0; column < candidate; column += 1) {
      const counts = new Map<string, number>();

      for (let recordIndex = 0; recordIndex < effectiveSampleSize; recordIndex += 1) {
        const byte = buf[recordIndex * candidate + column];
        const key = classifyByte(byte);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }

      const maxCount = Math.max(...counts.values());
      const stability = maxCount / effectiveSampleSize;
      if (stability >= 0.75) {
        stableColumns += 1;
      }

      const paddingShare = ((counts.get("zero") ?? 0) + (counts.get("space") ?? 0)) / effectiveSampleSize;
      if (paddingShare >= 0.5) {
        paddedColumns += 1;
      }
    }

    const stabilityScore = stableColumns / candidate;
    const paddingScore = paddedColumns / candidate;
    const score = stabilityScore + paddingScore * 0.35;

    if (score > bestScore) {
      bestScore = score;
      bestLength = candidate;
    }
  }

  if (bestLength === 0) {
    throw new Error("Unable to infer a consistent fixed record length.");
  }

  return bestLength;
}
