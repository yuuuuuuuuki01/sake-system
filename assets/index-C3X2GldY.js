(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const _e="modulepreload",Pe=function(t){return"/sake-system/"+t},Lt={},tt=function(e,n,s){let o=Promise.resolve();if(n&&n.length>0){let r=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var c=r;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),l=d?.nonce||d?.getAttribute("nonce");o=r(n.map(u=>{if(u=Pe(u),u in Lt)return;Lt[u]=!0;const p=u.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const y=document.createElement("link");if(y.rel=p?"stylesheet":_e,p||(y.as="script"),y.crossOrigin="",y.href=u,l&&y.setAttribute("nonce",l),document.head.appendChild(y),p)return new Promise((_,q)=>{y.addEventListener("load",_),y.addEventListener("error",()=>q(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return o.then(d=>{for(const l of d||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})},H="https://loarwnuyvfxiscjjsmiz.supabase.co",ht="";async function yt(t,e){return null}async function f(t,e={}){return[]}const Te=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ht,SUPABASE_URL:H,supabaseInsert:yt,supabaseQuery:f},Symbol.toStringTag,{value:"Module"})),vt="sake_auth";function Qt(t){localStorage.setItem(vt,JSON.stringify(t))}function zt(){return{apikey:ht,"Content-Type":"application/json"}}function Ee(t){try{const[,e]=t.split(".");if(!e)return null;const n=e.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function Gt(t,e){const n=await fetch(`${H}/auth/v1/${t}`,{method:"POST",headers:zt(),body:JSON.stringify(e)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function Me(t,e){const n=await Gt("token?grant_type=password",{email:t,password:e});return Qt({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??t}}async function Re(t,e){const n=await Gt("signup",{email:t,password:e});return n.access_token&&n.refresh_token&&Qt({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??t}}async function qe(){const t=bt();if(localStorage.removeItem(vt),!!t?.access_token)try{await fetch(`${H}/auth/v1/logout`,{method:"POST",headers:{...zt(),Authorization:`Bearer ${t.access_token}`}})}catch(e){console.warn("Supabase sign out failed",e)}}function bt(){const t=localStorage.getItem(vt);if(!t)return null;try{const e=JSON.parse(t);return!e.access_token||!e.refresh_token?null:{access_token:e.access_token,refresh_token:e.refresh_token}}catch{return null}}function Fe(){const t=bt();if(!t)return null;const e=Ee(t.access_token),n=typeof e?.email=="string"?e.email:null;return n?{email:n}:null}const gt={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},at={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(t,e)=>{const n=new Date("2026-03-17T00:00:00+09:00");return n.setDate(n.getDate()+e),{date:n.toISOString(),amount:42e4+e*73123%62e4}}),salesRecords:Array.from({length:20},(t,e)=>{const n=new Date("2026-04-15T00:00:00+09:00");return n.setDate(n.getDate()-e),{id:`sale-${e+1}`,documentNo:`D${String(240100+e).padStart(6,"0")}`,date:n.toISOString(),customerCode:`C${String(e+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][e%4],amount:68e3+e%6*24500}})},Ie={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},D={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(t,e)=>({id:`customer-${e+1}`,code:`C${String(e+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][e%6],closingDay:[15,20,25,31][e%4],paymentDay:[5,10,15,20][e%4],isActive:e%5!==0})),products:Array.from({length:12},(t,e)=>({id:`product-${e+1}`,code:`P${String(e+1).padStart(5,"0")}`,janCode:`4901234567${String(e).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][e%4],category:["清酒","焼酎","リキュール"][e%3],isActive:e%6!==0}))},Oe={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"},Zt=at.salesRecords.map((t,e)=>({...t,itemCount:e%4+1})),Je={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},st={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function b(t){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){const e=Number(t);return Number.isFinite(e)?e:0}return 0}function Ve(t){switch((t??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Be(t){return typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"?["true","1","active","enabled","yes","y"].includes(t.toLowerCase()):!1}function S(t,e,n=""){for(const s of e){const o=t[s];if(typeof o=="string"&&o.length>0)return o}return n}function jt(t,e,n=0){for(const s of e)if(s in t)return b(t[s]);return n}function _t(t,e,n=!0){for(const s of e)if(s in t)return Be(t[s]);return n}function Xt(t,e,n){for(const s of e){const o=t[s];if(typeof o!="string"||o.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(o))return new Date(`${o}T00:00:00Z`).toISOString();const i=new Date(o);if(!Number.isNaN(i.getTime()))return i.toISOString()}return n}function te(t){return t.slice(0,7)}function ft(t,e){return{id:String(t.id??`invoice-${e+1}`),documentNo:t.document_no??t.legacy_document_no??`D${String(240100+e).padStart(6,"0")}`,date:Xt(t,["sales_date","document_date"],new Date().toISOString()),customerCode:t.customer_code??t.legacy_customer_code??`C${String(e+1).padStart(4,"0")}`,customerName:t.customer_name??t.customer_code??t.legacy_customer_code??"不明",itemCount:0,amount:b(t.total_amount??t.billed_amount)}}function Pt(t,e){const n=e.startDate?new Date(`${e.startDate}T00:00:00`):null,s=e.endDate?new Date(`${e.endDate}T23:59:59`):null,o=e.documentNo.trim().toLowerCase(),i=e.customerCode.trim().toLowerCase();return t.filter(c=>{const d=new Date(c.date);return!(n&&d<n||s&&d>s||o&&!c.documentNo.toLowerCase().includes(o)||i&&!c.customerCode.toLowerCase().includes(i))}).sort((c,d)=>new Date(d.date).getTime()-new Date(c.date).getTime())}function Tt(t){const e=t.trim().toUpperCase(),n=Je[e];if(n)return n;const s=at.salesRecords.find(o=>o.customerCode.toUpperCase()===e);return{customerCode:e||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function He(){const t=new Map,e=new Map,n=new Map;return Zt.forEach((s,o)=>{const i=te(s.date);t.set(i,(t.get(i)??0)+s.amount);const c=e.get(s.customerCode)??{code:s.customerCode,name:s.customerName,amount:0,quantity:0,documents:0};c.amount+=s.amount,c.quantity+=s.itemCount,c.documents+=1,e.set(s.customerCode,c);const d=`P${String(o%4+1).padStart(5,"0")}`,l=st.productTotals[o%st.productTotals.length],r=n.get(d)??{code:d,name:l?.name??`商品${o+1}`,amount:0,quantity:0,documents:0};r.amount+=s.amount,r.quantity+=s.itemCount*12,r.documents+=1,n.set(d,r)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(t.entries()).sort(([s],[o])=>s.localeCompare(o)).map(([s,o])=>({month:s,amount:o})),productTotals:Array.from(n.values()).sort((s,o)=>o.amount-s.amount),customerTotals:Array.from(e.values()).sort((s,o)=>o.amount-s.amount)}}async function v(t,e){try{const n=await fetch(`/sake-system/${t}`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(n){return console.warn(`Failed to fetch ${t}, using fallback data`,n),e}}async function ee(){const t=await f("daily_sales_fact",{});if(t.length>0){const e=await f("customer_payment_status",{}),s=new Date().toISOString().slice(0,10),o=s.slice(0,7),i=[...t].sort((r,u)=>r.sales_date.localeCompare(u.sales_date)).slice(-30).map(r=>({date:new Date(`${r.sales_date}T00:00:00Z`).toISOString(),amount:b(r.sales_amount)})),c=t.reduce((r,u)=>u.sales_date===s?r+b(u.sales_amount):r,0),d=t.reduce((r,u)=>u.sales_date.startsWith(o)?r+b(u.sales_amount):r,0),l=e.filter(r=>b(r.balance_amount)>0);return{generatedAt:new Date().toISOString(),kpis:{todaySales:c,todayDelta:0,monthSales:d,monthDelta:0,unpaidCount:l.length,unpaidAmount:l.reduce((r,u)=>r+b(u.balance_amount),0)},dailySales:i,salesRecords:at.salesRecords}}return v("data/api/latest/sales-summary.json",at)}async function ae(){const t=await f("customer_payment_status",{});return t.length>0?{generatedAt:new Date().toISOString(),records:t.map((e,n)=>{const s=e.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:b(e.billed_amount),paymentAmount:b(e.paid_amount),balanceAmount:b(e.balance_amount),lastPaymentDate:null,status:Ve(e.payment_status)}})}:v("data/api/latest/payment-status.json",Ie)}async function se(){const[t,e]=await Promise.all([f(),f()]);if(t.length>0||e.length>0){const n=t.length?t.map((o,i)=>({id:S(o,["id","customer_id","code"],`customer-${i+1}`),code:S(o,["code","customer_code","legacy_customer_code"],`C${String(i+1).padStart(4,"0")}`),name:S(o,["name","customer_name","display_name"],`Customer ${i+1}`),closingDay:jt(o,["closing_day","close_day"],31),paymentDay:jt(o,["payment_day","due_day"],15),isActive:_t(o,["is_active","active","enabled"],!0)})):D.customers,s=e.length?e.map((o,i)=>({id:S(o,["id","product_id","code"],`product-${i+1}`),code:S(o,["code","product_code"],`P${String(i+1).padStart(5,"0")}`),janCode:S(o,["jan_code","jan","barcode"],""),name:S(o,["name","product_name","display_name"],`Product ${i+1}`),category:S(o,["category","category_name"],"未分類"),isActive:_t(o,["is_active","active","enabled"],!0)})):D.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:t.length||D.summary.customerCount,activeCustomerCount:t.length?n.filter(o=>o.isActive).length:D.summary.activeCustomerCount,productCount:e.length||D.summary.productCount,activeProductCount:e.length?s.filter(o=>o.isActive).length:D.summary.activeProductCount},customers:n,products:s}}return v("data/api/latest/master-stats.json",D)}function ne(){return v("data/api/latest/pipeline-meta.json",Oe)}async function nt(t){const[e,n]=await Promise.all([f("sales_document_headers",{}),f("sales_document_lines",{})]);if(e.length>0){const s=new Map;n.forEach(i=>{const c=String(i.header_id??i.document_header_id??i.document_no??i.id??"");c&&s.set(c,(s.get(c)??0)+1)});const o=e.map((i,c)=>{const d=ft(i,c),l=String(i.id??i.document_no??i.legacy_document_no??"");return{...d,itemCount:s.get(l)??d.itemCount}});return Pt(o,t)}return Pt(Zt,t)}async function $t(t){const e=t.trim().toUpperCase();if(!e)return Tt("");const[n,s,o]=await Promise.all([f("sales_document_headers",{}),f("customer_payments",{}),f("customer_payment_status",{})]);if(n.length>0||s.length>0){const i=n.map((l,r)=>{const u=ft(l,r);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),c=s.map((l,r)=>({id:String(l.id??`payment-${r+1}`),date:Xt(l,["payment_date","received_date"],new Date().toISOString()),amount:b(l.payment_amount??l.amount),method:l.payment_method??l.method??"入金"})),d=o.find(l=>(l.legacy_customer_code??"").toUpperCase()===e);return{customerCode:e,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??e,balanceAmount:b(d?.balance_amount),salesTotal:i.reduce((l,r)=>l+r.amount,0),paymentTotal:c.reduce((l,r)=>l+r.amount,0),salesHistory:i,paymentHistory:c}}return Tt(e)}async function oe(){const[t,e,n]=await Promise.all([f("daily_sales_fact",{}),f("sales_document_headers",{}),f("sales_document_lines",{})]);if(t.length>0){const s=new Map;t.forEach(c=>{const d=te(c.sales_date);s.set(d,(s.get(d)??0)+b(c.sales_amount))});const o=new Map;e.forEach((c,d)=>{const l=ft(c,d),r=o.get(l.customerCode)??{code:l.customerCode,name:l.customerName,amount:0,quantity:0,documents:0};r.amount+=l.amount,r.documents+=1,o.set(l.customerCode,r)});const i=new Map;return n.forEach((c,d)=>{const l=c.product_code??c.legacy_product_code??`P${String(d+1).padStart(5,"0")}`,r=i.get(l)??{code:l,name:c.product_name??l,amount:0,quantity:0,documents:0};r.amount+=b(c.line_amount??c.amount),r.quantity+=b(c.quantity),r.documents+=1,i.set(l,r)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(s.entries()).sort(([c],[d])=>c.localeCompare(d)).map(([c,d])=>({month:c,amount:d})).slice(-12),productTotals:i.size>0?Array.from(i.values()).sort((c,d)=>d.amount-c.amount):st.productTotals,customerTotals:o.size>0?Array.from(o.values()).sort((c,d)=>d.amount-c.amount):st.customerTotals}}return He()}const pt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function ie(t){const e=t.lines.reduce((o,i)=>o+i.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await yt("sales_document_headers",{legacy_customer_code:t.customerCode,sales_date:t.invoiceDate,document_type:t.invoiceType,staff_code:t.staffCode}))?.id??`local-${n}`,documentNo:n,totalAmount:e,status:"confirmed",createdAt:new Date().toISOString()}}const Et={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function kt(t){const e=await f("sales_document_headers",{});if(e.length>0){const n=e[0],s=b(n.total_amount);return{documentNo:t,invoiceDate:S(n,["sales_date","document_date"],""),customerCode:S(n,["legacy_customer_code","customer_code"],""),customerName:S(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...Et,documentNo:t||Et.documentNo}}const Ue={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function St(t){return v(`data/api/latest/billing-${t}.json`,{...Ue,targetYearMonth:t})}const Ke=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Ye={generatedAt:new Date().toISOString(),months:Ke,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(t=>t*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(t=>t*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(t=>t*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(t=>t*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(t=>t*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function le(){return v("data/api/latest/sales-report.json",Ye)}const ce={planned:"計画中",active:"仕込中",done:"完了"},We=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function re(){return v("data/api/latest/jikomi.json",We)}const Qe=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function de(){return v("data/api/latest/tanks.json",Qe)}const ze=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function ue(){return v("data/api/latest/kentei.json",ze)}const Ge=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function pe(){return v("data/api/latest/materials.json",Ge)}const Ze=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],Xe=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],ta=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],ea=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function me(){return v("data/api/latest/purchases.json",Ze)}async function he(){return v("data/api/latest/payables.json",Xe)}async function ye(){return v("data/api/latest/bills.json",ta)}async function ve(){return v("data/api/latest/raw-stock.json",ea)}const aa={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",companyAddress:"神奈川県秦野市堀山下182",companyRepresentative:"金井 和雄",taxOffice:"小田原税務署",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,productionVolume:3800,previousBalance:0,currentAdjustment:0,exportDeduction:100,sampleDeduction:100,taxableVolume:3600,volume:3600,taxRate:100,taxAmount:36e4},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,productionVolume:2900,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:2850,volume:2850,taxRate:100,taxAmount:285e3},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,productionVolume:1250,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:1200,volume:1200,taxRate:100,taxAmount:12e4}],deductions:[{type:"export",categoryCode:"01",volume:100,reason:"シンガポール向け輸出",documentNo:"EX2026-003"},{type:"sample",categoryCode:"01",volume:100,reason:"展示会サンプル出荷"},{type:"sample",categoryCode:"02",volume:50,reason:"品評会出品"},{type:"sample",categoryCode:"03",volume:50,reason:"全国新酒鑑評会出品"}],totalVolume:7650,totalTax:765e3,status:"draft",submittedAt:null};async function wt(t,e){return v(`data/api/latest/tax-${t}-${String(e).padStart(2,"0")}.json`,{...aa,targetYear:t,targetMonth:e})}function $(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function be(t){const e=t.rows.map(s=>`    <Category>
      <Code>${$(s.taxCategory)}</Code>
      <Name>${$(s.taxCategoryName)}</Name>
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
`),n=t.deductions.map(s=>`    <Deduction type="${$(s.type)}">
      <CategoryCode>${$(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${$(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${$(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${t.targetYear}</TargetYear>
    <TargetMonth>${String(t.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${$(t.companyNo)}</TaxpayerId>
    <TaxpayerName>${$(t.companyName)}</TaxpayerName>
    <TaxpayerAddress>${$(t.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${$(t.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${$(t.taxOffice)}</TaxOffice>
    <Status>${t.status}</Status>
  </Header>
  <Categories>
${e}
  </Categories>
  <Deductions>
${n}
  </Deductions>
  <Total>
    <TotalVolume>${t.totalVolume}</TotalVolume>
    <TotalTax>${t.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function sa(t){const e=String(t);return/[,"\n]/.test(e)?`"${e.replaceAll('"','""')}"`:e}function na(t){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=t.rows.map(i=>[i.taxCategory,i.taxCategoryName,i.alcoholDegree,i.productionVolume,i.previousBalance,i.currentAdjustment,i.exportDeduction,i.sampleDeduction,i.taxableVolume,i.taxRate,i.taxAmount].map(sa).join(",")),o=`,合計,,${t.rows.reduce((i,c)=>i+c.productionVolume,0)},,,${t.rows.reduce((i,c)=>i+c.exportDeduction,0)},${t.rows.reduce((i,c)=>i+c.sampleDeduction,0)},${t.totalVolume},,${t.totalTax}`;return"\uFEFF"+[n,...s,o].join(`
`)+`
`}async function oa(t){const{supabaseInsert:e}=await tt(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>Te);return{supabaseInsert:n}},void 0);await e("tax_declarations",{target_year:t.targetYear,target_month:t.targetMonth,company_name:t.companyName,company_no:t.companyNo,company_address:t.companyAddress,company_representative:t.companyRepresentative,tax_office:t.taxOffice,total_taxable_volume:t.totalVolume,total_tax_amount:t.totalTax,status:t.status,xml_data:be(t),submitted_at:t.submittedAt})}const ia=Array.from({length:10},(t,e)=>({id:`ss${e+1}`,saleDate:"2026-04-15",saleTime:`${9+e}:${String(e*7%60).padStart(2,"0")}`,productCode:`P${String(e%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][e%4],quantity:1+e%3,unitPrice:[2200,1800,980,680][e%4],amount:(1+e%3)*[2200,1800,980,680][e%4],paymentMethod:["cash","card","paypay","cash"][e%4]})),la=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function Ct(t){return v(`data/api/latest/store-sales-${t}.json`,ia)}async function ge(){return v("data/api/latest/store-orders.json",la)}async function et(t){const e=await yt("email_campaigns",{subject:t.subject,body:t.body,template_id:t.templateId,audience_mode:t.audienceMode,audience_filter:t.audienceFilter,recipient_count:t.recipientCount,sent_count:t.status==="sent"?t.recipientCount:0,status:t.status,sent_at:t.status==="sent"?new Date().toISOString():null});return{id:e?.id??`local-email-${Date.now()}`,subject:e?.subject??t.subject,body:e?.body??t.body,templateId:e?.template_id??t.templateId,audienceMode:e?.audience_mode??t.audienceMode,audienceFilter:e?.audience_filter??t.audienceFilter,recipientCount:e?.recipient_count??t.recipientCount,status:e?.status??t.status,createdAt:e?.created_at??new Date().toISOString(),updatedAt:e?.updated_at??new Date().toISOString()}}async function fe(t){throw new Error("VITE_RESEND_API_KEY is not configured")}const lt=Object.freeze(Object.defineProperty({__proto__:null,INVOICE_TYPE_LABELS:pt,JIKOMI_STATUS_LABELS:ce,SEASONAL_TEMPLATES:gt,fetchBillList:ye,fetchBillingSummary:St,fetchCustomerLedger:$t,fetchDeliveryNote:kt,fetchInvoices:nt,fetchJikomiList:re,fetchKenteiList:ue,fetchMasterStats:se,fetchMaterialList:pe,fetchPayableList:he,fetchPaymentStatus:ae,fetchPipelineMeta:ne,fetchPurchaseList:me,fetchRawMaterialStock:ve,fetchSalesAnalytics:oe,fetchSalesReport:le,fetchSalesSummary:ee,fetchStoreOrders:ge,fetchStoreSales:Ct,fetchTankList:de,fetchTaxDeclaration:wt,generateTaxCSV:na,generateTaxXML:be,saveEmailCampaign:et,saveInvoice:ie,saveTaxDeclaration:oa,sendEmailCampaign:fe},Symbol.toStringTag,{value:"Module"}));function P(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const ca={open:"未締め",closed:"締め済"};function ra(t,e){const n=t.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${P(s.salesAmount)}</td>
        <td class="numeric">${P(s.taxAmount)}</td>
        <td class="numeric">${P(s.prevBalance)}</td>
        <td class="numeric">${P(s.paymentAmount)}</td>
        <td class="numeric"><strong>${P(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${ca[s.status]}</span>
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
          <input id="billing-month" type="month" value="${e}" />
        </label>
        <label class="field">
          <span>締め日</span>
          <select id="billing-day">
            ${[10,15,20,25,31].map(s=>`<option value="${s}" ${t.closingDay===s?"selected":""}>${s}日締め</option>`).join("")}
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
        <p class="kpi-value">${P(t.totalBilling)}</p>
        <p class="kpi-sub">${t.targetYearMonth} / ${t.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${t.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${t.customers.filter(s=>s.status==="closed").length} 社</p>
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
          <tbody>${n}</tbody>
        </table>
      </div>
    </section>
  `}const da={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"}]},ua={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},more:{eyebrow:"その他トップ",title:"周辺業務メニュー",description:"税務、店舗、分析、設定などの補助機能をまとめて配置しています。"}};function Mt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function U(t){const e=ua[t],n=da[t].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Mt(s.title)}</p>
            <p class="category-card-description">${Mt(s.description)}</p>
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
        <p class="eyebrow">${e.eyebrow}</p>
        <h1>${e.title}</h1>
        <p class="meta-note">${e.description}</p>
      </div>
    </section>

    <section class="category-grid">
      ${n}
    </section>
  `}function $e(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function V(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function pa(t){return t.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.salesHistory.map(e=>`
        <tr>
          <td>${$e(e.date)}</td>
          <td class="mono">${e.documentNo}</td>
          <td class="numeric">${V(e.amount)}</td>
        </tr>
      `).join("")}function ma(t){return t.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.paymentHistory.map(e=>`
        <tr>
          <td>${$e(e.date)}</td>
          <td>${e.method}</td>
          <td class="numeric">${V(e.amount)}</td>
        </tr>
      `).join("")}function ha(t,e){return`
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
            <dd>${V(t.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${V(t.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${t.balanceAmount>0?"balance-warning":""}">${V(t.balanceAmount)}</dd>
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
            <tbody>${pa(t)}</tbody>
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
            <tbody>${ma(t)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function K(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Y(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function F(t,e){for(const n of e){const s=t[n];if(typeof s=="number"&&Number.isFinite(s))return s;if(typeof s=="string"){const o=Number(s);if(Number.isFinite(o))return o}}return null}function ya(t){const e=t?.productTotals;if(!e||e.length===0)return"―";const n=e.reduce((o,i)=>{const c=F(i,["amount","salesAmount"]),d=F(i,["marginRate","grossMarginRate"]);return c===null||c<=0||d===null?o:{weightedAmount:o.weightedAmount+c,weightedRate:o.weightedRate+c*d}},{weightedAmount:0,weightedRate:0});if(n.weightedAmount>0)return`${(n.weightedRate/n.weightedAmount).toFixed(1)}%`;const s=e.reduce((o,i)=>{const c=i,d=F(c,["amount","salesAmount"]),l=F(c,["grossProfit","grossAmount","margin"]),r=F(c,["costAmount","cost","costPrice"]);if(d===null||d<=0)return o;const u=l??(r!==null?d-r:null);return u===null?o:{sales:o.sales+d,gross:o.gross+u}},{sales:0,gross:0});return s.sales>0?`${(s.gross/s.sales*100).toFixed(1)}%`:"―"}function va(t){const s={top:20,right:20,bottom:30,left:50},o=760-s.left-s.right,i=260-s.top-s.bottom,c=Math.max(...t.map(u=>u.amount),1),d=o/t.length,l=t.map((u,p)=>{const h=u.amount/c*i,y=s.left+p*d+4,_=s.top+i-h,q=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${y}" y="${_}" width="${Math.max(d-8,8)}" height="${h}" rx="4" fill="#0F5B8D" opacity="${.58+p/t.length*.34}" />
          ${p%5===0?`<text x="${y+6}" y="252" class="chart-axis">${q}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=s.top+i-i*u,h=Math.round(c*u/1e3);return`
        <g>
          <line x1="${s.left}" y1="${p}" x2="${760-s.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${h.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${l}
    </svg>
  `}function ba(t,e,n){const s={success:"正常",warning:"注意",error:"異常",running:"実行中"},o=t.salesRecords.slice(0,10).map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${Y(i.date)}</td>
              <td>${i.customerName}</td>
              <td class="numeric">${K(i.amount)}</td>
            </tr>
          `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${e.status}">${s[e.status]}</span>
        <span class="meta-note">最終同期 ${Y(e.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${K(t.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${t.kpis.todayDelta>0?"+":""}${t.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${K(t.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${t.kpis.monthDelta>0?"+":""}${t.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${t.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${K(t.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${ya(n)}</p>
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
        ${va(t.dailySales)}
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
              <dd>${Y(e.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${Y(e.generatedAt)}</dd>
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
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>
  `}function ga(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(t)):""}function T(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function fa(t,e){const n=t.lines.length?t.lines.map((o,i)=>`
          <tr>
            <td class="numeric">${i+1}</td>
            <td class="mono">${o.productCode}</td>
            <td>${o.productName}</td>
            <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
            <td>${o.unit}</td>
            <td class="numeric">${T(o.unitPrice)}</td>
            <td class="numeric">${T(o.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',s=t.totalAmount-t.taxAmount;return`
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
            <tr><th>納品日</th><td>${ga(t.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${T(t.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${T(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${T(t.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${T(t.totalAmount)}</span></div>
        </div>
        ${t.note?`<p class="delivery-note-text">備考：${t.note}</p>`:""}
      </div>
    </article>
  `}function C(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $a(t){return C(t).replaceAll(`
`,"<br />")}function ka(t){const n=[...Object.values(gt),{id:"custom",season:"カスタム",subject:"",body:""}].map(o=>`
        <button
          class="template-card ${t.selectedTemplateId===o.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${o.id}"
        >
          <span class="template-card-kicker">${o.season}</span>
          <strong>${C(o.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=t.previewRecipients.length?t.previewRecipients.map(o=>`
            <li>
              <span>${C(o.name)}</span>
              <span class="table-sub">${C(o.email)} / ${C(o.area)}</span>
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
          <input id="email-subject" type="text" value="${C(t.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${C(t.body)}</textarea>
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
          <p class="panel-title">${C(t.subject||"件名未入力")}</p>
          <div class="preview-box">${t.body?$a(t.body):"本文未入力"}</div>
        </div>
        ${t.saveMessage?`<p class="meta-note">${C(t.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${t.sending?"disabled":""}>
            ${t.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function k(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function W(t,e){return e.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${t}</p>
      <div class="search-result-list">
        ${e.join("")}
      </div>
    </section>
  `}function Sa(t,e){const n=[W("得意先",e.customers.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${k(o.name)}</strong>
            <span class="table-sub mono">${k(o.code)}</span>
          </button>
        `)),W("商品",e.products.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${k(o.name)}</strong>
            <span class="table-sub mono">${k(o.code)}</span>
          </button>
        `)),W("伝票",e.documents.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${k(o.documentNo)}</strong>
            <span class="table-sub">${k(o.customerName)} / ${k(o.date)}</span>
          </button>
        `)),W("ページ",e.pages.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${k(o.path)}"
          >
            <strong>${k(o.title)}</strong>
            <span class="table-sub mono">${k(o.path)}</span>
          </button>
        `))].filter(Boolean).join(""),s=t.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
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
            value="${k(t)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function I(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ke(t){const e=t.resultsHtml.trim()?t.resultsHtml:`<p class="empty-note">${I(t.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${I(t.title)}">
        <div class="modal-header">
          <h2>${I(t.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${I(t.placeholder)}"
            value="${I(t.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${e}</div>
        </div>
      </div>
    </div>
  `}function Q(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Rt(t){return t.trim().toLowerCase()}function wa(t,e){const n=Rt(e),s=t.filter(i=>n?[i.code,i.name,i.name].map(Rt).some(c=>c.includes(n)):!0).slice(0,50),o=s.length?`
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
                      data-code="${Q(i.code)}"
                      data-name="${Q(i.name)}"
                    >
                      <td class="mono">${Q(i.code)}</td>
                      <td>${Q(i.name)}</td>
                      <td>${i.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return ke({title:"得意先検索",searchQuery:e,placeholder:"コード・名前で検索",resultsHtml:o,emptyMessage:"該当する得意先が見つかりません。"})}function Ca(t){return t.toISOString().slice(0,10)}function j(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function N(t,e){return t[e]?`<div class="field-error">${j(t[e])}</div>`:""}function E(t,e,n=""){return[n,t[e]?"has-error":""].filter(Boolean).join(" ")}function Da(t,e,n,s){const o=Object.keys(pt).map(l=>`<option value="${l}" ${t.invoiceType===l?"selected":""}>${pt[l]}</option>`).join(""),i=t.lines.map((l,r)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${E(s,`lines.${r}.productCode`,"input-cell")}" type="text" data-line="${r}" data-field="productCode" value="${j(l.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${r}" aria-label="商品検索">🔍</button>
          </div>
          ${N(s,`lines.${r}.productCode`)}
        </td>
        <td>
          <input class="${E(s,`lines.${r}.productName`,"input-cell")}" type="text" data-line="${r}" data-field="productName" value="${j(l.productName)}" placeholder="商品名" />
          ${N(s,`lines.${r}.productName`)}
        </td>
        <td>
          <input class="${E(s,`lines.${r}.quantity`,"input-cell numeric")}" type="number" data-line="${r}" data-field="quantity" value="${l.quantity}" min="0" />
          ${N(s,`lines.${r}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${r}" data-field="unit" value="${l.unit}" placeholder="本" /></td>
        <td>
          <input class="${E(s,`lines.${r}.unitPrice`,"input-cell numeric")}" type="number" data-line="${r}" data-field="unitPrice" value="${l.unitPrice}" min="0" />
          ${N(s,`lines.${r}.unitPrice`)}
        </td>
        <td class="numeric">${l.amount>0?l.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${r}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${r}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),c=t.lines.reduce((l,r)=>l+r.amount,0),d=Math.floor(c*10/110);return`
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
          <select id="inv-type">${o}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${E(s,"invoiceDate")}" id="inv-date" type="date" value="${t.invoiceDate||Ca(new Date)}" />
          ${N(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${E(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${j(t.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${N(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${j(t.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${j(t.staffCode)}" />
        </label>
      </div>
      ${N(s,"lines")}
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
          <tbody id="invoice-lines">${i||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(c-d).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${d.toLocaleString("ja-JP")} 円</span>
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${j(t.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function Na(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function Aa(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function xa(t,e){const n=t.length?t.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${Na(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${s.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Aa(s.amount)}</td>
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
          <tbody>${n}</tbody>
        </table>
      </div>
      ${t.length===0?'<p class="empty-note">条件に一致する伝票はありません。</p>':""}
    </section>
  `}function La(t){return new Date(t.getFullYear(),t.getMonth(),1)}function ja(t,e){return new Date(t.getFullYear(),t.getMonth()+e,1)}function Se(t,e){const n=new Date(t);return n.setDate(n.getDate()+e),n}function we(t){const e=new Date(t),n=e.getDay();return e.setDate(e.getDate()-n),e.setHours(0,0,0,0),e}function qt(t){const e=Se(we(t),6);return e.setHours(23,59,59,999),e}function Ft(t){return new Date(`${t}T00:00:00`)}function It(t){return`${t.getMonth()+1}/${t.getDate()}`}function _a(t){return t.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Pa(){const t=new Date,e=we(ja(La(t),-3)),n=qt(new Date(t.getFullYear(),t.getMonth()+4,0)),s=[];let o=new Date(e);for(;o<=n;){const i=qt(o);s.push({start:new Date(o),end:i,label:`${It(o)} - ${It(i)}`}),o=Se(o,7)}return s}function Ta(t){const e=Pa(),n=`160px repeat(${e.length}, minmax(56px, 1fr))`,s=e.map(i=>`
        <div class="gantt-week">
          <span>${i.label}</span>
        </div>
      `).join(""),o=t.length?t.map(i=>{const c=Ft(i.startDate),d=Ft(i.expectedDoneDate),l=Math.max(0,e.findIndex(p=>p.end>=c)),r=Math.max(l,e.reduce((p,h,y)=>h.start<=d?y:p,l)),u=[`仕込番号: ${i.jikomiNo}`,`銘柄: ${i.productName}`,`期間: ${i.startDate} - ${i.expectedDoneDate}`,`タンク: ${i.tankNo}`,`備考: ${i.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${i.jikomiNo}</strong>
                <span class="table-sub">${i.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${e.length}">
                <div
                  class="gantt-bar ${i.status}"
                  style="grid-column:${l+1} / ${r+2}"
                  title="${_a(u)}"
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
  `}function Ot(t,e){const n={planned:"neutral",active:"warning",done:"success"},s=t.map(d=>`
      <tr>
        <td class="mono">${d.jikomiNo}</td>
        <td>${d.productName}</td>
        <td>${d.riceType}</td>
        <td class="numeric">${d.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${d.actualKg>0?d.actualKg.toLocaleString("ja-JP")+" kg":"―"}</td>
        <td>${d.startDate}</td>
        <td>${d.expectedDoneDate}</td>
        <td class="mono">${d.tankNo}</td>
        <td>
          <span class="status-pill ${n[d.status]}">${ce[d.status]}</span>
        </td>
        <td>${d.note||"―"}</td>
      </tr>
    `).join(""),o=t.filter(d=>d.status==="active").length,i=t.filter(d=>d.status==="done").length,c=t.filter(d=>d.status==="planned").length;return`
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
          <tbody>${s||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ea(t){const e={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=t.map(l=>`
      <tr>
        <td class="mono">${l.kenteiNo}</td>
        <td class="mono">${l.jikomiNo}</td>
        <td>${l.productName}</td>
        <td>${l.kenteiDate}</td>
        <td class="numeric">${l.alcoholDegree>0?l.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${l.extractDegree>0?l.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${l.sakaMeterValue!==0?l.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${l.volume>0?l.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${l.taxCategory}</td>
        <td>
          <span class="status-pill ${n[l.status]}">${e[l.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${l.id}">
            ${l.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),o=t.filter(l=>l.status==="approved").length,i=t.filter(l=>l.status==="submitted").length,c=t.filter(l=>l.status==="pending").length;return`
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
        <p class="kpi-value">${t.filter(l=>l.status==="approved").reduce((l,r)=>l+r.volume,0).toLocaleString("ja-JP")} L</p>
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
          <p class="panel-caption">承認済 ${o} 件 / 合計 ${t.length} 件</p>
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
  `}function Ma(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ra(t,e){return`
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
        ${t?`<p class="field-error">${Ma(t)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${e?"disabled":""}>
            ${e?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function qa(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${e.closingDay}日</td>
          <td class="numeric">${e.paymentDay}日</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function Fa(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td class="mono">${e.janCode}</td>
          <td>${e.name}</td>
          <td>${e.category}</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function Ia(t,e){return`
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
            <tbody>${qa(t.customers)}</tbody>
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
            <tbody>${Fa(t.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function ct(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Oa(t){const e=t.map(o=>{const c=(o.minimumStock>0?o.currentStock/o.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${o.code}</td>
          <td>${o.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${o.currentStock.toLocaleString("ja-JP")} ${o.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${o.minimumStock.toLocaleString("ja-JP")} ${o.unit}</td>
          <td class="numeric">${ct(o.unitCost)}</td>
          <td class="numeric">${ct(o.currentStock*o.unitCost)}</td>
          <td>${o.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${o.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=t.filter(o=>o.minimumStock>0&&o.currentStock/o.minimumStock<1.5).length,s=t.reduce((o,i)=>o+i.currentStock*i.unitCost,0);return`
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
        <p class="kpi-value">${ct(s)}</p>
        <p class="kpi-sub">${t.length} 品目</p>
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
          <tbody>${e||'<tr><td colspan="8" class="empty-row">資材データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ja(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t)):"-"}function rt(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const Va={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Ba(t){return`
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
          <tbody>${t.map(n=>`
        <tr>
          <td>
            <div class="table-title">${n.customerName}</div>
            <div class="table-sub mono">${n.customerCode}</div>
          </td>
          <td class="numeric">${rt(n.billedAmount)}</td>
          <td class="numeric">${rt(n.paymentAmount)}</td>
          <td class="numeric">${rt(n.balanceAmount)}</td>
          <td>${Ja(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Va[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function M(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Jt(t){return t.trim().toLowerCase()}function Ha(t,e){const n=Jt(e),s=t.filter(i=>n?[i.code,i.name,i.janCode].map(Jt).some(c=>c.includes(n)):!0),o=s.length?`
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
                      data-code="${M(i.code)}"
                      data-name="${M(i.name)}"
                    >
                      <td class="mono">${M(i.code)}</td>
                      <td>${M(i.name)}</td>
                      <td class="mono">${M(i.janCode)}</td>
                      <td>${M(i.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return ke({title:"商品検索",searchQuery:e,placeholder:"コード・名前・JANで検索",resultsHtml:o,emptyMessage:"該当する商品が見つかりません。"})}function A(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Ua(t,e){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},o={unpaid:"未払い",partial:"一部支払",paid:"支払済"},i={unpaid:"warning",partial:"neutral",paid:"success"},c=t.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${A(p.unitPrice)}</td>
        <td class="numeric"><strong>${A(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[p.status]}">${n[p.status]}</span>
        </td>
      </tr>
    `).join(""),d=e.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${A(p.totalPurchase)}</td>
        <td class="numeric">${A(p.paidAmount)}</td>
        <td class="numeric"><strong>${A(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${i[p.status]}">${o[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),l=t.reduce((p,h)=>p+h.amount,0),r=e.reduce((p,h)=>p+h.balance,0),u=e.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${A(l)}</p>
        <p class="kpi-sub">${t.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${A(r)}</p>
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
          <tbody>${c||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
          <tbody>${d||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function O(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Ka(t,e){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},o=t.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${O(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${s[u.status]}">${n[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${u.id}" ${u.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),i=e.map(u=>{const p=u.minimumStock>0&&u.currentStock<u.minimumStock*1.2;return`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${u.currentStock.toLocaleString("ja-JP")} ${u.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${u.minimumStock.toLocaleString("ja-JP")} ${u.unit}</td>
          <td class="numeric">${O(u.unitCost)}</td>
          <td class="numeric">${O(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=t.filter(u=>u.status==="holding"),d=c.reduce((u,p)=>u+p.amount,0),l=e.reduce((u,p)=>u+p.currentStock*p.unitCost,0),r=e.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${O(d)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${O(l)}</p>
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
          <tbody>${o||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
          <tbody>${i||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ya(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function g(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function mt(t){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(t)}"
      >
        コピー
      </button>
      <pre class="code-block">${g(t)}</pre>
    </div>
  `}function Wa(t){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(t)}"
    >
      コピー
    </button>
  `}function z(t){return`
    <div class="setup-command-row">
      <code class="inline-code">${g(t)}</code>
      ${Wa(t)}
    </div>
  `}function R(t){return`
    <div class="setup-step" data-step="${t.step}">
      <h3>${g(t.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${g(t.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${t.instructions.map(e=>`<li>${g(e)}</li>`).join("")}
        </ol>
      </div>
      ${t.code?mt(t.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${t.success.map(e=>`<li>${g(e)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${t.errors.map(e=>`<li>${g(e)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function G(t){return`
    <div class="setup-step setup-step-compact" data-step="${g(t.stepLabel)}">
      <h3>${g(t.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${g(t.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${t.body}
      </div>
    </div>
  `}function Qa(t,e,n){const s={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Ya(t.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${t.status}">${s[t.status]}</span>
        </p>
        <p class="kpi-sub">${g(t.message)}</p>
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
      ${G({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${z("git --version")}
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
      ${G({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${z("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${G({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${z("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${z("python get-pip.py")}
        `})}
      ${G({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${R({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${R({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${R({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${R({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${R({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${R({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${mt(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${mt(`{
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
            <span class="config-value">${g(e)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${g(e)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${g("（未設定：Supabaseダッシュボードから取得してください）")}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${g(n)}"
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
  `}function za(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Ga(t){return t.replace("-","/")}function Za(t){if(t.length===0)return'<div class="chart-empty">データなし</div>';const e=760,n=280,s={top:16,right:24,bottom:36,left:64},o=e-s.left-s.right,i=n-s.top-s.bottom,c=Math.max(...t.map(u=>u.amount),1),d=o/t.length,l=[0,.25,.5,.75,1].map(u=>{const p=s.top+i-i*u,h=`${Math.round(c*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${s.left}" y1="${p}" x2="${e-s.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${h}</text>
        </g>
      `}).join(""),r=t.map((u,p)=>{const h=u.amount/c*i,y=Math.max(d-18,24),_=s.left+p*d+(d-y)/2,q=s.top+i-h;return`
        <g>
          <rect x="${_}" y="${q}" width="${y}" height="${h}" rx="6" class="analytics-bar" />
          <text x="${_+y/2}" y="${n-10}" class="chart-axis centered-axis">${Ga(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${e} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${l}
      ${r}
    </svg>
  `}function Xa(t){return t.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${za(e.amount)}</td>
          <td class="numeric">${e.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${e.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function ts(t,e){const n=e==="products"?"商品別集計":"得意先別集計",s=e==="products"?t.productTotals:t.customerTotals;return`
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
        ${Za(t.monthlySales)}
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${n}</h2>
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
            <tbody>${Xa(s)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function J(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function es(t){const e=Math.max(...t.salesByProduct.flatMap(i=>i.values),1),n=t.salesByProduct.map(i=>{const c=i.values.map((d,l)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(d/e*120)}px" title="${t.months[l]}: ${J(d)}"></div>
            <span class="bar-label">${t.months[l].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${i.label}</p>
          <div class="bar-chart">${c}</div>
        </div>
      `}).join(""),s=t.costSimulation.map(i=>`
      <tr>
        <td class="mono">${i.productCode}</td>
        <td>${i.productName}</td>
        <td class="numeric">${J(i.costPrice)}</td>
        <td class="numeric">${J(i.sellPrice)}</td>
        <td class="numeric">${J(i.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${i.marginRate>=40?"success":"warning"}">${i.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),o=t.salesByCustomer.map(i=>{const c=i.values.reduce((d,l)=>d+l,0);return`
        <tr>
          <td>${i.label}</td>
          ${i.values.map(d=>`<td class="numeric">${(d/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${J(c)}</strong></td>
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
              ${t.months.map(i=>`<th class="numeric">${i}</th>`).join("")}
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
  `}function as(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function ss(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Vt(t){return t.toISOString().slice(0,10)}function ns(t,e,n){const s=t.length?t.map(o=>`
            <tr>
              <td class="mono">${o.documentNo}</td>
              <td>${as(o.date)}</td>
              <td>
                <div class="table-title">${o.customerName}</div>
                <div class="table-sub mono">${o.customerCode}</div>
              </td>
              <td class="numeric">${ss(o.amount)}</td>
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
          <input id="sales-start" type="date" value="${e||Vt(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Vt(new Date)}" />
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}function Z(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function os(t,e,n,s){const o={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},i={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},d=t.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${Z(p.unitPrice)}</td>
        <td class="numeric"><strong>${Z(p.amount)}</strong></td>
        <td>${o[p.paymentMethod]}</td>
      </tr>
    `).join(""),l=e.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(h=>`${h.productName} ×${h.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Z(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[p.status]}">${i[p.status]}</span>
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
        <p class="kpi-value">${Z(r)}</p>
        <p class="kpi-sub">${t.length} 件 / ${s}</p>
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
            <tbody>${d||'<tr><td colspan="7" class="empty-row">販売データがありません。</td></tr>'}</tbody>
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
            <tbody>${l||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}function is(t){const e={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=t.map(r=>{const u=r.capacity>0?Math.round(r.currentVolume/r.capacity*100):0;return`
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
            <span class="status-pill ${n[r.status]}">${e[r.status]}</span>
          </td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${r.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),o=t.filter(r=>r.status==="in_use").length,i=t.filter(r=>r.status==="aging").length,c=t.filter(r=>r.status==="empty").length,d=t.reduce((r,u)=>r+u.capacity,0),l=t.reduce((r,u)=>r+u.currentVolume,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${d.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${d>0?Math.round(l/d*100):0}%</p>
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
          <tbody>${s||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function dt(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ls(t,e,n){const s=t.rows.map(i=>`
      <tr>
        <td class="mono">${i.taxCategory}</td>
        <td>${i.taxCategoryName}</td>
        <td class="numeric">${i.alcoholDegree.toFixed(1)}度</td>
        <td class="numeric">${i.volume.toLocaleString("ja-JP")} L</td>
        <td class="numeric">${i.taxRate.toLocaleString("ja-JP")} 円/L</td>
        <td class="numeric"><strong>${dt(i.taxAmount)}</strong></td>
      </tr>
    `).join(""),o=Array.from({length:12},(i,c)=>c+1);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">税務管理</p>
        <h1>酒税申告書</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status==="submitted"?"success":"warning"}">
          ${t.status==="submitted"?"申告済":"下書き"}
        </span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年</span>
          <select id="tax-year">
            ${[2025,2026].map(i=>`<option value="${i}" ${e===i?"selected":""}>${i}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${o.map(i=>`<option value="${i}" ${n===i?"selected":""}>${i}月</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="tax-load">集計</button>
        </div>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">酒税総額</p>
        <p class="kpi-value">${dt(t.totalTax)}</p>
        <p class="kpi-sub">${t.targetYear}年${t.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${t.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${t.rows.length} 区分</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>酒税申告書明細</h2>
          <p class="panel-caption">${t.companyName} / 製造者番号 ${t.companyNo}</p>
        </div>
        <button class="button secondary" data-action="tax-print" onclick="window.print()">印刷</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>酒類コード</th>
              <th>酒類区分</th>
              <th class="numeric">アルコール度数</th>
              <th class="numeric">数量（L）</th>
              <th class="numeric">税率</th>
              <th class="numeric">酒税額</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="6" class="empty-row">申告データがありません。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="3">合計</th>
              <th class="numeric">${t.totalVolume.toLocaleString("ja-JP")} L</th>
              <th></th>
              <th class="numeric">${dt(t.totalTax)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="tax-export-xml">📄 XMLダウンロード</button>
        <button class="button secondary" data-action="tax-export-csv">📊 CSVダウンロード</button>
        <button class="button secondary" data-action="tax-save-draft">下書き保存</button>
        <button class="button primary" data-action="tax-submit" ${t.status==="submitted"?"disabled":""}>
          ${t.status==="submitted"?"申告済":"申告する"}
        </button>
      </div>
      <p class="form-hint" style="margin-top: 12px;">
        XMLはeTax受付システム形式、CSVは会計ソフト・税理士向け。実際のeTax送信は国税庁のe-Taxソフトに取り込んでください。
      </p>
    </section>
  `}function Bt(t){const n=(t==null?"":t instanceof Date?t.toISOString():String(t)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function cs(t,e,n){if(e.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(e[0]??{}).map(r=>({key:r,label:r})),i=`\uFEFF${[s.map(r=>Bt(r.label)).join(","),...e.map(r=>s.map(u=>Bt(r[u.key])).join(","))].join(`\r
`)}`,c=new Blob([i],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(c),l=document.createElement("a");l.href=d,l.download=t,document.body.append(l),l.click(),l.remove(),window.setTimeout(()=>URL.revokeObjectURL(d),0)}const rs=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email"],X=[{name:"青葉商事",email:"aoba@example.jp",area:"関東",historySegment:"seasonal"},{name:"北斗酒販",email:"hokuto@example.jp",area:"北海道",historySegment:"premium"},{name:"中央フーズ",email:"chuo@example.jp",area:"関東",historySegment:"seasonal"},{name:"東海酒店",email:"tokai@example.jp",area:"中部",historySegment:"premium"},{name:"三和物産",email:"sanwa@example.jp",area:"関西",historySegment:"liqueur"},{name:"南星リカー",email:"nansei@example.jp",area:"九州",historySegment:"seasonal"},{name:"山川酒店",email:"yamakawa@example.jp",area:"関西",historySegment:"premium"},{name:"瑞穂商店",email:"mizuho@example.jp",area:"中部",historySegment:"seasonal"}],Ht=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"}];function Ce(t){const e=gt[t];return e?{subject:e.subject,body:e.body}:{subject:"",body:""}}function Dt(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function ds(){const t=Ce("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:t.subject,body:t.body,saveMessage:null}}const it=new Date,us=it.toISOString().slice(0,7),ps=it.getFullYear(),ms=it.getMonth()+1,hs=it.toISOString().slice(0,10),ys="C0011",x=ds();function De(t){const e="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",n=t.startsWith(e)?t.slice(e.length)||"/":t;return rs.includes(n)?n:"/"}function Nt(t){switch(t){case"/cat/sales":case"/invoice":case"/ledger":case"/invoice-entry":case"/delivery":case"/billing":case"/report":return"sales";case"/cat/brewery":case"/jikomi":case"/tanks":case"/kentei":case"/materials":return"brewery";case"/cat/purchase":case"/purchase":case"/raw-material":return"purchase";case"/cat/more":case"/master":case"/analytics":case"/tax":case"/store":case"/setup":return"more";case"/email":return"email";default:return"dashboard"}}const Ut=De(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,invoiceRecords:[],customerLedger:null,salesAnalytics:null,invoiceForm:Dt(),invoiceSaving:!1,invoiceSavedDocNo:null,pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:us,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:ps,taxMonth:ms,storeSales:[],storeOrders:[],storeTab:"pos",storeSalesDate:hs,route:Ut,currentCategory:Nt(Ut),sidebarOpen:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:ys,masterTab:"customers",analyticsTab:"products",emailAudienceMode:x.mode,emailRegion:x.region,emailHistorySegment:x.historySegment,emailTemplateId:x.templateId,emailSubject:x.subject,emailBody:x.body,emailSaveMessage:x.saveMessage,emailSending:!1,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function Kt(t){return t.slice(0,10)}function vs(t){return{...t}}function ot(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Ne(){a.invoiceForm=Dt(),a.invoiceSavedDocNo=null,a.invoiceErrors={},ot()}function Ae(t){const e={};return t.invoiceDate.trim()||(e.invoiceDate="伝票日付は必須です。"),t.customerCode.trim()||(e.customerCode="得意先コードは必須です。"),t.lines.length===0&&(e.lines="明細を1行以上入力してください。"),t.lines.forEach((n,s)=>{n.productCode.trim()||(e[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(e[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(e[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(e[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),e}function bs(t){const e=a.invoiceForm.lines[t];e&&a.invoiceForm.lines.splice(t+1,0,vs(e))}function gs(){const t=a.invoiceRecords[0],e=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:t?.customerCode??e?.code??"",customerName:t?.customerName??e?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,o)=>{const i=o===0?1:2,c=1200*(o+1);return{productCode:s.code,productName:s.name,quantity:i,unitPrice:c,unit:"本",amount:i*c}}),note:t?`過去伝票 ${t.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function fs(t){const e=a.masterStats?.customers.find(n=>n.code.toLowerCase()===t.trim().toLowerCase());return e?(a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,!0):!1}function $s(t){const e=a.masterStats?.customers.find(n=>n.name===t.trim());return e?(a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,!0):!1}function xe(t){if(w(t),a.invoiceErrors=Ae(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){m();return}a.invoiceSaving=!0,m(),ie(a.invoiceForm).then(e=>{a.invoiceSavedDocNo=e.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=Dt(),m()}).catch(()=>{a.invoiceSaving=!1,m()})}function Le(t){const e=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...t.salesRecords].sort((s,o)=>new Date(o.date).getTime()-new Date(s.date).getTime()).filter(s=>{const o=new Date(s.date);return!(e&&o<e||n&&o>n)})}function je(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?X:X.filter(t=>t.area===a.emailRegion);case"history":return X.filter(t=>t.historySegment===a.emailHistorySegment);default:return X}}function ks(){const t=je();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:t.length,previewRecipients:t.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending}}function ut(t){const e=je(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:e.length,recipients:e.map(s=>s.email),status:t}}function At(){return a.user,!1}function B(){a.globalSearchOpen=!1,a.globalQuery=""}function Ss(){const t=a.globalQuery.trim().toLowerCase();return t?{customers:a.masterStats?.customers.filter(e=>e.code.toLowerCase().includes(t)||e.name.toLowerCase().includes(t))??[],products:a.masterStats?.products.filter(e=>e.code.toLowerCase().includes(t)||e.name.toLowerCase().includes(t))??[],documents:a.invoiceRecords.filter(e=>e.documentNo.toLowerCase().includes(t)||e.customerName.toLowerCase().includes(t)||e.date.toLowerCase().includes(t)),pages:Ht.filter(e=>e.path.toLowerCase().includes(t)||e.title.toLowerCase().includes(t))}:{customers:[],products:[],documents:[],pages:Ht}}function ws(){let t=[],e,n="export.csv";switch(a.route){case"/sales":t=(a.salesSummary?Le(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),e=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":t=[...a.paymentStatus?.records??[]].sort((s,o)=>o.balanceAmount-s.balanceAmount).map(s=>({...s})),e=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":t=a.invoiceRecords.map(s=>({...s})),e=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":t=a.purchaseList.map(s=>({...s})),e=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":t=a.jikomiList.map(s=>({...s})),e=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":t=a.tankList.map(s=>({...s})),e=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":t=a.kenteiList.map(s=>({...s})),e=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":t=a.materialList.map(s=>({...s})),e=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(t=a.masterStats?.customers.map(s=>({...s}))??[],e=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(t=a.masterStats?.products.map(s=>({...s}))??[],e=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}cs(n,t,e)}function Yt(t){const e=`${"/sake-system/".replace(/\/$/,"")}${t==="/"?"/":t}`;history.pushState(null,"",e),a.route=t,a.currentCategory=Nt(t),a.sidebarOpen=!1,B(),xt(t)}async function xt(t){a.actionLoading=!0,m();try{switch(t){case"/delivery":a.deliveryNote||(a.deliveryNote=await kt(a.deliverySearchDocNo||"D240122"));break;case"/billing":a.billingSummary||(a.billingSummary=await St(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await le());break;case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await re());break;case"/tanks":a.tankList.length===0&&(a.tankList=await de());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await ue());break;case"/materials":a.materialList.length===0&&(a.materialList=await pe());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([me(),he()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([ye(),ve()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await wt(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Ct(a.storeSalesDate),ge()]));break;default:break}}catch(e){console.warn("Route data load error",e)}finally{a.actionLoading=!1,m()}}function Wt(){if(At())return Ra(a.authError,a.authSubmitting);if(a.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(a.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${a.error}</p>
      </section>
    `;switch(a.route){case"/cat/sales":return U("sales");case"/cat/brewery":return U("brewery");case"/cat/purchase":return U("purchase");case"/cat/more":return U("more");case"/invoice-entry":return Da(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/email":return ka(ks());case"/delivery":return a.deliveryNote?fa(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/billing":return a.billingSummary?ra(a.billingSummary,a.billingYearMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/report":return a.salesReport?es(a.salesReport):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/jikomi":return a.jikomiView==="calendar"?`${Ot(a.jikomiList,a.jikomiView)}${Ta(a.jikomiList)}`:Ot(a.jikomiList,a.jikomiView);case"/tanks":return is(a.tankList);case"/kentei":return Ea(a.kenteiList);case"/materials":return Oa(a.materialList);case"/purchase":return Ua(a.purchaseList,a.payableList);case"/raw-material":return Ka(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?ls(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/store":return os(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?Qa(a.pipelineMeta,H,ht):'<section class="panel"><p>データを読み込んでいます…</p></section>'}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return ns(Le(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return Ba([...a.paymentStatus.records].sort((t,e)=>e.balanceAmount-t.balanceAmount));case"/master":return Ia(a.masterStats,a.masterTab);case"/invoice":return xa(a.invoiceRecords,a.invoiceFilter);case"/ledger":return ha(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return ts(a.salesAnalytics,a.analyticsTab);default:return ba(a.salesSummary,a.pipelineMeta,a.salesAnalytics)}}function Cs(){if(At())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${Wt()}</div>
        </main>
      </div>
    `;const t={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売管理",items:[{path:"/cat/sales",label:"販売管理トップ",kicker:"Category"},{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],brewery:[{label:"蔵内管理",items:[{path:"/cat/brewery",label:"蔵内管理トップ",kicker:"Category"},{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]}],purchase:[{label:"仕入管理",items:[{path:"/cat/purchase",label:"仕入管理トップ",kicker:"Category"},{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],more:[{label:"その他",items:[{path:"/cat/more",label:"その他トップ",kicker:"Category"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/email",label:"メール配信",kicker:"Mail"},{path:"/setup",label:"連動設定",kicker:"Setup"}]}],email:[{label:"メール配信",items:[{path:"/email",label:"季節商品案内",kicker:"Mail"}]}]},e=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/cat/sales",label:"販売管理"},{category:"brewery",path:"/cat/brewery",label:"蔵内管理"},{category:"purchase",path:"/cat/purchase",label:"仕入管理"},{category:"more",path:"/cat/more",label:"その他"},{category:"email",path:"/email",label:"メール配信"}],n=t[a.currentCategory].map(d=>`
        <div class="nav-group">
          <p class="nav-group-label">${d.label}</p>
          ${d.items.map(l=>`
                <a
                  href="${"/sake-system/".replace(/\/$/,"")}${l.path==="/"?"/":l.path}"
                  class="nav-link ${a.route===l.path?"active":""}"
                  data-link="${l.path}"
                >
                  <div>
                    <div class="nav-kicker">${l.kicker}</div>
                    <div class="nav-label">${l.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),s=e.map(d=>`
        <a
          href="${"/sake-system/".replace(/\/$/,"")}${d.path==="/"?"/":d.path}"
          class="category-link ${a.currentCategory===d.category?"active":""}"
          data-link="${d.path}"
        >
          ${d.label}
        </a>
      `).join(""),o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?wa(a.masterStats.customers,a.pickerQuery):Ha(a.masterStats.products,a.pickerQuery):"",i=a.globalSearchOpen?Sa(a.globalQuery,Ss()):"",c=a.user?`
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
        <div class="view ${a.actionLoading?"is-busy":""}">${Wt()}</div>
      </main>
      ${o}
      ${i}
    </div>
  `}async function Ds(t){a.actionLoading=!0,m();try{a.invoiceRecords=await nt(t)}finally{a.actionLoading=!1,m()}}async function Ns(t){a.actionLoading=!0,m();try{a.customerLedger=await $t(t)}finally{a.actionLoading=!1,m()}}function w(t){a.invoiceForm={invoiceType:t.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:t.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:t.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:t.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:t.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((e,n)=>{const s=parseFloat(t.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,o=parseFloat(t.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...e,productCode:t.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??e.productCode,productName:t.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??e.productName,unit:t.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??e.unit,quantity:s,unitPrice:o,amount:s*o}}),note:t.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function L(t){const e=t.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=e,a.emailRegion=t.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=t.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=t.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=t.querySelector("#email-body")?.value??a.emailBody}function As(t){t.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,m()}),t.querySelectorAll("[data-action='global-search-close']").forEach(e=>{e.addEventListener("click",n=>{e.classList.contains("global-search")&&n.target instanceof HTMLElement&&!n.target.classList.contains("global-search")||(B(),m())})}),t.querySelector("#global-search-input")?.addEventListener("input",e=>{a.globalQuery=e.target.value,m()}),t.querySelectorAll("[data-action='global-nav']").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.path;n&&(B(),Yt(n))})}),t.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{ws()}),t.querySelectorAll("[data-jikomi-tab]").forEach(e=>{e.addEventListener("click",()=>{a.jikomiView=e.dataset.jikomiTab,m()})}),t.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const e=t.querySelector("#auth-email")?.value.trim()??"",n=t.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,m(),Me(e,n).then(s=>{a.user=s,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null,m()}).catch(async s=>{try{const o=await Re(e,n);a.user=o,a.authSkipped=!1,a.authError=null}catch{a.authError=s instanceof Error?s.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,m()}})}),t.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,m()}),t.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{qe().finally(()=>{location.reload()})}),t.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,m()}),t.querySelectorAll("[data-action='sidebar-close']").forEach(e=>{e.addEventListener("click",()=>{a.sidebarOpen=!1,m()})}),t.querySelectorAll("[data-link]").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),Yt(e.dataset.link)})}),t.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const e=t.querySelector("#sales-start")?.value??"",n=t.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:e,endDate:n},m()}),t.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const e={documentNo:t.querySelector("#invoice-document-no")?.value??"",startDate:t.querySelector("#invoice-start")?.value??"",endDate:t.querySelector("#invoice-end")?.value??"",customerCode:t.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=e,Ds(e)}),t.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const e=t.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=e.trim().toUpperCase(),Ns(a.ledgerCustomerCode)}),t.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{a.masterTab=e.dataset.tab,m()})}),t.querySelectorAll("[data-analytics-tab]").forEach(e=>{e.addEventListener("click",()=>{a.analyticsTab=e.dataset.analyticsTab,m()})}),t.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{w(t),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},m()}),t.querySelectorAll("[data-action='remove-line']").forEach(e=>{e.addEventListener("click",()=>{w(t);const n=parseInt(e.dataset.line??"0",10);a.invoiceForm.lines.splice(n,1),a.invoiceErrors=Ae(a.invoiceForm),m()})}),t.querySelectorAll("[data-action='duplicate-line']").forEach(e=>{e.addEventListener("click",()=>{w(t),bs(parseInt(e.dataset.line??"0",10)),a.invoiceErrors={},m()})}),t.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{gs(),m()}),t.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{w(t),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,m()}),t.querySelectorAll("[data-action='open-product-picker']").forEach(e=>{e.addEventListener("click",()=>{w(t);const n=parseInt(e.dataset.line??"0",10),s=a.invoiceForm.lines[n];a.pickerMode="product",a.pickerTargetLine=n,a.pickerQuery=s?s.productCode||s.productName:"",m()})}),t.querySelectorAll("[data-action='modal-close']").forEach(e=>{e.addEventListener("click",n=>{e.classList.contains("modal-backdrop")&&n.target instanceof HTMLElement&&!n.target.classList.contains("modal-backdrop")||(ot(),m())})}),t.querySelectorAll("[data-action='picker-select']").forEach(e=>{const n=()=>{const s=e.dataset.code??"",o=e.dataset.name??"";if(a.pickerMode==="customer")a.invoiceForm.customerCode=s,a.invoiceForm.customerName=o,delete a.invoiceErrors.customerCode;else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const i=a.invoiceForm.lines[a.pickerTargetLine];i&&(i.productCode=s,i.productName=o,i.amount=i.quantity*i.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`])}ot(),m()};e.addEventListener("click",n),e.addEventListener("keydown",s=>{s.key==="Enter"&&n()})}),t.querySelector("#modal-search")?.addEventListener("input",e=>{a.pickerQuery=e.target.value,m()}),t.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Ne(),m()}),t.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{xe(t)}),t.querySelector("#inv-customer-code")?.addEventListener("blur",()=>{w(t),fs(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,m())}),t.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{w(t),$s(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,m())}),t.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(e=>{e.addEventListener("input",()=>{w(t),a.invoiceSavedDocNo=null})}),t.querySelector("#inv-type")?.addEventListener("change",()=>{w(t),a.invoiceSavedDocNo=null}),t.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const e=t.querySelector("#delivery-docno")?.value??"";a.deliverySearchDocNo=e.trim(),a.deliveryNote=null,a.actionLoading=!0,m(),kt(a.deliverySearchDocNo||"D240122").then(n=>{a.deliveryNote=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const e=t.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=e,a.billingSummary=null,a.actionLoading=!0,m(),St(e).then(n=>{a.billingSummary=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const e=parseInt(t.querySelector("#tax-year")?.value??String(a.taxYear),10),n=parseInt(t.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=e,a.taxMonth=n,a.taxDeclaration=null,a.actionLoading=!0,m(),wt(e,n).then(s=>{a.taxDeclaration=s,a.actionLoading=!1,m()})}),t.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:e}=await tt(async()=>{const{generateTaxXML:c}=await Promise.resolve().then(()=>lt);return{generateTaxXML:c}},void 0),n=e(a.taxDeclaration),s=new Blob([n],{type:"application/xml;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,i.click(),URL.revokeObjectURL(o)}),t.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:e}=await tt(async()=>{const{generateTaxCSV:c}=await Promise.resolve().then(()=>lt);return{generateTaxCSV:c}},void 0),n=e(a.taxDeclaration),s=new Blob([n],{type:"text/csv;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,i.click(),URL.revokeObjectURL(o)}),t.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:e}=await tt(async()=>{const{saveTaxDeclaration:n}=await Promise.resolve().then(()=>lt);return{saveTaxDeclaration:n}},void 0);try{await e(a.taxDeclaration),alert("下書き保存しました（Supabase tax_declarationsに保存）")}catch(n){alert("保存に失敗: "+(n instanceof Error?n.message:String(n)))}}),t.querySelectorAll("[data-store-tab]").forEach(e=>{e.addEventListener("click",()=>{a.storeTab=e.dataset.storeTab,m()})}),t.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const e=t.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=e,a.storeSales=[],a.actionLoading=!0,m(),Ct(e).then(n=>{a.storeSales=n,a.actionLoading=!1,m()})}),t.querySelectorAll("[data-action='copy-config']").forEach(e=>{e.addEventListener("click",async()=>{const n=e.dataset.configValue??"";if(n)try{await navigator.clipboard.writeText(n),e.textContent="コピー済み",window.setTimeout(()=>{e.textContent="コピー"},1600)}catch(s){console.warn("Clipboard copy failed",s)}})}),t.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const n=JSON.stringify({supabase_url:H,supabase_anon_key:"（Supabaseダッシュボードから取得して貼り付け）",z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),s=new Blob([n],{type:"application/json;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download="relay_config.json",i.click(),URL.revokeObjectURL(o)}),t.querySelectorAll("[data-action='copy-code']").forEach(e=>{e.addEventListener("click",async()=>{const n=e.dataset.code??"";if(n)try{await navigator.clipboard.writeText(decodeURIComponent(n)),e.textContent="コピー済み",window.setTimeout(()=>{e.textContent="コピー"},1600)}catch(s){console.warn("Clipboard code copy failed",s)}})}),t.querySelectorAll("input[name='email-audience-mode']").forEach(e=>{e.addEventListener("change",()=>{L(t),a.emailSaveMessage=null,m()})}),t.querySelectorAll("#email-region, #email-history-segment").forEach(e=>{e.addEventListener("change",()=>{L(t),a.emailSaveMessage=null,m()})}),t.querySelector("#email-subject")?.addEventListener("input",()=>{L(t),a.emailSaveMessage=null}),t.querySelector("#email-body")?.addEventListener("input",()=>{L(t),a.emailSaveMessage=null}),t.querySelectorAll("[data-action='template-select']").forEach(e=>{e.addEventListener("click",()=>{a.emailTemplateId=e.dataset.templateId??"custom";const n=Ce(a.emailTemplateId);a.emailSubject=n.subject,a.emailBody=n.body,a.emailSaveMessage=null,m()})}),t.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{L(t);const e=`

商品詳細はこちら: https://example.jp/products/seasonal`;a.emailBody.includes("https://example.jp/products/seasonal")||(a.emailBody=`${a.emailBody.trimEnd()}${e}`),a.emailSaveMessage=null,m()}),t.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{L(t),a.actionLoading=!0,m(),et(ut("draft")).then(e=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,m()})}),t.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{L(t),a.actionLoading=!0,a.emailSending=!0,m();const e=ut("sent");fe().then(async n=>{await et({...e,recipientCount:n.sent}),a.emailSaveMessage=`${n.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,m(),window.alert(`${n.sent}件送信完了`)}).catch(async()=>{await et(ut("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,m(),window.alert("APIキー未設定のため下書き保存しました")})})}function m(){const t=document.querySelector("#app");t&&(t.innerHTML=Cs(),As(t),a.pickerMode&&t.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&t.querySelector("#global-search-input")?.focus(),At()&&t.querySelector("#auth-email")?.focus())}async function xs(){a.loading=!0,m();try{const[t,e,n,s,o,i,c]=await Promise.all([ee(),ae(),se(),ne(),nt(a.invoiceFilter),$t(a.ledgerCustomerCode),oe()]);if(a.salesSummary=t,a.paymentStatus=e,a.masterStats=n,a.pipelineMeta=s,a.invoiceRecords=o,a.customerLedger=i,a.salesAnalytics=c,!a.salesFilter.startDate||!a.salesFilter.endDate){const l=[...t.salesRecords].sort((p,h)=>new Date(h.date).getTime()-new Date(p.date).getTime())[0]?.date??new Date().toISOString(),r=new Date(l),u=new Date(r);u.setDate(r.getDate()-30),a.salesFilter={startDate:Kt(u.toISOString()),endDate:Kt(r.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await nt(a.invoiceFilter)),a.error=null}catch(t){a.error=t instanceof Error?t.message:"データの取得に失敗しました。"}finally{a.loading=!1,m(),xt(a.route)}}window.addEventListener("popstate",()=>{a.route=De(location.pathname),a.currentCategory=Nt(a.route),a.sidebarOpen=!1,B(),xt(a.route)});window.addEventListener("keydown",t=>{if((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="k"){t.preventDefault(),a.globalSearchOpen=!0,m();return}if(t.key==="Escape"){if(a.globalSearchOpen){B(),m();return}if(a.pickerMode){ot(),m();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Ne(),m());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="s"){t.preventDefault();const e=document.querySelector("#app");e&&xe(e)}});a.user=bt()?Fe():null;xs();
