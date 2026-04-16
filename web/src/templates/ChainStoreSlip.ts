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

// BP1701 実物画像(4150×1892px)から計測した座標 (mm単位)
// 用紙: 228.6mm × 101.6mm (9×4 inch)
// 1mm ≈ 18.16px(横) / 18.62px(縦)
// 微調整は opts.calibrationOffsetX/Y で可能
const POS = {
  // 上段: 当日日付 (3つの小さい日付ボックス, 左上)
  currentDateY: { x: 10, y: 3.5, size: 8 },
  currentDateM: { x: 17, y: 3.5, size: 8 },
  currentDateD: { x: 24, y: 3.5, size: 8 },

  // 仕入伝票番号 (タイトル右の丸①の周辺)
  documentNo: { x: 155, y: 4, size: 9, bold: true },

  // 決算出力チェック (最右)
  settlementCheck: { x: 217, y: 4, size: 9 },

  // 社名行 (第2行 y=9-15mm)
  vendorName: { x: 4, y: 12, size: 10, bold: true },
  vendorAddress: { x: 4, y: 16.5, size: 6.5 },
  chainStoreCode: { x: 63, y: 13, size: 9 },
  categoryCode: { x: 87, y: 13, size: 9 },
  slipNumber: { x: 117, y: 13, size: 9 },
  vendorCode: { x: 151, y: 13, size: 9 },
  orderDateY: { x: 180, y: 13, size: 7.5 },
  orderDateM: { x: 186, y: 13, size: 7.5 },
  orderDateD: { x: 192, y: 13, size: 7.5 },
  deliveryDateY: { x: 204, y: 13, size: 7.5 },
  deliveryDateM: { x: 211, y: 13, size: 7.5 },
  deliveryDateD: { x: 218, y: 13, size: 7.5 },

  // 第3行: 取引先名/取引先コード (y=18-22mm)
  customerName: { x: 4, y: 20, size: 10, bold: true },
  partnerCode: { x: 94, y: 20, size: 10, bold: true },
  orderNo: { x: 143, y: 20, size: 9 },

  // 明細行 (y=32mm開始, 1行=8.5mm, 6行で=83mm終了)
  detailStartY: 33,
  detailRowH: 8.5,
  detailCols: {
    productName: { x: 5, w: 58, align: "left" as const, size: 7.5 },
    productCode: { x: 64, w: 25, align: "left" as const, size: 7.5 },
    color: { x: 92, w: 6, align: "center" as const, size: 7 },
    size: { x: 99, w: 15, align: "center" as const, size: 7 },
    unit: { x: 115, w: 8, align: "center" as const, size: 7 },
    quantity: { x: 124, w: 10, align: "right" as const, size: 8 },
    correctedQty: { x: 137, w: 14, align: "right" as const, size: 8 },
    discount: { x: 153, w: 9, align: "right" as const, size: 7.5 },
    unitPrice: { x: 163, w: 12, align: "right" as const, size: 8 },
    costAmount: { x: 176, w: 16, align: "right" as const, size: 8, bold: true },
    retailPrice: { x: 193, w: 12, align: "right" as const, size: 8 },
    note: { x: 206, w: 18, align: "right" as const, size: 8 }
  } as Record<string, FieldPos>,

  // 合計エリア (y=87-93mm)
  totalQty: { x: 125, y: 89, size: 9, bold: true },
  receivedTotal: { x: 150, y: 89, size: 9 },
  returnTotal: { x: 165, y: 89, size: 9 },
  correctedCostTotal: { x: 179, y: 89, size: 10, bold: true },
  correctedRetailTotal: { x: 207, y: 89, size: 10, bold: true }
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
