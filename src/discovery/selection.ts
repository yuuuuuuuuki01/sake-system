import type { FileIngestionCandidate } from "../jobs/job-types.js";

function scoreCandidate(candidate: Pick<FileIngestionCandidate, "sourcePath" | "fileSize">): number {
  const path = candidate.sourcePath.replace(/\\/g, "/").toUpperCase();
  let score = 0;

  if (path.includes("/SH/") || path.includes("/SK/")) {
    score += 50;
  }

  if (path.includes("/DAT/")) {
    score += 30;
  }

  if (path.includes("/MST/")) {
    score += 25;
  }

  if (path.includes("/OCR/")) {
    score -= 20;
  }

  if (path.includes("/SYS/")) {
    score -= 25;
  }

  if (/(\d+|_NEW|_NEW1|_SUB|\.WRK)$/i.test(path)) {
    score -= 15;
  }

  if (path.endsWith(".DAT") || path.endsWith(".MST")) {
    score += 10;
  }

  score += Math.min(Math.floor(candidate.fileSize / (1024 * 1024)), 20);

  return score;
}

export function attachSelectionMetadata(
  candidates: Omit<FileIngestionCandidate, "sourceRole" | "score">[]
): FileIngestionCandidate[] {
  const byCode = new Map<string, FileIngestionCandidate[]>();

  for (const candidate of candidates) {
    const scored: FileIngestionCandidate = {
      ...candidate,
      score: scoreCandidate(candidate),
      sourceRole: "auxiliary"
    };

    const current = byCode.get(candidate.fileCode) ?? [];
    current.push(scored);
    byCode.set(candidate.fileCode, current);
  }

  const selected: FileIngestionCandidate[] = [];

  for (const [, group] of byCode) {
    group.sort((left, right) => right.score - left.score || right.fileSize - left.fileSize);
    group[0].sourceRole = "canonical";
    selected.push(...group);
  }

  return selected.sort((left, right) => {
    if (left.fileCode !== right.fileCode) {
      return left.fileCode.localeCompare(right.fileCode);
    }

    if (left.sourceRole !== right.sourceRole) {
      return left.sourceRole === "canonical" ? -1 : 1;
    }

    return right.score - left.score;
  });
}
