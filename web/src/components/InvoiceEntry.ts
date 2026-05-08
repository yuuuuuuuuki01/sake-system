import type { InvoiceFormData, InvoiceType, StaffMember } from "../api";
import { INVOICE_TYPE_LABELS } from "../api";
import type { FrequentItem } from "../api";

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
  errors: Record<string, string>,
  staffList: StaffMember[],
  frequentCustomers: FrequentItem[],
  frequentProducts: FrequentItem[]
): string {
  const typeOptions = (Object.keys(INVOICE_TYPE_LABELS) as InvoiceType[])
    .map(
      (type) =>
        `<option value="${type}" ${form.invoiceType === type ? "selected" : ""}>${INVOICE_TYPE_LABELS[type]}</option>`
    )
    .join("");

  // 担当者ドロップダウン
  const staffOptions = staffList
    .map(
      (s) =>
        `<option value="${escapeHtml(s.code)}" ${form.registeredBy === s.code ? "selected" : ""}>${escapeHtml(s.name)}（${escapeHtml(s.code)}）</option>`
    )
    .join("");

  // 営業担当表示（得意先紐付き）
  const salesStaffDisplay = form.staffCode
    ? (() => {
        const staff = staffList.find((s) => s.code === form.staffCode);
        return staff ? `${staff.name}（${staff.code}）` : form.staffCode;
      })()
    : "—";

  // よく使う得意先チップ
  const freqCustomerChips = frequentCustomers.length > 0
    ? `<div class="freq-chips">
        <span class="freq-label">よく使う:</span>
        ${frequentCustomers.map((c) =>
          `<button class="freq-chip" type="button" data-action="select-freq-customer" data-code="${escapeHtml(c.code)}" data-name="${escapeHtml(c.name)}" title="${c.count}件">${escapeHtml(c.name)}</button>`
        ).join("")}
      </div>`
    : "";

  // よく使う商品チップ
  const freqProductChips = frequentProducts.length > 0
    ? `<div class="freq-chips">
        <span class="freq-label">よく使う:</span>
        ${frequentProducts.map((p) =>
          `<button class="freq-chip" type="button" data-action="select-freq-product" data-code="${escapeHtml(p.code)}" data-name="${escapeHtml(p.name)}" title="${p.count}回">${escapeHtml(p.name)}</button>`
        ).join("")}
      </div>`
    : "";

  const lineRows = form.lines
    .map(
      (line, i) => `
      <tr>
        <td>
          <div class="input-group">
            <input class="${inputClass(errors, `lines.${i}.productCode`, "input-cell")}" type="text" data-line="${i}" data-field="productCode" value="${escapeHtml(line.productCode)}" placeholder="商品コード" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${i}" aria-label="商品検索">🔍</button>
          </div>
          ${fieldError(errors, `lines.${i}.productCode`)}
        </td>
        <td>
          <input class="${inputClass(errors, `lines.${i}.productName`, "input-cell")}" type="text" data-line="${i}" data-field="productName" value="${escapeHtml(line.productName)}" placeholder="商品名" data-autofill="product-name" />
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
          <span>納品日</span>
          <input id="inv-delivery-date" type="date" value="${form.deliveryDate || form.invoiceDate || toDateInputValue(new Date())}" />
          <div class="form-hint">空欄の場合は伝票日付と同じ</div>
        </label>
      </div>

      <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
        <label class="field">
          <span>得意先</span>
          <div class="input-group">
            <input
              class="${inputClass(errors, "customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="コードまたは名前で検索"
              value="${escapeHtml(form.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">コード・名前・カナで検索できます</div>
          ${fieldError(errors, "customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="名前で検索"
            value="${escapeHtml(form.customerName)}"
          />
        </label>
        <div class="field">
          <span>営業担当</span>
          <div class="staff-display" id="inv-sales-staff">${escapeHtml(salesStaffDisplay)}</div>
          <div class="form-hint">得意先に紐づく営業担当（自動セット）</div>
        </div>
      </div>

      ${freqCustomerChips}

      <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
        <label class="field">
          <span>伝票登録者</span>
          <div class="input-group">
            <select id="inv-registered-by">
              <option value="">選択してください</option>
              ${staffOptions}
            </select>
            <button class="button secondary small" type="button" data-action="open-new-staff" title="担当者を新規登録">＋</button>
          </div>
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
      ${freqProductChips}
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

    <style>
      .staff-display {
        padding: 8px 12px;
        background: var(--bg-subtle, #f3f4f6);
        border: 1px solid var(--border, #e5e7eb);
        border-radius: 6px;
        font-size: 0.9rem;
        color: var(--text, #111);
        min-height: 38px;
        display: flex;
        align-items: center;
      }
      .freq-chips {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        padding: 8px 0;
      }
      .freq-label {
        font-size: 0.75rem;
        color: var(--text-muted, #6b7280);
        font-weight: 600;
        white-space: nowrap;
      }
      .freq-chip {
        font-size: 0.75rem;
        padding: 3px 10px;
        border-radius: 12px;
        border: 1px solid #dbeafe;
        background: #eff6ff;
        color: #1d4ed8;
        cursor: pointer;
        transition: background 0.1s, border-color 0.1s;
        white-space: nowrap;
      }
      .freq-chip:hover {
        background: #dbeafe;
        border-color: #93c5fd;
      }
    </style>
  `;
}
