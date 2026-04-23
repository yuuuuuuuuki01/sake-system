type CategoryKey = "sales" | "brewery" | "purchase" | "crm" | "more" | "settings";

interface CategoryCard {
  title: string;
  description: string;
  path: string;
}

const CATEGORY_CARDS: Record<CategoryKey, CategoryCard[]> = {
  sales: [
    { title: "伝票入力", description: "受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。", path: "/invoice-entry" },
    { title: "納品書", description: "伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。", path: "/delivery" },
    { title: "月次請求", description: "請求締め処理と請求先別の請求残高を月単位でまとめて確認します。", path: "/billing" },
    { title: "集計帳票", description: "売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。", path: "/report" },
    { title: "伝票照会", description: "期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。", path: "/invoice" },
    { title: "得意先台帳", description: "得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。", path: "/ledger" }
  ],
  brewery: [
    { title: "仕込管理", description: "仕込番号ごとの進捗と原料投入状況を時系列で把握します。", path: "/jikomi" },
    { title: "タンク管理", description: "タンクごとの使用状況と充填率を一覧で確認できます。", path: "/tanks" },
    { title: "検定管理", description: "検定予定と実績をまとめて確認し、出荷判定に備えます。", path: "/kentei" },
    { title: "資材管理", description: "瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。", path: "/materials" },
    { title: "需要・生産計画", description: "月次売上実績から安全在庫を算出し、必要生産数を計画します。", path: "/demand" }
  ],
  purchase: [
    { title: "仕入・買掛", description: "仕入伝票と買掛残高を照合し、支払予定を見通せます。", path: "/purchase" },
    { title: "手形・原料", description: "原料在庫と手形情報を同時に確認し、仕入計画を調整します。", path: "/raw-material" }
  ],
  crm: [
    { title: "新規営業", description: "見込客をカンバンで管理。パイプライン金額、確度、活動履歴。", path: "/prospects" },
    { title: "リスト取得ツール", description: "Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。", path: "/list-builder" },
    { title: "通話履歴 (IVRy)", description: "IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。", path: "/calls" },
    { title: "取引先マップ", description: "取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。", path: "/map" },
    { title: "メール配信", description: "季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。", path: "/email" },
    { title: "メール送信元管理", description: "複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。", path: "/mail-senders" },
    { title: "受注ワークフロー", description: "新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。", path: "/workflow" },
    { title: "モバイル受注", description: "ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。", path: "/mobile-order" },
    { title: "Shopify注文", description: "Shopifyストアの注文を自動同期。EC売上を一元管理。", path: "/shopify" },
    { title: "FAX OCR", description: "FAX受信画像をOCRしてテキスト化。伝票自動起票。", path: "/fax" }
  ],
  more: [
    { title: "酒税申告", description: "対象月の酒税見込と必要な集計値を確認して申告準備を進めます。", path: "/tax" },
    { title: "店舗POS", description: "直売所の売上と受注を確認し、当日の販売状況を把握します。", path: "/store" },
    { title: "売上分析", description: "商品別・得意先別の売上分析から傾向を把握し、販促に活用します。", path: "/analytics" },
    { title: "マスタ", description: "得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。", path: "/master" },
    { title: "カレンダー", description: "納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。", path: "/calendar" },
    { title: "酒蔵見学管理", description: "見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。", path: "/tour" },
    { title: "印刷センター", description: "チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。", path: "/print" },
    { title: "帳票デザイナー", description: "BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。", path: "/form-designer" }
  ],
  settings: [
    { title: "連動設定", description: "WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。", path: "/setup" },
    { title: "外部連携設定", description: "Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。", path: "/integrations" },
    { title: "Slack通知", description: "受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。", path: "/slack" },
    { title: "CSV/Excelインポート", description: "Excelで作成したマスタデータをアップロードして一括登録できます。", path: "/import" },
    { title: "データブラウザ", description: "テーブル単位で生データを閲覧し、連動状況を確認します。", path: "/raw-browser" },
    { title: "ユーザー管理", description: "担当者のアカウント・権限・部署を管理 (管理者専用)。", path: "/users" },
    { title: "プロフィール", description: "自分のアカウント情報・パスワード変更・既定の送信元メール。", path: "/profile" },
    { title: "操作ログ", description: "全ユーザーの操作履歴 (監査証跡)。", path: "/audit" }
  ]
};

const CATEGORY_TITLES: Record<CategoryKey, { eyebrow: string; title: string; description: string }> = {
  sales: {
    eyebrow: "販売管理トップ",
    title: "販売系メニュー",
    description: "受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"
  },
  brewery: {
    eyebrow: "蔵内管理トップ",
    title: "蔵内オペレーション",
    description: "仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"
  },
  purchase: {
    eyebrow: "仕入管理トップ",
    title: "仕入・原料管理",
    description: "買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"
  },
  crm: {
    eyebrow: "営業・CRM",
    title: "営業・顧客管理",
    description: "新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"
  },
  more: {
    eyebrow: "業務ツール",
    title: "業務ツール",
    description: "酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"
  },
  settings: {
    eyebrow: "設定",
    title: "システム設定",
    description: "連携、通知、ユーザー管理など環境設定をまとめています。"
  }
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderCategoryHome(category: CategoryKey): string {
  const meta = CATEGORY_TITLES[category];
  const cards = CATEGORY_CARDS[category]
    .map(
      (card) => `
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${escapeHtml(card.title)}</p>
            <p class="category-card-description">${escapeHtml(card.description)}</p>
          </div>
          <div class="category-card-actions">
            <button class="button secondary" type="button" data-link="${card.path}">
              開く →
            </button>
          </div>
        </article>
      `
    )
    .join("");

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">${meta.eyebrow}</p>
        <h1>${meta.title}</h1>
        <p class="meta-note">${meta.description}</p>
      </div>
    </section>

    <section class="category-grid">
      ${cards}
    </section>
  `;
}
