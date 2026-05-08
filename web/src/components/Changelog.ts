import type { FeatureStatus } from "../api";

declare const __APP_VERSION__: number;

export interface FeatureEntry {
  id: string;
  route: string;
  label: string;
  desc: string;
  addedVersion: number;
}

export interface FeatureSection {
  title: string;
  color: string;
  features: FeatureEntry[];
}

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    title: "販売業務",
    color: "#1a56db",
    features: [
      { id: "invoice-entry",        route: "/invoice-entry",     label: "伝票入力",         desc: "売上・返品伝票の新規入力、明細追加",               addedVersion: 1   },
      { id: "invoice-browse",       route: "/invoice",           label: "伝票照会",         desc: "過去伝票の検索・表示・PDF出力",                   addedVersion: 1   },
      { id: "delivery-note",        route: "/delivery",          label: "納品書発行",       desc: "納品書のPDFダウンロード・印刷",                   addedVersion: 1   },
      { id: "billing-monthly",      route: "/billing",           label: "月次請求",         desc: "請求書発行・入金消込・未収管理",                   addedVersion: 1   },
      { id: "ledger-view",          route: "/ledger",            label: "得意先台帳",       desc: "得意先別の取引履歴・残高確認",                    addedVersion: 1   },
      { id: "quote-create",         route: "/quote",             label: "見積作成",         desc: "見積書の作成・PDF出力・メール送付",               addedVersion: 50  },
      { id: "shipment-calendar",    route: "/shipment-calendar", label: "配送カレンダー",   desc: "伝票日付ベースの配送スケジュール確認",             addedVersion: 200 },
    ],
  },
  {
    title: "分析・レポート",
    color: "#7e3af2",
    features: [
      { id: "analytics-monthly",    route: "/analytics",         label: "月次売上グラフ",   desc: "月次・商品別・得意先別の売上推移グラフ",           addedVersion: 1   },
      { id: "analytics-volume",     route: "/analytics",         label: "移出量集計",       desc: "商品・得意先別の移出量（mL）集計",                addedVersion: 320 },
      { id: "customer-analysis",    route: "/customer-analysis", label: "得意先分析",       desc: "ABC分析・購買頻度・LTV",                          addedVersion: 100 },
      { id: "product-power",        route: "/product-power",     label: "商品力分析",       desc: "商品別販売力・成長率",                            addedVersion: 100 },
      { id: "customer-efficiency",  route: "/customer-efficiency", label: "営業効率",      desc: "訪問コスト・粗利効率",                            addedVersion: 150 },
      { id: "report-aggregate",     route: "/report",            label: "集計帳票",         desc: "各種集計レポートの出力",                          addedVersion: 50  },
      { id: "sales-list",           route: "/sales",             label: "売上一覧",         desc: "売上明細の一覧表示・CSV出力",                     addedVersion: 1   },
    ],
  },
  {
    title: "営業・顧客管理",
    color: "#0e9f6e",
    features: [
      { id: "churn-alert",          route: "/churn-alert",       label: "営業アクション",   desc: "離反リスク検知・フォロー優先度",                  addedVersion: 150 },
      { id: "visit-planner",        route: "/visit-planner",     label: "訪問計画",         desc: "訪問スケジュールの作成・管理",                    addedVersion: 200 },
      { id: "map-view",             route: "/map",               label: "取引先マップ",     desc: "地図上で取引先の位置確認",                        addedVersion: 100 },
      { id: "prospects",            route: "/prospects",         label: "新規営業",         desc: "新規開拓リストの進捗管理",                        addedVersion: 100 },
      { id: "email-broadcast",      route: "/email",             label: "メール配信",       desc: "一斉メール配信・テンプレート管理",                 addedVersion: 200 },
      { id: "seasonal-calendar",    route: "/seasonal-calendar", label: "季節提案",         desc: "季節別提案スケジュール管理",                      addedVersion: 250 },
    ],
  },
  {
    title: "受注・仕入",
    color: "#e3a008",
    features: [
      { id: "workflow-order",       route: "/workflow",          label: "受注ワークフロー", desc: "受注から出荷までのステータス管理",                 addedVersion: 150 },
      { id: "shopify-orders",       route: "/shopify",           label: "Shopify受注",      desc: "EC受注の確認・取込",                              addedVersion: 200 },
      { id: "purchase-manage",      route: "/purchase",          label: "仕入・買掛",       desc: "仕入管理・買掛金残高",                            addedVersion: 100 },
      { id: "payment-status",       route: "/payment",           label: "入金状況",         desc: "入金・回収状況の一覧",                            addedVersion: 1   },
    ],
  },
  {
    title: "製造管理",
    color: "#e02424",
    features: [
      { id: "jikomi-record",        route: "/jikomi",            label: "仕込管理",         desc: "仕込帳・麹室・タンク仕込記録",                    addedVersion: 200 },
      { id: "tanks-manage",         route: "/tanks",             label: "タンク管理",       desc: "タンク別在庫・ブレンド管理",                      addedVersion: 200 },
      { id: "tax-declaration",      route: "/tax",               label: "酒税申告書",       desc: "課税移出・控除明細・eTax XML出力",                addedVersion: 250 },
      { id: "tax-volume",           route: "/tax",               label: "移出量自動集計",   desc: "販売伝票から清酒・リキュール別移出量を自動計算",   addedVersion: 322 },
      { id: "demand-forecast",      route: "/demand",            label: "需要予測",         desc: "過去実績ベースの需要予測",                        addedVersion: 250 },
      { id: "brewing-plan",         route: "/brewing-plan",      label: "醸造計画",         desc: "年間醸造スケジュール管理",                        addedVersion: 280 },
      { id: "procurement-plan",     route: "/procurement",       label: "調達計画",         desc: "原料米の調達・予算管理",                          addedVersion: 280 },
      { id: "brewing-process",      route: "/brewing-process",   label: "醸造工程",         desc: "バッチ別工程管理・麹室制約チェック",              addedVersion: 300 },
    ],
  },
  {
    title: "マスタ・設定",
    color: "#6b7280",
    features: [
      { id: "master-products",      route: "/master",            label: "商品マスタ",       desc: "商品情報の参照・編集",                            addedVersion: 1   },
      { id: "master-customers",     route: "/master",            label: "得意先マスタ",     desc: "得意先情報の参照・編集",                          addedVersion: 1   },
      { id: "store-pos",            route: "/store",             label: "店舗販売",         desc: "直売所のPOS・販売記録",                           addedVersion: 250 },
      { id: "tour-booking",         route: "/tour",              label: "酒蔵見学予約",     desc: "見学予約の受付・管理",                            addedVersion: 250 },
      { id: "relay-status",         route: "/setup",             label: "連動状態",         desc: "酒仙iとのリレー同期状態確認",                     addedVersion: 1   },
      { id: "csv-import",           route: "/import",            label: "CSV取込",          desc: "マスタ・売上データのCSVインポート",               addedVersion: 100 },
      { id: "user-manage",          route: "/users",             label: "ユーザー管理",     desc: "アカウント・権限管理",                            addedVersion: 100 },
      { id: "url-share",            route: "/",                  label: "URL共有",          desc: "PWAモードでも全ページをURLで共有可能",            addedVersion: 322 },
    ],
  },
];

// 全機能をフラットに取得
export function allFeatures(): FeatureEntry[] {
  return FEATURE_SECTIONS.flatMap(s => s.features);
}

// あるルートに属する機能のうち確認済みのものが30日以内かどうか
export function isNewRoute(route: string, statuses: Record<string, FeatureStatus>): boolean {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return FEATURE_SECTIONS
    .flatMap(s => s.features)
    .filter(f => f.route === route)
    .some(f => {
      const s = statuses[f.id];
      return s?.confirmedAt != null && new Date(s.confirmedAt).getTime() > cutoff;
    });
}

export function renderChangelog(
  statuses: Record<string, FeatureStatus>,
  currentUserName: string
): string {
  const version = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : 0;

  const confirmedCount = allFeatures().filter(f => statuses[f.id]?.confirmedAt).length;
  const totalCount = allFeatures().length;

  const sections = FEATURE_SECTIONS.map(section => {
    const rows = section.features.map(feat => {
      const s = statuses[feat.id];
      const confirmed = !!s?.confirmedAt;
      const dateStr = s?.confirmedAt
        ? new Date(s.confirmedAt).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" })
        : "";
      const who = s?.confirmedBy ? `(${s.confirmedBy})` : "";
      const isNew = confirmed && s?.confirmedAt
        ? Date.now() - new Date(s.confirmedAt).getTime() < 30 * 24 * 60 * 60 * 1000
        : false;

      return `
        <tr class="feature-row ${confirmed ? "confirmed" : ""}">
          <td class="feature-check">
            <input type="checkbox" class="feature-checkbox" data-feature-id="${feat.id}"
              ${confirmed ? "checked" : ""} />
          </td>
          <td class="feature-label">
            <a href="#" data-link="${feat.route}" class="feature-link">${feat.label}</a>
            ${isNew ? `<span class="badge-new-small">使用可能</span>` : ""}
          </td>
          <td class="feature-desc">${feat.desc}</td>
          <td class="feature-version mono">v${feat.addedVersion}</td>
          <td class="feature-status">
            ${confirmed
              ? `<span class="status-pill success">確認済 ${dateStr} ${who}</span>`
              : `<span class="status-pill muted">未確認</span>`
            }
          </td>
        </tr>`;
    }).join("");

    const sectionConfirmed = section.features.filter(f => statuses[f.id]?.confirmedAt).length;

    return `
      <section class="panel changelog-section">
        <div class="panel-header">
          <h2 style="border-left: 3px solid ${section.color}; padding-left: 10px">${section.title}</h2>
          <span class="changelog-progress">${sectionConfirmed} / ${section.features.length}</span>
        </div>
        <div class="table-wrap">
          <table class="entry-table changelog-table">
            <thead>
              <tr>
                <th style="width:40px"></th>
                <th>機能</th>
                <th>概要</th>
                <th class="mono" style="width:60px">追加</th>
                <th style="width:160px">状態</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>`;
  }).join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">連動・更新履歴</p>
        <h1>機能一覧</h1>
      </div>
      <div class="meta-stack">
        <span class="version-badge">v${version}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">現在バージョン</p>
        <p class="kpi-value mono">v${version}</p>
        <p class="kpi-sub">git push ごとにカウント</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">確認済み機能</p>
        <p class="kpi-value">${confirmedCount} / ${totalCount}</p>
        <p class="kpi-sub">${Math.round(confirmedCount / totalCount * 100)}% 動作確認完了</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">確認中ユーザー</p>
        <p class="kpi-value" style="font-size:1.2rem">${currentUserName}</p>
        <p class="kpi-sub">チェックで確認済みに記録</p>
      </article>
    </section>

    <div class="changelog-hint">
      チェックを入れると「使用可能」として記録されます。HOME画面のカードには確認済みの機能に <span class="badge-new-small">使用可能</span> タグが表示されます。
    </div>

    ${sections}
  `;
}
