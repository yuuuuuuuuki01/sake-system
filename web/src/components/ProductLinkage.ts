import type { MasterProduct, BaseSake } from "../api";

type SakeType = "大吟醸" | "純米大吟醸" | "吟醸" | "純米吟醸" | "純米" | "本醸造" | "普通酒" | "原酒" | "リキュール" | "その他";

function classifySakeType(name: string): SakeType {
  if (/純米大吟醸|純大/.test(name)) return "純米大吟醸";
  if (/大吟醸/.test(name)) return "大吟醸";
  if (/純米吟醸/.test(name)) return "純米吟醸";
  if (/吟醸/.test(name)) return "吟醸";
  if (/純米/.test(name)) return "純米";
  if (/本醸造/.test(name)) return "本醸造";
  if (/普通酒|佳撰|上撰/.test(name)) return "普通酒";
  if (/原酒/.test(name)) return "原酒";
  if (/ﾘｷｭｰﾙ|リキュール|ウメ|梅|レモン|ゆず/.test(name)) return "リキュール";
  return "その他";
}

function degreeRange(alc: number | null): string {
  if (!alc || alc <= 0) return "度数不明";
  if (alc < 10) return "~10%";
  if (alc < 14) return "10-14%";
  if (alc < 15) return "14-15%";
  if (alc < 16) return "15-16%";
  if (alc < 17) return "16-17%";
  if (alc < 18) return "17-18%";
  return "18%~";
}

interface ProductGroup {
  sakeType: SakeType;
  degRange: string;
  products: MasterProduct[];
  matchedBaseSakes: BaseSake[];
}

export function renderProductLinkage(
  allProducts: MasterProduct[],
  baseSakes: BaseSake[],
  selectedGroup: string | null
): string {
  const active = allProducts.filter(p => p.isActive);

  // 商品を製成種別×度数帯でグルーピング
  const groupMap = new Map<string, ProductGroup>();
  const typeOrder: SakeType[] = ["純米大吟醸", "大吟醸", "純米吟醸", "吟醸", "純米", "本醸造", "普通酒", "原酒", "リキュール", "その他"];

  for (const p of active) {
    const sakeType = classifySakeType(p.name);
    const deg = degreeRange(p.alcoholDegree);
    const key = `${sakeType}|${deg}`;

    if (!groupMap.has(key)) {
      // base_sakesテーブルからマッチする原酒候補を探す
      const matched = baseSakes.filter(bs => {
        if (!bs.alcoholDegree || !p.alcoholDegree) return false;
        // 種別マッチ
        const typeMatch = bs.sakeType === sakeType ||
          bs.sakeType === "原酒" ||
          (sakeType === "純米大吟醸" && bs.sakeType === "大吟醸") ||
          (sakeType === "純米吟醸" && (bs.sakeType === "吟醸" || bs.sakeType === "純米"));
        // 度数が近い（±3%）
        const degMatch = Math.abs(bs.alcoholDegree - p.alcoholDegree) <= 3;
        return typeMatch && degMatch;
      }).sort((a, b) => {
        const da = Math.abs((a.alcoholDegree ?? 0) - (p.alcoholDegree ?? 0));
        const db = Math.abs((b.alcoholDegree ?? 0) - (p.alcoholDegree ?? 0));
        return da - db;
      });

      groupMap.set(key, { sakeType, degRange: deg, products: [], matchedBaseSakes: matched });
    }
    groupMap.get(key)!.products.push(p);
  }

  // ソート
  const groups = Array.from(groupMap.values()).sort((a, b) => {
    const ia = typeOrder.indexOf(a.sakeType);
    const ib = typeOrder.indexOf(b.sakeType);
    if (ia !== ib) return ia - ib;
    return a.degRange.localeCompare(b.degRange);
  });

  // 統計
  const linked = active.filter(p => p.baseSakeId).length;
  const unlinked = active.length - linked;

  // グループカード
  const groupCards = groups
    .filter(g => g.sakeType !== "その他" || g.products.length > 5)
    .map(g => {
      const key = `${g.sakeType}|${g.degRange}`;
      const isSelected = key === selectedGroup;
      const linkedCount = g.products.filter(p => p.baseSakeId).length;
      const badge = linkedCount > 0
        ? `<span style="font-size:0.7rem;color:#059669;">${linkedCount}/${g.products.length}紐付済</span>`
        : `<span style="font-size:0.7rem;color:#dc2626;">${g.products.length}件未紐付</span>`;

      return `
        <div class="pl-group-card${isSelected ? " pl-selected" : ""}" data-pl-group="${key}">
          <div class="pl-group-title">${g.sakeType}</div>
          <div class="pl-group-deg">${g.degRange}</div>
          <div class="pl-group-count">${g.products.length}商品 ${badge}</div>
          ${g.matchedBaseSakes.length > 0
            ? `<div class="pl-group-sake">原酒候補: ${g.matchedBaseSakes.length}件</div>`
            : `<div class="pl-group-sake" style="color:#9ca3af;">原酒候補なし</div>`}
        </div>`;
    }).join("");

  // 選択中グループの詳細
  const detailHtml = selectedGroup
    ? renderGroupDetail(groups.find(g => `${g.sakeType}|${g.degRange}` === selectedGroup), baseSakes)
    : `<div class="pl-detail-empty">左のグループを選択すると商品一覧と原酒候補が表示されます</div>`;

  // 原酒登録セクション
  const baseSakeListHtml = baseSakes.length > 0
    ? baseSakes.map(bs => `
        <tr>
          <td class="mono">${bs.code}</td>
          <td>${bs.name}</td>
          <td>${bs.sakeType}</td>
          <td class="numeric">${bs.alcoholDegree ?? "―"}%</td>
          <td>${bs.riceType || "―"}</td>
          <td class="numeric">${bs.polishRate != null ? `${bs.polishRate}%` : "―"}</td>
          <td>${bs.brewingYear || "―"}</td>
          <td>${({aging:"熟成中",ready:"瓶詰可",fermenting:"醗酵中",pressing:"上槽中",empty:"使切り",blended:"ブレンド済"} as Record<string,string>)[bs.status] ?? bs.status}</td>
          <td>
            <button class="button secondary small" data-delete-base-sake="${bs.id}" title="削除">削除</button>
          </td>
        </tr>
      `).join("")
    : `<tr><td colspan="9" style="text-align:center;color:var(--text-muted);padding:16px;">原酒未登録</td></tr>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">商品管理</p>
        <h1>製成種別・原酒紐付け</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">有効商品</p>
        <p class="kpi-value">${active.length}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原酒（base_sakes）</p>
        <p class="kpi-value">${baseSakes.length}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原酒紐付済</p>
        <p class="kpi-value">${linked} <span style="font-size:0.6em;color:var(--text-muted)">/ ${active.length}</span></p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未紐付</p>
        <p class="kpi-value">${unlinked}</p>
      </article>
    </section>

    <details class="panel" style="margin-bottom:16px;">
      <summary style="cursor:pointer;font-weight:700;padding:12px 16px;">原酒登録・管理</summary>
      <div style="padding:0 16px 16px;">
        <form id="base-sake-form" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;margin-bottom:16px;">
          <div><label class="form-label">コード</label><input id="bs-code" class="form-input" placeholder="例: BS001" required></div>
          <div><label class="form-label">名称</label><input id="bs-name" class="form-input" placeholder="例: 純米大吟醸原酒" required></div>
          <div>
            <label class="form-label">製成種別</label>
            <select id="bs-sake-type" class="form-input">
              <option value="純米大吟醸">純米大吟醸</option>
              <option value="大吟醸">大吟醸</option>
              <option value="純米吟醸">純米吟醸</option>
              <option value="吟醸">吟醸</option>
              <option value="純米">純米</option>
              <option value="本醸造">本醸造</option>
              <option value="普通酒">普通酒</option>
              <option value="原酒" selected>原酒</option>
              <option value="リキュール">リキュール</option>
              <option value="その他">その他</option>
            </select>
          </div>
          <div><label class="form-label">度数(%)</label><input id="bs-alcohol" class="form-input" type="number" step="0.1" placeholder="例: 17.5"></div>
          <div><label class="form-label">使用米</label><input id="bs-rice" class="form-input" placeholder="例: 山田錦"></div>
          <div><label class="form-label">精米歩合(%)</label><input id="bs-polish" class="form-input" type="number" step="1" placeholder="例: 50"></div>
          <div><label class="form-label">醸造年度(BY)</label><input id="bs-year" class="form-input" type="number" placeholder="例: 7"></div>
          <div>
            <label class="form-label">ステータス</label>
            <select id="bs-status" class="form-input">
              <option value="aging" selected>熟成中</option>
              <option value="ready">瓶詰め可</option>
              <option value="fermenting">醗酵中</option>
              <option value="pressing">上槽中</option>
              <option value="empty">使い切り</option>
              <option value="blended">ブレンド済</option>
            </select>
          </div>
          <div style="display:flex;align-items:flex-end;">
            <button type="button" class="button primary" data-action="save-base-sake">登録</button>
          </div>
        </form>
        <div class="table-wrap">
          <table style="font-size:0.85rem;">
            <thead><tr><th>コード</th><th>名称</th><th>種別</th><th class="numeric">度数</th><th>使用米</th><th class="numeric">精米</th><th>年度</th><th>状態</th><th></th></tr></thead>
            <tbody>${baseSakeListHtml}</tbody>
          </table>
        </div>
      </div>
    </details>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div class="pl-layout">
        <div class="pl-sidebar">
          <div class="pl-sidebar-header">製成種別×度数帯</div>
          <div class="pl-group-list">${groupCards}</div>
        </div>
        <div class="pl-detail">${detailHtml}</div>
      </div>
    </section>

    <style>
      .pl-layout { display: grid; grid-template-columns: 280px 1fr; min-height: 500px; }
      @media (max-width: 768px) { .pl-layout { grid-template-columns: 1fr; } .pl-sidebar { max-height: 240px; overflow-y: auto; } }
      .pl-sidebar { border-right: 1px solid var(--border, #e5e7eb); overflow-y: auto; }
      .pl-sidebar-header { padding: 12px 16px; font-weight: 700; font-size: 0.85rem; border-bottom: 1px solid var(--border); background: var(--bg-subtle, #f9fafb); }
      .pl-group-list { padding: 4px; }
      .pl-group-card { padding: 10px 12px; border-radius: 6px; cursor: pointer; margin-bottom: 2px; transition: background 0.1s; }
      .pl-group-card:hover { background: var(--bg-hover, #f3f4f6); }
      .pl-group-card.pl-selected { background: #dbeafe; border-left: 3px solid #2563eb; }
      .pl-group-title { font-weight: 700; font-size: 0.9rem; }
      .pl-group-deg { font-size: 0.75rem; color: var(--text-muted); }
      .pl-group-count { font-size: 0.8rem; margin-top: 2px; }
      .pl-group-sake { font-size: 0.7rem; color: #059669; margin-top: 1px; }
      .pl-detail { padding: 16px; overflow-y: auto; }
      .pl-detail-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 0.9rem; }
      .pl-section-title { font-size: 0.85rem; font-weight: 700; margin: 16px 0 8px; padding-bottom: 4px; border-bottom: 2px solid var(--border); }
      .pl-section-title:first-child { margin-top: 0; }
      .pl-recommend { background: #fef3c7; border: 1px solid #fde68a; border-radius: 6px; padding: 2px 8px; font-size: 0.7rem; color: #92400e; font-weight: 600; }
      .pl-link-btn { font-size: 0.75rem; padding: 2px 8px; }
      .badge { display:inline-block;padding:1px 6px;border-radius:8px;font-size:0.7rem;font-weight:600; }
      .badge-success { background:#d1fae5;color:#065f46; }
      .badge-muted { background:#e5e7eb;color:#6b7280; }
    </style>
  `;
}

function renderGroupDetail(group: ProductGroup | undefined, baseSakes: BaseSake[]): string {
  if (!group) return `<div class="pl-detail-empty">グループが見つかりません</div>`;

  // 原酒候補セクション（base_sakesテーブルから）
  const baseSakeHtml = group.matchedBaseSakes.length > 0
    ? group.matchedBaseSakes.map(bs => `
        <tr>
          <td class="mono">${bs.code}</td>
          <td>${bs.name}</td>
          <td>${bs.sakeType}</td>
          <td class="numeric">${bs.alcoholDegree ?? "―"}%</td>
          <td>${bs.riceType || "―"}</td>
          <td class="numeric">${bs.polishRate != null ? `${bs.polishRate}%` : "―"}</td>
          <td>${bs.status === "active" ? "有効" : bs.status}</td>
          <td>${bs === group.matchedBaseSakes[0] ? '<span class="pl-recommend">おすすめ</span>' : ""}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="8" style="color:var(--text-muted);text-align:center;padding:12px;">この種別×度数帯に一致する原酒がありません</td></tr>`;

  // 商品一覧セクション
  const productRows = group.products
    .sort((a, b) => a.code.localeCompare(b.code))
    .map(p => {
      const linkedSake = p.baseSakeId ? baseSakes.find(x => x.id === p.baseSakeId) : null;
      const typeBadge = p.productType === "pb"
        ? '<span style="background:#7c3aed;color:#fff;padding:1px 5px;border-radius:8px;font-size:0.65rem;font-weight:700;">PB</span>'
        : p.productType === "base_sake"
          ? '<span style="background:#dc2626;color:#fff;padding:1px 5px;border-radius:8px;font-size:0.65rem;font-weight:700;">原酒</span>'
          : "";

      // 原酒候補のドロップダウン（複数ある場合に選択可能）
      const linkOptions = group.matchedBaseSakes.length > 1
        ? `<select class="form-input" style="font-size:0.75rem;padding:1px 4px;width:auto;display:inline-block;" data-sake-select="${p.id}">
            ${group.matchedBaseSakes.map(bs => `<option value="${bs.id}"${bs === group.matchedBaseSakes[0] ? " selected" : ""}>[${bs.code}] ${bs.name}</option>`).join("")}
          </select>
          <button class="button secondary small pl-link-btn" data-link-base-sake="${p.id}" data-sake-id="${group.matchedBaseSakes[0].id}">紐付け</button>`
        : group.matchedBaseSakes.length === 1
          ? `<button class="button secondary small pl-link-btn" data-link-base-sake="${p.id}" data-sake-id="${group.matchedBaseSakes[0].id}">紐付け</button>`
          : '<span style="color:#9ca3af;font-size:0.75rem;">―</span>';

      return `
        <tr>
          <td class="mono">${p.code}</td>
          <td>${p.name} ${typeBadge}</td>
          <td class="numeric">${p.alcoholDegree ?? "―"}%</td>
          <td class="numeric">${p.volumeMl ? `${p.volumeMl}ml` : ""}</td>
          <td>${linkedSake
            ? `<span style="color:#059669;font-size:0.8rem;">[${linkedSake.code}] ${linkedSake.name.slice(0, 15)}</span>`
            : linkOptions
          }</td>
          <td><button class="button secondary small" data-edit-product="${p.id}">編集</button></td>
        </tr>`;
    }).join("");

  return `
    <h3 style="margin:0 0 4px;font-size:1rem;">${group.sakeType} ― ${group.degRange}</h3>
    <p style="color:var(--text-muted);font-size:0.8rem;margin:0 0 12px;">${group.products.length}商品 / 原酒候補${group.matchedBaseSakes.length}件</p>

    <div class="pl-section-title">原酒候補</div>
    <div class="table-wrap">
      <table style="font-size:0.85rem;">
        <thead><tr><th>コード</th><th>原酒名</th><th>種別</th><th class="numeric">度数</th><th>使用米</th><th class="numeric">精米</th><th>状態</th><th></th></tr></thead>
        <tbody>${baseSakeHtml}</tbody>
      </table>
    </div>

    <div class="pl-section-title">このグループの商品</div>
    <div class="table-wrap">
      <table style="font-size:0.85rem;">
        <thead><tr><th>コード</th><th>商品名</th><th class="numeric">度数</th><th class="numeric">容量</th><th>原酒</th><th></th></tr></thead>
        <tbody>${productRows}</tbody>
      </table>
    </div>
  `;
}
