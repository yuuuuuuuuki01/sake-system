/**
 * Toast notification system — syusen-cloud
 *
 * Usage:
 *   showToast("保存しました");                              // success (default)
 *   showToast("保存に失敗しました", "error");               // error
 *   showToast("確認してください", "warning");               // warning
 *   showToast("同期中です", "info");                        // info
 */

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastEntry {
  id: number;
  message: string;
  type: ToastType;
  el: HTMLElement;
}

const ICONS: Record<ToastType, string> = {
  success: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error:   `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  warning: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>`,
  info:    `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>`,
};

let container: HTMLElement | null = null;
let idCounter = 0;
const stack: ToastEntry[] = [];

function ensureContainer(): HTMLElement {
  if (container && document.body.contains(container)) return container;
  container = document.createElement("div");
  container.className = "toast-container";
  document.body.appendChild(container);
  return container;
}

export function showToast(message: string, type: ToastType = "success", durationMs?: number): void {
  const c = ensureContainer();
  const id = ++idCounter;

  const duration = durationMs ?? (type === "error" ? 5000 : type === "warning" ? 4000 : 3000);

  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.innerHTML = `
    <span class="toast-icon">${ICONS[type]}</span>
    <span class="toast-msg">${escapeHTML(message)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;

  const entry: ToastEntry = { id, message, type, el };
  stack.push(entry);

  c.appendChild(el);

  // trigger enter animation
  requestAnimationFrame(() => {
    el.classList.add("toast-enter");
  });

  const dismiss = () => removeToast(entry);
  el.querySelector(".toast-dismiss")!.addEventListener("click", dismiss);

  setTimeout(() => {
    el.classList.add("toast-exit");
    el.addEventListener("animationend", dismiss, { once: true });
  }, duration);
}

function removeToast(entry: ToastEntry): void {
  const idx = stack.indexOf(entry);
  if (idx === -1) return;
  stack.splice(idx, 1);
  entry.el.remove();
}

function escapeHTML(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
