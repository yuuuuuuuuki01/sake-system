(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const cr="modulepreload",dr=function(e){return"/"+e},Cn={},N=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(g=>Promise.resolve(g).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");r=u(n.map(y=>{if(y=dr(y),y in Cn)return;Cn[y]=!0;const g=y.endsWith(".css"),f=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${f}`))return;const x=document.createElement("link");if(x.rel=g?"stylesheet":cr,g||(x.as="script"),x.crossOrigin="",x.href=y,d&&x.setAttribute("nonce",d),document.head.appendChild(x),g)return new Promise((S,$)=>{x.addEventListener("load",S),x.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${y}`)))})}))}function l(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return r.then(c=>{for(const d of c||[])d.status==="rejected"&&l(d.reason);return t().catch(l)})},fe="https://ridspyczkxwkcbmwndhm.supabase.co",pr="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",se=pr;async function Ee(e,t){try{const n=new URL(`/rest/v1/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:se,Authorization:`Bearer ${se}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function gt(e,t){try{const n=new URL(`/rest/v1/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:se,Authorization:`Bearer ${se}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function Fe(e,t,n){try{const o=new URL(`/rest/v1/${e}?id=eq.${t}`,fe);return(await fetch(o.toString(),{method:"PATCH",headers:{apikey:se,Authorization:`Bearer ${se}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function me(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:se,Authorization:`Bearer ${se}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function en(e){try{const t=new URL(`/rest/v1/${e}`,fe);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:se,Authorization:`Bearer ${se}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const o=n.headers.get("Content-Range");if(o){const r=o.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function U(e,t={}){try{const n=new URL(`/rest/v1/${e}`,fe);Object.entries(t).forEach(([r,l])=>{n.searchParams.set(r,l)});const o=await fetch(n.toString(),{method:"GET",headers:{apikey:se,Authorization:`Bearer ${se}`,Accept:"application/json",Prefer:"return=representation"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function tn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,fe);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:se,Authorization:`Bearer ${se}`}})).ok}catch{return!1}}async function ve(e,t={},n=1e3){const o=[];let r=0;try{for(;;){const l=new URL(`/rest/v1/${e}`,fe);Object.entries(t).forEach(([u,y])=>{l.searchParams.set(u,y)}),l.searchParams.set("limit",String(n)),l.searchParams.set("offset",String(r));const c=await fetch(l.toString(),{method:"GET",headers:{apikey:se,Authorization:`Bearer ${se}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const d=await c.json();if(o.push(...d),d.length<n)break;r+=n}return o}catch(l){return console.warn(`Failed to query all rows from Supabase table ${e}`,l),o.length>0?o:[]}}const te=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:se,SUPABASE_URL:fe,supabaseCount:en,supabaseDelete:tn,supabaseInsert:Ee,supabaseQuery:U,supabaseQueryAll:ve,supabaseRpc:me,supabaseUpdate:Fe,supabaseUpsert:gt},Symbol.toStringTag,{value:"Module"})),an="sake_auth";function ks(e){localStorage.setItem(an,JSON.stringify(e))}function Ps(){return{apikey:se,"Content-Type":"application/json"}}function ur(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),o=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(o))}catch{return null}}async function Es(e,t){const n=await fetch(`${fe}/auth/v1/${e}`,{method:"POST",headers:Ps(),body:JSON.stringify(t)}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.error_description??o.msg??`HTTP ${n.status}`);return o}async function mr(e,t){const n=await Es("token?grant_type=password",{email:e,password:t});return ks({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Dn(e,t){const n=await Es("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&ks({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function yr(){const e=ya();if(localStorage.removeItem(an),!!e?.access_token)try{await fetch(`${fe}/auth/v1/logout`,{method:"POST",headers:{...Ps(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function ya(){const e=localStorage.getItem(an);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function hr(){const e=ya();if(!e)return null;const t=ur(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function fr(e){const t=ya();if(!t)throw new Error("not signed in");const n=await fetch(`${fe}/auth/v1/user`,{method:"PUT",headers:{apikey:se,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.msg??`HTTP ${n.status}`)}}const nn={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},As={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},gr={generatedAt:new Date().toISOString(),records:[]},Je={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},vr={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},br={},wr={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function le(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function xr(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function $r(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function v(e,t,n=""){for(const o of t){const r=e[o];if(typeof r=="string"&&r.length>0)return r}return n}function T(e,t,n=0){for(const o of t)if(o in e)return le(e[o]);return n}function be(e,t,n=!0){for(const o of t)if(o in e)return $r(e[o]);return n}function ge(e,t,n){for(const o of t){const r=e[o];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const l=new Date(r);if(!Number.isNaN(l.getTime()))return l.toISOString()}return n}function _r(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:ge(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:le(e.total_amount??e.billed_amount)}}function qn(e){const t=e.trim().toUpperCase(),n=br[t];if(n)return n;const o=As.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:o?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Ls(e){try{return(await U("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function dt(e,t){await gt("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function Cs(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await U("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),o=new Map;for(const l of n){const c=String(l.sales_date??"");if(!c)continue;const d=o.get(c)??{amount:0,qty:0,docs:0};d.amount+=le(l.sales_amount),d.qty+=le(l.total_quantity),d.docs+=le(l.document_count),o.set(c,d)}const r=Array.from(o.entries()).map(([l,c])=>({sales_date:l,sales_amount:c.amount,amount:c.amount,document_count:c.docs,bottles:c.qty,volume_ml:0,price_per_bottle:c.qty>0?Math.round(c.amount/c.qty):0,price_per_liter:0})).sort((l,c)=>c.sales_date.localeCompare(l.sales_date));if(r.length>0){const l=new Date().toISOString().slice(0,7);Ms(l).catch(()=>{});const[c,d]=await Promise.all([U("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),U("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),y=new Date().toISOString().slice(0,10),g=y.slice(0,7),f=[...r].sort((s,i)=>s.sales_date.localeCompare(i.sales_date)).map(s=>({date:new Date(`${s.sales_date}T00:00:00Z`).toISOString(),amount:le(s.amount??s.sales_amount),bottles:le(s.bottles),volumeMl:le(s.volume_ml),pricePerBottle:le(s.price_per_bottle),pricePerLiter:le(s.price_per_liter)})),x=f.slice(-30),S=s=>le(s.amount??s.sales_amount),$=r.reduce((s,i)=>i.sales_date===y?s+S(i):s,0),C=r.reduce((s,i)=>i.sales_date.startsWith(g)?s+S(i):s,0),P=c.filter(s=>le(s.balance_amount)>0),E=d.map((s,i)=>({id:String(s.id??`sale-${i+1}`),documentNo:s.document_no??s.legacy_document_no??"",date:s.sales_date??"",customerCode:s.legacy_customer_code??"",customerName:s.customer_name??s.legacy_customer_code??"",amount:le(s.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:$,todayDelta:0,monthSales:C,monthDelta:0,unpaidCount:P.length,unpaidAmount:P.reduce((s,i)=>s+le(i.balance_amount),0)},dailySales:x,allDailySales:f,salesRecords:E}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),As}async function Ds(){const e=await U("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const o=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${o}-${n+1}`,customerCode:o,customerName:o,billedAmount:le(t.billed_amount),paymentAmount:le(t.paid_amount),balanceAmount:le(t.balance_amount),lastPaymentDate:null,status:xr(t.payment_status)}})}:gr}async function sn(){const[e,t]=await Promise.all([U("customers",{limit:"1000"}),U("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((r,l)=>{const c=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:v(r,["id","customer_id","code"],`customer-${l+1}`),code:v(r,["code","customer_code","legacy_customer_code"],`C${String(l+1).padStart(4,"0")}`),name:v(r,["name","customer_name","display_name"],`Customer ${l+1}`),kanaName:v(r,["kana_name"],""),shortName:v(r,["short_name"],""),postalCode:v(r,["postal_code"],""),address1:v(r,["address1"],""),address2:v(r,["address2"],""),phone:v(r,["phone"],""),fax:v(r,["fax"],""),email:v(r,["email"],""),staffCode:v(r,["staff_code"],""),businessType:v(r,["business_type"],""),areaCode:v(r,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:T(r,["closing_day","close_day"],31),paymentDay:T(r,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:v(r,["payment_cycle"],""),billingCycleType:v(r,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:T(r,["credit_limit"],0),taxMode:v(r,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:v(r,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),tradeType:(()=>{const d=v(r,["trade_type"],"");if(d)return d;const u=String(c.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:v(r,["bank_name"],""),bankBranch:v(r,["bank_branch"],""),bankAccount:v(r,["bank_account"],""),isActive:be(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):Je.customers,o=t.length?t.map((r,l)=>({id:v(r,["id","product_id","product_code","legacy_product_code"],`product-${l+1}`),code:v(r,["product_code","legacy_product_code","code"],`P${String(l+1).padStart(5,"0")}`),janCode:v(r,["jan_code","jan","barcode"],""),name:v(r,["name","product_name","display_name"],`Product ${l+1}`),kanaName:v(r,["kana_name"],""),shortName:v(r,["short_name"],""),category:v(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:v(r,["tax_code","tax_category_code"],""),isActive:be(r,["is_active","active","enabled"],!0),listPrice:T(r,["list_price"],0),purchasePrice:T(r,["purchase_price"],0),salePrice:T(r,["default_sale_price","sale_price"],0),costPrice:T(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:v(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:v(r,["bottle_type"],""),containerCode:v(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:v(r,["rice_type"],""),season:v(r,["season"],""),agingYears:T(r,["aging_years"],0)})):Je.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Je.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:Je.summary.activeCustomerCount,productCount:t.length||Je.summary.productCount,activeProductCount:t.length?o.filter(r=>r.isActive).length:Je.summary.activeProductCount},customers:n,products:o}}return Je}async function qs(){const[e,t]=await Promise.all([U("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),U("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?ge(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const o=e[0],r=v(o,["status"],"success"),l=o.errors,c=Array.isArray(l)?l.length>0:!!l;return{generatedAt:new Date().toISOString(),lastSyncAt:ge(o,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":r==="error"?"error":"success",jobName:v(o,["agent_hostname"],"sake-relay"),message:`${T(o,["rows_upserted"],0)}行同期 / ${T(o,["files_updated"],0)}ファイル更新`}}return{...vr,lastDataAt:n}}async function Ts(){const e=await me("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function Is(){const e=[{name:"売上明細 (SHTOR)",table:"sales_document_lines",countFilter:"note=like.*src:diff*",expectMin:2e5},{name:"伝票ヘッダ (SHDEN)",table:"sales_document_headers",expectMin:5e4},{name:"日次売上集計",table:"daily_sales_fact",expectMin:1e5},{name:"商品月別売上",table:"product_monthly_sales",expectMin:1e4},{name:"得意先マスタ",table:"customers",expectMin:500},{name:"商品マスタ",table:"products",expectMin:1e3},{name:"安全在庫",table:"product_safety_stock_params",expectMin:0}],t=[];for(const n of e)try{const o=n.countFilter?`&${n.countFilter}`:"",r=`${fe}/rest/v1/${n.table}?select=id&limit=0${o}`,c=(await fetch(r,{headers:{apikey:se,Authorization:`Bearer ${se}`,Prefer:"count=exact"}})).headers.get("content-range")??"*/0",d=parseInt(c.split("/").pop()??"0",10)||0,u=d>=n.expectMin?"ok":d>0?"warn":"error";t.push({name:n.name,table:n.table,count:d,status:u,detail:d>=n.expectMin?"正常稼働":d>0?"データ少":"データなし"})}catch{t.push({name:n.name,table:n.table,count:0,status:"error",detail:"接続エラー"})}return t}async function Tt(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];if(e.customerCode.trim()){const r=e.customerCode.trim();n.push(`customer_code.ilike.*${r}*`,`legacy_customer_code.ilike.*${r}*`,`customer_name.ilike.*${r}*`)}e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const o=await U("sales_document_headers",t);return o.length>0?o.map((r,l)=>({id:v(r,["id"],`invoice-${l}`),documentNo:v(r,["document_no","legacy_document_no"],""),date:ge(r,["sales_date"],""),customerCode:v(r,["legacy_customer_code","customer_code"],""),customerName:v(r,["customer_name","legacy_customer_code"],""),itemCount:T(r,["line_count"],0),amount:T(r,["total_amount","billed_amount"],0)})):[]}const Et=new Map;async function Ms(e){Et.clear();const t=await ve("sales_document_lines",{select:"document_no,line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*date:${e}*`,order:"document_no,line_no"});for(const n of t){const o=v(n,["document_no"],"");if(!o)continue;const r=Et.get(o)??[];r.push({lineNo:T(n,["line_no"],0),productCode:v(n,["legacy_product_code"],""),productName:v(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0)}),Et.set(o,r)}}async function Oa(e){const t=Et.get(e);if(t)return t;const o=(await U("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*inv:${e} *`,order:"line_no",limit:"100"})).map(r=>({lineNo:T(r,["line_no"],0),productCode:v(r,["legacy_product_code"],""),productName:v(r,["product_name"],""),quantity:T(r,["quantity"],0),unitPrice:T(r,["unit_price"],0),amount:T(r,["amount"],0)}));return Et.set(e,o),o}async function on(e){const t=e.trim().toUpperCase();if(!t)return qn("");const[n,o,r]=await Promise.all([U("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t},customer_name.ilike.*${t}*`,order:"sales_date.desc",limit:"50"}),U("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),U("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||o.length>0){const l=n.map((u,y)=>{const g=_r(u,y);return{id:g.id,date:g.date,documentNo:g.documentNo,amount:g.amount}}),c=o.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:ge(u,["payment_date","received_date"],new Date().toISOString()),amount:le(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),d=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:le(d?.balance_amount),salesTotal:l.reduce((u,y)=>u+y.amount,0),paymentTotal:c.reduce((u,y)=>u+y.amount,0),salesHistory:l,paymentHistory:c}}return qn(t)}async function rn(){const[e,t,n,o]=await Promise.all([U("mv_monthly_sales",{order:"month.asc"}),U("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),U("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),U("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:v(r,["month"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),volumeMl:T(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),staffTotals:o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:0}))}:wr}async function Sr(e,t,n){if(t==="all")return[];const o=n?Ns(t,n):null,l=await me(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:o?.from??null,p_date_to:o?.to??null});return l?l.map(c=>({code:v(c,["code"],""),name:v(c,["name"],""),amount:T(c,["amount"],0),quantity:T(c,["quantity"],0),documents:T(c,["documents"],0),volumeMl:T(c,["volume_ml"],0)})):[]}async function kr(e,t){if(t==="all")return[];const n=await me("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(o=>o.period_val).filter(Boolean)}function Ns(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,o]=t.split("-").map(Number),r=`${n}-${String(o).padStart(2,"0")}-01`,l=new Date(n,o,0).getDate(),c=`${n}-${String(o).padStart(2,"0")}-${String(l).padStart(2,"0")}`;return{from:r,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const o=parseInt(n[1]),r=parseInt(n[2]),l=new Date(o,0,4),c=l.getDay()||7,d=new Date(l);d.setDate(l.getDate()-c+1);const u=new Date(d);u.setDate(d.getDate()+(r-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function Rs(e){return e.map(t=>({staffCode:v(t,["staff_code"],""),staffName:v(t,["staff_name"],""),code:v(t,["code"],""),name:v(t,["name"],""),tag:v(t,["tag"],""),amount:T(t,["amount"],0),quantity:T(t,["quantity"],0),documents:T(t,["documents"],0)}))}async function Pr(e,t){const n=await me("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(o=>({code:v(o,["code"],""),name:v(o,["name"],""),amount:T(o,["amount"],0),quantity:T(o,["quantity"],0),documents:T(o,["documents"],0)})):[]}async function Er(e,t,n){const o=await me("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?Rs(o):[]}async function Ar(e,t,n){const o=await me("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?Rs(o):[]}async function Lr(e,t){if(e==="all"||!t)return[];const n=await me("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(o=>({month:v(o,["label"],""),amount:T(o,["amount"],0),quantity:T(o,["quantity"],0),volumeMl:T(o,["volume_ml"],0)})):[]}function Cr(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function Dr(e,t,n){const o=await me("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),tag:v(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function qr(e,t,n){const o=await me("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),tag:v(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function Tr(e,t){const n=await me("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(o=>({month:v(o,["month"],""),amount:T(o,["amount"],0),quantity:T(o,["quantity"],0),volumeMl:T(o,["volume_ml"],0)})):[]}async function Ir(e,t){const n=await me("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:v(o,["brew_category"],""),subCategory:v(o,["sub_category"],""),productCount:T(o,["product_count"],0),totalShipmentQty:T(o,["total_shipment_qty"],0),totalShipmentMl:T(o,["total_shipment_ml"],0),monthlyAvgQty:T(o,["monthly_avg_qty"],0),monthlyAvgMl:T(o,["monthly_avg_ml"],0),currentStockL:T(o,["current_stock_l"],0),monthsRemaining:T(o,["months_remaining"],0),costPerL:T(o,["cost_per_l"],0)})):[]}async function Mr(e,t){const n=await me("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({month:v(o,["month"],""),brewCategory:v(o,["brew_category"],""),shipmentMl:T(o,["shipment_ml"],0)})):[]}async function Nr(e,t){const n=await me("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:v(o,["brew_category"],""),subCategory:v(o,["sub_category"],""),productCode:v(o,["product_code"],""),productName:v(o,["product_name"],""),volumeMl:T(o,["volume_ml"],0),annualQty:T(o,["annual_qty"],0),annualMl:T(o,["annual_ml"],0),monthlyAvgQty:T(o,["monthly_avg_qty"],0),monthlyAvgMl:T(o,["monthly_avg_ml"],0)})):[]}async function Rr(e){return(await U("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),fy:T(n,["fy"],e),brewMonth:T(n,["brew_month"],0),durationMonths:T(n,["duration_months"],2),plannedVolumeL:T(n,["planned_volume_l"],0),notes:v(n,["notes"],"")}))}async function Or(e,t,n){return await me("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function Br(e,t,n,o){return await gt("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:o??null,updated_at:new Date().toISOString()})!==null}async function jr(){const e=await U("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const o=v(n,["category_name"],""),r=v(n,["production_type_name"],"");!o||!r||(t[o]||(t[o]=[]),t[o].push(r))}return t}async function zr(e,t){return await me("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function Fr(e,t){return await me("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Vr(){const e=await U("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>v(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function Yr(){const e=await U("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],"");o&&(t[o]={brewCategory:o,rawAlcoholPct:T(n,["raw_alcohol_pct"],18),targetAlcoholPct:T(n,["target_alcohol_pct"],15)})}return t}async function Ur(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${o}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function Jr(){const e=await me("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:T(t,["fy"],0),brewCategory:v(t,["brew_category"],""),shipmentL:T(t,["shipment_l"],0),monthsElapsed:T(t,["months_elapsed"],12),annualizedL:T(t,["annualized_l"],0)})):[]}async function Hr(){const e=await U("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],""),r=T(n,["growth_rate"],NaN);o&&!isNaN(r)&&(t[o]=r)}return t}async function Kr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function Qr(){const e=await U("brewing_rice_params",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],"");o&&(t[o]={brewCategory:o,polishingRatio:T(n,["polishing_ratio"],.7),ricePerLiterKg:T(n,["rice_per_liter_kg"],.5),kojiRatio:T(n,["koji_ratio"],.3),kojiVariety:v(n,["koji_variety"],"山田錦"),kojiPricePerKg:T(n,["koji_price_per_kg"],600),kakeVariety:v(n,["kake_variety"],"一般米"),kakePricePerKg:T(n,["kake_price_per_kg"],350),alcoholAdditionRatio:T(n,["alcohol_addition_ratio"],0)})}return t}async function Wr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function Gr(){const e=await me("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:v(t,["brew_category"],""),monthNum:T(t,["month_num"],0),avgMonthlyL:T(t,["avg_monthly_l"],0)})):[]}async function Xr(e){const t=await U("procurement_decisions",{fy:`eq.${e}`}),n={};for(const o of t??[]){const r=v(o,["brew_category"],""),l=T(o,["decided_brewing_l"],-1);r&&l>=0&&(n[r]=l)}return n}async function Zr(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${o}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function ei(e){return(await U("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),batchCode:v(n,["batch_code"],""),fy:T(n,["fy"],e),plannedVolumeL:T(n,["planned_volume_l"],0),tankNo:v(n,["tank_no"],""),status:v(n,["status"],"planned"),startDate:v(n,["start_date"],""),targetEndDate:v(n,["target_end_date"],""),notes:v(n,["notes"],"")}))}async function ti(e){return e.length===0?[]:(await U("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:v(n,["id"],""),batchId:v(n,["batch_id"],""),stepOrder:T(n,["step_order"],0),stepName:v(n,["step_name"],""),plannedStart:v(n,["planned_start"],""),plannedEnd:v(n,["planned_end"],""),actualStart:v(n,["actual_start"],""),actualEnd:v(n,["actual_end"],""),status:v(n,["status"],"未着手"),temperature:n.temperature!=null?T(n,["temperature"],0):null,notes:v(n,["notes"],"")}))}function ai(e,t){const n=new Date(e);let o=0;for(;o<t;)n.setDate(n.getDate()+1),n.getDay()!==0&&o++;return n}function ni(e,t){const n=new Date(e);let o=t-1;for(;o>0;)n.setDate(n.getDate()+1),n.getDay()!==0&&o--;return n.getDay()===0&&n.setDate(n.getDate()+1),n}function Tn(e){return e.getDay()===0&&e.setDate(e.getDate()+1),e}const Zt=[{name:"洗米・浸漬",days:1},{name:"蒸米",days:1},{name:"製麹",days:2},{name:"酒母",days:14},{name:"仕込み(添/仲/留)",days:4},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];async function si(e,t,n,o,r){const c=n[o],d=c?.ricePerLiterKg??.5,u=c?.kojiRatio??.3,y=c?.polishingRatio??.7,g=c?.alcoholAdditionRatio??0,f=Math.round(t*(1-g)*d*u/y),x=r.filter($=>$.stepName==="製麹"&&$.plannedStart&&$.plannedEnd);let S=new Date(e);for(let $=0;$<60;$++){const C=new Date(S.getTime()+1728e5),P=new Date(S.getTime()+3*864e5);let E=0;for(const s of x){const i=new Date(s.plannedStart).getTime(),p=new Date(s.plannedEnd).getTime();C.getTime()<=p&&P.getTime()>=i&&(E+=180)}if(E+f<=180)return S.toISOString().slice(0,10);S=new Date(S.getTime()+864e5)}return S.toISOString().slice(0,10)}async function oi(e,t,n,o,r,l,c){let d=r;l&&c&&(d=await si(r,o,c,e,l));const u=await Ee("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:o,start_date:d});if(!u?.id)return null;let y=Tn(new Date(d));for(let g=0;g<Zt.length;g++){y=Tn(y);const f=y.toISOString().slice(0,10),x=ni(y,Zt[g].days),S=x.toISOString().slice(0,10);await Ee("brewing_process_steps",{batch_id:u.id,step_order:g+1,step_name:Zt[g].name,planned_start:f,planned_end:S}),y=ai(x,1)}return await Fe("brewing_process_batches",u.id,{target_end_date:y.toISOString().slice(0,10)}),u.id}async function ri(e,t){return Fe("brewing_process_steps",e,t)}async function ii(e,t){return Fe("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function li(){return(await U("tanks",{order:"tank_no"})??[]).map(t=>({id:v(t,["id"],""),tankNo:v(t,["tank_no"],""),displayName:v(t,["display_name"],""),capacityL:T(t,["capacity_l"],0),tankType:v(t,["tank_type"],""),status:v(t,["status"],"empty"),preferredCategories:Array.isArray(t.preferred_categories)?t.preferred_categories:[],cleanupDays:T(t,["cleanup_days"],1)}))}async function ci(e,t,n,o){return await Ee("tanks",{tank_no:e,display_name:e,capacity_l:t,tank_type:n,preferred_categories:o,status:"empty"})!==null}async function di(e){const{supabaseDelete:t}=await N(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tanks",e)}function pi(e,t){const n=e.find(l=>l.stepName==="仕込み(添/仲/留)"),o=e.find(l=>l.stepName==="上槽");if(!n?.plannedStart||!o?.plannedEnd)return null;const r=new Date(o.plannedEnd);return r.setDate(r.getDate()+t),{start:n.plannedStart,end:r.toISOString().slice(0,10)}}async function ui(e,t,n,o){const r=new Map(n.map(P=>[P.stepName,P])),l=o??[],c=e.filter(P=>P.status!=="completed"&&P.startDate).sort((P,E)=>P.startDate.localeCompare(E.startDate));if(c.length===0)return;const d=t.deadlineDate||"",u=t.allowSunday&&!!d,y=new Map,g=(P,E)=>{const s=new Date(P);return s.setDate(s.getDate()+E),s.toISOString().slice(0,10)},f=(P,E,s,i)=>P<=i&&E>=s,x=P=>E=>(!P&&E.getDay()===0&&E.setDate(E.getDate()+1),E),S=(P,E,s)=>{const i=new Date(P);let p=E-1;for(;p>0;)i.setDate(i.getDate()+1),(s||i.getDay()!==0)&&p--;return!s&&i.getDay()===0&&i.setDate(i.getDate()+1),i},$=(P,E)=>{const s=new Date(P);return s.setDate(s.getDate()+1),!E&&s.getDay()===0&&s.setDate(s.getDate()+1),s},C=()=>{const P=new Map;for(const E of y.values())for(const s of E){const i=r.get(s.stepName);if(!i)continue;const p=Math.max(Math.round((new Date(s.end).getTime()-new Date(s.start).getTime())/864e5)+1,1);let m=0;for(let b=0;b<p;b++){const _=new Date(s.start);_.setDate(_.getDate()+b),_.getDay()!==0&&m++}if(m===0)continue;const h=i.laborHours/m;for(let b=0;b<p;b++){const _=new Date(s.start);if(_.setDate(_.getDate()+b),_.getDay()===0)continue;const w=new Date(_);w.setDate(w.getDate()+3-(w.getDay()+6)%7);const k=new Date(w.getFullYear(),0,4),D=1+Math.round(((w.getTime()-k.getTime())/864e5-3+(k.getDay()+6)%7)/7),L=`${w.getFullYear()}-W${String(D).padStart(2,"0")}`;P.set(L,(P.get(L)??0)+h)}}return P};for(const P of c){let E=P.startDate;for(let m of[!1,...u?[!0]:[]]){E=P.startDate;for(let b=0;b<90;b++){E=x(m)(new Date(E)).toISOString().slice(0,10);const w=[];let k=new Date(E);for(const O of Zt){k=x(m)(k);const R=k.toISOString().slice(0,10),M=S(k,O.days,m),j=M.toISOString().slice(0,10);w.push({stepName:O.name,start:R,end:j}),k=$(M,m)}const D=w.find(O=>O.stepName==="製麹");let L=!1;if(D)for(const[O,R]of y){const M=R.find(j=>j.stepName==="製麹");if(M&&f(D.start,D.end,M.start,M.end)){L=!0;break}}if(L){E=g(E,1);continue}y.set(P.id,w);const q=C(),I=t.workerCount*t.weeklyHoursLimit;let B=!1;for(const O of q.values())if(O>I*1.1){B=!0;break}if(B){y.delete(P.id),E=g(E,1);continue}if(l.length>0){const O=w.find(M=>M.stepName==="仕込み(添/仲/留)"),R=w.find(M=>M.stepName==="上槽");if(O&&R){const M=O.start,j=new Date(R.end);j.setDate(j.getDate()+1);const Y=j.toISOString().slice(0,10),J=l.filter(Q=>Q.capacityL>=P.plannedVolumeL&&(Q.preferredCategories.length===0||Q.preferredCategories.includes(P.brewCategory)));let W=!1;for(const Q of J){let H=!1;for(const[X,ee]of y){if(X===P.id||e.find(G=>G.id===X)?.tankNo!==Q.tankNo)continue;const V=ee.find(G=>G.stepName==="仕込み(添/仲/留)"),K=ee.find(G=>G.stepName==="上槽");if(V&&K){const G=g(K.end,Q.cleanupDays);if(f(M,Y,V.start,G)){H=!0;break}}}if(!H){Q.tankNo,W=!0;break}}if(!W){y.delete(P.id),E=g(E,1);continue}}}break}const h=y.get(P.id);if(d&&h){const b=h.find(_=>_.stepName==="仕込み(添/仲/留)");if(b&&b.end<=d)break;if(!m){y.delete(P.id);continue}}else break}const s=y.get(P.id);if(!s)continue;const i=(()=>{if(l.length===0)return P.tankNo;const m=s.find(w=>w.stepName==="仕込み(添/仲/留)"),h=s.find(w=>w.stepName==="上槽");if(!m||!h)return P.tankNo;const b=m.start,_=g(h.end,1);for(const w of l){if(w.capacityL<P.plannedVolumeL||w.preferredCategories.length>0&&!w.preferredCategories.includes(P.brewCategory))continue;let k=!1;for(const[D,L]of y){if(D===P.id||e.find(O=>O.id===D)?.tankNo!==w.tankNo)continue;const I=L.find(O=>O.stepName==="仕込み(添/仲/留)"),B=L.find(O=>O.stepName==="上槽");if(I&&B&&f(b,_,I.start,g(B.end,w.cleanupDays))){k=!0;break}}if(!k)return w.tankNo}return P.tankNo})();await Fe("brewing_process_batches",P.id,{start_date:E,tank_no:i,target_end_date:g(s[s.length-1].end,0),updated_at:new Date().toISOString()});const p=await U("brewing_process_steps",{batch_id:`eq.${P.id}`,order:"step_order.asc"});if(p)for(const m of p){const h=T(m,["step_order"],0),b=s[h-1];if(b){const _=v(m,["id"],"");await Fe("brewing_process_steps",_,{planned_start:b.start,planned_end:b.end})}}}}async function mi(){const t=(await U("brewing_worker_settings",{limit:"1"})??[])[0];return t?{workerCount:T(t,["worker_count"],2),weeklyHoursLimit:T(t,["weekly_hours_limit"],40),dayStartHour:T(t,["day_start_hour"],6),deadlineDate:v(t,["deadline_date"],""),allowSunday:t.allow_sunday===!0}:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1}}async function yi(e){const t=await U("brewing_worker_settings",{limit:"1"});if(t&&t.length>0){const n=v(t[0],["id"],"");return Fe("brewing_worker_settings",n,{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday,updated_at:new Date().toISOString()})}return await Ee("brewing_worker_settings",{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday})!==null}async function hi(){return(await U("brewing_step_labor",{order:"step_name"})??[]).map(t=>({stepName:v(t,["step_name"],""),laborHours:T(t,["labor_hours"],4),workerCountNeeded:T(t,["worker_count_needed"],1)}))}function fi(e,t){const n=new Map(t.map(r=>[r.stepName,r])),o=new Map;for(const r of e){if(!r.plannedStart||!r.plannedEnd)continue;const l=n.get(r.stepName);if(!l)continue;const c=new Date(r.plannedStart),d=new Date(r.plannedEnd),u=Math.max(Math.round((d.getTime()-c.getTime())/864e5)+1,1),y=l.laborHours/u;for(let g=new Date(c);g<=d;g=new Date(g.getTime()+864e5)){const f=new Date(g);f.setDate(f.getDate()+3-(f.getDay()+6)%7);const x=new Date(f.getFullYear(),0,4),S=1+Math.round(((f.getTime()-x.getTime())/864e5-3+(x.getDay()+6)%7)/7),$=`${f.getFullYear()}-W${String(S).padStart(2,"0")}`;o.set($,(o.get($)??0)+y)}}return o}async function gi(e){return(await U("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:v(n,["id"],""),varietyName:v(n,["variety_name"],""),committedBales:T(n,["committed_bales"],0),pricePerKg:T(n,["price_per_kg"],0),supplier:v(n,["supplier"],""),deliveryMonth:T(n,["delivery_month"],0)||null,fy:T(n,["fy"],e),notes:v(n,["notes"],"")}))}async function vi(e){return await Ee("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function bi(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function wi(){return(await U("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),defaultPricePerKg:T(t,["default_price_per_kg"],400),region:v(t,["region"],"")}))}async function xi(e,t,n=""){return await Ee("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function $i(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function _i(e){return(await U("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),label:v(n,["label"],""),volumeL:T(n,["volume_l"],0)}))}async function Si(){return(await U("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:v(t,["id"],""),brewCategory:v(t,["brew_category"],""),label:v(t,["label"],""),volumeL:T(t,["volume_l"],0)}))}async function ki(e,t,n){return await Ee("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function Pi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function Ei(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Ai(){return(await U("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:v(t,["name"],""),parentCategory:v(t,["parent_category"],"")})).filter(t=>t.name)}async function Li(e,t){return await Ee("brewing_custom_categories",{name:e,parent_category:t})!==null}async function Ci(e){const t=await me("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:v(n,["production_type_name"],""),count:T(n,["product_count"],0)})).filter(n=>n.name):[]}async function Di(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function qi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!o)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function Ti(){const e=await U("brewing_category_overrides",{}),t={};for(const n of e??[]){const o=v(n,["product_code"],""),r=v(n,["brew_category"],"");o&&r&&(t[o]=r)}return t}async function Ii(e){return(await U("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>v(n,["product_code"],"")).filter(Boolean)}async function Mi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!o)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}}),t.length===0)return!0;const r=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const Ba={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Os(e){const t=e.lines.reduce((r,l)=>r+l.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Ee("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const In={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function ln(e){const t=await U("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],o=le(n.total_amount);return{documentNo:e,invoiceDate:v(n,["sales_date","document_date"],""),customerCode:v(n,["legacy_customer_code","customer_code"],""),customerName:v(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:o,taxAmount:Math.floor(o*10/110),note:""}}return{...In,documentNo:e||In.documentNo}}const Ni={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function cn(e){const t=await U("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const l=T(r,["sales_amount"],0),c=T(r,["tax_amount"],0);return{customerCode:v(r,["customer_code"],""),customerName:v(r,["customer_name"],""),closingDay:31,salesAmount:l,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:l,status:"open"}}),o=n.reduce((r,l)=>r+l.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:o,customers:n}}return{...Ni,targetYearMonth:e}}const Ri={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Bs(){const[e,t,n]=await Promise.all([U("mv_monthly_sales",{order:"month.asc"}),U("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),U("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Ri;const o=e.slice(-12).map(u=>v(u,["month"],"")),r=new Map;t.forEach(u=>{const y=v(u,["code"],"");r.has(y)||r.set(y,{name:v(u,["name"],y),monthValues:new Map}),r.get(y).monthValues.set(v(u,["month"],""),T(u,["amount"],0))});const c=Array.from(r.entries()).map(([u,y])=>({code:u,name:y.name,total:o.reduce((g,f)=>g+(y.monthValues.get(f)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:o.map(y=>u.monthValues.get(y)??0)})),d=n.map(u=>({label:v(u,["name"],""),values:o.map(()=>Math.round(T(u,["amount"],0)/o.length))}));return{generatedAt:new Date().toISOString(),months:o,salesByProduct:c,salesByCustomer:d,costSimulation:[]}}async function Oi(){const e=await ve("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const o=v(n,["code"],"");if(!o)return;const r=v(n,["month"],""),l=parseInt(r.slice(5,7))-1;if(l<0||l>11)return;let c=t.get(o);c||(c={name:v(n,["name"],o),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(o,c)),c.qty[l]+=T(n,["quantity"],0),c.amt[l]+=T(n,["amount"],0)}),Array.from(t.entries()).map(([n,o])=>({code:n,name:o.name,monthlyQuantity:o.qty,monthlyAmount:o.amt,totalQuantity:o.qty.reduce((r,l)=>r+l,0),totalAmount:o.amt.reduce((r,l)=>r+l,0)})).filter(n=>n.totalQuantity>0).sort((n,o)=>o.totalAmount-n.totalAmount)}async function Bi(){return(await U("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:v(t,["product_code"],""),productName:v(t,["product_name"],""),forecastMonth:v(t,["forecast_month"],""),segment:v(t,["segment"],"monthly"),avgMonthly:T(t,["avg_monthly"],0),forecastQuantity:T(t,["forecast_quantity"],0),forecastAmount:T(t,["forecast_amount"],0),safetyStock:T(t,["safety_stock"],0),calculatedAt:ge(t,["calculated_at"],"")}))}async function ji(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await ve("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const o=await ve("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(c=>{c.id&&r.set(String(c.id),c)});const l=[];return o.forEach(c=>{const d=String(c.header_id??c.document_header_id??""),u=r.get(d);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||l.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:le(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),l.sort((c,d)=>c.date.localeCompare(d.date))}async function zi(){const e=new Date().toISOString();return(await U("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:v(n,["id"],""),message:v(n,["message"],""),level:v(n,["level"],"info"),startsAt:ge(n,["starts_at"],""),endsAt:n.ends_at?ge(n,["ends_at"],""):null,dismissible:be(n,["dismissible"],!0)}))}async function Fi(){const e=await ve("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:v(t,["customer_code"],""),customer_name:v(t,["customer_name"],""),business_type:v(t,["business_type"],""),area_code:v(t,["area_code"],""),phone:v(t,["phone"],""),last_order_date:v(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),amount_12m:T(t,["amount_12m"],0),amount_3m:T(t,["amount_3m"],0),amount_this_month:T(t,["amount_this_month"],0),amount_last_year_same_month:T(t,["amount_last_year_same_month"],0),annual_revenue:T(t,["annual_revenue"],0),is_dormant:be(t,["is_dormant"],!1),is_at_risk:be(t,["is_at_risk"],!1)})):[]}async function Vi(){return(await ve("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:v(t,["customer_code"],""),customer_name:v(t,["customer_name"],""),phone:v(t,["phone"],""),address:v(t,["address"],""),area_code:v(t,["area_code"],""),business_type:v(t,["business_type"],""),priority_score:T(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:v(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),annual_revenue:T(t,["annual_revenue"],0),recommended_action:v(t,["recommended_action"],"")}))}async function Yi(){return(await ve("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:v(t,["product_code"],""),product_name:v(t,["product_name"],""),season_type:v(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:T(t,["avg_monthly_qty"],0)}))}async function Ui(){return(await ve("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:v(t,["product_code"],""),name:v(t,["product_name"],""),monthlyQuantity:[T(t,["m01"],0),T(t,["m02"],0),T(t,["m03"],0),T(t,["m04"],0),T(t,["m05"],0),T(t,["m06"],0),T(t,["m07"],0),T(t,["m08"],0),T(t,["m09"],0),T(t,["m10"],0),T(t,["m11"],0),T(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:T(t,["total_quantity"],0),totalAmount:T(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function js(e,t,n){try{return await Ee("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function zs(e,t){return Fe("customers",e,t)}async function Fs(e,t){return Fe("products",e,t)}async function ja(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const o=n?.priceGroup||t;let r="";try{const c=await U("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(r=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const l=new Map;if(o){const c=await U("customer_product_prices",{price_group:`eq.${o}`,select:"legacy_product_code,special_price"});for(const d of c)l.set(d.legacy_product_code,d.special_price)}return{priceType:r,priceGroup:o,individualPrices:l}}function dn(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function Ji(){return(await U("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Hi(){return(await ve("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Ki(){return(await U("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function ut(e,t="billing",n="apr"){const o=await me("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t,p_fiscal_type:n});return o?o.map(r=>({code:String(r.legacy_customer_code??""),name:String(r.customer_name??""),address:String(r.address1??""),yearAmount:Number(r.year_amount??0),sharePct:Number(r.share_pct??0),orderDays:Number(r.order_days??0),prevAmount:Number(r.prev_amount??0),growthRate:r.growth_rate!=null?Number(r.growth_rate):null,currentRank:String(r.current_rank??"C"),prevRank:String(r.prev_rank??"")})):[]}function pn(e){if(!e)return null;if(/^\d{4}$/.test(e))return{dateFrom:`${e}-01-01`,dateTo:`${e}-12-31`};if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return{dateFrom:`${e}-01`,dateTo:`${e}-${String(o).padStart(2,"0")}`}}return null}async function Vs(e=""){const t=pn(e),n=t?me("get_abc_customer_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then($=>$??[]):U("mv_customer_abc",{order:"amount.desc"}),o=t?t.dateFrom.slice(0,7):(()=>{const $=new Date;return $.setMonth($.getMonth()-11),`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[l,c]=await Promise.all([n,U("mv_customer_monthly_sales",{month:`gte.${o}`,order:"month.asc",limit:"10000"})]),d=c.filter($=>v($,["month"],"")<=r),u=l.map($=>({code:v($,["code"],""),name:v($,["name"],""),amount:T($,["amount"],0),documents:T($,["documents"],0),ratio:T($,["ratio"],0),cumRatio:T($,["cum_ratio","cumRatio"],0),abcRank:v($,["abc_rank","abcRank"],"C")})),y=u.slice(0,10),g=new Set(y.map($=>$.code)),f=Us(o,r),x=new Map;d.forEach($=>{const C=v($,["code"],"");if(!g.has(C))return;const P=v($,["month"],"");x.has(C)||x.set(C,new Map),x.get(C).set(P,T($,["amount"],0))});const S=y.map($=>({label:$.name,values:f.map(C=>x.get($.code)?.get(C)??0)}));return{generatedAt:new Date().toISOString(),ranking:u,months:f,monthlyByCustomer:S}}async function Ys(e=""){const t=pn(e),n=t?me("get_abc_product_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(C=>C??[]):U("mv_product_abc",{order:"amount.desc"}),o=t?t.dateFrom.slice(0,7):(()=>{const C=new Date;return C.setMonth(C.getMonth()-11),`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[l,c]=await Promise.all([n,U("mv_product_monthly_shipments",{month:`gte.${o}`,order:"month.asc",limit:"10000"})]),d=c.filter(C=>v(C,["month"],"")<=r),y=l.map(C=>({code:v(C,["code"],""),name:v(C,["name"],""),amount:T(C,["amount"],0),quantity:T(C,["quantity"],0),documents:T(C,["documents"],0),ratio:T(C,["ratio"],0),cumRatio:T(C,["cum_ratio","cumRatio"],0),abcRank:v(C,["abc_rank","abcRank"],"C")})),g=y.reduce((C,P)=>C+P.amount,0),f=Us(o,r),x=new Set(y.filter(C=>C.abcRank==="A").slice(0,10).map(C=>C.code)),S=new Map;d.forEach(C=>{const P=v(C,["code"],"");if(!x.has(P))return;const E=v(C,["month"],"");S.has(P)||S.set(P,new Map),S.get(P).set(E,T(C,["amount"],0))});const $=Array.from(x).map(C=>{const P=S.get(C);return{label:y.find(E=>E.code===C)?.name??C,values:f.map(E=>P?.get(E)??0)}});return{generatedAt:new Date().toISOString(),totalAmount:g,ranking:y,months:f,monthlyByProduct:$.length>0?$:[]}}function Us(e,t){const n=[],[o,r]=e.split("-").map(Number),[l,c]=t.split("-").map(Number);let d=o,u=r;for(;(d<l||d===l&&u<=c)&&(n.push(`${d}-${String(u).padStart(2,"0")}`),u++,u>12&&(u=1,d++),!(n.length>60)););return n}const Js={planned:"計画中",active:"仕込中",done:"完了"};async function Hs(){const e=await U("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),jikomiNo:v(t,["batch_no","legacy_batch_no"],""),productName:v(t,["brand_name"],""),riceType:v(t,["rice_type"],""),plannedKg:T(t,["planned_rice_kg"],0),actualKg:T(t,["actual_rice_kg"],0),startDate:ge(t,["start_date"],""),expectedDoneDate:ge(t,["expected_done_date"],""),status:v(t,["status"],"planned"),tankNo:v(t,["tank_no"],""),note:v(t,["remarks"],"")})):[]}async function Ks(){const e=await U("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),tankNo:v(t,["tank_no"],""),capacity:T(t,["capacity_l"],0),currentVolume:T(t,["current_volume_l"],0),productName:v(t,["current_product_code"],""),jikomiNo:v(t,["current_batch_id"],""),status:v(t,["status"],"empty"),lastUpdated:ge(t,["last_updated_at"],"")})):[]}async function Qs(){const e=await U("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),kenteiNo:v(t,["kentei_no"],""),jikomiNo:v(t,["batch_id"],""),productName:v(t,["product_code"],""),kenteiDate:ge(t,["kentei_date"],""),alcoholDegree:T(t,["alcohol_degree"],0),extractDegree:T(t,["extract_degree"],0),sakaMeterValue:T(t,["sakemeter_value"],0),volume:T(t,["volume_l"],0),taxCategory:v(t,["tax_category_code"],""),status:v(t,["status"],"pending")})):[]}async function Ws(){const e=await U("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),code:v(t,["material_code","legacy_material_code"],""),name:v(t,["name"],""),unit:v(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),unitCost:T(t,["unit_cost"],0),lastUpdated:ge(t,["updated_at"],"")})):[]}async function Gs(){const e=await U("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),documentNo:v(t,["document_no","legacy_document_no"],""),purchaseDate:ge(t,["purchase_date"],""),supplierCode:v(t,["supplier_code","legacy_supplier_code"],""),supplierName:v(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:T(t,["total_amount"],0),status:v(t,["payment_status"],"pending")})):[]}async function Xs(){const e=await U("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:v(t,["supplier_code","legacy_supplier_code"],""),supplierName:v(t,["legacy_supplier_code"],""),totalPurchase:T(t,["total_purchase"],0),paidAmount:T(t,["paid_amount"],0),balance:T(t,["balance"],0),nextPaymentDate:ge(t,["next_payment_date"],""),status:v(t,["status"],"unpaid")})):[]}async function Zs(){const e=await U("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),billNo:v(t,["bill_no"],""),supplierName:v(t,["counterparty_name"],""),amount:T(t,["amount"],0),issueDate:ge(t,["issue_date"],""),dueDate:ge(t,["due_date"],""),status:v(t,["status"],"holding")})):[]}async function eo(){const e=await U("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:v(t,["material_code","legacy_material_code"],""),name:v(t,["name"],""),unit:v(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),lastPurchaseDate:ge(t,["last_purchase_date"],""),unitCost:T(t,["unit_cost"],0)})):[]}const to=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],za={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Qi={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function un(e,t){const n=await U("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const o=n[0],r=v(o,["id"],""),[l,c]=await Promise.all([U("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),U("tax_deductions",{declaration_id:`eq.${r}`})]),d=l.map(y=>({taxCategory:v(y,["tax_category_code"],""),taxCategoryName:v(y,["tax_category_name"],""),alcoholDegree:T(y,["alcohol_degree"],0),volume:T(y,["taxable_volume"],0),taxRate:T(y,["tax_rate"],0),taxAmount:T(y,["tax_amount"],0),productionVolume:T(y,["production_volume"],0),previousBalance:T(y,["previous_balance"],0),currentAdjustment:T(y,["current_adjustment"],0),exportDeduction:T(y,["export_deduction"],0),sampleDeduction:T(y,["sample_deduction"],0),taxableVolume:T(y,["taxable_volume"],0)})),u=c.map(y=>({type:v(y,["deduction_type"],"sample"),categoryCode:v(y,["tax_category_code"],""),volume:T(y,["volume"],0),reason:v(y,["reason"],""),documentNo:v(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:v(o,["company_name"],""),companyNo:v(o,["company_no"],""),companyAddress:v(o,["company_address"],""),companyRepresentative:v(o,["company_representative"],""),taxOffice:v(o,["tax_office"],""),rows:d,deductions:u,totalVolume:T(o,["total_taxable_volume"],0),totalTax:T(o,["total_tax_amount"],0),status:v(o,["status"],"draft"),submittedAt:v(o,["submitted_at"],"")||null}}return{...Qi,targetYear:e,targetMonth:t}}function qe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function ao(e){const t=e.rows.map(o=>`    <Category>
      <Code>${qe(o.taxCategory)}</Code>
      <Name>${qe(o.taxCategoryName)}</Name>
      <AlcoholDegree>${o.alcoholDegree}</AlcoholDegree>
      <ProductionVolume>${o.productionVolume}</ProductionVolume>
      <PreviousBalance>${o.previousBalance}</PreviousBalance>
      <CurrentAdjustment>${o.currentAdjustment}</CurrentAdjustment>
      <ExportDeduction>${o.exportDeduction}</ExportDeduction>
      <SampleDeduction>${o.sampleDeduction}</SampleDeduction>
      <TaxableVolume>${o.taxableVolume}</TaxableVolume>
      <TaxRate>${o.taxRate}</TaxRate>
      <TaxAmount>${o.taxAmount}</TaxAmount>
    </Category>`).join(`
`),n=e.deductions.map(o=>`    <Deduction type="${qe(o.type)}">
      <CategoryCode>${qe(o.categoryCode)}</CategoryCode>
      <Volume>${o.volume}</Volume>
      <Reason>${qe(o.reason)}</Reason>${o.documentNo?`
      <DocumentNo>${qe(o.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${qe(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${qe(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${qe(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${qe(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${qe(e.taxOffice)}</TaxOffice>
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
`}function Wi(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Gi(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),o=e.rows.map(l=>[l.taxCategory,l.taxCategoryName,l.alcoholDegree,l.productionVolume,l.previousBalance,l.currentAdjustment,l.exportDeduction,l.sampleDeduction,l.taxableVolume,l.taxRate,l.taxAmount].map(Wi).join(",")),r=`,合計,,${e.rows.reduce((l,c)=>l+c.productionVolume,0)},,,${e.rows.reduce((l,c)=>l+c.exportDeduction,0)},${e.rows.reduce((l,c)=>l+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...o,r].join(`
`)+`
`}function Xi(e){const t=e.rows.map(r=>{const l=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),c=Math.round(l*r.taxRate);return{...r,taxableVolume:l,volume:l,taxAmount:c}}),n=t.reduce((r,l)=>r+l.taxableVolume,0),o=t.reduce((r,l)=>r+l.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:o}}async function Zi(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:ao(e),submitted_at:e.submittedAt})}async function mn(e,t){return(await me("get_sake_tax_by_month",{p_year:e,p_month:t})).map(o=>({sakeType:o.sake_type,alcDegree:o.alc_degree??null,volumeSaleL:Number(o.volume_sale_l)||0,volumeReturnL:Number(o.volume_return_l)||0,volumeExportL:Number(o.volume_export_l)||0,volumeNetL:Number(o.volume_net_l)||0,taxRatePerKl:o.tax_rate_per_kl!==null?Number(o.tax_rate_per_kl):null,taxAmount:Number(o.tax_amount)||0}))}async function yn(e){const t=await U("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:v(n,["id"],""),saleDate:v(n,["sale_date"],e),saleTime:v(n,["sale_time"],""),productCode:v(n,["product_code"],""),productName:v(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0),paymentMethod:v(n,["payment_method"],"cash")})):[]}async function no(){const e=await U("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:v(t,["id"],""),orderNo:v(t,["order_no"],""),orderDate:ge(t,["order_date"],""),customerName:v(t,["customer_name"],""),postalCode:v(t,["postal_code"],""),address:v(t,["shipping_address"],""),items:[],totalAmount:T(t,["total_amount"],0),status:v(t,["status"],"new"),shippingDate:ge(t,["shipping_date"],"")})):[]}async function el(e,t,n,o,r,l){const c=await Ee("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:o,status:"new",remarks:r||null});if(!c)return null;const d=c.id;for(let u=0;u<l.length;u++){const y=l[u];await Ee("store_order_lines",{order_id:d,line_no:u+1,product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit_price:y.unitPrice,amount:y.amount})}return d}async function ea(e){const t=await Ee("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function so(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function tl(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await U("print_layouts",t)).map(o=>({id:v(o,["id"],""),name:v(o,["name"],""),templateKey:v(o,["template_key"],""),positions:o.positions??{},isDefault:be(o,["is_default"],!1),note:v(o,["note"],""),updatedAt:v(o,["updated_at"],"")}))}async function al(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>te);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},o=await t("print_layouts",n);return o?{id:v(o,["id"],e.id),name:v(o,["name"],e.name),templateKey:v(o,["template_key"],e.templateKey),positions:o.positions??e.positions,isDefault:be(o,["is_default"],!1),note:v(o,["note"],""),updatedAt:v(o,["updated_at"],"")}:null}async function nl(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function sl(){return(await U("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),email:v(t,["email"],""),displayName:v(t,["display_name"],""),signature:v(t,["signature"],""),replyTo:v(t,["reply_to"],""),isDefault:be(t,["is_default"],!1),isVerified:be(t,["is_verified"],!1),note:v(t,["note"],"")}))}async function ol(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:v(n,["id"],e.id),name:v(n,["name"],e.name),email:v(n,["email"],e.email),displayName:v(n,["display_name"],""),signature:v(n,["signature"],""),replyTo:v(n,["reply_to"],""),isDefault:be(n,["is_default"],!1),isVerified:be(n,["is_verified"],!1)}:null}async function rl(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const hn={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},fn={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function il(e){const t=`${e}-01T00:00:00Z`,[n,o]=e.split("-").map(d=>parseInt(d,10)),r=new Date(n,o,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await U("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${l})`,order:"starts_at.asc"})).map(d=>({id:v(d,["id"],""),title:v(d,["title"],""),description:v(d,["description"],""),category:v(d,["category"],"general")||"general",startsAt:v(d,["starts_at"],new Date().toISOString()),endsAt:v(d,["ends_at"],""),isAllDay:be(d,["is_all_day"],!1),location:v(d,["location"],""),attendees:d.attendees??[],relatedCustomerCode:v(d,["related_customer_code"],""),relatedOrderId:v(d,["related_order_id"],""),color:v(d,["color"],""),googleEventId:v(d,["google_event_id"],"")}))}async function ll(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??fn[e.category],updated_at:new Date().toISOString()})?e:null}async function cl(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function oo(){return(await U("integration_settings",{order:"name.asc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),provider:v(t,["provider"],""),config:t.config??{},isEnabled:be(t,["is_enabled"],!1),lastSyncAt:v(t,["last_sync_at"],""),lastStatus:v(t,["last_status"],"")}))}async function Nt(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function dl(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const o=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(o,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const l=await r.json(),{supabaseInsert:c}=await N(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>te);return{supabaseInsert:u}},void 0);let d=0;for(const u of l.orders){const y=`shopify_${u.id}`;await c("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),d++}return await Nt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得成功`}),{count:d}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function pl(){return(await U("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:v(t,["id"],""),shopifyOrderId:v(t,["shopify_order_id"],""),orderNumber:v(t,["order_number"],""),orderDate:v(t,["order_date"],""),customerName:v(t,["customer_name"],""),customerEmail:v(t,["customer_email"],""),totalAmount:le(t.total_amount),financialStatus:v(t,["financial_status"],""),fulfillmentStatus:v(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function ul(e){const t=e.config.refresh_token,n=e.config.client_id,o=e.config.client_secret;if(!t||!n||!o)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:o})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const c=(await r.json()).access_token;return await Nt({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function ml(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const o=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${o}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let c=await fetch(l,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const g=await ul(e);if(g.error)return{count:0,error:g.error};t=g.token,c=await fetch(l,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const d=await c.json(),{supabaseInsert:u}=await N(async()=>{const{supabaseInsert:g}=await Promise.resolve().then(()=>te);return{supabaseInsert:g}},void 0);let y=0;for(const g of d.items){const f=`gcal_${g.id}`,x=g.start?.dateTime??g.start?.date??"",S=g.end?.dateTime??g.end?.date??"";await u("calendar_events",{id:f,title:String(g.summary??"(無題)"),description:String(g.description??""),category:"general",starts_at:String(x),ends_at:String(S),location:String(g.location??""),google_event_id:String(g.id??""),updated_at:new Date().toISOString()}),y++}return await Nt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function yl(){return(await U("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:v(t,["id"],""),receivedAt:v(t,["received_at"],""),senderPhone:v(t,["sender_phone"],""),senderName:v(t,["sender_name"],""),imageUrl:v(t,["image_url"],""),ocrStatus:v(t,["ocr_status"],"pending")||"pending",ocrText:v(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:v(t,["linked_invoice_id"],"")}))}async function hl(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const o=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(o){return{text:"",error:o instanceof Error?o.message:String(o)}}}async function fl(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const ra={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},ia={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function gl(){return(await U("user_profiles",{order:"display_name.asc"})).map(t=>({id:v(t,["id"],""),email:v(t,["email"],""),displayName:v(t,["display_name"],""),staffCode:v(t,["staff_code"],""),department:v(t,["department"],"all")||"all",role:v(t,["role"],"staff")||"staff",defaultMailSenderId:v(t,["default_mail_sender_id"],""),phone:v(t,["phone"],""),avatarUrl:v(t,["avatar_url"],""),isActive:be(t,["is_active"],!0),lastSignInAt:v(t,["last_sign_in_at"],""),createdAt:v(t,["created_at"],"")}))}async function vl(e){if(!e)return null;const t=await U("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:v(n,["id"],""),email:v(n,["email"],""),displayName:v(n,["display_name"],""),staffCode:v(n,["staff_code"],""),department:v(n,["department"],"all")||"all",role:v(n,["role"],"staff")||"staff",defaultMailSenderId:v(n,["default_mail_sender_id"],""),phone:v(n,["phone"],""),avatarUrl:v(n,["avatar_url"],""),isActive:be(n,["is_active"],!0),lastSignInAt:v(n,["last_sign_in_at"],"")}}async function bl(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function wl(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function xl(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function $l(e=100){return(await U("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),action:v(n,["action"],""),entityType:v(n,["entity_type"],""),entityId:v(n,["entity_id"],""),userEmail:v(n,["user_email"],""),changes:n.changes??{},createdAt:v(n,["created_at"],"")}))}const la={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function ro(){return(await U("slack_notifications",{order:"event_type.asc"})).map(t=>({id:v(t,["id"],""),eventType:v(t,["event_type"],"new_order"),enabled:be(t,["enabled"],!0),channel:v(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:v(t,["last_triggered_at"],"")}))}async function _l(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function Sl(e=50){return(await U("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),eventType:v(n,["event_type"],""),channel:v(n,["channel"],""),message:v(n,["message"],""),status:v(n,["status"],"sent"),error:v(n,["error"],""),sentAt:v(n,["sent_at"],"")}))}async function kl(e,t,n){const r=(await oo()).find(y=>y.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const l=r.config.webhook_url;if(!l)return{ok:!1,error:"Webhook URL未設定"};const d=(await ro()).find(y=>y.eventType===e&&y.enabled);if(!d)return{ok:!1,error:"通知ルールが無効"};const u=n??d.channel??r.config.default_channel??"#general";try{const y=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${la[e]} ${t}`,channel:u})}),g=y.ok,{supabaseInsert:f}=await N(async()=>{const{supabaseInsert:x}=await Promise.resolve().then(()=>te);return{supabaseInsert:x}},void 0);return await f("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:g?"sent":"failed",error:g?null:`HTTP ${y.status}`}),g?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const ha={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},gn={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function Pl(){return(await U("prospects",{order:"updated_at.desc"})).map(t=>({id:v(t,["id"],""),companyName:v(t,["company_name"],""),contactName:v(t,["contact_name"],""),email:v(t,["email"],""),phone:v(t,["phone"],""),address:v(t,["address"],""),website:v(t,["website"],""),businessType:v(t,["business_type"],""),stage:v(t,["stage"],"cold"),source:v(t,["source"],""),expectedAmount:le(t.expected_amount),probability:le(t.probability),assignedStaffCode:v(t,["assigned_staff_code"],""),nextActionDate:v(t,["next_action_date"],""),nextAction:v(t,["next_action"],""),note:v(t,["note"],""),lastContactAt:v(t,["last_contact_at"],""),wonAt:v(t,["won_at"],""),lostAt:v(t,["lost_at"],""),lostReason:v(t,["lost_reason"],""),convertedCustomerCode:v(t,["converted_customer_code"],""),createdAt:v(t,["created_at"],"")}))}async function io(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:v(n,["id"],e.id)}:null}async function El(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);try{const o=new URL("/rest/v1/prospects",t);return o.searchParams.set("id",`eq.${e}`),(await fetch(o.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Al(e){return(await U("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:v(n,["id"],""),prospectId:v(n,["prospect_id"],""),activityType:v(n,["activity_type"],"call"),title:v(n,["title"],""),description:v(n,["description"],""),activityDate:v(n,["activity_date"],""),result:v(n,["result"],""),staffCode:v(n,["staff_code"],"")}))}async function Ll(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const lo=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function Cl(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function Dl(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ql(){return(await ve("v_customer_map")).map(t=>({customerCode:v(t,["customer_code"],""),name:v(t,["name"],""),phone:v(t,["phone"],""),areaCode:v(t,["area_code"],""),businessType:v(t,["business_type"],""),businessTypeName:v(t,["business_type_name"],""),address1:v(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:be(t,["is_at_risk"],!1),isDormant:be(t,["is_dormant"],!1),amount12m:T(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}async function co(){return(await ve("customers",{select:"id,legacy_customer_code,name,address1",is_active:"eq.true",lat:"is.null",address1:"not.is.null",order:"name.asc"})).map(t=>({id:v(t,["id"],""),customerCode:v(t,["legacy_customer_code"],""),name:v(t,["name"],""),address1:v(t,["address1"],"")}))}async function Tl(e){try{const t=`https://nominatim.openstreetmap.org/search?format=json&countrycodes=jp&limit=1&q=${encodeURIComponent(e)}`,n=await fetch(t,{headers:{"User-Agent":"sake-system-crm/1.0"}});if(!n.ok)return null;const o=await n.json();return o.length===0?null:{lat:parseFloat(o[0].lat),lng:parseFloat(o[0].lon)}}catch{return null}}async function Il(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0),o=await co();let r=0,l=0;for(let c=0;c<o.length;c++){const d=o[c];e(c,o.length,d.name);const u=await Tl(d.address1);if(u)try{const y=new URL(`/rest/v1/customers?id=eq.${d.id}`,t);await fetch(y.toString(),{method:"PATCH",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({lat:u.lat,lng:u.lng})}),r++}catch{l++}else l++;c<o.length-1&&await new Promise(y=>setTimeout(y,1100))}return e(o.length,o.length,"完了"),{success:r,failed:l}}const fa=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function Ml(){return(await ve("customer_churn_notes")).map(t=>({customerCode:v(t,["customer_code"],""),reason:v(t,["reason"],""),memo:v(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:v(t,["updated_at"],"")}))}async function Nl(e){const{supabaseUpsert:t}=await N(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>te);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function Rl(){return(await U("delivery_locations",{order:"name.asc"})).map(t=>({id:v(t,["id"],""),customerCode:v(t,["customer_code"],""),name:v(t,["name"],""),postalCode:v(t,["postal_code"],""),address:v(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:v(t,["contact_name"],""),phone:v(t,["phone"],""),deliveryNote:v(t,["delivery_note"],""),isActive:be(t,["is_active"],!0)}))}async function Ol(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function Bl(e=50){return(await U("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),callDirection:v(n,["call_direction"],"inbound"),fromNumber:v(n,["from_number"],""),toNumber:v(n,["to_number"],""),matchedCustomerCode:v(n,["matched_customer_code"],""),matchedProspectId:v(n,["matched_prospect_id"],""),durationSeconds:le(n.duration_seconds),callStatus:v(n,["call_status"],"answered"),recordingUrl:v(n,["recording_url"],""),transcript:v(n,["transcript"],""),ivryCallId:v(n,["ivry_call_id"],""),startedAt:v(n,["started_at"],""),endedAt:v(n,["ended_at"],""),notes:v(n,["notes"],"")}))}async function po(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function jl(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const o=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(o,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const c=(await r.json()).calls??[];let d=0;for(const u of c)await po({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),d++;return await Nt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function zl(e,t){const n=e.config.api_key,o=e.config.team_id;if(!n||!o)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const l of t){if(!l.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${o}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:l.name,phone_number:l.phone,external_id:l.customerCode??"",note:l.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function Fl(){return(await U("lead_lists",{order:"created_at.desc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),query:v(t,["query"],""),area:v(t,["area"],""),businessType:v(t,["business_type"],""),totalCount:le(t.total_count),source:v(t,["source"],"manual"),createdAt:v(t,["created_at"],"")}))}async function Vl(e){return(await U("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:v(n,["id"],""),listId:v(n,["list_id"],""),companyName:v(n,["company_name"],""),address:v(n,["address"],""),phone:v(n,["phone"],""),website:v(n,["website"],""),email:v(n,["email"],""),businessType:v(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:le(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:v(n,["place_id"],""),status:v(n,["status"],"new"),convertedProspectId:v(n,["converted_prospect_id"],""),note:v(n,["note"],"")}))}async function Yl(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function uo(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function Ul(e,t,n){const o=e.config.api_key;if(!o)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),l=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${o}`;try{const c=await fetch(l);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const d=await c.json();return d.status!=="OK"&&d.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${d.status}`}:{results:d.results.map(y=>{const g=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:g?.lat,lng:g?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function Jl(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await io(t);return n&&await uo({...e,status:"imported",convertedProspectId:t.id}),n}async function Hl(){return(await U("workflow_orders",{order:"order_date.desc"})).map(t=>({id:v(t,["id"],""),orderNo:v(t,["order_no"],""),customerName:v(t,["customer_name"],""),customerCode:v(t,["customer_code"],""),orderDate:v(t,["order_date"],""),deliveryDate:v(t,["delivery_date"],""),stage:v(t,["stage"],"new"),totalAmount:le(t.total_amount),itemCount:le(t.item_count),priority:v(t,["priority"],"normal"),staffName:v(t,["staff_name"],""),notes:v(t,["notes"],"")}))}async function Kl(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function Ql(){return(await U("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),email:v(t,["email"],""),phone:v(t,["phone"],""),visitDate:v(t,["visit_date"],""),partySize:le(t.party_size)||1,language:v(t,["language"],"ja"),purpose:v(t,["purpose"],""),message:v(t,["message"],""),status:v(t,["status"],"new"),repliedAt:v(t,["replied_at"],""),confirmedTime:v(t,["confirmed_time"],""),createdAt:v(t,["created_at"],new Date().toISOString())}))}async function Wl(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const Gl=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function mo(){return(await Promise.all(Gl.map(async t=>{const[n,o]=await Promise.all([en(t.table),U(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:o[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function ta(e,t,n=100){const o=(t-1)*n,[r,l]=await Promise.all([U(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(o)}),en(e)]);return{records:r,total:l}}async function Fa(e){const t=await U("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const o=JSON.parse(n);return String(o.price_group??"")}catch{return""}return""}async function yo(e,t){if(e){const o=await U("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(o.length>0&&o[0].special_price)return le(o[0].special_price)}const n=await U("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?le(n[0].default_sale_price):0}const Xl=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Zl=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],ec={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function tc(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=Xl,o={},r={};for(const u of n){o[u.code]={};for(const y of t){const g=parseInt(y.split("-")[1])-1,f=ec[u.code]??100,x=Math.round(f*Zl[g]*(.85+Math.random()*.3));o[u.code][y]=x,r[y]=(r[y]??0)+x}}const l={},c={},d={};for(const u of n){const y=t.map(x=>o[u.code][x]??0),g=y.reduce((x,S)=>x+S,0)/y.length,f=y.reduce((x,S)=>x+(S-g)**2,0)/y.length;l[u.code]=y.reduce((x,S)=>x+S,0),c[u.code]=g,d[u.code]=Math.sqrt(f)}return{months:t,products:n,matrix:o,totals:r,productTotals:l,productAvg:c,productStdDev:d}}async function ac(e=36){const t=(()=>{const x=new Date;return x.setMonth(x.getMonth()-e),`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`})();let n=[];try{n=await ve("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"})}catch(x){console.warn("fetchDemandAnalysis: query failed, using empty",x)}if(n.length===0)return tc();const o=new Set,r=new Map,l={},c={};for(const x of n){const S=v(x,["year_month"],""),$=v(x,["product_code"],""),C=v(x,["product_name"],$),P=T(x,["quantity"],0);!S||!$||(o.add(S),r.set($,C),l[$]||(l[$]={}),l[$][S]=P,c[S]=(c[S]??0)+P)}const d=[...o].sort(),u=[...r.entries()].map(([x,S])=>({code:x,name:S})),y={},g={},f={};for(const x of u){const S=d.map(P=>l[x.code]?.[P]??0),$=S.reduce((P,E)=>P+E,0)/(S.length||1),C=S.reduce((P,E)=>P+(E-$)**2,0)/(S.length||1);y[x.code]=S.reduce((P,E)=>P+E,0),g[x.code]=$,f[x.code]=Math.sqrt(C)}return{months:d,products:u,matrix:l,totals:c,productTotals:y,productAvg:g,productStdDev:f}}async function nc(){let e=[];try{e=await U("product_safety_stock_params",{order:"product_code.asc"})}catch(t){return console.warn("fetchSafetyStockParams failed:",t),[]}return e.map(t=>({productCode:v(t,["product_code"],""),productName:v(t,["product_name"],""),unit:v(t,["unit"],"本"),avgMonthlyDemand:T(t,["avg_monthly_demand"],0),demandStdDev:T(t,["demand_std_dev"],0),leadTimeDays:T(t,["lead_time_days"],30),serviceLevel:T(t,["service_level"],.95),safetyStockQty:T(t,["safety_stock_qty"],0),reorderPoint:T(t,["reorder_point"],0),memo:v(t,["memo"],""),productionType:v(t,["production_type"],"monthly")}))}async function sc(e){return(await U("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:v(n,["id"],""),yearMonth:v(n,["year_month"],e),productCode:v(n,["product_code"],""),productName:v(n,["product_name"],""),demandForecast:T(n,["demand_forecast"],0),safetyStockTarget:T(n,["safety_stock_target"],0),openingStock:T(n,["opening_stock"],0),requiredProduction:T(n,["required_production"],0),plannedQty:T(n,["planned_qty"],0),actualQty:T(n,["actual_qty"],0),status:v(n,["status"],"draft"),productionType:v(n,["production_type"],"monthly"),notes:v(n,["notes"],"")}))}async function oc(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const o=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),l=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(o)});if(!l.ok){const c=await l.text();return console.error("saveSafetyStockParamsBulk failed:",l.status,c),!1}return!0}catch(o){return console.error("saveSafetyStockParamsBulk error:",o),!1}}async function rc(e){const{supabaseUpsert:t}=await N(async()=>{const{supabaseUpsert:o}=await Promise.resolve().then(()=>te);return{supabaseUpsert:o}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function ic(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}function xa(e,t,n){t>0&&n>0&&(e[t]=(e[t]||0)+n)}function Mn(e){return Object.entries(e).map(([t,n])=>({volumeMl:Number(t),label:Number(t)>=1e3?`${Number(t)}ml`:`${Number(t)}ml`,bottles:Number(n)})).sort((t,n)=>t.volumeMl-n.volumeMl)}async function lc(e){const[t,n]=e.split("-").map(Number),o=`${e}-01`,r=new Date(t,n,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}`,c=await ve("sales_document_headers",{select:"document_no,legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${o},sales_date.lte.${l})`,order:"sales_date.asc"}),d=await ve("sales_document_lines",{select:"document_no,legacy_product_code,quantity",note:`like.*date:${e}*`,order:"document_no"}),u=await ve("products",{select:"legacy_product_code,volume_ml"}),y={};for(const C of u)C.legacy_product_code&&C.volume_ml&&(y[C.legacy_product_code]=C.volume_ml);const g={};for(const C of d){const P=C.document_no,E=y[C.legacy_product_code]||0;E>0&&C.quantity>0&&(g[P]||(g[P]={}),xa(g[P],E,C.quantity))}const f=await ve("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),x={};for(const C of f)C.address1&&(x[C.legacy_customer_code]=ic(C.address1));const S={};for(const C of c){const P=C.sales_date;if(!P)continue;const E=C.legacy_customer_code||"",s=`${P}|${E}`,i=C.document_no||C.legacy_document_no||"";S[s]||(S[s]={date:P,custCode:E,custName:C.customer_name||"",city:x[E]||"住所未登録",amount:0,invoiceCount:0,volumes:{}}),S[s].amount+=Number(C.total_amount)||0,S[s].invoiceCount++;const p=g[i];if(p)for(const[m,h]of Object.entries(p))xa(S[s].volumes,Number(m),Number(h))}const $={};for(const C of Object.values(S)){$[C.date]||($[C.date]={date:C.date,entries:[],cityGroups:[],totalAmount:0,count:0,totalVolumes:[]});const P=$[C.date];P.entries.push({customerCode:C.custCode,customerName:C.custName,city:C.city,amount:C.amount,invoiceCount:C.invoiceCount,volumes:Mn(C.volumes)}),P.totalAmount+=C.amount,P.count+=C.invoiceCount}for(const C of Object.values($)){const P={},E={};for(const s of C.entries){P[s.city]=(P[s.city]||0)+1;for(const i of s.volumes)xa(E,i.volumeMl,i.bottles)}C.cityGroups=Object.entries(P).sort((s,i)=>i[1]-s[1]).map(([s,i])=>({city:s,count:i})),C.totalVolumes=Mn(E)}return $}async function ca(){return U("quotes",{select:"id,quote_no,quote_date,valid_until,legacy_customer_code,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function ho(e){const t=await U("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await U("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function cc(){const e=new Date().toISOString().slice(0,7)+"-01";return ve("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}async function da(){const e=await U("app_feature_status",{select:"*"}),t={};for(const n of e)t[n.feature_id]={featureId:n.feature_id,confirmedAt:n.confirmed_at,confirmedBy:n.confirmed_by,notes:n.notes};return t}async function fo(e,t){await gt("app_feature_status",{feature_id:e,confirmed_at:new Date().toISOString(),confirmed_by:t,updated_at:new Date().toISOString()})}async function go(e){await gt("app_feature_status",{feature_id:e,confirmed_at:null,confirmed_by:null,updated_at:new Date().toISOString()})}const Le={soumu:"総務",route_sales:"ルートセールス",brewing:"造り",bottling:"詰口",labeling:"貼場",delivery:"配送（業務委託）"},dc={soumu:null,route_sales:null,brewing:[9,10,11,12,1,2,3,4],bottling:null,labeling:null,delivery:null},vn={billing:"請求業務",inventory:"棚卸"},bn={morning:"午前",afternoon:"午後",both:"終日"};async function wn(){return(await U("staff_members",{order:"department.asc,employment_type.asc,kana.asc"})??[]).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),kana:v(t,["kana"],""),employmentType:v(t,["employment_type"],"part_time"),department:v(t,["department"],"bottling"),hourlyRate:t.hourly_rate!=null?Number(t.hourly_rate):null,monthlySalary:t.monthly_salary!=null?Number(t.monthly_salary):null,contractFee:t.contract_fee!=null?Number(t.contract_fee):null,workHoursPerDay:T(t,["work_hours_per_day"],8),shiftPreference:t.shift_preference??null,monthlyTasks:Array.isArray(t.monthly_tasks)?t.monthly_tasks:[],availableMonths:Array.isArray(t.available_months)?t.available_months:null,crossDepartments:Array.isArray(t.cross_departments)?t.cross_departments:[],notes:v(t,["notes"],""),isActive:t.is_active!==!1}))}async function vo(e){const t={name:e.name,kana:e.kana??null,employment_type:e.employmentType??"part_time",department:e.department??"bottling",hourly_rate:e.hourlyRate??null,monthly_salary:e.monthlySalary??null,contract_fee:e.contractFee??null,work_hours_per_day:e.workHoursPerDay??8,shift_preference:e.shiftPreference??null,monthly_tasks:e.monthlyTasks??[],available_months:e.availableMonths??null,cross_departments:e.crossDepartments??[],notes:e.notes??null,is_active:e.isActive??!0,updated_at:new Date().toISOString()};return e.id&&(t.id=e.id),!!await gt("staff_members",t)}async function bo(e){return tn("staff_members",e)}async function wo(e){const[t,n]=e.split("-").map(Number),o=q=>String(q).padStart(2,"0");function r(q,I){const B=I===12?1:I+1,O=I===12?q+1:q;return{startDate:`${q}-${o(I)}-01`,endDate:`${O}-${o(B)}-01`}}let l=0;const c=new Date(t,n-1,1);for(;c.getMonth()===n-1;){const q=c.getDay();q!==0&&q!==6&&l++,c.setDate(c.getDate()+1)}const{startDate:d,endDate:u}=r(t,n),{startDate:y,endDate:g}=r(t-1,n),f=`(sales_date.gte.${d},sales_date.lt.${u})`,x=`(sales_date.gte.${y},sales_date.lt.${g})`,[S,$,C,P,E,s]=await Promise.all([U("daily_sales_fact",{select:"document_count",and:f}),U("sales_document_headers",{select:"total_amount",and:f,customer_name:"ilike.*上様*"}),U("sales_document_headers",{select:"total_amount",and:f}),U("daily_sales_fact",{select:"document_count",and:x}),U("sales_document_headers",{select:"total_amount",and:x}),U("sales_document_headers",{select:"total_amount",and:x,customer_name:"ilike.*上様*"})]),i=S.reduce((q,I)=>q+T(I,["document_count"],0),0),p=$.length,m=$.reduce((q,I)=>q+T(I,["total_amount"],0),0),h=C.reduce((q,I)=>q+T(I,["total_amount"],0),0),b=Math.max(0,h-m),_=P.reduce((q,I)=>q+T(I,["document_count"],0),0),w=s.reduce((q,I)=>q+T(I,["total_amount"],0),0),k=E.reduce((q,I)=>q+T(I,["total_amount"],0),0),D=Math.max(0,k-w),L=Math.max(0,E.length-s.length);return{monthlyDocumentCount:i,directSalesCount:p,directSalesAmount:m,routeSalesAmount:b,workingDays:l,prevYearDocumentCount:_,prevYearRouteSalesAmount:D,prevYearRouteDocCount:L}}async function xo(e){const[t,n]=e.split("-").map(Number),o=y=>String(y).padStart(2,"0"),r=`${t}-${o(n)}-01`,l=n===12?1:n+1,d=`${n===12?t+1:t}-${o(l)}-01`;return(await U("daily_shift_plans",{select:"id,plan_date,department,staff_member_ids,notes",and:`(plan_date.gte.${r},plan_date.lt.${d})`,order:"plan_date.asc,department.asc"})).map(y=>({id:v(y,["id"],void 0),planDate:v(y,["plan_date"],""),department:v(y,["department"],"soumu"),staffMemberIds:y.staff_member_ids??[],notes:v(y,["notes"],"")}))}async function $o(e,t){const[n,o]=e.split("-").map(Number),r=y=>String(y).padStart(2,"0"),l=`${n}-${r(o)}-01`,c=o===12?1:o+1,u=`${o===12?n+1:n}-${r(c)}-01`;try{const y=new URL("/rest/v1/daily_shift_plans",fe);if(y.searchParams.set("and",`(plan_date.gte.${l},plan_date.lt.${u})`),await fetch(y.toString(),{method:"DELETE",headers:{apikey:se,Authorization:`Bearer ${se}`}}),t.length===0)return!0;const g=t.map(S=>({plan_date:S.planDate,department:S.department,staff_member_ids:S.staffMemberIds,notes:S.notes||null})),f=new URL("/rest/v1/daily_shift_plans",fe);return(await fetch(f.toString(),{method:"POST",headers:{apikey:se,Authorization:`Bearer ${se}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(g)})).ok}catch(y){return console.error("saveDailyShiftPlans failed",y),!1}}const z=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:fn,CALENDAR_CATEGORY_LABELS:hn,CHURN_REASONS:fa,DEPT_LABEL:Le,DEPT_LABELS:ia,DEPT_MONTHS:dc,INVOICE_TYPE_LABELS:Ba,JIKOMI_STATUS_LABELS:Js,MATERIAL_CATEGORIES:lo,MONTHLY_TASK_LABEL:vn,PROSPECT_STAGE_COLORS:gn,PROSPECT_STAGE_LABELS:ha,ROLE_LABELS:ra,SEASONAL_TEMPLATES:nn,SHIFT_PREF_LABEL:bn,SLACK_EVENT_LABELS:la,TAX_DEDUCTION_LABELS:za,TAX_RATE_CATEGORIES:to,abcPeriodToDates:pn,addBrewingCustomCategory:Li,addBrewingStockEntry:ki,addRiceVariety:xi,addTank:ci,autoScheduleAllBatches:ui,batchGeocode:Il,calcWeeklyLabor:fi,confirmFeature:fo,convertLeadToProspect:Jl,createBrewingBatch:oi,deleteBrewingCustomCategory:Di,deleteBrewingStockEntry:Ei,deleteCalendarEvent:cl,deleteMailSender:rl,deleteMaterial:Dl,deletePrintLayout:nl,deleteProspect:El,deleteRicePurchaseCommitment:bi,deleteRiceVariety:$i,deleteStaffMember:bo,deleteTank:di,deleteUserProfile:wl,fetchAllBrewingStockEntries:Si,fetchAnalyticsByPeriod:Sr,fetchAnnouncements:zi,fetchAuditLogs:$l,fetchAvailablePeriods:kr,fetchAvailableProductionTypes:Vr,fetchBillList:Zs,fetchBillingSummary:cn,fetchBrewingAlcoholSettings:Yr,fetchBrewingBatches:ei,fetchBrewingCategoryOverrides:Ti,fetchBrewingCustomCategories:Ai,fetchBrewingForecastOverrides:Hr,fetchBrewingMonthlyTrend:Mr,fetchBrewingPlanSummary:Ir,fetchBrewingProcessSteps:ti,fetchBrewingProductDetail:Nr,fetchBrewingRiceParams:Qr,fetchBrewingSchedule:Rr,fetchBrewingSeasonalPattern:Gr,fetchBrewingStockEntries:_i,fetchBrewingYearlyShipments:Jr,fetchCalendarEvents:il,fetchCallLogs:Bl,fetchCategoryTypeLinks:jr,fetchChurnAlerts:Fi,fetchChurnNotes:Ml,fetchCustomerAnalysis:Vs,fetchCustomerEfficiency:Ki,fetchCustomerEfficiencyByYear:ut,fetchCustomerLedger:on,fetchCustomerPriceGroup:Fa,fetchCustomerPricing:ja,fetchCustomerProductBreakdown:Dr,fetchCustomersWithoutGeo:co,fetchDailyShiftPlans:xo,fetchDeliveryLocations:Rl,fetchDeliveryNote:ln,fetchDeliverySchedule:ji,fetchDemandAnalysis:ac,fetchDemandForecasts:Bi,fetchEntityMonthlySales:Tr,fetchFaxInbox:yl,fetchFeatureStatuses:da,fetchIntegrationSettings:oo,fetchInvoiceLines:Oa,fetchInvoices:Tt,fetchJikomiList:Hs,fetchKenteiList:Qs,fetchLabelExclusions:Ii,fetchLeadItems:Vl,fetchLeadLists:Fl,fetchMailSenders:sl,fetchMapCustomers:ql,fetchMasterStats:sn,fetchMaterialList:Ws,fetchMyProfile:vl,fetchOrderHeaders:cc,fetchPayableList:Xs,fetchPaymentStatus:Ds,fetchPeriodChartData:Lr,fetchPipelineMeta:qs,fetchPrintLayouts:tl,fetchProcurementDecisions:Xr,fetchProductABC:Ys,fetchProductCustomerBreakdown:qr,fetchProductDaily:Hi,fetchProductMonthlyShipments:Oi,fetchProductPower:Ji,fetchProductPrice:yo,fetchProductShipmentsFromTable:Ui,fetchProductionPlan:sc,fetchProspectActivities:Al,fetchProspects:Pl,fetchPurchaseList:Gs,fetchQuoteList:ca,fetchQuoteWithLines:ho,fetchRawMaterialStock:eo,fetchRawRecords:ta,fetchRawTableList:mo,fetchRicePurchaseCommitments:gi,fetchRiceVarieties:wi,fetchSafetyStockParams:nc,fetchSakeTaxByMonth:mn,fetchSalesAnalytics:rn,fetchSalesReport:Bs,fetchSalesSummary:Cs,fetchSeasonalProfiles:Yi,fetchShipmentCalendar:lc,fetchShopifyOrders:pl,fetchSlackLogs:Sl,fetchSlackRules:ro,fetchStaffCustomerBreakdown:Er,fetchStaffMembers:wn,fetchStaffProductBreakdown:Ar,fetchStaffTotalsByPeriod:Pr,fetchStepLabor:hi,fetchStoreOrders:no,fetchStoreSales:yn,fetchSyncDashboard:Ts,fetchSystemHealth:Is,fetchSystemSetting:Ls,fetchTankList:Ks,fetchTanks:li,fetchTaxDeclaration:un,fetchTourInquiriesFromDb:Ql,fetchTypesInCategory:Ci,fetchUserProfiles:gl,fetchVisitPriorities:Vi,fetchWorkerSettings:mi,fetchWorkflowOrdersFromDb:Hl,fetchWorkforceMetrics:wo,generateTaxCSV:Gi,generateTaxXML:ao,getTankOccupancy:pi,linkTypeToCategory:zr,ocrFaxImage:hl,periodToDateRange:Ns,preloadInvoiceLines:Ms,prevYearFilter:Cr,reassignBrewingStockEntry:Pi,recalculateTaxDeclaration:Xi,recordAudit:xl,resolveProductPrice:dn,saveBrewingAlcoholSetting:Ur,saveBrewingForecastOverride:Kr,saveBrewingRiceParams:Wr,saveBrewingSchedule:Or,saveCalendarEvent:ll,saveCallLog:po,saveChurnNote:Nl,saveDailyShiftPlans:$o,saveDeliveryLocation:Ol,saveEmailCampaign:ea,saveFaxRecord:fl,saveIntegrationSetting:Nt,saveInvoice:Os,saveLabelExclusions:Mi,saveLeadItem:uo,saveLeadList:Yl,saveMailSender:ol,saveMaterial:Cl,savePrintLayout:al,saveProcurementDecision:Zr,saveProductionPlan:rc,saveProspect:io,saveProspectActivity:Ll,saveRicePurchaseCommitment:vi,saveSafetyStockParamsBulk:oc,saveSlackRule:_l,saveStoreOrder:el,saveTaxDeclaration:Zi,saveTourInquiry:Wl,saveUserProfile:bl,saveWorkerSettings:yi,saveWorkflowOrder:Kl,searchPlaces:Ul,sendEmailCampaign:so,sendSlackNotification:kl,setBrewingCategoryOverride:qi,submitFeatureRequest:js,syncGoogleCalendar:ml,syncIvryCallLogs:jl,syncPhoneBookToIvry:zl,syncShopifyOrders:dl,unconfirmFeature:go,unlinkTypeFromCategory:Fr,updateBrewingBatch:ii,updateBrewingProcessStep:ri,updateCustomer:zs,updateProduct:Fs,upsertBrewingStock:Br,upsertStaffMember:vo,upsertSystemSetting:dt},Symbol.toStringTag,{value:"Module"}));function ot(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const pc={open:"未締め",closed:"締め済"};function uc(e,t){const n=e.customers.map(o=>`
      <tr>
        <td>
          <div class="table-title">${o.customerName}</div>
          <div class="table-sub mono">${o.customerCode}</div>
        </td>
        <td class="numeric">${o.closingDay}日</td>
        <td class="numeric">${ot(o.salesAmount)}</td>
        <td class="numeric">${ot(o.taxAmount)}</td>
        <td class="numeric">${ot(o.prevBalance)}</td>
        <td class="numeric">${ot(o.paymentAmount)}</td>
        <td class="numeric"><strong>${ot(o.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${o.status==="closed"?"success":"warning"}">${pc[o.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="billing-print" data-code="${o.customerCode}" ${o.status==="closed"?"":"disabled"}>請求書</button>
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
            ${[10,15,20,25,31].map(o=>`<option value="${o}" ${e.closingDay===o?"selected":""}>${o}日締め</option>`).join("")}
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
        <p class="kpi-value">${ot(e.totalBilling)}</p>
        <p class="kpi-sub">${e.targetYearMonth} / ${e.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${e.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${e.customers.filter(o=>o.status==="closed").length} 社</p>
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
  `}const mc={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},yc={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Nn(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Bt(e){const t=yc[e],n=mc[e].map(o=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Nn(o.title)}</p>
            <p class="category-card-description">${Nn(o.description)}</p>
          </div>
          <div class="category-card-actions">
            <button class="button secondary" type="button" data-link="${o.path}">
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
  `}function _o(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function At(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function hc(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${_o(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${At(t.amount)}</td>
        </tr>
      `).join("")}function fc(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${_o(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${At(t.amount)}</td>
        </tr>
      `).join("")}function gc(e,t){return`
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
            <dd>${At(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${At(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${At(e.balanceAmount)}</dd>
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
            <tbody>${hc(e)}</tbody>
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
            <tbody>${fc(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function vt(e,t,n){const o=e.findIndex(l=>l.column===t);if(o>=0){if(e[o].direction==="asc"){const c=[...e];return c[o]={column:t,direction:"desc"},c}return e.filter((c,d)=>d!==o)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function vc(e,t){const n=e.findIndex(l=>l.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const o=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${o}${r}</span>`}function ae(e,t,n,o=""){return`<th class="sortable ${o}" data-sort-col="${e}">${t} ${vc(n,e)}</th>`}function Rn(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function ht(e,t,n){return t.length===0?e:[...e].sort((o,r)=>{for(const{column:l,direction:c}of t){const d=n[l];if(!d)continue;const u=Rn(o[d]),y=Rn(r[d]);let g=0;if(typeof u=="number"&&typeof y=="number"?g=u-y:g=String(u).localeCompare(String(y),"ja"),g!==0)return c==="asc"?g:-g}return 0})}const bc={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},On={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},bt={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function wc(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function xc(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function $c(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function So(e,t){const n=xc(t),o=$c(t),[r,l]=t.split("-").map(Number),c=new Map;e.forEach(p=>{if(p.date.slice(0,7)===t){const m=p.date.slice(0,10);c.has(m)||c.set(m,[]),c.get(m).push(p)}});const d=e.filter(p=>p.date.slice(0,7)===t),u=d.reduce((p,m)=>p+m.quantity,0),y=new Set(d.map(p=>p.date)).size,g=new Date().toISOString().slice(0,10),f=["日","月","火","水","木","金","土"].map(p=>`<th class="dcal-header">${p}</th>`).join("");let x="",S=1;for(let p=0;p<6&&!(S>n&&p>0);p++){x+="<tr>";for(let m=0;m<7;m++)if(p===0&&m<o||S>n)x+='<td class="dcal-cell dcal-empty"></td>';else{const h=`${r}-${String(l).padStart(2,"0")}-${String(S).padStart(2,"0")}`,b=c.get(h)||[],_=h===g,w=b.reduce((k,D)=>k+D.quantity,0);x+=`
          <td class="dcal-cell ${_?"dcal-today":""}">
            <div class="dcal-day">${S}</div>
            ${b.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${b[0].status}">${b.length}件 ${w}本</div>
              </div>
            `:""}
          </td>`,S++}x+="</tr>"}const[$,C]=l===1?[r-1,12]:[r,l-1],[P,E]=l===12?[r+1,1]:[r,l+1],s=`${$}-${String(C).padStart(2,"0")}`,i=`${P}-${String(E).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${l}月: ${y}日稼働 / ${d.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${s}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${l}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${i}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${f}</tr></thead>
        <tbody>${x}</tbody>
      </table>
    </section>
  `}function _c(e,t){const n=t==="all"?e:e.filter(d=>d.segment===t),o={all:e.length};e.forEach(d=>{o[d.segment]=(o[d.segment]??0)+1});const l=["all",...[...new Set(e.map(d=>d.segment))]].map(d=>`
      <button class="button ${t===d?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${d}">
        ${d==="all"?"全て":On[d]??d} (${o[d]??0})
      </button>
    `).join(""),c=n.map(d=>`
      <tr>
        <td class="mono">${d.code}</td>
        <td>${d.name}</td>
        <td><span class="segment-badge" style="background:${bt[d.segment]??"#718096"};">${On[d.segment]??d.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${bt.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${bt["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${bt["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${bt["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
          </ul>
        </div>
      </div>

      <div class="button-group" style="margin-bottom:12px;">${l}</div>

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
  `}function Sc(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${So(e.deliveries,e.calendarMonth)}
    ${_c(e.forecasts,e.selectedSegment)}
  `}function kc(e,t){return So(e,t)}const jt={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function Bn(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function $a(e,t,n){if(t==="all")return e;const o=new Date,r=o.toISOString().slice(0,10),l=new Date(o);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===r);case"month":return e.filter(c=>c.date.slice(0,7)===r.slice(0,7));case"future":{const c=new Date(o.getFullYear(),o.getMonth(),1).toISOString().slice(0,10);return e.filter(d=>d.date.slice(0,10)>=c)}case"90days":return l.setDate(l.getDate()-90),e.filter(c=>c.date>=l.toISOString());case"year":return l.setFullYear(l.getFullYear()-1),e.filter(c=>c.date>=l.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const d=c.date.slice(0,10);return d>=n.start&&d<=n.end})}}function Pe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _a(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Pc(e){const o={top:20,right:20,bottom:30,left:50},r=760-o.left-o.right,l=260-o.top-o.bottom,c=Math.max(...e.map(g=>g.amount),1),d=r/e.length,u=e.map((g,f)=>{const x=g.amount/c*l,S=o.left+f*d+4,$=o.top+l-x,C=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(g.date));return`
        <g>
          <rect x="${S}" y="${$}" width="${Math.max(d-8,8)}" height="${x}" rx="4" fill="#0F5B8D" opacity="${.58+f/e.length*.34}" />
          ${f%5===0?`<text x="${S+6}" y="252" class="chart-axis">${C}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(g=>{const f=o.top+l-l*g,x=Math.round(c*g/1e3);return`
        <g>
          <line x1="${o.left}" y1="${f}" x2="${760-o.right}" y2="${f}" class="chart-grid" />
          <text x="6" y="${f+4}" class="chart-axis">${x.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function Ec(e,t,n,o,r="month",l,c=[]){const d={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=$a(e.allDailySales,r,l),y=u.reduce((j,Y)=>j+Y.amount,0),g=u.reduce((j,Y)=>j+Y.bottles,0),f=u.reduce((j,Y)=>j+Y.volumeMl,0),x=u.length,S=g>0?Math.round(y/g):0,$=f>0?Math.round(y/(f/1e3)):0,C=new Date,P=C.toISOString().slice(0,10),E=P.slice(0,7),s=$a(e.allDailySales,"month").filter(j=>j.date.slice(0,10)<=P),i=s.reduce((j,Y)=>j+Y.amount,0);s.reduce((j,Y)=>j+Y.bottles,0);const p=C.getDate();new Date(C.getFullYear(),C.getMonth()+1,0).getDate();const h=(o?.orderHeaders??[]).filter(j=>j.sales_date.slice(0,7)===E),b=h.reduce((j,Y)=>j+Number(Y.total_amount),0),_=h.length,w=$a(e.allDailySales,"month"),k=w.reduce((j,Y)=>j+Y.bottles,0),D=b>0?b:w.reduce((j,Y)=>j+Y.amount,0),L=b>0?"orders":"extrapolation",I=(u.length>0?e.allDailySales.filter(j=>{const Y=u[0]?.date??"",J=u[u.length-1]?.date??"",W=Bn(Y,-1),Q=Bn(J,-1);return j.date>=W&&j.date<=Q}):[]).reduce((j,Y)=>j+Y.amount,0),B=I>0?(y-I)/I*100:0,O=B>0?"+":"",R=e.salesRecords.slice(0,10).map(j=>`
            <tr class="clickable-row" data-doc-no="${j.documentNo}" style="cursor:pointer">
              <td class="mono">${j.documentNo}</td>
              <td>${_a(j.date)}</td>
              <td>${j.customerName}</td>
              <td class="numeric">${Pe(j.amount)}</td>
            </tr>
          `).join(""),M=["today","month","future","90days","year","all"].map(j=>`<button class="button ${j===r?"primary":"secondary"} small" type="button" data-period="${j}">${jt[j]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${d[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${_a(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${M}</div>
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
        <p class="kpi-value">${Pe(e.kpis.todaySales)}</p>
        <p class="kpi-sub">${e.kpis.todaySales>0?`${new Date().getMonth()+1}/${new Date().getDate()} 時点`:"本日データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月実績（本日まで）</p>
        <p class="kpi-value">${Pe(i)}</p>
        <p class="kpi-sub">${p}日経過 / ${s.length}営業日 / 日平均 ${s.length>0?Pe(Math.round(i/s.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${Pe(D)}</p>
        <p class="kpi-sub">${L==="orders"?`受注確定 ${_}件`:`出荷見込 ${k.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${B>=0?"#2f855a":"#c53d3d"}">${I>0?`${O}${B.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${I>0?Pe(I):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${Pe(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${r!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${jt[r]}売上</p>
        <p class="kpi-value">${Pe(y)}</p>
        <p class="kpi-sub">${x}日間${x>0?` / 日平均 ${Pe(Math.round(y/x))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${g.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${Pe(S)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(f/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${Pe($)}</p>
      </article>
    </section>

    ${o?.masterCounts?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先マスタ</p>
        <p class="kpi-value">${o.masterCounts.customers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品マスタ</p>
        <p class="kpi-value">${o.masterCounts.products.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">仕入先</p>
        <p class="kpi-value">${o.masterCounts.suppliers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
    </section>
    `:""}

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">${jt[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${Pc(u.length>0?u:e.dailySales)}
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
              <dd>${_a(t.lastSyncAt)}</dd>
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
          <tbody>${R}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${jt[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ae("date","日付",c)}
              ${ae("amount","売上",c,"numeric")}
              ${ae("bottles","本数",c,"numeric")}
              ${ae("volumeMl","液体量(L)",c,"numeric")}
              ${ae("pricePerBottle","本単価",c,"numeric")}
              ${ae("pricePerLiter","L単価",c,"numeric")}
            </tr>
          </thead>
          <tbody>${ht(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(j=>`
            <tr>
              <td class="mono">${j.date.slice(0,10)}</td>
              <td class="numeric">${Pe(j.amount)}</td>
              <td class="numeric">${j.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(j.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${Pe(j.pricePerBottle)}</td>
              <td class="numeric">${Pe(j.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${o?Ac(o):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function Ac(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(d=>d.startsAt.slice(0,10)>=t).slice(0,5),o=e.tourInquiries.filter(d=>d.status==="new").length,r=e.churnSummary,l=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,c=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
        <p class="panel-title">🔴 要対応顧客</p>
        <p class="kpi-value">${l}社</p>
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
      <article class="panel kpi-card ${o>0?"kpi-alert":""}">
        <p class="panel-title">未対応問合せ</p>
        <p class="kpi-value">${o}件</p>
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

    ${e.deliveries&&e.deliveries.length>0?kc(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?Lc(e.orderHeaders):""}
  `}function Lc(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),o=new Date().toISOString().slice(0,10),r=o.slice(0,7),l=new Map;for(const f of e){const x=f.sales_date.slice(0,7),S=l.get(x)??{count:0,total:0};l.set(x,{count:S.count+1,total:S.total+Number(f.total_amount)})}const c=[...l.keys()].sort(),d=e.reduce((f,x)=>f+Number(x.total_amount),0),u=c.map(f=>{const{count:x,total:S}=l.get(f);return`<tr>
      <td class="mono" style="font-weight:700;">${f===r?`${f}（当月）`:f}</td>
      <td class="numeric">${x.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(S)}</td>
    </tr>`}).join(""),y=e.filter(f=>f.sales_date>=o).slice(0,30),g=y.map(f=>`<tr>
    <td class="mono">${f.sales_date}</td>
    <td>${f.customer_name||"―"}</td>
    <td class="numeric">${t.format(Number(f.total_amount))}</td>
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
          <tbody>${g}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function Cc(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function rt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Dc(e,t){const n=e.lines.length?e.lines.map((r,l)=>`
          <tr>
            <td class="numeric">${l+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${rt(r.unitPrice)}</td>
            <td class="numeric">${rt(r.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',o=e.totalAmount-e.taxAmount;return`
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
            <tr><th>納品日</th><td>${Cc(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${rt(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${rt(o)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${rt(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${rt(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function Ie(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function qc(e){return Ie(e).replaceAll(`
`,"<br />")}function Tc(e){const n=[...Object.values(nn),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${Ie(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),o=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${Ie(r.name)}</span>
              <span class="table-sub">${Ie(r.email)} / ${Ie(r.area)}</span>
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
          ${o}
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
          <input id="email-subject" type="text" value="${Ie(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${Ie(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${Ie(r.name)} &lt;${Ie(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${Ie(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?qc(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${Ie(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function Te(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function zt(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function Ic(e,t){const n=[zt("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Te(r.name)}</strong>
            <span class="table-sub mono">${Te(r.code)}</span>
          </button>
        `)),zt("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Te(r.name)}</strong>
            <span class="table-sub mono">${Te(r.code)}</span>
          </button>
        `)),zt("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${Te(r.documentNo)}</strong>
            <span class="table-sub">${Te(r.customerName)} / ${Te(r.date)}</span>
          </button>
        `)),zt("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${Te(r.path)}"
          >
            <strong>${Te(r.title)}</strong>
            <span class="table-sub mono">${Te(r.path)}</span>
          </button>
        `))].filter(Boolean).join(""),o=e.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
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
            value="${Te(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||o}
          </div>
        </div>
      </div>
    </div>
  `}function wt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ko(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${wt(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${wt(e.title)}">
        <div class="modal-header">
          <h2>${wt(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${wt(e.placeholder)}"
            value="${wt(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function Ft(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function jn(e){return e.trim().toLowerCase()}function Mc(e,t){const n=jn(t),o=e.filter(l=>n?[l.code,l.name,l.name].map(jn).some(c=>c.includes(n)):!0).slice(0,50),r=o.length?`
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
              ${o.map(l=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Ft(l.code)}"
                      data-name="${Ft(l.name)}"
                    >
                      <td class="mono">${Ft(l.code)}</td>
                      <td>${Ft(l.name)}</td>
                      <td>${l.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return ko({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function Nc(e){return e.toISOString().slice(0,10)}function Ze(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function He(e,t){return e[t]?`<div class="field-error">${Ze(e[t])}</div>`:""}function it(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function Rc(e,t,n,o){const r=Object.keys(Ba).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${Ba[u]}</option>`).join(""),l=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${it(o,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Ze(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${He(o,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${it(o,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Ze(u.productName)}" placeholder="商品名" />
          ${He(o,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${it(o,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${He(o,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${it(o,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${He(o,`lines.${y}.unitPrice`)}
        </td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${y}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${y}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),c=e.lines.reduce((u,y)=>u+y.amount,0),d=Math.floor(c*10/110);return`
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
          <input class="${it(o,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Nc(new Date)}" />
          ${He(o,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${it(o,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Ze(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${He(o,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${Ze(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${Ze(e.staffCode)}" />
        </label>
      </div>
      ${He(o,"lines")}
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
          <tbody id="invoice-lines">${l||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Ze(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function Oc(e){return"¥"+e.toLocaleString("ja-JP")}function Bc(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const jc={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},zc={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},Fc={sake:"酒販用",standard:"通常"};function Vc(e,t,n="",o=""){const r=n?e.filter(u=>u.legacy_customer_code===n):e,l=8,c=t?`<tr><td colspan="${l}" class="empty-row">読み込み中…</td></tr>`:r.length===0?`<tr><td colspan="${l}" class="empty-row">見積書がありません</td></tr>`:r.map(u=>`
      <tr>
        <td class="mono">${u.quote_no}</td>
        <td>${Bc(u.quote_date)}</td>
        <td>${u.customer_name||"（未選択）"}</td>
        <td>${u.subject||""}</td>
        <td class="numeric">${Oc(u.total_amount)}</td>
        <td><span class="badge ${zc[u.status]??"badge-gray"}">${jc[u.status]??u.status}</span></td>
        <td>${Fc[u.template_type]??u.template_type}</td>
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
        <span style="font-size:13px;color:var(--primary,#3b82f6);font-weight:600;">🔍 ${o||n} の見積のみ表示中</span>
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
  `}const Po="kanei-quote-settings",Eo=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],aa={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Va(){try{const e=localStorage.getItem(Po);if(e)return{...aa,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...aa,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...aa}}function et(e){localStorage.setItem(Po,JSON.stringify(e))}function Re(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Se(e,t,n,o="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${o}" id="${e}" value="${Re(n)}" placeholder="${Re(r)}" /></div>`}function Yc(e,t,n,o){const r=o.map(l=>`<option value="${Re(l)}" ${n===l?"selected":""}>${Re(l)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function Uc(e){return`
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
        ${Se("qs-company-name","会社名",e.companyName)}
        ${Se("qs-company-postal","郵便番号",e.companyPostal,"text","257-0014")}
        ${Se("qs-company-addr1","住所1",e.companyAddress1)}
        ${Se("qs-company-addr2","住所2",e.companyAddress2,"text","建物名等")}
        ${Se("qs-company-tel","電話番号",e.companyTel)}
        ${Se("qs-company-fax","FAX番号",e.companyFax)}
        ${Se("qs-company-email","メール",e.companyEmail,"email")}
        ${Se("qs-company-regno","適格請求書番号",e.companyRegistrationNo,"text","T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>振込口座</h2></div>
      <div class="form-grid-2">
        ${Se("qs-bank-name","銀行名",e.bankName,"text","横浜銀行")}
        ${Se("qs-bank-branch","支店名",e.bankBranch,"text","秦野支店")}
        ${Yc("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
        ${Se("qs-bank-no","口座番号",e.bankAccountNo,"text","1234567")}
        ${Se("qs-bank-holder","口座名義（カナ）",e.bankAccountHolder,"text","カ）カナイシュゾウテン")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${Se("qs-payment-terms","支払条件",e.defaultPaymentTerms,"text","月末締め翌月末払い")}
        ${Se("qs-header-note","書類上部メモ",e.defaultHeaderNote,"text","下記のとおりお見積り申し上げます。")}
        ${Se("qs-footer-note","書類下部メモ",e.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${Eo.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${Re(t.value)}"
            title="${Re(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${Re(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${Re(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${Re(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${Re(e.accentColor||"#0968e5")}</code>
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
  `}function Jc(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function pa(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:Jc(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}pa();function Z(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ce(e){return"¥"+e.toLocaleString("ja-JP")}function zn(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Ao(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Lo(e,t,n){return"#"+[e,t,n].map(o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0")).join("")}function ua(e,t){const[n,o,r]=Ao(e);return Lo(n+(255-n)*t,o+(255-o)*t,r+(255-r)*t)}function Co(e,t){const[n,o,r]=Ao(e);return Lo(n*(1-t),o*(1-t),r*(1-t))}function Hc(e){const t=Co(e,.15),n=ua(e,.88),o=ua(e,.96);return`
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
.q-items tbody tr:nth-child(even) td { background:${o}; }
.q-items tfoot td { padding:4px 6px; border:1px solid #d0d8e8; }
.q-total-row td { font-weight:700; font-size:12px; background:${n}; border-top:2px solid ${e}; }
.q-remarks { border:1px solid #ddd; padding:8px; font-size:10px; margin-bottom:10px; border-radius:3px; }
.q-remarks-label { font-weight:700; margin-bottom:3px; }
.q-footer-note { font-size:9px; color:#777; margin-bottom:8px; }
.billing-box { border-top:1px solid #e0e0e0; padding-top:8px; font-size:10px; color:#555; line-height:1.6; }
@media print { body { padding:10mm 12mm; } }
`}function Kc(e){const t=Co(e,.15),n=ua(e,.88),o=ua(e,.96);return`
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
.q-doc .q-items tbody tr:nth-child(even) td { background:${o}; }
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
`}function Do(e,t){const n=e.lines.reduce(($,C)=>$+C.amount,0),o=Math.round(n*e.taxRate/100),r=n+o,l=e.templateType==="sake",c=l?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",d=l?9:6,u=e.lines.map(($,C)=>{const P=l?`<td style="font-size:9px;">${Z($.janCode)}</td><td style="text-align:center;">${$.caseQty??""}</td><td style="text-align:right;">${$.retailPrice!=null?Ce($.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${C+1}</td>
      <td class="mono" style="font-size:9px;">${Z($.productCode)}</td>
      <td>${Z($.productName)}</td>
      ${P}
      <td style="text-align:right;">${$.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${Z($.unit)}</td>
      <td style="text-align:right;">${Ce($.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${d}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),g=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${Z(y)}</p>
    </div>
  `:"",f=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",x=[];e.validUntil&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${zn(e.validUntil)}</div></div>`),e.paymentTerms&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${Z(e.paymentTerms)}</div></div>`),e.deliveryDate&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${Z(e.deliveryDate)}</div></div>`),e.deliveryPlace&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${Z(e.deliveryPlace)}</div></div>`);const S=x.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min(x.length,4)},1fr);">${x.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${Z(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${zn(e.quoteDate)}</span></div>
    </div>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${Z(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${Z(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${Z(t.companyName)}</span>
        ${f}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${Z(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${Z(t.companyAddress1)}${t.companyAddress2?" "+Z(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${Z(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${Z(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${Z(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${S}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${Ce(r)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${Z(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${Z(t.defaultHeaderNote)}</p>`:""}

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
        <th style="width:80px;">${l?"納入価格":"単価"}</th>
      </tr>
    </thead>
    <tbody>${u}</tbody>
    <tfoot>
      <tr><td colspan="${d-1}" style="text-align:right;">小計</td><td style="text-align:right;">${Ce(n)}</td></tr>
      <tr><td colspan="${d-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Ce(o)}</td></tr>
      <tr class="q-total-row"><td colspan="${d-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Ce(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${Z(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${Z(t.defaultFooterNote)}</p>`:""}

  ${g}
</div>`}function qo(e,t,n,o,r,l,c){const d=e.lines.reduce(($,C)=>$+C.amount,0),u=Math.round(d*e.taxRate/100),y=d+u,g=e.templateType==="sake",f=o.length>=1?t.filter($=>$.name.includes(o)||$.code.includes(o)).slice(0,8):[],x=r.length>=1?n.filter($=>$.name.includes(r)||$.code.includes(r)).slice(0,8):[];if(e.previewMode){const $=c.accentColor||"#0968e5";return`
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
        ${Kc($)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${Do(e,c)}
      </div>
    `}const S=e.lines.map(($,C)=>{const P=g?`
      <td><input type="text" class="jan-input" data-line-idx="${C}" value="${Z($.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${C}" value="${$.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${C}" value="${$.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${Z($.productCode)}</td>
      <td>${Z($.productName)}</td>
      ${P}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${C}" value="${$.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${Z($.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${C}" value="${$.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${Ce($.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${C}">×</button></td>
    </tr>`}).join("")||`<tr><td colspan="${g?10:7}" style="text-align:center;color:var(--text-secondary);padding:20px;">商品を検索して追加</td></tr>`;return`
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
          ${Eo.map($=>`
            <button type="button" data-action="set-accent-color" data-color="${Z($.value)}" title="${Z($.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===$.value?"#333":"transparent"};background:${Z($.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${Z(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${Z(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${Z(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${Z(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${Z(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${Z(o)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${f.length>0?`<div class="search-results">${f.map($=>`
        <button class="search-item" type="button" data-select-customer="${$.code}" data-cust-name="${Z($.name)}" data-cust-addr="${Z($.address1||"")}">
          <span class="mono">${$.code}</span> ${Z($.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${Z(e.customerCode)}</span> <strong>${Z(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${Z(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${Z(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${Z(e.customerAddress)}</span>`:""}</div>`:""}
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
        ${l?`<p style="font-size:11px;color:var(--text-secondary);margin-top:4px;">現在の区分：<strong>${l.priceType==="000"?"生産者価格":l.priceType==="001"?"小売価格（定価）":"卸価格"}</strong>（得意先マスタ設定）</p>`:""}
      </div>`:""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${Z(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${x.length>0?`<div class="search-results">${x.map($=>{const C=l?dn($,l):{price:$.salePrice||0,label:"卸価格"},P=$.listPrice||0,E=C.label!=="標準価格"&&C.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${$.code}" data-prod-name="${Z($.name)}" data-prod-price="${C.price}" data-prod-retail="${P}" data-prod-jan="${Z($.janCode??"")}" data-prod-unit="${Z($.unit??"本")}" data-prod-case="${$.caseQty??""}">
          <span class="mono">${$.code}</span> ${Z($.name)}
          <span class="numeric" ${E?'style="color:#2f855a;font-weight:700;"':""}>納入 ${C.price?Ce(C.price):"未設定"} <small>(${C.label})</small>${P?`　定価 ${Ce(P)}`:""}</span>
        </button>`}).join("")}</div>`:""}

      <div class="table-wrap" style="margin-top:10px;">
        <table>
          <thead>
            <tr>
              <th>品番</th><th>品名</th>
              ${g?'<th>JANコード</th><th>入数</th><th class="numeric">希望小売価格</th>':""}
              <th class="numeric">数量</th><th>単位</th><th class="numeric">${g?"納入価格":"単価"}</th><th class="numeric">金額</th><th></th>
            </tr>
          </thead>
          <tbody>${S}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${Z(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${Ce(d)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${Ce(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${Ce(y)}</span></div>
        </div>
      </div>
    </section>
  `}async function Qc(e,t){const n=t.accentColor||"#0968e5",o=document.createElement("div");o.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",o.innerHTML=`<style>${Hc(n)}</style>${Do(e,t)}`,document.body.appendChild(o);try{const[{default:r},{jsPDF:l}]=await Promise.all([N(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),N(()=>import("./jspdf.es.min-D4yb2f29.js").then($=>$.j),[])]),c=await r(o,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),d=210,u=297,y=c.width/d,g=u*y,f=new l({orientation:"portrait",unit:"mm",format:"a4"});let x=0,S=0;for(;x<c.height;){S>0&&f.addPage();const $=Math.min(g,c.height-x),C=document.createElement("canvas");C.width=c.width,C.height=Math.ceil($);const P=C.getContext("2d");P.fillStyle="#ffffff",P.fillRect(0,0,C.width,C.height),P.drawImage(c,0,x,c.width,$,0,0,c.width,$);const E=C.toDataURL("image/jpeg",.95),s=$/y;f.addImage(E,"JPEG",0,0,d,s),x+=g,S++}f.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(o)}}function Vt(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function To(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Io(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function Mo(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function Wc(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Gc(e,t,n,o,r){const l=new Map,c=new Map;for(const g of e){if(g.date>=t&&g.date<=n){const f=l.get(g.productCode);f?(f.amt+=g.amount,f.qty+=g.qty):l.set(g.productCode,{name:g.productName,vol:g.volumeMl,amt:g.amount,qty:g.qty})}g.date>=o&&g.date<=r&&c.set(g.productCode,(c.get(g.productCode)??0)+g.amount)}const d=[...l.entries()].map(([g,f])=>({code:g,...f})).sort((g,f)=>f.amt-g.amt),u=d.reduce((g,f)=>g+f.amt,0);let y=0;return d.map(g=>{y+=g.amt;const f=u>0?Math.round(g.amt*1e4/u)/100:0,x=y<=u*.7?"A":y<=u*.9?"B":"C",S=c.get(g.code)??0,$=S>0?Math.round((g.amt-S)/S*1e3)/10:null;return{code:g.code,name:g.name,volumeMl:g.vol,amount:g.amt,qty:g.qty,sharePct:f,rank:x,prevAmount:S,growthRate:$}})}function Xc(e,t,n){const o=new Date,r=o.toISOString().slice(0,10);let l=r,c=r,d="";switch(e){case"week":{const g=new Date(o);g.setDate(g.getDate()-7),l=g.toISOString().slice(0,10),c=r,d="直近7日間";break}case"month":{l=r.slice(0,7)+"-01",c=r,d="当月";break}case"90days":{const g=new Date(o);g.setDate(g.getDate()-90),l=g.toISOString().slice(0,10),c=r,d="直近90日間";break}case"year":{const g=new Date(o);g.setFullYear(g.getFullYear()-1),l=g.toISOString().slice(0,10),c=r,d="直近1年間";break}case"custom":{l=t||r,c=n||r,d=`${l} 〜 ${c}`;break}}const u=new Date(l);u.setFullYear(u.getFullYear()-1);const y=new Date(c);return y.setFullYear(y.getFullYear()-1),{start:l,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:d}}function Zc(e,t="all",n=[],o="year",r,l,c=[]){const d=Xc(o,r,l),u=n.length>0?Gc(n,d.start,d.end,d.prevStart,d.prevEnd):e.map(s=>({code:s.code,name:s.name,volumeMl:s.volumeMl,amount:s.yearAmount,qty:s.yearQty,sharePct:s.sharePct,rank:s.rank,prevAmount:s.prevAmount,growthRate:s.growthRate})),y=u.filter(s=>s.rank==="A").length,g=u.filter(s=>s.rank==="B").length,f=u.filter(s=>s.rank==="C").length,x=u.filter(s=>s.growthRate!=null&&s.growthRate>10),S=u.filter(s=>s.growthRate!=null&&s.growthRate<-10);let $=u,C="全商品";switch(t){case"A":$=u.filter(s=>s.rank==="A"),C="Aランク";break;case"B":$=u.filter(s=>s.rank==="B"),C="Bランク";break;case"C":$=u.filter(s=>s.rank==="C"),C="Cランク";break;case"growing":$=x,C="成長商品(+10%以上)";break;case"declining":$=S,C="衰退商品(-10%以下)";break}const P=(s,i,p)=>`<button class="button ${t===s?"primary":"secondary"} small" data-product-filter="${s}">${i} (${p})</button>`,E=(s,i)=>`<button class="button ${o===s?"primary":"secondary"} small" data-product-period="${s}">${i}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${E("week","週次")}
        ${E("month","月次")}
        ${E("90days","90日")}
        ${E("year","年間")}
        ${E("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${r||""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${l||""}" />
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
        <p class="kpi-value">${g} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${x.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${S.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${C} (${$.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${P("all","全て",u.length)}
        ${P("A","A",y)}
        ${P("B","B",g)}
        ${P("C","C",f)}
        ${P("growing","成長",x.length)}
        ${P("declining","衰退",S.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ae("rank","ABC",c)}
              ${ae("name","商品名",c)}
              ${ae("amount","売上",c,"numeric")}
              ${ae("sharePct","構成比",c,"numeric")}
              ${ae("qty","本数",c,"numeric")}
              ${ae("growthRate","前年同期比",c,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${ht($,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(s=>`
              <tr>
                <td>${Io(s.rank)}</td>
                <td>${s.name?s.name.slice(0,25):s.code}${s.volumeMl?` <small>${s.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${To(s.amount)}</td>
                <td class="numeric">${s.sharePct}%</td>
                <td class="numeric">${s.qty.toLocaleString()}</td>
                <td class="numeric">${Mo(s.growthRate)}</td>
              </tr>
            `).join("")}
            ${$.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function ed(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,o="billing",r="jan"){const l=e.filter(S=>S.currentRank==="A").length,c=e.filter(S=>S.prevRank&&S.currentRank<S.prevRank).length,d=e.filter(S=>S.prevRank&&S.currentRank>S.prevRank).length,u=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,y=2011,g=[];for(let S=u;S>=y&&g.length<6;S--)g.push(S);const f=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${g.map(S=>`
        <button class="button ${S===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${S}"
          style="min-width:80px;">
          ${S}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:u-y+1},(S,$)=>u-$).filter(S=>!g.includes(S)).map(S=>`<option value="${S}" ${S===n?"selected":""}>${S}年度</option>`).join("")}
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
      <button class="button ${o==="billing"?"primary":"secondary"} small"
        data-action="efficiency-groupby-change" data-groupby="billing">
        得意先単位
      </button>
      <button class="button ${o==="delivery"?"primary":"secondary"} small"
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
        <p class="kpi-value">${l} ${o==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${c} ${o==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${d} ${o==="billing"?"社":"店舗"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>${o==="billing"?"得意先":"店舗（納品先）"}ABC分析（${n}${r==="jan"?"年・1〜12月":r==="oct"?"酒造年度・10〜翌9月":"年度・4〜翌3月"}）</h2></div>
      ${f}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ae("currentRank","ABC",t)}
              ${ae("name","得意先名",t)}
              ${ae("yearAmount","年間売上",t,"numeric")}
              ${ae("sharePct","構成比",t,"numeric")}
              ${ae("orderDays","受注日数",t,"numeric")}
              ${ae("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${ht(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(S=>`
              <tr>
                <td>${Io(S.currentRank)}</td>
                <td>${S.name||S.code}</td>
                <td class="numeric">${To(S.yearAmount)}</td>
                <td class="numeric">${S.sharePct}%</td>
                <td class="numeric">${S.orderDays}日</td>
                <td class="numeric">${Mo(S.growthRate)}</td>
                <td>${Wc(S.currentRank,S.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function td(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function na(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ad(e,t,n=null,o=null){const r=e.length?e.map(l=>`
            <tr class="clickable-row${l.documentNo===n?" selected-row":""}"
                data-doc-no="${l.documentNo}">
              <td class="mono">${l.documentNo}</td>
              <td>${td(l.date)}</td>
              <td>
                <div class="table-title">${l.customerName}</div>
                <div class="table-sub mono">${l.customerCode}</div>
              </td>
              <td class="numeric">${l.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${na(l.amount)}</td>
            </tr>
            ${l.documentNo===n?nd(o):""}
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
  `}function nd(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(o=>`
      <tr>
        <td class="mono" style="width:40px">${o.lineNo}</td>
        <td class="mono" style="width:70px">${o.productCode}</td>
        <td class="product-name">${o.productName}</td>
        <td class="numeric" style="width:50px">${o.quantity}</td>
        <td class="numeric" style="width:80px">${na(o.unitPrice)}</td>
        <td class="numeric" style="width:90px">${na(o.amount)}</td>
      </tr>`).join(""),n=e.reduce((o,r)=>o+r.amount,0);return`<tr class="line-detail-row"><td colspan="5">
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
            <td class="numeric">${na(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function sd(e){return new Date(e.getFullYear(),e.getMonth(),1)}function od(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function No(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Ro(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Fn(e){const t=No(Ro(e),6);return t.setHours(23,59,59,999),t}function Vn(e){return new Date(`${e}T00:00:00`)}function Yn(e){return`${e.getMonth()+1}/${e.getDate()}`}function rd(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function id(){const e=new Date,t=Ro(od(sd(e),-3)),n=Fn(new Date(e.getFullYear(),e.getMonth()+4,0)),o=[];let r=new Date(t);for(;r<=n;){const l=Fn(r);o.push({start:new Date(r),end:l,label:`${Yn(r)} - ${Yn(l)}`}),r=No(r,7)}return o}function ld(e){const t=id(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,o=t.map(l=>`
        <div class="gantt-week">
          <span>${l.label}</span>
        </div>
      `).join(""),r=e.length?e.map(l=>{const c=Vn(l.startDate),d=Vn(l.expectedDoneDate),u=Math.max(0,t.findIndex(f=>f.end>=c)),y=Math.max(u,t.reduce((f,x,S)=>x.start<=d?S:f,u)),g=[`仕込番号: ${l.jikomiNo}`,`銘柄: ${l.productName}`,`期間: ${l.startDate} - ${l.expectedDoneDate}`,`タンク: ${l.tankNo}`,`備考: ${l.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${l.jikomiNo}</strong>
                <span class="table-sub">${l.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${l.status}"
                  style="grid-column:${u+1} / ${y+2}"
                  title="${rd(g)}"
                >
                  ${l.jikomiNo} / ${l.productName}
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
          ${o}
        </div>
        ${r}
      </div>
    </section>
  `}function Un(e,t){const n={planned:"neutral",active:"warning",done:"success"},o=e.map(d=>`
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
          <span class="status-pill ${n[d.status]}">${Js[d.status]}</span>
        </td>
        <td>${d.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(d=>d.status==="active").length,l=e.filter(d=>d.status==="done").length,c=e.filter(d=>d.status==="planned").length;return`
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
        <p class="kpi-value">${l} 本</p>
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
          <tbody>${o||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function cd(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},o=e.map(u=>`
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
    `).join(""),r=e.filter(u=>u.status==="approved").length,l=e.filter(u=>u.status==="submitted").length,c=e.filter(u=>u.status==="pending").length;return`
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
        <p class="kpi-value">${l} 件</p>
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
          <tbody>${o||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function dd(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function pd(e,t){return`
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
        ${e?`<p class="field-error">${dd(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function ud(e){return`
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
  `}function md(e){return`
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
  `}const xn={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},Lt=50;function yd(e,t){let n=e;if(t.query){const d=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(d)||u.name.toLowerCase().includes(d)||u.kanaName&&u.kanaName.toLowerCase().includes(d)||u.address1&&u.address1.toLowerCase().includes(d)||u.phone&&u.phone.toLowerCase().includes(d))}t.businessType&&(n=n.filter(d=>d.businessType===t.businessType)),t.tradeType&&(n=n.filter(d=>d.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(d=>d.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(d=>d.isActive):t.activeOnly==="inactive"&&(n=n.filter(d=>!d.isActive));const o=Math.max(1,Math.ceil(n.length/Lt)),l=(Math.min(t.page,o)-1)*Lt,c=n.slice(l,l+Lt);return{filtered:n,paged:c,totalPages:o}}function Jn(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const o=(t-1)*Lt+1,r=Math.min(t*Lt,e),l=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?l.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&l.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${o}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${l.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function hd(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),o=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(gd).map(([r,l])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${o.map(r=>`<option value="${r}" ${t.areaCode===r?"selected":""}>${r}</option>`).join("")}
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
  `}function Ya(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function fd(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const gd={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function vd(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function bd(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${vd(t.tradeType)}</td>
          <td>${fd(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${Ya(t.address1||"",16)}</td>
          <td>${Ya(t.address2||"",12)}</td>
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
      `).join("")}function Yt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function wd(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${Ya(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Yt(t.purchasePrice)}</td>
          <td class="numeric">${Yt(t.salePrice)}</td>
          <td class="numeric">${Yt(t.listPrice)}</td>
          <td class="numeric">${Yt(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function xd(e,t,n=xn,o=[]){const{filtered:r,paged:l,totalPages:c}=yd(e.customers,n);return`
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
        ${hd(e.customers,n)}
        ${Jn(r.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${ae("code","コード",o)}
                ${ae("name","得意先名",o)}
                ${ae("kanaName","カナ",o)}
                <th>略称</th>
                ${ae("businessType","業態",o)}
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
                ${ae("areaName","地区",o)}
                ${ae("closingDay","締日",o,"numeric")}
                ${ae("paymentDay","支払日",o,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${bd(ht(l,o,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Jn(r.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${ae("code","コード",o)}
                ${ae("name","商品名",o)}
                <th>カナ</th>
                ${ae("category","分類",o)}
                <th>酒税区分</th>
                ${ae("alcoholDegree","度数",o,"numeric")}
                ${ae("volumeMl","容量ml",o,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${ae("purchasePrice","生産者価格",o,"numeric")}
                ${ae("salePrice","卸価格",o,"numeric")}
                ${ae("listPrice","定価(小売)",o,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${wd(ht(e.products,o,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function Sa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function $d(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${lo.map(o=>`<option ${n?.materialType===o?"selected":""}>${o}</option>`).join("")}
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
  `}function _d(e){const t=e.map(r=>{const c=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${Sa(r.unitCost)}</td>
          <td class="numeric">${Sa(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,o=e.reduce((r,l)=>r+l.currentStock*l.unitCost,0);return`
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
        <p class="kpi-value">${Sa(o)}</p>
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
  `}function Sd(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function ka(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const kd={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Pd(e){return`
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
          <td class="numeric">${ka(n.billedAmount)}</td>
          <td class="numeric">${ka(n.paymentAmount)}</td>
          <td class="numeric">${ka(n.balanceAmount)}</td>
          <td>${Sd(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${kd[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function lt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Hn(e){return e.trim().toLowerCase()}function Ed(e,t){const n=Hn(t),o=e.filter(l=>n?[l.code,l.name,l.janCode].map(Hn).some(c=>c.includes(n)):!0),r=o.length?`
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
              ${o.map(l=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${lt(l.code)}"
                      data-name="${lt(l.name)}"
                    >
                      <td class="mono">${lt(l.code)}</td>
                      <td>${lt(l.name)}</td>
                      <td class="mono">${lt(l.janCode)}</td>
                      <td>${lt(l.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return ko({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function Ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ad(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},o={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},l={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(f=>`
      <tr>
        <td class="mono">${f.documentNo}</td>
        <td>${f.purchaseDate}</td>
        <td class="mono">${f.supplierCode}</td>
        <td>${f.supplierName}</td>
        <td>${f.itemName}</td>
        <td class="numeric">${f.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${Ke(f.unitPrice)}</td>
        <td class="numeric"><strong>${Ke(f.amount)}</strong></td>
        <td>
          <span class="status-pill ${o[f.status]}">${n[f.status]}</span>
        </td>
      </tr>
    `).join(""),d=t.map(f=>`
      <tr>
        <td class="mono">${f.supplierCode}</td>
        <td>${f.supplierName}</td>
        <td class="numeric">${Ke(f.totalPurchase)}</td>
        <td class="numeric">${Ke(f.paidAmount)}</td>
        <td class="numeric"><strong>${Ke(f.balance)}</strong></td>
        <td>${f.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${l[f.status]}">${r[f.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${f.supplierCode}" ${f.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((f,x)=>f+x.amount,0),y=t.reduce((f,x)=>f+x.balance,0),g=t.filter(f=>f.status!=="paid").length;return`
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
        <p class="kpi-value">${Ke(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${Ke(y)}</p>
        <p class="kpi-sub">未払い ${g} 社</p>
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
  `}function xt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ld(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},o={holding:"neutral",due:"warning",cleared:"success"},r=e.map(g=>`
      <tr>
        <td class="mono">${g.billNo}</td>
        <td>${g.supplierName}</td>
        <td class="numeric">${xt(g.amount)}</td>
        <td>${g.issueDate}</td>
        <td>${g.dueDate}</td>
        <td>
          <span class="status-pill ${o[g.status]}">${n[g.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${g.id}" ${g.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),l=t.map(g=>{const f=g.minimumStock>0&&g.currentStock<g.minimumStock*1.2;return`
        <tr>
          <td class="mono">${g.code}</td>
          <td>${g.name}</td>
          <td class="numeric ${f?"text-danger":""}">
            ${g.currentStock.toLocaleString("ja-JP")} ${g.unit}
            ${f?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${g.minimumStock.toLocaleString("ja-JP")} ${g.unit}</td>
          <td class="numeric">${xt(g.unitCost)}</td>
          <td class="numeric">${xt(g.currentStock*g.unitCost)}</td>
          <td>${g.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(g=>g.status==="holding"),d=c.reduce((g,f)=>g+f.amount,0),u=t.reduce((g,f)=>g+f.currentStock*f.unitCost,0),y=t.filter(g=>g.minimumStock>0&&g.currentStock<g.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${xt(d)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${xt(u)}</p>
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
          <tbody>${l||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ua(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function _e(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ja(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${_e(e)}</pre>
    </div>
  `}function Cd(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Ut(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${_e(e)}</code>
      ${Cd(e)}
    </div>
  `}function ct(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${_e(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${_e(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${_e(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?Ja(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${_e(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${_e(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function Jt(e){return`
    <div class="setup-step setup-step-compact" data-step="${_e(e.stepLabel)}">
      <h3>${_e(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${_e(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Ht(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Kn(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function Dd(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?Ua(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Ht(e.lastOverallSync)}">${Kn(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Ht(e.lastOverallSync)==="success"?"1時間以内":Ht(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${_e(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?Ua(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Ht(t.lastSyncAt)}">${Kn(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function qd(e){if(!e.length)return"";const t=r=>r==="ok"?"&#x2705;":r==="warn"?"&#x26A0;&#xFE0F;":"&#x274C;",n=r=>r==="ok"?"success":r==="warn"?"warning":"error",o=e.every(r=>r.status==="ok");return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>システム稼働状況</h2>
          <p class="panel-caption">${o?"全機能正常稼働中":"一部要確認"}</p>
        </div>
        <span class="status-pill ${o?"success":"warning"}" style="font-size:1.1em">
          ${o?"ALL OK":"要確認"}
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
  `}function Td(e,t,n,o,r){const l={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${r?qd(r):""}

    ${o?Dd(o):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Ua(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${l[e.status]}</span>
        </p>
        <p class="kpi-sub">${_e(e.message)}</p>
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
      ${Jt({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Ut("git --version")}
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
      ${Jt({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Ut("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${Jt({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Ut("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Ut("python get-pip.py")}
        `})}
      ${Jt({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${ct({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${ct({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${ct({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${ct({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${ct({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${ct({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${Ja(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${Ja(`{
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
            <span class="config-value">${_e(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${_e(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${_e(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${_e(n)}"
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
  `}function Pt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Oo(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function Id(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(f=>f.amount),1),o=28,r=6,l=140,c=100,d=760,u=d-l-c,y=t.length*(o+r)+16,g=t.map((f,x)=>{const S=f.amount/n*u,$=x*(o+r)+8,C=f.abcRank==="A"?"#2F855A":f.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${l-8}" y="${$+o/2+5}" class="chart-axis" text-anchor="end">${f.name.length>10?f.name.slice(0,10)+"…":f.name}</text>
          <rect x="${l}" y="${$}" width="${S}" height="${o}" rx="4" fill="${C}" opacity="0.85" />
          <text x="${l+S+8}" y="${$+o/2+5}" class="chart-axis">${(f.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${d} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${g}
    </svg>
  `}function Bo(e,t,n="得意先"){if(e.length===0||t.length===0)return'<p class="empty-row">データなし</p>';const o=t.map(u=>`<th class="numeric">${u}</th>`).join(""),r=t.map((u,y)=>e.reduce((g,f)=>g+(f.values[y]??0),0)),l=r.reduce((u,y)=>u+y,0),c=e.map(u=>{const y=u.values.reduce((f,x)=>f+x,0),g=u.values.map(f=>`<td class="numeric">${f>0?(f/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`<tr>
      <td>${u.label}</td>
      ${g}
      <td class="numeric"><strong>${(y/1e4).toFixed(0)}万</strong></td>
    </tr>`}).join(""),d=r.map(u=>`<td class="numeric"><strong>${u>0?(u/1e4).toFixed(0)+"万":"—"}</strong></td>`).join("");return`
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${n}</th>
            ${o}
            <th class="numeric">合計</th>
          </tr>
        </thead>
        <tbody>${c}</tbody>
        <tfoot>
          <tr style="background:var(--surface-raised,#f5f5f5);font-weight:600;">
            <td>月次合計</td>
            ${d}
            <td class="numeric">${(l/1e4).toFixed(0)}万</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `}function Md(e){return Oo(e)}function Nd(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,20),n=760,o=320,r={top:24,right:56,bottom:60,left:72},l=n-r.left-r.right,c=o-r.top-r.bottom,d=Math.max(...t.map($=>$.amount),1),u=l/t.length,y=[0,.25,.5,.75,1].map($=>{const C=r.top+c-c*$;return`<g>
      <line x1="${r.left}" y1="${C}" x2="${n-r.right}" y2="${C}" class="chart-grid" />
      <text x="4" y="${C+4}" class="chart-axis">${Math.round(d*$/1e4)}万</text>
    </g>`}).join(""),g=[0,25,50,70,90,100].map($=>{const C=r.top+c-c*$/100,P=$===70||$===90;return`<g>
      <text x="${n-4}" y="${C+4}" class="chart-axis" text-anchor="end">${$}%</text>
      ${P?`<line x1="${r.left}" y1="${C}" x2="${n-r.right}" y2="${C}" stroke="${$===70?"#2F855A":"#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />`:""}
    </g>`}).join(""),f=t.map(($,C)=>{const P=$.amount/d*c,E=Math.max(u-10,16),s=r.left+C*u+(u-E)/2,i=r.top+c-P,p=$.abcRank==="A"?"#2F855A":$.abcRank==="B"?"#B7791F":"#718096",m=$.name.length>6?$.name.slice(0,6)+"…":$.name;return`<g>
      <rect x="${s}" y="${i}" width="${E}" height="${P}" rx="4" fill="${p}" opacity="0.8" />
      <text x="${s+E/2}" y="${o-8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${s+E/2} ${o-16})">${m}</text>
    </g>`}).join(""),x=t.map(($,C)=>{const P=r.left+C*u+u/2,E=r.top+c-c*$.cumRatio/100;return`${P},${E}`}).join(" "),S=t.map(($,C)=>{const P=r.left+C*u+u/2,E=r.top+c-c*$.cumRatio/100;return`<circle cx="${P}" cy="${E}" r="3.5" fill="#C53D3D" />`}).join("");return`
    <svg viewBox="0 0 ${n} ${o}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${y}${g}${f}
      <polyline points="${x}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${S}
    </svg>`}function Rd(e){const t=e.ranking.filter(d=>d.abcRank==="A").length,n=e.ranking.filter(d=>d.abcRank==="B").length,o=e.ranking.filter(d=>d.abcRank==="C").length,r=e.ranking.filter(d=>d.abcRank==="A").reduce((d,u)=>d+u.amount,0),l=e.ranking.map(d=>`
    <tr>
      <td class="mono">${d.code}</td>
      <td>${d.name}</td>
      <td class="numeric">${Pt(d.amount)}</td>
      <td class="numeric">${d.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${d.ratio.toFixed(1)}%</td>
      <td class="numeric">${d.cumRatio.toFixed(1)}%</td>
      <td><span class="status-pill ${Md(d.abcRank)}">${d.abcRank}</span></td>
    </tr>`).join(""),c=Bo(e.monthlyByProduct,e.months,"商品名");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">商品数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}品 <span class="kpi-sub">${(r/e.totalAmount*100).toFixed(1)}%</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}品</div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${o}品</div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>パレート図</h2><p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p></div></div>
      <div class="chart-scroll">${Nd(e.ranking)}</div>
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
          <tbody>${l}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>上位商品 月次推移</h2><p class="panel-caption">Aランク商品の月別売上</p></div></div>
      ${c}
    </section>`}function Od(e){const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,o=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),l=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),d=e.ranking.map(u=>`
    <tr>
      <td class="mono">${u.code}</td>
      <td>${u.name}</td>
      <td class="numeric">${Pt(u.amount)}</td>
      <td class="numeric">${u.ratio.toFixed(1)}%</td>
      <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
      <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
      <td><span class="status-pill ${Oo(u.abcRank)}">${u.abcRank}</span></td>
    </tr>`).join("");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">得意先数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${Pt(r)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${Pt(l)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${o}社 <span class="kpi-sub">${Pt(c)}</span></div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別売上ランキング</h2><p class="panel-caption">売上金額上位15社</p></div></div>
      <div class="chart-scroll">${Id(e.ranking)}</div>
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
      ${Bo(e.monthlyByCustomer,e.months,"得意先")}
    </section>`}function Bd(e,t,n,o=""){const r=n==="customer"?Od(e):t?Rd(t):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>',l=new Date().getFullYear(),c=Array.from({length:5},(x,S)=>String(l-S)),d=o.length===4?o:o.slice(0,4),u=o.length===7?o.slice(5,7):"",y=["01","02","03","04","05","06","07","08","09","10","11","12"],g={"01":"1月","02":"2月","03":"3月","04":"4月","05":"5月","06":"6月","07":"7月","08":"8月","09":"9月",10:"10月",11:"11月",12:"12月"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>ABC分析 <span style="font-size:0.75em;font-weight:400;color:var(--text-secondary);">${o?o.length===7?`${o.slice(0,4)}年${g[o.slice(5)]??o.slice(5)}`:`${o}年`:"全期間"}</span></h1>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="analysis-period-year" class="input-sm">
          <option value="">全期間</option>
          ${c.map(x=>`<option value="${x}" ${d===x?"selected":""}>${x}年</option>`).join("")}
        </select>
        <select id="analysis-period-month" class="input-sm" ${d?"":"disabled"}>
          <option value="">全月</option>
          ${y.map(x=>`<option value="${x}" ${u===x?"selected":""}>${g[x]}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="tab-bar" style="margin-bottom:16px;">
      <button class="tab-btn ${n==="customer"?"active":""}" type="button" data-analysis-tab="customer">👥 得意先ABC分析</button>
      <button class="tab-btn ${n==="product"?"active":""}" type="button" data-analysis-tab="product">📦 商品ABC分析</button>
    </div>

    ${r}
  `}const jd={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},Qn={amount:"売上額",quantity:"出荷本数",volume:"移出量"},Ha=10;function $n(e){const[t,n]=e.split("-").map(Number);return n>=Ha?t:t-1}function zd(e){const t=Ha-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(Ha).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function Fd(e,t,n){const o=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,r=new Map;for(const c of e){const d=n==="fiscal"?`${$n(c.month)}年度`:c.month.slice(0,4);r.set(d,(r.get(d)??0)+o(c))}return{curr:[...r.entries()].sort((c,d)=>c[0].localeCompare(d[0])).map(([c,d])=>({month:c,amount:d}))}}function Vd(e){const t=new Set;for(const n of e)t.add($n(n.month));return[...t].sort((n,o)=>o-n).map(String)}function ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Yd(e){return e.replace("-","/")}const Wn={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function Ud(e,t="#0F5B8D",n=[],o="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(s=>s.amount>0),l=760,c=280,d={top:16,right:24,bottom:36,left:o==="amount"?64:56},u=l-d.left-d.right,y=c-d.top-d.bottom,g=[...e.map(s=>s.amount),...n.map(s=>s.amount)],f=Math.max(...g,1),x=u/e.length;function S(s){if(o==="quantity")return s>=1e4?`${(s/1e4).toFixed(1)}万本`:`${Math.round(s).toLocaleString()}本`;if(o==="volume"){const i=s/1e3;return i>=1e4?`${(i/1e3).toFixed(0)}kL`:`${Math.round(i).toLocaleString()} L`}return`${Math.round(s/1e4).toLocaleString("ja-JP")}万円`}function $(s){return o==="quantity"?`${s.toLocaleString()}本`:o==="volume"?ga(s):ft(s)}const C=[0,.25,.5,.75,1].map(s=>{const i=d.top+y-y*s,p=S(f*s);return`<g>
        <line x1="${d.left}" y1="${i}" x2="${l-d.right}" y2="${i}" class="chart-grid" />
        <text x="4" y="${i+4}" class="chart-axis">${p}</text>
      </g>`}).join(""),P=e.map((s,i)=>{const p=r?Math.max((x-18)/2,10):Math.max(x-18,24),m=r?2:0,h=d.left+i*x+(x-(r?p*2+m:p))/2,b=s.amount/f*y,_=d.top+y-b,w=n[i]?.amount??0,k=w/f*y,D=d.top+y-k,L=r?`<rect x="${h}" y="${D}" width="${p}" height="${k}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${$(w)}</title></rect>`:"",q=r?h+p+m:h;return`<g>
      ${L}
      <rect x="${q}" y="${_}" width="${p}" height="${b}" rx="4" fill="${t}" opacity="${.6+i/e.length*.35}"><title>${$(s.amount)}</title></rect>
      <text x="${d.left+i*x+x/2}" y="${c-8}" class="chart-axis centered-axis">${Yd(s.month)}</text>
    </g>`}).join(""),E=r?`
    <g transform="translate(${l-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${C}${P}${E}
    </svg>
  `}function ga(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Jd(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(o=>`
    <tr>
      <td class="mono">${o.code}</td>
      <td>${o.name}</td>
      <td class="numeric">${ft(o.amount)}</td>
      <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${ga(o.volumeMl)}</td>
      <td class="numeric">${o.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${o.code}" data-drilldown-name="${o.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function Hd(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${ft(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${ga(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function Gn(e,t,n){const o=t?e.filter(l=>l.tag.includes(t)||l.name.includes(t)):e,r=o.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':o.map(l=>`
        <tr>
          <td class="mono">${l.code||"―"}</td>
          <td>${l.name||"未設定"}</td>
          <td class="mono">${l.tag||"―"}</td>
          <td class="numeric">${ft(l.amount)}</td>
          <td class="numeric">${l.documents.toLocaleString("ja-JP")}</td>
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
  `}function jo(e,t,n="all",o="",r=[],l=[],c="",d="",u=null,y="all",g="",f=[],x=[],S=[],$=null,C=[],P=[],E="amount",s="calendar"){const i=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",p=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,h=n!=="all"&&r.length>0&&t!=="staff"?r:p,b=ht(h,S,jd),_={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},w=Qn[E],k=H=>E==="quantity"?H.quantity:E==="volume"?H.volumeMl:H.amount,D=H=>E==="quantity"?`${H.toLocaleString()}本`:E==="volume"?ga(H):ft(H);let L,q=[],I,B,O;if($&&$.monthlySales.length>0)L=$.monthlySales.slice(-24).map(H=>({month:H.month,amount:k(H)})),I=`${$.name} の月別${w}`,B=`${$.tab==="customers"?"得意先":"商品"}: ${$.code}`,O="#0968e5";else if(C.length>0&&n!=="all"){L=C.map(V=>({month:V.month,amount:k(V)})),q=P.map(V=>({month:V.month,amount:k(V)}));const H=L.reduce((V,K)=>V+K.amount,0),X=q.reduce((V,K)=>V+K.amount,0),ee=X>0?(H-X)/X*100:0,ie=ee>0?"+":"";I=`${_[n]} ${w}（${o}）`,B=`${D(H)}${X>0?` / 前年比 ${ie}${ee.toFixed(1)}%`:""}`,O="#2f855a"}else{L=Fd(e.monthlySales,E,s).curr,q=[];const X=L.reduce((ie,V)=>ie+V.amount,0);I=`${s==="fiscal"?"決算年度別":"暦年別"}${w}`,B=`累計 ${D(X)}（${L.length}${s==="fiscal"?"期":"年"}）`,O="#0F5B8D"}const R=["amount","quantity","volume"].map(H=>`<button class="tab-button ${H===E?"active":""}" data-chart-metric="${H}">${Qn[H]}</button>`).join(""),M=["all","yearly","monthly","weekly","daily"].map(H=>`<button class="button ${H===n?"primary":"secondary"} small" type="button" data-analytics-period="${H}">${Wn[H]}</button>`).join(""),j=s==="fiscal"&&n==="yearly"?Vd(e.monthlySales):l,Y=s==="fiscal"&&n==="yearly"&&!j.includes(o)?j[0]??"":o,J=n!=="all"&&j.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${j.map(H=>`<option value="${H}" ${H===Y?"selected":""}>${s==="fiscal"&&n==="yearly"?H+"年度":H}</option>`).join("")}
      </select>`:"";let W="",Q="";if(t==="staff"){const H=["all","yearly","monthly","weekly","daily"].map(K=>`<button class="button ${K===y?"primary":"secondary"} small" type="button" data-staff-period="${K}">${Wn[K]}</button>`).join(""),X=y!=="all"&&f.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${f.map(K=>`<option value="${K}" ${K===g?"selected":""}>${K}</option>`).join("")}
        </select>`:"",ie=(x.length>0?x:e.staffTotals).filter(K=>!c||K.name.includes(c)||K.code.includes(c)),V=y!=="all"&&g?` (${g})`:"";if(W=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${H}</div>
        ${X}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${c}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${V?`<span style="font-size:12px;color:var(--text-secondary);">${V}</span>`:""}
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
            ${ie.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':ie.map(K=>`
                <tr>
                  <td class="mono">${K.code||"―"}</td>
                  <td>${K.name||"未設定"}</td>
                  <td class="numeric">${ft(K.amount)}</td>
                  <td class="numeric">${K.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${K.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${K.code}" data-staff-name="${K.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const K=u.breakdownTab,G=y!=="all"&&g?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${g}</span>`:"";Q=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${G}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${K==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${K==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${K==="customers"?Gn(u.customerRows,d,"得意先名"):Gn(u.productRows,d,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${s==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${s==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${I}</h2>
            <p class="panel-caption">${B}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${R}</div>
            ${$?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${Ud(L,O,q,E)}
        </div>
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
            <button class="tab-button ${t==="staff"?"active":""}" data-analytics-tab="staff">担当別</button>
          </div>
        </div>

        ${t!=="staff"?`
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
            <div class="button-group">${M}</div>
            ${J}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${ae("code","コード",S,"mono")}
                  ${ae("name","名称",S)}
                  ${ae("amount","売上額",S,"numeric")}
                  ${ae("quantity","本数",S,"numeric")}
                  ${ae("volumeMl","移出量",S,"numeric")}
                  ${ae("documents","伝票数",S,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Jd(b,!0)}</tbody>
            </table>
          </div>
        `:W}
      </article>
    </section>

    ${$?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${$.name} の${$.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${$.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${$.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${Hd($.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${Q}
  `}const Xn=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:zd,monthToFiscalYear:$n,renderSalesAnalytics:jo},Symbol.toStringTag,{value:"Module"}));function $t(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Kd(e){const t=Math.max(...e.salesByProduct.flatMap(l=>l.values),1),n=e.salesByProduct.map(l=>{const c=l.values.map((d,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(d/t*120)}px" title="${e.months[u]}: ${$t(d)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${l.label}</p>
          <div class="bar-chart">${c}</div>
        </div>
      `}).join(""),o=e.costSimulation.map(l=>`
      <tr>
        <td class="mono">${l.productCode}</td>
        <td>${l.productName}</td>
        <td class="numeric">${$t(l.costPrice)}</td>
        <td class="numeric">${$t(l.sellPrice)}</td>
        <td class="numeric">${$t(l.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${l.marginRate>=40?"success":"warning"}">${l.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(l=>{const c=l.values.reduce((d,u)=>d+u,0);return`
        <tr>
          <td>${l.label}</td>
          ${l.values.map(d=>`<td class="numeric">${(d/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${$t(c)}</strong></td>
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
              ${e.months.map(l=>`<th class="numeric">${l}</th>`).join("")}
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
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>
  `}function Qd(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function sa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Zn(e){return e.toISOString().slice(0,10)}function Wd(e,t,n,o=null,r=null){const l=e.length?e.map(c=>`
            <tr class="clickable-row${c.documentNo===o?" selected-row":""}"
                data-doc-no="${c.documentNo}">
              <td class="mono">${c.documentNo}</td>
              <td>${Qd(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${sa(c.amount)}</td>
            </tr>
            ${c.documentNo===o?Gd(r):""}
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
          <input id="sales-start" type="date" value="${t||Zn(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Zn(new Date)}" />
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
          <tbody>${l}</tbody>
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
  `}function Gd(e){if(!e)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(o=>`
      <tr>
        <td class="mono" style="width:40px">${o.lineNo}</td>
        <td class="mono" style="width:70px">${o.productCode}</td>
        <td>${o.productName}</td>
        <td class="numeric" style="width:50px">${o.quantity}</td>
        <td class="numeric" style="width:80px">${sa(o.unitPrice)}</td>
        <td class="numeric" style="width:90px">${sa(o.amount)}</td>
      </tr>`).join(""),n=e.reduce((o,r)=>o+r.amount,0);return`<tr class="line-detail-row"><td colspan="4">
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
            <td class="numeric">${sa(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function Kt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Xd(e,t,n,o){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},l={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},d=e.map(f=>`
      <tr>
        <td>${f.saleTime}</td>
        <td class="mono">${f.productCode}</td>
        <td>${f.productName}</td>
        <td class="numeric">${f.quantity}</td>
        <td class="numeric">${Kt(f.unitPrice)}</td>
        <td class="numeric"><strong>${Kt(f.amount)}</strong></td>
        <td>${r[f.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(f=>`
      <tr>
        <td class="mono">${f.orderNo}</td>
        <td>${f.orderDate}</td>
        <td>${f.customerName}</td>
        <td>${f.postalCode} ${f.address}</td>
        <td>${f.items.map(x=>`${x.productName} ×${x.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Kt(f.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[f.status]}">${l[f.status]}</span>
        </td>
        <td>${f.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${f.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((f,x)=>f+x.amount,0),g=t.filter(f=>f.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Kt(y)}</p>
        <p class="kpi-sub">${e.length} 件 / ${o}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${g} 件</p>
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
            <input id="store-date" type="date" value="${o}" style="width:160px" />
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
  `}const Pa={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Zd={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function ep(e,t,n,o){const r=Zd[e],l=Object.keys(Pa).map(d=>`
      <button class="tab-button ${e===d?"active":""}" data-import-entity="${d}">
        ${Pa[d]}
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
      <div class="tab-group" style="flex-wrap: wrap;">${l}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${Pa[e]} のCSV形式</h2>
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

    ${o?`<section class="panel"><p class="sync-message">${o}</p></section>`:""}
  `}const ue={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function tp(e,t,n){const o=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:ue.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:ue.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:ue.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:ue.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:ue.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:ue.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:ue.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:ue.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:ue.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:ue.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:ue.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:ue.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:ue.date}];e.lines.slice(0,6).forEach((c,d)=>{const u=33+d*8.5;o.push({id:`line${d}_name`,label:`明細${d+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:ue.detail},{id:`line${d}_code`,label:`明細${d+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:ue.detail},{id:`line${d}_qty`,label:`明細${d+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:ue.detail},{id:`line${d}_price`,label:`明細${d+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${d}_amount`,label:`明細${d+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${d}_retail`,label:`明細${d+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:ue.detail})});const r=e.lines.reduce((c,d)=>c+(d.amount||0),0),l=e.lines.reduce((c,d)=>c+d.quantity,0);return o.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(l),color:ue.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:ue.total}),n&&o.forEach(c=>{const d=n[c.id];d&&(c.x=d.x,c.y=d.y)}),o}function ap(e,t,n,o,r){const c=tp(e,t,o).map(u=>`
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
        色: <span style="color:${ue.header}">■ヘッダ</span>
        <span style="color:${ue.code}">■コード</span>
        <span style="color:${ue.date}">■日付</span>
        <span style="color:${ue.detail}">■明細</span>
        <span style="color:${ue.total}">■合計</span>
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
  `}function Ea(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const o=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,l=parseFloat(n.style.top)||0;t[o]={x:r,y:l}}),t}function np(e,t,n){const o=[...new Set(e.map($=>$.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map($=>$.businessTypeName||$.businessType).filter(Boolean))].sort(),l=e.filter($=>$.isAtRisk),c=e.filter($=>!$.isAtRisk&&$.isDormant),d=e.filter($=>!$.isAtRisk&&!$.isDormant&&$.amount12m>0),u=e.filter($=>!$.isAtRisk&&!$.isDormant&&$.amount12m===0),y=t.filter($=>$.lat&&$.lng),g=e.some($=>$.lat&&$.lng),f=e.length,x=e.filter($=>$.lat&&$.lng).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業 / Map</p>
        <h1>取引先マップ</h1>
        <p class="meta-note">OpenStreetMap で得意先の位置情報を可視化します。</p>
      </div>
    </section>

    ${g?x<f?`<section class="panel" style="border-left:4px solid #3b82f6;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;font-size:0.85rem;">
              📍 位置情報: <strong>${x}/${f}件</strong> 取得済み
              （未取得 ${f-x}件）
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
              「ジオコーディング実行」で住所から緯度経度を自動取得します（${f}件）。<br>
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
        <div class="kpi-value">${l.length}<span class="kpi-sub">社</span></div>
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
        ${o.map($=>`<option value="${$}" ${n.filterArea===$?"selected":""}>${$}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${r.map($=>`<option value="${$}" ${n.filterBiz===$?"selected":""}>${$}</option>`).join("")}
      </select>
    </div>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div id="customer-map" style="height:560px;width:100%;"></div>
    </section>
    <div id="map-data" style="display:none"
      data-customers="${encodeURIComponent(JSON.stringify(e))}"
      data-deliveries="${encodeURIComponent(JSON.stringify(y.map($=>({name:$.name,address:$.address,lat:$.lat,lng:$.lng,phone:$.phone}))))}"></div>

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

  `}const sp={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},op=["new","picking","packed","shipped","delivered"];function rp(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(l=>t[l.stage].push(l));const n=op.map(l=>{const c=sp[l],d=t[l];return`
      <div class="wf-col" data-wf-stage="${l}">
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
    `}).join(""),o=e.reduce((l,c)=>l+c.totalAmount,0),r=e.filter(l=>l.priority==="urgent").length;return`
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
        <p class="kpi-value">${e.filter(l=>l.stage!=="delivered").length}件</p>
        <p class="kpi-sub">処理待ち</p>
      </article>
      <article class="panel kpi-card ${r>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${r}件</p>
        <p class="kpi-sub">当日出荷</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">¥${o.toLocaleString("ja-JP")}</p>
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
  `}function ip(e,t,n){const o=e.cart.reduce((l,c)=>l+c.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((l,c)=>l+c.quantity,0)}<br/>
          <strong>¥${o.toLocaleString("ja-JP")}</strong>
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

      ${lp(e,t,n)}
    </div>
  `}function lp(e,t,n){if(e.step==="customer"){const o=e.customerQuery.toLowerCase(),r=o?t.filter(l=>l.name.toLowerCase().includes(o)||l.code.toLowerCase().includes(o)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,30).map(l=>`
            <button class="mo-item ${e.selectedCustomer?.id===l.id?"selected":""}" data-mo-select-customer="${l.id}">
              <div class="mo-item-title">${l.name}</div>
              <div class="mo-item-sub mono">${l.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const o=e.productQuery.toLowerCase(),r=o?n.filter(l=>l.name.toLowerCase().includes(o)||l.code.toLowerCase().includes(o)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,50).map(l=>{const c=e.cart.find(d=>d.productCode===l.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${l.name}</div>
                  <div class="mo-item-sub">${l.category} / JAN ${l.janCode||"―"}</div>
                </div>
                ${c?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${l.code}">−</button>
                      <span>${c.quantity}</span>
                      <button data-mo-qty="+1" data-mo-product="${l.code}">+</button>
                    </div>`:`<button class="button primary" data-mo-add-product="${l.code}">＋</button>`}
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
          ${e.cart.map((o,r)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${o.productName}</div>
                <div class="mo-item-sub">${o.quantity} × ¥${o.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${o.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${r}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((o,r)=>o+r.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const es={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},ts={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},as={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function cp(e,t){const n=e.find(l=>l.id===t)??e[0],o=e.filter(l=>l.status==="new").length,r=e.filter(l=>l.status==="confirmed").length;return`
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
      <article class="panel kpi-card ${o>0?"kpi-alert":""}">
        <p class="panel-title">未対応</p>
        <p class="kpi-value">${o}件</p>
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
          ${e.map(l=>`
            <button class="tour-item ${n?.id===l.id?"active":""}" data-tour-id="${l.id}">
              <div class="tour-item-head">
                <strong>${l.name}</strong>
                <span class="status-pill ${ts[l.status]}">${es[l.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${as[l.language]} · 👥 ${l.partySize}名
              </div>
              <div class="tour-item-sub">📅 希望日: ${l.visitDate}</div>
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
            <span class="status-pill ${ts[n.status]}">${es[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${as[n.language]}</dd></div>
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
  `}const dp=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,pp=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function up(e,t){const n=t?e.find(r=>r.id===t):null,o=t==="__new__";return`
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

    ${n||o?`
      <section class="panel">
        <div class="panel-header">
          <h2>${o?"新規送信元":"編集"}: ${n?.name??""}</h2>
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
  `}function mp(e,t,n,o){const[r,l]=t.split("-").map(m=>parseInt(m,10)),c=new Date(r,l-1,1),d=new Date(r,l,0),u=c.getDay(),y=d.getDate(),g=[];for(let m=0;m<u;m++)g.push({isOutside:!0});for(let m=1;m<=y;m++)g.push({date:new Date(r,l-1,m)});for(;g.length%7!==0;)g.push({isOutside:!0});const f=n?e.filter(m=>m.category===n):e,x={};f.forEach(m=>{const h=m.startsAt.slice(0,10);x[h]??=[],x[h].push(m)});const S=new Date().toISOString().slice(0,10),$=g.map(m=>{if(m.isOutside)return'<div class="cal-cell cal-outside"></div>';const h=m.date,b=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}-${String(h.getDate()).padStart(2,"0")}`,_=x[b]??[],w=b===S,k=h.getDay();return`
        <div class="cal-cell ${w?"cal-today":""} ${k===0?"cal-sun":k===6?"cal-sat":""}"
             data-cal-date="${b}">
          <div class="cal-day-num">${h.getDate()}</div>
          <div class="cal-events">
            ${_.slice(0,3).map(D=>`
              <button class="cal-event" data-cal-event-id="${D.id}"
                      style="background:${D.color||fn[D.category]||"#0F5B8D"};"
                      title="${D.title}">
                <span class="cal-event-time">${D.isAllDay?"終日":new Date(D.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${D.title}</span>
              </button>
            `).join("")}
            ${_.length>3?`<button class="cal-event-more" data-cal-date="${b}">+${_.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),C=o?.isOpen?yp(o):"",P=new Date(r,l-2,1),E=new Date(r,l,1),s=`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`,i=`${E.getFullYear()}-${String(E.getMonth()+1).padStart(2,"0")}`,p=(()=>{const m=new Date;return`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${r}年 ${l}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${s}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${p}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${i}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(hn).map(([m,h])=>`<option value="${m}" ${n===m?"selected":""}>${h}</option>`).join("")}
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

    ${C}
  `}function yp(e){const t=e.event;return`
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
                ${Object.entries(hn).map(([n,o])=>`<option value="${n}" ${t.category===n?"selected":""}>${o}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?ns(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?ns(t.endsAt):""}" />
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
  `}function ns(e){const t=new Date(e),n=o=>String(o).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const _t={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function hp(e,t){const n=t?e.find(o=>o.id===t):null;return`
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
            ${e.map(o=>`
              <tr>
                <td><strong>${o.name}</strong><br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${o.provider}</span></td>
                <td>
                  ${o.isEnabled?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}
                </td>
                <td>${o.lastSyncAt?o.lastSyncAt.slice(0,16).replace("T"," "):"未同期"}</td>
                <td style="font-size:12px;">${o.lastStatus??"―"}</td>
                <td>
                  <button class="button-sm secondary" data-action="int-edit" data-id="${o.id}">設定</button>
                  ${o.provider==="shopify"?`<button class="button-sm primary" data-action="int-sync-shopify" data-id="${o.id}">同期</button>`:""}
                  ${o.provider==="google_calendar"?`<button class="button-sm primary" data-action="int-sync-gcal" data-id="${o.id}">同期</button>`:""}
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
        <p class="form-hint">${_t[n.provider]?.description??""}</p>
        ${_t[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${_t[n.provider].setupUrl}" target="_blank">${_t[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(_t[n.provider]?.fields??[]).map(o=>`
            <label class="field" style="flex:1 1 100%;">
              <span>${o.label}</span>
              <input id="int-${o.key}" type="text" value="${n.config[o.key]??""}" placeholder="${o.placeholder}" />
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
  `}function fp(e,t){const n=e.reduce((l,c)=>l+c.totalAmount,0),o=e.filter(l=>l.financialStatus==="paid").length,r=e.filter(l=>l.fulfillmentStatus!=="fulfilled"&&l.fulfillmentStatus!=="shipped").length;return`
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
        <p class="kpi-sub">支払済 ${o}件</p>
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
            ${e.map(l=>`
              <tr>
                <td class="mono">${l.orderNumber}</td>
                <td>${l.orderDate.slice(0,16).replace("T"," ")}</td>
                <td>${l.customerName}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${l.customerEmail}</span></td>
                <td class="numeric">¥${l.totalAmount.toLocaleString("ja-JP")}</td>
                <td>
                  <span class="status-pill ${l.financialStatus==="paid"?"success":"warning"}">${l.financialStatus}</span>
                </td>
                <td>
                  <span class="status-pill ${l.fulfillmentStatus==="fulfilled"||l.fulfillmentStatus==="shipped"?"success":"warning"}">${l.fulfillmentStatus||"未"}</span>
                </td>
                <td style="font-size:12px;">${l.lineItems.map(c=>`${c.name} ×${c.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function gp(e,t,n){return`
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
            ${e.map(o=>`
              <tr>
                <td>${o.receivedAt.slice(0,16).replace("T"," ")}</td>
                <td>${o.senderName??"―"}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${o.senderPhone??""}</span></td>
                <td>
                  <span class="status-pill ${o.ocrStatus==="done"?"success":o.ocrStatus==="failed"?"warning":"neutral"}">${o.ocrStatus}</span>
                </td>
                <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--text-secondary);">${(o.ocrText??"").slice(0,80)}</td>
                <td>${o.linkedInvoiceId?`<span class="mono">${o.linkedInvoiceId}</span>`:"未連携"}</td>
                <td>
                  <button class="button-sm secondary" data-action="fax-view" data-id="${o.id}">詳細</button>
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
  `}function vp(e,t,n){const o=t==="__new__"?null:e.find(c=>c.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${ia[c.department]}</td>
                <td>${ra[c.role]}</td>
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

    ${o||r?`
      <section class="panel">
        <div class="panel-header">
          <h2>${r?"新規ユーザー":`${o?.displayName} 編集`}</h2>
        </div>
        ${r?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${o?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${o?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${o?"readonly":""} />
          </label>
          ${r?`<label class="field" style="flex:1 1 200px;">
                  <span>初期パスワード *</span>
                  <input id="user-password" type="password" placeholder="8文字以上" />
                </label>`:""}
          <label class="field" style="flex:1 1 120px;">
            <span>担当者コード</span>
            <input id="user-code" type="text" value="${o?.staffCode??""}" placeholder="S001" />
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>部署</span>
            <select id="user-dept">
              ${Object.entries(ia).map(([c,d])=>`<option value="${c}" ${o?.department===c?"selected":""}>${d}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(ra).map(([c,d])=>`<option value="${c}" ${o?.role===c?"selected":""}>${d}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 160px;">
            <span>電話</span>
            <input id="user-phone" type="tel" value="${o?.phone??""}" placeholder="090-1234-5678" />
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="user-active" type="checkbox" ${o?.isActive!==!1?"checked":""} />
            有効
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="user-cancel">キャンセル</button>
          <button class="button primary" data-action="user-save" data-id="${o?.id??""}">保存</button>
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
    `}function bp(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${ia[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${ra[e.role]}</dd></div>
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
          ${n.map(o=>`<option value="${o.id}" ${e.defaultMailSenderId===o.id?"selected":""}>${o.name} &lt;${o.email}&gt;</option>`).join("")}
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
              ${t.slice(0,20).map(o=>`
                <tr>
                  <td style="font-size:12px;">${o.createdAt.slice(0,16).replace("T"," ")}</td>
                  <td><strong>${o.action}</strong></td>
                  <td style="font-size:12px;">${o.entityType??""} ${o.entityId??""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`}
    </section>
  `:`
      <section class="page-head"><div><h1>プロフィール</h1></div></section>
      <section class="panel"><p>プロフィール未登録です。ログインしてください。</p></section>
    `}function wp(e){const t={};return e.forEach(n=>{const o=n.userEmail??"(anonymous)";t[o]=(t[o]??0)+1}),`
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
  `}function xp(e){const t=e.prospects.reduce((l,c)=>l+c.expectedAmount,0),n=e.prospects.reduce((l,c)=>l+c.expectedAmount*c.probability/100,0),o=e.prospects.filter(l=>l.stage==="won").length,r=e.prospects.filter(l=>l.stage==="hot"||l.stage==="negotiating").length;return`
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
        <p class="kpi-value">${o}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?$p(e.prospects):_p(e.prospects)}

    ${Sp(e)}
  `}function $p(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(o=>{const r=e.filter(c=>c.stage===o),l=r.reduce((c,d)=>c+d.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${o}">
          <div class="pk-col-header" style="--pk-color:${gn[o]};">
            <span class="pk-col-label">${ha[o]}</span>
            <span class="pk-col-count">${r.length}</span>
          </div>
          <div class="pk-col-sub">¥${l.toLocaleString("ja-JP")}</div>
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
  `}function _p(e){return`
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
                <td><span class="status-pill" style="background:${gn[t.stage]};color:white;">${ha[t.stage]}</span></td>
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
  `}function Sp(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(o=>o.id===e.editingId);return!t&&!n?"":`
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
                ${["","飲食店","酒店","百貨店","スーパー","宿泊","小売","卸","その他"].map(o=>`<option value="${o}" ${n?.businessType===o?"selected":""}>${o||"―"}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>ステージ</span>
              <select id="prospect-stage">
                ${Object.entries(ha).map(([o,r])=>`<option value="${o}" ${n?.stage===o?"selected":""}>${r}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>流入元</span>
              <select id="prospect-source">
                ${["","展示会","紹介","WEB","コールド","問合せ","リピート"].map(o=>`<option value="${o}" ${n?.source===o?"selected":""}>${o||"―"}</option>`).join("")}
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
            ${e.activities.slice(0,10).map(o=>`
              <div>
                <dt>${o.activityDate.slice(0,10)} - ${o.activityType}</dt>
                <dd>${o.title??""} ${o.result?`→ ${o.result}`:""}</dd>
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
  `}function kp(e,t,n){const o=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
          <input id="slack-webhook" type="text" value="${o}" placeholder="https://hooks.slack.com/services/..." />
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
            ${t.map(l=>`
              <tr>
                <td>${la[l.eventType]||l.eventType}</td>
                <td>
                  <label style="display:flex;align-items:center;gap:6px;">
                    <input type="checkbox" data-slack-rule-id="${l.id}" data-slack-field="enabled" ${l.enabled?"checked":""} />
                    ${l.enabled?"ON":"OFF"}
                  </label>
                </td>
                <td>
                  <input type="text" data-slack-rule-id="${l.id}" data-slack-field="channel" value="${l.channel}" style="width:180px;padding:4px 8px;" />
                </td>
                <td style="font-size:12px;color:var(--text-secondary);">${l.lastTriggeredAt?l.lastTriggeredAt.slice(0,16).replace("T"," "):"未通知"}</td>
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
            ${n.map(l=>`
              <tr>
                <td style="font-size:12px;">${l.sentAt.slice(0,16).replace("T"," ")}</td>
                <td>${la[l.eventType]||l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status==="sent"?"success":"warning"}">${l.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Pp(e,t,n,o){const r=new Map(t.map(f=>[f.code,f])),l=e.filter(f=>f.callDirection==="inbound").length,c=e.filter(f=>f.callDirection==="outbound").length,d=e.filter(f=>f.callStatus==="missed").length,u=e.reduce((f,x)=>f+(x.durationSeconds??0),0),y=f=>{if(f===0)return"―";const x=Math.floor(f/60),S=f%60;return x>0?`${x}分${S}秒`:`${S}秒`},g=f=>{if(f.matchedCustomerCode){const x=r.get(f.matchedCustomerCode);if(x)return`${x.name} (既存)`}return"未登録番号"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">IVRy 電話連携</p>
        <h1>通話履歴</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="ivry-sync" ${o?"":"disabled"}>🔄 IVRyから同期</button>
        <button class="button secondary" data-action="ivry-push-phonebook" ${o?"":"disabled"}>📱 電話帳を送信</button>
      </div>
    </section>

    ${o?"":`
      <section class="panel">
        <p class="form-hint" style="margin:0;">
          ⚠️ IVRy連携が無効です。<a href="#" data-link="/integrations">連携設定</a>からAPIキーを設定してください。
        </p>
      </section>
    `}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">着信</p>
        <p class="kpi-value">${l}件</p>
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
            ${e.map(f=>`
              <tr>
                <td style="font-size:12px;">${f.startedAt?new Date(f.startedAt).toLocaleString("ja-JP"):"―"}</td>
                <td>
                  ${f.callDirection==="inbound"?'<span class="status-pill neutral">📞 着信</span>':'<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${g(f)}</strong>
                  ${f.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${f.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${f.callDirection==="inbound"?f.fromNumber:f.toNumber}</td>
                <td>
                  ${f.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':f.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${f.callStatus}</span>`}
                </td>
                <td>${y(f.durationSeconds??0)}</td>
                <td>${f.recordingUrl?`<a href="${f.recordingUrl}" target="_blank" class="button-sm secondary">🎧 再生</a>`:"―"}</td>
                <td>
                  ${f.matchedCustomerCode?"":`<button class="button-sm secondary" data-action="call-link-customer" data-id="${f.id}" data-phone="${f.callDirection==="inbound"?f.fromNumber:f.toNumber}">顧客に紐付け</button>`}
                  <button class="button-sm secondary" data-action="call-memo" data-id="${f.id}">メモ</button>
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
  `}const Ep=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function Ap(e){const t=e.activeListId?e.lists.find(l=>l.id===e.activeListId):null,n=e.items.filter(l=>l.status==="new").length,o=e.items.filter(l=>l.status==="imported").length,r=e.items.filter(l=>l.status==="excluded").length;return`
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
            ${Ep.map(l=>`<option value="${l}" ${e.searchBusinessType===l?"selected":""}>${l}</option>`).join("")}
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
                ${e.searchResults.map((l,c)=>`
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${c}" checked /></td>
                    <td><strong>${l.companyName}</strong></td>
                    <td style="font-size:12px;">${l.address??"―"}</td>
                    <td class="numeric">${l.rating?`⭐${l.rating}`:"―"}</td>
                    <td class="numeric">${l.reviewCount??"―"}</td>
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
        ${e.lists.map(l=>`
          <button class="button ${e.activeListId===l.id?"primary":"secondary"}"
                  data-action="lb-select-list" data-id="${l.id}">
            ${l.name} (${l.totalCount})
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
            <span>✅ 取込済: <strong>${o}</strong></span>
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
              ${e.items.map(l=>`
                <tr ${l.status==="excluded"?'style="opacity:0.4;"':""}>
                  <td>${l.status==="new"?`<input type="checkbox" class="lb-item-check" data-id="${l.id}" />`:""}</td>
                  <td><strong>${l.companyName}</strong></td>
                  <td style="font-size:12px;">${l.address??"―"}</td>
                  <td class="mono" style="font-size:12px;">${l.phone??"―"}</td>
                  <td class="numeric">${l.rating?`⭐${l.rating}(${l.reviewCount??0})`:"―"}</td>
                  <td>
                    ${l.status==="new"?'<span class="status-pill neutral">新規</span>':l.status==="imported"?'<span class="status-pill success">取込済</span>':'<span class="status-pill warning">除外</span>'}
                  </td>
                  <td>
                    ${l.status==="new"?`<button class="button-sm secondary" data-action="lb-exclude" data-id="${l.id}">除外</button>`:""}
                    ${l.status==="new"?`<button class="button-sm primary" data-action="lb-convert-one" data-id="${l.id}">→見込客</button>`:""}
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
  `}const ss={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Lp={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Cp={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function $e(e){return"¥"+e.toLocaleString("ja-JP")}function Ct(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function zo(e,t){const n=e.reduce((l,c)=>l+c.amount,0),o=Math.floor(n*t),r=n+o;return{subtotal:n,taxAmount:o,total:r}}const de={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function pe(e,t){const n=e.align??"left",o=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${o}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Aa(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),o=n-2018;return{y:o>0?String(o).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Dp(e,t,n){const o=Aa(e.documentDate),r=Aa(e.orderDate??e.documentDate),l=Aa(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((P,E)=>{const s=de.detailStartY+E*de.detailRowH,i=de.detailCols,p=[],m=(h,b)=>{b&&p.push(pe({...h,y:s,x:h.x+0},b))};return m(i.productName,P.productName+(P.spec?` ${P.spec}`:"")),m(i.productCode,P.productCode),m(i.color,P.color??""),m(i.size,[P.size,P.caseQty?`×${P.caseQty}`:""].filter(Boolean).join(" ")),m(i.unit,P.unit),m(i.quantity,P.quantity>0?P.quantity.toLocaleString("ja-JP"):""),m(i.correctedQty,P.correctedQuantity?P.correctedQuantity.toLocaleString("ja-JP"):""),m(i.discount,P.discount?P.discount.toLocaleString("ja-JP"):""),m(i.unitPrice,P.unitPrice>0?P.unitPrice.toLocaleString("ja-JP"):""),m(i.costAmount,P.amount>0?P.amount.toLocaleString("ja-JP"):""),m(i.retailPrice,P.retailPrice?P.retailPrice.toLocaleString("ja-JP"):""),m(i.note,P.receivedAmount?P.receivedAmount.toLocaleString("ja-JP"):""),p.join("")}).join(""),d=e.lines.reduce((P,E)=>P+(E.amount||0),0),u=e.lines.reduce((P,E)=>P+(E.retailPrice||0)*(E.correctedQuantity??E.quantity),0),y=e.lines.reduce((P,E)=>P+(E.receivedAmount||0),0),g=e.lines.reduce((P,E)=>P+(E.returnAmount||0),0),f=e.lines.reduce((P,E)=>P+E.quantity,0),x=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",S=n.calibrationOffsetX||0,$=n.calibrationOffsetY||0,C=`transform: translate(${S}mm, ${$}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${x}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${C}">
        ${pe(de.currentDateY,o.y)}
        ${pe(de.currentDateM,o.m)}
        ${pe(de.currentDateD,o.d)}
        ${pe(de.documentNo,e.documentNo)}
        ${e.settlementPrint?pe(de.settlementCheck,"✓"):""}

        ${pe(de.vendorName,t.name)}
        ${pe(de.vendorAddress,t.address1)}
        ${pe(de.chainStoreCode,e.chainStoreCode??"")}
        ${pe(de.categoryCode,e.categoryCode??"")}
        ${pe(de.slipNumber,e.documentNo)}
        ${pe(de.vendorCode,e.slipTypeCode??"")}

        ${pe(de.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${pe(de.orderDateY,r.y)}
        ${pe(de.orderDateM,r.m)}
        ${pe(de.orderDateD,r.d)}
        ${pe(de.deliveryDateY,l.y)}
        ${pe(de.deliveryDateM,l.m)}
        ${pe(de.deliveryDateD,l.d)}
        ${pe(de.orderNo,e.orderNo??"")}
        ${pe(de.partnerCode,e.vendorCode??"")}

        ${c}

        ${pe(de.totalQty,f.toLocaleString("ja-JP"))}
        ${pe(de.receivedTotal,y.toLocaleString("ja-JP"))}
        ${pe(de.returnTotal,g.toLocaleString("ja-JP"))}
        ${pe(de.correctedCostTotal,d.toLocaleString("ja-JP"))}
        ${pe(de.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function qp(e,t,n){const{subtotal:o,taxAmount:r,total:l}=zo(e.lines,e.taxRate),c=e.previousBalance??0,d=e.paymentAmount??0,u=c-d+l,y=e.lines.map(f=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${f.note??""}</td>
        <td>${f.productName}${f.spec?` <span style="color:#636e72;font-size:9pt;">/ ${f.spec}</span>`:""}</td>
        <td class="numeric">${f.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${f.unit}</td>`:""}
        <td class="numeric">${$e(f.unitPrice)}</td>
        <td class="numeric">${$e(f.amount)}</td>
      </tr>
    `).join(""),g=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
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
        <div><dt>請求日</dt><dd>${Ct(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${Ct(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${$e(u)}</span>
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
        <tbody>${y}${g}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${$e(o)} / 消費税: ${$e(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${$e(c)}</td></tr>`:""}
          ${d?`<tr><th>ご入金額</th><td>▲ ${$e(d)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${$e(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${$e(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${$e(u)}</td></tr>
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
  `}function Tp(e,t,n){const{subtotal:o,taxAmount:r,total:l}=zo(e.lines,e.taxRate),c=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${$e(u.unitPrice)}</td>
        <td class="numeric">${$e(u.amount)}</td>
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
        <div><dt>見積日</dt><dd>${Ct(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${Ct(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${$e(l)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${$e(o)} / 消費税: ${$e(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${$e(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${$e(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${$e(l)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?Ct(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function Ip(e,t,n,o){let r="";switch(e){case"chain_store":r=Dp(o,n,t);break;case"quotation":r=Tp(o,n,t);break;case"invoice_monthly":r=qp(o,n,t);break}const l=Object.keys(ss).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${ss[u]}</button>`).join(""),c=o.lines.map((u,y)=>`
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
      <div class="tab-group">${l}</div>
    </div>

    <div class="print-layout no-print">
      <!-- 左: 設定 -->
      <div class="print-settings">

        <div class="panel">
          <h3 class="panel-title" style="margin-bottom:12px;">書類情報</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <label class="field" style="flex:1 1 120px;">
              <span>書類番号</span>
              <input type="text" data-print-field="documentNo" value="${o.documentNo}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>日付</span>
              <input type="date" data-print-field="documentDate" value="${o.documentDate}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>得意先名</span>
              <input type="text" data-print-field="customerName" value="${o.customerName}" />
            </label>
            <label class="field" style="flex:1 1 60px;">
              <span>敬称</span>
              <select data-print-field="customerHonorific">
                <option value="御中" ${o.customerHonorific==="御中"?"selected":""}>御中</option>
                <option value="様" ${o.customerHonorific==="様"?"selected":""}>様</option>
              </select>
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>税率</span>
              <select data-print-field="taxRate">
                <option value="0.10" ${o.taxRate===.1?"selected":""}>10%</option>
                <option value="0.08" ${o.taxRate===.08?"selected":""}>8%</option>
              </select>
            </label>
            ${e==="invoice_monthly"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>お支払期限</span>
                  <input type="date" data-print-field="dueDate" value="${o.dueDate??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>前回請求額</span>
                  <input type="number" data-print-field="previousBalance" value="${o.previousBalance??0}" />
                </label>`:""}
            ${e==="chain_store"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>柱店CD</span>
                  <input type="text" data-print-field="chainStoreCode" value="${o.chainStoreCode??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>伝票区分</span>
                  <input type="text" data-print-field="slipTypeCode" value="${o.slipTypeCode??""}" />
                </label>`:""}
          </div>
        </div>

        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 class="panel-title">明細 (${o.lines.length}行)</h3>
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
  `}const Mp={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},Np={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Fo(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],o="",r=!1;for(let d=0;d<e.length;d++){const u=e[d];r?u==='"'?e[d+1]==='"'?(o+='"',d++):r=!1:o+=u:u==='"'?r=!0:u===","?(n.push(o),o=""):u===`
`||u==="\r"?(u==="\r"&&e[d+1]===`
`&&d++,n.push(o),n.some(y=>y!=="")&&t.push(n),n=[],o=""):o+=u}if((o!==""||n.length>0)&&(n.push(o),n.some(d=>d!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const l=t[0].map(d=>d.trim()),c=[];for(let d=1;d<t.length;d++){const u={};l.forEach((y,g)=>{u[y]=(t[d][g]??"").trim()}),c.push(u)}return{columns:l,rows:c}}function Vo(e,t,n){const o=Mp[e],r=o.filter(d=>!t.includes(d)),l=n.map(d=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const y of o)t.includes(y)&&!d[y]&&u.push(`${y}が空`);return{...d,_valid:u.length===0,_error:u[0]}}),c=l.filter(d=>d._valid).length;return{entity:e,columns:t,rows:l,totalRows:n.length,validRows:c,invalidRows:l.length-c}}function Yo(e){const n=Np[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function Uo(e,t){const{supabaseInsert:n}=await N(async()=>{const{supabaseInsert:d}=await Promise.resolve().then(()=>te);return{supabaseInsert:d}},void 0);let o=0,r=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const d of t){if(!d._valid)continue;const{_valid:u,_error:y,...g}=d,f={...g};if(!f.id){const x=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";f.id=String(g[x]??`${e}-${Date.now()}-${o+r}`)}for(const x of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof f[x]=="string"&&f[x]!==""){const S=Number(f[x]);Number.isFinite(S)&&(f[x]=S)}try{await n(c,f)!==null?o++:r++}catch{r++}}return{inserted:o,failed:r}}const Rp=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Yo,importToSupabase:Uo,parseCSV:Fo,validateImport:Vo},Symbol.toStringTag,{value:"Module"}));function La(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Op(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Bp(e,t,n,o,r){const l=n.reduce((y,g)=>y+g.rowCount,0),c=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,d=100,u=Math.max(1,Math.ceil(r/d));return`
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
        <p class="kpi-value">${l.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">全テーブル合計</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value">${c?La(c):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?La(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((o-1)*d+1).toLocaleString("ja-JP")}-${Math.min(o*d,r).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${o<=1?"disabled":""}>← 前</button>
          <span style="padding:0 8px;">${o} / ${u}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${o>=u?"disabled":""}>次 →</button>
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
              <td>${y._synced_at?La(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${Op(y._raw_b64)}</td>
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
  `}const nt=400,st=240;function re(e){return e.toLocaleString("ja-JP")}function Ca(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function jp(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function Me(e,t,n,o=""){return`<th class="${o}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${jp(n,t)}</th>`}function St(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function zp(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const o=e.products.slice().sort((E,s)=>(e.productTotals[s.code]??0)-(e.productTotals[E.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],l=820,c=280,d={top:20,right:20,bottom:40,left:60},u=l-d.left-d.right,y=c-d.top-d.bottom,g=t.map(E=>o.reduce((s,i)=>s+(n[i.code]?.[E]??0),0)),f=Math.max(...g,1),x=u/t.length,S=Math.max(x-10,14),$=[0,.25,.5,.75,1].map(E=>{const s=d.top+y-y*E,i=`${Math.round(f*E/100)*100}`;return`
      <line x1="${d.left}" y1="${s}" x2="${l-d.right}" y2="${s}" class="chart-grid" />
      <text x="6" y="${s+4}" class="chart-axis">${Number(i).toLocaleString("ja-JP")}</text>
    `}).join(""),C=t.map((E,s)=>{let i=d.top+y;const p=d.left+s*x+(x-S)/2,m=o.map((D,L)=>{const I=(n[D.code]?.[E]??0)/f*y;return i-=I,`<rect x="${p}" y="${i}" width="${S}" height="${I}" fill="${r[L%r.length]}" opacity="0.85" rx="${L===o.length-1?3:0}" />`}).join(""),[h,b]=E.split("-"),_=parseInt(b),w=_===1||s%3===0,k=_===1?`${h.slice(2)}年`:`${_}月`;return`<g>${m}${w?`<text x="${p+S/2}" y="${c-10}" class="chart-axis centered-axis">${k}</text>`:""}</g>`}).join(""),P=o.map((E,s)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[s%r.length]};"></span>
       ${E.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${$}${C}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${P}</div>
  `}function Fp(e){const{months:t,products:n}=e,o=n.slice().sort((c,d)=>(e.productTotals[d.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),r=t.map(c=>{const[d,u]=c.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${d.slice(2)}年1月`:`${y}月`}</th>`}).join(""),l=o.map(c=>{const d=t.map(u=>{const y=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${y>0?re(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${c.code}</td>
        <td style="white-space:nowrap;">${c.name}</td>
        ${d}
        <td class="numeric"><strong>${re(e.productTotals[c.code]??0)}</strong></td>
        <td class="numeric">${re(Math.round(e.productAvg[c.code]??0))}</td>
        <td class="numeric">${re(Math.round(e.productStdDev[c.code]??0))}</td>
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
        <tbody>${l||`<tr><td colspan="${t.length+5}" class="empty-row">データなし</td></tr>`}</tbody>
      </table>
    </div>
  `}function Vp(e,t){const n=e.months[e.months.length-1]??"",o=e.months[e.months.length-2]??"",r=e.months.length-13,l=r>=0?e.months[r]:"",c=e.products.reduce((S,$)=>S+(e.matrix[$.code]?.[n]??0),0),d=e.products.reduce((S,$)=>S+(e.matrix[$.code]?.[o]??0),0),u=l?e.products.reduce((S,$)=>S+(e.matrix[$.code]?.[l]??0),0):0,y=d>0?(c-d)/d*100:0,g=u>0?(c-u)/u*100:0,f=S=>S>=0?"+":"",x=[1,2,3,5].map(S=>`<option value="${S}" ${S===t?"selected":""}>${S}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${re(c)} 本</p>
        <p class="kpi-sub">${Ca(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${f(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${Ca(o)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${g>=0?"":"text-danger"}">${u>0?`${f(g)}${g.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${l?`${Ca(l)} 比`:"前年データなし"}</p>
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
            <select data-action="demand-years-back" style="width:80px;">${x}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${zp(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${Fp(e)}
    </section>
  `}function Yp(e,t){const o=e.slice().sort((l,c)=>{if(!t)return 0;const d=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return d*l.productName.localeCompare(c.productName,"ja");case"ss-avg":return d*(l.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return d*(l.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(St(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(St(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-y)}case"ss-rop":{const u=Math.ceil(l.avgMonthlyDemand*(l.leadTimeDays/30)+St(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+St(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-y)}default:return 0}}).map(l=>{const c=St(l.serviceLevel),d=l.leadTimeDays/30,u=Math.ceil(c*l.demandStdDev*Math.sqrt(d)),y=Math.ceil(l.avgMonthlyDemand*d+u),g=u-l.safetyStockQty,f=g>0?"text-danger":g<-u*.3?"text-warning":"",x=[.9,.95,.99].map(S=>`<option value="${S}" ${Math.abs(l.serviceLevel-S)<.01?"selected":""}>${(S*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${l.productName}</td>
        <td class="numeric">${re(Math.round(l.avgMonthlyDemand))}</td>
        <td class="numeric">${re(Math.round(l.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${l.leadTimeDays}"
            data-action="ss-lead-time" data-code="${l.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${l.productCode}"
            style="width:64px;">${x}</select>
        </td>
        <td class="numeric"><strong>${re(u)}</strong></td>
        <td class="numeric">${re(y)}</td>
        <td class="numeric ${f}">
          ${g>0?`+${re(g)}`:re(g)}
          ${g>0?'<span class="status-pill warning" style="margin-left:4px">不足</span>':""}
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
          <select id="bulk-service-level" style="width:90px;">${[.9,.95,.99].map(l=>`<option value="${l}" ${l===.95?"selected":""}>${(l*100).toFixed(0)}%</option>`).join("")}</select>
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
              ${Me("商品名","ss-name",t)}
              ${Me("月平均需要","ss-avg",t,"numeric")}
              ${Me("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${Me("安全在庫[算出]","ss-ss",t,"numeric")}
              ${Me("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${o||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const Up={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Jp(e,t,n,o,r=[],l={partCapacity:nt,empCapacity:st}){const c={draft:"下書き",confirmed:"確定",actual:"実績入力済"},d={draft:"neutral",confirmed:"info",actual:"success"},u=R=>Object.entries(Up).map(([M,j])=>`<option value="${M}" ${M===R?"selected":""}>${j}</option>`).join(""),y=640,g=e.filter(R=>R.plannedQty>0||Math.max(0,R.demandForecast+R.safetyStockTarget-R.openingStock)>0),f=r.length>0?Ka(g,r,l):[],[x,S]=t.split("-").map(Number),$=S===12?`${x+1}-01`:`${x}-${String(S+1).padStart(2,"0")}`,C=Dt($,1,0),P=C.length>0?Ka(g,C,l):[],E=new Map;for(const R of[...f,...P])for(const M of R.items)E.has(M.productCode)||E.set(M.productCode,[]),E.get(M.productCode).push({date:R.date,qty:M.qty});const s=R=>R.map(M=>{const j=Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock),Y=M.plannedQty>0?M.plannedQty:Math.round(j),J=Y>0?Math.ceil(Y/y*10)/10:0,W=M.plannedQty>0?(M.actualQty-M.plannedQty)/M.plannedQty*100:null,Q=W!==null?W>=0?"text-success":"text-danger":"",H=E.get(M.productCode)??[],X=H.length>0?H.map(ee=>{const ie=ee.date.slice(5).replace("-","/");return`<span style="font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;display:inline-block;${ee.date.startsWith($)?"background:#fef3c7;color:#92400e;":"background:#dbeafe;color:#1e40af;"}" title="${ee.date}">${ie}(${ee.qty})</span>`}).join(""):'<span style="font-size:9px;color:var(--text-disabled);">—</span>';return`
      <tr>
        <td style="white-space:nowrap;">${M.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${M.productCode}"
            style="width:92px;">${u(M.productionType)}</select>
        </td>
        <td class="numeric">${re(Math.round(M.demandForecast))}</td>
        <td class="numeric">${re(Math.round(M.safetyStockTarget))}</td>
        <td class="numeric">${re(Math.round(M.openingStock))}</td>
        <td class="numeric"><strong>${re(Math.round(j))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${M.plannedQty}"
            data-action="plan-qty" data-code="${M.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td style="max-width:200px;overflow-x:auto;white-space:nowrap;">${X}</td>
        <td class="numeric">
          <input class="input-sm" type="number" min="0"
            value="${M.actualQty||""}"
            data-action="plan-actual-qty" data-code="${M.productCode}"
            placeholder="0"
            style="width:70px;text-align:right;" />
        </td>
        <td class="numeric ${Q}">
          ${W!==null?`${W>=0?"+":""}${W.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${J>0?`${J.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${d[M.status]??"neutral"}">${c[M.status]??M.status}</span>
        </td>
      </tr>
    `}).join(""),p=(n==="all"?e:e.filter(R=>R.productionType===n)).slice().sort((R,M)=>{if(!o)return 0;const j=o.dir==="asc"?1:-1,Y=Math.max(0,R.demandForecast+R.safetyStockTarget-R.openingStock),J=Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock);switch(o.column){case"plan-name":return j*R.productName.localeCompare(M.productName,"ja");case"plan-forecast":return j*(R.demandForecast-M.demandForecast);case"plan-required":return j*(Y-J);case"plan-planned":return j*(R.plannedQty-M.plannedQty);case"plan-actual":return j*(R.actualQty-M.actualQty);case"plan-label":{const W=R.plannedQty>0?R.plannedQty:Math.round(Y),Q=M.plannedQty>0?M.plannedQty:Math.round(J);return j*(W-Q)}default:return 0}}),m=s(p),h=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],b=R=>{const j=(R==="all"?e:e.filter(Y=>Y.productionType===R)).reduce((Y,J)=>{const W=Math.max(0,J.demandForecast+J.safetyStockTarget-J.openingStock);return Y+(J.plannedQty>0?J.plannedQty:Math.round(W))},0);return Math.ceil(j/y*10)/10},_=h.filter(R=>R.key!=="all").map(R=>{const M=b(R.key),j=e.filter(J=>J.productionType===R.key).length,Y=R.key==="make_to_order"?e.filter(J=>J.productionType==="make_to_order"&&J.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${R.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${M>0?M.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${j}商品${Y!==null?` · 受注${Y}件`:""}</p>
      </div>
    `}).join(""),w=p.reduce((R,M)=>R+M.demandForecast,0),k=p.reduce((R,M)=>R+Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock),0),D=p.reduce((R,M)=>R+M.plannedQty,0),L=p.reduce((R,M)=>R+M.actualQty,0),q=b(n),I=new Date,B=Array.from({length:24},(R,M)=>{const j=new Date(I.getFullYear(),I.getMonth()-6+M,1),Y=`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`;return`<option value="${Y}" ${Y===t?"selected":""}>${Y.replace("-","年")}月</option>`}).join(""),O=h.map(R=>`<button class="button ${n===R.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${R.key}"
       style="padding:4px 12px;font-size:13px;">${R.label}</button>`).join("");return`
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
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${_}</div>
    </section>

    ${r.length>0?(()=>{const R=r.filter(j=>j.partTimers>0||j.employees>0),M=R.map(j=>{const Y=parseInt(j.date.slice(8)),J=["日","月","火","水","木","金","土"][new Date(j.date).getDay()];return`<span style="font-size:10px;padding:2px 5px;border-radius:3px;background:#dbeafe;color:#1e40af;margin:1px;display:inline-block;">${Y}(${J})</span>`}).join("");return`<div style="background:var(--surface-alt);border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;">
        <div style="margin-bottom:4px;"><strong>${t.replace("-","年")}月 稼働日: ${R.length}日</strong>
          <span style="color:var(--text-secondary);margin-left:8px;">翌月: ${$.replace("-","年")}月</span></div>
        <div style="line-height:1.8;">${M}</div>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${O}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${Me("商品名","plan-name",o)}
              <th>生産区分</th>
              ${Me("需要予測","plan-forecast",o,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${Me("必要生産数","plan-required",o,"numeric")}
              ${Me("計画数","plan-planned",o,"numeric")}
              <th style="white-space:nowrap;">製造予定</th>
              ${Me("実績数","plan-actual",o,"numeric")}
              <th class="numeric">達成率</th>
              ${Me("ラベル工数","plan-label",o,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${m||'<tr><td colspan="12" class="empty-row">データなし</td></tr>'}
            ${p.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${re(Math.round(w))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${re(Math.round(k))}</td>
                <td class="numeric">${re(D)}</td>
                <td>—</td>
                <td class="numeric">${L>0?re(L):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${q.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Jo(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return Array.from({length:o},(r,l)=>{const c=l+1;return`${e}-${String(c).padStart(2,"0")}`})}function os(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function rs(e){const t=new Date(e).getDay();return t===0||t===6}function Hp(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Ho(e){return e.partTimers+e.employees}function ze(e,t,n={partCapacity:nt,empCapacity:st}){const o=e.filter(g=>g.partTimers>0||g.employees>0);if(o.length===0)return;const r=t.reduce((g,f)=>{const x=f.plannedQty>0?f.plannedQty:Math.max(0,f.demandForecast+f.safetyStockTarget-f.openingStock);return g+x},0);if(r<=0)return;const l=r/o.length;let c=0,d=0,u=1/0;const y=Math.ceil(l/n.partCapacity);for(let g=0;g<=y;g++){const f=l-g*n.partCapacity,x=f>0?Math.ceil(f/n.empCapacity):0,S=g+x;S<u&&(u=S,c=g,d=x)}for(const g of e)g.confirmed||(g.partTimers>0||g.employees>0)&&(g.partTimers=c,g.employees=d)}function Ka(e,t,n={partCapacity:nt,empCapacity:st}){const o=t.filter(d=>Ho(d)>0).map(d=>d.date).sort();if(o.length===0)return t.map(d=>({date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(d=>d.plannedQty>0||Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)>0).map(d=>({productCode:d.productCode,productName:d.productName,productionType:d.productionType,remaining:d.plannedQty>0?d.plannedQty:Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)})).filter(d=>d.remaining>0).sort((d,u)=>(r[d.productionType]??99)-(r[u.productionType]??99)||u.remaining-d.remaining),c=new Map;for(const d of t){const u=Hp(d,n);c.set(d.date,{date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const d of l){let u=d.remaining;if(u<=0)continue;if(o.reduce((g,f)=>{const x=c.get(f);return g+Math.max(0,x.capacity-x.totalQty)},0)<=0)break;for(const g of o){if(u<=0)break;const f=c.get(g),x=Math.max(0,f.capacity-f.totalQty);if(x<=0)continue;const S=Math.min(u,x);f.items.push({productCode:d.productCode,productName:d.productName,productionType:d.productionType,qty:S}),f.totalQty+=S,f.utilization=f.capacity>0?f.totalQty/f.capacity:0,u-=S}}return t.map(d=>c.get(d.date))}function Dt(e,t=1,n=1){return Jo(e).map(o=>({date:o,partTimers:rs(o)?0:t,employees:rs(o)?0:n,confirmed:!1}))}function Kp(e,t,n,o=null,r=new Set,l={partCapacity:nt,empCapacity:st}){const c=Jo(t),d=e.filter(L=>!r.has(L.productCode)),u=Ka(d,n,l),y=new Map(u.map(L=>[L.date,L])),g=d.reduce((L,q)=>L+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0),x=e.reduce((L,q)=>L+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0)-g,S=u.reduce((L,q)=>L+q.totalQty,0),$=n.filter(L=>Ho(L)>0).length,C=u.reduce((L,q)=>L+q.capacity,0),P=n.reduce((L,q)=>L+q.partTimers,0),E=n.reduce((L,q)=>L+q.employees,0),s=$>0?Math.ceil(g/$):0,i=new Date,p=Array.from({length:24},(L,q)=>{const I=new Date(i.getFullYear(),i.getMonth()-6+q,1),B=`${I.getFullYear()}-${String(I.getMonth()+1).padStart(2,"0")}`;return`<option value="${B}" ${B===t?"selected":""}>${B.replace("-","年")}月</option>`}).join(""),m=new Date(c[0]).getDay(),h=[];for(let L=0;L<m;L++)h.push('<div style="min-height:44px;"></div>');for(const L of c){const q=y.get(L),I=new Date(L).getDay(),B=parseInt(L.split("-")[2]),O=q?.partTimers??0,R=q?.employees??0,M=O+R,j=q?.totalQty??0,Y=q?.utilization??0,J=L===o,W=M===0?"var(--surface-alt)":Y>.95?"rgba(197,61,61,0.12)":Y>.7?"rgba(183,121,31,0.10)":Y>0?"rgba(47,133,90,0.08)":"var(--surface)",Q=M===0?"transparent":Y>.95?"#c53d3d":Y>.7?"#b7791f":Y>0?"#2f855a":"var(--border)",H=I===0?"#c53d3d":I===6?"#0F5B8D":"var(--text)",X=M>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${O>0?`パ${O}`:""}${R>0?`社${R}`:""}</span>`:"";h.push(`
      <div data-action="cal-toggle-day" data-date="${L}"
        style="min-height:72px;padding:3px;border:${J?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${W};cursor:pointer;display:flex;flex-direction:column;
          ${J?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${H};line-height:1;">${B}</span>
          ${X}
        </div>
        ${M>0?`
          ${q&&q.items.length>0?`<div style="margin-top:2px;overflow:hidden;flex:1;">${q.items.slice(0,3).map(ee=>`<div style="font-size:7px;line-height:1.2;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${ee.productName.slice(0,6)} ${ee.qty}</div>`).join("")}${q.items.length>3?`<div style="font-size:7px;color:var(--text-disabled);">+${q.items.length-3}品</div>`:""}</div>`:""}
          <div style="font-size:10px;font-weight:600;color:var(--text);line-height:1;">${j>0?re(j):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:1px;">
            <div style="height:100%;width:${Math.min(Y*100,100)}%;background:${Q};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const _=h.length%7;if(_>0)for(let L=0;L<7-_;L++)h.push('<div style="min-height:44px;"></div>');const w=o?y.get(o):null;o&&n.find(L=>L.date===o);const k=o&&w?(()=>{const L=w,q=parseInt(o.split("-")[2]),I=os(o),B=Math.round(L.utilization*100),O=n.find(V=>V.date===o),R=o===new Date().toISOString().slice(0,10),M={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},j={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},Y=L.items.map(V=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${M[V.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${V.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${j[V.productionType]??V.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${re(V.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),J=`パ${L.partTimers}×${l.partCapacity} 社${L.employees}×${l.empCapacity} = ${re(L.capacity)}本`,W=L.totalQty>0?Math.ceil(L.totalQty/l.partCapacity):0,Q=[];if(L.totalQty>0)for(let V=0;V<=W;V++){const K=L.totalQty-V*l.partCapacity;if(K<=0){Q.push({p:V,e:0});break}const G=Math.ceil(K/l.empCapacity);Q.push({p:V,e:G})}const H=L.totalQty-L.capacity,X=L.totalQty===0?"":H>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${re(H)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',ee=Q.filter(V=>V.p+V.e>0).sort((V,K)=>V.p+V.e-(K.p+K.e)).slice(0,3),ie=L.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${re(L.totalQty)}本を収めるには ${X}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${ee.map((V,K)=>{const G=V.p===L.partTimers&&V.e===L.employees;return`<button data-action="cal-apply-pattern" data-date="${o}" data-part="${V.p}" data-emp="${V.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${G?"#2f855a":"var(--border)"};
                border-radius:4px;background:${G?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${G?"font-weight:600;":""}">
              パ${V.p}社${V.e}＝${V.p+V.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${re(V.p*l.partCapacity+V.e*l.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${R?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${R?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${R?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${q}日（${I}）${R?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${J} ・ 稼働率${B}%</div>
          ${L.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${re(L.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${L.items.length}品</span></div>`:""}
        </div>
        ${ie}
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${O?.partTimers??0}"
              data-action="cal-shift-part" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${O?.employees??0}"
              data-action="cal-shift-emp" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${L.items.length>0?`
          <div style="padding:0 4px;">
            ${Y}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${re(L.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():o?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(o.split("-")[2])}日（${os(o)}）— 休日</p>
        <div style="display:flex;gap:12px;justify-content:center;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="0"
              data-action="cal-shift-part" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="0"
              data-action="cal-shift-emp" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
      </div>
    </section>
  `:"",D=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(L=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${L.color};"></span>${L.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${p}</select>
      </label>
      <button class="button secondary" type="button" data-action="cal-reset-shifts"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">平日リセット</button>
      <button class="button primary" type="button" data-action="cal-confirm-all"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">月一括確定</button>
    </div>

    <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;">
      <label style="font-size:11px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
        パート日産
        <input type="number" min="50" max="2000" step="50" value="${l.partCapacity}"
          data-action="cal-cap-part"
          style="width:60px;height:26px;font-size:12px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />本
      </label>
      <label style="font-size:11px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
        社員日産
        <input type="number" min="50" max="2000" step="50" value="${l.empCapacity}"
          data-action="cal-cap-emp"
          style="width:60px;height:26px;font-size:12px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />本
      </label>
    </div>

    <div style="background:var(--surface-alt);border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;line-height:1.8;">
      <div><strong>${re(Math.round(g))}</strong>本 ÷ <strong>${$}</strong>稼働日 = 日当たり<strong>${re(s)}</strong>本</div>
      <div>→ パ<strong>${P}</strong> 社<strong>${E}</strong>人日 ・ キャパ<strong>${re(C)}</strong>本
        ${S<g?` <span style="color:#c53d3d;">（${re(Math.round(g-S))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${D}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((L,q)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${q===0?"#c53d3d":q===6?"#0F5B8D":"var(--text-secondary)"};">${L}</div>`).join("")}
        ${h.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">クリック→詳細 ／ ダブルクリック→稼働ON/OFF</p>
    </section>

    ${k}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${r.size>0?`（<strong>${r.size}</strong>品除外中 = ${re(Math.round(x))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const L=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],q=new Map;for(const I of e){if((I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock))<=0)continue;const O=I.productionType||"monthly";q.has(O)||q.set(O,[]),q.get(O).push(I)}return L.filter(I=>q.has(I.key)).map(I=>{const B=q.get(I.key),O=B.reduce((J,W)=>J+(W.plannedQty>0?W.plannedQty:Math.max(0,W.demandForecast+W.safetyStockTarget-W.openingStock)),0),R=B.filter(J=>r.has(J.productCode)).length,M=R===B.length,j=R===0,Y=B.map(J=>{const W=J.plannedQty>0?J.plannedQty:Math.max(0,J.demandForecast+J.safetyStockTarget-J.openingStock),Q=r.has(J.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${Q?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${J.productCode}"
                    ${Q?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${Q?"text-decoration:line-through;":""}">${J.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${re(Math.round(W))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${I.key}"
                    ${M?"":"checked"} ${!j&&!M?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${I.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${I.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${B.length}品 ${re(Math.round(O))}本</span></div>
                  ${R>0&&!M?`<span style="font-size:11px;color:#b7791f;">${R}品除外</span>`:""}
                  ${M?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${Y}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function Qp(e,t,n,o,r,l,c="all",d=null,u=[],y=null,g=new Set,f={partCapacity:nt,empCapacity:st}){const S=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(C=>`<button class="tab-button ${o===C.key?"active":""}"
       data-demand-tab="${C.key}">${C.label}</button>`).join("");let $="";if(o==="demand")$=e?Vp(e,l):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(o==="safety")$=Yp(t,d);else if(o==="plan")$=Jp(n,r,c,d,u,f);else if(o==="calendar")try{$=Kp(n,r,u,y,g,f)}catch(C){console.error("[renderCalendarTab] error:",C),$=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(C)}
${C?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${S}
    </div>

    ${$}
  `}const Ue={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Oe=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function ce(e){return e.toLocaleString("ja-JP")}function he(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function _n(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Wp(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function Sn(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function Gp(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(P=>P.month))].sort(),n=Oe.filter(P=>e.some(E=>E.brewCategory===P)),o={};for(const P of e)o[P.month]||(o[P.month]={}),o[P.month][P.brewCategory]=P.shipmentMl;const r=820,l=300,c={top:20,right:20,bottom:50,left:70},d=r-c.left-c.right,u=l-c.top-c.bottom,y=t.map(P=>n.reduce((E,s)=>E+(o[P]?.[s]??0),0)),g=Math.max(...y,1),f=d/t.length,x=Math.max(f-8,14),S=[0,.25,.5,.75,1].map(P=>{const E=c.top+u-u*P,s=g*P/1e3;return`
      <line x1="${c.left}" y1="${E}" x2="${r-c.right}" y2="${E}" class="chart-grid" />
      <text x="6" y="${E+4}" class="chart-axis">${Math.round(s).toLocaleString("ja-JP")}L</text>
    `}).join(""),$=t.map((P,E)=>{let s=c.top+u;const i=c.left+E*f+(f-x)/2,p=n.map(k=>{const D=o[P]?.[k]??0,L=D/g*u;return s-=L,L>0?`<rect x="${i}" y="${s}" width="${x}" height="${L}" fill="${Ue[k]??"#9ca3af"}" opacity="0.85" rx="1"><title>${k}: ${he(D)}L</title></rect>`:""}).join(""),[m,h]=P.split("-"),b=parseInt(h),_=b===10||E%2===0,w=b===10?`${m}年度`:`${b}月`;return`<g>${p}${_?`<text x="${i+x/2}" y="${l-12}" class="chart-axis centered-axis" style="font-size:10px;">${w}</text>`:""}</g>`}).join(""),C=n.map(P=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${Ue[P]??"#9ca3af"};"></span>
       ${P}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${l}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${S}${$}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${C}</div>
  `}function Xp(e,t,n,o){const r=new Map;for(const d of e){const u=d.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=r.get(u);y.rows.push(d),y.totalMl+=d.totalShipmentMl,y.avgMl+=d.monthlyAvgMl,y.stockL=d.currentStockL}const l=new Map;for(const d of t)l.has(d.brewCategory)||l.set(d.brewCategory,[]),l.get(d.brewCategory).push(d);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Oe.filter(d=>r.has(d)).map(d=>{const u=r.get(d),y=Ue[d]??"#9ca3af",g=Sn(d);l.get(d);const f=n[d]??{rawAlcoholPct:18,targetAlcoholPct:15},x=f.targetAlcoholPct>0?f.rawAlcoholPct/f.targetAlcoholPct:1;u.stockL*1e3;const S=u.totalMl,$=u.avgMl,C=S/1e3,P=Math.round(u.stockL*x*10)/10,E=P*1e3,s=$>0?Math.round(E/$*10)/10:0,i=P-C,p=$>0?Math.round($*2/1e3*10)/10:0,m=P<p,h=_n(s),b=Wp(s),_=Math.min(s/12*100,100),w=i>=0?"#22c55e":"#ef4444",k=i>=0?`+${ce(Math.round(i))}L 余裕`:`${ce(Math.round(i))}L 不足`,D=x>1.001;return`
        <div class="card" style="border-top:3px solid ${y};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${y};">${d}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${h}20;color:${h};font-weight:600;">${b}</span>
              <button class="btn-edit-stock" data-cat-id="${g}" data-cat="${d}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${g}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${ce(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${ce(Math.round(C))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${he($)}L</strong></div>
            </div>
            ${D?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${ce(P)}L</div>
                <div style="color:#6b7280;">${f.rawAlcoholPct}% → ${f.targetAlcoholPct}%（×${x.toFixed(2)}）・残<strong>${s.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const L=o.filter(q=>q.parentCategory===d);return L.length===0?"":L.map(q=>{const B=t.filter(O=>O.brewCategory===q.name).reduce((O,R)=>O+R.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${q.name}</span>
                  ${B>0?`<span style="margin-left:4px;">${ce(B)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${g}" style="display:none;margin-bottom:8px;">
            ${(()=>{const L=o.filter(O=>O.parentCategory===d),q=[{name:d,label:d},...L.map(O=>({name:O.name,label:O.name}))],I=q.flatMap(O=>t.filter(M=>M.brewCategory===O.name).map(M=>({...M,catLabel:O.label}))),B=q.map(O=>`<option value="${O.name}">${O.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${I.map(O=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${O.label||"タンク"}</span>
                      <strong style="font-size:13px;">${ce(O.volumeL)}L</strong>
                      ${q.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${O.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${q.map(R=>`<option value="${R.name}" ${R.name===O.brewCategory?"selected":""}>${R.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${O.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${O.id}" data-cat="${O.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${q.length>1?`<select id="new-entry-target-${g}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${B}</select>`:""}
                  <input id="new-entry-label-${g}" type="text" placeholder="タンク名"
                    style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <input id="new-entry-vol-${g}" type="number" min="0" step="1" placeholder="L"
                    style="width:60px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <button data-action="brew-add-entry" data-cat="${d}" data-cat-id="${g}"
                    style="font-size:11px;padding:4px 10px;border:none;border-radius:4px;background:#0F5B8D;color:#fff;cursor:pointer;white-space:nowrap;">追加</button>
                </div>
              `})()}
            <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:8px;">
              <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">アルコール度数（加水計算用）</div>
              <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  原酒
                  <input id="alc-raw-${g}" type="number" min="1" max="30" step="0.1" value="${f.rawAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <span style="color:#6b7280;">→</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  出荷
                  <input id="alc-target-${g}" type="number" min="1" max="30" step="0.1" value="${f.targetAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <button data-action="brew-alc-save" data-cat="${d}"
                  style="font-size:10px;padding:3px 8px;border:none;border-radius:4px;background:#2563eb;color:#fff;cursor:pointer;">保存</button>
              </div>
            </div>
            <div style="margin-top:6px;">
              <button class="btn-cancel-stock" data-cat-id="${g}"
                style="font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">閉じる</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;flex-wrap:wrap;">
            <span style="color:${w};font-weight:600;">年間比 ${k}</span>
            <span style="color:${m?"#ef4444":"#6b7280"};">安全在庫${ce(p)}L${m?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${D?"（加水後）":""}</span>
            <span style="font-weight:600;color:${h};">${s.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${h};height:100%;width:${_}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function Zp(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,o=[];for(const r of Oe){const l=t.get(r);if(!l)continue;const c=Ue[r]??"#9ca3af",d=l.length>1,u=l.reduce((P,E)=>P+E.totalShipmentQty,0),y=l.reduce((P,E)=>P+E.totalShipmentMl,0),g=l.reduce((P,E)=>P+E.monthlyAvgQty,0),f=l.reduce((P,E)=>P+E.monthlyAvgMl,0),x=l.reduce((P,E)=>P+E.productCount,0),S=l[0].currentStockL,$=f>0?Math.round(S*1e3/f*10)/10:0,C=_n($);if(o.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${d?"pointer":"default"};" ${d?`data-toggle-cat="${r}"`:""}>
        <td style="color:${c};">
          ${d?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${x}</td>
        <td style="text-align:right;">${ce(u)}</td>
        <td style="text-align:right;">${he(y)}</td>
        <td style="text-align:right;">${ce(g)}</td>
        <td style="text-align:right;">${he(f)}</td>
        <td style="text-align:right;">${ce(S)}</td>
        <td style="text-align:right;color:${C};font-weight:700;">${$.toFixed(1)}</td>
      </tr>
    `),d)for(const P of l)o.push(`
          <tr class="sub-row-${Sn(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${P.subCategory}</td>
            <td style="text-align:right;">${P.productCount}</td>
            <td style="text-align:right;">${ce(P.totalShipmentQty)}</td>
            <td style="text-align:right;">${he(P.totalShipmentMl)}</td>
            <td style="text-align:right;">${ce(P.monthlyAvgQty)}</td>
            <td style="text-align:right;">${he(P.monthlyAvgMl)}</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
          </tr>
        `)}return`
    <div class="table-wrap">
      <table class="data-table">
        <thead>${n}</thead>
        <tbody>${o.join("")}</tbody>
      </table>
    </div>
  `}function eu(e,t,n,o,r,l={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const d={},u=new Date,y=u.getMonth()+1,g=y>=10?u.getFullYear():u.getFullYear()-1,f=g+1,x=new Map;for(const k of e)x.has(k.brewCategory)||x.set(k.brewCategory,new Map),x.get(k.brewCategory).set(k.fy,{shipL:k.shipmentL,annualL:k.annualizedL});const S=new Map;for(const k of r)S.has(k.brewCategory)||S.set(k.brewCategory,new Map),S.get(k.brewCategory).set(k.monthNum,k.avgMonthlyL);const $=[...new Set(e.map(k=>k.fy))].sort(),C=[...x.keys()].sort((k,D)=>{const L=[...Oe,...o.map(q=>q.name)];return(L.indexOf(k)===-1?99:L.indexOf(k))-(L.indexOf(D)===-1?99:L.indexOf(D))}),P=[];for(let k=y;k<=9;k++)P.push(k);if(y>=10)for(let k=1;k<=9;k++)P.push(k);const E=$.filter(k=>k<g),s=$.includes(g),i=C.map(k=>{const D=x.get(k);$.filter(ye=>D.has(ye));const L=Ue[k]??"#6366f1",q=S.get(k)??new Map,I=E.filter(ye=>D.has(ye)).map(ye=>D.get(ye).shipL);let B=0;if(I.length>=2){let ye=0,xe=0;for(let Be=1;Be<I.length;Be++)if(I[Be-1]>0){const wa=(I[Be]-I[Be-1])/I[Be-1],Ot=Be;ye+=wa*Ot,xe+=Ot}B=xe>0?ye/xe:0}const O=D.get(g)?.annualL??0,R=I.length>0?I[I.length-1]:0,M=O>0&&R>0?Math.round(R*.4+O*.6):R||O,j=P.reduce((ye,xe)=>ye+(q.get(xe)??0),0),Y=t.filter(ye=>ye.brewCategory===k).reduce((ye,xe)=>ye+xe.volumeL,0),J=n[k],W=J&&J.targetAlcoholPct>0?J.rawAlcoholPct/J.targetAlcoholPct:1,Q=Math.round(Y*W),H=Math.max(0,Q-Math.round(j)),X=k in l,ee=X?l[k]:B,ie=Math.round(ee*100),V=Math.round(M*(1+ee)),K=Math.max(0,V-H);d[k]=K;const G=ie>0?"#22c55e":ie<0?"#ef4444":"#6b7280",ne=Math.round(B*100),we=D.get(g)?.annualL??0;return`
      <tr>
        <td style="color:${L};font-weight:600;white-space:nowrap;">${k}</td>
        ${E.map(ye=>`<td style="text-align:right;">${D.has(ye)?ce(Math.round(D.get(ye).shipL)):"—"}</td>`).join("")}
        ${s?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${ce(Math.round(we))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${ie}"
            data-action="brew-growth-edit" data-cat="${k}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${X?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${G};font-weight:600;${X?"background:rgba(37,99,235,0.06);":""}"
            title="${X?`手動設定（自動: ${I.length>=2?ne+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${ce(Q)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${ce(Math.round(j))}</td>
        <td style="text-align:right;font-weight:600;">${ce(H)}</td>
        <td style="text-align:right;">${ce(V)}</td>
        <td style="text-align:right;color:${K>0?"#ef4444":"#22c55e"};font-weight:700;">${K>0?ce(K):"余裕"}</td>
      </tr>
    `}).join("");let p=0,m=0,h=0,b=0,_=0;for(const k of C){const D=x.get(k),L=S.get(k)??new Map,q=E.filter(ee=>D.has(ee)).map(ee=>D.get(ee).shipL);let I=0;if(q.length>=2){let ee=0,ie=0;for(let V=1;V<q.length;V++)if(q[V-1]>0){const K=(q[V]-q[V-1])/q[V-1];ee+=K*V,ie+=V}I=ie>0?ee/ie:0}const B=D.get(g)?.annualL??0,O=q.length>0?q[q.length-1]:0,R=B>0&&O>0?Math.round(O*.4+B*.6):O||B,M=t.filter(ee=>ee.brewCategory===k).reduce((ee,ie)=>ee+ie.volumeL,0),j=n[k],Y=j&&j.targetAlcoholPct>0?j.rawAlcoholPct/j.targetAlcoholPct:1,J=Math.round(M*Y),W=P.reduce((ee,ie)=>ee+(L.get(ie)??0),0),Q=Math.max(0,J-Math.round(W)),H=k in l?l[k]:I,X=Math.round(R*(1+H));p+=J,m+=Math.round(W),h+=Q,b+=X,_+=Math.max(0,X-Q)}const w=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:d,html:`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 4px 0;">${f}年度 必要醸造量（${f}/10〜${f+1}/9）</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 12px;">
        増減率は完了年度（12ヶ月分）のみで算出。当年度(*)は年換算参考値。
      </p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>区分</th>
              ${E.map(k=>`<th style="text-align:right;">${k}(L)</th>`).join("")}
              ${s?`<th style="text-align:right;">${g}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${w}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${f}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${i}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${E.map(()=>"<td></td>").join("")}
              ${s?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${ce(p)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${ce(m)}</td>
              <td style="text-align:right;">${ce(h)}</td>
              <td style="text-align:right;">${ce(b)}</td>
              <td style="text-align:right;color:#ef4444;">${ce(_)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function tu(e,t,n,o,r){if(e.length===0)return"";const l=new Date,c=l.getMonth()+1,d=l.getFullYear(),u=[];let y=c,g=d;for(let E=0;E<4;E++){const s=[];for(let m=0;m<3;m++)s.push({y:g,m:y}),y++,y>12&&(y=1,g++);const i=`${s[0].y}/${s[0].m}`,p=`${s[2].y}/${s[2].m}`;u.push({label:`${i}-${p}`,months:s})}const f=new Map;for(const E of n)f.has(E.brewCategory)||f.set(E.brewCategory,new Map),f.get(E.brewCategory).set(E.monthNum,E.avgMonthlyL);const x=new Map;for(const E of e)x.has(E.brewCategory)||x.set(E.brewCategory,E.currentStockL);for(const E of r){const s=t.filter(i=>i.brewCategory===E.name).reduce((i,p)=>i+p.volumeL,0);s>0&&x.set(E.name,s)}const S=new Map;for(const E of r)S.has(E.parentCategory)||S.set(E.parentCategory,[]),S.get(E.parentCategory).push(E);const $=[];for(const E of Oe){(x.has(E)||(f.get(E)?.size??0)>0)&&$.push({cat:E,isChild:!1});for(const s of S.get(E)??[])(x.has(s.name)||(f.get(s.name)?.size??0)>0)&&$.push({cat:s.name,isChild:!0})}function C(E,s){const i=o[E],p=i&&i.targetAlcoholPct>0?i.rawAlcoholPct/i.targetAlcoholPct:1;let m=(x.get(E)??0)*p;const h=f.get(E)??new Map,b=Ue[E]??(s?"#6366f1":"#9ca3af");let _="";const w=[];for(const k of u){const D=k.months.reduce((B,{m:O})=>B+(h.get(O)??0),0),L=m;m=Math.max(0,m-D),L>0&&m<=0&&!_&&(_=k.label);const I=m<=0?"#ef4444":m<D?"#eab308":"#22c55e";w.push(`<td style="text-align:right;padding:4px 6px;color:${I};font-weight:${m<=0?"700":"400"};">${m>0?ce(Math.round(m)):"枯渇"}</td>`)}return`
      <tr style="${s?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${b};font-weight:${s?"500":"600"};padding:4px 6px;white-space:nowrap;${s?"padding-left:20px;font-size:11px;":""}">${s?"┗ ":""}${E}</td>
        <td style="text-align:right;padding:4px 6px;">${ce(Math.round((x.get(E)??0)*p))}</td>
        ${w.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${_?"#ef4444":"#22c55e"};font-weight:600;">
          ${_?`⚠ ${_}`:"12ヶ月+"}
        </td>
      </tr>
    `}const P=$.map(({cat:E,isChild:s})=>C(E,s)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(E=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${E.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${P}</tbody>
        </table>
      </div>
    </div>
  `}function au(e,t,n){const o=new Map;for(const c of e){o.has(c.brewCategory)||o.set(c.brewCategory,{avgMl:0,totalMl:0,stockL:c.currentStockL});const d=o.get(c.brewCategory);d.avgMl+=c.monthlyAvgMl,d.totalMl+=c.totalShipmentMl}for(const c of n){const d=t.filter(u=>u.brewCategory===c.name).reduce((u,y)=>u+y.volumeL,0);(d>0||o.has(c.name))&&(o.has(c.name)?o.get(c.name).stockL=d:(o.get(c.parentCategory),o.set(c.name,{avgMl:0,totalMl:0,stockL:d})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Oe,...n.map(c=>c.name)].filter(c=>o.has(c)&&(o.get(c).stockL>0||o.get(c).totalMl>0)).map(c=>{const d=o.get(c),u=d.avgMl>0?Math.round(d.stockL*1e3/d.avgMl*10)/10:0,y=d.totalMl/1e3,g=y>0?Math.round(d.stockL/y*100):0,f=n.some(P=>P.name===c),x=Ue[c]??(f?"#6366f1":"#9ca3af"),S=d.avgMl>0?_n(u):d.stockL>0?"#22c55e":"#9ca3af",$=d.avgMl>0?Math.min(u/12*100,100):d.stockL>0?100:0,C=d.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${g}%`:`${ce(d.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${x};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c}">${f?"┗ ":""}${c}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${S};height:100%;width:${$}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${C}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${d.stockL>0?"var(--text)":"#ef4444"};">${ce(d.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function nu(e,t,n,o,r){if(e.length===0)return"";const l=n.map(f=>f.name);[...Oe,...l];const c=new Map;for(const f of n)c.has(f.parentCategory)||c.set(f.parentCategory,[]),c.get(f.parentCategory).push(f);const d=new Map;for(const f of e)d.has(f.brewCategory)||d.set(f.brewCategory,[]),d.get(f.brewCategory).push(f);for(const f of l)d.has(f)||d.set(f,[]);const u=new Set;for(const f of n)for(const x of d.get(f.name)??[])u.add(x.productCode);const y=new Map;for(const f of Oe)y.set(f,d.get(f)??[]);const g=Oe.filter(f=>d.has(f)).map(f=>{const x=d.get(f)??[],S=Ue[f]??"#9ca3af",$=c.get(f)??[],C=$.length>0,P=x.reduce((w,k)=>w+k.annualMl,0),E=x.reduce((w,k)=>w+k.monthlyAvgMl,0),s=x.filter(w=>!u.has(w.productCode)),i=s.filter(w=>!t.has(w.productCode)),p=i.reduce((w,k)=>w+k.annualMl,0),m=i.reduce((w,k)=>w+k.monthlyAvgMl,0),h=s.filter(w=>t.has(w.productCode)),b=s.map(w=>{const k=t.has(w.productCode);return`
          <tr style="${k?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${C?`<input type="checkbox" ${k?"":"checked"} data-action="brew-move-to-child" data-code="${w.productCode}" data-parent="${f}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${k?"color:#b7791f;":""}" title="${w.productName}">
              ${w.productName}${k?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${w.subCategory}</td>
            <td style="text-align:right;">${he(w.annualMl)}</td>
            <td style="text-align:right;">${he(w.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),_=$.map(w=>{const k=d.get(w.name)??[],D=k.reduce((M,j)=>M+j.annualMl,0),L=k.reduce((M,j)=>M+j.monthlyAvgMl,0),q=r.filter(M=>M.brewCategory===w.name),I=q.reduce((M,j)=>M+j.volumeL,0),B=Sn(w.name),O=k.map(M=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${M.productCode}" data-cat="${w.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${M.productName}"><strong>${M.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${M.subCategory}</td>
            <td style="text-align:right;">${he(M.annualMl)}</td>
            <td style="text-align:right;">${he(M.monthlyAvgMl)}</td>
          </tr>
        `).join(""),R=h.filter(M=>!k.some(j=>j.productCode===M.productCode)).map(M=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${M.productCode}" data-cat="${w.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${M.productName}">${M.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${M.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${he(M.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${he(M.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${w.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${k.length}品 ・ ${he(D)}L/年${I>0?` ・ 在庫${ce(I)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${B}" data-cat="${w.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${w.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${B}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${q.map(M=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${M.label||"タンク"}</span>
                    <strong style="font-size:11px;">${ce(M.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${M.id}" data-cat="${w.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${B}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${B}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${w.name}" data-cat-id="${B}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${B}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${O.length>0||R.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${O}
                    ${R}
                  </tbody>
                  ${k.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${he(D)}</td><td style="text-align:right;">${he(L)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${S};"></span>
            <h4 style="margin:0;font-size:14px;">${f}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${x.length}銘柄 ・ 年間${he(P)}L
              ${C?`（内 ${$.map(w=>`${w.name}:${(d.get(w.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${C?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${b}
                ${_}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${he(P)}</td><td style="text-align:right;">${he(E)}</td></tr>
                ${C?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${he(p)}</td><td style="text-align:right;">${he(m)}</td></tr>`:""}
                ${h.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${h.length}品</td>
                  <td style="text-align:right;">${he(h.reduce((w,k)=>w+k.annualMl,0))}</td>
                  <td style="text-align:right;">${he(h.reduce((w,k)=>w+k.monthlyAvgMl,0))}</td></tr>`:""}
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
            ${Oe.filter(f=>f!=="その他").map(f=>`<option value="${f}">${f}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${g}
    </div>
  `}function su(e,t,n,o=[],r=new Set,l=[],c={},d=[],u={},y=[],g=[],f={},x={}){const S=new Date,$=S.getMonth()>=9?S.getFullYear():S.getFullYear()-1,C=Array.from({length:5},(E,s)=>{const i=$-s;return`<option value="${i}" ${i===n?"selected":""}>${i}年度 (${i}/10-${i+1}/9)</option>`}).join(""),P=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return P||`
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
        ${Gp(t)}
      </div>

      ${Xp(e,d,u,l)}

      ${eu(y,d,u,l,g,f).html}

      ${au(e,d,l)}

      ${tu(e,d,g,u,l)}

      ${nu(o,r,l,c,d)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${Zp(e)}
      </div>
    </section>
  `}const Da={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},ou=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],kt=[10,11,12,1,2,3,4,5,6,7,8,9],is=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],Qe=[9,10,11,12,1,2,3,4,5],ru=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function oe(e){return e.toLocaleString("ja-JP")}function iu(e,t,n,o=[],r=2026,l=[],c=[],d={}){const y=[...new Set([...Object.keys(e).filter(w=>e[w]>0),...o.filter(w=>w.plannedVolumeL>0).map(w=>w.brewCategory)])];if(y.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const g=[...ou,...n.map(w=>w.name)];y.sort((w,k)=>(g.indexOf(w)===-1?99:g.indexOf(w))-(g.indexOf(k)===-1?99:g.indexOf(k)));const f={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},x=new Map;for(const w of o)x.has(w.brewCategory)||x.set(w.brewCategory,[]),x.get(w.brewCategory).push(w);const S=(w,k,D,L,q)=>`<input type="number" step="${q}" value="${D}" data-action="brew-rice-edit" data-cat="${k}" data-field="${w}"
        style="width:${L};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,$=(w,k,D)=>`<select data-action="brew-rice-variety-select" data-cat="${k}" data-field="${w}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${l.map(L=>`<option value="${L.name}" ${L.name===D?"selected":""}>${L.name}${L.region?` (${L.region})`:""}</option>`).join("")}
      ${!l.some(L=>L.name===D)&&D?`<option value="${D}" selected>${D}</option>`:""}
    </select>`;let C=0,P=0,E=0,s=0;const i=kt.map(()=>0),p=new Map,m=y.map(w=>{const k=e[w]??0,D=t[w]??f,L=Da[w]??"#6366f1",q=x.get(w)??[],I=w in d,B=q.reduce((G,ne)=>G+ne.plannedVolumeL,0),O=q.length>0,R=I?d[w]:O?B:k,M=D.alcoholAdditionRatio??0,j=R*(1-M),Y=Math.round(j*D.ricePerLiterKg),J=Math.round(Y*D.kojiRatio),W=Y-J,Q=Math.round(J/D.polishingRatio),H=Math.round(W/D.polishingRatio),X=Q+H,ee=Math.round(Q*D.kojiPricePerKg),ie=Math.round(H*D.kakePricePerKg);C+=Q,P+=H,E+=ee,s+=ie;for(const[G,ne,we,ye]of[[D.kojiVariety,Q,D.kojiPricePerKg,"麹米"],[D.kakeVariety,H,D.kakePricePerKg,"掛米"]]){if(ne<=0)continue;p.has(G)||p.set(G,{brownKg:0,pricePerKg:we,cost:0,usage:[]});const xe=p.get(G);xe.brownKg+=ne,xe.cost+=Math.round(ne*we),xe.pricePerKg=Math.round(xe.cost/xe.brownKg),xe.usage.push({cat:w,type:ye,kg:ne})}const V=kt.map(()=>0);if(q.length>0)for(const G of q){const ne=kt.indexOf(G.brewMonth);ne>=0&&(V[ne]+=G.plannedVolumeL)}else{const G=R/12;for(let ne=0;ne<12;ne++)V[ne]=G}const K=V.reduce((G,ne)=>G+ne,0)||1;for(let G=0;G<12;G++){const ne=V[G]/K;i[G]+=Math.round(X*ne)}return`
      <div class="card" style="border-top:3px solid ${L};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${L};">${w}</h4>
          <div style="font-size:12px;">${R>0?`予算 <strong>¥${oe(ee+ie)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(R)}"
              data-action="proc-edit-vol" data-cat="${w}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${I?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${I?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${M>0?`<span style="color:var(--text-secondary);">−${Math.round(M*100)}%→${oe(Math.round(j))}L</span>`:""}
          ${k>0&&Math.abs(k-R)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${oe(Math.round(k))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${L};margin-bottom:6px;">醸造スケジュール${q.length>0?` (${oe(Math.round(q.reduce((G,ne)=>G+ne.plannedVolumeL,0)))}L / ${oe(Math.round(R))}L)`:""}</div>
          ${q.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${q.map(G=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${L}15;border:1px solid ${L}30;">
                  <span style="font-size:11px;font-weight:600;color:${L};">${G.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(R)}" step="100" value="${Math.round(G.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${w}" data-month="${G.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${w}" data-month="${G.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          `:'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>'}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${w}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(G=>!q.some(ne=>ne.brewMonth===G)).map(G=>`<option value="${G}">${G}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(R)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${w}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${w}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${L};background:${L}10;color:${L};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${S("ricePerLiterKg",w,D.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${S("kojiRatio",w,D.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${S("polishingRatio",w,D.polishingRatio,"44px","0.01")}</label>
          ${M>0||w==="本醸造"||w==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${S("alcoholAdditionRatio",w,D.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${$("kojiVariety",w,D.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${S("kojiPricePerKg",w,D.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${oe(Q)}kg</strong> <span style="color:var(--text-secondary);">(${(Q/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${oe(ee)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${$("kakeVariety",w,D.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${S("kakePricePerKg",w,D.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${oe(H)}kg</strong> <span style="color:var(--text-secondary);">(${(H/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${oe(ie)}</div>
          </div>
        </div>
      </div>
    `}).join(""),h=C+P,b=E+s,_=Math.max(...i,1);return kt.map((w,k)=>{const D=i[k];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${D/_*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${D>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${is[k]}</div>
        <div style="font-size:10px;font-weight:600;">${D>0?oe(D):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${D>0?(D/60).toFixed(0)+"俵":""}</div>
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
        <div style="display:grid;grid-template-columns:80px repeat(${Qe.length},1fr);font-size:11px;min-width:500px;">
          <div style="padding:4px;font-weight:600;">区分</div>
          ${ru.map(w=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${w}</div>`).join("")}
        </div>
        ${(()=>{const w=[],k=Qe.length,D=new Map;for(const I of c)I.deliveryMonth&&(D.has(I.varietyName)||D.set(I.varietyName,[]),D.get(I.varietyName).push(I.deliveryMonth));for(const[I,B]of D){const O=Qe.map(R=>{const M=B.includes(R),j=c.filter(Y=>Y.varietyName===I&&Y.deliveryMonth===R).reduce((Y,J)=>Y+J.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${M?"background:#dcfce7;":""}">
                ${M?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${j}俵</div>`:""}
              </div>`}).join("");w.push(`<div style="display:grid;grid-template-columns:80px repeat(${k},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${I}</div>${O}
            </div>`)}const L=34,q=2;for(const I of y){const B=x.get(I)??[],O=Da[I]??"#6366f1",R=I in d,M=B.reduce((V,K)=>V+K.plannedVolumeL,0),j=B.length>0,Y=R?d[I]:j?M:e[I]??0,J=[],W=[...B].sort((V,K)=>Qe.indexOf(V.brewMonth)-Qe.indexOf(K.brewMonth)),Q=[];for(const V of W){const K=Qe.indexOf(V.brewMonth);if(K<0)continue;const G=Math.min(V.durationMonths,k-K),ne=K+G;let we=0;for(;we<Q.length&&Q[we]>K;)we++;we>=Q.length?Q.push(ne):Q[we]=ne,J.push({s:V,startIdx:K,dur:G,lane:we})}const X=Math.max(Q.length,1)*(L+q)+q,ee=Qe.map(()=>`<div style="border-left:1px solid var(--border);height:${X}px;"></div>`).join(""),ie=J.map(({s:V,startIdx:K,dur:G,lane:ne})=>{const we=(K/k*100).toFixed(2),ye=(G/k*100).toFixed(2),xe=q+ne*(L+q);return`<div class="gantt-bar" data-cat="${I}" data-month="${V.brewMonth}" data-dur="${G}" data-vol="${Math.round(V.plannedVolumeL)}" data-max="${Math.round(Y)}"
                style="position:absolute;left:${we}%;width:${ye}%;top:${xe}px;height:${L}px;
                  background:${O}30;border:2px solid ${O};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${O};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${oe(Math.round(V.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");w.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${O};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${I}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${k},1fr);">
                ${ee}
                <div class="gantt-bar-container" data-cat="${I}" data-max="${Math.round(Y)}" data-cols="${k}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${ie}
                </div>
              </div>
            </div>`)}return w.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const w=y.map(D=>{const L=t[D]??f,q=x.get(D)??[],I=D in d,B=q.reduce((J,W)=>J+W.plannedVolumeL,0),O=q.length>0,R=I?d[D]:O?B:e[D]??0,M=R*(1-(L.alcoholAdditionRatio??0)),j=Math.round(M*L.ricePerLiterKg),Y=Math.round(j/L.polishingRatio);return{cat:D,brewingL:R,brownKg:Y,color:Da[D]??"#6366f1"}}).filter(D=>D.brewingL>0||D.brownKg>0),k=Math.max(...w.map(D=>D.brownKg),1);return w.map(D=>{const L=Math.min(D.brownKg/k*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${D.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${D.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${D.color};opacity:0.7;height:100%;width:${L}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${oe(D.brownKg)}kg (${Math.ceil(D.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${oe(Math.round(D.brewingL))}L</span>
            </div>
          `}).join("")})()}
    </section>

    ${m}

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
            ${[...p.entries()].sort((w,k)=>k[1].brownKg-w[1].brownKg).map(([w,k])=>{const D=(k.brownKg/60).toFixed(1),L=k.usage.map(q=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${q.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${q.cat}/${q.type} ${oe(q.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${w}</td>
                  <td style="text-align:right;font-weight:600;">${oe(k.brownKg)}</td>
                  <td style="text-align:right;">${D}</td>
                  <td style="text-align:right;">¥${oe(k.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${oe(k.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${L}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${oe(h)}</td>
              <td style="text-align:right;">${Math.ceil(h/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${oe(b)}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${oe(C)}kg</strong> <span style="color:var(--text-secondary);">(${(C/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${oe(E)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${oe(P)}kg</strong> <span style="color:var(--text-secondary);">(${(P/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${oe(s)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${oe(h)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(h/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${oe(b)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(b/1e4).toFixed(0)}万)</span></div>
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
      ${(()=>{const w=new Map;for(const[O,R]of p)w.set(O,R.brownKg);const k=new Map;for(const O of c){k.has(O.varietyName)||k.set(O.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const R=k.get(O.varietyName);R.bales+=O.committedBales,R.kg+=O.committedBales*60,R.cost+=O.committedBales*60*O.pricePerKg,O.supplier&&!R.suppliers.includes(O.supplier)&&R.suppliers.push(O.supplier)}const D=[...new Set([...w.keys(),...k.keys()])];let L=0,q=0;const I=D.map(O=>{const R=w.get(O)??0,M=k.get(O),j=M?.kg??0,Y=j-R;L+=j,q+=R;const J=Y>=0?"#22c55e":"#ef4444",W=Y>=0?`+${oe(Math.round(Y))}kg余裕`:`${oe(Math.round(Y))}kg不足`,Q=j>0?Math.min(R/j*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${O}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${oe(Math.round(j))}kg (${M?.bales??0}俵)</span>
                  <span>必要 ${oe(Math.round(R))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${Q}%;background:${j>0?Y>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${J};">${j>0?W:"未確保"}</span>
            </div>
          `}).join(""),B=L-q;return`
          <div style="margin-bottom:12px;">
            ${I||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${L>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${oe(Math.round(L))}kg</strong> (${Math.ceil(L/60)}俵)</span>
              <span>必要合計: <strong>${oe(Math.round(q))}kg</strong></span>
              <span style="color:${B>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${B>=0?`余裕 ${oe(Math.round(B))}kg`:`不足 ${oe(Math.round(-B))}kg`}
              </span>
            </div>
          `:""}
          <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap;">
            <select id="proc-commit-variety" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;">
              ${l.map(O=>`<option value="${O.name}">${O.name}</option>`).join("")}
            </select>
            <input id="proc-commit-bales" type="number" min="0" step="1" placeholder="俵数"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <input id="proc-commit-price" type="number" min="0" step="10" placeholder="円/kg"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <select id="proc-commit-month" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">
              <option value="">入荷月</option>
              ${kt.map((O,R)=>`<option value="${O}">${is[R]}</option>`).join("")}
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
        ${l.map(w=>`
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${w.name}</strong>
            <span style="color:var(--text-secondary);">¥${oe(w.defaultPricePerKg)}/kg</span>
            ${w.region?`<span style="color:var(--text-secondary);font-size:10px;">${w.region}</span>`:""}
            <button data-action="proc-delete-variety" data-id="${w.id}"
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
  `}const lu={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},cu={planned:"計画中",active:"進行中",completed:"完了"},Ko={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},je=6;function kn(e){return e.toLocaleString("ja-JP")}function Rt(e){return lu[e]??"#6366f1"}function Qt(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function du(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function De(e){return e?e.slice(5).replace("-","/"):"―"}function pu(e){return e.length<=3?e:e.slice(0,3)}function uu(e,t,n){const o=e.filter(E=>E.status!=="completed"&&E.startDate&&E.targetEndDate);if(o.length===0)return"";const r=o.flatMap(E=>[E.startDate,E.targetEndDate]),l=o.flatMap(E=>t[E.id]??[]);for(const E of l)E.plannedStart&&r.push(E.plannedStart),E.plannedEnd&&r.push(E.plannedEnd);r.sort();const c=r[0],d=r[r.length-1],u=Math.min(Qt(c,d)+7,180),y=u*je,g=[];let f="";for(let E=0;E<u;E++){const s=du(c,E),i=s.slice(0,7);i!==f&&(g.push(`<span style="position:absolute;left:${E*je}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(s.slice(5,7))}月</span>`),f=i)}const x=new Date().toISOString().slice(0,10),S=Qt(c,x),$=S>=0&&S<u?`<div style="position:absolute;left:${S*je}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",C=30,P=o.map(E=>{const s=(t[E.id]??[]).sort((h,b)=>h.stepOrder-b.stepOrder),i=Rt(E.brewCategory),p=n===E.id,m=s.map(h=>{const b=Math.max(Qt(c,h.plannedStart),0),_=Math.min(Qt(c,h.plannedEnd),u-1),w=b*je,k=Math.max((_-b+1)*je,je),D=Ko[h.status],L=h.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${h.id}" data-batch-id="${h.batchId}" data-step-order="${h.stepOrder}" data-planned-start="${h.plannedStart}" data-planned-end="${h.plannedEnd}" style="position:absolute;left:${w}px;top:4px;width:${k}px;height:22px;background:${D};border-radius:3px;font-size:7px;line-height:22px;color:${L};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${h.status==="未着手"?"#bbb":D};" title="${h.stepName} ${De(h.plannedStart)}〜${De(h.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${k>24?pu(h.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${p?"#3b82f6":"#f3f4f6"};min-height:${C}px;background:${p?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${E.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${i};font-weight:600;">${E.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${E.brewCategory}</span>
      </div>
      <div style="position:relative;width:${y}px;height:${C}px;background:repeating-linear-gradient(90deg,transparent 0 ${je*7-1}px,#f3f4f6 ${je*7-1}px ${je*7}px);">${m}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">仕込をクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${y+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${y}px;height:20px;">${g.join("")}</div>
        </div>
        <div style="position:relative;">${P}${$}</div>
      </div>
    </div>
  </section>`}function mu(e,t){const n=[...t].sort((C,P)=>C.stepOrder-P.stepOrder);if(n.length===0)return"";const o=120,r=50,l=40,c=20,d=5,u=Math.ceil(n.length/d),y=d*(o+l)-l+20,g=u*(r+c)-c+20,f=C=>{const P=Math.floor(C/d);return{x:10+(P%2===0?C%d:d-1-C%d)*(o+l),y:10+P*(r+c)}},x=n.map((C,P)=>{const E=f(P),s=Ko[C.status],i=C.status==="進行中"?"#1d4ed8":C.status==="完了"?"#15803d":"#9ca3af",p=C.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${E.x}" y="${E.y}" width="${o}" height="${r}" rx="6" fill="${s}" stroke="${i}" stroke-width="2"/>
      <text x="${E.x+o/2}" y="${E.y+20}" text-anchor="middle" fill="${p}" font-size="11" font-weight="600">${C.stepName}</text>
      <text x="${E.x+o/2}" y="${E.y+36}" text-anchor="middle" fill="${p}" font-size="9" opacity="0.8">${De(C.plannedStart)}〜${De(C.plannedEnd)}</text>
    </g>`}).join(""),S=n.slice(1).map((C,P)=>{const E=f(P),s=f(P+1),i=E.x+o/2,p=E.y+r/2,m=s.x+o/2,h=s.y+r/2;if(Math.floor(P/d)===Math.floor((P+1)/d)){const _=m>i?1:-1,w=E.x+(_>0?o:0),k=p,D=s.x+(_>0?0:o);return`<line x1="${w}" y1="${k}" x2="${D}" y2="${h}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const _=E.y+r,w=s.y;return`<line x1="${i}" y1="${_}" x2="${m}" y2="${w}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${Rt(e.brewCategory)};">●</span> ${e.batchCode} 醸造工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${y}" height="${g}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${S}${x}
        </svg>
      </div>
    </section>
  </div>`}function yu(e,t,n){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">仕込が未登録です。調達計画から取込むか、新規登録してください。</div>';const o=e.map(r=>{const l=t[r.id]??[],c=l.length,d=l.filter(f=>f.status==="完了").length,u=c>0?Math.round(d/c*100):0,y=Rt(r.brewCategory);return`<tr style="border-bottom:1px solid #f3f4f6;background:${n===r.id?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${r.id}">
      <td style="padding:6px;font-size:12px;font-weight:600;color:${y};">${r.batchCode}</td>
      <td style="padding:6px;font-size:11px;"><span style="background:${y};color:#fff;padding:1px 6px;border-radius:9999px;font-size:10px;">${r.brewCategory}</span></td>
      <td style="padding:6px;font-size:11px;text-align:right;">
        <input type="number" min="0" step="100" value="${Math.round(r.plannedVolumeL)}" data-action="bp-batch-vol" data-batch-id="${r.id}" style="width:60px;font-size:11px;text-align:right;border:1px solid #e5e7eb;border-radius:3px;padding:2px 4px;" onclick="event.stopPropagation()">L
      </td>
      <td style="padding:6px;font-size:11px;">
        <input type="date" value="${r.startDate}" data-action="bp-batch-date" data-batch-id="${r.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
      </td>
      <td style="padding:6px;">
        <select data-action="bp-batch-status" data-batch-id="${r.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
          ${["planned","active","completed"].map(f=>`<option value="${f}"${r.status===f?" selected":""}>${cu[f]}</option>`).join("")}
        </select>
      </td>
      <td style="padding:6px;width:80px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
            <div style="width:${u}%;height:100%;background:${y};border-radius:3px;"></div>
          </div>
          <span style="font-size:9px;color:#6b7280;white-space:nowrap;">${u}%</span>
        </div>
      </td>
      <td style="padding:6px;text-align:center;">
        <button data-action="bp-show-delete-modal" data-batch-id="${r.id}" data-batch-code="${r.batchCode}" style="font-size:10px;padding:2px 8px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;" onclick="event.stopPropagation()">削除</button>
      </td>
    </tr>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>仕込一覧</h2><p class="panel-caption">${e.length}件 ／ 行クリックで醸造工程フロー表示</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:600px;">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left;">
          <th style="padding:4px 6px;">コード</th><th style="padding:4px 6px;">区分</th>
          <th style="padding:4px 6px;text-align:right;">醸造量</th><th style="padding:4px 6px;">開始日</th>
          <th style="padding:4px 6px;">状態</th><th style="padding:4px 6px;">進捗</th><th style="padding:4px 6px;text-align:center;">操作</th>
        </tr></thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  </section>`}function hu(e,t){if(e.length===0)return"";const n=new Set(t.map(l=>`${l.brewCategory}:${l.startDate?.slice(0,7)}`)),o=e.filter(l=>{const c=l.brewMonth>=10?l.fy:l.fy+1,d=`${l.brewCategory}:${c}-${String(l.brewMonth).padStart(2,"0")}`;return!n.has(d)&&l.plannedVolumeL>0});return o.length===0?"":`<section class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括で仕込登録</p></div>
      <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括仕込登録</button>
    </div>
    <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
        <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
      </tr></thead><tbody>${o.map(l=>{const d=`${l.brewMonth>=10?l.fy:l.fy+1}-${String(l.brewMonth).padStart(2,"0")}-01`,u=`${l.brewCategory}-${l.fy}-${String(l.brewMonth).padStart(2,"0")}`;return`<tr>
      <td style="padding:5px 6px"><span style="color:${Rt(l.brewCategory)};font-weight:600;font-size:11px;">${l.brewCategory}</span></td>
      <td style="padding:5px 6px;font-size:11px;">${u}</td>
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${kn(Math.round(l.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${l.brewMonth}月（${d}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${l.brewCategory}" data-month="${l.brewMonth}" data-vol="${Math.round(l.plannedVolumeL)}" data-date="${d}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function fu(e){return`<div class="panel" style="margin-bottom:16px">
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
  </div>`}function gu(e,t){const n=[...t].sort((l,c)=>l.stepOrder-c.stepOrder);if(n.length===0)return"";const o=n.map(l=>`<tr style="border-bottom:1px solid #f3f4f6">
    <td style="padding:4px 6px;font-size:11px;font-weight:${l.status==="進行中"?700:400}">${l.stepName}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${De(l.plannedStart)}〜${De(l.plannedEnd)}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${l.actualStart?De(l.actualStart):"―"}〜${l.actualEnd?De(l.actualEnd):"―"}</td>
    <td style="padding:4px 3px">
      <select data-action="bp-step-status" data-step-id="${l.id}" data-batch-id="${l.batchId}" style="font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px">
        ${["未着手","進行中","完了"].map(c=>`<option value="${c}"${l.status===c?" selected":""}>${c}</option>`).join("")}
      </select>
    </td>
    <td style="padding:4px 3px"><input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${l.id}" value="${l.temperature??""}" placeholder="℃" style="width:50px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
    <td style="padding:4px 3px"><input type="text" data-action="bp-step-notes" data-step-id="${l.id}" value="${l.notes}" placeholder="メモ" style="width:100px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${Rt(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${kn(e.plannedVolumeL)}L ｜ ${De(e.startDate)}〜${De(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  </section>`}function vu(e,t,n){const o=new Map;for(const l of t){if(!l.tankNo||l.status==="completed")continue;const c=n[l.id]??[],d=c.find(y=>y.stepName==="仕込み(添/仲/留)"),u=c.find(y=>y.stepName==="上槽");d?.plannedStart&&u?.plannedEnd&&(o.has(l.tankNo)||o.set(l.tankNo,[]),o.get(l.tankNo).push({batchCode:l.batchCode,start:d.plannedStart,end:u.plannedEnd}))}const r=e.map(l=>{const c=o.get(l.tankNo)??[],d=c.length>0?c.map(u=>`<span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#dbeafe;color:#2563eb;">${u.batchCode}(${De(u.start)}〜${De(u.end)})</span>`).join(" "):'<span style="font-size:9px;color:#22c55e;">空き</span>';return`<tr style="border-bottom:1px solid #f3f4f6;">
      <td style="padding:4px 6px;font-size:12px;font-weight:600;">${l.tankNo}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${kn(l.capacityL)}L</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280;">${l.preferredCategories.length>0?l.preferredCategories.join(", "):"全区分"}</td>
      <td style="padding:4px 6px;">${d}</td>
      <td style="padding:4px 3px;"><button data-action="bp-tank-delete" data-tank-id="${l.id}" style="font-size:9px;padding:1px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
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
  </section>`}function bu(e,t,n){if(e.length===0||n.length===0)return"";const o=new Map(n.map(y=>[y.stepName,y])),r=new Map;for(const y of e){if(!y.plannedStart||!y.plannedEnd)continue;const g=o.get(y.stepName);if(!g)continue;const f=new Date(y.plannedStart),x=new Date(y.plannedEnd),S=Math.max(Math.round((x.getTime()-f.getTime())/864e5)+1,1);let $=0;for(let P=0;P<S;P++)new Date(f.getTime()+P*864e5).getDay()!==0&&$++;if($===0)continue;const C=g.laborHours/$;for(let P=new Date(f);P<=x;P=new Date(P.getTime()+864e5)){if(P.getDay()===0)continue;const E=new Date(P);E.setDate(E.getDate()+3-(E.getDay()+6)%7);const s=new Date(E.getFullYear(),0,4),i=1+Math.round(((E.getTime()-s.getTime())/864e5-3+(s.getDay()+6)%7)/7),p=`${E.getFullYear()}-W${String(i).padStart(2,"0")}`;r.set(p,(r.get(p)??0)+C)}}if(r.size===0)return"";const l=[...r.keys()].sort(),c=t.workerCount*t.weeklyHoursLimit,d=Math.max(...r.values(),c),u=l.map(y=>{const g=r.get(y)??0,f=Math.min(g/d*100,100),x=g>c,S=x?"#ef4444":g>c*.8?"#f59e0b":"#22c55e",$=y.replace(/^\d{4}-W/,"W");return`<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${f}%;background:${S};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(g)}h / ${c}h"></div>
      </div>
      <div style="font-size:8px;color:#9ca3af;margin-top:2px;">${$}</div>
      <div style="font-size:9px;font-weight:600;color:${x?"#ef4444":"#374151"};">${Math.round(g)}h</div>
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
  </section>`}function wu(e,t,n,o={}){const{expandedBatchId:r,showNewForm:l,schedule:c=[],fy:d=2026,workerSettings:u={workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},stepLabor:y=[],tanks:g=[]}=o,f={};for(const s of t)(f[s.batchId]??=[]).push(s);const x=e.filter(s=>s.status==="active").length,S=e.filter(s=>s.status==="planned").length,$=e.filter(s=>s.status==="completed").length,C=r?e.find(s=>s.id===r):null,P=C?mu(C,f[C.id]??[]):"",E=C?gu(C,f[C.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">製造管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規仕込</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">醸造中</p><p class="kpi-value">${x}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${S}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${$}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${uu(e,f,r)}
    ${bu(t,u,y)}
    ${vu(g,e,f)}
    ${l?fu(n):""}
    ${hu(c,e)}
    ${P}
    ${E}
    ${yu(e,f,r)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">仕込を削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> の仕込を削除します。<br>関連する全工程データも削除されます。この操作は取り消せません。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}const xu=4e3,ls=3e5,$u=2,cs={soumu:"総",route_sales:"ル",brewing:"造",bottling:"詰",labeling:"貼",delivery:"配"};function ke(e){return e==null?"—":"¥"+Math.round(e).toLocaleString("ja-JP")}function _u(e){return`${e}月`}const at={soumu:"#3b82f6",route_sales:"#10b981",brewing:"#8b5cf6",bottling:"#f59e0b",labeling:"#ec4899",delivery:"#6b7280"},Qo={employee:"社員",part_time:"パート",contractor:"業務委託"},qt={employee:"#10b981",part_time:"#f59e0b",contractor:"#6b7280"};function Su(e,t){const n=Object.keys(Le),o=t?e.filter(S=>S.department===t):e,r=o.filter(S=>S.isActive),l=o.filter(S=>!S.isActive);function c(S){return`<span style="display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${at[S]};">${Le[S]}</span>`}function d(S){return S.crossDepartments.length?S.crossDepartments.map($=>`<span style="display:inline-block;padding:0 5px;border-radius:8px;font-size:10px;border:1px solid ${at[$]};color:${at[$]};margin-left:3px;">${Le[$]}</span>`).join(""):""}function u(S){if(S.employmentType==="employee")return`月給 ${ke(S.monthlySalary)}`;if(S.employmentType==="contractor")return`委託 ${ke(S.contractFee)}/日`;const $=S.shiftPreference?bn[S.shiftPreference]:"";return`時給 ${ke(S.hourlyRate)}${$?`・${$}`:""}`}function y(S){return S.monthlyTasks.length?S.monthlyTasks.map($=>`<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#7c3aed20;color:#7c3aed;border:1px solid #7c3aed40;margin-left:3px;">${vn[$]}</span>`).join(""):""}function g(S){const $=S.availableMonths?S.availableMonths.map(_u).join("・"):"通年";return`<tr class="${S.isActive?"":"row-inactive"}">
      <td>
        ${S.name}${S.kana?`<br><span style="font-size:11px;color:var(--text-secondary);">${S.kana}</span>`:""}
        ${y(S)}
      </td>
      <td>${c(S.department)}${d(S)}</td>
      <td><span class="status-pill" style="background:${qt[S.employmentType]}20;color:${qt[S.employmentType]};border:1px solid ${qt[S.employmentType]}40;">${Qo[S.employmentType]}</span></td>
      <td style="font-size:13px;">${u(S)}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${$}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${S.notes||""}</td>
      <td style="white-space:nowrap;">
        <button class="button secondary small" data-edit-staff="${S.id}">編集</button>
        <button class="button secondary small danger" data-delete-staff="${S.id}" data-staff-name="${S.name}" style="margin-left:4px;">削除</button>
      </td>
    </tr>`}const f=["",...n].map(S=>`<button class="button ${t===S?"primary":"secondary"} small" data-staff-dept-filter="${S}">${S?Le[S]:"全部門"}</button>`).join(""),x=7;return`
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      <div style="display:flex;gap:4px;flex-wrap:wrap;">${f}</div>
      <button class="button primary small" data-action="staff-new" style="margin-left:auto;">＋ スタッフ追加</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>氏名</th><th>主部門 / 兼務</th><th>種別</th><th>賃金</th><th>稼働月</th><th>備考</th><th></th>
        </tr></thead>
        <tbody>
          ${r.map(g).join("")||`<tr><td colspan="${x}" class="empty-row">スタッフが登録されていません</td></tr>`}
          ${l.length>0?`
            <tr><td colspan="${x}" style="padding:4px 8px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);">── 休職・退職・終了 ──</td></tr>
            ${l.map(g).join("")}
          `:""}
        </tbody>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:6px;">
      枠付きバッジ = 兼務可能部門（越境）
    </p>
  `}function ds(e){const t=!!e?.id,n=e?.availableMonths?e.availableMonths.join(","):"",o=Object.keys(Le),r=o.map(c=>`<option value="${c}" ${e?.department===c?"selected":""}>${Le[c]}</option>`).join(""),l=o.map(c=>`
    <label style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;font-size:13px;">
      <input type="checkbox" name="sf-cross" value="${c}" ${e?.crossDepartments?.includes(c)?"checked":""} />
      ${Le[c]}
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
                    ${bn[c]}
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
                    ${vn[c]}
                  </label>`).join("")}
              </div>
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>稼働月（空欄=通年、例: 9,10,11,12,1,2,3,4）</label>
              <input type="text" id="sf-months" value="${n}" placeholder="例: 9,10,11,12,1,2,3,4（造りスタッフ等）" />
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>兼務可能部門（越境）</label>
              <div style="padding:4px 0;display:flex;flex-wrap:wrap;">${l}</div>
            </div>

            <div class="form-row" style="grid-column:1/-1;">
              <label>備考</label>
              <input type="text" id="sf-notes" value="${e?.notes??""}" />
            </div>
            <div class="form-row" style="grid-column:1/-1;">
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
  `}function ps(e,t){return!e.isActive||e.availableMonths&&!e.availableMonths.includes(t)?0:e.employmentType==="employee"?e.monthlySalary??0:0}function ku(e,t){const[,n]=t.split("-").map(Number),o=Object.keys(Le),r=new Date,l=Array.from({length:24},(u,y)=>{const g=new Date(r.getFullYear(),r.getMonth()-6+y,1),f=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`;return`<option value="${f}" ${f===t?"selected":""}>${f.replace("-","年")}月</option>`}).join("");let c=0;const d=o.map(u=>{const y=e.filter(x=>x.department===u);if(y.length===0)return"";const g=y.reduce((x,S)=>x+ps(S,n),0);c+=g;const f=y.map(x=>{const S=ps(x,n),$=!x.isActive||x.availableMonths&&!x.availableMonths.includes(n),C=x.employmentType==="employee"?`月給 ${ke(x.monthlySalary)}`:x.employmentType==="contractor"?`委託 ${ke(x.contractFee)}/日`:`時給 ${ke(x.hourlyRate)} × ${x.workHoursPerDay}h（呼び出し）`,P=$?'<span style="color:var(--text-secondary);font-size:11px;">稼働外</span>':x.employmentType==="part_time"||x.employmentType==="contractor"?'<span style="color:var(--text-secondary);font-size:11px;">実績で集計</span>':ke(S);return`<tr style="${$?"opacity:0.45;":""}">
        <td style="padding-left:20px;">${x.name}</td>
        <td><span style="font-size:11px;padding:1px 6px;border-radius:8px;background:${qt[x.employmentType]}20;color:${qt[x.employmentType]};">${Qo[x.employmentType]}</span></td>
        <td style="font-size:12px;">${C}</td>
        <td class="numeric"><strong>${P}</strong></td>
      </tr>`}).join("");return`
      <tr style="background:var(--surface-alt);">
        <td colspan="3">
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${at[u]};margin-right:6px;"></span>
          <strong>${Le[u]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);margin-left:6px;">${y.length}名</span>
        </td>
        <td class="numeric"><strong>${g>0?ke(g):"—"}</strong></td>
      </tr>
      ${f}`}).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="cost-year-month" class="form-input" style="width:160px;">${l}</select>
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
  `}function Pu(e,t,n,o,r){const[l,c]=e.split("-").map(Number),d=E=>String(E).padStart(2,"0"),u=new Date(l,c,0).getDate(),y=n.some(E=>{for(let s=0;s<E.durationMonths;s++)if((E.brewMonth-1+s)%12+1===c)return!0;return!1});let g=0;if(g===0&&r&&r.prevYearRouteSalesAmount>0){const E=r.prevYearRouteSalesAmount/800;g=Math.min(18,Math.ceil(E/xu))}const f=[];for(let E=1;E<=u;E++)[0,6].includes(new Date(l,c-1,E).getDay())||f.push(E);const x=new Set(f.slice(-5)),S=f.filter(E=>!x.has(E)),$=new Set;if(g>0&&S.length>0){const E=S.length/g;for(let s=0;s<g&&s<S.length;s++){const i=Math.min(Math.round(s*E),S.length-1);$.add(S[i])}}function C(E,s=!1){return t.filter(i=>i.isActive&&(i.department===E||i.crossDepartments.includes(E))&&(!i.availableMonths||i.availableMonths.includes(c))&&(s||i.employmentType!=="part_time")).map(i=>i.id)}const P=[];for(const E of f){const s=`${l}-${d(c)}-${d(E)}`,i=x.has(E);P.push({planDate:s,department:"soumu",staffMemberIds:C("soumu"),notes:i?"棚卸週":""}),P.push({planDate:s,department:"route_sales",staffMemberIds:C("route_sales"),notes:""}),P.push({planDate:s,department:"delivery",staffMemberIds:C("delivery"),notes:""}),y&&P.push({planDate:s,department:"brewing",staffMemberIds:C("brewing"),notes:""}),$.has(E)&&(P.push({planDate:s,department:"bottling",staffMemberIds:C("bottling"),notes:""}),P.push({planDate:s,department:"labeling",staffMemberIds:C("labeling"),notes:""}))}return P}function Eu(e,t,n,o,r,l){const[c,d]=t.split("-").map(Number),u=h=>String(h).padStart(2,"0"),y=new Date(c,d,0).getDate(),g=new Date(c,d-1,1).getDay(),f=g===0?6:g-1,x=new Date().toISOString().slice(0,10),S=new Map;for(const h of l){const b=S.get(h.planDate)??[];b.push(h),S.set(h.planDate,b)}const $=l.length>0,C=new Date,P=Array.from({length:24},(h,b)=>{const _=new Date(C.getFullYear(),C.getMonth()-6+b,1),w=`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`;return`<option value="${w}" ${w===t?"selected":""}>${w.replace("-","年")}月</option>`}).join(""),s=["月","火","水","木","金","土","日"].map((h,b)=>`<div style="text-align:center;padding:5px 2px;font-size:11px;font-weight:700;color:${b===5?"#3b82f6":b===6?"#ef4444":"var(--text-secondary)"};background:var(--surface-alt);border-radius:4px;">${h}</div>`).join(""),i=Array(f).fill("<div></div>").join(""),p=Array.from({length:y},(h,b)=>{const _=b+1,w=`${c}-${u(d)}-${u(_)}`,k=new Date(c,d-1,_).getDay(),D=k===6,L=k===0,q=D||L,I=w===x,B=S.get(w)??[],O=B.some(M=>M.notes?.includes("棚卸")),R=B.map(M=>{const j=at[M.department],Y=M.staffMemberIds.length;return`<span style="display:inline-flex;align-items:center;gap:1px;font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;background:${j}22;color:${j};font-weight:700;border:1px solid ${j}44;" title="${Le[M.department]} ${Y}名">
        ${cs[M.department]}<span style="font-size:8px;opacity:0.85;">${Y}</span>
      </span>`}).join("");return`<div style="border:1px solid ${I?"var(--accent)":"var(--border)"};border-radius:4px;padding:3px 4px;min-height:68px;background:${q?"var(--surface-alt)":"var(--surface)"};${I?"outline:2px solid var(--accent);":""}${B.length===0&&!q?"opacity:0.4;":""}">
      <div style="font-size:10px;font-weight:700;color:${D?"#3b82f6":L?"#ef4444":I?"var(--accent)":"var(--text-secondary)"};margin-bottom:2px;">${_}</div>
      <div style="display:flex;flex-wrap:wrap;">${R}</div>
      ${O?'<div style="font-size:8px;color:#7c3aed;font-weight:700;margin-top:2px;">棚卸</div>':""}
    </div>`}).join(""),m=r?(()=>{const h=ls*$u*r.workingDays,b=h>0?Math.min(100,Math.round(r.routeSalesAmount/h*100)):0,_=b>=90?"#ef4444":b>=70?"#f59e0b":"#10b981",w=h>0?Math.min(100,Math.round(r.prevYearRouteSalesAmount/h*100)):0;return`<div class="panel" style="padding:10px 16px;margin-top:8px;">
      <p style="font-size:11px;font-weight:700;margin:0 0 8px;color:var(--text-secondary);">稼働指標（前年同月比較）</p>
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
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">配送積載率（2台 ${ke(ls)}/日）</p>
          <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
            <div style="flex:1;background:var(--border);border-radius:3px;height:5px;">
              <div style="width:${b}%;height:100%;background:${_};border-radius:3px;"></div>
            </div>
            <strong style="color:${_};font-size:11px;">${b}%</strong>
          </div>
          <span style="font-size:10px;color:var(--text-secondary);">${ke(r.routeSalesAmount)} ／ 前年 ${ke(r.prevYearRouteSalesAmount)}（${w}%）</span>
        </div>
      </div>
    </div>`})():"";return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="shift-year-month" class="form-input" style="width:160px;">${P}</select>
      <span style="font-size:11px;color:var(--text-secondary);">
        ${$?`${l.length}件のシフト登録済み`:"未生成"}
      </span>
      <button class="button ${$?"secondary":"primary"} small" data-action="shift-auto-generate" style="margin-left:auto;">
        ⚡ 自動生成${$?" (再生成)":""}
      </button>
    </div>

    ${$?"":`<div style="padding:12px 16px;font-size:12px;color:var(--text-secondary);background:var(--surface-alt);border-radius:8px;margin-bottom:12px;">
      「自動生成」で日次シフトを作成します。醸造計画・前年同月データをもとに詰口・造り稼働日を自動配置します。
    </div>`}

    <div style="overflow-x:auto;">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;min-width:490px;">
        ${s}
        ${i}
        ${p}
      </div>
    </div>

    <!-- 凡例 -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px;font-size:11px;color:var(--text-secondary);">
      ${Object.keys(Le).map(h=>`<span style="display:inline-flex;align-items:center;gap:3px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${at[h]};"></span>
          <strong style="color:${at[h]};">${cs[h]}</strong>${Le[h]}
        </span>`).join("")}
      <span>| 数字=配置人数</span>
    </div>

    ${m}
  `}function Au(e,t,n,o,r,l=0,c=null,d=[]){const u=t==="staff"?Su(e,n):t==="cost"?ku(e,o):Eu(e,o,r,l,c,d);return`
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
      ${u}
    </section>
  `}function Qa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function Lu(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Wo(e){return e?fa.find(t=>t.value===e)?.label??e:""}function Cu(e){const t=[],n=[],o=[];for(const r of e){const l=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,c={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:l,status:"dormant"};r.is_at_risk?t.push({...c,status:"at-risk"}):r.is_dormant?n.push({...c,status:"dormant"}):r.amount_last_year_same_month>0&&l<.8&&o.push({...c,status:"declining"})}return t.sort((r,l)=>l.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,l)=>l.daysSinceLastOrder-r.daysSinceLastOrder),o.sort((r,l)=>r.yoyRatio-l.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:o}}function Du(e,t){const n=t?.reason??"",o=fa.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${o}
    </select>`}function qu(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],o=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,l=r?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${Wo(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${l}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${o}
      <td class="numeric">${Qa(e.totalAmountLast12m)}</td>
      <td>${Du(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function qa(e,t,n,o,r,l,c,d){if(r.length===0)return"";const u=r.map(y=>qu(y,d.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${o}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${Lu(l)}</p>
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
    </section>`}function Tu(e,t=[]){const{atRiskCustomers:n,dormantCustomers:o,decliningCustomers:r}=e,l=n.length+o.length+r.length,c=n.reduce((P,E)=>P+E.totalAmountLast12m,0),d=o.reduce((P,E)=>P+E.totalAmountLast12m,0),u=r.reduce((P,E)=>P+E.totalAmountLast12m,0),y=[...n,...o,...r],g=[...new Set(y.map(P=>P.areaCode).filter(Boolean))].sort(),f=[...new Set(y.map(P=>P.businessType).filter(Boolean))].sort(),x=new Map(t.map(P=>[P.customerCode,P])),S=t.filter(P=>P.actionedAt).length,$=new Map;t.forEach(P=>{P.reason&&$.set(P.reason,($.get(P.reason)??0)+1)});const C=[...$.entries()].sort((P,E)=>E[1]-P[1]).slice(0,5).map(([P,E])=>`<span class="status-pill info" style="font-size:0.75rem;">${Wo(P)} ${E}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${Qa(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${o.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${Qa(d)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${S}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${l}社中</div>
      </div>
    </section>

    ${C?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${C}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${l})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${o.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${r.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${g.map(P=>`<option value="${P}">${P}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${f.map(P=>`<option value="${P}">${P}</option>`).join("")}
      </select>
    </div>

    ${qa("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",x)}
    ${qa("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",o,d,"経過日数",x)}
    ${qa("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",x)}

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
    <\/script>`}const Ye=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Wa={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},Ve={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Iu(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Mu(e){const t=e.reduce((l,c)=>l+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const o=Math.max(...e);return e.filter(l=>l>o*.1).length<=6?"seasonal":"year-round"}function Nu(e){const t=e.reduce((l,c)=>l+c,0);if(t===0)return[];const o=t/12*1.5,r=[];for(let l=0;l<12;l++)e[l]>o&&r.push(l);if(r.length===0){const l=Math.max(...e);l>0&&r.push(e.indexOf(l))}return r.sort((l,c)=>l-c)}function Ru(e){return e.length===0?0:(e[0]-2+12)%12}function us(e){const t=new Date().getMonth(),n=e.map(r=>{const l=Mu(r.monthlyQuantity),c=Nu(r.monthlyQuantity),d=Ru(c);return{code:r.code,name:r.name,category:r.category,peakMonths:c,proposalStartMonth:d,seasonType:l,monthlyQuantity:r.monthlyQuantity}}),o=[];for(let r=0;r<12;r++){const l=n.filter(c=>{if(c.peakMonths.length===0)return!1;const d=c.proposalStartMonth,u=c.peakMonths[0];return d<=u?r>=d&&r<=u:r>=d||r<=u});o.push({month:r,products:l,targetCustomers:[]})}return{products:n,proposals:o,selectedMonth:t}}function Ou(e){const{products:t,proposals:n,selectedMonth:o}=e,r=new Date().getMonth(),l={"year-round":[],seasonal:[],"year-end":[]};t.forEach(f=>l[f.seasonType].push(f));const c=n[o],d=t.length,u=c?.products.length??0,y=t.filter(f=>f.peakMonths.includes(o)).length,g=c?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${Ye[o]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${Ye[o]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${g}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${Ye.map((f,x)=>{const S=x===r,$=x===o;return`<button class="button" style="padding:4px 10px;background:${$?"#0F5B8D":S?"#e2e8f0":"transparent"};color:${$?"#fff":"#333"};border:${S&&!$?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${x}">${f}${S?" ●":""}</button>`}).join("")}
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
            ${Ye.map((f,x)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${x===r?"background:#f0f7ff;":""}">${f.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Bu(l,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${ju(l,o)}

  <!-- Target customer list for selected month -->
  ${zu(c)}
</div>`}function Bu(e,t){const n=[],o=["year-round","seasonal","year-end"];for(const r of o){const l=e[r];if(l.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${Ve[r]}15;color:${Ve[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${Wa[r]}</span>
    </td></tr>`);for(const c of l){const d=Ye.map((u,y)=>{const g=c.peakMonths.includes(y),f=Go(c,y),x=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let S="transparent";g?S=Ve[c.seasonType]:f&&(S=Ve[c.seasonType]+"40");const $=g||f?`background:${S};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${x}"><div style="${$}" title="${g?"ピーク":f?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${Ve[c.seasonType]}15;color:${Ve[c.seasonType]}">${Wa[c.seasonType]}</span></td>
        ${d}
      </tr>`)}}}return n.join("")}function Go(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,o=e.peakMonths[0];return n<=o?t>=n&&t<o:t>=n||t<o}function ju(e,t){const o=["year-round","seasonal","year-end"].map(r=>{const l=e[r];if(l.length===0)return"";const c=l.filter(u=>u.peakMonths.includes(t)||Go(u,t));if(c.length===0)return"";const d=c.map(u=>{const g=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',f=u.monthlyQuantity.reduce((x,S)=>x+S,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${g}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${f.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(x=>Ye[x]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${Ve[r]}15;color:${Ve[r]}">${Wa[r]}</span>
        <span style="font-size:0.85rem;color:#666">${Ye[t]}の対象: ${c.length}品</span>
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
    </div>`}).filter(Boolean);return o.length===0?`<div style="padding:1rem;color:#666;text-align:center">${Ye[t]}に提案対象の商品はありません</div>`:o.join("")}function zu(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${Iu(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const Fu=["日","月","火","水","木","金","土"];function Wt(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:`¥${e.toLocaleString()}`}function pt(e,t){if(t===0&&e===0)return'<span class="sc-yoy sc-yoy-flat">—</span>';if(t===0)return'<span class="sc-yoy sc-yoy-up">NEW</span>';const n=Math.round((e/t-1)*100);return n>0?`<span class="sc-yoy sc-yoy-up">+${n}%</span>`:n<0?`<span class="sc-yoy sc-yoy-down">${n}%</span>`:'<span class="sc-yoy sc-yoy-flat">±0%</span>'}function Pn(e){return e?e.totalVolumes.reduce((t,n)=>t+n.bottles,0):0}function Xo(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n-1,1),r=new Date(t,n,0),l=[];for(let c=0;c<o.getDay();c++)l.push({outside:!0});for(let c=1;c<=r.getDate();c++)l.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;l.length%7!==0;)l.push({outside:!0});return l}function ms(e){const[t,n,o]=e.split("-").map(Number),l=new Date(t,n-1,o).getDay(),c=Math.ceil(o/7),u=new Date(t-1,n-1,1).getDay(),g=1+(l-u+7)%7+(c-1)*7,f=new Date(t-1,n,0).getDate();return g>f?"":`${t-1}-${String(n).padStart(2,"0")}-${String(g).padStart(2,"0")}`}function ys(e,t){const[n,o]=t.split("-").map(Number),r=new Date(n,o,0).getDate(),l=Array.from({length:7},()=>({count:0,amount:0,bottles:0,days:0}));for(let c=1;c<=r;c++){const d=`${t}-${String(c).padStart(2,"0")}`,u=new Date(n,o-1,c).getDay();l[u].days++;const y=e[d];y&&(l[u].count+=y.count,l[u].amount+=y.totalAmount,l[u].bottles+=Pn(y))}return l}function Vu(e,t){const n=[];for(let o=0;o<t.length;o+=7){const r=t.slice(o,o+7);let l=0,c=0,d=0,u=0;for(const y of r)if(y.date){u++;const g=e[y.date];g&&(l+=g.count,c+=g.totalAmount,d+=Pn(g))}n.push({count:l,amount:c,bottles:d,days:u})}return n}function Yu(e,t){const[n,o]=t.split("-").map(Number),r=`${n-1}-${String(o).padStart(2,"0")}`,l=Xo(r),c=[];for(let d=0;d<l.length;d+=7){const u=l.slice(d,d+7);let y=0,g=0,f=0,x=0;for(const S of u)if(S.date){x++;const $=e[S.date];$&&(y+=$.count,g+=$.totalAmount,f+=Pn($))}c.push({count:y,amount:g,bottles:f,days:x})}return c}function Uu(e,t,n,o){const[r,l]=t.split("-").map(Number),c=new Date(r,l-2,1),d=new Date(r,l,1),u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,y=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,g=new Date().toISOString().slice(0,10),f=o??{},x=Xo(t),S=e?ys(e,t):null,$=`${r-1}-${String(l).padStart(2,"0")}`,C=o?ys(o,$):null,P=e?Vu(e,x):null,E=o?Yu(o,t):null;let s="";if(e===null)s='<div class="sc-loading" style="grid-column:1/-1;"><div class="loading-spinner"></div><p>読み込み中…</p></div>';else for(let _=0;_<x.length;_++){const w=x[_];if(w.outside)s+='<div class="sc-cell sc-outside"></div>';else{const k=w.date,D=Number(k.split("-")[2]),L=new Date(`${k}T00:00:00`).getDay(),q=e[k],I=k===g,B=k===n,O=f[ms(k)],R=q?.totalAmount??0,M=O?.totalAmount??0;let j="",Y="",J="",W="";q&&(j=`<span class="sc-badge">${q.count}件</span>`,Y=`<div class="sc-day-amt">${Wt(R)}</div>`,W=q.cityGroups.slice(0,2).map(Q=>`<span class="sc-city-tag">${Q.city}<em>${Q.count}</em></span>`).join(""),q.cityGroups.length>2&&(W+=`<span class="sc-city-more">+${q.cityGroups.length-2}</span>`)),(R>0||M>0)&&(J=`<div class="sc-day-yoy">${pt(R,M)}</div>`),s+=`
          <div class="sc-cell ${I?"sc-today":""} ${B?"sc-selected":""} ${q?"sc-has-data":""}"
               data-sc-date="${k}">
            <div class="sc-day-header">
              <span class="sc-day-num ${L===0?"sc-sun":L===6?"sc-sat":""}">${D}</span>
              ${j}
            </div>
            ${Y}
            ${J}
            <div class="sc-cities">${W}</div>
          </div>`}if((_+1)%7===0&&P){const k=Math.floor(_/7),D=P[k],L=E?.[k],q=D.days>0?D.count/D.days:0,I=L?.amount??0;s+=`
          <div class="sc-cell sc-week-total">
            <div class="sc-wt-count">${D.count}<small>件</small></div>
            <div class="sc-wt-amount">${Wt(D.amount)}</div>
            <div class="sc-wt-bottles">${D.bottles}<small>本</small></div>
            <div class="sc-wt-avg">⌀${q.toFixed(1)}<small>件/日</small></div>
            ${D.amount>0||I>0?`<div class="sc-wt-yoy">${pt(D.amount,I)}</div>`:""}
          </div>`}}let i="";if(S){i=S.map((I,B)=>{const O=I.days>0?I.count/I.days:0,R=B===0?"sc-sun":B===6?"sc-sat":"",j=C?.[B]?.amount??0;return`<div class="sc-wd-summary ${R}">
        <span class="sc-wds-count">${I.count}<small>件</small></span>
        <span class="sc-wds-amt">${Wt(I.amount)}</span>
        <span class="sc-wds-bottles">${I.bottles}<small>本</small></span>
        <span class="sc-wds-avg">⌀${O.toFixed(1)}</span>
        ${I.amount>0||j>0?`<span class="sc-wds-yoy">${pt(I.amount,j)}</span>`:""}
      </div>`}).join("");const _=S.reduce((I,B)=>I+B.count,0),w=S.reduce((I,B)=>I+B.amount,0),k=S.reduce((I,B)=>I+B.bottles,0),D=S.reduce((I,B)=>I+B.days,0),L=D>0?_/D:0,q=C?C.reduce((I,B)=>I+B.amount,0):0;i+=`<div class="sc-wd-summary sc-wd-month-total">
      <span class="sc-wds-count">${_}<small>件</small></span>
      <span class="sc-wds-amt">${Wt(w)}</span>
      <span class="sc-wds-bottles">${k}<small>本</small></span>
      <span class="sc-wds-avg">⌀${L.toFixed(1)}</span>
      ${w>0||q>0?`<span class="sc-wds-yoy">${pt(w,q)}</span>`:""}
    </div>`}const p=n&&e?.[n]?Hu(e[n],f[ms(n)]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',m=Object.values(e??{}).reduce((_,w)=>_+w.count,0),h=Object.values(e??{}).reduce((_,w)=>_+w.totalAmount,0),b=Object.values(f).reduce((_,w)=>_+w.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${m>0?`月計: <strong>${m}件</strong> / <strong>¥${h.toLocaleString()}</strong> ${pt(h,b)}`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${u}">◀</button>
          <span class="sc-month-label">${r}年${l}月</span>
          <button class="sc-nav-btn" data-sc-ym="${y}">▶</button>
        </div>
        <div class="sc-unit-note">K=¥1,000 / M=¥1,000,000 ｜ 昨対: 前年同月 同週同曜日比</div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays-8">
            ${Fu.map((_,w)=>`<div class="sc-weekday ${w===0?"sc-sun":w===6?"sc-sat":""}">${_}</div>`).join("")}
            <div class="sc-weekday sc-wk-header">週計</div>
          </div>

          ${i?`<div class="sc-wd-summary-row">${i}</div>`:""}

          <div class="sc-grid-8">
            ${s}
          </div>
        </div>

        <div class="sc-detail-col${n?" sc-detail-active":""}">
          ${p}
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
  `}function Ju(e){return e.length?e.map(t=>`<span class="sc-vol-badge">${t.label}<em>${t.bottles}</em></span>`).join(""):""}function Hu(e,t){const n=e.date.replace(/-/g,"/").slice(5),o=e.totalVolumes.length?`<div class="sc-day-volumes">${e.totalVolumes.map(y=>`<span class="sc-vol-tag">${y.label} <strong>${y.bottles}本</strong></span>`).join("")}</div>`:"",r=t?.totalAmount??0,l=t?.count??0,c=e.totalAmount>0||r>0?`<div class="sc-detail-yoy">
        前年同日: ${l}件 / ¥${r.toLocaleString()}
        ${pt(e.totalAmount,r)}
      </div>`:"",d={};for(const y of e.entries)(d[y.city]??=[]).push(y);const u=Object.entries(d).sort((y,g)=>g[1].length-y[1].length).map(([y,g])=>{const f=g.sort((x,S)=>S.amount-x.amount).map(x=>`
          <div class="sc-customer-row">
            <div class="sc-customer-main">
              <span class="sc-customer-name" title="${x.customerName}">${x.customerName}</span>
              <span class="sc-customer-amt">${x.amount>0?`¥${x.amount.toLocaleString()}`:"-"}${x.invoiceCount>1?` (${x.invoiceCount}伝票)`:""}</span>
            </div>
            ${x.volumes.length?`<div class="sc-customer-vols">${Ju(x.volumes)}</div>`:""}
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${y}（${g.length}先）</div>
          ${f}
        </div>`}).join("");return`
    <p class="sc-detail-date">${n}の出荷</p>
    <p class="sc-detail-meta">${e.entries.length}先 ${e.count}伝票 / ¥${e.totalAmount.toLocaleString()}</p>
    ${c}
    ${o}
    ${u}
  `}const Ku=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),Ta=["月","火","水","木","金"],hs=6;function Qu(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function Wu(e,t){if(t.length===0)return 0;const n=[...t].sort((r,l)=>r-l);return n.filter(r=>r<=e).length/n.length}function Gu(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function fs(e){const t=new Date,n=e.map(u=>u.annualRevenue),o=e.map(u=>{const y=Qu(u.lastOrderDate,t);let g=0;const f=[];y>=60&&(g+=50,f.push("離反リスク")),u.hasSeasonalProposal&&(g+=30,f.push("季節提案タイミング")),y>=30&&y<60&&(g+=20,f.push("定期巡回"));const x=Wu(u.annualRevenue,n),S=Math.round(x*20);S>0&&(g+=S,f.push("金額ウェイト"));const $=Gu(f,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:g,reasons:f,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:$}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),r=new Map;for(const u of o){const y=u.areaCode||"その他";r.has(y)||r.set(y,[]),r.get(y).push(u)}const l=[...r.entries()].sort((u,y)=>y[1].reduce((g,f)=>g+f.priorityScore,0)-u[1].reduce((g,f)=>g+f.priorityScore,0)),c=[];let d=0;for(const[u,y]of l){const g=y.sort((f,x)=>x.priorityScore-f.priorityScore);for(let f=0;f<g.length&&!(d>=Ta.length);f+=hs){const x=g.slice(f,f+hs);c.push({dayLabel:Ta[d],area:u,visits:x}),d++}if(d>=Ta.length)break}return{candidates:o,weekPlan:c,filterArea:"",filterMinScore:0}}function Xu(e){const{candidates:t,weekPlan:n,filterArea:o,filterMinScore:r}=e,l=t.filter(f=>!(o&&f.areaCode!==o||r>0&&f.priorityScore<r)),c=Array.from(new Set(t.map(f=>f.areaCode))).sort(),d=l.length,u=l.filter(f=>f.priorityScore>=50).length,y=l.filter(f=>f.reasons.includes("離反リスク")).length,g=n.reduce((f,x)=>f+x.visits.length,0);return`
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
        <div class="kpi-value">${g}</div>
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
            ${c.map(f=>`<option value="${f}"${o===f?" selected":""}>${f}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":Zu(n)}
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
            ${l.map(f=>em(f)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Zu(e){return`
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
  `}function em(e){return`
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
      <td class="numeric">${Ku.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function tm(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},o=e.map(y=>{const g=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${y.tankNo}</strong></td>
          <td class="numeric">${y.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${y.currentVolume>0?y.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${g}%"></div>
            </div>
            <span class="progress-label">${g}%</span>
          </td>
          <td>${y.productName||"―"}</td>
          <td class="mono">${y.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${n[y.status]}">${t[y.status]}</span>
          </td>
          <td>${y.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${y.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),r=e.filter(y=>y.status==="in_use").length,l=e.filter(y=>y.status==="aging").length,c=e.filter(y=>y.status==="empty").length,d=e.reduce((y,g)=>y+g.capacity,0),u=e.reduce((y,g)=>y+g.currentVolume,0);return`
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
        <p class="kpi-sub">使用率 ${d>0?Math.round(u/d*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${r} 基</p>
        <p class="kpi-sub">熟成中 ${l} 基</p>
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
          <tbody>${o||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ia(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function am(e){if(e.length===0)return`<section class="panel">
      <div class="panel-header">
        <div>
          <h2>移出量集計（販売実績ベース）</h2>
          <p class="panel-caption">当月の販売伝票から自動集計した移出量と概算税額</p>
        </div>
      </div>
      <p class="empty-message">データなし — 商品マスタに volume_ml が設定されていることを確認してください。</p>
    </section>`;const t=e.reduce((c,d)=>c+d.volumeSaleL,0),n=e.reduce((c,d)=>c+d.volumeReturnL,0),o=e.reduce((c,d)=>c+d.volumeNetL,0),r=e.reduce((c,d)=>c+d.taxAmount,0);return`<section class="panel">
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
            <th class="numeric">${o.toLocaleString("ja-JP",{maximumFractionDigits:3})}</th>
            <th></th>
            <th class="numeric"><strong>${r.toLocaleString("ja-JP")} 円</strong></th>
          </tr>
        </tfoot>
      </table>
    </div>
    <p class="form-hint" style="margin-top: 8px;">
      度数が「未設定」のリキュールは税額を計算できません。商品マスタの <code>alcohol_degree</code> を更新してください。
    </p>
  </section>`}function nm(e,t,n,o=[]){const r=e.rows.map((g,f)=>`
      <tr>
        <td class="mono">${g.taxCategory}</td>
        <td>${g.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${f}" data-tax-field="alcoholDegree" value="${g.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${f}" data-tax-field="productionVolume" value="${g.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${f}" data-tax-field="previousBalance" value="${g.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${f}" data-tax-field="exportDeduction" value="${g.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${f}" data-tax-field="sampleDeduction" value="${g.sampleDeduction}" />
        </td>
        <td class="numeric">${g.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${g.taxRate}</td>
        <td class="numeric"><strong>${Ia(g.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${f}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),l=e.deductions.map((g,f)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${f}" data-ded-field="type">
            ${Object.keys(za).map(x=>`<option value="${x}" ${x===g.type?"selected":""}>${za[x]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${f}" data-ded-field="categoryCode">
            ${to.map(x=>`<option value="${x.code}" ${x.code===g.categoryCode?"selected":""}>${x.code}:${x.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${f}" data-ded-field="volume" value="${g.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${f}" data-ded-field="reason" value="${g.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${f}" data-ded-field="documentNo" value="${g.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${f}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),c=Array.from({length:12},(g,f)=>f+1),d=e.rows.reduce((g,f)=>g+f.exportDeduction+f.sampleDeduction,0),u=e.rows.reduce((g,f)=>g+f.productionVolume,0),y=u>0?d/u*100:0;return`
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
            ${[2025,2026,2027].map(g=>`<option value="${g}" ${t===g?"selected":""}>${g}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${c.map(g=>`<option value="${g}" ${n===g?"selected":""}>${g}月</option>`).join("")}
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
        <p class="kpi-value">${Ia(e.totalTax)}</p>
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
              <th class="numeric">${Ia(e.totalTax)}</th>
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

    ${am(o)}

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
  `}const En=[{title:"販売業務",color:"#1a56db",features:[{id:"invoice-entry",route:"/invoice-entry",label:"伝票入力",desc:"売上・返品伝票の新規入力、明細追加",addedVersion:1},{id:"invoice-browse",route:"/invoice",label:"伝票照会",desc:"過去伝票の検索・表示・PDF出力",addedVersion:1},{id:"delivery-note",route:"/delivery",label:"納品書発行",desc:"納品書のPDFダウンロード・印刷",addedVersion:1},{id:"billing-monthly",route:"/billing",label:"月次請求",desc:"請求書発行・入金消込・未収管理",addedVersion:1},{id:"ledger-view",route:"/ledger",label:"得意先台帳",desc:"得意先別の取引履歴・残高確認",addedVersion:1},{id:"quote-create",route:"/quote",label:"見積作成",desc:"見積書の作成・PDF出力・メール送付",addedVersion:50},{id:"shipment-calendar",route:"/shipment-calendar",label:"配送カレンダー",desc:"伝票日付ベースの配送スケジュール確認",addedVersion:200}]},{title:"分析・レポート",color:"#7e3af2",features:[{id:"analytics-monthly",route:"/analytics",label:"月次売上グラフ",desc:"月次・商品別・得意先別の売上推移グラフ",addedVersion:1},{id:"analytics-volume",route:"/analytics",label:"移出量集計",desc:"商品・得意先別の移出量（mL）集計",addedVersion:320},{id:"customer-analysis",route:"/customer-analysis",label:"得意先分析",desc:"ABC分析・購買頻度・LTV",addedVersion:100},{id:"product-power",route:"/product-power",label:"商品力分析",desc:"商品別販売力・成長率",addedVersion:100},{id:"customer-efficiency",route:"/customer-efficiency",label:"営業効率",desc:"訪問コスト・粗利効率",addedVersion:150},{id:"report-aggregate",route:"/report",label:"集計帳票",desc:"各種集計レポートの出力",addedVersion:50},{id:"sales-list",route:"/sales",label:"売上一覧",desc:"売上明細の一覧表示・CSV出力",addedVersion:1}]},{title:"営業・顧客管理",color:"#0e9f6e",features:[{id:"churn-alert",route:"/churn-alert",label:"営業アクション",desc:"離反リスク検知・フォロー優先度",addedVersion:150},{id:"visit-planner",route:"/visit-planner",label:"訪問計画",desc:"訪問スケジュールの作成・管理",addedVersion:200},{id:"map-view",route:"/map",label:"取引先マップ",desc:"地図上で取引先の位置確認",addedVersion:100},{id:"prospects",route:"/prospects",label:"新規営業",desc:"新規開拓リストの進捗管理",addedVersion:100},{id:"email-broadcast",route:"/email",label:"メール配信",desc:"一斉メール配信・テンプレート管理",addedVersion:200},{id:"seasonal-calendar",route:"/seasonal-calendar",label:"季節提案",desc:"季節別提案スケジュール管理",addedVersion:250}]},{title:"受注・仕入",color:"#e3a008",features:[{id:"workflow-order",route:"/workflow",label:"受注ワークフロー",desc:"受注から出荷までのステータス管理",addedVersion:150},{id:"shopify-orders",route:"/shopify",label:"Shopify受注",desc:"EC受注の確認・取込",addedVersion:200},{id:"purchase-manage",route:"/purchase",label:"仕入・買掛",desc:"仕入管理・買掛金残高",addedVersion:100},{id:"payment-status",route:"/payment",label:"入金状況",desc:"入金・回収状況の一覧",addedVersion:1}]},{title:"製造管理",color:"#e02424",features:[{id:"jikomi-record",route:"/jikomi",label:"仕込管理",desc:"仕込帳・麹室・タンク仕込記録",addedVersion:200},{id:"tanks-manage",route:"/tanks",label:"タンク管理",desc:"タンク別在庫・ブレンド管理",addedVersion:200},{id:"tax-declaration",route:"/tax",label:"酒税申告書",desc:"課税移出・控除明細・eTax XML出力",addedVersion:250},{id:"tax-volume",route:"/tax",label:"移出量自動集計",desc:"販売伝票から清酒・リキュール別移出量を自動計算",addedVersion:322},{id:"demand-forecast",route:"/demand",label:"需要予測",desc:"過去実績ベースの需要予測",addedVersion:250},{id:"brewing-plan",route:"/brewing-plan",label:"醸造計画",desc:"年間醸造スケジュール管理",addedVersion:280},{id:"procurement-plan",route:"/procurement",label:"調達計画",desc:"原料米の調達・予算管理",addedVersion:280},{id:"brewing-process",route:"/brewing-process",label:"醸造工程",desc:"バッチ別工程管理・麹室制約チェック",addedVersion:300}]},{title:"マスタ・設定",color:"#6b7280",features:[{id:"master-products",route:"/master",label:"商品マスタ",desc:"商品情報の参照・編集",addedVersion:1},{id:"master-customers",route:"/master",label:"得意先マスタ",desc:"得意先情報の参照・編集",addedVersion:1},{id:"store-pos",route:"/store",label:"店舗販売",desc:"直売所のPOS・販売記録",addedVersion:250},{id:"tour-booking",route:"/tour",label:"酒蔵見学予約",desc:"見学予約の受付・管理",addedVersion:250},{id:"relay-status",route:"/setup",label:"連動状態",desc:"酒仙iとのリレー同期状態確認",addedVersion:1},{id:"csv-import",route:"/import",label:"CSV取込",desc:"マスタ・売上データのCSVインポート",addedVersion:100},{id:"user-manage",route:"/users",label:"ユーザー管理",desc:"アカウント・権限管理",addedVersion:100},{id:"url-share",route:"/",label:"URL共有",desc:"PWAモードでも全ページをURLで共有可能",addedVersion:322}]}];function gs(){return En.flatMap(e=>e.features)}function sm(e,t){const n=Date.now()-2592e6;return En.flatMap(o=>o.features).filter(o=>o.route===e).some(o=>{const r=t[o.id];return r?.confirmedAt!=null&&new Date(r.confirmedAt).getTime()>n})}function om(e,t){const o=gs().filter(c=>e[c.id]?.confirmedAt).length,r=gs().length,l=En.map(c=>{const d=c.features.map(y=>{const g=e[y.id],f=!!g?.confirmedAt,x=g?.confirmedAt?new Date(g.confirmedAt).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}):"",S=g?.confirmedBy?`(${g.confirmedBy})`:"",$=f&&g?.confirmedAt?Date.now()-new Date(g.confirmedAt).getTime()<720*60*60*1e3:!1;return`
        <tr class="feature-row ${f?"confirmed":""}">
          <td class="feature-check">
            <input type="checkbox" class="feature-checkbox" data-feature-id="${y.id}"
              ${f?"checked":""} />
          </td>
          <td class="feature-label">
            <a href="#" data-link="${y.route}" class="feature-link">${y.label}</a>
            ${$?'<span class="badge-new-small">使用可能</span>':""}
          </td>
          <td class="feature-desc">${y.desc}</td>
          <td class="feature-version mono">v${y.addedVersion}</td>
          <td class="feature-status">
            ${f?`<span class="status-pill success">確認済 ${x} ${S}</span>`:'<span class="status-pill muted">未確認</span>'}
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
        <p class="kpi-value">${o} / ${r}</p>
        <p class="kpi-sub">${Math.round(o/r*100)}% 動作確認完了</p>
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

    ${l}
  `}const rm={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let We=null,im=0;const Ga=[];function lm(){return We&&document.body.contains(We)||(We=document.createElement("div"),We.className="toast-container",document.body.appendChild(We)),We}function F(e,t="success",n){const o=lm(),r=++im,l=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${rm[t]}</span>
    <span class="toast-msg">${dm(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const d={id:r,message:e,type:t,el:c};Ga.push(d),o.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>cm(d);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},l)}function cm(e){const t=Ga.indexOf(e);t!==-1&&(Ga.splice(t,1),e.el.remove())}function dm(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ae(e,t={}){const{title:n="確認",confirmLabel:o="OK",cancelLabel:r="キャンセル",variant:l="primary"}=t;return new Promise(c=>{const d=document.createElement("div");d.className="modal-backdrop confirm-backdrop",d.setAttribute("role","dialog"),d.setAttribute("aria-modal","true"),d.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${l}">
            ${l==="danger"?pm:um}
          </div>
          <h3 class="confirm-title">${Gt(n)}</h3>
          <p class="confirm-message">${Gt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Gt(r)}</button>
          <button class="button ${l} confirm-ok">${Gt(o)}</button>
        </div>
      </div>
    `;const u=g=>{d.classList.add("confirm-exit"),d.addEventListener("animationend",()=>{d.remove()},{once:!0}),c(g)};d.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),d.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),d.addEventListener("click",g=>{g.target===d&&u(!1)});const y=g=>{g.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(d),requestAnimationFrame(()=>{d.querySelector(".confirm-ok")?.focus()})})}const pm=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,um=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Gt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function vs(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Xa(e,t,n){if(t.length===0&&(!n||n.length===0))return;const o=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),l=`\uFEFF${[o.map(y=>vs(y.label)).join(","),...t.map(y=>o.map(g=>vs(y[g.key])).join(","))].join(`\r
`)}`,c=new Blob([l],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(c),u=document.createElement("a");u.href=d,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(d),0)}const mm=Object.fromEntries(fa.map(e=>[e.value,e.label])),ym=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process","/workforce","/changelog"];let mt=[];async function hm(){const{supabaseQueryAll:e}=await N(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:n}},void 0);mt=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const bs=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"},{path:"/changelog",title:"機能一覧・更新履歴"}];function Zo(e){const t=nn[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function An(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function fm(){const e=Zo("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const va=new Date,gm=va.toISOString().slice(0,7),vm=va.getFullYear(),bm=va.getMonth()+1,wm=va.toISOString().slice(0,10),xm="C0011",Ge=fm();function er(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return ym.includes(n)?n:"/"}function ba(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const ws=er(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,systemHealth:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,analysisTab:"customer",analysisPeriod:"",invoiceForm:An(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:gm,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:vm,taxMonth:bm,taxVolume:null,featureStatuses:null,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],mapLoaded:!1,callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Lp,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Cp},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:wm,route:ws,currentCategory:ba(ws),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,ledgerCustomerCode:xm,salesPeriod:"month",customRange:{start:"",end:""},quoteState:pa(Va()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCustomerFilter:"",quoteCustomerFilterName:"",quoteCompanySettings:Va(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyFiscalType:"jan",customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...xn},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Ge.mode,emailRegion:Ge.region,emailHistorySegment:Ge.historySegment,emailTemplateId:Ge.templateId,emailSubject:Ge.subject,emailBody:Ge.body,emailSaveMessage:Ge.saveMessage,emailSending:!1,demandForecast:{...bc},shipmentCalendarData:null,shipmentCalendarPrevYearData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:Dt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:nt,empCapacity:st},brewingSchedule:[],staffMembers:[],workforceMetrics:null,dailyShiftPlans:[],workforceTab:"staff",staffDeptFilter:"",workforceYearMonth:new Date().toISOString().slice(0,7),brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,bpWorkerSettings:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},bpStepLabor:[],bpTanks:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function xs(e){return e.slice(0,10)}function $m(e){return{...e}}function ma(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function tr(){a.invoiceForm=An(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},ma()}function ar(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,o)=>{n.productCode.trim()||(t[`lines.${o}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${o}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${o}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${o}.unitPrice`]="単価は0円以上で入力してください。")}),t}function _m(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,$m(t))}function Sm(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((o,r)=>{const l=r===0?1:2,c=1200*(r+1);return{productCode:o.code,productName:o.name,quantity:l,unitPrice:c,unit:"本",amount:l*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function km(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Pm(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function nr(e){if(Ne(e),a.invoiceErrors=ar(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){A();return}a.invoiceSaving=!0,A(),Os(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=An(),A()}).catch(()=>{a.invoiceSaving=!1,A()})}function sr(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((o,r)=>new Date(r.date).getTime()-new Date(o.date).getTime()).filter(o=>{const r=new Date(o.date);return!(t&&r<t||n&&r>n)})}function or(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?mt:mt.filter(e=>e.area===a.emailRegion);case"history":return mt.filter(e=>e.historySegment===a.emailHistorySegment);default:return mt}}function Em(){const e=or();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function Ma(e){const t=or(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(o=>o.email),status:e}}function Ln(){return a.user,!1}function It(){a.globalSearchOpen=!1,a.globalQuery=""}function Am(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:bs.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:bs}}function Lm(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?sr(a.salesSummary):[]).map(o=>({documentNo:o.documentNo,date:o.date,customerCode:o.customerCode,customerName:o.customerName,amount:o.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((o,r)=>r.balanceAmount-o.balanceAmount).map(o=>({...o})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(o=>({...o})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(o=>({...o})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(o=>({...o})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(o=>({...o})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(o=>({...o}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(o=>({...o}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Xa(n,e,t)}function tt(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=ba(e),a.sidebarOpen=!1,e==="/customer-analysis"&&(a.analysisTab="customer"),e!=="/quote"&&(a.quoteCustomerFilter="",a.quoteCustomerFilterName=""),It(),Mt(e)}function oa(e){const t=a.demandAnalysis,n=a.safetyStockParams;if(!t||n.length===0)return[];const[o,r]=e.split("-"),l=`${parseInt(o)-1}-${r}`,c=t.months.filter(d=>d<e).slice(-3);return n.map(d=>{const u=d.productionType==="make_to_order",y=t.matrix[d.productCode]?.[l]??0,g=c.map(C=>t.matrix[d.productCode]?.[C]??0),f=g.length>0?g.reduce((C,P)=>C+P,0)/g.length:d.avgMonthlyDemand,x=u?0:y>0?Math.ceil(y):Math.ceil(f),S=u?0:Math.ceil(d.safetyStockQty),$=Math.max(0,x+S);return{id:"",yearMonth:e,productCode:d.productCode,productName:d.productName,demandForecast:x,safetyStockTarget:S,openingStock:0,requiredProduction:$,plannedQty:u?0:$,actualQty:0,status:"draft",productionType:d.productionType??"monthly",notes:""}})}async function Mt(e){a.actionLoading=!0,A();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,A(),a.quoteList=await ca(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await N(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>z);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await Tt(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await rn());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await ln(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await N(async()=>{const{fetchShipmentCalendar:u}=await Promise.resolve().then(()=>z);return{fetchShipmentCalendar:u}},void 0),n=a.shipmentCalendarYearMonth,[o,r]=n.split("-").map(Number),l=`${o-1}-${String(r).padStart(2,"0")}`,[c,d]=await Promise.all([t(n),t(l)]);a.shipmentCalendarData=c,a.shipmentCalendarPrevYearData=d;break}case"/billing":a.billingSummary||(a.billingSummary=await cn(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Bs());break;case"/product-power":case"/product-abc":tt("/customer-analysis"),a.analysisTab="product";return;case"/customer-efficiency":a.customerEfficiency=await ut(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);break;case"/customer-analysis":await Promise.all([Vs(a.analysisPeriod).then(t=>{a.customerAnalysis=t}),Ys(a.analysisPeriod).then(t=>{a.productABC=t})]);break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await N(async()=>{const{fetchDemandForecasts:l,fetchDeliverySchedule:c}=await Promise.resolve().then(()=>z);return{fetchDemandForecasts:l,fetchDeliverySchedule:c}},void 0),[o,r]=await Promise.all([t(),n()]);a.demandForecast.forecasts=o.map(l=>({code:l.productCode,name:l.productName,segment:l.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(l.avgMonthly),adjustedAvg:Math.round(l.avgMonthly),nextMonthForecast:Math.round(l.forecastQuantity),annualForecast:Math.round(l.avgMonthly*12),safetyStock:Math.round(l.safetyStock)})),a.demandForecast.deliveries=wc(r)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await N(async()=>{const{fetchChurnAlerts:o,fetchChurnNotes:r}=await Promise.resolve().then(()=>z);return{fetchChurnAlerts:o,fetchChurnNotes:r}},void 0);if(!a.churnAlert){const o=await t();a.churnAlert=Cu(o)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await N(async()=>{const{fetchProductShipmentsFromTable:o}=await Promise.resolve().then(()=>z);return{fetchProductShipmentsFromTable:o}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=us(n.map(o=>({code:o.code,name:o.name,category:"",monthlyQuantity:o.monthlyQuantity})));else{const{fetchProductMonthlyShipments:o}=await N(async()=>{const{fetchProductMonthlyShipments:l}=await Promise.resolve().then(()=>z);return{fetchProductMonthlyShipments:l}},void 0),r=await o();a.seasonalCalendar=us(r.map(l=>({code:l.code,name:l.name,category:"",monthlyQuantity:l.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await N(async()=>{const{fetchVisitPriorities:o}=await Promise.resolve().then(()=>z);return{fetchVisitPriorities:o}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address:o.address,areaCode:o.area_code,businessType:o.business_type,priorityScore:o.priority_score,reasons:o.reasons,lastOrderDate:o.last_order_date,daysSinceOrder:o.days_since_order,annualRevenue:o.annual_revenue,recommendedAction:o.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=fs(n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address1:o.address,areaCode:o.area_code,businessType:o.business_type,annualRevenue:o.annual_revenue,lastOrderDate:o.last_order_date,hasSeasonalProposal:o.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:o}=await N(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:u}},void 0),[r,l]=await Promise.all([o("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):sn().then(u=>u.customers)]),c=a.masterStats?.customers??l,d=new Map;r.forEach(u=>{const y=u.legacy_customer_code||"",g=u.sales_date||"",f=Number(u.total_amount)||0,x=d.get(y);!x||g>x.lastDate?d.set(y,{lastDate:g,total:(x?.total??0)+f}):x.total+=f}),a.visitPlanner=fs(c.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:d.get(u.code)?.total??0,lastOrderDate:d.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:o,fetchLabelExclusions:r}=await N(async()=>{const{fetchDemandAnalysis:c,fetchSafetyStockParams:d,fetchProductionPlan:u,fetchLabelExclusions:y}=await Promise.resolve().then(()=>z);return{fetchDemandAnalysis:c,fetchSafetyStockParams:d,fetchProductionPlan:u,fetchLabelExclusions:y}},void 0);if(!a.demandAnalysis){const[c,d]=await Promise.all([t(a.demandYearsBack*12).catch(u=>(console.error("fetchDemandAnalysis failed:",u),null)),n().catch(u=>(console.error("fetchSafetyStockParams failed:",u),[]))]);c&&(a.demandAnalysis=c),a.safetyStockParams=d}if(a.productionPlan.length===0){const c=await o(a.demandPlanYearMonth).catch(()=>[]);c.length>0?a.productionPlan=c:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=oa(a.demandPlanYearMonth))}const l=await r(a.demandPlanYearMonth).catch(()=>[]);if(a.calendarLabelExcluded=new Set(l),a.productionPlan.length>0){const c=a.productionPlan.filter(d=>!a.calendarLabelExcluded.has(d.productCode));ze(a.calendarShifts,c,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:o,fetchBrewingProductDetail:r,fetchBrewingCustomCategories:l,fetchBrewingCategoryOverrides:c,fetchAllBrewingStockEntries:d,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:y,fetchBrewingAlcoholSettings:g,fetchBrewingYearlyShipments:f,fetchBrewingSeasonalPattern:x,fetchBrewingForecastOverrides:S,fetchBrewingRiceParams:$,fetchRiceVarieties:C,fetchRicePurchaseCommitments:P,fetchProcurementDecisions:E}=await N(async()=>{const{fetchBrewingPlanSummary:W,fetchBrewingMonthlyTrend:Q,fetchBrewingSchedule:H,fetchBrewingProductDetail:X,fetchBrewingCustomCategories:ee,fetchBrewingCategoryOverrides:ie,fetchAllBrewingStockEntries:V,fetchCategoryTypeLinks:K,fetchAvailableProductionTypes:G,fetchBrewingAlcoholSettings:ne,fetchBrewingYearlyShipments:we,fetchBrewingSeasonalPattern:ye,fetchBrewingForecastOverrides:xe,fetchBrewingRiceParams:Be,fetchRiceVarieties:wa,fetchRicePurchaseCommitments:Ot,fetchProcurementDecisions:lr}=await Promise.resolve().then(()=>z);return{fetchBrewingPlanSummary:W,fetchBrewingMonthlyTrend:Q,fetchBrewingSchedule:H,fetchBrewingProductDetail:X,fetchBrewingCustomCategories:ee,fetchBrewingCategoryOverrides:ie,fetchAllBrewingStockEntries:V,fetchCategoryTypeLinks:K,fetchAvailableProductionTypes:G,fetchBrewingAlcoholSettings:ne,fetchBrewingYearlyShipments:we,fetchBrewingSeasonalPattern:ye,fetchBrewingForecastOverrides:xe,fetchBrewingRiceParams:Be,fetchRiceVarieties:wa,fetchRicePurchaseCommitments:Ot,fetchProcurementDecisions:lr}},void 0),s=a.brewingPlanFY,i=`${s}-10-01`,p=`${s+1}-09-30`,[m,h,b,_,w,k,D,L,q,I,B,O,R,M,j,Y,J]=await Promise.all([t(i,p).catch(()=>[]),n(i,p).catch(()=>[]),o(s).catch(()=>[]),r(i,p).catch(()=>[]),l().catch(()=>[]),c().catch(()=>({})),d().catch(()=>[]),u().catch(()=>({})),y().catch(()=>[]),g().catch(()=>({})),f().catch(()=>[]),x().catch(()=>[]),S().catch(()=>({})),$().catch(()=>({})),C().catch(()=>[]),P(s).catch(()=>[]),E(s).catch(()=>({}))]);a.brewingPlanData=m,a.brewingMonthlyTrend=h,a.brewingSchedule=b,a.brewingProductDetail=_,a.brewingCustomCategories=w,a.brewingOverrides=k,a.brewingStockEntries=D,a.brewingTypeLinks=L,a.brewingAvailableTypes=q,a.brewingYearlyShipments=B,a.brewingSeasonalPattern=O,a.brewingForecastOverrides=R,a.brewingRiceParams=M,a.riceVarieties=j,a.ricePurchaseCommitments=Y,a.procurementDecisions=J,a.brewingAlcoholSettings=I;break}case"/brewing-process":{const{fetchBrewingBatches:t,fetchBrewingProcessSteps:n,fetchBrewingCustomCategories:o,fetchBrewingSchedule:r,fetchWorkerSettings:l,fetchStepLabor:c,fetchBrewingRiceParams:d,fetchTanks:u}=await N(async()=>{const{fetchBrewingBatches:E,fetchBrewingProcessSteps:s,fetchBrewingCustomCategories:i,fetchBrewingSchedule:p,fetchWorkerSettings:m,fetchStepLabor:h,fetchBrewingRiceParams:b,fetchTanks:_}=await Promise.resolve().then(()=>z);return{fetchBrewingBatches:E,fetchBrewingProcessSteps:s,fetchBrewingCustomCategories:i,fetchBrewingSchedule:p,fetchWorkerSettings:m,fetchStepLabor:h,fetchBrewingRiceParams:b,fetchTanks:_}},void 0),y=a.brewingPlanFY,[g,f,x,S,$,C,P]=await Promise.all([t(y).catch(()=>[]),o().catch(()=>[]),r(y).catch(()=>[]),l().catch(()=>({workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1})),c().catch(()=>[]),d().catch(()=>({})),u().catch(()=>[])]);a.brewingBatches=g,a.brewingSchedule=x,a.bpWorkerSettings=S,a.bpStepLabor=$,a.brewingRiceParams=C,a.bpTanks=P,g.length>0?a.brewingProcessSteps=await n(g.map(E=>E.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=f;break}case"/workforce":{const[t,n,o,r]=await Promise.all([a.staffMembers.length>0?Promise.resolve(a.staffMembers):wn(),a.brewingSchedule.length>0?Promise.resolve(a.brewingSchedule):(async()=>{const{fetchBrewingSchedule:l}=await N(async()=>{const{fetchBrewingSchedule:c}=await Promise.resolve().then(()=>z);return{fetchBrewingSchedule:c}},void 0);return l(a.brewingPlanFY).catch(()=>[])})(),wo(a.workforceYearMonth),xo(a.workforceYearMonth)]);a.staffMembers=t,a.workforceMetrics=o,a.dailyShiftPlans=r,a.brewingSchedule.length===0&&(a.brewingSchedule=n);break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Hs());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Ks());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Qs());break;case"/materials":a.materialList.length===0&&(a.materialList=await Ws());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Gs(),Xs()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Zs(),eo()]));break;case"/tax":(!a.taxDeclaration||!a.taxVolume)&&([a.taxDeclaration,a.taxVolume]=await Promise.all([un(a.taxYear,a.taxMonth),mn(a.taxYear,a.taxMonth)]));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([yn(a.storeSalesDate),no()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await N(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>z);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(o=>o.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await N(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>z);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await N(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>z);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await N(async()=>{const{fetchShopifyOrders:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>z);return{fetchShopifyOrders:o,fetchIntegrationSettings:r}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await N(async()=>{const{fetchFaxInbox:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>z);return{fetchFaxInbox:o,fetchIntegrationSettings:r}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/ledger":a.customerLedger=await on(a.ledgerCustomerCode);break;case"/setup":[a.syncDashboard,a.systemHealth]=await Promise.all([Ts(),Is()]);break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await mo());break;case"/users":{const{fetchUserProfiles:t}=await N(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>z);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:o}=await N(async()=>{const{fetchMyProfile:l,fetchAuditLogs:c,fetchMailSenders:d}=await Promise.resolve().then(()=>z);return{fetchMyProfile:l,fetchAuditLogs:c,fetchMailSenders:d}},void 0),r=a.user?.email??a.myProfile?.email??"";r&&(a.myProfile=await t(r)),a.mailSenders.length===0&&(a.mailSenders=await o()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await N(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>z);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await N(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>z);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await N(async()=>{const{fetchMapCustomers:l,fetchDeliveryLocations:c}=await Promise.resolve().then(()=>z);return{fetchMapCustomers:l,fetchDeliveryLocations:c}},void 0),[o,r]=await Promise.all([t(),n()]);a.mapCustomers=o,a.deliveryLocations=r,a.mapLoaded=!0}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await N(async()=>{const{fetchCallLogs:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>z);return{fetchCallLogs:o,fetchIntegrationSettings:r}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await N(async()=>{const{fetchLeadLists:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>z);return{fetchLeadLists:o,fetchIntegrationSettings:r}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await N(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>z);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await N(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>z);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:o}=await N(async()=>{const{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>z);return{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:c}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await o())}break;case"/changelog":a.featureStatuses||(a.featureStatuses=await da());break;case"/":a.featureStatuses||(a.featureStatuses=await da());break;default:break}}catch(t){console.error("Route data load error:",e,t),F(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,A()}}function $s(){if(Ln())return pd(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return Bt("sales");case"/cat/brewery":return Bt("brewery");case"/cat/purchase":return Bt("purchase");case"/cat/more":return Bt("more");case"/invoice-entry":return Rc(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?Vc(a.quoteList,a.quoteListLoading,a.quoteCustomerFilter,a.quoteCustomerFilterName):qo(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return Uc(a.quoteCompanySettings);case"/email":return Tc(Em());case"/delivery":return a.deliveryNote?Dc(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return Uu(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate,a.shipmentCalendarPrevYearData);case"/billing":return a.billingSummary?uc(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?Kd(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Zc(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return ed(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);case"/customer-analysis":return a.customerAnalysis?Bd(a.customerAnalysis,a.productABC,a.analysisTab,a.analysisPeriod):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Sc(a.demandForecast);case"/demand":return Qp(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return su(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,o=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<o).sort(),l=new Map;for(const u of a.brewingSeasonalPattern)l.has(u.brewCategory)||l.set(u.brewCategory,new Map),l.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const c=[];for(let u=n;u<=9;u++)c.push(u);if(n>=10)for(let u=1;u<=9;u++)c.push(u);const d=new Map;for(const u of a.brewingYearlyShipments)d.has(u.brewCategory)||d.set(u.brewCategory,new Map),d.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,y]of d){const g=r.filter(h=>y.has(h)).map(h=>y.get(h).shipL);let f=0;if(g.length>=2){const h=[];for(let b=1;b<g.length;b++)g[b-1]>0&&h.push((g[b]-g[b-1])/g[b-1]);f=h.length>0?h.reduce((b,_)=>b+_,0)/h.length:0}const x=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:f,S=g.length>0?g[g.length-1]:y.get(o)?.annualL??0,$=l.get(u)??new Map,C=c.reduce((h,b)=>h+($.get(b)??0),0),P=a.brewingStockEntries.filter(h=>h.brewCategory===u).reduce((h,b)=>h+b.volumeL,0),E=a.brewingAlcoholSettings[u],s=E&&E.targetAlcoholPct>0?E.rawAlcoholPct/E.targetAlcoholPct:1,i=Math.round(P*s),p=Math.max(0,i-Math.round(C)),m=Math.round(S*(1+x));e[u]=Math.max(0,m-p)}}return iu(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?Tu(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?Ou(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?Xu(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return wu(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY,workerSettings:a.bpWorkerSettings,stepLabor:a.bpStepLabor,tanks:a.bpTanks.map(t=>({id:t.id,tankNo:t.tankNo,capacityL:t.capacityL,tankType:t.tankType,preferredCategories:t.preferredCategories,cleanupDays:t.cleanupDays}))})}case"/workforce":return Au(a.staffMembers,a.workforceTab,a.staffDeptFilter,a.workforceYearMonth,a.brewingSchedule,0,a.workforceMetrics,a.dailyShiftPlans);case"/jikomi":return a.jikomiView==="calendar"?`${Un(a.jikomiList,a.jikomiView)}${ld(a.jikomiList)}`:Un(a.jikomiList,a.jikomiView);case"/tanks":return tm(a.tankList);case"/kentei":return cd(a.kenteiList);case"/materials":return _d(a.materialList)+$d(a.materialEditing,a.materialEditingIsNew);case"/purchase":return Ad(a.purchaseList,a.payableList);case"/raw-material":return Ld(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?nm(a.taxDeclaration,a.taxYear,a.taxMonth,a.taxVolume??[]):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Xd(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?Td(a.pipelineMeta,fe,se,a.syncDashboard,a.systemHealth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return Bp(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return ep(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return Ip(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return ap(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapLoaded?a.mapCustomers.length===0?`<section class="page-head"><div><p class="eyebrow">取引先マップ</p><h1>取引先マップ</h1></div></section>
          <section class="panel">
            <div style="padding:32px;text-align:center;color:var(--text-secondary)">
              <p style="font-size:1.5rem;margin-bottom:8px">📍</p>
              <p style="font-weight:600;margin-bottom:4px">緯度・経度データがありません</p>
              <p style="font-size:0.875rem">得意先マスタにジオコーディングが必要です。<br>relay フォルダの <code>geocode_customers.py</code> を実行してください。</p>
            </div>
          </section>`:np(a.mapCustomers,a.deliveryLocations,a.mapFilters):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>';case"/workflow":return rp(a.workflowOrders);case"/mobile-order":return ip(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return cp(a.tourInquiries,a.tourActiveId);case"/mail-senders":return up(a.mailSenders,a.mailSenderEditingId);case"/calendar":return mp(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return hp(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return fp(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return gp(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/changelog":{const e=a.myProfile?.name??a.myProfile?.email??"不明";return a.featureStatuses!==null?om(a.featureStatuses,e):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">読み込み中…</p></div></section>'}case"/users":return vp(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return bp(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return wp(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return xp(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return kp(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return Pp(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return Ap(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Wd(sr(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/payment":return Pd([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return xd(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return ad(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return gc(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return jo(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return Dm();default:return Ec(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function Cm(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const l=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${l.bg};border-bottom:2px solid ${l.border};">
        <span class="announcement-text">${l.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),o=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+o}function Dm(){const e=a.featureStatuses??{};function t(o,r,l,c){const d=`${"/".replace(/\/$/,"")||"/"}${o}`,u=sm(o,e);return`<a href="${d}" data-link="${o}" class="home-card">
      <span class="home-card-icon">${r}</span>
      <span class="home-card-label">${l}${u?' <span class="badge-new">使用可能</span>':""}</span>
      <span class="home-card-desc">${c}</span>
    </a>`}const n=[{title:"販売業務",color:"#1a56db",cards:[t("/invoice-entry","📝","伝票入力","売上・返品を入力"),t("/quote","📄","見積作成","見積書の作成・管理"),t("/invoice","🔍","伝票照会","過去伝票の照会"),t("/delivery","🚚","納品書","納品書の発行"),t("/billing","💳","月次請求","請求書・入金管理"),t("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[t("/analytics","📊","売上分析","期間・商品・得意先別"),t("/customer-analysis","👥","ABC分析","得意先・商品 ABC分析"),t("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),t("/report","📈","集計帳票","各種集計帳票"),t("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[t("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),t("/visit-planner","📅","訪問計画","訪問スケジュール"),t("/shipment-calendar","🚚","配送カレンダー","伝票日付で配送を確認"),t("/map","🗺️","取引先マップ","地図で取引先を確認"),t("/prospects","🌱","新規営業","新規開拓の進捗"),t("/email","✉️","メール配信","一斉メール配信"),t("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[t("/workflow","🔄","受注ワークフロー","受注から出荷まで"),t("/shopify","🛒","Shopify注文","EC受注の確認"),t("/purchase","📥","仕入・買掛","仕入管理・買掛金"),t("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[t("/jikomi","🍶","仕込管理","仕込帳・製造記録"),t("/tanks","🛢️","タンク管理","タンク在庫の管理"),t("/tax","📋","酒税申告","酒税申告書の作成"),t("/demand","📆","需要・生産計画","需要予測・生産計画"),t("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール"),t("/procurement","🌾","調達計画","原料米の調達・予算"),t("/brewing-process","🍶","醸造工程","バッチ別の醸造工程管理"),t("/workforce","👥","人員・シフト管理","スタッフ管理・人件費")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[t("/master","⚙️","マスタ管理","商品・得意先マスタ"),t("/store","🏪","店舗・直売所","直売所の販売管理"),t("/tour","🏯","酒蔵見学","見学予約の管理"),t("/setup","🔗","連動設定","酒仙iとの連動"),t("/import","📤","データ取込","CSVデータ取込"),t("/users","👤","ユーザー管理","アカウント管理"),t("/changelog","✅","機能一覧・更新履歴","動作確認チェック・バージョン管理")].join("")}];return`
    <div class="home-page">
      <div class="home-welcome">
        <p class="home-welcome-date">${new Date().toLocaleDateString("ja-JP",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}</p>
        <h2 class="home-welcome-title">何をしますか？</h2>
      </div>
      ${n.map(o=>`
        <div class="home-section">
          <h3 class="home-section-title" style="--section-color:${o.color}">
            <span class="home-section-bar"></span>${o.title}
          </h3>
          <div class="home-card-grid">${o.cards}</div>
        </div>
      `).join("")}
    </div>
  `}function qm(){const e=a.route,t=ba(e),o=[{key:"sales",icon:"💼",label:"売上管理",items:[{path:"/invoice-entry",label:"伝票入力"},{path:"/invoice",label:"伝票照会"},{path:"/ledger",label:"得意先台帳"},{path:"/sales",label:"売上一覧"},{path:"/payment",label:"入金状況"},{path:"/billing",label:"月次請求"},{path:"/delivery",label:"納品書"},{path:"/report",label:"集計帳票"}]},{key:"analytics",icon:"📊",label:"分析",items:[{path:"/analytics",label:"売上分析"},{path:"/customer-analysis",label:"ABC分析"},{path:"/customer-efficiency",label:"営業効率"}]},{key:"crm",icon:"🤝",label:"CRM・営業",items:[{path:"/churn-alert",label:"営業アクション"},{path:"/map",label:"取引先マップ"},{path:"/visit-planner",label:"訪問計画"},{path:"/prospects",label:"新規営業"},{path:"/calls",label:"通話履歴"}]},{key:"brewery",icon:"🍶",label:"醸造管理",items:[{path:"/jikomi",label:"仕込管理"},{path:"/tanks",label:"タンク管理"},{path:"/brewing-plan",label:"醸造計画"},{path:"/brewing-process",label:"醸造工程"},{path:"/tax",label:"酒税申告"},{path:"/demand",label:"需要・生産計画"},{path:"/workforce",label:"人員・シフト"}]},{key:"master",icon:"🗂",label:"マスタ・帳票",items:[{path:"/master",label:"マスタ管理"},{path:"/store",label:"店舗・直売所"},{path:"/print",label:"印刷センター"},{path:"/calendar",label:"カレンダー"},{path:"/tour",label:"酒蔵見学"}]},{key:"settings",icon:"⚙",label:"設定",items:[{path:"/setup",label:"連動設定"},{path:"/integrations",label:"外部連携"},{path:"/users",label:"ユーザー管理"},{path:"/import",label:"データ取込"}]}].map(l=>{const c=l.key===t,d=l.items.map(u=>`<a href="${u.path}" data-link="${u.path}" class="snav-sub${e===u.path?" active":""}">${u.label}</a>`).join("");return`<div class="snav-group${c?" open":""}">
      <button class="snav-group-btn" type="button" data-snav-group="${l.key}">
        <span>${l.icon}</span><span class="snav-group-label">${l.label}</span><span class="snav-arrow">›</span>
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
        ${o}
        <a href="/changelog" data-link="/changelog" class="snav-home${e==="/changelog"?" active":""}">📋 機能一覧</a>
      </div>
      <div class="snav-footer">
        <a href="/profile" data-link="/profile" class="snav-profile">${a.user?.email??"👤 プロフィール"}</a>
      </div>
    </aside>
    ${r}
  `}function Tm(){if(Ln())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${$s()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/changelog":"機能一覧・更新履歴","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?Mc(a.masterStats.customers,a.pickerQuery):Ed(a.masterStats.products,a.pickerQuery):"",r=a.globalSearchOpen?Ic(a.globalQuery,Am()):"",l=a.user?`<span class="app-header-user">${a.user.email}</span>
       <button class="button secondary small" type="button" data-action="auth-logout">ログアウト</button>`:a.authSkipped?'<span class="app-header-user">デモモード</span>':"";return`
    <div class="shell-v2">
      <header class="app-header">
        <div class="app-header-left">${`
    <button class="sidebar-hamburger" type="button" data-action="sidebar-open" aria-label="メニュー">☰</button>
    ${t?'<span class="app-brand-name">酒仙i クラウド</span>':`<span class="app-page-title">${n}</span>`}
  `}</div>
        <div class="app-header-right">
          <button class="button secondary small" type="button" data-action="global-search-open">検索 <kbd>Ctrl+K</kbd></button>
          <button class="button secondary small" type="button" data-action="share-page" title="このページのURLを共有">🔗</button>
          ${l}
        </div>
      </header>
      ${Cm()}
      <div class="shell-body">
        ${qm()}
        <main class="main-v2">
          <div class="view ${a.actionLoading?"is-busy":""}">${$s()}</div>
          <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
        </main>
      </div>
      ${o}
      ${r}
    </div>
  `}async function Im(){a.actionLoading=!0,A();try{const{fetchSalesSummary:e}=await N(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>z);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,A()}}async function Mm(e){a.actionLoading=!0,A();try{a.invoiceRecords=await Tt(e)}finally{a.actionLoading=!1,A()}}async function Na(e){a.actionLoading=!0,A();try{a.customerLedger=await on(e)}finally{a.actionLoading=!1,A()}}function Ne(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const o=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:o,unitPrice:r,amount:o*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function Xe(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function _s(e){const t=document.getElementById("staff-form");if(!t)return;const n=t.querySelector("#sf-emp-type"),o=t.querySelector("#sf-hourly-row"),r=t.querySelector("#sf-hours-row"),l=t.querySelector("#sf-salary-row"),c=t.querySelector("#sf-contract-row"),d=t.querySelector("#sf-shift-pref-row");function u(){const y=n?.value??"part_time";o&&(o.style.display=y==="part_time"?"":"none"),r&&(r.style.display=y==="part_time"?"":"none"),l&&(l.style.display=y==="employee"?"":"none"),c&&(c.style.display=y==="contractor"?"":"none"),d&&(d.style.display=y==="part_time"?"":"none")}u(),n?.addEventListener("change",u),t.querySelector("[data-action='close-staff-modal']")?.addEventListener("click",()=>{document.getElementById("staff-modal")?.remove()}),t.addEventListener("submit",async y=>{y.preventDefault();const g=t.querySelector("#staff-form-result"),f=(t.querySelector("#sf-months")?.value??"").trim(),x=f?f.split(",").map(i=>parseInt(i.trim())).filter(i=>!isNaN(i)&&i>=1&&i<=12):null,S=Array.from(t.querySelectorAll("input[name='sf-cross']:checked")).map(i=>i.value),$=t.querySelector("#sf-emp-type")?.value??"part_time",C=$==="part_time"?t.querySelector("input[name='sf-shift-pref']:checked")?.value??"both":null,P=Array.from(t.querySelectorAll("input[name='sf-task']:checked")).map(i=>i.value),E={id:t.querySelector("#sf-id")?.value||void 0,name:t.querySelector("#sf-name")?.value.trim()??"",kana:t.querySelector("#sf-kana")?.value.trim()||"",employmentType:$,department:t.querySelector("#sf-dept")?.value??"bottling",hourlyRate:parseFloat(t.querySelector("#sf-hourly")?.value??"")||null,monthlySalary:parseFloat(t.querySelector("#sf-salary")?.value??"")||null,contractFee:parseFloat(t.querySelector("#sf-contract-fee")?.value??"")||null,workHoursPerDay:parseFloat(t.querySelector("#sf-hours")?.value??"8")||8,shiftPreference:C,monthlyTasks:P,availableMonths:x,crossDepartments:S,notes:t.querySelector("#sf-notes")?.value.trim()||"",isActive:t.querySelector("#sf-active")?.checked??!0};if(!E.name){g&&(g.textContent="氏名は必須です");return}await vo(E)?(document.getElementById("staff-modal")?.remove(),a.staffMembers=await wn(),F(e?"更新しました":"登録しました","success"),A()):g&&(g.textContent="保存に失敗しました")})}function Nm(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,A()}),e.querySelectorAll("[data-action='global-search-close']").forEach(s=>{s.addEventListener("click",i=>{s.classList.contains("global-search")&&i.target instanceof HTMLElement&&!i.target.classList.contains("global-search")||(It(),A())})}),e.querySelector("#global-search-input")?.addEventListener("input",s=>{a.globalQuery=s.target.value,A()}),e.querySelectorAll("[data-action='global-nav']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.path;i&&(It(),tt(i))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Lm()}),e.querySelectorAll("[data-jikomi-tab]").forEach(s=>{s.addEventListener("click",()=>{a.jikomiView=s.dataset.jikomiTab,A()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const s=e.querySelector("#auth-email")?.value.trim()??"",i=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,A(),mr(s,i).then(async p=>{a.user=p,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:h}=await N(async()=>{const{fetchMyProfile:b,recordAudit:_}=await Promise.resolve().then(()=>z);return{fetchMyProfile:b,recordAudit:_}},void 0);a.myProfile=await m(p.email),await h({action:"sign_in",userEmail:p.email}),A()}).catch(async p=>{try{const m=await Dn(s,i);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:h}=await N(async()=>{const{fetchMyProfile:b}=await Promise.resolve().then(()=>z);return{fetchMyProfile:b}},void 0);a.myProfile=await h(m.email)}catch{a.authError=p instanceof Error?p.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,A()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,A()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{yr().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,A()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(s=>{s.addEventListener("click",()=>{a.sidebarOpen=!1,A()})}),e.querySelectorAll("[data-snav-group]").forEach(s=>{s.addEventListener("click",()=>{s.closest(".snav-group")?.classList.toggle("open")})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let s=0;t.addEventListener("touchstart",i=>{s=i.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",i=>{i.changedTouches[0].clientX-s<-60&&(a.sidebarOpen=!1,A())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.id??"";a.dismissedAnnouncements.add(i),A()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const s=window.location.href,i=document.title;if(navigator.share)try{await navigator.share({url:s,title:i})}catch{}else try{await navigator.clipboard.writeText(s),F("URLをコピーしました","success")}catch{F("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault(),tt(s.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async s=>{s.preventDefault();const i=e.querySelector("#fr-title")?.value??"",p=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",h=e.querySelector("#fr-result");if(!i.trim())return;const b=await js(i,p,m);if(h&&(h.textContent=b?"送信しました":"送信に失敗しました",h.className=`fr-result ${b?"success":"error"}`),b){const _=e.querySelector("#feature-request-form");_&&_.reset()}}),e.querySelectorAll("[data-period]").forEach(s=>{s.addEventListener("click",()=>{a.salesPeriod=s.dataset.period,A()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const s=e.querySelector("#range-start")?.value??"",i=e.querySelector("#range-end")?.value??"";s&&i&&(a.customRange={start:s,end:i},a.salesPeriod="custom",A())}),e.querySelectorAll("[data-edit-customer]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.editCustomer??"",p=a.masterStats?.customers.find(h=>h.id===i);if(!p)return;const m=document.createElement("div");m.innerHTML=ud(p),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),_=document.getElementById("ec-trade-type")?.value||null,w=await zs(i,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:_,manual_override:!0});b&&(b.textContent=w?"保存しました":"保存に失敗",b.className=`fr-result ${w?"success":"error"}`),w&&(document.getElementById("edit-modal")?.remove(),yt())})})}),e.querySelectorAll("[data-edit-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.editProduct??"",p=a.masterStats?.products.find(h=>h.id===i);if(!p)return;const m=document.createElement("div");m.innerHTML=md(p),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),_=await Fs(i,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});b&&(b.textContent=_?"保存しました":"保存に失敗",b.className=`fr-result ${_?"success":"error"}`),_&&(document.getElementById("edit-modal")?.remove(),yt())})})}),e.querySelectorAll("[data-view-customer-quotes]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.viewCustomerQuotes??"",p=s.dataset.customerName??"";a.quoteCustomerFilter=i,a.quoteCustomerFilterName=p,a.quoteEditId=null,a.quoteList.length===0?(a.quoteListLoading=!0,tt("/quote"),a.quoteList=await ca(),a.quoteListLoading=!1):tt("/quote"),A()})}),e.querySelector("[data-action='quote-clear-filter']")?.addEventListener("click",()=>{a.quoteCustomerFilter="",a.quoteCustomerFilterName="",A()}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=pa(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,A()}),e.querySelectorAll("[data-open-quote]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.openQuote,p=await ho(i);if(!p){F("見積の読み込みに失敗しました","error");return}a.quoteState={id:p.id,quoteNo:p.quote_no,quoteDate:p.quote_date,validUntil:p.valid_until??"",customerCode:p.legacy_customer_code??"",customerName:p.customer_name,customerAddress:p.customer_address,subject:p.subject,lines:p.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:p.remarks,taxRate:p.tax_rate,deliveryDate:p.delivery_date,paymentTerms:p.payment_terms,deliveryPlace:p.delivery_place,templateType:p.template_type??"sake",previewMode:!1},a.quoteEditId=i,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,A()})}),e.querySelectorAll("[data-delete-quote]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.deleteQuote,p=s.dataset.quoteNo??i;if(!await Ae(`見積 ${p} を削除しますか？`))return;await tn("quotes",i)?(a.quoteList=a.quoteList.filter(b=>b.id!==i),F("削除しました","success"),A()):F("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,A(),ca().then(s=>{a.quoteList=s,a.quoteListLoading=!1,A()})}),e.querySelectorAll("[name='q-template']").forEach(s=>{s.addEventListener("change",()=>{a.quoteState.templateType=s.value,A()})});function n(s){return(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function o(s){return s.length?s.map(i=>`<button class="search-item" type="button" data-select-customer="${n(i.code)}" data-cust-name="${n(i.name)}" data-cust-addr="${n(i.address1||"")}"><span class="mono">${n(i.code)}</span><span style="font-size:13px;font-weight:600;">${n(i.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(s){s.querySelectorAll("[data-select-customer]").forEach(i=>{i.addEventListener("click",async()=>{const p=i.dataset.selectCustomer??"";a.quoteState.customerCode=p,a.quoteState.customerName=i.dataset.custName??"",a.quoteState.customerAddress=i.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),s.remove(),a.quotePricing=await ja(a.masterStats?.customers??[],p),A()})})}function l(s){const i=e.querySelector("#q-cust-search")?.closest(".form-row");if(!i)return;let p=document.getElementById("cust-search-results");p||(p=document.createElement("div"),p.id="cust-search-results",p.className="search-results",i.after(p));const m=a.masterStats?.customers??[],h=s.trim().toLowerCase(),b=h.length===0?m:m.filter(_=>_.name.includes(s)||_.kanaName.includes(s)||_.code.includes(s)||_.name.toLowerCase().includes(h)||_.kanaName.toLowerCase().includes(h));p.innerHTML=o(b),r(p)}function c(s,i){return s.length?s.map(p=>{const m=i?dn(p,i):{price:p.salePrice||0,label:"卸価格"},h=p.listPrice||0,b=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(p.code)}" data-prod-name="${n(p.name)}" data-prod-price="${m.price}" data-prod-retail="${h}" data-prod-jan="${n(p.janCode??"")}" data-prod-unit="${n(p.unit)}" data-prod-case="${p.caseQty??""}"><span class="mono">${n(p.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(p.name)}</span><span class="numeric"${b?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${h?`　定価 ¥${h.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function d(s){s.querySelectorAll("[data-add-product]").forEach(i=>{i.addEventListener("click",()=>{const p=i.dataset.addProduct??"",m=i.dataset.prodName??"",h=parseInt(i.dataset.prodPrice??"0"),b=parseInt(i.dataset.prodRetail??"0")||null,_=i.dataset.prodJan??"",w=i.dataset.prodUnit||"本",k=i.dataset.prodCase??"",D=k?parseInt(k):null;a.quoteState.lines.push({productCode:p,productName:m,janCode:_,caseQty:D,quantity:1,unit:w,unitPrice:h,retailPrice:b,amount:h}),a.quoteProductQuery="";const L=e.querySelector("#q-prod-search");L&&(L.value=""),A()})})}function u(s){const i=e.querySelector("#q-prod-search")?.closest(".form-row");if(!i)return;let p=document.getElementById("prod-search-results");if(p||(p=document.createElement("div"),p.id="prod-search-results",p.className="search-results",i.after(p)),!a.masterStats){p.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,h=s.trim().toLowerCase(),b=h.length===0?m:m.filter(_=>_.name.includes(s)||_.kanaName.includes(s)||_.code.includes(s)||_.name.toLowerCase().includes(h)||_.kanaName.toLowerCase().includes(h));p.innerHTML=c(b,a.quotePricing),d(p)}function y(s,i){let p=null;function m(){p||(p=h=>{const b=document.getElementById(i);if(!b){document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null;return}s.contains(h.target)||b.contains(h.target)||(b.remove(),document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null)},document.addEventListener("touchstart",p,{passive:!0}),document.addEventListener("mousedown",p))}return m}(function(){const s=e.querySelector("#q-cust-search");if(!s)return;const i=y(s,"cust-search-results");s.addEventListener("focus",()=>{l(s.value),i()}),s.addEventListener("compositionend",()=>{a.quoteCustomerQuery=s.value,l(s.value)}),s.addEventListener("input",p=>{p.isComposing||(a.quoteCustomerQuery=s.value,l(s.value))}),s.value&&l(s.value)})(),(function(){const s=e.querySelector("#q-prod-search");if(!s)return;const i=y(s,"prod-search-results");s.addEventListener("focus",()=>{u(s.value),i()}),s.addEventListener("compositionend",()=>{a.quoteProductQuery=s.value,u(s.value)}),s.addEventListener("input",p=>{p.isComposing||(a.quoteProductQuery=s.value,u(s.value))}),s.value&&u(s.value)})(),e.querySelectorAll("[data-select-customer]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.selectCustomer??"";a.quoteState.customerCode=i,a.quoteState.customerName=s.dataset.custName??"",a.quoteState.customerAddress=s.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await ja(a.masterStats?.customers??[],i),A()})}),e.querySelector("#q-price-type")?.addEventListener("change",s=>{const i=s.target.value;a.quoteState.manualPriceType=i,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:i}:a.quotePricing={priceType:i,priceGroup:"",individualPrices:new Map},A()}),e.querySelectorAll("[data-add-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.addProduct??"",p=s.dataset.prodName??"",m=parseInt(s.dataset.prodPrice??"0"),h=parseInt(s.dataset.prodRetail??"0")||null,b=s.dataset.prodJan??"",_=s.dataset.prodUnit||"本",w=s.dataset.prodCase??"",k=w?parseInt(w):null;a.quoteState.lines.push({productCode:i,productName:p,janCode:b,caseQty:k,quantity:1,unit:_,unitPrice:m,retailPrice:h,amount:m}),a.quoteProductQuery="",A()})}),(()=>{const s=e.querySelector("#q-prospect-search");if(!s)return;const i=y(s,"q-prospect-results");function p(m){let h=document.getElementById("q-prospect-results");if(!h)return;const b=m.trim(),_=b.length===0?a.prospects.slice(0,8):a.prospects.filter(w=>w.companyName.includes(b)||(w.contactName??"").includes(b)).slice(0,8);if(_.length===0){h.innerHTML="";return}h.className="search-results",h.innerHTML=_.map(w=>`<button class="search-item" type="button" data-select-prospect="${w.id}" data-prospect-name="${n(w.companyName)}" data-prospect-addr="${n(w.address??"")}"><span style="font-size:13px;font-weight:600;">${n(w.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n(w.contactName??"")} ${w.address?"· "+w.address.slice(0,20):""}</span></button>`).join(""),h.querySelectorAll("[data-select-prospect]").forEach(w=>{w.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=w.dataset.prospectName??"",a.quoteState.customerAddress=w.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=w.dataset.selectProspect??"";const k=a.quoteState.manualPriceType??"";a.quotePricing={priceType:k,priceGroup:"",individualPrices:new Map},s.value="",h&&(h.innerHTML=""),A()})})}s.addEventListener("focus",()=>{p(s.value),i()}),s.addEventListener("input",m=>{m.isComposing||p(s.value)}),s.addEventListener("compositionend",()=>p(s.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const s=e.querySelector("#q-prospect-search")?.value.trim()??"",i=document.createElement("div");i.className="modal-backdrop",i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",i.innerHTML=`
      <div class="modal-panel" onclick="event.stopPropagation()" style="width:min(480px,96%);background:var(--surface);border-radius:12px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.3);margin:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="margin:0;font-size:16px;">新規見込み顧客を登録</h3>
          <button id="prospect-quick-close" style="background:none;border:none;font-size:24px;line-height:1;cursor:pointer;color:var(--text-secondary);padding:4px 8px;min-width:44px;min-height:44px;">×</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <label class="field">
            <span style="font-size:13px;font-weight:600;">会社名 <span style="color:var(--danger);">*</span></span>
            <input id="pq-company" type="text" value="${s.replace(/"/g,"&quot;")}" placeholder="株式会社〇〇" style="margin-top:4px;" autocomplete="organization" />
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
    `,document.body.appendChild(i),i.querySelector("#pq-company")?.focus();const p=()=>i.remove();i.addEventListener("click",m=>{m.target===i&&p()}),i.querySelector("#prospect-quick-close")?.addEventListener("click",p),i.querySelector("#prospect-quick-close2")?.addEventListener("click",p),i.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(i.querySelector("#pq-company")?.value??"").trim();if(!m){F("会社名は必須です","warning");return}const h={id:crypto.randomUUID(),companyName:m,contactName:i.querySelector("#pq-contact")?.value.trim()||void 0,address:i.querySelector("#pq-address")?.value.trim()||void 0,phone:i.querySelector("#pq-phone")?.value.trim()||void 0,note:i.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:b,fetchProspects:_}=await N(async()=>{const{saveProspect:D,fetchProspects:L}=await Promise.resolve().then(()=>z);return{saveProspect:D,fetchProspects:L}},void 0),w=await b(h);if(!w){F("登録失敗","error");return}a.prospects=await _(),a.quoteState.customerCode="",a.quoteState.customerName=w.companyName,a.quoteState.customerAddress=w.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=w.id;const k=a.quoteState.manualPriceType??"";a.quotePricing={priceType:k,priceGroup:"",individualPrices:new Map},p(),F(`${w.companyName} を見込み顧客として登録しました`,"success"),A()})});function g(){Vt(a.quoteState);const s=e.querySelector("#q-preview-scaler");if(!s)return;s.innerHTML=qo(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const i=s.querySelector(".q-preview-doc"),p=s.parentElement?.clientWidth??0,m=i?.offsetWidth??0;if(p>0&&m>0&&m>p-24){const h=(p-24)/m;s.style.transform=`scale(${h})`,s.style.transformOrigin="top left",s.style.height=`${((i?.offsetHeight??0)+48)*h}px`}else s.style.transform="",s.style.height=""}for(const s of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${s}`)?.addEventListener("input",g);e.querySelector("#q-remarks")?.addEventListener("input",g),e.querySelectorAll(".qty-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.quantity=parseFloat(s.value)||0,p.amount=p.quantity*p.unitPrice,g())})}),e.querySelectorAll(".price-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.unitPrice=parseInt(s.value)||0,p.amount=p.quantity*p.unitPrice,g())})}),e.querySelectorAll(".jan-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.janCode=s.value,g())})}),e.querySelectorAll(".case-qty-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.caseQty=s.value?parseInt(s.value):null,g())})}),e.querySelectorAll(".retail-price-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.retailPrice=s.value?parseInt(s.value):null,g())})}),e.querySelectorAll("[data-remove-line]").forEach(s=>{s.addEventListener("click",()=>{const i=parseInt(s.dataset.removeLine??"0");a.quoteState.lines.splice(i,1),A()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{Vt(a.quoteState),a.quoteState.previewMode=!0,A()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,A()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="生成中…",a.quoteState.previewMode||Vt(a.quoteState);try{await Qc(a.quoteState,a.quoteCompanySettings)}finally{i.disabled=!1,i.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{Vt(a.quoteState);const s=a.quoteState,i=s.lines.reduce((w,k)=>w+k.amount,0),p=Math.round(i*s.taxRate/100),m=i+p;if(!s.quoteNo)try{const{supabaseRpc:w}=await N(async()=>{const{supabaseRpc:D}=await Promise.resolve().then(()=>te);return{supabaseRpc:D}},void 0),k=await w("generate_quote_no",{});s.quoteNo=k??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{s.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const h=new Date().toISOString().slice(0,10),b=s.templateType==="sake"||s.templateType==="standard"?s.templateType:"sake",_={quote_no:s.quoteNo,quote_date:s.quoteDate||h,valid_until:s.validUntil||null,legacy_customer_code:s.customerCode||null,customer_name:s.customerName||"",customer_address:s.customerAddress||"",subject:s.subject||"",template_type:b,subtotal:i,tax_amount:p,total_amount:m,tax_rate:s.taxRate||10,remarks:s.remarks||"",delivery_date:s.deliveryDate||"",payment_terms:s.paymentTerms||"",delivery_place:s.deliveryPlace||"",updated_at:new Date().toISOString()};try{let w=s.id;if(s.id){const k=await fetch(`${fe}/rest/v1/quotes?id=eq.${encodeURIComponent(s.id)}`,{method:"PATCH",headers:{apikey:se,Authorization:`Bearer ${se}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(_)});if(!k.ok){const D=await k.text();throw new Error(`quotes更新失敗 ${k.status}: ${D}`)}await fetch(`${fe}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(s.id)}`,{method:"DELETE",headers:{apikey:se,Authorization:`Bearer ${se}`}})}else{const k=await fetch(`${fe}/rest/v1/quotes`,{method:"POST",headers:{apikey:se,Authorization:`Bearer ${se}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(_)});if(!k.ok){const L=await k.text();throw new Error(`quotes作成失敗 ${k.status}: ${L}`)}const D=await k.json();if(!D?.[0]?.id)throw new Error("IDが返りませんでした");w=D[0].id,s.id=w}if(s.lines.length>0){const k=s.lines.map((L,q)=>({quote_id:w,line_no:q+1,legacy_product_code:L.productCode||null,product_name:L.productName,jan_code:L.janCode||null,case_qty:L.caseQty??null,quantity:L.quantity,unit:L.unit,unit_price:L.unitPrice,retail_price:L.retailPrice??null,amount:L.amount})),D=await fetch(`${fe}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:se,Authorization:`Bearer ${se}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(k)});if(!D.ok){const L=await D.text();throw new Error(`明細保存失敗 ${D.status}: ${L}`)}}F(`見積 ${s.quoteNo} を保存しました`,"success"),A()}catch(w){console.error("[save-quote]",w),F(`保存失敗: ${String(w).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const s=p=>document.getElementById(p)?.value??"",i={...a.quoteCompanySettings,companyName:s("qs-company-name"),companyPostal:s("qs-company-postal"),companyAddress1:s("qs-company-addr1"),companyAddress2:s("qs-company-addr2"),companyTel:s("qs-company-tel"),companyFax:s("qs-company-fax"),companyEmail:s("qs-company-email"),companyRegistrationNo:s("qs-company-regno"),bankName:s("qs-bank-name"),bankBranch:s("qs-bank-branch"),bankAccountType:s("qs-bank-type"),bankAccountNo:s("qs-bank-no"),bankAccountHolder:s("qs-bank-holder"),defaultPaymentTerms:s("qs-payment-terms"),defaultHeaderNote:s("qs-header-note"),defaultFooterNote:s("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};et(i),dt("quote_company",i),a.quoteCompanySettings=i,F("設定を保存しました","success"),A()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},et(a.quoteCompanySettings),dt("quote_company",a.quoteCompanySettings),A()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",s=>{const i=s.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},et(a.quoteCompanySettings),A()}),e.querySelector("#qs-seal-file")?.addEventListener("change",s=>{const i=s.target.files?.[0];if(!i)return;const p=new FileReader;p.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:p.result},et(a.quoteCompanySettings),dt("quote_company",a.quoteCompanySettings),A()},p.readAsDataURL(i)}),e.querySelector("#qs-seal-size")?.addEventListener("input",s=>{const i=parseInt(s.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:i},et(a.quoteCompanySettings),dt("quote_company",a.quoteCompanySettings),A()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},et(a.quoteCompanySettings),dt("quote_company",a.quoteCompanySettings),A()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.month;i&&(a.demandForecast.calendarMonth=i,A())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.segment;a.demandForecast.selectedSegment=i,A()})}),e.querySelectorAll("[data-demand-tab]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.demandTab;if(i){if(a.demandTab=i,i==="calendar"){const p=new Date().toISOString().slice(0,10);p.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=p)}A()}})}),e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async s=>{const i=parseInt(s.target.value)||3;a.demandYearsBack=i,a.demandAnalysis=null;const{fetchDemandAnalysis:p}=await N(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>z);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await p(i*12),A()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",p=parseInt(s.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,b=p/30,_=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),w=Math.ceil(m.avgMonthlyDemand*b+_);return{...m,leadTimeDays:p,safetyStockQty:_,reorderPoint:w}}),A()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",p=parseFloat(s.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=p>=.99?2.33:p>=.97?1.88:p>=.95?1.65:p>=.9?1.28:1.04,b=m.leadTimeDays/30,_=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),w=Math.ceil(m.avgMonthlyDemand*b+_);return{...m,serviceLevel:p,safetyStockQty:_,reorderPoint:w}}),A()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async s=>{if(a.safetyStockParams.length===0)return;const i=s.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveSafetyStockParamsBulk:p}=await N(async()=>{const{saveSafetyStockParamsBulk:h}=await Promise.resolve().then(()=>z);return{saveSafetyStockParamsBulk:h}},void 0),m=await p(a.safetyStockParams);i.disabled=!1,i.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const s=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),i=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(p=>{const m=s>=.99?2.33:s>=.97?1.88:s>=.95?1.65:s>=.9?1.28:1.04,h=i/30,b=Math.ceil(m*p.demandStdDev*Math.sqrt(h)),_=Math.ceil(p.avgMonthlyDemand*h+b);return{...p,serviceLevel:s,leadTimeDays:i,safetyStockQty:b,reorderPoint:_}}),A()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",p=s.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===i?{...m,productionType:p}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async s=>{const i=s.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarShifts=Dt(i,1,0);const{fetchProductionPlan:p}=await N(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>z);return{fetchProductionPlan:h}},void 0),m=await p(i);a.productionPlan=m.length>0?m:oa(i),ze(a.calendarShifts,a.productionPlan.filter(h=>!a.calendarLabelExcluded.has(h.productCode)),a.calendarCapacity),A()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(s=>{s.addEventListener("click",()=>{a.demandPlanTypeFilter=s.dataset.filter??"all",A()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.sortCol??"";a.demandSort?.column===i?a.demandSort=a.demandSort.dir==="desc"?{column:i,dir:"asc"}:null:a.demandSort={column:i,dir:"desc"},A()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=oa(a.demandPlanYearMonth),A()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",s=>{const i=s.target.files?.[0];if(!i)return;const p=new FileReader;p.onload=async()=>{const{parseCSV:m}=await N(async()=>{const{parseCSV:B}=await Promise.resolve().then(()=>Rp);return{parseCSV:B}},void 0),{columns:h,rows:b}=m(p.result),_=document.getElementById("csv-import-status"),w=h.find(B=>/商品コード|product_code|code|コード/i.test(B)),k=h.find(B=>/在庫|stock|期首|opening/i.test(B)),D=h.find(B=>/計画|plan|planned|生産/i.test(B));if(!w){_&&(_.style.display="block",_.style.background="rgba(197,61,61,0.1)",_.style.color="#c53d3d",_.textContent=`エラー: 商品コード列が見つかりません。列名: ${h.join(", ")}`);return}let L=0,q=0,I=0;for(const B of b){const O=(B[w]??"").trim();if(!O)continue;const R=a.productionPlan.find(M=>M.productCode===O);if(R){if(L++,k&&B[k]!==void 0&&B[k]!==""){const M=parseFloat(B[k])||0;R.openingStock=M,R.requiredProduction=Math.max(0,R.demandForecast+R.safetyStockTarget-M),R.plannedQty>0&&!D&&(R.plannedQty=R.requiredProduction),q++}D&&B[D]!==void 0&&B[D]!==""&&(R.plannedQty=parseFloat(B[D])||0,I++)}}_&&(_.style.display="block",L===0?(_.style.background="rgba(183,121,31,0.1)",_.style.color="#b7791f",_.textContent=`一致する商品コードが見つかりませんでした（CSV: ${b.length}行）`):(_.style.background="rgba(47,133,90,0.1)",_.style.color="#2f855a",_.textContent=`${L}商品に反映: 在庫${q}件${I>0?` / 計画${I}件`:""} 更新`),setTimeout(()=>{_.style.display="none"},5e3)),A()},p.readAsText(i,"UTF-8"),s.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(p=>{const m=p.dataset.code??"",h=a.productionPlan.find(b=>b.productCode===m);h&&(h.plannedQty=parseFloat(p.value)||0)}),e.querySelectorAll("[data-action='plan-actual-qty']").forEach(p=>{const m=p.dataset.code??"",h=a.productionPlan.find(b=>b.productCode===m);h&&(h.actualQty=parseFloat(p.value)||0,h.actualQty>0&&(h.status="actual"))});const{saveProductionPlan:s}=await N(async()=>{const{saveProductionPlan:p}=await Promise.resolve().then(()=>z);return{saveProductionPlan:p}},void 0);await Promise.all(a.productionPlan.map(p=>s(p)));const{fetchProductionPlan:i}=await N(async()=>{const{fetchProductionPlan:p}=await Promise.resolve().then(()=>z);return{fetchProductionPlan:p}},void 0);a.productionPlan=await i(a.demandPlanYearMonth),F("保存しました"),A()}),e.querySelector("[data-action='plan-print']")?.addEventListener("click",()=>{const s=e.querySelector("[data-action='plan-save']")?.closest("section.panel"),i=e.querySelector("[data-action='cal-toggle-day']")?.closest("section.panel"),p=(s?.outerHTML??"")+(i?.outerHTML??""),m=a.demandPlanYearMonth.replace("-","年")+"月",h=window.open("","_blank");h&&(h.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
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
    </head><body><h1 style="font-size:16px;margin-bottom:12px;">生産計画 — ${m}</h1>${p}</body></html>`),h.document.close(),setTimeout(()=>{h.print()},300))}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.date??"";a.calendarSelectedDate=a.calendarSelectedDate===i?null:i,A()}),s.addEventListener("dblclick",()=>{const i=s.dataset.date??"",p=a.calendarShifts.find(m=>m.date===i);!p||p.confirmed||(p.partTimers>0||p.employees>0?(p.partTimers=0,p.employees=0):(p.partTimers=1,p.employees=0),ze(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i,A())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveLabelExclusions:p}=await N(async()=>{const{saveLabelExclusions:b}=await Promise.resolve().then(()=>z);return{saveLabelExclusions:b}},void 0),m=[...a.calendarLabelExcluded],h=await p(a.demandPlanYearMonth,m);i.disabled=!1,i.textContent=h?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;s.checked?a.calendarLabelExcluded.delete(i):a.calendarLabelExcluded.add(i);const h=a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode));ze(a.calendarShifts,h,a.calendarCapacity),A(),requestAnimationFrame(()=>{const b=document.getElementById("cal-label-list");b&&(b.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,h=a.productionPlan.filter(_=>_.productionType===i);if(s.checked)for(const _ of h)a.calendarLabelExcluded.delete(_.productCode);else for(const _ of h)a.calendarLabelExcluded.add(_.productCode);const b=a.productionPlan.filter(_=>!a.calendarLabelExcluded.has(_.productCode));ze(a.calendarShifts,b,a.calendarCapacity),A(),requestAnimationFrame(()=>{const _=document.getElementById("cal-label-list");_&&(_.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||nt;a.calendarCapacity.partCapacity=i;const p=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));ze(a.calendarShifts,p,a.calendarCapacity),A()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||st;a.calendarCapacity.empCapacity=i;const p=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));ze(a.calendarShifts,p,a.calendarCapacity),A()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.date??"",p=parseInt(s.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.partTimers=p),A()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.date??"",p=parseInt(s.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.employees=p),A()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async s=>{const i=s.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarSelectedDate=null,a.calendarShifts=Dt(i,1,0);const{fetchProductionPlan:p,fetchLabelExclusions:m}=await N(async()=>{const{fetchProductionPlan:_,fetchLabelExclusions:w}=await Promise.resolve().then(()=>z);return{fetchProductionPlan:_,fetchLabelExclusions:w}},void 0),[h,b]=await Promise.all([p(i),m(i)]);a.productionPlan=h.length>0?h:oa(i),a.calendarLabelExcluded=new Set(b),ze(a.calendarShifts,a.productionPlan.filter(_=>!a.calendarLabelExcluded.has(_.productCode)),a.calendarCapacity),A()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||0;a.calendarDefaultPart=i;for(const p of a.calendarShifts)if(!p.confirmed){const m=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.partTimers=m?0:i}A()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||0;a.calendarDefaultEmp=i;for(const p of a.calendarShifts)if(!p.confirmed){const m=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.employees=m?0:i}A()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=Dt(a.demandPlanYearMonth,1,0),ze(a.calendarShifts,a.productionPlan.filter(s=>!a.calendarLabelExcluded.has(s.productCode)),a.calendarCapacity),A()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const s of a.calendarShifts)s.confirmed=!0;A()}),e.querySelectorAll("[data-action='select-month']").forEach(s=>{s.addEventListener("click",()=>{const i=parseInt(s.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=i,A())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterArea=s.target.value,A())}),e.querySelector("#visit-filter-score")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(s.target.value)||0,A())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="更新中…";try{const{supabaseRpc:p}=await N(async()=>{const{supabaseRpc:m}=await Promise.resolve().then(()=>te);return{supabaseRpc:m}},void 0);await p("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,F("分析データを更新しました","success"),A()}catch(p){console.error("[refresh-analytics]",p),F("更新に失敗しました","error"),i.disabled=!1,i.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(s=>{s.addEventListener("click",i=>{const p=s.dataset.sortCol??"",m=i.shiftKey;a.route==="/product-power"?a.productSortState=vt(a.productSortState,p,m):a.route==="/customer-efficiency"?a.customerSortState=vt(a.customerSortState,p,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=vt(a.dashboardSortState,p,m):a.route==="/master"?a.masterSortState=vt(a.masterSortState,p,m):a.route==="/analytics"&&(a.analyticsSortState=vt(a.analyticsSortState,p,m)),A()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(s=>{s.addEventListener("click",async()=>{const i=parseInt(s.dataset.year??"",10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await ut(i,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),A())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async s=>{const i=parseInt(s.target.value,10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await ut(i,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),A())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.groupby??"billing";a.customerEfficiencyGroupBy=i,a.customerEfficiency=await ut(a.customerEfficiencyYear,i,a.customerEfficiencyFiscalType),A()})}),e.querySelectorAll("[data-action='efficiency-fiscal-type']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.fiscalType??"jan";a.customerEfficiencyFiscalType=i,a.customerEfficiency=await ut(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,i),A()})}),e.querySelectorAll("[data-product-period]").forEach(s=>{s.addEventListener("click",()=>{a.productPeriod=s.dataset.productPeriod??"year",A()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const s=document.getElementById("pp-range-start")?.value??"",i=document.getElementById("pp-range-end")?.value??"";s&&i&&(a.productCustomStart=s,a.productCustomEnd=i,a.productPeriod="custom",A())}),e.querySelectorAll("[data-product-filter]").forEach(s=>{s.addEventListener("click",()=>{a.productFilter=s.dataset.productFilter??"all",A()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="更新中…",await yt(),i.disabled=!1,i.textContent="↻ 更新",F("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const s=e.querySelector("#sales-start")?.value??"",i=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:s,endDate:i},Im()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const s={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=s,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,Mm(s)}),e.addEventListener("click",s=>{const i=s.target.closest("tr[data-doc-no]");if(!i)return;const p=i.dataset.docNo??"";if(a.route==="/"){a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,navigateTo("/sales"),Oa(p).then(m=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=m,A())});return}if(a.invoiceSelectedDocNo===p){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,A();return}a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,A(),Oa(p).then(m=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=m,A())})});const f=e.querySelector("#ledger-customer-code"),x=e.querySelector("#ledger-cust-suggestions");if(f&&x){const s=a.masterStats?.customers??[];f.addEventListener("input",()=>{const i=f.value.trim().toLowerCase();if(!i){x.style.display="none";return}const p=s.filter(m=>m.code.toLowerCase().includes(i)||m.name.toLowerCase().includes(i)||(m.kanaName??"").toLowerCase().includes(i)).slice(0,10);if(!p.length){x.style.display="none";return}x.innerHTML=p.map(m=>`<button class="search-item" type="button" data-ledger-cust="${m.code}"><span class="mono">${m.code}</span><span>${m.name}</span></button>`).join(""),x.style.display="block",x.querySelectorAll("[data-ledger-cust]").forEach(m=>{m.addEventListener("click",()=>{const h=m.dataset.ledgerCust??"";f.value=h,x.style.display="none",a.ledgerCustomerCode=h,Na(h)})})}),f.addEventListener("keydown",i=>{if(i.key==="Enter"){x.style.display="none";const p=f.value.trim(),m=p.toLowerCase(),h=(a.masterStats?.customers??[]).filter(_=>_.code.toLowerCase()===m||_.name.toLowerCase()===m),b=h.length===1?h[0].code:p.toUpperCase();a.ledgerCustomerCode=b,Na(b)}}),f.addEventListener("blur",()=>{setTimeout(()=>{x.style.display="none"},200)})}e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const s=e.querySelector("#ledger-customer-code")?.value.trim()??"",i=s.toLowerCase(),p=(a.masterStats?.customers??[]).filter(h=>h.code.toLowerCase()===i||h.name.toLowerCase()===i),m=p.length===1?p[0].code:s.toUpperCase();a.ledgerCustomerCode=m,Na(m)}),e.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{a.masterTab=s.dataset.tab,a.masterFilter={...xn},A()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},A()}),e.querySelector("#master-search")?.addEventListener("keydown",s=>{s.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.page);i>=1&&(a.masterFilter={...a.masterFilter,page:i},A())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.table;if(!i)return;a.rawSelectedTable=i,a.rawPage=1;const p=await ta(i,1);a.rawRecords=p.records,a.rawTotalCount=p.total,A()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const s=await ta(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,A()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const s=await ta(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,A()}),e.querySelectorAll("[data-analytics-tab]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsTab=s.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:p}=await N(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}=await Promise.resolve().then(()=>z);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}},void 0);a.analyticsPeriodOptions=await p(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await i(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}A()})}),e.querySelectorAll("[data-analytics-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:p,fetchPeriodChartData:m,prevYearFilter:h}=await N(async()=>{const{fetchAnalyticsByPeriod:_,fetchAvailablePeriods:w,fetchPeriodChartData:k,prevYearFilter:D}=await Promise.resolve().then(()=>z);return{fetchAnalyticsByPeriod:_,fetchAvailablePeriods:w,fetchPeriodChartData:k,prevYearFilter:D}},void 0),b=s.dataset.analyticsPeriod;if(a.analyticsPeriod=b,a.analyticsDrilldown=null,b==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await p(a.analyticsTab,b),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const _=a.analyticsPeriodFilter,[w,k,D]=await Promise.all([i(a.analyticsTab,b,_),m(b,_),m(b,h(_))]);a.analyticsPeriodRows=w,a.analyticsPeriodChartData=k,a.analyticsPrevYearChartData=D}A()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async s=>{const{fetchAnalyticsByPeriod:i,fetchPeriodChartData:p,prevYearFilter:m}=await N(async()=>{const{fetchAnalyticsByPeriod:_,fetchPeriodChartData:w,prevYearFilter:k}=await Promise.resolve().then(()=>z);return{fetchAnalyticsByPeriod:_,fetchPeriodChartData:w,prevYearFilter:k}},void 0);a.analyticsPeriodFilter=s.target.value,a.analyticsDrilldown=null;const h=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:_}=await N(async()=>{const{fiscalYearToDateRange:O}=await Promise.resolve().then(()=>Xn);return{fiscalYearToDateRange:O}},void 0),w=parseInt(h),k=_(w);_(w-1);const D=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:L}=await N(async()=>{const{supabaseRpc:O}=await Promise.resolve().then(()=>te);return{supabaseRpc:O}},void 0),[q,I,B]=await Promise.all([L(D,{p_date_from:k.from,p_date_to:k.to}),p("yearly",h),p("yearly",String(w-1))]);a.analyticsPeriodRows=(q??[]).map(O=>({code:String(O.code??""),name:String(O.name??""),amount:Number(O.amount??0),quantity:Number(O.quantity??0),documents:Number(O.documents??0),volumeMl:Number(O.volume_ml??0)})),a.analyticsPeriodChartData=(I??[]).map(O=>({...O})),a.analyticsPrevYearChartData=(B??[]).map(O=>({...O}))}else{const[_,w,k]=await Promise.all([i(a.analyticsTab,a.analyticsPeriod,h),p(a.analyticsPeriod,h),p(a.analyticsPeriod,m(h))]);a.analyticsPeriodRows=_,a.analyticsPeriodChartData=w,a.analyticsPrevYearChartData=k}A()}),e.querySelectorAll("[data-fiscal-mode]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsFiscalMode=s.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:i}=await N(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>Xn);return{monthToFiscalYear:m}},void 0),p=new Set;for(const m of a.salesAnalytics.monthlySales)p.add(i(m.month));a.analyticsPeriodOptions=[...p].sort((m,h)=>h-m).map(String)}else{const{fetchAvailablePeriods:i}=await N(async()=>{const{fetchAvailablePeriods:p}=await Promise.resolve().then(()=>z);return{fetchAvailablePeriods:p}},void 0);a.analyticsPeriodOptions=await i(a.analyticsTab,"yearly")}A()})}),e.querySelectorAll("[data-chart-metric]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsChartMetric=s.dataset.chartMetric,A()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.analyticsDrilldown??"",p=s.dataset.drilldownName??i,m=a.analyticsTab,{fetchCustomerProductBreakdown:h,fetchProductCustomerBreakdown:b,fetchEntityMonthlySales:_,periodToDateRange:w}=await N(async()=>{const{fetchCustomerProductBreakdown:q,fetchProductCustomerBreakdown:I,fetchEntityMonthlySales:B,periodToDateRange:O}=await Promise.resolve().then(()=>z);return{fetchCustomerProductBreakdown:q,fetchProductCustomerBreakdown:I,fetchEntityMonthlySales:B,periodToDateRange:O}},void 0),k=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?w(a.analyticsPeriod,a.analyticsPeriodFilter):null,[D,L]=await Promise.all([_(i,m==="customers"?"customer":"product"),m==="customers"?h(i,k?.from,k?.to):b(i,k?.from,k?.to)]);a.analyticsDrilldown={tab:m,code:i,name:p,monthlySales:D,breakdownRows:L},A()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,A()}),e.querySelector("#staff-filter-input")?.addEventListener("input",s=>{a.analyticsStaffFilter=s.target.value,A()}),e.querySelectorAll("[data-staff-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.staffDrilldown??"",p=s.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:h,periodToDateRange:b}=await N(async()=>{const{fetchStaffCustomerBreakdown:L,fetchStaffProductBreakdown:q,periodToDateRange:I}=await Promise.resolve().then(()=>z);return{fetchStaffCustomerBreakdown:L,fetchStaffProductBreakdown:q,periodToDateRange:I}},void 0),_=b(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),w=a.analyticsStaffDrilldown?.breakdownTab??"customers",[k,D]=await Promise.all([m(i,_?.from,_?.to),h(i,_?.from,_?.to)]);a.analyticsStaffDrilldown={code:i,name:p,breakdownTab:w,customerRows:k,productRows:D},A()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:s.dataset.staffBreakdownTab},A())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,A()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",s=>{a.analyticsTagFilter=s.target.value,A()}),e.querySelectorAll("[data-staff-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAvailablePeriods:i,fetchStaffTotalsByPeriod:p,periodToDateRange:m}=await N(async()=>{const{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:_,periodToDateRange:w}=await Promise.resolve().then(()=>z);return{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:_,periodToDateRange:w}},void 0),h=s.dataset.staffPeriod;if(a.analyticsStaffPeriod=h,a.analyticsStaffDrilldown=null,h==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await i("staff",h),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const b=m(h,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await p(b?.from,b?.to)}A()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async s=>{const{fetchStaffTotalsByPeriod:i,periodToDateRange:p}=await N(async()=>{const{fetchStaffTotalsByPeriod:h,periodToDateRange:b}=await Promise.resolve().then(()=>z);return{fetchStaffTotalsByPeriod:h,periodToDateRange:b}},void 0);a.analyticsStaffPeriodFilter=s.target.value;const m=p(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await i(m?.from,m?.to),a.analyticsStaffDrilldown=null,A()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Ne(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},A()}),e.querySelectorAll("[data-action='remove-line']").forEach(s=>{s.addEventListener("click",()=>{Ne(e);const i=parseInt(s.dataset.line??"0",10);a.invoiceForm.lines.splice(i,1),a.invoiceErrors=ar(a.invoiceForm),A()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(s=>{s.addEventListener("click",()=>{Ne(e),_m(parseInt(s.dataset.line??"0",10)),a.invoiceErrors={},A()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Sm(),A()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Ne(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,A()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(s=>{s.addEventListener("click",()=>{Ne(e);const i=parseInt(s.dataset.line??"0",10),p=a.invoiceForm.lines[i];a.pickerMode="product",a.pickerTargetLine=i,a.pickerQuery=p?p.productCode||p.productName:"",A()})}),e.querySelectorAll("[data-action='modal-close']").forEach(s=>{s.addEventListener("click",i=>{s.classList.contains("modal-backdrop")&&i.target instanceof HTMLElement&&!i.target.classList.contains("modal-backdrop")||(ma(),A())})}),e.querySelectorAll("[data-action='picker-select']").forEach(s=>{const i=async()=>{const p=s.dataset.code??"",m=s.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=p,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const h=a.masterStats?.customers.find(b=>b.code===p);a.invoicePriceGroup=h?.priceGroup||"",!a.invoicePriceGroup&&p&&(a.invoicePriceGroup=await Fa(p))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const h=a.invoiceForm.lines[a.pickerTargetLine];if(h){h.productCode=p,h.productName=m;const b=await yo(a.invoicePriceGroup,p);b>0&&(h.unitPrice=b),h.amount=h.quantity*h.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}ma(),A()};s.addEventListener("click",i),s.addEventListener("keydown",p=>{p.key==="Enter"&&i()})}),e.querySelector("#modal-search")?.addEventListener("input",s=>{a.pickerQuery=s.target.value,A()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{tr(),A()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{nr(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Ne(e),km(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await Fa(a.invoiceForm.customerCode)),A())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Ne(e),Pm(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,A())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(s=>{s.addEventListener("input",()=>{Ne(e),a.invoiceSavedDocNo=null;const i=s.dataset.field;(i==="quantity"||i==="unitPrice")&&A()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Ne(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const s=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=s.trim(),a.deliveryNote=null,a.actionLoading=!0,A(),!a.deliverySearchDocNo){F("伝票番号を入力してください","error"),a.actionLoading=!1,A();return}ln(a.deliverySearchDocNo).then(i=>{a.deliveryNote=i,a.actionLoading=!1,A()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const s=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=s,a.billingSummary=null,a.actionLoading=!0,A(),cn(s).then(i=>{a.billingSummary=i,a.actionLoading=!1,A()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const s=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),i=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=s,a.taxMonth=i,a.taxDeclaration=null,a.taxVolume=null,a.actionLoading=!0,A(),Promise.all([un(s,i),mn(s,i)]).then(([p,m])=>{a.taxDeclaration=p,a.taxVolume=m,a.actionLoading=!1,A()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:s}=await N(async()=>{const{generateTaxXML:b}=await Promise.resolve().then(()=>z);return{generateTaxXML:b}},void 0),i=s(a.taxDeclaration),p=new Blob([i],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(p),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:s}=await N(async()=>{const{generateTaxCSV:b}=await Promise.resolve().then(()=>z);return{generateTaxCSV:b}},void 0),i=s(a.taxDeclaration),p=new Blob([i],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(p),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:s}=await N(async()=>{const{saveTaxDeclaration:i}=await Promise.resolve().then(()=>z);return{saveTaxDeclaration:i}},void 0);try{await s(a.taxDeclaration),F("下書き保存しました")}catch(i){F("保存に失敗: "+(i instanceof Error?i.message:String(i)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(s=>{s.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.taxRow),p=s.dataset.taxField,m=s.type==="number"?Number(s.value)||0:s.value,h=[...a.taxDeclaration.rows];h[i]={...h[i],[p]:m};const{recalculateTaxDeclaration:b}=await N(async()=>{const{recalculateTaxDeclaration:_}=await Promise.resolve().then(()=>z);return{recalculateTaxDeclaration:_}},void 0);a.taxDeclaration=b({...a.taxDeclaration,rows:h}),A()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.dedRow),p=s.dataset.dedField,m=s.type==="number"?Number(s.value)||0:s.value,h=[...a.taxDeclaration.deductions];h[i]={...h[i],[p]:m},a.taxDeclaration={...a.taxDeclaration,deductions:h},A()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=s.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[i]:s.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:s,TAX_RATE_CATEGORIES:i}=await N(async()=>{const{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}=await Promise.resolve().then(()=>z);return{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}},void 0),p=i[0],m={taxCategory:p.code,taxCategoryName:p.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:p.taxRatePerLiter,taxAmount:0};a.taxDeclaration=s({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),A()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(s=>{s.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.taxRow),{recalculateTaxDeclaration:p}=await N(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>z);return{recalculateTaxDeclaration:h}},void 0),m=a.taxDeclaration.rows.filter((h,b)=>b!==i);a.taxDeclaration=p({...a.taxDeclaration,rows:m}),A()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const s={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,s]},A()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(s=>{s.addEventListener("click",()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.dedRow),p=a.taxDeclaration.deductions.filter((m,h)=>h!==i);a.taxDeclaration={...a.taxDeclaration,deductions:p},A()})}),e.querySelectorAll("[data-store-tab]").forEach(s=>{s.addEventListener("click",()=>{a.storeTab=s.dataset.storeTab,A()})}),e.querySelectorAll("[data-import-entity]").forEach(s=>{s.addEventListener("click",()=>{a.importEntity=s.dataset.importEntity,a.importPreview=null,a.importResult=null,A()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const s=Yo(a.importEntity),i=new Blob([s],{type:"text/csv;charset=utf-8"}),p=URL.createObjectURL(i),m=document.createElement("a");m.href=p,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(p)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const i=e.querySelector("#import-file")?.files?.[0];if(!i){F("CSVファイルを選択してください","warning");return}const p=new FileReader;p.onload=()=>{const m=String(p.result??""),{columns:h,rows:b}=Fo(m);a.importPreview=Vo(a.importEntity,h,b),a.importResult=null,A()},p.readAsText(i,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,A()}),e.querySelectorAll("[data-print-template]").forEach(s=>{s.addEventListener("click",()=>{a.printTemplate=s.dataset.printTemplate,A()})}),e.querySelectorAll("[data-print-field]").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.printField;let p=s.value;(i==="taxRate"||i==="previousBalance"||i==="paymentAmount")&&(p=Number(s.value)||0),a.printData={...a.printData,[i]:p},A()})}),e.querySelectorAll("[data-print-opt]").forEach(s=>{const i=()=>{const p=s.dataset.printOpt;let m;s.type==="checkbox"?m=s.checked:p==="copies"?m=Number(s.value)||1:p==="overlayOpacity"||p==="calibrationOffsetX"||p==="calibrationOffsetY"?m=Number(s.value)||0:m=s.value,a.printOptions={...a.printOptions,[p]:m},A()};s.addEventListener("change",i),s.type==="range"&&s.addEventListener("input",i)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(s=>{s.addEventListener("change",()=>{const i=Number(s.dataset.printLine),p=s.dataset.printLfield,m=[...a.printData.lines];let h=s.value;(p==="quantity"||p==="unitPrice")&&(h=Number(s.value)||0),m[i]={...m[i],[p]:h},m[i].amount=(Number(m[i].quantity)||0)*(Number(m[i].unitPrice)||0),a.printData={...a.printData,lines:m},A()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},A()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((p,m)=>m!==i)},A()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),F("印刷設定を保存しました")}catch(s){F("保存失敗: "+(s instanceof Error?s.message:String(s)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const s=a.printCompany,i=prompt("会社名",s.name);if(i===null)return;const p=prompt("郵便番号",s.postalCode)??s.postalCode,m=prompt("住所",s.address1)??s.address1,h=prompt("TEL",s.tel)??s.tel,b=prompt("FAX",s.fax)??s.fax,_=prompt("適格請求書登録番号 (T+13桁)",s.registrationNo)??s.registrationNo,w=prompt("取引銀行名",s.bankName)??s.bankName,k=prompt("支店名",s.bankBranch)??s.bankBranch,D=prompt("口座番号",s.bankAccountNo)??s.bankAccountNo,L=prompt("口座名義",s.bankAccountHolder)??s.bankAccountHolder;a.printCompany={...s,name:i,postalCode:p,address1:m,tel:h,fax:b,registrationNo:_,bankName:w,bankBranch:k,bankAccountNo:D,bankAccountHolder:L},A()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,A()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const p=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=Ea(s),{savePrintLayout:h}=await N(async()=>{const{savePrintLayout:_}=await Promise.resolve().then(()=>z);return{savePrintLayout:_}},void 0),b={id:`bp1701_${p.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:p,templateKey:"chain_store",positions:m};try{await h(b)?(F(`クラウド保存成功: ${p}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),A()):(F("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(_){F("保存エラー: "+(_ instanceof Error?_.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const i=Ea(s);a.fdSavedPositions=i;try{localStorage.setItem("sake_fd_positions",JSON.stringify(i)),F(`ローカル保存完了: ${Object.keys(i).length}件`)}catch(p){F("保存失敗: "+(p instanceof Error?p.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const p={templateKey:"chain_store",positions:Ea(s),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(p,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),b=document.createElement("a");b.href=h,b.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,b.click(),URL.revokeObjectURL(h)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async s=>{const i=s.target.files?.[0];if(i)try{const p=await i.text(),h=JSON.parse(p).positions;if(!h)throw new Error("positions field not found");a.fdSavedPositions=h,localStorage.setItem("sake_fd_positions",JSON.stringify(h)),F(`インポート成功: ${Object.keys(h).length}件`),A()}catch(p){F("インポート失敗: "+(p instanceof Error?p.message:""),"error")}});const S=e.querySelector("#fd-saved-layouts");S&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:s}=await N(async()=>{const{fetchPrintLayouts:p}=await Promise.resolve().then(()=>z);return{fetchPrintLayouts:p}},void 0),i=await s("chain_store");i.length===0?S.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(S.innerHTML=`☁️ クラウド保存済み (${i.length}件):<br/>`+i.map(p=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${p.id}" style="margin:4px 4px 0 0;">${p.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${p.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),S.querySelectorAll("[data-action='fd-load-layout']").forEach(p=>{p.addEventListener("click",()=>{const m=p.dataset.layoutId,h=i.find(b=>b.id===m);h&&(a.fdSavedPositions=h.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(h.positions)),F(`読込完了: ${h.name}`),A())})}),S.querySelectorAll("[data-action='fd-delete-layout']").forEach(p=>{p.addEventListener("click",async()=>{const m=p.dataset.layoutId;if(!m||!await Ae("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:h}=await N(async()=>{const{deletePrintLayout:_}=await Promise.resolve().then(()=>z);return{deletePrintLayout:_}},void 0);await h(m)?(F("削除しました"),A()):F("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Ae("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),A())});const $=e.querySelector("#fd-sel-x"),C=e.querySelector("#fd-sel-y");if([$,C].forEach(s=>{s?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const i=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);i&&($&&(i.style.left=$.value+"mm"),C&&(i.style.top=C.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(s=>{s.addEventListener("dragstart",i=>{s.classList.add("wf-dragging"),i.dataTransfer?.setData("text/plain",s.dataset.wfOrder??"")}),s.addEventListener("dragend",()=>s.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(s=>{s.addEventListener("dragover",i=>i.preventDefault()),s.addEventListener("drop",i=>{i.preventDefault();const p=i.dataTransfer?.getData("text/plain"),m=s.dataset.wfStage;if(!p||!m)return;const h=a.workflowOrders.find(b=>b.id===p);h&&(h.stage=m,A())})}),e.querySelectorAll("[data-mo-step]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moStep;s.disabled||(a.mobileOrder.step=i,A())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",s=>{a.mobileOrder.customerQuery=s.target.value,A()}),e.querySelector("#mo-product-q")?.addEventListener("input",s=>{a.mobileOrder.productQuery=s.target.value,A()}),e.querySelectorAll("[data-mo-select-customer]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moSelectCustomer,p=a.masterStats?.customers.find(m=>m.id===i);p&&(a.mobileOrder.selectedCustomer=p),A()})}),e.querySelectorAll("[data-mo-add-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moAddProduct,p=a.masterStats?.products.find(h=>h.code===i);if(!p)return;const m=1800;a.mobileOrder.cart.push({productCode:p.code,productName:p.name,quantity:1,unit:"本",unitPrice:m,amount:m}),A()})}),e.querySelectorAll("[data-mo-qty]").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.moQty),p=s.dataset.moProduct,m=a.mobileOrder.cart.find(h=>h.productCode===p);m&&(m.quantity=Math.max(0,m.quantity+i),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(h=>h.productCode!==p)),A())})}),e.querySelectorAll("[data-mo-remove]").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.moRemove);a.mobileOrder.cart.splice(i,1),A()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const s=e.querySelector("#mo-memo");a.mobileOrder.memo=s?.value??"";const i="MO"+Date.now().toString().slice(-8),p=e.querySelector("[data-action='mo-submit']");p&&(p.disabled=!0,p.textContent="送信中…");const m=a.mobileOrder.cart.reduce((h,b)=>h+b.amount,0);try{const{saveStoreOrder:h}=await N(async()=>{const{saveStoreOrder:b}=await Promise.resolve().then(()=>z);return{saveStoreOrder:b}},void 0);await h(i,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(h){console.error("受注保存失敗:",h),F("送信に失敗しました","error"),p&&(p.disabled=!1,p.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=i,a.mobileOrder.step="done",A()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},A()}),e.querySelectorAll("[data-tour-id]").forEach(s=>{s.addEventListener("click",()=>{a.tourActiveId=s.dataset.tourId??null,A()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(s=>{s.addEventListener("click",()=>{const i=a.tourInquiries.find(_=>_.id===a.tourActiveId);if(!i)return;const p=s.dataset.template==="confirm"?dp:pp,m=e.querySelector("#tour-confirmed-time"),h=p.replaceAll("{name}",i.name).replaceAll("{partySize}",String(i.partySize)).replaceAll("{confirmedTime}",m?.value??i.visitDate),b=e.querySelector("#tour-reply-body");b&&(b.value=h)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const s=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",i=a.tourInquiries.find(m=>m.id===s);if(!i)return;const p=e.querySelector("#tour-confirmed-time");i.status="confirmed",i.repliedAt=new Date().toISOString(),i.confirmedTime=p?.value??"",F("返信メールを下書き保存し、ステータスを確定にしました"),A()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const s=e.querySelector("#lb-type")?.value??"",i=e.querySelector("#lb-area")?.value??"",p=e.querySelector("#lb-keyword")?.value??"";if(!s&&!p){F("業種かキーワードを入力してください","warning");return}a.leadSearchType=s,a.leadSearchArea=i,a.leadSearchQuery=p,a.leadSearching=!0,A();const m=a.integrations.find(w=>w.provider==="google_maps");if(!m||!m.config.api_key){F("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,A();return}const{searchPlaces:h}=await N(async()=>{const{searchPlaces:w}=await Promise.resolve().then(()=>z);return{searchPlaces:w}},void 0),b=[s,p].filter(Boolean).join(" "),_=await h(m,b,i);a.leadSearching=!1,_.error?F("検索失敗: "+_.error,"error"):a.leadSearchResults=_.results,A()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],A()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const s=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!s)return;const i=`ll_${Date.now()}`,p={id:i,name:s,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:h,fetchLeadLists:b,fetchLeadItems:_}=await N(async()=>{const{saveLeadList:D,saveLeadItem:L,fetchLeadLists:q,fetchLeadItems:I}=await Promise.resolve().then(()=>z);return{saveLeadList:D,saveLeadItem:L,fetchLeadLists:q,fetchLeadItems:I}},void 0);await m(p);const w=e.querySelectorAll(".lb-search-check:checked"),k=Array.from(w).map(D=>Number(D.dataset.idx));for(const D of k){const L=a.leadSearchResults[D];L&&await h({...L,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:i,businessType:a.leadSearchType})}a.leadLists=await b(),a.leadActiveListId=i,a.leadItems=await _(i),a.leadSearchResults=[],F(`${k.length}件を「${s}」として保存しました`),A()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??null;if(a.leadActiveListId=i,i){const{fetchLeadItems:p}=await N(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>z);return{fetchLeadItems:m}},void 0);a.leadItems=await p(i)}A()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=a.leadItems.find(b=>b.id===i);if(!p)return;const{saveLeadItem:m,fetchLeadItems:h}=await N(async()=>{const{saveLeadItem:b,fetchLeadItems:_}=await Promise.resolve().then(()=>z);return{saveLeadItem:b,fetchLeadItems:_}},void 0);await m({...p,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),A()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=a.leadItems.find(_=>_.id===i);if(!p)return;const{convertLeadToProspect:m,fetchLeadItems:h}=await N(async()=>{const{convertLeadToProspect:_,fetchLeadItems:w}=await Promise.resolve().then(()=>z);return{convertLeadToProspect:_,fetchLeadItems:w}},void 0);await m(p)&&(F("見込客に追加しました: "+p.companyName),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),A())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const s=e.querySelectorAll(".lb-item-check:checked");if(s.length===0&&!await Ae("全ての新規アイテムを見込客に変換しますか？"))return;const i=s.length>0?Array.from(s).map(b=>b.dataset.id):a.leadItems.filter(b=>b.status==="new").map(b=>b.id),{convertLeadToProspect:p,fetchLeadItems:m}=await N(async()=>{const{convertLeadToProspect:b,fetchLeadItems:_}=await Promise.resolve().then(()=>z);return{convertLeadToProspect:b,fetchLeadItems:_}},void 0);let h=0;for(const b of i){const _=a.leadItems.find(w=>w.id===b);_&&_.status==="new"&&await p(_)&&h++}F(`${h}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),A()}),e.querySelectorAll("[data-analysis-tab]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.analysisTab;a.analysisTab!==i&&(a.analysisTab=i,A())})}),e.querySelector("#analysis-period-year")?.addEventListener("change",async s=>{const i=s.target.value,p=e.querySelector("#analysis-period-month")?.value??"";a.analysisPeriod=i&&p?`${i}-${p}`:i,a.customerAnalysis=null,a.productABC=null,await Mt("/customer-analysis"),A()}),e.querySelector("#analysis-period-month")?.addEventListener("change",async s=>{const i=s.target.value,p=e.querySelector("#analysis-period-year")?.value??"";a.analysisPeriod=p&&i?`${p}-${i}`:p,a.customerAnalysis=null,a.productABC=null,await Mt("/customer-analysis"),A()}),e.querySelector("#customer-map")){const s=()=>{window.google?.maps?jm(e):setTimeout(s,200)};s()}e.querySelectorAll(".churn-reason-select").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.churnCode??"",p=s.value;try{const{saveChurnNote:m}=await N(async()=>{const{saveChurnNote:_}=await Promise.resolve().then(()=>z);return{saveChurnNote:_}},void 0);await m({customerCode:i,reason:p,memo:"",actionedAt:null});const h=a.churnNotes.find(_=>_.customerCode===i);h?h.reason=p:a.churnNotes.push({customerCode:i,reason:p,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const b=s.closest("tr");if(b){const _=b.querySelector("td:nth-child(2)");if(_){let w=_.querySelector(".reason-badge");!w&&p&&(w=document.createElement("span"),w.className="status-pill info reason-badge",w.style.fontSize="0.72rem",_.appendChild(w)),w&&(w.textContent=p?mm[p]??"":"")}}F("理由を保存しました")}catch(m){F("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.churnCode??"",p=s.checked,m=s.closest("tr");m&&(m.style.opacity=p?"0.45":"",m.setAttribute("data-actioned",p?"1":"0"));try{const{saveChurnNote:h}=await N(async()=>{const{saveChurnNote:k}=await Promise.resolve().then(()=>z);return{saveChurnNote:k}},void 0),b=a.churnNotes.find(k=>k.customerCode===i),_=b?.reason??"",w=new Date().toISOString().slice(0,10);await h({customerCode:i,reason:_,memo:"",actionedAt:p?w:null}),b?b.actionedAt=p?w:null:a.churnNotes.push({customerCode:i,reason:_,memo:"",actionedAt:p?w:null,updatedAt:new Date().toISOString()}),F(p?"対応済みにしました":"対応済みを解除しました")}catch(h){F("保存に失敗しました","error"),console.error(h)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const s=a.integrations.find(h=>h.provider==="ivry");if(!s||!s.isEnabled){F("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:i,fetchCallLogs:p}=await N(async()=>{const{syncIvryCallLogs:h,fetchCallLogs:b}=await Promise.resolve().then(()=>z);return{syncIvryCallLogs:h,fetchCallLogs:b}},void 0),m=await i(s);m.error?F("同期失敗: "+m.error,"error"):(F(`${m.count}件の通話履歴を同期しました`),a.callLogs=await p(100),A())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const s=a.integrations.find(h=>h.provider==="ivry");if(!s||!s.isEnabled){F("IVRy連携が無効です","warning");return}if(!await Ae("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:i}=await N(async()=>{const{syncPhoneBookToIvry:h}=await Promise.resolve().then(()=>z);return{syncPhoneBookToIvry:h}},void 0),p=[];a.masterStats?.customers.forEach(h=>{p.push({name:h.name,phone:"",customerCode:h.code,note:"既存取引先"})}),a.prospects.forEach(h=>{h.phone&&p.push({name:h.companyName,phone:h.phone,customerCode:h.id,note:`見込客 (${h.stage})`})});const m=await i(s,p);m.error?F("送信失敗: "+m.error,"error"):F(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=s.dataset.phone??"",m=prompt(`電話番号 ${p} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const h=a.callLogs.find(w=>w.id===i);if(!h)return;const{saveCallLog:b,fetchCallLogs:_}=await N(async()=>{const{saveCallLog:w,fetchCallLogs:k}=await Promise.resolve().then(()=>z);return{saveCallLog:w,fetchCallLogs:k}},void 0);await b({...h,matchedCustomerCode:m}),a.callLogs=await _(100),A()})}),e.querySelectorAll("[data-action='call-memo']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=a.callLogs.find(_=>_.id===i);if(!p)return;const m=prompt("メモを入力:",p.notes??"");if(m===null)return;const{saveCallLog:h,fetchCallLogs:b}=await N(async()=>{const{saveCallLog:_,fetchCallLogs:w}=await Promise.resolve().then(()=>z);return{saveCallLog:_,fetchCallLogs:w}},void 0);await h({...p,notes:m}),a.callLogs=await b(100),A()})}),e.querySelectorAll("[data-prospect-view]").forEach(s=>{s.addEventListener("click",()=>{a.prospectViewMode=s.dataset.prospectView,A()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",A()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:p}=await N(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>z);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await p(i)}A()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.prospectId??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:p}=await N(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>z);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await p(i)}A()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],A())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const s=a.prospectEditingId==="__new__",i=s?`p_${Date.now()}`:a.prospectEditingId??"",p={id:i,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!p.companyName){F("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:h,recordAudit:b,sendSlackNotification:_}=await N(async()=>{const{saveProspect:k,fetchProspects:D,recordAudit:L,sendSlackNotification:q}=await Promise.resolve().then(()=>z);return{saveProspect:k,fetchProspects:D,recordAudit:L,sendSlackNotification:q}},void 0);await m(p)?(s&&await _("new_prospect",`新規見込客: ${p.companyName} / 想定 ¥${p.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await b({action:s?"prospect_create":"prospect_update",entityType:"prospect",entityId:i,userEmail:a.user?.email}),a.prospects=await h(),a.prospectEditingId=null,A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Ae("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteProspect:p,fetchProspects:m}=await N(async()=>{const{deleteProspect:h,fetchProspects:b}=await Promise.resolve().then(()=>z);return{deleteProspect:h,fetchProspects:b}},void 0);await p(i)&&(a.prospects=await m(),A())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const p=s.dataset.id??"",m=s.dataset.name??"",h=s.dataset.addr??"";a.quoteState=pa(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=h,a.quoteState.isProspect=!0,a.quoteState.prospectId=p,a.quotePricing=null,a.quoteEditId="new",tt("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",i=e.querySelector("#prospect-activity-type")?.value??"call",p=e.querySelector("#prospect-activity-title")?.value??"";if(!p){F("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:h}=await N(async()=>{const{saveProspectActivity:b,fetchProspectActivities:_}=await Promise.resolve().then(()=>z);return{saveProspectActivity:b,fetchProspectActivities:_}},void 0);await m({id:`act_${Date.now()}`,prospectId:s,activityType:i,title:p,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await h(s),A()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("dragstart",i=>{i.dataTransfer?.setData("text/plain",s.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(s=>{s.addEventListener("dragover",i=>i.preventDefault()),s.addEventListener("drop",async i=>{i.preventDefault();const p=i.dataTransfer?.getData("text/plain"),m=s.dataset.prospectStage;if(!p)return;const h=a.prospects.find(b=>b.id===p);if(h&&h.stage!==m){const b={...h,stage:m},{saveProspect:_}=await N(async()=>{const{saveProspect:w}=await Promise.resolve().then(()=>z);return{saveProspect:w}},void 0);await _(b),h.stage=m,A()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:s,saveIntegrationSetting:i}=await N(async()=>{const{fetchIntegrationSettings:w,saveIntegrationSetting:k}=await Promise.resolve().then(()=>z);return{fetchIntegrationSettings:w,saveIntegrationSetting:k}},void 0),m=(a.integrations.length>0?a.integrations:await s()).find(w=>w.provider==="slack");if(!m)return;const h=e.querySelector("#slack-webhook")?.value??"",b=e.querySelector("#slack-default-channel")?.value??"",_=e.querySelector("#slack-enabled")?.checked??!1;await i({...m,config:{...m.config,webhook_url:h,default_channel:b},isEnabled:_}),a.integrations=await s(),F("保存しました"),A()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:s,fetchSlackRules:i}=await N(async()=>{const{saveSlackRule:p,fetchSlackRules:m}=await Promise.resolve().then(()=>z);return{saveSlackRule:p,fetchSlackRules:m}},void 0);for(const p of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="enabled"]`)?.checked??p.enabled,h=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="channel"]`)?.value??p.channel;await s({...p,enabled:m,channel:h})}a.slackRules=await i(),F("ルールを保存しました"),A()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:s}=await N(async()=>{const{sendSlackNotification:p}=await Promise.resolve().then(()=>z);return{sendSlackNotification:p}},void 0),i=await s("new_order","🧪 これはテスト通知です (syusen-cloud)");i.ok?F("テスト送信成功"):F("送信失敗: "+(i.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,A()}),e.querySelectorAll("[data-action='material-adjust']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.id??"",p=a.materialList.find(m=>m.id===i);p&&(a.materialEditing=p,a.materialEditingIsNew=!1,A())})}),e.querySelectorAll("[data-action='material-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,A())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const i={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(i.materialType=e.querySelector("#mat-type")?.value??"",!i.code||!i.name){F("コードと品名は必須です","warning");return}const{saveMaterial:p,fetchMaterialList:m}=await N(async()=>{const{saveMaterial:b,fetchMaterialList:_}=await Promise.resolve().then(()=>z);return{saveMaterial:b,fetchMaterialList:_}},void 0);await p(i)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,F("保存しました"),A()):F("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!s||!await Ae("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:i,fetchMaterialList:p}=await N(async()=>{const{deleteMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>z);return{deleteMaterial:m,fetchMaterialList:h}},void 0);await i(s)&&(a.materialList=await p(),a.materialEditing=null,A())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",A()}),e.querySelectorAll("[data-action='user-edit']").forEach(s=>{s.addEventListener("click",()=>{a.userEditingId=s.dataset.id??null,A()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,A()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const s=a.userEditingId==="__new__",i=s?crypto.randomUUID():a.userEditingId??"",p=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!p||!m){F("名前とメールアドレスは必須です","warning");return}const h={id:i,email:p,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(s){const D=e.querySelector("#user-password")?.value??"";if(D.length<8){F("パスワードは8文字以上必要です","warning");return}try{await Dn(p,D)}catch(L){F("Auth登録失敗: "+(L instanceof Error?L.message:""),"error");return}}const{saveUserProfile:b,fetchUserProfiles:_,recordAudit:w}=await N(async()=>{const{saveUserProfile:D,fetchUserProfiles:L,recordAudit:q}=await Promise.resolve().then(()=>z);return{saveUserProfile:D,fetchUserProfiles:L,recordAudit:q}},void 0);await b(h)?(await w({action:s?"user_create":"user_update",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await _(),a.userEditingId=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Ae("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteUserProfile:p,fetchUserProfiles:m,recordAudit:h}=await N(async()=>{const{deleteUserProfile:_,fetchUserProfiles:w,recordAudit:k}=await Promise.resolve().then(()=>z);return{deleteUserProfile:_,fetchUserProfiles:w,recordAudit:k}},void 0);await p(i)?(await h({action:"user_delete",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await m(),A()):F("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const s=e.querySelector("#profile-sender")?.value??"",i={...a.myProfile,defaultMailSenderId:s},{saveUserProfile:p}=await N(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>z);return{saveUserProfile:m}},void 0);await p(i),a.myProfile=i,F("保存しました"),A()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const s=e.querySelector("#profile-new-password")?.value??"";if(s.length<8){F("8文字以上のパスワードを入力してください","warning");return}try{await fr(s),F("パスワードを変更しました")}catch(i){F("変更失敗: "+(i instanceof Error?i.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(s=>{s.addEventListener("click",()=>{a.integrationEditingId=s.dataset.id??null,A()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,A()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='int-save']")?.dataset.id??"",i=a.integrations.find(w=>w.id===s);if(!i)return;const p={...i.config};Object.keys(p).forEach(w=>{const k=e.querySelector(`#int-${w}`);k&&(p[w]=k.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:h,fetchIntegrationSettings:b}=await N(async()=>{const{saveIntegrationSetting:w,fetchIntegrationSettings:k}=await Promise.resolve().then(()=>z);return{saveIntegrationSetting:w,fetchIntegrationSettings:k}},void 0);await h({...i,config:p,isEnabled:m})?(a.integrations=await b(),a.integrationEditingId=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(s=>{s.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="shopify");if(!i){F("Shopify連携が未設定です","warning");return}s.textContent="同期中…",s.disabled=!0;const{syncShopifyOrders:p,fetchShopifyOrders:m}=await N(async()=>{const{syncShopifyOrders:b,fetchShopifyOrders:_}=await Promise.resolve().then(()=>z);return{syncShopifyOrders:b,fetchShopifyOrders:_}},void 0),h=await p(i);h.error?F("同期失敗: "+h.error,"error"):(F(`${h.count}件を同期しました`),a.shopifyOrders=await m()),A()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(s=>{s.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="google_calendar");if(!i)return;s.textContent="同期中…",s.disabled=!0;const{syncGoogleCalendar:p,fetchCalendarEvents:m}=await N(async()=>{const{syncGoogleCalendar:b,fetchCalendarEvents:_}=await Promise.resolve().then(()=>z);return{syncGoogleCalendar:b,fetchCalendarEvents:_}},void 0),h=await p(i);h.error?F("同期失敗: "+h.error,"error"):(F(`${h.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),A()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const i=e.querySelector("#fax-file")?.files?.[0];if(!i){F("FAX画像を選択してください","warning");return}const p=a.integrations.find(m=>m.provider==="cloud_vision");if(!p||!p.config.api_key){F("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,A();try{const m=new FileReader;m.onload=async()=>{const h=String(m.result??""),{ocrFaxImage:b,saveFaxRecord:_,fetchFaxInbox:w}=await N(async()=>{const{ocrFaxImage:q,saveFaxRecord:I,fetchFaxInbox:B}=await Promise.resolve().then(()=>z);return{ocrFaxImage:q,saveFaxRecord:I,fetchFaxInbox:B}},void 0),k=await b(p,h),D=e.querySelector("#fax-sender-name")?.value??"",L=e.querySelector("#fax-sender-phone")?.value??"";await _({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:D,senderPhone:L,ocrStatus:k.error?"failed":"done",ocrText:k.text}),a.faxOcrText=k.error?`エラー: ${k.error}`:k.text,a.faxRecords=await w(),a.faxProcessing=!1,A()},m.readAsDataURL(i)}catch(m){F("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,A()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",A()}),e.querySelectorAll("[data-action='ms-edit']").forEach(s=>{s.addEventListener("click",()=>{a.mailSenderEditingId=s.dataset.id??null,A()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,A()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,i={id:s,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(b=>b.id===s)?.isVerified??!1};if(!i.name||!i.email){F("名前とメールアドレスは必須です","warning");return}const{saveMailSender:p,fetchMailSenders:m}=await N(async()=>{const{saveMailSender:b,fetchMailSenders:_}=await Promise.resolve().then(()=>z);return{saveMailSender:b,fetchMailSenders:_}},void 0);await p(i)?(a.mailSenders=await m(),a.mailSenderEditingId=null,F("保存しました"),A()):F("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Ae("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteMailSender:p,fetchMailSenders:m}=await N(async()=>{const{deleteMailSender:b,fetchMailSenders:_}=await Promise.resolve().then(()=>z);return{deleteMailSender:b,fetchMailSenders:_}},void 0);await p(i)?(a.mailSenders=await m(),A()):F("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(s=>{s.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){F("データなし","error");return}const s=a.demandAnalysis,i=Object.entries(s.matrix).map(([m,h])=>{const b={productCode:m};return s.months.forEach(_=>{b[_]=h[_]??0}),b}),p=[{key:"productCode",label:"商品コード"},...s.months.map(m=>({key:m,label:m}))];Xa("demand-analysis.csv",i,p)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){F("データなし","error");return}const s=a.productionPlan.map(p=>({...p}));Xa("production-plan.csv",s,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Ae("当月の全請求を締め切りますか？")&&F("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async s=>{const i=parseInt(s.target.value);a.brewingPlanFY=i;const{fetchBrewingPlanSummary:p,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:h,fetchBrewingProductDetail:b,fetchBrewingCustomCategories:_,fetchBrewingCategoryOverrides:w,fetchAllBrewingStockEntries:k}=await N(async()=>{const{fetchBrewingPlanSummary:M,fetchBrewingMonthlyTrend:j,fetchBrewingSchedule:Y,fetchBrewingProductDetail:J,fetchBrewingCustomCategories:W,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:H}=await Promise.resolve().then(()=>z);return{fetchBrewingPlanSummary:M,fetchBrewingMonthlyTrend:j,fetchBrewingSchedule:Y,fetchBrewingProductDetail:J,fetchBrewingCustomCategories:W,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:H}},void 0),[D,L,q,I,B,O,R]=await Promise.all([p(`${i}-10-01`,`${i+1}-09-30`),m(`${i}-10-01`,`${i+1}-09-30`),h(i),b(`${i}-10-01`,`${i+1}-09-30`),_(),w(),k()]);a.brewingPlanData=D,a.brewingMonthlyTrend=L,a.brewingSchedule=q,a.brewingProductDetail=I,a.brewingStockEntries=R,a.brewingCustomCategories=B,a.brewingOverrides=O,a.brewingExcludedProducts=new Set,A()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",p=s.dataset.parent??"";if(!i||!p)return;if(s.checked){a.brewingExcludedProducts.delete(i),A();return}a.brewingExcludedProducts.add(i);const m=a.brewingCustomCategories.filter(h=>h.parentCategory===p);if(m.length===1){const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:_,fetchBrewingCategoryOverrides:w}=await N(async()=>{const{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:R,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:j}=await Promise.resolve().then(()=>z);return{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:R,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:j}},void 0);await h(i,m[0].name);const k=a.brewingPlanFY,{fetchBrewingYearlyShipments:D}=await N(async()=>{const{fetchBrewingYearlyShipments:O}=await Promise.resolve().then(()=>z);return{fetchBrewingYearlyShipments:O}},void 0),[L,q,I,B]=await Promise.all([b(`${k}-10-01`,`${k+1}-09-30`),_(`${k}-10-01`,`${k+1}-09-30`),w(),D()]);a.brewingPlanData=L,a.brewingProductDetail=q,a.brewingOverrides=I,a.brewingYearlyShipments=B,a.brewingExcludedProducts.delete(i)}A()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",p=s.dataset.cat??"";if(!i||!p)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:_,fetchBrewingYearlyShipments:w}=await N(async()=>{const{setBrewingCategoryOverride:B,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:M,fetchBrewingYearlyShipments:j}=await Promise.resolve().then(()=>z);return{setBrewingCategoryOverride:B,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:M,fetchBrewingYearlyShipments:j}},void 0);await m(i,p);const k=a.brewingPlanFY,[D,L,q,I]=await Promise.all([h(`${k}-10-01`,`${k+1}-09-30`),b(`${k}-10-01`,`${k+1}-09-30`),_(),w()]);a.brewingPlanData=D,a.brewingProductDetail=L,a.brewingOverrides=q,a.brewingYearlyShipments=I,A()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"";if(!i)return;const{setBrewingCategoryOverride:p,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h,fetchBrewingCategoryOverrides:b,fetchBrewingYearlyShipments:_}=await N(async()=>{const{setBrewingCategoryOverride:I,fetchBrewingPlanSummary:B,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:R,fetchBrewingYearlyShipments:M}=await Promise.resolve().then(()=>z);return{setBrewingCategoryOverride:I,fetchBrewingPlanSummary:B,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:R,fetchBrewingYearlyShipments:M}},void 0);await p(i,null);const w=a.brewingPlanFY,[k,D,L,q]=await Promise.all([m(`${w}-10-01`,`${w+1}-09-30`),h(`${w}-10-01`,`${w+1}-09-30`),b(),_()]);a.brewingPlanData=k,a.brewingProductDetail=D,a.brewingOverrides=L,a.brewingYearlyShipments=q,A()})}),(()=>{const s=e.querySelector("#gantt-timeline");if(!s)return;const i=[9,10,11,12,1,2,3,4,5],p=i.length;let m=null,h=null;s.querySelectorAll(".gantt-bar").forEach(L=>{L.style.pointerEvents="auto"});function b(L){return"touches"in L?L.touches[0].clientX:L.clientX}function _(L){const q=L.target,I=q.closest(".gantt-bar");if(!I)return;const B=I.parentElement,O=I.dataset.cat??"",R=parseInt(I.dataset.month??"0"),M=parseInt(I.dataset.dur??"1"),j=parseInt(I.dataset.vol??"0"),Y=B.offsetWidth/p;let J="move";q.classList.contains("gantt-resize-right")?J="resize-right":q.classList.contains("gantt-resize-left")&&(J="resize-left"),I.style.cursor=J==="move"?"grabbing":"ew-resize",I.style.opacity="0.8",I.style.zIndex="10",m={bar:I,mode:J,cat:O,origMonth:R,origDur:M,origVol:j,startX:b(L),cellW:Y,origLeftPct:parseFloat(I.style.left),origWidthPct:parseFloat(I.style.width)},L.preventDefault()}function w(L){if(!m)return;const{bar:q,mode:I,origDur:B,startX:O,cellW:R,origLeftPct:M,origWidthPct:j}=m,Y=b(L)-O,J=Math.round(Y/R),W=Math.round(M/100*p);if(I==="move"){const Q=Math.max(0,Math.min(p-B,W+J));q.style.left=(Q/p*100).toFixed(2)+"%"}else if(I==="resize-right"){const Q=Math.max(1,Math.min(p-W,B+J));q.style.width=(Q/p*100).toFixed(2)+"%"}else if(I==="resize-left"){const Q=Math.max(0,Math.min(W+B-1,W+J)),H=B-(Q-W);q.style.left=(Q/p*100).toFixed(2)+"%",q.style.width=(H/p*100).toFixed(2)+"%"}}async function k(L){if(!m)return;const{bar:q,cat:I,origMonth:B,origDur:O,origVol:R}=m,M=Math.round(parseFloat(q.style.left)/100*p),j=Math.max(1,Math.round(parseFloat(q.style.width)/100*p)),Y=i[Math.max(0,Math.min(p-1,M))];if(q.style.cursor="grab",q.style.opacity="1",q.style.zIndex="",m=null,Y===B&&j===O)return;const{saveBrewingSchedule:J,fetchBrewingSchedule:W}=await N(async()=>{const{saveBrewingSchedule:H,fetchBrewingSchedule:X}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:H,fetchBrewingSchedule:X}},void 0),Q=a.brewingSchedule.filter(H=>H.brewCategory===I).map(H=>H.brewMonth===B?{brewMonth:Y,durationMonths:j,plannedVolumeL:R}:{brewMonth:H.brewMonth,durationMonths:H.durationMonths,plannedVolumeL:H.plannedVolumeL});await J(I,a.brewingPlanFY,Q),a.brewingSchedule=await W(a.brewingPlanFY),A()}s.addEventListener("mousedown",_),s.addEventListener("touchstart",_,{passive:!1}),document.addEventListener("mousemove",w),document.addEventListener("touchmove",w,{passive:!1}),document.addEventListener("mouseup",k),document.addEventListener("touchend",k);function D(L){const q=L.dataset.cat??"",I=parseInt(L.dataset.month??"0"),B=parseInt(L.dataset.vol??"0"),O=parseInt(L.dataset.max??"99999"),R=L.querySelector(".gantt-bar-label");if(!R||R.querySelector("input"))return;const M=document.createElement("input");M.type="number",M.min="0",M.max=String(O),M.step="100",M.value=String(B),M.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",R.textContent="",R.style.pointerEvents="auto",R.appendChild(M),M.focus(),M.select();const j=async()=>{const Y=parseFloat(M.value)||0;if(R.style.pointerEvents="none",R.textContent=P(Math.round(Y))+"L",Math.abs(Y-B)<1)return;const{saveBrewingSchedule:J,fetchBrewingSchedule:W}=await N(async()=>{const{saveBrewingSchedule:H,fetchBrewingSchedule:X}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:H,fetchBrewingSchedule:X}},void 0),Q=a.brewingSchedule.filter(H=>H.brewCategory===q).map(H=>({brewMonth:H.brewMonth,durationMonths:H.durationMonths,plannedVolumeL:H.brewMonth===I?Y:H.plannedVolumeL}));await J(q,a.brewingPlanFY,Q),a.brewingSchedule=await W(a.brewingPlanFY),A()};M.addEventListener("blur",j),M.addEventListener("keydown",Y=>{Y.key==="Enter"&&M.blur()})}s.addEventListener("dblclick",L=>{const q=L.target.closest(".gantt-bar");q&&D(q)}),s.addEventListener("touchstart",L=>{const q=L.target.closest(".gantt-bar");if(q){if(h){clearTimeout(h),h=null,D(q);return}h=setTimeout(()=>{h=null},300)}},{passive:!0}),s.querySelectorAll(".gantt-bar-container").forEach(L=>{L.style.pointerEvents="auto";const q=async I=>{if(m)return;const B=L.dataset.cat??"",O=parseInt(L.dataset.max??"0"),R=L.getBoundingClientRect(),M=I-R.left,j=Math.floor(M/(R.width/p)),Y=i[Math.max(0,Math.min(p-1,j))];if(a.brewingSchedule.some(X=>X.brewCategory===B&&X.brewMonth===Y))return;const J=Math.round(O*.3)||500,{saveBrewingSchedule:W,fetchBrewingSchedule:Q}=await N(async()=>{const{saveBrewingSchedule:X,fetchBrewingSchedule:ee}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:X,fetchBrewingSchedule:ee}},void 0),H=[...a.brewingSchedule.filter(X=>X.brewCategory===B).map(X=>({brewMonth:X.brewMonth,durationMonths:X.durationMonths,plannedVolumeL:X.plannedVolumeL})),{brewMonth:Y,durationMonths:2,plannedVolumeL:J}];await W(B,a.brewingPlanFY,H),a.brewingSchedule=await Q(a.brewingPlanFY),A()};L.addEventListener("click",I=>{I.target.closest(".gantt-bar")||q(I.clientX)})})})();function P(s){return s.toLocaleString("ja-JP")}(()=>{const s=e.querySelector("#bp-gantt");if(!s)return;let i=null;function p(b){const _=b.target,w=_.closest(".bp-gantt-bar");if(!w)return;let k="move";_.classList.contains("bp-gantt-resize-right")?k="resize-right":_.classList.contains("bp-gantt-resize-left")&&(k="resize-left");const D="touches"in b?b.touches[0].clientX:b.clientX;w.style.opacity="0.7",w.style.zIndex="10",i={bar:w,mode:k,stepId:w.dataset.stepId??"",startX:D,origLeft:parseFloat(w.style.left),origWidth:parseFloat(w.style.width)},b.preventDefault()}function m(b){if(!i)return;const w=("touches"in b?b.touches[0].clientX:b.clientX)-i.startX;i.mode==="move"?i.bar.style.left=i.origLeft+w+"px":i.mode==="resize-right"?i.bar.style.width=Math.max(6,i.origWidth+w)+"px":(i.bar.style.left=i.origLeft+w+"px",i.bar.style.width=Math.max(6,i.origWidth-w)+"px")}async function h(){if(!i)return;const{bar:b,stepId:_,origLeft:w,origWidth:k}=i,D=parseFloat(b.style.left),L=parseFloat(b.style.width);b.style.opacity="1",b.style.zIndex="",i=null;const q=Math.round((D-w)/6),I=Math.round((L-k)/6);if(q===0&&I===0)return;const B=b.dataset.plannedStart??"",O=b.dataset.plannedEnd??"";if(!B||!O)return;const R=(V,K)=>{const G=new Date(V);return G.setDate(G.getDate()+K),G.toISOString().slice(0,10)};let M=B,j=O;q!==0&&I===0?(M=R(B,q),j=R(O,q)):I!==0&&q===0?j=R(O,I):(M=R(B,q),j=R(O,q+I));const Y=b.dataset.batchId??"",J=parseInt(b.dataset.stepOrder??"0"),{updateBrewingProcessStep:W,fetchBrewingProcessSteps:Q}=await N(async()=>{const{updateBrewingProcessStep:V,fetchBrewingProcessSteps:K}=await Promise.resolve().then(()=>z);return{updateBrewingProcessStep:V,fetchBrewingProcessSteps:K}},void 0),H=a.brewingProcessSteps.filter(V=>V.batchId===Y).sort((V,K)=>V.stepOrder-K.stepOrder);await W(_,{planned_start:M,planned_end:j});let X=j;for(const V of H){if(V.stepOrder<=J)continue;const K=Math.max(Math.round((new Date(V.plannedEnd).getTime()-new Date(V.plannedStart).getTime())/864e5),0),G=R(X,1),ne=R(G,K);await W(V.id,{planned_start:G,planned_end:ne}),X=ne}let ee=M;for(let V=H.length-1;V>=0;V--){const K=H[V];if(K.stepOrder>=J)continue;const G=Math.max(Math.round((new Date(K.plannedEnd).getTime()-new Date(K.plannedStart).getTime())/864e5),0),ne=R(ee,-1),we=R(ne,-G);await W(K.id,{planned_start:we,planned_end:ne}),ee=we}H.map(V=>(V.stepOrder<J&&Math.round((new Date(V.plannedEnd).getTime()-new Date(V.plannedStart).getTime())/864e5),V));const{updateBrewingBatch:ie}=await N(async()=>{const{updateBrewingBatch:V}=await Promise.resolve().then(()=>z);return{updateBrewingBatch:V}},void 0);await ie(Y,{start_date:H[0].stepOrder<J?R(M,-H.filter(V=>V.stepOrder<J).reduce((V,K)=>V+Math.round((new Date(K.plannedEnd).getTime()-new Date(K.plannedStart).getTime())/864e5)+1,0)):J===1?M:void 0,target_end_date:X}),a.brewingProcessSteps=await Q(a.brewingBatches.map(V=>V.id)),A()}s.addEventListener("mousedown",p),s.addEventListener("touchstart",p,{passive:!1}),document.addEventListener("mousemove",m),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("mouseup",h),document.addEventListener("touchend",h)})(),e.querySelector("[data-action='bp-auto-schedule']")?.addEventListener("click",async()=>{if(a.brewingBatches.length===0)return;const s=e.querySelector("[data-action='bp-auto-schedule']");s&&(s.textContent="計算中...",s.disabled=!0);const{autoScheduleAllBatches:i,fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{autoScheduleAllBatches:_,fetchBrewingBatches:w,fetchBrewingProcessSteps:k}=await Promise.resolve().then(()=>z);return{autoScheduleAllBatches:_,fetchBrewingBatches:w,fetchBrewingProcessSteps:k}},void 0),{fetchTanks:h}=await N(async()=>{const{fetchTanks:_}=await Promise.resolve().then(()=>z);return{fetchTanks:_}},void 0),b=await h().catch(()=>[]);await i(a.brewingBatches,a.bpWorkerSettings,a.bpStepLabor,b),a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(_=>_.id)):[],A()});for(const s of["bp-worker-count","bp-worker-hours","bp-worker-start"])e.querySelector(`[data-action='${s}']`)?.addEventListener("change",async i=>{const p=parseFloat(i.target.value)||0;s==="bp-worker-count"?a.bpWorkerSettings.workerCount=p:s==="bp-worker-hours"?a.bpWorkerSettings.weeklyHoursLimit=p:a.bpWorkerSettings.dayStartHour=p;const{saveWorkerSettings:m}=await N(async()=>{const{saveWorkerSettings:h}=await Promise.resolve().then(()=>z);return{saveWorkerSettings:h}},void 0);await m(a.bpWorkerSettings),A()});e.querySelector("[data-action='bp-worker-deadline']")?.addEventListener("change",async s=>{a.bpWorkerSettings.deadlineDate=s.target.value;const{saveWorkerSettings:i}=await N(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>z);return{saveWorkerSettings:p}},void 0);await i(a.bpWorkerSettings),A()}),e.querySelector("[data-action='bp-worker-sunday']")?.addEventListener("change",async s=>{a.bpWorkerSettings.allowSunday=s.target.checked;const{saveWorkerSettings:i}=await N(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>z);return{saveWorkerSettings:p}},void 0);await i(a.bpWorkerSettings),A()}),e.querySelector("[data-action='bp-tank-add']")?.addEventListener("click",async()=>{const s=e.querySelector("#bp-tank-no")?.value?.trim()??"",i=parseFloat(e.querySelector("#bp-tank-cap")?.value??"0"),p=e.querySelector("#bp-tank-cats")?.value?.trim()??"";if(!s||i<=0)return;const m=p?p.split(/[,、]/).map(_=>_.trim()).filter(Boolean):[],{addTank:h,fetchTanks:b}=await N(async()=>{const{addTank:_,fetchTanks:w}=await Promise.resolve().then(()=>z);return{addTank:_,fetchTanks:w}},void 0);await h(s,i,"",m),a.bpTanks=await b(),A()}),e.querySelectorAll("[data-action='bp-tank-delete']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.tankId??"";if(!i)return;const{deleteTank:p,fetchTanks:m}=await N(async()=>{const{deleteTank:h,fetchTanks:b}=await Promise.resolve().then(()=>z);return{deleteTank:h,fetchTanks:b}},void 0);await p(i),a.bpTanks=await m(),A()})}),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const s=e.querySelectorAll("[data-action='bp-import-check']:checked");if(s.length===0)return;const{createBrewingBatch:i,fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:_}=await Promise.resolve().then(()=>z);return{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:_}},void 0);for(const h of s){const b=h.dataset.cat??"",_=h.dataset.code??"",w=parseFloat(h.dataset.vol??"0"),k=h.dataset.date??"";!b||!_||!k||await i(b,_,a.brewingPlanFY,w,k,a.brewingProcessSteps,a.brewingRiceParams)}a.brewingBatches=await p(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await m(a.brewingBatches.map(h=>h.id))),A()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,A()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const s=e.querySelector("#bp-new-cat")?.value??"",i=e.querySelector("#bp-new-code")?.value?.trim()??"",p=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!s||!i||!m)return;const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:_}=await N(async()=>{const{createBrewingBatch:w,fetchBrewingBatches:k,fetchBrewingProcessSteps:D}=await Promise.resolve().then(()=>z);return{createBrewingBatch:w,fetchBrewingBatches:k,fetchBrewingProcessSteps:D}},void 0);await h(s,i,a.brewingPlanFY,p,m,a.brewingProcessSteps,a.brewingRiceParams),a.brewingBatches=await b(a.brewingPlanFY),a.brewingProcessSteps=await _(a.brewingBatches.map(w=>w.id)),a.bpShowNewForm=!1,A()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===i?"":i,A()})}),e.querySelectorAll("[data-action='bp-step-status']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:b}=await Promise.resolve().then(()=>z);return{updateBrewingProcessStep:b}},void 0),m={status:s.value};s.value==="進行中"&&!s.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),s.value==="完了"&&!s.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await p(i,m);const{fetchBrewingProcessSteps:h}=await N(async()=>{const{fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>z);return{fetchBrewingProcessSteps:b}},void 0);a.brewingProcessSteps=await h(a.brewingBatches.map(b=>b.id)),A()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>z);return{updateBrewingProcessStep:m}},void 0);await p(i,{temperature:parseFloat(s.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>z);return{updateBrewingProcessStep:m}},void 0);await p(i,{notes:s.value})})});let E="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(s=>{s.addEventListener("click",()=>{E=s.dataset.batchId??"";const i=e.querySelector("#bp-delete-modal"),p=e.querySelector("#bp-delete-batch-name");i&&(i.style.display="flex"),p&&(p.textContent=s.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none"),E=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!E)return;const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none");const{supabaseDelete:i}=await N(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>te);return{supabaseDelete:h}},void 0);await i("brewing_process_batches",E);const{fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{fetchBrewingBatches:h,fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>z);return{fetchBrewingBatches:h,fetchBrewingProcessSteps:b}},void 0);a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(h=>h.id)):[],a.bpExpandedBatchId="",E="",A()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",s=>{s.target===s.currentTarget&&(s.currentTarget.style.display="none",E="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:p}=await N(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>z);return{updateBrewingBatch:m}},void 0);await p(i,{planned_volume_l:parseFloat(s.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:p}=await N(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>z);return{updateBrewingBatch:m}},void 0);await p(i,{start_date:s.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:p,fetchBrewingBatches:m,fetchBrewingProcessSteps:h}=await N(async()=>{const{updateBrewingBatch:b,fetchBrewingBatches:_,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>z);return{updateBrewingBatch:b,fetchBrewingBatches:_,fetchBrewingProcessSteps:w}},void 0);await p(i,{status:s.value}),a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await h(a.brewingBatches.map(b=>b.id)):[],A()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${i}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${i}']`),h=parseInt(p?.value??"0"),b=parseFloat(m?.value??"0");if(!i||!h||b<=0)return;const w=[...a.brewingSchedule.filter(L=>L.brewCategory===i).map(L=>({brewMonth:L.brewMonth,durationMonths:L.durationMonths,plannedVolumeL:L.plannedVolumeL})),{brewMonth:h,durationMonths:2,plannedVolumeL:b}],{saveBrewingSchedule:k,fetchBrewingSchedule:D}=await N(async()=>{const{saveBrewingSchedule:L,fetchBrewingSchedule:q}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:L,fetchBrewingSchedule:q}},void 0);await k(i,a.brewingPlanFY,w),a.brewingSchedule=await D(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=parseInt(s.dataset.month??"0");if(!i||!p)return;const m=a.brewingSchedule.filter(_=>_.brewCategory===i&&_.brewMonth!==p).map(_=>({brewMonth:_.brewMonth,durationMonths:_.durationMonths,plannedVolumeL:_.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await N(async()=>{const{saveBrewingSchedule:_,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:_,fetchBrewingSchedule:w}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=parseInt(s.dataset.month??"0");if(!i||!p)return;const m=a.brewingSchedule.filter(_=>_.brewCategory===i&&_.brewMonth!==p).map(_=>({brewMonth:_.brewMonth,durationMonths:_.durationMonths,plannedVolumeL:_.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await N(async()=>{const{saveBrewingSchedule:_,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:_,fetchBrewingSchedule:w}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=parseInt(s.dataset.month??"0"),m=parseFloat(s.value)||0;if(!i||!p)return;const h=a.brewingSchedule.filter(w=>w.brewCategory===i).map(w=>({brewMonth:w.brewMonth,durationMonths:w.durationMonths,plannedVolumeL:w.brewMonth===p?m:w.plannedVolumeL})),{saveBrewingSchedule:b,fetchBrewingSchedule:_}=await N(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:k}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:w,fetchBrewingSchedule:k}},void 0);await b(i,a.brewingPlanFY,h),a.brewingSchedule=await _(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=parseFloat(s.value)||0;if(!i)return;const{saveProcurementDecision:m}=await N(async()=>{const{saveProcurementDecision:h}=await Promise.resolve().then(()=>z);return{saveProcurementDecision:h}},void 0);await m(i,a.brewingPlanFY,p),a.procurementDecisions[i]=p,A()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const s=(e.querySelector("#proc-commit-variety")?.value??"").trim(),i=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),p=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,h=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!s||i<=0)return;const{saveRicePurchaseCommitment:b,fetchRicePurchaseCommitments:_}=await N(async()=>{const{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:k}=await Promise.resolve().then(()=>z);return{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:k}},void 0);await b({varietyName:s,committedBales:i,pricePerKg:p,deliveryMonth:m,supplier:h,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await _(a.brewingPlanFY),A()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-variety-name"),i=e.querySelector("#proc-variety-price"),p=s?.value.trim()??"",m=parseFloat(i?.value??"400")||400;if(!p)return;const{addRiceVariety:h,fetchRiceVarieties:b}=await N(async()=>{const{addRiceVariety:w,fetchRiceVarieties:k}=await Promise.resolve().then(()=>z);return{addRiceVariety:w,fetchRiceVarieties:k}},void 0);await h(p,m)&&(a.riceVarieties=await b(),s&&(s.value=""),i&&(i.value=""),F(`「${p}」を追加しました`)),A()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",{deleteRiceVariety:p,fetchRiceVarieties:m}=await N(async()=>{const{deleteRiceVariety:b,fetchRiceVarieties:_}=await Promise.resolve().then(()=>z);return{deleteRiceVariety:b,fetchRiceVarieties:_}},void 0);await p(i)&&(a.riceVarieties=await m()),A()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=s.dataset.field??"",m=s.value;if(!i||!p)return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[p]=m;const b=a.riceVarieties.find(w=>w.name===m);b&&(p==="kojiVariety"&&(h.kojiPricePerKg=b.defaultPricePerKg),p==="kakeVariety"&&(h.kakePricePerKg=b.defaultPricePerKg)),a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:_}=await N(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>z);return{saveBrewingRiceParams:w}},void 0);await _(i,h),A()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-new-cat-name"),i=e.querySelector("#proc-new-cat-vol"),p=s?.value.trim()??"",m=parseFloat(i?.value??"0");if(!p){F("区分名を入力してください","warning");return}if(m<=0){F("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await N(async()=>{const{saveBrewingSchedule:_,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>z);return{saveBrewingSchedule:_,fetchBrewingSchedule:w}},void 0);await h(p,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await b(a.brewingPlanFY),s&&(s.value=""),i&&(i.value=""),F(`「${p}」を追加しました`),A()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const s=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),i=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(s)||isNaN(i))return;const{saveBrewingRiceParams:p}=await N(async()=>{const{saveBrewingRiceParams:b}=await Promise.resolve().then(()=>z);return{saveBrewingRiceParams:b}},void 0),m=Object.keys(a.brewingRiceParams),h=new Set([...m,...a.brewingYearlyShipments.map(b=>b.brewCategory)]);for(const b of h){const _=a.brewingRiceParams[b]??{brewCategory:b,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};_.ricePerLiterKg=s,_.kojiRatio=i,a.brewingRiceParams[b]=_,await p(b,_)}A()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=s.dataset.field??"",m=parseFloat(s.value);if(!i||!p||isNaN(m))return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[p]=m,a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:b}=await N(async()=>{const{saveBrewingRiceParams:_}=await Promise.resolve().then(()=>z);return{saveBrewingRiceParams:_}},void 0);await b(i,h),A()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=parseFloat(s.value);if(!i)return;const{saveBrewingForecastOverride:m}=await N(async()=>{const{saveBrewingForecastOverride:h}=await Promise.resolve().then(()=>z);return{saveBrewingForecastOverride:h}},void 0);if(isNaN(p))await m(i,null),delete a.brewingForecastOverrides[i];else{const h=p/100;await m(i,h),a.brewingForecastOverrides[i]=h}A()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p="bc-"+encodeURIComponent(i).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${p}`),h=e.querySelector(`#alc-target-${p}`),b=parseFloat(m?.value??"18")||18,_=parseFloat(h?.value??"15")||15,{saveBrewingAlcoholSetting:w}=await N(async()=>{const{saveBrewingAlcoholSetting:D}=await Promise.resolve().then(()=>z);return{saveBrewingAlcoholSetting:D}},void 0);await w(i,b,_)&&(a.brewingAlcoholSettings[i]={brewCategory:i,rawAlcoholPct:b,targetAlcoholPct:_}),A()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",p=s.value,m=s.dataset.current??"";if(p===m)return;const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:_,fetchBrewingCategoryOverrides:w}=await N(async()=>{const{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:L,fetchBrewingProductDetail:q,fetchBrewingCategoryOverrides:I}=await Promise.resolve().then(()=>z);return{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:L,fetchBrewingProductDetail:q,fetchBrewingCategoryOverrides:I}},void 0);if(await h(i,p)){const D=a.brewingPlanFY,[L,q,I]=await Promise.all([b(`${D}-10-01`,`${D+1}-09-30`),_(`${D}-10-01`,`${D+1}-09-30`),w()]);a.brewingPlanData=L,a.brewingProductDetail=q,a.brewingOverrides=I}A()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=s.value;if(!i||!p)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:_,fetchCategoryTypeLinks:w}=await N(async()=>{const{linkTypeToCategory:B,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:M,fetchCategoryTypeLinks:j}=await Promise.resolve().then(()=>z);return{linkTypeToCategory:B,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:M,fetchCategoryTypeLinks:j}},void 0);await m(i,p);const k=a.brewingPlanFY,[D,L,q,I]=await Promise.all([h(`${k}-10-01`,`${k+1}-09-30`),b(`${k}-10-01`,`${k+1}-09-30`),_(),w()]);a.brewingPlanData=D,a.brewingProductDetail=L,a.brewingOverrides=q,a.brewingTypeLinks=I,A()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=s.dataset.type??"";if(!i||!p)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:_,fetchCategoryTypeLinks:w}=await N(async()=>{const{unlinkTypeFromCategory:B,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:M,fetchCategoryTypeLinks:j}=await Promise.resolve().then(()=>z);return{unlinkTypeFromCategory:B,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:M,fetchCategoryTypeLinks:j}},void 0);await m(i,p);const k=a.brewingPlanFY,[D,L,q,I]=await Promise.all([h(`${k}-10-01`,`${k+1}-09-30`),b(`${k}-10-01`,`${k+1}-09-30`),_(),w()]);a.brewingPlanData=D,a.brewingProductDetail=L,a.brewingOverrides=q,a.brewingTypeLinks=I,A()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const s=e.querySelector("#brew-new-category-name"),i=e.querySelector("#brew-new-category-parent"),p=s?.value.trim()??"",m=i?.value??"";if(!p)return;if(!m){F("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map(w=>w.name)].includes(p)){F("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:b}=await N(async()=>{const{addBrewingCustomCategory:w}=await Promise.resolve().then(()=>z);return{addBrewingCustomCategory:w}},void 0);await b(p,m)?(a.brewingCustomCategories.push({name:p,parentCategory:m}),s&&(s.value=""),F(`「${p}」を追加しました（${m}系）`)):F("追加に失敗しました","error"),A()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"";if(!i)return;const{deleteBrewingCustomCategory:p,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h}=await N(async()=>{const{deleteBrewingCustomCategory:_,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:k}=await Promise.resolve().then(()=>z);return{deleteBrewingCustomCategory:_,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:k}},void 0);if(await p(i)){a.brewingCustomCategories=a.brewingCustomCategories.filter(D=>D.name!==i);for(const[D,L]of Object.entries(a.brewingOverrides))L===i&&delete a.brewingOverrides[D];const _=a.brewingPlanFY,[w,k]=await Promise.all([m(`${_}-10-01`,`${_+1}-09-30`),h(`${_}-10-01`,`${_+1}-09-30`)]);a.brewingPlanData=w,a.brewingProductDetail=k,F(`「${i}」を削除しました`)}A()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=s.dataset.catId??"",h=e.querySelector(`#new-entry-target-${p}`)?.value??i,b=e.querySelector(`#new-entry-label-${p}`),_=e.querySelector(`#new-entry-vol-${p}`),w=b?.value.trim()??"",k=parseFloat(_?.value??"0");if(k<=0)return;const{addBrewingStockEntry:D,fetchBrewingPlanSummary:L,fetchAllBrewingStockEntries:q}=await N(async()=>{const{addBrewingStockEntry:B,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:R}=await Promise.resolve().then(()=>z);return{addBrewingStockEntry:B,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:R}},void 0);if(await D(h,w||`タンク${a.brewingStockEntries.filter(B=>B.brewCategory===h).length+1}`,k)){const B=a.brewingPlanFY,[O,R]=await Promise.all([L(`${B}-10-01`,`${B+1}-09-30`),q()]);a.brewingPlanData=O,a.brewingStockEntries=R}A(),requestAnimationFrame(()=>{const B=document.getElementById(`stock-display-${p}`),O=document.getElementById(`stock-edit-${p}`),R=document.querySelector(`.btn-edit-stock[data-cat-id="${p}"]`);B&&(B.style.display="none"),O&&(O.style.display=""),R&&(R.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.id??"",p=s.value;if(!i||!p)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:h,fetchAllBrewingStockEntries:b}=await N(async()=>{const{reassignBrewingStockEntry:w,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:D}=await Promise.resolve().then(()=>z);return{reassignBrewingStockEntry:w,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:D}},void 0);if(await m(i,p)){const w=a.brewingPlanFY,[k,D]=await Promise.all([h(`${w}-10-01`,`${w+1}-09-30`),b()]);a.brewingPlanData=k,a.brewingStockEntries=D}A(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach(w=>{const k=document.getElementById(`stock-display-${w.dataset.catId}`),D=document.getElementById(`stock-edit-${w.dataset.catId}`);D&&D.querySelector(`[data-id="${i}"]`)&&(k&&(k.style.display="none"),D.style.display="",w.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=s.dataset.cat??"",m="bc-"+encodeURIComponent(p).replace(/%/g,"-"),{deleteBrewingStockEntry:h,fetchBrewingPlanSummary:b,fetchAllBrewingStockEntries:_}=await N(async()=>{const{deleteBrewingStockEntry:k,fetchBrewingPlanSummary:D,fetchAllBrewingStockEntries:L}=await Promise.resolve().then(()=>z);return{deleteBrewingStockEntry:k,fetchBrewingPlanSummary:D,fetchAllBrewingStockEntries:L}},void 0);if(await h(i)){const k=a.brewingPlanFY,[D,L]=await Promise.all([b(`${k}-10-01`,`${k+1}-09-30`),_()]);a.brewingPlanData=D,a.brewingStockEntries=L}A(),requestAnimationFrame(()=>{const k=document.getElementById(`stock-display-${m}`),D=document.getElementById(`stock-edit-${m}`),L=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);k&&(k.style.display="none"),D&&(D.style.display=""),L&&(L.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",p=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`);p&&(p.style.display="none"),m&&(m.style.display=""),s.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",p=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`),h=e.querySelector(`.btn-edit-stock[data-cat-id="${i}"]`);p&&(p.style.display=""),m&&(m.style.display="none"),h&&(h.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",p=e.querySelector(`#schedule-rows-${i}`);if(!p)return;const m=p.querySelectorAll(".schedule-edit-row").length,h=document.createElement("div");h.innerHTML=buildScheduleEditRowHTML(i,m,9,2,0,"");const b=h.firstElementChild;p.appendChild(b),b.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>b.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(s=>{s.addEventListener("click",()=>s.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=s.dataset.catId??"",m=e.querySelector(`#stock-input-${p}`),h=parseFloat(m?.value??"");if(isNaN(h)||h<0){alert("有効な数値を入力してください");return}s.textContent="保存中...",s.setAttribute("disabled","true");try{const{upsertBrewingStock:b,fetchBrewingPlanSummary:_,fetchBrewingMonthlyTrend:w}=await N(async()=>{const{upsertBrewingStock:q,fetchBrewingPlanSummary:I,fetchBrewingMonthlyTrend:B}=await Promise.resolve().then(()=>z);return{upsertBrewingStock:q,fetchBrewingPlanSummary:I,fetchBrewingMonthlyTrend:B}},void 0),k=a.brewingPlanFY;await b(i,h,0);const[D,L]=await Promise.all([_(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`)]);a.brewingPlanData=D,a.brewingMonthlyTrend=L,A()}catch(b){console.error("[brewing save]",b),alert(`保存エラー: ${String(b)}`),s.textContent="保存",s.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.toggleCat??"",p=`sub-row-${"bc-"+encodeURIComponent(i).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${p}`),h=s.querySelector(".toggle-icon"),b=m[0]?.style.display!=="none";m.forEach(_=>{_.style.display=b?"none":""}),h&&(h.innerHTML=b?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{F("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{F("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(s=>{s.addEventListener("click",()=>{F("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{F("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(s=>{s.addEventListener("click",async()=>{await Ae("この買掛を入金済みにしますか？")&&F("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(s=>{s.addEventListener("click",()=>{F("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{F("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.closest("tr")?.querySelector("td")?.textContent??"";F(`タンク ${i} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{F("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.closest("tr")?.querySelector("td")?.textContent??"";F(`注文 ${i} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{F("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(s=>{s.addEventListener("click",()=>{F("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{F("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.customer??"";F(`得意先 ${i} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{F("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!s||!await Ae("このリストを削除しますか？"))return;const{supabaseDelete:p}=await N(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>te);return{supabaseDelete:h}},void 0);if(await p("lead_lists",s)){const{fetchLeadLists:h}=await N(async()=>{const{fetchLeadLists:b}=await Promise.resolve().then(()=>z);return{fetchLeadLists:b}},void 0);a.leadLists=await h(),F("削除しました","success"),A()}else F("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{F("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.scYm;if(!i)return;a.shipmentCalendarYearMonth=i,a.shipmentCalendarData=null,a.shipmentCalendarPrevYearData=null,a.shipmentCalendarSelectedDate=null,A();const{fetchShipmentCalendar:p}=await N(async()=>{const{fetchShipmentCalendar:k}=await Promise.resolve().then(()=>z);return{fetchShipmentCalendar:k}},void 0),[m,h]=i.split("-").map(Number),b=`${m-1}-${String(h).padStart(2,"0")}`,[_,w]=await Promise.all([p(i),p(b)]);a.shipmentCalendarData=_,a.shipmentCalendarPrevYearData=w,A()})}),e.querySelectorAll("[data-sc-date]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.scDate;i!==void 0&&(a.shipmentCalendarSelectedDate=i?a.shipmentCalendarSelectedDate===i?null:i:null,A())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(s=>{s.addEventListener("click",async()=>{a.calendarYearMonth=s.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:i}=await N(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>z);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await i(a.calendarYearMonth),A()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async s=>{a.calendarYearMonth=s.target.value;const{fetchCalendarEvents:i}=await N(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>z);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await i(a.calendarYearMonth),A()}),e.querySelector("#cal-filter-category")?.addEventListener("change",s=>{a.calendarFilterCategory=s.target.value,A()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const s=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(s.getTime()+3600*1e3).toISOString(),isAllDay:!1}},A()}),e.querySelectorAll("[data-cal-date]").forEach(s=>{s.tagName!=="BUTTON"&&s.addEventListener("click",i=>{if(i.target.closest(".cal-event"))return;const p=s.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${p}T10:00:00`,isAllDay:!1}},A()})}),e.querySelectorAll("[data-cal-event-id]").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const p=s.dataset.calEventId,m=a.calendarEvents.find(h=>h.id===p);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},A())})}),e.querySelectorAll("[data-action='cal-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.calendarEdit=null,A())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:s,fetchCalendarEvents:i,CALENDAR_CATEGORY_COLORS:p}=await N(async()=>{const{saveCalendarEvent:w,fetchCalendarEvents:k,CALENDAR_CATEGORY_COLORS:D}=await Promise.resolve().then(()=>z);return{saveCalendarEvent:w,fetchCalendarEvents:k,CALENDAR_CATEGORY_COLORS:D}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,h=e.querySelector("#cal-category")?.value??"general",b={id:m,title:e.querySelector("#cal-title")?.value??"",category:h,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:p[h]};if(!b.title){F("タイトルは必須です","warning");return}await s(b)?(a.calendarEvents=await i(a.calendarYearMonth),a.calendarEdit=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!s||!await Ae("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:i,fetchCalendarEvents:p}=await N(async()=>{const{deleteCalendarEvent:h,fetchCalendarEvents:b}=await Promise.resolve().then(()=>z);return{deleteCalendarEvent:h,fetchCalendarEvents:b}},void 0);await i(s)?(a.calendarEvents=await p(a.calendarYearMonth),a.calendarEdit=null,F("削除しました"),A()):F("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,A();try{const s=a.importPreview.rows.filter(p=>p._valid),i=await Uo(a.importEntity,s);a.importResult=`取り込み完了: ${i.inserted}件成功 / ${i.failed}件失敗`,a.importPreview=null}catch(s){a.importResult=`エラー: ${s instanceof Error?s.message:String(s)}`}finally{a.importing=!1,A()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const s=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=s,a.storeSales=[],a.actionLoading=!0,A(),yn(s).then(i=>{a.storeSales=i,a.actionLoading=!1,A()})}),e.querySelectorAll("[data-action='copy-config']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.configValue??"";if(i)try{await navigator.clipboard.writeText(i),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(p){console.warn("Clipboard copy failed",p)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const i=JSON.stringify({supabase_url:fe,supabase_anon_key:se,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),p=new Blob([i],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(p),h=document.createElement("a");h.href=m,h.download="relay_config.json",h.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.code??"";if(i)try{await navigator.clipboard.writeText(decodeURIComponent(i)),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(p){console.warn("Clipboard code copy failed",p)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(s=>{s.addEventListener("change",()=>{Xe(e),a.emailSaveMessage=null,A()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(s=>{s.addEventListener("change",()=>{Xe(e),a.emailSaveMessage=null,A()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{Xe(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{Xe(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(s=>{s.addEventListener("click",()=>{a.emailTemplateId=s.dataset.templateId??"custom";const i=Zo(a.emailTemplateId);a.emailSubject=i.subject,a.emailBody=i.body,a.emailSaveMessage=null,A()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{Xe(e);const s=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${s}`),a.emailSaveMessage=null,A()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{Xe(e),a.actionLoading=!0,A(),ea(Ma("draft")).then(s=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(s.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,A()})}),e.querySelector("#email-sender")?.addEventListener("change",s=>{a.emailSenderId=s.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{Xe(e),a.actionLoading=!0,a.emailSending=!0,A();const s=Ma("sent");a.mailSenders.find(i=>i.id===a.emailSenderId),so().then(async i=>{await ea({...s,recipientCount:i.sent}),a.emailSaveMessage=`${i.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,A(),F(`${i.sent}件送信完了`)}).catch(async()=>{await ea(Ma("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,A(),F("APIキー未設定のため下書き保存しました","warning")})}),e.querySelectorAll(".feature-checkbox").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.featureId;if(!i)return;const p=a.myProfile?.name??a.myProfile?.email??"不明";s.checked?await fo(i,p):await go(i),a.featureStatuses=await da(),A()})}),e.querySelectorAll("[data-workforce-tab]").forEach(s=>{s.addEventListener("click",()=>{a.workforceTab=s.dataset.workforceTab,A()})}),e.querySelectorAll("[data-staff-dept-filter]").forEach(s=>{s.addEventListener("click",()=>{a.staffDeptFilter=s.dataset.staffDeptFilter??"",A()})}),e.querySelector("#cost-year-month")?.addEventListener("change",s=>{a.workforceYearMonth=s.target.value,A()}),e.querySelector("#shift-year-month")?.addEventListener("change",s=>{a.workforceYearMonth=s.target.value,a.workforceMetrics=null,a.dailyShiftPlans=[],tt(a.currentPath)}),e.querySelector("[data-action='shift-auto-generate']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='shift-auto-generate']");s&&(s.disabled=!0,s.textContent="生成中…");try{const i=Pu(a.workforceYearMonth,a.staffMembers,a.brewingSchedule,0,a.workforceMetrics);await $o(a.workforceYearMonth,i)?(a.dailyShiftPlans=i,F("シフトを自動生成しました","success"),A()):F("保存に失敗しました","error")}finally{s&&(s.disabled=!1)}}),e.querySelector("[data-action='staff-new']")?.addEventListener("click",()=>{const s=document.createElement("div");s.innerHTML=ds(),document.body.appendChild(s.firstElementChild),_s(null)}),e.querySelectorAll("[data-edit-staff]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.editStaff??"",p=a.staffMembers.find(h=>h.id===i);if(!p)return;const m=document.createElement("div");m.innerHTML=ds(p),document.body.appendChild(m.firstElementChild),_s(p)})}),e.querySelectorAll("[data-delete-staff]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.deleteStaff??"",p=s.dataset.staffName??"";if(!confirm(`${p} を削除しますか？`))return;await bo(i)?(a.staffMembers=a.staffMembers.filter(h=>h.id!==i),F("削除しました","success"),A()):F("削除に失敗しました","error")})}),e.querySelector("[data-action='shift-auto-generate']")?.addEventListener("click",()=>{F("醸造計画に基づく人員配置を反映しました","success"),A()})}function A(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=Tm()}catch(o){console.error("[renderApp] render error:",o),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(o)}

${o?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",Nm(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Ln()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const o of["fd-scaler","print-scaler","q-preview-scaler"]){const r=e.querySelector(`#${o}`),l=r?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=l?.querySelector(".print-page")??l;if(!r||!c)continue;const d=r.parentElement?.clientWidth??0,u=c.offsetWidth;if(d>0&&u>0&&u>d-24){const y=(d-24)/u;r.style.transform=`scale(${y})`,r.style.transformOrigin="top left",r.style.height=`${(c.offsetHeight+48)*y}px`}else r.style.transform="",r.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":""}const rr="sake-cloud-cache",Rm=300*1e3;function Om(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(rr,JSON.stringify(e))}catch{}}function Bm(){try{const e=localStorage.getItem(rr);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Rm?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let ir=0;async function yt(){const e=Bm();e&&(a.loading=!1,A()),a.loading=!e,e||A();try{const[t,n,o,r,l,c,d]=await Promise.all([Cs(),Ds(),sn(),qs(),Tt(a.invoiceFilter),rn(),Ls("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=o,a.pipelineMeta=r,a.invoiceRecords=l,a.salesAnalytics=c,d){const u={...aa,...Va(),...d};a.quoteCompanySettings=u,et(u)}if(mt.length===0&&hm(),!a.salesFilter.startDate||!a.salesFilter.endDate){const y=[...t.salesRecords].sort((x,S)=>new Date(S.date).getTime()-new Date(x.date).getTime())[0]?.date??new Date().toISOString(),g=new Date(y),f=new Date(g);f.setDate(g.getDate()-30),a.salesFilter={startDate:xs(f.toISOString()),endDate:xs(g.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await Tt(a.invoiceFilter)),a.error=null,Om()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,A(),Mt(a.route),ir=Date.now()}}window.addEventListener("popstate",()=>{a.route=er(location.pathname),a.currentCategory=ba(a.route),a.sidebarOpen=!1,It(),Mt(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,A();return}if(e.key==="Escape"){if(a.globalSearchOpen){It(),A();return}if(a.pickerMode){ma(),A();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(tr(),A());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&nr(t)}});a.user=ya()?hr():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await N(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>z);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),A()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,o=0,r=0,l=0,c=1;document.addEventListener("mousedown",d=>{const u=d.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;d.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const g=y.getBoundingClientRect();if(g.width===0)return;c=228.6/g.width,t=u,n=d.clientX,o=d.clientY,r=parseFloat(u.style.left)||0,l=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach($=>$.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const f=document.querySelector("#fd-selected-info");f&&(f.textContent=`選択中: ${u.title}`);const x=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");x&&(x.value=String(r)),S&&(S.value=String(l))}),document.addEventListener("mousemove",d=>{if(!t)return;const u=(d.clientX-n)*c,y=(d.clientY-o)*c,g=Math.round((r+u)*2)/2,f=Math.round((l+y)*2)/2;t.style.left=g+"mm",t.style.top=f+"mm";const x=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");x&&(x.value=String(g)),S&&(S.value=String(f))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",d=>{if(!a.fdDesignMode||!a.fdActiveFieldId||d.key!=="ArrowLeft"&&d.key!=="ArrowRight"&&d.key!=="ArrowUp"&&d.key!=="ArrowDown"||d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;d.preventDefault();const y=.5;let g=parseFloat(u.style.left)||0,f=parseFloat(u.style.top)||0;d.key==="ArrowLeft"?g-=y:d.key==="ArrowRight"?g+=y:d.key==="ArrowUp"?f-=y:d.key==="ArrowDown"&&(f+=y),u.style.left=g+"mm",u.style.top=f+"mm";const x=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");x&&(x.value=String(g)),S&&(S.value=String(f))})})();let Ra=null,Xt=[],Ss=null;function jm(e){const t=window.google?.maps;if(!t){console.warn("Google Maps not loaded");return}const n=e.querySelector("#customer-map"),o=e.querySelector("#map-data");if(!n||!o)return;const r=JSON.parse(decodeURIComponent(o.dataset.customers??"[]")),l=JSON.parse(decodeURIComponent(o.dataset.deliveries??"[]"));Ra||(Ra=new t.Map(n,{center:{lat:35.38,lng:139.25},zoom:10,gestureHandling:"greedy",streetViewControl:!1,mapTypeControl:!1}),Ss=new t.InfoWindow);const c=Ra,d=Ss;function u(x){return x.isAtRisk?"#e53e3e":x.isDormant?"#dd6b20":x.amount12m>0?"#2563eb":"#aaa"}function y(x,S=32){const $=`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${x}" stroke="white" stroke-width="2.5"/></svg>`;return{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent($),scaledSize:new t.Size(S,S),anchor:new t.Point(S/2,S/2)}}function g(){Xt.forEach(x=>x.setMap(null)),Xt=[]}function f(x,S,$){g();const C=new t.LatLngBounds;let P=!1;r.filter(s=>!(x==="at-risk"&&!s.isAtRisk||x==="dormant"&&(s.isAtRisk||!s.isDormant)||x==="active"&&(s.isAtRisk||s.isDormant||s.amount12m===0)||x==="inactive"&&(s.isAtRisk||s.isDormant||s.amount12m>0)||S&&s.areaCode!==S||$&&(s.businessTypeName||s.businessType)!==$)).forEach(s=>{if(!s.lat||!s.lng)return;const i={lat:s.lat,lng:s.lng};C.extend(i),P=!0;const p=new t.Marker({map:c,position:i,icon:y(u(s),28),title:s.name});p.addListener("click",()=>{d.setContent(`<div style="font-size:13px;max-width:260px;">
          <strong>${s.name}</strong><br>${s.address1??""}<br>
          エリア: ${s.areaCode??"―"} / ${s.businessTypeName??s.businessType??"―"}<br>
          12ヶ月売上: <strong>${s.amount12m?.toLocaleString()??0}円</strong></div>`),d.open(c,p)}),Xt.push(p)}),l.forEach(s=>{if(!s.lat||!s.lng)return;const i={lat:s.lat,lng:s.lng};C.extend(i),P=!0;const p=new t.Marker({map:c,position:i,icon:y("#FF9800",22),title:s.name});p.addListener("click",()=>{d.setContent(`<div style="font-size:13px;"><strong>${s.name}</strong><br>${s.address??""}${s.phone?`<br>${s.phone}`:""}</div>`),d.open(c,p)}),Xt.push(p)}),P&&c.fitBounds(C,{top:40,bottom:40,left:40,right:40})}f(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz),e.querySelectorAll("[data-map-status]").forEach(x=>{x.addEventListener("click",()=>{const S=x.dataset.mapStatus;a.mapFilters={...a.mapFilters,filterStatus:S},e.querySelectorAll("[data-map-status]").forEach($=>{$.className=$.className.replace(/\b(primary|secondary)\b/g,$===x?"primary":"secondary")}),f(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)})}),e.querySelector("#map-filter-area")?.addEventListener("change",x=>{a.mapFilters={...a.mapFilters,filterArea:x.target.value},f(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#map-filter-biz")?.addEventListener("change",x=>{a.mapFilters={...a.mapFilters,filterBiz:x.target.value},f(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#btn-geocode")?.addEventListener("click",async()=>{const x=e.querySelector("#btn-geocode"),S=e.querySelector("#geocode-progress"),$=e.querySelector("#geocode-status"),C=e.querySelector("#geocode-bar");x&&(x.disabled=!0),S&&(S.style.display="block");try{const{batchGeocode:P}=await N(async()=>{const{batchGeocode:s}=await Promise.resolve().then(()=>z);return{batchGeocode:s}},void 0),E=await P((s,i,p)=>{$&&($.textContent=`${s}/${i} — ${p}`),C&&(C.style.width=`${Math.round(s/Math.max(i,1)*100)}%`)});$&&($.textContent=`完了: ${E.success}件成功 / ${E.failed}件失敗`),C&&(C.style.width="100%"),setTimeout(()=>{window.location.reload()},3e3)}catch(P){$&&($.textContent="エラーが発生しました: "+String(P))}})}yt();const zm=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&yt()},zm);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-ir>60*1e3&&yt()});let Za="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Za=e}).catch(()=>{});setInterval(async()=>{if(!(!Za||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Za&&!a.updateAvailable&&(a.updateAvailable=!0,A())}catch{}},120*1e3);export{N as _};
