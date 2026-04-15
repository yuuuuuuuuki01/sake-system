import "dotenv/config";

import { copyFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";

const SELECTED_FILES = [
  "file_manifest.json",
  "key_file_summary.json",
  "role_candidates.json",
  "sh_dat.json",
  "sh_mst.json",
  "summary.json"
] as const;

function resolveSourceDir(): string {
  const cliArg = process.argv[2];
  const sourceDir = cliArg ?? process.env.SYUSEN_ANALYSIS_IMPORT_DIR;

  if (!sourceDir) {
    throw new Error(
      "Analysis import source is not set. Pass a directory path as the first argument or set SYUSEN_ANALYSIS_IMPORT_DIR."
    );
  }

  return resolve(sourceDir);
}

async function main(): Promise<void> {
  const sourceDir = resolveSourceDir();
  const targetDir = resolve("references", "analysis", "current");

  await mkdir(targetDir, { recursive: true });

  for (const fileName of SELECTED_FILES) {
    const sourcePath = join(sourceDir, fileName);
    const targetPath = join(targetDir, fileName);
    await copyFile(sourcePath, targetPath);
    console.log(`[sync-analysis-reference] copied ${fileName}`);
  }

  console.log(`[sync-analysis-reference] target ${targetDir}`);
}

main().catch((error) => {
  console.error("[sync-analysis-reference] fatal", error);
  process.exitCode = 1;
});
