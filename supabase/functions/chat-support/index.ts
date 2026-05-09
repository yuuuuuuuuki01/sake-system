import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
const GITHUB_RAW = "https://raw.githubusercontent.com/yuuuuuuuuki01/sake-system/main/web/src";

// ルート → コンポーネントファイル名のマッピング
const ROUTE_TO_COMPONENT: Record<string, string[]> = {
  "/":                   ["components/Dashboard.ts"],
  "/invoice-entry":      ["components/InvoiceEntry.ts"],
  "/invoice":            ["components/InvoiceSearch.ts"],
  "/delivery":           ["components/DeliveryNote.ts"],
  "/billing":            ["components/Billing.ts"],
  "/ledger":             ["components/CustomerLedger.ts"],
  "/quote":              ["components/QuoteBuilder.ts", "components/QuoteList.ts"],
  "/shipment-calendar":  ["components/ShipmentCalendar.ts"],
  "/analytics":          ["components/SalesAnalytics.ts"],
  "/customer-analysis":  ["components/CustomerAnalysis.ts"],
  "/product-power":      ["components/BusinessIntelligence.ts"],
  "/customer-efficiency":["components/BusinessIntelligence.ts"],
  "/report":             ["components/SalesReport.ts"],
  "/sales":              ["components/SalesTable.ts"],
  "/churn-alert":        ["components/ChurnAlert.ts"],
  "/visit-planner":      ["components/VisitPlanner.ts"],
  "/map":                ["components/CustomerMap.ts"],
  "/prospects":          ["components/Prospects.ts"],
  "/email":              ["components/EmailBroadcast.ts"],
  "/seasonal-calendar":  ["components/SeasonalCalendar.ts"],
  "/workflow":           ["components/OrderWorkflow.ts"],
  "/shopify":            ["components/ShopifyOrders.ts"],
  "/purchase":           ["components/Purchase.ts"],
  "/payment":            ["components/PaymentStatus.ts"],
  "/jikomi":             ["components/Jikomi.ts"],
  "/tanks":              ["components/TankList.ts"],
  "/tax":                ["components/TaxDeclaration.ts"],
  "/demand":             ["components/DemandPlanning.ts"],
  "/brewing-plan":       ["components/BrewingPlan.ts"],
  "/procurement":        ["components/Procurement.ts"],
  "/brewing-process":    ["components/BrewingProcess.ts"],
  "/master":             ["components/MasterStats.ts"],
  "/store":              ["components/StorePOS.ts"],
  "/tour":               ["components/BreweryTour.ts"],
  "/setup":              ["components/RelaySetup.ts"],
  "/import":             ["components/DataImport.ts"],
  "/users":              ["components/UserManagement.ts"],
  "/calendar":           ["components/Calendar.ts"],
  "/calls":              ["components/CallLogs.ts"],
  "/form-designer":      ["components/FormDesigner.ts"],
  "/print":              ["components/PrintCenter.ts"],
};

/** GitHub raw からコンポーネントソースを取得（キャッシュ付き） */
const sourceCache = new Map<string, { text: string; at: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10分

async function fetchComponentSource(page: string): Promise<string> {
  const files = ROUTE_TO_COMPONENT[page];
  if (!files || files.length === 0) return "";

  const parts: string[] = [];
  for (const file of files) {
    const cached = sourceCache.get(file);
    if (cached && Date.now() - cached.at < CACHE_TTL) {
      parts.push(cached.text);
      continue;
    }
    try {
      const resp = await fetch(`${GITHUB_RAW}/${file}`);
      if (!resp.ok) continue;
      const text = await resp.text();
      sourceCache.set(file, { text, at: Date.now() });
      parts.push(text);
    } catch {
      // fetch失敗時はスキップ
    }
  }
  return parts.join("\n\n// ─── 次のファイル ───\n\n");
}

const SYSTEM_PROMPT = `あなたは「酒仙iクラウド」のサポートアシスタントです。
金井酒造店の業務管理システムについて、ユーザーからの質問に日本語で簡潔に答えてください。

## システム概要
酒仙iクラウドは酒造メーカー向けの業務管理システムです。販売・製造・分析の機能があります。
Vanilla TypeScript + Vite のSPAで、Supabase をバックエンドに使っています。

## 回答のルール
- ユーザーから提供されたコンポーネントのソースコードを読み、画面のボタン・入力欄・テーブル等のUI要素を把握した上で回答してください
- 「このボタンを押す」「この欄に入力する」など、具体的な操作手順で案内してください
- ソースコードの renderXxx() 関数が返すHTMLを読めば、画面にどんなUI要素があるかわかります
- 簡潔に答えてください（3〜8文程度）
- コードの内容そのものを見せる必要はありません。ユーザーにとっての操作手順に翻訳してください
- わからないことは「開発チームに確認します」と答えてください`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { message, feature, page } = await req.json();
    if (!message || typeof message !== "string") {
      return Response.json({ error: "message is required" }, { status: 400 });
    }

    // 該当ページのコンポーネントソースを取得
    const componentSource = await fetchComponentSource(page ?? "/");

    const context = [
      feature ? `対象機能: ${feature}` : null,
      page ? `現在のページ: ${page}` : null,
    ].filter(Boolean).join("\n");

    const userParts = [context, message].filter(Boolean).join("\n\n");

    // Gemini に送るコンテンツ
    const contents = [
      {
        role: "user",
        parts: [
          ...(componentSource
            ? [{ text: `## 現在のページのソースコード\n\n\`\`\`typescript\n${componentSource}\n\`\`\`` }]
            : []),
          { text: userParts },
        ],
      },
    ];

    const geminiResp = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResp.ok) {
      const err = await geminiResp.text();
      console.error("Gemini error:", err);
      return Response.json({ error: "AI応答に失敗しました" }, { status: 502 });
    }

    const data = await geminiResp.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "回答を生成できませんでした";

    return Response.json({ reply }, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (e) {
    console.error("chat-support error:", e);
    return Response.json({ error: "内部エラー" }, { status: 500 });
  }
});
