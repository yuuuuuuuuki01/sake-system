import { SEASONAL_TEMPLATES, type MailSender } from "../api";

export type EmailAudienceMode = "all" | "area" | "history";

export interface EmailRecipientPreview {
  name: string;
  email: string;
  area: string;
}

export interface EmailBroadcastViewState {
  audienceMode: EmailAudienceMode;
  region: string;
  historySegment: string;
  selectedTemplateId: string;
  subject: string;
  body: string;
  recipientCount: number;
  previewRecipients: EmailRecipientPreview[];
  saveMessage: string | null;
  sending: boolean;
  senderId: string;
  senders: MailSender[];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatPreviewBody(value: string): string {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

export function renderEmailBroadcast(state: EmailBroadcastViewState): string {
  const templates = [
    ...Object.values(SEASONAL_TEMPLATES),
    { id: "custom", season: "カスタム", subject: "", body: "" }
  ];

  const templateCards = templates
    .map(
      (template) => `
        <button
          class="template-card ${state.selectedTemplateId === template.id ? "active" : ""}"
          type="button"
          data-action="template-select"
          data-template-id="${template.id}"
        >
          <span class="template-card-kicker">${template.season}</span>
          <strong>${escapeHtml(template.subject || "空テンプレート")}</strong>
        </button>
      `
    )
    .join("");

  const previewRecipients = state.previewRecipients.length
    ? state.previewRecipients
        .map(
          (recipient) => `
            <li>
              <span>${escapeHtml(recipient.name)}</span>
              <span class="table-sub">${escapeHtml(recipient.email)} / ${escapeHtml(recipient.area)}</span>
            </li>
          `
        )
        .join("")
    : `<li>該当する宛先はありません。</li>`;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">メール配信</p>
        <h1>季節商品の案内メール</h1>
      </div>
    </section>

    <section class="broadcast-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>宛先選択</h2>
            <p class="panel-caption">配信対象を選び、想定送信件数を確認します。</p>
          </div>
        </div>
        <div class="option-grid">
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="all" ${state.audienceMode === "all" ? "checked" : ""} />
            <span>全顧客</span>
          </label>
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="area" ${state.audienceMode === "area" ? "checked" : ""} />
            <span>エリア別</span>
          </label>
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="history" ${state.audienceMode === "history" ? "checked" : ""} />
            <span>過去購入履歴で絞り込み</span>
          </label>
        </div>
        <div class="filter-grid email-filter-grid">
          <label class="field">
            <span>エリア</span>
            <select id="email-region">
              <option value="all" ${state.region === "all" ? "selected" : ""}>全エリア</option>
              <option value="北海道" ${state.region === "北海道" ? "selected" : ""}>北海道</option>
              <option value="関東" ${state.region === "関東" ? "selected" : ""}>関東</option>
              <option value="中部" ${state.region === "中部" ? "selected" : ""}>中部</option>
              <option value="関西" ${state.region === "関西" ? "selected" : ""}>関西</option>
              <option value="九州" ${state.region === "九州" ? "selected" : ""}>九州</option>
            </select>
          </label>
          <label class="field">
            <span>購入履歴</span>
            <select id="email-history-segment">
              <option value="seasonal" ${state.historySegment === "seasonal" ? "selected" : ""}>季節商品購入客</option>
              <option value="premium" ${state.historySegment === "premium" ? "selected" : ""}>吟醸系購入客</option>
              <option value="liqueur" ${state.historySegment === "liqueur" ? "selected" : ""}>リキュール購入客</option>
            </select>
          </label>
        </div>
        <p class="recipient-count">${state.recipientCount.toLocaleString("ja-JP")} 件が対象です。</p>
        <ul class="recipient-preview">
          ${previewRecipients}
        </ul>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>テンプレート選択</h2>
            <p class="panel-caption">季節テンプレートを選ぶと件名と本文に自動反映します。</p>
          </div>
        </div>
        <div class="template-grid">
          ${templateCards}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>本文編集</h2>
            <p class="panel-caption">必要に応じて件名と本文を微調整します。</p>
          </div>
        </div>
        <div class="field">
          <span>件名</span>
          <input id="email-subject" type="text" value="${escapeHtml(state.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${escapeHtml(state.body)}</textarea>
        </div>
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-insert-link">商品リンクを挿入</button>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>プレビュー &amp; 送信</h2>
            <p class="panel-caption">送信前の見え方を確認し、下書き保存または送信操作を行います。</p>
          </div>
        </div>
        <label class="field" style="margin-bottom:12px;">
          <span>送信元アドレス</span>
          <select id="email-sender">
            ${state.senders
              .map(
                (s) =>
                  `<option value="${s.id}" ${s.id === state.senderId ? "selected" : ""}>${escapeHtml(s.name)} &lt;${escapeHtml(s.email)}&gt;${s.isVerified ? "" : " ⚠️未認証"}</option>`
              )
              .join("")}
            ${state.senders.length === 0 ? '<option value="">送信元が未登録です</option>' : ""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${escapeHtml(state.subject || "件名未入力")}</p>
          <div class="preview-box">${state.body ? formatPreviewBody(state.body) : "本文未入力"}</div>
        </div>
        ${state.saveMessage ? `<p class="meta-note">${escapeHtml(state.saveMessage)}</p>` : ""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${state.sending ? "disabled" : ""}>
            ${state.sending ? "送信中..." : "送信する"}
          </button>
        </div>
      </article>
    </section>
  `;
}
