import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface DashboardContext {
  runId: string;
  generatedAt: string;
  artifactsDir: string;
}

interface CandidateFile {
  sourcePath: string;
  fileCode: string;
  fileSize: number;
  fileMtime: string;
  sourceRole: "canonical" | "auxiliary";
  score: number;
}

interface RawIngestionArtifact {
  runId: string;
  generatedAt: string;
  candidates: CandidateFile[];
}

interface ProvisionalMasterParserArtifact {
  runId: string;
  generatedAt: string;
  outputs: Array<{
    fileCode: "SHSYO" | "SHTKI";
    sourcePath: string;
    records: Array<{
      recordIndex: number;
      payloadStartOffset: number;
      productCodeCandidate?: string;
      janCandidate?: string;
      customerCodeCandidate?: string;
      closingDayCandidate?: number;
      collectionRuleCandidate?: number;
    }>;
  }>;
}

interface NormalizationPlanArtifact {
  runId: string;
  generatedAt: string;
  entities: Array<{
    entityName: string;
    sourceFiles: string[];
    notes: string[];
  }>;
}

interface DashboardModel {
  runId: string;
  generatedAt: string;
  totalCandidates: number;
  canonicalCandidates: number;
  auxiliaryCandidates: number;
  canonicalSalesFiles: CandidateFile[];
  canonicalPaymentFiles: CandidateFile[];
  productSamples: Array<{ productCode?: string; janCode?: string }>;
  customerSamples: Array<{ customerCode?: string; closingDay?: number; collectionRule?: number }>;
  masterEntities: string[];
  salesEntities: string[];
  paymentEntities: string[];
}

const PRIMARY_FILE_CODES = new Set(["SHDEN", "SHTOR"]);
const PAYMENT_FILE_CODES = new Set(["SHNKI", "SHSUJ", "SHTNSUJ", "SHTEGATA"]);

async function findLatestRunDir(root: string): Promise<string> {
  const entries = await readdir(root, { withFileTypes: true });
  const runDirs = entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("run_"))
    .map((entry) => entry.name)
    .sort();

  const latest = runDirs.at(-1);
  if (!latest) {
    throw new Error(`No run directories found under ${root}`);
  }

  return join(root, latest);
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${bytes} B`;
}

function buildDashboardModel(
  raw: RawIngestionArtifact,
  provisional: ProvisionalMasterParserArtifact,
  mastersPlan: NormalizationPlanArtifact,
  salesPlan: NormalizationPlanArtifact,
  paymentsPlan: NormalizationPlanArtifact
): DashboardModel {
  const canonicalCandidates = raw.candidates.filter(
    (candidate) => candidate.sourceRole === "canonical"
  );
  const productOutput = provisional.outputs.find((output) => output.fileCode === "SHSYO");
  const customerOutput = provisional.outputs.find((output) => output.fileCode === "SHTKI");

  return {
    runId: raw.runId,
    generatedAt: provisional.generatedAt,
    totalCandidates: raw.candidates.length,
    canonicalCandidates: canonicalCandidates.length,
    auxiliaryCandidates: raw.candidates.length - canonicalCandidates.length,
    canonicalSalesFiles: canonicalCandidates.filter((candidate) =>
      PRIMARY_FILE_CODES.has(candidate.fileCode)
    ),
    canonicalPaymentFiles: canonicalCandidates.filter((candidate) =>
      PAYMENT_FILE_CODES.has(candidate.fileCode)
    ),
    productSamples:
      productOutput?.records.slice(0, 8).map((record) => ({
        productCode: record.productCodeCandidate,
        janCode: record.janCandidate
      })) ?? [],
    customerSamples:
      customerOutput?.records.slice(0, 8).map((record) => ({
        customerCode: record.customerCodeCandidate,
        closingDay: record.closingDayCandidate,
        collectionRule: record.collectionRuleCandidate
      })) ?? [],
    masterEntities: mastersPlan.entities.map((entity) => entity.entityName),
    salesEntities: salesPlan.entities.map((entity) => entity.entityName),
    paymentEntities: paymentsPlan.entities.map((entity) => entity.entityName)
  };
}

function renderRows<T>(items: T[], render: (item: T, index: number) => string): string {
  if (items.length === 0) {
    return `<tr><td colspan="4" class="empty">候補データなし</td></tr>`;
  }

  return items.map(render).join("\n");
}

function renderDashboard(model: DashboardModel): string {
  const totalSalesBytes = model.canonicalSalesFiles.reduce((sum, file) => sum + file.fileSize, 0);
  const totalPaymentBytes = model.canonicalPaymentFiles.reduce(
    (sum, file) => sum + file.fileSize,
    0
  );

  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>syusen-cloud dashboard prototype</title>
    <style>
      :root {
        --primary: #0f5b8d;
        --primary-dark: #0a4368;
        --primary-soft: #e8f2f8;
        --danger: #c53d3d;
        --warning: #b7791f;
        --success: #2f855a;
        --info: #2b6cb0;
        --text-primary: #1f2933;
        --text-secondary: #52606d;
        --text-disabled: #9aa5b1;
        --border: #d9e2ec;
        --border-strong: #bcccdc;
        --background: #f7fafc;
        --surface: #ffffff;
        --surface-alt: #f2f5f7;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--background);
        color: var(--text-primary);
        font-family: "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", "Inter", sans-serif;
        line-height: 1.7;
        letter-spacing: 0.03em;
      }

      .layout {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 260px minmax(0, 1fr);
      }

      .sidebar {
        background: linear-gradient(180deg, #12344d 0%, #102a43 100%);
        color: #f0f4f8;
        padding: 24px 20px;
      }

      .brand {
        font-size: 22px;
        font-weight: 700;
        line-height: 1.4;
        letter-spacing: 0.01em;
      }

      .brand-sub {
        margin-top: 6px;
        font-size: 12px;
        color: #bcccdc;
      }

      .nav {
        margin-top: 28px;
        display: grid;
        gap: 10px;
      }

      .nav-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        font-size: 13px;
      }

      .nav-item.active {
        background: rgba(232, 242, 248, 0.16);
        border: 1px solid rgba(232, 242, 248, 0.22);
      }

      .status-badge {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 4px 8px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.02em;
      }

      .status-badge.info { background: #e6f0fb; color: var(--info); }
      .status-badge.success { background: #e7f6ee; color: var(--success); }
      .status-badge.warning { background: #fff4df; color: var(--warning); }

      main {
        padding: 24px;
        display: grid;
        gap: 24px;
      }

      .page-header {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 16px;
      }

      .page-title {
        font-size: 28px;
        font-weight: 700;
        line-height: 1.35;
        letter-spacing: 0.01em;
      }

      .page-meta {
        margin-top: 6px;
        color: var(--text-secondary);
        font-size: 12px;
      }

      .actions {
        display: flex;
        gap: 12px;
      }

      .button {
        border: 1px solid var(--border-strong);
        border-radius: 8px;
        padding: 10px 16px;
        font-size: 14px;
        font-weight: 700;
        cursor: default;
        background: var(--surface);
        color: var(--primary);
      }

      .button.primary {
        background: var(--primary);
        border-color: var(--primary);
        color: white;
      }

      .filters {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
        background: var(--surface-alt);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 16px;
      }

      .filter {
        display: grid;
        gap: 6px;
      }

      .filter label {
        font-size: 12px;
        color: var(--text-secondary);
        font-weight: 700;
      }

      .filter-value {
        background: var(--surface);
        border: 1px solid var(--border-strong);
        border-radius: 8px;
        min-height: 40px;
        padding: 10px 12px;
        font-size: 14px;
      }

      .kpis {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 16px;
      }

      .card {
        background: var(--surface);
        border: 1px solid #e5edf5;
        border-radius: 12px;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
        padding: 16px;
      }

      .kpi-label {
        color: var(--text-secondary);
        font-size: 12px;
        font-weight: 700;
      }

      .kpi-value {
        margin-top: 10px;
        font-size: 24px;
        line-height: 1.2;
        font-weight: 700;
        letter-spacing: 0;
      }

      .kpi-sub {
        margin-top: 8px;
        color: var(--text-secondary);
        font-size: 12px;
      }

      .content-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 24px;
      }

      .panel-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.45;
        margin-bottom: 12px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      }

      th, td {
        padding: 10px 12px;
        border-bottom: 1px solid var(--border);
        text-align: left;
        vertical-align: middle;
        font-size: 13px;
      }

      th {
        background: var(--surface-alt);
        color: var(--text-secondary);
        font-size: 12px;
        font-weight: 700;
      }

      td.mono, .mono {
        font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0;
      }

      td.right { text-align: right; }
      td.empty {
        color: var(--text-disabled);
        text-align: center;
      }

      .list {
        display: grid;
        gap: 10px;
      }

      .list-item {
        display: grid;
        gap: 4px;
        padding: 12px 14px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: var(--surface);
      }

      .list-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        font-size: 13px;
        font-weight: 700;
      }

      .list-sub {
        color: var(--text-secondary);
        font-size: 12px;
      }

      .footer-note {
        color: var(--text-secondary);
        font-size: 12px;
      }

      @media (max-width: 1100px) {
        .layout { grid-template-columns: 1fr; }
        .sidebar { display: none; }
        .filters, .kpis, .content-grid { grid-template-columns: 1fr; }
        main { padding: 16px; }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">syusen-cloud</div>
        <div class="brand-sub">legacy-first cloud operating layer</div>
        <div class="nav">
          <div class="nav-item active"><span>売上ダッシュボード</span><span class="status-badge info">MVP</span></div>
          <div class="nav-item"><span>入金確認</span><span class="status-badge warning">設計中</span></div>
          <div class="nav-item"><span>在庫確認</span><span class="status-badge warning">次段</span></div>
          <div class="nav-item"><span>帳票 / JAN</span><span class="status-badge success">改善候補</span></div>
        </div>
      </aside>
      <main>
        <section class="page-header">
          <div>
            <div class="page-title">売上ダッシュボード プロトタイプ</div>
            <div class="page-meta">run: ${model.runId} / generated: ${model.generatedAt}</div>
          </div>
          <div class="actions">
            <div class="button">CSV 定義確認</div>
            <div class="button primary">同期状況を確認</div>
          </div>
        </section>

        <section class="filters">
          <div class="filter"><label>期間</label><div class="filter-value">日次 / 最新 run</div></div>
          <div class="filter"><label>基準データ</label><div class="filter-value">既存基幹 (legacy source of truth)</div></div>
          <div class="filter"><label>売上系</label><div class="filter-value mono">SHDEN / SHTOR</div></div>
          <div class="filter"><label>入金系</label><div class="filter-value mono">SHNKI / SHSUJ / SHTNSUJ</div></div>
        </section>

        <section class="kpis">
          <div class="card">
            <div class="kpi-label">検出ファイル総数</div>
            <div class="kpi-value mono">${model.totalCandidates}</div>
            <div class="kpi-sub">canonical ${model.canonicalCandidates} / auxiliary ${model.auxiliaryCandidates}</div>
          </div>
          <div class="card">
            <div class="kpi-label">売上主系データ容量</div>
            <div class="kpi-value mono">${formatBytes(totalSalesBytes)}</div>
            <div class="kpi-sub">SHDEN と SHTOR の canonical 合計</div>
          </div>
          <div class="card">
            <div class="kpi-label">入金 / 請求候補容量</div>
            <div class="kpi-value mono">${formatBytes(totalPaymentBytes)}</div>
            <div class="kpi-sub">SHNKI / SHSUJ / SHTNSUJ / SHTEGATA</div>
          </div>
          <div class="card">
            <div class="kpi-label">master parser 候補</div>
            <div class="kpi-value mono">${model.productSamples.length + model.customerSamples.length}</div>
            <div class="kpi-sub">products + customers provisional sample</div>
          </div>
        </section>

        <section class="content-grid">
          <div class="card">
            <div class="panel-title">同期対象ファイル</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 88px;">code</th>
                  <th>path</th>
                  <th style="width: 120px;">size</th>
                  <th style="width: 90px;">role</th>
                </tr>
              </thead>
              <tbody>
                ${renderRows(
                  [...model.canonicalSalesFiles, ...model.canonicalPaymentFiles],
                  (file) => `
                  <tr>
                    <td class="mono">${file.fileCode}</td>
                    <td>${file.sourcePath}</td>
                    <td class="right mono">${formatBytes(file.fileSize)}</td>
                    <td><span class="status-badge info">${file.sourceRole}</span></td>
                  </tr>`
                )}
              </tbody>
            </table>
          </div>

          <div class="card">
            <div class="panel-title">core entities draft</div>
            <div class="list">
              <div class="list-item">
                <div class="list-head"><span>masters</span><span class="status-badge success">${model.masterEntities.length}</span></div>
                <div class="list-sub mono">${model.masterEntities.join(", ")}</div>
              </div>
              <div class="list-item">
                <div class="list-head"><span>sales</span><span class="status-badge success">${model.salesEntities.length}</span></div>
                <div class="list-sub mono">${model.salesEntities.join(", ")}</div>
              </div>
              <div class="list-item">
                <div class="list-head"><span>payments</span><span class="status-badge success">${model.paymentEntities.length}</span></div>
                <div class="list-sub mono">${model.paymentEntities.join(", ")}</div>
              </div>
            </div>
          </div>
        </section>

        <section class="content-grid">
          <div class="card">
            <div class="panel-title">商品候補サンプル</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 88px;">#</th>
                  <th>product code</th>
                  <th>JAN candidate</th>
                </tr>
              </thead>
              <tbody>
                ${renderRows(
                  model.productSamples,
                  (sample, index) => `
                  <tr>
                    <td class="mono">${index + 1}</td>
                    <td class="mono">${sample.productCode ?? "-"}</td>
                    <td class="mono">${sample.janCode ?? "-"}</td>
                  </tr>`
                )}
              </tbody>
            </table>
          </div>

          <div class="card">
            <div class="panel-title">得意先候補サンプル</div>
            <table>
              <thead>
                <tr>
                  <th>customer code</th>
                  <th style="width: 90px;">締日</th>
                  <th style="width: 110px;">回収条件</th>
                </tr>
              </thead>
              <tbody>
                ${renderRows(
                  model.customerSamples,
                  (sample) => `
                  <tr>
                    <td class="mono">${sample.customerCode ?? "-"}</td>
                    <td class="mono right">${sample.closingDay ?? "-"}</td>
                    <td class="mono right">${sample.collectionRule ?? "-"}</td>
                  </tr>`
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div class="footer-note">
          この画面は provisional artifact をもとにした静的プロトタイプです。次段では
          <span class="mono">products</span> / <span class="mono">customers</span> への実取り込みと、
          日次売上・未入金・JAN13桁帳票の実画面へつなげます。
        </div>
      </main>
    </div>
  </body>
</html>`;
}

async function main(): Promise<void> {
  const runsRoot = join(process.cwd(), "data", "runs");
  const artifactsDir = await findLatestRunDir(runsRoot);
  const context: DashboardContext = {
    runId: artifactsDir.split("\\").at(-1) ?? "unknown",
    generatedAt: new Date().toISOString(),
    artifactsDir
  };

  const raw = await readJson<RawIngestionArtifact>(join(artifactsDir, "raw-ingestion.json"));
  const provisional = await readJson<ProvisionalMasterParserArtifact>(
    join(artifactsDir, "profiles", "provisional-master-parser.json")
  );
  const mastersPlan = await readJson<NormalizationPlanArtifact>(
    join(artifactsDir, "normalization", "masters.plan.json")
  );
  const salesPlan = await readJson<NormalizationPlanArtifact>(
    join(artifactsDir, "normalization", "sales.plan.json")
  );
  const paymentsPlan = await readJson<NormalizationPlanArtifact>(
    join(artifactsDir, "normalization", "payments.plan.json")
  );

  const model = buildDashboardModel(raw, provisional, mastersPlan, salesPlan, paymentsPlan);
  const html = renderDashboard(model);
  const outputDir = join(context.artifactsDir, "dashboard");
  await mkdir(outputDir, { recursive: true });
  const targetPath = join(outputDir, "sales-dashboard-prototype.html");
  await writeFile(targetPath, html, "utf8");

  console.log(`[dashboard] run=${context.runId}`);
  console.log(`[dashboard] output=${targetPath}`);
}

main().catch((error) => {
  console.error("[dashboard] fatal", error);
  process.exitCode = 1;
});
