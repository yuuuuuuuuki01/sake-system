`references/` is the handoff area for work that must survive across machines without
committing raw operational data.

Suggested layout:

- `references/analysis/current/`
  - checked-in or manually copied analysis JSON such as `file_manifest.json`
- `references/legacy-root/`
  - local-only mount or copied legacy source tree used to resolve actual `.DAT` / `.MST`
    files during pipeline runs

Guidelines:

- Safe to commit: curated analysis snapshots, field notes, parser reference docs
- Do not commit: raw legacy source data, generated `data/runs/`, secrets
- If a new machine has different drive letters or mount points, update `.env` only.
- Use `npm run sync:analysis-reference` to copy the curated analysis subset into
  `references/analysis/current/`.
