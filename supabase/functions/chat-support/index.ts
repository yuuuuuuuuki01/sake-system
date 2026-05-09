import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

const SYSTEM_PROMPT = `あなたは「酒仙iクラウド」のサポートアシスタントです。
金井酒造店の業務管理システムについて、ユーザーからの質問に日本語で簡潔に答えてください。

## システム概要
酒仙iクラウドは酒造メーカー向けの業務管理システムです。販売・製造・分析の機能があります。

## 機能一覧

### 販売業務
- 伝票入力（/invoice-entry）: 売上・返品伝票の新規入力、明細追加
- 伝票照会（/invoice）: 過去伝票の検索・表示・PDF出力
- 納品書発行（/delivery）: 納品書のPDFダウンロード・印刷
- 月次請求（/billing）: 請求書発行・入金消込・未収管理
- 得意先台帳（/ledger）: 得意先別の取引履歴・残高確認
- 見積作成（/quote）: 見積書の作成・PDF出力・メール送付
- 配送カレンダー（/shipment-calendar）: 伝票日付ベースの配送スケジュール確認

### 分析・レポート
- 月次売上グラフ（/analytics）: 月次・商品別・得意先別の売上推移グラフ
- 移出量集計（/analytics）: 商品・得意先別の移出量（mL）集計
- 得意先分析（/customer-analysis）: ABC分析・購買頻度・LTV
- 商品力分析（/product-power）: 商品別販売力・成長率
- 営業効率（/customer-efficiency）: 訪問コスト・粗利効率
- 集計帳票（/report）: 各種集計レポートの出力
- 売上一覧（/sales）: 売上明細の一覧表示・CSV出力

### 営業・顧客管理
- 営業アクション（/churn-alert）: 離反リスク検知・フォロー優先度
- 訪問計画（/visit-planner）: 訪問スケジュールの作成・管理
- 取引先マップ（/map）: 地図上で取引先の位置確認
- 新規営業（/prospects）: 新規開拓リストの進捗管理
- メール配信（/email）: 一斉メール配信・テンプレート管理
- 季節提案（/seasonal-calendar）: 季節別提案スケジュール管理

### 受注・仕入
- 受注ワークフロー（/workflow）: 受注から出荷までのステータス管理
- Shopify受注（/shopify）: EC受注の確認・取込
- 仕入・買掛（/purchase）: 仕入管理・買掛金残高
- 入金状況（/payment）: 入金・回収状況の一覧

### 製造管理
- 仕込管理（/jikomi）: 仕込帳・麹室・タンク仕込記録
- タンク管理（/tanks）: タンク別在庫・ブレンド管理
- 酒税申告書（/tax）: 課税移出・控除明細・eTax XML出力
- 移出量自動集計（/tax）: 販売伝票から清酒・リキュール別移出量を自動計算
- 需要予測（/demand）: 過去実績ベースの需要予測
- 醸造計画（/brewing-plan）: 年間醸造スケジュール管理
- 調達計画（/procurement）: 原料米の調達・予算管理
- 醸造工程（/brewing-process）: バッチ別工程管理・麹室制約チェック

### マスタ・設定
- 商品マスタ（/master）: 商品情報の参照・編集
- 得意先マスタ（/master）: 得意先情報の参照・編集
- 店舗販売（/store）: 直売所のPOS・販売記録
- 酒蔵見学予約（/tour）: 見学予約の受付・管理
- 連動状態（/setup）: 酒仙iとのリレー同期状態確認
- CSV取込（/import）: マスタ・売上データのCSVインポート
- ユーザー管理（/users）: アカウント・権限管理

## 共通操作
- ヘッダーの検索ボタン（Ctrl+K）で全機能を横断検索できます
- 各画面のテーブルは列ヘッダーをクリックでソートできます
- PDF出力はヘッダーの🖨ボタンまたは各画面の出力ボタンから
- URLをそのまま共有すれば同じ画面を開けます

## 回答のルール
- 簡潔に、3〜5文程度で答えてください
- 該当する機能のページパス（例: /billing）を案内してください
- わからないことは「開発チームに確認します」と答えてください
- 改修要望には「承りました、開発チームに共有します」と答えてください`;

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

    const context = [
      feature ? `対象機能: ${feature}` : null,
      page ? `現在のページ: ${page}` : null,
    ].filter(Boolean).join("\n");

    const userMessage = context ? `${context}\n\n${message}` : message;

    const geminiResp = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 512,
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
