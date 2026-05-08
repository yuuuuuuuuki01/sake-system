import type { MapCustomer, DeliveryLocation } from "../api";

export interface MapFilters {
  filterStatus: "all" | "at-risk" | "dormant" | "active" | "inactive";
  filterArea: string;
  filterBiz: string;
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 10_000) return `${Math.round(amount / 10_000)}万`;
  return new Intl.NumberFormat("ja-JP").format(amount) + "円";
}

// ── GeoCustomer は削除; 外部から直接 MapCustomer を使う ──
// 後方互換のため GeoCustomer を再エクスポートしない（main.ts 側を更新）

export function renderCustomerMap(
  customers: MapCustomer[],
  deliveries: DeliveryLocation[],
  filters: MapFilters
): string {
  const areas = [...new Set(customers.map((c) => c.areaCode).filter(Boolean))].sort();
  const bizTypes = [...new Set(customers.map((c) => c.businessTypeName || c.businessType).filter(Boolean))].sort();

  const atRisk  = customers.filter((c) => c.isAtRisk);
  const dormant = customers.filter((c) => !c.isAtRisk && c.isDormant);
  const active  = customers.filter((c) => !c.isAtRisk && !c.isDormant && c.amount12m > 0);
  const inactive = customers.filter((c) => !c.isAtRisk && !c.isDormant && c.amount12m === 0);

  const deliveriesWithGeo = deliveries.filter((d) => d.lat && d.lng);

  const hasGeoData = customers.some((c) => c.lat && c.lng);
  const totalCustomers = customers.length;
  const geoCustomers = customers.filter((c) => c.lat && c.lng).length;

  // ジオコーディング未実行の場合の案内
  const geocodeNotice = !hasGeoData
    ? `<section class="panel" style="border-left:4px solid var(--color-warning);margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="flex:1;">
            <strong>📍 位置情報がまだ登録されていません</strong>
            <p style="margin:4px 0 0;font-size:0.85rem;color:var(--text-muted,#6b7280);">
              「ジオコーディング実行」で住所から緯度経度を自動取得します（${totalCustomers}件）。<br>
              Nominatim API を使用するため、1件/秒の速度で処理されます。
            </p>
          </div>
          <button class="button primary" id="btn-geocode">📍 ジオコーディング実行</button>
        </div>
        <div id="geocode-progress" style="display:none;margin-top:12px;">
          <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
            <div class="loading-spinner" style="width:16px;height:16px;"></div>
            <span id="geocode-status">準備中…</span>
          </div>
          <div style="margin-top:6px;background:#e5e7eb;border-radius:4px;height:6px;overflow:hidden;">
            <div id="geocode-bar" style="height:100%;background:var(--primary,#0F5B8D);width:0%;transition:width 0.3s;"></div>
          </div>
        </div>
      </section>`
    : geoCustomers < totalCustomers
      ? `<section class="panel" style="border-left:4px solid #3b82f6;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;font-size:0.85rem;">
              📍 位置情報: <strong>${geoCustomers}/${totalCustomers}件</strong> 取得済み
              （未取得 ${totalCustomers - geoCustomers}件）
            </div>
            <button class="button secondary small" id="btn-geocode">未取得分をジオコーディング</button>
          </div>
          <div id="geocode-progress" style="display:none;margin-top:12px;">
            <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
              <div class="loading-spinner" style="width:16px;height:16px;"></div>
              <span id="geocode-status">準備中…</span>
            </div>
            <div style="margin-top:6px;background:#e5e7eb;border-radius:4px;height:6px;overflow:hidden;">
              <div id="geocode-bar" style="height:100%;background:var(--primary,#0F5B8D);width:0%;transition:width 0.3s;"></div>
            </div>
          </div>
        </section>`
      : "";
  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">営業 / Map</p>
        <h1>取引先マップ</h1>
        <p class="meta-note">OpenStreetMap で得意先の位置情報を可視化します。</p>
      </div>
    </section>

    ${geocodeNotice}

    <section class="kpi-grid">
      <div class="kpi-card" style="border-top:3px solid var(--color-danger);">
        <div class="kpi-label">🔴 離反リスク</div>
        <div class="kpi-value">${atRisk.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠</div>
        <div class="kpi-value">${dormant.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #2196F3;">
        <div class="kpi-label">🔵 取引中</div>
        <div class="kpi-value">${active.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #aaa;">
        <div class="kpi-label">⚪ 売上なし</div>
        <div class="kpi-value">${inactive.length}<span class="kpi-sub">社</span></div>
      </div>
    </section>

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button ${filters.filterStatus === "all"      ? "primary" : "secondary"} small" type="button" data-map-status="all">すべて</button>
      <button class="button ${filters.filterStatus === "at-risk"  ? "primary" : "secondary"} small" type="button" data-map-status="at-risk">🔴 離反リスク</button>
      <button class="button ${filters.filterStatus === "dormant"  ? "primary" : "secondary"} small" type="button" data-map-status="dormant">🟠 休眠</button>
      <button class="button ${filters.filterStatus === "active"   ? "primary" : "secondary"} small" type="button" data-map-status="active">🔵 取引中</button>
      <button class="button ${filters.filterStatus === "inactive" ? "primary" : "secondary"} small" type="button" data-map-status="inactive">⚪ 売上なし</button>
      <select id="map-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${areas.map((a) => `<option value="${a}" ${filters.filterArea === a ? "selected" : ""}>${a}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${bizTypes.map((b) => `<option value="${b}" ${filters.filterBiz === b ? "selected" : ""}>${b}</option>`).join("")}
      </select>
    </div>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div id="customer-map" style="height:560px;width:100%;"></div>
    </section>
    <div id="map-data" style="display:none"
      data-customers="${encodeURIComponent(JSON.stringify(customers))}"
      data-deliveries="${encodeURIComponent(JSON.stringify(deliveriesWithGeo.map((d) => ({
        name: d.name, address: d.address, lat: d.lat, lng: d.lng, phone: d.phone
      }))))}"></div>

    <section class="panel">
      <div class="panel-header"><h2>凡例</h2></div>
      <div style="display:flex;gap:24px;flex-wrap:wrap;font-size:0.85rem;">
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#e53e3e;margin-right:4px;"></span>離反リスク（前年同月注文あり・今月未注文）</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#dd6b20;margin-right:4px;"></span>休眠（3ヶ月以上未注文）</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#2196F3;margin-right:4px;"></span>取引中（12ヶ月売上あり）</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#aaa;margin-right:4px;"></span>売上なし</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#FF9800;margin-right:4px;"></span>納品先</span>
      </div>
    </section>

  `;
  // NOTE: ジオコーディングボタンのイベントは main.ts 側で処理
}
