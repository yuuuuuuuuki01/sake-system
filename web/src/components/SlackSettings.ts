import type { IntegrationSetting, SlackNotificationLog, SlackNotificationRule } from "../api";
import { SLACK_EVENT_LABELS } from "../api";

export function renderSlackSettings(
  setting: IntegrationSetting | null,
  rules: SlackNotificationRule[],
  logs: SlackNotificationLog[]
): string {
  const webhookUrl = setting?.config["webhook_url"] ?? "";
  const defaultChannel = setting?.config["default_channel"] ?? "#general";

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">Slack通知</p>
        <h1>通知ルール設定</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="slack-test">🔔 テスト送信</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>🔗 Webhook接続</h2>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;">
        <label class="field" style="flex:1 1 320px;">
          <span>Incoming Webhook URL</span>
          <input id="slack-webhook" type="text" value="${webhookUrl}" placeholder="https://hooks.slack.com/services/..." />
        </label>
        <label class="field" style="flex:0 0 140px;">
          <span>デフォルト先</span>
          <input id="slack-default-channel" type="text" value="${defaultChannel}" />
        </label>
        <label style="display:flex;align-items:center;gap:8px;">
          <input id="slack-enabled" type="checkbox" ${setting?.isEnabled ? "checked" : ""} />
          有効
        </label>
        <button class="button primary" data-action="slack-save">保存</button>
      </div>
      <p class="form-hint" style="margin-top:8px;">
        📖 Webhook URLの取得: Slack App ディレクトリ → 「Incoming Webhooks」を追加 → チャンネル選択 → URLをコピー
      </p>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>🔔 通知ルール (${rules.length}件)</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>イベント</th>
              <th>有効</th>
              <th>送信先チャンネル</th>
              <th>最終通知</th>
            </tr>
          </thead>
          <tbody>
            ${rules
              .map(
                (r) => `
              <tr>
                <td>${SLACK_EVENT_LABELS[r.eventType] || r.eventType}</td>
                <td>
                  <label style="display:flex;align-items:center;gap:6px;">
                    <input type="checkbox" data-slack-rule-id="${r.id}" data-slack-field="enabled" ${r.enabled ? "checked" : ""} />
                    ${r.enabled ? "ON" : "OFF"}
                  </label>
                </td>
                <td>
                  <input type="text" data-slack-rule-id="${r.id}" data-slack-field="channel" value="${r.channel}" style="width:180px;padding:4px 8px;" />
                </td>
                <td style="font-size:12px;color:var(--text-secondary);">${r.lastTriggeredAt ? r.lastTriggeredAt.slice(0, 16).replace("T", " ") : "未通知"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="action-bar">
        <button class="button primary" data-action="slack-save-rules">ルール保存</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>📋 送信履歴 (${logs.length}件)</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>送信時刻</th>
              <th>イベント</th>
              <th>チャンネル</th>
              <th>メッセージ</th>
              <th>結果</th>
            </tr>
          </thead>
          <tbody>
            ${logs.length === 0 ? '<tr><td colspan="5" class="empty-row">送信履歴がありません</td></tr>' : ""}
            ${logs
              .map(
                (l) => `
              <tr>
                <td style="font-size:12px;">${l.sentAt.slice(0, 16).replace("T", " ")}</td>
                <td>${SLACK_EVENT_LABELS[l.eventType as keyof typeof SLACK_EVENT_LABELS] || l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status === "sent" ? "success" : "warning"}">${l.status}</span></td>
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
