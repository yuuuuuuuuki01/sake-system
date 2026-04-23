/**
 * Confirm modal — syusen-cloud
 *
 * Replaces native confirm() with a themed modal.
 *
 * Usage:
 *   const ok = await showConfirm("削除しますか？");
 *   const ok = await showConfirm("このレイアウトを削除しますか？", {
 *     confirmLabel: "削除する",
 *     cancelLabel: "キャンセル",
 *     variant: "danger",
 *   });
 */

export interface ConfirmOptions {
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger";
}

export function showConfirm(
  message: string,
  opts: ConfirmOptions = {}
): Promise<boolean> {
  const {
    title = "確認",
    confirmLabel = "OK",
    cancelLabel = "キャンセル",
    variant = "primary",
  } = opts;

  return new Promise((resolve) => {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop confirm-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");

    backdrop.innerHTML = `
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${variant}">
            ${variant === "danger" ? ICON_DANGER : ICON_INFO}
          </div>
          <h3 class="confirm-title">${escapeHTML(title)}</h3>
          <p class="confirm-message">${escapeHTML(message)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${escapeHTML(cancelLabel)}</button>
          <button class="button ${variant} confirm-ok">${escapeHTML(confirmLabel)}</button>
        </div>
      </div>
    `;

    const close = (result: boolean) => {
      backdrop.classList.add("confirm-exit");
      backdrop.addEventListener("animationend", () => {
        backdrop.remove();
      }, { once: true });
      resolve(result);
    };

    backdrop.querySelector(".confirm-cancel")!.addEventListener("click", () => close(false));
    backdrop.querySelector(".confirm-ok")!.addEventListener("click", () => close(true));

    // close on backdrop click (outside panel)
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close(false);
    });

    // close on Escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.removeEventListener("keydown", onKey);
        close(false);
      }
    };
    document.addEventListener("keydown", onKey);

    document.body.appendChild(backdrop);

    // focus the OK button
    requestAnimationFrame(() => {
      (backdrop.querySelector(".confirm-ok") as HTMLElement)?.focus();
    });
  });
}

const ICON_DANGER = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const ICON_INFO = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

function escapeHTML(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
