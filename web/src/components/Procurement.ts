import type { BrewingRiceParams, BrewingCustomCategory } from "../api";

const CATEGORY_COLORS: Record<string, string> = {
  "純米大吟醸": "#7c3aed", "大吟醸": "#a855f7", "純米吟醸": "#2563eb",
  "純米": "#059669", "本醸造": "#d97706", "普通酒": "#6b7280",
  "リキュール": "#e11d48", "その他": "#9ca3af"
};
const CATEGORY_ORDER = ["純米大吟醸", "大吟醸", "純米吟醸", "純米", "本醸造", "普通酒", "リキュール", "その他"];

function fmtNum(n: number): string { return n.toLocaleString("ja-JP"); }

export function renderProcurement(
  needByCategory: Record<string, number>,
  riceParams: Record<string, BrewingRiceParams>,
  customCategories: BrewingCustomCategory[]
): string {
  const cats = Object.keys(needByCategory).filter(c => needByCategory[c] > 0);
  if (cats.length === 0) {
    return `<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>`;
  }

  const order = [...CATEGORY_ORDER, ...customCategories.map(c => c.name)];
  cats.sort((a, b) => (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b)));

  const defaultP: BrewingRiceParams = {
    brewCategory: "", polishingRatio: 0.70, ricePerLiterKg: 0.50,
    kojiRatio: 0.30, kojiVariety: "山田錦", kojiPricePerKg: 600,
    kakeVariety: "一般米", kakePricePerKg: 350
  };

  const inp = (field: string, cat: string, val: number | string, w: string, step: string, isText = false) =>
    isText
      ? `<input type="text" value="${val}" data-action="brew-rice-edit" data-cat="${cat}" data-field="${field}"
          style="width:${w};height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />`
      : `<input type="number" step="${step}" value="${val}" data-action="brew-rice-edit" data-cat="${cat}" data-field="${field}"
          style="width:${w};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`;

  let tKojiWhite = 0, tKakWhite = 0, tKojiBrown = 0, tKakBrown = 0, tKojiCost = 0, tKakCost = 0;

  const sections = cats.map(cat => {
    const needL = needByCategory[cat];
    const p = riceParams[cat] ?? defaultP;
    const color = CATEGORY_COLORS[cat] ?? "#6366f1";

    const whiteKg = Math.round(needL * p.ricePerLiterKg);
    const kojiWhiteKg = Math.round(whiteKg * p.kojiRatio);
    const kakeWhiteKg = whiteKg - kojiWhiteKg;
    const kojiBrownKg = Math.round(kojiWhiteKg / p.polishingRatio);
    const kakeBrownKg = Math.round(kakeWhiteKg / p.polishingRatio);
    const kojiCost = Math.round(kojiBrownKg * p.kojiPricePerKg);
    const kakeCost = Math.round(kakeBrownKg * p.kakePricePerKg);
    const totalCatCost = kojiCost + kakeCost;

    tKojiWhite += kojiWhiteKg; tKakWhite += kakeWhiteKg;
    tKojiBrown += kojiBrownKg; tKakBrown += kakeBrownKg;
    tKojiCost += kojiCost; tKakCost += kakeCost;

    return `
      <div class="card" style="border-top:3px solid ${color};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <h4 style="margin:0;font-size:14px;color:${color};">${cat}</h4>
          <span style="font-size:12px;">必要醸造 <strong>${fmtNum(Math.round(needL))}L</strong> → 予算 <strong>¥${fmtNum(totalCatCost)}</strong></span>
        </div>

        <div style="display:flex;gap:12px;margin-bottom:10px;flex-wrap:wrap;font-size:12px;">
          <label style="display:flex;align-items:center;gap:4px;">白米/L ${inp("ricePerLiterKg", cat, p.ricePerLiterKg, "56px", "0.01")}</label>
          <label style="display:flex;align-items:center;gap:4px;">麹比率 ${inp("kojiRatio", cat, p.kojiRatio, "56px", "0.01")}</label>
          <label style="display:flex;align-items:center;gap:4px;">精米歩合 ${inp("polishingRatio", cat, p.polishingRatio, "56px", "0.01")}</label>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:6px;">麹米</div>
            <div style="display:flex;gap:8px;margin-bottom:6px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${inp("kojiVariety", cat, p.kojiVariety, "80px", "", true)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${inp("kojiPricePerKg", cat, p.kojiPricePerKg, "56px", "10")}</label>
            </div>
            <div style="font-size:12px;">
              白米 <strong>${fmtNum(kojiWhiteKg)}kg</strong>
              → 玄米 <strong>${fmtNum(kojiBrownKg)}kg</strong>
              <span style="color:var(--text-secondary);">(${(kojiBrownKg / 60).toFixed(1)}俵)</span>
            </div>
            <div style="font-size:14px;font-weight:700;margin-top:4px;">¥${fmtNum(kojiCost)}</div>
          </div>

          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:6px;">掛米</div>
            <div style="display:flex;gap:8px;margin-bottom:6px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${inp("kakeVariety", cat, p.kakeVariety, "80px", "", true)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${inp("kakePricePerKg", cat, p.kakePricePerKg, "56px", "10")}</label>
            </div>
            <div style="font-size:12px;">
              白米 <strong>${fmtNum(kakeWhiteKg)}kg</strong>
              → 玄米 <strong>${fmtNum(kakeBrownKg)}kg</strong>
              <span style="color:var(--text-secondary);">(${(kakeBrownKg / 60).toFixed(1)}俵)</span>
            </div>
            <div style="font-size:14px;font-weight:700;margin-top:4px;">¥${fmtNum(kakeCost)}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const totalBrown = tKojiBrown + tKakBrown;
  const totalCost = tKojiCost + tKakCost;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">製造管理</p>
        <h1>原料米 調達計画</h1>
      </div>
    </section>

    <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:10px;background:var(--surface-alt);border-radius:8px;">
      <span style="font-size:12px;font-weight:600;">一括設定:</span>
      <label style="font-size:12px;display:flex;align-items:center;gap:4px;">
        白米/L <input id="rice-bulk-per-l" type="number" min="0.1" max="2" step="0.01" value="0.50"
          style="width:56px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />
      </label>
      <label style="font-size:12px;display:flex;align-items:center;gap:4px;">
        麹比率 <input id="rice-bulk-koji" type="number" min="0.05" max="0.5" step="0.01" value="0.30"
          style="width:56px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />
      </label>
      <button data-action="brew-rice-bulk-apply" class="button primary"
        style="font-size:12px;padding:4px 12px;">全区分に適用</button>
    </div>

    ${sections}

    <section class="panel">
      <div class="panel-header"><h2>集計</h2></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
        <div style="background:rgba(99,102,241,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#6366f1;font-weight:600;">麹米 合計</div>
          <div style="font-size:12px;margin-top:6px;">白米 ${fmtNum(tKojiWhite)}kg → 玄米 <strong>${fmtNum(tKojiBrown)}kg</strong> <span style="color:var(--text-secondary);">(${(tKojiBrown / 60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${fmtNum(tKojiCost)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">白米 ${fmtNum(tKakWhite)}kg → 玄米 <strong>${fmtNum(tKakBrown)}kg</strong> <span style="color:var(--text-secondary);">(${(tKakBrown / 60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${fmtNum(tKakCost)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${fmtNum(totalBrown)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(totalBrown / 60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${fmtNum(totalCost)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(totalCost / 10000).toFixed(0)}万)</span></div>
        </div>
      </div>
    </section>
  `;
}
