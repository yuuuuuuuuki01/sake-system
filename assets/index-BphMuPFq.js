(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function s(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(l){if(l.ep)return;l.ep=!0;const o=s(l);fetch(l.href,o)}})();const Be="modulepreload",Ve=function(t){return"/sake-system/"+t},qt={},N=function(e,s,n){let l=Promise.resolve();if(s&&s.length>0){let r=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var d=r;document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");l=r(s.map(u=>{if(u=Ve(u),u in qt)return;qt[u]=!0;const p=u.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":Be,p||(v.as="script"),v.crossOrigin="",v.href=u,c&&v.setAttribute("nonce",c),document.head.appendChild(v),p)return new Promise((y,D)=>{v.addEventListener("load",y),v.addEventListener("error",()=>D(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return l.then(i=>{for(const c of i||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})},z="https://loarwnuyvfxiscjjsmiz.supabase.co",ft="";async function $t(t,e){return null}async function k(t,e={}){return[]}const ne=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ft,SUPABASE_URL:z,supabaseInsert:$t,supabaseQuery:k},Symbol.toStringTag,{value:"Module"})),kt="sake_auth";function le(t){localStorage.setItem(kt,JSON.stringify(t))}function oe(){return{apikey:ft,"Content-Type":"application/json"}}function Ue(t){try{const[,e]=t.split(".");if(!e)return null;const s=e.replaceAll("-","+").replaceAll("_","/"),n=s.padEnd(Math.ceil(s.length/4)*4,"=");return JSON.parse(atob(n))}catch{return null}}async function ie(t,e){const s=await fetch(`${z}/auth/v1/${t}`,{method:"POST",headers:oe(),body:JSON.stringify(e)}),n=await s.json().catch(()=>({}));if(!s.ok)throw new Error(n.error_description??n.msg??`HTTP ${s.status}`);return n}async function He(t,e){const s=await ie("token?grant_type=password",{email:t,password:e});return le({access_token:s.access_token,refresh_token:s.refresh_token}),{email:s.user?.email??t}}async function Ye(t,e){const s=await ie("signup",{email:t,password:e});return s.access_token&&s.refresh_token&&le({access_token:s.access_token,refresh_token:s.refresh_token}),{email:s.user?.email??t}}async function Ke(){const t=St();if(localStorage.removeItem(kt),!!t?.access_token)try{await fetch(`${z}/auth/v1/logout`,{method:"POST",headers:{...oe(),Authorization:`Bearer ${t.access_token}`}})}catch(e){console.warn("Supabase sign out failed",e)}}function St(){const t=localStorage.getItem(kt);if(!t)return null;try{const e=JSON.parse(t);return!e.access_token||!e.refresh_token?null:{access_token:e.access_token,refresh_token:e.refresh_token}}catch{return null}}function ze(){const t=St();if(!t)return null;const e=Ue(t.access_token),s=typeof e?.email=="string"?e.email:null;return s?{email:s}:null}const wt={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},lt={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(t,e)=>{const s=new Date("2026-03-17T00:00:00+09:00");return s.setDate(s.getDate()+e),{date:s.toISOString(),amount:42e4+e*73123%62e4}}),salesRecords:Array.from({length:20},(t,e)=>{const s=new Date("2026-04-15T00:00:00+09:00");return s.setDate(s.getDate()-e),{id:`sale-${e+1}`,documentNo:`D${String(240100+e).padStart(6,"0")}`,date:s.toISOString(),customerCode:`C${String(e+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][e%4],amount:68e3+e%6*24500}})},Qe={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},A={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(t,e)=>({id:`customer-${e+1}`,code:`C${String(e+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][e%6],closingDay:[15,20,25,31][e%4],paymentDay:[5,10,15,20][e%4],isActive:e%5!==0})),products:Array.from({length:12},(t,e)=>({id:`product-${e+1}`,code:`P${String(e+1).padStart(5,"0")}`,janCode:`4901234567${String(e).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][e%4],category:["清酒","焼酎","リキュール"][e%3],isActive:e%6!==0}))},We={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"},ce=lt.salesRecords.map((t,e)=>({...t,itemCount:e%4+1})),Ge={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},ot={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function f(t){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){const e=Number(t);return Number.isFinite(e)?e:0}return 0}function Xe(t){switch((t??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Ze(t){return typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"?["true","1","active","enabled","yes","y"].includes(t.toLowerCase()):!1}function x(t,e,s=""){for(const n of e){const l=t[n];if(typeof l=="string"&&l.length>0)return l}return s}function It(t,e,s=0){for(const n of e)if(n in t)return f(t[n]);return s}function Ot(t,e,s=!0){for(const n of e)if(n in t)return Ze(t[n]);return s}function re(t,e,s){for(const n of e){const l=t[n];if(typeof l!="string"||l.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(l))return new Date(`${l}T00:00:00Z`).toISOString();const o=new Date(l);if(!Number.isNaN(o.getTime()))return o.toISOString()}return s}function de(t){return t.slice(0,7)}function xt(t,e){return{id:String(t.id??`invoice-${e+1}`),documentNo:t.document_no??t.legacy_document_no??`D${String(240100+e).padStart(6,"0")}`,date:re(t,["sales_date","document_date"],new Date().toISOString()),customerCode:t.customer_code??t.legacy_customer_code??`C${String(e+1).padStart(4,"0")}`,customerName:t.customer_name??t.customer_code??t.legacy_customer_code??"不明",itemCount:0,amount:f(t.total_amount??t.billed_amount)}}function Ft(t,e){const s=e.startDate?new Date(`${e.startDate}T00:00:00`):null,n=e.endDate?new Date(`${e.endDate}T23:59:59`):null,l=e.documentNo.trim().toLowerCase(),o=e.customerCode.trim().toLowerCase();return t.filter(d=>{const i=new Date(d.date);return!(s&&i<s||n&&i>n||l&&!d.documentNo.toLowerCase().includes(l)||o&&!d.customerCode.toLowerCase().includes(o))}).sort((d,i)=>new Date(i.date).getTime()-new Date(d.date).getTime())}function Jt(t){const e=t.trim().toUpperCase(),s=Ge[e];if(s)return s;const n=lt.salesRecords.find(l=>l.customerCode.toUpperCase()===e);return{customerCode:e||"未指定",customerName:n?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function ta(){const t=new Map,e=new Map,s=new Map;return ce.forEach((n,l)=>{const o=de(n.date);t.set(o,(t.get(o)??0)+n.amount);const d=e.get(n.customerCode)??{code:n.customerCode,name:n.customerName,amount:0,quantity:0,documents:0};d.amount+=n.amount,d.quantity+=n.itemCount,d.documents+=1,e.set(n.customerCode,d);const i=`P${String(l%4+1).padStart(5,"0")}`,c=ot.productTotals[l%ot.productTotals.length],r=s.get(i)??{code:i,name:c?.name??`商品${l+1}`,amount:0,quantity:0,documents:0};r.amount+=n.amount,r.quantity+=n.itemCount*12,r.documents+=1,s.set(i,r)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(t.entries()).sort(([n],[l])=>n.localeCompare(l)).map(([n,l])=>({month:n,amount:l})),productTotals:Array.from(s.values()).sort((n,l)=>l.amount-n.amount),customerTotals:Array.from(e.values()).sort((n,l)=>l.amount-n.amount)}}async function g(t,e){try{const s=await fetch(`/sake-system/${t}`,{headers:{Accept:"application/json"}});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(s){return console.warn(`Failed to fetch ${t}, using fallback data`,s),e}}async function ue(){const t=await k("daily_sales_fact",{});if(t.length>0){const e=await k("customer_payment_status",{}),n=new Date().toISOString().slice(0,10),l=n.slice(0,7),o=[...t].sort((r,u)=>r.sales_date.localeCompare(u.sales_date)).slice(-30).map(r=>({date:new Date(`${r.sales_date}T00:00:00Z`).toISOString(),amount:f(r.sales_amount)})),d=t.reduce((r,u)=>u.sales_date===n?r+f(u.sales_amount):r,0),i=t.reduce((r,u)=>u.sales_date.startsWith(l)?r+f(u.sales_amount):r,0),c=e.filter(r=>f(r.balance_amount)>0);return{generatedAt:new Date().toISOString(),kpis:{todaySales:d,todayDelta:0,monthSales:i,monthDelta:0,unpaidCount:c.length,unpaidAmount:c.reduce((r,u)=>r+f(u.balance_amount),0)},dailySales:o,salesRecords:lt.salesRecords}}return g("data/api/latest/sales-summary.json",lt)}async function pe(){const t=await k("customer_payment_status",{});return t.length>0?{generatedAt:new Date().toISOString(),records:t.map((e,s)=>{const n=e.legacy_customer_code??`UNKNOWN-${s+1}`;return{id:`payment-${n}-${s+1}`,customerCode:n,customerName:n,billedAmount:f(e.billed_amount),paymentAmount:f(e.paid_amount),balanceAmount:f(e.balance_amount),lastPaymentDate:null,status:Xe(e.payment_status)}})}:g("data/api/latest/payment-status.json",Qe)}async function me(){const[t,e]=await Promise.all([k(),k()]);if(t.length>0||e.length>0){const s=t.length?t.map((l,o)=>({id:x(l,["id","customer_id","code"],`customer-${o+1}`),code:x(l,["code","customer_code","legacy_customer_code"],`C${String(o+1).padStart(4,"0")}`),name:x(l,["name","customer_name","display_name"],`Customer ${o+1}`),closingDay:It(l,["closing_day","close_day"],31),paymentDay:It(l,["payment_day","due_day"],15),isActive:Ot(l,["is_active","active","enabled"],!0)})):A.customers,n=e.length?e.map((l,o)=>({id:x(l,["id","product_id","code"],`product-${o+1}`),code:x(l,["code","product_code"],`P${String(o+1).padStart(5,"0")}`),janCode:x(l,["jan_code","jan","barcode"],""),name:x(l,["name","product_name","display_name"],`Product ${o+1}`),category:x(l,["category","category_name"],"未分類"),isActive:Ot(l,["is_active","active","enabled"],!0)})):A.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:t.length||A.summary.customerCount,activeCustomerCount:t.length?s.filter(l=>l.isActive).length:A.summary.activeCustomerCount,productCount:e.length||A.summary.productCount,activeProductCount:e.length?n.filter(l=>l.isActive).length:A.summary.activeProductCount},customers:s,products:n}}return g("data/api/latest/master-stats.json",A)}function he(){return g("data/api/latest/pipeline-meta.json",We)}async function it(t){const[e,s]=await Promise.all([k("sales_document_headers",{}),k("sales_document_lines",{})]);if(e.length>0){const n=new Map;s.forEach(o=>{const d=String(o.header_id??o.document_header_id??o.document_no??o.id??"");d&&n.set(d,(n.get(d)??0)+1)});const l=e.map((o,d)=>{const i=xt(o,d),c=String(o.id??o.document_no??o.legacy_document_no??"");return{...i,itemCount:n.get(c)??i.itemCount}});return Ft(l,t)}return Ft(ce,t)}async function Ct(t){const e=t.trim().toUpperCase();if(!e)return Jt("");const[s,n,l]=await Promise.all([k("sales_document_headers",{}),k("customer_payments",{}),k("customer_payment_status",{})]);if(s.length>0||n.length>0){const o=s.map((c,r)=>{const u=xt(c,r);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),d=n.map((c,r)=>({id:String(c.id??`payment-${r+1}`),date:re(c,["payment_date","received_date"],new Date().toISOString()),amount:f(c.payment_amount??c.amount),method:c.payment_method??c.method??"入金"})),i=l.find(c=>(c.legacy_customer_code??"").toUpperCase()===e);return{customerCode:e,customerName:s[0]?.customer_name??s[0]?.customer_code??s[0]?.legacy_customer_code??e,balanceAmount:f(i?.balance_amount),salesTotal:o.reduce((c,r)=>c+r.amount,0),paymentTotal:d.reduce((c,r)=>c+r.amount,0),salesHistory:o,paymentHistory:d}}return Jt(e)}async function ve(){const[t,e,s]=await Promise.all([k("daily_sales_fact",{}),k("sales_document_headers",{}),k("sales_document_lines",{})]);if(t.length>0){const n=new Map;t.forEach(d=>{const i=de(d.sales_date);n.set(i,(n.get(i)??0)+f(d.sales_amount))});const l=new Map;e.forEach((d,i)=>{const c=xt(d,i),r=l.get(c.customerCode)??{code:c.customerCode,name:c.customerName,amount:0,quantity:0,documents:0};r.amount+=c.amount,r.documents+=1,l.set(c.customerCode,r)});const o=new Map;return s.forEach((d,i)=>{const c=d.product_code??d.legacy_product_code??`P${String(i+1).padStart(5,"0")}`,r=o.get(c)??{code:c,name:d.product_name??c,amount:0,quantity:0,documents:0};r.amount+=f(d.line_amount??d.amount),r.quantity+=f(d.quantity),r.documents+=1,o.set(c,r)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(n.entries()).sort(([d],[i])=>d.localeCompare(i)).map(([d,i])=>({month:d,amount:i})).slice(-12),productTotals:o.size>0?Array.from(o.values()).sort((d,i)=>i.amount-d.amount):ot.productTotals,customerTotals:l.size>0?Array.from(l.values()).sort((d,i)=>i.amount-d.amount):ot.customerTotals}}return ta()}const yt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function ye(t){const e=t.lines.reduce((l,o)=>l+o.amount,0),s=`D${Date.now().toString().slice(-6)}`;return{id:(await $t("sales_document_headers",{legacy_customer_code:t.customerCode,sales_date:t.invoiceDate,document_type:t.invoiceType,staff_code:t.staffCode}))?.id??`local-${s}`,documentNo:s,totalAmount:e,status:"confirmed",createdAt:new Date().toISOString()}}const Bt={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function Dt(t){const e=await k("sales_document_headers",{});if(e.length>0){const s=e[0],n=f(s.total_amount);return{documentNo:t,invoiceDate:x(s,["sales_date","document_date"],""),customerCode:x(s,["legacy_customer_code","customer_code"],""),customerName:x(s,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:n,taxAmount:Math.floor(n*10/110),note:""}}return{...Bt,documentNo:t||Bt.documentNo}}const ea={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function _t(t){return g(`data/api/latest/billing-${t}.json`,{...ea,targetYearMonth:t})}const aa=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],sa={generatedAt:new Date().toISOString(),months:aa,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(t=>t*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(t=>t*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(t=>t*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(t=>t*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(t=>t*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function be(){return g("data/api/latest/sales-report.json",sa)}const ge={planned:"計画中",active:"仕込中",done:"完了"},na=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function fe(){return g("data/api/latest/jikomi.json",na)}const la=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function $e(){return g("data/api/latest/tanks.json",la)}const oa=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function ke(){return g("data/api/latest/kentei.json",oa)}const ia=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function Se(){return g("data/api/latest/materials.json",ia)}const ca=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],ra=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],da=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],ua=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function we(){return g("data/api/latest/purchases.json",ca)}async function xe(){return g("data/api/latest/payables.json",ra)}async function Ce(){return g("data/api/latest/bills.json",da)}async function De(){return g("data/api/latest/raw-stock.json",ua)}const _e=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],bt={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},pa={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",companyAddress:"神奈川県秦野市堀山下182",companyRepresentative:"金井 和雄",taxOffice:"小田原税務署",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,productionVolume:3800,previousBalance:0,currentAdjustment:0,exportDeduction:100,sampleDeduction:100,taxableVolume:3600,volume:3600,taxRate:100,taxAmount:36e4},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,productionVolume:2900,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:2850,volume:2850,taxRate:100,taxAmount:285e3},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,productionVolume:1250,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:1200,volume:1200,taxRate:100,taxAmount:12e4}],deductions:[{type:"export",categoryCode:"01",volume:100,reason:"シンガポール向け輸出",documentNo:"EX2026-003"},{type:"sample",categoryCode:"01",volume:100,reason:"展示会サンプル出荷"},{type:"sample",categoryCode:"02",volume:50,reason:"品評会出品"},{type:"sample",categoryCode:"03",volume:50,reason:"全国新酒鑑評会出品"}],totalVolume:7650,totalTax:765e3,status:"draft",submittedAt:null};async function Nt(t,e){return g(`data/api/latest/tax-${t}-${String(e).padStart(2,"0")}.json`,{...pa,targetYear:t,targetMonth:e})}function S(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Ne(t){const e=t.rows.map(n=>`    <Category>
      <Code>${S(n.taxCategory)}</Code>
      <Name>${S(n.taxCategoryName)}</Name>
      <AlcoholDegree>${n.alcoholDegree}</AlcoholDegree>
      <ProductionVolume>${n.productionVolume}</ProductionVolume>
      <PreviousBalance>${n.previousBalance}</PreviousBalance>
      <CurrentAdjustment>${n.currentAdjustment}</CurrentAdjustment>
      <ExportDeduction>${n.exportDeduction}</ExportDeduction>
      <SampleDeduction>${n.sampleDeduction}</SampleDeduction>
      <TaxableVolume>${n.taxableVolume}</TaxableVolume>
      <TaxRate>${n.taxRate}</TaxRate>
      <TaxAmount>${n.taxAmount}</TaxAmount>
    </Category>`).join(`
`),s=t.deductions.map(n=>`    <Deduction type="${S(n.type)}">
      <CategoryCode>${S(n.categoryCode)}</CategoryCode>
      <Volume>${n.volume}</Volume>
      <Reason>${S(n.reason)}</Reason>${n.documentNo?`
      <DocumentNo>${S(n.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${t.targetYear}</TargetYear>
    <TargetMonth>${String(t.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${S(t.companyNo)}</TaxpayerId>
    <TaxpayerName>${S(t.companyName)}</TaxpayerName>
    <TaxpayerAddress>${S(t.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${S(t.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${S(t.taxOffice)}</TaxOffice>
    <Status>${t.status}</Status>
  </Header>
  <Categories>
${e}
  </Categories>
  <Deductions>
${s}
  </Deductions>
  <Total>
    <TotalVolume>${t.totalVolume}</TotalVolume>
    <TotalTax>${t.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function ma(t){const e=String(t);return/[,"\n]/.test(e)?`"${e.replaceAll('"','""')}"`:e}function ha(t){const s=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),n=t.rows.map(o=>[o.taxCategory,o.taxCategoryName,o.alcoholDegree,o.productionVolume,o.previousBalance,o.currentAdjustment,o.exportDeduction,o.sampleDeduction,o.taxableVolume,o.taxRate,o.taxAmount].map(ma).join(",")),l=`,合計,,${t.rows.reduce((o,d)=>o+d.productionVolume,0)},,,${t.rows.reduce((o,d)=>o+d.exportDeduction,0)},${t.rows.reduce((o,d)=>o+d.sampleDeduction,0)},${t.totalVolume},,${t.totalTax}`;return"\uFEFF"+[s,...n,l].join(`
`)+`
`}function va(t){const e=t.rows.map(l=>{const o=Math.max(0,l.productionVolume+l.previousBalance+l.currentAdjustment-l.exportDeduction-l.sampleDeduction),d=Math.round(o*l.taxRate);return{...l,taxableVolume:o,volume:o,taxAmount:d}}),s=e.reduce((l,o)=>l+o.taxableVolume,0),n=e.reduce((l,o)=>l+o.taxAmount,0);return{...t,rows:e,totalVolume:s,totalTax:n}}async function ya(t){const{supabaseInsert:e}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);await e("tax_declarations",{target_year:t.targetYear,target_month:t.targetMonth,company_name:t.companyName,company_no:t.companyNo,company_address:t.companyAddress,company_representative:t.companyRepresentative,tax_office:t.taxOffice,total_taxable_volume:t.totalVolume,total_tax_amount:t.totalTax,status:t.status,xml_data:Ne(t),submitted_at:t.submittedAt})}const ba=Array.from({length:10},(t,e)=>({id:`ss${e+1}`,saleDate:"2026-04-15",saleTime:`${9+e}:${String(e*7%60).padStart(2,"0")}`,productCode:`P${String(e%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][e%4],quantity:1+e%3,unitPrice:[2200,1800,980,680][e%4],amount:(1+e%3)*[2200,1800,980,680][e%4],paymentMethod:["cash","card","paypay","cash"][e%4]})),ga=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function At(t){return g(`data/api/latest/store-sales-${t}.json`,ba)}async function Ae(){return g("data/api/latest/store-orders.json",ga)}async function nt(t){const e=await $t("email_campaigns",{subject:t.subject,body:t.body,template_id:t.templateId,audience_mode:t.audienceMode,audience_filter:t.audienceFilter,recipient_count:t.recipientCount,sent_count:t.status==="sent"?t.recipientCount:0,status:t.status,sent_at:t.status==="sent"?new Date().toISOString():null});return{id:e?.id??`local-email-${Date.now()}`,subject:e?.subject??t.subject,body:e?.body??t.body,templateId:e?.template_id??t.templateId,audienceMode:e?.audience_mode??t.audienceMode,audienceFilter:e?.audience_filter??t.audienceFilter,recipientCount:e?.recipient_count??t.recipientCount,status:e?.status??t.status,createdAt:e?.created_at??new Date().toISOString(),updatedAt:e?.updated_at??new Date().toISOString()}}async function Le(t){throw new Error("VITE_RESEND_API_KEY is not configured")}const R=Object.freeze(Object.defineProperty({__proto__:null,INVOICE_TYPE_LABELS:yt,JIKOMI_STATUS_LABELS:ge,SEASONAL_TEMPLATES:wt,TAX_DEDUCTION_LABELS:bt,TAX_RATE_CATEGORIES:_e,fetchBillList:Ce,fetchBillingSummary:_t,fetchCustomerLedger:Ct,fetchDeliveryNote:Dt,fetchInvoices:it,fetchJikomiList:fe,fetchKenteiList:ke,fetchMasterStats:me,fetchMaterialList:Se,fetchPayableList:xe,fetchPaymentStatus:pe,fetchPipelineMeta:he,fetchPurchaseList:we,fetchRawMaterialStock:De,fetchSalesAnalytics:ve,fetchSalesReport:be,fetchSalesSummary:ue,fetchStoreOrders:Ae,fetchStoreSales:At,fetchTankList:$e,fetchTaxDeclaration:Nt,generateTaxCSV:ha,generateTaxXML:Ne,recalculateTaxDeclaration:va,saveEmailCampaign:nt,saveInvoice:ye,saveTaxDeclaration:ya,sendEmailCampaign:Le},Symbol.toStringTag,{value:"Module"}));function M(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const fa={open:"未締め",closed:"締め済"};function $a(t,e){const s=t.customers.map(n=>`
      <tr>
        <td>
          <div class="table-title">${n.customerName}</div>
          <div class="table-sub mono">${n.customerCode}</div>
        </td>
        <td class="numeric">${n.closingDay}日</td>
        <td class="numeric">${M(n.salesAmount)}</td>
        <td class="numeric">${M(n.taxAmount)}</td>
        <td class="numeric">${M(n.prevBalance)}</td>
        <td class="numeric">${M(n.paymentAmount)}</td>
        <td class="numeric"><strong>${M(n.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${n.status==="closed"?"success":"warning"}">${fa[n.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="billing-print" data-code="${n.customerCode}" ${n.status==="closed"?"":"disabled"}>請求書</button>
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
          <input id="billing-month" type="month" value="${e}" />
        </label>
        <label class="field">
          <span>締め日</span>
          <select id="billing-day">
            ${[10,15,20,25,31].map(n=>`<option value="${n}" ${t.closingDay===n?"selected":""}>${n}日締め</option>`).join("")}
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
        <p class="kpi-value">${M(t.totalBilling)}</p>
        <p class="kpi-sub">${t.targetYearMonth} / ${t.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${t.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${t.customers.filter(n=>n.status==="closed").length} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先別請求一覧</h2>
          <p class="panel-caption">${t.targetYearMonth} 分</p>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}const ka={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"}]},Sa={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},more:{eyebrow:"その他トップ",title:"周辺業務メニュー",description:"税務、店舗、分析、設定などの補助機能をまとめて配置しています。"}};function Vt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Q(t){const e=Sa[t],s=ka[t].map(n=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Vt(n.title)}</p>
            <p class="category-card-description">${Vt(n.description)}</p>
          </div>
          <div class="category-card-actions">
            <button class="button secondary" type="button" data-link="${n.path}">
              開く →
            </button>
          </div>
        </article>
      `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">${e.eyebrow}</p>
        <h1>${e.title}</h1>
        <p class="meta-note">${e.description}</p>
      </div>
    </section>

    <section class="category-grid">
      ${s}
    </section>
  `}function je(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function H(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function wa(t){return t.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.salesHistory.map(e=>`
        <tr>
          <td>${je(e.date)}</td>
          <td class="mono">${e.documentNo}</td>
          <td class="numeric">${H(e.amount)}</td>
        </tr>
      `).join("")}function xa(t){return t.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.paymentHistory.map(e=>`
        <tr>
          <td>${je(e.date)}</td>
          <td>${e.method}</td>
          <td class="numeric">${H(e.amount)}</td>
        </tr>
      `).join("")}function Ca(t,e){return`
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
          <input id="ledger-customer-code" type="text" value="${e}" placeholder="C0011" />
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
            <h2>${t.customerName}</h2>
            <p class="panel-caption mono">${t.customerCode}</p>
          </div>
        </div>
        <dl class="summary-list">
          <div>
            <dt>売上累計</dt>
            <dd>${H(t.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${H(t.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${t.balanceAmount>0?"balance-warning":""}">${H(t.balanceAmount)}</dd>
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
            <tbody>${wa(t)}</tbody>
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
            <tbody>${xa(t)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function W(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function G(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function J(t,e){for(const s of e){const n=t[s];if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"){const l=Number(n);if(Number.isFinite(l))return l}}return null}function Da(t){const e=t?.productTotals;if(!e||e.length===0)return"―";const s=e.reduce((l,o)=>{const d=J(o,["amount","salesAmount"]),i=J(o,["marginRate","grossMarginRate"]);return d===null||d<=0||i===null?l:{weightedAmount:l.weightedAmount+d,weightedRate:l.weightedRate+d*i}},{weightedAmount:0,weightedRate:0});if(s.weightedAmount>0)return`${(s.weightedRate/s.weightedAmount).toFixed(1)}%`;const n=e.reduce((l,o)=>{const d=o,i=J(d,["amount","salesAmount"]),c=J(d,["grossProfit","grossAmount","margin"]),r=J(d,["costAmount","cost","costPrice"]);if(i===null||i<=0)return l;const u=c??(r!==null?i-r:null);return u===null?l:{sales:l.sales+i,gross:l.gross+u}},{sales:0,gross:0});return n.sales>0?`${(n.gross/n.sales*100).toFixed(1)}%`:"―"}function _a(t){const n={top:20,right:20,bottom:30,left:50},l=760-n.left-n.right,o=260-n.top-n.bottom,d=Math.max(...t.map(u=>u.amount),1),i=l/t.length,c=t.map((u,p)=>{const h=u.amount/d*o,v=n.left+p*i+4,y=n.top+o-h,D=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${v}" y="${y}" width="${Math.max(i-8,8)}" height="${h}" rx="4" fill="#0F5B8D" opacity="${.58+p/t.length*.34}" />
          ${p%5===0?`<text x="${v+6}" y="252" class="chart-axis">${D}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=n.top+o-o*u,h=Math.round(d*u/1e3);return`
        <g>
          <line x1="${n.left}" y1="${p}" x2="${760-n.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${h.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${c}
    </svg>
  `}function Na(t,e,s){const n={success:"正常",warning:"注意",error:"異常",running:"実行中"},l=t.salesRecords.slice(0,10).map(o=>`
            <tr>
              <td class="mono">${o.documentNo}</td>
              <td>${G(o.date)}</td>
              <td>${o.customerName}</td>
              <td class="numeric">${W(o.amount)}</td>
            </tr>
          `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${e.status}">${n[e.status]}</span>
        <span class="meta-note">最終同期 ${G(e.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${W(t.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${t.kpis.todayDelta>0?"+":""}${t.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${W(t.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${t.kpis.monthDelta>0?"+":""}${t.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${t.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${W(t.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${Da(s)}</p>
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
        ${_a(t.dailySales)}
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
              <dd>${e.jobName}</dd>
            </div>
            <div>
              <dt>最終同期</dt>
              <dd>${G(e.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${G(e.generatedAt)}</dd>
            </div>
          </dl>
        </div>
        <div class="sync-panel-bottom">
          <p class="sync-message">${e.message}</p>
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
          <tbody>${l}</tbody>
        </table>
      </div>
    </section>
  `}function Aa(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(t)):""}function q(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function La(t,e){const s=t.lines.length?t.lines.map((l,o)=>`
          <tr>
            <td class="numeric">${o+1}</td>
            <td class="mono">${l.productCode}</td>
            <td>${l.productName}</td>
            <td class="numeric">${l.quantity.toLocaleString("ja-JP")}</td>
            <td>${l.unit}</td>
            <td class="numeric">${q(l.unitPrice)}</td>
            <td class="numeric">${q(l.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',n=t.totalAmount-t.taxAmount;return`
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
          <input id="delivery-docno" type="text" placeholder="D240122" value="${e}" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="delivery-search">呼出し</button>
        </div>
      </div>
    </section>

    <article class="panel delivery-note-body" id="delivery-print-area">
      <div class="delivery-header">
        <div class="delivery-to">
          <p class="delivery-address">${t.customerAddress}</p>
          <h2 class="delivery-customer">${t.customerName} 御中</h2>
          <p class="delivery-label-large">納　品　書</p>
        </div>
        <div class="delivery-meta">
          <table class="delivery-meta-table">
            <tr><th>伝票番号</th><td class="mono">${t.documentNo}</td></tr>
            <tr><th>納品日</th><td>${Aa(t.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${q(t.totalAmount)}（税込）</td></tr>
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
          <tbody>${s}</tbody>
        </table>
      </div>

      <div class="delivery-footer">
        <div class="delivery-totals">
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${q(n)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${q(t.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${q(t.totalAmount)}</span></div>
        </div>
        ${t.note?`<p class="delivery-note-text">備考：${t.note}</p>`:""}
      </div>
    </article>
  `}function _(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ja(t){return _(t).replaceAll(`
`,"<br />")}function Pa(t){const s=[...Object.values(wt),{id:"custom",season:"カスタム",subject:"",body:""}].map(l=>`
        <button
          class="template-card ${t.selectedTemplateId===l.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${l.id}"
        >
          <span class="template-card-kicker">${l.season}</span>
          <strong>${_(l.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),n=t.previewRecipients.length?t.previewRecipients.map(l=>`
            <li>
              <span>${_(l.name)}</span>
              <span class="table-sub">${_(l.email)} / ${_(l.area)}</span>
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
            <input type="radio" name="email-audience-mode" value="all" ${t.audienceMode==="all"?"checked":""} />
            <span>全顧客</span>
          </label>
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="area" ${t.audienceMode==="area"?"checked":""} />
            <span>エリア別</span>
          </label>
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="history" ${t.audienceMode==="history"?"checked":""} />
            <span>過去購入履歴で絞り込み</span>
          </label>
        </div>
        <div class="filter-grid email-filter-grid">
          <label class="field">
            <span>エリア</span>
            <select id="email-region">
              <option value="all" ${t.region==="all"?"selected":""}>全エリア</option>
              <option value="北海道" ${t.region==="北海道"?"selected":""}>北海道</option>
              <option value="関東" ${t.region==="関東"?"selected":""}>関東</option>
              <option value="中部" ${t.region==="中部"?"selected":""}>中部</option>
              <option value="関西" ${t.region==="関西"?"selected":""}>関西</option>
              <option value="九州" ${t.region==="九州"?"selected":""}>九州</option>
            </select>
          </label>
          <label class="field">
            <span>購入履歴</span>
            <select id="email-history-segment">
              <option value="seasonal" ${t.historySegment==="seasonal"?"selected":""}>季節商品購入客</option>
              <option value="premium" ${t.historySegment==="premium"?"selected":""}>吟醸系購入客</option>
              <option value="liqueur" ${t.historySegment==="liqueur"?"selected":""}>リキュール購入客</option>
            </select>
          </label>
        </div>
        <p class="recipient-count">${t.recipientCount.toLocaleString("ja-JP")} 件が対象です。</p>
        <ul class="recipient-preview">
          ${n}
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
          ${s}
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
          <input id="email-subject" type="text" value="${_(t.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${_(t.body)}</textarea>
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
          <p class="panel-title">${_(t.subject||"件名未入力")}</p>
          <div class="preview-box">${t.body?ja(t.body):"本文未入力"}</div>
        </div>
        ${t.saveMessage?`<p class="meta-note">${_(t.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${t.sending?"disabled":""}>
            ${t.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function w(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function X(t,e){return e.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${t}</p>
      <div class="search-result-list">
        ${e.join("")}
      </div>
    </section>
  `}function Ea(t,e){const s=[X("得意先",e.customers.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${w(l.name)}</strong>
            <span class="table-sub mono">${w(l.code)}</span>
          </button>
        `)),X("商品",e.products.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${w(l.name)}</strong>
            <span class="table-sub mono">${w(l.code)}</span>
          </button>
        `)),X("伝票",e.documents.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${w(l.documentNo)}</strong>
            <span class="table-sub">${w(l.customerName)} / ${w(l.date)}</span>
          </button>
        `)),X("ページ",e.pages.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${w(l.path)}"
          >
            <strong>${w(l.title)}</strong>
            <span class="table-sub mono">${w(l.path)}</span>
          </button>
        `))].filter(Boolean).join(""),n=t.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
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
            value="${w(t)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${s||n}
          </div>
        </div>
      </div>
    </div>
  `}function B(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Pe(t){const e=t.resultsHtml.trim()?t.resultsHtml:`<p class="empty-note">${B(t.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${B(t.title)}">
        <div class="modal-header">
          <h2>${B(t.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${B(t.placeholder)}"
            value="${B(t.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${e}</div>
        </div>
      </div>
    </div>
  `}function Z(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ut(t){return t.trim().toLowerCase()}function Ta(t,e){const s=Ut(e),n=t.filter(o=>s?[o.code,o.name,o.name].map(Ut).some(d=>d.includes(s)):!0).slice(0,50),l=n.length?`
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
              ${n.map(o=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Z(o.code)}"
                      data-name="${Z(o.name)}"
                    >
                      <td class="mono">${Z(o.code)}</td>
                      <td>${Z(o.name)}</td>
                      <td>${o.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Pe({title:"得意先検索",searchQuery:e,placeholder:"コード・名前で検索",resultsHtml:l,emptyMessage:"該当する得意先が見つかりません。"})}function Ra(t){return t.toISOString().slice(0,10)}function T(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function L(t,e){return t[e]?`<div class="field-error">${T(t[e])}</div>`:""}function I(t,e,s=""){return[s,t[e]?"has-error":""].filter(Boolean).join(" ")}function Ma(t,e,s,n){const l=Object.keys(yt).map(c=>`<option value="${c}" ${t.invoiceType===c?"selected":""}>${yt[c]}</option>`).join(""),o=t.lines.map((c,r)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${I(n,`lines.${r}.productCode`,"input-cell")}" type="text" data-line="${r}" data-field="productCode" value="${T(c.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${r}" aria-label="商品検索">🔍</button>
          </div>
          ${L(n,`lines.${r}.productCode`)}
        </td>
        <td>
          <input class="${I(n,`lines.${r}.productName`,"input-cell")}" type="text" data-line="${r}" data-field="productName" value="${T(c.productName)}" placeholder="商品名" />
          ${L(n,`lines.${r}.productName`)}
        </td>
        <td>
          <input class="${I(n,`lines.${r}.quantity`,"input-cell numeric")}" type="number" data-line="${r}" data-field="quantity" value="${c.quantity}" min="0" />
          ${L(n,`lines.${r}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${r}" data-field="unit" value="${c.unit}" placeholder="本" /></td>
        <td>
          <input class="${I(n,`lines.${r}.unitPrice`,"input-cell numeric")}" type="number" data-line="${r}" data-field="unitPrice" value="${c.unitPrice}" min="0" />
          ${L(n,`lines.${r}.unitPrice`)}
        </td>
        <td class="numeric">${c.amount>0?c.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${r}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${r}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),d=t.lines.reduce((c,r)=>c+r.amount,0),i=Math.floor(d*10/110);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">伝票入力</p>
        <h1>売上伝票入力</h1>
      </div>
      ${e?`<div class="meta-stack"><span class="status-pill success">保存済 ${e}</span></div>`:""}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>伝票基本情報</h2>
        <button class="button secondary" type="button" data-action="copy-past-invoice">過去伝票から複製</button>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>伝票種別</span>
          <select id="inv-type">${l}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${I(n,"invoiceDate")}" id="inv-date" type="date" value="${t.invoiceDate||Ra(new Date)}" />
          ${L(n,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${I(n,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${T(t.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${L(n,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${T(t.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${T(t.staffCode)}" />
        </label>
      </div>
      ${L(n,"lines")}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${t.lines.length} 行</p>
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
          <tbody id="invoice-lines">${o||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(d-i).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${i.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${d.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${T(t.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${s?"disabled":""}>
        ${s?"保存中…":"保存する"}
      </button>
    </div>
  `}function qa(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function Ia(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Oa(t,e){const s=t.length?t.map(n=>`
            <tr>
              <td class="mono">${n.documentNo}</td>
              <td>${qa(n.date)}</td>
              <td>
                <div class="table-title">${n.customerName}</div>
                <div class="table-sub mono">${n.customerCode}</div>
              </td>
              <td class="numeric">${n.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Ia(n.amount)}</td>
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
          <input id="invoice-document-no" type="text" value="${e.documentNo}" placeholder="D240100" />
        </label>
        <label class="field">
          <span>開始日</span>
          <input id="invoice-start" type="date" value="${e.startDate}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="invoice-end" type="date" value="${e.endDate}" />
        </label>
        <label class="field">
          <span>得意先コード</span>
          <input id="invoice-customer-code" type="text" value="${e.customerCode}" placeholder="C0011" />
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
          <p class="panel-caption">${t.length.toLocaleString("ja-JP")} 件</p>
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
          <tbody>${s}</tbody>
        </table>
      </div>
      ${t.length===0?'<p class="empty-note">条件に一致する伝票はありません。</p>':""}
    </section>
  `}function Fa(t){return new Date(t.getFullYear(),t.getMonth(),1)}function Ja(t,e){return new Date(t.getFullYear(),t.getMonth()+e,1)}function Ee(t,e){const s=new Date(t);return s.setDate(s.getDate()+e),s}function Te(t){const e=new Date(t),s=e.getDay();return e.setDate(e.getDate()-s),e.setHours(0,0,0,0),e}function Ht(t){const e=Ee(Te(t),6);return e.setHours(23,59,59,999),e}function Yt(t){return new Date(`${t}T00:00:00`)}function Kt(t){return`${t.getMonth()+1}/${t.getDate()}`}function Ba(t){return t.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Va(){const t=new Date,e=Te(Ja(Fa(t),-3)),s=Ht(new Date(t.getFullYear(),t.getMonth()+4,0)),n=[];let l=new Date(e);for(;l<=s;){const o=Ht(l);n.push({start:new Date(l),end:o,label:`${Kt(l)} - ${Kt(o)}`}),l=Ee(l,7)}return n}function Ua(t){const e=Va(),s=`160px repeat(${e.length}, minmax(56px, 1fr))`,n=e.map(o=>`
        <div class="gantt-week">
          <span>${o.label}</span>
        </div>
      `).join(""),l=t.length?t.map(o=>{const d=Yt(o.startDate),i=Yt(o.expectedDoneDate),c=Math.max(0,e.findIndex(p=>p.end>=d)),r=Math.max(c,e.reduce((p,h,v)=>h.start<=i?v:p,c)),u=[`仕込番号: ${o.jikomiNo}`,`銘柄: ${o.productName}`,`期間: ${o.startDate} - ${o.expectedDoneDate}`,`タンク: ${o.tankNo}`,`備考: ${o.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${s}">
              <div class="gantt-label">
                <strong>${o.jikomiNo}</strong>
                <span class="table-sub">${o.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${e.length}">
                <div
                  class="gantt-bar ${o.status}"
                  style="grid-column:${c+1} / ${r+2}"
                  title="${Ba(u)}"
                >
                  ${o.jikomiNo} / ${o.productName}
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
        <div class="gantt-grid" style="grid-template-columns:${s}">
          <div class="gantt-corner">仕込</div>
          ${n}
        </div>
        ${l}
      </div>
    </section>
  `}function zt(t,e){const s={planned:"neutral",active:"warning",done:"success"},n=t.map(i=>`
      <tr>
        <td class="mono">${i.jikomiNo}</td>
        <td>${i.productName}</td>
        <td>${i.riceType}</td>
        <td class="numeric">${i.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${i.actualKg>0?i.actualKg.toLocaleString("ja-JP")+" kg":"―"}</td>
        <td>${i.startDate}</td>
        <td>${i.expectedDoneDate}</td>
        <td class="mono">${i.tankNo}</td>
        <td>
          <span class="status-pill ${s[i.status]}">${ge[i.status]}</span>
        </td>
        <td>${i.note||"―"}</td>
      </tr>
    `).join(""),l=t.filter(i=>i.status==="active").length,o=t.filter(i=>i.status==="done").length,d=t.filter(i=>i.status==="planned").length;return`
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
        <p class="kpi-value">${l} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${d} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${o} 本</p>
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
          <button class="tab-button ${e==="list"?"active":""}" data-jikomi-tab="list">一覧</button>
          <button class="tab-button ${e==="calendar"?"active":""}" data-jikomi-tab="calendar">カレンダー</button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>仕込一覧</h2>
          <p class="panel-caption">${t.length} 件</p>
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
          <tbody>${n||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ha(t){const e={pending:"未実施",submitted:"申請中",approved:"承認済"},s={pending:"neutral",submitted:"warning",approved:"success"},n=t.map(c=>`
      <tr>
        <td class="mono">${c.kenteiNo}</td>
        <td class="mono">${c.jikomiNo}</td>
        <td>${c.productName}</td>
        <td>${c.kenteiDate}</td>
        <td class="numeric">${c.alcoholDegree>0?c.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${c.extractDegree>0?c.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${c.sakaMeterValue!==0?c.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${c.volume>0?c.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${c.taxCategory}</td>
        <td>
          <span class="status-pill ${s[c.status]}">${e[c.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${c.id}">
            ${c.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),l=t.filter(c=>c.status==="approved").length,o=t.filter(c=>c.status==="submitted").length,d=t.filter(c=>c.status==="pending").length;return`
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
        <p class="kpi-value">${t.filter(c=>c.status==="approved").reduce((c,r)=>c+r.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${o} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${d} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>検定一覧</h2>
          <p class="panel-caption">承認済 ${l} 件 / 合計 ${t.length} 件</p>
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
          <tbody>${n||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ya(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ka(t,e){return`
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
        ${t?`<p class="field-error">${Ya(t)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${e?"disabled":""}>
            ${e?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function za(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${e.closingDay}日</td>
          <td class="numeric">${e.paymentDay}日</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function Qa(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td class="mono">${e.janCode}</td>
          <td>${e.name}</td>
          <td>${e.category}</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function Wa(t,e){return`
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
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="csv-export">CSV出力</button>
          <div class="tab-group">
            <button class="tab-button ${e==="customers"?"active":""}" data-tab="customers">得意先一覧</button>
            <button class="tab-button ${e==="products"?"active":""}" data-tab="products">商品一覧</button>
          </div>
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
            <tbody>${za(t.customers)}</tbody>
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
            <tbody>${Qa(t.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function dt(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Ga(t){const e=t.map(l=>{const d=(l.minimumStock>0?l.currentStock/l.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${l.code}</td>
          <td>${l.name}</td>
          <td class="numeric ${d?"text-danger":""}">
            ${l.currentStock.toLocaleString("ja-JP")} ${l.unit}
            ${d?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${l.minimumStock.toLocaleString("ja-JP")} ${l.unit}</td>
          <td class="numeric">${dt(l.unitCost)}</td>
          <td class="numeric">${dt(l.currentStock*l.unitCost)}</td>
          <td>${l.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${l.id}">調整</button>
          </td>
        </tr>
      `}).join(""),s=t.filter(l=>l.minimumStock>0&&l.currentStock/l.minimumStock<1.5).length,n=t.reduce((l,o)=>l+o.currentStock*o.unitCost,0);return`
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
        <p class="kpi-value">${dt(n)}</p>
        <p class="kpi-sub">${t.length} 品目</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">要補充</p>
        <p class="kpi-value ${s>0?"text-danger":""}">${s} 品目</p>
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
          <tbody>${e||'<tr><td colspan="8" class="empty-row">資材データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Xa(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t)):"-"}function ut(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const Za={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function ts(t){return`
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
          <tbody>${t.map(s=>`
        <tr>
          <td>
            <div class="table-title">${s.customerName}</div>
            <div class="table-sub mono">${s.customerCode}</div>
          </td>
          <td class="numeric">${ut(s.billedAmount)}</td>
          <td class="numeric">${ut(s.paymentAmount)}</td>
          <td class="numeric">${ut(s.balanceAmount)}</td>
          <td>${Xa(s.lastPaymentDate)}</td>
          <td><span class="status-pill ${s.status==="paid"?"success":s.status==="partial"?"warning":"danger"}">${Za[s.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function O(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Qt(t){return t.trim().toLowerCase()}function es(t,e){const s=Qt(e),n=t.filter(o=>s?[o.code,o.name,o.janCode].map(Qt).some(d=>d.includes(s)):!0),l=n.length?`
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
              ${n.map(o=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${O(o.code)}"
                      data-name="${O(o.name)}"
                    >
                      <td class="mono">${O(o.code)}</td>
                      <td>${O(o.name)}</td>
                      <td class="mono">${O(o.janCode)}</td>
                      <td>${O(o.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Pe({title:"商品検索",searchQuery:e,placeholder:"コード・名前・JANで検索",resultsHtml:l,emptyMessage:"該当する商品が見つかりません。"})}function j(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function as(t,e){const s={pending:"未確定",confirmed:"確定",paid:"支払済"},n={pending:"warning",confirmed:"neutral",paid:"success"},l={unpaid:"未払い",partial:"一部支払",paid:"支払済"},o={unpaid:"warning",partial:"neutral",paid:"success"},d=t.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${j(p.unitPrice)}</td>
        <td class="numeric"><strong>${j(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${n[p.status]}">${s[p.status]}</span>
        </td>
      </tr>
    `).join(""),i=e.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${j(p.totalPurchase)}</td>
        <td class="numeric">${j(p.paidAmount)}</td>
        <td class="numeric"><strong>${j(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${o[p.status]}">${l[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),c=t.reduce((p,h)=>p+h.amount,0),r=e.reduce((p,h)=>p+h.balance,0),u=e.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${j(c)}</p>
        <p class="kpi-sub">${t.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${j(r)}</p>
        <p class="kpi-sub">未払い ${u} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>仕入伝票一覧</h2>
          <p class="panel-caption">${t.length} 件</p>
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
          <tbody>${d||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>買掛残高一覧</h2>
        <p class="panel-caption">${e.length} 社</p>
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
          <tbody>${i||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function V(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ss(t,e){const s={holding:"保有中",due:"期日到来",cleared:"決済済"},n={holding:"neutral",due:"warning",cleared:"success"},l=t.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${V(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${n[u.status]}">${s[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${u.id}" ${u.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),o=e.map(u=>{const p=u.minimumStock>0&&u.currentStock<u.minimumStock*1.2;return`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${u.currentStock.toLocaleString("ja-JP")} ${u.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${u.minimumStock.toLocaleString("ja-JP")} ${u.unit}</td>
          <td class="numeric">${V(u.unitCost)}</td>
          <td class="numeric">${V(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),d=t.filter(u=>u.status==="holding"),i=d.reduce((u,p)=>u+p.amount,0),c=e.reduce((u,p)=>u+p.currentStock*p.unitCost,0),r=e.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${V(i)}</p>
        <p class="kpi-sub">${d.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${V(c)}</p>
        <p class="kpi-sub">要補充 ${r} 品目</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>手形一覧</h2>
        <p class="panel-caption">${t.length} 枚</p>
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
          <tbody>${l||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>原料在庫</h2>
        <p class="panel-caption">${e.length} 品目</p>
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
          <tbody>${o||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ns(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function $(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function gt(t){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(t)}"
      >
        コピー
      </button>
      <pre class="code-block">${$(t)}</pre>
    </div>
  `}function ls(t){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(t)}"
    >
      コピー
    </button>
  `}function tt(t){return`
    <div class="setup-command-row">
      <code class="inline-code">${$(t)}</code>
      ${ls(t)}
    </div>
  `}function F(t){return`
    <div class="setup-step" data-step="${t.step}">
      <h3>${$(t.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${$(t.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${t.instructions.map(e=>`<li>${$(e)}</li>`).join("")}
        </ol>
      </div>
      ${t.code?gt(t.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${t.success.map(e=>`<li>${$(e)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${t.errors.map(e=>`<li>${$(e)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function et(t){return`
    <div class="setup-step setup-step-compact" data-step="${$(t.stepLabel)}">
      <h3>${$(t.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${$(t.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${t.body}
      </div>
    </div>
  `}function os(t,e,s){const n={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${ns(t.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${t.status}">${n[t.status]}</span>
        </p>
        <p class="kpi-sub">${$(t.message)}</p>
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
      ${et({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${tt("git --version")}
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
      ${et({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${tt("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${et({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${tt("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${tt("python get-pip.py")}
        `})}
      ${et({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${F({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${F({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${F({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${F({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${F({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${F({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${gt(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${gt(`{
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
            <span class="config-value">${$(e)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${$(e)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${$("（未設定：Supabaseダッシュボードから取得してください）")}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${$(s)}"
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
  `}function is(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function cs(t){return t.replace("-","/")}function rs(t){if(t.length===0)return'<div class="chart-empty">データなし</div>';const e=760,s=280,n={top:16,right:24,bottom:36,left:64},l=e-n.left-n.right,o=s-n.top-n.bottom,d=Math.max(...t.map(u=>u.amount),1),i=l/t.length,c=[0,.25,.5,.75,1].map(u=>{const p=n.top+o-o*u,h=`${Math.round(d*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${n.left}" y1="${p}" x2="${e-n.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${h}</text>
        </g>
      `}).join(""),r=t.map((u,p)=>{const h=u.amount/d*o,v=Math.max(i-18,24),y=n.left+p*i+(i-v)/2,D=n.top+o-h;return`
        <g>
          <rect x="${y}" y="${D}" width="${v}" height="${h}" rx="6" class="analytics-bar" />
          <text x="${y+v/2}" y="${s-10}" class="chart-axis centered-axis">${cs(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${e} ${s}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${c}
      ${r}
    </svg>
  `}function ds(t){return t.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${is(e.amount)}</td>
          <td class="numeric">${e.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${e.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function us(t,e){const s=e==="products"?"商品別集計":"得意先別集計",n=e==="products"?t.productTotals:t.customerTotals;return`
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
        ${rs(t.monthlySales)}
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${s}</h2>
            <p class="panel-caption">売上金額順に表示</p>
          </div>
          <div class="tab-group">
            <button class="tab-button ${e==="products"?"active":""}" data-analytics-tab="products">商品別</button>
            <button class="tab-button ${e==="customers"?"active":""}" data-analytics-tab="customers">得意先別</button>
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
            <tbody>${ds(n)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function U(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ps(t){const e=Math.max(...t.salesByProduct.flatMap(o=>o.values),1),s=t.salesByProduct.map(o=>{const d=o.values.map((i,c)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(i/e*120)}px" title="${t.months[c]}: ${U(i)}"></div>
            <span class="bar-label">${t.months[c].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${o.label}</p>
          <div class="bar-chart">${d}</div>
        </div>
      `}).join(""),n=t.costSimulation.map(o=>`
      <tr>
        <td class="mono">${o.productCode}</td>
        <td>${o.productName}</td>
        <td class="numeric">${U(o.costPrice)}</td>
        <td class="numeric">${U(o.sellPrice)}</td>
        <td class="numeric">${U(o.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${o.marginRate>=40?"success":"warning"}">${o.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),l=t.salesByCustomer.map(o=>{const d=o.values.reduce((i,c)=>i+c,0);return`
        <tr>
          <td>${o.label}</td>
          ${o.values.map(i=>`<td class="numeric">${(i/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${U(d)}</strong></td>
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
      <div class="chart-wrap">${s}</div>
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
              ${t.months.map(o=>`<th class="numeric">${o}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${l}</tbody>
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
          <tbody>${n}</tbody>
        </table>
      </div>
    </section>
  `}function ms(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function hs(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Wt(t){return t.toISOString().slice(0,10)}function vs(t,e,s){const n=t.length?t.map(l=>`
            <tr>
              <td class="mono">${l.documentNo}</td>
              <td>${ms(l.date)}</td>
              <td>
                <div class="table-title">${l.customerName}</div>
                <div class="table-sub mono">${l.customerCode}</div>
              </td>
              <td class="numeric">${hs(l.amount)}</td>
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
          <input id="sales-start" type="date" value="${e||Wt(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${s||Wt(new Date)}" />
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
          <tbody>${n}</tbody>
        </table>
      </div>
    </section>
  `}function at(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ys(t,e,s,n){const l={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},o={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},d={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},i=t.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${at(p.unitPrice)}</td>
        <td class="numeric"><strong>${at(p.amount)}</strong></td>
        <td>${l[p.paymentMethod]}</td>
      </tr>
    `).join(""),c=e.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(h=>`${h.productName} ×${h.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${at(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${d[p.status]}">${o[p.status]}</span>
        </td>
        <td>${p.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${p.id}">詳細</button>
        </td>
      </tr>
    `).join(""),r=t.reduce((p,h)=>p+h.amount,0),u=e.filter(p=>p.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${at(r)}</p>
        <p class="kpi-sub">${t.length} 件 / ${n}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${u} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">${e.length} 件</p>
        <p class="kpi-sub">宅配・通販</p>
      </article>
    </section>

    <section class="panel">
      <div class="tab-bar">
        <button class="tab-btn ${s==="pos"?"active":""}" data-store-tab="pos">直売所レジ</button>
        <button class="tab-btn ${s==="orders"?"active":""}" data-store-tab="orders">受注・宅配</button>
      </div>

      ${s==="pos"?`
        <div class="panel-header">
          <div>
            <h2>直売所販売履歴</h2>
          </div>
          <label class="field" style="display:flex;align-items:center;gap:8px">
            <span style="white-space:nowrap">販売日</span>
            <input id="store-date" type="date" value="${n}" style="width:160px" />
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
            <tbody>${i||'<tr><td colspan="7" class="empty-row">販売データがありません。</td></tr>'}</tbody>
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
            <tbody>${c||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}const pt={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},bs={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function gs(t,e,s,n){const l=bs[t],o=Object.keys(pt).map(i=>`
      <button class="tab-button ${t===i?"active":""}" data-import-entity="${i}">
        ${pt[i]}
      </button>
    `).join(""),d=e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>プレビュー（先頭10件 / 全${e.totalRows}件）</h2>
          <p class="panel-caption">
            OK: ${e.validRows}件 / NG: ${e.invalidRows}件
          </p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              ${e.columns.map(i=>`<th>${i}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${e.rows.slice(0,10).map((i,c)=>`
              <tr class="${i._valid?"":"has-error"}">
                <td>${c+1}</td>
                ${e.columns.map(r=>`<td>${String(i[r]??"")}</td>`).join("")}
                <td>${i._valid?'<span class="status-pill success">OK</span>':`<span class="status-pill warning">${i._error??"NG"}</span>`}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="action-bar">
        <button class="button secondary" data-action="import-cancel">キャンセル</button>
        <button class="button primary" data-action="import-execute"
          ${s||e.validRows===0?"disabled":""}>
          ${s?"取り込み中…":`${e.validRows}件をSupabaseに登録`}
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
      <div class="tab-group" style="flex-wrap: wrap;">${o}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${pt[t]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${l.required.map(i=>`<code class="config-value">${i}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${l.optional.map(i=>`<code class="config-value">${i}</code>`).join(" / ")}</dd>
        </div>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="download-template" data-entity="${t}">
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

    ${d}

    ${n?`<section class="panel"><p class="sync-message">${n}</p></section>`:""}
  `}const Gt={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},fs={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1},$s={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function b(t){return"¥"+t.toLocaleString("ja-JP")}function Y(t){const e=new Date(t);return`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`}function Lt(t,e){const s=t.reduce((o,d)=>o+d.amount,0),n=Math.floor(s*e),l=s+n;return{subtotal:s,taxAmount:n,total:l}}const ks=["物品受領書","仕入伝票","納品書","請求書"];function Ss(t){const e=new Date(t),s=e.getFullYear(),n=e.getMonth()+1,l=e.getDate(),o=s-2018;return{year:String(s).slice(-2),month:String(n).padStart(2,"0"),day:String(l).padStart(2,"0"),wareki:`令和${o}年`}}function mt(t,e){if(e<=0)return{cases:0,pieces:Math.round(t)};const s=Math.floor(t/e),n=Math.round(t-s*e);return{cases:s,pieces:n}}function ws(t,e,s,n){const{subtotal:l,taxAmount:o,total:d}=Lt(t.lines,t.taxRate),i=Ss(t.documentDate),r=Array.from({length:10},(h,v)=>{const y=t.lines[v];if(!y)return`
      <tr class="csu-empty-row">
        <td></td><td></td><td></td><td></td>
        ${s.showJanCode?"<td></td>":""}
        <td></td><td></td><td></td><td></td><td></td>
      </tr>`;const D=y.caseQty??1,{cases:Rt,pieces:Mt}=mt(y.quantity,D);return`
      <tr>
        <td class="csu-no">${v+1}</td>
        <td class="csu-pcode mono">${y.productCode}</td>
        ${s.showJanCode?`<td class="csu-jan mono">${y.janCode??""}</td>`:""}
        <td class="csu-name">${y.productName}</td>
        <td class="csu-spec">${y.spec??""}</td>
        <td class="csu-irisu numeric">${D>1?D:""}</td>
        <td class="csu-case numeric">${Rt>0?Rt:""}</td>
        <td class="csu-piece numeric">${Mt>0?Mt:""}</td>
        <td class="csu-price numeric">${y.unitPrice>0?y.unitPrice.toLocaleString("ja-JP"):""}</td>
        <td class="csu-amount numeric">${y.amount>0?y.amount.toLocaleString("ja-JP"):""}</td>
      </tr>`}).join(""),u=t.lines.reduce((h,v)=>{const y=v.caseQty??1;return h+mt(v.quantity,y).cases},0),p=t.lines.reduce((h,v)=>{const y=v.caseQty??1;return h+mt(v.quantity,y).pieces},0);return`
    <div class="csu-slip" data-copy="${n}">
      <!-- 上部: 用途ラベル + 伝票番号 -->
      <div class="csu-topbar">
        <div class="csu-copy-label">${n}</div>
        <div class="csu-title">チェーンストア統一伝票 <span class="csu-type-no">(1101)</span></div>
        <div class="csu-docno">
          <span class="csu-label">伝票No.</span>
          <span class="mono">${t.documentNo}</span>
        </div>
      </div>

      <!-- ヘッダ: 各種コード -->
      <div class="csu-header-grid">
        <div class="csu-hcell">
          <span class="csu-label">納品日</span>
          <span class="csu-value">${i.wareki}${i.month}月${i.day}日</span>
        </div>
        <div class="csu-hcell">
          <span class="csu-label">伝票区分</span>
          <span class="csu-value">11 納品</span>
        </div>
        <div class="csu-hcell">
          <span class="csu-label">発注番号</span>
          <span class="csu-value mono">${t.orderNo??""}</span>
        </div>
        <div class="csu-hcell csu-wide">
          <span class="csu-label">取引先コード</span>
          <span class="csu-value mono">${t.vendorCode??e.registrationNo.slice(-7)}</span>
        </div>
        <div class="csu-hcell csu-wide">
          <span class="csu-label">納品先コード</span>
          <span class="csu-value mono">${t.customerCode??""}</span>
        </div>
        <div class="csu-hcell">
          <span class="csu-label">部門コード</span>
          <span class="csu-value mono">${t.departmentCode??""}</span>
        </div>
      </div>

      <!-- 取引先名・納品先名 -->
      <div class="csu-parties">
        <div class="csu-party">
          <span class="csu-label">取引先名</span>
          <span class="csu-party-name">${e.name}</span>
        </div>
        <div class="csu-party">
          <span class="csu-label">納品先名</span>
          <span class="csu-party-name">${t.customerName}</span>
        </div>
      </div>

      <!-- 明細 -->
      <table class="csu-table">
        <colgroup>
          <col class="csu-no-col" />
          <col class="csu-pcode-col" />
          ${s.showJanCode?'<col class="csu-jan-col" />':""}
          <col class="csu-name-col" />
          <col class="csu-spec-col" />
          <col class="csu-irisu-col" />
          <col class="csu-case-col" />
          <col class="csu-piece-col" />
          <col class="csu-price-col" />
          <col class="csu-amount-col" />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>商品コード</th>
            ${s.showJanCode?"<th>JAN</th>":""}
            <th>品名</th>
            <th>規格</th>
            <th>入数</th>
            <th>ケース</th>
            <th>バラ</th>
            <th>単価</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>${r}</tbody>
      </table>

      <!-- 合計 -->
      <div class="csu-totals-grid">
        <div class="csu-tcell">
          <span class="csu-label">合計ケース</span>
          <span class="csu-value numeric">${u}</span>
        </div>
        <div class="csu-tcell">
          <span class="csu-label">合計バラ</span>
          <span class="csu-value numeric">${p}</span>
        </div>
        <div class="csu-tcell">
          <span class="csu-label">小計</span>
          <span class="csu-value numeric">${b(l)}</span>
        </div>
        <div class="csu-tcell">
          <span class="csu-label">消費税(${Math.round(t.taxRate*100)}%)</span>
          <span class="csu-value numeric">${b(o)}</span>
        </div>
        <div class="csu-tcell csu-grand">
          <span class="csu-label">合計金額</span>
          <span class="csu-value numeric">${b(d)}</span>
        </div>
      </div>

      <!-- 印欄 -->
      <div class="csu-seals">
        <div class="csu-seal-box"><span class="csu-label">物品受領印</span></div>
        <div class="csu-seal-box"><span class="csu-label">検収印</span></div>
        <div class="csu-seal-box"><span class="csu-label">出荷印</span></div>
        <div class="csu-seal-box csu-vendor-seal">
          <span class="csu-label">取引先印</span>
          ${s.showSeal?e.sealImageUrl?`<img src="${e.sealImageUrl}" alt="印" />`:'<div class="csu-seal-ph">印</div>':""}
        </div>
      </div>
    </div>
  `}function xs(t,e,s){const n=s.copies&&s.copies>=1?Math.min(s.copies,4):4,l=ks.slice(0,n);return`
    <div class="print-page chain-store ${s.fontSize}">
      ${l.map(o=>ws(t,e,s,o)).join('<div class="csu-separator"></div>')}
    </div>
  `}function Cs(t,e,s){const{subtotal:n,taxAmount:l,total:o}=Lt(t.lines,t.taxRate),d=t.previousBalance??0,i=t.paymentAmount??0,c=d-i+o,r=t.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${s.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${b(p.unitPrice)}</td>
        <td class="numeric">${b(p.amount)}</td>
      </tr>
    `).join(""),u=Array.from({length:Math.max(0,6-t.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td><td></td>${s.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page invoice-freee ${s.fontSize}">
      <!-- ヘッダー -->
      <div class="freee-header">
        <div>
          <h1 class="freee-title">御 請 求 書</h1>
          <p class="freee-doc-no">No. ${t.documentNo}</p>
        </div>
        <div class="freee-from">
          <p class="freee-company-name">${e.name}</p>
          <p>〒${e.postalCode}</p>
          <p>${e.address1}${e.address2?` ${e.address2}`:""}</p>
          <p>TEL: ${e.tel}　FAX: ${e.fax}</p>
          ${s.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${e.registrationNo}</span></p>`:""}
          ${s.showSeal?`<div class="freee-seal-wrap">${e.sealImageUrl?`<img src="${e.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
        </div>
      </div>

      <!-- 宛先 -->
      <div class="freee-to">
        ${t.customerPostalCode?`<p class="freee-to-postal">〒${t.customerPostalCode}</p>`:""}
        ${t.customerAddress?`<p class="freee-to-addr">${t.customerAddress}</p>`:""}
        <div class="freee-to-name">${t.customerName} ${t.customerHonorific}</div>
      </div>

      <!-- 日付 -->
      <dl class="freee-meta">
        <div><dt>請求日</dt><dd>${Y(t.documentDate)}</dd></div>
        ${t.dueDate?`<div><dt>お支払期限</dt><dd>${Y(t.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${t.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${b(c)}</span>
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
            ${s.showUnit?"<th>単位</th>":""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${r}${u}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${s.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(t.taxRate*100)}%対象: ${b(n)} / 消費税: ${b(l)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${d?`<tr><th>前回御請求額</th><td>${b(d)}</td></tr>`:""}
          ${i?`<tr><th>ご入金額</th><td>▲ ${b(i)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${b(n)}</td></tr>
          <tr><th>消費税 (${Math.round(t.taxRate*100)}%)</th><td>${b(l)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${b(c)}</td></tr>
        </table>
      </div>

      <!-- 振込先 -->
      ${s.showBankInfo?`
        <div class="freee-bank">
          <h3>お振込先</h3>
          <p><strong>${e.bankName}</strong> ${e.bankBranch}　${e.bankAccountType} ${e.bankAccountNo}</p>
          <p>口座名義: ${e.bankAccountHolder}</p>
          <p class="freee-bank-note">※ お振込手数料はお客様にてご負担くださいますようお願い申し上げます。</p>
        </div>`:""}

      <!-- 備考 -->
      ${s.showRemarks&&t.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${t.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}
    </div>
  `}function Ds(t,e,s){const{subtotal:n,taxAmount:l,total:o}=Lt(t.lines,t.taxRate),d=t.lines.map(c=>`
      <tr>
        <td>${c.productName}${c.spec?` <span style="color:#636e72;font-size:9pt;">/ ${c.spec}</span>`:""}</td>
        <td class="numeric">${c.quantity.toLocaleString("ja-JP")}</td>
        ${s.showUnit?`<td>${c.unit}</td>`:""}
        <td class="numeric">${b(c.unitPrice)}</td>
        <td class="numeric">${b(c.amount)}</td>
      </tr>
    `).join(""),i=Array.from({length:Math.max(0,5-t.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td>${s.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page quotation-freee ${s.fontSize}">
      <!-- ヘッダー: タイトル + 会社情報 -->
      <div class="freee-header">
        <div>
          <h1 class="freee-title">御 見 積 書</h1>
          <p class="freee-doc-no">No. ${t.documentNo}</p>
        </div>
        <div class="freee-from">
          <p class="freee-company-name">${e.name}</p>
          <p>〒${e.postalCode}</p>
          <p>${e.address1}${e.address2?` ${e.address2}`:""}</p>
          <p>TEL: ${e.tel}　FAX: ${e.fax}</p>
          ${s.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${e.registrationNo}</span></p>`:""}
          ${s.showSeal?`<div class="freee-seal-wrap">${e.sealImageUrl?`<img src="${e.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
        </div>
      </div>

      <!-- 宛先 -->
      <div class="freee-to">
        ${t.customerPostalCode?`<p class="freee-to-postal">〒${t.customerPostalCode}</p>`:""}
        ${t.customerAddress?`<p class="freee-to-addr">${t.customerAddress}</p>`:""}
        <div class="freee-to-name">${t.customerName} ${t.customerHonorific}</div>
      </div>

      <!-- 件名・日付 -->
      ${t.title?`<p class="freee-subject"><strong>件名:</strong>${t.title}</p>`:""}
      <dl class="freee-meta">
        <div><dt>見積日</dt><dd>${Y(t.documentDate)}</dd></div>
        ${t.expireDate?`<div><dt>有効期限</dt><dd>${Y(t.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${t.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${b(o)}</span>
          <span class="freee-total-tax">（税込）</span>
        </div>
      </div>

      <!-- 明細 -->
      <table class="freee-table">
        <thead>
          <tr>
            <th>品目 / 内容</th>
            <th class="numeric">数量</th>
            ${s.showUnit?"<th>単位</th>":""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${d}${i}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${s.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(t.taxRate*100)}%対象: ${b(n)} / 消費税: ${b(l)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${b(n)}</td></tr>
          <tr><th>消費税 (${Math.round(t.taxRate*100)}%)</th><td>${b(l)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${b(o)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${s.showRemarks&&t.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${t.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${t.expireDate?Y(t.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function _s(t,e,s,n){const l=Object.keys(Gt).map(i=>`
      <button class="tab-button ${t===i?"active":""}" data-print-template="${i}">
        ${Gt[i]}
      </button>
    `).join("");let o="";switch(t){case"chain_store":o=xs(n,s,e);break;case"quotation":o=Ds(n,s,e);break;case"invoice_monthly":o=Cs(n,s,e);break}const d=n.lines.map((i,c)=>`
      <tr>
        <td><input class="input-cell mono" type="text" data-print-line="${c}" data-print-lfield="productCode" value="${i.productCode}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${c}" data-print-lfield="productName" value="${i.productName}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${c}" data-print-lfield="spec" value="${i.spec??""}" placeholder="720ml" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${c}" data-print-lfield="quantity" value="${i.quantity}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${c}" data-print-lfield="unit" value="${i.unit}" placeholder="本" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${c}" data-print-lfield="unitPrice" value="${i.unitPrice}" /></td>
        <td class="numeric">${i.amount>0?i.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${c}" title="削除">✕</button></td>
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
      <div class="tab-group">${l}</div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>書類情報</h2>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>書類番号</span>
          <input type="text" data-print-field="documentNo" value="${n.documentNo}" />
        </label>
        <label class="field">
          <span>${t==="quotation"?"見積日":t==="invoice_monthly"?"請求日":"納品日"}</span>
          <input type="date" data-print-field="documentDate" value="${n.documentDate}" />
        </label>
        ${t==="quotation"?`<label class="field"><span>有効期限</span><input type="date" data-print-field="expireDate" value="${n.expireDate??""}" /></label>`:""}
        ${t==="invoice_monthly"?`<label class="field"><span>お支払期限</span><input type="date" data-print-field="dueDate" value="${n.dueDate??""}" /></label>`:""}
        <label class="field">
          <span>得意先コード</span>
          <input type="text" data-print-field="customerCode" value="${n.customerCode??""}" />
        </label>
        <label class="field">
          <span>得意先名</span>
          <input type="text" data-print-field="customerName" value="${n.customerName}" />
        </label>
        <label class="field">
          <span>敬称</span>
          <select data-print-field="customerHonorific">
            <option value="御中" ${n.customerHonorific==="御中"?"selected":""}>御中</option>
            <option value="様" ${n.customerHonorific==="様"?"selected":""}>様</option>
            <option value="殿" ${n.customerHonorific==="殿"?"selected":""}>殿</option>
          </select>
        </label>
        <label class="field">
          <span>郵便番号</span>
          <input type="text" data-print-field="customerPostalCode" value="${n.customerPostalCode??""}" placeholder="100-0001" />
        </label>
        <label class="field">
          <span>住所</span>
          <input type="text" data-print-field="customerAddress" value="${n.customerAddress??""}" />
        </label>
        ${t==="quotation"?`<label class="field"><span>件名</span><input type="text" data-print-field="title" value="${n.title??""}" placeholder="純米吟醸 出荷見積" /></label>`:""}
        <label class="field">
          <span>消費税率</span>
          <select data-print-field="taxRate">
            <option value="0.10" ${n.taxRate===.1?"selected":""}>10%</option>
            <option value="0.08" ${n.taxRate===.08?"selected":""}>8% 軽減税率</option>
          </select>
        </label>
        ${t==="invoice_monthly"?`
              <label class="field"><span>前回請求額</span><input type="number" data-print-field="previousBalance" value="${n.previousBalance??0}" /></label>
              <label class="field"><span>ご入金額</span><input type="number" data-print-field="paymentAmount" value="${n.paymentAmount??0}" /></label>
            `:""}
      </div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${n.lines.length} 行</p>
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
          <tbody>${d||'<tr><td colspan="8" class="empty-row">「＋行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <label class="field" style="margin-top:16px;">
        <span>備考</span>
        <textarea data-print-field="remarks" rows="2">${n.remarks??""}</textarea>
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
            <option value="A4" ${e.pageSize==="A4"?"selected":""}>A4</option>
            <option value="A5" ${e.pageSize==="A5"?"selected":""}>A5</option>
            <option value="B5" ${e.pageSize==="B5"?"selected":""}>B5</option>
          </select>
        </label>
        <label class="field">
          <span>向き</span>
          <select data-print-opt="orientation">
            <option value="portrait" ${e.orientation==="portrait"?"selected":""}>縦</option>
            <option value="landscape" ${e.orientation==="landscape"?"selected":""}>横</option>
          </select>
        </label>
        <label class="field">
          <span>文字サイズ</span>
          <select data-print-opt="fontSize">
            <option value="small" ${e.fontSize==="small"?"selected":""}>小</option>
            <option value="medium" ${e.fontSize==="medium"?"selected":""}>中</option>
            <option value="large" ${e.fontSize==="large"?"selected":""}>大</option>
          </select>
        </label>
        <label class="field">
          <span>カラーモード</span>
          <select data-print-opt="colorMode">
            <option value="color" ${e.colorMode==="color"?"selected":""}>カラー</option>
            <option value="mono" ${e.colorMode==="mono"?"selected":""}>モノクロ</option>
          </select>
        </label>
      </div>
      <div style="margin-top:16px; display:flex; flex-wrap:wrap; gap:16px;">
        <label><input type="checkbox" data-print-opt="showSeal" ${e.showSeal?"checked":""} /> 印影を表示</label>
        <label><input type="checkbox" data-print-opt="showRegistrationNo" ${e.showRegistrationNo?"checked":""} /> インボイス登録番号</label>
        <label><input type="checkbox" data-print-opt="showBankInfo" ${e.showBankInfo?"checked":""} /> 振込先</label>
        <label><input type="checkbox" data-print-opt="showJanCode" ${e.showJanCode?"checked":""} /> JANコード</label>
        <label><input type="checkbox" data-print-opt="showUnit" ${e.showUnit?"checked":""} /> 単位列</label>
        <label><input type="checkbox" data-print-opt="showRemarks" ${e.showRemarks?"checked":""} /> 備考</label>
      </div>
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
      <div class="print-preview ${e.colorMode}">
        ${o}
      </div>
    </section>
  `}const Ns={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},As={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Ls(t){t.charCodeAt(0)===65279&&(t=t.slice(1));const e=[];let s=[],n="",l=!1;for(let i=0;i<t.length;i++){const c=t[i];l?c==='"'?t[i+1]==='"'?(n+='"',i++):l=!1:n+=c:c==='"'?l=!0:c===","?(s.push(n),n=""):c===`
`||c==="\r"?(c==="\r"&&t[i+1]===`
`&&i++,s.push(n),s.some(r=>r!=="")&&e.push(s),s=[],n=""):n+=c}if((n!==""||s.length>0)&&(s.push(n),s.some(i=>i!=="")&&e.push(s)),e.length===0)return{columns:[],rows:[]};const o=e[0].map(i=>i.trim()),d=[];for(let i=1;i<e.length;i++){const c={};o.forEach((r,u)=>{c[r]=(e[i][u]??"").trim()}),d.push(c)}return{columns:o,rows:d}}function js(t,e,s){const n=Ns[t],l=n.filter(i=>!e.includes(i)),o=s.map(i=>{const c=[];l.length>0&&c.push(`必須列欠損: ${l.join(",")}`);for(const r of n)e.includes(r)&&!i[r]&&c.push(`${r}が空`);return{...i,_valid:c.length===0,_error:c[0]}}),d=o.filter(i=>i._valid).length;return{entity:t,columns:e,rows:o,totalRows:s.length,validRows:d,invalidRows:o.length-d}}function Ps(t){const s=As[t],l={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[t];return"\uFEFF"+s.join(",")+`
`+l.join(",")+`
`}async function Es(t,e){const{supabaseInsert:s}=await N(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>ne);return{supabaseInsert:i}},void 0);let n=0,l=0;const d={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[t];for(const i of e){if(!i._valid)continue;const{_valid:c,_error:r,...u}=i,p={...u};if(!p.id){const h=t==="customers"?"legacy_customer_code":t==="products"?"legacy_product_code":t==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[h]??`${t}-${Date.now()}-${n+l}`)}for(const h of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[h]=="string"&&p[h]!==""){const v=Number(p[h]);Number.isFinite(v)&&(p[h]=v)}try{await s(d,p)!==null?n++:l++}catch{l++}}return{inserted:n,failed:l}}function Ts(t){const e={empty:"空",in_use:"使用中",aging:"熟成中"},s={empty:"neutral",in_use:"warning",aging:"success"},n=t.map(r=>{const u=r.capacity>0?Math.round(r.currentVolume/r.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${r.tankNo}</strong></td>
          <td class="numeric">${r.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${r.currentVolume>0?r.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${u}%"></div>
            </div>
            <span class="progress-label">${u}%</span>
          </td>
          <td>${r.productName||"―"}</td>
          <td class="mono">${r.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${s[r.status]}">${e[r.status]}</span>
          </td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${r.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),l=t.filter(r=>r.status==="in_use").length,o=t.filter(r=>r.status==="aging").length,d=t.filter(r=>r.status==="empty").length,i=t.reduce((r,u)=>r+u.capacity,0),c=t.reduce((r,u)=>r+u.currentVolume,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${i.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${i>0?Math.round(c/i*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${l} 基</p>
        <p class="kpi-sub">熟成中 ${o} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${d} 基</p>
        <p class="kpi-sub">使用可能</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>タンク一覧</h2>
          <p class="panel-caption">${t.length} 基</p>
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
          <tbody>${n||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ht(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Rs(t,e,s){const n=t.rows.map((r,u)=>`
      <tr>
        <td class="mono">${r.taxCategory}</td>
        <td>${r.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${u}" data-tax-field="alcoholDegree" value="${r.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="productionVolume" value="${r.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="previousBalance" value="${r.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="exportDeduction" value="${r.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="sampleDeduction" value="${r.sampleDeduction}" />
        </td>
        <td class="numeric">${r.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${r.taxRate}</td>
        <td class="numeric"><strong>${ht(r.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),l=t.deductions.map((r,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(bt).map(p=>`<option value="${p}" ${p===r.type?"selected":""}>${bt[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${_e.map(p=>`<option value="${p.code}" ${p.code===r.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${u}" data-ded-field="volume" value="${r.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="reason" value="${r.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="documentNo" value="${r.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),o=Array.from({length:12},(r,u)=>u+1),d=t.rows.reduce((r,u)=>r+u.exportDeduction+u.sampleDeduction,0),i=t.rows.reduce((r,u)=>r+u.productionVolume,0),c=i>0?d/i*100:0;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">税務管理</p>
        <h1>酒税申告書 (eTax連携対応)</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status==="submitted"||t.status==="accepted"?"success":"warning"}">
          ${t.status==="submitted"?"申告済":t.status==="accepted"?"受理済":"下書き"}
        </span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年</span>
          <select id="tax-year">
            ${[2025,2026,2027].map(r=>`<option value="${r}" ${e===r?"selected":""}>${r}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${o.map(r=>`<option value="${r}" ${s===r?"selected":""}>${r}月</option>`).join("")}
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
        <p class="kpi-value">${ht(t.totalTax)}</p>
        <p class="kpi-sub">${t.targetYear}年${t.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${t.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${t.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${d.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${t.deductions.length} 件</p>
      </article>
      <article class="panel kpi-card ${c>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${c.toFixed(1)}%</p>
        <p class="kpi-sub">${c>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
          <input type="text" data-tax-field="companyName" value="${t.companyName}" />
        </label>
        <label class="field">
          <span>製造者番号</span>
          <input type="text" data-tax-field="companyNo" value="${t.companyNo}" />
        </label>
        <label class="field">
          <span>代表者</span>
          <input type="text" data-tax-field="companyRepresentative" value="${t.companyRepresentative}" />
        </label>
        <label class="field">
          <span>所在地</span>
          <input type="text" data-tax-field="companyAddress" value="${t.companyAddress}" />
        </label>
        <label class="field">
          <span>所轄税務署</span>
          <input type="text" data-tax-field="taxOffice" value="${t.taxOffice}" />
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
          <tbody>${n||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${t.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${ht(t.totalTax)}</th>
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
          <tbody>${l||'<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>'}</tbody>
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
        <button class="button primary" data-action="tax-submit" ${t.status==="submitted"?"disabled":""}>
          ${t.status==="submitted"?"申告済":"申告する"}
        </button>
      </div>
      <p class="form-hint" style="margin-top: 12px;">
        XMLはeTax受付システム形式（e-Taxソフトへ取り込み可能）、CSVは会計ソフト・税理士向け。印刷ボタンで紙提出用のPDF化もできます。
      </p>
    </section>
  `}function Xt(t){const s=(t==null?"":t instanceof Date?t.toISOString():String(t)).replaceAll('"','""');return/[",\n\r]/.test(s)?`"${s}"`:s}function Ms(t,e,s){if(e.length===0&&(!s||s.length===0))return;const n=s&&s.length>0?s:Object.keys(e[0]??{}).map(r=>({key:r,label:r})),o=`\uFEFF${[n.map(r=>Xt(r.label)).join(","),...e.map(r=>n.map(u=>Xt(r[u.key])).join(","))].join(`\r
`)}`,d=new Blob([o],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(d),c=document.createElement("a");c.href=i,c.download=t,document.body.append(c),c.click(),c.remove(),window.setTimeout(()=>URL.revokeObjectURL(i),0)}const qs=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print"],st=[{name:"青葉商事",email:"aoba@example.jp",area:"関東",historySegment:"seasonal"},{name:"北斗酒販",email:"hokuto@example.jp",area:"北海道",historySegment:"premium"},{name:"中央フーズ",email:"chuo@example.jp",area:"関東",historySegment:"seasonal"},{name:"東海酒店",email:"tokai@example.jp",area:"中部",historySegment:"premium"},{name:"三和物産",email:"sanwa@example.jp",area:"関西",historySegment:"liqueur"},{name:"南星リカー",email:"nansei@example.jp",area:"九州",historySegment:"seasonal"},{name:"山川酒店",email:"yamakawa@example.jp",area:"関西",historySegment:"premium"},{name:"瑞穂商店",email:"mizuho@example.jp",area:"中部",historySegment:"seasonal"}],Zt=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"}];function Re(t){const e=wt[t];return e?{subject:e.subject,body:e.body}:{subject:"",body:""}}function jt(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Is(){const t=Re("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:t.subject,body:t.body,saveMessage:null}}const rt=new Date,Os=rt.toISOString().slice(0,7),Fs=rt.getFullYear(),Js=rt.getMonth()+1,Bs=rt.toISOString().slice(0,10),Vs="C0011",P=Is();function Me(t){const e="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",s=t.startsWith(e)?t.slice(e.length)||"/":t;return qs.includes(s)?s:"/"}function Pt(t){switch(t){case"/cat/sales":case"/invoice":case"/ledger":case"/invoice-entry":case"/delivery":case"/billing":case"/report":return"sales";case"/cat/brewery":case"/jikomi":case"/tanks":case"/kentei":case"/materials":return"brewery";case"/cat/purchase":case"/purchase":case"/raw-material":return"purchase";case"/cat/more":case"/master":case"/analytics":case"/tax":case"/store":case"/setup":return"more";case"/email":return"email";default:return"dashboard"}}const te=Me(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,invoiceRecords:[],customerLedger:null,salesAnalytics:null,invoiceForm:jt(),invoiceSaving:!1,invoiceSavedDocNo:null,pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Os,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Fs,taxMonth:Js,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,printTemplate:"chain_store",printOptions:{...fs},printCompany:{...$s},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸",spec:"720ml",quantity:12,unit:"本",unitPrice:1800,amount:21600,janCode:"4901234567891"},{productCode:"P00008",productName:"本醸造",spec:"1.8L",quantity:6,unit:"本",unitPrice:2400,amount:14400,janCode:"4901234567908"}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Bs,route:te,currentCategory:Pt(te),sidebarOpen:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Vs,masterTab:"customers",analyticsTab:"products",emailAudienceMode:P.mode,emailRegion:P.region,emailHistorySegment:P.historySegment,emailTemplateId:P.templateId,emailSubject:P.subject,emailBody:P.body,emailSaveMessage:P.saveMessage,emailSending:!1,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function ee(t){return t.slice(0,10)}function Us(t){return{...t}}function ct(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function qe(){a.invoiceForm=jt(),a.invoiceSavedDocNo=null,a.invoiceErrors={},ct()}function Ie(t){const e={};return t.invoiceDate.trim()||(e.invoiceDate="伝票日付は必須です。"),t.customerCode.trim()||(e.customerCode="得意先コードは必須です。"),t.lines.length===0&&(e.lines="明細を1行以上入力してください。"),t.lines.forEach((s,n)=>{s.productCode.trim()||(e[`lines.${n}.productCode`]="商品コードは必須です。"),s.productName.trim()||(e[`lines.${n}.productName`]="商品名は必須です。"),s.quantity<=0&&(e[`lines.${n}.quantity`]="数量は1以上を入力してください。"),s.unitPrice<0&&(e[`lines.${n}.unitPrice`]="単価は0円以上で入力してください。")}),e}function Hs(t){const e=a.invoiceForm.lines[t];e&&a.invoiceForm.lines.splice(t+1,0,Us(e))}function Ys(){const t=a.invoiceRecords[0],e=a.masterStats?.customers[0],s=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:t?.customerCode??e?.code??"",customerName:t?.customerName??e?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:s.map((n,l)=>{const o=l===0?1:2,d=1200*(l+1);return{productCode:n.code,productName:n.name,quantity:o,unitPrice:d,unit:"本",amount:o*d}}),note:t?`過去伝票 ${t.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Ks(t){const e=a.masterStats?.customers.find(s=>s.code.toLowerCase()===t.trim().toLowerCase());return e?(a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,!0):!1}function zs(t){const e=a.masterStats?.customers.find(s=>s.name===t.trim());return e?(a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,!0):!1}function Oe(t){if(C(t),a.invoiceErrors=Ie(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){m();return}a.invoiceSaving=!0,m(),ye(a.invoiceForm).then(e=>{a.invoiceSavedDocNo=e.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=jt(),m()}).catch(()=>{a.invoiceSaving=!1,m()})}function Fe(t){const e=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,s=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...t.salesRecords].sort((n,l)=>new Date(l.date).getTime()-new Date(n.date).getTime()).filter(n=>{const l=new Date(n.date);return!(e&&l<e||s&&l>s)})}function Je(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?st:st.filter(t=>t.area===a.emailRegion);case"history":return st.filter(t=>t.historySegment===a.emailHistorySegment);default:return st}}function Qs(){const t=Je();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:t.length,previewRecipients:t.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending}}function vt(t){const e=Je(),s=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:s,recipientCount:e.length,recipients:e.map(n=>n.email),status:t}}function Et(){return a.user,!1}function K(){a.globalSearchOpen=!1,a.globalQuery=""}function Ws(){const t=a.globalQuery.trim().toLowerCase();return t?{customers:a.masterStats?.customers.filter(e=>e.code.toLowerCase().includes(t)||e.name.toLowerCase().includes(t))??[],products:a.masterStats?.products.filter(e=>e.code.toLowerCase().includes(t)||e.name.toLowerCase().includes(t))??[],documents:a.invoiceRecords.filter(e=>e.documentNo.toLowerCase().includes(t)||e.customerName.toLowerCase().includes(t)||e.date.toLowerCase().includes(t)),pages:Zt.filter(e=>e.path.toLowerCase().includes(t)||e.title.toLowerCase().includes(t))}:{customers:[],products:[],documents:[],pages:Zt}}function Gs(){let t=[],e,s="export.csv";switch(a.route){case"/sales":t=(a.salesSummary?Fe(a.salesSummary):[]).map(n=>({documentNo:n.documentNo,date:n.date,customerCode:n.customerCode,customerName:n.customerName,amount:n.amount})),e=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],s="sales.csv";break;case"/payment":t=[...a.paymentStatus?.records??[]].sort((n,l)=>l.balanceAmount-n.balanceAmount).map(n=>({...n})),e=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],s="payment-status.csv";break;case"/invoice":t=a.invoiceRecords.map(n=>({...n})),e=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],s="invoices.csv";break;case"/purchase":t=a.purchaseList.map(n=>({...n})),e=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],s="purchase.csv";break;case"/jikomi":t=a.jikomiList.map(n=>({...n})),e=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],s="jikomi.csv";break;case"/tanks":t=a.tankList.map(n=>({...n})),e=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],s="tanks.csv";break;case"/kentei":t=a.kenteiList.map(n=>({...n})),e=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],s="kentei.csv";break;case"/materials":t=a.materialList.map(n=>({...n})),e=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],s="materials.csv";break;case"/master":a.masterTab==="customers"?(t=a.masterStats?.customers.map(n=>({...n}))??[],e=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],s="master-customers.csv"):(t=a.masterStats?.products.map(n=>({...n}))??[],e=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],s="master-products.csv");break;default:return}Ms(s,t,e)}function ae(t){const e=`${"/sake-system/".replace(/\/$/,"")}${t==="/"?"/":t}`;history.pushState(null,"",e),a.route=t,a.currentCategory=Pt(t),a.sidebarOpen=!1,K(),Tt(t)}async function Tt(t){a.actionLoading=!0,m();try{switch(t){case"/delivery":a.deliveryNote||(a.deliveryNote=await Dt(a.deliverySearchDocNo||"D240122"));break;case"/billing":a.billingSummary||(a.billingSummary=await _t(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await be());break;case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await fe());break;case"/tanks":a.tankList.length===0&&(a.tankList=await $e());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await ke());break;case"/materials":a.materialList.length===0&&(a.materialList=await Se());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([we(),xe()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Ce(),De()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await Nt(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([At(a.storeSalesDate),Ae()]));break;default:break}}catch(e){console.warn("Route data load error",e)}finally{a.actionLoading=!1,m()}}function se(){if(Et())return Ka(a.authError,a.authSubmitting);if(a.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(a.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${a.error}</p>
      </section>
    `;switch(a.route){case"/cat/sales":return Q("sales");case"/cat/brewery":return Q("brewery");case"/cat/purchase":return Q("purchase");case"/cat/more":return Q("more");case"/invoice-entry":return Ma(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/email":return Pa(Qs());case"/delivery":return a.deliveryNote?La(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/billing":return a.billingSummary?$a(a.billingSummary,a.billingYearMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/report":return a.salesReport?ps(a.salesReport):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/jikomi":return a.jikomiView==="calendar"?`${zt(a.jikomiList,a.jikomiView)}${Ua(a.jikomiList)}`:zt(a.jikomiList,a.jikomiView);case"/tanks":return Ts(a.tankList);case"/kentei":return Ha(a.kenteiList);case"/materials":return Ga(a.materialList);case"/purchase":return as(a.purchaseList,a.payableList);case"/raw-material":return ss(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Rs(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/store":return ys(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?os(a.pipelineMeta,z,ft):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/import":return gs(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return _s(a.printTemplate,a.printOptions,a.printCompany,a.printData)}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return vs(Fe(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return ts([...a.paymentStatus.records].sort((t,e)=>e.balanceAmount-t.balanceAmount));case"/master":return Wa(a.masterStats,a.masterTab);case"/invoice":return Oa(a.invoiceRecords,a.invoiceFilter);case"/ledger":return Ca(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return us(a.salesAnalytics,a.analyticsTab);default:return Na(a.salesSummary,a.pipelineMeta,a.salesAnalytics)}}function Xs(){if(Et())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${se()}</div>
        </main>
      </div>
    `;const t={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売管理",items:[{path:"/cat/sales",label:"販売管理トップ",kicker:"Category"},{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],brewery:[{label:"蔵内管理",items:[{path:"/cat/brewery",label:"蔵内管理トップ",kicker:"Category"},{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]}],purchase:[{label:"仕入管理",items:[{path:"/cat/purchase",label:"仕入管理トップ",kicker:"Category"},{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],more:[{label:"その他",items:[{path:"/cat/more",label:"その他トップ",kicker:"Category"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/email",label:"メール配信",kicker:"Mail"},{path:"/setup",label:"連動設定",kicker:"Setup"}]}],email:[{label:"メール配信",items:[{path:"/email",label:"季節商品案内",kicker:"Mail"}]}]},e=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/cat/sales",label:"販売管理"},{category:"brewery",path:"/cat/brewery",label:"蔵内管理"},{category:"purchase",path:"/cat/purchase",label:"仕入管理"},{category:"more",path:"/cat/more",label:"その他"},{category:"email",path:"/email",label:"メール配信"}],s=t[a.currentCategory].map(i=>`
        <div class="nav-group">
          <p class="nav-group-label">${i.label}</p>
          ${i.items.map(c=>`
                <a
                  href="${"/sake-system/".replace(/\/$/,"")}${c.path==="/"?"/":c.path}"
                  class="nav-link ${a.route===c.path?"active":""}"
                  data-link="${c.path}"
                >
                  <div>
                    <div class="nav-kicker">${c.kicker}</div>
                    <div class="nav-label">${c.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),n=e.map(i=>`
        <a
          href="${"/sake-system/".replace(/\/$/,"")}${i.path==="/"?"/":i.path}"
          class="category-link ${a.currentCategory===i.category?"active":""}"
          data-link="${i.path}"
        >
          ${i.label}
        </a>
      `).join(""),l=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?Ta(a.masterStats.customers,a.pickerQuery):es(a.masterStats.products,a.pickerQuery):"",o=a.globalSearchOpen?Ea(a.globalQuery,Ws()):"",d=a.user?`
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
          <div class="category-nav">${n}</div>
          <div class="subnav">${s}</div>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${d}
        </header>
        <div class="view ${a.actionLoading?"is-busy":""}">${se()}</div>
      </main>
      ${l}
      ${o}
    </div>
  `}async function Zs(t){a.actionLoading=!0,m();try{a.invoiceRecords=await it(t)}finally{a.actionLoading=!1,m()}}async function tn(t){a.actionLoading=!0,m();try{a.customerLedger=await Ct(t)}finally{a.actionLoading=!1,m()}}function C(t){a.invoiceForm={invoiceType:t.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:t.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:t.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:t.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:t.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((e,s)=>{const n=parseFloat(t.querySelector(`[data-line="${s}"][data-field="quantity"]`)?.value??"")||0,l=parseFloat(t.querySelector(`[data-line="${s}"][data-field="unitPrice"]`)?.value??"")||0;return{...e,productCode:t.querySelector(`[data-line="${s}"][data-field="productCode"]`)?.value??e.productCode,productName:t.querySelector(`[data-line="${s}"][data-field="productName"]`)?.value??e.productName,unit:t.querySelector(`[data-line="${s}"][data-field="unit"]`)?.value??e.unit,quantity:n,unitPrice:l,amount:n*l}}),note:t.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function E(t){const e=t.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=e,a.emailRegion=t.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=t.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=t.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=t.querySelector("#email-body")?.value??a.emailBody}function en(t){t.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,m()}),t.querySelectorAll("[data-action='global-search-close']").forEach(e=>{e.addEventListener("click",s=>{e.classList.contains("global-search")&&s.target instanceof HTMLElement&&!s.target.classList.contains("global-search")||(K(),m())})}),t.querySelector("#global-search-input")?.addEventListener("input",e=>{a.globalQuery=e.target.value,m()}),t.querySelectorAll("[data-action='global-nav']").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.path;s&&(K(),ae(s))})}),t.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Gs()}),t.querySelectorAll("[data-jikomi-tab]").forEach(e=>{e.addEventListener("click",()=>{a.jikomiView=e.dataset.jikomiTab,m()})}),t.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const e=t.querySelector("#auth-email")?.value.trim()??"",s=t.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,m(),He(e,s).then(n=>{a.user=n,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null,m()}).catch(async n=>{try{const l=await Ye(e,s);a.user=l,a.authSkipped=!1,a.authError=null}catch{a.authError=n instanceof Error?n.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,m()}})}),t.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,m()}),t.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Ke().finally(()=>{location.reload()})}),t.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,m()}),t.querySelectorAll("[data-action='sidebar-close']").forEach(e=>{e.addEventListener("click",()=>{a.sidebarOpen=!1,m()})}),t.querySelectorAll("[data-link]").forEach(e=>{e.addEventListener("click",s=>{s.preventDefault(),ae(e.dataset.link)})}),t.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const e=t.querySelector("#sales-start")?.value??"",s=t.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:e,endDate:s},m()}),t.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const e={documentNo:t.querySelector("#invoice-document-no")?.value??"",startDate:t.querySelector("#invoice-start")?.value??"",endDate:t.querySelector("#invoice-end")?.value??"",customerCode:t.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=e,Zs(e)}),t.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const e=t.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=e.trim().toUpperCase(),tn(a.ledgerCustomerCode)}),t.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{a.masterTab=e.dataset.tab,m()})}),t.querySelectorAll("[data-analytics-tab]").forEach(e=>{e.addEventListener("click",()=>{a.analyticsTab=e.dataset.analyticsTab,m()})}),t.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{C(t),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},m()}),t.querySelectorAll("[data-action='remove-line']").forEach(e=>{e.addEventListener("click",()=>{C(t);const s=parseInt(e.dataset.line??"0",10);a.invoiceForm.lines.splice(s,1),a.invoiceErrors=Ie(a.invoiceForm),m()})}),t.querySelectorAll("[data-action='duplicate-line']").forEach(e=>{e.addEventListener("click",()=>{C(t),Hs(parseInt(e.dataset.line??"0",10)),a.invoiceErrors={},m()})}),t.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Ys(),m()}),t.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{C(t),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,m()}),t.querySelectorAll("[data-action='open-product-picker']").forEach(e=>{e.addEventListener("click",()=>{C(t);const s=parseInt(e.dataset.line??"0",10),n=a.invoiceForm.lines[s];a.pickerMode="product",a.pickerTargetLine=s,a.pickerQuery=n?n.productCode||n.productName:"",m()})}),t.querySelectorAll("[data-action='modal-close']").forEach(e=>{e.addEventListener("click",s=>{e.classList.contains("modal-backdrop")&&s.target instanceof HTMLElement&&!s.target.classList.contains("modal-backdrop")||(ct(),m())})}),t.querySelectorAll("[data-action='picker-select']").forEach(e=>{const s=()=>{const n=e.dataset.code??"",l=e.dataset.name??"";if(a.pickerMode==="customer")a.invoiceForm.customerCode=n,a.invoiceForm.customerName=l,delete a.invoiceErrors.customerCode;else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const o=a.invoiceForm.lines[a.pickerTargetLine];o&&(o.productCode=n,o.productName=l,o.amount=o.quantity*o.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`])}ct(),m()};e.addEventListener("click",s),e.addEventListener("keydown",n=>{n.key==="Enter"&&s()})}),t.querySelector("#modal-search")?.addEventListener("input",e=>{a.pickerQuery=e.target.value,m()}),t.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{qe(),m()}),t.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Oe(t)}),t.querySelector("#inv-customer-code")?.addEventListener("blur",()=>{C(t),Ks(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,m())}),t.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{C(t),zs(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,m())}),t.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(e=>{e.addEventListener("input",()=>{C(t),a.invoiceSavedDocNo=null})}),t.querySelector("#inv-type")?.addEventListener("change",()=>{C(t),a.invoiceSavedDocNo=null}),t.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const e=t.querySelector("#delivery-docno")?.value??"";a.deliverySearchDocNo=e.trim(),a.deliveryNote=null,a.actionLoading=!0,m(),Dt(a.deliverySearchDocNo||"D240122").then(s=>{a.deliveryNote=s,a.actionLoading=!1,m()})}),t.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const e=t.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=e,a.billingSummary=null,a.actionLoading=!0,m(),_t(e).then(s=>{a.billingSummary=s,a.actionLoading=!1,m()})}),t.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const e=parseInt(t.querySelector("#tax-year")?.value??String(a.taxYear),10),s=parseInt(t.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=e,a.taxMonth=s,a.taxDeclaration=null,a.actionLoading=!0,m(),Nt(e,s).then(n=>{a.taxDeclaration=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:e}=await N(async()=>{const{generateTaxXML:d}=await Promise.resolve().then(()=>R);return{generateTaxXML:d}},void 0),s=e(a.taxDeclaration),n=new Blob([s],{type:"application/xml;charset=utf-8"}),l=URL.createObjectURL(n),o=document.createElement("a");o.href=l,o.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,o.click(),URL.revokeObjectURL(l)}),t.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:e}=await N(async()=>{const{generateTaxCSV:d}=await Promise.resolve().then(()=>R);return{generateTaxCSV:d}},void 0),s=e(a.taxDeclaration),n=new Blob([s],{type:"text/csv;charset=utf-8"}),l=URL.createObjectURL(n),o=document.createElement("a");o.href=l,o.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,o.click(),URL.revokeObjectURL(l)}),t.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:e}=await N(async()=>{const{saveTaxDeclaration:s}=await Promise.resolve().then(()=>R);return{saveTaxDeclaration:s}},void 0);try{await e(a.taxDeclaration),alert("下書き保存しました（Supabase tax_declarationsに保存）")}catch(s){alert("保存に失敗: "+(s instanceof Error?s.message:String(s)))}}),t.querySelectorAll("[data-tax-row][data-tax-field]").forEach(e=>{e.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const s=Number(e.dataset.taxRow),n=e.dataset.taxField,l=e.type==="number"?Number(e.value)||0:e.value,o=[...a.taxDeclaration.rows];o[s]={...o[s],[n]:l};const{recalculateTaxDeclaration:d}=await N(async()=>{const{recalculateTaxDeclaration:i}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:i}},void 0);a.taxDeclaration=d({...a.taxDeclaration,rows:o}),m()})}),t.querySelectorAll("[data-ded-row][data-ded-field]").forEach(e=>{e.addEventListener("change",()=>{if(!a.taxDeclaration)return;const s=Number(e.dataset.dedRow),n=e.dataset.dedField,l=e.type==="number"?Number(e.value)||0:e.value,o=[...a.taxDeclaration.deductions];o[s]={...o[s],[n]:l},a.taxDeclaration={...a.taxDeclaration,deductions:o},m()})}),t.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(e=>{e.addEventListener("change",()=>{if(!a.taxDeclaration)return;const s=e.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[s]:e.value}})}),t.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:e,TAX_RATE_CATEGORIES:s}=await N(async()=>{const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:d}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:d}},void 0),n=s[0],l={taxCategory:n.code,taxCategoryName:n.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:n.taxRatePerLiter,taxAmount:0};a.taxDeclaration=e({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,l]}),m()}),t.querySelectorAll("[data-action='tax-remove-category']").forEach(e=>{e.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const s=Number(e.dataset.taxRow),{recalculateTaxDeclaration:n}=await N(async()=>{const{recalculateTaxDeclaration:o}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:o}},void 0),l=a.taxDeclaration.rows.filter((o,d)=>d!==s);a.taxDeclaration=n({...a.taxDeclaration,rows:l}),m()})}),t.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const e={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,e]},m()}),t.querySelectorAll("[data-action='tax-remove-deduction']").forEach(e=>{e.addEventListener("click",()=>{if(!a.taxDeclaration)return;const s=Number(e.dataset.dedRow),n=a.taxDeclaration.deductions.filter((l,o)=>o!==s);a.taxDeclaration={...a.taxDeclaration,deductions:n},m()})}),t.querySelectorAll("[data-store-tab]").forEach(e=>{e.addEventListener("click",()=>{a.storeTab=e.dataset.storeTab,m()})}),t.querySelectorAll("[data-import-entity]").forEach(e=>{e.addEventListener("click",()=>{a.importEntity=e.dataset.importEntity,a.importPreview=null,a.importResult=null,m()})}),t.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const e=Ps(a.importEntity),s=new Blob([e],{type:"text/csv;charset=utf-8"}),n=URL.createObjectURL(s),l=document.createElement("a");l.href=n,l.download=`template_${a.importEntity}.csv`,l.click(),URL.revokeObjectURL(n)}),t.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const s=t.querySelector("#import-file")?.files?.[0];if(!s){alert("CSVファイルを選択してください");return}const n=new FileReader;n.onload=()=>{const l=String(n.result??""),{columns:o,rows:d}=Ls(l);a.importPreview=js(a.importEntity,o,d),a.importResult=null,m()},n.readAsText(s,"utf-8")}),t.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,m()}),t.querySelectorAll("[data-print-template]").forEach(e=>{e.addEventListener("click",()=>{a.printTemplate=e.dataset.printTemplate,m()})}),t.querySelectorAll("[data-print-field]").forEach(e=>{e.addEventListener("change",()=>{const s=e.dataset.printField;let n=e.value;(s==="taxRate"||s==="previousBalance"||s==="paymentAmount")&&(n=Number(e.value)||0),a.printData={...a.printData,[s]:n},m()})}),t.querySelectorAll("[data-print-opt]").forEach(e=>{e.addEventListener("change",()=>{const s=e.dataset.printOpt;let n;e.type==="checkbox"?n=e.checked:s==="copies"?n=Number(e.value)||1:n=e.value,a.printOptions={...a.printOptions,[s]:n},m()})}),t.querySelectorAll("[data-print-line][data-print-lfield]").forEach(e=>{e.addEventListener("change",()=>{const s=Number(e.dataset.printLine),n=e.dataset.printLfield,l=[...a.printData.lines];let o=e.value;(n==="quantity"||n==="unitPrice")&&(o=Number(e.value)||0),l[s]={...l[s],[n]:o},l[s].amount=(Number(l[s].quantity)||0)*(Number(l[s].unitPrice)||0),a.printData={...a.printData,lines:l},m()})}),t.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},m()}),t.querySelectorAll("[data-action='print-remove-line']").forEach(e=>{e.addEventListener("click",()=>{const s=Number(e.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((n,l)=>l!==s)},m()})}),t.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),alert("印刷設定を保存しました（次回以降も使えます）")}catch(e){alert("保存失敗: "+(e instanceof Error?e.message:String(e)))}}),t.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const e=a.printCompany,s=prompt("会社名",e.name);if(s===null)return;const n=prompt("郵便番号",e.postalCode)??e.postalCode,l=prompt("住所",e.address1)??e.address1,o=prompt("TEL",e.tel)??e.tel,d=prompt("FAX",e.fax)??e.fax,i=prompt("適格請求書登録番号 (T+13桁)",e.registrationNo)??e.registrationNo,c=prompt("取引銀行名",e.bankName)??e.bankName,r=prompt("支店名",e.bankBranch)??e.bankBranch,u=prompt("口座番号",e.bankAccountNo)??e.bankAccountNo,p=prompt("口座名義",e.bankAccountHolder)??e.bankAccountHolder;a.printCompany={...e,name:s,postalCode:n,address1:l,tel:o,fax:d,registrationNo:i,bankName:c,bankBranch:r,bankAccountNo:u,bankAccountHolder:p},m()}),t.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,m();try{const e=a.importPreview.rows.filter(n=>n._valid),s=await Es(a.importEntity,e);a.importResult=`取り込み完了: ${s.inserted}件成功 / ${s.failed}件失敗`,a.importPreview=null}catch(e){a.importResult=`エラー: ${e instanceof Error?e.message:String(e)}`}finally{a.importing=!1,m()}}}),t.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const e=t.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=e,a.storeSales=[],a.actionLoading=!0,m(),At(e).then(s=>{a.storeSales=s,a.actionLoading=!1,m()})}),t.querySelectorAll("[data-action='copy-config']").forEach(e=>{e.addEventListener("click",async()=>{const s=e.dataset.configValue??"";if(s)try{await navigator.clipboard.writeText(s),e.textContent="コピー済み",window.setTimeout(()=>{e.textContent="コピー"},1600)}catch(n){console.warn("Clipboard copy failed",n)}})}),t.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const s=JSON.stringify({supabase_url:z,supabase_anon_key:"（Supabaseダッシュボードから取得して貼り付け）",z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),n=new Blob([s],{type:"application/json;charset=utf-8"}),l=URL.createObjectURL(n),o=document.createElement("a");o.href=l,o.download="relay_config.json",o.click(),URL.revokeObjectURL(l)}),t.querySelectorAll("[data-action='copy-code']").forEach(e=>{e.addEventListener("click",async()=>{const s=e.dataset.code??"";if(s)try{await navigator.clipboard.writeText(decodeURIComponent(s)),e.textContent="コピー済み",window.setTimeout(()=>{e.textContent="コピー"},1600)}catch(n){console.warn("Clipboard code copy failed",n)}})}),t.querySelectorAll("input[name='email-audience-mode']").forEach(e=>{e.addEventListener("change",()=>{E(t),a.emailSaveMessage=null,m()})}),t.querySelectorAll("#email-region, #email-history-segment").forEach(e=>{e.addEventListener("change",()=>{E(t),a.emailSaveMessage=null,m()})}),t.querySelector("#email-subject")?.addEventListener("input",()=>{E(t),a.emailSaveMessage=null}),t.querySelector("#email-body")?.addEventListener("input",()=>{E(t),a.emailSaveMessage=null}),t.querySelectorAll("[data-action='template-select']").forEach(e=>{e.addEventListener("click",()=>{a.emailTemplateId=e.dataset.templateId??"custom";const s=Re(a.emailTemplateId);a.emailSubject=s.subject,a.emailBody=s.body,a.emailSaveMessage=null,m()})}),t.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{E(t);const e=`

商品詳細はこちら: https://example.jp/products/seasonal`;a.emailBody.includes("https://example.jp/products/seasonal")||(a.emailBody=`${a.emailBody.trimEnd()}${e}`),a.emailSaveMessage=null,m()}),t.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{E(t),a.actionLoading=!0,m(),nt(vt("draft")).then(e=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,m()})}),t.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{E(t),a.actionLoading=!0,a.emailSending=!0,m();const e=vt("sent");Le().then(async s=>{await nt({...e,recipientCount:s.sent}),a.emailSaveMessage=`${s.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,m(),window.alert(`${s.sent}件送信完了`)}).catch(async()=>{await nt(vt("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,m(),window.alert("APIキー未設定のため下書き保存しました")})})}function m(){const t=document.querySelector("#app");t&&(t.innerHTML=Xs(),en(t),a.pickerMode&&t.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&t.querySelector("#global-search-input")?.focus(),Et()&&t.querySelector("#auth-email")?.focus())}async function an(){a.loading=!0,m();try{const[t,e,s,n,l,o,d]=await Promise.all([ue(),pe(),me(),he(),it(a.invoiceFilter),Ct(a.ledgerCustomerCode),ve()]);if(a.salesSummary=t,a.paymentStatus=e,a.masterStats=s,a.pipelineMeta=n,a.invoiceRecords=l,a.customerLedger=o,a.salesAnalytics=d,!a.salesFilter.startDate||!a.salesFilter.endDate){const c=[...t.salesRecords].sort((p,h)=>new Date(h.date).getTime()-new Date(p.date).getTime())[0]?.date??new Date().toISOString(),r=new Date(c),u=new Date(r);u.setDate(r.getDate()-30),a.salesFilter={startDate:ee(u.toISOString()),endDate:ee(r.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await it(a.invoiceFilter)),a.error=null}catch(t){a.error=t instanceof Error?t.message:"データの取得に失敗しました。"}finally{a.loading=!1,m(),Tt(a.route)}}window.addEventListener("popstate",()=>{a.route=Me(location.pathname),a.currentCategory=Pt(a.route),a.sidebarOpen=!1,K(),Tt(a.route)});window.addEventListener("keydown",t=>{if((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="k"){t.preventDefault(),a.globalSearchOpen=!0,m();return}if(t.key==="Escape"){if(a.globalSearchOpen){K(),m();return}if(a.pickerMode){ct(),m();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(qe(),m());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="s"){t.preventDefault();const e=document.querySelector("#app");e&&Oe(e)}});a.user=St()?ze():null;try{const t=localStorage.getItem("sake_print_options");t&&(a.printOptions={...a.printOptions,...JSON.parse(t)});const e=localStorage.getItem("sake_print_company");e&&(a.printCompany={...a.printCompany,...JSON.parse(e)})}catch{}an();
