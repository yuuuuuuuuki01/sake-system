export interface QuoteCompanySettings {
  companyName: string;
  companyPostal: string;
  companyAddress1: string;
  companyAddress2: string;
  companyTel: string;
  companyFax: string;
  companyEmail: string;
  companyRegistrationNo: string;
  billingName: string;
  billingPostal: string;
  billingAddress: string;
  defaultPaymentTerms: string;
  defaultHeaderNote: string;
  defaultFooterNote: string;
  sealImageDataUrl: string;
  sealSize: number;
  accentColor: string;
}

export const QUOTE_SETTINGS_KEY = "kanei-quote-settings";

export const COLOR_PRESETS = [
  { label: "青（標準）", value: "#0968e5" },
  { label: "紺",         value: "#1e3a8a" },
  { label: "藍",         value: "#1d4ed8" },
  { label: "緑",         value: "#15803d" },
  { label: "金",         value: "#b45309" },
  { label: "朱",         value: "#c2410c" },
  { label: "ワイン",     value: "#881337" },
  { label: "墨",         value: "#1f2937" },
];

export const defaultCompanySettings: QuoteCompanySettings = {
  companyName: "金井酒造店",
  companyPostal: "257-0014",
  companyAddress1: "神奈川県秦野市堀山下182",
  companyAddress2: "",
  companyTel: "0463-88-1511",
  companyFax: "0463-88-5885",
  companyEmail: "info@kaneishuzo.co.jp",
  companyRegistrationNo: "T1234567890123",
  billingName: "株式会社金井酒造",
  billingPostal: "257-0014",
  billingAddress: "神奈川県秦野市堀山下182",
  defaultPaymentTerms: "月末締め翌月末払い",
  defaultHeaderNote: "下記のとおりお見積り申し上げます。",
  defaultFooterNote: "",
  sealImageDataUrl: "",
  sealSize: 72,
  accentColor: "#0968e5",
};

export function loadQuoteSettings(): QuoteCompanySettings {
  try {
    const raw = localStorage.getItem(QUOTE_SETTINGS_KEY);
    if (raw) return { ...defaultCompanySettings, ...JSON.parse(raw) };
  } catch {}
  // Migrate old seal setting
  try {
    const oldSeal = localStorage.getItem("quote-seal");
    if (oldSeal) {
      const parsed = JSON.parse(oldSeal);
      return { ...defaultCompanySettings, sealImageDataUrl: parsed.imageDataUrl ?? "", sealSize: parsed.size ?? 72 };
    }
  } catch {}
  return { ...defaultCompanySettings };
}

export function saveQuoteSettings(s: QuoteCompanySettings): void {
  localStorage.setItem(QUOTE_SETTINGS_KEY, JSON.stringify(s));
}

function esc(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function field(id: string, label: string, value: string, type = "text", placeholder = ""): string {
  return `<div class="form-row"><label>${label}</label><input type="${type}" id="${id}" value="${esc(value)}" placeholder="${esc(placeholder)}" /></div>`;
}

export function renderQuoteSettings(s: QuoteCompanySettings): string {
  return `
    <section class="page-head">
      <div><p class="eyebrow">見積書</p><h1>会社・請求先設定</h1></div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote-settings">保存</button>
        <a class="button secondary" href="/quote" data-link="/quote">← 見積一覧</a>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>発行元（自社情報）</h2></div>
      <div class="form-grid-2">
        ${field("qs-company-name", "会社名", s.companyName)}
        ${field("qs-company-postal", "郵便番号", s.companyPostal, "text", "257-0014")}
        ${field("qs-company-addr1", "住所1", s.companyAddress1)}
        ${field("qs-company-addr2", "住所2", s.companyAddress2, "text", "建物名等")}
        ${field("qs-company-tel", "電話番号", s.companyTel)}
        ${field("qs-company-fax", "FAX番号", s.companyFax)}
        ${field("qs-company-email", "メール", s.companyEmail, "email")}
        ${field("qs-company-regno", "適格請求書番号", s.companyRegistrationNo, "text", "T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>請求書送付先</h2></div>
      <div class="form-grid-2">
        ${field("qs-billing-name", "宛名", s.billingName)}
        ${field("qs-billing-postal", "郵便番号", s.billingPostal)}
        ${field("qs-billing-address", "住所", s.billingAddress)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${field("qs-payment-terms", "支払条件", s.defaultPaymentTerms, "text", "月末締め翌月末払い")}
        ${field("qs-header-note", "書類上部メモ", s.defaultHeaderNote, "text", "下記のとおりお見積り申し上げます。")}
        ${field("qs-footer-note", "書類下部メモ", s.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${COLOR_PRESETS.map(p => `
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${esc(p.value)}"
            title="${esc(p.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${s.accentColor === p.value ? "#333" : "transparent"};background:${esc(p.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${esc(s.accentColor || "#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${esc(s.accentColor || "#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${esc(s.accentColor || "#0968e5")}</code>
        </span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>社印</h2></div>
      <div class="quote-seal-area">
        ${s.sealImageDataUrl ? `
          <div class="quote-seal-preview">
            <img src="${s.sealImageDataUrl}" alt="社印" style="width:${s.sealSize}px;height:${s.sealSize}px;border-radius:50%;" />
          </div>
          <div class="quote-seal-controls">
            <label>サイズ: <input type="range" id="qs-seal-size" min="40" max="120" value="${s.sealSize}" style="width:120px;" /> ${s.sealSize}px</label>
            <button class="button secondary small" type="button" data-action="remove-company-seal">削除</button>
          </div>
        ` : `<p style="color:var(--text-secondary);font-size:13px;">社印画像（PNG推奨・透過背景）をアップロードしてください。</p>`}
        <div class="quote-seal-upload" style="margin-top:8px;">
          <label class="button secondary" style="cursor:pointer;">
            画像を選択
            <input type="file" id="qs-seal-file" accept="image/png,image/jpeg,image/gif" style="display:none;" />
          </label>
        </div>
      </div>
    </section>
  `;
}
