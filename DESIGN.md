# DESIGN.md — syusen-cloud

> このファイルは AI エージェントが `syusen-cloud` の日本語 UI を一貫して生成するためのデザイン仕様書です。現場の業務密度を支えつつ、既存基幹より読みやすく、確認しやすく、将来的なクラウド運用に耐える UI を目指します。

* * *

## 1. Visual Theme & Atmosphere

- デザイン方針: 高密度の業務 UI を前提にした、静かで信頼感のある日本語 SaaS。派手さよりも「素早く確認できる」「迷わない」「長時間使っても疲れにくい」を優先する
- 密度: 情報密度は高め。ただし詰め込み感は避け、テーブル・フォーム・集計カードの役割を明確に分離する
- キーワード: 正確、静穏、業務実務的、視認性重視、信頼感
- 禁止事項:
  - マーケティングLPのような大きすぎる余白
  - 紫系グラデーションや装飾主導の配色
  - 丸すぎるカード、過剰な影、強いガラスモーフィズム
  - 日本語で詰まって見える狭い行間

* * *

## 2. Color Palette & Roles

### Primary

- Primary (`#0F5B8D`): メイン操作、主要リンク、選択状態
- Primary Dark (`#0A4368`): ホバー、押下、強調見出し
- Primary Soft (`#E8F2F8`): 選択行背景、情報的な補助面

### Semantic

- Danger (`#C53D3D`): エラー、削除、差し戻し
- Warning (`#B7791F`): 締め前注意、確認待ち、未確定状態
- Success (`#2F855A`): 同期完了、入金確認済み、正常処理
- Info (`#2B6CB0`): 参照情報、補助通知、同期状況

### Neutral

- Text Primary (`#1F2933`): 本文、主要数値、見出し
- Text Secondary (`#52606D`): 補足、ラベル、列説明
- Text Disabled (`#9AA5B1`): 非活性、未選択、未設定
- Border (`#D9E2EC`): テーブル罫線、入力枠、区切り線
- Border Strong (`#BCCCDC`): 強い区切り、固定ヘッダ境界
- Background (`#F7FAFC`): ページ全体
- Surface (`#FFFFFF`): カード、モーダル、テーブル面
- Surface Alt (`#F2F5F7`): フィルタ面、固定領域、補助背景

### Role Mapping

- 売上系: Primary 系を基調に落ち着いた青
- 入金確認: Success / Warning の両方を明確に使い分ける
- 在庫注意: Warning を主、Danger は欠品や重大差異のみ
- 帳票プレビュー: 背景を白、周辺 UI は薄いグレーで情報を分離する

* * *

## 3. Typography Rules

### 3.1 和文フォント

- ゴシック体: `"Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", sans-serif`
- 明朝体: 原則使用しない。帳票プレビューや印字見本など、紙面再現が必要な場面のみ限定利用

### 3.2 欧文フォント

- サンセリフ: `"Inter", "Segoe UI", Arial, sans-serif`
- 等幅: `"JetBrains Mono", "SFMono-Regular", Consolas, monospace`

### 3.3 font-family 指定

```css
font-family: "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", "Inter", sans-serif;
font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
```

### 3.4 文字サイズ・ウェイト階層

| Role | Font Size | Weight | Line Height | Letter Spacing | 備考 |
| --- | --- | --- | --- | --- | --- |
| Display | 28px | 700 | 1.35 | 0.01em | ダッシュボードの大見出し |
| Heading 1 | 22px | 700 | 1.4 | 0.01em | 画面タイトル |
| Heading 2 | 18px | 700 | 1.45 | 0.01em | セクション見出し |
| Heading 3 | 15px | 700 | 1.45 | 0.02em | カード見出し、モーダル見出し |
| Body | 14px | 400 | 1.75 | 0.03em | 標準本文、フォーム、一覧 |
| Caption | 12px | 400 | 1.6 | 0.03em | 補足、注釈、状態説明 |
| Small | 11px | 500 | 1.5 | 0.02em | バッジ、列補足、メタ情報 |
| Numeric Large | 24px | 700 | 1.2 | 0 | KPI 数値 |
| Numeric Mono | 13px | 500 | 1.4 | 0 | 伝票番号、コード、金額比較 |

### 3.5 行間・字間

- 日本語本文の line-height: `1.7` 以上
- 見出しの line-height: `1.35`〜`1.45`
- 本文の letter-spacing: `0.02em`〜`0.04em`
- テーブルセルは `0.01em`〜`0.02em`
- 数値・コード列は letter-spacing を増やさない

### 3.6 禁則処理・改行ルール

```css
line-break: strict;
overflow-wrap: break-word;
word-break: normal;
```

- テーブル内のコード列や商品名列は、可能なら列幅設計で逃がし、無理な `break-all` は避ける
- 長い得意先名は 2 行まで許容し、3 行以上に崩れるレイアウトは作らない
- 金額、JAN、伝票番号は改行禁止

### 3.7 OpenType 機能

```css
font-feature-settings: "kern" 1;
```

- `palt` は本文常用しない
- `kern` は見出し、ナビゲーション、KPI 周辺で使用可

* * *

## 4. Component Stylings

### Buttons

Primary:
- Background: `#0F5B8D`
- Text: `#FFFFFF`
- Border Radius: `8px`
- Padding: `10px 16px`
- Font Size: `14px`
- Font Weight: `700`

Secondary:
- Background: `#FFFFFF`
- Text: `#0F5B8D`
- Border: `1px solid #BCCCDC`
- Border Radius: `8px`
- Padding: `10px 16px`

Ghost:
- Background: `transparent`
- Text: `#52606D`
- Border: `1px solid transparent`

Danger:
- Background: `#C53D3D`
- Text: `#FFFFFF`

### Inputs

- Height: `40px`
- Border Radius: `8px`
- Border: `1px solid #BCCCDC`
- Background: `#FFFFFF`
- Focus Ring: `0 0 0 3px rgba(15, 91, 141, 0.14)`
- Placeholder: `#9AA5B1`
- ラベルは入力欄の上に置き、横並びラベルは極力避ける

### Tables

- テーブルは本システムの主役。カードより優先して情報を載せる
- Header Background: `#F2F5F7`
- Row Hover: `#F7FBFD`
- Selected Row: `#E8F2F8`
- Border Color: `#D9E2EC`
- Header Font: `12px / 700`
- Cell Font: `13px / 400`
- 行高: `40px` 基準
- 数値列は右寄せ、コード列は等幅、状態列は左寄せ+バッジ

### Cards / Panels

- Border Radius: `12px`
- Border: `1px solid #E5EDF5`
- Shadow: `0 1px 2px rgba(16, 24, 40, 0.04)`
- KPI カードは大きな数値 + 小さな比較情報に分ける
- フィルタパネルは白ではなく `Surface Alt` を使って主コンテンツと差別化する

### Status Badges

- Radius: `999px`
- Font Size: `11px`
- Font Weight: `700`
- 未入金: Warning 系
- 入金済: Success 系
- 差異あり: Danger 系
- 同期待ち/確認待ち: Info 系

### Modals / Drawers

- 一括編集や明細確認は Drawer 優先
- 破壊的操作や最終確認のみ Modal
- 帳票プレビューはワイド Drawer か専用ページに寄せる

* * *

## 5. Layout & Spacing System

- 基本グリッド: `8px`
- ページ左右余白: `24px`
- セクション間隔: `24px`
- カード内 padding: `16px` または `20px`
- フィルタ群の要素間: `12px`
- KPI 群の gap: `16px`
- PC では `sidebar + content` の 2 カラムを基本にする
- 画面上部には必ず「画面タイトル」「期間」「主要アクション」を置く

### Desktop

- 最大幅は固定しすぎず、ワイドモニタを活かす
- ダッシュボードは 12 カラム基準
- 一覧+詳細、一覧+集計、一覧+フィルタの複合レイアウトを許容

### Mobile

- 原則参照中心
- データ入力は最小限。確認・承認・検索に寄せる
- テーブルはカード化ではなく、必要に応じて横スクロールを許容する

* * *

## 6. Data Visualization Rules

- グラフは補助。主役は数表と明細
- 日次売上は棒グラフ、累計比較は折れ線または差分表示
- 色数は絞る。系列は 3 色以内
- 赤緑だけで意味を分けない。ラベル、アイコン、符号も併用
- 金額表示は桁区切りを必須
- 前年比、前週比、予算比は「基準値」「差額」「率」を分けて表示

### Dashboard Priority

1. 当日売上
2. 当月累計
3. 前年同月比
4. 未入金件数 / 金額
5. 在庫注意件数
6. 同期状態

* * *

## 7. Domain-Specific UI Rules

### 売上

- 伝票番号、伝票日、得意先、商品、数量、金額を最優先
- 一覧から明細に素早く降りられること
- CSV 出力前提で列表示の ON/OFF を許容する

### 入金確認

- 「請求残」「今回入金」「差額」「最終入金日」を並べて確認できること
- 未入金と一部入金を明確に見分けられること

### 在庫

- 数量だけでなく更新時刻を重視
- 危険在庫は色だけでなくアイコンとラベルでも示す

### 帳票 / JAN

- JAN は 13 桁で扱う前提
- JAN・伝票番号・得意先コードは等幅で表示
- 印刷前確認では、紙面プレビューよりも「値の正しさ確認」を優先

* * *

## 8. Writing & Tone

- 文体は簡潔で業務的
- UI ラベルは短く、説明文は必要なときだけ表示
- ボタン文言は動詞から始める
- エラーは原因と次アクションを分けて書く

例:
- 良い: `入金データを再同期`
- 良い: `この得意先の締日設定が未確認です`
- 悪い: `エラーが発生しました`

* * *

## 9. Agent Prompt Guide

### Quick Reference

- 日本語業務 UI として設計する
- 高密度だが窮屈にしない
- テーブルを主役にする
- KPI は静かな強さで見せる
- 数値、コード、JAN は等幅または数値向けスタイルを使う
- 派手な装飾よりも、確認速度と誤読防止を優先する

### Prompt Snippet

```text
この画面は syusen-cloud の DESIGN.md に従って実装してください。
日本語の業務 UI として、売上・入金・在庫の確認速度を最優先にしてください。
テーブル、フィルタ、KPI の情報階層を明確にし、過剰な装飾やLP的な余白は避けてください。
JAN、伝票番号、コード値は読み間違えないスタイルで表示してください。
```

### When Unsure

- 見た目の新しさよりも業務の見やすさを優先する
- 迷ったらテーブル中心に戻す
- 日本語本文の可読性が落ちる詰め方はしない
- モバイル最適化より、まず PC 業務画面として破綻しないことを優先する
