import type { MasterCustomer, Prospect, DeliveryLocation } from "../api";

export interface GeoCustomer extends MasterCustomer {
  lat?: number;
  lng?: number;
  address1?: string;
  businessType?: string;
  lastOrderAmount?: number;
}

export interface MapFilters {
  showCustomers: boolean;
  showProspects: boolean;
  showDelivery: boolean;
  filterRegion: string;
  filterBusinessType: string;
}

export function renderCustomerMap(
  customers: GeoCustomer[],
  prospects: Prospect[],
  deliveries: DeliveryLocation[],
  filters: MapFilters,
  useGoogleMaps: boolean
): string {
  const businessTypes = Array.from(
    new Set(
      [
        ...customers.map((c) => c.businessType ?? ""),
        ...prospects.map((p) => p.businessType ?? "")
      ].filter(Boolean)
    )
  );

  const customersWithGeo = customers.filter((c) => c.lat && c.lng).length;
  const prospectsWithGeo = prospects.filter((p) => p.lat && p.lng).length;
  const deliveriesWithGeo = deliveries.filter((d) => d.lat && d.lng).length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">マップ</p>
        <h1>取引先マップ</h1>
      </div>
      <div class="meta-stack">
        <span class="panel-caption">${useGoogleMaps ? "Google Maps" : "OpenStreetMap"}</span>
        <button class="button secondary" data-action="map-geocode">📍 住所から位置取得</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2196F3;">
        <p class="panel-title">🔵 既存取引先</p>
        <p class="kpi-value">${customersWithGeo}</p>
        <p class="kpi-sub">/ ${customers.length}件 (位置取得済)</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #4CAF50;">
        <p class="panel-title">🟢 新規見込客</p>
        <p class="kpi-value">${prospectsWithGeo}</p>
        <p class="kpi-sub">/ ${prospects.length}件</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #FF9800;">
        <p class="panel-title">🟠 納品先</p>
        <p class="kpi-value">${deliveriesWithGeo}</p>
        <p class="kpi-sub">/ ${deliveries.length}件</p>
      </article>
    </section>

    <section class="panel filter-panel">
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;">
        <strong style="font-size:13px;">表示切替:</strong>
        <label><input type="checkbox" data-map-filter="showCustomers" ${filters.showCustomers ? "checked" : ""} /> 🔵 既存取引先</label>
        <label><input type="checkbox" data-map-filter="showProspects" ${filters.showProspects ? "checked" : ""} /> 🟢 新規見込客</label>
        <label><input type="checkbox" data-map-filter="showDelivery" ${filters.showDelivery ? "checked" : ""} /> 🟠 納品先</label>
        <span style="border-left:1px solid var(--border);padding-left:16px;"></span>
        <label>業種:
          <select data-map-filter="filterBusinessType" style="margin-left:4px;">
            <option value="">すべて</option>
            ${businessTypes.map((t) => `<option value="${t}" ${filters.filterBusinessType === t ? "selected" : ""}>${t}</option>`).join("")}
          </select>
        </label>
      </div>
    </section>

    <section class="panel" style="padding:0; overflow:hidden;">
      <div id="customer-map" style="height: 600px; width: 100%; background: #e8edf1;">
        <div style="padding:40px; text-align:center; color:var(--text-secondary);">地図を読み込み中…</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>凡例・統計</h2>
      </div>
      <div class="summary-list">
        <div><dt>🔵 既存取引先</dt><dd>過去に受注実績がある顧客 (customers テーブル)</dd></div>
        <div><dt>🟢 新規見込客</dt><dd>営業活動中の潜在顧客 (prospects テーブル、ステージ別色分け)</dd></div>
        <div><dt>🟠 納品先</dt><dd>顧客本社とは別の配送先 (delivery_locations テーブル)</dd></div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>位置情報が未設定のレコード</h2>
      </div>
      <p class="form-hint">住所から緯度経度を取得するには、Google Maps API で「ジオコーディング」を実行してください。</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>種別</th><th>名称</th><th>住所</th><th>状態</th></tr>
          </thead>
          <tbody>
            ${customers
              .filter((c) => !c.lat || !c.lng)
              .slice(0, 5)
              .map(
                (c) => `
              <tr>
                <td>🔵 既存</td>
                <td>${c.name}</td>
                <td>${c.address1 ?? "住所未設定"}</td>
                <td><span class="status-pill warning">位置未取得</span></td>
              </tr>
            `
              )
              .join("")}
            ${prospects
              .filter((p) => !p.lat || !p.lng)
              .slice(0, 5)
              .map(
                (p) => `
              <tr>
                <td>🟢 新規</td>
                <td>${p.companyName}</td>
                <td>${p.address ?? "住所未設定"}</td>
                <td><span class="status-pill warning">位置未取得</span></td>
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
