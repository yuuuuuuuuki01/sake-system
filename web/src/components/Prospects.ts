import type { Prospect, ProspectActivity, ProspectStage } from "../api";
import { PROSPECT_STAGE_COLORS, PROSPECT_STAGE_LABELS } from "../api";

export interface ProspectsViewState {
  prospects: Prospect[];
  activeId: string | null;
  activities: ProspectActivity[];
  editingId: string | null;
  viewMode: "kanban" | "list";
}

export function renderProspects(state: ProspectsViewState): string {
  const totalExpected = state.prospects.reduce((s, p) => s + p.expectedAmount, 0);
  const weightedPipeline = state.prospects.reduce((s, p) => s + (p.expectedAmount * p.probability) / 100, 0);
  const wonCount = state.prospects.filter((p) => p.stage === "won").length;
  const hotCount = state.prospects.filter((p) => p.stage === "hot" || p.stage === "negotiating").length;

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">新規営業</p>
        <h1>見込客パイプライン</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group">
          <button class="tab-button ${state.viewMode === "kanban" ? "active" : ""}" data-prospect-view="kanban">カンバン</button>
          <button class="tab-button ${state.viewMode === "list" ? "active" : ""}" data-prospect-view="list">一覧</button>
        </div>
        <button class="button primary" data-action="prospect-new">＋ 見込客追加</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">パイプライン総額</p>
        <p class="kpi-value">¥${totalExpected.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">${state.prospects.length}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">加重パイプライン</p>
        <p class="kpi-value">¥${Math.round(weightedPipeline).toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">確度考慮</p>
      </article>
      <article class="panel kpi-card ${hotCount > 0 ? "kpi-alert" : ""}">
        <p class="panel-title">ホット案件</p>
        <p class="kpi-value">${hotCount}件</p>
        <p class="kpi-sub">見込み高 + 商談中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注</p>
        <p class="kpi-value">${wonCount}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${state.viewMode === "kanban" ? renderKanban(state.prospects) : renderList(state.prospects)}

    ${renderProspectModal(state)}
  `;
}

function renderKanban(prospects: Prospect[]): string {
  const stages: ProspectStage[] = ["cold", "warm", "hot", "contacted", "negotiating", "won", "lost"];
  const columns = stages
    .map((stage) => {
      const items = prospects.filter((p) => p.stage === stage);
      const total = items.reduce((s, p) => s + p.expectedAmount, 0);
      return `
        <div class="pk-col" data-prospect-stage="${stage}">
          <div class="pk-col-header" style="--pk-color:${PROSPECT_STAGE_COLORS[stage]};">
            <span class="pk-col-label">${PROSPECT_STAGE_LABELS[stage]}</span>
            <span class="pk-col-count">${items.length}</span>
          </div>
          <div class="pk-col-sub">¥${total.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${
              items.length === 0
                ? '<div class="wf-empty">―</div>'
                : items
                    .map(
                      (p) => `
              <div class="pk-card" data-prospect-id="${p.id}" draggable="true">
                <div class="pk-card-company">${p.companyName}</div>
                <div class="pk-card-meta">${p.businessType ?? ""} ${p.contactName ? "· " + p.contactName : ""}</div>
                <div class="pk-card-amount">¥${p.expectedAmount.toLocaleString("ja-JP")} <span style="color:var(--text-secondary);">(${p.probability}%)</span></div>
                ${p.nextAction ? `<div class="pk-card-action">🎯 ${p.nextAction}${p.nextActionDate ? " (" + p.nextActionDate + ")" : ""}</div>` : ""}
                ${p.assignedStaffCode ? `<div class="pk-card-staff">👤 ${p.assignedStaffCode}</div>` : ""}
              </div>
            `
                    )
                    .join("")
            }
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${columns}</div>
    </section>
  `;
}

function renderList(prospects: Prospect[]): string {
  return `
    <section class="panel">
      <div class="panel-header"><h2>見込客一覧</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>会社名</th>
              <th>業種</th>
              <th>ステージ</th>
              <th class="numeric">想定金額</th>
              <th class="numeric">確度</th>
              <th>次のアクション</th>
              <th>担当</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${prospects
              .map(
                (p) => `
              <tr>
                <td><strong>${p.companyName}</strong><br/><span style="font-size:11px;color:var(--text-secondary);">${p.contactName ?? ""}</span></td>
                <td>${p.businessType ?? "―"}</td>
                <td><span class="status-pill" style="background:${PROSPECT_STAGE_COLORS[p.stage]};color:white;">${PROSPECT_STAGE_LABELS[p.stage]}</span></td>
                <td class="numeric">¥${p.expectedAmount.toLocaleString("ja-JP")}</td>
                <td class="numeric">${p.probability}%</td>
                <td>${p.nextAction ?? "―"}${p.nextActionDate ? ` (${p.nextActionDate})` : ""}</td>
                <td>${p.assignedStaffCode ?? "―"}</td>
                <td>
                  <button class="button-sm secondary" data-action="prospect-edit" data-id="${p.id}">編集</button>
                  <button class="button-sm secondary" data-action="prospect-delete" data-id="${p.id}" style="color:var(--danger);">削除</button>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderProspectModal(state: ProspectsViewState): string {
  if (!state.editingId) return "";
  const isNew = state.editingId === "__new__";
  const p = isNew ? null : state.prospects.find((x) => x.id === state.editingId);
  if (!isNew && !p) return "";

  return `
    <div class="modal-backdrop" data-action="prospect-close">
      <div class="modal-panel" onclick="event.stopPropagation()" style="width:min(720px, 100%);">
        <div class="modal-header">
          <h3>${isNew ? "新規見込客" : p!.companyName}</h3>
          <button class="modal-close" data-action="prospect-close">×</button>
        </div>
        <div class="modal-body">
          <div class="filter-grid filter-grid--wide">
            <label class="field" style="flex:1 1 240px;">
              <span>会社名 *</span>
              <input id="prospect-company" type="text" value="${p?.companyName ?? ""}" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>担当者</span>
              <input id="prospect-contact" type="text" value="${p?.contactName ?? ""}" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>電話</span>
              <input id="prospect-phone" type="tel" value="${p?.phone ?? ""}" />
            </label>
            <label class="field" style="flex:1 1 200px;">
              <span>メール</span>
              <input id="prospect-email" type="email" value="${p?.email ?? ""}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>業種</span>
              <select id="prospect-business-type">
                ${["", "飲食店", "酒店", "百貨店", "スーパー", "宿泊", "小売", "卸", "その他"]
                  .map((t) => `<option value="${t}" ${p?.businessType === t ? "selected" : ""}>${t || "―"}</option>`)
                  .join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>ステージ</span>
              <select id="prospect-stage">
                ${Object.entries(PROSPECT_STAGE_LABELS).map(([k, v]) => `<option value="${k}" ${p?.stage === k ? "selected" : ""}>${v}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>流入元</span>
              <select id="prospect-source">
                ${["", "展示会", "紹介", "WEB", "コールド", "問合せ", "リピート"]
                  .map((s) => `<option value="${s}" ${p?.source === s ? "selected" : ""}>${s || "―"}</option>`)
                  .join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>想定金額(円)</span>
              <input id="prospect-amount" type="number" value="${p?.expectedAmount ?? 0}" />
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>成約確度(%)</span>
              <input id="prospect-probability" type="number" min="0" max="100" value="${p?.probability ?? 10}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>担当者コード</span>
              <input id="prospect-staff" type="text" value="${p?.assignedStaffCode ?? ""}" placeholder="S001" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>次回アクション日</span>
              <input id="prospect-next-date" type="date" value="${p?.nextActionDate ?? ""}" />
            </label>
            <label class="field" style="flex:1 1 100%;">
              <span>次回アクション内容</span>
              <input id="prospect-next-action" type="text" value="${p?.nextAction ?? ""}" placeholder="提案書持参で訪問" />
            </label>
            <label class="field" style="flex:1 1 100%;">
              <span>備考・メモ</span>
              <textarea id="prospect-note" rows="3">${p?.note ?? ""}</textarea>
            </label>
          </div>

          ${
            !isNew
              ? `
          <hr style="margin:16px 0;"/>
          <h4>活動履歴 (${state.activities.length}件)</h4>
          <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
            <select id="prospect-activity-type" style="flex:0 0 120px;">
              <option value="call">📞 電話</option>
              <option value="visit">🚶 訪問</option>
              <option value="email">✉️ メール</option>
              <option value="proposal">📋 提案</option>
              <option value="demo">🎯 デモ</option>
              <option value="sample">🎁 サンプル</option>
            </select>
            <input id="prospect-activity-title" type="text" placeholder="何をしたか" style="flex:1 1 200px;" />
            <button class="button secondary" data-action="prospect-add-activity" data-id="${p!.id}">記録</button>
          </div>
          <div class="summary-list">
            ${state.activities
              .slice(0, 10)
              .map(
                (a) => `
              <div>
                <dt>${a.activityDate.slice(0, 10)} - ${a.activityType}</dt>
                <dd>${a.title ?? ""} ${a.result ? `→ ${a.result}` : ""}</dd>
              </div>
            `
              )
              .join("")}
          </div>
          `
              : ""
          }
        </div>
        <div class="action-bar" style="padding:12px 20px;border-top:1px solid var(--border);">
          ${!isNew ? `<button class="button secondary" data-action="prospect-convert" data-id="${p!.id}" style="margin-right:auto;">🎯 得意先化</button>` : ""}
          <button class="button secondary" data-action="prospect-close">キャンセル</button>
          <button class="button primary" data-action="prospect-save" data-id="${p?.id ?? ""}">保存</button>
        </div>
      </div>
    </div>
  `;
}
