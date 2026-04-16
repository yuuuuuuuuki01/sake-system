export interface TourInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  visitDate: string;
  partySize: number;
  language: "ja" | "en" | "zh" | "ko";
  purpose: string;
  message: string;
  status: "new" | "replied" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  repliedAt?: string;
  confirmedTime?: string;
}

const STATUS_LABELS: Record<TourInquiry["status"], string> = {
  new: "新規",
  replied: "返信済",
  confirmed: "確定",
  completed: "来訪済",
  cancelled: "キャンセル"
};

const STATUS_CLASS: Record<TourInquiry["status"], string> = {
  new: "warning",
  replied: "neutral",
  confirmed: "success",
  completed: "success",
  cancelled: "neutral"
};

const LANG_LABELS: Record<TourInquiry["language"], string> = {
  ja: "🇯🇵 日本語",
  en: "🇬🇧 English",
  zh: "🇨🇳 中文",
  ko: "🇰🇷 한국어"
};

export function renderBreweryTour(inquiries: TourInquiry[], activeId: string | null): string {
  const active = inquiries.find((i) => i.id === activeId) ?? inquiries[0];
  const newCount = inquiries.filter((i) => i.status === "new").length;
  const confirmedCount = inquiries.filter((i) => i.status === "confirmed").length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">酒蔵見学</p>
        <h1>見学お問い合わせ管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="tour-show-form">🔗 公開フォームを見る</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card ${newCount > 0 ? "kpi-alert" : ""}">
        <p class="panel-title">未対応</p>
        <p class="kpi-value">${newCount}件</p>
        <p class="kpi-sub">返信待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">確定済</p>
        <p class="kpi-value">${confirmedCount}件</p>
        <p class="kpi-sub">訪問予定</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">累計</p>
        <p class="kpi-value">${inquiries.length}件</p>
        <p class="kpi-sub">総問合せ</p>
      </article>
    </section>

    <div class="tour-layout">
      <!-- 左: 一覧 -->
      <div class="panel">
        <div class="panel-header">
          <h2>お問い合わせ一覧</h2>
        </div>
        <div class="tour-list">
          ${inquiries
            .map(
              (i) => `
            <button class="tour-item ${active?.id === i.id ? "active" : ""}" data-tour-id="${i.id}">
              <div class="tour-item-head">
                <strong>${i.name}</strong>
                <span class="status-pill ${STATUS_CLASS[i.status]}">${STATUS_LABELS[i.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${LANG_LABELS[i.language]} · 👥 ${i.partySize}名
              </div>
              <div class="tour-item-sub">📅 希望日: ${i.visitDate}</div>
            </button>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- 右: 詳細と返信 -->
      <div class="panel">
        ${
          active
            ? `
          <div class="panel-header">
            <div>
              <h2>${active.name} 様</h2>
              <p class="panel-caption">受付日: ${active.createdAt.slice(0, 10)}</p>
            </div>
            <span class="status-pill ${STATUS_CLASS[active.status]}">${STATUS_LABELS[active.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${active.email}${active.phone ? ` / ${active.phone}` : ""}</dd></div>
            <div><dt>希望日</dt><dd>${active.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${active.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${LANG_LABELS[active.language]}</dd></div>
            <div><dt>目的</dt><dd>${active.purpose}</dd></div>
            <div><dt>メッセージ</dt><dd style="white-space:pre-wrap;">${active.message}</dd></div>
          </dl>

          <hr style="margin:16px 0;" />

          <h3 style="margin-top:0;">✉️ 返信</h3>
          <label class="field">
            <span>確定日時</span>
            <input type="datetime-local" id="tour-confirmed-time" value="${active.confirmedTime ?? ""}" />
          </label>
          <label class="field">
            <span>返信文面</span>
            <textarea id="tour-reply-body" rows="8" placeholder="ご予約ありがとうございます。..."></textarea>
          </label>
          <div class="action-bar">
            <button class="button secondary" data-action="tour-insert-template" data-template="confirm">📝 確定テンプレ</button>
            <button class="button secondary" data-action="tour-insert-template" data-template="decline">📝 お断りテンプレ</button>
            <button class="button primary" data-action="tour-send-reply" data-tour-id="${active.id}">送信 + 確定</button>
          </div>
        `
            : '<p class="empty-row">お問い合わせがありません</p>'
        }
      </div>
    </div>

    <section class="panel">
      <div class="panel-header">
        <h2>🔗 公開フォームの埋め込み</h2>
      </div>
      <p>自社サイトに以下のHTMLを貼り付けると、お問い合わせフォームが設置できます:</p>
      <pre class="code-block"><code>&lt;iframe src="https://yuuuuuuuuki01.github.io/sake-system/tour-form"
  width="100%" height="600" frameborder="0"&gt;&lt;/iframe&gt;</code></pre>
      <p class="form-hint">送信された問合せは自動的にこの画面に表示されます。</p>
    </section>
  `;
}

export const TOUR_TEMPLATE_CONFIRM = `{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`;

export const TOUR_TEMPLATE_DECLINE = `{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;
