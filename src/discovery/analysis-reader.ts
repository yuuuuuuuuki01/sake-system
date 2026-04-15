import { readFile } from "node:fs/promises";
import { join } from "node:path";

export interface AnalysisManifestEntry {
  path?: string;
  fullPath?: string;
  FullName?: string;
  name?: string;
  Name?: string;
  extension?: string;
  Extension?: string;
  directory?: string;
  DirectoryName?: string;
  size?: number;
  length?: number;
  Length?: number;
  lastWriteTime?: string;
  last_write_time?: string;
  LastWriteTime?: string;
}

export async function readJsonFile<T>(analysisDir: string, fileName: string): Promise<T> {
  const target = join(analysisDir, fileName);
  const content = await readFile(target, "utf8");
  return JSON.parse(content.replace(/^\uFEFF/, "")) as T;
}

export async function readFileManifest(analysisDir: string): Promise<AnalysisManifestEntry[]> {
  return readJsonFile<AnalysisManifestEntry[]>(analysisDir, "file_manifest.json");
}
