/**
 * ChatWidget — 右下フローティングのサポートチャットウィジェット
 *
 * ユーザーが使い方の質問や改修依頼を送信できる。
 * 現在のページを自動検出し、どの機能についてかを選択できる。
 * 送信内容は support_tickets テーブルに保存され、
 * 定期的にターミナルから Claude で確認・まとめて対応する運用。
 */
import { supabaseInsert, supabaseQuery } from "../supabase";
import { currentUser } from "../auth";
import { showToast } from "./Toast";
import { FEATURE_SECTIONS, type FeatureEntry } from "./Changelog";

interface SupportTicket {
  id?: string;
  category: string;
  message: string;
  user_email: string;
  status: string;
  page_route?: string;
  feature_id?: string;
  created_at?: string;
  admin_reply?: string | null;
}

type WidgetView = "closed" | "home" | "form" | "history";

let widgetView: WidgetView = "closed";
let selectedCategory = "";
let selectedFeatureId = "";
let messageText = "";
let tickets: SupportTicket[] = [];
let submitting = false;

const CATEGORIES = [
  { id: "usage",   icon: "💬", label: "使い方の質問",   desc: "操作方法や機能について" },
  { id: "request", icon: "🔧", label: "改修・機能要望", desc: "新機能や改善の要望" },
  { id: "bug",     icon: "🐛", label: "不具合の報告",   desc: "動作がおかしい場合" },
  { id: "other",   icon: "📝", label: "その他",         desc: "上記に当てはまらない場合" },
];

/** 現在のルートを取得 */
function getCurrentRoute(): string {
  const hash = location.hash.replace(/^#/, "") || "/";
  return hash.split("?")[0];
}

/** 現在のルートに該当する機能一覧を取得 */
function getFeaturesForRoute(route: string): FeatureEntry[] {
  return FEATURE_SECTIONS.flatMap(s => s.features).filter(f => f.route === route);
}

/** 全機能をセクション付きで取得（ドロップダウン用） */
function getAllFeaturesGrouped(): { section: string; features: FeatureEntry[] }[] {
  return FEATURE_SECTIONS.map(s => ({ section: s.title, features: s.features }));
}

/** 機能IDからラベルを取得 */
function getFeatureLabel(featureId: string): string {
  const f = FEATURE_SECTIONS.flatMap(s => s.features).find(f => f.id === featureId);
  return f ? f.label : "";
}

function getContainer(): HTMLElement {
  let el = document.getElementById("chat-widget-root");
  if (!el) {
    el = document.createElement("div");
    el.id = "chat-widget-root";
    document.body.appendChild(el);
  }
  return el;
}

function renderFeatureSelect(): string {
  const route = getCurrentRoute();
  const currentFeatures = getFeaturesForRoute(route);
  const grouped = getAllFeaturesGrouped();

  // 現在のページの機能を先頭にプリセレクト
  const autoId = currentFeatures.length === 1 ? currentFeatures[0].id : "";
  if (autoId && !selectedFeatureId) selectedFeatureId = autoId;

  const currentOpts = currentFeatures.length > 0
    ? `<optgroup label="📍 現在のページ">${currentFeatures.map(f =>
        `<option value="${f.id}" ${selectedFeatureId === f.id ? "selected" : ""}>${f.label} — ${f.desc}</option>`
      ).join("")}</optgroup>`
    : "";

  const otherOpts = grouped.map(g => {
    const feats = g.features.filter(f => !currentFeatures.some(cf => cf.id === f.id));
    if (feats.length === 0) return "";
    return `<optgroup label="${g.section}">${feats.map(f =>
      `<option value="${f.id}" ${selectedFeatureId === f.id ? "selected" : ""}>${f.label}</option>`
    ).join("")}</optgroup>`;
  }).join("");

  return `
    <select class="cw-select" id="cw-feature-select">
      <option value="">機能を選択してください</option>
      ${currentOpts}
      ${otherOpts}
    </select>`;
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
    // 現在のページ情報
    const route = getCurrentRoute();
    const currentFeatures = getFeaturesForRoute(route);
    const pageLabel = currentFeatures.length > 0
      ? currentFeatures.map(f => f.label).join(" / ")
      : route === "/" ? "ホーム" : route;

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
        <div class="cw-guide">
          <p class="cw-guide-title">このチャットでできること</p>
          <ul class="cw-guide-list">
            <li>画面の使い方がわからない時に質問できます</li>
            <li>「こうしてほしい」という改修要望を出せます</li>
            <li>不具合を見つけた場合の報告もこちらから</li>
          </ul>
          <p class="cw-guide-note">今いるページを自動で検出するので、気になった時にすぐ送れます。</p>
        </div>
        <div class="cw-current-page">
          <span class="cw-page-pin">📍</span>
          <span class="cw-page-label">現在のページ: ${escapeHTML(pageLabel)}</span>
        </div>
        <p class="cw-subtitle">どのようなご用件ですか？</p>
        <div class="cw-categories">${categoryCards}</div>
        <button class="cw-history-link" id="cw-show-history">過去の問い合わせを見る</button>
      </div>`;
  }

  if (widgetView === "form") {
    const catLabel = CATEGORIES.find(c => c.id === selectedCategory)?.label ?? "";
    const featureSelect = renderFeatureSelect();

    body = `
      <div class="cw-form">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-form-cat">${catLabel}</p>
        <label class="cw-label">対象の機能</label>
        ${featureSelect}
        <label class="cw-label">内容</label>
        <textarea class="cw-textarea" id="cw-message" rows="5"
          placeholder="具体的にどこをどうしたいか教えてください…">${messageText}</textarea>
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
          const featureLabel = t.feature_id ? getFeatureLabel(t.feature_id) : "";
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
              ${featureLabel ? `<span class="cw-ticket-feature">📍 ${escapeHTML(featureLabel)}</span>` : ""}
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
    selectedFeatureId = "";
    widgetView = "home";
    refresh();
  });

  // Close
  root.querySelector("#cw-close")?.addEventListener("click", () => {
    widgetView = "closed";
    messageText = "";
    selectedFeatureId = "";
    refresh();
  });

  // Category cards
  root.querySelectorAll<HTMLButtonElement>("[data-cw-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.cwCat ?? "";
      messageText = "";
      // 現在のページの機能が1つだけなら自動選択
      const route = getCurrentRoute();
      const feats = getFeaturesForRoute(route);
      selectedFeatureId = feats.length === 1 ? feats[0].id : "";
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

  // Feature select
  root.querySelector<HTMLSelectElement>("#cw-feature-select")?.addEventListener("change", (e) => {
    selectedFeatureId = (e.target as HTMLSelectElement).value;
  });

  // Textarea sync
  root.querySelector<HTMLTextAreaElement>("#cw-message")?.addEventListener("input", (e) => {
    messageText = (e.target as HTMLTextAreaElement).value;
  });

  // Submit
  root.querySelector("#cw-submit")?.addEventListener("click", async () => {
    if (!messageText.trim() || submitting) return;

    submitting = true;
    refresh();

    const route = getCurrentRoute();
    const result = await supabaseInsert<SupportTicket>("support_tickets", {
      category: selectedCategory,
      message: messageText.trim(),
      user_email: getUserEmail(),
      status: "open",
      page_route: route,
      feature_id: selectedFeatureId || null,
    });

    submitting = false;

    if (result) {
      showToast("送信しました。ありがとうございます！");
      messageText = "";
      selectedCategory = "";
      selectedFeatureId = "";
      widgetView = "home";
    } else {
      showToast("送信に失敗しました", "error");
    }
    refresh();
  });

  // History
  root.querySelector("#cw-show-history")?.addEventListener("click", async () => {
    tickets = await supabaseQuery<SupportTicket>("support_tickets", {
      user_email: `eq.${getUserEmail()}`,
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

function getUserEmail(): string {
  return currentUser()?.email ?? "anonymous";
}

/** main.ts の renderApp() 後に呼ぶ */
export function initChatWidget(): void {
  if (initialized && document.getElementById("chat-widget-root")) return;
  initialized = true;
  refresh();
}
