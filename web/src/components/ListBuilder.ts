import type { LeadItem, LeadList } from "../api";

export interface ListBuilderState {
  lists: LeadList[];
  activeListId: string | null;
  items: LeadItem[];
  searchQuery: string;
  searchArea: string;
  searchBusinessType: string;
  searching: boolean;
  searchResults: LeadItem[];
}

const BUSINESS_TYPES = [
  "飲食店",
  "居酒屋",
  "寿司屋",
  "和食",
  "焼肉",
  "フレンチ",
  "イタリアン",
  "バー",
  "酒販店",
  "ワインショップ",
  "百貨店",
  "スーパー",
  "ホテル",
  "旅館",
  "ブライダル",
  "セレクトショップ"
];

export function renderListBuilder(state: ListBuilderState): string {
  const activeList = state.activeListId ? state.lists.find((l) => l.id === state.activeListId) : null;
  const newCount = state.items.filter((i) => i.status === "new").length;
  const importedCount = state.items.filter((i) => i.status === "imported").length;
  const excludedCount = state.items.filter((i) => i.status === "excluded").length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">新規営業</p>
        <h1>リスト取得ツール</h1>
      </div>
      <div class="meta-stack">
        <span class="panel-caption">${state.lists.length}リスト / ${state.items.length}件</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>🔍 Google Places でリスト検索</h2>
      </div>
      <p class="form-hint" style="margin:0 0 12px;">業種 × エリアで検索し、見込客候補を自動取得します。Google Maps API Keyが必要です (/integrations)。</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;">
        <label class="field" style="flex:1 1 180px;">
          <span>業種</span>
          <select id="lb-type">
            <option value="">選択</option>
            ${BUSINESS_TYPES.map((t) => `<option value="${t}" ${state.searchBusinessType === t ? "selected" : ""}>${t}</option>`).join("")}
          </select>
        </label>
        <label class="field" style="flex:1 1 180px;">
          <span>エリア</span>
          <input id="lb-area" type="text" value="${state.searchArea}" placeholder="秦野市 / 渋谷区 / 大阪市" />
        </label>
        <label class="field" style="flex:1 1 200px;">
          <span>追加キーワード (任意)</span>
          <input id="lb-keyword" type="text" value="${state.searchQuery}" placeholder="日本酒 / 地酒 / 人気" />
        </label>
        <button class="button primary" data-action="lb-search" ${state.searching ? "disabled" : ""}>
          ${state.searching ? "検索中…" : "🔍 検索"}
        </button>
      </div>
      ${
        state.searchResults.length > 0
          ? `
        <div style="margin-top:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <strong>検索結果: ${state.searchResults.length}件</strong>
            <div style="display:flex;gap:8px;">
              <button class="button secondary" data-action="lb-save-list">📋 リストとして保存</button>
              <button class="button secondary" data-action="lb-clear-search">クリア</button>
            </div>
          </div>
          <div class="table-wrap" style="max-height:400px;overflow-y:auto;">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" id="lb-select-all" checked /></th>
                  <th>店名</th>
                  <th>住所</th>
                  <th class="numeric">評価</th>
                  <th class="numeric">レビュー</th>
                </tr>
              </thead>
              <tbody>
                ${state.searchResults
                  .map(
                    (r, i) => `
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${i}" checked /></td>
                    <td><strong>${r.companyName}</strong></td>
                    <td style="font-size:12px;">${r.address ?? "―"}</td>
                    <td class="numeric">${r.rating ? `⭐${r.rating}` : "―"}</td>
                    <td class="numeric">${r.reviewCount ?? "―"}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      `
          : ""
      }
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>📋 保存済みリスト</h2>
        </div>
        <button class="button secondary" data-action="lb-new-manual">＋ 手動リスト作成</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        ${state.lists
          .map(
            (l) => `
          <button class="button ${state.activeListId === l.id ? "primary" : "secondary"}"
                  data-action="lb-select-list" data-id="${l.id}">
            ${l.name} (${l.totalCount})
          </button>
        `
          )
          .join("")}
        ${state.lists.length === 0 ? '<span class="form-hint">リストがありません</span>' : ""}
      </div>

      ${
        activeList
          ? `
        <div style="padding:12px;background:var(--surface-alt);border-radius:6px;margin-bottom:12px;">
          <strong>${activeList.name}</strong>
          <span class="form-hint" style="margin-left:8px;">
            クエリ: ${activeList.query ?? "―"} | エリア: ${activeList.area ?? "―"} | 業種: ${activeList.businessType ?? "―"}
          </span>
          <div style="margin-top:8px;display:flex;gap:16px;font-size:12px;">
            <span>🆕 新規: <strong>${newCount}</strong></span>
            <span>✅ 取込済: <strong>${importedCount}</strong></span>
            <span>❌ 除外: <strong>${excludedCount}</strong></span>
          </div>
        </div>

        <div style="margin-bottom:12px;">
          <button class="button primary" data-action="lb-bulk-convert" ${newCount === 0 ? "disabled" : ""}>
            🎯 選択行を見込客に一括変換 (${newCount}件)
          </button>
          <button class="button secondary" data-action="lb-delete-list" data-id="${activeList.id}" style="color:var(--danger);margin-left:auto;">
            🗑️ リスト削除
          </button>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" id="lb-items-all" /></th>
                <th>店名</th>
                <th>住所</th>
                <th>電話</th>
                <th class="numeric">評価</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${state.items
                .map(
                  (i) => `
                <tr ${i.status === "excluded" ? 'style="opacity:0.4;"' : ""}>
                  <td>${i.status === "new" ? `<input type="checkbox" class="lb-item-check" data-id="${i.id}" />` : ""}</td>
                  <td><strong>${i.companyName}</strong></td>
                  <td style="font-size:12px;">${i.address ?? "―"}</td>
                  <td class="mono" style="font-size:12px;">${i.phone ?? "―"}</td>
                  <td class="numeric">${i.rating ? `⭐${i.rating}(${i.reviewCount ?? 0})` : "―"}</td>
                  <td>
                    ${
                      i.status === "new"
                        ? '<span class="status-pill neutral">新規</span>'
                        : i.status === "imported"
                          ? '<span class="status-pill success">取込済</span>'
                          : '<span class="status-pill warning">除外</span>'
                    }
                  </td>
                  <td>
                    ${i.status === "new" ? `<button class="button-sm secondary" data-action="lb-exclude" data-id="${i.id}">除外</button>` : ""}
                    ${i.status === "new" ? `<button class="button-sm primary" data-action="lb-convert-one" data-id="${i.id}">→見込客</button>` : ""}
                  </td>
                </tr>
              `
                )
                .join("")}
              ${state.items.length === 0 ? '<tr><td colspan="7" class="empty-row">アイテムがありません</td></tr>' : ""}
            </tbody>
          </table>
        </div>
      `
          : ""
      }
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>💡 このツールの使い方</h2>
      </div>
      <ol style="line-height:1.8;">
        <li><strong>業種 × エリア</strong>で検索 → Google Placesから候補一覧を取得</li>
        <li>チェックを付けて「リストとして保存」→ Supabaseに永続化</li>
        <li>保存したリストを確認・編集 → 営業対象を選別</li>
        <li>「<strong>見込客に一括変換</strong>」で /prospects にcold案件として追加</li>
        <li>その後はカンバンで営業活動→受注化</li>
      </ol>
      <p class="form-hint">
        ※ Google Places API はリクエスト数に応じて課金されます (Googleの無料枠内で月200ドル相当まで無料)
      </p>
    </section>
  `;
}
