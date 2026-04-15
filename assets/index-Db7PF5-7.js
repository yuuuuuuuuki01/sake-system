(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(n){if(n.ep)return;n.ep=!0;const l=a(n);fetch(n.href,l)}})();const A={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(e,t)=>{const a=new Date("2026-03-17T00:00:00+09:00");return a.setDate(a.getDate()+t),{date:a.toISOString(),amount:42e4+t*73123%62e4}}),salesRecords:Array.from({length:20},(e,t)=>{const a=new Date("2026-04-15T00:00:00+09:00");return a.setDate(a.getDate()-t),{id:`sale-${t+1}`,documentNo:`D${String(240100+t).padStart(6,"0")}`,date:a.toISOString(),customerCode:`C${String(t+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][t%4],amount:68e3+t%6*24500}})},P={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},j={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(e,t)=>({id:`customer-${t+1}`,code:`C${String(t+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][t%6],closingDay:[15,20,25,31][t%4],paymentDay:[5,10,15,20][t%4],isActive:t%5!==0})),products:Array.from({length:12},(e,t)=>({id:`product-${t+1}`,code:`P${String(t+1).padStart(5,"0")}`,janCode:`4901234567${String(t).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][t%4],category:["清酒","焼酎","リキュール"][t%3],isActive:t%6!==0}))},C={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"};async function m(e,t){try{const a=await fetch(`/sake-system/${e}`,{headers:{Accept:"application/json"}});if(!a.ok)throw new Error(`HTTP ${a.status}`);return await a.json()}catch(a){return console.warn(`Failed to fetch ${e}, using fallback data`,a),t}}function F(){return m("data/api/latest/sales-summary.json",A)}function T(){return m("data/api/latest/payment-status.json",P)}function L(){return m("data/api/latest/master-stats.json",j)}function I(){return m("data/api/latest/pipeline-meta.json",C)}function y(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function f(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function J(e){const r={top:20,right:20,bottom:30,left:50},n=760-r.left-r.right,l=260-r.top-r.bottom,i=Math.max(...e.map(c=>c.amount),1),u=n/e.length,h=e.map((c,o)=>{const p=c.amount/i*l,$=r.left+o*u+4,w=r.top+l-p,k=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(c.date));return`
        <g>
          <rect x="${$}" y="${w}" width="${Math.max(u-8,8)}" height="${p}" rx="4" fill="#0F5B8D" opacity="${.58+o/e.length*.34}" />
          ${o%5===0?`<text x="${$+6}" y="252" class="chart-axis">${k}</text>`:""}
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
  `}function N(e,t){const a={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${a[t.status]}</span>
        <span class="meta-note">最終同期 ${f(t.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${y(e.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${e.kpis.todayDelta>0?"+":""}${e.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${y(e.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${e.kpis.monthDelta>0?"+":""}${e.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${y(e.kpis.unpaidAmount)}</p>
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
        ${J(e.dailySales)}
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
            <dd>${t.jobName}</dd>
          </div>
          <div>
            <dt>最終同期</dt>
            <dd>${f(t.lastSyncAt)}</dd>
          </div>
          <div>
            <dt>更新時刻</dt>
            <dd>${f(t.generatedAt)}</dd>
          </div>
        </dl>
        <p class="sync-message">${t.message}</p>
      </aside>
    </section>
  `}function M(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${t.closingDay}日</td>
          <td class="numeric">${t.paymentDay}日</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function O(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td class="mono">${t.janCode}</td>
          <td>${t.name}</td>
          <td>${t.category}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function E(e,t){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">マスタ</p>
        <h1>得意先・商品マスタ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先</p>
        <p class="kpi-value">${e.summary.customerCount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">有効 ${e.summary.activeCustomerCount.toLocaleString("ja-JP")} 件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品</p>
        <p class="kpi-value">${e.summary.productCount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">有効 ${e.summary.activeProductCount.toLocaleString("ja-JP")} 件</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header tabs-header">
        <div>
          <h2>マスタ一覧</h2>
          <p class="panel-caption">業務確認用の基本統計</p>
        </div>
        <div class="tab-group">
          <button class="tab-button ${t==="customers"?"active":""}" data-tab="customers">得意先一覧</button>
          <button class="tab-button ${t==="products"?"active":""}" data-tab="products">商品一覧</button>
        </div>
      </div>
      <div class="table-wrap">
        ${t==="customers"?`
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
            <tbody>${M(e.customers)}</tbody>
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
            <tbody>${O(e.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function R(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function v(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const q={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function x(e){return`
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
          <tbody>${e.map(a=>`
        <tr>
          <td>
            <div class="table-title">${a.customerName}</div>
            <div class="table-sub mono">${a.customerCode}</div>
          </td>
          <td class="numeric">${v(a.billedAmount)}</td>
          <td class="numeric">${v(a.paymentAmount)}</td>
          <td class="numeric">${v(a.balanceAmount)}</td>
          <td>${R(a.lastPaymentDate)}</td>
          <td><span class="status-pill ${a.status==="paid"?"success":a.status==="partial"?"warning":"danger"}">${q[a.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function H(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function W(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function b(e){return e.toISOString().slice(0,10)}function _(e,t,a){const r=e.length?e.map(n=>`
            <tr>
              <td class="mono">${n.documentNo}</td>
              <td>${H(n.date)}</td>
              <td>
                <div class="table-title">${n.customerName}</div>
                <div class="table-sub mono">${n.customerCode}</div>
              </td>
              <td class="numeric">${W(n.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||b(new Date(Date.now()-1e3*60*60*24*30))}" />
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
          <p class="panel-caption">${e.length.toLocaleString("ja-JP")} 件</p>
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
  `}const s={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,route:D(location.pathname),salesFilter:{startDate:"",endDate:""},masterTab:"customers",loading:!0,error:null};function D(e){const t="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",a=e.startsWith(t)?e.slice(t.length)||"/":e;return a==="/sales"||a==="/payment"||a==="/master"?a:"/"}function S(e){return e.slice(0,10)}function B(e){const t=s.salesFilter.startDate?new Date(s.salesFilter.startDate):null,a=s.salesFilter.endDate?new Date(`${s.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((r,n)=>new Date(n.date).getTime()-new Date(r.date).getTime()).filter(r=>{const n=new Date(r.date);return!(t&&n<t||a&&n>a)})}function V(e){const t=`${"/sake-system/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),s.route=e,d()}function Y(){if(s.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(s.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${s.error}</p>
      </section>
    `;if(!s.salesSummary||!s.paymentStatus||!s.masterStats||!s.pipelineMeta)return"";switch(s.route){case"/sales":return _(B(s.salesSummary),s.salesFilter.startDate,s.salesFilter.endDate);case"/payment":return x([...s.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return E(s.masterStats,s.masterTab);default:return N(s.salesSummary,s.pipelineMeta)}}function z(){return`
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>売上・入金・マスタの確認を一画面で。</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          ${[{path:"/",label:"ダッシュボード",kicker:"Summary"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"},{path:"/master",label:"マスタ",kicker:"Master"}].map(t=>`
                <a href="${"/sake-system/".replace(/\/$/,"")}${t.path==="/"?"/":t.path}" class="nav-link ${s.route===t.path?"active":""}" data-link="${t.path}">
                  <div>
                    <div class="nav-kicker">${t.kicker}</div>
                    <div class="nav-label">${t.label}</div>
                  </div>
                </a>
              `).join("")}
        </nav>
      </aside>
      <main class="main">
        <div class="view">${Y()}</div>
      </main>
    </div>
  `}function K(e){e.querySelectorAll("[data-link]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault(),V(t.dataset.link)})}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const t=e.querySelector("#sales-start")?.value??"",a=e.querySelector("#sales-end")?.value??"";s.salesFilter={startDate:t,endDate:a},d()}),e.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{s.masterTab=t.dataset.tab,d()})})}function d(){const e=document.querySelector("#app");e&&(e.innerHTML=z(),K(e))}async function U(){s.loading=!0,d();try{const[e,t,a,r]=await Promise.all([F(),T(),L(),I()]);if(s.salesSummary=e,s.paymentStatus=t,s.masterStats=a,s.pipelineMeta=r,!s.salesFilter.startDate||!s.salesFilter.endDate){const l=[...e.salesRecords].sort((h,g)=>new Date(g.date).getTime()-new Date(h.date).getTime())[0]?.date??new Date().toISOString(),i=new Date(l),u=new Date(i);u.setDate(i.getDate()-30),s.salesFilter={startDate:S(u.toISOString()),endDate:S(i.toISOString())}}s.error=null}catch(e){s.error=e instanceof Error?e.message:"データの取得に失敗しました。"}finally{s.loading=!1,d()}}window.addEventListener("popstate",()=>{s.route=D(location.pathname),d()});U();
