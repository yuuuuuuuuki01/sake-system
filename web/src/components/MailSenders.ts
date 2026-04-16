import type { MailSender } from "../api";

export function renderMailSenders(senders: MailSender[], editingId: string | null): string {
  const editing = editingId ? senders.find((s) => s.id === editingId) : null;
  const isNew = editingId === "__new__";

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">メール設定</p>
        <h1>送信元アドレス管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="ms-new">＋ 新規追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>登録済み送信元 (${senders.length}件)</h2>
          <p class="panel-caption">複数のメールアドレスを切り替えて送信できます</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>名前</th>
              <th>メールアドレス</th>
              <th>表示名</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${senders
              .map(
                (s) => `
              <tr>
                <td>
                  ${s.name}
                  ${s.isDefault ? '<span class="status-pill success" style="margin-left:6px;">既定</span>' : ""}
                </td>
                <td class="mono">${s.email}</td>
                <td>${s.displayName ?? "―"}</td>
                <td>
                  ${s.isVerified ? '<span class="status-pill success">✓認証済</span>' : '<span class="status-pill warning">未認証</span>'}
                </td>
                <td>
                  <button class="button-sm secondary" data-action="ms-edit" data-id="${s.id}">編集</button>
                  <button class="button-sm secondary" data-action="ms-delete" data-id="${s.id}" style="color:var(--danger);">削除</button>
                </td>
              </tr>
            `
              )
              .join("")}
            ${senders.length === 0 ? '<tr><td colspan="5" class="empty-row">送信元が未登録です</td></tr>' : ""}
          </tbody>
        </table>
      </div>
    </section>

    ${
      editing || isNew
        ? `
      <section class="panel">
        <div class="panel-header">
          <h2>${isNew ? "新規送信元" : "編集"}: ${editing?.name ?? ""}</h2>
        </div>
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>名前 (識別用)</span>
            <input id="ms-name" type="text" value="${editing?.name ?? ""}" placeholder="営業部" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス</span>
            <input id="ms-email" type="email" value="${editing?.email ?? ""}" placeholder="sales@kaneishuzo.co.jp" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 (差出人名)</span>
            <input id="ms-display-name" type="text" value="${editing?.displayName ?? ""}" placeholder="金井酒造店 営業部" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>返信先 (任意)</span>
            <input id="ms-reply-to" type="email" value="${editing?.replyTo ?? ""}" placeholder="info@kaneishuzo.co.jp" />
          </label>
          <label class="field" style="flex:1 1 100%;">
            <span>署名</span>
            <textarea id="ms-signature" rows="4" placeholder="社名&#10;住所&#10;TEL">${editing?.signature ?? ""}</textarea>
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="ms-default" type="checkbox" ${editing?.isDefault ? "checked" : ""} />
            既定の送信元にする
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="ms-cancel">キャンセル</button>
          <button class="button primary" data-action="ms-save" data-id="${editing?.id ?? ""}">保存</button>
        </div>
        ${
          !editing?.isVerified
            ? `<p class="form-hint" style="margin-top:8px;">⚠️ 未認証のアドレスは送信時にエラーになります。Resendダッシュボードでドメイン認証を行ってください。</p>`
            : ""
        }
      </section>
      `
        : ""
    }
  `;
}
