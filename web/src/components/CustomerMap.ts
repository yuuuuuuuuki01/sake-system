import type { MasterCustomer } from "../api";

export interface GeoCustomer extends MasterCustomer {
  lat?: number;
  lng?: number;
  address1?: string;
  businessType?: string;
  lastOrderAmount?: number;
}

export function renderCustomerMap(customers: GeoCustomer[], filterRegion: string): string {
  const regions = Array.from(
    new Set(customers.map((c) => (c.address1 ?? "").slice(0, 3)).filter(Boolean))
  ).slice(0, 20);

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">取引先マップ</p>
        <h1>取引先を地図で見る</h1>
      </div>
      <div class="meta-stack">
        <span class="panel-caption">${customers.filter((c) => c.lat && c.lng).length} 件表示中</span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>地域絞込</span>
          <select id="map-region-filter">
            <option value="">すべて</option>
            ${regions.map((r) => `<option value="${r}" ${filterRegion === r ? "selected" : ""}>${r}</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="map-geocode">📍 住所から位置取得</button>
          <button class="button secondary" data-action="map-refresh">🔄 再読込</button>
        </div>
      </div>
    </section>

    <section class="panel" style="padding:0; overflow:hidden;">
      <div id="customer-map" style="height: 600px; width: 100%; background: #e8edf1;">
        <div style="padding:40px; text-align:center; color:var(--text-secondary);">地図を読み込み中…</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>取引先リスト</h2>
        <p class="panel-caption">${customers.length} 件</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>名称</th>
              <th>住所</th>
              <th>業種</th>
              <th class="numeric">直近注文</th>
              <th>座標</th>
            </tr>
          </thead>
          <tbody>
            ${customers
              .slice(0, 50)
              .map(
                (c) => `
              <tr>
                <td class="mono">${c.code}</td>
                <td>${c.name}</td>
                <td>${c.address1 ?? "―"}</td>
                <td>${c.businessType ?? "―"}</td>
                <td class="numeric">${c.lastOrderAmount ? "¥" + c.lastOrderAmount.toLocaleString("ja-JP") : "―"}</td>
                <td>${c.lat && c.lng ? `<span class="status-pill success">設定済</span>` : `<span class="status-pill warning">未設定</span>`}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}
