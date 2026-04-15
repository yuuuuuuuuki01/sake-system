import { createHash } from "node:crypto";
import { basename } from "node:path";

import type { FileIngestionCandidate } from "../jobs/job-types.js";
import { db } from "./client.js";

function buildIngestionId(candidate: FileIngestionCandidate): string {
  const hash = createHash("sha256");
  hash.update(
    JSON.stringify({
      sourcePath: candidate.sourcePath,
      fileCode: candidate.fileCode,
      fileSize: candidate.fileSize,
      fileMtime: candidate.fileMtime,
      sourceRole: candidate.sourceRole,
      contentHash: candidate.contentHash ?? null
    })
  );
  return hash.digest("hex");
}

export async function logFileIngestion(
  candidate: FileIngestionCandidate,
  status: "ok" | "error",
  error?: string
): Promise<void> {
  await db
    .insertInto("raw_file_ingestions")
    .values({
      id: buildIngestionId(candidate),
      source_system: "legacy",
      source_path: candidate.sourcePath,
      source_group: `${candidate.fileCode}:${candidate.sourceRole}`,
      file_name: basename(candidate.sourcePath),
      file_size: candidate.fileSize,
      file_mtime: candidate.fileMtime,
      content_hash: candidate.contentHash ?? null,
      ingested_at: new Date().toISOString(),
      status,
      error_message: error ?? null
    })
    .onConflict((oc) =>
      oc.column("id").doUpdateSet((eb) => ({
        source_system: eb.ref("excluded.source_system"),
        source_path: eb.ref("excluded.source_path"),
        source_group: eb.ref("excluded.source_group"),
        file_name: eb.ref("excluded.file_name"),
        file_size: eb.ref("excluded.file_size"),
        file_mtime: eb.ref("excluded.file_mtime"),
        content_hash: eb.ref("excluded.content_hash"),
        ingested_at: eb.ref("excluded.ingested_at"),
        status: eb.ref("excluded.status"),
        error_message: eb.ref("excluded.error_message")
      }))
    )
    .execute();
}
