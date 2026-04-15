import type { ImportPreview, ImportableEntity } from "../utils/import";

const ENTITY_LABELS: Record<ImportableEntity, string> = {
  customers: "得意先マスタ",
  products: "商品マスタ",
  suppliers: "仕入先マスタ",
  staff: "担当者マスタ"
};

const ENTITY_HINTS: Record<ImportableEntity, { required: string[]; optional: string[] }> = {
  customers: {
    required: ["legacy_customer_code", "name"],
    optional: ["kana_name", "phone", "postal_code", "address1", "address2", "closing_day", "payment_day", "email"]
  },
  products: {
    required: ["legacy_product_code", "name"],
    optional: ["kana_name", "jan_code", "category_code", "volume_ml", "alcohol_degree", "list_price", "default_sale_price"]
  },
  suppliers: {
    required: ["legacy_supplier_code", "name"],
    optional: ["kana_name", "phone", "postal_code", "address1", "closing_day", "payment_day", "email"]
  },
  staff: {
    required: ["legacy_staff_code", "name"],
    optional: ["kana_name", "department"]
  }
};

export function renderDataImport(
  entity: ImportableEntity,
  preview: ImportPreview | null,
  importing: boolean,
  resultMessage: string | null
): string {
  const hints = ENTITY_HINTS[entity];

  const entityTabs = (Object.keys(ENTITY_LABELS) as ImportableEntity[])
    .map(
      (e) => `
      <button class="tab-button ${entity === e ? "active" : ""}" data-import-entity="${e}">
        ${ENTITY_LABELS[e]}
      </button>
    `
    )
    .join("");

  const previewHtml = preview
    ? `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>プレビュー（先頭10件 / 全${preview.totalRows}件）</h2>
          <p class="panel-caption">
            OK: ${preview.validRows}件 / NG: ${preview.invalidRows}件
          </p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              ${preview.columns.map((c) => `<th>${c}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${preview.rows
              .slice(0, 10)
              .map(
                (row, i) => `
              <tr class="${row._valid ? "" : "has-error"}">
                <td>${i + 1}</td>
                ${preview.columns
                  .map((c) => `<td>${String((row as Record<string, unknown>)[c] ?? "")}</td>`)
                  .join("")}
                <td>${row._valid ? '<span class="status-pill success">OK</span>' : `<span class="status-pill warning">${row._error ?? "NG"}</span>`}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="action-bar">
        <button class="button secondary" data-action="import-cancel">キャンセル</button>
        <button class="button primary" data-action="import-execute"
          ${importing || preview.validRows === 0 ? "disabled" : ""}>
          ${importing ? "取り込み中…" : `${preview.validRows}件をSupabaseに登録`}
        </button>
      </div>
    </section>
  `
    : "";

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">データ投入</p>
        <h1>CSV/Excelインポート</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>対象エンティティ</h2>
      </div>
      <div class="tab-group" style="flex-wrap: wrap;">${entityTabs}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${ENTITY_LABELS[entity]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${hints.required.map((c) => `<code class="config-value">${c}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${hints.optional.map((c) => `<code class="config-value">${c}</code>`).join(" / ")}</dd>
        </div>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="download-template" data-entity="${entity}">
          📥 テンプレートCSVダウンロード
        </button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>ファイル選択</h2>
      </div>
      <label class="field">
        <span>CSVファイル (UTF-8)</span>
        <input id="import-file" type="file" accept=".csv,text/csv" />
      </label>
      <div class="action-bar">
        <button class="button primary" data-action="import-parse">プレビュー表示</button>
      </div>
    </section>

    ${previewHtml}

    ${
      resultMessage
        ? `<section class="panel"><p class="sync-message">${resultMessage}</p></section>`
        : ""
    }
  `;
}
