import type { TsumekuchiRecord, Genzaishu, TankRecord } from "../api";

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

export function renderTsumekuchi(records: TsumekuchiRecord[], genzaishu: Genzaishu[] = [], tanks: TankRecord[] = []): string {
  const tankOpts = tanks.map(t => `<option value="${t.tankNo}">${t.tankNo}${t.displayName ? ` (${t.displayName})` : ""}</option>`).join("");
  const gzOpts = genzaishu.map(g => `<option value="${g.batchCode}" data-name="${g.productName}" data-tank="${g.tankNo}">${g.productName}（${g.batchCode}）</option>`).join("");
  const today = new Date().toISOString().slice(0, 10);

  const rows = records.map(r => {
    const totalIn = r.genshuVolumeBeforeL + r.zanshuReceiveL;
    return `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:4px 6px;font-size:11px;">${r.tsumekuchiDate}</td>
      <td style="padding:4px 6px;font-size:11px;font-weight:600;">${r.sourceTankNo}</td>
      <td style="padding:4px 6px;font-size:11px;">${r.genshuName}(${r.genshuBatchCode})</td>
      <td style="padding:4px 6px;font-size:11px;">${r.targetProductName}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${fmtNum(r.genshuVolumeBeforeL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${r.zanshuReceiveL > 0 ? fmtNum(r.zanshuReceiveL) : "―"}</td>
      <td style="padding:4px 6px;font-size:11px;">${r.linkedTankNo || "―"}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${fmtNum(r.volumeBeforeTsumekuchiL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;font-weight:600;">${fmtNum(r.tsumekuchiSuccessQty)}本</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${fmtNum(r.tsumekuchiSuccessL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${r.depthAfterMm > 0 ? r.depthAfterMm : "―"}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${fmtNum(r.volumeAfterL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${fmtNum(r.tsumekuchiRemainingL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${r.breakageL > 0 ? r.breakageL : "―"}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${r.lossL > 0 ? r.lossL : "―"}</td>
      <td style="padding:4px 4px;"><button data-action="tsume-delete" data-id="${r.id}" style="font-size:9px;padding:1px 5px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
    </tr>`;
  }).join("");

  return `
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>詰口帳票</h1></div>
      <button class="button secondary" data-action="tsume-print">印刷</button>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>詰口記録</h2><p class="panel-caption">詰口作業の記録</p></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;padding:8px 0;font-size:11px;border-bottom:1px solid var(--border);margin-bottom:10px;">
        <label>詰口日<br><input id="tsume-date" type="date" value="${today}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>容器(元)<br><select id="tsume-tank" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"><option value="">選択</option>${tankOpts}</select></label>
        <label>原酒<br><select id="tsume-genshu" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"><option value="">選択</option>${gzOpts}</select></label>
        <label>行先商品<br><input id="tsume-product" type="text" placeholder="商品名" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>原酒L(前)<br><input id="tsume-before" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>残酒受入L<br><input id="tsume-zanshu" type="number" step="0.1" value="0" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>連結容器<br><input id="tsume-linked" type="text" placeholder="" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>詰口前数量L<br><input id="tsume-vol-before" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>成功本数<br><input id="tsume-qty" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>容量ml/本<br><input id="tsume-ml" type="number" step="1" value="720" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>払出後深mm<br><input id="tsume-depth" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>払出後数量L<br><input id="tsume-vol-after" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>破損L<br><input id="tsume-break" type="number" step="0.1" value="0" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>欠減L<br><input id="tsume-loss" type="number" step="0.1" value="0" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
      </div>
      <button class="button primary" data-action="tsume-save" style="font-size:11px;padding:5px 14px;">記録</button>
    </section>

    <section class="panel" id="tsume-table">
      <div class="panel-header"><h2>詰口帳票一覧</h2><p class="panel-caption">${records.length}件</p></div>
      <div class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:1100px;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:9px;color:#6b7280;text-align:left;">
            <th style="padding:3px 6px;">日付</th><th style="padding:3px 6px;">容器</th><th style="padding:3px 6px;">原酒</th>
            <th style="padding:3px 6px;">行先商品</th><th style="padding:3px 6px;text-align:right;">原酒L(前)</th>
            <th style="padding:3px 6px;text-align:right;">残酒受入</th><th style="padding:3px 6px;">連結</th>
            <th style="padding:3px 6px;text-align:right;">詰口前L</th><th style="padding:3px 6px;text-align:right;">成功数</th>
            <th style="padding:3px 6px;text-align:right;">成功L</th><th style="padding:3px 6px;text-align:right;">払出後深</th>
            <th style="padding:3px 6px;text-align:right;">払出後L</th><th style="padding:3px 6px;text-align:right;">詰口残</th>
            <th style="padding:3px 6px;text-align:right;">破損</th><th style="padding:3px 6px;text-align:right;">欠減</th>
            <th></th>
          </tr></thead>
          <tbody>${rows || `<tr><td colspan="16" style="padding:20px;text-align:center;color:#9ca3af;">詰口記録がありません</td></tr>`}</tbody>
        </table>
      </div>
    </section>`;
}
