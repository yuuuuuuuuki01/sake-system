import type { UserProfile, AuditLog, MailSender } from "../api";
import { DEPT_LABELS, ROLE_LABELS } from "../api";

export function renderUserProfile(
  profile: UserProfile | null,
  myLogs: AuditLog[],
  senders: MailSender[]
): string {
  if (!profile) {
    return `
      <section class="page-head"><div><h1>プロフィール</h1></div></section>
      <section class="panel"><p>プロフィール未登録です。ログインしてください。</p></section>
    `;
  }
  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">プロフィール</p>
        <h1>${profile.displayName}</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${profile.isActive ? "success" : "neutral"}">${profile.isActive ? "アクティブ" : "無効"}</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>基本情報</h2></div>
      <dl class="summary-list">
        <div><dt>担当者コード</dt><dd class="mono">${profile.staffCode ?? "―"}</dd></div>
        <div><dt>メールアドレス</dt><dd class="mono">${profile.email}</dd></div>
        <div><dt>部署</dt><dd>${DEPT_LABELS[profile.department]}</dd></div>
        <div><dt>権限</dt><dd>${ROLE_LABELS[profile.role]}</dd></div>
        <div><dt>電話</dt><dd>${profile.phone ?? "―"}</dd></div>
        <div><dt>最終ログイン</dt><dd>${profile.lastSignInAt ?? "―"}</dd></div>
      </dl>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>既定のメール送信元</h2></div>
      <label class="field" style="max-width:400px;">
        <span>送信時に既定で使うアドレス</span>
        <select id="profile-sender">
          <option value="">設定しない</option>
          ${senders
            .map(
              (s) =>
                `<option value="${s.id}" ${profile.defaultMailSenderId === s.id ? "selected" : ""}>${s.name} &lt;${s.email}&gt;</option>`
            )
            .join("")}
        </select>
      </label>
      <div class="action-bar">
        <button class="button primary" data-action="profile-save-sender">保存</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>🔐 パスワード変更</h2></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;">
        <label class="field" style="flex:1 1 200px;">
          <span>新しいパスワード</span>
          <input id="profile-new-password" type="password" placeholder="8文字以上" />
        </label>
        <button class="button secondary" data-action="profile-change-password">変更</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>📋 あなたの最近の操作</h2></div>
      ${
        myLogs.length === 0
          ? '<p class="empty-row">操作履歴がありません</p>'
          : `<div class="table-wrap">
          <table>
            <thead>
              <tr><th>日時</th><th>操作</th><th>対象</th></tr>
            </thead>
            <tbody>
              ${myLogs
                .slice(0, 20)
                .map(
                  (l) => `
                <tr>
                  <td style="font-size:12px;">${l.createdAt.slice(0, 16).replace("T", " ")}</td>
                  <td><strong>${l.action}</strong></td>
                  <td style="font-size:12px;">${l.entityType ?? ""} ${l.entityId ?? ""}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>`
      }
    </section>
  `;
}

export function renderAuditLogs(logs: AuditLog[]): string {
  const byUser: Record<string, number> = {};
  logs.forEach((l) => {
    const u = l.userEmail ?? "(anonymous)";
    byUser[u] = (byUser[u] ?? 0) + 1;
  });

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">監査</p>
        <h1>操作ログ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総操作数</p>
        <p class="kpi-value">${logs.length}</p>
        <p class="kpi-sub">直近100件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">ユーザー数</p>
        <p class="kpi-value">${Object.keys(byUser).length}</p>
        <p class="kpi-sub">操作した人</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>操作履歴</h2>
        <p class="panel-caption">誰が何をいつ変更したか</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>日時</th>
              <th>ユーザー</th>
              <th>操作</th>
              <th>対象</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>
            ${logs.length === 0 ? '<tr><td colspan="5" class="empty-row">ログがありません</td></tr>' : ""}
            ${logs
              .map(
                (l) => `
              <tr>
                <td style="font-size:12px;">${l.createdAt.replace("T", " ").slice(0, 19)}</td>
                <td class="mono" style="font-size:12px;">${l.userEmail ?? "anonymous"}</td>
                <td><strong>${l.action}</strong></td>
                <td>${l.entityType ?? "―"} ${l.entityId ? `<span class="mono" style="font-size:11px;">(${l.entityId})</span>` : ""}</td>
                <td style="font-size:11px;color:var(--text-secondary);max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                  ${l.changes ? JSON.stringify(l.changes).slice(0, 100) : "―"}
                </td>
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
