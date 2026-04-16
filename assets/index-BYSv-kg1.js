(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Xt="modulepreload",Gt=function(e){return"/sake-system/"+e},Ue={},R=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){let d=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var c=d;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),r=l?.nonce||l?.getAttribute("nonce");o=d(n.map(u=>{if(u=Gt(u),u in Ue)return;Ue[u]=!0;const p=u.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":Xt,p||(f.as="script"),f.crossOrigin="",f.href=u,r&&f.setAttribute("nonce",r),document.head.appendChild(f),p)return new Promise((P,T)=>{f.addEventListener("load",P),f.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(l){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=l,window.dispatchEvent(r),!r.defaultPrevented)throw l}return o.then(l=>{for(const r of l||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},se="https://loarwnuyvfxiscjjsmiz.supabase.co",Ae="";async function Le(e,t){return null}async function C(e,t={}){return[]}const pt=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:Ae,SUPABASE_URL:se,supabaseInsert:Le,supabaseQuery:C},Symbol.toStringTag,{value:"Module"})),Pe="sake_auth";function mt(e){localStorage.setItem(Pe,JSON.stringify(e))}function ht(){return{apikey:Ae,"Content-Type":"application/json"}}function Zt(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function yt(e,t){const n=await fetch(`${se}/auth/v1/${e}`,{method:"POST",headers:ht(),body:JSON.stringify(t)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function ea(e,t){const n=await yt("token?grant_type=password",{email:e,password:t});return mt({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function ta(e,t){const n=await yt("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&mt({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function aa(){const e=je();if(localStorage.removeItem(Pe),!!e?.access_token)try{await fetch(`${se}/auth/v1/logout`,{method:"POST",headers:{...ht(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function je(){const e=localStorage.getItem(Pe);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function sa(){const e=je();if(!e)return null;const t=Zt(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}const Te={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},ye={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(e,t)=>{const n=new Date("2026-03-17T00:00:00+09:00");return n.setDate(n.getDate()+t),{date:n.toISOString(),amount:42e4+t*73123%62e4}}),salesRecords:Array.from({length:20},(e,t)=>{const n=new Date("2026-04-15T00:00:00+09:00");return n.setDate(n.getDate()-t),{id:`sale-${t+1}`,documentNo:`D${String(240100+t).padStart(6,"0")}`,date:n.toISOString(),customerCode:`C${String(t+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][t%4],amount:68e3+t%6*24500}})},na={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},q={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(e,t)=>({id:`customer-${t+1}`,code:`C${String(t+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][t%6],closingDay:[15,20,25,31][t%4],paymentDay:[5,10,15,20][t%4],isActive:t%5!==0})),products:Array.from({length:12},(e,t)=>({id:`product-${t+1}`,code:`P${String(t+1).padStart(5,"0")}`,janCode:`4901234567${String(t).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][t%4],category:["清酒","焼酎","リキュール"][t%3],isActive:t%6!==0}))},oa={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"},vt=ye.salesRecords.map((e,t)=>({...e,itemCount:t%4+1})),ia={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},ve={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function x(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function la(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function ca(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function L(e,t,n=""){for(const s of t){const o=e[s];if(typeof o=="string"&&o.length>0)return o}return n}function He(e,t,n=0){for(const s of t)if(s in e)return x(e[s]);return n}function Ye(e,t,n=!0){for(const s of t)if(s in e)return ca(e[s]);return n}function bt(e,t,n){for(const s of t){const o=e[s];if(typeof o!="string"||o.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(o))return new Date(`${o}T00:00:00Z`).toISOString();const i=new Date(o);if(!Number.isNaN(i.getTime()))return i.toISOString()}return n}function gt(e){return e.slice(0,7)}function Ee(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:bt(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:x(e.total_amount??e.billed_amount)}}function Ke(e,t){const n=t.startDate?new Date(`${t.startDate}T00:00:00`):null,s=t.endDate?new Date(`${t.endDate}T23:59:59`):null,o=t.documentNo.trim().toLowerCase(),i=t.customerCode.trim().toLowerCase();return e.filter(c=>{const l=new Date(c.date);return!(n&&l<n||s&&l>s||o&&!c.documentNo.toLowerCase().includes(o)||i&&!c.customerCode.toLowerCase().includes(i))}).sort((c,l)=>new Date(l.date).getTime()-new Date(c.date).getTime())}function Qe(e){const t=e.trim().toUpperCase(),n=ia[t];if(n)return n;const s=ye.salesRecords.find(o=>o.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function ra(){const e=new Map,t=new Map,n=new Map;return vt.forEach((s,o)=>{const i=gt(s.date);e.set(i,(e.get(i)??0)+s.amount);const c=t.get(s.customerCode)??{code:s.customerCode,name:s.customerName,amount:0,quantity:0,documents:0};c.amount+=s.amount,c.quantity+=s.itemCount,c.documents+=1,t.set(s.customerCode,c);const l=`P${String(o%4+1).padStart(5,"0")}`,r=ve.productTotals[o%ve.productTotals.length],d=n.get(l)??{code:l,name:r?.name??`商品${o+1}`,amount:0,quantity:0,documents:0};d.amount+=s.amount,d.quantity+=s.itemCount*12,d.documents+=1,n.set(l,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(e.entries()).sort(([s],[o])=>s.localeCompare(o)).map(([s,o])=>({month:s,amount:o})),productTotals:Array.from(n.values()).sort((s,o)=>o.amount-s.amount),customerTotals:Array.from(t.values()).sort((s,o)=>o.amount-s.amount)}}async function k(e,t){try{const n=await fetch(`/sake-system/${e}`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(n){return console.warn(`Failed to fetch ${e}, using fallback data`,n),t}}async function ft(){const e=await C("daily_sales_fact",{});if(e.length>0){const t=await C("customer_payment_status",{}),s=new Date().toISOString().slice(0,10),o=s.slice(0,7),i=[...e].sort((d,u)=>d.sales_date.localeCompare(u.sales_date)).slice(-30).map(d=>({date:new Date(`${d.sales_date}T00:00:00Z`).toISOString(),amount:x(d.sales_amount)})),c=e.reduce((d,u)=>u.sales_date===s?d+x(u.sales_amount):d,0),l=e.reduce((d,u)=>u.sales_date.startsWith(o)?d+x(u.sales_amount):d,0),r=t.filter(d=>x(d.balance_amount)>0);return{generatedAt:new Date().toISOString(),kpis:{todaySales:c,todayDelta:0,monthSales:l,monthDelta:0,unpaidCount:r.length,unpaidAmount:r.reduce((d,u)=>d+x(u.balance_amount),0)},dailySales:i,salesRecords:ye.salesRecords}}return k("data/api/latest/sales-summary.json",ye)}async function $t(){const e=await C("customer_payment_status",{});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const s=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:x(t.billed_amount),paymentAmount:x(t.paid_amount),balanceAmount:x(t.balance_amount),lastPaymentDate:null,status:la(t.payment_status)}})}:k("data/api/latest/payment-status.json",na)}async function kt(){const[e,t]=await Promise.all([C(),C()]);if(e.length>0||t.length>0){const n=e.length?e.map((o,i)=>({id:L(o,["id","customer_id","code"],`customer-${i+1}`),code:L(o,["code","customer_code","legacy_customer_code"],`C${String(i+1).padStart(4,"0")}`),name:L(o,["name","customer_name","display_name"],`Customer ${i+1}`),closingDay:He(o,["closing_day","close_day"],31),paymentDay:He(o,["payment_day","due_day"],15),isActive:Ye(o,["is_active","active","enabled"],!0)})):q.customers,s=t.length?t.map((o,i)=>({id:L(o,["id","product_id","code"],`product-${i+1}`),code:L(o,["code","product_code"],`P${String(i+1).padStart(5,"0")}`),janCode:L(o,["jan_code","jan","barcode"],""),name:L(o,["name","product_name","display_name"],`Product ${i+1}`),category:L(o,["category","category_name"],"未分類"),isActive:Ye(o,["is_active","active","enabled"],!0)})):q.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||q.summary.customerCount,activeCustomerCount:e.length?n.filter(o=>o.isActive).length:q.summary.activeCustomerCount,productCount:t.length||q.summary.productCount,activeProductCount:t.length?s.filter(o=>o.isActive).length:q.summary.activeProductCount},customers:n,products:s}}return k("data/api/latest/master-stats.json",q)}function St(){return k("data/api/latest/pipeline-meta.json",oa)}async function be(e){const[t,n]=await Promise.all([C("sales_document_headers",{}),C("sales_document_lines",{})]);if(t.length>0){const s=new Map;n.forEach(i=>{const c=String(i.header_id??i.document_header_id??i.document_no??i.id??"");c&&s.set(c,(s.get(c)??0)+1)});const o=t.map((i,c)=>{const l=Ee(i,c),r=String(i.id??i.document_no??i.legacy_document_no??"");return{...l,itemCount:s.get(r)??l.itemCount}});return Ke(o,e)}return Ke(vt,e)}async function Re(e){const t=e.trim().toUpperCase();if(!t)return Qe("");const[n,s,o]=await Promise.all([C("sales_document_headers",{}),C("customer_payments",{}),C("customer_payment_status",{})]);if(n.length>0||s.length>0){const i=n.map((r,d)=>{const u=Ee(r,d);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),c=s.map((r,d)=>({id:String(r.id??`payment-${d+1}`),date:bt(r,["payment_date","received_date"],new Date().toISOString()),amount:x(r.payment_amount??r.amount),method:r.payment_method??r.method??"入金"})),l=o.find(r=>(r.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:x(l?.balance_amount),salesTotal:i.reduce((r,d)=>r+d.amount,0),paymentTotal:c.reduce((r,d)=>r+d.amount,0),salesHistory:i,paymentHistory:c}}return Qe(t)}async function wt(){const[e,t,n]=await Promise.all([C("daily_sales_fact",{}),C("sales_document_headers",{}),C("sales_document_lines",{})]);if(e.length>0){const s=new Map;e.forEach(c=>{const l=gt(c.sales_date);s.set(l,(s.get(l)??0)+x(c.sales_amount))});const o=new Map;t.forEach((c,l)=>{const r=Ee(c,l),d=o.get(r.customerCode)??{code:r.customerCode,name:r.customerName,amount:0,quantity:0,documents:0};d.amount+=r.amount,d.documents+=1,o.set(r.customerCode,d)});const i=new Map;return n.forEach((c,l)=>{const r=c.product_code??c.legacy_product_code??`P${String(l+1).padStart(5,"0")}`,d=i.get(r)??{code:r,name:c.product_name??r,amount:0,quantity:0,documents:0};d.amount+=x(c.line_amount??c.amount),d.quantity+=x(c.quantity),d.documents+=1,i.set(r,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(s.entries()).sort(([c],[l])=>c.localeCompare(l)).map(([c,l])=>({month:c,amount:l})).slice(-12),productTotals:i.size>0?Array.from(i.values()).sort((c,l)=>l.amount-c.amount):ve.productTotals,customerTotals:o.size>0?Array.from(o.values()).sort((c,l)=>l.amount-c.amount):ve.customerTotals}}return ra()}const Ce={sales:"売上",return:"返品",export_return:"輸出戻入"};async function xt(e){const t=e.lines.reduce((o,i)=>o+i.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Le("sales_document_headers",{legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const We={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function qe(e){const t=await C("sales_document_headers",{});if(t.length>0){const n=t[0],s=x(n.total_amount);return{documentNo:e,invoiceDate:L(n,["sales_date","document_date"],""),customerCode:L(n,["legacy_customer_code","customer_code"],""),customerName:L(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...We,documentNo:e||We.documentNo}}const da={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function Me(e){return k(`data/api/latest/billing-${e}.json`,{...da,targetYearMonth:e})}const ua=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],pa={generatedAt:new Date().toISOString(),months:ua,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(e=>e*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(e=>e*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(e=>e*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(e=>e*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(e=>e*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function Dt(){return k("data/api/latest/sales-report.json",pa)}const Ct={planned:"計画中",active:"仕込中",done:"完了"},ma=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function Nt(){return k("data/api/latest/jikomi.json",ma)}const ha=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function _t(){return k("data/api/latest/tanks.json",ha)}const ya=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function At(){return k("data/api/latest/kentei.json",ya)}const va=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function Lt(){return k("data/api/latest/materials.json",va)}const ba=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],ga=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],fa=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],$a=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function Pt(){return k("data/api/latest/purchases.json",ba)}async function jt(){return k("data/api/latest/payables.json",ga)}async function Tt(){return k("data/api/latest/bills.json",fa)}async function Et(){return k("data/api/latest/raw-stock.json",$a)}const Rt=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Ne={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},ka={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",companyAddress:"神奈川県秦野市堀山下182",companyRepresentative:"金井 和雄",taxOffice:"小田原税務署",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,productionVolume:3800,previousBalance:0,currentAdjustment:0,exportDeduction:100,sampleDeduction:100,taxableVolume:3600,volume:3600,taxRate:100,taxAmount:36e4},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,productionVolume:2900,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:2850,volume:2850,taxRate:100,taxAmount:285e3},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,productionVolume:1250,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:1200,volume:1200,taxRate:100,taxAmount:12e4}],deductions:[{type:"export",categoryCode:"01",volume:100,reason:"シンガポール向け輸出",documentNo:"EX2026-003"},{type:"sample",categoryCode:"01",volume:100,reason:"展示会サンプル出荷"},{type:"sample",categoryCode:"02",volume:50,reason:"品評会出品"},{type:"sample",categoryCode:"03",volume:50,reason:"全国新酒鑑評会出品"}],totalVolume:7650,totalTax:765e3,status:"draft",submittedAt:null};async function Oe(e,t){return k(`data/api/latest/tax-${e}-${String(t).padStart(2,"0")}.json`,{...ka,targetYear:e,targetMonth:t})}function _(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function qt(e){const t=e.rows.map(s=>`    <Category>
      <Code>${_(s.taxCategory)}</Code>
      <Name>${_(s.taxCategoryName)}</Name>
      <AlcoholDegree>${s.alcoholDegree}</AlcoholDegree>
      <ProductionVolume>${s.productionVolume}</ProductionVolume>
      <PreviousBalance>${s.previousBalance}</PreviousBalance>
      <CurrentAdjustment>${s.currentAdjustment}</CurrentAdjustment>
      <ExportDeduction>${s.exportDeduction}</ExportDeduction>
      <SampleDeduction>${s.sampleDeduction}</SampleDeduction>
      <TaxableVolume>${s.taxableVolume}</TaxableVolume>
      <TaxRate>${s.taxRate}</TaxRate>
      <TaxAmount>${s.taxAmount}</TaxAmount>
    </Category>`).join(`
`),n=e.deductions.map(s=>`    <Deduction type="${_(s.type)}">
      <CategoryCode>${_(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${_(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${_(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${_(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${_(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${_(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${_(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${_(e.taxOffice)}</TaxOffice>
    <Status>${e.status}</Status>
  </Header>
  <Categories>
${t}
  </Categories>
  <Deductions>
${n}
  </Deductions>
  <Total>
    <TotalVolume>${e.totalVolume}</TotalVolume>
    <TotalTax>${e.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function Sa(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function wa(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=e.rows.map(i=>[i.taxCategory,i.taxCategoryName,i.alcoholDegree,i.productionVolume,i.previousBalance,i.currentAdjustment,i.exportDeduction,i.sampleDeduction,i.taxableVolume,i.taxRate,i.taxAmount].map(Sa).join(",")),o=`,合計,,${e.rows.reduce((i,c)=>i+c.productionVolume,0)},,,${e.rows.reduce((i,c)=>i+c.exportDeduction,0)},${e.rows.reduce((i,c)=>i+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...s,o].join(`
`)+`
`}function xa(e){const t=e.rows.map(o=>{const i=Math.max(0,o.productionVolume+o.previousBalance+o.currentAdjustment-o.exportDeduction-o.sampleDeduction),c=Math.round(i*o.taxRate);return{...o,taxableVolume:i,volume:i,taxAmount:c}}),n=t.reduce((o,i)=>o+i.taxableVolume,0),s=t.reduce((o,i)=>o+i.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:s}}async function Da(e){const{supabaseInsert:t}=await R(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>pt);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:qt(e),submitted_at:e.submittedAt})}const Ca=Array.from({length:10},(e,t)=>({id:`ss${t+1}`,saleDate:"2026-04-15",saleTime:`${9+t}:${String(t*7%60).padStart(2,"0")}`,productCode:`P${String(t%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][t%4],quantity:1+t%3,unitPrice:[2200,1800,980,680][t%4],amount:(1+t%3)*[2200,1800,980,680][t%4],paymentMethod:["cash","card","paypay","cash"][t%4]})),Na=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function Ie(e){return k(`data/api/latest/store-sales-${e}.json`,Ca)}async function Mt(){return k("data/api/latest/store-orders.json",Na)}async function he(e){const t=await Le("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ot(e){throw new Error("VITE_RESEND_API_KEY is not configured")}const V=Object.freeze(Object.defineProperty({__proto__:null,INVOICE_TYPE_LABELS:Ce,JIKOMI_STATUS_LABELS:Ct,SEASONAL_TEMPLATES:Te,TAX_DEDUCTION_LABELS:Ne,TAX_RATE_CATEGORIES:Rt,fetchBillList:Tt,fetchBillingSummary:Me,fetchCustomerLedger:Re,fetchDeliveryNote:qe,fetchInvoices:be,fetchJikomiList:Nt,fetchKenteiList:At,fetchMasterStats:kt,fetchMaterialList:Lt,fetchPayableList:jt,fetchPaymentStatus:$t,fetchPipelineMeta:St,fetchPurchaseList:Pt,fetchRawMaterialStock:Et,fetchSalesAnalytics:wt,fetchSalesReport:Dt,fetchSalesSummary:ft,fetchStoreOrders:Mt,fetchStoreSales:Ie,fetchTankList:_t,fetchTaxDeclaration:Oe,generateTaxCSV:wa,generateTaxXML:qt,recalculateTaxDeclaration:xa,saveEmailCampaign:he,saveInvoice:xt,saveTaxDeclaration:Da,sendEmailCampaign:Ot},Symbol.toStringTag,{value:"Module"}));function U(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const _a={open:"未締め",closed:"締め済"};function Aa(e,t){const n=e.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${U(s.salesAmount)}</td>
        <td class="numeric">${U(s.taxAmount)}</td>
        <td class="numeric">${U(s.prevBalance)}</td>
        <td class="numeric">${U(s.paymentAmount)}</td>
        <td class="numeric"><strong>${U(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${_a[s.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="billing-print" data-code="${s.customerCode}" ${s.status==="closed"?"":"disabled"}>請求書</button>
        </td>
      </tr>
    `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">月次請求</p>
        <h1>月次請求締め</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年月</span>
          <input id="billing-month" type="month" value="${t}" />
        </label>
        <label class="field">
          <span>締め日</span>
          <select id="billing-day">
            ${[10,15,20,25,31].map(s=>`<option value="${s}" ${e.closingDay===s?"selected":""}>${s}日締め</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="billing-load">集計</button>
        </div>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">請求総額</p>
        <p class="kpi-value">${U(e.totalBilling)}</p>
        <p class="kpi-sub">${e.targetYearMonth} / ${e.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${e.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${e.customers.filter(s=>s.status==="closed").length} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先別請求一覧</h2>
          <p class="panel-caption">${e.targetYearMonth} 分</p>
        </div>
        <button class="button secondary" data-action="billing-close-all">一括締め</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>得意先</th>
              <th class="numeric">締日</th>
              <th class="numeric">売上額</th>
              <th class="numeric">消費税</th>
              <th class="numeric">前回残高</th>
              <th class="numeric">入金額</th>
              <th class="numeric">請求額</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${n}</tbody>
        </table>
      </div>
    </section>
  `}const La={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}]},Pa={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},more:{eyebrow:"その他トップ",title:"周辺業務メニュー",description:"税務、店舗、分析、設定などの補助機能をまとめて配置しています。"}};function Xe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(e){const t=Pa[e],n=La[e].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Xe(s.title)}</p>
            <p class="category-card-description">${Xe(s.description)}</p>
          </div>
          <div class="category-card-actions">
            <button class="button secondary" type="button" data-link="${s.path}">
              開く →
            </button>
          </div>
        </article>
      `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">${t.eyebrow}</p>
        <h1>${t.title}</h1>
        <p class="meta-note">${t.description}</p>
      </div>
    </section>

    <section class="category-grid">
      ${n}
    </section>
  `}function It(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function ee(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ja(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${It(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${ee(t.amount)}</td>
        </tr>
      `).join("")}function Ta(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${It(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${ee(t.amount)}</td>
        </tr>
      `).join("")}function Ea(e,t){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">得意先台帳</p>
        <h1>得意先別売上・入金台帳</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid ledger-filter-grid">
        <label class="field">
          <span>得意先コード</span>
          <input id="ledger-customer-code" type="text" value="${t}" placeholder="C0011" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="ledger-search">検索</button>
        </div>
      </div>
    </section>

    <section class="ledger-grid">
      <article class="panel ledger-summary">
        <div class="panel-header">
          <div>
            <h2>${e.customerName}</h2>
            <p class="panel-caption mono">${e.customerCode}</p>
          </div>
        </div>
        <dl class="summary-list">
          <div>
            <dt>売上累計</dt>
            <dd>${ee(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${ee(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${ee(e.balanceAmount)}</dd>
          </div>
        </dl>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>売上履歴</h2>
            <p class="panel-caption">直近伝票ベース</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>伝票番号</th>
                <th class="numeric">売上額</th>
              </tr>
            </thead>
            <tbody>${ja(e)}</tbody>
          </table>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>入金履歴</h2>
            <p class="panel-caption">入金方法と金額</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>入金方法</th>
                <th class="numeric">入金額</th>
              </tr>
            </thead>
            <tbody>${Ta(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function ie(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function le(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function W(e,t){for(const n of t){const s=e[n];if(typeof s=="number"&&Number.isFinite(s))return s;if(typeof s=="string"){const o=Number(s);if(Number.isFinite(o))return o}}return null}function Ra(e){const t=e?.productTotals;if(!t||t.length===0)return"―";const n=t.reduce((o,i)=>{const c=W(i,["amount","salesAmount"]),l=W(i,["marginRate","grossMarginRate"]);return c===null||c<=0||l===null?o:{weightedAmount:o.weightedAmount+c,weightedRate:o.weightedRate+c*l}},{weightedAmount:0,weightedRate:0});if(n.weightedAmount>0)return`${(n.weightedRate/n.weightedAmount).toFixed(1)}%`;const s=t.reduce((o,i)=>{const c=i,l=W(c,["amount","salesAmount"]),r=W(c,["grossProfit","grossAmount","margin"]),d=W(c,["costAmount","cost","costPrice"]);if(l===null||l<=0)return o;const u=r??(d!==null?l-d:null);return u===null?o:{sales:o.sales+l,gross:o.gross+u}},{sales:0,gross:0});return s.sales>0?`${(s.gross/s.sales*100).toFixed(1)}%`:"―"}function qa(e){const s={top:20,right:20,bottom:30,left:50},o=760-s.left-s.right,i=260-s.top-s.bottom,c=Math.max(...e.map(u=>u.amount),1),l=o/e.length,r=e.map((u,p)=>{const h=u.amount/c*i,f=s.left+p*l+4,P=s.top+i-h,T=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${f}" y="${P}" width="${Math.max(l-8,8)}" height="${h}" rx="4" fill="#0F5B8D" opacity="${.58+p/e.length*.34}" />
          ${p%5===0?`<text x="${f+6}" y="252" class="chart-axis">${T}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=s.top+i-i*u,h=Math.round(c*u/1e3);return`
        <g>
          <line x1="${s.left}" y1="${p}" x2="${760-s.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${h.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${r}
    </svg>
  `}function Ma(e,t,n){const s={success:"正常",warning:"注意",error:"異常",running:"実行中"},o=e.salesRecords.slice(0,10).map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${le(i.date)}</td>
              <td>${i.customerName}</td>
              <td class="numeric">${ie(i.amount)}</td>
            </tr>
          `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${s[t.status]}</span>
        <span class="meta-note">最終同期 ${le(t.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${ie(e.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${e.kpis.todayDelta>0?"+":""}${e.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${ie(e.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${e.kpis.monthDelta>0?"+":""}${e.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${ie(e.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${Ra(n)}</p>
        <p class="kpi-sub">売上分析データから集計</p>
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
        ${qa(e.dailySales)}
      </article>

      <aside class="panel sync-panel">
        <div>
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
              <dd>${le(t.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${le(t.generatedAt)}</dd>
            </div>
          </dl>
        </div>
        <div class="sync-panel-bottom">
          <p class="sync-message">${t.message}</p>
          <div class="quick-links">
            <div class="panel-header">
              <div>
                <h2>クイックリンク</h2>
                <p class="panel-caption">よく使う業務画面へ移動</p>
              </div>
            </div>
            <div class="quick-link-grid">
              <button class="button secondary" type="button" data-link="/invoice-entry">伝票入力</button>
              <button class="button secondary" type="button" data-link="/delivery">納品書</button>
              <button class="button secondary" type="button" data-link="/billing">月次請求</button>
            </div>
          </div>
        </div>
      </aside>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>直近の取引</h2>
          <p class="panel-caption">最新10件の売上伝票</p>
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
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>
  `}function Oa(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function H(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ia(e,t){const n=e.lines.length?e.lines.map((o,i)=>`
          <tr>
            <td class="numeric">${i+1}</td>
            <td class="mono">${o.productCode}</td>
            <td>${o.productName}</td>
            <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
            <td>${o.unit}</td>
            <td class="numeric">${H(o.unitPrice)}</td>
            <td class="numeric">${H(o.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',s=e.totalAmount-e.taxAmount;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">納品書</p>
        <h1>納品書作成・印刷</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="delivery-print" onclick="window.print()">印刷する</button>
      </div>
    </section>

    <section class="panel filter-panel no-print">
      <div class="filter-grid">
        <label class="field">
          <span>伝票番号</span>
          <input id="delivery-docno" type="text" placeholder="D240122" value="${t}" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="delivery-search">呼出し</button>
        </div>
      </div>
    </section>

    <article class="panel delivery-note-body" id="delivery-print-area">
      <div class="delivery-header">
        <div class="delivery-to">
          <p class="delivery-address">${e.customerAddress}</p>
          <h2 class="delivery-customer">${e.customerName} 御中</h2>
          <p class="delivery-label-large">納　品　書</p>
        </div>
        <div class="delivery-meta">
          <table class="delivery-meta-table">
            <tr><th>伝票番号</th><td class="mono">${e.documentNo}</td></tr>
            <tr><th>納品日</th><td>${Oa(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${H(e.totalAmount)}（税込）</td></tr>
          </table>
          <p class="delivery-company">
            金井酒造店<br />
            〒000-0000 〇〇県〇〇市〇〇<br />
            TEL: 000-000-0000
          </p>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="numeric">No.</th>
              <th>商品コード</th>
              <th>商品名</th>
              <th class="numeric">数量</th>
              <th>単位</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
            </tr>
          </thead>
          <tbody>${n}</tbody>
        </table>
      </div>

      <div class="delivery-footer">
        <div class="delivery-totals">
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${H(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${H(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${H(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function E(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Fa(e){return E(e).replaceAll(`
`,"<br />")}function Ja(e){const n=[...Object.values(Te),{id:"custom",season:"カスタム",subject:"",body:""}].map(o=>`
        <button
          class="template-card ${e.selectedTemplateId===o.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${o.id}"
        >
          <span class="template-card-kicker">${o.season}</span>
          <strong>${E(o.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=e.previewRecipients.length?e.previewRecipients.map(o=>`
            <li>
              <span>${E(o.name)}</span>
              <span class="table-sub">${E(o.email)} / ${E(o.area)}</span>
            </li>
          `).join(""):"<li>該当する宛先はありません。</li>";return`
    <section class="page-head">
      <div>
        <p class="eyebrow">メール配信</p>
        <h1>季節商品の案内メール</h1>
      </div>
    </section>

    <section class="broadcast-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>宛先選択</h2>
            <p class="panel-caption">配信対象を選び、想定送信件数を確認します。</p>
          </div>
        </div>
        <div class="option-grid">
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="all" ${e.audienceMode==="all"?"checked":""} />
            <span>全顧客</span>
          </label>
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="area" ${e.audienceMode==="area"?"checked":""} />
            <span>エリア別</span>
          </label>
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="history" ${e.audienceMode==="history"?"checked":""} />
            <span>過去購入履歴で絞り込み</span>
          </label>
        </div>
        <div class="filter-grid email-filter-grid">
          <label class="field">
            <span>エリア</span>
            <select id="email-region">
              <option value="all" ${e.region==="all"?"selected":""}>全エリア</option>
              <option value="北海道" ${e.region==="北海道"?"selected":""}>北海道</option>
              <option value="関東" ${e.region==="関東"?"selected":""}>関東</option>
              <option value="中部" ${e.region==="中部"?"selected":""}>中部</option>
              <option value="関西" ${e.region==="関西"?"selected":""}>関西</option>
              <option value="九州" ${e.region==="九州"?"selected":""}>九州</option>
            </select>
          </label>
          <label class="field">
            <span>購入履歴</span>
            <select id="email-history-segment">
              <option value="seasonal" ${e.historySegment==="seasonal"?"selected":""}>季節商品購入客</option>
              <option value="premium" ${e.historySegment==="premium"?"selected":""}>吟醸系購入客</option>
              <option value="liqueur" ${e.historySegment==="liqueur"?"selected":""}>リキュール購入客</option>
            </select>
          </label>
        </div>
        <p class="recipient-count">${e.recipientCount.toLocaleString("ja-JP")} 件が対象です。</p>
        <ul class="recipient-preview">
          ${s}
        </ul>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>テンプレート選択</h2>
            <p class="panel-caption">季節テンプレートを選ぶと件名と本文に自動反映します。</p>
          </div>
        </div>
        <div class="template-grid">
          ${n}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>本文編集</h2>
            <p class="panel-caption">必要に応じて件名と本文を微調整します。</p>
          </div>
        </div>
        <div class="field">
          <span>件名</span>
          <input id="email-subject" type="text" value="${E(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${E(e.body)}</textarea>
        </div>
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-insert-link">商品リンクを挿入</button>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>プレビュー &amp; 送信</h2>
            <p class="panel-caption">送信前の見え方を確認し、下書き保存または送信操作を行います。</p>
          </div>
        </div>
        <div class="email-preview">
          <p class="panel-title">${E(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?Fa(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${E(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function A(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ce(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function Ba(e,t){const n=[ce("得意先",t.customers.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${A(o.name)}</strong>
            <span class="table-sub mono">${A(o.code)}</span>
          </button>
        `)),ce("商品",t.products.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${A(o.name)}</strong>
            <span class="table-sub mono">${A(o.code)}</span>
          </button>
        `)),ce("伝票",t.documents.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${A(o.documentNo)}</strong>
            <span class="table-sub">${A(o.customerName)} / ${A(o.date)}</span>
          </button>
        `)),ce("ページ",t.pages.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${A(o.path)}"
          >
            <strong>${A(o.title)}</strong>
            <span class="table-sub mono">${A(o.path)}</span>
          </button>
        `))].filter(Boolean).join(""),s=e.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
    <div class="modal-backdrop global-search" data-action="global-search-close">
      <div
        class="modal-panel global-search-panel"
        role="dialog"
        aria-modal="true"
        aria-label="グローバル検索"
      >
        <div class="modal-header">
          <h2>グローバル検索</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="global-search-close">×</button>
        </div>
        <div class="modal-body global-search-body">
          <input
            id="global-search-input"
            type="search"
            value="${A(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function X(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ft(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${X(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${X(e.title)}">
        <div class="modal-header">
          <h2>${X(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${X(e.placeholder)}"
            value="${X(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function re(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ge(e){return e.trim().toLowerCase()}function za(e,t){const n=Ge(t),s=e.filter(i=>n?[i.code,i.name,i.name].map(Ge).some(c=>c.includes(n)):!0).slice(0,50),o=s.length?`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名前</th>
                <th>締日</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(i=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${re(i.code)}"
                      data-name="${re(i.name)}"
                    >
                      <td class="mono">${re(i.code)}</td>
                      <td>${re(i.name)}</td>
                      <td>${i.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Ft({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:o,emptyMessage:"該当する得意先が見つかりません。"})}function Va(e){return e.toISOString().slice(0,10)}function J(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function M(e,t){return e[t]?`<div class="field-error">${J(e[t])}</div>`:""}function Y(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function Ua(e,t,n,s){const o=Object.keys(Ce).map(r=>`<option value="${r}" ${e.invoiceType===r?"selected":""}>${Ce[r]}</option>`).join(""),i=e.lines.map((r,d)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${Y(s,`lines.${d}.productCode`,"input-cell")}" type="text" data-line="${d}" data-field="productCode" value="${J(r.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${d}" aria-label="商品検索">🔍</button>
          </div>
          ${M(s,`lines.${d}.productCode`)}
        </td>
        <td>
          <input class="${Y(s,`lines.${d}.productName`,"input-cell")}" type="text" data-line="${d}" data-field="productName" value="${J(r.productName)}" placeholder="商品名" />
          ${M(s,`lines.${d}.productName`)}
        </td>
        <td>
          <input class="${Y(s,`lines.${d}.quantity`,"input-cell numeric")}" type="number" data-line="${d}" data-field="quantity" value="${r.quantity}" min="0" />
          ${M(s,`lines.${d}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${d}" data-field="unit" value="${r.unit}" placeholder="本" /></td>
        <td>
          <input class="${Y(s,`lines.${d}.unitPrice`,"input-cell numeric")}" type="number" data-line="${d}" data-field="unitPrice" value="${r.unitPrice}" min="0" />
          ${M(s,`lines.${d}.unitPrice`)}
        </td>
        <td class="numeric">${r.amount>0?r.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${d}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${d}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),c=e.lines.reduce((r,d)=>r+d.amount,0),l=Math.floor(c*10/110);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">伝票入力</p>
        <h1>売上伝票入力</h1>
      </div>
      ${t?`<div class="meta-stack"><span class="status-pill success">保存済 ${t}</span></div>`:""}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>伝票基本情報</h2>
        <button class="button secondary" type="button" data-action="copy-past-invoice">過去伝票から複製</button>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>伝票種別</span>
          <select id="inv-type">${o}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${Y(s,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Va(new Date)}" />
          ${M(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${Y(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${J(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${M(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${J(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${J(e.staffCode)}" />
        </label>
      </div>
      ${M(s,"lines")}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${e.lines.length} 行</p>
        </div>
        <button class="button secondary" data-action="add-line">＋ 行追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>商品コード</th>
              <th>商品名</th>
              <th class="numeric">数量</th>
              <th>単位</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="invoice-lines">${i||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(c-l).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${l.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${c.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${J(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function Ha(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Ya(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ka(e,t){const n=e.length?e.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${Ha(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${s.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Ya(s.amount)}</td>
            </tr>
          `).join(""):'<tr><td colspan="5" class="empty-row">データなし</td></tr>';return`
    <section class="page-head">
      <div>
        <p class="eyebrow">伝票照会</p>
        <h1>売上伝票検索</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid invoice-filter-grid">
        <label class="field">
          <span>伝票番号</span>
          <input id="invoice-document-no" type="text" value="${t.documentNo}" placeholder="D240100" />
        </label>
        <label class="field">
          <span>開始日</span>
          <input id="invoice-start" type="date" value="${t.startDate}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="invoice-end" type="date" value="${t.endDate}" />
        </label>
        <label class="field">
          <span>得意先コード</span>
          <input id="invoice-customer-code" type="text" value="${t.customerCode}" placeholder="C0011" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="invoice-filter">絞り込む</button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>伝票一覧</h2>
          <p class="panel-caption">${e.length.toLocaleString("ja-JP")} 件</p>
        </div>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>伝票番号</th>
              <th>日付</th>
              <th>得意先</th>
              <th class="numeric">明細数</th>
              <th class="numeric">金額</th>
            </tr>
          </thead>
          <tbody>${n}</tbody>
        </table>
      </div>
      ${e.length===0?'<p class="empty-note">条件に一致する伝票はありません。</p>':""}
    </section>
  `}function Qa(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Wa(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Jt(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Bt(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Ze(e){const t=Jt(Bt(e),6);return t.setHours(23,59,59,999),t}function et(e){return new Date(`${e}T00:00:00`)}function tt(e){return`${e.getMonth()+1}/${e.getDate()}`}function Xa(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Ga(){const e=new Date,t=Bt(Wa(Qa(e),-3)),n=Ze(new Date(e.getFullYear(),e.getMonth()+4,0)),s=[];let o=new Date(t);for(;o<=n;){const i=Ze(o);s.push({start:new Date(o),end:i,label:`${tt(o)} - ${tt(i)}`}),o=Jt(o,7)}return s}function Za(e){const t=Ga(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,s=t.map(i=>`
        <div class="gantt-week">
          <span>${i.label}</span>
        </div>
      `).join(""),o=e.length?e.map(i=>{const c=et(i.startDate),l=et(i.expectedDoneDate),r=Math.max(0,t.findIndex(p=>p.end>=c)),d=Math.max(r,t.reduce((p,h,f)=>h.start<=l?f:p,r)),u=[`仕込番号: ${i.jikomiNo}`,`銘柄: ${i.productName}`,`期間: ${i.startDate} - ${i.expectedDoneDate}`,`タンク: ${i.tankNo}`,`備考: ${i.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${i.jikomiNo}</strong>
                <span class="table-sub">${i.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${i.status}"
                  style="grid-column:${r+1} / ${d+2}"
                  title="${Xa(u)}"
                >
                  ${i.jikomiNo} / ${i.productName}
                </div>
              </div>
            </div>
          `}).join(""):'<p class="empty-note">仕込データがありません。</p>';return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>仕込カレンダー</h2>
          <p class="panel-caption">現在月を中心に前後3ヶ月を週単位で表示</p>
        </div>
      </div>
      <div class="gantt-wrap">
        <div class="gantt-grid" style="grid-template-columns:${n}">
          <div class="gantt-corner">仕込</div>
          ${s}
        </div>
        ${o}
      </div>
    </section>
  `}function at(e,t){const n={planned:"neutral",active:"warning",done:"success"},s=e.map(l=>`
      <tr>
        <td class="mono">${l.jikomiNo}</td>
        <td>${l.productName}</td>
        <td>${l.riceType}</td>
        <td class="numeric">${l.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${l.actualKg>0?l.actualKg.toLocaleString("ja-JP")+" kg":"―"}</td>
        <td>${l.startDate}</td>
        <td>${l.expectedDoneDate}</td>
        <td class="mono">${l.tankNo}</td>
        <td>
          <span class="status-pill ${n[l.status]}">${Ct[l.status]}</span>
        </td>
        <td>${l.note||"―"}</td>
      </tr>
    `).join(""),o=e.filter(l=>l.status==="active").length,i=e.filter(l=>l.status==="done").length,c=e.filter(l=>l.status==="planned").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>仕込管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="jikomi-new">＋ 新規仕込</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">仕込中</p>
        <p class="kpi-value">${o} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${c} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${i} 本</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header tabs-header">
        <div>
          <h2>表示切替</h2>
          <p class="panel-caption">一覧とカレンダーを切り替えます。</p>
        </div>
        <div class="tab-group">
          <button class="tab-button ${t==="list"?"active":""}" data-jikomi-tab="list">一覧</button>
          <button class="tab-button ${t==="calendar"?"active":""}" data-jikomi-tab="calendar">カレンダー</button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>仕込一覧</h2>
          <p class="panel-caption">${e.length} 件</p>
        </div>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>仕込番号</th>
              <th>銘柄</th>
              <th>原料米</th>
              <th class="numeric">計画量</th>
              <th class="numeric">実績量</th>
              <th>開始日</th>
              <th>完了予定日</th>
              <th>タンク</th>
              <th>状態</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function es(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=e.map(r=>`
      <tr>
        <td class="mono">${r.kenteiNo}</td>
        <td class="mono">${r.jikomiNo}</td>
        <td>${r.productName}</td>
        <td>${r.kenteiDate}</td>
        <td class="numeric">${r.alcoholDegree>0?r.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${r.extractDegree>0?r.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${r.sakaMeterValue!==0?r.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${r.volume>0?r.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${r.taxCategory}</td>
        <td>
          <span class="status-pill ${n[r.status]}">${t[r.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${r.id}">
            ${r.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),o=e.filter(r=>r.status==="approved").length,i=e.filter(r=>r.status==="submitted").length,c=e.filter(r=>r.status==="pending").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>検定管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="kentei-new">＋ 新規検定</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">承認済容量</p>
        <p class="kpi-value">${e.filter(r=>r.status==="approved").reduce((r,d)=>r+d.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${i} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${c} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>検定一覧</h2>
          <p class="panel-caption">承認済 ${o} 件 / 合計 ${e.length} 件</p>
        </div>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>検定番号</th>
              <th>仕込番号</th>
              <th>銘柄</th>
              <th>検定日</th>
              <th class="numeric">アルコール度数</th>
              <th class="numeric">エキス分</th>
              <th class="numeric">酒度</th>
              <th class="numeric">容量</th>
              <th>酒類区分</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ts(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function as(e,t){return`
    <section class="login-screen">
      <div class="login-card panel">
        <p class="eyebrow">Supabase Auth</p>
        <h1>業務Web UI ログイン</h1>
        <p class="panel-caption">メールアドレスとパスワードでログインします。</p>
        <div class="field">
          <span>メールアドレス</span>
          <input id="auth-email" type="email" placeholder="user@example.com" autocomplete="email" />
        </div>
        <div class="field">
          <span>パスワード</span>
          <input id="auth-password" type="password" placeholder="••••••••" autocomplete="current-password" />
        </div>
        ${e?`<p class="field-error">${ts(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function ss(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${t.closingDay}日</td>
          <td class="numeric">${t.paymentDay}日</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function ns(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td class="mono">${t.janCode}</td>
          <td>${t.name}</td>
          <td>${t.category}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function os(e,t){return`
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
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
          <div class="tab-group">
            <button class="tab-button ${t==="customers"?"active":""}" data-tab="customers">得意先一覧</button>
            <button class="tab-button ${t==="products"?"active":""}" data-tab="products">商品一覧</button>
          </div>
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
            <tbody>${ss(e.customers)}</tbody>
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
            <tbody>${ns(e.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function $e(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function is(e){const t=e.map(o=>{const c=(o.minimumStock>0?o.currentStock/o.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${o.code}</td>
          <td>${o.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${o.currentStock.toLocaleString("ja-JP")} ${o.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${o.minimumStock.toLocaleString("ja-JP")} ${o.unit}</td>
          <td class="numeric">${$e(o.unitCost)}</td>
          <td class="numeric">${$e(o.currentStock*o.unitCost)}</td>
          <td>${o.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${o.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(o=>o.minimumStock>0&&o.currentStock/o.minimumStock<1.5).length,s=e.reduce((o,i)=>o+i.currentStock*i.unitCost,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>資材在庫管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="material-receive">＋ 資材受入</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">在庫評価額</p>
        <p class="kpi-value">${$e(s)}</p>
        <p class="kpi-sub">${e.length} 品目</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">要補充</p>
        <p class="kpi-value ${n>0?"text-danger":""}">${n} 品目</p>
        <p class="kpi-sub">最低在庫を下回る恐れ</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>資材一覧</h2>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>品名</th>
              <th class="numeric">現在庫</th>
              <th class="numeric">最低在庫</th>
              <th class="numeric">単価</th>
              <th class="numeric">在庫金額</th>
              <th>更新日</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${t||'<tr><td colspan="8" class="empty-row">資材データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ls(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const cs={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function rs(e){return`
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
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
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
          <tbody>${e.map(n=>`
        <tr>
          <td>
            <div class="table-title">${n.customerName}</div>
            <div class="table-sub mono">${n.customerCode}</div>
          </td>
          <td class="numeric">${ke(n.billedAmount)}</td>
          <td class="numeric">${ke(n.paymentAmount)}</td>
          <td class="numeric">${ke(n.balanceAmount)}</td>
          <td>${ls(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${cs[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function K(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function st(e){return e.trim().toLowerCase()}function ds(e,t){const n=st(t),s=e.filter(i=>n?[i.code,i.name,i.janCode].map(st).some(c=>c.includes(n)):!0),o=s.length?`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名前</th>
                <th>JAN</th>
                <th>カテゴリ</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(i=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${K(i.code)}"
                      data-name="${K(i.name)}"
                    >
                      <td class="mono">${K(i.code)}</td>
                      <td>${K(i.name)}</td>
                      <td class="mono">${K(i.janCode)}</td>
                      <td>${K(i.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Ft({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:o,emptyMessage:"該当する商品が見つかりません。"})}function O(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function us(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},o={unpaid:"未払い",partial:"一部支払",paid:"支払済"},i={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${O(p.unitPrice)}</td>
        <td class="numeric"><strong>${O(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[p.status]}">${n[p.status]}</span>
        </td>
      </tr>
    `).join(""),l=t.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${O(p.totalPurchase)}</td>
        <td class="numeric">${O(p.paidAmount)}</td>
        <td class="numeric"><strong>${O(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${i[p.status]}">${o[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),r=e.reduce((p,h)=>p+h.amount,0),d=t.reduce((p,h)=>p+h.balance,0),u=t.filter(p=>p.status!=="paid").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>仕入伝票・買掛管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="purchase-new">＋ 仕入入力</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">今月仕入合計</p>
        <p class="kpi-value">${O(r)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${O(d)}</p>
        <p class="kpi-sub">未払い ${u} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>仕入伝票一覧</h2>
          <p class="panel-caption">${e.length} 件</p>
        </div>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>伝票番号</th>
              <th>仕入日</th>
              <th>仕入先コード</th>
              <th>仕入先名</th>
              <th>品目</th>
              <th class="numeric">数量</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>${c||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>買掛残高一覧</h2>
        <p class="panel-caption">${t.length} 社</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>仕入先コード</th>
              <th>仕入先名</th>
              <th class="numeric">仕入総額</th>
              <th class="numeric">支払済</th>
              <th class="numeric">残高</th>
              <th>次回支払日</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${l||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function G(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ps(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},o=e.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${G(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${s[u.status]}">${n[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${u.id}" ${u.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),i=t.map(u=>{const p=u.minimumStock>0&&u.currentStock<u.minimumStock*1.2;return`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${u.currentStock.toLocaleString("ja-JP")} ${u.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${u.minimumStock.toLocaleString("ja-JP")} ${u.unit}</td>
          <td class="numeric">${G(u.unitCost)}</td>
          <td class="numeric">${G(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(u=>u.status==="holding"),l=c.reduce((u,p)=>u+p.amount,0),r=t.reduce((u,p)=>u+p.currentStock*p.unitCost,0),d=t.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${G(l)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${G(r)}</p>
        <p class="kpi-sub">要補充 ${d} 品目</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>手形一覧</h2>
        <p class="panel-caption">${e.length} 枚</p>
        <button class="button secondary" data-action="bill-new">＋ 手形登録</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>手形番号</th>
              <th>振出先</th>
              <th class="numeric">金額</th>
              <th>振出日</th>
              <th>支払期日</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${o||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>原料在庫</h2>
        <p class="panel-caption">${t.length} 品目</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>品名</th>
              <th class="numeric">現在庫</th>
              <th class="numeric">最低在庫</th>
              <th class="numeric">単価</th>
              <th class="numeric">在庫金額</th>
              <th>最終仕入日</th>
            </tr>
          </thead>
          <tbody>${i||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ms(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function D(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function _e(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${D(e)}</pre>
    </div>
  `}function hs(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function de(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${D(e)}</code>
      ${hs(e)}
    </div>
  `}function Q(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${D(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${D(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${D(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?_e(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${D(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${D(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function ue(e){return`
    <div class="setup-step setup-step-compact" data-step="${D(e.stepLabel)}">
      <h3>${D(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${D(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function ys(e,t,n){const s={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${ms(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${s[e.status]}</span>
        </p>
        <p class="kpi-sub">${D(e.message)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期ファイル数</p>
        <p class="kpi-value">4モジュール</p>
        <p class="kpi-sub">固定表示</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>このページでできること</h2>
        </div>
      </div>
      <div class="summary-list">
        <div>
          <dt>なぜ連動が必要か</dt>
          <dd>酒仙iサーバーのデータを自動でWebに反映し、現場とWebUIの数字を揃えるためです。</dd>
        </div>
        <div>
          <dt>何が起きるか</dt>
          <dd>設定後は約5分ごとに同期が走り、売上・入金・マスタがWebUIへ反映されます。</dd>
        </div>
        <div>
          <dt>準備するもの</dt>
          <dd>WindowsのPC1台、酒仙iサーバーへのネットワークアクセス、インターネット接続が必要です。</dd>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>WEB連動PC_A セットアップ手順</h2>
        </div>
      </div>
      <div class="setup-step setup-step-compact" data-step="準備">
        <h3>事前準備 — 必要なソフトウェアの確認</h3>
        <p>以下のソフトウェアがPCにインストールされているか確認します。入っていない場合は指示に従ってインストールしてください。</p>
      </div>
      <div class="setup-step setup-step-compact" data-step="補足">
        <h3>コマンドプロンプトの開き方</h3>
        <ol class="setup-list">
          <li>Windowsキー + R を押す</li>
          <li>表示されたウィンドウに「cmd」と入力してEnter</li>
          <li>黒い画面が開く（これがコマンドプロンプト）</li>
        </ol>
      </div>
      ${ue({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${de("git --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>「認識されていません」等のエラーが出れば未インストールです。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>方法A（推奨）: <a href="https://git-scm.com/download/win" target="_blank" rel="noreferrer">https://git-scm.com/download/win</a> にアクセスし、64bit Gitをダウンロードしてインストーラーを「次へ」のまま進めて完了します。</p>
          <p>方法B（Gitを入れたくない場合）:</p>
          <ol class="setup-list">
            <li><a href="https://github.com/yuuuuuuuuki01/sake-system" target="_blank" rel="noreferrer">https://github.com/yuuuuuuuuki01/sake-system</a> にアクセス</li>
            <li>緑の「Code」ボタン→「Download ZIP」をクリック</li>
            <li>ダウンロードしたZIPを C:\\sake-relay\\ に解凍</li>
            <li>Step2の「git clone」はスキップしてOK</li>
          </ol>
        `})}
      ${ue({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${de("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${ue({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${de("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${de("python get-pip.py")}
        `})}
      ${ue({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${Q({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${Q({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${Q({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${Q({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${Q({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${Q({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>ODBCドライバ確認</h2>
        </div>
      </div>
      <p>確認方法: 「スタート」→「ODBCデータソース（64ビット）」→「ドライバー」タブ</p>
      <p>Magic ODBCドライバがあれば <span class="mono">use_odbc: true</span> を設定します。</p>
      <p>なければ <span class="mono">use_odbc: false</span> でバイナリ直読みモードを使います。</p>
      <div class="content-grid relay-odbc-grid">
        <div>
          <h3>ODBCあり</h3>
          ${_e(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${_e(`{
  "use_odbc": false
}`)}
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>relay_config.json 設定項目</h2>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>キー</th>
              <th>説明</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="mono">supabase_url</td>
              <td>SupabaseのプロジェクトURL</td>
              <td class="mono">https://xxx.supabase.co</td>
            </tr>
            <tr>
              <td class="mono">supabase_anon_key</td>
              <td>Supabase Anon Key</td>
              <td>Settings &gt; API から取得</td>
            </tr>
            <tr>
              <td class="mono">z_drive_path</td>
              <td>酒仙iサーバーのZドライブパス</td>
              <td class="mono">Z:\\</td>
            </tr>
            <tr>
              <td class="mono">sync_modules</td>
              <td>同期するモジュール</td>
              <td class="mono">["sk","sh","k5","h5"]</td>
            </tr>
            <tr>
              <td class="mono">interval_minutes</td>
              <td>同期間隔（分）</td>
              <td class="mono">5</td>
            </tr>
            <tr>
              <td class="mono">use_odbc</td>
              <td>ODBCドライバを使うか</td>
              <td class="mono">true / false</td>
            </tr>
            <tr>
              <td class="mono">odbc_dsn</td>
              <td>ODBCデータソース名</td>
              <td class="mono">MagicSake</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel kpi-alert">
      <div class="panel-header">
        <div>
          <h2>⚡ かんたんセットアップ：設定ファイルを自動生成</h2>
          <p class="panel-caption">ボタン1つで設定済みの <code>relay_config.json</code> をダウンロードできます。中身は編集不要で、そのまま relay フォルダに保存するだけでOKです。</p>
        </div>
      </div>
      <div class="action-bar-large">
        <button
          class="button primary"
          type="button"
          data-action="download-relay-config"
          style="font-size: 15px; padding: 14px 28px;"
        >
          📥 relay_config.json をダウンロード
        </button>
      </div>
      <p class="form-hint" style="margin-top: 12px;">
        保存場所: WEB連動PCの <code>relay</code> フォルダ（<code>relay_agent.py</code> と同じ場所）に置いてください。上書き保存でOKです。
      </p>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>接続情報（手動で設定する方用）</h2>
        </div>
      </div>
      <div class="relay-config-list">
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase URL</p>
            <span class="config-value">${D(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${D(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${D("（未設定：Supabaseダッシュボードから取得してください）")}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${D(n)}"
          >
            コピー
          </button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>よくある質問</h2>
        </div>
      </div>
      <div class="summary-list">
        <div>
          <dt>Q. relay_log.txt が作られない</dt>
          <dd>A. 権限エラーの可能性があります。フォルダを書き込み可能な場所（例: C:\\sake-relay\\）へ移動してください。</dd>
        </div>
        <div>
          <dt>Q. Z: ドライブが見えない</dt>
          <dd>A. 酒仙iサーバーの共有フォルダが正しく繋がっているか確認してください。</dd>
        </div>
        <div>
          <dt>Q. ODBCドライバがない</dt>
          <dd>A. use_odbc: false に設定し、バイナリ直読みモードで動かしてください。</dd>
        </div>
        <div>
          <dt>Q. Supabase に接続できない</dt>
          <dd>A. supabase_anon_key が正しいか、インターネット接続があるか確認してください。</dd>
        </div>
        <div>
          <dt>Q. 同期が動かない</dt>
          <dd>A. タスクスケジューラに SakeRelay があるか確認し、手動実行は python relay_agent.py を使ってログを確認してください。</dd>
        </div>
        <div>
          <dt>Q. Webページを開くと 404 が表示される</dt>
          <dd>A. ブラウザのキャッシュが古い可能性があります。Ctrl+Shift+R（Mac: Cmd+Shift+R）でハードリフレッシュするか、シークレット/プライベートウィンドウで開き直してください。それでも出る場合はトップページ(/sake-system/)から辿ってください。</dd>
        </div>
        <div>
          <dt>Q. バッチファイル(setup_scheduler.bat)がすぐ閉じる</dt>
          <dd>A. ダブルクリックではなく右クリック→「管理者として実行」を使ってください。管理者権限がないとタスク登録自体が失敗します。</dd>
        </div>
        <div>
          <dt>Q. タスクスケジューラで5分間隔が選べない</dt>
          <dd>A. 「基本タスクの作成」では日単位までしか選べません。作成後にタスクをダブルクリック → 「トリガー」タブ → トリガーをダブルクリック → 「繰り返し間隔」を有効化して5分に設定してください。</dd>
        </div>
        <div>
          <dt>Q. ネットワークドライブに認証情報が必要だがパスワードが分からない</dt>
          <dd>A. 既に接続できているPCで「資格情報マネージャー」を開き、「資格情報のバックアップ」で.crdファイルを作成。新PCに持ち込んで「資格情報の復元」すればパスワードを覗かずに移行できます。パスワードを表示したい場合はNirSoft社の無料ツール NetPass（https://www.nirsoft.net/utils/network_password_recovery.html）が使えます（管理者権限で実行、一部セキュリティソフトが警告する場合あり）。</dd>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>用語集</h2>
        </div>
      </div>
      <div class="summary-list">
        <div><dt>Python</dt><dd>今回の同期スクリプトを動かすプログラミング言語です。</dd></div>
        <div><dt>ODBC</dt><dd>データベースに標準で繋ぐ仕組みです。Magic にこれがあれば高速かつ正確に同期できます。</dd></div>
        <div><dt>DSN</dt><dd>ODBC の接続設定名です。</dd></div>
        <div><dt>Supabase</dt><dd>クラウドデータベースです。WebUI が読むデータをここに保存します。</dd></div>
        <div><dt>タスクスケジューラ</dt><dd>Windows 標準の定期実行機能です。</dd></div>
        <div><dt>Anon Key</dt><dd>Supabase に接続するための暗号のようなパスワードです。</dd></div>
        <div><dt>Z:ドライブ</dt><dd>酒仙i サーバーのデータ保管場所です。</dd></div>
      </div>
    </section>
  `}function vs(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bs(e){return e.replace("-","/")}function gs(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=760,n=280,s={top:16,right:24,bottom:36,left:64},o=t-s.left-s.right,i=n-s.top-s.bottom,c=Math.max(...e.map(u=>u.amount),1),l=o/e.length,r=[0,.25,.5,.75,1].map(u=>{const p=s.top+i-i*u,h=`${Math.round(c*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${s.left}" y1="${p}" x2="${t-s.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${h}</text>
        </g>
      `}).join(""),d=e.map((u,p)=>{const h=u.amount/c*i,f=Math.max(l-18,24),P=s.left+p*l+(l-f)/2,T=s.top+i-h;return`
        <g>
          <rect x="${P}" y="${T}" width="${f}" height="${h}" rx="6" class="analytics-bar" />
          <text x="${P+f/2}" y="${n-10}" class="chart-axis centered-axis">${bs(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${t} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${r}
      ${d}
    </svg>
  `}function fs(e){return e.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${vs(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function $s(e,t){const n=t==="products"?"商品別集計":"得意先別集計",s=t==="products"?e.productTotals:e.customerTotals;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>月別売上</h2>
            <p class="panel-caption">直近月の売上推移</p>
          </div>
        </div>
        ${gs(e.monthlySales)}
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${n}</h2>
            <p class="panel-caption">売上金額順に表示</p>
          </div>
          <div class="tab-group">
            <button class="tab-button ${t==="products"?"active":""}" data-analytics-tab="products">商品別</button>
            <button class="tab-button ${t==="customers"?"active":""}" data-analytics-tab="customers">得意先別</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名称</th>
                <th class="numeric">売上額</th>
                <th class="numeric">数量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${fs(s)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function Z(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ks(e){const t=Math.max(...e.salesByProduct.flatMap(i=>i.values),1),n=e.salesByProduct.map(i=>{const c=i.values.map((l,r)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(l/t*120)}px" title="${e.months[r]}: ${Z(l)}"></div>
            <span class="bar-label">${e.months[r].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${i.label}</p>
          <div class="bar-chart">${c}</div>
        </div>
      `}).join(""),s=e.costSimulation.map(i=>`
      <tr>
        <td class="mono">${i.productCode}</td>
        <td>${i.productName}</td>
        <td class="numeric">${Z(i.costPrice)}</td>
        <td class="numeric">${Z(i.sellPrice)}</td>
        <td class="numeric">${Z(i.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${i.marginRate>=40?"success":"warning"}">${i.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),o=e.salesByCustomer.map(i=>{const c=i.values.reduce((l,r)=>l+r,0);return`
        <tr>
          <td>${i.label}</td>
          ${i.values.map(l=>`<td class="numeric">${(l/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${Z(c)}</strong></td>
        </tr>
      `}).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">集計帳票</p>
        <h1>売上集計・原価シミュレーション</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品別月次売上</h2>
      </div>
      <div class="chart-wrap">${n}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>得意先別売上（年次）</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>得意先</th>
              ${e.months.map(i=>`<th class="numeric">${i}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>原価シミュレーション</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>商品コード</th>
              <th>商品名</th>
              <th class="numeric">原価</th>
              <th class="numeric">売価</th>
              <th class="numeric">粗利</th>
              <th class="numeric">粗利率</th>
            </tr>
          </thead>
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}function Ss(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function ws(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function nt(e){return e.toISOString().slice(0,10)}function xs(e,t,n){const s=e.length?e.map(o=>`
            <tr>
              <td class="mono">${o.documentNo}</td>
              <td>${Ss(o.date)}</td>
              <td>
                <div class="table-title">${o.customerName}</div>
                <div class="table-sub mono">${o.customerCode}</div>
              </td>
              <td class="numeric">${ws(o.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||nt(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||nt(new Date)}" />
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
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}function pe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ds(e,t,n,s){const o={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},i={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},l=e.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${pe(p.unitPrice)}</td>
        <td class="numeric"><strong>${pe(p.amount)}</strong></td>
        <td>${o[p.paymentMethod]}</td>
      </tr>
    `).join(""),r=t.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(h=>`${h.productName} ×${h.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${pe(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[p.status]}">${i[p.status]}</span>
        </td>
        <td>${p.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${p.id}">詳細</button>
        </td>
      </tr>
    `).join(""),d=e.reduce((p,h)=>p+h.amount,0),u=t.filter(p=>p.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${pe(d)}</p>
        <p class="kpi-sub">${e.length} 件 / ${s}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${u} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">${t.length} 件</p>
        <p class="kpi-sub">宅配・通販</p>
      </article>
    </section>

    <section class="panel">
      <div class="tab-bar">
        <button class="tab-btn ${n==="pos"?"active":""}" data-store-tab="pos">直売所レジ</button>
        <button class="tab-btn ${n==="orders"?"active":""}" data-store-tab="orders">受注・宅配</button>
      </div>

      ${n==="pos"?`
        <div class="panel-header">
          <div>
            <h2>直売所販売履歴</h2>
          </div>
          <label class="field" style="display:flex;align-items:center;gap:8px">
            <span style="white-space:nowrap">販売日</span>
            <input id="store-date" type="date" value="${s}" style="width:160px" />
            <button class="button secondary" data-action="store-load">表示</button>
          </label>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>時刻</th>
                <th>商品コード</th>
                <th>商品名</th>
                <th class="numeric">数量</th>
                <th class="numeric">単価</th>
                <th class="numeric">金額</th>
                <th>支払方法</th>
              </tr>
            </thead>
            <tbody>${l||'<tr><td colspan="7" class="empty-row">販売データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `:`
        <div class="panel-header">
          <h2>受注・宅配一覧</h2>
          <button class="button secondary" data-action="order-new">＋ 受注登録</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>注文番号</th>
                <th>受注日</th>
                <th>お客様名</th>
                <th>住所</th>
                <th>商品</th>
                <th class="numeric">合計</th>
                <th>状態</th>
                <th>発送日</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${r||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}const Se={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Cs={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Ns(e,t,n,s){const o=Cs[e],i=Object.keys(Se).map(l=>`
      <button class="tab-button ${e===l?"active":""}" data-import-entity="${l}">
        ${Se[l]}
      </button>
    `).join(""),c=t?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>プレビュー（先頭10件 / 全${t.totalRows}件）</h2>
          <p class="panel-caption">
            OK: ${t.validRows}件 / NG: ${t.invalidRows}件
          </p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              ${t.columns.map(l=>`<th>${l}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${t.rows.slice(0,10).map((l,r)=>`
              <tr class="${l._valid?"":"has-error"}">
                <td>${r+1}</td>
                ${t.columns.map(d=>`<td>${String(l[d]??"")}</td>`).join("")}
                <td>${l._valid?'<span class="status-pill success">OK</span>':`<span class="status-pill warning">${l._error??"NG"}</span>`}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="action-bar">
        <button class="button secondary" data-action="import-cancel">キャンセル</button>
        <button class="button primary" data-action="import-execute"
          ${n||t.validRows===0?"disabled":""}>
          ${n?"取り込み中…":`${t.validRows}件をSupabaseに登録`}
        </button>
      </div>
    </section>
  `:"";return`
    <section class="page-head">
      <div>
        <p class="eyebrow">データ投入</p>
        <h1>CSV/Excelインポート</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>対象エンティティ</h2>
      </div>
      <div class="tab-group" style="flex-wrap: wrap;">${i}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${Se[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${o.required.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${o.optional.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
        </div>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="download-template" data-entity="${e}">
          📥 テンプレートCSVダウンロード
        </button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>ファイル選択</h2>
      </div>
      <label class="field">
        <span>CSVファイル (UTF-8)</span>
        <input id="import-file" type="file" accept=".csv,text/csv" />
      </label>
      <div class="action-bar">
        <button class="button primary" data-action="import-parse">プレビュー表示</button>
      </div>
    </section>

    ${c}

    ${s?`<section class="panel"><p class="sync-message">${s}</p></section>`:""}
  `}const g={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function _s(e,t,n){const s=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:g.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:g.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:g.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:g.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:g.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:g.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:g.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:g.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:g.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:g.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:g.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:g.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:g.date}];e.lines.slice(0,6).forEach((c,l)=>{const r=33+l*8.5;s.push({id:`line${l}_name`,label:`明細${l+1} 品名`,x:5,y:r,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:g.detail},{id:`line${l}_code`,label:`明細${l+1} CD`,x:64,y:r,fontSize:7.5,value:c.productCode,color:g.detail},{id:`line${l}_qty`,label:`明細${l+1} 数量`,x:124,y:r,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:g.detail},{id:`line${l}_price`,label:`明細${l+1} 原単価`,x:163,y:r,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:g.detail},{id:`line${l}_amount`,label:`明細${l+1} 原価金額`,x:176,y:r,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:g.detail},{id:`line${l}_retail`,label:`明細${l+1} 売単価`,x:193,y:r,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:g.detail})});const o=e.lines.reduce((c,l)=>c+(l.amount||0),0),i=e.lines.reduce((c,l)=>c+l.quantity,0);return s.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(i),color:g.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:o.toLocaleString("ja-JP"),color:g.total}),n&&s.forEach(c=>{const l=n[c.id];l&&(c.x=l.x,c.y=l.y)}),s}function As(e,t,n,s,o){const c=_s(e,t,s).map(r=>`
      <div class="fd-field ${o?"fd-draggable":""}"
           data-fd-id="${r.id}"
           style="left:${r.x}mm; top:${r.y}mm; font-size:${r.fontSize}pt; --fd-color:${r.color};"
           title="${r.label} (${r.x.toFixed(1)}, ${r.y.toFixed(1)})">
        ${o?`<span class="fd-badge">${r.label}</span>`:""}
        <span class="fd-value">${r.value}</span>
      </div>
    `).join(""),l=n.showReferenceOverlay&&n.overlayImageUrl?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">帳票デザイナー</p>
        <h1>BP1701 フォーム配置</h1>
      </div>
      <div class="meta-stack">
        <button class="button ${o?"primary":"secondary"}" data-action="fd-toggle-design">
          ${o?"🔧 配置モードON":"▶ プレビューモード"}
        </button>
        <button class="button secondary" data-action="fd-save-positions">💾 位置を保存</button>
        <button class="button secondary" data-action="fd-reset-positions">🔄 初期化</button>
        <button class="button primary" onclick="window.print()">🖨️ 印刷</button>
      </div>
    </section>

    ${o?`
    <section class="panel no-print">
      <p class="form-hint" style="margin:0;">
        <strong>配置モード:</strong> テキストボックスを<b>ドラッグ</b>して帳票の枠に合わせてください。
        位置は「💾 位置を保存」でブラウザに記憶します。<br/>
        色分け: <span style="color:${g.header}">■ ヘッダー</span>
        <span style="color:${g.code}">■ コード</span>
        <span style="color:${g.date}">■ 日付</span>
        <span style="color:${g.detail}">■ 明細</span>
        <span style="color:${g.total}">■ 合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas" style="${l}">
        ${c}
      </div>
    </section>

    ${o?`
    <section class="panel no-print">
      <div class="panel-header">
        <h2>選択フィールド</h2>
      </div>
      <div id="fd-selected-info" class="form-hint">フィールドをクリックすると詳細が表示されます</div>
      <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
        <label class="field">
          <span>X (mm)</span>
          <input type="number" id="fd-sel-x" step="0.5" value="0" data-action="fd-nudge-x" />
        </label>
        <label class="field">
          <span>Y (mm)</span>
          <input type="number" id="fd-sel-y" step="0.5" value="0" data-action="fd-nudge-y" />
        </label>
        <label class="field">
          <span>フォントサイズ (pt)</span>
          <input type="number" id="fd-sel-fs" step="0.5" value="8" />
        </label>
      </div>
      <p class="form-hint" style="margin-top:8px;">方向キー(↑↓←→)でも0.5mm単位で微調整できます。</p>
    </section>
    `:""}

    <section class="panel no-print">
      <div class="panel-header"><h2>画像オーバーレイ</h2></div>
      <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center;">
        <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${n.showReferenceOverlay?"checked":""} /> 参考画像表示</label>
        <label style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">濃さ</span>
          <input type="range" min="0" max="1" step="0.05" value="${n.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
        </label>
      </div>
    </section>
  `}function Ls(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const s=n.dataset.fdId??"",o=parseFloat(n.style.left)||0,i=parseFloat(n.style.top)||0;t[s]={x:o,y:i}}),t}const ot={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Ps={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},js={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function $(e){return"¥"+e.toLocaleString("ja-JP")}function te(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function zt(e,t){const n=e.reduce((i,c)=>i+c.amount,0),s=Math.floor(n*t),o=n+s;return{subtotal:n,taxAmount:s,total:o}}const v={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function b(e,t){const n=e.align??"left",s=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function we(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Ts(e,t,n){const s=we(e.documentDate),o=we(e.orderDate??e.documentDate),i=we(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((y,S)=>{const B=v.detailStartY+S*v.detailRowH,N=v.detailCols,ne=[],w=(z,Ve)=>{Ve&&ne.push(b({...z,y:B,x:z.x+0},Ve))};return w(N.productName,y.productName+(y.spec?` ${y.spec}`:"")),w(N.productCode,y.productCode),w(N.color,y.color??""),w(N.size,[y.size,y.caseQty?`×${y.caseQty}`:""].filter(Boolean).join(" ")),w(N.unit,y.unit),w(N.quantity,y.quantity>0?y.quantity.toLocaleString("ja-JP"):""),w(N.correctedQty,y.correctedQuantity?y.correctedQuantity.toLocaleString("ja-JP"):""),w(N.discount,y.discount?y.discount.toLocaleString("ja-JP"):""),w(N.unitPrice,y.unitPrice>0?y.unitPrice.toLocaleString("ja-JP"):""),w(N.costAmount,y.amount>0?y.amount.toLocaleString("ja-JP"):""),w(N.retailPrice,y.retailPrice?y.retailPrice.toLocaleString("ja-JP"):""),w(N.note,y.receivedAmount?y.receivedAmount.toLocaleString("ja-JP"):""),ne.join("")}).join(""),l=e.lines.reduce((y,S)=>y+(S.amount||0),0),r=e.lines.reduce((y,S)=>y+(S.retailPrice||0)*(S.correctedQuantity??S.quantity),0),d=e.lines.reduce((y,S)=>y+(S.receivedAmount||0),0),u=e.lines.reduce((y,S)=>y+(S.returnAmount||0),0),p=e.lines.reduce((y,S)=>y+S.quantity,0),h=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",f=n.calibrationOffsetX||0,P=n.calibrationOffsetY||0,T=`transform: translate(${f}mm, ${P}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${h}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${T}">
        ${b(v.currentDateY,s.y)}
        ${b(v.currentDateM,s.m)}
        ${b(v.currentDateD,s.d)}
        ${b(v.documentNo,e.documentNo)}
        ${e.settlementPrint?b(v.settlementCheck,"✓"):""}

        ${b(v.vendorName,t.name)}
        ${b(v.vendorAddress,t.address1)}
        ${b(v.chainStoreCode,e.chainStoreCode??"")}
        ${b(v.categoryCode,e.categoryCode??"")}
        ${b(v.slipNumber,e.documentNo)}
        ${b(v.vendorCode,e.slipTypeCode??"")}

        ${b(v.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${b(v.orderDateY,o.y)}
        ${b(v.orderDateM,o.m)}
        ${b(v.orderDateD,o.d)}
        ${b(v.deliveryDateY,i.y)}
        ${b(v.deliveryDateM,i.m)}
        ${b(v.deliveryDateD,i.d)}
        ${b(v.orderNo,e.orderNo??"")}
        ${b(v.partnerCode,e.vendorCode??"")}

        ${c}

        ${b(v.totalQty,p.toLocaleString("ja-JP"))}
        ${b(v.receivedTotal,d.toLocaleString("ja-JP"))}
        ${b(v.returnTotal,u.toLocaleString("ja-JP"))}
        ${b(v.correctedCostTotal,l.toLocaleString("ja-JP"))}
        ${b(v.correctedRetailTotal,r.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Es(e,t,n){const{subtotal:s,taxAmount:o,total:i}=zt(e.lines,e.taxRate),c=e.previousBalance??0,l=e.paymentAmount??0,r=c-l+i,d=e.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${$(p.unitPrice)}</td>
        <td class="numeric">${$(p.amount)}</td>
      </tr>
    `).join(""),u=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td><td></td>${n.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page invoice-freee ${n.fontSize}">
      <!-- ヘッダー -->
      <div class="freee-header">
        <div>
          <h1 class="freee-title">御 請 求 書</h1>
          <p class="freee-doc-no">No. ${e.documentNo}</p>
        </div>
        <div class="freee-from">
          <p class="freee-company-name">${t.name}</p>
          <p>〒${t.postalCode}</p>
          <p>${t.address1}${t.address2?` ${t.address2}`:""}</p>
          <p>TEL: ${t.tel}　FAX: ${t.fax}</p>
          ${n.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${t.registrationNo}</span></p>`:""}
          ${n.showSeal?`<div class="freee-seal-wrap">${t.sealImageUrl?`<img src="${t.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
        </div>
      </div>

      <!-- 宛先 -->
      <div class="freee-to">
        ${e.customerPostalCode?`<p class="freee-to-postal">〒${e.customerPostalCode}</p>`:""}
        ${e.customerAddress?`<p class="freee-to-addr">${e.customerAddress}</p>`:""}
        <div class="freee-to-name">${e.customerName} ${e.customerHonorific}</div>
      </div>

      <!-- 日付 -->
      <dl class="freee-meta">
        <div><dt>請求日</dt><dd>${te(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${te(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${$(r)}</span>
          <span class="freee-total-tax">（税込）</span>
        </div>
      </div>

      <!-- 明細 -->
      <table class="freee-table">
        <thead>
          <tr>
            <th>日付 / 摘要</th>
            <th>品目</th>
            <th class="numeric">数量</th>
            ${n.showUnit?"<th>単位</th>":""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${d}${u}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${$(s)} / 消費税: ${$(o)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${$(c)}</td></tr>`:""}
          ${l?`<tr><th>ご入金額</th><td>▲ ${$(l)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${$(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${$(o)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${$(r)}</td></tr>
        </table>
      </div>

      <!-- 振込先 -->
      ${n.showBankInfo?`
        <div class="freee-bank">
          <h3>お振込先</h3>
          <p><strong>${t.bankName}</strong> ${t.bankBranch}　${t.bankAccountType} ${t.bankAccountNo}</p>
          <p>口座名義: ${t.bankAccountHolder}</p>
          <p class="freee-bank-note">※ お振込手数料はお客様にてご負担くださいますようお願い申し上げます。</p>
        </div>`:""}

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}
    </div>
  `}function Rs(e,t,n){const{subtotal:s,taxAmount:o,total:i}=zt(e.lines,e.taxRate),c=e.lines.map(r=>`
      <tr>
        <td>${r.productName}${r.spec?` <span style="color:#636e72;font-size:9pt;">/ ${r.spec}</span>`:""}</td>
        <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${r.unit}</td>`:""}
        <td class="numeric">${$(r.unitPrice)}</td>
        <td class="numeric">${$(r.amount)}</td>
      </tr>
    `).join(""),l=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td>${n.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page quotation-freee ${n.fontSize}">
      <!-- ヘッダー: タイトル + 会社情報 -->
      <div class="freee-header">
        <div>
          <h1 class="freee-title">御 見 積 書</h1>
          <p class="freee-doc-no">No. ${e.documentNo}</p>
        </div>
        <div class="freee-from">
          <p class="freee-company-name">${t.name}</p>
          <p>〒${t.postalCode}</p>
          <p>${t.address1}${t.address2?` ${t.address2}`:""}</p>
          <p>TEL: ${t.tel}　FAX: ${t.fax}</p>
          ${n.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${t.registrationNo}</span></p>`:""}
          ${n.showSeal?`<div class="freee-seal-wrap">${t.sealImageUrl?`<img src="${t.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
        </div>
      </div>

      <!-- 宛先 -->
      <div class="freee-to">
        ${e.customerPostalCode?`<p class="freee-to-postal">〒${e.customerPostalCode}</p>`:""}
        ${e.customerAddress?`<p class="freee-to-addr">${e.customerAddress}</p>`:""}
        <div class="freee-to-name">${e.customerName} ${e.customerHonorific}</div>
      </div>

      <!-- 件名・日付 -->
      ${e.title?`<p class="freee-subject"><strong>件名:</strong>${e.title}</p>`:""}
      <dl class="freee-meta">
        <div><dt>見積日</dt><dd>${te(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${te(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${$(i)}</span>
          <span class="freee-total-tax">（税込）</span>
        </div>
      </div>

      <!-- 明細 -->
      <table class="freee-table">
        <thead>
          <tr>
            <th>品目 / 内容</th>
            <th class="numeric">数量</th>
            ${n.showUnit?"<th>単位</th>":""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${c}${l}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${$(s)} / 消費税: ${$(o)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${$(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${$(o)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${$(i)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?te(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function qs(e,t,n,s){const o=Object.keys(ot).map(l=>`
      <button class="tab-button ${e===l?"active":""}" data-print-template="${l}">
        ${ot[l]}
      </button>
    `).join("");let i="";switch(e){case"chain_store":i=Ts(s,n,t);break;case"quotation":i=Rs(s,n,t);break;case"invoice_monthly":i=Es(s,n,t);break}const c=s.lines.map((l,r)=>`
      <tr>
        <td><input class="input-cell mono" type="text" data-print-line="${r}" data-print-lfield="productCode" value="${l.productCode}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${r}" data-print-lfield="productName" value="${l.productName}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${r}" data-print-lfield="spec" value="${l.spec??""}" placeholder="720ml" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${r}" data-print-lfield="quantity" value="${l.quantity}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${r}" data-print-lfield="unit" value="${l.unit}" placeholder="本" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${r}" data-print-lfield="unitPrice" value="${l.unitPrice}" /></td>
        <td class="numeric">${l.amount>0?l.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${r}" title="削除">✕</button></td>
      </tr>
    `).join("");return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">印刷センター</p>
        <h1>伝票・見積・請求の印刷</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="print-execute" onclick="window.print()">🖨️ 印刷する</button>
      </div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>テンプレート選択</h2>
      </div>
      <div class="tab-group">${o}</div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>書類情報</h2>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>書類番号</span>
          <input type="text" data-print-field="documentNo" value="${s.documentNo}" />
        </label>
        <label class="field">
          <span>${e==="quotation"?"見積日":e==="invoice_monthly"?"請求日":"納品日"}</span>
          <input type="date" data-print-field="documentDate" value="${s.documentDate}" />
        </label>
        ${e==="quotation"?`<label class="field"><span>有効期限</span><input type="date" data-print-field="expireDate" value="${s.expireDate??""}" /></label>`:""}
        ${e==="invoice_monthly"?`<label class="field"><span>お支払期限</span><input type="date" data-print-field="dueDate" value="${s.dueDate??""}" /></label>`:""}
        <label class="field">
          <span>得意先コード</span>
          <input type="text" data-print-field="customerCode" value="${s.customerCode??""}" />
        </label>
        <label class="field">
          <span>得意先名</span>
          <input type="text" data-print-field="customerName" value="${s.customerName}" />
        </label>
        <label class="field">
          <span>敬称</span>
          <select data-print-field="customerHonorific">
            <option value="御中" ${s.customerHonorific==="御中"?"selected":""}>御中</option>
            <option value="様" ${s.customerHonorific==="様"?"selected":""}>様</option>
            <option value="殿" ${s.customerHonorific==="殿"?"selected":""}>殿</option>
          </select>
        </label>
        <label class="field">
          <span>郵便番号</span>
          <input type="text" data-print-field="customerPostalCode" value="${s.customerPostalCode??""}" placeholder="100-0001" />
        </label>
        <label class="field">
          <span>住所</span>
          <input type="text" data-print-field="customerAddress" value="${s.customerAddress??""}" />
        </label>
        ${e==="quotation"?`<label class="field"><span>件名</span><input type="text" data-print-field="title" value="${s.title??""}" placeholder="純米吟醸 出荷見積" /></label>`:""}
        ${e==="chain_store"?`
              <label class="field"><span>発注日</span><input type="date" data-print-field="orderDate" value="${s.orderDate??""}" /></label>
              <label class="field"><span>納品日</span><input type="date" data-print-field="deliveryDate" value="${s.deliveryDate??""}" /></label>
              <label class="field"><span>柱店コード</span><input type="text" data-print-field="chainStoreCode" value="${s.chainStoreCode??""}" placeholder="0123" /></label>
              <label class="field"><span>分類コード</span><input type="text" data-print-field="categoryCode" value="${s.categoryCode??""}" placeholder="21" /></label>
              <label class="field"><span>取引コード</span><input type="text" data-print-field="slipTypeCode" value="${s.slipTypeCode??""}" placeholder="11" /></label>
              <label class="field"><span>受注No.</span><input type="text" data-print-field="orderNo" value="${s.orderNo??""}" /></label>
              <label class="field"><span>取引先コード</span><input type="text" data-print-field="vendorCode" value="${s.vendorCode??""}" /></label>
              <label class="field"><span>部門コード</span><input type="text" data-print-field="departmentCode" value="${s.departmentCode??""}" /></label>
            `:""}
        <label class="field">
          <span>消費税率</span>
          <select data-print-field="taxRate">
            <option value="0.10" ${s.taxRate===.1?"selected":""}>10%</option>
            <option value="0.08" ${s.taxRate===.08?"selected":""}>8% 軽減税率</option>
          </select>
        </label>
        ${e==="invoice_monthly"?`
              <label class="field"><span>前回請求額</span><input type="number" data-print-field="previousBalance" value="${s.previousBalance??0}" /></label>
              <label class="field"><span>ご入金額</span><input type="number" data-print-field="paymentAmount" value="${s.paymentAmount??0}" /></label>
            `:""}
      </div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${s.lines.length} 行</p>
        </div>
        <button class="button secondary" data-action="print-add-line">＋ 行追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>商品CD</th>
              <th>品名</th>
              <th>規格</th>
              <th class="numeric">数量</th>
              <th>単位</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${c||'<tr><td colspan="8" class="empty-row">「＋行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <label class="field" style="margin-top:16px;">
        <span>備考</span>
        <textarea data-print-field="remarks" rows="2">${s.remarks??""}</textarea>
      </label>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>印刷オプション</h2>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>用紙サイズ</span>
          <select data-print-opt="pageSize">
            <option value="A4" ${t.pageSize==="A4"?"selected":""}>A4</option>
            <option value="A5" ${t.pageSize==="A5"?"selected":""}>A5</option>
            <option value="B5" ${t.pageSize==="B5"?"selected":""}>B5</option>
          </select>
        </label>
        <label class="field">
          <span>向き</span>
          <select data-print-opt="orientation">
            <option value="portrait" ${t.orientation==="portrait"?"selected":""}>縦</option>
            <option value="landscape" ${t.orientation==="landscape"?"selected":""}>横</option>
          </select>
        </label>
        <label class="field">
          <span>文字サイズ</span>
          <select data-print-opt="fontSize">
            <option value="small" ${t.fontSize==="small"?"selected":""}>小</option>
            <option value="medium" ${t.fontSize==="medium"?"selected":""}>中</option>
            <option value="large" ${t.fontSize==="large"?"selected":""}>大</option>
          </select>
        </label>
        <label class="field">
          <span>カラーモード</span>
          <select data-print-opt="colorMode">
            <option value="color" ${t.colorMode==="color"?"selected":""}>カラー</option>
            <option value="mono" ${t.colorMode==="mono"?"selected":""}>モノクロ</option>
          </select>
        </label>
      </div>
      <div style="margin-top:16px; display:flex; flex-wrap:wrap; gap:16px;">
        <label><input type="checkbox" data-print-opt="showSeal" ${t.showSeal?"checked":""} /> 印影を表示</label>
        <label><input type="checkbox" data-print-opt="showRegistrationNo" ${t.showRegistrationNo?"checked":""} /> インボイス登録番号</label>
        <label><input type="checkbox" data-print-opt="showBankInfo" ${t.showBankInfo?"checked":""} /> 振込先</label>
        <label><input type="checkbox" data-print-opt="showJanCode" ${t.showJanCode?"checked":""} /> JANコード</label>
        <label><input type="checkbox" data-print-opt="showUnit" ${t.showUnit?"checked":""} /> 単位列</label>
        <label><input type="checkbox" data-print-opt="showRemarks" ${t.showRemarks?"checked":""} /> 備考</label>
      </div>
      ${e==="chain_store"?`
      <div style="margin-top:16px; padding:12px; background:var(--surface-alt); border-radius:8px; border:1px dashed var(--border-strong);">
        <h3 style="margin:0 0 8px; font-size:13px;">📐 BP1701 オーバーレイ印刷</h3>
        <p class="form-hint" style="margin:0 0 12px;">
          事前印刷済みの BP1701 伝票用紙を印刷機にセットし、<b>データ部分のみ</b>を所定座標に印字する方式です。
          プレビュー画像（実物BP1701）と重ねて位置を確認してください。
        </p>
        <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center;">
          <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${t.showReferenceOverlay?"checked":""} /> 参考画像を背景に表示</label>
          <label style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px;">画像の濃さ</span>
            <input type="range" min="0" max="1" step="0.05" value="${t.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
            <span style="font-size:12px; min-width:32px;">${Math.round(t.overlayOpacity*100)}%</span>
          </label>
        </div>
        <h4 style="margin:12px 0 4px; font-size:12px; color:var(--text-secondary);">プリンタずれ調整（印刷結果を確認してから微調整）</h4>
        <div style="display:flex; flex-wrap:wrap; gap:16px;">
          <label style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px;">X (横, mm)</span>
            <input type="number" step="0.5" value="${t.calibrationOffsetX}" data-print-opt="calibrationOffsetX" style="width:80px;" />
          </label>
          <label style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px;">Y (縦, mm)</span>
            <input type="number" step="0.5" value="${t.calibrationOffsetY}" data-print-opt="calibrationOffsetY" style="width:80px;" />
          </label>
          <span class="form-hint" style="margin:0;">＋方向＝右/下、 −方向＝左/上</span>
        </div>
      </div>
      `:""}
      <div class="action-bar" style="margin-top:12px;">
        <button class="button secondary" data-action="print-save-settings">💾 この設定を保存</button>
        <button class="button secondary" data-action="print-open-company">🏢 会社情報を編集</button>
      </div>
    </section>

    <section class="panel print-preview-panel">
      <div class="panel-header no-print">
        <h2>プレビュー</h2>
        <p class="panel-caption">実際に印刷されるイメージ</p>
      </div>
      <div class="print-preview ${t.colorMode}">
        ${i}
      </div>
    </section>
  `}const Ms={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},Os={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Is(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],s="",o=!1;for(let l=0;l<e.length;l++){const r=e[l];o?r==='"'?e[l+1]==='"'?(s+='"',l++):o=!1:s+=r:r==='"'?o=!0:r===","?(n.push(s),s=""):r===`
`||r==="\r"?(r==="\r"&&e[l+1]===`
`&&l++,n.push(s),n.some(d=>d!=="")&&t.push(n),n=[],s=""):s+=r}if((s!==""||n.length>0)&&(n.push(s),n.some(l=>l!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const i=t[0].map(l=>l.trim()),c=[];for(let l=1;l<t.length;l++){const r={};i.forEach((d,u)=>{r[d]=(t[l][u]??"").trim()}),c.push(r)}return{columns:i,rows:c}}function Fs(e,t,n){const s=Ms[e],o=s.filter(l=>!t.includes(l)),i=n.map(l=>{const r=[];o.length>0&&r.push(`必須列欠損: ${o.join(",")}`);for(const d of s)t.includes(d)&&!l[d]&&r.push(`${d}が空`);return{...l,_valid:r.length===0,_error:r[0]}}),c=i.filter(l=>l._valid).length;return{entity:e,columns:t,rows:i,totalRows:n.length,validRows:c,invalidRows:i.length-c}}function Js(e){const n=Os[e],o={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+o.join(",")+`
`}async function Bs(e,t){const{supabaseInsert:n}=await R(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>pt);return{supabaseInsert:l}},void 0);let s=0,o=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const l of t){if(!l._valid)continue;const{_valid:r,_error:d,...u}=l,p={...u};if(!p.id){const h=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[h]??`${e}-${Date.now()}-${s+o}`)}for(const h of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[h]=="string"&&p[h]!==""){const f=Number(p[h]);Number.isFinite(f)&&(p[h]=f)}try{await n(c,p)!==null?s++:o++}catch{o++}}return{inserted:s,failed:o}}function zs(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=e.map(d=>{const u=d.capacity>0?Math.round(d.currentVolume/d.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${d.tankNo}</strong></td>
          <td class="numeric">${d.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${d.currentVolume>0?d.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${u}%"></div>
            </div>
            <span class="progress-label">${u}%</span>
          </td>
          <td>${d.productName||"―"}</td>
          <td class="mono">${d.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${n[d.status]}">${t[d.status]}</span>
          </td>
          <td>${d.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${d.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),o=e.filter(d=>d.status==="in_use").length,i=e.filter(d=>d.status==="aging").length,c=e.filter(d=>d.status==="empty").length,l=e.reduce((d,u)=>d+u.capacity,0),r=e.reduce((d,u)=>d+u.currentVolume,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${l.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${l>0?Math.round(r/l*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${o} 基</p>
        <p class="kpi-sub">熟成中 ${i} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${c} 基</p>
        <p class="kpi-sub">使用可能</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>タンク一覧</h2>
          <p class="panel-caption">${e.length} 基</p>
        </div>
        <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>タンクNo.</th>
              <th class="numeric">容量</th>
              <th class="numeric">現在量</th>
              <th>充填率</th>
              <th>銘柄</th>
              <th>仕込番号</th>
              <th>状態</th>
              <th>更新日</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Vs(e,t,n){const s=e.rows.map((d,u)=>`
      <tr>
        <td class="mono">${d.taxCategory}</td>
        <td>${d.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${u}" data-tax-field="alcoholDegree" value="${d.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="productionVolume" value="${d.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="previousBalance" value="${d.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="exportDeduction" value="${d.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="sampleDeduction" value="${d.sampleDeduction}" />
        </td>
        <td class="numeric">${d.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${d.taxRate}</td>
        <td class="numeric"><strong>${xe(d.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),o=e.deductions.map((d,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(Ne).map(p=>`<option value="${p}" ${p===d.type?"selected":""}>${Ne[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${Rt.map(p=>`<option value="${p.code}" ${p.code===d.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${u}" data-ded-field="volume" value="${d.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="reason" value="${d.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="documentNo" value="${d.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=Array.from({length:12},(d,u)=>u+1),c=e.rows.reduce((d,u)=>d+u.exportDeduction+u.sampleDeduction,0),l=e.rows.reduce((d,u)=>d+u.productionVolume,0),r=l>0?c/l*100:0;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">税務管理</p>
        <h1>酒税申告書 (eTax連携対応)</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${e.status==="submitted"||e.status==="accepted"?"success":"warning"}">
          ${e.status==="submitted"?"申告済":e.status==="accepted"?"受理済":"下書き"}
        </span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年</span>
          <select id="tax-year">
            ${[2025,2026,2027].map(d=>`<option value="${d}" ${t===d?"selected":""}>${d}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${i.map(d=>`<option value="${d}" ${n===d?"selected":""}>${d}月</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="tax-load">読込</button>
        </div>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">酒税総額</p>
        <p class="kpi-value">${xe(e.totalTax)}</p>
        <p class="kpi-sub">${e.targetYear}年${e.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${e.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${c.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.deductions.length} 件</p>
      </article>
      <article class="panel kpi-card ${r>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${r.toFixed(1)}%</p>
        <p class="kpi-sub">${r>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>製造場情報</h2>
        </div>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>会社名</span>
          <input type="text" data-tax-field="companyName" value="${e.companyName}" />
        </label>
        <label class="field">
          <span>製造者番号</span>
          <input type="text" data-tax-field="companyNo" value="${e.companyNo}" />
        </label>
        <label class="field">
          <span>代表者</span>
          <input type="text" data-tax-field="companyRepresentative" value="${e.companyRepresentative}" />
        </label>
        <label class="field">
          <span>所在地</span>
          <input type="text" data-tax-field="companyAddress" value="${e.companyAddress}" />
        </label>
        <label class="field">
          <span>所轄税務署</span>
          <input type="text" data-tax-field="taxOffice" value="${e.taxOffice}" />
        </label>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>課税移出明細</h2>
          <p class="panel-caption">数量を変更すると課税対象数量と税額が自動再計算されます</p>
        </div>
        <button class="button secondary" data-action="tax-add-category">＋ 区分追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>コード</th>
              <th>区分名</th>
              <th class="numeric">アルコール度</th>
              <th class="numeric">製造数量(L)</th>
              <th class="numeric">前月繰越(L)</th>
              <th class="numeric">輸出控除(L)</th>
              <th class="numeric">見本等控除(L)</th>
              <th class="numeric">課税数量(L)</th>
              <th class="numeric">税率</th>
              <th class="numeric">税額</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${xe(e.totalTax)}</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>控除明細（輸出・見本・試験・欠減）</h2>
          <p class="panel-caption">酒税法第42条: 見本・試験は全製造数量の3%以内</p>
        </div>
        <button class="button secondary" data-action="tax-add-deduction">＋ 控除追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>種別</th>
              <th>酒類区分</th>
              <th class="numeric">数量(L)</th>
              <th>理由</th>
              <th>関連伝票No</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${o||'<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="panel disclaimer-panel">
      <div class="panel-header">
        <h2>📝 酒税法リマインダー</h2>
      </div>
      <div class="summary-list">
        <div><dt>申告期限</dt><dd>対象月の翌月末日までに所轄税務署へ提出</dd></div>
        <div><dt>納期限</dt><dd>同じく翌月末日まで（申告と同時）</dd></div>
        <div><dt>控除上限</dt><dd>見本・試験醸造は製造数量の3%以内（酒税法第42条）</dd></div>
        <div><dt>修正申告</dt><dd>発見次第、修正申告書を提出（延滞税・加算税の対象）</dd></div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>提出・エクスポート</h2>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="tax-export-xml">📄 XMLダウンロード</button>
        <button class="button secondary" data-action="tax-export-csv">📊 CSVダウンロード</button>
        <button class="button secondary" data-action="tax-print" onclick="window.print()">🖨️ 印刷</button>
        <button class="button secondary" data-action="tax-save-draft">下書き保存</button>
        <button class="button primary" data-action="tax-submit" ${e.status==="submitted"?"disabled":""}>
          ${e.status==="submitted"?"申告済":"申告する"}
        </button>
      </div>
      <p class="form-hint" style="margin-top: 12px;">
        XMLはeTax受付システム形式（e-Taxソフトへ取り込み可能）、CSVは会計ソフト・税理士向け。印刷ボタンで紙提出用のPDF化もできます。
      </p>
    </section>
  `}function it(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Us(e,t,n){if(t.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(t[0]??{}).map(d=>({key:d,label:d})),i=`\uFEFF${[s.map(d=>it(d.label)).join(","),...t.map(d=>s.map(u=>it(d[u.key])).join(","))].join(`\r
`)}`,c=new Blob([i],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(c),r=document.createElement("a");r.href=l,r.download=e,document.body.append(r),r.click(),r.remove(),window.setTimeout(()=>URL.revokeObjectURL(l),0)}const Hs=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer"],me=[{name:"青葉商事",email:"aoba@example.jp",area:"関東",historySegment:"seasonal"},{name:"北斗酒販",email:"hokuto@example.jp",area:"北海道",historySegment:"premium"},{name:"中央フーズ",email:"chuo@example.jp",area:"関東",historySegment:"seasonal"},{name:"東海酒店",email:"tokai@example.jp",area:"中部",historySegment:"premium"},{name:"三和物産",email:"sanwa@example.jp",area:"関西",historySegment:"liqueur"},{name:"南星リカー",email:"nansei@example.jp",area:"九州",historySegment:"seasonal"},{name:"山川酒店",email:"yamakawa@example.jp",area:"関西",historySegment:"premium"},{name:"瑞穂商店",email:"mizuho@example.jp",area:"中部",historySegment:"seasonal"}],lt=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"}];function Vt(e){const t=Te[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Fe(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Ys(){const e=Vt("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const fe=new Date,Ks=fe.toISOString().slice(0,7),Qs=fe.getFullYear(),Ws=fe.getMonth()+1,Xs=fe.toISOString().slice(0,10),Gs="C0011",I=Ys();function Ut(e){const t="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return Hs.includes(n)?n:"/"}function Je(e){switch(e){case"/cat/sales":case"/invoice":case"/ledger":case"/invoice-entry":case"/delivery":case"/billing":case"/report":return"sales";case"/cat/brewery":case"/jikomi":case"/tanks":case"/kentei":case"/materials":return"brewery";case"/cat/purchase":case"/purchase":case"/raw-material":return"purchase";case"/cat/more":case"/master":case"/analytics":case"/tax":case"/store":case"/setup":return"more";case"/email":return"email";default:return"dashboard"}}const ct=Ut(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,invoiceRecords:[],customerLedger:null,salesAnalytics:null,invoiceForm:Fe(),invoiceSaving:!1,invoiceSavedDocNo:null,pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Ks,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Qs,taxMonth:Ws,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,printTemplate:"chain_store",printOptions:{...Ps,overlayImageUrl:`${"/sake-system/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...js},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Xs,route:ct,currentCategory:Je(ct),sidebarOpen:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Gs,masterTab:"customers",analyticsTab:"products",emailAudienceMode:I.mode,emailRegion:I.region,emailHistorySegment:I.historySegment,emailTemplateId:I.templateId,emailSubject:I.subject,emailBody:I.body,emailSaveMessage:I.saveMessage,emailSending:!1,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function rt(e){return e.slice(0,10)}function Zs(e){return{...e}}function ge(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Ht(){a.invoiceForm=Fe(),a.invoiceSavedDocNo=null,a.invoiceErrors={},ge()}function Yt(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,s)=>{n.productCode.trim()||(t[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),t}function en(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,Zs(t))}function tn(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,o)=>{const i=o===0?1:2,c=1200*(o+1);return{productCode:s.code,productName:s.name,quantity:i,unitPrice:c,unit:"本",amount:i*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function an(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,!0):!1}function sn(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,!0):!1}function Kt(e){if(j(e),a.invoiceErrors=Yt(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){m();return}a.invoiceSaving=!0,m(),xt(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=Fe(),m()}).catch(()=>{a.invoiceSaving=!1,m()})}function Qt(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((s,o)=>new Date(o.date).getTime()-new Date(s.date).getTime()).filter(s=>{const o=new Date(s.date);return!(t&&o<t||n&&o>n)})}function Wt(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?me:me.filter(e=>e.area===a.emailRegion);case"history":return me.filter(e=>e.historySegment===a.emailHistorySegment);default:return me}}function nn(){const e=Wt();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending}}function De(e){const t=Wt(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(s=>s.email),status:e}}function Be(){return a.user,!1}function ae(){a.globalSearchOpen=!1,a.globalQuery=""}function on(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:lt.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:lt}}function ln(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Qt(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((s,o)=>o.balanceAmount-s.balanceAmount).map(s=>({...s})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(s=>({...s})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(s=>({...s})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(s=>({...s})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(s=>({...s})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(s=>({...s}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(s=>({...s}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Us(n,e,t)}function dt(e){const t=`${"/sake-system/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=Je(e),a.sidebarOpen=!1,ae(),ze(e)}async function ze(e){a.actionLoading=!0,m();try{switch(e){case"/delivery":a.deliveryNote||(a.deliveryNote=await qe(a.deliverySearchDocNo||"D240122"));break;case"/billing":a.billingSummary||(a.billingSummary=await Me(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Dt());break;case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Nt());break;case"/tanks":a.tankList.length===0&&(a.tankList=await _t());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await At());break;case"/materials":a.materialList.length===0&&(a.materialList=await Lt());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Pt(),jt()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Tt(),Et()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await Oe(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Ie(a.storeSalesDate),Mt()]));break;default:break}}catch(t){console.warn("Route data load error",t)}finally{a.actionLoading=!1,m()}}function ut(){if(Be())return as(a.authError,a.authSubmitting);if(a.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(a.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${a.error}</p>
      </section>
    `;switch(a.route){case"/cat/sales":return oe("sales");case"/cat/brewery":return oe("brewery");case"/cat/purchase":return oe("purchase");case"/cat/more":return oe("more");case"/invoice-entry":return Ua(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/email":return Ja(nn());case"/delivery":return a.deliveryNote?Ia(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/billing":return a.billingSummary?Aa(a.billingSummary,a.billingYearMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/report":return a.salesReport?ks(a.salesReport):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/jikomi":return a.jikomiView==="calendar"?`${at(a.jikomiList,a.jikomiView)}${Za(a.jikomiList)}`:at(a.jikomiList,a.jikomiView);case"/tanks":return zs(a.tankList);case"/kentei":return es(a.kenteiList);case"/materials":return is(a.materialList);case"/purchase":return us(a.purchaseList,a.payableList);case"/raw-material":return ps(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Vs(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/store":return Ds(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?ys(a.pipelineMeta,se,Ae):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/import":return Ns(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return qs(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return As(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode)}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return xs(Qt(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return rs([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return os(a.masterStats,a.masterTab);case"/invoice":return Ka(a.invoiceRecords,a.invoiceFilter);case"/ledger":return Ea(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return $s(a.salesAnalytics,a.analyticsTab);default:return Ma(a.salesSummary,a.pipelineMeta,a.salesAnalytics)}}function cn(){if(Be())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${ut()}</div>
        </main>
      </div>
    `;const e={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売管理",items:[{path:"/cat/sales",label:"販売管理トップ",kicker:"Category"},{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],brewery:[{label:"蔵内管理",items:[{path:"/cat/brewery",label:"蔵内管理トップ",kicker:"Category"},{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]}],purchase:[{label:"仕入管理",items:[{path:"/cat/purchase",label:"仕入管理トップ",kicker:"Category"},{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],more:[{label:"その他",items:[{path:"/cat/more",label:"その他トップ",kicker:"Category"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/email",label:"メール配信",kicker:"Mail"},{path:"/setup",label:"連動設定",kicker:"Setup"}]}],email:[{label:"メール配信",items:[{path:"/email",label:"季節商品案内",kicker:"Mail"}]}]},t=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/cat/sales",label:"販売管理"},{category:"brewery",path:"/cat/brewery",label:"蔵内管理"},{category:"purchase",path:"/cat/purchase",label:"仕入管理"},{category:"more",path:"/cat/more",label:"その他"},{category:"email",path:"/email",label:"メール配信"}],n=e[a.currentCategory].map(l=>`
        <div class="nav-group">
          <p class="nav-group-label">${l.label}</p>
          ${l.items.map(r=>`
                <a
                  href="${"/sake-system/".replace(/\/$/,"")}${r.path==="/"?"/":r.path}"
                  class="nav-link ${a.route===r.path?"active":""}"
                  data-link="${r.path}"
                >
                  <div>
                    <div class="nav-kicker">${r.kicker}</div>
                    <div class="nav-label">${r.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),s=t.map(l=>`
        <a
          href="${"/sake-system/".replace(/\/$/,"")}${l.path==="/"?"/":l.path}"
          class="category-link ${a.currentCategory===l.category?"active":""}"
          data-link="${l.path}"
        >
          ${l.label}
        </a>
      `).join(""),o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?za(a.masterStats.customers,a.pickerQuery):ds(a.masterStats.products,a.pickerQuery):"",i=a.globalSearchOpen?Ba(a.globalQuery,on()):"",c=a.user?`
        <div class="user-badge">
          <span>${a.user.email}</span>
          <button class="button secondary" type="button" data-action="auth-logout">ログアウト</button>
        </div>
      `:a.authSkipped?'<div class="user-badge demo">デモモード</div>':"";return`
    <div class="shell">
      <button
        class="menu-toggle"
        type="button"
        aria-label="メニューを開く"
        data-action="${a.sidebarOpen?"sidebar-close":"sidebar-open"}"
      >
        ☰
      </button>
      <button
        class="sidebar-backdrop ${a.sidebarOpen?"open":""}"
        type="button"
        aria-label="メニューを閉じる"
        data-action="sidebar-close"
      ></button>
      <aside class="sidebar ${a.sidebarOpen?"open":""}">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>酒仙i 次世代版</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          <div class="category-nav">${s}</div>
          <div class="subnav">${n}</div>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${c}
        </header>
        <div class="view ${a.actionLoading?"is-busy":""}">${ut()}</div>
      </main>
      ${o}
      ${i}
    </div>
  `}async function rn(e){a.actionLoading=!0,m();try{a.invoiceRecords=await be(e)}finally{a.actionLoading=!1,m()}}async function dn(e){a.actionLoading=!0,m();try{a.customerLedger=await Re(e)}finally{a.actionLoading=!1,m()}}function j(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const s=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,o=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:s,unitPrice:o,amount:s*o}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function F(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function un(e){if(e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,m()}),e.querySelectorAll("[data-action='global-search-close']").forEach(t=>{t.addEventListener("click",n=>{t.classList.contains("global-search")&&n.target instanceof HTMLElement&&!n.target.classList.contains("global-search")||(ae(),m())})}),e.querySelector("#global-search-input")?.addEventListener("input",t=>{a.globalQuery=t.target.value,m()}),e.querySelectorAll("[data-action='global-nav']").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.path;n&&(ae(),dt(n))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{ln()}),e.querySelectorAll("[data-jikomi-tab]").forEach(t=>{t.addEventListener("click",()=>{a.jikomiView=t.dataset.jikomiTab,m()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const t=e.querySelector("#auth-email")?.value.trim()??"",n=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,m(),ea(t,n).then(s=>{a.user=s,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null,m()}).catch(async s=>{try{const o=await ta(t,n);a.user=o,a.authSkipped=!1,a.authError=null}catch{a.authError=s instanceof Error?s.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,m()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,m()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{aa().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,m()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(t=>{t.addEventListener("click",()=>{a.sidebarOpen=!1,m()})}),e.querySelectorAll("[data-link]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),dt(t.dataset.link)})}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const t=e.querySelector("#sales-start")?.value??"",n=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:t,endDate:n},m()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const t={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=t,rn(t)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const t=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=t.trim().toUpperCase(),dn(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{a.masterTab=t.dataset.tab,m()})}),e.querySelectorAll("[data-analytics-tab]").forEach(t=>{t.addEventListener("click",()=>{a.analyticsTab=t.dataset.analyticsTab,m()})}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{j(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},m()}),e.querySelectorAll("[data-action='remove-line']").forEach(t=>{t.addEventListener("click",()=>{j(e);const n=parseInt(t.dataset.line??"0",10);a.invoiceForm.lines.splice(n,1),a.invoiceErrors=Yt(a.invoiceForm),m()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(t=>{t.addEventListener("click",()=>{j(e),en(parseInt(t.dataset.line??"0",10)),a.invoiceErrors={},m()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{tn(),m()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{j(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,m()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(t=>{t.addEventListener("click",()=>{j(e);const n=parseInt(t.dataset.line??"0",10),s=a.invoiceForm.lines[n];a.pickerMode="product",a.pickerTargetLine=n,a.pickerQuery=s?s.productCode||s.productName:"",m()})}),e.querySelectorAll("[data-action='modal-close']").forEach(t=>{t.addEventListener("click",n=>{t.classList.contains("modal-backdrop")&&n.target instanceof HTMLElement&&!n.target.classList.contains("modal-backdrop")||(ge(),m())})}),e.querySelectorAll("[data-action='picker-select']").forEach(t=>{const n=()=>{const s=t.dataset.code??"",o=t.dataset.name??"";if(a.pickerMode==="customer")a.invoiceForm.customerCode=s,a.invoiceForm.customerName=o,delete a.invoiceErrors.customerCode;else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const i=a.invoiceForm.lines[a.pickerTargetLine];i&&(i.productCode=s,i.productName=o,i.amount=i.quantity*i.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`])}ge(),m()};t.addEventListener("click",n),t.addEventListener("keydown",s=>{s.key==="Enter"&&n()})}),e.querySelector("#modal-search")?.addEventListener("input",t=>{a.pickerQuery=t.target.value,m()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Ht(),m()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Kt(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",()=>{j(e),an(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,m())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{j(e),sn(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,m())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(t=>{t.addEventListener("input",()=>{j(e),a.invoiceSavedDocNo=null})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{j(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const t=e.querySelector("#delivery-docno")?.value??"";a.deliverySearchDocNo=t.trim(),a.deliveryNote=null,a.actionLoading=!0,m(),qe(a.deliverySearchDocNo||"D240122").then(n=>{a.deliveryNote=n,a.actionLoading=!1,m()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const t=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=t,a.billingSummary=null,a.actionLoading=!0,m(),Me(t).then(n=>{a.billingSummary=n,a.actionLoading=!1,m()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const t=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),n=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=t,a.taxMonth=n,a.taxDeclaration=null,a.actionLoading=!0,m(),Oe(t,n).then(s=>{a.taxDeclaration=s,a.actionLoading=!1,m()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:t}=await R(async()=>{const{generateTaxXML:c}=await Promise.resolve().then(()=>V);return{generateTaxXML:c}},void 0),n=t(a.taxDeclaration),s=new Blob([n],{type:"application/xml;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,i.click(),URL.revokeObjectURL(o)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:t}=await R(async()=>{const{generateTaxCSV:c}=await Promise.resolve().then(()=>V);return{generateTaxCSV:c}},void 0),n=t(a.taxDeclaration),s=new Blob([n],{type:"text/csv;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,i.click(),URL.revokeObjectURL(o)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:t}=await R(async()=>{const{saveTaxDeclaration:n}=await Promise.resolve().then(()=>V);return{saveTaxDeclaration:n}},void 0);try{await t(a.taxDeclaration),alert("下書き保存しました（Supabase tax_declarationsに保存）")}catch(n){alert("保存に失敗: "+(n instanceof Error?n.message:String(n)))}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(t=>{t.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const n=Number(t.dataset.taxRow),s=t.dataset.taxField,o=t.type==="number"?Number(t.value)||0:t.value,i=[...a.taxDeclaration.rows];i[n]={...i[n],[s]:o};const{recalculateTaxDeclaration:c}=await R(async()=>{const{recalculateTaxDeclaration:l}=await Promise.resolve().then(()=>V);return{recalculateTaxDeclaration:l}},void 0);a.taxDeclaration=c({...a.taxDeclaration,rows:i}),m()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(t=>{t.addEventListener("change",()=>{if(!a.taxDeclaration)return;const n=Number(t.dataset.dedRow),s=t.dataset.dedField,o=t.type==="number"?Number(t.value)||0:t.value,i=[...a.taxDeclaration.deductions];i[n]={...i[n],[s]:o},a.taxDeclaration={...a.taxDeclaration,deductions:i},m()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(t=>{t.addEventListener("change",()=>{if(!a.taxDeclaration)return;const n=t.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[n]:t.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:t,TAX_RATE_CATEGORIES:n}=await R(async()=>{const{recalculateTaxDeclaration:i,TAX_RATE_CATEGORIES:c}=await Promise.resolve().then(()=>V);return{recalculateTaxDeclaration:i,TAX_RATE_CATEGORIES:c}},void 0),s=n[0],o={taxCategory:s.code,taxCategoryName:s.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:s.taxRatePerLiter,taxAmount:0};a.taxDeclaration=t({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,o]}),m()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(t=>{t.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const n=Number(t.dataset.taxRow),{recalculateTaxDeclaration:s}=await R(async()=>{const{recalculateTaxDeclaration:i}=await Promise.resolve().then(()=>V);return{recalculateTaxDeclaration:i}},void 0),o=a.taxDeclaration.rows.filter((i,c)=>c!==n);a.taxDeclaration=s({...a.taxDeclaration,rows:o}),m()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const t={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,t]},m()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(t=>{t.addEventListener("click",()=>{if(!a.taxDeclaration)return;const n=Number(t.dataset.dedRow),s=a.taxDeclaration.deductions.filter((o,i)=>i!==n);a.taxDeclaration={...a.taxDeclaration,deductions:s},m()})}),e.querySelectorAll("[data-store-tab]").forEach(t=>{t.addEventListener("click",()=>{a.storeTab=t.dataset.storeTab,m()})}),e.querySelectorAll("[data-import-entity]").forEach(t=>{t.addEventListener("click",()=>{a.importEntity=t.dataset.importEntity,a.importPreview=null,a.importResult=null,m()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const t=Js(a.importEntity),n=new Blob([t],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(n),o=document.createElement("a");o.href=s,o.download=`template_${a.importEntity}.csv`,o.click(),URL.revokeObjectURL(s)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const n=e.querySelector("#import-file")?.files?.[0];if(!n){alert("CSVファイルを選択してください");return}const s=new FileReader;s.onload=()=>{const o=String(s.result??""),{columns:i,rows:c}=Is(o);a.importPreview=Fs(a.importEntity,i,c),a.importResult=null,m()},s.readAsText(n,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,m()}),e.querySelectorAll("[data-print-template]").forEach(t=>{t.addEventListener("click",()=>{a.printTemplate=t.dataset.printTemplate,m()})}),e.querySelectorAll("[data-print-field]").forEach(t=>{t.addEventListener("change",()=>{const n=t.dataset.printField;let s=t.value;(n==="taxRate"||n==="previousBalance"||n==="paymentAmount")&&(s=Number(t.value)||0),a.printData={...a.printData,[n]:s},m()})}),e.querySelectorAll("[data-print-opt]").forEach(t=>{const n=()=>{const s=t.dataset.printOpt;let o;t.type==="checkbox"?o=t.checked:s==="copies"?o=Number(t.value)||1:s==="overlayOpacity"||s==="calibrationOffsetX"||s==="calibrationOffsetY"?o=Number(t.value)||0:o=t.value,a.printOptions={...a.printOptions,[s]:o},m()};t.addEventListener("change",n),t.type==="range"&&t.addEventListener("input",n)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(t=>{t.addEventListener("change",()=>{const n=Number(t.dataset.printLine),s=t.dataset.printLfield,o=[...a.printData.lines];let i=t.value;(s==="quantity"||s==="unitPrice")&&(i=Number(t.value)||0),o[n]={...o[n],[s]:i},o[n].amount=(Number(o[n].quantity)||0)*(Number(o[n].unitPrice)||0),a.printData={...a.printData,lines:o},m()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},m()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((s,o)=>o!==n)},m()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),alert("印刷設定を保存しました（次回以降も使えます）")}catch(t){alert("保存失敗: "+(t instanceof Error?t.message:String(t)))}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const t=a.printCompany,n=prompt("会社名",t.name);if(n===null)return;const s=prompt("郵便番号",t.postalCode)??t.postalCode,o=prompt("住所",t.address1)??t.address1,i=prompt("TEL",t.tel)??t.tel,c=prompt("FAX",t.fax)??t.fax,l=prompt("適格請求書登録番号 (T+13桁)",t.registrationNo)??t.registrationNo,r=prompt("取引銀行名",t.bankName)??t.bankName,d=prompt("支店名",t.bankBranch)??t.bankBranch,u=prompt("口座番号",t.bankAccountNo)??t.bankAccountNo,p=prompt("口座名義",t.bankAccountHolder)??t.bankAccountHolder;a.printCompany={...t,name:n,postalCode:s,address1:o,tel:i,fax:c,registrationNo:l,bankName:r,bankBranch:d,bankAccountNo:u,bankAccountHolder:p},m()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,m()}),e.querySelector("[data-action='fd-save-positions']")?.addEventListener("click",()=>{const t=e.querySelector(".fd-canvas");if(!t)return;const n=Ls(t);a.fdSavedPositions=n;try{localStorage.setItem("sake_fd_positions",JSON.stringify(n)),alert(`${Object.keys(n).length}件のフィールド位置を保存しました`)}catch(s){alert("保存失敗: "+(s instanceof Error?s.message:""))}}),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",()=>{confirm("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),m())}),a.fdDesignMode){const t=e.querySelector(".fd-canvas");if(t){const s=228.6/t.getBoundingClientRect().width;e.querySelectorAll(".fd-draggable").forEach(c=>{c.addEventListener("mousedown",l=>{l.preventDefault();const r=c.dataset.fdId??"";e.querySelectorAll(".fd-active").forEach(B=>B.classList.remove("fd-active")),c.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=r;const d=e.querySelector("#fd-selected-info"),u=e.querySelector("#fd-sel-x"),p=e.querySelector("#fd-sel-y");d&&(d.textContent=`選択中: ${c.title}`),u&&(u.value=String(parseFloat(c.style.left)||0)),p&&(p.value=String(parseFloat(c.style.top)||0));const h=l.clientX,f=l.clientY,P=parseFloat(c.style.left)||0,T=parseFloat(c.style.top)||0,y=B=>{const N=(B.clientX-h)*s,ne=(B.clientY-f)*s,w=Math.round((P+N)*2)/2,z=Math.round((T+ne)*2)/2;c.style.left=w+"mm",c.style.top=z+"mm",c.title=`${c.dataset.fdId} (${w.toFixed(1)}, ${z.toFixed(1)})`,u&&(u.value=String(w)),p&&(p.value=String(z))},S=()=>{c.classList.remove("fd-dragging"),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",S)};window.addEventListener("mousemove",y),window.addEventListener("mouseup",S)})});const o=e.querySelector("#fd-sel-x"),i=e.querySelector("#fd-sel-y");[o,i].forEach(c=>{c?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const l=e.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);l&&(o&&(l.style.left=o.value+"mm"),i&&(l.style.top=i.value+"mm"))})}),document.addEventListener("keydown",c=>{if(!a.fdDesignMode||!a.fdActiveFieldId)return;const l=e.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!l)return;const r=.5;let d=parseFloat(l.style.left)||0,u=parseFloat(l.style.top)||0;if(c.key==="ArrowLeft")d-=r,c.preventDefault();else if(c.key==="ArrowRight")d+=r,c.preventDefault();else if(c.key==="ArrowUp")u-=r,c.preventDefault();else if(c.key==="ArrowDown")u+=r,c.preventDefault();else return;l.style.left=d+"mm",l.style.top=u+"mm",o&&(o.value=String(d)),i&&(i.value=String(u))})}}e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,m();try{const t=a.importPreview.rows.filter(s=>s._valid),n=await Bs(a.importEntity,t);a.importResult=`取り込み完了: ${n.inserted}件成功 / ${n.failed}件失敗`,a.importPreview=null}catch(t){a.importResult=`エラー: ${t instanceof Error?t.message:String(t)}`}finally{a.importing=!1,m()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const t=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=t,a.storeSales=[],a.actionLoading=!0,m(),Ie(t).then(n=>{a.storeSales=n,a.actionLoading=!1,m()})}),e.querySelectorAll("[data-action='copy-config']").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.configValue??"";if(n)try{await navigator.clipboard.writeText(n),t.textContent="コピー済み",window.setTimeout(()=>{t.textContent="コピー"},1600)}catch(s){console.warn("Clipboard copy failed",s)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const n=JSON.stringify({supabase_url:se,supabase_anon_key:"（Supabaseダッシュボードから取得して貼り付け）",z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),s=new Blob([n],{type:"application/json;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download="relay_config.json",i.click(),URL.revokeObjectURL(o)}),e.querySelectorAll("[data-action='copy-code']").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.code??"";if(n)try{await navigator.clipboard.writeText(decodeURIComponent(n)),t.textContent="コピー済み",window.setTimeout(()=>{t.textContent="コピー"},1600)}catch(s){console.warn("Clipboard code copy failed",s)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(t=>{t.addEventListener("change",()=>{F(e),a.emailSaveMessage=null,m()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(t=>{t.addEventListener("change",()=>{F(e),a.emailSaveMessage=null,m()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{F(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{F(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(t=>{t.addEventListener("click",()=>{a.emailTemplateId=t.dataset.templateId??"custom";const n=Vt(a.emailTemplateId);a.emailSubject=n.subject,a.emailBody=n.body,a.emailSaveMessage=null,m()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{F(e);const t=`

商品詳細はこちら: https://example.jp/products/seasonal`;a.emailBody.includes("https://example.jp/products/seasonal")||(a.emailBody=`${a.emailBody.trimEnd()}${t}`),a.emailSaveMessage=null,m()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{F(e),a.actionLoading=!0,m(),he(De("draft")).then(t=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,m()})}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{F(e),a.actionLoading=!0,a.emailSending=!0,m();const t=De("sent");Ot().then(async n=>{await he({...t,recipientCount:n.sent}),a.emailSaveMessage=`${n.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,m(),window.alert(`${n.sent}件送信完了`)}).catch(async()=>{await he(De("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,m(),window.alert("APIキー未設定のため下書き保存しました")})})}function m(){const e=document.querySelector("#app");e&&(e.innerHTML=cn(),un(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Be()&&e.querySelector("#auth-email")?.focus())}async function pn(){a.loading=!0,m();try{const[e,t,n,s,o,i,c]=await Promise.all([ft(),$t(),kt(),St(),be(a.invoiceFilter),Re(a.ledgerCustomerCode),wt()]);if(a.salesSummary=e,a.paymentStatus=t,a.masterStats=n,a.pipelineMeta=s,a.invoiceRecords=o,a.customerLedger=i,a.salesAnalytics=c,!a.salesFilter.startDate||!a.salesFilter.endDate){const r=[...e.salesRecords].sort((p,h)=>new Date(h.date).getTime()-new Date(p.date).getTime())[0]?.date??new Date().toISOString(),d=new Date(r),u=new Date(d);u.setDate(d.getDate()-30),a.salesFilter={startDate:rt(u.toISOString()),endDate:rt(d.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await be(a.invoiceFilter)),a.error=null}catch(e){a.error=e instanceof Error?e.message:"データの取得に失敗しました。"}finally{a.loading=!1,m(),ze(a.route)}}window.addEventListener("popstate",()=>{a.route=Ut(location.pathname),a.currentCategory=Je(a.route),a.sidebarOpen=!1,ae(),ze(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,m();return}if(e.key==="Escape"){if(a.globalSearchOpen){ae(),m();return}if(a.pickerMode){ge(),m();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Ht(),m());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Kt(t)}});a.user=je()?sa():null;try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}pn();
