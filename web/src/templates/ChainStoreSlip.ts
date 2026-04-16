import type {
  PrintCompanyInfo,
  PrintDocumentData,
  PrintOptions
} from "./printTypes";

// チェーンストア統一伝票 BP1701 (ターンアラウンド用 1型)
// オーバーレイ印刷方式:
//   事前印刷済みの BP1701 伝票用紙を印刷機にセット
//   データ部分のみを所定座標に印字する
//
// プレビュー: 参考画像(BP1701.png)を背景に表示し、データをオーバーレイ
// 印刷: @page 228.6×101.6mm、背景画像は @media print で非表示
//       データだけが所定座標に出力される

// 座標単位: mm (用紙左上原点)
// 用紙サイズ: 228.6mm × 101.6mm (9" × 4")

interface FieldPos {
  x: number; // mm
  y: number; // mm
  w?: number; // mm
  align?: "left" | "right" | "center";
  size?: number; // pt
  bold?: boolean;
}

// BP1701 実物から計測した座標 (ミリメートル)
// 必要に応じて設定画面から微調整可能（calibrationOffsetX/Y）
const POS = {
  // 上段: 当日日付 (3つの日付ボックス)
  currentDateY: { x: 14, y: 4, size: 9 },
  currentDateM: { x: 21, y: 4, size: 9 },
  currentDateD: { x: 28, y: 4, size: 9 },

  // タイトル右の仕入伝票番号
  documentNo: { x: 195, y: 4, size: 10, bold: true },

  // 決算出力チェック
  settlementCheck: { x: 216, y: 5, size: 9 },

  // 社名行
  vendorName: { x: 6, y: 17, size: 10, bold: true },
  vendorAddress: { x: 6, y: 22, size: 7 },
  chainStoreCode: { x: 64, y: 18, size: 9 },
  categoryCode: { x: 89, y: 18, size: 9 },
  slipNumber: { x: 127, y: 18, size: 9 },
  vendorCode: { x: 163, y: 18, size: 9 },

  // 取引先名行
  customerName: { x: 6, y: 28, size: 10, bold: true },
  orderDateY: { x: 82, y: 29, size: 8 },
  orderDateM: { x: 87, y: 29, size: 8 },
  orderDateD: { x: 92, y: 29, size: 8 },
  deliveryDateY: { x: 106, y: 29, size: 8 },
  deliveryDateM: { x: 111, y: 29, size: 8 },
  deliveryDateD: { x: 116, y: 29, size: 8 },
  orderNo: { x: 143, y: 29, size: 9 },
  partnerCode: { x: 176, y: 29, size: 9 },

  // 明細行の開始位置と行間
  detailStartY: 42, // mm
  detailRowH: 6.5, // mm
  detailCols: {
    productName: { x: 4, w: 40, align: "left" as const, size: 7.5 },
    productCode: { x: 45, w: 18, align: "left" as const, size: 7.5 },
    color: { x: 64, w: 8, align: "center" as const, size: 7.5 },
    size: { x: 73, w: 14, align: "center" as const, size: 7.5 },
    unit: { x: 88, w: 7, align: "center" as const, size: 7.5 },
    quantity: { x: 96, w: 13, align: "right" as const, size: 8 },
    correctedQty: { x: 115, w: 13, align: "right" as const, size: 8 },
    discount: { x: 129, w: 9, align: "right" as const, size: 8 },
    unitPrice: { x: 139, w: 14, align: "right" as const, size: 8 },
    costAmount: { x: 154, w: 16, align: "right" as const, size: 8, bold: true },
    retailPrice: { x: 171, w: 13, align: "right" as const, size: 8 },
    note: { x: 185, w: 20, align: "right" as const, size: 8 }
  } as Record<string, FieldPos>,

  // 合計エリア
  totalQty: { x: 105, y: 92, size: 9, bold: true },
  receivedTotal: { x: 128, y: 92, size: 9 },
  returnTotal: { x: 152, y: 92, size: 9 },
  correctedCostTotal: { x: 176, y: 92, size: 10, bold: true },
  correctedRetailTotal: { x: 205, y: 92, size: 10, bold: true }
};

function pos(p: FieldPos, value: string): string {
  const align = p.align ?? "left";
  const size = p.size ?? 8;
  const style = [
    `position:absolute`,
    `left:${p.x}mm`,
    `top:${p.y}mm`,
    p.w ? `width:${p.w}mm` : "",
    `text-align:${align}`,
    `font-size:${size}pt`,
    p.bold ? "font-weight:700" : "",
    "line-height:1",
    "white-space:nowrap",
    "overflow:hidden"
  ]
    .filter(Boolean)
    .join(";");
  return `<div class="bp-fld" style="${style}">${value}</div>`;
}

function splitDate(iso: string): { y: string; m: string; d: string } {
  if (!iso) return { y: "", m: "", d: "" };
  const d = new Date(iso);
  const y = d.getFullYear();
  const reiwa = y - 2018;
  return {
    y: reiwa > 0 ? String(reiwa).padStart(2, "0") : String(y).slice(-2),
    m: String(d.getMonth() + 1).padStart(2, "0"),
    d: String(d.getDate()).padStart(2, "0")
  };
}

export function renderChainStoreSlip(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  opts: PrintOptions
): string {
  const curDate = splitDate(data.documentDate);
  const orderDate = splitDate(data.orderDate ?? data.documentDate);
  const deliveryDate = splitDate(data.deliveryDate ?? data.documentDate);

  // 明細を所定位置に配置
  const detailHtml = data.lines
    .slice(0, 6) // 最大6行
    .map((line, i) => {
      const rowY = POS.detailStartY + i * POS.detailRowH;
      const c = POS.detailCols;
      const cells: string[] = [];

      const put = (col: FieldPos, v: string) => {
        if (!v) return;
        cells.push(
          pos({ ...col, y: rowY, x: col.x + 0 } as FieldPos, v)
        );
      };

      put(c.productName, line.productName + (line.spec ? ` ${line.spec}` : ""));
      put(c.productCode, line.productCode);
      put(c.color, line.color ?? "");
      put(
        c.size,
        [line.size, line.caseQty ? `×${line.caseQty}` : ""].filter(Boolean).join(" ")
      );
      put(c.unit, line.unit);
      put(c.quantity, line.quantity > 0 ? line.quantity.toLocaleString("ja-JP") : "");
      put(
        c.correctedQty,
        line.correctedQuantity ? line.correctedQuantity.toLocaleString("ja-JP") : ""
      );
      put(c.discount, line.discount ? line.discount.toLocaleString("ja-JP") : "");
      put(c.unitPrice, line.unitPrice > 0 ? line.unitPrice.toLocaleString("ja-JP") : "");
      put(c.costAmount, line.amount > 0 ? line.amount.toLocaleString("ja-JP") : "");
      put(c.retailPrice, line.retailPrice ? line.retailPrice.toLocaleString("ja-JP") : "");
      put(
        c.note,
        line.receivedAmount ? line.receivedAmount.toLocaleString("ja-JP") : ""
      );

      return cells.join("");
    })
    .join("");

  // 合計
  const costTotal = data.lines.reduce((s, l) => s + (l.amount || 0), 0);
  const retailTotal = data.lines.reduce(
    (s, l) => s + (l.retailPrice || 0) * (l.correctedQuantity ?? l.quantity),
    0
  );
  const receivedTotal = data.lines.reduce((s, l) => s + (l.receivedAmount || 0), 0);
  const returnTotal = data.lines.reduce((s, l) => s + (l.returnAmount || 0), 0);
  const quantityTotal = data.lines.reduce((s, l) => s + l.quantity, 0);

  // 参考画像オーバーレイ (プレビュー専用、印刷時は非表示)
  const overlayStyle = opts.showReferenceOverlay
    ? `background-image: url('${opts.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`
    : "";

  const calX = opts.calibrationOffsetX || 0;
  const calY = opts.calibrationOffsetY || 0;
  const calibStyle = `transform: translate(${calX}mm, ${calY}mm);`;

  return `
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${overlayStyle}">
        ${opts.showReferenceOverlay ? `<div class="bp-sheet-overlay-mask" style="opacity:${1 - opts.overlayOpacity};"></div>` : ""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${calibStyle}">
        ${pos(POS.currentDateY, curDate.y)}
        ${pos(POS.currentDateM, curDate.m)}
        ${pos(POS.currentDateD, curDate.d)}
        ${pos(POS.documentNo, data.documentNo)}
        ${data.settlementPrint ? pos(POS.settlementCheck, "✓") : ""}

        ${pos(POS.vendorName, company.name)}
        ${pos(POS.vendorAddress, company.address1)}
        ${pos(POS.chainStoreCode, data.chainStoreCode ?? "")}
        ${pos(POS.categoryCode, data.categoryCode ?? "")}
        ${pos(POS.slipNumber, data.documentNo)}
        ${pos(POS.vendorCode, data.slipTypeCode ?? "")}

        ${pos(POS.customerName, `${data.customerName} ${data.customerHonorific}`)}
        ${pos(POS.orderDateY, orderDate.y)}
        ${pos(POS.orderDateM, orderDate.m)}
        ${pos(POS.orderDateD, orderDate.d)}
        ${pos(POS.deliveryDateY, deliveryDate.y)}
        ${pos(POS.deliveryDateM, deliveryDate.m)}
        ${pos(POS.deliveryDateD, deliveryDate.d)}
        ${pos(POS.orderNo, data.orderNo ?? "")}
        ${pos(POS.partnerCode, data.vendorCode ?? "")}

        ${detailHtml}

        ${pos(POS.totalQty, quantityTotal.toLocaleString("ja-JP"))}
        ${pos(POS.receivedTotal, receivedTotal.toLocaleString("ja-JP"))}
        ${pos(POS.returnTotal, returnTotal.toLocaleString("ja-JP"))}
        ${pos(POS.correctedCostTotal, costTotal.toLocaleString("ja-JP"))}
        ${pos(POS.correctedRetailTotal, retailTotal.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `;
}
