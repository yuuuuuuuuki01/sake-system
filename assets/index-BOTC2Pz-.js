(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const li="modulepreload",ci=function(e){return"/"+e},gs={},N=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let u=function(h){return Promise.all(h.map(g=>Promise.resolve(g).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");r=u(n.map(h=>{if(h=ci(h),h in gs)return;gs[h]=!0;const g=h.endsWith(".css"),y=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${y}`))return;const $=document.createElement("link");if($.rel=g?"stylesheet":li,g||($.as="script"),$.crossOrigin="",$.href=h,d&&$.setAttribute("nonce",d),document.head.appendChild($),g)return new Promise((S,_)=>{$.addEventListener("load",S),$.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return r.then(c=>{for(const d of c||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})},$e="https://ridspyczkxwkcbmwndhm.supabase.co",di="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",ie=di;async function Ae(e,t){try{const n=new URL(`/rest/v1/${e}`,$e),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function vt(e,t){try{const n=new URL(`/rest/v1/${e}`,$e),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function Ye(e,t,n){try{const o=new URL(`/rest/v1/${e}?id=eq.${t}`,$e);return(await fetch(o.toString(),{method:"PATCH",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function be(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,$e),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function On(e){try{const t=new URL(`/rest/v1/${e}`,$e);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const o=n.headers.get("Content-Range");if(o){const r=o.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function Y(e,t={}){try{const n=new URL(`/rest/v1/${e}`,$e);Object.entries(t).forEach(([r,i])=>{n.searchParams.set(r,i)});const o=await fetch(n.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"return=representation"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function Bn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,$e);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})).ok}catch{return!1}}async function ve(e,t={},n=1e3){const o=[];let r=0;try{for(;;){const i=new URL(`/rest/v1/${e}`,$e);Object.entries(t).forEach(([u,h])=>{i.searchParams.set(u,h)}),i.searchParams.set("limit",String(n)),i.searchParams.set("offset",String(r));const c=await fetch(i.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const d=await c.json();if(o.push(...d),d.length<n)break;r+=n}return o}catch(i){return console.warn(`Failed to query all rows from Supabase table ${e}`,i),o.length>0?o:[]}}const te=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ie,SUPABASE_URL:$e,supabaseCount:On,supabaseDelete:Bn,supabaseInsert:Ae,supabaseQuery:Y,supabaseQueryAll:ve,supabaseRpc:be,supabaseUpdate:Ye,supabaseUpsert:vt},Symbol.toStringTag,{value:"Module"})),zn="sake_auth";function vo(e){localStorage.setItem(zn,JSON.stringify(e))}function bo(){return{apikey:ie,"Content-Type":"application/json"}}function pi(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),o=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(o))}catch{return null}}async function xo(e,t){const n=await fetch(`${$e}/auth/v1/${e}`,{method:"POST",headers:bo(),body:JSON.stringify(t)}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.error_description??o.msg??`HTTP ${n.status}`);return o}async function ui(e,t){const n=await xo("token?grant_type=password",{email:e,password:t});return vo({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function vs(e,t){const n=await xo("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&vo({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function mi(){const e=Fa();if(localStorage.removeItem(zn),!!e?.access_token)try{await fetch(`${$e}/auth/v1/logout`,{method:"POST",headers:{...bo(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Fa(){const e=localStorage.getItem(zn);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function wo(){const e=Fa();if(!e)return null;const t=pi(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function yi(e){const t=Fa();if(!t)throw new Error("not signed in");const n=await fetch(`${$e}/auth/v1/user`,{method:"PUT",headers:{apikey:ie,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.msg??`HTTP ${n.status}`)}}const jn={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},$o={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},hi={generatedAt:new Date().toISOString(),records:[]},lt={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},fi={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},gi={},vi={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function pe(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function bi(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function xi(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function v(e,t,n=""){for(const o of t){const r=e[o];if(typeof r=="string"&&r.length>0)return r}return n}function T(e,t,n=0){for(const o of t)if(o in e)return pe(e[o]);return n}function _e(e,t,n=!0){for(const o of t)if(o in e)return xi(e[o]);return n}function Se(e,t,n){for(const o of t){const r=e[o];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const i=new Date(r);if(!Number.isNaN(i.getTime()))return i.toISOString()}return n}function wi(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:Se(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:pe(e.total_amount??e.billed_amount)}}function bs(e){const t=e.trim().toUpperCase(),n=gi[t];if(n)return n;const o=$o.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:o?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function _o(e){try{return(await Y("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function Pt(e,t){await vt("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function So(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await Y("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),o=new Map;for(const i of n){const c=String(i.sales_date??"");if(!c)continue;const d=o.get(c)??{amount:0,qty:0,docs:0};d.amount+=pe(i.sales_amount),d.qty+=pe(i.total_quantity),d.docs+=pe(i.document_count),o.set(c,d)}const r=Array.from(o.entries()).map(([i,c])=>({sales_date:i,sales_amount:c.amount,amount:c.amount,document_count:c.docs,bottles:c.qty,volume_ml:0,price_per_bottle:c.qty>0?Math.round(c.amount/c.qty):0,price_per_liter:0})).sort((i,c)=>c.sales_date.localeCompare(i.sales_date));if(r.length>0){const i=new Date().toISOString().slice(0,7);Lo(i).catch(()=>{});const[c,d]=await Promise.all([Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),Y("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),h=new Date().toISOString().slice(0,10),g=h.slice(0,7),y=[...r].sort((E,s)=>E.sales_date.localeCompare(s.sales_date)).map(E=>({date:new Date(`${E.sales_date}T00:00:00Z`).toISOString(),amount:pe(E.amount??E.sales_amount),bottles:pe(E.bottles),volumeMl:pe(E.volume_ml),pricePerBottle:pe(E.price_per_bottle),pricePerLiter:pe(E.price_per_liter)})),$=y.slice(-30),S=E=>pe(E.amount??E.sales_amount),_=r.reduce((E,s)=>s.sales_date===h?E+S(s):E,0),L=r.reduce((E,s)=>s.sales_date.startsWith(g)?E+S(s):E,0),k=c.filter(E=>pe(E.balance_amount)>0),C=d.map((E,s)=>({id:String(E.id??`sale-${s+1}`),documentNo:E.document_no??E.legacy_document_no??"",date:E.sales_date??"",customerCode:E.legacy_customer_code??"",customerName:E.customer_name??E.legacy_customer_code??"",amount:pe(E.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:_,todayDelta:0,monthSales:L,monthDelta:0,unpaidCount:k.length,unpaidAmount:k.reduce((E,s)=>E+pe(s.balance_amount),0)},dailySales:$,allDailySales:y,salesRecords:C}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),$o}async function ko(){const e=await Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const o=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${o}-${n+1}`,customerCode:o,customerName:o,billedAmount:pe(t.billed_amount),paymentAmount:pe(t.paid_amount),balanceAmount:pe(t.balance_amount),lastPaymentDate:null,status:bi(t.payment_status)}})}:hi}async function Fn(){const[e,t]=await Promise.all([Y("customers",{limit:"1000"}),Y("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((r,i)=>{const c=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:v(r,["id","customer_id","code"],`customer-${i+1}`),code:v(r,["code","customer_code","legacy_customer_code"],`C${String(i+1).padStart(4,"0")}`),name:v(r,["name","customer_name","display_name"],`Customer ${i+1}`),kanaName:v(r,["kana_name"],""),shortName:v(r,["short_name"],""),postalCode:v(r,["postal_code"],""),address1:v(r,["address1"],""),address2:v(r,["address2"],""),phone:v(r,["phone"],""),fax:v(r,["fax"],""),email:v(r,["email"],""),staffCode:v(r,["staff_code"],""),businessType:v(r,["business_type"],""),areaCode:v(r,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:T(r,["closing_day","close_day"],31),paymentDay:T(r,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:v(r,["payment_cycle"],""),billingCycleType:v(r,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:T(r,["credit_limit"],0),taxMode:v(r,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:v(r,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),tradeType:(()=>{const d=v(r,["trade_type"],"");if(d)return d;const u=String(c.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:v(r,["bank_name"],""),bankBranch:v(r,["bank_branch"],""),bankAccount:v(r,["bank_account"],""),isActive:_e(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):lt.customers,o=t.length?t.map((r,i)=>({id:v(r,["id","product_id","product_code","legacy_product_code"],`product-${i+1}`),code:v(r,["product_code","legacy_product_code","code"],`P${String(i+1).padStart(5,"0")}`),janCode:v(r,["jan_code","jan","barcode"],""),name:v(r,["name","product_name","display_name"],`Product ${i+1}`),kanaName:v(r,["kana_name"],""),shortName:v(r,["short_name"],""),category:v(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:v(r,["tax_code","tax_category_code"],""),isActive:_e(r,["is_active","active","enabled"],!0),listPrice:T(r,["list_price"],0),purchasePrice:T(r,["purchase_price"],0),salePrice:T(r,["default_sale_price","sale_price"],0),costPrice:T(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:v(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:v(r,["bottle_type"],""),containerCode:v(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:v(r,["rice_type"],""),season:v(r,["season"],""),agingYears:T(r,["aging_years"],0)})):lt.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||lt.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:lt.summary.activeCustomerCount,productCount:t.length||lt.summary.productCount,activeProductCount:t.length?o.filter(r=>r.isActive).length:lt.summary.activeProductCount},customers:n,products:o}}return lt}async function Po(){const[e,t]=await Promise.all([Y("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),Y("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?Se(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const o=e[0],r=v(o,["status"],"success"),i=o.errors,c=Array.isArray(i)?i.length>0:!!i;return{generatedAt:new Date().toISOString(),lastSyncAt:Se(o,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":r==="error"?"error":"success",jobName:v(o,["agent_hostname"],"sake-relay"),message:`${T(o,["rows_upserted"],0)}行同期 / ${T(o,["files_updated"],0)}ファイル更新`}}return{...fi,lastDataAt:n}}async function Eo(){const e=await be("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function Ao(){const e=[{name:"売上明細 (SHTOR)",table:"sales_document_lines",countFilter:"note=like.*src:diff*",expectMin:2e5},{name:"伝票ヘッダ (SHDEN)",table:"sales_document_headers",expectMin:5e4},{name:"日次売上集計",table:"daily_sales_fact",expectMin:1e5},{name:"商品月別売上",table:"product_monthly_sales",expectMin:1e4},{name:"得意先マスタ",table:"customers",expectMin:500},{name:"商品マスタ",table:"products",expectMin:1e3},{name:"安全在庫",table:"product_safety_stock_params",expectMin:0}],t=[];for(const n of e)try{const o=n.countFilter?`&${n.countFilter}`:"",r=`${$e}/rest/v1/${n.table}?select=id&limit=0${o}`,c=(await fetch(r,{headers:{apikey:ie,Authorization:`Bearer ${ie}`,Prefer:"count=exact"}})).headers.get("content-range")??"*/0",d=parseInt(c.split("/").pop()??"0",10)||0,u=d>=n.expectMin?"ok":d>0?"warn":"error";t.push({name:n.name,table:n.table,count:d,status:u,detail:d>=n.expectMin?"正常稼働":d>0?"データ少":"データなし"})}catch{t.push({name:n.name,table:n.table,count:0,status:"error",detail:"接続エラー"})}return t}async function ea(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];if(e.customerCode.trim()){const r=e.customerCode.trim();n.push(`customer_code.ilike.*${r}*`,`legacy_customer_code.ilike.*${r}*`,`customer_name.ilike.*${r}*`)}e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const o=await Y("sales_document_headers",t);return o.length>0?o.map((r,i)=>({id:v(r,["id"],`invoice-${i}`),documentNo:v(r,["document_no","legacy_document_no"],""),date:Se(r,["sales_date"],""),customerCode:v(r,["legacy_customer_code","customer_code"],""),customerName:v(r,["customer_name","legacy_customer_code"],""),itemCount:T(r,["line_count"],0),amount:T(r,["total_amount","billed_amount"],0)})):[]}const Jt=new Map;async function Lo(e){Jt.clear();const t=await ve("sales_document_lines",{select:"document_no,line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*date:${e}*`,order:"document_no,line_no"});for(const n of t){const o=v(n,["document_no"],"");if(!o)continue;const r=Jt.get(o)??[];r.push({lineNo:T(n,["line_no"],0),productCode:v(n,["legacy_product_code"],""),productName:v(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0)}),Jt.set(o,r)}}async function wn(e){const t=Jt.get(e);if(t)return t;const o=(await Y("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*inv:${e} *`,order:"line_no",limit:"100"})).map(r=>({lineNo:T(r,["line_no"],0),productCode:v(r,["legacy_product_code"],""),productName:v(r,["product_name"],""),quantity:T(r,["quantity"],0),unitPrice:T(r,["unit_price"],0),amount:T(r,["amount"],0)}));return Jt.set(e,o),o}async function Vn(e){const t=e.trim().toUpperCase();if(!t)return bs("");const[n,o,r]=await Promise.all([Y("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t},customer_name.ilike.*${t}*`,order:"sales_date.desc",limit:"50"}),Y("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||o.length>0){const i=n.map((u,h)=>{const g=wi(u,h);return{id:g.id,date:g.date,documentNo:g.documentNo,amount:g.amount}}),c=o.map((u,h)=>({id:String(u.id??`payment-${h+1}`),date:Se(u,["payment_date","received_date"],new Date().toISOString()),amount:pe(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),d=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:pe(d?.balance_amount),salesTotal:i.reduce((u,h)=>u+h.amount,0),paymentTotal:c.reduce((u,h)=>u+h.amount,0),salesHistory:i,paymentHistory:c}}return bs(t)}async function Yn(){const[e,t,n,o]=await Promise.all([Y("mv_monthly_sales",{order:"month.asc"}),Y("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),Y("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),Y("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:v(r,["month"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),volumeMl:T(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),staffTotals:o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:0}))}:vi}async function $i(e,t,n){if(t==="all")return[];const o=n?Co(t,n):null,i=await be(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:o?.from??null,p_date_to:o?.to??null});return i?i.map(c=>({code:v(c,["code"],""),name:v(c,["name"],""),amount:T(c,["amount"],0),quantity:T(c,["quantity"],0),documents:T(c,["documents"],0),volumeMl:T(c,["volume_ml"],0)})):[]}async function _i(e,t){if(t==="all")return[];const n=await be("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(o=>o.period_val).filter(Boolean)}function Co(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,o]=t.split("-").map(Number),r=`${n}-${String(o).padStart(2,"0")}-01`,i=new Date(n,o,0).getDate(),c=`${n}-${String(o).padStart(2,"0")}-${String(i).padStart(2,"0")}`;return{from:r,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const o=parseInt(n[1]),r=parseInt(n[2]),i=new Date(o,0,4),c=i.getDay()||7,d=new Date(i);d.setDate(i.getDate()-c+1);const u=new Date(d);u.setDate(d.getDate()+(r-1)*7);const h=new Date(u);return h.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:h.toISOString().slice(0,10)}}return null}function Do(e){return e.map(t=>({staffCode:v(t,["staff_code"],""),staffName:v(t,["staff_name"],""),code:v(t,["code"],""),name:v(t,["name"],""),tag:v(t,["tag"],""),amount:T(t,["amount"],0),quantity:T(t,["quantity"],0),documents:T(t,["documents"],0)}))}async function Si(e,t){const n=await be("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(o=>({code:v(o,["code"],""),name:v(o,["name"],""),amount:T(o,["amount"],0),quantity:T(o,["quantity"],0),documents:T(o,["documents"],0)})):[]}async function ki(e,t,n){const o=await be("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?Do(o):[]}async function Pi(e,t,n){const o=await be("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?Do(o):[]}async function Ei(e,t){if(e==="all"||!t)return[];const n=await be("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(o=>({month:v(o,["label"],""),amount:T(o,["amount"],0),quantity:T(o,["quantity"],0),volumeMl:T(o,["volume_ml"],0)})):[]}function Ai(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function Li(e,t,n){const o=await be("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),tag:v(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function Ci(e,t,n){const o=await be("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),tag:v(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function Di(e,t){const n=await be("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(o=>({month:v(o,["month"],""),amount:T(o,["amount"],0),quantity:T(o,["quantity"],0),volumeMl:T(o,["volume_ml"],0)})):[]}async function qi(e,t){const n=await be("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:v(o,["brew_category"],""),subCategory:v(o,["sub_category"],""),productCount:T(o,["product_count"],0),totalShipmentQty:T(o,["total_shipment_qty"],0),totalShipmentMl:T(o,["total_shipment_ml"],0),monthlyAvgQty:T(o,["monthly_avg_qty"],0),monthlyAvgMl:T(o,["monthly_avg_ml"],0),currentStockL:T(o,["current_stock_l"],0),monthsRemaining:T(o,["months_remaining"],0),costPerL:T(o,["cost_per_l"],0)})):[]}async function Ti(e,t){const n=await be("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({month:v(o,["month"],""),brewCategory:v(o,["brew_category"],""),shipmentMl:T(o,["shipment_ml"],0)})):[]}async function Ii(e,t){const n=await be("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:v(o,["brew_category"],""),subCategory:v(o,["sub_category"],""),productCode:v(o,["product_code"],""),productName:v(o,["product_name"],""),volumeMl:T(o,["volume_ml"],0),annualQty:T(o,["annual_qty"],0),annualMl:T(o,["annual_ml"],0),monthlyAvgQty:T(o,["monthly_avg_qty"],0),monthlyAvgMl:T(o,["monthly_avg_ml"],0)})):[]}async function Mi(e){return(await Y("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),fy:T(n,["fy"],e),brewMonth:T(n,["brew_month"],0),durationMonths:T(n,["duration_months"],2),plannedVolumeL:T(n,["planned_volume_l"],0),notes:v(n,["notes"],"")}))}async function Ni(e,t,n){return await be("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function Ri(e,t,n,o){return await vt("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:o??null,updated_at:new Date().toISOString()})!==null}async function Oi(){const e=await Y("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const o=v(n,["category_name"],""),r=v(n,["production_type_name"],"");!o||!r||(t[o]||(t[o]=[]),t[o].push(r))}return t}async function Bi(e,t){return await be("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function zi(e,t){return await be("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function ji(){const e=await Y("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>v(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function Fi(){const e=await Y("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],"");o&&(t[o]={brewCategory:o,rawAlcoholPct:T(n,["raw_alcohol_pct"],18),targetAlcoholPct:T(n,["target_alcohol_pct"],15)})}return t}async function Vi(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${o}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function Yi(){const e=await be("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:T(t,["fy"],0),brewCategory:v(t,["brew_category"],""),shipmentL:T(t,["shipment_l"],0),monthsElapsed:T(t,["months_elapsed"],12),annualizedL:T(t,["annualized_l"],0)})):[]}async function Ui(){const e=await Y("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],""),r=T(n,["growth_rate"],NaN);o&&!isNaN(r)&&(t[o]=r)}return t}async function Ji(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return o?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function Hi(){const e=await Y("brewing_rice_params",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],"");o&&(t[o]={brewCategory:o,polishingRatio:T(n,["polishing_ratio"],.7),ricePerLiterKg:T(n,["rice_per_liter_kg"],.5),kojiRatio:T(n,["koji_ratio"],.3),kojiVariety:v(n,["koji_variety"],"山田錦"),kojiPricePerKg:T(n,["koji_price_per_kg"],600),kakeVariety:v(n,["kake_variety"],"一般米"),kakePricePerKg:T(n,["kake_price_per_kg"],350),alcoholAdditionRatio:T(n,["alcohol_addition_ratio"],0)})}return t}async function Ki(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function Qi(){const e=await be("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:v(t,["brew_category"],""),monthNum:T(t,["month_num"],0),avgMonthlyL:T(t,["avg_monthly_l"],0)})):[]}async function Wi(e){const t=await Y("procurement_decisions",{fy:`eq.${e}`}),n={};for(const o of t??[]){const r=v(o,["brew_category"],""),i=T(o,["decided_brewing_l"],-1);r&&i>=0&&(n[r]=i)}return n}async function Gi(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${o}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function Xi(e){return(await Y("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),batchCode:v(n,["batch_code"],""),fy:T(n,["fy"],e),plannedVolumeL:T(n,["planned_volume_l"],0),tankNo:v(n,["tank_no"],""),status:v(n,["status"],"planned"),startDate:v(n,["start_date"],""),targetEndDate:v(n,["target_end_date"],""),notes:v(n,["notes"],"")}))}async function Zi(e){return e.length===0?[]:(await Y("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:v(n,["id"],""),batchId:v(n,["batch_id"],""),stepOrder:T(n,["step_order"],0),stepName:v(n,["step_name"],""),plannedStart:v(n,["planned_start"],""),plannedEnd:v(n,["planned_end"],""),actualStart:v(n,["actual_start"],""),actualEnd:v(n,["actual_end"],""),status:v(n,["status"],"未着手"),temperature:n.temperature!=null?T(n,["temperature"],0):null,notes:v(n,["notes"],"")}))}function el(e,t){const n=new Date(e);let o=0;for(;o<t;)n.setDate(n.getDate()+1),n.getDay()!==0&&o++;return n}function tl(e,t){const n=new Date(e);let o=t-1;for(;o>0;)n.setDate(n.getDate()+1),n.getDay()!==0&&o--;return n.getDay()===0&&n.setDate(n.getDate()+1),n}function xs(e){return e.getDay()===0&&e.setDate(e.getDate()+1),e}const Sa=[{name:"洗米・浸漬（麹米）",days:1},{name:"蒸米（麹米）",days:1},{name:"製麹",days:2},{name:"洗米・浸漬（酒母）",days:1},{name:"蒸米→酒母仕込",days:1},{name:"酒母育成",days:14},{name:"洗米（添）",days:1},{name:"蒸米→添仕込",days:1},{name:"踊り",days:1},{name:"洗米（仲）",days:1},{name:"蒸米→仲仕込",days:1},{name:"洗米（留）",days:1},{name:"蒸米→留仕込",days:1},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];async function al(e,t,n,o,r){const c=n[o],d=c?.ricePerLiterKg??.5,u=c?.kojiRatio??.3,h=c?.polishingRatio??.7,g=c?.alcoholAdditionRatio??0,y=Math.round(t*(1-g)*d*u/h),$=r.filter(_=>_.stepName==="製麹"&&_.plannedStart&&_.plannedEnd);let S=new Date(e);for(let _=0;_<60;_++){const L=new Date(S.getTime()+1728e5),k=new Date(S.getTime()+3*864e5);let C=0;for(const E of $){const s=new Date(E.plannedStart).getTime(),l=new Date(E.plannedEnd).getTime();L.getTime()<=l&&k.getTime()>=s&&(C+=180)}if(C+y<=180)return S.toISOString().slice(0,10);S=new Date(S.getTime()+864e5)}return S.toISOString().slice(0,10)}async function nl(e,t,n,o,r,i,c){let d=r;i&&c&&(d=await al(r,o,c,e,i));const u=await Ae("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:o,start_date:d});if(!u?.id)return null;let h=xs(new Date(d));for(let g=0;g<Sa.length;g++){h=xs(h);const y=h.toISOString().slice(0,10),$=tl(h,Sa[g].days),S=$.toISOString().slice(0,10);await Ae("brewing_process_steps",{batch_id:u.id,step_order:g+1,step_name:Sa[g].name,planned_start:y,planned_end:S}),h=el($,1)}return await Ye("brewing_process_batches",u.id,{target_end_date:h.toISOString().slice(0,10)}),u.id}async function sl(e,t){return Ye("brewing_process_steps",e,t)}async function ol(e,t){return Ye("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function rl(){return(await Y("tanks",{order:"tank_no"})??[]).map(t=>({id:v(t,["id"],""),tankNo:v(t,["tank_no"],""),displayName:v(t,["display_name"],""),capacityL:T(t,["capacity_l"],0),tankType:v(t,["tank_type"],""),status:v(t,["status"],"empty"),preferredCategories:Array.isArray(t.preferred_categories)?t.preferred_categories:[],cleanupDays:T(t,["cleanup_days"],1)}))}async function il(e,t,n,o){return await Ae("tanks",{tank_no:e,display_name:e,capacity_l:t,tank_type:n,preferred_categories:o,status:"empty"})!==null}async function ll(e){const{supabaseDelete:t}=await N(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tanks",e)}function cl(e,t){const n=e.find(i=>i.stepName==="蒸米→添仕込"),o=e.find(i=>i.stepName==="上槽");if(!n?.plannedStart||!o?.plannedEnd)return null;const r=new Date(o.plannedEnd);return r.setDate(r.getDate()+t),{start:n.plannedStart,end:r.toISOString().slice(0,10)}}async function dl(e,t,n,o){const r=new Map(n.map(k=>[k.stepName,k])),i=o??[],c=e.filter(k=>k.status!=="completed"&&k.startDate).sort((k,C)=>k.startDate.localeCompare(C.startDate));if(c.length===0)return;const d=t.deadlineDate||"",u=t.allowSunday&&!!d,h=new Map,g=(k,C)=>{const E=new Date(k);return E.setDate(E.getDate()+C),E.toISOString().slice(0,10)},y=(k,C,E,s)=>k<=s&&C>=E,$=k=>C=>(!k&&C.getDay()===0&&C.setDate(C.getDate()+1),C),S=(k,C,E)=>{const s=new Date(k);let l=C-1;for(;l>0;)s.setDate(s.getDate()+1),(E||s.getDay()!==0)&&l--;return!E&&s.getDay()===0&&s.setDate(s.getDate()+1),s},_=(k,C)=>{const E=new Date(k);return E.setDate(E.getDate()+1),!C&&E.getDay()===0&&E.setDate(E.getDate()+1),E},L=()=>{const k=new Map;for(const C of h.values())for(const E of C){const s=r.get(E.stepName);if(!s)continue;const l=Math.max(Math.round((new Date(E.end).getTime()-new Date(E.start).getTime())/864e5)+1,1);let p=0;for(let f=0;f<l;f++){const x=new Date(E.start);x.setDate(x.getDate()+f),x.getDay()!==0&&p++}if(p===0)continue;const m=s.laborHours/p;for(let f=0;f<l;f++){const x=new Date(E.start);if(x.setDate(x.getDate()+f),x.getDay()===0)continue;const b=new Date(x);b.setDate(b.getDate()+3-(b.getDay()+6)%7);const w=new Date(b.getFullYear(),0,4),P=1+Math.round(((b.getTime()-w.getTime())/864e5-3+(w.getDay()+6)%7)/7),D=`${b.getFullYear()}-W${String(P).padStart(2,"0")}`;k.set(D,(k.get(D)??0)+m)}}return k};for(const k of c){let C=k.startDate;for(let p of[!1,...u?[!0]:[]]){C=k.startDate;for(let f=0;f<90;f++){C=$(p)(new Date(C)).toISOString().slice(0,10);const b=[];let w=new Date(C);for(const M of Sa){w=$(p)(w);const O=w.toISOString().slice(0,10),I=S(w,M.days,p),z=I.toISOString().slice(0,10);b.push({stepName:M.name,start:O,end:z}),w=_(I,p)}const P=b.find(M=>M.stepName==="製麹");let D=!1;if(P)for(const[M,O]of h){const I=O.find(z=>z.stepName==="製麹");if(I&&y(P.start,P.end,I.start,I.end)){D=!0;break}}if(D){C=g(C,1);continue}h.set(k.id,b);const q=L(),R=t.workerCount*t.weeklyHoursLimit;let B=!1;for(const M of q.values())if(M>R*1.1){B=!0;break}if(B){h.delete(k.id),C=g(C,1);continue}if(i.length>0){const M=b.find(I=>I.stepName==="蒸米→添仕込"),O=b.find(I=>I.stepName==="上槽");if(M&&O){const I=M.start,z=new Date(O.end);z.setDate(z.getDate()+1);const V=z.toISOString().slice(0,10),U=i.filter(H=>H.capacityL>=k.plannedVolumeL&&(H.preferredCategories.length===0||H.preferredCategories.includes(k.brewCategory)));let G=!1;for(const H of U){let Q=!1;for(const[Z,ee]of h){if(Z===k.id||e.find(X=>X.id===Z)?.tankNo!==H.tankNo)continue;const K=ee.find(X=>X.stepName==="蒸米→添仕込"),J=ee.find(X=>X.stepName==="上槽");if(K&&J){const X=g(J.end,H.cleanupDays);if(y(I,V,K.start,X)){Q=!0;break}}}if(!Q){H.tankNo,G=!0;break}}if(!G){h.delete(k.id),C=g(C,1);continue}}}break}const m=h.get(k.id);if(d&&m){const f=m.find(x=>x.stepName==="蒸米→添仕込");if(f&&f.end<=d)break;if(!p){h.delete(k.id);continue}}else break}const E=h.get(k.id);if(!E)continue;const s=(()=>{if(i.length===0)return k.tankNo;const p=E.find(b=>b.stepName==="蒸米→添仕込"),m=E.find(b=>b.stepName==="上槽");if(!p||!m)return k.tankNo;const f=p.start,x=g(m.end,1);for(const b of i){if(b.capacityL<k.plannedVolumeL||b.preferredCategories.length>0&&!b.preferredCategories.includes(k.brewCategory))continue;let w=!1;for(const[P,D]of h){if(P===k.id||e.find(M=>M.id===P)?.tankNo!==b.tankNo)continue;const R=D.find(M=>M.stepName==="蒸米→添仕込"),B=D.find(M=>M.stepName==="上槽");if(R&&B&&y(f,x,R.start,g(B.end,b.cleanupDays))){w=!0;break}}if(!w)return b.tankNo}return k.tankNo})();await Ye("brewing_process_batches",k.id,{start_date:C,tank_no:s,target_end_date:g(E[E.length-1].end,0),updated_at:new Date().toISOString()});const l=await Y("brewing_process_steps",{batch_id:`eq.${k.id}`,order:"step_order.asc"});if(l)for(const p of l){const m=T(p,["step_order"],0),f=E[m-1];if(f){const x=v(p,["id"],"");await Ye("brewing_process_steps",x,{planned_start:f.start,planned_end:f.end})}}}}async function pl(){const t=(await Y("brewing_worker_settings",{limit:"1"})??[])[0];return t?{workerCount:T(t,["worker_count"],2),weeklyHoursLimit:T(t,["weekly_hours_limit"],40),dayStartHour:T(t,["day_start_hour"],6),deadlineDate:v(t,["deadline_date"],""),allowSunday:t.allow_sunday===!0}:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1}}async function ul(e){const t=await Y("brewing_worker_settings",{limit:"1"});if(t&&t.length>0){const n=v(t[0],["id"],"");return Ye("brewing_worker_settings",n,{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday,updated_at:new Date().toISOString()})}return await Ae("brewing_worker_settings",{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday})!==null}async function ml(){return(await Y("brewing_step_labor",{order:"step_name"})??[]).map(t=>({stepName:v(t,["step_name"],""),laborHours:T(t,["labor_hours"],4),workerCountNeeded:T(t,["worker_count_needed"],1)}))}function yl(e,t){const n=new Map(t.map(r=>[r.stepName,r])),o=new Map;for(const r of e){if(!r.plannedStart||!r.plannedEnd)continue;const i=n.get(r.stepName);if(!i)continue;const c=new Date(r.plannedStart),d=new Date(r.plannedEnd),u=Math.max(Math.round((d.getTime()-c.getTime())/864e5)+1,1),h=i.laborHours/u;for(let g=new Date(c);g<=d;g=new Date(g.getTime()+864e5)){const y=new Date(g);y.setDate(y.getDate()+3-(y.getDay()+6)%7);const $=new Date(y.getFullYear(),0,4),S=1+Math.round(((y.getTime()-$.getTime())/864e5-3+($.getDay()+6)%7)/7),_=`${y.getFullYear()}-W${String(S).padStart(2,"0")}`;o.set(_,(o.get(_)??0)+h)}}return o}async function hl(e){return(await Y("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:v(n,["id"],""),varietyName:v(n,["variety_name"],""),committedBales:T(n,["committed_bales"],0),pricePerKg:T(n,["price_per_kg"],0),supplier:v(n,["supplier"],""),deliveryMonth:T(n,["delivery_month"],0)||null,fy:T(n,["fy"],e),notes:v(n,["notes"],"")}))}async function fl(e){return await Ae("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function gl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function vl(){return(await Y("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),defaultPricePerKg:T(t,["default_price_per_kg"],400),region:v(t,["region"],"")}))}async function bl(e,t,n=""){return await Ae("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function xl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function wl(e){return(await Y("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),label:v(n,["label"],""),volumeL:T(n,["volume_l"],0)}))}async function $l(){return(await Y("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:v(t,["id"],""),brewCategory:v(t,["brew_category"],""),label:v(t,["label"],""),volumeL:T(t,["volume_l"],0)}))}async function _l(e,t,n){return await Ae("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function Sl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function kl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Pl(){return(await Y("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:v(t,["name"],""),parentCategory:v(t,["parent_category"],"")})).filter(t=>t.name)}async function El(e,t){return await Ae("brewing_custom_categories",{name:e,parent_category:t})!==null}async function Al(e){const t=await be("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:v(n,["production_type_name"],""),count:T(n,["product_count"],0)})).filter(n=>n.name):[]}async function Ll(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Cl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!o)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function Dl(){const e=await Y("brewing_category_overrides",{}),t={};for(const n of e??[]){const o=v(n,["product_code"],""),r=v(n,["brew_category"],"");o&&r&&(t[o]=r)}return t}async function ql(e){return(await Y("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>v(n,["product_code"],"")).filter(Boolean)}async function Tl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await N(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!o)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}}),t.length===0)return!0;const r=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const $n={sales:"売上",return:"返品",export_return:"輸出戻入"};async function qo(e){const t=e.lines.reduce((r,i)=>r+i.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Ae("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,delivery_date:e.deliveryDate||e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,registered_by:e.registeredBy||null,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}async function Il(){return(await ve("staff",{select:"legacy_staff_code,name,department,is_active",is_active:"eq.true",order:"name.asc"})).map(t=>({code:v(t,["legacy_staff_code"],""),name:v(t,["name"],""),department:v(t,["department"],""),isActive:_e(t,["is_active"],!0)}))}async function Ml(e,t){const{supabaseInsert:n}=await N(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>te);return{supabaseInsert:r}},void 0);return await n("staff",{legacy_staff_code:e,name:t,is_active:!0})?{code:e,name:t,department:"",isActive:!0}:null}async function Nl(e=10){const t=new Date;t.setMonth(t.getMonth()-6);const n=t.toISOString().slice(0,10),o=await ve("sales_document_headers",{select:"legacy_customer_code,customer_name",sales_date:`gte.${n}`,order:"sales_date.desc"}),r={};for(const i of o){const c=v(i,["legacy_customer_code"],"");c&&(r[c]||(r[c]={name:v(i,["customer_name"],""),count:0}),r[c].count++)}return Object.entries(r).sort((i,c)=>c[1].count-i[1].count).slice(0,e).map(([i,c])=>({code:i,name:c.name,count:c.count}))}async function Rl(e=10){const t=new Date;t.setMonth(t.getMonth()-6);const n=t.toISOString().slice(0,10);if((await ve("sales_document_headers",{select:"document_no",sales_date:`gte.${n}`})).length===0)return[];const r=await ve("sales_document_lines",{select:"legacy_product_code"}),i={};for(const u of r){const h=v(u,["legacy_product_code"],"");h&&(i[h]=(i[h]||0)+1)}const c=await ve("products",{select:"legacy_product_code,name"}),d={};for(const u of c)d[v(u,["legacy_product_code"],"")]=v(u,["name"],"");return Object.entries(i).sort((u,h)=>h[1]-u[1]).slice(0,e).map(([u,h])=>({code:u,name:d[u]||u,count:h}))}const ws={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function Un(e){const t=await Y("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],o=pe(n.total_amount);return{documentNo:e,invoiceDate:v(n,["sales_date","document_date"],""),customerCode:v(n,["legacy_customer_code","customer_code"],""),customerName:v(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:o,taxAmount:Math.floor(o*10/110),note:""}}return{...ws,documentNo:e||ws.documentNo}}const Ol={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Jn(e){const t=await Y("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const i=T(r,["sales_amount"],0),c=T(r,["tax_amount"],0);return{customerCode:v(r,["customer_code"],""),customerName:v(r,["customer_name"],""),closingDay:31,salesAmount:i,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:i,status:"open"}}),o=n.reduce((r,i)=>r+i.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:o,customers:n}}return{...Ol,targetYearMonth:e}}const Bl={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function To(){const[e,t,n]=await Promise.all([Y("mv_monthly_sales",{order:"month.asc"}),Y("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),Y("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Bl;const o=e.slice(-12).map(u=>v(u,["month"],"")),r=new Map;t.forEach(u=>{const h=v(u,["code"],"");r.has(h)||r.set(h,{name:v(u,["name"],h),monthValues:new Map}),r.get(h).monthValues.set(v(u,["month"],""),T(u,["amount"],0))});const c=Array.from(r.entries()).map(([u,h])=>({code:u,name:h.name,total:o.reduce((g,y)=>g+(h.monthValues.get(y)??0),0),monthValues:h.monthValues})).sort((u,h)=>h.total-u.total).slice(0,10).map(u=>({label:u.name,values:o.map(h=>u.monthValues.get(h)??0)})),d=n.map(u=>({label:v(u,["name"],""),values:o.map(()=>Math.round(T(u,["amount"],0)/o.length))}));return{generatedAt:new Date().toISOString(),months:o,salesByProduct:c,salesByCustomer:d,costSimulation:[]}}async function zl(){const e=await ve("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const o=v(n,["code"],"");if(!o)return;const r=v(n,["month"],""),i=parseInt(r.slice(5,7))-1;if(i<0||i>11)return;let c=t.get(o);c||(c={name:v(n,["name"],o),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(o,c)),c.qty[i]+=T(n,["quantity"],0),c.amt[i]+=T(n,["amount"],0)}),Array.from(t.entries()).map(([n,o])=>({code:n,name:o.name,monthlyQuantity:o.qty,monthlyAmount:o.amt,totalQuantity:o.qty.reduce((r,i)=>r+i,0),totalAmount:o.amt.reduce((r,i)=>r+i,0)})).filter(n=>n.totalQuantity>0).sort((n,o)=>o.totalAmount-n.totalAmount)}async function jl(){return(await Y("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:v(t,["product_code"],""),productName:v(t,["product_name"],""),forecastMonth:v(t,["forecast_month"],""),segment:v(t,["segment"],"monthly"),avgMonthly:T(t,["avg_monthly"],0),forecastQuantity:T(t,["forecast_quantity"],0),forecastAmount:T(t,["forecast_amount"],0),safetyStock:T(t,["safety_stock"],0),calculatedAt:Se(t,["calculated_at"],"")}))}async function Fl(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await ve("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const o=await ve("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(c=>{c.id&&r.set(String(c.id),c)});const i=[];return o.forEach(c=>{const d=String(c.header_id??c.document_header_id??""),u=r.get(d);if(!u)return;const h=u.sales_date??u.document_date??"";!h||h<t||i.push({date:h.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:pe(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),i.sort((c,d)=>c.date.localeCompare(d.date))}async function Vl(){const e=new Date().toISOString();return(await Y("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:v(n,["id"],""),message:v(n,["message"],""),level:v(n,["level"],"info"),startsAt:Se(n,["starts_at"],""),endsAt:n.ends_at?Se(n,["ends_at"],""):null,dismissible:_e(n,["dismissible"],!0)}))}async function Yl(){const e=await ve("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:v(t,["customer_code"],""),customer_name:v(t,["customer_name"],""),business_type:v(t,["business_type"],""),area_code:v(t,["area_code"],""),phone:v(t,["phone"],""),last_order_date:v(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),amount_12m:T(t,["amount_12m"],0),amount_3m:T(t,["amount_3m"],0),amount_this_month:T(t,["amount_this_month"],0),amount_last_year_same_month:T(t,["amount_last_year_same_month"],0),annual_revenue:T(t,["annual_revenue"],0),is_dormant:_e(t,["is_dormant"],!1),is_at_risk:_e(t,["is_at_risk"],!1)})):[]}async function Ul(){return(await ve("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:v(t,["customer_code"],""),customer_name:v(t,["customer_name"],""),phone:v(t,["phone"],""),address:v(t,["address"],""),area_code:v(t,["area_code"],""),business_type:v(t,["business_type"],""),priority_score:T(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:v(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),annual_revenue:T(t,["annual_revenue"],0),recommended_action:v(t,["recommended_action"],"")}))}async function Jl(){return(await ve("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:v(t,["product_code"],""),product_name:v(t,["product_name"],""),season_type:v(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:T(t,["avg_monthly_qty"],0)}))}async function Hl(){return(await ve("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:v(t,["product_code"],""),name:v(t,["product_name"],""),monthlyQuantity:[T(t,["m01"],0),T(t,["m02"],0),T(t,["m03"],0),T(t,["m04"],0),T(t,["m05"],0),T(t,["m06"],0),T(t,["m07"],0),T(t,["m08"],0),T(t,["m09"],0),T(t,["m10"],0),T(t,["m11"],0),T(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:T(t,["total_quantity"],0),totalAmount:T(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Io(e,t,n){try{return await Ae("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function Mo(e,t){return Ye("customers",e,t)}async function No(e,t){return Ye("products",e,t)}async function _n(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const o=n?.priceGroup||t;let r="";try{const c=await Y("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(r=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const i=new Map;if(o){const c=await Y("customer_product_prices",{price_group:`eq.${o}`,select:"legacy_product_code,special_price"});for(const d of c)i.set(d.legacy_product_code,d.special_price)}return{priceType:r,priceGroup:o,individualPrices:i}}function Hn(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function Kl(){return(await Y("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Ql(){return(await ve("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Wl(){return(await Y("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function At(e,t="billing",n="apr"){const o=await be("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t,p_fiscal_type:n});return o?o.map(r=>({code:String(r.legacy_customer_code??""),name:String(r.customer_name??""),address:String(r.address1??""),yearAmount:Number(r.year_amount??0),sharePct:Number(r.share_pct??0),orderDays:Number(r.order_days??0),prevAmount:Number(r.prev_amount??0),growthRate:r.growth_rate!=null?Number(r.growth_rate):null,currentRank:String(r.current_rank??"C"),prevRank:String(r.prev_rank??"")})):[]}function Kn(e){if(!e)return null;if(/^\d{4}$/.test(e))return{dateFrom:`${e}-01-01`,dateTo:`${e}-12-31`};if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return{dateFrom:`${e}-01`,dateTo:`${e}-${String(o).padStart(2,"0")}`}}return null}async function Ro(e=""){const t=Kn(e),n=t?be("get_abc_customer_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(_=>_??[]):Y("mv_customer_abc",{order:"amount.desc"}),o=t?t.dateFrom.slice(0,7):(()=>{const _=new Date;return _.setMonth(_.getMonth()-11),`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,Y("mv_customer_monthly_sales",{month:`gte.${o}`,order:"month.asc",limit:"10000"})]),d=c.filter(_=>v(_,["month"],"")<=r),u=i.map(_=>({code:v(_,["code"],""),name:v(_,["name"],""),amount:T(_,["amount"],0),documents:T(_,["documents"],0),ratio:T(_,["ratio"],0),cumRatio:T(_,["cum_ratio","cumRatio"],0),abcRank:v(_,["abc_rank","abcRank"],"C")})),h=u.slice(0,10),g=new Set(h.map(_=>_.code)),y=Bo(o,r),$=new Map;d.forEach(_=>{const L=v(_,["code"],"");if(!g.has(L))return;const k=v(_,["month"],"");$.has(L)||$.set(L,new Map),$.get(L).set(k,T(_,["amount"],0))});const S=h.map(_=>({label:_.name,values:y.map(L=>$.get(_.code)?.get(L)??0)}));return{generatedAt:new Date().toISOString(),ranking:u,months:y,monthlyByCustomer:S}}async function Oo(e=""){const t=Kn(e),n=t?be("get_abc_product_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(L=>L??[]):Y("mv_product_abc",{order:"amount.desc"}),o=t?t.dateFrom.slice(0,7):(()=>{const L=new Date;return L.setMonth(L.getMonth()-11),`${L.getFullYear()}-${String(L.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,Y("mv_product_monthly_shipments",{month:`gte.${o}`,order:"month.asc",limit:"10000"})]),d=c.filter(L=>v(L,["month"],"")<=r),h=i.map(L=>({code:v(L,["code"],""),name:v(L,["name"],""),amount:T(L,["amount"],0),quantity:T(L,["quantity"],0),documents:T(L,["documents"],0),ratio:T(L,["ratio"],0),cumRatio:T(L,["cum_ratio","cumRatio"],0),abcRank:v(L,["abc_rank","abcRank"],"C")})),g=h.reduce((L,k)=>L+k.amount,0),y=Bo(o,r),$=new Set(h.filter(L=>L.abcRank==="A").slice(0,10).map(L=>L.code)),S=new Map;d.forEach(L=>{const k=v(L,["code"],"");if(!$.has(k))return;const C=v(L,["month"],"");S.has(k)||S.set(k,new Map),S.get(k).set(C,T(L,["amount"],0))});const _=Array.from($).map(L=>{const k=S.get(L);return{label:h.find(C=>C.code===L)?.name??L,values:y.map(C=>k?.get(C)??0)}});return{generatedAt:new Date().toISOString(),totalAmount:g,ranking:h,months:y,monthlyByProduct:_.length>0?_:[]}}function Bo(e,t){const n=[],[o,r]=e.split("-").map(Number),[i,c]=t.split("-").map(Number);let d=o,u=r;for(;(d<i||d===i&&u<=c)&&(n.push(`${d}-${String(u).padStart(2,"0")}`),u++,u>12&&(u=1,d++),!(n.length>60)););return n}const zo={planned:"計画中",active:"仕込中",done:"完了"};async function jo(){const e=await Y("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),jikomiNo:v(t,["batch_no","legacy_batch_no"],""),productName:v(t,["brand_name"],""),riceType:v(t,["rice_type"],""),plannedKg:T(t,["planned_rice_kg"],0),actualKg:T(t,["actual_rice_kg"],0),startDate:Se(t,["start_date"],""),expectedDoneDate:Se(t,["expected_done_date"],""),status:v(t,["status"],"planned"),tankNo:v(t,["tank_no"],""),note:v(t,["remarks"],"")})):[]}async function Fo(){return(await Y("tanks",{order:"tank_no.asc"})).map(t=>({id:v(t,["id"],""),tankNo:v(t,["tank_no"],""),displayName:v(t,["display_name"],""),capacity:T(t,["capacity_l"],0),depthMm:T(t,["depth_mm"],0),litersPerMm:T(t,["liters_per_mm"],0),currentVolume:T(t,["current_volume_l"],0),productName:v(t,["current_product_code"],""),jikomiNo:v(t,["current_batch_id"],""),status:v(t,["status"],"empty"),lastUpdated:Se(t,["last_updated_at"],""),remarks:v(t,["remarks"],"")}))}async function Gl(e){return e.id?Ye("tanks",e.id,{tank_no:e.tankNo,display_name:e.displayName??e.tankNo,capacity_l:e.capacity??0,depth_mm:e.depthMm??0,liters_per_mm:e.litersPerMm??0,remarks:e.remarks??"",last_updated_at:new Date().toISOString()}):await Ae("tanks",{tank_no:e.tankNo,display_name:e.displayName??e.tankNo,capacity_l:e.capacity??0,depth_mm:e.depthMm??0,liters_per_mm:e.litersPerMm??0,status:"empty",remarks:e.remarks??""})!==null}async function Xl(e){const{supabaseDelete:t}=await N(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tanks",e)}async function Zl(e=200){return(await Y("tank_movements",{order:"movement_date.desc,created_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),movementDate:v(n,["movement_date"],""),fromTankNo:v(n,["from_tank_no"],""),toTankNo:v(n,["to_tank_no"],""),volumeL:T(n,["volume_l"],0),productName:v(n,["product_name"],""),batchCode:v(n,["batch_code"],""),alcoholDegree:n.alcohol_degree!=null?T(n,["alcohol_degree"],0):null,temperature:n.temperature!=null?T(n,["temperature"],0):null,movementType:v(n,["movement_type"],"transfer"),recordedBy:v(n,["recorded_by"],""),notes:v(n,["notes"],"")}))}async function ec(e){return(await Y("tank_movements",{or:`from_tank_no.eq.${e},to_tank_no.eq.${e}`,order:"movement_date.desc,created_at.desc"})).map(n=>({id:v(n,["id"],""),movementDate:v(n,["movement_date"],""),fromTankNo:v(n,["from_tank_no"],""),toTankNo:v(n,["to_tank_no"],""),volumeL:T(n,["volume_l"],0),productName:v(n,["product_name"],""),batchCode:v(n,["batch_code"],""),alcoholDegree:n.alcohol_degree!=null?T(n,["alcohol_degree"],0):null,temperature:n.temperature!=null?T(n,["temperature"],0):null,movementType:v(n,["movement_type"],"transfer"),recordedBy:v(n,["recorded_by"],""),notes:v(n,["notes"],"")}))}async function tc(e){return await Ae("tank_movements",{movement_date:e.movementDate,from_tank_no:e.fromTankNo,to_tank_no:e.toTankNo,volume_l:e.volumeL,product_name:e.productName,batch_code:e.batchCode,alcohol_degree:e.alcoholDegree,temperature:e.temperature,movement_type:e.movementType,recorded_by:e.recordedBy,notes:e.notes})!==null}async function ac(e){const{supabaseDelete:t}=await N(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tank_movements",e)}async function nc(){return(await Y("kentei_records",{order:"kentei_date.desc"})).map(t=>({id:v(t,["id"],""),kenteiNo:v(t,["kentei_no"],""),batchCode:v(t,["batch_code"],""),productName:v(t,["product_name","product_code"],""),kenteiDate:Se(t,["kentei_date"],""),alcoholDegree:T(t,["alcohol_degree"],0),extractDegree:T(t,["extract_degree"],0),sakaMeterValue:T(t,["sakemeter_value"],0),acidity:T(t,["acidity"],0),aminoAcid:T(t,["amino_acid"],0),riceType:v(t,["rice_type"],""),polishRate:T(t,["polish_rate"],0),productionTypeName:v(t,["production_type_name"],""),volume:T(t,["volume_l"],0),taxCategory:v(t,["tax_category_code"],""),tankNo:v(t,["tank_no"],""),status:v(t,["status"],"pending")}))}async function sc(e){const t={kentei_no:e.kenteiNo,batch_code:e.batchCode,product_name:e.productName,kentei_date:e.kenteiDate,alcohol_degree:e.alcoholDegree,extract_degree:e.extractDegree,sakemeter_value:e.sakaMeterValue,acidity:e.acidity,amino_acid:e.aminoAcid,rice_type:e.riceType,polish_rate:e.polishRate,production_type_name:e.productionTypeName,volume_l:e.volume,tax_category_code:e.taxCategory};return e.id?Ye("kentei_records",e.id,t):await Ae("kentei_records",{...t,status:"pending"})!==null}async function oc(){return(await Y("genzaishu",{order:"registered_at.desc"})).map(t=>({id:v(t,["id"],""),batchCode:v(t,["batch_code"],""),productName:v(t,["product_name"],""),kenteiDate:v(t,["kentei_date"],""),tankNo:v(t,["tank_no"],""),volumeL:T(t,["volume_l"],0),alcoholDegree:t.alcohol_degree!=null?T(t,["alcohol_degree"],0):null,sakeMeterValue:t.sake_meter_value!=null?T(t,["sake_meter_value"],0):null,acidity:t.acidity!=null?T(t,["acidity"],0):null,aminoAcid:t.amino_acid!=null?T(t,["amino_acid"],0):null,riceType:v(t,["rice_type"],""),polishRate:t.polish_rate!=null?T(t,["polish_rate"],0):null,productionTypeName:v(t,["production_type_name"],""),notes:v(t,["notes"],"")}))}async function rc(e){return await vt("genzaishu",{batch_code:e.batchCode,product_name:e.productName,kentei_date:e.kenteiDate,tank_no:e.tankNo,volume_l:e.volumeL,alcohol_degree:e.alcoholDegree,sake_meter_value:e.sakeMeterValue,acidity:e.acidity,amino_acid:e.aminoAcid,rice_type:e.riceType,polish_rate:e.polishRate,production_type_name:e.productionTypeName,notes:e.notes})!==null}async function Vo(){const e=await Y("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),code:v(t,["material_code","legacy_material_code"],""),name:v(t,["name"],""),unit:v(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),unitCost:T(t,["unit_cost"],0),lastUpdated:Se(t,["updated_at"],"")})):[]}async function Yo(){const e=await Y("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),documentNo:v(t,["document_no","legacy_document_no"],""),purchaseDate:Se(t,["purchase_date"],""),supplierCode:v(t,["supplier_code","legacy_supplier_code"],""),supplierName:v(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:T(t,["total_amount"],0),status:v(t,["payment_status"],"pending")})):[]}async function Uo(){const e=await Y("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:v(t,["supplier_code","legacy_supplier_code"],""),supplierName:v(t,["legacy_supplier_code"],""),totalPurchase:T(t,["total_purchase"],0),paidAmount:T(t,["paid_amount"],0),balance:T(t,["balance"],0),nextPaymentDate:Se(t,["next_payment_date"],""),status:v(t,["status"],"unpaid")})):[]}async function Jo(){const e=await Y("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),billNo:v(t,["bill_no"],""),supplierName:v(t,["counterparty_name"],""),amount:T(t,["amount"],0),issueDate:Se(t,["issue_date"],""),dueDate:Se(t,["due_date"],""),status:v(t,["status"],"holding")})):[]}async function Ho(){const e=await Y("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:v(t,["material_code","legacy_material_code"],""),name:v(t,["name"],""),unit:v(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),lastPurchaseDate:Se(t,["last_purchase_date"],""),unitCost:T(t,["unit_cost"],0)})):[]}const Ko=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Sn={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},ic={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function Qn(e,t){const n=await Y("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const o=n[0],r=v(o,["id"],""),[i,c]=await Promise.all([Y("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),Y("tax_deductions",{declaration_id:`eq.${r}`})]),d=i.map(h=>({taxCategory:v(h,["tax_category_code"],""),taxCategoryName:v(h,["tax_category_name"],""),alcoholDegree:T(h,["alcohol_degree"],0),volume:T(h,["taxable_volume"],0),taxRate:T(h,["tax_rate"],0),taxAmount:T(h,["tax_amount"],0),productionVolume:T(h,["production_volume"],0),previousBalance:T(h,["previous_balance"],0),currentAdjustment:T(h,["current_adjustment"],0),exportDeduction:T(h,["export_deduction"],0),sampleDeduction:T(h,["sample_deduction"],0),taxableVolume:T(h,["taxable_volume"],0)})),u=c.map(h=>({type:v(h,["deduction_type"],"sample"),categoryCode:v(h,["tax_category_code"],""),volume:T(h,["volume"],0),reason:v(h,["reason"],""),documentNo:v(h,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:v(o,["company_name"],""),companyNo:v(o,["company_no"],""),companyAddress:v(o,["company_address"],""),companyRepresentative:v(o,["company_representative"],""),taxOffice:v(o,["tax_office"],""),rows:d,deductions:u,totalVolume:T(o,["total_taxable_volume"],0),totalTax:T(o,["total_tax_amount"],0),status:v(o,["status"],"draft"),submittedAt:v(o,["submitted_at"],"")||null}}return{...ic,targetYear:e,targetMonth:t}}function Be(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Qo(e){const t=e.rows.map(o=>`    <Category>
      <Code>${Be(o.taxCategory)}</Code>
      <Name>${Be(o.taxCategoryName)}</Name>
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
`),n=e.deductions.map(o=>`    <Deduction type="${Be(o.type)}">
      <CategoryCode>${Be(o.categoryCode)}</CategoryCode>
      <Volume>${o.volume}</Volume>
      <Reason>${Be(o.reason)}</Reason>${o.documentNo?`
      <DocumentNo>${Be(o.documentNo)}</DocumentNo>`:""}
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
`}function lc(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function cc(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),o=e.rows.map(i=>[i.taxCategory,i.taxCategoryName,i.alcoholDegree,i.productionVolume,i.previousBalance,i.currentAdjustment,i.exportDeduction,i.sampleDeduction,i.taxableVolume,i.taxRate,i.taxAmount].map(lc).join(",")),r=`,合計,,${e.rows.reduce((i,c)=>i+c.productionVolume,0)},,,${e.rows.reduce((i,c)=>i+c.exportDeduction,0)},${e.rows.reduce((i,c)=>i+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...o,r].join(`
`)+`
`}function dc(e){const t=e.rows.map(r=>{const i=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),c=Math.round(i*r.taxRate);return{...r,taxableVolume:i,volume:i,taxAmount:c}}),n=t.reduce((r,i)=>r+i.taxableVolume,0),o=t.reduce((r,i)=>r+i.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:o}}async function pc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Qo(e),submitted_at:e.submittedAt})}async function Wn(e,t){return(await be("get_sake_tax_by_month",{p_year:e,p_month:t})).map(o=>({sakeType:o.sake_type,alcDegree:o.alc_degree??null,volumeSaleL:Number(o.volume_sale_l)||0,volumeReturnL:Number(o.volume_return_l)||0,volumeExportL:Number(o.volume_export_l)||0,volumeNetL:Number(o.volume_net_l)||0,taxRatePerKl:o.tax_rate_per_kl!==null?Number(o.tax_rate_per_kl):null,taxAmount:Number(o.tax_amount)||0}))}async function Gn(e){const t=await Y("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:v(n,["id"],""),saleDate:v(n,["sale_date"],e),saleTime:v(n,["sale_time"],""),productCode:v(n,["product_code"],""),productName:v(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0),paymentMethod:v(n,["payment_method"],"cash")})):[]}async function Wo(){const e=await Y("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:v(t,["id"],""),orderNo:v(t,["order_no"],""),orderDate:Se(t,["order_date"],""),customerName:v(t,["customer_name"],""),postalCode:v(t,["postal_code"],""),address:v(t,["shipping_address"],""),items:[],totalAmount:T(t,["total_amount"],0),status:v(t,["status"],"new"),shippingDate:Se(t,["shipping_date"],"")})):[]}async function uc(e,t,n,o,r,i){const c=await Ae("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:o,status:"new",remarks:r||null});if(!c)return null;const d=c.id;for(let u=0;u<i.length;u++){const h=i[u];await Ae("store_order_lines",{order_id:d,line_no:u+1,product_code:h.productCode,product_name:h.productName,quantity:h.quantity,unit_price:h.unitPrice,amount:h.amount})}return d}async function ka(e){const t=await Ae("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Go(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function mc(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await Y("print_layouts",t)).map(o=>({id:v(o,["id"],""),name:v(o,["name"],""),templateKey:v(o,["template_key"],""),positions:o.positions??{},isDefault:_e(o,["is_default"],!1),note:v(o,["note"],""),updatedAt:v(o,["updated_at"],"")}))}async function yc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>te);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},o=await t("print_layouts",n);return o?{id:v(o,["id"],e.id),name:v(o,["name"],e.name),templateKey:v(o,["template_key"],e.templateKey),positions:o.positions??e.positions,isDefault:_e(o,["is_default"],!1),note:v(o,["note"],""),updatedAt:v(o,["updated_at"],"")}:null}async function hc(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function fc(){return(await Y("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),email:v(t,["email"],""),displayName:v(t,["display_name"],""),signature:v(t,["signature"],""),replyTo:v(t,["reply_to"],""),isDefault:_e(t,["is_default"],!1),isVerified:_e(t,["is_verified"],!1),note:v(t,["note"],"")}))}async function gc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:v(n,["id"],e.id),name:v(n,["name"],e.name),email:v(n,["email"],e.email),displayName:v(n,["display_name"],""),signature:v(n,["signature"],""),replyTo:v(n,["reply_to"],""),isDefault:_e(n,["is_default"],!1),isVerified:_e(n,["is_verified"],!1)}:null}async function vc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Xn={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Zn={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function bc(e){const t=`${e}-01T00:00:00Z`,[n,o]=e.split("-").map(d=>parseInt(d,10)),r=new Date(n,o,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await Y("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${i})`,order:"starts_at.asc"})).map(d=>({id:v(d,["id"],""),title:v(d,["title"],""),description:v(d,["description"],""),category:v(d,["category"],"general")||"general",startsAt:v(d,["starts_at"],new Date().toISOString()),endsAt:v(d,["ends_at"],""),isAllDay:_e(d,["is_all_day"],!1),location:v(d,["location"],""),attendees:d.attendees??[],relatedCustomerCode:v(d,["related_customer_code"],""),relatedOrderId:v(d,["related_order_id"],""),color:v(d,["color"],""),googleEventId:v(d,["google_event_id"],"")}))}async function xc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Zn[e.category],updated_at:new Date().toISOString()})?e:null}async function wc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Xo(){return(await Y("integration_settings",{order:"name.asc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),provider:v(t,["provider"],""),config:t.config??{},isEnabled:_e(t,["is_enabled"],!1),lastSyncAt:v(t,["last_sync_at"],""),lastStatus:v(t,["last_status"],"")}))}async function na(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function $c(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const o=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(o,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const i=await r.json(),{supabaseInsert:c}=await N(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>te);return{supabaseInsert:u}},void 0);let d=0;for(const u of i.orders){const h=`shopify_${u.id}`;await c("shopify_orders",{id:h,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),d++}return await na({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得成功`}),{count:d}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function _c(){return(await Y("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:v(t,["id"],""),shopifyOrderId:v(t,["shopify_order_id"],""),orderNumber:v(t,["order_number"],""),orderDate:v(t,["order_date"],""),customerName:v(t,["customer_name"],""),customerEmail:v(t,["customer_email"],""),totalAmount:pe(t.total_amount),financialStatus:v(t,["financial_status"],""),fulfillmentStatus:v(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Sc(e){const t=e.config.refresh_token,n=e.config.client_id,o=e.config.client_secret;if(!t||!n||!o)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:o})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const c=(await r.json()).access_token;return await na({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function kc(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const o=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),i=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${o}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const g=await Sc(e);if(g.error)return{count:0,error:g.error};t=g.token,c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const d=await c.json(),{supabaseInsert:u}=await N(async()=>{const{supabaseInsert:g}=await Promise.resolve().then(()=>te);return{supabaseInsert:g}},void 0);let h=0;for(const g of d.items){const y=`gcal_${g.id}`,$=g.start?.dateTime??g.start?.date??"",S=g.end?.dateTime??g.end?.date??"";await u("calendar_events",{id:y,title:String(g.summary??"(無題)"),description:String(g.description??""),category:"general",starts_at:String($),ends_at:String(S),location:String(g.location??""),google_event_id:String(g.id??""),updated_at:new Date().toISOString()}),h++}return await na({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${h}件取得`}),{count:h}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function Pc(){return(await Y("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:v(t,["id"],""),receivedAt:v(t,["received_at"],""),senderPhone:v(t,["sender_phone"],""),senderName:v(t,["sender_name"],""),imageUrl:v(t,["image_url"],""),ocrStatus:v(t,["ocr_status"],"pending")||"pending",ocrText:v(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:v(t,["linked_invoice_id"],"")}))}async function Ec(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const o=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(o){return{text:"",error:o instanceof Error?o.message:String(o)}}}async function Ac(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Ta={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Ia={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Lc(){return(await Y("user_profiles",{order:"display_name.asc"})).map(t=>({id:v(t,["id"],""),email:v(t,["email"],""),displayName:v(t,["display_name"],""),staffCode:v(t,["staff_code"],""),department:v(t,["department"],"all")||"all",role:v(t,["role"],"staff")||"staff",defaultMailSenderId:v(t,["default_mail_sender_id"],""),phone:v(t,["phone"],""),avatarUrl:v(t,["avatar_url"],""),isActive:_e(t,["is_active"],!0),lastSignInAt:v(t,["last_sign_in_at"],""),createdAt:v(t,["created_at"],"")}))}async function Cc(e){if(!e)return null;const t=await Y("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:v(n,["id"],""),email:v(n,["email"],""),displayName:v(n,["display_name"],""),staffCode:v(n,["staff_code"],""),department:v(n,["department"],"all")||"all",role:v(n,["role"],"staff")||"staff",defaultMailSenderId:v(n,["default_mail_sender_id"],""),phone:v(n,["phone"],""),avatarUrl:v(n,["avatar_url"],""),isActive:_e(n,["is_active"],!0),lastSignInAt:v(n,["last_sign_in_at"],"")}}async function Dc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function qc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Tc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Ic(e=100){return(await Y("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),action:v(n,["action"],""),entityType:v(n,["entity_type"],""),entityId:v(n,["entity_id"],""),userEmail:v(n,["user_email"],""),changes:n.changes??{},createdAt:v(n,["created_at"],"")}))}const Ma={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Zo(){return(await Y("slack_notifications",{order:"event_type.asc"})).map(t=>({id:v(t,["id"],""),eventType:v(t,["event_type"],"new_order"),enabled:_e(t,["enabled"],!0),channel:v(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:v(t,["last_triggered_at"],"")}))}async function Mc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function Nc(e=50){return(await Y("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),eventType:v(n,["event_type"],""),channel:v(n,["channel"],""),message:v(n,["message"],""),status:v(n,["status"],"sent"),error:v(n,["error"],""),sentAt:v(n,["sent_at"],"")}))}async function Rc(e,t,n){const r=(await Xo()).find(h=>h.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const i=r.config.webhook_url;if(!i)return{ok:!1,error:"Webhook URL未設定"};const d=(await Zo()).find(h=>h.eventType===e&&h.enabled);if(!d)return{ok:!1,error:"通知ルールが無効"};const u=n??d.channel??r.config.default_channel??"#general";try{const h=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Ma[e]} ${t}`,channel:u})}),g=h.ok,{supabaseInsert:y}=await N(async()=>{const{supabaseInsert:$}=await Promise.resolve().then(()=>te);return{supabaseInsert:$}},void 0);return await y("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:g?"sent":"failed",error:g?null:`HTTP ${h.status}`}),g?{ok:!0}:{ok:!1,error:`HTTP ${h.status}`}}catch(h){return{ok:!1,error:h instanceof Error?h.message:String(h)}}}const Va={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},es={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function Oc(){return(await Y("prospects",{order:"updated_at.desc"})).map(t=>({id:v(t,["id"],""),companyName:v(t,["company_name"],""),contactName:v(t,["contact_name"],""),email:v(t,["email"],""),phone:v(t,["phone"],""),address:v(t,["address"],""),website:v(t,["website"],""),businessType:v(t,["business_type"],""),stage:v(t,["stage"],"cold"),source:v(t,["source"],""),expectedAmount:pe(t.expected_amount),probability:pe(t.probability),assignedStaffCode:v(t,["assigned_staff_code"],""),nextActionDate:v(t,["next_action_date"],""),nextAction:v(t,["next_action"],""),note:v(t,["note"],""),lastContactAt:v(t,["last_contact_at"],""),wonAt:v(t,["won_at"],""),lostAt:v(t,["lost_at"],""),lostReason:v(t,["lost_reason"],""),convertedCustomerCode:v(t,["converted_customer_code"],""),createdAt:v(t,["created_at"],"")}))}async function er(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:v(n,["id"],e.id)}:null}async function Bc(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);try{const o=new URL("/rest/v1/prospects",t);return o.searchParams.set("id",`eq.${e}`),(await fetch(o.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function zc(e){return(await Y("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:v(n,["id"],""),prospectId:v(n,["prospect_id"],""),activityType:v(n,["activity_type"],"call"),title:v(n,["title"],""),description:v(n,["description"],""),activityDate:v(n,["activity_date"],""),result:v(n,["result"],""),staffCode:v(n,["staff_code"],"")}))}async function jc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const tr=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function Fc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function Vc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Yc(){return(await ve("v_customer_map")).map(t=>({customerCode:v(t,["customer_code"],""),name:v(t,["name"],""),phone:v(t,["phone"],""),areaCode:v(t,["area_code"],""),businessType:v(t,["business_type"],""),businessTypeName:v(t,["business_type_name"],""),address1:v(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:_e(t,["is_at_risk"],!1),isDormant:_e(t,["is_dormant"],!1),amount12m:T(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}async function ar(){return(await ve("customers",{select:"id,legacy_customer_code,name,address1",is_active:"eq.true",lat:"is.null",address1:"not.is.null",order:"name.asc"})).map(t=>({id:v(t,["id"],""),customerCode:v(t,["legacy_customer_code"],""),name:v(t,["name"],""),address1:v(t,["address1"],"")}))}async function Uc(e){try{const t=`https://nominatim.openstreetmap.org/search?format=json&countrycodes=jp&limit=1&q=${encodeURIComponent(e)}`,n=await fetch(t,{headers:{"User-Agent":"sake-system-crm/1.0"}});if(!n.ok)return null;const o=await n.json();return o.length===0?null:{lat:parseFloat(o[0].lat),lng:parseFloat(o[0].lon)}}catch{return null}}async function Jc(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0),o=await ar();let r=0,i=0;for(let c=0;c<o.length;c++){const d=o[c];e(c,o.length,d.name);const u=await Uc(d.address1);if(u)try{const h=new URL(`/rest/v1/customers?id=eq.${d.id}`,t);await fetch(h.toString(),{method:"PATCH",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({lat:u.lat,lng:u.lng})}),r++}catch{i++}else i++;c<o.length-1&&await new Promise(h=>setTimeout(h,1100))}return e(o.length,o.length,"完了"),{success:r,failed:i}}const Ya=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function Hc(){return(await ve("customer_churn_notes")).map(t=>({customerCode:v(t,["customer_code"],""),reason:v(t,["reason"],""),memo:v(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:v(t,["updated_at"],"")}))}async function Kc(e){const{supabaseUpsert:t}=await N(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>te);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function Qc(){return(await Y("delivery_locations",{order:"name.asc"})).map(t=>({id:v(t,["id"],""),customerCode:v(t,["customer_code"],""),name:v(t,["name"],""),postalCode:v(t,["postal_code"],""),address:v(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:v(t,["contact_name"],""),phone:v(t,["phone"],""),deliveryNote:v(t,["delivery_note"],""),isActive:_e(t,["is_active"],!0)}))}async function Wc(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function Gc(e=50){return(await Y("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),callDirection:v(n,["call_direction"],"inbound"),fromNumber:v(n,["from_number"],""),toNumber:v(n,["to_number"],""),matchedCustomerCode:v(n,["matched_customer_code"],""),matchedProspectId:v(n,["matched_prospect_id"],""),durationSeconds:pe(n.duration_seconds),callStatus:v(n,["call_status"],"answered"),recordingUrl:v(n,["recording_url"],""),transcript:v(n,["transcript"],""),ivryCallId:v(n,["ivry_call_id"],""),startedAt:v(n,["started_at"],""),endedAt:v(n,["ended_at"],""),notes:v(n,["notes"],"")}))}async function nr(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Xc(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const o=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(o,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const c=(await r.json()).calls??[];let d=0;for(const u of c)await nr({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),d++;return await na({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function Zc(e,t){const n=e.config.api_key,o=e.config.team_id;if(!n||!o)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const i of t){if(!i.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${o}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:i.name,phone_number:i.phone,external_id:i.customerCode??"",note:i.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function ed(){return(await Y("lead_lists",{order:"created_at.desc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),query:v(t,["query"],""),area:v(t,["area"],""),businessType:v(t,["business_type"],""),totalCount:pe(t.total_count),source:v(t,["source"],"manual"),createdAt:v(t,["created_at"],"")}))}async function td(e){return(await Y("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:v(n,["id"],""),listId:v(n,["list_id"],""),companyName:v(n,["company_name"],""),address:v(n,["address"],""),phone:v(n,["phone"],""),website:v(n,["website"],""),email:v(n,["email"],""),businessType:v(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:pe(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:v(n,["place_id"],""),status:v(n,["status"],"new"),convertedProspectId:v(n,["converted_prospect_id"],""),note:v(n,["note"],"")}))}async function ad(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function sr(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function nd(e,t,n){const o=e.config.api_key;if(!o)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),i=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${o}`;try{const c=await fetch(i);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const d=await c.json();return d.status!=="OK"&&d.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${d.status}`}:{results:d.results.map(h=>{const g=h.geometry?.location;return{id:`place_${h.place_id}`,listId:"",companyName:String(h.name??""),address:String(h.formatted_address??""),rating:h.rating?Number(h.rating):void 0,reviewCount:h.user_ratings_total?Number(h.user_ratings_total):void 0,lat:g?.lat,lng:g?.lng,placeId:String(h.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function sd(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await er(t);return n&&await sr({...e,status:"imported",convertedProspectId:t.id}),n}async function od(){return(await Y("workflow_orders",{order:"order_date.desc"})).map(t=>({id:v(t,["id"],""),orderNo:v(t,["order_no"],""),customerName:v(t,["customer_name"],""),customerCode:v(t,["customer_code"],""),orderDate:v(t,["order_date"],""),deliveryDate:v(t,["delivery_date"],""),stage:v(t,["stage"],"new"),totalAmount:pe(t.total_amount),itemCount:pe(t.item_count),priority:v(t,["priority"],"normal"),staffName:v(t,["staff_name"],""),notes:v(t,["notes"],"")}))}async function rd(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function id(){return(await Y("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),email:v(t,["email"],""),phone:v(t,["phone"],""),visitDate:v(t,["visit_date"],""),partySize:pe(t.party_size)||1,language:v(t,["language"],"ja"),purpose:v(t,["purpose"],""),message:v(t,["message"],""),status:v(t,["status"],"new"),repliedAt:v(t,["replied_at"],""),confirmedTime:v(t,["confirmed_time"],""),createdAt:v(t,["created_at"],new Date().toISOString())}))}async function ld(e){const{supabaseInsert:t}=await N(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>te);return{supabaseInsert:o}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const cd=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function or(){return(await Promise.all(cd.map(async t=>{const[n,o]=await Promise.all([On(t.table),Y(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:o[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Pa(e,t,n=100){const o=(t-1)*n,[r,i]=await Promise.all([Y(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(o)}),On(e)]);return{records:r,total:i}}async function Ea(e){const t=await Y("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const o=JSON.parse(n);return String(o.price_group??"")}catch{return""}return""}async function kn(e,t){if(e){const o=await Y("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(o.length>0&&o[0].special_price)return pe(o[0].special_price)}const n=await Y("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?pe(n[0].default_sale_price):0}const dd=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],pd=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],ud={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function md(){const e=new Date,t=[];for(let u=11;u>=0;u--){const h=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`)}const n=dd,o={},r={};for(const u of n){o[u.code]={};for(const h of t){const g=parseInt(h.split("-")[1])-1,y=ud[u.code]??100,$=Math.round(y*pd[g]*(.85+Math.random()*.3));o[u.code][h]=$,r[h]=(r[h]??0)+$}}const i={},c={},d={};for(const u of n){const h=t.map($=>o[u.code][$]??0),g=h.reduce(($,S)=>$+S,0)/h.length,y=h.reduce(($,S)=>$+(S-g)**2,0)/h.length;i[u.code]=h.reduce(($,S)=>$+S,0),c[u.code]=g,d[u.code]=Math.sqrt(y)}return{months:t,products:n,matrix:o,totals:r,productTotals:i,productAvg:c,productStdDev:d}}async function yd(e=36){const t=(()=>{const $=new Date;return $.setMonth($.getMonth()-e),`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`})();let n=[];try{n=await ve("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"})}catch($){console.warn("fetchDemandAnalysis: query failed, using empty",$)}if(n.length===0)return md();const o=new Set,r=new Map,i={},c={};for(const $ of n){const S=v($,["year_month"],""),_=v($,["product_code"],""),L=v($,["product_name"],_),k=T($,["quantity"],0);!S||!_||(o.add(S),r.set(_,L),i[_]||(i[_]={}),i[_][S]=k,c[S]=(c[S]??0)+k)}const d=[...o].sort(),u=[...r.entries()].map(([$,S])=>({code:$,name:S})),h={},g={},y={};for(const $ of u){const S=d.map(k=>i[$.code]?.[k]??0),_=S.reduce((k,C)=>k+C,0)/(S.length||1),L=S.reduce((k,C)=>k+(C-_)**2,0)/(S.length||1);h[$.code]=S.reduce((k,C)=>k+C,0),g[$.code]=_,y[$.code]=Math.sqrt(L)}return{months:d,products:u,matrix:i,totals:c,productTotals:h,productAvg:g,productStdDev:y}}async function hd(){let e=[];try{e=await Y("product_safety_stock_params",{order:"product_code.asc"})}catch(t){return console.warn("fetchSafetyStockParams failed:",t),[]}return e.map(t=>({productCode:v(t,["product_code"],""),productName:v(t,["product_name"],""),unit:v(t,["unit"],"本"),avgMonthlyDemand:T(t,["avg_monthly_demand"],0),demandStdDev:T(t,["demand_std_dev"],0),leadTimeDays:T(t,["lead_time_days"],30),serviceLevel:T(t,["service_level"],.95),safetyStockQty:T(t,["safety_stock_qty"],0),reorderPoint:T(t,["reorder_point"],0),memo:v(t,["memo"],""),productionType:v(t,["production_type"],"monthly")}))}async function fd(e){return(await Y("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:v(n,["id"],""),yearMonth:v(n,["year_month"],e),productCode:v(n,["product_code"],""),productName:v(n,["product_name"],""),demandForecast:T(n,["demand_forecast"],0),safetyStockTarget:T(n,["safety_stock_target"],0),openingStock:T(n,["opening_stock"],0),requiredProduction:T(n,["required_production"],0),plannedQty:T(n,["planned_qty"],0),actualQty:T(n,["actual_qty"],0),status:v(n,["status"],"draft"),productionType:v(n,["production_type"],"monthly"),notes:v(n,["notes"],"")}))}async function gd(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await N(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const o=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),i=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(o)});if(!i.ok){const c=await i.text();return console.error("saveSafetyStockParamsBulk failed:",i.status,c),!1}return!0}catch(o){return console.error("saveSafetyStockParamsBulk error:",o),!1}}async function vd(e){const{supabaseUpsert:t}=await N(async()=>{const{supabaseUpsert:o}=await Promise.resolve().then(()=>te);return{supabaseUpsert:o}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function bd(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}function Za(e,t,n){t>0&&n>0&&(e[t]=(e[t]||0)+n)}function $s(e){return Object.entries(e).map(([t,n])=>({volumeMl:Number(t),label:Number(t)>=1e3?`${Number(t)}ml`:`${Number(t)}ml`,bottles:Number(n)})).sort((t,n)=>t.volumeMl-n.volumeMl)}async function xd(e){const[t,n]=e.split("-").map(Number),o=`${e}-01`,r=new Date(t,n,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}`,c=await ve("sales_document_headers",{select:"document_no,legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${o},sales_date.lte.${i})`,order:"sales_date.asc"}),d=await ve("sales_document_lines",{select:"document_no,legacy_product_code,quantity",note:`like.*date:${e}*`,order:"document_no"}),u=await ve("products",{select:"legacy_product_code,volume_ml"}),h={};for(const L of u)L.legacy_product_code&&L.volume_ml&&(h[L.legacy_product_code]=L.volume_ml);const g={};for(const L of d){const k=L.document_no,C=h[L.legacy_product_code]||0;C>0&&L.quantity>0&&(g[k]||(g[k]={}),Za(g[k],C,L.quantity))}const y=await ve("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),$={};for(const L of y)L.address1&&($[L.legacy_customer_code]=bd(L.address1));const S={};for(const L of c){const k=L.sales_date;if(!k)continue;const C=L.legacy_customer_code||"",E=`${k}|${C}`,s=L.document_no||L.legacy_document_no||"";S[E]||(S[E]={date:k,custCode:C,custName:L.customer_name||"",city:$[C]||"住所未登録",amount:0,invoiceCount:0,volumes:{}}),S[E].amount+=Number(L.total_amount)||0,S[E].invoiceCount++;const l=g[s];if(l)for(const[p,m]of Object.entries(l))Za(S[E].volumes,Number(p),Number(m))}const _={};for(const L of Object.values(S)){_[L.date]||(_[L.date]={date:L.date,entries:[],cityGroups:[],totalAmount:0,count:0,totalVolumes:[]});const k=_[L.date];k.entries.push({customerCode:L.custCode,customerName:L.custName,city:L.city,amount:L.amount,invoiceCount:L.invoiceCount,volumes:$s(L.volumes)}),k.totalAmount+=L.amount,k.count+=L.invoiceCount}for(const L of Object.values(_)){const k={},C={};for(const E of L.entries){k[E.city]=(k[E.city]||0)+1;for(const s of E.volumes)Za(C,s.volumeMl,s.bottles)}L.cityGroups=Object.entries(k).sort((E,s)=>s[1]-E[1]).map(([E,s])=>({city:E,count:s})),L.totalVolumes=$s(C)}return _}async function Na(){return Y("quotes",{select:"id,quote_no,quote_date,valid_until,legacy_customer_code,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function rr(e){const t=await Y("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await Y("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function wd(){const e=new Date().toISOString().slice(0,7)+"-01";return ve("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}async function Ra(){const e=await Y("app_feature_status",{select:"*"}),t={};for(const n of e)t[n.feature_id]={featureId:n.feature_id,confirmedAt:n.confirmed_at,confirmedBy:n.confirmed_by,notes:n.notes};return t}async function ir(e,t){await vt("app_feature_status",{feature_id:e,confirmed_at:new Date().toISOString(),confirmed_by:t,updated_at:new Date().toISOString()})}async function lr(e){await vt("app_feature_status",{feature_id:e,confirmed_at:null,confirmed_by:null,updated_at:new Date().toISOString()})}const Ie={soumu:"総務",route_sales:"ルートセールス",brewing:"造り",bottling:"詰口",labeling:"貼場",delivery:"配送（業務委託）"},$d={soumu:null,route_sales:null,brewing:[9,10,11,12,1,2,3,4],bottling:null,labeling:null,delivery:null},ts={billing:"請求業務",inventory:"棚卸"},as={morning:"午前",afternoon:"午後",both:"終日"};async function ns(){return(await Y("staff_members",{order:"department.asc,employment_type.asc,kana.asc"})??[]).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),kana:v(t,["kana"],""),employmentType:v(t,["employment_type"],"part_time"),department:v(t,["department"],"bottling"),hourlyRate:t.hourly_rate!=null?Number(t.hourly_rate):null,monthlySalary:t.monthly_salary!=null?Number(t.monthly_salary):null,contractFee:t.contract_fee!=null?Number(t.contract_fee):null,workHoursPerDay:T(t,["work_hours_per_day"],8),shiftPreference:t.shift_preference??null,monthlyTasks:Array.isArray(t.monthly_tasks)?t.monthly_tasks:[],availableMonths:Array.isArray(t.available_months)?t.available_months:null,crossDepartments:Array.isArray(t.cross_departments)?t.cross_departments:[],fixedDaysOff:Array.isArray(t.fixed_days_off)?t.fixed_days_off:[],isDeptLeader:t.is_dept_leader===!0,notes:v(t,["notes"],""),isActive:t.is_active!==!1}))}async function cr(e){const t={name:e.name,kana:e.kana??null,employment_type:e.employmentType??"part_time",department:e.department??"bottling",hourly_rate:e.hourlyRate??null,monthly_salary:e.monthlySalary??null,contract_fee:e.contractFee??null,work_hours_per_day:e.workHoursPerDay??8,shift_preference:e.shiftPreference??null,monthly_tasks:e.monthlyTasks??[],available_months:e.availableMonths??null,cross_departments:e.crossDepartments??[],fixed_days_off:e.fixedDaysOff??[],is_dept_leader:e.isDeptLeader??!1,notes:e.notes??null,is_active:e.isActive??!0,updated_at:new Date().toISOString()};return e.id&&(t.id=e.id),!!await vt("staff_members",t)}async function dr(e){return Bn("staff_members",e)}async function pr(e){const[t,n]=e.split("-").map(Number),o=B=>String(B).padStart(2,"0");function r(B,M){const O=M===12?1:M+1,I=M===12?B+1:B;return{startDate:`${B}-${o(M)}-01`,endDate:`${I}-${o(O)}-01`}}let i=0;const c=new Date(t,n-1,1);for(;c.getMonth()===n-1;){const B=c.getDay();B!==0&&B!==6&&i++,c.setDate(c.getDate()+1)}const{startDate:d,endDate:u}=r(t,n),{startDate:h,endDate:g}=r(t-1,n),y=`(sales_date.gte.${d},sales_date.lt.${u})`,$=`(sales_date.gte.${h},sales_date.lt.${g})`,[S,_,L,k,C,E]=await Promise.all([Y("daily_sales_fact",{select:"document_count,total_quantity",and:y}),Y("sales_document_headers",{select:"total_amount",and:y,customer_name:"ilike.*上様*"}),Y("sales_document_headers",{select:"total_amount",and:y}),Y("daily_sales_fact",{select:"document_count,total_quantity",and:$}),Y("sales_document_headers",{select:"total_amount",and:$}),Y("sales_document_headers",{select:"total_amount",and:$,customer_name:"ilike.*上様*"})]),s=S.reduce((B,M)=>B+T(M,["document_count"],0),0),l=Math.round(S.reduce((B,M)=>B+T(M,["total_quantity"],0),0)),p=_.length,m=_.reduce((B,M)=>B+T(M,["total_amount"],0),0),f=L.reduce((B,M)=>B+T(M,["total_amount"],0),0),x=Math.max(0,f-m),b=k.reduce((B,M)=>B+T(M,["document_count"],0),0),w=Math.round(k.reduce((B,M)=>B+T(M,["total_quantity"],0),0)),P=E.reduce((B,M)=>B+T(M,["total_amount"],0),0),D=C.reduce((B,M)=>B+T(M,["total_amount"],0),0),q=Math.max(0,D-P),R=Math.max(0,C.length-E.length);return{monthlyDocumentCount:s,directSalesCount:p,directSalesAmount:m,routeSalesAmount:x,workingDays:i,prevYearDocumentCount:b,prevYearRouteSalesAmount:q,prevYearRouteDocCount:R,prevYearTotalQuantity:w,currentTotalQuantity:l}}async function ur(e){const[t,n]=e.split("-").map(Number),o=h=>String(h).padStart(2,"0"),r=`${t}-${o(n)}-01`,i=n===12?1:n+1,d=`${n===12?t+1:t}-${o(i)}-01`;return(await Y("daily_shift_plans",{select:"id,plan_date,department,staff_member_ids,notes",and:`(plan_date.gte.${r},plan_date.lt.${d})`,order:"plan_date.asc,department.asc"})).map(h=>({id:v(h,["id"],void 0),planDate:v(h,["plan_date"],""),department:v(h,["department"],"soumu"),staffMemberIds:h.staff_member_ids??[],notes:v(h,["notes"],"")}))}async function mr(e,t){const[n,o]=e.split("-").map(Number),r=h=>String(h).padStart(2,"0"),i=`${n}-${r(o)}-01`,c=o===12?1:o+1,u=`${o===12?n+1:n}-${r(c)}-01`;try{const h=new URL("/rest/v1/daily_shift_plans",$e);if(h.searchParams.set("and",`(plan_date.gte.${i},plan_date.lt.${u})`),await fetch(h.toString(),{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}}),t.length===0)return!0;const g=t.map(S=>({plan_date:S.planDate,department:S.department,staff_member_ids:S.staffMemberIds,notes:S.notes||null})),y=new URL("/rest/v1/daily_shift_plans",$e);return(await fetch(y.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(g)})).ok}catch(h){return console.error("saveDailyShiftPlans failed",h),!1}}const j=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Zn,CALENDAR_CATEGORY_LABELS:Xn,CHURN_REASONS:Ya,DEPT_LABEL:Ie,DEPT_LABELS:Ia,DEPT_MONTHS:$d,INVOICE_TYPE_LABELS:$n,JIKOMI_STATUS_LABELS:zo,MATERIAL_CATEGORIES:tr,MONTHLY_TASK_LABEL:ts,PROSPECT_STAGE_COLORS:es,PROSPECT_STAGE_LABELS:Va,ROLE_LABELS:Ta,SEASONAL_TEMPLATES:jn,SHIFT_PREF_LABEL:as,SLACK_EVENT_LABELS:Ma,TAX_DEDUCTION_LABELS:Sn,TAX_RATE_CATEGORIES:Ko,abcPeriodToDates:Kn,addBrewingCustomCategory:El,addBrewingStockEntry:_l,addRiceVariety:bl,addTank:il,autoScheduleAllBatches:dl,batchGeocode:Jc,calcWeeklyLabor:yl,confirmFeature:ir,convertLeadToProspect:sd,createBrewingBatch:nl,createStaff:Ml,deleteBrewingCustomCategory:Ll,deleteBrewingStockEntry:kl,deleteCalendarEvent:wc,deleteMailSender:vc,deleteMaterial:Vc,deletePrintLayout:hc,deleteProspect:Bc,deleteRicePurchaseCommitment:gl,deleteRiceVariety:xl,deleteStaffMember:dr,deleteTank:ll,deleteTankById:Xl,deleteTankMovement:ac,deleteUserProfile:qc,fetchAllBrewingStockEntries:$l,fetchAnalyticsByPeriod:$i,fetchAnnouncements:Vl,fetchAuditLogs:Ic,fetchAvailablePeriods:_i,fetchAvailableProductionTypes:ji,fetchBillList:Jo,fetchBillingSummary:Jn,fetchBrewingAlcoholSettings:Fi,fetchBrewingBatches:Xi,fetchBrewingCategoryOverrides:Dl,fetchBrewingCustomCategories:Pl,fetchBrewingForecastOverrides:Ui,fetchBrewingMonthlyTrend:Ti,fetchBrewingPlanSummary:qi,fetchBrewingProcessSteps:Zi,fetchBrewingProductDetail:Ii,fetchBrewingRiceParams:Hi,fetchBrewingSchedule:Mi,fetchBrewingSeasonalPattern:Qi,fetchBrewingStockEntries:wl,fetchBrewingYearlyShipments:Yi,fetchCalendarEvents:bc,fetchCallLogs:Gc,fetchCategoryTypeLinks:Oi,fetchChurnAlerts:Yl,fetchChurnNotes:Hc,fetchCustomerAnalysis:Ro,fetchCustomerEfficiency:Wl,fetchCustomerEfficiencyByYear:At,fetchCustomerLedger:Vn,fetchCustomerPriceGroup:Ea,fetchCustomerPricing:_n,fetchCustomerProductBreakdown:Li,fetchCustomersWithoutGeo:ar,fetchDailyShiftPlans:ur,fetchDeliveryLocations:Qc,fetchDeliveryNote:Un,fetchDeliverySchedule:Fl,fetchDemandAnalysis:yd,fetchDemandForecasts:jl,fetchEntityMonthlySales:Di,fetchFaxInbox:Pc,fetchFeatureStatuses:Ra,fetchFrequentCustomers:Nl,fetchFrequentProducts:Rl,fetchGenzaishu:oc,fetchIntegrationSettings:Xo,fetchInvoiceLines:wn,fetchInvoices:ea,fetchJikomiList:jo,fetchKenteiList:nc,fetchLabelExclusions:ql,fetchLeadItems:td,fetchLeadLists:ed,fetchMailSenders:fc,fetchMapCustomers:Yc,fetchMasterStats:Fn,fetchMaterialList:Vo,fetchMyProfile:Cc,fetchOrderHeaders:wd,fetchPayableList:Uo,fetchPaymentStatus:ko,fetchPeriodChartData:Ei,fetchPipelineMeta:Po,fetchPrintLayouts:mc,fetchProcurementDecisions:Wi,fetchProductABC:Oo,fetchProductCustomerBreakdown:Ci,fetchProductDaily:Ql,fetchProductMonthlyShipments:zl,fetchProductPower:Kl,fetchProductPrice:kn,fetchProductShipmentsFromTable:Hl,fetchProductionPlan:fd,fetchProspectActivities:zc,fetchProspects:Oc,fetchPurchaseList:Yo,fetchQuoteList:Na,fetchQuoteWithLines:rr,fetchRawMaterialStock:Ho,fetchRawRecords:Pa,fetchRawTableList:or,fetchRicePurchaseCommitments:hl,fetchRiceVarieties:vl,fetchSafetyStockParams:hd,fetchSakeTaxByMonth:Wn,fetchSalesAnalytics:Yn,fetchSalesReport:To,fetchSalesSummary:So,fetchSeasonalProfiles:Jl,fetchShipmentCalendar:xd,fetchShopifyOrders:_c,fetchSlackLogs:Nc,fetchSlackRules:Zo,fetchStaffCustomerBreakdown:ki,fetchStaffList:Il,fetchStaffMembers:ns,fetchStaffProductBreakdown:Pi,fetchStaffTotalsByPeriod:Si,fetchStepLabor:ml,fetchStoreOrders:Wo,fetchStoreSales:Gn,fetchSyncDashboard:Eo,fetchSystemHealth:Ao,fetchSystemSetting:_o,fetchTankList:Fo,fetchTankMovements:Zl,fetchTankMovementsByTank:ec,fetchTanks:rl,fetchTaxDeclaration:Qn,fetchTourInquiriesFromDb:id,fetchTypesInCategory:Al,fetchUserProfiles:Lc,fetchVisitPriorities:Ul,fetchWorkerSettings:pl,fetchWorkflowOrdersFromDb:od,fetchWorkforceMetrics:pr,generateTaxCSV:cc,generateTaxXML:Qo,getTankOccupancy:cl,linkTypeToCategory:Bi,ocrFaxImage:Ec,periodToDateRange:Co,preloadInvoiceLines:Lo,prevYearFilter:Ai,reassignBrewingStockEntry:Sl,recalculateTaxDeclaration:dc,recordAudit:Tc,registerGenzaishu:rc,resolveProductPrice:Hn,saveBrewingAlcoholSetting:Vi,saveBrewingForecastOverride:Ji,saveBrewingRiceParams:Ki,saveBrewingSchedule:Ni,saveCalendarEvent:xc,saveCallLog:nr,saveChurnNote:Kc,saveDailyShiftPlans:mr,saveDeliveryLocation:Wc,saveEmailCampaign:ka,saveFaxRecord:Ac,saveIntegrationSetting:na,saveInvoice:qo,saveKenteiRecord:sc,saveLabelExclusions:Tl,saveLeadItem:sr,saveLeadList:ad,saveMailSender:gc,saveMaterial:Fc,savePrintLayout:yc,saveProcurementDecision:Gi,saveProductionPlan:vd,saveProspect:er,saveProspectActivity:jc,saveRicePurchaseCommitment:fl,saveSafetyStockParamsBulk:gd,saveSlackRule:Mc,saveStoreOrder:uc,saveTank:Gl,saveTankMovement:tc,saveTaxDeclaration:pc,saveTourInquiry:ld,saveUserProfile:Dc,saveWorkerSettings:ul,saveWorkflowOrder:rd,searchPlaces:nd,sendEmailCampaign:Go,sendSlackNotification:Rc,setBrewingCategoryOverride:Cl,submitFeatureRequest:Io,syncGoogleCalendar:kc,syncIvryCallLogs:Xc,syncPhoneBookToIvry:Zc,syncShopifyOrders:$c,unconfirmFeature:lr,unlinkTypeFromCategory:zi,updateBrewingBatch:ol,updateBrewingProcessStep:sl,updateCustomer:Mo,updateProduct:No,upsertBrewingStock:Ri,upsertStaffMember:cr,upsertSystemSetting:Pt},Symbol.toStringTag,{value:"Module"}));function $t(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const _d={open:"未締め",closed:"締め済"};function Sd(e,t){const n=e.customers.map(o=>`
      <tr>
        <td>
          <div class="table-title">${o.customerName}</div>
          <div class="table-sub mono">${o.customerCode}</div>
        </td>
        <td class="numeric">${o.closingDay}日</td>
        <td class="numeric">${$t(o.salesAmount)}</td>
        <td class="numeric">${$t(o.taxAmount)}</td>
        <td class="numeric">${$t(o.prevBalance)}</td>
        <td class="numeric">${$t(o.paymentAmount)}</td>
        <td class="numeric"><strong>${$t(o.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${o.status==="closed"?"success":"warning"}">${_d[o.status]}</span>
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
        <p class="kpi-value">${$t(e.totalBilling)}</p>
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
  `}const kd={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Pd={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function _s(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ia(e){const t=Pd[e],n=kd[e].map(o=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${_s(o.title)}</p>
            <p class="category-card-description">${_s(o.description)}</p>
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
  `}function yr(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Ht(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ed(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${yr(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${Ht(t.amount)}</td>
        </tr>
      `).join("")}function Ad(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${yr(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${Ht(t.amount)}</td>
        </tr>
      `).join("")}function Ld(e,t){return`
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
            <dd>${Ht(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${Ht(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${Ht(e.balanceAmount)}</dd>
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
            <tbody>${Ed(e)}</tbody>
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
            <tbody>${Ad(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function Nt(e,t,n){const o=e.findIndex(i=>i.column===t);if(o>=0){if(e[o].direction==="asc"){const c=[...e];return c[o]={column:t,direction:"desc"},c}return e.filter((c,d)=>d!==o)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function Cd(e,t){const n=e.findIndex(i=>i.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const o=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${o}${r}</span>`}function oe(e,t,n,o=""){return`<th class="sortable ${o}" data-sort-col="${e}">${t} ${Cd(n,e)}</th>`}function Ss(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function Dt(e,t,n){return t.length===0?e:[...e].sort((o,r)=>{for(const{column:i,direction:c}of t){const d=n[i];if(!d)continue;const u=Ss(o[d]),h=Ss(r[d]);let g=0;if(typeof u=="number"&&typeof h=="number"?g=u-h:g=String(u).localeCompare(String(h),"ja"),g!==0)return c==="asc"?g:-g}return 0})}const Dd={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},ks={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},Rt={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function qd(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function Td(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Id(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function hr(e,t){const n=Td(t),o=Id(t),[r,i]=t.split("-").map(Number),c=new Map;e.forEach(l=>{if(l.date.slice(0,7)===t){const p=l.date.slice(0,10);c.has(p)||c.set(p,[]),c.get(p).push(l)}});const d=e.filter(l=>l.date.slice(0,7)===t),u=d.reduce((l,p)=>l+p.quantity,0),h=new Set(d.map(l=>l.date)).size,g=new Date().toISOString().slice(0,10),y=["日","月","火","水","木","金","土"].map(l=>`<th class="dcal-header">${l}</th>`).join("");let $="",S=1;for(let l=0;l<6&&!(S>n&&l>0);l++){$+="<tr>";for(let p=0;p<7;p++)if(l===0&&p<o||S>n)$+='<td class="dcal-cell dcal-empty"></td>';else{const m=`${r}-${String(i).padStart(2,"0")}-${String(S).padStart(2,"0")}`,f=c.get(m)||[],x=m===g,b=f.reduce((w,P)=>w+P.quantity,0);$+=`
          <td class="dcal-cell ${x?"dcal-today":""}">
            <div class="dcal-day">${S}</div>
            ${f.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${f[0].status}">${f.length}件 ${b}本</div>
              </div>
            `:""}
          </td>`,S++}$+="</tr>"}const[_,L]=i===1?[r-1,12]:[r,i-1],[k,C]=i===12?[r+1,1]:[r,i+1],E=`${_}-${String(L).padStart(2,"0")}`,s=`${k}-${String(C).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${i}月: ${h}日稼働 / ${d.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${E}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${i}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${s}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${y}</tr></thead>
        <tbody>${$}</tbody>
      </table>
    </section>
  `}function Md(e,t){const n=t==="all"?e:e.filter(d=>d.segment===t),o={all:e.length};e.forEach(d=>{o[d.segment]=(o[d.segment]??0)+1});const i=["all",...[...new Set(e.map(d=>d.segment))]].map(d=>`
      <button class="button ${t===d?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${d}">
        ${d==="all"?"全て":ks[d]??d} (${o[d]??0})
      </button>
    `).join(""),c=n.map(d=>`
      <tr>
        <td class="mono">${d.code}</td>
        <td>${d.name}</td>
        <td><span class="segment-badge" style="background:${Rt[d.segment]??"#718096"};">${ks[d.segment]??d.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${Rt.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${Rt["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${Rt["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${Rt["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function Nd(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${hr(e.deliveries,e.calendarMonth)}
    ${Md(e.forecasts,e.selectedSegment)}
  `}function Rd(e,t){return hr(e,t)}const la={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function Ps(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function en(e,t,n){if(t==="all")return e;const o=new Date,r=o.toISOString().slice(0,10),i=new Date(o);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===r);case"month":return e.filter(c=>c.date.slice(0,7)===r.slice(0,7));case"future":{const c=new Date(o.getFullYear(),o.getMonth(),1).toISOString().slice(0,10);return e.filter(d=>d.date.slice(0,10)>=c)}case"90days":return i.setDate(i.getDate()-90),e.filter(c=>c.date>=i.toISOString());case"year":return i.setFullYear(i.getFullYear()-1),e.filter(c=>c.date>=i.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const d=c.date.slice(0,10);return d>=n.start&&d<=n.end})}}function Te(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function tn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Od(e){const o={top:20,right:20,bottom:30,left:50},r=760-o.left-o.right,i=260-o.top-o.bottom,c=Math.max(...e.map(g=>g.amount),1),d=r/e.length,u=e.map((g,y)=>{const $=g.amount/c*i,S=o.left+y*d+4,_=o.top+i-$,L=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(g.date));return`
        <g>
          <rect x="${S}" y="${_}" width="${Math.max(d-8,8)}" height="${$}" rx="4" fill="#0F5B8D" opacity="${.58+y/e.length*.34}" />
          ${y%5===0?`<text x="${S+6}" y="252" class="chart-axis">${L}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(g=>{const y=o.top+i-i*g,$=Math.round(c*g/1e3);return`
        <g>
          <line x1="${o.left}" y1="${y}" x2="${760-o.right}" y2="${y}" class="chart-grid" />
          <text x="6" y="${y+4}" class="chart-axis">${$.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function Bd(e,t,n,o,r="month",i,c=[]){const d={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=en(e.allDailySales,r,i),h=u.reduce((z,V)=>z+V.amount,0),g=u.reduce((z,V)=>z+V.bottles,0),y=u.reduce((z,V)=>z+V.volumeMl,0),$=u.length,S=g>0?Math.round(h/g):0,_=y>0?Math.round(h/(y/1e3)):0,L=new Date,k=L.toISOString().slice(0,10),C=k.slice(0,7),E=en(e.allDailySales,"month").filter(z=>z.date.slice(0,10)<=k),s=E.reduce((z,V)=>z+V.amount,0);E.reduce((z,V)=>z+V.bottles,0);const l=L.getDate();new Date(L.getFullYear(),L.getMonth()+1,0).getDate();const m=(o?.orderHeaders??[]).filter(z=>z.sales_date.slice(0,7)===C),f=m.reduce((z,V)=>z+Number(V.total_amount),0),x=m.length,b=en(e.allDailySales,"month"),w=b.reduce((z,V)=>z+V.bottles,0),P=f>0?f:b.reduce((z,V)=>z+V.amount,0),D=f>0?"orders":"extrapolation",R=(u.length>0?e.allDailySales.filter(z=>{const V=u[0]?.date??"",U=u[u.length-1]?.date??"",G=Ps(V,-1),H=Ps(U,-1);return z.date>=G&&z.date<=H}):[]).reduce((z,V)=>z+V.amount,0),B=R>0?(h-R)/R*100:0,M=B>0?"+":"",O=e.salesRecords.slice(0,10).map(z=>`
            <tr class="clickable-row" data-doc-no="${z.documentNo}" style="cursor:pointer">
              <td class="mono">${z.documentNo}</td>
              <td>${tn(z.date)}</td>
              <td>${z.customerName}</td>
              <td class="numeric">${Te(z.amount)}</td>
            </tr>
          `).join(""),I=["today","month","future","90days","year","all"].map(z=>`<button class="button ${z===r?"primary":"secondary"} small" type="button" data-period="${z}">${la[z]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${d[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${tn(t.lastSyncAt)}</span>
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
        <p class="kpi-value">${Te(s)}</p>
        <p class="kpi-sub">${l}日経過 / ${E.length}営業日 / 日平均 ${E.length>0?Te(Math.round(s/E.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${Te(P)}</p>
        <p class="kpi-sub">${D==="orders"?`受注確定 ${x}件`:`出荷見込 ${w.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
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
        <p class="panel-title">${la[r]}売上</p>
        <p class="kpi-value">${Te(h)}</p>
        <p class="kpi-sub">${$}日間${$>0?` / 日平均 ${Te(Math.round(h/$))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${g.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${Te(S)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(y/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${Te(_)}</p>
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
            <p class="panel-caption">${la[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${Od(u.length>0?u:e.dailySales)}
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
              <dd>${tn(t.lastSyncAt)}</dd>
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
          <p class="panel-caption">${la[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
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
          <tbody>${Dt(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(z=>`
            <tr>
              <td class="mono">${z.date.slice(0,10)}</td>
              <td class="numeric">${Te(z.amount)}</td>
              <td class="numeric">${z.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(z.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${Te(z.pricePerBottle)}</td>
              <td class="numeric">${Te(z.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${o?zd(o):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function zd(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(d=>d.startsAt.slice(0,10)>=t).slice(0,5),o=e.tourInquiries.filter(d=>d.status==="new").length,r=e.churnSummary,i=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,c=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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

    ${e.deliveries&&e.deliveries.length>0?Rd(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?jd(e.orderHeaders):""}
  `}function jd(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),o=new Date().toISOString().slice(0,10),r=o.slice(0,7),i=new Map;for(const y of e){const $=y.sales_date.slice(0,7),S=i.get($)??{count:0,total:0};i.set($,{count:S.count+1,total:S.total+Number(y.total_amount)})}const c=[...i.keys()].sort(),d=e.reduce((y,$)=>y+Number($.total_amount),0),u=c.map(y=>{const{count:$,total:S}=i.get(y);return`<tr>
      <td class="mono" style="font-weight:700;">${y===r?`${y}（当月）`:y}</td>
      <td class="numeric">${$.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(S)}</td>
    </tr>`}).join(""),h=e.filter(y=>y.sales_date>=o).slice(0,30),g=h.map(y=>`<tr>
    <td class="mono">${y.sales_date}</td>
    <td>${y.customer_name||"―"}</td>
    <td class="numeric">${t.format(Number(y.total_amount))}</td>
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
      ${h.length>0?`
      <div class="panel-header" style="margin-top:16px;">
        <div><h3 style="font-size:13px;font-weight:600;">本日以降の受注（${h.length}件）</h3></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>受注日</th><th>得意先</th><th class="numeric">金額</th></tr></thead>
          <tbody>${g}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function Fd(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function _t(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Vd(e,t){const n=e.lines.length?e.lines.map((r,i)=>`
          <tr>
            <td class="numeric">${i+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${_t(r.unitPrice)}</td>
            <td class="numeric">${_t(r.amount)}</td>
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
            <tr><th>納品日</th><td>${Fd(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${_t(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${_t(o)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${_t(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${_t(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function je(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Yd(e){return je(e).replaceAll(`
`,"<br />")}function Ud(e){const n=[...Object.values(jn),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${je(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),o=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${je(r.name)}</span>
              <span class="table-sub">${je(r.email)} / ${je(r.area)}</span>
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
          <input id="email-subject" type="text" value="${je(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${je(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${je(r.name)} &lt;${je(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${je(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?Yd(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${je(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function ze(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ca(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function Jd(e,t){const n=[ca("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ze(r.name)}</strong>
            <span class="table-sub mono">${ze(r.code)}</span>
          </button>
        `)),ca("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ze(r.name)}</strong>
            <span class="table-sub mono">${ze(r.code)}</span>
          </button>
        `)),ca("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${ze(r.documentNo)}</strong>
            <span class="table-sub">${ze(r.customerName)} / ${ze(r.date)}</span>
          </button>
        `)),ca("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${ze(r.path)}"
          >
            <strong>${ze(r.title)}</strong>
            <span class="table-sub mono">${ze(r.path)}</span>
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
            value="${ze(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||o}
          </div>
        </div>
      </div>
    </div>
  `}function Ot(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function fr(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${Ot(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${Ot(e.title)}">
        <div class="modal-header">
          <h2>${Ot(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${Ot(e.placeholder)}"
            value="${Ot(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function Ze(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Es(e){return e.trim().toLowerCase()}function Hd(e,t,n=[]){const o=Es(t),r=e.filter(d=>o?[d.code,d.name,d.kanaName,d.shortName].map(Es).some(u=>u.includes(o)):!0).slice(0,50),i=!o&&n.length>0?`<div style="padding:8px 12px;border-bottom:2px solid var(--border,#e5e7eb);">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#6b7280);margin-bottom:6px;">よく使う得意先</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${n.map(d=>`<button class="freq-chip" type="button" data-action="picker-select" data-code="${Ze(d.code)}" data-name="${Ze(d.name)}">${Ze(d.name)} <small style="opacity:0.6">${d.count}件</small></button>`).join("")}
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
                      data-code="${Ze(d.code)}"
                      data-name="${Ze(d.name)}"
                    >
                      <td class="mono">${Ze(d.code)}</td>
                      <td>${Ze(d.name)}</td>
                      <td style="font-size:0.8rem;color:var(--text-muted,#6b7280)">${Ze(d.kanaName||"")}</td>
                      <td>${d.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:i;return fr({title:"得意先検索",searchQuery:t,placeholder:"コード・名前・カナで検索",resultsHtml:c,emptyMessage:"該当する得意先が見つかりません。"})}function As(e){return e.toISOString().slice(0,10)}function Le(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ct(e,t){return e[t]?`<div class="field-error">${Le(e[t])}</div>`:""}function St(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function Kd(e,t,n,o,r,i,c){const d=Object.keys($n).map(L=>`<option value="${L}" ${e.invoiceType===L?"selected":""}>${$n[L]}</option>`).join(""),u=r.map(L=>`<option value="${Le(L.code)}" ${e.registeredBy===L.code?"selected":""}>${Le(L.name)}（${Le(L.code)}）</option>`).join(""),h=e.staffCode?(()=>{const L=r.find(k=>k.code===e.staffCode);return L?`${L.name}（${L.code}）`:e.staffCode})():"—",g=i.length>0?`<div class="freq-chips">
        <span class="freq-label">よく使う:</span>
        ${i.map(L=>`<button class="freq-chip" type="button" data-action="select-freq-customer" data-code="${Le(L.code)}" data-name="${Le(L.name)}" title="${L.count}件">${Le(L.name)}</button>`).join("")}
      </div>`:"",y=c.length>0?`<div class="freq-chips">
        <span class="freq-label">よく使う:</span>
        ${c.map(L=>`<button class="freq-chip" type="button" data-action="select-freq-product" data-code="${Le(L.code)}" data-name="${Le(L.name)}" title="${L.count}回">${Le(L.name)}</button>`).join("")}
      </div>`:"",$=e.lines.map((L,k)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${St(o,`lines.${k}.productCode`,"input-cell")}" type="text" data-line="${k}" data-field="productCode" value="${Le(L.productCode)}" placeholder="商品コード" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${k}" aria-label="商品検索">🔍</button>
          </div>
          ${ct(o,`lines.${k}.productCode`)}
        </td>
        <td>
          <input class="${St(o,`lines.${k}.productName`,"input-cell")}" type="text" data-line="${k}" data-field="productName" value="${Le(L.productName)}" placeholder="商品名" data-autofill="product-name" />
          ${ct(o,`lines.${k}.productName`)}
        </td>
        <td>
          <input class="${St(o,`lines.${k}.quantity`,"input-cell numeric")}" type="number" data-line="${k}" data-field="quantity" value="${L.quantity}" min="0" />
          ${ct(o,`lines.${k}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${k}" data-field="unit" value="${L.unit}" placeholder="本" /></td>
        <td>
          <input class="${St(o,`lines.${k}.unitPrice`,"input-cell numeric")}" type="number" data-line="${k}" data-field="unitPrice" value="${L.unitPrice}" min="0" />
          ${ct(o,`lines.${k}.unitPrice`)}
        </td>
        <td class="numeric">${L.amount>0?L.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${k}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${k}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),S=e.lines.reduce((L,k)=>L+k.amount,0),_=Math.floor(S*10/110);return`
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
          <input class="${St(o,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||As(new Date)}" />
          ${ct(o,"invoiceDate")}
        </label>
        <label class="field">
          <span>納品日</span>
          <input id="inv-delivery-date" type="date" value="${e.deliveryDate||e.invoiceDate||As(new Date)}" />
          <div class="form-hint">空欄の場合は伝票日付と同じ</div>
        </label>
      </div>

      <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
        <label class="field">
          <span>得意先</span>
          <div class="input-group">
            <input
              class="${St(o,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="コードまたは名前で検索"
              value="${Le(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">コード・名前・カナで検索できます</div>
          ${ct(o,"customerCode")}
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
          <div class="staff-display" id="inv-sales-staff">${Le(h)}</div>
          <div class="form-hint">得意先に紐づく営業担当（自動セット）</div>
        </div>
      </div>

      ${g}

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
      ${ct(o,"lines")}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${e.lines.length} 行</p>
        </div>
        <button class="button secondary" data-action="add-line">＋ 行追加</button>
      </div>
      ${y}
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
          <span class="total-value">${(S-_).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${_.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${S.toLocaleString("ja-JP")} 円</span>
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
  `}function Qd(e){return"¥"+e.toLocaleString("ja-JP")}function Wd(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const Gd={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},Xd={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},Zd={sake:"酒販用",standard:"通常"};function ep(e,t,n="",o=""){const r=n?e.filter(u=>u.legacy_customer_code===n):e,i=8,c=t?`<tr><td colspan="${i}" class="empty-row">読み込み中…</td></tr>`:r.length===0?`<tr><td colspan="${i}" class="empty-row">見積書がありません</td></tr>`:r.map(u=>`
      <tr>
        <td class="mono">${u.quote_no}</td>
        <td>${Wd(u.quote_date)}</td>
        <td>${u.customer_name||"（未選択）"}</td>
        <td>${u.subject||""}</td>
        <td class="numeric">${Qd(u.total_amount)}</td>
        <td><span class="badge ${Xd[u.status]??"badge-gray"}">${Gd[u.status]??u.status}</span></td>
        <td>${Zd[u.template_type]??u.template_type}</td>
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
  `}const gr="kanei-quote-settings",vr=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Aa={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Pn(){try{const e=localStorage.getItem(gr);if(e)return{...Aa,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Aa,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Aa}}function ht(e){localStorage.setItem(gr,JSON.stringify(e))}function Ue(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function qe(e,t,n,o="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${o}" id="${e}" value="${Ue(n)}" placeholder="${Ue(r)}" /></div>`}function tp(e,t,n,o){const r=o.map(i=>`<option value="${Ue(i)}" ${n===i?"selected":""}>${Ue(i)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function ap(e){return`
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
        ${tp("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
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
        ${vr.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${Ue(t.value)}"
            title="${Ue(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${Ue(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${Ue(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${Ue(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${Ue(e.accentColor||"#0968e5")}</code>
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
  `}function np(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Oa(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:np(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Oa();function ae(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Re(e){return"¥"+e.toLocaleString("ja-JP")}function Ls(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function br(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function xr(e,t,n){return"#"+[e,t,n].map(o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0")).join("")}function Ba(e,t){const[n,o,r]=br(e);return xr(n+(255-n)*t,o+(255-o)*t,r+(255-r)*t)}function wr(e,t){const[n,o,r]=br(e);return xr(n*(1-t),o*(1-t),r*(1-t))}function sp(e){const t=wr(e,.15),n=Ba(e,.88),o=Ba(e,.96);return`
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
`}function op(e){const t=wr(e,.15),n=Ba(e,.88),o=Ba(e,.96);return`
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
`}function $r(e,t){const n=e.lines.reduce((_,L)=>_+L.amount,0),o=Math.round(n*e.taxRate/100),r=n+o,i=e.templateType==="sake",c=i?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",d=i?9:6,u=e.lines.map((_,L)=>{const k=i?`<td style="font-size:9px;">${ae(_.janCode)}</td><td style="text-align:center;">${_.caseQty??""}</td><td style="text-align:right;">${_.retailPrice!=null?Re(_.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${L+1}</td>
      <td class="mono" style="font-size:9px;">${ae(_.productCode)}</td>
      <td>${ae(_.productName)}</td>
      ${k}
      <td style="text-align:right;">${_.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${ae(_.unit)}</td>
      <td style="text-align:right;">${Re(_.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${d}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,h=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),g=h?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${ae(h)}</p>
    </div>
  `:"",y=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",$=[];e.validUntil&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${Ls(e.validUntil)}</div></div>`),e.paymentTerms&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${ae(e.paymentTerms)}</div></div>`),e.deliveryDate&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${ae(e.deliveryDate)}</div></div>`),e.deliveryPlace&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${ae(e.deliveryPlace)}</div></div>`);const S=$.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min($.length,4)},1fr);">${$.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${ae(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${Ls(e.quoteDate)}</span></div>
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
        ${y}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${ae(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${ae(t.companyAddress1)}${t.companyAddress2?" "+ae(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${ae(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${ae(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${ae(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${S}

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
      <tr><td colspan="${d-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Re(o)}</td></tr>
      <tr class="q-total-row"><td colspan="${d-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Re(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${ae(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${ae(t.defaultFooterNote)}</p>`:""}

  ${g}
</div>`}function _r(e,t,n,o,r,i,c){const d=e.lines.reduce((_,L)=>_+L.amount,0),u=Math.round(d*e.taxRate/100),h=d+u,g=e.templateType==="sake",y=o.length>=1?t.filter(_=>_.name.includes(o)||_.code.includes(o)).slice(0,8):[],$=r.length>=1?n.filter(_=>_.name.includes(r)||_.code.includes(r)).slice(0,8):[];if(e.previewMode){const _=c.accentColor||"#0968e5";return`
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
        ${op(_)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${$r(e,c)}
      </div>
    `}const S=e.lines.map((_,L)=>{const k=g?`
      <td><input type="text" class="jan-input" data-line-idx="${L}" value="${ae(_.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${L}" value="${_.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${L}" value="${_.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${ae(_.productCode)}</td>
      <td>${ae(_.productName)}</td>
      ${k}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${L}" value="${_.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${ae(_.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${L}" value="${_.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${Re(_.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${L}">×</button></td>
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
          ${vr.map(_=>`
            <button type="button" data-action="set-accent-color" data-color="${ae(_.value)}" title="${ae(_.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===_.value?"#333":"transparent"};background:${ae(_.value)};cursor:pointer;"></button>
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
        <input type="text" id="q-cust-search" value="${ae(o)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${y.length>0?`<div class="search-results">${y.map(_=>`
        <button class="search-item" type="button" data-select-customer="${_.code}" data-cust-name="${ae(_.name)}" data-cust-addr="${ae(_.address1||"")}">
          <span class="mono">${_.code}</span> ${ae(_.name)}
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
      ${$.length>0?`<div class="search-results">${$.map(_=>{const L=i?Hn(_,i):{price:_.salePrice||0,label:"卸価格"},k=_.listPrice||0,C=L.label!=="標準価格"&&L.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${_.code}" data-prod-name="${ae(_.name)}" data-prod-price="${L.price}" data-prod-retail="${k}" data-prod-jan="${ae(_.janCode??"")}" data-prod-unit="${ae(_.unit??"本")}" data-prod-case="${_.caseQty??""}">
          <span class="mono">${_.code}</span> ${ae(_.name)}
          <span class="numeric" ${C?'style="color:#2f855a;font-weight:700;"':""}>納入 ${L.price?Re(L.price):"未設定"} <small>(${L.label})</small>${k?`　定価 ${Re(k)}`:""}</span>
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
          <textarea id="q-remarks" rows="3">${ae(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${Re(d)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${Re(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${Re(h)}</span></div>
        </div>
      </div>
    </section>
  `}async function rp(e,t){const n=t.accentColor||"#0968e5",o=document.createElement("div");o.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",o.innerHTML=`<style>${sp(n)}</style>${$r(e,t)}`,document.body.appendChild(o);try{const[{default:r},{jsPDF:i}]=await Promise.all([N(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),N(()=>import("./jspdf.es.min-Z_63DVrt.js").then(_=>_.j),[])]),c=await r(o,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),d=210,u=297,h=c.width/d,g=u*h,y=new i({orientation:"portrait",unit:"mm",format:"a4"});let $=0,S=0;for(;$<c.height;){S>0&&y.addPage();const _=Math.min(g,c.height-$),L=document.createElement("canvas");L.width=c.width,L.height=Math.ceil(_);const k=L.getContext("2d");k.fillStyle="#ffffff",k.fillRect(0,0,L.width,L.height),k.drawImage(c,0,$,c.width,_,0,0,c.width,_);const C=L.toDataURL("image/jpeg",.95),E=_/h;y.addImage(C,"JPEG",0,0,d,E),$+=g,S++}y.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(o)}}function da(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function Sr(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function kr(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function Pr(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function ip(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function lp(e,t,n,o,r){const i=new Map,c=new Map;for(const g of e){if(g.date>=t&&g.date<=n){const y=i.get(g.productCode);y?(y.amt+=g.amount,y.qty+=g.qty):i.set(g.productCode,{name:g.productName,vol:g.volumeMl,amt:g.amount,qty:g.qty})}g.date>=o&&g.date<=r&&c.set(g.productCode,(c.get(g.productCode)??0)+g.amount)}const d=[...i.entries()].map(([g,y])=>({code:g,...y})).sort((g,y)=>y.amt-g.amt),u=d.reduce((g,y)=>g+y.amt,0);let h=0;return d.map(g=>{h+=g.amt;const y=u>0?Math.round(g.amt*1e4/u)/100:0,$=h<=u*.7?"A":h<=u*.9?"B":"C",S=c.get(g.code)??0,_=S>0?Math.round((g.amt-S)/S*1e3)/10:null;return{code:g.code,name:g.name,volumeMl:g.vol,amount:g.amt,qty:g.qty,sharePct:y,rank:$,prevAmount:S,growthRate:_}})}function cp(e,t,n){const o=new Date,r=o.toISOString().slice(0,10);let i=r,c=r,d="";switch(e){case"week":{const g=new Date(o);g.setDate(g.getDate()-7),i=g.toISOString().slice(0,10),c=r,d="直近7日間";break}case"month":{i=r.slice(0,7)+"-01",c=r,d="当月";break}case"90days":{const g=new Date(o);g.setDate(g.getDate()-90),i=g.toISOString().slice(0,10),c=r,d="直近90日間";break}case"year":{const g=new Date(o);g.setFullYear(g.getFullYear()-1),i=g.toISOString().slice(0,10),c=r,d="直近1年間";break}case"custom":{i=t||r,c=n||r,d=`${i} 〜 ${c}`;break}}const u=new Date(i);u.setFullYear(u.getFullYear()-1);const h=new Date(c);return h.setFullYear(h.getFullYear()-1),{start:i,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:h.toISOString().slice(0,10),label:d}}function dp(e,t="all",n=[],o="year",r,i,c=[]){const d=cp(o,r,i),u=n.length>0?lp(n,d.start,d.end,d.prevStart,d.prevEnd):e.map(E=>({code:E.code,name:E.name,volumeMl:E.volumeMl,amount:E.yearAmount,qty:E.yearQty,sharePct:E.sharePct,rank:E.rank,prevAmount:E.prevAmount,growthRate:E.growthRate})),h=u.filter(E=>E.rank==="A").length,g=u.filter(E=>E.rank==="B").length,y=u.filter(E=>E.rank==="C").length,$=u.filter(E=>E.growthRate!=null&&E.growthRate>10),S=u.filter(E=>E.growthRate!=null&&E.growthRate<-10);let _=u,L="全商品";switch(t){case"A":_=u.filter(E=>E.rank==="A"),L="Aランク";break;case"B":_=u.filter(E=>E.rank==="B"),L="Bランク";break;case"C":_=u.filter(E=>E.rank==="C"),L="Cランク";break;case"growing":_=$,L="成長商品(+10%以上)";break;case"declining":_=S,L="衰退商品(-10%以下)";break}const k=(E,s,l)=>`<button class="button ${t===E?"primary":"secondary"} small" data-product-filter="${E}">${s} (${l})</button>`,C=(E,s)=>`<button class="button ${o===E?"primary":"secondary"} small" data-product-period="${E}">${s}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${C("week","週次")}
        ${C("month","月次")}
        ${C("90days","90日")}
        ${C("year","年間")}
        ${C("custom","指定期間")}
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
        <p class="kpi-value">${h} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">Bランク（70-90%）</p>
        <p class="kpi-value">${g} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${$.length}</p>
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
        <h2>${L} (${_.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${k("all","全て",u.length)}
        ${k("A","A",h)}
        ${k("B","B",g)}
        ${k("C","C",y)}
        ${k("growing","成長",$.length)}
        ${k("declining","衰退",S.length)}
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
            ${Dt(_,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(E=>`
              <tr>
                <td>${kr(E.rank)}</td>
                <td>${E.name?E.name.slice(0,25):E.code}${E.volumeMl?` <small>${E.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${Sr(E.amount)}</td>
                <td class="numeric">${E.sharePct}%</td>
                <td class="numeric">${E.qty.toLocaleString()}</td>
                <td class="numeric">${Pr(E.growthRate)}</td>
              </tr>
            `).join("")}
            ${_.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function pp(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,o="billing",r="jan"){const i=e.filter(S=>S.currentRank==="A").length,c=e.filter(S=>S.prevRank&&S.currentRank<S.prevRank).length,d=e.filter(S=>S.prevRank&&S.currentRank>S.prevRank).length,u=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,h=2011,g=[];for(let S=u;S>=h&&g.length<6;S--)g.push(S);const y=`
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
        ${Array.from({length:u-h+1},(S,_)=>u-_).filter(S=>!g.includes(S)).map(S=>`<option value="${S}" ${S===n?"selected":""}>${S}年度</option>`).join("")}
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
        <p class="kpi-value">${i} ${o==="billing"?"社":"店舗"}</p>
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
      ${y}
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
            ${Dt(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(S=>`
              <tr>
                <td>${kr(S.currentRank)}</td>
                <td>${S.name||S.code}</td>
                <td class="numeric">${Sr(S.yearAmount)}</td>
                <td class="numeric">${S.sharePct}%</td>
                <td class="numeric">${S.orderDays}日</td>
                <td class="numeric">${Pr(S.growthRate)}</td>
                <td>${ip(S.currentRank,S.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function up(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function La(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function mp(e,t,n=null,o=null){const r=e.length?e.map(i=>`
            <tr class="clickable-row${i.documentNo===n?" selected-row":""}"
                data-doc-no="${i.documentNo}">
              <td class="mono">${i.documentNo}</td>
              <td>${up(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${i.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${La(i.amount)}</td>
            </tr>
            ${i.documentNo===n?yp(o):""}
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
  `}function yp(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(o=>`
      <tr>
        <td class="mono" style="width:40px">${o.lineNo}</td>
        <td class="mono" style="width:70px">${o.productCode}</td>
        <td class="product-name">${o.productName}</td>
        <td class="numeric" style="width:50px">${o.quantity}</td>
        <td class="numeric" style="width:80px">${La(o.unitPrice)}</td>
        <td class="numeric" style="width:90px">${La(o.amount)}</td>
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
            <td class="numeric">${La(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function hp(e){return new Date(e.getFullYear(),e.getMonth(),1)}function fp(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Er(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Ar(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Cs(e){const t=Er(Ar(e),6);return t.setHours(23,59,59,999),t}function Ds(e){return new Date(`${e}T00:00:00`)}function qs(e){return`${e.getMonth()+1}/${e.getDate()}`}function gp(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function vp(){const e=new Date,t=Ar(fp(hp(e),-3)),n=Cs(new Date(e.getFullYear(),e.getMonth()+4,0)),o=[];let r=new Date(t);for(;r<=n;){const i=Cs(r);o.push({start:new Date(r),end:i,label:`${qs(r)} - ${qs(i)}`}),r=Er(r,7)}return o}function bp(e){const t=vp(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,o=t.map(i=>`
        <div class="gantt-week">
          <span>${i.label}</span>
        </div>
      `).join(""),r=e.length?e.map(i=>{const c=Ds(i.startDate),d=Ds(i.expectedDoneDate),u=Math.max(0,t.findIndex(y=>y.end>=c)),h=Math.max(u,t.reduce((y,$,S)=>$.start<=d?S:y,u)),g=[`仕込番号: ${i.jikomiNo}`,`銘柄: ${i.productName}`,`期間: ${i.startDate} - ${i.expectedDoneDate}`,`タンク: ${i.tankNo}`,`備考: ${i.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${i.jikomiNo}</strong>
                <span class="table-sub">${i.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${i.status}"
                  style="grid-column:${u+1} / ${h+2}"
                  title="${gp(g)}"
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
          ${o}
        </div>
        ${r}
      </div>
    </section>
  `}function Ts(e,t){const n={planned:"neutral",active:"warning",done:"success"},o=e.map(d=>`
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
          <span class="status-pill ${n[d.status]}">${zo[d.status]}</span>
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
          <tbody>${o||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Is(e){return e.toLocaleString("ja-JP")}const xp=["純米大吟醸酒","大吟醸酒","純米吟醸酒","吟醸酒","特別純米酒","純米酒","特別本醸造酒","本醸造酒","普通酒"];function wp(e,t=[],n=!1,o){const r={pending:"検定待ち",submitted:"検定済",approved:"現在酒登録済"},i={pending:"neutral",submitted:"warning",approved:"success"},c=e.map(y=>`
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:6px 8px;font-size:12px;font-weight:600;">${y.batchCode||y.kenteiNo}</td>
      <td style="padding:6px 8px;font-size:12px;">${y.productName||"―"}</td>
      <td style="padding:6px 8px;font-size:12px;">${y.kenteiDate||"―"}</td>
      <td style="padding:6px 8px;font-size:12px;">${y.productionTypeName||"―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${y.alcoholDegree||"―"}%</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${y.sakaMeterValue||"―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${y.acidity||"―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${y.aminoAcid||"―"}</td>
      <td style="padding:6px 8px;font-size:12px;">${y.riceType||"―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${y.polishRate?(y.polishRate*100).toFixed(0)+"%":"―"}</td>
      <td style="padding:6px 8px;font-size:12px;text-align:right;">${y.volume>0?Is(y.volume)+"L":"―"}</td>
      <td style="padding:6px 8px;"><span class="status-pill ${i[y.status]}">${r[y.status]}</span></td>
      <td style="padding:6px 4px;white-space:nowrap;">
        <button class="button-sm secondary" data-action="kentei-edit" data-id="${y.id}" style="margin-right:4px;">編集</button>
        ${y.status!=="approved"?`<button class="button-sm primary" data-action="kentei-register" data-id="${y.id}">現在酒登録</button>`:""}
      </td>
    </tr>`).join(""),d=xp.map(y=>`<option value="${y}" ${o?.productionTypeName===y?"selected":""}>${y}</option>`).join(""),u=new Date().toISOString().slice(0,10),h=n?`
    <section class="panel" style="margin-bottom:16px;border:2px solid #2563eb;">
      <div class="panel-header"><h2>${o?"検定記録編集":"検定記録登録"}</h2></div>
      <input type="hidden" id="kentei-edit-id" value="${o?.id??""}">
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;padding:8px 0;font-size:12px;">
        <label>仕込番号<br><input id="kf-batch" type="text" value="${o?.batchCode??""}" style="width:90px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>銘柄名<br><input id="kf-name" type="text" value="${o?.productName??""}" style="width:120px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>検定日<br><input id="kf-date" type="date" value="${o?.kenteiDate??u}" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>特定名称<br><select id="kf-type" style="padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"><option value="">選択</option>${d}</select></label>
        <label>度数<br><input id="kf-alc" type="number" step="0.1" value="${o?.alcoholDegree??""}" placeholder="%" style="width:50px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>日本酒度<br><input id="kf-sake" type="number" step="0.1" value="${o?.sakaMeterValue??""}" style="width:55px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>酸度<br><input id="kf-acid" type="number" step="0.01" value="${o?.acidity??""}" style="width:50px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>アミノ酸度<br><input id="kf-amino" type="number" step="0.01" value="${o?.aminoAcid??""}" style="width:55px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>使用米<br><input id="kf-rice" type="text" value="${o?.riceType??""}" style="width:80px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>精米歩合<br><input id="kf-polish" type="number" step="0.01" value="${o?.polishRate??""}" placeholder="0.60" style="width:55px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>数量(L)<br><input id="kf-vol" type="number" step="1" value="${o?.volume??""}" style="width:60px;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <button class="button primary" data-action="kentei-save" style="font-size:12px;padding:5px 14px;">保存</button>
        <button class="button secondary" data-action="kentei-cancel" style="font-size:12px;padding:5px 10px;">閉じる</button>
      </div>
    </section>`:"",g=t.map(y=>`
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:5px 8px;font-size:12px;font-weight:600;">${y.batchCode}</td>
      <td style="padding:5px 8px;font-size:12px;">${y.productName}</td>
      <td style="padding:5px 8px;font-size:12px;">${y.productionTypeName||"―"}</td>
      <td style="padding:5px 8px;font-size:12px;">${y.tankNo||"―"}</td>
      <td style="padding:5px 8px;font-size:12px;text-align:right;">${Is(y.volumeL)}L</td>
      <td style="padding:5px 8px;font-size:12px;text-align:right;">${y.alcoholDegree??"―"}%</td>
      <td style="padding:5px 8px;font-size:12px;text-align:right;">${y.sakeMeterValue??"―"}</td>
      <td style="padding:5px 8px;font-size:12px;">${y.riceType||"―"}</td>
      <td style="padding:5px 8px;font-size:12px;">${y.kenteiDate||"―"}</td>
    </tr>`).join("");return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>検定管理・現在酒</h1></div>
      <button class="button primary" data-action="kentei-show-form">＋ 検定記録</button>
    </section>

    ${h}

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>検定記録</h2><p class="panel-caption">${e.length}件</p></div>
      <div class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:10px;color:#6b7280;text-align:left;">
            <th style="padding:4px 8px;">仕込番号</th><th style="padding:4px 8px;">銘柄</th><th style="padding:4px 8px;">検定日</th>
            <th style="padding:4px 8px;">特定名称</th><th style="padding:4px 8px;text-align:right;">度数</th>
            <th style="padding:4px 8px;text-align:right;">日本酒度</th><th style="padding:4px 8px;text-align:right;">酸度</th>
            <th style="padding:4px 8px;text-align:right;">ｱﾐﾉ酸度</th><th style="padding:4px 8px;">使用米</th>
            <th style="padding:4px 8px;text-align:right;">精米歩合</th><th style="padding:4px 8px;text-align:right;">数量</th>
            <th style="padding:4px 8px;">状態</th><th></th>
          </tr></thead>
          <tbody>${c||'<tr><td colspan="13" style="padding:20px;text-align:center;color:#9ca3af;">検定記録がありません</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>現在酒一覧</h2><p class="panel-caption">検定完了→登録された酒（移動簿の銘柄に連動）</p></div>
      <div class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:10px;color:#6b7280;text-align:left;">
            <th style="padding:4px 8px;">仕込番号</th><th style="padding:4px 8px;">銘柄</th><th style="padding:4px 8px;">特定名称</th>
            <th style="padding:4px 8px;">タンク</th><th style="padding:4px 8px;text-align:right;">数量</th>
            <th style="padding:4px 8px;text-align:right;">度数</th><th style="padding:4px 8px;text-align:right;">日本酒度</th>
            <th style="padding:4px 8px;">使用米</th><th style="padding:4px 8px;">検定日</th>
          </tr></thead>
          <tbody>${g||'<tr><td colspan="9" style="padding:20px;text-align:center;color:#9ca3af;">現在酒がありません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function $p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function _p(e,t){return`
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
        ${e?`<p class="field-error">${$p(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Sp(e){return`
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
  `}function kp(e){return`
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
  `}const ss={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},Kt=50;function Pp(e,t){let n=e;if(t.query){const d=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(d)||u.name.toLowerCase().includes(d)||u.kanaName&&u.kanaName.toLowerCase().includes(d)||u.address1&&u.address1.toLowerCase().includes(d)||u.phone&&u.phone.toLowerCase().includes(d))}t.businessType&&(n=n.filter(d=>d.businessType===t.businessType)),t.tradeType&&(n=n.filter(d=>d.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(d=>d.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(d=>d.isActive):t.activeOnly==="inactive"&&(n=n.filter(d=>!d.isActive));const o=Math.max(1,Math.ceil(n.length/Kt)),i=(Math.min(t.page,o)-1)*Kt,c=n.slice(i,i+Kt);return{filtered:n,paged:c,totalPages:o}}function Ms(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const o=(t-1)*Kt+1,r=Math.min(t*Kt,e),i=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?i.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&i.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${o}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${i.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Ep(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),o=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(Lp).map(([r,i])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${i}</option>`).join("")}
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
  `}function En(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Ap(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const Lp={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function Cp(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function Dp(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Cp(t.tradeType)}</td>
          <td>${Ap(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${En(t.address1||"",16)}</td>
          <td>${En(t.address2||"",12)}</td>
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
      `).join("")}function pa(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function qp(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${En(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${pa(t.purchasePrice)}</td>
          <td class="numeric">${pa(t.salePrice)}</td>
          <td class="numeric">${pa(t.listPrice)}</td>
          <td class="numeric">${pa(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function Tp(e,t,n=ss,o=[]){const{filtered:r,paged:i,totalPages:c}=Pp(e.customers,n);return`
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
        ${Ep(e.customers,n)}
        ${Ms(r.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${oe("code","コード",o)}
                ${oe("name","得意先名",o)}
                ${oe("kanaName","カナ",o)}
                <th>略称</th>
                ${oe("businessType","業態",o)}
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
                ${oe("areaName","地区",o)}
                ${oe("closingDay","締日",o,"numeric")}
                ${oe("paymentDay","支払日",o,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Dp(Dt(i,o,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Ms(r.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${oe("code","コード",o)}
                ${oe("name","商品名",o)}
                <th>カナ</th>
                ${oe("category","分類",o)}
                <th>酒税区分</th>
                ${oe("alcoholDegree","度数",o,"numeric")}
                ${oe("volumeMl","容量ml",o,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${oe("purchasePrice","生産者価格",o,"numeric")}
                ${oe("salePrice","卸価格",o,"numeric")}
                ${oe("listPrice","定価(小売)",o,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${qp(Dt(e.products,o,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function an(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ip(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${tr.map(o=>`<option ${n?.materialType===o?"selected":""}>${o}</option>`).join("")}
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
  `}function Mp(e){const t=e.map(r=>{const c=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${an(r.unitCost)}</td>
          <td class="numeric">${an(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,o=e.reduce((r,i)=>r+i.currentStock*i.unitCost,0);return`
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
        <p class="kpi-value">${an(o)}</p>
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
  `}function Np(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function nn(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Rp={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Op(e){return`
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
          <td class="numeric">${nn(n.billedAmount)}</td>
          <td class="numeric">${nn(n.paymentAmount)}</td>
          <td class="numeric">${nn(n.balanceAmount)}</td>
          <td>${Np(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Rp[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function We(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ns(e){return e.trim().toLowerCase()}function Bp(e,t,n=[]){const o=Ns(t),r=e.filter(d=>o?[d.code,d.name,d.kanaName,d.janCode,d.category].map(Ns).some(u=>u.includes(o)):!0),i=!o&&n.length>0?`<div style="padding:8px 12px;border-bottom:2px solid var(--border,#e5e7eb);">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#6b7280);margin-bottom:6px;">よく使う商品</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${n.map(d=>`<button class="freq-chip" type="button" data-action="picker-select" data-code="${We(d.code)}" data-name="${We(d.name)}">${We(d.name)} <small style="opacity:0.6">${d.count}回</small></button>`).join("")}
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
                      data-code="${We(d.code)}"
                      data-name="${We(d.name)}"
                    >
                      <td class="mono">${We(d.code)}</td>
                      <td>${We(d.name)}</td>
                      <td class="mono">${We(d.janCode)}</td>
                      <td>${We(d.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:i;return fr({title:"商品検索",searchQuery:t,placeholder:"コード・名前・カナ・カテゴリで検索",resultsHtml:c,emptyMessage:"該当する商品が見つかりません。"})}function dt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function zp(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},o={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},i={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(y=>`
      <tr>
        <td class="mono">${y.documentNo}</td>
        <td>${y.purchaseDate}</td>
        <td class="mono">${y.supplierCode}</td>
        <td>${y.supplierName}</td>
        <td>${y.itemName}</td>
        <td class="numeric">${y.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${dt(y.unitPrice)}</td>
        <td class="numeric"><strong>${dt(y.amount)}</strong></td>
        <td>
          <span class="status-pill ${o[y.status]}">${n[y.status]}</span>
        </td>
      </tr>
    `).join(""),d=t.map(y=>`
      <tr>
        <td class="mono">${y.supplierCode}</td>
        <td>${y.supplierName}</td>
        <td class="numeric">${dt(y.totalPurchase)}</td>
        <td class="numeric">${dt(y.paidAmount)}</td>
        <td class="numeric"><strong>${dt(y.balance)}</strong></td>
        <td>${y.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${i[y.status]}">${r[y.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${y.supplierCode}" ${y.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((y,$)=>y+$.amount,0),h=t.reduce((y,$)=>y+$.balance,0),g=t.filter(y=>y.status!=="paid").length;return`
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
        <p class="kpi-value">${dt(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${dt(h)}</p>
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
  `}function Bt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function jp(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},o={holding:"neutral",due:"warning",cleared:"success"},r=e.map(g=>`
      <tr>
        <td class="mono">${g.billNo}</td>
        <td>${g.supplierName}</td>
        <td class="numeric">${Bt(g.amount)}</td>
        <td>${g.issueDate}</td>
        <td>${g.dueDate}</td>
        <td>
          <span class="status-pill ${o[g.status]}">${n[g.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${g.id}" ${g.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),i=t.map(g=>{const y=g.minimumStock>0&&g.currentStock<g.minimumStock*1.2;return`
        <tr>
          <td class="mono">${g.code}</td>
          <td>${g.name}</td>
          <td class="numeric ${y?"text-danger":""}">
            ${g.currentStock.toLocaleString("ja-JP")} ${g.unit}
            ${y?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${g.minimumStock.toLocaleString("ja-JP")} ${g.unit}</td>
          <td class="numeric">${Bt(g.unitCost)}</td>
          <td class="numeric">${Bt(g.currentStock*g.unitCost)}</td>
          <td>${g.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(g=>g.status==="holding"),d=c.reduce((g,y)=>g+y.amount,0),u=t.reduce((g,y)=>g+y.currentStock*y.unitCost,0),h=t.filter(g=>g.minimumStock>0&&g.currentStock<g.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${Bt(d)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${Bt(u)}</p>
        <p class="kpi-sub">要補充 ${h} 品目</p>
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
  `}function An(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Ce(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ln(e){return`
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
  `}function Fp(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function ua(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${Ce(e)}</code>
      ${Fp(e)}
    </div>
  `}function kt(e){return`
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
      ${e.code?Ln(e.code):""}
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
  `}function ma(e){return`
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
  `}function ya(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Rs(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function Vp(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?An(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${ya(e.lastOverallSync)}">${Rs(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${ya(e.lastOverallSync)==="success"?"1時間以内":ya(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${t.lastSyncAt?An(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${ya(t.lastSyncAt)}">${Rs(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Yp(e){if(!e.length)return"";const t=r=>r==="ok"?"&#x2705;":r==="warn"?"&#x26A0;&#xFE0F;":"&#x274C;",n=r=>r==="ok"?"success":r==="warn"?"warning":"error",o=e.every(r=>r.status==="ok");return`
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
  `}function Up(e,t,n,o,r){const i={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${r?Yp(r):""}

    ${o?Vp(o):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${An(e.lastSyncAt)}</p>
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
      ${ma({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${ua("git --version")}
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
      ${ma({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${ua("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${ma({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${ua("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${ua("python get-pip.py")}
        `})}
      ${ma({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${kt({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${kt({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${kt({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${kt({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${kt({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${kt({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${Ln(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${Ln(`{
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
  `}function Ut(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Lr(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function Jp(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(y=>y.amount),1),o=28,r=6,i=140,c=100,d=760,u=d-i-c,h=t.length*(o+r)+16,g=t.map((y,$)=>{const S=y.amount/n*u,_=$*(o+r)+8,L=y.abcRank==="A"?"#2F855A":y.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${i-8}" y="${_+o/2+5}" class="chart-axis" text-anchor="end">${y.name.length>10?y.name.slice(0,10)+"…":y.name}</text>
          <rect x="${i}" y="${_}" width="${S}" height="${o}" rx="4" fill="${L}" opacity="0.85" />
          <text x="${i+S+8}" y="${_+o/2+5}" class="chart-axis">${(y.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${d} ${h}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${g}
    </svg>
  `}function Cr(e,t,n="得意先"){if(e.length===0||t.length===0)return'<p class="empty-row">データなし</p>';const o=t.map(u=>`<th class="numeric">${u}</th>`).join(""),r=t.map((u,h)=>e.reduce((g,y)=>g+(y.values[h]??0),0)),i=r.reduce((u,h)=>u+h,0),c=e.map(u=>{const h=u.values.reduce((y,$)=>y+$,0),g=u.values.map(y=>`<td class="numeric">${y>0?(y/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`<tr>
      <td>${u.label}</td>
      ${g}
      <td class="numeric"><strong>${(h/1e4).toFixed(0)}万</strong></td>
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
            <td class="numeric">${(i/1e4).toFixed(0)}万</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `}function Hp(e){return Lr(e)}function Kp(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,20),n=760,o=320,r={top:24,right:56,bottom:60,left:72},i=n-r.left-r.right,c=o-r.top-r.bottom,d=Math.max(...t.map(_=>_.amount),1),u=i/t.length,h=[0,.25,.5,.75,1].map(_=>{const L=r.top+c-c*_;return`<g>
      <line x1="${r.left}" y1="${L}" x2="${n-r.right}" y2="${L}" class="chart-grid" />
      <text x="4" y="${L+4}" class="chart-axis">${Math.round(d*_/1e4)}万</text>
    </g>`}).join(""),g=[0,25,50,70,90,100].map(_=>{const L=r.top+c-c*_/100,k=_===70||_===90;return`<g>
      <text x="${n-4}" y="${L+4}" class="chart-axis" text-anchor="end">${_}%</text>
      ${k?`<line x1="${r.left}" y1="${L}" x2="${n-r.right}" y2="${L}" stroke="${_===70?"#2F855A":"#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />`:""}
    </g>`}).join(""),y=t.map((_,L)=>{const k=_.amount/d*c,C=Math.max(u-10,16),E=r.left+L*u+(u-C)/2,s=r.top+c-k,l=_.abcRank==="A"?"#2F855A":_.abcRank==="B"?"#B7791F":"#718096",p=_.name.length>6?_.name.slice(0,6)+"…":_.name;return`<g>
      <rect x="${E}" y="${s}" width="${C}" height="${k}" rx="4" fill="${l}" opacity="0.8" />
      <text x="${E+C/2}" y="${o-8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${E+C/2} ${o-16})">${p}</text>
    </g>`}).join(""),$=t.map((_,L)=>{const k=r.left+L*u+u/2,C=r.top+c-c*_.cumRatio/100;return`${k},${C}`}).join(" "),S=t.map((_,L)=>{const k=r.left+L*u+u/2,C=r.top+c-c*_.cumRatio/100;return`<circle cx="${k}" cy="${C}" r="3.5" fill="#C53D3D" />`}).join("");return`
    <svg viewBox="0 0 ${n} ${o}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${h}${g}${y}
      <polyline points="${$}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${S}
    </svg>`}function Qp(e){const t=e.ranking.filter(d=>d.abcRank==="A").length,n=e.ranking.filter(d=>d.abcRank==="B").length,o=e.ranking.filter(d=>d.abcRank==="C").length,r=e.ranking.filter(d=>d.abcRank==="A").reduce((d,u)=>d+u.amount,0),i=e.ranking.map(d=>`
    <tr>
      <td class="mono">${d.code}</td>
      <td>${d.name}</td>
      <td class="numeric">${Ut(d.amount)}</td>
      <td class="numeric">${d.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${d.ratio.toFixed(1)}%</td>
      <td class="numeric">${d.cumRatio.toFixed(1)}%</td>
      <td><span class="status-pill ${Hp(d.abcRank)}">${d.abcRank}</span></td>
    </tr>`).join(""),c=Cr(e.monthlyByProduct,e.months,"商品名");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">商品数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}品 <span class="kpi-sub">${(r/e.totalAmount*100).toFixed(1)}%</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}品</div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${o}品</div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>パレート図</h2><p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p></div></div>
      <div class="chart-scroll">${Kp(e.ranking)}</div>
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
    </section>`}function Wp(e){const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,o=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,h)=>u+h.amount,0),i=e.ranking.filter(u=>u.abcRank==="B").reduce((u,h)=>u+h.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,h)=>u+h.amount,0),d=e.ranking.map(u=>`
    <tr>
      <td class="mono">${u.code}</td>
      <td>${u.name}</td>
      <td class="numeric">${Ut(u.amount)}</td>
      <td class="numeric">${u.ratio.toFixed(1)}%</td>
      <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
      <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
      <td><span class="status-pill ${Lr(u.abcRank)}">${u.abcRank}</span></td>
    </tr>`).join("");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">得意先数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${Ut(r)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${Ut(i)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${o}社 <span class="kpi-sub">${Ut(c)}</span></div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別売上ランキング</h2><p class="panel-caption">売上金額上位15社</p></div></div>
      <div class="chart-scroll">${Jp(e.ranking)}</div>
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
      ${Cr(e.monthlyByCustomer,e.months,"得意先")}
    </section>`}function Gp(e,t,n,o=""){const r=n==="customer"?Wp(e):t?Qp(t):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>',i=new Date().getFullYear(),c=Array.from({length:5},($,S)=>String(i-S)),d=o.length===4?o:o.slice(0,4),u=o.length===7?o.slice(5,7):"",h=["01","02","03","04","05","06","07","08","09","10","11","12"],g={"01":"1月","02":"2月","03":"3月","04":"4月","05":"5月","06":"6月","07":"7月","08":"8月","09":"9月",10:"10月",11:"11月",12:"12月"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>ABC分析 <span style="font-size:0.75em;font-weight:400;color:var(--text-secondary);">${o?o.length===7?`${o.slice(0,4)}年${g[o.slice(5)]??o.slice(5)}`:`${o}年`:"全期間"}</span></h1>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="analysis-period-year" class="input-sm">
          <option value="">全期間</option>
          ${c.map($=>`<option value="${$}" ${d===$?"selected":""}>${$}年</option>`).join("")}
        </select>
        <select id="analysis-period-month" class="input-sm" ${d?"":"disabled"}>
          <option value="">全月</option>
          ${h.map($=>`<option value="${$}" ${u===$?"selected":""}>${g[$]}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="tab-bar" style="margin-bottom:16px;">
      <button class="tab-btn ${n==="customer"?"active":""}" type="button" data-analysis-tab="customer">👥 得意先ABC分析</button>
      <button class="tab-btn ${n==="product"?"active":""}" type="button" data-analysis-tab="product">📦 商品ABC分析</button>
    </div>

    ${r}
  `}const Xp={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},Os={amount:"売上額",quantity:"出荷本数",volume:"移出量"},Cn=10;function os(e){const[t,n]=e.split("-").map(Number);return n>=Cn?t:t-1}function Zp(e){const t=Cn-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(Cn).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function eu(e,t,n){const o=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,r=new Map;for(const c of e){const d=n==="fiscal"?`${os(c.month)}年度`:c.month.slice(0,4);r.set(d,(r.get(d)??0)+o(c))}return{curr:[...r.entries()].sort((c,d)=>c[0].localeCompare(d[0])).map(([c,d])=>({month:c,amount:d}))}}function tu(e){const t=new Set;for(const n of e)t.add(os(n.month));return[...t].sort((n,o)=>o-n).map(String)}function qt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function au(e){return e.replace("-","/")}const Bs={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function nu(e,t="#0F5B8D",n=[],o="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(E=>E.amount>0),i=760,c=280,d={top:16,right:24,bottom:36,left:o==="amount"?64:56},u=i-d.left-d.right,h=c-d.top-d.bottom,g=[...e.map(E=>E.amount),...n.map(E=>E.amount)],y=Math.max(...g,1),$=u/e.length;function S(E){if(o==="quantity")return E>=1e4?`${(E/1e4).toFixed(1)}万本`:`${Math.round(E).toLocaleString()}本`;if(o==="volume"){const s=E/1e3;return s>=1e4?`${(s/1e3).toFixed(0)}kL`:`${Math.round(s).toLocaleString()} L`}return`${Math.round(E/1e4).toLocaleString("ja-JP")}万円`}function _(E){return o==="quantity"?`${E.toLocaleString()}本`:o==="volume"?Ua(E):qt(E)}const L=[0,.25,.5,.75,1].map(E=>{const s=d.top+h-h*E,l=S(y*E);return`<g>
        <line x1="${d.left}" y1="${s}" x2="${i-d.right}" y2="${s}" class="chart-grid" />
        <text x="4" y="${s+4}" class="chart-axis">${l}</text>
      </g>`}).join(""),k=e.map((E,s)=>{const l=r?Math.max(($-18)/2,10):Math.max($-18,24),p=r?2:0,m=d.left+s*$+($-(r?l*2+p:l))/2,f=E.amount/y*h,x=d.top+h-f,b=n[s]?.amount??0,w=b/y*h,P=d.top+h-w,D=r?`<rect x="${m}" y="${P}" width="${l}" height="${w}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${_(b)}</title></rect>`:"",q=r?m+l+p:m;return`<g>
      ${D}
      <rect x="${q}" y="${x}" width="${l}" height="${f}" rx="4" fill="${t}" opacity="${.6+s/e.length*.35}"><title>${_(E.amount)}</title></rect>
      <text x="${d.left+s*$+$/2}" y="${c-8}" class="chart-axis centered-axis">${au(E.month)}</text>
    </g>`}).join(""),C=r?`
    <g transform="translate(${i-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${L}${k}${C}
    </svg>
  `}function Ua(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function su(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(o=>`
    <tr>
      <td class="mono">${o.code}</td>
      <td>${o.name}</td>
      <td class="numeric">${qt(o.amount)}</td>
      <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Ua(o.volumeMl)}</td>
      <td class="numeric">${o.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${o.code}" data-drilldown-name="${o.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function ou(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${qt(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Ua(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function zs(e,t,n){const o=t?e.filter(i=>i.tag.includes(t)||i.name.includes(t)):e,r=o.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':o.map(i=>`
        <tr>
          <td class="mono">${i.code||"―"}</td>
          <td>${i.name||"未設定"}</td>
          <td class="mono">${i.tag||"―"}</td>
          <td class="numeric">${qt(i.amount)}</td>
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
  `}function Dr(e,t,n="all",o="",r=[],i=[],c="",d="",u=null,h="all",g="",y=[],$=[],S=[],_=null,L=[],k=[],C="amount",E="calendar"){const s=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",l=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,m=n!=="all"&&r.length>0&&t!=="staff"?r:l,f=Dt(m,S,Xp),x={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},b=Os[C],w=Q=>C==="quantity"?Q.quantity:C==="volume"?Q.volumeMl:Q.amount,P=Q=>C==="quantity"?`${Q.toLocaleString()}本`:C==="volume"?Ua(Q):qt(Q);let D,q=[],R,B,M;if(_&&_.monthlySales.length>0)D=_.monthlySales.slice(-24).map(Q=>({month:Q.month,amount:w(Q)})),R=`${_.name} の月別${b}`,B=`${_.tab==="customers"?"得意先":"商品"}: ${_.code}`,M="#0968e5";else if(L.length>0&&n!=="all"){D=L.map(K=>({month:K.month,amount:w(K)})),q=k.map(K=>({month:K.month,amount:w(K)}));const Q=D.reduce((K,J)=>K+J.amount,0),Z=q.reduce((K,J)=>K+J.amount,0),ee=Z>0?(Q-Z)/Z*100:0,ne=ee>0?"+":"";R=`${x[n]} ${b}（${o}）`,B=`${P(Q)}${Z>0?` / 前年比 ${ne}${ee.toFixed(1)}%`:""}`,M="#2f855a"}else{D=eu(e.monthlySales,C,E).curr,q=[];const Z=D.reduce((ne,K)=>ne+K.amount,0);R=`${E==="fiscal"?"決算年度別":"暦年別"}${b}`,B=`累計 ${P(Z)}（${D.length}${E==="fiscal"?"期":"年"}）`,M="#0F5B8D"}const O=["amount","quantity","volume"].map(Q=>`<button class="tab-button ${Q===C?"active":""}" data-chart-metric="${Q}">${Os[Q]}</button>`).join(""),I=["all","yearly","monthly","weekly","daily"].map(Q=>`<button class="button ${Q===n?"primary":"secondary"} small" type="button" data-analytics-period="${Q}">${Bs[Q]}</button>`).join(""),z=E==="fiscal"&&n==="yearly"?tu(e.monthlySales):i,V=E==="fiscal"&&n==="yearly"&&!z.includes(o)?z[0]??"":o,U=n!=="all"&&z.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${z.map(Q=>`<option value="${Q}" ${Q===V?"selected":""}>${E==="fiscal"&&n==="yearly"?Q+"年度":Q}</option>`).join("")}
      </select>`:"";let G="",H="";if(t==="staff"){const Q=["all","yearly","monthly","weekly","daily"].map(J=>`<button class="button ${J===h?"primary":"secondary"} small" type="button" data-staff-period="${J}">${Bs[J]}</button>`).join(""),Z=h!=="all"&&y.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${y.map(J=>`<option value="${J}" ${J===g?"selected":""}>${J}</option>`).join("")}
        </select>`:"",ne=($.length>0?$:e.staffTotals).filter(J=>!c||J.name.includes(c)||J.code.includes(c)),K=h!=="all"&&g?` (${g})`:"";if(G=`
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
                  <td class="numeric">${qt(J.amount)}</td>
                  <td class="numeric">${J.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${J.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${J.code}" data-staff-name="${J.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const J=u.breakdownTab,X=h!=="all"&&g?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${g}</span>`:"";H=`
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

          ${J==="customers"?zs(u.customerRows,d,"得意先名"):zs(u.productRows,d,"商品名")}
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
            ${_?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${nu(D,M,q,C)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${s}</h2>
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
                  ${oe("code","コード",S,"mono")}
                  ${oe("name","名称",S)}
                  ${oe("amount","売上額",S,"numeric")}
                  ${oe("quantity","本数",S,"numeric")}
                  ${oe("volumeMl","移出量",S,"numeric")}
                  ${oe("documents","伝票数",S,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${su(f,!0)}</tbody>
            </table>
          </div>
        `:G}
      </article>
    </section>

    ${_?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${_.name} の${_.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${_.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${_.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${ou(_.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${H}
  `}const js=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:Zp,monthToFiscalYear:os,renderSalesAnalytics:Dr},Symbol.toStringTag,{value:"Module"}));function zt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ru(e){const t=Math.max(...e.salesByProduct.flatMap(i=>i.values),1),n=e.salesByProduct.map(i=>{const c=i.values.map((d,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(d/t*120)}px" title="${e.months[u]}: ${zt(d)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${i.label}</p>
          <div class="bar-chart">${c}</div>
        </div>
      `}).join(""),o=e.costSimulation.map(i=>`
      <tr>
        <td class="mono">${i.productCode}</td>
        <td>${i.productName}</td>
        <td class="numeric">${zt(i.costPrice)}</td>
        <td class="numeric">${zt(i.sellPrice)}</td>
        <td class="numeric">${zt(i.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${i.marginRate>=40?"success":"warning"}">${i.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(i=>{const c=i.values.reduce((d,u)=>d+u,0);return`
        <tr>
          <td>${i.label}</td>
          ${i.values.map(d=>`<td class="numeric">${(d/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${zt(c)}</strong></td>
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
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>
  `}function iu(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Ca(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Fs(e){return e.toISOString().slice(0,10)}function lu(e,t,n,o=null,r=null){const i=e.length?e.map(c=>`
            <tr class="clickable-row${c.documentNo===o?" selected-row":""}"
                data-doc-no="${c.documentNo}">
              <td class="mono">${c.documentNo}</td>
              <td>${iu(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${Ca(c.amount)}</td>
            </tr>
            ${c.documentNo===o?cu(r):""}
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
          <input id="sales-start" type="date" value="${t||Fs(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Fs(new Date)}" />
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
  `}function cu(e){if(!e)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(o=>`
      <tr>
        <td class="mono" style="width:40px">${o.lineNo}</td>
        <td class="mono" style="width:70px">${o.productCode}</td>
        <td>${o.productName}</td>
        <td class="numeric" style="width:50px">${o.quantity}</td>
        <td class="numeric" style="width:80px">${Ca(o.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Ca(o.amount)}</td>
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
            <td class="numeric">${Ca(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function ha(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function du(e,t,n,o){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},i={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},d=e.map(y=>`
      <tr>
        <td>${y.saleTime}</td>
        <td class="mono">${y.productCode}</td>
        <td>${y.productName}</td>
        <td class="numeric">${y.quantity}</td>
        <td class="numeric">${ha(y.unitPrice)}</td>
        <td class="numeric"><strong>${ha(y.amount)}</strong></td>
        <td>${r[y.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(y=>`
      <tr>
        <td class="mono">${y.orderNo}</td>
        <td>${y.orderDate}</td>
        <td>${y.customerName}</td>
        <td>${y.postalCode} ${y.address}</td>
        <td>${y.items.map($=>`${$.productName} ×${$.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${ha(y.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[y.status]}">${i[y.status]}</span>
        </td>
        <td>${y.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${y.id}">詳細</button>
        </td>
      </tr>
    `).join(""),h=e.reduce((y,$)=>y+$.amount,0),g=t.filter(y=>y.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${ha(h)}</p>
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
  `}const sn={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},pu={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function uu(e,t,n,o){const r=pu[e],i=Object.keys(sn).map(d=>`
      <button class="tab-button ${e===d?"active":""}" data-import-entity="${d}">
        ${sn[d]}
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
                ${t.columns.map(h=>`<td>${String(d[h]??"")}</td>`).join("")}
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
        <h2>${sn[e]} のCSV形式</h2>
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
  `}const fe={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function mu(e,t,n){const o=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:fe.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:fe.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:fe.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:fe.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:fe.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:fe.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:fe.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:fe.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:fe.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:fe.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:fe.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:fe.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:fe.date}];e.lines.slice(0,6).forEach((c,d)=>{const u=33+d*8.5;o.push({id:`line${d}_name`,label:`明細${d+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:fe.detail},{id:`line${d}_code`,label:`明細${d+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:fe.detail},{id:`line${d}_qty`,label:`明細${d+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:fe.detail},{id:`line${d}_price`,label:`明細${d+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:fe.detail},{id:`line${d}_amount`,label:`明細${d+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:fe.detail},{id:`line${d}_retail`,label:`明細${d+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:fe.detail})});const r=e.lines.reduce((c,d)=>c+(d.amount||0),0),i=e.lines.reduce((c,d)=>c+d.quantity,0);return o.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(i),color:fe.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:fe.total}),n&&o.forEach(c=>{const d=n[c.id];d&&(c.x=d.x,c.y=d.y)}),o}function yu(e,t,n,o,r){const c=mu(e,t,o).map(u=>`
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
  `}function on(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const o=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,i=parseFloat(n.style.top)||0;t[o]={x:r,y:i}}),t}function hu(e,t,n){const o=[...new Set(e.map(_=>_.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(_=>_.businessTypeName||_.businessType).filter(Boolean))].sort(),i=e.filter(_=>_.isAtRisk),c=e.filter(_=>!_.isAtRisk&&_.isDormant),d=e.filter(_=>!_.isAtRisk&&!_.isDormant&&_.amount12m>0),u=e.filter(_=>!_.isAtRisk&&!_.isDormant&&_.amount12m===0),h=t.filter(_=>_.lat&&_.lng),g=e.some(_=>_.lat&&_.lng),y=e.length,$=e.filter(_=>_.lat&&_.lng).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業 / Map</p>
        <h1>取引先マップ</h1>
        <p class="meta-note">OpenStreetMap で得意先の位置情報を可視化します。</p>
      </div>
    </section>

    ${g?$<y?`<section class="panel" style="border-left:4px solid #3b82f6;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;font-size:0.85rem;">
              📍 位置情報: <strong>${$}/${y}件</strong> 取得済み
              （未取得 ${y-$}件）
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
              「ジオコーディング実行」で住所から緯度経度を自動取得します（${y}件）。<br>
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
        ${o.map(_=>`<option value="${_}" ${n.filterArea===_?"selected":""}>${_}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${r.map(_=>`<option value="${_}" ${n.filterBiz===_?"selected":""}>${_}</option>`).join("")}
      </select>
    </div>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div id="customer-map" style="height:560px;width:100%;"></div>
    </section>
    <div id="map-data" style="display:none"
      data-customers="${encodeURIComponent(JSON.stringify(e))}"
      data-deliveries="${encodeURIComponent(JSON.stringify(h.map(_=>({name:_.name,address:_.address,lat:_.lat,lng:_.lng,phone:_.phone}))))}"></div>

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

  `}const fu={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},gu=["new","picking","packed","shipped","delivered"];function vu(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(i=>t[i.stage].push(i));const n=gu.map(i=>{const c=fu[i],d=t[i];return`
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
    `}).join(""),o=e.reduce((i,c)=>i+c.totalAmount,0),r=e.filter(i=>i.priority==="urgent").length;return`
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
  `}function bu(e,t,n){const o=e.cart.reduce((i,c)=>i+c.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((i,c)=>i+c.quantity,0)}<br/>
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

      ${xu(e,t,n)}
    </div>
  `}function xu(e,t,n){if(e.step==="customer"){const o=e.customerQuery.toLowerCase(),r=o?t.filter(i=>i.name.toLowerCase().includes(o)||i.code.toLowerCase().includes(o)):t.slice(0,20);return`
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
    `}if(e.step==="products"){const o=e.productQuery.toLowerCase(),r=o?n.filter(i=>i.name.toLowerCase().includes(o)||i.code.toLowerCase().includes(o)):n.slice(0,30);return`
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
  `}const Vs={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},Ys={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},Us={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function wu(e,t){const n=e.find(i=>i.id===t)??e[0],o=e.filter(i=>i.status==="new").length,r=e.filter(i=>i.status==="confirmed").length;return`
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
          ${e.map(i=>`
            <button class="tour-item ${n?.id===i.id?"active":""}" data-tour-id="${i.id}">
              <div class="tour-item-head">
                <strong>${i.name}</strong>
                <span class="status-pill ${Ys[i.status]}">${Vs[i.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${Us[i.language]} · 👥 ${i.partySize}名
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
            <span class="status-pill ${Ys[n.status]}">${Vs[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${Us[n.language]}</dd></div>
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
  `}const $u=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,_u=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Su(e,t){const n=t?e.find(r=>r.id===t):null,o=t==="__new__";return`
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
  `}function ku(e,t,n,o){const[r,i]=t.split("-").map(p=>parseInt(p,10)),c=new Date(r,i-1,1),d=new Date(r,i,0),u=c.getDay(),h=d.getDate(),g=[];for(let p=0;p<u;p++)g.push({isOutside:!0});for(let p=1;p<=h;p++)g.push({date:new Date(r,i-1,p)});for(;g.length%7!==0;)g.push({isOutside:!0});const y=n?e.filter(p=>p.category===n):e,$={};y.forEach(p=>{const m=p.startsAt.slice(0,10);$[m]??=[],$[m].push(p)});const S=new Date().toISOString().slice(0,10),_=g.map(p=>{if(p.isOutside)return'<div class="cal-cell cal-outside"></div>';const m=p.date,f=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}-${String(m.getDate()).padStart(2,"0")}`,x=$[f]??[],b=f===S,w=m.getDay();return`
        <div class="cal-cell ${b?"cal-today":""} ${w===0?"cal-sun":w===6?"cal-sat":""}"
             data-cal-date="${f}">
          <div class="cal-day-num">${m.getDate()}</div>
          <div class="cal-events">
            ${x.slice(0,3).map(P=>`
              <button class="cal-event" data-cal-event-id="${P.id}"
                      style="background:${P.color||Zn[P.category]||"#0F5B8D"};"
                      title="${P.title}">
                <span class="cal-event-time">${P.isAllDay?"終日":new Date(P.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${P.title}</span>
              </button>
            `).join("")}
            ${x.length>3?`<button class="cal-event-more" data-cal-date="${f}">+${x.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),L=o?.isOpen?Pu(o):"",k=new Date(r,i-2,1),C=new Date(r,i,1),E=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`,s=`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}`,l=(()=>{const p=new Date;return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-next" data-ym="${s}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Xn).map(([p,m])=>`<option value="${p}" ${n===p?"selected":""}>${m}</option>`).join("")}
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

    ${L}
  `}function Pu(e){const t=e.event;return`
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
                ${Object.entries(Xn).map(([n,o])=>`<option value="${n}" ${t.category===n?"selected":""}>${o}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?Js(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?Js(t.endsAt):""}" />
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
  `}function Js(e){const t=new Date(e),n=o=>String(o).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const jt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Eu(e,t){const n=t?e.find(o=>o.id===t):null;return`
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
        <p class="form-hint">${jt[n.provider]?.description??""}</p>
        ${jt[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${jt[n.provider].setupUrl}" target="_blank">${jt[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(jt[n.provider]?.fields??[]).map(o=>`
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
  `}function Au(e,t){const n=e.reduce((i,c)=>i+c.totalAmount,0),o=e.filter(i=>i.financialStatus==="paid").length,r=e.filter(i=>i.fulfillmentStatus!=="fulfilled"&&i.fulfillmentStatus!=="shipped").length;return`
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
  `}function Lu(e,t,n){return`
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
  `}function Cu(e,t,n){const o=t==="__new__"?null:e.find(c=>c.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${Ia[c.department]}</td>
                <td>${Ta[c.role]}</td>
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
              ${Object.entries(Ia).map(([c,d])=>`<option value="${c}" ${o?.department===c?"selected":""}>${d}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Ta).map(([c,d])=>`<option value="${c}" ${o?.role===c?"selected":""}>${d}</option>`).join("")}
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
    `}function Du(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Ia[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Ta[e.role]}</dd></div>
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
    `}function qu(e){const t={};return e.forEach(n=>{const o=n.userEmail??"(anonymous)";t[o]=(t[o]??0)+1}),`
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
  `}function Tu(e){const t=e.prospects.reduce((i,c)=>i+c.expectedAmount,0),n=e.prospects.reduce((i,c)=>i+c.expectedAmount*c.probability/100,0),o=e.prospects.filter(i=>i.stage==="won").length,r=e.prospects.filter(i=>i.stage==="hot"||i.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?Iu(e.prospects):Mu(e.prospects)}

    ${Nu(e)}
  `}function Iu(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(o=>{const r=e.filter(c=>c.stage===o),i=r.reduce((c,d)=>c+d.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${o}">
          <div class="pk-col-header" style="--pk-color:${es[o]};">
            <span class="pk-col-label">${Va[o]}</span>
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
  `}function Mu(e){return`
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
                <td><span class="status-pill" style="background:${es[t.stage]};color:white;">${Va[t.stage]}</span></td>
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
  `}function Nu(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(o=>o.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(Va).map(([o,r])=>`<option value="${o}" ${n?.stage===o?"selected":""}>${r}</option>`).join("")}
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
  `}function Ru(e,t,n){const o=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
            ${t.map(i=>`
              <tr>
                <td>${Ma[i.eventType]||i.eventType}</td>
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
                <td>${Ma[i.eventType]||i.eventType}</td>
                <td class="mono" style="font-size:12px;">${i.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${i.message}</td>
                <td><span class="status-pill ${i.status==="sent"?"success":"warning"}">${i.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ou(e,t,n,o){const r=new Map(t.map(y=>[y.code,y])),i=e.filter(y=>y.callDirection==="inbound").length,c=e.filter(y=>y.callDirection==="outbound").length,d=e.filter(y=>y.callStatus==="missed").length,u=e.reduce((y,$)=>y+($.durationSeconds??0),0),h=y=>{if(y===0)return"―";const $=Math.floor(y/60),S=y%60;return $>0?`${$}分${S}秒`:`${S}秒`},g=y=>{if(y.matchedCustomerCode){const $=r.get(y.matchedCustomerCode);if($)return`${$.name} (既存)`}return"未登録番号"};return`
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
        <p class="kpi-value">${h(u)}</p>
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
            ${e.map(y=>`
              <tr>
                <td style="font-size:12px;">${y.startedAt?new Date(y.startedAt).toLocaleString("ja-JP"):"―"}</td>
                <td>
                  ${y.callDirection==="inbound"?'<span class="status-pill neutral">📞 着信</span>':'<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${g(y)}</strong>
                  ${y.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${y.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${y.callDirection==="inbound"?y.fromNumber:y.toNumber}</td>
                <td>
                  ${y.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':y.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${y.callStatus}</span>`}
                </td>
                <td>${h(y.durationSeconds??0)}</td>
                <td>${y.recordingUrl?`<a href="${y.recordingUrl}" target="_blank" class="button-sm secondary">🎧 再生</a>`:"―"}</td>
                <td>
                  ${y.matchedCustomerCode?"":`<button class="button-sm secondary" data-action="call-link-customer" data-id="${y.id}" data-phone="${y.callDirection==="inbound"?y.fromNumber:y.toNumber}">顧客に紐付け</button>`}
                  <button class="button-sm secondary" data-action="call-memo" data-id="${y.id}">メモ</button>
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
  `}const Bu=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function zu(e){const t=e.activeListId?e.lists.find(i=>i.id===e.activeListId):null,n=e.items.filter(i=>i.status==="new").length,o=e.items.filter(i=>i.status==="imported").length,r=e.items.filter(i=>i.status==="excluded").length;return`
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
            ${Bu.map(i=>`<option value="${i}" ${e.searchBusinessType===i?"selected":""}>${i}</option>`).join("")}
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
  `}const Hs={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},ju={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Fu={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function Ee(e){return"¥"+e.toLocaleString("ja-JP")}function Qt(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function qr(e,t){const n=e.reduce((i,c)=>i+c.amount,0),o=Math.floor(n*t),r=n+o;return{subtotal:n,taxAmount:o,total:r}}const ye={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function he(e,t){const n=e.align??"left",o=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${o}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function rn(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),o=n-2018;return{y:o>0?String(o).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Vu(e,t,n){const o=rn(e.documentDate),r=rn(e.orderDate??e.documentDate),i=rn(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((k,C)=>{const E=ye.detailStartY+C*ye.detailRowH,s=ye.detailCols,l=[],p=(m,f)=>{f&&l.push(he({...m,y:E,x:m.x+0},f))};return p(s.productName,k.productName+(k.spec?` ${k.spec}`:"")),p(s.productCode,k.productCode),p(s.color,k.color??""),p(s.size,[k.size,k.caseQty?`×${k.caseQty}`:""].filter(Boolean).join(" ")),p(s.unit,k.unit),p(s.quantity,k.quantity>0?k.quantity.toLocaleString("ja-JP"):""),p(s.correctedQty,k.correctedQuantity?k.correctedQuantity.toLocaleString("ja-JP"):""),p(s.discount,k.discount?k.discount.toLocaleString("ja-JP"):""),p(s.unitPrice,k.unitPrice>0?k.unitPrice.toLocaleString("ja-JP"):""),p(s.costAmount,k.amount>0?k.amount.toLocaleString("ja-JP"):""),p(s.retailPrice,k.retailPrice?k.retailPrice.toLocaleString("ja-JP"):""),p(s.note,k.receivedAmount?k.receivedAmount.toLocaleString("ja-JP"):""),l.join("")}).join(""),d=e.lines.reduce((k,C)=>k+(C.amount||0),0),u=e.lines.reduce((k,C)=>k+(C.retailPrice||0)*(C.correctedQuantity??C.quantity),0),h=e.lines.reduce((k,C)=>k+(C.receivedAmount||0),0),g=e.lines.reduce((k,C)=>k+(C.returnAmount||0),0),y=e.lines.reduce((k,C)=>k+C.quantity,0),$=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",S=n.calibrationOffsetX||0,_=n.calibrationOffsetY||0,L=`transform: translate(${S}mm, ${_}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${$}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${L}">
        ${he(ye.currentDateY,o.y)}
        ${he(ye.currentDateM,o.m)}
        ${he(ye.currentDateD,o.d)}
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

        ${he(ye.totalQty,y.toLocaleString("ja-JP"))}
        ${he(ye.receivedTotal,h.toLocaleString("ja-JP"))}
        ${he(ye.returnTotal,g.toLocaleString("ja-JP"))}
        ${he(ye.correctedCostTotal,d.toLocaleString("ja-JP"))}
        ${he(ye.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Yu(e,t,n){const{subtotal:o,taxAmount:r,total:i}=qr(e.lines,e.taxRate),c=e.previousBalance??0,d=e.paymentAmount??0,u=c-d+i,h=e.lines.map(y=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${y.note??""}</td>
        <td>${y.productName}${y.spec?` <span style="color:#636e72;font-size:9pt;">/ ${y.spec}</span>`:""}</td>
        <td class="numeric">${y.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${y.unit}</td>`:""}
        <td class="numeric">${Ee(y.unitPrice)}</td>
        <td class="numeric">${Ee(y.amount)}</td>
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
        <div><dt>請求日</dt><dd>${Qt(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${Qt(e.dueDate)}</dd></div>`:""}
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
        <tbody>${h}${g}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${Ee(o)} / 消費税: ${Ee(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${Ee(c)}</td></tr>`:""}
          ${d?`<tr><th>ご入金額</th><td>▲ ${Ee(d)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${Ee(o)}</td></tr>
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
  `}function Uu(e,t,n){const{subtotal:o,taxAmount:r,total:i}=qr(e.lines,e.taxRate),c=e.lines.map(u=>`
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
        <div><dt>見積日</dt><dd>${Qt(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${Qt(e.expireDate)}</dd></div>`:""}
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
              <p>${Math.round(e.taxRate*100)}%対象: ${Ee(o)} / 消費税: ${Ee(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${Ee(o)}</td></tr>
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

      <p class="freee-footer">本見積書は ${e.expireDate?Qt(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function Ju(e,t,n,o){let r="";switch(e){case"chain_store":r=Vu(o,n,t);break;case"quotation":r=Uu(o,n,t);break;case"invoice_monthly":r=Yu(o,n,t);break}const i=Object.keys(Hs).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Hs[u]}</button>`).join(""),c=o.lines.map((u,h)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${h}" data-print-lfield="productName" value="${u.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${h}" data-print-lfield="quantity" value="${u.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${h}" data-print-lfield="unitPrice" value="${u.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${h}">✕</button></td>
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
  `}const Hu={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},Ku={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Tr(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],o="",r=!1;for(let d=0;d<e.length;d++){const u=e[d];r?u==='"'?e[d+1]==='"'?(o+='"',d++):r=!1:o+=u:u==='"'?r=!0:u===","?(n.push(o),o=""):u===`
`||u==="\r"?(u==="\r"&&e[d+1]===`
`&&d++,n.push(o),n.some(h=>h!=="")&&t.push(n),n=[],o=""):o+=u}if((o!==""||n.length>0)&&(n.push(o),n.some(d=>d!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const i=t[0].map(d=>d.trim()),c=[];for(let d=1;d<t.length;d++){const u={};i.forEach((h,g)=>{u[h]=(t[d][g]??"").trim()}),c.push(u)}return{columns:i,rows:c}}function Ir(e,t,n){const o=Hu[e],r=o.filter(d=>!t.includes(d)),i=n.map(d=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const h of o)t.includes(h)&&!d[h]&&u.push(`${h}が空`);return{...d,_valid:u.length===0,_error:u[0]}}),c=i.filter(d=>d._valid).length;return{entity:e,columns:t,rows:i,totalRows:n.length,validRows:c,invalidRows:i.length-c}}function Mr(e){const n=Ku[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function Nr(e,t){const{supabaseInsert:n}=await N(async()=>{const{supabaseInsert:d}=await Promise.resolve().then(()=>te);return{supabaseInsert:d}},void 0);let o=0,r=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const d of t){if(!d._valid)continue;const{_valid:u,_error:h,...g}=d,y={...g};if(!y.id){const $=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";y.id=String(g[$]??`${e}-${Date.now()}-${o+r}`)}for(const $ of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof y[$]=="string"&&y[$]!==""){const S=Number(y[$]);Number.isFinite(S)&&(y[$]=S)}try{await n(c,y)!==null?o++:r++}catch{r++}}return{inserted:o,failed:r}}const Qu=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Mr,importToSupabase:Nr,parseCSV:Tr,validateImport:Ir},Symbol.toStringTag,{value:"Module"}));function ln(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Wu(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Gu(e,t,n,o,r){const i=n.reduce((h,g)=>h+g.rowCount,0),c=n.map(h=>h.lastSyncAt).filter(h=>h!==null).sort().reverse()[0]??null,d=100,u=Math.max(1,Math.ceil(r/d));return`
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
        <p class="kpi-value">${c?ln(c):"---"}</p>
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
        ${n.map(h=>`
          <button
            class="panel kpi-card ${e===h.tableName?"kpi-alert":""}"
            type="button"
            data-action="raw-select-table"
            data-table="${h.tableName}"
            style="cursor:pointer;text-align:left;border:2px solid ${e===h.tableName?"var(--primary)":"transparent"};transition:border-color .15s;"
          >
            <p class="panel-title" style="font-size:12px;">${h.displayName}</p>
            <p class="kpi-value" style="font-size:18px;">${h.rowCount.toLocaleString("ja-JP")}</p>
            <p class="kpi-sub" style="font-size:11px;">${h.lastSyncAt?ln(h.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(h=>h.tableName===e)?.displayName??e}</h2>
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
            ${t.map(h=>`
            <tr>
              <td class="numeric mono">${h._record_index}</td>
              <td class="mono">${h._source_file||""}</td>
              <td class="numeric">${h._record_size??""} B</td>
              <td>${h._synced_at?ln(h._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${h._raw_b64?h._raw_b64.slice(0,200):""}">${Wu(h._raw_b64)}</td>
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
  `}const bt=400,xt=240;function ce(e){return e.toLocaleString("ja-JP")}function cn(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function Xu(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function Ve(e,t,n,o=""){return`<th class="${o}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${Xu(n,t)}</th>`}function Ft(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function Zu(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const o=e.products.slice().sort((C,E)=>(e.productTotals[E.code]??0)-(e.productTotals[C.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],i=820,c=280,d={top:20,right:20,bottom:40,left:60},u=i-d.left-d.right,h=c-d.top-d.bottom,g=t.map(C=>o.reduce((E,s)=>E+(n[s.code]?.[C]??0),0)),y=Math.max(...g,1),$=u/t.length,S=Math.max($-10,14),_=[0,.25,.5,.75,1].map(C=>{const E=d.top+h-h*C,s=`${Math.round(y*C/100)*100}`;return`
      <line x1="${d.left}" y1="${E}" x2="${i-d.right}" y2="${E}" class="chart-grid" />
      <text x="6" y="${E+4}" class="chart-axis">${Number(s).toLocaleString("ja-JP")}</text>
    `}).join(""),L=t.map((C,E)=>{let s=d.top+h;const l=d.left+E*$+($-S)/2,p=o.map((P,D)=>{const R=(n[P.code]?.[C]??0)/y*h;return s-=R,`<rect x="${l}" y="${s}" width="${S}" height="${R}" fill="${r[D%r.length]}" opacity="0.85" rx="${D===o.length-1?3:0}" />`}).join(""),[m,f]=C.split("-"),x=parseInt(f),b=x===1||E%3===0,w=x===1?`${m.slice(2)}年`:`${x}月`;return`<g>${p}${b?`<text x="${l+S/2}" y="${c-10}" class="chart-axis centered-axis">${w}</text>`:""}</g>`}).join(""),k=o.map((C,E)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[E%r.length]};"></span>
       ${C.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${_}${L}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${k}</div>
  `}function em(e){const{months:t,products:n}=e,o=n.slice().sort((c,d)=>(e.productTotals[d.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),r=t.map(c=>{const[d,u]=c.split("-"),h=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${h===1?`${d.slice(2)}年1月`:`${h}月`}</th>`}).join(""),i=o.map(c=>{const d=t.map(u=>{const h=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${h>0?ce(h):"—"}</td>`}).join("");return`
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
  `}function tm(e,t){const n=e.months[e.months.length-1]??"",o=e.months[e.months.length-2]??"",r=e.months.length-13,i=r>=0?e.months[r]:"",c=e.products.reduce((S,_)=>S+(e.matrix[_.code]?.[n]??0),0),d=e.products.reduce((S,_)=>S+(e.matrix[_.code]?.[o]??0),0),u=i?e.products.reduce((S,_)=>S+(e.matrix[_.code]?.[i]??0),0):0,h=d>0?(c-d)/d*100:0,g=u>0?(c-u)/u*100:0,y=S=>S>=0?"+":"",$=[1,2,3,5].map(S=>`<option value="${S}" ${S===t?"selected":""}>${S}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${ce(c)} 本</p>
        <p class="kpi-sub">${cn(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${h>=0?"":"text-danger"}">${y(h)}${h.toFixed(1)}%</p>
        <p class="kpi-sub">${cn(o)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${g>=0?"":"text-danger"}">${u>0?`${y(g)}${g.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${i?`${cn(i)} 比`:"前年データなし"}</p>
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
      ${Zu(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${em(e)}
    </section>
  `}function am(e,t){const o=e.slice().sort((i,c)=>{if(!t)return 0;const d=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return d*i.productName.localeCompare(c.productName,"ja");case"ss-avg":return d*(i.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return d*(i.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(Ft(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),h=Math.ceil(Ft(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-h)}case"ss-rop":{const u=Math.ceil(i.avgMonthlyDemand*(i.leadTimeDays/30)+Ft(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),h=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+Ft(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-h)}default:return 0}}).map(i=>{const c=Ft(i.serviceLevel),d=i.leadTimeDays/30,u=Math.ceil(c*i.demandStdDev*Math.sqrt(d)),h=Math.ceil(i.avgMonthlyDemand*d+u),g=u-i.safetyStockQty,y=g>0?"text-danger":g<-u*.3?"text-warning":"",$=[.9,.95,.99].map(S=>`<option value="${S}" ${Math.abs(i.serviceLevel-S)<.01?"selected":""}>${(S*100).toFixed(0)}%</option>`).join("");return`
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
        <td class="numeric">${ce(h)}</td>
        <td class="numeric ${y}">
          ${g>0?`+${ce(g)}`:ce(g)}
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
          <tbody>${o||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const nm={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function sm(e,t,n,o,r=[],i={partCapacity:bt,empCapacity:xt}){const c={draft:"下書き",confirmed:"確定",actual:"実績入力済"},d={draft:"neutral",confirmed:"info",actual:"success"},u=O=>Object.entries(nm).map(([I,z])=>`<option value="${I}" ${I===O?"selected":""}>${z}</option>`).join(""),h=640,g=e.filter(O=>O.plannedQty>0||Math.max(0,O.demandForecast+O.safetyStockTarget-O.openingStock)>0),y=r.length>0?Dn(g,r,i):[],[$,S]=t.split("-").map(Number),_=S===12?`${$+1}-01`:`${$}-${String(S+1).padStart(2,"0")}`,L=Wt(_,1,0),k=L.length>0?Dn(g,L,i):[],C=new Map;for(const O of[...y,...k])for(const I of O.items)C.has(I.productCode)||C.set(I.productCode,[]),C.get(I.productCode).push({date:O.date,qty:I.qty});const E=O=>O.map(I=>{const z=Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock),V=I.plannedQty>0?I.plannedQty:Math.round(z),U=V>0?Math.ceil(V/h*10)/10:0,G=I.plannedQty>0?(I.actualQty-I.plannedQty)/I.plannedQty*100:null,H=G!==null?G>=0?"text-success":"text-danger":"",Q=C.get(I.productCode)??[],Z=Q.length>0?Q.map(ee=>{const ne=ee.date.slice(5).replace("-","/");return`<span style="font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;display:inline-block;${ee.date.startsWith(_)?"background:#fef3c7;color:#92400e;":"background:#dbeafe;color:#1e40af;"}" title="${ee.date}">${ne}(${ee.qty})</span>`}).join(""):'<span style="font-size:9px;color:var(--text-disabled);">—</span>';return`
      <tr>
        <td style="white-space:nowrap;">${I.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${I.productCode}"
            style="width:92px;">${u(I.productionType)}</select>
        </td>
        <td class="numeric">${ce(Math.round(I.demandForecast))}</td>
        <td class="numeric">${ce(Math.round(I.safetyStockTarget))}</td>
        <td class="numeric">${ce(Math.round(I.openingStock))}</td>
        <td class="numeric"><strong>${ce(Math.round(z))}</strong></td>
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
          ${G!==null?`${G>=0?"+":""}${G.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${U>0?`${U.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${d[I.status]??"neutral"}">${c[I.status]??I.status}</span>
        </td>
      </tr>
    `}).join(""),l=(n==="all"?e:e.filter(O=>O.productionType===n)).slice().sort((O,I)=>{if(!o)return 0;const z=o.dir==="asc"?1:-1,V=Math.max(0,O.demandForecast+O.safetyStockTarget-O.openingStock),U=Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock);switch(o.column){case"plan-name":return z*O.productName.localeCompare(I.productName,"ja");case"plan-forecast":return z*(O.demandForecast-I.demandForecast);case"plan-required":return z*(V-U);case"plan-planned":return z*(O.plannedQty-I.plannedQty);case"plan-actual":return z*(O.actualQty-I.actualQty);case"plan-label":{const G=O.plannedQty>0?O.plannedQty:Math.round(V),H=I.plannedQty>0?I.plannedQty:Math.round(U);return z*(G-H)}default:return 0}}),p=E(l),m=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],f=O=>{const z=(O==="all"?e:e.filter(V=>V.productionType===O)).reduce((V,U)=>{const G=Math.max(0,U.demandForecast+U.safetyStockTarget-U.openingStock);return V+(U.plannedQty>0?U.plannedQty:Math.round(G))},0);return Math.ceil(z/h*10)/10},x=m.filter(O=>O.key!=="all").map(O=>{const I=f(O.key),z=e.filter(U=>U.productionType===O.key).length,V=O.key==="make_to_order"?e.filter(U=>U.productionType==="make_to_order"&&U.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${O.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${I>0?I.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${z}商品${V!==null?` · 受注${V}件`:""}</p>
      </div>
    `}).join(""),b=l.reduce((O,I)=>O+I.demandForecast,0),w=l.reduce((O,I)=>O+Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock),0),P=l.reduce((O,I)=>O+I.plannedQty,0),D=l.reduce((O,I)=>O+I.actualQty,0),q=f(n),R=new Date,B=Array.from({length:24},(O,I)=>{const z=new Date(R.getFullYear(),R.getMonth()-6+I,1),V=`${z.getFullYear()}-${String(z.getMonth()+1).padStart(2,"0")}`;return`<option value="${V}" ${V===t?"selected":""}>${V.replace("-","年")}月</option>`}).join(""),M=m.map(O=>`<button class="button ${n===O.key?"primary":"secondary"}" type="button"
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
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${x}</div>
    </section>

    ${r.length>0?(()=>{const O=r.filter(z=>z.partTimers>0||z.employees>0),I=O.map(z=>{const V=parseInt(z.date.slice(8)),U=["日","月","火","水","木","金","土"][new Date(z.date).getDay()];return`<span style="font-size:10px;padding:2px 5px;border-radius:3px;background:#dbeafe;color:#1e40af;margin:1px;display:inline-block;">${V}(${U})</span>`}).join("");return`<div style="background:var(--surface-alt);border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;">
        <div style="margin-bottom:4px;"><strong>${t.replace("-","年")}月 稼働日: ${O.length}日</strong>
          <span style="color:var(--text-secondary);margin-left:8px;">翌月: ${_.replace("-","年")}月</span></div>
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
              ${Ve("商品名","plan-name",o)}
              <th>生産区分</th>
              ${Ve("需要予測","plan-forecast",o,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${Ve("必要生産数","plan-required",o,"numeric")}
              ${Ve("計画数","plan-planned",o,"numeric")}
              <th style="white-space:nowrap;">製造予定</th>
              ${Ve("実績数","plan-actual",o,"numeric")}
              <th class="numeric">達成率</th>
              ${Ve("ラベル工数","plan-label",o,"numeric")}
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
                <td class="numeric">${ce(Math.round(w))}</td>
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
  `}function Rr(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return Array.from({length:o},(r,i)=>{const c=i+1;return`${e}-${String(c).padStart(2,"0")}`})}function Ks(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function Qs(e){const t=new Date(e).getDay();return t===0||t===6}function om(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Or(e){return e.partTimers+e.employees}function Xe(e,t,n={partCapacity:bt,empCapacity:xt}){const o=e.filter(g=>g.partTimers>0||g.employees>0);if(o.length===0)return;const r=t.reduce((g,y)=>{const $=y.plannedQty>0?y.plannedQty:Math.max(0,y.demandForecast+y.safetyStockTarget-y.openingStock);return g+$},0);if(r<=0)return;const i=r/o.length;let c=0,d=0,u=1/0;const h=Math.ceil(i/n.partCapacity);for(let g=0;g<=h;g++){const y=i-g*n.partCapacity,$=y>0?Math.ceil(y/n.empCapacity):0,S=g+$;S<u&&(u=S,c=g,d=$)}for(const g of e)g.confirmed||(g.partTimers>0||g.employees>0)&&(g.partTimers=c,g.employees=d)}function Dn(e,t,n={partCapacity:bt,empCapacity:xt}){const o=t.filter(d=>Or(d)>0).map(d=>d.date).sort();if(o.length===0)return t.map(d=>({date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},i=e.filter(d=>d.plannedQty>0||Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)>0).map(d=>({productCode:d.productCode,productName:d.productName,productionType:d.productionType,remaining:d.plannedQty>0?d.plannedQty:Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)})).filter(d=>d.remaining>0).sort((d,u)=>(r[d.productionType]??99)-(r[u.productionType]??99)||u.remaining-d.remaining),c=new Map;for(const d of t){const u=om(d,n);c.set(d.date,{date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const d of i){let u=d.remaining;if(u<=0)continue;if(o.reduce((g,y)=>{const $=c.get(y);return g+Math.max(0,$.capacity-$.totalQty)},0)<=0)break;for(const g of o){if(u<=0)break;const y=c.get(g),$=Math.max(0,y.capacity-y.totalQty);if($<=0)continue;const S=Math.min(u,$);y.items.push({productCode:d.productCode,productName:d.productName,productionType:d.productionType,qty:S}),y.totalQty+=S,y.utilization=y.capacity>0?y.totalQty/y.capacity:0,u-=S}}return t.map(d=>c.get(d.date))}function Wt(e,t=1,n=1){return Rr(e).map(o=>({date:o,partTimers:Qs(o)?0:t,employees:Qs(o)?0:n,confirmed:!1}))}function rm(e,t,n,o=null,r=new Set,i={partCapacity:bt,empCapacity:xt}){const c=Rr(t),d=e.filter(D=>!r.has(D.productCode)),u=Dn(d,n,i),h=new Map(u.map(D=>[D.date,D])),g=d.reduce((D,q)=>D+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0),$=e.reduce((D,q)=>D+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0)-g,S=u.reduce((D,q)=>D+q.totalQty,0),_=n.filter(D=>Or(D)>0).length,L=u.reduce((D,q)=>D+q.capacity,0),k=n.reduce((D,q)=>D+q.partTimers,0),C=n.reduce((D,q)=>D+q.employees,0),E=_>0?Math.ceil(g/_):0,s=new Date,l=Array.from({length:24},(D,q)=>{const R=new Date(s.getFullYear(),s.getMonth()-6+q,1),B=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}`;return`<option value="${B}" ${B===t?"selected":""}>${B.replace("-","年")}月</option>`}).join(""),p=new Date(c[0]).getDay(),m=[];for(let D=0;D<p;D++)m.push('<div style="min-height:44px;"></div>');for(const D of c){const q=h.get(D),R=new Date(D).getDay(),B=parseInt(D.split("-")[2]),M=q?.partTimers??0,O=q?.employees??0,I=M+O,z=q?.totalQty??0,V=q?.utilization??0,U=D===o,G=I===0?"var(--surface-alt)":V>.95?"rgba(197,61,61,0.12)":V>.7?"rgba(183,121,31,0.10)":V>0?"rgba(47,133,90,0.08)":"var(--surface)",H=I===0?"transparent":V>.95?"#c53d3d":V>.7?"#b7791f":V>0?"#2f855a":"var(--border)",Q=R===0?"#c53d3d":R===6?"#0F5B8D":"var(--text)",Z=I>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${M>0?`パ${M}`:""}${O>0?`社${O}`:""}</span>`:"";m.push(`
      <div data-action="cal-toggle-day" data-date="${D}"
        style="min-height:72px;padding:3px;border:${U?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${G};cursor:pointer;display:flex;flex-direction:column;
          ${U?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${Q};line-height:1;">${B}</span>
          ${Z}
        </div>
        ${I>0?`
          ${q&&q.items.length>0?`<div style="margin-top:2px;overflow:hidden;flex:1;">${q.items.slice(0,3).map(ee=>`<div style="font-size:7px;line-height:1.2;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${ee.productName.slice(0,6)} ${ee.qty}</div>`).join("")}${q.items.length>3?`<div style="font-size:7px;color:var(--text-disabled);">+${q.items.length-3}品</div>`:""}</div>`:""}
          <div style="font-size:10px;font-weight:600;color:var(--text);line-height:1;">${z>0?ce(z):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:1px;">
            <div style="height:100%;width:${Math.min(V*100,100)}%;background:${H};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const x=m.length%7;if(x>0)for(let D=0;D<7-x;D++)m.push('<div style="min-height:44px;"></div>');const b=o?h.get(o):null;o&&n.find(D=>D.date===o);const w=o&&b?(()=>{const D=b,q=parseInt(o.split("-")[2]),R=Ks(o),B=Math.round(D.utilization*100),M=n.find(K=>K.date===o),O=o===new Date().toISOString().slice(0,10),I={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},z={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},V=D.items.map(K=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${I[K.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${K.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${z[K.productionType]??K.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${ce(K.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),U=`パ${D.partTimers}×${i.partCapacity} 社${D.employees}×${i.empCapacity} = ${ce(D.capacity)}本`,G=D.totalQty>0?Math.ceil(D.totalQty/i.partCapacity):0,H=[];if(D.totalQty>0)for(let K=0;K<=G;K++){const J=D.totalQty-K*i.partCapacity;if(J<=0){H.push({p:K,e:0});break}const X=Math.ceil(J/i.empCapacity);H.push({p:K,e:X})}const Q=D.totalQty-D.capacity,Z=D.totalQty===0?"":Q>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${ce(Q)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',ee=H.filter(K=>K.p+K.e>0).sort((K,J)=>K.p+K.e-(J.p+J.e)).slice(0,3),ne=D.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${ce(D.totalQty)}本を収めるには ${Z}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${ee.map((K,J)=>{const X=K.p===D.partTimers&&K.e===D.employees;return`<button data-action="cal-apply-pattern" data-date="${o}" data-part="${K.p}" data-emp="${K.e}"
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
              data-action="cal-shift-part" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${M?.employees??0}"
              data-action="cal-shift-emp" data-date="${o}"
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
    `})():o?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(o.split("-")[2])}日（${Ks(o)}）— 休日</p>
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
      <div><strong>${ce(Math.round(g))}</strong>本 ÷ <strong>${_}</strong>稼働日 = 日当たり<strong>${ce(E)}</strong>本</div>
      <div>→ パ<strong>${k}</strong> 社<strong>${C}</strong>人日 ・ キャパ<strong>${ce(L)}</strong>本
        ${S<g?` <span style="color:#c53d3d;">（${ce(Math.round(g-S))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
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

    ${w}

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
        ${(()=>{const D=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],q=new Map;for(const R of e){if((R.plannedQty>0?R.plannedQty:Math.max(0,R.demandForecast+R.safetyStockTarget-R.openingStock))<=0)continue;const M=R.productionType||"monthly";q.has(M)||q.set(M,[]),q.get(M).push(R)}return D.filter(R=>q.has(R.key)).map(R=>{const B=q.get(R.key),M=B.reduce((U,G)=>U+(G.plannedQty>0?G.plannedQty:Math.max(0,G.demandForecast+G.safetyStockTarget-G.openingStock)),0),O=B.filter(U=>r.has(U.productCode)).length,I=O===B.length,z=O===0,V=B.map(U=>{const G=U.plannedQty>0?U.plannedQty:Math.max(0,U.demandForecast+U.safetyStockTarget-U.openingStock),H=r.has(U.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${H?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${U.productCode}"
                    ${H?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${H?"text-decoration:line-through;":""}">${U.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${ce(Math.round(G))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${R.key}"
                    ${I?"":"checked"} ${!z&&!I?'class="indeterminate"':""}
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
  `}function im(e,t,n,o,r,i,c="all",d=null,u=[],h=null,g=new Set,y={partCapacity:bt,empCapacity:xt}){const S=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(L=>`<button class="tab-button ${o===L.key?"active":""}"
       data-demand-tab="${L.key}">${L.label}</button>`).join("");let _="";if(o==="demand")_=e?tm(e,i):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(o==="safety")_=am(t,d);else if(o==="plan")_=sm(n,r,c,d,u,y);else if(o==="calendar")try{_=rm(n,r,u,h,g,y)}catch(L){console.error("[renderCalendarTab] error:",L),_=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(L)}
${L?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${S}
    </div>

    ${_}
  `}const st={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Ke=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function ue(e){return e.toLocaleString("ja-JP")}function we(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function rs(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function lm(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function is(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function cm(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(k=>k.month))].sort(),n=Ke.filter(k=>e.some(C=>C.brewCategory===k)),o={};for(const k of e)o[k.month]||(o[k.month]={}),o[k.month][k.brewCategory]=k.shipmentMl;const r=820,i=300,c={top:20,right:20,bottom:50,left:70},d=r-c.left-c.right,u=i-c.top-c.bottom,h=t.map(k=>n.reduce((C,E)=>C+(o[k]?.[E]??0),0)),g=Math.max(...h,1),y=d/t.length,$=Math.max(y-8,14),S=[0,.25,.5,.75,1].map(k=>{const C=c.top+u-u*k,E=g*k/1e3;return`
      <line x1="${c.left}" y1="${C}" x2="${r-c.right}" y2="${C}" class="chart-grid" />
      <text x="6" y="${C+4}" class="chart-axis">${Math.round(E).toLocaleString("ja-JP")}L</text>
    `}).join(""),_=t.map((k,C)=>{let E=c.top+u;const s=c.left+C*y+(y-$)/2,l=n.map(w=>{const P=o[k]?.[w]??0,D=P/g*u;return E-=D,D>0?`<rect x="${s}" y="${E}" width="${$}" height="${D}" fill="${st[w]??"#9ca3af"}" opacity="0.85" rx="1"><title>${w}: ${we(P)}L</title></rect>`:""}).join(""),[p,m]=k.split("-"),f=parseInt(m),x=f===10||C%2===0,b=f===10?`${p}年度`:`${f}月`;return`<g>${l}${x?`<text x="${s+$/2}" y="${i-12}" class="chart-axis centered-axis" style="font-size:10px;">${b}</text>`:""}</g>`}).join(""),L=n.map(k=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${st[k]??"#9ca3af"};"></span>
       ${k}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${i}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${S}${_}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${L}</div>
  `}function dm(e,t,n,o){const r=new Map;for(const d of e){const u=d.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const h=r.get(u);h.rows.push(d),h.totalMl+=d.totalShipmentMl,h.avgMl+=d.monthlyAvgMl,h.stockL=d.currentStockL}const i=new Map;for(const d of t)i.has(d.brewCategory)||i.set(d.brewCategory,[]),i.get(d.brewCategory).push(d);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Ke.filter(d=>r.has(d)).map(d=>{const u=r.get(d),h=st[d]??"#9ca3af",g=is(d);i.get(d);const y=n[d]??{rawAlcoholPct:18,targetAlcoholPct:15},$=y.targetAlcoholPct>0?y.rawAlcoholPct/y.targetAlcoholPct:1;u.stockL*1e3;const S=u.totalMl,_=u.avgMl,L=S/1e3,k=Math.round(u.stockL*$*10)/10,C=k*1e3,E=_>0?Math.round(C/_*10)/10:0,s=k-L,l=_>0?Math.round(_*2/1e3*10)/10:0,p=k<l,m=rs(E),f=lm(E),x=Math.min(E/12*100,100),b=s>=0?"#22c55e":"#ef4444",w=s>=0?`+${ue(Math.round(s))}L 余裕`:`${ue(Math.round(s))}L 不足`,P=$>1.001;return`
        <div class="card" style="border-top:3px solid ${h};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${h};">${d}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${m}20;color:${m};font-weight:600;">${f}</span>
              <button class="btn-edit-stock" data-cat-id="${g}" data-cat="${d}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${g}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${ue(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${ue(Math.round(L))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${we(_)}L</strong></div>
            </div>
            ${P?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${ue(k)}L</div>
                <div style="color:#6b7280;">${y.rawAlcoholPct}% → ${y.targetAlcoholPct}%（×${$.toFixed(2)}）・残<strong>${E.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const D=o.filter(q=>q.parentCategory===d);return D.length===0?"":D.map(q=>{const B=t.filter(M=>M.brewCategory===q.name).reduce((M,O)=>M+O.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${q.name}</span>
                  ${B>0?`<span style="margin-left:4px;">${ue(B)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${g}" style="display:none;margin-bottom:8px;">
            ${(()=>{const D=o.filter(M=>M.parentCategory===d),q=[{name:d,label:d},...D.map(M=>({name:M.name,label:M.name}))],R=q.flatMap(M=>t.filter(I=>I.brewCategory===M.name).map(I=>({...I,catLabel:M.label}))),B=q.map(M=>`<option value="${M.name}">${M.label}</option>`).join("");return`
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
                  <input id="alc-raw-${g}" type="number" min="1" max="30" step="0.1" value="${y.rawAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <span style="color:#6b7280;">→</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  出荷
                  <input id="alc-target-${g}" type="number" min="1" max="30" step="0.1" value="${y.targetAlcoholPct}"
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
            <span style="color:${b};font-weight:600;">年間比 ${w}</span>
            <span style="color:${p?"#ef4444":"#6b7280"};">安全在庫${ue(l)}L${p?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${P?"（加水後）":""}</span>
            <span style="font-weight:600;color:${m};">${E.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${m};height:100%;width:${x}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function pm(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,o=[];for(const r of Ke){const i=t.get(r);if(!i)continue;const c=st[r]??"#9ca3af",d=i.length>1,u=i.reduce((k,C)=>k+C.totalShipmentQty,0),h=i.reduce((k,C)=>k+C.totalShipmentMl,0),g=i.reduce((k,C)=>k+C.monthlyAvgQty,0),y=i.reduce((k,C)=>k+C.monthlyAvgMl,0),$=i.reduce((k,C)=>k+C.productCount,0),S=i[0].currentStockL,_=y>0?Math.round(S*1e3/y*10)/10:0,L=rs(_);if(o.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${d?"pointer":"default"};" ${d?`data-toggle-cat="${r}"`:""}>
        <td style="color:${c};">
          ${d?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${$}</td>
        <td style="text-align:right;">${ue(u)}</td>
        <td style="text-align:right;">${we(h)}</td>
        <td style="text-align:right;">${ue(g)}</td>
        <td style="text-align:right;">${we(y)}</td>
        <td style="text-align:right;">${ue(S)}</td>
        <td style="text-align:right;color:${L};font-weight:700;">${_.toFixed(1)}</td>
      </tr>
    `),d)for(const k of i)o.push(`
          <tr class="sub-row-${is(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${k.subCategory}</td>
            <td style="text-align:right;">${k.productCount}</td>
            <td style="text-align:right;">${ue(k.totalShipmentQty)}</td>
            <td style="text-align:right;">${we(k.totalShipmentMl)}</td>
            <td style="text-align:right;">${ue(k.monthlyAvgQty)}</td>
            <td style="text-align:right;">${we(k.monthlyAvgMl)}</td>
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
  `}function um(e,t,n,o,r,i={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const d={},u=new Date,h=u.getMonth()+1,g=h>=10?u.getFullYear():u.getFullYear()-1,y=g+1,$=new Map;for(const w of e)$.has(w.brewCategory)||$.set(w.brewCategory,new Map),$.get(w.brewCategory).set(w.fy,{shipL:w.shipmentL,annualL:w.annualizedL});const S=new Map;for(const w of r)S.has(w.brewCategory)||S.set(w.brewCategory,new Map),S.get(w.brewCategory).set(w.monthNum,w.avgMonthlyL);const _=[...new Set(e.map(w=>w.fy))].sort(),L=[...$.keys()].sort((w,P)=>{const D=[...Ke,...o.map(q=>q.name)];return(D.indexOf(w)===-1?99:D.indexOf(w))-(D.indexOf(P)===-1?99:D.indexOf(P))}),k=[];for(let w=h;w<=9;w++)k.push(w);if(h>=10)for(let w=1;w<=9;w++)k.push(w);const C=_.filter(w=>w<g),E=_.includes(g),s=L.map(w=>{const P=$.get(w);_.filter(de=>P.has(de));const D=st[w]??"#6366f1",q=S.get(w)??new Map,R=C.filter(de=>P.has(de)).map(de=>P.get(de).shipL);let B=0;if(R.length>=2){let de=0,xe=0;for(let Ne=1;Ne<R.length;Ne++)if(R[Ne-1]>0){const wt=(R[Ne]-R[Ne-1])/R[Ne-1],ot=Ne;de+=wt*ot,xe+=ot}B=xe>0?de/xe:0}const M=P.get(g)?.annualL??0,O=R.length>0?R[R.length-1]:0,I=M>0&&O>0?Math.round(O*.4+M*.6):O||M,z=k.reduce((de,xe)=>de+(q.get(xe)??0),0),V=t.filter(de=>de.brewCategory===w).reduce((de,xe)=>de+xe.volumeL,0),U=n[w],G=U&&U.targetAlcoholPct>0?U.rawAlcoholPct/U.targetAlcoholPct:1,H=Math.round(V*G),Q=Math.max(0,H-Math.round(z)),Z=w in i,ee=Z?i[w]:B,ne=Math.round(ee*100),K=Math.round(I*(1+ee)),J=Math.max(0,K-Q);d[w]=J;const X=ne>0?"#22c55e":ne<0?"#ef4444":"#6b7280",se=Math.round(B*100),ge=P.get(g)?.annualL??0;return`
      <tr>
        <td style="color:${D};font-weight:600;white-space:nowrap;">${w}</td>
        ${C.map(de=>`<td style="text-align:right;">${P.has(de)?ue(Math.round(P.get(de).shipL)):"—"}</td>`).join("")}
        ${E?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${ue(Math.round(ge))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${ne}"
            data-action="brew-growth-edit" data-cat="${w}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${Z?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${X};font-weight:600;${Z?"background:rgba(37,99,235,0.06);":""}"
            title="${Z?`手動設定（自動: ${R.length>=2?se+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${ue(H)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${ue(Math.round(z))}</td>
        <td style="text-align:right;font-weight:600;">${ue(Q)}</td>
        <td style="text-align:right;">${ue(K)}</td>
        <td style="text-align:right;color:${J>0?"#ef4444":"#22c55e"};font-weight:700;">${J>0?ue(J):"余裕"}</td>
      </tr>
    `}).join("");let l=0,p=0,m=0,f=0,x=0;for(const w of L){const P=$.get(w),D=S.get(w)??new Map,q=C.filter(ee=>P.has(ee)).map(ee=>P.get(ee).shipL);let R=0;if(q.length>=2){let ee=0,ne=0;for(let K=1;K<q.length;K++)if(q[K-1]>0){const J=(q[K]-q[K-1])/q[K-1];ee+=J*K,ne+=K}R=ne>0?ee/ne:0}const B=P.get(g)?.annualL??0,M=q.length>0?q[q.length-1]:0,O=B>0&&M>0?Math.round(M*.4+B*.6):M||B,I=t.filter(ee=>ee.brewCategory===w).reduce((ee,ne)=>ee+ne.volumeL,0),z=n[w],V=z&&z.targetAlcoholPct>0?z.rawAlcoholPct/z.targetAlcoholPct:1,U=Math.round(I*V),G=k.reduce((ee,ne)=>ee+(D.get(ne)??0),0),H=Math.max(0,U-Math.round(G)),Q=w in i?i[w]:R,Z=Math.round(O*(1+Q));l+=U,p+=Math.round(G),m+=H,f+=Z,x+=Math.max(0,Z-H)}const b=h<=9?`${h}月〜9月`:`${h}月〜翌9月`;return{needByCategory:d,html:`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 4px 0;">${y}年度 必要醸造量（${y}/10〜${y+1}/9）</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 12px;">
        増減率は完了年度（12ヶ月分）のみで算出。当年度(*)は年換算参考値。
      </p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>区分</th>
              ${C.map(w=>`<th style="text-align:right;">${w}(L)</th>`).join("")}
              ${E?`<th style="text-align:right;">${g}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${b}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${y}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${s}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${C.map(()=>"<td></td>").join("")}
              ${E?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${ue(l)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${ue(p)}</td>
              <td style="text-align:right;">${ue(m)}</td>
              <td style="text-align:right;">${ue(f)}</td>
              <td style="text-align:right;color:#ef4444;">${ue(x)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function mm(e,t,n,o,r){if(e.length===0)return"";const i=new Date,c=i.getMonth()+1,d=i.getFullYear(),u=[];let h=c,g=d;for(let C=0;C<4;C++){const E=[];for(let p=0;p<3;p++)E.push({y:g,m:h}),h++,h>12&&(h=1,g++);const s=`${E[0].y}/${E[0].m}`,l=`${E[2].y}/${E[2].m}`;u.push({label:`${s}-${l}`,months:E})}const y=new Map;for(const C of n)y.has(C.brewCategory)||y.set(C.brewCategory,new Map),y.get(C.brewCategory).set(C.monthNum,C.avgMonthlyL);const $=new Map;for(const C of e)$.has(C.brewCategory)||$.set(C.brewCategory,C.currentStockL);for(const C of r){const E=t.filter(s=>s.brewCategory===C.name).reduce((s,l)=>s+l.volumeL,0);E>0&&$.set(C.name,E)}const S=new Map;for(const C of r)S.has(C.parentCategory)||S.set(C.parentCategory,[]),S.get(C.parentCategory).push(C);const _=[];for(const C of Ke){($.has(C)||(y.get(C)?.size??0)>0)&&_.push({cat:C,isChild:!1});for(const E of S.get(C)??[])($.has(E.name)||(y.get(E.name)?.size??0)>0)&&_.push({cat:E.name,isChild:!0})}function L(C,E){const s=o[C],l=s&&s.targetAlcoholPct>0?s.rawAlcoholPct/s.targetAlcoholPct:1;let p=($.get(C)??0)*l;const m=y.get(C)??new Map,f=st[C]??(E?"#6366f1":"#9ca3af");let x="";const b=[];for(const w of u){const P=w.months.reduce((B,{m:M})=>B+(m.get(M)??0),0),D=p;p=Math.max(0,p-P),D>0&&p<=0&&!x&&(x=w.label);const R=p<=0?"#ef4444":p<P?"#eab308":"#22c55e";b.push(`<td style="text-align:right;padding:4px 6px;color:${R};font-weight:${p<=0?"700":"400"};">${p>0?ue(Math.round(p)):"枯渇"}</td>`)}return`
      <tr style="${E?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${f};font-weight:${E?"500":"600"};padding:4px 6px;white-space:nowrap;${E?"padding-left:20px;font-size:11px;":""}">${E?"┗ ":""}${C}</td>
        <td style="text-align:right;padding:4px 6px;">${ue(Math.round(($.get(C)??0)*l))}</td>
        ${b.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${x?"#ef4444":"#22c55e"};font-weight:600;">
          ${x?`⚠ ${x}`:"12ヶ月+"}
        </td>
      </tr>
    `}const k=_.map(({cat:C,isChild:E})=>L(C,E)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(C=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${C.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${k}</tbody>
        </table>
      </div>
    </div>
  `}function ym(e,t,n){const o=new Map;for(const c of e){o.has(c.brewCategory)||o.set(c.brewCategory,{avgMl:0,totalMl:0,stockL:c.currentStockL});const d=o.get(c.brewCategory);d.avgMl+=c.monthlyAvgMl,d.totalMl+=c.totalShipmentMl}for(const c of n){const d=t.filter(u=>u.brewCategory===c.name).reduce((u,h)=>u+h.volumeL,0);(d>0||o.has(c.name))&&(o.has(c.name)?o.get(c.name).stockL=d:(o.get(c.parentCategory),o.set(c.name,{avgMl:0,totalMl:0,stockL:d})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Ke,...n.map(c=>c.name)].filter(c=>o.has(c)&&(o.get(c).stockL>0||o.get(c).totalMl>0)).map(c=>{const d=o.get(c),u=d.avgMl>0?Math.round(d.stockL*1e3/d.avgMl*10)/10:0,h=d.totalMl/1e3,g=h>0?Math.round(d.stockL/h*100):0,y=n.some(k=>k.name===c),$=st[c]??(y?"#6366f1":"#9ca3af"),S=d.avgMl>0?rs(u):d.stockL>0?"#22c55e":"#9ca3af",_=d.avgMl>0?Math.min(u/12*100,100):d.stockL>0?100:0,L=d.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${g}%`:`${ue(d.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${$};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c}">${y?"┗ ":""}${c}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${S};height:100%;width:${_}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${L}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${d.stockL>0?"var(--text)":"#ef4444"};">${ue(d.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function hm(e,t,n,o,r){if(e.length===0)return"";const i=n.map(y=>y.name);[...Ke,...i];const c=new Map;for(const y of n)c.has(y.parentCategory)||c.set(y.parentCategory,[]),c.get(y.parentCategory).push(y);const d=new Map;for(const y of e)d.has(y.brewCategory)||d.set(y.brewCategory,[]),d.get(y.brewCategory).push(y);for(const y of i)d.has(y)||d.set(y,[]);const u=new Set;for(const y of n)for(const $ of d.get(y.name)??[])u.add($.productCode);const h=new Map;for(const y of Ke)h.set(y,d.get(y)??[]);const g=Ke.filter(y=>d.has(y)).map(y=>{const $=d.get(y)??[],S=st[y]??"#9ca3af",_=c.get(y)??[],L=_.length>0,k=$.reduce((b,w)=>b+w.annualMl,0),C=$.reduce((b,w)=>b+w.monthlyAvgMl,0),E=$.filter(b=>!u.has(b.productCode)),s=E.filter(b=>!t.has(b.productCode)),l=s.reduce((b,w)=>b+w.annualMl,0),p=s.reduce((b,w)=>b+w.monthlyAvgMl,0),m=E.filter(b=>t.has(b.productCode)),f=E.map(b=>{const w=t.has(b.productCode);return`
          <tr style="${w?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${L?`<input type="checkbox" ${w?"":"checked"} data-action="brew-move-to-child" data-code="${b.productCode}" data-parent="${y}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${w?"color:#b7791f;":""}" title="${b.productName}">
              ${b.productName}${w?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${b.subCategory}</td>
            <td style="text-align:right;">${we(b.annualMl)}</td>
            <td style="text-align:right;">${we(b.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),x=_.map(b=>{const w=d.get(b.name)??[],P=w.reduce((I,z)=>I+z.annualMl,0),D=w.reduce((I,z)=>I+z.monthlyAvgMl,0),q=r.filter(I=>I.brewCategory===b.name),R=q.reduce((I,z)=>I+z.volumeL,0),B=is(b.name),M=w.map(I=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${I.productCode}" data-cat="${b.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${I.productName}"><strong>${I.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${I.subCategory}</td>
            <td style="text-align:right;">${we(I.annualMl)}</td>
            <td style="text-align:right;">${we(I.monthlyAvgMl)}</td>
          </tr>
        `).join(""),O=m.filter(I=>!w.some(z=>z.productCode===I.productCode)).map(I=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${I.productCode}" data-cat="${b.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${I.productName}">${I.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${I.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${we(I.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${we(I.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${b.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${w.length}品 ・ ${we(P)}L/年${R>0?` ・ 在庫${ue(R)}L`:""}</span>
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
                  ${w.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${we(P)}</td><td style="text-align:right;">${we(D)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${S};"></span>
            <h4 style="margin:0;font-size:14px;">${y}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${$.length}銘柄 ・ 年間${we(k)}L
              ${L?`（内 ${_.map(b=>`${b.name}:${(d.get(b.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${L?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${f}
                ${x}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${we(k)}</td><td style="text-align:right;">${we(C)}</td></tr>
                ${L?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${we(l)}</td><td style="text-align:right;">${we(p)}</td></tr>`:""}
                ${m.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${m.length}品</td>
                  <td style="text-align:right;">${we(m.reduce((b,w)=>b+w.annualMl,0))}</td>
                  <td style="text-align:right;">${we(m.reduce((b,w)=>b+w.monthlyAvgMl,0))}</td></tr>`:""}
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
            ${Ke.filter(y=>y!=="その他").map(y=>`<option value="${y}">${y}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${g}
    </div>
  `}function fm(e,t,n,o=[],r=new Set,i=[],c={},d=[],u={},h=[],g=[],y={},$={}){const S=new Date,_=S.getMonth()>=9?S.getFullYear():S.getFullYear()-1,L=Array.from({length:5},(C,E)=>{const s=_-E;return`<option value="${s}" ${s===n?"selected":""}>${s}年度 (${s}/10-${s+1}/9)</option>`}).join(""),k=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return k||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${L}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${cm(t)}
      </div>

      ${dm(e,d,u,i)}

      ${um(h,d,u,i,g,y).html}

      ${ym(e,d,i)}

      ${mm(e,d,g,u,i)}

      ${hm(o,r,i,c,d)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${pm(e)}
      </div>
    </section>
  `}const dn={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},gm=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],Vt=[10,11,12,1,2,3,4,5,6,7,8,9],Ws=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],pt=[9,10,11,12,1,2,3,4,5],vm=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function le(e){return e.toLocaleString("ja-JP")}function bm(e,t,n,o=[],r=2026,i=[],c=[],d={}){const h=[...new Set([...Object.keys(e).filter(b=>e[b]>0),...o.filter(b=>b.plannedVolumeL>0).map(b=>b.brewCategory)])];if(h.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const g=[...gm,...n.map(b=>b.name)];h.sort((b,w)=>(g.indexOf(b)===-1?99:g.indexOf(b))-(g.indexOf(w)===-1?99:g.indexOf(w)));const y={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},$=new Map;for(const b of o)$.has(b.brewCategory)||$.set(b.brewCategory,[]),$.get(b.brewCategory).push(b);const S=(b,w,P,D,q)=>`<input type="number" step="${q}" value="${P}" data-action="brew-rice-edit" data-cat="${w}" data-field="${b}"
        style="width:${D};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,_=(b,w,P)=>`<select data-action="brew-rice-variety-select" data-cat="${w}" data-field="${b}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${i.map(D=>`<option value="${D.name}" ${D.name===P?"selected":""}>${D.name}${D.region?` (${D.region})`:""}</option>`).join("")}
      ${!i.some(D=>D.name===P)&&P?`<option value="${P}" selected>${P}</option>`:""}
    </select>`;let L=0,k=0,C=0,E=0;const s=Vt.map(()=>0),l=new Map,p=h.map(b=>{const w=e[b]??0,P=t[b]??y,D=dn[b]??"#6366f1",q=$.get(b)??[],R=b in d,B=q.reduce((X,se)=>X+se.plannedVolumeL,0),M=q.length>0,O=R?d[b]:M?B:w,I=P.alcoholAdditionRatio??0,z=O*(1-I),V=Math.round(z*P.ricePerLiterKg),U=Math.round(V*P.kojiRatio),G=V-U,H=Math.round(U/P.polishingRatio),Q=Math.round(G/P.polishingRatio),Z=H+Q,ee=Math.round(H*P.kojiPricePerKg),ne=Math.round(Q*P.kakePricePerKg);L+=H,k+=Q,C+=ee,E+=ne;for(const[X,se,ge,de]of[[P.kojiVariety,H,P.kojiPricePerKg,"麹米"],[P.kakeVariety,Q,P.kakePricePerKg,"掛米"]]){if(se<=0)continue;l.has(X)||l.set(X,{brownKg:0,pricePerKg:ge,cost:0,usage:[]});const xe=l.get(X);xe.brownKg+=se,xe.cost+=Math.round(se*ge),xe.pricePerKg=Math.round(xe.cost/xe.brownKg),xe.usage.push({cat:b,type:de,kg:se})}const K=Vt.map(()=>0);if(q.length>0)for(const X of q){const se=Vt.indexOf(X.brewMonth);se>=0&&(K[se]+=X.plannedVolumeL)}else{const X=O/12;for(let se=0;se<12;se++)K[se]=X}const J=K.reduce((X,se)=>X+se,0)||1;for(let X=0;X<12;X++){const se=K[X]/J;s[X]+=Math.round(Z*se)}return`
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
          ${I>0?`<span style="color:var(--text-secondary);">−${Math.round(I*100)}%→${le(Math.round(z))}L</span>`:""}
          ${w>0&&Math.abs(w-O)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${le(Math.round(w))})</span>`:""}
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
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${S("ricePerLiterKg",b,P.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${S("kojiRatio",b,P.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${S("polishingRatio",b,P.polishingRatio,"44px","0.01")}</label>
          ${I>0||b==="本醸造"||b==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${S("alcoholAdditionRatio",b,P.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${_("kojiVariety",b,P.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${S("kojiPricePerKg",b,P.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${le(H)}kg</strong> <span style="color:var(--text-secondary);">(${(H/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${le(ee)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${_("kakeVariety",b,P.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${S("kakePricePerKg",b,P.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${le(Q)}kg</strong> <span style="color:var(--text-secondary);">(${(Q/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${le(ne)}</div>
          </div>
        </div>
      </div>
    `}).join(""),m=L+k,f=C+E,x=Math.max(...s,1);return Vt.map((b,w)=>{const P=s[w];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${P/x*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${P>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${Ws[w]}</div>
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
        <div style="display:grid;grid-template-columns:80px repeat(${pt.length},1fr);font-size:11px;min-width:500px;">
          <div style="padding:4px;font-weight:600;">区分</div>
          ${vm.map(b=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${b}</div>`).join("")}
        </div>
        ${(()=>{const b=[],w=pt.length,P=new Map;for(const R of c)R.deliveryMonth&&(P.has(R.varietyName)||P.set(R.varietyName,[]),P.get(R.varietyName).push(R.deliveryMonth));for(const[R,B]of P){const M=pt.map(O=>{const I=B.includes(O),z=c.filter(V=>V.varietyName===R&&V.deliveryMonth===O).reduce((V,U)=>V+U.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${I?"background:#dcfce7;":""}">
                ${I?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${z}俵</div>`:""}
              </div>`}).join("");b.push(`<div style="display:grid;grid-template-columns:80px repeat(${w},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${R}</div>${M}
            </div>`)}const D=34,q=2;for(const R of h){const B=$.get(R)??[],M=dn[R]??"#6366f1",O=R in d,I=B.reduce((K,J)=>K+J.plannedVolumeL,0),z=B.length>0,V=O?d[R]:z?I:e[R]??0,U=[],G=[...B].sort((K,J)=>pt.indexOf(K.brewMonth)-pt.indexOf(J.brewMonth)),H=[];for(const K of G){const J=pt.indexOf(K.brewMonth);if(J<0)continue;const X=Math.min(K.durationMonths,w-J),se=J+X;let ge=0;for(;ge<H.length&&H[ge]>J;)ge++;ge>=H.length?H.push(se):H[ge]=se,U.push({s:K,startIdx:J,dur:X,lane:ge})}const Z=Math.max(H.length,1)*(D+q)+q,ee=pt.map(()=>`<div style="border-left:1px solid var(--border);height:${Z}px;"></div>`).join(""),ne=U.map(({s:K,startIdx:J,dur:X,lane:se})=>{const ge=(J/w*100).toFixed(2),de=(X/w*100).toFixed(2),xe=q+se*(D+q);return`<div class="gantt-bar" data-cat="${R}" data-month="${K.brewMonth}" data-dur="${X}" data-vol="${Math.round(K.plannedVolumeL)}" data-max="${Math.round(V)}"
                style="position:absolute;left:${ge}%;width:${de}%;top:${xe}px;height:${D}px;
                  background:${M}30;border:2px solid ${M};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${M};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${le(Math.round(K.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");b.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${M};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${R}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${w},1fr);">
                ${ee}
                <div class="gantt-bar-container" data-cat="${R}" data-max="${Math.round(V)}" data-cols="${w}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${ne}
                </div>
              </div>
            </div>`)}return b.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const b=h.map(P=>{const D=t[P]??y,q=$.get(P)??[],R=P in d,B=q.reduce((U,G)=>U+G.plannedVolumeL,0),M=q.length>0,O=R?d[P]:M?B:e[P]??0,I=O*(1-(D.alcoholAdditionRatio??0)),z=Math.round(I*D.ricePerLiterKg),V=Math.round(z/D.polishingRatio);return{cat:P,brewingL:O,brownKg:V,color:dn[P]??"#6366f1"}}).filter(P=>P.brewingL>0||P.brownKg>0),w=Math.max(...b.map(P=>P.brownKg),1);return b.map(P=>{const D=Math.min(P.brownKg/w*100,100);return`
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
            ${[...l.entries()].sort((b,w)=>w[1].brownKg-b[1].brownKg).map(([b,w])=>{const P=(w.brownKg/60).toFixed(1),D=w.usage.map(q=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${q.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${q.cat}/${q.type} ${le(q.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${b}</td>
                  <td style="text-align:right;font-weight:600;">${le(w.brownKg)}</td>
                  <td style="text-align:right;">${P}</td>
                  <td style="text-align:right;">¥${le(w.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${le(w.cost)}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${le(L)}kg</strong> <span style="color:var(--text-secondary);">(${(L/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${le(C)}</div>
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
      ${(()=>{const b=new Map;for(const[M,O]of l)b.set(M,O.brownKg);const w=new Map;for(const M of c){w.has(M.varietyName)||w.set(M.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const O=w.get(M.varietyName);O.bales+=M.committedBales,O.kg+=M.committedBales*60,O.cost+=M.committedBales*60*M.pricePerKg,M.supplier&&!O.suppliers.includes(M.supplier)&&O.suppliers.push(M.supplier)}const P=[...new Set([...b.keys(),...w.keys()])];let D=0,q=0;const R=P.map(M=>{const O=b.get(M)??0,I=w.get(M),z=I?.kg??0,V=z-O;D+=z,q+=O;const U=V>=0?"#22c55e":"#ef4444",G=V>=0?`+${le(Math.round(V))}kg余裕`:`${le(Math.round(V))}kg不足`,H=z>0?Math.min(O/z*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${M}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${le(Math.round(z))}kg (${I?.bales??0}俵)</span>
                  <span>必要 ${le(Math.round(O))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${H}%;background:${z>0?V>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${U};">${z>0?G:"未確保"}</span>
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
              ${Vt.map((M,O)=>`<option value="${M}">${Ws[O]}</option>`).join("")}
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
  `}const xm={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},wm={planned:"計画中",active:"進行中",completed:"完了"},Br={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},Ge=6;function ls(e){return e.toLocaleString("ja-JP")}function sa(e){return xm[e]??"#6366f1"}function fa(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function $m(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Oe(e){return e?e.slice(5).replace("-","/"):"―"}function _m(e){if(e.length<=4)return e;const t=e.match(/[（(](.+?)[）)]/);return t?t[1].slice(0,3):e.includes("→")?e.split("→")[1]?.slice(0,3)??e.slice(0,3):e.slice(0,3)}function Sm(e,t,n){const o=e.filter(C=>C.status!=="completed"&&C.startDate&&C.targetEndDate);if(o.length===0)return"";const r=o.flatMap(C=>[C.startDate,C.targetEndDate]),i=o.flatMap(C=>t[C.id]??[]);for(const C of i)C.plannedStart&&r.push(C.plannedStart),C.plannedEnd&&r.push(C.plannedEnd);r.sort();const c=r[0],d=r[r.length-1],u=Math.min(fa(c,d)+7,180),h=u*Ge,g=[];let y="";for(let C=0;C<u;C++){const E=$m(c,C),s=E.slice(0,7);s!==y&&(g.push(`<span style="position:absolute;left:${C*Ge}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(E.slice(5,7))}月</span>`),y=s)}const $=new Date().toISOString().slice(0,10),S=fa(c,$),_=S>=0&&S<u?`<div style="position:absolute;left:${S*Ge}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",L=30,k=o.map(C=>{const E=(t[C.id]??[]).sort((m,f)=>m.stepOrder-f.stepOrder),s=sa(C.brewCategory),l=n===C.id,p=E.map(m=>{const f=Math.max(fa(c,m.plannedStart),0),x=Math.min(fa(c,m.plannedEnd),u-1),b=f*Ge,w=Math.max((x-f+1)*Ge,Ge),P=Br[m.status],D=m.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${m.id}" data-batch-id="${m.batchId}" data-step-order="${m.stepOrder}" data-planned-start="${m.plannedStart}" data-planned-end="${m.plannedEnd}" style="position:absolute;left:${b}px;top:4px;width:${w}px;height:22px;background:${P};border-radius:3px;font-size:7px;line-height:22px;color:${D};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${m.status==="未着手"?"#bbb":P};" title="${m.stepName} ${Oe(m.plannedStart)}〜${Oe(m.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${w>24?_m(m.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${l?"#3b82f6":"#f3f4f6"};min-height:${L}px;background:${l?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${C.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${s};font-weight:600;">${C.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${C.brewCategory}</span>
      </div>
      <div style="position:relative;width:${h}px;height:${L}px;background:repeating-linear-gradient(90deg,transparent 0 ${Ge*7-1}px,#f3f4f6 ${Ge*7-1}px ${Ge*7}px);">${p}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">仕込をクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${h+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${h}px;height:20px;">${g.join("")}</div>
        </div>
        <div style="position:relative;">${k}${_}</div>
      </div>
    </div>
  </section>`}function km(e,t){const n=[...t].sort((L,k)=>L.stepOrder-k.stepOrder);if(n.length===0)return"";const o=120,r=50,i=40,c=20,d=5,u=Math.ceil(n.length/d),h=d*(o+i)-i+20,g=u*(r+c)-c+20,y=L=>{const k=Math.floor(L/d);return{x:10+(k%2===0?L%d:d-1-L%d)*(o+i),y:10+k*(r+c)}},$=n.map((L,k)=>{const C=y(k),E=Br[L.status],s=L.status==="進行中"?"#1d4ed8":L.status==="完了"?"#15803d":"#9ca3af",l=L.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${C.x}" y="${C.y}" width="${o}" height="${r}" rx="6" fill="${E}" stroke="${s}" stroke-width="2"/>
      <text x="${C.x+o/2}" y="${C.y+20}" text-anchor="middle" fill="${l}" font-size="11" font-weight="600">${L.stepName}</text>
      <text x="${C.x+o/2}" y="${C.y+36}" text-anchor="middle" fill="${l}" font-size="9" opacity="0.8">${Oe(L.plannedStart)}〜${Oe(L.plannedEnd)}</text>
    </g>`}).join(""),S=n.slice(1).map((L,k)=>{const C=y(k),E=y(k+1),s=C.x+o/2,l=C.y+r/2,p=E.x+o/2,m=E.y+r/2;if(Math.floor(k/d)===Math.floor((k+1)/d)){const x=p>s?1:-1,b=C.x+(x>0?o:0),w=l,P=E.x+(x>0?0:o);return`<line x1="${b}" y1="${w}" x2="${P}" y2="${m}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const x=C.y+r,b=E.y;return`<line x1="${s}" y1="${x}" x2="${p}" y2="${b}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${sa(e.brewCategory)};">●</span> ${e.batchCode} 醸造工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${h}" height="${g}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${S}${$}
        </svg>
      </div>
    </section>
  </div>`}function Pm(e,t,n,o=[]){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">仕込が未登録です。調達計画から取込むか、新規登録してください。</div>';const r=new Set(o),i=e.length>0&&e.every(h=>r.has(h.id)),c=o.length>0,d=e.map(h=>{const g=t[h.id]??[],y=g.length,$=g.filter(C=>C.status==="完了").length,S=y>0?Math.round($/y*100):0,_=sa(h.brewCategory),L=n===h.id,k=r.has(h.id);return`<tr style="border-bottom:1px solid #f3f4f6;background:${k?"#fef2f2":L?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${h.id}">
      <td style="padding:4px 6px;text-align:center;" onclick="event.stopPropagation()">
        <input type="checkbox" data-action="bp-batch-check" data-batch-id="${h.id}" ${k?"checked":""} style="cursor:pointer;width:14px;height:14px;">
      </td>
      <td style="padding:6px;font-size:12px;font-weight:600;color:${_};">${h.batchCode}</td>
      <td style="padding:6px;font-size:11px;"><span style="background:${_};color:#fff;padding:1px 6px;border-radius:9999px;font-size:10px;">${h.brewCategory}</span></td>
      <td style="padding:6px;font-size:11px;text-align:right;">
        <input type="number" min="0" step="100" value="${Math.round(h.plannedVolumeL)}" data-action="bp-batch-vol" data-batch-id="${h.id}" style="width:60px;font-size:11px;text-align:right;border:1px solid #e5e7eb;border-radius:3px;padding:2px 4px;" onclick="event.stopPropagation()">L
      </td>
      <td style="padding:6px;font-size:11px;">
        <input type="date" value="${h.startDate}" data-action="bp-batch-date" data-batch-id="${h.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
      </td>
      <td style="padding:6px;">
        <select data-action="bp-batch-status" data-batch-id="${h.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
          ${["planned","active","completed"].map(C=>`<option value="${C}"${h.status===C?" selected":""}>${wm[C]}</option>`).join("")}
        </select>
      </td>
      <td style="padding:6px;width:80px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
            <div style="width:${S}%;height:100%;background:${_};border-radius:3px;"></div>
          </div>
          <span style="font-size:9px;color:#6b7280;white-space:nowrap;">${S}%</span>
        </div>
      </td>
      <td style="padding:6px;text-align:center;">
        <button data-action="bp-show-delete-modal" data-batch-id="${h.id}" data-batch-code="${h.batchCode}" style="font-size:10px;padding:2px 8px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;" onclick="event.stopPropagation()">削除</button>
      </td>
    </tr>`}).join(""),u=c?`<button data-action="bp-bulk-delete" style="font-size:12px;padding:4px 14px;border:1px solid #ef4444;color:#ef4444;background:white;border-radius:5px;cursor:pointer;font-weight:600;">選択した ${o.length}件を削除</button>`:"";return`<section class="panel" style="margin-bottom:16px;">
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
  </section>`}function Em(e,t){if(e.length===0)return"";const n=new Set(t.map(i=>`${i.brewCategory}:${i.startDate?.slice(0,7)}`)),o=e.filter(i=>{const c=i.brewMonth>=10?i.fy:i.fy+1,d=`${i.brewCategory}:${c}-${String(i.brewMonth).padStart(2,"0")}`;return!n.has(d)&&i.plannedVolumeL>0});return o.length===0?"":`<section class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括で仕込登録</p></div>
      <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括仕込登録</button>
    </div>
    <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
        <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
      </tr></thead><tbody>${o.map(i=>{const d=`${i.brewMonth>=10?i.fy:i.fy+1}-${String(i.brewMonth).padStart(2,"0")}-01`,u=`${i.brewCategory}-${i.fy}-${String(i.brewMonth).padStart(2,"0")}`;return`<tr>
      <td style="padding:5px 6px"><span style="color:${sa(i.brewCategory)};font-weight:600;font-size:11px;">${i.brewCategory}</span></td>
      <td style="padding:5px 6px;font-size:11px;">${u}</td>
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${ls(Math.round(i.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${i.brewMonth}月（${d}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${i.brewCategory}" data-month="${i.brewMonth}" data-vol="${Math.round(i.plannedVolumeL)}" data-date="${d}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function Am(e){return`<div class="panel" style="margin-bottom:16px">
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
  </div>`}function Lm(e,t){const n=[...t].sort((i,c)=>i.stepOrder-c.stepOrder);if(n.length===0)return"";const o=n.map(i=>`<tr style="border-bottom:1px solid #f3f4f6">
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
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${sa(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${ls(e.plannedVolumeL)}L ｜ ${Oe(e.startDate)}〜${Oe(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  </section>`}function Cm(e,t,n){const o=new Map;for(const i of t){if(!i.tankNo||i.status==="completed")continue;const c=n[i.id]??[],d=c.find(h=>h.stepName==="蒸米→添仕込"),u=c.find(h=>h.stepName==="上槽");d?.plannedStart&&u?.plannedEnd&&(o.has(i.tankNo)||o.set(i.tankNo,[]),o.get(i.tankNo).push({batchCode:i.batchCode,start:d.plannedStart,end:u.plannedEnd}))}const r=e.map(i=>{const c=o.get(i.tankNo)??[],d=c.length>0?c.map(u=>`<span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#dbeafe;color:#2563eb;">${u.batchCode}(${Oe(u.start)}〜${Oe(u.end)})</span>`).join(" "):'<span style="font-size:9px;color:#22c55e;">空き</span>';return`<tr style="border-bottom:1px solid #f3f4f6;">
      <td style="padding:4px 6px;font-size:12px;font-weight:600;">${i.tankNo}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${ls(i.capacityL)}L</td>
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
  </section>`}function Dm(e,t,n){if(e.length===0||n.length===0)return"";const o=new Map(n.map(h=>[h.stepName,h])),r=new Map;for(const h of e){if(!h.plannedStart||!h.plannedEnd)continue;const g=o.get(h.stepName);if(!g)continue;const y=new Date(h.plannedStart),$=new Date(h.plannedEnd),S=Math.max(Math.round(($.getTime()-y.getTime())/864e5)+1,1);let _=0;for(let k=0;k<S;k++)new Date(y.getTime()+k*864e5).getDay()!==0&&_++;if(_===0)continue;const L=g.laborHours/_;for(let k=new Date(y);k<=$;k=new Date(k.getTime()+864e5)){if(k.getDay()===0)continue;const C=new Date(k);C.setDate(C.getDate()+3-(C.getDay()+6)%7);const E=new Date(C.getFullYear(),0,4),s=1+Math.round(((C.getTime()-E.getTime())/864e5-3+(E.getDay()+6)%7)/7),l=`${C.getFullYear()}-W${String(s).padStart(2,"0")}`;r.set(l,(r.get(l)??0)+L)}}if(r.size===0)return"";const i=[...r.keys()].sort(),c=t.workerCount*t.weeklyHoursLimit,d=Math.max(...r.values(),c),u=i.map(h=>{const g=r.get(h)??0,y=Math.min(g/d*100,100),$=g>c,S=$?"#ef4444":g>c*.8?"#f59e0b":"#22c55e",_=h.replace(/^\d{4}-W/,"W");return`<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${y}%;background:${S};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(g)}h / ${c}h"></div>
      </div>
      <div style="font-size:8px;color:#9ca3af;margin-top:2px;">${_}</div>
      <div style="font-size:9px;font-weight:600;color:${$?"#ef4444":"#374151"};">${Math.round(g)}h</div>
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
  </section>`}function qm(e,t,n,o={}){const{expandedBatchId:r,showNewForm:i,schedule:c=[],fy:d=2026,workerSettings:u={workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},stepLabor:h=[],tanks:g=[],selectedBatchIds:y=[]}=o,$={};for(const s of t)($[s.batchId]??=[]).push(s);const S=e.filter(s=>s.status==="active").length,_=e.filter(s=>s.status==="planned").length,L=e.filter(s=>s.status==="completed").length,k=r?e.find(s=>s.id===r):null,C=k?km(k,$[k.id]??[]):"",E=k?Lm(k,$[k.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">製造管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規仕込</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">醸造中</p><p class="kpi-value">${S}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${_}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${L}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${Sm(e,$,r)}
    ${Dm(t,u,h)}
    ${Cm(g,e,$)}
    ${i?Am(n):""}
    ${Em(c,e)}
    ${C}
    ${E}
    ${Pm(e,$,r,y)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">仕込を削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> の仕込を削除します。<br>関連する全工程データも削除されます。この操作は取り消せません。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}const ga=4,va=1,Yt=4e3,Gt=3e5,Tm=2,Gs={soumu:"総",route_sales:"ル",brewing:"造",bottling:"詰",labeling:"貼",delivery:"配"};function ke(e){return e==null?"—":"¥"+Math.round(e).toLocaleString("ja-JP")}function Im(e){return`${e}月`}const at={soumu:"#3b82f6",route_sales:"#10b981",brewing:"#8b5cf6",bottling:"#f59e0b",labeling:"#ec4899",delivery:"#6b7280"},zr={employee:"社員",part_time:"パート",contractor:"業務委託"},Xt={employee:"#10b981",part_time:"#f59e0b",contractor:"#6b7280"};function Mm(e,t){const n=Object.keys(Ie),o=t?e.filter(S=>S.department===t):e,r=o.filter(S=>S.isActive),i=o.filter(S=>!S.isActive);function c(S){return`<span style="display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${at[S]};">${Ie[S]}</span>`}function d(S){return S.crossDepartments.length?S.crossDepartments.map(_=>`<span style="display:inline-block;padding:0 5px;border-radius:8px;font-size:10px;border:1px solid ${at[_]};color:${at[_]};margin-left:3px;">${Ie[_]}</span>`).join(""):""}function u(S){if(S.employmentType==="employee")return`月給 ${ke(S.monthlySalary)}`;if(S.employmentType==="contractor")return`委託 ${ke(S.contractFee)}/日`;const _=S.shiftPreference?as[S.shiftPreference]:"";return`時給 ${ke(S.hourlyRate)}${_?`・${_}`:""}`}function h(S){return S.monthlyTasks.length?S.monthlyTasks.map(_=>`<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#7c3aed20;color:#7c3aed;border:1px solid #7c3aed40;margin-left:3px;">${ts[_]}</span>`).join(""):""}function g(S){const _=S.availableMonths?S.availableMonths.map(Im).join("・"):"通年",L=S.isDeptLeader?'<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#f59e0b20;color:#d97706;border:1px solid #f59e0b40;margin-left:4px;">部門長</span>':"";return`<tr class="${S.isActive?"":"row-inactive"}">
      <td>
        ${S.name}${L}${S.kana?`<br><span style="font-size:11px;color:var(--text-secondary);">${S.kana}</span>`:""}
        ${h(S)}
      </td>
      <td>${c(S.department)}${d(S)}</td>
      <td><span class="status-pill" style="background:${Xt[S.employmentType]}20;color:${Xt[S.employmentType]};border:1px solid ${Xt[S.employmentType]}40;">${zr[S.employmentType]}</span></td>
      <td style="font-size:13px;">${u(S)}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${_}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${S.notes||""}</td>
      <td style="white-space:nowrap;">
        <button class="button secondary small" data-edit-staff="${S.id}">編集</button>
        <button class="button secondary small danger" data-delete-staff="${S.id}" data-staff-name="${S.name}" style="margin-left:4px;">削除</button>
      </td>
    </tr>`}const y=["",...n].map(S=>`<button class="button ${t===S?"primary":"secondary"} small" data-staff-dept-filter="${S}">${S?Ie[S]:"全部門"}</button>`).join(""),$=7;return`
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      <div style="display:flex;gap:4px;flex-wrap:wrap;">${y}</div>
      <button class="button primary small" data-action="staff-new" style="margin-left:auto;">＋ スタッフ追加</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>氏名</th><th>主部門 / 兼務</th><th>種別</th><th>賃金</th><th>稼働月</th><th>備考</th><th></th>
        </tr></thead>
        <tbody>
          ${r.map(g).join("")||`<tr><td colspan="${$}" class="empty-row">スタッフが登録されていません</td></tr>`}
          ${i.length>0?`
            <tr><td colspan="${$}" style="padding:4px 8px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);">── 休職・退職・終了 ──</td></tr>
            ${i.map(g).join("")}
          `:""}
        </tbody>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:6px;">
      枠付きバッジ = 兼務可能部門（越境）
    </p>
  `}function Xs(e){const t=!!e?.id,n=e?.availableMonths?e.availableMonths.join(","):"",o=Object.keys(Ie),r=o.map(c=>`<option value="${c}" ${e?.department===c?"selected":""}>${Ie[c]}</option>`).join(""),i=o.map(c=>`
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
                    ${as[c]}
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
                    ${ts[c]}
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
  `}function Zs(e,t){return!e.isActive||e.availableMonths&&!e.availableMonths.includes(t)?0:e.employmentType==="employee"?e.monthlySalary??0:0}function Nm(e,t){const[,n]=t.split("-").map(Number),o=Object.keys(Ie),r=new Date,i=Array.from({length:24},(u,h)=>{const g=new Date(r.getFullYear(),r.getMonth()-6+h,1),y=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`;return`<option value="${y}" ${y===t?"selected":""}>${y.replace("-","年")}月</option>`}).join("");let c=0;const d=o.map(u=>{const h=e.filter($=>$.department===u);if(h.length===0)return"";const g=h.reduce(($,S)=>$+Zs(S,n),0);c+=g;const y=h.map($=>{const S=Zs($,n),_=!$.isActive||$.availableMonths&&!$.availableMonths.includes(n),L=$.employmentType==="employee"?`月給 ${ke($.monthlySalary)}`:$.employmentType==="contractor"?`委託 ${ke($.contractFee)}/日`:`時給 ${ke($.hourlyRate)} × ${$.workHoursPerDay}h（呼び出し）`,k=_?'<span style="color:var(--text-secondary);font-size:11px;">稼働外</span>':$.employmentType==="part_time"||$.employmentType==="contractor"?'<span style="color:var(--text-secondary);font-size:11px;">実績で集計</span>':ke(S);return`<tr style="${_?"opacity:0.45;":""}">
        <td style="padding-left:20px;">${$.name}</td>
        <td><span style="font-size:11px;padding:1px 6px;border-radius:8px;background:${Xt[$.employmentType]}20;color:${Xt[$.employmentType]};">${zr[$.employmentType]}</span></td>
        <td style="font-size:12px;">${L}</td>
        <td class="numeric"><strong>${k}</strong></td>
      </tr>`}).join("");return`
      <tr style="background:var(--surface-alt);">
        <td colspan="3">
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${at[u]};margin-right:6px;"></span>
          <strong>${Ie[u]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);margin-left:6px;">${h.length}名</span>
        </td>
        <td class="numeric"><strong>${g>0?ke(g):"—"}</strong></td>
      </tr>
      ${y}`}).join("");return`
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
  `}const pn=25,un=15,mn=640;function Rm(e,t,n,o,r,i=[],c=[]){const[d,u]=e.split("-").map(Number),h=W=>String(W).padStart(2,"0"),g=new Date(d,u,0).getDate(),y=r?.workingDays??26,$=n.some(W=>{for(let re=0;re<W.durationMonths;re++)if((W.brewMonth-1+re)%12+1===u)return!0;return!1}),S=(r?.prevYearDocumentCount??0)||(r?.monthlyDocumentCount??0),_=(r?.prevYearRouteSalesAmount??0)||(r?.routeSalesAmount??0),L=r?.directSalesCount??0,k=y>0?S/y:0,C=y>0?_/y:0,E=y>0?L/y:0;function s(W,re){return t.filter(Pe=>Pe.isActive&&(Pe.department===W||Pe.crossDepartments.includes(W))&&(!Pe.availableMonths||Pe.availableMonths.includes(u))&&(!re||re.includes(Pe.employmentType)))}const l=[];for(let W=1;W<=g;W++)new Date(d,u-1,W).getDay()!==0&&l.push(W);const p=new Set(l.slice(-5));function m(W,re){const Pe=new Date(d,u-1,re).getDay();return W.filter(De=>!(De.fixedDaysOff??[]).includes(Pe))}function f(W,re){const Pe=W.filter(De=>De.isDeptLeader);return Pe.length===0?!0:m(Pe,re).length>0}function x(W){return[...W].sort((re,Pe)=>{const De=rt=>rt.isDeptLeader?0:rt.employmentType==="employee"?1:rt.employmentType==="part_time"?2:3;return De(re)-De(Pe)})}const b=s("soumu",["employee"]);s("soumu",["part_time"]).filter(W=>(W.shiftPreference??"both")!=="afternoon"),s("soumu",["part_time"]).filter(W=>(W.shiftPreference??"both")!=="morning");const w=Math.max(b.length,Math.ceil(k/pn),Math.ceil(E/un));Math.max(0,w-b.length);const P=s("route_sales",["employee"]),D=s("delivery",["contractor"]),q=P.length*Gt,R=Math.max(0,C-q),B=R>0?Math.min(D.length,Math.ceil(R/Gt)):0,M=i.reduce((W,re)=>W+re.demandForecast,0),O=i.reduce((W,re)=>W+re.requiredProduction,0)||i.reduce((W,re)=>W+re.plannedQty,0),I=M>0?M:(r?.prevYearTotalQuantity??0)>0?r.prevYearTotalQuantity:(r?.currentTotalQuantity??0)>0?r.currentTotalQuantity:0,z=o>0?o:O>0?O:I,V=s("bottling"),U=s("labeling"),G=s("brewing"),H=i.length>0?i.filter(W=>(W.requiredProduction||W.plannedQty)>0).map(W=>({productCode:W.productCode,productName:W.productName,qty:W.requiredProduction||W.plannedQty,daysNeeded:Math.max(1,Math.ceil((W.requiredProduction||W.plannedQty)/Yt))})):z>0?[{productCode:"",productName:"詰口計画",qty:z,daysNeeded:Math.ceil(z/Yt)}]:[],Q=`${d}-${h(u)}`,Z=c.filter(W=>W.date.startsWith(Q)&&(W.partTimers>0||W.employees>0)).sort((W,re)=>W.date.localeCompare(re.date)),ne=Z.length>=5?Z.map(W=>parseInt(W.date.slice(-2))).filter(W=>!p.has(W)):l.filter(W=>!p.has(W)),K=new Map(Z.map(W=>[parseInt(W.date.slice(-2)),W])),J=new Map;let X=0;for(const W of H)for(let re=0;re<W.daysNeeded&&X<ne.length;re++,X++){const Pe=ne[X],De=W.qty-re*Yt,rt=Math.min(De,Yt);J.set(Pe,{productCode:W.productCode,productName:W.productName,dailyQty:rt})}const se=Math.max(va,Math.min(U.length||1,3)),ge=I>0?Math.ceil(I/(mn*se)):0,de=ne.slice(Math.floor(ne.length/2)),xe=new Set;if(ge>0&&de.length>0){const W=de.length/Math.min(ge,de.length);for(let re=0;re<ge&&re<de.length;re++)xe.add(de[Math.min(Math.round(re*W),de.length-1)])}const Ne=xe.size>0?Math.ceil(I/xe.size):0,wt=Math.max(va,Math.min(U.length||1,Math.ceil(Ne/mn))),ot=o>0?`手動入力 ${o.toLocaleString("ja-JP")}本`:O>0?`需要計画（必要生産 ${O.toLocaleString("ja-JP")}本）`:(r?.prevYearTotalQuantity??0)>0?`前年同月実績 ${r.prevYearTotalQuantity.toLocaleString("ja-JP")}本`:(r?.currentTotalQuantity??0)>0?`当月実績 ${r.currentTotalQuantity.toLocaleString("ja-JP")}本`:"実績データなし",Ka=M>0?`需要計画 出荷見込み ${M.toLocaleString("ja-JP")}本`:ot,Qe=[];for(const W of l){const re=`${d}-${h(u)}-${h(W)}`,Pe=p.has(W),De=J.get(W),rt=De!==void 0,ei=xe.has(W),ms=x(s("soumu")),Qa=m(ms,W),ys=Qa.filter(me=>me.employmentType==="employee"),ti=Qa.filter(me=>me.employmentType==="part_time"&&(me.shiftPreference??"both")!=="afternoon"),ai=Qa.filter(me=>me.employmentType==="part_time"&&(me.shiftPreference??"both")!=="morning"),ni=f(ms,W),oa=ys.map(me=>me.id);let ra=Math.max(0,w-ys.length)+(Pe?1:0);for(const me of ti){if(ra<=0)break;oa.push(me.id),ra--}for(const me of ai){if(ra<=0)break;oa.includes(me.id)||(oa.push(me.id),ra--)}const si=[Pe?"棚卸週（月末棚卸対応）":null,ni?null:"⚠ 部門長不在",`伝票${Math.round(k)}件/日 ÷ ${pn}件/人 = ${Math.ceil(k/pn)}名必要`,`来客${Math.round(E)}件/日 ÷ ${un}件/人 = ${Math.ceil(E/un)}名必要(AM)`].filter(Boolean).join(" | ");Qe.push({planDate:re,department:"soumu",staffMemberIds:oa,notes:si});const hs=x(s("route_sales")),Wa=m(hs,W),oi=f(hs,W);Qe.push({planDate:re,department:"route_sales",staffMemberIds:Wa.map(me=>me.id),notes:[oi?null:"⚠ 部門長不在",`前年同月日次平均 ${ke(C)}`,`社員${Wa.length}台 × 積載 ${ke(Gt)}/台`].filter(Boolean).join(" | ")});const ri=m(x(D),W).slice(0,B);if(Qe.push({planDate:re,department:"delivery",staffMemberIds:ri.map(me=>me.id),notes:B===0?`社員${Wa.length}台（${ke(q)}/日）で対応可 | 超過なし`:`社員キャパ超過 ${ke(R)}/日 → 委託${B}台追加`}),$){const me=x(G),Mt=m(me,W),it=f(me,W);Mt.length>0&&Qe.push({planDate:re,department:"brewing",staffMemberIds:Mt.map(Ga=>Ga.id),notes:[it?null:"⚠ 部門長不在（代行要確認）",`醸造月（${u}月） | 調達計画に基づく仕込み`].filter(Boolean).join(" | ")})}if(rt&&De){const me=x(V);if(f(me,W)||me.filter(it=>it.isDeptLeader).length===0){const it=K.get(W),Ga=it?Math.max(ga,it.partTimers+it.employees):ga,Xa=m(me,W).slice(0,Math.min(me.length,Ga)),fs=De.productName?`${De.productName}（${De.productCode}）`:ot;Qe.push({planDate:re,department:"bottling",staffMemberIds:Xa.map(ii=>ii.id),notes:Xa.length<ga?`⚠ 要員不足 ${Xa.length}/${ga}名 | ${fs}`:`${fs} | 本日目標 ${De.dailyQty.toLocaleString("ja-JP")}本 | 日産上限 ${Yt.toLocaleString("ja-JP")}本/単一酒質`})}}if(ei){const me=m(x(U),W).slice(0,wt);Qe.push({planDate:re,department:"labeling",staffMemberIds:me.map(Mt=>Mt.id),notes:me.length<va?`⚠ 要員不足 ${me.length}/${va}名`:`${Ka} | 本日目標 ${Ne.toLocaleString("ja-JP")}本 (${wt}名 × ${mn}本/人日)`})}}return Qe}function Om(e,t,n,o,r,i,c){const[d,u]=t.split("-").map(Number),h=w=>String(w).padStart(2,"0"),g=new Date(d,u,0).getDate(),y=new Date(d,u-1,1).getDay(),$=y===0?6:y-1,S=new Date().toISOString().slice(0,10),_=new Map(e.map(w=>[w.id,w])),L=new Map;for(const w of i){const P=L.get(w.planDate)??[];P.push(w),L.set(w.planDate,P)}const k=i.length>0,C=new Date,E=Array.from({length:24},(w,P)=>{const D=new Date(C.getFullYear(),C.getMonth()-6+P,1),q=`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`;return`<option value="${q}" ${q===t?"selected":""}>${q.replace("-","年")}月</option>`}).join(""),l=["月","火","水","木","金","土","日"].map((w,P)=>`<div style="text-align:center;padding:5px 2px;font-size:11px;font-weight:700;color:${P===6?"#ef4444":"var(--text-secondary)"};background:var(--surface-alt);border-radius:4px;">${w}</div>`).join(""),p=Array($).fill("<div></div>").join(""),m=Array.from({length:g},(w,P)=>{const D=P+1,q=`${d}-${h(u)}-${h(D)}`,R=new Date(d,u-1,D).getDay(),B=R===0,M=q===S,O=q===c,I=L.get(q)??[],z=I.some(Q=>Q.notes?.includes("棚卸")),V=I.some(Q=>Q.notes?.includes("⚠")),U=I.map(Q=>{const Z=at[Q.department],ee=Q.staffMemberIds.length,ne=Q.staffMemberIds.map(K=>_.get(K)?.name??"?").join(", ");return`<span style="display:inline-flex;align-items:center;gap:1px;font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;background:${Z}22;color:${Z};font-weight:700;border:1px solid ${Z}44;cursor:pointer;" title="${Ie[Q.department]}: ${ne}">
        ${Gs[Q.department]}<span style="font-size:8px;opacity:0.85;">${ee}</span>
      </span>`}).join("");return`<div data-shift-day="${q}" style="border:${O?"2px solid var(--accent)":M?"2px solid #f59e0b":"1px solid var(--border)"};border-radius:4px;padding:3px 4px;min-height:72px;background:${B?"var(--surface-alt)":"var(--surface)"};cursor:pointer;position:relative;${B?"opacity:0.5;":""}${I.length===0&&!B?"opacity:0.35;":""}">
      <div style="font-size:10px;font-weight:700;color:${R===6?"#6b7280":B?"#ef4444":M?"#f59e0b":O?"var(--accent)":"var(--text-secondary)"};margin-bottom:2px;">
        ${D}${M?" ●":""}
      </div>
      <div style="display:flex;flex-wrap:wrap;">${U}</div>
      ${z?'<div style="font-size:7px;color:#7c3aed;font-weight:700;margin-top:1px;">棚卸</div>':""}
      ${V?'<div style="font-size:7px;color:#ef4444;font-weight:700;margin-top:1px;">⚠要確認</div>':""}
    </div>`}).join(""),f=["日","月","火","水","木","金","土"],x=c?(()=>{const[w,P,D]=c.split("-").map(Number),q=f[new Date(w,P-1,D).getDay()],R=L.get(c)??[];if(R.length===0)return`<div class="panel" style="margin-top:12px;padding:14px 16px;">
        <p style="font-weight:700;margin:0 0 6px;">${w}年${P}月${D}日（${q}）</p>
        <p style="font-size:12px;color:var(--text-secondary);">この日のシフト計画はありません（日曜または未生成）。</p>
      </div>`;const B=R.map(M=>{const O=at[M.department],I=M.staffMemberIds.map(H=>_.get(H)).filter(Boolean),z=I.filter(H=>H.isDeptLeader).map(H=>H.name),V=I.filter(H=>!H.isDeptLeader).map(H=>H.name),U=I.length===0?'<span style="color:var(--text-secondary);font-size:11px;">担当なし</span>':[...z.map(H=>`<span style="font-weight:700;color:${O};">${H}★</span>`),...V.map(H=>`<span>${H}</span>`)].join("、"),G=(M.notes??"").split(" | ").filter(Boolean);return`<div style="padding:10px 0;border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${O};flex-shrink:0;"></span>
          <strong style="color:${O};font-size:13px;">${Ie[M.department]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);">${I.length}名</span>
        </div>
        <div style="font-size:12px;margin-bottom:4px;">出勤: ${U}</div>
        <div style="font-size:11px;color:var(--text-secondary);display:flex;flex-direction:column;gap:2px;">
          ${G.map(H=>`<span style="padding:1px 0;${H.startsWith("⚠")?"color:#ef4444;font-weight:600;":""}">${H}</span>`).join("")}
        </div>
      </div>`}).join("");return`<div class="panel" style="margin-top:12px;padding:14px 16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <p style="font-weight:700;margin:0;font-size:14px;">${w}年${P}月${D}日（${q}）の配置</p>
        <button class="button secondary small" data-action="shift-day-close">閉じる</button>
      </div>
      ${B}
    </div>`})():`<div style="margin-top:8px;padding:10px 14px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);border-radius:6px;">
    日付をクリックすると出勤者・根拠が表示されます。★=部門長
  </div>`,b=r?(()=>{const w=Gt*Tm*r.workingDays,P=w>0?Math.min(100,Math.round(r.routeSalesAmount/w*100)):0,D=P>=90?"#ef4444":P>=70?"#f59e0b":"#10b981",q=w>0?Math.min(100,Math.round(r.prevYearRouteSalesAmount/w*100)):0;return`<div class="panel" style="padding:10px 16px;margin-top:8px;">
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
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">配送積載率（2台 ${ke(Gt)}/日）</p>
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
          value="${o||""}" min="0" step="100"
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
      ${Object.keys(Ie).map(w=>`<span style="display:inline-flex;align-items:center;gap:3px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${at[w]};"></span>
          <strong style="color:${at[w]};">${Gs[w]}</strong>${Ie[w]}
        </span>`).join("")}
      <span>| 数字=配置人数 | ★=部門長 | 月〜土が営業日</span>
    </div>

    ${x}
    ${b}
  `}function Bm(e,t,n,o,r,i=0,c=null,d=[],u=null){const h=t==="staff"?Mm(e,n):t==="cost"?Nm(e,o):Om(e,o,r,i,c,d,u);return`
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
      ${h}
    </section>
  `}function qn(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function zm(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function jr(e){return e?Ya.find(t=>t.value===e)?.label??e:""}function jm(e){const t=[],n=[],o=[];for(const r of e){const i=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,c={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:i,status:"dormant"};r.is_at_risk?t.push({...c,status:"at-risk"}):r.is_dormant?n.push({...c,status:"dormant"}):r.amount_last_year_same_month>0&&i<.8&&o.push({...c,status:"declining"})}return t.sort((r,i)=>i.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,i)=>i.daysSinceLastOrder-r.daysSinceLastOrder),o.sort((r,i)=>r.yoyRatio-i.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:o}}function Fm(e,t){const n=t?.reason??"",o=Ya.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${o}
    </select>`}function Vm(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],o=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,i=r?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${jr(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${i}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${o}
      <td class="numeric">${qn(e.totalAmountLast12m)}</td>
      <td>${Fm(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function yn(e,t,n,o,r,i,c,d){if(r.length===0)return"";const u=r.map(h=>Vm(h,d.get(h.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${o}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${zm(i)}</p>
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
    </section>`}function Ym(e,t=[]){const{atRiskCustomers:n,dormantCustomers:o,decliningCustomers:r}=e,i=n.length+o.length+r.length,c=n.reduce((k,C)=>k+C.totalAmountLast12m,0),d=o.reduce((k,C)=>k+C.totalAmountLast12m,0),u=r.reduce((k,C)=>k+C.totalAmountLast12m,0),h=[...n,...o,...r],g=[...new Set(h.map(k=>k.areaCode).filter(Boolean))].sort(),y=[...new Set(h.map(k=>k.businessType).filter(Boolean))].sort(),$=new Map(t.map(k=>[k.customerCode,k])),S=t.filter(k=>k.actionedAt).length,_=new Map;t.forEach(k=>{k.reason&&_.set(k.reason,(_.get(k.reason)??0)+1)});const L=[..._.entries()].sort((k,C)=>C[1]-k[1]).slice(0,5).map(([k,C])=>`<span class="status-pill info" style="font-size:0.75rem;">${jr(k)} ${C}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${qn(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${o.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${qn(d)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${S}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${i}社中</div>
      </div>
    </section>

    ${L?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${L}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${i})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${o.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${r.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${g.map(k=>`<option value="${k}">${k}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${y.map(k=>`<option value="${k}">${k}</option>`).join("")}
      </select>
    </div>

    ${yn("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",$)}
    ${yn("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",o,d,"経過日数",$)}
    ${yn("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",$)}

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
    <\/script>`}const nt=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Tn={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},tt={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Um(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Jm(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const o=Math.max(...e);return e.filter(i=>i>o*.1).length<=6?"seasonal":"year-round"}function Hm(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return[];const o=t/12*1.5,r=[];for(let i=0;i<12;i++)e[i]>o&&r.push(i);if(r.length===0){const i=Math.max(...e);i>0&&r.push(e.indexOf(i))}return r.sort((i,c)=>i-c)}function Km(e){return e.length===0?0:(e[0]-2+12)%12}function eo(e){const t=new Date().getMonth(),n=e.map(r=>{const i=Jm(r.monthlyQuantity),c=Hm(r.monthlyQuantity),d=Km(c);return{code:r.code,name:r.name,category:r.category,peakMonths:c,proposalStartMonth:d,seasonType:i,monthlyQuantity:r.monthlyQuantity}}),o=[];for(let r=0;r<12;r++){const i=n.filter(c=>{if(c.peakMonths.length===0)return!1;const d=c.proposalStartMonth,u=c.peakMonths[0];return d<=u?r>=d&&r<=u:r>=d||r<=u});o.push({month:r,products:i,targetCustomers:[]})}return{products:n,proposals:o,selectedMonth:t}}function Qm(e){const{products:t,proposals:n,selectedMonth:o}=e,r=new Date().getMonth(),i={"year-round":[],seasonal:[],"year-end":[]};t.forEach(y=>i[y.seasonType].push(y));const c=n[o],d=t.length,u=c?.products.length??0,h=t.filter(y=>y.peakMonths.includes(o)).length,g=c?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${nt[o]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${nt[o]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${h}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${g}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${nt.map((y,$)=>{const S=$===r,_=$===o;return`<button class="button" style="padding:4px 10px;background:${_?"#0F5B8D":S?"#e2e8f0":"transparent"};color:${_?"#fff":"#333"};border:${S&&!_?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${$}">${y}${S?" ●":""}</button>`}).join("")}
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
            ${nt.map((y,$)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${$===r?"background:#f0f7ff;":""}">${y.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Wm(i,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${Gm(i,o)}

  <!-- Target customer list for selected month -->
  ${Xm(c)}
</div>`}function Wm(e,t){const n=[],o=["year-round","seasonal","year-end"];for(const r of o){const i=e[r];if(i.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${tt[r]}15;color:${tt[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${Tn[r]}</span>
    </td></tr>`);for(const c of i){const d=nt.map((u,h)=>{const g=c.peakMonths.includes(h),y=Fr(c,h),$=h===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let S="transparent";g?S=tt[c.seasonType]:y&&(S=tt[c.seasonType]+"40");const _=g||y?`background:${S};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${$}"><div style="${_}" title="${g?"ピーク":y?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${tt[c.seasonType]}15;color:${tt[c.seasonType]}">${Tn[c.seasonType]}</span></td>
        ${d}
      </tr>`)}}}return n.join("")}function Fr(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,o=e.peakMonths[0];return n<=o?t>=n&&t<o:t>=n||t<o}function Gm(e,t){const o=["year-round","seasonal","year-end"].map(r=>{const i=e[r];if(i.length===0)return"";const c=i.filter(u=>u.peakMonths.includes(t)||Fr(u,t));if(c.length===0)return"";const d=c.map(u=>{const g=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',y=u.monthlyQuantity.reduce(($,S)=>$+S,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${g}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${y.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map($=>nt[$]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${tt[r]}15;color:${tt[r]}">${Tn[r]}</span>
        <span style="font-size:0.85rem;color:#666">${nt[t]}の対象: ${c.length}品</span>
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
    </div>`}).filter(Boolean);return o.length===0?`<div style="padding:1rem;color:#666;text-align:center">${nt[t]}に提案対象の商品はありません</div>`:o.join("")}function Xm(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${Um(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const Zm=["日","月","火","水","木","金","土"];function ba(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:`¥${e.toLocaleString()}`}function Et(e,t){if(t===0&&e===0)return'<span class="sc-yoy sc-yoy-flat">—</span>';if(t===0)return'<span class="sc-yoy sc-yoy-up">NEW</span>';const n=Math.round((e/t-1)*100);return n>0?`<span class="sc-yoy sc-yoy-up">+${n}%</span>`:n<0?`<span class="sc-yoy sc-yoy-down">${n}%</span>`:'<span class="sc-yoy sc-yoy-flat">±0%</span>'}function cs(e){return e?e.totalVolumes.reduce((t,n)=>t+n.bottles,0):0}function Vr(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n-1,1),r=new Date(t,n,0),i=[];for(let c=0;c<o.getDay();c++)i.push({outside:!0});for(let c=1;c<=r.getDate();c++)i.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;i.length%7!==0;)i.push({outside:!0});return i}function to(e){const[t,n,o]=e.split("-").map(Number),i=new Date(t,n-1,o).getDay(),c=Math.ceil(o/7),u=new Date(t-1,n-1,1).getDay(),g=1+(i-u+7)%7+(c-1)*7,y=new Date(t-1,n,0).getDate();return g>y?"":`${t-1}-${String(n).padStart(2,"0")}-${String(g).padStart(2,"0")}`}function ao(e,t){const[n,o]=t.split("-").map(Number),r=new Date(n,o,0).getDate(),i=Array.from({length:7},()=>({count:0,amount:0,bottles:0,days:0}));for(let c=1;c<=r;c++){const d=`${t}-${String(c).padStart(2,"0")}`,u=new Date(n,o-1,c).getDay();i[u].days++;const h=e[d];h&&(i[u].count+=h.count,i[u].amount+=h.totalAmount,i[u].bottles+=cs(h))}return i}function ey(e,t){const n=[];for(let o=0;o<t.length;o+=7){const r=t.slice(o,o+7);let i=0,c=0,d=0,u=0;for(const h of r)if(h.date){u++;const g=e[h.date];g&&(i+=g.count,c+=g.totalAmount,d+=cs(g))}n.push({count:i,amount:c,bottles:d,days:u})}return n}function ty(e,t){const[n,o]=t.split("-").map(Number),r=`${n-1}-${String(o).padStart(2,"0")}`,i=Vr(r),c=[];for(let d=0;d<i.length;d+=7){const u=i.slice(d,d+7);let h=0,g=0,y=0,$=0;for(const S of u)if(S.date){$++;const _=e[S.date];_&&(h+=_.count,g+=_.totalAmount,y+=cs(_))}c.push({count:h,amount:g,bottles:y,days:$})}return c}function ay(e,t,n,o){const[r,i]=t.split("-").map(Number),c=new Date(r,i-2,1),d=new Date(r,i,1),u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,h=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,g=new Date().toISOString().slice(0,10),y=o??{},$=Vr(t),S=e?ao(e,t):null,_=`${r-1}-${String(i).padStart(2,"0")}`,L=o?ao(o,_):null,k=e?ey(e,$):null,C=o?ty(o,t):null;let E="";if(e===null)E='<div class="sc-loading" style="grid-column:1/-1;"><div class="loading-spinner"></div><p>読み込み中…</p></div>';else for(let x=0;x<$.length;x++){const b=$[x];if(b.outside)E+='<div class="sc-cell sc-outside"></div>';else{const w=b.date,P=Number(w.split("-")[2]),D=new Date(`${w}T00:00:00`).getDay(),q=e[w],R=w===g,B=w===n,M=y[to(w)],O=q?.totalAmount??0,I=M?.totalAmount??0;let z="",V="",U="",G="";q&&(z=`<span class="sc-badge">${q.count}件</span>`,V=`<div class="sc-day-amt">${ba(O)}</div>`,G=q.cityGroups.slice(0,2).map(H=>`<span class="sc-city-tag">${H.city}<em>${H.count}</em></span>`).join(""),q.cityGroups.length>2&&(G+=`<span class="sc-city-more">+${q.cityGroups.length-2}</span>`)),(O>0||I>0)&&(U=`<div class="sc-day-yoy">${Et(O,I)}</div>`),E+=`
          <div class="sc-cell ${R?"sc-today":""} ${B?"sc-selected":""} ${q?"sc-has-data":""}"
               data-sc-date="${w}">
            <div class="sc-day-header">
              <span class="sc-day-num ${D===0?"sc-sun":D===6?"sc-sat":""}">${P}</span>
              ${z}
            </div>
            ${V}
            ${U}
            <div class="sc-cities">${G}</div>
          </div>`}if((x+1)%7===0&&k){const w=Math.floor(x/7),P=k[w],D=C?.[w],q=P.days>0?P.count/P.days:0,R=D?.amount??0;E+=`
          <div class="sc-cell sc-week-total">
            <div class="sc-wt-count">${P.count}<small>件</small></div>
            <div class="sc-wt-amount">${ba(P.amount)}</div>
            <div class="sc-wt-bottles">${P.bottles}<small>本</small></div>
            <div class="sc-wt-avg">⌀${q.toFixed(1)}<small>件/日</small></div>
            ${P.amount>0||R>0?`<div class="sc-wt-yoy">${Et(P.amount,R)}</div>`:""}
          </div>`}}let s="";if(S){s=S.map((R,B)=>{const M=R.days>0?R.count/R.days:0,O=B===0?"sc-sun":B===6?"sc-sat":"",z=L?.[B]?.amount??0;return`<div class="sc-wd-summary ${O}">
        <span class="sc-wds-count">${R.count}<small>件</small></span>
        <span class="sc-wds-amt">${ba(R.amount)}</span>
        <span class="sc-wds-bottles">${R.bottles}<small>本</small></span>
        <span class="sc-wds-avg">⌀${M.toFixed(1)}</span>
        ${R.amount>0||z>0?`<span class="sc-wds-yoy">${Et(R.amount,z)}</span>`:""}
      </div>`}).join("");const x=S.reduce((R,B)=>R+B.count,0),b=S.reduce((R,B)=>R+B.amount,0),w=S.reduce((R,B)=>R+B.bottles,0),P=S.reduce((R,B)=>R+B.days,0),D=P>0?x/P:0,q=L?L.reduce((R,B)=>R+B.amount,0):0;s+=`<div class="sc-wd-summary sc-wd-month-total">
      <span class="sc-wds-count">${x}<small>件</small></span>
      <span class="sc-wds-amt">${ba(b)}</span>
      <span class="sc-wds-bottles">${w}<small>本</small></span>
      <span class="sc-wds-avg">⌀${D.toFixed(1)}</span>
      ${b>0||q>0?`<span class="sc-wds-yoy">${Et(b,q)}</span>`:""}
    </div>`}const l=n&&e?.[n]?sy(e[n],y[to(n)]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',p=Object.values(e??{}).reduce((x,b)=>x+b.count,0),m=Object.values(e??{}).reduce((x,b)=>x+b.totalAmount,0),f=Object.values(y).reduce((x,b)=>x+b.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${p>0?`月計: <strong>${p}件</strong> / <strong>¥${m.toLocaleString()}</strong> ${Et(m,f)}`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${u}">◀</button>
          <span class="sc-month-label">${r}年${i}月</span>
          <button class="sc-nav-btn" data-sc-ym="${h}">▶</button>
        </div>
        <div class="sc-unit-note">K=¥1,000 / M=¥1,000,000 ｜ 昨対: 前年同月 同週同曜日比</div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays-8">
            ${Zm.map((x,b)=>`<div class="sc-weekday ${b===0?"sc-sun":b===6?"sc-sat":""}">${x}</div>`).join("")}
            <div class="sc-weekday sc-wk-header">週計</div>
          </div>

          ${s?`<div class="sc-wd-summary-row">${s}</div>`:""}

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
  `}function ny(e){return e.length?e.map(t=>`<span class="sc-vol-badge">${t.label}<em>${t.bottles}</em></span>`).join(""):""}function sy(e,t){const n=e.date.replace(/-/g,"/").slice(5),o=e.totalVolumes.length?`<div class="sc-day-volumes">${e.totalVolumes.map(h=>`<span class="sc-vol-tag">${h.label} <strong>${h.bottles}本</strong></span>`).join("")}</div>`:"",r=t?.totalAmount??0,i=t?.count??0,c=e.totalAmount>0||r>0?`<div class="sc-detail-yoy">
        前年同日: ${i}件 / ¥${r.toLocaleString()}
        ${Et(e.totalAmount,r)}
      </div>`:"",d={};for(const h of e.entries)(d[h.city]??=[]).push(h);const u=Object.entries(d).sort((h,g)=>g[1].length-h[1].length).map(([h,g])=>{const y=g.sort(($,S)=>S.amount-$.amount).map($=>`
          <div class="sc-customer-row">
            <div class="sc-customer-main">
              <span class="sc-customer-name" title="${$.customerName}">${$.customerName}</span>
              <span class="sc-customer-amt">${$.amount>0?`¥${$.amount.toLocaleString()}`:"-"}${$.invoiceCount>1?` (${$.invoiceCount}伝票)`:""}</span>
            </div>
            ${$.volumes.length?`<div class="sc-customer-vols">${ny($.volumes)}</div>`:""}
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${h}（${g.length}先）</div>
          ${y}
        </div>`}).join("");return`
    <p class="sc-detail-date">${n}の出荷</p>
    <p class="sc-detail-meta">${e.entries.length}先 ${e.count}伝票 / ¥${e.totalAmount.toLocaleString()}</p>
    ${c}
    ${o}
    ${u}
  `}const oy=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),hn=["月","火","水","木","金"],no=6;function ry(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function iy(e,t){if(t.length===0)return 0;const n=[...t].sort((r,i)=>r-i);return n.filter(r=>r<=e).length/n.length}function ly(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function so(e){const t=new Date,n=e.map(u=>u.annualRevenue),o=e.map(u=>{const h=ry(u.lastOrderDate,t);let g=0;const y=[];h>=60&&(g+=50,y.push("離反リスク")),u.hasSeasonalProposal&&(g+=30,y.push("季節提案タイミング")),h>=30&&h<60&&(g+=20,y.push("定期巡回"));const $=iy(u.annualRevenue,n),S=Math.round($*20);S>0&&(g+=S,y.push("金額ウェイト"));const _=ly(y,h);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:g,reasons:y,lastOrderDate:u.lastOrderDate,daysSinceOrder:h,annualRevenue:u.annualRevenue,recommendedAction:_}}).filter(u=>u.priorityScore>0).sort((u,h)=>h.priorityScore-u.priorityScore),r=new Map;for(const u of o){const h=u.areaCode||"その他";r.has(h)||r.set(h,[]),r.get(h).push(u)}const i=[...r.entries()].sort((u,h)=>h[1].reduce((g,y)=>g+y.priorityScore,0)-u[1].reduce((g,y)=>g+y.priorityScore,0)),c=[];let d=0;for(const[u,h]of i){const g=h.sort((y,$)=>$.priorityScore-y.priorityScore);for(let y=0;y<g.length&&!(d>=hn.length);y+=no){const $=g.slice(y,y+no);c.push({dayLabel:hn[d],area:u,visits:$}),d++}if(d>=hn.length)break}return{candidates:o,weekPlan:c,filterArea:"",filterMinScore:0}}function cy(e){const{candidates:t,weekPlan:n,filterArea:o,filterMinScore:r}=e,i=t.filter(y=>!(o&&y.areaCode!==o||r>0&&y.priorityScore<r)),c=Array.from(new Set(t.map(y=>y.areaCode))).sort(),d=i.length,u=i.filter(y=>y.priorityScore>=50).length,h=i.filter(y=>y.reasons.includes("離反リスク")).length,g=n.reduce((y,$)=>y+$.visits.length,0);return`
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
        <div class="kpi-value">${h}</div>
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
            ${c.map(y=>`<option value="${y}"${o===y?" selected":""}>${y}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":dy(n)}
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
            ${i.map(y=>py(y)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function dy(e){return`
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
  `}function py(e){return`
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
      <td class="numeric">${oy.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function xa(e){return e.toLocaleString("ja-JP")}function uy(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},o=e.map(h=>{const g=h.capacity>0?Math.round(h.currentVolume/h.capacity*100):0;return`
      <tr data-tank-id="${h.id}">
        <td class="mono"><strong>${h.tankNo}</strong></td>
        <td>${h.displayName||"―"}</td>
        <td class="numeric">${h.depthMm>0?xa(h.depthMm):"―"}</td>
        <td class="numeric">${h.capacity>0?xa(h.capacity):"―"}</td>
        <td class="numeric">${h.litersPerMm>0?h.litersPerMm.toFixed(2):"―"}</td>
        <td class="numeric">${h.currentVolume>0?xa(h.currentVolume):"―"}</td>
        <td>
          <div class="progress-wrap"><div class="progress-bar" style="width:${g}%"></div></div>
          <span class="progress-label">${g}%</span>
        </td>
        <td><span class="status-pill ${n[h.status]}">${t[h.status]}</span></td>
        <td style="white-space:nowrap;">
          <button class="button-sm secondary" data-action="tank-edit" data-tank-id="${h.id}" style="margin-right:4px;">編集</button>
          <button class="button-sm" data-action="tank-delete" data-tank-id="${h.id}" style="color:#ef4444;border-color:#fca5a5;">削除</button>
        </td>
      </tr>`}).join(""),r=e.filter(h=>h.status==="in_use").length,i=e.filter(h=>h.status==="aging").length,c=e.filter(h=>h.status==="empty").length,d=e.reduce((h,g)=>h+g.capacity,0),u=e.reduce((h,g)=>h+g.currentVolume,0);return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>タンク管理</h1></div>
      <button class="button primary" data-action="tank-show-add">＋ タンク登録</button>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${xa(d)} L</p>
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
          <tbody>${o||'<tr><td colspan="9" class="empty-row">タンクが登録されていません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function oo(e){const t=!!e;return`
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
    </section>`}function my(e){return e.toLocaleString("ja-JP")}const ro={transfer:"タンク移動",receive:"受入",ship:"出荷・移出",blend:"ブレンド",discard:"廃棄",adjust:"調整"},yy={transfer:"#2563eb",receive:"#059669",ship:"#d97706",blend:"#7c3aed",discard:"#ef4444",adjust:"#6b7280"};function hy(e,t,n="",o=[]){const r=n?e.filter(y=>y.fromTankNo===n||y.toTankNo===n):e,i=new Map,c=[...e].sort((y,$)=>y.movementDate.localeCompare($.movementDate));for(const y of c)y.fromTankNo&&i.set(y.fromTankNo,(i.get(y.fromTankNo)??0)-y.volumeL),y.toTankNo&&i.set(y.toTankNo,(i.get(y.toTankNo)??0)+y.volumeL);const d=t.map(y=>`<option value="${y.tankNo}" ${y.tankNo===n?"selected":""}>${y.tankNo}${y.displayName?` (${y.displayName})`:""}</option>`).join(""),u=Object.entries(ro).map(([y,$])=>`<option value="${y}">${$}</option>`).join("");let h=0;const g=r.map(y=>{const $=yy[y.movementType]??"#6b7280",S=n&&y.toTankNo===n,_=n&&y.fromTankNo===n;return n&&(h+=S?y.volumeL:_?-y.volumeL:0),`<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:6px 8px;font-size:12px;white-space:nowrap;">${y.movementDate}</td>
      <td style="padding:6px 8px;"><span style="font-size:10px;padding:2px 6px;border-radius:3px;background:${$}15;color:${$};font-weight:600;">${ro[y.movementType]}</span></td>
      <td style="padding:6px 8px;font-size:12px;font-weight:600;${_?"color:#ef4444;":""}">${y.fromTankNo||"―"}</td>
      <td style="padding:6px 4px;font-size:12px;color:#9ca3af;">→</td>
      <td style="padding:6px 8px;font-size:12px;font-weight:600;${S?"color:#059669;":""}">${y.toTankNo||"―"}</td>
      <td style="padding:6px 8px;font-size:13px;font-weight:700;text-align:right;">${my(y.volumeL)} L</td>
      <td style="padding:6px 8px;font-size:11px;">${y.productName||"―"}</td>
      <td style="padding:6px 8px;font-size:11px;color:#6b7280;">${y.batchCode||""}</td>
      <td style="padding:6px 8px;font-size:11px;">${y.alcoholDegree!=null?y.alcoholDegree+"%":""}</td>
      <td style="padding:6px 8px;font-size:11px;">${y.temperature!=null?y.temperature+"℃":""}</td>
      <td style="padding:6px 8px;font-size:10px;color:#6b7280;">${y.recordedBy||""}</td>
      <td style="padding:6px 8px;font-size:10px;color:#6b7280;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${y.notes||""}</td>
      <td style="padding:6px 4px;"><button data-action="tm-delete" data-id="${y.id}" style="font-size:9px;padding:2px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
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
        <label>種別<br><select id="tm-type" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;">${u}</select></label>
        <label>移動元<br><select id="tm-from" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"><option value="">（なし）</option>${d}</select></label>
        <label>移動先<br><select id="tm-to" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"><option value="">（なし）</option>${d}</select></label>
        <label>数量(L)<br><input id="tm-vol" type="number" step="1" placeholder="0" style="width:70px;padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;"></label>
        <label>銘柄<br><select id="tm-product" style="padding:5px;border:1px solid var(--border);border-radius:4px;font-size:12px;max-width:140px;">
          <option value="">選択/直接入力</option>
          ${o.map(y=>`<option value="${y.productName}" data-batch="${y.batchCode}" data-alc="${y.alcoholDegree??""}">${y.productName}（${y.batchCode}）</option>`).join("")}
        </select></label>
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
            ${d}
          </select>
        </label>
        ${n?`<span style="font-size:12px;color:#2563eb;font-weight:600;">${n} の移動履歴（${r.length}件）</span>`:""}
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
          <tbody>${g||'<tr><td colspan="13" style="padding:20px;text-align:center;color:#9ca3af;">移動記録がありません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function fn(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function fy(e){if(e.length===0)return`<section class="panel">
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
        <tbody>${e.map(c=>{const d=c.alcDegree!==null?`${c.alcDegree}度`:'<span class="text-warning">未設定</span>',u=c.taxRatePerKl!==null?`${c.taxRatePerKl.toLocaleString("ja-JP")} 円/KL`:'<span class="text-warning">度数未設定</span>',h=c.taxRatePerKl!==null?`<strong>${c.taxAmount.toLocaleString("ja-JP")} 円</strong>`:'<span class="text-warning">—</span>';return`<tr>
      <td>${c.sakeType}</td>
      <td class="numeric">${d}</td>
      <td class="numeric">${c.volumeSaleL.toLocaleString("ja-JP",{maximumFractionDigits:3})}</td>
      <td class="numeric text-warning">${c.volumeReturnL>0?c.volumeReturnL.toLocaleString("ja-JP",{maximumFractionDigits:3}):"—"}</td>
      <td class="numeric">—</td>
      <td class="numeric">${c.volumeNetL.toLocaleString("ja-JP",{maximumFractionDigits:3})}</td>
      <td class="numeric">${u}</td>
      <td class="numeric">${h}</td>
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
  </section>`}function gy(e,t,n,o=[]){const r=e.rows.map((g,y)=>`
      <tr>
        <td class="mono">${g.taxCategory}</td>
        <td>${g.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${y}" data-tax-field="alcoholDegree" value="${g.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${y}" data-tax-field="productionVolume" value="${g.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${y}" data-tax-field="previousBalance" value="${g.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${y}" data-tax-field="exportDeduction" value="${g.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${y}" data-tax-field="sampleDeduction" value="${g.sampleDeduction}" />
        </td>
        <td class="numeric">${g.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${g.taxRate}</td>
        <td class="numeric"><strong>${fn(g.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${y}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=e.deductions.map((g,y)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${y}" data-ded-field="type">
            ${Object.keys(Sn).map($=>`<option value="${$}" ${$===g.type?"selected":""}>${Sn[$]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${y}" data-ded-field="categoryCode">
            ${Ko.map($=>`<option value="${$.code}" ${$.code===g.categoryCode?"selected":""}>${$.code}:${$.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${y}" data-ded-field="volume" value="${g.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${y}" data-ded-field="reason" value="${g.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${y}" data-ded-field="documentNo" value="${g.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${y}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),c=Array.from({length:12},(g,y)=>y+1),d=e.rows.reduce((g,y)=>g+y.exportDeduction+y.sampleDeduction,0),u=e.rows.reduce((g,y)=>g+y.productionVolume,0),h=u>0?d/u*100:0;return`
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
        <p class="kpi-value">${fn(e.totalTax)}</p>
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
      <article class="panel kpi-card ${h>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${h.toFixed(1)}%</p>
        <p class="kpi-sub">${h>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
              <th class="numeric">${fn(e.totalTax)}</th>
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

    ${fy(o)}

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
  `}const It=[{title:"販売業務",color:"#1a56db",features:[{id:"invoice-entry",route:"/invoice-entry",label:"伝票入力",desc:"売上・返品伝票の新規入力、明細追加",addedVersion:1},{id:"invoice-browse",route:"/invoice",label:"伝票照会",desc:"過去伝票の検索・表示・PDF出力",addedVersion:1},{id:"delivery-note",route:"/delivery",label:"納品書発行",desc:"納品書のPDFダウンロード・印刷",addedVersion:1},{id:"billing-monthly",route:"/billing",label:"月次請求",desc:"請求書発行・入金消込・未収管理",addedVersion:1},{id:"ledger-view",route:"/ledger",label:"得意先台帳",desc:"得意先別の取引履歴・残高確認",addedVersion:1},{id:"quote-create",route:"/quote",label:"見積作成",desc:"見積書の作成・PDF出力・メール送付",addedVersion:50},{id:"shipment-calendar",route:"/shipment-calendar",label:"配送カレンダー",desc:"伝票日付ベースの配送スケジュール確認",addedVersion:200}]},{title:"分析・レポート",color:"#7e3af2",features:[{id:"analytics-monthly",route:"/analytics",label:"月次売上グラフ",desc:"月次・商品別・得意先別の売上推移グラフ",addedVersion:1},{id:"analytics-volume",route:"/analytics",label:"移出量集計",desc:"商品・得意先別の移出量（mL）集計",addedVersion:320},{id:"customer-analysis",route:"/customer-analysis",label:"得意先分析",desc:"ABC分析・購買頻度・LTV",addedVersion:100},{id:"product-power",route:"/product-power",label:"商品力分析",desc:"商品別販売力・成長率",addedVersion:100},{id:"customer-efficiency",route:"/customer-efficiency",label:"営業効率",desc:"訪問コスト・粗利効率",addedVersion:150},{id:"report-aggregate",route:"/report",label:"集計帳票",desc:"各種集計レポートの出力",addedVersion:50},{id:"sales-list",route:"/sales",label:"売上一覧",desc:"売上明細の一覧表示・CSV出力",addedVersion:1}]},{title:"営業・顧客管理",color:"#0e9f6e",features:[{id:"churn-alert",route:"/churn-alert",label:"営業アクション",desc:"離反リスク検知・フォロー優先度",addedVersion:150},{id:"visit-planner",route:"/visit-planner",label:"訪問計画",desc:"訪問スケジュールの作成・管理",addedVersion:200},{id:"map-view",route:"/map",label:"取引先マップ",desc:"地図上で取引先の位置確認",addedVersion:100},{id:"prospects",route:"/prospects",label:"新規営業",desc:"新規開拓リストの進捗管理",addedVersion:100},{id:"email-broadcast",route:"/email",label:"メール配信",desc:"一斉メール配信・テンプレート管理",addedVersion:200},{id:"seasonal-calendar",route:"/seasonal-calendar",label:"季節提案",desc:"季節別提案スケジュール管理",addedVersion:250}]},{title:"受注・仕入",color:"#e3a008",features:[{id:"workflow-order",route:"/workflow",label:"受注ワークフロー",desc:"受注から出荷までのステータス管理",addedVersion:150},{id:"shopify-orders",route:"/shopify",label:"Shopify受注",desc:"EC受注の確認・取込",addedVersion:200},{id:"purchase-manage",route:"/purchase",label:"仕入・買掛",desc:"仕入管理・買掛金残高",addedVersion:100},{id:"payment-status",route:"/payment",label:"入金状況",desc:"入金・回収状況の一覧",addedVersion:1}]},{title:"製造管理",color:"#e02424",features:[{id:"jikomi-record",route:"/jikomi",label:"仕込管理",desc:"仕込帳・麹室・タンク仕込記録",addedVersion:200},{id:"tanks-manage",route:"/tanks",label:"タンク管理",desc:"タンク別在庫・ブレンド管理",addedVersion:200},{id:"tax-declaration",route:"/tax",label:"酒税申告書",desc:"課税移出・控除明細・eTax XML出力",addedVersion:250},{id:"tax-volume",route:"/tax",label:"移出量自動集計",desc:"販売伝票から清酒・リキュール別移出量を自動計算",addedVersion:322},{id:"demand-forecast",route:"/demand",label:"需要予測",desc:"過去実績ベースの需要予測",addedVersion:250},{id:"brewing-plan",route:"/brewing-plan",label:"醸造計画",desc:"年間醸造スケジュール管理",addedVersion:280},{id:"procurement-plan",route:"/procurement",label:"調達計画",desc:"原料米の調達・予算管理",addedVersion:280},{id:"brewing-process",route:"/brewing-process",label:"醸造工程",desc:"バッチ別工程管理・麹室制約チェック",addedVersion:300}]},{title:"マスタ・設定",color:"#6b7280",features:[{id:"master-products",route:"/master",label:"商品マスタ",desc:"商品情報の参照・編集",addedVersion:1},{id:"master-customers",route:"/master",label:"得意先マスタ",desc:"得意先情報の参照・編集",addedVersion:1},{id:"store-pos",route:"/store",label:"店舗販売",desc:"直売所のPOS・販売記録",addedVersion:250},{id:"tour-booking",route:"/tour",label:"酒蔵見学予約",desc:"見学予約の受付・管理",addedVersion:250},{id:"relay-status",route:"/setup",label:"連動状態",desc:"酒仙iとのリレー同期状態確認",addedVersion:1},{id:"csv-import",route:"/import",label:"CSV取込",desc:"マスタ・売上データのCSVインポート",addedVersion:100},{id:"user-manage",route:"/users",label:"ユーザー管理",desc:"アカウント・権限管理",addedVersion:100},{id:"url-share",route:"/",label:"URL共有",desc:"PWAモードでも全ページをURLで共有可能",addedVersion:322}]}];function io(){return It.flatMap(e=>e.features)}function vy(e,t){const n=Date.now()-2592e6;return It.flatMap(o=>o.features).filter(o=>o.route===e).some(o=>{const r=t[o.id];return r?.confirmedAt!=null&&new Date(r.confirmedAt).getTime()>n})}function by(e,t){const o=io().filter(c=>e[c.id]?.confirmedAt).length,r=io().length,i=It.map(c=>{const d=c.features.map(h=>{const g=e[h.id],y=!!g?.confirmedAt,$=g?.confirmedAt?new Date(g.confirmedAt).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}):"",S=g?.confirmedBy?`(${g.confirmedBy})`:"",_=y&&g?.confirmedAt?Date.now()-new Date(g.confirmedAt).getTime()<720*60*60*1e3:!1;return`
        <tr class="feature-row ${y?"confirmed":""}">
          <td class="feature-check">
            <input type="checkbox" class="feature-checkbox" data-feature-id="${h.id}"
              ${y?"checked":""} />
          </td>
          <td class="feature-label">
            <a href="#" data-link="${h.route}" class="feature-link">${h.label}</a>
            ${_?'<span class="badge-new-small">使用可能</span>':""}
          </td>
          <td class="feature-desc">${h.desc}</td>
          <td class="feature-version mono">v${h.addedVersion}</td>
          <td class="feature-status">
            ${y?`<span class="status-pill success">確認済 ${$} ${S}</span>`:'<span class="status-pill muted">未確認</span>'}
          </td>
        </tr>`}).join(""),u=c.features.filter(h=>e[h.id]?.confirmedAt).length;return`
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

    ${i}
  `}const xy={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let ut=null,wy=0;const In=[];function $y(){return ut&&document.body.contains(ut)||(ut=document.createElement("div"),ut.className="toast-container",document.body.appendChild(ut)),ut}function F(e,t="success",n){const o=$y(),r=++wy,i=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${xy[t]}</span>
    <span class="toast-msg">${Sy(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const d={id:r,message:e,type:t,el:c};In.push(d),o.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>_y(d);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},i)}function _y(e){const t=In.indexOf(e);t!==-1&&(In.splice(t,1),e.el.remove())}function Sy(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let Je="closed",Da="",He="",ft="",Mn=[],Zt=!1;const gn=[{id:"usage",icon:"💬",label:"使い方の質問",desc:"操作方法や機能について"},{id:"request",icon:"🔧",label:"改修・機能要望",desc:"新機能や改善の要望"},{id:"bug",icon:"🐛",label:"不具合の報告",desc:"動作がおかしい場合"},{id:"other",icon:"📝",label:"その他",desc:"上記に当てはまらない場合"}];function za(){return(location.hash.replace(/^#/,"")||"/").split("?")[0]}function ds(e){return It.flatMap(t=>t.features).filter(t=>t.route===e)}function ky(){return It.map(e=>({section:e.title,features:e.features}))}function Py(e){const t=It.flatMap(n=>n.features).find(n=>n.id===e);return t?t.label:""}function Yr(){let e=document.getElementById("chat-widget-root");return e||(e=document.createElement("div"),e.id="chat-widget-root",document.body.appendChild(e)),e}function Ey(){const e=za(),t=ds(e),n=ky(),o=t.length===1?t[0].id:"";o&&!He&&(He=o);const r=t.length>0?`<optgroup label="📍 現在のページ">${t.map(c=>`<option value="${c.id}" ${He===c.id?"selected":""}>${c.label} — ${c.desc}</option>`).join("")}</optgroup>`:"",i=n.map(c=>{const d=c.features.filter(u=>!t.some(h=>h.id===u.id));return d.length===0?"":`<optgroup label="${c.section}">${d.map(u=>`<option value="${u.id}" ${He===u.id?"selected":""}>${u.label}</option>`).join("")}</optgroup>`}).join("");return`
    <select class="cw-select" id="cw-feature-select">
      <option value="">機能を選択してください</option>
      ${r}
      ${i}
    </select>`}function Ay(){if(Je==="closed")return`
      <button class="cw-fab" id="cw-fab" aria-label="サポート">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </button>`;let e="";if(Je==="home"){const t=za(),n=ds(t),o=n.length>0?n.map(i=>i.label).join(" / "):t==="/"?"ホーム":t,r=gn.map(i=>`
      <button class="cw-category-card" data-cw-cat="${i.id}">
        <span class="cw-cat-icon">${i.icon}</span>
        <div>
          <span class="cw-cat-label">${i.label}</span>
          <span class="cw-cat-desc">${i.desc}</span>
        </div>
      </button>
    `).join("");e=`
      <div class="cw-home">
        <div class="cw-guide">
          <p class="cw-guide-title">このチャットでできること</p>
          <ul class="cw-guide-list">
            <li>画面の使い方がわからない時に質問できます</li>
            <li>「こうしてほしい」という改修要望を出せます</li>
            <li>不具合を見つけた場合の報告もこちらから</li>
          </ul>
          <p class="cw-guide-note">今いるページを自動で検出するので、気になった時にすぐ送れます。</p>
        </div>
        <div class="cw-current-page">
          <span class="cw-page-pin">📍</span>
          <span class="cw-page-label">現在のページ: ${wa(o)}</span>
        </div>
        <p class="cw-subtitle">どのようなご用件ですか？</p>
        <div class="cw-categories">${r}</div>
        <button class="cw-history-link" id="cw-show-history">過去の問い合わせを見る</button>
      </div>`}if(Je==="form"){const t=gn.find(o=>o.id===Da)?.label??"",n=Ey();e=`
      <div class="cw-form">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-form-cat">${t}</p>
        <label class="cw-label">対象の機能</label>
        ${n}
        <label class="cw-label">内容</label>
        <textarea class="cw-textarea" id="cw-message" rows="5"
          placeholder="具体的にどこをどうしたいか教えてください…">${ft}</textarea>
        <button class="cw-submit button primary" id="cw-submit"
          ${Zt?"disabled":""}>
          ${Zt?"送信中…":"送信する"}
        </button>
      </div>`}return Je==="history"&&(e=`
      <div class="cw-history">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-subtitle">過去の問い合わせ</p>
        <div class="cw-ticket-list">${Mn.length===0?'<p class="cw-empty">まだ問い合わせはありません</p>':Mn.map(n=>{const o=gn.find(u=>u.id===n.category),r=n.feature_id?Py(n.feature_id):"",i=n.created_at?new Date(n.created_at).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",c=n.status==="open"?"受付中":n.status==="in_progress"?"対応中":"完了",d=n.status==="open"?"open":n.status==="in_progress"?"progress":"done";return`
            <div class="cw-ticket">
              <div class="cw-ticket-head">
                <span class="cw-ticket-cat">${o?.icon??""} ${o?.label??n.category}</span>
                <span class="cw-ticket-status ${d}">${c}</span>
              </div>
              ${r?`<span class="cw-ticket-feature">📍 ${wa(r)}</span>`:""}
              <p class="cw-ticket-msg">${wa(n.message)}</p>
              ${n.admin_reply?`<div class="cw-ticket-reply"><strong>回答:</strong> ${wa(n.admin_reply)}</div>`:""}
              <span class="cw-ticket-date">${i}</span>
            </div>`}).join("")}</div>
      </div>`),`
    <div class="cw-panel">
      <div class="cw-header">
        <span class="cw-header-title">サポート</span>
        <button class="cw-close" id="cw-close" aria-label="閉じる">&times;</button>
      </div>
      <div class="cw-body">${e}</div>
    </div>`}function Ly(){const e=Yr();e.querySelector("#cw-fab")?.addEventListener("click",()=>{He="",Je="home",et()}),e.querySelector("#cw-close")?.addEventListener("click",()=>{Je="closed",ft="",He="",et()}),e.querySelectorAll("[data-cw-cat]").forEach(t=>{t.addEventListener("click",()=>{Da=t.dataset.cwCat??"",ft="";const n=za(),o=ds(n);He=o.length===1?o[0].id:"",Je="form",et(),e.querySelector("#cw-message")?.focus()})}),e.querySelector("#cw-back-home")?.addEventListener("click",()=>{Je="home",et()}),e.querySelector("#cw-feature-select")?.addEventListener("change",t=>{He=t.target.value}),e.querySelector("#cw-message")?.addEventListener("input",t=>{ft=t.target.value}),e.querySelector("#cw-submit")?.addEventListener("click",async()=>{if(!ft.trim()||Zt)return;Zt=!0,et();const t=za(),n=await Ae("support_tickets",{category:Da,message:ft.trim(),user_email:co(),status:"open",page_route:t,feature_id:He||null});Zt=!1,n?(F("送信しました。ありがとうございます！"),ft="",Da="",He="",Je="home"):F("送信に失敗しました","error"),et()}),e.querySelector("#cw-show-history")?.addEventListener("click",async()=>{Mn=await Y("support_tickets",{user_email:`eq.${co()}`,order:"created_at.desc",limit:"20"}),Je="history",et()})}function et(){const e=Yr();e.innerHTML=Ay(),Ly()}function wa(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let lo=!1;function co(){return wo()?.email??"anonymous"}function Cy(){lo&&document.getElementById("chat-widget-root")||(lo=!0,et())}function Me(e,t={}){const{title:n="確認",confirmLabel:o="OK",cancelLabel:r="キャンセル",variant:i="primary"}=t;return new Promise(c=>{const d=document.createElement("div");d.className="modal-backdrop confirm-backdrop",d.setAttribute("role","dialog"),d.setAttribute("aria-modal","true"),d.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${i}">
            ${i==="danger"?Dy:qy}
          </div>
          <h3 class="confirm-title">${$a(n)}</h3>
          <p class="confirm-message">${$a(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${$a(r)}</button>
          <button class="button ${i} confirm-ok">${$a(o)}</button>
        </div>
      </div>
    `;const u=g=>{d.classList.add("confirm-exit"),d.addEventListener("animationend",()=>{d.remove()},{once:!0}),c(g)};d.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),d.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),d.addEventListener("click",g=>{g.target===d&&u(!1)});const h=g=>{g.key==="Escape"&&(document.removeEventListener("keydown",h),u(!1))};document.addEventListener("keydown",h),document.body.appendChild(d),requestAnimationFrame(()=>{d.querySelector(".confirm-ok")?.focus()})})}const Dy=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,qy=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function $a(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function po(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Nn(e,t,n){if(t.length===0&&(!n||n.length===0))return;const o=n&&n.length>0?n:Object.keys(t[0]??{}).map(h=>({key:h,label:h})),i=`\uFEFF${[o.map(h=>po(h.label)).join(","),...t.map(h=>o.map(g=>po(h[g.key])).join(","))].join(`\r
`)}`,c=new Blob([i],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(c),u=document.createElement("a");u.href=d,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(d),0)}const Ty=Object.fromEntries(Ya.map(e=>[e.value,e.label])),Iy=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process","/workforce","/changelog"];let Lt=[];async function My(){const{supabaseQueryAll:e}=await N(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:n}},void 0);Lt=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const uo=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"},{path:"/tank-movements",title:"移動簿"},{path:"/changelog",title:"機能一覧・更新履歴"}];function Ur(e){const t=jn[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function ps(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),deliveryDate:"",customerCode:"",customerName:"",staffCode:"",registeredBy:"",lines:[],note:""}}function Ny(){const e=Ur("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const Ja=new Date,Ry=Ja.toISOString().slice(0,7),Oy=Ja.getFullYear(),By=Ja.getMonth()+1,zy=Ja.toISOString().slice(0,10),jy="C0011",mt=Ny();function Jr(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return Iy.includes(n)?n:"/"}function Ha(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/demand-forecast":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/tank-movements":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":case"/workforce":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":case"/shopify":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":case"/changelog":return"settings";default:return"dashboard"}}const mo=Jr(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,systemHealth:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,analysisTab:"customer",analysisPeriod:"",invoiceForm:ps(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",staffList:[],frequentCustomers:[],frequentProducts:[],pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Ry,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],genzaishuList:[],kenteiShowForm:!1,kenteiEditRecord:void 0,materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Oy,taxMonth:By,taxVolume:null,featureStatuses:null,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],mapLoaded:!1,callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...ju,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Fu},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:zy,route:mo,currentCategory:Ha(mo),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,ledgerCustomerCode:jy,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Oa(Pn()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCustomerFilter:"",quoteCustomerFilterName:"",quoteCompanySettings:Pn(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyFiscalType:"jan",customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...ss},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:mt.mode,emailRegion:mt.region,emailHistorySegment:mt.historySegment,emailTemplateId:mt.templateId,emailSubject:mt.subject,emailBody:mt.body,emailSaveMessage:mt.saveMessage,emailSending:!1,demandForecast:{...Dd},shipmentCalendarData:null,shipmentCalendarPrevYearData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:Wt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:bt,empCapacity:xt},brewingSchedule:[],staffMembers:[],workforceMetrics:null,dailyShiftPlans:[],workforceTab:"staff",staffDeptFilter:"",workforceYearMonth:new Date().toISOString().slice(0,7),shiftBottlingTarget:0,workforceSelectedDay:null,brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,bpSelectedBatchIds:[],bpWorkerSettings:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},bpStepLabor:[],bpTanks:[],tankMovements:[],tankMovementFilter:"",globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function yo(e){return e.slice(0,10)}function Fy(e){return{...e}}function ja(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Hr(){a.invoiceForm=ps(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},ja()}function Kr(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,o)=>{n.productCode.trim()||(t[`lines.${o}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${o}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${o}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${o}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Vy(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,Fy(t))}function Yy(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((o,r)=>{const i=r===0?1:2,c=1200*(r+1);return{productCode:o.code,productName:o.name,quantity:i,unitPrice:c,unit:"本",amount:i*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Tt(e){a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,a.invoicePriceGroup=e.priceGroup||"",a.invoiceForm.staffCode=e.staffCode||""}function Uy(e){const t=e.trim().toLowerCase();if(!t)return!1;const n=a.masterStats?.customers.find(r=>r.code.toLowerCase()===t);if(n)return Tt(n),!0;const o=a.masterStats?.customers.filter(r=>r.name.toLowerCase().includes(t)||(r.kanaName||"").toLowerCase().includes(t));return o&&o.length===1?(Tt(o[0]),!0):!1}function Jy(e){const t=e.trim().toLowerCase();if(!t)return!1;const n=a.masterStats?.customers.find(r=>r.name===e.trim());if(n)return Tt(n),!0;const o=a.masterStats?.customers.filter(r=>r.name.toLowerCase().includes(t)||(r.kanaName||"").toLowerCase().includes(t));return o&&o.length===1?(Tt(o[0]),!0):!1}function Qr(e){if(Fe(e),a.invoiceErrors=Kr(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){A();return}a.invoiceSaving=!0,A(),qo(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=ps(),A()}).catch(()=>{a.invoiceSaving=!1,A()})}function Wr(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((o,r)=>new Date(r.date).getTime()-new Date(o.date).getTime()).filter(o=>{const r=new Date(o.date);return!(t&&r<t||n&&r>n)})}function Gr(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?Lt:Lt.filter(e=>e.area===a.emailRegion);case"history":return Lt.filter(e=>e.historySegment===a.emailHistorySegment);default:return Lt}}function Hy(){const e=Gr();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function vn(e){const t=Gr(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(o=>o.email),status:e}}function us(){return a.user,!1}function ta(){a.globalSearchOpen=!1,a.globalQuery=""}function Ky(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:uo.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:uo}}function Qy(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Wr(a.salesSummary):[]).map(o=>({documentNo:o.documentNo,date:o.date,customerCode:o.customerCode,customerName:o.customerName,amount:o.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((o,r)=>r.balanceAmount-o.balanceAmount).map(o=>({...o})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(o=>({...o})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(o=>({...o})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(o=>({...o})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(o=>({...o})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(o=>({...o}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(o=>({...o}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Nn(n,e,t)}function gt(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=Ha(e),a.sidebarOpen=!1,e==="/customer-analysis"&&(a.analysisTab="customer"),e!=="/quote"&&(a.quoteCustomerFilter="",a.quoteCustomerFilterName=""),ta(),aa(e)}function qa(e){const t=a.demandAnalysis,n=a.safetyStockParams;if(!t||n.length===0)return[];const[o,r]=e.split("-"),i=`${parseInt(o)-1}-${r}`,c=t.months.filter(d=>d<e).slice(-3);return n.map(d=>{const u=d.productionType==="make_to_order",h=t.matrix[d.productCode]?.[i]??0,g=c.map(L=>t.matrix[d.productCode]?.[L]??0),y=g.length>0?g.reduce((L,k)=>L+k,0)/g.length:d.avgMonthlyDemand,$=u?0:h>0?Math.ceil(h):Math.ceil(y),S=u?0:Math.ceil(d.safetyStockQty),_=Math.max(0,$+S);return{id:"",yearMonth:e,productCode:d.productCode,productName:d.productName,demandForecast:$,safetyStockTarget:S,openingStock:0,requiredProduction:_,plannedQty:u?0:_,actualQty:0,status:"draft",productionType:d.productionType??"monthly",notes:""}})}async function aa(e,t=!1){t||(a.actionLoading=!0,A());try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,A(),a.quoteList=await Na(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:r}=await N(async()=>{const{fetchProspects:i}=await Promise.resolve().then(()=>j);return{fetchProspects:i}},void 0);a.prospects=await r()}break;case"/invoice-entry":if(a.staffList.length===0){const{fetchStaffList:r,fetchFrequentCustomers:i,fetchFrequentProducts:c}=await N(async()=>{const{fetchStaffList:g,fetchFrequentCustomers:y,fetchFrequentProducts:$}=await Promise.resolve().then(()=>j);return{fetchStaffList:g,fetchFrequentCustomers:y,fetchFrequentProducts:$}},void 0),[d,u,h]=await Promise.all([r(),i(10),c(10)]);a.staffList=d,a.frequentCustomers=u,a.frequentProducts=h}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await ea(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await Yn());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await Un(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:r}=await N(async()=>{const{fetchShipmentCalendar:y}=await Promise.resolve().then(()=>j);return{fetchShipmentCalendar:y}},void 0),i=a.shipmentCalendarYearMonth,[c,d]=i.split("-").map(Number),u=`${c-1}-${String(d).padStart(2,"0")}`,[h,g]=await Promise.all([r(i),r(u)]);a.shipmentCalendarData=h,a.shipmentCalendarPrevYearData=g;break}case"/billing":a.billingSummary||(a.billingSummary=await Jn(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await To());break;case"/product-power":case"/product-abc":gt("/customer-analysis"),a.analysisTab="product";return;case"/customer-efficiency":a.customerEfficiency=await At(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);break;case"/customer-analysis":await Promise.all([Ro(a.analysisPeriod).then(r=>{a.customerAnalysis=r}),Oo(a.analysisPeriod).then(r=>{a.productABC=r})]);break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:r,fetchDeliverySchedule:i}=await N(async()=>{const{fetchDemandForecasts:u,fetchDeliverySchedule:h}=await Promise.resolve().then(()=>j);return{fetchDemandForecasts:u,fetchDeliverySchedule:h}},void 0),[c,d]=await Promise.all([r(),i()]);a.demandForecast.forecasts=c.map(u=>({code:u.productCode,name:u.productName,segment:u.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(u.avgMonthly),adjustedAvg:Math.round(u.avgMonthly),nextMonthForecast:Math.round(u.forecastQuantity),annualForecast:Math.round(u.avgMonthly*12),safetyStock:Math.round(u.safetyStock)})),a.demandForecast.deliveries=qd(d)}break;case"/churn-alert":{const{fetchChurnAlerts:r,fetchChurnNotes:i}=await N(async()=>{const{fetchChurnAlerts:c,fetchChurnNotes:d}=await Promise.resolve().then(()=>j);return{fetchChurnAlerts:c,fetchChurnNotes:d}},void 0);if(!a.churnAlert){const c=await r();a.churnAlert=jm(c)}a.churnNotes=await i();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:r}=await N(async()=>{const{fetchProductShipmentsFromTable:c}=await Promise.resolve().then(()=>j);return{fetchProductShipmentsFromTable:c}},void 0),i=await r();if(i.length>0)a.seasonalCalendar=eo(i.map(c=>({code:c.code,name:c.name,category:"",monthlyQuantity:c.monthlyQuantity})));else{const{fetchProductMonthlyShipments:c}=await N(async()=>{const{fetchProductMonthlyShipments:u}=await Promise.resolve().then(()=>j);return{fetchProductMonthlyShipments:u}},void 0),d=await c();a.seasonalCalendar=eo(d.map(u=>({code:u.code,name:u.name,category:"",monthlyQuantity:u.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:r}=await N(async()=>{const{fetchVisitPriorities:c}=await Promise.resolve().then(()=>j);return{fetchVisitPriorities:c}},void 0),i=await r();if(i.length>0)a.visitPlanner={candidates:i.map(c=>({code:c.customer_code,name:c.customer_name,phone:c.phone,address:c.address,areaCode:c.area_code,businessType:c.business_type,priorityScore:c.priority_score,reasons:c.reasons,lastOrderDate:c.last_order_date,daysSinceOrder:c.days_since_order,annualRevenue:c.annual_revenue,recommendedAction:c.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=so(i.map(c=>({code:c.customer_code,name:c.customer_name,phone:c.phone,address1:c.address,areaCode:c.area_code,businessType:c.business_type,annualRevenue:c.annual_revenue,lastOrderDate:c.last_order_date,hasSeasonalProposal:c.reasons.some(d=>d.includes("季節"))})));else{const{supabaseQueryAll:c}=await N(async()=>{const{supabaseQueryAll:y}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:y}},void 0),[d,u]=await Promise.all([c("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Fn().then(y=>y.customers)]),h=a.masterStats?.customers??u,g=new Map;d.forEach(y=>{const $=y.legacy_customer_code||"",S=y.sales_date||"",_=Number(y.total_amount)||0,L=g.get($);!L||S>L.lastDate?g.set($,{lastDate:S,total:(L?.total??0)+_}):L.total+=_}),a.visitPlanner=so(h.filter(y=>y.isActive).map(y=>({code:y.code,name:y.name,phone:y.phone,address1:y.address1,areaCode:y.areaCode,businessType:y.businessType,annualRevenue:g.get(y.code)?.total??0,lastOrderDate:g.get(y.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:r,fetchSafetyStockParams:i,fetchProductionPlan:c,fetchLabelExclusions:d}=await N(async()=>{const{fetchDemandAnalysis:h,fetchSafetyStockParams:g,fetchProductionPlan:y,fetchLabelExclusions:$}=await Promise.resolve().then(()=>j);return{fetchDemandAnalysis:h,fetchSafetyStockParams:g,fetchProductionPlan:y,fetchLabelExclusions:$}},void 0);if(!a.demandAnalysis){const[h,g]=await Promise.all([r(a.demandYearsBack*12).catch(y=>(console.error("fetchDemandAnalysis failed:",y),null)),i().catch(y=>(console.error("fetchSafetyStockParams failed:",y),[]))]);h&&(a.demandAnalysis=h),a.safetyStockParams=g}if(a.productionPlan.length===0){const h=await c(a.demandPlanYearMonth).catch(()=>[]);h.length>0?a.productionPlan=h:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=qa(a.demandPlanYearMonth))}const u=await d(a.demandPlanYearMonth).catch(()=>[]);if(a.calendarLabelExcluded=new Set(u),a.productionPlan.length>0){const h=a.productionPlan.filter(g=>!a.calendarLabelExcluded.has(g.productCode));Xe(a.calendarShifts,h,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{if(t&&a.brewingPlanData.length>0)break;const{fetchBrewingPlanSummary:r,fetchBrewingMonthlyTrend:i,fetchBrewingSchedule:c,fetchBrewingProductDetail:d,fetchBrewingCustomCategories:u,fetchBrewingCategoryOverrides:h,fetchAllBrewingStockEntries:g,fetchCategoryTypeLinks:y,fetchAvailableProductionTypes:$,fetchBrewingAlcoholSettings:S,fetchBrewingYearlyShipments:_,fetchBrewingSeasonalPattern:L,fetchBrewingForecastOverrides:k,fetchBrewingRiceParams:C,fetchRiceVarieties:E,fetchRicePurchaseCommitments:s,fetchProcurementDecisions:l}=await N(async()=>{const{fetchBrewingPlanSummary:Z,fetchBrewingMonthlyTrend:ee,fetchBrewingSchedule:ne,fetchBrewingProductDetail:K,fetchBrewingCustomCategories:J,fetchBrewingCategoryOverrides:X,fetchAllBrewingStockEntries:se,fetchCategoryTypeLinks:ge,fetchAvailableProductionTypes:de,fetchBrewingAlcoholSettings:xe,fetchBrewingYearlyShipments:Ne,fetchBrewingSeasonalPattern:wt,fetchBrewingForecastOverrides:ot,fetchBrewingRiceParams:Ka,fetchRiceVarieties:Qe,fetchRicePurchaseCommitments:W,fetchProcurementDecisions:re}=await Promise.resolve().then(()=>j);return{fetchBrewingPlanSummary:Z,fetchBrewingMonthlyTrend:ee,fetchBrewingSchedule:ne,fetchBrewingProductDetail:K,fetchBrewingCustomCategories:J,fetchBrewingCategoryOverrides:X,fetchAllBrewingStockEntries:se,fetchCategoryTypeLinks:ge,fetchAvailableProductionTypes:de,fetchBrewingAlcoholSettings:xe,fetchBrewingYearlyShipments:Ne,fetchBrewingSeasonalPattern:wt,fetchBrewingForecastOverrides:ot,fetchBrewingRiceParams:Ka,fetchRiceVarieties:Qe,fetchRicePurchaseCommitments:W,fetchProcurementDecisions:re}},void 0),p=a.brewingPlanFY,m=`${p}-10-01`,f=`${p+1}-09-30`,[x,b,w,P,D,q,R,B,M,O,I,z,V,U,G,H,Q]=await Promise.all([r(m,f).catch(()=>[]),i(m,f).catch(()=>[]),c(p).catch(()=>[]),d(m,f).catch(()=>[]),u().catch(()=>[]),h().catch(()=>({})),g().catch(()=>[]),y().catch(()=>({})),$().catch(()=>[]),S().catch(()=>({})),_().catch(()=>[]),L().catch(()=>[]),k().catch(()=>({})),C().catch(()=>({})),E().catch(()=>[]),s(p).catch(()=>[]),l(p).catch(()=>({}))]);a.brewingPlanData=x,a.brewingMonthlyTrend=b,a.brewingSchedule=w,a.brewingProductDetail=P,a.brewingCustomCategories=D,a.brewingOverrides=q,a.brewingStockEntries=R,a.brewingTypeLinks=B,a.brewingAvailableTypes=M,a.brewingYearlyShipments=I,a.brewingSeasonalPattern=z,a.brewingForecastOverrides=V,a.brewingRiceParams=U,a.riceVarieties=G,a.ricePurchaseCommitments=H,a.procurementDecisions=Q,a.brewingAlcoholSettings=O;break}case"/brewing-process":{const{fetchBrewingBatches:r,fetchBrewingProcessSteps:i,fetchBrewingCustomCategories:c,fetchBrewingSchedule:d,fetchWorkerSettings:u,fetchStepLabor:h,fetchBrewingRiceParams:g,fetchTanks:y}=await N(async()=>{const{fetchBrewingBatches:l,fetchBrewingProcessSteps:p,fetchBrewingCustomCategories:m,fetchBrewingSchedule:f,fetchWorkerSettings:x,fetchStepLabor:b,fetchBrewingRiceParams:w,fetchTanks:P}=await Promise.resolve().then(()=>j);return{fetchBrewingBatches:l,fetchBrewingProcessSteps:p,fetchBrewingCustomCategories:m,fetchBrewingSchedule:f,fetchWorkerSettings:x,fetchStepLabor:b,fetchBrewingRiceParams:w,fetchTanks:P}},void 0),$=a.brewingPlanFY,[S,_,L,k,C,E,s]=await Promise.all([r($).catch(()=>[]),c().catch(()=>[]),d($).catch(()=>[]),u().catch(()=>({workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1})),h().catch(()=>[]),g().catch(()=>({})),y().catch(()=>[])]);a.brewingBatches=S,a.brewingSchedule=L,a.bpWorkerSettings=k,a.bpStepLabor=C,a.brewingRiceParams=E,a.bpTanks=s,S.length>0?a.brewingProcessSteps=await i(S.map(l=>l.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=_;break}case"/workforce":{const[r,i,c,d]=await Promise.all([a.staffMembers.length>0?Promise.resolve(a.staffMembers):ns(),a.brewingSchedule.length>0?Promise.resolve(a.brewingSchedule):(async()=>{const{fetchBrewingSchedule:u}=await N(async()=>{const{fetchBrewingSchedule:h}=await Promise.resolve().then(()=>j);return{fetchBrewingSchedule:h}},void 0);return u(a.brewingPlanFY).catch(()=>[])})(),pr(a.workforceYearMonth),ur(a.workforceYearMonth)]);a.staffMembers=r,a.workforceMetrics=c,a.dailyShiftPlans=d,a.brewingSchedule.length===0&&(a.brewingSchedule=i);break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await jo());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Fo());break;case"/tank-movements":{const{fetchTankMovements:r,fetchTankList:i,fetchGenzaishu:c}=await N(async()=>{const{fetchTankMovements:g,fetchTankList:y,fetchGenzaishu:$}=await Promise.resolve().then(()=>j);return{fetchTankMovements:g,fetchTankList:y,fetchGenzaishu:$}},void 0),[d,u,h]=await Promise.all([r().catch(()=>[]),i().catch(()=>[]),c().catch(()=>[])]);a.tankMovements=d,a.tankList=u,a.genzaishuList=h;break}case"/kentei":const{fetchKenteiList:n,fetchGenzaishu:o}=await N(async()=>{const{fetchKenteiList:r,fetchGenzaishu:i}=await Promise.resolve().then(()=>j);return{fetchKenteiList:r,fetchGenzaishu:i}},void 0);a.kenteiList=await n().catch(()=>[]),a.genzaishuList=await o().catch(()=>[]);break;case"/materials":a.materialList.length===0&&(a.materialList=await Vo());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Yo(),Uo()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Jo(),Ho()]));break;case"/tax":(!a.taxDeclaration||!a.taxVolume)&&([a.taxDeclaration,a.taxVolume]=await Promise.all([Qn(a.taxYear,a.taxMonth),Wn(a.taxYear,a.taxMonth)]));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Gn(a.storeSalesDate),Wo()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:r}=await N(async()=>{const{fetchMailSenders:i}=await Promise.resolve().then(()=>j);return{fetchMailSenders:i}},void 0);if(a.mailSenders=await r(),!a.emailSenderId||!a.mailSenders.find(i=>i.id===a.emailSenderId)){const i=a.mailSenders.find(c=>c.isDefault)??a.mailSenders[0];i&&(a.emailSenderId=i.id)}}break;case"/calendar":{const{fetchCalendarEvents:r}=await N(async()=>{const{fetchCalendarEvents:i}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:i}},void 0);a.calendarEvents=await r(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:r}=await N(async()=>{const{fetchIntegrationSettings:i}=await Promise.resolve().then(()=>j);return{fetchIntegrationSettings:i}},void 0);a.integrations=await r()}break;case"/shopify":{const{fetchShopifyOrders:r,fetchIntegrationSettings:i}=await N(async()=>{const{fetchShopifyOrders:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>j);return{fetchShopifyOrders:c,fetchIntegrationSettings:d}},void 0);a.shopifyOrders=await r(),a.integrations.length===0&&(a.integrations=await i())}break;case"/fax":{const{fetchFaxInbox:r,fetchIntegrationSettings:i}=await N(async()=>{const{fetchFaxInbox:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>j);return{fetchFaxInbox:c,fetchIntegrationSettings:d}},void 0);a.faxRecords=await r(),a.integrations.length===0&&(a.integrations=await i())}break;case"/ledger":a.customerLedger=await Vn(a.ledgerCustomerCode);break;case"/setup":[a.syncDashboard,a.systemHealth]=await Promise.all([Eo(),Ao()]);break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await or());break;case"/users":{const{fetchUserProfiles:r}=await N(async()=>{const{fetchUserProfiles:i}=await Promise.resolve().then(()=>j);return{fetchUserProfiles:i}},void 0);a.userProfiles=await r()}break;case"/profile":{const{fetchMyProfile:r,fetchAuditLogs:i,fetchMailSenders:c}=await N(async()=>{const{fetchMyProfile:u,fetchAuditLogs:h,fetchMailSenders:g}=await Promise.resolve().then(()=>j);return{fetchMyProfile:u,fetchAuditLogs:h,fetchMailSenders:g}},void 0),d=a.user?.email??a.myProfile?.email??"";d&&(a.myProfile=await r(d)),a.mailSenders.length===0&&(a.mailSenders=await c()),a.auditLogs=await i(50)}break;case"/audit":{const{fetchAuditLogs:r}=await N(async()=>{const{fetchAuditLogs:i}=await Promise.resolve().then(()=>j);return{fetchAuditLogs:i}},void 0);a.auditLogs=await r(200)}break;case"/prospects":{const{fetchProspects:r}=await N(async()=>{const{fetchProspects:i}=await Promise.resolve().then(()=>j);return{fetchProspects:i}},void 0);a.prospects=await r()}break;case"/map":{const{fetchMapCustomers:r,fetchDeliveryLocations:i}=await N(async()=>{const{fetchMapCustomers:u,fetchDeliveryLocations:h}=await Promise.resolve().then(()=>j);return{fetchMapCustomers:u,fetchDeliveryLocations:h}},void 0),[c,d]=await Promise.all([r(),i()]);a.mapCustomers=c,a.deliveryLocations=d,a.mapLoaded=!0}break;case"/calls":{const{fetchCallLogs:r,fetchIntegrationSettings:i}=await N(async()=>{const{fetchCallLogs:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>j);return{fetchCallLogs:c,fetchIntegrationSettings:d}},void 0);a.callLogs=await r(100),a.integrations.length===0&&(a.integrations=await i())}break;case"/list-builder":{const{fetchLeadLists:r,fetchIntegrationSettings:i}=await N(async()=>{const{fetchLeadLists:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>j);return{fetchLeadLists:c,fetchIntegrationSettings:d}},void 0);a.leadLists=await r(),a.integrations.length===0&&(a.integrations=await i())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:r}=await N(async()=>{const{fetchWorkflowOrdersFromDb:i}=await Promise.resolve().then(()=>j);return{fetchWorkflowOrdersFromDb:i}},void 0);a.workflowOrders=await r()}break;case"/tour":{const{fetchTourInquiriesFromDb:r}=await N(async()=>{const{fetchTourInquiriesFromDb:i}=await Promise.resolve().then(()=>j);return{fetchTourInquiriesFromDb:i}},void 0);a.tourInquiries=await r()}break;case"/slack":{const{fetchSlackRules:r,fetchSlackLogs:i,fetchIntegrationSettings:c}=await N(async()=>{const{fetchSlackRules:d,fetchSlackLogs:u,fetchIntegrationSettings:h}=await Promise.resolve().then(()=>j);return{fetchSlackRules:d,fetchSlackLogs:u,fetchIntegrationSettings:h}},void 0);a.slackRules=await r(),a.slackLogs=await i(50),a.integrations.length===0&&(a.integrations=await c())}break;case"/changelog":a.featureStatuses||(a.featureStatuses=await Ra());break;case"/":a.featureStatuses||(a.featureStatuses=await Ra());break;default:break}}catch(n){console.error("Route data load error:",e,n),F(`データ読み込みエラー: ${n.message??"不明"}`,"error")}finally{t||(a.actionLoading=!1,A())}}function ho(){if(us())return _p(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return ia("sales");case"/cat/brewery":return ia("brewery");case"/cat/purchase":return ia("purchase");case"/cat/more":return ia("more");case"/invoice-entry":return Kd(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors,a.staffList,a.frequentCustomers,a.frequentProducts);case"/quote":return a.quoteEditId===null?ep(a.quoteList,a.quoteListLoading,a.quoteCustomerFilter,a.quoteCustomerFilterName):_r(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return ap(a.quoteCompanySettings);case"/email":return Ud(Hy());case"/delivery":return a.deliveryNote?Vd(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return ay(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate,a.shipmentCalendarPrevYearData);case"/billing":return a.billingSummary?Sd(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?ru(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return dp(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return pp(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);case"/customer-analysis":return a.customerAnalysis?Gp(a.customerAnalysis,a.productABC,a.analysisTab,a.analysisPeriod):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Nd(a.demandForecast);case"/demand":return im(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return fm(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,o=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<o).sort(),i=new Map;for(const u of a.brewingSeasonalPattern)i.has(u.brewCategory)||i.set(u.brewCategory,new Map),i.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const c=[];for(let u=n;u<=9;u++)c.push(u);if(n>=10)for(let u=1;u<=9;u++)c.push(u);const d=new Map;for(const u of a.brewingYearlyShipments)d.has(u.brewCategory)||d.set(u.brewCategory,new Map),d.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,h]of d){const g=r.filter(m=>h.has(m)).map(m=>h.get(m).shipL);let y=0;if(g.length>=2){const m=[];for(let f=1;f<g.length;f++)g[f-1]>0&&m.push((g[f]-g[f-1])/g[f-1]);y=m.length>0?m.reduce((f,x)=>f+x,0)/m.length:0}const $=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:y,S=g.length>0?g[g.length-1]:h.get(o)?.annualL??0,_=i.get(u)??new Map,L=c.reduce((m,f)=>m+(_.get(f)??0),0),k=a.brewingStockEntries.filter(m=>m.brewCategory===u).reduce((m,f)=>m+f.volumeL,0),C=a.brewingAlcoholSettings[u],E=C&&C.targetAlcoholPct>0?C.rawAlcoholPct/C.targetAlcoholPct:1,s=Math.round(k*E),l=Math.max(0,s-Math.round(L)),p=Math.round(S*(1+$));e[u]=Math.max(0,p-l)}}return bm(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?Ym(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?Qm(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?cy(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return qm(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY,workerSettings:a.bpWorkerSettings,stepLabor:a.bpStepLabor,tanks:a.bpTanks.map(t=>({id:t.id,tankNo:t.tankNo,capacityL:t.capacityL,tankType:t.tankType,preferredCategories:t.preferredCategories,cleanupDays:t.cleanupDays})),selectedBatchIds:a.bpSelectedBatchIds})}case"/workforce":return Bm(a.staffMembers,a.workforceTab,a.staffDeptFilter,a.workforceYearMonth,a.brewingSchedule,a.shiftBottlingTarget,a.workforceMetrics,a.dailyShiftPlans,a.workforceSelectedDay);case"/jikomi":return a.jikomiView==="calendar"?`${Ts(a.jikomiList,a.jikomiView)}${bp(a.jikomiList)}`:Ts(a.jikomiList,a.jikomiView);case"/tanks":return uy(a.tankList);case"/tank-movements":return hy(a.tankMovements,a.tankList,a.tankMovementFilter,a.genzaishuList);case"/kentei":return wp(a.kenteiList,a.genzaishuList,a.kenteiShowForm,a.kenteiEditRecord);case"/materials":return Mp(a.materialList)+Ip(a.materialEditing,a.materialEditingIsNew);case"/purchase":return zp(a.purchaseList,a.payableList);case"/raw-material":return jp(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?gy(a.taxDeclaration,a.taxYear,a.taxMonth,a.taxVolume??[]):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return du(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?Up(a.pipelineMeta,$e,ie,a.syncDashboard,a.systemHealth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return Gu(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return uu(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return Ju(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return yu(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapLoaded?a.mapCustomers.length===0?`<section class="page-head"><div><p class="eyebrow">取引先マップ</p><h1>取引先マップ</h1></div></section>
          <section class="panel">
            <div style="padding:32px;text-align:center;color:var(--text-secondary)">
              <p style="font-size:1.5rem;margin-bottom:8px">📍</p>
              <p style="font-weight:600;margin-bottom:4px">緯度・経度データがありません</p>
              <p style="font-size:0.875rem">得意先マスタにジオコーディングが必要です。<br>relay フォルダの <code>geocode_customers.py</code> を実行してください。</p>
            </div>
          </section>`:hu(a.mapCustomers,a.deliveryLocations,a.mapFilters):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>';case"/workflow":return vu(a.workflowOrders);case"/mobile-order":return bu(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return wu(a.tourInquiries,a.tourActiveId);case"/mail-senders":return Su(a.mailSenders,a.mailSenderEditingId);case"/calendar":return ku(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return Eu(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Au(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Lu(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/changelog":{const e=a.myProfile?.name??a.myProfile?.email??"不明";return a.featureStatuses!==null?by(a.featureStatuses,e):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">読み込み中…</p></div></section>'}case"/users":return Cu(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return Du(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return qu(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return Tu(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return Ru(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return Ou(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return zu(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return lu(Wr(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/payment":return Op([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Tp(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return mp(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return Ld(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return Dr(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return Gy();default:return Bd(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function Wy(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const i=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${i.bg};border-bottom:2px solid ${i.border};">
        <span class="announcement-text">${i.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),o=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+o}function Gy(){const e=a.featureStatuses??{};function t(o,r,i,c){const d=`${"/".replace(/\/$/,"")||"/"}${o}`,u=vy(o,e);return`<a href="${d}" data-link="${o}" class="home-card">
      <span class="home-card-icon">${r}</span>
      <span class="home-card-label">${i}${u?' <span class="badge-new">使用可能</span>':""}</span>
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
  `}function Xy(){const e=a.route,t=Ha(e),o=[{key:"sales",icon:"💼",label:"売上管理",items:[{path:"/invoice-entry",label:"伝票入力"},{path:"/invoice",label:"伝票照会"},{path:"/ledger",label:"得意先台帳"},{path:"/sales",label:"売上一覧"},{path:"/payment",label:"入金状況"},{path:"/billing",label:"月次請求"},{path:"/delivery",label:"納品書"},{path:"/report",label:"集計帳票"}]},{key:"analytics",icon:"📊",label:"分析",items:[{path:"/analytics",label:"売上分析"},{path:"/product-power",label:"商品パワー"},{path:"/customer-analysis",label:"ABC分析"},{path:"/customer-efficiency",label:"営業効率"},{path:"/demand-forecast",label:"需要予測"},{path:"/shipment-calendar",label:"出荷カレンダー"}]},{key:"crm",icon:"🤝",label:"CRM・営業",items:[{path:"/churn-alert",label:"営業アクション"},{path:"/map",label:"取引先マップ"},{path:"/visit-planner",label:"訪問計画"},{path:"/prospects",label:"新規営業"},{path:"/calls",label:"通話履歴"},{path:"/seasonal-calendar",label:"季節提案"},{path:"/list-builder",label:"リスト取得"}]},{key:"brewery",icon:"🍶",label:"醸造管理",items:[{path:"/brewing-plan",label:"醸造計画"},{path:"/procurement",label:"調達計画"},{path:"/brewing-process",label:"醸造工程"},{path:"/demand",label:"需要・生産計画"},{path:"/jikomi",label:"仕込管理"},{path:"/tanks",label:"タンク管理"},{path:"/tank-movements",label:"移動簿"},{path:"/kentei",label:"検定管理"},{path:"/tax",label:"酒税申告"},{path:"/workforce",label:"人員・シフト"}]},{key:"master",icon:"🗂",label:"マスタ・帳票",items:[{path:"/master",label:"マスタ管理"},{path:"/materials",label:"資材管理"},{path:"/purchase",label:"仕入・買掛"},{path:"/store",label:"店舗・直売所"},{path:"/shopify",label:"Shopify注文"},{path:"/print",label:"印刷センター"},{path:"/calendar",label:"カレンダー"},{path:"/tour",label:"酒蔵見学"}]},{key:"settings",icon:"⚙",label:"設定",items:[{path:"/setup",label:"連動設定"},{path:"/integrations",label:"外部連携"},{path:"/users",label:"ユーザー管理"},{path:"/import",label:"データ取込"},{path:"/changelog",label:"更新履歴"}]}].map(i=>{const c=i.key===t,d=i.items.map(u=>`<a href="${u.path}" data-link="${u.path}" class="snav-sub${e===u.path?" active":""}">${u.label}</a>`).join("");return`<div class="snav-group${c?" open":""}">
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
        ${o}
        <a href="/changelog" data-link="/changelog" class="snav-home${e==="/changelog"?" active":""}">📋 機能一覧</a>
      </div>
      <div class="snav-footer">
        <a href="/profile" data-link="/profile" class="snav-profile">${a.user?.email??"👤 プロフィール"}</a>
      </div>
    </aside>
    ${r}
  `}function Zy(){if(us())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${ho()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/changelog":"機能一覧・更新履歴","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?Hd(a.masterStats.customers,a.pickerQuery,a.frequentCustomers):Bp(a.masterStats.products,a.pickerQuery,a.frequentProducts):"",r=a.globalSearchOpen?Jd(a.globalQuery,Ky()):"",i=a.user?`<span class="app-header-user">${a.user.email}</span>
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
      ${Wy()}
      <div class="shell-body">
        ${Xy()}
        <main class="main-v2">
          <div class="view ${a.actionLoading?"is-busy":""}">${ho()}</div>
          <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
        </main>
      </div>
      ${o}
      ${r}
    </div>
  `}async function eh(){a.actionLoading=!0,A();try{const{fetchSalesSummary:e}=await N(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>j);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,A()}}async function th(e){a.actionLoading=!0,A();try{a.invoiceRecords=await ea(e)}finally{a.actionLoading=!1,A()}}async function bn(e){a.actionLoading=!0,A();try{a.customerLedger=await Vn(e)}finally{a.actionLoading=!1,A()}}function Fe(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,deliveryDate:e.querySelector("#inv-delivery-date")?.value??a.invoiceForm.deliveryDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:a.invoiceForm.staffCode,registeredBy:e.querySelector("#inv-registered-by")?.value??a.invoiceForm.registeredBy,lines:a.invoiceForm.lines.map((t,n)=>{const o=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:o,unitPrice:r,amount:o*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function yt(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function fo(e){const t=document.getElementById("staff-form");if(!t)return;const n=t.querySelector("#sf-emp-type"),o=t.querySelector("#sf-hourly-row"),r=t.querySelector("#sf-hours-row"),i=t.querySelector("#sf-salary-row"),c=t.querySelector("#sf-contract-row"),d=t.querySelector("#sf-shift-pref-row");function u(){const h=n?.value??"part_time";o&&(o.style.display=h==="part_time"?"":"none"),r&&(r.style.display=h==="part_time"?"":"none"),i&&(i.style.display=h==="employee"?"":"none"),c&&(c.style.display=h==="contractor"?"":"none"),d&&(d.style.display=h==="part_time"?"":"none")}u(),n?.addEventListener("change",u),t.querySelector("[data-action='close-staff-modal']")?.addEventListener("click",()=>{document.getElementById("staff-modal")?.remove()}),t.addEventListener("submit",async h=>{h.preventDefault();const g=t.querySelector("#staff-form-result"),y=(t.querySelector("#sf-months")?.value??"").trim(),$=y?y.split(",").map(l=>parseInt(l.trim())).filter(l=>!isNaN(l)&&l>=1&&l<=12):null,S=Array.from(t.querySelectorAll("input[name='sf-cross']:checked")).map(l=>l.value),_=t.querySelector("#sf-emp-type")?.value??"part_time",L=_==="part_time"?t.querySelector("input[name='sf-shift-pref']:checked")?.value??"both":null,k=Array.from(t.querySelectorAll("input[name='sf-task']:checked")).map(l=>l.value),C=Array.from(t.querySelectorAll("input[name='sf-day-off']:checked")).map(l=>parseInt(l.value)),E={id:t.querySelector("#sf-id")?.value||void 0,name:t.querySelector("#sf-name")?.value.trim()??"",kana:t.querySelector("#sf-kana")?.value.trim()||"",employmentType:_,department:t.querySelector("#sf-dept")?.value??"bottling",hourlyRate:parseFloat(t.querySelector("#sf-hourly")?.value??"")||null,monthlySalary:parseFloat(t.querySelector("#sf-salary")?.value??"")||null,contractFee:parseFloat(t.querySelector("#sf-contract-fee")?.value??"")||null,workHoursPerDay:parseFloat(t.querySelector("#sf-hours")?.value??"8")||8,shiftPreference:L,monthlyTasks:k,availableMonths:$,crossDepartments:S,fixedDaysOff:C,isDeptLeader:t.querySelector("#sf-leader")?.checked??!1,notes:t.querySelector("#sf-notes")?.value.trim()||"",isActive:t.querySelector("#sf-active")?.checked??!0};if(!E.name){g&&(g.textContent="氏名は必須です");return}await cr(E)?(document.getElementById("staff-modal")?.remove(),a.staffMembers=await ns(),F(e?"更新しました":"登録しました","success"),A()):g&&(g.textContent="保存に失敗しました")})}function ah(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,A()}),e.querySelectorAll("[data-action='global-search-close']").forEach(s=>{s.addEventListener("click",l=>{s.classList.contains("global-search")&&l.target instanceof HTMLElement&&!l.target.classList.contains("global-search")||(ta(),A())})}),e.querySelector("#global-search-input")?.addEventListener("input",s=>{a.globalQuery=s.target.value,A()}),e.querySelectorAll("[data-action='global-nav']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.path;l&&(ta(),gt(l))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Qy()}),e.querySelectorAll("[data-jikomi-tab]").forEach(s=>{s.addEventListener("click",()=>{a.jikomiView=s.dataset.jikomiTab,A()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const s=e.querySelector("#auth-email")?.value.trim()??"",l=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,A(),ui(s,l).then(async p=>{a.user=p,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:f}=await N(async()=>{const{fetchMyProfile:x,recordAudit:b}=await Promise.resolve().then(()=>j);return{fetchMyProfile:x,recordAudit:b}},void 0);a.myProfile=await m(p.email),await f({action:"sign_in",userEmail:p.email}),A()}).catch(async p=>{try{const m=await vs(s,l);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:f}=await N(async()=>{const{fetchMyProfile:x}=await Promise.resolve().then(()=>j);return{fetchMyProfile:x}},void 0);a.myProfile=await f(m.email)}catch{a.authError=p instanceof Error?p.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,A()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,A()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{mi().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,A()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(s=>{s.addEventListener("click",()=>{a.sidebarOpen=!1,A()})}),e.querySelectorAll("[data-snav-group]").forEach(s=>{s.addEventListener("click",()=>{s.closest(".snav-group")?.classList.toggle("open")})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let s=0;t.addEventListener("touchstart",l=>{s=l.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",l=>{l.changedTouches[0].clientX-s<-60&&(a.sidebarOpen=!1,A())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.id??"";a.dismissedAnnouncements.add(l),A()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='hard-refresh']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const s=window.location.href,l=document.title;if(navigator.share)try{await navigator.share({url:s,title:l})}catch{}else try{await navigator.clipboard.writeText(s),F("URLをコピーしました","success")}catch{F("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(s=>{s.addEventListener("click",l=>{l.preventDefault(),gt(s.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async s=>{s.preventDefault();const l=e.querySelector("#fr-title")?.value??"",p=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",f=e.querySelector("#fr-result");if(!l.trim())return;const x=await Io(l,p,m);if(f&&(f.textContent=x?"送信しました":"送信に失敗しました",f.className=`fr-result ${x?"success":"error"}`),x){const b=e.querySelector("#feature-request-form");b&&b.reset()}}),e.querySelectorAll("[data-period]").forEach(s=>{s.addEventListener("click",()=>{a.salesPeriod=s.dataset.period,A()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const s=e.querySelector("#range-start")?.value??"",l=e.querySelector("#range-end")?.value??"";s&&l&&(a.customRange={start:s,end:l},a.salesPeriod="custom",A())}),e.querySelectorAll("[data-edit-customer]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.editCustomer??"",p=a.masterStats?.customers.find(f=>f.id===l);if(!p)return;const m=document.createElement("div");m.innerHTML=Sp(p),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async f=>{f.preventDefault();const x=document.getElementById("edit-result"),b=document.getElementById("ec-trade-type")?.value||null,w=await Mo(l,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:b,manual_override:!0});x&&(x.textContent=w?"保存しました":"保存に失敗",x.className=`fr-result ${w?"success":"error"}`),w&&(document.getElementById("edit-modal")?.remove(),Ct())})})}),e.querySelectorAll("[data-edit-product]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.editProduct??"",p=a.masterStats?.products.find(f=>f.id===l);if(!p)return;const m=document.createElement("div");m.innerHTML=kp(p),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async f=>{f.preventDefault();const x=document.getElementById("edit-result"),b=await No(l,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});x&&(x.textContent=b?"保存しました":"保存に失敗",x.className=`fr-result ${b?"success":"error"}`),b&&(document.getElementById("edit-modal")?.remove(),Ct())})})}),e.querySelectorAll("[data-view-customer-quotes]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.viewCustomerQuotes??"",p=s.dataset.customerName??"";a.quoteCustomerFilter=l,a.quoteCustomerFilterName=p,a.quoteEditId=null,a.quoteList.length===0?(a.quoteListLoading=!0,gt("/quote"),a.quoteList=await Na(),a.quoteListLoading=!1):gt("/quote"),A()})}),e.querySelector("[data-action='quote-clear-filter']")?.addEventListener("click",()=>{a.quoteCustomerFilter="",a.quoteCustomerFilterName="",A()}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Oa(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,A()}),e.querySelectorAll("[data-open-quote]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.openQuote,p=await rr(l);if(!p){F("見積の読み込みに失敗しました","error");return}a.quoteState={id:p.id,quoteNo:p.quote_no,quoteDate:p.quote_date,validUntil:p.valid_until??"",customerCode:p.legacy_customer_code??"",customerName:p.customer_name,customerAddress:p.customer_address,subject:p.subject,lines:p.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:p.remarks,taxRate:p.tax_rate,deliveryDate:p.delivery_date,paymentTerms:p.payment_terms,deliveryPlace:p.delivery_place,templateType:p.template_type??"sake",previewMode:!1},a.quoteEditId=l,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,A()})}),e.querySelectorAll("[data-delete-quote]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.deleteQuote,p=s.dataset.quoteNo??l;if(!await Me(`見積 ${p} を削除しますか？`))return;await Bn("quotes",l)?(a.quoteList=a.quoteList.filter(x=>x.id!==l),F("削除しました","success"),A()):F("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,A(),Na().then(s=>{a.quoteList=s,a.quoteListLoading=!1,A()})}),e.querySelectorAll("[name='q-template']").forEach(s=>{s.addEventListener("change",()=>{a.quoteState.templateType=s.value,A()})});function n(s){return(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function o(s){return s.length?s.map(l=>`<button class="search-item" type="button" data-select-customer="${n(l.code)}" data-cust-name="${n(l.name)}" data-cust-addr="${n(l.address1||"")}"><span class="mono">${n(l.code)}</span><span style="font-size:13px;font-weight:600;">${n(l.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(s){s.querySelectorAll("[data-select-customer]").forEach(l=>{l.addEventListener("click",async()=>{const p=l.dataset.selectCustomer??"";a.quoteState.customerCode=p,a.quoteState.customerName=l.dataset.custName??"",a.quoteState.customerAddress=l.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),s.remove(),a.quotePricing=await _n(a.masterStats?.customers??[],p),A()})})}function i(s){const l=e.querySelector("#q-cust-search")?.closest(".form-row");if(!l)return;let p=document.getElementById("cust-search-results");p||(p=document.createElement("div"),p.id="cust-search-results",p.className="search-results",l.after(p));const m=a.masterStats?.customers??[],f=s.trim().toLowerCase(),x=f.length===0?m:m.filter(b=>b.name.includes(s)||b.kanaName.includes(s)||b.code.includes(s)||b.name.toLowerCase().includes(f)||b.kanaName.toLowerCase().includes(f));p.innerHTML=o(x),r(p)}function c(s,l){return s.length?s.map(p=>{const m=l?Hn(p,l):{price:p.salePrice||0,label:"卸価格"},f=p.listPrice||0,x=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(p.code)}" data-prod-name="${n(p.name)}" data-prod-price="${m.price}" data-prod-retail="${f}" data-prod-jan="${n(p.janCode??"")}" data-prod-unit="${n(p.unit)}" data-prod-case="${p.caseQty??""}"><span class="mono">${n(p.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(p.name)}</span><span class="numeric"${x?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${f?`　定価 ¥${f.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function d(s){s.querySelectorAll("[data-add-product]").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset.addProduct??"",m=l.dataset.prodName??"",f=parseInt(l.dataset.prodPrice??"0"),x=parseInt(l.dataset.prodRetail??"0")||null,b=l.dataset.prodJan??"",w=l.dataset.prodUnit||"本",P=l.dataset.prodCase??"",D=P?parseInt(P):null;a.quoteState.lines.push({productCode:p,productName:m,janCode:b,caseQty:D,quantity:1,unit:w,unitPrice:f,retailPrice:x,amount:f}),a.quoteProductQuery="";const q=e.querySelector("#q-prod-search");q&&(q.value=""),A()})})}function u(s){const l=e.querySelector("#q-prod-search")?.closest(".form-row");if(!l)return;let p=document.getElementById("prod-search-results");if(p||(p=document.createElement("div"),p.id="prod-search-results",p.className="search-results",l.after(p)),!a.masterStats){p.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,f=s.trim().toLowerCase(),x=f.length===0?m:m.filter(b=>b.name.includes(s)||b.kanaName.includes(s)||b.code.includes(s)||b.name.toLowerCase().includes(f)||b.kanaName.toLowerCase().includes(f));p.innerHTML=c(x,a.quotePricing),d(p)}function h(s,l){let p=null;function m(){p||(p=f=>{const x=document.getElementById(l);if(!x){document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null;return}s.contains(f.target)||x.contains(f.target)||(x.remove(),document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null)},document.addEventListener("touchstart",p,{passive:!0}),document.addEventListener("mousedown",p))}return m}(function(){const s=e.querySelector("#q-cust-search");if(!s)return;const l=h(s,"cust-search-results");s.addEventListener("focus",()=>{i(s.value),l()}),s.addEventListener("compositionend",()=>{a.quoteCustomerQuery=s.value,i(s.value)}),s.addEventListener("input",p=>{p.isComposing||(a.quoteCustomerQuery=s.value,i(s.value))}),s.value&&i(s.value)})(),(function(){const s=e.querySelector("#q-prod-search");if(!s)return;const l=h(s,"prod-search-results");s.addEventListener("focus",()=>{u(s.value),l()}),s.addEventListener("compositionend",()=>{a.quoteProductQuery=s.value,u(s.value)}),s.addEventListener("input",p=>{p.isComposing||(a.quoteProductQuery=s.value,u(s.value))}),s.value&&u(s.value)})(),e.querySelectorAll("[data-select-customer]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.selectCustomer??"";a.quoteState.customerCode=l,a.quoteState.customerName=s.dataset.custName??"",a.quoteState.customerAddress=s.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await _n(a.masterStats?.customers??[],l),A()})}),e.querySelector("#q-price-type")?.addEventListener("change",s=>{const l=s.target.value;a.quoteState.manualPriceType=l,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:l}:a.quotePricing={priceType:l,priceGroup:"",individualPrices:new Map},A()}),e.querySelectorAll("[data-add-product]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.addProduct??"",p=s.dataset.prodName??"",m=parseInt(s.dataset.prodPrice??"0"),f=parseInt(s.dataset.prodRetail??"0")||null,x=s.dataset.prodJan??"",b=s.dataset.prodUnit||"本",w=s.dataset.prodCase??"",P=w?parseInt(w):null;a.quoteState.lines.push({productCode:l,productName:p,janCode:x,caseQty:P,quantity:1,unit:b,unitPrice:m,retailPrice:f,amount:m}),a.quoteProductQuery="",A()})}),(()=>{const s=e.querySelector("#q-prospect-search");if(!s)return;const l=h(s,"q-prospect-results");function p(m){let f=document.getElementById("q-prospect-results");if(!f)return;const x=m.trim(),b=x.length===0?a.prospects.slice(0,8):a.prospects.filter(w=>w.companyName.includes(x)||(w.contactName??"").includes(x)).slice(0,8);if(b.length===0){f.innerHTML="";return}f.className="search-results",f.innerHTML=b.map(w=>`<button class="search-item" type="button" data-select-prospect="${w.id}" data-prospect-name="${n(w.companyName)}" data-prospect-addr="${n(w.address??"")}"><span style="font-size:13px;font-weight:600;">${n(w.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n(w.contactName??"")} ${w.address?"· "+w.address.slice(0,20):""}</span></button>`).join(""),f.querySelectorAll("[data-select-prospect]").forEach(w=>{w.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=w.dataset.prospectName??"",a.quoteState.customerAddress=w.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=w.dataset.selectProspect??"";const P=a.quoteState.manualPriceType??"";a.quotePricing={priceType:P,priceGroup:"",individualPrices:new Map},s.value="",f&&(f.innerHTML=""),A()})})}s.addEventListener("focus",()=>{p(s.value),l()}),s.addEventListener("input",m=>{m.isComposing||p(s.value)}),s.addEventListener("compositionend",()=>p(s.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const s=e.querySelector("#q-prospect-search")?.value.trim()??"",l=document.createElement("div");l.className="modal-backdrop",l.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",l.innerHTML=`
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
    `,document.body.appendChild(l),l.querySelector("#pq-company")?.focus();const p=()=>l.remove();l.addEventListener("click",m=>{m.target===l&&p()}),l.querySelector("#prospect-quick-close")?.addEventListener("click",p),l.querySelector("#prospect-quick-close2")?.addEventListener("click",p),l.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(l.querySelector("#pq-company")?.value??"").trim();if(!m){F("会社名は必須です","warning");return}const f={id:crypto.randomUUID(),companyName:m,contactName:l.querySelector("#pq-contact")?.value.trim()||void 0,address:l.querySelector("#pq-address")?.value.trim()||void 0,phone:l.querySelector("#pq-phone")?.value.trim()||void 0,note:l.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:x,fetchProspects:b}=await N(async()=>{const{saveProspect:D,fetchProspects:q}=await Promise.resolve().then(()=>j);return{saveProspect:D,fetchProspects:q}},void 0),w=await x(f);if(!w){F("登録失敗","error");return}a.prospects=await b(),a.quoteState.customerCode="",a.quoteState.customerName=w.companyName,a.quoteState.customerAddress=w.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=w.id;const P=a.quoteState.manualPriceType??"";a.quotePricing={priceType:P,priceGroup:"",individualPrices:new Map},p(),F(`${w.companyName} を見込み顧客として登録しました`,"success"),A()})});function g(){da(a.quoteState);const s=e.querySelector("#q-preview-scaler");if(!s)return;s.innerHTML=_r(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const l=s.querySelector(".q-preview-doc"),p=s.parentElement?.clientWidth??0,m=l?.offsetWidth??0;if(p>0&&m>0&&m>p-24){const f=(p-24)/m;s.style.transform=`scale(${f})`,s.style.transformOrigin="top left",s.style.height=`${((l?.offsetHeight??0)+48)*f}px`}else s.style.transform="",s.style.height=""}for(const s of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${s}`)?.addEventListener("input",g);e.querySelector("#q-remarks")?.addEventListener("input",g),e.querySelectorAll(".qty-input").forEach(s=>{s.addEventListener("change",()=>{const l=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.quantity=parseFloat(s.value)||0,p.amount=p.quantity*p.unitPrice,g())})}),e.querySelectorAll(".price-input").forEach(s=>{s.addEventListener("change",()=>{const l=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.unitPrice=parseInt(s.value)||0,p.amount=p.quantity*p.unitPrice,g())})}),e.querySelectorAll(".jan-input").forEach(s=>{s.addEventListener("change",()=>{const l=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.janCode=s.value,g())})}),e.querySelectorAll(".case-qty-input").forEach(s=>{s.addEventListener("change",()=>{const l=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.caseQty=s.value?parseInt(s.value):null,g())})}),e.querySelectorAll(".retail-price-input").forEach(s=>{s.addEventListener("change",()=>{const l=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.retailPrice=s.value?parseInt(s.value):null,g())})}),e.querySelectorAll("[data-remove-line]").forEach(s=>{s.addEventListener("click",()=>{const l=parseInt(s.dataset.removeLine??"0");a.quoteState.lines.splice(l,1),A()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{da(a.quoteState),a.quoteState.previewMode=!0,A()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,A()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async s=>{const l=s.currentTarget;l.disabled=!0,l.textContent="生成中…",a.quoteState.previewMode||da(a.quoteState);try{await rp(a.quoteState,a.quoteCompanySettings)}finally{l.disabled=!1,l.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{da(a.quoteState);const s=a.quoteState,l=s.lines.reduce((w,P)=>w+P.amount,0),p=Math.round(l*s.taxRate/100),m=l+p;if(!s.quoteNo)try{const{supabaseRpc:w}=await N(async()=>{const{supabaseRpc:D}=await Promise.resolve().then(()=>te);return{supabaseRpc:D}},void 0),P=await w("generate_quote_no",{});s.quoteNo=P??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{s.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const f=new Date().toISOString().slice(0,10),x=s.templateType==="sake"||s.templateType==="standard"?s.templateType:"sake",b={quote_no:s.quoteNo,quote_date:s.quoteDate||f,valid_until:s.validUntil||null,legacy_customer_code:s.customerCode||null,customer_name:s.customerName||"",customer_address:s.customerAddress||"",subject:s.subject||"",template_type:x,subtotal:l,tax_amount:p,total_amount:m,tax_rate:s.taxRate||10,remarks:s.remarks||"",delivery_date:s.deliveryDate||"",payment_terms:s.paymentTerms||"",delivery_place:s.deliveryPlace||"",updated_at:new Date().toISOString()};try{let w=s.id;if(s.id){const P=await fetch(`${$e}/rest/v1/quotes?id=eq.${encodeURIComponent(s.id)}`,{method:"PATCH",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(b)});if(!P.ok){const D=await P.text();throw new Error(`quotes更新失敗 ${P.status}: ${D}`)}await fetch(`${$e}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(s.id)}`,{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})}else{const P=await fetch(`${$e}/rest/v1/quotes`,{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(b)});if(!P.ok){const q=await P.text();throw new Error(`quotes作成失敗 ${P.status}: ${q}`)}const D=await P.json();if(!D?.[0]?.id)throw new Error("IDが返りませんでした");w=D[0].id,s.id=w}if(s.lines.length>0){const P=s.lines.map((q,R)=>({quote_id:w,line_no:R+1,legacy_product_code:q.productCode||null,product_name:q.productName,jan_code:q.janCode||null,case_qty:q.caseQty??null,quantity:q.quantity,unit:q.unit,unit_price:q.unitPrice,retail_price:q.retailPrice??null,amount:q.amount})),D=await fetch(`${$e}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(P)});if(!D.ok){const q=await D.text();throw new Error(`明細保存失敗 ${D.status}: ${q}`)}}F(`見積 ${s.quoteNo} を保存しました`,"success"),A()}catch(w){console.error("[save-quote]",w),F(`保存失敗: ${String(w).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const s=p=>document.getElementById(p)?.value??"",l={...a.quoteCompanySettings,companyName:s("qs-company-name"),companyPostal:s("qs-company-postal"),companyAddress1:s("qs-company-addr1"),companyAddress2:s("qs-company-addr2"),companyTel:s("qs-company-tel"),companyFax:s("qs-company-fax"),companyEmail:s("qs-company-email"),companyRegistrationNo:s("qs-company-regno"),bankName:s("qs-bank-name"),bankBranch:s("qs-bank-branch"),bankAccountType:s("qs-bank-type"),bankAccountNo:s("qs-bank-no"),bankAccountHolder:s("qs-bank-holder"),defaultPaymentTerms:s("qs-payment-terms"),defaultHeaderNote:s("qs-header-note"),defaultFooterNote:s("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};ht(l),Pt("quote_company",l),a.quoteCompanySettings=l,F("設定を保存しました","success"),A()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},ht(a.quoteCompanySettings),Pt("quote_company",a.quoteCompanySettings),A()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",s=>{const l=s.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},ht(a.quoteCompanySettings),A()}),e.querySelector("#qs-seal-file")?.addEventListener("change",s=>{const l=s.target.files?.[0];if(!l)return;const p=new FileReader;p.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:p.result},ht(a.quoteCompanySettings),Pt("quote_company",a.quoteCompanySettings),A()},p.readAsDataURL(l)}),e.querySelector("#qs-seal-size")?.addEventListener("input",s=>{const l=parseInt(s.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:l},ht(a.quoteCompanySettings),Pt("quote_company",a.quoteCompanySettings),A()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},ht(a.quoteCompanySettings),Pt("quote_company",a.quoteCompanySettings),A()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.month;l&&(a.demandForecast.calendarMonth=l,A())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.segment;a.demandForecast.selectedSegment=l,A()})}),e.querySelectorAll("[data-demand-tab]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.demandTab;if(l){if(a.demandTab=l,l==="calendar"){const p=new Date().toISOString().slice(0,10);p.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=p)}A()}})}),e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async s=>{const l=parseInt(s.target.value)||3;a.demandYearsBack=l,a.demandAnalysis=null;const{fetchDemandAnalysis:p}=await N(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>j);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await p(l*12),A()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.code??"",p=parseInt(s.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const f=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,x=p/30,b=Math.ceil(f*m.demandStdDev*Math.sqrt(x)),w=Math.ceil(m.avgMonthlyDemand*x+b);return{...m,leadTimeDays:p,safetyStockQty:b,reorderPoint:w}}),A()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.code??"",p=parseFloat(s.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const f=p>=.99?2.33:p>=.97?1.88:p>=.95?1.65:p>=.9?1.28:1.04,x=m.leadTimeDays/30,b=Math.ceil(f*m.demandStdDev*Math.sqrt(x)),w=Math.ceil(m.avgMonthlyDemand*x+b);return{...m,serviceLevel:p,safetyStockQty:b,reorderPoint:w}}),A()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async s=>{if(a.safetyStockParams.length===0)return;const l=s.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveSafetyStockParamsBulk:p}=await N(async()=>{const{saveSafetyStockParamsBulk:f}=await Promise.resolve().then(()=>j);return{saveSafetyStockParamsBulk:f}},void 0),m=await p(a.safetyStockParams);l.disabled=!1,l.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const s=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),l=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(p=>{const m=s>=.99?2.33:s>=.97?1.88:s>=.95?1.65:s>=.9?1.28:1.04,f=l/30,x=Math.ceil(m*p.demandStdDev*Math.sqrt(f)),b=Math.ceil(p.avgMonthlyDemand*f+x);return{...p,serviceLevel:s,leadTimeDays:l,safetyStockQty:x,reorderPoint:b}}),A()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.code??"",p=s.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===l?{...m,productionType:p}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async s=>{const l=s.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarShifts=Wt(l,1,0);const{fetchProductionPlan:p}=await N(async()=>{const{fetchProductionPlan:f}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:f}},void 0),m=await p(l);a.productionPlan=m.length>0?m:qa(l),Xe(a.calendarShifts,a.productionPlan.filter(f=>!a.calendarLabelExcluded.has(f.productCode)),a.calendarCapacity),A()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(s=>{s.addEventListener("click",()=>{a.demandPlanTypeFilter=s.dataset.filter??"all",A()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.sortCol??"";a.demandSort?.column===l?a.demandSort=a.demandSort.dir==="desc"?{column:l,dir:"asc"}:null:a.demandSort={column:l,dir:"desc"},A()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=qa(a.demandPlanYearMonth),A()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",s=>{const l=s.target.files?.[0];if(!l)return;const p=new FileReader;p.onload=async()=>{const{parseCSV:m}=await N(async()=>{const{parseCSV:M}=await Promise.resolve().then(()=>Qu);return{parseCSV:M}},void 0),{columns:f,rows:x}=m(p.result),b=document.getElementById("csv-import-status"),w=f.find(M=>/商品コード|product_code|code|コード/i.test(M)),P=f.find(M=>/在庫|stock|期首|opening/i.test(M)),D=f.find(M=>/計画|plan|planned|生産/i.test(M));if(!w){b&&(b.style.display="block",b.style.background="rgba(197,61,61,0.1)",b.style.color="#c53d3d",b.textContent=`エラー: 商品コード列が見つかりません。列名: ${f.join(", ")}`);return}let q=0,R=0,B=0;for(const M of x){const O=(M[w]??"").trim();if(!O)continue;const I=a.productionPlan.find(z=>z.productCode===O);if(I){if(q++,P&&M[P]!==void 0&&M[P]!==""){const z=parseFloat(M[P])||0;I.openingStock=z,I.requiredProduction=Math.max(0,I.demandForecast+I.safetyStockTarget-z),I.plannedQty>0&&!D&&(I.plannedQty=I.requiredProduction),R++}D&&M[D]!==void 0&&M[D]!==""&&(I.plannedQty=parseFloat(M[D])||0,B++)}}b&&(b.style.display="block",q===0?(b.style.background="rgba(183,121,31,0.1)",b.style.color="#b7791f",b.textContent=`一致する商品コードが見つかりませんでした（CSV: ${x.length}行）`):(b.style.background="rgba(47,133,90,0.1)",b.style.color="#2f855a",b.textContent=`${q}商品に反映: 在庫${R}件${B>0?` / 計画${B}件`:""} 更新`),setTimeout(()=>{b.style.display="none"},5e3)),A()},p.readAsText(l,"UTF-8"),s.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(p=>{const m=p.dataset.code??"",f=a.productionPlan.find(x=>x.productCode===m);f&&(f.plannedQty=parseFloat(p.value)||0)}),e.querySelectorAll("[data-action='plan-actual-qty']").forEach(p=>{const m=p.dataset.code??"",f=a.productionPlan.find(x=>x.productCode===m);f&&(f.actualQty=parseFloat(p.value)||0,f.actualQty>0&&(f.status="actual"))});const{saveProductionPlan:s}=await N(async()=>{const{saveProductionPlan:p}=await Promise.resolve().then(()=>j);return{saveProductionPlan:p}},void 0);await Promise.all(a.productionPlan.map(p=>s(p)));const{fetchProductionPlan:l}=await N(async()=>{const{fetchProductionPlan:p}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:p}},void 0);a.productionPlan=await l(a.demandPlanYearMonth),F("保存しました"),A()}),e.querySelector("[data-action='plan-print']")?.addEventListener("click",()=>{const s=e.querySelector("[data-action='plan-save']")?.closest("section.panel"),l=e.querySelector("[data-action='cal-toggle-day']")?.closest("section.panel"),p=(s?.outerHTML??"")+(l?.outerHTML??""),m=a.demandPlanYearMonth.replace("-","年")+"月",f=window.open("","_blank");f&&(f.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
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
    </head><body><h1 style="font-size:16px;margin-bottom:12px;">生産計画 — ${m}</h1>${p}</body></html>`),f.document.close(),setTimeout(()=>{f.print()},300))}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.date??"";a.calendarSelectedDate=a.calendarSelectedDate===l?null:l,A()}),s.addEventListener("dblclick",()=>{const l=s.dataset.date??"",p=a.calendarShifts.find(m=>m.date===l);!p||p.confirmed||(p.partTimers>0||p.employees>0?(p.partTimers=0,p.employees=0):(p.partTimers=1,p.employees=0),Xe(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=l,A())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async s=>{const l=s.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveLabelExclusions:p}=await N(async()=>{const{saveLabelExclusions:x}=await Promise.resolve().then(()=>j);return{saveLabelExclusions:x}},void 0),m=[...a.calendarLabelExcluded],f=await p(a.demandPlanYearMonth,m);l.disabled=!1,l.textContent=f?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;s.checked?a.calendarLabelExcluded.delete(l):a.calendarLabelExcluded.add(l);const f=a.productionPlan.filter(x=>!a.calendarLabelExcluded.has(x.productCode));Xe(a.calendarShifts,f,a.calendarCapacity),A(),requestAnimationFrame(()=>{const x=document.getElementById("cal-label-list");x&&(x.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,f=a.productionPlan.filter(b=>b.productionType===l);if(s.checked)for(const b of f)a.calendarLabelExcluded.delete(b.productCode);else for(const b of f)a.calendarLabelExcluded.add(b.productCode);const x=a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode));Xe(a.calendarShifts,x,a.calendarCapacity),A(),requestAnimationFrame(()=>{const b=document.getElementById("cal-label-list");b&&(b.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",s=>{const l=parseInt(s.target.value)||bt;a.calendarCapacity.partCapacity=l;const p=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Xe(a.calendarShifts,p,a.calendarCapacity),A()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",s=>{const l=parseInt(s.target.value)||xt;a.calendarCapacity.empCapacity=l;const p=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Xe(a.calendarShifts,p,a.calendarCapacity),A()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.date??"",p=parseInt(s.value)||0,m=a.calendarShifts.find(f=>f.date===l);m&&(m.partTimers=p),A()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.date??"",p=parseInt(s.value)||0,m=a.calendarShifts.find(f=>f.date===l);m&&(m.employees=p),A()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async s=>{const l=s.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarSelectedDate=null,a.calendarShifts=Wt(l,1,0);const{fetchProductionPlan:p,fetchLabelExclusions:m}=await N(async()=>{const{fetchProductionPlan:b,fetchLabelExclusions:w}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:b,fetchLabelExclusions:w}},void 0),[f,x]=await Promise.all([p(l),m(l)]);a.productionPlan=f.length>0?f:qa(l),a.calendarLabelExcluded=new Set(x),Xe(a.calendarShifts,a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode)),a.calendarCapacity),A()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",s=>{const l=parseInt(s.target.value)||0;a.calendarDefaultPart=l;for(const p of a.calendarShifts)if(!p.confirmed){const m=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.partTimers=m?0:l}A()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",s=>{const l=parseInt(s.target.value)||0;a.calendarDefaultEmp=l;for(const p of a.calendarShifts)if(!p.confirmed){const m=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.employees=m?0:l}A()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=Wt(a.demandPlanYearMonth,1,0),Xe(a.calendarShifts,a.productionPlan.filter(s=>!a.calendarLabelExcluded.has(s.productCode)),a.calendarCapacity),A()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const s of a.calendarShifts)s.confirmed=!0;A()}),e.querySelectorAll("[data-action='select-month']").forEach(s=>{s.addEventListener("click",()=>{const l=parseInt(s.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=l,A())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterArea=s.target.value,A())}),e.querySelector("#visit-filter-score")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(s.target.value)||0,A())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async s=>{const l=s.currentTarget;l.disabled=!0,l.textContent="更新中…";try{const{supabaseRpc:p}=await N(async()=>{const{supabaseRpc:m}=await Promise.resolve().then(()=>te);return{supabaseRpc:m}},void 0);await p("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,F("分析データを更新しました","success"),A()}catch(p){console.error("[refresh-analytics]",p),F("更新に失敗しました","error"),l.disabled=!1,l.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(s=>{s.addEventListener("click",l=>{const p=s.dataset.sortCol??"",m=l.shiftKey;a.route==="/product-power"?a.productSortState=Nt(a.productSortState,p,m):a.route==="/customer-efficiency"?a.customerSortState=Nt(a.customerSortState,p,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=Nt(a.dashboardSortState,p,m):a.route==="/master"?a.masterSortState=Nt(a.masterSortState,p,m):a.route==="/analytics"&&(a.analyticsSortState=Nt(a.analyticsSortState,p,m)),A()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(s=>{s.addEventListener("click",async()=>{const l=parseInt(s.dataset.year??"",10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await At(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),A())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async s=>{const l=parseInt(s.target.value,10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await At(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),A())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.groupby??"billing";a.customerEfficiencyGroupBy=l,a.customerEfficiency=await At(a.customerEfficiencyYear,l,a.customerEfficiencyFiscalType),A()})}),e.querySelectorAll("[data-action='efficiency-fiscal-type']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.fiscalType??"jan";a.customerEfficiencyFiscalType=l,a.customerEfficiency=await At(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,l),A()})}),e.querySelectorAll("[data-product-period]").forEach(s=>{s.addEventListener("click",()=>{a.productPeriod=s.dataset.productPeriod??"year",A()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const s=document.getElementById("pp-range-start")?.value??"",l=document.getElementById("pp-range-end")?.value??"";s&&l&&(a.productCustomStart=s,a.productCustomEnd=l,a.productPeriod="custom",A())}),e.querySelectorAll("[data-product-filter]").forEach(s=>{s.addEventListener("click",()=>{a.productFilter=s.dataset.productFilter??"all",A()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async s=>{const l=s.currentTarget;l.disabled=!0,l.textContent="更新中…",await Ct(),l.disabled=!1,l.textContent="↻ 更新",F("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const s=e.querySelector("#sales-start")?.value??"",l=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:s,endDate:l},eh()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const s={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=s,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,th(s)}),e.addEventListener("click",s=>{const l=s.target.closest("tr[data-doc-no]");if(!l)return;const p=l.dataset.docNo??"";if(a.route==="/"){a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,navigateTo("/sales"),wn(p).then(m=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=m,A())});return}if(a.invoiceSelectedDocNo===p){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,A();return}a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,A(),wn(p).then(m=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=m,A())})});const y=e.querySelector("#ledger-customer-code"),$=e.querySelector("#ledger-cust-suggestions");if(y&&$){const s=a.masterStats?.customers??[];y.addEventListener("input",()=>{const l=y.value.trim().toLowerCase();if(!l){$.style.display="none";return}const p=s.filter(m=>m.code.toLowerCase().includes(l)||m.name.toLowerCase().includes(l)||(m.kanaName??"").toLowerCase().includes(l)).slice(0,10);if(!p.length){$.style.display="none";return}$.innerHTML=p.map(m=>`<button class="search-item" type="button" data-ledger-cust="${m.code}"><span class="mono">${m.code}</span><span>${m.name}</span></button>`).join(""),$.style.display="block",$.querySelectorAll("[data-ledger-cust]").forEach(m=>{m.addEventListener("click",()=>{const f=m.dataset.ledgerCust??"";y.value=f,$.style.display="none",a.ledgerCustomerCode=f,bn(f)})})}),y.addEventListener("keydown",l=>{if(l.key==="Enter"){$.style.display="none";const p=y.value.trim(),m=p.toLowerCase(),f=(a.masterStats?.customers??[]).filter(b=>b.code.toLowerCase()===m||b.name.toLowerCase()===m),x=f.length===1?f[0].code:p.toUpperCase();a.ledgerCustomerCode=x,bn(x)}}),y.addEventListener("blur",()=>{setTimeout(()=>{$.style.display="none"},200)})}e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const s=e.querySelector("#ledger-customer-code")?.value.trim()??"",l=s.toLowerCase(),p=(a.masterStats?.customers??[]).filter(f=>f.code.toLowerCase()===l||f.name.toLowerCase()===l),m=p.length===1?p[0].code:s.toUpperCase();a.ledgerCustomerCode=m,bn(m)}),e.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{a.masterTab=s.dataset.tab,a.masterFilter={...ss},A()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},A()}),e.querySelector("#master-search")?.addEventListener("keydown",s=>{s.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(s=>{s.addEventListener("click",()=>{const l=Number(s.dataset.page);l>=1&&(a.masterFilter={...a.masterFilter,page:l},A())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.table;if(!l)return;a.rawSelectedTable=l,a.rawPage=1;const p=await Pa(l,1);a.rawRecords=p.records,a.rawTotalCount=p.total,A()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const s=await Pa(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,A()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const s=await Pa(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,A()}),e.querySelectorAll("[data-analytics-tab]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsTab=s.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:p}=await N(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:f}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:f}},void 0);a.analyticsPeriodOptions=await p(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await l(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}A()})}),e.querySelectorAll("[data-analytics-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:p,fetchPeriodChartData:m,prevYearFilter:f}=await N(async()=>{const{fetchAnalyticsByPeriod:b,fetchAvailablePeriods:w,fetchPeriodChartData:P,prevYearFilter:D}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:b,fetchAvailablePeriods:w,fetchPeriodChartData:P,prevYearFilter:D}},void 0),x=s.dataset.analyticsPeriod;if(a.analyticsPeriod=x,a.analyticsDrilldown=null,x==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await p(a.analyticsTab,x),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const b=a.analyticsPeriodFilter,[w,P,D]=await Promise.all([l(a.analyticsTab,x,b),m(x,b),m(x,f(b))]);a.analyticsPeriodRows=w,a.analyticsPeriodChartData=P,a.analyticsPrevYearChartData=D}A()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async s=>{const{fetchAnalyticsByPeriod:l,fetchPeriodChartData:p,prevYearFilter:m}=await N(async()=>{const{fetchAnalyticsByPeriod:b,fetchPeriodChartData:w,prevYearFilter:P}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:b,fetchPeriodChartData:w,prevYearFilter:P}},void 0);a.analyticsPeriodFilter=s.target.value,a.analyticsDrilldown=null;const f=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:b}=await N(async()=>{const{fiscalYearToDateRange:O}=await Promise.resolve().then(()=>js);return{fiscalYearToDateRange:O}},void 0),w=parseInt(f),P=b(w);b(w-1);const D=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:q}=await N(async()=>{const{supabaseRpc:O}=await Promise.resolve().then(()=>te);return{supabaseRpc:O}},void 0),[R,B,M]=await Promise.all([q(D,{p_date_from:P.from,p_date_to:P.to}),p("yearly",f),p("yearly",String(w-1))]);a.analyticsPeriodRows=(R??[]).map(O=>({code:String(O.code??""),name:String(O.name??""),amount:Number(O.amount??0),quantity:Number(O.quantity??0),documents:Number(O.documents??0),volumeMl:Number(O.volume_ml??0)})),a.analyticsPeriodChartData=(B??[]).map(O=>({...O})),a.analyticsPrevYearChartData=(M??[]).map(O=>({...O}))}else{const[b,w,P]=await Promise.all([l(a.analyticsTab,a.analyticsPeriod,f),p(a.analyticsPeriod,f),p(a.analyticsPeriod,m(f))]);a.analyticsPeriodRows=b,a.analyticsPeriodChartData=w,a.analyticsPrevYearChartData=P}A()}),e.querySelectorAll("[data-fiscal-mode]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsFiscalMode=s.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:l}=await N(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>js);return{monthToFiscalYear:m}},void 0),p=new Set;for(const m of a.salesAnalytics.monthlySales)p.add(l(m.month));a.analyticsPeriodOptions=[...p].sort((m,f)=>f-m).map(String)}else{const{fetchAvailablePeriods:l}=await N(async()=>{const{fetchAvailablePeriods:p}=await Promise.resolve().then(()=>j);return{fetchAvailablePeriods:p}},void 0);a.analyticsPeriodOptions=await l(a.analyticsTab,"yearly")}A()})}),e.querySelectorAll("[data-chart-metric]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsChartMetric=s.dataset.chartMetric,A()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.analyticsDrilldown??"",p=s.dataset.drilldownName??l,m=a.analyticsTab,{fetchCustomerProductBreakdown:f,fetchProductCustomerBreakdown:x,fetchEntityMonthlySales:b,periodToDateRange:w}=await N(async()=>{const{fetchCustomerProductBreakdown:R,fetchProductCustomerBreakdown:B,fetchEntityMonthlySales:M,periodToDateRange:O}=await Promise.resolve().then(()=>j);return{fetchCustomerProductBreakdown:R,fetchProductCustomerBreakdown:B,fetchEntityMonthlySales:M,periodToDateRange:O}},void 0),P=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?w(a.analyticsPeriod,a.analyticsPeriodFilter):null,[D,q]=await Promise.all([b(l,m==="customers"?"customer":"product"),m==="customers"?f(l,P?.from,P?.to):x(l,P?.from,P?.to)]);a.analyticsDrilldown={tab:m,code:l,name:p,monthlySales:D,breakdownRows:q},A()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,A()}),e.querySelector("#staff-filter-input")?.addEventListener("input",s=>{a.analyticsStaffFilter=s.target.value,A()}),e.querySelectorAll("[data-staff-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.staffDrilldown??"",p=s.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:f,periodToDateRange:x}=await N(async()=>{const{fetchStaffCustomerBreakdown:q,fetchStaffProductBreakdown:R,periodToDateRange:B}=await Promise.resolve().then(()=>j);return{fetchStaffCustomerBreakdown:q,fetchStaffProductBreakdown:R,periodToDateRange:B}},void 0),b=x(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),w=a.analyticsStaffDrilldown?.breakdownTab??"customers",[P,D]=await Promise.all([m(l,b?.from,b?.to),f(l,b?.from,b?.to)]);a.analyticsStaffDrilldown={code:l,name:p,breakdownTab:w,customerRows:P,productRows:D},A()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:s.dataset.staffBreakdownTab},A())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,A()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",s=>{a.analyticsTagFilter=s.target.value,A()}),e.querySelectorAll("[data-staff-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAvailablePeriods:l,fetchStaffTotalsByPeriod:p,periodToDateRange:m}=await N(async()=>{const{fetchAvailablePeriods:x,fetchStaffTotalsByPeriod:b,periodToDateRange:w}=await Promise.resolve().then(()=>j);return{fetchAvailablePeriods:x,fetchStaffTotalsByPeriod:b,periodToDateRange:w}},void 0),f=s.dataset.staffPeriod;if(a.analyticsStaffPeriod=f,a.analyticsStaffDrilldown=null,f==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await l("staff",f),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const x=m(f,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await p(x?.from,x?.to)}A()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async s=>{const{fetchStaffTotalsByPeriod:l,periodToDateRange:p}=await N(async()=>{const{fetchStaffTotalsByPeriod:f,periodToDateRange:x}=await Promise.resolve().then(()=>j);return{fetchStaffTotalsByPeriod:f,periodToDateRange:x}},void 0);a.analyticsStaffPeriodFilter=s.target.value;const m=p(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await l(m?.from,m?.to),a.analyticsStaffDrilldown=null,A()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Fe(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},A()}),e.querySelectorAll("[data-action='remove-line']").forEach(s=>{s.addEventListener("click",()=>{Fe(e);const l=parseInt(s.dataset.line??"0",10);a.invoiceForm.lines.splice(l,1),a.invoiceErrors=Kr(a.invoiceForm),A()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(s=>{s.addEventListener("click",()=>{Fe(e),Vy(parseInt(s.dataset.line??"0",10)),a.invoiceErrors={},A()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Yy(),A()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Fe(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,A()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(s=>{s.addEventListener("click",()=>{Fe(e);const l=parseInt(s.dataset.line??"0",10),p=a.invoiceForm.lines[l];a.pickerMode="product",a.pickerTargetLine=l,a.pickerQuery=p?p.productCode||p.productName:"",A()})}),e.querySelectorAll("[data-action='modal-close']").forEach(s=>{s.addEventListener("click",l=>{s.classList.contains("modal-backdrop")&&l.target instanceof HTMLElement&&!l.target.classList.contains("modal-backdrop")||(ja(),A())})}),e.querySelectorAll("[data-action='picker-select']").forEach(s=>{const l=async()=>{const p=s.dataset.code??"",m=s.dataset.name??"";if(a.pickerMode==="customer"){const f=a.masterStats?.customers.find(x=>x.code===p);Tt({code:p,name:m,priceGroup:f?.priceGroup,staffCode:f?.staffCode}),delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&p&&(a.invoicePriceGroup=await Ea(p))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const f=a.invoiceForm.lines[a.pickerTargetLine];if(f){f.productCode=p,f.productName=m;const x=await kn(a.invoicePriceGroup,p);x>0&&(f.unitPrice=x),f.amount=f.quantity*f.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}ja(),A()};s.addEventListener("click",l),s.addEventListener("keydown",p=>{p.key==="Enter"&&l()})}),e.querySelector("#modal-search")?.addEventListener("input",s=>{a.pickerQuery=s.target.value,A()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Hr(),A()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Qr(e)}),e.querySelectorAll("[data-action='select-freq-customer']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.code??"",p=s.dataset.name??"",m=a.masterStats?.customers.find(f=>f.code===l);Tt({code:l,name:p,priceGroup:m?.priceGroup,staffCode:m?.staffCode}),!a.invoicePriceGroup&&l&&(a.invoicePriceGroup=await Ea(l)),delete a.invoiceErrors.customerCode,A()})}),e.querySelectorAll("[data-action='select-freq-product']").forEach(s=>{s.addEventListener("click",async()=>{Fe(e);const l=s.dataset.code??"",p=s.dataset.name??"";let m=a.invoiceForm.lines.findIndex(b=>!b.productCode);m<0&&(a.invoiceForm.lines.push({productCode:"",productName:"",quantity:1,unitPrice:0,unit:"本",amount:0}),m=a.invoiceForm.lines.length-1);const f=a.invoiceForm.lines[m];f.productCode=l,f.productName=p;const x=await kn(a.invoicePriceGroup,l);x>0&&(f.unitPrice=x),f.amount=f.quantity*f.unitPrice,A()})}),e.querySelector("[data-action='open-new-staff']")?.addEventListener("click",async()=>{const s=prompt("新規担当者の名前を入力してください:");if(!s?.trim())return;const l=`S${String(Date.now()).slice(-4)}`,{createStaff:p}=await N(async()=>{const{createStaff:f}=await Promise.resolve().then(()=>j);return{createStaff:f}},void 0),m=await p(l,s.trim());m?(a.staffList.push(m),a.invoiceForm.registeredBy=m.code,F(`担当者「${m.name}」を登録しました`,"success"),A()):F("担当者の登録に失敗しました","error")}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Fe(e),Uy(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await Ea(a.invoiceForm.customerCode)),A())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Fe(e),Jy(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,A())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(s=>{s.addEventListener("input",()=>{Fe(e),a.invoiceSavedDocNo=null;const l=s.dataset.field;(l==="quantity"||l==="unitPrice")&&A()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Fe(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const s=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=s.trim(),a.deliveryNote=null,a.actionLoading=!0,A(),!a.deliverySearchDocNo){F("伝票番号を入力してください","error"),a.actionLoading=!1,A();return}Un(a.deliverySearchDocNo).then(l=>{a.deliveryNote=l,a.actionLoading=!1,A()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const s=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=s,a.billingSummary=null,a.actionLoading=!0,A(),Jn(s).then(l=>{a.billingSummary=l,a.actionLoading=!1,A()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const s=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),l=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=s,a.taxMonth=l,a.taxDeclaration=null,a.taxVolume=null,a.actionLoading=!0,A(),Promise.all([Qn(s,l),Wn(s,l)]).then(([p,m])=>{a.taxDeclaration=p,a.taxVolume=m,a.actionLoading=!1,A()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:s}=await N(async()=>{const{generateTaxXML:x}=await Promise.resolve().then(()=>j);return{generateTaxXML:x}},void 0),l=s(a.taxDeclaration),p=new Blob([l],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(p),f=document.createElement("a");f.href=m,f.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,f.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:s}=await N(async()=>{const{generateTaxCSV:x}=await Promise.resolve().then(()=>j);return{generateTaxCSV:x}},void 0),l=s(a.taxDeclaration),p=new Blob([l],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(p),f=document.createElement("a");f.href=m,f.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,f.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:s}=await N(async()=>{const{saveTaxDeclaration:l}=await Promise.resolve().then(()=>j);return{saveTaxDeclaration:l}},void 0);try{await s(a.taxDeclaration),F("下書き保存しました")}catch(l){F("保存に失敗: "+(l instanceof Error?l.message:String(l)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(s=>{s.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const l=Number(s.dataset.taxRow),p=s.dataset.taxField,m=s.type==="number"?Number(s.value)||0:s.value,f=[...a.taxDeclaration.rows];f[l]={...f[l],[p]:m};const{recalculateTaxDeclaration:x}=await N(async()=>{const{recalculateTaxDeclaration:b}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:b}},void 0);a.taxDeclaration=x({...a.taxDeclaration,rows:f}),A()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=Number(s.dataset.dedRow),p=s.dataset.dedField,m=s.type==="number"?Number(s.value)||0:s.value,f=[...a.taxDeclaration.deductions];f[l]={...f[l],[p]:m},a.taxDeclaration={...a.taxDeclaration,deductions:f},A()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=s.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[l]:s.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:s,TAX_RATE_CATEGORIES:l}=await N(async()=>{const{recalculateTaxDeclaration:f,TAX_RATE_CATEGORIES:x}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:f,TAX_RATE_CATEGORIES:x}},void 0),p=l[0],m={taxCategory:p.code,taxCategoryName:p.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:p.taxRatePerLiter,taxAmount:0};a.taxDeclaration=s({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),A()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(s=>{s.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const l=Number(s.dataset.taxRow),{recalculateTaxDeclaration:p}=await N(async()=>{const{recalculateTaxDeclaration:f}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:f}},void 0),m=a.taxDeclaration.rows.filter((f,x)=>x!==l);a.taxDeclaration=p({...a.taxDeclaration,rows:m}),A()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const s={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,s]},A()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(s=>{s.addEventListener("click",()=>{if(!a.taxDeclaration)return;const l=Number(s.dataset.dedRow),p=a.taxDeclaration.deductions.filter((m,f)=>f!==l);a.taxDeclaration={...a.taxDeclaration,deductions:p},A()})}),e.querySelectorAll("[data-store-tab]").forEach(s=>{s.addEventListener("click",()=>{a.storeTab=s.dataset.storeTab,A()})}),e.querySelectorAll("[data-import-entity]").forEach(s=>{s.addEventListener("click",()=>{a.importEntity=s.dataset.importEntity,a.importPreview=null,a.importResult=null,A()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const s=Mr(a.importEntity),l=new Blob([s],{type:"text/csv;charset=utf-8"}),p=URL.createObjectURL(l),m=document.createElement("a");m.href=p,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(p)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const l=e.querySelector("#import-file")?.files?.[0];if(!l){F("CSVファイルを選択してください","warning");return}const p=new FileReader;p.onload=()=>{const m=String(p.result??""),{columns:f,rows:x}=Tr(m);a.importPreview=Ir(a.importEntity,f,x),a.importResult=null,A()},p.readAsText(l,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,A()}),e.querySelectorAll("[data-print-template]").forEach(s=>{s.addEventListener("click",()=>{a.printTemplate=s.dataset.printTemplate,A()})}),e.querySelectorAll("[data-print-field]").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.printField;let p=s.value;(l==="taxRate"||l==="previousBalance"||l==="paymentAmount")&&(p=Number(s.value)||0),a.printData={...a.printData,[l]:p},A()})}),e.querySelectorAll("[data-print-opt]").forEach(s=>{const l=()=>{const p=s.dataset.printOpt;let m;s.type==="checkbox"?m=s.checked:p==="copies"?m=Number(s.value)||1:p==="overlayOpacity"||p==="calibrationOffsetX"||p==="calibrationOffsetY"?m=Number(s.value)||0:m=s.value,a.printOptions={...a.printOptions,[p]:m},A()};s.addEventListener("change",l),s.type==="range"&&s.addEventListener("input",l)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(s=>{s.addEventListener("change",()=>{const l=Number(s.dataset.printLine),p=s.dataset.printLfield,m=[...a.printData.lines];let f=s.value;(p==="quantity"||p==="unitPrice")&&(f=Number(s.value)||0),m[l]={...m[l],[p]:f},m[l].amount=(Number(m[l].quantity)||0)*(Number(m[l].unitPrice)||0),a.printData={...a.printData,lines:m},A()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},A()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(s=>{s.addEventListener("click",()=>{const l=Number(s.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((p,m)=>m!==l)},A()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),F("印刷設定を保存しました")}catch(s){F("保存失敗: "+(s instanceof Error?s.message:String(s)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const s=a.printCompany,l=prompt("会社名",s.name);if(l===null)return;const p=prompt("郵便番号",s.postalCode)??s.postalCode,m=prompt("住所",s.address1)??s.address1,f=prompt("TEL",s.tel)??s.tel,x=prompt("FAX",s.fax)??s.fax,b=prompt("適格請求書登録番号 (T+13桁)",s.registrationNo)??s.registrationNo,w=prompt("取引銀行名",s.bankName)??s.bankName,P=prompt("支店名",s.bankBranch)??s.bankBranch,D=prompt("口座番号",s.bankAccountNo)??s.bankAccountNo,q=prompt("口座名義",s.bankAccountHolder)??s.bankAccountHolder;a.printCompany={...s,name:l,postalCode:p,address1:m,tel:f,fax:x,registrationNo:b,bankName:w,bankBranch:P,bankAccountNo:D,bankAccountHolder:q},A()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,A()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const p=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=on(s),{savePrintLayout:f}=await N(async()=>{const{savePrintLayout:b}=await Promise.resolve().then(()=>j);return{savePrintLayout:b}},void 0),x={id:`bp1701_${p.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:p,templateKey:"chain_store",positions:m};try{await f(x)?(F(`クラウド保存成功: ${p}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),A()):(F("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(b){F("保存エラー: "+(b instanceof Error?b.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const l=on(s);a.fdSavedPositions=l;try{localStorage.setItem("sake_fd_positions",JSON.stringify(l)),F(`ローカル保存完了: ${Object.keys(l).length}件`)}catch(p){F("保存失敗: "+(p instanceof Error?p.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const p={templateKey:"chain_store",positions:on(s),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(p,null,2)],{type:"application/json"}),f=URL.createObjectURL(m),x=document.createElement("a");x.href=f,x.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,x.click(),URL.revokeObjectURL(f)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async s=>{const l=s.target.files?.[0];if(l)try{const p=await l.text(),f=JSON.parse(p).positions;if(!f)throw new Error("positions field not found");a.fdSavedPositions=f,localStorage.setItem("sake_fd_positions",JSON.stringify(f)),F(`インポート成功: ${Object.keys(f).length}件`),A()}catch(p){F("インポート失敗: "+(p instanceof Error?p.message:""),"error")}});const S=e.querySelector("#fd-saved-layouts");S&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:s}=await N(async()=>{const{fetchPrintLayouts:p}=await Promise.resolve().then(()=>j);return{fetchPrintLayouts:p}},void 0),l=await s("chain_store");l.length===0?S.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(S.innerHTML=`☁️ クラウド保存済み (${l.length}件):<br/>`+l.map(p=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${p.id}" style="margin:4px 4px 0 0;">${p.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${p.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),S.querySelectorAll("[data-action='fd-load-layout']").forEach(p=>{p.addEventListener("click",()=>{const m=p.dataset.layoutId,f=l.find(x=>x.id===m);f&&(a.fdSavedPositions=f.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(f.positions)),F(`読込完了: ${f.name}`),A())})}),S.querySelectorAll("[data-action='fd-delete-layout']").forEach(p=>{p.addEventListener("click",async()=>{const m=p.dataset.layoutId;if(!m||!await Me("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:f}=await N(async()=>{const{deletePrintLayout:b}=await Promise.resolve().then(()=>j);return{deletePrintLayout:b}},void 0);await f(m)?(F("削除しました"),A()):F("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Me("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),A())});const _=e.querySelector("#fd-sel-x"),L=e.querySelector("#fd-sel-y");if([_,L].forEach(s=>{s?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const l=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);l&&(_&&(l.style.left=_.value+"mm"),L&&(l.style.top=L.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(s=>{s.addEventListener("dragstart",l=>{s.classList.add("wf-dragging"),l.dataTransfer?.setData("text/plain",s.dataset.wfOrder??"")}),s.addEventListener("dragend",()=>s.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(s=>{s.addEventListener("dragover",l=>l.preventDefault()),s.addEventListener("drop",l=>{l.preventDefault();const p=l.dataTransfer?.getData("text/plain"),m=s.dataset.wfStage;if(!p||!m)return;const f=a.workflowOrders.find(x=>x.id===p);f&&(f.stage=m,A())})}),e.querySelectorAll("[data-mo-step]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.moStep;s.disabled||(a.mobileOrder.step=l,A())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",s=>{a.mobileOrder.customerQuery=s.target.value,A()}),e.querySelector("#mo-product-q")?.addEventListener("input",s=>{a.mobileOrder.productQuery=s.target.value,A()}),e.querySelectorAll("[data-mo-select-customer]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.moSelectCustomer,p=a.masterStats?.customers.find(m=>m.id===l);p&&(a.mobileOrder.selectedCustomer=p),A()})}),e.querySelectorAll("[data-mo-add-product]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.moAddProduct,p=a.masterStats?.products.find(f=>f.code===l);if(!p)return;const m=1800;a.mobileOrder.cart.push({productCode:p.code,productName:p.name,quantity:1,unit:"本",unitPrice:m,amount:m}),A()})}),e.querySelectorAll("[data-mo-qty]").forEach(s=>{s.addEventListener("click",()=>{const l=Number(s.dataset.moQty),p=s.dataset.moProduct,m=a.mobileOrder.cart.find(f=>f.productCode===p);m&&(m.quantity=Math.max(0,m.quantity+l),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(f=>f.productCode!==p)),A())})}),e.querySelectorAll("[data-mo-remove]").forEach(s=>{s.addEventListener("click",()=>{const l=Number(s.dataset.moRemove);a.mobileOrder.cart.splice(l,1),A()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const s=e.querySelector("#mo-memo");a.mobileOrder.memo=s?.value??"";const l="MO"+Date.now().toString().slice(-8),p=e.querySelector("[data-action='mo-submit']");p&&(p.disabled=!0,p.textContent="送信中…");const m=a.mobileOrder.cart.reduce((f,x)=>f+x.amount,0);try{const{saveStoreOrder:f}=await N(async()=>{const{saveStoreOrder:x}=await Promise.resolve().then(()=>j);return{saveStoreOrder:x}},void 0);await f(l,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(f){console.error("受注保存失敗:",f),F("送信に失敗しました","error"),p&&(p.disabled=!1,p.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=l,a.mobileOrder.step="done",A()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},A()}),e.querySelectorAll("[data-tour-id]").forEach(s=>{s.addEventListener("click",()=>{a.tourActiveId=s.dataset.tourId??null,A()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(s=>{s.addEventListener("click",()=>{const l=a.tourInquiries.find(b=>b.id===a.tourActiveId);if(!l)return;const p=s.dataset.template==="confirm"?$u:_u,m=e.querySelector("#tour-confirmed-time"),f=p.replaceAll("{name}",l.name).replaceAll("{partySize}",String(l.partySize)).replaceAll("{confirmedTime}",m?.value??l.visitDate),x=e.querySelector("#tour-reply-body");x&&(x.value=f)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const s=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",l=a.tourInquiries.find(m=>m.id===s);if(!l)return;const p=e.querySelector("#tour-confirmed-time");l.status="confirmed",l.repliedAt=new Date().toISOString(),l.confirmedTime=p?.value??"",F("返信メールを下書き保存し、ステータスを確定にしました"),A()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const s=e.querySelector("#lb-type")?.value??"",l=e.querySelector("#lb-area")?.value??"",p=e.querySelector("#lb-keyword")?.value??"";if(!s&&!p){F("業種かキーワードを入力してください","warning");return}a.leadSearchType=s,a.leadSearchArea=l,a.leadSearchQuery=p,a.leadSearching=!0,A();const m=a.integrations.find(w=>w.provider==="google_maps");if(!m||!m.config.api_key){F("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,A();return}const{searchPlaces:f}=await N(async()=>{const{searchPlaces:w}=await Promise.resolve().then(()=>j);return{searchPlaces:w}},void 0),x=[s,p].filter(Boolean).join(" "),b=await f(m,x,l);a.leadSearching=!1,b.error?F("検索失敗: "+b.error,"error"):a.leadSearchResults=b.results,A()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],A()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const s=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!s)return;const l=`ll_${Date.now()}`,p={id:l,name:s,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:f,fetchLeadLists:x,fetchLeadItems:b}=await N(async()=>{const{saveLeadList:D,saveLeadItem:q,fetchLeadLists:R,fetchLeadItems:B}=await Promise.resolve().then(()=>j);return{saveLeadList:D,saveLeadItem:q,fetchLeadLists:R,fetchLeadItems:B}},void 0);await m(p);const w=e.querySelectorAll(".lb-search-check:checked"),P=Array.from(w).map(D=>Number(D.dataset.idx));for(const D of P){const q=a.leadSearchResults[D];q&&await f({...q,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:l,businessType:a.leadSearchType})}a.leadLists=await x(),a.leadActiveListId=l,a.leadItems=await b(l),a.leadSearchResults=[],F(`${P.length}件を「${s}」として保存しました`),A()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??null;if(a.leadActiveListId=l,l){const{fetchLeadItems:p}=await N(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>j);return{fetchLeadItems:m}},void 0);a.leadItems=await p(l)}A()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??"",p=a.leadItems.find(x=>x.id===l);if(!p)return;const{saveLeadItem:m,fetchLeadItems:f}=await N(async()=>{const{saveLeadItem:x,fetchLeadItems:b}=await Promise.resolve().then(()=>j);return{saveLeadItem:x,fetchLeadItems:b}},void 0);await m({...p,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await f(a.leadActiveListId)),A()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??"",p=a.leadItems.find(b=>b.id===l);if(!p)return;const{convertLeadToProspect:m,fetchLeadItems:f}=await N(async()=>{const{convertLeadToProspect:b,fetchLeadItems:w}=await Promise.resolve().then(()=>j);return{convertLeadToProspect:b,fetchLeadItems:w}},void 0);await m(p)&&(F("見込客に追加しました: "+p.companyName),a.leadActiveListId&&(a.leadItems=await f(a.leadActiveListId)),A())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const s=e.querySelectorAll(".lb-item-check:checked");if(s.length===0&&!await Me("全ての新規アイテムを見込客に変換しますか？"))return;const l=s.length>0?Array.from(s).map(x=>x.dataset.id):a.leadItems.filter(x=>x.status==="new").map(x=>x.id),{convertLeadToProspect:p,fetchLeadItems:m}=await N(async()=>{const{convertLeadToProspect:x,fetchLeadItems:b}=await Promise.resolve().then(()=>j);return{convertLeadToProspect:x,fetchLeadItems:b}},void 0);let f=0;for(const x of l){const b=a.leadItems.find(w=>w.id===x);b&&b.status==="new"&&await p(b)&&f++}F(`${f}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),A()}),e.querySelectorAll("[data-analysis-tab]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.analysisTab;a.analysisTab!==l&&(a.analysisTab=l,A())})}),e.querySelector("#analysis-period-year")?.addEventListener("change",async s=>{const l=s.target.value,p=e.querySelector("#analysis-period-month")?.value??"";a.analysisPeriod=l&&p?`${l}-${p}`:l,a.customerAnalysis=null,a.productABC=null,await aa("/customer-analysis"),A()}),e.querySelector("#analysis-period-month")?.addEventListener("change",async s=>{const l=s.target.value,p=e.querySelector("#analysis-period-year")?.value??"";a.analysisPeriod=p&&l?`${p}-${l}`:p,a.customerAnalysis=null,a.productABC=null,await aa("/customer-analysis"),A()}),e.querySelector("#customer-map")){const s=()=>{window.google?.maps?rh(e):setTimeout(s,200)};s()}e.querySelectorAll(".churn-reason-select").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.churnCode??"",p=s.value;try{const{saveChurnNote:m}=await N(async()=>{const{saveChurnNote:b}=await Promise.resolve().then(()=>j);return{saveChurnNote:b}},void 0);await m({customerCode:l,reason:p,memo:"",actionedAt:null});const f=a.churnNotes.find(b=>b.customerCode===l);f?f.reason=p:a.churnNotes.push({customerCode:l,reason:p,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const x=s.closest("tr");if(x){const b=x.querySelector("td:nth-child(2)");if(b){let w=b.querySelector(".reason-badge");!w&&p&&(w=document.createElement("span"),w.className="status-pill info reason-badge",w.style.fontSize="0.72rem",b.appendChild(w)),w&&(w.textContent=p?Ty[p]??"":"")}}F("理由を保存しました")}catch(m){F("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.churnCode??"",p=s.checked,m=s.closest("tr");m&&(m.style.opacity=p?"0.45":"",m.setAttribute("data-actioned",p?"1":"0"));try{const{saveChurnNote:f}=await N(async()=>{const{saveChurnNote:P}=await Promise.resolve().then(()=>j);return{saveChurnNote:P}},void 0),x=a.churnNotes.find(P=>P.customerCode===l),b=x?.reason??"",w=new Date().toISOString().slice(0,10);await f({customerCode:l,reason:b,memo:"",actionedAt:p?w:null}),x?x.actionedAt=p?w:null:a.churnNotes.push({customerCode:l,reason:b,memo:"",actionedAt:p?w:null,updatedAt:new Date().toISOString()}),F(p?"対応済みにしました":"対応済みを解除しました")}catch(f){F("保存に失敗しました","error"),console.error(f)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const s=a.integrations.find(f=>f.provider==="ivry");if(!s||!s.isEnabled){F("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:l,fetchCallLogs:p}=await N(async()=>{const{syncIvryCallLogs:f,fetchCallLogs:x}=await Promise.resolve().then(()=>j);return{syncIvryCallLogs:f,fetchCallLogs:x}},void 0),m=await l(s);m.error?F("同期失敗: "+m.error,"error"):(F(`${m.count}件の通話履歴を同期しました`),a.callLogs=await p(100),A())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const s=a.integrations.find(f=>f.provider==="ivry");if(!s||!s.isEnabled){F("IVRy連携が無効です","warning");return}if(!await Me("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:l}=await N(async()=>{const{syncPhoneBookToIvry:f}=await Promise.resolve().then(()=>j);return{syncPhoneBookToIvry:f}},void 0),p=[];a.masterStats?.customers.forEach(f=>{p.push({name:f.name,phone:"",customerCode:f.code,note:"既存取引先"})}),a.prospects.forEach(f=>{f.phone&&p.push({name:f.companyName,phone:f.phone,customerCode:f.id,note:`見込客 (${f.stage})`})});const m=await l(s,p);m.error?F("送信失敗: "+m.error,"error"):F(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??"",p=s.dataset.phone??"",m=prompt(`電話番号 ${p} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const f=a.callLogs.find(w=>w.id===l);if(!f)return;const{saveCallLog:x,fetchCallLogs:b}=await N(async()=>{const{saveCallLog:w,fetchCallLogs:P}=await Promise.resolve().then(()=>j);return{saveCallLog:w,fetchCallLogs:P}},void 0);await x({...f,matchedCustomerCode:m}),a.callLogs=await b(100),A()})}),e.querySelectorAll("[data-action='call-memo']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??"",p=a.callLogs.find(b=>b.id===l);if(!p)return;const m=prompt("メモを入力:",p.notes??"");if(m===null)return;const{saveCallLog:f,fetchCallLogs:x}=await N(async()=>{const{saveCallLog:b,fetchCallLogs:w}=await Promise.resolve().then(()=>j);return{saveCallLog:b,fetchCallLogs:w}},void 0);await f({...p,notes:m}),a.callLogs=await x(100),A()})}),e.querySelectorAll("[data-prospect-view]").forEach(s=>{s.addEventListener("click",()=>{a.prospectViewMode=s.dataset.prospectView,A()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",A()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:p}=await N(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>j);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await p(l)}A()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.prospectId??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:p}=await N(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>j);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await p(l)}A()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(s=>{s.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],A())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const s=a.prospectEditingId==="__new__",l=s?`p_${Date.now()}`:a.prospectEditingId??"",p={id:l,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!p.companyName){F("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:f,recordAudit:x,sendSlackNotification:b}=await N(async()=>{const{saveProspect:P,fetchProspects:D,recordAudit:q,sendSlackNotification:R}=await Promise.resolve().then(()=>j);return{saveProspect:P,fetchProspects:D,recordAudit:q,sendSlackNotification:R}},void 0);await m(p)?(s&&await b("new_prospect",`新規見込客: ${p.companyName} / 想定 ¥${p.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await x({action:s?"prospect_create":"prospect_update",entityType:"prospect",entityId:l,userEmail:a.user?.email}),a.prospects=await f(),a.prospectEditingId=null,A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=s.dataset.id??"",{deleteProspect:p,fetchProspects:m}=await N(async()=>{const{deleteProspect:f,fetchProspects:x}=await Promise.resolve().then(()=>j);return{deleteProspect:f,fetchProspects:x}},void 0);await p(l)&&(a.prospects=await m(),A())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(s=>{s.addEventListener("click",l=>{l.stopPropagation();const p=s.dataset.id??"",m=s.dataset.name??"",f=s.dataset.addr??"";a.quoteState=Oa(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=f,a.quoteState.isProspect=!0,a.quoteState.prospectId=p,a.quotePricing=null,a.quoteEditId="new",gt("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",l=e.querySelector("#prospect-activity-type")?.value??"call",p=e.querySelector("#prospect-activity-title")?.value??"";if(!p){F("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:f}=await N(async()=>{const{saveProspectActivity:x,fetchProspectActivities:b}=await Promise.resolve().then(()=>j);return{saveProspectActivity:x,fetchProspectActivities:b}},void 0);await m({id:`act_${Date.now()}`,prospectId:s,activityType:l,title:p,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await f(s),A()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("dragstart",l=>{l.dataTransfer?.setData("text/plain",s.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(s=>{s.addEventListener("dragover",l=>l.preventDefault()),s.addEventListener("drop",async l=>{l.preventDefault();const p=l.dataTransfer?.getData("text/plain"),m=s.dataset.prospectStage;if(!p)return;const f=a.prospects.find(x=>x.id===p);if(f&&f.stage!==m){const x={...f,stage:m},{saveProspect:b}=await N(async()=>{const{saveProspect:w}=await Promise.resolve().then(()=>j);return{saveProspect:w}},void 0);await b(x),f.stage=m,A()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:s,saveIntegrationSetting:l}=await N(async()=>{const{fetchIntegrationSettings:w,saveIntegrationSetting:P}=await Promise.resolve().then(()=>j);return{fetchIntegrationSettings:w,saveIntegrationSetting:P}},void 0),m=(a.integrations.length>0?a.integrations:await s()).find(w=>w.provider==="slack");if(!m)return;const f=e.querySelector("#slack-webhook")?.value??"",x=e.querySelector("#slack-default-channel")?.value??"",b=e.querySelector("#slack-enabled")?.checked??!1;await l({...m,config:{...m.config,webhook_url:f,default_channel:x},isEnabled:b}),a.integrations=await s(),F("保存しました"),A()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:s,fetchSlackRules:l}=await N(async()=>{const{saveSlackRule:p,fetchSlackRules:m}=await Promise.resolve().then(()=>j);return{saveSlackRule:p,fetchSlackRules:m}},void 0);for(const p of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="enabled"]`)?.checked??p.enabled,f=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="channel"]`)?.value??p.channel;await s({...p,enabled:m,channel:f})}a.slackRules=await l(),F("ルールを保存しました"),A()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:s}=await N(async()=>{const{sendSlackNotification:p}=await Promise.resolve().then(()=>j);return{sendSlackNotification:p}},void 0),l=await s("new_order","🧪 これはテスト通知です (syusen-cloud)");l.ok?F("テスト送信成功"):F("送信失敗: "+(l.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,A()}),e.querySelectorAll("[data-action='material-adjust']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.id??"",p=a.materialList.find(m=>m.id===l);p&&(a.materialEditing=p,a.materialEditingIsNew=!1,A())})}),e.querySelectorAll("[data-action='material-close']").forEach(s=>{s.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,A())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const l={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(l.materialType=e.querySelector("#mat-type")?.value??"",!l.code||!l.name){F("コードと品名は必須です","warning");return}const{saveMaterial:p,fetchMaterialList:m}=await N(async()=>{const{saveMaterial:x,fetchMaterialList:b}=await Promise.resolve().then(()=>j);return{saveMaterial:x,fetchMaterialList:b}},void 0);await p(l)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,F("保存しました"),A()):F("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!s||!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:l,fetchMaterialList:p}=await N(async()=>{const{deleteMaterial:m,fetchMaterialList:f}=await Promise.resolve().then(()=>j);return{deleteMaterial:m,fetchMaterialList:f}},void 0);await l(s)&&(a.materialList=await p(),a.materialEditing=null,A())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",A()}),e.querySelectorAll("[data-action='user-edit']").forEach(s=>{s.addEventListener("click",()=>{a.userEditingId=s.dataset.id??null,A()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,A()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const s=a.userEditingId==="__new__",l=s?crypto.randomUUID():a.userEditingId??"",p=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!p||!m){F("名前とメールアドレスは必須です","warning");return}const f={id:l,email:p,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(s){const D=e.querySelector("#user-password")?.value??"";if(D.length<8){F("パスワードは8文字以上必要です","warning");return}try{await vs(p,D)}catch(q){F("Auth登録失敗: "+(q instanceof Error?q.message:""),"error");return}}const{saveUserProfile:x,fetchUserProfiles:b,recordAudit:w}=await N(async()=>{const{saveUserProfile:D,fetchUserProfiles:q,recordAudit:R}=await Promise.resolve().then(()=>j);return{saveUserProfile:D,fetchUserProfiles:q,recordAudit:R}},void 0);await x(f)?(await w({action:s?"user_create":"user_update",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await b(),a.userEditingId=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=s.dataset.id??"",{deleteUserProfile:p,fetchUserProfiles:m,recordAudit:f}=await N(async()=>{const{deleteUserProfile:b,fetchUserProfiles:w,recordAudit:P}=await Promise.resolve().then(()=>j);return{deleteUserProfile:b,fetchUserProfiles:w,recordAudit:P}},void 0);await p(l)?(await f({action:"user_delete",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await m(),A()):F("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const s=e.querySelector("#profile-sender")?.value??"",l={...a.myProfile,defaultMailSenderId:s},{saveUserProfile:p}=await N(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>j);return{saveUserProfile:m}},void 0);await p(l),a.myProfile=l,F("保存しました"),A()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const s=e.querySelector("#profile-new-password")?.value??"";if(s.length<8){F("8文字以上のパスワードを入力してください","warning");return}try{await yi(s),F("パスワードを変更しました")}catch(l){F("変更失敗: "+(l instanceof Error?l.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(s=>{s.addEventListener("click",()=>{a.integrationEditingId=s.dataset.id??null,A()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,A()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='int-save']")?.dataset.id??"",l=a.integrations.find(w=>w.id===s);if(!l)return;const p={...l.config};Object.keys(p).forEach(w=>{const P=e.querySelector(`#int-${w}`);P&&(p[w]=P.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:f,fetchIntegrationSettings:x}=await N(async()=>{const{saveIntegrationSetting:w,fetchIntegrationSettings:P}=await Promise.resolve().then(()=>j);return{saveIntegrationSetting:w,fetchIntegrationSettings:P}},void 0);await f({...l,config:p,isEnabled:m})?(a.integrations=await x(),a.integrationEditingId=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(s=>{s.addEventListener("click",async()=>{const l=a.integrations.find(x=>x.provider==="shopify");if(!l){F("Shopify連携が未設定です","warning");return}s.textContent="同期中…",s.disabled=!0;const{syncShopifyOrders:p,fetchShopifyOrders:m}=await N(async()=>{const{syncShopifyOrders:x,fetchShopifyOrders:b}=await Promise.resolve().then(()=>j);return{syncShopifyOrders:x,fetchShopifyOrders:b}},void 0),f=await p(l);f.error?F("同期失敗: "+f.error,"error"):(F(`${f.count}件を同期しました`),a.shopifyOrders=await m()),A()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(s=>{s.addEventListener("click",async()=>{const l=a.integrations.find(x=>x.provider==="google_calendar");if(!l)return;s.textContent="同期中…",s.disabled=!0;const{syncGoogleCalendar:p,fetchCalendarEvents:m}=await N(async()=>{const{syncGoogleCalendar:x,fetchCalendarEvents:b}=await Promise.resolve().then(()=>j);return{syncGoogleCalendar:x,fetchCalendarEvents:b}},void 0),f=await p(l);f.error?F("同期失敗: "+f.error,"error"):(F(`${f.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),A()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const l=e.querySelector("#fax-file")?.files?.[0];if(!l){F("FAX画像を選択してください","warning");return}const p=a.integrations.find(m=>m.provider==="cloud_vision");if(!p||!p.config.api_key){F("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,A();try{const m=new FileReader;m.onload=async()=>{const f=String(m.result??""),{ocrFaxImage:x,saveFaxRecord:b,fetchFaxInbox:w}=await N(async()=>{const{ocrFaxImage:R,saveFaxRecord:B,fetchFaxInbox:M}=await Promise.resolve().then(()=>j);return{ocrFaxImage:R,saveFaxRecord:B,fetchFaxInbox:M}},void 0),P=await x(p,f),D=e.querySelector("#fax-sender-name")?.value??"",q=e.querySelector("#fax-sender-phone")?.value??"";await b({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:D,senderPhone:q,ocrStatus:P.error?"failed":"done",ocrText:P.text}),a.faxOcrText=P.error?`エラー: ${P.error}`:P.text,a.faxRecords=await w(),a.faxProcessing=!1,A()},m.readAsDataURL(l)}catch(m){F("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,A()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",A()}),e.querySelectorAll("[data-action='ms-edit']").forEach(s=>{s.addEventListener("click",()=>{a.mailSenderEditingId=s.dataset.id??null,A()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,A()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,l={id:s,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(x=>x.id===s)?.isVerified??!1};if(!l.name||!l.email){F("名前とメールアドレスは必須です","warning");return}const{saveMailSender:p,fetchMailSenders:m}=await N(async()=>{const{saveMailSender:x,fetchMailSenders:b}=await Promise.resolve().then(()=>j);return{saveMailSender:x,fetchMailSenders:b}},void 0);await p(l)?(a.mailSenders=await m(),a.mailSenderEditingId=null,F("保存しました"),A()):F("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=s.dataset.id??"",{deleteMailSender:p,fetchMailSenders:m}=await N(async()=>{const{deleteMailSender:x,fetchMailSenders:b}=await Promise.resolve().then(()=>j);return{deleteMailSender:x,fetchMailSenders:b}},void 0);await p(l)?(a.mailSenders=await m(),A()):F("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(s=>{s.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){F("データなし","error");return}const s=a.demandAnalysis,l=Object.entries(s.matrix).map(([m,f])=>{const x={productCode:m};return s.months.forEach(b=>{x[b]=f[b]??0}),x}),p=[{key:"productCode",label:"商品コード"},...s.months.map(m=>({key:m,label:m}))];Nn("demand-analysis.csv",l,p)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){F("データなし","error");return}const s=a.productionPlan.map(p=>({...p}));Nn("production-plan.csv",s,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Me("当月の全請求を締め切りますか？")&&F("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async s=>{const l=parseInt(s.target.value);a.brewingPlanFY=l;const{fetchBrewingPlanSummary:p,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:f,fetchBrewingProductDetail:x,fetchBrewingCustomCategories:b,fetchBrewingCategoryOverrides:w,fetchAllBrewingStockEntries:P}=await N(async()=>{const{fetchBrewingPlanSummary:z,fetchBrewingMonthlyTrend:V,fetchBrewingSchedule:U,fetchBrewingProductDetail:G,fetchBrewingCustomCategories:H,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:Z}=await Promise.resolve().then(()=>j);return{fetchBrewingPlanSummary:z,fetchBrewingMonthlyTrend:V,fetchBrewingSchedule:U,fetchBrewingProductDetail:G,fetchBrewingCustomCategories:H,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:Z}},void 0),[D,q,R,B,M,O,I]=await Promise.all([p(`${l}-10-01`,`${l+1}-09-30`),m(`${l}-10-01`,`${l+1}-09-30`),f(l),x(`${l}-10-01`,`${l+1}-09-30`),b(),w(),P()]);a.brewingPlanData=D,a.brewingMonthlyTrend=q,a.brewingSchedule=R,a.brewingProductDetail=B,a.brewingStockEntries=I,a.brewingCustomCategories=M,a.brewingOverrides=O,a.brewingExcludedProducts=new Set,A()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.code??"",p=s.dataset.parent??"";if(!l||!p)return;if(s.checked){a.brewingExcludedProducts.delete(l),A();return}a.brewingExcludedProducts.add(l);const m=a.brewingCustomCategories.filter(f=>f.parentCategory===p);if(m.length===1){const{setBrewingCategoryOverride:f,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:w}=await N(async()=>{const{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:V}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:V}},void 0);await f(l,m[0].name);const P=a.brewingPlanFY,{fetchBrewingYearlyShipments:D}=await N(async()=>{const{fetchBrewingYearlyShipments:O}=await Promise.resolve().then(()=>j);return{fetchBrewingYearlyShipments:O}},void 0),[q,R,B,M]=await Promise.all([x(`${P}-10-01`,`${P+1}-09-30`),b(`${P}-10-01`,`${P+1}-09-30`),w(),D()]);a.brewingPlanData=q,a.brewingProductDetail=R,a.brewingOverrides=B,a.brewingYearlyShipments=M,a.brewingExcludedProducts.delete(l)}A()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.code??"",p=s.dataset.cat??"";if(!l||!p)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:b,fetchBrewingYearlyShipments:w}=await N(async()=>{const{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:z,fetchBrewingYearlyShipments:V}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:z,fetchBrewingYearlyShipments:V}},void 0);await m(l,p);const P=a.brewingPlanFY,[D,q,R,B]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),x(`${P}-10-01`,`${P+1}-09-30`),b(),w()]);a.brewingPlanData=D,a.brewingProductDetail=q,a.brewingOverrides=R,a.brewingYearlyShipments=B,A()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.code??"";if(!l)return;const{setBrewingCategoryOverride:p,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:f,fetchBrewingCategoryOverrides:x,fetchBrewingYearlyShipments:b}=await N(async()=>{const{setBrewingCategoryOverride:B,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:I,fetchBrewingYearlyShipments:z}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:B,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:I,fetchBrewingYearlyShipments:z}},void 0);await p(l,null);const w=a.brewingPlanFY,[P,D,q,R]=await Promise.all([m(`${w}-10-01`,`${w+1}-09-30`),f(`${w}-10-01`,`${w+1}-09-30`),x(),b()]);a.brewingPlanData=P,a.brewingProductDetail=D,a.brewingOverrides=q,a.brewingYearlyShipments=R,A()})}),(()=>{const s=e.querySelector("#gantt-timeline");if(!s)return;const l=[9,10,11,12,1,2,3,4,5],p=l.length;let m=null,f=null;s.querySelectorAll(".gantt-bar").forEach(q=>{q.style.pointerEvents="auto"});function x(q){return"touches"in q?q.touches[0].clientX:q.clientX}function b(q){const R=q.target,B=R.closest(".gantt-bar");if(!B)return;const M=B.parentElement,O=B.dataset.cat??"",I=parseInt(B.dataset.month??"0"),z=parseInt(B.dataset.dur??"1"),V=parseInt(B.dataset.vol??"0"),U=M.offsetWidth/p;let G="move";R.classList.contains("gantt-resize-right")?G="resize-right":R.classList.contains("gantt-resize-left")&&(G="resize-left"),B.style.cursor=G==="move"?"grabbing":"ew-resize",B.style.opacity="0.8",B.style.zIndex="10",m={bar:B,mode:G,cat:O,origMonth:I,origDur:z,origVol:V,startX:x(q),cellW:U,origLeftPct:parseFloat(B.style.left),origWidthPct:parseFloat(B.style.width)},q.preventDefault()}function w(q){if(!m)return;const{bar:R,mode:B,origDur:M,startX:O,cellW:I,origLeftPct:z,origWidthPct:V}=m,U=x(q)-O,G=Math.round(U/I),H=Math.round(z/100*p);if(B==="move"){const Q=Math.max(0,Math.min(p-M,H+G));R.style.left=(Q/p*100).toFixed(2)+"%"}else if(B==="resize-right"){const Q=Math.max(1,Math.min(p-H,M+G));R.style.width=(Q/p*100).toFixed(2)+"%"}else if(B==="resize-left"){const Q=Math.max(0,Math.min(H+M-1,H+G)),Z=M-(Q-H);R.style.left=(Q/p*100).toFixed(2)+"%",R.style.width=(Z/p*100).toFixed(2)+"%"}}async function P(q){if(!m)return;const{bar:R,cat:B,origMonth:M,origDur:O,origVol:I}=m,z=Math.round(parseFloat(R.style.left)/100*p),V=Math.max(1,Math.round(parseFloat(R.style.width)/100*p)),U=l[Math.max(0,Math.min(p-1,z))];if(R.style.cursor="grab",R.style.opacity="1",R.style.zIndex="",m=null,U===M&&V===O)return;const{saveBrewingSchedule:G,fetchBrewingSchedule:H}=await N(async()=>{const{saveBrewingSchedule:Z,fetchBrewingSchedule:ee}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:Z,fetchBrewingSchedule:ee}},void 0),Q=a.brewingSchedule.filter(Z=>Z.brewCategory===B).map(Z=>Z.brewMonth===M?{brewMonth:U,durationMonths:V,plannedVolumeL:I}:{brewMonth:Z.brewMonth,durationMonths:Z.durationMonths,plannedVolumeL:Z.plannedVolumeL});await G(B,a.brewingPlanFY,Q),a.brewingSchedule=await H(a.brewingPlanFY),A()}s.addEventListener("mousedown",b),s.addEventListener("touchstart",b,{passive:!1}),document.addEventListener("mousemove",w),document.addEventListener("touchmove",w,{passive:!1}),document.addEventListener("mouseup",P),document.addEventListener("touchend",P);function D(q){const R=q.dataset.cat??"",B=parseInt(q.dataset.month??"0"),M=parseInt(q.dataset.vol??"0"),O=parseInt(q.dataset.max??"99999"),I=q.querySelector(".gantt-bar-label");if(!I||I.querySelector("input"))return;const z=document.createElement("input");z.type="number",z.min="0",z.max=String(O),z.step="100",z.value=String(M),z.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",I.textContent="",I.style.pointerEvents="auto",I.appendChild(z),z.focus(),z.select();const V=async()=>{const U=parseFloat(z.value)||0;if(I.style.pointerEvents="none",I.textContent=k(Math.round(U))+"L",Math.abs(U-M)<1)return;const{saveBrewingSchedule:G,fetchBrewingSchedule:H}=await N(async()=>{const{saveBrewingSchedule:Z,fetchBrewingSchedule:ee}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:Z,fetchBrewingSchedule:ee}},void 0),Q=a.brewingSchedule.filter(Z=>Z.brewCategory===R).map(Z=>({brewMonth:Z.brewMonth,durationMonths:Z.durationMonths,plannedVolumeL:Z.brewMonth===B?U:Z.plannedVolumeL}));await G(R,a.brewingPlanFY,Q),a.brewingSchedule=await H(a.brewingPlanFY),A()};z.addEventListener("blur",V),z.addEventListener("keydown",U=>{U.key==="Enter"&&z.blur()})}s.addEventListener("dblclick",q=>{const R=q.target.closest(".gantt-bar");R&&D(R)}),s.addEventListener("touchstart",q=>{const R=q.target.closest(".gantt-bar");if(R){if(f){clearTimeout(f),f=null,D(R);return}f=setTimeout(()=>{f=null},300)}},{passive:!0}),s.querySelectorAll(".gantt-bar-container").forEach(q=>{q.style.pointerEvents="auto";const R=async B=>{if(m)return;const M=q.dataset.cat??"",O=parseInt(q.dataset.max??"0"),I=q.getBoundingClientRect(),z=B-I.left,V=Math.floor(z/(I.width/p)),U=l[Math.max(0,Math.min(p-1,V))];if(a.brewingSchedule.some(ee=>ee.brewCategory===M&&ee.brewMonth===U))return;const G=Math.round(O*.3)||500,{saveBrewingSchedule:H,fetchBrewingSchedule:Q}=await N(async()=>{const{saveBrewingSchedule:ee,fetchBrewingSchedule:ne}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:ee,fetchBrewingSchedule:ne}},void 0),Z=[...a.brewingSchedule.filter(ee=>ee.brewCategory===M).map(ee=>({brewMonth:ee.brewMonth,durationMonths:ee.durationMonths,plannedVolumeL:ee.plannedVolumeL})),{brewMonth:U,durationMonths:2,plannedVolumeL:G}];await H(M,a.brewingPlanFY,Z),a.brewingSchedule=await Q(a.brewingPlanFY),A()};q.addEventListener("click",B=>{B.target.closest(".gantt-bar")||R(B.clientX)})})})();function k(s){return s.toLocaleString("ja-JP")}(()=>{const s=e.querySelector("#bp-gantt");if(!s)return;let l=null;function p(x){const b=x.target,w=b.closest(".bp-gantt-bar");if(!w)return;let P="move";b.classList.contains("bp-gantt-resize-right")?P="resize-right":b.classList.contains("bp-gantt-resize-left")&&(P="resize-left");const D="touches"in x?x.touches[0].clientX:x.clientX;w.style.opacity="0.7",w.style.zIndex="10",l={bar:w,mode:P,stepId:w.dataset.stepId??"",startX:D,origLeft:parseFloat(w.style.left),origWidth:parseFloat(w.style.width)},x.preventDefault()}function m(x){if(!l)return;const w=("touches"in x?x.touches[0].clientX:x.clientX)-l.startX;l.mode==="move"?l.bar.style.left=l.origLeft+w+"px":l.mode==="resize-right"?l.bar.style.width=Math.max(6,l.origWidth+w)+"px":(l.bar.style.left=l.origLeft+w+"px",l.bar.style.width=Math.max(6,l.origWidth-w)+"px")}async function f(){if(!l)return;const{bar:x,stepId:b,origLeft:w,origWidth:P}=l,D=parseFloat(x.style.left),q=parseFloat(x.style.width);x.style.opacity="1",x.style.zIndex="",l=null;const R=Math.round((D-w)/6),B=Math.round((q-P)/6);if(R===0&&B===0)return;const M=x.dataset.plannedStart??"",O=x.dataset.plannedEnd??"";if(!M||!O)return;const I=(J,X)=>{const se=new Date(J);return se.setDate(se.getDate()+X),se.toISOString().slice(0,10)};let z=M,V=O;R!==0&&B===0?(z=I(M,R),V=I(O,R)):B!==0&&R===0?V=I(O,B):(z=I(M,R),V=I(O,R+B));const U=x.dataset.batchId??"",G=parseInt(x.dataset.stepOrder??"0"),{updateBrewingProcessStep:H,fetchBrewingProcessSteps:Q}=await N(async()=>{const{updateBrewingProcessStep:J,fetchBrewingProcessSteps:X}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:J,fetchBrewingProcessSteps:X}},void 0),Z=a.brewingProcessSteps.filter(J=>J.batchId===U).sort((J,X)=>J.stepOrder-X.stepOrder);await H(b,{planned_start:z,planned_end:V});let ee=V;for(const J of Z){if(J.stepOrder<=G)continue;const X=Math.max(Math.round((new Date(J.plannedEnd).getTime()-new Date(J.plannedStart).getTime())/864e5),0),se=I(ee,1),ge=I(se,X);await H(J.id,{planned_start:se,planned_end:ge}),ee=ge}let ne=z;for(let J=Z.length-1;J>=0;J--){const X=Z[J];if(X.stepOrder>=G)continue;const se=Math.max(Math.round((new Date(X.plannedEnd).getTime()-new Date(X.plannedStart).getTime())/864e5),0),ge=I(ne,-1),de=I(ge,-se);await H(X.id,{planned_start:de,planned_end:ge}),ne=de}Z.map(J=>(J.stepOrder<G&&Math.round((new Date(J.plannedEnd).getTime()-new Date(J.plannedStart).getTime())/864e5),J));const{updateBrewingBatch:K}=await N(async()=>{const{updateBrewingBatch:J}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:J}},void 0);await K(U,{start_date:Z[0].stepOrder<G?I(z,-Z.filter(J=>J.stepOrder<G).reduce((J,X)=>J+Math.round((new Date(X.plannedEnd).getTime()-new Date(X.plannedStart).getTime())/864e5)+1,0)):G===1?z:void 0,target_end_date:ee}),a.brewingProcessSteps=await Q(a.brewingBatches.map(J=>J.id)),A()}s.addEventListener("mousedown",p),s.addEventListener("touchstart",p,{passive:!1}),document.addEventListener("mousemove",m),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("mouseup",f),document.addEventListener("touchend",f)})(),e.querySelector("[data-action='bp-auto-schedule']")?.addEventListener("click",async()=>{if(a.brewingBatches.length===0)return;const s=e.querySelector("[data-action='bp-auto-schedule']");s&&(s.textContent="計算中...",s.disabled=!0);const{autoScheduleAllBatches:l,fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{autoScheduleAllBatches:b,fetchBrewingBatches:w,fetchBrewingProcessSteps:P}=await Promise.resolve().then(()=>j);return{autoScheduleAllBatches:b,fetchBrewingBatches:w,fetchBrewingProcessSteps:P}},void 0),{fetchTanks:f}=await N(async()=>{const{fetchTanks:b}=await Promise.resolve().then(()=>j);return{fetchTanks:b}},void 0),x=await f().catch(()=>[]);await l(a.brewingBatches,a.bpWorkerSettings,a.bpStepLabor,x),a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(b=>b.id)):[],A()});for(const s of["bp-worker-count","bp-worker-hours","bp-worker-start"])e.querySelector(`[data-action='${s}']`)?.addEventListener("change",async l=>{const p=parseFloat(l.target.value)||0;s==="bp-worker-count"?a.bpWorkerSettings.workerCount=p:s==="bp-worker-hours"?a.bpWorkerSettings.weeklyHoursLimit=p:a.bpWorkerSettings.dayStartHour=p;const{saveWorkerSettings:m}=await N(async()=>{const{saveWorkerSettings:f}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:f}},void 0);await m(a.bpWorkerSettings),A()});e.querySelector("[data-action='bp-worker-deadline']")?.addEventListener("change",async s=>{a.bpWorkerSettings.deadlineDate=s.target.value;const{saveWorkerSettings:l}=await N(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:p}},void 0);await l(a.bpWorkerSettings),A()}),e.querySelector("[data-action='bp-worker-sunday']")?.addEventListener("change",async s=>{a.bpWorkerSettings.allowSunday=s.target.checked;const{saveWorkerSettings:l}=await N(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:p}},void 0);await l(a.bpWorkerSettings),A()}),e.querySelector("[data-action='bp-tank-add']")?.addEventListener("click",async()=>{const s=e.querySelector("#bp-tank-no")?.value?.trim()??"",l=parseFloat(e.querySelector("#bp-tank-cap")?.value??"0"),p=e.querySelector("#bp-tank-cats")?.value?.trim()??"";if(!s||l<=0)return;const m=p?p.split(/[,、]/).map(b=>b.trim()).filter(Boolean):[],{addTank:f,fetchTanks:x}=await N(async()=>{const{addTank:b,fetchTanks:w}=await Promise.resolve().then(()=>j);return{addTank:b,fetchTanks:w}},void 0);await f(s,l,"",m),a.bpTanks=await x(),A()}),e.querySelectorAll("[data-action='bp-tank-delete']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.tankId??"";if(!l)return;const{deleteTank:p,fetchTanks:m}=await N(async()=>{const{deleteTank:f,fetchTanks:x}=await Promise.resolve().then(()=>j);return{deleteTank:f,fetchTanks:x}},void 0);await p(l),a.bpTanks=await m(),A()})}),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const s=e.querySelectorAll("[data-action='bp-import-check']:checked");if(s.length===0)return;const{createBrewingBatch:l,fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{createBrewingBatch:f,fetchBrewingBatches:x,fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>j);return{createBrewingBatch:f,fetchBrewingBatches:x,fetchBrewingProcessSteps:b}},void 0);for(const f of s){const x=f.dataset.cat??"",b=f.dataset.code??"",w=parseFloat(f.dataset.vol??"0"),P=f.dataset.date??"";!x||!b||!P||await l(x,b,a.brewingPlanFY,w,P,a.brewingProcessSteps,a.brewingRiceParams)}a.brewingBatches=await p(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await m(a.brewingBatches.map(f=>f.id))),A()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,A()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const s=e.querySelector("#bp-new-cat")?.value??"",l=e.querySelector("#bp-new-code")?.value?.trim()??"",p=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!s||!l||!m)return;const{createBrewingBatch:f,fetchBrewingBatches:x,fetchBrewingProcessSteps:b}=await N(async()=>{const{createBrewingBatch:w,fetchBrewingBatches:P,fetchBrewingProcessSteps:D}=await Promise.resolve().then(()=>j);return{createBrewingBatch:w,fetchBrewingBatches:P,fetchBrewingProcessSteps:D}},void 0);await f(s,l,a.brewingPlanFY,p,m,a.brewingProcessSteps,a.brewingRiceParams),a.brewingBatches=await x(a.brewingPlanFY),a.brewingProcessSteps=await b(a.brewingBatches.map(w=>w.id)),a.bpShowNewForm=!1,A()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===l?"":l,A()})}),e.querySelectorAll("[data-action='bp-batch-check']").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.batchId??"";l&&(s.checked?a.bpSelectedBatchIds.includes(l)||(a.bpSelectedBatchIds=[...a.bpSelectedBatchIds,l]):a.bpSelectedBatchIds=a.bpSelectedBatchIds.filter(p=>p!==l),A())})}),e.querySelector("[data-action='bp-batch-check-all']")?.addEventListener("change",s=>{const l=s.target.checked;a.bpSelectedBatchIds=l?a.brewingBatches.map(p=>p.id):[],A()}),e.querySelector("[data-action='bp-bulk-delete']")?.addEventListener("click",async()=>{const s=a.bpSelectedBatchIds;if(s.length===0)return;const l=s.map(x=>a.brewingBatches.find(b=>b.id===x)?.batchCode??x).join("、");if(!window.confirm(`以下の仕込 ${s.length}件を削除します。
${l}

関連する全工程データも削除されます。この操作は取り消せません。`))return;const{supabaseDelete:p}=await N(async()=>{const{supabaseDelete:x}=await Promise.resolve().then(()=>te);return{supabaseDelete:x}},void 0);await Promise.all(s.map(x=>p("brewing_process_batches",x)));const{fetchBrewingBatches:m,fetchBrewingProcessSteps:f}=await N(async()=>{const{fetchBrewingBatches:x,fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>j);return{fetchBrewingBatches:x,fetchBrewingProcessSteps:b}},void 0);a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await f(a.brewingBatches.map(x=>x.id)):[],a.bpSelectedBatchIds=[],a.bpExpandedBatchId="",A()}),e.querySelectorAll("[data-action='bp-step-status']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:x}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:x}},void 0),m={status:s.value};s.value==="進行中"&&!s.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),s.value==="完了"&&!s.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await p(l,m);const{fetchBrewingProcessSteps:f}=await N(async()=>{const{fetchBrewingProcessSteps:x}=await Promise.resolve().then(()=>j);return{fetchBrewingProcessSteps:x}},void 0);a.brewingProcessSteps=await f(a.brewingBatches.map(x=>x.id)),A()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:m}},void 0);await p(l,{temperature:parseFloat(s.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await N(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:m}},void 0);await p(l,{notes:s.value})})});let C="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(s=>{s.addEventListener("click",()=>{C=s.dataset.batchId??"";const l=e.querySelector("#bp-delete-modal"),p=e.querySelector("#bp-delete-batch-name");l&&(l.style.display="flex"),p&&(p.textContent=s.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none"),C=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!C)return;const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none");const{supabaseDelete:l}=await N(async()=>{const{supabaseDelete:f}=await Promise.resolve().then(()=>te);return{supabaseDelete:f}},void 0);await l("brewing_process_batches",C);const{fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await N(async()=>{const{fetchBrewingBatches:f,fetchBrewingProcessSteps:x}=await Promise.resolve().then(()=>j);return{fetchBrewingBatches:f,fetchBrewingProcessSteps:x}},void 0);a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(f=>f.id)):[],a.bpExpandedBatchId="",a.bpSelectedBatchIds=a.bpSelectedBatchIds.filter(f=>f!==C),C="",A()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",s=>{s.target===s.currentTarget&&(s.currentTarget.style.display="none",C="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p}=await N(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:m}},void 0);await p(l,{planned_volume_l:parseFloat(s.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p}=await N(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:m}},void 0);await p(l,{start_date:s.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p,fetchBrewingBatches:m,fetchBrewingProcessSteps:f}=await N(async()=>{const{updateBrewingBatch:x,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:x,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}},void 0);await p(l,{status:s.value}),a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await f(a.brewingBatches.map(x=>x.id)):[],A()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.cat??"",p=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${l}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${l}']`),f=parseInt(p?.value??"0"),x=parseFloat(m?.value??"0");if(!l||!f||x<=0)return;const w=[...a.brewingSchedule.filter(q=>q.brewCategory===l).map(q=>({brewMonth:q.brewMonth,durationMonths:q.durationMonths,plannedVolumeL:q.plannedVolumeL})),{brewMonth:f,durationMonths:2,plannedVolumeL:x}],{saveBrewingSchedule:P,fetchBrewingSchedule:D}=await N(async()=>{const{saveBrewingSchedule:q,fetchBrewingSchedule:R}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:q,fetchBrewingSchedule:R}},void 0);await P(l,a.brewingPlanFY,w),a.brewingSchedule=await D(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.cat??"",p=parseInt(s.dataset.month??"0");if(!l||!p)return;const m=a.brewingSchedule.filter(b=>b.brewCategory===l&&b.brewMonth!==p).map(b=>({brewMonth:b.brewMonth,durationMonths:b.durationMonths,plannedVolumeL:b.plannedVolumeL})),{saveBrewingSchedule:f,fetchBrewingSchedule:x}=await N(async()=>{const{saveBrewingSchedule:b,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:b,fetchBrewingSchedule:w}},void 0);await f(l,a.brewingPlanFY,m),a.brewingSchedule=await x(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.cat??"",p=parseInt(s.dataset.month??"0");if(!l||!p)return;const m=a.brewingSchedule.filter(b=>b.brewCategory===l&&b.brewMonth!==p).map(b=>({brewMonth:b.brewMonth,durationMonths:b.durationMonths,plannedVolumeL:b.plannedVolumeL})),{saveBrewingSchedule:f,fetchBrewingSchedule:x}=await N(async()=>{const{saveBrewingSchedule:b,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:b,fetchBrewingSchedule:w}},void 0);await f(l,a.brewingPlanFY,m),a.brewingSchedule=await x(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.cat??"",p=parseInt(s.dataset.month??"0"),m=parseFloat(s.value)||0;if(!l||!p)return;const f=a.brewingSchedule.filter(w=>w.brewCategory===l).map(w=>({brewMonth:w.brewMonth,durationMonths:w.durationMonths,plannedVolumeL:w.brewMonth===p?m:w.plannedVolumeL})),{saveBrewingSchedule:x,fetchBrewingSchedule:b}=await N(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:P}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:w,fetchBrewingSchedule:P}},void 0);await x(l,a.brewingPlanFY,f),a.brewingSchedule=await b(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.cat??"",p=parseFloat(s.value)||0;if(!l)return;const{saveProcurementDecision:m}=await N(async()=>{const{saveProcurementDecision:f}=await Promise.resolve().then(()=>j);return{saveProcurementDecision:f}},void 0);await m(l,a.brewingPlanFY,p),a.procurementDecisions[l]=p,A()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const s=(e.querySelector("#proc-commit-variety")?.value??"").trim(),l=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),p=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,f=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!s||l<=0)return;const{saveRicePurchaseCommitment:x,fetchRicePurchaseCommitments:b}=await N(async()=>{const{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:P}=await Promise.resolve().then(()=>j);return{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:P}},void 0);await x({varietyName:s,committedBales:l,pricePerKg:p,deliveryMonth:m,supplier:f,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await b(a.brewingPlanFY),A()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-variety-name"),l=e.querySelector("#proc-variety-price"),p=s?.value.trim()??"",m=parseFloat(l?.value??"400")||400;if(!p)return;const{addRiceVariety:f,fetchRiceVarieties:x}=await N(async()=>{const{addRiceVariety:w,fetchRiceVarieties:P}=await Promise.resolve().then(()=>j);return{addRiceVariety:w,fetchRiceVarieties:P}},void 0);await f(p,m)&&(a.riceVarieties=await x(),s&&(s.value=""),l&&(l.value=""),F(`「${p}」を追加しました`)),A()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??"",{deleteRiceVariety:p,fetchRiceVarieties:m}=await N(async()=>{const{deleteRiceVariety:x,fetchRiceVarieties:b}=await Promise.resolve().then(()=>j);return{deleteRiceVariety:x,fetchRiceVarieties:b}},void 0);await p(l)&&(a.riceVarieties=await m()),A()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.cat??"",p=s.dataset.field??"",m=s.value;if(!l||!p)return;const f=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};f[p]=m;const x=a.riceVarieties.find(w=>w.name===m);x&&(p==="kojiVariety"&&(f.kojiPricePerKg=x.defaultPricePerKg),p==="kakeVariety"&&(f.kakePricePerKg=x.defaultPricePerKg)),a.brewingRiceParams[l]=f;const{saveBrewingRiceParams:b}=await N(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:w}},void 0);await b(l,f),A()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-new-cat-name"),l=e.querySelector("#proc-new-cat-vol"),p=s?.value.trim()??"",m=parseFloat(l?.value??"0");if(!p){F("区分名を入力してください","warning");return}if(m<=0){F("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:f,fetchBrewingSchedule:x}=await N(async()=>{const{saveBrewingSchedule:b,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:b,fetchBrewingSchedule:w}},void 0);await f(p,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await x(a.brewingPlanFY),s&&(s.value=""),l&&(l.value=""),F(`「${p}」を追加しました`),A()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const s=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),l=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(s)||isNaN(l))return;const{saveBrewingRiceParams:p}=await N(async()=>{const{saveBrewingRiceParams:x}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:x}},void 0),m=Object.keys(a.brewingRiceParams),f=new Set([...m,...a.brewingYearlyShipments.map(x=>x.brewCategory)]);for(const x of f){const b=a.brewingRiceParams[x]??{brewCategory:x,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};b.ricePerLiterKg=s,b.kojiRatio=l,a.brewingRiceParams[x]=b,await p(x,b)}A()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.cat??"",p=s.dataset.field??"",m=parseFloat(s.value);if(!l||!p||isNaN(m))return;const f=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};f[p]=m,a.brewingRiceParams[l]=f;const{saveBrewingRiceParams:x}=await N(async()=>{const{saveBrewingRiceParams:b}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:b}},void 0);await x(l,f),A()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.cat??"",p=parseFloat(s.value);if(!l)return;const{saveBrewingForecastOverride:m}=await N(async()=>{const{saveBrewingForecastOverride:f}=await Promise.resolve().then(()=>j);return{saveBrewingForecastOverride:f}},void 0);if(isNaN(p))await m(l,null),delete a.brewingForecastOverrides[l];else{const f=p/100;await m(l,f),a.brewingForecastOverrides[l]=f}A()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.cat??"",p="bc-"+encodeURIComponent(l).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${p}`),f=e.querySelector(`#alc-target-${p}`),x=parseFloat(m?.value??"18")||18,b=parseFloat(f?.value??"15")||15,{saveBrewingAlcoholSetting:w}=await N(async()=>{const{saveBrewingAlcoholSetting:D}=await Promise.resolve().then(()=>j);return{saveBrewingAlcoholSetting:D}},void 0);await w(l,x,b)&&(a.brewingAlcoholSettings[l]={brewCategory:l,rawAlcoholPct:x,targetAlcoholPct:b}),A()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.code??"",p=s.value,m=s.dataset.current??"";if(p===m)return;const{setBrewingCategoryOverride:f,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:w}=await N(async()=>{const{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:q,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:B}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:q,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:B}},void 0);if(await f(l,p)){const D=a.brewingPlanFY,[q,R,B]=await Promise.all([x(`${D}-10-01`,`${D+1}-09-30`),b(`${D}-10-01`,`${D+1}-09-30`),w()]);a.brewingPlanData=q,a.brewingProductDetail=R,a.brewingOverrides=B}A()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.cat??"",p=s.value;if(!l||!p)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:b,fetchCategoryTypeLinks:w}=await N(async()=>{const{linkTypeToCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:z,fetchCategoryTypeLinks:V}=await Promise.resolve().then(()=>j);return{linkTypeToCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:z,fetchCategoryTypeLinks:V}},void 0);await m(l,p);const P=a.brewingPlanFY,[D,q,R,B]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),x(`${P}-10-01`,`${P+1}-09-30`),b(),w()]);a.brewingPlanData=D,a.brewingProductDetail=q,a.brewingOverrides=R,a.brewingTypeLinks=B,A()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.cat??"",p=s.dataset.type??"";if(!l||!p)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:b,fetchCategoryTypeLinks:w}=await N(async()=>{const{unlinkTypeFromCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:z,fetchCategoryTypeLinks:V}=await Promise.resolve().then(()=>j);return{unlinkTypeFromCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:z,fetchCategoryTypeLinks:V}},void 0);await m(l,p);const P=a.brewingPlanFY,[D,q,R,B]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),x(`${P}-10-01`,`${P+1}-09-30`),b(),w()]);a.brewingPlanData=D,a.brewingProductDetail=q,a.brewingOverrides=R,a.brewingTypeLinks=B,A()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const s=e.querySelector("#brew-new-category-name"),l=e.querySelector("#brew-new-category-parent"),p=s?.value.trim()??"",m=l?.value??"";if(!p)return;if(!m){F("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map(w=>w.name)].includes(p)){F("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:x}=await N(async()=>{const{addBrewingCustomCategory:w}=await Promise.resolve().then(()=>j);return{addBrewingCustomCategory:w}},void 0);await x(p,m)?(a.brewingCustomCategories.push({name:p,parentCategory:m}),s&&(s.value=""),F(`「${p}」を追加しました（${m}系）`)):F("追加に失敗しました","error"),A()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.cat??"";if(!l)return;const{deleteBrewingCustomCategory:p,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:f}=await N(async()=>{const{deleteBrewingCustomCategory:b,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:P}=await Promise.resolve().then(()=>j);return{deleteBrewingCustomCategory:b,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:P}},void 0);if(await p(l)){a.brewingCustomCategories=a.brewingCustomCategories.filter(D=>D.name!==l);for(const[D,q]of Object.entries(a.brewingOverrides))q===l&&delete a.brewingOverrides[D];const b=a.brewingPlanFY,[w,P]=await Promise.all([m(`${b}-10-01`,`${b+1}-09-30`),f(`${b}-10-01`,`${b+1}-09-30`)]);a.brewingPlanData=w,a.brewingProductDetail=P,F(`「${l}」を削除しました`)}A()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.cat??"",p=s.dataset.catId??"",f=e.querySelector(`#new-entry-target-${p}`)?.value??l,x=e.querySelector(`#new-entry-label-${p}`),b=e.querySelector(`#new-entry-vol-${p}`),w=x?.value.trim()??"",P=parseFloat(b?.value??"0");if(P<=0)return;const{addBrewingStockEntry:D,fetchBrewingPlanSummary:q,fetchAllBrewingStockEntries:R}=await N(async()=>{const{addBrewingStockEntry:M,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:I}=await Promise.resolve().then(()=>j);return{addBrewingStockEntry:M,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:I}},void 0);if(await D(f,w||`タンク${a.brewingStockEntries.filter(M=>M.brewCategory===f).length+1}`,P)){const M=a.brewingPlanFY,[O,I]=await Promise.all([q(`${M}-10-01`,`${M+1}-09-30`),R()]);a.brewingPlanData=O,a.brewingStockEntries=I}A(),requestAnimationFrame(()=>{const M=document.getElementById(`stock-display-${p}`),O=document.getElementById(`stock-edit-${p}`),I=document.querySelector(`.btn-edit-stock[data-cat-id="${p}"]`);M&&(M.style.display="none"),O&&(O.style.display=""),I&&(I.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.id??"",p=s.value;if(!l||!p)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:f,fetchAllBrewingStockEntries:x}=await N(async()=>{const{reassignBrewingStockEntry:w,fetchBrewingPlanSummary:P,fetchAllBrewingStockEntries:D}=await Promise.resolve().then(()=>j);return{reassignBrewingStockEntry:w,fetchBrewingPlanSummary:P,fetchAllBrewingStockEntries:D}},void 0);if(await m(l,p)){const w=a.brewingPlanFY,[P,D]=await Promise.all([f(`${w}-10-01`,`${w+1}-09-30`),x()]);a.brewingPlanData=P,a.brewingStockEntries=D}A(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach(w=>{const P=document.getElementById(`stock-display-${w.dataset.catId}`),D=document.getElementById(`stock-edit-${w.dataset.catId}`);D&&D.querySelector(`[data-id="${l}"]`)&&(P&&(P.style.display="none"),D.style.display="",w.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??"",p=s.dataset.cat??"",m="bc-"+encodeURIComponent(p).replace(/%/g,"-"),{deleteBrewingStockEntry:f,fetchBrewingPlanSummary:x,fetchAllBrewingStockEntries:b}=await N(async()=>{const{deleteBrewingStockEntry:P,fetchBrewingPlanSummary:D,fetchAllBrewingStockEntries:q}=await Promise.resolve().then(()=>j);return{deleteBrewingStockEntry:P,fetchBrewingPlanSummary:D,fetchAllBrewingStockEntries:q}},void 0);if(await f(l)){const P=a.brewingPlanFY,[D,q]=await Promise.all([x(`${P}-10-01`,`${P+1}-09-30`),b()]);a.brewingPlanData=D,a.brewingStockEntries=q}A(),requestAnimationFrame(()=>{const P=document.getElementById(`stock-display-${m}`),D=document.getElementById(`stock-edit-${m}`),q=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);P&&(P.style.display="none"),D&&(D.style.display=""),q&&(q.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.catId??"",p=e.querySelector(`#stock-display-${l}`),m=e.querySelector(`#stock-edit-${l}`);p&&(p.style.display="none"),m&&(m.style.display=""),s.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.catId??"",p=e.querySelector(`#stock-display-${l}`),m=e.querySelector(`#stock-edit-${l}`),f=e.querySelector(`.btn-edit-stock[data-cat-id="${l}"]`);p&&(p.style.display=""),m&&(m.style.display="none"),f&&(f.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.catId??"",p=e.querySelector(`#schedule-rows-${l}`);if(!p)return;const m=p.querySelectorAll(".schedule-edit-row").length,f=document.createElement("div");f.innerHTML=buildScheduleEditRowHTML(l,m,9,2,0,"");const x=f.firstElementChild;p.appendChild(x),x.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>x.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(s=>{s.addEventListener("click",()=>s.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.cat??"",p=s.dataset.catId??"",m=e.querySelector(`#stock-input-${p}`),f=parseFloat(m?.value??"");if(isNaN(f)||f<0){alert("有効な数値を入力してください");return}s.textContent="保存中...",s.setAttribute("disabled","true");try{const{upsertBrewingStock:x,fetchBrewingPlanSummary:b,fetchBrewingMonthlyTrend:w}=await N(async()=>{const{upsertBrewingStock:R,fetchBrewingPlanSummary:B,fetchBrewingMonthlyTrend:M}=await Promise.resolve().then(()=>j);return{upsertBrewingStock:R,fetchBrewingPlanSummary:B,fetchBrewingMonthlyTrend:M}},void 0),P=a.brewingPlanFY;await x(l,f,0);const[D,q]=await Promise.all([b(`${P}-10-01`,`${P+1}-09-30`),w(`${P}-10-01`,`${P+1}-09-30`)]);a.brewingPlanData=D,a.brewingMonthlyTrend=q,A()}catch(x){console.error("[brewing save]",x),alert(`保存エラー: ${String(x)}`),s.textContent="保存",s.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.toggleCat??"",p=`sub-row-${"bc-"+encodeURIComponent(l).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${p}`),f=s.querySelector(".toggle-icon"),x=m[0]?.style.display!=="none";m.forEach(b=>{b.style.display=x?"none":""}),f&&(f.innerHTML=x?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{F("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{F("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(s=>{s.addEventListener("click",()=>{F("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{F("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(s=>{s.addEventListener("click",async()=>{await Me("この買掛を入金済みにしますか？")&&F("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(s=>{s.addEventListener("click",()=>{F("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{F("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelector("[data-action='kentei-show-form']")?.addEventListener("click",()=>{a.kenteiShowForm=!0,a.kenteiEditRecord=void 0,A()}),e.querySelector("[data-action='kentei-cancel']")?.addEventListener("click",()=>{a.kenteiShowForm=!1,a.kenteiEditRecord=void 0,A()}),e.querySelectorAll("[data-action='kentei-edit']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.id??"";a.kenteiEditRecord=a.kenteiList.find(p=>p.id===l),a.kenteiShowForm=!0,A()})}),e.querySelector("[data-action='kentei-save']")?.addEventListener("click",async()=>{const s=e.querySelector("#kentei-edit-id")?.value??"",{saveKenteiRecord:l,fetchKenteiList:p}=await N(async()=>{const{saveKenteiRecord:m,fetchKenteiList:f}=await Promise.resolve().then(()=>j);return{saveKenteiRecord:m,fetchKenteiList:f}},void 0);await l({id:s||void 0,kenteiNo:"",batchCode:e.querySelector("#kf-batch")?.value??"",productName:e.querySelector("#kf-name")?.value??"",kenteiDate:e.querySelector("#kf-date")?.value??"",productionTypeName:e.querySelector("#kf-type")?.value??"",alcoholDegree:parseFloat(e.querySelector("#kf-alc")?.value)||0,sakaMeterValue:parseFloat(e.querySelector("#kf-sake")?.value)||0,acidity:parseFloat(e.querySelector("#kf-acid")?.value)||0,aminoAcid:parseFloat(e.querySelector("#kf-amino")?.value)||0,riceType:e.querySelector("#kf-rice")?.value??"",polishRate:parseFloat(e.querySelector("#kf-polish")?.value)||0,volume:parseFloat(e.querySelector("#kf-vol")?.value)||0,taxCategory:"",tankNo:""}),a.kenteiList=await p(),a.kenteiShowForm=!1,a.kenteiEditRecord=void 0,F("保存しました"),A()}),e.querySelectorAll("[data-action='kentei-register']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??"",p=a.kenteiList.find(w=>w.id===l);if(!p)return;const{registerGenzaishu:m,fetchGenzaishu:f,fetchKenteiList:x}=await N(async()=>{const{registerGenzaishu:w,fetchGenzaishu:P,fetchKenteiList:D}=await Promise.resolve().then(()=>j);return{registerGenzaishu:w,fetchGenzaishu:P,fetchKenteiList:D}},void 0);await m({batchCode:p.batchCode,productName:p.productName,kenteiDate:p.kenteiDate,tankNo:p.tankNo,volumeL:p.volume,alcoholDegree:p.alcoholDegree||null,sakeMeterValue:p.sakaMeterValue||null,acidity:p.acidity||null,aminoAcid:p.aminoAcid||null,riceType:p.riceType,polishRate:p.polishRate||null,productionTypeName:p.productionTypeName,notes:""});const{supabaseUpdate:b}=await N(async()=>{const{supabaseUpdate:w}=await Promise.resolve().then(()=>te);return{supabaseUpdate:w}},void 0);await b("kentei_records",l,{status:"approved"}),a.kenteiList=await x(),a.genzaishuList=await f(),F("現在酒に登録しました"),A()})}),e.querySelector("#tm-product")?.addEventListener("change",s=>{const p=s.target.selectedOptions[0];if(p?.dataset.batch){const m=e.querySelector("#tm-batch"),f=e.querySelector("#tm-alc");m&&(m.value=p.dataset.batch),f&&p.dataset.alc&&(f.value=p.dataset.alc)}}),e.querySelector("[data-action='tm-add']")?.addEventListener("click",async()=>{const s=e.querySelector("#tm-date")?.value??"",l=e.querySelector("#tm-type")?.value??"transfer",p=e.querySelector("#tm-from")?.value??"",m=e.querySelector("#tm-to")?.value??"",f=parseFloat(e.querySelector("#tm-vol")?.value??"0");if(!s||f<=0){F("日付と数量を入力してください","warning");return}if(!p&&!m){F("移動元か移動先を選択してください","warning");return}const{saveTankMovement:x,fetchTankMovements:b}=await N(async()=>{const{saveTankMovement:w,fetchTankMovements:P}=await Promise.resolve().then(()=>j);return{saveTankMovement:w,fetchTankMovements:P}},void 0);await x({movementDate:s,fromTankNo:p,toTankNo:m,volumeL:f,productName:e.querySelector("#tm-product")?.value??"",batchCode:e.querySelector("#tm-batch")?.value??"",alcoholDegree:parseFloat(e.querySelector("#tm-alc")?.value)||null,temperature:parseFloat(e.querySelector("#tm-temp")?.value)||null,movementType:l,recordedBy:a.myProfile?.name??"",notes:e.querySelector("#tm-notes")?.value??""}),a.tankMovements=await b(),F("記録しました"),A()}),e.querySelectorAll("[data-action='tm-delete']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.id??"";if(!l||!confirm("この記録を削除しますか？"))return;const{deleteTankMovement:p,fetchTankMovements:m}=await N(async()=>{const{deleteTankMovement:f,fetchTankMovements:x}=await Promise.resolve().then(()=>j);return{deleteTankMovement:f,fetchTankMovements:x}},void 0);await p(l),a.tankMovements=await m(),A()})}),e.querySelector("[data-action='tm-filter-tank']")?.addEventListener("change",s=>{a.tankMovementFilter=s.target.value,A()}),e.querySelector("[data-action='tm-print']")?.addEventListener("click",()=>{const s=e.querySelector("#tm-table");if(!s)return;const l=window.open("","_blank");l&&(l.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
      <title>移動簿</title><style>
        body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:10px; padding:10mm; }
        table { width:100%; border-collapse:collapse; } th, td { border:1px solid #ccc; padding:3px 5px; }
        th { background:#f0f0f0; } button { display:none; }
        @media print { body { padding:5mm; } }
      </style></head><body><h1 style="font-size:14px;margin-bottom:8px;">移動簿${a.tankMovementFilter?` — ${a.tankMovementFilter}`:""}</h1>${s.innerHTML}</body></html>`),l.document.close(),setTimeout(()=>l.print(),300))}),e.querySelector("[data-action='tank-show-add']")?.addEventListener("click",()=>{const s=e.querySelector("#tank-form-area");s&&(s.innerHTML=oo(),E())}),e.querySelectorAll("[data-action='tank-edit']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.tankId??"",p=a.tankList.find(f=>f.id===l);if(!p)return;const m=e.querySelector("#tank-form-area");m&&(m.innerHTML=oo(p),E())})}),e.querySelectorAll("[data-action='tank-delete']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.tankId??"";if(!l||!confirm("このタンクを削除しますか？"))return;const{deleteTankById:p,fetchTankList:m}=await N(async()=>{const{deleteTankById:f,fetchTankList:x}=await Promise.resolve().then(()=>j);return{deleteTankById:f,fetchTankList:x}},void 0);await p(l),a.tankList=await m(),A()})});function E(){const s=e.querySelector("#tank-f-depth"),l=e.querySelector("#tank-f-cap"),p=e.querySelector("#tank-f-lpmm"),m=()=>{const f=parseFloat(s?.value??"0"),x=parseFloat(l?.value??"0");f>0&&x>0&&p&&(p.value=(x/f).toFixed(2))};s?.addEventListener("input",m),l?.addEventListener("input",m),e.querySelector("[data-action='tank-save']")?.addEventListener("click",async()=>{const f=e.querySelector("#tank-edit-id")?.value??"",x=e.querySelector("#tank-f-no")?.value?.trim()??"";if(!x){F("容器番号を入力してください","warning");return}const{saveTank:b,fetchTankList:w}=await N(async()=>{const{saveTank:P,fetchTankList:D}=await Promise.resolve().then(()=>j);return{saveTank:P,fetchTankList:D}},void 0);await b({id:f||void 0,tankNo:x,displayName:e.querySelector("#tank-f-name")?.value?.trim()??x,depthMm:parseFloat(e.querySelector("#tank-f-depth")?.value??"0"),capacity:parseFloat(e.querySelector("#tank-f-cap")?.value??"0"),litersPerMm:parseFloat(e.querySelector("#tank-f-lpmm")?.value??"0"),remarks:e.querySelector("#tank-f-remarks")?.value??""}),a.tankList=await w(),F(f?"更新しました":"登録しました"),A()}),e.querySelector("[data-action='tank-cancel']")?.addEventListener("click",()=>{const f=e.querySelector("#tank-form-area");f&&(f.innerHTML="")})}e.querySelector("#tank-f-no")&&E(),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{F("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(s=>{s.addEventListener("click",()=>{const l=s.closest("tr")?.querySelector("td")?.textContent??"";F(`注文 ${l} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{F("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(s=>{s.addEventListener("click",()=>{F("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{F("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.customer??"";F(`得意先 ${l} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{F("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!s||!await Me("このリストを削除しますか？"))return;const{supabaseDelete:p}=await N(async()=>{const{supabaseDelete:f}=await Promise.resolve().then(()=>te);return{supabaseDelete:f}},void 0);if(await p("lead_lists",s)){const{fetchLeadLists:f}=await N(async()=>{const{fetchLeadLists:x}=await Promise.resolve().then(()=>j);return{fetchLeadLists:x}},void 0);a.leadLists=await f(),F("削除しました","success"),A()}else F("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{F("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.scYm;if(!l)return;a.shipmentCalendarYearMonth=l,a.shipmentCalendarData=null,a.shipmentCalendarPrevYearData=null,a.shipmentCalendarSelectedDate=null,A();const{fetchShipmentCalendar:p}=await N(async()=>{const{fetchShipmentCalendar:P}=await Promise.resolve().then(()=>j);return{fetchShipmentCalendar:P}},void 0),[m,f]=l.split("-").map(Number),x=`${m-1}-${String(f).padStart(2,"0")}`,[b,w]=await Promise.all([p(l),p(x)]);a.shipmentCalendarData=b,a.shipmentCalendarPrevYearData=w,A()})}),e.querySelectorAll("[data-sc-date]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.scDate;l!==void 0&&(a.shipmentCalendarSelectedDate=l?a.shipmentCalendarSelectedDate===l?null:l:null,A())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(s=>{s.addEventListener("click",async()=>{a.calendarYearMonth=s.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:l}=await N(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await l(a.calendarYearMonth),A()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async s=>{a.calendarYearMonth=s.target.value;const{fetchCalendarEvents:l}=await N(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await l(a.calendarYearMonth),A()}),e.querySelector("#cal-filter-category")?.addEventListener("change",s=>{a.calendarFilterCategory=s.target.value,A()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const s=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(s.getTime()+3600*1e3).toISOString(),isAllDay:!1}},A()}),e.querySelectorAll("[data-cal-date]").forEach(s=>{s.tagName!=="BUTTON"&&s.addEventListener("click",l=>{if(l.target.closest(".cal-event"))return;const p=s.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${p}T10:00:00`,isAllDay:!1}},A()})}),e.querySelectorAll("[data-cal-event-id]").forEach(s=>{s.addEventListener("click",l=>{l.stopPropagation();const p=s.dataset.calEventId,m=a.calendarEvents.find(f=>f.id===p);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},A())})}),e.querySelectorAll("[data-action='cal-close']").forEach(s=>{s.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.calendarEdit=null,A())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:s,fetchCalendarEvents:l,CALENDAR_CATEGORY_COLORS:p}=await N(async()=>{const{saveCalendarEvent:w,fetchCalendarEvents:P,CALENDAR_CATEGORY_COLORS:D}=await Promise.resolve().then(()=>j);return{saveCalendarEvent:w,fetchCalendarEvents:P,CALENDAR_CATEGORY_COLORS:D}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,f=e.querySelector("#cal-category")?.value??"general",x={id:m,title:e.querySelector("#cal-title")?.value??"",category:f,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:p[f]};if(!x.title){F("タイトルは必須です","warning");return}await s(x)?(a.calendarEvents=await l(a.calendarYearMonth),a.calendarEdit=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!s||!await Me("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:l,fetchCalendarEvents:p}=await N(async()=>{const{deleteCalendarEvent:f,fetchCalendarEvents:x}=await Promise.resolve().then(()=>j);return{deleteCalendarEvent:f,fetchCalendarEvents:x}},void 0);await l(s)?(a.calendarEvents=await p(a.calendarYearMonth),a.calendarEdit=null,F("削除しました"),A()):F("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,A();try{const s=a.importPreview.rows.filter(p=>p._valid),l=await Nr(a.importEntity,s);a.importResult=`取り込み完了: ${l.inserted}件成功 / ${l.failed}件失敗`,a.importPreview=null}catch(s){a.importResult=`エラー: ${s instanceof Error?s.message:String(s)}`}finally{a.importing=!1,A()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const s=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=s,a.storeSales=[],a.actionLoading=!0,A(),Gn(s).then(l=>{a.storeSales=l,a.actionLoading=!1,A()})}),e.querySelectorAll("[data-action='copy-config']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.configValue??"";if(l)try{await navigator.clipboard.writeText(l),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(p){console.warn("Clipboard copy failed",p)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const l=JSON.stringify({supabase_url:$e,supabase_anon_key:ie,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),p=new Blob([l],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(p),f=document.createElement("a");f.href=m,f.download="relay_config.json",f.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.code??"";if(l)try{await navigator.clipboard.writeText(decodeURIComponent(l)),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(p){console.warn("Clipboard code copy failed",p)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(s=>{s.addEventListener("change",()=>{yt(e),a.emailSaveMessage=null,A()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(s=>{s.addEventListener("change",()=>{yt(e),a.emailSaveMessage=null,A()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{yt(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{yt(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(s=>{s.addEventListener("click",()=>{a.emailTemplateId=s.dataset.templateId??"custom";const l=Ur(a.emailTemplateId);a.emailSubject=l.subject,a.emailBody=l.body,a.emailSaveMessage=null,A()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{yt(e);const s=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${s}`),a.emailSaveMessage=null,A()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{yt(e),a.actionLoading=!0,A(),ka(vn("draft")).then(s=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(s.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,A()})}),e.querySelector("#email-sender")?.addEventListener("change",s=>{a.emailSenderId=s.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{yt(e),a.actionLoading=!0,a.emailSending=!0,A();const s=vn("sent");a.mailSenders.find(l=>l.id===a.emailSenderId),Go().then(async l=>{await ka({...s,recipientCount:l.sent}),a.emailSaveMessage=`${l.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,A(),F(`${l.sent}件送信完了`)}).catch(async()=>{await ka(vn("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,A(),F("APIキー未設定のため下書き保存しました","warning")})}),e.querySelectorAll(".feature-checkbox").forEach(s=>{s.addEventListener("change",async()=>{const l=s.dataset.featureId;if(!l)return;const p=a.myProfile?.name??a.myProfile?.email??"不明";s.checked?await ir(l,p):await lr(l),a.featureStatuses=await Ra(),A()})}),e.querySelectorAll("[data-workforce-tab]").forEach(s=>{s.addEventListener("click",()=>{a.workforceTab=s.dataset.workforceTab,A()})}),e.querySelectorAll("[data-staff-dept-filter]").forEach(s=>{s.addEventListener("click",()=>{a.staffDeptFilter=s.dataset.staffDeptFilter??"",A()})}),e.querySelector("#cost-year-month")?.addEventListener("change",s=>{a.workforceYearMonth=s.target.value,A()}),e.querySelector("#shift-year-month")?.addEventListener("change",s=>{a.workforceYearMonth=s.target.value,a.workforceMetrics=null,a.dailyShiftPlans=[],a.workforceSelectedDay=null,gt(a.currentPath)}),e.querySelectorAll("[data-shift-day]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.shiftDay??null;a.workforceSelectedDay=a.workforceSelectedDay===l?null:l,A()})}),e.querySelector("[data-action='shift-day-close']")?.addEventListener("click",()=>{a.workforceSelectedDay=null,A()}),e.querySelector("#shift-bottling-target")?.addEventListener("change",s=>{a.shiftBottlingTarget=parseInt(s.target.value)||0}),e.querySelector("[data-action='shift-auto-generate']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='shift-auto-generate']"),l=document.getElementById("shift-bottling-target");l&&(a.shiftBottlingTarget=parseInt(l.value)||0),s&&(s.disabled=!0,s.textContent="生成中…");try{const{fetchProductionPlan:p}=await N(async()=>{const{fetchProductionPlan:w}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:w}},void 0),m=await p(a.workforceYearMonth).catch(()=>[]),f=a.calendarShifts.filter(w=>w.date.startsWith(a.workforceYearMonth)),x=Rm(a.workforceYearMonth,a.staffMembers,a.brewingSchedule,a.shiftBottlingTarget,a.workforceMetrics,m,f);await mr(a.workforceYearMonth,x)?(a.dailyShiftPlans=x,F("シフトを自動生成しました","success"),A()):F("保存に失敗しました","error")}finally{s&&(s.disabled=!1)}}),e.querySelector("[data-action='staff-new']")?.addEventListener("click",()=>{const s=document.createElement("div");s.innerHTML=Xs(),document.body.appendChild(s.firstElementChild),fo(null)}),e.querySelectorAll("[data-edit-staff]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.editStaff??"",p=a.staffMembers.find(f=>f.id===l);if(!p)return;const m=document.createElement("div");m.innerHTML=Xs(p),document.body.appendChild(m.firstElementChild),fo(p)})}),e.querySelectorAll("[data-delete-staff]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.dataset.deleteStaff??"",p=s.dataset.staffName??"";if(!confirm(`${p} を削除しますか？`))return;await dr(l)?(a.staffMembers=a.staffMembers.filter(f=>f.id!==l),F("削除しました","success"),A()):F("削除に失敗しました","error")})})}function A(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=Zy()}catch(o){console.error("[renderApp] render error:",o),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(o)}

${o?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",ah(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),us()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const o of["fd-scaler","print-scaler","q-preview-scaler"]){const r=e.querySelector(`#${o}`),i=r?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=i?.querySelector(".print-page")??i;if(!r||!c)continue;const d=r.parentElement?.clientWidth??0,u=c.offsetWidth;if(d>0&&u>0&&u>d-24){const h=(d-24)/u;r.style.transform=`scale(${h})`,r.style.transformOrigin="top left",r.style.height=`${(c.offsetHeight+48)*h}px`}else r.style.transform="",r.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":"",Cy()}const Xr="sake-cloud-cache",nh=300*1e3;function sh(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(Xr,JSON.stringify(e))}catch{}}function oh(){try{const e=localStorage.getItem(Xr);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>nh?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let Zr=0;async function Ct(){const e=oh();e&&(a.loading=!1,A()),a.loading=!e,e||A();try{const[t,n,o,r,i,c,d]=await Promise.all([So(),ko(),Fn(),Po(),ea(a.invoiceFilter),Yn(),_o("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=o,a.pipelineMeta=r,a.invoiceRecords=i,a.salesAnalytics=c,d){const u={...Aa,...Pn(),...d};a.quoteCompanySettings=u,ht(u)}if(Lt.length===0&&My(),!a.salesFilter.startDate||!a.salesFilter.endDate){const h=[...t.salesRecords].sort(($,S)=>new Date(S.date).getTime()-new Date($.date).getTime())[0]?.date??new Date().toISOString(),g=new Date(h),y=new Date(g);y.setDate(g.getDate()-30),a.salesFilter={startDate:yo(y.toISOString()),endDate:yo(g.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await ea(a.invoiceFilter)),a.error=null,sh()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,A(),aa(a.route,!0),Zr=Date.now()}}window.addEventListener("popstate",()=>{a.route=Jr(location.pathname),a.currentCategory=Ha(a.route),a.sidebarOpen=!1,ta(),aa(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,A();return}if(e.key==="Escape"){if(a.globalSearchOpen){ta(),A();return}if(a.pickerMode){ja(),A();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Hr(),A());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Qr(t)}});a.user=Fa()?wo():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await N(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>j);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),A()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,o=0,r=0,i=0,c=1;document.addEventListener("mousedown",d=>{const u=d.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;d.preventDefault();const h=u.closest(".fd-canvas");if(!h)return;const g=h.getBoundingClientRect();if(g.width===0)return;c=228.6/g.width,t=u,n=d.clientX,o=d.clientY,r=parseFloat(u.style.left)||0,i=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(_=>_.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const y=document.querySelector("#fd-selected-info");y&&(y.textContent=`選択中: ${u.title}`);const $=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");$&&($.value=String(r)),S&&(S.value=String(i))}),document.addEventListener("mousemove",d=>{if(!t)return;const u=(d.clientX-n)*c,h=(d.clientY-o)*c,g=Math.round((r+u)*2)/2,y=Math.round((i+h)*2)/2;t.style.left=g+"mm",t.style.top=y+"mm";const $=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");$&&($.value=String(g)),S&&(S.value=String(y))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",d=>{if(!a.fdDesignMode||!a.fdActiveFieldId||d.key!=="ArrowLeft"&&d.key!=="ArrowRight"&&d.key!=="ArrowUp"&&d.key!=="ArrowDown"||d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;d.preventDefault();const h=.5;let g=parseFloat(u.style.left)||0,y=parseFloat(u.style.top)||0;d.key==="ArrowLeft"?g-=h:d.key==="ArrowRight"?g+=h:d.key==="ArrowUp"?y-=h:d.key==="ArrowDown"&&(y+=h),u.style.left=g+"mm",u.style.top=y+"mm";const $=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");$&&($.value=String(g)),S&&(S.value=String(y))})})();let xn=null,_a=[],go=null;function rh(e){const t=window.google?.maps;if(!t){console.warn("Google Maps not loaded");return}const n=e.querySelector("#customer-map"),o=e.querySelector("#map-data");if(!n||!o)return;const r=JSON.parse(decodeURIComponent(o.dataset.customers??"[]")),i=JSON.parse(decodeURIComponent(o.dataset.deliveries??"[]"));xn||(xn=new t.Map(n,{center:{lat:35.38,lng:139.25},zoom:10,gestureHandling:"greedy",streetViewControl:!1,mapTypeControl:!1}),go=new t.InfoWindow);const c=xn,d=go;function u($){return $.isAtRisk?"#e53e3e":$.isDormant?"#dd6b20":$.amount12m>0?"#2563eb":"#aaa"}function h($,S=32){const _=`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${$}" stroke="white" stroke-width="2.5"/></svg>`;return{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(_),scaledSize:new t.Size(S,S),anchor:new t.Point(S/2,S/2)}}function g(){_a.forEach($=>$.setMap(null)),_a=[]}function y($,S,_){g();const L=new t.LatLngBounds;let k=!1;r.filter(E=>!($==="at-risk"&&!E.isAtRisk||$==="dormant"&&(E.isAtRisk||!E.isDormant)||$==="active"&&(E.isAtRisk||E.isDormant||E.amount12m===0)||$==="inactive"&&(E.isAtRisk||E.isDormant||E.amount12m>0)||S&&E.areaCode!==S||_&&(E.businessTypeName||E.businessType)!==_)).forEach(E=>{if(!E.lat||!E.lng)return;const s={lat:E.lat,lng:E.lng};L.extend(s),k=!0;const l=new t.Marker({map:c,position:s,icon:h(u(E),28),title:E.name});l.addListener("click",()=>{d.setContent(`<div style="font-size:13px;max-width:260px;">
          <strong>${E.name}</strong><br>${E.address1??""}<br>
          エリア: ${E.areaCode??"―"} / ${E.businessTypeName??E.businessType??"―"}<br>
          12ヶ月売上: <strong>${E.amount12m?.toLocaleString()??0}円</strong></div>`),d.open(c,l)}),_a.push(l)}),i.forEach(E=>{if(!E.lat||!E.lng)return;const s={lat:E.lat,lng:E.lng};L.extend(s),k=!0;const l=new t.Marker({map:c,position:s,icon:h("#FF9800",22),title:E.name});l.addListener("click",()=>{d.setContent(`<div style="font-size:13px;"><strong>${E.name}</strong><br>${E.address??""}${E.phone?`<br>${E.phone}`:""}</div>`),d.open(c,l)}),_a.push(l)}),k&&c.fitBounds(L,{top:40,bottom:40,left:40,right:40})}y(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz),e.querySelectorAll("[data-map-status]").forEach($=>{$.addEventListener("click",()=>{const S=$.dataset.mapStatus;a.mapFilters={...a.mapFilters,filterStatus:S},e.querySelectorAll("[data-map-status]").forEach(_=>{_.className=_.className.replace(/\b(primary|secondary)\b/g,_===$?"primary":"secondary")}),y(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)})}),e.querySelector("#map-filter-area")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterArea:$.target.value},y(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#map-filter-biz")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterBiz:$.target.value},y(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#btn-geocode")?.addEventListener("click",async()=>{const $=e.querySelector("#btn-geocode"),S=e.querySelector("#geocode-progress"),_=e.querySelector("#geocode-status"),L=e.querySelector("#geocode-bar");$&&($.disabled=!0),S&&(S.style.display="block");try{const{batchGeocode:k}=await N(async()=>{const{batchGeocode:E}=await Promise.resolve().then(()=>j);return{batchGeocode:E}},void 0),C=await k((E,s,l)=>{_&&(_.textContent=`${E}/${s} — ${l}`),L&&(L.style.width=`${Math.round(E/Math.max(s,1)*100)}%`)});_&&(_.textContent=`完了: ${C.success}件成功 / ${C.failed}件失敗`),L&&(L.style.width="100%"),setTimeout(()=>{window.location.reload()},3e3)}catch(k){_&&(_.textContent="エラーが発生しました: "+String(k))}})}Ct();const ih=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&Ct()},ih);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-Zr>60*1e3&&Ct()});let Rn="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Rn=e}).catch(()=>{});setInterval(async()=>{if(!(!Rn||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Rn&&!a.updateAvailable&&(a.updateAvailable=!0,A())}catch{}},120*1e3);export{N as _};
