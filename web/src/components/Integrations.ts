import type { IntegrationSetting } from "../api";

const PROVIDER_DOCS: Record<string, { description: string; setupUrl: string; fields: { key: string; label: string; placeholder: string }[] }> = {
  shopify: {
    description: "Shopifyストアの注文・商品を自動同期します。",
    setupUrl: "https://shopify.dev/docs/apps/auth/admin-app-access-tokens",
    fields: [
      { key: "shop_domain", label: "ショップドメイン", placeholder: "your-store.myshopify.com" },
      { key: "admin_token", label: "Admin API アクセストークン", placeholder: "shpat_xxx..." }
    ]
  },
  google_calendar: {
    description: "Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",
    setupUrl: "https://console.cloud.google.com/apis/credentials",
    fields: [
      { key: "calendar_id", label: "カレンダーID", placeholder: "primary または xxx@group.calendar.google.com" },
      { key: "oauth_token", label: "OAuth Access Token", placeholder: "ya29.xxx..." }
    ]
  },
  cloud_vision: {
    description: "FAX画像をOCRしてテキスト化、伝票を自動起票します。",
    setupUrl: "https://console.cloud.google.com/apis/credentials",
    fields: [
      { key: "api_key", label: "Cloud Vision API Key", placeholder: "AIzaSyxxx..." }
    ]
  },
  resend: {
    description: "メール送信サービス。Webhook受信用エンドポイントもこちらから。",
    setupUrl: "https://resend.com/api-keys",
    fields: [
      { key: "api_key", label: "Resend API Key", placeholder: "re_xxx..." }
    ]
  },
  slack: {
    description: "Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",
    setupUrl: "https://api.slack.com/messaging/webhooks",
    fields: [
      { key: "webhook_url", label: "Webhook URL", placeholder: "https://hooks.slack.com/services/..." },
      { key: "default_channel", label: "デフォルトチャンネル", placeholder: "#general" }
    ]
  },
  ivry: {
    description: "IVRy電話システム連携。通話履歴取得と電話帳同期。",
    setupUrl: "https://ivry.jp/",
    fields: [
      { key: "api_key", label: "IVRy API Key", placeholder: "sk_live_..." },
      { key: "team_id", label: "チームID", placeholder: "team_..." },
      { key: "phone_number", label: "代表電話番号", placeholder: "0463-88-1511" }
    ]
  },
  google_maps: {
    description: "Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",
    setupUrl: "https://console.cloud.google.com/apis/credentials",
    fields: [
      { key: "api_key", label: "Google Maps API Key", placeholder: "AIzaSyxxx..." }
    ]
  }
};

export function renderIntegrations(settings: IntegrationSetting[], editingId: string | null): string {
  const editing = editingId ? settings.find((s) => s.id === editingId) : null;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">外部連携</p>
        <h1>連携サービス設定</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>登録済み連携</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>サービス</th>
              <th>状態</th>
              <th>最終同期</th>
              <th>結果</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${settings
              .map(
                (s) => `
              <tr>
                <td><strong>${s.name}</strong><br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${s.provider}</span></td>
                <td>
                  ${s.isEnabled ? '<span class="status-pill success">有効</span>' : '<span class="status-pill neutral">無効</span>'}
                </td>
                <td>${s.lastSyncAt ? s.lastSyncAt.slice(0, 16).replace("T", " ") : "未同期"}</td>
                <td style="font-size:12px;">${s.lastStatus ?? "―"}</td>
                <td>
                  <button class="button-sm secondary" data-action="int-edit" data-id="${s.id}">設定</button>
                  ${s.provider === "shopify" ? `<button class="button-sm primary" data-action="int-sync-shopify" data-id="${s.id}">同期</button>` : ""}
                  ${s.provider === "google_calendar" ? `<button class="button-sm primary" data-action="int-sync-gcal" data-id="${s.id}">同期</button>` : ""}
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>

    ${
      editing
        ? `
      <section class="panel">
        <div class="panel-header">
          <h2>${editing.name} の設定</h2>
        </div>
        <p class="form-hint">${PROVIDER_DOCS[editing.provider]?.description ?? ""}</p>
        ${
          PROVIDER_DOCS[editing.provider]?.setupUrl
            ? `<p class="form-hint">📖 取得方法: <a href="${PROVIDER_DOCS[editing.provider].setupUrl}" target="_blank">${PROVIDER_DOCS[editing.provider].setupUrl}</a></p>`
            : ""
        }
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(PROVIDER_DOCS[editing.provider]?.fields ?? [])
            .map(
              (f) => `
            <label class="field" style="flex:1 1 100%;">
              <span>${f.label}</span>
              <input id="int-${f.key}" type="text" value="${editing.config[f.key] ?? ""}" placeholder="${f.placeholder}" />
            </label>
          `
            )
            .join("")}
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="int-enabled" type="checkbox" ${editing.isEnabled ? "checked" : ""} />
            この連携を有効にする
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="int-cancel">キャンセル</button>
          <button class="button primary" data-action="int-save" data-id="${editing.id}">保存</button>
        </div>
      </section>
    `
        : ""
    }

    <section class="panel">
      <div class="panel-header">
        <h2>📡 連携ガイド</h2>
      </div>
      <div class="summary-list">
        <div>
          <dt>Shopify</dt>
          <dd>ストア管理画面 → アプリ → カスタムアプリ作成 → Admin API access token を発行</dd>
        </div>
        <div>
          <dt>Google Calendar</dt>
          <dd>Cloud Console で OAuth クライアント作成 → スコープ: calendar → アクセストークン取得</dd>
        </div>
        <div>
          <dt>Cloud Vision</dt>
          <dd>Cloud Console → APIとサービス → 認証情報 → APIキー作成 → Vision API を有効化</dd>
        </div>
        <div>
          <dt>Resend</dt>
          <dd>resend.com 登録 → ドメイン認証 (SPF/DKIM) → API Key 発行 → GitHub Secrets に <code>VITE_RESEND_API_KEY</code> 登録</dd>
        </div>
      </div>
    </section>
  `;
}
