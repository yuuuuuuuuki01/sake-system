import type { CallLog, MasterCustomer } from "../api";

export function renderCallLogs(
  logs: CallLog[],
  customers: MasterCustomer[],
  lastSync: string | null,
  isEnabled: boolean
): string {
  const customerMap = new Map(customers.map((c) => [c.code, c]));

  const inboundCount = logs.filter((l) => l.callDirection === "inbound").length;
  const outboundCount = logs.filter((l) => l.callDirection === "outbound").length;
  const missedCount = logs.filter((l) => l.callStatus === "missed").length;
  const totalDuration = logs.reduce((s, l) => s + (l.durationSeconds ?? 0), 0);

  const formatDuration = (sec: number) => {
    if (sec === 0) return "―";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}分${s}秒` : `${s}秒`;
  };

  const resolveName = (log: CallLog): string => {
    if (log.matchedCustomerCode) {
      const c = customerMap.get(log.matchedCustomerCode);
      if (c) return `${c.name} (既存)`;
    }
    return "未登録番号";
  };

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">IVRy 電話連携</p>
        <h1>通話履歴</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="ivry-sync" ${!isEnabled ? "disabled" : ""}>🔄 IVRyから同期</button>
        <button class="button secondary" data-action="ivry-push-phonebook" ${!isEnabled ? "disabled" : ""}>📱 電話帳を送信</button>
      </div>
    </section>

    ${
      !isEnabled
        ? `
      <section class="panel">
        <p class="form-hint" style="margin:0;">
          ⚠️ IVRy連携が無効です。<a href="#" data-link="/integrations">連携設定</a>からAPIキーを設定してください。
        </p>
      </section>
    `
        : ""
    }

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">着信</p>
        <p class="kpi-value">${inboundCount}件</p>
        <p class="kpi-sub">不在 ${missedCount}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">発信</p>
        <p class="kpi-value">${outboundCount}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">通話時間合計</p>
        <p class="kpi-value">${formatDuration(totalDuration)}</p>
        <p class="kpi-sub">${logs.length}件の合計</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value" style="font-size:13px;">${lastSync ? lastSync.slice(0, 16).replace("T", " ") : "未同期"}</p>
        <p class="kpi-sub">IVRy API</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>通話履歴一覧</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>日時</th>
              <th>種別</th>
              <th>相手</th>
              <th>電話番号</th>
              <th>状態</th>
              <th>通話時間</th>
              <th>録音</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${logs.length === 0 ? '<tr><td colspan="8" class="empty-row">通話履歴がありません</td></tr>' : ""}
            ${logs
              .map(
                (l) => `
              <tr>
                <td style="font-size:12px;">${l.startedAt ? new Date(l.startedAt).toLocaleString("ja-JP") : "―"}</td>
                <td>
                  ${l.callDirection === "inbound" ? '<span class="status-pill neutral">📞 着信</span>' : '<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${resolveName(l)}</strong>
                  ${l.matchedCustomerCode ? `<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${l.matchedCustomerCode}</span>` : ""}
                </td>
                <td class="mono" style="font-size:12px;">${l.callDirection === "inbound" ? l.fromNumber : l.toNumber}</td>
                <td>
                  ${l.callStatus === "missed" ? '<span class="status-pill warning">不在着信</span>' : l.callStatus === "answered" ? '<span class="status-pill success">応答</span>' : `<span class="status-pill neutral">${l.callStatus}</span>`}
                </td>
                <td>${formatDuration(l.durationSeconds ?? 0)}</td>
                <td>${l.recordingUrl ? `<a href="${l.recordingUrl}" target="_blank" class="button-sm secondary">🎧 再生</a>` : "―"}</td>
                <td>
                  ${!l.matchedCustomerCode ? `<button class="button-sm secondary" data-action="call-link-customer" data-id="${l.id}" data-phone="${l.callDirection === "inbound" ? l.fromNumber : l.toNumber}">顧客に紐付け</button>` : ""}
                  <button class="button-sm secondary" data-action="call-memo" data-id="${l.id}">メモ</button>
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
        <h2>📡 IVRy連携の仕組み</h2>
      </div>
      <ol style="line-height:1.8;">
        <li><strong>通話履歴の取得:</strong> IVRyダッシュボード → API Keyを発行 → 「連携設定」画面で登録</li>
        <li><strong>電話帳を送信:</strong> customers の全件 (名前+電話番号) を IVRy にアップロード</li>
        <li><strong>着信時の識別:</strong> IVRy側で電話番号マッチング → CRMに顧客情報を表示</li>
        <li><strong>不在着信の追客:</strong> 不在着信を記録 → フォローアップタスクを自動生成</li>
        <li><strong>録音の保存:</strong> 通話録音URLをSupabaseに保存 (必要時のみ閲覧)</li>
      </ol>
    </section>
  `;
}
