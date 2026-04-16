import type {
  PrintCompanyInfo,
  PrintDocumentData,
  PrintOptions
} from "./printTypes";

// チェーンストア統一伝票 ターンアラウンド用 1型 (BP1701相当)
// 実物レイアウト参照: /reference/chainstore_ref.png
//
// タイトル: チェーンストア統一伝票（ターンアラウンド用 1型）
// サブタイトル: 仕入伝票①
//
// 上段（コード行）:
//   - 社名 / 住所
//   - 柱店コード / 分類コード伝票 / 伝票番号 / 取引コード
//   - 発注日 / 納品日 / 受注No / 取引先コード
//   - 決算出力フラグ
//
// 中段（明細6行）:
//   品名・規格 | 商品コード | 色 | サイズ/入数/ケース | 単位 | 数量 | 行 |
//   訂正後数量 | 引(引下) | 原単価 | 原価金額 | 売単価 | 備考(受領金額)
//
// 下段:
//   合計行 / 受領金額合計 / 返品金額合計 / 訂正後原価金額合計 / 訂正後売価金額合計

const FIXED_ROWS = 6;

function formatWareki(iso: string): { era: string; month: string; day: string } {
  if (!iso) return { era: "", month: "", day: "" };
  const d = new Date(iso);
  const y = d.getFullYear();
  const reiwa = y - 2018;
  return {
    era: reiwa > 0 ? `令${reiwa}` : String(y).slice(-2),
    month: String(d.getMonth() + 1).padStart(2, "0"),
    day: String(d.getDate()).padStart(2, "0")
  };
}

export function renderChainStoreSlip(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  opts: PrintOptions
): string {
  const orderDate = formatWareki(data.orderDate ?? data.documentDate);
  const deliveryDate = formatWareki(data.deliveryDate ?? data.documentDate);

  // 合計
  const costTotal = data.lines.reduce((s, l) => s + (l.amount || 0), 0);
  const retailTotal = data.lines.reduce(
    (s, l) => s + (l.retailPrice || 0) * (l.correctedQuantity ?? l.quantity),
    0
  );
  const receivedTotal = data.lines.reduce((s, l) => s + (l.receivedAmount || 0), 0);
  const returnTotal = data.lines.reduce((s, l) => s + (l.returnAmount || 0), 0);
  const quantityTotal = data.lines.reduce((s, l) => s + l.quantity, 0);

  // 明細6行を固定生成
  const rows = Array.from({ length: FIXED_ROWS }, (_, i) => {
    const line = data.lines[i];
    const rowNo = i + 1;
    if (!line) {
      return `
        <tr class="bp-empty-row">
          <td class="bp-name"></td>
          <td class="bp-pcode"></td>
          <td class="bp-color"></td>
          <td class="bp-size"></td>
          <td class="bp-unit"></td>
          <td class="bp-qty"></td>
          <td class="bp-rowno">${rowNo}</td>
          <td class="bp-corr-qty"></td>
          <td class="bp-discount"></td>
          <td class="bp-cost-price"></td>
          <td class="bp-cost-amount"></td>
          <td class="bp-retail-price"></td>
          <td class="bp-note"></td>
        </tr>`;
    }

    const caseStr = line.caseQty && line.caseQty > 1 ? String(line.caseQty) : "";
    return `
      <tr>
        <td class="bp-name">${line.productName}${line.spec ? `<br/><span class="bp-spec">${line.spec}</span>` : ""}</td>
        <td class="bp-pcode mono">${line.productCode}</td>
        <td class="bp-color">${line.color ?? ""}</td>
        <td class="bp-size">
          ${line.size ?? ""}
          ${caseStr ? `<div class="bp-subdiv">入${caseStr}</div>` : ""}
        </td>
        <td class="bp-unit">${line.unit}</td>
        <td class="bp-qty numeric">${line.quantity > 0 ? line.quantity.toLocaleString("ja-JP") : ""}</td>
        <td class="bp-rowno">${rowNo}</td>
        <td class="bp-corr-qty numeric">${line.correctedQuantity ? line.correctedQuantity.toLocaleString("ja-JP") : ""}</td>
        <td class="bp-discount numeric">${line.discount ? line.discount.toLocaleString("ja-JP") : ""}</td>
        <td class="bp-cost-price numeric">${line.unitPrice > 0 ? line.unitPrice.toLocaleString("ja-JP") : ""}</td>
        <td class="bp-cost-amount numeric">${line.amount > 0 ? line.amount.toLocaleString("ja-JP") : ""}</td>
        <td class="bp-retail-price numeric">${line.retailPrice ? line.retailPrice.toLocaleString("ja-JP") : ""}</td>
        <td class="bp-note numeric">${line.receivedAmount ? line.receivedAmount.toLocaleString("ja-JP") : ""}</td>
      </tr>`;
  }).join("");

  const overlay =
    opts.showReferenceOverlay && opts.overlayImageUrl
      ? `<img class="bp-overlay" src="${opts.overlayImageUrl}" style="opacity:${opts.overlayOpacity};" alt="参考" />`
      : "";

  return `
    <div class="print-page bp1701 ${opts.fontSize}">
      <div class="bp1701-slip">
        ${overlay}

        <!-- 最上部: タイトル行 -->
        <div class="bp-topbar">
          <div class="bp-date-cell">
            <div class="bp-label">当日日付</div>
            <div class="bp-date-boxes">
              <span>${orderDate.era}</span>
              <span>${orderDate.month}</span>
              <span>${orderDate.day}</span>
            </div>
          </div>
          <div class="bp-title-main">
            <span class="bp-title-text">チェーンストア統一伝票</span>
            <span class="bp-title-sub">（ターンアラウンド用 1型）</span>
          </div>
          <div class="bp-title-slip">
            <div>仕入伝票 <span class="bp-circle-1">①</span></div>
          </div>
          <div class="bp-settle">
            <div class="bp-settle-box ${data.settlementPrint ? "checked" : ""}">${data.settlementPrint ? "✓" : ""}</div>
            <div class="bp-label">決算出力</div>
          </div>
        </div>

        <!-- 社名エリア -->
        <div class="bp-vendor-row">
          <div class="bp-vendor-name">
            <div class="bp-label">社名</div>
            <div class="bp-val">${company.name}</div>
          </div>
          <div class="bp-code-cell">
            <div class="bp-label">柱店コード</div>
            <div class="bp-val mono">${data.chainStoreCode ?? ""}</div>
          </div>
          <div class="bp-code-cell">
            <div class="bp-label">分類コード伝票</div>
            <div class="bp-val mono">${data.categoryCode ?? ""}</div>
          </div>
          <div class="bp-code-cell">
            <div class="bp-label">伝票番号</div>
            <div class="bp-val mono">${data.documentNo}</div>
          </div>
          <div class="bp-code-cell">
            <div class="bp-label">取引コード</div>
            <div class="bp-val mono">${data.slipTypeCode ?? ""}</div>
          </div>
        </div>

        <!-- 取引先コード・日付エリア -->
        <div class="bp-vendor-row">
          <div class="bp-vendor-address">
            <div class="bp-val">${data.customerName} ${data.customerHonorific}</div>
            <div class="bp-val-sub">${data.customerAddress ?? ""}</div>
          </div>
          <div class="bp-code-cell">
            <div class="bp-label">発注日</div>
            <div class="bp-date-boxes">
              <span>${orderDate.era}</span><span>${orderDate.month}</span><span>${orderDate.day}</span>
            </div>
          </div>
          <div class="bp-code-cell">
            <div class="bp-label">納品日</div>
            <div class="bp-date-boxes">
              <span>${deliveryDate.era}</span><span>${deliveryDate.month}</span><span>${deliveryDate.day}</span>
            </div>
          </div>
          <div class="bp-code-cell">
            <div class="bp-label">受注No.</div>
            <div class="bp-val mono">${data.orderNo ?? ""}</div>
          </div>
          <div class="bp-code-cell">
            <div class="bp-label">取引先コード</div>
            <div class="bp-val mono">${data.vendorCode ?? company.registrationNo.slice(-7)}</div>
          </div>
        </div>

        <!-- 明細テーブル -->
        <table class="bp-table">
          <thead>
            <tr>
              <th class="bp-name">品名・規格</th>
              <th class="bp-pcode">商品コード</th>
              <th class="bp-color">色</th>
              <th class="bp-size">
                サイズ
                <div class="bp-subdiv">入数/ケース</div>
              </th>
              <th class="bp-unit">単位</th>
              <th class="bp-qty">数量</th>
              <th class="bp-rowno">行</th>
              <th class="bp-corr-qty">訂正後<br/>数量</th>
              <th class="bp-discount">引</th>
              <th class="bp-cost-price">原単価</th>
              <th class="bp-cost-amount">原価金額</th>
              <th class="bp-retail-price">売単価</th>
              <th class="bp-note">備考<br/>(受領金額)</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <!-- 下部: 合計行 -->
        <div class="bp-footer">
          <div class="bp-ocr-notice">
            （日計上欄OCR用につき<br/>他の目的で使用しないでください）
          </div>
          <div class="bp-totals">
            <div class="bp-total-row">
              <span class="bp-label">合計数量</span>
              <span class="bp-val numeric">${quantityTotal.toLocaleString("ja-JP")}</span>
            </div>
            <div class="bp-total-row">
              <span class="bp-label">受領金額合計</span>
              <span class="bp-val numeric">${receivedTotal.toLocaleString("ja-JP")}</span>
            </div>
            <div class="bp-total-row">
              <span class="bp-label">返品金額合計</span>
              <span class="bp-val numeric">${returnTotal.toLocaleString("ja-JP")}</span>
            </div>
            <div class="bp-total-row bp-grand-cost">
              <span class="bp-label">訂正後原価金額合計</span>
              <span class="bp-val numeric">${costTotal.toLocaleString("ja-JP")}</span>
            </div>
            <div class="bp-total-row bp-grand-retail">
              <span class="bp-label">訂正後売価金額合計</span>
              <span class="bp-val numeric">${retailTotal.toLocaleString("ja-JP")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
