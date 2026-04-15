(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(n){if(n.ep)return;n.ep=!0;const l=a(n);fetch(n.href,l)}})();Array.from({length:30},(t,e)=>{const a=new Date("2026-03-17T00:00:00+09:00");return a.setDate(a.getDate()+e),{date:a.toISOString(),amount:42e4+e*73123%62e4}}),Array.from({length:20},(t,e)=>{const a=new Date("2026-04-15T00:00:00+09:00");return a.setDate(a.getDate()-e),{id:`sale-${e+1}`,documentNo:`D${String(240100+e).padStart(6,"0")}`,date:a.toISOString(),customerCode:`C${String(e+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][e%4],amount:68e3+e%6*24500}});Array.from({length:12},(t,e)=>({id:`customer-${e+1}`,code:`C${String(e+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][e%6],closingDay:[15,20,25,31][e%4],paymentDay:[5,10,15,20][e%4],isActive:e%5!==0})),Array.from({length:12},(t,e)=>({id:`product-${e+1}`,code:`P${String(e+1).padStart(5,"0")}`,janCode:`4901234567${String(e).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][e%4],category:["清酒","焼酎","リキュール"][e%3],isActive:e%6!==0}));async function m(t,e){try{const a=await fetch(`/sake-system/${t}`,{headers:{Accept:"application/json"}});if(!a.ok)throw new Error(`HTTP ${a.status}`);return await a.json()}catch(a){throw console.warn(`Failed to fetch ${t}`,a),a}}function P(){return m("data/api/latest/sales-summary.json")}function j(){return m("data/api/latest/payment-status.json")}function A(){return m("data/api/latest/master-stats.json")}function F(){return m("data/api/latest/pipeline-meta.json")}function f(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function y(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function L(t){const r={top:20,right:20,bottom:30,left:50},n=760-r.left-r.right,l=260-r.top-r.bottom,i=Math.max(...t.map(c=>c.amount),1),u=n/t.length,h=t.map((c,o)=>{const p=c.amount/i*l,g=r.left+o*u+4,w=r.top+l-p,k=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(c.date));return`
        <g>
          <rect x="${g}" y="${w}" width="${Math.max(u-8,8)}" height="${p}" rx="4" fill="#0F5B8D" opacity="${.58+o/t.length*.34}" />
          ${o%5===0?`<text x="${g+6}" y="252" class="chart-axis">${k}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(c=>{const o=r.top+l-l*c,p=Math.round(i*c/1e3);return`
        <g>
          <line x1="${r.left}" y1="${o}" x2="${760-r.right}" y2="${o}" class="chart-grid" />
          <text x="6" y="${o+4}" class="chart-axis">${p.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${h}
    </svg>
  `}function I(t,e){const a={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${e.status}">${a[e.status]}</span>
        <span class="meta-note">最終同期 ${y(e.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${f(t.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${t.kpis.todayDelta>0?"+":""}${t.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${f(t.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${t.kpis.monthDelta>0?"+":""}${t.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${t.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${f(t.kpis.unpaidAmount)}</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">直近30日の売上推移</p>
          </div>
        </div>
        ${L(t.dailySales)}
      </article>

      <aside class="panel sync-panel">
        <div class="panel-header">
          <div>
            <h2>パイプライン状況</h2>
            <p class="panel-caption">データ同期の最新状態</p>
          </div>
        </div>
        <dl class="meta-list">
          <div>
            <dt>ジョブ</dt>
            <dd>${e.jobName}</dd>
          </div>
          <div>
            <dt>最終同期</dt>
            <dd>${y(e.lastSyncAt)}</dd>
          </div>
          <div>
            <dt>更新時刻</dt>
            <dd>${y(e.generatedAt)}</dd>
          </div>
        </dl>
        <p class="sync-message">${e.message}</p>
      </aside>
    </section>
  `}function J(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${e.closingDay}日</td>
          <td class="numeric">${e.paymentDay}日</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function C(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td class="mono">${e.janCode}</td>
          <td>${e.name}</td>
          <td>${e.category}</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function T(t,e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">マスタ</p>
        <h1>得意先・商品マスタ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先</p>
        <p class="kpi-value">${t.summary.customerCount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">有効 ${t.summary.activeCustomerCount.toLocaleString("ja-JP")} 件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品</p>
        <p class="kpi-value">${t.summary.productCount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">有効 ${t.summary.activeProductCount.toLocaleString("ja-JP")} 件</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header tabs-header">
        <div>
          <h2>マスタ一覧</h2>
          <p class="panel-caption">業務確認用の基本統計</p>
        </div>
        <div class="tab-group">
          <button class="tab-button ${e==="customers"?"active":""}" data-tab="customers">得意先一覧</button>
          <button class="tab-button ${e==="products"?"active":""}" data-tab="products">商品一覧</button>
        </div>
      </div>
      <div class="table-wrap">
        ${e==="customers"?`
          <table>
            <thead>
              <tr>
                <th>得意先コード</th>
                <th>得意先名</th>
                <th class="numeric">締日</th>
                <th class="numeric">入金日</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${J(t.customers)}</tbody>
          </table>
        `:`
          <table>
            <thead>
              <tr>
                <th>商品コード</th>
                <th>JAN</th>
                <th>商品名</th>
                <th>カテゴリ</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${C(t.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function M(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t)):"-"}function v(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const N={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function O(t){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">入金状況</p>
        <h1>得意先別入金ステータス</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>請求残一覧</h2>
          <p class="panel-caption">未入金・一部入金を優先表示</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>得意先</th>
              <th class="numeric">請求額</th>
              <th class="numeric">入金額</th>
              <th class="numeric">請求残</th>
              <th>最終入金日</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>${t.map(a=>`
        <tr>
          <td>
            <div class="table-title">${a.customerName}</div>
            <div class="table-sub mono">${a.customerCode}</div>
          </td>
          <td class="numeric">${v(a.billedAmount)}</td>
          <td class="numeric">${v(a.paymentAmount)}</td>
          <td class="numeric">${v(a.balanceAmount)}</td>
          <td>${M(a.lastPaymentDate)}</td>
          <td><span class="status-pill ${a.status==="paid"?"success":a.status==="partial"?"warning":"danger"}">${N[a.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function E(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function R(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function b(t){return t.toISOString().slice(0,10)}function q(t,e,a){const r=t.length?t.map(n=>`
            <tr>
              <td class="mono">${n.documentNo}</td>
              <td>${E(n.date)}</td>
              <td>
                <div class="table-title">${n.customerName}</div>
                <div class="table-sub mono">${n.customerCode}</div>
              </td>
              <td class="numeric">${R(n.amount)}</td>
            </tr>
          `).join(""):'<tr><td colspan="4" class="empty-row">該当する売上伝票はありません。</td></tr>';return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上一覧</p>
        <h1>売上伝票一覧</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>開始日</span>
          <input id="sales-start" type="date" value="${e||b(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${a||b(new Date)}" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="sales-filter">絞り込む</button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>伝票一覧</h2>
          <p class="panel-caption">${t.length.toLocaleString("ja-JP")} 件</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>伝票番号</th>
              <th>日付</th>
              <th>得意先</th>
              <th class="numeric">金額</th>
            </tr>
          </thead>
          <tbody>${r}</tbody>
        </table>
      </div>
    </section>
  `}const s={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,route:S(location.pathname),salesFilter:{startDate:"",endDate:""},masterTab:"customers",loading:!0,error:null};function S(t){const e="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",a=t.startsWith(e)?t.slice(e.length)||"/":t;return a==="/sales"||a==="/payment"||a==="/master"?a:"/"}function D(t){return t.slice(0,10)}function x(t){const e=s.salesFilter.startDate?new Date(s.salesFilter.startDate):null,a=s.salesFilter.endDate?new Date(`${s.salesFilter.endDate}T23:59:59`):null;return[...t.salesRecords].sort((r,n)=>new Date(n.date).getTime()-new Date(r.date).getTime()).filter(r=>{const n=new Date(r.date);return!(e&&n<e||a&&n>a)})}function H(t){const e=`${"/sake-system/".replace(/\/$/,"")}${t==="/"?"/":t}`;history.pushState(null,"",e),s.route=t,d()}function W(){if(s.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(s.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${s.error}</p>
      </section>
    `;if(!s.salesSummary||!s.paymentStatus||!s.masterStats||!s.pipelineMeta)return"";switch(s.route){case"/sales":return q(x(s.salesSummary),s.salesFilter.startDate,s.salesFilter.endDate);case"/payment":return O([...s.paymentStatus.records].sort((t,e)=>e.balanceAmount-t.balanceAmount));case"/master":return T(s.masterStats,s.masterTab);default:return I(s.salesSummary,s.pipelineMeta)}}function _(){return`
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>売上・入金・マスタの確認を一画面で。</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          ${[{path:"/",label:"ダッシュボード",kicker:"Summary"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"},{path:"/master",label:"マスタ",kicker:"Master"}].map(e=>`
                <a href="${"/sake-system/".replace(/\/$/,"")}${e.path==="/"?"/":e.path}" class="nav-link ${s.route===e.path?"active":""}" data-link="${e.path}">
                  <div>
                    <div class="nav-kicker">${e.kicker}</div>
                    <div class="nav-label">${e.label}</div>
                  </div>
                </a>
              `).join("")}
        </nav>
      </aside>
      <main class="main">
        <div class="view">${W()}</div>
      </main>
    </div>
  `}function B(t){t.querySelectorAll("[data-link]").forEach(e=>{e.addEventListener("click",a=>{a.preventDefault(),H(e.dataset.link)})}),t.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const e=t.querySelector("#sales-start")?.value??"",a=t.querySelector("#sales-end")?.value??"";s.salesFilter={startDate:e,endDate:a},d()}),t.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{s.masterTab=e.dataset.tab,d()})})}function d(){const t=document.querySelector("#app");t&&(t.innerHTML=_(),B(t))}async function V(){s.loading=!0,d();try{const[t,e,a,r]=await Promise.all([P(),j(),A(),F()]);if(s.salesSummary=t,s.paymentStatus=e,s.masterStats=a,s.pipelineMeta=r,!s.salesFilter.startDate||!s.salesFilter.endDate){const l=[...t.salesRecords].sort((h,$)=>new Date($.date).getTime()-new Date(h.date).getTime())[0]?.date??new Date().toISOString(),i=new Date(l),u=new Date(i);u.setDate(i.getDate()-30),s.salesFilter={startDate:D(u.toISOString()),endDate:D(i.toISOString())}}s.error=null}catch(t){s.error=t instanceof Error?t.message:"データの取得に失敗しました。"}finally{s.loading=!1,d()}}window.addEventListener("popstate",()=>{s.route=S(location.pathname),d()});V();
