import type { InvoiceFormData, InvoiceType } from "../api";
import { INVOICE_TYPE_LABELS } from "../api";

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fieldError(errors: Record<string, string>, key: string): string {
  return errors[key] ? `<div class="field-error">${escapeHtml(errors[key])}</div>` : "";
}

function inputClass(errors: Record<string, string>, key: string, baseClass = ""): string {
  return [baseClass, errors[key] ? "has-error" : ""].filter(Boolean).join(" ");
}

export function renderInvoiceEntry(
  form: InvoiceFormData,
  savedDocNo: string | null,
  saving: boolean,
  errors: Record<string, string>
): string {
  const typeOptions = (Object.keys(INVOICE_TYPE_LABELS) as InvoiceType[])
    .map(
      (type) =>
        `<option value="${type}" ${form.invoiceType === type ? "selected" : ""}>${INVOICE_TYPE_LABELS[type]}</option>`
    )
    .join("");

  const lineRows = form.lines
    .map(
      (line, i) => `
      <tr>
        <td>
          <div class="input-group">
            <input class="${inputClass(errors, `lines.${i}.productCode`, "input-cell")}" type="text" data-line="${i}" data-field="productCode" value="${escapeHtml(line.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${i}" aria-label="商品検索">🔍</button>
          </div>
          ${fieldError(errors, `lines.${i}.productCode`)}
        </td>
        <td>
          <input class="${inputClass(errors, `lines.${i}.productName`, "input-cell")}" type="text" data-line="${i}" data-field="productName" value="${escapeHtml(line.productName)}" placeholder="商品名" />
          ${fieldError(errors, `lines.${i}.productName`)}
        </td>
        <td>
          <input class="${inputClass(errors, `lines.${i}.quantity`, "input-cell numeric")}" type="number" data-line="${i}" data-field="quantity" value="${line.quantity}" min="0" />
          ${fieldError(errors, `lines.${i}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${i}" data-field="unit" value="${line.unit}" placeholder="本" /></td>
        <td>
          <input class="${inputClass(errors, `lines.${i}.unitPrice`, "input-cell numeric")}" type="number" data-line="${i}" data-field="unitPrice" value="${line.unitPrice}" min="0" />
          ${fieldError(errors, `lines.${i}.unitPrice`)}
        </td>
        <td class="numeric">${line.amount > 0 ? line.amount.toLocaleString("ja-JP") : "―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${i}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${i}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");

  const totalAmount = form.lines.reduce((sum, l) => sum + l.amount, 0);
  const taxAmount = Math.floor((totalAmount * 10) / 110);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">伝票入力</p>
        <h1>売上伝票入力</h1>
      </div>
      ${
        savedDocNo
          ? `<div class="meta-stack"><span class="status-pill success">保存済 ${savedDocNo}</span></div>`
          : ""
      }
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>伝票基本情報</h2>
        <button class="button secondary" type="button" data-action="copy-past-invoice">過去伝票から複製</button>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>伝票種別</span>
          <select id="inv-type">${typeOptions}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${inputClass(errors, "invoiceDate")}" id="inv-date" type="date" value="${form.invoiceDate || toDateInputValue(new Date())}" />
          ${fieldError(errors, "invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${inputClass(errors, "customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${escapeHtml(form.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${fieldError(errors, "customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${escapeHtml(form.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${escapeHtml(form.staffCode)}" />
        </label>
      </div>
      ${fieldError(errors, "lines")}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${form.lines.length} 行</p>
        </div>
        <button class="button secondary" data-action="add-line">＋ 行追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>商品コード</th>
              <th>商品名</th>
              <th class="numeric">数量</th>
              <th>単位</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="invoice-lines">${lineRows || `<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>`}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(totalAmount - taxAmount).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${taxAmount.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${totalAmount.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${escapeHtml(form.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${saving ? "disabled" : ""}>
        ${saving ? "保存中…" : "保存する"}
      </button>
    </div>
  `;
}
