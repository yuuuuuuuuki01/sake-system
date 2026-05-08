/**
 * ChatWidget — 右下フローティングのサポートチャットウィジェット
 *
 * ユーザーが使い方の質問や改修依頼を送信できる。
 * 送信内容は support_tickets テーブルに保存され、
 * 定期的にターミナルから Claude で確認・まとめて対応する運用。
 */
import { supabaseInsert, supabaseQuery } from "../supabase";
import { currentUser } from "../auth";
import { showToast } from "./Toast";

interface SupportTicket {
  id?: string;
  category: string;
  message: string;
  user_email: string;
  status: string;
  created_at?: string;
  admin_reply?: string | null;
}

type WidgetView = "closed" | "home" | "form" | "history";

let widgetView: WidgetView = "closed";
let selectedCategory = "";
let messageText = "";
let tickets: SupportTicket[] = [];
let submitting = false;

const CATEGORIES = [
  { id: "usage",   icon: "💬", label: "使い方の質問",   desc: "操作方法や機能について" },
  { id: "request", icon: "🔧", label: "改修・機能要望", desc: "新機能や改善の要望" },
  { id: "bug",     icon: "🐛", label: "不具合の報告",   desc: "動作がおかしい場合" },
  { id: "other",   icon: "📝", label: "その他",         desc: "上記に当てはまらない場合" },
];

function getContainer(): HTMLElement {
  let el = document.getElementById("chat-widget-root");
  if (!el) {
    el = document.createElement("div");
    el.id = "chat-widget-root";
    document.body.appendChild(el);
  }
  return el;
}

function renderWidget(): string {
  if (widgetView === "closed") {
    return `
      <button class="cw-fab" id="cw-fab" aria-label="サポート">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </button>`;
  }

  let body = "";

  if (widgetView === "home") {
    const categoryCards = CATEGORIES.map(c => `
      <button class="cw-category-card" data-cw-cat="${c.id}">
        <span class="cw-cat-icon">${c.icon}</span>
        <div>
          <span class="cw-cat-label">${c.label}</span>
          <span class="cw-cat-desc">${c.desc}</span>
        </div>
      </button>
    `).join("");

    body = `
      <div class="cw-home">
        <p class="cw-subtitle">どのようなご用件ですか？</p>
        <div class="cw-categories">${categoryCards}</div>
        <button class="cw-history-link" id="cw-show-history">過去の問い合わせを見る</button>
      </div>`;
  }

  if (widgetView === "form") {
    const catLabel = CATEGORIES.find(c => c.id === selectedCategory)?.label ?? "";
    body = `
      <div class="cw-form">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-form-cat">${catLabel}</p>
        <textarea class="cw-textarea" id="cw-message" rows="5"
          placeholder="内容を入力してください…">${messageText}</textarea>
        <button class="cw-submit button primary" id="cw-submit"
          ${submitting ? "disabled" : ""}>
          ${submitting ? "送信中…" : "送信する"}
        </button>
      </div>`;
  }

  if (widgetView === "history") {
    const items = tickets.length === 0
      ? `<p class="cw-empty">まだ問い合わせはありません</p>`
      : tickets.map(t => {
          const cat = CATEGORIES.find(c => c.id === t.category);
          const date = t.created_at
            ? new Date(t.created_at).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
            : "";
          const statusLabel = t.status === "open" ? "受付中" : t.status === "in_progress" ? "対応中" : "完了";
          const statusClass = t.status === "open" ? "open" : t.status === "in_progress" ? "progress" : "done";
          return `
            <div class="cw-ticket">
              <div class="cw-ticket-head">
                <span class="cw-ticket-cat">${cat?.icon ?? ""} ${cat?.label ?? t.category}</span>
                <span class="cw-ticket-status ${statusClass}">${statusLabel}</span>
              </div>
              <p class="cw-ticket-msg">${escapeHTML(t.message)}</p>
              ${t.admin_reply ? `<div class="cw-ticket-reply"><strong>回答:</strong> ${escapeHTML(t.admin_reply)}</div>` : ""}
              <span class="cw-ticket-date">${date}</span>
            </div>`;
        }).join("");

    body = `
      <div class="cw-history">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-subtitle">過去の問い合わせ</p>
        <div class="cw-ticket-list">${items}</div>
      </div>`;
  }

  return `
    <div class="cw-panel">
      <div class="cw-header">
        <span class="cw-header-title">サポート</span>
        <button class="cw-close" id="cw-close" aria-label="閉じる">&times;</button>
      </div>
      <div class="cw-body">${body}</div>
    </div>`;
}

function bindWidgetEvents(): void {
  const root = getContainer();

  // FAB
  root.querySelector("#cw-fab")?.addEventListener("click", () => {
    widgetView = "home";
    refresh();
  });

  // Close
  root.querySelector("#cw-close")?.addEventListener("click", () => {
    widgetView = "closed";
    messageText = "";
    refresh();
  });

  // Category cards
  root.querySelectorAll<HTMLButtonElement>("[data-cw-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.cwCat ?? "";
      messageText = "";
      widgetView = "form";
      refresh();
      root.querySelector<HTMLTextAreaElement>("#cw-message")?.focus();
    });
  });

  // Back
  root.querySelector("#cw-back-home")?.addEventListener("click", () => {
    widgetView = "home";
    refresh();
  });

  // Textarea sync
  root.querySelector<HTMLTextAreaElement>("#cw-message")?.addEventListener("input", (e) => {
    messageText = (e.target as HTMLTextAreaElement).value;
  });

  // Submit
  root.querySelector("#cw-submit")?.addEventListener("click", async () => {
    if (!messageText.trim() || submitting) return;

    const user = currentUser();
    if (!user) {
      showToast("ログインが必要です", "error");
      return;
    }

    submitting = true;
    refresh();

    const result = await supabaseInsert<SupportTicket>("support_tickets", {
      category: selectedCategory,
      message: messageText.trim(),
      user_email: user.email,
      status: "open",
    });

    submitting = false;

    if (result) {
      showToast("送信しました。ありがとうございます！");
      messageText = "";
      selectedCategory = "";
      widgetView = "home";
    } else {
      showToast("送信に失敗しました", "error");
    }
    refresh();
  });

  // History
  root.querySelector("#cw-show-history")?.addEventListener("click", async () => {
    const user = currentUser();
    if (!user) return;
    tickets = await supabaseQuery<SupportTicket>("support_tickets", {
      user_email: `eq.${user.email}`,
      order: "created_at.desc",
      limit: "20",
    });
    widgetView = "history";
    refresh();
  });
}

function refresh(): void {
  const root = getContainer();
  root.innerHTML = renderWidget();
  bindWidgetEvents();
}

function escapeHTML(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let initialized = false;

/** main.ts の renderApp() 後に呼ぶ */
export function initChatWidget(): void {
  // ログイン画面では表示しない
  const user = currentUser();
  if (!user) {
    // ログアウト時はウィジェットを除去
    const existing = document.getElementById("chat-widget-root");
    if (existing) { existing.remove(); initialized = false; }
    return;
  }
  // 既に初期化済みなら何もしない
  if (initialized && document.getElementById("chat-widget-root")) return;
  initialized = true;
  refresh();
}
