import type {
  PrintCompanyInfo,
  PrintDocumentData,
  PrintOptions,
  PrintTemplateKey
} from "../templates/printTypes";
import { PRINT_TEMPLATE_LABELS } from "../templates/printTypes";
import { renderChainStoreSlip } from "../templates/ChainStoreSlip";
import { renderInvoiceDocument } from "../templates/InvoiceDocument";
import { renderQuotation } from "../templates/QuotationDocument";

export function renderPrintCenter(
  template: PrintTemplateKey,
  options: PrintOptions,
  company: PrintCompanyInfo,
  data: PrintDocumentData
): string {
  // テンプレートプレビュー生成
  let preview = "";
  switch (template) {
    case "chain_store":
      preview = renderChainStoreSlip(data, company, options);
      break;
    case "quotation":
      preview = renderQuotation(data, company, options);
      break;
    case "invoice_monthly":
      preview = renderInvoiceDocument(data, company, options);
      break;
  }

  // テンプレートタブ
  const tabs = (Object.keys(PRINT_TEMPLATE_LABELS) as PrintTemplateKey[])
    .map(
      (t) => `<button class="tab-button ${template === t ? "active" : ""}" data-print-template="${t}">${PRINT_TEMPLATE_LABELS[t]}</button>`
    )
    .join("");

  // 明細行
  const lineRows = data.lines
    .map(
      (line, i) => `
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${i}" data-print-lfield="productName" value="${line.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${i}" data-print-lfield="quantity" value="${line.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${i}" data-print-lfield="unitPrice" value="${line.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${line.amount > 0 ? line.amount.toLocaleString("ja-JP") : "―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${i}">✕</button></td>
      </tr>`
    )
    .join("");

  // チェックボックス群
  const checks = [
    { key: "showSeal", label: "印影" },
    { key: "showRegistrationNo", label: "登録番号" },
    { key: "showBankInfo", label: "振込先" },
    { key: "showJanCode", label: "JAN" },
    { key: "showRemarks", label: "備考" }
  ]
    .map(
      (c) =>
        `<label style="font-size:12px;"><input type="checkbox" data-print-opt="${c.key}" ${(options as Record<string, unknown>)[c.key] ? "checked" : ""} /> ${c.label}</label>`
    )
    .join(" ");

  return `
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">印刷</p>
        <h1>印刷センター</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" onclick="window.print()">🖨️ 印刷する</button>
      </div>
    </section>

    <div class="no-print" style="margin-bottom:16px;">
      <div class="tab-group">${tabs}</div>
    </div>

    <div class="print-layout no-print">
      <!-- 左: 設定 -->
      <div class="print-settings">

        <div class="panel">
          <h3 class="panel-title" style="margin-bottom:12px;">書類情報</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <label class="field" style="flex:1 1 120px;">
              <span>書類番号</span>
              <input type="text" data-print-field="documentNo" value="${data.documentNo}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>日付</span>
              <input type="date" data-print-field="documentDate" value="${data.documentDate}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>得意先名</span>
              <input type="text" data-print-field="customerName" value="${data.customerName}" />
            </label>
            <label class="field" style="flex:1 1 60px;">
              <span>敬称</span>
              <select data-print-field="customerHonorific">
                <option value="御中" ${data.customerHonorific === "御中" ? "selected" : ""}>御中</option>
                <option value="様" ${data.customerHonorific === "様" ? "selected" : ""}>様</option>
              </select>
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>税率</span>
              <select data-print-field="taxRate">
                <option value="0.10" ${data.taxRate === 0.10 ? "selected" : ""}>10%</option>
                <option value="0.08" ${data.taxRate === 0.08 ? "selected" : ""}>8%</option>
              </select>
            </label>
            ${
              template === "invoice_monthly"
                ? `
                <label class="field" style="flex:1 1 100px;">
                  <span>お支払期限</span>
                  <input type="date" data-print-field="dueDate" value="${data.dueDate ?? ""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>前回請求額</span>
                  <input type="number" data-print-field="previousBalance" value="${data.previousBalance ?? 0}" />
                </label>`
                : ""
            }
            ${
              template === "chain_store"
                ? `
                <label class="field" style="flex:1 1 100px;">
                  <span>柱店CD</span>
                  <input type="text" data-print-field="chainStoreCode" value="${data.chainStoreCode ?? ""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>伝票区分</span>
                  <input type="text" data-print-field="slipTypeCode" value="${data.slipTypeCode ?? ""}" />
                </label>`
                : ""
            }
          </div>
        </div>

        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 class="panel-title">明細 (${data.lines.length}行)</h3>
            <button class="button secondary" data-action="print-add-line" style="padding:6px 12px;font-size:12px;">＋行追加</button>
          </div>
          <div class="table-wrap">
            <table style="min-width:auto;">
              <thead><tr><th>品名</th><th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th><th></th></tr></thead>
              <tbody>${lineRows || '<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
            </table>
          </div>
        </div>

        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">⚙️ 表示オプション</summary>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
            ${checks}
          </div>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;">
            <label class="field" style="flex:0 0 80px;">
              <span>文字サイズ</span>
              <select data-print-opt="fontSize">
                <option value="small" ${options.fontSize === "small" ? "selected" : ""}>小</option>
                <option value="medium" ${options.fontSize === "medium" ? "selected" : ""}>中</option>
                <option value="large" ${options.fontSize === "large" ? "selected" : ""}>大</option>
              </select>
            </label>
            <label class="field" style="flex:0 0 100px;">
              <span>カラー</span>
              <select data-print-opt="colorMode">
                <option value="color" ${options.colorMode === "color" ? "selected" : ""}>カラー</option>
                <option value="mono" ${options.colorMode === "mono" ? "selected" : ""}>モノクロ</option>
              </select>
            </label>
          </div>
          <div style="margin-top:12px;display:flex;gap:8px;">
            <button class="button secondary" data-action="print-save-settings" style="font-size:12px;">💾 設定を保存</button>
            <button class="button secondary" data-action="print-open-company" style="font-size:12px;">🏢 会社情報</button>
          </div>
        </details>

        ${
          template === "chain_store"
            ? `
        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">📐 BP1701 位置合わせ</summary>
          <div style="margin-top:12px;">
            <p style="font-size:12px;color:var(--text-secondary);margin:0 0 8px;">
              帳票デザイナー(<a href="#" data-link="/form-designer" style="color:var(--primary);">/form-designer</a>)でドラッグ配置するのが正確です。
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
              <label style="font-size:12px;"><input type="checkbox" data-print-opt="showReferenceOverlay" ${options.showReferenceOverlay ? "checked" : ""} /> 参考画像表示</label>
              <label style="display:flex;align-items:center;gap:4px;font-size:12px;">
                濃さ <input type="range" min="0" max="1" step="0.05" value="${options.overlayOpacity}" data-print-opt="overlayOpacity" style="width:80px;" />
              </label>
            </div>
          </div>
        </details>`
            : ""
        }
      </div>

      <!-- 右: プレビュー -->
      <div class="print-preview-area">
        <div class="panel print-preview-panel">
          <div class="print-preview-scaler" id="print-scaler">
            <div class="print-preview ${options.colorMode}">
              ${preview}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 印刷時はプレビューだけ表示 -->
    <div class="print-only">
      <div class="print-preview ${options.colorMode}">
        ${preview}
      </div>
    </div>
  `;
}
