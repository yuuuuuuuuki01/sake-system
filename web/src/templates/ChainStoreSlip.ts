import type {
  PrintCompanyInfo,
  PrintDocumentData,
  PrintOptions
} from "./printTypes";
import { calculateTotals, formatYen } from "./printTypes";

// チェーンストア統一伝票 (1101型 プリンター用)
// 規格: 日本チェーンストア協会制定
// 用紙: 9インチ × 5.5インチ (228.6mm × 139.7mm)
// 4連複写: 物品受領書 / 仕入伝票 / 納品書 / 請求書
//
// 必須項目:
//  - 伝票番号 / 発注番号 / 納品日 / 伝票区分
//  - 取引先コード・名 / 納品先コード・名 / 部門コード
//  - 商品コード / JAN / 品名 / 規格 / 入数 / ケース数 / バラ数 / 単価 / 金額
//  - 合計ケース数・合計バラ数・合計金額
//  - 検収印・受領印欄

type SlipCopyLabel = "物品受領書" | "仕入伝票" | "納品書" | "請求書";

const COPY_LABELS: SlipCopyLabel[] = ["物品受領書", "仕入伝票", "納品書", "請求書"];

// 日付を YYMMDD 形式で分割表示（統一伝票慣習）
function splitDate(iso: string): { year: string; month: string; day: string; wareki: string } {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const dd = d.getDate();
  // 令和 (2019=R01)
  const reiwa = y - 2018;
  return {
    year: String(y).slice(-2),
    month: String(m).padStart(2, "0"),
    day: String(dd).padStart(2, "0"),
    wareki: `令和${reiwa}年`
  };
}

// ケース数とバラ数に分割表示（入数で割って商と余り）
function splitQuantity(quantity: number, caseQty: number): { cases: number; pieces: number } {
  if (caseQty <= 0) return { cases: 0, pieces: Math.round(quantity) };
  const cases = Math.floor(quantity / caseQty);
  const pieces = Math.round(quantity - cases * caseQty);
  return { cases, pieces };
}

function renderSingleCopy(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  opts: PrintOptions,
  label: SlipCopyLabel
): string {
  const { subtotal, taxAmount, total } = calculateTotals(data.lines, data.taxRate);
  const date = splitDate(data.documentDate);

  // 明細行（最大10行の固定行、データない行は空欄）
  const FIXED_ROWS = 10;
  const rows = Array.from({ length: FIXED_ROWS }, (_, i) => {
    const line = data.lines[i];
    if (!line) {
      return `
      <tr class="csu-empty-row">
        <td></td><td></td><td></td><td></td>
        ${opts.showJanCode ? "<td></td>" : ""}
        <td></td><td></td><td></td><td></td><td></td>
      </tr>`;
    }
    // 入数はspecから推定、なければ1
    const caseQty = (line as PrintDocumentData["lines"][number] & { caseQty?: number }).caseQty ?? 1;
    const { cases, pieces } = splitQuantity(line.quantity, caseQty);
    return `
      <tr>
        <td class="csu-no">${i + 1}</td>
        <td class="csu-pcode mono">${line.productCode}</td>
        ${opts.showJanCode ? `<td class="csu-jan mono">${line.janCode ?? ""}</td>` : ""}
        <td class="csu-name">${line.productName}</td>
        <td class="csu-spec">${line.spec ?? ""}</td>
        <td class="csu-irisu numeric">${caseQty > 1 ? caseQty : ""}</td>
        <td class="csu-case numeric">${cases > 0 ? cases : ""}</td>
        <td class="csu-piece numeric">${pieces > 0 ? pieces : ""}</td>
        <td class="csu-price numeric">${line.unitPrice > 0 ? line.unitPrice.toLocaleString("ja-JP") : ""}</td>
        <td class="csu-amount numeric">${line.amount > 0 ? line.amount.toLocaleString("ja-JP") : ""}</td>
      </tr>`;
  }).join("");

  const totalCases = data.lines.reduce((s, l) => {
    const caseQty = (l as PrintDocumentData["lines"][number] & { caseQty?: number }).caseQty ?? 1;
    return s + splitQuantity(l.quantity, caseQty).cases;
  }, 0);
  const totalPieces = data.lines.reduce((s, l) => {
    const caseQty = (l as PrintDocumentData["lines"][number] & { caseQty?: number }).caseQty ?? 1;
    return s + splitQuantity(l.quantity, caseQty).pieces;
  }, 0);

  return `
    <div class="csu-slip" data-copy="${label}">
      <!-- 上部: 用途ラベル + 伝票番号 -->
      <div class="csu-topbar">
        <div class="csu-copy-label">${label}</div>
        <div class="csu-title">チェーンストア統一伝票 <span class="csu-type-no">(1101)</span></div>
        <div class="csu-docno">
          <span class="csu-label">伝票No.</span>
          <span class="mono">${data.documentNo}</span>
        </div>
      </div>

      <!-- ヘッダ: 各種コード -->
      <div class="csu-header-grid">
        <div class="csu-hcell">
          <span class="csu-label">納品日</span>
          <span class="csu-value">${date.wareki}${date.month}月${date.day}日</span>
        </div>
        <div class="csu-hcell">
          <span class="csu-label">伝票区分</span>
          <span class="csu-value">11 納品</span>
        </div>
        <div class="csu-hcell">
          <span class="csu-label">発注番号</span>
          <span class="csu-value mono">${(data as PrintDocumentData & { orderNo?: string }).orderNo ?? ""}</span>
        </div>
        <div class="csu-hcell csu-wide">
          <span class="csu-label">取引先コード</span>
          <span class="csu-value mono">${(data as PrintDocumentData & { vendorCode?: string }).vendorCode ?? company.registrationNo.slice(-7)}</span>
        </div>
        <div class="csu-hcell csu-wide">
          <span class="csu-label">納品先コード</span>
          <span class="csu-value mono">${data.customerCode ?? ""}</span>
        </div>
        <div class="csu-hcell">
          <span class="csu-label">部門コード</span>
          <span class="csu-value mono">${(data as PrintDocumentData & { departmentCode?: string }).departmentCode ?? ""}</span>
        </div>
      </div>

      <!-- 取引先名・納品先名 -->
      <div class="csu-parties">
        <div class="csu-party">
          <span class="csu-label">取引先名</span>
          <span class="csu-party-name">${company.name}</span>
        </div>
        <div class="csu-party">
          <span class="csu-label">納品先名</span>
          <span class="csu-party-name">${data.customerName}</span>
        </div>
      </div>

      <!-- 明細 -->
      <table class="csu-table">
        <colgroup>
          <col class="csu-no-col" />
          <col class="csu-pcode-col" />
          ${opts.showJanCode ? '<col class="csu-jan-col" />' : ""}
          <col class="csu-name-col" />
          <col class="csu-spec-col" />
          <col class="csu-irisu-col" />
          <col class="csu-case-col" />
          <col class="csu-piece-col" />
          <col class="csu-price-col" />
          <col class="csu-amount-col" />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>商品コード</th>
            ${opts.showJanCode ? "<th>JAN</th>" : ""}
            <th>品名</th>
            <th>規格</th>
            <th>入数</th>
            <th>ケース</th>
            <th>バラ</th>
            <th>単価</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <!-- 合計 -->
      <div class="csu-totals-grid">
        <div class="csu-tcell">
          <span class="csu-label">合計ケース</span>
          <span class="csu-value numeric">${totalCases}</span>
        </div>
        <div class="csu-tcell">
          <span class="csu-label">合計バラ</span>
          <span class="csu-value numeric">${totalPieces}</span>
        </div>
        <div class="csu-tcell">
          <span class="csu-label">小計</span>
          <span class="csu-value numeric">${formatYen(subtotal)}</span>
        </div>
        <div class="csu-tcell">
          <span class="csu-label">消費税(${Math.round(data.taxRate * 100)}%)</span>
          <span class="csu-value numeric">${formatYen(taxAmount)}</span>
        </div>
        <div class="csu-tcell csu-grand">
          <span class="csu-label">合計金額</span>
          <span class="csu-value numeric">${formatYen(total)}</span>
        </div>
      </div>

      <!-- 印欄 -->
      <div class="csu-seals">
        <div class="csu-seal-box"><span class="csu-label">物品受領印</span></div>
        <div class="csu-seal-box"><span class="csu-label">検収印</span></div>
        <div class="csu-seal-box"><span class="csu-label">出荷印</span></div>
        <div class="csu-seal-box csu-vendor-seal">
          <span class="csu-label">取引先印</span>
          ${opts.showSeal ? (company.sealImageUrl ? `<img src="${company.sealImageUrl}" alt="印" />` : '<div class="csu-seal-ph">印</div>') : ""}
        </div>
      </div>
    </div>
  `;
}

export function renderChainStoreSlip(
  data: PrintDocumentData,
  company: PrintCompanyInfo,
  opts: PrintOptions
): string {
  // 印刷時: 4連すべて / プレビュー時: 枚数ボタンで選択（デフォルト4連）
  const copies = opts.copies && opts.copies >= 1 ? Math.min(opts.copies, 4) : 4;
  const labels = COPY_LABELS.slice(0, copies);
  return `
    <div class="print-page chain-store ${opts.fontSize}">
      ${labels.map((label) => renderSingleCopy(data, company, opts, label)).join('<div class="csu-separator"></div>')}
    </div>
  `;
}
