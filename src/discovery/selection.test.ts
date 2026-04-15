import { describe, expect, it } from "vitest";

import { attachSelectionMetadata } from "./selection.js";

describe("attachSelectionMetadata", () => {
  it("returns exactly one canonical candidate for the same fileCode", () => {
    const selected = attachSelectionMetadata([
      {
        sourcePath: "/data/OCR/SH/SHDEN.DAT",
        fileCode: "SHDEN",
        fileSize: 1024,
        fileMtime: "2026-04-15T00:00:00.000Z"
      },
      {
        sourcePath: "/data/SH/SHDEN.DAT",
        fileCode: "SHDEN",
        fileSize: 2048,
        fileMtime: "2026-04-15T00:00:00.000Z"
      },
      {
        sourcePath: "/data/SK/SHTOR.DAT",
        fileCode: "SHTOR",
        fileSize: 4096,
        fileMtime: "2026-04-15T00:00:00.000Z"
      }
    ]);

    const shdenCanonical = selected.filter(
      (candidate) => candidate.fileCode === "SHDEN" && candidate.sourceRole === "canonical"
    );

    expect(shdenCanonical).toHaveLength(1);
  });

  it("marks the highest-scoring candidate as canonical", () => {
    const selected = attachSelectionMetadata([
      {
        sourcePath: "/archive/OCR/SHDEN.WRK",
        fileCode: "SHDEN",
        fileSize: 8 * 1024 * 1024,
        fileMtime: "2026-04-15T00:00:00.000Z"
      },
      {
        sourcePath: "/data/SH/SHDEN.DAT",
        fileCode: "SHDEN",
        fileSize: 2 * 1024 * 1024,
        fileMtime: "2026-04-15T00:00:00.000Z"
      }
    ]);

    expect(selected[0]?.sourcePath).toBe("/data/SH/SHDEN.DAT");
    expect(selected[0]?.sourceRole).toBe("canonical");
    expect(selected[0]?.score).toBeGreaterThan(selected[1]?.score ?? Number.NEGATIVE_INFINITY);
  });
});
