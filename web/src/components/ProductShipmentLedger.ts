import type { ProductShipmentEntry } from "../api";

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

const TYPE_LABELS: Record<ProductShipmentEntry["transactionType"], string> = {
  shipout: "移出", shipin: "移入", return: "戻入", loss: "損失", sample: "試飲", adjust: "調整"
};
const TYPE_COLORS: Record<ProductShipmentEntry["transactionType"], string> = {
  shipout: "#d97706", shipin: "#059669", return: "#2563eb", loss: "#ef4444", sample: "#7c3aed", adjust: "#6b7280"
};

const CONTAINER_TYPES = ["瓶", "缶", "紙パック", "樽", "バッグインボックス", "その他"];

export function renderProductShipmentLedger(entries: ProductShipmentEntry[], filterType: string = ""): string {
  const filtered = filterType ? entries.filter(e => e.transactionType === filterType) : entries;

  const txTypeOptions = Object.entries(TYPE_LABELS).map(([k, v]) =>
    `<option value="${k}">${v}</option>`
  ).join("");

  const filterOptions = Object.entries(TYPE_LABELS).map(([k, v]) =>
    `<option value="${k}" ${k === filterType ? "selected" : ""}>${v}</option>`
  ).join("");

  const containerOptions = CONTAINER_TYPES.map(t =>
    `<option value="${t}">${t}</option>`
  ).join("");

  // 移出入集計
  let totalShipoutL = 0, totalShipinL = 0, totalReturnL = 0, totalTax = 0;
  for (const e of entries) {
    if (e.transactionType === "shipout") totalShipoutL += e.volumeL;
    else if (e.transactionType === "shipin") totalShipinL += e.volumeL;
    else if (e.transactionType === "return") totalReturnL += e.volumeL;
    totalTax += e.taxAmount;
  }

  const rows = filtered.map(e => {
    const color = TYPE_COLORS[e.transactionType] ?? "#6b7280";
    return `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:4px 6px;font-size:11px;white-space:nowrap;">${e.ledgerDate}</td>
      <td style="padding:4px 6px;"><span style="font-size:10px;padding:2px 6px;border-radius:3px;background:${color}15;color:${color};font-weight:600;">${TYPE_LABELS[e.transactionType]}</span></td>
      <td style="padding:4px 6px;font-size:11px;font-weight:600;">${e.productName}</td>
      <td style="padding:4px 6px;font-size:11px;">${e.productCode || ""}</td>
      <td style="padding:4px 6px;font-size:11px;">${e.containerType} ${e.containerVolumeMl}ml</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${fmtNum(e.quantityBottles)} 本</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;font-weight:600;">${fmtNum(e.volumeL)} L</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${e.alcoholDegree != null ? e.alcoholDegree + "%" : ""}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${e.taxRate ? e.taxRate + " 円/L" : ""}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${e.taxAmount ? fmtNum(e.taxAmount) + " 円" : ""}</td>
      <td style="padding:4px 6px;font-size:11px;">${e.destination || ""}</td>
      <td style="padding:4px 6px;font-size:11px;">${e.batchCode || ""}</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.notes || ""}</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280;">${e.recordedBy || ""}</td>
      <td style="padding:4px 4px;"><button data-action="psl-delete" data-id="${e.id}" style="font-size:9px;padding:2px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
    </tr>`;
  }).join("");

  return `
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>製品受払簿（移出入簿）</h1></div>
      <div style="display:flex;gap:8px;">
        <button class="button secondary" data-action="psl-print">印刷</button>
      </div>
    </section>

    <section class="panel" style="margin-bottom:12px;">
      <div class="panel-header"><h2>移出入集計</h2></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:4px 0;">
        <div style="padding:8px 12px;background:var(--surface);border:1px solid var(--border);border-radius:6px;min-width:100px;">
          <div style="font-size:10px;color:#d97706;">移出合計</div>
          <div style="font-size:16px;font-weight:700;">${fmtNum(totalShipoutL)} <span style="font-size:11px;font-weight:400;">L</span></div>
        </div>
        <div style="padding:8px 12px;background:var(--surface);border:1px solid var(--border);border-radius:6px;min-width:100px;">
          <div style="font-size:10px;color:#059669;">移入合計</div>
          <div style="font-size:16px;font-weight:700;">${fmtNum(totalShipinL)} <span style="font-size:11px;font-weight:400;">L</span></div>
        </div>
        <div style="padding:8px 12px;background:var(--surface);border:1px solid var(--border);border-radius:6px;min-width:100px;">
          <div style="font-size:10px;color:#2563eb;">戻入合計</div>
          <div style="font-size:16px;font-weight:700;">${fmtNum(totalReturnL)} <span style="font-size:11px;font-weight:400;">L</span></div>
        </div>
        <div style="padding:8px 12px;background:var(--surface);border:1px solid var(--border);border-radius:6px;min-width:100px;">
          <div style="font-size:10px;color:#6b7280;">酒税合計</div>
          <div style="font-size:16px;font-weight:700;">${fmtNum(totalTax)} <span style="font-size:11px;font-weight:400;">円</span></div>
        </div>
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>受払記録</h2><p class="panel-caption">製品の移出入をすべて記録（数量Lと税額は自動計算）</p></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;padding:8px 0;font-size:11px;border-bottom:1px solid var(--border);margin-bottom:12px;">
        <label>日付<br><input id="psl-date" type="date" value="${new Date().toISOString().slice(0, 10)}" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>取引種別<br><select id="psl-tx-type" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;">${txTypeOptions}</select></label>
        <label>商品名<br><input id="psl-product-name" type="text" placeholder="商品名" style="width:100px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>商品コード<br><input id="psl-product-code" type="text" placeholder="" style="width:70px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>容器種別<br><select id="psl-container-type" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;">${containerOptions}</select></label>
        <label>容量(ml)<br><input id="psl-container-vol" type="number" step="1" value="720" style="width:60px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>数量(本)<br><input id="psl-qty" type="number" step="1" placeholder="0" style="width:60px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>度数<br><input id="psl-alc" type="number" step="0.1" placeholder="%" style="width:50px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>税率(円/L)<br><input id="psl-tax-rate" type="number" step="0.01" placeholder="0" style="width:60px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>出荷先<br><input id="psl-destination" type="text" placeholder="" style="width:80px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>仕込番号<br><input id="psl-batch" type="text" placeholder="" style="width:70px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>メモ<br><input id="psl-notes" type="text" placeholder="" style="width:80px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <button class="button primary" data-action="psl-add" style="font-size:11px;padding:5px 14px;">記録</button>
      </div>

      <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
        <label style="font-size:11px;">取引種別絞込:
          <select data-action="psl-filter" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;">
            <option value="">全て</option>
            ${filterOptions}
          </select>
        </label>
        ${filterType ? `<span style="font-size:11px;color:#2563eb;font-weight:600;">${TYPE_LABELS[filterType as ProductShipmentEntry["transactionType"]] ?? filterType} の記録（${filtered.length}件）</span>` : `<span style="font-size:11px;color:#6b7280;">全${filtered.length}件</span>`}
      </div>

      <div id="psl-table" class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:10px;color:#6b7280;text-align:left;">
            <th style="padding:4px 6px;">日付</th>
            <th style="padding:4px 6px;">種別</th>
            <th style="padding:4px 6px;">商品名</th>
            <th style="padding:4px 6px;">コード</th>
            <th style="padding:4px 6px;">容器</th>
            <th style="padding:4px 6px;text-align:right;">数量</th>
            <th style="padding:4px 6px;text-align:right;">数量(L)</th>
            <th style="padding:4px 6px;text-align:right;">度数</th>
            <th style="padding:4px 6px;text-align:right;">税率</th>
            <th style="padding:4px 6px;text-align:right;">税額</th>
            <th style="padding:4px 6px;">出荷先</th>
            <th style="padding:4px 6px;">仕込</th>
            <th style="padding:4px 6px;">メモ</th>
            <th style="padding:4px 6px;">記録者</th>
            <th></th>
          </tr></thead>
          <tbody>${rows || `<tr><td colspan="15" style="padding:20px;text-align:center;color:#9ca3af;">受払記録がありません</td></tr>`}</tbody>
        </table>
      </div>
    </section>`;
}
