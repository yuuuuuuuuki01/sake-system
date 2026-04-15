import type { TaxDeclaration, TaxDeductionRow } from "../api";
import { TAX_DEDUCTION_LABELS, TAX_RATE_CATEGORIES } from "../api";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function renderTaxDeclaration(
  decl: TaxDeclaration,
  targetYear: number,
  targetMonth: number
): string {
  const categoryRows = decl.rows
    .map(
      (r, i) => `
      <tr>
        <td class="mono">${r.taxCategory}</td>
        <td>${r.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${i}" data-tax-field="alcoholDegree" value="${r.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${i}" data-tax-field="productionVolume" value="${r.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${i}" data-tax-field="previousBalance" value="${r.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${i}" data-tax-field="exportDeduction" value="${r.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${i}" data-tax-field="sampleDeduction" value="${r.sampleDeduction}" />
        </td>
        <td class="numeric">${r.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${r.taxRate}</td>
        <td class="numeric"><strong>${formatCurrency(r.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${i}" title="削除">✕</button>
        </td>
      </tr>
    `
    )
    .join("");

  const deductionRows = decl.deductions
    .map(
      (d, i) => `
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${i}" data-ded-field="type">
            ${(Object.keys(TAX_DEDUCTION_LABELS) as Array<TaxDeductionRow["type"]>)
              .map((t) => `<option value="${t}" ${t === d.type ? "selected" : ""}>${TAX_DEDUCTION_LABELS[t]}</option>`)
              .join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${i}" data-ded-field="categoryCode">
            ${TAX_RATE_CATEGORIES.map((c) => `<option value="${c.code}" ${c.code === d.categoryCode ? "selected" : ""}>${c.code}:${c.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${i}" data-ded-field="volume" value="${d.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${i}" data-ded-field="reason" value="${d.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${i}" data-ded-field="documentNo" value="${d.documentNo ?? ""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${i}" title="削除">✕</button>
        </td>
      </tr>
    `
    )
    .join("");

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const totalDeduction = decl.rows.reduce((s, r) => s + r.exportDeduction + r.sampleDeduction, 0);
  const totalProduction = decl.rows.reduce((s, r) => s + r.productionVolume, 0);
  const deductionRate = totalProduction > 0 ? (totalDeduction / totalProduction) * 100 : 0;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">税務管理</p>
        <h1>酒税申告書 (eTax連携対応)</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${decl.status === "submitted" ? "success" : decl.status === "accepted" ? "success" : "warning"}">
          ${decl.status === "submitted" ? "申告済" : decl.status === "accepted" ? "受理済" : "下書き"}
        </span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年</span>
          <select id="tax-year">
            ${[2025, 2026, 2027].map((y) => `<option value="${y}" ${targetYear === y ? "selected" : ""}>${y}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${months.map((m) => `<option value="${m}" ${targetMonth === m ? "selected" : ""}>${m}月</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="tax-load">読込</button>
        </div>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">酒税総額</p>
        <p class="kpi-value">${formatCurrency(decl.totalTax)}</p>
        <p class="kpi-sub">${decl.targetYear}年${decl.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${decl.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${decl.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${totalDeduction.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${decl.deductions.length} 件</p>
      </article>
      <article class="panel kpi-card ${deductionRate > 3 ? "kpi-alert" : ""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${deductionRate.toFixed(1)}%</p>
        <p class="kpi-sub">${deductionRate > 3 ? "⚠ 見本/試験3%上限注意" : "上限内"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>製造場情報</h2>
        </div>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>会社名</span>
          <input type="text" data-tax-field="companyName" value="${decl.companyName}" />
        </label>
        <label class="field">
          <span>製造者番号</span>
          <input type="text" data-tax-field="companyNo" value="${decl.companyNo}" />
        </label>
        <label class="field">
          <span>代表者</span>
          <input type="text" data-tax-field="companyRepresentative" value="${decl.companyRepresentative}" />
        </label>
        <label class="field">
          <span>所在地</span>
          <input type="text" data-tax-field="companyAddress" value="${decl.companyAddress}" />
        </label>
        <label class="field">
          <span>所轄税務署</span>
          <input type="text" data-tax-field="taxOffice" value="${decl.taxOffice}" />
        </label>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>課税移出明細</h2>
          <p class="panel-caption">数量を変更すると課税対象数量と税額が自動再計算されます</p>
        </div>
        <button class="button secondary" data-action="tax-add-category">＋ 区分追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>コード</th>
              <th>区分名</th>
              <th class="numeric">アルコール度</th>
              <th class="numeric">製造数量(L)</th>
              <th class="numeric">前月繰越(L)</th>
              <th class="numeric">輸出控除(L)</th>
              <th class="numeric">見本等控除(L)</th>
              <th class="numeric">課税数量(L)</th>
              <th class="numeric">税率</th>
              <th class="numeric">税額</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${categoryRows || `<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>`}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${decl.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${formatCurrency(decl.totalTax)}</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>控除明細（輸出・見本・試験・欠減）</h2>
          <p class="panel-caption">酒税法第42条: 見本・試験は全製造数量の3%以内</p>
        </div>
        <button class="button secondary" data-action="tax-add-deduction">＋ 控除追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>種別</th>
              <th>酒類区分</th>
              <th class="numeric">数量(L)</th>
              <th>理由</th>
              <th>関連伝票No</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${deductionRows || `<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>`}</tbody>
        </table>
      </div>
    </section>

    <section class="panel disclaimer-panel">
      <div class="panel-header">
        <h2>📝 酒税法リマインダー</h2>
      </div>
      <div class="summary-list">
        <div><dt>申告期限</dt><dd>対象月の翌月末日までに所轄税務署へ提出</dd></div>
        <div><dt>納期限</dt><dd>同じく翌月末日まで（申告と同時）</dd></div>
        <div><dt>控除上限</dt><dd>見本・試験醸造は製造数量の3%以内（酒税法第42条）</dd></div>
        <div><dt>修正申告</dt><dd>発見次第、修正申告書を提出（延滞税・加算税の対象）</dd></div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>提出・エクスポート</h2>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="tax-export-xml">📄 XMLダウンロード</button>
        <button class="button secondary" data-action="tax-export-csv">📊 CSVダウンロード</button>
        <button class="button secondary" data-action="tax-print" onclick="window.print()">🖨️ 印刷</button>
        <button class="button secondary" data-action="tax-save-draft">下書き保存</button>
        <button class="button primary" data-action="tax-submit" ${decl.status === "submitted" ? "disabled" : ""}>
          ${decl.status === "submitted" ? "申告済" : "申告する"}
        </button>
      </div>
      <p class="form-hint" style="margin-top: 12px;">
        XMLはeTax受付システム形式（e-Taxソフトへ取り込み可能）、CSVは会計ソフト・税理士向け。印刷ボタンで紙提出用のPDF化もできます。
      </p>
    </section>
  `;
}
