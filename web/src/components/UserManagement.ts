import type { UserProfile } from "../api";
import { DEPT_LABELS, ROLE_LABELS } from "../api";

export function renderUserManagement(
  users: UserProfile[],
  editingId: string | null,
  currentUser: UserProfile | null
): string {
  const editing = editingId === "__new__" ? null : users.find((u) => u.id === editingId);
  const isNew = editingId === "__new__";
  const isAdmin = currentUser?.role === "admin";

  if (!isAdmin) {
    return `
      <section class="page-head">
        <div><p class="eyebrow">ユーザー管理</p><h1>アクセス権限がありません</h1></div>
      </section>
      <section class="panel">
        <p>この画面は管理者のみ利用できます。</p>
      </section>
    `;
  }

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">ユーザー管理</p>
        <h1>担当者アカウント</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="user-new">＋ 新規ユーザー</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">登録ユーザー</p>
        <p class="kpi-value">${users.length}名</p>
        <p class="kpi-sub">有効 ${users.filter((u) => u.isActive).length}名</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">管理者</p>
        <p class="kpi-value">${users.filter((u) => u.role === "admin").length}名</p>
        <p class="kpi-sub">全権アクセス</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">部署数</p>
        <p class="kpi-value">${new Set(users.map((u) => u.department)).size}</p>
        <p class="kpi-sub">営業/蔵/管理</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>登録済みユーザー</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>担当者CD</th>
              <th>名前</th>
              <th>メール</th>
              <th>部署</th>
              <th>権限</th>
              <th>最終ログイン</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${users
              .map(
                (u) => `
              <tr ${!u.isActive ? 'style="opacity:0.5;"' : ""}>
                <td class="mono">${u.staffCode ?? "―"}</td>
                <td><strong>${u.displayName}</strong>${u.id === currentUser?.id ? '<span style="color:var(--primary);font-size:11px;"> (あなた)</span>' : ""}</td>
                <td class="mono" style="font-size:12px;">${u.email}</td>
                <td>${DEPT_LABELS[u.department]}</td>
                <td>${ROLE_LABELS[u.role]}</td>
                <td style="font-size:12px;">${u.lastSignInAt ? u.lastSignInAt.slice(0, 16).replace("T", " ") : "―"}</td>
                <td>${u.isActive ? '<span class="status-pill success">有効</span>' : '<span class="status-pill neutral">無効</span>'}</td>
                <td>
                  <button class="button-sm secondary" data-action="user-edit" data-id="${u.id}">編集</button>
                  ${u.id !== currentUser?.id ? `<button class="button-sm secondary" data-action="user-delete" data-id="${u.id}" style="color:var(--danger);">削除</button>` : ""}
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
      editing || isNew
        ? `
      <section class="panel">
        <div class="panel-header">
          <h2>${isNew ? "新規ユーザー" : `${editing?.displayName} 編集`}</h2>
        </div>
        ${
          isNew
            ? '<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>'
            : ""
        }
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${editing?.displayName ?? ""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${editing?.email ?? ""}" placeholder="taro@kaneishuzo.co.jp" ${editing ? "readonly" : ""} />
          </label>
          ${
            isNew
              ? `<label class="field" style="flex:1 1 200px;">
                  <span>初期パスワード *</span>
                  <input id="user-password" type="password" placeholder="8文字以上" />
                </label>`
              : ""
          }
          <label class="field" style="flex:1 1 120px;">
            <span>担当者コード</span>
            <input id="user-code" type="text" value="${editing?.staffCode ?? ""}" placeholder="S001" />
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>部署</span>
            <select id="user-dept">
              ${Object.entries(DEPT_LABELS)
                .map(([k, v]) => `<option value="${k}" ${editing?.department === k ? "selected" : ""}>${v}</option>`)
                .join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(ROLE_LABELS)
                .map(([k, v]) => `<option value="${k}" ${editing?.role === k ? "selected" : ""}>${v}</option>`)
                .join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 160px;">
            <span>電話</span>
            <input id="user-phone" type="tel" value="${editing?.phone ?? ""}" placeholder="090-1234-5678" />
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="user-active" type="checkbox" ${editing?.isActive !== false ? "checked" : ""} />
            有効
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="user-cancel">キャンセル</button>
          <button class="button primary" data-action="user-save" data-id="${editing?.id ?? ""}">保存</button>
        </div>
      </section>
    `
        : ""
    }

    <section class="panel">
      <div class="panel-header">
        <h2>🔐 権限レベル</h2>
      </div>
      <div class="summary-list">
        <div><dt>👑 管理者 (admin)</dt><dd>全機能アクセス、ユーザー管理、連携設定、監査ログ閲覧</dd></div>
        <div><dt>📋 マネージャー (manager)</dt><dd>営業・蔵内・仕入・税務の管理業務、帳票印刷、メール配信</dd></div>
        <div><dt>👤 スタッフ (staff)</dt><dd>伝票入力・受注処理・モバイル受注・自分の担当範囲のみ</dd></div>
      </div>
    </section>
  `;
}
