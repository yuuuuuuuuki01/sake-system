(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Wa="modulepreload",Za=function(e){return"/"+e},Ct={},f=function(t,n,l){let r=Promise.resolve();if(n&&n.length>0){let d=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var i=d;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");r=d(n.map(u=>{if(u=Za(u),u in Ct)return;Ct[u]=!0;const p=u.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":Wa,p||(v.as="script"),v.crossOrigin="",v.href=u,c&&v.setAttribute("nonce",c),document.head.appendChild(v),p)return new Promise(($,k)=>{v.addEventListener("load",$),v.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return r.then(o=>{for(const c of o||[])c.status==="rejected"&&a(c.reason);return t().catch(a)})},z="https://loarwnuyvfxiscjjsmiz.supabase.co",O="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function Me(e,t){try{const n=new URL(`/rest/v1/${e}`,z),l=await fetch(n.toString(),{method:"POST",headers:{apikey:O,Authorization:`Bearer ${O}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!l.ok)throw new Error(`HTTP ${l.status}`);return(await l.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function ea(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,z),l=await fetch(n.toString(),{method:"POST",headers:{apikey:O,Authorization:`Bearer ${O}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!l.ok)throw new Error(`HTTP ${l.status}`);return await l.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function rt(e){try{const t=new URL(`/rest/v1/${e}`,z);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:O,Authorization:`Bearer ${O}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const l=n.headers.get("Content-Range");if(l){const r=l.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function _(e,t={}){try{const n=new URL(`/rest/v1/${e}`,z);Object.entries(t).forEach(([r,a])=>{n.searchParams.set(r,a)});const l=await fetch(n.toString(),{method:"GET",headers:{apikey:O,Authorization:`Bearer ${O}`,Accept:"application/json",Prefer:"return=representation"}});if(!l.ok)throw new Error(`HTTP ${l.status}`);return await l.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}const E=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:O,SUPABASE_URL:z,supabaseCount:rt,supabaseInsert:Me,supabaseQuery:_,supabaseRpc:ea},Symbol.toStringTag,{value:"Module"})),ct="sake_auth";function ta(e){localStorage.setItem(ct,JSON.stringify(e))}function aa(){return{apikey:O,"Content-Type":"application/json"}}function es(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),l=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(l))}catch{return null}}async function sa(e,t){const n=await fetch(`${z}/auth/v1/${e}`,{method:"POST",headers:aa(),body:JSON.stringify(t)}),l=await n.json().catch(()=>({}));if(!n.ok)throw new Error(l.error_description??l.msg??`HTTP ${n.status}`);return l}async function ts(e,t){const n=await sa("token?grant_type=password",{email:e,password:t});return ta({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Lt(e,t){const n=await sa("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&ta({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function as(){const e=Fe();if(localStorage.removeItem(ct),!!e?.access_token)try{await fetch(`${z}/auth/v1/logout`,{method:"POST",headers:{...aa(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Fe(){const e=localStorage.getItem(ct);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function ss(){const e=Fe();if(!e)return null;const t=es(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function ns(e){const t=Fe();if(!t)throw new Error("not signed in");const n=await fetch(`${z}/auth/v1/user`,{method:"PUT",headers:{apikey:O,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const l=await n.json().catch(()=>({}));throw new Error(l.msg??`HTTP ${n.status}`)}}const dt={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},ut={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},is={generatedAt:new Date().toISOString(),records:[]},H={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},ls={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},na=ut.salesRecords.map((e,t)=>({...e,itemCount:t%4+1})),os={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},Te={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function C(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function rs(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function cs(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function m(e,t,n=""){for(const l of t){const r=e[l];if(typeof r=="string"&&r.length>0)return r}return n}function ge(e,t,n=0){for(const l of t)if(l in e)return C(e[l]);return n}function R(e,t,n=!0){for(const l of t)if(l in e)return cs(e[l]);return n}function ia(e,t,n){for(const l of t){const r=e[l];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const a=new Date(r);if(!Number.isNaN(a.getTime()))return a.toISOString()}return n}function la(e){return e.slice(0,7)}function pt(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:ia(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:C(e.total_amount??e.billed_amount)}}function Dt(e,t){const n=t.startDate?new Date(`${t.startDate}T00:00:00`):null,l=t.endDate?new Date(`${t.endDate}T23:59:59`):null,r=t.documentNo.trim().toLowerCase(),a=t.customerCode.trim().toLowerCase();return e.filter(i=>{const o=new Date(i.date);return!(n&&o<n||l&&o>l||r&&!i.documentNo.toLowerCase().includes(r)||a&&!i.customerCode.toLowerCase().includes(a))}).sort((i,o)=>new Date(o.date).getTime()-new Date(i.date).getTime())}function Et(e){const t=e.trim().toUpperCase(),n=os[t];if(n)return n;const l=ut.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:l?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function ds(){const e=new Map,t=new Map,n=new Map;return na.forEach((l,r)=>{const a=la(l.date);e.set(a,(e.get(a)??0)+l.amount);const i=t.get(l.customerCode)??{code:l.customerCode,name:l.customerName,amount:0,quantity:0,documents:0};i.amount+=l.amount,i.quantity+=l.itemCount,i.documents+=1,t.set(l.customerCode,i);const o=`P${String(r%4+1).padStart(5,"0")}`,c=Te.productTotals[r%Te.productTotals.length],d=n.get(o)??{code:o,name:c?.name??`商品${r+1}`,amount:0,quantity:0,documents:0};d.amount+=l.amount,d.quantity+=l.itemCount*12,d.documents+=1,n.set(o,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(e.entries()).sort(([l],[r])=>l.localeCompare(r)).map(([l,r])=>({month:l,amount:r})),productTotals:Array.from(n.values()).sort((l,r)=>r.amount-l.amount),customerTotals:Array.from(t.values()).sort((l,r)=>r.amount-l.amount)}}async function P(e,t){try{const n=await fetch(`/${e}`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(n){return console.warn(`Failed to fetch ${e}, using fallback data`,n),t}}async function oa(){const e=await _("daily_sales_summary",{select:"sales_date,sales_amount,document_count",order:"sales_date.desc",limit:"3000"});if(e.length>0){const[t,n]=await Promise.all([_("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),_("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"20"})]),r=new Date().toISOString().slice(0,10),a=r.slice(0,7),i=[...e].sort((y,v)=>y.sales_date.localeCompare(v.sales_date)).map(y=>({date:new Date(`${y.sales_date}T00:00:00Z`).toISOString(),amount:C(y.sales_amount)})),o=i.slice(-30),c=e.reduce((y,v)=>v.sales_date===r?y+C(v.sales_amount):y,0),d=e.reduce((y,v)=>v.sales_date.startsWith(a)?y+C(v.sales_amount):y,0),u=t.filter(y=>C(y.balance_amount)>0),p=n.map((y,v)=>({id:String(y.id??`sale-${v+1}`),documentNo:y.document_no??y.legacy_document_no??"",date:y.sales_date??"",customerCode:y.legacy_customer_code??"",customerName:y.customer_name??y.legacy_customer_code??"",amount:C(y.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:c,todayDelta:0,monthSales:d,monthDelta:0,unpaidCount:u.length,unpaidAmount:u.reduce((y,v)=>y+C(v.balance_amount),0)},dailySales:o,allDailySales:i,salesRecords:p}}return P("data/api/latest/sales-summary.json",ut)}async function ra(){const e=await _("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const l=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${l}-${n+1}`,customerCode:l,customerName:l,billedAmount:C(t.billed_amount),paymentAmount:C(t.paid_amount),balanceAmount:C(t.balance_amount),lastPaymentDate:null,status:rs(t.payment_status)}})}:P("data/api/latest/payment-status.json",is)}async function ca(){const[e,t]=await Promise.all([_("customers"),_("products")]);if(e.length>0||t.length>0){const n=e.length?e.map((r,a)=>{const i=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:m(r,["id","customer_id","code"],`customer-${a+1}`),code:m(r,["code","customer_code","legacy_customer_code"],`C${String(a+1).padStart(4,"0")}`),name:m(r,["name","customer_name","display_name"],`Customer ${a+1}`),kanaName:m(r,["kana_name"],""),shortName:m(r,["short_name"],""),postalCode:m(r,["postal_code"],""),address1:m(r,["address1"],""),address2:m(r,["address2"],""),phone:m(r,["phone"],""),fax:m(r,["fax"],""),staffCode:m(r,["staff_code"],""),businessType:m(r,["business_type"],""),areaCode:m(r,["delivery_area_code"],""),closingDay:ge(r,["closing_day","close_day"],31),paymentDay:ge(r,["payment_day","due_day"],15),billingCycleType:m(r,["billing_cycle_type"],""),priceGroup:String(i.price_group??""),isActive:R(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):H.customers,l=t.length?t.map((r,a)=>({id:m(r,["id","product_id","code"],`product-${a+1}`),code:m(r,["code","product_code","legacy_product_code"],`P${String(a+1).padStart(5,"0")}`),janCode:m(r,["jan_code","jan","barcode"],""),name:m(r,["name","product_name","display_name"],`Product ${a+1}`),category:m(r,["category","category_name","category_code"],"未分類"),isActive:R(r,["is_active","active","enabled"],!0),purchasePrice:ge(r,["purchase_price"],0),salePrice:ge(r,["default_sale_price","sale_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,bottleType:m(r,["bottle_type"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null})):H.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||H.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:H.summary.activeCustomerCount,productCount:t.length||H.summary.productCount,activeProductCount:t.length?l.filter(r=>r.isActive).length:H.summary.activeProductCount},customers:n,products:l}}return P("data/api/latest/master-stats.json",H)}function da(){return P("data/api/latest/pipeline-meta.json",ls)}async function ua(){const e=await ea("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function Ne(e){const[t,n]=await Promise.all([_("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"200"}),_("sales_document_lines",{select:"id,header_id,document_header_id,document_no,amount,line_amount"})]);if(t.length>0){const l=new Map;n.forEach(a=>{const i=String(a.header_id??a.document_header_id??a.document_no??a.id??"");i&&l.set(i,(l.get(i)??0)+1)});const r=t.map((a,i)=>{const o=pt(a,i),c=String(a.id??a.document_no??a.legacy_document_no??"");return{...o,itemCount:l.get(c)??o.itemCount}});return Dt(r,e)}return Dt(na,e)}async function mt(e){const t=e.trim().toUpperCase();if(!t)return Et("");const[n,l,r]=await Promise.all([_("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),_("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),_("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||l.length>0){const a=n.map((c,d)=>{const u=pt(c,d);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),i=l.map((c,d)=>({id:String(c.id??`payment-${d+1}`),date:ia(c,["payment_date","received_date"],new Date().toISOString()),amount:C(c.payment_amount??c.amount),method:c.payment_method??c.method??"入金"})),o=r.find(c=>(c.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:C(o?.balance_amount),salesTotal:a.reduce((c,d)=>c+d.amount,0),paymentTotal:i.reduce((c,d)=>c+d.amount,0),salesHistory:a,paymentHistory:i}}return Et(t)}async function Ve(){const[e,t,n]=await Promise.all([_("daily_sales_summary",{select:"sales_date,sales_amount",order:"sales_date.asc",limit:"365"}),_("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",limit:"500"}),_("sales_document_lines",{select:"id,header_id,document_header_id,document_no,product_code,legacy_product_code,product_name,quantity,amount,line_amount",limit:"1000"})]);if(e.length>0){const l=new Map;e.forEach(i=>{const o=la(i.sales_date);l.set(o,(l.get(o)??0)+C(i.sales_amount))});const r=new Map;t.forEach((i,o)=>{const c=pt(i,o),d=r.get(c.customerCode)??{code:c.customerCode,name:c.customerName,amount:0,quantity:0,documents:0};d.amount+=c.amount,d.documents+=1,r.set(c.customerCode,d)});const a=new Map;return n.forEach((i,o)=>{const c=i.product_code??i.legacy_product_code??`P${String(o+1).padStart(5,"0")}`,d=a.get(c)??{code:c,name:i.product_name??c,amount:0,quantity:0,documents:0};d.amount+=C(i.line_amount??i.amount),d.quantity+=C(i.quantity),d.documents+=1,a.set(c,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(l.entries()).sort(([i],[o])=>i.localeCompare(o)).map(([i,o])=>({month:i,amount:o})).slice(-12),productTotals:a.size>0?Array.from(a.values()).sort((i,o)=>o.amount-i.amount):Te.productTotals,customerTotals:r.size>0?Array.from(r.values()).sort((i,o)=>o.amount-i.amount):Te.customerTotals}}return ds()}const tt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function pa(e){const t=e.lines.reduce((r,a)=>r+a.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Me("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const It={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function ht(e){const t=await _("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],l=C(n.total_amount);return{documentNo:e,invoiceDate:m(n,["sales_date","document_date"],""),customerCode:m(n,["legacy_customer_code","customer_code"],""),customerName:m(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:l,taxAmount:Math.floor(l*10/110),note:""}}return{...It,documentNo:e||It.documentNo}}const us={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function yt(e){return P(`data/api/latest/billing-${e}.json`,{...us,targetYearMonth:e})}const ps=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],ms={generatedAt:new Date().toISOString(),months:ps,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(e=>e*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(e=>e*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(e=>e*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(e=>e*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(e=>e*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function ze(){return P("data/api/latest/sales-report.json",ms)}async function ma(e,t,n){try{return await Me("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}function ha(e){const t=[...e].sort((r,a)=>a.amount-r.amount),n=t.reduce((r,a)=>r+a.amount,0);if(n===0)return[];let l=0;return t.map(r=>{const a=r.amount/n*100;l+=a;const i=l<=70?"A":l<=90?"B":"C";return{...r,ratio:a,cumRatio:l,abcRank:i}})}async function ya(){const[e,t]=await Promise.all([Ve(),ze()]),n=ha(e.customerTotals.map(l=>({code:l.code,name:l.name,amount:l.amount,documents:l.documents})));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function va(){const[e,t]=await Promise.all([Ve(),ze()]),n=ha(e.productTotals.map(i=>({code:i.code,name:i.name,amount:i.amount,quantity:i.quantity}))),l=n.reduce((i,o)=>i+o.amount,0),r=new Set(n.filter(i=>i.abcRank==="A").map(i=>i.name)),a=t.salesByProduct.filter(i=>r.has(i.label));return{generatedAt:new Date().toISOString(),totalAmount:l,ranking:n,months:t.months,monthlyByProduct:a.length>0?a:t.salesByProduct}}const fa={planned:"計画中",active:"仕込中",done:"完了"},hs=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function ba(){return P("data/api/latest/jikomi.json",hs)}const ys=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function ga(){return P("data/api/latest/tanks.json",ys)}const vs=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function $a(){return P("data/api/latest/kentei.json",vs)}const fs=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function at(){return P("data/api/latest/materials.json",fs)}const bs=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],gs=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],$s=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],ws=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function wa(){return P("data/api/latest/purchases.json",bs)}async function ka(){return P("data/api/latest/payables.json",gs)}async function _a(){return P("data/api/latest/bills.json",$s)}async function Sa(){return P("data/api/latest/raw-stock.json",ws)}const xa=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],st={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},ks={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",companyAddress:"神奈川県秦野市堀山下182",companyRepresentative:"金井 和雄",taxOffice:"小田原税務署",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,productionVolume:3800,previousBalance:0,currentAdjustment:0,exportDeduction:100,sampleDeduction:100,taxableVolume:3600,volume:3600,taxRate:100,taxAmount:36e4},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,productionVolume:2900,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:2850,volume:2850,taxRate:100,taxAmount:285e3},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,productionVolume:1250,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:1200,volume:1200,taxRate:100,taxAmount:12e4}],deductions:[{type:"export",categoryCode:"01",volume:100,reason:"シンガポール向け輸出",documentNo:"EX2026-003"},{type:"sample",categoryCode:"01",volume:100,reason:"展示会サンプル出荷"},{type:"sample",categoryCode:"02",volume:50,reason:"品評会出品"},{type:"sample",categoryCode:"03",volume:50,reason:"全国新酒鑑評会出品"}],totalVolume:7650,totalTax:765e3,status:"draft",submittedAt:null};async function vt(e,t){return P(`data/api/latest/tax-${e}-${String(t).padStart(2,"0")}.json`,{...ks,targetYear:e,targetMonth:t})}function q(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Aa(e){const t=e.rows.map(l=>`    <Category>
      <Code>${q(l.taxCategory)}</Code>
      <Name>${q(l.taxCategoryName)}</Name>
      <AlcoholDegree>${l.alcoholDegree}</AlcoholDegree>
      <ProductionVolume>${l.productionVolume}</ProductionVolume>
      <PreviousBalance>${l.previousBalance}</PreviousBalance>
      <CurrentAdjustment>${l.currentAdjustment}</CurrentAdjustment>
      <ExportDeduction>${l.exportDeduction}</ExportDeduction>
      <SampleDeduction>${l.sampleDeduction}</SampleDeduction>
      <TaxableVolume>${l.taxableVolume}</TaxableVolume>
      <TaxRate>${l.taxRate}</TaxRate>
      <TaxAmount>${l.taxAmount}</TaxAmount>
    </Category>`).join(`
`),n=e.deductions.map(l=>`    <Deduction type="${q(l.type)}">
      <CategoryCode>${q(l.categoryCode)}</CategoryCode>
      <Volume>${l.volume}</Volume>
      <Reason>${q(l.reason)}</Reason>${l.documentNo?`
      <DocumentNo>${q(l.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${q(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${q(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${q(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${q(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${q(e.taxOffice)}</TaxOffice>
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
`}function _s(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Ss(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),l=e.rows.map(a=>[a.taxCategory,a.taxCategoryName,a.alcoholDegree,a.productionVolume,a.previousBalance,a.currentAdjustment,a.exportDeduction,a.sampleDeduction,a.taxableVolume,a.taxRate,a.taxAmount].map(_s).join(",")),r=`,合計,,${e.rows.reduce((a,i)=>a+i.productionVolume,0)},,,${e.rows.reduce((a,i)=>a+i.exportDeduction,0)},${e.rows.reduce((a,i)=>a+i.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...l,r].join(`
`)+`
`}function xs(e){const t=e.rows.map(r=>{const a=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),i=Math.round(a*r.taxRate);return{...r,taxableVolume:a,volume:a,taxAmount:i}}),n=t.reduce((r,a)=>r+a.taxableVolume,0),l=t.reduce((r,a)=>r+a.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:l}}async function As(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>E);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Aa(e),submitted_at:e.submittedAt})}const Cs=Array.from({length:10},(e,t)=>({id:`ss${t+1}`,saleDate:"2026-04-15",saleTime:`${9+t}:${String(t*7%60).padStart(2,"0")}`,productCode:`P${String(t%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][t%4],quantity:1+t%3,unitPrice:[2200,1800,980,680][t%4],amount:(1+t%3)*[2200,1800,980,680][t%4],paymentMethod:["cash","card","paypay","cash"][t%4]})),Ls=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function ft(e){return P(`data/api/latest/store-sales-${e}.json`,Cs)}async function Ca(){return P("data/api/latest/store-orders.json",Ls)}async function Ie(e){const t=await Me("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function La(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Ds(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await _("print_layouts",t)).map(l=>({id:m(l,["id"],""),name:m(l,["name"],""),templateKey:m(l,["template_key"],""),positions:l.positions??{},isDefault:R(l,["is_default"],!1),note:m(l,["note"],""),updatedAt:m(l,["updated_at"],"")}))}async function Es(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>E);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},l=await t("print_layouts",n);return l?{id:m(l,["id"],e.id),name:m(l,["name"],e.name),templateKey:m(l,["template_key"],e.templateKey),positions:l.positions??e.positions,isDefault:R(l,["is_default"],!1),note:m(l,["note"],""),updatedAt:m(l,["updated_at"],"")}:null}async function Is(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Ps(){return(await _("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),email:m(t,["email"],""),displayName:m(t,["display_name"],""),signature:m(t,["signature"],""),replyTo:m(t,["reply_to"],""),isDefault:R(t,["is_default"],!1),isVerified:R(t,["is_verified"],!1),note:m(t,["note"],"")}))}async function Ts(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:m(n,["id"],e.id),name:m(n,["name"],e.name),email:m(n,["email"],e.email),displayName:m(n,["display_name"],""),signature:m(n,["signature"],""),replyTo:m(n,["reply_to"],""),isDefault:R(n,["is_default"],!1),isVerified:R(n,["is_verified"],!1)}:null}async function Ns(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const bt={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},gt={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Rs(e){const t=`${e}-01T00:00:00Z`,[n,l]=e.split("-").map(o=>parseInt(o,10)),r=new Date(n,l,0).getDate(),a=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await _("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${a})`,order:"starts_at.asc"})).map(o=>({id:m(o,["id"],""),title:m(o,["title"],""),description:m(o,["description"],""),category:m(o,["category"],"general")||"general",startsAt:m(o,["starts_at"],new Date().toISOString()),endsAt:m(o,["ends_at"],""),isAllDay:R(o,["is_all_day"],!1),location:m(o,["location"],""),attendees:o.attendees??[],relatedCustomerCode:m(o,["related_customer_code"],""),relatedOrderId:m(o,["related_order_id"],""),color:m(o,["color"],""),googleEventId:m(o,["google_event_id"],"")}))}async function js(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??gt[e.category],updated_at:new Date().toISOString()})?e:null}async function Os(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Da(){return(await _("integration_settings",{order:"name.asc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),provider:m(t,["provider"],""),config:t.config??{},isEnabled:R(t,["is_enabled"],!1),lastSyncAt:m(t,["last_sync_at"],""),lastStatus:m(t,["last_status"],"")}))}async function fe(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function qs(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const l=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(l,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const a=await r.json(),{supabaseInsert:i}=await f(async()=>{const{supabaseInsert:c}=await Promise.resolve().then(()=>E);return{supabaseInsert:c}},void 0);let o=0;for(const c of a.orders){const d=`shopify_${c.id}`;await i("shopify_orders",{id:d,shopify_order_id:String(c.id),order_number:String(c.order_number??""),order_date:String(c.created_at??new Date().toISOString()),customer_name:String(c.customer?.first_name??"")+" "+String(c.customer?.last_name??""),customer_email:String(c.customer?.email??""),total_amount:Math.round(parseFloat(String(c.total_price??"0"))),financial_status:String(c.financial_status??""),fulfillment_status:String(c.fulfillment_status??"unfulfilled"),line_items:c.line_items??[],shipping_address:c.shipping_address??null,raw_payload:c}),o++}return await fe({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${o}件取得成功`}),{count:o}}catch(l){return{count:0,error:l instanceof Error?l.message:String(l)}}}async function Ms(){return(await _("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:m(t,["id"],""),shopifyOrderId:m(t,["shopify_order_id"],""),orderNumber:m(t,["order_number"],""),orderDate:m(t,["order_date"],""),customerName:m(t,["customer_name"],""),customerEmail:m(t,["customer_email"],""),totalAmount:C(t.total_amount),financialStatus:m(t,["financial_status"],""),fulfillmentStatus:m(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Fs(e){const t=e.config.refresh_token,n=e.config.client_id,l=e.config.client_secret;if(!t||!n||!l)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:l})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const i=(await r.json()).access_token;return await fe({...e,config:{...e.config,oauth_token:i}}),e.config.oauth_token=i,{token:i}}async function Vs(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const l=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),a=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${l}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let i=await fetch(a,{headers:{Authorization:`Bearer ${t}`}});if(i.status===401){const u=await Fs(e);if(u.error)return{count:0,error:u.error};t=u.token,i=await fetch(a,{headers:{Authorization:`Bearer ${t}`}})}if(!i.ok)return{count:0,error:`HTTP ${i.status}`};const o=await i.json(),{supabaseInsert:c}=await f(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>E);return{supabaseInsert:u}},void 0);let d=0;for(const u of o.items){const p=`gcal_${u.id}`,y=u.start?.dateTime??u.start?.date??"",v=u.end?.dateTime??u.end?.date??"";await c("calendar_events",{id:p,title:String(u.summary??"(無題)"),description:String(u.description??""),category:"general",starts_at:String(y),ends_at:String(v),location:String(u.location??""),google_event_id:String(u.id??""),updated_at:new Date().toISOString()}),d++}return await fe({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(l){return{count:0,error:l instanceof Error?l.message:String(l)}}}async function zs(){return(await _("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:m(t,["id"],""),receivedAt:m(t,["received_at"],""),senderPhone:m(t,["sender_phone"],""),senderName:m(t,["sender_name"],""),imageUrl:m(t,["image_url"],""),ocrStatus:m(t,["ocr_status"],"pending")||"pending",ocrText:m(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:m(t,["linked_invoice_id"],"")}))}async function Js(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const l=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(l){return{text:"",error:l instanceof Error?l.message:String(l)}}}async function Bs(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Re={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},je={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Us(){return(await _("user_profiles",{order:"display_name.asc"})).map(t=>({id:m(t,["id"],""),email:m(t,["email"],""),displayName:m(t,["display_name"],""),staffCode:m(t,["staff_code"],""),department:m(t,["department"],"all")||"all",role:m(t,["role"],"staff")||"staff",defaultMailSenderId:m(t,["default_mail_sender_id"],""),phone:m(t,["phone"],""),avatarUrl:m(t,["avatar_url"],""),isActive:R(t,["is_active"],!0),lastSignInAt:m(t,["last_sign_in_at"],""),createdAt:m(t,["created_at"],"")}))}async function Ys(e){if(!e)return null;const t=await _("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:m(n,["id"],""),email:m(n,["email"],""),displayName:m(n,["display_name"],""),staffCode:m(n,["staff_code"],""),department:m(n,["department"],"all")||"all",role:m(n,["role"],"staff")||"staff",defaultMailSenderId:m(n,["default_mail_sender_id"],""),phone:m(n,["phone"],""),avatarUrl:m(n,["avatar_url"],""),isActive:R(n,["is_active"],!0),lastSignInAt:m(n,["last_sign_in_at"],"")}}async function Hs(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Xs(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Gs(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>E);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Ks(e=100){return(await _("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),action:m(n,["action"],""),entityType:m(n,["entity_type"],""),entityId:m(n,["entity_id"],""),userEmail:m(n,["user_email"],""),changes:n.changes??{},createdAt:m(n,["created_at"],"")}))}const Oe={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Ea(){return(await _("slack_notifications",{order:"event_type.asc"})).map(t=>({id:m(t,["id"],""),eventType:m(t,["event_type"],"new_order"),enabled:R(t,["enabled"],!0),channel:m(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:m(t,["last_triggered_at"],"")}))}async function Qs(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function Ws(e=50){return(await _("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),eventType:m(n,["event_type"],""),channel:m(n,["channel"],""),message:m(n,["message"],""),status:m(n,["status"],"sent"),error:m(n,["error"],""),sentAt:m(n,["sent_at"],"")}))}async function Zs(e,t,n){const r=(await Da()).find(d=>d.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const a=r.config.webhook_url;if(!a)return{ok:!1,error:"Webhook URL未設定"};const o=(await Ea()).find(d=>d.eventType===e&&d.enabled);if(!o)return{ok:!1,error:"通知ルールが無効"};const c=n??o.channel??r.config.default_channel??"#general";try{const d=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Oe[e]} ${t}`,channel:c})}),u=d.ok,{supabaseInsert:p}=await f(async()=>{const{supabaseInsert:y}=await Promise.resolve().then(()=>E);return{supabaseInsert:y}},void 0);return await p("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:c,message:t,status:u?"sent":"failed",error:u?null:`HTTP ${d.status}`}),u?{ok:!0}:{ok:!1,error:`HTTP ${d.status}`}}catch(d){return{ok:!1,error:d instanceof Error?d.message:String(d)}}}const be={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Je={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function en(){return(await _("prospects",{order:"updated_at.desc"})).map(t=>({id:m(t,["id"],""),companyName:m(t,["company_name"],""),contactName:m(t,["contact_name"],""),email:m(t,["email"],""),phone:m(t,["phone"],""),address:m(t,["address"],""),website:m(t,["website"],""),businessType:m(t,["business_type"],""),stage:m(t,["stage"],"cold"),source:m(t,["source"],""),expectedAmount:C(t.expected_amount),probability:C(t.probability),assignedStaffCode:m(t,["assigned_staff_code"],""),nextActionDate:m(t,["next_action_date"],""),nextAction:m(t,["next_action"],""),note:m(t,["note"],""),lastContactAt:m(t,["last_contact_at"],""),wonAt:m(t,["won_at"],""),lostAt:m(t,["lost_at"],""),lostReason:m(t,["lost_reason"],""),convertedCustomerCode:m(t,["converted_customer_code"],""),createdAt:m(t,["created_at"],"")}))}async function Ia(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function tn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function an(e){return(await _("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:m(n,["id"],""),prospectId:m(n,["prospect_id"],""),activityType:m(n,["activity_type"],"call"),title:m(n,["title"],""),description:m(n,["description"],""),activityDate:m(n,["activity_date"],""),result:m(n,["result"],""),staffCode:m(n,["staff_code"],"")}))}async function sn(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const Pa=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function nn(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function ln(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function on(){return(await _("delivery_locations",{order:"name.asc"})).map(t=>({id:m(t,["id"],""),customerCode:m(t,["customer_code"],""),name:m(t,["name"],""),postalCode:m(t,["postal_code"],""),address:m(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:m(t,["contact_name"],""),phone:m(t,["phone"],""),deliveryNote:m(t,["delivery_note"],""),isActive:R(t,["is_active"],!0)}))}async function rn(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function cn(e=50){return(await _("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),callDirection:m(n,["call_direction"],"inbound"),fromNumber:m(n,["from_number"],""),toNumber:m(n,["to_number"],""),matchedCustomerCode:m(n,["matched_customer_code"],""),matchedProspectId:m(n,["matched_prospect_id"],""),durationSeconds:C(n.duration_seconds),callStatus:m(n,["call_status"],"answered"),recordingUrl:m(n,["recording_url"],""),transcript:m(n,["transcript"],""),ivryCallId:m(n,["ivry_call_id"],""),startedAt:m(n,["started_at"],""),endedAt:m(n,["ended_at"],""),notes:m(n,["notes"],"")}))}async function Ta(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function dn(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const l=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(l,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const i=(await r.json()).calls??[];let o=0;for(const c of i)await Ta({id:`ivry_${c.id}`,callDirection:String(c.direction??"inbound"),fromNumber:String(c.from??""),toNumber:String(c.to??""),durationSeconds:Number(c.duration??0),callStatus:String(c.status??"answered"),recordingUrl:String(c.recording_url??""),startedAt:String(c.started_at??""),endedAt:String(c.ended_at??""),ivryCallId:String(c.id??"")}),o++;return await fe({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${o}件取得`}),{count:o}}catch(l){return{count:0,error:l instanceof Error?l.message:String(l)}}}async function un(e,t){const n=e.config.api_key,l=e.config.team_id;if(!n||!l)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const a of t){if(!a.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${l}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:a.name,phone_number:a.phone,external_id:a.customerCode??"",note:a.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function pn(){return(await _("lead_lists",{order:"created_at.desc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),query:m(t,["query"],""),area:m(t,["area"],""),businessType:m(t,["business_type"],""),totalCount:C(t.total_count),source:m(t,["source"],"manual"),createdAt:m(t,["created_at"],"")}))}async function mn(e){return(await _("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:m(n,["id"],""),listId:m(n,["list_id"],""),companyName:m(n,["company_name"],""),address:m(n,["address"],""),phone:m(n,["phone"],""),website:m(n,["website"],""),email:m(n,["email"],""),businessType:m(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:C(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:m(n,["place_id"],""),status:m(n,["status"],"new"),convertedProspectId:m(n,["converted_prospect_id"],""),note:m(n,["note"],"")}))}async function hn(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function Na(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function yn(e,t,n){const l=e.config.api_key;if(!l)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),a=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${l}`;try{const i=await fetch(a);if(!i.ok)return{results:[],error:`HTTP ${i.status}`};const o=await i.json();return o.status!=="OK"&&o.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${o.status}`}:{results:o.results.map(d=>{const u=d.geometry?.location;return{id:`place_${d.place_id}`,listId:"",companyName:String(d.name??""),address:String(d.formatted_address??""),rating:d.rating?Number(d.rating):void 0,reviewCount:d.user_ratings_total?Number(d.user_ratings_total):void 0,lat:u?.lat,lng:u?.lng,placeId:String(d.place_id??""),status:"new"}})}}catch(i){return{results:[],error:i instanceof Error?i.message:String(i)}}}async function vn(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await Ia(t);return n&&await Na({...e,status:"imported",convertedProspectId:t.id}),n}async function fn(){return(await _("workflow_orders",{order:"order_date.desc"})).map(t=>({id:m(t,["id"],""),orderNo:m(t,["order_no"],""),customerName:m(t,["customer_name"],""),customerCode:m(t,["customer_code"],""),orderDate:m(t,["order_date"],""),deliveryDate:m(t,["delivery_date"],""),stage:m(t,["stage"],"new"),totalAmount:C(t.total_amount),itemCount:C(t.item_count),priority:m(t,["priority"],"normal"),staffName:m(t,["staff_name"],""),notes:m(t,["notes"],"")}))}async function bn(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function gn(){return(await _("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),email:m(t,["email"],""),phone:m(t,["phone"],""),visitDate:m(t,["visit_date"],""),partySize:C(t.party_size)||1,language:m(t,["language"],"ja"),purpose:m(t,["purpose"],""),message:m(t,["message"],""),status:m(t,["status"],"new"),repliedAt:m(t,["replied_at"],""),confirmedTime:m(t,["confirmed_time"],""),createdAt:m(t,["created_at"],new Date().toISOString())}))}async function $n(e){const{supabaseInsert:t}=await f(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>E);return{supabaseInsert:l}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const wn=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function Ra(){return(await Promise.all(wn.map(async t=>{const[n,l]=await Promise.all([rt(t.table),_(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:l[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Pe(e,t,n=100){const l=(t-1)*n,[r,a]=await Promise.all([_(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(l)}),rt(e)]);return{records:r,total:a}}async function nt(e){const t=await _("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const l=JSON.parse(n);return String(l.price_group??"")}catch{return""}return""}async function ja(e,t){if(e){const l=await _("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(l.length>0&&l[0].special_price)return C(l[0].special_price)}const n=await _("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?C(n[0].default_sale_price):0}const g=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:gt,CALENDAR_CATEGORY_LABELS:bt,DEPT_LABELS:je,INVOICE_TYPE_LABELS:tt,JIKOMI_STATUS_LABELS:fa,MATERIAL_CATEGORIES:Pa,PROSPECT_STAGE_COLORS:Je,PROSPECT_STAGE_LABELS:be,ROLE_LABELS:Re,SEASONAL_TEMPLATES:dt,SLACK_EVENT_LABELS:Oe,TAX_DEDUCTION_LABELS:st,TAX_RATE_CATEGORIES:xa,convertLeadToProspect:vn,deleteCalendarEvent:Os,deleteMailSender:Ns,deleteMaterial:ln,deletePrintLayout:Is,deleteProspect:tn,deleteUserProfile:Xs,fetchAuditLogs:Ks,fetchBillList:_a,fetchBillingSummary:yt,fetchCalendarEvents:Rs,fetchCallLogs:cn,fetchCustomerAnalysis:ya,fetchCustomerLedger:mt,fetchCustomerPriceGroup:nt,fetchDeliveryLocations:on,fetchDeliveryNote:ht,fetchFaxInbox:zs,fetchIntegrationSettings:Da,fetchInvoices:Ne,fetchJikomiList:ba,fetchKenteiList:$a,fetchLeadItems:mn,fetchLeadLists:pn,fetchMailSenders:Ps,fetchMasterStats:ca,fetchMaterialList:at,fetchMyProfile:Ys,fetchPayableList:ka,fetchPaymentStatus:ra,fetchPipelineMeta:da,fetchPrintLayouts:Ds,fetchProductABC:va,fetchProductPrice:ja,fetchProspectActivities:an,fetchProspects:en,fetchPurchaseList:wa,fetchRawMaterialStock:Sa,fetchRawRecords:Pe,fetchRawTableList:Ra,fetchSalesAnalytics:Ve,fetchSalesReport:ze,fetchSalesSummary:oa,fetchShopifyOrders:Ms,fetchSlackLogs:Ws,fetchSlackRules:Ea,fetchStoreOrders:Ca,fetchStoreSales:ft,fetchSyncDashboard:ua,fetchTankList:ga,fetchTaxDeclaration:vt,fetchTourInquiriesFromDb:gn,fetchUserProfiles:Us,fetchWorkflowOrdersFromDb:fn,generateTaxCSV:Ss,generateTaxXML:Aa,ocrFaxImage:Js,recalculateTaxDeclaration:xs,recordAudit:Gs,saveCalendarEvent:js,saveCallLog:Ta,saveDeliveryLocation:rn,saveEmailCampaign:Ie,saveFaxRecord:Bs,saveIntegrationSetting:fe,saveInvoice:pa,saveLeadItem:Na,saveLeadList:hn,saveMailSender:Ts,saveMaterial:nn,savePrintLayout:Es,saveProspect:Ia,saveProspectActivity:sn,saveSlackRule:Qs,saveTaxDeclaration:As,saveTourInquiry:$n,saveUserProfile:Hs,saveWorkflowOrder:bn,searchPlaces:yn,sendEmailCampaign:La,sendSlackNotification:Zs,submitFeatureRequest:ma,syncGoogleCalendar:Vs,syncIvryCallLogs:dn,syncPhoneBookToIvry:un,syncShopifyOrders:qs},Symbol.toStringTag,{value:"Module"}));function te(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const kn={open:"未締め",closed:"締め済"};function _n(e,t){const n=e.customers.map(l=>`
      <tr>
        <td>
          <div class="table-title">${l.customerName}</div>
          <div class="table-sub mono">${l.customerCode}</div>
        </td>
        <td class="numeric">${l.closingDay}日</td>
        <td class="numeric">${te(l.salesAmount)}</td>
        <td class="numeric">${te(l.taxAmount)}</td>
        <td class="numeric">${te(l.prevBalance)}</td>
        <td class="numeric">${te(l.paymentAmount)}</td>
        <td class="numeric"><strong>${te(l.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${l.status==="closed"?"success":"warning"}">${kn[l.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="billing-print" data-code="${l.customerCode}" ${l.status==="closed"?"":"disabled"}>請求書</button>
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
            ${[10,15,20,25,31].map(l=>`<option value="${l}" ${e.closingDay===l?"selected":""}>${l}日締め</option>`).join("")}
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
        <p class="kpi-value">${te(e.totalBilling)}</p>
        <p class="kpi-sub">${e.targetYearMonth} / ${e.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${e.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${e.customers.filter(l=>l.status==="closed").length} 社</p>
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
  `}const Sn={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"},{title:"🗺️ 取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"📋 受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"📱 モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"🏭 酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"✉️ メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"📅 カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"🔌 外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"🛍️ Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"📠 FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"},{title:"👥 ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"👤 プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"🔍 操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"},{title:"🎯 新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"💬 Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"📞 通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"🎯 リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"}]},xn={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},more:{eyebrow:"その他トップ",title:"周辺業務メニュー",description:"税務、店舗、分析、設定などの補助機能をまとめて配置しています。"}};function Pt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $e(e){const t=xn[e],n=Sn[e].map(l=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Pt(l.title)}</p>
            <p class="category-card-description">${Pt(l.description)}</p>
          </div>
          <div class="category-card-actions">
            <button class="button secondary" type="button" data-link="${l.path}">
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
  `}function Oa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function me(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function An(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${Oa(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${me(t.amount)}</td>
        </tr>
      `).join("")}function Cn(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${Oa(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${me(t.amount)}</td>
        </tr>
      `).join("")}function Ln(e,t){return`
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
            <dd>${me(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${me(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${me(e.balanceAmount)}</dd>
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
            <tbody>${An(e)}</tbody>
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
            <tbody>${Cn(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}const Ye={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間"};function Dn(e,t){if(t==="all")return e;const n=new Date,l=n.toISOString().slice(0,10),r=new Date(n);switch(t){case"today":return e.filter(a=>a.date.slice(0,10)===l);case"month":return e.filter(a=>a.date.slice(0,7)===l.slice(0,7));case"90days":return r.setDate(r.getDate()-90),e.filter(a=>a.date>=r.toISOString());case"year":return r.setFullYear(r.getFullYear()-1),e.filter(a=>a.date>=r.toISOString())}}function le(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function we(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function oe(e,t){for(const n of t){const l=e[n];if(typeof l=="number"&&Number.isFinite(l))return l;if(typeof l=="string"){const r=Number(l);if(Number.isFinite(r))return r}}return null}function En(e){const t=e?.productTotals;if(!t||t.length===0)return"―";const n=t.reduce((r,a)=>{const i=oe(a,["amount","salesAmount"]),o=oe(a,["marginRate","grossMarginRate"]);return i===null||i<=0||o===null?r:{weightedAmount:r.weightedAmount+i,weightedRate:r.weightedRate+i*o}},{weightedAmount:0,weightedRate:0});if(n.weightedAmount>0)return`${(n.weightedRate/n.weightedAmount).toFixed(1)}%`;const l=t.reduce((r,a)=>{const i=a,o=oe(i,["amount","salesAmount"]),c=oe(i,["grossProfit","grossAmount","margin"]),d=oe(i,["costAmount","cost","costPrice"]);if(o===null||o<=0)return r;const u=c??(d!==null?o-d:null);return u===null?r:{sales:r.sales+o,gross:r.gross+u}},{sales:0,gross:0});return l.sales>0?`${(l.gross/l.sales*100).toFixed(1)}%`:"―"}function In(e){const l={top:20,right:20,bottom:30,left:50},r=760-l.left-l.right,a=260-l.top-l.bottom,i=Math.max(...e.map(u=>u.amount),1),o=r/e.length,c=e.map((u,p)=>{const y=u.amount/i*a,v=l.left+p*o+4,$=l.top+a-y,k=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${v}" y="${$}" width="${Math.max(o-8,8)}" height="${y}" rx="4" fill="#0F5B8D" opacity="${.58+p/e.length*.34}" />
          ${p%5===0?`<text x="${v+6}" y="252" class="chart-axis">${k}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=l.top+a-a*u,y=Math.round(i*u/1e3);return`
        <g>
          <line x1="${l.left}" y1="${p}" x2="${760-l.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${y.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${c}
    </svg>
  `}function Pn(e,t,n,l,r="month"){const a={success:"正常",warning:"注意",error:"異常",running:"実行中"},i=Dn(e.allDailySales,r),o=i.reduce((p,y)=>p+y.amount,0),c=i.length,d=e.salesRecords.slice(0,10).map(p=>`
            <tr>
              <td class="mono">${p.documentNo}</td>
              <td>${we(p.date)}</td>
              <td>${p.customerName}</td>
              <td class="numeric">${le(p.amount)}</td>
            </tr>
          `).join(""),u=["today","month","90days","year","all"].map(p=>`<button class="button ${p===r?"primary":"secondary"} small" type="button" data-period="${p}">${Ye[p]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${a[t.status]}</span>
        <span class="meta-note">最終同期 ${we(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${u}</div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${le(e.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${e.kpis.todayDelta>0?"+":""}${e.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">${Ye[r]}売上</p>
        <p class="kpi-value">${le(o)}</p>
        <p class="kpi-sub">${c}日間${c>0?` / 日平均 ${le(Math.round(o/c))}`:""}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${le(e.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${En(n)}</p>
        <p class="kpi-sub">売上分析データから集計</p>
      </article>
    </section>

    ${l?.masterCounts?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先マスタ</p>
        <p class="kpi-value">${l.masterCounts.customers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品マスタ</p>
        <p class="kpi-value">${l.masterCounts.products.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">仕入先</p>
        <p class="kpi-value">${l.masterCounts.suppliers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
    </section>
    `:""}

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">${Ye[r]} (${i.length}日分)</p>
          </div>
        </div>
        ${In(i.length>0?i:e.dailySales)}
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
              <dd>${we(t.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${we(t.generatedAt)}</dd>
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
          <tbody>${d}</tbody>
        </table>
      </div>
    </section>

    ${l?Tn(l):""}

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>機能要望・フィードバック</h2>
          <p class="panel-caption">改善のご要望やバグ報告をお寄せください</p>
        </div>
      </div>
      <form id="feature-request-form" class="feature-form">
        <div class="form-row">
          <label for="fr-title">タイトル</label>
          <input type="text" id="fr-title" placeholder="要望の概要" required />
        </div>
        <div class="form-row">
          <label for="fr-category">カテゴリ</label>
          <select id="fr-category">
            <option value="feature">機能追加</option>
            <option value="improvement">改善</option>
            <option value="bug">バグ報告</option>
            <option value="question">質問</option>
          </select>
        </div>
        <div class="form-row">
          <label for="fr-description">詳細</label>
          <textarea id="fr-description" rows="3" placeholder="具体的な内容"></textarea>
        </div>
        <button type="submit" class="button primary">送信</button>
        <span id="fr-result" class="fr-result"></span>
      </form>
    </section>
  `}function Tn(e){const t=e.prospects.reduce((i,o)=>i+o.expectedAmount*o.probability/100,0),n=e.prospects.filter(i=>i.stage==="hot"||i.stage==="negotiating").length,l=new Date().toISOString().slice(0,10),r=e.upcomingEvents.filter(i=>i.startsAt.slice(0,10)>=l).slice(0,5),a=e.tourInquiries.filter(i=>i.status==="new").length;return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">受注処理中</p>
        <p class="kpi-value">${e.workflowOrdersCount.new+e.workflowOrdersCount.picking+e.workflowOrdersCount.packed}件</p>
        <p class="kpi-sub">新規 ${e.workflowOrdersCount.new} / ピッキング ${e.workflowOrdersCount.picking} / 梱包 ${e.workflowOrdersCount.packed}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規営業</p>
        <p class="kpi-value">¥${Math.round(t).toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">${e.prospects.length}件 / ホット ${n}</p>
      </article>
      <article class="panel kpi-card ${a>0?"kpi-alert":""}">
        <p class="panel-title">未対応問合せ</p>
        <p class="kpi-value">${a}件</p>
        <p class="kpi-sub">蔵見学申込</p>
      </article>
      <article class="panel kpi-card ${e.lowStockCount>0?"kpi-alert":""}">
        <p class="panel-title">低在庫</p>
        <p class="kpi-value">${e.lowStockCount}品目</p>
        <p class="kpi-sub">要補充</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div><h2>🎯 営業パイプライン</h2><p class="panel-caption">ステージ別件数</p></div>
          <button class="button secondary" data-link="/prospects">詳細を見る</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));gap:8px;">
          ${["cold","warm","hot","contacted","negotiating","won"].map(i=>{const o=e.prospects.filter(d=>d.stage===i).length,c=e.prospects.filter(d=>d.stage===i).reduce((d,u)=>d+u.expectedAmount,0);return`
              <div style="background:${Je[i]};color:white;padding:12px;border-radius:6px;text-align:center;">
                <div style="font-size:11px;">${be[i]}</div>
                <div style="font-size:20px;font-weight:700;margin:4px 0;">${o}</div>
                <div style="font-size:10px;opacity:0.9;">¥${(c/1e4).toFixed(0)}万</div>
              </div>
            `}).join("")}
        </div>
      </article>

      <aside class="panel">
        <div class="panel-header">
          <div><h2>📅 直近の予定</h2></div>
          <button class="button secondary" data-link="/calendar">カレンダー</button>
        </div>
        ${r.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${r.map(i=>{const o=new Date(i.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${i.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${o.getMonth()+1}/${o.getDate()} ${i.isAllDay?"終日":o.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${i.title}</div>
                  ${i.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${i.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>
  `}function Nn(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function ae(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Rn(e,t){const n=e.lines.length?e.lines.map((r,a)=>`
          <tr>
            <td class="numeric">${a+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${ae(r.unitPrice)}</td>
            <td class="numeric">${ae(r.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',l=e.totalAmount-e.taxAmount;return`
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
            <tr><th>納品日</th><td>${Nn(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${ae(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${ae(l)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${ae(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${ae(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function F(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function jn(e){return F(e).replaceAll(`
`,"<br />")}function On(e){const n=[...Object.values(dt),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${F(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),l=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${F(r.name)}</span>
              <span class="table-sub">${F(r.email)} / ${F(r.area)}</span>
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
          ${l}
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
          <input id="email-subject" type="text" value="${F(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${F(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${F(r.name)} &lt;${F(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${F(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?jn(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${F(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function M(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ke(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function qn(e,t){const n=[ke("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${M(r.name)}</strong>
            <span class="table-sub mono">${M(r.code)}</span>
          </button>
        `)),ke("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${M(r.name)}</strong>
            <span class="table-sub mono">${M(r.code)}</span>
          </button>
        `)),ke("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${M(r.documentNo)}</strong>
            <span class="table-sub">${M(r.customerName)} / ${M(r.date)}</span>
          </button>
        `)),ke("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${M(r.path)}"
          >
            <strong>${M(r.title)}</strong>
            <span class="table-sub mono">${M(r.path)}</span>
          </button>
        `))].filter(Boolean).join(""),l=e.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
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
            value="${M(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||l}
          </div>
        </div>
      </div>
    </div>
  `}function re(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function qa(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${re(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${re(e.title)}">
        <div class="modal-header">
          <h2>${re(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${re(e.placeholder)}"
            value="${re(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function _e(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Tt(e){return e.trim().toLowerCase()}function Mn(e,t){const n=Tt(t),l=e.filter(a=>n?[a.code,a.name,a.name].map(Tt).some(i=>i.includes(n)):!0).slice(0,50),r=l.length?`
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
              ${l.map(a=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${_e(a.code)}"
                      data-name="${_e(a.name)}"
                    >
                      <td class="mono">${_e(a.code)}</td>
                      <td>${_e(a.name)}</td>
                      <td>${a.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return qa({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function Fn(e){return e.toISOString().slice(0,10)}function Z(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function X(e,t){return e[t]?`<div class="field-error">${Z(e[t])}</div>`:""}function se(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function Vn(e,t,n,l){const r=Object.keys(tt).map(c=>`<option value="${c}" ${e.invoiceType===c?"selected":""}>${tt[c]}</option>`).join(""),a=e.lines.map((c,d)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${se(l,`lines.${d}.productCode`,"input-cell")}" type="text" data-line="${d}" data-field="productCode" value="${Z(c.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${d}" aria-label="商品検索">🔍</button>
          </div>
          ${X(l,`lines.${d}.productCode`)}
        </td>
        <td>
          <input class="${se(l,`lines.${d}.productName`,"input-cell")}" type="text" data-line="${d}" data-field="productName" value="${Z(c.productName)}" placeholder="商品名" />
          ${X(l,`lines.${d}.productName`)}
        </td>
        <td>
          <input class="${se(l,`lines.${d}.quantity`,"input-cell numeric")}" type="number" data-line="${d}" data-field="quantity" value="${c.quantity}" min="0" />
          ${X(l,`lines.${d}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${d}" data-field="unit" value="${c.unit}" placeholder="本" /></td>
        <td>
          <input class="${se(l,`lines.${d}.unitPrice`,"input-cell numeric")}" type="number" data-line="${d}" data-field="unitPrice" value="${c.unitPrice}" min="0" />
          ${X(l,`lines.${d}.unitPrice`)}
        </td>
        <td class="numeric">${c.amount>0?c.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${d}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${d}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),i=e.lines.reduce((c,d)=>c+d.amount,0),o=Math.floor(i*10/110);return`
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
          <select id="inv-type">${r}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${se(l,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Fn(new Date)}" />
          ${X(l,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${se(l,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Z(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${X(l,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${Z(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${Z(e.staffCode)}" />
        </label>
      </div>
      ${X(l,"lines")}
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
          <span class="total-value">${(i-o).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${o.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${i.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Z(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function zn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Jn(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Bn(e,t){const n=e.length?e.map(l=>`
            <tr>
              <td class="mono">${l.documentNo}</td>
              <td>${zn(l.date)}</td>
              <td>
                <div class="table-title">${l.customerName}</div>
                <div class="table-sub mono">${l.customerCode}</div>
              </td>
              <td class="numeric">${l.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Jn(l.amount)}</td>
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
  `}function Un(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Yn(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Ma(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Fa(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Nt(e){const t=Ma(Fa(e),6);return t.setHours(23,59,59,999),t}function Rt(e){return new Date(`${e}T00:00:00`)}function jt(e){return`${e.getMonth()+1}/${e.getDate()}`}function Hn(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Xn(){const e=new Date,t=Fa(Yn(Un(e),-3)),n=Nt(new Date(e.getFullYear(),e.getMonth()+4,0)),l=[];let r=new Date(t);for(;r<=n;){const a=Nt(r);l.push({start:new Date(r),end:a,label:`${jt(r)} - ${jt(a)}`}),r=Ma(r,7)}return l}function Gn(e){const t=Xn(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,l=t.map(a=>`
        <div class="gantt-week">
          <span>${a.label}</span>
        </div>
      `).join(""),r=e.length?e.map(a=>{const i=Rt(a.startDate),o=Rt(a.expectedDoneDate),c=Math.max(0,t.findIndex(p=>p.end>=i)),d=Math.max(c,t.reduce((p,y,v)=>y.start<=o?v:p,c)),u=[`仕込番号: ${a.jikomiNo}`,`銘柄: ${a.productName}`,`期間: ${a.startDate} - ${a.expectedDoneDate}`,`タンク: ${a.tankNo}`,`備考: ${a.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${a.jikomiNo}</strong>
                <span class="table-sub">${a.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${a.status}"
                  style="grid-column:${c+1} / ${d+2}"
                  title="${Hn(u)}"
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
        <div class="gantt-grid" style="grid-template-columns:${n}">
          <div class="gantt-corner">仕込</div>
          ${l}
        </div>
        ${r}
      </div>
    </section>
  `}function Ot(e,t){const n={planned:"neutral",active:"warning",done:"success"},l=e.map(o=>`
      <tr>
        <td class="mono">${o.jikomiNo}</td>
        <td>${o.productName}</td>
        <td>${o.riceType}</td>
        <td class="numeric">${o.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${o.actualKg>0?o.actualKg.toLocaleString("ja-JP")+" kg":"―"}</td>
        <td>${o.startDate}</td>
        <td>${o.expectedDoneDate}</td>
        <td class="mono">${o.tankNo}</td>
        <td>
          <span class="status-pill ${n[o.status]}">${fa[o.status]}</span>
        </td>
        <td>${o.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(o=>o.status==="active").length,a=e.filter(o=>o.status==="done").length,i=e.filter(o=>o.status==="planned").length;return`
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
        <p class="kpi-value">${r} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${i} 本</p>
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
          <tbody>${l||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Kn(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},l=e.map(c=>`
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
          <span class="status-pill ${n[c.status]}">${t[c.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${c.id}">
            ${c.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),r=e.filter(c=>c.status==="approved").length,a=e.filter(c=>c.status==="submitted").length,i=e.filter(c=>c.status==="pending").length;return`
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
        <p class="kpi-value">${e.filter(c=>c.status==="approved").reduce((c,d)=>c+d.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${a} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${i} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>検定一覧</h2>
          <p class="panel-caption">承認済 ${r} 件 / 合計 ${e.length} 件</p>
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
          <tbody>${l||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Qn(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Wn(e,t){return`
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
        ${e?`<p class="field-error">${Qn(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}const $t={query:"",businessType:"",areaCode:"",activeOnly:"",page:1},he=50;function Zn(e,t){let n=e;if(t.query){const o=t.query.toLowerCase();n=n.filter(c=>c.code.toLowerCase().includes(o)||c.name.toLowerCase().includes(o)||c.kanaName&&c.kanaName.toLowerCase().includes(o)||c.address1&&c.address1.toLowerCase().includes(o)||c.phone&&c.phone.toLowerCase().includes(o))}t.businessType&&(n=n.filter(o=>o.businessType===t.businessType)),t.areaCode&&(n=n.filter(o=>o.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(o=>o.isActive):t.activeOnly==="inactive"&&(n=n.filter(o=>!o.isActive));const l=Math.max(1,Math.ceil(n.length/he)),a=(Math.min(t.page,l)-1)*he,i=n.slice(a,a+he);return{filtered:n,paged:i,totalPages:l}}function qt(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const l=(t-1)*he+1,r=Math.min(t*he,e),a=[];for(let i=1;i<=n;i++)i===1||i===n||i>=t-2&&i<=t+2?a.push(`<button class="button ${i===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${i}" style="min-width:36px;padding:4px 8px;">${i}</button>`):(i===t-3||i===t+3)&&a.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${l}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${a.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function ei(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),l=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
    <div style="display:flex;gap:8px;align-items:end;flex-wrap:wrap;padding:12px 0;">
      <div class="form-group" style="flex:1;min-width:200px;">
        <label class="form-label">検索</label>
        <input type="text" id="master-search" class="form-input" placeholder="コード・名前・カナ・住所・電話" value="${t.query}">
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">業態</label>
        <select id="master-business-type" class="form-input">
          <option value="">すべて</option>
          ${n.map(r=>`<option value="${r}" ${t.businessType===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${l.map(r=>`<option value="${r}" ${t.areaCode===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">状態</label>
        <select id="master-active-only" class="form-input">
          <option value="" ${t.activeOnly?"":"selected"}>すべて</option>
          <option value="active" ${t.activeOnly==="active"?"selected":""}>有効のみ</option>
          <option value="inactive" ${t.activeOnly==="inactive"?"selected":""}>停止のみ</option>
        </select>
      </div>
      <button class="button primary" type="button" data-action="master-filter" style="height:36px;">絞り込む</button>
    </div>
  `}function Va(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function ti(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.name}</td>
          <td>${t.phone||""}</td>
          <td class="mono">${t.postalCode||""}</td>
          <td title="${t.address1||""}">${Va(t.address1||"",20)}</td>
          <td>${t.areaCode||""}</td>
          <td>${t.staffCode||""}</td>
          <td class="mono">${t.priceGroup||""}</td>
          <td class="numeric">${t.closingDay?t.closingDay+"日":""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function ai(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${Va(t.name,30)}</td>
          <td>${t.category}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}%`:"―"}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}ml`:"―"}</td>
          <td>${t.bottleType||"―"}</td>
          <td class="numeric">${t.purchasePrice?t.purchasePrice.toLocaleString("ja-JP"):"―"}</td>
          <td class="numeric">${t.salePrice?t.salePrice.toLocaleString("ja-JP"):"―"}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function si(e,t,n=$t){const{filtered:l,paged:r,totalPages:a}=Zn(e.customers,n);return`
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
      ${t==="customers"?`
        ${ei(e.customers,n)}
        ${qt(l.length,n.page,a)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>カナ</th>
                <th>得意先名</th>
                <th>電話番号</th>
                <th>〒</th>
                <th>住所</th>
                <th>地区</th>
                <th>担当</th>
                <th>単価G</th>
                <th class="numeric">締日</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${ti(r)}</tbody>
          </table>
        </div>
        ${qt(l.length,n.page,a)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>商品コード</th>
                <th>商品名</th>
                <th>分類</th>
                <th class="numeric">度数</th>
                <th class="numeric">容量</th>
                <th>容器</th>
                <th class="numeric">仕入単価</th>
                <th class="numeric">売価</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${ai(e.products)}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function He(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ni(e,t){if(!e&&!t)return"";const n=e;return`
    <div class="modal-backdrop" data-action="material-close">
      <div class="modal-panel" onclick="event.stopPropagation()" style="width:min(600px, 100%);">
        <div class="modal-header">
          <h3>${t?"新規 副資材登録":`編集: ${n?.name??""}`}</h3>
          <button class="modal-close" data-action="material-close">×</button>
        </div>
        <div class="modal-body">
          <div class="filter-grid filter-grid--wide">
            <label class="field" style="flex:1 1 140px;">
              <span>コード *</span>
              <input id="mat-code" type="text" value="${n?.code??""}" placeholder="M001" />
            </label>
            <label class="field" style="flex:1 1 240px;">
              <span>品名 *</span>
              <input id="mat-name" type="text" value="${n?.name??""}" placeholder="720ml瓶" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>カテゴリ</span>
              <select id="mat-type">
                <option value="">選択</option>
                ${Pa.map(l=>`<option ${n?.materialType===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 80px;">
              <span>単位</span>
              <input id="mat-unit" type="text" value="${n?.unit??"個"}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>現在庫</span>
              <input id="mat-stock" type="number" value="${n?.currentStock??0}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>最低在庫</span>
              <input id="mat-min" type="number" value="${n?.minimumStock??0}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>単価(円)</span>
              <input id="mat-cost" type="number" value="${n?.unitCost??0}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>最終入荷日</span>
              <input id="mat-last-date" type="date" value="${n?.lastUpdated??""}" />
            </label>
          </div>
        </div>
        <div class="action-bar" style="padding:12px 20px;border-top:1px solid var(--border);">
          ${t?"":`<button class="button secondary" data-action="material-delete" data-id="${n.id}" style="color:var(--danger);margin-right:auto;">削除</button>`}
          <button class="button secondary" data-action="material-close">キャンセル</button>
          <button class="button primary" data-action="material-save" data-id="${n?.id??""}">保存</button>
        </div>
      </div>
    </div>
  `}function ii(e){const t=e.map(r=>{const i=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${i?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${i?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${He(r.unitCost)}</td>
          <td class="numeric">${He(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,l=e.reduce((r,a)=>r+a.currentStock*a.unitCost,0);return`
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
        <p class="kpi-value">${He(l)}</p>
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
  `}function li(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function Xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const oi={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function ri(e){return`
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
          <td class="numeric">${Xe(n.billedAmount)}</td>
          <td class="numeric">${Xe(n.paymentAmount)}</td>
          <td class="numeric">${Xe(n.balanceAmount)}</td>
          <td>${li(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${oi[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function ne(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Mt(e){return e.trim().toLowerCase()}function ci(e,t){const n=Mt(t),l=e.filter(a=>n?[a.code,a.name,a.janCode].map(Mt).some(i=>i.includes(n)):!0),r=l.length?`
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
              ${l.map(a=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${ne(a.code)}"
                      data-name="${ne(a.name)}"
                    >
                      <td class="mono">${ne(a.code)}</td>
                      <td>${ne(a.name)}</td>
                      <td class="mono">${ne(a.janCode)}</td>
                      <td>${ne(a.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return qa({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function G(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function di(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},l={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},a={unpaid:"warning",partial:"neutral",paid:"success"},i=e.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${G(p.unitPrice)}</td>
        <td class="numeric"><strong>${G(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${l[p.status]}">${n[p.status]}</span>
        </td>
      </tr>
    `).join(""),o=t.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${G(p.totalPurchase)}</td>
        <td class="numeric">${G(p.paidAmount)}</td>
        <td class="numeric"><strong>${G(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${a[p.status]}">${r[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),c=e.reduce((p,y)=>p+y.amount,0),d=t.reduce((p,y)=>p+y.balance,0),u=t.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${G(c)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${G(d)}</p>
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
          <tbody>${i||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
          <tbody>${o||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ce(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ui(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},l={holding:"neutral",due:"warning",cleared:"success"},r=e.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${ce(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${l[u.status]}">${n[u.status]}</span>
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
          <td class="numeric">${ce(u.unitCost)}</td>
          <td class="numeric">${ce(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),i=e.filter(u=>u.status==="holding"),o=i.reduce((u,p)=>u+p.amount,0),c=t.reduce((u,p)=>u+p.currentStock*p.unitCost,0),d=t.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${ce(o)}</p>
        <p class="kpi-sub">${i.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${ce(c)}</p>
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
          <tbody>${r||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
  `}function it(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function N(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function lt(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${N(e)}</pre>
    </div>
  `}function pi(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Se(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${N(e)}</code>
      ${pi(e)}
    </div>
  `}function ie(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${N(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${N(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${N(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?lt(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${N(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${N(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function xe(e){return`
    <div class="setup-step setup-step-compact" data-step="${N(e.stepLabel)}">
      <h3>${N(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${N(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Ae(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Ft(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function mi(e){return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">RAWレコード合計</p>
        <p class="kpi-value">${e.totalRawRecords.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">酒仙iから同期済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">正規化レコード</p>
        <p class="kpi-value">${e.totalNormalizedRecords.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">デコード済みマスタ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value">${e.lastOverallSync?it(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Ae(e.lastOverallSync)}">${Ft(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Ae(e.lastOverallSync)==="success"?"1時間以内":Ae(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>テーブル同期ステータス</h2>
          <p class="panel-caption">Supabase上の各��ーブルの行数と最終同期日時</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>テーブル</th>
              <th>種別</th>
              <th class="numeric">レコード数</th>
              <th>最終同期</th>
              <th>鮮度</th>
            </tr>
          </thead>
          <tbody>
            ${e.tables.map(t=>`
            <tr>
              <td>${N(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?it(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Ae(t.lastSyncAt)}">${Ft(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function hi(e,t,n,l){const r={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${l?mi(l):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${it(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${r[e.status]}</span>
        </p>
        <p class="kpi-sub">${N(e.message)}</p>
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
      ${xe({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Se("git --version")}
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
      ${xe({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Se("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${xe({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Se("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Se("python get-pip.py")}
        `})}
      ${xe({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${ie({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${ie({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${ie({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${ie({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${ie({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${ie({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${lt(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${lt(`{
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
            <span class="config-value">${N(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${N(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${N(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${N(n)}"
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
  `}function pe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function yi(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function vi(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(p=>p.amount),1),l=28,r=6,a=140,i=100,o=760,c=o-a-i,d=t.length*(l+r)+16,u=t.map((p,y)=>{const v=p.amount/n*c,$=y*(l+r)+8,k=p.abcRank==="A"?"#2F855A":p.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${a-8}" y="${$+l/2+5}" class="chart-axis" text-anchor="end">${p.name.length>10?p.name.slice(0,10)+"…":p.name}</text>
          <rect x="${a}" y="${$}" width="${v}" height="${l}" rx="4" fill="${k}" opacity="0.85" />
          <text x="${a+v+8}" y="${$+l/2+5}" class="chart-axis">${(p.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${o} ${d}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${u}
    </svg>
  `}function fi(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(l=>`<th class="numeric">${l}</th>`).join(""),n=e.monthlyByCustomer.map(l=>{const r=l.values.reduce((i,o)=>i+o,0),a=l.values.map(i=>`<td class="numeric">${i>0?(i/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${l.label}</td>
          ${a}
          <td class="numeric"><strong>${pe(r)}</strong></td>
        </tr>
      `}).join("");return`
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>得意先</th>
            ${t}
            <th class="numeric">合計</th>
          </tr>
        </thead>
        <tbody>${n}</tbody>
      </table>
    </div>
  `}function bi(e){e.ranking.reduce((c,d)=>c+d.amount,0);const t=e.ranking.filter(c=>c.abcRank==="A").length,n=e.ranking.filter(c=>c.abcRank==="B").length,l=e.ranking.filter(c=>c.abcRank==="C").length,r=e.ranking.filter(c=>c.abcRank==="A").reduce((c,d)=>c+d.amount,0),a=e.ranking.filter(c=>c.abcRank==="B").reduce((c,d)=>c+d.amount,0),i=e.ranking.filter(c=>c.abcRank==="C").reduce((c,d)=>c+d.amount,0),o=e.ranking.map(c=>`
        <tr>
          <td class="mono">${c.code}</td>
          <td>${c.name}</td>
          <td class="numeric">${pe(c.amount)}</td>
          <td class="numeric">${c.ratio.toFixed(1)}%</td>
          <td class="numeric">${c.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${c.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${yi(c.abcRank)}">${c.abcRank}</span></td>
        </tr>
      `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">得意先分析</p>
        <h1>得意先別集計・ABC分析</h1>
      </div>
    </section>

    <section class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-label">得意先数</div>
        <div class="kpi-value">${e.ranking.length}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Aランク</div>
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${pe(r)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${pe(a)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${l}社 <span class="kpi-sub">${pe(i)}</span></div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先別売上ランキング</h2>
          <p class="panel-caption">売上金額上位15社</p>
        </div>
      </div>
      ${vi(e.ranking)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先ABC分析</h2>
          <p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>得意先名</th>
              <th class="numeric">売上額</th>
              <th class="numeric">構成比</th>
              <th class="numeric">累積構成比</th>
              <th class="numeric">伝票数</th>
              <th>ランク</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先別月次推移</h2>
          <p class="panel-caption">上位得意先の月別売上推移</p>
        </div>
      </div>
      ${fi(e)}
    </section>
  `}function Vt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function gi(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function $i(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,20),n=760,l=320,r={top:24,right:56,bottom:60,left:72},a=n-r.left-r.right,i=l-r.top-r.bottom,o=Math.max(...t.map($=>$.amount),1),c=a/t.length,d=[0,.25,.5,.75,1].map($=>{const k=r.top+i-i*$,w=`${Math.round(o*$/1e4)}万`;return`
        <g>
          <line x1="${r.left}" y1="${k}" x2="${n-r.right}" y2="${k}" class="chart-grid" />
          <text x="4" y="${k+4}" class="chart-axis">${w}</text>
        </g>
      `}).join(""),u=[0,25,50,70,90,100].map($=>{const k=r.top+i-i*$/100,w=$===70||$===90;return`
        <g>
          <text x="${n-4}" y="${k+4}" class="chart-axis" text-anchor="end">${$}%</text>
          ${w?`<line x1="${r.left}" y1="${k}" x2="${n-r.right}" y2="${k}" stroke="${$===70?"#2F855A":"#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />`:""}
        </g>
      `}).join(""),p=t.map(($,k)=>{const w=$.amount/o*i,x=Math.max(c-10,16),J=r.left+k*c+(c-x)/2,T=r.top+i-w,ee=$.abcRank==="A"?"#2F855A":$.abcRank==="B"?"#B7791F":"#718096",S=$.name.length>6?$.name.slice(0,6)+"…":$.name;return`
        <g>
          <rect x="${J}" y="${T}" width="${x}" height="${w}" rx="4" fill="${ee}" opacity="0.8" />
          <text x="${J+x/2}" y="${l-8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${J+x/2} ${l-16})">${S}</text>
        </g>
      `}).join(""),y=t.map(($,k)=>{const w=r.left+k*c+c/2,x=r.top+i-i*$.cumRatio/100;return`${w},${x}`}).join(" "),v=t.map(($,k)=>{const w=r.left+k*c+c/2,x=r.top+i-i*$.cumRatio/100;return`<circle cx="${w}" cy="${x}" r="3.5" fill="#C53D3D" />`}).join("");return`
    <svg viewBox="0 0 ${n} ${l}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${d}
      ${u}
      ${p}
      <polyline points="${y}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${v}
    </svg>
  `}function wi(e){const t=e.ranking.filter(o=>o.abcRank==="A").length,n=e.ranking.filter(o=>o.abcRank==="B").length,l=e.ranking.filter(o=>o.abcRank==="C").length,r=e.ranking.filter(o=>o.abcRank==="A").reduce((o,c)=>o+c.amount,0),a=e.ranking.map(o=>`
        <tr>
          <td class="mono">${o.code}</td>
          <td>${o.name}</td>
          <td class="numeric">${Vt(o.amount)}</td>
          <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${o.ratio.toFixed(1)}%</td>
          <td class="numeric">${o.cumRatio.toFixed(1)}%</td>
          <td><span class="status-pill ${gi(o.abcRank)}">${o.abcRank}</span></td>
        </tr>
      `).join(""),i=e.monthlyByProduct.length>0?(()=>{const o=e.months.map(d=>`<th class="numeric">${d}</th>`).join(""),c=e.monthlyByProduct.map(d=>{const u=d.values.reduce((y,v)=>y+v,0),p=d.values.map(y=>`<td class="numeric">${y>0?(y/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`<tr><td>${d.label}</td>${p}<td class="numeric"><strong>${Vt(u)}</strong></td></tr>`}).join("");return`
          <div class="table-wrap">
            <table>
              <thead><tr><th>商品名</th>${o}<th class="numeric">合計</th></tr></thead>
              <tbody>${c}</tbody>
            </table>
          </div>
        `})():'<p class="empty-row">データなし</p>';return`
    <section class="page-head">
      <div>
        <p class="eyebrow">商品分析</p>
        <h1>商品別ABC分析</h1>
      </div>
    </section>

    <section class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-label">商品数</div>
        <div class="kpi-value">${e.ranking.length}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Aランク</div>
        <div class="kpi-value kpi-success">${t}品 <span class="kpi-sub">${(r/e.totalAmount*100).toFixed(1)}%</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}品</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${l}品</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>パレート図</h2>
          <p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p>
        </div>
      </div>
      ${$i(e.ranking)}
      <div class="pareto-legend">
        <span class="legend-item"><span class="legend-dot" style="background:#2F855A"></span>Aランク（〜70%）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#B7791F"></span>Bランク（70〜90%）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#718096"></span>Cランク（90%〜）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#C53D3D"></span>累積構成比</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>商品ABC一覧</h2>
          <p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>商品名</th>
              <th class="numeric">売上額</th>
              <th class="numeric">数量</th>
              <th class="numeric">構成比</th>
              <th class="numeric">累積構成比</th>
              <th>ランク</th>
            </tr>
          </thead>
          <tbody>${a}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>上位商品 月次推移</h2>
          <p class="panel-caption">Aランク商品の月別売上</p>
        </div>
      </div>
      ${i}
    </section>
  `}function ki(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _i(e){return e.replace("-","/")}function Si(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=760,n=280,l={top:16,right:24,bottom:36,left:64},r=t-l.left-l.right,a=n-l.top-l.bottom,i=Math.max(...e.map(u=>u.amount),1),o=r/e.length,c=[0,.25,.5,.75,1].map(u=>{const p=l.top+a-a*u,y=`${Math.round(i*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${l.left}" y1="${p}" x2="${t-l.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${y}</text>
        </g>
      `}).join(""),d=e.map((u,p)=>{const y=u.amount/i*a,v=Math.max(o-18,24),$=l.left+p*o+(o-v)/2,k=l.top+a-y;return`
        <g>
          <rect x="${$}" y="${k}" width="${v}" height="${y}" rx="6" class="analytics-bar" />
          <text x="${$+v/2}" y="${n-10}" class="chart-axis centered-axis">${_i(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${t} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${c}
      ${d}
    </svg>
  `}function xi(e){return e.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${ki(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function Ai(e,t){const n=t==="products"?"商品別集計":"得意先別集計",l=t==="products"?e.productTotals:e.customerTotals;return`
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
        ${Si(e.monthlySales)}
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
            <tbody>${xi(l)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function de(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ci(e){const t=Math.max(...e.salesByProduct.flatMap(a=>a.values),1),n=e.salesByProduct.map(a=>{const i=a.values.map((o,c)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(o/t*120)}px" title="${e.months[c]}: ${de(o)}"></div>
            <span class="bar-label">${e.months[c].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${a.label}</p>
          <div class="bar-chart">${i}</div>
        </div>
      `}).join(""),l=e.costSimulation.map(a=>`
      <tr>
        <td class="mono">${a.productCode}</td>
        <td>${a.productName}</td>
        <td class="numeric">${de(a.costPrice)}</td>
        <td class="numeric">${de(a.sellPrice)}</td>
        <td class="numeric">${de(a.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${a.marginRate>=40?"success":"warning"}">${a.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(a=>{const i=a.values.reduce((o,c)=>o+c,0);return`
        <tr>
          <td>${a.label}</td>
          ${a.values.map(o=>`<td class="numeric">${(o/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${de(i)}</strong></td>
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
              ${e.months.map(a=>`<th class="numeric">${a}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${r}</tbody>
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
          <tbody>${l}</tbody>
        </table>
      </div>
    </section>
  `}function Li(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Di(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function zt(e){return e.toISOString().slice(0,10)}function Ei(e,t,n){const l=e.length?e.map(r=>`
            <tr>
              <td class="mono">${r.documentNo}</td>
              <td>${Li(r.date)}</td>
              <td>
                <div class="table-title">${r.customerName}</div>
                <div class="table-sub mono">${r.customerCode}</div>
              </td>
              <td class="numeric">${Di(r.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||zt(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||zt(new Date)}" />
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
          <tbody>${l}</tbody>
        </table>
      </div>
    </section>
  `}function Ce(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ii(e,t,n,l){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},a={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},i={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},o=e.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${Ce(p.unitPrice)}</td>
        <td class="numeric"><strong>${Ce(p.amount)}</strong></td>
        <td>${r[p.paymentMethod]}</td>
      </tr>
    `).join(""),c=t.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(y=>`${y.productName} ×${y.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Ce(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${i[p.status]}">${a[p.status]}</span>
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
        <p class="kpi-value">${Ce(d)}</p>
        <p class="kpi-sub">${e.length} 件 / ${l}</p>
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
            <input id="store-date" type="date" value="${l}" style="width:160px" />
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
            <tbody>${o||'<tr><td colspan="7" class="empty-row">販売データがありません。</td></tr>'}</tbody>
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
  `}const Ge={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Pi={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Ti(e,t,n,l){const r=Pi[e],a=Object.keys(Ge).map(o=>`
      <button class="tab-button ${e===o?"active":""}" data-import-entity="${o}">
        ${Ge[o]}
      </button>
    `).join(""),i=t?`
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
              ${t.columns.map(o=>`<th>${o}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${t.rows.slice(0,10).map((o,c)=>`
              <tr class="${o._valid?"":"has-error"}">
                <td>${c+1}</td>
                ${t.columns.map(d=>`<td>${String(o[d]??"")}</td>`).join("")}
                <td>${o._valid?'<span class="status-pill success">OK</span>':`<span class="status-pill warning">${o._error??"NG"}</span>`}</td>
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
      <div class="tab-group" style="flex-wrap: wrap;">${a}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${Ge[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${r.required.map(o=>`<code class="config-value">${o}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${r.optional.map(o=>`<code class="config-value">${o}</code>`).join(" / ")}</dd>
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

    ${i}

    ${l?`<section class="panel"><p class="sync-message">${l}</p></section>`:""}
  `}const D={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Ni(e,t,n){const l=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:D.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:D.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:D.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:D.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:D.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:D.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:D.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:D.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:D.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:D.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:D.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:D.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:D.date}];e.lines.slice(0,6).forEach((i,o)=>{const c=33+o*8.5;l.push({id:`line${o}_name`,label:`明細${o+1} 品名`,x:5,y:c,fontSize:7.5,value:i.productName+(i.spec?` ${i.spec}`:""),color:D.detail},{id:`line${o}_code`,label:`明細${o+1} CD`,x:64,y:c,fontSize:7.5,value:i.productCode,color:D.detail},{id:`line${o}_qty`,label:`明細${o+1} 数量`,x:124,y:c,fontSize:8,value:i.quantity>0?String(i.quantity):"",color:D.detail},{id:`line${o}_price`,label:`明細${o+1} 原単価`,x:163,y:c,fontSize:8,value:i.unitPrice>0?i.unitPrice.toLocaleString("ja-JP"):"",color:D.detail},{id:`line${o}_amount`,label:`明細${o+1} 原価金額`,x:176,y:c,fontSize:8,value:i.amount>0?i.amount.toLocaleString("ja-JP"):"",color:D.detail},{id:`line${o}_retail`,label:`明細${o+1} 売単価`,x:193,y:c,fontSize:8,value:i.retailPrice?i.retailPrice.toLocaleString("ja-JP"):"",color:D.detail})});const r=e.lines.reduce((i,o)=>i+(o.amount||0),0),a=e.lines.reduce((i,o)=>i+o.quantity,0);return l.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(a),color:D.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:D.total}),n&&l.forEach(i=>{const o=n[i.id];o&&(i.x=o.x,i.y=o.y)}),l}function Ri(e,t,n,l,r){const i=Ni(e,t,l).map(c=>`
      <div class="fd-field ${r?"fd-draggable":""}"
           data-fd-id="${c.id}"
           style="left:${c.x}mm; top:${c.y}mm; font-size:${c.fontSize}pt; --fd-color:${c.color};"
           title="${c.label} (${c.x.toFixed(1)}, ${c.y.toFixed(1)})">
        ${r?`<span class="fd-badge">${c.label}</span>`:""}
        <span class="fd-value">${c.value}</span>
      </div>
    `).join(""),o=n.showReferenceOverlay&&n.overlayImageUrl?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">帳票デザイナー</p>
        <h1>BP1701 フォーム配置</h1>
      </div>
      <div class="meta-stack">
        <button class="button ${r?"primary":"secondary"}" data-action="fd-toggle-design">
          ${r?"🔧 配置モードON":"▶ プレビューモード"}
        </button>
        <button class="button primary" onclick="window.print()">🖨️ 印刷</button>
      </div>
    </section>

    ${r?`
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
        色: <span style="color:${D.header}">■ヘッダ</span>
        <span style="color:${D.code}">■コード</span>
        <span style="color:${D.date}">■日付</span>
        <span style="color:${D.detail}">■明細</span>
        <span style="color:${D.total}">■合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas-scaler" id="fd-scaler">
        <div class="fd-canvas" style="${o}">
          ${i}
        </div>
      </div>
    </section>

    ${r?`
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
  `}function Ke(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const l=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,a=parseFloat(n.style.top)||0;t[l]={x:r,y:a}}),t}function ji(e,t,n,l,r){const a=Array.from(new Set([...e.map(d=>d.businessType??""),...t.map(d=>d.businessType??"")].filter(Boolean))),i=e.filter(d=>d.lat&&d.lng).length,o=t.filter(d=>d.lat&&d.lng).length,c=n.filter(d=>d.lat&&d.lng).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">マップ</p>
        <h1>取引先マップ</h1>
      </div>
      <div class="meta-stack">
        <span class="panel-caption">${r?"Google Maps":"OpenStreetMap"}</span>
        <button class="button secondary" data-action="map-geocode">📍 住所から位置取得</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2196F3;">
        <p class="panel-title">🔵 既存取引先</p>
        <p class="kpi-value">${i}</p>
        <p class="kpi-sub">/ ${e.length}件 (位置取得済)</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #4CAF50;">
        <p class="panel-title">🟢 新規見込客</p>
        <p class="kpi-value">${o}</p>
        <p class="kpi-sub">/ ${t.length}件</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #FF9800;">
        <p class="panel-title">🟠 納品先</p>
        <p class="kpi-value">${c}</p>
        <p class="kpi-sub">/ ${n.length}件</p>
      </article>
    </section>

    <section class="panel filter-panel">
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;">
        <strong style="font-size:13px;">表示切替:</strong>
        <label><input type="checkbox" data-map-filter="showCustomers" ${l.showCustomers?"checked":""} /> 🔵 既存取引先</label>
        <label><input type="checkbox" data-map-filter="showProspects" ${l.showProspects?"checked":""} /> 🟢 新規見込客</label>
        <label><input type="checkbox" data-map-filter="showDelivery" ${l.showDelivery?"checked":""} /> 🟠 納品先</label>
        <span style="border-left:1px solid var(--border);padding-left:16px;"></span>
        <label>業種:
          <select data-map-filter="filterBusinessType" style="margin-left:4px;">
            <option value="">すべて</option>
            ${a.map(d=>`<option value="${d}" ${l.filterBusinessType===d?"selected":""}>${d}</option>`).join("")}
          </select>
        </label>
      </div>
    </section>

    <section class="panel" style="padding:0; overflow:hidden;">
      <div id="customer-map" style="height: 600px; width: 100%; background: #e8edf1;">
        <div style="padding:40px; text-align:center; color:var(--text-secondary);">地図を読み込み中…</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>凡例・統計</h2>
      </div>
      <div class="summary-list">
        <div><dt>🔵 既存取引先</dt><dd>過去に受注実績がある顧客 (customers テーブル)</dd></div>
        <div><dt>🟢 新規見込客</dt><dd>営業活動中の潜在顧客 (prospects テーブル、ステージ別色分け)</dd></div>
        <div><dt>🟠 納品先</dt><dd>顧客本社とは別の配送先 (delivery_locations テーブル)</dd></div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>位置情報が未設定のレコード</h2>
      </div>
      <p class="form-hint">住所から緯度経度を取得するには、Google Maps API で「ジオコーディング」を実行してください。</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>種別</th><th>名称</th><th>住所</th><th>状態</th></tr>
          </thead>
          <tbody>
            ${e.filter(d=>!d.lat||!d.lng).slice(0,5).map(d=>`
              <tr>
                <td>🔵 既存</td>
                <td>${d.name}</td>
                <td>${d.address1??"住所未設定"}</td>
                <td><span class="status-pill warning">位置未取得</span></td>
              </tr>
            `).join("")}
            ${t.filter(d=>!d.lat||!d.lng).slice(0,5).map(d=>`
              <tr>
                <td>🟢 新規</td>
                <td>${d.companyName}</td>
                <td>${d.address??"住所未設定"}</td>
                <td><span class="status-pill warning">位置未取得</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}const Oi={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},qi=["new","picking","packed","shipped","delivered"];function Mi(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(a=>t[a.stage].push(a));const n=qi.map(a=>{const i=Oi[a],o=t[a];return`
      <div class="wf-col" data-wf-stage="${a}">
        <div class="wf-col-header" style="--wf-color:${i.color};">
          <span class="wf-col-icon">${i.icon}</span>
          <span class="wf-col-label">${i.label}</span>
          <span class="wf-col-count">${o.length}</span>
        </div>
        <div class="wf-col-body">
          ${o.length===0?'<div class="wf-empty">―</div>':o.map(c=>`
            <div class="wf-card ${c.priority==="urgent"?"wf-urgent":""}" data-wf-order="${c.id}" draggable="true">
              <div class="wf-card-header">
                <span class="wf-card-no mono">${c.orderNo}</span>
                ${c.priority==="urgent"?'<span class="wf-card-priority">🔥 急</span>':""}
              </div>
              <div class="wf-card-customer">${c.customerName}</div>
              <div class="wf-card-meta">
                <span>📅 ${c.orderDate}</span>
                ${c.deliveryDate?`<span>🚚 ${c.deliveryDate}</span>`:""}
              </div>
              <div class="wf-card-footer">
                <span>${c.itemCount}品</span>
                <strong>¥${c.totalAmount.toLocaleString("ja-JP")}</strong>
              </div>
              ${c.staffName?`<div class="wf-card-staff">👤 ${c.staffName}</div>`:""}
            </div>
          `).join("")}
        </div>
      </div>
    `}).join(""),l=e.reduce((a,i)=>a+i.totalAmount,0),r=e.filter(a=>a.priority==="urgent").length;return`
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
      <article class="panel kpi-card ${r>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${r}件</p>
        <p class="kpi-sub">当日出荷</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">¥${l.toLocaleString("ja-JP")}</p>
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
        ${n}
      </div>
    </section>
  `}function Fi(e,t,n){const l=e.cart.reduce((a,i)=>a+i.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((a,i)=>a+i.quantity,0)}<br/>
          <strong>¥${l.toLocaleString("ja-JP")}</strong>
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

      ${Vi(e,t,n)}
    </div>
  `}function Vi(e,t,n){if(e.step==="customer"){const l=e.customerQuery.toLowerCase(),r=l?t.filter(a=>a.name.toLowerCase().includes(l)||a.code.toLowerCase().includes(l)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,30).map(a=>`
            <button class="mo-item ${e.selectedCustomer?.id===a.id?"selected":""}" data-mo-select-customer="${a.id}">
              <div class="mo-item-title">${a.name}</div>
              <div class="mo-item-sub mono">${a.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const l=e.productQuery.toLowerCase(),r=l?n.filter(a=>a.name.toLowerCase().includes(l)||a.code.toLowerCase().includes(l)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,50).map(a=>{const i=e.cart.find(o=>o.productCode===a.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${a.name}</div>
                  <div class="mo-item-sub">${a.category} / JAN ${a.janCode||"―"}</div>
                </div>
                ${i?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${a.code}">−</button>
                      <span>${i.quantity}</span>
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
          ${e.cart.map((l,r)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${l.productName}</div>
                <div class="mo-item-sub">${l.quantity} × ¥${l.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${l.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${r}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((l,r)=>l+r.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const Jt={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},Bt={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},Ut={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function zi(e,t){const n=e.find(a=>a.id===t)??e[0],l=e.filter(a=>a.status==="new").length,r=e.filter(a=>a.status==="confirmed").length;return`
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
      <article class="panel kpi-card ${l>0?"kpi-alert":""}">
        <p class="panel-title">未対応</p>
        <p class="kpi-value">${l}件</p>
        <p class="kpi-sub">返信待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">確定済</p>
        <p class="kpi-value">${r}件</p>
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
            <button class="tour-item ${n?.id===a.id?"active":""}" data-tour-id="${a.id}">
              <div class="tour-item-head">
                <strong>${a.name}</strong>
                <span class="status-pill ${Bt[a.status]}">${Jt[a.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${Ut[a.language]} · 👥 ${a.partySize}名
              </div>
              <div class="tour-item-sub">📅 希望日: ${a.visitDate}</div>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- 右: 詳細と返信 -->
      <div class="panel">
        ${n?`
          <div class="panel-header">
            <div>
              <h2>${n.name} 様</h2>
              <p class="panel-caption">受付日: ${n.createdAt.slice(0,10)}</p>
            </div>
            <span class="status-pill ${Bt[n.status]}">${Jt[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${Ut[n.language]}</dd></div>
            <div><dt>目的</dt><dd>${n.purpose}</dd></div>
            <div><dt>メッセージ</dt><dd style="white-space:pre-wrap;">${n.message}</dd></div>
          </dl>

          <hr style="margin:16px 0;" />

          <h3 style="margin-top:0;">✉️ 返信</h3>
          <label class="field">
            <span>確定日時</span>
            <input type="datetime-local" id="tour-confirmed-time" value="${n.confirmedTime??""}" />
          </label>
          <label class="field">
            <span>返信文面</span>
            <textarea id="tour-reply-body" rows="8" placeholder="ご予約ありがとうございます。..."></textarea>
          </label>
          <div class="action-bar">
            <button class="button secondary" data-action="tour-insert-template" data-template="confirm">📝 確定テンプレ</button>
            <button class="button secondary" data-action="tour-insert-template" data-template="decline">📝 お断りテンプレ</button>
            <button class="button primary" data-action="tour-send-reply" data-tour-id="${n.id}">送信 + 確定</button>
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
  `}const Ji=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Bi=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Ui(e,t){const n=t?e.find(r=>r.id===t):null,l=t==="__new__";return`
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
            ${e.map(r=>`
              <tr>
                <td>
                  ${r.name}
                  ${r.isDefault?'<span class="status-pill success" style="margin-left:6px;">既定</span>':""}
                </td>
                <td class="mono">${r.email}</td>
                <td>${r.displayName??"―"}</td>
                <td>
                  ${r.isVerified?'<span class="status-pill success">✓認証済</span>':'<span class="status-pill warning">未認証</span>'}
                </td>
                <td>
                  <button class="button-sm secondary" data-action="ms-edit" data-id="${r.id}">編集</button>
                  <button class="button-sm secondary" data-action="ms-delete" data-id="${r.id}" style="color:var(--danger);">削除</button>
                </td>
              </tr>
            `).join("")}
            ${e.length===0?'<tr><td colspan="5" class="empty-row">送信元が未登録です</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>

    ${n||l?`
      <section class="panel">
        <div class="panel-header">
          <h2>${l?"新規送信元":"編集"}: ${n?.name??""}</h2>
        </div>
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>名前 (識別用)</span>
            <input id="ms-name" type="text" value="${n?.name??""}" placeholder="営業部" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス</span>
            <input id="ms-email" type="email" value="${n?.email??""}" placeholder="sales@kaneishuzo.co.jp" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 (差出人名)</span>
            <input id="ms-display-name" type="text" value="${n?.displayName??""}" placeholder="金井酒造店 営業部" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>返信先 (任意)</span>
            <input id="ms-reply-to" type="email" value="${n?.replyTo??""}" placeholder="info@kaneishuzo.co.jp" />
          </label>
          <label class="field" style="flex:1 1 100%;">
            <span>署名</span>
            <textarea id="ms-signature" rows="4" placeholder="社名&#10;住所&#10;TEL">${n?.signature??""}</textarea>
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="ms-default" type="checkbox" ${n?.isDefault?"checked":""} />
            既定の送信元にする
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="ms-cancel">キャンセル</button>
          <button class="button primary" data-action="ms-save" data-id="${n?.id??""}">保存</button>
        </div>
        ${n?.isVerified?"":'<p class="form-hint" style="margin-top:8px;">⚠️ 未認証のアドレスは送信時にエラーになります。Resendダッシュボードでドメイン認証を行ってください。</p>'}
      </section>
      `:""}
  `}function Yi(e,t,n,l){const[r,a]=t.split("-").map(S=>parseInt(S,10)),i=new Date(r,a-1,1),o=new Date(r,a,0),c=i.getDay(),d=o.getDate(),u=[];for(let S=0;S<c;S++)u.push({isOutside:!0});for(let S=1;S<=d;S++)u.push({date:new Date(r,a-1,S)});for(;u.length%7!==0;)u.push({isOutside:!0});const p=n?e.filter(S=>S.category===n):e,y={};p.forEach(S=>{const j=S.startsAt.slice(0,10);y[j]??=[],y[j].push(S)});const v=new Date().toISOString().slice(0,10),$=u.map(S=>{if(S.isOutside)return'<div class="cal-cell cal-outside"></div>';const j=S.date,U=`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}-${String(j.getDate()).padStart(2,"0")}`,Ue=y[U]??[],Qa=U===v,At=j.getDay();return`
        <div class="cal-cell ${Qa?"cal-today":""} ${At===0?"cal-sun":At===6?"cal-sat":""}"
             data-cal-date="${U}">
          <div class="cal-day-num">${j.getDate()}</div>
          <div class="cal-events">
            ${Ue.slice(0,3).map(Y=>`
              <button class="cal-event" data-cal-event-id="${Y.id}"
                      style="background:${Y.color||gt[Y.category]||"#0F5B8D"};"
                      title="${Y.title}">
                <span class="cal-event-time">${Y.isAllDay?"終日":new Date(Y.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${Y.title}</span>
              </button>
            `).join("")}
            ${Ue.length>3?`<button class="cal-event-more" data-cal-date="${U}">+${Ue.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),k=l?.isOpen?Hi(l):"",w=new Date(r,a-2,1),x=new Date(r,a,1),J=`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}`,T=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`,ee=(()=>{const S=new Date;return`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${r}年 ${a}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${J}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${ee}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${T}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(bt).map(([S,j])=>`<option value="${S}" ${n===S?"selected":""}>${j}</option>`).join("")}
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
        ${$}
      </div>
    </section>

    ${k}
  `}function Hi(e){const t=e.event;return`
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
                ${Object.entries(bt).map(([n,l])=>`<option value="${n}" ${t.category===n?"selected":""}>${l}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?Yt(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?Yt(t.endsAt):""}" />
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
  `}function Yt(e){const t=new Date(e),n=l=>String(l).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const ue={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Xi(e,t){const n=t?e.find(l=>l.id===t):null;return`
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
            ${e.map(l=>`
              <tr>
                <td><strong>${l.name}</strong><br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${l.provider}</span></td>
                <td>
                  ${l.isEnabled?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}
                </td>
                <td>${l.lastSyncAt?l.lastSyncAt.slice(0,16).replace("T"," "):"未同期"}</td>
                <td style="font-size:12px;">${l.lastStatus??"―"}</td>
                <td>
                  <button class="button-sm secondary" data-action="int-edit" data-id="${l.id}">設定</button>
                  ${l.provider==="shopify"?`<button class="button-sm primary" data-action="int-sync-shopify" data-id="${l.id}">同期</button>`:""}
                  ${l.provider==="google_calendar"?`<button class="button-sm primary" data-action="int-sync-gcal" data-id="${l.id}">同期</button>`:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    ${n?`
      <section class="panel">
        <div class="panel-header">
          <h2>${n.name} の設定</h2>
        </div>
        <p class="form-hint">${ue[n.provider]?.description??""}</p>
        ${ue[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${ue[n.provider].setupUrl}" target="_blank">${ue[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(ue[n.provider]?.fields??[]).map(l=>`
            <label class="field" style="flex:1 1 100%;">
              <span>${l.label}</span>
              <input id="int-${l.key}" type="text" value="${n.config[l.key]??""}" placeholder="${l.placeholder}" />
            </label>
          `).join("")}
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="int-enabled" type="checkbox" ${n.isEnabled?"checked":""} />
            この連携を有効にする
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="int-cancel">キャンセル</button>
          <button class="button primary" data-action="int-save" data-id="${n.id}">保存</button>
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
  `}function Gi(e,t){const n=e.reduce((a,i)=>a+i.totalAmount,0),l=e.filter(a=>a.financialStatus==="paid").length,r=e.filter(a=>a.fulfillmentStatus!=="fulfilled"&&a.fulfillmentStatus!=="shipped").length;return`
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
        <p class="kpi-value">¥${n.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">支払済 ${l}件</p>
      </article>
      <article class="panel kpi-card ${r>0?"kpi-alert":""}">
        <p class="panel-title">未発送</p>
        <p class="kpi-value">${r}件</p>
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
                <td style="font-size:12px;">${a.lineItems.map(i=>`${i.name} ×${i.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ki(e,t,n){return`
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
      ${n?`
        <div style="margin-top:16px;">
          <h3 style="margin:0 0 8px;">📝 OCR結果</h3>
          <pre style="background:var(--surface-alt);padding:12px;border-radius:6px;white-space:pre-wrap;font-family:'Noto Sans JP',monospace;font-size:12px;max-height:300px;overflow:auto;">${n}</pre>
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
            ${e.map(l=>`
              <tr>
                <td>${l.receivedAt.slice(0,16).replace("T"," ")}</td>
                <td>${l.senderName??"―"}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${l.senderPhone??""}</span></td>
                <td>
                  <span class="status-pill ${l.ocrStatus==="done"?"success":l.ocrStatus==="failed"?"warning":"neutral"}">${l.ocrStatus}</span>
                </td>
                <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--text-secondary);">${(l.ocrText??"").slice(0,80)}</td>
                <td>${l.linkedInvoiceId?`<span class="mono">${l.linkedInvoiceId}</span>`:"未連携"}</td>
                <td>
                  <button class="button-sm secondary" data-action="fax-view" data-id="${l.id}">詳細</button>
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
  `}function Qi(e,t,n){const l=t==="__new__"?null:e.find(i=>i.id===t),r=t==="__new__";return n?.role==="admin"?`
    <section class="page-head">
      <div>
        <p class="eyebrow">ユーザー管理</p>
        <h1>担当者アカウント</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="user-new">＋ 新規ユーザー</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">登録ユーザー</p>
        <p class="kpi-value">${e.length}名</p>
        <p class="kpi-sub">有効 ${e.filter(i=>i.isActive).length}名</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">管理者</p>
        <p class="kpi-value">${e.filter(i=>i.role==="admin").length}名</p>
        <p class="kpi-sub">全権アクセス</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">部署数</p>
        <p class="kpi-value">${new Set(e.map(i=>i.department)).size}</p>
        <p class="kpi-sub">営業/蔵/管理</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>登録済みユーザー</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>担当者CD</th>
              <th>名前</th>
              <th>メール</th>
              <th>部署</th>
              <th>権限</th>
              <th>最終ログイン</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${e.map(i=>`
              <tr ${i.isActive?"":'style="opacity:0.5;"'}>
                <td class="mono">${i.staffCode??"―"}</td>
                <td><strong>${i.displayName}</strong>${i.id===n?.id?'<span style="color:var(--primary);font-size:11px;"> (あなた)</span>':""}</td>
                <td class="mono" style="font-size:12px;">${i.email}</td>
                <td>${je[i.department]}</td>
                <td>${Re[i.role]}</td>
                <td style="font-size:12px;">${i.lastSignInAt?i.lastSignInAt.slice(0,16).replace("T"," "):"―"}</td>
                <td>${i.isActive?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}</td>
                <td>
                  <button class="button-sm secondary" data-action="user-edit" data-id="${i.id}">編集</button>
                  ${i.id!==n?.id?`<button class="button-sm secondary" data-action="user-delete" data-id="${i.id}" style="color:var(--danger);">削除</button>`:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    ${l||r?`
      <section class="panel">
        <div class="panel-header">
          <h2>${r?"新規ユーザー":`${l?.displayName} 編集`}</h2>
        </div>
        ${r?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${l?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${l?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${l?"readonly":""} />
          </label>
          ${r?`<label class="field" style="flex:1 1 200px;">
                  <span>初期パスワード *</span>
                  <input id="user-password" type="password" placeholder="8文字以上" />
                </label>`:""}
          <label class="field" style="flex:1 1 120px;">
            <span>担当者コード</span>
            <input id="user-code" type="text" value="${l?.staffCode??""}" placeholder="S001" />
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>部署</span>
            <select id="user-dept">
              ${Object.entries(je).map(([i,o])=>`<option value="${i}" ${l?.department===i?"selected":""}>${o}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Re).map(([i,o])=>`<option value="${i}" ${l?.role===i?"selected":""}>${o}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 160px;">
            <span>電話</span>
            <input id="user-phone" type="tel" value="${l?.phone??""}" placeholder="090-1234-5678" />
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="user-active" type="checkbox" ${l?.isActive!==!1?"checked":""} />
            有効
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="user-cancel">キャンセル</button>
          <button class="button primary" data-action="user-save" data-id="${l?.id??""}">保存</button>
        </div>
      </section>
    `:""}

    <section class="panel">
      <div class="panel-header">
        <h2>🔐 権限レベル</h2>
      </div>
      <div class="summary-list">
        <div><dt>👑 管理者 (admin)</dt><dd>全機能アクセス、ユーザー管理、連携設定、監査ログ閲覧</dd></div>
        <div><dt>📋 マネージャー (manager)</dt><dd>営業・蔵内・仕入・税務の管理業務、帳票印刷、メール配信</dd></div>
        <div><dt>👤 スタッフ (staff)</dt><dd>伝票入力・受注処理・モバイル受注・自分の担当範囲のみ</dd></div>
      </div>
    </section>
  `:`
      <section class="page-head">
        <div><p class="eyebrow">ユーザー管理</p><h1>アクセス権限がありません</h1></div>
      </section>
      <section class="panel">
        <p>この画面は管理者のみ利用できます。</p>
      </section>
    `}function Wi(e,t,n){return e?`
    <section class="page-head">
      <div>
        <p class="eyebrow">プロフィール</p>
        <h1>${e.displayName}</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"アクティブ":"無効"}</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>基本情報</h2></div>
      <dl class="summary-list">
        <div><dt>担当者コード</dt><dd class="mono">${e.staffCode??"―"}</dd></div>
        <div><dt>メールアドレス</dt><dd class="mono">${e.email}</dd></div>
        <div><dt>部署</dt><dd>${je[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Re[e.role]}</dd></div>
        <div><dt>電話</dt><dd>${e.phone??"―"}</dd></div>
        <div><dt>最終ログイン</dt><dd>${e.lastSignInAt??"―"}</dd></div>
      </dl>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>既定のメール送信元</h2></div>
      <label class="field" style="max-width:400px;">
        <span>送信時に既定で使うアドレス</span>
        <select id="profile-sender">
          <option value="">設定しない</option>
          ${n.map(l=>`<option value="${l.id}" ${e.defaultMailSenderId===l.id?"selected":""}>${l.name} &lt;${l.email}&gt;</option>`).join("")}
        </select>
      </label>
      <div class="action-bar">
        <button class="button primary" data-action="profile-save-sender">保存</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>🔐 パスワード変更</h2></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;">
        <label class="field" style="flex:1 1 200px;">
          <span>新しいパスワード</span>
          <input id="profile-new-password" type="password" placeholder="8文字以上" />
        </label>
        <button class="button secondary" data-action="profile-change-password">変更</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>📋 あなたの最近の操作</h2></div>
      ${t.length===0?'<p class="empty-row">操作履歴がありません</p>':`<div class="table-wrap">
          <table>
            <thead>
              <tr><th>日時</th><th>操作</th><th>対象</th></tr>
            </thead>
            <tbody>
              ${t.slice(0,20).map(l=>`
                <tr>
                  <td style="font-size:12px;">${l.createdAt.slice(0,16).replace("T"," ")}</td>
                  <td><strong>${l.action}</strong></td>
                  <td style="font-size:12px;">${l.entityType??""} ${l.entityId??""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`}
    </section>
  `:`
      <section class="page-head"><div><h1>プロフィール</h1></div></section>
      <section class="panel"><p>プロフィール未登録です。ログインしてください。</p></section>
    `}function Zi(e){const t={};return e.forEach(n=>{const l=n.userEmail??"(anonymous)";t[l]=(t[l]??0)+1}),`
    <section class="page-head">
      <div>
        <p class="eyebrow">監査</p>
        <h1>操作ログ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総操作数</p>
        <p class="kpi-value">${e.length}</p>
        <p class="kpi-sub">直近100件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">ユーザー数</p>
        <p class="kpi-value">${Object.keys(t).length}</p>
        <p class="kpi-sub">操作した人</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>操作履歴</h2>
        <p class="panel-caption">誰が何をいつ変更したか</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>日時</th>
              <th>ユーザー</th>
              <th>操作</th>
              <th>対象</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>
            ${e.length===0?'<tr><td colspan="5" class="empty-row">ログがありません</td></tr>':""}
            ${e.map(n=>`
              <tr>
                <td style="font-size:12px;">${n.createdAt.replace("T"," ").slice(0,19)}</td>
                <td class="mono" style="font-size:12px;">${n.userEmail??"anonymous"}</td>
                <td><strong>${n.action}</strong></td>
                <td>${n.entityType??"―"} ${n.entityId?`<span class="mono" style="font-size:11px;">(${n.entityId})</span>`:""}</td>
                <td style="font-size:11px;color:var(--text-secondary);max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                  ${n.changes?JSON.stringify(n.changes).slice(0,100):"―"}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function el(e){const t=e.prospects.reduce((a,i)=>a+i.expectedAmount,0),n=e.prospects.reduce((a,i)=>a+i.expectedAmount*i.probability/100,0),l=e.prospects.filter(a=>a.stage==="won").length,r=e.prospects.filter(a=>a.stage==="hot"||a.stage==="negotiating").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">新規営業</p>
        <h1>見込客パイプライン</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group">
          <button class="tab-button ${e.viewMode==="kanban"?"active":""}" data-prospect-view="kanban">カンバン</button>
          <button class="tab-button ${e.viewMode==="list"?"active":""}" data-prospect-view="list">一覧</button>
        </div>
        <button class="button primary" data-action="prospect-new">＋ 見込客追加</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">パイプライン総額</p>
        <p class="kpi-value">¥${t.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">${e.prospects.length}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">加重パイプライン</p>
        <p class="kpi-value">¥${Math.round(n).toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">確度考慮</p>
      </article>
      <article class="panel kpi-card ${r>0?"kpi-alert":""}">
        <p class="panel-title">ホット案件</p>
        <p class="kpi-value">${r}件</p>
        <p class="kpi-sub">見込み高 + 商談中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注</p>
        <p class="kpi-value">${l}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?tl(e.prospects):al(e.prospects)}

    ${sl(e)}
  `}function tl(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(l=>{const r=e.filter(i=>i.stage===l),a=r.reduce((i,o)=>i+o.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${l}">
          <div class="pk-col-header" style="--pk-color:${Je[l]};">
            <span class="pk-col-label">${be[l]}</span>
            <span class="pk-col-count">${r.length}</span>
          </div>
          <div class="pk-col-sub">¥${a.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${r.length===0?'<div class="wf-empty">―</div>':r.map(i=>`
              <div class="pk-card" data-prospect-id="${i.id}" draggable="true">
                <div class="pk-card-company">${i.companyName}</div>
                <div class="pk-card-meta">${i.businessType??""} ${i.contactName?"· "+i.contactName:""}</div>
                <div class="pk-card-amount">¥${i.expectedAmount.toLocaleString("ja-JP")} <span style="color:var(--text-secondary);">(${i.probability}%)</span></div>
                ${i.nextAction?`<div class="pk-card-action">🎯 ${i.nextAction}${i.nextActionDate?" ("+i.nextActionDate+")":""}</div>`:""}
                ${i.assignedStaffCode?`<div class="pk-card-staff">👤 ${i.assignedStaffCode}</div>`:""}
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function al(e){return`
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
            ${e.map(t=>`
              <tr>
                <td><strong>${t.companyName}</strong><br/><span style="font-size:11px;color:var(--text-secondary);">${t.contactName??""}</span></td>
                <td>${t.businessType??"―"}</td>
                <td><span class="status-pill" style="background:${Je[t.stage]};color:white;">${be[t.stage]}</span></td>
                <td class="numeric">¥${t.expectedAmount.toLocaleString("ja-JP")}</td>
                <td class="numeric">${t.probability}%</td>
                <td>${t.nextAction??"―"}${t.nextActionDate?` (${t.nextActionDate})`:""}</td>
                <td>${t.assignedStaffCode??"―"}</td>
                <td>
                  <button class="button-sm secondary" data-action="prospect-edit" data-id="${t.id}">編集</button>
                  <button class="button-sm secondary" data-action="prospect-delete" data-id="${t.id}" style="color:var(--danger);">削除</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function sl(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(l=>l.id===e.editingId);return!t&&!n?"":`
    <div class="modal-backdrop" data-action="prospect-close">
      <div class="modal-panel" onclick="event.stopPropagation()" style="width:min(720px, 100%);">
        <div class="modal-header">
          <h3>${t?"新規見込客":n.companyName}</h3>
          <button class="modal-close" data-action="prospect-close">×</button>
        </div>
        <div class="modal-body">
          <div class="filter-grid filter-grid--wide">
            <label class="field" style="flex:1 1 240px;">
              <span>会社名 *</span>
              <input id="prospect-company" type="text" value="${n?.companyName??""}" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>担当者</span>
              <input id="prospect-contact" type="text" value="${n?.contactName??""}" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>電話</span>
              <input id="prospect-phone" type="tel" value="${n?.phone??""}" />
            </label>
            <label class="field" style="flex:1 1 200px;">
              <span>メール</span>
              <input id="prospect-email" type="email" value="${n?.email??""}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>業種</span>
              <select id="prospect-business-type">
                ${["","飲食店","酒店","百貨店","スーパー","宿泊","小売","卸","その他"].map(l=>`<option value="${l}" ${n?.businessType===l?"selected":""}>${l||"―"}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>ステージ</span>
              <select id="prospect-stage">
                ${Object.entries(be).map(([l,r])=>`<option value="${l}" ${n?.stage===l?"selected":""}>${r}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>流入元</span>
              <select id="prospect-source">
                ${["","展示会","紹介","WEB","コールド","問合せ","リピート"].map(l=>`<option value="${l}" ${n?.source===l?"selected":""}>${l||"―"}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>想定金額(円)</span>
              <input id="prospect-amount" type="number" value="${n?.expectedAmount??0}" />
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>成約確度(%)</span>
              <input id="prospect-probability" type="number" min="0" max="100" value="${n?.probability??10}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>担当者コード</span>
              <input id="prospect-staff" type="text" value="${n?.assignedStaffCode??""}" placeholder="S001" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>次回アクション日</span>
              <input id="prospect-next-date" type="date" value="${n?.nextActionDate??""}" />
            </label>
            <label class="field" style="flex:1 1 100%;">
              <span>次回アクション内容</span>
              <input id="prospect-next-action" type="text" value="${n?.nextAction??""}" placeholder="提案書持参で訪問" />
            </label>
            <label class="field" style="flex:1 1 100%;">
              <span>備考・メモ</span>
              <textarea id="prospect-note" rows="3">${n?.note??""}</textarea>
            </label>
          </div>

          ${t?"":`
          <hr style="margin:16px 0;"/>
          <h4>活動履歴 (${e.activities.length}件)</h4>
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
            <button class="button secondary" data-action="prospect-add-activity" data-id="${n.id}">記録</button>
          </div>
          <div class="summary-list">
            ${e.activities.slice(0,10).map(l=>`
              <div>
                <dt>${l.activityDate.slice(0,10)} - ${l.activityType}</dt>
                <dd>${l.title??""} ${l.result?`→ ${l.result}`:""}</dd>
              </div>
            `).join("")}
          </div>
          `}
        </div>
        <div class="action-bar" style="padding:12px 20px;border-top:1px solid var(--border);">
          ${t?"":`<button class="button secondary" data-action="prospect-convert" data-id="${n.id}" style="margin-right:auto;">🎯 得意先化</button>`}
          <button class="button secondary" data-action="prospect-close">キャンセル</button>
          <button class="button primary" data-action="prospect-save" data-id="${n?.id??""}">保存</button>
        </div>
      </div>
    </div>
  `}function nl(e,t,n){const l=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
    <section class="page-head">
      <div>
        <p class="eyebrow">Slack通知</p>
        <h1>通知ルール設定</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="slack-test">🔔 テスト送信</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>🔗 Webhook接続</h2>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;">
        <label class="field" style="flex:1 1 320px;">
          <span>Incoming Webhook URL</span>
          <input id="slack-webhook" type="text" value="${l}" placeholder="https://hooks.slack.com/services/..." />
        </label>
        <label class="field" style="flex:0 0 140px;">
          <span>デフォルト先</span>
          <input id="slack-default-channel" type="text" value="${r}" />
        </label>
        <label style="display:flex;align-items:center;gap:8px;">
          <input id="slack-enabled" type="checkbox" ${e?.isEnabled?"checked":""} />
          有効
        </label>
        <button class="button primary" data-action="slack-save">保存</button>
      </div>
      <p class="form-hint" style="margin-top:8px;">
        📖 Webhook URLの取得: Slack App ディレクトリ → 「Incoming Webhooks」を追加 → チャンネル選択 → URLをコピー
      </p>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>🔔 通知ルール (${t.length}件)</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>イベント</th>
              <th>有効</th>
              <th>送信先チャンネル</th>
              <th>最終通知</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(a=>`
              <tr>
                <td>${Oe[a.eventType]||a.eventType}</td>
                <td>
                  <label style="display:flex;align-items:center;gap:6px;">
                    <input type="checkbox" data-slack-rule-id="${a.id}" data-slack-field="enabled" ${a.enabled?"checked":""} />
                    ${a.enabled?"ON":"OFF"}
                  </label>
                </td>
                <td>
                  <input type="text" data-slack-rule-id="${a.id}" data-slack-field="channel" value="${a.channel}" style="width:180px;padding:4px 8px;" />
                </td>
                <td style="font-size:12px;color:var(--text-secondary);">${a.lastTriggeredAt?a.lastTriggeredAt.slice(0,16).replace("T"," "):"未通知"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="action-bar">
        <button class="button primary" data-action="slack-save-rules">ルール保存</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>📋 送信履歴 (${n.length}件)</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>送信時刻</th>
              <th>イベント</th>
              <th>チャンネル</th>
              <th>メッセージ</th>
              <th>結果</th>
            </tr>
          </thead>
          <tbody>
            ${n.length===0?'<tr><td colspan="5" class="empty-row">送信履歴がありません</td></tr>':""}
            ${n.map(a=>`
              <tr>
                <td style="font-size:12px;">${a.sentAt.slice(0,16).replace("T"," ")}</td>
                <td>${Oe[a.eventType]||a.eventType}</td>
                <td class="mono" style="font-size:12px;">${a.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.message}</td>
                <td><span class="status-pill ${a.status==="sent"?"success":"warning"}">${a.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function il(e,t,n,l){const r=new Map(t.map(p=>[p.code,p])),a=e.filter(p=>p.callDirection==="inbound").length,i=e.filter(p=>p.callDirection==="outbound").length,o=e.filter(p=>p.callStatus==="missed").length,c=e.reduce((p,y)=>p+(y.durationSeconds??0),0),d=p=>{if(p===0)return"―";const y=Math.floor(p/60),v=p%60;return y>0?`${y}分${v}秒`:`${v}秒`},u=p=>{if(p.matchedCustomerCode){const y=r.get(p.matchedCustomerCode);if(y)return`${y.name} (既存)`}return"未登録番号"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">IVRy 電話連携</p>
        <h1>通話履歴</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="ivry-sync" ${l?"":"disabled"}>🔄 IVRyから同期</button>
        <button class="button secondary" data-action="ivry-push-phonebook" ${l?"":"disabled"}>📱 電話帳を送信</button>
      </div>
    </section>

    ${l?"":`
      <section class="panel">
        <p class="form-hint" style="margin:0;">
          ⚠️ IVRy連携が無効です。<a href="#" data-link="/integrations">連携設定</a>からAPIキーを設定してください。
        </p>
      </section>
    `}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">着信</p>
        <p class="kpi-value">${a}件</p>
        <p class="kpi-sub">不在 ${o}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">発信</p>
        <p class="kpi-value">${i}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">通話時間合計</p>
        <p class="kpi-value">${d(c)}</p>
        <p class="kpi-sub">${e.length}件の合計</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value" style="font-size:13px;">${n?n.slice(0,16).replace("T"," "):"未同期"}</p>
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
            ${e.length===0?'<tr><td colspan="8" class="empty-row">通話履歴がありません</td></tr>':""}
            ${e.map(p=>`
              <tr>
                <td style="font-size:12px;">${p.startedAt?new Date(p.startedAt).toLocaleString("ja-JP"):"―"}</td>
                <td>
                  ${p.callDirection==="inbound"?'<span class="status-pill neutral">📞 着信</span>':'<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${u(p)}</strong>
                  ${p.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${p.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${p.callDirection==="inbound"?p.fromNumber:p.toNumber}</td>
                <td>
                  ${p.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':p.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${p.callStatus}</span>`}
                </td>
                <td>${d(p.durationSeconds??0)}</td>
                <td>${p.recordingUrl?`<a href="${p.recordingUrl}" target="_blank" class="button-sm secondary">🎧 再生</a>`:"―"}</td>
                <td>
                  ${p.matchedCustomerCode?"":`<button class="button-sm secondary" data-action="call-link-customer" data-id="${p.id}" data-phone="${p.callDirection==="inbound"?p.fromNumber:p.toNumber}">顧客に紐付け</button>`}
                  <button class="button-sm secondary" data-action="call-memo" data-id="${p.id}">メモ</button>
                </td>
              </tr>
            `).join("")}
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
  `}const ll=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function ol(e){const t=e.activeListId?e.lists.find(a=>a.id===e.activeListId):null,n=e.items.filter(a=>a.status==="new").length,l=e.items.filter(a=>a.status==="imported").length,r=e.items.filter(a=>a.status==="excluded").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">新規営業</p>
        <h1>リスト取得ツール</h1>
      </div>
      <div class="meta-stack">
        <span class="panel-caption">${e.lists.length}リスト / ${e.items.length}件</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>🔍 Google Places でリスト検索</h2>
      </div>
      <p class="form-hint" style="margin:0 0 12px;">業種 × エリアで検索し、見込客候補を自動取得します。Google Maps API Keyが必要です (/integrations)。</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;">
        <label class="field" style="flex:1 1 180px;">
          <span>業種</span>
          <select id="lb-type">
            <option value="">選択</option>
            ${ll.map(a=>`<option value="${a}" ${e.searchBusinessType===a?"selected":""}>${a}</option>`).join("")}
          </select>
        </label>
        <label class="field" style="flex:1 1 180px;">
          <span>エリア</span>
          <input id="lb-area" type="text" value="${e.searchArea}" placeholder="秦野市 / 渋谷区 / 大阪市" />
        </label>
        <label class="field" style="flex:1 1 200px;">
          <span>追加キーワード (任意)</span>
          <input id="lb-keyword" type="text" value="${e.searchQuery}" placeholder="日本酒 / 地酒 / 人気" />
        </label>
        <button class="button primary" data-action="lb-search" ${e.searching?"disabled":""}>
          ${e.searching?"検索中…":"🔍 検索"}
        </button>
      </div>
      ${e.searchResults.length>0?`
        <div style="margin-top:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <strong>検索結果: ${e.searchResults.length}件</strong>
            <div style="display:flex;gap:8px;">
              <button class="button secondary" data-action="lb-save-list">📋 リストとして保存</button>
              <button class="button secondary" data-action="lb-clear-search">クリア</button>
            </div>
          </div>
          <div class="table-wrap" style="max-height:400px;overflow-y:auto;">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" id="lb-select-all" checked /></th>
                  <th>店名</th>
                  <th>住所</th>
                  <th class="numeric">評価</th>
                  <th class="numeric">レビュー</th>
                </tr>
              </thead>
              <tbody>
                ${e.searchResults.map((a,i)=>`
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${i}" checked /></td>
                    <td><strong>${a.companyName}</strong></td>
                    <td style="font-size:12px;">${a.address??"―"}</td>
                    <td class="numeric">${a.rating?`⭐${a.rating}`:"―"}</td>
                    <td class="numeric">${a.reviewCount??"―"}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `:""}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>📋 保存済みリスト</h2>
        </div>
        <button class="button secondary" data-action="lb-new-manual">＋ 手動リスト作成</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        ${e.lists.map(a=>`
          <button class="button ${e.activeListId===a.id?"primary":"secondary"}"
                  data-action="lb-select-list" data-id="${a.id}">
            ${a.name} (${a.totalCount})
          </button>
        `).join("")}
        ${e.lists.length===0?'<span class="form-hint">リストがありません</span>':""}
      </div>

      ${t?`
        <div style="padding:12px;background:var(--surface-alt);border-radius:6px;margin-bottom:12px;">
          <strong>${t.name}</strong>
          <span class="form-hint" style="margin-left:8px;">
            クエリ: ${t.query??"―"} | エリア: ${t.area??"―"} | 業種: ${t.businessType??"―"}
          </span>
          <div style="margin-top:8px;display:flex;gap:16px;font-size:12px;">
            <span>🆕 新規: <strong>${n}</strong></span>
            <span>✅ 取込済: <strong>${l}</strong></span>
            <span>❌ 除外: <strong>${r}</strong></span>
          </div>
        </div>

        <div style="margin-bottom:12px;">
          <button class="button primary" data-action="lb-bulk-convert" ${n===0?"disabled":""}>
            🎯 選択行を見込客に一括変換 (${n}件)
          </button>
          <button class="button secondary" data-action="lb-delete-list" data-id="${t.id}" style="color:var(--danger);margin-left:auto;">
            🗑️ リスト削除
          </button>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" id="lb-items-all" /></th>
                <th>店名</th>
                <th>住所</th>
                <th>電話</th>
                <th class="numeric">評価</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${e.items.map(a=>`
                <tr ${a.status==="excluded"?'style="opacity:0.4;"':""}>
                  <td>${a.status==="new"?`<input type="checkbox" class="lb-item-check" data-id="${a.id}" />`:""}</td>
                  <td><strong>${a.companyName}</strong></td>
                  <td style="font-size:12px;">${a.address??"―"}</td>
                  <td class="mono" style="font-size:12px;">${a.phone??"―"}</td>
                  <td class="numeric">${a.rating?`⭐${a.rating}(${a.reviewCount??0})`:"―"}</td>
                  <td>
                    ${a.status==="new"?'<span class="status-pill neutral">新規</span>':a.status==="imported"?'<span class="status-pill success">取込済</span>':'<span class="status-pill warning">除外</span>'}
                  </td>
                  <td>
                    ${a.status==="new"?`<button class="button-sm secondary" data-action="lb-exclude" data-id="${a.id}">除外</button>`:""}
                    ${a.status==="new"?`<button class="button-sm primary" data-action="lb-convert-one" data-id="${a.id}">→見込客</button>`:""}
                  </td>
                </tr>
              `).join("")}
              ${e.items.length===0?'<tr><td colspan="7" class="empty-row">アイテムがありません</td></tr>':""}
            </tbody>
          </table>
        </div>
      `:""}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>💡 このツールの使い方</h2>
      </div>
      <ol style="line-height:1.8;">
        <li><strong>業種 × エリア</strong>で検索 → Google Placesから候補一覧を取得</li>
        <li>チェックを付けて「リストとして保存」→ Supabaseに永続化</li>
        <li>保存したリストを確認・編集 → 営業対象を選別</li>
        <li>「<strong>見込客に一括変換</strong>」で /prospects にcold案件として追加</li>
        <li>その後はカンバンで営業活動→受注化</li>
      </ol>
      <p class="form-hint">
        ※ Google Places API はリクエスト数に応じて課金されます (Googleの無料枠内で月200ドル相当まで無料)
      </p>
    </section>
  `}const Ht={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},rl={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},cl={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function I(e){return"¥"+e.toLocaleString("ja-JP")}function ye(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function za(e,t){const n=e.reduce((a,i)=>a+i.amount,0),l=Math.floor(n*t),r=n+l;return{subtotal:n,taxAmount:l,total:r}}const A={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function L(e,t){const n=e.align??"left",l=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${l}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Qe(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),l=n-2018;return{y:l>0?String(l).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function dl(e,t,n){const l=Qe(e.documentDate),r=Qe(e.orderDate??e.documentDate),a=Qe(e.deliveryDate??e.documentDate),i=e.lines.slice(0,6).map((w,x)=>{const J=A.detailStartY+x*A.detailRowH,T=A.detailCols,ee=[],S=(j,U)=>{U&&ee.push(L({...j,y:J,x:j.x+0},U))};return S(T.productName,w.productName+(w.spec?` ${w.spec}`:"")),S(T.productCode,w.productCode),S(T.color,w.color??""),S(T.size,[w.size,w.caseQty?`×${w.caseQty}`:""].filter(Boolean).join(" ")),S(T.unit,w.unit),S(T.quantity,w.quantity>0?w.quantity.toLocaleString("ja-JP"):""),S(T.correctedQty,w.correctedQuantity?w.correctedQuantity.toLocaleString("ja-JP"):""),S(T.discount,w.discount?w.discount.toLocaleString("ja-JP"):""),S(T.unitPrice,w.unitPrice>0?w.unitPrice.toLocaleString("ja-JP"):""),S(T.costAmount,w.amount>0?w.amount.toLocaleString("ja-JP"):""),S(T.retailPrice,w.retailPrice?w.retailPrice.toLocaleString("ja-JP"):""),S(T.note,w.receivedAmount?w.receivedAmount.toLocaleString("ja-JP"):""),ee.join("")}).join(""),o=e.lines.reduce((w,x)=>w+(x.amount||0),0),c=e.lines.reduce((w,x)=>w+(x.retailPrice||0)*(x.correctedQuantity??x.quantity),0),d=e.lines.reduce((w,x)=>w+(x.receivedAmount||0),0),u=e.lines.reduce((w,x)=>w+(x.returnAmount||0),0),p=e.lines.reduce((w,x)=>w+x.quantity,0),y=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",v=n.calibrationOffsetX||0,$=n.calibrationOffsetY||0,k=`transform: translate(${v}mm, ${$}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${y}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${k}">
        ${L(A.currentDateY,l.y)}
        ${L(A.currentDateM,l.m)}
        ${L(A.currentDateD,l.d)}
        ${L(A.documentNo,e.documentNo)}
        ${e.settlementPrint?L(A.settlementCheck,"✓"):""}

        ${L(A.vendorName,t.name)}
        ${L(A.vendorAddress,t.address1)}
        ${L(A.chainStoreCode,e.chainStoreCode??"")}
        ${L(A.categoryCode,e.categoryCode??"")}
        ${L(A.slipNumber,e.documentNo)}
        ${L(A.vendorCode,e.slipTypeCode??"")}

        ${L(A.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${L(A.orderDateY,r.y)}
        ${L(A.orderDateM,r.m)}
        ${L(A.orderDateD,r.d)}
        ${L(A.deliveryDateY,a.y)}
        ${L(A.deliveryDateM,a.m)}
        ${L(A.deliveryDateD,a.d)}
        ${L(A.orderNo,e.orderNo??"")}
        ${L(A.partnerCode,e.vendorCode??"")}

        ${i}

        ${L(A.totalQty,p.toLocaleString("ja-JP"))}
        ${L(A.receivedTotal,d.toLocaleString("ja-JP"))}
        ${L(A.returnTotal,u.toLocaleString("ja-JP"))}
        ${L(A.correctedCostTotal,o.toLocaleString("ja-JP"))}
        ${L(A.correctedRetailTotal,c.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function ul(e,t,n){const{subtotal:l,taxAmount:r,total:a}=za(e.lines,e.taxRate),i=e.previousBalance??0,o=e.paymentAmount??0,c=i-o+a,d=e.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${I(p.unitPrice)}</td>
        <td class="numeric">${I(p.amount)}</td>
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
        <div><dt>請求日</dt><dd>${ye(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${ye(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${I(c)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${I(l)} / 消費税: ${I(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${i?`<tr><th>前回御請求額</th><td>${I(i)}</td></tr>`:""}
          ${o?`<tr><th>ご入金額</th><td>▲ ${I(o)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${I(l)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${I(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${I(c)}</td></tr>
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
  `}function pl(e,t,n){const{subtotal:l,taxAmount:r,total:a}=za(e.lines,e.taxRate),i=e.lines.map(c=>`
      <tr>
        <td>${c.productName}${c.spec?` <span style="color:#636e72;font-size:9pt;">/ ${c.spec}</span>`:""}</td>
        <td class="numeric">${c.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${c.unit}</td>`:""}
        <td class="numeric">${I(c.unitPrice)}</td>
        <td class="numeric">${I(c.amount)}</td>
      </tr>
    `).join(""),o=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
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
        <div><dt>見積日</dt><dd>${ye(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${ye(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${I(a)}</span>
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
        <tbody>${i}${o}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${I(l)} / 消費税: ${I(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${I(l)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${I(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${I(a)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?ye(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function ml(e,t,n,l){let r="";switch(e){case"chain_store":r=dl(l,n,t);break;case"quotation":r=pl(l,n,t);break;case"invoice_monthly":r=ul(l,n,t);break}const a=Object.keys(Ht).map(c=>`<button class="tab-button ${e===c?"active":""}" data-print-template="${c}">${Ht[c]}</button>`).join(""),i=l.lines.map((c,d)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${d}" data-print-lfield="productName" value="${c.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${d}" data-print-lfield="quantity" value="${c.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${d}" data-print-lfield="unitPrice" value="${c.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${c.amount>0?c.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${d}">✕</button></td>
      </tr>`).join(""),o=[{key:"showSeal",label:"印影"},{key:"showRegistrationNo",label:"登録番号"},{key:"showBankInfo",label:"振込先"},{key:"showJanCode",label:"JAN"},{key:"showRemarks",label:"備考"}].map(c=>`<label style="font-size:12px;"><input type="checkbox" data-print-opt="${c.key}" ${t[c.key]?"checked":""} /> ${c.label}</label>`).join(" ");return`
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
              <input type="text" data-print-field="documentNo" value="${l.documentNo}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>日付</span>
              <input type="date" data-print-field="documentDate" value="${l.documentDate}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>得意先名</span>
              <input type="text" data-print-field="customerName" value="${l.customerName}" />
            </label>
            <label class="field" style="flex:1 1 60px;">
              <span>敬称</span>
              <select data-print-field="customerHonorific">
                <option value="御中" ${l.customerHonorific==="御中"?"selected":""}>御中</option>
                <option value="様" ${l.customerHonorific==="様"?"selected":""}>様</option>
              </select>
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>税率</span>
              <select data-print-field="taxRate">
                <option value="0.10" ${l.taxRate===.1?"selected":""}>10%</option>
                <option value="0.08" ${l.taxRate===.08?"selected":""}>8%</option>
              </select>
            </label>
            ${e==="invoice_monthly"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>お支払期限</span>
                  <input type="date" data-print-field="dueDate" value="${l.dueDate??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>前回請求額</span>
                  <input type="number" data-print-field="previousBalance" value="${l.previousBalance??0}" />
                </label>`:""}
            ${e==="chain_store"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>柱店CD</span>
                  <input type="text" data-print-field="chainStoreCode" value="${l.chainStoreCode??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>伝票区分</span>
                  <input type="text" data-print-field="slipTypeCode" value="${l.slipTypeCode??""}" />
                </label>`:""}
          </div>
        </div>

        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 class="panel-title">明細 (${l.lines.length}行)</h3>
            <button class="button secondary" data-action="print-add-line" style="padding:6px 12px;font-size:12px;">＋行追加</button>
          </div>
          <div class="table-wrap">
            <table style="min-width:auto;">
              <thead><tr><th>品名</th><th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th><th></th></tr></thead>
              <tbody>${i||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
            </table>
          </div>
        </div>

        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">⚙️ 表示オプション</summary>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
            ${o}
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
              ${r}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 印刷時はプレビューだけ表示 -->
    <div class="print-only">
      <div class="print-preview ${t.colorMode}">
        ${r}
      </div>
    </div>
  `}const hl={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},yl={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function vl(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],l="",r=!1;for(let o=0;o<e.length;o++){const c=e[o];r?c==='"'?e[o+1]==='"'?(l+='"',o++):r=!1:l+=c:c==='"'?r=!0:c===","?(n.push(l),l=""):c===`
`||c==="\r"?(c==="\r"&&e[o+1]===`
`&&o++,n.push(l),n.some(d=>d!=="")&&t.push(n),n=[],l=""):l+=c}if((l!==""||n.length>0)&&(n.push(l),n.some(o=>o!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const a=t[0].map(o=>o.trim()),i=[];for(let o=1;o<t.length;o++){const c={};a.forEach((d,u)=>{c[d]=(t[o][u]??"").trim()}),i.push(c)}return{columns:a,rows:i}}function fl(e,t,n){const l=hl[e],r=l.filter(o=>!t.includes(o)),a=n.map(o=>{const c=[];r.length>0&&c.push(`必須列欠損: ${r.join(",")}`);for(const d of l)t.includes(d)&&!o[d]&&c.push(`${d}が空`);return{...o,_valid:c.length===0,_error:c[0]}}),i=a.filter(o=>o._valid).length;return{entity:e,columns:t,rows:a,totalRows:n.length,validRows:i,invalidRows:a.length-i}}function bl(e){const n=yl[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function gl(e,t){const{supabaseInsert:n}=await f(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>E);return{supabaseInsert:o}},void 0);let l=0,r=0;const i={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const o of t){if(!o._valid)continue;const{_valid:c,_error:d,...u}=o,p={...u};if(!p.id){const y=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[y]??`${e}-${Date.now()}-${l+r}`)}for(const y of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[y]=="string"&&p[y]!==""){const v=Number(p[y]);Number.isFinite(v)&&(p[y]=v)}try{await n(i,p)!==null?l++:r++}catch{r++}}return{inserted:l,failed:r}}function We(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function $l(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function wl(e,t,n,l,r){const a=n.reduce((d,u)=>d+u.rowCount,0),i=n.map(d=>d.lastSyncAt).filter(d=>d!==null).sort().reverse()[0]??null,o=100,c=Math.max(1,Math.ceil(r/o));return`
    <section class="page-head">
      <div>
        <p class="eyebrow">raw同期データ</p>
        <h1>データブラウザ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">テーブル数</p>
        <p class="kpi-value">${n.length}</p>
        <p class="kpi-sub">酒仙iファイル</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">合計レコード</p>
        <p class="kpi-value">${a.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">全テーブル合計</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value">${i?We(i):"---"}</p>
        <p class="kpi-sub">最も新しい同期</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>テーブル一覧</h2>
          <p class="panel-caption">テーブルを選択してレコードを確認</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;padding:0 0 16px;">
        ${n.map(d=>`
          <button
            class="panel kpi-card ${e===d.tableName?"kpi-alert":""}"
            type="button"
            data-action="raw-select-table"
            data-table="${d.tableName}"
            style="cursor:pointer;text-align:left;border:2px solid ${e===d.tableName?"var(--primary)":"transparent"};transition:border-color .15s;"
          >
            <p class="panel-title" style="font-size:12px;">${d.displayName}</p>
            <p class="kpi-value" style="font-size:18px;">${d.rowCount.toLocaleString("ja-JP")}</p>
            <p class="kpi-sub" style="font-size:11px;">${d.lastSyncAt?We(d.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(d=>d.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((l-1)*o+1).toLocaleString("ja-JP")}-${Math.min(l*o,r).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${l<=1?"disabled":""}>← 前</button>
          <span style="padding:0 8px;">${l} / ${c}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${l>=c?"disabled":""}>次 →</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="numeric">Index</th>
              <th>ファイル</th>
              <th class="numeric">サイズ</th>
              <th>同期日時</th>
              <th>raw_b64 (先頭)</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(d=>`
            <tr>
              <td class="numeric mono">${d._record_index}</td>
              <td class="mono">${d._source_file||""}</td>
              <td class="numeric">${d._record_size??""} B</td>
              <td>${d._synced_at?We(d._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${d._raw_b64?d._raw_b64.slice(0,200):""}">${$l(d._raw_b64)}</td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
    `:`
    <section class="panel">
      <p style="padding:24px;text-align:center;color:var(--text-secondary);">上のテーブルを選択すると、レコードの詳細が表示されます。</p>
    </section>
    `}
  `}function kl(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},l=e.map(d=>{const u=d.capacity>0?Math.round(d.currentVolume/d.capacity*100):0;return`
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
      `}).join(""),r=e.filter(d=>d.status==="in_use").length,a=e.filter(d=>d.status==="aging").length,i=e.filter(d=>d.status==="empty").length,o=e.reduce((d,u)=>d+u.capacity,0),c=e.reduce((d,u)=>d+u.currentVolume,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${o.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${o>0?Math.round(c/o*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${r} 基</p>
        <p class="kpi-sub">熟成中 ${a} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${i} 基</p>
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
          <tbody>${l||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _l(e,t,n){const l=e.rows.map((d,u)=>`
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
        <td class="numeric"><strong>${Ze(d.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),r=e.deductions.map((d,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(st).map(p=>`<option value="${p}" ${p===d.type?"selected":""}>${st[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${xa.map(p=>`<option value="${p.code}" ${p.code===d.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
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
    `).join(""),a=Array.from({length:12},(d,u)=>u+1),i=e.rows.reduce((d,u)=>d+u.exportDeduction+u.sampleDeduction,0),o=e.rows.reduce((d,u)=>d+u.productionVolume,0),c=o>0?i/o*100:0;return`
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
            ${a.map(d=>`<option value="${d}" ${n===d?"selected":""}>${d}月</option>`).join("")}
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
        <p class="kpi-value">${Ze(e.totalTax)}</p>
        <p class="kpi-sub">${e.targetYear}年${e.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${e.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${i.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.deductions.length} 件</p>
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
          <tbody>${l||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${Ze(e.totalTax)}</th>
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
          <tbody>${r||'<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>'}</tbody>
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
  `}const Sl={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let K=null,xl=0;const ot=[];function Al(){return K&&document.body.contains(K)||(K=document.createElement("div"),K.className="toast-container",document.body.appendChild(K)),K}function b(e,t="success",n){const l=Al(),r=++xl,a=t==="error"?5e3:t==="warning"?4e3:3e3,i=document.createElement("div");i.className=`toast toast-${t}`,i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),i.innerHTML=`
    <span class="toast-icon">${Sl[t]}</span>
    <span class="toast-msg">${Ll(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const o={id:r,message:e,type:t,el:i};ot.push(o),l.appendChild(i),requestAnimationFrame(()=>{i.classList.add("toast-enter")});const c=()=>Cl(o);i.querySelector(".toast-dismiss").addEventListener("click",c),setTimeout(()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",c,{once:!0})},a)}function Cl(e){const t=ot.indexOf(e);t!==-1&&(ot.splice(t,1),e.el.remove())}function Ll(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function B(e,t={}){const{title:n="確認",confirmLabel:l="OK",cancelLabel:r="キャンセル",variant:a="primary"}=t;return new Promise(i=>{const o=document.createElement("div");o.className="modal-backdrop confirm-backdrop",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${a}">
            ${a==="danger"?Dl:El}
          </div>
          <h3 class="confirm-title">${Le(n)}</h3>
          <p class="confirm-message">${Le(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Le(r)}</button>
          <button class="button ${a} confirm-ok">${Le(l)}</button>
        </div>
      </div>
    `;const c=u=>{o.classList.add("confirm-exit"),o.addEventListener("animationend",()=>{o.remove()},{once:!0}),i(u)};o.querySelector(".confirm-cancel").addEventListener("click",()=>c(!1)),o.querySelector(".confirm-ok").addEventListener("click",()=>c(!0)),o.addEventListener("click",u=>{u.target===o&&c(!1)});const d=u=>{u.key==="Escape"&&(document.removeEventListener("keydown",d),c(!1))};document.addEventListener("keydown",d),document.body.appendChild(o),requestAnimationFrame(()=>{o.querySelector(".confirm-ok")?.focus()})})}const Dl=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,El=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Le(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Xt(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Il(e,t,n){if(t.length===0&&(!n||n.length===0))return;const l=n&&n.length>0?n:Object.keys(t[0]??{}).map(d=>({key:d,label:d})),a=`\uFEFF${[l.map(d=>Xt(d.label)).join(","),...t.map(d=>l.map(u=>Xt(d[u.key])).join(","))].join(`\r
`)}`,i=new Blob([a],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(i),c=document.createElement("a");c.href=o,c.download=e,document.body.append(c),c.click(),c.remove(),window.setTimeout(()=>URL.revokeObjectURL(o),0)}const Pl=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/product-abc","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser"],De=[{name:"青葉商事",email:"aoba@example.jp",area:"関東",historySegment:"seasonal"},{name:"北斗酒販",email:"hokuto@example.jp",area:"北海道",historySegment:"premium"},{name:"中央フーズ",email:"chuo@example.jp",area:"関東",historySegment:"seasonal"},{name:"東海酒店",email:"tokai@example.jp",area:"中部",historySegment:"premium"},{name:"三和物産",email:"sanwa@example.jp",area:"関西",historySegment:"liqueur"},{name:"南星リカー",email:"nansei@example.jp",area:"九州",historySegment:"seasonal"},{name:"山川酒店",email:"yamakawa@example.jp",area:"関西",historySegment:"premium"},{name:"瑞穂商店",email:"mizuho@example.jp",area:"中部",historySegment:"seasonal"}],Gt=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/product-abc",title:"商品ABC分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"}];function Ja(e){const t=dt[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function wt(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Tl(){const e=Ja("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const Be=new Date,Nl=Be.toISOString().slice(0,7),Rl=Be.getFullYear(),jl=Be.getMonth()+1,Ol=Be.toISOString().slice(0,10),ql="C0011",Q=Tl();function Ba(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return Pl.includes(n)?n:"/"}function kt(e){switch(e){case"/cat/sales":case"/invoice":case"/ledger":case"/invoice-entry":case"/delivery":case"/billing":case"/report":case"/customer-analysis":case"/product-abc":return"sales";case"/cat/brewery":case"/jikomi":case"/tanks":case"/kentei":case"/materials":return"brewery";case"/cat/purchase":case"/purchase":case"/raw-material":return"purchase";case"/cat/more":case"/master":case"/analytics":case"/tax":case"/store":case"/setup":case"/raw-browser":return"more";case"/email":return"email";default:return"dashboard"}}const Kt=Ba(location.pathname),s={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:wt(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Nl,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Rl,taxMonth:jl,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],callLogs:[],mapFilters:{showCustomers:!0,showProspects:!0,showDelivery:!0,filterRegion:"",filterBusinessType:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...rl,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...cl},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Ol,route:Kt,currentCategory:kt(Kt),sidebarOpen:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:ql,salesPeriod:"month",masterTab:"customers",masterFilter:{...$t},analyticsTab:"products",emailAudienceMode:Q.mode,emailRegion:Q.region,emailHistorySegment:Q.historySegment,emailTemplateId:Q.templateId,emailSubject:Q.subject,emailBody:Q.body,emailSaveMessage:Q.saveMessage,emailSending:!1,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function Qt(e){return e.slice(0,10)}function Ml(e){return{...e}}function qe(){s.pickerMode=null,s.pickerQuery="",s.pickerTargetLine=null}function Ua(){s.invoiceForm=wt(),s.invoiceSavedDocNo=null,s.invoicePriceGroup="",s.invoiceErrors={},qe()}function Ya(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,l)=>{n.productCode.trim()||(t[`lines.${l}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${l}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${l}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${l}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Fl(e){const t=s.invoiceForm.lines[e];t&&s.invoiceForm.lines.splice(e+1,0,Ml(t))}function Vl(){const e=s.invoiceRecords[0],t=s.masterStats?.customers[0],n=s.masterStats?.products.slice(0,2)??[];s.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:s.invoiceForm.staffCode||"S001",lines:n.map((l,r)=>{const a=r===0?1:2,i=1200*(r+1);return{productCode:l.code,productName:l.name,quantity:a,unitPrice:i,unit:"本",amount:a*i}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},s.invoiceSavedDocNo=null,s.invoiceErrors={}}function zl(e){const t=s.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function Jl(e){const t=s.masterStats?.customers.find(n=>n.name===e.trim());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function Ha(e){if(V(e),s.invoiceErrors=Ya(s.invoiceForm),Object.keys(s.invoiceErrors).length>0){h();return}s.invoiceSaving=!0,h(),pa(s.invoiceForm).then(t=>{s.invoiceSavedDocNo=t.documentNo,s.invoiceSaving=!1,s.invoiceErrors={},s.invoiceForm=wt(),h()}).catch(()=>{s.invoiceSaving=!1,h()})}function Xa(e){const t=s.salesFilter.startDate?new Date(s.salesFilter.startDate):null,n=s.salesFilter.endDate?new Date(`${s.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((l,r)=>new Date(r.date).getTime()-new Date(l.date).getTime()).filter(l=>{const r=new Date(l.date);return!(t&&r<t||n&&r>n)})}function Ga(){switch(s.emailAudienceMode){case"area":return s.emailRegion==="all"?De:De.filter(e=>e.area===s.emailRegion);case"history":return De.filter(e=>e.historySegment===s.emailHistorySegment);default:return De}}function Bl(){const e=Ga();return{audienceMode:s.emailAudienceMode,region:s.emailRegion,historySegment:s.emailHistorySegment,selectedTemplateId:s.emailTemplateId,subject:s.emailSubject,body:s.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:s.emailSaveMessage,sending:s.emailSending,senderId:s.emailSenderId,senders:s.mailSenders}}function et(e){const t=Ga(),n=s.emailAudienceMode==="area"?s.emailRegion:s.emailAudienceMode==="history"?s.emailHistorySegment:"all";return{subject:s.emailSubject.trim(),body:s.emailBody.trim(),templateId:s.emailTemplateId,audienceMode:s.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(l=>l.email),status:e}}function _t(){return s.user,!1}function ve(){s.globalSearchOpen=!1,s.globalQuery=""}function Ul(){const e=s.globalQuery.trim().toLowerCase();return e?{customers:s.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:s.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:s.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:Gt.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:Gt}}function Yl(){let e=[],t,n="export.csv";switch(s.route){case"/sales":e=(s.salesSummary?Xa(s.salesSummary):[]).map(l=>({documentNo:l.documentNo,date:l.date,customerCode:l.customerCode,customerName:l.customerName,amount:l.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...s.paymentStatus?.records??[]].sort((l,r)=>r.balanceAmount-l.balanceAmount).map(l=>({...l})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=s.invoiceRecords.map(l=>({...l})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=s.purchaseList.map(l=>({...l})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=s.jikomiList.map(l=>({...l})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=s.tankList.map(l=>({...l})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=s.kenteiList.map(l=>({...l})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=s.materialList.map(l=>({...l})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":s.masterTab==="customers"?(e=s.masterStats?.customers.map(l=>({...l}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=s.masterStats?.products.map(l=>({...l}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Il(n,e,t)}function Wt(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),s.route=e,s.currentCategory=kt(e),s.sidebarOpen=!1,ve(),St(e)}async function St(e){s.actionLoading=!0,h();try{switch(e){case"/delivery":s.deliveryNote||(s.deliveryNote=await ht(s.deliverySearchDocNo||"D240122"));break;case"/billing":s.billingSummary||(s.billingSummary=await yt(s.billingYearMonth));break;case"/report":s.salesReport||(s.salesReport=await ze());break;case"/customer-analysis":s.customerAnalysis||(s.customerAnalysis=await ya());break;case"/product-abc":s.productABC||(s.productABC=await va());break;case"/jikomi":s.jikomiList.length===0&&(s.jikomiList=await ba());break;case"/tanks":s.tankList.length===0&&(s.tankList=await ga());break;case"/kentei":s.kenteiList.length===0&&(s.kenteiList=await $a());break;case"/materials":s.materialList.length===0&&(s.materialList=await at());break;case"/purchase":(s.purchaseList.length===0||s.payableList.length===0)&&([s.purchaseList,s.payableList]=await Promise.all([wa(),ka()]));break;case"/raw-material":(s.billList.length===0||s.rawStockList.length===0)&&([s.billList,s.rawStockList]=await Promise.all([_a(),Sa()]));break;case"/tax":s.taxDeclaration||(s.taxDeclaration=await vt(s.taxYear,s.taxMonth));break;case"/store":(s.storeSales.length===0||s.storeOrders.length===0)&&([s.storeSales,s.storeOrders]=await Promise.all([ft(s.storeSalesDate),Ca()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await f(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>g);return{fetchMailSenders:n}},void 0);if(s.mailSenders=await t(),!s.emailSenderId||!s.mailSenders.find(n=>n.id===s.emailSenderId)){const n=s.mailSenders.find(l=>l.isDefault)??s.mailSenders[0];n&&(s.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await f(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>g);return{fetchCalendarEvents:n}},void 0);s.calendarEvents=await t(s.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await f(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>g);return{fetchIntegrationSettings:n}},void 0);s.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await f(async()=>{const{fetchShopifyOrders:l,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>g);return{fetchShopifyOrders:l,fetchIntegrationSettings:r}},void 0);s.shopifyOrders=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await f(async()=>{const{fetchFaxInbox:l,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>g);return{fetchFaxInbox:l,fetchIntegrationSettings:r}},void 0);s.faxRecords=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/users":{const{fetchUserProfiles:t}=await f(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>g);return{fetchUserProfiles:n}},void 0);s.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:l}=await f(async()=>{const{fetchMyProfile:a,fetchAuditLogs:i,fetchMailSenders:o}=await Promise.resolve().then(()=>g);return{fetchMyProfile:a,fetchAuditLogs:i,fetchMailSenders:o}},void 0),r=s.user?.email??s.myProfile?.email??"";r&&(s.myProfile=await t(r)),s.mailSenders.length===0&&(s.mailSenders=await l()),s.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await f(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>g);return{fetchAuditLogs:n}},void 0);s.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await f(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>g);return{fetchProspects:n}},void 0);s.prospects=await t()}break;case"/map":{const{fetchProspects:t,fetchDeliveryLocations:n,fetchIntegrationSettings:l}=await f(async()=>{const{fetchProspects:r,fetchDeliveryLocations:a,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>g);return{fetchProspects:r,fetchDeliveryLocations:a,fetchIntegrationSettings:i}},void 0);s.prospects=await t(),s.deliveryLocations=await n(),s.integrations.length===0&&(s.integrations=await l())}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await f(async()=>{const{fetchCallLogs:l,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>g);return{fetchCallLogs:l,fetchIntegrationSettings:r}},void 0);s.callLogs=await t(100),s.integrations.length===0&&(s.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await f(async()=>{const{fetchLeadLists:l,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>g);return{fetchLeadLists:l,fetchIntegrationSettings:r}},void 0);s.leadLists=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await f(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>g);return{fetchWorkflowOrdersFromDb:n}},void 0);s.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await f(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>g);return{fetchTourInquiriesFromDb:n}},void 0);s.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:l}=await f(async()=>{const{fetchSlackRules:r,fetchSlackLogs:a,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>g);return{fetchSlackRules:r,fetchSlackLogs:a,fetchIntegrationSettings:i}},void 0);s.slackRules=await t(),s.slackLogs=await n(50),s.integrations.length===0&&(s.integrations=await l())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:n,fetchWorkflowOrdersFromDb:l,fetchTourInquiriesFromDb:r}=await f(async()=>{const{fetchProspects:a,fetchCalendarEvents:i,fetchWorkflowOrdersFromDb:o,fetchTourInquiriesFromDb:c}=await Promise.resolve().then(()=>g);return{fetchProspects:a,fetchCalendarEvents:i,fetchWorkflowOrdersFromDb:o,fetchTourInquiriesFromDb:c}},void 0);s.prospects.length===0&&(s.prospects=await t()),s.calendarEvents.length===0&&(s.calendarEvents=await n(s.calendarYearMonth)),s.materialList.length===0&&(s.materialList=await at()),s.workflowOrders.length===0&&(s.workflowOrders=await l()),s.tourInquiries.length===0&&(s.tourInquiries=await r())}break;default:break}}catch(t){console.warn("Route data load error",t)}finally{s.actionLoading=!1,h()}}function Zt(){if(_t())return Wn(s.authError,s.authSubmitting);if(s.loading)return`
      <section class="panel">
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
          <p class="loading-text">データを読み込んでいます…</p>
        </div>
      </section>`;if(s.error)return`
      <section class="panel error-card">
        <div class="empty-state-icon" style="background:#fbe9e9;color:var(--danger);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5"/><path d="M8 8L16 16M16 8L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${s.error}</p>
        <button class="button primary" onclick="location.reload()">再読込する</button>
      </section>
    `;switch(s.route){case"/cat/sales":return $e("sales");case"/cat/brewery":return $e("brewery");case"/cat/purchase":return $e("purchase");case"/cat/more":return $e("more");case"/invoice-entry":return Vn(s.invoiceForm,s.invoiceSavedDocNo,s.invoiceSaving,s.invoiceErrors);case"/email":return On(Bl());case"/delivery":return s.deliveryNote?Rn(s.deliveryNote,s.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/billing":return s.billingSummary?_n(s.billingSummary,s.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return s.salesReport?Ci(s.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/customer-analysis":return s.customerAnalysis?bi(s.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-abc":return s.productABC?wi(s.productABC):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/jikomi":return s.jikomiView==="calendar"?`${Ot(s.jikomiList,s.jikomiView)}${Gn(s.jikomiList)}`:Ot(s.jikomiList,s.jikomiView);case"/tanks":return kl(s.tankList);case"/kentei":return Kn(s.kenteiList);case"/materials":return ii(s.materialList)+ni(s.materialEditing,s.materialEditingIsNew);case"/purchase":return di(s.purchaseList,s.payableList);case"/raw-material":return ui(s.billList,s.rawStockList);case"/tax":return s.taxDeclaration?_l(s.taxDeclaration,s.taxYear,s.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Ii(s.storeSales,s.storeOrders,s.storeTab,s.storeSalesDate);case"/setup":return s.pipelineMeta?hi(s.pipelineMeta,z,O,s.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return wl(s.rawSelectedTable,s.rawRecords,s.rawTableList,s.rawPage,s.rawTotalCount);case"/import":return Ti(s.importEntity,s.importPreview,s.importing,s.importResult);case"/print":return ml(s.printTemplate,s.printOptions,s.printCompany,s.printData);case"/form-designer":return Ri(s.printData,s.printCompany,s.printOptions,s.fdSavedPositions,s.fdDesignMode);case"/map":{const e=(s.masterStats?.customers??[]).slice(0,200).map((l,r)=>{const a=l;return{...l,lat:a.lat??35.37+r%12*.05+(Math.random()-.5)*.02,lng:a.lng??139.29+Math.floor(r/12)*.05+(Math.random()-.5)*.02,address1:a.address1??"",businessType:a.businessType??"",lastOrderAmount:0}}),n=!!s.integrations.find(l=>l.provider==="google_maps")?.config.api_key;return ji(e,s.prospects,s.deliveryLocations,s.mapFilters,n)}case"/workflow":return Mi(s.workflowOrders);case"/mobile-order":return Fi(s.mobileOrder,s.masterStats?.customers??[],s.masterStats?.products??[]);case"/tour":return zi(s.tourInquiries,s.tourActiveId);case"/mail-senders":return Ui(s.mailSenders,s.mailSenderEditingId);case"/calendar":return Yi(s.calendarEvents,s.calendarYearMonth,s.calendarFilterCategory,s.calendarEdit);case"/integrations":return Xi(s.integrations,s.integrationEditingId);case"/shopify":{const e=s.integrations.find(t=>t.id==="shopify");return Gi(s.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Ki(s.faxRecords,s.faxProcessing,s.faxOcrText);case"/users":return Qi(s.userProfiles,s.userEditingId,s.myProfile);case"/profile":return Wi(s.myProfile,s.auditLogs.filter(e=>e.userEmail===s.myProfile?.email),s.mailSenders);case"/audit":return Zi(s.auditLogs);case"/prospects":{const e={prospects:s.prospects,activities:s.prospectActivities,editingId:s.prospectEditingId,viewMode:s.prospectViewMode};return el(e)}case"/slack":{const e=s.integrations.find(t=>t.provider==="slack")??null;return nl(e,s.slackRules,s.slackLogs)}case"/calls":{const e=s.integrations.find(t=>t.provider==="ivry");return il(s.callLogs,s.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:s.leadLists,activeListId:s.leadActiveListId,items:s.leadItems,searchQuery:s.leadSearchQuery,searchArea:s.leadSearchArea,searchBusinessType:s.leadSearchType,searching:s.leadSearching,searchResults:s.leadSearchResults};return ol(e)}}if(!s.salesSummary||!s.paymentStatus||!s.masterStats||!s.pipelineMeta||!s.customerLedger||!s.salesAnalytics)return"";switch(s.route){case"/sales":return Ei(Xa(s.salesSummary),s.salesFilter.startDate,s.salesFilter.endDate);case"/payment":return ri([...s.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return si(s.masterStats,s.masterTab,s.masterFilter);case"/invoice":return Bn(s.invoiceRecords,s.invoiceFilter);case"/ledger":return Ln(s.customerLedger,s.ledgerCustomerCode);case"/analytics":return Ai(s.salesAnalytics,s.analyticsTab);default:return Pn(s.salesSummary,s.pipelineMeta,s.salesAnalytics,{prospects:s.prospects,upcomingEvents:s.calendarEvents,tourInquiries:s.tourInquiries,workflowOrdersCount:{new:s.workflowOrders.filter(e=>e.stage==="new").length,picking:s.workflowOrders.filter(e=>e.stage==="picking").length,packed:s.workflowOrders.filter(e=>e.stage==="packed").length,shipped:s.workflowOrders.filter(e=>e.stage==="shipped").length,total:s.workflowOrders.length},lowStockCount:s.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:s.masterStats?{customers:s.masterStats.summary.customerCount,products:s.masterStats.summary.productCount,suppliers:s.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:s.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0},s.salesPeriod)}}function Hl(){if(_t())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${Zt()}</div>
        </main>
      </div>
    `;const e={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売管理",items:[{path:"/cat/sales",label:"販売管理トップ",kicker:"Category"},{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"},{path:"/customer-analysis",label:"得意先分析",kicker:"CustABC"},{path:"/product-abc",label:"商品ABC",kicker:"ProdABC"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],brewery:[{label:"蔵内管理",items:[{path:"/cat/brewery",label:"蔵内管理トップ",kicker:"Category"},{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]}],purchase:[{label:"仕入管理",items:[{path:"/cat/purchase",label:"仕入管理トップ",kicker:"Category"},{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],more:[{label:"その他",items:[{path:"/cat/more",label:"その他トップ",kicker:"Category"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/email",label:"メール配信",kicker:"Mail"},{path:"/setup",label:"連動設定",kicker:"Setup"},{path:"/raw-browser",label:"データブラウザ",kicker:"RawData"}]}],email:[{label:"メール配信",items:[{path:"/email",label:"季節商品案内",kicker:"Mail"}]}]},t=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/cat/sales",label:"販売管理"},{category:"brewery",path:"/cat/brewery",label:"蔵内管理"},{category:"purchase",path:"/cat/purchase",label:"仕入管理"},{category:"more",path:"/cat/more",label:"その他"},{category:"email",path:"/email",label:"メール配信"}],n=e[s.currentCategory].map(o=>`
        <div class="nav-group">
          <p class="nav-group-label">${o.label}</p>
          ${o.items.map(c=>`
                <a
                  href="${"/".replace(/\/$/,"")}${c.path==="/"?"/":c.path}"
                  class="nav-link ${s.route===c.path?"active":""}"
                  data-link="${c.path}"
                >
                  <div>
                    <div class="nav-kicker">${c.kicker}</div>
                    <div class="nav-label">${c.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),l=t.map(o=>`
        <a
          href="${"/".replace(/\/$/,"")}${o.path==="/"?"/":o.path}"
          class="category-link ${s.currentCategory===o.category?"active":""}"
          data-link="${o.path}"
        >
          ${o.label}
        </a>
      `).join(""),r=s.pickerMode&&s.masterStats?s.pickerMode==="customer"?Mn(s.masterStats.customers,s.pickerQuery):ci(s.masterStats.products,s.pickerQuery):"",a=s.globalSearchOpen?qn(s.globalQuery,Ul()):"",i=s.user?`
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
          <div class="category-nav">${l}</div>
          <div class="subnav">${n}</div>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${i}
        </header>
        <div class="view ${s.actionLoading?"is-busy":""}">${Zt()}</div>
      </main>
      ${r}
      ${a}
    </div>
  `}async function Xl(e){s.actionLoading=!0,h();try{s.invoiceRecords=await Ne(e)}finally{s.actionLoading=!1,h()}}async function Gl(e){s.actionLoading=!0,h();try{s.customerLedger=await mt(e)}finally{s.actionLoading=!1,h()}}function V(e){s.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??s.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??s.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??s.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??s.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??s.invoiceForm.staffCode,lines:s.invoiceForm.lines.map((t,n)=>{const l=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:l,unitPrice:r,amount:l*r}}),note:e.querySelector("#inv-note")?.value??s.invoiceForm.note},s.invoiceForm.customerCode=s.invoiceForm.customerCode.trim().toUpperCase(),s.invoiceForm.customerName=s.invoiceForm.customerName.trim()}function W(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??s.emailAudienceMode;s.emailAudienceMode=t,s.emailRegion=e.querySelector("#email-region")?.value??s.emailRegion,s.emailHistorySegment=e.querySelector("#email-history-segment")?.value??s.emailHistorySegment,s.emailSubject=e.querySelector("#email-subject")?.value??s.emailSubject,s.emailBody=e.querySelector("#email-body")?.value??s.emailBody}function Kl(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{s.globalSearchOpen=!0,h()}),e.querySelectorAll("[data-action='global-search-close']").forEach(a=>{a.addEventListener("click",i=>{a.classList.contains("global-search")&&i.target instanceof HTMLElement&&!i.target.classList.contains("global-search")||(ve(),h())})}),e.querySelector("#global-search-input")?.addEventListener("input",a=>{s.globalQuery=a.target.value,h()}),e.querySelectorAll("[data-action='global-nav']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.path;i&&(ve(),Wt(i))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Yl()}),e.querySelectorAll("[data-jikomi-tab]").forEach(a=>{a.addEventListener("click",()=>{s.jikomiView=a.dataset.jikomiTab,h()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const a=e.querySelector("#auth-email")?.value.trim()??"",i=e.querySelector("#auth-password")?.value??"";s.authSubmitting=!0,s.authError=null,h(),ts(a,i).then(async o=>{s.user=o,s.authSkipped=!1,s.authSubmitting=!1,s.authError=null;const{fetchMyProfile:c,recordAudit:d}=await f(async()=>{const{fetchMyProfile:u,recordAudit:p}=await Promise.resolve().then(()=>g);return{fetchMyProfile:u,recordAudit:p}},void 0);s.myProfile=await c(o.email),await d({action:"sign_in",userEmail:o.email}),h()}).catch(async o=>{try{const c=await Lt(a,i);s.user=c,s.authSkipped=!1,s.authError=null;const{fetchMyProfile:d}=await f(async()=>{const{fetchMyProfile:u}=await Promise.resolve().then(()=>g);return{fetchMyProfile:u}},void 0);s.myProfile=await d(c.email)}catch{s.authError=o instanceof Error?o.message:"ログインに失敗しました。"}finally{s.authSubmitting=!1,h()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{s.authSkipped=!0,s.authError=null,h()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{as().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{s.sidebarOpen=!0,h()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(a=>{a.addEventListener("click",()=>{s.sidebarOpen=!1,h()})}),e.querySelectorAll("[data-link]").forEach(a=>{a.addEventListener("click",i=>{i.preventDefault(),Wt(a.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async a=>{a.preventDefault();const i=e.querySelector("#fr-title")?.value??"",o=e.querySelector("#fr-category")?.value??"feature",c=e.querySelector("#fr-description")?.value??"",d=e.querySelector("#fr-result");if(!i.trim())return;const u=await ma(i,o,c);if(d&&(d.textContent=u?"送信しました":"送信に失敗しました",d.className=`fr-result ${u?"success":"error"}`),u){const p=e.querySelector("#feature-request-form");p&&p.reset()}}),e.querySelectorAll("[data-period]").forEach(a=>{a.addEventListener("click",()=>{s.salesPeriod=a.dataset.period,h()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async a=>{const i=a.currentTarget;i.disabled=!0,i.textContent="更新中…",await xt(),i.disabled=!1,i.textContent="↻ 更新",b("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const a=e.querySelector("#sales-start")?.value??"",i=e.querySelector("#sales-end")?.value??"";s.salesFilter={startDate:a,endDate:i},h()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const a={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};s.invoiceFilter=a,Xl(a)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const a=e.querySelector("#ledger-customer-code")?.value??"";s.ledgerCustomerCode=a.trim().toUpperCase(),Gl(s.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{s.masterTab=a.dataset.tab,s.masterFilter={...$t},h()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{s.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},h()}),e.querySelector("#master-search")?.addEventListener("keydown",a=>{a.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.page);i>=1&&(s.masterFilter={...s.masterFilter,page:i},h())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.table;if(!i)return;s.rawSelectedTable=i,s.rawPage=1;const o=await Pe(i,1);s.rawRecords=o.records,s.rawTotalCount=o.total,h()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable||s.rawPage<=1)return;s.rawPage-=1;const a=await Pe(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,h()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable)return;s.rawPage+=1;const a=await Pe(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,h()}),e.querySelectorAll("[data-analytics-tab]").forEach(a=>{a.addEventListener("click",()=>{s.analyticsTab=a.dataset.analyticsTab,h()})}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{V(e),s.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),s.invoiceErrors={},h()}),e.querySelectorAll("[data-action='remove-line']").forEach(a=>{a.addEventListener("click",()=>{V(e);const i=parseInt(a.dataset.line??"0",10);s.invoiceForm.lines.splice(i,1),s.invoiceErrors=Ya(s.invoiceForm),h()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(a=>{a.addEventListener("click",()=>{V(e),Fl(parseInt(a.dataset.line??"0",10)),s.invoiceErrors={},h()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Vl(),h()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{V(e),s.pickerMode="customer",s.pickerTargetLine=null,s.pickerQuery=s.invoiceForm.customerCode||s.invoiceForm.customerName,h()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(a=>{a.addEventListener("click",()=>{V(e);const i=parseInt(a.dataset.line??"0",10),o=s.invoiceForm.lines[i];s.pickerMode="product",s.pickerTargetLine=i,s.pickerQuery=o?o.productCode||o.productName:"",h()})}),e.querySelectorAll("[data-action='modal-close']").forEach(a=>{a.addEventListener("click",i=>{a.classList.contains("modal-backdrop")&&i.target instanceof HTMLElement&&!i.target.classList.contains("modal-backdrop")||(qe(),h())})}),e.querySelectorAll("[data-action='picker-select']").forEach(a=>{const i=async()=>{const o=a.dataset.code??"",c=a.dataset.name??"";if(s.pickerMode==="customer"){s.invoiceForm.customerCode=o,s.invoiceForm.customerName=c,delete s.invoiceErrors.customerCode;const d=s.masterStats?.customers.find(u=>u.code===o);s.invoicePriceGroup=d?.priceGroup||"",!s.invoicePriceGroup&&o&&(s.invoicePriceGroup=await nt(o))}else if(s.pickerMode==="product"&&s.pickerTargetLine!==null){const d=s.invoiceForm.lines[s.pickerTargetLine];if(d){d.productCode=o,d.productName=c;const u=await ja(s.invoicePriceGroup,o);u>0&&(d.unitPrice=u),d.amount=d.quantity*d.unitPrice,delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productCode`],delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productName`]}}qe(),h()};a.addEventListener("click",i),a.addEventListener("keydown",o=>{o.key==="Enter"&&i()})}),e.querySelector("#modal-search")?.addEventListener("input",a=>{s.pickerQuery=a.target.value,h()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Ua(),h()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Ha(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{V(e),zl(s.invoiceForm.customerCode)&&(delete s.invoiceErrors.customerCode,!s.invoicePriceGroup&&s.invoiceForm.customerCode&&(s.invoicePriceGroup=await nt(s.invoiceForm.customerCode)),h())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{V(e),Jl(s.invoiceForm.customerName)&&(delete s.invoiceErrors.customerCode,h())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(a=>{a.addEventListener("input",()=>{V(e),s.invoiceSavedDocNo=null;const i=a.dataset.field;(i==="quantity"||i==="unitPrice")&&h()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{V(e),s.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const a=e.querySelector("#delivery-docno")?.value??"";s.deliverySearchDocNo=a.trim(),s.deliveryNote=null,s.actionLoading=!0,h(),ht(s.deliverySearchDocNo||"D240122").then(i=>{s.deliveryNote=i,s.actionLoading=!1,h()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const a=e.querySelector("#billing-month")?.value??s.billingYearMonth;s.billingYearMonth=a,s.billingSummary=null,s.actionLoading=!0,h(),yt(a).then(i=>{s.billingSummary=i,s.actionLoading=!1,h()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const a=parseInt(e.querySelector("#tax-year")?.value??String(s.taxYear),10),i=parseInt(e.querySelector("#tax-month")?.value??String(s.taxMonth),10);s.taxYear=a,s.taxMonth=i,s.taxDeclaration=null,s.actionLoading=!0,h(),vt(a,i).then(o=>{s.taxDeclaration=o,s.actionLoading=!1,h()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxXML:a}=await f(async()=>{const{generateTaxXML:u}=await Promise.resolve().then(()=>g);return{generateTaxXML:u}},void 0),i=a(s.taxDeclaration),o=new Blob([i],{type:"application/xml;charset=utf-8"}),c=URL.createObjectURL(o),d=document.createElement("a");d.href=c,d.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.xml`,d.click(),URL.revokeObjectURL(c)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxCSV:a}=await f(async()=>{const{generateTaxCSV:u}=await Promise.resolve().then(()=>g);return{generateTaxCSV:u}},void 0),i=a(s.taxDeclaration),o=new Blob([i],{type:"text/csv;charset=utf-8"}),c=URL.createObjectURL(o),d=document.createElement("a");d.href=c,d.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.csv`,d.click(),URL.revokeObjectURL(c)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{saveTaxDeclaration:a}=await f(async()=>{const{saveTaxDeclaration:i}=await Promise.resolve().then(()=>g);return{saveTaxDeclaration:i}},void 0);try{await a(s.taxDeclaration),b("下書き保存しました")}catch(i){b("保存に失敗: "+(i instanceof Error?i.message:String(i)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(a=>{a.addEventListener("change",async()=>{if(!s.taxDeclaration)return;const i=Number(a.dataset.taxRow),o=a.dataset.taxField,c=a.type==="number"?Number(a.value)||0:a.value,d=[...s.taxDeclaration.rows];d[i]={...d[i],[o]:c};const{recalculateTaxDeclaration:u}=await f(async()=>{const{recalculateTaxDeclaration:p}=await Promise.resolve().then(()=>g);return{recalculateTaxDeclaration:p}},void 0);s.taxDeclaration=u({...s.taxDeclaration,rows:d}),h()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const i=Number(a.dataset.dedRow),o=a.dataset.dedField,c=a.type==="number"?Number(a.value)||0:a.value,d=[...s.taxDeclaration.deductions];d[i]={...d[i],[o]:c},s.taxDeclaration={...s.taxDeclaration,deductions:d},h()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const i=a.dataset.taxField;s.taxDeclaration={...s.taxDeclaration,[i]:a.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{recalculateTaxDeclaration:a,TAX_RATE_CATEGORIES:i}=await f(async()=>{const{recalculateTaxDeclaration:d,TAX_RATE_CATEGORIES:u}=await Promise.resolve().then(()=>g);return{recalculateTaxDeclaration:d,TAX_RATE_CATEGORIES:u}},void 0),o=i[0],c={taxCategory:o.code,taxCategoryName:o.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:o.taxRatePerLiter,taxAmount:0};s.taxDeclaration=a({...s.taxDeclaration,rows:[...s.taxDeclaration.rows,c]}),h()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(a=>{a.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const i=Number(a.dataset.taxRow),{recalculateTaxDeclaration:o}=await f(async()=>{const{recalculateTaxDeclaration:d}=await Promise.resolve().then(()=>g);return{recalculateTaxDeclaration:d}},void 0),c=s.taxDeclaration.rows.filter((d,u)=>u!==i);s.taxDeclaration=o({...s.taxDeclaration,rows:c}),h()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!s.taxDeclaration)return;const a={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};s.taxDeclaration={...s.taxDeclaration,deductions:[...s.taxDeclaration.deductions,a]},h()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(a=>{a.addEventListener("click",()=>{if(!s.taxDeclaration)return;const i=Number(a.dataset.dedRow),o=s.taxDeclaration.deductions.filter((c,d)=>d!==i);s.taxDeclaration={...s.taxDeclaration,deductions:o},h()})}),e.querySelectorAll("[data-store-tab]").forEach(a=>{a.addEventListener("click",()=>{s.storeTab=a.dataset.storeTab,h()})}),e.querySelectorAll("[data-import-entity]").forEach(a=>{a.addEventListener("click",()=>{s.importEntity=a.dataset.importEntity,s.importPreview=null,s.importResult=null,h()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const a=bl(s.importEntity),i=new Blob([a],{type:"text/csv;charset=utf-8"}),o=URL.createObjectURL(i),c=document.createElement("a");c.href=o,c.download=`template_${s.importEntity}.csv`,c.click(),URL.revokeObjectURL(o)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const i=e.querySelector("#import-file")?.files?.[0];if(!i){b("CSVファイルを選択してください","warning");return}const o=new FileReader;o.onload=()=>{const c=String(o.result??""),{columns:d,rows:u}=vl(c);s.importPreview=fl(s.importEntity,d,u),s.importResult=null,h()},o.readAsText(i,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{s.importPreview=null,s.importResult=null,h()}),e.querySelectorAll("[data-print-template]").forEach(a=>{a.addEventListener("click",()=>{s.printTemplate=a.dataset.printTemplate,h()})}),e.querySelectorAll("[data-print-field]").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.printField;let o=a.value;(i==="taxRate"||i==="previousBalance"||i==="paymentAmount")&&(o=Number(a.value)||0),s.printData={...s.printData,[i]:o},h()})}),e.querySelectorAll("[data-print-opt]").forEach(a=>{const i=()=>{const o=a.dataset.printOpt;let c;a.type==="checkbox"?c=a.checked:o==="copies"?c=Number(a.value)||1:o==="overlayOpacity"||o==="calibrationOffsetX"||o==="calibrationOffsetY"?c=Number(a.value)||0:c=a.value,s.printOptions={...s.printOptions,[o]:c},h()};a.addEventListener("change",i),a.type==="range"&&a.addEventListener("input",i)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(a=>{a.addEventListener("change",()=>{const i=Number(a.dataset.printLine),o=a.dataset.printLfield,c=[...s.printData.lines];let d=a.value;(o==="quantity"||o==="unitPrice")&&(d=Number(a.value)||0),c[i]={...c[i],[o]:d},c[i].amount=(Number(c[i].quantity)||0)*(Number(c[i].unitPrice)||0),s.printData={...s.printData,lines:c},h()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{s.printData={...s.printData,lines:[...s.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},h()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.printLine);s.printData={...s.printData,lines:s.printData.lines.filter((o,c)=>c!==i)},h()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(s.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(s.printCompany)),b("印刷設定を保存しました")}catch(a){b("保存失敗: "+(a instanceof Error?a.message:String(a)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const a=s.printCompany,i=prompt("会社名",a.name);if(i===null)return;const o=prompt("郵便番号",a.postalCode)??a.postalCode,c=prompt("住所",a.address1)??a.address1,d=prompt("TEL",a.tel)??a.tel,u=prompt("FAX",a.fax)??a.fax,p=prompt("適格請求書登録番号 (T+13桁)",a.registrationNo)??a.registrationNo,y=prompt("取引銀行名",a.bankName)??a.bankName,v=prompt("支店名",a.bankBranch)??a.bankBranch,$=prompt("口座番号",a.bankAccountNo)??a.bankAccountNo,k=prompt("口座名義",a.bankAccountHolder)??a.bankAccountHolder;s.printCompany={...a,name:i,postalCode:o,address1:c,tel:d,fax:u,registrationNo:p,bankName:y,bankBranch:v,bankAccountNo:$,bankAccountHolder:k},h()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{s.fdDesignMode=!s.fdDesignMode,h()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const o=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",c=Ke(a),{savePrintLayout:d}=await f(async()=>{const{savePrintLayout:p}=await Promise.resolve().then(()=>g);return{savePrintLayout:p}},void 0),u={id:`bp1701_${o.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:o,templateKey:"chain_store",positions:c};try{await d(u)?(b(`クラウド保存成功: ${o}`),s.fdSavedPositions=c,localStorage.setItem("sake_fd_positions",JSON.stringify(c)),h()):(b("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(c)))}catch(p){b("保存エラー: "+(p instanceof Error?p.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const i=Ke(a);s.fdSavedPositions=i;try{localStorage.setItem("sake_fd_positions",JSON.stringify(i)),b(`ローカル保存完了: ${Object.keys(i).length}件`)}catch(o){b("保存失敗: "+(o instanceof Error?o.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const o={templateKey:"chain_store",positions:Ke(a),exportedAt:new Date().toISOString()},c=new Blob([JSON.stringify(o,null,2)],{type:"application/json"}),d=URL.createObjectURL(c),u=document.createElement("a");u.href=d,u.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,u.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async a=>{const i=a.target.files?.[0];if(i)try{const o=await i.text(),d=JSON.parse(o).positions;if(!d)throw new Error("positions field not found");s.fdSavedPositions=d,localStorage.setItem("sake_fd_positions",JSON.stringify(d)),b(`インポート成功: ${Object.keys(d).length}件`),h()}catch(o){b("インポート失敗: "+(o instanceof Error?o.message:""),"error")}});const t=e.querySelector("#fd-saved-layouts");t&&s.route==="/form-designer"&&s.fdDesignMode&&(async()=>{const{fetchPrintLayouts:a}=await f(async()=>{const{fetchPrintLayouts:o}=await Promise.resolve().then(()=>g);return{fetchPrintLayouts:o}},void 0),i=await a("chain_store");i.length===0?t.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(t.innerHTML=`☁️ クラウド保存済み (${i.length}件):<br/>`+i.map(o=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${o.id}" style="margin:4px 4px 0 0;">${o.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${o.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),t.querySelectorAll("[data-action='fd-load-layout']").forEach(o=>{o.addEventListener("click",()=>{const c=o.dataset.layoutId,d=i.find(u=>u.id===c);d&&(s.fdSavedPositions=d.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(d.positions)),b(`読込完了: ${d.name}`),h())})}),t.querySelectorAll("[data-action='fd-delete-layout']").forEach(o=>{o.addEventListener("click",async()=>{const c=o.dataset.layoutId;if(!c||!await B("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:d}=await f(async()=>{const{deletePrintLayout:p}=await Promise.resolve().then(()=>g);return{deletePrintLayout:p}},void 0);await d(c)?(b("削除しました"),h()):b("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await B("フィールド位置を初期値に戻しますか？")&&(s.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),h())});const n=e.querySelector("#fd-sel-x"),l=e.querySelector("#fd-sel-y");[n,l].forEach(a=>{a?.addEventListener("change",()=>{if(!s.fdActiveFieldId)return;const i=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);i&&(n&&(i.style.left=n.value+"mm"),l&&(i.style.top=l.value+"mm"))})});const r=e.querySelector("#customer-map");r&&s.route==="/map"&&Ka(r),e.querySelectorAll(".wf-card").forEach(a=>{a.addEventListener("dragstart",i=>{a.classList.add("wf-dragging"),i.dataTransfer?.setData("text/plain",a.dataset.wfOrder??"")}),a.addEventListener("dragend",()=>a.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(a=>{a.addEventListener("dragover",i=>i.preventDefault()),a.addEventListener("drop",i=>{i.preventDefault();const o=i.dataTransfer?.getData("text/plain"),c=a.dataset.wfStage;if(!o||!c)return;const d=s.workflowOrders.find(u=>u.id===o);d&&(d.stage=c,h())})}),e.querySelectorAll("[data-mo-step]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.moStep;a.disabled||(s.mobileOrder.step=i,h())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",a=>{s.mobileOrder.customerQuery=a.target.value,h()}),e.querySelector("#mo-product-q")?.addEventListener("input",a=>{s.mobileOrder.productQuery=a.target.value,h()}),e.querySelectorAll("[data-mo-select-customer]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.moSelectCustomer,o=s.masterStats?.customers.find(c=>c.id===i);o&&(s.mobileOrder.selectedCustomer=o),h()})}),e.querySelectorAll("[data-mo-add-product]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.moAddProduct,o=s.masterStats?.products.find(d=>d.code===i);if(!o)return;const c=1800;s.mobileOrder.cart.push({productCode:o.code,productName:o.name,quantity:1,unit:"本",unitPrice:c,amount:c}),h()})}),e.querySelectorAll("[data-mo-qty]").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.moQty),o=a.dataset.moProduct,c=s.mobileOrder.cart.find(d=>d.productCode===o);c&&(c.quantity=Math.max(0,c.quantity+i),c.amount=c.quantity*c.unitPrice,c.quantity===0&&(s.mobileOrder.cart=s.mobileOrder.cart.filter(d=>d.productCode!==o)),h())})}),e.querySelectorAll("[data-mo-remove]").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.moRemove);s.mobileOrder.cart.splice(i,1),h()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const a=e.querySelector("#mo-memo");s.mobileOrder.memo=a?.value??"";const i="MO"+Date.now().toString().slice(-8);s.mobileOrder.submittedDocNo=i,s.mobileOrder.step="done",h()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{s.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},h()}),e.querySelectorAll("[data-tour-id]").forEach(a=>{a.addEventListener("click",()=>{s.tourActiveId=a.dataset.tourId??null,h()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(a=>{a.addEventListener("click",()=>{const i=s.tourInquiries.find(p=>p.id===s.tourActiveId);if(!i)return;const o=a.dataset.template==="confirm"?Ji:Bi,c=e.querySelector("#tour-confirmed-time"),d=o.replaceAll("{name}",i.name).replaceAll("{partySize}",String(i.partySize)).replaceAll("{confirmedTime}",c?.value??i.visitDate),u=e.querySelector("#tour-reply-body");u&&(u.value=d)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const a=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",i=s.tourInquiries.find(c=>c.id===a);if(!i)return;const o=e.querySelector("#tour-confirmed-time");i.status="confirmed",i.repliedAt=new Date().toISOString(),i.confirmedTime=o?.value??"",b("返信メールを下書き保存し、ステータスを確定にしました"),h()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const a=e.querySelector("#lb-type")?.value??"",i=e.querySelector("#lb-area")?.value??"",o=e.querySelector("#lb-keyword")?.value??"";if(!a&&!o){b("業種かキーワードを入力してください","warning");return}s.leadSearchType=a,s.leadSearchArea=i,s.leadSearchQuery=o,s.leadSearching=!0,h();const c=s.integrations.find(y=>y.provider==="google_maps");if(!c||!c.config.api_key){b("Google Maps APIキーが /integrations で未設定です","warning"),s.leadSearching=!1,h();return}const{searchPlaces:d}=await f(async()=>{const{searchPlaces:y}=await Promise.resolve().then(()=>g);return{searchPlaces:y}},void 0),u=[a,o].filter(Boolean).join(" "),p=await d(c,u,i);s.leadSearching=!1,p.error?b("検索失敗: "+p.error,"error"):s.leadSearchResults=p.results,h()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{s.leadSearchResults=[],h()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(s.leadSearchResults.length===0)return;const a=prompt("リスト名を入力:",`${s.leadSearchType} ${s.leadSearchArea}`);if(!a)return;const i=`ll_${Date.now()}`,o={id:i,name:a,query:s.leadSearchQuery,area:s.leadSearchArea,businessType:s.leadSearchType,totalCount:s.leadSearchResults.length,source:"google_places"},{saveLeadList:c,saveLeadItem:d,fetchLeadLists:u,fetchLeadItems:p}=await f(async()=>{const{saveLeadList:$,saveLeadItem:k,fetchLeadLists:w,fetchLeadItems:x}=await Promise.resolve().then(()=>g);return{saveLeadList:$,saveLeadItem:k,fetchLeadLists:w,fetchLeadItems:x}},void 0);await c(o);const y=e.querySelectorAll(".lb-search-check:checked"),v=Array.from(y).map($=>Number($.dataset.idx));for(const $ of v){const k=s.leadSearchResults[$];k&&await d({...k,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:i,businessType:s.leadSearchType})}s.leadLists=await u(),s.leadActiveListId=i,s.leadItems=await p(i),s.leadSearchResults=[],b(`${v.length}件を「${a}」として保存しました`),h()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??null;if(s.leadActiveListId=i,i){const{fetchLeadItems:o}=await f(async()=>{const{fetchLeadItems:c}=await Promise.resolve().then(()=>g);return{fetchLeadItems:c}},void 0);s.leadItems=await o(i)}h()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??"",o=s.leadItems.find(u=>u.id===i);if(!o)return;const{saveLeadItem:c,fetchLeadItems:d}=await f(async()=>{const{saveLeadItem:u,fetchLeadItems:p}=await Promise.resolve().then(()=>g);return{saveLeadItem:u,fetchLeadItems:p}},void 0);await c({...o,status:"excluded"}),s.leadActiveListId&&(s.leadItems=await d(s.leadActiveListId)),h()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??"",o=s.leadItems.find(p=>p.id===i);if(!o)return;const{convertLeadToProspect:c,fetchLeadItems:d}=await f(async()=>{const{convertLeadToProspect:p,fetchLeadItems:y}=await Promise.resolve().then(()=>g);return{convertLeadToProspect:p,fetchLeadItems:y}},void 0);await c(o)&&(b("見込客に追加しました: "+o.companyName),s.leadActiveListId&&(s.leadItems=await d(s.leadActiveListId)),h())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const a=e.querySelectorAll(".lb-item-check:checked");if(a.length===0&&!await B("全ての新規アイテムを見込客に変換しますか？"))return;const i=a.length>0?Array.from(a).map(u=>u.dataset.id):s.leadItems.filter(u=>u.status==="new").map(u=>u.id),{convertLeadToProspect:o,fetchLeadItems:c}=await f(async()=>{const{convertLeadToProspect:u,fetchLeadItems:p}=await Promise.resolve().then(()=>g);return{convertLeadToProspect:u,fetchLeadItems:p}},void 0);let d=0;for(const u of i){const p=s.leadItems.find(y=>y.id===u);p&&p.status==="new"&&await o(p)&&d++}b(`${d}件を見込客に変換しました`),s.leadActiveListId&&(s.leadItems=await c(s.leadActiveListId)),h()}),e.querySelectorAll("[data-map-filter]").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.mapFilter;let o;a.type==="checkbox"?o=a.checked:o=a.value,s.mapFilters={...s.mapFilters,[i]:o},h()})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const a=s.integrations.find(d=>d.provider==="ivry");if(!a||!a.isEnabled){b("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:i,fetchCallLogs:o}=await f(async()=>{const{syncIvryCallLogs:d,fetchCallLogs:u}=await Promise.resolve().then(()=>g);return{syncIvryCallLogs:d,fetchCallLogs:u}},void 0),c=await i(a);c.error?b("同期失敗: "+c.error,"error"):(b(`${c.count}件の通話履歴を同期しました`),s.callLogs=await o(100),h())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const a=s.integrations.find(d=>d.provider==="ivry");if(!a||!a.isEnabled){b("IVRy連携が無効です","warning");return}if(!await B("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:i}=await f(async()=>{const{syncPhoneBookToIvry:d}=await Promise.resolve().then(()=>g);return{syncPhoneBookToIvry:d}},void 0),o=[];s.masterStats?.customers.forEach(d=>{o.push({name:d.name,phone:"",customerCode:d.code,note:"既存取引先"})}),s.prospects.forEach(d=>{d.phone&&o.push({name:d.companyName,phone:d.phone,customerCode:d.id,note:`見込客 (${d.stage})`})});const c=await i(a,o);c.error?b("送信失敗: "+c.error,"error"):b(`${c.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??"",o=a.dataset.phone??"",c=prompt(`電話番号 ${o} を顧客コードに紐付け
顧客コードを入力:`);if(!c)return;const d=s.callLogs.find(y=>y.id===i);if(!d)return;const{saveCallLog:u,fetchCallLogs:p}=await f(async()=>{const{saveCallLog:y,fetchCallLogs:v}=await Promise.resolve().then(()=>g);return{saveCallLog:y,fetchCallLogs:v}},void 0);await u({...d,matchedCustomerCode:c}),s.callLogs=await p(100),h()})}),e.querySelectorAll("[data-action='call-memo']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??"",o=s.callLogs.find(p=>p.id===i);if(!o)return;const c=prompt("メモを入力:",o.notes??"");if(c===null)return;const{saveCallLog:d,fetchCallLogs:u}=await f(async()=>{const{saveCallLog:p,fetchCallLogs:y}=await Promise.resolve().then(()=>g);return{saveCallLog:p,fetchCallLogs:y}},void 0);await d({...o,notes:c}),s.callLogs=await u(100),h()})}),e.querySelectorAll("[data-prospect-view]").forEach(a=>{a.addEventListener("click",()=>{s.prospectViewMode=a.dataset.prospectView,h()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{s.prospectEditingId="__new__",h()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??null;if(s.prospectEditingId=i,i){const{fetchProspectActivities:o}=await f(async()=>{const{fetchProspectActivities:c}=await Promise.resolve().then(()=>g);return{fetchProspectActivities:c}},void 0);s.prospectActivities=await o(i)}h()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.prospectId??null;if(s.prospectEditingId=i,i){const{fetchProspectActivities:o}=await f(async()=>{const{fetchProspectActivities:c}=await Promise.resolve().then(()=>g);return{fetchProspectActivities:c}},void 0);s.prospectActivities=await o(i)}h()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(a=>{a.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(s.prospectEditingId=null,s.prospectActivities=[],h())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const a=s.prospectEditingId==="__new__",i=a?`p_${Date.now()}`:s.prospectEditingId??"",o={id:i,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!o.companyName){b("会社名は必須です","warning");return}const{saveProspect:c,fetchProspects:d,recordAudit:u,sendSlackNotification:p}=await f(async()=>{const{saveProspect:v,fetchProspects:$,recordAudit:k,sendSlackNotification:w}=await Promise.resolve().then(()=>g);return{saveProspect:v,fetchProspects:$,recordAudit:k,sendSlackNotification:w}},void 0);await c(o)?(a&&await p("new_prospect",`新規見込客: ${o.companyName} / 想定 ¥${o.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await u({action:a?"prospect_create":"prospect_update",entityType:"prospect",entityId:i,userEmail:s.user?.email}),s.prospects=await d(),s.prospectEditingId=null,h()):b("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await B("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=a.dataset.id??"",{deleteProspect:o,fetchProspects:c}=await f(async()=>{const{deleteProspect:d,fetchProspects:u}=await Promise.resolve().then(()=>g);return{deleteProspect:d,fetchProspects:u}},void 0);await o(i)&&(s.prospects=await c(),h())})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",i=e.querySelector("#prospect-activity-type")?.value??"call",o=e.querySelector("#prospect-activity-title")?.value??"";if(!o){b("内容を入力してください","warning");return}const{saveProspectActivity:c,fetchProspectActivities:d}=await f(async()=>{const{saveProspectActivity:u,fetchProspectActivities:p}=await Promise.resolve().then(()=>g);return{saveProspectActivity:u,fetchProspectActivities:p}},void 0);await c({id:`act_${Date.now()}`,prospectId:a,activityType:i,title:o,activityDate:new Date().toISOString(),staffCode:s.myProfile?.staffCode}),s.prospectActivities=await d(a),h()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("dragstart",i=>{i.dataTransfer?.setData("text/plain",a.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(a=>{a.addEventListener("dragover",i=>i.preventDefault()),a.addEventListener("drop",async i=>{i.preventDefault();const o=i.dataTransfer?.getData("text/plain"),c=a.dataset.prospectStage;if(!o)return;const d=s.prospects.find(u=>u.id===o);if(d&&d.stage!==c){const u={...d,stage:c},{saveProspect:p}=await f(async()=>{const{saveProspect:y}=await Promise.resolve().then(()=>g);return{saveProspect:y}},void 0);await p(u),d.stage=c,h()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:a,saveIntegrationSetting:i}=await f(async()=>{const{fetchIntegrationSettings:y,saveIntegrationSetting:v}=await Promise.resolve().then(()=>g);return{fetchIntegrationSettings:y,saveIntegrationSetting:v}},void 0),c=(s.integrations.length>0?s.integrations:await a()).find(y=>y.provider==="slack");if(!c)return;const d=e.querySelector("#slack-webhook")?.value??"",u=e.querySelector("#slack-default-channel")?.value??"",p=e.querySelector("#slack-enabled")?.checked??!1;await i({...c,config:{...c.config,webhook_url:d,default_channel:u},isEnabled:p}),s.integrations=await a(),b("保存しました"),h()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:a,fetchSlackRules:i}=await f(async()=>{const{saveSlackRule:o,fetchSlackRules:c}=await Promise.resolve().then(()=>g);return{saveSlackRule:o,fetchSlackRules:c}},void 0);for(const o of s.slackRules){const c=e.querySelector(`[data-slack-rule-id="${o.id}"][data-slack-field="enabled"]`)?.checked??o.enabled,d=e.querySelector(`[data-slack-rule-id="${o.id}"][data-slack-field="channel"]`)?.value??o.channel;await a({...o,enabled:c,channel:d})}s.slackRules=await i(),b("ルールを保存しました"),h()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:a}=await f(async()=>{const{sendSlackNotification:o}=await Promise.resolve().then(()=>g);return{sendSlackNotification:o}},void 0),i=await a("new_order","🧪 これはテスト通知です (syusen-cloud)");i.ok?b("テスト送信成功"):b("送信失敗: "+(i.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{s.materialEditing=null,s.materialEditingIsNew=!0,h()}),e.querySelectorAll("[data-action='material-adjust']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id??"",o=s.materialList.find(c=>c.id===i);o&&(s.materialEditing=o,s.materialEditingIsNew=!1,h())})}),e.querySelectorAll("[data-action='material-close']").forEach(a=>{a.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(s.materialEditing=null,s.materialEditingIsNew=!1,h())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const i={id:s.materialEditingIsNew?`mat_${Date.now()}`:s.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(i.materialType=e.querySelector("#mat-type")?.value??"",!i.code||!i.name){b("コードと品名は必須です","warning");return}const{saveMaterial:o,fetchMaterialList:c}=await f(async()=>{const{saveMaterial:u,fetchMaterialList:p}=await Promise.resolve().then(()=>g);return{saveMaterial:u,fetchMaterialList:p}},void 0);await o(i)?(s.materialList=await c(),s.materialEditing=null,s.materialEditingIsNew=!1,b("保存しました"),h()):b("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!a||!await B("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:i,fetchMaterialList:o}=await f(async()=>{const{deleteMaterial:c,fetchMaterialList:d}=await Promise.resolve().then(()=>g);return{deleteMaterial:c,fetchMaterialList:d}},void 0);await i(a)&&(s.materialList=await o(),s.materialEditing=null,h())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{s.userEditingId="__new__",h()}),e.querySelectorAll("[data-action='user-edit']").forEach(a=>{a.addEventListener("click",()=>{s.userEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{s.userEditingId=null,h()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const a=s.userEditingId==="__new__",i=a?crypto.randomUUID():s.userEditingId??"",o=e.querySelector("#user-email")?.value.trim()??"",c=e.querySelector("#user-name")?.value.trim()??"";if(!o||!c){b("名前とメールアドレスは必須です","warning");return}const d={id:i,email:o,displayName:c,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(a){const $=e.querySelector("#user-password")?.value??"";if($.length<8){b("パスワードは8文字以上必要です","warning");return}try{await Lt(o,$)}catch(k){b("Auth登録失敗: "+(k instanceof Error?k.message:""),"error");return}}const{saveUserProfile:u,fetchUserProfiles:p,recordAudit:y}=await f(async()=>{const{saveUserProfile:$,fetchUserProfiles:k,recordAudit:w}=await Promise.resolve().then(()=>g);return{saveUserProfile:$,fetchUserProfiles:k,recordAudit:w}},void 0);await u(d)?(await y({action:a?"user_create":"user_update",entityType:"user",entityId:i,userEmail:s.user?.email}),s.userProfiles=await p(),s.userEditingId=null,b("保存しました"),h()):b("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await B("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=a.dataset.id??"",{deleteUserProfile:o,fetchUserProfiles:c,recordAudit:d}=await f(async()=>{const{deleteUserProfile:p,fetchUserProfiles:y,recordAudit:v}=await Promise.resolve().then(()=>g);return{deleteUserProfile:p,fetchUserProfiles:y,recordAudit:v}},void 0);await o(i)?(await d({action:"user_delete",entityType:"user",entityId:i,userEmail:s.user?.email}),s.userProfiles=await c(),h()):b("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!s.myProfile)return;const a=e.querySelector("#profile-sender")?.value??"",i={...s.myProfile,defaultMailSenderId:a},{saveUserProfile:o}=await f(async()=>{const{saveUserProfile:c}=await Promise.resolve().then(()=>g);return{saveUserProfile:c}},void 0);await o(i),s.myProfile=i,b("保存しました"),h()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const a=e.querySelector("#profile-new-password")?.value??"";if(a.length<8){b("8文字以上のパスワードを入力してください","warning");return}try{await ns(a),b("パスワードを変更しました")}catch(i){b("変更失敗: "+(i instanceof Error?i.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(a=>{a.addEventListener("click",()=>{s.integrationEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{s.integrationEditingId=null,h()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='int-save']")?.dataset.id??"",i=s.integrations.find(y=>y.id===a);if(!i)return;const o={...i.config};Object.keys(o).forEach(y=>{const v=e.querySelector(`#int-${y}`);v&&(o[y]=v.value)});const c=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:d,fetchIntegrationSettings:u}=await f(async()=>{const{saveIntegrationSetting:y,fetchIntegrationSettings:v}=await Promise.resolve().then(()=>g);return{saveIntegrationSetting:y,fetchIntegrationSettings:v}},void 0);await d({...i,config:o,isEnabled:c})?(s.integrations=await u(),s.integrationEditingId=null,b("保存しました"),h()):b("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(a=>{a.addEventListener("click",async()=>{const i=s.integrations.find(u=>u.provider==="shopify");if(!i){b("Shopify連携が未設定です","warning");return}a.textContent="同期中…",a.disabled=!0;const{syncShopifyOrders:o,fetchShopifyOrders:c}=await f(async()=>{const{syncShopifyOrders:u,fetchShopifyOrders:p}=await Promise.resolve().then(()=>g);return{syncShopifyOrders:u,fetchShopifyOrders:p}},void 0),d=await o(i);d.error?b("同期失敗: "+d.error,"error"):(b(`${d.count}件を同期しました`),s.shopifyOrders=await c()),h()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(a=>{a.addEventListener("click",async()=>{const i=s.integrations.find(u=>u.provider==="google_calendar");if(!i)return;a.textContent="同期中…",a.disabled=!0;const{syncGoogleCalendar:o,fetchCalendarEvents:c}=await f(async()=>{const{syncGoogleCalendar:u,fetchCalendarEvents:p}=await Promise.resolve().then(()=>g);return{syncGoogleCalendar:u,fetchCalendarEvents:p}},void 0),d=await o(i);d.error?b("同期失敗: "+d.error,"error"):(b(`${d.count}件を同期しました`),s.calendarEvents=await c(s.calendarYearMonth)),h()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const i=e.querySelector("#fax-file")?.files?.[0];if(!i){b("FAX画像を選択してください","warning");return}const o=s.integrations.find(c=>c.provider==="cloud_vision");if(!o||!o.config.api_key){b("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}s.faxProcessing=!0,s.faxOcrText=null,h();try{const c=new FileReader;c.onload=async()=>{const d=String(c.result??""),{ocrFaxImage:u,saveFaxRecord:p,fetchFaxInbox:y}=await f(async()=>{const{ocrFaxImage:w,saveFaxRecord:x,fetchFaxInbox:J}=await Promise.resolve().then(()=>g);return{ocrFaxImage:w,saveFaxRecord:x,fetchFaxInbox:J}},void 0),v=await u(o,d),$=e.querySelector("#fax-sender-name")?.value??"",k=e.querySelector("#fax-sender-phone")?.value??"";await p({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:$,senderPhone:k,ocrStatus:v.error?"failed":"done",ocrText:v.text}),s.faxOcrText=v.error?`エラー: ${v.error}`:v.text,s.faxRecords=await y(),s.faxProcessing=!1,h()},c.readAsDataURL(i)}catch(c){b("OCR失敗: "+(c instanceof Error?c.message:""),"error"),s.faxProcessing=!1,h()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{s.mailSenderEditingId="__new__",h()}),e.querySelectorAll("[data-action='ms-edit']").forEach(a=>{a.addEventListener("click",()=>{s.mailSenderEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{s.mailSenderEditingId=null,h()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,i={id:a,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:s.mailSenders.find(u=>u.id===a)?.isVerified??!1};if(!i.name||!i.email){b("名前とメールアドレスは必須です","warning");return}const{saveMailSender:o,fetchMailSenders:c}=await f(async()=>{const{saveMailSender:u,fetchMailSenders:p}=await Promise.resolve().then(()=>g);return{saveMailSender:u,fetchMailSenders:p}},void 0);await o(i)?(s.mailSenders=await c(),s.mailSenderEditingId=null,b("保存しました"),h()):b("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await B("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=a.dataset.id??"",{deleteMailSender:o,fetchMailSenders:c}=await f(async()=>{const{deleteMailSender:u,fetchMailSenders:p}=await Promise.resolve().then(()=>g);return{deleteMailSender:u,fetchMailSenders:p}},void 0);await o(i)?(s.mailSenders=await c(),h()):b("削除失敗","error")})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(a=>{a.addEventListener("click",async()=>{s.calendarYearMonth=a.dataset.ym??s.calendarYearMonth;const{fetchCalendarEvents:i}=await f(async()=>{const{fetchCalendarEvents:o}=await Promise.resolve().then(()=>g);return{fetchCalendarEvents:o}},void 0);s.calendarEvents=await i(s.calendarYearMonth),h()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async a=>{s.calendarYearMonth=a.target.value;const{fetchCalendarEvents:i}=await f(async()=>{const{fetchCalendarEvents:o}=await Promise.resolve().then(()=>g);return{fetchCalendarEvents:o}},void 0);s.calendarEvents=await i(s.calendarYearMonth),h()}),e.querySelector("#cal-filter-category")?.addEventListener("change",a=>{s.calendarFilterCategory=a.target.value,h()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const a=new Date;s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(a.getTime()+3600*1e3).toISOString(),isAllDay:!1}},h()}),e.querySelectorAll("[data-cal-date]").forEach(a=>{a.tagName!=="BUTTON"&&a.addEventListener("click",i=>{if(i.target.closest(".cal-event"))return;const o=a.dataset.calDate??"";s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${o}T10:00:00`,isAllDay:!1}},h()})}),e.querySelectorAll("[data-cal-event-id]").forEach(a=>{a.addEventListener("click",i=>{i.stopPropagation();const o=a.dataset.calEventId,c=s.calendarEvents.find(d=>d.id===o);c&&(s.calendarEdit={isOpen:!0,isNew:!1,event:{...c}},h())})}),e.querySelectorAll("[data-action='cal-close']").forEach(a=>{a.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(s.calendarEdit=null,h())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!s.calendarEdit)return;const{saveCalendarEvent:a,fetchCalendarEvents:i,CALENDAR_CATEGORY_COLORS:o}=await f(async()=>{const{saveCalendarEvent:y,fetchCalendarEvents:v,CALENDAR_CATEGORY_COLORS:$}=await Promise.resolve().then(()=>g);return{saveCalendarEvent:y,fetchCalendarEvents:v,CALENDAR_CATEGORY_COLORS:$}},void 0),c=document.querySelector("[data-action='cal-save']")?.dataset.id||s.calendarEdit.event.id||`evt_${Date.now()}`,d=e.querySelector("#cal-category")?.value??"general",u={id:c,title:e.querySelector("#cal-title")?.value??"",category:d,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:o[d]};if(!u.title){b("タイトルは必須です","warning");return}await a(u)?(s.calendarEvents=await i(s.calendarYearMonth),s.calendarEdit=null,b("保存しました"),h()):b("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!a||!await B("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:i,fetchCalendarEvents:o}=await f(async()=>{const{deleteCalendarEvent:d,fetchCalendarEvents:u}=await Promise.resolve().then(()=>g);return{deleteCalendarEvent:d,fetchCalendarEvents:u}},void 0);await i(a)?(s.calendarEvents=await o(s.calendarYearMonth),s.calendarEdit=null,b("削除しました"),h()):b("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(s.importPreview){s.importing=!0,h();try{const a=s.importPreview.rows.filter(o=>o._valid),i=await gl(s.importEntity,a);s.importResult=`取り込み完了: ${i.inserted}件成功 / ${i.failed}件失敗`,s.importPreview=null}catch(a){s.importResult=`エラー: ${a instanceof Error?a.message:String(a)}`}finally{s.importing=!1,h()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const a=e.querySelector("#store-date")?.value??s.storeSalesDate;s.storeSalesDate=a,s.storeSales=[],s.actionLoading=!0,h(),ft(a).then(i=>{s.storeSales=i,s.actionLoading=!1,h()})}),e.querySelectorAll("[data-action='copy-config']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.configValue??"";if(i)try{await navigator.clipboard.writeText(i),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(o){console.warn("Clipboard copy failed",o)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const i=JSON.stringify({supabase_url:z,supabase_anon_key:O,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),o=new Blob([i],{type:"application/json;charset=utf-8"}),c=URL.createObjectURL(o),d=document.createElement("a");d.href=c,d.download="relay_config.json",d.click(),URL.revokeObjectURL(c)}),e.querySelectorAll("[data-action='copy-code']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.code??"";if(i)try{await navigator.clipboard.writeText(decodeURIComponent(i)),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(o){console.warn("Clipboard code copy failed",o)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(a=>{a.addEventListener("change",()=>{W(e),s.emailSaveMessage=null,h()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(a=>{a.addEventListener("change",()=>{W(e),s.emailSaveMessage=null,h()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{W(e),s.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{W(e),s.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(a=>{a.addEventListener("click",()=>{s.emailTemplateId=a.dataset.templateId??"custom";const i=Ja(s.emailTemplateId);s.emailSubject=i.subject,s.emailBody=i.body,s.emailSaveMessage=null,h()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{W(e);const a=`

商品詳細はこちら: https://example.jp/products/seasonal`;s.emailBody.includes("https://example.jp/products/seasonal")||(s.emailBody=`${s.emailBody.trimEnd()}${a}`),s.emailSaveMessage=null,h()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{W(e),s.actionLoading=!0,h(),Ie(et("draft")).then(a=>{s.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(a.updatedAt??new Date().toISOString()))}`,s.actionLoading=!1,h()})}),e.querySelector("#email-sender")?.addEventListener("change",a=>{s.emailSenderId=a.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{W(e),s.actionLoading=!0,s.emailSending=!0,h();const a=et("sent");s.mailSenders.find(i=>i.id===s.emailSenderId),La().then(async i=>{await Ie({...a,recipientCount:i.sent}),s.emailSaveMessage=`${i.sent.toLocaleString("ja-JP")} 件送信しました。`,s.actionLoading=!1,s.emailSending=!1,h(),b(`${i.sent}件送信完了`)}).catch(async()=>{await Ie(et("draft")),s.emailSaveMessage="APIキー未設定のため下書きを保存しました。",s.actionLoading=!1,s.emailSending=!1,h(),b("APIキー未設定のため下書き保存しました","warning")})})}function h(){const e=document.querySelector("#app");e&&(e.innerHTML=Hl(),Kl(e),s.pickerMode&&e.querySelector("#modal-search")?.focus(),s.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),_t()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const t of["fd-scaler","print-scaler"]){const n=e.querySelector(`#${t}`),l=n?.querySelector(".fd-canvas, .print-preview"),r=l?.querySelector(".print-page")??l;if(!n||!r)continue;const a=n.parentElement?.clientWidth??0,i=r.offsetWidth;if(a>0&&i>0&&i>a-24){const o=(a-24)/i;n.style.transform=`scale(${o})`,n.style.transformOrigin="top left",n.style.height=`${(r.offsetHeight+48)*o}px`}else n.style.transform="",n.style.height=""}}))}async function xt(){s.loading=!0,h();try{const[e,t,n,l,r,a,i,o]=await Promise.all([oa(),ra(),ca(),da(),Ne(s.invoiceFilter),mt(s.ledgerCustomerCode),Ve(),ua()]);if(s.salesSummary=e,s.paymentStatus=t,s.masterStats=n,s.pipelineMeta=l,s.invoiceRecords=r,s.customerLedger=a,s.salesAnalytics=i,s.syncDashboard=o,s.rawTableList.length===0&&Ra().then(c=>{s.rawTableList=c,s.route==="/raw-browser"&&h()}),!s.salesFilter.startDate||!s.salesFilter.endDate){const d=[...e.salesRecords].sort((y,v)=>new Date(v.date).getTime()-new Date(y.date).getTime())[0]?.date??new Date().toISOString(),u=new Date(d),p=new Date(u);p.setDate(u.getDate()-30),s.salesFilter={startDate:Qt(p.toISOString()),endDate:Qt(u.toISOString())}}(!s.invoiceFilter.startDate||!s.invoiceFilter.endDate)&&(s.invoiceFilter={...s.invoiceFilter,startDate:s.salesFilter.startDate,endDate:s.salesFilter.endDate},s.invoiceRecords=await Ne(s.invoiceFilter)),s.error=null}catch(e){s.error=e instanceof Error?e.message:"データの取得に失敗しました。"}finally{s.loading=!1,h(),St(s.route)}}window.addEventListener("popstate",()=>{s.route=Ba(location.pathname),s.currentCategory=kt(s.route),s.sidebarOpen=!1,ve(),St(s.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),s.globalSearchOpen=!0,h();return}if(e.key==="Escape"){if(s.globalSearchOpen){ve(),h();return}if(s.pickerMode){qe(),h();return}s.route==="/invoice-entry"&&!s.invoiceSaving&&(Ua(),h());return}if(s.route==="/invoice-entry"&&!s.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Ha(t)}});s.user=Fe()?ss():null;s.user?.email&&(async()=>{const{fetchMyProfile:e}=await f(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>g);return{fetchMyProfile:t}},void 0);s.myProfile=await e(s.user.email),h()})();try{const e=localStorage.getItem("sake_print_options");e&&(s.printOptions={...s.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(s.printCompany={...s.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(s.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,l=0,r=0,a=0,i=1;document.addEventListener("mousedown",o=>{const c=o.target.closest(".fd-draggable");if(!c||!s.fdDesignMode)return;o.preventDefault();const d=c.closest(".fd-canvas");if(!d)return;const u=d.getBoundingClientRect();if(u.width===0)return;i=228.6/u.width,t=c,n=o.clientX,l=o.clientY,r=parseFloat(c.style.left)||0,a=parseFloat(c.style.top)||0,document.querySelectorAll(".fd-active").forEach($=>$.classList.remove("fd-active")),c.classList.add("fd-active","fd-dragging"),s.fdActiveFieldId=c.dataset.fdId??null;const p=document.querySelector("#fd-selected-info");p&&(p.textContent=`選択中: ${c.title}`);const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(r)),v&&(v.value=String(a))}),document.addEventListener("mousemove",o=>{if(!t)return;const c=(o.clientX-n)*i,d=(o.clientY-l)*i,u=Math.round((r+c)*2)/2,p=Math.round((a+d)*2)/2;t.style.left=u+"mm",t.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),v&&(v.value=String(p))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",o=>{if(!s.fdDesignMode||!s.fdActiveFieldId||o.key!=="ArrowLeft"&&o.key!=="ArrowRight"&&o.key!=="ArrowUp"&&o.key!=="ArrowDown"||o.target.tagName==="INPUT"||o.target.tagName==="TEXTAREA")return;const c=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);if(!c)return;o.preventDefault();const d=.5;let u=parseFloat(c.style.left)||0,p=parseFloat(c.style.top)||0;o.key==="ArrowLeft"?u-=d:o.key==="ArrowRight"?u+=d:o.key==="ArrowUp"?p-=d:o.key==="ArrowDown"&&(p+=d),c.style.left=u+"mm",c.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),v&&(v.value=String(p))})})();let Ee=null;function Ka(e){const t=window.L;if(!t){e.innerHTML='<div style="padding:40px;text-align:center;color:var(--text-secondary);">Leaflet読込中…</div>',setTimeout(()=>Ka(e),500);return}if(Ee){try{Ee.remove()}catch{}Ee=null}e.innerHTML="";const n=t.map(e);n.setView([35.694,139.769],9),t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}).addTo(n);const r=(a,i)=>t.divIcon({className:"custom-map-marker",html:`<div style="background:${a};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-weight:700;font-size:11px;">${i}</div>`,iconSize:[28,28],iconAnchor:[14,14]});s.mapFilters.showCustomers&&(s.masterStats?.customers??[]).forEach(i=>{if(!i.lat||!i.lng||s.mapFilters.filterBusinessType&&i.businessType!==s.mapFilters.filterBusinessType)return;t.marker([i.lat,i.lng],{icon:r("#2196F3","既")}).addTo(n).bindPopup(`<div style="min-width:180px;"><strong>${i.name}</strong><br/><span style="color:#666;font-size:11px;">${i.code}</span><br/>🔵 既存取引先<br/>締日${i.closingDay}日 / 支払日${i.paymentDay}日${i.address1?`<br/>📍 ${i.address1}`:""}</div>`)}),s.mapFilters.showProspects&&s.prospects.forEach(a=>{if(!a.lat||!a.lng||s.mapFilters.filterBusinessType&&a.businessType!==s.mapFilters.filterBusinessType)return;const i=a.stage==="hot"||a.stage==="negotiating"?"#EF5350":a.stage==="won"?"#66BB6A":"#4CAF50";t.marker([a.lat,a.lng],{icon:r(i,"新")}).addTo(n).bindPopup(`<div style="min-width:200px;"><strong>${a.companyName}</strong><br/><span style="color:#666;font-size:11px;">${a.contactName??""}</span><br/>🟢 新規見込客 (${a.stage})<br/>想定 ¥${a.expectedAmount.toLocaleString("ja-JP")} / 確度 ${a.probability}%${a.nextAction?`<br/>📌 ${a.nextAction}`:""}</div>`)}),s.mapFilters.showDelivery&&s.deliveryLocations.forEach(a=>{if(!a.lat||!a.lng)return;t.marker([a.lat,a.lng],{icon:r("#FF9800","納")}).addTo(n).bindPopup(`<div style="min-width:180px;"><strong>${a.name}</strong><br/>🟠 納品先${a.customerCode?` (${a.customerCode})`:""}<br/>${a.address??""}${a.contactName?`<br/>📞 ${a.contactName}`:""}${a.deliveryNote?`<br/>📝 ${a.deliveryNote}`:""}</div>`)}),Ee=n}xt();const Ql=300*1e3;setInterval(()=>{s.route==="/"&&!s.loading&&!document.hidden&&xt()},Ql);
