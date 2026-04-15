# syusen-cloud

`syusen-cloud` is the first cloud-side foundation for the Syusen migration.
The legacy Syusen system remains the source of truth for now. This project
focuses on file discovery, raw ingestion, normalization, dashboards, and
external integrations without breaking the current office workflow.

## Current scope

- Treat `SHDEN / SHTOR / SHSYO / SHTKI / SHNKI` as the MVP sync set
- Treat `SHSUJ / SHTNSUJ / SHTEGATA / SHZEI` as early expansion targets
- Structure the cloud database as `raw / core / mart`
- Prepare for dashboards, payment visibility, invoice candidates, and future
  freee relay work

## Project layout

- `sql/001_initial_schema.sql`
  - Initial cloud database schema draft
- `src/domain/types.ts`
  - Core business types for the first migration slice
- `src/config.ts`
  - Environment and path loading
- `src/discovery/`
  - Analysis-driven file discovery
- `src/jobs/`
  - Job definitions and pipeline runner

## Current behavior

`npm run run:pipeline` currently:

1. Loads pipeline settings from environment variables
2. Reads the analysis output created from the legacy share
3. Builds ingestion candidates for the MVP file set
4. Selects canonical source files over auxiliary legacy variants
5. Writes a raw ingestion snapshot under `data/runs/<runId>/`
6. Writes canonical file profiles for parser work
7. Writes fixed-record probe artifacts for canonical master files
8. Writes master record inspection artifacts for SHSYO and SHTKI
9. Writes transaction record inspection artifacts for SHDEN / SHTOR / SHNKI and payment-side candidates
10. Writes parser stub artifacts for SHSYO and SHTKI
11. Writes field hypothesis artifacts for SHSYO and SHTKI
12. Writes named parser draft artifacts for SHSYO and SHTKI
13. Writes named draft extraction artifacts for SHSYO and SHTKI
14. Writes provisional master parser artifacts for SHSYO and SHTKI
15. Writes a provisional `masters.snapshot.json` for products and customers
16. Writes normalization plans for masters, sales, and payments
17. Prints the ordered pipeline results

`npm run run:dashboard` currently:

1. Reads the latest pipeline run under `data/runs/`
2. Loads raw ingestion, provisional master parser, and normalization plan artifacts
3. Builds a static sales-dashboard prototype model
4. Writes `dashboard/sales-dashboard-prototype.html` under the latest run

## Next implementation steps

1. Add record-level parsers for master and transaction files
2. Populate the cloud schema instead of plan JSON only
3. Add retry-safe sync state and dashboard/API refresh jobs
4. Split canonical and auxiliary ingestion policies by file family
