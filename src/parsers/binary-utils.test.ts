import iconv from "iconv-lite";
import { describe, expect, it } from "vitest";

import {
  detectRecordLength,
  readShiftJisField,
  readUint16BE,
  readUint32BE
} from "./binary-utils.js";

describe("binary-utils", () => {
  it("readShiftJisField decodes a fixed Shift-JIS byte sequence", () => {
    const encoded = iconv.encode("こんにちは", "shift_jis");
    const buffer = Buffer.concat([Buffer.from([0x20]), encoded, Buffer.from([0x00, 0x20])]);

    expect(readShiftJisField(buffer, 0, buffer.length)).toBe("こんにちは");
  });

  it("readUint16BE reads big-endian uint16", () => {
    expect(readUint16BE(Buffer.from([0x01, 0x00]), 0)).toBe(256);
  });

  it("readUint32BE reads big-endian uint32", () => {
    expect(readUint32BE(Buffer.from([0x00, 0x01, 0x86, 0xa0]), 0)).toBe(100000);
  });

  it("detectRecordLength returns the repeated record length", () => {
    const record = Buffer.from("0000000000000001");
    const buffer = Buffer.concat([record, record, record, record]);

    expect(detectRecordLength(buffer)).toBe(record.length);
  });
});
