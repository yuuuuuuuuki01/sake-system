import type { PrintCompanyInfo, PrintDocumentData, PrintOptions } from "../templates/printTypes";

interface FieldPlacement {
  id: string;
  label: string;
  x: number; // mm
  y: number; // mm
  fontSize: number; // pt
  value: string;
  color: string;
}

const FIELD_COLORS: Record<string, string> = {
  header: "#2196F3",
  code: "#4CAF50",
  date: "#FF9800",
  detail: "#9C27B0",
  total: "#F44336"
};

function buildPlacements(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  saved: Record<string, { x: number; y: number }> | null
): FieldPlacement[] {
  const fields: FieldPlacement[] = [
    // ヘッダー
    { id: "documentNo", label: "伝票番号", x: 155, y: 4, fontSize: 9, value: data.documentNo, color: FIELD_COLORS.header },
    { id: "vendorName", label: "社名", x: 4, y: 12, fontSize: 10, value: company.name, color: FIELD_COLORS.header },
    { id: "vendorAddress", label: "住所", x: 4, y: 17, fontSize: 7, value: company.address1, color: FIELD_COLORS.header },
    { id: "customerName", label: "取引先名", x: 4, y: 20, fontSize: 10, value: `${data.customerName} ${data.customerHonorific}`, color: FIELD_COLORS.header },

    // コード
    { id: "chainStoreCode", label: "柱店CD", x: 63, y: 13, fontSize: 9, value: data.chainStoreCode ?? "", color: FIELD_COLORS.code },
    { id: "categoryCode", label: "分類CD", x: 87, y: 13, fontSize: 9, value: data.categoryCode ?? "", color: FIELD_COLORS.code },
    { id: "slipNumber", label: "伝票No.", x: 117, y: 13, fontSize: 9, value: data.documentNo, color: FIELD_COLORS.code },
    { id: "vendorCode", label: "取引CD", x: 151, y: 13, fontSize: 9, value: data.slipTypeCode ?? "", color: FIELD_COLORS.code },
    { id: "partnerCode", label: "取引先CD", x: 94, y: 20, fontSize: 10, value: data.vendorCode ?? "", color: FIELD_COLORS.code },
    { id: "orderNo", label: "受注No.", x: 143, y: 20, fontSize: 9, value: data.orderNo ?? "", color: FIELD_COLORS.code },

    // 日付
    { id: "currentDate", label: "当日日付", x: 10, y: 3.5, fontSize: 8, value: data.documentDate.replace(/-/g, "/"), color: FIELD_COLORS.date },
    { id: "orderDate", label: "発注日", x: 180, y: 13, fontSize: 7.5, value: (data.orderDate ?? "").replace(/-/g, "/"), color: FIELD_COLORS.date },
    { id: "deliveryDate", label: "納品日", x: 204, y: 13, fontSize: 7.5, value: (data.deliveryDate ?? "").replace(/-/g, "/"), color: FIELD_COLORS.date }
  ];

  // 明細行 (最大6行)
  data.lines.slice(0, 6).forEach((line, i) => {
    const baseY = 33 + i * 8.5;
    fields.push(
      { id: `line${i}_name`, label: `明細${i + 1} 品名`, x: 5, y: baseY, fontSize: 7.5, value: line.productName + (line.spec ? ` ${line.spec}` : ""), color: FIELD_COLORS.detail },
      { id: `line${i}_code`, label: `明細${i + 1} CD`, x: 64, y: baseY, fontSize: 7.5, value: line.productCode, color: FIELD_COLORS.detail },
      { id: `line${i}_qty`, label: `明細${i + 1} 数量`, x: 124, y: baseY, fontSize: 8, value: line.quantity > 0 ? String(line.quantity) : "", color: FIELD_COLORS.detail },
      { id: `line${i}_price`, label: `明細${i + 1} 原単価`, x: 163, y: baseY, fontSize: 8, value: line.unitPrice > 0 ? line.unitPrice.toLocaleString("ja-JP") : "", color: FIELD_COLORS.detail },
      { id: `line${i}_amount`, label: `明細${i + 1} 原価金額`, x: 176, y: baseY, fontSize: 8, value: line.amount > 0 ? line.amount.toLocaleString("ja-JP") : "", color: FIELD_COLORS.detail },
      { id: `line${i}_retail`, label: `明細${i + 1} 売単価`, x: 193, y: baseY, fontSize: 8, value: line.retailPrice ? line.retailPrice.toLocaleString("ja-JP") : "", color: FIELD_COLORS.detail }
    );
  });

  // 合計
  const costTotal = data.lines.reduce((s, l) => s + (l.amount || 0), 0);
  const qtyTotal = data.lines.reduce((s, l) => s + l.quantity, 0);
  fields.push(
    { id: "totalQty", label: "合計数量", x: 125, y: 89, fontSize: 9, value: String(qtyTotal), color: FIELD_COLORS.total },
    { id: "costTotal", label: "原価金額合計", x: 179, y: 89, fontSize: 10, value: costTotal.toLocaleString("ja-JP"), color: FIELD_COLORS.total }
  );

  // saved位置を適用
  if (saved) {
    fields.forEach((f) => {
      const s = saved[f.id];
      if (s) {
        f.x = s.x;
        f.y = s.y;
      }
    });
  }

  return fields;
}

export function renderFormDesigner(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  opts: PrintOptions,
  savedPositions: Record<string, { x: number; y: number }> | null,
  designMode: boolean
): string {
  const placements = buildPlacements(data, company, savedPositions);

  const fieldBoxes = placements
    .map(
      (f) => `
      <div class="fd-field ${designMode ? "fd-draggable" : ""}"
           data-fd-id="${f.id}"
           style="left:${f.x}mm; top:${f.y}mm; font-size:${f.fontSize}pt; --fd-color:${f.color};"
           title="${f.label} (${f.x.toFixed(1)}, ${f.y.toFixed(1)})">
        ${designMode ? `<span class="fd-badge">${f.label}</span>` : ""}
        <span class="fd-value">${f.value}</span>
      </div>
    `
    )
    .join("");

  const overlayBg = opts.showReferenceOverlay && opts.overlayImageUrl
    ? `background-image: url('${opts.overlayImageUrl}'); background-size: 100% 100%;`
    : "";

  return `
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">帳票デザイナー</p>
        <h1>BP1701 フォーム配置</h1>
      </div>
      <div class="meta-stack">
        <button class="button ${designMode ? "primary" : "secondary"}" data-action="fd-toggle-design">
          ${designMode ? "🔧 配置モードON" : "▶ プレビューモード"}
        </button>
        <button class="button secondary" data-action="fd-save-positions">💾 位置を保存</button>
        <button class="button secondary" data-action="fd-reset-positions">🔄 初期化</button>
        <button class="button primary" onclick="window.print()">🖨️ 印刷</button>
      </div>
    </section>

    ${
      designMode
        ? `
    <section class="panel no-print">
      <p class="form-hint" style="margin:0;">
        <strong>配置モード:</strong> テキストボックスを<b>ドラッグ</b>して帳票の枠に合わせてください。
        位置は「💾 位置を保存」でブラウザに記憶します。<br/>
        色分け: <span style="color:${FIELD_COLORS.header}">■ ヘッダー</span>
        <span style="color:${FIELD_COLORS.code}">■ コード</span>
        <span style="color:${FIELD_COLORS.date}">■ 日付</span>
        <span style="color:${FIELD_COLORS.detail}">■ 明細</span>
        <span style="color:${FIELD_COLORS.total}">■ 合計</span>
      </p>
    </section>
    `
        : ""
    }

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas" style="${overlayBg}">
        ${fieldBoxes}
      </div>
    </section>

    ${
      designMode
        ? `
    <section class="panel no-print">
      <div class="panel-header">
        <h2>選択フィールド</h2>
      </div>
      <div id="fd-selected-info" class="form-hint">フィールドをクリックすると詳細が表示されます</div>
      <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
        <label class="field">
          <span>X (mm)</span>
          <input type="number" id="fd-sel-x" step="0.5" value="0" data-action="fd-nudge-x" />
        </label>
        <label class="field">
          <span>Y (mm)</span>
          <input type="number" id="fd-sel-y" step="0.5" value="0" data-action="fd-nudge-y" />
        </label>
        <label class="field">
          <span>フォントサイズ (pt)</span>
          <input type="number" id="fd-sel-fs" step="0.5" value="8" />
        </label>
      </div>
      <p class="form-hint" style="margin-top:8px;">方向キー(↑↓←→)でも0.5mm単位で微調整できます。</p>
    </section>
    `
        : ""
    }

    <section class="panel no-print">
      <div class="panel-header"><h2>画像オーバーレイ</h2></div>
      <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center;">
        <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${opts.showReferenceOverlay ? "checked" : ""} /> 参考画像表示</label>
        <label style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">濃さ</span>
          <input type="range" min="0" max="1" step="0.05" value="${opts.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
        </label>
      </div>
    </section>
  `;
}

// フィールド位置を収集するユーティリティ（main.tsから呼ぶ用）
export function collectFieldPositions(container: HTMLElement): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  container.querySelectorAll<HTMLElement>("[data-fd-id]").forEach((el) => {
    const id = el.dataset.fdId ?? "";
    const x = parseFloat(el.style.left) || 0;
    const y = parseFloat(el.style.top) || 0;
    positions[id] = { x, y };
  });
  return positions;
}
