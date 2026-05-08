(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const oi="modulepreload",ri=function(e){return"/"+e},ms={},N=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(h=>Promise.resolve(h).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");r=u(n.map(y=>{if(y=ri(y),y in ms)return;ms[y]=!0;const h=y.endsWith(".css"),g=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${g}`))return;const $=document.createElement("link");if($.rel=h?"stylesheet":oi,h||($.as="script"),$.crossOrigin="",$.href=y,d&&$.setAttribute("nonce",d),document.head.appendChild($),h)return new Promise((_,S)=>{$.addEventListener("load",_),$.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${y}`)))})}))}function i(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return r.then(c=>{for(const d of c||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})},$e="https://ridspyczkxwkcbmwndhm.supabase.co",ii="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",ie=ii;async function Ae(e,t){try{const n=new URL(`/rest/v1/${e}`,$e),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function qt(e,t){try{const n=new URL(`/rest/v1/${e}`,$e),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function He(e,t,n){try{const s=new URL(`/rest/v1/${e}?id=eq.${t}`,$e);return(await fetch(s.toString(),{method:"PATCH",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function be(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,$e),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function In(e){try{const t=new URL(`/rest/v1/${e}`,$e);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const s=n.headers.get("Content-Range");if(s){const r=s.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function Y(e,t={}){try{const n=new URL(`/rest/v1/${e}`,$e);Object.entries(t).forEach(([r,i])=>{n.searchParams.set(r,i)});const s=await fetch(n.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"return=representation"}});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function Mn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,$e);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})).ok}catch{return!1}}async function ve(e,t={},n=1e3){const s=[];let r=0;try{for(;;){const i=new URL(`/rest/v1/${e}`,$e);Object.entries(t).forEach(([u,y])=>{i.searchParams.set(u,y)}),i.searchParams.set("limit",String(n)),i.searchParams.set("offset",String(r));const c=await fetch(i.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const d=await c.json();if(s.push(...d),d.length<n)break;r+=n}return s}catch(i){return console.warn(`Failed to query all rows from Supabase table ${e}`,i),s.length>0?s:[]}}const te=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ie,SUPABASE_URL:$e,supabaseCount:In,supabaseDelete:Mn,supabaseInsert:Ae,supabaseQuery:Y,supabaseQueryAll:ve,supabaseRpc:be,supabaseUpdate:He,supabaseUpsert:qt},Symbol.toStringTag,{value:"Module"})),Nn="sake_auth";function yo(e){localStorage.setItem(Nn,JSON.stringify(e))}function ho(){return{apikey:ie,"Content-Type":"application/json"}}function li(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function fo(e,t){const n=await fetch(`${$e}/auth/v1/${e}`,{method:"POST",headers:ho(),body:JSON.stringify(t)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function ci(e,t){const n=await fo("token?grant_type=password",{email:e,password:t});return yo({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function ys(e,t){const n=await fo("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&yo({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function di(){const e=Oa();if(localStorage.removeItem(Nn),!!e?.access_token)try{await fetch(`${$e}/auth/v1/logout`,{method:"POST",headers:{...ho(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Oa(){const e=localStorage.getItem(Nn);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function go(){const e=Oa();if(!e)return null;const t=li(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function pi(e){const t=Oa();if(!t)throw new Error("not signed in");const n=await fetch(`${$e}/auth/v1/user`,{method:"PUT",headers:{apikey:ie,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const s=await n.json().catch(()=>({}));throw new Error(s.msg??`HTTP ${n.status}`)}}const Rn={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},vo={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},ui={generatedAt:new Date().toISOString(),records:[]},it={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},mi={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},yi={},hi={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function pe(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function fi(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function gi(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function v(e,t,n=""){for(const s of t){const r=e[s];if(typeof r=="string"&&r.length>0)return r}return n}function T(e,t,n=0){for(const s of t)if(s in e)return pe(e[s]);return n}function _e(e,t,n=!0){for(const s of t)if(s in e)return gi(e[s]);return n}function Se(e,t,n){for(const s of t){const r=e[s];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const i=new Date(r);if(!Number.isNaN(i.getTime()))return i.toISOString()}return n}function vi(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:Se(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:pe(e.total_amount??e.billed_amount)}}function hs(e){const t=e.trim().toUpperCase(),n=yi[t];if(n)return n;const s=vo.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function bo(e){try{return(await Y("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function St(e,t){await qt("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function wo(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await Y("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),s=new Map;for(const i of n){const c=String(i.sales_date??"");if(!c)continue;const d=s.get(c)??{amount:0,qty:0,docs:0};d.amount+=pe(i.sales_amount),d.qty+=pe(i.total_quantity),d.docs+=pe(i.document_count),s.set(c,d)}const r=Array.from(s.entries()).map(([i,c])=>({sales_date:i,sales_amount:c.amount,amount:c.amount,document_count:c.docs,bottles:c.qty,volume_ml:0,price_per_bottle:c.qty>0?Math.round(c.amount/c.qty):0,price_per_liter:0})).sort((i,c)=>c.sales_date.localeCompare(i.sales_date));if(r.length>0){const i=new Date().toISOString().slice(0,7);ko(i).catch(()=>{});const[c,d]=await Promise.all([Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),Y("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),y=new Date().toISOString().slice(0,10),h=y.slice(0,7),g=[...r].sort((E,o)=>E.sales_date.localeCompare(o.sales_date)).map(E=>({date:new Date(`${E.sales_date}T00:00:00Z`).toISOString(),amount:pe(E.amount??E.sales_amount),bottles:pe(E.bottles),volumeMl:pe(E.volume_ml),pricePerBottle:pe(E.price_per_bottle),pricePerLiter:pe(E.price_per_liter)})),$=g.slice(-30),_=E=>pe(E.amount??E.sales_amount),S=r.reduce((E,o)=>o.sales_date===y?E+_(o):E,0),C=r.reduce((E,o)=>o.sales_date.startsWith(h)?E+_(o):E,0),k=c.filter(E=>pe(E.balance_amount)>0),L=d.map((E,o)=>({id:String(E.id??`sale-${o+1}`),documentNo:E.document_no??E.legacy_document_no??"",date:E.sales_date??"",customerCode:E.legacy_customer_code??"",customerName:E.customer_name??E.legacy_customer_code??"",amount:pe(E.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:S,todayDelta:0,monthSales:C,monthDelta:0,unpaidCount:k.length,unpaidAmount:k.reduce((E,o)=>E+pe(o.balance_amount),0)},dailySales:$,allDailySales:g,salesRecords:L}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),vo}async function xo(){const e=await Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const s=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:pe(t.billed_amount),paymentAmount:pe(t.paid_amount),balanceAmount:pe(t.balance_amount),lastPaymentDate:null,status:fi(t.payment_status)}})}:ui}async function On(){const[e,t]=await Promise.all([Y("customers",{limit:"1000"}),Y("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((r,i)=>{const c=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:v(r,["id","customer_id","code"],`customer-${i+1}`),code:v(r,["code","customer_code","legacy_customer_code"],`C${String(i+1).padStart(4,"0")}`),name:v(r,["name","customer_name","display_name"],`Customer ${i+1}`),kanaName:v(r,["kana_name"],""),shortName:v(r,["short_name"],""),postalCode:v(r,["postal_code"],""),address1:v(r,["address1"],""),address2:v(r,["address2"],""),phone:v(r,["phone"],""),fax:v(r,["fax"],""),email:v(r,["email"],""),staffCode:v(r,["staff_code"],""),businessType:v(r,["business_type"],""),areaCode:v(r,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:T(r,["closing_day","close_day"],31),paymentDay:T(r,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:v(r,["payment_cycle"],""),billingCycleType:v(r,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:T(r,["credit_limit"],0),taxMode:v(r,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:v(r,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),tradeType:(()=>{const d=v(r,["trade_type"],"");if(d)return d;const u=String(c.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:v(r,["bank_name"],""),bankBranch:v(r,["bank_branch"],""),bankAccount:v(r,["bank_account"],""),isActive:_e(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):it.customers,s=t.length?t.map((r,i)=>({id:v(r,["id","product_id","product_code","legacy_product_code"],`product-${i+1}`),code:v(r,["product_code","legacy_product_code","code"],`P${String(i+1).padStart(5,"0")}`),janCode:v(r,["jan_code","jan","barcode"],""),name:v(r,["name","product_name","display_name"],`Product ${i+1}`),kanaName:v(r,["kana_name"],""),shortName:v(r,["short_name"],""),category:v(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:v(r,["tax_code","tax_category_code"],""),isActive:_e(r,["is_active","active","enabled"],!0),listPrice:T(r,["list_price"],0),purchasePrice:T(r,["purchase_price"],0),salePrice:T(r,["default_sale_price","sale_price"],0),costPrice:T(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:v(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:v(r,["bottle_type"],""),containerCode:v(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:v(r,["rice_type"],""),season:v(r,["season"],""),agingYears:T(r,["aging_years"],0)})):it.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||it.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:it.summary.activeCustomerCount,productCount:t.length||it.summary.productCount,activeProductCount:t.length?s.filter(r=>r.isActive).length:it.summary.activeProductCount},customers:n,products:s}}return it}async function $o(){const[e,t]=await Promise.all([Y("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),Y("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?Se(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const s=e[0],r=v(s,["status"],"success"),i=s.errors,c=Array.isArray(i)?i.length>0:!!i;return{generatedAt:new Date().toISOString(),lastSyncAt:Se(s,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":r==="error"?"error":"success",jobName:v(s,["agent_hostname"],"sake-relay"),message:`${T(s,["rows_upserted"],0)}行同期 / ${T(s,["files_updated"],0)}ファイル更新`}}return{...mi,lastDataAt:n}}async function _o(){const e=await be("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function So(){const e=[{name:"売上明細 (SHTOR)",table:"sales_document_lines",countFilter:"note=like.*src:diff*",expectMin:2e5},{name:"伝票ヘッダ (SHDEN)",table:"sales_document_headers",expectMin:5e4},{name:"日次売上集計",table:"daily_sales_fact",expectMin:1e5},{name:"商品月別売上",table:"product_monthly_sales",expectMin:1e4},{name:"得意先マスタ",table:"customers",expectMin:500},{name:"商品マスタ",table:"products",expectMin:1e3},{name:"安全在庫",table:"product_safety_stock_params",expectMin:0}],t=[];for(const n of e)try{const s=n.countFilter?`&${n.countFilter}`:"",r=`${$e}/rest/v1/${n.table}?select=id&limit=0${s}`,c=(await fetch(r,{headers:{apikey:ie,Authorization:`Bearer ${ie}`,Prefer:"count=exact"}})).headers.get("content-range")??"*/0",d=parseInt(c.split("/").pop()??"0",10)||0,u=d>=n.expectMin?"ok":d>0?"warn":"error";t.push({name:n.name,table:n.table,count:d,status:u,detail:d>=n.expectMin?"正常稼働":d>0?"データ少":"データなし"})}catch{t.push({name:n.name,table:n.table,count:0,status:"error",detail:"接続エラー"})}return t}async function Xt(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];if(e.customerCode.trim()){const r=e.customerCode.trim();n.push(`customer_code.ilike.*${r}*`,`legacy_customer_code.ilike.*${r}*`,`customer_name.ilike.*${r}*`)}e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const s=await Y("sales_document_headers",t);return s.length>0?s.map((r,i)=>({id:v(r,["id"],`invoice-${i}`),documentNo:v(r,["document_no","legacy_document_no"],""),date:Se(r,["sales_date"],""),customerCode:v(r,["legacy_customer_code","customer_code"],""),customerName:v(r,["customer_name","legacy_customer_code"],""),itemCount:T(r,["line_count"],0),amount:T(r,["total_amount","billed_amount"],0)})):[]}const Yt=new Map;async function ko(e){Yt.clear();const t=await ve("sales_document_lines",{select:"document_no,line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*date:${e}*`,order:"document_no,line_no"});for(const n of t){const s=v(n,["document_no"],"");if(!s)continue;const r=Yt.get(s)??[];r.push({lineNo:T(n,["line_no"],0),productCode:v(n,["legacy_product_code"],""),productName:v(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0)}),Yt.set(s,r)}}async function gn(e){const t=Yt.get(e);if(t)return t;const s=(await Y("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*inv:${e} *`,order:"line_no",limit:"100"})).map(r=>({lineNo:T(r,["line_no"],0),productCode:v(r,["legacy_product_code"],""),productName:v(r,["product_name"],""),quantity:T(r,["quantity"],0),unitPrice:T(r,["unit_price"],0),amount:T(r,["amount"],0)}));return Yt.set(e,s),s}async function Bn(e){const t=e.trim().toUpperCase();if(!t)return hs("");const[n,s,r]=await Promise.all([Y("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t},customer_name.ilike.*${t}*`,order:"sales_date.desc",limit:"50"}),Y("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||s.length>0){const i=n.map((u,y)=>{const h=vi(u,y);return{id:h.id,date:h.date,documentNo:h.documentNo,amount:h.amount}}),c=s.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:Se(u,["payment_date","received_date"],new Date().toISOString()),amount:pe(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),d=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:pe(d?.balance_amount),salesTotal:i.reduce((u,y)=>u+y.amount,0),paymentTotal:c.reduce((u,y)=>u+y.amount,0),salesHistory:i,paymentHistory:c}}return hs(t)}async function jn(){const[e,t,n,s]=await Promise.all([Y("mv_monthly_sales",{order:"month.asc"}),Y("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),Y("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),Y("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:v(r,["month"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),volumeMl:T(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),staffTotals:s.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:0}))}:hi}async function bi(e,t,n){if(t==="all")return[];const s=n?Po(t,n):null,i=await be(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:s?.from??null,p_date_to:s?.to??null});return i?i.map(c=>({code:v(c,["code"],""),name:v(c,["name"],""),amount:T(c,["amount"],0),quantity:T(c,["quantity"],0),documents:T(c,["documents"],0),volumeMl:T(c,["volume_ml"],0)})):[]}async function wi(e,t){if(t==="all")return[];const n=await be("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(s=>s.period_val).filter(Boolean)}function Po(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,s]=t.split("-").map(Number),r=`${n}-${String(s).padStart(2,"0")}-01`,i=new Date(n,s,0).getDate(),c=`${n}-${String(s).padStart(2,"0")}-${String(i).padStart(2,"0")}`;return{from:r,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const s=parseInt(n[1]),r=parseInt(n[2]),i=new Date(s,0,4),c=i.getDay()||7,d=new Date(i);d.setDate(i.getDate()-c+1);const u=new Date(d);u.setDate(d.getDate()+(r-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function Eo(e){return e.map(t=>({staffCode:v(t,["staff_code"],""),staffName:v(t,["staff_name"],""),code:v(t,["code"],""),name:v(t,["name"],""),tag:v(t,["tag"],""),amount:T(t,["amount"],0),quantity:T(t,["quantity"],0),documents:T(t,["documents"],0)}))}async function xi(e,t){const n=await be("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(s=>({code:v(s,["code"],""),name:v(s,["name"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),documents:T(s,["documents"],0)})):[]}async function $i(e,t,n){const s=await be("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?Eo(s):[]}async function _i(e,t,n){const s=await be("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?Eo(s):[]}async function Si(e,t){if(e==="all"||!t)return[];const n=await be("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(s=>({month:v(s,["label"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),volumeMl:T(s,["volume_ml"],0)})):[]}function ki(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function Pi(e,t,n){const s=await be("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),tag:v(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function Ei(e,t,n){const s=await be("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),tag:v(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function Ai(e,t){const n=await be("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(s=>({month:v(s,["month"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),volumeMl:T(s,["volume_ml"],0)})):[]}async function Li(e,t){const n=await be("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:v(s,["brew_category"],""),subCategory:v(s,["sub_category"],""),productCount:T(s,["product_count"],0),totalShipmentQty:T(s,["total_shipment_qty"],0),totalShipmentMl:T(s,["total_shipment_ml"],0),monthlyAvgQty:T(s,["monthly_avg_qty"],0),monthlyAvgMl:T(s,["monthly_avg_ml"],0),currentStockL:T(s,["current_stock_l"],0),monthsRemaining:T(s,["months_remaining"],0),costPerL:T(s,["cost_per_l"],0)})):[]}async function Ci(e,t){const n=await be("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({month:v(s,["month"],""),brewCategory:v(s,["brew_category"],""),shipmentMl:T(s,["shipment_ml"],0)})):[]}async function Di(e,t){const n=await be("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:v(s,["brew_category"],""),subCategory:v(s,["sub_category"],""),productCode:v(s,["product_code"],""),productName:v(s,["product_name"],""),volumeMl:T(s,["volume_ml"],0),annualQty:T(s,["annual_qty"],0),annualMl:T(s,["annual_ml"],0),monthlyAvgQty:T(s,["monthly_avg_qty"],0),monthlyAvgMl:T(s,["monthly_avg_ml"],0)})):[]}async function qi(e){return(await Y("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),fy:T(n,["fy"],e),brewMonth:T(n,["brew_month"],0),durationMonths:T(n,["duration_months"],2),plannedVolumeL:T(n,["planned_volume_l"],0),notes:v(n,["notes"],"")}))}async function Ti(e,t,n){return await be("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function Ii(e,t,n,s){return await qt("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:s??null,updated_at:new Date().toISOString()})!==null}async function Mi(){const e=await Y("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const s=v(n,["category_name"],""),r=v(n,["production_type_name"],"");!s||!r||(t[s]||(t[s]=[]),t[s].push(r))}return t}async function Ni(e,t){return await be("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function Ri(e,t){return await be("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Oi(){const e=await Y("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>v(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function Bi(){const e=await Y("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const s=v(n,["brew_category"],"");s&&(t[s]={brewCategory:s,rawAlcoholPct:T(n,["raw_alcohol_pct"],18),targetAlcoholPct:T(n,["target_alcohol_pct"],15)})}return t}async function ji(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${s}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function zi(){const e=await be("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:T(t,["fy"],0),brewCategory:v(t,["brew_category"],""),shipmentL:T(t,["shipment_l"],0),monthsElapsed:T(t,["months_elapsed"],12),annualizedL:T(t,["annualized_l"],0)})):[]}async function Fi(){const e=await Y("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const s=v(n,["brew_category"],""),r=T(n,["growth_rate"],NaN);s&&!isNaN(r)&&(t[s]=r)}return t}async function Vi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await N(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function Yi(){const e=await Y("brewing_rice_params",{}),t={};for(const n of e??[]){const s=v(n,["brew_category"],"");s&&(t[s]={brewCategory:s,polishingRatio:T(n,["polishing_ratio"],.7),ricePerLiterKg:T(n,["rice_per_liter_kg"],.5),kojiRatio:T(n,["koji_ratio"],.3),kojiVariety:v(n,["koji_variety"],"山田錦"),kojiPricePerKg:T(n,["koji_price_per_kg"],600),kakeVariety:v(n,["kake_variety"],"一般米"),kakePricePerKg:T(n,["kake_price_per_kg"],350),alcoholAdditionRatio:T(n,["alcohol_addition_ratio"],0)})}return t}async function Ui(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await N(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function Ji(){const e=await be("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:v(t,["brew_category"],""),monthNum:T(t,["month_num"],0),avgMonthlyL:T(t,["avg_monthly_l"],0)})):[]}async function Hi(e){const t=await Y("procurement_decisions",{fy:`eq.${e}`}),n={};for(const s of t??[]){const r=v(s,["brew_category"],""),i=T(s,["decided_brewing_l"],-1);r&&i>=0&&(n[r]=i)}return n}async function Ki(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${s}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function Qi(e){return(await Y("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),batchCode:v(n,["batch_code"],""),fy:T(n,["fy"],e),plannedVolumeL:T(n,["planned_volume_l"],0),tankNo:v(n,["tank_no"],""),status:v(n,["status"],"planned"),startDate:v(n,["start_date"],""),targetEndDate:v(n,["target_end_date"],""),notes:v(n,["notes"],"")}))}async function Wi(e){return e.length===0?[]:(await Y("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:v(n,["id"],""),batchId:v(n,["batch_id"],""),stepOrder:T(n,["step_order"],0),stepName:v(n,["step_name"],""),plannedStart:v(n,["planned_start"],""),plannedEnd:v(n,["planned_end"],""),actualStart:v(n,["actual_start"],""),actualEnd:v(n,["actual_end"],""),status:v(n,["status"],"未着手"),temperature:n.temperature!=null?T(n,["temperature"],0):null,notes:v(n,["notes"],"")}))}function Gi(e,t){const n=new Date(e);let s=0;for(;s<t;)n.setDate(n.getDate()+1),n.getDay()!==0&&s++;return n}function Xi(e,t){const n=new Date(e);let s=t-1;for(;s>0;)n.setDate(n.getDate()+1),n.getDay()!==0&&s--;return n.getDay()===0&&n.setDate(n.getDate()+1),n}function fs(e){return e.getDay()===0&&e.setDate(e.getDate()+1),e}const xa=[{name:"洗米・浸漬（麹米）",days:1},{name:"蒸米（麹米）",days:1},{name:"製麹",days:2},{name:"洗米・浸漬（酒母）",days:1},{name:"蒸米→酒母仕込",days:1},{name:"酒母育成",days:14},{name:"洗米（添）",days:1},{name:"蒸米→添仕込",days:1},{name:"踊り",days:1},{name:"洗米（仲）",days:1},{name:"蒸米→仲仕込",days:1},{name:"洗米（留）",days:1},{name:"蒸米→留仕込",days:1},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];async function Zi(e,t,n,s,r){const c=n[s],d=c?.ricePerLiterKg??.5,u=c?.kojiRatio??.3,y=c?.polishingRatio??.7,h=c?.alcoholAdditionRatio??0,g=Math.round(t*(1-h)*d*u/y),$=r.filter(S=>S.stepName==="製麹"&&S.plannedStart&&S.plannedEnd);let _=new Date(e);for(let S=0;S<60;S++){const C=new Date(_.getTime()+1728e5),k=new Date(_.getTime()+3*864e5);let L=0;for(const E of $){const o=new Date(E.plannedStart).getTime(),l=new Date(E.plannedEnd).getTime();C.getTime()<=l&&k.getTime()>=o&&(L+=180)}if(L+g<=180)return _.toISOString().slice(0,10);_=new Date(_.getTime()+864e5)}return _.toISOString().slice(0,10)}async function el(e,t,n,s,r,i,c){let d=r;i&&c&&(d=await Zi(r,s,c,e,i));const u=await Ae("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:s,start_date:d});if(!u?.id)return null;let y=fs(new Date(d));for(let h=0;h<xa.length;h++){y=fs(y);const g=y.toISOString().slice(0,10),$=Xi(y,xa[h].days),_=$.toISOString().slice(0,10);await Ae("brewing_process_steps",{batch_id:u.id,step_order:h+1,step_name:xa[h].name,planned_start:g,planned_end:_}),y=Gi($,1)}return await He("brewing_process_batches",u.id,{target_end_date:y.toISOString().slice(0,10)}),u.id}async function tl(e,t){return He("brewing_process_steps",e,t)}async function al(e,t){return He("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function nl(){return(await Y("tanks",{order:"tank_no"})??[]).map(t=>({id:v(t,["id"],""),tankNo:v(t,["tank_no"],""),displayName:v(t,["display_name"],""),capacityL:T(t,["capacity_l"],0),tankType:v(t,["tank_type"],""),status:v(t,["status"],"empty"),preferredCategories:Array.isArray(t.preferred_categories)?t.preferred_categories:[],cleanupDays:T(t,["cleanup_days"],1)}))}async function sl(e,t,n,s){return await Ae("tanks",{tank_no:e,display_name:e,capacity_l:t,tank_type:n,preferred_categories:s,status:"empty"})!==null}async function ol(e){const{supabaseDelete:t}=await N(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tanks",e)}function rl(e,t){const n=e.find(i=>i.stepName==="蒸米→添仕込"),s=e.find(i=>i.stepName==="上槽");if(!n?.plannedStart||!s?.plannedEnd)return null;const r=new Date(s.plannedEnd);return r.setDate(r.getDate()+t),{start:n.plannedStart,end:r.toISOString().slice(0,10)}}async function il(e,t,n,s){const r=new Map(n.map(k=>[k.stepName,k])),i=s??[],c=e.filter(k=>k.status!=="completed"&&k.startDate).sort((k,L)=>k.startDate.localeCompare(L.startDate));if(c.length===0)return;const d=t.deadlineDate||"",u=t.allowSunday&&!!d,y=new Map,h=(k,L)=>{const E=new Date(k);return E.setDate(E.getDate()+L),E.toISOString().slice(0,10)},g=(k,L,E,o)=>k<=o&&L>=E,$=k=>L=>(!k&&L.getDay()===0&&L.setDate(L.getDate()+1),L),_=(k,L,E)=>{const o=new Date(k);let l=L-1;for(;l>0;)o.setDate(o.getDate()+1),(E||o.getDay()!==0)&&l--;return!E&&o.getDay()===0&&o.setDate(o.getDate()+1),o},S=(k,L)=>{const E=new Date(k);return E.setDate(E.getDate()+1),!L&&E.getDay()===0&&E.setDate(E.getDate()+1),E},C=()=>{const k=new Map;for(const L of y.values())for(const E of L){const o=r.get(E.stepName);if(!o)continue;const l=Math.max(Math.round((new Date(E.end).getTime()-new Date(E.start).getTime())/864e5)+1,1);let p=0;for(let f=0;f<l;f++){const w=new Date(E.start);w.setDate(w.getDate()+f),w.getDay()!==0&&p++}if(p===0)continue;const m=o.laborHours/p;for(let f=0;f<l;f++){const w=new Date(E.start);if(w.setDate(w.getDate()+f),w.getDay()===0)continue;const b=new Date(w);b.setDate(b.getDate()+3-(b.getDay()+6)%7);const x=new Date(b.getFullYear(),0,4),P=1+Math.round(((b.getTime()-x.getTime())/864e5-3+(x.getDay()+6)%7)/7),D=`${b.getFullYear()}-W${String(P).padStart(2,"0")}`;k.set(D,(k.get(D)??0)+m)}}return k};for(const k of c){let L=k.startDate;for(let p of[!1,...u?[!0]:[]]){L=k.startDate;for(let f=0;f<90;f++){L=$(p)(new Date(L)).toISOString().slice(0,10);const b=[];let x=new Date(L);for(const M of xa){x=$(p)(x);const O=x.toISOString().slice(0,10),I=_(x,M.days,p),j=I.toISOString().slice(0,10);b.push({stepName:M.name,start:O,end:j}),x=S(I,p)}const P=b.find(M=>M.stepName==="製麹");let D=!1;if(P)for(const[M,O]of y){const I=O.find(j=>j.stepName==="製麹");if(I&&g(P.start,P.end,I.start,I.end)){D=!0;break}}if(D){L=h(L,1);continue}y.set(k.id,b);const q=C(),R=t.workerCount*t.weeklyHoursLimit;let B=!1;for(const M of q.values())if(M>R*1.1){B=!0;break}if(B){y.delete(k.id),L=h(L,1);continue}if(i.length>0){const M=b.find(I=>I.stepName==="蒸米→添仕込"),O=b.find(I=>I.stepName==="上槽");if(M&&O){const I=M.start,j=new Date(O.end);j.setDate(j.getDate()+1);const V=j.toISOString().slice(0,10),U=i.filter(H=>H.capacityL>=k.plannedVolumeL&&(H.preferredCategories.length===0||H.preferredCategories.includes(k.brewCategory)));let W=!1;for(const H of U){let Q=!1;for(const[Z,ee]of y){if(Z===k.id||e.find(X=>X.id===Z)?.tankNo!==H.tankNo)continue;const K=ee.find(X=>X.stepName==="蒸米→添仕込"),J=ee.find(X=>X.stepName==="上槽");if(K&&J){const X=h(J.end,H.cleanupDays);if(g(I,V,K.start,X)){Q=!0;break}}}if(!Q){H.tankNo,W=!0;break}}if(!W){y.delete(k.id),L=h(L,1);continue}}}break}const m=y.get(k.id);if(d&&m){const f=m.find(w=>w.stepName==="蒸米→添仕込");if(f&&f.end<=d)break;if(!p){y.delete(k.id);continue}}else break}const E=y.get(k.id);if(!E)continue;const o=(()=>{if(i.length===0)return k.tankNo;const p=E.find(b=>b.stepName==="蒸米→添仕込"),m=E.find(b=>b.stepName==="上槽");if(!p||!m)return k.tankNo;const f=p.start,w=h(m.end,1);for(const b of i){if(b.capacityL<k.plannedVolumeL||b.preferredCategories.length>0&&!b.preferredCategories.includes(k.brewCategory))continue;let x=!1;for(const[P,D]of y){if(P===k.id||e.find(M=>M.id===P)?.tankNo!==b.tankNo)continue;const R=D.find(M=>M.stepName==="蒸米→添仕込"),B=D.find(M=>M.stepName==="上槽");if(R&&B&&g(f,w,R.start,h(B.end,b.cleanupDays))){x=!0;break}}if(!x)return b.tankNo}return k.tankNo})();await He("brewing_process_batches",k.id,{start_date:L,tank_no:o,target_end_date:h(E[E.length-1].end,0),updated_at:new Date().toISOString()});const l=await Y("brewing_process_steps",{batch_id:`eq.${k.id}`,order:"step_order.asc"});if(l)for(const p of l){const m=T(p,["step_order"],0),f=E[m-1];if(f){const w=v(p,["id"],"");await He("brewing_process_steps",w,{planned_start:f.start,planned_end:f.end})}}}}async function ll(){const t=(await Y("brewing_worker_settings",{limit:"1"})??[])[0];return t?{workerCount:T(t,["worker_count"],2),weeklyHoursLimit:T(t,["weekly_hours_limit"],40),dayStartHour:T(t,["day_start_hour"],6),deadlineDate:v(t,["deadline_date"],""),allowSunday:t.allow_sunday===!0}:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1}}async function cl(e){const t=await Y("brewing_worker_settings",{limit:"1"});if(t&&t.length>0){const n=v(t[0],["id"],"");return He("brewing_worker_settings",n,{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday,updated_at:new Date().toISOString()})}return await Ae("brewing_worker_settings",{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday})!==null}async function dl(){return(await Y("brewing_step_labor",{order:"step_name"})??[]).map(t=>({stepName:v(t,["step_name"],""),laborHours:T(t,["labor_hours"],4),workerCountNeeded:T(t,["worker_count_needed"],1)}))}function pl(e,t){const n=new Map(t.map(r=>[r.stepName,r])),s=new Map;for(const r of e){if(!r.plannedStart||!r.plannedEnd)continue;const i=n.get(r.stepName);if(!i)continue;const c=new Date(r.plannedStart),d=new Date(r.plannedEnd),u=Math.max(Math.round((d.getTime()-c.getTime())/864e5)+1,1),y=i.laborHours/u;for(let h=new Date(c);h<=d;h=new Date(h.getTime()+864e5)){const g=new Date(h);g.setDate(g.getDate()+3-(g.getDay()+6)%7);const $=new Date(g.getFullYear(),0,4),_=1+Math.round(((g.getTime()-$.getTime())/864e5-3+($.getDay()+6)%7)/7),S=`${g.getFullYear()}-W${String(_).padStart(2,"0")}`;s.set(S,(s.get(S)??0)+y)}}return s}async function ul(e){return(await Y("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:v(n,["id"],""),varietyName:v(n,["variety_name"],""),committedBales:T(n,["committed_bales"],0),pricePerKg:T(n,["price_per_kg"],0),supplier:v(n,["supplier"],""),deliveryMonth:T(n,["delivery_month"],0)||null,fy:T(n,["fy"],e),notes:v(n,["notes"],"")}))}async function ml(e){return await Ae("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function yl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function hl(){return(await Y("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),defaultPricePerKg:T(t,["default_price_per_kg"],400),region:v(t,["region"],"")}))}async function fl(e,t,n=""){return await Ae("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function gl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function vl(e){return(await Y("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),label:v(n,["label"],""),volumeL:T(n,["volume_l"],0)}))}async function bl(){return(await Y("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:v(t,["id"],""),brewCategory:v(t,["brew_category"],""),label:v(t,["label"],""),volumeL:T(t,["volume_l"],0)}))}async function wl(e,t,n){return await Ae("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function xl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await N(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function $l(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function _l(){return(await Y("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:v(t,["name"],""),parentCategory:v(t,["parent_category"],"")})).filter(t=>t.name)}async function Sl(e,t){return await Ae("brewing_custom_categories",{name:e,parent_category:t})!==null}async function kl(e){const t=await be("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:v(n,["production_type_name"],""),count:T(n,["product_count"],0)})).filter(n=>n.name):[]}async function Pl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function El(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!s)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function Al(){const e=await Y("brewing_category_overrides",{}),t={};for(const n of e??[]){const s=v(n,["product_code"],""),r=v(n,["brew_category"],"");s&&r&&(t[s]=r)}return t}async function Ll(e){return(await Y("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>v(n,["product_code"],"")).filter(Boolean)}async function Cl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!s)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}}),t.length===0)return!0;const r=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const vn={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Ao(e){const t=e.lines.reduce((r,i)=>r+i.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Ae("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,delivery_date:e.deliveryDate||e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,registered_by:e.registeredBy||null,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}async function Dl(){return(await ve("staff",{select:"legacy_staff_code,name,department,is_active",is_active:"eq.true",order:"name.asc"})).map(t=>({code:v(t,["legacy_staff_code"],""),name:v(t,["name"],""),department:v(t,["department"],""),isActive:_e(t,["is_active"],!0)}))}async function ql(e,t){const{supabaseInsert:n}=await N(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>te);return{supabaseInsert:r}},void 0);return await n("staff",{legacy_staff_code:e,name:t,is_active:!0})?{code:e,name:t,department:"",isActive:!0}:null}async function Tl(e=10){const t=new Date;t.setMonth(t.getMonth()-6);const n=t.toISOString().slice(0,10),s=await ve("sales_document_headers",{select:"legacy_customer_code,customer_name",sales_date:`gte.${n}`,order:"sales_date.desc"}),r={};for(const i of s){const c=v(i,["legacy_customer_code"],"");c&&(r[c]||(r[c]={name:v(i,["customer_name"],""),count:0}),r[c].count++)}return Object.entries(r).sort((i,c)=>c[1].count-i[1].count).slice(0,e).map(([i,c])=>({code:i,name:c.name,count:c.count}))}async function Il(e=10){const t=new Date;t.setMonth(t.getMonth()-6);const n=t.toISOString().slice(0,10);if((await ve("sales_document_headers",{select:"document_no",sales_date:`gte.${n}`})).length===0)return[];const r=await ve("sales_document_lines",{select:"legacy_product_code"}),i={};for(const u of r){const y=v(u,["legacy_product_code"],"");y&&(i[y]=(i[y]||0)+1)}const c=await ve("products",{select:"legacy_product_code,name"}),d={};for(const u of c)d[v(u,["legacy_product_code"],"")]=v(u,["name"],"");return Object.entries(i).sort((u,y)=>y[1]-u[1]).slice(0,e).map(([u,y])=>({code:u,name:d[u]||u,count:y}))}const gs={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function zn(e){const t=await Y("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],s=pe(n.total_amount);return{documentNo:e,invoiceDate:v(n,["sales_date","document_date"],""),customerCode:v(n,["legacy_customer_code","customer_code"],""),customerName:v(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...gs,documentNo:e||gs.documentNo}}const Ml={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Fn(e){const t=await Y("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const i=T(r,["sales_amount"],0),c=T(r,["tax_amount"],0);return{customerCode:v(r,["customer_code"],""),customerName:v(r,["customer_name"],""),closingDay:31,salesAmount:i,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:i,status:"open"}}),s=n.reduce((r,i)=>r+i.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:s,customers:n}}return{...Ml,targetYearMonth:e}}const Nl={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Lo(){const[e,t,n]=await Promise.all([Y("mv_monthly_sales",{order:"month.asc"}),Y("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),Y("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Nl;const s=e.slice(-12).map(u=>v(u,["month"],"")),r=new Map;t.forEach(u=>{const y=v(u,["code"],"");r.has(y)||r.set(y,{name:v(u,["name"],y),monthValues:new Map}),r.get(y).monthValues.set(v(u,["month"],""),T(u,["amount"],0))});const c=Array.from(r.entries()).map(([u,y])=>({code:u,name:y.name,total:s.reduce((h,g)=>h+(y.monthValues.get(g)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:s.map(y=>u.monthValues.get(y)??0)})),d=n.map(u=>({label:v(u,["name"],""),values:s.map(()=>Math.round(T(u,["amount"],0)/s.length))}));return{generatedAt:new Date().toISOString(),months:s,salesByProduct:c,salesByCustomer:d,costSimulation:[]}}async function Rl(){const e=await ve("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const s=v(n,["code"],"");if(!s)return;const r=v(n,["month"],""),i=parseInt(r.slice(5,7))-1;if(i<0||i>11)return;let c=t.get(s);c||(c={name:v(n,["name"],s),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(s,c)),c.qty[i]+=T(n,["quantity"],0),c.amt[i]+=T(n,["amount"],0)}),Array.from(t.entries()).map(([n,s])=>({code:n,name:s.name,monthlyQuantity:s.qty,monthlyAmount:s.amt,totalQuantity:s.qty.reduce((r,i)=>r+i,0),totalAmount:s.amt.reduce((r,i)=>r+i,0)})).filter(n=>n.totalQuantity>0).sort((n,s)=>s.totalAmount-n.totalAmount)}async function Ol(){return(await Y("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:v(t,["product_code"],""),productName:v(t,["product_name"],""),forecastMonth:v(t,["forecast_month"],""),segment:v(t,["segment"],"monthly"),avgMonthly:T(t,["avg_monthly"],0),forecastQuantity:T(t,["forecast_quantity"],0),forecastAmount:T(t,["forecast_amount"],0),safetyStock:T(t,["safety_stock"],0),calculatedAt:Se(t,["calculated_at"],"")}))}async function Bl(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await ve("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const s=await ve("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(c=>{c.id&&r.set(String(c.id),c)});const i=[];return s.forEach(c=>{const d=String(c.header_id??c.document_header_id??""),u=r.get(d);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||i.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:pe(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),i.sort((c,d)=>c.date.localeCompare(d.date))}async function jl(){const e=new Date().toISOString();return(await Y("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:v(n,["id"],""),message:v(n,["message"],""),level:v(n,["level"],"info"),startsAt:Se(n,["starts_at"],""),endsAt:n.ends_at?Se(n,["ends_at"],""):null,dismissible:_e(n,["dismissible"],!0)}))}async function zl(){const e=await ve("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:v(t,["customer_code"],""),customer_name:v(t,["customer_name"],""),business_type:v(t,["business_type"],""),area_code:v(t,["area_code"],""),phone:v(t,["phone"],""),last_order_date:v(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),amount_12m:T(t,["amount_12m"],0),amount_3m:T(t,["amount_3m"],0),amount_this_month:T(t,["amount_this_month"],0),amount_last_year_same_month:T(t,["amount_last_year_same_month"],0),annual_revenue:T(t,["annual_revenue"],0),is_dormant:_e(t,["is_dormant"],!1),is_at_risk:_e(t,["is_at_risk"],!1)})):[]}async function Fl(){return(await ve("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:v(t,["customer_code"],""),customer_name:v(t,["customer_name"],""),phone:v(t,["phone"],""),address:v(t,["address"],""),area_code:v(t,["area_code"],""),business_type:v(t,["business_type"],""),priority_score:T(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:v(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),annual_revenue:T(t,["annual_revenue"],0),recommended_action:v(t,["recommended_action"],"")}))}async function Vl(){return(await ve("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:v(t,["product_code"],""),product_name:v(t,["product_name"],""),season_type:v(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:T(t,["avg_monthly_qty"],0)}))}async function Yl(){return(await ve("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:v(t,["product_code"],""),name:v(t,["product_name"],""),monthlyQuantity:[T(t,["m01"],0),T(t,["m02"],0),T(t,["m03"],0),T(t,["m04"],0),T(t,["m05"],0),T(t,["m06"],0),T(t,["m07"],0),T(t,["m08"],0),T(t,["m09"],0),T(t,["m10"],0),T(t,["m11"],0),T(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:T(t,["total_quantity"],0),totalAmount:T(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Co(e,t,n){try{return await Ae("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function Do(e,t){return He("customers",e,t)}async function qo(e,t){return He("products",e,t)}async function bn(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const s=n?.priceGroup||t;let r="";try{const c=await Y("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(r=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const i=new Map;if(s){const c=await Y("customer_product_prices",{price_group:`eq.${s}`,select:"legacy_product_code,special_price"});for(const d of c)i.set(d.legacy_product_code,d.special_price)}return{priceType:r,priceGroup:s,individualPrices:i}}function Vn(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function Ul(){return(await Y("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Jl(){return(await ve("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Hl(){return(await Y("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function Pt(e,t="billing",n="apr"){const s=await be("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t,p_fiscal_type:n});return s?s.map(r=>({code:String(r.legacy_customer_code??""),name:String(r.customer_name??""),address:String(r.address1??""),yearAmount:Number(r.year_amount??0),sharePct:Number(r.share_pct??0),orderDays:Number(r.order_days??0),prevAmount:Number(r.prev_amount??0),growthRate:r.growth_rate!=null?Number(r.growth_rate):null,currentRank:String(r.current_rank??"C"),prevRank:String(r.prev_rank??"")})):[]}function Yn(e){if(!e)return null;if(/^\d{4}$/.test(e))return{dateFrom:`${e}-01-01`,dateTo:`${e}-12-31`};if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return{dateFrom:`${e}-01`,dateTo:`${e}-${String(s).padStart(2,"0")}`}}return null}async function To(e=""){const t=Yn(e),n=t?be("get_abc_customer_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(S=>S??[]):Y("mv_customer_abc",{order:"amount.desc"}),s=t?t.dateFrom.slice(0,7):(()=>{const S=new Date;return S.setMonth(S.getMonth()-11),`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,Y("mv_customer_monthly_sales",{month:`gte.${s}`,order:"month.asc",limit:"10000"})]),d=c.filter(S=>v(S,["month"],"")<=r),u=i.map(S=>({code:v(S,["code"],""),name:v(S,["name"],""),amount:T(S,["amount"],0),documents:T(S,["documents"],0),ratio:T(S,["ratio"],0),cumRatio:T(S,["cum_ratio","cumRatio"],0),abcRank:v(S,["abc_rank","abcRank"],"C")})),y=u.slice(0,10),h=new Set(y.map(S=>S.code)),g=Mo(s,r),$=new Map;d.forEach(S=>{const C=v(S,["code"],"");if(!h.has(C))return;const k=v(S,["month"],"");$.has(C)||$.set(C,new Map),$.get(C).set(k,T(S,["amount"],0))});const _=y.map(S=>({label:S.name,values:g.map(C=>$.get(S.code)?.get(C)??0)}));return{generatedAt:new Date().toISOString(),ranking:u,months:g,monthlyByCustomer:_}}async function Io(e=""){const t=Yn(e),n=t?be("get_abc_product_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(C=>C??[]):Y("mv_product_abc",{order:"amount.desc"}),s=t?t.dateFrom.slice(0,7):(()=>{const C=new Date;return C.setMonth(C.getMonth()-11),`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,Y("mv_product_monthly_shipments",{month:`gte.${s}`,order:"month.asc",limit:"10000"})]),d=c.filter(C=>v(C,["month"],"")<=r),y=i.map(C=>({code:v(C,["code"],""),name:v(C,["name"],""),amount:T(C,["amount"],0),quantity:T(C,["quantity"],0),documents:T(C,["documents"],0),ratio:T(C,["ratio"],0),cumRatio:T(C,["cum_ratio","cumRatio"],0),abcRank:v(C,["abc_rank","abcRank"],"C")})),h=y.reduce((C,k)=>C+k.amount,0),g=Mo(s,r),$=new Set(y.filter(C=>C.abcRank==="A").slice(0,10).map(C=>C.code)),_=new Map;d.forEach(C=>{const k=v(C,["code"],"");if(!$.has(k))return;const L=v(C,["month"],"");_.has(k)||_.set(k,new Map),_.get(k).set(L,T(C,["amount"],0))});const S=Array.from($).map(C=>{const k=_.get(C);return{label:y.find(L=>L.code===C)?.name??C,values:g.map(L=>k?.get(L)??0)}});return{generatedAt:new Date().toISOString(),totalAmount:h,ranking:y,months:g,monthlyByProduct:S.length>0?S:[]}}function Mo(e,t){const n=[],[s,r]=e.split("-").map(Number),[i,c]=t.split("-").map(Number);let d=s,u=r;for(;(d<i||d===i&&u<=c)&&(n.push(`${d}-${String(u).padStart(2,"0")}`),u++,u>12&&(u=1,d++),!(n.length>60)););return n}const No={planned:"計画中",active:"仕込中",done:"完了"};async function Ro(){const e=await Y("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),jikomiNo:v(t,["batch_no","legacy_batch_no"],""),productName:v(t,["brand_name"],""),riceType:v(t,["rice_type"],""),plannedKg:T(t,["planned_rice_kg"],0),actualKg:T(t,["actual_rice_kg"],0),startDate:Se(t,["start_date"],""),expectedDoneDate:Se(t,["expected_done_date"],""),status:v(t,["status"],"planned"),tankNo:v(t,["tank_no"],""),note:v(t,["remarks"],"")})):[]}async function Oo(){return(await Y("tanks",{order:"tank_no.asc"})).map(t=>({id:v(t,["id"],""),tankNo:v(t,["tank_no"],""),displayName:v(t,["display_name"],""),capacity:T(t,["capacity_l"],0),depthMm:T(t,["depth_mm"],0),litersPerMm:T(t,["liters_per_mm"],0),currentVolume:T(t,["current_volume_l"],0),productName:v(t,["current_product_code"],""),jikomiNo:v(t,["current_batch_id"],""),status:v(t,["status"],"empty"),lastUpdated:Se(t,["last_updated_at"],""),remarks:v(t,["remarks"],"")}))}async function Kl(e){return e.id?He("tanks",e.id,{tank_no:e.tankNo,display_name:e.displayName??e.tankNo,capacity_l:e.capacity??0,depth_mm:e.depthMm??0,liters_per_mm:e.litersPerMm??0,remarks:e.remarks??"",last_updated_at:new Date().toISOString()}):await Ae("tanks",{tank_no:e.tankNo,display_name:e.displayName??e.tankNo,capacity_l:e.capacity??0,depth_mm:e.depthMm??0,liters_per_mm:e.litersPerMm??0,status:"empty",remarks:e.remarks??""})!==null}async function Ql(e){const{supabaseDelete:t}=await N(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tanks",e)}async function Wl(e=200){return(await Y("tank_movements",{order:"movement_date.desc,created_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),movementDate:v(n,["movement_date"],""),fromTankNo:v(n,["from_tank_no"],""),toTankNo:v(n,["to_tank_no"],""),volumeL:T(n,["volume_l"],0),productName:v(n,["product_name"],""),batchCode:v(n,["batch_code"],""),alcoholDegree:n.alcohol_degree!=null?T(n,["alcohol_degree"],0):null,temperature:n.temperature!=null?T(n,["temperature"],0):null,movementType:v(n,["movement_type"],"transfer"),recordedBy:v(n,["recorded_by"],""),notes:v(n,["notes"],"")}))}async function Gl(e){return(await Y("tank_movements",{or:`from_tank_no.eq.${e},to_tank_no.eq.${e}`,order:"movement_date.desc,created_at.desc"})).map(n=>({id:v(n,["id"],""),movementDate:v(n,["movement_date"],""),fromTankNo:v(n,["from_tank_no"],""),toTankNo:v(n,["to_tank_no"],""),volumeL:T(n,["volume_l"],0),productName:v(n,["product_name"],""),batchCode:v(n,["batch_code"],""),alcoholDegree:n.alcohol_degree!=null?T(n,["alcohol_degree"],0):null,temperature:n.temperature!=null?T(n,["temperature"],0):null,movementType:v(n,["movement_type"],"transfer"),recordedBy:v(n,["recorded_by"],""),notes:v(n,["notes"],"")}))}async function Xl(e){return await Ae("tank_movements",{movement_date:e.movementDate,from_tank_no:e.fromTankNo,to_tank_no:e.toTankNo,volume_l:e.volumeL,product_name:e.productName,batch_code:e.batchCode,alcohol_degree:e.alcoholDegree,temperature:e.temperature,movement_type:e.movementType,recorded_by:e.recordedBy,notes:e.notes})!==null}async function Zl(e){const{supabaseDelete:t}=await N(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tank_movements",e)}async function Bo(){const e=await Y("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),kenteiNo:v(t,["kentei_no"],""),jikomiNo:v(t,["batch_id"],""),productName:v(t,["product_code"],""),kenteiDate:Se(t,["kentei_date"],""),alcoholDegree:T(t,["alcohol_degree"],0),extractDegree:T(t,["extract_degree"],0),sakaMeterValue:T(t,["sakemeter_value"],0),volume:T(t,["volume_l"],0),taxCategory:v(t,["tax_category_code"],""),status:v(t,["status"],"pending")})):[]}async function jo(){const e=await Y("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),code:v(t,["material_code","legacy_material_code"],""),name:v(t,["name"],""),unit:v(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),unitCost:T(t,["unit_cost"],0),lastUpdated:Se(t,["updated_at"],"")})):[]}async function zo(){const e=await Y("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),documentNo:v(t,["document_no","legacy_document_no"],""),purchaseDate:Se(t,["purchase_date"],""),supplierCode:v(t,["supplier_code","legacy_supplier_code"],""),supplierName:v(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:T(t,["total_amount"],0),status:v(t,["payment_status"],"pending")})):[]}async function Fo(){const e=await Y("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:v(t,["supplier_code","legacy_supplier_code"],""),supplierName:v(t,["legacy_supplier_code"],""),totalPurchase:T(t,["total_purchase"],0),paidAmount:T(t,["paid_amount"],0),balance:T(t,["balance"],0),nextPaymentDate:Se(t,["next_payment_date"],""),status:v(t,["status"],"unpaid")})):[]}async function Vo(){const e=await Y("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),billNo:v(t,["bill_no"],""),supplierName:v(t,["counterparty_name"],""),amount:T(t,["amount"],0),issueDate:Se(t,["issue_date"],""),dueDate:Se(t,["due_date"],""),status:v(t,["status"],"holding")})):[]}async function Yo(){const e=await Y("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:v(t,["material_code","legacy_material_code"],""),name:v(t,["name"],""),unit:v(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),lastPurchaseDate:Se(t,["last_purchase_date"],""),unitCost:T(t,["unit_cost"],0)})):[]}const Uo=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],wn={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},ec={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function Un(e,t){const n=await Y("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const s=n[0],r=v(s,["id"],""),[i,c]=await Promise.all([Y("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),Y("tax_deductions",{declaration_id:`eq.${r}`})]),d=i.map(y=>({taxCategory:v(y,["tax_category_code"],""),taxCategoryName:v(y,["tax_category_name"],""),alcoholDegree:T(y,["alcohol_degree"],0),volume:T(y,["taxable_volume"],0),taxRate:T(y,["tax_rate"],0),taxAmount:T(y,["tax_amount"],0),productionVolume:T(y,["production_volume"],0),previousBalance:T(y,["previous_balance"],0),currentAdjustment:T(y,["current_adjustment"],0),exportDeduction:T(y,["export_deduction"],0),sampleDeduction:T(y,["sample_deduction"],0),taxableVolume:T(y,["taxable_volume"],0)})),u=c.map(y=>({type:v(y,["deduction_type"],"sample"),categoryCode:v(y,["tax_category_code"],""),volume:T(y,["volume"],0),reason:v(y,["reason"],""),documentNo:v(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:v(s,["company_name"],""),companyNo:v(s,["company_no"],""),companyAddress:v(s,["company_address"],""),companyRepresentative:v(s,["company_representative"],""),taxOffice:v(s,["tax_office"],""),rows:d,deductions:u,totalVolume:T(s,["total_taxable_volume"],0),totalTax:T(s,["total_tax_amount"],0),status:v(s,["status"],"draft"),submittedAt:v(s,["submitted_at"],"")||null}}return{...ec,targetYear:e,targetMonth:t}}function Be(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Jo(e){const t=e.rows.map(s=>`    <Category>
      <Code>${Be(s.taxCategory)}</Code>
      <Name>${Be(s.taxCategoryName)}</Name>
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
`),n=e.deductions.map(s=>`    <Deduction type="${Be(s.type)}">
      <CategoryCode>${Be(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${Be(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${Be(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${Be(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${Be(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${Be(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${Be(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${Be(e.taxOffice)}</TaxOffice>
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
`}function tc(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function ac(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=e.rows.map(i=>[i.taxCategory,i.taxCategoryName,i.alcoholDegree,i.productionVolume,i.previousBalance,i.currentAdjustment,i.exportDeduction,i.sampleDeduction,i.taxableVolume,i.taxRate,i.taxAmount].map(tc).join(",")),r=`,合計,,${e.rows.reduce((i,c)=>i+c.productionVolume,0)},,,${e.rows.reduce((i,c)=>i+c.exportDeduction,0)},${e.rows.reduce((i,c)=>i+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...s,r].join(`
`)+`
`}function nc(e){const t=e.rows.map(r=>{const i=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),c=Math.round(i*r.taxRate);return{...r,taxableVolume:i,volume:i,taxAmount:c}}),n=t.reduce((r,i)=>r+i.taxableVolume,0),s=t.reduce((r,i)=>r+i.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:s}}async function sc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Jo(e),submitted_at:e.submittedAt})}async function Jn(e,t){return(await be("get_sake_tax_by_month",{p_year:e,p_month:t})).map(s=>({sakeType:s.sake_type,alcDegree:s.alc_degree??null,volumeSaleL:Number(s.volume_sale_l)||0,volumeReturnL:Number(s.volume_return_l)||0,volumeExportL:Number(s.volume_export_l)||0,volumeNetL:Number(s.volume_net_l)||0,taxRatePerKl:s.tax_rate_per_kl!==null?Number(s.tax_rate_per_kl):null,taxAmount:Number(s.tax_amount)||0}))}async function Hn(e){const t=await Y("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:v(n,["id"],""),saleDate:v(n,["sale_date"],e),saleTime:v(n,["sale_time"],""),productCode:v(n,["product_code"],""),productName:v(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0),paymentMethod:v(n,["payment_method"],"cash")})):[]}async function Ho(){const e=await Y("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:v(t,["id"],""),orderNo:v(t,["order_no"],""),orderDate:Se(t,["order_date"],""),customerName:v(t,["customer_name"],""),postalCode:v(t,["postal_code"],""),address:v(t,["shipping_address"],""),items:[],totalAmount:T(t,["total_amount"],0),status:v(t,["status"],"new"),shippingDate:Se(t,["shipping_date"],"")})):[]}async function oc(e,t,n,s,r,i){const c=await Ae("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:s,status:"new",remarks:r||null});if(!c)return null;const d=c.id;for(let u=0;u<i.length;u++){const y=i[u];await Ae("store_order_lines",{order_id:d,line_no:u+1,product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit_price:y.unitPrice,amount:y.amount})}return d}async function $a(e){const t=await Ae("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ko(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function rc(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await Y("print_layouts",t)).map(s=>({id:v(s,["id"],""),name:v(s,["name"],""),templateKey:v(s,["template_key"],""),positions:s.positions??{},isDefault:_e(s,["is_default"],!1),note:v(s,["note"],""),updatedAt:v(s,["updated_at"],"")}))}async function ic(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>te);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},s=await t("print_layouts",n);return s?{id:v(s,["id"],e.id),name:v(s,["name"],e.name),templateKey:v(s,["template_key"],e.templateKey),positions:s.positions??e.positions,isDefault:_e(s,["is_default"],!1),note:v(s,["note"],""),updatedAt:v(s,["updated_at"],"")}:null}async function lc(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function cc(){return(await Y("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),email:v(t,["email"],""),displayName:v(t,["display_name"],""),signature:v(t,["signature"],""),replyTo:v(t,["reply_to"],""),isDefault:_e(t,["is_default"],!1),isVerified:_e(t,["is_verified"],!1),note:v(t,["note"],"")}))}async function dc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:v(n,["id"],e.id),name:v(n,["name"],e.name),email:v(n,["email"],e.email),displayName:v(n,["display_name"],""),signature:v(n,["signature"],""),replyTo:v(n,["reply_to"],""),isDefault:_e(n,["is_default"],!1),isVerified:_e(n,["is_verified"],!1)}:null}async function pc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Kn={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Qn={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function uc(e){const t=`${e}-01T00:00:00Z`,[n,s]=e.split("-").map(d=>parseInt(d,10)),r=new Date(n,s,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await Y("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${i})`,order:"starts_at.asc"})).map(d=>({id:v(d,["id"],""),title:v(d,["title"],""),description:v(d,["description"],""),category:v(d,["category"],"general")||"general",startsAt:v(d,["starts_at"],new Date().toISOString()),endsAt:v(d,["ends_at"],""),isAllDay:_e(d,["is_all_day"],!1),location:v(d,["location"],""),attendees:d.attendees??[],relatedCustomerCode:v(d,["related_customer_code"],""),relatedOrderId:v(d,["related_order_id"],""),color:v(d,["color"],""),googleEventId:v(d,["google_event_id"],"")}))}async function mc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Qn[e.category],updated_at:new Date().toISOString()})?e:null}async function yc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Qo(){return(await Y("integration_settings",{order:"name.asc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),provider:v(t,["provider"],""),config:t.config??{},isEnabled:_e(t,["is_enabled"],!1),lastSyncAt:v(t,["last_sync_at"],""),lastStatus:v(t,["last_status"],"")}))}async function ta(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function hc(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const s=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(s,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const i=await r.json(),{supabaseInsert:c}=await N(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>te);return{supabaseInsert:u}},void 0);let d=0;for(const u of i.orders){const y=`shopify_${u.id}`;await c("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),d++}return await ta({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得成功`}),{count:d}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function fc(){return(await Y("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:v(t,["id"],""),shopifyOrderId:v(t,["shopify_order_id"],""),orderNumber:v(t,["order_number"],""),orderDate:v(t,["order_date"],""),customerName:v(t,["customer_name"],""),customerEmail:v(t,["customer_email"],""),totalAmount:pe(t.total_amount),financialStatus:v(t,["financial_status"],""),fulfillmentStatus:v(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function gc(e){const t=e.config.refresh_token,n=e.config.client_id,s=e.config.client_secret;if(!t||!n||!s)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:s})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const c=(await r.json()).access_token;return await ta({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function vc(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const s=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),i=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${s}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const h=await gc(e);if(h.error)return{count:0,error:h.error};t=h.token,c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const d=await c.json(),{supabaseInsert:u}=await N(async()=>{const{supabaseInsert:h}=await Promise.resolve().then(()=>te);return{supabaseInsert:h}},void 0);let y=0;for(const h of d.items){const g=`gcal_${h.id}`,$=h.start?.dateTime??h.start?.date??"",_=h.end?.dateTime??h.end?.date??"";await u("calendar_events",{id:g,title:String(h.summary??"(無題)"),description:String(h.description??""),category:"general",starts_at:String($),ends_at:String(_),location:String(h.location??""),google_event_id:String(h.id??""),updated_at:new Date().toISOString()}),y++}return await ta({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function bc(){return(await Y("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:v(t,["id"],""),receivedAt:v(t,["received_at"],""),senderPhone:v(t,["sender_phone"],""),senderName:v(t,["sender_name"],""),imageUrl:v(t,["image_url"],""),ocrStatus:v(t,["ocr_status"],"pending")||"pending",ocrText:v(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:v(t,["linked_invoice_id"],"")}))}async function wc(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const s=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(s){return{text:"",error:s instanceof Error?s.message:String(s)}}}async function xc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Ca={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Da={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function $c(){return(await Y("user_profiles",{order:"display_name.asc"})).map(t=>({id:v(t,["id"],""),email:v(t,["email"],""),displayName:v(t,["display_name"],""),staffCode:v(t,["staff_code"],""),department:v(t,["department"],"all")||"all",role:v(t,["role"],"staff")||"staff",defaultMailSenderId:v(t,["default_mail_sender_id"],""),phone:v(t,["phone"],""),avatarUrl:v(t,["avatar_url"],""),isActive:_e(t,["is_active"],!0),lastSignInAt:v(t,["last_sign_in_at"],""),createdAt:v(t,["created_at"],"")}))}async function _c(e){if(!e)return null;const t=await Y("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:v(n,["id"],""),email:v(n,["email"],""),displayName:v(n,["display_name"],""),staffCode:v(n,["staff_code"],""),department:v(n,["department"],"all")||"all",role:v(n,["role"],"staff")||"staff",defaultMailSenderId:v(n,["default_mail_sender_id"],""),phone:v(n,["phone"],""),avatarUrl:v(n,["avatar_url"],""),isActive:_e(n,["is_active"],!0),lastSignInAt:v(n,["last_sign_in_at"],"")}}async function Sc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function kc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Pc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Ec(e=100){return(await Y("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),action:v(n,["action"],""),entityType:v(n,["entity_type"],""),entityId:v(n,["entity_id"],""),userEmail:v(n,["user_email"],""),changes:n.changes??{},createdAt:v(n,["created_at"],"")}))}const qa={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Wo(){return(await Y("slack_notifications",{order:"event_type.asc"})).map(t=>({id:v(t,["id"],""),eventType:v(t,["event_type"],"new_order"),enabled:_e(t,["enabled"],!0),channel:v(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:v(t,["last_triggered_at"],"")}))}async function Ac(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function Lc(e=50){return(await Y("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),eventType:v(n,["event_type"],""),channel:v(n,["channel"],""),message:v(n,["message"],""),status:v(n,["status"],"sent"),error:v(n,["error"],""),sentAt:v(n,["sent_at"],"")}))}async function Cc(e,t,n){const r=(await Qo()).find(y=>y.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const i=r.config.webhook_url;if(!i)return{ok:!1,error:"Webhook URL未設定"};const d=(await Wo()).find(y=>y.eventType===e&&y.enabled);if(!d)return{ok:!1,error:"通知ルールが無効"};const u=n??d.channel??r.config.default_channel??"#general";try{const y=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${qa[e]} ${t}`,channel:u})}),h=y.ok,{supabaseInsert:g}=await N(async()=>{const{supabaseInsert:$}=await Promise.resolve().then(()=>te);return{supabaseInsert:$}},void 0);return await g("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:h?"sent":"failed",error:h?null:`HTTP ${y.status}`}),h?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const Ba={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Wn={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function Dc(){return(await Y("prospects",{order:"updated_at.desc"})).map(t=>({id:v(t,["id"],""),companyName:v(t,["company_name"],""),contactName:v(t,["contact_name"],""),email:v(t,["email"],""),phone:v(t,["phone"],""),address:v(t,["address"],""),website:v(t,["website"],""),businessType:v(t,["business_type"],""),stage:v(t,["stage"],"cold"),source:v(t,["source"],""),expectedAmount:pe(t.expected_amount),probability:pe(t.probability),assignedStaffCode:v(t,["assigned_staff_code"],""),nextActionDate:v(t,["next_action_date"],""),nextAction:v(t,["next_action"],""),note:v(t,["note"],""),lastContactAt:v(t,["last_contact_at"],""),wonAt:v(t,["won_at"],""),lostAt:v(t,["lost_at"],""),lostReason:v(t,["lost_reason"],""),convertedCustomerCode:v(t,["converted_customer_code"],""),createdAt:v(t,["created_at"],"")}))}async function Go(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:v(n,["id"],e.id)}:null}async function qc(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);try{const s=new URL("/rest/v1/prospects",t);return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Tc(e){return(await Y("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:v(n,["id"],""),prospectId:v(n,["prospect_id"],""),activityType:v(n,["activity_type"],"call"),title:v(n,["title"],""),description:v(n,["description"],""),activityDate:v(n,["activity_date"],""),result:v(n,["result"],""),staffCode:v(n,["staff_code"],"")}))}async function Ic(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const Xo=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function Mc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function Nc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Rc(){return(await ve("v_customer_map")).map(t=>({customerCode:v(t,["customer_code"],""),name:v(t,["name"],""),phone:v(t,["phone"],""),areaCode:v(t,["area_code"],""),businessType:v(t,["business_type"],""),businessTypeName:v(t,["business_type_name"],""),address1:v(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:_e(t,["is_at_risk"],!1),isDormant:_e(t,["is_dormant"],!1),amount12m:T(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}async function Zo(){return(await ve("customers",{select:"id,legacy_customer_code,name,address1",is_active:"eq.true",lat:"is.null",address1:"not.is.null",order:"name.asc"})).map(t=>({id:v(t,["id"],""),customerCode:v(t,["legacy_customer_code"],""),name:v(t,["name"],""),address1:v(t,["address1"],"")}))}async function Oc(e){try{const t=`https://nominatim.openstreetmap.org/search?format=json&countrycodes=jp&limit=1&q=${encodeURIComponent(e)}`,n=await fetch(t,{headers:{"User-Agent":"sake-system-crm/1.0"}});if(!n.ok)return null;const s=await n.json();return s.length===0?null:{lat:parseFloat(s[0].lat),lng:parseFloat(s[0].lon)}}catch{return null}}async function Bc(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0),s=await Zo();let r=0,i=0;for(let c=0;c<s.length;c++){const d=s[c];e(c,s.length,d.name);const u=await Oc(d.address1);if(u)try{const y=new URL(`/rest/v1/customers?id=eq.${d.id}`,t);await fetch(y.toString(),{method:"PATCH",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({lat:u.lat,lng:u.lng})}),r++}catch{i++}else i++;c<s.length-1&&await new Promise(y=>setTimeout(y,1100))}return e(s.length,s.length,"完了"),{success:r,failed:i}}const ja=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function jc(){return(await ve("customer_churn_notes")).map(t=>({customerCode:v(t,["customer_code"],""),reason:v(t,["reason"],""),memo:v(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:v(t,["updated_at"],"")}))}async function zc(e){const{supabaseUpsert:t}=await N(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>te);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function Fc(){return(await Y("delivery_locations",{order:"name.asc"})).map(t=>({id:v(t,["id"],""),customerCode:v(t,["customer_code"],""),name:v(t,["name"],""),postalCode:v(t,["postal_code"],""),address:v(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:v(t,["contact_name"],""),phone:v(t,["phone"],""),deliveryNote:v(t,["delivery_note"],""),isActive:_e(t,["is_active"],!0)}))}async function Vc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function Yc(e=50){return(await Y("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),callDirection:v(n,["call_direction"],"inbound"),fromNumber:v(n,["from_number"],""),toNumber:v(n,["to_number"],""),matchedCustomerCode:v(n,["matched_customer_code"],""),matchedProspectId:v(n,["matched_prospect_id"],""),durationSeconds:pe(n.duration_seconds),callStatus:v(n,["call_status"],"answered"),recordingUrl:v(n,["recording_url"],""),transcript:v(n,["transcript"],""),ivryCallId:v(n,["ivry_call_id"],""),startedAt:v(n,["started_at"],""),endedAt:v(n,["ended_at"],""),notes:v(n,["notes"],"")}))}async function er(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Uc(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const s=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(s,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const c=(await r.json()).calls??[];let d=0;for(const u of c)await er({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),d++;return await ta({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Jc(e,t){const n=e.config.api_key,s=e.config.team_id;if(!n||!s)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const i of t){if(!i.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${s}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:i.name,phone_number:i.phone,external_id:i.customerCode??"",note:i.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function Hc(){return(await Y("lead_lists",{order:"created_at.desc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),query:v(t,["query"],""),area:v(t,["area"],""),businessType:v(t,["business_type"],""),totalCount:pe(t.total_count),source:v(t,["source"],"manual"),createdAt:v(t,["created_at"],"")}))}async function Kc(e){return(await Y("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:v(n,["id"],""),listId:v(n,["list_id"],""),companyName:v(n,["company_name"],""),address:v(n,["address"],""),phone:v(n,["phone"],""),website:v(n,["website"],""),email:v(n,["email"],""),businessType:v(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:pe(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:v(n,["place_id"],""),status:v(n,["status"],"new"),convertedProspectId:v(n,["converted_prospect_id"],""),note:v(n,["note"],"")}))}async function Qc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function tr(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function Wc(e,t,n){const s=e.config.api_key;if(!s)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),i=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${s}`;try{const c=await fetch(i);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const d=await c.json();return d.status!=="OK"&&d.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${d.status}`}:{results:d.results.map(y=>{const h=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:h?.lat,lng:h?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function Gc(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await Go(t);return n&&await tr({...e,status:"imported",convertedProspectId:t.id}),n}async function Xc(){return(await Y("workflow_orders",{order:"order_date.desc"})).map(t=>({id:v(t,["id"],""),orderNo:v(t,["order_no"],""),customerName:v(t,["customer_name"],""),customerCode:v(t,["customer_code"],""),orderDate:v(t,["order_date"],""),deliveryDate:v(t,["delivery_date"],""),stage:v(t,["stage"],"new"),totalAmount:pe(t.total_amount),itemCount:pe(t.item_count),priority:v(t,["priority"],"normal"),staffName:v(t,["staff_name"],""),notes:v(t,["notes"],"")}))}async function Zc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function ed(){return(await Y("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),email:v(t,["email"],""),phone:v(t,["phone"],""),visitDate:v(t,["visit_date"],""),partySize:pe(t.party_size)||1,language:v(t,["language"],"ja"),purpose:v(t,["purpose"],""),message:v(t,["message"],""),status:v(t,["status"],"new"),repliedAt:v(t,["replied_at"],""),confirmedTime:v(t,["confirmed_time"],""),createdAt:v(t,["created_at"],new Date().toISOString())}))}async function td(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const ad=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function ar(){return(await Promise.all(ad.map(async t=>{const[n,s]=await Promise.all([In(t.table),Y(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:s[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function _a(e,t,n=100){const s=(t-1)*n,[r,i]=await Promise.all([Y(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(s)}),In(e)]);return{records:r,total:i}}async function Sa(e){const t=await Y("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const s=JSON.parse(n);return String(s.price_group??"")}catch{return""}return""}async function xn(e,t){if(e){const s=await Y("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(s.length>0&&s[0].special_price)return pe(s[0].special_price)}const n=await Y("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?pe(n[0].default_sale_price):0}const nd=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],sd=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],od={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function rd(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=nd,s={},r={};for(const u of n){s[u.code]={};for(const y of t){const h=parseInt(y.split("-")[1])-1,g=od[u.code]??100,$=Math.round(g*sd[h]*(.85+Math.random()*.3));s[u.code][y]=$,r[y]=(r[y]??0)+$}}const i={},c={},d={};for(const u of n){const y=t.map($=>s[u.code][$]??0),h=y.reduce(($,_)=>$+_,0)/y.length,g=y.reduce(($,_)=>$+(_-h)**2,0)/y.length;i[u.code]=y.reduce(($,_)=>$+_,0),c[u.code]=h,d[u.code]=Math.sqrt(g)}return{months:t,products:n,matrix:s,totals:r,productTotals:i,productAvg:c,productStdDev:d}}async function id(e=36){const t=(()=>{const $=new Date;return $.setMonth($.getMonth()-e),`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`})();let n=[];try{n=await ve("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"})}catch($){console.warn("fetchDemandAnalysis: query failed, using empty",$)}if(n.length===0)return rd();const s=new Set,r=new Map,i={},c={};for(const $ of n){const _=v($,["year_month"],""),S=v($,["product_code"],""),C=v($,["product_name"],S),k=T($,["quantity"],0);!_||!S||(s.add(_),r.set(S,C),i[S]||(i[S]={}),i[S][_]=k,c[_]=(c[_]??0)+k)}const d=[...s].sort(),u=[...r.entries()].map(([$,_])=>({code:$,name:_})),y={},h={},g={};for(const $ of u){const _=d.map(k=>i[$.code]?.[k]??0),S=_.reduce((k,L)=>k+L,0)/(_.length||1),C=_.reduce((k,L)=>k+(L-S)**2,0)/(_.length||1);y[$.code]=_.reduce((k,L)=>k+L,0),h[$.code]=S,g[$.code]=Math.sqrt(C)}return{months:d,products:u,matrix:i,totals:c,productTotals:y,productAvg:h,productStdDev:g}}async function ld(){let e=[];try{e=await Y("product_safety_stock_params",{order:"product_code.asc"})}catch(t){return console.warn("fetchSafetyStockParams failed:",t),[]}return e.map(t=>({productCode:v(t,["product_code"],""),productName:v(t,["product_name"],""),unit:v(t,["unit"],"本"),avgMonthlyDemand:T(t,["avg_monthly_demand"],0),demandStdDev:T(t,["demand_std_dev"],0),leadTimeDays:T(t,["lead_time_days"],30),serviceLevel:T(t,["service_level"],.95),safetyStockQty:T(t,["safety_stock_qty"],0),reorderPoint:T(t,["reorder_point"],0),memo:v(t,["memo"],""),productionType:v(t,["production_type"],"monthly")}))}async function cd(e){return(await Y("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:v(n,["id"],""),yearMonth:v(n,["year_month"],e),productCode:v(n,["product_code"],""),productName:v(n,["product_name"],""),demandForecast:T(n,["demand_forecast"],0),safetyStockTarget:T(n,["safety_stock_target"],0),openingStock:T(n,["opening_stock"],0),requiredProduction:T(n,["required_production"],0),plannedQty:T(n,["planned_qty"],0),actualQty:T(n,["actual_qty"],0),status:v(n,["status"],"draft"),productionType:v(n,["production_type"],"monthly"),notes:v(n,["notes"],"")}))}async function dd(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const s=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),i=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(s)});if(!i.ok){const c=await i.text();return console.error("saveSafetyStockParamsBulk failed:",i.status,c),!1}return!0}catch(s){return console.error("saveSafetyStockParamsBulk error:",s),!1}}async function pd(e){const{supabaseUpsert:t}=await N(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>te);return{supabaseUpsert:s}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function ud(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}function Qa(e,t,n){t>0&&n>0&&(e[t]=(e[t]||0)+n)}function vs(e){return Object.entries(e).map(([t,n])=>({volumeMl:Number(t),label:Number(t)>=1e3?`${Number(t)}ml`:`${Number(t)}ml`,bottles:Number(n)})).sort((t,n)=>t.volumeMl-n.volumeMl)}async function md(e){const[t,n]=e.split("-").map(Number),s=`${e}-01`,r=new Date(t,n,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}`,c=await ve("sales_document_headers",{select:"document_no,legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${s},sales_date.lte.${i})`,order:"sales_date.asc"}),d=await ve("sales_document_lines",{select:"document_no,legacy_product_code,quantity",note:`like.*date:${e}*`,order:"document_no"}),u=await ve("products",{select:"legacy_product_code,volume_ml"}),y={};for(const C of u)C.legacy_product_code&&C.volume_ml&&(y[C.legacy_product_code]=C.volume_ml);const h={};for(const C of d){const k=C.document_no,L=y[C.legacy_product_code]||0;L>0&&C.quantity>0&&(h[k]||(h[k]={}),Qa(h[k],L,C.quantity))}const g=await ve("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),$={};for(const C of g)C.address1&&($[C.legacy_customer_code]=ud(C.address1));const _={};for(const C of c){const k=C.sales_date;if(!k)continue;const L=C.legacy_customer_code||"",E=`${k}|${L}`,o=C.document_no||C.legacy_document_no||"";_[E]||(_[E]={date:k,custCode:L,custName:C.customer_name||"",city:$[L]||"住所未登録",amount:0,invoiceCount:0,volumes:{}}),_[E].amount+=Number(C.total_amount)||0,_[E].invoiceCount++;const l=h[o];if(l)for(const[p,m]of Object.entries(l))Qa(_[E].volumes,Number(p),Number(m))}const S={};for(const C of Object.values(_)){S[C.date]||(S[C.date]={date:C.date,entries:[],cityGroups:[],totalAmount:0,count:0,totalVolumes:[]});const k=S[C.date];k.entries.push({customerCode:C.custCode,customerName:C.custName,city:C.city,amount:C.amount,invoiceCount:C.invoiceCount,volumes:vs(C.volumes)}),k.totalAmount+=C.amount,k.count+=C.invoiceCount}for(const C of Object.values(S)){const k={},L={};for(const E of C.entries){k[E.city]=(k[E.city]||0)+1;for(const o of E.volumes)Qa(L,o.volumeMl,o.bottles)}C.cityGroups=Object.entries(k).sort((E,o)=>o[1]-E[1]).map(([E,o])=>({city:E,count:o})),C.totalVolumes=vs(L)}return S}async function Ta(){return Y("quotes",{select:"id,quote_no,quote_date,valid_until,legacy_customer_code,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function nr(e){const t=await Y("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await Y("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function yd(){const e=new Date().toISOString().slice(0,7)+"-01";return ve("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}async function Ia(){const e=await Y("app_feature_status",{select:"*"}),t={};for(const n of e)t[n.feature_id]={featureId:n.feature_id,confirmedAt:n.confirmed_at,confirmedBy:n.confirmed_by,notes:n.notes};return t}async function sr(e,t){await qt("app_feature_status",{feature_id:e,confirmed_at:new Date().toISOString(),confirmed_by:t,updated_at:new Date().toISOString()})}async function or(e){await qt("app_feature_status",{feature_id:e,confirmed_at:null,confirmed_by:null,updated_at:new Date().toISOString()})}const Ie={soumu:"総務",route_sales:"ルートセールス",brewing:"造り",bottling:"詰口",labeling:"貼場",delivery:"配送（業務委託）"},hd={soumu:null,route_sales:null,brewing:[9,10,11,12,1,2,3,4],bottling:null,labeling:null,delivery:null},Gn={billing:"請求業務",inventory:"棚卸"},Xn={morning:"午前",afternoon:"午後",both:"終日"};async function Zn(){return(await Y("staff_members",{order:"department.asc,employment_type.asc,kana.asc"})??[]).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),kana:v(t,["kana"],""),employmentType:v(t,["employment_type"],"part_time"),department:v(t,["department"],"bottling"),hourlyRate:t.hourly_rate!=null?Number(t.hourly_rate):null,monthlySalary:t.monthly_salary!=null?Number(t.monthly_salary):null,contractFee:t.contract_fee!=null?Number(t.contract_fee):null,workHoursPerDay:T(t,["work_hours_per_day"],8),shiftPreference:t.shift_preference??null,monthlyTasks:Array.isArray(t.monthly_tasks)?t.monthly_tasks:[],availableMonths:Array.isArray(t.available_months)?t.available_months:null,crossDepartments:Array.isArray(t.cross_departments)?t.cross_departments:[],fixedDaysOff:Array.isArray(t.fixed_days_off)?t.fixed_days_off:[],isDeptLeader:t.is_dept_leader===!0,notes:v(t,["notes"],""),isActive:t.is_active!==!1}))}async function rr(e){const t={name:e.name,kana:e.kana??null,employment_type:e.employmentType??"part_time",department:e.department??"bottling",hourly_rate:e.hourlyRate??null,monthly_salary:e.monthlySalary??null,contract_fee:e.contractFee??null,work_hours_per_day:e.workHoursPerDay??8,shift_preference:e.shiftPreference??null,monthly_tasks:e.monthlyTasks??[],available_months:e.availableMonths??null,cross_departments:e.crossDepartments??[],fixed_days_off:e.fixedDaysOff??[],is_dept_leader:e.isDeptLeader??!1,notes:e.notes??null,is_active:e.isActive??!0,updated_at:new Date().toISOString()};return e.id&&(t.id=e.id),!!await qt("staff_members",t)}async function ir(e){return Mn("staff_members",e)}async function lr(e){const[t,n]=e.split("-").map(Number),s=B=>String(B).padStart(2,"0");function r(B,M){const O=M===12?1:M+1,I=M===12?B+1:B;return{startDate:`${B}-${s(M)}-01`,endDate:`${I}-${s(O)}-01`}}let i=0;const c=new Date(t,n-1,1);for(;c.getMonth()===n-1;){const B=c.getDay();B!==0&&B!==6&&i++,c.setDate(c.getDate()+1)}const{startDate:d,endDate:u}=r(t,n),{startDate:y,endDate:h}=r(t-1,n),g=`(sales_date.gte.${d},sales_date.lt.${u})`,$=`(sales_date.gte.${y},sales_date.lt.${h})`,[_,S,C,k,L,E]=await Promise.all([Y("daily_sales_fact",{select:"document_count,total_quantity",and:g}),Y("sales_document_headers",{select:"total_amount",and:g,customer_name:"ilike.*上様*"}),Y("sales_document_headers",{select:"total_amount",and:g}),Y("daily_sales_fact",{select:"document_count,total_quantity",and:$}),Y("sales_document_headers",{select:"total_amount",and:$}),Y("sales_document_headers",{select:"total_amount",and:$,customer_name:"ilike.*上様*"})]),o=_.reduce((B,M)=>B+T(M,["document_count"],0),0),l=Math.round(_.reduce((B,M)=>B+T(M,["total_quantity"],0),0)),p=S.length,m=S.reduce((B,M)=>B+T(M,["total_amount"],0),0),f=C.reduce((B,M)=>B+T(M,["total_amount"],0),0),w=Math.max(0,f-m),b=k.reduce((B,M)=>B+T(M,["document_count"],0),0),x=Math.round(k.reduce((B,M)=>B+T(M,["total_quantity"],0),0)),P=E.reduce((B,M)=>B+T(M,["total_amount"],0),0),D=L.reduce((B,M)=>B+T(M,["total_amount"],0),0),q=Math.max(0,D-P),R=Math.max(0,L.length-E.length);return{monthlyDocumentCount:o,directSalesCount:p,directSalesAmount:m,routeSalesAmount:w,workingDays:i,prevYearDocumentCount:b,prevYearRouteSalesAmount:q,prevYearRouteDocCount:R,prevYearTotalQuantity:x,currentTotalQuantity:l}}async function cr(e){const[t,n]=e.split("-").map(Number),s=y=>String(y).padStart(2,"0"),r=`${t}-${s(n)}-01`,i=n===12?1:n+1,d=`${n===12?t+1:t}-${s(i)}-01`;return(await Y("daily_shift_plans",{select:"id,plan_date,department,staff_member_ids,notes",and:`(plan_date.gte.${r},plan_date.lt.${d})`,order:"plan_date.asc,department.asc"})).map(y=>({id:v(y,["id"],void 0),planDate:v(y,["plan_date"],""),department:v(y,["department"],"soumu"),staffMemberIds:y.staff_member_ids??[],notes:v(y,["notes"],"")}))}async function dr(e,t){const[n,s]=e.split("-").map(Number),r=y=>String(y).padStart(2,"0"),i=`${n}-${r(s)}-01`,c=s===12?1:s+1,u=`${s===12?n+1:n}-${r(c)}-01`;try{const y=new URL("/rest/v1/daily_shift_plans",$e);if(y.searchParams.set("and",`(plan_date.gte.${i},plan_date.lt.${u})`),await fetch(y.toString(),{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}}),t.length===0)return!0;const h=t.map(_=>({plan_date:_.planDate,department:_.department,staff_member_ids:_.staffMemberIds,notes:_.notes||null})),g=new URL("/rest/v1/daily_shift_plans",$e);return(await fetch(g.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(h)})).ok}catch(y){return console.error("saveDailyShiftPlans failed",y),!1}}const z=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Qn,CALENDAR_CATEGORY_LABELS:Kn,CHURN_REASONS:ja,DEPT_LABEL:Ie,DEPT_LABELS:Da,DEPT_MONTHS:hd,INVOICE_TYPE_LABELS:vn,JIKOMI_STATUS_LABELS:No,MATERIAL_CATEGORIES:Xo,MONTHLY_TASK_LABEL:Gn,PROSPECT_STAGE_COLORS:Wn,PROSPECT_STAGE_LABELS:Ba,ROLE_LABELS:Ca,SEASONAL_TEMPLATES:Rn,SHIFT_PREF_LABEL:Xn,SLACK_EVENT_LABELS:qa,TAX_DEDUCTION_LABELS:wn,TAX_RATE_CATEGORIES:Uo,abcPeriodToDates:Yn,addBrewingCustomCategory:Sl,addBrewingStockEntry:wl,addRiceVariety:fl,addTank:sl,autoScheduleAllBatches:il,batchGeocode:Bc,calcWeeklyLabor:pl,confirmFeature:sr,convertLeadToProspect:Gc,createBrewingBatch:el,createStaff:ql,deleteBrewingCustomCategory:Pl,deleteBrewingStockEntry:$l,deleteCalendarEvent:yc,deleteMailSender:pc,deleteMaterial:Nc,deletePrintLayout:lc,deleteProspect:qc,deleteRicePurchaseCommitment:yl,deleteRiceVariety:gl,deleteStaffMember:ir,deleteTank:ol,deleteTankById:Ql,deleteTankMovement:Zl,deleteUserProfile:kc,fetchAllBrewingStockEntries:bl,fetchAnalyticsByPeriod:bi,fetchAnnouncements:jl,fetchAuditLogs:Ec,fetchAvailablePeriods:wi,fetchAvailableProductionTypes:Oi,fetchBillList:Vo,fetchBillingSummary:Fn,fetchBrewingAlcoholSettings:Bi,fetchBrewingBatches:Qi,fetchBrewingCategoryOverrides:Al,fetchBrewingCustomCategories:_l,fetchBrewingForecastOverrides:Fi,fetchBrewingMonthlyTrend:Ci,fetchBrewingPlanSummary:Li,fetchBrewingProcessSteps:Wi,fetchBrewingProductDetail:Di,fetchBrewingRiceParams:Yi,fetchBrewingSchedule:qi,fetchBrewingSeasonalPattern:Ji,fetchBrewingStockEntries:vl,fetchBrewingYearlyShipments:zi,fetchCalendarEvents:uc,fetchCallLogs:Yc,fetchCategoryTypeLinks:Mi,fetchChurnAlerts:zl,fetchChurnNotes:jc,fetchCustomerAnalysis:To,fetchCustomerEfficiency:Hl,fetchCustomerEfficiencyByYear:Pt,fetchCustomerLedger:Bn,fetchCustomerPriceGroup:Sa,fetchCustomerPricing:bn,fetchCustomerProductBreakdown:Pi,fetchCustomersWithoutGeo:Zo,fetchDailyShiftPlans:cr,fetchDeliveryLocations:Fc,fetchDeliveryNote:zn,fetchDeliverySchedule:Bl,fetchDemandAnalysis:id,fetchDemandForecasts:Ol,fetchEntityMonthlySales:Ai,fetchFaxInbox:bc,fetchFeatureStatuses:Ia,fetchFrequentCustomers:Tl,fetchFrequentProducts:Il,fetchIntegrationSettings:Qo,fetchInvoiceLines:gn,fetchInvoices:Xt,fetchJikomiList:Ro,fetchKenteiList:Bo,fetchLabelExclusions:Ll,fetchLeadItems:Kc,fetchLeadLists:Hc,fetchMailSenders:cc,fetchMapCustomers:Rc,fetchMasterStats:On,fetchMaterialList:jo,fetchMyProfile:_c,fetchOrderHeaders:yd,fetchPayableList:Fo,fetchPaymentStatus:xo,fetchPeriodChartData:Si,fetchPipelineMeta:$o,fetchPrintLayouts:rc,fetchProcurementDecisions:Hi,fetchProductABC:Io,fetchProductCustomerBreakdown:Ei,fetchProductDaily:Jl,fetchProductMonthlyShipments:Rl,fetchProductPower:Ul,fetchProductPrice:xn,fetchProductShipmentsFromTable:Yl,fetchProductionPlan:cd,fetchProspectActivities:Tc,fetchProspects:Dc,fetchPurchaseList:zo,fetchQuoteList:Ta,fetchQuoteWithLines:nr,fetchRawMaterialStock:Yo,fetchRawRecords:_a,fetchRawTableList:ar,fetchRicePurchaseCommitments:ul,fetchRiceVarieties:hl,fetchSafetyStockParams:ld,fetchSakeTaxByMonth:Jn,fetchSalesAnalytics:jn,fetchSalesReport:Lo,fetchSalesSummary:wo,fetchSeasonalProfiles:Vl,fetchShipmentCalendar:md,fetchShopifyOrders:fc,fetchSlackLogs:Lc,fetchSlackRules:Wo,fetchStaffCustomerBreakdown:$i,fetchStaffList:Dl,fetchStaffMembers:Zn,fetchStaffProductBreakdown:_i,fetchStaffTotalsByPeriod:xi,fetchStepLabor:dl,fetchStoreOrders:Ho,fetchStoreSales:Hn,fetchSyncDashboard:_o,fetchSystemHealth:So,fetchSystemSetting:bo,fetchTankList:Oo,fetchTankMovements:Wl,fetchTankMovementsByTank:Gl,fetchTanks:nl,fetchTaxDeclaration:Un,fetchTourInquiriesFromDb:ed,fetchTypesInCategory:kl,fetchUserProfiles:$c,fetchVisitPriorities:Fl,fetchWorkerSettings:ll,fetchWorkflowOrdersFromDb:Xc,fetchWorkforceMetrics:lr,generateTaxCSV:ac,generateTaxXML:Jo,getTankOccupancy:rl,linkTypeToCategory:Ni,ocrFaxImage:wc,periodToDateRange:Po,preloadInvoiceLines:ko,prevYearFilter:ki,reassignBrewingStockEntry:xl,recalculateTaxDeclaration:nc,recordAudit:Pc,resolveProductPrice:Vn,saveBrewingAlcoholSetting:ji,saveBrewingForecastOverride:Vi,saveBrewingRiceParams:Ui,saveBrewingSchedule:Ti,saveCalendarEvent:mc,saveCallLog:er,saveChurnNote:zc,saveDailyShiftPlans:dr,saveDeliveryLocation:Vc,saveEmailCampaign:$a,saveFaxRecord:xc,saveIntegrationSetting:ta,saveInvoice:Ao,saveLabelExclusions:Cl,saveLeadItem:tr,saveLeadList:Qc,saveMailSender:dc,saveMaterial:Mc,savePrintLayout:ic,saveProcurementDecision:Ki,saveProductionPlan:pd,saveProspect:Go,saveProspectActivity:Ic,saveRicePurchaseCommitment:ml,saveSafetyStockParamsBulk:dd,saveSlackRule:Ac,saveStoreOrder:oc,saveTank:Kl,saveTankMovement:Xl,saveTaxDeclaration:sc,saveTourInquiry:td,saveUserProfile:Sc,saveWorkerSettings:cl,saveWorkflowOrder:Zc,searchPlaces:Wc,sendEmailCampaign:Ko,sendSlackNotification:Cc,setBrewingCategoryOverride:El,submitFeatureRequest:Co,syncGoogleCalendar:vc,syncIvryCallLogs:Uc,syncPhoneBookToIvry:Jc,syncShopifyOrders:hc,unconfirmFeature:or,unlinkTypeFromCategory:Ri,updateBrewingBatch:al,updateBrewingProcessStep:tl,updateCustomer:Do,updateProduct:qo,upsertBrewingStock:Ii,upsertStaffMember:rr,upsertSystemSetting:St},Symbol.toStringTag,{value:"Module"}));function wt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const fd={open:"未締め",closed:"締め済"};function gd(e,t){const n=e.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${wt(s.salesAmount)}</td>
        <td class="numeric">${wt(s.taxAmount)}</td>
        <td class="numeric">${wt(s.prevBalance)}</td>
        <td class="numeric">${wt(s.paymentAmount)}</td>
        <td class="numeric"><strong>${wt(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${fd[s.status]}</span>
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
        <p class="kpi-value">${wt(e.totalBilling)}</p>
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
  `}const vd={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},bd={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function bs(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oa(e){const t=bd[e],n=vd[e].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${bs(s.title)}</p>
            <p class="category-card-description">${bs(s.description)}</p>
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
  `}function pr(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Ut(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function wd(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${pr(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${Ut(t.amount)}</td>
        </tr>
      `).join("")}function xd(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${pr(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${Ut(t.amount)}</td>
        </tr>
      `).join("")}function $d(e,t){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">得意先台帳</p>
        <h1>得意先別売上・入金台帳</h1>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid ledger-filter-grid">
        <label class="field">
          <span>得意先（コードまたは名前）</span>
          <div class="search-input-wrap" style="position:relative">
            <input id="ledger-customer-code" type="text" value="${t}"
              placeholder="コード or 得意先名" autocomplete="off" />
            <div id="ledger-cust-suggestions" class="search-results" style="display:none"></div>
          </div>
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
            <dd>${Ut(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${Ut(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${Ut(e.balanceAmount)}</dd>
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
            <tbody>${wd(e)}</tbody>
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
            <tbody>${xd(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function It(e,t,n){const s=e.findIndex(i=>i.column===t);if(s>=0){if(e[s].direction==="asc"){const c=[...e];return c[s]={column:t,direction:"desc"},c}return e.filter((c,d)=>d!==s)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function _d(e,t){const n=e.findIndex(i=>i.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const s=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${s}${r}</span>`}function oe(e,t,n,s=""){return`<th class="sortable ${s}" data-sort-col="${e}">${t} ${_d(n,e)}</th>`}function ws(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function Lt(e,t,n){return t.length===0?e:[...e].sort((s,r)=>{for(const{column:i,direction:c}of t){const d=n[i];if(!d)continue;const u=ws(s[d]),y=ws(r[d]);let h=0;if(typeof u=="number"&&typeof y=="number"?h=u-y:h=String(u).localeCompare(String(y),"ja"),h!==0)return c==="asc"?h:-h}return 0})}const Sd={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},xs={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},Mt={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function kd(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function Pd(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Ed(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function ur(e,t){const n=Pd(t),s=Ed(t),[r,i]=t.split("-").map(Number),c=new Map;e.forEach(l=>{if(l.date.slice(0,7)===t){const p=l.date.slice(0,10);c.has(p)||c.set(p,[]),c.get(p).push(l)}});const d=e.filter(l=>l.date.slice(0,7)===t),u=d.reduce((l,p)=>l+p.quantity,0),y=new Set(d.map(l=>l.date)).size,h=new Date().toISOString().slice(0,10),g=["日","月","火","水","木","金","土"].map(l=>`<th class="dcal-header">${l}</th>`).join("");let $="",_=1;for(let l=0;l<6&&!(_>n&&l>0);l++){$+="<tr>";for(let p=0;p<7;p++)if(l===0&&p<s||_>n)$+='<td class="dcal-cell dcal-empty"></td>';else{const m=`${r}-${String(i).padStart(2,"0")}-${String(_).padStart(2,"0")}`,f=c.get(m)||[],w=m===h,b=f.reduce((x,P)=>x+P.quantity,0);$+=`
          <td class="dcal-cell ${w?"dcal-today":""}">
            <div class="dcal-day">${_}</div>
            ${f.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${f[0].status}">${f.length}件 ${b}本</div>
              </div>
            `:""}
          </td>`,_++}$+="</tr>"}const[S,C]=i===1?[r-1,12]:[r,i-1],[k,L]=i===12?[r+1,1]:[r,i+1],E=`${S}-${String(C).padStart(2,"0")}`,o=`${k}-${String(L).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${i}月: ${y}日稼働 / ${d.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${E}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${i}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${o}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${g}</tr></thead>
        <tbody>${$}</tbody>
      </table>
    </section>
  `}function Ad(e,t){const n=t==="all"?e:e.filter(d=>d.segment===t),s={all:e.length};e.forEach(d=>{s[d.segment]=(s[d.segment]??0)+1});const i=["all",...[...new Set(e.map(d=>d.segment))]].map(d=>`
      <button class="button ${t===d?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${d}">
        ${d==="all"?"全て":xs[d]??d} (${s[d]??0})
      </button>
    `).join(""),c=n.map(d=>`
      <tr>
        <td class="mono">${d.code}</td>
        <td>${d.name}</td>
        <td><span class="segment-badge" style="background:${Mt[d.segment]??"#718096"};">${xs[d.segment]??d.segment}</span></td>
        <td class="numeric">${d.avgMonthly>0?d.avgMonthly.toLocaleString():"—"}</td>
        <td class="numeric" style="font-weight:700;">${d.nextMonthForecast>0?d.nextMonthForecast.toLocaleString():"—"}</td>
        <td class="numeric">${d.annualForecast>0?d.annualForecast.toLocaleString():"—"}</td>
        <td class="numeric">${d.safetyStock>0?d.safetyStock.toLocaleString():"—"}</td>
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
            <li><span class="segment-badge" style="background:${Mt.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${Mt["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${Mt["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${Mt["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
          </ul>
        </div>
      </div>

      <div class="button-group" style="margin-bottom:12px;">${i}</div>

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
          <tbody>${c}</tbody>
        </table>
      </div>
    </section>
  `}function Ld(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${ur(e.deliveries,e.calendarMonth)}
    ${Ad(e.forecasts,e.selectedSegment)}
  `}function Cd(e,t){return ur(e,t)}const ra={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function $s(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function Wa(e,t,n){if(t==="all")return e;const s=new Date,r=s.toISOString().slice(0,10),i=new Date(s);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===r);case"month":return e.filter(c=>c.date.slice(0,7)===r.slice(0,7));case"future":{const c=new Date(s.getFullYear(),s.getMonth(),1).toISOString().slice(0,10);return e.filter(d=>d.date.slice(0,10)>=c)}case"90days":return i.setDate(i.getDate()-90),e.filter(c=>c.date>=i.toISOString());case"year":return i.setFullYear(i.getFullYear()-1),e.filter(c=>c.date>=i.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const d=c.date.slice(0,10);return d>=n.start&&d<=n.end})}}function Te(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ga(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Dd(e){const s={top:20,right:20,bottom:30,left:50},r=760-s.left-s.right,i=260-s.top-s.bottom,c=Math.max(...e.map(h=>h.amount),1),d=r/e.length,u=e.map((h,g)=>{const $=h.amount/c*i,_=s.left+g*d+4,S=s.top+i-$,C=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(h.date));return`
        <g>
          <rect x="${_}" y="${S}" width="${Math.max(d-8,8)}" height="${$}" rx="4" fill="#0F5B8D" opacity="${.58+g/e.length*.34}" />
          ${g%5===0?`<text x="${_+6}" y="252" class="chart-axis">${C}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(h=>{const g=s.top+i-i*h,$=Math.round(c*h/1e3);return`
        <g>
          <line x1="${s.left}" y1="${g}" x2="${760-s.right}" y2="${g}" class="chart-grid" />
          <text x="6" y="${g+4}" class="chart-axis">${$.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function qd(e,t,n,s,r="month",i,c=[]){const d={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=Wa(e.allDailySales,r,i),y=u.reduce((j,V)=>j+V.amount,0),h=u.reduce((j,V)=>j+V.bottles,0),g=u.reduce((j,V)=>j+V.volumeMl,0),$=u.length,_=h>0?Math.round(y/h):0,S=g>0?Math.round(y/(g/1e3)):0,C=new Date,k=C.toISOString().slice(0,10),L=k.slice(0,7),E=Wa(e.allDailySales,"month").filter(j=>j.date.slice(0,10)<=k),o=E.reduce((j,V)=>j+V.amount,0);E.reduce((j,V)=>j+V.bottles,0);const l=C.getDate();new Date(C.getFullYear(),C.getMonth()+1,0).getDate();const m=(s?.orderHeaders??[]).filter(j=>j.sales_date.slice(0,7)===L),f=m.reduce((j,V)=>j+Number(V.total_amount),0),w=m.length,b=Wa(e.allDailySales,"month"),x=b.reduce((j,V)=>j+V.bottles,0),P=f>0?f:b.reduce((j,V)=>j+V.amount,0),D=f>0?"orders":"extrapolation",R=(u.length>0?e.allDailySales.filter(j=>{const V=u[0]?.date??"",U=u[u.length-1]?.date??"",W=$s(V,-1),H=$s(U,-1);return j.date>=W&&j.date<=H}):[]).reduce((j,V)=>j+V.amount,0),B=R>0?(y-R)/R*100:0,M=B>0?"+":"",O=e.salesRecords.slice(0,10).map(j=>`
            <tr class="clickable-row" data-doc-no="${j.documentNo}" style="cursor:pointer">
              <td class="mono">${j.documentNo}</td>
              <td>${Ga(j.date)}</td>
              <td>${j.customerName}</td>
              <td class="numeric">${Te(j.amount)}</td>
            </tr>
          `).join(""),I=["today","month","future","90days","year","all"].map(j=>`<button class="button ${j===r?"primary":"secondary"} small" type="button" data-period="${j}">${ra[j]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${d[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${Ga(t.lastSyncAt)}</span>
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
        <p class="panel-title">当日出荷高</p>
        <p class="kpi-value">${Te(e.kpis.todaySales)}</p>
        <p class="kpi-sub">${e.kpis.todaySales>0?`${new Date().getMonth()+1}/${new Date().getDate()} 時点`:"本日データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月実績（本日まで）</p>
        <p class="kpi-value">${Te(o)}</p>
        <p class="kpi-sub">${l}日経過 / ${E.length}営業日 / 日平均 ${E.length>0?Te(Math.round(o/E.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${Te(P)}</p>
        <p class="kpi-sub">${D==="orders"?`受注確定 ${w}件`:`出荷見込 ${x.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${B>=0?"#2f855a":"#c53d3d"}">${R>0?`${M}${B.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${R>0?Te(R):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${Te(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${r!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${ra[r]}売上</p>
        <p class="kpi-value">${Te(y)}</p>
        <p class="kpi-sub">${$}日間${$>0?` / 日平均 ${Te(Math.round(y/$))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${h.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${Te(_)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(g/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${Te(S)}</p>
      </article>
    </section>

    ${s?.masterCounts?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先マスタ</p>
        <p class="kpi-value">${s.masterCounts.customers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品マスタ</p>
        <p class="kpi-value">${s.masterCounts.products.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">仕入先</p>
        <p class="kpi-value">${s.masterCounts.suppliers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
    </section>
    `:""}

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">${ra[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${Dd(u.length>0?u:e.dailySales)}
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
              <dd>${Ga(t.lastSyncAt)}</dd>
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
          <p class="panel-caption">最新10件　※タップで明細表示</p>
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
          <tbody>${O}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${ra[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${oe("date","日付",c)}
              ${oe("amount","売上",c,"numeric")}
              ${oe("bottles","本数",c,"numeric")}
              ${oe("volumeMl","液体量(L)",c,"numeric")}
              ${oe("pricePerBottle","本単価",c,"numeric")}
              ${oe("pricePerLiter","L単価",c,"numeric")}
            </tr>
          </thead>
          <tbody>${Lt(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(j=>`
            <tr>
              <td class="mono">${j.date.slice(0,10)}</td>
              <td class="numeric">${Te(j.amount)}</td>
              <td class="numeric">${j.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(j.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${Te(j.pricePerBottle)}</td>
              <td class="numeric">${Te(j.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${s?Td(s):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function Td(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(d=>d.startsAt.slice(0,10)>=t).slice(0,5),s=e.tourInquiries.filter(d=>d.status==="new").length,r=e.churnSummary,i=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,c=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
        <p class="panel-title">🔴 要対応顧客</p>
        <p class="kpi-value">${i}社</p>
        <p class="kpi-sub">離反${r.atRiskCount} / 休眠${r.dormantCount} / 下落${r.decliningCount}</p>
      </article>`:`<article class="panel kpi-card" style="cursor:pointer;" data-link="/churn-alert">
        <p class="panel-title">🔴 既存顧客アラート</p>
        <p class="kpi-value" style="font-size:1rem;">確認する</p>
        <p class="kpi-sub">離反・休眠・下落中</p>
      </article>`;return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">受注処理中</p>
        <p class="kpi-value">${e.workflowOrdersCount.new+e.workflowOrdersCount.picking+e.workflowOrdersCount.packed}件</p>
        <p class="kpi-sub">新規 ${e.workflowOrdersCount.new} / ピッキング ${e.workflowOrdersCount.picking} / 梱包 ${e.workflowOrdersCount.packed}</p>
      </article>
      ${c}
      <article class="panel kpi-card ${s>0?"kpi-alert":""}">
        <p class="panel-title">未対応問合せ</p>
        <p class="kpi-value">${s}件</p>
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
          <div><h2>🚨 既存顧客の状況</h2><p class="panel-caption">離反・休眠・売上下落のリスク顧客</p></div>
          <button class="button secondary" data-link="/churn-alert">アクション一覧</button>
        </div>
        ${r?`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
              <div style="background:#fff5f5;border:1px solid #fed7d7;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#c53030;font-weight:600;margin-bottom:4px;">🔴 離反リスク</div>
                <div style="font-size:32px;font-weight:700;color:#c53030;">${r.atRiskCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
              <div style="background:#fffaf0;border:1px solid #fbd38d;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#c05621;font-weight:600;margin-bottom:4px;">🟠 休眠</div>
                <div style="font-size:32px;font-weight:700;color:#c05621;">${r.dormantCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
              <div style="background:#fffff0;border:1px solid #f6e05e;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#975a16;font-weight:600;margin-bottom:4px;">🟡 下落中</div>
                <div style="font-size:32px;font-weight:700;color:#975a16;">${r.decliningCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
            </div>
            <p style="margin:12px 0 0;font-size:12px;color:var(--text-secondary);">対象売上合計リスク: <strong>${new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(r.totalImpact)}</strong></p>`:'<p class="empty-note" style="cursor:pointer;" data-link="/churn-alert">クリックして詳細を確認</p>'}
      </article>

      <aside class="panel">
        <div class="panel-header">
          <div><h2>📅 直近の予定</h2></div>
          <button class="button secondary" data-link="/calendar">カレンダー</button>
        </div>
        ${n.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${n.map(d=>{const u=new Date(d.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${d.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${u.getMonth()+1}/${u.getDate()} ${d.isAllDay?"終日":u.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${d.title}</div>
                  ${d.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${d.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?Cd(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?Id(e.orderHeaders):""}
  `}function Id(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),s=new Date().toISOString().slice(0,10),r=s.slice(0,7),i=new Map;for(const g of e){const $=g.sales_date.slice(0,7),_=i.get($)??{count:0,total:0};i.set($,{count:_.count+1,total:_.total+Number(g.total_amount)})}const c=[...i.keys()].sort(),d=e.reduce((g,$)=>g+Number($.total_amount),0),u=c.map(g=>{const{count:$,total:_}=i.get(g);return`<tr>
      <td class="mono" style="font-weight:700;">${g===r?`${g}（当月）`:g}</td>
      <td class="numeric">${$.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(_)}</td>
    </tr>`}).join(""),y=e.filter(g=>g.sales_date>=s).slice(0,30),h=y.map(g=>`<tr>
    <td class="mono">${g.sales_date}</td>
    <td>${g.customer_name||"―"}</td>
    <td class="numeric">${t.format(Number(g.total_amount))}</td>
  </tr>`).join("");return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>受注明細サマリー</h2>
          <p class="panel-caption">当月以降の受注 ${e.length}件</p>
        </div>
        <span style="font-size:1.2rem;font-weight:700;color:var(--accent);">${t.format(d)}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>月</th><th class="numeric">件数</th><th class="numeric">受注高</th></tr></thead>
          <tbody>${u}</tbody>
        </table>
      </div>
      ${y.length>0?`
      <div class="panel-header" style="margin-top:16px;">
        <div><h3 style="font-size:13px;font-weight:600;">本日以降の受注（${y.length}件）</h3></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>受注日</th><th>得意先</th><th class="numeric">金額</th></tr></thead>
          <tbody>${h}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function Md(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function xt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Nd(e,t){const n=e.lines.length?e.lines.map((r,i)=>`
          <tr>
            <td class="numeric">${i+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${xt(r.unitPrice)}</td>
            <td class="numeric">${xt(r.amount)}</td>
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
            <tr><th>納品日</th><td>${Md(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${xt(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${xt(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${xt(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${xt(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function ze(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Rd(e){return ze(e).replaceAll(`
`,"<br />")}function Od(e){const n=[...Object.values(Rn),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${ze(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${ze(r.name)}</span>
              <span class="table-sub">${ze(r.email)} / ${ze(r.area)}</span>
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
          <input id="email-subject" type="text" value="${ze(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${ze(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${ze(r.name)} &lt;${ze(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${ze(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?Rd(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${ze(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function je(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ia(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function Bd(e,t){const n=[ia("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${je(r.name)}</strong>
            <span class="table-sub mono">${je(r.code)}</span>
          </button>
        `)),ia("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${je(r.name)}</strong>
            <span class="table-sub mono">${je(r.code)}</span>
          </button>
        `)),ia("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${je(r.documentNo)}</strong>
            <span class="table-sub">${je(r.customerName)} / ${je(r.date)}</span>
          </button>
        `)),ia("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${je(r.path)}"
          >
            <strong>${je(r.title)}</strong>
            <span class="table-sub mono">${je(r.path)}</span>
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
            value="${je(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function Nt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function mr(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${Nt(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${Nt(e.title)}">
        <div class="modal-header">
          <h2>${Nt(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${Nt(e.placeholder)}"
            value="${Nt(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function Xe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function _s(e){return e.trim().toLowerCase()}function jd(e,t,n=[]){const s=_s(t),r=e.filter(d=>s?[d.code,d.name,d.kanaName,d.shortName].map(_s).some(u=>u.includes(s)):!0).slice(0,50),i=!s&&n.length>0?`<div style="padding:8px 12px;border-bottom:2px solid var(--border,#e5e7eb);">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#6b7280);margin-bottom:6px;">よく使う得意先</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${n.map(d=>`<button class="freq-chip" type="button" data-action="picker-select" data-code="${Xe(d.code)}" data-name="${Xe(d.name)}">${Xe(d.name)} <small style="opacity:0.6">${d.count}件</small></button>`).join("")}
        </div>
      </div>`:"",c=r.length?`
        ${i}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名前</th>
                <th>カナ</th>
                <th>締日</th>
              </tr>
            </thead>
            <tbody>
              ${r.map(d=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Xe(d.code)}"
                      data-name="${Xe(d.name)}"
                    >
                      <td class="mono">${Xe(d.code)}</td>
                      <td>${Xe(d.name)}</td>
                      <td style="font-size:0.8rem;color:var(--text-muted,#6b7280)">${Xe(d.kanaName||"")}</td>
                      <td>${d.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:i;return mr({title:"得意先検索",searchQuery:t,placeholder:"コード・名前・カナで検索",resultsHtml:c,emptyMessage:"該当する得意先が見つかりません。"})}function Ss(e){return e.toISOString().slice(0,10)}function Le(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function lt(e,t){return e[t]?`<div class="field-error">${Le(e[t])}</div>`:""}function $t(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function zd(e,t,n,s,r,i,c){const d=Object.keys(vn).map(C=>`<option value="${C}" ${e.invoiceType===C?"selected":""}>${vn[C]}</option>`).join(""),u=r.map(C=>`<option value="${Le(C.code)}" ${e.registeredBy===C.code?"selected":""}>${Le(C.name)}（${Le(C.code)}）</option>`).join(""),y=e.staffCode?(()=>{const C=r.find(k=>k.code===e.staffCode);return C?`${C.name}（${C.code}）`:e.staffCode})():"—",h=i.length>0?`<div class="freq-chips">
        <span class="freq-label">よく使う:</span>
        ${i.map(C=>`<button class="freq-chip" type="button" data-action="select-freq-customer" data-code="${Le(C.code)}" data-name="${Le(C.name)}" title="${C.count}件">${Le(C.name)}</button>`).join("")}
      </div>`:"",g=c.length>0?`<div class="freq-chips">
        <span class="freq-label">よく使う:</span>
        ${c.map(C=>`<button class="freq-chip" type="button" data-action="select-freq-product" data-code="${Le(C.code)}" data-name="${Le(C.name)}" title="${C.count}回">${Le(C.name)}</button>`).join("")}
      </div>`:"",$=e.lines.map((C,k)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${$t(s,`lines.${k}.productCode`,"input-cell")}" type="text" data-line="${k}" data-field="productCode" value="${Le(C.productCode)}" placeholder="商品コード" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${k}" aria-label="商品検索">🔍</button>
          </div>
          ${lt(s,`lines.${k}.productCode`)}
        </td>
        <td>
          <input class="${$t(s,`lines.${k}.productName`,"input-cell")}" type="text" data-line="${k}" data-field="productName" value="${Le(C.productName)}" placeholder="商品名" data-autofill="product-name" />
          ${lt(s,`lines.${k}.productName`)}
        </td>
        <td>
          <input class="${$t(s,`lines.${k}.quantity`,"input-cell numeric")}" type="number" data-line="${k}" data-field="quantity" value="${C.quantity}" min="0" />
          ${lt(s,`lines.${k}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${k}" data-field="unit" value="${C.unit}" placeholder="本" /></td>
        <td>
          <input class="${$t(s,`lines.${k}.unitPrice`,"input-cell numeric")}" type="number" data-line="${k}" data-field="unitPrice" value="${C.unitPrice}" min="0" />
          ${lt(s,`lines.${k}.unitPrice`)}
        </td>
        <td class="numeric">${C.amount>0?C.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${k}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${k}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),_=e.lines.reduce((C,k)=>C+k.amount,0),S=Math.floor(_*10/110);return`
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
          <select id="inv-type">${d}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${$t(s,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Ss(new Date)}" />
          ${lt(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>納品日</span>
          <input id="inv-delivery-date" type="date" value="${e.deliveryDate||e.invoiceDate||Ss(new Date)}" />
          <div class="form-hint">空欄の場合は伝票日付と同じ</div>
        </label>
      </div>

      <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
        <label class="field">
          <span>得意先</span>
          <div class="input-group">
            <input
              class="${$t(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="コードまたは名前で検索"
              value="${Le(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">コード・名前・カナで検索できます</div>
          ${lt(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="名前で検索"
            value="${Le(e.customerName)}"
          />
        </label>
        <div class="field">
          <span>営業担当</span>
          <div class="staff-display" id="inv-sales-staff">${Le(y)}</div>
          <div class="form-hint">得意先に紐づく営業担当（自動セット）</div>
        </div>
      </div>

      ${h}

      <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
        <label class="field">
          <span>伝票登録者</span>
          <div class="input-group">
            <select id="inv-registered-by">
              <option value="">選択してください</option>
              ${u}
            </select>
            <button class="button secondary small" type="button" data-action="open-new-staff" title="担当者を新規登録">＋</button>
          </div>
        </label>
      </div>
      ${lt(s,"lines")}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${e.lines.length} 行</p>
        </div>
        <button class="button secondary" data-action="add-line">＋ 行追加</button>
      </div>
      ${g}
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
          <tbody id="invoice-lines">${$||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(_-S).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${S.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${_.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Le(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>

    <style>
      .staff-display {
        padding: 8px 12px;
        background: var(--bg-subtle, #f3f4f6);
        border: 1px solid var(--border, #e5e7eb);
        border-radius: 6px;
        font-size: 0.9rem;
        color: var(--text, #111);
        min-height: 38px;
        display: flex;
        align-items: center;
      }
      .freq-chips {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        padding: 8px 0;
      }
      .freq-label {
        font-size: 0.75rem;
        color: var(--text-muted, #6b7280);
        font-weight: 600;
        white-space: nowrap;
      }
      .freq-chip {
        font-size: 0.75rem;
        padding: 3px 10px;
        border-radius: 12px;
        border: 1px solid #dbeafe;
        background: #eff6ff;
        color: #1d4ed8;
        cursor: pointer;
        transition: background 0.1s, border-color 0.1s;
        white-space: nowrap;
      }
      .freq-chip:hover {
        background: #dbeafe;
        border-color: #93c5fd;
      }
    </style>
  `}function Fd(e){return"¥"+e.toLocaleString("ja-JP")}function Vd(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const Yd={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},Ud={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},Jd={sake:"酒販用",standard:"通常"};function Hd(e,t,n="",s=""){const r=n?e.filter(u=>u.legacy_customer_code===n):e,i=8,c=t?`<tr><td colspan="${i}" class="empty-row">読み込み中…</td></tr>`:r.length===0?`<tr><td colspan="${i}" class="empty-row">見積書がありません</td></tr>`:r.map(u=>`
      <tr>
        <td class="mono">${u.quote_no}</td>
        <td>${Vd(u.quote_date)}</td>
        <td>${u.customer_name||"（未選択）"}</td>
        <td>${u.subject||""}</td>
        <td class="numeric">${Fd(u.total_amount)}</td>
        <td><span class="badge ${Ud[u.status]??"badge-gray"}">${Yd[u.status]??u.status}</span></td>
        <td>${Jd[u.template_type]??u.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${u.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${u.id}" data-quote-no="${u.quote_no}">削除</button>
        </td>
      </tr>
    `).join("");return`
    <section class="page-head">
      <div><p class="eyebrow">見積書</p><h1>見積一覧</h1></div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="quote-new">＋ 新規作成</button>
        <a class="button secondary" href="/quote-settings" data-link="/quote-settings">⚙ 会社設定</a>
      </div>
    </section>

    <section class="panel">
      ${n?`<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--primary-bg,#eff6ff);border-radius:6px;margin-bottom:12px;border:1px solid var(--primary,#3b82f6);">
        <span style="font-size:13px;color:var(--primary,#3b82f6);font-weight:600;">🔍 ${s||n} の見積のみ表示中</span>
        <button class="button secondary small" data-action="quote-clear-filter" style="margin-left:auto;">全件表示に戻す</button>
      </div>`:""}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>見積番号</th>
              <th>日付</th>
              <th>得意先</th>
              <th>件名</th>
              <th class="numeric">合計</th>
              <th>ステータス</th>
              <th>種別</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${c}</tbody>
        </table>
      </div>
    </section>
  `}const yr="kanei-quote-settings",hr=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],ka={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function $n(){try{const e=localStorage.getItem(yr);if(e)return{...ka,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...ka,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...ka}}function yt(e){localStorage.setItem(yr,JSON.stringify(e))}function Ye(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function qe(e,t,n,s="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${s}" id="${e}" value="${Ye(n)}" placeholder="${Ye(r)}" /></div>`}function Kd(e,t,n,s){const r=s.map(i=>`<option value="${Ye(i)}" ${n===i?"selected":""}>${Ye(i)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function Qd(e){return`
    <section class="page-head">
      <div><p class="eyebrow">見積書</p><h1>会社・口座設定</h1></div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote-settings">保存</button>
        <a class="button secondary" href="/quote" data-link="/quote">← 見積一覧</a>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>発行元（自社情報）</h2></div>
      <div class="form-grid-2">
        ${qe("qs-company-name","会社名",e.companyName)}
        ${qe("qs-company-postal","郵便番号",e.companyPostal,"text","257-0014")}
        ${qe("qs-company-addr1","住所1",e.companyAddress1)}
        ${qe("qs-company-addr2","住所2",e.companyAddress2,"text","建物名等")}
        ${qe("qs-company-tel","電話番号",e.companyTel)}
        ${qe("qs-company-fax","FAX番号",e.companyFax)}
        ${qe("qs-company-email","メール",e.companyEmail,"email")}
        ${qe("qs-company-regno","適格請求書番号",e.companyRegistrationNo,"text","T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>振込口座</h2></div>
      <div class="form-grid-2">
        ${qe("qs-bank-name","銀行名",e.bankName,"text","横浜銀行")}
        ${qe("qs-bank-branch","支店名",e.bankBranch,"text","秦野支店")}
        ${Kd("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
        ${qe("qs-bank-no","口座番号",e.bankAccountNo,"text","1234567")}
        ${qe("qs-bank-holder","口座名義（カナ）",e.bankAccountHolder,"text","カ）カナイシュゾウテン")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${qe("qs-payment-terms","支払条件",e.defaultPaymentTerms,"text","月末締め翌月末払い")}
        ${qe("qs-header-note","書類上部メモ",e.defaultHeaderNote,"text","下記のとおりお見積り申し上げます。")}
        ${qe("qs-footer-note","書類下部メモ",e.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${hr.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${Ye(t.value)}"
            title="${Ye(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${Ye(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${Ye(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${Ye(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${Ye(e.accentColor||"#0968e5")}</code>
        </span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>社印</h2></div>
      <div class="quote-seal-area">
        ${e.sealImageDataUrl?`
          <div class="quote-seal-preview">
            <img src="${e.sealImageDataUrl}" alt="社印" style="width:${e.sealSize}px;height:${e.sealSize}px;" />
          </div>
          <div class="quote-seal-controls">
            <label>サイズ: <input type="range" id="qs-seal-size" min="40" max="120" value="${e.sealSize}" style="width:120px;" /> ${e.sealSize}px</label>
            <button class="button secondary small" type="button" data-action="remove-company-seal">削除</button>
          </div>
        `:'<p style="color:var(--text-secondary);font-size:13px;">社印画像（PNG推奨・透過背景）をアップロードしてください。</p>'}
        <div class="quote-seal-upload" style="margin-top:8px;">
          <label class="button secondary" style="cursor:pointer;">
            画像を選択
            <input type="file" id="qs-seal-file" accept="image/png,image/jpeg,image/gif" style="display:none;" />
          </label>
        </div>
      </div>
    </section>
  `}function Wd(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Ma(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:Wd(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Ma();function ae(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Re(e){return"¥"+e.toLocaleString("ja-JP")}function ks(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function fr(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function gr(e,t,n){return"#"+[e,t,n].map(s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0")).join("")}function Na(e,t){const[n,s,r]=fr(e);return gr(n+(255-n)*t,s+(255-s)*t,r+(255-r)*t)}function vr(e,t){const[n,s,r]=fr(e);return gr(n*(1-t),s*(1-t),r*(1-t))}function Gd(e){const t=vr(e,.15),n=Na(e,.88),s=Na(e,.96);return`
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:11px; color:#1a1a2e; padding:20mm 18mm 16mm; }
.q-doc { max-width: 720px; margin: 0 auto; }
/* タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） */
.q-title-row { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid ${e}; padding-bottom:8px; margin-bottom:12px; }
.q-title { font-size:22px; font-weight:700; letter-spacing:0.3em; color:${e}; }
.q-meta-box { display:flex; flex-direction:column; align-items:flex-end; gap:3px; }
.q-meta-item { display:flex; align-items:center; gap:5px; font-size:9px; }
.q-meta-label { color:#888; font-weight:400; white-space:nowrap; }
.q-meta-val { font-weight:600; padding:1px 0; line-height:1.4; white-space:nowrap; }
/* 取引先＋自社情報（2カラム） */
.q-parties { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:14px; }
.q-customer { flex:1; }
.q-customer-name { font-size:16px; font-weight:700; border-bottom:1px solid #bbb; padding-bottom:3px; margin-bottom:3px; }
.q-customer-addr { font-size:10px; color:#555; line-height:1.6; margin-top:2px; }
.q-seller-col { text-align:right; flex-shrink:0; }
.q-seller-name-row { display:flex; justify-content:flex-end; align-items:center; gap:6px; margin-bottom:3px; }
.q-seller-name { font-size:13px; font-weight:700; }
.q-seller-sub { color:#444; font-size:10px; margin-top:1px; line-height:1.5; }
.q-regno { color:#777; font-size:9px; }
/* 取引条件グリッド（合計バナーの上、4列） */
.q-cond-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#d0d8e8; border:1px solid #d0d8e8; border-radius:3px; margin-bottom:12px; font-size:10px; overflow:hidden; }
.q-cond-cell { background:white; padding:5px 7px; }
.q-cond-label { color:#888; font-size:9px; margin-bottom:2px; }
.q-cond-value { font-weight:600; color:#1a1a2e; }
/* 以下 */
.q-total-banner { display:flex; justify-content:space-between; align-items:center; background:${e}; color:white; padding:10px 16px; border-radius:4px; margin-bottom:14px; }
.q-total-label { font-size:12px; }
.q-total-amount { font-size:20px; font-weight:700; }
.q-subject { font-size:12px; font-weight:600; margin-bottom:8px; }
.q-note { font-size:10px; color:#555; margin-bottom:10px; }
.q-items { width:100%; border-collapse:collapse; margin-bottom:12px; font-size:10px; }
.q-items th { background:${e}; color:white; padding:5px 6px; font-weight:600; text-align:center; border:1px solid ${t}; }
.q-items td { padding:4px 6px; border:1px solid #d0d8e8; }
.q-items tbody tr:nth-child(even) td { background:${s}; }
.q-items tfoot td { padding:4px 6px; border:1px solid #d0d8e8; }
.q-total-row td { font-weight:700; font-size:12px; background:${n}; border-top:2px solid ${e}; }
.q-remarks { border:1px solid #ddd; padding:8px; font-size:10px; margin-bottom:10px; border-radius:3px; }
.q-remarks-label { font-weight:700; margin-bottom:3px; }
.q-footer-note { font-size:9px; color:#777; margin-bottom:8px; }
.billing-box { border-top:1px solid #e0e0e0; padding-top:8px; font-size:10px; color:#555; line-height:1.6; }
@media print { body { padding:10mm 12mm; } }
`}function Xd(e){const t=vr(e,.15),n=Na(e,.88),s=Na(e,.96);return`
.q-doc { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:13px; color:#1a1a2e; max-width:720px; margin:0 auto; }
.q-doc * { box-sizing:border-box; margin:0; padding:0; }
/* タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） */
.q-doc .q-title-row { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid ${e}; padding-bottom:10px; margin-bottom:14px; }
.q-doc .q-title { font-size:26px; font-weight:700; letter-spacing:0.3em; color:${e}; }
.q-doc .q-meta-box { display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
.q-doc .q-meta-item { display:flex; align-items:center; gap:6px; font-size:11px; }
.q-doc .q-meta-label { color:#888; font-weight:400; white-space:nowrap; }
.q-doc .q-meta-val { font-weight:600; padding:2px 0; line-height:1.4; white-space:nowrap; }
/* 取引先＋自社情報（2カラム） */
.q-doc .q-parties { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:16px; }
.q-doc .q-customer { flex:1; }
.q-doc .q-customer-name { font-size:18px; font-weight:700; border-bottom:1px solid #bbb; padding-bottom:4px; margin-bottom:4px; }
.q-doc .q-customer-addr { font-size:12px; color:#555; line-height:1.6; margin-top:3px; }
.q-doc .q-seller-col { text-align:right; flex-shrink:0; }
.q-doc .q-seller-name-row { display:flex; justify-content:flex-end; align-items:center; gap:8px; margin-bottom:4px; }
.q-doc .q-seller-name { font-size:14px; font-weight:700; }
.q-doc .q-seller-sub { color:#444; font-size:12px; margin-top:2px; line-height:1.5; }
.q-doc .q-regno { color:#777; font-size:11px; }
/* 取引条件グリッド（合計バナーの上、4列） */
.q-doc .q-cond-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#d0d8e8; border:1px solid #d0d8e8; border-radius:4px; margin-bottom:14px; font-size:12px; overflow:hidden; }
.q-doc .q-cond-cell { background:white; padding:7px 10px; }
.q-doc .q-cond-label { color:#888; font-size:11px; margin-bottom:3px; }
.q-doc .q-cond-value { font-weight:600; color:#1a1a2e; }
/* 以下 */
.q-doc .q-total-banner { display:flex; justify-content:space-between; align-items:center; background:${e}; color:white; padding:12px 18px; border-radius:6px; margin-bottom:16px; }
.q-doc .q-total-label { font-size:13px; }
.q-doc .q-total-amount { font-size:22px; font-weight:700; }
.q-doc .q-subject { font-size:13px; font-weight:600; margin-bottom:10px; }
.q-doc .q-note { font-size:12px; color:#555; margin-bottom:12px; }
.q-doc .q-table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; margin-bottom:14px; }
.q-doc .q-items { width:100%; border-collapse:collapse; font-size:12px; min-width:460px; }
.q-doc .q-items th { background:${e}; color:white; padding:7px 8px; font-weight:600; text-align:center; border:1px solid ${t}; white-space:nowrap; }
.q-doc .q-items td { padding:6px 8px; border:1px solid #d0d8e8; }
.q-doc .q-items tbody tr:nth-child(even) td { background:${s}; }
.q-doc .q-items tfoot td { padding:6px 8px; border:1px solid #d0d8e8; }
.q-doc .q-total-row td { font-weight:700; font-size:13px; background:${n}; border-top:2px solid ${e}; }
.q-doc .q-remarks { border:1px solid #ddd; padding:10px; font-size:12px; margin-bottom:12px; border-radius:4px; line-height:1.6; }
.q-doc .q-remarks-label { font-weight:700; margin-bottom:4px; }
.q-doc .q-footer-note { font-size:11px; color:#777; margin-bottom:10px; }
.q-doc .billing-box { border-top:1px solid #e0e0e0; padding-top:10px; font-size:12px; color:#555; line-height:1.7; }
@media (max-width:600px) {
  .q-doc .q-title { font-size:20px; letter-spacing:0.15em; }
  .q-doc .q-parties { flex-direction:column; gap:12px; }
  .q-doc .q-seller-col { align-self:stretch; }
  .q-doc .q-customer-name { font-size:16px; }
  .q-doc .q-total-banner { padding:10px 14px; }
  .q-doc .q-total-amount { font-size:20px; }
  .q-doc .q-conditions { max-width:100%; }
  .q-doc .q-items { min-width:380px; font-size:11px; }
  .q-doc .q-items th, .q-doc .q-items td { padding:5px 5px; }
}
`}function br(e,t){const n=e.lines.reduce((S,C)=>S+C.amount,0),s=Math.round(n*e.taxRate/100),r=n+s,i=e.templateType==="sake",c=i?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",d=i?9:6,u=e.lines.map((S,C)=>{const k=i?`<td style="font-size:9px;">${ae(S.janCode)}</td><td style="text-align:center;">${S.caseQty??""}</td><td style="text-align:right;">${S.retailPrice!=null?Re(S.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${C+1}</td>
      <td class="mono" style="font-size:9px;">${ae(S.productCode)}</td>
      <td>${ae(S.productName)}</td>
      ${k}
      <td style="text-align:right;">${S.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${ae(S.unit)}</td>
      <td style="text-align:right;">${Re(S.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${d}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),h=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${ae(y)}</p>
    </div>
  `:"",g=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",$=[];e.validUntil&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${ks(e.validUntil)}</div></div>`),e.paymentTerms&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${ae(e.paymentTerms)}</div></div>`),e.deliveryDate&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${ae(e.deliveryDate)}</div></div>`),e.deliveryPlace&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${ae(e.deliveryPlace)}</div></div>`);const _=$.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min($.length,4)},1fr);">${$.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${ae(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${ks(e.quoteDate)}</span></div>
    </div>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${ae(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${ae(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${ae(t.companyName)}</span>
        ${g}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${ae(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${ae(t.companyAddress1)}${t.companyAddress2?" "+ae(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${ae(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${ae(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${ae(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${_}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${Re(r)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${ae(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${ae(t.defaultHeaderNote)}</p>`:""}

  <div class="q-table-wrap">
  <table class="q-items">
    <thead>
      <tr>
        <th style="width:28px;">No.</th>
        <th style="width:60px;">品番</th>
        <th>品名</th>
        ${c}
        <th style="width:42px;">数量</th>
        <th style="width:32px;">単位</th>
        <th style="width:80px;">${i?"納入価格":"単価"}</th>
      </tr>
    </thead>
    <tbody>${u}</tbody>
    <tfoot>
      <tr><td colspan="${d-1}" style="text-align:right;">小計</td><td style="text-align:right;">${Re(n)}</td></tr>
      <tr><td colspan="${d-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Re(s)}</td></tr>
      <tr class="q-total-row"><td colspan="${d-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Re(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${ae(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${ae(t.defaultFooterNote)}</p>`:""}

  ${h}
</div>`}function wr(e,t,n,s,r,i,c){const d=e.lines.reduce((S,C)=>S+C.amount,0),u=Math.round(d*e.taxRate/100),y=d+u,h=e.templateType==="sake",g=s.length>=1?t.filter(S=>S.name.includes(s)||S.code.includes(s)).slice(0,8):[],$=r.length>=1?n.filter(S=>S.name.includes(r)||S.code.includes(r)).slice(0,8):[];if(e.previewMode){const S=c.accentColor||"#0968e5";return`
      <section class="page-head q-print-hide">
        <div><p class="eyebrow">見積書</p><h1>プレビュー</h1></div>
        <div class="meta-stack">
          <button class="button secondary" type="button" data-action="quote-edit-mode">← 編集に戻る</button>
          <button class="button primary" type="button" onclick="window.print()">🖨 印刷</button>
          <button class="button secondary" type="button" data-action="quote-download-pdf">PDF</button>
          <button class="button secondary" type="button" data-action="save-quote">保存</button>
        </div>
      </section>
      <style>
        ${Xd(S)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${br(e,c)}
      </div>
    `}const _=e.lines.map((S,C)=>{const k=h?`
      <td><input type="text" class="jan-input" data-line-idx="${C}" value="${ae(S.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${C}" value="${S.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${C}" value="${S.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${ae(S.productCode)}</td>
      <td>${ae(S.productName)}</td>
      ${k}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${C}" value="${S.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${ae(S.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${C}" value="${S.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${Re(S.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${C}">×</button></td>
    </tr>`}).join("")||`<tr><td colspan="${h?10:7}" style="text-align:center;color:var(--text-secondary);padding:20px;">商品を検索して追加</td></tr>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">見積書</p>
        <h1>${e.id?"見積編集":"新規見積"}</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote">保存</button>
        <button class="button secondary" type="button" data-action="quote-preview-mode">プレビュー・印刷</button>
        <button class="button secondary" type="button" data-action="quote-back-list">← 一覧</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>基本情報</h2></div>
      <div class="form-row" style="margin-bottom:12px;">
        <label>カラーテーマ</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;align-items:center;">
          ${hr.map(S=>`
            <button type="button" data-action="set-accent-color" data-color="${ae(S.value)}" title="${ae(S.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===S.value?"#333":"transparent"};background:${ae(S.value)};cursor:pointer;"></button>
          `).join("")}
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-row"><label>テンプレート種別</label>
          <div style="display:flex;gap:12px;margin-top:4px;">
            <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="q-template" value="sake" ${e.templateType==="sake"?"checked":""} id="q-tpl-sake" /> 酒販用（JAN・希望小売価格あり）
            </label>
            <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="q-template" value="standard" ${e.templateType==="standard"?"checked":""} id="q-tpl-standard" /> 通常
            </label>
          </div>
        </div>
        <div class="form-row"><label>見積番号</label>
          <input type="text" id="q-no" value="${ae(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${ae(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${ae(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${ae(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${ae(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${ae(s)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${g.length>0?`<div class="search-results">${g.map(S=>`
        <button class="search-item" type="button" data-select-customer="${S.code}" data-cust-name="${ae(S.name)}" data-cust-addr="${ae(S.address1||"")}">
          <span class="mono">${S.code}</span> ${ae(S.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${ae(e.customerCode)}</span> <strong>${ae(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${ae(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${ae(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${ae(e.customerAddress)}</span>`:""}</div>`:""}
      </div>

      ${e.customerName?`
      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">販売区分（単価ベース）</p>
        <select id="q-price-type" style="padding:6px 10px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;width:100%;">
          <option value=""   ${(e.manualPriceType??"")===""?"selected":""}>卸価格（デフォルト）</option>
          <option value="002" ${e.manualPriceType==="002"?"selected":""}>002｜卸売・量販向け</option>
          <option value="001" ${e.manualPriceType==="001"?"selected":""}>001｜小売店向け（定価）</option>
          <option value="000" ${e.manualPriceType==="000"?"selected":""}>000｜生産者・酒蔵向け</option>
        </select>
        ${i?`<p style="font-size:11px;color:var(--text-secondary);margin-top:4px;">現在の区分：<strong>${i.priceType==="000"?"生産者価格":i.priceType==="001"?"小売価格（定価）":"卸価格"}</strong>（得意先マスタ設定）</p>`:""}
      </div>`:""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${ae(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${$.length>0?`<div class="search-results">${$.map(S=>{const C=i?Vn(S,i):{price:S.salePrice||0,label:"卸価格"},k=S.listPrice||0,L=C.label!=="標準価格"&&C.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${S.code}" data-prod-name="${ae(S.name)}" data-prod-price="${C.price}" data-prod-retail="${k}" data-prod-jan="${ae(S.janCode??"")}" data-prod-unit="${ae(S.unit??"本")}" data-prod-case="${S.caseQty??""}">
          <span class="mono">${S.code}</span> ${ae(S.name)}
          <span class="numeric" ${L?'style="color:#2f855a;font-weight:700;"':""}>納入 ${C.price?Re(C.price):"未設定"} <small>(${C.label})</small>${k?`　定価 ${Re(k)}`:""}</span>
        </button>`}).join("")}</div>`:""}

      <div class="table-wrap" style="margin-top:10px;">
        <table>
          <thead>
            <tr>
              <th>品番</th><th>品名</th>
              ${h?'<th>JANコード</th><th>入数</th><th class="numeric">希望小売価格</th>':""}
              <th class="numeric">数量</th><th>単位</th><th class="numeric">${h?"納入価格":"単価"}</th><th class="numeric">金額</th><th></th>
            </tr>
          </thead>
          <tbody>${_}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${ae(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${Re(d)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${Re(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${Re(y)}</span></div>
        </div>
      </div>
    </section>
  `}async function Zd(e,t){const n=t.accentColor||"#0968e5",s=document.createElement("div");s.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",s.innerHTML=`<style>${Gd(n)}</style>${br(e,t)}`,document.body.appendChild(s);try{const[{default:r},{jsPDF:i}]=await Promise.all([N(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),N(()=>import("./jspdf.es.min-Cjrv2tNh.js").then(S=>S.j),[])]),c=await r(s,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),d=210,u=297,y=c.width/d,h=u*y,g=new i({orientation:"portrait",unit:"mm",format:"a4"});let $=0,_=0;for(;$<c.height;){_>0&&g.addPage();const S=Math.min(h,c.height-$),C=document.createElement("canvas");C.width=c.width,C.height=Math.ceil(S);const k=C.getContext("2d");k.fillStyle="#ffffff",k.fillRect(0,0,C.width,C.height),k.drawImage(c,0,$,c.width,S,0,0,c.width,S);const L=C.toDataURL("image/jpeg",.95),E=S/y;g.addImage(L,"JPEG",0,0,d,E),$+=h,_++}g.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(s)}}function la(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function xr(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function $r(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function _r(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function ep(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function tp(e,t,n,s,r){const i=new Map,c=new Map;for(const h of e){if(h.date>=t&&h.date<=n){const g=i.get(h.productCode);g?(g.amt+=h.amount,g.qty+=h.qty):i.set(h.productCode,{name:h.productName,vol:h.volumeMl,amt:h.amount,qty:h.qty})}h.date>=s&&h.date<=r&&c.set(h.productCode,(c.get(h.productCode)??0)+h.amount)}const d=[...i.entries()].map(([h,g])=>({code:h,...g})).sort((h,g)=>g.amt-h.amt),u=d.reduce((h,g)=>h+g.amt,0);let y=0;return d.map(h=>{y+=h.amt;const g=u>0?Math.round(h.amt*1e4/u)/100:0,$=y<=u*.7?"A":y<=u*.9?"B":"C",_=c.get(h.code)??0,S=_>0?Math.round((h.amt-_)/_*1e3)/10:null;return{code:h.code,name:h.name,volumeMl:h.vol,amount:h.amt,qty:h.qty,sharePct:g,rank:$,prevAmount:_,growthRate:S}})}function ap(e,t,n){const s=new Date,r=s.toISOString().slice(0,10);let i=r,c=r,d="";switch(e){case"week":{const h=new Date(s);h.setDate(h.getDate()-7),i=h.toISOString().slice(0,10),c=r,d="直近7日間";break}case"month":{i=r.slice(0,7)+"-01",c=r,d="当月";break}case"90days":{const h=new Date(s);h.setDate(h.getDate()-90),i=h.toISOString().slice(0,10),c=r,d="直近90日間";break}case"year":{const h=new Date(s);h.setFullYear(h.getFullYear()-1),i=h.toISOString().slice(0,10),c=r,d="直近1年間";break}case"custom":{i=t||r,c=n||r,d=`${i} 〜 ${c}`;break}}const u=new Date(i);u.setFullYear(u.getFullYear()-1);const y=new Date(c);return y.setFullYear(y.getFullYear()-1),{start:i,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:d}}function np(e,t="all",n=[],s="year",r,i,c=[]){const d=ap(s,r,i),u=n.length>0?tp(n,d.start,d.end,d.prevStart,d.prevEnd):e.map(E=>({code:E.code,name:E.name,volumeMl:E.volumeMl,amount:E.yearAmount,qty:E.yearQty,sharePct:E.sharePct,rank:E.rank,prevAmount:E.prevAmount,growthRate:E.growthRate})),y=u.filter(E=>E.rank==="A").length,h=u.filter(E=>E.rank==="B").length,g=u.filter(E=>E.rank==="C").length,$=u.filter(E=>E.growthRate!=null&&E.growthRate>10),_=u.filter(E=>E.growthRate!=null&&E.growthRate<-10);let S=u,C="全商品";switch(t){case"A":S=u.filter(E=>E.rank==="A"),C="Aランク";break;case"B":S=u.filter(E=>E.rank==="B"),C="Bランク";break;case"C":S=u.filter(E=>E.rank==="C"),C="Cランク";break;case"growing":S=$,C="成長商品(+10%以上)";break;case"declining":S=_,C="衰退商品(-10%以下)";break}const k=(E,o,l)=>`<button class="button ${t===E?"primary":"secondary"} small" data-product-filter="${E}">${o} (${l})</button>`,L=(E,o)=>`<button class="button ${s===E?"primary":"secondary"} small" data-product-period="${E}">${o}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${L("week","週次")}
        ${L("month","月次")}
        ${L("90days","90日")}
        ${L("year","年間")}
        ${L("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${r||""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${i||""}" />
        <button class="button secondary small" type="button" data-action="pp-apply-range">適用</button>
        <span style="color:var(--text-secondary);font-size:13px;margin-left:8px;">${d.label}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${y} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">Bランク（70-90%）</p>
        <p class="kpi-value">${h} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${$.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${_.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${C} (${S.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${k("all","全て",u.length)}
        ${k("A","A",y)}
        ${k("B","B",h)}
        ${k("C","C",g)}
        ${k("growing","成長",$.length)}
        ${k("declining","衰退",_.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${oe("rank","ABC",c)}
              ${oe("name","商品名",c)}
              ${oe("amount","売上",c,"numeric")}
              ${oe("sharePct","構成比",c,"numeric")}
              ${oe("qty","本数",c,"numeric")}
              ${oe("growthRate","前年同期比",c,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${Lt(S,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(E=>`
              <tr>
                <td>${$r(E.rank)}</td>
                <td>${E.name?E.name.slice(0,25):E.code}${E.volumeMl?` <small>${E.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${xr(E.amount)}</td>
                <td class="numeric">${E.sharePct}%</td>
                <td class="numeric">${E.qty.toLocaleString()}</td>
                <td class="numeric">${_r(E.growthRate)}</td>
              </tr>
            `).join("")}
            ${S.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function sp(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,s="billing",r="jan"){const i=e.filter(_=>_.currentRank==="A").length,c=e.filter(_=>_.prevRank&&_.currentRank<_.prevRank).length,d=e.filter(_=>_.prevRank&&_.currentRank>_.prevRank).length,u=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,y=2011,h=[];for(let _=u;_>=y&&h.length<6;_--)h.push(_);const g=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${h.map(_=>`
        <button class="button ${_===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${_}"
          style="min-width:80px;">
          ${_}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:u-y+1},(_,S)=>u-S).filter(_=>!h.includes(_)).map(_=>`<option value="${_}" ${_===n?"selected":""}>${_}年度</option>`).join("")}
      </select>
    </div>
    <div style="display:flex;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度区分：</span>
      <button class="button ${r==="jan"?"primary":"secondary"} small"
        data-action="efficiency-fiscal-type" data-fiscal-type="jan">暦年（1〜12月）</button>
      <button class="button ${r==="oct"?"primary":"secondary"} small"
        data-action="efficiency-fiscal-type" data-fiscal-type="oct">酒造年度（10〜9月）</button>
    </div>
    <div style="display:flex;gap:6px;align-items:center;margin-bottom:16px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">表示単位：</span>
      <button class="button ${s==="billing"?"primary":"secondary"} small"
        data-action="efficiency-groupby-change" data-groupby="billing">
        得意先単位
      </button>
      <button class="button ${s==="delivery"?"primary":"secondary"} small"
        data-action="efficiency-groupby-change" data-groupby="delivery">
        店舗（納品先）単位
      </button>
    </div>
  `;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>営業効率分析</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${i} ${s==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${c} ${s==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${d} ${s==="billing"?"社":"店舗"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>${s==="billing"?"得意先":"店舗（納品先）"}ABC分析（${n}${r==="jan"?"年・1〜12月":r==="oct"?"酒造年度・10〜翌9月":"年度・4〜翌3月"}）</h2></div>
      ${g}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${oe("currentRank","ABC",t)}
              ${oe("name","得意先名",t)}
              ${oe("yearAmount","年間売上",t,"numeric")}
              ${oe("sharePct","構成比",t,"numeric")}
              ${oe("orderDays","受注日数",t,"numeric")}
              ${oe("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${Lt(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(_=>`
              <tr>
                <td>${$r(_.currentRank)}</td>
                <td>${_.name||_.code}</td>
                <td class="numeric">${xr(_.yearAmount)}</td>
                <td class="numeric">${_.sharePct}%</td>
                <td class="numeric">${_.orderDays}日</td>
                <td class="numeric">${_r(_.growthRate)}</td>
                <td>${ep(_.currentRank,_.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function op(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Pa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function rp(e,t,n=null,s=null){const r=e.length?e.map(i=>`
            <tr class="clickable-row${i.documentNo===n?" selected-row":""}"
                data-doc-no="${i.documentNo}">
              <td class="mono">${i.documentNo}</td>
              <td>${op(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${i.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Pa(i.amount)}</td>
            </tr>
            ${i.documentNo===n?ip(s):""}
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
          <input id="invoice-document-no" type="text" value="${t.documentNo}" placeholder="181448" />
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
          <span>得意先（コードまたは名前）</span>
          <input id="invoice-customer-code" type="text" value="${t.customerCode}" placeholder="コード or 得意先名" />
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
          <p class="panel-caption">${e.length.toLocaleString("ja-JP")} 件　※行をタップで明細表示</p>
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
          <tbody>${r}</tbody>
        </table>
      </div>
      ${e.length===0?'<p class="empty-note">条件に一致する伝票はありません。</p>':""}
    </section>

    <style>
      .clickable-row { cursor: pointer; }
      .clickable-row:hover { background: var(--bg-hover, #f0f4ff); }
      .selected-row { background: var(--bg-selected, #e8f0fe) !important; }
      .line-detail-row td { padding: 0 !important; border-top: none !important; }
      .line-detail-panel {
        background: var(--bg-detail, #f8f9fa);
        padding: 12px 16px;
        border-left: 3px solid var(--accent, #4a6cf7);
      }
      .line-detail-panel table { margin: 0; font-size: 0.9em; }
      .line-detail-panel th { font-weight: 600; font-size: 0.85em; color: #666; }
      .line-detail-panel td.product-name { max-width: 240px; }
    </style>
  `}function ip(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(s=>`
      <tr>
        <td class="mono" style="width:40px">${s.lineNo}</td>
        <td class="mono" style="width:70px">${s.productCode}</td>
        <td class="product-name">${s.productName}</td>
        <td class="numeric" style="width:50px">${s.quantity}</td>
        <td class="numeric" style="width:80px">${Pa(s.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Pa(s.amount)}</td>
      </tr>`).join(""),n=e.reduce((s,r)=>s+r.amount,0);return`<tr class="line-detail-row"><td colspan="5">
    <div class="line-detail-panel">
      <table>
        <thead>
          <tr>
            <th>行</th><th>商品CD</th><th>商品名</th>
            <th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>
          ${t}
          <tr style="font-weight:600;border-top:2px solid #ccc">
            <td colspan="5" style="text-align:right">合計</td>
            <td class="numeric">${Pa(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function lp(e){return new Date(e.getFullYear(),e.getMonth(),1)}function cp(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Sr(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function kr(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Ps(e){const t=Sr(kr(e),6);return t.setHours(23,59,59,999),t}function Es(e){return new Date(`${e}T00:00:00`)}function As(e){return`${e.getMonth()+1}/${e.getDate()}`}function dp(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function pp(){const e=new Date,t=kr(cp(lp(e),-3)),n=Ps(new Date(e.getFullYear(),e.getMonth()+4,0)),s=[];let r=new Date(t);for(;r<=n;){const i=Ps(r);s.push({start:new Date(r),end:i,label:`${As(r)} - ${As(i)}`}),r=Sr(r,7)}return s}function up(e){const t=pp(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,s=t.map(i=>`
        <div class="gantt-week">
          <span>${i.label}</span>
        </div>
      `).join(""),r=e.length?e.map(i=>{const c=Es(i.startDate),d=Es(i.expectedDoneDate),u=Math.max(0,t.findIndex(g=>g.end>=c)),y=Math.max(u,t.reduce((g,$,_)=>$.start<=d?_:g,u)),h=[`仕込番号: ${i.jikomiNo}`,`銘柄: ${i.productName}`,`期間: ${i.startDate} - ${i.expectedDoneDate}`,`タンク: ${i.tankNo}`,`備考: ${i.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${i.jikomiNo}</strong>
                <span class="table-sub">${i.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${i.status}"
                  style="grid-column:${u+1} / ${y+2}"
                  title="${dp(h)}"
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
        ${r}
      </div>
    </section>
  `}function Ls(e,t){const n={planned:"neutral",active:"warning",done:"success"},s=e.map(d=>`
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
          <span class="status-pill ${n[d.status]}">${No[d.status]}</span>
        </td>
        <td>${d.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(d=>d.status==="active").length,i=e.filter(d=>d.status==="done").length,c=e.filter(d=>d.status==="planned").length;return`
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
  `}function mp(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=e.map(u=>`
      <tr>
        <td class="mono">${u.kenteiNo}</td>
        <td class="mono">${u.jikomiNo}</td>
        <td>${u.productName}</td>
        <td>${u.kenteiDate}</td>
        <td class="numeric">${u.alcoholDegree>0?u.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${u.extractDegree>0?u.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${u.sakaMeterValue!==0?u.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${u.volume>0?u.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${u.taxCategory}</td>
        <td>
          <span class="status-pill ${n[u.status]}">${t[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${u.id}">
            ${u.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),r=e.filter(u=>u.status==="approved").length,i=e.filter(u=>u.status==="submitted").length,c=e.filter(u=>u.status==="pending").length;return`
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
        <p class="kpi-value">${e.filter(u=>u.status==="approved").reduce((u,y)=>u+y.volume,0).toLocaleString("ja-JP")} L</p>
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
          <tbody>${s||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function yp(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function hp(e,t){return`
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
        ${e?`<p class="field-error">${yp(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function fp(e){return`
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
            <div class="form-row"><label>取引区分</label>
              <select id="ec-trade-type">
                <option value="" ${e.tradeType?"":"selected"}>―未設定―</option>
                <option value="B2B"   ${e.tradeType==="B2B"?"selected":""}>B2B（卸取引）</option>
                <option value="B2B2C" ${e.tradeType==="B2B2C"?"selected":""}>B2B2C（生産者向け）</option>
                <option value="B2C"   ${e.tradeType==="B2C"?"selected":""}>B2C（小売・直販）</option>
              </select>
            </div>
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
  `}function gp(e){return`
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
  `}const es={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},Jt=50;function vp(e,t){let n=e;if(t.query){const d=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(d)||u.name.toLowerCase().includes(d)||u.kanaName&&u.kanaName.toLowerCase().includes(d)||u.address1&&u.address1.toLowerCase().includes(d)||u.phone&&u.phone.toLowerCase().includes(d))}t.businessType&&(n=n.filter(d=>d.businessType===t.businessType)),t.tradeType&&(n=n.filter(d=>d.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(d=>d.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(d=>d.isActive):t.activeOnly==="inactive"&&(n=n.filter(d=>!d.isActive));const s=Math.max(1,Math.ceil(n.length/Jt)),i=(Math.min(t.page,s)-1)*Jt,c=n.slice(i,i+Jt);return{filtered:n,paged:c,totalPages:s}}function Cs(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const s=(t-1)*Jt+1,r=Math.min(t*Jt,e),i=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?i.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&i.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${s}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${i.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function bp(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),s=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
      <div class="form-group" style="min-width:120px;">
        <label class="form-label">取引区分</label>
        <select id="master-trade-type" class="form-input">
          <option value="">すべて</option>
          ${Object.entries(xp).map(([r,i])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${i}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${s.map(r=>`<option value="${r}" ${t.areaCode===r?"selected":""}>${r}</option>`).join("")}
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
  `}function _n(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function wp(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const xp={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function $p(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function _p(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${$p(t.tradeType)}</td>
          <td>${wp(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${_n(t.address1||"",16)}</td>
          <td>${_n(t.address2||"",12)}</td>
          <td>${t.staffCode||""}</td>
          <td>${t.areaCode||""}</td>
          <td class="numeric">${t.closingDay?t.closingDay+"日":""}</td>
          <td class="numeric">${t.paymentDay?t.paymentDay+"日":""}</td>
          <td>${t.billingCycleType||""}</td>
          <td>${t.billingCode||""}</td>
          <td>${t.customerGroup1||""}</td>
          <td>${t.customerGroup2||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td style="white-space:nowrap;">
            <button class="button secondary small" data-edit-customer="${t.id}">編集</button>
            <button class="button secondary small" data-view-customer-quotes="${t.code}" data-customer-name="${t.name}" style="margin-left:4px;">見積</button>
          </td>
        </tr>
      `).join("")}function ca(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Sp(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${_n(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${ca(t.purchasePrice)}</td>
          <td class="numeric">${ca(t.salePrice)}</td>
          <td class="numeric">${ca(t.listPrice)}</td>
          <td class="numeric">${ca(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function kp(e,t,n=es,s=[]){const{filtered:r,paged:i,totalPages:c}=vp(e.customers,n);return`
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
        ${bp(e.customers,n)}
        ${Cs(r.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${oe("code","コード",s)}
                ${oe("name","得意先名",s)}
                ${oe("kanaName","カナ",s)}
                <th>略称</th>
                ${oe("businessType","業態",s)}
                <th>販売区分</th>
                <th>取引区分</th>
                <th>価格区分</th>
                <th>単価G</th>
                <th>電話</th>
                <th>FAX</th>
                <th>〒</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>担当</th>
                ${oe("areaName","地区",s)}
                ${oe("closingDay","締日",s,"numeric")}
                ${oe("paymentDay","支払日",s,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${_p(Lt(i,s,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Cs(r.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${oe("code","コード",s)}
                ${oe("name","商品名",s)}
                <th>カナ</th>
                ${oe("category","分類",s)}
                <th>酒税区分</th>
                ${oe("alcoholDegree","度数",s,"numeric")}
                ${oe("volumeMl","容量ml",s,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${oe("purchasePrice","生産者価格",s,"numeric")}
                ${oe("salePrice","卸価格",s,"numeric")}
                ${oe("listPrice","定価(小売)",s,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Sp(Lt(e.products,s,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function Xa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Pp(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${Xo.map(s=>`<option ${n?.materialType===s?"selected":""}>${s}</option>`).join("")}
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
  `}function Ep(e){const t=e.map(r=>{const c=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${Xa(r.unitCost)}</td>
          <td class="numeric">${Xa(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,s=e.reduce((r,i)=>r+i.currentStock*i.unitCost,0);return`
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
        <p class="kpi-value">${Xa(s)}</p>
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
  `}function Ap(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function Za(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Lp={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Cp(e){return`
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
          <td class="numeric">${Za(n.billedAmount)}</td>
          <td class="numeric">${Za(n.paymentAmount)}</td>
          <td class="numeric">${Za(n.balanceAmount)}</td>
          <td>${Ap(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Lp[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function Qe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ds(e){return e.trim().toLowerCase()}function Dp(e,t,n=[]){const s=Ds(t),r=e.filter(d=>s?[d.code,d.name,d.kanaName,d.janCode,d.category].map(Ds).some(u=>u.includes(s)):!0),i=!s&&n.length>0?`<div style="padding:8px 12px;border-bottom:2px solid var(--border,#e5e7eb);">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#6b7280);margin-bottom:6px;">よく使う商品</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${n.map(d=>`<button class="freq-chip" type="button" data-action="picker-select" data-code="${Qe(d.code)}" data-name="${Qe(d.name)}">${Qe(d.name)} <small style="opacity:0.6">${d.count}回</small></button>`).join("")}
        </div>
      </div>`:"",c=r.length?`
        ${i}
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
              ${r.map(d=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Qe(d.code)}"
                      data-name="${Qe(d.name)}"
                    >
                      <td class="mono">${Qe(d.code)}</td>
                      <td>${Qe(d.name)}</td>
                      <td class="mono">${Qe(d.janCode)}</td>
                      <td>${Qe(d.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:i;return mr({title:"商品検索",searchQuery:t,placeholder:"コード・名前・カナ・カテゴリで検索",resultsHtml:c,emptyMessage:"該当する商品が見つかりません。"})}function ct(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function qp(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},i={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(g=>`
      <tr>
        <td class="mono">${g.documentNo}</td>
        <td>${g.purchaseDate}</td>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td>${g.itemName}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${ct(g.unitPrice)}</td>
        <td class="numeric"><strong>${ct(g.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[g.status]}">${n[g.status]}</span>
        </td>
      </tr>
    `).join(""),d=t.map(g=>`
      <tr>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td class="numeric">${ct(g.totalPurchase)}</td>
        <td class="numeric">${ct(g.paidAmount)}</td>
        <td class="numeric"><strong>${ct(g.balance)}</strong></td>
        <td>${g.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${i[g.status]}">${r[g.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${g.supplierCode}" ${g.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((g,$)=>g+$.amount,0),y=t.reduce((g,$)=>g+$.balance,0),h=t.filter(g=>g.status!=="paid").length;return`
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
        <p class="kpi-value">${ct(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${ct(y)}</p>
        <p class="kpi-sub">未払い ${h} 社</p>
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
          <tbody>${d||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Rt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Tp(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},r=e.map(h=>`
      <tr>
        <td class="mono">${h.billNo}</td>
        <td>${h.supplierName}</td>
        <td class="numeric">${Rt(h.amount)}</td>
        <td>${h.issueDate}</td>
        <td>${h.dueDate}</td>
        <td>
          <span class="status-pill ${s[h.status]}">${n[h.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${h.id}" ${h.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),i=t.map(h=>{const g=h.minimumStock>0&&h.currentStock<h.minimumStock*1.2;return`
        <tr>
          <td class="mono">${h.code}</td>
          <td>${h.name}</td>
          <td class="numeric ${g?"text-danger":""}">
            ${h.currentStock.toLocaleString("ja-JP")} ${h.unit}
            ${g?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${h.minimumStock.toLocaleString("ja-JP")} ${h.unit}</td>
          <td class="numeric">${Rt(h.unitCost)}</td>
          <td class="numeric">${Rt(h.currentStock*h.unitCost)}</td>
          <td>${h.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(h=>h.status==="holding"),d=c.reduce((h,g)=>h+g.amount,0),u=t.reduce((h,g)=>h+g.currentStock*g.unitCost,0),y=t.filter(h=>h.minimumStock>0&&h.currentStock<h.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${Rt(d)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${Rt(u)}</p>
        <p class="kpi-sub">要補充 ${y} 品目</p>
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
          <tbody>${i||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Sn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Ce(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function kn(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${Ce(e)}</pre>
    </div>
  `}function Ip(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function da(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${Ce(e)}</code>
      ${Ip(e)}
    </div>
  `}function _t(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${Ce(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${Ce(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${Ce(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?kn(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${Ce(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${Ce(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function pa(e){return`
    <div class="setup-step setup-step-compact" data-step="${Ce(e.stepLabel)}">
      <h3>${Ce(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${Ce(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function ua(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function qs(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function Mp(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?Sn(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${ua(e.lastOverallSync)}">${qs(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${ua(e.lastOverallSync)==="success"?"1時間以内":ua(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${Ce(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?Sn(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${ua(t.lastSyncAt)}">${qs(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Np(e){if(!e.length)return"";const t=r=>r==="ok"?"&#x2705;":r==="warn"?"&#x26A0;&#xFE0F;":"&#x274C;",n=r=>r==="ok"?"success":r==="warn"?"warning":"error",s=e.every(r=>r.status==="ok");return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>システム稼働状況</h2>
          <p class="panel-caption">${s?"全機能正常稼働中":"一部要確認"}</p>
        </div>
        <span class="status-pill ${s?"success":"warning"}" style="font-size:1.1em">
          ${s?"ALL OK":"要確認"}
        </span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>機能</th>
              <th>テーブル</th>
              <th class="numeric">レコード数</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${e.map(r=>`
              <tr>
                <td>${t(r.status)} ${r.name}</td>
                <td class="mono" style="font-size:0.85em">${r.table}</td>
                <td class="numeric">${r.count.toLocaleString("ja-JP")}</td>
                <td><span class="status-pill ${n(r.status)}">${r.detail}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div style="margin-top:16px;padding:12px;background:var(--bg-detail,#f8f9fa);border-radius:8px;font-size:0.9em">
        <strong>実装済み機能:</strong>
        <ul style="margin:8px 0 0 20px;line-height:1.8">
          <li><strong>バイナリデコーダ</strong> — SHTOR.DAT/SHDEN.DATからページ構造解析で売上データ抽出 (精度99.9%)</li>
          <li><strong>SHDEN 3構造対応</strong> — Structure C(header=23)>A(209)>B(460) 優先で計上日取得</li>
          <li><strong>多数決方式</strong> — 同一伝票の修正前/後データが残る場合、多数決で正しい金額を採用</li>
          <li><strong>日次自動同期</strong> — タスクスケジューラ(SakeRelay)で5分毎に差分検出→集計更新</li>
          <li><strong>API効率化</strong> — 差分フラグ(.needs_refresh)で変更時のみ集計実行</li>
          <li><strong>伝票明細表示</strong> — 伝票照会ページで行タップ→商品明細をインライン展開</li>
          <li><strong>ダッシュボード</strong> — daily_sales_factから直接集計 (MVリフレッシュ不要)</li>
        </ul>

        <strong style="display:block;margin-top:12px">データパイプライン:</strong>
        <div style="margin-top:8px;font-family:monospace;font-size:0.85em;line-height:1.6;padding:8px;background:#fff;border-radius:4px">
          Z:\\sh\\dat\\SHTOR.DAT → decoder_sales_diff.py → sales_document_lines<br>
          Z:\\sh\\dat\\SHDEN.DAT → (日付マップ構築) → 計上日をnoteに付与<br>
          sales_document_lines → refresh_facts.py → daily_sales_fact / product_monthly_sales<br>
          daily_sales_fact → web ダッシュボード (KPI・日別チャート・分析)<br>
          sales_document_lines → 伝票照会 (行タップ→商品明細)
        </div>
      </div>
    </section>
  `}function Rp(e,t,n,s,r){const i={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${r?Np(r):""}

    ${s?Mp(s):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Sn(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${i[e.status]}</span>
        </p>
        <p class="kpi-sub">${Ce(e.message)}</p>
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
      ${pa({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${da("git --version")}
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
      ${pa({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${da("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${pa({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${da("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${da("python get-pip.py")}
        `})}
      ${pa({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${_t({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${_t({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${_t({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${_t({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${_t({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${_t({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${kn(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${kn(`{
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
            <span class="config-value">${Ce(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${Ce(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${Ce(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${Ce(n)}"
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
  `}function Vt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Pr(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function Op(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(g=>g.amount),1),s=28,r=6,i=140,c=100,d=760,u=d-i-c,y=t.length*(s+r)+16,h=t.map((g,$)=>{const _=g.amount/n*u,S=$*(s+r)+8,C=g.abcRank==="A"?"#2F855A":g.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${i-8}" y="${S+s/2+5}" class="chart-axis" text-anchor="end">${g.name.length>10?g.name.slice(0,10)+"…":g.name}</text>
          <rect x="${i}" y="${S}" width="${_}" height="${s}" rx="4" fill="${C}" opacity="0.85" />
          <text x="${i+_+8}" y="${S+s/2+5}" class="chart-axis">${(g.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${d} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${h}
    </svg>
  `}function Er(e,t,n="得意先"){if(e.length===0||t.length===0)return'<p class="empty-row">データなし</p>';const s=t.map(u=>`<th class="numeric">${u}</th>`).join(""),r=t.map((u,y)=>e.reduce((h,g)=>h+(g.values[y]??0),0)),i=r.reduce((u,y)=>u+y,0),c=e.map(u=>{const y=u.values.reduce((g,$)=>g+$,0),h=u.values.map(g=>`<td class="numeric">${g>0?(g/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`<tr>
      <td>${u.label}</td>
      ${h}
      <td class="numeric"><strong>${(y/1e4).toFixed(0)}万</strong></td>
    </tr>`}).join(""),d=r.map(u=>`<td class="numeric"><strong>${u>0?(u/1e4).toFixed(0)+"万":"—"}</strong></td>`).join("");return`
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${n}</th>
            ${s}
            <th class="numeric">合計</th>
          </tr>
        </thead>
        <tbody>${c}</tbody>
        <tfoot>
          <tr style="background:var(--surface-raised,#f5f5f5);font-weight:600;">
            <td>月次合計</td>
            ${d}
            <td class="numeric">${(i/1e4).toFixed(0)}万</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `}function Bp(e){return Pr(e)}function jp(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,20),n=760,s=320,r={top:24,right:56,bottom:60,left:72},i=n-r.left-r.right,c=s-r.top-r.bottom,d=Math.max(...t.map(S=>S.amount),1),u=i/t.length,y=[0,.25,.5,.75,1].map(S=>{const C=r.top+c-c*S;return`<g>
      <line x1="${r.left}" y1="${C}" x2="${n-r.right}" y2="${C}" class="chart-grid" />
      <text x="4" y="${C+4}" class="chart-axis">${Math.round(d*S/1e4)}万</text>
    </g>`}).join(""),h=[0,25,50,70,90,100].map(S=>{const C=r.top+c-c*S/100,k=S===70||S===90;return`<g>
      <text x="${n-4}" y="${C+4}" class="chart-axis" text-anchor="end">${S}%</text>
      ${k?`<line x1="${r.left}" y1="${C}" x2="${n-r.right}" y2="${C}" stroke="${S===70?"#2F855A":"#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />`:""}
    </g>`}).join(""),g=t.map((S,C)=>{const k=S.amount/d*c,L=Math.max(u-10,16),E=r.left+C*u+(u-L)/2,o=r.top+c-k,l=S.abcRank==="A"?"#2F855A":S.abcRank==="B"?"#B7791F":"#718096",p=S.name.length>6?S.name.slice(0,6)+"…":S.name;return`<g>
      <rect x="${E}" y="${o}" width="${L}" height="${k}" rx="4" fill="${l}" opacity="0.8" />
      <text x="${E+L/2}" y="${s-8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${E+L/2} ${s-16})">${p}</text>
    </g>`}).join(""),$=t.map((S,C)=>{const k=r.left+C*u+u/2,L=r.top+c-c*S.cumRatio/100;return`${k},${L}`}).join(" "),_=t.map((S,C)=>{const k=r.left+C*u+u/2,L=r.top+c-c*S.cumRatio/100;return`<circle cx="${k}" cy="${L}" r="3.5" fill="#C53D3D" />`}).join("");return`
    <svg viewBox="0 0 ${n} ${s}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${y}${h}${g}
      <polyline points="${$}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${_}
    </svg>`}function zp(e){const t=e.ranking.filter(d=>d.abcRank==="A").length,n=e.ranking.filter(d=>d.abcRank==="B").length,s=e.ranking.filter(d=>d.abcRank==="C").length,r=e.ranking.filter(d=>d.abcRank==="A").reduce((d,u)=>d+u.amount,0),i=e.ranking.map(d=>`
    <tr>
      <td class="mono">${d.code}</td>
      <td>${d.name}</td>
      <td class="numeric">${Vt(d.amount)}</td>
      <td class="numeric">${d.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${d.ratio.toFixed(1)}%</td>
      <td class="numeric">${d.cumRatio.toFixed(1)}%</td>
      <td><span class="status-pill ${Bp(d.abcRank)}">${d.abcRank}</span></td>
    </tr>`).join(""),c=Er(e.monthlyByProduct,e.months,"商品名");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">商品数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}品 <span class="kpi-sub">${(r/e.totalAmount*100).toFixed(1)}%</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}品</div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${s}品</div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>パレート図</h2><p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p></div></div>
      <div class="chart-scroll">${jp(e.ranking)}</div>
      <div class="pareto-legend">
        <span class="legend-item"><span class="legend-dot" style="background:#2F855A"></span>Aランク（〜70%）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#B7791F"></span>Bランク（70〜90%）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#718096"></span>Cランク（90%〜）</span>
        <span class="legend-item"><span class="legend-dot" style="background:#C53D3D"></span>累積構成比</span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>商品ABC一覧</h2><p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>コード</th><th>商品名</th><th class="numeric">売上額</th><th class="numeric">数量</th><th class="numeric">構成比</th><th class="numeric">累積構成比</th><th>ランク</th></tr></thead>
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>上位商品 月次推移</h2><p class="panel-caption">Aランク商品の月別売上</p></div></div>
      ${c}
    </section>`}function Fp(e){const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,s=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),i=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),d=e.ranking.map(u=>`
    <tr>
      <td class="mono">${u.code}</td>
      <td>${u.name}</td>
      <td class="numeric">${Vt(u.amount)}</td>
      <td class="numeric">${u.ratio.toFixed(1)}%</td>
      <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
      <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
      <td><span class="status-pill ${Pr(u.abcRank)}">${u.abcRank}</span></td>
    </tr>`).join("");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">得意先数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${Vt(r)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${Vt(i)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${s}社 <span class="kpi-sub">${Vt(c)}</span></div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別売上ランキング</h2><p class="panel-caption">売上金額上位15社</p></div></div>
      <div class="chart-scroll">${Op(e.ranking)}</div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先ABC分析</h2><p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>コード</th><th>得意先名</th><th class="numeric">売上額</th><th class="numeric">構成比</th><th class="numeric">累積構成比</th><th class="numeric">伝票数</th><th>ランク</th></tr></thead>
          <tbody>${d}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別月次推移</h2><p class="panel-caption">上位10得意先の月別売上推移</p></div></div>
      ${Er(e.monthlyByCustomer,e.months,"得意先")}
    </section>`}function Vp(e,t,n,s=""){const r=n==="customer"?Fp(e):t?zp(t):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>',i=new Date().getFullYear(),c=Array.from({length:5},($,_)=>String(i-_)),d=s.length===4?s:s.slice(0,4),u=s.length===7?s.slice(5,7):"",y=["01","02","03","04","05","06","07","08","09","10","11","12"],h={"01":"1月","02":"2月","03":"3月","04":"4月","05":"5月","06":"6月","07":"7月","08":"8月","09":"9月",10:"10月",11:"11月",12:"12月"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>ABC分析 <span style="font-size:0.75em;font-weight:400;color:var(--text-secondary);">${s?s.length===7?`${s.slice(0,4)}年${h[s.slice(5)]??s.slice(5)}`:`${s}年`:"全期間"}</span></h1>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="analysis-period-year" class="input-sm">
          <option value="">全期間</option>
          ${c.map($=>`<option value="${$}" ${d===$?"selected":""}>${$}年</option>`).join("")}
        </select>
        <select id="analysis-period-month" class="input-sm" ${d?"":"disabled"}>
          <option value="">全月</option>
          ${y.map($=>`<option value="${$}" ${u===$?"selected":""}>${h[$]}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="tab-bar" style="margin-bottom:16px;">
      <button class="tab-btn ${n==="customer"?"active":""}" type="button" data-analysis-tab="customer">👥 得意先ABC分析</button>
      <button class="tab-btn ${n==="product"?"active":""}" type="button" data-analysis-tab="product">📦 商品ABC分析</button>
    </div>

    ${r}
  `}const Yp={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},Ts={amount:"売上額",quantity:"出荷本数",volume:"移出量"},Pn=10;function ts(e){const[t,n]=e.split("-").map(Number);return n>=Pn?t:t-1}function Up(e){const t=Pn-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(Pn).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function Jp(e,t,n){const s=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,r=new Map;for(const c of e){const d=n==="fiscal"?`${ts(c.month)}年度`:c.month.slice(0,4);r.set(d,(r.get(d)??0)+s(c))}return{curr:[...r.entries()].sort((c,d)=>c[0].localeCompare(d[0])).map(([c,d])=>({month:c,amount:d}))}}function Hp(e){const t=new Set;for(const n of e)t.add(ts(n.month));return[...t].sort((n,s)=>s-n).map(String)}function Ct(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Kp(e){return e.replace("-","/")}const Is={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function Qp(e,t="#0F5B8D",n=[],s="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(E=>E.amount>0),i=760,c=280,d={top:16,right:24,bottom:36,left:s==="amount"?64:56},u=i-d.left-d.right,y=c-d.top-d.bottom,h=[...e.map(E=>E.amount),...n.map(E=>E.amount)],g=Math.max(...h,1),$=u/e.length;function _(E){if(s==="quantity")return E>=1e4?`${(E/1e4).toFixed(1)}万本`:`${Math.round(E).toLocaleString()}本`;if(s==="volume"){const o=E/1e3;return o>=1e4?`${(o/1e3).toFixed(0)}kL`:`${Math.round(o).toLocaleString()} L`}return`${Math.round(E/1e4).toLocaleString("ja-JP")}万円`}function S(E){return s==="quantity"?`${E.toLocaleString()}本`:s==="volume"?za(E):Ct(E)}const C=[0,.25,.5,.75,1].map(E=>{const o=d.top+y-y*E,l=_(g*E);return`<g>
        <line x1="${d.left}" y1="${o}" x2="${i-d.right}" y2="${o}" class="chart-grid" />
        <text x="4" y="${o+4}" class="chart-axis">${l}</text>
      </g>`}).join(""),k=e.map((E,o)=>{const l=r?Math.max(($-18)/2,10):Math.max($-18,24),p=r?2:0,m=d.left+o*$+($-(r?l*2+p:l))/2,f=E.amount/g*y,w=d.top+y-f,b=n[o]?.amount??0,x=b/g*y,P=d.top+y-x,D=r?`<rect x="${m}" y="${P}" width="${l}" height="${x}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${S(b)}</title></rect>`:"",q=r?m+l+p:m;return`<g>
      ${D}
      <rect x="${q}" y="${w}" width="${l}" height="${f}" rx="4" fill="${t}" opacity="${.6+o/e.length*.35}"><title>${S(E.amount)}</title></rect>
      <text x="${d.left+o*$+$/2}" y="${c-8}" class="chart-axis centered-axis">${Kp(E.month)}</text>
    </g>`}).join(""),L=r?`
    <g transform="translate(${i-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${C}${k}${L}
    </svg>
  `}function za(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Wp(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(s=>`
    <tr>
      <td class="mono">${s.code}</td>
      <td>${s.name}</td>
      <td class="numeric">${Ct(s.amount)}</td>
      <td class="numeric">${s.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${za(s.volumeMl)}</td>
      <td class="numeric">${s.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${s.code}" data-drilldown-name="${s.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function Gp(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${Ct(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${za(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function Ms(e,t,n){const s=t?e.filter(i=>i.tag.includes(t)||i.name.includes(t)):e,r=s.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':s.map(i=>`
        <tr>
          <td class="mono">${i.code||"―"}</td>
          <td>${i.name||"未設定"}</td>
          <td class="mono">${i.tag||"―"}</td>
          <td class="numeric">${Ct(i.amount)}</td>
          <td class="numeric">${i.documents.toLocaleString("ja-JP")}</td>
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
  `}function Ar(e,t,n="all",s="",r=[],i=[],c="",d="",u=null,y="all",h="",g=[],$=[],_=[],S=null,C=[],k=[],L="amount",E="calendar"){const o=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",l=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,m=n!=="all"&&r.length>0&&t!=="staff"?r:l,f=Lt(m,_,Yp),w={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},b=Ts[L],x=Q=>L==="quantity"?Q.quantity:L==="volume"?Q.volumeMl:Q.amount,P=Q=>L==="quantity"?`${Q.toLocaleString()}本`:L==="volume"?za(Q):Ct(Q);let D,q=[],R,B,M;if(S&&S.monthlySales.length>0)D=S.monthlySales.slice(-24).map(Q=>({month:Q.month,amount:x(Q)})),R=`${S.name} の月別${b}`,B=`${S.tab==="customers"?"得意先":"商品"}: ${S.code}`,M="#0968e5";else if(C.length>0&&n!=="all"){D=C.map(K=>({month:K.month,amount:x(K)})),q=k.map(K=>({month:K.month,amount:x(K)}));const Q=D.reduce((K,J)=>K+J.amount,0),Z=q.reduce((K,J)=>K+J.amount,0),ee=Z>0?(Q-Z)/Z*100:0,ne=ee>0?"+":"";R=`${w[n]} ${b}（${s}）`,B=`${P(Q)}${Z>0?` / 前年比 ${ne}${ee.toFixed(1)}%`:""}`,M="#2f855a"}else{D=Jp(e.monthlySales,L,E).curr,q=[];const Z=D.reduce((ne,K)=>ne+K.amount,0);R=`${E==="fiscal"?"決算年度別":"暦年別"}${b}`,B=`累計 ${P(Z)}（${D.length}${E==="fiscal"?"期":"年"}）`,M="#0F5B8D"}const O=["amount","quantity","volume"].map(Q=>`<button class="tab-button ${Q===L?"active":""}" data-chart-metric="${Q}">${Ts[Q]}</button>`).join(""),I=["all","yearly","monthly","weekly","daily"].map(Q=>`<button class="button ${Q===n?"primary":"secondary"} small" type="button" data-analytics-period="${Q}">${Is[Q]}</button>`).join(""),j=E==="fiscal"&&n==="yearly"?Hp(e.monthlySales):i,V=E==="fiscal"&&n==="yearly"&&!j.includes(s)?j[0]??"":s,U=n!=="all"&&j.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${j.map(Q=>`<option value="${Q}" ${Q===V?"selected":""}>${E==="fiscal"&&n==="yearly"?Q+"年度":Q}</option>`).join("")}
      </select>`:"";let W="",H="";if(t==="staff"){const Q=["all","yearly","monthly","weekly","daily"].map(J=>`<button class="button ${J===y?"primary":"secondary"} small" type="button" data-staff-period="${J}">${Is[J]}</button>`).join(""),Z=y!=="all"&&g.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${g.map(J=>`<option value="${J}" ${J===h?"selected":""}>${J}</option>`).join("")}
        </select>`:"",ne=($.length>0?$:e.staffTotals).filter(J=>!c||J.name.includes(c)||J.code.includes(c)),K=y!=="all"&&h?` (${h})`:"";if(W=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${Q}</div>
        ${Z}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${c}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${K?`<span style="font-size:12px;color:var(--text-secondary);">${K}</span>`:""}
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
            ${ne.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':ne.map(J=>`
                <tr>
                  <td class="mono">${J.code||"―"}</td>
                  <td>${J.name||"未設定"}</td>
                  <td class="numeric">${Ct(J.amount)}</td>
                  <td class="numeric">${J.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${J.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${J.code}" data-staff-name="${J.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const J=u.breakdownTab,X=y!=="all"&&h?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${h}</span>`:"";H=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${X}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${J==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${J==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${J==="customers"?Ms(u.customerRows,d,"得意先名"):Ms(u.productRows,d,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${E==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${E==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${R}</h2>
            <p class="panel-caption">${B}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${O}</div>
            ${S?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${Qp(D,M,q,L)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${o}</h2>
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
            <div class="button-group">${I}</div>
            ${U}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${oe("code","コード",_,"mono")}
                  ${oe("name","名称",_)}
                  ${oe("amount","売上額",_,"numeric")}
                  ${oe("quantity","本数",_,"numeric")}
                  ${oe("volumeMl","移出量",_,"numeric")}
                  ${oe("documents","伝票数",_,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Wp(f,!0)}</tbody>
            </table>
          </div>
        `:W}
      </article>
    </section>

    ${S?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${S.name} の${S.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${S.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${S.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${Gp(S.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${H}
  `}const Ns=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:Up,monthToFiscalYear:ts,renderSalesAnalytics:Ar},Symbol.toStringTag,{value:"Module"}));function Ot(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Xp(e){const t=Math.max(...e.salesByProduct.flatMap(i=>i.values),1),n=e.salesByProduct.map(i=>{const c=i.values.map((d,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(d/t*120)}px" title="${e.months[u]}: ${Ot(d)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
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
        <td class="numeric">${Ot(i.costPrice)}</td>
        <td class="numeric">${Ot(i.sellPrice)}</td>
        <td class="numeric">${Ot(i.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${i.marginRate>=40?"success":"warning"}">${i.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(i=>{const c=i.values.reduce((d,u)=>d+u,0);return`
        <tr>
          <td>${i.label}</td>
          ${i.values.map(d=>`<td class="numeric">${(d/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${Ot(c)}</strong></td>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}function Zp(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Ea(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Rs(e){return e.toISOString().slice(0,10)}function eu(e,t,n,s=null,r=null){const i=e.length?e.map(c=>`
            <tr class="clickable-row${c.documentNo===s?" selected-row":""}"
                data-doc-no="${c.documentNo}">
              <td class="mono">${c.documentNo}</td>
              <td>${Zp(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${Ea(c.amount)}</td>
            </tr>
            ${c.documentNo===s?tu(r):""}
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
          <input id="sales-start" type="date" value="${t||Rs(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Rs(new Date)}" />
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
          <p class="panel-caption">${e.length.toLocaleString("ja-JP")} 件　※行タップで明細表示</p>
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

    <style>
      .clickable-row { cursor: pointer; }
      .clickable-row:hover { background: var(--bg-hover, #f0f4ff); }
      .selected-row { background: var(--bg-selected, #e8f0fe) !important; }
      .line-detail-row td { padding: 0 !important; border-top: none !important; }
      .line-detail-panel {
        background: var(--bg-detail, #f8f9fa);
        padding: 12px 16px;
        border-left: 3px solid var(--accent, #4a6cf7);
      }
      .line-detail-panel table { margin: 0; font-size: 0.9em; }
      .line-detail-panel th { font-weight: 600; font-size: 0.85em; color: #666; }
    </style>
  `}function tu(e){if(!e)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(s=>`
      <tr>
        <td class="mono" style="width:40px">${s.lineNo}</td>
        <td class="mono" style="width:70px">${s.productCode}</td>
        <td>${s.productName}</td>
        <td class="numeric" style="width:50px">${s.quantity}</td>
        <td class="numeric" style="width:80px">${Ea(s.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Ea(s.amount)}</td>
      </tr>`).join(""),n=e.reduce((s,r)=>s+r.amount,0);return`<tr class="line-detail-row"><td colspan="4">
    <div class="line-detail-panel">
      <table>
        <thead>
          <tr>
            <th>行</th><th>商品CD</th><th>商品名</th>
            <th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>
          ${t}
          <tr style="font-weight:600;border-top:2px solid #ccc">
            <td colspan="5" style="text-align:right">合計</td>
            <td class="numeric">${Ea(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function ma(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function au(e,t,n,s){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},i={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},d=e.map(g=>`
      <tr>
        <td>${g.saleTime}</td>
        <td class="mono">${g.productCode}</td>
        <td>${g.productName}</td>
        <td class="numeric">${g.quantity}</td>
        <td class="numeric">${ma(g.unitPrice)}</td>
        <td class="numeric"><strong>${ma(g.amount)}</strong></td>
        <td>${r[g.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(g=>`
      <tr>
        <td class="mono">${g.orderNo}</td>
        <td>${g.orderDate}</td>
        <td>${g.customerName}</td>
        <td>${g.postalCode} ${g.address}</td>
        <td>${g.items.map($=>`${$.productName} ×${$.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${ma(g.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[g.status]}">${i[g.status]}</span>
        </td>
        <td>${g.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${g.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((g,$)=>g+$.amount,0),h=t.filter(g=>g.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${ma(y)}</p>
        <p class="kpi-sub">${e.length} 件 / ${s}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${h} 件</p>
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
            <tbody>${u||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}const en={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},nu={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function su(e,t,n,s){const r=nu[e],i=Object.keys(en).map(d=>`
      <button class="tab-button ${e===d?"active":""}" data-import-entity="${d}">
        ${en[d]}
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
              ${t.columns.map(d=>`<th>${d}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${t.rows.slice(0,10).map((d,u)=>`
              <tr class="${d._valid?"":"has-error"}">
                <td>${u+1}</td>
                ${t.columns.map(y=>`<td>${String(d[y]??"")}</td>`).join("")}
                <td>${d._valid?'<span class="status-pill success">OK</span>':`<span class="status-pill warning">${d._error??"NG"}</span>`}</td>
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
        <h2>${en[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${r.required.map(d=>`<code class="config-value">${d}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${r.optional.map(d=>`<code class="config-value">${d}</code>`).join(" / ")}</dd>
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
  `}const fe={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function ou(e,t,n){const s=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:fe.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:fe.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:fe.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:fe.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:fe.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:fe.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:fe.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:fe.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:fe.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:fe.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:fe.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:fe.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:fe.date}];e.lines.slice(0,6).forEach((c,d)=>{const u=33+d*8.5;s.push({id:`line${d}_name`,label:`明細${d+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:fe.detail},{id:`line${d}_code`,label:`明細${d+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:fe.detail},{id:`line${d}_qty`,label:`明細${d+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:fe.detail},{id:`line${d}_price`,label:`明細${d+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:fe.detail},{id:`line${d}_amount`,label:`明細${d+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:fe.detail},{id:`line${d}_retail`,label:`明細${d+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:fe.detail})});const r=e.lines.reduce((c,d)=>c+(d.amount||0),0),i=e.lines.reduce((c,d)=>c+d.quantity,0);return s.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(i),color:fe.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:fe.total}),n&&s.forEach(c=>{const d=n[c.id];d&&(c.x=d.x,c.y=d.y)}),s}function ru(e,t,n,s,r){const c=ou(e,t,s).map(u=>`
      <div class="fd-field ${r?"fd-draggable":""}"
           data-fd-id="${u.id}"
           style="left:${u.x}mm; top:${u.y}mm; font-size:${u.fontSize}pt; --fd-color:${u.color};"
           title="${u.label} (${u.x.toFixed(1)}, ${u.y.toFixed(1)})">
        ${r?`<span class="fd-badge">${u.label}</span>`:""}
        <span class="fd-value">${u.value}</span>
      </div>
    `).join(""),d=n.showReferenceOverlay&&n.overlayImageUrl?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
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
        色: <span style="color:${fe.header}">■ヘッダ</span>
        <span style="color:${fe.code}">■コード</span>
        <span style="color:${fe.date}">■日付</span>
        <span style="color:${fe.detail}">■明細</span>
        <span style="color:${fe.total}">■合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas-scaler" id="fd-scaler">
        <div class="fd-canvas" style="${d}">
          ${c}
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
  `}function tn(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const s=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,i=parseFloat(n.style.top)||0;t[s]={x:r,y:i}}),t}function iu(e,t,n){const s=[...new Set(e.map(S=>S.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(S=>S.businessTypeName||S.businessType).filter(Boolean))].sort(),i=e.filter(S=>S.isAtRisk),c=e.filter(S=>!S.isAtRisk&&S.isDormant),d=e.filter(S=>!S.isAtRisk&&!S.isDormant&&S.amount12m>0),u=e.filter(S=>!S.isAtRisk&&!S.isDormant&&S.amount12m===0),y=t.filter(S=>S.lat&&S.lng),h=e.some(S=>S.lat&&S.lng),g=e.length,$=e.filter(S=>S.lat&&S.lng).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業 / Map</p>
        <h1>取引先マップ</h1>
        <p class="meta-note">OpenStreetMap で得意先の位置情報を可視化します。</p>
      </div>
    </section>

    ${h?$<g?`<section class="panel" style="border-left:4px solid #3b82f6;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;font-size:0.85rem;">
              📍 位置情報: <strong>${$}/${g}件</strong> 取得済み
              （未取得 ${g-$}件）
            </div>
            <button class="button secondary small" id="btn-geocode">未取得分をジオコーディング</button>
          </div>
          <div id="geocode-progress" style="display:none;margin-top:12px;">
            <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
              <div class="loading-spinner" style="width:16px;height:16px;"></div>
              <span id="geocode-status">準備中…</span>
            </div>
            <div style="margin-top:6px;background:#e5e7eb;border-radius:4px;height:6px;overflow:hidden;">
              <div id="geocode-bar" style="height:100%;background:var(--primary,#0F5B8D);width:0%;transition:width 0.3s;"></div>
            </div>
          </div>
        </section>`:"":`<section class="panel" style="border-left:4px solid var(--color-warning);margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="flex:1;">
            <strong>📍 位置情報がまだ登録されていません</strong>
            <p style="margin:4px 0 0;font-size:0.85rem;color:var(--text-muted,#6b7280);">
              「ジオコーディング実行」で住所から緯度経度を自動取得します（${g}件）。<br>
              Nominatim API を使用するため、1件/秒の速度で処理されます。
            </p>
          </div>
          <button class="button primary" id="btn-geocode">📍 ジオコーディング実行</button>
        </div>
        <div id="geocode-progress" style="display:none;margin-top:12px;">
          <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;">
            <div class="loading-spinner" style="width:16px;height:16px;"></div>
            <span id="geocode-status">準備中…</span>
          </div>
          <div style="margin-top:6px;background:#e5e7eb;border-radius:4px;height:6px;overflow:hidden;">
            <div id="geocode-bar" style="height:100%;background:var(--primary,#0F5B8D);width:0%;transition:width 0.3s;"></div>
          </div>
        </div>
      </section>`}

    <section class="kpi-grid">
      <div class="kpi-card" style="border-top:3px solid var(--color-danger);">
        <div class="kpi-label">🔴 離反リスク</div>
        <div class="kpi-value">${i.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠</div>
        <div class="kpi-value">${c.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #2196F3;">
        <div class="kpi-label">🔵 取引中</div>
        <div class="kpi-value">${d.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #aaa;">
        <div class="kpi-label">⚪ 売上なし</div>
        <div class="kpi-value">${u.length}<span class="kpi-sub">社</span></div>
      </div>
    </section>

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button ${n.filterStatus==="all"?"primary":"secondary"} small" type="button" data-map-status="all">すべて</button>
      <button class="button ${n.filterStatus==="at-risk"?"primary":"secondary"} small" type="button" data-map-status="at-risk">🔴 離反リスク</button>
      <button class="button ${n.filterStatus==="dormant"?"primary":"secondary"} small" type="button" data-map-status="dormant">🟠 休眠</button>
      <button class="button ${n.filterStatus==="active"?"primary":"secondary"} small" type="button" data-map-status="active">🔵 取引中</button>
      <button class="button ${n.filterStatus==="inactive"?"primary":"secondary"} small" type="button" data-map-status="inactive">⚪ 売上なし</button>
      <select id="map-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${s.map(S=>`<option value="${S}" ${n.filterArea===S?"selected":""}>${S}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${r.map(S=>`<option value="${S}" ${n.filterBiz===S?"selected":""}>${S}</option>`).join("")}
      </select>
    </div>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div id="customer-map" style="height:560px;width:100%;"></div>
    </section>
    <div id="map-data" style="display:none"
      data-customers="${encodeURIComponent(JSON.stringify(e))}"
      data-deliveries="${encodeURIComponent(JSON.stringify(y.map(S=>({name:S.name,address:S.address,lat:S.lat,lng:S.lng,phone:S.phone}))))}"></div>

    <section class="panel">
      <div class="panel-header"><h2>凡例</h2></div>
      <div style="display:flex;gap:24px;flex-wrap:wrap;font-size:0.85rem;">
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#e53e3e;margin-right:4px;"></span>離反リスク（前年同月注文あり・今月未注文）</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#dd6b20;margin-right:4px;"></span>休眠（3ヶ月以上未注文）</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#2196F3;margin-right:4px;"></span>取引中（12ヶ月売上あり）</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#aaa;margin-right:4px;"></span>売上なし</span>
        <span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#FF9800;margin-right:4px;"></span>納品先</span>
      </div>
    </section>

  `}const lu={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},cu=["new","picking","packed","shipped","delivered"];function du(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(i=>t[i.stage].push(i));const n=cu.map(i=>{const c=lu[i],d=t[i];return`
      <div class="wf-col" data-wf-stage="${i}">
        <div class="wf-col-header" style="--wf-color:${c.color};">
          <span class="wf-col-icon">${c.icon}</span>
          <span class="wf-col-label">${c.label}</span>
          <span class="wf-col-count">${d.length}</span>
        </div>
        <div class="wf-col-body">
          ${d.length===0?'<div class="wf-empty">―</div>':d.map(u=>`
            <div class="wf-card ${u.priority==="urgent"?"wf-urgent":""}" data-wf-order="${u.id}" draggable="true">
              <div class="wf-card-header">
                <span class="wf-card-no mono">${u.orderNo}</span>
                ${u.priority==="urgent"?'<span class="wf-card-priority">🔥 急</span>':""}
              </div>
              <div class="wf-card-customer">${u.customerName}</div>
              <div class="wf-card-meta">
                <span>📅 ${u.orderDate}</span>
                ${u.deliveryDate?`<span>🚚 ${u.deliveryDate}</span>`:""}
              </div>
              <div class="wf-card-footer">
                <span>${u.itemCount}品</span>
                <strong>¥${u.totalAmount.toLocaleString("ja-JP")}</strong>
              </div>
              ${u.staffName?`<div class="wf-card-staff">👤 ${u.staffName}</div>`:""}
            </div>
          `).join("")}
        </div>
      </div>
    `}).join(""),s=e.reduce((i,c)=>i+c.totalAmount,0),r=e.filter(i=>i.priority==="urgent").length;return`
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
        <p class="kpi-value">${e.filter(i=>i.stage!=="delivered").length}件</p>
        <p class="kpi-sub">処理待ち</p>
      </article>
      <article class="panel kpi-card ${r>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${r}件</p>
        <p class="kpi-sub">当日出荷</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">¥${s.toLocaleString("ja-JP")}</p>
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
  `}function pu(e,t,n){const s=e.cart.reduce((i,c)=>i+c.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((i,c)=>i+c.quantity,0)}<br/>
          <strong>¥${s.toLocaleString("ja-JP")}</strong>
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

      ${uu(e,t,n)}
    </div>
  `}function uu(e,t,n){if(e.step==="customer"){const s=e.customerQuery.toLowerCase(),r=s?t.filter(i=>i.name.toLowerCase().includes(s)||i.code.toLowerCase().includes(s)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,30).map(i=>`
            <button class="mo-item ${e.selectedCustomer?.id===i.id?"selected":""}" data-mo-select-customer="${i.id}">
              <div class="mo-item-title">${i.name}</div>
              <div class="mo-item-sub mono">${i.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const s=e.productQuery.toLowerCase(),r=s?n.filter(i=>i.name.toLowerCase().includes(s)||i.code.toLowerCase().includes(s)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,50).map(i=>{const c=e.cart.find(d=>d.productCode===i.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${i.name}</div>
                  <div class="mo-item-sub">${i.category} / JAN ${i.janCode||"―"}</div>
                </div>
                ${c?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${i.code}">−</button>
                      <span>${c.quantity}</span>
                      <button data-mo-qty="+1" data-mo-product="${i.code}">+</button>
                    </div>`:`<button class="button primary" data-mo-add-product="${i.code}">＋</button>`}
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
          ${e.cart.map((s,r)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${s.productName}</div>
                <div class="mo-item-sub">${s.quantity} × ¥${s.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${s.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${r}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((s,r)=>s+r.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const Os={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},Bs={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},js={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function mu(e,t){const n=e.find(i=>i.id===t)??e[0],s=e.filter(i=>i.status==="new").length,r=e.filter(i=>i.status==="confirmed").length;return`
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
      <article class="panel kpi-card ${s>0?"kpi-alert":""}">
        <p class="panel-title">未対応</p>
        <p class="kpi-value">${s}件</p>
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
          ${e.map(i=>`
            <button class="tour-item ${n?.id===i.id?"active":""}" data-tour-id="${i.id}">
              <div class="tour-item-head">
                <strong>${i.name}</strong>
                <span class="status-pill ${Bs[i.status]}">${Os[i.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${js[i.language]} · 👥 ${i.partySize}名
              </div>
              <div class="tour-item-sub">📅 希望日: ${i.visitDate}</div>
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
            <span class="status-pill ${Bs[n.status]}">${Os[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${js[n.language]}</dd></div>
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
  `}const yu=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,hu=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function fu(e,t){const n=t?e.find(r=>r.id===t):null,s=t==="__new__";return`
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

    ${n||s?`
      <section class="panel">
        <div class="panel-header">
          <h2>${s?"新規送信元":"編集"}: ${n?.name??""}</h2>
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
  `}function gu(e,t,n,s){const[r,i]=t.split("-").map(p=>parseInt(p,10)),c=new Date(r,i-1,1),d=new Date(r,i,0),u=c.getDay(),y=d.getDate(),h=[];for(let p=0;p<u;p++)h.push({isOutside:!0});for(let p=1;p<=y;p++)h.push({date:new Date(r,i-1,p)});for(;h.length%7!==0;)h.push({isOutside:!0});const g=n?e.filter(p=>p.category===n):e,$={};g.forEach(p=>{const m=p.startsAt.slice(0,10);$[m]??=[],$[m].push(p)});const _=new Date().toISOString().slice(0,10),S=h.map(p=>{if(p.isOutside)return'<div class="cal-cell cal-outside"></div>';const m=p.date,f=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}-${String(m.getDate()).padStart(2,"0")}`,w=$[f]??[],b=f===_,x=m.getDay();return`
        <div class="cal-cell ${b?"cal-today":""} ${x===0?"cal-sun":x===6?"cal-sat":""}"
             data-cal-date="${f}">
          <div class="cal-day-num">${m.getDate()}</div>
          <div class="cal-events">
            ${w.slice(0,3).map(P=>`
              <button class="cal-event" data-cal-event-id="${P.id}"
                      style="background:${P.color||Qn[P.category]||"#0F5B8D"};"
                      title="${P.title}">
                <span class="cal-event-time">${P.isAllDay?"終日":new Date(P.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${P.title}</span>
              </button>
            `).join("")}
            ${w.length>3?`<button class="cal-event-more" data-cal-date="${f}">+${w.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),C=s?.isOpen?vu(s):"",k=new Date(r,i-2,1),L=new Date(r,i,1),E=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`,o=`${L.getFullYear()}-${String(L.getMonth()+1).padStart(2,"0")}`,l=(()=>{const p=new Date;return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${r}年 ${i}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${E}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${l}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${o}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Kn).map(([p,m])=>`<option value="${p}" ${n===p?"selected":""}>${m}</option>`).join("")}
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
        ${S}
      </div>
    </section>

    ${C}
  `}function vu(e){const t=e.event;return`
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
                ${Object.entries(Kn).map(([n,s])=>`<option value="${n}" ${t.category===n?"selected":""}>${s}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?zs(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?zs(t.endsAt):""}" />
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
  `}function zs(e){const t=new Date(e),n=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const Bt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function bu(e,t){const n=t?e.find(s=>s.id===t):null;return`
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
            ${e.map(s=>`
              <tr>
                <td><strong>${s.name}</strong><br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${s.provider}</span></td>
                <td>
                  ${s.isEnabled?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}
                </td>
                <td>${s.lastSyncAt?s.lastSyncAt.slice(0,16).replace("T"," "):"未同期"}</td>
                <td style="font-size:12px;">${s.lastStatus??"―"}</td>
                <td>
                  <button class="button-sm secondary" data-action="int-edit" data-id="${s.id}">設定</button>
                  ${s.provider==="shopify"?`<button class="button-sm primary" data-action="int-sync-shopify" data-id="${s.id}">同期</button>`:""}
                  ${s.provider==="google_calendar"?`<button class="button-sm primary" data-action="int-sync-gcal" data-id="${s.id}">同期</button>`:""}
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
        <p class="form-hint">${Bt[n.provider]?.description??""}</p>
        ${Bt[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${Bt[n.provider].setupUrl}" target="_blank">${Bt[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(Bt[n.provider]?.fields??[]).map(s=>`
            <label class="field" style="flex:1 1 100%;">
              <span>${s.label}</span>
              <input id="int-${s.key}" type="text" value="${n.config[s.key]??""}" placeholder="${s.placeholder}" />
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
  `}function wu(e,t){const n=e.reduce((i,c)=>i+c.totalAmount,0),s=e.filter(i=>i.financialStatus==="paid").length,r=e.filter(i=>i.fulfillmentStatus!=="fulfilled"&&i.fulfillmentStatus!=="shipped").length;return`
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
        <p class="kpi-sub">支払済 ${s}件</p>
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
            ${e.map(i=>`
              <tr>
                <td class="mono">${i.orderNumber}</td>
                <td>${i.orderDate.slice(0,16).replace("T"," ")}</td>
                <td>${i.customerName}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${i.customerEmail}</span></td>
                <td class="numeric">¥${i.totalAmount.toLocaleString("ja-JP")}</td>
                <td>
                  <span class="status-pill ${i.financialStatus==="paid"?"success":"warning"}">${i.financialStatus}</span>
                </td>
                <td>
                  <span class="status-pill ${i.fulfillmentStatus==="fulfilled"||i.fulfillmentStatus==="shipped"?"success":"warning"}">${i.fulfillmentStatus||"未"}</span>
                </td>
                <td style="font-size:12px;">${i.lineItems.map(c=>`${c.name} ×${c.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function xu(e,t,n){return`
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
            ${e.map(s=>`
              <tr>
                <td>${s.receivedAt.slice(0,16).replace("T"," ")}</td>
                <td>${s.senderName??"―"}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${s.senderPhone??""}</span></td>
                <td>
                  <span class="status-pill ${s.ocrStatus==="done"?"success":s.ocrStatus==="failed"?"warning":"neutral"}">${s.ocrStatus}</span>
                </td>
                <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--text-secondary);">${(s.ocrText??"").slice(0,80)}</td>
                <td>${s.linkedInvoiceId?`<span class="mono">${s.linkedInvoiceId}</span>`:"未連携"}</td>
                <td>
                  <button class="button-sm secondary" data-action="fax-view" data-id="${s.id}">詳細</button>
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
  `}function $u(e,t,n){const s=t==="__new__"?null:e.find(c=>c.id===t),r=t==="__new__";return n?.role==="admin"?`
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
        <p class="kpi-sub">有効 ${e.filter(c=>c.isActive).length}名</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">管理者</p>
        <p class="kpi-value">${e.filter(c=>c.role==="admin").length}名</p>
        <p class="kpi-sub">全権アクセス</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">部署数</p>
        <p class="kpi-value">${new Set(e.map(c=>c.department)).size}</p>
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
            ${e.map(c=>`
              <tr ${c.isActive?"":'style="opacity:0.5;"'}>
                <td class="mono">${c.staffCode??"―"}</td>
                <td><strong>${c.displayName}</strong>${c.id===n?.id?'<span style="color:var(--primary);font-size:11px;"> (あなた)</span>':""}</td>
                <td class="mono" style="font-size:12px;">${c.email}</td>
                <td>${Da[c.department]}</td>
                <td>${Ca[c.role]}</td>
                <td style="font-size:12px;">${c.lastSignInAt?c.lastSignInAt.slice(0,16).replace("T"," "):"―"}</td>
                <td>${c.isActive?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}</td>
                <td>
                  <button class="button-sm secondary" data-action="user-edit" data-id="${c.id}">編集</button>
                  ${c.id!==n?.id?`<button class="button-sm secondary" data-action="user-delete" data-id="${c.id}" style="color:var(--danger);">削除</button>`:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    ${s||r?`
      <section class="panel">
        <div class="panel-header">
          <h2>${r?"新規ユーザー":`${s?.displayName} 編集`}</h2>
        </div>
        ${r?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${s?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${s?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${s?"readonly":""} />
          </label>
          ${r?`<label class="field" style="flex:1 1 200px;">
                  <span>初期パスワード *</span>
                  <input id="user-password" type="password" placeholder="8文字以上" />
                </label>`:""}
          <label class="field" style="flex:1 1 120px;">
            <span>担当者コード</span>
            <input id="user-code" type="text" value="${s?.staffCode??""}" placeholder="S001" />
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>部署</span>
            <select id="user-dept">
              ${Object.entries(Da).map(([c,d])=>`<option value="${c}" ${s?.department===c?"selected":""}>${d}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Ca).map(([c,d])=>`<option value="${c}" ${s?.role===c?"selected":""}>${d}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 160px;">
            <span>電話</span>
            <input id="user-phone" type="tel" value="${s?.phone??""}" placeholder="090-1234-5678" />
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="user-active" type="checkbox" ${s?.isActive!==!1?"checked":""} />
            有効
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="user-cancel">キャンセル</button>
          <button class="button primary" data-action="user-save" data-id="${s?.id??""}">保存</button>
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
    `}function _u(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Da[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Ca[e.role]}</dd></div>
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
          ${n.map(s=>`<option value="${s.id}" ${e.defaultMailSenderId===s.id?"selected":""}>${s.name} &lt;${s.email}&gt;</option>`).join("")}
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
              ${t.slice(0,20).map(s=>`
                <tr>
                  <td style="font-size:12px;">${s.createdAt.slice(0,16).replace("T"," ")}</td>
                  <td><strong>${s.action}</strong></td>
                  <td style="font-size:12px;">${s.entityType??""} ${s.entityId??""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`}
    </section>
  `:`
      <section class="page-head"><div><h1>プロフィール</h1></div></section>
      <section class="panel"><p>プロフィール未登録です。ログインしてください。</p></section>
    `}function Su(e){const t={};return e.forEach(n=>{const s=n.userEmail??"(anonymous)";t[s]=(t[s]??0)+1}),`
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
  `}function ku(e){const t=e.prospects.reduce((i,c)=>i+c.expectedAmount,0),n=e.prospects.reduce((i,c)=>i+c.expectedAmount*c.probability/100,0),s=e.prospects.filter(i=>i.stage==="won").length,r=e.prospects.filter(i=>i.stage==="hot"||i.stage==="negotiating").length;return`
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
        <p class="kpi-value">${s}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?Pu(e.prospects):Eu(e.prospects)}

    ${Au(e)}
  `}function Pu(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(s=>{const r=e.filter(c=>c.stage===s),i=r.reduce((c,d)=>c+d.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${s}">
          <div class="pk-col-header" style="--pk-color:${Wn[s]};">
            <span class="pk-col-label">${Ba[s]}</span>
            <span class="pk-col-count">${r.length}</span>
          </div>
          <div class="pk-col-sub">¥${i.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${r.length===0?'<div class="wf-empty">―</div>':r.map(c=>`
              <div class="pk-card" data-prospect-id="${c.id}" draggable="true">
                <div class="pk-card-company">${c.companyName}</div>
                <div class="pk-card-meta">${c.businessType??""} ${c.contactName?"· "+c.contactName:""}</div>
                <div class="pk-card-amount">¥${c.expectedAmount.toLocaleString("ja-JP")} <span style="color:var(--text-secondary);">(${c.probability}%)</span></div>
                ${c.nextAction?`<div class="pk-card-action">🎯 ${c.nextAction}${c.nextActionDate?" ("+c.nextActionDate+")":""}</div>`:""}
                ${c.assignedStaffCode?`<div class="pk-card-staff">👤 ${c.assignedStaffCode}</div>`:""}
                <div style="margin-top:6px;" onclick="event.stopPropagation()">
                  <button class="button-sm secondary" data-action="prospect-quote-create"
                    data-id="${c.id}" data-name="${c.companyName.replace(/"/g,"&quot;")}"
                    data-addr="${(c.address??"").replace(/"/g,"&quot;")}"
                    style="font-size:11px;padding:2px 8px;">見積作成</button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function Eu(e){return`
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
                <td><span class="status-pill" style="background:${Wn[t.stage]};color:white;">${Ba[t.stage]}</span></td>
                <td class="numeric">¥${t.expectedAmount.toLocaleString("ja-JP")}</td>
                <td class="numeric">${t.probability}%</td>
                <td>${t.nextAction??"―"}${t.nextActionDate?` (${t.nextActionDate})`:""}</td>
                <td>${t.assignedStaffCode??"―"}</td>
                <td>
                  <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-start;">
                    <button class="button-sm secondary" data-action="prospect-quote-create"
                      data-id="${t.id}" data-name="${t.companyName.replace(/"/g,"&quot;")}"
                      data-addr="${(t.address??"").replace(/"/g,"&quot;")}">見積作成</button>
                    <button class="button-sm secondary" data-action="prospect-edit" data-id="${t.id}">編集</button>
                    <button class="button-sm secondary" data-action="prospect-delete" data-id="${t.id}" style="color:var(--danger);">削除</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Au(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(s=>s.id===e.editingId);return!t&&!n?"":`
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
                ${["","飲食店","酒店","百貨店","スーパー","宿泊","小売","卸","その他"].map(s=>`<option value="${s}" ${n?.businessType===s?"selected":""}>${s||"―"}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>ステージ</span>
              <select id="prospect-stage">
                ${Object.entries(Ba).map(([s,r])=>`<option value="${s}" ${n?.stage===s?"selected":""}>${r}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>流入元</span>
              <select id="prospect-source">
                ${["","展示会","紹介","WEB","コールド","問合せ","リピート"].map(s=>`<option value="${s}" ${n?.source===s?"selected":""}>${s||"―"}</option>`).join("")}
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
            ${e.activities.slice(0,10).map(s=>`
              <div>
                <dt>${s.activityDate.slice(0,10)} - ${s.activityType}</dt>
                <dd>${s.title??""} ${s.result?`→ ${s.result}`:""}</dd>
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
  `}function Lu(e,t,n){const s=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
          <input id="slack-webhook" type="text" value="${s}" placeholder="https://hooks.slack.com/services/..." />
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
            ${t.map(i=>`
              <tr>
                <td>${qa[i.eventType]||i.eventType}</td>
                <td>
                  <label style="display:flex;align-items:center;gap:6px;">
                    <input type="checkbox" data-slack-rule-id="${i.id}" data-slack-field="enabled" ${i.enabled?"checked":""} />
                    ${i.enabled?"ON":"OFF"}
                  </label>
                </td>
                <td>
                  <input type="text" data-slack-rule-id="${i.id}" data-slack-field="channel" value="${i.channel}" style="width:180px;padding:4px 8px;" />
                </td>
                <td style="font-size:12px;color:var(--text-secondary);">${i.lastTriggeredAt?i.lastTriggeredAt.slice(0,16).replace("T"," "):"未通知"}</td>
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
            ${n.map(i=>`
              <tr>
                <td style="font-size:12px;">${i.sentAt.slice(0,16).replace("T"," ")}</td>
                <td>${qa[i.eventType]||i.eventType}</td>
                <td class="mono" style="font-size:12px;">${i.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${i.message}</td>
                <td><span class="status-pill ${i.status==="sent"?"success":"warning"}">${i.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Cu(e,t,n,s){const r=new Map(t.map(g=>[g.code,g])),i=e.filter(g=>g.callDirection==="inbound").length,c=e.filter(g=>g.callDirection==="outbound").length,d=e.filter(g=>g.callStatus==="missed").length,u=e.reduce((g,$)=>g+($.durationSeconds??0),0),y=g=>{if(g===0)return"―";const $=Math.floor(g/60),_=g%60;return $>0?`${$}分${_}秒`:`${_}秒`},h=g=>{if(g.matchedCustomerCode){const $=r.get(g.matchedCustomerCode);if($)return`${$.name} (既存)`}return"未登録番号"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">IVRy 電話連携</p>
        <h1>通話履歴</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="ivry-sync" ${s?"":"disabled"}>🔄 IVRyから同期</button>
        <button class="button secondary" data-action="ivry-push-phonebook" ${s?"":"disabled"}>📱 電話帳を送信</button>
      </div>
    </section>

    ${s?"":`
      <section class="panel">
        <p class="form-hint" style="margin:0;">
          ⚠️ IVRy連携が無効です。<a href="#" data-link="/integrations">連携設定</a>からAPIキーを設定してください。
        </p>
      </section>
    `}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">着信</p>
        <p class="kpi-value">${i}件</p>
        <p class="kpi-sub">不在 ${d}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">発信</p>
        <p class="kpi-value">${c}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">通話時間合計</p>
        <p class="kpi-value">${y(u)}</p>
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
            ${e.map(g=>`
              <tr>
                <td style="font-size:12px;">${g.startedAt?new Date(g.startedAt).toLocaleString("ja-JP"):"―"}</td>
                <td>
                  ${g.callDirection==="inbound"?'<span class="status-pill neutral">📞 着信</span>':'<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${h(g)}</strong>
                  ${g.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${g.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${g.callDirection==="inbound"?g.fromNumber:g.toNumber}</td>
                <td>
                  ${g.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':g.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${g.callStatus}</span>`}
                </td>
                <td>${y(g.durationSeconds??0)}</td>
                <td>${g.recordingUrl?`<a href="${g.recordingUrl}" target="_blank" class="button-sm secondary">🎧 再生</a>`:"―"}</td>
                <td>
                  ${g.matchedCustomerCode?"":`<button class="button-sm secondary" data-action="call-link-customer" data-id="${g.id}" data-phone="${g.callDirection==="inbound"?g.fromNumber:g.toNumber}">顧客に紐付け</button>`}
                  <button class="button-sm secondary" data-action="call-memo" data-id="${g.id}">メモ</button>
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
  `}const Du=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function qu(e){const t=e.activeListId?e.lists.find(i=>i.id===e.activeListId):null,n=e.items.filter(i=>i.status==="new").length,s=e.items.filter(i=>i.status==="imported").length,r=e.items.filter(i=>i.status==="excluded").length;return`
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
            ${Du.map(i=>`<option value="${i}" ${e.searchBusinessType===i?"selected":""}>${i}</option>`).join("")}
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
                ${e.searchResults.map((i,c)=>`
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${c}" checked /></td>
                    <td><strong>${i.companyName}</strong></td>
                    <td style="font-size:12px;">${i.address??"―"}</td>
                    <td class="numeric">${i.rating?`⭐${i.rating}`:"―"}</td>
                    <td class="numeric">${i.reviewCount??"―"}</td>
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
        ${e.lists.map(i=>`
          <button class="button ${e.activeListId===i.id?"primary":"secondary"}"
                  data-action="lb-select-list" data-id="${i.id}">
            ${i.name} (${i.totalCount})
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
            <span>✅ 取込済: <strong>${s}</strong></span>
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
              ${e.items.map(i=>`
                <tr ${i.status==="excluded"?'style="opacity:0.4;"':""}>
                  <td>${i.status==="new"?`<input type="checkbox" class="lb-item-check" data-id="${i.id}" />`:""}</td>
                  <td><strong>${i.companyName}</strong></td>
                  <td style="font-size:12px;">${i.address??"―"}</td>
                  <td class="mono" style="font-size:12px;">${i.phone??"―"}</td>
                  <td class="numeric">${i.rating?`⭐${i.rating}(${i.reviewCount??0})`:"―"}</td>
                  <td>
                    ${i.status==="new"?'<span class="status-pill neutral">新規</span>':i.status==="imported"?'<span class="status-pill success">取込済</span>':'<span class="status-pill warning">除外</span>'}
                  </td>
                  <td>
                    ${i.status==="new"?`<button class="button-sm secondary" data-action="lb-exclude" data-id="${i.id}">除外</button>`:""}
                    ${i.status==="new"?`<button class="button-sm primary" data-action="lb-convert-one" data-id="${i.id}">→見込客</button>`:""}
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
  `}const Fs={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Tu={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Iu={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function Ee(e){return"¥"+e.toLocaleString("ja-JP")}function Ht(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Lr(e,t){const n=e.reduce((i,c)=>i+c.amount,0),s=Math.floor(n*t),r=n+s;return{subtotal:n,taxAmount:s,total:r}}const ye={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function he(e,t){const n=e.align??"left",s=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function an(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Mu(e,t,n){const s=an(e.documentDate),r=an(e.orderDate??e.documentDate),i=an(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((k,L)=>{const E=ye.detailStartY+L*ye.detailRowH,o=ye.detailCols,l=[],p=(m,f)=>{f&&l.push(he({...m,y:E,x:m.x+0},f))};return p(o.productName,k.productName+(k.spec?` ${k.spec}`:"")),p(o.productCode,k.productCode),p(o.color,k.color??""),p(o.size,[k.size,k.caseQty?`×${k.caseQty}`:""].filter(Boolean).join(" ")),p(o.unit,k.unit),p(o.quantity,k.quantity>0?k.quantity.toLocaleString("ja-JP"):""),p(o.correctedQty,k.correctedQuantity?k.correctedQuantity.toLocaleString("ja-JP"):""),p(o.discount,k.discount?k.discount.toLocaleString("ja-JP"):""),p(o.unitPrice,k.unitPrice>0?k.unitPrice.toLocaleString("ja-JP"):""),p(o.costAmount,k.amount>0?k.amount.toLocaleString("ja-JP"):""),p(o.retailPrice,k.retailPrice?k.retailPrice.toLocaleString("ja-JP"):""),p(o.note,k.receivedAmount?k.receivedAmount.toLocaleString("ja-JP"):""),l.join("")}).join(""),d=e.lines.reduce((k,L)=>k+(L.amount||0),0),u=e.lines.reduce((k,L)=>k+(L.retailPrice||0)*(L.correctedQuantity??L.quantity),0),y=e.lines.reduce((k,L)=>k+(L.receivedAmount||0),0),h=e.lines.reduce((k,L)=>k+(L.returnAmount||0),0),g=e.lines.reduce((k,L)=>k+L.quantity,0),$=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",_=n.calibrationOffsetX||0,S=n.calibrationOffsetY||0,C=`transform: translate(${_}mm, ${S}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${$}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${C}">
        ${he(ye.currentDateY,s.y)}
        ${he(ye.currentDateM,s.m)}
        ${he(ye.currentDateD,s.d)}
        ${he(ye.documentNo,e.documentNo)}
        ${e.settlementPrint?he(ye.settlementCheck,"✓"):""}

        ${he(ye.vendorName,t.name)}
        ${he(ye.vendorAddress,t.address1)}
        ${he(ye.chainStoreCode,e.chainStoreCode??"")}
        ${he(ye.categoryCode,e.categoryCode??"")}
        ${he(ye.slipNumber,e.documentNo)}
        ${he(ye.vendorCode,e.slipTypeCode??"")}

        ${he(ye.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${he(ye.orderDateY,r.y)}
        ${he(ye.orderDateM,r.m)}
        ${he(ye.orderDateD,r.d)}
        ${he(ye.deliveryDateY,i.y)}
        ${he(ye.deliveryDateM,i.m)}
        ${he(ye.deliveryDateD,i.d)}
        ${he(ye.orderNo,e.orderNo??"")}
        ${he(ye.partnerCode,e.vendorCode??"")}

        ${c}

        ${he(ye.totalQty,g.toLocaleString("ja-JP"))}
        ${he(ye.receivedTotal,y.toLocaleString("ja-JP"))}
        ${he(ye.returnTotal,h.toLocaleString("ja-JP"))}
        ${he(ye.correctedCostTotal,d.toLocaleString("ja-JP"))}
        ${he(ye.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Nu(e,t,n){const{subtotal:s,taxAmount:r,total:i}=Lr(e.lines,e.taxRate),c=e.previousBalance??0,d=e.paymentAmount??0,u=c-d+i,y=e.lines.map(g=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${g.note??""}</td>
        <td>${g.productName}${g.spec?` <span style="color:#636e72;font-size:9pt;">/ ${g.spec}</span>`:""}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${g.unit}</td>`:""}
        <td class="numeric">${Ee(g.unitPrice)}</td>
        <td class="numeric">${Ee(g.amount)}</td>
      </tr>
    `).join(""),h=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
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
        <div><dt>請求日</dt><dd>${Ht(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${Ht(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${Ee(u)}</span>
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
        <tbody>${y}${h}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${Ee(s)} / 消費税: ${Ee(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${Ee(c)}</td></tr>`:""}
          ${d?`<tr><th>ご入金額</th><td>▲ ${Ee(d)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${Ee(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${Ee(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${Ee(u)}</td></tr>
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
  `}function Ru(e,t,n){const{subtotal:s,taxAmount:r,total:i}=Lr(e.lines,e.taxRate),c=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${Ee(u.unitPrice)}</td>
        <td class="numeric">${Ee(u.amount)}</td>
      </tr>
    `).join(""),d=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
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
        <div><dt>見積日</dt><dd>${Ht(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${Ht(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${Ee(i)}</span>
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
        <tbody>${c}${d}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${Ee(s)} / 消費税: ${Ee(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${Ee(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${Ee(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${Ee(i)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?Ht(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function Ou(e,t,n,s){let r="";switch(e){case"chain_store":r=Mu(s,n,t);break;case"quotation":r=Ru(s,n,t);break;case"invoice_monthly":r=Nu(s,n,t);break}const i=Object.keys(Fs).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Fs[u]}</button>`).join(""),c=s.lines.map((u,y)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${y}" data-print-lfield="productName" value="${u.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${y}" data-print-lfield="quantity" value="${u.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${y}" data-print-lfield="unitPrice" value="${u.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${y}">✕</button></td>
      </tr>`).join(""),d=[{key:"showSeal",label:"印影"},{key:"showRegistrationNo",label:"登録番号"},{key:"showBankInfo",label:"振込先"},{key:"showJanCode",label:"JAN"},{key:"showRemarks",label:"備考"}].map(u=>`<label style="font-size:12px;"><input type="checkbox" data-print-opt="${u.key}" ${t[u.key]?"checked":""} /> ${u.label}</label>`).join(" ");return`
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
      <div class="tab-group">${i}</div>
    </div>

    <div class="print-layout no-print">
      <!-- 左: 設定 -->
      <div class="print-settings">

        <div class="panel">
          <h3 class="panel-title" style="margin-bottom:12px;">書類情報</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <label class="field" style="flex:1 1 120px;">
              <span>書類番号</span>
              <input type="text" data-print-field="documentNo" value="${s.documentNo}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>日付</span>
              <input type="date" data-print-field="documentDate" value="${s.documentDate}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>得意先名</span>
              <input type="text" data-print-field="customerName" value="${s.customerName}" />
            </label>
            <label class="field" style="flex:1 1 60px;">
              <span>敬称</span>
              <select data-print-field="customerHonorific">
                <option value="御中" ${s.customerHonorific==="御中"?"selected":""}>御中</option>
                <option value="様" ${s.customerHonorific==="様"?"selected":""}>様</option>
              </select>
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>税率</span>
              <select data-print-field="taxRate">
                <option value="0.10" ${s.taxRate===.1?"selected":""}>10%</option>
                <option value="0.08" ${s.taxRate===.08?"selected":""}>8%</option>
              </select>
            </label>
            ${e==="invoice_monthly"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>お支払期限</span>
                  <input type="date" data-print-field="dueDate" value="${s.dueDate??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>前回請求額</span>
                  <input type="number" data-print-field="previousBalance" value="${s.previousBalance??0}" />
                </label>`:""}
            ${e==="chain_store"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>柱店CD</span>
                  <input type="text" data-print-field="chainStoreCode" value="${s.chainStoreCode??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>伝票区分</span>
                  <input type="text" data-print-field="slipTypeCode" value="${s.slipTypeCode??""}" />
                </label>`:""}
          </div>
        </div>

        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 class="panel-title">明細 (${s.lines.length}行)</h3>
            <button class="button secondary" data-action="print-add-line" style="padding:6px 12px;font-size:12px;">＋行追加</button>
          </div>
          <div class="table-wrap">
            <table style="min-width:auto;">
              <thead><tr><th>品名</th><th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th><th></th></tr></thead>
              <tbody>${c||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
            </table>
          </div>
        </div>

        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">⚙️ 表示オプション</summary>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
            ${d}
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
  `}const Bu={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},ju={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Cr(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],s="",r=!1;for(let d=0;d<e.length;d++){const u=e[d];r?u==='"'?e[d+1]==='"'?(s+='"',d++):r=!1:s+=u:u==='"'?r=!0:u===","?(n.push(s),s=""):u===`
`||u==="\r"?(u==="\r"&&e[d+1]===`
`&&d++,n.push(s),n.some(y=>y!=="")&&t.push(n),n=[],s=""):s+=u}if((s!==""||n.length>0)&&(n.push(s),n.some(d=>d!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const i=t[0].map(d=>d.trim()),c=[];for(let d=1;d<t.length;d++){const u={};i.forEach((y,h)=>{u[y]=(t[d][h]??"").trim()}),c.push(u)}return{columns:i,rows:c}}function Dr(e,t,n){const s=Bu[e],r=s.filter(d=>!t.includes(d)),i=n.map(d=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const y of s)t.includes(y)&&!d[y]&&u.push(`${y}が空`);return{...d,_valid:u.length===0,_error:u[0]}}),c=i.filter(d=>d._valid).length;return{entity:e,columns:t,rows:i,totalRows:n.length,validRows:c,invalidRows:i.length-c}}function qr(e){const n=ju[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function Tr(e,t){const{supabaseInsert:n}=await N(async()=>{const{supabaseInsert:d}=await Promise.resolve().then(()=>te);return{supabaseInsert:d}},void 0);let s=0,r=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const d of t){if(!d._valid)continue;const{_valid:u,_error:y,...h}=d,g={...h};if(!g.id){const $=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";g.id=String(h[$]??`${e}-${Date.now()}-${s+r}`)}for(const $ of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof g[$]=="string"&&g[$]!==""){const _=Number(g[$]);Number.isFinite(_)&&(g[$]=_)}try{await n(c,g)!==null?s++:r++}catch{r++}}return{inserted:s,failed:r}}const zu=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:qr,importToSupabase:Tr,parseCSV:Cr,validateImport:Dr},Symbol.toStringTag,{value:"Module"}));function nn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Fu(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Vu(e,t,n,s,r){const i=n.reduce((y,h)=>y+h.rowCount,0),c=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,d=100,u=Math.max(1,Math.ceil(r/d));return`
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
        <p class="kpi-value">${i.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">全テーブル合計</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value">${c?nn(c):"---"}</p>
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
        ${n.map(y=>`
          <button
            class="panel kpi-card ${e===y.tableName?"kpi-alert":""}"
            type="button"
            data-action="raw-select-table"
            data-table="${y.tableName}"
            style="cursor:pointer;text-align:left;border:2px solid ${e===y.tableName?"var(--primary)":"transparent"};transition:border-color .15s;"
          >
            <p class="panel-title" style="font-size:12px;">${y.displayName}</p>
            <p class="kpi-value" style="font-size:18px;">${y.rowCount.toLocaleString("ja-JP")}</p>
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?nn(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((s-1)*d+1).toLocaleString("ja-JP")}-${Math.min(s*d,r).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${s<=1?"disabled":""}>← 前</button>
          <span style="padding:0 8px;">${s} / ${u}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${s>=u?"disabled":""}>次 →</button>
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
            ${t.map(y=>`
            <tr>
              <td class="numeric mono">${y._record_index}</td>
              <td class="mono">${y._source_file||""}</td>
              <td class="numeric">${y._record_size??""} B</td>
              <td>${y._synced_at?nn(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${Fu(y._raw_b64)}</td>
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
  `}const gt=400,vt=240;function ce(e){return e.toLocaleString("ja-JP")}function sn(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function Yu(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function Ve(e,t,n,s=""){return`<th class="${s}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${Yu(n,t)}</th>`}function jt(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function Uu(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const s=e.products.slice().sort((L,E)=>(e.productTotals[E.code]??0)-(e.productTotals[L.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],i=820,c=280,d={top:20,right:20,bottom:40,left:60},u=i-d.left-d.right,y=c-d.top-d.bottom,h=t.map(L=>s.reduce((E,o)=>E+(n[o.code]?.[L]??0),0)),g=Math.max(...h,1),$=u/t.length,_=Math.max($-10,14),S=[0,.25,.5,.75,1].map(L=>{const E=d.top+y-y*L,o=`${Math.round(g*L/100)*100}`;return`
      <line x1="${d.left}" y1="${E}" x2="${i-d.right}" y2="${E}" class="chart-grid" />
      <text x="6" y="${E+4}" class="chart-axis">${Number(o).toLocaleString("ja-JP")}</text>
    `}).join(""),C=t.map((L,E)=>{let o=d.top+y;const l=d.left+E*$+($-_)/2,p=s.map((P,D)=>{const R=(n[P.code]?.[L]??0)/g*y;return o-=R,`<rect x="${l}" y="${o}" width="${_}" height="${R}" fill="${r[D%r.length]}" opacity="0.85" rx="${D===s.length-1?3:0}" />`}).join(""),[m,f]=L.split("-"),w=parseInt(f),b=w===1||E%3===0,x=w===1?`${m.slice(2)}年`:`${w}月`;return`<g>${p}${b?`<text x="${l+_/2}" y="${c-10}" class="chart-axis centered-axis">${x}</text>`:""}</g>`}).join(""),k=s.map((L,E)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[E%r.length]};"></span>
       ${L.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${S}${C}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${k}</div>
  `}function Ju(e){const{months:t,products:n}=e,s=n.slice().sort((c,d)=>(e.productTotals[d.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),r=t.map(c=>{const[d,u]=c.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${d.slice(2)}年1月`:`${y}月`}</th>`}).join(""),i=s.map(c=>{const d=t.map(u=>{const y=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${y>0?ce(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${c.code}</td>
        <td style="white-space:nowrap;">${c.name}</td>
        ${d}
        <td class="numeric"><strong>${ce(e.productTotals[c.code]??0)}</strong></td>
        <td class="numeric">${ce(Math.round(e.productAvg[c.code]??0))}</td>
        <td class="numeric">${ce(Math.round(e.productStdDev[c.code]??0))}</td>
      </tr>
    `}).join("");return`
    <div class="table-wrap" style="overflow-x:auto;">
      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>商品名</th>
            ${r}
            <th class="numeric">合計</th>
            <th class="numeric">月平均</th>
            <th class="numeric">標準偏差</th>
          </tr>
        </thead>
        <tbody>${i||`<tr><td colspan="${t.length+5}" class="empty-row">データなし</td></tr>`}</tbody>
      </table>
    </div>
  `}function Hu(e,t){const n=e.months[e.months.length-1]??"",s=e.months[e.months.length-2]??"",r=e.months.length-13,i=r>=0?e.months[r]:"",c=e.products.reduce((_,S)=>_+(e.matrix[S.code]?.[n]??0),0),d=e.products.reduce((_,S)=>_+(e.matrix[S.code]?.[s]??0),0),u=i?e.products.reduce((_,S)=>_+(e.matrix[S.code]?.[i]??0),0):0,y=d>0?(c-d)/d*100:0,h=u>0?(c-u)/u*100:0,g=_=>_>=0?"+":"",$=[1,2,3,5].map(_=>`<option value="${_}" ${_===t?"selected":""}>${_}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${ce(c)} 本</p>
        <p class="kpi-sub">${sn(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${g(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${sn(s)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${h>=0?"":"text-danger"}">${u>0?`${g(h)}${h.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${i?`${sn(i)} 比`:"前年データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">取扱商品数</p>
        <p class="kpi-value">${e.products.length} SKU</p>
        <p class="kpi-sub">集計対象</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div><h2>月次出荷数量（商品別積み上げ）</h2><p class="panel-caption">上位6商品</p></div>
        <div style="display:flex;align-items:center;gap:10px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
            対象期間
            <select data-action="demand-years-back" style="width:80px;">${$}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${Uu(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${Ju(e)}
    </section>
  `}function Ku(e,t){const s=e.slice().sort((i,c)=>{if(!t)return 0;const d=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return d*i.productName.localeCompare(c.productName,"ja");case"ss-avg":return d*(i.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return d*(i.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(jt(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),y=Math.ceil(jt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-y)}case"ss-rop":{const u=Math.ceil(i.avgMonthlyDemand*(i.leadTimeDays/30)+jt(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),y=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+jt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-y)}default:return 0}}).map(i=>{const c=jt(i.serviceLevel),d=i.leadTimeDays/30,u=Math.ceil(c*i.demandStdDev*Math.sqrt(d)),y=Math.ceil(i.avgMonthlyDemand*d+u),h=u-i.safetyStockQty,g=h>0?"text-danger":h<-u*.3?"text-warning":"",$=[.9,.95,.99].map(_=>`<option value="${_}" ${Math.abs(i.serviceLevel-_)<.01?"selected":""}>${(_*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${i.productName}</td>
        <td class="numeric">${ce(Math.round(i.avgMonthlyDemand))}</td>
        <td class="numeric">${ce(Math.round(i.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${i.leadTimeDays}"
            data-action="ss-lead-time" data-code="${i.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${i.productCode}"
            style="width:64px;">${$}</select>
        </td>
        <td class="numeric"><strong>${ce(u)}</strong></td>
        <td class="numeric">${ce(y)}</td>
        <td class="numeric ${g}">
          ${h>0?`+${ce(h)}`:ce(h)}
          ${h>0?'<span class="status-pill warning" style="margin-left:4px">不足</span>':""}
        </td>
      </tr>
    `}).join("");return`
    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>計算式</h2></div>
      <div style="padding:12px 16px;background:var(--surface-alt);border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.8;">
        SS = Z × σ × √(LT / 30)<br>
        発注点 = 月平均需要 × (LT / 30) + SS<br>
        <span style="color:var(--text-secondary);font-size:12px;">
          Z: サービス率係数（90%→1.28 / 95%→1.65 / 99%→2.33）　σ: 月次需要の標準偏差　LT: リードタイム（日）
        </span>
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>一括変更</h2></div>
      <div style="display:flex;align-items:flex-end;gap:16px;padding:4px 0 8px;">
        <label class="field" style="margin:0;">
          <span>サービス率（全商品）</span>
          <select id="bulk-service-level" style="width:90px;">${[.9,.95,.99].map(i=>`<option value="${i}" ${i===.95?"selected":""}>${(i*100).toFixed(0)}%</option>`).join("")}</select>
        </label>
        <label class="field" style="margin:0;">
          <span>リードタイム・日（全商品）</span>
          <input id="bulk-lead-time" type="number" min="1" max="180" value="30"
            style="width:72px;text-align:right;" />
        </label>
        <button class="button secondary" type="button" data-action="bulk-apply-safety"
          style="margin-bottom:2px;">全商品に適用して再計算</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div><h2>商品別 安全在庫パラメータ</h2><p class="panel-caption">個別に調整するか、一括変更を使用してください</p></div>
        <button class="button primary" type="button" data-action="ss-save-all">安全在庫を保存</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${Ve("商品名","ss-name",t)}
              ${Ve("月平均需要","ss-avg",t,"numeric")}
              ${Ve("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${Ve("安全在庫[算出]","ss-ss",t,"numeric")}
              ${Ve("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const Qu={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Wu(e,t,n,s,r=[],i={partCapacity:gt,empCapacity:vt}){const c={draft:"下書き",confirmed:"確定",actual:"実績入力済"},d={draft:"neutral",confirmed:"info",actual:"success"},u=O=>Object.entries(Qu).map(([I,j])=>`<option value="${I}" ${I===O?"selected":""}>${j}</option>`).join(""),y=640,h=e.filter(O=>O.plannedQty>0||Math.max(0,O.demandForecast+O.safetyStockTarget-O.openingStock)>0),g=r.length>0?En(h,r,i):[],[$,_]=t.split("-").map(Number),S=_===12?`${$+1}-01`:`${$}-${String(_+1).padStart(2,"0")}`,C=Kt(S,1,0),k=C.length>0?En(h,C,i):[],L=new Map;for(const O of[...g,...k])for(const I of O.items)L.has(I.productCode)||L.set(I.productCode,[]),L.get(I.productCode).push({date:O.date,qty:I.qty});const E=O=>O.map(I=>{const j=Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock),V=I.plannedQty>0?I.plannedQty:Math.round(j),U=V>0?Math.ceil(V/y*10)/10:0,W=I.plannedQty>0?(I.actualQty-I.plannedQty)/I.plannedQty*100:null,H=W!==null?W>=0?"text-success":"text-danger":"",Q=L.get(I.productCode)??[],Z=Q.length>0?Q.map(ee=>{const ne=ee.date.slice(5).replace("-","/");return`<span style="font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;display:inline-block;${ee.date.startsWith(S)?"background:#fef3c7;color:#92400e;":"background:#dbeafe;color:#1e40af;"}" title="${ee.date}">${ne}(${ee.qty})</span>`}).join(""):'<span style="font-size:9px;color:var(--text-disabled);">—</span>';return`
      <tr>
        <td style="white-space:nowrap;">${I.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${I.productCode}"
            style="width:92px;">${u(I.productionType)}</select>
        </td>
        <td class="numeric">${ce(Math.round(I.demandForecast))}</td>
        <td class="numeric">${ce(Math.round(I.safetyStockTarget))}</td>
        <td class="numeric">${ce(Math.round(I.openingStock))}</td>
        <td class="numeric"><strong>${ce(Math.round(j))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${I.plannedQty}"
            data-action="plan-qty" data-code="${I.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td style="max-width:200px;overflow-x:auto;white-space:nowrap;">${Z}</td>
        <td class="numeric">
          <input class="input-sm" type="number" min="0"
            value="${I.actualQty||""}"
            data-action="plan-actual-qty" data-code="${I.productCode}"
            placeholder="0"
            style="width:70px;text-align:right;" />
        </td>
        <td class="numeric ${H}">
          ${W!==null?`${W>=0?"+":""}${W.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${U>0?`${U.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${d[I.status]??"neutral"}">${c[I.status]??I.status}</span>
        </td>
      </tr>
    `}).join(""),l=(n==="all"?e:e.filter(O=>O.productionType===n)).slice().sort((O,I)=>{if(!s)return 0;const j=s.dir==="asc"?1:-1,V=Math.max(0,O.demandForecast+O.safetyStockTarget-O.openingStock),U=Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock);switch(s.column){case"plan-name":return j*O.productName.localeCompare(I.productName,"ja");case"plan-forecast":return j*(O.demandForecast-I.demandForecast);case"plan-required":return j*(V-U);case"plan-planned":return j*(O.plannedQty-I.plannedQty);case"plan-actual":return j*(O.actualQty-I.actualQty);case"plan-label":{const W=O.plannedQty>0?O.plannedQty:Math.round(V),H=I.plannedQty>0?I.plannedQty:Math.round(U);return j*(W-H)}default:return 0}}),p=E(l),m=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],f=O=>{const j=(O==="all"?e:e.filter(V=>V.productionType===O)).reduce((V,U)=>{const W=Math.max(0,U.demandForecast+U.safetyStockTarget-U.openingStock);return V+(U.plannedQty>0?U.plannedQty:Math.round(W))},0);return Math.ceil(j/y*10)/10},w=m.filter(O=>O.key!=="all").map(O=>{const I=f(O.key),j=e.filter(U=>U.productionType===O.key).length,V=O.key==="make_to_order"?e.filter(U=>U.productionType==="make_to_order"&&U.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${O.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${I>0?I.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${j}商品${V!==null?` · 受注${V}件`:""}</p>
      </div>
    `}).join(""),b=l.reduce((O,I)=>O+I.demandForecast,0),x=l.reduce((O,I)=>O+Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock),0),P=l.reduce((O,I)=>O+I.plannedQty,0),D=l.reduce((O,I)=>O+I.actualQty,0),q=f(n),R=new Date,B=Array.from({length:24},(O,I)=>{const j=new Date(R.getFullYear(),R.getMonth()-6+I,1),V=`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`;return`<option value="${V}" ${V===t?"selected":""}>${V.replace("-","年")}月</option>`}).join(""),M=m.map(O=>`<button class="button ${n===O.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${O.key}"
       style="padding:4px 12px;font-size:13px;">${O.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${B}</select>
      </label>
      <button class="button secondary" type="button" data-action="plan-recalc">需要予測を再計算</button>
      <label class="button secondary" type="button" style="cursor:pointer;margin:0;padding:6px 12px;font-size:13px;">
        CSVから在庫・計画を読込
        <input type="file" accept=".csv" data-action="plan-csv-import"
          style="display:none;" />
      </label>
    </div>
    <div id="csv-import-status" style="display:none;margin-bottom:12px;padding:8px 12px;border-radius:6px;font-size:12px;"></div>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>ラベル工数サマリ</h2><p class="panel-caption">表+裏 手貼り 80本/時 × 8h = 640本/人日</p></div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${w}</div>
    </section>

    ${r.length>0?(()=>{const O=r.filter(j=>j.partTimers>0||j.employees>0),I=O.map(j=>{const V=parseInt(j.date.slice(8)),U=["日","月","火","水","木","金","土"][new Date(j.date).getDay()];return`<span style="font-size:10px;padding:2px 5px;border-radius:3px;background:#dbeafe;color:#1e40af;margin:1px;display:inline-block;">${V}(${U})</span>`}).join("");return`<div style="background:var(--surface-alt);border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;">
        <div style="margin-bottom:4px;"><strong>${t.replace("-","年")}月 稼働日: ${O.length}日</strong>
          <span style="color:var(--text-secondary);margin-left:8px;">翌月: ${S.replace("-","年")}月</span></div>
        <div style="line-height:1.8;">${I}</div>
      </div>`})():""}

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>生産計画 — ${t.replace("-","年")}月</h2>
          <p class="panel-caption">製造予定は稼働日（カレンダー）と連動 ・ <span style="background:#dbeafe;color:#1e40af;padding:1px 4px;border-radius:2px;font-size:10px;">当月</span> <span style="background:#fef3c7;color:#92400e;padding:1px 4px;border-radius:2px;font-size:10px;">翌月</span></p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="button secondary" type="button" data-action="plan-print">印刷</button>
          <button class="button secondary" type="button" data-action="plan-csv-export">CSV出力</button>
          <button class="button primary" type="button" data-action="plan-save">計画を保存</button>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${M}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${Ve("商品名","plan-name",s)}
              <th>生産区分</th>
              ${Ve("需要予測","plan-forecast",s,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${Ve("必要生産数","plan-required",s,"numeric")}
              ${Ve("計画数","plan-planned",s,"numeric")}
              <th style="white-space:nowrap;">製造予定</th>
              ${Ve("実績数","plan-actual",s,"numeric")}
              <th class="numeric">達成率</th>
              ${Ve("ラベル工数","plan-label",s,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${p||'<tr><td colspan="12" class="empty-row">データなし</td></tr>'}
            ${l.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${ce(Math.round(b))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${ce(Math.round(x))}</td>
                <td class="numeric">${ce(P)}</td>
                <td>—</td>
                <td class="numeric">${D>0?ce(D):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${q.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ir(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return Array.from({length:s},(r,i)=>{const c=i+1;return`${e}-${String(c).padStart(2,"0")}`})}function Vs(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function Ys(e){const t=new Date(e).getDay();return t===0||t===6}function Gu(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Mr(e){return e.partTimers+e.employees}function Ge(e,t,n={partCapacity:gt,empCapacity:vt}){const s=e.filter(h=>h.partTimers>0||h.employees>0);if(s.length===0)return;const r=t.reduce((h,g)=>{const $=g.plannedQty>0?g.plannedQty:Math.max(0,g.demandForecast+g.safetyStockTarget-g.openingStock);return h+$},0);if(r<=0)return;const i=r/s.length;let c=0,d=0,u=1/0;const y=Math.ceil(i/n.partCapacity);for(let h=0;h<=y;h++){const g=i-h*n.partCapacity,$=g>0?Math.ceil(g/n.empCapacity):0,_=h+$;_<u&&(u=_,c=h,d=$)}for(const h of e)h.confirmed||(h.partTimers>0||h.employees>0)&&(h.partTimers=c,h.employees=d)}function En(e,t,n={partCapacity:gt,empCapacity:vt}){const s=t.filter(d=>Mr(d)>0).map(d=>d.date).sort();if(s.length===0)return t.map(d=>({date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},i=e.filter(d=>d.plannedQty>0||Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)>0).map(d=>({productCode:d.productCode,productName:d.productName,productionType:d.productionType,remaining:d.plannedQty>0?d.plannedQty:Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)})).filter(d=>d.remaining>0).sort((d,u)=>(r[d.productionType]??99)-(r[u.productionType]??99)||u.remaining-d.remaining),c=new Map;for(const d of t){const u=Gu(d,n);c.set(d.date,{date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const d of i){let u=d.remaining;if(u<=0)continue;if(s.reduce((h,g)=>{const $=c.get(g);return h+Math.max(0,$.capacity-$.totalQty)},0)<=0)break;for(const h of s){if(u<=0)break;const g=c.get(h),$=Math.max(0,g.capacity-g.totalQty);if($<=0)continue;const _=Math.min(u,$);g.items.push({productCode:d.productCode,productName:d.productName,productionType:d.productionType,qty:_}),g.totalQty+=_,g.utilization=g.capacity>0?g.totalQty/g.capacity:0,u-=_}}return t.map(d=>c.get(d.date))}function Kt(e,t=1,n=1){return Ir(e).map(s=>({date:s,partTimers:Ys(s)?0:t,employees:Ys(s)?0:n,confirmed:!1}))}function Xu(e,t,n,s=null,r=new Set,i={partCapacity:gt,empCapacity:vt}){const c=Ir(t),d=e.filter(D=>!r.has(D.productCode)),u=En(d,n,i),y=new Map(u.map(D=>[D.date,D])),h=d.reduce((D,q)=>D+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0),$=e.reduce((D,q)=>D+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0)-h,_=u.reduce((D,q)=>D+q.totalQty,0),S=n.filter(D=>Mr(D)>0).length,C=u.reduce((D,q)=>D+q.capacity,0),k=n.reduce((D,q)=>D+q.partTimers,0),L=n.reduce((D,q)=>D+q.employees,0),E=S>0?Math.ceil(h/S):0,o=new Date,l=Array.from({length:24},(D,q)=>{const R=new Date(o.getFullYear(),o.getMonth()-6+q,1),B=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}`;return`<option value="${B}" ${B===t?"selected":""}>${B.replace("-","年")}月</option>`}).join(""),p=new Date(c[0]).getDay(),m=[];for(let D=0;D<p;D++)m.push('<div style="min-height:44px;"></div>');for(const D of c){const q=y.get(D),R=new Date(D).getDay(),B=parseInt(D.split("-")[2]),M=q?.partTimers??0,O=q?.employees??0,I=M+O,j=q?.totalQty??0,V=q?.utilization??0,U=D===s,W=I===0?"var(--surface-alt)":V>.95?"rgba(197,61,61,0.12)":V>.7?"rgba(183,121,31,0.10)":V>0?"rgba(47,133,90,0.08)":"var(--surface)",H=I===0?"transparent":V>.95?"#c53d3d":V>.7?"#b7791f":V>0?"#2f855a":"var(--border)",Q=R===0?"#c53d3d":R===6?"#0F5B8D":"var(--text)",Z=I>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${M>0?`パ${M}`:""}${O>0?`社${O}`:""}</span>`:"";m.push(`
      <div data-action="cal-toggle-day" data-date="${D}"
        style="min-height:72px;padding:3px;border:${U?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${W};cursor:pointer;display:flex;flex-direction:column;
          ${U?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${Q};line-height:1;">${B}</span>
          ${Z}
        </div>
        ${I>0?`
          ${q&&q.items.length>0?`<div style="margin-top:2px;overflow:hidden;flex:1;">${q.items.slice(0,3).map(ee=>`<div style="font-size:7px;line-height:1.2;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${ee.productName.slice(0,6)} ${ee.qty}</div>`).join("")}${q.items.length>3?`<div style="font-size:7px;color:var(--text-disabled);">+${q.items.length-3}品</div>`:""}</div>`:""}
          <div style="font-size:10px;font-weight:600;color:var(--text);line-height:1;">${j>0?ce(j):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:1px;">
            <div style="height:100%;width:${Math.min(V*100,100)}%;background:${H};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const w=m.length%7;if(w>0)for(let D=0;D<7-w;D++)m.push('<div style="min-height:44px;"></div>');const b=s?y.get(s):null;s&&n.find(D=>D.date===s);const x=s&&b?(()=>{const D=b,q=parseInt(s.split("-")[2]),R=Vs(s),B=Math.round(D.utilization*100),M=n.find(K=>K.date===s),O=s===new Date().toISOString().slice(0,10),I={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},j={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},V=D.items.map(K=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${I[K.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${K.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${j[K.productionType]??K.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${ce(K.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),U=`パ${D.partTimers}×${i.partCapacity} 社${D.employees}×${i.empCapacity} = ${ce(D.capacity)}本`,W=D.totalQty>0?Math.ceil(D.totalQty/i.partCapacity):0,H=[];if(D.totalQty>0)for(let K=0;K<=W;K++){const J=D.totalQty-K*i.partCapacity;if(J<=0){H.push({p:K,e:0});break}const X=Math.ceil(J/i.empCapacity);H.push({p:K,e:X})}const Q=D.totalQty-D.capacity,Z=D.totalQty===0?"":Q>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${ce(Q)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',ee=H.filter(K=>K.p+K.e>0).sort((K,J)=>K.p+K.e-(J.p+J.e)).slice(0,3),ne=D.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${ce(D.totalQty)}本を収めるには ${Z}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${ee.map((K,J)=>{const X=K.p===D.partTimers&&K.e===D.employees;return`<button data-action="cal-apply-pattern" data-date="${s}" data-part="${K.p}" data-emp="${K.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${X?"#2f855a":"var(--border)"};
                border-radius:4px;background:${X?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${X?"font-weight:600;":""}">
              パ${K.p}社${K.e}＝${K.p+K.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${ce(K.p*i.partCapacity+K.e*i.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${O?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${O?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${O?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${q}日（${R}）${O?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${U} ・ 稼働率${B}%</div>
          ${D.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${ce(D.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${D.items.length}品</span></div>`:""}
        </div>
        ${ne}
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${M?.partTimers??0}"
              data-action="cal-shift-part" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${M?.employees??0}"
              data-action="cal-shift-emp" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${D.items.length>0?`
          <div style="padding:0 4px;">
            ${V}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${ce(D.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():s?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(s.split("-")[2])}日（${Vs(s)}）— 休日</p>
        <div style="display:flex;gap:12px;justify-content:center;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="0"
              data-action="cal-shift-part" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="0"
              data-action="cal-shift-emp" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
      </div>
    </section>
  `:"",P=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(D=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${D.color};"></span>${D.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${l}</select>
      </label>
      <button class="button secondary" type="button" data-action="cal-reset-shifts"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">平日リセット</button>
      <button class="button primary" type="button" data-action="cal-confirm-all"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">月一括確定</button>
    </div>

    <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;">
      <label style="font-size:11px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
        パート日産
        <input type="number" min="50" max="2000" step="50" value="${i.partCapacity}"
          data-action="cal-cap-part"
          style="width:60px;height:26px;font-size:12px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />本
      </label>
      <label style="font-size:11px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
        社員日産
        <input type="number" min="50" max="2000" step="50" value="${i.empCapacity}"
          data-action="cal-cap-emp"
          style="width:60px;height:26px;font-size:12px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />本
      </label>
    </div>

    <div style="background:var(--surface-alt);border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;line-height:1.8;">
      <div><strong>${ce(Math.round(h))}</strong>本 ÷ <strong>${S}</strong>稼働日 = 日当たり<strong>${ce(E)}</strong>本</div>
      <div>→ パ<strong>${k}</strong> 社<strong>${L}</strong>人日 ・ キャパ<strong>${ce(C)}</strong>本
        ${_<h?` <span style="color:#c53d3d;">（${ce(Math.round(h-_))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${P}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((D,q)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${q===0?"#c53d3d":q===6?"#0F5B8D":"var(--text-secondary)"};">${D}</div>`).join("")}
        ${m.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">クリック→詳細 ／ ダブルクリック→稼働ON/OFF</p>
    </section>

    ${x}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${r.size>0?`（<strong>${r.size}</strong>品除外中 = ${ce(Math.round($))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const D=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],q=new Map;for(const R of e){if((R.plannedQty>0?R.plannedQty:Math.max(0,R.demandForecast+R.safetyStockTarget-R.openingStock))<=0)continue;const M=R.productionType||"monthly";q.has(M)||q.set(M,[]),q.get(M).push(R)}return D.filter(R=>q.has(R.key)).map(R=>{const B=q.get(R.key),M=B.reduce((U,W)=>U+(W.plannedQty>0?W.plannedQty:Math.max(0,W.demandForecast+W.safetyStockTarget-W.openingStock)),0),O=B.filter(U=>r.has(U.productCode)).length,I=O===B.length,j=O===0,V=B.map(U=>{const W=U.plannedQty>0?U.plannedQty:Math.max(0,U.demandForecast+U.safetyStockTarget-U.openingStock),H=r.has(U.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${H?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${U.productCode}"
                    ${H?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${H?"text-decoration:line-through;":""}">${U.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${ce(Math.round(W))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${R.key}"
                    ${I?"":"checked"} ${!j&&!I?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${R.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${R.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${B.length}品 ${ce(Math.round(M))}本</span></div>
                  ${O>0&&!I?`<span style="font-size:11px;color:#b7791f;">${O}品除外</span>`:""}
                  ${I?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${V}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function Zu(e,t,n,s,r,i,c="all",d=null,u=[],y=null,h=new Set,g={partCapacity:gt,empCapacity:vt}){const _=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(C=>`<button class="tab-button ${s===C.key?"active":""}"
       data-demand-tab="${C.key}">${C.label}</button>`).join("");let S="";if(s==="demand")S=e?Hu(e,i):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(s==="safety")S=Ku(t,d);else if(s==="plan")S=Wu(n,r,c,d,u,g);else if(s==="calendar")try{S=Xu(n,r,u,y,h,g)}catch(C){console.error("[renderCalendarTab] error:",C),S=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(C)}
${C?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${_}
    </div>

    ${S}
  `}const nt={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Je=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function ue(e){return e.toLocaleString("ja-JP")}function xe(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function as(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function em(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function ns(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function tm(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(k=>k.month))].sort(),n=Je.filter(k=>e.some(L=>L.brewCategory===k)),s={};for(const k of e)s[k.month]||(s[k.month]={}),s[k.month][k.brewCategory]=k.shipmentMl;const r=820,i=300,c={top:20,right:20,bottom:50,left:70},d=r-c.left-c.right,u=i-c.top-c.bottom,y=t.map(k=>n.reduce((L,E)=>L+(s[k]?.[E]??0),0)),h=Math.max(...y,1),g=d/t.length,$=Math.max(g-8,14),_=[0,.25,.5,.75,1].map(k=>{const L=c.top+u-u*k,E=h*k/1e3;return`
      <line x1="${c.left}" y1="${L}" x2="${r-c.right}" y2="${L}" class="chart-grid" />
      <text x="6" y="${L+4}" class="chart-axis">${Math.round(E).toLocaleString("ja-JP")}L</text>
    `}).join(""),S=t.map((k,L)=>{let E=c.top+u;const o=c.left+L*g+(g-$)/2,l=n.map(x=>{const P=s[k]?.[x]??0,D=P/h*u;return E-=D,D>0?`<rect x="${o}" y="${E}" width="${$}" height="${D}" fill="${nt[x]??"#9ca3af"}" opacity="0.85" rx="1"><title>${x}: ${xe(P)}L</title></rect>`:""}).join(""),[p,m]=k.split("-"),f=parseInt(m),w=f===10||L%2===0,b=f===10?`${p}年度`:`${f}月`;return`<g>${l}${w?`<text x="${o+$/2}" y="${i-12}" class="chart-axis centered-axis" style="font-size:10px;">${b}</text>`:""}</g>`}).join(""),C=n.map(k=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${nt[k]??"#9ca3af"};"></span>
       ${k}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${i}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${_}${S}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${C}</div>
  `}function am(e,t,n,s){const r=new Map;for(const d of e){const u=d.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=r.get(u);y.rows.push(d),y.totalMl+=d.totalShipmentMl,y.avgMl+=d.monthlyAvgMl,y.stockL=d.currentStockL}const i=new Map;for(const d of t)i.has(d.brewCategory)||i.set(d.brewCategory,[]),i.get(d.brewCategory).push(d);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Je.filter(d=>r.has(d)).map(d=>{const u=r.get(d),y=nt[d]??"#9ca3af",h=ns(d);i.get(d);const g=n[d]??{rawAlcoholPct:18,targetAlcoholPct:15},$=g.targetAlcoholPct>0?g.rawAlcoholPct/g.targetAlcoholPct:1;u.stockL*1e3;const _=u.totalMl,S=u.avgMl,C=_/1e3,k=Math.round(u.stockL*$*10)/10,L=k*1e3,E=S>0?Math.round(L/S*10)/10:0,o=k-C,l=S>0?Math.round(S*2/1e3*10)/10:0,p=k<l,m=as(E),f=em(E),w=Math.min(E/12*100,100),b=o>=0?"#22c55e":"#ef4444",x=o>=0?`+${ue(Math.round(o))}L 余裕`:`${ue(Math.round(o))}L 不足`,P=$>1.001;return`
        <div class="card" style="border-top:3px solid ${y};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${y};">${d}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${m}20;color:${m};font-weight:600;">${f}</span>
              <button class="btn-edit-stock" data-cat-id="${h}" data-cat="${d}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${h}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${ue(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${ue(Math.round(C))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${xe(S)}L</strong></div>
            </div>
            ${P?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${ue(k)}L</div>
                <div style="color:#6b7280;">${g.rawAlcoholPct}% → ${g.targetAlcoholPct}%（×${$.toFixed(2)}）・残<strong>${E.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const D=s.filter(q=>q.parentCategory===d);return D.length===0?"":D.map(q=>{const B=t.filter(M=>M.brewCategory===q.name).reduce((M,O)=>M+O.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${q.name}</span>
                  ${B>0?`<span style="margin-left:4px;">${ue(B)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${h}" style="display:none;margin-bottom:8px;">
            ${(()=>{const D=s.filter(M=>M.parentCategory===d),q=[{name:d,label:d},...D.map(M=>({name:M.name,label:M.name}))],R=q.flatMap(M=>t.filter(I=>I.brewCategory===M.name).map(I=>({...I,catLabel:M.label}))),B=q.map(M=>`<option value="${M.name}">${M.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${R.map(M=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${M.label||"タンク"}</span>
                      <strong style="font-size:13px;">${ue(M.volumeL)}L</strong>
                      ${q.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${M.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${q.map(O=>`<option value="${O.name}" ${O.name===M.brewCategory?"selected":""}>${O.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${M.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${M.id}" data-cat="${M.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${q.length>1?`<select id="new-entry-target-${h}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${B}</select>`:""}
                  <input id="new-entry-label-${h}" type="text" placeholder="タンク名"
                    style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <input id="new-entry-vol-${h}" type="number" min="0" step="1" placeholder="L"
                    style="width:60px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <button data-action="brew-add-entry" data-cat="${d}" data-cat-id="${h}"
                    style="font-size:11px;padding:4px 10px;border:none;border-radius:4px;background:#0F5B8D;color:#fff;cursor:pointer;white-space:nowrap;">追加</button>
                </div>
              `})()}
            <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:8px;">
              <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">アルコール度数（加水計算用）</div>
              <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  原酒
                  <input id="alc-raw-${h}" type="number" min="1" max="30" step="0.1" value="${g.rawAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <span style="color:#6b7280;">→</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  出荷
                  <input id="alc-target-${h}" type="number" min="1" max="30" step="0.1" value="${g.targetAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <button data-action="brew-alc-save" data-cat="${d}"
                  style="font-size:10px;padding:3px 8px;border:none;border-radius:4px;background:#2563eb;color:#fff;cursor:pointer;">保存</button>
              </div>
            </div>
            <div style="margin-top:6px;">
              <button class="btn-cancel-stock" data-cat-id="${h}"
                style="font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">閉じる</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;flex-wrap:wrap;">
            <span style="color:${b};font-weight:600;">年間比 ${x}</span>
            <span style="color:${p?"#ef4444":"#6b7280"};">安全在庫${ue(l)}L${p?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${P?"（加水後）":""}</span>
            <span style="font-weight:600;color:${m};">${E.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${m};height:100%;width:${w}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function nm(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
    <tr>
      <th style="text-align:left;min-width:120px;">区分</th>
      <th style="text-align:left;min-width:140px;">サブ区分</th>
      <th style="text-align:right;">商品数</th>
      <th style="text-align:right;">年間出荷(本)</th>
      <th style="text-align:right;">年間移出(L)</th>
      <th style="text-align:right;">月平均(本)</th>
      <th style="text-align:right;">月平均(L)</th>
      <th style="text-align:right;">現在庫(L)</th>
      <th style="text-align:right;">残月数</th>
    </tr>
  `,s=[];for(const r of Je){const i=t.get(r);if(!i)continue;const c=nt[r]??"#9ca3af",d=i.length>1,u=i.reduce((k,L)=>k+L.totalShipmentQty,0),y=i.reduce((k,L)=>k+L.totalShipmentMl,0),h=i.reduce((k,L)=>k+L.monthlyAvgQty,0),g=i.reduce((k,L)=>k+L.monthlyAvgMl,0),$=i.reduce((k,L)=>k+L.productCount,0),_=i[0].currentStockL,S=g>0?Math.round(_*1e3/g*10)/10:0,C=as(S);if(s.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${d?"pointer":"default"};" ${d?`data-toggle-cat="${r}"`:""}>
        <td style="color:${c};">
          ${d?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${$}</td>
        <td style="text-align:right;">${ue(u)}</td>
        <td style="text-align:right;">${xe(y)}</td>
        <td style="text-align:right;">${ue(h)}</td>
        <td style="text-align:right;">${xe(g)}</td>
        <td style="text-align:right;">${ue(_)}</td>
        <td style="text-align:right;color:${C};font-weight:700;">${S.toFixed(1)}</td>
      </tr>
    `),d)for(const k of i)s.push(`
          <tr class="sub-row-${ns(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${k.subCategory}</td>
            <td style="text-align:right;">${k.productCount}</td>
            <td style="text-align:right;">${ue(k.totalShipmentQty)}</td>
            <td style="text-align:right;">${xe(k.totalShipmentMl)}</td>
            <td style="text-align:right;">${ue(k.monthlyAvgQty)}</td>
            <td style="text-align:right;">${xe(k.monthlyAvgMl)}</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
          </tr>
        `)}return`
    <div class="table-wrap">
      <table class="data-table">
        <thead>${n}</thead>
        <tbody>${s.join("")}</tbody>
      </table>
    </div>
  `}function sm(e,t,n,s,r,i={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const d={},u=new Date,y=u.getMonth()+1,h=y>=10?u.getFullYear():u.getFullYear()-1,g=h+1,$=new Map;for(const x of e)$.has(x.brewCategory)||$.set(x.brewCategory,new Map),$.get(x.brewCategory).set(x.fy,{shipL:x.shipmentL,annualL:x.annualizedL});const _=new Map;for(const x of r)_.has(x.brewCategory)||_.set(x.brewCategory,new Map),_.get(x.brewCategory).set(x.monthNum,x.avgMonthlyL);const S=[...new Set(e.map(x=>x.fy))].sort(),C=[...$.keys()].sort((x,P)=>{const D=[...Je,...s.map(q=>q.name)];return(D.indexOf(x)===-1?99:D.indexOf(x))-(D.indexOf(P)===-1?99:D.indexOf(P))}),k=[];for(let x=y;x<=9;x++)k.push(x);if(y>=10)for(let x=1;x<=9;x++)k.push(x);const L=S.filter(x=>x<h),E=S.includes(h),o=C.map(x=>{const P=$.get(x);S.filter(de=>P.has(de));const D=nt[x]??"#6366f1",q=_.get(x)??new Map,R=L.filter(de=>P.has(de)).map(de=>P.get(de).shipL);let B=0;if(R.length>=2){let de=0,we=0;for(let Ne=1;Ne<R.length;Ne++)if(R[Ne-1]>0){const bt=(R[Ne]-R[Ne-1])/R[Ne-1],st=Ne;de+=bt*st,we+=st}B=we>0?de/we:0}const M=P.get(h)?.annualL??0,O=R.length>0?R[R.length-1]:0,I=M>0&&O>0?Math.round(O*.4+M*.6):O||M,j=k.reduce((de,we)=>de+(q.get(we)??0),0),V=t.filter(de=>de.brewCategory===x).reduce((de,we)=>de+we.volumeL,0),U=n[x],W=U&&U.targetAlcoholPct>0?U.rawAlcoholPct/U.targetAlcoholPct:1,H=Math.round(V*W),Q=Math.max(0,H-Math.round(j)),Z=x in i,ee=Z?i[x]:B,ne=Math.round(ee*100),K=Math.round(I*(1+ee)),J=Math.max(0,K-Q);d[x]=J;const X=ne>0?"#22c55e":ne<0?"#ef4444":"#6b7280",se=Math.round(B*100),ge=P.get(h)?.annualL??0;return`
      <tr>
        <td style="color:${D};font-weight:600;white-space:nowrap;">${x}</td>
        ${L.map(de=>`<td style="text-align:right;">${P.has(de)?ue(Math.round(P.get(de).shipL)):"—"}</td>`).join("")}
        ${E?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${ue(Math.round(ge))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${ne}"
            data-action="brew-growth-edit" data-cat="${x}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${Z?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${X};font-weight:600;${Z?"background:rgba(37,99,235,0.06);":""}"
            title="${Z?`手動設定（自動: ${R.length>=2?se+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${ue(H)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${ue(Math.round(j))}</td>
        <td style="text-align:right;font-weight:600;">${ue(Q)}</td>
        <td style="text-align:right;">${ue(K)}</td>
        <td style="text-align:right;color:${J>0?"#ef4444":"#22c55e"};font-weight:700;">${J>0?ue(J):"余裕"}</td>
      </tr>
    `}).join("");let l=0,p=0,m=0,f=0,w=0;for(const x of C){const P=$.get(x),D=_.get(x)??new Map,q=L.filter(ee=>P.has(ee)).map(ee=>P.get(ee).shipL);let R=0;if(q.length>=2){let ee=0,ne=0;for(let K=1;K<q.length;K++)if(q[K-1]>0){const J=(q[K]-q[K-1])/q[K-1];ee+=J*K,ne+=K}R=ne>0?ee/ne:0}const B=P.get(h)?.annualL??0,M=q.length>0?q[q.length-1]:0,O=B>0&&M>0?Math.round(M*.4+B*.6):M||B,I=t.filter(ee=>ee.brewCategory===x).reduce((ee,ne)=>ee+ne.volumeL,0),j=n[x],V=j&&j.targetAlcoholPct>0?j.rawAlcoholPct/j.targetAlcoholPct:1,U=Math.round(I*V),W=k.reduce((ee,ne)=>ee+(D.get(ne)??0),0),H=Math.max(0,U-Math.round(W)),Q=x in i?i[x]:R,Z=Math.round(O*(1+Q));l+=U,p+=Math.round(W),m+=H,f+=Z,w+=Math.max(0,Z-H)}const b=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:d,html:`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 4px 0;">${g}年度 必要醸造量（${g}/10〜${g+1}/9）</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 12px;">
        増減率は完了年度（12ヶ月分）のみで算出。当年度(*)は年換算参考値。
      </p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>区分</th>
              ${L.map(x=>`<th style="text-align:right;">${x}(L)</th>`).join("")}
              ${E?`<th style="text-align:right;">${h}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${b}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${g}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${L.map(()=>"<td></td>").join("")}
              ${E?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${ue(l)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${ue(p)}</td>
              <td style="text-align:right;">${ue(m)}</td>
              <td style="text-align:right;">${ue(f)}</td>
              <td style="text-align:right;color:#ef4444;">${ue(w)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function om(e,t,n,s,r){if(e.length===0)return"";const i=new Date,c=i.getMonth()+1,d=i.getFullYear(),u=[];let y=c,h=d;for(let L=0;L<4;L++){const E=[];for(let p=0;p<3;p++)E.push({y:h,m:y}),y++,y>12&&(y=1,h++);const o=`${E[0].y}/${E[0].m}`,l=`${E[2].y}/${E[2].m}`;u.push({label:`${o}-${l}`,months:E})}const g=new Map;for(const L of n)g.has(L.brewCategory)||g.set(L.brewCategory,new Map),g.get(L.brewCategory).set(L.monthNum,L.avgMonthlyL);const $=new Map;for(const L of e)$.has(L.brewCategory)||$.set(L.brewCategory,L.currentStockL);for(const L of r){const E=t.filter(o=>o.brewCategory===L.name).reduce((o,l)=>o+l.volumeL,0);E>0&&$.set(L.name,E)}const _=new Map;for(const L of r)_.has(L.parentCategory)||_.set(L.parentCategory,[]),_.get(L.parentCategory).push(L);const S=[];for(const L of Je){($.has(L)||(g.get(L)?.size??0)>0)&&S.push({cat:L,isChild:!1});for(const E of _.get(L)??[])($.has(E.name)||(g.get(E.name)?.size??0)>0)&&S.push({cat:E.name,isChild:!0})}function C(L,E){const o=s[L],l=o&&o.targetAlcoholPct>0?o.rawAlcoholPct/o.targetAlcoholPct:1;let p=($.get(L)??0)*l;const m=g.get(L)??new Map,f=nt[L]??(E?"#6366f1":"#9ca3af");let w="";const b=[];for(const x of u){const P=x.months.reduce((B,{m:M})=>B+(m.get(M)??0),0),D=p;p=Math.max(0,p-P),D>0&&p<=0&&!w&&(w=x.label);const R=p<=0?"#ef4444":p<P?"#eab308":"#22c55e";b.push(`<td style="text-align:right;padding:4px 6px;color:${R};font-weight:${p<=0?"700":"400"};">${p>0?ue(Math.round(p)):"枯渇"}</td>`)}return`
      <tr style="${E?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${f};font-weight:${E?"500":"600"};padding:4px 6px;white-space:nowrap;${E?"padding-left:20px;font-size:11px;":""}">${E?"┗ ":""}${L}</td>
        <td style="text-align:right;padding:4px 6px;">${ue(Math.round(($.get(L)??0)*l))}</td>
        ${b.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${w?"#ef4444":"#22c55e"};font-weight:600;">
          ${w?`⚠ ${w}`:"12ヶ月+"}
        </td>
      </tr>
    `}const k=S.map(({cat:L,isChild:E})=>C(L,E)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(L=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${L.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${k}</tbody>
        </table>
      </div>
    </div>
  `}function rm(e,t,n){const s=new Map;for(const c of e){s.has(c.brewCategory)||s.set(c.brewCategory,{avgMl:0,totalMl:0,stockL:c.currentStockL});const d=s.get(c.brewCategory);d.avgMl+=c.monthlyAvgMl,d.totalMl+=c.totalShipmentMl}for(const c of n){const d=t.filter(u=>u.brewCategory===c.name).reduce((u,y)=>u+y.volumeL,0);(d>0||s.has(c.name))&&(s.has(c.name)?s.get(c.name).stockL=d:(s.get(c.parentCategory),s.set(c.name,{avgMl:0,totalMl:0,stockL:d})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Je,...n.map(c=>c.name)].filter(c=>s.has(c)&&(s.get(c).stockL>0||s.get(c).totalMl>0)).map(c=>{const d=s.get(c),u=d.avgMl>0?Math.round(d.stockL*1e3/d.avgMl*10)/10:0,y=d.totalMl/1e3,h=y>0?Math.round(d.stockL/y*100):0,g=n.some(k=>k.name===c),$=nt[c]??(g?"#6366f1":"#9ca3af"),_=d.avgMl>0?as(u):d.stockL>0?"#22c55e":"#9ca3af",S=d.avgMl>0?Math.min(u/12*100,100):d.stockL>0?100:0,C=d.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${h}%`:`${ue(d.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${$};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c}">${g?"┗ ":""}${c}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${_};height:100%;width:${S}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${C}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${d.stockL>0?"var(--text)":"#ef4444"};">${ue(d.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function im(e,t,n,s,r){if(e.length===0)return"";const i=n.map(g=>g.name);[...Je,...i];const c=new Map;for(const g of n)c.has(g.parentCategory)||c.set(g.parentCategory,[]),c.get(g.parentCategory).push(g);const d=new Map;for(const g of e)d.has(g.brewCategory)||d.set(g.brewCategory,[]),d.get(g.brewCategory).push(g);for(const g of i)d.has(g)||d.set(g,[]);const u=new Set;for(const g of n)for(const $ of d.get(g.name)??[])u.add($.productCode);const y=new Map;for(const g of Je)y.set(g,d.get(g)??[]);const h=Je.filter(g=>d.has(g)).map(g=>{const $=d.get(g)??[],_=nt[g]??"#9ca3af",S=c.get(g)??[],C=S.length>0,k=$.reduce((b,x)=>b+x.annualMl,0),L=$.reduce((b,x)=>b+x.monthlyAvgMl,0),E=$.filter(b=>!u.has(b.productCode)),o=E.filter(b=>!t.has(b.productCode)),l=o.reduce((b,x)=>b+x.annualMl,0),p=o.reduce((b,x)=>b+x.monthlyAvgMl,0),m=E.filter(b=>t.has(b.productCode)),f=E.map(b=>{const x=t.has(b.productCode);return`
          <tr style="${x?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${C?`<input type="checkbox" ${x?"":"checked"} data-action="brew-move-to-child" data-code="${b.productCode}" data-parent="${g}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${x?"color:#b7791f;":""}" title="${b.productName}">
              ${b.productName}${x?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${b.subCategory}</td>
            <td style="text-align:right;">${xe(b.annualMl)}</td>
            <td style="text-align:right;">${xe(b.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),w=S.map(b=>{const x=d.get(b.name)??[],P=x.reduce((I,j)=>I+j.annualMl,0),D=x.reduce((I,j)=>I+j.monthlyAvgMl,0),q=r.filter(I=>I.brewCategory===b.name),R=q.reduce((I,j)=>I+j.volumeL,0),B=ns(b.name),M=x.map(I=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${I.productCode}" data-cat="${b.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${I.productName}"><strong>${I.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${I.subCategory}</td>
            <td style="text-align:right;">${xe(I.annualMl)}</td>
            <td style="text-align:right;">${xe(I.monthlyAvgMl)}</td>
          </tr>
        `).join(""),O=m.filter(I=>!x.some(j=>j.productCode===I.productCode)).map(I=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${I.productCode}" data-cat="${b.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${I.productName}">${I.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${I.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${xe(I.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${xe(I.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${b.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${x.length}品 ・ ${xe(P)}L/年${R>0?` ・ 在庫${ue(R)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${B}" data-cat="${b.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${b.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${B}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${q.map(I=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${I.label||"タンク"}</span>
                    <strong style="font-size:11px;">${ue(I.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${I.id}" data-cat="${b.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${B}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${B}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${b.name}" data-cat-id="${B}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${B}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${M.length>0||O.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${M}
                    ${O}
                  </tbody>
                  ${x.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${xe(P)}</td><td style="text-align:right;">${xe(D)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${_};"></span>
            <h4 style="margin:0;font-size:14px;">${g}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${$.length}銘柄 ・ 年間${xe(k)}L
              ${C?`（内 ${S.map(b=>`${b.name}:${(d.get(b.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${C?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${f}
                ${w}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${xe(k)}</td><td style="text-align:right;">${xe(L)}</td></tr>
                ${C?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${xe(l)}</td><td style="text-align:right;">${xe(p)}</td></tr>`:""}
                ${m.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${m.length}品</td>
                  <td style="text-align:right;">${xe(m.reduce((b,x)=>b+x.annualMl,0))}</td>
                  <td style="text-align:right;">${xe(m.reduce((b,x)=>b+x.monthlyAvgMl,0))}</td></tr>`:""}
              </tfoot>
            </table>
          </div>
        </div>
      `}).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div>
          <h3 style="font-size:14px;margin:0;">製成種別 × 銘柄明細</h3>
          <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">子区分でチェックを入れると確定（親から自動で外れます）</p>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <select id="brew-new-category-parent" style="font-size:12px;padding:4px;border:1px solid var(--border);border-radius:4px;">
            <option value="">親区分</option>
            ${Je.filter(g=>g!=="その他").map(g=>`<option value="${g}">${g}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${h}
    </div>
  `}function lm(e,t,n,s=[],r=new Set,i=[],c={},d=[],u={},y=[],h=[],g={},$={}){const _=new Date,S=_.getMonth()>=9?_.getFullYear():_.getFullYear()-1,C=Array.from({length:5},(L,E)=>{const o=S-E;return`<option value="${o}" ${o===n?"selected":""}>${o}年度 (${o}/10-${o+1}/9)</option>`}).join(""),k=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return k||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${C}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${tm(t)}
      </div>

      ${am(e,d,u,i)}

      ${sm(y,d,u,i,h,g).html}

      ${rm(e,d,i)}

      ${om(e,d,h,u,i)}

      ${im(s,r,i,c,d)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${nm(e)}
      </div>
    </section>
  `}const on={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},cm=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],zt=[10,11,12,1,2,3,4,5,6,7,8,9],Us=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],dt=[9,10,11,12,1,2,3,4,5],dm=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function le(e){return e.toLocaleString("ja-JP")}function pm(e,t,n,s=[],r=2026,i=[],c=[],d={}){const y=[...new Set([...Object.keys(e).filter(b=>e[b]>0),...s.filter(b=>b.plannedVolumeL>0).map(b=>b.brewCategory)])];if(y.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const h=[...cm,...n.map(b=>b.name)];y.sort((b,x)=>(h.indexOf(b)===-1?99:h.indexOf(b))-(h.indexOf(x)===-1?99:h.indexOf(x)));const g={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},$=new Map;for(const b of s)$.has(b.brewCategory)||$.set(b.brewCategory,[]),$.get(b.brewCategory).push(b);const _=(b,x,P,D,q)=>`<input type="number" step="${q}" value="${P}" data-action="brew-rice-edit" data-cat="${x}" data-field="${b}"
        style="width:${D};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,S=(b,x,P)=>`<select data-action="brew-rice-variety-select" data-cat="${x}" data-field="${b}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${i.map(D=>`<option value="${D.name}" ${D.name===P?"selected":""}>${D.name}${D.region?` (${D.region})`:""}</option>`).join("")}
      ${!i.some(D=>D.name===P)&&P?`<option value="${P}" selected>${P}</option>`:""}
    </select>`;let C=0,k=0,L=0,E=0;const o=zt.map(()=>0),l=new Map,p=y.map(b=>{const x=e[b]??0,P=t[b]??g,D=on[b]??"#6366f1",q=$.get(b)??[],R=b in d,B=q.reduce((X,se)=>X+se.plannedVolumeL,0),M=q.length>0,O=R?d[b]:M?B:x,I=P.alcoholAdditionRatio??0,j=O*(1-I),V=Math.round(j*P.ricePerLiterKg),U=Math.round(V*P.kojiRatio),W=V-U,H=Math.round(U/P.polishingRatio),Q=Math.round(W/P.polishingRatio),Z=H+Q,ee=Math.round(H*P.kojiPricePerKg),ne=Math.round(Q*P.kakePricePerKg);C+=H,k+=Q,L+=ee,E+=ne;for(const[X,se,ge,de]of[[P.kojiVariety,H,P.kojiPricePerKg,"麹米"],[P.kakeVariety,Q,P.kakePricePerKg,"掛米"]]){if(se<=0)continue;l.has(X)||l.set(X,{brownKg:0,pricePerKg:ge,cost:0,usage:[]});const we=l.get(X);we.brownKg+=se,we.cost+=Math.round(se*ge),we.pricePerKg=Math.round(we.cost/we.brownKg),we.usage.push({cat:b,type:de,kg:se})}const K=zt.map(()=>0);if(q.length>0)for(const X of q){const se=zt.indexOf(X.brewMonth);se>=0&&(K[se]+=X.plannedVolumeL)}else{const X=O/12;for(let se=0;se<12;se++)K[se]=X}const J=K.reduce((X,se)=>X+se,0)||1;for(let X=0;X<12;X++){const se=K[X]/J;o[X]+=Math.round(Z*se)}return`
      <div class="card" style="border-top:3px solid ${D};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${D};">${b}</h4>
          <div style="font-size:12px;">${O>0?`予算 <strong>¥${le(ee+ne)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(O)}"
              data-action="proc-edit-vol" data-cat="${b}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${R?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${R?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${I>0?`<span style="color:var(--text-secondary);">−${Math.round(I*100)}%→${le(Math.round(j))}L</span>`:""}
          ${x>0&&Math.abs(x-O)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${le(Math.round(x))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${D};margin-bottom:6px;">醸造スケジュール${q.length>0?` (${le(Math.round(q.reduce((X,se)=>X+se.plannedVolumeL,0)))}L / ${le(Math.round(O))}L)`:""}</div>
          ${q.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${q.map(X=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${D}15;border:1px solid ${D}30;">
                  <span style="font-size:11px;font-weight:600;color:${D};">${X.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(O)}" step="100" value="${Math.round(X.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${b}" data-month="${X.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${b}" data-month="${X.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          `:'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>'}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${b}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(X=>!q.some(se=>se.brewMonth===X)).map(X=>`<option value="${X}">${X}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(O)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${b}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${b}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${D};background:${D}10;color:${D};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${_("ricePerLiterKg",b,P.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${_("kojiRatio",b,P.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${_("polishingRatio",b,P.polishingRatio,"44px","0.01")}</label>
          ${I>0||b==="本醸造"||b==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${_("alcoholAdditionRatio",b,P.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${S("kojiVariety",b,P.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${_("kojiPricePerKg",b,P.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${le(H)}kg</strong> <span style="color:var(--text-secondary);">(${(H/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${le(ee)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${S("kakeVariety",b,P.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${_("kakePricePerKg",b,P.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${le(Q)}kg</strong> <span style="color:var(--text-secondary);">(${(Q/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${le(ne)}</div>
          </div>
        </div>
      </div>
    `}).join(""),m=C+k,f=L+E,w=Math.max(...o,1);return zt.map((b,x)=>{const P=o[x];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${P/w*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${P>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${Us[x]}</div>
        <div style="font-size:10px;font-weight:600;">${P>0?le(P):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${P>0?(P/60).toFixed(0)+"俵":""}</div>
      </div>
    `}).join(""),`
    <section class="page-head">
      <div>
        <p class="eyebrow">製造管理</p>
        <h1>原料米 調達計画 — ${r}年度</h1>
      </div>
    </section>

    <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:10px;background:var(--surface-alt);border-radius:8px;">
      <span style="font-size:12px;font-weight:600;">一括設定:</span>
      <label style="font-size:12px;display:flex;align-items:center;gap:4px;">
        白米/L <input id="rice-bulk-per-l" type="number" min="0.1" max="2" step="0.01" value="0.50"
          style="width:56px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />
      </label>
      <label style="font-size:12px;display:flex;align-items:center;gap:4px;">
        麹比率 <input id="rice-bulk-koji" type="number" min="0.05" max="0.5" step="0.01" value="0.30"
          style="width:56px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />
      </label>
      <button data-action="brew-rice-bulk-apply" class="button primary"
        style="font-size:12px;padding:4px 12px;">全区分に適用</button>
    </div>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>醸造タイムライン（9月〜5月）</h2><p class="panel-caption">バーをドラッグで移動・端をドラッグでリサイズ・タップ/ダブルクリックで量編集</p></div>
      <div id="gantt-timeline" style="overflow-x:auto;user-select:none;-webkit-user-select:none;touch-action:none;">
        <div style="display:grid;grid-template-columns:80px repeat(${dt.length},1fr);font-size:11px;min-width:500px;">
          <div style="padding:4px;font-weight:600;">区分</div>
          ${dm.map(b=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${b}</div>`).join("")}
        </div>
        ${(()=>{const b=[],x=dt.length,P=new Map;for(const R of c)R.deliveryMonth&&(P.has(R.varietyName)||P.set(R.varietyName,[]),P.get(R.varietyName).push(R.deliveryMonth));for(const[R,B]of P){const M=dt.map(O=>{const I=B.includes(O),j=c.filter(V=>V.varietyName===R&&V.deliveryMonth===O).reduce((V,U)=>V+U.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${I?"background:#dcfce7;":""}">
                ${I?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${j}俵</div>`:""}
              </div>`}).join("");b.push(`<div style="display:grid;grid-template-columns:80px repeat(${x},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${R}</div>${M}
            </div>`)}const D=34,q=2;for(const R of y){const B=$.get(R)??[],M=on[R]??"#6366f1",O=R in d,I=B.reduce((K,J)=>K+J.plannedVolumeL,0),j=B.length>0,V=O?d[R]:j?I:e[R]??0,U=[],W=[...B].sort((K,J)=>dt.indexOf(K.brewMonth)-dt.indexOf(J.brewMonth)),H=[];for(const K of W){const J=dt.indexOf(K.brewMonth);if(J<0)continue;const X=Math.min(K.durationMonths,x-J),se=J+X;let ge=0;for(;ge<H.length&&H[ge]>J;)ge++;ge>=H.length?H.push(se):H[ge]=se,U.push({s:K,startIdx:J,dur:X,lane:ge})}const Z=Math.max(H.length,1)*(D+q)+q,ee=dt.map(()=>`<div style="border-left:1px solid var(--border);height:${Z}px;"></div>`).join(""),ne=U.map(({s:K,startIdx:J,dur:X,lane:se})=>{const ge=(J/x*100).toFixed(2),de=(X/x*100).toFixed(2),we=q+se*(D+q);return`<div class="gantt-bar" data-cat="${R}" data-month="${K.brewMonth}" data-dur="${X}" data-vol="${Math.round(K.plannedVolumeL)}" data-max="${Math.round(V)}"
                style="position:absolute;left:${ge}%;width:${de}%;top:${we}px;height:${D}px;
                  background:${M}30;border:2px solid ${M};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${M};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${le(Math.round(K.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");b.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${M};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${R}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${x},1fr);">
                ${ee}
                <div class="gantt-bar-container" data-cat="${R}" data-max="${Math.round(V)}" data-cols="${x}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${ne}
                </div>
              </div>
            </div>`)}return b.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const b=y.map(P=>{const D=t[P]??g,q=$.get(P)??[],R=P in d,B=q.reduce((U,W)=>U+W.plannedVolumeL,0),M=q.length>0,O=R?d[P]:M?B:e[P]??0,I=O*(1-(D.alcoholAdditionRatio??0)),j=Math.round(I*D.ricePerLiterKg),V=Math.round(j/D.polishingRatio);return{cat:P,brewingL:O,brownKg:V,color:on[P]??"#6366f1"}}).filter(P=>P.brewingL>0||P.brownKg>0),x=Math.max(...b.map(P=>P.brownKg),1);return b.map(P=>{const D=Math.min(P.brownKg/x*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${P.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${P.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${P.color};opacity:0.7;height:100%;width:${D}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${le(P.brownKg)}kg (${Math.ceil(P.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${le(Math.round(P.brewingL))}L</span>
            </div>
          `}).join("")})()}
    </section>

    ${p}

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>品種別 仕入リスト</h2><p class="panel-caption">どの品種の米をどれくらい仕入れるか</p></div>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>品種</th>
              <th style="text-align:right;">玄米(kg)</th>
              <th style="text-align:right;">俵数</th>
              <th style="text-align:right;">平均単価</th>
              <th style="text-align:right;">金額</th>
              <th>用途内訳</th>
            </tr>
          </thead>
          <tbody>
            ${[...l.entries()].sort((b,x)=>x[1].brownKg-b[1].brownKg).map(([b,x])=>{const P=(x.brownKg/60).toFixed(1),D=x.usage.map(q=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${q.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${q.cat}/${q.type} ${le(q.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${b}</td>
                  <td style="text-align:right;font-weight:600;">${le(x.brownKg)}</td>
                  <td style="text-align:right;">${P}</td>
                  <td style="text-align:right;">¥${le(x.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${le(x.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${D}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${le(m)}</td>
              <td style="text-align:right;">${Math.ceil(m/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${le(f)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>集計</h2></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
        <div style="background:rgba(99,102,241,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#6366f1;font-weight:600;">麹米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${le(C)}kg</strong> <span style="color:var(--text-secondary);">(${(C/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${le(L)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${le(k)}kg</strong> <span style="color:var(--text-secondary);">(${(k/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${le(E)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${le(m)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(m/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${le(f)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(f/1e4).toFixed(0)}万)</span></div>
        </div>
      </div>
    </section>

    <section class="panel" style="margin-top:16px;">
      <div class="panel-header">
        <div>
          <h2>作付け予定 vs 必要量</h2>
          <p class="panel-caption">購入確定分（作付け）に対して、醸造計画でどれだけ消費するか</p>
        </div>
      </div>
      ${(()=>{const b=new Map;for(const[M,O]of l)b.set(M,O.brownKg);const x=new Map;for(const M of c){x.has(M.varietyName)||x.set(M.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const O=x.get(M.varietyName);O.bales+=M.committedBales,O.kg+=M.committedBales*60,O.cost+=M.committedBales*60*M.pricePerKg,M.supplier&&!O.suppliers.includes(M.supplier)&&O.suppliers.push(M.supplier)}const P=[...new Set([...b.keys(),...x.keys()])];let D=0,q=0;const R=P.map(M=>{const O=b.get(M)??0,I=x.get(M),j=I?.kg??0,V=j-O;D+=j,q+=O;const U=V>=0?"#22c55e":"#ef4444",W=V>=0?`+${le(Math.round(V))}kg余裕`:`${le(Math.round(V))}kg不足`,H=j>0?Math.min(O/j*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${M}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${le(Math.round(j))}kg (${I?.bales??0}俵)</span>
                  <span>必要 ${le(Math.round(O))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${H}%;background:${j>0?V>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${U};">${j>0?W:"未確保"}</span>
            </div>
          `}).join(""),B=D-q;return`
          <div style="margin-bottom:12px;">
            ${R||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${D>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${le(Math.round(D))}kg</strong> (${Math.ceil(D/60)}俵)</span>
              <span>必要合計: <strong>${le(Math.round(q))}kg</strong></span>
              <span style="color:${B>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${B>=0?`余裕 ${le(Math.round(B))}kg`:`不足 ${le(Math.round(-B))}kg`}
              </span>
            </div>
          `:""}
          <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap;">
            <select id="proc-commit-variety" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;">
              ${i.map(M=>`<option value="${M.name}">${M.name}</option>`).join("")}
            </select>
            <input id="proc-commit-bales" type="number" min="0" step="1" placeholder="俵数"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <input id="proc-commit-price" type="number" min="0" step="10" placeholder="円/kg"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <select id="proc-commit-month" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">
              <option value="">入荷月</option>
              ${zt.map((M,O)=>`<option value="${M}">${Us[O]}</option>`).join("")}
            </select>
            <input id="proc-commit-supplier" type="text" placeholder="仕入先"
              style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <button data-action="proc-add-commitment" class="button primary"
              style="font-size:12px;padding:4px 12px;">追加</button>
          </div>
        `})()}
    </section>

    <section class="panel" style="margin-top:16px;">
      <div class="panel-header"><h2>米品種マスタ</h2><p class="panel-caption">プルダウンに表示される品種の追加・削除</p></div>
      <div style="margin-bottom:8px;">
        ${i.map(b=>`
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${b.name}</strong>
            <span style="color:var(--text-secondary);">¥${le(b.defaultPricePerKg)}/kg</span>
            ${b.region?`<span style="color:var(--text-secondary);font-size:10px;">${b.region}</span>`:""}
            <button data-action="proc-delete-variety" data-id="${b.id}"
              style="border:none;background:none;cursor:pointer;color:#ef4444;font-size:12px;padding:0 2px;">×</button>
          </div>
        `).join("")}
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <input id="proc-variety-name" type="text" placeholder="品種名"
          style="font-size:12px;padding:6px 10px;border:1px solid var(--border);border-radius:4px;width:120px;" />
        <input id="proc-variety-price" type="number" step="10" placeholder="円/kg"
          style="font-size:12px;padding:6px 10px;border:1px solid var(--border);border-radius:4px;width:80px;text-align:right;" />
        <button data-action="proc-add-variety" class="button primary"
          style="font-size:12px;padding:6px 12px;">追加</button>
      </div>
    </section>

    <section class="panel" style="margin-top:16px;">
      <div class="panel-header"><h2>区分を追加</h2><p class="panel-caption">新しい銘柄・ブランドの醸造を追加</p></div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <input id="proc-new-cat-name" type="text" placeholder="区分名（例: 新ブランドA）"
          style="font-size:12px;padding:6px 10px;border:1px solid var(--border);border-radius:4px;width:180px;" />
        <input id="proc-new-cat-vol" type="number" min="0" step="100" placeholder="醸造予定(L)"
          style="font-size:12px;padding:6px 10px;border:1px solid var(--border);border-radius:4px;width:120px;text-align:right;" />
        <button data-action="proc-add-new-cat" class="button primary"
          style="font-size:12px;padding:6px 14px;">追加</button>
      </div>
    </section>
  `}const um={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},mm={planned:"計画中",active:"進行中",completed:"完了"},Nr={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},We=6;function ss(e){return e.toLocaleString("ja-JP")}function aa(e){return um[e]??"#6366f1"}function ya(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function ym(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Oe(e){return e?e.slice(5).replace("-","/"):"―"}function hm(e){if(e.length<=4)return e;const t=e.match(/[（(](.+?)[）)]/);return t?t[1].slice(0,3):e.includes("→")?e.split("→")[1]?.slice(0,3)??e.slice(0,3):e.slice(0,3)}function fm(e,t,n){const s=e.filter(L=>L.status!=="completed"&&L.startDate&&L.targetEndDate);if(s.length===0)return"";const r=s.flatMap(L=>[L.startDate,L.targetEndDate]),i=s.flatMap(L=>t[L.id]??[]);for(const L of i)L.plannedStart&&r.push(L.plannedStart),L.plannedEnd&&r.push(L.plannedEnd);r.sort();const c=r[0],d=r[r.length-1],u=Math.min(ya(c,d)+7,180),y=u*We,h=[];let g="";for(let L=0;L<u;L++){const E=ym(c,L),o=E.slice(0,7);o!==g&&(h.push(`<span style="position:absolute;left:${L*We}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(E.slice(5,7))}月</span>`),g=o)}const $=new Date().toISOString().slice(0,10),_=ya(c,$),S=_>=0&&_<u?`<div style="position:absolute;left:${_*We}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",C=30,k=s.map(L=>{const E=(t[L.id]??[]).sort((m,f)=>m.stepOrder-f.stepOrder),o=aa(L.brewCategory),l=n===L.id,p=E.map(m=>{const f=Math.max(ya(c,m.plannedStart),0),w=Math.min(ya(c,m.plannedEnd),u-1),b=f*We,x=Math.max((w-f+1)*We,We),P=Nr[m.status],D=m.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${m.id}" data-batch-id="${m.batchId}" data-step-order="${m.stepOrder}" data-planned-start="${m.plannedStart}" data-planned-end="${m.plannedEnd}" style="position:absolute;left:${b}px;top:4px;width:${x}px;height:22px;background:${P};border-radius:3px;font-size:7px;line-height:22px;color:${D};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${m.status==="未着手"?"#bbb":P};" title="${m.stepName} ${Oe(m.plannedStart)}〜${Oe(m.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${x>24?hm(m.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${l?"#3b82f6":"#f3f4f6"};min-height:${C}px;background:${l?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${L.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${o};font-weight:600;">${L.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${L.brewCategory}</span>
      </div>
      <div style="position:relative;width:${y}px;height:${C}px;background:repeating-linear-gradient(90deg,transparent 0 ${We*7-1}px,#f3f4f6 ${We*7-1}px ${We*7}px);">${p}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">仕込をクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${y+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${y}px;height:20px;">${h.join("")}</div>
        </div>
        <div style="position:relative;">${k}${S}</div>
      </div>
    </div>
  </section>`}function gm(e,t){const n=[...t].sort((C,k)=>C.stepOrder-k.stepOrder);if(n.length===0)return"";const s=120,r=50,i=40,c=20,d=5,u=Math.ceil(n.length/d),y=d*(s+i)-i+20,h=u*(r+c)-c+20,g=C=>{const k=Math.floor(C/d);return{x:10+(k%2===0?C%d:d-1-C%d)*(s+i),y:10+k*(r+c)}},$=n.map((C,k)=>{const L=g(k),E=Nr[C.status],o=C.status==="進行中"?"#1d4ed8":C.status==="完了"?"#15803d":"#9ca3af",l=C.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${L.x}" y="${L.y}" width="${s}" height="${r}" rx="6" fill="${E}" stroke="${o}" stroke-width="2"/>
      <text x="${L.x+s/2}" y="${L.y+20}" text-anchor="middle" fill="${l}" font-size="11" font-weight="600">${C.stepName}</text>
      <text x="${L.x+s/2}" y="${L.y+36}" text-anchor="middle" fill="${l}" font-size="9" opacity="0.8">${Oe(C.plannedStart)}〜${Oe(C.plannedEnd)}</text>
    </g>`}).join(""),_=n.slice(1).map((C,k)=>{const L=g(k),E=g(k+1),o=L.x+s/2,l=L.y+r/2,p=E.x+s/2,m=E.y+r/2;if(Math.floor(k/d)===Math.floor((k+1)/d)){const w=p>o?1:-1,b=L.x+(w>0?s:0),x=l,P=E.x+(w>0?0:s);return`<line x1="${b}" y1="${x}" x2="${P}" y2="${m}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const w=L.y+r,b=E.y;return`<line x1="${o}" y1="${w}" x2="${p}" y2="${b}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${aa(e.brewCategory)};">●</span> ${e.batchCode} 醸造工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${y}" height="${h}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${_}${$}
        </svg>
      </div>
    </section>
  </div>`}function vm(e,t,n,s=[]){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">仕込が未登録です。調達計画から取込むか、新規登録してください。</div>';const r=new Set(s),i=e.length>0&&e.every(y=>r.has(y.id)),c=s.length>0,d=e.map(y=>{const h=t[y.id]??[],g=h.length,$=h.filter(L=>L.status==="完了").length,_=g>0?Math.round($/g*100):0,S=aa(y.brewCategory),C=n===y.id,k=r.has(y.id);return`<tr style="border-bottom:1px solid #f3f4f6;background:${k?"#fef2f2":C?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${y.id}">
      <td style="padding:4px 6px;text-align:center;" onclick="event.stopPropagation()">
        <input type="checkbox" data-action="bp-batch-check" data-batch-id="${y.id}" ${k?"checked":""} style="cursor:pointer;width:14px;height:14px;">
      </td>
      <td style="padding:6px;font-size:12px;font-weight:600;color:${S};">${y.batchCode}</td>
      <td style="padding:6px;font-size:11px;"><span style="background:${S};color:#fff;padding:1px 6px;border-radius:9999px;font-size:10px;">${y.brewCategory}</span></td>
      <td style="padding:6px;font-size:11px;text-align:right;">
        <input type="number" min="0" step="100" value="${Math.round(y.plannedVolumeL)}" data-action="bp-batch-vol" data-batch-id="${y.id}" style="width:60px;font-size:11px;text-align:right;border:1px solid #e5e7eb;border-radius:3px;padding:2px 4px;" onclick="event.stopPropagation()">L
      </td>
      <td style="padding:6px;font-size:11px;">
        <input type="date" value="${y.startDate}" data-action="bp-batch-date" data-batch-id="${y.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
      </td>
      <td style="padding:6px;">
        <select data-action="bp-batch-status" data-batch-id="${y.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
          ${["planned","active","completed"].map(L=>`<option value="${L}"${y.status===L?" selected":""}>${mm[L]}</option>`).join("")}
        </select>
      </td>
      <td style="padding:6px;width:80px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
            <div style="width:${_}%;height:100%;background:${S};border-radius:3px;"></div>
          </div>
          <span style="font-size:9px;color:#6b7280;white-space:nowrap;">${_}%</span>
        </div>
      </td>
      <td style="padding:6px;text-align:center;">
        <button data-action="bp-show-delete-modal" data-batch-id="${y.id}" data-batch-code="${y.batchCode}" style="font-size:10px;padding:2px 8px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;" onclick="event.stopPropagation()">削除</button>
      </td>
    </tr>`}).join(""),u=c?`<button data-action="bp-bulk-delete" style="font-size:12px;padding:4px 14px;border:1px solid #ef4444;color:#ef4444;background:white;border-radius:5px;cursor:pointer;font-weight:600;">選択した ${s.length}件を削除</button>`:"";return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header">
      <div><h2>仕込一覧</h2><p class="panel-caption">${e.length}件 ／ 行クリックで醸造工程フロー表示</p></div>
      <div style="display:flex;gap:6px;align-items:center;">${u}</div>
    </div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:600px;">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left;">
          <th style="padding:4px 6px;text-align:center;"><input type="checkbox" data-action="bp-batch-check-all" ${i?"checked":""} style="cursor:pointer;width:14px;height:14px;" title="${i?"全解除":"全選択"}"></th>
          <th style="padding:4px 6px;">コード</th><th style="padding:4px 6px;">区分</th>
          <th style="padding:4px 6px;text-align:right;">醸造量</th><th style="padding:4px 6px;">開始日</th>
          <th style="padding:4px 6px;">状態</th><th style="padding:4px 6px;">進捗</th><th style="padding:4px 6px;text-align:center;">操作</th>
        </tr></thead>
        <tbody>${d}</tbody>
      </table>
    </div>
  </section>`}function bm(e,t){if(e.length===0)return"";const n=new Set(t.map(i=>`${i.brewCategory}:${i.startDate?.slice(0,7)}`)),s=e.filter(i=>{const c=i.brewMonth>=10?i.fy:i.fy+1,d=`${i.brewCategory}:${c}-${String(i.brewMonth).padStart(2,"0")}`;return!n.has(d)&&i.plannedVolumeL>0});return s.length===0?"":`<section class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括で仕込登録</p></div>
      <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括仕込登録</button>
    </div>
    <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
        <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
      </tr></thead><tbody>${s.map(i=>{const d=`${i.brewMonth>=10?i.fy:i.fy+1}-${String(i.brewMonth).padStart(2,"0")}-01`,u=`${i.brewCategory}-${i.fy}-${String(i.brewMonth).padStart(2,"0")}`;return`<tr>
      <td style="padding:5px 6px"><span style="color:${aa(i.brewCategory)};font-weight:600;font-size:11px;">${i.brewCategory}</span></td>
      <td style="padding:5px 6px;font-size:11px;">${u}</td>
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${ss(Math.round(i.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${i.brewMonth}月（${d}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${i.brewCategory}" data-month="${i.brewMonth}" data-vol="${Math.round(i.plannedVolumeL)}" data-date="${d}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function wm(e){return`<div class="panel" style="margin-bottom:16px">
    <div class="panel-header">新規仕込登録</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;padding:10px 0;font-size:12px;">
      <label>区分<br><select id="bp-new-cat" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;">
        ${e.map(t=>`<option value="${t}">${t}</option>`).join("")}
      </select></label>
      <label>仕込番号<br><input id="bp-new-code" type="text" placeholder="JG-2026-01" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;width:120px;"></label>
      <label>醸造量(L)<br><input id="bp-new-vol" type="number" placeholder="1800" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;width:80px;"></label>
      <label>開始日<br><input id="bp-new-date" type="date" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;"></label>
      <button class="button primary" data-action="bp-create-batch" style="font-size:12px;padding:6px 16px;">登録</button>
    </div>
  </div>`}function xm(e,t){const n=[...t].sort((i,c)=>i.stepOrder-c.stepOrder);if(n.length===0)return"";const s=n.map(i=>`<tr style="border-bottom:1px solid #f3f4f6">
    <td style="padding:4px 6px;font-size:11px;font-weight:${i.status==="進行中"?700:400}">${i.stepName}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${Oe(i.plannedStart)}〜${Oe(i.plannedEnd)}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${i.actualStart?Oe(i.actualStart):"―"}〜${i.actualEnd?Oe(i.actualEnd):"―"}</td>
    <td style="padding:4px 3px">
      <select data-action="bp-step-status" data-step-id="${i.id}" data-batch-id="${i.batchId}" style="font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px">
        ${["未着手","進行中","完了"].map(c=>`<option value="${c}"${i.status===c?" selected":""}>${c}</option>`).join("")}
      </select>
    </td>
    <td style="padding:4px 3px"><input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${i.id}" value="${i.temperature??""}" placeholder="℃" style="width:50px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
    <td style="padding:4px 3px"><input type="text" data-action="bp-step-notes" data-step-id="${i.id}" value="${i.notes}" placeholder="メモ" style="width:100px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${aa(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${ss(e.plannedVolumeL)}L ｜ ${Oe(e.startDate)}〜${Oe(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${s}</tbody>
      </table>
    </div>
  </section>`}function $m(e,t,n){const s=new Map;for(const i of t){if(!i.tankNo||i.status==="completed")continue;const c=n[i.id]??[],d=c.find(y=>y.stepName==="蒸米→添仕込"),u=c.find(y=>y.stepName==="上槽");d?.plannedStart&&u?.plannedEnd&&(s.has(i.tankNo)||s.set(i.tankNo,[]),s.get(i.tankNo).push({batchCode:i.batchCode,start:d.plannedStart,end:u.plannedEnd}))}const r=e.map(i=>{const c=s.get(i.tankNo)??[],d=c.length>0?c.map(u=>`<span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#dbeafe;color:#2563eb;">${u.batchCode}(${Oe(u.start)}〜${Oe(u.end)})</span>`).join(" "):'<span style="font-size:9px;color:#22c55e;">空き</span>';return`<tr style="border-bottom:1px solid #f3f4f6;">
      <td style="padding:4px 6px;font-size:12px;font-weight:600;">${i.tankNo}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${ss(i.capacityL)}L</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280;">${i.preferredCategories.length>0?i.preferredCategories.join(", "):"全区分"}</td>
      <td style="padding:4px 6px;">${d}</td>
      <td style="padding:4px 3px;"><button data-action="bp-tank-delete" data-tank-id="${i.id}" style="font-size:9px;padding:1px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
    </tr>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>タンク管理</h2><p class="panel-caption">タンクの登録と占有状況</p></div>
    ${e.length>0?`<div style="overflow-x:auto;margin-bottom:8px;">
      <table style="width:100%;border-collapse:collapse;"><thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left;">
        <th style="padding:3px 6px;">No.</th><th style="padding:3px 6px;text-align:right;">容量</th><th style="padding:3px 6px;">対応区分</th><th style="padding:3px 6px;">占有</th><th></th>
      </tr></thead><tbody>${r}</tbody></table>
    </div>`:""}
    <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:flex-end;font-size:11px;">
      <label>No.<input id="bp-tank-no" type="text" placeholder="1号" style="width:50px;padding:3px;border:1px solid #d1d5db;border-radius:3px;font-size:11px;"></label>
      <label>容量L<input id="bp-tank-cap" type="number" placeholder="3000" style="width:60px;padding:3px;border:1px solid #d1d5db;border-radius:3px;font-size:11px;"></label>
      <label>区分<input id="bp-tank-cats" type="text" placeholder="純米吟醸,純米（空=全て）" style="width:140px;padding:3px;border:1px solid #d1d5db;border-radius:3px;font-size:11px;"></label>
      <button data-action="bp-tank-add" class="button primary" style="font-size:11px;padding:4px 10px;">追加</button>
    </div>
  </section>`}function _m(e,t,n){if(e.length===0||n.length===0)return"";const s=new Map(n.map(y=>[y.stepName,y])),r=new Map;for(const y of e){if(!y.plannedStart||!y.plannedEnd)continue;const h=s.get(y.stepName);if(!h)continue;const g=new Date(y.plannedStart),$=new Date(y.plannedEnd),_=Math.max(Math.round(($.getTime()-g.getTime())/864e5)+1,1);let S=0;for(let k=0;k<_;k++)new Date(g.getTime()+k*864e5).getDay()!==0&&S++;if(S===0)continue;const C=h.laborHours/S;for(let k=new Date(g);k<=$;k=new Date(k.getTime()+864e5)){if(k.getDay()===0)continue;const L=new Date(k);L.setDate(L.getDate()+3-(L.getDay()+6)%7);const E=new Date(L.getFullYear(),0,4),o=1+Math.round(((L.getTime()-E.getTime())/864e5-3+(E.getDay()+6)%7)/7),l=`${L.getFullYear()}-W${String(o).padStart(2,"0")}`;r.set(l,(r.get(l)??0)+C)}}if(r.size===0)return"";const i=[...r.keys()].sort(),c=t.workerCount*t.weeklyHoursLimit,d=Math.max(...r.values(),c),u=i.map(y=>{const h=r.get(y)??0,g=Math.min(h/d*100,100),$=h>c,_=$?"#ef4444":h>c*.8?"#f59e0b":"#22c55e",S=y.replace(/^\d{4}-W/,"W");return`<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${g}%;background:${_};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(h)}h / ${c}h"></div>
      </div>
      <div style="font-size:8px;color:#9ca3af;margin-top:2px;">${S}</div>
      <div style="font-size:9px;font-weight:600;color:${$?"#ef4444":"#374151"};">${Math.round(h)}h</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header">
      <div><h2>週別労働時間</h2><p class="panel-caption">上限: ${t.workerCount}名 × ${t.weeklyHoursLimit}h = ${c}h/週（赤=超過）</p></div>
      <div style="display:flex;gap:6px;align-items:center;font-size:11px;">
        <label>人数 <input type="number" min="1" max="10" value="${t.workerCount}" data-action="bp-worker-count" style="width:40px;height:22px;font-size:11px;text-align:center;border:1px solid #d1d5db;border-radius:3px;"></label>
        <label>上限h <input type="number" min="20" max="60" value="${t.weeklyHoursLimit}" data-action="bp-worker-hours" style="width:44px;height:22px;font-size:11px;text-align:center;border:1px solid #d1d5db;border-radius:3px;"></label>
        <label>開始 <input type="number" min="4" max="10" step="0.5" value="${t.dayStartHour}" data-action="bp-worker-start" style="width:40px;height:22px;font-size:11px;text-align:center;border:1px solid #d1d5db;border-radius:3px;">時</label>
        <label>仕込締切 <input type="date" value="${t.deadlineDate||""}" data-action="bp-worker-deadline" style="height:22px;font-size:11px;border:1px solid #d1d5db;border-radius:3px;padding:0 3px;"></label>
        <label style="display:flex;align-items:center;gap:2px;"><input type="checkbox" data-action="bp-worker-sunday" ${t.allowSunday?"checked":""}>日曜可</label>
      </div>
    </div>
    <div style="display:flex;gap:2px;overflow-x:auto;padding:4px 0;">
      <div style="width:40px;flex-shrink:0;display:flex;align-items:flex-end;justify-content:flex-end;padding-bottom:18px;">
        <div style="border-top:2px dashed #ef4444;width:100%;position:relative;top:${-60*(c/d)+60}px;">
          <span style="font-size:7px;color:#ef4444;position:absolute;right:0;top:-10px;">${c}h</span>
        </div>
      </div>
      ${u}
    </div>
  </section>`}function Sm(e,t,n,s={}){const{expandedBatchId:r,showNewForm:i,schedule:c=[],fy:d=2026,workerSettings:u={workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},stepLabor:y=[],tanks:h=[],selectedBatchIds:g=[]}=s,$={};for(const o of t)($[o.batchId]??=[]).push(o);const _=e.filter(o=>o.status==="active").length,S=e.filter(o=>o.status==="planned").length,C=e.filter(o=>o.status==="completed").length,k=r?e.find(o=>o.id===r):null,L=k?gm(k,$[k.id]??[]):"",E=k?xm(k,$[k.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">製造管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規仕込</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">醸造中</p><p class="kpi-value">${_}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${S}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${C}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${fm(e,$,r)}
    ${_m(t,u,y)}
    ${$m(h,e,$)}
    ${i?wm(n):""}
    ${bm(c,e)}
    ${L}
    ${E}
    ${vm(e,$,r,g)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">仕込を削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> の仕込を削除します。<br>関連する全工程データも削除されます。この操作は取り消せません。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}const ha=4,fa=1,Ft=4e3,Qt=3e5,km=2,Js={soumu:"総",route_sales:"ル",brewing:"造",bottling:"詰",labeling:"貼",delivery:"配"};function ke(e){return e==null?"—":"¥"+Math.round(e).toLocaleString("ja-JP")}function Pm(e){return`${e}月`}const tt={soumu:"#3b82f6",route_sales:"#10b981",brewing:"#8b5cf6",bottling:"#f59e0b",labeling:"#ec4899",delivery:"#6b7280"},Rr={employee:"社員",part_time:"パート",contractor:"業務委託"},Wt={employee:"#10b981",part_time:"#f59e0b",contractor:"#6b7280"};function Em(e,t){const n=Object.keys(Ie),s=t?e.filter(_=>_.department===t):e,r=s.filter(_=>_.isActive),i=s.filter(_=>!_.isActive);function c(_){return`<span style="display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${tt[_]};">${Ie[_]}</span>`}function d(_){return _.crossDepartments.length?_.crossDepartments.map(S=>`<span style="display:inline-block;padding:0 5px;border-radius:8px;font-size:10px;border:1px solid ${tt[S]};color:${tt[S]};margin-left:3px;">${Ie[S]}</span>`).join(""):""}function u(_){if(_.employmentType==="employee")return`月給 ${ke(_.monthlySalary)}`;if(_.employmentType==="contractor")return`委託 ${ke(_.contractFee)}/日`;const S=_.shiftPreference?Xn[_.shiftPreference]:"";return`時給 ${ke(_.hourlyRate)}${S?`・${S}`:""}`}function y(_){return _.monthlyTasks.length?_.monthlyTasks.map(S=>`<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#7c3aed20;color:#7c3aed;border:1px solid #7c3aed40;margin-left:3px;">${Gn[S]}</span>`).join(""):""}function h(_){const S=_.availableMonths?_.availableMonths.map(Pm).join("・"):"通年",C=_.isDeptLeader?'<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#f59e0b20;color:#d97706;border:1px solid #f59e0b40;margin-left:4px;">部門長</span>':"";return`<tr class="${_.isActive?"":"row-inactive"}">
      <td>
        ${_.name}${C}${_.kana?`<br><span style="font-size:11px;color:var(--text-secondary);">${_.kana}</span>`:""}
        ${y(_)}
      </td>
      <td>${c(_.department)}${d(_)}</td>
      <td><span class="status-pill" style="background:${Wt[_.employmentType]}20;color:${Wt[_.employmentType]};border:1px solid ${Wt[_.employmentType]}40;">${Rr[_.employmentType]}</span></td>
      <td style="font-size:13px;">${u(_)}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${S}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${_.notes||""}</td>
      <td style="white-space:nowrap;">
        <button class="button secondary small" data-edit-staff="${_.id}">編集</button>
        <button class="button secondary small danger" data-delete-staff="${_.id}" data-staff-name="${_.name}" style="margin-left:4px;">削除</button>
      </td>
    </tr>`}const g=["",...n].map(_=>`<button class="button ${t===_?"primary":"secondary"} small" data-staff-dept-filter="${_}">${_?Ie[_]:"全部門"}</button>`).join(""),$=7;return`
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      <div style="display:flex;gap:4px;flex-wrap:wrap;">${g}</div>
      <button class="button primary small" data-action="staff-new" style="margin-left:auto;">＋ スタッフ追加</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>氏名</th><th>主部門 / 兼務</th><th>種別</th><th>賃金</th><th>稼働月</th><th>備考</th><th></th>
        </tr></thead>
        <tbody>
          ${r.map(h).join("")||`<tr><td colspan="${$}" class="empty-row">スタッフが登録されていません</td></tr>`}
          ${i.length>0?`
            <tr><td colspan="${$}" style="padding:4px 8px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);">── 休職・退職・終了 ──</td></tr>
            ${i.map(h).join("")}
          `:""}
        </tbody>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:6px;">
      枠付きバッジ = 兼務可能部門（越境）
    </p>
  `}function Hs(e){const t=!!e?.id,n=e?.availableMonths?e.availableMonths.join(","):"",s=Object.keys(Ie),r=s.map(c=>`<option value="${c}" ${e?.department===c?"selected":""}>${Ie[c]}</option>`).join(""),i=s.map(c=>`
    <label style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;font-size:13px;">
      <input type="checkbox" name="sf-cross" value="${c}" ${e?.crossDepartments?.includes(c)?"checked":""} />
      ${Ie[c]}
    </label>`).join("");return`
    <div class="modal-overlay" id="staff-modal">
      <div class="modal-content panel" style="max-width:540px;max-height:90vh;overflow-y:auto;">
        <h2>${t?"スタッフ編集":"スタッフ追加"}</h2>
        <form id="staff-form" class="feature-form">
          <input type="hidden" id="sf-id" value="${e?.id??""}" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">

            <div class="form-row" style="grid-column:1/-1;">
              <label>氏名 *</label>
              <input type="text" id="sf-name" value="${e?.name??""}" required />
            </div>
            <div class="form-row" style="grid-column:1/-1;">
              <label>カナ</label>
              <input type="text" id="sf-kana" value="${e?.kana??""}" />
            </div>

            <div class="form-row">
              <label>主部門</label>
              <select id="sf-dept">${r}</select>
            </div>
            <div class="form-row">
              <label>雇用形態</label>
              <select id="sf-emp-type">
                <option value="part_time"  ${e?.employmentType==="part_time"?"selected":""}>パート（呼び出し型）</option>
                <option value="employee"   ${e?.employmentType==="employee"?"selected":""}>社員</option>
                <option value="contractor" ${e?.employmentType==="contractor"?"selected":""}>業務委託</option>
              </select>
            </div>

            <!-- パート用 -->
            <div class="form-row" id="sf-hourly-row">
              <label>時給（円）</label>
              <input type="number" id="sf-hourly" value="${e?.hourlyRate??""}" min="0" />
            </div>
            <div class="form-row" id="sf-hours-row">
              <label>1回あたり勤務時間（h）</label>
              <input type="number" id="sf-hours" value="${e?.workHoursPerDay??8}" min="0.5" max="24" step="0.5" />
            </div>

            <!-- 社員用 -->
            <div class="form-row" id="sf-salary-row" style="grid-column:1/-1;">
              <label>月給（円）</label>
              <input type="number" id="sf-salary" value="${e?.monthlySalary??""}" min="0" />
            </div>

            <!-- 業務委託用 -->
            <div class="form-row" id="sf-contract-row" style="grid-column:1/-1;">
              <label>日額委託費（円/日）</label>
              <input type="number" id="sf-contract-fee" value="${e?.contractFee??""}" min="0" />
            </div>

            <!-- パート用：シフト区分 -->
            <div class="form-row" id="sf-shift-pref-row" style="grid-column:1/-1;">
              <label>シフト区分</label>
              <div style="display:flex;gap:12px;padding:4px 0;">
                ${["morning","afternoon","both"].map(c=>`
                  <label style="display:inline-flex;align-items:center;gap:4px;font-size:13px;">
                    <input type="radio" name="sf-shift-pref" value="${c}" ${(e?.shiftPreference??"both")===c?"checked":""} />
                    ${Xn[c]}
                  </label>`).join("")}
              </div>
            </div>

            <!-- 月次業務（全員対象） -->
            <div class="form-row" style="grid-column:1/-1;">
              <label>月次業務担当</label>
              <div style="display:flex;gap:14px;padding:4px 0;">
                ${["billing","inventory"].map(c=>`
                  <label style="display:inline-flex;align-items:center;gap:4px;font-size:13px;">
                    <input type="checkbox" name="sf-task" value="${c}" ${e?.monthlyTasks?.includes(c)?"checked":""} />
                    ${Gn[c]}
                  </label>`).join("")}
              </div>
            </div>

            <!-- 固定休み曜日 -->
            <div class="form-row" style="grid-column:1/-1;">
              <label>固定休み曜日</label>
              <div style="display:flex;gap:8px;padding:4px 0;flex-wrap:wrap;">
                ${[1,2,3,4,5,6].map(c=>{const d=["","月","火","水","木","金","土"];return`<label style="display:inline-flex;align-items:center;gap:3px;font-size:13px;">
                    <input type="checkbox" name="sf-day-off" value="${c}" ${e?.fixedDaysOff?.includes(c)?"checked":""} />
                    ${d[c]}
                  </label>`}).join("")}
              </div>
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>稼働月（空欄=通年、例: 9,10,11,12,1,2,3,4）</label>
              <input type="text" id="sf-months" value="${n}" placeholder="例: 9,10,11,12,1,2,3,4（造りスタッフ等）" />
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>兼務可能部門（越境）</label>
              <div style="padding:4px 0;display:flex;flex-wrap:wrap;">${i}</div>
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>備考</label>
              <input type="text" id="sf-notes" value="${e?.notes??""}" />
            </div>
            <div class="form-row" style="grid-column:1/-1;display:flex;gap:20px;">
              <label>
                <input type="checkbox" id="sf-leader" ${e?.isDeptLeader?"checked":""} />
                部門長（この人の日程を軸にシフトが決まる）
              </label>
              <label>
                <input type="checkbox" id="sf-active" ${e?.isActive!==!1?"checked":""} />
                有効（在籍中）
              </label>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
            <button type="button" class="button secondary" data-action="close-staff-modal">キャンセル</button>
            <button type="submit" class="button primary">${t?"保存":"登録"}</button>
          </div>
          <span id="staff-form-result" class="fr-result"></span>
        </form>
      </div>
    </div>
  `}function Ks(e,t){return!e.isActive||e.availableMonths&&!e.availableMonths.includes(t)?0:e.employmentType==="employee"?e.monthlySalary??0:0}function Am(e,t){const[,n]=t.split("-").map(Number),s=Object.keys(Ie),r=new Date,i=Array.from({length:24},(u,y)=>{const h=new Date(r.getFullYear(),r.getMonth()-6+y,1),g=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;return`<option value="${g}" ${g===t?"selected":""}>${g.replace("-","年")}月</option>`}).join("");let c=0;const d=s.map(u=>{const y=e.filter($=>$.department===u);if(y.length===0)return"";const h=y.reduce(($,_)=>$+Ks(_,n),0);c+=h;const g=y.map($=>{const _=Ks($,n),S=!$.isActive||$.availableMonths&&!$.availableMonths.includes(n),C=$.employmentType==="employee"?`月給 ${ke($.monthlySalary)}`:$.employmentType==="contractor"?`委託 ${ke($.contractFee)}/日`:`時給 ${ke($.hourlyRate)} × ${$.workHoursPerDay}h（呼び出し）`,k=S?'<span style="color:var(--text-secondary);font-size:11px;">稼働外</span>':$.employmentType==="part_time"||$.employmentType==="contractor"?'<span style="color:var(--text-secondary);font-size:11px;">実績で集計</span>':ke(_);return`<tr style="${S?"opacity:0.45;":""}">
        <td style="padding-left:20px;">${$.name}</td>
        <td><span style="font-size:11px;padding:1px 6px;border-radius:8px;background:${Wt[$.employmentType]}20;color:${Wt[$.employmentType]};">${Rr[$.employmentType]}</span></td>
        <td style="font-size:12px;">${C}</td>
        <td class="numeric"><strong>${k}</strong></td>
      </tr>`}).join("");return`
      <tr style="background:var(--surface-alt);">
        <td colspan="3">
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${tt[u]};margin-right:6px;"></span>
          <strong>${Ie[u]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);margin-left:6px;">${y.length}名</span>
        </td>
        <td class="numeric"><strong>${h>0?ke(h):"—"}</strong></td>
      </tr>
      ${g}`}).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="cost-year-month" class="form-input" style="width:160px;">${i}</select>
      <div style="margin-left:auto;display:flex;gap:12px;flex-wrap:wrap;">
        <div class="panel" style="padding:10px 16px;text-align:center;min-width:140px;">
          <p class="panel-title" style="font-size:11px;">固定費（社員+委託）</p>
          <p class="kpi-value" style="font-size:20px;">${ke(c)}</p>
        </div>
        <div class="panel" style="padding:10px 16px;text-align:center;min-width:140px;">
          <p class="panel-title" style="font-size:11px;">年間概算（×12）</p>
          <p class="kpi-value" style="font-size:20px;">${ke(c*12)}</p>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>氏名 / 部門</th><th>種別</th><th>賃金設定</th><th class="numeric">月額</th></tr></thead>
        <tbody>${d||'<tr><td colspan="4" class="empty-row">スタッフなし</td></tr>'}</tbody>
        <tfoot>
          <tr style="font-weight:700;border-top:2px solid var(--border);">
            <td colspan="3">固定費合計（社員・業務委託）</td>
            <td class="numeric">${ke(c)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:8px;">
      ※ 社員は月給固定。業務委託・パートは「実績で集計」（業務委託は日額単価×稼働日数）。造りスタッフは稼働月のみカウント。
    </p>
  `}const rn=25,ln=15,cn=640;function Lm(e,t,n,s,r,i=[],c=[]){const[d,u]=e.split("-").map(Number),y=G=>String(G).padStart(2,"0"),h=new Date(d,u,0).getDate(),g=r?.workingDays??26,$=n.some(G=>{for(let re=0;re<G.durationMonths;re++)if((G.brewMonth-1+re)%12+1===u)return!0;return!1}),_=(r?.prevYearDocumentCount??0)||(r?.monthlyDocumentCount??0),S=(r?.prevYearRouteSalesAmount??0)||(r?.routeSalesAmount??0),C=r?.directSalesCount??0,k=g>0?_/g:0,L=g>0?S/g:0,E=g>0?C/g:0;function o(G,re){return t.filter(Pe=>Pe.isActive&&(Pe.department===G||Pe.crossDepartments.includes(G))&&(!Pe.availableMonths||Pe.availableMonths.includes(u))&&(!re||re.includes(Pe.employmentType)))}const l=[];for(let G=1;G<=h;G++)new Date(d,u-1,G).getDay()!==0&&l.push(G);const p=new Set(l.slice(-5));function m(G,re){const Pe=new Date(d,u-1,re).getDay();return G.filter(De=>!(De.fixedDaysOff??[]).includes(Pe))}function f(G,re){const Pe=G.filter(De=>De.isDeptLeader);return Pe.length===0?!0:m(Pe,re).length>0}function w(G){return[...G].sort((re,Pe)=>{const De=ot=>ot.isDeptLeader?0:ot.employmentType==="employee"?1:ot.employmentType==="part_time"?2:3;return De(re)-De(Pe)})}const b=o("soumu",["employee"]);o("soumu",["part_time"]).filter(G=>(G.shiftPreference??"both")!=="afternoon"),o("soumu",["part_time"]).filter(G=>(G.shiftPreference??"both")!=="morning");const x=Math.max(b.length,Math.ceil(k/rn),Math.ceil(E/ln));Math.max(0,x-b.length);const P=o("route_sales",["employee"]),D=o("delivery",["contractor"]),q=P.length*Qt,R=Math.max(0,L-q),B=R>0?Math.min(D.length,Math.ceil(R/Qt)):0,M=i.reduce((G,re)=>G+re.demandForecast,0),O=i.reduce((G,re)=>G+re.requiredProduction,0)||i.reduce((G,re)=>G+re.plannedQty,0),I=M>0?M:(r?.prevYearTotalQuantity??0)>0?r.prevYearTotalQuantity:(r?.currentTotalQuantity??0)>0?r.currentTotalQuantity:0,j=s>0?s:O>0?O:I,V=o("bottling"),U=o("labeling"),W=o("brewing"),H=i.length>0?i.filter(G=>(G.requiredProduction||G.plannedQty)>0).map(G=>({productCode:G.productCode,productName:G.productName,qty:G.requiredProduction||G.plannedQty,daysNeeded:Math.max(1,Math.ceil((G.requiredProduction||G.plannedQty)/Ft))})):j>0?[{productCode:"",productName:"詰口計画",qty:j,daysNeeded:Math.ceil(j/Ft)}]:[],Q=`${d}-${y(u)}`,Z=c.filter(G=>G.date.startsWith(Q)&&(G.partTimers>0||G.employees>0)).sort((G,re)=>G.date.localeCompare(re.date)),ne=Z.length>=5?Z.map(G=>parseInt(G.date.slice(-2))).filter(G=>!p.has(G)):l.filter(G=>!p.has(G)),K=new Map(Z.map(G=>[parseInt(G.date.slice(-2)),G])),J=new Map;let X=0;for(const G of H)for(let re=0;re<G.daysNeeded&&X<ne.length;re++,X++){const Pe=ne[X],De=G.qty-re*Ft,ot=Math.min(De,Ft);J.set(Pe,{productCode:G.productCode,productName:G.productName,dailyQty:ot})}const se=Math.max(fa,Math.min(U.length||1,3)),ge=I>0?Math.ceil(I/(cn*se)):0,de=ne.slice(Math.floor(ne.length/2)),we=new Set;if(ge>0&&de.length>0){const G=de.length/Math.min(ge,de.length);for(let re=0;re<ge&&re<de.length;re++)we.add(de[Math.min(Math.round(re*G),de.length-1)])}const Ne=we.size>0?Math.ceil(I/we.size):0,bt=Math.max(fa,Math.min(U.length||1,Math.ceil(Ne/cn))),st=s>0?`手動入力 ${s.toLocaleString("ja-JP")}本`:O>0?`需要計画（必要生産 ${O.toLocaleString("ja-JP")}本）`:(r?.prevYearTotalQuantity??0)>0?`前年同月実績 ${r.prevYearTotalQuantity.toLocaleString("ja-JP")}本`:(r?.currentTotalQuantity??0)>0?`当月実績 ${r.currentTotalQuantity.toLocaleString("ja-JP")}本`:"実績データなし",Ya=M>0?`需要計画 出荷見込み ${M.toLocaleString("ja-JP")}本`:st,Ke=[];for(const G of l){const re=`${d}-${y(u)}-${y(G)}`,Pe=p.has(G),De=J.get(G),ot=De!==void 0,Gr=we.has(G),cs=w(o("soumu")),Ua=m(cs,G),ds=Ua.filter(me=>me.employmentType==="employee"),Xr=Ua.filter(me=>me.employmentType==="part_time"&&(me.shiftPreference??"both")!=="afternoon"),Zr=Ua.filter(me=>me.employmentType==="part_time"&&(me.shiftPreference??"both")!=="morning"),ei=f(cs,G),na=ds.map(me=>me.id);let sa=Math.max(0,x-ds.length)+(Pe?1:0);for(const me of Xr){if(sa<=0)break;na.push(me.id),sa--}for(const me of Zr){if(sa<=0)break;na.includes(me.id)||(na.push(me.id),sa--)}const ti=[Pe?"棚卸週（月末棚卸対応）":null,ei?null:"⚠ 部門長不在",`伝票${Math.round(k)}件/日 ÷ ${rn}件/人 = ${Math.ceil(k/rn)}名必要`,`来客${Math.round(E)}件/日 ÷ ${ln}件/人 = ${Math.ceil(E/ln)}名必要(AM)`].filter(Boolean).join(" | ");Ke.push({planDate:re,department:"soumu",staffMemberIds:na,notes:ti});const ps=w(o("route_sales")),Ja=m(ps,G),ai=f(ps,G);Ke.push({planDate:re,department:"route_sales",staffMemberIds:Ja.map(me=>me.id),notes:[ai?null:"⚠ 部門長不在",`前年同月日次平均 ${ke(L)}`,`社員${Ja.length}台 × 積載 ${ke(Qt)}/台`].filter(Boolean).join(" | ")});const ni=m(w(D),G).slice(0,B);if(Ke.push({planDate:re,department:"delivery",staffMemberIds:ni.map(me=>me.id),notes:B===0?`社員${Ja.length}台（${ke(q)}/日）で対応可 | 超過なし`:`社員キャパ超過 ${ke(R)}/日 → 委託${B}台追加`}),$){const me=w(W),Tt=m(me,G),rt=f(me,G);Tt.length>0&&Ke.push({planDate:re,department:"brewing",staffMemberIds:Tt.map(Ha=>Ha.id),notes:[rt?null:"⚠ 部門長不在（代行要確認）",`醸造月（${u}月） | 調達計画に基づく仕込み`].filter(Boolean).join(" | ")})}if(ot&&De){const me=w(V);if(f(me,G)||me.filter(rt=>rt.isDeptLeader).length===0){const rt=K.get(G),Ha=rt?Math.max(ha,rt.partTimers+rt.employees):ha,Ka=m(me,G).slice(0,Math.min(me.length,Ha)),us=De.productName?`${De.productName}（${De.productCode}）`:st;Ke.push({planDate:re,department:"bottling",staffMemberIds:Ka.map(si=>si.id),notes:Ka.length<ha?`⚠ 要員不足 ${Ka.length}/${ha}名 | ${us}`:`${us} | 本日目標 ${De.dailyQty.toLocaleString("ja-JP")}本 | 日産上限 ${Ft.toLocaleString("ja-JP")}本/単一酒質`})}}if(Gr){const me=m(w(U),G).slice(0,bt);Ke.push({planDate:re,department:"labeling",staffMemberIds:me.map(Tt=>Tt.id),notes:me.length<fa?`⚠ 要員不足 ${me.length}/${fa}名`:`${Ya} | 本日目標 ${Ne.toLocaleString("ja-JP")}本 (${bt}名 × ${cn}本/人日)`})}}return Ke}function Cm(e,t,n,s,r,i,c){const[d,u]=t.split("-").map(Number),y=x=>String(x).padStart(2,"0"),h=new Date(d,u,0).getDate(),g=new Date(d,u-1,1).getDay(),$=g===0?6:g-1,_=new Date().toISOString().slice(0,10),S=new Map(e.map(x=>[x.id,x])),C=new Map;for(const x of i){const P=C.get(x.planDate)??[];P.push(x),C.set(x.planDate,P)}const k=i.length>0,L=new Date,E=Array.from({length:24},(x,P)=>{const D=new Date(L.getFullYear(),L.getMonth()-6+P,1),q=`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`;return`<option value="${q}" ${q===t?"selected":""}>${q.replace("-","年")}月</option>`}).join(""),l=["月","火","水","木","金","土","日"].map((x,P)=>`<div style="text-align:center;padding:5px 2px;font-size:11px;font-weight:700;color:${P===6?"#ef4444":"var(--text-secondary)"};background:var(--surface-alt);border-radius:4px;">${x}</div>`).join(""),p=Array($).fill("<div></div>").join(""),m=Array.from({length:h},(x,P)=>{const D=P+1,q=`${d}-${y(u)}-${y(D)}`,R=new Date(d,u-1,D).getDay(),B=R===0,M=q===_,O=q===c,I=C.get(q)??[],j=I.some(Q=>Q.notes?.includes("棚卸")),V=I.some(Q=>Q.notes?.includes("⚠")),U=I.map(Q=>{const Z=tt[Q.department],ee=Q.staffMemberIds.length,ne=Q.staffMemberIds.map(K=>S.get(K)?.name??"?").join(", ");return`<span style="display:inline-flex;align-items:center;gap:1px;font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;background:${Z}22;color:${Z};font-weight:700;border:1px solid ${Z}44;cursor:pointer;" title="${Ie[Q.department]}: ${ne}">
        ${Js[Q.department]}<span style="font-size:8px;opacity:0.85;">${ee}</span>
      </span>`}).join("");return`<div data-shift-day="${q}" style="border:${O?"2px solid var(--accent)":M?"2px solid #f59e0b":"1px solid var(--border)"};border-radius:4px;padding:3px 4px;min-height:72px;background:${B?"var(--surface-alt)":"var(--surface)"};cursor:pointer;position:relative;${B?"opacity:0.5;":""}${I.length===0&&!B?"opacity:0.35;":""}">
      <div style="font-size:10px;font-weight:700;color:${R===6?"#6b7280":B?"#ef4444":M?"#f59e0b":O?"var(--accent)":"var(--text-secondary)"};margin-bottom:2px;">
        ${D}${M?" ●":""}
      </div>
      <div style="display:flex;flex-wrap:wrap;">${U}</div>
      ${j?'<div style="font-size:7px;color:#7c3aed;font-weight:700;margin-top:1px;">棚卸</div>':""}
      ${V?'<div style="font-size:7px;color:#ef4444;font-weight:700;margin-top:1px;">⚠要確認</div>':""}
    </div>`}).join(""),f=["日","月","火","水","木","金","土"],w=c?(()=>{const[x,P,D]=c.split("-").map(Number),q=f[new Date(x,P-1,D).getDay()],R=C.get(c)??[];if(R.length===0)return`<div class="panel" style="margin-top:12px;padding:14px 16px;">
        <p style="font-weight:700;margin:0 0 6px;">${x}年${P}月${D}日（${q}）</p>
        <p style="font-size:12px;color:var(--text-secondary);">この日のシフト計画はありません（日曜または未生成）。</p>
      </div>`;const B=R.map(M=>{const O=tt[M.department],I=M.staffMemberIds.map(H=>S.get(H)).filter(Boolean),j=I.filter(H=>H.isDeptLeader).map(H=>H.name),V=I.filter(H=>!H.isDeptLeader).map(H=>H.name),U=I.length===0?'<span style="color:var(--text-secondary);font-size:11px;">担当なし</span>':[...j.map(H=>`<span style="font-weight:700;color:${O};">${H}★</span>`),...V.map(H=>`<span>${H}</span>`)].join("、"),W=(M.notes??"").split(" | ").filter(Boolean);return`<div style="padding:10px 0;border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${O};flex-shrink:0;"></span>
          <strong style="color:${O};font-size:13px;">${Ie[M.department]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);">${I.length}名</span>
        </div>
        <div style="font-size:12px;margin-bottom:4px;">出勤: ${U}</div>
        <div style="font-size:11px;color:var(--text-secondary);display:flex;flex-direction:column;gap:2px;">
          ${W.map(H=>`<span style="padding:1px 0;${H.startsWith("⚠")?"color:#ef4444;font-weight:600;":""}">${H}</span>`).join("")}
        </div>
      </div>`}).join("");return`<div class="panel" style="margin-top:12px;padding:14px 16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <p style="font-weight:700;margin:0;font-size:14px;">${x}年${P}月${D}日（${q}）の配置</p>
        <button class="button secondary small" data-action="shift-day-close">閉じる</button>
      </div>
      ${B}
    </div>`})():`<div style="margin-top:8px;padding:10px 14px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);border-radius:6px;">
    日付をクリックすると出勤者・根拠が表示されます。★=部門長
  </div>`,b=r?(()=>{const x=Qt*km*r.workingDays,P=x>0?Math.min(100,Math.round(r.routeSalesAmount/x*100)):0,D=P>=90?"#ef4444":P>=70?"#f59e0b":"#10b981",q=x>0?Math.min(100,Math.round(r.prevYearRouteSalesAmount/x*100)):0;return`<div class="panel" style="padding:10px 16px;margin-top:8px;">
      <p style="font-size:11px;font-weight:700;margin:0 0 8px;color:var(--text-secondary);">自動生成の根拠データ（前年同月比較）</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;font-size:12px;">
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">総務 処理伝票数</p>
          <strong>${r.monthlyDocumentCount}件</strong>
          <span style="font-size:10px;color:var(--text-secondary);margin-left:6px;">前年: ${r.prevYearDocumentCount}件</span>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">直売来店（上様）</p>
          <strong>${r.directSalesCount}件 ${ke(r.directSalesAmount)}</strong>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">詰口・貼場 出荷見込み本数</p>
          <strong>${(r.prevYearTotalQuantity||r.currentTotalQuantity||0).toLocaleString("ja-JP")}本</strong>
          <span style="font-size:10px;color:var(--text-secondary);margin-left:6px;">
            ${r.prevYearTotalQuantity?`前年同月 ${r.prevYearTotalQuantity.toLocaleString("ja-JP")}本`:r.currentTotalQuantity?`当月実績 ${r.currentTotalQuantity.toLocaleString("ja-JP")}本`:"実績なし"}
          </span>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">配送積載率（2台 ${ke(Qt)}/日）</p>
          <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
            <div style="flex:1;background:var(--border);border-radius:3px;height:5px;">
              <div style="width:${P}%;height:100%;background:${D};border-radius:3px;"></div>
            </div>
            <strong style="color:${D};font-size:11px;">${P}%</strong>
          </div>
          <span style="font-size:10px;color:var(--text-secondary);">${ke(r.routeSalesAmount)} ／ 前年 ${ke(r.prevYearRouteSalesAmount)}（${q}%）</span>
        </div>
      </div>
    </div>`})():"";return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="shift-year-month" class="form-input" style="width:160px;">${E}</select>
      <div style="display:flex;align-items:center;gap:6px;">
        <label style="font-size:12px;white-space:nowrap;">詰口計画（本/月）</label>
        <input type="number" id="shift-bottling-target" class="form-input" style="width:110px;"
          value="${s||""}" min="0" step="100"
          placeholder="${r?.prevYearTotalQuantity?`前年 ${r.prevYearTotalQuantity.toLocaleString("ja-JP")}本`:"自動算出"}" />
        <span style="font-size:10px;color:var(--text-secondary);">空欄＝需要計画から自動算出</span>
      </div>
      <span style="font-size:11px;color:var(--text-secondary);">
        ${k?`${i.length}件登録済み`:"未生成"}
      </span>
      <button class="button ${k?"secondary":"primary"} small" data-action="shift-auto-generate" style="margin-left:auto;">
        ⚡ 自動生成${k?" (再生成)":""}
      </button>
    </div>

    ${k?"":`<div style="padding:12px 16px;font-size:12px;color:var(--text-secondary);background:var(--surface-alt);border-radius:8px;margin-bottom:12px;">
      「自動生成」で月次シフトを作成します。需要・生産計画・部門長スケジュール・固定休みをもとに担当者を自動配置します。
    </div>`}

    <div style="overflow-x:auto;">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;min-width:490px;">
        ${l}
        ${p}
        ${m}
      </div>
    </div>

    <!-- 凡例 -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:6px;font-size:11px;color:var(--text-secondary);">
      ${Object.keys(Ie).map(x=>`<span style="display:inline-flex;align-items:center;gap:3px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${tt[x]};"></span>
          <strong style="color:${tt[x]};">${Js[x]}</strong>${Ie[x]}
        </span>`).join("")}
      <span>| 数字=配置人数 | ★=部門長 | 月〜土が営業日</span>
    </div>

    ${w}
    ${b}
  `}function Dm(e,t,n,s,r,i=0,c=null,d=[],u=null){const y=t==="staff"?Em(e,n):t==="cost"?Am(e,s):Cm(e,s,r,i,c,d,u);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">人員管理</p>
        <h1>人員・シフト管理</h1>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header tabs-header">
        <div class="tab-group">
          <button class="tab-button ${t==="staff"?"active":""}" data-workforce-tab="staff">スタッフ一覧</button>
          <button class="tab-button ${t==="shift"?"active":""}" data-workforce-tab="shift">月次シフト</button>
          <button class="tab-button ${t==="cost"?"active":""}" data-workforce-tab="cost">人件費</button>
        </div>
      </div>
      ${y}
    </section>
  `}function An(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function qm(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Or(e){return e?ja.find(t=>t.value===e)?.label??e:""}function Tm(e){const t=[],n=[],s=[];for(const r of e){const i=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,c={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:i,status:"dormant"};r.is_at_risk?t.push({...c,status:"at-risk"}):r.is_dormant?n.push({...c,status:"dormant"}):r.amount_last_year_same_month>0&&i<.8&&s.push({...c,status:"declining"})}return t.sort((r,i)=>i.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,i)=>i.daysSinceLastOrder-r.daysSinceLastOrder),s.sort((r,i)=>r.yoyRatio-i.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:s}}function Im(e,t){const n=t?.reason??"",s=ja.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${s}
    </select>`}function Mm(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],s=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,i=r?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${Or(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${i}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${s}
      <td class="numeric">${An(e.totalAmountLast12m)}</td>
      <td>${Im(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function dn(e,t,n,s,r,i,c,d){if(r.length===0)return"";const u=r.map(y=>Mm(y,d.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${s}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${qm(i)}</p>
        </div>
      </div>
      <div class="table-wrap">
        <table class="churn-table" data-section="${e}">
          <thead>
            <tr>
              <th>区分</th>
              <th data-sort="name">得意先名</th>
              <th>エリア</th>
              <th>業種</th>
              <th data-sort="lastOrderDate">最終注文日</th>
              <th class="numeric">${c}</th>
              <th class="numeric" data-sort="amount12m">12M売上</th>
              <th>注文しない理由</th>
              <th>対応済</th>
              <th>電話</th>
            </tr>
          </thead>
          <tbody>${u}</tbody>
        </table>
      </div>
    </section>`}function Nm(e,t=[]){const{atRiskCustomers:n,dormantCustomers:s,decliningCustomers:r}=e,i=n.length+s.length+r.length,c=n.reduce((k,L)=>k+L.totalAmountLast12m,0),d=s.reduce((k,L)=>k+L.totalAmountLast12m,0),u=r.reduce((k,L)=>k+L.totalAmountLast12m,0),y=[...n,...s,...r],h=[...new Set(y.map(k=>k.areaCode).filter(Boolean))].sort(),g=[...new Set(y.map(k=>k.businessType).filter(Boolean))].sort(),$=new Map(t.map(k=>[k.customerCode,k])),_=t.filter(k=>k.actionedAt).length,S=new Map;t.forEach(k=>{k.reason&&S.set(k.reason,(S.get(k.reason)??0)+1)});const C=[...S.entries()].sort((k,L)=>L[1]-k[1]).slice(0,5).map(([k,L])=>`<span class="status-pill info" style="font-size:0.75rem;">${Or(k)} ${L}社</span>`).join(" ");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">既存顧客ケア</p>
        <h1>営業アクション</h1>
        <p class="meta-note">離反・休眠・売上下落の顧客を早期に把握し、フォローに活かします。</p>
      </div>
    </section>

    <section class="kpi-grid">
      <div class="kpi-card" style="border-top:3px solid var(--color-danger);">
        <div class="kpi-label">🔴 離反リスク</div>
        <div class="kpi-value">${n.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-danger);">${An(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${s.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${An(d)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${_}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${i}社中</div>
      </div>
    </section>

    ${C?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${C}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${i})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${s.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${r.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${h.map(k=>`<option value="${k}">${k}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${g.map(k=>`<option value="${k}">${k}</option>`).join("")}
      </select>
    </div>

    ${dn("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",$)}
    ${dn("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",s,d,"経過日数",$)}
    ${dn("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",$)}

    <script type="module">
    (function () {
      let activeFilter  = "all";
      let hideActioned  = false;

      function applyFilters() {
        const area = document.getElementById("churn-filter-area")?.value || "";
        const biz  = document.getElementById("churn-filter-biz")?.value  || "";
        document.querySelectorAll(".churn-table tbody tr").forEach((row) => {
          const status   = row.getAttribute("data-status")   || "";
          const rowArea  = row.getAttribute("data-area")     || "";
          const rowBiz   = row.getAttribute("data-biz")      || "";
          const actioned = row.getAttribute("data-actioned") === "1";
          const ok = (activeFilter === "all" || status === activeFilter)
            && (!area || rowArea === area)
            && (!biz  || rowBiz  === biz)
            && !(hideActioned && actioned);
          row.style.display = ok ? "" : "none";
        });
        ["at-risk","dormant","declining"].forEach((sec) => {
          const el = document.getElementById(sec + "-section");
          if (el) el.style.display = (activeFilter === "all" || activeFilter === sec) ? "" : "none";
        });
        document.querySelectorAll("[data-churn-filter]").forEach((btn) => {
          const active = btn.getAttribute("data-churn-filter") === activeFilter;
          btn.classList.toggle("primary",   active);
          btn.classList.toggle("secondary", !active);
        });
        const hideBtn = document.getElementById("churn-hide-actioned");
        if (hideBtn) {
          hideBtn.classList.toggle("primary",   hideActioned);
          hideBtn.classList.toggle("secondary", !hideActioned);
        }
      }

      document.querySelectorAll("[data-churn-filter]").forEach((btn) => {
        btn.addEventListener("click", () => { activeFilter = btn.getAttribute("data-churn-filter") || "all"; applyFilters(); });
      });
      document.getElementById("churn-hide-actioned")?.addEventListener("click", () => { hideActioned = !hideActioned; applyFilters(); });
      document.getElementById("churn-filter-area")?.addEventListener("change", applyFilters);
      document.getElementById("churn-filter-biz")?.addEventListener("change",  applyFilters);

      // 列ソート
      document.querySelectorAll(".churn-table th[data-sort]").forEach((th) => {
        th.style.cursor = "pointer";
        th.addEventListener("click", () => {
          const tbody  = th.closest("table")?.querySelector("tbody");
          if (!tbody) return;
          const colIdx = Array.from(th.parentElement.children).indexOf(th);
          const asc    = th.getAttribute("data-asc") !== "1";
          th.setAttribute("data-asc", asc ? "1" : "0");
          const rows = Array.from(tbody.querySelectorAll("tr"));
          rows.sort((a, b) => {
            const at = a.children[colIdx]?.textContent?.trim() ?? "";
            const bt = b.children[colIdx]?.textContent?.trim() ?? "";
            const an = parseFloat(at.replace(/[^0-9.-]/g, ""));
            const bn = parseFloat(bt.replace(/[^0-9.-]/g, ""));
            if (!isNaN(an) && !isNaN(bn)) return asc ? an - bn : bn - an;
            return asc ? at.localeCompare(bt, "ja") : bt.localeCompare(at, "ja");
          });
          rows.forEach((r) => tbody.appendChild(r));
        });
      });

      applyFilters();
    })();
    <\/script>`}const at=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Ln={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},et={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Rm(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Om(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const s=Math.max(...e);return e.filter(i=>i>s*.1).length<=6?"seasonal":"year-round"}function Bm(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return[];const s=t/12*1.5,r=[];for(let i=0;i<12;i++)e[i]>s&&r.push(i);if(r.length===0){const i=Math.max(...e);i>0&&r.push(e.indexOf(i))}return r.sort((i,c)=>i-c)}function jm(e){return e.length===0?0:(e[0]-2+12)%12}function Qs(e){const t=new Date().getMonth(),n=e.map(r=>{const i=Om(r.monthlyQuantity),c=Bm(r.monthlyQuantity),d=jm(c);return{code:r.code,name:r.name,category:r.category,peakMonths:c,proposalStartMonth:d,seasonType:i,monthlyQuantity:r.monthlyQuantity}}),s=[];for(let r=0;r<12;r++){const i=n.filter(c=>{if(c.peakMonths.length===0)return!1;const d=c.proposalStartMonth,u=c.peakMonths[0];return d<=u?r>=d&&r<=u:r>=d||r<=u});s.push({month:r,products:i,targetCustomers:[]})}return{products:n,proposals:s,selectedMonth:t}}function zm(e){const{products:t,proposals:n,selectedMonth:s}=e,r=new Date().getMonth(),i={"year-round":[],seasonal:[],"year-end":[]};t.forEach(g=>i[g.seasonType].push(g));const c=n[s],d=t.length,u=c?.products.length??0,y=t.filter(g=>g.peakMonths.includes(s)).length,h=c?.targetCustomers.length??0;return`
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
      <div class="mono numeric" style="font-size:1.5rem">${d}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${at[s]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${at[s]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${h}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${at.map((g,$)=>{const _=$===r,S=$===s;return`<button class="button" style="padding:4px 10px;background:${S?"#0F5B8D":_?"#e2e8f0":"transparent"};color:${S?"#fff":"#333"};border:${_&&!S?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${$}">${g}${_?" ●":""}</button>`}).join("")}
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
            ${at.map((g,$)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${$===r?"background:#f0f7ff;":""}">${g.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Fm(i,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${Vm(i,s)}

  <!-- Target customer list for selected month -->
  ${Ym(c)}
</div>`}function Fm(e,t){const n=[],s=["year-round","seasonal","year-end"];for(const r of s){const i=e[r];if(i.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${et[r]}15;color:${et[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${Ln[r]}</span>
    </td></tr>`);for(const c of i){const d=at.map((u,y)=>{const h=c.peakMonths.includes(y),g=Br(c,y),$=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let _="transparent";h?_=et[c.seasonType]:g&&(_=et[c.seasonType]+"40");const S=h||g?`background:${_};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${$}"><div style="${S}" title="${h?"ピーク":g?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${et[c.seasonType]}15;color:${et[c.seasonType]}">${Ln[c.seasonType]}</span></td>
        ${d}
      </tr>`)}}}return n.join("")}function Br(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,s=e.peakMonths[0];return n<=s?t>=n&&t<s:t>=n||t<s}function Vm(e,t){const s=["year-round","seasonal","year-end"].map(r=>{const i=e[r];if(i.length===0)return"";const c=i.filter(u=>u.peakMonths.includes(t)||Br(u,t));if(c.length===0)return"";const d=c.map(u=>{const h=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',g=u.monthlyQuantity.reduce(($,_)=>$+_,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${h}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${g.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map($=>at[$]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${et[r]}15;color:${et[r]}">${Ln[r]}</span>
        <span style="font-size:0.85rem;color:#666">${at[t]}の対象: ${c.length}品</span>
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
        <tbody>${d}</tbody>
      </table>
    </div>`}).filter(Boolean);return s.length===0?`<div style="padding:1rem;color:#666;text-align:center">${at[t]}に提案対象の商品はありません</div>`:s.join("")}function Ym(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${Rm(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const Um=["日","月","火","水","木","金","土"];function ga(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:`¥${e.toLocaleString()}`}function kt(e,t){if(t===0&&e===0)return'<span class="sc-yoy sc-yoy-flat">—</span>';if(t===0)return'<span class="sc-yoy sc-yoy-up">NEW</span>';const n=Math.round((e/t-1)*100);return n>0?`<span class="sc-yoy sc-yoy-up">+${n}%</span>`:n<0?`<span class="sc-yoy sc-yoy-down">${n}%</span>`:'<span class="sc-yoy sc-yoy-flat">±0%</span>'}function os(e){return e?e.totalVolumes.reduce((t,n)=>t+n.bottles,0):0}function jr(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n-1,1),r=new Date(t,n,0),i=[];for(let c=0;c<s.getDay();c++)i.push({outside:!0});for(let c=1;c<=r.getDate();c++)i.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;i.length%7!==0;)i.push({outside:!0});return i}function Ws(e){const[t,n,s]=e.split("-").map(Number),i=new Date(t,n-1,s).getDay(),c=Math.ceil(s/7),u=new Date(t-1,n-1,1).getDay(),h=1+(i-u+7)%7+(c-1)*7,g=new Date(t-1,n,0).getDate();return h>g?"":`${t-1}-${String(n).padStart(2,"0")}-${String(h).padStart(2,"0")}`}function Gs(e,t){const[n,s]=t.split("-").map(Number),r=new Date(n,s,0).getDate(),i=Array.from({length:7},()=>({count:0,amount:0,bottles:0,days:0}));for(let c=1;c<=r;c++){const d=`${t}-${String(c).padStart(2,"0")}`,u=new Date(n,s-1,c).getDay();i[u].days++;const y=e[d];y&&(i[u].count+=y.count,i[u].amount+=y.totalAmount,i[u].bottles+=os(y))}return i}function Jm(e,t){const n=[];for(let s=0;s<t.length;s+=7){const r=t.slice(s,s+7);let i=0,c=0,d=0,u=0;for(const y of r)if(y.date){u++;const h=e[y.date];h&&(i+=h.count,c+=h.totalAmount,d+=os(h))}n.push({count:i,amount:c,bottles:d,days:u})}return n}function Hm(e,t){const[n,s]=t.split("-").map(Number),r=`${n-1}-${String(s).padStart(2,"0")}`,i=jr(r),c=[];for(let d=0;d<i.length;d+=7){const u=i.slice(d,d+7);let y=0,h=0,g=0,$=0;for(const _ of u)if(_.date){$++;const S=e[_.date];S&&(y+=S.count,h+=S.totalAmount,g+=os(S))}c.push({count:y,amount:h,bottles:g,days:$})}return c}function Km(e,t,n,s){const[r,i]=t.split("-").map(Number),c=new Date(r,i-2,1),d=new Date(r,i,1),u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,y=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,h=new Date().toISOString().slice(0,10),g=s??{},$=jr(t),_=e?Gs(e,t):null,S=`${r-1}-${String(i).padStart(2,"0")}`,C=s?Gs(s,S):null,k=e?Jm(e,$):null,L=s?Hm(s,t):null;let E="";if(e===null)E='<div class="sc-loading" style="grid-column:1/-1;"><div class="loading-spinner"></div><p>読み込み中…</p></div>';else for(let w=0;w<$.length;w++){const b=$[w];if(b.outside)E+='<div class="sc-cell sc-outside"></div>';else{const x=b.date,P=Number(x.split("-")[2]),D=new Date(`${x}T00:00:00`).getDay(),q=e[x],R=x===h,B=x===n,M=g[Ws(x)],O=q?.totalAmount??0,I=M?.totalAmount??0;let j="",V="",U="",W="";q&&(j=`<span class="sc-badge">${q.count}件</span>`,V=`<div class="sc-day-amt">${ga(O)}</div>`,W=q.cityGroups.slice(0,2).map(H=>`<span class="sc-city-tag">${H.city}<em>${H.count}</em></span>`).join(""),q.cityGroups.length>2&&(W+=`<span class="sc-city-more">+${q.cityGroups.length-2}</span>`)),(O>0||I>0)&&(U=`<div class="sc-day-yoy">${kt(O,I)}</div>`),E+=`
          <div class="sc-cell ${R?"sc-today":""} ${B?"sc-selected":""} ${q?"sc-has-data":""}"
               data-sc-date="${x}">
            <div class="sc-day-header">
              <span class="sc-day-num ${D===0?"sc-sun":D===6?"sc-sat":""}">${P}</span>
              ${j}
            </div>
            ${V}
            ${U}
            <div class="sc-cities">${W}</div>
          </div>`}if((w+1)%7===0&&k){const x=Math.floor(w/7),P=k[x],D=L?.[x],q=P.days>0?P.count/P.days:0,R=D?.amount??0;E+=`
          <div class="sc-cell sc-week-total">
            <div class="sc-wt-count">${P.count}<small>件</small></div>
            <div class="sc-wt-amount">${ga(P.amount)}</div>
            <div class="sc-wt-bottles">${P.bottles}<small>本</small></div>
            <div class="sc-wt-avg">⌀${q.toFixed(1)}<small>件/日</small></div>
            ${P.amount>0||R>0?`<div class="sc-wt-yoy">${kt(P.amount,R)}</div>`:""}
          </div>`}}let o="";if(_){o=_.map((R,B)=>{const M=R.days>0?R.count/R.days:0,O=B===0?"sc-sun":B===6?"sc-sat":"",j=C?.[B]?.amount??0;return`<div class="sc-wd-summary ${O}">
        <span class="sc-wds-count">${R.count}<small>件</small></span>
        <span class="sc-wds-amt">${ga(R.amount)}</span>
        <span class="sc-wds-bottles">${R.bottles}<small>本</small></span>
        <span class="sc-wds-avg">⌀${M.toFixed(1)}</span>
        ${R.amount>0||j>0?`<span class="sc-wds-yoy">${kt(R.amount,j)}</span>`:""}
      </div>`}).join("");const w=_.reduce((R,B)=>R+B.count,0),b=_.reduce((R,B)=>R+B.amount,0),x=_.reduce((R,B)=>R+B.bottles,0),P=_.reduce((R,B)=>R+B.days,0),D=P>0?w/P:0,q=C?C.reduce((R,B)=>R+B.amount,0):0;o+=`<div class="sc-wd-summary sc-wd-month-total">
      <span class="sc-wds-count">${w}<small>件</small></span>
      <span class="sc-wds-amt">${ga(b)}</span>
      <span class="sc-wds-bottles">${x}<small>本</small></span>
      <span class="sc-wds-avg">⌀${D.toFixed(1)}</span>
      ${b>0||q>0?`<span class="sc-wds-yoy">${kt(b,q)}</span>`:""}
    </div>`}const l=n&&e?.[n]?Wm(e[n],g[Ws(n)]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',p=Object.values(e??{}).reduce((w,b)=>w+b.count,0),m=Object.values(e??{}).reduce((w,b)=>w+b.totalAmount,0),f=Object.values(g).reduce((w,b)=>w+b.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${p>0?`月計: <strong>${p}件</strong> / <strong>¥${m.toLocaleString()}</strong> ${kt(m,f)}`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${u}">◀</button>
          <span class="sc-month-label">${r}年${i}月</span>
          <button class="sc-nav-btn" data-sc-ym="${y}">▶</button>
        </div>
        <div class="sc-unit-note">K=¥1,000 / M=¥1,000,000 ｜ 昨対: 前年同月 同週同曜日比</div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays-8">
            ${Um.map((w,b)=>`<div class="sc-weekday ${b===0?"sc-sun":b===6?"sc-sat":""}">${w}</div>`).join("")}
            <div class="sc-weekday sc-wk-header">週計</div>
          </div>

          ${o?`<div class="sc-wd-summary-row">${o}</div>`:""}

          <div class="sc-grid-8">
            ${E}
          </div>
        </div>

        <div class="sc-detail-col${n?" sc-detail-active":""}">
          ${l}
          ${n?'<button class="sc-detail-close" data-sc-date="">✕ 閉じる</button>':""}
        </div>
      </div>
    </section>

    <style>
      .sc-panel { padding: 0; overflow: hidden; }
      .sc-header { padding: 16px 20px 12px; border-bottom: 1px solid var(--border, #e5e7eb); }
      .sc-title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
      .sc-title { font-size: 1.1rem; font-weight: 700; margin: 0; }
      .sc-month-summary { font-size: 0.85rem; color: var(--text-muted, #6b7280); }
      .sc-month-summary strong { color: var(--text, #111); }
      .sc-nav { display: flex; align-items: center; gap: 12px; }
      .sc-unit-note { font-size: 0.7rem; color: var(--text-muted, #9ca3af); margin-top: 4px; }
      .sc-nav-btn { background: var(--bg-subtle, #f3f4f6); border: 1px solid var(--border, #e5e7eb); border-radius: 6px; padding: 4px 12px; cursor: pointer; font-size: 0.9rem; }
      .sc-nav-btn:hover { background: var(--bg-hover, #e5e7eb); }
      .sc-month-label { font-size: 1rem; font-weight: 600; min-width: 100px; text-align: center; }

      /* 昨対バッジ */
      .sc-yoy { font-size: 0.6rem; font-weight: 600; border-radius: 3px; padding: 0 3px; white-space: nowrap; }
      .sc-yoy-up { color: #166534; background: #dcfce7; }
      .sc-yoy-down { color: #991b1b; background: #fee2e2; }
      .sc-yoy-flat { color: #6b7280; background: #f3f4f6; }

      .sc-body { display: grid; grid-template-columns: 1fr 280px; min-height: 480px; }
      @media (max-width: 900px) { .sc-body { grid-template-columns: 1fr; } }

      .sc-calendar-col { padding: 12px 16px; border-right: 1px solid var(--border, #e5e7eb); overflow-x: auto; }

      .sc-weekdays-8 { display: grid; grid-template-columns: repeat(7, 1fr) 84px; margin-bottom: 0; }
      .sc-weekday { text-align: center; font-size: 0.75rem; font-weight: 600; color: var(--text-muted, #6b7280); padding: 4px 0; }
      .sc-weekday.sc-sun { color: #ef4444; }
      .sc-weekday.sc-sat { color: #3b82f6; }
      .sc-wk-header { background: #f0fdf4; color: #166534; font-weight: 700; border-radius: 4px 4px 0 0; }

      .sc-wd-summary-row { display: grid; grid-template-columns: repeat(7, 1fr) 84px; margin-bottom: 4px; border-bottom: 2px solid var(--border, #d1d5db); padding-bottom: 6px; }
      .sc-wd-summary { text-align: center; font-size: 0.65rem; line-height: 1.4; padding: 4px 2px; display: flex; flex-direction: column; align-items: center; gap: 1px; }
      .sc-wd-summary.sc-sun { color: #ef4444; }
      .sc-wd-summary.sc-sat { color: #3b82f6; }
      .sc-wd-summary.sc-wd-month-total { background: #f0fdf4; border-radius: 0 0 4px 4px; color: #166534; font-weight: 600; }
      .sc-wds-count { font-weight: 700; font-size: 0.72rem; }
      .sc-wds-amt { color: var(--text-muted, #6b7280); }
      .sc-wds-bottles { color: #92400e; }
      .sc-wds-avg { color: #0369a1; font-style: italic; }
      .sc-wds-yoy { margin-top: 1px; }
      .sc-wd-summary small { font-size: 0.55rem; opacity: 0.7; }

      .sc-grid-8 { display: grid; grid-template-columns: repeat(7, 1fr) 84px; gap: 2px; }
      .sc-cell { min-height: 80px; border: 1px solid var(--border, #e5e7eb); border-radius: 6px; padding: 4px 6px; cursor: pointer; transition: background 0.1s, border-color 0.1s; }
      .sc-cell.sc-outside { background: transparent; border-color: transparent; cursor: default; min-height: 0; }
      .sc-cell:not(.sc-outside):hover { background: var(--bg-hover, #f9fafb); border-color: var(--primary, #0F5B8D); }
      .sc-cell.sc-today { background: #eff6ff; border-color: #3b82f6; }
      .sc-cell.sc-selected { background: #dbeafe; border-color: #2563eb; border-width: 2px; }
      .sc-cell.sc-has-data .sc-day-num { font-weight: 700; }

      .sc-day-amt { font-size: 0.68rem; color: #15803d; font-weight: 600; margin-top: 1px; }
      .sc-day-yoy { margin-top: 1px; }

      .sc-cell.sc-week-total {
        background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;
        padding: 4px 6px; cursor: default;
        display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2px;
        font-size: 0.7rem; color: #166534;
      }
      .sc-wt-count { font-weight: 700; font-size: 0.8rem; }
      .sc-wt-count small, .sc-wt-bottles small, .sc-wt-avg small { font-size: 0.55rem; opacity: 0.7; }
      .sc-wt-amount { font-size: 0.68rem; color: #15803d; }
      .sc-wt-bottles { color: #92400e; font-size: 0.68rem; }
      .sc-wt-avg { color: #0369a1; font-size: 0.62rem; font-style: italic; }
      .sc-wt-yoy { margin-top: 1px; }

      .sc-day-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1px; }
      .sc-day-num { font-size: 0.8rem; color: var(--text, #111); }
      .sc-day-num.sc-sun { color: #ef4444; }
      .sc-day-num.sc-sat { color: #3b82f6; }
      .sc-badge { font-size: 0.65rem; background: var(--primary, #0F5B8D); color: #fff; border-radius: 10px; padding: 1px 5px; }

      .sc-cities { display: flex; flex-wrap: wrap; gap: 2px; margin-top: 1px; }
      .sc-city-tag { font-size: 0.6rem; background: #e0f2fe; color: #0369a1; border-radius: 4px; padding: 1px 4px; display: flex; align-items: center; gap: 2px; }
      .sc-city-tag em { font-style: normal; font-weight: 700; }
      .sc-city-more { font-size: 0.6rem; color: var(--text-muted, #6b7280); }

      .sc-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; gap: 12px; color: var(--text-muted, #6b7280); }

      .sc-detail-col { padding: 16px; overflow-y: auto; max-height: 600px; }
      .sc-detail-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted, #6b7280); font-size: 0.9rem; text-align: center; padding: 40px 20px; }
      .sc-detail-close { display: none; }

      .sc-detail-date { font-size: 1rem; font-weight: 700; margin: 0 0 4px; }
      .sc-detail-meta { font-size: 0.8rem; color: var(--text-muted, #6b7280); margin-bottom: 12px; }
      .sc-detail-yoy { font-size: 0.8rem; margin-bottom: 8px; padding: 6px 8px; background: #f9fafb; border-radius: 6px; border: 1px solid var(--border, #e5e7eb); }
      .sc-city-section { margin-bottom: 12px; }
      .sc-city-label { font-size: 0.75rem; font-weight: 700; color: var(--primary, #0F5B8D); border-bottom: 1px solid #dbeafe; padding-bottom: 4px; margin-bottom: 6px; }
      .sc-customer-row { padding: 4px 0; font-size: 0.8rem; border-bottom: 1px solid var(--border, #e5e7eb); }
      .sc-customer-main { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
      .sc-customer-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .sc-customer-amt { flex-shrink: 0; color: var(--text-muted, #6b7280); font-size: 0.75rem; }
      .sc-customer-vols { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 2px; }
      .sc-vol-badge { font-size: 0.65rem; background: #fef3c7; color: #92400e; border-radius: 3px; padding: 1px 4px; display: flex; align-items: center; gap: 2px; }
      .sc-vol-badge em { font-style: normal; font-weight: 700; }
      .sc-day-volumes { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; padding: 8px; background: #fffbeb; border-radius: 6px; border: 1px solid #fde68a; }
      .sc-vol-tag { font-size: 0.8rem; color: #78350f; }
      .sc-vol-tag strong { margin-left: 2px; }

      @media (max-width: 640px) {
        .sc-header { padding: 10px 12px 8px; }
        .sc-title { font-size: 0.95rem; }
        .sc-title-row { margin-bottom: 6px; gap: 8px; }
        .sc-month-summary { font-size: 0.75rem; }
        .sc-nav-btn { padding: 3px 10px; }
        .sc-month-label { font-size: 0.9rem; min-width: 80px; }

        .sc-body { grid-template-columns: 1fr; min-height: unset; }
        .sc-calendar-col { padding: 6px 8px; border-right: none; }
        .sc-weekdays-8 { grid-template-columns: repeat(7, 1fr) 56px; }
        .sc-wd-summary-row { grid-template-columns: repeat(7, 1fr) 56px; }
        .sc-grid-8 { grid-template-columns: repeat(7, 1fr) 56px; }
        .sc-weekday { font-size: 0.7rem; padding: 2px 0; }

        .sc-cell { min-height: 48px; padding: 2px 3px; border-radius: 4px; }
        .sc-day-num { font-size: 0.75rem; }
        .sc-badge { font-size: 0.6rem; padding: 1px 4px; }
        .sc-cities { display: none; }
        .sc-wd-summary-row { display: none; }
        .sc-day-yoy { display: none; }

        .sc-detail-col { display: none; }
        .sc-detail-col.sc-detail-active {
          display: block; position: fixed;
          bottom: 0; left: 0; right: 0; background: #fff;
          border-top: 2px solid var(--primary, #0F5B8D);
          border-radius: 16px 16px 0 0;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.18);
          max-height: 50vh; overflow-y: auto;
          padding: 12px 16px 20px; z-index: 200;
        }
        .sc-detail-close {
          display: block; width: 100%; margin-top: 12px; padding: 8px;
          background: var(--bg-subtle, #f3f4f6); border: 1px solid var(--border, #e5e7eb);
          border-radius: 8px; font-size: 0.85rem; cursor: pointer; color: var(--text-muted, #6b7280);
        }
      }
    </style>
  `}function Qm(e){return e.length?e.map(t=>`<span class="sc-vol-badge">${t.label}<em>${t.bottles}</em></span>`).join(""):""}function Wm(e,t){const n=e.date.replace(/-/g,"/").slice(5),s=e.totalVolumes.length?`<div class="sc-day-volumes">${e.totalVolumes.map(y=>`<span class="sc-vol-tag">${y.label} <strong>${y.bottles}本</strong></span>`).join("")}</div>`:"",r=t?.totalAmount??0,i=t?.count??0,c=e.totalAmount>0||r>0?`<div class="sc-detail-yoy">
        前年同日: ${i}件 / ¥${r.toLocaleString()}
        ${kt(e.totalAmount,r)}
      </div>`:"",d={};for(const y of e.entries)(d[y.city]??=[]).push(y);const u=Object.entries(d).sort((y,h)=>h[1].length-y[1].length).map(([y,h])=>{const g=h.sort(($,_)=>_.amount-$.amount).map($=>`
          <div class="sc-customer-row">
            <div class="sc-customer-main">
              <span class="sc-customer-name" title="${$.customerName}">${$.customerName}</span>
              <span class="sc-customer-amt">${$.amount>0?`¥${$.amount.toLocaleString()}`:"-"}${$.invoiceCount>1?` (${$.invoiceCount}伝票)`:""}</span>
            </div>
            ${$.volumes.length?`<div class="sc-customer-vols">${Qm($.volumes)}</div>`:""}
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${y}（${h.length}先）</div>
          ${g}
        </div>`}).join("");return`
    <p class="sc-detail-date">${n}の出荷</p>
    <p class="sc-detail-meta">${e.entries.length}先 ${e.count}伝票 / ¥${e.totalAmount.toLocaleString()}</p>
    ${c}
    ${s}
    ${u}
  `}const Gm=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),pn=["月","火","水","木","金"],Xs=6;function Xm(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function Zm(e,t){if(t.length===0)return 0;const n=[...t].sort((r,i)=>r-i);return n.filter(r=>r<=e).length/n.length}function ey(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function Zs(e){const t=new Date,n=e.map(u=>u.annualRevenue),s=e.map(u=>{const y=Xm(u.lastOrderDate,t);let h=0;const g=[];y>=60&&(h+=50,g.push("離反リスク")),u.hasSeasonalProposal&&(h+=30,g.push("季節提案タイミング")),y>=30&&y<60&&(h+=20,g.push("定期巡回"));const $=Zm(u.annualRevenue,n),_=Math.round($*20);_>0&&(h+=_,g.push("金額ウェイト"));const S=ey(g,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:h,reasons:g,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:S}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),r=new Map;for(const u of s){const y=u.areaCode||"その他";r.has(y)||r.set(y,[]),r.get(y).push(u)}const i=[...r.entries()].sort((u,y)=>y[1].reduce((h,g)=>h+g.priorityScore,0)-u[1].reduce((h,g)=>h+g.priorityScore,0)),c=[];let d=0;for(const[u,y]of i){const h=y.sort((g,$)=>$.priorityScore-g.priorityScore);for(let g=0;g<h.length&&!(d>=pn.length);g+=Xs){const $=h.slice(g,g+Xs);c.push({dayLabel:pn[d],area:u,visits:$}),d++}if(d>=pn.length)break}return{candidates:s,weekPlan:c,filterArea:"",filterMinScore:0}}function ty(e){const{candidates:t,weekPlan:n,filterArea:s,filterMinScore:r}=e,i=t.filter(g=>!(s&&g.areaCode!==s||r>0&&g.priorityScore<r)),c=Array.from(new Set(t.map(g=>g.areaCode))).sort(),d=i.length,u=i.filter(g=>g.priorityScore>=50).length,y=i.filter(g=>g.reasons.includes("離反リスク")).length,h=n.reduce((g,$)=>g+$.visits.length,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業支援</p>
        <h1>訪問計画 / ルート最適化</h1>
      </div>
      <div class="meta-stack">
        <button class="button secondary" data-action="refresh-analytics" style="min-height:36px;">⟳ データ更新</button>
      </div>
    </section>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">${d}</div>
        <div>訪問候補</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${u}</div>
        <div>高優先度 (50+)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${y}</div>
        <div>離反リスク</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${h}</div>
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
            ${c.map(g=>`<option value="${g}"${s===g?" selected":""}>${g}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":ay(n)}
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
            ${i.map(g=>ny(g)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function ay(e){return`
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
  `}function ny(e){return`
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
      <td class="numeric">${Gm.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function va(e){return e.toLocaleString("ja-JP")}function sy(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=e.map(y=>{const h=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
      <tr data-tank-id="${y.id}">
        <td class="mono"><strong>${y.tankNo}</strong></td>
        <td>${y.displayName||"―"}</td>
        <td class="numeric">${y.depthMm>0?va(y.depthMm):"―"}</td>
        <td class="numeric">${y.capacity>0?va(y.capacity):"―"}</td>
        <td class="numeric">${y.litersPerMm>0?y.litersPerMm.toFixed(2):"―"}</td>
        <td class="numeric">${y.currentVolume>0?va(y.currentVolume):"―"}</td>
        <td>
          <div class="progress-wrap"><div class="progress-bar" style="width:${h}%"></div></div>
          <span class="progress-label">${h}%</span>
        </td>
        <td><span class="status-pill ${n[y.status]}">${t[y.status]}</span></td>
        <td style="white-space:nowrap;">
          <button class="button-sm secondary" data-action="tank-edit" data-tank-id="${y.id}" style="margin-right:4px;">編集</button>
          <button class="button-sm" data-action="tank-delete" data-tank-id="${y.id}" style="color:#ef4444;border-color:#fca5a5;">削除</button>
        </td>
      </tr>`}).join(""),r=e.filter(y=>y.status==="in_use").length,i=e.filter(y=>y.status==="aging").length,c=e.filter(y=>y.status==="empty").length,d=e.reduce((y,h)=>y+h.capacity,0),u=e.reduce((y,h)=>y+h.currentVolume,0);return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>タンク管理</h1></div>
      <button class="button primary" data-action="tank-show-add">＋ タンク登録</button>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${va(d)} L</p>
        <p class="kpi-sub">使用率 ${d>0?Math.round(u/d*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${r} 基</p>
        <p class="kpi-sub">熟成中 ${i} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${c} 基</p>
        <p class="kpi-sub">登録 ${e.length} 基</p>
      </article>
    </section>

    <div id="tank-form-area"></div>

    <section class="panel">
      <div class="panel-header">
        <h2>タンク一覧</h2>
        <p class="panel-caption">${e.length} 基</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>容器番号</th>
              <th>容器名</th>
              <th class="numeric">容器深(mm)</th>
              <th class="numeric">容量(L)</th>
              <th class="numeric">L/mm</th>
              <th class="numeric">現在量</th>
              <th>充填率</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="9" class="empty-row">タンクが登録されていません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function eo(e){const t=!!e;return`
    <section class="panel" style="margin-bottom:16px;border:2px solid #2563eb;">
      <div class="panel-header"><h2>${t?"タンク編集":"タンク登録"}</h2></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;padding:8px 0;font-size:12px;">
        <input type="hidden" id="tank-edit-id" value="${e?.id??""}">
        <label>容器番号<br><input id="tank-f-no" type="text" value="${e?.tankNo??""}" placeholder="1号" style="width:60px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>容器名<br><input id="tank-f-name" type="text" value="${e?.displayName??""}" placeholder="醸造タンク1" style="width:120px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>容器深(mm)<br><input id="tank-f-depth" type="number" step="1" value="${e?.depthMm??""}" placeholder="1500" style="width:80px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>容量(L)<br><input id="tank-f-cap" type="number" step="1" value="${e?.capacity??""}" placeholder="3000" style="width:80px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>L/mm<br><input id="tank-f-lpmm" type="number" step="0.01" value="${e?.litersPerMm??""}" placeholder="2.00" style="width:70px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>備考<br><input id="tank-f-remarks" type="text" value="${e?.remarks??""}" placeholder="" style="width:140px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <button class="button primary" data-action="tank-save" style="font-size:12px;padding:6px 16px;">${t?"更新":"登録"}</button>
        <button class="button secondary" data-action="tank-cancel" style="font-size:12px;padding:6px 12px;">キャンセル</button>
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin-top:4px;">容器深 ÷ 容量 で L/mm を自動計算できます</p>
    </section>`}function oy(e){return e.toLocaleString("ja-JP")}const to={transfer:"タンク移動",receive:"受入",ship:"出荷・移出",blend:"ブレンド",discard:"廃棄",adjust:"調整"},ry={transfer:"#2563eb",receive:"#059669",ship:"#d97706",blend:"#7c3aed",discard:"#ef4444",adjust:"#6b7280"};function iy(e,t,n=""){const s=n?e.filter(h=>h.fromTankNo===n||h.toTankNo===n):e,r=new Map,i=[...e].sort((h,g)=>h.movementDate.localeCompare(g.movementDate));for(const h of i)h.fromTankNo&&r.set(h.fromTankNo,(r.get(h.fromTankNo)??0)-h.volumeL),h.toTankNo&&r.set(h.toTankNo,(r.get(h.toTankNo)??0)+h.volumeL);const c=t.map(h=>`<option value="${h.tankNo}" ${h.tankNo===n?"selected":""}>${h.tankNo}${h.displayName?` (${h.displayName})`:""}</option>`).join(""),d=Object.entries(to).map(([h,g])=>`<option value="${h}">${g}</option>`).join("");let u=0;const y=s.map(h=>{const g=ry[h.movementType]??"#6b7280",$=n&&h.toTankNo===n,_=n&&h.fromTankNo===n;return n&&(u+=$?h.volumeL:_?-h.volumeL:0),`<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:6px 8px;font-size:12px;white-space:nowrap;">${h.movementDate}</td>
      <td style="padding:6px 8px;"><span style="font-size:10px;padding:2px 6px;border-radius:3px;background:${g}15;color:${g};font-weight:600;">${to[h.movementType]}</span></td>
      <td style="padding:6px 8px;font-size:12px;font-weight:600;${_?"color:#ef4444;":""}">${h.fromTankNo||"―"}</td>
      <td style="padding:6px 4px;font-size:12px;color:#9ca3af;">→</td>
      <td style="padding:6px 8px;font-size:12px;font-weight:600;${$?"color:#059669;":""}">${h.toTankNo||"―"}</td>
      <td style="padding:6px 8px;font-size:13px;font-weight:700;text-align:right;">${oy(h.volumeL)} L</td>
      <td style="padding:6px 8px;font-size:11px;">${h.productName||"―"}</td>
      <td style="padding:6px 8px;font-size:11px;color:#6b7280;">${h.batchCode||""}</td>
      <td style="padding:6px 8px;font-size:11px;">${h.alcoholDegree!=null?h.alcoholDegree+"%":""}</td>
      <td style="padding:6px 8px;font-size:11px;">${h.temperature!=null?h.temperature+"℃":""}</td>
      <td style="padding:6px 8px;font-size:10px;color:#6b7280;">${h.recordedBy||""}</td>
      <td style="padding:6px 8px;font-size:10px;color:#6b7280;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${h.notes||""}</td>
      <td style="padding:6px 4px;"><button data-action="tm-delete" data-id="${h.id}" style="font-size:9px;padding:2px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
    </tr>`}).join("");return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>移動簿</h1></div>
      <div style="display:flex;gap:8px;">
        <button class="button secondary" data-action="tm-print">印刷</button>
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>移動記録</h2><p class="panel-caption">タンク間の酒の移動をすべて記録</p></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;padding:8px 0;font-size:12px;border-bottom:1px solid var(--border);margin-bottom:12px;">
        <label>日付<br><input id="tm-date" type="date" value="${new Date().toISOString().slice(0,10)}" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>種別<br><select id="tm-type" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;">${d}</select></label>
        <label>移動元<br><select id="tm-from" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"><option value="">（なし）</option>${c}</select></label>
        <label>移動先<br><select id="tm-to" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"><option value="">（なし）</option>${c}</select></label>
        <label>数量(L)<br><input id="tm-vol" type="number" step="1" placeholder="0" style="width:70px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>銘柄<br><input id="tm-product" type="text" placeholder="" style="width:100px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>仕込番号<br><input id="tm-batch" type="text" placeholder="" style="width:80px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>度数<br><input id="tm-alc" type="number" step="0.1" placeholder="%" style="width:50px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>温度<br><input id="tm-temp" type="number" step="0.1" placeholder="℃" style="width:50px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>メモ<br><input id="tm-notes" type="text" placeholder="" style="width:100px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <button class="button primary" data-action="tm-add" style="font-size:12px;padding:6px 16px;">記録</button>
      </div>

      <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
        <label style="font-size:12px;">タンク絞込:
          <select data-action="tm-filter-tank" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <option value="">全て</option>
            ${c}
          </select>
        </label>
        ${n?`<span style="font-size:12px;color:#2563eb;font-weight:600;">${n} の移動履歴（${s.length}件）</span>`:""}
      </div>

      <div id="tm-table" class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:10px;color:#6b7280;text-align:left;">
            <th style="padding:4px 8px;">日付</th>
            <th style="padding:4px 8px;">種別</th>
            <th style="padding:4px 8px;">移動元</th>
            <th style="padding:4px 4px;"></th>
            <th style="padding:4px 8px;">移動先</th>
            <th style="padding:4px 8px;text-align:right;">数量</th>
            <th style="padding:4px 8px;">銘柄</th>
            <th style="padding:4px 8px;">仕込</th>
            <th style="padding:4px 8px;">度数</th>
            <th style="padding:4px 8px;">温度</th>
            <th style="padding:4px 8px;">記録者</th>
            <th style="padding:4px 8px;">メモ</th>
            <th></th>
          </tr></thead>
          <tbody>${y||'<tr><td colspan="13" style="padding:20px;text-align:center;color:#9ca3af;">移動記録がありません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function un(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ly(e){if(e.length===0)return`<section class="panel">
      <div class="panel-header">
        <div>
          <h2>移出量集計（販売実績ベース）</h2>
          <p class="panel-caption">当月の販売伝票から自動集計した移出量と概算税額</p>
        </div>
      </div>
      <p class="empty-message">データなし — 商品マスタに volume_ml が設定されていることを確認してください。</p>
    </section>`;const t=e.reduce((c,d)=>c+d.volumeSaleL,0),n=e.reduce((c,d)=>c+d.volumeReturnL,0),s=e.reduce((c,d)=>c+d.volumeNetL,0),r=e.reduce((c,d)=>c+d.taxAmount,0);return`<section class="panel">
    <div class="panel-header">
      <div>
        <h2>移出量集計（販売実績ベース）</h2>
        <p class="panel-caption">当月の販売伝票から自動集計した移出量と概算税額（輸出は別途入力、軽減税率は申告書側で調整）</p>
      </div>
    </div>
    <div class="table-wrap">
      <table class="entry-table">
        <thead>
          <tr>
            <th>酒類区分</th>
            <th class="numeric">度数</th>
            <th class="numeric">移出量(L)</th>
            <th class="numeric">戻り(L)</th>
            <th class="numeric">輸出(L)</th>
            <th class="numeric">純移出量(L)</th>
            <th class="numeric">税率</th>
            <th class="numeric">概算税額</th>
          </tr>
        </thead>
        <tbody>${e.map(c=>{const d=c.alcDegree!==null?`${c.alcDegree}度`:'<span class="text-warning">未設定</span>',u=c.taxRatePerKl!==null?`${c.taxRatePerKl.toLocaleString("ja-JP")} 円/KL`:'<span class="text-warning">度数未設定</span>',y=c.taxRatePerKl!==null?`<strong>${c.taxAmount.toLocaleString("ja-JP")} 円</strong>`:'<span class="text-warning">—</span>';return`<tr>
      <td>${c.sakeType}</td>
      <td class="numeric">${d}</td>
      <td class="numeric">${c.volumeSaleL.toLocaleString("ja-JP",{maximumFractionDigits:3})}</td>
      <td class="numeric text-warning">${c.volumeReturnL>0?c.volumeReturnL.toLocaleString("ja-JP",{maximumFractionDigits:3}):"—"}</td>
      <td class="numeric">—</td>
      <td class="numeric">${c.volumeNetL.toLocaleString("ja-JP",{maximumFractionDigits:3})}</td>
      <td class="numeric">${u}</td>
      <td class="numeric">${y}</td>
    </tr>`}).join("")}</tbody>
        <tfoot>
          <tr>
            <th colspan="2">合計</th>
            <th class="numeric">${t.toLocaleString("ja-JP",{maximumFractionDigits:3})}</th>
            <th class="numeric">${n>0?n.toLocaleString("ja-JP",{maximumFractionDigits:3}):"—"}</th>
            <th class="numeric">—</th>
            <th class="numeric">${s.toLocaleString("ja-JP",{maximumFractionDigits:3})}</th>
            <th></th>
            <th class="numeric"><strong>${r.toLocaleString("ja-JP")} 円</strong></th>
          </tr>
        </tfoot>
      </table>
    </div>
    <p class="form-hint" style="margin-top: 8px;">
      度数が「未設定」のリキュールは税額を計算できません。商品マスタの <code>alcohol_degree</code> を更新してください。
    </p>
  </section>`}function cy(e,t,n,s=[]){const r=e.rows.map((h,g)=>`
      <tr>
        <td class="mono">${h.taxCategory}</td>
        <td>${h.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${g}" data-tax-field="alcoholDegree" value="${h.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="productionVolume" value="${h.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="previousBalance" value="${h.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="exportDeduction" value="${h.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="sampleDeduction" value="${h.sampleDeduction}" />
        </td>
        <td class="numeric">${h.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${h.taxRate}</td>
        <td class="numeric"><strong>${un(h.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=e.deductions.map((h,g)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="type">
            ${Object.keys(wn).map($=>`<option value="${$}" ${$===h.type?"selected":""}>${wn[$]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="categoryCode">
            ${Uo.map($=>`<option value="${$.code}" ${$.code===h.categoryCode?"selected":""}>${$.code}:${$.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${g}" data-ded-field="volume" value="${h.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${g}" data-ded-field="reason" value="${h.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${g}" data-ded-field="documentNo" value="${h.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),c=Array.from({length:12},(h,g)=>g+1),d=e.rows.reduce((h,g)=>h+g.exportDeduction+g.sampleDeduction,0),u=e.rows.reduce((h,g)=>h+g.productionVolume,0),y=u>0?d/u*100:0;return`
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
            ${[2025,2026,2027].map(h=>`<option value="${h}" ${t===h?"selected":""}>${h}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${c.map(h=>`<option value="${h}" ${n===h?"selected":""}>${h}月</option>`).join("")}
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
        <p class="kpi-value">${un(e.totalTax)}</p>
        <p class="kpi-sub">${e.targetYear}年${e.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${e.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${d.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.deductions.length} 件</p>
      </article>
      <article class="panel kpi-card ${y>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${y.toFixed(1)}%</p>
        <p class="kpi-sub">${y>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
          <tbody>${r||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${un(e.totalTax)}</th>
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
          <tbody>${i||'<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>'}</tbody>
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

    ${ly(s)}

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
  `}const rs=[{title:"販売業務",color:"#1a56db",features:[{id:"invoice-entry",route:"/invoice-entry",label:"伝票入力",desc:"売上・返品伝票の新規入力、明細追加",addedVersion:1},{id:"invoice-browse",route:"/invoice",label:"伝票照会",desc:"過去伝票の検索・表示・PDF出力",addedVersion:1},{id:"delivery-note",route:"/delivery",label:"納品書発行",desc:"納品書のPDFダウンロード・印刷",addedVersion:1},{id:"billing-monthly",route:"/billing",label:"月次請求",desc:"請求書発行・入金消込・未収管理",addedVersion:1},{id:"ledger-view",route:"/ledger",label:"得意先台帳",desc:"得意先別の取引履歴・残高確認",addedVersion:1},{id:"quote-create",route:"/quote",label:"見積作成",desc:"見積書の作成・PDF出力・メール送付",addedVersion:50},{id:"shipment-calendar",route:"/shipment-calendar",label:"配送カレンダー",desc:"伝票日付ベースの配送スケジュール確認",addedVersion:200}]},{title:"分析・レポート",color:"#7e3af2",features:[{id:"analytics-monthly",route:"/analytics",label:"月次売上グラフ",desc:"月次・商品別・得意先別の売上推移グラフ",addedVersion:1},{id:"analytics-volume",route:"/analytics",label:"移出量集計",desc:"商品・得意先別の移出量（mL）集計",addedVersion:320},{id:"customer-analysis",route:"/customer-analysis",label:"得意先分析",desc:"ABC分析・購買頻度・LTV",addedVersion:100},{id:"product-power",route:"/product-power",label:"商品力分析",desc:"商品別販売力・成長率",addedVersion:100},{id:"customer-efficiency",route:"/customer-efficiency",label:"営業効率",desc:"訪問コスト・粗利効率",addedVersion:150},{id:"report-aggregate",route:"/report",label:"集計帳票",desc:"各種集計レポートの出力",addedVersion:50},{id:"sales-list",route:"/sales",label:"売上一覧",desc:"売上明細の一覧表示・CSV出力",addedVersion:1}]},{title:"営業・顧客管理",color:"#0e9f6e",features:[{id:"churn-alert",route:"/churn-alert",label:"営業アクション",desc:"離反リスク検知・フォロー優先度",addedVersion:150},{id:"visit-planner",route:"/visit-planner",label:"訪問計画",desc:"訪問スケジュールの作成・管理",addedVersion:200},{id:"map-view",route:"/map",label:"取引先マップ",desc:"地図上で取引先の位置確認",addedVersion:100},{id:"prospects",route:"/prospects",label:"新規営業",desc:"新規開拓リストの進捗管理",addedVersion:100},{id:"email-broadcast",route:"/email",label:"メール配信",desc:"一斉メール配信・テンプレート管理",addedVersion:200},{id:"seasonal-calendar",route:"/seasonal-calendar",label:"季節提案",desc:"季節別提案スケジュール管理",addedVersion:250}]},{title:"受注・仕入",color:"#e3a008",features:[{id:"workflow-order",route:"/workflow",label:"受注ワークフロー",desc:"受注から出荷までのステータス管理",addedVersion:150},{id:"shopify-orders",route:"/shopify",label:"Shopify受注",desc:"EC受注の確認・取込",addedVersion:200},{id:"purchase-manage",route:"/purchase",label:"仕入・買掛",desc:"仕入管理・買掛金残高",addedVersion:100},{id:"payment-status",route:"/payment",label:"入金状況",desc:"入金・回収状況の一覧",addedVersion:1}]},{title:"製造管理",color:"#e02424",features:[{id:"jikomi-record",route:"/jikomi",label:"仕込管理",desc:"仕込帳・麹室・タンク仕込記録",addedVersion:200},{id:"tanks-manage",route:"/tanks",label:"タンク管理",desc:"タンク別在庫・ブレンド管理",addedVersion:200},{id:"tax-declaration",route:"/tax",label:"酒税申告書",desc:"課税移出・控除明細・eTax XML出力",addedVersion:250},{id:"tax-volume",route:"/tax",label:"移出量自動集計",desc:"販売伝票から清酒・リキュール別移出量を自動計算",addedVersion:322},{id:"demand-forecast",route:"/demand",label:"需要予測",desc:"過去実績ベースの需要予測",addedVersion:250},{id:"brewing-plan",route:"/brewing-plan",label:"醸造計画",desc:"年間醸造スケジュール管理",addedVersion:280},{id:"procurement-plan",route:"/procurement",label:"調達計画",desc:"原料米の調達・予算管理",addedVersion:280},{id:"brewing-process",route:"/brewing-process",label:"醸造工程",desc:"バッチ別工程管理・麹室制約チェック",addedVersion:300}]},{title:"マスタ・設定",color:"#6b7280",features:[{id:"master-products",route:"/master",label:"商品マスタ",desc:"商品情報の参照・編集",addedVersion:1},{id:"master-customers",route:"/master",label:"得意先マスタ",desc:"得意先情報の参照・編集",addedVersion:1},{id:"store-pos",route:"/store",label:"店舗販売",desc:"直売所のPOS・販売記録",addedVersion:250},{id:"tour-booking",route:"/tour",label:"酒蔵見学予約",desc:"見学予約の受付・管理",addedVersion:250},{id:"relay-status",route:"/setup",label:"連動状態",desc:"酒仙iとのリレー同期状態確認",addedVersion:1},{id:"csv-import",route:"/import",label:"CSV取込",desc:"マスタ・売上データのCSVインポート",addedVersion:100},{id:"user-manage",route:"/users",label:"ユーザー管理",desc:"アカウント・権限管理",addedVersion:100},{id:"url-share",route:"/",label:"URL共有",desc:"PWAモードでも全ページをURLで共有可能",addedVersion:322}]}];function ao(){return rs.flatMap(e=>e.features)}function dy(e,t){const n=Date.now()-2592e6;return rs.flatMap(s=>s.features).filter(s=>s.route===e).some(s=>{const r=t[s.id];return r?.confirmedAt!=null&&new Date(r.confirmedAt).getTime()>n})}function py(e,t){const s=ao().filter(c=>e[c.id]?.confirmedAt).length,r=ao().length,i=rs.map(c=>{const d=c.features.map(y=>{const h=e[y.id],g=!!h?.confirmedAt,$=h?.confirmedAt?new Date(h.confirmedAt).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}):"",_=h?.confirmedBy?`(${h.confirmedBy})`:"",S=g&&h?.confirmedAt?Date.now()-new Date(h.confirmedAt).getTime()<720*60*60*1e3:!1;return`
        <tr class="feature-row ${g?"confirmed":""}">
          <td class="feature-check">
            <input type="checkbox" class="feature-checkbox" data-feature-id="${y.id}"
              ${g?"checked":""} />
          </td>
          <td class="feature-label">
            <a href="#" data-link="${y.route}" class="feature-link">${y.label}</a>
            ${S?'<span class="badge-new-small">使用可能</span>':""}
          </td>
          <td class="feature-desc">${y.desc}</td>
          <td class="feature-version mono">v${y.addedVersion}</td>
          <td class="feature-status">
            ${g?`<span class="status-pill success">確認済 ${$} ${_}</span>`:'<span class="status-pill muted">未確認</span>'}
          </td>
        </tr>`}).join(""),u=c.features.filter(y=>e[y.id]?.confirmedAt).length;return`
      <section class="panel changelog-section">
        <div class="panel-header">
          <h2 style="border-left: 3px solid ${c.color}; padding-left: 10px">${c.title}</h2>
          <span class="changelog-progress">${u} / ${c.features.length}</span>
        </div>
        <div class="table-wrap">
          <table class="entry-table changelog-table">
            <thead>
              <tr>
                <th style="width:40px"></th>
                <th>機能</th>
                <th>概要</th>
                <th class="mono" style="width:60px">追加</th>
                <th style="width:160px">状態</th>
              </tr>
            </thead>
            <tbody>${d}</tbody>
          </table>
        </div>
      </section>`}).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動・更新履歴</p>
        <h1>機能一覧</h1>
      </div>
      <div class="meta-stack">
        <span class="version-badge">v1</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">現在バージョン</p>
        <p class="kpi-value mono">v1</p>
        <p class="kpi-sub">git push ごとにカウント</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">確認済み機能</p>
        <p class="kpi-value">${s} / ${r}</p>
        <p class="kpi-sub">${Math.round(s/r*100)}% 動作確認完了</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">確認中ユーザー</p>
        <p class="kpi-value" style="font-size:1.2rem">${t}</p>
        <p class="kpi-sub">チェックで確認済みに記録</p>
      </article>
    </section>

    <div class="changelog-hint">
      チェックを入れると「使用可能」として記録されます。HOME画面のカードには確認済みの機能に <span class="badge-new-small">使用可能</span> タグが表示されます。
    </div>

    ${i}
  `}const uy={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let pt=null,my=0;const Cn=[];function yy(){return pt&&document.body.contains(pt)||(pt=document.createElement("div"),pt.className="toast-container",document.body.appendChild(pt)),pt}function F(e,t="success",n){const s=yy(),r=++my,i=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${uy[t]}</span>
    <span class="toast-msg">${fy(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const d={id:r,message:e,type:t,el:c};Cn.push(d),s.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>hy(d);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},i)}function hy(e){const t=Cn.indexOf(e);t!==-1&&(Cn.splice(t,1),e.el.remove())}function fy(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let Ue="closed",Aa="",ht="",Dn=[],Gt=!1;const mn=[{id:"usage",icon:"💬",label:"使い方の質問",desc:"操作方法や機能について"},{id:"request",icon:"🔧",label:"改修・機能要望",desc:"新機能や改善の要望"},{id:"bug",icon:"🐛",label:"不具合の報告",desc:"動作がおかしい場合"},{id:"other",icon:"📝",label:"その他",desc:"上記に当てはまらない場合"}];function zr(){let e=document.getElementById("chat-widget-root");return e||(e=document.createElement("div"),e.id="chat-widget-root",document.body.appendChild(e)),e}function gy(){if(Ue==="closed")return`
      <button class="cw-fab" id="cw-fab" aria-label="サポート">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </button>`;let e="";return Ue==="home"&&(e=`
      <div class="cw-home">
        <p class="cw-subtitle">どのようなご用件ですか？</p>
        <div class="cw-categories">${mn.map(n=>`
      <button class="cw-category-card" data-cw-cat="${n.id}">
        <span class="cw-cat-icon">${n.icon}</span>
        <div>
          <span class="cw-cat-label">${n.label}</span>
          <span class="cw-cat-desc">${n.desc}</span>
        </div>
      </button>
    `).join("")}</div>
        <button class="cw-history-link" id="cw-show-history">過去の問い合わせを見る</button>
      </div>`),Ue==="form"&&(e=`
      <div class="cw-form">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-form-cat">${mn.find(n=>n.id===Aa)?.label??""}</p>
        <textarea class="cw-textarea" id="cw-message" rows="5"
          placeholder="内容を入力してください…">${ht}</textarea>
        <button class="cw-submit button primary" id="cw-submit"
          ${Gt?"disabled":""}>
          ${Gt?"送信中…":"送信する"}
        </button>
      </div>`),Ue==="history"&&(e=`
      <div class="cw-history">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-subtitle">過去の問い合わせ</p>
        <div class="cw-ticket-list">${Dn.length===0?'<p class="cw-empty">まだ問い合わせはありません</p>':Dn.map(n=>{const s=mn.find(d=>d.id===n.category),r=n.created_at?new Date(n.created_at).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",i=n.status==="open"?"受付中":n.status==="in_progress"?"対応中":"完了",c=n.status==="open"?"open":n.status==="in_progress"?"progress":"done";return`
            <div class="cw-ticket">
              <div class="cw-ticket-head">
                <span class="cw-ticket-cat">${s?.icon??""} ${s?.label??n.category}</span>
                <span class="cw-ticket-status ${c}">${i}</span>
              </div>
              <p class="cw-ticket-msg">${no(n.message)}</p>
              ${n.admin_reply?`<div class="cw-ticket-reply"><strong>回答:</strong> ${no(n.admin_reply)}</div>`:""}
              <span class="cw-ticket-date">${r}</span>
            </div>`}).join("")}</div>
      </div>`),`
    <div class="cw-panel">
      <div class="cw-header">
        <span class="cw-header-title">サポート</span>
        <button class="cw-close" id="cw-close" aria-label="閉じる">&times;</button>
      </div>
      <div class="cw-body">${e}</div>
    </div>`}function vy(){const e=zr();e.querySelector("#cw-fab")?.addEventListener("click",()=>{Ue="home",Ze()}),e.querySelector("#cw-close")?.addEventListener("click",()=>{Ue="closed",ht="",Ze()}),e.querySelectorAll("[data-cw-cat]").forEach(t=>{t.addEventListener("click",()=>{Aa=t.dataset.cwCat??"",ht="",Ue="form",Ze(),e.querySelector("#cw-message")?.focus()})}),e.querySelector("#cw-back-home")?.addEventListener("click",()=>{Ue="home",Ze()}),e.querySelector("#cw-message")?.addEventListener("input",t=>{ht=t.target.value}),e.querySelector("#cw-submit")?.addEventListener("click",async()=>{if(!ht.trim()||Gt)return;Gt=!0,Ze();const t=await Ae("support_tickets",{category:Aa,message:ht.trim(),user_email:oo(),status:"open"});Gt=!1,t?(F("送信しました。ありがとうございます！"),ht="",Aa="",Ue="home"):F("送信に失敗しました","error"),Ze()}),e.querySelector("#cw-show-history")?.addEventListener("click",async()=>{Dn=await Y("support_tickets",{user_email:`eq.${oo()}`,order:"created_at.desc",limit:"20"}),Ue="history",Ze()})}function Ze(){const e=zr();e.innerHTML=gy(),vy()}function no(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let so=!1;function oo(){return go()?.email??"anonymous"}function by(){so&&document.getElementById("chat-widget-root")||(so=!0,Ze())}function Me(e,t={}){const{title:n="確認",confirmLabel:s="OK",cancelLabel:r="キャンセル",variant:i="primary"}=t;return new Promise(c=>{const d=document.createElement("div");d.className="modal-backdrop confirm-backdrop",d.setAttribute("role","dialog"),d.setAttribute("aria-modal","true"),d.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${i}">
            ${i==="danger"?wy:xy}
          </div>
          <h3 class="confirm-title">${ba(n)}</h3>
          <p class="confirm-message">${ba(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${ba(r)}</button>
          <button class="button ${i} confirm-ok">${ba(s)}</button>
        </div>
      </div>
    `;const u=h=>{d.classList.add("confirm-exit"),d.addEventListener("animationend",()=>{d.remove()},{once:!0}),c(h)};d.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),d.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),d.addEventListener("click",h=>{h.target===d&&u(!1)});const y=h=>{h.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(d),requestAnimationFrame(()=>{d.querySelector(".confirm-ok")?.focus()})})}const wy=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,xy=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function ba(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ro(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function qn(e,t,n){if(t.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),i=`\uFEFF${[s.map(y=>ro(y.label)).join(","),...t.map(y=>s.map(h=>ro(y[h.key])).join(","))].join(`\r
`)}`,c=new Blob([i],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(c),u=document.createElement("a");u.href=d,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(d),0)}const $y=Object.fromEntries(ja.map(e=>[e.value,e.label])),_y=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process","/workforce","/changelog"];let Et=[];async function Sy(){const{supabaseQueryAll:e}=await N(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:n}},void 0);Et=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const io=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"},{path:"/tank-movements",title:"移動簿"},{path:"/changelog",title:"機能一覧・更新履歴"}];function Fr(e){const t=Rn[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function is(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),deliveryDate:"",customerCode:"",customerName:"",staffCode:"",registeredBy:"",lines:[],note:""}}function ky(){const e=Fr("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const Fa=new Date,Py=Fa.toISOString().slice(0,7),Ey=Fa.getFullYear(),Ay=Fa.getMonth()+1,Ly=Fa.toISOString().slice(0,10),Cy="C0011",ut=ky();function Vr(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return _y.includes(n)?n:"/"}function Va(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/demand-forecast":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/tank-movements":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":case"/workforce":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":case"/shopify":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":case"/changelog":return"settings";default:return"dashboard"}}const lo=Vr(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,systemHealth:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,analysisTab:"customer",analysisPeriod:"",invoiceForm:is(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",staffList:[],frequentCustomers:[],frequentProducts:[],pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Py,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Ey,taxMonth:Ay,taxVolume:null,featureStatuses:null,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],mapLoaded:!1,callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Tu,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Iu},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Ly,route:lo,currentCategory:Va(lo),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,ledgerCustomerCode:Cy,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Ma($n()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCustomerFilter:"",quoteCustomerFilterName:"",quoteCompanySettings:$n(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyFiscalType:"jan",customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...es},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:ut.mode,emailRegion:ut.region,emailHistorySegment:ut.historySegment,emailTemplateId:ut.templateId,emailSubject:ut.subject,emailBody:ut.body,emailSaveMessage:ut.saveMessage,emailSending:!1,demandForecast:{...Sd},shipmentCalendarData:null,shipmentCalendarPrevYearData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:Kt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:gt,empCapacity:vt},brewingSchedule:[],staffMembers:[],workforceMetrics:null,dailyShiftPlans:[],workforceTab:"staff",staffDeptFilter:"",workforceYearMonth:new Date().toISOString().slice(0,7),shiftBottlingTarget:0,workforceSelectedDay:null,brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,bpSelectedBatchIds:[],bpWorkerSettings:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},bpStepLabor:[],bpTanks:[],tankMovements:[],tankMovementFilter:"",globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function co(e){return e.slice(0,10)}function Dy(e){return{...e}}function Ra(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Yr(){a.invoiceForm=is(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Ra()}function Ur(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,s)=>{n.productCode.trim()||(t[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),t}function qy(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,Dy(t))}function Ty(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,r)=>{const i=r===0?1:2,c=1200*(r+1);return{productCode:s.code,productName:s.name,quantity:i,unitPrice:c,unit:"本",amount:i*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Dt(e){a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,a.invoicePriceGroup=e.priceGroup||"",a.invoiceForm.staffCode=e.staffCode||""}function Iy(e){const t=e.trim().toLowerCase();if(!t)return!1;const n=a.masterStats?.customers.find(r=>r.code.toLowerCase()===t);if(n)return Dt(n),!0;const s=a.masterStats?.customers.filter(r=>r.name.toLowerCase().includes(t)||(r.kanaName||"").toLowerCase().includes(t));return s&&s.length===1?(Dt(s[0]),!0):!1}function My(e){const t=e.trim().toLowerCase();if(!t)return!1;const n=a.masterStats?.customers.find(r=>r.name===e.trim());if(n)return Dt(n),!0;const s=a.masterStats?.customers.filter(r=>r.name.toLowerCase().includes(t)||(r.kanaName||"").toLowerCase().includes(t));return s&&s.length===1?(Dt(s[0]),!0):!1}function Jr(e){if(Fe(e),a.invoiceErrors=Ur(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){A();return}a.invoiceSaving=!0,A(),Ao(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=is(),A()}).catch(()=>{a.invoiceSaving=!1,A()})}function Hr(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((s,r)=>new Date(r.date).getTime()-new Date(s.date).getTime()).filter(s=>{const r=new Date(s.date);return!(t&&r<t||n&&r>n)})}function Kr(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?Et:Et.filter(e=>e.area===a.emailRegion);case"history":return Et.filter(e=>e.historySegment===a.emailHistorySegment);default:return Et}}function Ny(){const e=Kr();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function yn(e){const t=Kr(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(s=>s.email),status:e}}function ls(){return a.user,!1}function Zt(){a.globalSearchOpen=!1,a.globalQuery=""}function Ry(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:io.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:io}}function Oy(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Hr(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((s,r)=>r.balanceAmount-s.balanceAmount).map(s=>({...s})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(s=>({...s})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(s=>({...s})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(s=>({...s})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(s=>({...s})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(s=>({...s}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(s=>({...s}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}qn(n,e,t)}function ft(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=Va(e),a.sidebarOpen=!1,e==="/customer-analysis"&&(a.analysisTab="customer"),e!=="/quote"&&(a.quoteCustomerFilter="",a.quoteCustomerFilterName=""),Zt(),ea(e)}function La(e){const t=a.demandAnalysis,n=a.safetyStockParams;if(!t||n.length===0)return[];const[s,r]=e.split("-"),i=`${parseInt(s)-1}-${r}`,c=t.months.filter(d=>d<e).slice(-3);return n.map(d=>{const u=d.productionType==="make_to_order",y=t.matrix[d.productCode]?.[i]??0,h=c.map(C=>t.matrix[d.productCode]?.[C]??0),g=h.length>0?h.reduce((C,k)=>C+k,0)/h.length:d.avgMonthlyDemand,$=u?0:y>0?Math.ceil(y):Math.ceil(g),_=u?0:Math.ceil(d.safetyStockQty),S=Math.max(0,$+_);return{id:"",yearMonth:e,productCode:d.productCode,productName:d.productName,demandForecast:$,safetyStockTarget:_,openingStock:0,requiredProduction:S,plannedQty:u?0:S,actualQty:0,status:"draft",productionType:d.productionType??"monthly",notes:""}})}async function ea(e,t=!1){t||(a.actionLoading=!0,A());try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,A(),a.quoteList=await Ta(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:n}=await N(async()=>{const{fetchProspects:s}=await Promise.resolve().then(()=>z);return{fetchProspects:s}},void 0);a.prospects=await n()}break;case"/invoice-entry":if(a.staffList.length===0){const{fetchStaffList:n,fetchFrequentCustomers:s,fetchFrequentProducts:r}=await N(async()=>{const{fetchStaffList:u,fetchFrequentCustomers:y,fetchFrequentProducts:h}=await Promise.resolve().then(()=>z);return{fetchStaffList:u,fetchFrequentCustomers:y,fetchFrequentProducts:h}},void 0),[i,c,d]=await Promise.all([n(),s(10),r(10)]);a.staffList=i,a.frequentCustomers=c,a.frequentProducts=d}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await Xt(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await jn());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await zn(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:n}=await N(async()=>{const{fetchShipmentCalendar:y}=await Promise.resolve().then(()=>z);return{fetchShipmentCalendar:y}},void 0),s=a.shipmentCalendarYearMonth,[r,i]=s.split("-").map(Number),c=`${r-1}-${String(i).padStart(2,"0")}`,[d,u]=await Promise.all([n(s),n(c)]);a.shipmentCalendarData=d,a.shipmentCalendarPrevYearData=u;break}case"/billing":a.billingSummary||(a.billingSummary=await Fn(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Lo());break;case"/product-power":case"/product-abc":ft("/customer-analysis"),a.analysisTab="product";return;case"/customer-efficiency":a.customerEfficiency=await Pt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);break;case"/customer-analysis":await Promise.all([To(a.analysisPeriod).then(n=>{a.customerAnalysis=n}),Io(a.analysisPeriod).then(n=>{a.productABC=n})]);break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:n,fetchDeliverySchedule:s}=await N(async()=>{const{fetchDemandForecasts:c,fetchDeliverySchedule:d}=await Promise.resolve().then(()=>z);return{fetchDemandForecasts:c,fetchDeliverySchedule:d}},void 0),[r,i]=await Promise.all([n(),s()]);a.demandForecast.forecasts=r.map(c=>({code:c.productCode,name:c.productName,segment:c.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(c.avgMonthly),adjustedAvg:Math.round(c.avgMonthly),nextMonthForecast:Math.round(c.forecastQuantity),annualForecast:Math.round(c.avgMonthly*12),safetyStock:Math.round(c.safetyStock)})),a.demandForecast.deliveries=kd(i)}break;case"/churn-alert":{const{fetchChurnAlerts:n,fetchChurnNotes:s}=await N(async()=>{const{fetchChurnAlerts:r,fetchChurnNotes:i}=await Promise.resolve().then(()=>z);return{fetchChurnAlerts:r,fetchChurnNotes:i}},void 0);if(!a.churnAlert){const r=await n();a.churnAlert=Tm(r)}a.churnNotes=await s();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:n}=await N(async()=>{const{fetchProductShipmentsFromTable:r}=await Promise.resolve().then(()=>z);return{fetchProductShipmentsFromTable:r}},void 0),s=await n();if(s.length>0)a.seasonalCalendar=Qs(s.map(r=>({code:r.code,name:r.name,category:"",monthlyQuantity:r.monthlyQuantity})));else{const{fetchProductMonthlyShipments:r}=await N(async()=>{const{fetchProductMonthlyShipments:c}=await Promise.resolve().then(()=>z);return{fetchProductMonthlyShipments:c}},void 0),i=await r();a.seasonalCalendar=Qs(i.map(c=>({code:c.code,name:c.name,category:"",monthlyQuantity:c.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:n}=await N(async()=>{const{fetchVisitPriorities:r}=await Promise.resolve().then(()=>z);return{fetchVisitPriorities:r}},void 0),s=await n();if(s.length>0)a.visitPlanner={candidates:s.map(r=>({code:r.customer_code,name:r.customer_name,phone:r.phone,address:r.address,areaCode:r.area_code,businessType:r.business_type,priorityScore:r.priority_score,reasons:r.reasons,lastOrderDate:r.last_order_date,daysSinceOrder:r.days_since_order,annualRevenue:r.annual_revenue,recommendedAction:r.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=Zs(s.map(r=>({code:r.customer_code,name:r.customer_name,phone:r.phone,address1:r.address,areaCode:r.area_code,businessType:r.business_type,annualRevenue:r.annual_revenue,lastOrderDate:r.last_order_date,hasSeasonalProposal:r.reasons.some(i=>i.includes("季節"))})));else{const{supabaseQueryAll:r}=await N(async()=>{const{supabaseQueryAll:y}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:y}},void 0),[i,c]=await Promise.all([r("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):On().then(y=>y.customers)]),d=a.masterStats?.customers??c,u=new Map;i.forEach(y=>{const h=y.legacy_customer_code||"",g=y.sales_date||"",$=Number(y.total_amount)||0,_=u.get(h);!_||g>_.lastDate?u.set(h,{lastDate:g,total:(_?.total??0)+$}):_.total+=$}),a.visitPlanner=Zs(d.filter(y=>y.isActive).map(y=>({code:y.code,name:y.name,phone:y.phone,address1:y.address1,areaCode:y.areaCode,businessType:y.businessType,annualRevenue:u.get(y.code)?.total??0,lastOrderDate:u.get(y.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:n,fetchSafetyStockParams:s,fetchProductionPlan:r,fetchLabelExclusions:i}=await N(async()=>{const{fetchDemandAnalysis:d,fetchSafetyStockParams:u,fetchProductionPlan:y,fetchLabelExclusions:h}=await Promise.resolve().then(()=>z);return{fetchDemandAnalysis:d,fetchSafetyStockParams:u,fetchProductionPlan:y,fetchLabelExclusions:h}},void 0);if(!a.demandAnalysis){const[d,u]=await Promise.all([n(a.demandYearsBack*12).catch(y=>(console.error("fetchDemandAnalysis failed:",y),null)),s().catch(y=>(console.error("fetchSafetyStockParams failed:",y),[]))]);d&&(a.demandAnalysis=d),a.safetyStockParams=u}if(a.productionPlan.length===0){const d=await r(a.demandPlanYearMonth).catch(()=>[]);d.length>0?a.productionPlan=d:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=La(a.demandPlanYearMonth))}const c=await i(a.demandPlanYearMonth).catch(()=>[]);if(a.calendarLabelExcluded=new Set(c),a.productionPlan.length>0){const d=a.productionPlan.filter(u=>!a.calendarLabelExcluded.has(u.productCode));Ge(a.calendarShifts,d,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{if(t&&a.brewingPlanData.length>0)break;const{fetchBrewingPlanSummary:n,fetchBrewingMonthlyTrend:s,fetchBrewingSchedule:r,fetchBrewingProductDetail:i,fetchBrewingCustomCategories:c,fetchBrewingCategoryOverrides:d,fetchAllBrewingStockEntries:u,fetchCategoryTypeLinks:y,fetchAvailableProductionTypes:h,fetchBrewingAlcoholSettings:g,fetchBrewingYearlyShipments:$,fetchBrewingSeasonalPattern:_,fetchBrewingForecastOverrides:S,fetchBrewingRiceParams:C,fetchRiceVarieties:k,fetchRicePurchaseCommitments:L,fetchProcurementDecisions:E}=await N(async()=>{const{fetchBrewingPlanSummary:H,fetchBrewingMonthlyTrend:Q,fetchBrewingSchedule:Z,fetchBrewingProductDetail:ee,fetchBrewingCustomCategories:ne,fetchBrewingCategoryOverrides:K,fetchAllBrewingStockEntries:J,fetchCategoryTypeLinks:X,fetchAvailableProductionTypes:se,fetchBrewingAlcoholSettings:ge,fetchBrewingYearlyShipments:de,fetchBrewingSeasonalPattern:we,fetchBrewingForecastOverrides:Ne,fetchBrewingRiceParams:bt,fetchRiceVarieties:st,fetchRicePurchaseCommitments:Ya,fetchProcurementDecisions:Ke}=await Promise.resolve().then(()=>z);return{fetchBrewingPlanSummary:H,fetchBrewingMonthlyTrend:Q,fetchBrewingSchedule:Z,fetchBrewingProductDetail:ee,fetchBrewingCustomCategories:ne,fetchBrewingCategoryOverrides:K,fetchAllBrewingStockEntries:J,fetchCategoryTypeLinks:X,fetchAvailableProductionTypes:se,fetchBrewingAlcoholSettings:ge,fetchBrewingYearlyShipments:de,fetchBrewingSeasonalPattern:we,fetchBrewingForecastOverrides:Ne,fetchBrewingRiceParams:bt,fetchRiceVarieties:st,fetchRicePurchaseCommitments:Ya,fetchProcurementDecisions:Ke}},void 0),o=a.brewingPlanFY,l=`${o}-10-01`,p=`${o+1}-09-30`,[m,f,w,b,x,P,D,q,R,B,M,O,I,j,V,U,W]=await Promise.all([n(l,p).catch(()=>[]),s(l,p).catch(()=>[]),r(o).catch(()=>[]),i(l,p).catch(()=>[]),c().catch(()=>[]),d().catch(()=>({})),u().catch(()=>[]),y().catch(()=>({})),h().catch(()=>[]),g().catch(()=>({})),$().catch(()=>[]),_().catch(()=>[]),S().catch(()=>({})),C().catch(()=>({})),k().catch(()=>[]),L(o).catch(()=>[]),E(o).catch(()=>({}))]);a.brewingPlanData=m,a.brewingMonthlyTrend=f,a.brewingSchedule=w,a.brewingProductDetail=b,a.brewingCustomCategories=x,a.brewingOverrides=P,a.brewingStockEntries=D,a.brewingTypeLinks=q,a.brewingAvailableTypes=R,a.brewingYearlyShipments=M,a.brewingSeasonalPattern=O,a.brewingForecastOverrides=I,a.brewingRiceParams=j,a.riceVarieties=V,a.ricePurchaseCommitments=U,a.procurementDecisions=W,a.brewingAlcoholSettings=B;break}case"/brewing-process":{const{fetchBrewingBatches:n,fetchBrewingProcessSteps:s,fetchBrewingCustomCategories:r,fetchBrewingSchedule:i,fetchWorkerSettings:c,fetchStepLabor:d,fetchBrewingRiceParams:u,fetchTanks:y}=await N(async()=>{const{fetchBrewingBatches:E,fetchBrewingProcessSteps:o,fetchBrewingCustomCategories:l,fetchBrewingSchedule:p,fetchWorkerSettings:m,fetchStepLabor:f,fetchBrewingRiceParams:w,fetchTanks:b}=await Promise.resolve().then(()=>z);return{fetchBrewingBatches:E,fetchBrewingProcessSteps:o,fetchBrewingCustomCategories:l,fetchBrewingSchedule:p,fetchWorkerSettings:m,fetchStepLabor:f,fetchBrewingRiceParams:w,fetchTanks:b}},void 0),h=a.brewingPlanFY,[g,$,_,S,C,k,L]=await Promise.all([n(h).catch(()=>[]),r().catch(()=>[]),i(h).catch(()=>[]),c().catch(()=>({workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1})),d().catch(()=>[]),u().catch(()=>({})),y().catch(()=>[])]);a.brewingBatches=g,a.brewingSchedule=_,a.bpWorkerSettings=S,a.bpStepLabor=C,a.brewingRiceParams=k,a.bpTanks=L,g.length>0?a.brewingProcessSteps=await s(g.map(E=>E.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=$;break}case"/workforce":{const[n,s,r,i]=await Promise.all([a.staffMembers.length>0?Promise.resolve(a.staffMembers):Zn(),a.brewingSchedule.length>0?Promise.resolve(a.brewingSchedule):(async()=>{const{fetchBrewingSchedule:c}=await N(async()=>{const{fetchBrewingSchedule:d}=await Promise.resolve().then(()=>z);return{fetchBrewingSchedule:d}},void 0);return c(a.brewingPlanFY).catch(()=>[])})(),lr(a.workforceYearMonth),cr(a.workforceYearMonth)]);a.staffMembers=n,a.workforceMetrics=r,a.dailyShiftPlans=i,a.brewingSchedule.length===0&&(a.brewingSchedule=s);break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Ro());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Oo());break;case"/tank-movements":{const{fetchTankMovements:n,fetchTankList:s}=await N(async()=>{const{fetchTankMovements:c,fetchTankList:d}=await Promise.resolve().then(()=>z);return{fetchTankMovements:c,fetchTankList:d}},void 0),[r,i]=await Promise.all([n().catch(()=>[]),s().catch(()=>[])]);a.tankMovements=r,a.tankList=i;break}case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Bo());break;case"/materials":a.materialList.length===0&&(a.materialList=await jo());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([zo(),Fo()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Vo(),Yo()]));break;case"/tax":(!a.taxDeclaration||!a.taxVolume)&&([a.taxDeclaration,a.taxVolume]=await Promise.all([Un(a.taxYear,a.taxMonth),Jn(a.taxYear,a.taxMonth)]));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Hn(a.storeSalesDate),Ho()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:n}=await N(async()=>{const{fetchMailSenders:s}=await Promise.resolve().then(()=>z);return{fetchMailSenders:s}},void 0);if(a.mailSenders=await n(),!a.emailSenderId||!a.mailSenders.find(s=>s.id===a.emailSenderId)){const s=a.mailSenders.find(r=>r.isDefault)??a.mailSenders[0];s&&(a.emailSenderId=s.id)}}break;case"/calendar":{const{fetchCalendarEvents:n}=await N(async()=>{const{fetchCalendarEvents:s}=await Promise.resolve().then(()=>z);return{fetchCalendarEvents:s}},void 0);a.calendarEvents=await n(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:n}=await N(async()=>{const{fetchIntegrationSettings:s}=await Promise.resolve().then(()=>z);return{fetchIntegrationSettings:s}},void 0);a.integrations=await n()}break;case"/shopify":{const{fetchShopifyOrders:n,fetchIntegrationSettings:s}=await N(async()=>{const{fetchShopifyOrders:r,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>z);return{fetchShopifyOrders:r,fetchIntegrationSettings:i}},void 0);a.shopifyOrders=await n(),a.integrations.length===0&&(a.integrations=await s())}break;case"/fax":{const{fetchFaxInbox:n,fetchIntegrationSettings:s}=await N(async()=>{const{fetchFaxInbox:r,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>z);return{fetchFaxInbox:r,fetchIntegrationSettings:i}},void 0);a.faxRecords=await n(),a.integrations.length===0&&(a.integrations=await s())}break;case"/ledger":a.customerLedger=await Bn(a.ledgerCustomerCode);break;case"/setup":[a.syncDashboard,a.systemHealth]=await Promise.all([_o(),So()]);break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await ar());break;case"/users":{const{fetchUserProfiles:n}=await N(async()=>{const{fetchUserProfiles:s}=await Promise.resolve().then(()=>z);return{fetchUserProfiles:s}},void 0);a.userProfiles=await n()}break;case"/profile":{const{fetchMyProfile:n,fetchAuditLogs:s,fetchMailSenders:r}=await N(async()=>{const{fetchMyProfile:c,fetchAuditLogs:d,fetchMailSenders:u}=await Promise.resolve().then(()=>z);return{fetchMyProfile:c,fetchAuditLogs:d,fetchMailSenders:u}},void 0),i=a.user?.email??a.myProfile?.email??"";i&&(a.myProfile=await n(i)),a.mailSenders.length===0&&(a.mailSenders=await r()),a.auditLogs=await s(50)}break;case"/audit":{const{fetchAuditLogs:n}=await N(async()=>{const{fetchAuditLogs:s}=await Promise.resolve().then(()=>z);return{fetchAuditLogs:s}},void 0);a.auditLogs=await n(200)}break;case"/prospects":{const{fetchProspects:n}=await N(async()=>{const{fetchProspects:s}=await Promise.resolve().then(()=>z);return{fetchProspects:s}},void 0);a.prospects=await n()}break;case"/map":{const{fetchMapCustomers:n,fetchDeliveryLocations:s}=await N(async()=>{const{fetchMapCustomers:c,fetchDeliveryLocations:d}=await Promise.resolve().then(()=>z);return{fetchMapCustomers:c,fetchDeliveryLocations:d}},void 0),[r,i]=await Promise.all([n(),s()]);a.mapCustomers=r,a.deliveryLocations=i,a.mapLoaded=!0}break;case"/calls":{const{fetchCallLogs:n,fetchIntegrationSettings:s}=await N(async()=>{const{fetchCallLogs:r,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>z);return{fetchCallLogs:r,fetchIntegrationSettings:i}},void 0);a.callLogs=await n(100),a.integrations.length===0&&(a.integrations=await s())}break;case"/list-builder":{const{fetchLeadLists:n,fetchIntegrationSettings:s}=await N(async()=>{const{fetchLeadLists:r,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>z);return{fetchLeadLists:r,fetchIntegrationSettings:i}},void 0);a.leadLists=await n(),a.integrations.length===0&&(a.integrations=await s())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:n}=await N(async()=>{const{fetchWorkflowOrdersFromDb:s}=await Promise.resolve().then(()=>z);return{fetchWorkflowOrdersFromDb:s}},void 0);a.workflowOrders=await n()}break;case"/tour":{const{fetchTourInquiriesFromDb:n}=await N(async()=>{const{fetchTourInquiriesFromDb:s}=await Promise.resolve().then(()=>z);return{fetchTourInquiriesFromDb:s}},void 0);a.tourInquiries=await n()}break;case"/slack":{const{fetchSlackRules:n,fetchSlackLogs:s,fetchIntegrationSettings:r}=await N(async()=>{const{fetchSlackRules:i,fetchSlackLogs:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>z);return{fetchSlackRules:i,fetchSlackLogs:c,fetchIntegrationSettings:d}},void 0);a.slackRules=await n(),a.slackLogs=await s(50),a.integrations.length===0&&(a.integrations=await r())}break;case"/changelog":a.featureStatuses||(a.featureStatuses=await Ia());break;case"/":a.featureStatuses||(a.featureStatuses=await Ia());break;default:break}}catch(n){console.error("Route data load error:",e,n),F(`データ読み込みエラー: ${n.message??"不明"}`,"error")}finally{t||(a.actionLoading=!1,A())}}function po(){if(ls())return hp(a.authError,a.authSubmitting);if(a.loading)return`
      <section class="panel">
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
          <p class="loading-text">データを読み込んでいます…</p>
        </div>
      </section>`;if(a.error)return`
      <section class="panel error-card">
        <div class="empty-state-icon" style="background:#fbe9e9;color:var(--danger);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5"/><path d="M8 8L16 16M16 8L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${a.error}</p>
        <button class="button primary" onclick="location.reload()">再読込する</button>
      </section>
    `;switch(a.route){case"/cat/sales":return oa("sales");case"/cat/brewery":return oa("brewery");case"/cat/purchase":return oa("purchase");case"/cat/more":return oa("more");case"/invoice-entry":return zd(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors,a.staffList,a.frequentCustomers,a.frequentProducts);case"/quote":return a.quoteEditId===null?Hd(a.quoteList,a.quoteListLoading,a.quoteCustomerFilter,a.quoteCustomerFilterName):wr(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return Qd(a.quoteCompanySettings);case"/email":return Od(Ny());case"/delivery":return a.deliveryNote?Nd(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return Km(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate,a.shipmentCalendarPrevYearData);case"/billing":return a.billingSummary?gd(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?Xp(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return np(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return sp(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);case"/customer-analysis":return a.customerAnalysis?Vp(a.customerAnalysis,a.productABC,a.analysisTab,a.analysisPeriod):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Ld(a.demandForecast);case"/demand":return Zu(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return lm(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,s=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<s).sort(),i=new Map;for(const u of a.brewingSeasonalPattern)i.has(u.brewCategory)||i.set(u.brewCategory,new Map),i.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const c=[];for(let u=n;u<=9;u++)c.push(u);if(n>=10)for(let u=1;u<=9;u++)c.push(u);const d=new Map;for(const u of a.brewingYearlyShipments)d.has(u.brewCategory)||d.set(u.brewCategory,new Map),d.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,y]of d){const h=r.filter(m=>y.has(m)).map(m=>y.get(m).shipL);let g=0;if(h.length>=2){const m=[];for(let f=1;f<h.length;f++)h[f-1]>0&&m.push((h[f]-h[f-1])/h[f-1]);g=m.length>0?m.reduce((f,w)=>f+w,0)/m.length:0}const $=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:g,_=h.length>0?h[h.length-1]:y.get(s)?.annualL??0,S=i.get(u)??new Map,C=c.reduce((m,f)=>m+(S.get(f)??0),0),k=a.brewingStockEntries.filter(m=>m.brewCategory===u).reduce((m,f)=>m+f.volumeL,0),L=a.brewingAlcoholSettings[u],E=L&&L.targetAlcoholPct>0?L.rawAlcoholPct/L.targetAlcoholPct:1,o=Math.round(k*E),l=Math.max(0,o-Math.round(C)),p=Math.round(_*(1+$));e[u]=Math.max(0,p-l)}}return pm(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?Nm(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?zm(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?ty(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return Sm(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY,workerSettings:a.bpWorkerSettings,stepLabor:a.bpStepLabor,tanks:a.bpTanks.map(t=>({id:t.id,tankNo:t.tankNo,capacityL:t.capacityL,tankType:t.tankType,preferredCategories:t.preferredCategories,cleanupDays:t.cleanupDays})),selectedBatchIds:a.bpSelectedBatchIds})}case"/workforce":return Dm(a.staffMembers,a.workforceTab,a.staffDeptFilter,a.workforceYearMonth,a.brewingSchedule,a.shiftBottlingTarget,a.workforceMetrics,a.dailyShiftPlans,a.workforceSelectedDay);case"/jikomi":return a.jikomiView==="calendar"?`${Ls(a.jikomiList,a.jikomiView)}${up(a.jikomiList)}`:Ls(a.jikomiList,a.jikomiView);case"/tanks":return sy(a.tankList);case"/tank-movements":return iy(a.tankMovements,a.tankList,a.tankMovementFilter);case"/kentei":return mp(a.kenteiList);case"/materials":return Ep(a.materialList)+Pp(a.materialEditing,a.materialEditingIsNew);case"/purchase":return qp(a.purchaseList,a.payableList);case"/raw-material":return Tp(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?cy(a.taxDeclaration,a.taxYear,a.taxMonth,a.taxVolume??[]):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return au(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?Rp(a.pipelineMeta,$e,ie,a.syncDashboard,a.systemHealth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return Vu(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return su(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return Ou(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return ru(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapLoaded?a.mapCustomers.length===0?`<section class="page-head"><div><p class="eyebrow">取引先マップ</p><h1>取引先マップ</h1></div></section>
          <section class="panel">
            <div style="padding:32px;text-align:center;color:var(--text-secondary)">
              <p style="font-size:1.5rem;margin-bottom:8px">📍</p>
              <p style="font-weight:600;margin-bottom:4px">緯度・経度データがありません</p>
              <p style="font-size:0.875rem">得意先マスタにジオコーディングが必要です。<br>relay フォルダの <code>geocode_customers.py</code> を実行してください。</p>
            </div>
          </section>`:iu(a.mapCustomers,a.deliveryLocations,a.mapFilters):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>';case"/workflow":return du(a.workflowOrders);case"/mobile-order":return pu(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return mu(a.tourInquiries,a.tourActiveId);case"/mail-senders":return fu(a.mailSenders,a.mailSenderEditingId);case"/calendar":return gu(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return bu(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return wu(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return xu(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/changelog":{const e=a.myProfile?.name??a.myProfile?.email??"不明";return a.featureStatuses!==null?py(a.featureStatuses,e):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">読み込み中…</p></div></section>'}case"/users":return $u(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return _u(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return Su(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return ku(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return Lu(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return Cu(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return qu(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return eu(Hr(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/payment":return Cp([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return kp(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return rp(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return $d(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return Ar(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return jy();default:return qd(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function By(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const i=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${i.bg};border-bottom:2px solid ${i.border};">
        <span class="announcement-text">${i.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),s=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+s}function jy(){const e=a.featureStatuses??{};function t(s,r,i,c){const d=`${"/".replace(/\/$/,"")||"/"}${s}`,u=dy(s,e);return`<a href="${d}" data-link="${s}" class="home-card">
      <span class="home-card-icon">${r}</span>
      <span class="home-card-label">${i}${u?' <span class="badge-new">使用可能</span>':""}</span>
      <span class="home-card-desc">${c}</span>
    </a>`}const n=[{title:"販売業務",color:"#1a56db",cards:[t("/invoice-entry","📝","伝票入力","売上・返品を入力"),t("/quote","📄","見積作成","見積書の作成・管理"),t("/invoice","🔍","伝票照会","過去伝票の照会"),t("/delivery","🚚","納品書","納品書の発行"),t("/billing","💳","月次請求","請求書・入金管理"),t("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[t("/analytics","📊","売上分析","期間・商品・得意先別"),t("/customer-analysis","👥","ABC分析","得意先・商品 ABC分析"),t("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),t("/report","📈","集計帳票","各種集計帳票"),t("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[t("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),t("/visit-planner","📅","訪問計画","訪問スケジュール"),t("/shipment-calendar","🚚","配送カレンダー","伝票日付で配送を確認"),t("/map","🗺️","取引先マップ","地図で取引先を確認"),t("/prospects","🌱","新規営業","新規開拓の進捗"),t("/email","✉️","メール配信","一斉メール配信"),t("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[t("/workflow","🔄","受注ワークフロー","受注から出荷まで"),t("/shopify","🛒","Shopify注文","EC受注の確認"),t("/purchase","📥","仕入・買掛","仕入管理・買掛金"),t("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[t("/jikomi","🍶","仕込管理","仕込帳・製造記録"),t("/tanks","🛢️","タンク管理","タンク在庫の管理"),t("/tax","📋","酒税申告","酒税申告書の作成"),t("/demand","📆","需要・生産計画","需要予測・生産計画"),t("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール"),t("/procurement","🌾","調達計画","原料米の調達・予算"),t("/brewing-process","🍶","醸造工程","バッチ別の醸造工程管理"),t("/workforce","👥","人員・シフト管理","スタッフ管理・人件費")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[t("/master","⚙️","マスタ管理","商品・得意先マスタ"),t("/store","🏪","店舗・直売所","直売所の販売管理"),t("/tour","🏯","酒蔵見学","見学予約の管理"),t("/setup","🔗","連動設定","酒仙iとの連動"),t("/import","📤","データ取込","CSVデータ取込"),t("/users","👤","ユーザー管理","アカウント管理"),t("/changelog","✅","機能一覧・更新履歴","動作確認チェック・バージョン管理")].join("")}];return`
    <div class="home-page">
      <div class="home-welcome">
        <p class="home-welcome-date">${new Date().toLocaleDateString("ja-JP",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}</p>
        <h2 class="home-welcome-title">何をしますか？</h2>
      </div>
      ${n.map(s=>`
        <div class="home-section">
          <h3 class="home-section-title" style="--section-color:${s.color}">
            <span class="home-section-bar"></span>${s.title}
          </h3>
          <div class="home-card-grid">${s.cards}</div>
        </div>
      `).join("")}
    </div>
  `}function zy(){const e=a.route,t=Va(e),s=[{key:"sales",icon:"💼",label:"売上管理",items:[{path:"/invoice-entry",label:"伝票入力"},{path:"/invoice",label:"伝票照会"},{path:"/ledger",label:"得意先台帳"},{path:"/sales",label:"売上一覧"},{path:"/payment",label:"入金状況"},{path:"/billing",label:"月次請求"},{path:"/delivery",label:"納品書"},{path:"/report",label:"集計帳票"}]},{key:"analytics",icon:"📊",label:"分析",items:[{path:"/analytics",label:"売上分析"},{path:"/product-power",label:"商品パワー"},{path:"/customer-analysis",label:"ABC分析"},{path:"/customer-efficiency",label:"営業効率"},{path:"/demand-forecast",label:"需要予測"},{path:"/shipment-calendar",label:"出荷カレンダー"}]},{key:"crm",icon:"🤝",label:"CRM・営業",items:[{path:"/churn-alert",label:"営業アクション"},{path:"/map",label:"取引先マップ"},{path:"/visit-planner",label:"訪問計画"},{path:"/prospects",label:"新規営業"},{path:"/calls",label:"通話履歴"},{path:"/seasonal-calendar",label:"季節提案"},{path:"/list-builder",label:"リスト取得"}]},{key:"brewery",icon:"🍶",label:"醸造管理",items:[{path:"/brewing-plan",label:"醸造計画"},{path:"/procurement",label:"調達計画"},{path:"/brewing-process",label:"醸造工程"},{path:"/demand",label:"需要・生産計画"},{path:"/jikomi",label:"仕込管理"},{path:"/tanks",label:"タンク管理"},{path:"/tank-movements",label:"移動簿"},{path:"/kentei",label:"検定管理"},{path:"/tax",label:"酒税申告"},{path:"/workforce",label:"人員・シフト"}]},{key:"master",icon:"🗂",label:"マスタ・帳票",items:[{path:"/master",label:"マスタ管理"},{path:"/materials",label:"資材管理"},{path:"/purchase",label:"仕入・買掛"},{path:"/store",label:"店舗・直売所"},{path:"/shopify",label:"Shopify注文"},{path:"/print",label:"印刷センター"},{path:"/calendar",label:"カレンダー"},{path:"/tour",label:"酒蔵見学"}]},{key:"settings",icon:"⚙",label:"設定",items:[{path:"/setup",label:"連動設定"},{path:"/integrations",label:"外部連携"},{path:"/users",label:"ユーザー管理"},{path:"/import",label:"データ取込"},{path:"/changelog",label:"更新履歴"}]}].map(i=>{const c=i.key===t,d=i.items.map(u=>`<a href="${u.path}" data-link="${u.path}" class="snav-sub${e===u.path?" active":""}">${u.label}</a>`).join("");return`<div class="snav-group${c?" open":""}">
      <button class="snav-group-btn" type="button" data-snav-group="${i.key}">
        <span>${i.icon}</span><span class="snav-group-label">${i.label}</span><span class="snav-arrow">›</span>
      </button>
      <div class="snav-items">${d}</div>
    </div>`}).join(""),r=a.sidebarOpen?'<div class="sidebar-overlay" data-action="sidebar-close"></div>':"";return`
    <aside class="app-sidebar${a.sidebarOpen?" open":""}">
      <div class="snav-brand">
        <a href="/" data-link="/" class="snav-brand-link">
          <span class="snav-brand-mark">syusen</span>
          <span class="snav-brand-name">酒仙i クラウド</span>
        </a>
        <button class="snav-close-btn" type="button" data-action="sidebar-close" aria-label="メニューを閉じる">✕</button>
      </div>
      <div class="snav-scroll">
        <a href="/" data-link="/" class="snav-home${e==="/"?" active":""}">🏠 ホーム・ダッシュボード</a>
        ${s}
        <a href="/changelog" data-link="/changelog" class="snav-home${e==="/changelog"?" active":""}">📋 機能一覧</a>
      </div>
      <div class="snav-footer">
        <a href="/profile" data-link="/profile" class="snav-profile">${a.user?.email??"👤 プロフィール"}</a>
      </div>
    </aside>
    ${r}
  `}function Fy(){if(ls())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${po()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/changelog":"機能一覧・更新履歴","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",s=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?jd(a.masterStats.customers,a.pickerQuery,a.frequentCustomers):Dp(a.masterStats.products,a.pickerQuery,a.frequentProducts):"",r=a.globalSearchOpen?Bd(a.globalQuery,Ry()):"",i=a.user?`<span class="app-header-user">${a.user.email}</span>
       <button class="button secondary small" type="button" data-action="auth-logout">ログアウト</button>`:a.authSkipped?'<span class="app-header-user">デモモード</span>':"";return`
    <div class="shell-v2">
      <header class="app-header">
        <div class="app-header-left">${`
    <button class="sidebar-hamburger" type="button" data-action="sidebar-open" aria-label="メニュー">☰</button>
    ${t?'<span class="app-brand-name">酒仙i クラウド</span>':`<span class="app-page-title">${n}</span>`}
  `}</div>
        <div class="app-header-right">
          <button class="button secondary small" type="button" data-action="global-search-open">検索 <kbd>Ctrl+K</kbd></button>
          <button class="button secondary small" type="button" data-action="hard-refresh" title="再読み込み" style="font-size:14px;padding:4px 8px;">↺</button>
          <button class="button secondary small" type="button" data-action="share-page" title="このページのURLを共有">🔗</button>
          ${i}
        </div>
      </header>
      ${By()}
      <div class="shell-body">
        ${zy()}
        <main class="main-v2">
          <div class="view ${a.actionLoading?"is-busy":""}">${po()}</div>
          <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
        </main>
      </div>
      ${s}
      ${r}
    </div>
  `}async function Vy(){a.actionLoading=!0,A();try{const{fetchSalesSummary:e}=await N(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>z);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,A()}}async function Yy(e){a.actionLoading=!0,A();try{a.invoiceRecords=await Xt(e)}finally{a.actionLoading=!1,A()}}async function hn(e){a.actionLoading=!0,A();try{a.customerLedger=await Bn(e)}finally{a.actionLoading=!1,A()}}function Fe(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,deliveryDate:e.querySelector("#inv-delivery-date")?.value??a.invoiceForm.deliveryDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:a.invoiceForm.staffCode,registeredBy:e.querySelector("#inv-registered-by")?.value??a.invoiceForm.registeredBy,lines:a.invoiceForm.lines.map((t,n)=>{const s=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:s,unitPrice:r,amount:s*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function mt(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function uo(e){const t=document.getElementById("staff-form");if(!t)return;const n=t.querySelector("#sf-emp-type"),s=t.querySelector("#sf-hourly-row"),r=t.querySelector("#sf-hours-row"),i=t.querySelector("#sf-salary-row"),c=t.querySelector("#sf-contract-row"),d=t.querySelector("#sf-shift-pref-row");function u(){const y=n?.value??"part_time";s&&(s.style.display=y==="part_time"?"":"none"),r&&(r.style.display=y==="part_time"?"":"none"),i&&(i.style.display=y==="employee"?"":"none"),c&&(c.style.display=y==="contractor"?"":"none"),d&&(d.style.display=y==="part_time"?"":"none")}u(),n?.addEventListener("change",u),t.querySelector("[data-action='close-staff-modal']")?.addEventListener("click",()=>{document.getElementById("staff-modal")?.remove()}),t.addEventListener("submit",async y=>{y.preventDefault();const h=t.querySelector("#staff-form-result"),g=(t.querySelector("#sf-months")?.value??"").trim(),$=g?g.split(",").map(l=>parseInt(l.trim())).filter(l=>!isNaN(l)&&l>=1&&l<=12):null,_=Array.from(t.querySelectorAll("input[name='sf-cross']:checked")).map(l=>l.value),S=t.querySelector("#sf-emp-type")?.value??"part_time",C=S==="part_time"?t.querySelector("input[name='sf-shift-pref']:checked")?.value??"both":null,k=Array.from(t.querySelectorAll("input[name='sf-task']:checked")).map(l=>l.value),L=Array.from(t.querySelectorAll("input[name='sf-day-off']:checked")).map(l=>parseInt(l.value)),E={id:t.querySelector("#sf-id")?.value||void 0,name:t.querySelector("#sf-name")?.value.trim()??"",kana:t.querySelector("#sf-kana")?.value.trim()||"",employmentType:S,department:t.querySelector("#sf-dept")?.value??"bottling",hourlyRate:parseFloat(t.querySelector("#sf-hourly")?.value??"")||null,monthlySalary:parseFloat(t.querySelector("#sf-salary")?.value??"")||null,contractFee:parseFloat(t.querySelector("#sf-contract-fee")?.value??"")||null,workHoursPerDay:parseFloat(t.querySelector("#sf-hours")?.value??"8")||8,shiftPreference:C,monthlyTasks:k,availableMonths:$,crossDepartments:_,fixedDaysOff:L,isDeptLeader:t.querySelector("#sf-leader")?.checked??!1,notes:t.querySelector("#sf-notes")?.value.trim()||"",isActive:t.querySelector("#sf-active")?.checked??!0};if(!E.name){h&&(h.textContent="氏名は必須です");return}await rr(E)?(document.getElementById("staff-modal")?.remove(),a.staffMembers=await Zn(),F(e?"更新しました":"登録しました","success"),A()):h&&(h.textContent="保存に失敗しました")})}function Uy(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,A()}),e.querySelectorAll("[data-action='global-search-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("global-search")&&l.target instanceof HTMLElement&&!l.target.classList.contains("global-search")||(Zt(),A())})}),e.querySelector("#global-search-input")?.addEventListener("input",o=>{a.globalQuery=o.target.value,A()}),e.querySelectorAll("[data-action='global-nav']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.path;l&&(Zt(),ft(l))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Oy()}),e.querySelectorAll("[data-jikomi-tab]").forEach(o=>{o.addEventListener("click",()=>{a.jikomiView=o.dataset.jikomiTab,A()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const o=e.querySelector("#auth-email")?.value.trim()??"",l=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,A(),ci(o,l).then(async p=>{a.user=p,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:f}=await N(async()=>{const{fetchMyProfile:w,recordAudit:b}=await Promise.resolve().then(()=>z);return{fetchMyProfile:w,recordAudit:b}},void 0);a.myProfile=await m(p.email),await f({action:"sign_in",userEmail:p.email}),A()}).catch(async p=>{try{const m=await ys(o,l);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:f}=await N(async()=>{const{fetchMyProfile:w}=await Promise.resolve().then(()=>z);return{fetchMyProfile:w}},void 0);a.myProfile=await f(m.email)}catch{a.authError=p instanceof Error?p.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,A()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,A()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{di().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,A()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(o=>{o.addEventListener("click",()=>{a.sidebarOpen=!1,A()})}),e.querySelectorAll("[data-snav-group]").forEach(o=>{o.addEventListener("click",()=>{o.closest(".snav-group")?.classList.toggle("open")})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let o=0;t.addEventListener("touchstart",l=>{o=l.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",l=>{l.changedTouches[0].clientX-o<-60&&(a.sidebarOpen=!1,A())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"";a.dismissedAnnouncements.add(l),A()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='hard-refresh']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const o=window.location.href,l=document.title;if(navigator.share)try{await navigator.share({url:o,title:l})}catch{}else try{await navigator.clipboard.writeText(o),F("URLをコピーしました","success")}catch{F("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",l=>{l.preventDefault(),ft(o.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async o=>{o.preventDefault();const l=e.querySelector("#fr-title")?.value??"",p=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",f=e.querySelector("#fr-result");if(!l.trim())return;const w=await Co(l,p,m);if(f&&(f.textContent=w?"送信しました":"送信に失敗しました",f.className=`fr-result ${w?"success":"error"}`),w){const b=e.querySelector("#feature-request-form");b&&b.reset()}}),e.querySelectorAll("[data-period]").forEach(o=>{o.addEventListener("click",()=>{a.salesPeriod=o.dataset.period,A()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const o=e.querySelector("#range-start")?.value??"",l=e.querySelector("#range-end")?.value??"";o&&l&&(a.customRange={start:o,end:l},a.salesPeriod="custom",A())}),e.querySelectorAll("[data-edit-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editCustomer??"",p=a.masterStats?.customers.find(f=>f.id===l);if(!p)return;const m=document.createElement("div");m.innerHTML=fp(p),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async f=>{f.preventDefault();const w=document.getElementById("edit-result"),b=document.getElementById("ec-trade-type")?.value||null,x=await Do(l,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:b,manual_override:!0});w&&(w.textContent=x?"保存しました":"保存に失敗",w.className=`fr-result ${x?"success":"error"}`),x&&(document.getElementById("edit-modal")?.remove(),At())})})}),e.querySelectorAll("[data-edit-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editProduct??"",p=a.masterStats?.products.find(f=>f.id===l);if(!p)return;const m=document.createElement("div");m.innerHTML=gp(p),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async f=>{f.preventDefault();const w=document.getElementById("edit-result"),b=await qo(l,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});w&&(w.textContent=b?"保存しました":"保存に失敗",w.className=`fr-result ${b?"success":"error"}`),b&&(document.getElementById("edit-modal")?.remove(),At())})})}),e.querySelectorAll("[data-view-customer-quotes]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.viewCustomerQuotes??"",p=o.dataset.customerName??"";a.quoteCustomerFilter=l,a.quoteCustomerFilterName=p,a.quoteEditId=null,a.quoteList.length===0?(a.quoteListLoading=!0,ft("/quote"),a.quoteList=await Ta(),a.quoteListLoading=!1):ft("/quote"),A()})}),e.querySelector("[data-action='quote-clear-filter']")?.addEventListener("click",()=>{a.quoteCustomerFilter="",a.quoteCustomerFilterName="",A()}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Ma(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,A()}),e.querySelectorAll("[data-open-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.openQuote,p=await nr(l);if(!p){F("見積の読み込みに失敗しました","error");return}a.quoteState={id:p.id,quoteNo:p.quote_no,quoteDate:p.quote_date,validUntil:p.valid_until??"",customerCode:p.legacy_customer_code??"",customerName:p.customer_name,customerAddress:p.customer_address,subject:p.subject,lines:p.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:p.remarks,taxRate:p.tax_rate,deliveryDate:p.delivery_date,paymentTerms:p.payment_terms,deliveryPlace:p.delivery_place,templateType:p.template_type??"sake",previewMode:!1},a.quoteEditId=l,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,A()})}),e.querySelectorAll("[data-delete-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.deleteQuote,p=o.dataset.quoteNo??l;if(!await Me(`見積 ${p} を削除しますか？`))return;await Mn("quotes",l)?(a.quoteList=a.quoteList.filter(w=>w.id!==l),F("削除しました","success"),A()):F("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,A(),Ta().then(o=>{a.quoteList=o,a.quoteListLoading=!1,A()})}),e.querySelectorAll("[name='q-template']").forEach(o=>{o.addEventListener("change",()=>{a.quoteState.templateType=o.value,A()})});function n(o){return(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function s(o){return o.length?o.map(l=>`<button class="search-item" type="button" data-select-customer="${n(l.code)}" data-cust-name="${n(l.name)}" data-cust-addr="${n(l.address1||"")}"><span class="mono">${n(l.code)}</span><span style="font-size:13px;font-weight:600;">${n(l.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(o){o.querySelectorAll("[data-select-customer]").forEach(l=>{l.addEventListener("click",async()=>{const p=l.dataset.selectCustomer??"";a.quoteState.customerCode=p,a.quoteState.customerName=l.dataset.custName??"",a.quoteState.customerAddress=l.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),o.remove(),a.quotePricing=await bn(a.masterStats?.customers??[],p),A()})})}function i(o){const l=e.querySelector("#q-cust-search")?.closest(".form-row");if(!l)return;let p=document.getElementById("cust-search-results");p||(p=document.createElement("div"),p.id="cust-search-results",p.className="search-results",l.after(p));const m=a.masterStats?.customers??[],f=o.trim().toLowerCase(),w=f.length===0?m:m.filter(b=>b.name.includes(o)||b.kanaName.includes(o)||b.code.includes(o)||b.name.toLowerCase().includes(f)||b.kanaName.toLowerCase().includes(f));p.innerHTML=s(w),r(p)}function c(o,l){return o.length?o.map(p=>{const m=l?Vn(p,l):{price:p.salePrice||0,label:"卸価格"},f=p.listPrice||0,w=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(p.code)}" data-prod-name="${n(p.name)}" data-prod-price="${m.price}" data-prod-retail="${f}" data-prod-jan="${n(p.janCode??"")}" data-prod-unit="${n(p.unit)}" data-prod-case="${p.caseQty??""}"><span class="mono">${n(p.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(p.name)}</span><span class="numeric"${w?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${f?`　定価 ¥${f.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function d(o){o.querySelectorAll("[data-add-product]").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset.addProduct??"",m=l.dataset.prodName??"",f=parseInt(l.dataset.prodPrice??"0"),w=parseInt(l.dataset.prodRetail??"0")||null,b=l.dataset.prodJan??"",x=l.dataset.prodUnit||"本",P=l.dataset.prodCase??"",D=P?parseInt(P):null;a.quoteState.lines.push({productCode:p,productName:m,janCode:b,caseQty:D,quantity:1,unit:x,unitPrice:f,retailPrice:w,amount:f}),a.quoteProductQuery="";const q=e.querySelector("#q-prod-search");q&&(q.value=""),A()})})}function u(o){const l=e.querySelector("#q-prod-search")?.closest(".form-row");if(!l)return;let p=document.getElementById("prod-search-results");if(p||(p=document.createElement("div"),p.id="prod-search-results",p.className="search-results",l.after(p)),!a.masterStats){p.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,f=o.trim().toLowerCase(),w=f.length===0?m:m.filter(b=>b.name.includes(o)||b.kanaName.includes(o)||b.code.includes(o)||b.name.toLowerCase().includes(f)||b.kanaName.toLowerCase().includes(f));p.innerHTML=c(w,a.quotePricing),d(p)}function y(o,l){let p=null;function m(){p||(p=f=>{const w=document.getElementById(l);if(!w){document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null;return}o.contains(f.target)||w.contains(f.target)||(w.remove(),document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null)},document.addEventListener("touchstart",p,{passive:!0}),document.addEventListener("mousedown",p))}return m}(function(){const o=e.querySelector("#q-cust-search");if(!o)return;const l=y(o,"cust-search-results");o.addEventListener("focus",()=>{i(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteCustomerQuery=o.value,i(o.value)}),o.addEventListener("input",p=>{p.isComposing||(a.quoteCustomerQuery=o.value,i(o.value))}),o.value&&i(o.value)})(),(function(){const o=e.querySelector("#q-prod-search");if(!o)return;const l=y(o,"prod-search-results");o.addEventListener("focus",()=>{u(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteProductQuery=o.value,u(o.value)}),o.addEventListener("input",p=>{p.isComposing||(a.quoteProductQuery=o.value,u(o.value))}),o.value&&u(o.value)})(),e.querySelectorAll("[data-select-customer]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.selectCustomer??"";a.quoteState.customerCode=l,a.quoteState.customerName=o.dataset.custName??"",a.quoteState.customerAddress=o.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await bn(a.masterStats?.customers??[],l),A()})}),e.querySelector("#q-price-type")?.addEventListener("change",o=>{const l=o.target.value;a.quoteState.manualPriceType=l,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:l}:a.quotePricing={priceType:l,priceGroup:"",individualPrices:new Map},A()}),e.querySelectorAll("[data-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.addProduct??"",p=o.dataset.prodName??"",m=parseInt(o.dataset.prodPrice??"0"),f=parseInt(o.dataset.prodRetail??"0")||null,w=o.dataset.prodJan??"",b=o.dataset.prodUnit||"本",x=o.dataset.prodCase??"",P=x?parseInt(x):null;a.quoteState.lines.push({productCode:l,productName:p,janCode:w,caseQty:P,quantity:1,unit:b,unitPrice:m,retailPrice:f,amount:m}),a.quoteProductQuery="",A()})}),(()=>{const o=e.querySelector("#q-prospect-search");if(!o)return;const l=y(o,"q-prospect-results");function p(m){let f=document.getElementById("q-prospect-results");if(!f)return;const w=m.trim(),b=w.length===0?a.prospects.slice(0,8):a.prospects.filter(x=>x.companyName.includes(w)||(x.contactName??"").includes(w)).slice(0,8);if(b.length===0){f.innerHTML="";return}f.className="search-results",f.innerHTML=b.map(x=>`<button class="search-item" type="button" data-select-prospect="${x.id}" data-prospect-name="${n(x.companyName)}" data-prospect-addr="${n(x.address??"")}"><span style="font-size:13px;font-weight:600;">${n(x.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n(x.contactName??"")} ${x.address?"· "+x.address.slice(0,20):""}</span></button>`).join(""),f.querySelectorAll("[data-select-prospect]").forEach(x=>{x.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=x.dataset.prospectName??"",a.quoteState.customerAddress=x.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=x.dataset.selectProspect??"";const P=a.quoteState.manualPriceType??"";a.quotePricing={priceType:P,priceGroup:"",individualPrices:new Map},o.value="",f&&(f.innerHTML=""),A()})})}o.addEventListener("focus",()=>{p(o.value),l()}),o.addEventListener("input",m=>{m.isComposing||p(o.value)}),o.addEventListener("compositionend",()=>p(o.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const o=e.querySelector("#q-prospect-search")?.value.trim()??"",l=document.createElement("div");l.className="modal-backdrop",l.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",l.innerHTML=`
      <div class="modal-panel" onclick="event.stopPropagation()" style="width:min(480px,96%);background:var(--surface);border-radius:12px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.3);margin:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="margin:0;font-size:16px;">新規見込み顧客を登録</h3>
          <button id="prospect-quick-close" style="background:none;border:none;font-size:24px;line-height:1;cursor:pointer;color:var(--text-secondary);padding:4px 8px;min-width:44px;min-height:44px;">×</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <label class="field">
            <span style="font-size:13px;font-weight:600;">会社名 <span style="color:var(--danger);">*</span></span>
            <input id="pq-company" type="text" value="${o.replace(/"/g,"&quot;")}" placeholder="株式会社〇〇" style="margin-top:4px;" autocomplete="organization" />
          </label>
          <label class="field">
            <span style="font-size:13px;font-weight:600;">担当者名</span>
            <input id="pq-contact" type="text" placeholder="山田 太郎" style="margin-top:4px;" autocomplete="name" />
          </label>
          <label class="field">
            <span style="font-size:13px;font-weight:600;">住所</span>
            <input id="pq-address" type="text" placeholder="神奈川県〇〇市…" style="margin-top:4px;" autocomplete="street-address" />
          </label>
          <label class="field">
            <span style="font-size:13px;font-weight:600;">電話番号</span>
            <input id="pq-phone" type="tel" placeholder="045-000-0000" style="margin-top:4px;" autocomplete="tel" />
          </label>
          <label class="field">
            <span style="font-size:13px;font-weight:600;">メモ</span>
            <textarea id="pq-note" rows="2" placeholder="商談状況など" style="margin-top:4px;width:100%;box-sizing:border-box;"></textarea>
          </label>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px;">
          <button id="prospect-quick-close2" class="button secondary" style="min-height:44px;">キャンセル</button>
          <button id="prospect-quick-save" class="button primary" style="min-height:44px;">登録して見積に使用</button>
        </div>
      </div>
    `,document.body.appendChild(l),l.querySelector("#pq-company")?.focus();const p=()=>l.remove();l.addEventListener("click",m=>{m.target===l&&p()}),l.querySelector("#prospect-quick-close")?.addEventListener("click",p),l.querySelector("#prospect-quick-close2")?.addEventListener("click",p),l.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(l.querySelector("#pq-company")?.value??"").trim();if(!m){F("会社名は必須です","warning");return}const f={id:crypto.randomUUID(),companyName:m,contactName:l.querySelector("#pq-contact")?.value.trim()||void 0,address:l.querySelector("#pq-address")?.value.trim()||void 0,phone:l.querySelector("#pq-phone")?.value.trim()||void 0,note:l.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:w,fetchProspects:b}=await N(async()=>{const{saveProspect:D,fetchProspects:q}=await Promise.resolve().then(()=>z);return{saveProspect:D,fetchProspects:q}},void 0),x=await w(f);if(!x){F("登録失敗","error");return}a.prospects=await b(),a.quoteState.customerCode="",a.quoteState.customerName=x.companyName,a.quoteState.customerAddress=x.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=x.id;const P=a.quoteState.manualPriceType??"";a.quotePricing={priceType:P,priceGroup:"",individualPrices:new Map},p(),F(`${x.companyName} を見込み顧客として登録しました`,"success"),A()})});function h(){la(a.quoteState);const o=e.querySelector("#q-preview-scaler");if(!o)return;o.innerHTML=wr(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const l=o.querySelector(".q-preview-doc"),p=o.parentElement?.clientWidth??0,m=l?.offsetWidth??0;if(p>0&&m>0&&m>p-24){const f=(p-24)/m;o.style.transform=`scale(${f})`,o.style.transformOrigin="top left",o.style.height=`${((l?.offsetHeight??0)+48)*f}px`}else o.style.transform="",o.style.height=""}for(const o of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${o}`)?.addEventListener("input",h);e.querySelector("#q-remarks")?.addEventListener("input",h),e.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.quantity=parseFloat(o.value)||0,p.amount=p.quantity*p.unitPrice,h())})}),e.querySelectorAll(".price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.unitPrice=parseInt(o.value)||0,p.amount=p.quantity*p.unitPrice,h())})}),e.querySelectorAll(".jan-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.janCode=o.value,h())})}),e.querySelectorAll(".case-qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.caseQty=o.value?parseInt(o.value):null,h())})}),e.querySelectorAll(".retail-price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.retailPrice=o.value?parseInt(o.value):null,h())})}),e.querySelectorAll("[data-remove-line]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.removeLine??"0");a.quoteState.lines.splice(l,1),A()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{la(a.quoteState),a.quoteState.previewMode=!0,A()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,A()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="生成中…",a.quoteState.previewMode||la(a.quoteState);try{await Zd(a.quoteState,a.quoteCompanySettings)}finally{l.disabled=!1,l.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{la(a.quoteState);const o=a.quoteState,l=o.lines.reduce((x,P)=>x+P.amount,0),p=Math.round(l*o.taxRate/100),m=l+p;if(!o.quoteNo)try{const{supabaseRpc:x}=await N(async()=>{const{supabaseRpc:D}=await Promise.resolve().then(()=>te);return{supabaseRpc:D}},void 0),P=await x("generate_quote_no",{});o.quoteNo=P??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{o.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const f=new Date().toISOString().slice(0,10),w=o.templateType==="sake"||o.templateType==="standard"?o.templateType:"sake",b={quote_no:o.quoteNo,quote_date:o.quoteDate||f,valid_until:o.validUntil||null,legacy_customer_code:o.customerCode||null,customer_name:o.customerName||"",customer_address:o.customerAddress||"",subject:o.subject||"",template_type:w,subtotal:l,tax_amount:p,total_amount:m,tax_rate:o.taxRate||10,remarks:o.remarks||"",delivery_date:o.deliveryDate||"",payment_terms:o.paymentTerms||"",delivery_place:o.deliveryPlace||"",updated_at:new Date().toISOString()};try{let x=o.id;if(o.id){const P=await fetch(`${$e}/rest/v1/quotes?id=eq.${encodeURIComponent(o.id)}`,{method:"PATCH",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(b)});if(!P.ok){const D=await P.text();throw new Error(`quotes更新失敗 ${P.status}: ${D}`)}await fetch(`${$e}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(o.id)}`,{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})}else{const P=await fetch(`${$e}/rest/v1/quotes`,{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(b)});if(!P.ok){const q=await P.text();throw new Error(`quotes作成失敗 ${P.status}: ${q}`)}const D=await P.json();if(!D?.[0]?.id)throw new Error("IDが返りませんでした");x=D[0].id,o.id=x}if(o.lines.length>0){const P=o.lines.map((q,R)=>({quote_id:x,line_no:R+1,legacy_product_code:q.productCode||null,product_name:q.productName,jan_code:q.janCode||null,case_qty:q.caseQty??null,quantity:q.quantity,unit:q.unit,unit_price:q.unitPrice,retail_price:q.retailPrice??null,amount:q.amount})),D=await fetch(`${$e}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(P)});if(!D.ok){const q=await D.text();throw new Error(`明細保存失敗 ${D.status}: ${q}`)}}F(`見積 ${o.quoteNo} を保存しました`,"success"),A()}catch(x){console.error("[save-quote]",x),F(`保存失敗: ${String(x).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const o=p=>document.getElementById(p)?.value??"",l={...a.quoteCompanySettings,companyName:o("qs-company-name"),companyPostal:o("qs-company-postal"),companyAddress1:o("qs-company-addr1"),companyAddress2:o("qs-company-addr2"),companyTel:o("qs-company-tel"),companyFax:o("qs-company-fax"),companyEmail:o("qs-company-email"),companyRegistrationNo:o("qs-company-regno"),bankName:o("qs-bank-name"),bankBranch:o("qs-bank-branch"),bankAccountType:o("qs-bank-type"),bankAccountNo:o("qs-bank-no"),bankAccountHolder:o("qs-bank-holder"),defaultPaymentTerms:o("qs-payment-terms"),defaultHeaderNote:o("qs-header-note"),defaultFooterNote:o("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};yt(l),St("quote_company",l),a.quoteCompanySettings=l,F("設定を保存しました","success"),A()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},yt(a.quoteCompanySettings),St("quote_company",a.quoteCompanySettings),A()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",o=>{const l=o.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},yt(a.quoteCompanySettings),A()}),e.querySelector("#qs-seal-file")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const p=new FileReader;p.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:p.result},yt(a.quoteCompanySettings),St("quote_company",a.quoteCompanySettings),A()},p.readAsDataURL(l)}),e.querySelector("#qs-seal-size")?.addEventListener("input",o=>{const l=parseInt(o.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:l},yt(a.quoteCompanySettings),St("quote_company",a.quoteCompanySettings),A()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},yt(a.quoteCompanySettings),St("quote_company",a.quoteCompanySettings),A()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.month;l&&(a.demandForecast.calendarMonth=l,A())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.segment;a.demandForecast.selectedSegment=l,A()})}),e.querySelectorAll("[data-demand-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.demandTab;if(l){if(a.demandTab=l,l==="calendar"){const p=new Date().toISOString().slice(0,10);p.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=p)}A()}})}),e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value)||3;a.demandYearsBack=l,a.demandAnalysis=null;const{fetchDemandAnalysis:p}=await N(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>z);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await p(l*12),A()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",p=parseInt(o.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const f=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,w=p/30,b=Math.ceil(f*m.demandStdDev*Math.sqrt(w)),x=Math.ceil(m.avgMonthlyDemand*w+b);return{...m,leadTimeDays:p,safetyStockQty:b,reorderPoint:x}}),A()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",p=parseFloat(o.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const f=p>=.99?2.33:p>=.97?1.88:p>=.95?1.65:p>=.9?1.28:1.04,w=m.leadTimeDays/30,b=Math.ceil(f*m.demandStdDev*Math.sqrt(w)),x=Math.ceil(m.avgMonthlyDemand*w+b);return{...m,serviceLevel:p,safetyStockQty:b,reorderPoint:x}}),A()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async o=>{if(a.safetyStockParams.length===0)return;const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveSafetyStockParamsBulk:p}=await N(async()=>{const{saveSafetyStockParamsBulk:f}=await Promise.resolve().then(()=>z);return{saveSafetyStockParamsBulk:f}},void 0),m=await p(a.safetyStockParams);l.disabled=!1,l.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const o=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),l=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(p=>{const m=o>=.99?2.33:o>=.97?1.88:o>=.95?1.65:o>=.9?1.28:1.04,f=l/30,w=Math.ceil(m*p.demandStdDev*Math.sqrt(f)),b=Math.ceil(p.avgMonthlyDemand*f+w);return{...p,serviceLevel:o,leadTimeDays:l,safetyStockQty:w,reorderPoint:b}}),A()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",p=o.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===l?{...m,productionType:p}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarShifts=Kt(l,1,0);const{fetchProductionPlan:p}=await N(async()=>{const{fetchProductionPlan:f}=await Promise.resolve().then(()=>z);return{fetchProductionPlan:f}},void 0),m=await p(l);a.productionPlan=m.length>0?m:La(l),Ge(a.calendarShifts,a.productionPlan.filter(f=>!a.calendarLabelExcluded.has(f.productCode)),a.calendarCapacity),A()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(o=>{o.addEventListener("click",()=>{a.demandPlanTypeFilter=o.dataset.filter??"all",A()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.sortCol??"";a.demandSort?.column===l?a.demandSort=a.demandSort.dir==="desc"?{column:l,dir:"asc"}:null:a.demandSort={column:l,dir:"desc"},A()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=La(a.demandPlanYearMonth),A()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const p=new FileReader;p.onload=async()=>{const{parseCSV:m}=await N(async()=>{const{parseCSV:M}=await Promise.resolve().then(()=>zu);return{parseCSV:M}},void 0),{columns:f,rows:w}=m(p.result),b=document.getElementById("csv-import-status"),x=f.find(M=>/商品コード|product_code|code|コード/i.test(M)),P=f.find(M=>/在庫|stock|期首|opening/i.test(M)),D=f.find(M=>/計画|plan|planned|生産/i.test(M));if(!x){b&&(b.style.display="block",b.style.background="rgba(197,61,61,0.1)",b.style.color="#c53d3d",b.textContent=`エラー: 商品コード列が見つかりません。列名: ${f.join(", ")}`);return}let q=0,R=0,B=0;for(const M of w){const O=(M[x]??"").trim();if(!O)continue;const I=a.productionPlan.find(j=>j.productCode===O);if(I){if(q++,P&&M[P]!==void 0&&M[P]!==""){const j=parseFloat(M[P])||0;I.openingStock=j,I.requiredProduction=Math.max(0,I.demandForecast+I.safetyStockTarget-j),I.plannedQty>0&&!D&&(I.plannedQty=I.requiredProduction),R++}D&&M[D]!==void 0&&M[D]!==""&&(I.plannedQty=parseFloat(M[D])||0,B++)}}b&&(b.style.display="block",q===0?(b.style.background="rgba(183,121,31,0.1)",b.style.color="#b7791f",b.textContent=`一致する商品コードが見つかりませんでした（CSV: ${w.length}行）`):(b.style.background="rgba(47,133,90,0.1)",b.style.color="#2f855a",b.textContent=`${q}商品に反映: 在庫${R}件${B>0?` / 計画${B}件`:""} 更新`),setTimeout(()=>{b.style.display="none"},5e3)),A()},p.readAsText(l,"UTF-8"),o.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(p=>{const m=p.dataset.code??"",f=a.productionPlan.find(w=>w.productCode===m);f&&(f.plannedQty=parseFloat(p.value)||0)}),e.querySelectorAll("[data-action='plan-actual-qty']").forEach(p=>{const m=p.dataset.code??"",f=a.productionPlan.find(w=>w.productCode===m);f&&(f.actualQty=parseFloat(p.value)||0,f.actualQty>0&&(f.status="actual"))});const{saveProductionPlan:o}=await N(async()=>{const{saveProductionPlan:p}=await Promise.resolve().then(()=>z);return{saveProductionPlan:p}},void 0);await Promise.all(a.productionPlan.map(p=>o(p)));const{fetchProductionPlan:l}=await N(async()=>{const{fetchProductionPlan:p}=await Promise.resolve().then(()=>z);return{fetchProductionPlan:p}},void 0);a.productionPlan=await l(a.demandPlanYearMonth),F("保存しました"),A()}),e.querySelector("[data-action='plan-print']")?.addEventListener("click",()=>{const o=e.querySelector("[data-action='plan-save']")?.closest("section.panel"),l=e.querySelector("[data-action='cal-toggle-day']")?.closest("section.panel"),p=(o?.outerHTML??"")+(l?.outerHTML??""),m=a.demandPlanYearMonth.replace("-","年")+"月",f=window.open("","_blank");f&&(f.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
      <title>生産計画 ${m}</title>
      <style>
        body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:11px; padding:10mm; color:#1a1a2e; }
        table { width:100%; border-collapse:collapse; font-size:10px; }
        th, td { border:1px solid #ccc; padding:3px 6px; }
        th { background:#f0f0f0; }
        .numeric { text-align:right; }
        .input-sm, select, input { border:none; background:none; font-size:inherit; }
        button, .button, .status-pill { display:none; }
        .panel { break-inside:avoid; margin-bottom:16px; }
        .panel-header h2 { font-size:14px; }
        @media print { body { padding:5mm; } }
      </style>
    </head><body><h1 style="font-size:16px;margin-bottom:12px;">生産計画 — ${m}</h1>${p}</body></html>`),f.document.close(),setTimeout(()=>{f.print()},300))}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.date??"";a.calendarSelectedDate=a.calendarSelectedDate===l?null:l,A()}),o.addEventListener("dblclick",()=>{const l=o.dataset.date??"",p=a.calendarShifts.find(m=>m.date===l);!p||p.confirmed||(p.partTimers>0||p.employees>0?(p.partTimers=0,p.employees=0):(p.partTimers=1,p.employees=0),Ge(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=l,A())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveLabelExclusions:p}=await N(async()=>{const{saveLabelExclusions:w}=await Promise.resolve().then(()=>z);return{saveLabelExclusions:w}},void 0),m=[...a.calendarLabelExcluded],f=await p(a.demandPlanYearMonth,m);l.disabled=!1,l.textContent=f?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;o.checked?a.calendarLabelExcluded.delete(l):a.calendarLabelExcluded.add(l);const f=a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode));Ge(a.calendarShifts,f,a.calendarCapacity),A(),requestAnimationFrame(()=>{const w=document.getElementById("cal-label-list");w&&(w.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,f=a.productionPlan.filter(b=>b.productionType===l);if(o.checked)for(const b of f)a.calendarLabelExcluded.delete(b.productCode);else for(const b of f)a.calendarLabelExcluded.add(b.productCode);const w=a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode));Ge(a.calendarShifts,w,a.calendarCapacity),A(),requestAnimationFrame(()=>{const b=document.getElementById("cal-label-list");b&&(b.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||gt;a.calendarCapacity.partCapacity=l;const p=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ge(a.calendarShifts,p,a.calendarCapacity),A()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||vt;a.calendarCapacity.empCapacity=l;const p=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ge(a.calendarShifts,p,a.calendarCapacity),A()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",p=parseInt(o.value)||0,m=a.calendarShifts.find(f=>f.date===l);m&&(m.partTimers=p),A()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",p=parseInt(o.value)||0,m=a.calendarShifts.find(f=>f.date===l);m&&(m.employees=p),A()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarSelectedDate=null,a.calendarShifts=Kt(l,1,0);const{fetchProductionPlan:p,fetchLabelExclusions:m}=await N(async()=>{const{fetchProductionPlan:b,fetchLabelExclusions:x}=await Promise.resolve().then(()=>z);return{fetchProductionPlan:b,fetchLabelExclusions:x}},void 0),[f,w]=await Promise.all([p(l),m(l)]);a.productionPlan=f.length>0?f:La(l),a.calendarLabelExcluded=new Set(w),Ge(a.calendarShifts,a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode)),a.calendarCapacity),A()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultPart=l;for(const p of a.calendarShifts)if(!p.confirmed){const m=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.partTimers=m?0:l}A()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultEmp=l;for(const p of a.calendarShifts)if(!p.confirmed){const m=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.employees=m?0:l}A()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=Kt(a.demandPlanYearMonth,1,0),Ge(a.calendarShifts,a.productionPlan.filter(o=>!a.calendarLabelExcluded.has(o.productCode)),a.calendarCapacity),A()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const o of a.calendarShifts)o.confirmed=!0;A()}),e.querySelectorAll("[data-action='select-month']").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=l,A())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterArea=o.target.value,A())}),e.querySelector("#visit-filter-score")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(o.target.value)||0,A())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…";try{const{supabaseRpc:p}=await N(async()=>{const{supabaseRpc:m}=await Promise.resolve().then(()=>te);return{supabaseRpc:m}},void 0);await p("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,F("分析データを更新しました","success"),A()}catch(p){console.error("[refresh-analytics]",p),F("更新に失敗しました","error"),l.disabled=!1,l.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(o=>{o.addEventListener("click",l=>{const p=o.dataset.sortCol??"",m=l.shiftKey;a.route==="/product-power"?a.productSortState=It(a.productSortState,p,m):a.route==="/customer-efficiency"?a.customerSortState=It(a.customerSortState,p,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=It(a.dashboardSortState,p,m):a.route==="/master"?a.masterSortState=It(a.masterSortState,p,m):a.route==="/analytics"&&(a.analyticsSortState=It(a.analyticsSortState,p,m)),A()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(o=>{o.addEventListener("click",async()=>{const l=parseInt(o.dataset.year??"",10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await Pt(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),A())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value,10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await Pt(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),A())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.groupby??"billing";a.customerEfficiencyGroupBy=l,a.customerEfficiency=await Pt(a.customerEfficiencyYear,l,a.customerEfficiencyFiscalType),A()})}),e.querySelectorAll("[data-action='efficiency-fiscal-type']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.fiscalType??"jan";a.customerEfficiencyFiscalType=l,a.customerEfficiency=await Pt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,l),A()})}),e.querySelectorAll("[data-product-period]").forEach(o=>{o.addEventListener("click",()=>{a.productPeriod=o.dataset.productPeriod??"year",A()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const o=document.getElementById("pp-range-start")?.value??"",l=document.getElementById("pp-range-end")?.value??"";o&&l&&(a.productCustomStart=o,a.productCustomEnd=l,a.productPeriod="custom",A())}),e.querySelectorAll("[data-product-filter]").forEach(o=>{o.addEventListener("click",()=>{a.productFilter=o.dataset.productFilter??"all",A()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…",await At(),l.disabled=!1,l.textContent="↻ 更新",F("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const o=e.querySelector("#sales-start")?.value??"",l=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:o,endDate:l},Vy()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const o={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=o,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,Yy(o)}),e.addEventListener("click",o=>{const l=o.target.closest("tr[data-doc-no]");if(!l)return;const p=l.dataset.docNo??"";if(a.route==="/"){a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,navigateTo("/sales"),gn(p).then(m=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=m,A())});return}if(a.invoiceSelectedDocNo===p){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,A();return}a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,A(),gn(p).then(m=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=m,A())})});const g=e.querySelector("#ledger-customer-code"),$=e.querySelector("#ledger-cust-suggestions");if(g&&$){const o=a.masterStats?.customers??[];g.addEventListener("input",()=>{const l=g.value.trim().toLowerCase();if(!l){$.style.display="none";return}const p=o.filter(m=>m.code.toLowerCase().includes(l)||m.name.toLowerCase().includes(l)||(m.kanaName??"").toLowerCase().includes(l)).slice(0,10);if(!p.length){$.style.display="none";return}$.innerHTML=p.map(m=>`<button class="search-item" type="button" data-ledger-cust="${m.code}"><span class="mono">${m.code}</span><span>${m.name}</span></button>`).join(""),$.style.display="block",$.querySelectorAll("[data-ledger-cust]").forEach(m=>{m.addEventListener("click",()=>{const f=m.dataset.ledgerCust??"";g.value=f,$.style.display="none",a.ledgerCustomerCode=f,hn(f)})})}),g.addEventListener("keydown",l=>{if(l.key==="Enter"){$.style.display="none";const p=g.value.trim(),m=p.toLowerCase(),f=(a.masterStats?.customers??[]).filter(b=>b.code.toLowerCase()===m||b.name.toLowerCase()===m),w=f.length===1?f[0].code:p.toUpperCase();a.ledgerCustomerCode=w,hn(w)}}),g.addEventListener("blur",()=>{setTimeout(()=>{$.style.display="none"},200)})}e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const o=e.querySelector("#ledger-customer-code")?.value.trim()??"",l=o.toLowerCase(),p=(a.masterStats?.customers??[]).filter(f=>f.code.toLowerCase()===l||f.name.toLowerCase()===l),m=p.length===1?p[0].code:o.toUpperCase();a.ledgerCustomerCode=m,hn(m)}),e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{a.masterTab=o.dataset.tab,a.masterFilter={...es},A()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},A()}),e.querySelector("#master-search")?.addEventListener("keydown",o=>{o.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.page);l>=1&&(a.masterFilter={...a.masterFilter,page:l},A())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.table;if(!l)return;a.rawSelectedTable=l,a.rawPage=1;const p=await _a(l,1);a.rawRecords=p.records,a.rawTotalCount=p.total,A()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const o=await _a(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,A()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const o=await _a(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,A()}),e.querySelectorAll("[data-analytics-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsTab=o.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:p}=await N(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:f}=await Promise.resolve().then(()=>z);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:f}},void 0);a.analyticsPeriodOptions=await p(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await l(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}A()})}),e.querySelectorAll("[data-analytics-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:p,fetchPeriodChartData:m,prevYearFilter:f}=await N(async()=>{const{fetchAnalyticsByPeriod:b,fetchAvailablePeriods:x,fetchPeriodChartData:P,prevYearFilter:D}=await Promise.resolve().then(()=>z);return{fetchAnalyticsByPeriod:b,fetchAvailablePeriods:x,fetchPeriodChartData:P,prevYearFilter:D}},void 0),w=o.dataset.analyticsPeriod;if(a.analyticsPeriod=w,a.analyticsDrilldown=null,w==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await p(a.analyticsTab,w),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const b=a.analyticsPeriodFilter,[x,P,D]=await Promise.all([l(a.analyticsTab,w,b),m(w,b),m(w,f(b))]);a.analyticsPeriodRows=x,a.analyticsPeriodChartData=P,a.analyticsPrevYearChartData=D}A()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async o=>{const{fetchAnalyticsByPeriod:l,fetchPeriodChartData:p,prevYearFilter:m}=await N(async()=>{const{fetchAnalyticsByPeriod:b,fetchPeriodChartData:x,prevYearFilter:P}=await Promise.resolve().then(()=>z);return{fetchAnalyticsByPeriod:b,fetchPeriodChartData:x,prevYearFilter:P}},void 0);a.analyticsPeriodFilter=o.target.value,a.analyticsDrilldown=null;const f=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:b}=await N(async()=>{const{fiscalYearToDateRange:O}=await Promise.resolve().then(()=>Ns);return{fiscalYearToDateRange:O}},void 0),x=parseInt(f),P=b(x);b(x-1);const D=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:q}=await N(async()=>{const{supabaseRpc:O}=await Promise.resolve().then(()=>te);return{supabaseRpc:O}},void 0),[R,B,M]=await Promise.all([q(D,{p_date_from:P.from,p_date_to:P.to}),p("yearly",f),p("yearly",String(x-1))]);a.analyticsPeriodRows=(R??[]).map(O=>({code:String(O.code??""),name:String(O.name??""),amount:Number(O.amount??0),quantity:Number(O.quantity??0),documents:Number(O.documents??0),volumeMl:Number(O.volume_ml??0)})),a.analyticsPeriodChartData=(B??[]).map(O=>({...O})),a.analyticsPrevYearChartData=(M??[]).map(O=>({...O}))}else{const[b,x,P]=await Promise.all([l(a.analyticsTab,a.analyticsPeriod,f),p(a.analyticsPeriod,f),p(a.analyticsPeriod,m(f))]);a.analyticsPeriodRows=b,a.analyticsPeriodChartData=x,a.analyticsPrevYearChartData=P}A()}),e.querySelectorAll("[data-fiscal-mode]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsFiscalMode=o.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:l}=await N(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>Ns);return{monthToFiscalYear:m}},void 0),p=new Set;for(const m of a.salesAnalytics.monthlySales)p.add(l(m.month));a.analyticsPeriodOptions=[...p].sort((m,f)=>f-m).map(String)}else{const{fetchAvailablePeriods:l}=await N(async()=>{const{fetchAvailablePeriods:p}=await Promise.resolve().then(()=>z);return{fetchAvailablePeriods:p}},void 0);a.analyticsPeriodOptions=await l(a.analyticsTab,"yearly")}A()})}),e.querySelectorAll("[data-chart-metric]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsChartMetric=o.dataset.chartMetric,A()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.analyticsDrilldown??"",p=o.dataset.drilldownName??l,m=a.analyticsTab,{fetchCustomerProductBreakdown:f,fetchProductCustomerBreakdown:w,fetchEntityMonthlySales:b,periodToDateRange:x}=await N(async()=>{const{fetchCustomerProductBreakdown:R,fetchProductCustomerBreakdown:B,fetchEntityMonthlySales:M,periodToDateRange:O}=await Promise.resolve().then(()=>z);return{fetchCustomerProductBreakdown:R,fetchProductCustomerBreakdown:B,fetchEntityMonthlySales:M,periodToDateRange:O}},void 0),P=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?x(a.analyticsPeriod,a.analyticsPeriodFilter):null,[D,q]=await Promise.all([b(l,m==="customers"?"customer":"product"),m==="customers"?f(l,P?.from,P?.to):w(l,P?.from,P?.to)]);a.analyticsDrilldown={tab:m,code:l,name:p,monthlySales:D,breakdownRows:q},A()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,A()}),e.querySelector("#staff-filter-input")?.addEventListener("input",o=>{a.analyticsStaffFilter=o.target.value,A()}),e.querySelectorAll("[data-staff-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.staffDrilldown??"",p=o.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:f,periodToDateRange:w}=await N(async()=>{const{fetchStaffCustomerBreakdown:q,fetchStaffProductBreakdown:R,periodToDateRange:B}=await Promise.resolve().then(()=>z);return{fetchStaffCustomerBreakdown:q,fetchStaffProductBreakdown:R,periodToDateRange:B}},void 0),b=w(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),x=a.analyticsStaffDrilldown?.breakdownTab??"customers",[P,D]=await Promise.all([m(l,b?.from,b?.to),f(l,b?.from,b?.to)]);a.analyticsStaffDrilldown={code:l,name:p,breakdownTab:x,customerRows:P,productRows:D},A()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:o.dataset.staffBreakdownTab},A())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,A()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",o=>{a.analyticsTagFilter=o.target.value,A()}),e.querySelectorAll("[data-staff-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAvailablePeriods:l,fetchStaffTotalsByPeriod:p,periodToDateRange:m}=await N(async()=>{const{fetchAvailablePeriods:w,fetchStaffTotalsByPeriod:b,periodToDateRange:x}=await Promise.resolve().then(()=>z);return{fetchAvailablePeriods:w,fetchStaffTotalsByPeriod:b,periodToDateRange:x}},void 0),f=o.dataset.staffPeriod;if(a.analyticsStaffPeriod=f,a.analyticsStaffDrilldown=null,f==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await l("staff",f),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const w=m(f,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await p(w?.from,w?.to)}A()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async o=>{const{fetchStaffTotalsByPeriod:l,periodToDateRange:p}=await N(async()=>{const{fetchStaffTotalsByPeriod:f,periodToDateRange:w}=await Promise.resolve().then(()=>z);return{fetchStaffTotalsByPeriod:f,periodToDateRange:w}},void 0);a.analyticsStaffPeriodFilter=o.target.value;const m=p(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await l(m?.from,m?.to),a.analyticsStaffDrilldown=null,A()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Fe(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},A()}),e.querySelectorAll("[data-action='remove-line']").forEach(o=>{o.addEventListener("click",()=>{Fe(e);const l=parseInt(o.dataset.line??"0",10);a.invoiceForm.lines.splice(l,1),a.invoiceErrors=Ur(a.invoiceForm),A()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(o=>{o.addEventListener("click",()=>{Fe(e),qy(parseInt(o.dataset.line??"0",10)),a.invoiceErrors={},A()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Ty(),A()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Fe(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,A()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(o=>{o.addEventListener("click",()=>{Fe(e);const l=parseInt(o.dataset.line??"0",10),p=a.invoiceForm.lines[l];a.pickerMode="product",a.pickerTargetLine=l,a.pickerQuery=p?p.productCode||p.productName:"",A()})}),e.querySelectorAll("[data-action='modal-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("modal-backdrop")&&l.target instanceof HTMLElement&&!l.target.classList.contains("modal-backdrop")||(Ra(),A())})}),e.querySelectorAll("[data-action='picker-select']").forEach(o=>{const l=async()=>{const p=o.dataset.code??"",m=o.dataset.name??"";if(a.pickerMode==="customer"){const f=a.masterStats?.customers.find(w=>w.code===p);Dt({code:p,name:m,priceGroup:f?.priceGroup,staffCode:f?.staffCode}),delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&p&&(a.invoicePriceGroup=await Sa(p))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const f=a.invoiceForm.lines[a.pickerTargetLine];if(f){f.productCode=p,f.productName=m;const w=await xn(a.invoicePriceGroup,p);w>0&&(f.unitPrice=w),f.amount=f.quantity*f.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Ra(),A()};o.addEventListener("click",l),o.addEventListener("keydown",p=>{p.key==="Enter"&&l()})}),e.querySelector("#modal-search")?.addEventListener("input",o=>{a.pickerQuery=o.target.value,A()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Yr(),A()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Jr(e)}),e.querySelectorAll("[data-action='select-freq-customer']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.code??"",p=o.dataset.name??"",m=a.masterStats?.customers.find(f=>f.code===l);Dt({code:l,name:p,priceGroup:m?.priceGroup,staffCode:m?.staffCode}),!a.invoicePriceGroup&&l&&(a.invoicePriceGroup=await Sa(l)),delete a.invoiceErrors.customerCode,A()})}),e.querySelectorAll("[data-action='select-freq-product']").forEach(o=>{o.addEventListener("click",async()=>{Fe(e);const l=o.dataset.code??"",p=o.dataset.name??"";let m=a.invoiceForm.lines.findIndex(b=>!b.productCode);m<0&&(a.invoiceForm.lines.push({productCode:"",productName:"",quantity:1,unitPrice:0,unit:"本",amount:0}),m=a.invoiceForm.lines.length-1);const f=a.invoiceForm.lines[m];f.productCode=l,f.productName=p;const w=await xn(a.invoicePriceGroup,l);w>0&&(f.unitPrice=w),f.amount=f.quantity*f.unitPrice,A()})}),e.querySelector("[data-action='open-new-staff']")?.addEventListener("click",async()=>{const o=prompt("新規担当者の名前を入力してください:");if(!o?.trim())return;const l=`S${String(Date.now()).slice(-4)}`,{createStaff:p}=await N(async()=>{const{createStaff:f}=await Promise.resolve().then(()=>z);return{createStaff:f}},void 0),m=await p(l,o.trim());m?(a.staffList.push(m),a.invoiceForm.registeredBy=m.code,F(`担当者「${m.name}」を登録しました`,"success"),A()):F("担当者の登録に失敗しました","error")}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Fe(e),Iy(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await Sa(a.invoiceForm.customerCode)),A())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Fe(e),My(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,A())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(o=>{o.addEventListener("input",()=>{Fe(e),a.invoiceSavedDocNo=null;const l=o.dataset.field;(l==="quantity"||l==="unitPrice")&&A()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Fe(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const o=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=o.trim(),a.deliveryNote=null,a.actionLoading=!0,A(),!a.deliverySearchDocNo){F("伝票番号を入力してください","error"),a.actionLoading=!1,A();return}zn(a.deliverySearchDocNo).then(l=>{a.deliveryNote=l,a.actionLoading=!1,A()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const o=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=o,a.billingSummary=null,a.actionLoading=!0,A(),Fn(o).then(l=>{a.billingSummary=l,a.actionLoading=!1,A()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const o=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),l=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=o,a.taxMonth=l,a.taxDeclaration=null,a.taxVolume=null,a.actionLoading=!0,A(),Promise.all([Un(o,l),Jn(o,l)]).then(([p,m])=>{a.taxDeclaration=p,a.taxVolume=m,a.actionLoading=!1,A()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:o}=await N(async()=>{const{generateTaxXML:w}=await Promise.resolve().then(()=>z);return{generateTaxXML:w}},void 0),l=o(a.taxDeclaration),p=new Blob([l],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(p),f=document.createElement("a");f.href=m,f.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,f.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:o}=await N(async()=>{const{generateTaxCSV:w}=await Promise.resolve().then(()=>z);return{generateTaxCSV:w}},void 0),l=o(a.taxDeclaration),p=new Blob([l],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(p),f=document.createElement("a");f.href=m,f.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,f.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:o}=await N(async()=>{const{saveTaxDeclaration:l}=await Promise.resolve().then(()=>z);return{saveTaxDeclaration:l}},void 0);try{await o(a.taxDeclaration),F("下書き保存しました")}catch(l){F("保存に失敗: "+(l instanceof Error?l.message:String(l)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(o=>{o.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),p=o.dataset.taxField,m=o.type==="number"?Number(o.value)||0:o.value,f=[...a.taxDeclaration.rows];f[l]={...f[l],[p]:m};const{recalculateTaxDeclaration:w}=await N(async()=>{const{recalculateTaxDeclaration:b}=await Promise.resolve().then(()=>z);return{recalculateTaxDeclaration:b}},void 0);a.taxDeclaration=w({...a.taxDeclaration,rows:f}),A()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),p=o.dataset.dedField,m=o.type==="number"?Number(o.value)||0:o.value,f=[...a.taxDeclaration.deductions];f[l]={...f[l],[p]:m},a.taxDeclaration={...a.taxDeclaration,deductions:f},A()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=o.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[l]:o.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:l}=await N(async()=>{const{recalculateTaxDeclaration:f,TAX_RATE_CATEGORIES:w}=await Promise.resolve().then(()=>z);return{recalculateTaxDeclaration:f,TAX_RATE_CATEGORIES:w}},void 0),p=l[0],m={taxCategory:p.code,taxCategoryName:p.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:p.taxRatePerLiter,taxAmount:0};a.taxDeclaration=o({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),A()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(o=>{o.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),{recalculateTaxDeclaration:p}=await N(async()=>{const{recalculateTaxDeclaration:f}=await Promise.resolve().then(()=>z);return{recalculateTaxDeclaration:f}},void 0),m=a.taxDeclaration.rows.filter((f,w)=>w!==l);a.taxDeclaration=p({...a.taxDeclaration,rows:m}),A()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,o]},A()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(o=>{o.addEventListener("click",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),p=a.taxDeclaration.deductions.filter((m,f)=>f!==l);a.taxDeclaration={...a.taxDeclaration,deductions:p},A()})}),e.querySelectorAll("[data-store-tab]").forEach(o=>{o.addEventListener("click",()=>{a.storeTab=o.dataset.storeTab,A()})}),e.querySelectorAll("[data-import-entity]").forEach(o=>{o.addEventListener("click",()=>{a.importEntity=o.dataset.importEntity,a.importPreview=null,a.importResult=null,A()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const o=qr(a.importEntity),l=new Blob([o],{type:"text/csv;charset=utf-8"}),p=URL.createObjectURL(l),m=document.createElement("a");m.href=p,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(p)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const l=e.querySelector("#import-file")?.files?.[0];if(!l){F("CSVファイルを選択してください","warning");return}const p=new FileReader;p.onload=()=>{const m=String(p.result??""),{columns:f,rows:w}=Cr(m);a.importPreview=Dr(a.importEntity,f,w),a.importResult=null,A()},p.readAsText(l,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,A()}),e.querySelectorAll("[data-print-template]").forEach(o=>{o.addEventListener("click",()=>{a.printTemplate=o.dataset.printTemplate,A()})}),e.querySelectorAll("[data-print-field]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.printField;let p=o.value;(l==="taxRate"||l==="previousBalance"||l==="paymentAmount")&&(p=Number(o.value)||0),a.printData={...a.printData,[l]:p},A()})}),e.querySelectorAll("[data-print-opt]").forEach(o=>{const l=()=>{const p=o.dataset.printOpt;let m;o.type==="checkbox"?m=o.checked:p==="copies"?m=Number(o.value)||1:p==="overlayOpacity"||p==="calibrationOffsetX"||p==="calibrationOffsetY"?m=Number(o.value)||0:m=o.value,a.printOptions={...a.printOptions,[p]:m},A()};o.addEventListener("change",l),o.type==="range"&&o.addEventListener("input",l)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(o=>{o.addEventListener("change",()=>{const l=Number(o.dataset.printLine),p=o.dataset.printLfield,m=[...a.printData.lines];let f=o.value;(p==="quantity"||p==="unitPrice")&&(f=Number(o.value)||0),m[l]={...m[l],[p]:f},m[l].amount=(Number(m[l].quantity)||0)*(Number(m[l].unitPrice)||0),a.printData={...a.printData,lines:m},A()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},A()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((p,m)=>m!==l)},A()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),F("印刷設定を保存しました")}catch(o){F("保存失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const o=a.printCompany,l=prompt("会社名",o.name);if(l===null)return;const p=prompt("郵便番号",o.postalCode)??o.postalCode,m=prompt("住所",o.address1)??o.address1,f=prompt("TEL",o.tel)??o.tel,w=prompt("FAX",o.fax)??o.fax,b=prompt("適格請求書登録番号 (T+13桁)",o.registrationNo)??o.registrationNo,x=prompt("取引銀行名",o.bankName)??o.bankName,P=prompt("支店名",o.bankBranch)??o.bankBranch,D=prompt("口座番号",o.bankAccountNo)??o.bankAccountNo,q=prompt("口座名義",o.bankAccountHolder)??o.bankAccountHolder;a.printCompany={...o,name:l,postalCode:p,address1:m,tel:f,fax:w,registrationNo:b,bankName:x,bankBranch:P,bankAccountNo:D,bankAccountHolder:q},A()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,A()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const p=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=tn(o),{savePrintLayout:f}=await N(async()=>{const{savePrintLayout:b}=await Promise.resolve().then(()=>z);return{savePrintLayout:b}},void 0),w={id:`bp1701_${p.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:p,templateKey:"chain_store",positions:m};try{await f(w)?(F(`クラウド保存成功: ${p}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),A()):(F("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(b){F("保存エラー: "+(b instanceof Error?b.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const l=tn(o);a.fdSavedPositions=l;try{localStorage.setItem("sake_fd_positions",JSON.stringify(l)),F(`ローカル保存完了: ${Object.keys(l).length}件`)}catch(p){F("保存失敗: "+(p instanceof Error?p.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const p={templateKey:"chain_store",positions:tn(o),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(p,null,2)],{type:"application/json"}),f=URL.createObjectURL(m),w=document.createElement("a");w.href=f,w.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,w.click(),URL.revokeObjectURL(f)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async o=>{const l=o.target.files?.[0];if(l)try{const p=await l.text(),f=JSON.parse(p).positions;if(!f)throw new Error("positions field not found");a.fdSavedPositions=f,localStorage.setItem("sake_fd_positions",JSON.stringify(f)),F(`インポート成功: ${Object.keys(f).length}件`),A()}catch(p){F("インポート失敗: "+(p instanceof Error?p.message:""),"error")}});const _=e.querySelector("#fd-saved-layouts");_&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:o}=await N(async()=>{const{fetchPrintLayouts:p}=await Promise.resolve().then(()=>z);return{fetchPrintLayouts:p}},void 0),l=await o("chain_store");l.length===0?_.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(_.innerHTML=`☁️ クラウド保存済み (${l.length}件):<br/>`+l.map(p=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${p.id}" style="margin:4px 4px 0 0;">${p.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${p.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),_.querySelectorAll("[data-action='fd-load-layout']").forEach(p=>{p.addEventListener("click",()=>{const m=p.dataset.layoutId,f=l.find(w=>w.id===m);f&&(a.fdSavedPositions=f.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(f.positions)),F(`読込完了: ${f.name}`),A())})}),_.querySelectorAll("[data-action='fd-delete-layout']").forEach(p=>{p.addEventListener("click",async()=>{const m=p.dataset.layoutId;if(!m||!await Me("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:f}=await N(async()=>{const{deletePrintLayout:b}=await Promise.resolve().then(()=>z);return{deletePrintLayout:b}},void 0);await f(m)?(F("削除しました"),A()):F("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Me("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),A())});const S=e.querySelector("#fd-sel-x"),C=e.querySelector("#fd-sel-y");if([S,C].forEach(o=>{o?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const l=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);l&&(S&&(l.style.left=S.value+"mm"),C&&(l.style.top=C.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(o=>{o.addEventListener("dragstart",l=>{o.classList.add("wf-dragging"),l.dataTransfer?.setData("text/plain",o.dataset.wfOrder??"")}),o.addEventListener("dragend",()=>o.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",l=>{l.preventDefault();const p=l.dataTransfer?.getData("text/plain"),m=o.dataset.wfStage;if(!p||!m)return;const f=a.workflowOrders.find(w=>w.id===p);f&&(f.stage=m,A())})}),e.querySelectorAll("[data-mo-step]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moStep;o.disabled||(a.mobileOrder.step=l,A())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",o=>{a.mobileOrder.customerQuery=o.target.value,A()}),e.querySelector("#mo-product-q")?.addEventListener("input",o=>{a.mobileOrder.productQuery=o.target.value,A()}),e.querySelectorAll("[data-mo-select-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moSelectCustomer,p=a.masterStats?.customers.find(m=>m.id===l);p&&(a.mobileOrder.selectedCustomer=p),A()})}),e.querySelectorAll("[data-mo-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moAddProduct,p=a.masterStats?.products.find(f=>f.code===l);if(!p)return;const m=1800;a.mobileOrder.cart.push({productCode:p.code,productName:p.name,quantity:1,unit:"本",unitPrice:m,amount:m}),A()})}),e.querySelectorAll("[data-mo-qty]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moQty),p=o.dataset.moProduct,m=a.mobileOrder.cart.find(f=>f.productCode===p);m&&(m.quantity=Math.max(0,m.quantity+l),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(f=>f.productCode!==p)),A())})}),e.querySelectorAll("[data-mo-remove]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moRemove);a.mobileOrder.cart.splice(l,1),A()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const o=e.querySelector("#mo-memo");a.mobileOrder.memo=o?.value??"";const l="MO"+Date.now().toString().slice(-8),p=e.querySelector("[data-action='mo-submit']");p&&(p.disabled=!0,p.textContent="送信中…");const m=a.mobileOrder.cart.reduce((f,w)=>f+w.amount,0);try{const{saveStoreOrder:f}=await N(async()=>{const{saveStoreOrder:w}=await Promise.resolve().then(()=>z);return{saveStoreOrder:w}},void 0);await f(l,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(f){console.error("受注保存失敗:",f),F("送信に失敗しました","error"),p&&(p.disabled=!1,p.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=l,a.mobileOrder.step="done",A()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},A()}),e.querySelectorAll("[data-tour-id]").forEach(o=>{o.addEventListener("click",()=>{a.tourActiveId=o.dataset.tourId??null,A()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(o=>{o.addEventListener("click",()=>{const l=a.tourInquiries.find(b=>b.id===a.tourActiveId);if(!l)return;const p=o.dataset.template==="confirm"?yu:hu,m=e.querySelector("#tour-confirmed-time"),f=p.replaceAll("{name}",l.name).replaceAll("{partySize}",String(l.partySize)).replaceAll("{confirmedTime}",m?.value??l.visitDate),w=e.querySelector("#tour-reply-body");w&&(w.value=f)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const o=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",l=a.tourInquiries.find(m=>m.id===o);if(!l)return;const p=e.querySelector("#tour-confirmed-time");l.status="confirmed",l.repliedAt=new Date().toISOString(),l.confirmedTime=p?.value??"",F("返信メールを下書き保存し、ステータスを確定にしました"),A()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const o=e.querySelector("#lb-type")?.value??"",l=e.querySelector("#lb-area")?.value??"",p=e.querySelector("#lb-keyword")?.value??"";if(!o&&!p){F("業種かキーワードを入力してください","warning");return}a.leadSearchType=o,a.leadSearchArea=l,a.leadSearchQuery=p,a.leadSearching=!0,A();const m=a.integrations.find(x=>x.provider==="google_maps");if(!m||!m.config.api_key){F("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,A();return}const{searchPlaces:f}=await N(async()=>{const{searchPlaces:x}=await Promise.resolve().then(()=>z);return{searchPlaces:x}},void 0),w=[o,p].filter(Boolean).join(" "),b=await f(m,w,l);a.leadSearching=!1,b.error?F("検索失敗: "+b.error,"error"):a.leadSearchResults=b.results,A()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],A()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const o=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!o)return;const l=`ll_${Date.now()}`,p={id:l,name:o,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:f,fetchLeadLists:w,fetchLeadItems:b}=await N(async()=>{const{saveLeadList:D,saveLeadItem:q,fetchLeadLists:R,fetchLeadItems:B}=await Promise.resolve().then(()=>z);return{saveLeadList:D,saveLeadItem:q,fetchLeadLists:R,fetchLeadItems:B}},void 0);await m(p);const x=e.querySelectorAll(".lb-search-check:checked"),P=Array.from(x).map(D=>Number(D.dataset.idx));for(const D of P){const q=a.leadSearchResults[D];q&&await f({...q,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:l,businessType:a.leadSearchType})}a.leadLists=await w(),a.leadActiveListId=l,a.leadItems=await b(l),a.leadSearchResults=[],F(`${P.length}件を「${o}」として保存しました`),A()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.leadActiveListId=l,l){const{fetchLeadItems:p}=await N(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>z);return{fetchLeadItems:m}},void 0);a.leadItems=await p(l)}A()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=a.leadItems.find(w=>w.id===l);if(!p)return;const{saveLeadItem:m,fetchLeadItems:f}=await N(async()=>{const{saveLeadItem:w,fetchLeadItems:b}=await Promise.resolve().then(()=>z);return{saveLeadItem:w,fetchLeadItems:b}},void 0);await m({...p,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await f(a.leadActiveListId)),A()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=a.leadItems.find(b=>b.id===l);if(!p)return;const{convertLeadToProspect:m,fetchLeadItems:f}=await N(async()=>{const{convertLeadToProspect:b,fetchLeadItems:x}=await Promise.resolve().then(()=>z);return{convertLeadToProspect:b,fetchLeadItems:x}},void 0);await m(p)&&(F("見込客に追加しました: "+p.companyName),a.leadActiveListId&&(a.leadItems=await f(a.leadActiveListId)),A())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const o=e.querySelectorAll(".lb-item-check:checked");if(o.length===0&&!await Me("全ての新規アイテムを見込客に変換しますか？"))return;const l=o.length>0?Array.from(o).map(w=>w.dataset.id):a.leadItems.filter(w=>w.status==="new").map(w=>w.id),{convertLeadToProspect:p,fetchLeadItems:m}=await N(async()=>{const{convertLeadToProspect:w,fetchLeadItems:b}=await Promise.resolve().then(()=>z);return{convertLeadToProspect:w,fetchLeadItems:b}},void 0);let f=0;for(const w of l){const b=a.leadItems.find(x=>x.id===w);b&&b.status==="new"&&await p(b)&&f++}F(`${f}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),A()}),e.querySelectorAll("[data-analysis-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.analysisTab;a.analysisTab!==l&&(a.analysisTab=l,A())})}),e.querySelector("#analysis-period-year")?.addEventListener("change",async o=>{const l=o.target.value,p=e.querySelector("#analysis-period-month")?.value??"";a.analysisPeriod=l&&p?`${l}-${p}`:l,a.customerAnalysis=null,a.productABC=null,await ea("/customer-analysis"),A()}),e.querySelector("#analysis-period-month")?.addEventListener("change",async o=>{const l=o.target.value,p=e.querySelector("#analysis-period-year")?.value??"";a.analysisPeriod=p&&l?`${p}-${l}`:p,a.customerAnalysis=null,a.productABC=null,await ea("/customer-analysis"),A()}),e.querySelector("#customer-map")){const o=()=>{window.google?.maps?Qy(e):setTimeout(o,200)};o()}e.querySelectorAll(".churn-reason-select").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",p=o.value;try{const{saveChurnNote:m}=await N(async()=>{const{saveChurnNote:b}=await Promise.resolve().then(()=>z);return{saveChurnNote:b}},void 0);await m({customerCode:l,reason:p,memo:"",actionedAt:null});const f=a.churnNotes.find(b=>b.customerCode===l);f?f.reason=p:a.churnNotes.push({customerCode:l,reason:p,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const w=o.closest("tr");if(w){const b=w.querySelector("td:nth-child(2)");if(b){let x=b.querySelector(".reason-badge");!x&&p&&(x=document.createElement("span"),x.className="status-pill info reason-badge",x.style.fontSize="0.72rem",b.appendChild(x)),x&&(x.textContent=p?$y[p]??"":"")}}F("理由を保存しました")}catch(m){F("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",p=o.checked,m=o.closest("tr");m&&(m.style.opacity=p?"0.45":"",m.setAttribute("data-actioned",p?"1":"0"));try{const{saveChurnNote:f}=await N(async()=>{const{saveChurnNote:P}=await Promise.resolve().then(()=>z);return{saveChurnNote:P}},void 0),w=a.churnNotes.find(P=>P.customerCode===l),b=w?.reason??"",x=new Date().toISOString().slice(0,10);await f({customerCode:l,reason:b,memo:"",actionedAt:p?x:null}),w?w.actionedAt=p?x:null:a.churnNotes.push({customerCode:l,reason:b,memo:"",actionedAt:p?x:null,updatedAt:new Date().toISOString()}),F(p?"対応済みにしました":"対応済みを解除しました")}catch(f){F("保存に失敗しました","error"),console.error(f)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const o=a.integrations.find(f=>f.provider==="ivry");if(!o||!o.isEnabled){F("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:l,fetchCallLogs:p}=await N(async()=>{const{syncIvryCallLogs:f,fetchCallLogs:w}=await Promise.resolve().then(()=>z);return{syncIvryCallLogs:f,fetchCallLogs:w}},void 0),m=await l(o);m.error?F("同期失敗: "+m.error,"error"):(F(`${m.count}件の通話履歴を同期しました`),a.callLogs=await p(100),A())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const o=a.integrations.find(f=>f.provider==="ivry");if(!o||!o.isEnabled){F("IVRy連携が無効です","warning");return}if(!await Me("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:l}=await N(async()=>{const{syncPhoneBookToIvry:f}=await Promise.resolve().then(()=>z);return{syncPhoneBookToIvry:f}},void 0),p=[];a.masterStats?.customers.forEach(f=>{p.push({name:f.name,phone:"",customerCode:f.code,note:"既存取引先"})}),a.prospects.forEach(f=>{f.phone&&p.push({name:f.companyName,phone:f.phone,customerCode:f.id,note:`見込客 (${f.stage})`})});const m=await l(o,p);m.error?F("送信失敗: "+m.error,"error"):F(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=o.dataset.phone??"",m=prompt(`電話番号 ${p} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const f=a.callLogs.find(x=>x.id===l);if(!f)return;const{saveCallLog:w,fetchCallLogs:b}=await N(async()=>{const{saveCallLog:x,fetchCallLogs:P}=await Promise.resolve().then(()=>z);return{saveCallLog:x,fetchCallLogs:P}},void 0);await w({...f,matchedCustomerCode:m}),a.callLogs=await b(100),A()})}),e.querySelectorAll("[data-action='call-memo']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=a.callLogs.find(b=>b.id===l);if(!p)return;const m=prompt("メモを入力:",p.notes??"");if(m===null)return;const{saveCallLog:f,fetchCallLogs:w}=await N(async()=>{const{saveCallLog:b,fetchCallLogs:x}=await Promise.resolve().then(()=>z);return{saveCallLog:b,fetchCallLogs:x}},void 0);await f({...p,notes:m}),a.callLogs=await w(100),A()})}),e.querySelectorAll("[data-prospect-view]").forEach(o=>{o.addEventListener("click",()=>{a.prospectViewMode=o.dataset.prospectView,A()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",A()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:p}=await N(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>z);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await p(l)}A()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.prospectId??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:p}=await N(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>z);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await p(l)}A()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],A())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const o=a.prospectEditingId==="__new__",l=o?`p_${Date.now()}`:a.prospectEditingId??"",p={id:l,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!p.companyName){F("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:f,recordAudit:w,sendSlackNotification:b}=await N(async()=>{const{saveProspect:P,fetchProspects:D,recordAudit:q,sendSlackNotification:R}=await Promise.resolve().then(()=>z);return{saveProspect:P,fetchProspects:D,recordAudit:q,sendSlackNotification:R}},void 0);await m(p)?(o&&await b("new_prospect",`新規見込客: ${p.companyName} / 想定 ¥${p.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await w({action:o?"prospect_create":"prospect_update",entityType:"prospect",entityId:l,userEmail:a.user?.email}),a.prospects=await f(),a.prospectEditingId=null,A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteProspect:p,fetchProspects:m}=await N(async()=>{const{deleteProspect:f,fetchProspects:w}=await Promise.resolve().then(()=>z);return{deleteProspect:f,fetchProspects:w}},void 0);await p(l)&&(a.prospects=await m(),A())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const p=o.dataset.id??"",m=o.dataset.name??"",f=o.dataset.addr??"";a.quoteState=Ma(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=f,a.quoteState.isProspect=!0,a.quoteState.prospectId=p,a.quotePricing=null,a.quoteEditId="new",ft("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",l=e.querySelector("#prospect-activity-type")?.value??"call",p=e.querySelector("#prospect-activity-title")?.value??"";if(!p){F("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:f}=await N(async()=>{const{saveProspectActivity:w,fetchProspectActivities:b}=await Promise.resolve().then(()=>z);return{saveProspectActivity:w,fetchProspectActivities:b}},void 0);await m({id:`act_${Date.now()}`,prospectId:o,activityType:l,title:p,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await f(o),A()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("dragstart",l=>{l.dataTransfer?.setData("text/plain",o.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",async l=>{l.preventDefault();const p=l.dataTransfer?.getData("text/plain"),m=o.dataset.prospectStage;if(!p)return;const f=a.prospects.find(w=>w.id===p);if(f&&f.stage!==m){const w={...f,stage:m},{saveProspect:b}=await N(async()=>{const{saveProspect:x}=await Promise.resolve().then(()=>z);return{saveProspect:x}},void 0);await b(w),f.stage=m,A()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:o,saveIntegrationSetting:l}=await N(async()=>{const{fetchIntegrationSettings:x,saveIntegrationSetting:P}=await Promise.resolve().then(()=>z);return{fetchIntegrationSettings:x,saveIntegrationSetting:P}},void 0),m=(a.integrations.length>0?a.integrations:await o()).find(x=>x.provider==="slack");if(!m)return;const f=e.querySelector("#slack-webhook")?.value??"",w=e.querySelector("#slack-default-channel")?.value??"",b=e.querySelector("#slack-enabled")?.checked??!1;await l({...m,config:{...m.config,webhook_url:f,default_channel:w},isEnabled:b}),a.integrations=await o(),F("保存しました"),A()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:o,fetchSlackRules:l}=await N(async()=>{const{saveSlackRule:p,fetchSlackRules:m}=await Promise.resolve().then(()=>z);return{saveSlackRule:p,fetchSlackRules:m}},void 0);for(const p of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="enabled"]`)?.checked??p.enabled,f=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="channel"]`)?.value??p.channel;await o({...p,enabled:m,channel:f})}a.slackRules=await l(),F("ルールを保存しました"),A()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:o}=await N(async()=>{const{sendSlackNotification:p}=await Promise.resolve().then(()=>z);return{sendSlackNotification:p}},void 0),l=await o("new_order","🧪 これはテスト通知です (syusen-cloud)");l.ok?F("テスト送信成功"):F("送信失敗: "+(l.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,A()}),e.querySelectorAll("[data-action='material-adjust']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"",p=a.materialList.find(m=>m.id===l);p&&(a.materialEditing=p,a.materialEditingIsNew=!1,A())})}),e.querySelectorAll("[data-action='material-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,A())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const l={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(l.materialType=e.querySelector("#mat-type")?.value??"",!l.code||!l.name){F("コードと品名は必須です","warning");return}const{saveMaterial:p,fetchMaterialList:m}=await N(async()=>{const{saveMaterial:w,fetchMaterialList:b}=await Promise.resolve().then(()=>z);return{saveMaterial:w,fetchMaterialList:b}},void 0);await p(l)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,F("保存しました"),A()):F("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!o||!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:l,fetchMaterialList:p}=await N(async()=>{const{deleteMaterial:m,fetchMaterialList:f}=await Promise.resolve().then(()=>z);return{deleteMaterial:m,fetchMaterialList:f}},void 0);await l(o)&&(a.materialList=await p(),a.materialEditing=null,A())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",A()}),e.querySelectorAll("[data-action='user-edit']").forEach(o=>{o.addEventListener("click",()=>{a.userEditingId=o.dataset.id??null,A()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,A()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const o=a.userEditingId==="__new__",l=o?crypto.randomUUID():a.userEditingId??"",p=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!p||!m){F("名前とメールアドレスは必須です","warning");return}const f={id:l,email:p,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(o){const D=e.querySelector("#user-password")?.value??"";if(D.length<8){F("パスワードは8文字以上必要です","warning");return}try{await ys(p,D)}catch(q){F("Auth登録失敗: "+(q instanceof Error?q.message:""),"error");return}}const{saveUserProfile:w,fetchUserProfiles:b,recordAudit:x}=await N(async()=>{const{saveUserProfile:D,fetchUserProfiles:q,recordAudit:R}=await Promise.resolve().then(()=>z);return{saveUserProfile:D,fetchUserProfiles:q,recordAudit:R}},void 0);await w(f)?(await x({action:o?"user_create":"user_update",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await b(),a.userEditingId=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteUserProfile:p,fetchUserProfiles:m,recordAudit:f}=await N(async()=>{const{deleteUserProfile:b,fetchUserProfiles:x,recordAudit:P}=await Promise.resolve().then(()=>z);return{deleteUserProfile:b,fetchUserProfiles:x,recordAudit:P}},void 0);await p(l)?(await f({action:"user_delete",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await m(),A()):F("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const o=e.querySelector("#profile-sender")?.value??"",l={...a.myProfile,defaultMailSenderId:o},{saveUserProfile:p}=await N(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>z);return{saveUserProfile:m}},void 0);await p(l),a.myProfile=l,F("保存しました"),A()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const o=e.querySelector("#profile-new-password")?.value??"";if(o.length<8){F("8文字以上のパスワードを入力してください","warning");return}try{await pi(o),F("パスワードを変更しました")}catch(l){F("変更失敗: "+(l instanceof Error?l.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(o=>{o.addEventListener("click",()=>{a.integrationEditingId=o.dataset.id??null,A()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,A()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='int-save']")?.dataset.id??"",l=a.integrations.find(x=>x.id===o);if(!l)return;const p={...l.config};Object.keys(p).forEach(x=>{const P=e.querySelector(`#int-${x}`);P&&(p[x]=P.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:f,fetchIntegrationSettings:w}=await N(async()=>{const{saveIntegrationSetting:x,fetchIntegrationSettings:P}=await Promise.resolve().then(()=>z);return{saveIntegrationSetting:x,fetchIntegrationSettings:P}},void 0);await f({...l,config:p,isEnabled:m})?(a.integrations=await w(),a.integrationEditingId=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find(w=>w.provider==="shopify");if(!l){F("Shopify連携が未設定です","warning");return}o.textContent="同期中…",o.disabled=!0;const{syncShopifyOrders:p,fetchShopifyOrders:m}=await N(async()=>{const{syncShopifyOrders:w,fetchShopifyOrders:b}=await Promise.resolve().then(()=>z);return{syncShopifyOrders:w,fetchShopifyOrders:b}},void 0),f=await p(l);f.error?F("同期失敗: "+f.error,"error"):(F(`${f.count}件を同期しました`),a.shopifyOrders=await m()),A()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find(w=>w.provider==="google_calendar");if(!l)return;o.textContent="同期中…",o.disabled=!0;const{syncGoogleCalendar:p,fetchCalendarEvents:m}=await N(async()=>{const{syncGoogleCalendar:w,fetchCalendarEvents:b}=await Promise.resolve().then(()=>z);return{syncGoogleCalendar:w,fetchCalendarEvents:b}},void 0),f=await p(l);f.error?F("同期失敗: "+f.error,"error"):(F(`${f.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),A()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const l=e.querySelector("#fax-file")?.files?.[0];if(!l){F("FAX画像を選択してください","warning");return}const p=a.integrations.find(m=>m.provider==="cloud_vision");if(!p||!p.config.api_key){F("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,A();try{const m=new FileReader;m.onload=async()=>{const f=String(m.result??""),{ocrFaxImage:w,saveFaxRecord:b,fetchFaxInbox:x}=await N(async()=>{const{ocrFaxImage:R,saveFaxRecord:B,fetchFaxInbox:M}=await Promise.resolve().then(()=>z);return{ocrFaxImage:R,saveFaxRecord:B,fetchFaxInbox:M}},void 0),P=await w(p,f),D=e.querySelector("#fax-sender-name")?.value??"",q=e.querySelector("#fax-sender-phone")?.value??"";await b({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:D,senderPhone:q,ocrStatus:P.error?"failed":"done",ocrText:P.text}),a.faxOcrText=P.error?`エラー: ${P.error}`:P.text,a.faxRecords=await x(),a.faxProcessing=!1,A()},m.readAsDataURL(l)}catch(m){F("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,A()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",A()}),e.querySelectorAll("[data-action='ms-edit']").forEach(o=>{o.addEventListener("click",()=>{a.mailSenderEditingId=o.dataset.id??null,A()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,A()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,l={id:o,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(w=>w.id===o)?.isVerified??!1};if(!l.name||!l.email){F("名前とメールアドレスは必須です","warning");return}const{saveMailSender:p,fetchMailSenders:m}=await N(async()=>{const{saveMailSender:w,fetchMailSenders:b}=await Promise.resolve().then(()=>z);return{saveMailSender:w,fetchMailSenders:b}},void 0);await p(l)?(a.mailSenders=await m(),a.mailSenderEditingId=null,F("保存しました"),A()):F("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteMailSender:p,fetchMailSenders:m}=await N(async()=>{const{deleteMailSender:w,fetchMailSenders:b}=await Promise.resolve().then(()=>z);return{deleteMailSender:w,fetchMailSenders:b}},void 0);await p(l)?(a.mailSenders=await m(),A()):F("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(o=>{o.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){F("データなし","error");return}const o=a.demandAnalysis,l=Object.entries(o.matrix).map(([m,f])=>{const w={productCode:m};return o.months.forEach(b=>{w[b]=f[b]??0}),w}),p=[{key:"productCode",label:"商品コード"},...o.months.map(m=>({key:m,label:m}))];qn("demand-analysis.csv",l,p)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){F("データなし","error");return}const o=a.productionPlan.map(p=>({...p}));qn("production-plan.csv",o,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Me("当月の全請求を締め切りますか？")&&F("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async o=>{const l=parseInt(o.target.value);a.brewingPlanFY=l;const{fetchBrewingPlanSummary:p,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:f,fetchBrewingProductDetail:w,fetchBrewingCustomCategories:b,fetchBrewingCategoryOverrides:x,fetchAllBrewingStockEntries:P}=await N(async()=>{const{fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:V,fetchBrewingSchedule:U,fetchBrewingProductDetail:W,fetchBrewingCustomCategories:H,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:Z}=await Promise.resolve().then(()=>z);return{fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:V,fetchBrewingSchedule:U,fetchBrewingProductDetail:W,fetchBrewingCustomCategories:H,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:Z}},void 0),[D,q,R,B,M,O,I]=await Promise.all([p(`${l}-10-01`,`${l+1}-09-30`),m(`${l}-10-01`,`${l+1}-09-30`),f(l),w(`${l}-10-01`,`${l+1}-09-30`),b(),x(),P()]);a.brewingPlanData=D,a.brewingMonthlyTrend=q,a.brewingSchedule=R,a.brewingProductDetail=B,a.brewingStockEntries=I,a.brewingCustomCategories=M,a.brewingOverrides=O,a.brewingExcludedProducts=new Set,A()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",p=o.dataset.parent??"";if(!l||!p)return;if(o.checked){a.brewingExcludedProducts.delete(l),A();return}a.brewingExcludedProducts.add(l);const m=a.brewingCustomCategories.filter(f=>f.parentCategory===p);if(m.length===1){const{setBrewingCategoryOverride:f,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:x}=await N(async()=>{const{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:V}=await Promise.resolve().then(()=>z);return{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:V}},void 0);await f(l,m[0].name);const P=a.brewingPlanFY,{fetchBrewingYearlyShipments:D}=await N(async()=>{const{fetchBrewingYearlyShipments:O}=await Promise.resolve().then(()=>z);return{fetchBrewingYearlyShipments:O}},void 0),[q,R,B,M]=await Promise.all([w(`${P}-10-01`,`${P+1}-09-30`),b(`${P}-10-01`,`${P+1}-09-30`),x(),D()]);a.brewingPlanData=q,a.brewingProductDetail=R,a.brewingOverrides=B,a.brewingYearlyShipments=M,a.brewingExcludedProducts.delete(l)}A()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",p=o.dataset.cat??"";if(!l||!p)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:b,fetchBrewingYearlyShipments:x}=await N(async()=>{const{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:V}=await Promise.resolve().then(()=>z);return{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:V}},void 0);await m(l,p);const P=a.brewingPlanFY,[D,q,R,B]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),w(`${P}-10-01`,`${P+1}-09-30`),b(),x()]);a.brewingPlanData=D,a.brewingProductDetail=q,a.brewingOverrides=R,a.brewingYearlyShipments=B,A()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"";if(!l)return;const{setBrewingCategoryOverride:p,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:f,fetchBrewingCategoryOverrides:w,fetchBrewingYearlyShipments:b}=await N(async()=>{const{setBrewingCategoryOverride:B,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:I,fetchBrewingYearlyShipments:j}=await Promise.resolve().then(()=>z);return{setBrewingCategoryOverride:B,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:I,fetchBrewingYearlyShipments:j}},void 0);await p(l,null);const x=a.brewingPlanFY,[P,D,q,R]=await Promise.all([m(`${x}-10-01`,`${x+1}-09-30`),f(`${x}-10-01`,`${x+1}-09-30`),w(),b()]);a.brewingPlanData=P,a.brewingProductDetail=D,a.brewingOverrides=q,a.brewingYearlyShipments=R,A()})}),(()=>{const o=e.querySelector("#gantt-timeline");if(!o)return;const l=[9,10,11,12,1,2,3,4,5],p=l.length;let m=null,f=null;o.querySelectorAll(".gantt-bar").forEach(q=>{q.style.pointerEvents="auto"});function w(q){return"touches"in q?q.touches[0].clientX:q.clientX}function b(q){const R=q.target,B=R.closest(".gantt-bar");if(!B)return;const M=B.parentElement,O=B.dataset.cat??"",I=parseInt(B.dataset.month??"0"),j=parseInt(B.dataset.dur??"1"),V=parseInt(B.dataset.vol??"0"),U=M.offsetWidth/p;let W="move";R.classList.contains("gantt-resize-right")?W="resize-right":R.classList.contains("gantt-resize-left")&&(W="resize-left"),B.style.cursor=W==="move"?"grabbing":"ew-resize",B.style.opacity="0.8",B.style.zIndex="10",m={bar:B,mode:W,cat:O,origMonth:I,origDur:j,origVol:V,startX:w(q),cellW:U,origLeftPct:parseFloat(B.style.left),origWidthPct:parseFloat(B.style.width)},q.preventDefault()}function x(q){if(!m)return;const{bar:R,mode:B,origDur:M,startX:O,cellW:I,origLeftPct:j,origWidthPct:V}=m,U=w(q)-O,W=Math.round(U/I),H=Math.round(j/100*p);if(B==="move"){const Q=Math.max(0,Math.min(p-M,H+W));R.style.left=(Q/p*100).toFixed(2)+"%"}else if(B==="resize-right"){const Q=Math.max(1,Math.min(p-H,M+W));R.style.width=(Q/p*100).toFixed(2)+"%"}else if(B==="resize-left"){const Q=Math.max(0,Math.min(H+M-1,H+W)),Z=M-(Q-H);R.style.left=(Q/p*100).toFixed(2)+"%",R.style.width=(Z/p*100).toFixed(2)+"%"}}async function P(q){if(!m)return;const{bar:R,cat:B,origMonth:M,origDur:O,origVol:I}=m,j=Math.round(parseFloat(R.style.left)/100*p),V=Math.max(1,Math.round(parseFloat(R.style.width)/100*p)),U=l[Math.max(0,Math.min(p-1,j))];if(R.style.cursor="grab",R.style.opacity="1",R.style.zIndex="",m=null,U===M&&V===O)return;const{saveBrewingSchedule:W,fetchBrewingSchedule:H}=await N(async()=>{const{saveBrewingSchedule:Z,fetchBrewingSchedule:ee}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:Z,fetchBrewingSchedule:ee}},void 0),Q=a.brewingSchedule.filter(Z=>Z.brewCategory===B).map(Z=>Z.brewMonth===M?{brewMonth:U,durationMonths:V,plannedVolumeL:I}:{brewMonth:Z.brewMonth,durationMonths:Z.durationMonths,plannedVolumeL:Z.plannedVolumeL});await W(B,a.brewingPlanFY,Q),a.brewingSchedule=await H(a.brewingPlanFY),A()}o.addEventListener("mousedown",b),o.addEventListener("touchstart",b,{passive:!1}),document.addEventListener("mousemove",x),document.addEventListener("touchmove",x,{passive:!1}),document.addEventListener("mouseup",P),document.addEventListener("touchend",P);function D(q){const R=q.dataset.cat??"",B=parseInt(q.dataset.month??"0"),M=parseInt(q.dataset.vol??"0"),O=parseInt(q.dataset.max??"99999"),I=q.querySelector(".gantt-bar-label");if(!I||I.querySelector("input"))return;const j=document.createElement("input");j.type="number",j.min="0",j.max=String(O),j.step="100",j.value=String(M),j.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",I.textContent="",I.style.pointerEvents="auto",I.appendChild(j),j.focus(),j.select();const V=async()=>{const U=parseFloat(j.value)||0;if(I.style.pointerEvents="none",I.textContent=k(Math.round(U))+"L",Math.abs(U-M)<1)return;const{saveBrewingSchedule:W,fetchBrewingSchedule:H}=await N(async()=>{const{saveBrewingSchedule:Z,fetchBrewingSchedule:ee}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:Z,fetchBrewingSchedule:ee}},void 0),Q=a.brewingSchedule.filter(Z=>Z.brewCategory===R).map(Z=>({brewMonth:Z.brewMonth,durationMonths:Z.durationMonths,plannedVolumeL:Z.brewMonth===B?U:Z.plannedVolumeL}));await W(R,a.brewingPlanFY,Q),a.brewingSchedule=await H(a.brewingPlanFY),A()};j.addEventListener("blur",V),j.addEventListener("keydown",U=>{U.key==="Enter"&&j.blur()})}o.addEventListener("dblclick",q=>{const R=q.target.closest(".gantt-bar");R&&D(R)}),o.addEventListener("touchstart",q=>{const R=q.target.closest(".gantt-bar");if(R){if(f){clearTimeout(f),f=null,D(R);return}f=setTimeout(()=>{f=null},300)}},{passive:!0}),o.querySelectorAll(".gantt-bar-container").forEach(q=>{q.style.pointerEvents="auto";const R=async B=>{if(m)return;const M=q.dataset.cat??"",O=parseInt(q.dataset.max??"0"),I=q.getBoundingClientRect(),j=B-I.left,V=Math.floor(j/(I.width/p)),U=l[Math.max(0,Math.min(p-1,V))];if(a.brewingSchedule.some(ee=>ee.brewCategory===M&&ee.brewMonth===U))return;const W=Math.round(O*.3)||500,{saveBrewingSchedule:H,fetchBrewingSchedule:Q}=await N(async()=>{const{saveBrewingSchedule:ee,fetchBrewingSchedule:ne}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:ee,fetchBrewingSchedule:ne}},void 0),Z=[...a.brewingSchedule.filter(ee=>ee.brewCategory===M).map(ee=>({brewMonth:ee.brewMonth,durationMonths:ee.durationMonths,plannedVolumeL:ee.plannedVolumeL})),{brewMonth:U,durationMonths:2,plannedVolumeL:W}];await H(M,a.brewingPlanFY,Z),a.brewingSchedule=await Q(a.brewingPlanFY),A()};q.addEventListener("click",B=>{B.target.closest(".gantt-bar")||R(B.clientX)})})})();function k(o){return o.toLocaleString("ja-JP")}(()=>{const o=e.querySelector("#bp-gantt");if(!o)return;let l=null;function p(w){const b=w.target,x=b.closest(".bp-gantt-bar");if(!x)return;let P="move";b.classList.contains("bp-gantt-resize-right")?P="resize-right":b.classList.contains("bp-gantt-resize-left")&&(P="resize-left");const D="touches"in w?w.touches[0].clientX:w.clientX;x.style.opacity="0.7",x.style.zIndex="10",l={bar:x,mode:P,stepId:x.dataset.stepId??"",startX:D,origLeft:parseFloat(x.style.left),origWidth:parseFloat(x.style.width)},w.preventDefault()}function m(w){if(!l)return;const x=("touches"in w?w.touches[0].clientX:w.clientX)-l.startX;l.mode==="move"?l.bar.style.left=l.origLeft+x+"px":l.mode==="resize-right"?l.bar.style.width=Math.max(6,l.origWidth+x)+"px":(l.bar.style.left=l.origLeft+x+"px",l.bar.style.width=Math.max(6,l.origWidth-x)+"px")}async function f(){if(!l)return;const{bar:w,stepId:b,origLeft:x,origWidth:P}=l,D=parseFloat(w.style.left),q=parseFloat(w.style.width);w.style.opacity="1",w.style.zIndex="",l=null;const R=Math.round((D-x)/6),B=Math.round((q-P)/6);if(R===0&&B===0)return;const M=w.dataset.plannedStart??"",O=w.dataset.plannedEnd??"";if(!M||!O)return;const I=(J,X)=>{const se=new Date(J);return se.setDate(se.getDate()+X),se.toISOString().slice(0,10)};let j=M,V=O;R!==0&&B===0?(j=I(M,R),V=I(O,R)):B!==0&&R===0?V=I(O,B):(j=I(M,R),V=I(O,R+B));const U=w.dataset.batchId??"",W=parseInt(w.dataset.stepOrder??"0"),{updateBrewingProcessStep:H,fetchBrewingProcessSteps:Q}=await N(async()=>{const{updateBrewingProcessStep:J,fetchBrewingProcessSteps:X}=await Promise.resolve().then(()=>z);return{updateBrewingProcessStep:J,fetchBrewingProcessSteps:X}},void 0),Z=a.brewingProcessSteps.filter(J=>J.batchId===U).sort((J,X)=>J.stepOrder-X.stepOrder);await H(b,{planned_start:j,planned_end:V});let ee=V;for(const J of Z){if(J.stepOrder<=W)continue;const X=Math.max(Math.round((new Date(J.plannedEnd).getTime()-new Date(J.plannedStart).getTime())/864e5),0),se=I(ee,1),ge=I(se,X);await H(J.id,{planned_start:se,planned_end:ge}),ee=ge}let ne=j;for(let J=Z.length-1;J>=0;J--){const X=Z[J];if(X.stepOrder>=W)continue;const se=Math.max(Math.round((new Date(X.plannedEnd).getTime()-new Date(X.plannedStart).getTime())/864e5),0),ge=I(ne,-1),de=I(ge,-se);await H(X.id,{planned_start:de,planned_end:ge}),ne=de}Z.map(J=>(J.stepOrder<W&&Math.round((new Date(J.plannedEnd).getTime()-new Date(J.plannedStart).getTime())/864e5),J));const{updateBrewingBatch:K}=await N(async()=>{const{updateBrewingBatch:J}=await Promise.resolve().then(()=>z);return{updateBrewingBatch:J}},void 0);await K(U,{start_date:Z[0].stepOrder<W?I(j,-Z.filter(J=>J.stepOrder<W).reduce((J,X)=>J+Math.round((new Date(X.plannedEnd).getTime()-new Date(X.plannedStart).getTime())/864e5)+1,0)):W===1?j:void 0,target_end_date:ee}),a.brewingProcessSteps=await Q(a.brewingBatches.map(J=>J.id)),A()}o.addEventListener("mousedown",p),o.addEventListener("touchstart",p,{passive:!1}),document.addEventListener("mousemove",m),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("mouseup",f),document.addEventListener("touchend",f)})(),e.querySelector("[data-action='bp-auto-schedule']")?.addEventListener("click",async()=>{if(a.brewingBatches.length===0)return;const o=e.querySelector("[data-action='bp-auto-schedule']");o&&(o.textContent="計算中...",o.disabled=!0);const{autoScheduleAllBatches:l,fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{autoScheduleAllBatches:b,fetchBrewingBatches:x,fetchBrewingProcessSteps:P}=await Promise.resolve().then(()=>z);return{autoScheduleAllBatches:b,fetchBrewingBatches:x,fetchBrewingProcessSteps:P}},void 0),{fetchTanks:f}=await N(async()=>{const{fetchTanks:b}=await Promise.resolve().then(()=>z);return{fetchTanks:b}},void 0),w=await f().catch(()=>[]);await l(a.brewingBatches,a.bpWorkerSettings,a.bpStepLabor,w),a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(b=>b.id)):[],A()});for(const o of["bp-worker-count","bp-worker-hours","bp-worker-start"])e.querySelector(`[data-action='${o}']`)?.addEventListener("change",async l=>{const p=parseFloat(l.target.value)||0;o==="bp-worker-count"?a.bpWorkerSettings.workerCount=p:o==="bp-worker-hours"?a.bpWorkerSettings.weeklyHoursLimit=p:a.bpWorkerSettings.dayStartHour=p;const{saveWorkerSettings:m}=await N(async()=>{const{saveWorkerSettings:f}=await Promise.resolve().then(()=>z);return{saveWorkerSettings:f}},void 0);await m(a.bpWorkerSettings),A()});e.querySelector("[data-action='bp-worker-deadline']")?.addEventListener("change",async o=>{a.bpWorkerSettings.deadlineDate=o.target.value;const{saveWorkerSettings:l}=await N(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>z);return{saveWorkerSettings:p}},void 0);await l(a.bpWorkerSettings),A()}),e.querySelector("[data-action='bp-worker-sunday']")?.addEventListener("change",async o=>{a.bpWorkerSettings.allowSunday=o.target.checked;const{saveWorkerSettings:l}=await N(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>z);return{saveWorkerSettings:p}},void 0);await l(a.bpWorkerSettings),A()}),e.querySelector("[data-action='bp-tank-add']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-tank-no")?.value?.trim()??"",l=parseFloat(e.querySelector("#bp-tank-cap")?.value??"0"),p=e.querySelector("#bp-tank-cats")?.value?.trim()??"";if(!o||l<=0)return;const m=p?p.split(/[,、]/).map(b=>b.trim()).filter(Boolean):[],{addTank:f,fetchTanks:w}=await N(async()=>{const{addTank:b,fetchTanks:x}=await Promise.resolve().then(()=>z);return{addTank:b,fetchTanks:x}},void 0);await f(o,l,"",m),a.bpTanks=await w(),A()}),e.querySelectorAll("[data-action='bp-tank-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.tankId??"";if(!l)return;const{deleteTank:p,fetchTanks:m}=await N(async()=>{const{deleteTank:f,fetchTanks:w}=await Promise.resolve().then(()=>z);return{deleteTank:f,fetchTanks:w}},void 0);await p(l),a.bpTanks=await m(),A()})}),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const o=e.querySelectorAll("[data-action='bp-import-check']:checked");if(o.length===0)return;const{createBrewingBatch:l,fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{createBrewingBatch:f,fetchBrewingBatches:w,fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>z);return{createBrewingBatch:f,fetchBrewingBatches:w,fetchBrewingProcessSteps:b}},void 0);for(const f of o){const w=f.dataset.cat??"",b=f.dataset.code??"",x=parseFloat(f.dataset.vol??"0"),P=f.dataset.date??"";!w||!b||!P||await l(w,b,a.brewingPlanFY,x,P,a.brewingProcessSteps,a.brewingRiceParams)}a.brewingBatches=await p(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await m(a.brewingBatches.map(f=>f.id))),A()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,A()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-new-cat")?.value??"",l=e.querySelector("#bp-new-code")?.value?.trim()??"",p=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!o||!l||!m)return;const{createBrewingBatch:f,fetchBrewingBatches:w,fetchBrewingProcessSteps:b}=await N(async()=>{const{createBrewingBatch:x,fetchBrewingBatches:P,fetchBrewingProcessSteps:D}=await Promise.resolve().then(()=>z);return{createBrewingBatch:x,fetchBrewingBatches:P,fetchBrewingProcessSteps:D}},void 0);await f(o,l,a.brewingPlanFY,p,m,a.brewingProcessSteps,a.brewingRiceParams),a.brewingBatches=await w(a.brewingPlanFY),a.brewingProcessSteps=await b(a.brewingBatches.map(x=>x.id)),a.bpShowNewForm=!1,A()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===l?"":l,A()})}),e.querySelectorAll("[data-action='bp-batch-check']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.batchId??"";l&&(o.checked?a.bpSelectedBatchIds.includes(l)||(a.bpSelectedBatchIds=[...a.bpSelectedBatchIds,l]):a.bpSelectedBatchIds=a.bpSelectedBatchIds.filter(p=>p!==l),A())})}),e.querySelector("[data-action='bp-batch-check-all']")?.addEventListener("change",o=>{const l=o.target.checked;a.bpSelectedBatchIds=l?a.brewingBatches.map(p=>p.id):[],A()}),e.querySelector("[data-action='bp-bulk-delete']")?.addEventListener("click",async()=>{const o=a.bpSelectedBatchIds;if(o.length===0)return;const l=o.map(w=>a.brewingBatches.find(b=>b.id===w)?.batchCode??w).join("、");if(!window.confirm(`以下の仕込 ${o.length}件を削除します。
${l}

関連する全工程データも削除されます。この操作は取り消せません。`))return;const{supabaseDelete:p}=await N(async()=>{const{supabaseDelete:w}=await Promise.resolve().then(()=>te);return{supabaseDelete:w}},void 0);await Promise.all(o.map(w=>p("brewing_process_batches",w)));const{fetchBrewingBatches:m,fetchBrewingProcessSteps:f}=await N(async()=>{const{fetchBrewingBatches:w,fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>z);return{fetchBrewingBatches:w,fetchBrewingProcessSteps:b}},void 0);a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await f(a.brewingBatches.map(w=>w.id)):[],a.bpSelectedBatchIds=[],a.bpExpandedBatchId="",A()}),e.querySelectorAll("[data-action='bp-step-status']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:w}=await Promise.resolve().then(()=>z);return{updateBrewingProcessStep:w}},void 0),m={status:o.value};o.value==="進行中"&&!o.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),o.value==="完了"&&!o.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await p(l,m);const{fetchBrewingProcessSteps:f}=await N(async()=>{const{fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>z);return{fetchBrewingProcessSteps:w}},void 0);a.brewingProcessSteps=await f(a.brewingBatches.map(w=>w.id)),A()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>z);return{updateBrewingProcessStep:m}},void 0);await p(l,{temperature:parseFloat(o.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>z);return{updateBrewingProcessStep:m}},void 0);await p(l,{notes:o.value})})});let L="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(o=>{o.addEventListener("click",()=>{L=o.dataset.batchId??"";const l=e.querySelector("#bp-delete-modal"),p=e.querySelector("#bp-delete-batch-name");l&&(l.style.display="flex"),p&&(p.textContent=o.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const o=e.querySelector("#bp-delete-modal");o&&(o.style.display="none"),L=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!L)return;const o=e.querySelector("#bp-delete-modal");o&&(o.style.display="none");const{supabaseDelete:l}=await N(async()=>{const{supabaseDelete:f}=await Promise.resolve().then(()=>te);return{supabaseDelete:f}},void 0);await l("brewing_process_batches",L);const{fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{fetchBrewingBatches:f,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>z);return{fetchBrewingBatches:f,fetchBrewingProcessSteps:w}},void 0);a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(f=>f.id)):[],a.bpExpandedBatchId="",a.bpSelectedBatchIds=a.bpSelectedBatchIds.filter(f=>f!==L),L="",A()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",o=>{o.target===o.currentTarget&&(o.currentTarget.style.display="none",L="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p}=await N(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>z);return{updateBrewingBatch:m}},void 0);await p(l,{planned_volume_l:parseFloat(o.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p}=await N(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>z);return{updateBrewingBatch:m}},void 0);await p(l,{start_date:o.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p,fetchBrewingBatches:m,fetchBrewingProcessSteps:f}=await N(async()=>{const{updateBrewingBatch:w,fetchBrewingBatches:b,fetchBrewingProcessSteps:x}=await Promise.resolve().then(()=>z);return{updateBrewingBatch:w,fetchBrewingBatches:b,fetchBrewingProcessSteps:x}},void 0);await p(l,{status:o.value}),a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await f(a.brewingBatches.map(w=>w.id)):[],A()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${l}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${l}']`),f=parseInt(p?.value??"0"),w=parseFloat(m?.value??"0");if(!l||!f||w<=0)return;const x=[...a.brewingSchedule.filter(q=>q.brewCategory===l).map(q=>({brewMonth:q.brewMonth,durationMonths:q.durationMonths,plannedVolumeL:q.plannedVolumeL})),{brewMonth:f,durationMonths:2,plannedVolumeL:w}],{saveBrewingSchedule:P,fetchBrewingSchedule:D}=await N(async()=>{const{saveBrewingSchedule:q,fetchBrewingSchedule:R}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:q,fetchBrewingSchedule:R}},void 0);await P(l,a.brewingPlanFY,x),a.brewingSchedule=await D(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=parseInt(o.dataset.month??"0");if(!l||!p)return;const m=a.brewingSchedule.filter(b=>b.brewCategory===l&&b.brewMonth!==p).map(b=>({brewMonth:b.brewMonth,durationMonths:b.durationMonths,plannedVolumeL:b.plannedVolumeL})),{saveBrewingSchedule:f,fetchBrewingSchedule:w}=await N(async()=>{const{saveBrewingSchedule:b,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:b,fetchBrewingSchedule:x}},void 0);await f(l,a.brewingPlanFY,m),a.brewingSchedule=await w(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=parseInt(o.dataset.month??"0");if(!l||!p)return;const m=a.brewingSchedule.filter(b=>b.brewCategory===l&&b.brewMonth!==p).map(b=>({brewMonth:b.brewMonth,durationMonths:b.durationMonths,plannedVolumeL:b.plannedVolumeL})),{saveBrewingSchedule:f,fetchBrewingSchedule:w}=await N(async()=>{const{saveBrewingSchedule:b,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:b,fetchBrewingSchedule:x}},void 0);await f(l,a.brewingPlanFY,m),a.brewingSchedule=await w(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=parseInt(o.dataset.month??"0"),m=parseFloat(o.value)||0;if(!l||!p)return;const f=a.brewingSchedule.filter(x=>x.brewCategory===l).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.brewMonth===p?m:x.plannedVolumeL})),{saveBrewingSchedule:w,fetchBrewingSchedule:b}=await N(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:P}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:x,fetchBrewingSchedule:P}},void 0);await w(l,a.brewingPlanFY,f),a.brewingSchedule=await b(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=parseFloat(o.value)||0;if(!l)return;const{saveProcurementDecision:m}=await N(async()=>{const{saveProcurementDecision:f}=await Promise.resolve().then(()=>z);return{saveProcurementDecision:f}},void 0);await m(l,a.brewingPlanFY,p),a.procurementDecisions[l]=p,A()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const o=(e.querySelector("#proc-commit-variety")?.value??"").trim(),l=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),p=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,f=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!o||l<=0)return;const{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:b}=await N(async()=>{const{saveRicePurchaseCommitment:x,fetchRicePurchaseCommitments:P}=await Promise.resolve().then(()=>z);return{saveRicePurchaseCommitment:x,fetchRicePurchaseCommitments:P}},void 0);await w({varietyName:o,committedBales:l,pricePerKg:p,deliveryMonth:m,supplier:f,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await b(a.brewingPlanFY),A()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-variety-name"),l=e.querySelector("#proc-variety-price"),p=o?.value.trim()??"",m=parseFloat(l?.value??"400")||400;if(!p)return;const{addRiceVariety:f,fetchRiceVarieties:w}=await N(async()=>{const{addRiceVariety:x,fetchRiceVarieties:P}=await Promise.resolve().then(()=>z);return{addRiceVariety:x,fetchRiceVarieties:P}},void 0);await f(p,m)&&(a.riceVarieties=await w(),o&&(o.value=""),l&&(l.value=""),F(`「${p}」を追加しました`)),A()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",{deleteRiceVariety:p,fetchRiceVarieties:m}=await N(async()=>{const{deleteRiceVariety:w,fetchRiceVarieties:b}=await Promise.resolve().then(()=>z);return{deleteRiceVariety:w,fetchRiceVarieties:b}},void 0);await p(l)&&(a.riceVarieties=await m()),A()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=o.dataset.field??"",m=o.value;if(!l||!p)return;const f=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};f[p]=m;const w=a.riceVarieties.find(x=>x.name===m);w&&(p==="kojiVariety"&&(f.kojiPricePerKg=w.defaultPricePerKg),p==="kakeVariety"&&(f.kakePricePerKg=w.defaultPricePerKg)),a.brewingRiceParams[l]=f;const{saveBrewingRiceParams:b}=await N(async()=>{const{saveBrewingRiceParams:x}=await Promise.resolve().then(()=>z);return{saveBrewingRiceParams:x}},void 0);await b(l,f),A()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-new-cat-name"),l=e.querySelector("#proc-new-cat-vol"),p=o?.value.trim()??"",m=parseFloat(l?.value??"0");if(!p){F("区分名を入力してください","warning");return}if(m<=0){F("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:f,fetchBrewingSchedule:w}=await N(async()=>{const{saveBrewingSchedule:b,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:b,fetchBrewingSchedule:x}},void 0);await f(p,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await w(a.brewingPlanFY),o&&(o.value=""),l&&(l.value=""),F(`「${p}」を追加しました`),A()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const o=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),l=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(o)||isNaN(l))return;const{saveBrewingRiceParams:p}=await N(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>z);return{saveBrewingRiceParams:w}},void 0),m=Object.keys(a.brewingRiceParams),f=new Set([...m,...a.brewingYearlyShipments.map(w=>w.brewCategory)]);for(const w of f){const b=a.brewingRiceParams[w]??{brewCategory:w,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};b.ricePerLiterKg=o,b.kojiRatio=l,a.brewingRiceParams[w]=b,await p(w,b)}A()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=o.dataset.field??"",m=parseFloat(o.value);if(!l||!p||isNaN(m))return;const f=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};f[p]=m,a.brewingRiceParams[l]=f;const{saveBrewingRiceParams:w}=await N(async()=>{const{saveBrewingRiceParams:b}=await Promise.resolve().then(()=>z);return{saveBrewingRiceParams:b}},void 0);await w(l,f),A()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=parseFloat(o.value);if(!l)return;const{saveBrewingForecastOverride:m}=await N(async()=>{const{saveBrewingForecastOverride:f}=await Promise.resolve().then(()=>z);return{saveBrewingForecastOverride:f}},void 0);if(isNaN(p))await m(l,null),delete a.brewingForecastOverrides[l];else{const f=p/100;await m(l,f),a.brewingForecastOverrides[l]=f}A()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p="bc-"+encodeURIComponent(l).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${p}`),f=e.querySelector(`#alc-target-${p}`),w=parseFloat(m?.value??"18")||18,b=parseFloat(f?.value??"15")||15,{saveBrewingAlcoholSetting:x}=await N(async()=>{const{saveBrewingAlcoholSetting:D}=await Promise.resolve().then(()=>z);return{saveBrewingAlcoholSetting:D}},void 0);await x(l,w,b)&&(a.brewingAlcoholSettings[l]={brewCategory:l,rawAlcoholPct:w,targetAlcoholPct:b}),A()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",p=o.value,m=o.dataset.current??"";if(p===m)return;const{setBrewingCategoryOverride:f,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:x}=await N(async()=>{const{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:q,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:B}=await Promise.resolve().then(()=>z);return{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:q,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:B}},void 0);if(await f(l,p)){const D=a.brewingPlanFY,[q,R,B]=await Promise.all([w(`${D}-10-01`,`${D+1}-09-30`),b(`${D}-10-01`,`${D+1}-09-30`),x()]);a.brewingPlanData=q,a.brewingProductDetail=R,a.brewingOverrides=B}A()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=o.value;if(!l||!p)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:b,fetchCategoryTypeLinks:x}=await N(async()=>{const{linkTypeToCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:V}=await Promise.resolve().then(()=>z);return{linkTypeToCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:V}},void 0);await m(l,p);const P=a.brewingPlanFY,[D,q,R,B]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),w(`${P}-10-01`,`${P+1}-09-30`),b(),x()]);a.brewingPlanData=D,a.brewingProductDetail=q,a.brewingOverrides=R,a.brewingTypeLinks=B,A()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=o.dataset.type??"";if(!l||!p)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:b,fetchCategoryTypeLinks:x}=await N(async()=>{const{unlinkTypeFromCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:V}=await Promise.resolve().then(()=>z);return{unlinkTypeFromCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:V}},void 0);await m(l,p);const P=a.brewingPlanFY,[D,q,R,B]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),w(`${P}-10-01`,`${P+1}-09-30`),b(),x()]);a.brewingPlanData=D,a.brewingProductDetail=q,a.brewingOverrides=R,a.brewingTypeLinks=B,A()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const o=e.querySelector("#brew-new-category-name"),l=e.querySelector("#brew-new-category-parent"),p=o?.value.trim()??"",m=l?.value??"";if(!p)return;if(!m){F("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map(x=>x.name)].includes(p)){F("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:w}=await N(async()=>{const{addBrewingCustomCategory:x}=await Promise.resolve().then(()=>z);return{addBrewingCustomCategory:x}},void 0);await w(p,m)?(a.brewingCustomCategories.push({name:p,parentCategory:m}),o&&(o.value=""),F(`「${p}」を追加しました（${m}系）`)):F("追加に失敗しました","error"),A()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"";if(!l)return;const{deleteBrewingCustomCategory:p,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:f}=await N(async()=>{const{deleteBrewingCustomCategory:b,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:P}=await Promise.resolve().then(()=>z);return{deleteBrewingCustomCategory:b,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:P}},void 0);if(await p(l)){a.brewingCustomCategories=a.brewingCustomCategories.filter(D=>D.name!==l);for(const[D,q]of Object.entries(a.brewingOverrides))q===l&&delete a.brewingOverrides[D];const b=a.brewingPlanFY,[x,P]=await Promise.all([m(`${b}-10-01`,`${b+1}-09-30`),f(`${b}-10-01`,`${b+1}-09-30`)]);a.brewingPlanData=x,a.brewingProductDetail=P,F(`「${l}」を削除しました`)}A()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=o.dataset.catId??"",f=e.querySelector(`#new-entry-target-${p}`)?.value??l,w=e.querySelector(`#new-entry-label-${p}`),b=e.querySelector(`#new-entry-vol-${p}`),x=w?.value.trim()??"",P=parseFloat(b?.value??"0");if(P<=0)return;const{addBrewingStockEntry:D,fetchBrewingPlanSummary:q,fetchAllBrewingStockEntries:R}=await N(async()=>{const{addBrewingStockEntry:M,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:I}=await Promise.resolve().then(()=>z);return{addBrewingStockEntry:M,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:I}},void 0);if(await D(f,x||`タンク${a.brewingStockEntries.filter(M=>M.brewCategory===f).length+1}`,P)){const M=a.brewingPlanFY,[O,I]=await Promise.all([q(`${M}-10-01`,`${M+1}-09-30`),R()]);a.brewingPlanData=O,a.brewingStockEntries=I}A(),requestAnimationFrame(()=>{const M=document.getElementById(`stock-display-${p}`),O=document.getElementById(`stock-edit-${p}`),I=document.querySelector(`.btn-edit-stock[data-cat-id="${p}"]`);M&&(M.style.display="none"),O&&(O.style.display=""),I&&(I.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.id??"",p=o.value;if(!l||!p)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:f,fetchAllBrewingStockEntries:w}=await N(async()=>{const{reassignBrewingStockEntry:x,fetchBrewingPlanSummary:P,fetchAllBrewingStockEntries:D}=await Promise.resolve().then(()=>z);return{reassignBrewingStockEntry:x,fetchBrewingPlanSummary:P,fetchAllBrewingStockEntries:D}},void 0);if(await m(l,p)){const x=a.brewingPlanFY,[P,D]=await Promise.all([f(`${x}-10-01`,`${x+1}-09-30`),w()]);a.brewingPlanData=P,a.brewingStockEntries=D}A(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach(x=>{const P=document.getElementById(`stock-display-${x.dataset.catId}`),D=document.getElementById(`stock-edit-${x.dataset.catId}`);D&&D.querySelector(`[data-id="${l}"]`)&&(P&&(P.style.display="none"),D.style.display="",x.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=o.dataset.cat??"",m="bc-"+encodeURIComponent(p).replace(/%/g,"-"),{deleteBrewingStockEntry:f,fetchBrewingPlanSummary:w,fetchAllBrewingStockEntries:b}=await N(async()=>{const{deleteBrewingStockEntry:P,fetchBrewingPlanSummary:D,fetchAllBrewingStockEntries:q}=await Promise.resolve().then(()=>z);return{deleteBrewingStockEntry:P,fetchBrewingPlanSummary:D,fetchAllBrewingStockEntries:q}},void 0);if(await f(l)){const P=a.brewingPlanFY,[D,q]=await Promise.all([w(`${P}-10-01`,`${P+1}-09-30`),b()]);a.brewingPlanData=D,a.brewingStockEntries=q}A(),requestAnimationFrame(()=>{const P=document.getElementById(`stock-display-${m}`),D=document.getElementById(`stock-edit-${m}`),q=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);P&&(P.style.display="none"),D&&(D.style.display=""),q&&(q.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",p=e.querySelector(`#stock-display-${l}`),m=e.querySelector(`#stock-edit-${l}`);p&&(p.style.display="none"),m&&(m.style.display=""),o.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",p=e.querySelector(`#stock-display-${l}`),m=e.querySelector(`#stock-edit-${l}`),f=e.querySelector(`.btn-edit-stock[data-cat-id="${l}"]`);p&&(p.style.display=""),m&&(m.style.display="none"),f&&(f.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",p=e.querySelector(`#schedule-rows-${l}`);if(!p)return;const m=p.querySelectorAll(".schedule-edit-row").length,f=document.createElement("div");f.innerHTML=buildScheduleEditRowHTML(l,m,9,2,0,"");const w=f.firstElementChild;p.appendChild(w),w.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>w.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(o=>{o.addEventListener("click",()=>o.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=o.dataset.catId??"",m=e.querySelector(`#stock-input-${p}`),f=parseFloat(m?.value??"");if(isNaN(f)||f<0){alert("有効な数値を入力してください");return}o.textContent="保存中...",o.setAttribute("disabled","true");try{const{upsertBrewingStock:w,fetchBrewingPlanSummary:b,fetchBrewingMonthlyTrend:x}=await N(async()=>{const{upsertBrewingStock:R,fetchBrewingPlanSummary:B,fetchBrewingMonthlyTrend:M}=await Promise.resolve().then(()=>z);return{upsertBrewingStock:R,fetchBrewingPlanSummary:B,fetchBrewingMonthlyTrend:M}},void 0),P=a.brewingPlanFY;await w(l,f,0);const[D,q]=await Promise.all([b(`${P}-10-01`,`${P+1}-09-30`),x(`${P}-10-01`,`${P+1}-09-30`)]);a.brewingPlanData=D,a.brewingMonthlyTrend=q,A()}catch(w){console.error("[brewing save]",w),alert(`保存エラー: ${String(w)}`),o.textContent="保存",o.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.toggleCat??"",p=`sub-row-${"bc-"+encodeURIComponent(l).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${p}`),f=o.querySelector(".toggle-icon"),w=m[0]?.style.display!=="none";m.forEach(b=>{b.style.display=w?"none":""}),f&&(f.innerHTML=w?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{F("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{F("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{F("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{F("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(o=>{o.addEventListener("click",async()=>{await Me("この買掛を入金済みにしますか？")&&F("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(o=>{o.addEventListener("click",()=>{F("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{F("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelector("[data-action='tm-add']")?.addEventListener("click",async()=>{const o=e.querySelector("#tm-date")?.value??"",l=e.querySelector("#tm-type")?.value??"transfer",p=e.querySelector("#tm-from")?.value??"",m=e.querySelector("#tm-to")?.value??"",f=parseFloat(e.querySelector("#tm-vol")?.value??"0");if(!o||f<=0){F("日付と数量を入力してください","warning");return}if(!p&&!m){F("移動元か移動先を選択してください","warning");return}const{saveTankMovement:w,fetchTankMovements:b}=await N(async()=>{const{saveTankMovement:x,fetchTankMovements:P}=await Promise.resolve().then(()=>z);return{saveTankMovement:x,fetchTankMovements:P}},void 0);await w({movementDate:o,fromTankNo:p,toTankNo:m,volumeL:f,productName:e.querySelector("#tm-product")?.value??"",batchCode:e.querySelector("#tm-batch")?.value??"",alcoholDegree:parseFloat(e.querySelector("#tm-alc")?.value)||null,temperature:parseFloat(e.querySelector("#tm-temp")?.value)||null,movementType:l,recordedBy:a.myProfile?.name??"",notes:e.querySelector("#tm-notes")?.value??""}),a.tankMovements=await b(),F("記録しました"),A()}),e.querySelectorAll("[data-action='tm-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"";if(!l||!confirm("この記録を削除しますか？"))return;const{deleteTankMovement:p,fetchTankMovements:m}=await N(async()=>{const{deleteTankMovement:f,fetchTankMovements:w}=await Promise.resolve().then(()=>z);return{deleteTankMovement:f,fetchTankMovements:w}},void 0);await p(l),a.tankMovements=await m(),A()})}),e.querySelector("[data-action='tm-filter-tank']")?.addEventListener("change",o=>{a.tankMovementFilter=o.target.value,A()}),e.querySelector("[data-action='tm-print']")?.addEventListener("click",()=>{const o=e.querySelector("#tm-table");if(!o)return;const l=window.open("","_blank");l&&(l.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
      <title>移動簿</title><style>
        body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:10px; padding:10mm; }
        table { width:100%; border-collapse:collapse; } th, td { border:1px solid #ccc; padding:3px 5px; }
        th { background:#f0f0f0; } button { display:none; }
        @media print { body { padding:5mm; } }
      </style></head><body><h1 style="font-size:14px;margin-bottom:8px;">移動簿${a.tankMovementFilter?` — ${a.tankMovementFilter}`:""}</h1>${o.innerHTML}</body></html>`),l.document.close(),setTimeout(()=>l.print(),300))}),e.querySelector("[data-action='tank-show-add']")?.addEventListener("click",()=>{const o=e.querySelector("#tank-form-area");o&&(o.innerHTML=eo(),E())}),e.querySelectorAll("[data-action='tank-edit']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.tankId??"",p=a.tankList.find(f=>f.id===l);if(!p)return;const m=e.querySelector("#tank-form-area");m&&(m.innerHTML=eo(p),E())})}),e.querySelectorAll("[data-action='tank-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.tankId??"";if(!l||!confirm("このタンクを削除しますか？"))return;const{deleteTankById:p,fetchTankList:m}=await N(async()=>{const{deleteTankById:f,fetchTankList:w}=await Promise.resolve().then(()=>z);return{deleteTankById:f,fetchTankList:w}},void 0);await p(l),a.tankList=await m(),A()})});function E(){const o=e.querySelector("#tank-f-depth"),l=e.querySelector("#tank-f-cap"),p=e.querySelector("#tank-f-lpmm"),m=()=>{const f=parseFloat(o?.value??"0"),w=parseFloat(l?.value??"0");f>0&&w>0&&p&&(p.value=(w/f).toFixed(2))};o?.addEventListener("input",m),l?.addEventListener("input",m),e.querySelector("[data-action='tank-save']")?.addEventListener("click",async()=>{const f=e.querySelector("#tank-edit-id")?.value??"",w=e.querySelector("#tank-f-no")?.value?.trim()??"";if(!w){F("容器番号を入力してください","warning");return}const{saveTank:b,fetchTankList:x}=await N(async()=>{const{saveTank:P,fetchTankList:D}=await Promise.resolve().then(()=>z);return{saveTank:P,fetchTankList:D}},void 0);await b({id:f||void 0,tankNo:w,displayName:e.querySelector("#tank-f-name")?.value?.trim()??w,depthMm:parseFloat(e.querySelector("#tank-f-depth")?.value??"0"),capacity:parseFloat(e.querySelector("#tank-f-cap")?.value??"0"),litersPerMm:parseFloat(e.querySelector("#tank-f-lpmm")?.value??"0"),remarks:e.querySelector("#tank-f-remarks")?.value??""}),a.tankList=await x(),F(f?"更新しました":"登録しました"),A()}),e.querySelector("[data-action='tank-cancel']")?.addEventListener("click",()=>{const f=e.querySelector("#tank-form-area");f&&(f.innerHTML="")})}e.querySelector("#tank-f-no")&&E(),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{F("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.closest("tr")?.querySelector("td")?.textContent??"";F(`注文 ${l} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{F("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(o=>{o.addEventListener("click",()=>{F("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{F("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.customer??"";F(`得意先 ${l} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{F("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!o||!await Me("このリストを削除しますか？"))return;const{supabaseDelete:p}=await N(async()=>{const{supabaseDelete:f}=await Promise.resolve().then(()=>te);return{supabaseDelete:f}},void 0);if(await p("lead_lists",o)){const{fetchLeadLists:f}=await N(async()=>{const{fetchLeadLists:w}=await Promise.resolve().then(()=>z);return{fetchLeadLists:w}},void 0);a.leadLists=await f(),F("削除しました","success"),A()}else F("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{F("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.scYm;if(!l)return;a.shipmentCalendarYearMonth=l,a.shipmentCalendarData=null,a.shipmentCalendarPrevYearData=null,a.shipmentCalendarSelectedDate=null,A();const{fetchShipmentCalendar:p}=await N(async()=>{const{fetchShipmentCalendar:P}=await Promise.resolve().then(()=>z);return{fetchShipmentCalendar:P}},void 0),[m,f]=l.split("-").map(Number),w=`${m-1}-${String(f).padStart(2,"0")}`,[b,x]=await Promise.all([p(l),p(w)]);a.shipmentCalendarData=b,a.shipmentCalendarPrevYearData=x,A()})}),e.querySelectorAll("[data-sc-date]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.scDate;l!==void 0&&(a.shipmentCalendarSelectedDate=l?a.shipmentCalendarSelectedDate===l?null:l:null,A())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(o=>{o.addEventListener("click",async()=>{a.calendarYearMonth=o.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:l}=await N(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>z);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await l(a.calendarYearMonth),A()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async o=>{a.calendarYearMonth=o.target.value;const{fetchCalendarEvents:l}=await N(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>z);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await l(a.calendarYearMonth),A()}),e.querySelector("#cal-filter-category")?.addEventListener("change",o=>{a.calendarFilterCategory=o.target.value,A()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const o=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(o.getTime()+3600*1e3).toISOString(),isAllDay:!1}},A()}),e.querySelectorAll("[data-cal-date]").forEach(o=>{o.tagName!=="BUTTON"&&o.addEventListener("click",l=>{if(l.target.closest(".cal-event"))return;const p=o.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${p}T10:00:00`,isAllDay:!1}},A()})}),e.querySelectorAll("[data-cal-event-id]").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const p=o.dataset.calEventId,m=a.calendarEvents.find(f=>f.id===p);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},A())})}),e.querySelectorAll("[data-action='cal-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.calendarEdit=null,A())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:o,fetchCalendarEvents:l,CALENDAR_CATEGORY_COLORS:p}=await N(async()=>{const{saveCalendarEvent:x,fetchCalendarEvents:P,CALENDAR_CATEGORY_COLORS:D}=await Promise.resolve().then(()=>z);return{saveCalendarEvent:x,fetchCalendarEvents:P,CALENDAR_CATEGORY_COLORS:D}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,f=e.querySelector("#cal-category")?.value??"general",w={id:m,title:e.querySelector("#cal-title")?.value??"",category:f,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:p[f]};if(!w.title){F("タイトルは必須です","warning");return}await o(w)?(a.calendarEvents=await l(a.calendarYearMonth),a.calendarEdit=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!o||!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:l,fetchCalendarEvents:p}=await N(async()=>{const{deleteCalendarEvent:f,fetchCalendarEvents:w}=await Promise.resolve().then(()=>z);return{deleteCalendarEvent:f,fetchCalendarEvents:w}},void 0);await l(o)?(a.calendarEvents=await p(a.calendarYearMonth),a.calendarEdit=null,F("削除しました"),A()):F("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,A();try{const o=a.importPreview.rows.filter(p=>p._valid),l=await Tr(a.importEntity,o);a.importResult=`取り込み完了: ${l.inserted}件成功 / ${l.failed}件失敗`,a.importPreview=null}catch(o){a.importResult=`エラー: ${o instanceof Error?o.message:String(o)}`}finally{a.importing=!1,A()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const o=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=o,a.storeSales=[],a.actionLoading=!0,A(),Hn(o).then(l=>{a.storeSales=l,a.actionLoading=!1,A()})}),e.querySelectorAll("[data-action='copy-config']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.configValue??"";if(l)try{await navigator.clipboard.writeText(l),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(p){console.warn("Clipboard copy failed",p)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const l=JSON.stringify({supabase_url:$e,supabase_anon_key:ie,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),p=new Blob([l],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(p),f=document.createElement("a");f.href=m,f.download="relay_config.json",f.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.code??"";if(l)try{await navigator.clipboard.writeText(decodeURIComponent(l)),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(p){console.warn("Clipboard code copy failed",p)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(o=>{o.addEventListener("change",()=>{mt(e),a.emailSaveMessage=null,A()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(o=>{o.addEventListener("change",()=>{mt(e),a.emailSaveMessage=null,A()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{mt(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{mt(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(o=>{o.addEventListener("click",()=>{a.emailTemplateId=o.dataset.templateId??"custom";const l=Fr(a.emailTemplateId);a.emailSubject=l.subject,a.emailBody=l.body,a.emailSaveMessage=null,A()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{mt(e);const o=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${o}`),a.emailSaveMessage=null,A()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{mt(e),a.actionLoading=!0,A(),$a(yn("draft")).then(o=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(o.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,A()})}),e.querySelector("#email-sender")?.addEventListener("change",o=>{a.emailSenderId=o.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{mt(e),a.actionLoading=!0,a.emailSending=!0,A();const o=yn("sent");a.mailSenders.find(l=>l.id===a.emailSenderId),Ko().then(async l=>{await $a({...o,recipientCount:l.sent}),a.emailSaveMessage=`${l.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,A(),F(`${l.sent}件送信完了`)}).catch(async()=>{await $a(yn("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,A(),F("APIキー未設定のため下書き保存しました","warning")})}),e.querySelectorAll(".feature-checkbox").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.featureId;if(!l)return;const p=a.myProfile?.name??a.myProfile?.email??"不明";o.checked?await sr(l,p):await or(l),a.featureStatuses=await Ia(),A()})}),e.querySelectorAll("[data-workforce-tab]").forEach(o=>{o.addEventListener("click",()=>{a.workforceTab=o.dataset.workforceTab,A()})}),e.querySelectorAll("[data-staff-dept-filter]").forEach(o=>{o.addEventListener("click",()=>{a.staffDeptFilter=o.dataset.staffDeptFilter??"",A()})}),e.querySelector("#cost-year-month")?.addEventListener("change",o=>{a.workforceYearMonth=o.target.value,A()}),e.querySelector("#shift-year-month")?.addEventListener("change",o=>{a.workforceYearMonth=o.target.value,a.workforceMetrics=null,a.dailyShiftPlans=[],a.workforceSelectedDay=null,ft(a.currentPath)}),e.querySelectorAll("[data-shift-day]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.shiftDay??null;a.workforceSelectedDay=a.workforceSelectedDay===l?null:l,A()})}),e.querySelector("[data-action='shift-day-close']")?.addEventListener("click",()=>{a.workforceSelectedDay=null,A()}),e.querySelector("#shift-bottling-target")?.addEventListener("change",o=>{a.shiftBottlingTarget=parseInt(o.target.value)||0}),e.querySelector("[data-action='shift-auto-generate']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='shift-auto-generate']"),l=document.getElementById("shift-bottling-target");l&&(a.shiftBottlingTarget=parseInt(l.value)||0),o&&(o.disabled=!0,o.textContent="生成中…");try{const{fetchProductionPlan:p}=await N(async()=>{const{fetchProductionPlan:x}=await Promise.resolve().then(()=>z);return{fetchProductionPlan:x}},void 0),m=await p(a.workforceYearMonth).catch(()=>[]),f=a.calendarShifts.filter(x=>x.date.startsWith(a.workforceYearMonth)),w=Lm(a.workforceYearMonth,a.staffMembers,a.brewingSchedule,a.shiftBottlingTarget,a.workforceMetrics,m,f);await dr(a.workforceYearMonth,w)?(a.dailyShiftPlans=w,F("シフトを自動生成しました","success"),A()):F("保存に失敗しました","error")}finally{o&&(o.disabled=!1)}}),e.querySelector("[data-action='staff-new']")?.addEventListener("click",()=>{const o=document.createElement("div");o.innerHTML=Hs(),document.body.appendChild(o.firstElementChild),uo(null)}),e.querySelectorAll("[data-edit-staff]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editStaff??"",p=a.staffMembers.find(f=>f.id===l);if(!p)return;const m=document.createElement("div");m.innerHTML=Hs(p),document.body.appendChild(m.firstElementChild),uo(p)})}),e.querySelectorAll("[data-delete-staff]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.deleteStaff??"",p=o.dataset.staffName??"";if(!confirm(`${p} を削除しますか？`))return;await ir(l)?(a.staffMembers=a.staffMembers.filter(f=>f.id!==l),F("削除しました","success"),A()):F("削除に失敗しました","error")})})}function A(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=Fy()}catch(s){console.error("[renderApp] render error:",s),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(s)}

${s?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",Uy(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),ls()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const s of["fd-scaler","print-scaler","q-preview-scaler"]){const r=e.querySelector(`#${s}`),i=r?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=i?.querySelector(".print-page")??i;if(!r||!c)continue;const d=r.parentElement?.clientWidth??0,u=c.offsetWidth;if(d>0&&u>0&&u>d-24){const y=(d-24)/u;r.style.transform=`scale(${y})`,r.style.transformOrigin="top left",r.style.height=`${(c.offsetHeight+48)*y}px`}else r.style.transform="",r.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":"",by()}const Qr="sake-cloud-cache",Jy=300*1e3;function Hy(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(Qr,JSON.stringify(e))}catch{}}function Ky(){try{const e=localStorage.getItem(Qr);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Jy?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let Wr=0;async function At(){const e=Ky();e&&(a.loading=!1,A()),a.loading=!e,e||A();try{const[t,n,s,r,i,c,d]=await Promise.all([wo(),xo(),On(),$o(),Xt(a.invoiceFilter),jn(),bo("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=s,a.pipelineMeta=r,a.invoiceRecords=i,a.salesAnalytics=c,d){const u={...ka,...$n(),...d};a.quoteCompanySettings=u,yt(u)}if(Et.length===0&&Sy(),!a.salesFilter.startDate||!a.salesFilter.endDate){const y=[...t.salesRecords].sort(($,_)=>new Date(_.date).getTime()-new Date($.date).getTime())[0]?.date??new Date().toISOString(),h=new Date(y),g=new Date(h);g.setDate(h.getDate()-30),a.salesFilter={startDate:co(g.toISOString()),endDate:co(h.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await Xt(a.invoiceFilter)),a.error=null,Hy()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,A(),ea(a.route,!0),Wr=Date.now()}}window.addEventListener("popstate",()=>{a.route=Vr(location.pathname),a.currentCategory=Va(a.route),a.sidebarOpen=!1,Zt(),ea(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,A();return}if(e.key==="Escape"){if(a.globalSearchOpen){Zt(),A();return}if(a.pickerMode){Ra(),A();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Yr(),A());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Jr(t)}});a.user=Oa()?go():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await N(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>z);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),A()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,s=0,r=0,i=0,c=1;document.addEventListener("mousedown",d=>{const u=d.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;d.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const h=y.getBoundingClientRect();if(h.width===0)return;c=228.6/h.width,t=u,n=d.clientX,s=d.clientY,r=parseFloat(u.style.left)||0,i=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(S=>S.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const g=document.querySelector("#fd-selected-info");g&&(g.textContent=`選択中: ${u.title}`);const $=document.querySelector("#fd-sel-x"),_=document.querySelector("#fd-sel-y");$&&($.value=String(r)),_&&(_.value=String(i))}),document.addEventListener("mousemove",d=>{if(!t)return;const u=(d.clientX-n)*c,y=(d.clientY-s)*c,h=Math.round((r+u)*2)/2,g=Math.round((i+y)*2)/2;t.style.left=h+"mm",t.style.top=g+"mm";const $=document.querySelector("#fd-sel-x"),_=document.querySelector("#fd-sel-y");$&&($.value=String(h)),_&&(_.value=String(g))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",d=>{if(!a.fdDesignMode||!a.fdActiveFieldId||d.key!=="ArrowLeft"&&d.key!=="ArrowRight"&&d.key!=="ArrowUp"&&d.key!=="ArrowDown"||d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;d.preventDefault();const y=.5;let h=parseFloat(u.style.left)||0,g=parseFloat(u.style.top)||0;d.key==="ArrowLeft"?h-=y:d.key==="ArrowRight"?h+=y:d.key==="ArrowUp"?g-=y:d.key==="ArrowDown"&&(g+=y),u.style.left=h+"mm",u.style.top=g+"mm";const $=document.querySelector("#fd-sel-x"),_=document.querySelector("#fd-sel-y");$&&($.value=String(h)),_&&(_.value=String(g))})})();let fn=null,wa=[],mo=null;function Qy(e){const t=window.google?.maps;if(!t){console.warn("Google Maps not loaded");return}const n=e.querySelector("#customer-map"),s=e.querySelector("#map-data");if(!n||!s)return;const r=JSON.parse(decodeURIComponent(s.dataset.customers??"[]")),i=JSON.parse(decodeURIComponent(s.dataset.deliveries??"[]"));fn||(fn=new t.Map(n,{center:{lat:35.38,lng:139.25},zoom:10,gestureHandling:"greedy",streetViewControl:!1,mapTypeControl:!1}),mo=new t.InfoWindow);const c=fn,d=mo;function u($){return $.isAtRisk?"#e53e3e":$.isDormant?"#dd6b20":$.amount12m>0?"#2563eb":"#aaa"}function y($,_=32){const S=`<svg xmlns="http://www.w3.org/2000/svg" width="${_}" height="${_}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${$}" stroke="white" stroke-width="2.5"/></svg>`;return{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(S),scaledSize:new t.Size(_,_),anchor:new t.Point(_/2,_/2)}}function h(){wa.forEach($=>$.setMap(null)),wa=[]}function g($,_,S){h();const C=new t.LatLngBounds;let k=!1;r.filter(E=>!($==="at-risk"&&!E.isAtRisk||$==="dormant"&&(E.isAtRisk||!E.isDormant)||$==="active"&&(E.isAtRisk||E.isDormant||E.amount12m===0)||$==="inactive"&&(E.isAtRisk||E.isDormant||E.amount12m>0)||_&&E.areaCode!==_||S&&(E.businessTypeName||E.businessType)!==S)).forEach(E=>{if(!E.lat||!E.lng)return;const o={lat:E.lat,lng:E.lng};C.extend(o),k=!0;const l=new t.Marker({map:c,position:o,icon:y(u(E),28),title:E.name});l.addListener("click",()=>{d.setContent(`<div style="font-size:13px;max-width:260px;">
          <strong>${E.name}</strong><br>${E.address1??""}<br>
          エリア: ${E.areaCode??"―"} / ${E.businessTypeName??E.businessType??"―"}<br>
          12ヶ月売上: <strong>${E.amount12m?.toLocaleString()??0}円</strong></div>`),d.open(c,l)}),wa.push(l)}),i.forEach(E=>{if(!E.lat||!E.lng)return;const o={lat:E.lat,lng:E.lng};C.extend(o),k=!0;const l=new t.Marker({map:c,position:o,icon:y("#FF9800",22),title:E.name});l.addListener("click",()=>{d.setContent(`<div style="font-size:13px;"><strong>${E.name}</strong><br>${E.address??""}${E.phone?`<br>${E.phone}`:""}</div>`),d.open(c,l)}),wa.push(l)}),k&&c.fitBounds(C,{top:40,bottom:40,left:40,right:40})}g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz),e.querySelectorAll("[data-map-status]").forEach($=>{$.addEventListener("click",()=>{const _=$.dataset.mapStatus;a.mapFilters={...a.mapFilters,filterStatus:_},e.querySelectorAll("[data-map-status]").forEach(S=>{S.className=S.className.replace(/\b(primary|secondary)\b/g,S===$?"primary":"secondary")}),g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)})}),e.querySelector("#map-filter-area")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterArea:$.target.value},g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#map-filter-biz")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterBiz:$.target.value},g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#btn-geocode")?.addEventListener("click",async()=>{const $=e.querySelector("#btn-geocode"),_=e.querySelector("#geocode-progress"),S=e.querySelector("#geocode-status"),C=e.querySelector("#geocode-bar");$&&($.disabled=!0),_&&(_.style.display="block");try{const{batchGeocode:k}=await N(async()=>{const{batchGeocode:E}=await Promise.resolve().then(()=>z);return{batchGeocode:E}},void 0),L=await k((E,o,l)=>{S&&(S.textContent=`${E}/${o} — ${l}`),C&&(C.style.width=`${Math.round(E/Math.max(o,1)*100)}%`)});S&&(S.textContent=`完了: ${L.success}件成功 / ${L.failed}件失敗`),C&&(C.style.width="100%"),setTimeout(()=>{window.location.reload()},3e3)}catch(k){S&&(S.textContent="エラーが発生しました: "+String(k))}})}At();const Wy=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&At()},Wy);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-Wr>60*1e3&&At()});let Tn="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Tn=e}).catch(()=>{});setInterval(async()=>{if(!(!Tn||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Tn&&!a.updateAvailable&&(a.updateAvailable=!0,A())}catch{}},120*1e3);export{N as _};
