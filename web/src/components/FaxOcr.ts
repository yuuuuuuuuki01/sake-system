import type { FaxRecord } from "../api";

export function renderFaxOcr(records: FaxRecord[], processing: boolean, resultText: string | null): string {
  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">FAX OCR</p>
        <h1>FAX受信 → 自動伝票起票</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>📤 FAX画像をアップロード</h2>
        <p class="panel-caption">Cloud Vision API でテキスト抽出 → 伝票候補生成</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;">
        <label class="field" style="flex:1 1 240px;">
          <span>FAX画像 (PDF/JPG/PNG)</span>
          <input id="fax-file" type="file" accept="image/*,.pdf" />
        </label>
        <label class="field" style="flex:0 0 160px;">
          <span>送信元 (任意)</span>
          <input id="fax-sender-name" type="text" placeholder="〇〇商事" />
        </label>
        <label class="field" style="flex:0 0 140px;">
          <span>送信元番号</span>
          <input id="fax-sender-phone" type="text" placeholder="03-..." />
        </label>
        <button class="button primary" data-action="fax-upload" ${processing ? "disabled" : ""}>
          ${processing ? "OCR処理中…" : "📤 アップロード&OCR"}
        </button>
      </div>
      ${
        resultText
          ? `
        <div style="margin-top:16px;">
          <h3 style="margin:0 0 8px;">📝 OCR結果</h3>
          <pre style="background:var(--surface-alt);padding:12px;border-radius:6px;white-space:pre-wrap;font-family:'Noto Sans JP',monospace;font-size:12px;max-height:300px;overflow:auto;">${resultText}</pre>
          <div class="action-bar">
            <button class="button secondary" data-action="fax-create-invoice">📋 伝票として起票</button>
          </div>
        </div>
      `
          : ""
      }
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>受信履歴 (${records.length}件)</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>受信日時</th>
              <th>送信元</th>
              <th>OCR状態</th>
              <th>抽出テキスト</th>
              <th>伝票連携</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${records.length === 0 ? '<tr><td colspan="6" class="empty-row">FAX受信履歴がありません</td></tr>' : ""}
            ${records
              .map(
                (r) => `
              <tr>
                <td>${r.receivedAt.slice(0, 16).replace("T", " ")}</td>
                <td>${r.senderName ?? "―"}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${r.senderPhone ?? ""}</span></td>
                <td>
                  <span class="status-pill ${r.ocrStatus === "done" ? "success" : r.ocrStatus === "failed" ? "warning" : "neutral"}">${r.ocrStatus}</span>
                </td>
                <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--text-secondary);">${(r.ocrText ?? "").slice(0, 80)}</td>
                <td>${r.linkedInvoiceId ? `<span class="mono">${r.linkedInvoiceId}</span>` : "未連携"}</td>
                <td>
                  <button class="button-sm secondary" data-action="fax-view" data-id="${r.id}">詳細</button>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>📡 FAX→自動取込の仕組み</h2>
      </div>
      <ol style="line-height:1.8;">
        <li><strong>Webhook受信:</strong> FAXサービス(eFAX/InterFAX等)のWebhookを設定 → Supabase Edge Function で受信</li>
        <li><strong>画像保存:</strong> Supabase Storage にFAX画像を保存</li>
        <li><strong>OCR実行:</strong> Cloud Vision API で日本語テキスト抽出</li>
        <li><strong>項目抽出:</strong> パターンマッチで伝票番号・商品コード・数量・金額を識別</li>
        <li><strong>伝票起票:</strong> 抽出データから売上伝票/仕入伝票を自動作成 (要承認)</li>
      </ol>
      <p class="form-hint">現状はファイル手動アップロード。Webhook自動受信は将来実装予定。</p>
    </section>
  `;
}
