(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();const Es="modulepreload",Cs=function(e){return"/"+e},Bt={},g=function(t,n,i){let r=Promise.resolve();if(n&&n.length>0){let d=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var a=d;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");r=d(n.map(u=>{if(u=Cs(u),u in Bt)return;Bt[u]=!0;const p=u.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":Es,p||(v.as="script"),v.crossOrigin="",v.href=u,l&&v.setAttribute("nonce",l),document.head.appendChild(v),p)return new Promise((f,A)=>{v.addEventListener("load",f),v.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${u}`)))})}))}function c(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return r.then(o=>{for(const l of o||[])l.status==="rejected"&&c(l.reason);return t().catch(c)})},Y="https://loarwnuyvfxiscjjsmiz.supabase.co",B="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function We(e,t){try{const n=new URL(`/rest/v1/${e}`,Y),i=await fetch(n.toString(),{method:"POST",headers:{apikey:B,Authorization:`Bearer ${B}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!i.ok)throw new Error(`HTTP ${i.status}`);return(await i.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function St(e,t,n){try{const i=new URL(`/rest/v1/${e}?id=eq.${t}`,Y);return(await fetch(i.toString(),{method:"PATCH",headers:{apikey:B,Authorization:`Bearer ${B}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function xt(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,Y),i=await fetch(n.toString(),{method:"POST",headers:{apikey:B,Authorization:`Bearer ${B}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!i.ok)throw new Error(`HTTP ${i.status}`);return await i.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function At(e){try{const t=new URL(`/rest/v1/${e}`,Y);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:B,Authorization:`Bearer ${B}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const i=n.headers.get("Content-Range");if(i){const r=i.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function S(e,t={}){try{const n=new URL(`/rest/v1/${e}`,Y);Object.entries(t).forEach(([r,c])=>{n.searchParams.set(r,c)});const i=await fetch(n.toString(),{method:"GET",headers:{apikey:B,Authorization:`Bearer ${B}`,Accept:"application/json",Prefer:"return=representation"}});if(!i.ok)throw new Error(`HTTP ${i.status}`);return await i.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function J(e,t={},n=1e3){const i=[];let r=0;try{for(;;){const c=new URL(`/rest/v1/${e}`,Y);Object.entries(t).forEach(([l,d])=>{c.searchParams.set(l,d)}),c.searchParams.set("limit",String(n)),c.searchParams.set("offset",String(r));const a=await fetch(c.toString(),{method:"GET",headers:{apikey:B,Authorization:`Bearer ${B}`,Accept:"application/json",Prefer:"return=representation"}});if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json();if(i.push(...o),o.length<n)break;r+=n}return i}catch(c){return console.warn(`Failed to query all rows from Supabase table ${e}`,c),i.length>0?i:[]}}const O=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:B,SUPABASE_URL:Y,supabaseCount:At,supabaseInsert:We,supabaseQuery:S,supabaseQueryAll:J,supabaseRpc:xt,supabaseUpdate:St},Symbol.toStringTag,{value:"Module"})),Pt="sake_auth";function $a(e){localStorage.setItem(Pt,JSON.stringify(e))}function _a(){return{apikey:B,"Content-Type":"application/json"}}function Ls(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),i=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(i))}catch{return null}}async function wa(e,t){const n=await fetch(`${Y}/auth/v1/${e}`,{method:"POST",headers:_a(),body:JSON.stringify(t)}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.error_description??i.msg??`HTTP ${n.status}`);return i}async function Ds(e,t){const n=await wa("token?grant_type=password",{email:e,password:t});return $a({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function zt(e,t){const n=await wa("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&$a({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Is(){const e=Ze();if(localStorage.removeItem(Pt),!!e?.access_token)try{await fetch(`${Y}/auth/v1/logout`,{method:"POST",headers:{..._a(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Ze(){const e=localStorage.getItem(Pt);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Ts(){const e=Ze();if(!e)return null;const t=Ls(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function qs(e){const t=Ze();if(!t)throw new Error("not signed in");const n=await fetch(`${Y}/auth/v1/user`,{method:"PUT",headers:{apikey:B,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const i=await n.json().catch(()=>({}));throw new Error(i.msg??`HTTP ${n.status}`)}}const Et={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},ka={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Ns={generatedAt:new Date().toISOString(),records:[]},ie={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Rs={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Os={},js={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function D(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Ms(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Fs(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function m(e,t,n=""){for(const i of t){const r=e[i];if(typeof r=="string"&&r.length>0)return r}return n}function b(e,t,n=0){for(const i of t)if(i in e)return D(e[i]);return n}function z(e,t,n=!0){for(const i of t)if(i in e)return Fs(e[i]);return n}function j(e,t,n){for(const i of t){const r=e[i];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const c=new Date(r);if(!Number.isNaN(c.getTime()))return c.toISOString()}return n}function Bs(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:j(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:D(e.total_amount??e.billed_amount)}}function Vt(e){const t=e.trim().toUpperCase(),n=Os[t];if(n)return n;const i=ka.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:i?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Sa(){const e=await J("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,n]=await Promise.all([S("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),S("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"20"})]),r=new Date().toISOString().slice(0,10),c=r.slice(0,7),a=[...e].sort((v,f)=>v.sales_date.localeCompare(f.sales_date)).map(v=>({date:new Date(`${v.sales_date}T00:00:00Z`).toISOString(),amount:D(v.amount??v.sales_amount),bottles:D(v.bottles),volumeMl:D(v.volume_ml),pricePerBottle:D(v.price_per_bottle),pricePerLiter:D(v.price_per_liter)})),o=a.slice(-30),l=v=>D(v.amount??v.sales_amount),d=e.reduce((v,f)=>f.sales_date===r?v+l(f):v,0),u=e.reduce((v,f)=>f.sales_date.startsWith(c)?v+l(f):v,0),p=t.filter(v=>D(v.balance_amount)>0),y=n.map((v,f)=>({id:String(v.id??`sale-${f+1}`),documentNo:v.document_no??v.legacy_document_no??"",date:v.sales_date??"",customerCode:v.legacy_customer_code??"",customerName:v.customer_name??v.legacy_customer_code??"",amount:D(v.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:d,todayDelta:0,monthSales:u,monthDelta:0,unpaidCount:p.length,unpaidAmount:p.reduce((v,f)=>v+D(f.balance_amount),0)},dailySales:o,allDailySales:a,salesRecords:y}}return ka}async function xa(){const e=await J("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const i=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${i}-${n+1}`,customerCode:i,customerName:i,billedAmount:D(t.billed_amount),paymentAmount:D(t.paid_amount),balanceAmount:D(t.balance_amount),lastPaymentDate:null,status:Ms(t.payment_status)}})}:Ns}async function Ye(){const[e,t]=await Promise.all([J("customers"),J("products")]);if(e.length>0||t.length>0){const n=e.length?e.map((r,c)=>{const a=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:m(r,["id","customer_id","code"],`customer-${c+1}`),code:m(r,["code","customer_code","legacy_customer_code"],`C${String(c+1).padStart(4,"0")}`),name:m(r,["name","customer_name","display_name"],`Customer ${c+1}`),kanaName:m(r,["kana_name"],""),shortName:m(r,["short_name"],""),postalCode:m(r,["postal_code"],""),address1:m(r,["address1"],""),address2:m(r,["address2"],""),phone:m(r,["phone"],""),fax:m(r,["fax"],""),email:m(r,["email"],""),staffCode:m(r,["staff_code"],""),businessType:m(r,["business_type"],""),areaCode:m(r,["delivery_area_code"],""),salesCategory:String(a.sales_category??""),closingDay:b(r,["closing_day","close_day"],31),paymentDay:b(r,["payment_day","due_day"],15),paymentMonth:Number(a.payment_month??0),paymentCycle:m(r,["payment_cycle"],""),billingCycleType:m(r,["billing_cycle_type"],""),billingCode:String(a.billing_code??""),creditLimit:b(r,["credit_limit"],0),taxMode:m(r,["tax_mode"],""),taxRound:String(a.tax_round??""),invoiceIssue:String(a.invoice_issue??""),invoiceType:m(r,["invoice_type"],""),priceGroup:String(a.price_group??""),priceType:String(a.price_type??""),customerGroup1:String(a.customer_group1??""),customerGroup2:String(a.customer_group2??""),bankName:m(r,["bank_name"],""),bankBranch:m(r,["bank_branch"],""),bankAccount:m(r,["bank_account"],""),isActive:z(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):ie.customers,i=t.length?t.map((r,c)=>({id:m(r,["id","product_id","code"],`product-${c+1}`),code:m(r,["code","product_code","legacy_product_code"],`P${String(c+1).padStart(5,"0")}`),janCode:m(r,["jan_code","jan","barcode"],""),name:m(r,["name","product_name","display_name"],`Product ${c+1}`),kanaName:m(r,["kana_name"],""),shortName:m(r,["short_name"],""),category:m(r,["category","category_name","category_code"],"未分類"),taxCategoryCode:m(r,["tax_category_code"],""),isActive:z(r,["is_active","active","enabled"],!0),listPrice:b(r,["list_price"],0),purchasePrice:b(r,["purchase_price"],0),salePrice:b(r,["default_sale_price","sale_price"],0),costPrice:b(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:m(r,["unit"],"本"),bottleType:m(r,["bottle_type"],""),containerCode:m(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:m(r,["rice_type"],""),season:m(r,["season"],""),agingYears:b(r,["aging_years"],0)})):ie.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||ie.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:ie.summary.activeCustomerCount,productCount:t.length||ie.summary.productCount,activeProductCount:t.length?i.filter(r=>r.isActive).length:ie.summary.activeProductCount},customers:n,products:i}}return ie}async function Aa(){const[e,t]=await Promise.all([S("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),S("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?j(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const i=e[0],r=m(i,["status"],"success"),c=i.errors,a=Array.isArray(c)?c.length>0:!!c;return{generatedAt:new Date().toISOString(),lastSyncAt:j(i,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:a?"warning":r==="error"?"error":"success",jobName:m(i,["agent_hostname"],"sake-relay"),message:`${b(i,["rows_upserted"],0)}行同期 / ${b(i,["files_updated"],0)}ファイル更新`}}return{...Rs,lastDataAt:n}}async function Pa(){const e=await xt("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function He(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const i=await S("mv_invoice_with_line_count",t);return i.length>0?i.map((r,c)=>({id:m(r,["id"],`invoice-${c}`),documentNo:m(r,["document_no","legacy_document_no"],""),date:j(r,["sales_date"],""),customerCode:m(r,["legacy_customer_code","customer_code"],""),customerName:m(r,["customer_name","legacy_customer_code"],""),itemCount:b(r,["line_count"],0),amount:b(r,["total_amount","billed_amount"],0)})):[]}async function Ct(e){const t=e.trim().toUpperCase();if(!t)return Vt("");const[n,i,r]=await Promise.all([S("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),S("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),S("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||i.length>0){const c=n.map((l,d)=>{const u=Bs(l,d);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),a=i.map((l,d)=>({id:String(l.id??`payment-${d+1}`),date:j(l,["payment_date","received_date"],new Date().toISOString()),amount:D(l.payment_amount??l.amount),method:l.payment_method??l.method??"入金"})),o=r.find(l=>(l.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:D(o?.balance_amount),salesTotal:c.reduce((l,d)=>l+d.amount,0),paymentTotal:a.reduce((l,d)=>l+d.amount,0),salesHistory:c,paymentHistory:a}}return Vt(t)}async function Ea(){const[e,t,n,i]=await Promise.all([S("mv_monthly_sales",{order:"month.asc"}),S("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),S("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),S("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.slice(-12).map(r=>({month:m(r,["month"],""),amount:b(r,["amount"],0)})),productTotals:n.map(r=>({code:m(r,["code"],""),name:m(r,["name"],""),amount:b(r,["amount"],0),quantity:b(r,["quantity"],0),documents:b(r,["documents"],0)})),customerTotals:t.map(r=>({code:m(r,["code"],""),name:m(r,["name"],""),amount:b(r,["amount"],0),quantity:b(r,["quantity"],0),documents:b(r,["documents"],0)})),staffTotals:i.map(r=>({code:m(r,["code"],""),name:m(r,["name"],""),amount:b(r,["amount"],0),quantity:b(r,["quantity"],0),documents:b(r,["documents"],0)}))}:js}const Ca={all:{products:"mv_product_sales_totals",customers:"mv_customer_sales_totals",staff:"mv_staff_sales_totals"},yearly:{products:"mv_product_sales_yearly",customers:"mv_customer_sales_yearly",staff:"mv_staff_sales_totals"},monthly:{products:"mv_product_sales_monthly",customers:"mv_customer_sales_monthly",staff:"mv_staff_sales_totals"},weekly:{products:"mv_product_sales_weekly",customers:"mv_customer_sales_weekly",staff:"mv_staff_sales_totals"},daily:{products:"mv_product_sales_daily",customers:"mv_customer_sales_daily",staff:"mv_staff_sales_totals"}};async function zs(e,t,n){const i=Ca[t][e],r={order:"amount.desc",limit:"200"};return n&&t!=="all"&&(r.period=`eq.${n}`),(await S(i,r)).map(a=>({code:m(a,["code"],""),name:m(a,["name"],""),period:m(a,["period"],""),amount:b(a,["amount"],0),quantity:b(a,["quantity"],0),documents:b(a,["documents"],0)}))}async function Vs(e,t){if(t==="all")return[];const n=Ca[t][e],i=await xt("get_distinct_periods",{view_name:n});if(i&&i.length>0)return i.map(a=>a.period).filter(Boolean).sort().reverse();const r=await S(n,{select:"period",order:"period.desc",limit:"1000"});return[...new Set(r.map(a=>m(a,["period"],"")))].filter(Boolean).sort().reverse()}async function Js(e){return(await S("mv_staff_customer_breakdown",{staff_code:`eq.${e}`,order:"amount.desc",limit:"100"})).map(n=>({staffCode:m(n,["staff_code"],""),staffName:m(n,["staff_name"],""),code:m(n,["code"],""),name:m(n,["name"],""),tag:m(n,["tag"],""),amount:b(n,["amount"],0),quantity:b(n,["quantity"],0),documents:b(n,["documents"],0)}))}async function Us(e){return(await S("mv_staff_product_breakdown",{staff_code:`eq.${e}`,order:"amount.desc",limit:"100"})).map(n=>({staffCode:m(n,["staff_code"],""),staffName:m(n,["staff_name"],""),code:m(n,["code"],""),name:m(n,["name"],""),tag:m(n,["tag"],""),amount:b(n,["amount"],0),quantity:b(n,["quantity"],0),documents:b(n,["documents"],0)}))}const yt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function La(e){const t=e.lines.reduce((r,c)=>r+c.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await We("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const Jt={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function Lt(e){const t=await S("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],i=D(n.total_amount);return{documentNo:e,invoiceDate:m(n,["sales_date","document_date"],""),customerCode:m(n,["legacy_customer_code","customer_code"],""),customerName:m(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:i,taxAmount:Math.floor(i*10/110),note:""}}return{...Jt,documentNo:e||Jt.documentNo}}const Ys={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Dt(e){const t=await S("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const c=b(r,["sales_amount"],0),a=b(r,["tax_amount"],0);return{customerCode:m(r,["customer_code"],""),customerName:m(r,["customer_name"],""),closingDay:31,salesAmount:c,taxAmount:a,prevBalance:0,paymentAmount:0,billingAmount:c,status:"open"}}),i=n.reduce((r,c)=>r+c.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:i,customers:n}}return{...Ys,targetYearMonth:e}}const Hs={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function et(){const[e,t,n]=await Promise.all([S("mv_monthly_sales",{order:"month.asc"}),S("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),S("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Hs;const i=e.slice(-12).map(l=>m(l,["month"],"")),r=new Map;t.forEach(l=>{const d=m(l,["code"],"");r.has(d)||r.set(d,{name:m(l,["name"],d),monthValues:new Map}),r.get(d).monthValues.set(m(l,["month"],""),b(l,["amount"],0))});const a=Array.from(r.entries()).map(([l,d])=>({code:l,name:d.name,total:i.reduce((u,p)=>u+(d.monthValues.get(p)??0),0),monthValues:d.monthValues})).sort((l,d)=>d.total-l.total).slice(0,10).map(l=>({label:l.name,values:i.map(d=>l.monthValues.get(d)??0)})),o=n.map(l=>({label:m(l,["name"],""),values:i.map(()=>Math.round(b(l,["amount"],0)/i.length))}));return{generatedAt:new Date().toISOString(),months:i,salesByProduct:a,salesByCustomer:o,costSimulation:[]}}async function Qs(){const e=await J("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const i=m(n,["code"],"");if(!i)return;const r=m(n,["month"],""),c=parseInt(r.slice(5,7))-1;if(c<0||c>11)return;let a=t.get(i);a||(a={name:m(n,["name"],i),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(i,a)),a.qty[c]+=b(n,["quantity"],0),a.amt[c]+=b(n,["amount"],0)}),Array.from(t.entries()).map(([n,i])=>({code:n,name:i.name,monthlyQuantity:i.qty,monthlyAmount:i.amt,totalQuantity:i.qty.reduce((r,c)=>r+c,0),totalAmount:i.amt.reduce((r,c)=>r+c,0)})).filter(n=>n.totalQuantity>0).sort((n,i)=>i.totalAmount-n.totalAmount)}async function Gs(){return(await S("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:m(t,["product_code"],""),productName:m(t,["product_name"],""),forecastMonth:m(t,["forecast_month"],""),segment:m(t,["segment"],"monthly"),avgMonthly:b(t,["avg_monthly"],0),forecastQuantity:b(t,["forecast_quantity"],0),forecastAmount:b(t,["forecast_amount"],0),safetyStock:b(t,["safety_stock"],0),calculatedAt:j(t,["calculated_at"],"")}))}async function Xs(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await J("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(a=>String(a.id)).filter(Boolean);const i=await J("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(a=>{a.id&&r.set(String(a.id),a)});const c=[];return i.forEach(a=>{const o=String(a.header_id??a.document_header_id??""),l=r.get(o);if(!l)return;const d=l.sales_date??l.document_date??"";!d||d<t||c.push({date:d.slice(0,10),customerName:l.customer_name??"不明",productName:a.product_name??"不明",quantity:D(a.quantity),documentNo:l.document_no??l.legacy_document_no??""})}),c.sort((a,o)=>a.date.localeCompare(o.date))}async function Da(){const e=new Date().toISOString();return(await S("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:m(n,["id"],""),message:m(n,["message"],""),level:m(n,["level"],"info"),startsAt:j(n,["starts_at"],""),endsAt:n.ends_at?j(n,["ends_at"],""):null,dismissible:z(n,["dismissible"],!0)}))}async function Ks(){const e=await J("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,is_dormant,is_at_risk",or:"(is_dormant.eq.true,is_at_risk.eq.true)"});return e.length>0?e.map(t=>({customer_code:m(t,["customer_code"],""),customer_name:m(t,["customer_name"],""),business_type:m(t,["business_type"],""),area_code:m(t,["area_code"],""),phone:m(t,["phone"],""),last_order_date:m(t,["last_order_date"],""),days_since_order:b(t,["days_since_order"],0),amount_12m:b(t,["amount_12m"],0),is_dormant:z(t,["is_dormant"],!1),is_at_risk:z(t,["is_at_risk"],!1)})):[]}async function Ws(){return(await J("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:m(t,["customer_code"],""),customer_name:m(t,["customer_name"],""),phone:m(t,["phone"],""),address:m(t,["address"],""),area_code:m(t,["area_code"],""),business_type:m(t,["business_type"],""),priority_score:b(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:m(t,["last_order_date"],""),days_since_order:b(t,["days_since_order"],0),annual_revenue:b(t,["annual_revenue"],0),recommended_action:m(t,["recommended_action"],"")}))}async function Zs(){return(await J("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:m(t,["product_code"],""),product_name:m(t,["product_name"],""),season_type:m(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:b(t,["avg_monthly_qty"],0)}))}async function en(){return(await J("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:m(t,["product_code"],""),name:m(t,["product_name"],""),monthlyQuantity:[b(t,["m01"],0),b(t,["m02"],0),b(t,["m03"],0),b(t,["m04"],0),b(t,["m05"],0),b(t,["m06"],0),b(t,["m07"],0),b(t,["m08"],0),b(t,["m09"],0),b(t,["m10"],0),b(t,["m11"],0),b(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:b(t,["total_quantity"],0),totalAmount:b(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Ia(e,t,n){try{return await We("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function Ta(e,t){return St("customers",e,t)}async function qa(e,t){return St("products",e,t)}async function Na(e,t){const n=e.find(a=>a.code===t);n?.priceGroup;const i=n?.priceGroup||t;let r="";try{const a=await S("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});a[0]?.memo&&(r=(typeof a[0].memo=="string"?JSON.parse(a[0].memo):a[0].memo)?.price_type??"")}catch{}const c=new Map;if(i){const a=await S("customer_product_prices",{price_group:`eq.${i}`,select:"legacy_product_code,special_price"});for(const o of a)c.set(o.legacy_product_code,o.special_price)}return{priceType:r,priceGroup:i,individualPrices:c}}function Ra(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"標準価格"}}async function Oa(){return(await S("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function tn(){return(await J("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function ja(){return(await S("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function Ma(){const[e,t]=await Promise.all([S("mv_customer_abc",{order:"amount.desc"}),et()]),n=e.map(i=>({code:m(i,["code"],""),name:m(i,["name"],""),amount:b(i,["amount"],0),documents:b(i,["documents"],0),ratio:b(i,["ratio"],0),cumRatio:b(i,["cum_ratio"],0),abcRank:m(i,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function an(){const[e,t]=await Promise.all([S("mv_product_abc",{order:"amount.desc"}),et()]),n=e.map(a=>({code:m(a,["code"],""),name:m(a,["name"],""),amount:b(a,["amount"],0),quantity:b(a,["quantity"],0),ratio:b(a,["ratio"],0),cumRatio:b(a,["cum_ratio"],0),abcRank:m(a,["abc_rank"],"C")})),i=n.reduce((a,o)=>a+o.amount,0),r=new Set(n.filter(a=>a.abcRank==="A").map(a=>a.name)),c=t.salesByProduct.filter(a=>r.has(a.label));return{generatedAt:new Date().toISOString(),totalAmount:i,ranking:n,months:t.months,monthlyByProduct:c.length>0?c:t.salesByProduct}}const Fa={planned:"計画中",active:"仕込中",done:"完了"};async function Ba(){const e=await S("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),jikomiNo:m(t,["batch_no","legacy_batch_no"],""),productName:m(t,["brand_name"],""),riceType:m(t,["rice_type"],""),plannedKg:b(t,["planned_rice_kg"],0),actualKg:b(t,["actual_rice_kg"],0),startDate:j(t,["start_date"],""),expectedDoneDate:j(t,["expected_done_date"],""),status:m(t,["status"],"planned"),tankNo:m(t,["tank_no"],""),note:m(t,["remarks"],"")})):[]}async function za(){const e=await S("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),tankNo:m(t,["tank_no"],""),capacity:b(t,["capacity_l"],0),currentVolume:b(t,["current_volume_l"],0),productName:m(t,["current_product_code"],""),jikomiNo:m(t,["current_batch_id"],""),status:m(t,["status"],"empty"),lastUpdated:j(t,["last_updated_at"],"")})):[]}async function Va(){const e=await S("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),kenteiNo:m(t,["kentei_no"],""),jikomiNo:m(t,["batch_id"],""),productName:m(t,["product_code"],""),kenteiDate:j(t,["kentei_date"],""),alcoholDegree:b(t,["alcohol_degree"],0),extractDegree:b(t,["extract_degree"],0),sakaMeterValue:b(t,["sakemeter_value"],0),volume:b(t,["volume_l"],0),taxCategory:m(t,["tax_category_code"],""),status:m(t,["status"],"pending")})):[]}async function ht(){const e=await S("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),code:m(t,["material_code","legacy_material_code"],""),name:m(t,["name"],""),unit:m(t,["unit"],""),currentStock:b(t,["current_stock"],0),minimumStock:b(t,["minimum_stock"],0),unitCost:b(t,["unit_cost"],0),lastUpdated:j(t,["updated_at"],"")})):[]}async function Ja(){const e=await S("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),documentNo:m(t,["document_no","legacy_document_no"],""),purchaseDate:j(t,["purchase_date"],""),supplierCode:m(t,["supplier_code","legacy_supplier_code"],""),supplierName:m(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:b(t,["total_amount"],0),status:m(t,["payment_status"],"pending")})):[]}async function Ua(){const e=await S("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:m(t,["supplier_code","legacy_supplier_code"],""),supplierName:m(t,["legacy_supplier_code"],""),totalPurchase:b(t,["total_purchase"],0),paidAmount:b(t,["paid_amount"],0),balance:b(t,["balance"],0),nextPaymentDate:j(t,["next_payment_date"],""),status:m(t,["status"],"unpaid")})):[]}async function Ya(){const e=await S("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),billNo:m(t,["bill_no"],""),supplierName:m(t,["counterparty_name"],""),amount:b(t,["amount"],0),issueDate:j(t,["issue_date"],""),dueDate:j(t,["due_date"],""),status:m(t,["status"],"holding")})):[]}async function Ha(){const e=await S("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:m(t,["material_code","legacy_material_code"],""),name:m(t,["name"],""),unit:m(t,["unit"],""),currentStock:b(t,["current_stock"],0),minimumStock:b(t,["minimum_stock"],0),lastPurchaseDate:j(t,["last_purchase_date"],""),unitCost:b(t,["unit_cost"],0)})):[]}const Qa=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],vt={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},sn={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function It(e,t){const n=await S("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const i=n[0],r=m(i,["id"],""),[c,a]=await Promise.all([S("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),S("tax_deductions",{declaration_id:`eq.${r}`})]),o=c.map(d=>({taxCategory:m(d,["tax_category_code"],""),taxCategoryName:m(d,["tax_category_name"],""),alcoholDegree:b(d,["alcohol_degree"],0),volume:b(d,["taxable_volume"],0),taxRate:b(d,["tax_rate"],0),taxAmount:b(d,["tax_amount"],0),productionVolume:b(d,["production_volume"],0),previousBalance:b(d,["previous_balance"],0),currentAdjustment:b(d,["current_adjustment"],0),exportDeduction:b(d,["export_deduction"],0),sampleDeduction:b(d,["sample_deduction"],0),taxableVolume:b(d,["taxable_volume"],0)})),l=a.map(d=>({type:m(d,["deduction_type"],"sample"),categoryCode:m(d,["tax_category_code"],""),volume:b(d,["volume"],0),reason:m(d,["reason"],""),documentNo:m(d,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:m(i,["company_name"],""),companyNo:m(i,["company_no"],""),companyAddress:m(i,["company_address"],""),companyRepresentative:m(i,["company_representative"],""),taxOffice:m(i,["tax_office"],""),rows:o,deductions:l,totalVolume:b(i,["total_taxable_volume"],0),totalTax:b(i,["total_tax_amount"],0),status:m(i,["status"],"draft"),submittedAt:m(i,["submitted_at"],"")||null}}return{...sn,targetYear:e,targetMonth:t}}function H(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Ga(e){const t=e.rows.map(i=>`    <Category>
      <Code>${H(i.taxCategory)}</Code>
      <Name>${H(i.taxCategoryName)}</Name>
      <AlcoholDegree>${i.alcoholDegree}</AlcoholDegree>
      <ProductionVolume>${i.productionVolume}</ProductionVolume>
      <PreviousBalance>${i.previousBalance}</PreviousBalance>
      <CurrentAdjustment>${i.currentAdjustment}</CurrentAdjustment>
      <ExportDeduction>${i.exportDeduction}</ExportDeduction>
      <SampleDeduction>${i.sampleDeduction}</SampleDeduction>
      <TaxableVolume>${i.taxableVolume}</TaxableVolume>
      <TaxRate>${i.taxRate}</TaxRate>
      <TaxAmount>${i.taxAmount}</TaxAmount>
    </Category>`).join(`
`),n=e.deductions.map(i=>`    <Deduction type="${H(i.type)}">
      <CategoryCode>${H(i.categoryCode)}</CategoryCode>
      <Volume>${i.volume}</Volume>
      <Reason>${H(i.reason)}</Reason>${i.documentNo?`
      <DocumentNo>${H(i.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${H(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${H(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${H(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${H(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${H(e.taxOffice)}</TaxOffice>
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
`}function nn(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function on(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),i=e.rows.map(c=>[c.taxCategory,c.taxCategoryName,c.alcoholDegree,c.productionVolume,c.previousBalance,c.currentAdjustment,c.exportDeduction,c.sampleDeduction,c.taxableVolume,c.taxRate,c.taxAmount].map(nn).join(",")),r=`,合計,,${e.rows.reduce((c,a)=>c+a.productionVolume,0)},,,${e.rows.reduce((c,a)=>c+a.exportDeduction,0)},${e.rows.reduce((c,a)=>c+a.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...i,r].join(`
`)+`
`}function ln(e){const t=e.rows.map(r=>{const c=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),a=Math.round(c*r.taxRate);return{...r,taxableVolume:c,volume:c,taxAmount:a}}),n=t.reduce((r,c)=>r+c.taxableVolume,0),i=t.reduce((r,c)=>r+c.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:i}}async function rn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>O);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Ga(e),submitted_at:e.submittedAt})}async function Tt(e){const t=await S("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:m(n,["id"],""),saleDate:m(n,["sale_date"],e),saleTime:m(n,["sale_time"],""),productCode:m(n,["product_code"],""),productName:m(n,["product_name"],""),quantity:b(n,["quantity"],0),unitPrice:b(n,["unit_price"],0),amount:b(n,["amount"],0),paymentMethod:m(n,["payment_method"],"cash")})):[]}async function Xa(){const e=await S("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:m(t,["id"],""),orderNo:m(t,["order_no"],""),orderDate:j(t,["order_date"],""),customerName:m(t,["customer_name"],""),postalCode:m(t,["postal_code"],""),address:m(t,["shipping_address"],""),items:[],totalAmount:b(t,["total_amount"],0),status:m(t,["status"],"new"),shippingDate:j(t,["shipping_date"],"")})):[]}async function Je(e){const t=await We("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ka(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function cn(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await S("print_layouts",t)).map(i=>({id:m(i,["id"],""),name:m(i,["name"],""),templateKey:m(i,["template_key"],""),positions:i.positions??{},isDefault:z(i,["is_default"],!1),note:m(i,["note"],""),updatedAt:m(i,["updated_at"],"")}))}async function dn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>O);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},i=await t("print_layouts",n);return i?{id:m(i,["id"],e.id),name:m(i,["name"],e.name),templateKey:m(i,["template_key"],e.templateKey),positions:i.positions??e.positions,isDefault:z(i,["is_default"],!1),note:m(i,["note"],""),updatedAt:m(i,["updated_at"],"")}:null}async function un(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function pn(){return(await S("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),email:m(t,["email"],""),displayName:m(t,["display_name"],""),signature:m(t,["signature"],""),replyTo:m(t,["reply_to"],""),isDefault:z(t,["is_default"],!1),isVerified:z(t,["is_verified"],!1),note:m(t,["note"],"")}))}async function mn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:m(n,["id"],e.id),name:m(n,["name"],e.name),email:m(n,["email"],e.email),displayName:m(n,["display_name"],""),signature:m(n,["signature"],""),replyTo:m(n,["reply_to"],""),isDefault:z(n,["is_default"],!1),isVerified:z(n,["is_verified"],!1)}:null}async function yn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const qt={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Nt={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function hn(e){const t=`${e}-01T00:00:00Z`,[n,i]=e.split("-").map(o=>parseInt(o,10)),r=new Date(n,i,0).getDate(),c=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await S("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${c})`,order:"starts_at.asc"})).map(o=>({id:m(o,["id"],""),title:m(o,["title"],""),description:m(o,["description"],""),category:m(o,["category"],"general")||"general",startsAt:m(o,["starts_at"],new Date().toISOString()),endsAt:m(o,["ends_at"],""),isAllDay:z(o,["is_all_day"],!1),location:m(o,["location"],""),attendees:o.attendees??[],relatedCustomerCode:m(o,["related_customer_code"],""),relatedOrderId:m(o,["related_order_id"],""),color:m(o,["color"],""),googleEventId:m(o,["google_event_id"],"")}))}async function vn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Nt[e.category],updated_at:new Date().toISOString()})?e:null}async function fn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Wa(){return(await S("integration_settings",{order:"name.asc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),provider:m(t,["provider"],""),config:t.config??{},isEnabled:z(t,["is_enabled"],!1),lastSyncAt:m(t,["last_sync_at"],""),lastStatus:m(t,["last_status"],"")}))}async function De(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function bn(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const i=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(i,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const c=await r.json(),{supabaseInsert:a}=await g(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>O);return{supabaseInsert:l}},void 0);let o=0;for(const l of c.orders){const d=`shopify_${l.id}`;await a("shopify_orders",{id:d,shopify_order_id:String(l.id),order_number:String(l.order_number??""),order_date:String(l.created_at??new Date().toISOString()),customer_name:String(l.customer?.first_name??"")+" "+String(l.customer?.last_name??""),customer_email:String(l.customer?.email??""),total_amount:Math.round(parseFloat(String(l.total_price??"0"))),financial_status:String(l.financial_status??""),fulfillment_status:String(l.fulfillment_status??"unfulfilled"),line_items:l.line_items??[],shipping_address:l.shipping_address??null,raw_payload:l}),o++}return await De({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${o}件取得成功`}),{count:o}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function gn(){return(await S("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:m(t,["id"],""),shopifyOrderId:m(t,["shopify_order_id"],""),orderNumber:m(t,["order_number"],""),orderDate:m(t,["order_date"],""),customerName:m(t,["customer_name"],""),customerEmail:m(t,["customer_email"],""),totalAmount:D(t.total_amount),financialStatus:m(t,["financial_status"],""),fulfillmentStatus:m(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function $n(e){const t=e.config.refresh_token,n=e.config.client_id,i=e.config.client_secret;if(!t||!n||!i)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:i})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const a=(await r.json()).access_token;return await De({...e,config:{...e.config,oauth_token:a}}),e.config.oauth_token=a,{token:a}}async function _n(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const i=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),c=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${i}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let a=await fetch(c,{headers:{Authorization:`Bearer ${t}`}});if(a.status===401){const u=await $n(e);if(u.error)return{count:0,error:u.error};t=u.token,a=await fetch(c,{headers:{Authorization:`Bearer ${t}`}})}if(!a.ok)return{count:0,error:`HTTP ${a.status}`};const o=await a.json(),{supabaseInsert:l}=await g(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>O);return{supabaseInsert:u}},void 0);let d=0;for(const u of o.items){const p=`gcal_${u.id}`,y=u.start?.dateTime??u.start?.date??"",v=u.end?.dateTime??u.end?.date??"";await l("calendar_events",{id:p,title:String(u.summary??"(無題)"),description:String(u.description??""),category:"general",starts_at:String(y),ends_at:String(v),location:String(u.location??""),google_event_id:String(u.id??""),updated_at:new Date().toISOString()}),d++}return await De({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function wn(){return(await S("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:m(t,["id"],""),receivedAt:m(t,["received_at"],""),senderPhone:m(t,["sender_phone"],""),senderName:m(t,["sender_name"],""),imageUrl:m(t,["image_url"],""),ocrStatus:m(t,["ocr_status"],"pending")||"pending",ocrText:m(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:m(t,["linked_invoice_id"],"")}))}async function kn(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const i=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(i){return{text:"",error:i instanceof Error?i.message:String(i)}}}async function Sn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Qe={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Ge={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function xn(){return(await S("user_profiles",{order:"display_name.asc"})).map(t=>({id:m(t,["id"],""),email:m(t,["email"],""),displayName:m(t,["display_name"],""),staffCode:m(t,["staff_code"],""),department:m(t,["department"],"all")||"all",role:m(t,["role"],"staff")||"staff",defaultMailSenderId:m(t,["default_mail_sender_id"],""),phone:m(t,["phone"],""),avatarUrl:m(t,["avatar_url"],""),isActive:z(t,["is_active"],!0),lastSignInAt:m(t,["last_sign_in_at"],""),createdAt:m(t,["created_at"],"")}))}async function An(e){if(!e)return null;const t=await S("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:m(n,["id"],""),email:m(n,["email"],""),displayName:m(n,["display_name"],""),staffCode:m(n,["staff_code"],""),department:m(n,["department"],"all")||"all",role:m(n,["role"],"staff")||"staff",defaultMailSenderId:m(n,["default_mail_sender_id"],""),phone:m(n,["phone"],""),avatarUrl:m(n,["avatar_url"],""),isActive:z(n,["is_active"],!0),lastSignInAt:m(n,["last_sign_in_at"],"")}}async function Pn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function En(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Cn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>O);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Ln(e=100){return(await S("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),action:m(n,["action"],""),entityType:m(n,["entity_type"],""),entityId:m(n,["entity_id"],""),userEmail:m(n,["user_email"],""),changes:n.changes??{},createdAt:m(n,["created_at"],"")}))}const Xe={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Za(){return(await S("slack_notifications",{order:"event_type.asc"})).map(t=>({id:m(t,["id"],""),eventType:m(t,["event_type"],"new_order"),enabled:z(t,["enabled"],!0),channel:m(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:m(t,["last_triggered_at"],"")}))}async function Dn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function In(e=50){return(await S("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),eventType:m(n,["event_type"],""),channel:m(n,["channel"],""),message:m(n,["message"],""),status:m(n,["status"],"sent"),error:m(n,["error"],""),sentAt:m(n,["sent_at"],"")}))}async function Tn(e,t,n){const r=(await Wa()).find(d=>d.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const c=r.config.webhook_url;if(!c)return{ok:!1,error:"Webhook URL未設定"};const o=(await Za()).find(d=>d.eventType===e&&d.enabled);if(!o)return{ok:!1,error:"通知ルールが無効"};const l=n??o.channel??r.config.default_channel??"#general";try{const d=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Xe[e]} ${t}`,channel:l})}),u=d.ok,{supabaseInsert:p}=await g(async()=>{const{supabaseInsert:y}=await Promise.resolve().then(()=>O);return{supabaseInsert:y}},void 0);return await p("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:l,message:t,status:u?"sent":"failed",error:u?null:`HTTP ${d.status}`}),u?{ok:!0}:{ok:!1,error:`HTTP ${d.status}`}}catch(d){return{ok:!1,error:d instanceof Error?d.message:String(d)}}}const Ie={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},tt={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function qn(){return(await S("prospects",{order:"updated_at.desc"})).map(t=>({id:m(t,["id"],""),companyName:m(t,["company_name"],""),contactName:m(t,["contact_name"],""),email:m(t,["email"],""),phone:m(t,["phone"],""),address:m(t,["address"],""),website:m(t,["website"],""),businessType:m(t,["business_type"],""),stage:m(t,["stage"],"cold"),source:m(t,["source"],""),expectedAmount:D(t.expected_amount),probability:D(t.probability),assignedStaffCode:m(t,["assigned_staff_code"],""),nextActionDate:m(t,["next_action_date"],""),nextAction:m(t,["next_action"],""),note:m(t,["note"],""),lastContactAt:m(t,["last_contact_at"],""),wonAt:m(t,["won_at"],""),lostAt:m(t,["lost_at"],""),lostReason:m(t,["lost_reason"],""),convertedCustomerCode:m(t,["converted_customer_code"],""),createdAt:m(t,["created_at"],"")}))}async function es(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function Nn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Rn(e){return(await S("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:m(n,["id"],""),prospectId:m(n,["prospect_id"],""),activityType:m(n,["activity_type"],"call"),title:m(n,["title"],""),description:m(n,["description"],""),activityDate:m(n,["activity_date"],""),result:m(n,["result"],""),staffCode:m(n,["staff_code"],"")}))}async function On(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const ts=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function jn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function Mn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Fn(){return(await S("delivery_locations",{order:"name.asc"})).map(t=>({id:m(t,["id"],""),customerCode:m(t,["customer_code"],""),name:m(t,["name"],""),postalCode:m(t,["postal_code"],""),address:m(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:m(t,["contact_name"],""),phone:m(t,["phone"],""),deliveryNote:m(t,["delivery_note"],""),isActive:z(t,["is_active"],!0)}))}async function Bn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function zn(e=50){return(await S("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),callDirection:m(n,["call_direction"],"inbound"),fromNumber:m(n,["from_number"],""),toNumber:m(n,["to_number"],""),matchedCustomerCode:m(n,["matched_customer_code"],""),matchedProspectId:m(n,["matched_prospect_id"],""),durationSeconds:D(n.duration_seconds),callStatus:m(n,["call_status"],"answered"),recordingUrl:m(n,["recording_url"],""),transcript:m(n,["transcript"],""),ivryCallId:m(n,["ivry_call_id"],""),startedAt:m(n,["started_at"],""),endedAt:m(n,["ended_at"],""),notes:m(n,["notes"],"")}))}async function as(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Vn(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const i=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(i,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const a=(await r.json()).calls??[];let o=0;for(const l of a)await as({id:`ivry_${l.id}`,callDirection:String(l.direction??"inbound"),fromNumber:String(l.from??""),toNumber:String(l.to??""),durationSeconds:Number(l.duration??0),callStatus:String(l.status??"answered"),recordingUrl:String(l.recording_url??""),startedAt:String(l.started_at??""),endedAt:String(l.ended_at??""),ivryCallId:String(l.id??"")}),o++;return await De({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${o}件取得`}),{count:o}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function Jn(e,t){const n=e.config.api_key,i=e.config.team_id;if(!n||!i)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const c of t){if(!c.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${i}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:c.name,phone_number:c.phone,external_id:c.customerCode??"",note:c.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function Un(){return(await S("lead_lists",{order:"created_at.desc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),query:m(t,["query"],""),area:m(t,["area"],""),businessType:m(t,["business_type"],""),totalCount:D(t.total_count),source:m(t,["source"],"manual"),createdAt:m(t,["created_at"],"")}))}async function Yn(e){return(await S("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:m(n,["id"],""),listId:m(n,["list_id"],""),companyName:m(n,["company_name"],""),address:m(n,["address"],""),phone:m(n,["phone"],""),website:m(n,["website"],""),email:m(n,["email"],""),businessType:m(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:D(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:m(n,["place_id"],""),status:m(n,["status"],"new"),convertedProspectId:m(n,["converted_prospect_id"],""),note:m(n,["note"],"")}))}async function Hn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function ss(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function Qn(e,t,n){const i=e.config.api_key;if(!i)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),c=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${i}`;try{const a=await fetch(c);if(!a.ok)return{results:[],error:`HTTP ${a.status}`};const o=await a.json();return o.status!=="OK"&&o.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${o.status}`}:{results:o.results.map(d=>{const u=d.geometry?.location;return{id:`place_${d.place_id}`,listId:"",companyName:String(d.name??""),address:String(d.formatted_address??""),rating:d.rating?Number(d.rating):void 0,reviewCount:d.user_ratings_total?Number(d.user_ratings_total):void 0,lat:u?.lat,lng:u?.lng,placeId:String(d.place_id??""),status:"new"}})}}catch(a){return{results:[],error:a instanceof Error?a.message:String(a)}}}async function Gn(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await es(t);return n&&await ss({...e,status:"imported",convertedProspectId:t.id}),n}async function Xn(){return(await S("workflow_orders",{order:"order_date.desc"})).map(t=>({id:m(t,["id"],""),orderNo:m(t,["order_no"],""),customerName:m(t,["customer_name"],""),customerCode:m(t,["customer_code"],""),orderDate:m(t,["order_date"],""),deliveryDate:m(t,["delivery_date"],""),stage:m(t,["stage"],"new"),totalAmount:D(t.total_amount),itemCount:D(t.item_count),priority:m(t,["priority"],"normal"),staffName:m(t,["staff_name"],""),notes:m(t,["notes"],"")}))}async function Kn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function Wn(){return(await S("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),email:m(t,["email"],""),phone:m(t,["phone"],""),visitDate:m(t,["visit_date"],""),partySize:D(t.party_size)||1,language:m(t,["language"],"ja"),purpose:m(t,["purpose"],""),message:m(t,["message"],""),status:m(t,["status"],"new"),repliedAt:m(t,["replied_at"],""),confirmedTime:m(t,["confirmed_time"],""),createdAt:m(t,["created_at"],new Date().toISOString())}))}async function Zn(e){const{supabaseInsert:t}=await g(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>O);return{supabaseInsert:i}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const ei=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function ns(){return(await Promise.all(ei.map(async t=>{const[n,i]=await Promise.all([At(t.table),S(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:i[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Ue(e,t,n=100){const i=(t-1)*n,[r,c]=await Promise.all([S(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(i)}),At(e)]);return{records:r,total:c}}async function ft(e){const t=await S("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const i=JSON.parse(n);return String(i.price_group??"")}catch{return""}return""}async function is(e,t){if(e){const i=await S("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(i.length>0&&i[0].special_price)return D(i[0].special_price)}const n=await S("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?D(n[0].default_sale_price):0}const w=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Nt,CALENDAR_CATEGORY_LABELS:qt,DEPT_LABELS:Ge,INVOICE_TYPE_LABELS:yt,JIKOMI_STATUS_LABELS:Fa,MATERIAL_CATEGORIES:ts,PROSPECT_STAGE_COLORS:tt,PROSPECT_STAGE_LABELS:Ie,ROLE_LABELS:Qe,SEASONAL_TEMPLATES:Et,SLACK_EVENT_LABELS:Xe,TAX_DEDUCTION_LABELS:vt,TAX_RATE_CATEGORIES:Qa,convertLeadToProspect:Gn,deleteCalendarEvent:fn,deleteMailSender:yn,deleteMaterial:Mn,deletePrintLayout:un,deleteProspect:Nn,deleteUserProfile:En,fetchAnalyticsByPeriod:zs,fetchAnnouncements:Da,fetchAuditLogs:Ln,fetchAvailablePeriods:Vs,fetchBillList:Ya,fetchBillingSummary:Dt,fetchCalendarEvents:hn,fetchCallLogs:zn,fetchChurnAlerts:Ks,fetchCustomerAnalysis:Ma,fetchCustomerEfficiency:ja,fetchCustomerLedger:Ct,fetchCustomerPriceGroup:ft,fetchCustomerPricing:Na,fetchDeliveryLocations:Fn,fetchDeliveryNote:Lt,fetchDeliverySchedule:Xs,fetchDemandForecasts:Gs,fetchFaxInbox:wn,fetchIntegrationSettings:Wa,fetchInvoices:He,fetchJikomiList:Ba,fetchKenteiList:Va,fetchLeadItems:Yn,fetchLeadLists:Un,fetchMailSenders:pn,fetchMasterStats:Ye,fetchMaterialList:ht,fetchMyProfile:An,fetchPayableList:Ua,fetchPaymentStatus:xa,fetchPipelineMeta:Aa,fetchPrintLayouts:cn,fetchProductABC:an,fetchProductDaily:tn,fetchProductMonthlyShipments:Qs,fetchProductPower:Oa,fetchProductPrice:is,fetchProductShipmentsFromTable:en,fetchProspectActivities:Rn,fetchProspects:qn,fetchPurchaseList:Ja,fetchRawMaterialStock:Ha,fetchRawRecords:Ue,fetchRawTableList:ns,fetchSalesAnalytics:Ea,fetchSalesReport:et,fetchSalesSummary:Sa,fetchSeasonalProfiles:Zs,fetchShopifyOrders:gn,fetchSlackLogs:In,fetchSlackRules:Za,fetchStaffCustomerBreakdown:Js,fetchStaffProductBreakdown:Us,fetchStoreOrders:Xa,fetchStoreSales:Tt,fetchSyncDashboard:Pa,fetchTankList:za,fetchTaxDeclaration:It,fetchTourInquiriesFromDb:Wn,fetchUserProfiles:xn,fetchVisitPriorities:Ws,fetchWorkflowOrdersFromDb:Xn,generateTaxCSV:on,generateTaxXML:Ga,ocrFaxImage:kn,recalculateTaxDeclaration:ln,recordAudit:Cn,resolveProductPrice:Ra,saveCalendarEvent:vn,saveCallLog:as,saveDeliveryLocation:Bn,saveEmailCampaign:Je,saveFaxRecord:Sn,saveIntegrationSetting:De,saveInvoice:La,saveLeadItem:ss,saveLeadList:Hn,saveMailSender:mn,saveMaterial:jn,savePrintLayout:dn,saveProspect:es,saveProspectActivity:On,saveSlackRule:Dn,saveTaxDeclaration:rn,saveTourInquiry:Zn,saveUserProfile:Pn,saveWorkflowOrder:Kn,searchPlaces:Qn,sendEmailCampaign:Ka,sendSlackNotification:Tn,submitFeatureRequest:Ia,syncGoogleCalendar:_n,syncIvryCallLogs:Vn,syncPhoneBookToIvry:Jn,syncShopifyOrders:bn,updateCustomer:Ta,updateProduct:qa},Symbol.toStringTag,{value:"Module"}));function pe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const ti={open:"未締め",closed:"締め済"};function ai(e,t){const n=e.customers.map(i=>`
      <tr>
        <td>
          <div class="table-title">${i.customerName}</div>
          <div class="table-sub mono">${i.customerCode}</div>
        </td>
        <td class="numeric">${i.closingDay}日</td>
        <td class="numeric">${pe(i.salesAmount)}</td>
        <td class="numeric">${pe(i.taxAmount)}</td>
        <td class="numeric">${pe(i.prevBalance)}</td>
        <td class="numeric">${pe(i.paymentAmount)}</td>
        <td class="numeric"><strong>${pe(i.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${i.status==="closed"?"success":"warning"}">${ti[i.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="billing-print" data-code="${i.customerCode}" ${i.status==="closed"?"":"disabled"}>請求書</button>
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
            ${[10,15,20,25,31].map(i=>`<option value="${i}" ${e.closingDay===i?"selected":""}>${i}日締め</option>`).join("")}
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
        <p class="kpi-value">${pe(e.totalBilling)}</p>
        <p class="kpi-sub">${e.targetYearMonth} / ${e.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${e.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${e.customers.filter(i=>i.status==="closed").length} 社</p>
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
  `}const si={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},ni={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Ut(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Te(e){const t=ni[e],n=si[e].map(i=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Ut(i.title)}</p>
            <p class="category-card-description">${Ut(i.description)}</p>
          </div>
          <div class="category-card-actions">
            <button class="button secondary" type="button" data-link="${i.path}">
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
  `}function os(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Ae(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ii(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${os(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${Ae(t.amount)}</td>
        </tr>
      `).join("")}function oi(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${os(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${Ae(t.amount)}</td>
        </tr>
      `).join("")}function li(e,t){return`
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
            <dd>${Ae(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${Ae(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${Ae(e.balanceAmount)}</dd>
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
            <tbody>${ii(e)}</tbody>
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
            <tbody>${oi(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function qe(e,t,n){const i=e.findIndex(c=>c.column===t);if(i>=0){if(e[i].direction==="asc"){const a=[...e];return a[i]={column:t,direction:"desc"},a}return e.filter((a,o)=>o!==i)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function ri(e,t){const n=e.findIndex(c=>c.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const i=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${i}${r}</span>`}function E(e,t,n,i=""){return`<th class="sortable ${i}" data-sort-col="${e}">${t} ${ri(n,e)}</th>`}function Yt(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function Ce(e,t,n){return t.length===0?e:[...e].sort((i,r)=>{for(const{column:c,direction:a}of t){const o=n[c];if(!o)continue;const l=Yt(i[o]),d=Yt(r[o]);let u=0;if(typeof l=="number"&&typeof d=="number"?u=l-d:u=String(l).localeCompare(String(d),"ja"),u!==0)return a==="asc"?u:-u}return 0})}const ci={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Ht={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},ge={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function di(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function ui(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function pi(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function ls(e,t){const n=ui(t),i=pi(t),[r,c]=t.split("-").map(Number),a=new Map;e.forEach(I=>{if(I.date.slice(0,7)===t){const _=I.date.slice(0,10);a.has(_)||a.set(_,[]),a.get(_).push(I)}});const o=e.filter(I=>I.date.slice(0,7)===t),l=o.reduce((I,_)=>I+_.quantity,0),d=new Set(o.map(I=>I.date)).size,u=new Date().toISOString().slice(0,10),p=["日","月","火","水","木","金","土"].map(I=>`<th class="dcal-header">${I}</th>`).join("");let y="",v=1;for(let I=0;I<6&&!(v>n&&I>0);I++){y+="<tr>";for(let _=0;_<7;_++)if(I===0&&_<i||v>n)y+='<td class="dcal-cell dcal-empty"></td>';else{const L=`${r}-${String(c).padStart(2,"0")}-${String(v).padStart(2,"0")}`,F=a.get(L)||[],W=L===u,ae=F.reduce((U,ee)=>U+ee.quantity,0);y+=`
          <td class="dcal-cell ${W?"dcal-today":""}">
            <div class="dcal-day">${v}</div>
            ${F.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${F[0].status}">${F.length}件 ${ae}本</div>
              </div>
            `:""}
          </td>`,v++}y+="</tr>"}const[f,A]=c===1?[r-1,12]:[r,c-1],[$,P]=c===12?[r+1,1]:[r,c+1],x=`${f}-${String(A).padStart(2,"0")}`,q=`${$}-${String(P).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${c}月: ${d}日稼働 / ${o.length}件 / 合計${l.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${x}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${c}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${q}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${p}</tr></thead>
        <tbody>${y}</tbody>
      </table>
    </section>
  `}function mi(e,t){const n=t==="all"?e:e.filter(o=>o.segment===t),i={all:e.length};e.forEach(o=>{i[o.segment]=(i[o.segment]??0)+1});const c=["all",...[...new Set(e.map(o=>o.segment))]].map(o=>`
      <button class="button ${t===o?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${o}">
        ${o==="all"?"全て":Ht[o]??o} (${i[o]??0})
      </button>
    `).join(""),a=n.map(o=>`
      <tr>
        <td class="mono">${o.code}</td>
        <td>${o.name}</td>
        <td><span class="segment-badge" style="background:${ge[o.segment]??"#718096"};">${Ht[o.segment]??o.segment}</span></td>
        <td class="numeric">${o.avgMonthly>0?o.avgMonthly.toLocaleString():"—"}</td>
        <td class="numeric" style="font-weight:700;">${o.nextMonthForecast>0?o.nextMonthForecast.toLocaleString():"—"}</td>
        <td class="numeric">${o.annualForecast>0?o.annualForecast.toLocaleString():"—"}</td>
        <td class="numeric">${o.safetyStock>0?o.safetyStock.toLocaleString():"—"}</td>
      </tr>
    `).join("");return e.length===0?`
      <section class="panel">
        <div class="panel-header">
          <div><h2>需要予測</h2></div>
        </div>
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
          <p class="loading-text">出荷データを読み込んでいます…</p>
        </div>
      </section>
    `:`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>需要予測・在庫適正化</h2>
          <p class="panel-caption">商品×月の実出荷量ベース（12月歳暮スパイクを補正）</p>
        </div>
      </div>

      <div class="forecast-info">
        <div class="forecast-info-card">
          <strong>セグメント自動分類</strong>
          <ul>
            <li><span class="segment-badge" style="background:${ge.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${ge["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${ge["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${ge["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
          </ul>
        </div>
      </div>

      <div class="button-group" style="margin-bottom:12px;">${c}</div>

      <div class="table-wrap">
        <table class="forecast-table">
          <thead>
            <tr>
              <th>コード</th>
              <th>商品名</th>
              <th>区分</th>
              <th class="numeric">月平均</th>
              <th class="numeric">翌月予測</th>
              <th class="numeric">年間予測</th>
              <th class="numeric">安全在庫</th>
            </tr>
          </thead>
          <tbody>${a}</tbody>
        </table>
      </div>
    </section>
  `}function yi(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${ls(e.deliveries,e.calendarMonth)}
    ${mi(e.forecasts,e.selectedSegment)}
  `}function hi(e,t){return ls(e,t)}const Ne={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間"};function Qt(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function vi(e,t,n){if(t==="all")return e;const i=new Date,r=i.toISOString().slice(0,10),c=new Date(i);switch(t){case"today":return e.filter(a=>a.date.slice(0,10)===r);case"month":return e.filter(a=>a.date.slice(0,7)===r.slice(0,7));case"90days":return c.setDate(c.getDate()-90),e.filter(a=>a.date>=c.toISOString());case"year":return c.setFullYear(c.getFullYear()-1),e.filter(a=>a.date>=c.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(a=>{const o=a.date.slice(0,10);return o>=n.start&&o<=n.end})}}function Q(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function nt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function $e(e,t){for(const n of t){const i=e[n];if(typeof i=="number"&&Number.isFinite(i))return i;if(typeof i=="string"){const r=Number(i);if(Number.isFinite(r))return r}}return null}function fi(e){const t=e?.productTotals;if(!t||t.length===0)return"―";const n=t.reduce((r,c)=>{const a=$e(c,["amount","salesAmount"]),o=$e(c,["marginRate","grossMarginRate"]);return a===null||a<=0||o===null?r:{weightedAmount:r.weightedAmount+a,weightedRate:r.weightedRate+a*o}},{weightedAmount:0,weightedRate:0});if(n.weightedAmount>0)return`${(n.weightedRate/n.weightedAmount).toFixed(1)}%`;const i=t.reduce((r,c)=>{const a=c,o=$e(a,["amount","salesAmount"]),l=$e(a,["grossProfit","grossAmount","margin"]),d=$e(a,["costAmount","cost","costPrice"]);if(o===null||o<=0)return r;const u=l??(d!==null?o-d:null);return u===null?r:{sales:r.sales+o,gross:r.gross+u}},{sales:0,gross:0});return i.sales>0?`${(i.gross/i.sales*100).toFixed(1)}%`:"―"}function bi(e){const i={top:20,right:20,bottom:30,left:50},r=760-i.left-i.right,c=260-i.top-i.bottom,a=Math.max(...e.map(u=>u.amount),1),o=r/e.length,l=e.map((u,p)=>{const y=u.amount/a*c,v=i.left+p*o+4,f=i.top+c-y,A=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${v}" y="${f}" width="${Math.max(o-8,8)}" height="${y}" rx="4" fill="#0F5B8D" opacity="${.58+p/e.length*.34}" />
          ${p%5===0?`<text x="${v+6}" y="252" class="chart-axis">${A}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=i.top+c-c*u,y=Math.round(a*u/1e3);return`
        <g>
          <line x1="${i.left}" y1="${p}" x2="${760-i.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${y.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${l}
    </svg>
  `}function gi(e,t,n,i,r="month",c,a=[]){const o={success:"正常",warning:"注意",error:"異常",running:"実行中"},l=vi(e.allDailySales,r,c),d=l.reduce((_,L)=>_+L.amount,0),u=l.reduce((_,L)=>_+L.bottles,0),p=l.reduce((_,L)=>_+L.volumeMl,0),y=l.length,v=u>0?Math.round(d/u):0,f=p>0?Math.round(d/(p/1e3)):0,$=(l.length>0?e.allDailySales.filter(_=>{const L=l[0]?.date??"",F=l[l.length-1]?.date??"",W=Qt(L,-1),ae=Qt(F,-1);return _.date>=W&&_.date<=ae}):[]).reduce((_,L)=>_+L.amount,0),P=$>0?(d-$)/$*100:0,x=P>0?"+":"",q=e.salesRecords.slice(0,10).map(_=>`
            <tr>
              <td class="mono">${_.documentNo}</td>
              <td>${nt(_.date)}</td>
              <td>${_.customerName}</td>
              <td class="numeric">${Q(_.amount)}</td>
            </tr>
          `).join(""),I=["today","month","90days","year","all"].map(_=>`<button class="button ${_===r?"primary":"secondary"} small" type="button" data-period="${_}">${Ne[_]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${o[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${nt(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${I}</div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="range-start" class="range-input" />
        <span>〜</span>
        <input type="date" id="range-end" class="range-input" />
        <button class="button secondary small" type="button" data-action="apply-range">適用</button>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${Q(e.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${e.kpis.todayDelta>0?"+":""}${e.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">${Ne[r]}売上</p>
        <p class="kpi-value">${Q(d)}</p>
        <p class="kpi-sub">${y}日間${y>0?` / 日平均 ${Q(Math.round(d/y))}`:""}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${P>=0?"#2f855a":"#c53d3d"}">${$>0?`${x}${P.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${$>0?Q($):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${Q(e.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${fi(n)}</p>
        <p class="kpi-sub">売上分析データから集計</p>
      </article>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${u.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${Q(v)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(p/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${Q(f)}</p>
      </article>
    </section>

    ${i?.masterCounts?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先マスタ</p>
        <p class="kpi-value">${i.masterCounts.customers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品マスタ</p>
        <p class="kpi-value">${i.masterCounts.products.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">仕入先</p>
        <p class="kpi-value">${i.masterCounts.suppliers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
    </section>
    `:""}

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">${Ne[r]} (${l.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${bi(l.length>0?l:e.dailySales)}
        </div>
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
              <dt>データ最新日</dt>
              <dd style="font-weight:700;color:var(--accent)">${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</dd>
            </div>
            <div>
              <dt>同期エージェント</dt>
              <dd>${nt(t.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>ジョブ</dt>
              <dd>${t.jobName}</dd>
            </div>
          </dl>
        </div>
        <div class="sync-panel-bottom">
          <p class="sync-message">${t.message}</p>
          <div class="quick-links">
            <div class="panel-header">
              <div>
                <h2>クイックアクセス</h2>
                <p class="panel-caption">業務画面へ移動</p>
              </div>
            </div>
            <div class="quick-link-grid">
              <button class="button secondary small" type="button" data-link="/invoice-entry">伝票入力</button>
              <button class="button secondary small" type="button" data-link="/sales">売上一覧</button>
              <button class="button secondary small" type="button" data-link="/payment">入金状況</button>
              <button class="button secondary small" type="button" data-link="/delivery">納品書</button>
              <button class="button secondary small" type="button" data-link="/billing">月次請求</button>
              <button class="button secondary small" type="button" data-link="/master">マスタ</button>
              <button class="button secondary small" type="button" data-link="/workflow">受注処理</button>
              <button class="button secondary small" type="button" data-link="/analytics">売上分析</button>
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
          <tbody>${q}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${Ne[r]} — 売上・本数・液体量・単価（${l.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${E("date","日付",a)}
              ${E("amount","売上",a,"numeric")}
              ${E("bottles","本数",a,"numeric")}
              ${E("volumeMl","液体量(L)",a,"numeric")}
              ${E("pricePerBottle","本単価",a,"numeric")}
              ${E("pricePerLiter","L単価",a,"numeric")}
            </tr>
          </thead>
          <tbody>${Ce(a.length>0?l:l.slice().reverse(),a,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(_=>`
            <tr>
              <td class="mono">${_.date.slice(0,10)}</td>
              <td class="numeric">${Q(_.amount)}</td>
              <td class="numeric">${_.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(_.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${Q(_.pricePerBottle)}</td>
              <td class="numeric">${Q(_.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${i?$i(i):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function $i(e){const t=e.prospects.reduce((a,o)=>a+o.expectedAmount*o.probability/100,0),n=e.prospects.filter(a=>a.stage==="hot"||a.stage==="negotiating").length,i=new Date().toISOString().slice(0,10),r=e.upcomingEvents.filter(a=>a.startsAt.slice(0,10)>=i).slice(0,5),c=e.tourInquiries.filter(a=>a.status==="new").length;return`
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
      <article class="panel kpi-card ${c>0?"kpi-alert":""}">
        <p class="panel-title">未対応問合せ</p>
        <p class="kpi-value">${c}件</p>
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
          ${["cold","warm","hot","contacted","negotiating","won"].map(a=>{const o=e.prospects.filter(d=>d.stage===a).length,l=e.prospects.filter(d=>d.stage===a).reduce((d,u)=>d+u.expectedAmount,0);return`
              <div style="background:${tt[a]};color:white;padding:12px;border-radius:6px;text-align:center;">
                <div style="font-size:11px;">${Ie[a]}</div>
                <div style="font-size:20px;font-weight:700;margin:4px 0;">${o}</div>
                <div style="font-size:10px;opacity:0.9;">¥${(l/1e4).toFixed(0)}万</div>
              </div>
            `}).join("")}
        </div>
      </article>

      <aside class="panel">
        <div class="panel-header">
          <div><h2>📅 直近の予定</h2></div>
          <button class="button secondary" data-link="/calendar">カレンダー</button>
        </div>
        ${r.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${r.map(a=>{const o=new Date(a.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${a.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${o.getMonth()+1}/${o.getDate()} ${a.isAllDay?"終日":o.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${a.title}</div>
                  ${a.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${a.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?hi(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}
  `}function _i(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function me(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function wi(e,t){const n=e.lines.length?e.lines.map((r,c)=>`
          <tr>
            <td class="numeric">${c+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${me(r.unitPrice)}</td>
            <td class="numeric">${me(r.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',i=e.totalAmount-e.taxAmount;return`
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
            <tr><th>納品日</th><td>${_i(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${me(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${me(i)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${me(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${me(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function X(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ki(e){return X(e).replaceAll(`
`,"<br />")}function Si(e){const n=[...Object.values(Et),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${X(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),i=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${X(r.name)}</span>
              <span class="table-sub">${X(r.email)} / ${X(r.area)}</span>
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
          ${i}
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
          <input id="email-subject" type="text" value="${X(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${X(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${X(r.name)} &lt;${X(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${X(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?ki(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${X(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function G(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Re(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function xi(e,t){const n=[Re("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${G(r.name)}</strong>
            <span class="table-sub mono">${G(r.code)}</span>
          </button>
        `)),Re("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${G(r.name)}</strong>
            <span class="table-sub mono">${G(r.code)}</span>
          </button>
        `)),Re("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${G(r.documentNo)}</strong>
            <span class="table-sub">${G(r.customerName)} / ${G(r.date)}</span>
          </button>
        `)),Re("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${G(r.path)}"
          >
            <strong>${G(r.title)}</strong>
            <span class="table-sub mono">${G(r.path)}</span>
          </button>
        `))].filter(Boolean).join(""),i=e.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
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
            value="${G(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||i}
          </div>
        </div>
      </div>
    </div>
  `}function _e(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function rs(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${_e(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${_e(e.title)}">
        <div class="modal-header">
          <h2>${_e(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${_e(e.placeholder)}"
            value="${_e(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function Oe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Gt(e){return e.trim().toLowerCase()}function Ai(e,t){const n=Gt(t),i=e.filter(c=>n?[c.code,c.name,c.name].map(Gt).some(a=>a.includes(n)):!0).slice(0,50),r=i.length?`
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
              ${i.map(c=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Oe(c.code)}"
                      data-name="${Oe(c.name)}"
                    >
                      <td class="mono">${Oe(c.code)}</td>
                      <td>${Oe(c.name)}</td>
                      <td>${c.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return rs({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function Pi(e){return e.toISOString().slice(0,10)}function ue(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(e,t){return e[t]?`<div class="field-error">${ue(e[t])}</div>`:""}function ye(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function Ei(e,t,n,i){const r=Object.keys(yt).map(l=>`<option value="${l}" ${e.invoiceType===l?"selected":""}>${yt[l]}</option>`).join(""),c=e.lines.map((l,d)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${ye(i,`lines.${d}.productCode`,"input-cell")}" type="text" data-line="${d}" data-field="productCode" value="${ue(l.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${d}" aria-label="商品検索">🔍</button>
          </div>
          ${oe(i,`lines.${d}.productCode`)}
        </td>
        <td>
          <input class="${ye(i,`lines.${d}.productName`,"input-cell")}" type="text" data-line="${d}" data-field="productName" value="${ue(l.productName)}" placeholder="商品名" />
          ${oe(i,`lines.${d}.productName`)}
        </td>
        <td>
          <input class="${ye(i,`lines.${d}.quantity`,"input-cell numeric")}" type="number" data-line="${d}" data-field="quantity" value="${l.quantity}" min="0" />
          ${oe(i,`lines.${d}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${d}" data-field="unit" value="${l.unit}" placeholder="本" /></td>
        <td>
          <input class="${ye(i,`lines.${d}.unitPrice`,"input-cell numeric")}" type="number" data-line="${d}" data-field="unitPrice" value="${l.unitPrice}" min="0" />
          ${oe(i,`lines.${d}.unitPrice`)}
        </td>
        <td class="numeric">${l.amount>0?l.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${d}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${d}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),a=e.lines.reduce((l,d)=>l+d.amount,0),o=Math.floor(a*10/110);return`
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
          <input class="${ye(i,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Pi(new Date)}" />
          ${oe(i,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${ye(i,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${ue(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${oe(i,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${ue(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${ue(e.staffCode)}" />
        </label>
      </div>
      ${oe(i,"lines")}
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
          <tbody id="invoice-lines">${c||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(a-o).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${o.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${a.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${ue(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}const Ci={showQuoteNo:!0,showValidUntil:!0,showSubject:!0,showDeliveryDate:!1,showPaymentTerms:!0,showDeliveryPlace:!1,showRemarks:!0,showSeal:!0,headerNote:"",footerNote:""},cs={quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:"",customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:"月末締め翌月末払い",deliveryPlace:"",previewMode:!1,sealSettings:null,fieldConfig:{...Ci}};function K(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function C(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ds(e){const t=e.lines.reduce((a,o)=>a+o.amount,0),n=Math.round(t*e.taxRate/100),i=t+n,r=e.fieldConfig,c=[];return r.showValidUntil&&e.validUntil&&c.push(`<tr><th>有効期限</th><td>${e.validUntil}</td></tr>`),r.showDeliveryDate&&e.deliveryDate&&c.push(`<tr><th>納期</th><td>${C(e.deliveryDate)}</td></tr>`),r.showPaymentTerms&&e.paymentTerms&&c.push(`<tr><th>支払条件</th><td>${C(e.paymentTerms)}</td></tr>`),r.showDeliveryPlace&&e.deliveryPlace&&c.push(`<tr><th>納品場所</th><td>${C(e.deliveryPlace)}</td></tr>`),`
    <div class="quote-preview" id="quote-preview-area">
      <div class="quote-preview-inner">
        <h2 class="quote-preview-title">御 見 積 書</h2>

        <div class="quote-preview-meta">
          <div class="quote-preview-customer">
            <p class="quote-preview-customer-name">${C(e.customerName||"（得意先未選択）")} 御中</p>
            ${e.customerAddress?`<p class="quote-preview-addr">${C(e.customerAddress)}</p>`:""}
          </div>
          <div class="quote-preview-info">
            ${r.showQuoteNo&&e.quoteNo?`<p>No. ${C(e.quoteNo)}</p>`:""}
            <p>${e.quoteDate}</p>
            <p class="quote-preview-company">金井酒造店</p>
            <p class="quote-preview-company-sub">〒259-1205 神奈川県平塚市土屋2556</p>
            <p class="quote-preview-company-sub">TEL 0463-58-0006</p>
            ${r.showSeal&&e.sealSettings?.imageDataUrl?`
              <div class="quote-preview-seal">
                <img src="${e.sealSettings.imageDataUrl}" alt="社印" style="width:${e.sealSettings.size}px;height:${e.sealSettings.size}px;" />
              </div>
            `:""}
          </div>
        </div>

        ${r.headerNote?`<p class="quote-preview-note">${C(r.headerNote)}</p>`:""}

        ${r.showSubject&&e.subject?`<p class="quote-preview-subject">件名: ${C(e.subject)}</p>`:""}

        <div class="quote-preview-total-banner">
          <span>合計金額</span>
          <span class="quote-preview-total-value">${K(i)}（税込）</span>
        </div>

        <table class="quote-preview-table">
          <thead>
            <tr>
              <th style="width:40px;">No.</th>
              <th>品名</th>
              <th style="width:60px;">数量</th>
              <th style="width:40px;">単位</th>
              <th style="width:90px;">単価</th>
              <th style="width:100px;">金額</th>
            </tr>
          </thead>
          <tbody>
            ${e.lines.map((a,o)=>`
              <tr>
                <td style="text-align:center;">${o+1}</td>
                <td>${C(a.productName)}</td>
                <td style="text-align:right;">${a.quantity.toLocaleString()}</td>
                <td style="text-align:center;">${C(a.unit)}</td>
                <td style="text-align:right;">${K(a.unitPrice)}</td>
                <td style="text-align:right;">${K(a.amount)}</td>
              </tr>
            `).join("")}
            ${e.lines.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:#999;">明細なし</td></tr>':""}
          </tbody>
          <tfoot>
            <tr><td colspan="5" style="text-align:right;font-weight:700;">小計</td><td style="text-align:right;">${K(t)}</td></tr>
            <tr><td colspan="5" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${K(n)}</td></tr>
            <tr class="quote-preview-total-row"><td colspan="5" style="text-align:right;font-weight:700;">合計</td><td style="text-align:right;font-weight:700;">${K(i)}</td></tr>
          </tfoot>
        </table>

        ${c.length>0?`
          <table class="quote-preview-conditions">
            ${c.join("")}
          </table>
        `:""}

        ${r.showRemarks&&e.remarks?`
          <div class="quote-preview-remarks">
            <p class="quote-preview-remarks-label">備考</p>
            <p>${C(e.remarks).replace(/\n/g,"<br/>")}</p>
          </div>
        `:""}

        ${r.footerNote?`<p class="quote-preview-footer-note">${C(r.footerNote)}</p>`:""}
      </div>
    </div>
  `}function Li(e){const t=(n,i,r)=>`
    <label class="quote-field-toggle">
      <input type="checkbox" data-field-toggle="${n}" ${r?"checked":""} />
      <span>${i}</span>
    </label>
  `;return`
    <section class="panel">
      <div class="panel-header"><h2>表示項目設定</h2></div>
      <div class="quote-field-grid">
        ${t("showQuoteNo","見積番号",e.showQuoteNo)}
        ${t("showValidUntil","有効期限",e.showValidUntil)}
        ${t("showSubject","件名",e.showSubject)}
        ${t("showDeliveryDate","納期",e.showDeliveryDate)}
        ${t("showPaymentTerms","支払条件",e.showPaymentTerms)}
        ${t("showDeliveryPlace","納品場所",e.showDeliveryPlace)}
        ${t("showRemarks","備考",e.showRemarks)}
        ${t("showSeal","社印",e.showSeal)}
      </div>
      <div class="quote-notes-grid" style="margin-top:12px;">
        <div class="form-row">
          <label>ヘッダーメモ（見積書上部に表示）</label>
          <input type="text" id="q-header-note" value="${C(e.headerNote)}" placeholder="例: 下記のとおりお見積り申し上げます" />
        </div>
        <div class="form-row">
          <label>フッターメモ（見積書���部に表示）</label>
          <input type="text" id="q-footer-note" value="${C(e.footerNote)}" placeholder="例: 本見積書に関するご不明点はお気軽にお問合せください" />
        </div>
      </div>
    </section>
  `}function Di(e){return`
    <section class="panel">
      <div class="panel-header"><h2>社印設定</h2></div>
      <div class="quote-seal-area">
        ${e?.imageDataUrl?`
          <div class="quote-seal-preview">
            <img src="${e.imageDataUrl}" alt="社印プレビュー" style="width:${e.size}px;height:${e.size}px;" />
          </div>
          <div class="quote-seal-controls">
            <label>サイズ: <input type="range" id="q-seal-size" min="40" max="120" value="${e.size}" style="width:120px;" /> ${e.size}px</label>
            <button class="button secondary small" type="button" data-action="remove-seal">削除</button>
          </div>
        `:`
          <p style="color:var(--text-secondary);font-size:13px;">社印画像（PNG推奨、透過背景）をアップロー��してください。</p>
        `}
        <div class="quote-seal-upload">
          <label class="button secondary" style="cursor:pointer;">
            画像を選択
            <input type="file" id="q-seal-file" accept="image/png,image/jpeg,image/gif" style="display:none;" />
          </label>
        </div>
      </div>
    </section>
  `}function Ii(e,t,n,i,r,c){const a=e.lines.reduce((y,v)=>y+v.amount,0),o=Math.round(a*e.taxRate/100),l=a+o,d=i.length>=1?t.filter(y=>y.name.includes(i)||y.code.includes(i)).slice(0,8):[],u=r.length>=1?n.filter(y=>y.name.includes(r)||y.code.includes(r)).slice(0,8):[],p=e.fieldConfig;return e.previewMode?`
      <section class="page-head">
        <div>
          <p class="eyebrow">見積作成</p>
          <h1>見積書プレビュー</h1>
        </div>
        <div class="meta-stack">
          <button class="button secondary" type="button" data-action="quote-edit-mode">← 編集に戻る</button>
          <button class="button primary" type="button" data-action="quote-download-pdf">PDF ダウンロード</button>
        </div>
      </section>
      ${ds(e)}
    `:`
    <section class="page-head">
      <div>
        <p class="eyebrow">見積作成</p>
        <h1>見積書</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote">保存</button>
        <button class="button secondary" type="button" data-action="quote-preview-mode">プレビュー</button>
        <button class="button secondary" type="button" data-action="quote-download-pdf">PDF</button>
      </div>
    </section>

    <section class="panel">
      <div class="quote-header-grid">
        ${p.showQuoteNo?`
        <div class="form-row">
          <label>見積番号</label>
          <input type="text" id="q-no" value="${C(e.quoteNo)}" placeholder="自動採番" />
        </div>`:""}
        <div class="form-row">
          <label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        ${p.showValidUntil?`
        <div class="form-row">
          <label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>`:""}
        ${p.showSubject?`
        <div class="form-row">
          <label>件名</label>
          <input type="text" id="q-subject" value="${C(e.subject)}" placeholder="御見積の件" />
        </div>`:""}
        ${p.showDeliveryDate?`
        <div class="form-row">
          <label>納期</label>
          <input type="text" id="q-delivery-date" value="${C(e.deliveryDate)}" placeholder="例: 受注後2週間" />
        </div>`:""}
        ${p.showPaymentTerms?`
        <div class="form-row">
          <label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${C(e.paymentTerms)}" placeholder="月末締め翌月末���い" />
        </div>`:""}
        ${p.showDeliveryPlace?`
        <div class="form-row">
          <label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${C(e.deliveryPlace)}" placeholder="例: 貴社指定場所" />
        </div>`:""}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${C(i)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${d.length>0?`
        <div class="search-results">
          ${d.map(y=>`
            <button class="search-item" type="button" data-select-customer="${y.code}" data-cust-name="${C(y.name)}" data-cust-addr="${C(y.address1||"")}">
              <span class="mono">${y.code}</span> ${C(y.name)}
            </button>
          `).join("")}
        </div>
      `:""}
      ${e.customerName?`
        <div class="selected-item">
          <span class="mono">${e.customerCode}</span> <strong>${C(e.customerName)}</strong>
          ${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${C(e.customerAddress)}</span>`:""}
        </div>
      `:""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${C(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${u.length>0?`
        <div class="search-results">
          ${u.map(y=>{const v=c?Ra(y,c):{price:y.salePrice||0,label:"標準価格"},f=v.label!=="標準価格";return`
            <button class="search-item" type="button" data-add-product="${y.code}" data-prod-name="${C(y.name)}" data-prod-price="${v.price}">
              <span class="mono">${y.code}</span> ${C(y.name)}
              <span class="numeric" ${f?'style="color:#2f855a;font-weight:700;"':""}>${v.price?K(v.price):""} <small>(${v.label})</small></span>
            </button>`}).join("")}
        </div>
      `:""}

      <div class="table-wrap" style="margin-top:12px;">
        <table>
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
          <tbody>
            ${e.lines.map((y,v)=>`
              <tr>
                <td class="mono">${y.productCode}</td>
                <td>${C(y.productName)}</td>
                <td class="numeric"><input type="number" class="qty-input" data-line-idx="${v}" value="${y.quantity}" min="0" style="width:60px;text-align:right;" /></td>
                <td>${C(y.unit)}</td>
                <td class="numeric"><input type="number" class="price-input" data-line-idx="${v}" value="${y.unitPrice}" min="0" style="width:80px;text-align:right;" /></td>
                <td class="numeric">${K(y.amount)}</td>
                <td><button class="button secondary small" data-remove-line="${v}">×</button></td>
              </tr>
            `).join("")}
            ${e.lines.length===0?'<tr><td colspan="7" style="text-align:center;color:var(--text-secondary);padding:24px;">商品を検索して追加してください</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        ${p.showRemarks?`
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="2">${C(e.remarks)}</textarea>
        </div>`:""}
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${K(a)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${K(o)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${K(l)}</span></div>
        </div>
      </div>
    </section>

    ${Li(p)}
    ${Di(e.sealSettings)}
  `}function Ti(e){const t=ds(e),n=window.open("","_blank","width=800,height=1100");if(!n){alert("ポップアップがブロックされました。許可してください。");return}n.document.write(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<title>見積書 ${e.quoteNo||""}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif; font-size: 12px; line-height: 1.6; padding: 20mm; color: #1a1a1a; }
  .quote-preview-inner { max-width: 700px; margin: 0 auto; }
  .quote-preview-title { text-align: center; font-size: 22px; letter-spacing: 0.5em; margin-bottom: 24px; border-bottom: 2px solid #1a1a1a; padding-bottom: 8px; }
  .quote-preview-meta { display: flex; justify-content: space-between; margin-bottom: 20px; }
  .quote-preview-customer { flex: 1; }
  .quote-preview-customer-name { font-size: 16px; font-weight: 700; border-bottom: 1px solid #1a1a1a; padding-bottom: 4px; margin-bottom: 4px; }
  .quote-preview-addr { font-size: 11px; color: #444; }
  .quote-preview-info { text-align: right; font-size: 11px; }
  .quote-preview-company { font-weight: 700; font-size: 13px; margin-top: 8px; }
  .quote-preview-company-sub { font-size: 10px; color: #444; }
  .quote-preview-seal { margin-top: 8px; text-align: right; }
  .quote-preview-seal img { border-radius: 50%; }
  .quote-preview-note { font-size: 11px; margin-bottom: 12px; }
  .quote-preview-subject { font-size: 13px; font-weight: 700; margin-bottom: 12px; }
  .quote-preview-total-banner { display: flex; justify-content: space-between; align-items: center; background: #f5f5f5; border: 1px solid #ccc; padding: 8px 16px; margin-bottom: 16px; font-size: 14px; }
  .quote-preview-total-value { font-size: 18px; font-weight: 700; }
  .quote-preview-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  .quote-preview-table th, .quote-preview-table td { border: 1px solid #999; padding: 6px 8px; font-size: 11px; }
  .quote-preview-table th { background: #f0f0f0; font-weight: 700; text-align: center; }
  .quote-preview-table tfoot td { border-top: 2px solid #666; }
  .quote-preview-total-row td { font-weight: 700; border-top: 2px solid #333; }
  .quote-preview-conditions { width: 50%; border-collapse: collapse; margin-bottom: 16px; }
  .quote-preview-conditions th, .quote-preview-conditions td { border: 1px solid #ccc; padding: 4px 8px; font-size: 11px; }
  .quote-preview-conditions th { background: #f8f8f8; width: 100px; }
  .quote-preview-remarks { margin-top: 12px; padding: 8px; border: 1px solid #ddd; background: #fafafa; font-size: 11px; }
  .quote-preview-remarks-label { font-weight: 700; margin-bottom: 4px; }
  .quote-preview-footer-note { margin-top: 16px; font-size: 10px; color: #666; }
  @media print { body { padding: 10mm; } }
</style>
</head>
<body>
${t}
<script>
  window.onload = function() { window.print(); };
<\/script>
</body>
</html>`),n.document.close()}function us(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ps(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function ms(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function qi(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Ni(e,t,n,i,r){const c=new Map,a=new Map;for(const u of e){if(u.date>=t&&u.date<=n){const p=c.get(u.productCode);p?(p.amt+=u.amount,p.qty+=u.qty):c.set(u.productCode,{name:u.productName,vol:u.volumeMl,amt:u.amount,qty:u.qty})}u.date>=i&&u.date<=r&&a.set(u.productCode,(a.get(u.productCode)??0)+u.amount)}const o=[...c.entries()].map(([u,p])=>({code:u,...p})).sort((u,p)=>p.amt-u.amt),l=o.reduce((u,p)=>u+p.amt,0);let d=0;return o.map(u=>{d+=u.amt;const p=l>0?Math.round(u.amt*1e4/l)/100:0,y=d<=l*.7?"A":d<=l*.9?"B":"C",v=a.get(u.code)??0,f=v>0?Math.round((u.amt-v)/v*1e3)/10:null;return{code:u.code,name:u.name,volumeMl:u.vol,amount:u.amt,qty:u.qty,sharePct:p,rank:y,prevAmount:v,growthRate:f}})}function Ri(e,t,n){const i=new Date,r=i.toISOString().slice(0,10);let c=r,a=r,o="";switch(e){case"week":{const u=new Date(i);u.setDate(u.getDate()-7),c=u.toISOString().slice(0,10),a=r,o="直近7日間";break}case"month":{c=r.slice(0,7)+"-01",a=r,o="当月";break}case"90days":{const u=new Date(i);u.setDate(u.getDate()-90),c=u.toISOString().slice(0,10),a=r,o="直近90日間";break}case"year":{const u=new Date(i);u.setFullYear(u.getFullYear()-1),c=u.toISOString().slice(0,10),a=r,o="直近1年間";break}case"custom":{c=t||r,a=n||r,o=`${c} 〜 ${a}`;break}}const l=new Date(c);l.setFullYear(l.getFullYear()-1);const d=new Date(a);return d.setFullYear(d.getFullYear()-1),{start:c,end:a,prevStart:l.toISOString().slice(0,10),prevEnd:d.toISOString().slice(0,10),label:o}}function Oi(e,t="all",n=[],i="year",r,c,a=[]){const o=Ri(i,r,c),l=n.length>0?Ni(n,o.start,o.end,o.prevStart,o.prevEnd):e.map(x=>({code:x.code,name:x.name,volumeMl:x.volumeMl,amount:x.yearAmount,qty:x.yearQty,sharePct:x.sharePct,rank:x.rank,prevAmount:x.prevAmount,growthRate:x.growthRate})),d=l.filter(x=>x.rank==="A").length,u=l.filter(x=>x.rank==="B").length,p=l.filter(x=>x.rank==="C").length,y=l.filter(x=>x.growthRate!=null&&x.growthRate>10),v=l.filter(x=>x.growthRate!=null&&x.growthRate<-10);let f=l,A="全商品";switch(t){case"A":f=l.filter(x=>x.rank==="A"),A="Aランク";break;case"B":f=l.filter(x=>x.rank==="B"),A="Bランク";break;case"C":f=l.filter(x=>x.rank==="C"),A="Cランク";break;case"growing":f=y,A="成長商品(+10%以上)";break;case"declining":f=v,A="衰退商品(-10%以下)";break}const $=(x,q,I)=>`<button class="button ${t===x?"primary":"secondary"} small" data-product-filter="${x}">${q} (${I})</button>`,P=(x,q)=>`<button class="button ${i===x?"primary":"secondary"} small" data-product-period="${x}">${q}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${P("week","週次")}
        ${P("month","月次")}
        ${P("90days","90日")}
        ${P("year","年間")}
        ${P("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${r||""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${c||""}" />
        <button class="button secondary small" type="button" data-action="pp-apply-range">適用</button>
        <span style="color:var(--text-secondary);font-size:13px;margin-left:8px;">${o.label}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${d} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">Bランク（70-90%）</p>
        <p class="kpi-value">${u} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${y.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${v.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${A} (${f.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${$("all","全て",l.length)}
        ${$("A","A",d)}
        ${$("B","B",u)}
        ${$("C","C",p)}
        ${$("growing","成長",y.length)}
        ${$("declining","衰退",v.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${E("rank","ABC",a)}
              ${E("name","商品名",a)}
              ${E("amount","売上",a,"numeric")}
              ${E("sharePct","構成比",a,"numeric")}
              ${E("qty","本数",a,"numeric")}
              ${E("growthRate","前年同期比",a,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${Ce(f,a,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(x=>`
              <tr>
                <td>${ps(x.rank)}</td>
                <td>${x.name?x.name.slice(0,25):x.code}${x.volumeMl?` <small>${x.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${us(x.amount)}</td>
                <td class="numeric">${x.sharePct}%</td>
                <td class="numeric">${x.qty.toLocaleString()}</td>
                <td class="numeric">${ms(x.growthRate)}</td>
              </tr>
            `).join("")}
            ${f.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function ji(e,t=[]){const n=e.filter(c=>c.currentRank==="A").length,i=e.filter(c=>c.prevRank&&c.currentRank<c.prevRank).length,r=e.filter(c=>c.prevRank&&c.currentRank>c.prevRank).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>営業効率分析</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${n} 社</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${i} 社</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${r} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先ABC分析（年間売上構成比）</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${E("currentRank","ABC",t)}
              ${E("name","得意先名",t)}
              ${E("yearAmount","年間売上",t,"numeric")}
              ${E("sharePct","構成比",t,"numeric")}
              ${E("orderDays","受注日数",t,"numeric")}
              ${E("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${Ce(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).slice(0,50).map(c=>`
              <tr>
                <td>${ps(c.currentRank)}</td>
                <td>${c.name||c.code}</td>
                <td class="numeric">${us(c.yearAmount)}</td>
                <td class="numeric">${c.sharePct}%</td>
                <td class="numeric">${c.orderDays}日</td>
                <td class="numeric">${ms(c.growthRate)}</td>
                <td>${qi(c.currentRank,c.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Mi(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Fi(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Bi(e,t){const n=e.length?e.map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${Mi(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${i.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Fi(i.amount)}</td>
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
  `}function zi(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Vi(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function ys(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function hs(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Xt(e){const t=ys(hs(e),6);return t.setHours(23,59,59,999),t}function Kt(e){return new Date(`${e}T00:00:00`)}function Wt(e){return`${e.getMonth()+1}/${e.getDate()}`}function Ji(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Ui(){const e=new Date,t=hs(Vi(zi(e),-3)),n=Xt(new Date(e.getFullYear(),e.getMonth()+4,0)),i=[];let r=new Date(t);for(;r<=n;){const c=Xt(r);i.push({start:new Date(r),end:c,label:`${Wt(r)} - ${Wt(c)}`}),r=ys(r,7)}return i}function Yi(e){const t=Ui(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,i=t.map(c=>`
        <div class="gantt-week">
          <span>${c.label}</span>
        </div>
      `).join(""),r=e.length?e.map(c=>{const a=Kt(c.startDate),o=Kt(c.expectedDoneDate),l=Math.max(0,t.findIndex(p=>p.end>=a)),d=Math.max(l,t.reduce((p,y,v)=>y.start<=o?v:p,l)),u=[`仕込番号: ${c.jikomiNo}`,`銘柄: ${c.productName}`,`期間: ${c.startDate} - ${c.expectedDoneDate}`,`タンク: ${c.tankNo}`,`備考: ${c.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${c.jikomiNo}</strong>
                <span class="table-sub">${c.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${c.status}"
                  style="grid-column:${l+1} / ${d+2}"
                  title="${Ji(u)}"
                >
                  ${c.jikomiNo} / ${c.productName}
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
          ${i}
        </div>
        ${r}
      </div>
    </section>
  `}function Zt(e,t){const n={planned:"neutral",active:"warning",done:"success"},i=e.map(o=>`
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
          <span class="status-pill ${n[o.status]}">${Fa[o.status]}</span>
        </td>
        <td>${o.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(o=>o.status==="active").length,c=e.filter(o=>o.status==="done").length,a=e.filter(o=>o.status==="planned").length;return`
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
        <p class="kpi-value">${a} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${c} 本</p>
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
          <tbody>${i||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Hi(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},i=e.map(l=>`
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
          <span class="status-pill ${n[l.status]}">${t[l.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${l.id}">
            ${l.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),r=e.filter(l=>l.status==="approved").length,c=e.filter(l=>l.status==="submitted").length,a=e.filter(l=>l.status==="pending").length;return`
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
        <p class="kpi-value">${e.filter(l=>l.status==="approved").reduce((l,d)=>l+d.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${c} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${a} 件</p>
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
          <tbody>${i||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Qi(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Gi(e,t){return`
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
        ${e?`<p class="field-error">${Qi(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Xi(e){return`
    <div class="modal-overlay" id="edit-modal">
      <div class="modal-content panel" style="max-width:600px;">
        <h2>得意先編集: ${e.code}</h2>
        <form id="edit-customer-form" class="feature-form">
          <input type="hidden" id="ec-id" value="${e.id}" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="form-row"><label>得意先名</label><input type="text" id="ec-name" value="${e.name}" /></div>
            <div class="form-row"><label>カナ</label><input type="text" id="ec-kana" value="${e.kanaName||""}" /></div>
            <div class="form-row"><label>略称</label><input type="text" id="ec-short" value="${e.shortName||""}" /></div>
            <div class="form-row"><label>業態</label><input type="text" id="ec-business" value="${e.businessType||""}" /></div>
            <div class="form-row"><label>電話番号</label><input type="text" id="ec-phone" value="${e.phone||""}" /></div>
            <div class="form-row"><label>FAX</label><input type="text" id="ec-fax" value="${e.fax||""}" /></div>
            <div class="form-row"><label>メール</label><input type="email" id="ec-email" value="${e.email||""}" /></div>
            <div class="form-row"><label>郵便番号</label><input type="text" id="ec-postal" value="${e.postalCode||""}" /></div>
            <div class="form-row" style="grid-column:1/-1;"><label>住所1</label><input type="text" id="ec-address" value="${e.address1||""}" /></div>
            <div class="form-row" style="grid-column:1/-1;"><label>住所2</label><input type="text" id="ec-address2" value="${e.address2||""}" /></div>
            <div class="form-row"><label>締日</label><input type="number" id="ec-closing" value="${e.closingDay||""}" /></div>
            <div class="form-row"><label>支払日</label><input type="number" id="ec-payment" value="${e.paymentDay||""}" /></div>
            <div class="form-row"><label>支払サイト</label><input type="text" id="ec-pay-cycle" value="${e.paymentCycle||""}" /></div>
            <div class="form-row"><label>与信限度額</label><input type="number" id="ec-credit" value="${e.creditLimit||""}" /></div>
            <div class="form-row"><label>価格区分</label>
              <select id="ec-price-type">
                <option value="" ${e.priceType?"":"selected"}>未設定</option>
                <option value="000" ${e.priceType==="000"?"selected":""}>000: 生産者価格</option>
                <option value="001" ${e.priceType==="001"?"selected":""}>001: 小売価格</option>
                <option value="002" ${e.priceType==="002"?"selected":""}>002: 卸価格</option>
              </select>
            </div>
            <div class="form-row"><label>地区コード</label><input type="text" id="ec-area" value="${e.areaCode||""}" /></div>
            <div class="form-row"><label>担当者コード</label><input type="text" id="ec-staff" value="${e.staffCode||""}" /></div>
            <div class="form-row"><label>税区分</label><input type="text" id="ec-tax" value="${e.taxMode||""}" /></div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
            <button type="button" class="button secondary" data-action="close-modal">キャンセル</button>
            <button type="submit" class="button primary">保存</button>
          </div>
          <span id="edit-result" class="fr-result"></span>
        </form>
      </div>
    </div>
  `}function Ki(e){return`
    <div class="modal-overlay" id="edit-modal">
      <div class="modal-content panel" style="max-width:600px;">
        <h2>商品編集: ${e.code}</h2>
        <form id="edit-product-form" class="feature-form">
          <input type="hidden" id="ep-id" value="${e.id}" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="form-row" style="grid-column:1/-1;"><label>商品名</label><input type="text" id="ep-name" value="${e.name}" /></div>
            <div class="form-row"><label>カナ</label><input type="text" id="ep-kana" value="${e.kanaName||""}" /></div>
            <div class="form-row"><label>略称</label><input type="text" id="ep-short" value="${e.shortName||""}" /></div>
            <div class="form-row"><label>分類</label><input type="text" id="ep-category" value="${e.category||""}" /></div>
            <div class="form-row"><label>酒税区分</label><input type="text" id="ep-tax-cat" value="${e.taxCategoryCode||""}" /></div>
            <div class="form-row"><label>度数(%)</label><input type="number" step="0.1" id="ep-alcohol" value="${e.alcoholDegree??""}" /></div>
            <div class="form-row"><label>容量(ml)</label><input type="number" id="ep-volume" value="${e.volumeMl??""}" /></div>
            <div class="form-row"><label>容器</label><input type="text" id="ep-bottle" value="${e.bottleType||""}" /></div>
            <div class="form-row"><label>単位</label><input type="text" id="ep-unit" value="${e.unit||"本"}" /></div>
          </div>
          <fieldset style="border:1px solid var(--border);border-radius:6px;padding:12px;margin:12px 0;">
            <legend style="font-weight:700;font-size:13px;">価格設定</legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div class="form-row"><label>生産者価格(仕入)</label><input type="number" id="ep-purchase" value="${e.purchasePrice||""}" /></div>
              <div class="form-row"><label>卸価格(デフォルト売価)</label><input type="number" id="ep-sale" value="${e.salePrice||""}" /></div>
              <div class="form-row"><label>定価(小売価格)</label><input type="number" id="ep-list" value="${e.listPrice||""}" /></div>
              <div class="form-row"><label>原価</label><input type="number" id="ep-cost" value="${e.costPrice||""}" /></div>
            </div>
          </fieldset>
          <fieldset style="border:1px solid var(--border);border-radius:6px;padding:12px;margin:12px 0;">
            <legend style="font-weight:700;font-size:13px;">醸造情報</legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div class="form-row"><label>精米歩合(%)</label><input type="number" step="0.1" id="ep-polish" value="${e.polishRate??""}" /></div>
              <div class="form-row"><label>原料米</label><input type="text" id="ep-rice" value="${e.riceType||""}" /></div>
              <div class="form-row"><label>季節</label><input type="text" id="ep-season" value="${e.season||""}" /></div>
              <div class="form-row"><label>熟成年数</label><input type="number" id="ep-aging" value="${e.agingYears||""}" /></div>
            </div>
          </fieldset>
          <div style="display:flex;gap:8px;justify-content:flex-end;">
            <button type="button" class="button secondary" data-action="close-modal">キャンセル</button>
            <button type="submit" class="button primary">保存</button>
          </div>
          <span id="edit-result" class="fr-result"></span>
        </form>
      </div>
    </div>
  `}const Rt={query:"",businessType:"",areaCode:"",activeOnly:"",page:1},Pe=50;function Wi(e,t){let n=e;if(t.query){const o=t.query.toLowerCase();n=n.filter(l=>l.code.toLowerCase().includes(o)||l.name.toLowerCase().includes(o)||l.kanaName&&l.kanaName.toLowerCase().includes(o)||l.address1&&l.address1.toLowerCase().includes(o)||l.phone&&l.phone.toLowerCase().includes(o))}t.businessType&&(n=n.filter(o=>o.businessType===t.businessType)),t.areaCode&&(n=n.filter(o=>o.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(o=>o.isActive):t.activeOnly==="inactive"&&(n=n.filter(o=>!o.isActive));const i=Math.max(1,Math.ceil(n.length/Pe)),c=(Math.min(t.page,i)-1)*Pe,a=n.slice(c,c+Pe);return{filtered:n,paged:a,totalPages:i}}function ea(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const i=(t-1)*Pe+1,r=Math.min(t*Pe,e),c=[];for(let a=1;a<=n;a++)a===1||a===n||a>=t-2&&a<=t+2?c.push(`<button class="button ${a===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${a}" style="min-width:36px;padding:4px 8px;">${a}</button>`):(a===t-3||a===t+3)&&c.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${i}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${c.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Zi(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),i=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${i.map(r=>`<option value="${r}" ${t.areaCode===r?"selected":""}>${r}</option>`).join("")}
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
  `}function bt(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function eo(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}function to(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${eo(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${bt(t.address1||"",16)}</td>
          <td>${bt(t.address2||"",12)}</td>
          <td>${t.staffCode||""}</td>
          <td>${t.areaCode||""}</td>
          <td class="numeric">${t.closingDay?t.closingDay+"日":""}</td>
          <td class="numeric">${t.paymentDay?t.paymentDay+"日":""}</td>
          <td>${t.billingCycleType||""}</td>
          <td>${t.billingCode||""}</td>
          <td>${t.customerGroup1||""}</td>
          <td>${t.customerGroup2||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-customer="${t.id}">編集</button></td>
        </tr>
      `).join("")}function je(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function ao(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${bt(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${je(t.purchasePrice)}</td>
          <td class="numeric">${je(t.salePrice)}</td>
          <td class="numeric">${je(t.listPrice)}</td>
          <td class="numeric">${je(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function so(e,t,n=Rt,i=[]){const{filtered:r,paged:c,totalPages:a}=Wi(e.customers,n);return`
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
        ${Zi(e.customers,n)}
        ${ea(r.length,n.page,a)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${E("code","コード",i)}
                ${E("name","得意先名",i)}
                ${E("kanaName","カナ",i)}
                <th>略称</th>
                ${E("businessType","業態",i)}
                <th>販売区分</th>
                <th>価格区分</th>
                <th>単価G</th>
                <th>電話</th>
                <th>FAX</th>
                <th>〒</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>担当</th>
                ${E("areaName","地区",i)}
                ${E("closingDay","締日",i,"numeric")}
                ${E("paymentDay","支払日",i,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${to(Ce(c,i,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${ea(r.length,n.page,a)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${E("code","コード",i)}
                ${E("name","商品名",i)}
                <th>カナ</th>
                ${E("category","分類",i)}
                <th>酒税区分</th>
                ${E("alcoholDegree","度数",i,"numeric")}
                ${E("volumeMl","容量ml",i,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${E("purchasePrice","生産者価格",i,"numeric")}
                ${E("salePrice","卸価格",i,"numeric")}
                ${E("listPrice","定価(小売)",i,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${ao(Ce(e.products,i,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function it(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function no(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${ts.map(i=>`<option ${n?.materialType===i?"selected":""}>${i}</option>`).join("")}
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
  `}function io(e){const t=e.map(r=>{const a=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${a?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${a?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${it(r.unitCost)}</td>
          <td class="numeric">${it(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,i=e.reduce((r,c)=>r+c.currentStock*c.unitCost,0);return`
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
        <p class="kpi-value">${it(i)}</p>
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
  `}function oo(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function ot(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const lo={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function ro(e){return`
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
          <td class="numeric">${ot(n.billedAmount)}</td>
          <td class="numeric">${ot(n.paymentAmount)}</td>
          <td class="numeric">${ot(n.balanceAmount)}</td>
          <td>${oo(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${lo[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function he(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ta(e){return e.trim().toLowerCase()}function co(e,t){const n=ta(t),i=e.filter(c=>n?[c.code,c.name,c.janCode].map(ta).some(a=>a.includes(n)):!0),r=i.length?`
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
              ${i.map(c=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${he(c.code)}"
                      data-name="${he(c.name)}"
                    >
                      <td class="mono">${he(c.code)}</td>
                      <td>${he(c.name)}</td>
                      <td class="mono">${he(c.janCode)}</td>
                      <td>${he(c.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return rs({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function le(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function uo(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},i={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},c={unpaid:"warning",partial:"neutral",paid:"success"},a=e.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${le(p.unitPrice)}</td>
        <td class="numeric"><strong>${le(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${i[p.status]}">${n[p.status]}</span>
        </td>
      </tr>
    `).join(""),o=t.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${le(p.totalPurchase)}</td>
        <td class="numeric">${le(p.paidAmount)}</td>
        <td class="numeric"><strong>${le(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${c[p.status]}">${r[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),l=e.reduce((p,y)=>p+y.amount,0),d=t.reduce((p,y)=>p+y.balance,0),u=t.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${le(l)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${le(d)}</p>
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
          <tbody>${a||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
  `}function we(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function po(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},i={holding:"neutral",due:"warning",cleared:"success"},r=e.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${we(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${i[u.status]}">${n[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${u.id}" ${u.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),c=t.map(u=>{const p=u.minimumStock>0&&u.currentStock<u.minimumStock*1.2;return`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${u.currentStock.toLocaleString("ja-JP")} ${u.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${u.minimumStock.toLocaleString("ja-JP")} ${u.unit}</td>
          <td class="numeric">${we(u.unitCost)}</td>
          <td class="numeric">${we(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),a=e.filter(u=>u.status==="holding"),o=a.reduce((u,p)=>u+p.amount,0),l=t.reduce((u,p)=>u+p.currentStock*p.unitCost,0),d=t.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${we(o)}</p>
        <p class="kpi-sub">${a.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${we(l)}</p>
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
          <tbody>${c||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function gt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function V(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $t(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${V(e)}</pre>
    </div>
  `}function mo(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Me(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${V(e)}</code>
      ${mo(e)}
    </div>
  `}function ve(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${V(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${V(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${V(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?$t(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${V(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${V(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function Fe(e){return`
    <div class="setup-step setup-step-compact" data-step="${V(e.stepLabel)}">
      <h3>${V(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${V(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Be(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function aa(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function yo(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?gt(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Be(e.lastOverallSync)}">${aa(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Be(e.lastOverallSync)==="success"?"1時間以内":Be(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${V(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?gt(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Be(t.lastSyncAt)}">${aa(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function ho(e,t,n,i){const r={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${i?yo(i):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${gt(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${r[e.status]}</span>
        </p>
        <p class="kpi-sub">${V(e.message)}</p>
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
      ${Fe({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Me("git --version")}
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
      ${Fe({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Me("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${Fe({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Me("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Me("python get-pip.py")}
        `})}
      ${Fe({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${ve({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${ve({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${ve({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${ve({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${ve({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${ve({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${$t(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${$t(`{
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
            <span class="config-value">${V(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${V(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${V(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${V(n)}"
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
  `}function xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function vo(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function fo(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(p=>p.amount),1),i=28,r=6,c=140,a=100,o=760,l=o-c-a,d=t.length*(i+r)+16,u=t.map((p,y)=>{const v=p.amount/n*l,f=y*(i+r)+8,A=p.abcRank==="A"?"#2F855A":p.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${c-8}" y="${f+i/2+5}" class="chart-axis" text-anchor="end">${p.name.length>10?p.name.slice(0,10)+"…":p.name}</text>
          <rect x="${c}" y="${f}" width="${v}" height="${i}" rx="4" fill="${A}" opacity="0.85" />
          <text x="${c+v+8}" y="${f+i/2+5}" class="chart-axis">${(p.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${o} ${d}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${u}
    </svg>
  `}function bo(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(i=>`<th class="numeric">${i}</th>`).join(""),n=e.monthlyByCustomer.map(i=>{const r=i.values.reduce((a,o)=>a+o,0),c=i.values.map(a=>`<td class="numeric">${a>0?(a/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${i.label}</td>
          ${c}
          <td class="numeric"><strong>${xe(r)}</strong></td>
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
  `}function go(e){e.ranking.reduce((l,d)=>l+d.amount,0);const t=e.ranking.filter(l=>l.abcRank==="A").length,n=e.ranking.filter(l=>l.abcRank==="B").length,i=e.ranking.filter(l=>l.abcRank==="C").length,r=e.ranking.filter(l=>l.abcRank==="A").reduce((l,d)=>l+d.amount,0),c=e.ranking.filter(l=>l.abcRank==="B").reduce((l,d)=>l+d.amount,0),a=e.ranking.filter(l=>l.abcRank==="C").reduce((l,d)=>l+d.amount,0),o=e.ranking.map(l=>`
        <tr>
          <td class="mono">${l.code}</td>
          <td>${l.name}</td>
          <td class="numeric">${xe(l.amount)}</td>
          <td class="numeric">${l.ratio.toFixed(1)}%</td>
          <td class="numeric">${l.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${l.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${vo(l.abcRank)}">${l.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${xe(r)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${xe(c)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${i}社 <span class="kpi-sub">${xe(a)}</span></div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先別売上ランキング</h2>
          <p class="panel-caption">売上金額上位15社</p>
        </div>
      </div>
      <div class="chart-scroll">
        ${fo(e.ranking)}
      </div>
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
      ${bo(e)}
    </section>
  `}function at(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function $o(e){return e.replace("-","/")}const _o={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function wo(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=760,n=280,i={top:16,right:24,bottom:36,left:64},r=t-i.left-i.right,c=n-i.top-i.bottom,a=Math.max(...e.map(u=>u.amount),1),o=r/e.length,l=[0,.25,.5,.75,1].map(u=>{const p=i.top+c-c*u,y=`${Math.round(a*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${i.left}" y1="${p}" x2="${t-i.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${y}</text>
        </g>
      `}).join(""),d=e.map((u,p)=>{const y=u.amount/a*c,v=Math.max(o-18,24),f=i.left+p*o+(o-v)/2,A=i.top+c-y;return`
        <g>
          <rect x="${f}" y="${A}" width="${v}" height="${y}" rx="6" class="analytics-bar" />
          <text x="${f+v/2}" y="${n-10}" class="chart-axis centered-axis">${$o(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${t} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${l}
      ${d}
    </svg>
  `}function ko(e){return e.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${at(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function So(e){return e.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="mono">${t.period}</td>
          <td class="numeric">${at(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function sa(e,t,n){const i=t?e.filter(c=>c.tag.includes(t)||c.name.includes(t)):e,r=i.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':i.map(c=>`
        <tr>
          <td class="mono">${c.code||"―"}</td>
          <td>${c.name||"未設定"}</td>
          <td class="mono">${c.tag||"―"}</td>
          <td class="numeric">${at(c.amount)}</td>
          <td class="numeric">${c.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("");return`
    <div class="table-wrap" style="margin-top:8px;">
      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>${n}</th>
            <th>タグ</th>
            <th class="numeric">売上額</th>
            <th class="numeric">伝票数</th>
          </tr>
        </thead>
        <tbody>${r}</tbody>
      </table>
    </div>
  `}function xo(e,t,n="all",i="",r=[],c=[],a="",o="",l=null){const d=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",u=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,p=n!=="all"&&r.length>0&&t!=="staff",y=["all","yearly","monthly","weekly","daily"].map($=>`<button class="button ${$===n?"primary":"secondary"} small" type="button" data-analytics-period="${$}">${_o[$]}</button>`).join(""),v=n!=="all"&&c.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${c.map($=>`<option value="${$}" ${$===i?"selected":""}>${$}</option>`).join("")}
      </select>`:"";let f="",A="";if(t==="staff"){const $=e.staffTotals.filter(P=>!a||P.name.includes(a)||P.code.includes(a));f=`
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${a}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>担当コード</th>
              <th>担当名</th>
              <th class="numeric">売上額</th>
              <th class="numeric">数量</th>
              <th class="numeric">伝票数</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${$.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':$.map(P=>`
                <tr>
                  <td class="mono">${P.code||"―"}</td>
                  <td>${P.name||"未設定"}</td>
                  <td class="numeric">${at(P.amount)}</td>
                  <td class="numeric">${P.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${P.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${P.code}" data-staff-name="${P.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,l&&(A=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${l.name} の得意先・商品内訳</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${o}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>
          <h3 style="margin:12px 0 4px;font-size:14px;color:var(--text-secondary);">得意先別</h3>
          ${sa(l.customerRows,o,"得意先名")}
          <h3 style="margin:16px 0 4px;font-size:14px;color:var(--text-secondary);">商品別</h3>
          ${sa(l.productRows,o,"商品名")}
        </article>
      `)}return`
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
        <div class="chart-scroll">
          ${wo(e.monthlySales)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${d}</h2>
            <p class="panel-caption">売上金額順に表示</p>
          </div>
          <div class="tab-group">
            <button class="tab-button ${t==="products"?"active":""}" data-analytics-tab="products">商品別</button>
            <button class="tab-button ${t==="customers"?"active":""}" data-analytics-tab="customers">得意先別</button>
            <button class="tab-button ${t==="staff"?"active":""}" data-analytics-tab="staff">担当別</button>
          </div>
        </div>

        ${t!=="staff"?`
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
            <div class="button-group">${y}</div>
            ${v}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>コード</th>
                  <th>名称</th>
                  ${p?"<th>期間</th>":""}
                  <th class="numeric">売上額</th>
                  <th class="numeric">数量</th>
                  <th class="numeric">伝票数</th>
                </tr>
              </thead>
              <tbody>${p?So(r):ko(u)}</tbody>
            </table>
          </div>
        `:f}
      </article>
    </section>
    ${A}
  `}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ao(e){const t=Math.max(...e.salesByProduct.flatMap(c=>c.values),1),n=e.salesByProduct.map(c=>{const a=c.values.map((o,l)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(o/t*120)}px" title="${e.months[l]}: ${ke(o)}"></div>
            <span class="bar-label">${e.months[l].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${c.label}</p>
          <div class="bar-chart">${a}</div>
        </div>
      `}).join(""),i=e.costSimulation.map(c=>`
      <tr>
        <td class="mono">${c.productCode}</td>
        <td>${c.productName}</td>
        <td class="numeric">${ke(c.costPrice)}</td>
        <td class="numeric">${ke(c.sellPrice)}</td>
        <td class="numeric">${ke(c.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${c.marginRate>=40?"success":"warning"}">${c.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(c=>{const a=c.values.reduce((o,l)=>o+l,0);return`
        <tr>
          <td>${c.label}</td>
          ${c.values.map(o=>`<td class="numeric">${(o/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${ke(a)}</strong></td>
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
              ${e.months.map(c=>`<th class="numeric">${c}</th>`).join("")}
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
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>
  `}function Po(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Eo(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function na(e){return e.toISOString().slice(0,10)}function Co(e,t,n){const i=e.length?e.map(r=>`
            <tr>
              <td class="mono">${r.documentNo}</td>
              <td>${Po(r.date)}</td>
              <td>
                <div class="table-title">${r.customerName}</div>
                <div class="table-sub mono">${r.customerCode}</div>
              </td>
              <td class="numeric">${Eo(r.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||na(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||na(new Date)}" />
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
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>
  `}function ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Lo(e,t,n,i){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},c={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},a={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},o=e.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${ze(p.unitPrice)}</td>
        <td class="numeric"><strong>${ze(p.amount)}</strong></td>
        <td>${r[p.paymentMethod]}</td>
      </tr>
    `).join(""),l=t.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(y=>`${y.productName} ×${y.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${ze(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${a[p.status]}">${c[p.status]}</span>
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
        <p class="kpi-value">${ze(d)}</p>
        <p class="kpi-sub">${e.length} 件 / ${i}</p>
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
            <input id="store-date" type="date" value="${i}" style="width:160px" />
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
            <tbody>${l||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}const lt={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Do={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Io(e,t,n,i){const r=Do[e],c=Object.keys(lt).map(o=>`
      <button class="tab-button ${e===o?"active":""}" data-import-entity="${o}">
        ${lt[o]}
      </button>
    `).join(""),a=t?`
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
            ${t.rows.slice(0,10).map((o,l)=>`
              <tr class="${o._valid?"":"has-error"}">
                <td>${l+1}</td>
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
      <div class="tab-group" style="flex-wrap: wrap;">${c}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${lt[e]} のCSV形式</h2>
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

    ${a}

    ${i?`<section class="panel"><p class="sync-message">${i}</p></section>`:""}
  `}const R={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function To(e,t,n){const i=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:R.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:R.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:R.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:R.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:R.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:R.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:R.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:R.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:R.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:R.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:R.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:R.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:R.date}];e.lines.slice(0,6).forEach((a,o)=>{const l=33+o*8.5;i.push({id:`line${o}_name`,label:`明細${o+1} 品名`,x:5,y:l,fontSize:7.5,value:a.productName+(a.spec?` ${a.spec}`:""),color:R.detail},{id:`line${o}_code`,label:`明細${o+1} CD`,x:64,y:l,fontSize:7.5,value:a.productCode,color:R.detail},{id:`line${o}_qty`,label:`明細${o+1} 数量`,x:124,y:l,fontSize:8,value:a.quantity>0?String(a.quantity):"",color:R.detail},{id:`line${o}_price`,label:`明細${o+1} 原単価`,x:163,y:l,fontSize:8,value:a.unitPrice>0?a.unitPrice.toLocaleString("ja-JP"):"",color:R.detail},{id:`line${o}_amount`,label:`明細${o+1} 原価金額`,x:176,y:l,fontSize:8,value:a.amount>0?a.amount.toLocaleString("ja-JP"):"",color:R.detail},{id:`line${o}_retail`,label:`明細${o+1} 売単価`,x:193,y:l,fontSize:8,value:a.retailPrice?a.retailPrice.toLocaleString("ja-JP"):"",color:R.detail})});const r=e.lines.reduce((a,o)=>a+(o.amount||0),0),c=e.lines.reduce((a,o)=>a+o.quantity,0);return i.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(c),color:R.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:R.total}),n&&i.forEach(a=>{const o=n[a.id];o&&(a.x=o.x,a.y=o.y)}),i}function qo(e,t,n,i,r){const a=To(e,t,i).map(l=>`
      <div class="fd-field ${r?"fd-draggable":""}"
           data-fd-id="${l.id}"
           style="left:${l.x}mm; top:${l.y}mm; font-size:${l.fontSize}pt; --fd-color:${l.color};"
           title="${l.label} (${l.x.toFixed(1)}, ${l.y.toFixed(1)})">
        ${r?`<span class="fd-badge">${l.label}</span>`:""}
        <span class="fd-value">${l.value}</span>
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
        色: <span style="color:${R.header}">■ヘッダ</span>
        <span style="color:${R.code}">■コード</span>
        <span style="color:${R.date}">■日付</span>
        <span style="color:${R.detail}">■明細</span>
        <span style="color:${R.total}">■合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas-scaler" id="fd-scaler">
        <div class="fd-canvas" style="${o}">
          ${a}
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
  `}function rt(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const i=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,c=parseFloat(n.style.top)||0;t[i]={x:r,y:c}}),t}function No(e,t,n,i,r){const c=Array.from(new Set([...e.map(d=>d.businessType??""),...t.map(d=>d.businessType??"")].filter(Boolean))),a=e.filter(d=>d.lat&&d.lng).length,o=t.filter(d=>d.lat&&d.lng).length,l=n.filter(d=>d.lat&&d.lng).length;return`
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
        <p class="kpi-value">${a}</p>
        <p class="kpi-sub">/ ${e.length}件 (位置取得済)</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #4CAF50;">
        <p class="panel-title">🟢 新規見込客</p>
        <p class="kpi-value">${o}</p>
        <p class="kpi-sub">/ ${t.length}件</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #FF9800;">
        <p class="panel-title">🟠 納品先</p>
        <p class="kpi-value">${l}</p>
        <p class="kpi-sub">/ ${n.length}件</p>
      </article>
    </section>

    <section class="panel filter-panel">
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;">
        <strong style="font-size:13px;">表示切替:</strong>
        <label><input type="checkbox" data-map-filter="showCustomers" ${i.showCustomers?"checked":""} /> 🔵 既存取引先</label>
        <label><input type="checkbox" data-map-filter="showProspects" ${i.showProspects?"checked":""} /> 🟢 新規見込客</label>
        <label><input type="checkbox" data-map-filter="showDelivery" ${i.showDelivery?"checked":""} /> 🟠 納品先</label>
        <span style="border-left:1px solid var(--border);padding-left:16px;"></span>
        <label>業種:
          <select data-map-filter="filterBusinessType" style="margin-left:4px;">
            <option value="">すべて</option>
            ${c.map(d=>`<option value="${d}" ${i.filterBusinessType===d?"selected":""}>${d}</option>`).join("")}
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
  `}const Ro={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},Oo=["new","picking","packed","shipped","delivered"];function jo(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(c=>t[c.stage].push(c));const n=Oo.map(c=>{const a=Ro[c],o=t[c];return`
      <div class="wf-col" data-wf-stage="${c}">
        <div class="wf-col-header" style="--wf-color:${a.color};">
          <span class="wf-col-icon">${a.icon}</span>
          <span class="wf-col-label">${a.label}</span>
          <span class="wf-col-count">${o.length}</span>
        </div>
        <div class="wf-col-body">
          ${o.length===0?'<div class="wf-empty">―</div>':o.map(l=>`
            <div class="wf-card ${l.priority==="urgent"?"wf-urgent":""}" data-wf-order="${l.id}" draggable="true">
              <div class="wf-card-header">
                <span class="wf-card-no mono">${l.orderNo}</span>
                ${l.priority==="urgent"?'<span class="wf-card-priority">🔥 急</span>':""}
              </div>
              <div class="wf-card-customer">${l.customerName}</div>
              <div class="wf-card-meta">
                <span>📅 ${l.orderDate}</span>
                ${l.deliveryDate?`<span>🚚 ${l.deliveryDate}</span>`:""}
              </div>
              <div class="wf-card-footer">
                <span>${l.itemCount}品</span>
                <strong>¥${l.totalAmount.toLocaleString("ja-JP")}</strong>
              </div>
              ${l.staffName?`<div class="wf-card-staff">👤 ${l.staffName}</div>`:""}
            </div>
          `).join("")}
        </div>
      </div>
    `}).join(""),i=e.reduce((c,a)=>c+a.totalAmount,0),r=e.filter(c=>c.priority==="urgent").length;return`
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
        <p class="kpi-value">${e.filter(c=>c.stage!=="delivered").length}件</p>
        <p class="kpi-sub">処理待ち</p>
      </article>
      <article class="panel kpi-card ${r>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${r}件</p>
        <p class="kpi-sub">当日出荷</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">¥${i.toLocaleString("ja-JP")}</p>
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
  `}function Mo(e,t,n){const i=e.cart.reduce((c,a)=>c+a.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((c,a)=>c+a.quantity,0)}<br/>
          <strong>¥${i.toLocaleString("ja-JP")}</strong>
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

      ${Fo(e,t,n)}
    </div>
  `}function Fo(e,t,n){if(e.step==="customer"){const i=e.customerQuery.toLowerCase(),r=i?t.filter(c=>c.name.toLowerCase().includes(i)||c.code.toLowerCase().includes(i)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,30).map(c=>`
            <button class="mo-item ${e.selectedCustomer?.id===c.id?"selected":""}" data-mo-select-customer="${c.id}">
              <div class="mo-item-title">${c.name}</div>
              <div class="mo-item-sub mono">${c.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const i=e.productQuery.toLowerCase(),r=i?n.filter(c=>c.name.toLowerCase().includes(i)||c.code.toLowerCase().includes(i)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,50).map(c=>{const a=e.cart.find(o=>o.productCode===c.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${c.name}</div>
                  <div class="mo-item-sub">${c.category} / JAN ${c.janCode||"―"}</div>
                </div>
                ${a?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${c.code}">−</button>
                      <span>${a.quantity}</span>
                      <button data-mo-qty="+1" data-mo-product="${c.code}">+</button>
                    </div>`:`<button class="button primary" data-mo-add-product="${c.code}">＋</button>`}
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
          ${e.cart.map((i,r)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${i.productName}</div>
                <div class="mo-item-sub">${i.quantity} × ¥${i.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${i.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${r}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((i,r)=>i+r.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const ia={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},oa={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},la={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Bo(e,t){const n=e.find(c=>c.id===t)??e[0],i=e.filter(c=>c.status==="new").length,r=e.filter(c=>c.status==="confirmed").length;return`
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
      <article class="panel kpi-card ${i>0?"kpi-alert":""}">
        <p class="panel-title">未対応</p>
        <p class="kpi-value">${i}件</p>
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
          ${e.map(c=>`
            <button class="tour-item ${n?.id===c.id?"active":""}" data-tour-id="${c.id}">
              <div class="tour-item-head">
                <strong>${c.name}</strong>
                <span class="status-pill ${oa[c.status]}">${ia[c.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${la[c.language]} · 👥 ${c.partySize}名
              </div>
              <div class="tour-item-sub">📅 希望日: ${c.visitDate}</div>
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
            <span class="status-pill ${oa[n.status]}">${ia[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${la[n.language]}</dd></div>
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
  `}const zo=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Vo=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Jo(e,t){const n=t?e.find(r=>r.id===t):null,i=t==="__new__";return`
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

    ${n||i?`
      <section class="panel">
        <div class="panel-header">
          <h2>${i?"新規送信元":"編集"}: ${n?.name??""}</h2>
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
  `}function Uo(e,t,n,i){const[r,c]=t.split("-").map(_=>parseInt(_,10)),a=new Date(r,c-1,1),o=new Date(r,c,0),l=a.getDay(),d=o.getDate(),u=[];for(let _=0;_<l;_++)u.push({isOutside:!0});for(let _=1;_<=d;_++)u.push({date:new Date(r,c-1,_)});for(;u.length%7!==0;)u.push({isOutside:!0});const p=n?e.filter(_=>_.category===n):e,y={};p.forEach(_=>{const L=_.startsAt.slice(0,10);y[L]??=[],y[L].push(_)});const v=new Date().toISOString().slice(0,10),f=u.map(_=>{if(_.isOutside)return'<div class="cal-cell cal-outside"></div>';const L=_.date,F=`${L.getFullYear()}-${String(L.getMonth()+1).padStart(2,"0")}-${String(L.getDate()).padStart(2,"0")}`,W=y[F]??[],ae=F===v,U=L.getDay();return`
        <div class="cal-cell ${ae?"cal-today":""} ${U===0?"cal-sun":U===6?"cal-sat":""}"
             data-cal-date="${F}">
          <div class="cal-day-num">${L.getDate()}</div>
          <div class="cal-events">
            ${W.slice(0,3).map(ee=>`
              <button class="cal-event" data-cal-event-id="${ee.id}"
                      style="background:${ee.color||Nt[ee.category]||"#0F5B8D"};"
                      title="${ee.title}">
                <span class="cal-event-time">${ee.isAllDay?"終日":new Date(ee.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${ee.title}</span>
              </button>
            `).join("")}
            ${W.length>3?`<button class="cal-event-more" data-cal-date="${F}">+${W.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),A=i?.isOpen?Yo(i):"",$=new Date(r,c-2,1),P=new Date(r,c,1),x=`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`,q=`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`,I=(()=>{const _=new Date;return`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${r}年 ${c}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${x}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${I}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${q}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(qt).map(([_,L])=>`<option value="${_}" ${n===_?"selected":""}>${L}</option>`).join("")}
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
        ${f}
      </div>
    </section>

    ${A}
  `}function Yo(e){const t=e.event;return`
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
                ${Object.entries(qt).map(([n,i])=>`<option value="${n}" ${t.category===n?"selected":""}>${i}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?ra(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?ra(t.endsAt):""}" />
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
  `}function ra(e){const t=new Date(e),n=i=>String(i).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const Se={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Ho(e,t){const n=t?e.find(i=>i.id===t):null;return`
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
            ${e.map(i=>`
              <tr>
                <td><strong>${i.name}</strong><br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${i.provider}</span></td>
                <td>
                  ${i.isEnabled?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}
                </td>
                <td>${i.lastSyncAt?i.lastSyncAt.slice(0,16).replace("T"," "):"未同期"}</td>
                <td style="font-size:12px;">${i.lastStatus??"―"}</td>
                <td>
                  <button class="button-sm secondary" data-action="int-edit" data-id="${i.id}">設定</button>
                  ${i.provider==="shopify"?`<button class="button-sm primary" data-action="int-sync-shopify" data-id="${i.id}">同期</button>`:""}
                  ${i.provider==="google_calendar"?`<button class="button-sm primary" data-action="int-sync-gcal" data-id="${i.id}">同期</button>`:""}
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
        <p class="form-hint">${Se[n.provider]?.description??""}</p>
        ${Se[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${Se[n.provider].setupUrl}" target="_blank">${Se[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(Se[n.provider]?.fields??[]).map(i=>`
            <label class="field" style="flex:1 1 100%;">
              <span>${i.label}</span>
              <input id="int-${i.key}" type="text" value="${n.config[i.key]??""}" placeholder="${i.placeholder}" />
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
  `}function Qo(e,t){const n=e.reduce((c,a)=>c+a.totalAmount,0),i=e.filter(c=>c.financialStatus==="paid").length,r=e.filter(c=>c.fulfillmentStatus!=="fulfilled"&&c.fulfillmentStatus!=="shipped").length;return`
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
        <p class="kpi-sub">支払済 ${i}件</p>
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
            ${e.map(c=>`
              <tr>
                <td class="mono">${c.orderNumber}</td>
                <td>${c.orderDate.slice(0,16).replace("T"," ")}</td>
                <td>${c.customerName}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${c.customerEmail}</span></td>
                <td class="numeric">¥${c.totalAmount.toLocaleString("ja-JP")}</td>
                <td>
                  <span class="status-pill ${c.financialStatus==="paid"?"success":"warning"}">${c.financialStatus}</span>
                </td>
                <td>
                  <span class="status-pill ${c.fulfillmentStatus==="fulfilled"||c.fulfillmentStatus==="shipped"?"success":"warning"}">${c.fulfillmentStatus||"未"}</span>
                </td>
                <td style="font-size:12px;">${c.lineItems.map(a=>`${a.name} ×${a.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Go(e,t,n){return`
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
            ${e.map(i=>`
              <tr>
                <td>${i.receivedAt.slice(0,16).replace("T"," ")}</td>
                <td>${i.senderName??"―"}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${i.senderPhone??""}</span></td>
                <td>
                  <span class="status-pill ${i.ocrStatus==="done"?"success":i.ocrStatus==="failed"?"warning":"neutral"}">${i.ocrStatus}</span>
                </td>
                <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--text-secondary);">${(i.ocrText??"").slice(0,80)}</td>
                <td>${i.linkedInvoiceId?`<span class="mono">${i.linkedInvoiceId}</span>`:"未連携"}</td>
                <td>
                  <button class="button-sm secondary" data-action="fax-view" data-id="${i.id}">詳細</button>
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
  `}function Xo(e,t,n){const i=t==="__new__"?null:e.find(a=>a.id===t),r=t==="__new__";return n?.role==="admin"?`
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
        <p class="kpi-sub">有効 ${e.filter(a=>a.isActive).length}名</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">管理者</p>
        <p class="kpi-value">${e.filter(a=>a.role==="admin").length}名</p>
        <p class="kpi-sub">全権アクセス</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">部署数</p>
        <p class="kpi-value">${new Set(e.map(a=>a.department)).size}</p>
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
            ${e.map(a=>`
              <tr ${a.isActive?"":'style="opacity:0.5;"'}>
                <td class="mono">${a.staffCode??"―"}</td>
                <td><strong>${a.displayName}</strong>${a.id===n?.id?'<span style="color:var(--primary);font-size:11px;"> (あなた)</span>':""}</td>
                <td class="mono" style="font-size:12px;">${a.email}</td>
                <td>${Ge[a.department]}</td>
                <td>${Qe[a.role]}</td>
                <td style="font-size:12px;">${a.lastSignInAt?a.lastSignInAt.slice(0,16).replace("T"," "):"―"}</td>
                <td>${a.isActive?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}</td>
                <td>
                  <button class="button-sm secondary" data-action="user-edit" data-id="${a.id}">編集</button>
                  ${a.id!==n?.id?`<button class="button-sm secondary" data-action="user-delete" data-id="${a.id}" style="color:var(--danger);">削除</button>`:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    ${i||r?`
      <section class="panel">
        <div class="panel-header">
          <h2>${r?"新規ユーザー":`${i?.displayName} 編集`}</h2>
        </div>
        ${r?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${i?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${i?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${i?"readonly":""} />
          </label>
          ${r?`<label class="field" style="flex:1 1 200px;">
                  <span>初期パスワード *</span>
                  <input id="user-password" type="password" placeholder="8文字以上" />
                </label>`:""}
          <label class="field" style="flex:1 1 120px;">
            <span>担当者コード</span>
            <input id="user-code" type="text" value="${i?.staffCode??""}" placeholder="S001" />
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>部署</span>
            <select id="user-dept">
              ${Object.entries(Ge).map(([a,o])=>`<option value="${a}" ${i?.department===a?"selected":""}>${o}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Qe).map(([a,o])=>`<option value="${a}" ${i?.role===a?"selected":""}>${o}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 160px;">
            <span>電話</span>
            <input id="user-phone" type="tel" value="${i?.phone??""}" placeholder="090-1234-5678" />
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="user-active" type="checkbox" ${i?.isActive!==!1?"checked":""} />
            有効
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="user-cancel">キャンセル</button>
          <button class="button primary" data-action="user-save" data-id="${i?.id??""}">保存</button>
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
    `}function Ko(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Ge[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Qe[e.role]}</dd></div>
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
          ${n.map(i=>`<option value="${i.id}" ${e.defaultMailSenderId===i.id?"selected":""}>${i.name} &lt;${i.email}&gt;</option>`).join("")}
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
              ${t.slice(0,20).map(i=>`
                <tr>
                  <td style="font-size:12px;">${i.createdAt.slice(0,16).replace("T"," ")}</td>
                  <td><strong>${i.action}</strong></td>
                  <td style="font-size:12px;">${i.entityType??""} ${i.entityId??""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`}
    </section>
  `:`
      <section class="page-head"><div><h1>プロフィール</h1></div></section>
      <section class="panel"><p>プロフィール未登録です。ログインしてください。</p></section>
    `}function Wo(e){const t={};return e.forEach(n=>{const i=n.userEmail??"(anonymous)";t[i]=(t[i]??0)+1}),`
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
  `}function Zo(e){const t=e.prospects.reduce((c,a)=>c+a.expectedAmount,0),n=e.prospects.reduce((c,a)=>c+a.expectedAmount*a.probability/100,0),i=e.prospects.filter(c=>c.stage==="won").length,r=e.prospects.filter(c=>c.stage==="hot"||c.stage==="negotiating").length;return`
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
        <p class="kpi-value">${i}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?el(e.prospects):tl(e.prospects)}

    ${al(e)}
  `}function el(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(i=>{const r=e.filter(a=>a.stage===i),c=r.reduce((a,o)=>a+o.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${i}">
          <div class="pk-col-header" style="--pk-color:${tt[i]};">
            <span class="pk-col-label">${Ie[i]}</span>
            <span class="pk-col-count">${r.length}</span>
          </div>
          <div class="pk-col-sub">¥${c.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${r.length===0?'<div class="wf-empty">―</div>':r.map(a=>`
              <div class="pk-card" data-prospect-id="${a.id}" draggable="true">
                <div class="pk-card-company">${a.companyName}</div>
                <div class="pk-card-meta">${a.businessType??""} ${a.contactName?"· "+a.contactName:""}</div>
                <div class="pk-card-amount">¥${a.expectedAmount.toLocaleString("ja-JP")} <span style="color:var(--text-secondary);">(${a.probability}%)</span></div>
                ${a.nextAction?`<div class="pk-card-action">🎯 ${a.nextAction}${a.nextActionDate?" ("+a.nextActionDate+")":""}</div>`:""}
                ${a.assignedStaffCode?`<div class="pk-card-staff">👤 ${a.assignedStaffCode}</div>`:""}
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function tl(e){return`
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
                <td><span class="status-pill" style="background:${tt[t.stage]};color:white;">${Ie[t.stage]}</span></td>
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
  `}function al(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(i=>i.id===e.editingId);return!t&&!n?"":`
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
                ${["","飲食店","酒店","百貨店","スーパー","宿泊","小売","卸","その他"].map(i=>`<option value="${i}" ${n?.businessType===i?"selected":""}>${i||"―"}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>ステージ</span>
              <select id="prospect-stage">
                ${Object.entries(Ie).map(([i,r])=>`<option value="${i}" ${n?.stage===i?"selected":""}>${r}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>流入元</span>
              <select id="prospect-source">
                ${["","展示会","紹介","WEB","コールド","問合せ","リピート"].map(i=>`<option value="${i}" ${n?.source===i?"selected":""}>${i||"―"}</option>`).join("")}
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
            ${e.activities.slice(0,10).map(i=>`
              <div>
                <dt>${i.activityDate.slice(0,10)} - ${i.activityType}</dt>
                <dd>${i.title??""} ${i.result?`→ ${i.result}`:""}</dd>
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
  `}function sl(e,t,n){const i=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
          <input id="slack-webhook" type="text" value="${i}" placeholder="https://hooks.slack.com/services/..." />
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
            ${t.map(c=>`
              <tr>
                <td>${Xe[c.eventType]||c.eventType}</td>
                <td>
                  <label style="display:flex;align-items:center;gap:6px;">
                    <input type="checkbox" data-slack-rule-id="${c.id}" data-slack-field="enabled" ${c.enabled?"checked":""} />
                    ${c.enabled?"ON":"OFF"}
                  </label>
                </td>
                <td>
                  <input type="text" data-slack-rule-id="${c.id}" data-slack-field="channel" value="${c.channel}" style="width:180px;padding:4px 8px;" />
                </td>
                <td style="font-size:12px;color:var(--text-secondary);">${c.lastTriggeredAt?c.lastTriggeredAt.slice(0,16).replace("T"," "):"未通知"}</td>
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
            ${n.map(c=>`
              <tr>
                <td style="font-size:12px;">${c.sentAt.slice(0,16).replace("T"," ")}</td>
                <td>${Xe[c.eventType]||c.eventType}</td>
                <td class="mono" style="font-size:12px;">${c.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.message}</td>
                <td><span class="status-pill ${c.status==="sent"?"success":"warning"}">${c.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function nl(e,t,n,i){const r=new Map(t.map(p=>[p.code,p])),c=e.filter(p=>p.callDirection==="inbound").length,a=e.filter(p=>p.callDirection==="outbound").length,o=e.filter(p=>p.callStatus==="missed").length,l=e.reduce((p,y)=>p+(y.durationSeconds??0),0),d=p=>{if(p===0)return"―";const y=Math.floor(p/60),v=p%60;return y>0?`${y}分${v}秒`:`${v}秒`},u=p=>{if(p.matchedCustomerCode){const y=r.get(p.matchedCustomerCode);if(y)return`${y.name} (既存)`}return"未登録番号"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">IVRy 電話連携</p>
        <h1>通話履歴</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="ivry-sync" ${i?"":"disabled"}>🔄 IVRyから同期</button>
        <button class="button secondary" data-action="ivry-push-phonebook" ${i?"":"disabled"}>📱 電話帳を送信</button>
      </div>
    </section>

    ${i?"":`
      <section class="panel">
        <p class="form-hint" style="margin:0;">
          ⚠️ IVRy連携が無効です。<a href="#" data-link="/integrations">連携設定</a>からAPIキーを設定してください。
        </p>
      </section>
    `}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">着信</p>
        <p class="kpi-value">${c}件</p>
        <p class="kpi-sub">不在 ${o}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">発信</p>
        <p class="kpi-value">${a}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">通話時間合計</p>
        <p class="kpi-value">${d(l)}</p>
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
  `}const il=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function ol(e){const t=e.activeListId?e.lists.find(c=>c.id===e.activeListId):null,n=e.items.filter(c=>c.status==="new").length,i=e.items.filter(c=>c.status==="imported").length,r=e.items.filter(c=>c.status==="excluded").length;return`
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
            ${il.map(c=>`<option value="${c}" ${e.searchBusinessType===c?"selected":""}>${c}</option>`).join("")}
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
                ${e.searchResults.map((c,a)=>`
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${a}" checked /></td>
                    <td><strong>${c.companyName}</strong></td>
                    <td style="font-size:12px;">${c.address??"―"}</td>
                    <td class="numeric">${c.rating?`⭐${c.rating}`:"―"}</td>
                    <td class="numeric">${c.reviewCount??"―"}</td>
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
        ${e.lists.map(c=>`
          <button class="button ${e.activeListId===c.id?"primary":"secondary"}"
                  data-action="lb-select-list" data-id="${c.id}">
            ${c.name} (${c.totalCount})
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
            <span>✅ 取込済: <strong>${i}</strong></span>
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
              ${e.items.map(c=>`
                <tr ${c.status==="excluded"?'style="opacity:0.4;"':""}>
                  <td>${c.status==="new"?`<input type="checkbox" class="lb-item-check" data-id="${c.id}" />`:""}</td>
                  <td><strong>${c.companyName}</strong></td>
                  <td style="font-size:12px;">${c.address??"―"}</td>
                  <td class="mono" style="font-size:12px;">${c.phone??"―"}</td>
                  <td class="numeric">${c.rating?`⭐${c.rating}(${c.reviewCount??0})`:"―"}</td>
                  <td>
                    ${c.status==="new"?'<span class="status-pill neutral">新規</span>':c.status==="imported"?'<span class="status-pill success">取込済</span>':'<span class="status-pill warning">除外</span>'}
                  </td>
                  <td>
                    ${c.status==="new"?`<button class="button-sm secondary" data-action="lb-exclude" data-id="${c.id}">除外</button>`:""}
                    ${c.status==="new"?`<button class="button-sm primary" data-action="lb-convert-one" data-id="${c.id}">→見込客</button>`:""}
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
  `}const ca={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},ll={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},rl={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function M(e){return"¥"+e.toLocaleString("ja-JP")}function Ee(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function vs(e,t){const n=e.reduce((c,a)=>c+a.amount,0),i=Math.floor(n*t),r=n+i;return{subtotal:n,taxAmount:i,total:r}}const T={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function N(e,t){const n=e.align??"left",i=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${i}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function ct(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),i=n-2018;return{y:i>0?String(i).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function cl(e,t,n){const i=ct(e.documentDate),r=ct(e.orderDate??e.documentDate),c=ct(e.deliveryDate??e.documentDate),a=e.lines.slice(0,6).map(($,P)=>{const x=T.detailStartY+P*T.detailRowH,q=T.detailCols,I=[],_=(L,F)=>{F&&I.push(N({...L,y:x,x:L.x+0},F))};return _(q.productName,$.productName+($.spec?` ${$.spec}`:"")),_(q.productCode,$.productCode),_(q.color,$.color??""),_(q.size,[$.size,$.caseQty?`×${$.caseQty}`:""].filter(Boolean).join(" ")),_(q.unit,$.unit),_(q.quantity,$.quantity>0?$.quantity.toLocaleString("ja-JP"):""),_(q.correctedQty,$.correctedQuantity?$.correctedQuantity.toLocaleString("ja-JP"):""),_(q.discount,$.discount?$.discount.toLocaleString("ja-JP"):""),_(q.unitPrice,$.unitPrice>0?$.unitPrice.toLocaleString("ja-JP"):""),_(q.costAmount,$.amount>0?$.amount.toLocaleString("ja-JP"):""),_(q.retailPrice,$.retailPrice?$.retailPrice.toLocaleString("ja-JP"):""),_(q.note,$.receivedAmount?$.receivedAmount.toLocaleString("ja-JP"):""),I.join("")}).join(""),o=e.lines.reduce(($,P)=>$+(P.amount||0),0),l=e.lines.reduce(($,P)=>$+(P.retailPrice||0)*(P.correctedQuantity??P.quantity),0),d=e.lines.reduce(($,P)=>$+(P.receivedAmount||0),0),u=e.lines.reduce(($,P)=>$+(P.returnAmount||0),0),p=e.lines.reduce(($,P)=>$+P.quantity,0),y=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",v=n.calibrationOffsetX||0,f=n.calibrationOffsetY||0,A=`transform: translate(${v}mm, ${f}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${y}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${A}">
        ${N(T.currentDateY,i.y)}
        ${N(T.currentDateM,i.m)}
        ${N(T.currentDateD,i.d)}
        ${N(T.documentNo,e.documentNo)}
        ${e.settlementPrint?N(T.settlementCheck,"✓"):""}

        ${N(T.vendorName,t.name)}
        ${N(T.vendorAddress,t.address1)}
        ${N(T.chainStoreCode,e.chainStoreCode??"")}
        ${N(T.categoryCode,e.categoryCode??"")}
        ${N(T.slipNumber,e.documentNo)}
        ${N(T.vendorCode,e.slipTypeCode??"")}

        ${N(T.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${N(T.orderDateY,r.y)}
        ${N(T.orderDateM,r.m)}
        ${N(T.orderDateD,r.d)}
        ${N(T.deliveryDateY,c.y)}
        ${N(T.deliveryDateM,c.m)}
        ${N(T.deliveryDateD,c.d)}
        ${N(T.orderNo,e.orderNo??"")}
        ${N(T.partnerCode,e.vendorCode??"")}

        ${a}

        ${N(T.totalQty,p.toLocaleString("ja-JP"))}
        ${N(T.receivedTotal,d.toLocaleString("ja-JP"))}
        ${N(T.returnTotal,u.toLocaleString("ja-JP"))}
        ${N(T.correctedCostTotal,o.toLocaleString("ja-JP"))}
        ${N(T.correctedRetailTotal,l.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function dl(e,t,n){const{subtotal:i,taxAmount:r,total:c}=vs(e.lines,e.taxRate),a=e.previousBalance??0,o=e.paymentAmount??0,l=a-o+c,d=e.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${M(p.unitPrice)}</td>
        <td class="numeric">${M(p.amount)}</td>
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
        <div><dt>請求日</dt><dd>${Ee(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${Ee(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${M(l)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${M(i)} / 消費税: ${M(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${a?`<tr><th>前回御請求額</th><td>${M(a)}</td></tr>`:""}
          ${o?`<tr><th>ご入金額</th><td>▲ ${M(o)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${M(i)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${M(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${M(l)}</td></tr>
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
  `}function ul(e,t,n){const{subtotal:i,taxAmount:r,total:c}=vs(e.lines,e.taxRate),a=e.lines.map(l=>`
      <tr>
        <td>${l.productName}${l.spec?` <span style="color:#636e72;font-size:9pt;">/ ${l.spec}</span>`:""}</td>
        <td class="numeric">${l.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${l.unit}</td>`:""}
        <td class="numeric">${M(l.unitPrice)}</td>
        <td class="numeric">${M(l.amount)}</td>
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
        <div><dt>見積日</dt><dd>${Ee(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${Ee(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${M(c)}</span>
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
        <tbody>${a}${o}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${M(i)} / 消費税: ${M(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${M(i)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${M(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${M(c)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?Ee(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function pl(e,t,n,i){let r="";switch(e){case"chain_store":r=cl(i,n,t);break;case"quotation":r=ul(i,n,t);break;case"invoice_monthly":r=dl(i,n,t);break}const c=Object.keys(ca).map(l=>`<button class="tab-button ${e===l?"active":""}" data-print-template="${l}">${ca[l]}</button>`).join(""),a=i.lines.map((l,d)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${d}" data-print-lfield="productName" value="${l.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${d}" data-print-lfield="quantity" value="${l.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${d}" data-print-lfield="unitPrice" value="${l.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${l.amount>0?l.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${d}">✕</button></td>
      </tr>`).join(""),o=[{key:"showSeal",label:"印影"},{key:"showRegistrationNo",label:"登録番号"},{key:"showBankInfo",label:"振込先"},{key:"showJanCode",label:"JAN"},{key:"showRemarks",label:"備考"}].map(l=>`<label style="font-size:12px;"><input type="checkbox" data-print-opt="${l.key}" ${t[l.key]?"checked":""} /> ${l.label}</label>`).join(" ");return`
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
      <div class="tab-group">${c}</div>
    </div>

    <div class="print-layout no-print">
      <!-- 左: 設定 -->
      <div class="print-settings">

        <div class="panel">
          <h3 class="panel-title" style="margin-bottom:12px;">書類情報</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <label class="field" style="flex:1 1 120px;">
              <span>書類番号</span>
              <input type="text" data-print-field="documentNo" value="${i.documentNo}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>日付</span>
              <input type="date" data-print-field="documentDate" value="${i.documentDate}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>得意先名</span>
              <input type="text" data-print-field="customerName" value="${i.customerName}" />
            </label>
            <label class="field" style="flex:1 1 60px;">
              <span>敬称</span>
              <select data-print-field="customerHonorific">
                <option value="御中" ${i.customerHonorific==="御中"?"selected":""}>御中</option>
                <option value="様" ${i.customerHonorific==="様"?"selected":""}>様</option>
              </select>
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>税率</span>
              <select data-print-field="taxRate">
                <option value="0.10" ${i.taxRate===.1?"selected":""}>10%</option>
                <option value="0.08" ${i.taxRate===.08?"selected":""}>8%</option>
              </select>
            </label>
            ${e==="invoice_monthly"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>お支払期限</span>
                  <input type="date" data-print-field="dueDate" value="${i.dueDate??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>前回請求額</span>
                  <input type="number" data-print-field="previousBalance" value="${i.previousBalance??0}" />
                </label>`:""}
            ${e==="chain_store"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>柱店CD</span>
                  <input type="text" data-print-field="chainStoreCode" value="${i.chainStoreCode??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>伝票区分</span>
                  <input type="text" data-print-field="slipTypeCode" value="${i.slipTypeCode??""}" />
                </label>`:""}
          </div>
        </div>

        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 class="panel-title">明細 (${i.lines.length}行)</h3>
            <button class="button secondary" data-action="print-add-line" style="padding:6px 12px;font-size:12px;">＋行追加</button>
          </div>
          <div class="table-wrap">
            <table style="min-width:auto;">
              <thead><tr><th>品名</th><th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th><th></th></tr></thead>
              <tbody>${a||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
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
  `}const ml={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},yl={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function hl(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],i="",r=!1;for(let o=0;o<e.length;o++){const l=e[o];r?l==='"'?e[o+1]==='"'?(i+='"',o++):r=!1:i+=l:l==='"'?r=!0:l===","?(n.push(i),i=""):l===`
`||l==="\r"?(l==="\r"&&e[o+1]===`
`&&o++,n.push(i),n.some(d=>d!=="")&&t.push(n),n=[],i=""):i+=l}if((i!==""||n.length>0)&&(n.push(i),n.some(o=>o!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const c=t[0].map(o=>o.trim()),a=[];for(let o=1;o<t.length;o++){const l={};c.forEach((d,u)=>{l[d]=(t[o][u]??"").trim()}),a.push(l)}return{columns:c,rows:a}}function vl(e,t,n){const i=ml[e],r=i.filter(o=>!t.includes(o)),c=n.map(o=>{const l=[];r.length>0&&l.push(`必須列欠損: ${r.join(",")}`);for(const d of i)t.includes(d)&&!o[d]&&l.push(`${d}が空`);return{...o,_valid:l.length===0,_error:l[0]}}),a=c.filter(o=>o._valid).length;return{entity:e,columns:t,rows:c,totalRows:n.length,validRows:a,invalidRows:c.length-a}}function fl(e){const n=yl[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function bl(e,t){const{supabaseInsert:n}=await g(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>O);return{supabaseInsert:o}},void 0);let i=0,r=0;const a={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const o of t){if(!o._valid)continue;const{_valid:l,_error:d,...u}=o,p={...u};if(!p.id){const y=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[y]??`${e}-${Date.now()}-${i+r}`)}for(const y of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[y]=="string"&&p[y]!==""){const v=Number(p[y]);Number.isFinite(v)&&(p[y]=v)}try{await n(a,p)!==null?i++:r++}catch{r++}}return{inserted:i,failed:r}}function dt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function gl(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function $l(e,t,n,i,r){const c=n.reduce((d,u)=>d+u.rowCount,0),a=n.map(d=>d.lastSyncAt).filter(d=>d!==null).sort().reverse()[0]??null,o=100,l=Math.max(1,Math.ceil(r/o));return`
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
        <p class="kpi-value">${c.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">全テーブル合計</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value">${a?dt(a):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${d.lastSyncAt?dt(d.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(d=>d.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((i-1)*o+1).toLocaleString("ja-JP")}-${Math.min(i*o,r).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${i<=1?"disabled":""}>← 前</button>
          <span style="padding:0 8px;">${i} / ${l}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${i>=l?"disabled":""}>次 →</button>
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
              <td>${d._synced_at?dt(d._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${d._raw_b64?d._raw_b64.slice(0,200):""}">${gl(d._raw_b64)}</td>
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
  `}function da(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _l(e,t){return Math.floor(Math.abs(t.getTime()-e.getTime())/(1e3*60*60*24))}function wl(e){return e==="dormant"?"休眠":"離反リスク"}function kl(e){return e==="dormant"?"warning":"danger"}function Sl(e,t){const n=new Date,i=new Date(n);i.setMonth(i.getMonth()-3);const r=new Date(n);r.setMonth(r.getMonth()-12);const c=new Date(n);c.setFullYear(c.getFullYear()-1);const a=new Date(c.getFullYear(),c.getMonth(),1),o=new Date(c.getFullYear(),c.getMonth()+1,0),l=new Date(n.getFullYear(),n.getMonth(),1),d=new Map(t.map(f=>[f.code,f])),u=new Map;for(const f of e){if(!f.legacy_customer_code)continue;const A=u.get(f.legacy_customer_code)||[];A.push(f),u.set(f.legacy_customer_code,A)}const p=[],y=[],v=new Set;for(const[f,A]of u.entries()){const $=d.get(f),P=$?.name||(A[0]?.customer_name??f);let x=null,q=0,I=!1,_=!1,L=!1,F=!1;for(const ae of A){const U=new Date(ae.sales_date);(!x||U>x)&&(x=U),U>=r&&(_=!0,q+=ae.total_amount),U>=i&&(I=!0),U>=a&&U<=o&&(L=!0),U>=l&&(F=!0)}if(!x)continue;const W={code:f,name:P,businessType:$?.businessType??"",areaCode:$?.areaCode??"",phone:$?.phone??"",lastOrderDate:x.toISOString().slice(0,10),daysSinceLastOrder:_l(x,n),totalAmountLast12m:q,status:"dormant"};_&&!I&&(p.push({...W,status:"dormant"}),v.add(f)),L&&!F&&!v.has(f)&&y.push({...W,status:"at-risk"})}return p.sort((f,A)=>A.daysSinceLastOrder-f.daysSinceLastOrder),y.sort((f,A)=>A.totalAmountLast12m-f.totalAmountLast12m),{dormantCustomers:p,atRiskCustomers:y}}function xl(e){const t=[...e.dormantCustomers,...e.atRiskCustomers],n=e.dormantCustomers.length,i=e.atRiskCustomers.length,r=e.dormantCustomers.reduce((u,p)=>u+p.totalAmountLast12m,0),c=t.map(u=>`
        <tr data-status="${u.status}" data-area="${u.areaCode}" data-biz="${u.businessType}">
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td>${u.businessType}</td>
          <td>${u.areaCode}</td>
          <td class="mono">${u.lastOrderDate}</td>
          <td class="numeric">${u.daysSinceLastOrder}日</td>
          <td class="numeric">${da(u.totalAmountLast12m)}</td>
          <td><span class="status-pill ${kl(u.status)}">${wl(u.status)}</span></td>
        </tr>
      `).join(""),a=[...new Set(t.map(u=>u.areaCode).filter(Boolean))].sort(),o=[...new Set(t.map(u=>u.businessType).filter(Boolean))].sort(),l=a.map(u=>`<option value="${u}">${u}</option>`).join(""),d=o.map(u=>`<option value="${u}">${u}</option>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">顧客維持</p>
        <h1>離反アラート / 休眠顧客検知</h1>
      </div>
    </section>

    <section class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">休眠顧客数</div>
        <div class="kpi-value">${n}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">離反リスク数</div>
        <div class="kpi-value">${i}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">休眠顧客の前年売上合計</div>
        <div class="kpi-value">${da(r)}</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2 class="panel-title">顧客一覧</h2>
        <div class="panel-actions" id="churn-filters">
          <select id="churn-filter-status" class="input-sm">
            <option value="">ステータス: すべて</option>
            <option value="dormant">休眠</option>
            <option value="at-risk">離反リスク</option>
          </select>
          <select id="churn-filter-area" class="input-sm">
            <option value="">エリア: すべて</option>
            ${l}
          </select>
          <select id="churn-filter-biz" class="input-sm">
            <option value="">業種: すべて</option>
            ${d}
          </select>
        </div>
      </div>
      <div class="table-wrap">
        <table id="churn-table">
          <thead>
            <tr>
              <th data-sort="code">得意先コード</th>
              <th data-sort="name">得意先名</th>
              <th data-sort="businessType">業種</th>
              <th data-sort="areaCode">エリア</th>
              <th data-sort="lastOrderDate">最終注文日</th>
              <th data-sort="daysSinceLastOrder" class="numeric">経過日数</th>
              <th data-sort="totalAmountLast12m" class="numeric">12ヶ月売上</th>
              <th data-sort="status">ステータス</th>
            </tr>
          </thead>
          <tbody id="churn-tbody">
            ${c}
          </tbody>
        </table>
      </div>
    </section>

    <script type="module">
      (function () {
        const table = document.getElementById("churn-table");
        const tbody = document.getElementById("churn-tbody");
        if (!table || !tbody) return;

        // ── Sorting ──
        let sortKey = "";
        let sortAsc = true;

        table.querySelectorAll("th[data-sort]").forEach((th) => {
          th.style.cursor = "pointer";
          th.addEventListener("click", () => {
            const key = th.getAttribute("data-sort");
            if (sortKey === key) {
              sortAsc = !sortAsc;
            } else {
              sortKey = key;
              sortAsc = true;
            }
            sortTable();
          });
        });

        function sortTable() {
          const rows = Array.from(tbody.querySelectorAll("tr"));
          const colIndex = Array.from(table.querySelectorAll("th[data-sort]"))
            .findIndex((th) => th.getAttribute("data-sort") === sortKey);
          if (colIndex < 0) return;

          rows.sort((a, b) => {
            const aText = a.children[colIndex]?.textContent?.trim() ?? "";
            const bText = b.children[colIndex]?.textContent?.trim() ?? "";
            const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ""));
            const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ""));
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return sortAsc ? aNum - bNum : bNum - aNum;
            }
            return sortAsc ? aText.localeCompare(bText, "ja") : bText.localeCompare(aText, "ja");
          });

          rows.forEach((r) => tbody.appendChild(r));
        }

        // ── Filtering ──
        const filterStatus = document.getElementById("churn-filter-status");
        const filterArea = document.getElementById("churn-filter-area");
        const filterBiz = document.getElementById("churn-filter-biz");

        function applyFilters() {
          const status = filterStatus?.value || "";
          const area = filterArea?.value || "";
          const biz = filterBiz?.value || "";

          tbody.querySelectorAll("tr").forEach((row) => {
            const matchStatus = !status || row.getAttribute("data-status") === status;
            const matchArea = !area || row.getAttribute("data-area") === area;
            const matchBiz = !biz || row.getAttribute("data-biz") === biz;
            row.style.display = matchStatus && matchArea && matchBiz ? "" : "none";
          });
        }

        filterStatus?.addEventListener("change", applyFilters);
        filterArea?.addEventListener("change", applyFilters);
        filterBiz?.addEventListener("change", applyFilters);
      })();
    <\/script>
  `}const ne=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],_t={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},se={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Al(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Pl(e){const t=e.reduce((c,a)=>c+a,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const i=Math.max(...e);return e.filter(c=>c>i*.1).length<=6?"seasonal":"year-round"}function El(e){const t=e.reduce((c,a)=>c+a,0);if(t===0)return[];const i=t/12*1.5,r=[];for(let c=0;c<12;c++)e[c]>i&&r.push(c);if(r.length===0){const c=Math.max(...e);c>0&&r.push(e.indexOf(c))}return r.sort((c,a)=>c-a)}function Cl(e){return e.length===0?0:(e[0]-2+12)%12}function ua(e){const t=new Date().getMonth(),n=e.map(r=>{const c=Pl(r.monthlyQuantity),a=El(r.monthlyQuantity),o=Cl(a);return{code:r.code,name:r.name,category:r.category,peakMonths:a,proposalStartMonth:o,seasonType:c,monthlyQuantity:r.monthlyQuantity}}),i=[];for(let r=0;r<12;r++){const c=n.filter(a=>{if(a.peakMonths.length===0)return!1;const o=a.proposalStartMonth,l=a.peakMonths[0];return o<=l?r>=o&&r<=l:r>=o||r<=l});i.push({month:r,products:c,targetCustomers:[]})}return{products:n,proposals:i,selectedMonth:t}}function Ll(e){const{products:t,proposals:n,selectedMonth:i}=e,r=new Date().getMonth(),c={"year-round":[],seasonal:[],"year-end":[]};t.forEach(p=>c[p.seasonType].push(p));const a=n[i],o=t.length,l=a?.products.length??0,d=t.filter(p=>p.peakMonths.includes(i)).length,u=a?.targetCustomers.length??0;return`
<div class="panel">
  <div class="page-head">
    <div>
      <span class="eyebrow">営業支援</span>
      <h2>季節提案カレンダー</h2>
    </div>
  </div>

  <!-- KPI Grid -->
  <div class="kpi-grid" style="margin-bottom:1.5rem">
    <div class="kpi-card">
      <div class="eyebrow">対象商品数</div>
      <div class="mono numeric" style="font-size:1.5rem">${o}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${ne[i]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${l}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${ne[i]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${d}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${u}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${ne.map((p,y)=>{const v=y===r,f=y===i;return`<button class="button" style="padding:4px 10px;background:${f?"#0F5B8D":v?"#e2e8f0":"transparent"};color:${f?"#fff":"#333"};border:${v&&!f?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${y}">${p}${v?" ●":""}</button>`}).join("")}
  </div>

  <!-- Timeline Grid -->
  <div class="table-wrap" style="margin-bottom:1.5rem">
    <h3 style="margin-bottom:0.75rem;font-size:0.95rem">提案タイムライン</h3>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:0.8rem">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #e2e8f0;min-width:120px">商品</th>
            <th style="text-align:left;padding:6px 4px;border-bottom:2px solid #e2e8f0;min-width:40px">区分</th>
            ${ne.map((p,y)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${y===r?"background:#f0f7ff;":""}">${p.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Dl(c,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${Il(c,i)}

  <!-- Target customer list for selected month -->
  ${Tl(a)}
</div>`}function Dl(e,t){const n=[],i=["year-round","seasonal","year-end"];for(const r of i){const c=e[r];if(c.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${se[r]}15;color:${se[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${_t[r]}</span>
    </td></tr>`);for(const a of c){const o=ne.map((l,d)=>{const u=a.peakMonths.includes(d),p=fs(a,d),y=d===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let v="transparent";u?v=se[a.seasonType]:p&&(v=se[a.seasonType]+"40");const f=u||p?`background:${v};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${y}"><div style="${f}" title="${u?"ピーク":p?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${a.name}"><span class="mono" style="font-size:0.7rem;color:#888">${a.code}</span> ${a.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${se[a.seasonType]}15;color:${se[a.seasonType]}">${_t[a.seasonType]}</span></td>
        ${o}
      </tr>`)}}}return n.join("")}function fs(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,i=e.peakMonths[0];return n<=i?t>=n&&t<i:t>=n||t<i}function Il(e,t){const i=["year-round","seasonal","year-end"].map(r=>{const c=e[r];if(c.length===0)return"";const a=c.filter(l=>l.peakMonths.includes(t)||fs(l,t));if(a.length===0)return"";const o=a.map(l=>{const u=l.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',p=l.monthlyQuantity.reduce((y,v)=>y+v,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${l.code}</td>
        <td style="padding:6px 8px">${l.name}</td>
        <td style="padding:6px 8px">${u}</td>
        <td class="mono numeric" style="padding:6px 8px">${l.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${p.toLocaleString()}</td>
        <td style="padding:6px 8px">${l.peakMonths.map(y=>ne[y]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${se[r]}15;color:${se[r]}">${_t[r]}</span>
        <span style="font-size:0.85rem;color:#666">${ne[t]}の対象: ${a.length}品</span>
      </h4>
      <table style="width:100%;border-collapse:collapse;font-size:0.8rem">
        <thead>
          <tr style="border-bottom:2px solid #e2e8f0">
            <th style="text-align:left;padding:6px 8px">コード</th>
            <th style="text-align:left;padding:6px 8px">商品名</th>
            <th style="text-align:left;padding:6px 8px">状態</th>
            <th style="text-align:right;padding:6px 8px">当月出荷</th>
            <th style="text-align:right;padding:6px 8px">年間合計</th>
            <th style="text-align:left;padding:6px 8px">ピーク月</th>
          </tr>
        </thead>
        <tbody>${o}</tbody>
      </table>
    </div>`}).filter(Boolean);return i.length===0?`<div style="padding:1rem;color:#666;text-align:center">${ne[t]}に提案対象の商品はありません</div>`:i.join("")}function Tl(e){return!e||e.targetCustomers.length===0?`
    <div class="table-wrap" style="margin-top:1rem">
      <h3 style="margin-bottom:0.5rem;font-size:0.95rem">提案対象リスト</h3>
      <p style="color:#888;font-size:0.85rem;padding:1rem 0;text-align:center">対象顧客データがありません。前年同月の出荷実績データを読み込んでください。</p>
    </div>`:`
  <div class="table-wrap" style="margin-top:1rem">
    <h3 style="margin-bottom:0.5rem;font-size:0.95rem">提案対象リスト</h3>
    <p style="color:#666;font-size:0.8rem;margin-bottom:0.5rem">前年同月に購入実績があり、今年未注文の顧客</p>
    <table style="width:100%;border-collapse:collapse;font-size:0.8rem">
      <thead>
        <tr style="border-bottom:2px solid #e2e8f0">
          <th style="text-align:left;padding:6px 8px">顧客コード</th>
          <th style="text-align:left;padding:6px 8px">顧客名</th>
          <th style="text-align:right;padding:6px 8px">前年実績</th>
          <th style="text-align:left;padding:6px 8px">アクション</th>
        </tr>
      </thead>
      <tbody>${e.targetCustomers.map(n=>`
    <tr style="border-bottom:1px solid #f0f0f0">
      <td class="mono" style="padding:6px 8px">${n.code}</td>
      <td style="padding:6px 8px">${n.name}</td>
      <td class="mono numeric" style="padding:6px 8px">${Al(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const ql=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),ut=["月","火","水","木","金"],pa=6;function Nl(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function Rl(e,t){if(t.length===0)return 0;const n=[...t].sort((r,c)=>r-c);return n.filter(r=>r<=e).length/n.length}function Ol(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function ma(e){const t=new Date,n=e.map(l=>l.annualRevenue),i=e.map(l=>{const d=Nl(l.lastOrderDate,t);let u=0;const p=[];d>=60&&(u+=50,p.push("離反リスク")),l.hasSeasonalProposal&&(u+=30,p.push("季節提案タイミング")),d>=30&&d<60&&(u+=20,p.push("定期巡回"));const y=Rl(l.annualRevenue,n),v=Math.round(y*20);v>0&&(u+=v,p.push("金額ウェイト"));const f=Ol(p,d);return{code:l.code,name:l.name,phone:l.phone,address:l.address1,areaCode:l.areaCode,businessType:l.businessType,priorityScore:u,reasons:p,lastOrderDate:l.lastOrderDate,daysSinceOrder:d,annualRevenue:l.annualRevenue,recommendedAction:f}}).filter(l=>l.priorityScore>0).sort((l,d)=>d.priorityScore-l.priorityScore),r=new Map;for(const l of i){const d=l.areaCode||"その他";r.has(d)||r.set(d,[]),r.get(d).push(l)}const c=[...r.entries()].sort((l,d)=>d[1].reduce((u,p)=>u+p.priorityScore,0)-l[1].reduce((u,p)=>u+p.priorityScore,0)),a=[];let o=0;for(const[l,d]of c){const u=d.sort((p,y)=>y.priorityScore-p.priorityScore);for(let p=0;p<u.length&&!(o>=ut.length);p+=pa){const y=u.slice(p,p+pa);a.push({dayLabel:ut[o],area:l,visits:y}),o++}if(o>=ut.length)break}return{candidates:i,weekPlan:a,filterArea:"",filterMinScore:0}}function jl(e){const{candidates:t,weekPlan:n,filterArea:i,filterMinScore:r}=e,c=t.filter(p=>!(i&&p.areaCode!==i||r>0&&p.priorityScore<r)),a=Array.from(new Set(t.map(p=>p.areaCode))).sort(),o=c.length,l=c.filter(p=>p.priorityScore>=50).length,d=c.filter(p=>p.reasons.includes("離反リスク")).length,u=n.reduce((p,y)=>p+y.visits.length,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業支援</p>
        <h1>訪問計画 / ルート最適化</h1>
      </div>
    </section>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">${o}</div>
        <div>訪問候補</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${l}</div>
        <div>高優先度 (50+)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${d}</div>
        <div>離反リスク</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${u}</div>
        <div>今週予定</div>
      </div>
    </div>

    <section class="panel">
      <h2 class="panel-title">フィルター</h2>
      <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;padding:0.5rem 0;">
        <label>
          エリア:
          <select data-action="visit-filter-area">
            <option value="">全エリア</option>
            ${a.map(p=>`<option value="${p}"${i===p?" selected":""}>${p}</option>`).join("")}
          </select>
        </label>
        <label>
          最低スコア:
          <input type="number" min="0" max="100" step="10" value="${r}" data-action="visit-filter-score" style="width:5rem;" />
        </label>
        <button class="button" data-action="visit-apply-filter">絞り込み</button>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">週間訪問プラン</h2>
      ${n.length===0?"<p>訪問候補がありません。</p>":Ml(n)}
    </section>

    <section class="panel">
      <h2 class="panel-title">訪問候補一覧（優先度順）</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>優先度</th>
              <th>取引先</th>
              <th>エリア</th>
              <th>理由</th>
              <th>最終受注</th>
              <th>年間売上</th>
              <th>推奨アクション</th>
            </tr>
          </thead>
          <tbody>
            ${c.map(p=>Fl(p)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ml(e){return`
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1rem;">
      ${e.map(t=>`
        <div class="kpi-card" style="text-align:left;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <strong>${t.dayLabel}曜日</strong>
            <span class="status-pill">${t.area}</span>
          </div>
          <div style="font-size:0.85rem;">
            ${t.visits.map(n=>`
              <div style="padding:0.25rem 0;border-bottom:1px solid var(--border, #eee);">
                <span class="mono">${n.priorityScore}</span>
                ${n.name}
              </div>
            `).join("")}
          </div>
          <div style="margin-top:0.5rem;font-size:0.75rem;color:var(--muted, #888);">
            ${t.visits.length}件
          </div>
        </div>
      `).join("")}
    </div>
  `}function Fl(e){return`
    <tr>
      <td>
        <span class="status-pill" style="${e.priorityScore>=50?"background:var(--danger, #fee);color:var(--danger-fg, #c00);":e.priorityScore>=30?"background:var(--warning, #fff3cd);color:var(--warning-fg, #856404);":""}">
          <span class="numeric">${e.priorityScore}</span>
        </span>
      </td>
      <td>
        <div>${e.name}</div>
        <div class="mono" style="font-size:0.75rem;">${e.code}</div>
      </td>
      <td>${e.areaCode}</td>
      <td>${e.reasons.map(n=>`<span class="status-pill">${n}</span>`).join(" ")}</td>
      <td class="mono">${e.lastOrderDate||"—"}<br/><span style="font-size:0.75rem;">(${e.daysSinceOrder===9999?"—":e.daysSinceOrder+"日前"})</span></td>
      <td class="numeric">${ql.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Bl(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},i=e.map(d=>{const u=d.capacity>0?Math.round(d.currentVolume/d.capacity*100):0;return`
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
      `}).join(""),r=e.filter(d=>d.status==="in_use").length,c=e.filter(d=>d.status==="aging").length,a=e.filter(d=>d.status==="empty").length,o=e.reduce((d,u)=>d+u.capacity,0),l=e.reduce((d,u)=>d+u.currentVolume,0);return`
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
        <p class="kpi-sub">使用率 ${o>0?Math.round(l/o*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${r} 基</p>
        <p class="kpi-sub">熟成中 ${c} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${a} 基</p>
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
          <tbody>${i||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function pt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function zl(e,t,n){const i=e.rows.map((d,u)=>`
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
        <td class="numeric"><strong>${pt(d.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),r=e.deductions.map((d,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(vt).map(p=>`<option value="${p}" ${p===d.type?"selected":""}>${vt[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${Qa.map(p=>`<option value="${p.code}" ${p.code===d.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
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
    `).join(""),c=Array.from({length:12},(d,u)=>u+1),a=e.rows.reduce((d,u)=>d+u.exportDeduction+u.sampleDeduction,0),o=e.rows.reduce((d,u)=>d+u.productionVolume,0),l=o>0?a/o*100:0;return`
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
            ${c.map(d=>`<option value="${d}" ${n===d?"selected":""}>${d}月</option>`).join("")}
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
        <p class="kpi-value">${pt(e.totalTax)}</p>
        <p class="kpi-sub">${e.targetYear}年${e.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${e.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${a.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.deductions.length} 件</p>
      </article>
      <article class="panel kpi-card ${l>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${l.toFixed(1)}%</p>
        <p class="kpi-sub">${l>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
          <tbody>${i||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${pt(e.totalTax)}</th>
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
  `}const Vl={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let re=null,Jl=0;const wt=[];function Ul(){return re&&document.body.contains(re)||(re=document.createElement("div"),re.className="toast-container",document.body.appendChild(re)),re}function k(e,t="success",n){const i=Ul(),r=++Jl,c=t==="error"?5e3:t==="warning"?4e3:3e3,a=document.createElement("div");a.className=`toast toast-${t}`,a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.innerHTML=`
    <span class="toast-icon">${Vl[t]}</span>
    <span class="toast-msg">${Hl(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const o={id:r,message:e,type:t,el:a};wt.push(o),i.appendChild(a),requestAnimationFrame(()=>{a.classList.add("toast-enter")});const l=()=>Yl(o);a.querySelector(".toast-dismiss").addEventListener("click",l),setTimeout(()=>{a.classList.add("toast-exit"),a.addEventListener("animationend",l,{once:!0})},c)}function Yl(e){const t=wt.indexOf(e);t!==-1&&(wt.splice(t,1),e.el.remove())}function Hl(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function te(e,t={}){const{title:n="確認",confirmLabel:i="OK",cancelLabel:r="キャンセル",variant:c="primary"}=t;return new Promise(a=>{const o=document.createElement("div");o.className="modal-backdrop confirm-backdrop",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${c}">
            ${c==="danger"?Ql:Gl}
          </div>
          <h3 class="confirm-title">${Ve(n)}</h3>
          <p class="confirm-message">${Ve(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Ve(r)}</button>
          <button class="button ${c} confirm-ok">${Ve(i)}</button>
        </div>
      </div>
    `;const l=u=>{o.classList.add("confirm-exit"),o.addEventListener("animationend",()=>{o.remove()},{once:!0}),a(u)};o.querySelector(".confirm-cancel").addEventListener("click",()=>l(!1)),o.querySelector(".confirm-ok").addEventListener("click",()=>l(!0)),o.addEventListener("click",u=>{u.target===o&&l(!1)});const d=u=>{u.key==="Escape"&&(document.removeEventListener("keydown",d),l(!1))};document.addEventListener("keydown",d),document.body.appendChild(o),requestAnimationFrame(()=>{o.querySelector(".confirm-ok")?.focus()})})}const Ql=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Gl=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Ve(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ya(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Xl(e,t,n){if(t.length===0&&(!n||n.length===0))return;const i=n&&n.length>0?n:Object.keys(t[0]??{}).map(d=>({key:d,label:d})),c=`\uFEFF${[i.map(d=>ya(d.label)).join(","),...t.map(d=>i.map(u=>ya(d[u.key])).join(","))].join(`\r
`)}`,a=new Blob([c],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(a),l=document.createElement("a");l.href=o,l.download=e,document.body.append(l),l.click(),l.remove(),window.setTimeout(()=>URL.revokeObjectURL(o),0)}const Kl=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner"];let fe=[];async function Wl(){const{supabaseQueryAll:e}=await g(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>O);return{supabaseQueryAll:n}},void 0);fe=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const ha=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/demand-forecast",title:"需要予測・納品カレンダー"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"}];function bs(e){const t=Et[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Ot(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Zl(){const e=bs("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const st=new Date,er=st.toISOString().slice(0,7),tr=st.getFullYear(),ar=st.getMonth()+1,sr=st.toISOString().slice(0,10),nr="C0011",ce=Zl();function gs(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return Kl.includes(n)?n:"/"}function jt(e){switch(e){case"/invoice-entry":case"/quote":case"/delivery":case"/billing":case"/invoice":case"/ledger":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":case"/demand-forecast":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const va=gs(location.pathname),s={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:Ot(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:er,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:tr,taxMonth:ar,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],callLogs:[],mapFilters:{showCustomers:!0,showProspects:!0,showDelivery:!0,filterRegion:"",filterBusinessType:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...ll,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...rl},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:sr,route:va,currentCategory:jt(va),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:nr,salesPeriod:"month",customRange:{start:"",end:""},quoteState:(()=>{const e={...cs};try{const t=localStorage.getItem("quote-seal");t&&(e.sealSettings=JSON.parse(t))}catch{}return e})(),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],customerEfficiency:[],masterTab:"customers",masterFilter:{...Rt},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffDrilldown:null,emailAudienceMode:ce.mode,emailRegion:ce.region,emailHistorySegment:ce.historySegment,emailTemplateId:ce.templateId,emailSubject:ce.subject,emailBody:ce.body,emailSaveMessage:ce.saveMessage,emailSending:!1,demandForecast:{...ci},churnAlert:null,seasonalCalendar:null,visitPlanner:null,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function fa(e){return e.slice(0,10)}function ir(e){return{...e}}function Ke(){s.pickerMode=null,s.pickerQuery="",s.pickerTargetLine=null}function $s(){s.invoiceForm=Ot(),s.invoiceSavedDocNo=null,s.invoicePriceGroup="",s.invoiceErrors={},Ke()}function _s(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,i)=>{n.productCode.trim()||(t[`lines.${i}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${i}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${i}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${i}.unitPrice`]="単価は0円以上で入力してください。")}),t}function or(e){const t=s.invoiceForm.lines[e];t&&s.invoiceForm.lines.splice(e+1,0,ir(t))}function lr(){const e=s.invoiceRecords[0],t=s.masterStats?.customers[0],n=s.masterStats?.products.slice(0,2)??[];s.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:s.invoiceForm.staffCode||"S001",lines:n.map((i,r)=>{const c=r===0?1:2,a=1200*(r+1);return{productCode:i.code,productName:i.name,quantity:c,unitPrice:a,unit:"本",amount:c*a}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},s.invoiceSavedDocNo=null,s.invoiceErrors={}}function rr(e){const t=s.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function cr(e){const t=s.masterStats?.customers.find(n=>n.name===e.trim());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function ws(e){if(Z(e),s.invoiceErrors=_s(s.invoiceForm),Object.keys(s.invoiceErrors).length>0){h();return}s.invoiceSaving=!0,h(),La(s.invoiceForm).then(t=>{s.invoiceSavedDocNo=t.documentNo,s.invoiceSaving=!1,s.invoiceErrors={},s.invoiceForm=Ot(),h()}).catch(()=>{s.invoiceSaving=!1,h()})}function ks(e){const t=s.salesFilter.startDate?new Date(s.salesFilter.startDate):null,n=s.salesFilter.endDate?new Date(`${s.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((i,r)=>new Date(r.date).getTime()-new Date(i.date).getTime()).filter(i=>{const r=new Date(i.date);return!(t&&r<t||n&&r>n)})}function Ss(){switch(s.emailAudienceMode){case"area":return s.emailRegion==="all"?fe:fe.filter(e=>e.area===s.emailRegion);case"history":return fe.filter(e=>e.historySegment===s.emailHistorySegment);default:return fe}}function dr(){const e=Ss();return{audienceMode:s.emailAudienceMode,region:s.emailRegion,historySegment:s.emailHistorySegment,selectedTemplateId:s.emailTemplateId,subject:s.emailSubject,body:s.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:s.emailSaveMessage,sending:s.emailSending,senderId:s.emailSenderId,senders:s.mailSenders}}function mt(e){const t=Ss(),n=s.emailAudienceMode==="area"?s.emailRegion:s.emailAudienceMode==="history"?s.emailHistorySegment:"all";return{subject:s.emailSubject.trim(),body:s.emailBody.trim(),templateId:s.emailTemplateId,audienceMode:s.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(i=>i.email),status:e}}function Mt(){return s.user,!1}function Le(){s.globalSearchOpen=!1,s.globalQuery=""}function ur(){const e=s.globalQuery.trim().toLowerCase();return e?{customers:s.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:s.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:s.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:ha.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:ha}}function pr(){let e=[],t,n="export.csv";switch(s.route){case"/sales":e=(s.salesSummary?ks(s.salesSummary):[]).map(i=>({documentNo:i.documentNo,date:i.date,customerCode:i.customerCode,customerName:i.customerName,amount:i.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...s.paymentStatus?.records??[]].sort((i,r)=>r.balanceAmount-i.balanceAmount).map(i=>({...i})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=s.invoiceRecords.map(i=>({...i})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=s.purchaseList.map(i=>({...i})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=s.jikomiList.map(i=>({...i})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=s.tankList.map(i=>({...i})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=s.kenteiList.map(i=>({...i})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=s.materialList.map(i=>({...i})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":s.masterTab==="customers"?(e=s.masterStats?.customers.map(i=>({...i}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=s.masterStats?.products.map(i=>({...i}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Xl(n,e,t)}function ba(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),s.route=e,s.currentCategory=jt(e),s.sidebarOpen=!1,Le(),Ft(e)}async function Ft(e){s.actionLoading=!0,h();try{switch(e){case"/delivery":s.deliveryNote||(s.deliveryNote=await Lt(s.deliverySearchDocNo||"D240122"));break;case"/billing":s.billingSummary||(s.billingSummary=await Dt(s.billingYearMonth));break;case"/report":s.salesReport||(s.salesReport=await et());break;case"/product-power":s.productPower.length===0&&(s.productPower=await Oa());break;case"/customer-efficiency":s.customerEfficiency.length===0&&(s.customerEfficiency=await ja());break;case"/customer-analysis":s.customerAnalysis||(s.customerAnalysis=await Ma());break;case"/demand-forecast":if(s.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await g(async()=>{const{fetchDemandForecasts:c,fetchDeliverySchedule:a}=await Promise.resolve().then(()=>w);return{fetchDemandForecasts:c,fetchDeliverySchedule:a}},void 0),[i,r]=await Promise.all([t(),n()]);s.demandForecast.forecasts=i.map(c=>({code:c.productCode,name:c.productName,segment:c.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(c.avgMonthly),adjustedAvg:Math.round(c.avgMonthly),nextMonthForecast:Math.round(c.forecastQuantity),annualForecast:Math.round(c.avgMonthly*12),safetyStock:Math.round(c.safetyStock)})),s.demandForecast.deliveries=di(r)}break;case"/churn-alert":if(!s.churnAlert){const{fetchChurnAlerts:t}=await g(async()=>{const{fetchChurnAlerts:i}=await Promise.resolve().then(()=>w);return{fetchChurnAlerts:i}},void 0),n=await t();if(n.length>0){const i=n.filter(c=>c.is_dormant).map(c=>({code:c.customer_code,name:c.customer_name,businessType:c.business_type,areaCode:c.area_code,phone:c.phone,lastOrderDate:c.last_order_date,daysSinceLastOrder:c.days_since_order,totalAmountLast12m:c.amount_12m,status:"dormant"})),r=n.filter(c=>c.is_at_risk).map(c=>({code:c.customer_code,name:c.customer_name,businessType:c.business_type,areaCode:c.area_code,phone:c.phone,lastOrderDate:c.last_order_date,daysSinceLastOrder:c.days_since_order,totalAmountLast12m:c.amount_12m,status:"at-risk"}));s.churnAlert={dormantCustomers:i,atRiskCustomers:r}}else{const{supabaseQueryAll:i}=await g(async()=>{const{supabaseQueryAll:a}=await Promise.resolve().then(()=>O);return{supabaseQueryAll:a}},void 0),[r,c]=await Promise.all([i("sales_document_headers",{select:"sales_date,legacy_customer_code,customer_name,total_amount"}),s.masterStats?Promise.resolve(s.masterStats.customers):Ye().then(a=>a.customers)]);s.churnAlert=Sl(r.map(a=>({sales_date:a.sales_date||"",legacy_customer_code:a.legacy_customer_code||"",customer_name:a.customer_name||"",total_amount:Number(a.total_amount)||0})),(s.masterStats?.customers??c).map(a=>({code:a.code,name:a.name,businessType:a.businessType,areaCode:a.areaCode,phone:a.phone})))}}break;case"/seasonal-calendar":if(!s.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await g(async()=>{const{fetchProductShipmentsFromTable:i}=await Promise.resolve().then(()=>w);return{fetchProductShipmentsFromTable:i}},void 0),n=await t();if(n.length>0)s.seasonalCalendar=ua(n.map(i=>({code:i.code,name:i.name,category:"",monthlyQuantity:i.monthlyQuantity})));else{const{fetchProductMonthlyShipments:i}=await g(async()=>{const{fetchProductMonthlyShipments:c}=await Promise.resolve().then(()=>w);return{fetchProductMonthlyShipments:c}},void 0),r=await i();s.seasonalCalendar=ua(r.map(c=>({code:c.code,name:c.name,category:"",monthlyQuantity:c.monthlyQuantity})))}}break;case"/visit-planner":if(!s.visitPlanner){const{fetchVisitPriorities:t}=await g(async()=>{const{fetchVisitPriorities:i}=await Promise.resolve().then(()=>w);return{fetchVisitPriorities:i}},void 0),n=await t();if(n.length>0)s.visitPlanner={candidates:n.map(i=>({code:i.customer_code,name:i.customer_name,phone:i.phone,address:i.address,areaCode:i.area_code,businessType:i.business_type,priorityScore:i.priority_score,reasons:i.reasons,lastOrderDate:i.last_order_date,daysSinceOrder:i.days_since_order,annualRevenue:i.annual_revenue,recommendedAction:i.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},s.visitPlanner=ma(n.map(i=>({code:i.customer_code,name:i.customer_name,phone:i.phone,address1:i.address,areaCode:i.area_code,businessType:i.business_type,annualRevenue:i.annual_revenue,lastOrderDate:i.last_order_date,hasSeasonalProposal:i.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:i}=await g(async()=>{const{supabaseQueryAll:l}=await Promise.resolve().then(()=>O);return{supabaseQueryAll:l}},void 0),[r,c]=await Promise.all([i("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),s.masterStats?Promise.resolve(s.masterStats.customers):Ye().then(l=>l.customers)]),a=s.masterStats?.customers??c,o=new Map;r.forEach(l=>{const d=l.legacy_customer_code||"",u=l.sales_date||"",p=Number(l.total_amount)||0,y=o.get(d);!y||u>y.lastDate?o.set(d,{lastDate:u,total:(y?.total??0)+p}):y.total+=p}),s.visitPlanner=ma(a.filter(l=>l.isActive).map(l=>({code:l.code,name:l.name,phone:l.phone,address1:l.address1,areaCode:l.areaCode,businessType:l.businessType,annualRevenue:o.get(l.code)?.total??0,lastOrderDate:o.get(l.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/jikomi":s.jikomiList.length===0&&(s.jikomiList=await Ba());break;case"/tanks":s.tankList.length===0&&(s.tankList=await za());break;case"/kentei":s.kenteiList.length===0&&(s.kenteiList=await Va());break;case"/materials":s.materialList.length===0&&(s.materialList=await ht());break;case"/purchase":(s.purchaseList.length===0||s.payableList.length===0)&&([s.purchaseList,s.payableList]=await Promise.all([Ja(),Ua()]));break;case"/raw-material":(s.billList.length===0||s.rawStockList.length===0)&&([s.billList,s.rawStockList]=await Promise.all([Ya(),Ha()]));break;case"/tax":s.taxDeclaration||(s.taxDeclaration=await It(s.taxYear,s.taxMonth));break;case"/store":(s.storeSales.length===0||s.storeOrders.length===0)&&([s.storeSales,s.storeOrders]=await Promise.all([Tt(s.storeSalesDate),Xa()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await g(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>w);return{fetchMailSenders:n}},void 0);if(s.mailSenders=await t(),!s.emailSenderId||!s.mailSenders.find(n=>n.id===s.emailSenderId)){const n=s.mailSenders.find(i=>i.isDefault)??s.mailSenders[0];n&&(s.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await g(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>w);return{fetchCalendarEvents:n}},void 0);s.calendarEvents=await t(s.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await g(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>w);return{fetchIntegrationSettings:n}},void 0);s.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await g(async()=>{const{fetchShopifyOrders:i,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>w);return{fetchShopifyOrders:i,fetchIntegrationSettings:r}},void 0);s.shopifyOrders=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await g(async()=>{const{fetchFaxInbox:i,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>w);return{fetchFaxInbox:i,fetchIntegrationSettings:r}},void 0);s.faxRecords=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/users":{const{fetchUserProfiles:t}=await g(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>w);return{fetchUserProfiles:n}},void 0);s.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:i}=await g(async()=>{const{fetchMyProfile:c,fetchAuditLogs:a,fetchMailSenders:o}=await Promise.resolve().then(()=>w);return{fetchMyProfile:c,fetchAuditLogs:a,fetchMailSenders:o}},void 0),r=s.user?.email??s.myProfile?.email??"";r&&(s.myProfile=await t(r)),s.mailSenders.length===0&&(s.mailSenders=await i()),s.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await g(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>w);return{fetchAuditLogs:n}},void 0);s.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await g(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>w);return{fetchProspects:n}},void 0);s.prospects=await t()}break;case"/map":{const{fetchProspects:t,fetchDeliveryLocations:n,fetchIntegrationSettings:i}=await g(async()=>{const{fetchProspects:r,fetchDeliveryLocations:c,fetchIntegrationSettings:a}=await Promise.resolve().then(()=>w);return{fetchProspects:r,fetchDeliveryLocations:c,fetchIntegrationSettings:a}},void 0);s.prospects=await t(),s.deliveryLocations=await n(),s.integrations.length===0&&(s.integrations=await i())}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await g(async()=>{const{fetchCallLogs:i,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>w);return{fetchCallLogs:i,fetchIntegrationSettings:r}},void 0);s.callLogs=await t(100),s.integrations.length===0&&(s.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await g(async()=>{const{fetchLeadLists:i,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>w);return{fetchLeadLists:i,fetchIntegrationSettings:r}},void 0);s.leadLists=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await g(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>w);return{fetchWorkflowOrdersFromDb:n}},void 0);s.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await g(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>w);return{fetchTourInquiriesFromDb:n}},void 0);s.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:i}=await g(async()=>{const{fetchSlackRules:r,fetchSlackLogs:c,fetchIntegrationSettings:a}=await Promise.resolve().then(()=>w);return{fetchSlackRules:r,fetchSlackLogs:c,fetchIntegrationSettings:a}},void 0);s.slackRules=await t(),s.slackLogs=await n(50),s.integrations.length===0&&(s.integrations=await i())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:n,fetchWorkflowOrdersFromDb:i,fetchTourInquiriesFromDb:r}=await g(async()=>{const{fetchProspects:c,fetchCalendarEvents:a,fetchWorkflowOrdersFromDb:o,fetchTourInquiriesFromDb:l}=await Promise.resolve().then(()=>w);return{fetchProspects:c,fetchCalendarEvents:a,fetchWorkflowOrdersFromDb:o,fetchTourInquiriesFromDb:l}},void 0);s.prospects.length===0&&(s.prospects=await t()),s.calendarEvents.length===0&&(s.calendarEvents=await n(s.calendarYearMonth)),s.materialList.length===0&&(s.materialList=await ht()),s.workflowOrders.length===0&&(s.workflowOrders=await i()),s.tourInquiries.length===0&&(s.tourInquiries=await r())}break;default:break}}catch(t){console.warn("Route data load error",t)}finally{s.actionLoading=!1,h()}}function ga(){if(Mt())return Gi(s.authError,s.authSubmitting);if(s.loading)return`
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
    `;switch(s.route){case"/cat/sales":return Te("sales");case"/cat/brewery":return Te("brewery");case"/cat/purchase":return Te("purchase");case"/cat/more":return Te("more");case"/invoice-entry":return Ei(s.invoiceForm,s.invoiceSavedDocNo,s.invoiceSaving,s.invoiceErrors);case"/quote":return Ii(s.quoteState,s.masterStats?.customers??[],s.masterStats?.products??[],s.quoteCustomerQuery,s.quoteProductQuery,s.quotePricing);case"/email":return Si(dr());case"/delivery":return s.deliveryNote?wi(s.deliveryNote,s.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/billing":return s.billingSummary?ai(s.billingSummary,s.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return s.salesReport?Ao(s.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Oi(s.productPower,s.productFilter,s.productDaily,s.productPeriod,s.productCustomStart,s.productCustomEnd,s.productSortState);case"/customer-efficiency":return ji(s.customerEfficiency,s.customerSortState);case"/customer-analysis":return s.customerAnalysis?go(s.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":case"/customer-efficiency":return'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return yi(s.demandForecast);case"/churn-alert":return s.churnAlert?xl(s.churnAlert):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return s.seasonalCalendar?Ll(s.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return s.visitPlanner?jl(s.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/jikomi":return s.jikomiView==="calendar"?`${Zt(s.jikomiList,s.jikomiView)}${Yi(s.jikomiList)}`:Zt(s.jikomiList,s.jikomiView);case"/tanks":return Bl(s.tankList);case"/kentei":return Hi(s.kenteiList);case"/materials":return io(s.materialList)+no(s.materialEditing,s.materialEditingIsNew);case"/purchase":return uo(s.purchaseList,s.payableList);case"/raw-material":return po(s.billList,s.rawStockList);case"/tax":return s.taxDeclaration?zl(s.taxDeclaration,s.taxYear,s.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Lo(s.storeSales,s.storeOrders,s.storeTab,s.storeSalesDate);case"/setup":return s.pipelineMeta?ho(s.pipelineMeta,Y,B,s.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return $l(s.rawSelectedTable,s.rawRecords,s.rawTableList,s.rawPage,s.rawTotalCount);case"/import":return Io(s.importEntity,s.importPreview,s.importing,s.importResult);case"/print":return pl(s.printTemplate,s.printOptions,s.printCompany,s.printData);case"/form-designer":return qo(s.printData,s.printCompany,s.printOptions,s.fdSavedPositions,s.fdDesignMode);case"/map":{const e=(s.masterStats?.customers??[]).slice(0,200).map((i,r)=>{const c=i;return{...i,lat:c.lat??35.37+r%12*.05+(Math.random()-.5)*.02,lng:c.lng??139.29+Math.floor(r/12)*.05+(Math.random()-.5)*.02,address1:c.address1??"",businessType:c.businessType??"",lastOrderAmount:0}}),n=!!s.integrations.find(i=>i.provider==="google_maps")?.config.api_key;return No(e,s.prospects,s.deliveryLocations,s.mapFilters,n)}case"/workflow":return jo(s.workflowOrders);case"/mobile-order":return Mo(s.mobileOrder,s.masterStats?.customers??[],s.masterStats?.products??[]);case"/tour":return Bo(s.tourInquiries,s.tourActiveId);case"/mail-senders":return Jo(s.mailSenders,s.mailSenderEditingId);case"/calendar":return Uo(s.calendarEvents,s.calendarYearMonth,s.calendarFilterCategory,s.calendarEdit);case"/integrations":return Ho(s.integrations,s.integrationEditingId);case"/shopify":{const e=s.integrations.find(t=>t.id==="shopify");return Qo(s.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Go(s.faxRecords,s.faxProcessing,s.faxOcrText);case"/users":return Xo(s.userProfiles,s.userEditingId,s.myProfile);case"/profile":return Ko(s.myProfile,s.auditLogs.filter(e=>e.userEmail===s.myProfile?.email),s.mailSenders);case"/audit":return Wo(s.auditLogs);case"/prospects":{const e={prospects:s.prospects,activities:s.prospectActivities,editingId:s.prospectEditingId,viewMode:s.prospectViewMode};return Zo(e)}case"/slack":{const e=s.integrations.find(t=>t.provider==="slack")??null;return sl(e,s.slackRules,s.slackLogs)}case"/calls":{const e=s.integrations.find(t=>t.provider==="ivry");return nl(s.callLogs,s.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:s.leadLists,activeListId:s.leadActiveListId,items:s.leadItems,searchQuery:s.leadSearchQuery,searchArea:s.leadSearchArea,searchBusinessType:s.leadSearchType,searching:s.leadSearching,searchResults:s.leadSearchResults};return ol(e)}}if(!s.salesSummary||!s.paymentStatus||!s.masterStats||!s.pipelineMeta||!s.customerLedger||!s.salesAnalytics)return"";switch(s.route){case"/sales":return Co(ks(s.salesSummary),s.salesFilter.startDate,s.salesFilter.endDate);case"/payment":return ro([...s.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return so(s.masterStats,s.masterTab,s.masterFilter,s.masterSortState);case"/invoice":return Bi(s.invoiceRecords,s.invoiceFilter);case"/ledger":return li(s.customerLedger,s.ledgerCustomerCode);case"/analytics":return xo(s.salesAnalytics,s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter,s.analyticsPeriodRows,s.analyticsPeriodOptions,s.analyticsStaffFilter,s.analyticsTagFilter,s.analyticsStaffDrilldown);default:return gi(s.salesSummary,s.pipelineMeta,s.salesAnalytics,{prospects:s.prospects,upcomingEvents:s.calendarEvents,tourInquiries:s.tourInquiries,workflowOrdersCount:{new:s.workflowOrders.filter(e=>e.stage==="new").length,picking:s.workflowOrders.filter(e=>e.stage==="picking").length,packed:s.workflowOrders.filter(e=>e.stage==="packed").length,shipped:s.workflowOrders.filter(e=>e.stage==="shipped").length,total:s.workflowOrders.length},lowStockCount:s.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:s.masterStats?{customers:s.masterStats.summary.customerCount,products:s.masterStats.summary.productCount,suppliers:s.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:s.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0},s.salesPeriod,s.customRange,s.dashboardSortState)}}function mr(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=s.announcements.filter(r=>!s.dismissedAnnouncements.has(r.id)).map(r=>{const c=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${c.bg};border-bottom:2px solid ${c.border};">
        <span class="announcement-text">${c.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),i=s.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+i}function yr(){if(Mt())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${ga()}</div>
        </main>
      </div>
    `;const e={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売業務",items:[{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/quote",label:"見積作成",kicker:"Quote"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],analytics:[{label:"分析",items:[{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/customer-analysis",label:"得意先分析",kicker:"CustABC"},{path:"/product-power",label:"商品力分析",kicker:"Power"},{path:"/customer-efficiency",label:"営業効率",kicker:"Efficiency"},{path:"/demand-forecast",label:"需要予測",kicker:"Forecast"},{path:"/report",label:"集計帳票",kicker:"Report"}]}],crm:[{label:"営業ツール",items:[{path:"/churn-alert",label:"離反アラート",kicker:"Churn"},{path:"/seasonal-calendar",label:"季節提案",kicker:"Season"},{path:"/visit-planner",label:"訪問計画",kicker:"Visit"},{path:"/prospects",label:"新規営業",kicker:"Prospects"},{path:"/map",label:"取引先マップ",kicker:"Map"},{path:"/list-builder",label:"リスト取得",kicker:"ListBuild"},{path:"/calls",label:"通話履歴",kicker:"Calls"},{path:"/email",label:"メール配信",kicker:"Mail"}]},{label:"受注・出荷",items:[{path:"/workflow",label:"受注ワークフロー",kicker:"Workflow"},{path:"/mobile-order",label:"モバイル受注",kicker:"Mobile"},{path:"/shopify",label:"Shopify注文",kicker:"Shopify"},{path:"/fax",label:"FAX OCR",kicker:"FAX"}]}],orders:[{label:"仕入・調達",items:[{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],brewery:[{label:"製造管理",items:[{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"},{path:"/tax",label:"酒税申告",kicker:"Tax"}]}],master:[{label:"マスタ・ツール",items:[{path:"/master",label:"マスタ管理",kicker:"Master"},{path:"/calendar",label:"カレンダー",kicker:"Calendar"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/tour",label:"酒蔵見学",kicker:"Tour"},{path:"/print",label:"印刷",kicker:"Print"}]}],settings:[{label:"システム設定",items:[{path:"/setup",label:"連動設定",kicker:"Setup"},{path:"/integrations",label:"外部連携",kicker:"API"},{path:"/slack",label:"Slack通知",kicker:"Slack"},{path:"/import",label:"データ取込",kicker:"Import"},{path:"/raw-browser",label:"データブラウザ",kicker:"RawData"},{path:"/users",label:"ユーザー管理",kicker:"Users"},{path:"/profile",label:"プロフィール",kicker:"Profile"},{path:"/audit",label:"操作ログ",kicker:"Audit"}]}]},t=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/invoice-entry",label:"販売"},{category:"analytics",path:"/analytics",label:"分析"},{category:"crm",path:"/prospects",label:"営業"},{category:"orders",path:"/purchase",label:"仕入"},{category:"brewery",path:"/jikomi",label:"製造"},{category:"master",path:"/master",label:"マスタ"},{category:"settings",path:"/setup",label:"設定"}],n=e[s.currentCategory].map(o=>`
        <div class="nav-group">
          <p class="nav-group-label">${o.label}</p>
          ${o.items.map(l=>`
                <a
                  href="${"/".replace(/\/$/,"")}${l.path==="/"?"/":l.path}"
                  class="nav-link ${s.route===l.path?"active":""}"
                  data-link="${l.path}"
                >
                  <div>
                    <div class="nav-kicker">${l.kicker}</div>
                    <div class="nav-label">${l.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),i=t.map(o=>`
        <a
          href="${"/".replace(/\/$/,"")}${o.path==="/"?"/":o.path}"
          class="category-link ${s.currentCategory===o.category?"active":""}"
          data-link="${o.path}"
        >
          ${o.label}
        </a>
      `).join(""),r=s.pickerMode&&s.masterStats?s.pickerMode==="customer"?Ai(s.masterStats.customers,s.pickerQuery):co(s.masterStats.products,s.pickerQuery):"",c=s.globalSearchOpen?xi(s.globalQuery,ur()):"",a=s.user?`
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
          <div class="category-nav">${i}</div>
          <div class="subnav">${n}</div>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${a}
        </header>
        ${mr()}
        <div class="view ${s.actionLoading?"is-busy":""}">${ga()}</div>
      </main>
      ${r}
      ${c}
    </div>
  `}async function hr(e){s.actionLoading=!0,h();try{s.invoiceRecords=await He(e)}finally{s.actionLoading=!1,h()}}async function vr(e){s.actionLoading=!0,h();try{s.customerLedger=await Ct(e)}finally{s.actionLoading=!1,h()}}function Z(e){s.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??s.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??s.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??s.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??s.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??s.invoiceForm.staffCode,lines:s.invoiceForm.lines.map((t,n)=>{const i=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:i,unitPrice:r,amount:i*r}}),note:e.querySelector("#inv-note")?.value??s.invoiceForm.note},s.invoiceForm.customerCode=s.invoiceForm.customerCode.trim().toUpperCase(),s.invoiceForm.customerName=s.invoiceForm.customerName.trim()}function de(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??s.emailAudienceMode;s.emailAudienceMode=t,s.emailRegion=e.querySelector("#email-region")?.value??s.emailRegion,s.emailHistorySegment=e.querySelector("#email-history-segment")?.value??s.emailHistorySegment,s.emailSubject=e.querySelector("#email-subject")?.value??s.emailSubject,s.emailBody=e.querySelector("#email-body")?.value??s.emailBody}function fr(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{s.globalSearchOpen=!0,h()}),e.querySelectorAll("[data-action='global-search-close']").forEach(a=>{a.addEventListener("click",o=>{a.classList.contains("global-search")&&o.target instanceof HTMLElement&&!o.target.classList.contains("global-search")||(Le(),h())})}),e.querySelector("#global-search-input")?.addEventListener("input",a=>{s.globalQuery=a.target.value,h()}),e.querySelectorAll("[data-action='global-nav']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.path;o&&(Le(),ba(o))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{pr()}),e.querySelectorAll("[data-jikomi-tab]").forEach(a=>{a.addEventListener("click",()=>{s.jikomiView=a.dataset.jikomiTab,h()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const a=e.querySelector("#auth-email")?.value.trim()??"",o=e.querySelector("#auth-password")?.value??"";s.authSubmitting=!0,s.authError=null,h(),Ds(a,o).then(async l=>{s.user=l,s.authSkipped=!1,s.authSubmitting=!1,s.authError=null;const{fetchMyProfile:d,recordAudit:u}=await g(async()=>{const{fetchMyProfile:p,recordAudit:y}=await Promise.resolve().then(()=>w);return{fetchMyProfile:p,recordAudit:y}},void 0);s.myProfile=await d(l.email),await u({action:"sign_in",userEmail:l.email}),h()}).catch(async l=>{try{const d=await zt(a,o);s.user=d,s.authSkipped=!1,s.authError=null;const{fetchMyProfile:u}=await g(async()=>{const{fetchMyProfile:p}=await Promise.resolve().then(()=>w);return{fetchMyProfile:p}},void 0);s.myProfile=await u(d.email)}catch{s.authError=l instanceof Error?l.message:"ログインに失敗しました。"}finally{s.authSubmitting=!1,h()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{s.authSkipped=!0,s.authError=null,h()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Is().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{s.sidebarOpen=!0,h()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(a=>{a.addEventListener("click",()=>{s.sidebarOpen=!1,h()})});const t=e.querySelector(".sidebar");if(t&&s.sidebarOpen){let a=0;t.addEventListener("touchstart",o=>{a=o.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",o=>{o.changedTouches[0].clientX-a<-60&&(s.sidebarOpen=!1,h())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.id??"";s.dismissedAnnouncements.add(o),h()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),ba(a.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async a=>{a.preventDefault();const o=e.querySelector("#fr-title")?.value??"",l=e.querySelector("#fr-category")?.value??"feature",d=e.querySelector("#fr-description")?.value??"",u=e.querySelector("#fr-result");if(!o.trim())return;const p=await Ia(o,l,d);if(u&&(u.textContent=p?"送信しました":"送信に失敗しました",u.className=`fr-result ${p?"success":"error"}`),p){const y=e.querySelector("#feature-request-form");y&&y.reset()}}),e.querySelectorAll("[data-period]").forEach(a=>{a.addEventListener("click",()=>{s.salesPeriod=a.dataset.period,h()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const a=e.querySelector("#range-start")?.value??"",o=e.querySelector("#range-end")?.value??"";a&&o&&(s.customRange={start:a,end:o},s.salesPeriod="custom",h())}),e.querySelectorAll("[data-edit-customer]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.editCustomer??"",l=s.masterStats?.customers.find(u=>u.id===o);if(!l)return;const d=document.createElement("div");d.innerHTML=Xi(l),document.body.appendChild(d.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async u=>{u.preventDefault();const p=document.getElementById("edit-result"),y=await Ta(o,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,manual_override:!0});p&&(p.textContent=y?"保存しました":"保存に失敗",p.className=`fr-result ${y?"success":"error"}`),y&&(document.getElementById("edit-modal")?.remove(),be())})})}),e.querySelectorAll("[data-edit-product]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.editProduct??"",l=s.masterStats?.products.find(u=>u.id===o);if(!l)return;const d=document.createElement("div");d.innerHTML=Ki(l),document.body.appendChild(d.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async u=>{u.preventDefault();const p=document.getElementById("edit-result"),y=await qa(o,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});p&&(p.textContent=y?"保存しました":"保存に失敗",p.className=`fr-result ${y?"success":"error"}`),y&&(document.getElementById("edit-modal")?.remove(),be())})})}),e.querySelector("#q-cust-search")?.addEventListener("input",a=>{s.quoteCustomerQuery=a.target.value,h()}),e.querySelector("#q-prod-search")?.addEventListener("input",a=>{s.quoteProductQuery=a.target.value,h()}),e.querySelectorAll("[data-select-customer]").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.selectCustomer??"";s.quoteState.customerCode=o,s.quoteState.customerName=a.dataset.custName??"",s.quoteState.customerAddress=a.dataset.custAddr??"",s.quoteCustomerQuery="",s.quotePricing=await Na(s.masterStats?.customers??[],o),h()})}),e.querySelectorAll("[data-add-product]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.addProduct??"",l=a.dataset.prodName??"",d=parseInt(a.dataset.prodPrice??"0");s.quoteState.lines.push({productCode:o,productName:l,quantity:1,unit:"本",unitPrice:d,amount:d}),s.quoteProductQuery="",h()})}),e.querySelectorAll(".qty-input").forEach(a=>{a.addEventListener("change",()=>{const o=parseInt(a.dataset.lineIdx??"0"),l=s.quoteState.lines[o];l&&(l.quantity=parseInt(a.value)||0,l.amount=l.quantity*l.unitPrice,h())})}),e.querySelectorAll(".price-input").forEach(a=>{a.addEventListener("change",()=>{const o=parseInt(a.dataset.lineIdx??"0"),l=s.quoteState.lines[o];l&&(l.unitPrice=parseInt(a.value)||0,l.amount=l.quantity*l.unitPrice,h())})}),e.querySelectorAll("[data-remove-line]").forEach(a=>{a.addEventListener("click",()=>{const o=parseInt(a.dataset.removeLine??"0");s.quoteState.lines.splice(o,1),h()})}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{const a=s.quoteState;a.quoteNo=a.quoteNo||`Q${Date.now().toString(36).toUpperCase()}`,a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??"",a.subject=document.getElementById("q-subject")?.value??"",a.remarks=document.getElementById("q-remarks")?.value??"",a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote;const o=a.lines.reduce((p,y)=>p+y.amount,0),l=Math.round(o*a.taxRate/100),{supabaseInsert:d}=await g(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>O);return{supabaseInsert:p}},void 0),u=await d("quotes",{quote_no:a.quoteNo,quote_date:a.quoteDate,valid_until:a.validUntil||null,legacy_customer_code:a.customerCode,customer_name:a.customerName,customer_address:a.customerAddress,subject:a.subject,subtotal:o,tax_amount:l,total_amount:o+l,remarks:a.remarks});if(u?.id){for(let p=0;p<a.lines.length;p++){const y=a.lines[p];await d("quote_lines",{quote_id:u.id,line_no:p+1,legacy_product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit:y.unit,unit_price:y.unitPrice,amount:y.amount})}alert(`見積 ${a.quoteNo} を保存しました`),s.quoteState={...cs},h()}}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{const a=s.quoteState;a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??a.validUntil,a.subject=document.getElementById("q-subject")?.value??a.subject,a.remarks=document.getElementById("q-remarks")?.value??a.remarks,a.quoteNo=document.getElementById("q-no")?.value??a.quoteNo,a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote,a.previewMode=!0,h()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{s.quoteState.previewMode=!1,h()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",()=>{const a=s.quoteState;a.previewMode||(a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??a.validUntil,a.subject=document.getElementById("q-subject")?.value??a.subject,a.remarks=document.getElementById("q-remarks")?.value??a.remarks,a.quoteNo=document.getElementById("q-no")?.value??a.quoteNo,a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote),Ti(a)}),e.querySelectorAll("[data-field-toggle]").forEach(a=>{a.addEventListener("change",()=>{const o=a.dataset.fieldToggle;o&&typeof s.quoteState.fieldConfig[o]=="boolean"&&(s.quoteState.fieldConfig[o]=a.checked,h())})}),e.querySelector("#q-seal-file")?.addEventListener("change",a=>{const o=a.target.files?.[0];if(!o)return;const l=new FileReader;l.onload=()=>{s.quoteState.sealSettings={imageDataUrl:l.result,size:72},localStorage.setItem("quote-seal",JSON.stringify(s.quoteState.sealSettings)),h()},l.readAsDataURL(o)}),e.querySelector("#q-seal-size")?.addEventListener("input",a=>{const o=parseInt(a.target.value);s.quoteState.sealSettings&&(s.quoteState.sealSettings.size=o,localStorage.setItem("quote-seal",JSON.stringify(s.quoteState.sealSettings)),h())}),e.querySelector("[data-action='remove-seal']")?.addEventListener("click",()=>{s.quoteState.sealSettings=null,localStorage.removeItem("quote-seal"),h()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.month;o&&(s.demandForecast.calendarMonth=o,h())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.segment;s.demandForecast.selectedSegment=o,h()})}),e.querySelectorAll("[data-action='select-month']").forEach(a=>{a.addEventListener("click",()=>{const o=parseInt(a.dataset.month??"0");s.seasonalCalendar&&(s.seasonalCalendar.selectedMonth=o,h())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",a=>{s.visitPlanner&&(s.visitPlanner.filterArea=a.target.value,h())}),e.querySelector("#visit-filter-score")?.addEventListener("change",a=>{s.visitPlanner&&(s.visitPlanner.filterMinScore=parseInt(a.target.value)||0,h())}),e.querySelectorAll("[data-sort-col]").forEach(a=>{a.addEventListener("click",o=>{const l=a.dataset.sortCol??"",d=o.shiftKey;s.route==="/product-power"?s.productSortState=qe(s.productSortState,l,d):s.route==="/customer-efficiency"?s.customerSortState=qe(s.customerSortState,l,d):s.route==="/"||s.route==="/sales"?s.dashboardSortState=qe(s.dashboardSortState,l,d):s.route==="/master"&&(s.masterSortState=qe(s.masterSortState,l,d)),h()})}),e.querySelectorAll("[data-product-period]").forEach(a=>{a.addEventListener("click",()=>{s.productPeriod=a.dataset.productPeriod??"year",h()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const a=document.getElementById("pp-range-start")?.value??"",o=document.getElementById("pp-range-end")?.value??"";a&&o&&(s.productCustomStart=a,s.productCustomEnd=o,s.productPeriod="custom",h())}),e.querySelectorAll("[data-product-filter]").forEach(a=>{a.addEventListener("click",()=>{s.productFilter=a.dataset.productFilter??"all",h()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async a=>{const o=a.currentTarget;o.disabled=!0,o.textContent="更新中…",await be(),o.disabled=!1,o.textContent="↻ 更新",k("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const a=e.querySelector("#sales-start")?.value??"",o=e.querySelector("#sales-end")?.value??"";s.salesFilter={startDate:a,endDate:o},h()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const a={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};s.invoiceFilter=a,hr(a)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const a=e.querySelector("#ledger-customer-code")?.value??"";s.ledgerCustomerCode=a.trim().toUpperCase(),vr(s.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{s.masterTab=a.dataset.tab,s.masterFilter={...Rt},h()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{s.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},h()}),e.querySelector("#master-search")?.addEventListener("keydown",a=>{a.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.page);o>=1&&(s.masterFilter={...s.masterFilter,page:o},h())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.table;if(!o)return;s.rawSelectedTable=o,s.rawPage=1;const l=await Ue(o,1);s.rawRecords=l.records,s.rawTotalCount=l.total,h()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable||s.rawPage<=1)return;s.rawPage-=1;const a=await Ue(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,h()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable)return;s.rawPage+=1;const a=await Ue(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,h()}),e.querySelectorAll("[data-analytics-tab]").forEach(a=>{a.addEventListener("click",async()=>{if(s.analyticsTab=a.dataset.analyticsTab,s.analyticsStaffDrilldown=null,s.analyticsPeriod!=="all"&&s.analyticsTab!=="staff"){const{fetchAnalyticsByPeriod:o,fetchAvailablePeriods:l}=await g(async()=>{const{fetchAnalyticsByPeriod:d,fetchAvailablePeriods:u}=await Promise.resolve().then(()=>w);return{fetchAnalyticsByPeriod:d,fetchAvailablePeriods:u}},void 0);s.analyticsPeriodOptions=await l(s.analyticsTab,s.analyticsPeriod),s.analyticsPeriodFilter=s.analyticsPeriodOptions[0]??"",s.analyticsPeriodRows=await o(s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter)}h()})}),e.querySelectorAll("[data-analytics-period]").forEach(a=>{a.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:o,fetchAvailablePeriods:l}=await g(async()=>{const{fetchAnalyticsByPeriod:u,fetchAvailablePeriods:p}=await Promise.resolve().then(()=>w);return{fetchAnalyticsByPeriod:u,fetchAvailablePeriods:p}},void 0),d=a.dataset.analyticsPeriod;s.analyticsPeriod=d,d==="all"?(s.analyticsPeriodRows=[],s.analyticsPeriodOptions=[],s.analyticsPeriodFilter=""):(s.analyticsPeriodOptions=await l(s.analyticsTab,d),s.analyticsPeriodFilter=s.analyticsPeriodOptions[0]??"",s.analyticsPeriodRows=await o(s.analyticsTab,d,s.analyticsPeriodFilter)),h()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async a=>{const{fetchAnalyticsByPeriod:o}=await g(async()=>{const{fetchAnalyticsByPeriod:l}=await Promise.resolve().then(()=>w);return{fetchAnalyticsByPeriod:l}},void 0);s.analyticsPeriodFilter=a.target.value,s.analyticsPeriodRows=await o(s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter),h()}),e.querySelector("#staff-filter-input")?.addEventListener("input",a=>{s.analyticsStaffFilter=a.target.value,h()}),e.querySelectorAll("[data-staff-drilldown]").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.staffDrilldown??"",l=a.dataset.staffName??"",{fetchStaffCustomerBreakdown:d,fetchStaffProductBreakdown:u}=await g(async()=>{const{fetchStaffCustomerBreakdown:v,fetchStaffProductBreakdown:f}=await Promise.resolve().then(()=>w);return{fetchStaffCustomerBreakdown:v,fetchStaffProductBreakdown:f}},void 0),[p,y]=await Promise.all([d(o),u(o)]);s.analyticsStaffDrilldown={code:o,name:l,customerRows:p,productRows:y},h()})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{s.analyticsStaffDrilldown=null,h()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",a=>{s.analyticsTagFilter=a.target.value,h()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Z(e),s.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),s.invoiceErrors={},h()}),e.querySelectorAll("[data-action='remove-line']").forEach(a=>{a.addEventListener("click",()=>{Z(e);const o=parseInt(a.dataset.line??"0",10);s.invoiceForm.lines.splice(o,1),s.invoiceErrors=_s(s.invoiceForm),h()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(a=>{a.addEventListener("click",()=>{Z(e),or(parseInt(a.dataset.line??"0",10)),s.invoiceErrors={},h()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{lr(),h()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Z(e),s.pickerMode="customer",s.pickerTargetLine=null,s.pickerQuery=s.invoiceForm.customerCode||s.invoiceForm.customerName,h()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(a=>{a.addEventListener("click",()=>{Z(e);const o=parseInt(a.dataset.line??"0",10),l=s.invoiceForm.lines[o];s.pickerMode="product",s.pickerTargetLine=o,s.pickerQuery=l?l.productCode||l.productName:"",h()})}),e.querySelectorAll("[data-action='modal-close']").forEach(a=>{a.addEventListener("click",o=>{a.classList.contains("modal-backdrop")&&o.target instanceof HTMLElement&&!o.target.classList.contains("modal-backdrop")||(Ke(),h())})}),e.querySelectorAll("[data-action='picker-select']").forEach(a=>{const o=async()=>{const l=a.dataset.code??"",d=a.dataset.name??"";if(s.pickerMode==="customer"){s.invoiceForm.customerCode=l,s.invoiceForm.customerName=d,delete s.invoiceErrors.customerCode;const u=s.masterStats?.customers.find(p=>p.code===l);s.invoicePriceGroup=u?.priceGroup||"",!s.invoicePriceGroup&&l&&(s.invoicePriceGroup=await ft(l))}else if(s.pickerMode==="product"&&s.pickerTargetLine!==null){const u=s.invoiceForm.lines[s.pickerTargetLine];if(u){u.productCode=l,u.productName=d;const p=await is(s.invoicePriceGroup,l);p>0&&(u.unitPrice=p),u.amount=u.quantity*u.unitPrice,delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productCode`],delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productName`]}}Ke(),h()};a.addEventListener("click",o),a.addEventListener("keydown",l=>{l.key==="Enter"&&o()})}),e.querySelector("#modal-search")?.addEventListener("input",a=>{s.pickerQuery=a.target.value,h()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{$s(),h()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{ws(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Z(e),rr(s.invoiceForm.customerCode)&&(delete s.invoiceErrors.customerCode,!s.invoicePriceGroup&&s.invoiceForm.customerCode&&(s.invoicePriceGroup=await ft(s.invoiceForm.customerCode)),h())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Z(e),cr(s.invoiceForm.customerName)&&(delete s.invoiceErrors.customerCode,h())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(a=>{a.addEventListener("input",()=>{Z(e),s.invoiceSavedDocNo=null;const o=a.dataset.field;(o==="quantity"||o==="unitPrice")&&h()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Z(e),s.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const a=e.querySelector("#delivery-docno")?.value??"";s.deliverySearchDocNo=a.trim(),s.deliveryNote=null,s.actionLoading=!0,h(),Lt(s.deliverySearchDocNo||"D240122").then(o=>{s.deliveryNote=o,s.actionLoading=!1,h()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const a=e.querySelector("#billing-month")?.value??s.billingYearMonth;s.billingYearMonth=a,s.billingSummary=null,s.actionLoading=!0,h(),Dt(a).then(o=>{s.billingSummary=o,s.actionLoading=!1,h()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const a=parseInt(e.querySelector("#tax-year")?.value??String(s.taxYear),10),o=parseInt(e.querySelector("#tax-month")?.value??String(s.taxMonth),10);s.taxYear=a,s.taxMonth=o,s.taxDeclaration=null,s.actionLoading=!0,h(),It(a,o).then(l=>{s.taxDeclaration=l,s.actionLoading=!1,h()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxXML:a}=await g(async()=>{const{generateTaxXML:p}=await Promise.resolve().then(()=>w);return{generateTaxXML:p}},void 0),o=a(s.taxDeclaration),l=new Blob([o],{type:"application/xml;charset=utf-8"}),d=URL.createObjectURL(l),u=document.createElement("a");u.href=d,u.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.xml`,u.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxCSV:a}=await g(async()=>{const{generateTaxCSV:p}=await Promise.resolve().then(()=>w);return{generateTaxCSV:p}},void 0),o=a(s.taxDeclaration),l=new Blob([o],{type:"text/csv;charset=utf-8"}),d=URL.createObjectURL(l),u=document.createElement("a");u.href=d,u.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.csv`,u.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{saveTaxDeclaration:a}=await g(async()=>{const{saveTaxDeclaration:o}=await Promise.resolve().then(()=>w);return{saveTaxDeclaration:o}},void 0);try{await a(s.taxDeclaration),k("下書き保存しました")}catch(o){k("保存に失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(a=>{a.addEventListener("change",async()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.taxRow),l=a.dataset.taxField,d=a.type==="number"?Number(a.value)||0:a.value,u=[...s.taxDeclaration.rows];u[o]={...u[o],[l]:d};const{recalculateTaxDeclaration:p}=await g(async()=>{const{recalculateTaxDeclaration:y}=await Promise.resolve().then(()=>w);return{recalculateTaxDeclaration:y}},void 0);s.taxDeclaration=p({...s.taxDeclaration,rows:u}),h()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.dedRow),l=a.dataset.dedField,d=a.type==="number"?Number(a.value)||0:a.value,u=[...s.taxDeclaration.deductions];u[o]={...u[o],[l]:d},s.taxDeclaration={...s.taxDeclaration,deductions:u},h()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const o=a.dataset.taxField;s.taxDeclaration={...s.taxDeclaration,[o]:a.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{recalculateTaxDeclaration:a,TAX_RATE_CATEGORIES:o}=await g(async()=>{const{recalculateTaxDeclaration:u,TAX_RATE_CATEGORIES:p}=await Promise.resolve().then(()=>w);return{recalculateTaxDeclaration:u,TAX_RATE_CATEGORIES:p}},void 0),l=o[0],d={taxCategory:l.code,taxCategoryName:l.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:l.taxRatePerLiter,taxAmount:0};s.taxDeclaration=a({...s.taxDeclaration,rows:[...s.taxDeclaration.rows,d]}),h()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(a=>{a.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.taxRow),{recalculateTaxDeclaration:l}=await g(async()=>{const{recalculateTaxDeclaration:u}=await Promise.resolve().then(()=>w);return{recalculateTaxDeclaration:u}},void 0),d=s.taxDeclaration.rows.filter((u,p)=>p!==o);s.taxDeclaration=l({...s.taxDeclaration,rows:d}),h()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!s.taxDeclaration)return;const a={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};s.taxDeclaration={...s.taxDeclaration,deductions:[...s.taxDeclaration.deductions,a]},h()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(a=>{a.addEventListener("click",()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.dedRow),l=s.taxDeclaration.deductions.filter((d,u)=>u!==o);s.taxDeclaration={...s.taxDeclaration,deductions:l},h()})}),e.querySelectorAll("[data-store-tab]").forEach(a=>{a.addEventListener("click",()=>{s.storeTab=a.dataset.storeTab,h()})}),e.querySelectorAll("[data-import-entity]").forEach(a=>{a.addEventListener("click",()=>{s.importEntity=a.dataset.importEntity,s.importPreview=null,s.importResult=null,h()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const a=fl(s.importEntity),o=new Blob([a],{type:"text/csv;charset=utf-8"}),l=URL.createObjectURL(o),d=document.createElement("a");d.href=l,d.download=`template_${s.importEntity}.csv`,d.click(),URL.revokeObjectURL(l)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const o=e.querySelector("#import-file")?.files?.[0];if(!o){k("CSVファイルを選択してください","warning");return}const l=new FileReader;l.onload=()=>{const d=String(l.result??""),{columns:u,rows:p}=hl(d);s.importPreview=vl(s.importEntity,u,p),s.importResult=null,h()},l.readAsText(o,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{s.importPreview=null,s.importResult=null,h()}),e.querySelectorAll("[data-print-template]").forEach(a=>{a.addEventListener("click",()=>{s.printTemplate=a.dataset.printTemplate,h()})}),e.querySelectorAll("[data-print-field]").forEach(a=>{a.addEventListener("change",()=>{const o=a.dataset.printField;let l=a.value;(o==="taxRate"||o==="previousBalance"||o==="paymentAmount")&&(l=Number(a.value)||0),s.printData={...s.printData,[o]:l},h()})}),e.querySelectorAll("[data-print-opt]").forEach(a=>{const o=()=>{const l=a.dataset.printOpt;let d;a.type==="checkbox"?d=a.checked:l==="copies"?d=Number(a.value)||1:l==="overlayOpacity"||l==="calibrationOffsetX"||l==="calibrationOffsetY"?d=Number(a.value)||0:d=a.value,s.printOptions={...s.printOptions,[l]:d},h()};a.addEventListener("change",o),a.type==="range"&&a.addEventListener("input",o)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(a=>{a.addEventListener("change",()=>{const o=Number(a.dataset.printLine),l=a.dataset.printLfield,d=[...s.printData.lines];let u=a.value;(l==="quantity"||l==="unitPrice")&&(u=Number(a.value)||0),d[o]={...d[o],[l]:u},d[o].amount=(Number(d[o].quantity)||0)*(Number(d[o].unitPrice)||0),s.printData={...s.printData,lines:d},h()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{s.printData={...s.printData,lines:[...s.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},h()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.printLine);s.printData={...s.printData,lines:s.printData.lines.filter((l,d)=>d!==o)},h()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(s.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(s.printCompany)),k("印刷設定を保存しました")}catch(a){k("保存失敗: "+(a instanceof Error?a.message:String(a)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const a=s.printCompany,o=prompt("会社名",a.name);if(o===null)return;const l=prompt("郵便番号",a.postalCode)??a.postalCode,d=prompt("住所",a.address1)??a.address1,u=prompt("TEL",a.tel)??a.tel,p=prompt("FAX",a.fax)??a.fax,y=prompt("適格請求書登録番号 (T+13桁)",a.registrationNo)??a.registrationNo,v=prompt("取引銀行名",a.bankName)??a.bankName,f=prompt("支店名",a.bankBranch)??a.bankBranch,A=prompt("口座番号",a.bankAccountNo)??a.bankAccountNo,$=prompt("口座名義",a.bankAccountHolder)??a.bankAccountHolder;s.printCompany={...a,name:o,postalCode:l,address1:d,tel:u,fax:p,registrationNo:y,bankName:v,bankBranch:f,bankAccountNo:A,bankAccountHolder:$},h()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{s.fdDesignMode=!s.fdDesignMode,h()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const l=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",d=rt(a),{savePrintLayout:u}=await g(async()=>{const{savePrintLayout:y}=await Promise.resolve().then(()=>w);return{savePrintLayout:y}},void 0),p={id:`bp1701_${l.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:l,templateKey:"chain_store",positions:d};try{await u(p)?(k(`クラウド保存成功: ${l}`),s.fdSavedPositions=d,localStorage.setItem("sake_fd_positions",JSON.stringify(d)),h()):(k("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(d)))}catch(y){k("保存エラー: "+(y instanceof Error?y.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const o=rt(a);s.fdSavedPositions=o;try{localStorage.setItem("sake_fd_positions",JSON.stringify(o)),k(`ローカル保存完了: ${Object.keys(o).length}件`)}catch(l){k("保存失敗: "+(l instanceof Error?l.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const l={templateKey:"chain_store",positions:rt(a),exportedAt:new Date().toISOString()},d=new Blob([JSON.stringify(l,null,2)],{type:"application/json"}),u=URL.createObjectURL(d),p=document.createElement("a");p.href=u,p.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,p.click(),URL.revokeObjectURL(u)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async a=>{const o=a.target.files?.[0];if(o)try{const l=await o.text(),u=JSON.parse(l).positions;if(!u)throw new Error("positions field not found");s.fdSavedPositions=u,localStorage.setItem("sake_fd_positions",JSON.stringify(u)),k(`インポート成功: ${Object.keys(u).length}件`),h()}catch(l){k("インポート失敗: "+(l instanceof Error?l.message:""),"error")}});const n=e.querySelector("#fd-saved-layouts");n&&s.route==="/form-designer"&&s.fdDesignMode&&(async()=>{const{fetchPrintLayouts:a}=await g(async()=>{const{fetchPrintLayouts:l}=await Promise.resolve().then(()=>w);return{fetchPrintLayouts:l}},void 0),o=await a("chain_store");o.length===0?n.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(n.innerHTML=`☁️ クラウド保存済み (${o.length}件):<br/>`+o.map(l=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${l.id}" style="margin:4px 4px 0 0;">${l.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${l.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),n.querySelectorAll("[data-action='fd-load-layout']").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.layoutId,u=o.find(p=>p.id===d);u&&(s.fdSavedPositions=u.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(u.positions)),k(`読込完了: ${u.name}`),h())})}),n.querySelectorAll("[data-action='fd-delete-layout']").forEach(l=>{l.addEventListener("click",async()=>{const d=l.dataset.layoutId;if(!d||!await te("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:u}=await g(async()=>{const{deletePrintLayout:y}=await Promise.resolve().then(()=>w);return{deletePrintLayout:y}},void 0);await u(d)?(k("削除しました"),h()):k("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await te("フィールド位置を初期値に戻しますか？")&&(s.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),h())});const i=e.querySelector("#fd-sel-x"),r=e.querySelector("#fd-sel-y");[i,r].forEach(a=>{a?.addEventListener("change",()=>{if(!s.fdActiveFieldId)return;const o=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);o&&(i&&(o.style.left=i.value+"mm"),r&&(o.style.top=r.value+"mm"))})});const c=e.querySelector("#customer-map");c&&s.route==="/map"&&Ps(c),e.querySelectorAll(".wf-card").forEach(a=>{a.addEventListener("dragstart",o=>{a.classList.add("wf-dragging"),o.dataTransfer?.setData("text/plain",a.dataset.wfOrder??"")}),a.addEventListener("dragend",()=>a.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(a=>{a.addEventListener("dragover",o=>o.preventDefault()),a.addEventListener("drop",o=>{o.preventDefault();const l=o.dataTransfer?.getData("text/plain"),d=a.dataset.wfStage;if(!l||!d)return;const u=s.workflowOrders.find(p=>p.id===l);u&&(u.stage=d,h())})}),e.querySelectorAll("[data-mo-step]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moStep;a.disabled||(s.mobileOrder.step=o,h())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",a=>{s.mobileOrder.customerQuery=a.target.value,h()}),e.querySelector("#mo-product-q")?.addEventListener("input",a=>{s.mobileOrder.productQuery=a.target.value,h()}),e.querySelectorAll("[data-mo-select-customer]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moSelectCustomer,l=s.masterStats?.customers.find(d=>d.id===o);l&&(s.mobileOrder.selectedCustomer=l),h()})}),e.querySelectorAll("[data-mo-add-product]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moAddProduct,l=s.masterStats?.products.find(u=>u.code===o);if(!l)return;const d=1800;s.mobileOrder.cart.push({productCode:l.code,productName:l.name,quantity:1,unit:"本",unitPrice:d,amount:d}),h()})}),e.querySelectorAll("[data-mo-qty]").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.moQty),l=a.dataset.moProduct,d=s.mobileOrder.cart.find(u=>u.productCode===l);d&&(d.quantity=Math.max(0,d.quantity+o),d.amount=d.quantity*d.unitPrice,d.quantity===0&&(s.mobileOrder.cart=s.mobileOrder.cart.filter(u=>u.productCode!==l)),h())})}),e.querySelectorAll("[data-mo-remove]").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.moRemove);s.mobileOrder.cart.splice(o,1),h()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const a=e.querySelector("#mo-memo");s.mobileOrder.memo=a?.value??"";const o="MO"+Date.now().toString().slice(-8);s.mobileOrder.submittedDocNo=o,s.mobileOrder.step="done",h()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{s.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},h()}),e.querySelectorAll("[data-tour-id]").forEach(a=>{a.addEventListener("click",()=>{s.tourActiveId=a.dataset.tourId??null,h()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(a=>{a.addEventListener("click",()=>{const o=s.tourInquiries.find(y=>y.id===s.tourActiveId);if(!o)return;const l=a.dataset.template==="confirm"?zo:Vo,d=e.querySelector("#tour-confirmed-time"),u=l.replaceAll("{name}",o.name).replaceAll("{partySize}",String(o.partySize)).replaceAll("{confirmedTime}",d?.value??o.visitDate),p=e.querySelector("#tour-reply-body");p&&(p.value=u)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const a=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",o=s.tourInquiries.find(d=>d.id===a);if(!o)return;const l=e.querySelector("#tour-confirmed-time");o.status="confirmed",o.repliedAt=new Date().toISOString(),o.confirmedTime=l?.value??"",k("返信メールを下書き保存し、ステータスを確定にしました"),h()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const a=e.querySelector("#lb-type")?.value??"",o=e.querySelector("#lb-area")?.value??"",l=e.querySelector("#lb-keyword")?.value??"";if(!a&&!l){k("業種かキーワードを入力してください","warning");return}s.leadSearchType=a,s.leadSearchArea=o,s.leadSearchQuery=l,s.leadSearching=!0,h();const d=s.integrations.find(v=>v.provider==="google_maps");if(!d||!d.config.api_key){k("Google Maps APIキーが /integrations で未設定です","warning"),s.leadSearching=!1,h();return}const{searchPlaces:u}=await g(async()=>{const{searchPlaces:v}=await Promise.resolve().then(()=>w);return{searchPlaces:v}},void 0),p=[a,l].filter(Boolean).join(" "),y=await u(d,p,o);s.leadSearching=!1,y.error?k("検索失敗: "+y.error,"error"):s.leadSearchResults=y.results,h()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{s.leadSearchResults=[],h()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(s.leadSearchResults.length===0)return;const a=prompt("リスト名を入力:",`${s.leadSearchType} ${s.leadSearchArea}`);if(!a)return;const o=`ll_${Date.now()}`,l={id:o,name:a,query:s.leadSearchQuery,area:s.leadSearchArea,businessType:s.leadSearchType,totalCount:s.leadSearchResults.length,source:"google_places"},{saveLeadList:d,saveLeadItem:u,fetchLeadLists:p,fetchLeadItems:y}=await g(async()=>{const{saveLeadList:A,saveLeadItem:$,fetchLeadLists:P,fetchLeadItems:x}=await Promise.resolve().then(()=>w);return{saveLeadList:A,saveLeadItem:$,fetchLeadLists:P,fetchLeadItems:x}},void 0);await d(l);const v=e.querySelectorAll(".lb-search-check:checked"),f=Array.from(v).map(A=>Number(A.dataset.idx));for(const A of f){const $=s.leadSearchResults[A];$&&await u({...$,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:o,businessType:s.leadSearchType})}s.leadLists=await p(),s.leadActiveListId=o,s.leadItems=await y(o),s.leadSearchResults=[],k(`${f.length}件を「${a}」として保存しました`),h()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??null;if(s.leadActiveListId=o,o){const{fetchLeadItems:l}=await g(async()=>{const{fetchLeadItems:d}=await Promise.resolve().then(()=>w);return{fetchLeadItems:d}},void 0);s.leadItems=await l(o)}h()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??"",l=s.leadItems.find(p=>p.id===o);if(!l)return;const{saveLeadItem:d,fetchLeadItems:u}=await g(async()=>{const{saveLeadItem:p,fetchLeadItems:y}=await Promise.resolve().then(()=>w);return{saveLeadItem:p,fetchLeadItems:y}},void 0);await d({...l,status:"excluded"}),s.leadActiveListId&&(s.leadItems=await u(s.leadActiveListId)),h()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??"",l=s.leadItems.find(y=>y.id===o);if(!l)return;const{convertLeadToProspect:d,fetchLeadItems:u}=await g(async()=>{const{convertLeadToProspect:y,fetchLeadItems:v}=await Promise.resolve().then(()=>w);return{convertLeadToProspect:y,fetchLeadItems:v}},void 0);await d(l)&&(k("見込客に追加しました: "+l.companyName),s.leadActiveListId&&(s.leadItems=await u(s.leadActiveListId)),h())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const a=e.querySelectorAll(".lb-item-check:checked");if(a.length===0&&!await te("全ての新規アイテムを見込客に変換しますか？"))return;const o=a.length>0?Array.from(a).map(p=>p.dataset.id):s.leadItems.filter(p=>p.status==="new").map(p=>p.id),{convertLeadToProspect:l,fetchLeadItems:d}=await g(async()=>{const{convertLeadToProspect:p,fetchLeadItems:y}=await Promise.resolve().then(()=>w);return{convertLeadToProspect:p,fetchLeadItems:y}},void 0);let u=0;for(const p of o){const y=s.leadItems.find(v=>v.id===p);y&&y.status==="new"&&await l(y)&&u++}k(`${u}件を見込客に変換しました`),s.leadActiveListId&&(s.leadItems=await d(s.leadActiveListId)),h()}),e.querySelectorAll("[data-map-filter]").forEach(a=>{a.addEventListener("change",()=>{const o=a.dataset.mapFilter;let l;a.type==="checkbox"?l=a.checked:l=a.value,s.mapFilters={...s.mapFilters,[o]:l},h()})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const a=s.integrations.find(u=>u.provider==="ivry");if(!a||!a.isEnabled){k("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:o,fetchCallLogs:l}=await g(async()=>{const{syncIvryCallLogs:u,fetchCallLogs:p}=await Promise.resolve().then(()=>w);return{syncIvryCallLogs:u,fetchCallLogs:p}},void 0),d=await o(a);d.error?k("同期失敗: "+d.error,"error"):(k(`${d.count}件の通話履歴を同期しました`),s.callLogs=await l(100),h())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const a=s.integrations.find(u=>u.provider==="ivry");if(!a||!a.isEnabled){k("IVRy連携が無効です","warning");return}if(!await te("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:o}=await g(async()=>{const{syncPhoneBookToIvry:u}=await Promise.resolve().then(()=>w);return{syncPhoneBookToIvry:u}},void 0),l=[];s.masterStats?.customers.forEach(u=>{l.push({name:u.name,phone:"",customerCode:u.code,note:"既存取引先"})}),s.prospects.forEach(u=>{u.phone&&l.push({name:u.companyName,phone:u.phone,customerCode:u.id,note:`見込客 (${u.stage})`})});const d=await o(a,l);d.error?k("送信失敗: "+d.error,"error"):k(`${d.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??"",l=a.dataset.phone??"",d=prompt(`電話番号 ${l} を顧客コードに紐付け
顧客コードを入力:`);if(!d)return;const u=s.callLogs.find(v=>v.id===o);if(!u)return;const{saveCallLog:p,fetchCallLogs:y}=await g(async()=>{const{saveCallLog:v,fetchCallLogs:f}=await Promise.resolve().then(()=>w);return{saveCallLog:v,fetchCallLogs:f}},void 0);await p({...u,matchedCustomerCode:d}),s.callLogs=await y(100),h()})}),e.querySelectorAll("[data-action='call-memo']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??"",l=s.callLogs.find(y=>y.id===o);if(!l)return;const d=prompt("メモを入力:",l.notes??"");if(d===null)return;const{saveCallLog:u,fetchCallLogs:p}=await g(async()=>{const{saveCallLog:y,fetchCallLogs:v}=await Promise.resolve().then(()=>w);return{saveCallLog:y,fetchCallLogs:v}},void 0);await u({...l,notes:d}),s.callLogs=await p(100),h()})}),e.querySelectorAll("[data-prospect-view]").forEach(a=>{a.addEventListener("click",()=>{s.prospectViewMode=a.dataset.prospectView,h()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{s.prospectEditingId="__new__",h()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??null;if(s.prospectEditingId=o,o){const{fetchProspectActivities:l}=await g(async()=>{const{fetchProspectActivities:d}=await Promise.resolve().then(()=>w);return{fetchProspectActivities:d}},void 0);s.prospectActivities=await l(o)}h()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.prospectId??null;if(s.prospectEditingId=o,o){const{fetchProspectActivities:l}=await g(async()=>{const{fetchProspectActivities:d}=await Promise.resolve().then(()=>w);return{fetchProspectActivities:d}},void 0);s.prospectActivities=await l(o)}h()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(a=>{a.addEventListener("click",o=>{o.currentTarget!==o.target&&!o.target.matches("button")||(s.prospectEditingId=null,s.prospectActivities=[],h())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const a=s.prospectEditingId==="__new__",o=a?`p_${Date.now()}`:s.prospectEditingId??"",l={id:o,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!l.companyName){k("会社名は必須です","warning");return}const{saveProspect:d,fetchProspects:u,recordAudit:p,sendSlackNotification:y}=await g(async()=>{const{saveProspect:f,fetchProspects:A,recordAudit:$,sendSlackNotification:P}=await Promise.resolve().then(()=>w);return{saveProspect:f,fetchProspects:A,recordAudit:$,sendSlackNotification:P}},void 0);await d(l)?(a&&await y("new_prospect",`新規見込客: ${l.companyName} / 想定 ¥${l.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await p({action:a?"prospect_create":"prospect_update",entityType:"prospect",entityId:o,userEmail:s.user?.email}),s.prospects=await u(),s.prospectEditingId=null,h()):k("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await te("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const o=a.dataset.id??"",{deleteProspect:l,fetchProspects:d}=await g(async()=>{const{deleteProspect:u,fetchProspects:p}=await Promise.resolve().then(()=>w);return{deleteProspect:u,fetchProspects:p}},void 0);await l(o)&&(s.prospects=await d(),h())})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",o=e.querySelector("#prospect-activity-type")?.value??"call",l=e.querySelector("#prospect-activity-title")?.value??"";if(!l){k("内容を入力してください","warning");return}const{saveProspectActivity:d,fetchProspectActivities:u}=await g(async()=>{const{saveProspectActivity:p,fetchProspectActivities:y}=await Promise.resolve().then(()=>w);return{saveProspectActivity:p,fetchProspectActivities:y}},void 0);await d({id:`act_${Date.now()}`,prospectId:a,activityType:o,title:l,activityDate:new Date().toISOString(),staffCode:s.myProfile?.staffCode}),s.prospectActivities=await u(a),h()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("dragstart",o=>{o.dataTransfer?.setData("text/plain",a.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(a=>{a.addEventListener("dragover",o=>o.preventDefault()),a.addEventListener("drop",async o=>{o.preventDefault();const l=o.dataTransfer?.getData("text/plain"),d=a.dataset.prospectStage;if(!l)return;const u=s.prospects.find(p=>p.id===l);if(u&&u.stage!==d){const p={...u,stage:d},{saveProspect:y}=await g(async()=>{const{saveProspect:v}=await Promise.resolve().then(()=>w);return{saveProspect:v}},void 0);await y(p),u.stage=d,h()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:a,saveIntegrationSetting:o}=await g(async()=>{const{fetchIntegrationSettings:v,saveIntegrationSetting:f}=await Promise.resolve().then(()=>w);return{fetchIntegrationSettings:v,saveIntegrationSetting:f}},void 0),d=(s.integrations.length>0?s.integrations:await a()).find(v=>v.provider==="slack");if(!d)return;const u=e.querySelector("#slack-webhook")?.value??"",p=e.querySelector("#slack-default-channel")?.value??"",y=e.querySelector("#slack-enabled")?.checked??!1;await o({...d,config:{...d.config,webhook_url:u,default_channel:p},isEnabled:y}),s.integrations=await a(),k("保存しました"),h()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:a,fetchSlackRules:o}=await g(async()=>{const{saveSlackRule:l,fetchSlackRules:d}=await Promise.resolve().then(()=>w);return{saveSlackRule:l,fetchSlackRules:d}},void 0);for(const l of s.slackRules){const d=e.querySelector(`[data-slack-rule-id="${l.id}"][data-slack-field="enabled"]`)?.checked??l.enabled,u=e.querySelector(`[data-slack-rule-id="${l.id}"][data-slack-field="channel"]`)?.value??l.channel;await a({...l,enabled:d,channel:u})}s.slackRules=await o(),k("ルールを保存しました"),h()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:a}=await g(async()=>{const{sendSlackNotification:l}=await Promise.resolve().then(()=>w);return{sendSlackNotification:l}},void 0),o=await a("new_order","🧪 これはテスト通知です (syusen-cloud)");o.ok?k("テスト送信成功"):k("送信失敗: "+(o.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{s.materialEditing=null,s.materialEditingIsNew=!0,h()}),e.querySelectorAll("[data-action='material-adjust']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.id??"",l=s.materialList.find(d=>d.id===o);l&&(s.materialEditing=l,s.materialEditingIsNew=!1,h())})}),e.querySelectorAll("[data-action='material-close']").forEach(a=>{a.addEventListener("click",o=>{o.currentTarget!==o.target&&!o.target.matches("button")||(s.materialEditing=null,s.materialEditingIsNew=!1,h())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const o={id:s.materialEditingIsNew?`mat_${Date.now()}`:s.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(o.materialType=e.querySelector("#mat-type")?.value??"",!o.code||!o.name){k("コードと品名は必須です","warning");return}const{saveMaterial:l,fetchMaterialList:d}=await g(async()=>{const{saveMaterial:p,fetchMaterialList:y}=await Promise.resolve().then(()=>w);return{saveMaterial:p,fetchMaterialList:y}},void 0);await l(o)?(s.materialList=await d(),s.materialEditing=null,s.materialEditingIsNew=!1,k("保存しました"),h()):k("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!a||!await te("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:o,fetchMaterialList:l}=await g(async()=>{const{deleteMaterial:d,fetchMaterialList:u}=await Promise.resolve().then(()=>w);return{deleteMaterial:d,fetchMaterialList:u}},void 0);await o(a)&&(s.materialList=await l(),s.materialEditing=null,h())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{s.userEditingId="__new__",h()}),e.querySelectorAll("[data-action='user-edit']").forEach(a=>{a.addEventListener("click",()=>{s.userEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{s.userEditingId=null,h()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const a=s.userEditingId==="__new__",o=a?crypto.randomUUID():s.userEditingId??"",l=e.querySelector("#user-email")?.value.trim()??"",d=e.querySelector("#user-name")?.value.trim()??"";if(!l||!d){k("名前とメールアドレスは必須です","warning");return}const u={id:o,email:l,displayName:d,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(a){const A=e.querySelector("#user-password")?.value??"";if(A.length<8){k("パスワードは8文字以上必要です","warning");return}try{await zt(l,A)}catch($){k("Auth登録失敗: "+($ instanceof Error?$.message:""),"error");return}}const{saveUserProfile:p,fetchUserProfiles:y,recordAudit:v}=await g(async()=>{const{saveUserProfile:A,fetchUserProfiles:$,recordAudit:P}=await Promise.resolve().then(()=>w);return{saveUserProfile:A,fetchUserProfiles:$,recordAudit:P}},void 0);await p(u)?(await v({action:a?"user_create":"user_update",entityType:"user",entityId:o,userEmail:s.user?.email}),s.userProfiles=await y(),s.userEditingId=null,k("保存しました"),h()):k("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await te("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const o=a.dataset.id??"",{deleteUserProfile:l,fetchUserProfiles:d,recordAudit:u}=await g(async()=>{const{deleteUserProfile:y,fetchUserProfiles:v,recordAudit:f}=await Promise.resolve().then(()=>w);return{deleteUserProfile:y,fetchUserProfiles:v,recordAudit:f}},void 0);await l(o)?(await u({action:"user_delete",entityType:"user",entityId:o,userEmail:s.user?.email}),s.userProfiles=await d(),h()):k("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!s.myProfile)return;const a=e.querySelector("#profile-sender")?.value??"",o={...s.myProfile,defaultMailSenderId:a},{saveUserProfile:l}=await g(async()=>{const{saveUserProfile:d}=await Promise.resolve().then(()=>w);return{saveUserProfile:d}},void 0);await l(o),s.myProfile=o,k("保存しました"),h()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const a=e.querySelector("#profile-new-password")?.value??"";if(a.length<8){k("8文字以上のパスワードを入力してください","warning");return}try{await qs(a),k("パスワードを変更しました")}catch(o){k("変更失敗: "+(o instanceof Error?o.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(a=>{a.addEventListener("click",()=>{s.integrationEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{s.integrationEditingId=null,h()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='int-save']")?.dataset.id??"",o=s.integrations.find(v=>v.id===a);if(!o)return;const l={...o.config};Object.keys(l).forEach(v=>{const f=e.querySelector(`#int-${v}`);f&&(l[v]=f.value)});const d=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:u,fetchIntegrationSettings:p}=await g(async()=>{const{saveIntegrationSetting:v,fetchIntegrationSettings:f}=await Promise.resolve().then(()=>w);return{saveIntegrationSetting:v,fetchIntegrationSettings:f}},void 0);await u({...o,config:l,isEnabled:d})?(s.integrations=await p(),s.integrationEditingId=null,k("保存しました"),h()):k("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(a=>{a.addEventListener("click",async()=>{const o=s.integrations.find(p=>p.provider==="shopify");if(!o){k("Shopify連携が未設定です","warning");return}a.textContent="同期中…",a.disabled=!0;const{syncShopifyOrders:l,fetchShopifyOrders:d}=await g(async()=>{const{syncShopifyOrders:p,fetchShopifyOrders:y}=await Promise.resolve().then(()=>w);return{syncShopifyOrders:p,fetchShopifyOrders:y}},void 0),u=await l(o);u.error?k("同期失敗: "+u.error,"error"):(k(`${u.count}件を同期しました`),s.shopifyOrders=await d()),h()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(a=>{a.addEventListener("click",async()=>{const o=s.integrations.find(p=>p.provider==="google_calendar");if(!o)return;a.textContent="同期中…",a.disabled=!0;const{syncGoogleCalendar:l,fetchCalendarEvents:d}=await g(async()=>{const{syncGoogleCalendar:p,fetchCalendarEvents:y}=await Promise.resolve().then(()=>w);return{syncGoogleCalendar:p,fetchCalendarEvents:y}},void 0),u=await l(o);u.error?k("同期失敗: "+u.error,"error"):(k(`${u.count}件を同期しました`),s.calendarEvents=await d(s.calendarYearMonth)),h()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const o=e.querySelector("#fax-file")?.files?.[0];if(!o){k("FAX画像を選択してください","warning");return}const l=s.integrations.find(d=>d.provider==="cloud_vision");if(!l||!l.config.api_key){k("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}s.faxProcessing=!0,s.faxOcrText=null,h();try{const d=new FileReader;d.onload=async()=>{const u=String(d.result??""),{ocrFaxImage:p,saveFaxRecord:y,fetchFaxInbox:v}=await g(async()=>{const{ocrFaxImage:P,saveFaxRecord:x,fetchFaxInbox:q}=await Promise.resolve().then(()=>w);return{ocrFaxImage:P,saveFaxRecord:x,fetchFaxInbox:q}},void 0),f=await p(l,u),A=e.querySelector("#fax-sender-name")?.value??"",$=e.querySelector("#fax-sender-phone")?.value??"";await y({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:A,senderPhone:$,ocrStatus:f.error?"failed":"done",ocrText:f.text}),s.faxOcrText=f.error?`エラー: ${f.error}`:f.text,s.faxRecords=await v(),s.faxProcessing=!1,h()},d.readAsDataURL(o)}catch(d){k("OCR失敗: "+(d instanceof Error?d.message:""),"error"),s.faxProcessing=!1,h()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{s.mailSenderEditingId="__new__",h()}),e.querySelectorAll("[data-action='ms-edit']").forEach(a=>{a.addEventListener("click",()=>{s.mailSenderEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{s.mailSenderEditingId=null,h()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,o={id:a,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:s.mailSenders.find(p=>p.id===a)?.isVerified??!1};if(!o.name||!o.email){k("名前とメールアドレスは必須です","warning");return}const{saveMailSender:l,fetchMailSenders:d}=await g(async()=>{const{saveMailSender:p,fetchMailSenders:y}=await Promise.resolve().then(()=>w);return{saveMailSender:p,fetchMailSenders:y}},void 0);await l(o)?(s.mailSenders=await d(),s.mailSenderEditingId=null,k("保存しました"),h()):k("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await te("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const o=a.dataset.id??"",{deleteMailSender:l,fetchMailSenders:d}=await g(async()=>{const{deleteMailSender:p,fetchMailSenders:y}=await Promise.resolve().then(()=>w);return{deleteMailSender:p,fetchMailSenders:y}},void 0);await l(o)?(s.mailSenders=await d(),h()):k("削除失敗","error")})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(a=>{a.addEventListener("click",async()=>{s.calendarYearMonth=a.dataset.ym??s.calendarYearMonth;const{fetchCalendarEvents:o}=await g(async()=>{const{fetchCalendarEvents:l}=await Promise.resolve().then(()=>w);return{fetchCalendarEvents:l}},void 0);s.calendarEvents=await o(s.calendarYearMonth),h()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async a=>{s.calendarYearMonth=a.target.value;const{fetchCalendarEvents:o}=await g(async()=>{const{fetchCalendarEvents:l}=await Promise.resolve().then(()=>w);return{fetchCalendarEvents:l}},void 0);s.calendarEvents=await o(s.calendarYearMonth),h()}),e.querySelector("#cal-filter-category")?.addEventListener("change",a=>{s.calendarFilterCategory=a.target.value,h()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const a=new Date;s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(a.getTime()+3600*1e3).toISOString(),isAllDay:!1}},h()}),e.querySelectorAll("[data-cal-date]").forEach(a=>{a.tagName!=="BUTTON"&&a.addEventListener("click",o=>{if(o.target.closest(".cal-event"))return;const l=a.dataset.calDate??"";s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${l}T10:00:00`,isAllDay:!1}},h()})}),e.querySelectorAll("[data-cal-event-id]").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation();const l=a.dataset.calEventId,d=s.calendarEvents.find(u=>u.id===l);d&&(s.calendarEdit={isOpen:!0,isNew:!1,event:{...d}},h())})}),e.querySelectorAll("[data-action='cal-close']").forEach(a=>{a.addEventListener("click",o=>{o.currentTarget!==o.target&&!o.target.matches("button")||(s.calendarEdit=null,h())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!s.calendarEdit)return;const{saveCalendarEvent:a,fetchCalendarEvents:o,CALENDAR_CATEGORY_COLORS:l}=await g(async()=>{const{saveCalendarEvent:v,fetchCalendarEvents:f,CALENDAR_CATEGORY_COLORS:A}=await Promise.resolve().then(()=>w);return{saveCalendarEvent:v,fetchCalendarEvents:f,CALENDAR_CATEGORY_COLORS:A}},void 0),d=document.querySelector("[data-action='cal-save']")?.dataset.id||s.calendarEdit.event.id||`evt_${Date.now()}`,u=e.querySelector("#cal-category")?.value??"general",p={id:d,title:e.querySelector("#cal-title")?.value??"",category:u,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:l[u]};if(!p.title){k("タイトルは必須です","warning");return}await a(p)?(s.calendarEvents=await o(s.calendarYearMonth),s.calendarEdit=null,k("保存しました"),h()):k("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!a||!await te("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:o,fetchCalendarEvents:l}=await g(async()=>{const{deleteCalendarEvent:u,fetchCalendarEvents:p}=await Promise.resolve().then(()=>w);return{deleteCalendarEvent:u,fetchCalendarEvents:p}},void 0);await o(a)?(s.calendarEvents=await l(s.calendarYearMonth),s.calendarEdit=null,k("削除しました"),h()):k("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(s.importPreview){s.importing=!0,h();try{const a=s.importPreview.rows.filter(l=>l._valid),o=await bl(s.importEntity,a);s.importResult=`取り込み完了: ${o.inserted}件成功 / ${o.failed}件失敗`,s.importPreview=null}catch(a){s.importResult=`エラー: ${a instanceof Error?a.message:String(a)}`}finally{s.importing=!1,h()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const a=e.querySelector("#store-date")?.value??s.storeSalesDate;s.storeSalesDate=a,s.storeSales=[],s.actionLoading=!0,h(),Tt(a).then(o=>{s.storeSales=o,s.actionLoading=!1,h()})}),e.querySelectorAll("[data-action='copy-config']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.configValue??"";if(o)try{await navigator.clipboard.writeText(o),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(l){console.warn("Clipboard copy failed",l)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const o=JSON.stringify({supabase_url:Y,supabase_anon_key:B,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),l=new Blob([o],{type:"application/json;charset=utf-8"}),d=URL.createObjectURL(l),u=document.createElement("a");u.href=d,u.download="relay_config.json",u.click(),URL.revokeObjectURL(d)}),e.querySelectorAll("[data-action='copy-code']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.code??"";if(o)try{await navigator.clipboard.writeText(decodeURIComponent(o)),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(l){console.warn("Clipboard code copy failed",l)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(a=>{a.addEventListener("change",()=>{de(e),s.emailSaveMessage=null,h()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(a=>{a.addEventListener("change",()=>{de(e),s.emailSaveMessage=null,h()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{de(e),s.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{de(e),s.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(a=>{a.addEventListener("click",()=>{s.emailTemplateId=a.dataset.templateId??"custom";const o=bs(s.emailTemplateId);s.emailSubject=o.subject,s.emailBody=o.body,s.emailSaveMessage=null,h()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{de(e);const a=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;s.emailBody.includes("https://kaneishuzo.co.jp/products")||(s.emailBody=`${s.emailBody.trimEnd()}${a}`),s.emailSaveMessage=null,h()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{de(e),s.actionLoading=!0,h(),Je(mt("draft")).then(a=>{s.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(a.updatedAt??new Date().toISOString()))}`,s.actionLoading=!1,h()})}),e.querySelector("#email-sender")?.addEventListener("change",a=>{s.emailSenderId=a.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{de(e),s.actionLoading=!0,s.emailSending=!0,h();const a=mt("sent");s.mailSenders.find(o=>o.id===s.emailSenderId),Ka().then(async o=>{await Je({...a,recipientCount:o.sent}),s.emailSaveMessage=`${o.sent.toLocaleString("ja-JP")} 件送信しました。`,s.actionLoading=!1,s.emailSending=!1,h(),k(`${o.sent}件送信完了`)}).catch(async()=>{await Je(mt("draft")),s.emailSaveMessage="APIキー未設定のため下書きを保存しました。",s.actionLoading=!1,s.emailSending=!1,h(),k("APIキー未設定のため下書き保存しました","warning")})})}function h(){const e=document.querySelector("#app");if(!e)return;e.innerHTML=yr(),fr(e),s.pickerMode&&e.querySelector("#modal-search")?.focus(),s.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Mt()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const n of["fd-scaler","print-scaler"]){const i=e.querySelector(`#${n}`),r=i?.querySelector(".fd-canvas, .print-preview"),c=r?.querySelector(".print-page")??r;if(!i||!c)continue;const a=i.parentElement?.clientWidth??0,o=c.offsetWidth;if(a>0&&o>0&&o>a-24){const l=(a-24)/o;i.style.transform=`scale(${l})`,i.style.transformOrigin="top left",i.style.height=`${(c.offsetHeight+48)*l}px`}else i.style.transform="",i.style.height=""}});const t=s.sidebarOpen||s.pickerMode!==null||s.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const xs="sake-cloud-cache",br=1800*1e3;function gr(){try{const e={ts:Date.now(),salesSummary:s.salesSummary,paymentStatus:s.paymentStatus,masterStats:s.masterStats,pipelineMeta:s.pipelineMeta,salesAnalytics:s.salesAnalytics};localStorage.setItem(xs,JSON.stringify(e))}catch{}}function $r(){try{const e=localStorage.getItem(xs);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>br?!1:(t.salesSummary&&(s.salesSummary=t.salesSummary),t.paymentStatus&&(s.paymentStatus=t.paymentStatus),t.masterStats&&(s.masterStats=t.masterStats),t.pipelineMeta&&(s.pipelineMeta=t.pipelineMeta),t.salesAnalytics&&(s.salesAnalytics=t.salesAnalytics),!0)}catch{return!1}}let As=0;async function be(){const e=$r();e&&(s.loading=!1,h()),s.loading=!e,e||h();try{const[t,n,i,r,c,a,o,l]=await Promise.all([Sa(),xa(),Ye(),Aa(),He(s.invoiceFilter),Ct(s.ledgerCustomerCode),Ea(),Pa()]);if(s.salesSummary=t,s.paymentStatus=n,s.masterStats=i,s.pipelineMeta=r,s.invoiceRecords=c,s.customerLedger=a,s.salesAnalytics=o,s.syncDashboard=l,Da().then(d=>{s.announcements=d,h()}),fe.length===0&&Wl(),s.rawTableList.length===0&&ns().then(d=>{s.rawTableList=d,s.route==="/raw-browser"&&h()}),!s.salesFilter.startDate||!s.salesFilter.endDate){const u=[...t.salesRecords].sort((v,f)=>new Date(f.date).getTime()-new Date(v.date).getTime())[0]?.date??new Date().toISOString(),p=new Date(u),y=new Date(p);y.setDate(p.getDate()-30),s.salesFilter={startDate:fa(y.toISOString()),endDate:fa(p.toISOString())}}(!s.invoiceFilter.startDate||!s.invoiceFilter.endDate)&&(s.invoiceFilter={...s.invoiceFilter,startDate:s.salesFilter.startDate,endDate:s.salesFilter.endDate},s.invoiceRecords=await He(s.invoiceFilter)),s.error=null,gr()}catch(t){e||(s.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{s.loading=!1,h(),Ft(s.route),As=Date.now()}}window.addEventListener("popstate",()=>{s.route=gs(location.pathname),s.currentCategory=jt(s.route),s.sidebarOpen=!1,Le(),Ft(s.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),s.globalSearchOpen=!0,h();return}if(e.key==="Escape"){if(s.globalSearchOpen){Le(),h();return}if(s.pickerMode){Ke(),h();return}s.route==="/invoice-entry"&&!s.invoiceSaving&&($s(),h());return}if(s.route==="/invoice-entry"&&!s.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&ws(t)}});s.user=Ze()?Ts():null;s.user?.email&&(async()=>{const{fetchMyProfile:e}=await g(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>w);return{fetchMyProfile:t}},void 0);s.myProfile=await e(s.user.email),h()})();try{const e=localStorage.getItem("sake_print_options");e&&(s.printOptions={...s.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(s.printCompany={...s.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(s.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,i=0,r=0,c=0,a=1;document.addEventListener("mousedown",o=>{const l=o.target.closest(".fd-draggable");if(!l||!s.fdDesignMode)return;o.preventDefault();const d=l.closest(".fd-canvas");if(!d)return;const u=d.getBoundingClientRect();if(u.width===0)return;a=228.6/u.width,t=l,n=o.clientX,i=o.clientY,r=parseFloat(l.style.left)||0,c=parseFloat(l.style.top)||0,document.querySelectorAll(".fd-active").forEach(f=>f.classList.remove("fd-active")),l.classList.add("fd-active","fd-dragging"),s.fdActiveFieldId=l.dataset.fdId??null;const p=document.querySelector("#fd-selected-info");p&&(p.textContent=`選択中: ${l.title}`);const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(r)),v&&(v.value=String(c))}),document.addEventListener("mousemove",o=>{if(!t)return;const l=(o.clientX-n)*a,d=(o.clientY-i)*a,u=Math.round((r+l)*2)/2,p=Math.round((c+d)*2)/2;t.style.left=u+"mm",t.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),v&&(v.value=String(p))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",o=>{if(!s.fdDesignMode||!s.fdActiveFieldId||o.key!=="ArrowLeft"&&o.key!=="ArrowRight"&&o.key!=="ArrowUp"&&o.key!=="ArrowDown"||o.target.tagName==="INPUT"||o.target.tagName==="TEXTAREA")return;const l=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);if(!l)return;o.preventDefault();const d=.5;let u=parseFloat(l.style.left)||0,p=parseFloat(l.style.top)||0;o.key==="ArrowLeft"?u-=d:o.key==="ArrowRight"?u+=d:o.key==="ArrowUp"?p-=d:o.key==="ArrowDown"&&(p+=d),l.style.left=u+"mm",l.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),v&&(v.value=String(p))})})();function Ps(e){const t=window.google?.maps;if(!t){e.innerHTML='<div style="padding:40px;text-align:center;color:var(--text-secondary);">Google Maps 読込中…</div>',setTimeout(()=>Ps(e),500);return}e.innerHTML="";const n=new t.Map(e,{center:{lat:35.45,lng:139.4},zoom:10,mapId:"sake-system-map",gestureHandling:"greedy"}),i=new t.InfoWindow;function r(c,a,o,l,d){const u=new t.marker.AdvancedMarkerElement({map:n,position:{lat:c,lng:a},content:(()=>{const p=document.createElement("div");return p.style.cssText=`background:${o};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-weight:700;font-size:11px;cursor:pointer;`,p.textContent=l,p})()});u.addListener("click",()=>{i.setContent(d),i.open({anchor:u,map:n})})}s.mapFilters.showCustomers&&(s.masterStats?.customers??[]).forEach(a=>{!a.lat||!a.lng||s.mapFilters.filterBusinessType&&a.businessType!==s.mapFilters.filterBusinessType||r(a.lat,a.lng,"#2196F3","既",`<div style="min-width:180px;"><strong>${a.name}</strong><br/><span style="color:#666;font-size:11px;">${a.code}</span><br/>既存取引先<br/>締日${a.closingDay}日 / 支払日${a.paymentDay}日${a.address1?`<br/>${a.address1}`:""}</div>`)}),s.mapFilters.showProspects&&s.prospects.forEach(c=>{if(!c.lat||!c.lng||s.mapFilters.filterBusinessType&&c.businessType!==s.mapFilters.filterBusinessType)return;const a=c.stage==="hot"||c.stage==="negotiating"?"#EF5350":c.stage==="won"?"#66BB6A":"#4CAF50";r(c.lat,c.lng,a,"新",`<div style="min-width:200px;"><strong>${c.companyName}</strong><br/><span style="color:#666;font-size:11px;">${c.contactName??""}</span><br/>新規見込客 (${c.stage})<br/>想定 ¥${c.expectedAmount.toLocaleString("ja-JP")} / 確度 ${c.probability}%${c.nextAction?`<br/>${c.nextAction}`:""}</div>`)}),s.mapFilters.showDelivery&&s.deliveryLocations.forEach(c=>{!c.lat||!c.lng||r(c.lat,c.lng,"#FF9800","納",`<div style="min-width:180px;"><strong>${c.name}</strong><br/>納品先${c.customerCode?` (${c.customerCode})`:""}<br/>${c.address??""}${c.contactName?`<br/>${c.contactName}`:""}${c.deliveryNote?`<br/>${c.deliveryNote}`:""}</div>`)})}be();const _r=300*1e3;setInterval(()=>{s.route==="/"&&!s.loading&&!document.hidden&&be()},_r);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-As>180*1e3&&be()});let kt="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{kt=e}).catch(()=>{});setInterval(async()=>{if(!(!kt||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==kt&&!s.updateAvailable&&(s.updateAvailable=!0,h())}catch{}},120*1e3);
