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
  const tabs = (Object.keys(PRINT_TEMPLATE_LABELS) as PrintTemplateKey[])
    .map(
      (t) => `
      <button class="tab-button ${template === t ? "active" : ""}" data-print-template="${t}">
        ${PRINT_TEMPLATE_LABELS[t]}
      </button>
    `
    )
    .join("");

  // プレビュー
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

  const lineRows = data.lines
    .map(
      (line, i) => `
      <tr>
        <td><input class="input-cell mono" type="text" data-print-line="${i}" data-print-lfield="productCode" value="${line.productCode}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${i}" data-print-lfield="productName" value="${line.productName}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${i}" data-print-lfield="spec" value="${line.spec ?? ""}" placeholder="720ml" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${i}" data-print-lfield="quantity" value="${line.quantity}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${i}" data-print-lfield="unit" value="${line.unit}" placeholder="本" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${i}" data-print-lfield="unitPrice" value="${line.unitPrice}" /></td>
        <td class="numeric">${line.amount > 0 ? line.amount.toLocaleString("ja-JP") : "―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${i}" title="削除">✕</button></td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">印刷センター</p>
        <h1>伝票・見積・請求の印刷</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="print-execute" onclick="window.print()">🖨️ 印刷する</button>
      </div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>テンプレート選択</h2>
      </div>
      <div class="tab-group">${tabs}</div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>書類情報</h2>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>書類番号</span>
          <input type="text" data-print-field="documentNo" value="${data.documentNo}" />
        </label>
        <label class="field">
          <span>${template === "quotation" ? "見積日" : template === "invoice_monthly" ? "請求日" : "納品日"}</span>
          <input type="date" data-print-field="documentDate" value="${data.documentDate}" />
        </label>
        ${
          template === "quotation"
            ? `<label class="field"><span>有効期限</span><input type="date" data-print-field="expireDate" value="${data.expireDate ?? ""}" /></label>`
            : ""
        }
        ${
          template === "invoice_monthly"
            ? `<label class="field"><span>お支払期限</span><input type="date" data-print-field="dueDate" value="${data.dueDate ?? ""}" /></label>`
            : ""
        }
        <label class="field">
          <span>得意先コード</span>
          <input type="text" data-print-field="customerCode" value="${data.customerCode ?? ""}" />
        </label>
        <label class="field">
          <span>得意先名</span>
          <input type="text" data-print-field="customerName" value="${data.customerName}" />
        </label>
        <label class="field">
          <span>敬称</span>
          <select data-print-field="customerHonorific">
            <option value="御中" ${data.customerHonorific === "御中" ? "selected" : ""}>御中</option>
            <option value="様" ${data.customerHonorific === "様" ? "selected" : ""}>様</option>
            <option value="殿" ${data.customerHonorific === "殿" ? "selected" : ""}>殿</option>
          </select>
        </label>
        <label class="field">
          <span>郵便番号</span>
          <input type="text" data-print-field="customerPostalCode" value="${data.customerPostalCode ?? ""}" placeholder="100-0001" />
        </label>
        <label class="field">
          <span>住所</span>
          <input type="text" data-print-field="customerAddress" value="${data.customerAddress ?? ""}" />
        </label>
        ${
          template === "quotation"
            ? `<label class="field"><span>件名</span><input type="text" data-print-field="title" value="${data.title ?? ""}" placeholder="純米吟醸 出荷見積" /></label>`
            : ""
        }
        <label class="field">
          <span>消費税率</span>
          <select data-print-field="taxRate">
            <option value="0.10" ${data.taxRate === 0.10 ? "selected" : ""}>10%</option>
            <option value="0.08" ${data.taxRate === 0.08 ? "selected" : ""}>8% 軽減税率</option>
          </select>
        </label>
        ${
          template === "invoice_monthly"
            ? `
              <label class="field"><span>前回請求額</span><input type="number" data-print-field="previousBalance" value="${data.previousBalance ?? 0}" /></label>
              <label class="field"><span>ご入金額</span><input type="number" data-print-field="paymentAmount" value="${data.paymentAmount ?? 0}" /></label>
            `
            : ""
        }
      </div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${data.lines.length} 行</p>
        </div>
        <button class="button secondary" data-action="print-add-line">＋ 行追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>商品CD</th>
              <th>品名</th>
              <th>規格</th>
              <th class="numeric">数量</th>
              <th>単位</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${lineRows || '<tr><td colspan="8" class="empty-row">「＋行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <label class="field" style="margin-top:16px;">
        <span>備考</span>
        <textarea data-print-field="remarks" rows="2">${data.remarks ?? ""}</textarea>
      </label>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>印刷オプション</h2>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>用紙サイズ</span>
          <select data-print-opt="pageSize">
            <option value="A4" ${options.pageSize === "A4" ? "selected" : ""}>A4</option>
            <option value="A5" ${options.pageSize === "A5" ? "selected" : ""}>A5</option>
            <option value="B5" ${options.pageSize === "B5" ? "selected" : ""}>B5</option>
          </select>
        </label>
        <label class="field">
          <span>向き</span>
          <select data-print-opt="orientation">
            <option value="portrait" ${options.orientation === "portrait" ? "selected" : ""}>縦</option>
            <option value="landscape" ${options.orientation === "landscape" ? "selected" : ""}>横</option>
          </select>
        </label>
        <label class="field">
          <span>文字サイズ</span>
          <select data-print-opt="fontSize">
            <option value="small" ${options.fontSize === "small" ? "selected" : ""}>小</option>
            <option value="medium" ${options.fontSize === "medium" ? "selected" : ""}>中</option>
            <option value="large" ${options.fontSize === "large" ? "selected" : ""}>大</option>
          </select>
        </label>
        <label class="field">
          <span>カラーモード</span>
          <select data-print-opt="colorMode">
            <option value="color" ${options.colorMode === "color" ? "selected" : ""}>カラー</option>
            <option value="mono" ${options.colorMode === "mono" ? "selected" : ""}>モノクロ</option>
          </select>
        </label>
      </div>
      <div style="margin-top:16px; display:flex; flex-wrap:wrap; gap:16px;">
        <label><input type="checkbox" data-print-opt="showSeal" ${options.showSeal ? "checked" : ""} /> 印影を表示</label>
        <label><input type="checkbox" data-print-opt="showRegistrationNo" ${options.showRegistrationNo ? "checked" : ""} /> インボイス登録番号</label>
        <label><input type="checkbox" data-print-opt="showBankInfo" ${options.showBankInfo ? "checked" : ""} /> 振込先</label>
        <label><input type="checkbox" data-print-opt="showJanCode" ${options.showJanCode ? "checked" : ""} /> JANコード</label>
        <label><input type="checkbox" data-print-opt="showUnit" ${options.showUnit ? "checked" : ""} /> 単位列</label>
        <label><input type="checkbox" data-print-opt="showRemarks" ${options.showRemarks ? "checked" : ""} /> 備考</label>
      </div>
      <div class="action-bar" style="margin-top:12px;">
        <button class="button secondary" data-action="print-save-settings">💾 この設定を保存</button>
        <button class="button secondary" data-action="print-open-company">🏢 会社情報を編集</button>
      </div>
    </section>

    <section class="panel print-preview-panel">
      <div class="panel-header no-print">
        <h2>プレビュー</h2>
        <p class="panel-caption">実際に印刷されるイメージ</p>
      </div>
      <div class="print-preview ${options.colorMode}">
        ${preview}
      </div>
    </section>
  `;
}
