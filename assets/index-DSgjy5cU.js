(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))n(c);new MutationObserver(c=>{for(const a of c)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(c){const a={};return c.integrity&&(a.integrity=c.integrity),c.referrerPolicy&&(a.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?a.credentials="include":c.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(c){if(c.ep)return;c.ep=!0;const a=i(c);fetch(c.href,a)}})();const pa="modulepreload",ma=function(e){return"/sake-system/"+e},at={},g=function(t,i,n){let c=Promise.resolve();if(i&&i.length>0){let d=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var o=d;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),r=l?.nonce||l?.getAttribute("nonce");c=d(i.map(u=>{if(u=ma(u),u in at)return;at[u]=!0;const p=u.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":pa,p||(v.as="script"),v.crossOrigin="",v.href=u,r&&v.setAttribute("nonce",r),document.head.appendChild(v),p)return new Promise((_,P)=>{v.addEventListener("load",_),v.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(l){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=l,window.dispatchEvent(r),!r.defaultPrevented)throw l}return c.then(l=>{for(const r of l||[])r.status==="rejected"&&a(r.reason);return t().catch(a)})},K="https://loarwnuyvfxiscjjsmiz.supabase.co",F="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function qe(e,t){try{const i=new URL(`/rest/v1/${e}`,K),n=await fetch(i.toString(),{method:"POST",headers:{apikey:F,Authorization:`Bearer ${F}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!n.ok)throw new Error(`HTTP ${n.status}`);return(await n.json())[0]??null}catch(i){return console.warn(`Failed to insert into Supabase table ${e}`,i),null}}async function x(e,t={}){try{const i=new URL(`/rest/v1/${e}`,K);Object.entries(t).forEach(([c,a])=>{i.searchParams.set(c,a)});const n=await fetch(i.toString(),{method:"GET",headers:{apikey:F,Authorization:`Bearer ${F}`,Accept:"application/json",Prefer:"return=representation"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(i){return console.warn(`Failed to query Supabase table ${e}`,i),[]}}const M=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:F,SUPABASE_URL:K,supabaseInsert:qe,supabaseQuery:x},Symbol.toStringTag,{value:"Module"})),Me="sake_auth";function Dt(e){localStorage.setItem(Me,JSON.stringify(e))}function Ct(){return{apikey:F,"Content-Type":"application/json"}}function ya(e){try{const[,t]=e.split(".");if(!t)return null;const i=t.replaceAll("-","+").replaceAll("_","/"),n=i.padEnd(Math.ceil(i.length/4)*4,"=");return JSON.parse(atob(n))}catch{return null}}async function At(e,t){const i=await fetch(`${K}/auth/v1/${e}`,{method:"POST",headers:Ct(),body:JSON.stringify(t)}),n=await i.json().catch(()=>({}));if(!i.ok)throw new Error(n.error_description??n.msg??`HTTP ${i.status}`);return n}async function ha(e,t){const i=await At("token?grant_type=password",{email:e,password:t});return Dt({access_token:i.access_token,refresh_token:i.refresh_token}),{email:i.user?.email??e}}async function va(e,t){const i=await At("signup",{email:e,password:t});return i.access_token&&i.refresh_token&&Dt({access_token:i.access_token,refresh_token:i.refresh_token}),{email:i.user?.email??e}}async function fa(){const e=Fe();if(localStorage.removeItem(Me),!!e?.access_token)try{await fetch(`${K}/auth/v1/logout`,{method:"POST",headers:{...Ct(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Fe(){const e=localStorage.getItem(Me);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function ba(){const e=Fe();if(!e)return null;const t=ya(e.access_token),i=typeof t?.email=="string"?t.email:null;return i?{email:i}:null}const Je={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},ke={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(e,t)=>{const i=new Date("2026-03-17T00:00:00+09:00");return i.setDate(i.getDate()+t),{date:i.toISOString(),amount:42e4+t*73123%62e4}}),salesRecords:Array.from({length:20},(e,t)=>{const i=new Date("2026-04-15T00:00:00+09:00");return i.setDate(i.getDate()-t),{id:`sale-${t+1}`,documentNo:`D${String(240100+t).padStart(6,"0")}`,date:i.toISOString(),customerCode:`C${String(t+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][t%4],amount:68e3+t%6*24500}})},ga={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},V={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(e,t)=>({id:`customer-${t+1}`,code:`C${String(t+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][t%6],closingDay:[15,20,25,31][t%4],paymentDay:[5,10,15,20][t%4],isActive:t%5!==0})),products:Array.from({length:12},(e,t)=>({id:`product-${t+1}`,code:`P${String(t+1).padStart(5,"0")}`,janCode:`4901234567${String(t).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][t%4],category:["清酒","焼酎","リキュール"][t%3],isActive:t%6!==0}))},$a={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"},Lt=ke.salesRecords.map((e,t)=>({...e,itemCount:t%4+1})),Sa={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},we={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function A(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function ka(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function wa(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function h(e,t,i=""){for(const n of t){const c=e[n];if(typeof c=="string"&&c.length>0)return c}return i}function st(e,t,i=0){for(const n of t)if(n in e)return A(e[n]);return i}function q(e,t,i=!0){for(const n of t)if(n in e)return wa(e[n]);return i}function Et(e,t,i){for(const n of t){const c=e[n];if(typeof c!="string"||c.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(c))return new Date(`${c}T00:00:00Z`).toISOString();const a=new Date(c);if(!Number.isNaN(a.getTime()))return a.toISOString()}return i}function Nt(e){return e.slice(0,7)}function ze(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:Et(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:A(e.total_amount??e.billed_amount)}}function nt(e,t){const i=t.startDate?new Date(`${t.startDate}T00:00:00`):null,n=t.endDate?new Date(`${t.endDate}T23:59:59`):null,c=t.documentNo.trim().toLowerCase(),a=t.customerCode.trim().toLowerCase();return e.filter(o=>{const l=new Date(o.date);return!(i&&l<i||n&&l>n||c&&!o.documentNo.toLowerCase().includes(c)||a&&!o.customerCode.toLowerCase().includes(a))}).sort((o,l)=>new Date(l.date).getTime()-new Date(o.date).getTime())}function it(e){const t=e.trim().toUpperCase(),i=Sa[t];if(i)return i;const n=ke.salesRecords.find(c=>c.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:n?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function xa(){const e=new Map,t=new Map,i=new Map;return Lt.forEach((n,c)=>{const a=Nt(n.date);e.set(a,(e.get(a)??0)+n.amount);const o=t.get(n.customerCode)??{code:n.customerCode,name:n.customerName,amount:0,quantity:0,documents:0};o.amount+=n.amount,o.quantity+=n.itemCount,o.documents+=1,t.set(n.customerCode,o);const l=`P${String(c%4+1).padStart(5,"0")}`,r=we.productTotals[c%we.productTotals.length],d=i.get(l)??{code:l,name:r?.name??`商品${c+1}`,amount:0,quantity:0,documents:0};d.amount+=n.amount,d.quantity+=n.itemCount*12,d.documents+=1,i.set(l,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(e.entries()).sort(([n],[c])=>n.localeCompare(c)).map(([n,c])=>({month:n,amount:c})),productTotals:Array.from(i.values()).sort((n,c)=>c.amount-n.amount),customerTotals:Array.from(t.values()).sort((n,c)=>c.amount-n.amount)}}async function L(e,t){try{const i=await fetch(`/sake-system/${e}`,{headers:{Accept:"application/json"}});if(!i.ok)throw new Error(`HTTP ${i.status}`);return await i.json()}catch(i){return console.warn(`Failed to fetch ${e}, using fallback data`,i),t}}async function Pt(){const e=await x("daily_sales_fact",{select:"sales_date,sales_amount,document_count",order:"sales_date.desc",limit:"60"});if(e.length>0){const t=await x("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),n=new Date().toISOString().slice(0,10),c=n.slice(0,7),a=[...e].sort((d,u)=>d.sales_date.localeCompare(u.sales_date)).slice(-30).map(d=>({date:new Date(`${d.sales_date}T00:00:00Z`).toISOString(),amount:A(d.sales_amount)})),o=e.reduce((d,u)=>u.sales_date===n?d+A(u.sales_amount):d,0),l=e.reduce((d,u)=>u.sales_date.startsWith(c)?d+A(u.sales_amount):d,0),r=t.filter(d=>A(d.balance_amount)>0);return{generatedAt:new Date().toISOString(),kpis:{todaySales:o,todayDelta:0,monthSales:l,monthDelta:0,unpaidCount:r.length,unpaidAmount:r.reduce((d,u)=>d+A(u.balance_amount),0)},dailySales:a,salesRecords:ke.salesRecords}}return L("data/api/latest/sales-summary.json",ke)}async function It(){const e=await x("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,i)=>{const n=t.legacy_customer_code??`UNKNOWN-${i+1}`;return{id:`payment-${n}-${i+1}`,customerCode:n,customerName:n,billedAmount:A(t.billed_amount),paymentAmount:A(t.paid_amount),balanceAmount:A(t.balance_amount),lastPaymentDate:null,status:ka(t.payment_status)}})}:L("data/api/latest/payment-status.json",ga)}async function Tt(){const[e,t]=await Promise.all([x("customers"),x("products")]);if(e.length>0||t.length>0){const i=e.length?e.map((c,a)=>({id:h(c,["id","customer_id","code"],`customer-${a+1}`),code:h(c,["code","customer_code","legacy_customer_code"],`C${String(a+1).padStart(4,"0")}`),name:h(c,["name","customer_name","display_name"],`Customer ${a+1}`),closingDay:st(c,["closing_day","close_day"],31),paymentDay:st(c,["payment_day","due_day"],15),isActive:q(c,["is_active","active","enabled"],!0)})):V.customers,n=t.length?t.map((c,a)=>({id:h(c,["id","product_id","code"],`product-${a+1}`),code:h(c,["code","product_code"],`P${String(a+1).padStart(5,"0")}`),janCode:h(c,["jan_code","jan","barcode"],""),name:h(c,["name","product_name","display_name"],`Product ${a+1}`),category:h(c,["category","category_name"],"未分類"),isActive:q(c,["is_active","active","enabled"],!0)})):V.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||V.summary.customerCount,activeCustomerCount:e.length?i.filter(c=>c.isActive).length:V.summary.activeCustomerCount,productCount:t.length||V.summary.productCount,activeProductCount:t.length?n.filter(c=>c.isActive).length:V.summary.activeProductCount},customers:i,products:n}}return L("data/api/latest/master-stats.json",V)}function jt(){return L("data/api/latest/pipeline-meta.json",$a)}async function xe(e){const[t,i]=await Promise.all([x("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"200"}),x("sales_document_lines",{select:"id,header_id,document_header_id,document_no,amount,line_amount"})]);if(t.length>0){const n=new Map;i.forEach(a=>{const o=String(a.header_id??a.document_header_id??a.document_no??a.id??"");o&&n.set(o,(n.get(o)??0)+1)});const c=t.map((a,o)=>{const l=ze(a,o),r=String(a.id??a.document_no??a.legacy_document_no??"");return{...l,itemCount:n.get(r)??l.itemCount}});return nt(c,e)}return nt(Lt,e)}async function Ve(e){const t=e.trim().toUpperCase();if(!t)return it("");const[i,n,c]=await Promise.all([x("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),x("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),x("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(i.length>0||n.length>0){const a=i.map((r,d)=>{const u=ze(r,d);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),o=n.map((r,d)=>({id:String(r.id??`payment-${d+1}`),date:Et(r,["payment_date","received_date"],new Date().toISOString()),amount:A(r.payment_amount??r.amount),method:r.payment_method??r.method??"入金"})),l=c.find(r=>(r.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:i[0]?.customer_name??i[0]?.customer_code??i[0]?.legacy_customer_code??t,balanceAmount:A(l?.balance_amount),salesTotal:a.reduce((r,d)=>r+d.amount,0),paymentTotal:o.reduce((r,d)=>r+d.amount,0),salesHistory:a,paymentHistory:o}}return it(t)}async function Ot(){const[e,t,i]=await Promise.all([x("daily_sales_fact",{select:"sales_date,sales_amount",order:"sales_date.asc",limit:"365"}),x("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",limit:"500"}),x("sales_document_lines",{select:"id,header_id,document_header_id,document_no,product_code,legacy_product_code,product_name,quantity,amount,line_amount",limit:"1000"})]);if(e.length>0){const n=new Map;e.forEach(o=>{const l=Nt(o.sales_date);n.set(l,(n.get(l)??0)+A(o.sales_amount))});const c=new Map;t.forEach((o,l)=>{const r=ze(o,l),d=c.get(r.customerCode)??{code:r.customerCode,name:r.customerName,amount:0,quantity:0,documents:0};d.amount+=r.amount,d.documents+=1,c.set(r.customerCode,d)});const a=new Map;return i.forEach((o,l)=>{const r=o.product_code??o.legacy_product_code??`P${String(l+1).padStart(5,"0")}`,d=a.get(r)??{code:r,name:o.product_name??r,amount:0,quantity:0,documents:0};d.amount+=A(o.line_amount??o.amount),d.quantity+=A(o.quantity),d.documents+=1,a.set(r,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(n.entries()).sort(([o],[l])=>o.localeCompare(l)).map(([o,l])=>({month:o,amount:l})).slice(-12),productTotals:a.size>0?Array.from(a.values()).sort((o,l)=>l.amount-o.amount):we.productTotals,customerTotals:c.size>0?Array.from(c.values()).sort((o,l)=>l.amount-o.amount):we.customerTotals}}return xa()}const je={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Rt(e){const t=e.lines.reduce((c,a)=>c+a.amount,0),i=`D${Date.now().toString().slice(-6)}`;return{id:(await qe("sales_document_headers",{legacy_document_no:i,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${i}`,documentNo:i,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const ot={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function Be(e){const t=await x("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const i=t[0],n=A(i.total_amount);return{documentNo:e,invoiceDate:h(i,["sales_date","document_date"],""),customerCode:h(i,["legacy_customer_code","customer_code"],""),customerName:h(i,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:n,taxAmount:Math.floor(n*10/110),note:""}}return{...ot,documentNo:e||ot.documentNo}}const _a={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function Ue(e){return L(`data/api/latest/billing-${e}.json`,{..._a,targetYearMonth:e})}const Da=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Ca={generatedAt:new Date().toISOString(),months:Da,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(e=>e*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(e=>e*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(e=>e*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(e=>e*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(e=>e*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function qt(){return L("data/api/latest/sales-report.json",Ca)}const Mt={planned:"計画中",active:"仕込中",done:"完了"},Aa=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function Ft(){return L("data/api/latest/jikomi.json",Aa)}const La=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function Jt(){return L("data/api/latest/tanks.json",La)}const Ea=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function zt(){return L("data/api/latest/kentei.json",Ea)}const Na=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function Vt(){return L("data/api/latest/materials.json",Na)}const Pa=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],Ia=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],Ta=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],ja=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function Bt(){return L("data/api/latest/purchases.json",Pa)}async function Ut(){return L("data/api/latest/payables.json",Ia)}async function Yt(){return L("data/api/latest/bills.json",Ta)}async function Ht(){return L("data/api/latest/raw-stock.json",ja)}const Xt=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Oe={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Oa={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",companyAddress:"神奈川県秦野市堀山下182",companyRepresentative:"金井 和雄",taxOffice:"小田原税務署",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,productionVolume:3800,previousBalance:0,currentAdjustment:0,exportDeduction:100,sampleDeduction:100,taxableVolume:3600,volume:3600,taxRate:100,taxAmount:36e4},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,productionVolume:2900,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:2850,volume:2850,taxRate:100,taxAmount:285e3},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,productionVolume:1250,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:1200,volume:1200,taxRate:100,taxAmount:12e4}],deductions:[{type:"export",categoryCode:"01",volume:100,reason:"シンガポール向け輸出",documentNo:"EX2026-003"},{type:"sample",categoryCode:"01",volume:100,reason:"展示会サンプル出荷"},{type:"sample",categoryCode:"02",volume:50,reason:"品評会出品"},{type:"sample",categoryCode:"03",volume:50,reason:"全国新酒鑑評会出品"}],totalVolume:7650,totalTax:765e3,status:"draft",submittedAt:null};async function Ye(e,t){return L(`data/api/latest/tax-${e}-${String(t).padStart(2,"0")}.json`,{...Oa,targetYear:e,targetMonth:t})}function T(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Kt(e){const t=e.rows.map(n=>`    <Category>
      <Code>${T(n.taxCategory)}</Code>
      <Name>${T(n.taxCategoryName)}</Name>
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
`),i=e.deductions.map(n=>`    <Deduction type="${T(n.type)}">
      <CategoryCode>${T(n.categoryCode)}</CategoryCode>
      <Volume>${n.volume}</Volume>
      <Reason>${T(n.reason)}</Reason>${n.documentNo?`
      <DocumentNo>${T(n.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${T(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${T(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${T(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${T(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${T(e.taxOffice)}</TaxOffice>
    <Status>${e.status}</Status>
  </Header>
  <Categories>
${t}
  </Categories>
  <Deductions>
${i}
  </Deductions>
  <Total>
    <TotalVolume>${e.totalVolume}</TotalVolume>
    <TotalTax>${e.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function Ra(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function qa(e){const i=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),n=e.rows.map(a=>[a.taxCategory,a.taxCategoryName,a.alcoholDegree,a.productionVolume,a.previousBalance,a.currentAdjustment,a.exportDeduction,a.sampleDeduction,a.taxableVolume,a.taxRate,a.taxAmount].map(Ra).join(",")),c=`,合計,,${e.rows.reduce((a,o)=>a+o.productionVolume,0)},,,${e.rows.reduce((a,o)=>a+o.exportDeduction,0)},${e.rows.reduce((a,o)=>a+o.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[i,...n,c].join(`
`)+`
`}function Ma(e){const t=e.rows.map(c=>{const a=Math.max(0,c.productionVolume+c.previousBalance+c.currentAdjustment-c.exportDeduction-c.sampleDeduction),o=Math.round(a*c.taxRate);return{...c,taxableVolume:a,volume:a,taxAmount:o}}),i=t.reduce((c,a)=>c+a.taxableVolume,0),n=t.reduce((c,a)=>c+a.taxAmount,0);return{...e,rows:t,totalVolume:i,totalTax:n}}async function Fa(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>M);return{supabaseInsert:i}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Kt(e),submitted_at:e.submittedAt})}const Ja=Array.from({length:10},(e,t)=>({id:`ss${t+1}`,saleDate:"2026-04-15",saleTime:`${9+t}:${String(t*7%60).padStart(2,"0")}`,productCode:`P${String(t%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][t%4],quantity:1+t%3,unitPrice:[2200,1800,980,680][t%4],amount:(1+t%3)*[2200,1800,980,680][t%4],paymentMethod:["cash","card","paypay","cash"][t%4]})),za=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function He(e){return L(`data/api/latest/store-sales-${e}.json`,Ja)}async function Qt(){return L("data/api/latest/store-orders.json",za)}async function Se(e){const t=await qe("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Gt(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Va(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await x("print_layouts",t)).map(n=>({id:h(n,["id"],""),name:h(n,["name"],""),templateKey:h(n,["template_key"],""),positions:n.positions??{},isDefault:q(n,["is_default"],!1),note:h(n,["note"],""),updatedAt:h(n,["updated_at"],"")}))}async function Ba(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:c}=await Promise.resolve().then(()=>M);return{supabaseInsert:c}},void 0),i={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},n=await t("print_layouts",i);return n?{id:h(n,["id"],e.id),name:h(n,["name"],e.name),templateKey:h(n,["template_key"],e.templateKey),positions:n.positions??e.positions,isDefault:q(n,["is_default"],!1),note:h(n,["note"],""),updatedAt:h(n,["updated_at"],"")}:null}async function Ua(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:i,Authorization:`Bearer ${i}`}})).ok}catch{return!1}}async function Ya(){return(await x("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),email:h(t,["email"],""),displayName:h(t,["display_name"],""),signature:h(t,["signature"],""),replyTo:h(t,["reply_to"],""),isDefault:q(t,["is_default"],!1),isVerified:q(t,["is_verified"],!1),note:h(t,["note"],"")}))}async function Ha(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>M);return{supabaseInsert:n}},void 0),i=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return i?{id:h(i,["id"],e.id),name:h(i,["name"],e.name),email:h(i,["email"],e.email),displayName:h(i,["display_name"],""),signature:h(i,["signature"],""),replyTo:h(i,["reply_to"],""),isDefault:q(i,["is_default"],!1),isVerified:q(i,["is_verified"],!1)}:null}async function Xa(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const i=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return i.searchParams.set("id",`eq.${e}`),(await fetch(i.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Xe={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Ke={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Ka(e){const t=`${e}-01T00:00:00Z`,[i,n]=e.split("-").map(l=>parseInt(l,10)),c=new Date(i,n,0).getDate(),a=`${e}-${String(c).padStart(2,"0")}T23:59:59Z`;return(await x("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${a})`,order:"starts_at.asc"})).map(l=>({id:h(l,["id"],""),title:h(l,["title"],""),description:h(l,["description"],""),category:h(l,["category"],"general")||"general",startsAt:h(l,["starts_at"],new Date().toISOString()),endsAt:h(l,["ends_at"],""),isAllDay:q(l,["is_all_day"],!1),location:h(l,["location"],""),attendees:l.attendees??[],relatedCustomerCode:h(l,["related_customer_code"],""),relatedOrderId:h(l,["related_order_id"],""),color:h(l,["color"],""),googleEventId:h(l,["google_event_id"],"")}))}async function Qa(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>M);return{supabaseInsert:n}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Ke[e.category],updated_at:new Date().toISOString()})?e:null}async function Ga(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const i=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return i.searchParams.set("id",`eq.${e}`),(await fetch(i.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Wa(){return(await x("integration_settings",{order:"name.asc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),provider:h(t,["provider"],""),config:t.config??{},isEnabled:q(t,["is_enabled"],!1),lastSyncAt:h(t,["last_sync_at"],""),lastStatus:h(t,["last_status"],"")}))}async function Qe(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>M);return{supabaseInsert:n}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Za(e){const t=e.config.shop_domain,i=e.config.admin_token;if(!t||!i)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const n=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,c=await fetch(n,{headers:{"X-Shopify-Access-Token":i,"Content-Type":"application/json"}});if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const a=await c.json(),{supabaseInsert:o}=await g(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>M);return{supabaseInsert:r}},void 0);let l=0;for(const r of a.orders){const d=`shopify_${r.id}`;await o("shopify_orders",{id:d,shopify_order_id:String(r.id),order_number:String(r.order_number??""),order_date:String(r.created_at??new Date().toISOString()),customer_name:String(r.customer?.first_name??"")+" "+String(r.customer?.last_name??""),customer_email:String(r.customer?.email??""),total_amount:Math.round(parseFloat(String(r.total_price??"0"))),financial_status:String(r.financial_status??""),fulfillment_status:String(r.fulfillment_status??"unfulfilled"),line_items:r.line_items??[],shipping_address:r.shipping_address??null,raw_payload:r}),l++}return await Qe({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${l}件取得成功`}),{count:l}}catch(n){return{count:0,error:n instanceof Error?n.message:String(n)}}}async function es(){return(await x("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:h(t,["id"],""),shopifyOrderId:h(t,["shopify_order_id"],""),orderNumber:h(t,["order_number"],""),orderDate:h(t,["order_date"],""),customerName:h(t,["customer_name"],""),customerEmail:h(t,["customer_email"],""),totalAmount:A(t.total_amount),financialStatus:h(t,["financial_status"],""),fulfillmentStatus:h(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function ts(e){const t=e.config.oauth_token,i=e.config.calendar_id||"primary";if(!t)return{count:0,error:"oauth_token を設定してください (Google Cloud Console で取得)"};try{const n=new Date().toISOString(),c=new Date(Date.now()+30*86400*1e3).toISOString(),a=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(i)}/events?timeMin=${n}&timeMax=${c}&singleEvents=true&orderBy=startTime`,o=await fetch(a,{headers:{Authorization:`Bearer ${t}`}});if(!o.ok)return{count:0,error:`HTTP ${o.status}`};const l=await o.json(),{supabaseInsert:r}=await g(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>M);return{supabaseInsert:u}},void 0);let d=0;for(const u of l.items){const p=`gcal_${u.id}`,y=u.start?.dateTime??u.start?.date??"",v=u.end?.dateTime??u.end?.date??"";await r("calendar_events",{id:p,title:String(u.summary??"(無題)"),description:String(u.description??""),category:"general",starts_at:String(y),ends_at:String(v),location:String(u.location??""),google_event_id:String(u.id??""),updated_at:new Date().toISOString()}),d++}return await Qe({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(n){return{count:0,error:n instanceof Error?n.message:String(n)}}}async function as(){return(await x("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:h(t,["id"],""),receivedAt:h(t,["received_at"],""),senderPhone:h(t,["sender_phone"],""),senderName:h(t,["sender_name"],""),imageUrl:h(t,["image_url"],""),ocrStatus:h(t,["ocr_status"],"pending")||"pending",ocrText:h(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:h(t,["linked_invoice_id"],"")}))}async function ss(e,t){const i=e.config.api_key;if(!i)return{text:"",error:"Cloud Vision API key 未設定"};try{const n=`https://vision.googleapis.com/v1/images:annotate?key=${i}`,c=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return c.ok?{text:(await c.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${c.status}`}}catch(n){return{text:"",error:n instanceof Error?n.message:String(n)}}}async function ns(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>M);return{supabaseInsert:n}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const w=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Ke,CALENDAR_CATEGORY_LABELS:Xe,INVOICE_TYPE_LABELS:je,JIKOMI_STATUS_LABELS:Mt,SEASONAL_TEMPLATES:Je,TAX_DEDUCTION_LABELS:Oe,TAX_RATE_CATEGORIES:Xt,deleteCalendarEvent:Ga,deleteMailSender:Xa,deletePrintLayout:Ua,fetchBillList:Yt,fetchBillingSummary:Ue,fetchCalendarEvents:Ka,fetchCustomerLedger:Ve,fetchDeliveryNote:Be,fetchFaxInbox:as,fetchIntegrationSettings:Wa,fetchInvoices:xe,fetchJikomiList:Ft,fetchKenteiList:zt,fetchMailSenders:Ya,fetchMasterStats:Tt,fetchMaterialList:Vt,fetchPayableList:Ut,fetchPaymentStatus:It,fetchPipelineMeta:jt,fetchPrintLayouts:Va,fetchPurchaseList:Bt,fetchRawMaterialStock:Ht,fetchSalesAnalytics:Ot,fetchSalesReport:qt,fetchSalesSummary:Pt,fetchShopifyOrders:es,fetchStoreOrders:Qt,fetchStoreSales:He,fetchTankList:Jt,fetchTaxDeclaration:Ye,generateTaxCSV:qa,generateTaxXML:Kt,ocrFaxImage:ss,recalculateTaxDeclaration:Ma,saveCalendarEvent:Qa,saveEmailCampaign:Se,saveFaxRecord:ns,saveIntegrationSetting:Qe,saveInvoice:Rt,saveMailSender:Ha,savePrintLayout:Ba,saveTaxDeclaration:Fa,sendEmailCampaign:Gt,syncGoogleCalendar:ts,syncShopifyOrders:Za},Symbol.toStringTag,{value:"Module"}));function Q(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const is={open:"未締め",closed:"締め済"};function os(e,t){const i=e.customers.map(n=>`
      <tr>
        <td>
          <div class="table-title">${n.customerName}</div>
          <div class="table-sub mono">${n.customerCode}</div>
        </td>
        <td class="numeric">${n.closingDay}日</td>
        <td class="numeric">${Q(n.salesAmount)}</td>
        <td class="numeric">${Q(n.taxAmount)}</td>
        <td class="numeric">${Q(n.prevBalance)}</td>
        <td class="numeric">${Q(n.paymentAmount)}</td>
        <td class="numeric"><strong>${Q(n.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${n.status==="closed"?"success":"warning"}">${is[n.status]}</span>
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
          <input id="billing-month" type="month" value="${t}" />
        </label>
        <label class="field">
          <span>締め日</span>
          <select id="billing-day">
            ${[10,15,20,25,31].map(n=>`<option value="${n}" ${e.closingDay===n?"selected":""}>${n}日締め</option>`).join("")}
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
        <p class="kpi-value">${Q(e.totalBilling)}</p>
        <p class="kpi-sub">${e.targetYearMonth} / ${e.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${e.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${e.customers.filter(n=>n.status==="closed").length} 社</p>
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
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>
  `}const ls={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"},{title:"🗺️ 取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"📋 受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"📱 モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"🏭 酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"✉️ メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"📅 カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"🔌 外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"🛍️ Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"📠 FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}]},rs={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},more:{eyebrow:"その他トップ",title:"周辺業務メニュー",description:"税務、店舗、分析、設定などの補助機能をまとめて配置しています。"}};function lt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ue(e){const t=rs[e],i=ls[e].map(n=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${lt(n.title)}</p>
            <p class="category-card-description">${lt(n.description)}</p>
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
        <p class="eyebrow">${t.eyebrow}</p>
        <h1>${t.title}</h1>
        <p class="meta-note">${t.description}</p>
      </div>
    </section>

    <section class="category-grid">
      ${i}
    </section>
  `}function Wt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function le(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function cs(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${Wt(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${le(t.amount)}</td>
        </tr>
      `).join("")}function ds(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${Wt(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${le(t.amount)}</td>
        </tr>
      `).join("")}function us(e,t){return`
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
            <dd>${le(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${le(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${le(e.balanceAmount)}</dd>
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
            <tbody>${cs(e)}</tbody>
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
            <tbody>${ds(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function pe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function me(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function ae(e,t){for(const i of t){const n=e[i];if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"){const c=Number(n);if(Number.isFinite(c))return c}}return null}function ps(e){const t=e?.productTotals;if(!t||t.length===0)return"―";const i=t.reduce((c,a)=>{const o=ae(a,["amount","salesAmount"]),l=ae(a,["marginRate","grossMarginRate"]);return o===null||o<=0||l===null?c:{weightedAmount:c.weightedAmount+o,weightedRate:c.weightedRate+o*l}},{weightedAmount:0,weightedRate:0});if(i.weightedAmount>0)return`${(i.weightedRate/i.weightedAmount).toFixed(1)}%`;const n=t.reduce((c,a)=>{const o=a,l=ae(o,["amount","salesAmount"]),r=ae(o,["grossProfit","grossAmount","margin"]),d=ae(o,["costAmount","cost","costPrice"]);if(l===null||l<=0)return c;const u=r??(d!==null?l-d:null);return u===null?c:{sales:c.sales+l,gross:c.gross+u}},{sales:0,gross:0});return n.sales>0?`${(n.gross/n.sales*100).toFixed(1)}%`:"―"}function ms(e){const n={top:20,right:20,bottom:30,left:50},c=760-n.left-n.right,a=260-n.top-n.bottom,o=Math.max(...e.map(u=>u.amount),1),l=c/e.length,r=e.map((u,p)=>{const y=u.amount/o*a,v=n.left+p*l+4,_=n.top+a-y,P=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${v}" y="${_}" width="${Math.max(l-8,8)}" height="${y}" rx="4" fill="#0F5B8D" opacity="${.58+p/e.length*.34}" />
          ${p%5===0?`<text x="${v+6}" y="252" class="chart-axis">${P}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=n.top+a-a*u,y=Math.round(o*u/1e3);return`
        <g>
          <line x1="${n.left}" y1="${p}" x2="${760-n.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${y.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${r}
    </svg>
  `}function ys(e,t,i){const n={success:"正常",warning:"注意",error:"異常",running:"実行中"},c=e.salesRecords.slice(0,10).map(a=>`
            <tr>
              <td class="mono">${a.documentNo}</td>
              <td>${me(a.date)}</td>
              <td>${a.customerName}</td>
              <td class="numeric">${pe(a.amount)}</td>
            </tr>
          `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${n[t.status]}</span>
        <span class="meta-note">最終同期 ${me(t.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${pe(e.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${e.kpis.todayDelta>0?"+":""}${e.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${pe(e.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${e.kpis.monthDelta>0?"+":""}${e.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${pe(e.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${ps(i)}</p>
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
        ${ms(e.dailySales)}
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
              <dd>${me(t.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${me(t.generatedAt)}</dd>
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
          <tbody>${c}</tbody>
        </table>
      </div>
    </section>
  `}function hs(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function G(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function vs(e,t){const i=e.lines.length?e.lines.map((c,a)=>`
          <tr>
            <td class="numeric">${a+1}</td>
            <td class="mono">${c.productCode}</td>
            <td>${c.productName}</td>
            <td class="numeric">${c.quantity.toLocaleString("ja-JP")}</td>
            <td>${c.unit}</td>
            <td class="numeric">${G(c.unitPrice)}</td>
            <td class="numeric">${G(c.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',n=e.totalAmount-e.taxAmount;return`
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
            <tr><th>納品日</th><td>${hs(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${G(e.totalAmount)}（税込）</td></tr>
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
          <tbody>${i}</tbody>
        </table>
      </div>

      <div class="delivery-footer">
        <div class="delivery-totals">
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${G(n)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${G(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${G(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function O(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function fs(e){return O(e).replaceAll(`
`,"<br />")}function bs(e){const i=[...Object.values(Je),{id:"custom",season:"カスタム",subject:"",body:""}].map(c=>`
        <button
          class="template-card ${e.selectedTemplateId===c.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${c.id}"
        >
          <span class="template-card-kicker">${c.season}</span>
          <strong>${O(c.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),n=e.previewRecipients.length?e.previewRecipients.map(c=>`
            <li>
              <span>${O(c.name)}</span>
              <span class="table-sub">${O(c.email)} / ${O(c.area)}</span>
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
          ${i}
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
          <input id="email-subject" type="text" value="${O(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${O(e.body)}</textarea>
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
        <label class="field" style="margin-bottom:12px;">
          <span>送信元アドレス</span>
          <select id="email-sender">
            ${e.senders.map(c=>`<option value="${c.id}" ${c.id===e.senderId?"selected":""}>${O(c.name)} &lt;${O(c.email)}&gt;${c.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${O(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?fs(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${O(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function j(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ye(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function gs(e,t){const i=[ye("得意先",t.customers.map(c=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${j(c.name)}</strong>
            <span class="table-sub mono">${j(c.code)}</span>
          </button>
        `)),ye("商品",t.products.map(c=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${j(c.name)}</strong>
            <span class="table-sub mono">${j(c.code)}</span>
          </button>
        `)),ye("伝票",t.documents.map(c=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${j(c.documentNo)}</strong>
            <span class="table-sub">${j(c.customerName)} / ${j(c.date)}</span>
          </button>
        `)),ye("ページ",t.pages.map(c=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${j(c.path)}"
          >
            <strong>${j(c.title)}</strong>
            <span class="table-sub mono">${j(c.path)}</span>
          </button>
        `))].filter(Boolean).join(""),n=e.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
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
            value="${j(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${i||n}
          </div>
        </div>
      </div>
    </div>
  `}function se(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Zt(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${se(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${se(e.title)}">
        <div class="modal-header">
          <h2>${se(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${se(e.placeholder)}"
            value="${se(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function he(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function rt(e){return e.trim().toLowerCase()}function $s(e,t){const i=rt(t),n=e.filter(a=>i?[a.code,a.name,a.name].map(rt).some(o=>o.includes(i)):!0).slice(0,50),c=n.length?`
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
              ${n.map(a=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${he(a.code)}"
                      data-name="${he(a.name)}"
                    >
                      <td class="mono">${he(a.code)}</td>
                      <td>${he(a.name)}</td>
                      <td>${a.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Zt({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:c,emptyMessage:"該当する得意先が見つかりません。"})}function Ss(e){return e.toISOString().slice(0,10)}function X(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function B(e,t){return e[t]?`<div class="field-error">${X(e[t])}</div>`:""}function W(e,t,i=""){return[i,e[t]?"has-error":""].filter(Boolean).join(" ")}function ks(e,t,i,n){const c=Object.keys(je).map(r=>`<option value="${r}" ${e.invoiceType===r?"selected":""}>${je[r]}</option>`).join(""),a=e.lines.map((r,d)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${W(n,`lines.${d}.productCode`,"input-cell")}" type="text" data-line="${d}" data-field="productCode" value="${X(r.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${d}" aria-label="商品検索">🔍</button>
          </div>
          ${B(n,`lines.${d}.productCode`)}
        </td>
        <td>
          <input class="${W(n,`lines.${d}.productName`,"input-cell")}" type="text" data-line="${d}" data-field="productName" value="${X(r.productName)}" placeholder="商品名" />
          ${B(n,`lines.${d}.productName`)}
        </td>
        <td>
          <input class="${W(n,`lines.${d}.quantity`,"input-cell numeric")}" type="number" data-line="${d}" data-field="quantity" value="${r.quantity}" min="0" />
          ${B(n,`lines.${d}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${d}" data-field="unit" value="${r.unit}" placeholder="本" /></td>
        <td>
          <input class="${W(n,`lines.${d}.unitPrice`,"input-cell numeric")}" type="number" data-line="${d}" data-field="unitPrice" value="${r.unitPrice}" min="0" />
          ${B(n,`lines.${d}.unitPrice`)}
        </td>
        <td class="numeric">${r.amount>0?r.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${d}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${d}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),o=e.lines.reduce((r,d)=>r+d.amount,0),l=Math.floor(o*10/110);return`
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
          <select id="inv-type">${c}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${W(n,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Ss(new Date)}" />
          ${B(n,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${W(n,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${X(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${B(n,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${X(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${X(e.staffCode)}" />
        </label>
      </div>
      ${B(n,"lines")}
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
          <tbody id="invoice-lines">${a||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(o-l).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${l.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${o.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${X(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${i?"disabled":""}>
        ${i?"保存中…":"保存する"}
      </button>
    </div>
  `}function ws(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function xs(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _s(e,t){const i=e.length?e.map(n=>`
            <tr>
              <td class="mono">${n.documentNo}</td>
              <td>${ws(n.date)}</td>
              <td>
                <div class="table-title">${n.customerName}</div>
                <div class="table-sub mono">${n.customerCode}</div>
              </td>
              <td class="numeric">${n.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${xs(n.amount)}</td>
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
          <tbody>${i}</tbody>
        </table>
      </div>
      ${e.length===0?'<p class="empty-note">条件に一致する伝票はありません。</p>':""}
    </section>
  `}function Ds(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Cs(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function ea(e,t){const i=new Date(e);return i.setDate(i.getDate()+t),i}function ta(e){const t=new Date(e),i=t.getDay();return t.setDate(t.getDate()-i),t.setHours(0,0,0,0),t}function ct(e){const t=ea(ta(e),6);return t.setHours(23,59,59,999),t}function dt(e){return new Date(`${e}T00:00:00`)}function ut(e){return`${e.getMonth()+1}/${e.getDate()}`}function As(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Ls(){const e=new Date,t=ta(Cs(Ds(e),-3)),i=ct(new Date(e.getFullYear(),e.getMonth()+4,0)),n=[];let c=new Date(t);for(;c<=i;){const a=ct(c);n.push({start:new Date(c),end:a,label:`${ut(c)} - ${ut(a)}`}),c=ea(c,7)}return n}function Es(e){const t=Ls(),i=`160px repeat(${t.length}, minmax(56px, 1fr))`,n=t.map(a=>`
        <div class="gantt-week">
          <span>${a.label}</span>
        </div>
      `).join(""),c=e.length?e.map(a=>{const o=dt(a.startDate),l=dt(a.expectedDoneDate),r=Math.max(0,t.findIndex(p=>p.end>=o)),d=Math.max(r,t.reduce((p,y,v)=>y.start<=l?v:p,r)),u=[`仕込番号: ${a.jikomiNo}`,`銘柄: ${a.productName}`,`期間: ${a.startDate} - ${a.expectedDoneDate}`,`タンク: ${a.tankNo}`,`備考: ${a.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${i}">
              <div class="gantt-label">
                <strong>${a.jikomiNo}</strong>
                <span class="table-sub">${a.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${a.status}"
                  style="grid-column:${r+1} / ${d+2}"
                  title="${As(u)}"
                >
                  ${a.jikomiNo} / ${a.productName}
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
        <div class="gantt-grid" style="grid-template-columns:${i}">
          <div class="gantt-corner">仕込</div>
          ${n}
        </div>
        ${c}
      </div>
    </section>
  `}function pt(e,t){const i={planned:"neutral",active:"warning",done:"success"},n=e.map(l=>`
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
          <span class="status-pill ${i[l.status]}">${Mt[l.status]}</span>
        </td>
        <td>${l.note||"―"}</td>
      </tr>
    `).join(""),c=e.filter(l=>l.status==="active").length,a=e.filter(l=>l.status==="done").length,o=e.filter(l=>l.status==="planned").length;return`
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
        <p class="kpi-value">${c} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${o} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${a} 本</p>
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
          <tbody>${n||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ns(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},i={pending:"neutral",submitted:"warning",approved:"success"},n=e.map(r=>`
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
          <span class="status-pill ${i[r.status]}">${t[r.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${r.id}">
            ${r.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),c=e.filter(r=>r.status==="approved").length,a=e.filter(r=>r.status==="submitted").length,o=e.filter(r=>r.status==="pending").length;return`
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
        <p class="kpi-value">${a} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${o} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>検定一覧</h2>
          <p class="panel-caption">承認済 ${c} 件 / 合計 ${e.length} 件</p>
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
  `}function Ps(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Is(e,t){return`
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
        ${e?`<p class="field-error">${Ps(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Ts(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${t.closingDay}日</td>
          <td class="numeric">${t.paymentDay}日</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function js(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td class="mono">${t.janCode}</td>
          <td>${t.name}</td>
          <td>${t.category}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function Os(e,t){return`
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
            <tbody>${Ts(e.customers)}</tbody>
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
            <tbody>${js(e.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function Ae(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Rs(e){const t=e.map(c=>{const o=(c.minimumStock>0?c.currentStock/c.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${c.code}</td>
          <td>${c.name}</td>
          <td class="numeric ${o?"text-danger":""}">
            ${c.currentStock.toLocaleString("ja-JP")} ${c.unit}
            ${o?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${c.minimumStock.toLocaleString("ja-JP")} ${c.unit}</td>
          <td class="numeric">${Ae(c.unitCost)}</td>
          <td class="numeric">${Ae(c.currentStock*c.unitCost)}</td>
          <td>${c.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${c.id}">調整</button>
          </td>
        </tr>
      `}).join(""),i=e.filter(c=>c.minimumStock>0&&c.currentStock/c.minimumStock<1.5).length,n=e.reduce((c,a)=>c+a.currentStock*a.unitCost,0);return`
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
        <p class="kpi-value">${Ae(n)}</p>
        <p class="kpi-sub">${e.length} 品目</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">要補充</p>
        <p class="kpi-value ${i>0?"text-danger":""}">${i} 品目</p>
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
  `}function qs(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function Le(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Ms={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Fs(e){return`
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
          <tbody>${e.map(i=>`
        <tr>
          <td>
            <div class="table-title">${i.customerName}</div>
            <div class="table-sub mono">${i.customerCode}</div>
          </td>
          <td class="numeric">${Le(i.billedAmount)}</td>
          <td class="numeric">${Le(i.paymentAmount)}</td>
          <td class="numeric">${Le(i.balanceAmount)}</td>
          <td>${qs(i.lastPaymentDate)}</td>
          <td><span class="status-pill ${i.status==="paid"?"success":i.status==="partial"?"warning":"danger"}">${Ms[i.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function Z(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function mt(e){return e.trim().toLowerCase()}function Js(e,t){const i=mt(t),n=e.filter(a=>i?[a.code,a.name,a.janCode].map(mt).some(o=>o.includes(i)):!0),c=n.length?`
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
              ${n.map(a=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Z(a.code)}"
                      data-name="${Z(a.name)}"
                    >
                      <td class="mono">${Z(a.code)}</td>
                      <td>${Z(a.name)}</td>
                      <td class="mono">${Z(a.janCode)}</td>
                      <td>${Z(a.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Zt({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:c,emptyMessage:"該当する商品が見つかりません。"})}function U(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function zs(e,t){const i={pending:"未確定",confirmed:"確定",paid:"支払済"},n={pending:"warning",confirmed:"neutral",paid:"success"},c={unpaid:"未払い",partial:"一部支払",paid:"支払済"},a={unpaid:"warning",partial:"neutral",paid:"success"},o=e.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${U(p.unitPrice)}</td>
        <td class="numeric"><strong>${U(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${n[p.status]}">${i[p.status]}</span>
        </td>
      </tr>
    `).join(""),l=t.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${U(p.totalPurchase)}</td>
        <td class="numeric">${U(p.paidAmount)}</td>
        <td class="numeric"><strong>${U(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${a[p.status]}">${c[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),r=e.reduce((p,y)=>p+y.amount,0),d=t.reduce((p,y)=>p+y.balance,0),u=t.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${U(r)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${U(d)}</p>
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
          <tbody>${o||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
  `}function ne(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Vs(e,t){const i={holding:"保有中",due:"期日到来",cleared:"決済済"},n={holding:"neutral",due:"warning",cleared:"success"},c=e.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${ne(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${n[u.status]}">${i[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${u.id}" ${u.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),a=t.map(u=>{const p=u.minimumStock>0&&u.currentStock<u.minimumStock*1.2;return`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${u.currentStock.toLocaleString("ja-JP")} ${u.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${u.minimumStock.toLocaleString("ja-JP")} ${u.unit}</td>
          <td class="numeric">${ne(u.unitCost)}</td>
          <td class="numeric">${ne(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),o=e.filter(u=>u.status==="holding"),l=o.reduce((u,p)=>u+p.amount,0),r=t.reduce((u,p)=>u+p.currentStock*p.unitCost,0),d=t.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${ne(l)}</p>
        <p class="kpi-sub">${o.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${ne(r)}</p>
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
          <tbody>${c||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
          <tbody>${a||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Bs(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function E(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Re(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${E(e)}</pre>
    </div>
  `}function Us(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function ve(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${E(e)}</code>
      ${Us(e)}
    </div>
  `}function ee(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${E(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${E(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${E(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?Re(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${E(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${E(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function fe(e){return`
    <div class="setup-step setup-step-compact" data-step="${E(e.stepLabel)}">
      <h3>${E(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${E(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Ys(e,t,i){const n={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Bs(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${n[e.status]}</span>
        </p>
        <p class="kpi-sub">${E(e.message)}</p>
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
      ${fe({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${ve("git --version")}
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
      ${fe({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${ve("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${fe({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${ve("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${ve("python get-pip.py")}
        `})}
      ${fe({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${ee({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${ee({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${ee({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${ee({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${ee({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${ee({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${Re(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${Re(`{
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
            <span class="config-value">${E(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${E(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${E(i)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${E(i)}"
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
  `}function Hs(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Xs(e){return e.replace("-","/")}function Ks(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=760,i=280,n={top:16,right:24,bottom:36,left:64},c=t-n.left-n.right,a=i-n.top-n.bottom,o=Math.max(...e.map(u=>u.amount),1),l=c/e.length,r=[0,.25,.5,.75,1].map(u=>{const p=n.top+a-a*u,y=`${Math.round(o*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${n.left}" y1="${p}" x2="${t-n.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${y}</text>
        </g>
      `}).join(""),d=e.map((u,p)=>{const y=u.amount/o*a,v=Math.max(l-18,24),_=n.left+p*l+(l-v)/2,P=n.top+a-y;return`
        <g>
          <rect x="${_}" y="${P}" width="${v}" height="${y}" rx="6" class="analytics-bar" />
          <text x="${_+v/2}" y="${i-10}" class="chart-axis centered-axis">${Xs(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${t} ${i}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${r}
      ${d}
    </svg>
  `}function Qs(e){return e.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${Hs(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function Gs(e,t){const i=t==="products"?"商品別集計":"得意先別集計",n=t==="products"?e.productTotals:e.customerTotals;return`
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
        ${Ks(e.monthlySales)}
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${i}</h2>
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
            <tbody>${Qs(n)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function ie(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ws(e){const t=Math.max(...e.salesByProduct.flatMap(a=>a.values),1),i=e.salesByProduct.map(a=>{const o=a.values.map((l,r)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(l/t*120)}px" title="${e.months[r]}: ${ie(l)}"></div>
            <span class="bar-label">${e.months[r].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${a.label}</p>
          <div class="bar-chart">${o}</div>
        </div>
      `}).join(""),n=e.costSimulation.map(a=>`
      <tr>
        <td class="mono">${a.productCode}</td>
        <td>${a.productName}</td>
        <td class="numeric">${ie(a.costPrice)}</td>
        <td class="numeric">${ie(a.sellPrice)}</td>
        <td class="numeric">${ie(a.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${a.marginRate>=40?"success":"warning"}">${a.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),c=e.salesByCustomer.map(a=>{const o=a.values.reduce((l,r)=>l+r,0);return`
        <tr>
          <td>${a.label}</td>
          ${a.values.map(l=>`<td class="numeric">${(l/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${ie(o)}</strong></td>
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
      <div class="chart-wrap">${i}</div>
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
              ${e.months.map(a=>`<th class="numeric">${a}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${c}</tbody>
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
  `}function Zs(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function en(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function yt(e){return e.toISOString().slice(0,10)}function tn(e,t,i){const n=e.length?e.map(c=>`
            <tr>
              <td class="mono">${c.documentNo}</td>
              <td>${Zs(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${en(c.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||yt(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${i||yt(new Date)}" />
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
          <tbody>${n}</tbody>
        </table>
      </div>
    </section>
  `}function be(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function an(e,t,i,n){const c={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},a={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},o={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},l=e.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${be(p.unitPrice)}</td>
        <td class="numeric"><strong>${be(p.amount)}</strong></td>
        <td>${c[p.paymentMethod]}</td>
      </tr>
    `).join(""),r=t.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(y=>`${y.productName} ×${y.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${be(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${o[p.status]}">${a[p.status]}</span>
        </td>
        <td>${p.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${p.id}">詳細</button>
        </td>
      </tr>
    `).join(""),d=e.reduce((p,y)=>p+y.amount,0),u=t.filter(p=>p.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${be(d)}</p>
        <p class="kpi-sub">${e.length} 件 / ${n}</p>
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
        <button class="tab-btn ${i==="pos"?"active":""}" data-store-tab="pos">直売所レジ</button>
        <button class="tab-btn ${i==="orders"?"active":""}" data-store-tab="orders">受注・宅配</button>
      </div>

      ${i==="pos"?`
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
  `}const Ee={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},sn={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function nn(e,t,i,n){const c=sn[e],a=Object.keys(Ee).map(l=>`
      <button class="tab-button ${e===l?"active":""}" data-import-entity="${l}">
        ${Ee[l]}
      </button>
    `).join(""),o=t?`
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
          ${i||t.validRows===0?"disabled":""}>
          ${i?"取り込み中…":`${t.validRows}件をSupabaseに登録`}
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
      <div class="tab-group" style="flex-wrap: wrap;">${a}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${Ee[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${c.required.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${c.optional.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
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

    ${o}

    ${n?`<section class="panel"><p class="sync-message">${n}</p></section>`:""}
  `}const k={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function on(e,t,i){const n=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:k.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:k.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:k.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:k.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:k.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:k.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:k.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:k.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:k.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:k.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:k.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:k.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:k.date}];e.lines.slice(0,6).forEach((o,l)=>{const r=33+l*8.5;n.push({id:`line${l}_name`,label:`明細${l+1} 品名`,x:5,y:r,fontSize:7.5,value:o.productName+(o.spec?` ${o.spec}`:""),color:k.detail},{id:`line${l}_code`,label:`明細${l+1} CD`,x:64,y:r,fontSize:7.5,value:o.productCode,color:k.detail},{id:`line${l}_qty`,label:`明細${l+1} 数量`,x:124,y:r,fontSize:8,value:o.quantity>0?String(o.quantity):"",color:k.detail},{id:`line${l}_price`,label:`明細${l+1} 原単価`,x:163,y:r,fontSize:8,value:o.unitPrice>0?o.unitPrice.toLocaleString("ja-JP"):"",color:k.detail},{id:`line${l}_amount`,label:`明細${l+1} 原価金額`,x:176,y:r,fontSize:8,value:o.amount>0?o.amount.toLocaleString("ja-JP"):"",color:k.detail},{id:`line${l}_retail`,label:`明細${l+1} 売単価`,x:193,y:r,fontSize:8,value:o.retailPrice?o.retailPrice.toLocaleString("ja-JP"):"",color:k.detail})});const c=e.lines.reduce((o,l)=>o+(l.amount||0),0),a=e.lines.reduce((o,l)=>o+l.quantity,0);return n.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(a),color:k.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:c.toLocaleString("ja-JP"),color:k.total}),i&&n.forEach(o=>{const l=i[o.id];l&&(o.x=l.x,o.y=l.y)}),n}function ln(e,t,i,n,c){const o=on(e,t,n).map(r=>`
      <div class="fd-field ${c?"fd-draggable":""}"
           data-fd-id="${r.id}"
           style="left:${r.x}mm; top:${r.y}mm; font-size:${r.fontSize}pt; --fd-color:${r.color};"
           title="${r.label} (${r.x.toFixed(1)}, ${r.y.toFixed(1)})">
        ${c?`<span class="fd-badge">${r.label}</span>`:""}
        <span class="fd-value">${r.value}</span>
      </div>
    `).join(""),l=i.showReferenceOverlay&&i.overlayImageUrl?`background-image: url('${i.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">帳票デザイナー</p>
        <h1>BP1701 フォーム配置</h1>
      </div>
      <div class="meta-stack">
        <button class="button ${c?"primary":"secondary"}" data-action="fd-toggle-design">
          ${c?"🔧 配置モードON":"▶ プレビューモード"}
        </button>
        <button class="button primary" onclick="window.print()">🖨️ 印刷</button>
      </div>
    </section>

    ${c?`
    <section class="panel no-print">
      <div class="panel-header">
        <div>
          <h2>💾 レイアウト保存</h2>
          <p class="panel-caption">クラウド保存で他PCからも同じレイアウトが使えます</p>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;margin-bottom:12px;">
        <label class="field" style="flex:1 1 200px;">
          <span>レイアウト名</span>
          <input id="fd-layout-name" type="text" placeholder="例: 青葉商事用" />
        </label>
        <button class="button primary" data-action="fd-save-cloud">☁️ クラウド保存</button>
        <button class="button secondary" data-action="fd-save-local">📁 このPCに保存</button>
      </div>
      <div id="fd-saved-layouts" class="form-hint" style="margin-bottom:12px;">保存済みレイアウト読込中…</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button class="button secondary" data-action="fd-export-json">📤 JSONエクスポート</button>
        <button class="button secondary" data-action="fd-import-json">📥 JSONインポート</button>
        <input id="fd-import-file" type="file" accept=".json" style="display:none;" />
        <button class="button secondary" data-action="fd-reset-positions" style="margin-left:auto;">🔄 初期値に戻す</button>
      </div>
      <p class="form-hint" style="margin:12px 0 0;">
        <strong>配置モード:</strong> テキストボックスをドラッグ(または方向キー)で位置合わせ。
        色: <span style="color:${k.header}">■ヘッダ</span>
        <span style="color:${k.code}">■コード</span>
        <span style="color:${k.date}">■日付</span>
        <span style="color:${k.detail}">■明細</span>
        <span style="color:${k.total}">■合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas-scaler" id="fd-scaler">
        <div class="fd-canvas" style="${l}">
          ${o}
        </div>
      </div>
    </section>

    ${c?`
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
        <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${i.showReferenceOverlay?"checked":""} /> 参考画像表示</label>
        <label style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">濃さ</span>
          <input type="range" min="0" max="1" step="0.05" value="${i.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
        </label>
      </div>
    </section>
  `}function Ne(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(i=>{const n=i.dataset.fdId??"",c=parseFloat(i.style.left)||0,a=parseFloat(i.style.top)||0;t[n]={x:c,y:a}}),t}function rn(e,t){const i=Array.from(new Set(e.map(n=>(n.address1??"").slice(0,3)).filter(Boolean))).slice(0,20);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">取引先マップ</p>
        <h1>取引先を地図で見る</h1>
      </div>
      <div class="meta-stack">
        <span class="panel-caption">${e.filter(n=>n.lat&&n.lng).length} 件表示中</span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>地域絞込</span>
          <select id="map-region-filter">
            <option value="">すべて</option>
            ${i.map(n=>`<option value="${n}" ${t===n?"selected":""}>${n}</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="map-geocode">📍 住所から位置取得</button>
          <button class="button secondary" data-action="map-refresh">🔄 再読込</button>
        </div>
      </div>
    </section>

    <section class="panel" style="padding:0; overflow:hidden;">
      <div id="customer-map" style="height: 600px; width: 100%; background: #e8edf1;">
        <div style="padding:40px; text-align:center; color:var(--text-secondary);">地図を読み込み中…</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>取引先リスト</h2>
        <p class="panel-caption">${e.length} 件</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>名称</th>
              <th>住所</th>
              <th>業種</th>
              <th class="numeric">直近注文</th>
              <th>座標</th>
            </tr>
          </thead>
          <tbody>
            ${e.slice(0,50).map(n=>`
              <tr>
                <td class="mono">${n.code}</td>
                <td>${n.name}</td>
                <td>${n.address1??"―"}</td>
                <td>${n.businessType??"―"}</td>
                <td class="numeric">${n.lastOrderAmount?"¥"+n.lastOrderAmount.toLocaleString("ja-JP"):"―"}</td>
                <td>${n.lat&&n.lng?'<span class="status-pill success">設定済</span>':'<span class="status-pill warning">未設定</span>'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}const cn={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},dn=["new","picking","packed","shipped","delivered"];function un(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(a=>t[a.stage].push(a));const i=dn.map(a=>{const o=cn[a],l=t[a];return`
      <div class="wf-col" data-wf-stage="${a}">
        <div class="wf-col-header" style="--wf-color:${o.color};">
          <span class="wf-col-icon">${o.icon}</span>
          <span class="wf-col-label">${o.label}</span>
          <span class="wf-col-count">${l.length}</span>
        </div>
        <div class="wf-col-body">
          ${l.length===0?'<div class="wf-empty">―</div>':l.map(r=>`
            <div class="wf-card ${r.priority==="urgent"?"wf-urgent":""}" data-wf-order="${r.id}" draggable="true">
              <div class="wf-card-header">
                <span class="wf-card-no mono">${r.orderNo}</span>
                ${r.priority==="urgent"?'<span class="wf-card-priority">🔥 急</span>':""}
              </div>
              <div class="wf-card-customer">${r.customerName}</div>
              <div class="wf-card-meta">
                <span>📅 ${r.orderDate}</span>
                ${r.deliveryDate?`<span>🚚 ${r.deliveryDate}</span>`:""}
              </div>
              <div class="wf-card-footer">
                <span>${r.itemCount}品</span>
                <strong>¥${r.totalAmount.toLocaleString("ja-JP")}</strong>
              </div>
              ${r.staffName?`<div class="wf-card-staff">👤 ${r.staffName}</div>`:""}
            </div>
          `).join("")}
        </div>
      </div>
    `}).join(""),n=e.reduce((a,o)=>a+o.totalAmount,0),c=e.filter(a=>a.priority==="urgent").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">受注管理</p>
        <h1>受注ワークフロー</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="wf-new-order">＋ 新規受注</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">進行中受注</p>
        <p class="kpi-value">${e.filter(a=>a.stage!=="delivered").length}件</p>
        <p class="kpi-sub">処理待ち</p>
      </article>
      <article class="panel kpi-card ${c>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${c}件</p>
        <p class="kpi-sub">当日出荷</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">¥${n.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">今表示分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${t.delivered.length}件</p>
        <p class="kpi-sub">配達済</p>
      </article>
    </section>

    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">
        カードを<b>ドラッグして次の段階へ移動</b>できます。急ぎマークは🔥で強調。
      </p>
      <div class="wf-board">
        ${i}
      </div>
    </section>
  `}function pn(e,t,i){const n=e.cart.reduce((a,o)=>a+o.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((a,o)=>a+o.quantity,0)}<br/>
          <strong>¥${n.toLocaleString("ja-JP")}</strong>
        </div>
      </header>

      <!-- ステップインジケーター -->
      <nav class="mo-steps">
        <button class="mo-step ${e.step==="customer"?"active":e.selectedCustomer?"done":""}" data-mo-step="customer">
          <span class="mo-step-num">1</span>
          <span class="mo-step-label">顧客</span>
        </button>
        <button class="mo-step ${e.step==="products"?"active":e.cart.length>0?"done":""}" data-mo-step="products"
          ${e.selectedCustomer?"":"disabled"}>
          <span class="mo-step-num">2</span>
          <span class="mo-step-label">商品</span>
        </button>
        <button class="mo-step ${e.step==="review"?"active":""}" data-mo-step="review"
          ${e.cart.length===0?"disabled":""}>
          <span class="mo-step-num">3</span>
          <span class="mo-step-label">確認</span>
        </button>
      </nav>

      ${mn(e,t,i)}
    </div>
  `}function mn(e,t,i){if(e.step==="customer"){const n=e.customerQuery.toLowerCase(),c=n?t.filter(a=>a.name.toLowerCase().includes(n)||a.code.toLowerCase().includes(n)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${c.slice(0,30).map(a=>`
            <button class="mo-item ${e.selectedCustomer?.id===a.id?"selected":""}" data-mo-select-customer="${a.id}">
              <div class="mo-item-title">${a.name}</div>
              <div class="mo-item-sub mono">${a.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const n=e.productQuery.toLowerCase(),c=n?i.filter(a=>a.name.toLowerCase().includes(n)||a.code.toLowerCase().includes(n)):i.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${c.slice(0,50).map(a=>{const o=e.cart.find(l=>l.productCode===a.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${a.name}</div>
                  <div class="mo-item-sub">${a.category} / JAN ${a.janCode||"―"}</div>
                </div>
                ${o?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${a.code}">−</button>
                      <span>${o.quantity}</span>
                      <button data-mo-qty="+1" data-mo-product="${a.code}">+</button>
                    </div>`:`<button class="button primary" data-mo-add-product="${a.code}">＋</button>`}
              </div>
            `}).join("")}
        </div>
      </section>
      <div class="mo-footer">
        <button class="button secondary" data-mo-step="customer">◀ 戻る</button>
        <button class="button primary mo-next" data-mo-step="review" ${e.cart.length===0?"disabled":""}>確認へ ▶</button>
      </div>
    `}return e.step==="review"?`
      <section class="panel">
        <h2 style="margin-top:0;">確認</h2>
        <div class="mo-review-customer">
          <p class="mo-item-sub">お客様</p>
          <h3>${e.selectedCustomer?.name??"―"}</h3>
        </div>

        <div class="mo-review-items">
          ${e.cart.map((n,c)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${n.productName}</div>
                <div class="mo-item-sub">${n.quantity} × ¥${n.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${n.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${c}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((n,c)=>n+c.amount,0).toLocaleString("ja-JP")}</strong>
        </div>

        <label class="field" style="margin-top:16px;">
          <span>メモ</span>
          <textarea id="mo-memo" rows="2" placeholder="配達希望・特記事項等">${e.memo}</textarea>
        </label>
      </section>

      <div class="mo-footer">
        <button class="button secondary" data-mo-step="products">◀ 戻る</button>
        <button class="button primary" data-action="mo-submit">受注を送信</button>
      </div>
    `:`
    <section class="panel" style="text-align:center;padding:40px 20px;">
      <div style="font-size:48px;">✅</div>
      <h2>受注を送信しました</h2>
      <p class="mo-item-sub">伝票番号: <span class="mono">${e.submittedDocNo??"―"}</span></p>
      <button class="button primary" data-action="mo-reset">新しい受注を入力</button>
    </section>
  `}const ht={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},vt={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},ft={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function yn(e,t){const i=e.find(a=>a.id===t)??e[0],n=e.filter(a=>a.status==="new").length,c=e.filter(a=>a.status==="confirmed").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">酒蔵見学</p>
        <h1>見学お問い合わせ管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="tour-show-form">🔗 公開フォームを見る</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card ${n>0?"kpi-alert":""}">
        <p class="panel-title">未対応</p>
        <p class="kpi-value">${n}件</p>
        <p class="kpi-sub">返信待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">確定済</p>
        <p class="kpi-value">${c}件</p>
        <p class="kpi-sub">訪問予定</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">累計</p>
        <p class="kpi-value">${e.length}件</p>
        <p class="kpi-sub">総問合せ</p>
      </article>
    </section>

    <div class="tour-layout">
      <!-- 左: 一覧 -->
      <div class="panel">
        <div class="panel-header">
          <h2>お問い合わせ一覧</h2>
        </div>
        <div class="tour-list">
          ${e.map(a=>`
            <button class="tour-item ${i?.id===a.id?"active":""}" data-tour-id="${a.id}">
              <div class="tour-item-head">
                <strong>${a.name}</strong>
                <span class="status-pill ${vt[a.status]}">${ht[a.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${ft[a.language]} · 👥 ${a.partySize}名
              </div>
              <div class="tour-item-sub">📅 希望日: ${a.visitDate}</div>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- 右: 詳細と返信 -->
      <div class="panel">
        ${i?`
          <div class="panel-header">
            <div>
              <h2>${i.name} 様</h2>
              <p class="panel-caption">受付日: ${i.createdAt.slice(0,10)}</p>
            </div>
            <span class="status-pill ${vt[i.status]}">${ht[i.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${i.email}${i.phone?` / ${i.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${i.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${i.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${ft[i.language]}</dd></div>
            <div><dt>目的</dt><dd>${i.purpose}</dd></div>
            <div><dt>メッセージ</dt><dd style="white-space:pre-wrap;">${i.message}</dd></div>
          </dl>

          <hr style="margin:16px 0;" />

          <h3 style="margin-top:0;">✉️ 返信</h3>
          <label class="field">
            <span>確定日時</span>
            <input type="datetime-local" id="tour-confirmed-time" value="${i.confirmedTime??""}" />
          </label>
          <label class="field">
            <span>返信文面</span>
            <textarea id="tour-reply-body" rows="8" placeholder="ご予約ありがとうございます。..."></textarea>
          </label>
          <div class="action-bar">
            <button class="button secondary" data-action="tour-insert-template" data-template="confirm">📝 確定テンプレ</button>
            <button class="button secondary" data-action="tour-insert-template" data-template="decline">📝 お断りテンプレ</button>
            <button class="button primary" data-action="tour-send-reply" data-tour-id="${i.id}">送信 + 確定</button>
          </div>
        `:'<p class="empty-row">お問い合わせがありません</p>'}
      </div>
    </div>

    <section class="panel">
      <div class="panel-header">
        <h2>🔗 公開フォームの埋め込み</h2>
      </div>
      <p>自社サイトに以下のHTMLを貼り付けると、お問い合わせフォームが設置できます:</p>
      <pre class="code-block"><code>&lt;iframe src="https://yuuuuuuuuki01.github.io/sake-system/tour-form"
  width="100%" height="600" frameborder="0"&gt;&lt;/iframe&gt;</code></pre>
      <p class="form-hint">送信された問合せは自動的にこの画面に表示されます。</p>
    </section>
  `}const hn=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,vn=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function fn(e,t){const i=t?e.find(c=>c.id===t):null,n=t==="__new__";return`
    <section class="page-head">
      <div>
        <p class="eyebrow">メール設定</p>
        <h1>送信元アドレス管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="ms-new">＋ 新規追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>登録済み送信元 (${e.length}件)</h2>
          <p class="panel-caption">複数のメールアドレスを切り替えて送信できます</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>名前</th>
              <th>メールアドレス</th>
              <th>表示名</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${e.map(c=>`
              <tr>
                <td>
                  ${c.name}
                  ${c.isDefault?'<span class="status-pill success" style="margin-left:6px;">既定</span>':""}
                </td>
                <td class="mono">${c.email}</td>
                <td>${c.displayName??"―"}</td>
                <td>
                  ${c.isVerified?'<span class="status-pill success">✓認証済</span>':'<span class="status-pill warning">未認証</span>'}
                </td>
                <td>
                  <button class="button-sm secondary" data-action="ms-edit" data-id="${c.id}">編集</button>
                  <button class="button-sm secondary" data-action="ms-delete" data-id="${c.id}" style="color:var(--danger);">削除</button>
                </td>
              </tr>
            `).join("")}
            ${e.length===0?'<tr><td colspan="5" class="empty-row">送信元が未登録です</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>

    ${i||n?`
      <section class="panel">
        <div class="panel-header">
          <h2>${n?"新規送信元":"編集"}: ${i?.name??""}</h2>
        </div>
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>名前 (識別用)</span>
            <input id="ms-name" type="text" value="${i?.name??""}" placeholder="営業部" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス</span>
            <input id="ms-email" type="email" value="${i?.email??""}" placeholder="sales@kaneishuzo.co.jp" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 (差出人名)</span>
            <input id="ms-display-name" type="text" value="${i?.displayName??""}" placeholder="金井酒造店 営業部" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>返信先 (任意)</span>
            <input id="ms-reply-to" type="email" value="${i?.replyTo??""}" placeholder="info@kaneishuzo.co.jp" />
          </label>
          <label class="field" style="flex:1 1 100%;">
            <span>署名</span>
            <textarea id="ms-signature" rows="4" placeholder="社名&#10;住所&#10;TEL">${i?.signature??""}</textarea>
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="ms-default" type="checkbox" ${i?.isDefault?"checked":""} />
            既定の送信元にする
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="ms-cancel">キャンセル</button>
          <button class="button primary" data-action="ms-save" data-id="${i?.id??""}">保存</button>
        </div>
        ${i?.isVerified?"":'<p class="form-hint" style="margin-top:8px;">⚠️ 未認証のアドレスは送信時にエラーになります。Resendダッシュボードでドメイン認証を行ってください。</p>'}
      </section>
      `:""}
  `}function bn(e,t,i,n){const[c,a]=t.split("-").map(b=>parseInt(b,10)),o=new Date(c,a-1,1),l=new Date(c,a,0),r=o.getDay(),d=l.getDate(),u=[];for(let b=0;b<r;b++)u.push({isOutside:!0});for(let b=1;b<=d;b++)u.push({date:new Date(c,a-1,b)});for(;u.length%7!==0;)u.push({isOutside:!0});const p=i?e.filter(b=>b.category===i):e,y={};p.forEach(b=>{const I=b.startsAt.slice(0,10);y[I]??=[],y[I].push(b)});const v=new Date().toISOString().slice(0,10),_=u.map(b=>{if(b.isOutside)return'<div class="cal-cell cal-outside"></div>';const I=b.date,J=`${I.getFullYear()}-${String(I.getMonth()+1).padStart(2,"0")}-${String(I.getDate()).padStart(2,"0")}`,Ce=y[J]??[],ua=J===v,tt=I.getDay();return`
        <div class="cal-cell ${ua?"cal-today":""} ${tt===0?"cal-sun":tt===6?"cal-sat":""}"
             data-cal-date="${J}">
          <div class="cal-day-num">${I.getDate()}</div>
          <div class="cal-events">
            ${Ce.slice(0,3).map(z=>`
              <button class="cal-event" data-cal-event-id="${z.id}"
                      style="background:${z.color||Ke[z.category]||"#0F5B8D"};"
                      title="${z.title}">
                <span class="cal-event-time">${z.isAllDay?"終日":new Date(z.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${z.title}</span>
              </button>
            `).join("")}
            ${Ce.length>3?`<button class="cal-event-more" data-cal-date="${J}">+${Ce.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),P=n?.isOpen?gn(n):"",f=new Date(c,a-2,1),D=new Date(c,a,1),te=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}`,N=`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`,de=(()=>{const b=new Date;return`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${c}年 ${a}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${te}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${de}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${N}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Xe).map(([b,I])=>`<option value="${b}" ${i===b?"selected":""}>${I}</option>`).join("")}
            </select>
          </label>
        </div>
      </div>

      <div class="cal-grid">
        <div class="cal-weekday cal-sun">日</div>
        <div class="cal-weekday">月</div>
        <div class="cal-weekday">火</div>
        <div class="cal-weekday">水</div>
        <div class="cal-weekday">木</div>
        <div class="cal-weekday">金</div>
        <div class="cal-weekday cal-sat">土</div>
        ${_}
      </div>
    </section>

    ${P}
  `}function gn(e){const t=e.event;return`
    <div class="modal-backdrop" data-action="cal-close">
      <div class="modal-panel" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>${e.isNew?"新規予定":"予定の編集"}</h3>
          <button class="modal-close" data-action="cal-close">×</button>
        </div>
        <div class="modal-body">
          <label class="field">
            <span>タイトル</span>
            <input id="cal-title" type="text" value="${t.title??""}" placeholder="例: 青葉商事 納品" />
          </label>
          <div style="display:flex;gap:8px;">
            <label class="field" style="flex:1;">
              <span>分類</span>
              <select id="cal-category">
                ${Object.entries(Xe).map(([i,n])=>`<option value="${i}" ${t.category===i?"selected":""}>${n}</option>`).join("")}
              </select>
            </label>
            <label style="display:flex;align-items:center;gap:6px;align-self:flex-end;padding-bottom:8px;">
              <input id="cal-allday" type="checkbox" ${t.isAllDay?"checked":""} />
              終日
            </label>
          </div>
          <div style="display:flex;gap:8px;">
            <label class="field" style="flex:1;">
              <span>開始</span>
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?bt(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?bt(t.endsAt):""}" />
            </label>
          </div>
          <label class="field">
            <span>場所</span>
            <input id="cal-location" type="text" value="${t.location??""}" placeholder="蔵 / 客先 / Zoom など" />
          </label>
          <label class="field">
            <span>関連顧客コード (任意)</span>
            <input id="cal-customer" type="text" value="${t.relatedCustomerCode??""}" />
          </label>
          <label class="field">
            <span>メモ</span>
            <textarea id="cal-description" rows="3" placeholder="持参物・備考など">${t.description??""}</textarea>
          </label>
        </div>
        <div class="action-bar" style="padding:12px 20px;border-top:1px solid var(--border);">
          ${e.isNew?"":`<button class="button secondary" data-action="cal-delete" data-id="${t.id}" style="color:var(--danger);margin-right:auto;">削除</button>`}
          <button class="button secondary" data-action="cal-close">キャンセル</button>
          <button class="button primary" data-action="cal-save" data-id="${t.id??""}">保存</button>
        </div>
      </div>
    </div>
  `}function bt(e){const t=new Date(e),i=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${i(t.getMonth()+1)}-${i(t.getDate())}T${i(t.getHours())}:${i(t.getMinutes())}`}const oe={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]}};function $n(e,t){const i=t?e.find(n=>n.id===t):null;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">外部連携</p>
        <h1>連携サービス設定</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>登録済み連携</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>サービス</th>
              <th>状態</th>
              <th>最終同期</th>
              <th>結果</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${e.map(n=>`
              <tr>
                <td><strong>${n.name}</strong><br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${n.provider}</span></td>
                <td>
                  ${n.isEnabled?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}
                </td>
                <td>${n.lastSyncAt?n.lastSyncAt.slice(0,16).replace("T"," "):"未同期"}</td>
                <td style="font-size:12px;">${n.lastStatus??"―"}</td>
                <td>
                  <button class="button-sm secondary" data-action="int-edit" data-id="${n.id}">設定</button>
                  ${n.provider==="shopify"?`<button class="button-sm primary" data-action="int-sync-shopify" data-id="${n.id}">同期</button>`:""}
                  ${n.provider==="google_calendar"?`<button class="button-sm primary" data-action="int-sync-gcal" data-id="${n.id}">同期</button>`:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    ${i?`
      <section class="panel">
        <div class="panel-header">
          <h2>${i.name} の設定</h2>
        </div>
        <p class="form-hint">${oe[i.provider]?.description??""}</p>
        ${oe[i.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${oe[i.provider].setupUrl}" target="_blank">${oe[i.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(oe[i.provider]?.fields??[]).map(n=>`
            <label class="field" style="flex:1 1 100%;">
              <span>${n.label}</span>
              <input id="int-${n.key}" type="text" value="${i.config[n.key]??""}" placeholder="${n.placeholder}" />
            </label>
          `).join("")}
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="int-enabled" type="checkbox" ${i.isEnabled?"checked":""} />
            この連携を有効にする
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="int-cancel">キャンセル</button>
          <button class="button primary" data-action="int-save" data-id="${i.id}">保存</button>
        </div>
      </section>
    `:""}

    <section class="panel">
      <div class="panel-header">
        <h2>📡 連携ガイド</h2>
      </div>
      <div class="summary-list">
        <div>
          <dt>Shopify</dt>
          <dd>ストア管理画面 → アプリ → カスタムアプリ作成 → Admin API access token を発行</dd>
        </div>
        <div>
          <dt>Google Calendar</dt>
          <dd>Cloud Console で OAuth クライアント作成 → スコープ: calendar → アクセストークン取得</dd>
        </div>
        <div>
          <dt>Cloud Vision</dt>
          <dd>Cloud Console → APIとサービス → 認証情報 → APIキー作成 → Vision API を有効化</dd>
        </div>
        <div>
          <dt>Resend</dt>
          <dd>resend.com 登録 → ドメイン認証 (SPF/DKIM) → API Key 発行 → GitHub Secrets に <code>VITE_RESEND_API_KEY</code> 登録</dd>
        </div>
      </div>
    </section>
  `}function Sn(e,t){const i=e.reduce((a,o)=>a+o.totalAmount,0),n=e.filter(a=>a.financialStatus==="paid").length,c=e.filter(a=>a.fulfillmentStatus!=="fulfilled"&&a.fulfillmentStatus!=="shipped").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">Shopify</p>
        <h1>EC注文 (Shopify連動)</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="shopify-sync">🔄 今すぐ同期</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">注文数</p>
        <p class="kpi-value">${e.length}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">売上合計</p>
        <p class="kpi-value">¥${i.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">支払済 ${n}件</p>
      </article>
      <article class="panel kpi-card ${c>0?"kpi-alert":""}">
        <p class="panel-title">未発送</p>
        <p class="kpi-value">${c}件</p>
        <p class="kpi-sub">出荷待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value" style="font-size:14px;">${t?t.slice(0,16).replace("T"," "):"未同期"}</p>
        <p class="kpi-sub">Shopify Admin API</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>注文一覧</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>注文番号</th>
              <th>受注日時</th>
              <th>顧客</th>
              <th class="numeric">金額</th>
              <th>支払</th>
              <th>配送</th>
              <th>商品</th>
            </tr>
          </thead>
          <tbody>
            ${e.length===0?'<tr><td colspan="7" class="empty-row">注文がありません。「今すぐ同期」を押してください。</td></tr>':""}
            ${e.map(a=>`
              <tr>
                <td class="mono">${a.orderNumber}</td>
                <td>${a.orderDate.slice(0,16).replace("T"," ")}</td>
                <td>${a.customerName}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${a.customerEmail}</span></td>
                <td class="numeric">¥${a.totalAmount.toLocaleString("ja-JP")}</td>
                <td>
                  <span class="status-pill ${a.financialStatus==="paid"?"success":"warning"}">${a.financialStatus}</span>
                </td>
                <td>
                  <span class="status-pill ${a.fulfillmentStatus==="fulfilled"||a.fulfillmentStatus==="shipped"?"success":"warning"}">${a.fulfillmentStatus||"未"}</span>
                </td>
                <td style="font-size:12px;">${a.lineItems.map(o=>`${o.name} ×${o.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function kn(e,t,i){return`
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
        <button class="button primary" data-action="fax-upload" ${t?"disabled":""}>
          ${t?"OCR処理中…":"📤 アップロード&OCR"}
        </button>
      </div>
      ${i?`
        <div style="margin-top:16px;">
          <h3 style="margin:0 0 8px;">📝 OCR結果</h3>
          <pre style="background:var(--surface-alt);padding:12px;border-radius:6px;white-space:pre-wrap;font-family:'Noto Sans JP',monospace;font-size:12px;max-height:300px;overflow:auto;">${i}</pre>
          <div class="action-bar">
            <button class="button secondary" data-action="fax-create-invoice">📋 伝票として起票</button>
          </div>
        </div>
      `:""}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>受信履歴 (${e.length}件)</h2>
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
            ${e.length===0?'<tr><td colspan="6" class="empty-row">FAX受信履歴がありません</td></tr>':""}
            ${e.map(n=>`
              <tr>
                <td>${n.receivedAt.slice(0,16).replace("T"," ")}</td>
                <td>${n.senderName??"―"}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${n.senderPhone??""}</span></td>
                <td>
                  <span class="status-pill ${n.ocrStatus==="done"?"success":n.ocrStatus==="failed"?"warning":"neutral"}">${n.ocrStatus}</span>
                </td>
                <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--text-secondary);">${(n.ocrText??"").slice(0,80)}</td>
                <td>${n.linkedInvoiceId?`<span class="mono">${n.linkedInvoiceId}</span>`:"未連携"}</td>
                <td>
                  <button class="button-sm secondary" data-action="fax-view" data-id="${n.id}">詳細</button>
                </td>
              </tr>
            `).join("")}
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
  `}const gt={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},wn={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},xn={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function C(e){return"¥"+e.toLocaleString("ja-JP")}function re(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function aa(e,t){const i=e.reduce((a,o)=>a+o.amount,0),n=Math.floor(i*t),c=i+n;return{subtotal:i,taxAmount:n,total:c}}const $={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function S(e,t){const i=e.align??"left",n=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${i}`,`font-size:${n}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Pe(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),i=t.getFullYear(),n=i-2018;return{y:n>0?String(n).padStart(2,"0"):String(i).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function _n(e,t,i){const n=Pe(e.documentDate),c=Pe(e.orderDate??e.documentDate),a=Pe(e.deliveryDate??e.documentDate),o=e.lines.slice(0,6).map((f,D)=>{const te=$.detailStartY+D*$.detailRowH,N=$.detailCols,de=[],b=(I,J)=>{J&&de.push(S({...I,y:te,x:I.x+0},J))};return b(N.productName,f.productName+(f.spec?` ${f.spec}`:"")),b(N.productCode,f.productCode),b(N.color,f.color??""),b(N.size,[f.size,f.caseQty?`×${f.caseQty}`:""].filter(Boolean).join(" ")),b(N.unit,f.unit),b(N.quantity,f.quantity>0?f.quantity.toLocaleString("ja-JP"):""),b(N.correctedQty,f.correctedQuantity?f.correctedQuantity.toLocaleString("ja-JP"):""),b(N.discount,f.discount?f.discount.toLocaleString("ja-JP"):""),b(N.unitPrice,f.unitPrice>0?f.unitPrice.toLocaleString("ja-JP"):""),b(N.costAmount,f.amount>0?f.amount.toLocaleString("ja-JP"):""),b(N.retailPrice,f.retailPrice?f.retailPrice.toLocaleString("ja-JP"):""),b(N.note,f.receivedAmount?f.receivedAmount.toLocaleString("ja-JP"):""),de.join("")}).join(""),l=e.lines.reduce((f,D)=>f+(D.amount||0),0),r=e.lines.reduce((f,D)=>f+(D.retailPrice||0)*(D.correctedQuantity??D.quantity),0),d=e.lines.reduce((f,D)=>f+(D.receivedAmount||0),0),u=e.lines.reduce((f,D)=>f+(D.returnAmount||0),0),p=e.lines.reduce((f,D)=>f+D.quantity,0),y=i.showReferenceOverlay?`background-image: url('${i.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",v=i.calibrationOffsetX||0,_=i.calibrationOffsetY||0,P=`transform: translate(${v}mm, ${_}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${y}">
        ${i.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-i.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${P}">
        ${S($.currentDateY,n.y)}
        ${S($.currentDateM,n.m)}
        ${S($.currentDateD,n.d)}
        ${S($.documentNo,e.documentNo)}
        ${e.settlementPrint?S($.settlementCheck,"✓"):""}

        ${S($.vendorName,t.name)}
        ${S($.vendorAddress,t.address1)}
        ${S($.chainStoreCode,e.chainStoreCode??"")}
        ${S($.categoryCode,e.categoryCode??"")}
        ${S($.slipNumber,e.documentNo)}
        ${S($.vendorCode,e.slipTypeCode??"")}

        ${S($.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${S($.orderDateY,c.y)}
        ${S($.orderDateM,c.m)}
        ${S($.orderDateD,c.d)}
        ${S($.deliveryDateY,a.y)}
        ${S($.deliveryDateM,a.m)}
        ${S($.deliveryDateD,a.d)}
        ${S($.orderNo,e.orderNo??"")}
        ${S($.partnerCode,e.vendorCode??"")}

        ${o}

        ${S($.totalQty,p.toLocaleString("ja-JP"))}
        ${S($.receivedTotal,d.toLocaleString("ja-JP"))}
        ${S($.returnTotal,u.toLocaleString("ja-JP"))}
        ${S($.correctedCostTotal,l.toLocaleString("ja-JP"))}
        ${S($.correctedRetailTotal,r.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Dn(e,t,i){const{subtotal:n,taxAmount:c,total:a}=aa(e.lines,e.taxRate),o=e.previousBalance??0,l=e.paymentAmount??0,r=o-l+a,d=e.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${i.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${C(p.unitPrice)}</td>
        <td class="numeric">${C(p.amount)}</td>
      </tr>
    `).join(""),u=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td><td></td>${i.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page invoice-freee ${i.fontSize}">
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
          ${i.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${t.registrationNo}</span></p>`:""}
          ${i.showSeal?`<div class="freee-seal-wrap">${t.sealImageUrl?`<img src="${t.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
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
        <div><dt>請求日</dt><dd>${re(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${re(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${C(r)}</span>
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
            ${i.showUnit?"<th>単位</th>":""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${d}${u}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${i.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${C(n)} / 消費税: ${C(c)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${o?`<tr><th>前回御請求額</th><td>${C(o)}</td></tr>`:""}
          ${l?`<tr><th>ご入金額</th><td>▲ ${C(l)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${C(n)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${C(c)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${C(r)}</td></tr>
        </table>
      </div>

      <!-- 振込先 -->
      ${i.showBankInfo?`
        <div class="freee-bank">
          <h3>お振込先</h3>
          <p><strong>${t.bankName}</strong> ${t.bankBranch}　${t.bankAccountType} ${t.bankAccountNo}</p>
          <p>口座名義: ${t.bankAccountHolder}</p>
          <p class="freee-bank-note">※ お振込手数料はお客様にてご負担くださいますようお願い申し上げます。</p>
        </div>`:""}

      <!-- 備考 -->
      ${i.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}
    </div>
  `}function Cn(e,t,i){const{subtotal:n,taxAmount:c,total:a}=aa(e.lines,e.taxRate),o=e.lines.map(r=>`
      <tr>
        <td>${r.productName}${r.spec?` <span style="color:#636e72;font-size:9pt;">/ ${r.spec}</span>`:""}</td>
        <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
        ${i.showUnit?`<td>${r.unit}</td>`:""}
        <td class="numeric">${C(r.unitPrice)}</td>
        <td class="numeric">${C(r.amount)}</td>
      </tr>
    `).join(""),l=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td>${i.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page quotation-freee ${i.fontSize}">
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
          ${i.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${t.registrationNo}</span></p>`:""}
          ${i.showSeal?`<div class="freee-seal-wrap">${t.sealImageUrl?`<img src="${t.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
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
        <div><dt>見積日</dt><dd>${re(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${re(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${C(a)}</span>
          <span class="freee-total-tax">（税込）</span>
        </div>
      </div>

      <!-- 明細 -->
      <table class="freee-table">
        <thead>
          <tr>
            <th>品目 / 内容</th>
            <th class="numeric">数量</th>
            ${i.showUnit?"<th>単位</th>":""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${o}${l}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${i.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${C(n)} / 消費税: ${C(c)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${C(n)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${C(c)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${C(a)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${i.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?re(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function An(e,t,i,n){let c="";switch(e){case"chain_store":c=_n(n,i,t);break;case"quotation":c=Cn(n,i,t);break;case"invoice_monthly":c=Dn(n,i,t);break}const a=Object.keys(gt).map(r=>`<button class="tab-button ${e===r?"active":""}" data-print-template="${r}">${gt[r]}</button>`).join(""),o=n.lines.map((r,d)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${d}" data-print-lfield="productName" value="${r.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${d}" data-print-lfield="quantity" value="${r.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${d}" data-print-lfield="unitPrice" value="${r.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${r.amount>0?r.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${d}">✕</button></td>
      </tr>`).join(""),l=[{key:"showSeal",label:"印影"},{key:"showRegistrationNo",label:"登録番号"},{key:"showBankInfo",label:"振込先"},{key:"showJanCode",label:"JAN"},{key:"showRemarks",label:"備考"}].map(r=>`<label style="font-size:12px;"><input type="checkbox" data-print-opt="${r.key}" ${t[r.key]?"checked":""} /> ${r.label}</label>`).join(" ");return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">印刷</p>
        <h1>印刷センター</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" onclick="window.print()">🖨️ 印刷する</button>
      </div>
    </section>

    <div class="no-print" style="margin-bottom:16px;">
      <div class="tab-group">${a}</div>
    </div>

    <div class="print-layout no-print">
      <!-- 左: 設定 -->
      <div class="print-settings">

        <div class="panel">
          <h3 class="panel-title" style="margin-bottom:12px;">書類情報</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <label class="field" style="flex:1 1 120px;">
              <span>書類番号</span>
              <input type="text" data-print-field="documentNo" value="${n.documentNo}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>日付</span>
              <input type="date" data-print-field="documentDate" value="${n.documentDate}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>得意先名</span>
              <input type="text" data-print-field="customerName" value="${n.customerName}" />
            </label>
            <label class="field" style="flex:1 1 60px;">
              <span>敬称</span>
              <select data-print-field="customerHonorific">
                <option value="御中" ${n.customerHonorific==="御中"?"selected":""}>御中</option>
                <option value="様" ${n.customerHonorific==="様"?"selected":""}>様</option>
              </select>
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>税率</span>
              <select data-print-field="taxRate">
                <option value="0.10" ${n.taxRate===.1?"selected":""}>10%</option>
                <option value="0.08" ${n.taxRate===.08?"selected":""}>8%</option>
              </select>
            </label>
            ${e==="invoice_monthly"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>お支払期限</span>
                  <input type="date" data-print-field="dueDate" value="${n.dueDate??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>前回請求額</span>
                  <input type="number" data-print-field="previousBalance" value="${n.previousBalance??0}" />
                </label>`:""}
            ${e==="chain_store"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>柱店CD</span>
                  <input type="text" data-print-field="chainStoreCode" value="${n.chainStoreCode??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>伝票区分</span>
                  <input type="text" data-print-field="slipTypeCode" value="${n.slipTypeCode??""}" />
                </label>`:""}
          </div>
        </div>

        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 class="panel-title">明細 (${n.lines.length}行)</h3>
            <button class="button secondary" data-action="print-add-line" style="padding:6px 12px;font-size:12px;">＋行追加</button>
          </div>
          <div class="table-wrap">
            <table style="min-width:auto;">
              <thead><tr><th>品名</th><th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th><th></th></tr></thead>
              <tbody>${o||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
            </table>
          </div>
        </div>

        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">⚙️ 表示オプション</summary>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
            ${l}
          </div>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;">
            <label class="field" style="flex:0 0 80px;">
              <span>文字サイズ</span>
              <select data-print-opt="fontSize">
                <option value="small" ${t.fontSize==="small"?"selected":""}>小</option>
                <option value="medium" ${t.fontSize==="medium"?"selected":""}>中</option>
                <option value="large" ${t.fontSize==="large"?"selected":""}>大</option>
              </select>
            </label>
            <label class="field" style="flex:0 0 100px;">
              <span>カラー</span>
              <select data-print-opt="colorMode">
                <option value="color" ${t.colorMode==="color"?"selected":""}>カラー</option>
                <option value="mono" ${t.colorMode==="mono"?"selected":""}>モノクロ</option>
              </select>
            </label>
          </div>
          <div style="margin-top:12px;display:flex;gap:8px;">
            <button class="button secondary" data-action="print-save-settings" style="font-size:12px;">💾 設定を保存</button>
            <button class="button secondary" data-action="print-open-company" style="font-size:12px;">🏢 会社情報</button>
          </div>
        </details>

        ${e==="chain_store"?`
        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">📐 BP1701 位置合わせ</summary>
          <div style="margin-top:12px;">
            <p style="font-size:12px;color:var(--text-secondary);margin:0 0 8px;">
              帳票デザイナー(<a href="#" data-link="/form-designer" style="color:var(--primary);">/form-designer</a>)でドラッグ配置するのが正確です。
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
              <label style="font-size:12px;"><input type="checkbox" data-print-opt="showReferenceOverlay" ${t.showReferenceOverlay?"checked":""} /> 参考画像表示</label>
              <label style="display:flex;align-items:center;gap:4px;font-size:12px;">
                濃さ <input type="range" min="0" max="1" step="0.05" value="${t.overlayOpacity}" data-print-opt="overlayOpacity" style="width:80px;" />
              </label>
            </div>
          </div>
        </details>`:""}
      </div>

      <!-- 右: プレビュー -->
      <div class="print-preview-area">
        <div class="panel print-preview-panel">
          <div class="print-preview-scaler" id="print-scaler">
            <div class="print-preview ${t.colorMode}">
              ${c}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 印刷時はプレビューだけ表示 -->
    <div class="print-only">
      <div class="print-preview ${t.colorMode}">
        ${c}
      </div>
    </div>
  `}const Ln={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},En={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Nn(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let i=[],n="",c=!1;for(let l=0;l<e.length;l++){const r=e[l];c?r==='"'?e[l+1]==='"'?(n+='"',l++):c=!1:n+=r:r==='"'?c=!0:r===","?(i.push(n),n=""):r===`
`||r==="\r"?(r==="\r"&&e[l+1]===`
`&&l++,i.push(n),i.some(d=>d!=="")&&t.push(i),i=[],n=""):n+=r}if((n!==""||i.length>0)&&(i.push(n),i.some(l=>l!=="")&&t.push(i)),t.length===0)return{columns:[],rows:[]};const a=t[0].map(l=>l.trim()),o=[];for(let l=1;l<t.length;l++){const r={};a.forEach((d,u)=>{r[d]=(t[l][u]??"").trim()}),o.push(r)}return{columns:a,rows:o}}function Pn(e,t,i){const n=Ln[e],c=n.filter(l=>!t.includes(l)),a=i.map(l=>{const r=[];c.length>0&&r.push(`必須列欠損: ${c.join(",")}`);for(const d of n)t.includes(d)&&!l[d]&&r.push(`${d}が空`);return{...l,_valid:r.length===0,_error:r[0]}}),o=a.filter(l=>l._valid).length;return{entity:e,columns:t,rows:a,totalRows:i.length,validRows:o,invalidRows:a.length-o}}function In(e){const i=En[e],c={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+i.join(",")+`
`+c.join(",")+`
`}async function Tn(e,t){const{supabaseInsert:i}=await g(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>M);return{supabaseInsert:l}},void 0);let n=0,c=0;const o={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const l of t){if(!l._valid)continue;const{_valid:r,_error:d,...u}=l,p={...u};if(!p.id){const y=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[y]??`${e}-${Date.now()}-${n+c}`)}for(const y of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[y]=="string"&&p[y]!==""){const v=Number(p[y]);Number.isFinite(v)&&(p[y]=v)}try{await i(o,p)!==null?n++:c++}catch{c++}}return{inserted:n,failed:c}}function jn(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},i={empty:"neutral",in_use:"warning",aging:"success"},n=e.map(d=>{const u=d.capacity>0?Math.round(d.currentVolume/d.capacity*100):0;return`
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
            <span class="status-pill ${i[d.status]}">${t[d.status]}</span>
          </td>
          <td>${d.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${d.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),c=e.filter(d=>d.status==="in_use").length,a=e.filter(d=>d.status==="aging").length,o=e.filter(d=>d.status==="empty").length,l=e.reduce((d,u)=>d+u.capacity,0),r=e.reduce((d,u)=>d+u.currentVolume,0);return`
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
        <p class="kpi-value">${c} 基</p>
        <p class="kpi-sub">熟成中 ${a} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${o} 基</p>
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
          <tbody>${n||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ie(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function On(e,t,i){const n=e.rows.map((d,u)=>`
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
        <td class="numeric"><strong>${Ie(d.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),c=e.deductions.map((d,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(Oe).map(p=>`<option value="${p}" ${p===d.type?"selected":""}>${Oe[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${Xt.map(p=>`<option value="${p.code}" ${p.code===d.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
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
    `).join(""),a=Array.from({length:12},(d,u)=>u+1),o=e.rows.reduce((d,u)=>d+u.exportDeduction+u.sampleDeduction,0),l=e.rows.reduce((d,u)=>d+u.productionVolume,0),r=l>0?o/l*100:0;return`
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
            ${a.map(d=>`<option value="${d}" ${i===d?"selected":""}>${d}月</option>`).join("")}
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
        <p class="kpi-value">${Ie(e.totalTax)}</p>
        <p class="kpi-sub">${e.targetYear}年${e.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${e.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${o.toLocaleString("ja-JP")} L</p>
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
          <tbody>${n||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${Ie(e.totalTax)}</th>
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
          <tbody>${c||'<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>'}</tbody>
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
  `}function $t(e){const i=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(i)?`"${i}"`:i}function Rn(e,t,i){if(t.length===0&&(!i||i.length===0))return;const n=i&&i.length>0?i:Object.keys(t[0]??{}).map(d=>({key:d,label:d})),a=`\uFEFF${[n.map(d=>$t(d.label)).join(","),...t.map(d=>n.map(u=>$t(d[u.key])).join(","))].join(`\r
`)}`,o=new Blob([a],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(o),r=document.createElement("a");r.href=l,r.download=e,document.body.append(r),r.click(),r.remove(),window.setTimeout(()=>URL.revokeObjectURL(l),0)}const qn=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax"],ge=[{name:"青葉商事",email:"aoba@example.jp",area:"関東",historySegment:"seasonal"},{name:"北斗酒販",email:"hokuto@example.jp",area:"北海道",historySegment:"premium"},{name:"中央フーズ",email:"chuo@example.jp",area:"関東",historySegment:"seasonal"},{name:"東海酒店",email:"tokai@example.jp",area:"中部",historySegment:"premium"},{name:"三和物産",email:"sanwa@example.jp",area:"関西",historySegment:"liqueur"},{name:"南星リカー",email:"nansei@example.jp",area:"九州",historySegment:"seasonal"},{name:"山川酒店",email:"yamakawa@example.jp",area:"関西",historySegment:"premium"},{name:"瑞穂商店",email:"mizuho@example.jp",area:"中部",historySegment:"seasonal"}],St=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"}];function sa(e){const t=Je[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Ge(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Mn(){const e=sa("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const De=new Date,Fn=De.toISOString().slice(0,7),Jn=De.getFullYear(),zn=De.getMonth()+1,Vn=De.toISOString().slice(0,10),Bn="C0011",Y=Mn();function na(e){const t="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",i=e.startsWith(t)?e.slice(t.length)||"/":e;return qn.includes(i)?i:"/"}function We(e){switch(e){case"/cat/sales":case"/invoice":case"/ledger":case"/invoice-entry":case"/delivery":case"/billing":case"/report":return"sales";case"/cat/brewery":case"/jikomi":case"/tanks":case"/kentei":case"/materials":return"brewery";case"/cat/purchase":case"/purchase":case"/raw-material":return"purchase";case"/cat/more":case"/master":case"/analytics":case"/tax":case"/store":case"/setup":return"more";case"/email":return"email";default:return"dashboard"}}const kt=na(location.pathname),s={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,invoiceRecords:[],customerLedger:null,salesAnalytics:null,invoiceForm:Ge(),invoiceSaving:!1,invoiceSavedDocNo:null,pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Fn,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Jn,taxMonth:zn,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[{id:"o1",orderNo:"ORD-240416-001",customerName:"青葉商事",orderDate:"2026-04-16",deliveryDate:"2026-04-18",stage:"new",totalAmount:54e3,itemCount:3,priority:"urgent",staffName:"田中"},{id:"o2",orderNo:"ORD-240416-002",customerName:"北斗酒販",orderDate:"2026-04-16",deliveryDate:"2026-04-20",stage:"new",totalAmount:36e3,itemCount:2,priority:"normal"},{id:"o3",orderNo:"ORD-240415-003",customerName:"中央フーズ",orderDate:"2026-04-15",deliveryDate:"2026-04-17",stage:"picking",totalAmount:128e3,itemCount:6,priority:"urgent",staffName:"佐藤"},{id:"o4",orderNo:"ORD-240415-001",customerName:"東海酒店",orderDate:"2026-04-15",stage:"packed",totalAmount:72e3,itemCount:4,priority:"normal",staffName:"山田"},{id:"o5",orderNo:"ORD-240414-002",customerName:"西川商店",orderDate:"2026-04-14",deliveryDate:"2026-04-15",stage:"shipped",totalAmount:96e3,itemCount:5,priority:"normal"},{id:"o6",orderNo:"ORD-240413-001",customerName:"南部酒販",orderDate:"2026-04-13",stage:"delivered",totalAmount:48e3,itemCount:3,priority:"normal"}],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[{id:"t1",name:"鈴木 太郎",email:"suzuki@example.com",phone:"090-1234-5678",visitDate:"2026-04-22",partySize:4,language:"ja",purpose:"家族旅行の記念に",message:"蔵見学と試飲を希望します。予算は1人5000円程度です。",status:"new",createdAt:"2026-04-16T09:00:00"},{id:"t2",name:"John Smith",email:"john@example.com",visitDate:"2026-04-25",partySize:2,language:"en",purpose:"Sake tourism research",message:"We are journalists writing about Japanese sake culture. Would love to interview the toji-san.",status:"replied",createdAt:"2026-04-15T14:30:00"},{id:"t3",name:"田中 花子",email:"tanaka@example.com",phone:"03-9999-0000",visitDate:"2026-04-28",partySize:8,language:"ja",purpose:"会社の親睦会",message:"団体での訪問になります。可能であればランチも一緒にお願いします。",status:"confirmed",createdAt:"2026-04-14T10:00:00",confirmedTime:"2026-04-28T14:00"}],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,printTemplate:"chain_store",printOptions:{...wn,overlayImageUrl:`${"/sake-system/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...xn},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Vn,route:kt,currentCategory:We(kt),sidebarOpen:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Bn,masterTab:"customers",analyticsTab:"products",emailAudienceMode:Y.mode,emailRegion:Y.region,emailHistorySegment:Y.historySegment,emailTemplateId:Y.templateId,emailSubject:Y.subject,emailBody:Y.body,emailSaveMessage:Y.saveMessage,emailSending:!1,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function wt(e){return e.slice(0,10)}function Un(e){return{...e}}function _e(){s.pickerMode=null,s.pickerQuery="",s.pickerTargetLine=null}function ia(){s.invoiceForm=Ge(),s.invoiceSavedDocNo=null,s.invoiceErrors={},_e()}function oa(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((i,n)=>{i.productCode.trim()||(t[`lines.${n}.productCode`]="商品コードは必須です。"),i.productName.trim()||(t[`lines.${n}.productName`]="商品名は必須です。"),i.quantity<=0&&(t[`lines.${n}.quantity`]="数量は1以上を入力してください。"),i.unitPrice<0&&(t[`lines.${n}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Yn(e){const t=s.invoiceForm.lines[e];t&&s.invoiceForm.lines.splice(e+1,0,Un(t))}function Hn(){const e=s.invoiceRecords[0],t=s.masterStats?.customers[0],i=s.masterStats?.products.slice(0,2)??[];s.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:s.invoiceForm.staffCode||"S001",lines:i.map((n,c)=>{const a=c===0?1:2,o=1200*(c+1);return{productCode:n.code,productName:n.name,quantity:a,unitPrice:o,unit:"本",amount:a*o}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},s.invoiceSavedDocNo=null,s.invoiceErrors={}}function Xn(e){const t=s.masterStats?.customers.find(i=>i.code.toLowerCase()===e.trim().toLowerCase());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,!0):!1}function Kn(e){const t=s.masterStats?.customers.find(i=>i.name===e.trim());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,!0):!1}function la(e){if(R(e),s.invoiceErrors=oa(s.invoiceForm),Object.keys(s.invoiceErrors).length>0){m();return}s.invoiceSaving=!0,m(),Rt(s.invoiceForm).then(t=>{s.invoiceSavedDocNo=t.documentNo,s.invoiceSaving=!1,s.invoiceErrors={},s.invoiceForm=Ge(),m()}).catch(()=>{s.invoiceSaving=!1,m()})}function ra(e){const t=s.salesFilter.startDate?new Date(s.salesFilter.startDate):null,i=s.salesFilter.endDate?new Date(`${s.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((n,c)=>new Date(c.date).getTime()-new Date(n.date).getTime()).filter(n=>{const c=new Date(n.date);return!(t&&c<t||i&&c>i)})}function ca(){switch(s.emailAudienceMode){case"area":return s.emailRegion==="all"?ge:ge.filter(e=>e.area===s.emailRegion);case"history":return ge.filter(e=>e.historySegment===s.emailHistorySegment);default:return ge}}function Qn(){const e=ca();return{audienceMode:s.emailAudienceMode,region:s.emailRegion,historySegment:s.emailHistorySegment,selectedTemplateId:s.emailTemplateId,subject:s.emailSubject,body:s.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:s.emailSaveMessage,sending:s.emailSending,senderId:s.emailSenderId,senders:s.mailSenders}}function Te(e){const t=ca(),i=s.emailAudienceMode==="area"?s.emailRegion:s.emailAudienceMode==="history"?s.emailHistorySegment:"all";return{subject:s.emailSubject.trim(),body:s.emailBody.trim(),templateId:s.emailTemplateId,audienceMode:s.emailAudienceMode,audienceFilter:i,recipientCount:t.length,recipients:t.map(n=>n.email),status:e}}function Ze(){return s.user,!1}function ce(){s.globalSearchOpen=!1,s.globalQuery=""}function Gn(){const e=s.globalQuery.trim().toLowerCase();return e?{customers:s.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:s.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:s.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:St.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:St}}function Wn(){let e=[],t,i="export.csv";switch(s.route){case"/sales":e=(s.salesSummary?ra(s.salesSummary):[]).map(n=>({documentNo:n.documentNo,date:n.date,customerCode:n.customerCode,customerName:n.customerName,amount:n.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],i="sales.csv";break;case"/payment":e=[...s.paymentStatus?.records??[]].sort((n,c)=>c.balanceAmount-n.balanceAmount).map(n=>({...n})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],i="payment-status.csv";break;case"/invoice":e=s.invoiceRecords.map(n=>({...n})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],i="invoices.csv";break;case"/purchase":e=s.purchaseList.map(n=>({...n})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],i="purchase.csv";break;case"/jikomi":e=s.jikomiList.map(n=>({...n})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],i="jikomi.csv";break;case"/tanks":e=s.tankList.map(n=>({...n})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],i="tanks.csv";break;case"/kentei":e=s.kenteiList.map(n=>({...n})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],i="kentei.csv";break;case"/materials":e=s.materialList.map(n=>({...n})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],i="materials.csv";break;case"/master":s.masterTab==="customers"?(e=s.masterStats?.customers.map(n=>({...n}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],i="master-customers.csv"):(e=s.masterStats?.products.map(n=>({...n}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],i="master-products.csv");break;default:return}Rn(i,e,t)}function xt(e){const t=`${"/sake-system/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),s.route=e,s.currentCategory=We(e),s.sidebarOpen=!1,ce(),et(e)}async function et(e){s.actionLoading=!0,m();try{switch(e){case"/delivery":s.deliveryNote||(s.deliveryNote=await Be(s.deliverySearchDocNo||"D240122"));break;case"/billing":s.billingSummary||(s.billingSummary=await Ue(s.billingYearMonth));break;case"/report":s.salesReport||(s.salesReport=await qt());break;case"/jikomi":s.jikomiList.length===0&&(s.jikomiList=await Ft());break;case"/tanks":s.tankList.length===0&&(s.tankList=await Jt());break;case"/kentei":s.kenteiList.length===0&&(s.kenteiList=await zt());break;case"/materials":s.materialList.length===0&&(s.materialList=await Vt());break;case"/purchase":(s.purchaseList.length===0||s.payableList.length===0)&&([s.purchaseList,s.payableList]=await Promise.all([Bt(),Ut()]));break;case"/raw-material":(s.billList.length===0||s.rawStockList.length===0)&&([s.billList,s.rawStockList]=await Promise.all([Yt(),Ht()]));break;case"/tax":s.taxDeclaration||(s.taxDeclaration=await Ye(s.taxYear,s.taxMonth));break;case"/store":(s.storeSales.length===0||s.storeOrders.length===0)&&([s.storeSales,s.storeOrders]=await Promise.all([He(s.storeSalesDate),Qt()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await g(async()=>{const{fetchMailSenders:i}=await Promise.resolve().then(()=>w);return{fetchMailSenders:i}},void 0);if(s.mailSenders=await t(),!s.emailSenderId||!s.mailSenders.find(i=>i.id===s.emailSenderId)){const i=s.mailSenders.find(n=>n.isDefault)??s.mailSenders[0];i&&(s.emailSenderId=i.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await g(async()=>{const{fetchCalendarEvents:i}=await Promise.resolve().then(()=>w);return{fetchCalendarEvents:i}},void 0);s.calendarEvents=await t(s.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await g(async()=>{const{fetchIntegrationSettings:i}=await Promise.resolve().then(()=>w);return{fetchIntegrationSettings:i}},void 0);s.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:i}=await g(async()=>{const{fetchShopifyOrders:n,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>w);return{fetchShopifyOrders:n,fetchIntegrationSettings:c}},void 0);s.shopifyOrders=await t(),s.integrations.length===0&&(s.integrations=await i())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:i}=await g(async()=>{const{fetchFaxInbox:n,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>w);return{fetchFaxInbox:n,fetchIntegrationSettings:c}},void 0);s.faxRecords=await t(),s.integrations.length===0&&(s.integrations=await i())}break;default:break}}catch(t){console.warn("Route data load error",t)}finally{s.actionLoading=!1,m()}}function _t(){if(Ze())return Is(s.authError,s.authSubmitting);if(s.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(s.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${s.error}</p>
      </section>
    `;switch(s.route){case"/cat/sales":return ue("sales");case"/cat/brewery":return ue("brewery");case"/cat/purchase":return ue("purchase");case"/cat/more":return ue("more");case"/invoice-entry":return ks(s.invoiceForm,s.invoiceSavedDocNo,s.invoiceSaving,s.invoiceErrors);case"/email":return bs(Qn());case"/delivery":return s.deliveryNote?vs(s.deliveryNote,s.deliverySearchDocNo):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/billing":return s.billingSummary?os(s.billingSummary,s.billingYearMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/report":return s.salesReport?Ws(s.salesReport):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/jikomi":return s.jikomiView==="calendar"?`${pt(s.jikomiList,s.jikomiView)}${Es(s.jikomiList)}`:pt(s.jikomiList,s.jikomiView);case"/tanks":return jn(s.tankList);case"/kentei":return Ns(s.kenteiList);case"/materials":return Rs(s.materialList);case"/purchase":return zs(s.purchaseList,s.payableList);case"/raw-material":return Vs(s.billList,s.rawStockList);case"/tax":return s.taxDeclaration?On(s.taxDeclaration,s.taxYear,s.taxMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/store":return an(s.storeSales,s.storeOrders,s.storeTab,s.storeSalesDate);case"/setup":return s.pipelineMeta?Ys(s.pipelineMeta,K,F):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/import":return nn(s.importEntity,s.importPreview,s.importing,s.importResult);case"/print":return An(s.printTemplate,s.printOptions,s.printCompany,s.printData);case"/form-designer":return ln(s.printData,s.printCompany,s.printOptions,s.fdSavedPositions,s.fdDesignMode);case"/map":{const e=(s.masterStats?.customers??[]).slice(0,100).map((t,i)=>({...t,lat:35.37+i%10*.02+Math.random()*.01,lng:139.29+i%10*.02+Math.random()*.01,address1:["神奈川県秦野市","東京都新宿区","横浜市西区","川崎市幸区"][i%4],businessType:["酒店","飲食店","百貨店","スーパー"][i%4],lastOrderAmount:5e4+i%10*2e4}));return rn(e,s.mapRegionFilter)}case"/workflow":return un(s.workflowOrders);case"/mobile-order":return pn(s.mobileOrder,s.masterStats?.customers??[],s.masterStats?.products??[]);case"/tour":return yn(s.tourInquiries,s.tourActiveId);case"/mail-senders":return fn(s.mailSenders,s.mailSenderEditingId);case"/calendar":return bn(s.calendarEvents,s.calendarYearMonth,s.calendarFilterCategory,s.calendarEdit);case"/integrations":return $n(s.integrations,s.integrationEditingId);case"/shopify":{const e=s.integrations.find(t=>t.id==="shopify");return Sn(s.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return kn(s.faxRecords,s.faxProcessing,s.faxOcrText)}if(!s.salesSummary||!s.paymentStatus||!s.masterStats||!s.pipelineMeta||!s.customerLedger||!s.salesAnalytics)return"";switch(s.route){case"/sales":return tn(ra(s.salesSummary),s.salesFilter.startDate,s.salesFilter.endDate);case"/payment":return Fs([...s.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Os(s.masterStats,s.masterTab);case"/invoice":return _s(s.invoiceRecords,s.invoiceFilter);case"/ledger":return us(s.customerLedger,s.ledgerCustomerCode);case"/analytics":return Gs(s.salesAnalytics,s.analyticsTab);default:return ys(s.salesSummary,s.pipelineMeta,s.salesAnalytics)}}function Zn(){if(Ze())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${_t()}</div>
        </main>
      </div>
    `;const e={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売管理",items:[{path:"/cat/sales",label:"販売管理トップ",kicker:"Category"},{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],brewery:[{label:"蔵内管理",items:[{path:"/cat/brewery",label:"蔵内管理トップ",kicker:"Category"},{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]}],purchase:[{label:"仕入管理",items:[{path:"/cat/purchase",label:"仕入管理トップ",kicker:"Category"},{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],more:[{label:"その他",items:[{path:"/cat/more",label:"その他トップ",kicker:"Category"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/email",label:"メール配信",kicker:"Mail"},{path:"/setup",label:"連動設定",kicker:"Setup"}]}],email:[{label:"メール配信",items:[{path:"/email",label:"季節商品案内",kicker:"Mail"}]}]},t=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/cat/sales",label:"販売管理"},{category:"brewery",path:"/cat/brewery",label:"蔵内管理"},{category:"purchase",path:"/cat/purchase",label:"仕入管理"},{category:"more",path:"/cat/more",label:"その他"},{category:"email",path:"/email",label:"メール配信"}],i=e[s.currentCategory].map(l=>`
        <div class="nav-group">
          <p class="nav-group-label">${l.label}</p>
          ${l.items.map(r=>`
                <a
                  href="${"/sake-system/".replace(/\/$/,"")}${r.path==="/"?"/":r.path}"
                  class="nav-link ${s.route===r.path?"active":""}"
                  data-link="${r.path}"
                >
                  <div>
                    <div class="nav-kicker">${r.kicker}</div>
                    <div class="nav-label">${r.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),n=t.map(l=>`
        <a
          href="${"/sake-system/".replace(/\/$/,"")}${l.path==="/"?"/":l.path}"
          class="category-link ${s.currentCategory===l.category?"active":""}"
          data-link="${l.path}"
        >
          ${l.label}
        </a>
      `).join(""),c=s.pickerMode&&s.masterStats?s.pickerMode==="customer"?$s(s.masterStats.customers,s.pickerQuery):Js(s.masterStats.products,s.pickerQuery):"",a=s.globalSearchOpen?gs(s.globalQuery,Gn()):"",o=s.user?`
        <div class="user-badge">
          <span>${s.user.email}</span>
          <button class="button secondary" type="button" data-action="auth-logout">ログアウト</button>
        </div>
      `:s.authSkipped?'<div class="user-badge demo">デモモード</div>':"";return`
    <div class="shell">
      <button
        class="menu-toggle"
        type="button"
        aria-label="メニューを開く"
        data-action="${s.sidebarOpen?"sidebar-close":"sidebar-open"}"
      >
        ☰
      </button>
      <button
        class="sidebar-backdrop ${s.sidebarOpen?"open":""}"
        type="button"
        aria-label="メニューを閉じる"
        data-action="sidebar-close"
      ></button>
      <aside class="sidebar ${s.sidebarOpen?"open":""}">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>酒仙i 次世代版</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          <div class="category-nav">${n}</div>
          <div class="subnav">${i}</div>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${o}
        </header>
        <div class="view ${s.actionLoading?"is-busy":""}">${_t()}</div>
      </main>
      ${c}
      ${a}
    </div>
  `}async function ei(e){s.actionLoading=!0,m();try{s.invoiceRecords=await xe(e)}finally{s.actionLoading=!1,m()}}async function ti(e){s.actionLoading=!0,m();try{s.customerLedger=await Ve(e)}finally{s.actionLoading=!1,m()}}function R(e){s.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??s.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??s.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??s.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??s.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??s.invoiceForm.staffCode,lines:s.invoiceForm.lines.map((t,i)=>{const n=parseFloat(e.querySelector(`[data-line="${i}"][data-field="quantity"]`)?.value??"")||0,c=parseFloat(e.querySelector(`[data-line="${i}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${i}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${i}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${i}"][data-field="unit"]`)?.value??t.unit,quantity:n,unitPrice:c,amount:n*c}}),note:e.querySelector("#inv-note")?.value??s.invoiceForm.note},s.invoiceForm.customerCode=s.invoiceForm.customerCode.trim().toUpperCase(),s.invoiceForm.customerName=s.invoiceForm.customerName.trim()}function H(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??s.emailAudienceMode;s.emailAudienceMode=t,s.emailRegion=e.querySelector("#email-region")?.value??s.emailRegion,s.emailHistorySegment=e.querySelector("#email-history-segment")?.value??s.emailHistorySegment,s.emailSubject=e.querySelector("#email-subject")?.value??s.emailSubject,s.emailBody=e.querySelector("#email-body")?.value??s.emailBody}function ai(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{s.globalSearchOpen=!0,m()}),e.querySelectorAll("[data-action='global-search-close']").forEach(a=>{a.addEventListener("click",o=>{a.classList.contains("global-search")&&o.target instanceof HTMLElement&&!o.target.classList.contains("global-search")||(ce(),m())})}),e.querySelector("#global-search-input")?.addEventListener("input",a=>{s.globalQuery=a.target.value,m()}),e.querySelectorAll("[data-action='global-nav']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.path;o&&(ce(),xt(o))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Wn()}),e.querySelectorAll("[data-jikomi-tab]").forEach(a=>{a.addEventListener("click",()=>{s.jikomiView=a.dataset.jikomiTab,m()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const a=e.querySelector("#auth-email")?.value.trim()??"",o=e.querySelector("#auth-password")?.value??"";s.authSubmitting=!0,s.authError=null,m(),ha(a,o).then(l=>{s.user=l,s.authSkipped=!1,s.authSubmitting=!1,s.authError=null,m()}).catch(async l=>{try{const r=await va(a,o);s.user=r,s.authSkipped=!1,s.authError=null}catch{s.authError=l instanceof Error?l.message:"ログインに失敗しました。"}finally{s.authSubmitting=!1,m()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{s.authSkipped=!0,s.authError=null,m()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{fa().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{s.sidebarOpen=!0,m()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(a=>{a.addEventListener("click",()=>{s.sidebarOpen=!1,m()})}),e.querySelectorAll("[data-link]").forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),xt(a.dataset.link)})}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const a=e.querySelector("#sales-start")?.value??"",o=e.querySelector("#sales-end")?.value??"";s.salesFilter={startDate:a,endDate:o},m()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const a={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};s.invoiceFilter=a,ei(a)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const a=e.querySelector("#ledger-customer-code")?.value??"";s.ledgerCustomerCode=a.trim().toUpperCase(),ti(s.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{s.masterTab=a.dataset.tab,m()})}),e.querySelectorAll("[data-analytics-tab]").forEach(a=>{a.addEventListener("click",()=>{s.analyticsTab=a.dataset.analyticsTab,m()})}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{R(e),s.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),s.invoiceErrors={},m()}),e.querySelectorAll("[data-action='remove-line']").forEach(a=>{a.addEventListener("click",()=>{R(e);const o=parseInt(a.dataset.line??"0",10);s.invoiceForm.lines.splice(o,1),s.invoiceErrors=oa(s.invoiceForm),m()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(a=>{a.addEventListener("click",()=>{R(e),Yn(parseInt(a.dataset.line??"0",10)),s.invoiceErrors={},m()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Hn(),m()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{R(e),s.pickerMode="customer",s.pickerTargetLine=null,s.pickerQuery=s.invoiceForm.customerCode||s.invoiceForm.customerName,m()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(a=>{a.addEventListener("click",()=>{R(e);const o=parseInt(a.dataset.line??"0",10),l=s.invoiceForm.lines[o];s.pickerMode="product",s.pickerTargetLine=o,s.pickerQuery=l?l.productCode||l.productName:"",m()})}),e.querySelectorAll("[data-action='modal-close']").forEach(a=>{a.addEventListener("click",o=>{a.classList.contains("modal-backdrop")&&o.target instanceof HTMLElement&&!o.target.classList.contains("modal-backdrop")||(_e(),m())})}),e.querySelectorAll("[data-action='picker-select']").forEach(a=>{const o=()=>{const l=a.dataset.code??"",r=a.dataset.name??"";if(s.pickerMode==="customer")s.invoiceForm.customerCode=l,s.invoiceForm.customerName=r,delete s.invoiceErrors.customerCode;else if(s.pickerMode==="product"&&s.pickerTargetLine!==null){const d=s.invoiceForm.lines[s.pickerTargetLine];d&&(d.productCode=l,d.productName=r,d.amount=d.quantity*d.unitPrice,delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productCode`],delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productName`])}_e(),m()};a.addEventListener("click",o),a.addEventListener("keydown",l=>{l.key==="Enter"&&o()})}),e.querySelector("#modal-search")?.addEventListener("input",a=>{s.pickerQuery=a.target.value,m()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{ia(),m()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{la(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",()=>{R(e),Xn(s.invoiceForm.customerCode)&&(delete s.invoiceErrors.customerCode,m())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{R(e),Kn(s.invoiceForm.customerName)&&(delete s.invoiceErrors.customerCode,m())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(a=>{a.addEventListener("input",()=>{R(e),s.invoiceSavedDocNo=null})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{R(e),s.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const a=e.querySelector("#delivery-docno")?.value??"";s.deliverySearchDocNo=a.trim(),s.deliveryNote=null,s.actionLoading=!0,m(),Be(s.deliverySearchDocNo||"D240122").then(o=>{s.deliveryNote=o,s.actionLoading=!1,m()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const a=e.querySelector("#billing-month")?.value??s.billingYearMonth;s.billingYearMonth=a,s.billingSummary=null,s.actionLoading=!0,m(),Ue(a).then(o=>{s.billingSummary=o,s.actionLoading=!1,m()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const a=parseInt(e.querySelector("#tax-year")?.value??String(s.taxYear),10),o=parseInt(e.querySelector("#tax-month")?.value??String(s.taxMonth),10);s.taxYear=a,s.taxMonth=o,s.taxDeclaration=null,s.actionLoading=!0,m(),Ye(a,o).then(l=>{s.taxDeclaration=l,s.actionLoading=!1,m()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxXML:a}=await g(async()=>{const{generateTaxXML:u}=await Promise.resolve().then(()=>w);return{generateTaxXML:u}},void 0),o=a(s.taxDeclaration),l=new Blob([o],{type:"application/xml;charset=utf-8"}),r=URL.createObjectURL(l),d=document.createElement("a");d.href=r,d.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.xml`,d.click(),URL.revokeObjectURL(r)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxCSV:a}=await g(async()=>{const{generateTaxCSV:u}=await Promise.resolve().then(()=>w);return{generateTaxCSV:u}},void 0),o=a(s.taxDeclaration),l=new Blob([o],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(l),d=document.createElement("a");d.href=r,d.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.csv`,d.click(),URL.revokeObjectURL(r)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{saveTaxDeclaration:a}=await g(async()=>{const{saveTaxDeclaration:o}=await Promise.resolve().then(()=>w);return{saveTaxDeclaration:o}},void 0);try{await a(s.taxDeclaration),alert("下書き保存しました（Supabase tax_declarationsに保存）")}catch(o){alert("保存に失敗: "+(o instanceof Error?o.message:String(o)))}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(a=>{a.addEventListener("change",async()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.taxRow),l=a.dataset.taxField,r=a.type==="number"?Number(a.value)||0:a.value,d=[...s.taxDeclaration.rows];d[o]={...d[o],[l]:r};const{recalculateTaxDeclaration:u}=await g(async()=>{const{recalculateTaxDeclaration:p}=await Promise.resolve().then(()=>w);return{recalculateTaxDeclaration:p}},void 0);s.taxDeclaration=u({...s.taxDeclaration,rows:d}),m()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.dedRow),l=a.dataset.dedField,r=a.type==="number"?Number(a.value)||0:a.value,d=[...s.taxDeclaration.deductions];d[o]={...d[o],[l]:r},s.taxDeclaration={...s.taxDeclaration,deductions:d},m()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const o=a.dataset.taxField;s.taxDeclaration={...s.taxDeclaration,[o]:a.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{recalculateTaxDeclaration:a,TAX_RATE_CATEGORIES:o}=await g(async()=>{const{recalculateTaxDeclaration:d,TAX_RATE_CATEGORIES:u}=await Promise.resolve().then(()=>w);return{recalculateTaxDeclaration:d,TAX_RATE_CATEGORIES:u}},void 0),l=o[0],r={taxCategory:l.code,taxCategoryName:l.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:l.taxRatePerLiter,taxAmount:0};s.taxDeclaration=a({...s.taxDeclaration,rows:[...s.taxDeclaration.rows,r]}),m()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(a=>{a.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.taxRow),{recalculateTaxDeclaration:l}=await g(async()=>{const{recalculateTaxDeclaration:d}=await Promise.resolve().then(()=>w);return{recalculateTaxDeclaration:d}},void 0),r=s.taxDeclaration.rows.filter((d,u)=>u!==o);s.taxDeclaration=l({...s.taxDeclaration,rows:r}),m()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!s.taxDeclaration)return;const a={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};s.taxDeclaration={...s.taxDeclaration,deductions:[...s.taxDeclaration.deductions,a]},m()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(a=>{a.addEventListener("click",()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.dedRow),l=s.taxDeclaration.deductions.filter((r,d)=>d!==o);s.taxDeclaration={...s.taxDeclaration,deductions:l},m()})}),e.querySelectorAll("[data-store-tab]").forEach(a=>{a.addEventListener("click",()=>{s.storeTab=a.dataset.storeTab,m()})}),e.querySelectorAll("[data-import-entity]").forEach(a=>{a.addEventListener("click",()=>{s.importEntity=a.dataset.importEntity,s.importPreview=null,s.importResult=null,m()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const a=In(s.importEntity),o=new Blob([a],{type:"text/csv;charset=utf-8"}),l=URL.createObjectURL(o),r=document.createElement("a");r.href=l,r.download=`template_${s.importEntity}.csv`,r.click(),URL.revokeObjectURL(l)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const o=e.querySelector("#import-file")?.files?.[0];if(!o){alert("CSVファイルを選択してください");return}const l=new FileReader;l.onload=()=>{const r=String(l.result??""),{columns:d,rows:u}=Nn(r);s.importPreview=Pn(s.importEntity,d,u),s.importResult=null,m()},l.readAsText(o,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{s.importPreview=null,s.importResult=null,m()}),e.querySelectorAll("[data-print-template]").forEach(a=>{a.addEventListener("click",()=>{s.printTemplate=a.dataset.printTemplate,m()})}),e.querySelectorAll("[data-print-field]").forEach(a=>{a.addEventListener("change",()=>{const o=a.dataset.printField;let l=a.value;(o==="taxRate"||o==="previousBalance"||o==="paymentAmount")&&(l=Number(a.value)||0),s.printData={...s.printData,[o]:l},m()})}),e.querySelectorAll("[data-print-opt]").forEach(a=>{const o=()=>{const l=a.dataset.printOpt;let r;a.type==="checkbox"?r=a.checked:l==="copies"?r=Number(a.value)||1:l==="overlayOpacity"||l==="calibrationOffsetX"||l==="calibrationOffsetY"?r=Number(a.value)||0:r=a.value,s.printOptions={...s.printOptions,[l]:r},m()};a.addEventListener("change",o),a.type==="range"&&a.addEventListener("input",o)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(a=>{a.addEventListener("change",()=>{const o=Number(a.dataset.printLine),l=a.dataset.printLfield,r=[...s.printData.lines];let d=a.value;(l==="quantity"||l==="unitPrice")&&(d=Number(a.value)||0),r[o]={...r[o],[l]:d},r[o].amount=(Number(r[o].quantity)||0)*(Number(r[o].unitPrice)||0),s.printData={...s.printData,lines:r},m()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{s.printData={...s.printData,lines:[...s.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},m()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.printLine);s.printData={...s.printData,lines:s.printData.lines.filter((l,r)=>r!==o)},m()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(s.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(s.printCompany)),alert("印刷設定を保存しました（次回以降も使えます）")}catch(a){alert("保存失敗: "+(a instanceof Error?a.message:String(a)))}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const a=s.printCompany,o=prompt("会社名",a.name);if(o===null)return;const l=prompt("郵便番号",a.postalCode)??a.postalCode,r=prompt("住所",a.address1)??a.address1,d=prompt("TEL",a.tel)??a.tel,u=prompt("FAX",a.fax)??a.fax,p=prompt("適格請求書登録番号 (T+13桁)",a.registrationNo)??a.registrationNo,y=prompt("取引銀行名",a.bankName)??a.bankName,v=prompt("支店名",a.bankBranch)??a.bankBranch,_=prompt("口座番号",a.bankAccountNo)??a.bankAccountNo,P=prompt("口座名義",a.bankAccountHolder)??a.bankAccountHolder;s.printCompany={...a,name:o,postalCode:l,address1:r,tel:d,fax:u,registrationNo:p,bankName:y,bankBranch:v,bankAccountNo:_,bankAccountHolder:P},m()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{s.fdDesignMode=!s.fdDesignMode,m()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const l=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",r=Ne(a),{savePrintLayout:d}=await g(async()=>{const{savePrintLayout:p}=await Promise.resolve().then(()=>w);return{savePrintLayout:p}},void 0),u={id:`bp1701_${l.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:l,templateKey:"chain_store",positions:r};try{await d(u)?(alert(`☁️ クラウド保存成功: ${l}`),s.fdSavedPositions=r,localStorage.setItem("sake_fd_positions",JSON.stringify(r)),m()):(alert("保存に失敗しました。ローカルには保存されました。"),localStorage.setItem("sake_fd_positions",JSON.stringify(r)))}catch(p){alert("保存エラー: "+(p instanceof Error?p.message:""))}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const o=Ne(a);s.fdSavedPositions=o;try{localStorage.setItem("sake_fd_positions",JSON.stringify(o)),alert(`📁 このPCに保存: ${Object.keys(o).length}件`)}catch(l){alert("保存失敗: "+(l instanceof Error?l.message:""))}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const l={templateKey:"chain_store",positions:Ne(a),exportedAt:new Date().toISOString()},r=new Blob([JSON.stringify(l,null,2)],{type:"application/json"}),d=URL.createObjectURL(r),u=document.createElement("a");u.href=d,u.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,u.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async a=>{const o=a.target.files?.[0];if(o)try{const l=await o.text(),d=JSON.parse(l).positions;if(!d)throw new Error("positions field not found");s.fdSavedPositions=d,localStorage.setItem("sake_fd_positions",JSON.stringify(d)),alert(`📥 インポート成功: ${Object.keys(d).length}件`),m()}catch(l){alert("インポート失敗: "+(l instanceof Error?l.message:""))}});const t=e.querySelector("#fd-saved-layouts");t&&s.route==="/form-designer"&&s.fdDesignMode&&(async()=>{const{fetchPrintLayouts:a}=await g(async()=>{const{fetchPrintLayouts:l}=await Promise.resolve().then(()=>w);return{fetchPrintLayouts:l}},void 0),o=await a("chain_store");o.length===0?t.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(t.innerHTML=`☁️ クラウド保存済み (${o.length}件):<br/>`+o.map(l=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${l.id}" style="margin:4px 4px 0 0;">${l.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${l.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),t.querySelectorAll("[data-action='fd-load-layout']").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.layoutId,d=o.find(u=>u.id===r);d&&(s.fdSavedPositions=d.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(d.positions)),alert(`読込完了: ${d.name}`),m())})}),t.querySelectorAll("[data-action='fd-delete-layout']").forEach(l=>{l.addEventListener("click",async()=>{const r=l.dataset.layoutId;if(!r||!confirm("このレイアウトを削除しますか？"))return;const{deletePrintLayout:d}=await g(async()=>{const{deletePrintLayout:p}=await Promise.resolve().then(()=>w);return{deletePrintLayout:p}},void 0);await d(r)?(alert("削除しました"),m()):alert("削除失敗")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",()=>{confirm("フィールド位置を初期値に戻しますか？")&&(s.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),m())});const i=e.querySelector("#fd-sel-x"),n=e.querySelector("#fd-sel-y");[i,n].forEach(a=>{a?.addEventListener("change",()=>{if(!s.fdActiveFieldId)return;const o=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);o&&(i&&(o.style.left=i.value+"mm"),n&&(o.style.top=n.value+"mm"))})});const c=e.querySelector("#customer-map");c&&s.route==="/map"&&da(c),e.querySelectorAll(".wf-card").forEach(a=>{a.addEventListener("dragstart",o=>{a.classList.add("wf-dragging"),o.dataTransfer?.setData("text/plain",a.dataset.wfOrder??"")}),a.addEventListener("dragend",()=>a.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(a=>{a.addEventListener("dragover",o=>o.preventDefault()),a.addEventListener("drop",o=>{o.preventDefault();const l=o.dataTransfer?.getData("text/plain"),r=a.dataset.wfStage;if(!l||!r)return;const d=s.workflowOrders.find(u=>u.id===l);d&&(d.stage=r,m())})}),e.querySelectorAll("[data-mo-step]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moStep;a.disabled||(s.mobileOrder.step=o,m())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",a=>{s.mobileOrder.customerQuery=a.target.value,m()}),e.querySelector("#mo-product-q")?.addEventListener("input",a=>{s.mobileOrder.productQuery=a.target.value,m()}),e.querySelectorAll("[data-mo-select-customer]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moSelectCustomer,l=s.masterStats?.customers.find(r=>r.id===o);l&&(s.mobileOrder.selectedCustomer=l),m()})}),e.querySelectorAll("[data-mo-add-product]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moAddProduct,l=s.masterStats?.products.find(d=>d.code===o);if(!l)return;const r=1800;s.mobileOrder.cart.push({productCode:l.code,productName:l.name,quantity:1,unit:"本",unitPrice:r,amount:r}),m()})}),e.querySelectorAll("[data-mo-qty]").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.moQty),l=a.dataset.moProduct,r=s.mobileOrder.cart.find(d=>d.productCode===l);r&&(r.quantity=Math.max(0,r.quantity+o),r.amount=r.quantity*r.unitPrice,r.quantity===0&&(s.mobileOrder.cart=s.mobileOrder.cart.filter(d=>d.productCode!==l)),m())})}),e.querySelectorAll("[data-mo-remove]").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.moRemove);s.mobileOrder.cart.splice(o,1),m()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const a=e.querySelector("#mo-memo");s.mobileOrder.memo=a?.value??"";const o="MO"+Date.now().toString().slice(-8);s.mobileOrder.submittedDocNo=o,s.mobileOrder.step="done",m()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{s.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},m()}),e.querySelectorAll("[data-tour-id]").forEach(a=>{a.addEventListener("click",()=>{s.tourActiveId=a.dataset.tourId??null,m()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(a=>{a.addEventListener("click",()=>{const o=s.tourInquiries.find(p=>p.id===s.tourActiveId);if(!o)return;const l=a.dataset.template==="confirm"?hn:vn,r=e.querySelector("#tour-confirmed-time"),d=l.replaceAll("{name}",o.name).replaceAll("{partySize}",String(o.partySize)).replaceAll("{confirmedTime}",r?.value??o.visitDate),u=e.querySelector("#tour-reply-body");u&&(u.value=d)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const a=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",o=s.tourInquiries.find(r=>r.id===a);if(!o)return;const l=e.querySelector("#tour-confirmed-time");o.status="confirmed",o.repliedAt=new Date().toISOString(),o.confirmedTime=l?.value??"",alert("返信メールを下書き保存し、ステータスを確定にしました（実送信はSupabase連携で実装）"),m()}),e.querySelectorAll("[data-action='int-edit']").forEach(a=>{a.addEventListener("click",()=>{s.integrationEditingId=a.dataset.id??null,m()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{s.integrationEditingId=null,m()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='int-save']")?.dataset.id??"",o=s.integrations.find(y=>y.id===a);if(!o)return;const l={...o.config};Object.keys(l).forEach(y=>{const v=e.querySelector(`#int-${y}`);v&&(l[y]=v.value)});const r=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:d,fetchIntegrationSettings:u}=await g(async()=>{const{saveIntegrationSetting:y,fetchIntegrationSettings:v}=await Promise.resolve().then(()=>w);return{saveIntegrationSetting:y,fetchIntegrationSettings:v}},void 0);await d({...o,config:l,isEnabled:r})?(s.integrations=await u(),s.integrationEditingId=null,alert("保存しました"),m()):alert("保存失敗")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(a=>{a.addEventListener("click",async()=>{const o=s.integrations.find(u=>u.provider==="shopify");if(!o){alert("Shopify連携が未設定です");return}a.textContent="同期中…",a.disabled=!0;const{syncShopifyOrders:l,fetchShopifyOrders:r}=await g(async()=>{const{syncShopifyOrders:u,fetchShopifyOrders:p}=await Promise.resolve().then(()=>w);return{syncShopifyOrders:u,fetchShopifyOrders:p}},void 0),d=await l(o);d.error?alert("同期失敗: "+d.error):(alert(`${d.count}件を同期しました`),s.shopifyOrders=await r()),m()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(a=>{a.addEventListener("click",async()=>{const o=s.integrations.find(u=>u.provider==="google_calendar");if(!o)return;a.textContent="同期中…",a.disabled=!0;const{syncGoogleCalendar:l,fetchCalendarEvents:r}=await g(async()=>{const{syncGoogleCalendar:u,fetchCalendarEvents:p}=await Promise.resolve().then(()=>w);return{syncGoogleCalendar:u,fetchCalendarEvents:p}},void 0),d=await l(o);d.error?alert("同期失敗: "+d.error):(alert(`${d.count}件を同期しました`),s.calendarEvents=await r(s.calendarYearMonth)),m()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const o=e.querySelector("#fax-file")?.files?.[0];if(!o){alert("FAX画像を選択してください");return}const l=s.integrations.find(r=>r.provider==="cloud_vision");if(!l||!l.config.api_key){alert("Cloud Vision API Key が設定されていません (/integrations で設定してください)");return}s.faxProcessing=!0,s.faxOcrText=null,m();try{const r=new FileReader;r.onload=async()=>{const d=String(r.result??""),{ocrFaxImage:u,saveFaxRecord:p,fetchFaxInbox:y}=await g(async()=>{const{ocrFaxImage:f,saveFaxRecord:D,fetchFaxInbox:te}=await Promise.resolve().then(()=>w);return{ocrFaxImage:f,saveFaxRecord:D,fetchFaxInbox:te}},void 0),v=await u(l,d),_=e.querySelector("#fax-sender-name")?.value??"",P=e.querySelector("#fax-sender-phone")?.value??"";await p({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:_,senderPhone:P,ocrStatus:v.error?"failed":"done",ocrText:v.text}),s.faxOcrText=v.error?`エラー: ${v.error}`:v.text,s.faxRecords=await y(),s.faxProcessing=!1,m()},r.readAsDataURL(o)}catch(r){alert("OCR失敗: "+(r instanceof Error?r.message:"")),s.faxProcessing=!1,m()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{s.mailSenderEditingId="__new__",m()}),e.querySelectorAll("[data-action='ms-edit']").forEach(a=>{a.addEventListener("click",()=>{s.mailSenderEditingId=a.dataset.id??null,m()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{s.mailSenderEditingId=null,m()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,o={id:a,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:s.mailSenders.find(u=>u.id===a)?.isVerified??!1};if(!o.name||!o.email){alert("名前とメールアドレスは必須です");return}const{saveMailSender:l,fetchMailSenders:r}=await g(async()=>{const{saveMailSender:u,fetchMailSenders:p}=await Promise.resolve().then(()=>w);return{saveMailSender:u,fetchMailSenders:p}},void 0);await l(o)?(s.mailSenders=await r(),s.mailSenderEditingId=null,alert("保存しました"),m()):alert("保存に失敗しました")}),e.querySelectorAll("[data-action='ms-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!confirm("削除しますか？"))return;const o=a.dataset.id??"",{deleteMailSender:l,fetchMailSenders:r}=await g(async()=>{const{deleteMailSender:u,fetchMailSenders:p}=await Promise.resolve().then(()=>w);return{deleteMailSender:u,fetchMailSenders:p}},void 0);await l(o)?(s.mailSenders=await r(),m()):alert("削除失敗")})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(a=>{a.addEventListener("click",async()=>{s.calendarYearMonth=a.dataset.ym??s.calendarYearMonth;const{fetchCalendarEvents:o}=await g(async()=>{const{fetchCalendarEvents:l}=await Promise.resolve().then(()=>w);return{fetchCalendarEvents:l}},void 0);s.calendarEvents=await o(s.calendarYearMonth),m()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async a=>{s.calendarYearMonth=a.target.value;const{fetchCalendarEvents:o}=await g(async()=>{const{fetchCalendarEvents:l}=await Promise.resolve().then(()=>w);return{fetchCalendarEvents:l}},void 0);s.calendarEvents=await o(s.calendarYearMonth),m()}),e.querySelector("#cal-filter-category")?.addEventListener("change",a=>{s.calendarFilterCategory=a.target.value,m()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const a=new Date;s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(a.getTime()+3600*1e3).toISOString(),isAllDay:!1}},m()}),e.querySelectorAll("[data-cal-date]").forEach(a=>{a.tagName!=="BUTTON"&&a.addEventListener("click",o=>{if(o.target.closest(".cal-event"))return;const l=a.dataset.calDate??"";s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${l}T10:00:00`,isAllDay:!1}},m()})}),e.querySelectorAll("[data-cal-event-id]").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation();const l=a.dataset.calEventId,r=s.calendarEvents.find(d=>d.id===l);r&&(s.calendarEdit={isOpen:!0,isNew:!1,event:{...r}},m())})}),e.querySelectorAll("[data-action='cal-close']").forEach(a=>{a.addEventListener("click",o=>{o.currentTarget!==o.target&&!o.target.matches("button")||(s.calendarEdit=null,m())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!s.calendarEdit)return;const{saveCalendarEvent:a,fetchCalendarEvents:o,CALENDAR_CATEGORY_COLORS:l}=await g(async()=>{const{saveCalendarEvent:y,fetchCalendarEvents:v,CALENDAR_CATEGORY_COLORS:_}=await Promise.resolve().then(()=>w);return{saveCalendarEvent:y,fetchCalendarEvents:v,CALENDAR_CATEGORY_COLORS:_}},void 0),r=document.querySelector("[data-action='cal-save']")?.dataset.id||s.calendarEdit.event.id||`evt_${Date.now()}`,d=e.querySelector("#cal-category")?.value??"general",u={id:r,title:e.querySelector("#cal-title")?.value??"",category:d,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:l[d]};if(!u.title){alert("タイトルは必須です");return}await a(u)?(s.calendarEvents=await o(s.calendarYearMonth),s.calendarEdit=null,m()):alert("保存失敗")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!a||!confirm("削除しますか？"))return;const{deleteCalendarEvent:o,fetchCalendarEvents:l}=await g(async()=>{const{deleteCalendarEvent:d,fetchCalendarEvents:u}=await Promise.resolve().then(()=>w);return{deleteCalendarEvent:d,fetchCalendarEvents:u}},void 0);await o(a)?(s.calendarEvents=await l(s.calendarYearMonth),s.calendarEdit=null,m()):alert("削除失敗")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(s.importPreview){s.importing=!0,m();try{const a=s.importPreview.rows.filter(l=>l._valid),o=await Tn(s.importEntity,a);s.importResult=`取り込み完了: ${o.inserted}件成功 / ${o.failed}件失敗`,s.importPreview=null}catch(a){s.importResult=`エラー: ${a instanceof Error?a.message:String(a)}`}finally{s.importing=!1,m()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const a=e.querySelector("#store-date")?.value??s.storeSalesDate;s.storeSalesDate=a,s.storeSales=[],s.actionLoading=!0,m(),He(a).then(o=>{s.storeSales=o,s.actionLoading=!1,m()})}),e.querySelectorAll("[data-action='copy-config']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.configValue??"";if(o)try{await navigator.clipboard.writeText(o),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(l){console.warn("Clipboard copy failed",l)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const o=JSON.stringify({supabase_url:K,supabase_anon_key:F,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),l=new Blob([o],{type:"application/json;charset=utf-8"}),r=URL.createObjectURL(l),d=document.createElement("a");d.href=r,d.download="relay_config.json",d.click(),URL.revokeObjectURL(r)}),e.querySelectorAll("[data-action='copy-code']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.code??"";if(o)try{await navigator.clipboard.writeText(decodeURIComponent(o)),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(l){console.warn("Clipboard code copy failed",l)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(a=>{a.addEventListener("change",()=>{H(e),s.emailSaveMessage=null,m()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(a=>{a.addEventListener("change",()=>{H(e),s.emailSaveMessage=null,m()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{H(e),s.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{H(e),s.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(a=>{a.addEventListener("click",()=>{s.emailTemplateId=a.dataset.templateId??"custom";const o=sa(s.emailTemplateId);s.emailSubject=o.subject,s.emailBody=o.body,s.emailSaveMessage=null,m()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{H(e);const a=`

商品詳細はこちら: https://example.jp/products/seasonal`;s.emailBody.includes("https://example.jp/products/seasonal")||(s.emailBody=`${s.emailBody.trimEnd()}${a}`),s.emailSaveMessage=null,m()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{H(e),s.actionLoading=!0,m(),Se(Te("draft")).then(a=>{s.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(a.updatedAt??new Date().toISOString()))}`,s.actionLoading=!1,m()})}),e.querySelector("#email-sender")?.addEventListener("change",a=>{s.emailSenderId=a.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{H(e),s.actionLoading=!0,s.emailSending=!0,m();const a=Te("sent");s.mailSenders.find(o=>o.id===s.emailSenderId),Gt().then(async o=>{await Se({...a,recipientCount:o.sent}),s.emailSaveMessage=`${o.sent.toLocaleString("ja-JP")} 件送信しました。`,s.actionLoading=!1,s.emailSending=!1,m(),window.alert(`${o.sent}件送信完了`)}).catch(async()=>{await Se(Te("draft")),s.emailSaveMessage="APIキー未設定のため下書きを保存しました。",s.actionLoading=!1,s.emailSending=!1,m(),window.alert("APIキー未設定のため下書き保存しました")})})}function m(){const e=document.querySelector("#app");e&&(e.innerHTML=Zn(),ai(e),s.pickerMode&&e.querySelector("#modal-search")?.focus(),s.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Ze()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const t of["fd-scaler","print-scaler"]){const i=e.querySelector(`#${t}`),n=i?.querySelector(".fd-canvas, .print-preview"),c=n?.querySelector(".print-page")??n;if(!i||!c)continue;const a=i.parentElement?.clientWidth??0,o=c.offsetWidth;if(a>0&&o>0&&o>a-24){const l=(a-24)/o;i.style.transform=`scale(${l})`,i.style.transformOrigin="top left",i.style.height=`${(c.offsetHeight+48)*l}px`}else i.style.transform="",i.style.height=""}}))}async function si(){s.loading=!0,m();try{const[e,t,i,n,c,a,o]=await Promise.all([Pt(),It(),Tt(),jt(),xe(s.invoiceFilter),Ve(s.ledgerCustomerCode),Ot()]);if(s.salesSummary=e,s.paymentStatus=t,s.masterStats=i,s.pipelineMeta=n,s.invoiceRecords=c,s.customerLedger=a,s.salesAnalytics=o,!s.salesFilter.startDate||!s.salesFilter.endDate){const r=[...e.salesRecords].sort((p,y)=>new Date(y.date).getTime()-new Date(p.date).getTime())[0]?.date??new Date().toISOString(),d=new Date(r),u=new Date(d);u.setDate(d.getDate()-30),s.salesFilter={startDate:wt(u.toISOString()),endDate:wt(d.toISOString())}}(!s.invoiceFilter.startDate||!s.invoiceFilter.endDate)&&(s.invoiceFilter={...s.invoiceFilter,startDate:s.salesFilter.startDate,endDate:s.salesFilter.endDate},s.invoiceRecords=await xe(s.invoiceFilter)),s.error=null}catch(e){s.error=e instanceof Error?e.message:"データの取得に失敗しました。"}finally{s.loading=!1,m(),et(s.route)}}window.addEventListener("popstate",()=>{s.route=na(location.pathname),s.currentCategory=We(s.route),s.sidebarOpen=!1,ce(),et(s.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),s.globalSearchOpen=!0,m();return}if(e.key==="Escape"){if(s.globalSearchOpen){ce(),m();return}if(s.pickerMode){_e(),m();return}s.route==="/invoice-entry"&&!s.invoiceSaving&&(ia(),m());return}if(s.route==="/invoice-entry"&&!s.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&la(t)}});s.user=Fe()?ba():null;try{const e=localStorage.getItem("sake_print_options");e&&(s.printOptions={...s.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(s.printCompany={...s.printCompany,...JSON.parse(t)});const i=localStorage.getItem("sake_fd_positions");i&&(s.fdSavedPositions=JSON.parse(i))}catch{}(function(){let t=null,i=0,n=0,c=0,a=0,o=1;document.addEventListener("mousedown",l=>{const r=l.target.closest(".fd-draggable");if(!r||!s.fdDesignMode)return;l.preventDefault();const d=r.closest(".fd-canvas");if(!d)return;const u=d.getBoundingClientRect();if(u.width===0)return;o=228.6/u.width,t=r,i=l.clientX,n=l.clientY,c=parseFloat(r.style.left)||0,a=parseFloat(r.style.top)||0,document.querySelectorAll(".fd-active").forEach(_=>_.classList.remove("fd-active")),r.classList.add("fd-active","fd-dragging"),s.fdActiveFieldId=r.dataset.fdId??null;const p=document.querySelector("#fd-selected-info");p&&(p.textContent=`選択中: ${r.title}`);const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(c)),v&&(v.value=String(a))}),document.addEventListener("mousemove",l=>{if(!t)return;const r=(l.clientX-i)*o,d=(l.clientY-n)*o,u=Math.round((c+r)*2)/2,p=Math.round((a+d)*2)/2;t.style.left=u+"mm",t.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),v&&(v.value=String(p))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",l=>{if(!s.fdDesignMode||!s.fdActiveFieldId||l.key!=="ArrowLeft"&&l.key!=="ArrowRight"&&l.key!=="ArrowUp"&&l.key!=="ArrowDown"||l.target.tagName==="INPUT"||l.target.tagName==="TEXTAREA")return;const r=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);if(!r)return;l.preventDefault();const d=.5;let u=parseFloat(r.style.left)||0,p=parseFloat(r.style.top)||0;l.key==="ArrowLeft"?u-=d:l.key==="ArrowRight"?u+=d:l.key==="ArrowUp"?p-=d:l.key==="ArrowDown"&&(p+=d),r.style.left=u+"mm",r.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),v&&(v.value=String(p))})})();let $e=null;function da(e){const t=window.L;if(!t){e.innerHTML='<div style="padding:40px;text-align:center;color:var(--text-secondary);">Leaflet読込中…</div>',setTimeout(()=>da(e),500);return}if($e){try{$e.remove()}catch{}$e=null}e.innerHTML="";const i=t.map(e);i.setView([35.378,139.295],11),t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}).addTo(i),(s.masterStats?.customers??[]).slice(0,50).forEach((a,o)=>{const l=35.37+o%10*.02+(Math.random()-.5)*.01,r=139.29+Math.floor(o/10)*.04+(Math.random()-.5)*.02;t.marker([l,r]).addTo(i).bindPopup(`<strong>${a.name}</strong><br/><span style="color:#666;">${a.code}</span>`)}),$e=i}si();
