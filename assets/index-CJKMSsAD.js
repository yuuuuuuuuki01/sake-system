(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const zn="modulepreload",Bn=function(e){return"/"+e},ja={},E=function(t,s,n){let i=Promise.resolve();if(s&&s.length>0){let y=function(f){return Promise.all(f.map(v=>Promise.resolve(v).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};var c=y;document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),u=p?.nonce||p?.getAttribute("nonce");i=y(s.map(f=>{if(f=Bn(f),f in ja)return;ja[f]=!0;const v=f.endsWith(".css"),b=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${b}`))return;const w=document.createElement("link");if(w.rel=v?"stylesheet":zn,v||(w.as="script"),w.crossOrigin="",w.href=f,u&&w.setAttribute("nonce",u),document.head.appendChild(w),v)return new Promise((P,o)=>{w.addEventListener("load",P),w.addEventListener("error",()=>o(new Error(`Unable to preload CSS for ${f}`)))})}))}function r(p){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=p,window.dispatchEvent(u),!u.defaultPrevented)throw p}return i.then(p=>{for(const u of p||[])u.status==="rejected"&&r(u.reason);return t().catch(r)})},ae="https://loarwnuyvfxiscjjsmiz.supabase.co",V="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function Et(e,t){try{const s=new URL(`/rest/v1/${e}`,ae),n=await fetch(s.toString(),{method:"POST",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!n.ok)throw new Error(`HTTP ${n.status}`);return(await n.json())[0]??null}catch(s){return console.warn(`Failed to insert into Supabase table ${e}`,s),null}}async function ya(e,t){try{const s=new URL(`/rest/v1/${e}`,ae),n=await fetch(s.toString(),{method:"POST",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!n.ok)throw new Error(`HTTP ${n.status}`);return(await n.json())[0]??null}catch(s){return console.warn(`Failed to upsert into Supabase table ${e}`,s),null}}async function ha(e,t,s){try{const n=new URL(`/rest/v1/${e}?id=eq.${t}`,ae);return(await fetch(n.toString(),{method:"PATCH",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(s)})).ok}catch{return!1}}async function de(e,t={}){try{const s=new URL(`/rest/v1/rpc/${e}`,ae),n=await fetch(s.toString(),{method:"POST",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(s){return console.warn(`Failed to call Supabase RPC ${e}`,s),null}}async function fa(e){try{const t=new URL(`/rest/v1/${e}`,ae);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const s=await fetch(t.toString(),{method:"GET",headers:{apikey:V,Authorization:`Bearer ${V}`,Accept:"application/json",Prefer:"count=exact"}});if(!s.ok)return 0;const n=s.headers.get("Content-Range");if(n){const i=n.match(/\/(\d+)/);if(i)return parseInt(i[1],10)}return 0}catch{return 0}}async function N(e,t={}){try{const s=new URL(`/rest/v1/${e}`,ae);Object.entries(t).forEach(([i,r])=>{s.searchParams.set(i,r)});const n=await fetch(s.toString(),{method:"GET",headers:{apikey:V,Authorization:`Bearer ${V}`,Accept:"application/json",Prefer:"return=representation"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(s){return console.warn(`Failed to query Supabase table ${e}`,s),[]}}async function ws(e,t){try{const s=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,ae);return(await fetch(s.toString(),{method:"DELETE",headers:{apikey:V,Authorization:`Bearer ${V}`}})).ok}catch{return!1}}async function Z(e,t={},s=1e3){const n=[];let i=0;try{for(;;){const r=new URL(`/rest/v1/${e}`,ae);Object.entries(t).forEach(([u,y])=>{r.searchParams.set(u,y)}),r.searchParams.set("limit",String(s)),r.searchParams.set("offset",String(i));const c=await fetch(r.toString(),{method:"GET",headers:{apikey:V,Authorization:`Bearer ${V}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const p=await c.json();if(n.push(...p),p.length<s)break;i+=s}return n}catch(r){return console.warn(`Failed to query all rows from Supabase table ${e}`,r),n.length>0?n:[]}}const z=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:V,SUPABASE_URL:ae,supabaseCount:fa,supabaseDelete:ws,supabaseInsert:Et,supabaseQuery:N,supabaseQueryAll:Z,supabaseRpc:de,supabaseUpdate:ha,supabaseUpsert:ya},Symbol.toStringTag,{value:"Module"})),va="sake_auth";function xs(e){localStorage.setItem(va,JSON.stringify(e))}function Ss(){return{apikey:V,"Content-Type":"application/json"}}function Vn(e){try{const[,t]=e.split(".");if(!t)return null;const s=t.replaceAll("-","+").replaceAll("_","/"),n=s.padEnd(Math.ceil(s.length/4)*4,"=");return JSON.parse(atob(n))}catch{return null}}async function ks(e,t){const s=await fetch(`${ae}/auth/v1/${e}`,{method:"POST",headers:Ss(),body:JSON.stringify(t)}),n=await s.json().catch(()=>({}));if(!s.ok)throw new Error(n.error_description??n.msg??`HTTP ${s.status}`);return n}async function Jn(e,t){const s=await ks("token?grant_type=password",{email:e,password:t});return xs({access_token:s.access_token,refresh_token:s.refresh_token}),{email:s.user?.email??e}}async function Fa(e,t){const s=await ks("signup",{email:e,password:t});return s.access_token&&s.refresh_token&&xs({access_token:s.access_token,refresh_token:s.refresh_token}),{email:s.user?.email??e}}async function Yn(){const e=Lt();if(localStorage.removeItem(va),!!e?.access_token)try{await fetch(`${ae}/auth/v1/logout`,{method:"POST",headers:{...Ss(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Lt(){const e=localStorage.getItem(va);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Un(){const e=Lt();if(!e)return null;const t=Vn(e.access_token),s=typeof t?.email=="string"?t.email:null;return s?{email:s}:null}async function Qn(e){const t=Lt();if(!t)throw new Error("not signed in");const s=await fetch(`${ae}/auth/v1/user`,{method:"PUT",headers:{apikey:V,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!s.ok){const n=await s.json().catch(()=>({}));throw new Error(n.msg??`HTTP ${s.status}`)}}const ga={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},Ps={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Hn={generatedAt:new Date().toISOString(),records:[]},xe={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Gn={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Xn={},Kn={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function J(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Wn(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Zn(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function h(e,t,s=""){for(const n of t){const i=e[n];if(typeof i=="string"&&i.length>0)return i}return s}function k(e,t,s=0){for(const n of t)if(n in e)return J(e[n]);return s}function ee(e,t,s=!0){for(const n of t)if(n in e)return Zn(e[n]);return s}function W(e,t,s){for(const n of t){const i=e[n];if(typeof i!="string"||i.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(i))return new Date(`${i}T00:00:00Z`).toISOString();const r=new Date(i);if(!Number.isNaN(r.getTime()))return r.toISOString()}return s}function eo(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:W(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:J(e.total_amount??e.billed_amount)}}function za(e){const t=e.trim().toUpperCase(),s=Xn[t];if(s)return s;const n=Ps.salesRecords.find(i=>i.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:n?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function As(e){try{return(await N("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function je(e,t){await ya("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function Cs(){const e=await Z("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,s]=await Promise.all([N("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),N("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),i=new Date().toISOString().slice(0,10),r=i.slice(0,7),c=[...e].sort((w,P)=>w.sales_date.localeCompare(P.sales_date)).map(w=>({date:new Date(`${w.sales_date}T00:00:00Z`).toISOString(),amount:J(w.amount??w.sales_amount),bottles:J(w.bottles),volumeMl:J(w.volume_ml),pricePerBottle:J(w.price_per_bottle),pricePerLiter:J(w.price_per_liter)})),p=c.slice(-30),u=w=>J(w.amount??w.sales_amount),y=e.reduce((w,P)=>P.sales_date===i?w+u(P):w,0),f=e.reduce((w,P)=>P.sales_date.startsWith(r)?w+u(P):w,0),v=t.filter(w=>J(w.balance_amount)>0),b=s.map((w,P)=>({id:String(w.id??`sale-${P+1}`),documentNo:w.document_no??w.legacy_document_no??"",date:w.sales_date??"",customerCode:w.legacy_customer_code??"",customerName:w.customer_name??w.legacy_customer_code??"",amount:J(w.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:y,todayDelta:0,monthSales:f,monthDelta:0,unpaidCount:v.length,unpaidAmount:v.reduce((w,P)=>w+J(P.balance_amount),0)},dailySales:p,allDailySales:c,salesRecords:b}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),Ps}async function Es(){const e=await Z("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,s)=>{const n=t.legacy_customer_code??`UNKNOWN-${s+1}`;return{id:`payment-${n}-${s+1}`,customerCode:n,customerName:n,billedAmount:J(t.billed_amount),paymentAmount:J(t.paid_amount),balanceAmount:J(t.balance_amount),lastPaymentDate:null,status:Wn(t.payment_status)}})}:Hn}async function ba(){const[e,t]=await Promise.all([Z("customers"),Z("products")]);if(e.length>0||t.length>0){const s=e.length?e.map((i,r)=>{const c=typeof i.memo=="string"?JSON.parse(i.memo||"{}"):i.memo??{};return{id:h(i,["id","customer_id","code"],`customer-${r+1}`),code:h(i,["code","customer_code","legacy_customer_code"],`C${String(r+1).padStart(4,"0")}`),name:h(i,["name","customer_name","display_name"],`Customer ${r+1}`),kanaName:h(i,["kana_name"],""),shortName:h(i,["short_name"],""),postalCode:h(i,["postal_code"],""),address1:h(i,["address1"],""),address2:h(i,["address2"],""),phone:h(i,["phone"],""),fax:h(i,["fax"],""),email:h(i,["email"],""),staffCode:h(i,["staff_code"],""),businessType:h(i,["business_type"],""),areaCode:h(i,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:k(i,["closing_day","close_day"],31),paymentDay:k(i,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:h(i,["payment_cycle"],""),billingCycleType:h(i,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:k(i,["credit_limit"],0),taxMode:h(i,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:h(i,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:h(i,["bank_name"],""),bankBranch:h(i,["bank_branch"],""),bankAccount:h(i,["bank_account"],""),isActive:ee(i,["is_active","active","enabled"],!0),lat:i.lat?Number(i.lat):void 0,lng:i.lng?Number(i.lng):void 0}}):xe.customers,n=t.length?t.map((i,r)=>({id:h(i,["id","product_id","product_code","legacy_product_code"],`product-${r+1}`),code:h(i,["product_code","legacy_product_code","code"],`P${String(r+1).padStart(5,"0")}`),janCode:h(i,["jan_code","jan","barcode"],""),name:h(i,["name","product_name","display_name"],`Product ${r+1}`),kanaName:h(i,["kana_name"],""),shortName:h(i,["short_name"],""),category:h(i,["category_code","category","category_name"],"未分類"),taxCategoryCode:h(i,["tax_code","tax_category_code"],""),isActive:ee(i,["is_active","active","enabled"],!0),listPrice:k(i,["list_price"],0),purchasePrice:k(i,["purchase_price"],0),salePrice:k(i,["default_sale_price","sale_price"],0),costPrice:k(i,["default_cost_price"],0),alcoholDegree:i.alcohol_degree!=null?Number(i.alcohol_degree):null,volumeMl:i.volume_ml!=null?Number(i.volume_ml):null,unit:h(i,["unit_name","unit"],"本"),caseQty:i.case_qty!=null?Number(i.case_qty):null,bottleType:h(i,["bottle_type"],""),containerCode:h(i,["container_code"],""),polishRate:i.polish_rate!=null?Number(i.polish_rate):null,riceType:h(i,["rice_type"],""),season:h(i,["season"],""),agingYears:k(i,["aging_years"],0)})):xe.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||xe.summary.customerCount,activeCustomerCount:e.length?s.filter(i=>i.isActive).length:xe.summary.activeCustomerCount,productCount:t.length||xe.summary.productCount,activeProductCount:t.length?n.filter(i=>i.isActive).length:xe.summary.activeProductCount},customers:s,products:n}}return xe}async function Ls(){const[e,t]=await Promise.all([N("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),N("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),s=t.length>0?W(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const n=e[0],i=h(n,["status"],"success"),r=n.errors,c=Array.isArray(r)?r.length>0:!!r;return{generatedAt:new Date().toISOString(),lastSyncAt:W(n,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:s,status:c?"warning":i==="error"?"error":"success",jobName:h(n,["agent_hostname"],"sake-relay"),message:`${k(n,["rows_upserted"],0)}行同期 / ${k(n,["files_updated"],0)}ファイル更新`}}return{...Gn,lastDataAt:s}}async function Ds(){const e=await de("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function nt(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const s=[];e.customerCode.trim()&&s.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&s.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),s.length>0&&(t.or=`(${s.join(",")})`);const n=await N("mv_invoice_with_line_count",t);return n.length>0?n.map((i,r)=>({id:h(i,["id"],`invoice-${r}`),documentNo:h(i,["document_no","legacy_document_no"],""),date:W(i,["sales_date"],""),customerCode:h(i,["legacy_customer_code","customer_code"],""),customerName:h(i,["customer_name","legacy_customer_code"],""),itemCount:k(i,["line_count"],0),amount:k(i,["total_amount","billed_amount"],0)})):[]}async function $a(e){const t=e.trim().toUpperCase();if(!t)return za("");const[s,n,i]=await Promise.all([N("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),N("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),N("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(s.length>0||n.length>0){const r=s.map((u,y)=>{const f=eo(u,y);return{id:f.id,date:f.date,documentNo:f.documentNo,amount:f.amount}}),c=n.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:W(u,["payment_date","received_date"],new Date().toISOString()),amount:J(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=i.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:s[0]?.customer_name??s[0]?.customer_code??s[0]?.legacy_customer_code??t,balanceAmount:J(p?.balance_amount),salesTotal:r.reduce((u,y)=>u+y.amount,0),paymentTotal:c.reduce((u,y)=>u+y.amount,0),salesHistory:r,paymentHistory:c}}return za(t)}async function _a(){const[e,t,s,n]=await Promise.all([N("mv_monthly_sales",{order:"month.asc"}),N("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),N("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),N("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(i=>({month:h(i,["month"],""),amount:k(i,["amount"],0),quantity:k(i,["quantity"],0),volumeMl:k(i,["volume_ml"],0)})),productTotals:s.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),amount:k(i,["amount"],0),quantity:k(i,["quantity"],0),documents:k(i,["documents"],0),volumeMl:k(i,["volume_ml"],0)})),customerTotals:t.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),amount:k(i,["amount"],0),quantity:k(i,["quantity"],0),documents:k(i,["documents"],0),volumeMl:k(i,["volume_ml"],0)})),staffTotals:n.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),amount:k(i,["amount"],0),quantity:k(i,["quantity"],0),documents:k(i,["documents"],0),volumeMl:0}))}:Kn}async function to(e,t,s){if(t==="all")return[];const n=s?qs(t,s):null,r=await de(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:n?.from??null,p_date_to:n?.to??null});return r?r.map(c=>({code:h(c,["code"],""),name:h(c,["name"],""),amount:k(c,["amount"],0),quantity:k(c,["quantity"],0),documents:k(c,["documents"],0),volumeMl:k(c,["volume_ml"],0)})):[]}async function ao(e,t){if(t==="all")return[];const s=await de("get_available_periods",{p_type:t});return!s||s.length===0?[]:s.map(n=>n.period_val).filter(Boolean)}function qs(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[s,n]=t.split("-").map(Number),i=`${s}-${String(n).padStart(2,"0")}-01`,r=new Date(s,n,0).getDate(),c=`${s}-${String(n).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return{from:i,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const s=t.match(/^(\d{4})-W(\d{2})$/);if(!s)return null;const n=parseInt(s[1]),i=parseInt(s[2]),r=new Date(n,0,4),c=r.getDay()||7,p=new Date(r);p.setDate(r.getDate()-c+1);const u=new Date(p);u.setDate(p.getDate()+(i-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function Is(e){return e.map(t=>({staffCode:h(t,["staff_code"],""),staffName:h(t,["staff_name"],""),code:h(t,["code"],""),name:h(t,["name"],""),tag:h(t,["tag"],""),amount:k(t,["amount"],0),quantity:k(t,["quantity"],0),documents:k(t,["documents"],0)}))}async function so(e,t){const s=await de("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return s?s.map(n=>({code:h(n,["code"],""),name:h(n,["name"],""),amount:k(n,["amount"],0),quantity:k(n,["quantity"],0),documents:k(n,["documents"],0)})):[]}async function no(e,t,s){const n=await de("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:s??null});return n?Is(n):[]}async function oo(e,t,s){const n=await de("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:s??null});return n?Is(n):[]}async function io(e,t){if(e==="all"||!t)return[];const s=await de("get_period_chart_data",{p_period:e,p_filter:t});return s?s.map(n=>({month:h(n,["label"],""),amount:k(n,["amount"],0),quantity:k(n,["quantity"],0),volumeMl:k(n,["volume_ml"],0)})):[]}function ro(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function lo(e,t,s){const n=await de("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:s??null});return n?n.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),tag:h(i,["tag"],""),amount:k(i,["amount"],0),quantity:k(i,["quantity"],0),documents:k(i,["documents"],0),volumeMl:k(i,["volume_ml"],0)})):[]}async function co(e,t,s){const n=await de("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:s??null});return n?n.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),tag:h(i,["tag"],""),amount:k(i,["amount"],0),quantity:k(i,["quantity"],0),documents:k(i,["documents"],0),volumeMl:k(i,["volume_ml"],0)})):[]}async function uo(e,t){const s=await de("get_entity_monthly_sales",{p_code:e,p_type:t});return s?s.map(n=>({month:h(n,["month"],""),amount:k(n,["amount"],0),quantity:k(n,["quantity"],0),volumeMl:k(n,["volume_ml"],0)})):[]}async function po(e,t){const s=await de("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return s?s.map(n=>({brewCategory:h(n,["brew_category"],""),subCategory:h(n,["sub_category"],""),productCount:k(n,["product_count"],0),totalShipmentQty:k(n,["total_shipment_qty"],0),totalShipmentMl:k(n,["total_shipment_ml"],0),monthlyAvgQty:k(n,["monthly_avg_qty"],0),monthlyAvgMl:k(n,["monthly_avg_ml"],0),currentStockL:k(n,["current_stock_l"],0),monthsRemaining:k(n,["months_remaining"],0),costPerL:k(n,["cost_per_l"],0)})):[]}async function mo(e,t){const s=await de("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return s?s.map(n=>({month:h(n,["month"],""),brewCategory:h(n,["brew_category"],""),shipmentMl:k(n,["shipment_ml"],0)})):[]}async function yo(e){return(await N("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(s=>({id:h(s,["id"],""),brewCategory:h(s,["brew_category"],""),fy:k(s,["fy"],e),brewMonth:k(s,["brew_month"],0),durationMonths:k(s,["duration_months"],2),plannedVolumeL:k(s,["planned_volume_l"],0),notes:h(s,["notes"],"")}))}async function ho(e,t,s){return await de("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:s.map(i=>({brew_month:i.brewMonth,duration_months:i.durationMonths,planned_volume_l:i.plannedVolumeL,notes:i.notes??null}))})!==null}async function fo(e,t,s,n){return await ya("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:s,notes:n??null,updated_at:new Date().toISOString()})!==null}const Kt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Ts(e){const t=e.lines.reduce((i,r)=>i+r.amount,0),s=`D${Date.now().toString().slice(-6)}`;return{id:(await Et("sales_document_headers",{legacy_document_no:s,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${s}`,documentNo:s,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const Ba={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function wa(e){const t=await N("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const s=t[0],n=J(s.total_amount);return{documentNo:e,invoiceDate:h(s,["sales_date","document_date"],""),customerCode:h(s,["legacy_customer_code","customer_code"],""),customerName:h(s,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:n,taxAmount:Math.floor(n*10/110),note:""}}return{...Ba,documentNo:e||Ba.documentNo}}const vo={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function xa(e){const t=await N("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const s=t.map(i=>{const r=k(i,["sales_amount"],0),c=k(i,["tax_amount"],0);return{customerCode:h(i,["customer_code"],""),customerName:h(i,["customer_name"],""),closingDay:31,salesAmount:r,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:r,status:"open"}}),n=s.reduce((i,r)=>i+r.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:n,customers:s}}return{...vo,targetYearMonth:e}}const go={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Dt(){const[e,t,s]=await Promise.all([N("mv_monthly_sales",{order:"month.asc"}),N("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),N("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return go;const n=e.slice(-12).map(u=>h(u,["month"],"")),i=new Map;t.forEach(u=>{const y=h(u,["code"],"");i.has(y)||i.set(y,{name:h(u,["name"],y),monthValues:new Map}),i.get(y).monthValues.set(h(u,["month"],""),k(u,["amount"],0))});const c=Array.from(i.entries()).map(([u,y])=>({code:u,name:y.name,total:n.reduce((f,v)=>f+(y.monthValues.get(v)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:n.map(y=>u.monthValues.get(y)??0)})),p=s.map(u=>({label:h(u,["name"],""),values:n.map(()=>Math.round(k(u,["amount"],0)/n.length))}));return{generatedAt:new Date().toISOString(),months:n,salesByProduct:c,salesByCustomer:p,costSimulation:[]}}async function bo(){const e=await Z("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(s=>{const n=h(s,["code"],"");if(!n)return;const i=h(s,["month"],""),r=parseInt(i.slice(5,7))-1;if(r<0||r>11)return;let c=t.get(n);c||(c={name:h(s,["name"],n),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(n,c)),c.qty[r]+=k(s,["quantity"],0),c.amt[r]+=k(s,["amount"],0)}),Array.from(t.entries()).map(([s,n])=>({code:s,name:n.name,monthlyQuantity:n.qty,monthlyAmount:n.amt,totalQuantity:n.qty.reduce((i,r)=>i+r,0),totalAmount:n.amt.reduce((i,r)=>i+r,0)})).filter(s=>s.totalQuantity>0).sort((s,n)=>n.totalAmount-s.totalAmount)}async function $o(){return(await N("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:h(t,["product_code"],""),productName:h(t,["product_name"],""),forecastMonth:h(t,["forecast_month"],""),segment:h(t,["segment"],"monthly"),avgMonthly:k(t,["avg_monthly"],0),forecastQuantity:k(t,["forecast_quantity"],0),forecastAmount:k(t,["forecast_amount"],0),safetyStock:k(t,["safety_stock"],0),calculatedAt:W(t,["calculated_at"],"")}))}async function _o(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),s=await Z("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(s.length===0)return[];s.map(c=>String(c.id)).filter(Boolean);const n=await Z("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),i=new Map;s.forEach(c=>{c.id&&i.set(String(c.id),c)});const r=[];return n.forEach(c=>{const p=String(c.header_id??c.document_header_id??""),u=i.get(p);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||r.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:J(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),r.sort((c,p)=>c.date.localeCompare(p.date))}async function Ns(){const e=new Date().toISOString();return(await N("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(s=>({id:h(s,["id"],""),message:h(s,["message"],""),level:h(s,["level"],"info"),startsAt:W(s,["starts_at"],""),endsAt:s.ends_at?W(s,["ends_at"],""):null,dismissible:ee(s,["dismissible"],!0)}))}async function wo(){const e=await Z("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:h(t,["customer_code"],""),customer_name:h(t,["customer_name"],""),business_type:h(t,["business_type"],""),area_code:h(t,["area_code"],""),phone:h(t,["phone"],""),last_order_date:h(t,["last_order_date"],""),days_since_order:k(t,["days_since_order"],0),amount_12m:k(t,["amount_12m"],0),amount_3m:k(t,["amount_3m"],0),amount_this_month:k(t,["amount_this_month"],0),amount_last_year_same_month:k(t,["amount_last_year_same_month"],0),annual_revenue:k(t,["annual_revenue"],0),is_dormant:ee(t,["is_dormant"],!1),is_at_risk:ee(t,["is_at_risk"],!1)})):[]}async function xo(){return(await Z("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:h(t,["customer_code"],""),customer_name:h(t,["customer_name"],""),phone:h(t,["phone"],""),address:h(t,["address"],""),area_code:h(t,["area_code"],""),business_type:h(t,["business_type"],""),priority_score:k(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:h(t,["last_order_date"],""),days_since_order:k(t,["days_since_order"],0),annual_revenue:k(t,["annual_revenue"],0),recommended_action:h(t,["recommended_action"],"")}))}async function So(){return(await Z("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:h(t,["product_code"],""),product_name:h(t,["product_name"],""),season_type:h(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:k(t,["avg_monthly_qty"],0)}))}async function ko(){return(await Z("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:h(t,["product_code"],""),name:h(t,["product_name"],""),monthlyQuantity:[k(t,["m01"],0),k(t,["m02"],0),k(t,["m03"],0),k(t,["m04"],0),k(t,["m05"],0),k(t,["m06"],0),k(t,["m07"],0),k(t,["m08"],0),k(t,["m09"],0),k(t,["m10"],0),k(t,["m11"],0),k(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:k(t,["total_quantity"],0),totalAmount:k(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Ms(e,t,s){try{return await Et("feature_requests",{title:e,category:t,description:s}),!0}catch{return!1}}async function Rs(e,t){return ha("customers",e,t)}async function Os(e,t){return ha("products",e,t)}async function Wt(e,t){const s=e.find(c=>c.code===t);s?.priceGroup;const n=s?.priceGroup||t;let i="";try{const c=await N("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(i=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const r=new Map;if(n){const c=await N("customer_product_prices",{price_group:`eq.${n}`,select:"legacy_product_code,special_price"});for(const p of c)r.set(p.legacy_product_code,p.special_price)}return{priceType:i,priceGroup:n,individualPrices:r}}function Sa(e,t){const s=t.individualPrices.get(e.code);if(s!=null&&s>0)return{price:s,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function js(){return(await N("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Po(){return(await Z("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Fs(){return(await N("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function zs(){const[e,t]=await Promise.all([N("mv_customer_abc",{order:"amount.desc"}),Dt()]),s=e.map(n=>({code:h(n,["code"],""),name:h(n,["name"],""),amount:k(n,["amount"],0),documents:k(n,["documents"],0),ratio:k(n,["ratio"],0),cumRatio:k(n,["cum_ratio"],0),abcRank:h(n,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:s,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function Ao(){const[e,t]=await Promise.all([N("mv_product_abc",{order:"amount.desc"}),Dt()]),s=e.map(c=>({code:h(c,["code"],""),name:h(c,["name"],""),amount:k(c,["amount"],0),quantity:k(c,["quantity"],0),ratio:k(c,["ratio"],0),cumRatio:k(c,["cum_ratio"],0),abcRank:h(c,["abc_rank"],"C")})),n=s.reduce((c,p)=>c+p.amount,0),i=new Set(s.filter(c=>c.abcRank==="A").map(c=>c.name)),r=t.salesByProduct.filter(c=>i.has(c.label));return{generatedAt:new Date().toISOString(),totalAmount:n,ranking:s,months:t.months,monthlyByProduct:r.length>0?r:t.salesByProduct}}const Bs={planned:"計画中",active:"仕込中",done:"完了"};async function Vs(){const e=await N("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),jikomiNo:h(t,["batch_no","legacy_batch_no"],""),productName:h(t,["brand_name"],""),riceType:h(t,["rice_type"],""),plannedKg:k(t,["planned_rice_kg"],0),actualKg:k(t,["actual_rice_kg"],0),startDate:W(t,["start_date"],""),expectedDoneDate:W(t,["expected_done_date"],""),status:h(t,["status"],"planned"),tankNo:h(t,["tank_no"],""),note:h(t,["remarks"],"")})):[]}async function Js(){const e=await N("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),tankNo:h(t,["tank_no"],""),capacity:k(t,["capacity_l"],0),currentVolume:k(t,["current_volume_l"],0),productName:h(t,["current_product_code"],""),jikomiNo:h(t,["current_batch_id"],""),status:h(t,["status"],"empty"),lastUpdated:W(t,["last_updated_at"],"")})):[]}async function Ys(){const e=await N("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),kenteiNo:h(t,["kentei_no"],""),jikomiNo:h(t,["batch_id"],""),productName:h(t,["product_code"],""),kenteiDate:W(t,["kentei_date"],""),alcoholDegree:k(t,["alcohol_degree"],0),extractDegree:k(t,["extract_degree"],0),sakaMeterValue:k(t,["sakemeter_value"],0),volume:k(t,["volume_l"],0),taxCategory:h(t,["tax_category_code"],""),status:h(t,["status"],"pending")})):[]}async function Zt(){const e=await N("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),code:h(t,["material_code","legacy_material_code"],""),name:h(t,["name"],""),unit:h(t,["unit"],""),currentStock:k(t,["current_stock"],0),minimumStock:k(t,["minimum_stock"],0),unitCost:k(t,["unit_cost"],0),lastUpdated:W(t,["updated_at"],"")})):[]}async function Us(){const e=await N("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),documentNo:h(t,["document_no","legacy_document_no"],""),purchaseDate:W(t,["purchase_date"],""),supplierCode:h(t,["supplier_code","legacy_supplier_code"],""),supplierName:h(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:k(t,["total_amount"],0),status:h(t,["payment_status"],"pending")})):[]}async function Qs(){const e=await N("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:h(t,["supplier_code","legacy_supplier_code"],""),supplierName:h(t,["legacy_supplier_code"],""),totalPurchase:k(t,["total_purchase"],0),paidAmount:k(t,["paid_amount"],0),balance:k(t,["balance"],0),nextPaymentDate:W(t,["next_payment_date"],""),status:h(t,["status"],"unpaid")})):[]}async function Hs(){const e=await N("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),billNo:h(t,["bill_no"],""),supplierName:h(t,["counterparty_name"],""),amount:k(t,["amount"],0),issueDate:W(t,["issue_date"],""),dueDate:W(t,["due_date"],""),status:h(t,["status"],"holding")})):[]}async function Gs(){const e=await N("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:h(t,["material_code","legacy_material_code"],""),name:h(t,["name"],""),unit:h(t,["unit"],""),currentStock:k(t,["current_stock"],0),minimumStock:k(t,["minimum_stock"],0),lastPurchaseDate:W(t,["last_purchase_date"],""),unitCost:k(t,["unit_cost"],0)})):[]}const Xs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],ea={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Co={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function ka(e,t){const s=await N("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(s.length>0){const n=s[0],i=h(n,["id"],""),[r,c]=await Promise.all([N("tax_declaration_rows",{declaration_id:`eq.${i}`,order:"tax_category_code.asc"}),N("tax_deductions",{declaration_id:`eq.${i}`})]),p=r.map(y=>({taxCategory:h(y,["tax_category_code"],""),taxCategoryName:h(y,["tax_category_name"],""),alcoholDegree:k(y,["alcohol_degree"],0),volume:k(y,["taxable_volume"],0),taxRate:k(y,["tax_rate"],0),taxAmount:k(y,["tax_amount"],0),productionVolume:k(y,["production_volume"],0),previousBalance:k(y,["previous_balance"],0),currentAdjustment:k(y,["current_adjustment"],0),exportDeduction:k(y,["export_deduction"],0),sampleDeduction:k(y,["sample_deduction"],0),taxableVolume:k(y,["taxable_volume"],0)})),u=c.map(y=>({type:h(y,["deduction_type"],"sample"),categoryCode:h(y,["tax_category_code"],""),volume:k(y,["volume"],0),reason:h(y,["reason"],""),documentNo:h(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:h(n,["company_name"],""),companyNo:h(n,["company_no"],""),companyAddress:h(n,["company_address"],""),companyRepresentative:h(n,["company_representative"],""),taxOffice:h(n,["tax_office"],""),rows:p,deductions:u,totalVolume:k(n,["total_taxable_volume"],0),totalTax:k(n,["total_tax_amount"],0),status:h(n,["status"],"draft"),submittedAt:h(n,["submitted_at"],"")||null}}return{...Co,targetYear:e,targetMonth:t}}function me(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Ks(e){const t=e.rows.map(n=>`    <Category>
      <Code>${me(n.taxCategory)}</Code>
      <Name>${me(n.taxCategoryName)}</Name>
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
`),s=e.deductions.map(n=>`    <Deduction type="${me(n.type)}">
      <CategoryCode>${me(n.categoryCode)}</CategoryCode>
      <Volume>${n.volume}</Volume>
      <Reason>${me(n.reason)}</Reason>${n.documentNo?`
      <DocumentNo>${me(n.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${me(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${me(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${me(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${me(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${me(e.taxOffice)}</TaxOffice>
    <Status>${e.status}</Status>
  </Header>
  <Categories>
${t}
  </Categories>
  <Deductions>
${s}
  </Deductions>
  <Total>
    <TotalVolume>${e.totalVolume}</TotalVolume>
    <TotalTax>${e.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function Eo(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Lo(e){const s=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),n=e.rows.map(r=>[r.taxCategory,r.taxCategoryName,r.alcoholDegree,r.productionVolume,r.previousBalance,r.currentAdjustment,r.exportDeduction,r.sampleDeduction,r.taxableVolume,r.taxRate,r.taxAmount].map(Eo).join(",")),i=`,合計,,${e.rows.reduce((r,c)=>r+c.productionVolume,0)},,,${e.rows.reduce((r,c)=>r+c.exportDeduction,0)},${e.rows.reduce((r,c)=>r+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[s,...n,i].join(`
`)+`
`}function Do(e){const t=e.rows.map(i=>{const r=Math.max(0,i.productionVolume+i.previousBalance+i.currentAdjustment-i.exportDeduction-i.sampleDeduction),c=Math.round(r*i.taxRate);return{...i,taxableVolume:r,volume:r,taxAmount:c}}),s=t.reduce((i,r)=>i+r.taxableVolume,0),n=t.reduce((i,r)=>i+r.taxAmount,0);return{...e,rows:t,totalVolume:s,totalTax:n}}async function qo(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>z);return{supabaseInsert:s}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Ks(e),submitted_at:e.submittedAt})}async function Pa(e){const t=await N("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(s=>({id:h(s,["id"],""),saleDate:h(s,["sale_date"],e),saleTime:h(s,["sale_time"],""),productCode:h(s,["product_code"],""),productName:h(s,["product_name"],""),quantity:k(s,["quantity"],0),unitPrice:k(s,["unit_price"],0),amount:k(s,["amount"],0),paymentMethod:h(s,["payment_method"],"cash")})):[]}async function Ws(){const e=await N("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:h(t,["id"],""),orderNo:h(t,["order_no"],""),orderDate:W(t,["order_date"],""),customerName:h(t,["customer_name"],""),postalCode:h(t,["postal_code"],""),address:h(t,["shipping_address"],""),items:[],totalAmount:k(t,["total_amount"],0),status:h(t,["status"],"new"),shippingDate:W(t,["shipping_date"],"")})):[]}async function $t(e){const t=await Et("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Zs(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Io(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await N("print_layouts",t)).map(n=>({id:h(n,["id"],""),name:h(n,["name"],""),templateKey:h(n,["template_key"],""),positions:n.positions??{},isDefault:ee(n,["is_default"],!1),note:h(n,["note"],""),updatedAt:h(n,["updated_at"],"")}))}async function To(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>z);return{supabaseInsert:i}},void 0),s={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},n=await t("print_layouts",s);return n?{id:h(n,["id"],e.id),name:h(n,["name"],e.name),templateKey:h(n,["template_key"],e.templateKey),positions:n.positions??e.positions,isDefault:ee(n,["is_default"],!1),note:h(n,["note"],""),updatedAt:h(n,["updated_at"],"")}:null}async function No(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const s="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok}catch{return!1}}async function Mo(){return(await N("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),email:h(t,["email"],""),displayName:h(t,["display_name"],""),signature:h(t,["signature"],""),replyTo:h(t,["reply_to"],""),isDefault:ee(t,["is_default"],!1),isVerified:ee(t,["is_verified"],!1),note:h(t,["note"],"")}))}async function Ro(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0),s=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return s?{id:h(s,["id"],e.id),name:h(s,["name"],e.name),email:h(s,["email"],e.email),displayName:h(s,["display_name"],""),signature:h(s,["signature"],""),replyTo:h(s,["reply_to"],""),isDefault:ee(s,["is_default"],!1),isVerified:ee(s,["is_verified"],!1)}:null}async function Oo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Aa={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Ca={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function jo(e){const t=`${e}-01T00:00:00Z`,[s,n]=e.split("-").map(p=>parseInt(p,10)),i=new Date(s,n,0).getDate(),r=`${e}-${String(i).padStart(2,"0")}T23:59:59Z`;return(await N("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${r})`,order:"starts_at.asc"})).map(p=>({id:h(p,["id"],""),title:h(p,["title"],""),description:h(p,["description"],""),category:h(p,["category"],"general")||"general",startsAt:h(p,["starts_at"],new Date().toISOString()),endsAt:h(p,["ends_at"],""),isAllDay:ee(p,["is_all_day"],!1),location:h(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:h(p,["related_customer_code"],""),relatedOrderId:h(p,["related_order_id"],""),color:h(p,["color"],""),googleEventId:h(p,["google_event_id"],"")}))}async function Fo(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Ca[e.category],updated_at:new Date().toISOString()})?e:null}async function zo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function en(){return(await N("integration_settings",{order:"name.asc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),provider:h(t,["provider"],""),config:t.config??{},isEnabled:ee(t,["is_enabled"],!1),lastSyncAt:h(t,["last_sync_at"],""),lastStatus:h(t,["last_status"],"")}))}async function rt(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Bo(e){const t=e.config.shop_domain,s=e.config.admin_token;if(!t||!s)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const n=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,i=await fetch(n,{headers:{"X-Shopify-Access-Token":s,"Content-Type":"application/json"}});if(!i.ok)return{count:0,error:`HTTP ${i.status}`};const r=await i.json(),{supabaseInsert:c}=await E(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>z);return{supabaseInsert:u}},void 0);let p=0;for(const u of r.orders){const y=`shopify_${u.id}`;await c("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await rt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(n){return{count:0,error:n instanceof Error?n.message:String(n)}}}async function Vo(){return(await N("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:h(t,["id"],""),shopifyOrderId:h(t,["shopify_order_id"],""),orderNumber:h(t,["order_number"],""),orderDate:h(t,["order_date"],""),customerName:h(t,["customer_name"],""),customerEmail:h(t,["customer_email"],""),totalAmount:J(t.total_amount),financialStatus:h(t,["financial_status"],""),fulfillmentStatus:h(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Jo(e){const t=e.config.refresh_token,s=e.config.client_id,n=e.config.client_secret;if(!t||!s||!n)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const i=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:s,client_secret:n})});if(!i.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${i.status}`};const c=(await i.json()).access_token;return await rt({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function Yo(e){let t=e.config.oauth_token;const s=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const n=new Date().toISOString(),i=new Date(Date.now()+30*86400*1e3).toISOString(),r=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(s)}/events?timeMin=${n}&timeMax=${i}&singleEvents=true&orderBy=startTime`;let c=await fetch(r,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const f=await Jo(e);if(f.error)return{count:0,error:f.error};t=f.token,c=await fetch(r,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const p=await c.json(),{supabaseInsert:u}=await E(async()=>{const{supabaseInsert:f}=await Promise.resolve().then(()=>z);return{supabaseInsert:f}},void 0);let y=0;for(const f of p.items){const v=`gcal_${f.id}`,b=f.start?.dateTime??f.start?.date??"",w=f.end?.dateTime??f.end?.date??"";await u("calendar_events",{id:v,title:String(f.summary??"(無題)"),description:String(f.description??""),category:"general",starts_at:String(b),ends_at:String(w),location:String(f.location??""),google_event_id:String(f.id??""),updated_at:new Date().toISOString()}),y++}return await rt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(n){return{count:0,error:n instanceof Error?n.message:String(n)}}}async function Uo(){return(await N("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:h(t,["id"],""),receivedAt:h(t,["received_at"],""),senderPhone:h(t,["sender_phone"],""),senderName:h(t,["sender_name"],""),imageUrl:h(t,["image_url"],""),ocrStatus:h(t,["ocr_status"],"pending")||"pending",ocrText:h(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:h(t,["linked_invoice_id"],"")}))}async function Qo(e,t){const s=e.config.api_key;if(!s)return{text:"",error:"Cloud Vision API key 未設定"};try{const n=`https://vision.googleapis.com/v1/images:annotate?key=${s}`,i=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return i.ok?{text:(await i.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${i.status}`}}catch(n){return{text:"",error:n instanceof Error?n.message:String(n)}}}async function Ho(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const St={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},kt={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Go(){return(await N("user_profiles",{order:"display_name.asc"})).map(t=>({id:h(t,["id"],""),email:h(t,["email"],""),displayName:h(t,["display_name"],""),staffCode:h(t,["staff_code"],""),department:h(t,["department"],"all")||"all",role:h(t,["role"],"staff")||"staff",defaultMailSenderId:h(t,["default_mail_sender_id"],""),phone:h(t,["phone"],""),avatarUrl:h(t,["avatar_url"],""),isActive:ee(t,["is_active"],!0),lastSignInAt:h(t,["last_sign_in_at"],""),createdAt:h(t,["created_at"],"")}))}async function Xo(e){if(!e)return null;const t=await N("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const s=t[0];return{id:h(s,["id"],""),email:h(s,["email"],""),displayName:h(s,["display_name"],""),staffCode:h(s,["staff_code"],""),department:h(s,["department"],"all")||"all",role:h(s,["role"],"staff")||"staff",defaultMailSenderId:h(s,["default_mail_sender_id"],""),phone:h(s,["phone"],""),avatarUrl:h(s,["avatar_url"],""),isActive:ee(s,["is_active"],!0),lastSignInAt:h(s,["last_sign_in_at"],"")}}async function Ko(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Wo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Zo(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>z);return{supabaseInsert:s}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function ei(e=100){return(await N("audit_logs",{order:"created_at.desc",limit:String(e)})).map(s=>({id:h(s,["id"],""),action:h(s,["action"],""),entityType:h(s,["entity_type"],""),entityId:h(s,["entity_id"],""),userEmail:h(s,["user_email"],""),changes:s.changes??{},createdAt:h(s,["created_at"],"")}))}const Pt={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function tn(){return(await N("slack_notifications",{order:"event_type.asc"})).map(t=>({id:h(t,["id"],""),eventType:h(t,["event_type"],"new_order"),enabled:ee(t,["enabled"],!0),channel:h(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:h(t,["last_triggered_at"],"")}))}async function ti(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function ai(e=50){return(await N("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(s=>({id:h(s,["id"],""),eventType:h(s,["event_type"],""),channel:h(s,["channel"],""),message:h(s,["message"],""),status:h(s,["status"],"sent"),error:h(s,["error"],""),sentAt:h(s,["sent_at"],"")}))}async function si(e,t,s){const i=(await en()).find(y=>y.provider==="slack");if(!i||!i.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const r=i.config.webhook_url;if(!r)return{ok:!1,error:"Webhook URL未設定"};const p=(await tn()).find(y=>y.eventType===e&&y.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=s??p.channel??i.config.default_channel??"#general";try{const y=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Pt[e]} ${t}`,channel:u})}),f=y.ok,{supabaseInsert:v}=await E(async()=>{const{supabaseInsert:b}=await Promise.resolve().then(()=>z);return{supabaseInsert:b}},void 0);return await v("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:f?"sent":"failed",error:f?null:`HTTP ${y.status}`}),f?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const qt={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Ea={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function ni(){return(await N("prospects",{order:"updated_at.desc"})).map(t=>({id:h(t,["id"],""),companyName:h(t,["company_name"],""),contactName:h(t,["contact_name"],""),email:h(t,["email"],""),phone:h(t,["phone"],""),address:h(t,["address"],""),website:h(t,["website"],""),businessType:h(t,["business_type"],""),stage:h(t,["stage"],"cold"),source:h(t,["source"],""),expectedAmount:J(t.expected_amount),probability:J(t.probability),assignedStaffCode:h(t,["assigned_staff_code"],""),nextActionDate:h(t,["next_action_date"],""),nextAction:h(t,["next_action"],""),note:h(t,["note"],""),lastContactAt:h(t,["last_contact_at"],""),wonAt:h(t,["won_at"],""),lostAt:h(t,["lost_at"],""),lostReason:h(t,["lost_reason"],""),convertedCustomerCode:h(t,["converted_customer_code"],""),createdAt:h(t,["created_at"],"")}))}async function an(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function oi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ii(e){return(await N("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(s=>({id:h(s,["id"],""),prospectId:h(s,["prospect_id"],""),activityType:h(s,["activity_type"],"call"),title:h(s,["title"],""),description:h(s,["description"],""),activityDate:h(s,["activity_date"],""),result:h(s,["result"],""),staffCode:h(s,["staff_code"],"")}))}async function ri(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const sn=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function li(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function ci(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function di(){return(await Z("v_customer_map")).filter(t=>t.lat&&t.lng).map(t=>({customerCode:h(t,["customer_code"],""),name:h(t,["name"],""),phone:h(t,["phone"],""),areaCode:h(t,["area_code"],""),businessType:h(t,["business_type"],""),businessTypeName:h(t,["business_type_name"],""),address1:h(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:ee(t,["is_at_risk"],!1),isDormant:ee(t,["is_dormant"],!1),amount12m:k(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}const It=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function ui(){return(await Z("customer_churn_notes")).map(t=>({customerCode:h(t,["customer_code"],""),reason:h(t,["reason"],""),memo:h(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:h(t,["updated_at"],"")}))}async function pi(e){const{supabaseUpsert:t}=await E(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>z);return{supabaseUpsert:s}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function mi(){return(await N("delivery_locations",{order:"name.asc"})).map(t=>({id:h(t,["id"],""),customerCode:h(t,["customer_code"],""),name:h(t,["name"],""),postalCode:h(t,["postal_code"],""),address:h(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:h(t,["contact_name"],""),phone:h(t,["phone"],""),deliveryNote:h(t,["delivery_note"],""),isActive:ee(t,["is_active"],!0)}))}async function yi(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function hi(e=50){return(await N("call_logs",{order:"started_at.desc",limit:String(e)})).map(s=>({id:h(s,["id"],""),callDirection:h(s,["call_direction"],"inbound"),fromNumber:h(s,["from_number"],""),toNumber:h(s,["to_number"],""),matchedCustomerCode:h(s,["matched_customer_code"],""),matchedProspectId:h(s,["matched_prospect_id"],""),durationSeconds:J(s.duration_seconds),callStatus:h(s,["call_status"],"answered"),recordingUrl:h(s,["recording_url"],""),transcript:h(s,["transcript"],""),ivryCallId:h(s,["ivry_call_id"],""),startedAt:h(s,["started_at"],""),endedAt:h(s,["ended_at"],""),notes:h(s,["notes"],"")}))}async function nn(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function fi(e){const t=e.config.api_key,s=e.config.team_id;if(!t||!s)return{count:0,error:"IVRy API key または team_id 未設定"};try{const n=`https://api.ivry.jp/v1/teams/${s}/calls?limit=100`,i=await fetch(n,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!i.ok)return{count:0,error:`HTTP ${i.status}`};const c=(await i.json()).calls??[];let p=0;for(const u of c)await nn({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await rt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(n){return{count:0,error:n instanceof Error?n.message:String(n)}}}async function vi(e,t){const s=e.config.api_key,n=e.config.team_id;if(!s||!n)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let i=0;for(const r of t){if(!r.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${n}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({name:r.name,phone_number:r.phone,external_id:r.customerCode??"",note:r.note??""})})).ok&&i++}return{synced:i}}catch(i){return{synced:0,error:i instanceof Error?i.message:String(i)}}}async function gi(){return(await N("lead_lists",{order:"created_at.desc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),query:h(t,["query"],""),area:h(t,["area"],""),businessType:h(t,["business_type"],""),totalCount:J(t.total_count),source:h(t,["source"],"manual"),createdAt:h(t,["created_at"],"")}))}async function bi(e){return(await N("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(s=>({id:h(s,["id"],""),listId:h(s,["list_id"],""),companyName:h(s,["company_name"],""),address:h(s,["address"],""),phone:h(s,["phone"],""),website:h(s,["website"],""),email:h(s,["email"],""),businessType:h(s,["business_type"],""),rating:s.rating?Number(s.rating):void 0,reviewCount:J(s.review_count),lat:s.lat?Number(s.lat):void 0,lng:s.lng?Number(s.lng):void 0,placeId:h(s,["place_id"],""),status:h(s,["status"],"new"),convertedProspectId:h(s,["converted_prospect_id"],""),note:h(s,["note"],"")}))}async function $i(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function on(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function _i(e,t,s){const n=e.config.api_key;if(!n)return{results:[],error:"Google Maps API key 未設定"};const i=`${t} ${s}`.trim(),r=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(i)}&language=ja&key=${n}`;try{const c=await fetch(r);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const p=await c.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(y=>{const f=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:f?.lat,lng:f?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function wi(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},s=await an(t);return s&&await on({...e,status:"imported",convertedProspectId:t.id}),s}async function xi(){return(await N("workflow_orders",{order:"order_date.desc"})).map(t=>({id:h(t,["id"],""),orderNo:h(t,["order_no"],""),customerName:h(t,["customer_name"],""),customerCode:h(t,["customer_code"],""),orderDate:h(t,["order_date"],""),deliveryDate:h(t,["delivery_date"],""),stage:h(t,["stage"],"new"),totalAmount:J(t.total_amount),itemCount:J(t.item_count),priority:h(t,["priority"],"normal"),staffName:h(t,["staff_name"],""),notes:h(t,["notes"],"")}))}async function Si(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function ki(){return(await N("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),email:h(t,["email"],""),phone:h(t,["phone"],""),visitDate:h(t,["visit_date"],""),partySize:J(t.party_size)||1,language:h(t,["language"],"ja"),purpose:h(t,["purpose"],""),message:h(t,["message"],""),status:h(t,["status"],"new"),repliedAt:h(t,["replied_at"],""),confirmedTime:h(t,["confirmed_time"],""),createdAt:h(t,["created_at"],new Date().toISOString())}))}async function Pi(e){const{supabaseInsert:t}=await E(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>z);return{supabaseInsert:n}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const Ai=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function rn(){return(await Promise.all(Ai.map(async t=>{const[s,n]=await Promise.all([fa(t.table),N(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:s,lastSyncAt:n[0]?._synced_at??null}}))).sort((t,s)=>s.rowCount-t.rowCount)}async function _t(e,t,s=100){const n=(t-1)*s,[i,r]=await Promise.all([N(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(s),offset:String(n)}),fa(e)]);return{records:i,total:r}}async function ta(e){const t=await N("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const s=t[0].memo;if(typeof s=="string"&&s)try{const n=JSON.parse(s);return String(n.price_group??"")}catch{return""}return""}async function ln(e,t){if(e){const n=await N("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(n.length>0&&n[0].special_price)return J(n[0].special_price)}const s=await N("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return s.length>0&&s[0].default_sale_price?J(s[0].default_sale_price):0}const Ci=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Ei=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Li={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function Di(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const s=Ci,n={},i={};for(const u of s){n[u.code]={};for(const y of t){const f=parseInt(y.split("-")[1])-1,v=Li[u.code]??100,b=Math.round(v*Ei[f]*(.85+Math.random()*.3));n[u.code][y]=b,i[y]=(i[y]??0)+b}}const r={},c={},p={};for(const u of s){const y=t.map(b=>n[u.code][b]??0),f=y.reduce((b,w)=>b+w,0)/y.length,v=y.reduce((b,w)=>b+(w-f)**2,0)/y.length;r[u.code]=y.reduce((b,w)=>b+w,0),c[u.code]=f,p[u.code]=Math.sqrt(v)}return{months:t,products:s,matrix:n,totals:i,productTotals:r,productAvg:c,productStdDev:p}}async function qi(e=36){const t=(()=>{const b=new Date;return b.setMonth(b.getMonth()-e),`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`})(),s=await Z("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(s.length===0)return Di();const n=new Set,i=new Map,r={},c={};for(const b of s){const w=h(b,["year_month"],""),P=h(b,["product_code"],""),o=h(b,["product_name"],P),l=k(b,["quantity"],0);!w||!P||(n.add(w),i.set(P,o),r[P]||(r[P]={}),r[P][w]=l,c[w]=(c[w]??0)+l)}const p=[...n].sort(),u=[...i.entries()].map(([b,w])=>({code:b,name:w})),y={},f={},v={};for(const b of u){const w=p.map(l=>r[b.code]?.[l]??0),P=w.reduce((l,d)=>l+d,0)/(w.length||1),o=w.reduce((l,d)=>l+(d-P)**2,0)/(w.length||1);y[b.code]=w.reduce((l,d)=>l+d,0),f[b.code]=P,v[b.code]=Math.sqrt(o)}return{months:p,products:u,matrix:r,totals:c,productTotals:y,productAvg:f,productStdDev:v}}async function Ii(){return(await N("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:h(t,["product_code"],""),productName:h(t,["product_name"],""),unit:h(t,["unit"],"本"),avgMonthlyDemand:k(t,["avg_monthly_demand"],0),demandStdDev:k(t,["demand_std_dev"],0),leadTimeDays:k(t,["lead_time_days"],30),serviceLevel:k(t,["service_level"],.95),safetyStockQty:k(t,["safety_stock_qty"],0),reorderPoint:k(t,["reorder_point"],0),memo:h(t,["memo"],""),productionType:h(t,["production_type"],"monthly")}))}async function Ti(e){return(await N("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(s=>({id:h(s,["id"],""),yearMonth:h(s,["year_month"],e),productCode:h(s,["product_code"],""),productName:h(s,["product_name"],""),demandForecast:k(s,["demand_forecast"],0),safetyStockTarget:k(s,["safety_stock_target"],0),openingStock:k(s,["opening_stock"],0),requiredProduction:k(s,["required_production"],0),plannedQty:k(s,["planned_qty"],0),actualQty:k(s,["actual_qty"],0),status:h(s,["status"],"draft"),productionType:h(s,["production_type"],"monthly"),notes:h(s,["notes"],"")}))}async function Ni(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:s}=await E(async()=>{const{SUPABASE_URL:n,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>z);return{SUPABASE_URL:n,SUPABASE_ANON_KEY:i}},void 0);if(!s||e.length===0)return!1;try{const n=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),i=new URL("/rest/v1/product_safety_stock_params",t),r=await fetch(i.toString(),{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(n)});if(!r.ok){const c=await r.text();return console.error("saveSafetyStockParamsBulk failed:",r.status,c),!1}return!0}catch(n){return console.error("saveSafetyStockParamsBulk error:",n),!1}}async function Mi(e){const{supabaseUpsert:t}=await E(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>z);return{supabaseUpsert:n}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function Ri(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),s=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return s?s[1]:t.substring(0,6)}async function Oi(e){const[t,s]=e.split("-").map(Number),n=`${e}-01`,i=new Date(t,s,0).getDate(),r=`${e}-${String(i).padStart(2,"0")}`,c=await Z("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${n},sales_date.lte.${r})`,order:"sales_date.asc"}),p=await Z("customers",{select:"id,address1",address1:"not.is.null"}),u={};for(const f of p)f.address1&&(u[f.id]=Ri(f.address1));const y={};for(const f of c){const v=f.sales_date;if(!v)continue;const b=u[f.legacy_customer_code]||"住所未登録",w=Number(f.total_amount)||0;y[v]||(y[v]={date:v,entries:[],cityGroups:[],totalAmount:0,count:0}),y[v].entries.push({customerCode:f.legacy_customer_code||"",customerName:f.customer_name||"",city:b,amount:w}),y[v].totalAmount+=w,y[v].count++}for(const f of Object.values(y)){const v={};for(const b of f.entries)v[b.city]=(v[b.city]||0)+1;f.cityGroups=Object.entries(v).sort((b,w)=>w[1]-b[1]).map(([b,w])=>({city:b,count:w}))}return y}async function La(){return N("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function cn(e){const t=await N("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const s=await N("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:s}}async function ji(){const e=new Date().toISOString().slice(0,7)+"-01";return Z("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}const q=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Ca,CALENDAR_CATEGORY_LABELS:Aa,CHURN_REASONS:It,DEPT_LABELS:kt,INVOICE_TYPE_LABELS:Kt,JIKOMI_STATUS_LABELS:Bs,MATERIAL_CATEGORIES:sn,PROSPECT_STAGE_COLORS:Ea,PROSPECT_STAGE_LABELS:qt,ROLE_LABELS:St,SEASONAL_TEMPLATES:ga,SLACK_EVENT_LABELS:Pt,TAX_DEDUCTION_LABELS:ea,TAX_RATE_CATEGORIES:Xs,convertLeadToProspect:wi,deleteCalendarEvent:zo,deleteMailSender:Oo,deleteMaterial:ci,deletePrintLayout:No,deleteProspect:oi,deleteUserProfile:Wo,fetchAnalyticsByPeriod:to,fetchAnnouncements:Ns,fetchAuditLogs:ei,fetchAvailablePeriods:ao,fetchBillList:Hs,fetchBillingSummary:xa,fetchBrewingMonthlyTrend:mo,fetchBrewingPlanSummary:po,fetchBrewingSchedule:yo,fetchCalendarEvents:jo,fetchCallLogs:hi,fetchChurnAlerts:wo,fetchChurnNotes:ui,fetchCustomerAnalysis:zs,fetchCustomerEfficiency:Fs,fetchCustomerLedger:$a,fetchCustomerPriceGroup:ta,fetchCustomerPricing:Wt,fetchCustomerProductBreakdown:lo,fetchDeliveryLocations:mi,fetchDeliveryNote:wa,fetchDeliverySchedule:_o,fetchDemandAnalysis:qi,fetchDemandForecasts:$o,fetchEntityMonthlySales:uo,fetchFaxInbox:Uo,fetchIntegrationSettings:en,fetchInvoices:nt,fetchJikomiList:Vs,fetchKenteiList:Ys,fetchLeadItems:bi,fetchLeadLists:gi,fetchMailSenders:Mo,fetchMapCustomers:di,fetchMasterStats:ba,fetchMaterialList:Zt,fetchMyProfile:Xo,fetchOrderHeaders:ji,fetchPayableList:Qs,fetchPaymentStatus:Es,fetchPeriodChartData:io,fetchPipelineMeta:Ls,fetchPrintLayouts:Io,fetchProductABC:Ao,fetchProductCustomerBreakdown:co,fetchProductDaily:Po,fetchProductMonthlyShipments:bo,fetchProductPower:js,fetchProductPrice:ln,fetchProductShipmentsFromTable:ko,fetchProductionPlan:Ti,fetchProspectActivities:ii,fetchProspects:ni,fetchPurchaseList:Us,fetchQuoteList:La,fetchQuoteWithLines:cn,fetchRawMaterialStock:Gs,fetchRawRecords:_t,fetchRawTableList:rn,fetchSafetyStockParams:Ii,fetchSalesAnalytics:_a,fetchSalesReport:Dt,fetchSalesSummary:Cs,fetchSeasonalProfiles:So,fetchShipmentCalendar:Oi,fetchShopifyOrders:Vo,fetchSlackLogs:ai,fetchSlackRules:tn,fetchStaffCustomerBreakdown:no,fetchStaffProductBreakdown:oo,fetchStaffTotalsByPeriod:so,fetchStoreOrders:Ws,fetchStoreSales:Pa,fetchSyncDashboard:Ds,fetchSystemSetting:As,fetchTankList:Js,fetchTaxDeclaration:ka,fetchTourInquiriesFromDb:ki,fetchUserProfiles:Go,fetchVisitPriorities:xo,fetchWorkflowOrdersFromDb:xi,generateTaxCSV:Lo,generateTaxXML:Ks,ocrFaxImage:Qo,periodToDateRange:qs,prevYearFilter:ro,recalculateTaxDeclaration:Do,recordAudit:Zo,resolveProductPrice:Sa,saveBrewingSchedule:ho,saveCalendarEvent:Fo,saveCallLog:nn,saveChurnNote:pi,saveDeliveryLocation:yi,saveEmailCampaign:$t,saveFaxRecord:Ho,saveIntegrationSetting:rt,saveInvoice:Ts,saveLeadItem:on,saveLeadList:$i,saveMailSender:Ro,saveMaterial:li,savePrintLayout:To,saveProductionPlan:Mi,saveProspect:an,saveProspectActivity:ri,saveSafetyStockParamsBulk:Ni,saveSlackRule:ti,saveTaxDeclaration:qo,saveTourInquiry:Pi,saveUserProfile:Ko,saveWorkflowOrder:Si,searchPlaces:_i,sendEmailCampaign:Zs,sendSlackNotification:si,submitFeatureRequest:Ms,syncGoogleCalendar:Yo,syncIvryCallLogs:fi,syncPhoneBookToIvry:vi,syncShopifyOrders:Bo,updateCustomer:Rs,updateProduct:Os,upsertBrewingStock:fo,upsertSystemSetting:je},Symbol.toStringTag,{value:"Module"}));function Te(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Fi={open:"未締め",closed:"締め済"};function zi(e,t){const s=e.customers.map(n=>`
      <tr>
        <td>
          <div class="table-title">${n.customerName}</div>
          <div class="table-sub mono">${n.customerCode}</div>
        </td>
        <td class="numeric">${n.closingDay}日</td>
        <td class="numeric">${Te(n.salesAmount)}</td>
        <td class="numeric">${Te(n.taxAmount)}</td>
        <td class="numeric">${Te(n.prevBalance)}</td>
        <td class="numeric">${Te(n.paymentAmount)}</td>
        <td class="numeric"><strong>${Te(n.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${n.status==="closed"?"success":"warning"}">${Fi[n.status]}</span>
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
        <p class="kpi-value">${Te(e.totalBilling)}</p>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}const Bi={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Vi={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Va(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ct(e){const t=Vi[e],s=Bi[e].map(n=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Va(n.title)}</p>
            <p class="category-card-description">${Va(n.description)}</p>
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
      ${s}
    </section>
  `}function dn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function tt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ji(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${dn(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${tt(t.amount)}</td>
        </tr>
      `).join("")}function Yi(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${dn(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${tt(t.amount)}</td>
        </tr>
      `).join("")}function Ui(e,t){return`
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
            <dd>${tt(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${tt(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${tt(e.balanceAmount)}</dd>
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
            <tbody>${Ji(e)}</tbody>
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
            <tbody>${Yi(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function Qe(e,t,s){const n=e.findIndex(r=>r.column===t);if(n>=0){if(e[n].direction==="asc"){const c=[...e];return c[n]={column:t,direction:"desc"},c}return e.filter((c,p)=>p!==n)}const i={column:t,direction:"asc"};return s?[...e,i]:[i]}function Qi(e,t){const s=e.findIndex(r=>r.column===t);if(s<0)return'<span class="sort-icon">⇅</span>';const n=e[s].direction==="asc"?"↑":"↓",i=e.length>1?`<small class="sort-badge">${s+1}</small>`:"";return`<span class="sort-icon active">${n}${i}</span>`}function F(e,t,s,n=""){return`<th class="sortable ${n}" data-sort-col="${e}">${t} ${Qi(s,e)}</th>`}function Ja(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),s=Number(t);return Number.isFinite(s)?s:t.toLowerCase()}function Je(e,t,s){return t.length===0?e:[...e].sort((n,i)=>{for(const{column:r,direction:c}of t){const p=s[r];if(!p)continue;const u=Ja(n[p]),y=Ja(i[p]);let f=0;if(typeof u=="number"&&typeof y=="number"?f=u-y:f=String(u).localeCompare(String(y),"ja"),f!==0)return c==="asc"?f:-f}return 0})}const Hi={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Ya={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},He={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Gi(e){const t=new Date().toISOString().slice(0,10);return e.map(s=>({date:s.date,customerName:s.customerName,productName:s.productName,quantity:s.quantity,status:s.date>t?"scheduled":"delivered"}))}function Xi(e){const[t,s]=e.split("-").map(Number);return new Date(t,s,0).getDate()}function Ki(e){const[t,s]=e.split("-").map(Number);return new Date(t,s-1,1).getDay()}function un(e,t){const s=Xi(t),n=Ki(t),[i,r]=t.split("-").map(Number),c=new Map;e.forEach($=>{if($.date.slice(0,7)===t){const x=$.date.slice(0,10);c.has(x)||c.set(x,[]),c.get(x).push($)}});const p=e.filter($=>$.date.slice(0,7)===t),u=p.reduce(($,x)=>$+x.quantity,0),y=new Set(p.map($=>$.date)).size,f=new Date().toISOString().slice(0,10),v=["日","月","火","水","木","金","土"].map($=>`<th class="dcal-header">${$}</th>`).join("");let b="",w=1;for(let $=0;$<6&&!(w>s&&$>0);$++){b+="<tr>";for(let x=0;x<7;x++)if($===0&&x<n||w>s)b+='<td class="dcal-cell dcal-empty"></td>';else{const A=`${i}-${String(r).padStart(2,"0")}-${String(w).padStart(2,"0")}`,S=c.get(A)||[],C=A===f,I=S.reduce((L,T)=>L+T.quantity,0);b+=`
          <td class="dcal-cell ${C?"dcal-today":""}">
            <div class="dcal-day">${w}</div>
            ${S.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${S[0].status}">${S.length}件 ${I}本</div>
              </div>
            `:""}
          </td>`,w++}b+="</tr>"}const[P,o]=r===1?[i-1,12]:[i,r-1],[l,d]=r===12?[i+1,1]:[i,r+1],m=`${P}-${String(o).padStart(2,"0")}`,g=`${l}-${String(d).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${i}年${r}月: ${y}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${m}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${i}年${r}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${g}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${v}</tr></thead>
        <tbody>${b}</tbody>
      </table>
    </section>
  `}function Wi(e,t){const s=t==="all"?e:e.filter(p=>p.segment===t),n={all:e.length};e.forEach(p=>{n[p.segment]=(n[p.segment]??0)+1});const r=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":Ya[p]??p} (${n[p]??0})
      </button>
    `).join(""),c=s.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${He[p.segment]??"#718096"};">${Ya[p.segment]??p.segment}</span></td>
        <td class="numeric">${p.avgMonthly>0?p.avgMonthly.toLocaleString():"—"}</td>
        <td class="numeric" style="font-weight:700;">${p.nextMonthForecast>0?p.nextMonthForecast.toLocaleString():"—"}</td>
        <td class="numeric">${p.annualForecast>0?p.annualForecast.toLocaleString():"—"}</td>
        <td class="numeric">${p.safetyStock>0?p.safetyStock.toLocaleString():"—"}</td>
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
            <li><span class="segment-badge" style="background:${He.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${He["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${He["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${He["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
          </ul>
        </div>
      </div>

      <div class="button-group" style="margin-bottom:12px;">${r}</div>

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
  `}function Zi(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${un(e.deliveries,e.calendarMonth)}
    ${Wi(e.forecasts,e.selectedSegment)}
  `}function er(e,t){return un(e,t)}const dt={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function Ua(e,t){const s=new Date(e);return s.setFullYear(s.getFullYear()+t),s.toISOString()}function Rt(e,t,s){if(t==="all")return e;const n=new Date,i=n.toISOString().slice(0,10),r=new Date(n);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===i);case"month":return e.filter(c=>c.date.slice(0,7)===i.slice(0,7));case"future":{const c=new Date(n.getFullYear(),n.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=c)}case"90days":return r.setDate(r.getDate()-90),e.filter(c=>c.date>=r.toISOString());case"year":return r.setFullYear(r.getFullYear()-1),e.filter(c=>c.date>=r.toISOString());case"custom":return!s?.start||!s?.end?e:e.filter(c=>{const p=c.date.slice(0,10);return p>=s.start&&p<=s.end})}}function ce(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ot(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function tr(e){const n={top:20,right:20,bottom:30,left:50},i=760-n.left-n.right,r=260-n.top-n.bottom,c=Math.max(...e.map(f=>f.amount),1),p=i/e.length,u=e.map((f,v)=>{const b=f.amount/c*r,w=n.left+v*p+4,P=n.top+r-b,o=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(f.date));return`
        <g>
          <rect x="${w}" y="${P}" width="${Math.max(p-8,8)}" height="${b}" rx="4" fill="#0F5B8D" opacity="${.58+v/e.length*.34}" />
          ${v%5===0?`<text x="${w+6}" y="252" class="chart-axis">${o}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(f=>{const v=n.top+r-r*f,b=Math.round(c*f/1e3);return`
        <g>
          <line x1="${n.left}" y1="${v}" x2="${760-n.right}" y2="${v}" class="chart-grid" />
          <text x="6" y="${v+4}" class="chart-axis">${b.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function ar(e,t,s,n,i="month",r,c=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=Rt(e.allDailySales,i,r),y=u.reduce((M,X)=>M+X.amount,0),f=u.reduce((M,X)=>M+X.bottles,0),v=u.reduce((M,X)=>M+X.volumeMl,0),b=u.length,w=f>0?Math.round(y/f):0,P=v>0?Math.round(y/(v/1e3)):0,o=new Date,l=o.toISOString().slice(0,10),d=l.slice(0,7),m=Rt(e.allDailySales,"month").filter(M=>M.date.slice(0,10)<=l),g=m.reduce((M,X)=>M+X.amount,0);m.reduce((M,X)=>M+X.bottles,0);const $=o.getDate();new Date(o.getFullYear(),o.getMonth()+1,0).getDate();const A=(n?.orderHeaders??[]).filter(M=>M.sales_date.slice(0,7)===d),S=A.reduce((M,X)=>M+Number(X.total_amount),0),C=A.length,I=Rt(e.allDailySales,"month"),L=I.reduce((M,X)=>M+X.bottles,0),T=S>0?S:I.reduce((M,X)=>M+X.amount,0),R=S>0?"orders":"extrapolation",K=(u.length>0?e.allDailySales.filter(M=>{const X=u[0]?.date??"",Ue=u[u.length-1]?.date??"",De=Ua(X,-1),qe=Ua(Ue,-1);return M.date>=De&&M.date<=qe}):[]).reduce((M,X)=>M+X.amount,0),se=K>0?(y-K)/K*100:0,oe=se>0?"+":"",ve=e.salesRecords.slice(0,10).map(M=>`
            <tr>
              <td class="mono">${M.documentNo}</td>
              <td>${Ot(M.date)}</td>
              <td>${M.customerName}</td>
              <td class="numeric">${ce(M.amount)}</td>
            </tr>
          `).join(""),ie=["today","month","future","90days","year","all"].map(M=>`<button class="button ${M===i?"primary":"secondary"} small" type="button" data-period="${M}">${dt[M]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${Ot(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${ie}</div>
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
        <p class="kpi-value">${ce(e.kpis.todaySales)}</p>
        <p class="kpi-sub">${e.kpis.todaySales>0?`${new Date().getMonth()+1}/${new Date().getDate()} 時点`:"本日データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月実績（本日まで）</p>
        <p class="kpi-value">${ce(g)}</p>
        <p class="kpi-sub">${$}日経過 / ${m.length}営業日 / 日平均 ${m.length>0?ce(Math.round(g/m.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${ce(T)}</p>
        <p class="kpi-sub">${R==="orders"?`受注確定 ${C}件`:`出荷見込 ${L.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${se>=0?"#2f855a":"#c53d3d"}">${K>0?`${oe}${se.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${K>0?ce(K):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${ce(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${i!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${dt[i]}売上</p>
        <p class="kpi-value">${ce(y)}</p>
        <p class="kpi-sub">${b}日間${b>0?` / 日平均 ${ce(Math.round(y/b))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${f.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ce(w)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(v/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${ce(P)}</p>
      </article>
    </section>

    ${n?.masterCounts?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先マスタ</p>
        <p class="kpi-value">${n.masterCounts.customers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品マスタ</p>
        <p class="kpi-value">${n.masterCounts.products.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">仕入先</p>
        <p class="kpi-value">${n.masterCounts.suppliers.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">Supabase正規化済み</p>
      </article>
    </section>
    `:""}

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">${dt[i]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${tr(u.length>0?u:e.dailySales)}
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
              <dd>${Ot(t.lastSyncAt)}</dd>
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
          <tbody>${ve}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${dt[i]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${F("date","日付",c)}
              ${F("amount","売上",c,"numeric")}
              ${F("bottles","本数",c,"numeric")}
              ${F("volumeMl","液体量(L)",c,"numeric")}
              ${F("pricePerBottle","本単価",c,"numeric")}
              ${F("pricePerLiter","L単価",c,"numeric")}
            </tr>
          </thead>
          <tbody>${Je(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(M=>`
            <tr>
              <td class="mono">${M.date.slice(0,10)}</td>
              <td class="numeric">${ce(M.amount)}</td>
              <td class="numeric">${M.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(M.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${ce(M.pricePerBottle)}</td>
              <td class="numeric">${ce(M.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${n?sr(n):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function sr(e){const t=new Date().toISOString().slice(0,10),s=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),n=e.tourInquiries.filter(p=>p.status==="new").length,i=e.churnSummary,r=i?i.atRiskCount+i.dormantCount+i.decliningCount:null,c=i?`<article class="panel kpi-card ${i.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
        <p class="panel-title">🔴 要対応顧客</p>
        <p class="kpi-value">${r}社</p>
        <p class="kpi-sub">離反${i.atRiskCount} / 休眠${i.dormantCount} / 下落${i.decliningCount}</p>
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
      <article class="panel kpi-card ${n>0?"kpi-alert":""}">
        <p class="panel-title">未対応問合せ</p>
        <p class="kpi-value">${n}件</p>
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
        ${i?`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
              <div style="background:#fff5f5;border:1px solid #fed7d7;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#c53030;font-weight:600;margin-bottom:4px;">🔴 離反リスク</div>
                <div style="font-size:32px;font-weight:700;color:#c53030;">${i.atRiskCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
              <div style="background:#fffaf0;border:1px solid #fbd38d;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#c05621;font-weight:600;margin-bottom:4px;">🟠 休眠</div>
                <div style="font-size:32px;font-weight:700;color:#c05621;">${i.dormantCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
              <div style="background:#fffff0;border:1px solid #f6e05e;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#975a16;font-weight:600;margin-bottom:4px;">🟡 下落中</div>
                <div style="font-size:32px;font-weight:700;color:#975a16;">${i.decliningCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
            </div>
            <p style="margin:12px 0 0;font-size:12px;color:var(--text-secondary);">対象売上合計リスク: <strong>${new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(i.totalImpact)}</strong></p>`:'<p class="empty-note" style="cursor:pointer;" data-link="/churn-alert">クリックして詳細を確認</p>'}
      </article>

      <aside class="panel">
        <div class="panel-header">
          <div><h2>📅 直近の予定</h2></div>
          <button class="button secondary" data-link="/calendar">カレンダー</button>
        </div>
        ${s.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${s.map(p=>{const u=new Date(p.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${p.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${u.getMonth()+1}/${u.getDate()} ${p.isAllDay?"終日":u.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${p.title}</div>
                  ${p.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${p.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?er(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?nr(e.orderHeaders):""}
  `}function nr(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),n=new Date().toISOString().slice(0,10),i=n.slice(0,7),r=new Map;for(const v of e){const b=v.sales_date.slice(0,7),w=r.get(b)??{count:0,total:0};r.set(b,{count:w.count+1,total:w.total+Number(v.total_amount)})}const c=[...r.keys()].sort(),p=e.reduce((v,b)=>v+Number(b.total_amount),0),u=c.map(v=>{const{count:b,total:w}=r.get(v);return`<tr>
      <td class="mono" style="font-weight:700;">${v===i?`${v}（当月）`:v}</td>
      <td class="numeric">${b.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(w)}</td>
    </tr>`}).join(""),y=e.filter(v=>v.sales_date>=n).slice(0,30),f=y.map(v=>`<tr>
    <td class="mono">${v.sales_date}</td>
    <td>${v.customer_name||"―"}</td>
    <td class="numeric">${t.format(Number(v.total_amount))}</td>
  </tr>`).join("");return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>受注明細サマリー</h2>
          <p class="panel-caption">当月以降の受注 ${e.length}件</p>
        </div>
        <span style="font-size:1.2rem;font-weight:700;color:var(--accent);">${t.format(p)}</span>
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
          <tbody>${f}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function or(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function Ne(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ir(e,t){const s=e.lines.length?e.lines.map((i,r)=>`
          <tr>
            <td class="numeric">${r+1}</td>
            <td class="mono">${i.productCode}</td>
            <td>${i.productName}</td>
            <td class="numeric">${i.quantity.toLocaleString("ja-JP")}</td>
            <td>${i.unit}</td>
            <td class="numeric">${Ne(i.unitPrice)}</td>
            <td class="numeric">${Ne(i.amount)}</td>
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
            <tr><th>納品日</th><td>${or(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${Ne(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${Ne(n)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${Ne(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${Ne(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function he(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function rr(e){return he(e).replaceAll(`
`,"<br />")}function lr(e){const s=[...Object.values(ga),{id:"custom",season:"カスタム",subject:"",body:""}].map(i=>`
        <button
          class="template-card ${e.selectedTemplateId===i.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${i.id}"
        >
          <span class="template-card-kicker">${i.season}</span>
          <strong>${he(i.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),n=e.previewRecipients.length?e.previewRecipients.map(i=>`
            <li>
              <span>${he(i.name)}</span>
              <span class="table-sub">${he(i.email)} / ${he(i.area)}</span>
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
          <input id="email-subject" type="text" value="${he(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${he(e.body)}</textarea>
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
            ${e.senders.map(i=>`<option value="${i.id}" ${i.id===e.senderId?"selected":""}>${he(i.name)} &lt;${he(i.email)}&gt;${i.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${he(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?rr(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${he(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function ye(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ut(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function cr(e,t){const s=[ut("得意先",t.customers.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ye(i.name)}</strong>
            <span class="table-sub mono">${ye(i.code)}</span>
          </button>
        `)),ut("商品",t.products.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ye(i.name)}</strong>
            <span class="table-sub mono">${ye(i.code)}</span>
          </button>
        `)),ut("伝票",t.documents.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${ye(i.documentNo)}</strong>
            <span class="table-sub">${ye(i.customerName)} / ${ye(i.date)}</span>
          </button>
        `)),ut("ページ",t.pages.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${ye(i.path)}"
          >
            <strong>${ye(i.title)}</strong>
            <span class="table-sub mono">${ye(i.path)}</span>
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
            value="${ye(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${s||n}
          </div>
        </div>
      </div>
    </div>
  `}function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function pn(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${Ge(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${Ge(e.title)}">
        <div class="modal-header">
          <h2>${Ge(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${Ge(e.placeholder)}"
            value="${Ge(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function pt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Qa(e){return e.trim().toLowerCase()}function dr(e,t){const s=Qa(t),n=e.filter(r=>s?[r.code,r.name,r.name].map(Qa).some(c=>c.includes(s)):!0).slice(0,50),i=n.length?`
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
              ${n.map(r=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${pt(r.code)}"
                      data-name="${pt(r.name)}"
                    >
                      <td class="mono">${pt(r.code)}</td>
                      <td>${pt(r.name)}</td>
                      <td>${r.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return pn({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:i,emptyMessage:"該当する得意先が見つかりません。"})}function ur(e){return e.toISOString().slice(0,10)}function Ee(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Se(e,t){return e[t]?`<div class="field-error">${Ee(e[t])}</div>`:""}function Me(e,t,s=""){return[s,e[t]?"has-error":""].filter(Boolean).join(" ")}function pr(e,t,s,n){const i=Object.keys(Kt).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${Kt[u]}</option>`).join(""),r=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${Me(n,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Ee(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${Se(n,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${Me(n,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Ee(u.productName)}" placeholder="商品名" />
          ${Se(n,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${Me(n,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${Se(n,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${Me(n,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${Se(n,`lines.${y}.unitPrice`)}
        </td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${y}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${y}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),c=e.lines.reduce((u,y)=>u+y.amount,0),p=Math.floor(c*10/110);return`
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
          <select id="inv-type">${i}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${Me(n,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||ur(new Date)}" />
          ${Se(n,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${Me(n,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Ee(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${Se(n,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${Ee(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${Ee(e.staffCode)}" />
        </label>
      </div>
      ${Se(n,"lines")}
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
          <tbody id="invoice-lines">${r||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(c-p).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${p.toLocaleString("ja-JP")} 円</span>
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Ee(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${s?"disabled":""}>
        ${s?"保存中…":"保存する"}
      </button>
    </div>
  `}function mr(e){return"¥"+e.toLocaleString("ja-JP")}function yr(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const hr={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},fr={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},vr={sake:"酒販用",standard:"通常"};function gr(e,t){return`
    <section class="page-head">
      <div><p class="eyebrow">見積書</p><h1>見積一覧</h1></div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="quote-new">＋ 新規作成</button>
        <a class="button secondary" href="/quote-settings" data-link="/quote-settings">⚙ 会社設定</a>
      </div>
    </section>

    <section class="panel">
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
          <tbody>${t?'<tr><td colspan="8" class="empty-row">読み込み中…</td></tr>':e.length===0?'<tr><td colspan="8" class="empty-row">見積書がありません</td></tr>':e.map(n=>`
      <tr>
        <td class="mono">${n.quote_no}</td>
        <td>${yr(n.quote_date)}</td>
        <td>${n.customer_name||"（未選択）"}</td>
        <td>${n.subject||""}</td>
        <td class="numeric">${mr(n.total_amount)}</td>
        <td><span class="badge ${fr[n.status]??"badge-gray"}">${hr[n.status]??n.status}</span></td>
        <td>${vr[n.template_type]??n.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${n.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${n.id}" data-quote-no="${n.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const mn="kanei-quote-settings",yn=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],wt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function aa(){try{const e=localStorage.getItem(mn);if(e)return{...wt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...wt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...wt}}function Le(e){localStorage.setItem(mn,JSON.stringify(e))}function be(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function re(e,t,s,n="text",i=""){return`<div class="form-row"><label>${t}</label><input type="${n}" id="${e}" value="${be(s)}" placeholder="${be(i)}" /></div>`}function br(e,t,s,n){const i=n.map(r=>`<option value="${be(r)}" ${s===r?"selected":""}>${be(r)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${i}</select></div>`}function $r(e){return`
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
        ${re("qs-company-name","会社名",e.companyName)}
        ${re("qs-company-postal","郵便番号",e.companyPostal,"text","257-0014")}
        ${re("qs-company-addr1","住所1",e.companyAddress1)}
        ${re("qs-company-addr2","住所2",e.companyAddress2,"text","建物名等")}
        ${re("qs-company-tel","電話番号",e.companyTel)}
        ${re("qs-company-fax","FAX番号",e.companyFax)}
        ${re("qs-company-email","メール",e.companyEmail,"email")}
        ${re("qs-company-regno","適格請求書番号",e.companyRegistrationNo,"text","T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>振込口座</h2></div>
      <div class="form-grid-2">
        ${re("qs-bank-name","銀行名",e.bankName,"text","横浜銀行")}
        ${re("qs-bank-branch","支店名",e.bankBranch,"text","秦野支店")}
        ${br("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
        ${re("qs-bank-no","口座番号",e.bankAccountNo,"text","1234567")}
        ${re("qs-bank-holder","口座名義（カナ）",e.bankAccountHolder,"text","カ）カナイシュゾウテン")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${re("qs-payment-terms","支払条件",e.defaultPaymentTerms,"text","月末締め翌月末払い")}
        ${re("qs-header-note","書類上部メモ",e.defaultHeaderNote,"text","下記のとおりお見積り申し上げます。")}
        ${re("qs-footer-note","書類下部メモ",e.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${yn.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${be(t.value)}"
            title="${be(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${be(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${be(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${be(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${be(e.accentColor||"#0968e5")}</code>
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
  `}function _r(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Da(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:_r(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Da();function O(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function pe(e){return"¥"+e.toLocaleString("ja-JP")}function jt(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function hn(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function fn(e,t,s){return"#"+[e,t,s].map(n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0")).join("")}function At(e,t){const[s,n,i]=hn(e);return fn(s+(255-s)*t,n+(255-n)*t,i+(255-i)*t)}function vn(e,t){const[s,n,i]=hn(e);return fn(s*(1-t),n*(1-t),i*(1-t))}function wr(e){const t=vn(e,.15),s=At(e,.88),n=At(e,.96);return`
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:11px; color:#1a1a2e; padding:16mm 18mm; }
.q-doc { max-width: 720px; margin: 0 auto; }
.q-title-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; border-bottom:3px solid ${e}; padding-bottom:10px; }
.q-title { font-size:22px; font-weight:700; letter-spacing:0.3em; color:${e}; padding-top:4px; }
.q-seller { display:flex; align-items:flex-start; gap:8px; font-size:10px; }
.q-seller-info { text-align:right; }
.q-seller-name { font-size:13px; font-weight:700; margin-bottom:3px; }
.q-seller-sub { color:#444; margin-top:1px; line-height:1.5; }
.q-regno { color:#777; font-size:9px; }
.q-parties { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:14px; }
.q-customer { flex:1; }
.q-customer-name { font-size:16px; font-weight:700; border-bottom:2px solid #333; padding-bottom:3px; margin-bottom:4px; }
.q-customer-addr { font-size:10px; color:#555; line-height:1.6; }
.q-meta-table { font-size:10px; border-collapse:collapse; }
.q-meta-table th { text-align:left; padding:2px 8px 2px 0; color:#666; white-space:nowrap; font-weight:400; }
.q-meta-table td { font-weight:600; text-align:right; padding-left:12px; }
.q-total-banner { display:flex; justify-content:space-between; align-items:center; background:${e}; color:white; padding:10px 16px; border-radius:4px; margin-bottom:14px; }
.q-total-label { font-size:12px; }
.q-total-amount { font-size:20px; font-weight:700; }
.q-subject { font-size:12px; font-weight:600; margin-bottom:8px; }
.q-note { font-size:10px; color:#555; margin-bottom:10px; }
.q-items { width:100%; border-collapse:collapse; margin-bottom:12px; font-size:10px; }
.q-items th { background:${e}; color:white; padding:5px 6px; font-weight:600; text-align:center; border:1px solid ${t}; }
.q-items td { padding:4px 6px; border:1px solid #d0d8e8; }
.q-items tbody tr:nth-child(even) td { background:${n}; }
.q-items tfoot td { padding:4px 6px; border:1px solid #d0d8e8; }
.q-total-row td { font-weight:700; font-size:12px; background:${s}; border-top:2px solid ${e}; }
.q-conditions { width:55%; border-collapse:collapse; margin-bottom:12px; font-size:10px; }
.q-conditions th { background:#f0f0f0; padding:4px 8px; text-align:left; border:1px solid #ccc; width:90px; font-weight:600; }
.q-conditions td { padding:4px 8px; border:1px solid #ccc; }
.q-remarks { border:1px solid #ddd; padding:8px; font-size:10px; margin-bottom:10px; border-radius:3px; }
.q-remarks-label { font-weight:700; margin-bottom:3px; }
.q-footer-note { font-size:9px; color:#777; margin-bottom:8px; }
.billing-box { border-top:1px solid #e0e0e0; padding-top:8px; font-size:10px; color:#555; line-height:1.6; }
@media print { body { padding:10mm 12mm; } }
`}function xr(e){const t=vn(e,.15),s=At(e,.88),n=At(e,.96);return`
.q-doc { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:13px; color:#1a1a2e; max-width:720px; margin:0 auto; }
.q-doc * { box-sizing:border-box; margin:0; padding:0; }
.q-doc .q-title-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; border-bottom:3px solid ${e}; padding-bottom:10px; }
.q-doc .q-title { font-size:24px; font-weight:700; letter-spacing:0.3em; color:${e}; padding-top:4px; }
.q-doc .q-seller { display:flex; align-items:flex-start; gap:10px; font-size:12px; }
.q-doc .q-seller-info { text-align:right; }
.q-doc .q-seller-name { font-size:14px; font-weight:700; margin-bottom:4px; }
.q-doc .q-seller-sub { color:#444; margin-top:2px; line-height:1.5; }
.q-doc .q-regno { color:#777; font-size:11px; }
.q-doc .q-parties { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:16px; }
.q-doc .q-customer { flex:1; }
.q-doc .q-customer-name { font-size:18px; font-weight:700; border-bottom:2px solid #333; padding-bottom:4px; margin-bottom:4px; }
.q-doc .q-customer-addr { font-size:12px; color:#555; line-height:1.6; }
.q-doc .q-meta-table { font-size:12px; border-collapse:collapse; }
.q-doc .q-meta-table th { text-align:left; padding:2px 10px 2px 0; color:#666; white-space:nowrap; font-weight:400; }
.q-doc .q-meta-table td { font-weight:600; text-align:right; padding-left:14px; }
.q-doc .q-total-banner { display:flex; justify-content:space-between; align-items:center; background:${e}; color:white; padding:12px 18px; border-radius:6px; margin-bottom:16px; }
.q-doc .q-total-label { font-size:13px; }
.q-doc .q-total-amount { font-size:22px; font-weight:700; }
.q-doc .q-subject { font-size:13px; font-weight:600; margin-bottom:10px; }
.q-doc .q-note { font-size:12px; color:#555; margin-bottom:12px; }
.q-doc .q-table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; margin-bottom:14px; }
.q-doc .q-items { width:100%; border-collapse:collapse; font-size:12px; min-width:460px; }
.q-doc .q-items th { background:${e}; color:white; padding:7px 8px; font-weight:600; text-align:center; border:1px solid ${t}; white-space:nowrap; }
.q-doc .q-items td { padding:6px 8px; border:1px solid #d0d8e8; }
.q-doc .q-items tbody tr:nth-child(even) td { background:${n}; }
.q-doc .q-items tfoot td { padding:6px 8px; border:1px solid #d0d8e8; }
.q-doc .q-total-row td { font-weight:700; font-size:13px; background:${s}; border-top:2px solid ${e}; }
.q-doc .q-conditions { width:100%; max-width:380px; border-collapse:collapse; margin-bottom:14px; font-size:12px; }
.q-doc .q-conditions th { background:#f0f0f0; padding:5px 10px; text-align:left; border:1px solid #ccc; width:100px; font-weight:600; white-space:nowrap; }
.q-doc .q-conditions td { padding:5px 10px; border:1px solid #ccc; }
.q-doc .q-remarks { border:1px solid #ddd; padding:10px; font-size:12px; margin-bottom:12px; border-radius:4px; line-height:1.6; }
.q-doc .q-remarks-label { font-weight:700; margin-bottom:4px; }
.q-doc .q-footer-note { font-size:11px; color:#777; margin-bottom:10px; }
.q-doc .billing-box { border-top:1px solid #e0e0e0; padding-top:10px; font-size:12px; color:#555; line-height:1.7; }
@media (max-width:600px) {
  .q-doc { font-size:13px; }
  .q-doc .q-title { font-size:20px; letter-spacing:0.15em; }
  .q-doc .q-title-row { flex-direction:column; gap:10px; }
  .q-doc .q-seller { justify-content:flex-end; }
  .q-doc .q-parties { flex-direction:column; gap:12px; }
  .q-doc .q-meta-table { align-self:flex-end; }
  .q-doc .q-customer-name { font-size:16px; }
  .q-doc .q-total-banner { padding:10px 14px; }
  .q-doc .q-total-amount { font-size:20px; }
  .q-doc .q-conditions { max-width:100%; }
  .q-doc .q-items { min-width:380px; font-size:11px; }
  .q-doc .q-items th, .q-doc .q-items td { padding:5px 5px; }
}
`}function gn(e,t){const s=e.lines.reduce((w,P)=>w+P.amount,0),n=Math.round(s*e.taxRate/100),i=s+n,r=e.templateType==="sake",c=r?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=r?9:6,u=e.lines.map((w,P)=>{const o=r?`<td style="font-size:9px;">${O(w.janCode)}</td><td style="text-align:center;">${w.caseQty??""}</td><td style="text-align:right;">${w.retailPrice!=null?pe(w.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${P+1}</td>
      <td class="mono" style="font-size:9px;">${O(w.productCode)}</td>
      <td>${O(w.productName)}</td>
      ${o}
      <td style="text-align:right;">${w.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${O(w.unit)}</td>
      <td style="text-align:right;">${pe(w.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[];e.validUntil&&y.push(`<tr><th>有効期限</th><td>${jt(e.validUntil)}</td></tr>`),e.paymentTerms&&y.push(`<tr><th>支払条件</th><td>${O(e.paymentTerms)}</td></tr>`),e.deliveryDate&&y.push(`<tr><th>納期</th><td>${O(e.deliveryDate)}</td></tr>`),e.deliveryPlace&&y.push(`<tr><th>納品場所</th><td>${O(e.deliveryPlace)}</td></tr>`);const f=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),v=f?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${O(f)}</p>
    </div>
  `:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=書類名、右=自社情報（枠なし・右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-seller">
      ${t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:""}
      <div class="q-seller-info">
        <p class="q-seller-name">${O(t.companyName)}</p>
        ${t.companyPostal?`<p class="q-seller-sub">〒${O(t.companyPostal)}</p>`:""}
        ${t.companyAddress1?`<p class="q-seller-sub">${O(t.companyAddress1)}${t.companyAddress2?" "+O(t.companyAddress2):""}</p>`:""}
        ${t.companyTel?`<p class="q-seller-sub">TEL: ${O(t.companyTel)}</p>`:""}
        ${t.companyFax?`<p class="q-seller-sub">FAX: ${O(t.companyFax)}</p>`:""}
        ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${O(t.companyRegistrationNo)}</p>`:""}
      </div>
    </div>
  </div>

  <!-- 得意先行: 左=宛先、右=見積番号・日付（枠なし・右寄せ） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${O(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${O(e.customerAddress)}</p>`:""}
    </div>
    <table class="q-meta-table">
      ${e.quoteNo?`<tr><th>見積番号</th><td>${O(e.quoteNo)}</td></tr>`:""}
      <tr><th>見積日</th><td>${jt(e.quoteDate)}</td></tr>
      ${e.validUntil?`<tr><th>有効期限</th><td>${jt(e.validUntil)}</td></tr>`:""}
    </table>
  </div>

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${pe(i)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${O(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${O(t.defaultHeaderNote)}</p>`:""}

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
        <th style="width:80px;">${r?"納入価格":"単価"}</th>
      </tr>
    </thead>
    <tbody>${u}</tbody>
    <tfoot>
      <tr><td colspan="${p-1}" style="text-align:right;">小計</td><td style="text-align:right;">${pe(s)}</td></tr>
      <tr><td colspan="${p-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${pe(n)}</td></tr>
      <tr class="q-total-row"><td colspan="${p-1}" style="text-align:right;">合計</td><td style="text-align:right;">${pe(i)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${y.length>0?`<table class="q-conditions">${y.join("")}</table>`:""}

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${O(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${O(t.defaultFooterNote)}</p>`:""}

  ${v}
</div>`}function bn(e,t,s,n,i,r,c){const p=e.lines.reduce((P,o)=>P+o.amount,0),u=Math.round(p*e.taxRate/100),y=p+u,f=e.templateType==="sake",v=n.length>=1?t.filter(P=>P.name.includes(n)||P.code.includes(n)).slice(0,8):[],b=i.length>=1?s.filter(P=>P.name.includes(i)||P.code.includes(i)).slice(0,8):[];if(e.previewMode){const P=c.accentColor||"#0968e5";return`
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
        ${xr(P)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${gn(e,c)}
      </div>
    `}const w=e.lines.map((P,o)=>{const l=f?`
      <td><input type="text" class="jan-input" data-line-idx="${o}" value="${O(P.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${o}" value="${P.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${o}" value="${P.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${O(P.productCode)}</td>
      <td>${O(P.productName)}</td>
      ${l}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${o}" value="${P.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${O(P.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${o}" value="${P.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${pe(P.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${o}">×</button></td>
    </tr>`}).join("")||`<tr><td colspan="${f?10:7}" style="text-align:center;color:var(--text-secondary);padding:20px;">商品を検索して追加</td></tr>`;return`
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
          ${yn.map(P=>`
            <button type="button" data-action="set-accent-color" data-color="${O(P.value)}" title="${O(P.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===P.value?"#333":"transparent"};background:${O(P.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${O(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${O(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${O(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${O(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${O(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${O(n)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${v.length>0?`<div class="search-results">${v.map(P=>`
        <button class="search-item" type="button" data-select-customer="${P.code}" data-cust-name="${O(P.name)}" data-cust-addr="${O(P.address1||"")}">
          <span class="mono">${P.code}</span> ${O(P.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName?`<div class="selected-item"><span class="mono">${O(e.customerCode)}</span> <strong>${O(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${O(e.customerAddress)}</span>`:""}</div>`:""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${O(i)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${b.length>0?`<div class="search-results">${b.map(P=>{const o=r?Sa(P,r):{price:P.salePrice||0,label:"卸価格"},l=P.listPrice||0,d=o.label!=="標準価格"&&o.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${P.code}" data-prod-name="${O(P.name)}" data-prod-price="${o.price}" data-prod-retail="${l}" data-prod-jan="${O(P.janCode??"")}" data-prod-unit="${O(P.unit??"本")}" data-prod-case="${P.caseQty??""}">
          <span class="mono">${P.code}</span> ${O(P.name)}
          <span class="numeric" ${d?'style="color:#2f855a;font-weight:700;"':""}>納入 ${o.price?pe(o.price):"未設定"} <small>(${o.label})</small>${l?`　定価 ${pe(l)}`:""}</span>
        </button>`}).join("")}</div>`:""}

      <div class="table-wrap" style="margin-top:10px;">
        <table>
          <thead>
            <tr>
              <th>品番</th><th>品名</th>
              ${f?'<th>JANコード</th><th>入数</th><th class="numeric">希望小売価格</th>':""}
              <th class="numeric">数量</th><th>単位</th><th class="numeric">${f?"納入価格":"単価"}</th><th class="numeric">金額</th><th></th>
            </tr>
          </thead>
          <tbody>${w}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${O(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${pe(p)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${pe(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${pe(y)}</span></div>
        </div>
      </div>
    </section>
  `}function Sr(e,t){const s=gn(e,t),n=window.open("","_blank","width=860,height=1100");if(!n){alert("ポップアップがブロックされました。許可してください。");return}n.document.write(`<!DOCTYPE html>
<html lang="ja"><head><meta charset="UTF-8" />
<title>見積書 ${e.quoteNo||""}</title>
<style>${wr(t.accentColor||"#0968e5")}</style>
</head><body>${s}
<script>window.onload=function(){window.print();}<\/script>
</body></html>`),n.document.close()}function mt(e){const t=s=>document.getElementById(s)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function $n(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _n(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function wn(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function kr(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Pr(e,t,s,n,i){const r=new Map,c=new Map;for(const f of e){if(f.date>=t&&f.date<=s){const v=r.get(f.productCode);v?(v.amt+=f.amount,v.qty+=f.qty):r.set(f.productCode,{name:f.productName,vol:f.volumeMl,amt:f.amount,qty:f.qty})}f.date>=n&&f.date<=i&&c.set(f.productCode,(c.get(f.productCode)??0)+f.amount)}const p=[...r.entries()].map(([f,v])=>({code:f,...v})).sort((f,v)=>v.amt-f.amt),u=p.reduce((f,v)=>f+v.amt,0);let y=0;return p.map(f=>{y+=f.amt;const v=u>0?Math.round(f.amt*1e4/u)/100:0,b=y<=u*.7?"A":y<=u*.9?"B":"C",w=c.get(f.code)??0,P=w>0?Math.round((f.amt-w)/w*1e3)/10:null;return{code:f.code,name:f.name,volumeMl:f.vol,amount:f.amt,qty:f.qty,sharePct:v,rank:b,prevAmount:w,growthRate:P}})}function Ar(e,t,s){const n=new Date,i=n.toISOString().slice(0,10);let r=i,c=i,p="";switch(e){case"week":{const f=new Date(n);f.setDate(f.getDate()-7),r=f.toISOString().slice(0,10),c=i,p="直近7日間";break}case"month":{r=i.slice(0,7)+"-01",c=i,p="当月";break}case"90days":{const f=new Date(n);f.setDate(f.getDate()-90),r=f.toISOString().slice(0,10),c=i,p="直近90日間";break}case"year":{const f=new Date(n);f.setFullYear(f.getFullYear()-1),r=f.toISOString().slice(0,10),c=i,p="直近1年間";break}case"custom":{r=t||i,c=s||i,p=`${r} 〜 ${c}`;break}}const u=new Date(r);u.setFullYear(u.getFullYear()-1);const y=new Date(c);return y.setFullYear(y.getFullYear()-1),{start:r,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:p}}function Cr(e,t="all",s=[],n="year",i,r,c=[]){const p=Ar(n,i,r),u=s.length>0?Pr(s,p.start,p.end,p.prevStart,p.prevEnd):e.map(m=>({code:m.code,name:m.name,volumeMl:m.volumeMl,amount:m.yearAmount,qty:m.yearQty,sharePct:m.sharePct,rank:m.rank,prevAmount:m.prevAmount,growthRate:m.growthRate})),y=u.filter(m=>m.rank==="A").length,f=u.filter(m=>m.rank==="B").length,v=u.filter(m=>m.rank==="C").length,b=u.filter(m=>m.growthRate!=null&&m.growthRate>10),w=u.filter(m=>m.growthRate!=null&&m.growthRate<-10);let P=u,o="全商品";switch(t){case"A":P=u.filter(m=>m.rank==="A"),o="Aランク";break;case"B":P=u.filter(m=>m.rank==="B"),o="Bランク";break;case"C":P=u.filter(m=>m.rank==="C"),o="Cランク";break;case"growing":P=b,o="成長商品(+10%以上)";break;case"declining":P=w,o="衰退商品(-10%以下)";break}const l=(m,g,$)=>`<button class="button ${t===m?"primary":"secondary"} small" data-product-filter="${m}">${g} (${$})</button>`,d=(m,g)=>`<button class="button ${n===m?"primary":"secondary"} small" data-product-period="${m}">${g}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${d("week","週次")}
        ${d("month","月次")}
        ${d("90days","90日")}
        ${d("year","年間")}
        ${d("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${i||""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${r||""}" />
        <button class="button secondary small" type="button" data-action="pp-apply-range">適用</button>
        <span style="color:var(--text-secondary);font-size:13px;margin-left:8px;">${p.label}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${y} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">Bランク（70-90%）</p>
        <p class="kpi-value">${f} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${b.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${w.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${o} (${P.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${l("all","全て",u.length)}
        ${l("A","A",y)}
        ${l("B","B",f)}
        ${l("C","C",v)}
        ${l("growing","成長",b.length)}
        ${l("declining","衰退",w.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${F("rank","ABC",c)}
              ${F("name","商品名",c)}
              ${F("amount","売上",c,"numeric")}
              ${F("sharePct","構成比",c,"numeric")}
              ${F("qty","本数",c,"numeric")}
              ${F("growthRate","前年同期比",c,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${Je(P,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(m=>`
              <tr>
                <td>${_n(m.rank)}</td>
                <td>${m.name?m.name.slice(0,25):m.code}${m.volumeMl?` <small>${m.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${$n(m.amount)}</td>
                <td class="numeric">${m.sharePct}%</td>
                <td class="numeric">${m.qty.toLocaleString()}</td>
                <td class="numeric">${wn(m.growthRate)}</td>
              </tr>
            `).join("")}
            ${P.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Er(e,t=[]){const s=e.filter(r=>r.currentRank==="A").length,n=e.filter(r=>r.prevRank&&r.currentRank<r.prevRank).length,i=e.filter(r=>r.prevRank&&r.currentRank>r.prevRank).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>営業効率分析</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${s} 社</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${n} 社</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${i} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先ABC分析（年間売上構成比）</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${F("currentRank","ABC",t)}
              ${F("name","得意先名",t)}
              ${F("yearAmount","年間売上",t,"numeric")}
              ${F("sharePct","構成比",t,"numeric")}
              ${F("orderDays","受注日数",t,"numeric")}
              ${F("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${Je(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).slice(0,50).map(r=>`
              <tr>
                <td>${_n(r.currentRank)}</td>
                <td>${r.name||r.code}</td>
                <td class="numeric">${$n(r.yearAmount)}</td>
                <td class="numeric">${r.sharePct}%</td>
                <td class="numeric">${r.orderDays}日</td>
                <td class="numeric">${wn(r.growthRate)}</td>
                <td>${kr(r.currentRank,r.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Lr(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Dr(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function qr(e,t){const s=e.length?e.map(n=>`
            <tr>
              <td class="mono">${n.documentNo}</td>
              <td>${Lr(n.date)}</td>
              <td>
                <div class="table-title">${n.customerName}</div>
                <div class="table-sub mono">${n.customerCode}</div>
              </td>
              <td class="numeric">${n.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Dr(n.amount)}</td>
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
          <tbody>${s}</tbody>
        </table>
      </div>
      ${e.length===0?'<p class="empty-note">条件に一致する伝票はありません。</p>':""}
    </section>
  `}function Ir(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Tr(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function xn(e,t){const s=new Date(e);return s.setDate(s.getDate()+t),s}function Sn(e){const t=new Date(e),s=t.getDay();return t.setDate(t.getDate()-s),t.setHours(0,0,0,0),t}function Ha(e){const t=xn(Sn(e),6);return t.setHours(23,59,59,999),t}function Ga(e){return new Date(`${e}T00:00:00`)}function Xa(e){return`${e.getMonth()+1}/${e.getDate()}`}function Nr(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Mr(){const e=new Date,t=Sn(Tr(Ir(e),-3)),s=Ha(new Date(e.getFullYear(),e.getMonth()+4,0)),n=[];let i=new Date(t);for(;i<=s;){const r=Ha(i);n.push({start:new Date(i),end:r,label:`${Xa(i)} - ${Xa(r)}`}),i=xn(i,7)}return n}function Rr(e){const t=Mr(),s=`160px repeat(${t.length}, minmax(56px, 1fr))`,n=t.map(r=>`
        <div class="gantt-week">
          <span>${r.label}</span>
        </div>
      `).join(""),i=e.length?e.map(r=>{const c=Ga(r.startDate),p=Ga(r.expectedDoneDate),u=Math.max(0,t.findIndex(v=>v.end>=c)),y=Math.max(u,t.reduce((v,b,w)=>b.start<=p?w:v,u)),f=[`仕込番号: ${r.jikomiNo}`,`銘柄: ${r.productName}`,`期間: ${r.startDate} - ${r.expectedDoneDate}`,`タンク: ${r.tankNo}`,`備考: ${r.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${s}">
              <div class="gantt-label">
                <strong>${r.jikomiNo}</strong>
                <span class="table-sub">${r.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${r.status}"
                  style="grid-column:${u+1} / ${y+2}"
                  title="${Nr(f)}"
                >
                  ${r.jikomiNo} / ${r.productName}
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
        ${i}
      </div>
    </section>
  `}function Ka(e,t){const s={planned:"neutral",active:"warning",done:"success"},n=e.map(p=>`
      <tr>
        <td class="mono">${p.jikomiNo}</td>
        <td>${p.productName}</td>
        <td>${p.riceType}</td>
        <td class="numeric">${p.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${p.actualKg>0?p.actualKg.toLocaleString("ja-JP")+" kg":"―"}</td>
        <td>${p.startDate}</td>
        <td>${p.expectedDoneDate}</td>
        <td class="mono">${p.tankNo}</td>
        <td>
          <span class="status-pill ${s[p.status]}">${Bs[p.status]}</span>
        </td>
        <td>${p.note||"―"}</td>
      </tr>
    `).join(""),i=e.filter(p=>p.status==="active").length,r=e.filter(p=>p.status==="done").length,c=e.filter(p=>p.status==="planned").length;return`
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
        <p class="kpi-value">${i} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${c} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${r} 本</p>
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
  `}function Or(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},s={pending:"neutral",submitted:"warning",approved:"success"},n=e.map(u=>`
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
          <span class="status-pill ${s[u.status]}">${t[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${u.id}">
            ${u.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),i=e.filter(u=>u.status==="approved").length,r=e.filter(u=>u.status==="submitted").length,c=e.filter(u=>u.status==="pending").length;return`
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
        <p class="kpi-value">${r} 件</p>
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
          <p class="panel-caption">承認済 ${i} 件 / 合計 ${e.length} 件</p>
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
  `}function jr(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Fr(e,t){return`
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
        ${e?`<p class="field-error">${jr(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function zr(e){return`
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
  `}function Br(e){return`
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
  `}const qa={query:"",businessType:"",areaCode:"",activeOnly:"",page:1},at=50;function Vr(e,t){let s=e;if(t.query){const p=t.query.toLowerCase();s=s.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(s=s.filter(p=>p.businessType===t.businessType)),t.areaCode&&(s=s.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?s=s.filter(p=>p.isActive):t.activeOnly==="inactive"&&(s=s.filter(p=>!p.isActive));const n=Math.max(1,Math.ceil(s.length/at)),r=(Math.min(t.page,n)-1)*at,c=s.slice(r,r+at);return{filtered:s,paged:c,totalPages:n}}function Wa(e,t,s){if(s<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const n=(t-1)*at+1,i=Math.min(t*at,e),r=[];for(let c=1;c<=s;c++)c===1||c===s||c>=t-2&&c<=t+2?r.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&r.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${n}-${i} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${r.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=s?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Jr(e,t){const s=[...new Set(e.map(i=>i.businessType).filter(Boolean))].sort(),n=[...new Set(e.map(i=>i.areaCode).filter(Boolean))].sort();return`
    <div style="display:flex;gap:8px;align-items:end;flex-wrap:wrap;padding:12px 0;">
      <div class="form-group" style="flex:1;min-width:200px;">
        <label class="form-label">検索</label>
        <input type="text" id="master-search" class="form-input" placeholder="コード・名前・カナ・住所・電話" value="${t.query}">
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">業態</label>
        <select id="master-business-type" class="form-input">
          <option value="">すべて</option>
          ${s.map(i=>`<option value="${i}" ${t.businessType===i?"selected":""}>${i}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${n.map(i=>`<option value="${i}" ${t.areaCode===i?"selected":""}>${i}</option>`).join("")}
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
  `}function sa(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Yr(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}function Ur(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Yr(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${sa(t.address1||"",16)}</td>
          <td>${sa(t.address2||"",12)}</td>
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
      `).join("")}function yt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Qr(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${sa(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${yt(t.purchasePrice)}</td>
          <td class="numeric">${yt(t.salePrice)}</td>
          <td class="numeric">${yt(t.listPrice)}</td>
          <td class="numeric">${yt(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function Hr(e,t,s=qa,n=[]){const{filtered:i,paged:r,totalPages:c}=Vr(e.customers,s);return`
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
        ${Jr(e.customers,s)}
        ${Wa(i.length,s.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${F("code","コード",n)}
                ${F("name","得意先名",n)}
                ${F("kanaName","カナ",n)}
                <th>略称</th>
                ${F("businessType","業態",n)}
                <th>販売区分</th>
                <th>価格区分</th>
                <th>単価G</th>
                <th>電話</th>
                <th>FAX</th>
                <th>〒</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>担当</th>
                ${F("areaName","地区",n)}
                ${F("closingDay","締日",n,"numeric")}
                ${F("paymentDay","支払日",n,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Ur(Je(r,n,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Wa(i.length,s.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${F("code","コード",n)}
                ${F("name","商品名",n)}
                <th>カナ</th>
                ${F("category","分類",n)}
                <th>酒税区分</th>
                ${F("alcoholDegree","度数",n,"numeric")}
                ${F("volumeMl","容量ml",n,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${F("purchasePrice","生産者価格",n,"numeric")}
                ${F("salePrice","卸価格",n,"numeric")}
                ${F("listPrice","定価(小売)",n,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Qr(Je(e.products,n,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function Ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Gr(e,t){if(!e&&!t)return"";const s=e;return`
    <div class="modal-backdrop" data-action="material-close">
      <div class="modal-panel" onclick="event.stopPropagation()" style="width:min(600px, 100%);">
        <div class="modal-header">
          <h3>${t?"新規 副資材登録":`編集: ${s?.name??""}`}</h3>
          <button class="modal-close" data-action="material-close">×</button>
        </div>
        <div class="modal-body">
          <div class="filter-grid filter-grid--wide">
            <label class="field" style="flex:1 1 140px;">
              <span>コード *</span>
              <input id="mat-code" type="text" value="${s?.code??""}" placeholder="M001" />
            </label>
            <label class="field" style="flex:1 1 240px;">
              <span>品名 *</span>
              <input id="mat-name" type="text" value="${s?.name??""}" placeholder="720ml瓶" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>カテゴリ</span>
              <select id="mat-type">
                <option value="">選択</option>
                ${sn.map(n=>`<option ${s?.materialType===n?"selected":""}>${n}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 80px;">
              <span>単位</span>
              <input id="mat-unit" type="text" value="${s?.unit??"個"}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>現在庫</span>
              <input id="mat-stock" type="number" value="${s?.currentStock??0}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>最低在庫</span>
              <input id="mat-min" type="number" value="${s?.minimumStock??0}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>単価(円)</span>
              <input id="mat-cost" type="number" value="${s?.unitCost??0}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>最終入荷日</span>
              <input id="mat-last-date" type="date" value="${s?.lastUpdated??""}" />
            </label>
          </div>
        </div>
        <div class="action-bar" style="padding:12px 20px;border-top:1px solid var(--border);">
          ${t?"":`<button class="button secondary" data-action="material-delete" data-id="${s.id}" style="color:var(--danger);margin-right:auto;">削除</button>`}
          <button class="button secondary" data-action="material-close">キャンセル</button>
          <button class="button primary" data-action="material-save" data-id="${s?.id??""}">保存</button>
        </div>
      </div>
    </div>
  `}function Xr(e){const t=e.map(i=>{const c=(i.minimumStock>0?i.currentStock/i.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${i.code}</td>
          <td>${i.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${i.currentStock.toLocaleString("ja-JP")} ${i.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${i.minimumStock.toLocaleString("ja-JP")} ${i.unit}</td>
          <td class="numeric">${Ft(i.unitCost)}</td>
          <td class="numeric">${Ft(i.currentStock*i.unitCost)}</td>
          <td>${i.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${i.id}">調整</button>
          </td>
        </tr>
      `}).join(""),s=e.filter(i=>i.minimumStock>0&&i.currentStock/i.minimumStock<1.5).length,n=e.reduce((i,r)=>i+r.currentStock*r.unitCost,0);return`
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
        <p class="kpi-value">${Ft(n)}</p>
        <p class="kpi-sub">${e.length} 品目</p>
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
          <tbody>${t||'<tr><td colspan="8" class="empty-row">資材データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Kr(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function zt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Wr={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Zr(e){return`
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
          <tbody>${e.map(s=>`
        <tr>
          <td>
            <div class="table-title">${s.customerName}</div>
            <div class="table-sub mono">${s.customerCode}</div>
          </td>
          <td class="numeric">${zt(s.billedAmount)}</td>
          <td class="numeric">${zt(s.paymentAmount)}</td>
          <td class="numeric">${zt(s.balanceAmount)}</td>
          <td>${Kr(s.lastPaymentDate)}</td>
          <td><span class="status-pill ${s.status==="paid"?"success":s.status==="partial"?"warning":"danger"}">${Wr[s.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function Re(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Za(e){return e.trim().toLowerCase()}function el(e,t){const s=Za(t),n=e.filter(r=>s?[r.code,r.name,r.janCode].map(Za).some(c=>c.includes(s)):!0),i=n.length?`
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
              ${n.map(r=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Re(r.code)}"
                      data-name="${Re(r.name)}"
                    >
                      <td class="mono">${Re(r.code)}</td>
                      <td>${Re(r.name)}</td>
                      <td class="mono">${Re(r.janCode)}</td>
                      <td>${Re(r.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return pn({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:i,emptyMessage:"該当する商品が見つかりません。"})}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function tl(e,t){const s={pending:"未確定",confirmed:"確定",paid:"支払済"},n={pending:"warning",confirmed:"neutral",paid:"success"},i={unpaid:"未払い",partial:"一部支払",paid:"支払済"},r={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(v=>`
      <tr>
        <td class="mono">${v.documentNo}</td>
        <td>${v.purchaseDate}</td>
        <td class="mono">${v.supplierCode}</td>
        <td>${v.supplierName}</td>
        <td>${v.itemName}</td>
        <td class="numeric">${v.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${ke(v.unitPrice)}</td>
        <td class="numeric"><strong>${ke(v.amount)}</strong></td>
        <td>
          <span class="status-pill ${n[v.status]}">${s[v.status]}</span>
        </td>
      </tr>
    `).join(""),p=t.map(v=>`
      <tr>
        <td class="mono">${v.supplierCode}</td>
        <td>${v.supplierName}</td>
        <td class="numeric">${ke(v.totalPurchase)}</td>
        <td class="numeric">${ke(v.paidAmount)}</td>
        <td class="numeric"><strong>${ke(v.balance)}</strong></td>
        <td>${v.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${r[v.status]}">${i[v.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${v.supplierCode}" ${v.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((v,b)=>v+b.amount,0),y=t.reduce((v,b)=>v+b.balance,0),f=t.filter(v=>v.status!=="paid").length;return`
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
        <p class="kpi-value">${ke(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${ke(y)}</p>
        <p class="kpi-sub">未払い ${f} 社</p>
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
          <tbody>${p||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function al(e,t){const s={holding:"保有中",due:"期日到来",cleared:"決済済"},n={holding:"neutral",due:"warning",cleared:"success"},i=e.map(f=>`
      <tr>
        <td class="mono">${f.billNo}</td>
        <td>${f.supplierName}</td>
        <td class="numeric">${Xe(f.amount)}</td>
        <td>${f.issueDate}</td>
        <td>${f.dueDate}</td>
        <td>
          <span class="status-pill ${n[f.status]}">${s[f.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${f.id}" ${f.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),r=t.map(f=>{const v=f.minimumStock>0&&f.currentStock<f.minimumStock*1.2;return`
        <tr>
          <td class="mono">${f.code}</td>
          <td>${f.name}</td>
          <td class="numeric ${v?"text-danger":""}">
            ${f.currentStock.toLocaleString("ja-JP")} ${f.unit}
            ${v?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${f.minimumStock.toLocaleString("ja-JP")} ${f.unit}</td>
          <td class="numeric">${Xe(f.unitCost)}</td>
          <td class="numeric">${Xe(f.currentStock*f.unitCost)}</td>
          <td>${f.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(f=>f.status==="holding"),p=c.reduce((f,v)=>f+v.amount,0),u=t.reduce((f,v)=>f+v.currentStock*v.unitCost,0),y=t.filter(f=>f.minimumStock>0&&f.currentStock<f.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${Xe(p)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${Xe(u)}</p>
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
          <tbody>${i||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
          <tbody>${r||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function na(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function ne(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oa(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${ne(e)}</pre>
    </div>
  `}function sl(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function ht(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${ne(e)}</code>
      ${sl(e)}
    </div>
  `}function Oe(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${ne(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${ne(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${ne(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?oa(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${ne(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${ne(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function ft(e){return`
    <div class="setup-step setup-step-compact" data-step="${ne(e.stepLabel)}">
      <h3>${ne(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${ne(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function vt(e){if(!e)return"error";const s=(Date.now()-new Date(e).getTime())/(1e3*60*60);return s<1?"success":s<24?"warning":"error"}function es(e){if(!e)return"未同期";const s=(Date.now()-new Date(e).getTime())/(1e3*60*60);return s<1?"正常":s<24?"注意":"要確認"}function nl(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?na(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${vt(e.lastOverallSync)}">${es(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${vt(e.lastOverallSync)==="success"?"1時間以内":vt(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${ne(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?na(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${vt(t.lastSyncAt)}">${es(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function ol(e,t,s,n){const i={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${n?nl(n):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${na(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${i[e.status]}</span>
        </p>
        <p class="kpi-sub">${ne(e.message)}</p>
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
      ${ft({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${ht("git --version")}
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
      ${ft({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${ht("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${ft({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${ht("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${ht("python get-pip.py")}
        `})}
      ${ft({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${Oe({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${Oe({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${Oe({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${Oe({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${Oe({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${Oe({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${oa(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${oa(`{
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
            <span class="config-value">${ne(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${ne(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${ne(s)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${ne(s)}"
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
  `}function et(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function il(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function rl(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),s=Math.max(...t.map(v=>v.amount),1),n=28,i=6,r=140,c=100,p=760,u=p-r-c,y=t.length*(n+i)+16,f=t.map((v,b)=>{const w=v.amount/s*u,P=b*(n+i)+8,o=v.abcRank==="A"?"#2F855A":v.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${r-8}" y="${P+n/2+5}" class="chart-axis" text-anchor="end">${v.name.length>10?v.name.slice(0,10)+"…":v.name}</text>
          <rect x="${r}" y="${P}" width="${w}" height="${n}" rx="4" fill="${o}" opacity="0.85" />
          <text x="${r+w+8}" y="${P+n/2+5}" class="chart-axis">${(v.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${f}
    </svg>
  `}function ll(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(n=>`<th class="numeric">${n}</th>`).join(""),s=e.monthlyByCustomer.map(n=>{const i=n.values.reduce((c,p)=>c+p,0),r=n.values.map(c=>`<td class="numeric">${c>0?(c/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${n.label}</td>
          ${r}
          <td class="numeric"><strong>${et(i)}</strong></td>
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
        <tbody>${s}</tbody>
      </table>
    </div>
  `}function cl(e){e.ranking.reduce((u,y)=>u+y.amount,0);const t=e.ranking.filter(u=>u.abcRank==="A").length,s=e.ranking.filter(u=>u.abcRank==="B").length,n=e.ranking.filter(u=>u.abcRank==="C").length,i=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),r=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),p=e.ranking.map(u=>`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric">${et(u.amount)}</td>
          <td class="numeric">${u.ratio.toFixed(1)}%</td>
          <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${il(u.abcRank)}">${u.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${et(i)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${s}社 <span class="kpi-sub">${et(r)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${n}社 <span class="kpi-sub">${et(c)}</span></div>
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
        ${rl(e.ranking)}
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
          <tbody>${p}</tbody>
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
      ${ll(e)}
    </section>
  `}const dl={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},ts={amount:"売上額",quantity:"出荷本数",volume:"移出量"},ia=10;function Ia(e){const[t,s]=e.split("-").map(Number);return s>=ia?t:t-1}function ul(e){const t=ia-1,s=new Date(e+1,t,0).getDate();return{from:`${e}-${String(ia).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(s).padStart(2,"0")}`}}function pl(e,t,s){const n=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,i=new Map;for(const c of e){const p=s==="fiscal"?`${Ia(c.month)}年度`:c.month.slice(0,4);i.set(p,(i.get(p)??0)+n(c))}return{curr:[...i.entries()].sort((c,p)=>c[0].localeCompare(p[0])).map(([c,p])=>({month:c,amount:p}))}}function ml(e){const t=new Set;for(const s of e)t.add(Ia(s.month));return[...t].sort((s,n)=>n-s).map(String)}function Ye(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function yl(e){return e.replace("-","/")}const as={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function hl(e,t="#0F5B8D",s=[],n="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const i=s.length>0&&s.some(m=>m.amount>0),r=760,c=280,p={top:16,right:24,bottom:36,left:n==="amount"?64:56},u=r-p.left-p.right,y=c-p.top-p.bottom,f=[...e.map(m=>m.amount),...s.map(m=>m.amount)],v=Math.max(...f,1),b=u/e.length;function w(m){if(n==="quantity")return m>=1e4?`${(m/1e4).toFixed(1)}万本`:`${Math.round(m).toLocaleString()}本`;if(n==="volume"){const g=m/1e3;return g>=1e4?`${(g/1e3).toFixed(0)}kL`:`${Math.round(g).toLocaleString()} L`}return`${Math.round(m/1e4).toLocaleString("ja-JP")}万円`}function P(m){return n==="quantity"?`${m.toLocaleString()}本`:n==="volume"?Tt(m):Ye(m)}const o=[0,.25,.5,.75,1].map(m=>{const g=p.top+y-y*m,$=w(v*m);return`<g>
        <line x1="${p.left}" y1="${g}" x2="${r-p.right}" y2="${g}" class="chart-grid" />
        <text x="4" y="${g+4}" class="chart-axis">${$}</text>
      </g>`}).join(""),l=e.map((m,g)=>{const $=i?Math.max((b-18)/2,10):Math.max(b-18,24),x=i?2:0,A=p.left+g*b+(b-(i?$*2+x:$))/2,S=m.amount/v*y,C=p.top+y-S,I=s[g]?.amount??0,L=I/v*y,T=p.top+y-L,R=i?`<rect x="${A}" y="${T}" width="${$}" height="${L}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${P(I)}</title></rect>`:"",j=i?A+$+x:A;return`<g>
      ${R}
      <rect x="${j}" y="${C}" width="${$}" height="${S}" rx="4" fill="${t}" opacity="${.6+g/e.length*.35}"><title>${P(m.amount)}</title></rect>
      <text x="${p.left+g*b+b/2}" y="${c-8}" class="chart-axis centered-axis">${yl(m.month)}</text>
    </g>`}).join(""),d=i?`
    <g transform="translate(${r-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${r} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${o}${l}${d}
    </svg>
  `}function Tt(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function fl(e,t=!1){const s=t?7:6;return e.length===0?`<tr><td colspan="${s}" class="empty-row">データなし</td></tr>`:e.map(n=>`
    <tr>
      <td class="mono">${n.code}</td>
      <td>${n.name}</td>
      <td class="numeric">${Ye(n.amount)}</td>
      <td class="numeric">${n.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Tt(n.volumeMl)}</td>
      <td class="numeric">${n.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${n.code}" data-drilldown-name="${n.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function vl(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${Ye(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Tt(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function ss(e,t,s){const n=t?e.filter(r=>r.tag.includes(t)||r.name.includes(t)):e,i=n.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':n.map(r=>`
        <tr>
          <td class="mono">${r.code||"―"}</td>
          <td>${r.name||"未設定"}</td>
          <td class="mono">${r.tag||"―"}</td>
          <td class="numeric">${Ye(r.amount)}</td>
          <td class="numeric">${r.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("");return`
    <div class="table-wrap" style="margin-top:8px;">
      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>${s}</th>
            <th>タグ</th>
            <th class="numeric">売上額</th>
            <th class="numeric">伝票数</th>
          </tr>
        </thead>
        <tbody>${i}</tbody>
      </table>
    </div>
  `}function kn(e,t,s="all",n="",i=[],r=[],c="",p="",u=null,y="all",f="",v=[],b=[],w=[],P=null,o=[],l=[],d="amount",m="calendar"){const g=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",$=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,A=s!=="all"&&i.length>0&&t!=="staff"?i:$,S=Je(A,w,dl),C={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},I=ts[d],L=B=>d==="quantity"?B.quantity:d==="volume"?B.volumeMl:B.amount,T=B=>d==="quantity"?`${B.toLocaleString()}本`:d==="volume"?Tt(B):Ye(B);let R,j=[],K,se,oe;if(P&&P.monthlySales.length>0)R=P.monthlySales.slice(-24).map(B=>({month:B.month,amount:L(B)})),K=`${P.name} の月別${I}`,se=`${P.tab==="customers"?"得意先":"商品"}: ${P.code}`,oe="#0968e5";else if(o.length>0&&s!=="all"){R=o.map(le=>({month:le.month,amount:L(le)})),j=l.map(le=>({month:le.month,amount:L(le)}));const B=R.reduce((le,Q)=>le+Q.amount,0),$e=j.reduce((le,Q)=>le+Q.amount,0),lt=$e>0?(B-$e)/$e*100:0,Ie=lt>0?"+":"";K=`${C[s]} ${I}（${n}）`,se=`${T(B)}${$e>0?` / 前年比 ${Ie}${lt.toFixed(1)}%`:""}`,oe="#2f855a"}else{R=pl(e.monthlySales,d,m).curr,j=[];const $e=R.reduce((Ie,le)=>Ie+le.amount,0);K=`${m==="fiscal"?"決算年度別":"暦年別"}${I}`,se=`累計 ${T($e)}（${R.length}${m==="fiscal"?"期":"年"}）`,oe="#0F5B8D"}const ve=["amount","quantity","volume"].map(B=>`<button class="tab-button ${B===d?"active":""}" data-chart-metric="${B}">${ts[B]}</button>`).join(""),ie=["all","yearly","monthly","weekly","daily"].map(B=>`<button class="button ${B===s?"primary":"secondary"} small" type="button" data-analytics-period="${B}">${as[B]}</button>`).join(""),M=m==="fiscal"&&s==="yearly"?ml(e.monthlySales):r,X=m==="fiscal"&&s==="yearly"&&!M.includes(n)?M[0]??"":n,Ue=s!=="all"&&M.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${M.map(B=>`<option value="${B}" ${B===X?"selected":""}>${m==="fiscal"&&s==="yearly"?B+"年度":B}</option>`).join("")}
      </select>`:"";let De="",qe="";if(t==="staff"){const B=["all","yearly","monthly","weekly","daily"].map(Q=>`<button class="button ${Q===y?"primary":"secondary"} small" type="button" data-staff-period="${Q}">${as[Q]}</button>`).join(""),$e=y!=="all"&&v.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${v.map(Q=>`<option value="${Q}" ${Q===f?"selected":""}>${Q}</option>`).join("")}
        </select>`:"",Ie=(b.length>0?b:e.staffTotals).filter(Q=>!c||Q.name.includes(c)||Q.code.includes(c)),le=y!=="all"&&f?` (${f})`:"";if(De=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${B}</div>
        ${$e}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${c}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${le?`<span style="font-size:12px;color:var(--text-secondary);">${le}</span>`:""}
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
            ${Ie.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':Ie.map(Q=>`
                <tr>
                  <td class="mono">${Q.code||"―"}</td>
                  <td>${Q.name||"未設定"}</td>
                  <td class="numeric">${Ye(Q.amount)}</td>
                  <td class="numeric">${Q.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${Q.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${Q.code}" data-staff-name="${Q.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const Q=u.breakdownTab,Fn=y!=="all"&&f?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${f}</span>`:"";qe=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${Fn}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${Q==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${Q==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${p}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${Q==="customers"?ss(u.customerRows,p,"得意先名"):ss(u.productRows,p,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${m==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${m==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${K}</h2>
            <p class="panel-caption">${se}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${ve}</div>
            ${P?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${hl(R,oe,j,d)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${g}</h2>
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
            <div class="button-group">${ie}</div>
            ${Ue}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${F("code","コード",w,"mono")}
                  ${F("name","名称",w)}
                  ${F("amount","売上額",w,"numeric")}
                  ${F("quantity","本数",w,"numeric")}
                  ${F("volumeMl","移出量",w,"numeric")}
                  ${F("documents","伝票数",w,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${fl(S,!0)}</tbody>
            </table>
          </div>
        `:De}
      </article>
    </section>

    ${P?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${P.name} の${P.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${P.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${P.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${vl(P.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${qe}
  `}const ns=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:ul,monthToFiscalYear:Ia,renderSalesAnalytics:kn},Symbol.toStringTag,{value:"Module"}));function Ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function gl(e){const t=Math.max(...e.salesByProduct.flatMap(r=>r.values),1),s=e.salesByProduct.map(r=>{const c=r.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${Ke(p)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${r.label}</p>
          <div class="bar-chart">${c}</div>
        </div>
      `}).join(""),n=e.costSimulation.map(r=>`
      <tr>
        <td class="mono">${r.productCode}</td>
        <td>${r.productName}</td>
        <td class="numeric">${Ke(r.costPrice)}</td>
        <td class="numeric">${Ke(r.sellPrice)}</td>
        <td class="numeric">${Ke(r.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${r.marginRate>=40?"success":"warning"}">${r.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),i=e.salesByCustomer.map(r=>{const c=r.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${r.label}</td>
          ${r.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${Ke(c)}</strong></td>
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
              ${e.months.map(r=>`<th class="numeric">${r}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${i}</tbody>
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
  `}function bl(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function $l(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function os(e){return e.toISOString().slice(0,10)}function _l(e,t,s){const n=e.length?e.map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${bl(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${$l(i.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||os(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${s||os(new Date)}" />
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
  `}function gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function wl(e,t,s,n){const i={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},r={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(v=>`
      <tr>
        <td>${v.saleTime}</td>
        <td class="mono">${v.productCode}</td>
        <td>${v.productName}</td>
        <td class="numeric">${v.quantity}</td>
        <td class="numeric">${gt(v.unitPrice)}</td>
        <td class="numeric"><strong>${gt(v.amount)}</strong></td>
        <td>${i[v.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(v=>`
      <tr>
        <td class="mono">${v.orderNo}</td>
        <td>${v.orderDate}</td>
        <td>${v.customerName}</td>
        <td>${v.postalCode} ${v.address}</td>
        <td>${v.items.map(b=>`${b.productName} ×${b.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${gt(v.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[v.status]}">${r[v.status]}</span>
        </td>
        <td>${v.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${v.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((v,b)=>v+b.amount,0),f=t.filter(v=>v.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${gt(y)}</p>
        <p class="kpi-sub">${e.length} 件 / ${n}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${f} 件</p>
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
            <tbody>${p||'<tr><td colspan="7" class="empty-row">販売データがありません。</td></tr>'}</tbody>
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
  `}const Bt={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},xl={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Sl(e,t,s,n){const i=xl[e],r=Object.keys(Bt).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${Bt[p]}
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
              ${t.columns.map(p=>`<th>${p}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${t.rows.slice(0,10).map((p,u)=>`
              <tr class="${p._valid?"":"has-error"}">
                <td>${u+1}</td>
                ${t.columns.map(y=>`<td>${String(p[y]??"")}</td>`).join("")}
                <td>${p._valid?'<span class="status-pill success">OK</span>':`<span class="status-pill warning">${p._error??"NG"}</span>`}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="action-bar">
        <button class="button secondary" data-action="import-cancel">キャンセル</button>
        <button class="button primary" data-action="import-execute"
          ${s||t.validRows===0?"disabled":""}>
          ${s?"取り込み中…":`${t.validRows}件をSupabaseに登録`}
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
      <div class="tab-group" style="flex-wrap: wrap;">${r}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${Bt[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${i.required.map(p=>`<code class="config-value">${p}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${i.optional.map(p=>`<code class="config-value">${p}</code>`).join(" / ")}</dd>
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

    ${n?`<section class="panel"><p class="sync-message">${n}</p></section>`:""}
  `}const G={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function kl(e,t,s){const n=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:G.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:G.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:G.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:G.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:G.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:G.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:G.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:G.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:G.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:G.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:G.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:G.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:G.date}];e.lines.slice(0,6).forEach((c,p)=>{const u=33+p*8.5;n.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:G.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:G.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:G.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:G.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:G.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:G.detail})});const i=e.lines.reduce((c,p)=>c+(p.amount||0),0),r=e.lines.reduce((c,p)=>c+p.quantity,0);return n.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(r),color:G.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:i.toLocaleString("ja-JP"),color:G.total}),s&&n.forEach(c=>{const p=s[c.id];p&&(c.x=p.x,c.y=p.y)}),n}function Pl(e,t,s,n,i){const c=kl(e,t,n).map(u=>`
      <div class="fd-field ${i?"fd-draggable":""}"
           data-fd-id="${u.id}"
           style="left:${u.x}mm; top:${u.y}mm; font-size:${u.fontSize}pt; --fd-color:${u.color};"
           title="${u.label} (${u.x.toFixed(1)}, ${u.y.toFixed(1)})">
        ${i?`<span class="fd-badge">${u.label}</span>`:""}
        <span class="fd-value">${u.value}</span>
      </div>
    `).join(""),p=s.showReferenceOverlay&&s.overlayImageUrl?`background-image: url('${s.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">帳票デザイナー</p>
        <h1>BP1701 フォーム配置</h1>
      </div>
      <div class="meta-stack">
        <button class="button ${i?"primary":"secondary"}" data-action="fd-toggle-design">
          ${i?"🔧 配置モードON":"▶ プレビューモード"}
        </button>
        <button class="button primary" onclick="window.print()">🖨️ 印刷</button>
      </div>
    </section>

    ${i?`
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
        色: <span style="color:${G.header}">■ヘッダ</span>
        <span style="color:${G.code}">■コード</span>
        <span style="color:${G.date}">■日付</span>
        <span style="color:${G.detail}">■明細</span>
        <span style="color:${G.total}">■合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas-scaler" id="fd-scaler">
        <div class="fd-canvas" style="${p}">
          ${c}
        </div>
      </div>
    </section>

    ${i?`
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
        <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${s.showReferenceOverlay?"checked":""} /> 参考画像表示</label>
        <label style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">濃さ</span>
          <input type="range" min="0" max="1" step="0.05" value="${s.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
        </label>
      </div>
    </section>
  `}function Vt(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(s=>{const n=s.dataset.fdId??"",i=parseFloat(s.style.left)||0,r=parseFloat(s.style.top)||0;t[n]={x:i,y:r}}),t}function Al(e,t,s){const n=[...new Set(e.map(b=>b.areaCode).filter(Boolean))].sort(),i=[...new Set(e.map(b=>b.businessTypeName||b.businessType).filter(Boolean))].sort(),r=e.filter(b=>b.isAtRisk),c=e.filter(b=>!b.isAtRisk&&b.isDormant),p=e.filter(b=>!b.isAtRisk&&!b.isDormant&&b.amount12m>0),u=e.filter(b=>!b.isAtRisk&&!b.isDormant&&b.amount12m===0),y=t.filter(b=>b.lat&&b.lng),f=JSON.stringify(e),v=JSON.stringify(y.map(b=>({name:b.name,address:b.address,lat:b.lat,lng:b.lng,phone:b.phone})));return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業 / Map</p>
        <h1>取引先マップ</h1>
        <p class="meta-note">OpenStreetMap で得意先の位置情報を可視化します。</p>
      </div>
    </section>

    <section class="kpi-grid">
      <div class="kpi-card" style="border-top:3px solid var(--color-danger);">
        <div class="kpi-label">🔴 離反リスク</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠</div>
        <div class="kpi-value">${c.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #2196F3;">
        <div class="kpi-label">🔵 取引中</div>
        <div class="kpi-value">${p.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #aaa;">
        <div class="kpi-label">⚪ 売上なし</div>
        <div class="kpi-value">${u.length}<span class="kpi-sub">社</span></div>
      </div>
    </section>

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button ${s.filterStatus==="all"?"primary":"secondary"} small" type="button" data-map-status="all">すべて</button>
      <button class="button ${s.filterStatus==="at-risk"?"primary":"secondary"} small" type="button" data-map-status="at-risk">🔴 離反リスク</button>
      <button class="button ${s.filterStatus==="dormant"?"primary":"secondary"} small" type="button" data-map-status="dormant">🟠 休眠</button>
      <button class="button ${s.filterStatus==="active"?"primary":"secondary"} small" type="button" data-map-status="active">🔵 取引中</button>
      <button class="button ${s.filterStatus==="inactive"?"primary":"secondary"} small" type="button" data-map-status="inactive">⚪ 売上なし</button>
      <select id="map-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${n.map(b=>`<option value="${b}" ${s.filterArea===b?"selected":""}>${b}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${i.map(b=>`<option value="${b}" ${s.filterBiz===b?"selected":""}>${b}</option>`).join("")}
      </select>
    </div>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div id="customer-map" style="height:560px;width:100%;"></div>
    </section>

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

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""><\/script>
    <script type="module">
    (function () {
      // ── データ ──
      const ALL_CUSTOMERS = ${f};
      const DELIVERIES    = ${v};

      // ── マップ初期化 ──
      const map = L.map("customer-map").setView([35.37, 139.27], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(map);

      // ── マーカー色設定 ──
      function markerColor(c) {
        if (c.isAtRisk)  return "#e53e3e";
        if (c.isDormant) return "#dd6b20";
        if (c.amount12m > 0) return "#2196F3";
        return "#aaa";
      }

      function circleOptions(c) {
        return {
          radius: c.isAtRisk ? 9 : c.isDormant ? 8 : 7,
          fillColor: markerColor(c),
          color: "#fff",
          weight: 1.5,
          opacity: 1,
          fillOpacity: c.amount12m > 0 || c.isAtRisk || c.isDormant ? 0.85 : 0.45
        };
      }

      function formatAmt(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
        if (n >= 10000)   return Math.round(n / 10000) + "万";
        return n.toLocaleString("ja-JP") + "円";
      }

      function popupHtml(c) {
        const statusLabel = c.isAtRisk ? '<span style="color:#e53e3e;font-weight:700;">🔴 離反リスク</span>'
          : c.isDormant ? '<span style="color:#dd6b20;font-weight:700;">🟠 休眠</span>'
          : c.amount12m > 0 ? '<span style="color:#2196F3;">🔵 取引中</span>'
          : '<span style="color:#aaa;">⚪ 売上なし</span>';
        const phone = c.phone ? \`<a href="tel:\${c.phone}" style="color:#2196F3;">\${c.phone}</a>\` : "—";
        const days  = c.daysSinceOrder != null ? c.daysSinceOrder + "日前" : "—";
        return \`
          <div style="min-width:200px;font-size:13px;line-height:1.6;">
            <strong style="font-size:14px;">\${c.name}</strong><br>
            \${statusLabel}<br>
            エリア: \${c.areaCode || "—"} | 業種: \${c.businessTypeName || c.businessType || "—"}<br>
            最終注文: \${days}<br>
            12M売上: <strong>\${formatAmt(c.amount12m)}</strong><br>
            📞 \${phone}<br>
            \${c.address1 ? '<span style="font-size:11px;color:#666;">' + c.address1 + '</span>' : ""}
          </div>\`;
      }

      // ── レイヤー管理 ──
      let customerLayer = L.layerGroup().addTo(map);
      let deliveryLayer = L.layerGroup().addTo(map);

      let activeStatus = "${s.filterStatus}";
      let activeArea   = "${s.filterArea}";
      let activeBiz    = "${s.filterBiz}";

      function renderMarkers() {
        customerLayer.clearLayers();

        const filtered = ALL_CUSTOMERS.filter((c) => {
          if (activeStatus === "at-risk"  && !c.isAtRisk) return false;
          if (activeStatus === "dormant"  && (c.isAtRisk || !c.isDormant)) return false;
          if (activeStatus === "active"   && (c.isAtRisk || c.isDormant || c.amount12m === 0)) return false;
          if (activeStatus === "inactive" && (c.isAtRisk || c.isDormant || c.amount12m !== 0)) return false;
          if (activeArea && c.areaCode !== activeArea) return false;
          if (activeBiz) {
            const biz = c.businessTypeName || c.businessType;
            if (biz !== activeBiz) return false;
          }
          return true;
        });

        filtered.forEach((c) => {
          L.circleMarker([c.lat, c.lng], circleOptions(c))
            .bindPopup(popupHtml(c), { maxWidth: 280 })
            .addTo(customerLayer);
        });
      }

      // 納品先マーカー
      DELIVERIES.forEach((d) => {
        L.circleMarker([d.lat, d.lng], {
          radius: 6, fillColor: "#FF9800", color: "#fff", weight: 1.5, opacity: 1, fillOpacity: 0.8
        })
        .bindPopup(\`<strong>🟠 \${d.name}</strong><br>\${d.address || ""}<br>\${d.phone ? "📞 " + d.phone : ""}\`)
        .addTo(deliveryLayer);
      });

      renderMarkers();

      // ── フィルタ操作 ──
      document.querySelectorAll("[data-map-status]").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeStatus = btn.getAttribute("data-map-status") || "all";
          document.querySelectorAll("[data-map-status]").forEach((b) => {
            b.classList.toggle("primary",   b.getAttribute("data-map-status") === activeStatus);
            b.classList.toggle("secondary", b.getAttribute("data-map-status") !== activeStatus);
          });
          renderMarkers();
        });
      });

      document.getElementById("map-filter-area")?.addEventListener("change", (e) => {
        activeArea = e.target.value;
        renderMarkers();
      });
      document.getElementById("map-filter-biz")?.addEventListener("change", (e) => {
        activeBiz = e.target.value;
        renderMarkers();
      });
    })();
    <\/script>`}const Cl={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},El=["new","picking","packed","shipped","delivered"];function Ll(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(r=>t[r.stage].push(r));const s=El.map(r=>{const c=Cl[r],p=t[r];return`
      <div class="wf-col" data-wf-stage="${r}">
        <div class="wf-col-header" style="--wf-color:${c.color};">
          <span class="wf-col-icon">${c.icon}</span>
          <span class="wf-col-label">${c.label}</span>
          <span class="wf-col-count">${p.length}</span>
        </div>
        <div class="wf-col-body">
          ${p.length===0?'<div class="wf-empty">―</div>':p.map(u=>`
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
    `}).join(""),n=e.reduce((r,c)=>r+c.totalAmount,0),i=e.filter(r=>r.priority==="urgent").length;return`
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
        <p class="kpi-value">${e.filter(r=>r.stage!=="delivered").length}件</p>
        <p class="kpi-sub">処理待ち</p>
      </article>
      <article class="panel kpi-card ${i>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${i}件</p>
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
        ${s}
      </div>
    </section>
  `}function Dl(e,t,s){const n=e.cart.reduce((r,c)=>r+c.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((r,c)=>r+c.quantity,0)}<br/>
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

      ${ql(e,t,s)}
    </div>
  `}function ql(e,t,s){if(e.step==="customer"){const n=e.customerQuery.toLowerCase(),i=n?t.filter(r=>r.name.toLowerCase().includes(n)||r.code.toLowerCase().includes(n)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${i.slice(0,30).map(r=>`
            <button class="mo-item ${e.selectedCustomer?.id===r.id?"selected":""}" data-mo-select-customer="${r.id}">
              <div class="mo-item-title">${r.name}</div>
              <div class="mo-item-sub mono">${r.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const n=e.productQuery.toLowerCase(),i=n?s.filter(r=>r.name.toLowerCase().includes(n)||r.code.toLowerCase().includes(n)):s.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${i.slice(0,50).map(r=>{const c=e.cart.find(p=>p.productCode===r.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${r.name}</div>
                  <div class="mo-item-sub">${r.category} / JAN ${r.janCode||"―"}</div>
                </div>
                ${c?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${r.code}">−</button>
                      <span>${c.quantity}</span>
                      <button data-mo-qty="+1" data-mo-product="${r.code}">+</button>
                    </div>`:`<button class="button primary" data-mo-add-product="${r.code}">＋</button>`}
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
          ${e.cart.map((n,i)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${n.productName}</div>
                <div class="mo-item-sub">${n.quantity} × ¥${n.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${n.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${i}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((n,i)=>n+i.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const is={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},rs={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},ls={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Il(e,t){const s=e.find(r=>r.id===t)??e[0],n=e.filter(r=>r.status==="new").length,i=e.filter(r=>r.status==="confirmed").length;return`
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
        <p class="kpi-value">${i}件</p>
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
          ${e.map(r=>`
            <button class="tour-item ${s?.id===r.id?"active":""}" data-tour-id="${r.id}">
              <div class="tour-item-head">
                <strong>${r.name}</strong>
                <span class="status-pill ${rs[r.status]}">${is[r.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${ls[r.language]} · 👥 ${r.partySize}名
              </div>
              <div class="tour-item-sub">📅 希望日: ${r.visitDate}</div>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- 右: 詳細と返信 -->
      <div class="panel">
        ${s?`
          <div class="panel-header">
            <div>
              <h2>${s.name} 様</h2>
              <p class="panel-caption">受付日: ${s.createdAt.slice(0,10)}</p>
            </div>
            <span class="status-pill ${rs[s.status]}">${is[s.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${s.email}${s.phone?` / ${s.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${s.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${s.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${ls[s.language]}</dd></div>
            <div><dt>目的</dt><dd>${s.purpose}</dd></div>
            <div><dt>メッセージ</dt><dd style="white-space:pre-wrap;">${s.message}</dd></div>
          </dl>

          <hr style="margin:16px 0;" />

          <h3 style="margin-top:0;">✉️ 返信</h3>
          <label class="field">
            <span>確定日時</span>
            <input type="datetime-local" id="tour-confirmed-time" value="${s.confirmedTime??""}" />
          </label>
          <label class="field">
            <span>返信文面</span>
            <textarea id="tour-reply-body" rows="8" placeholder="ご予約ありがとうございます。..."></textarea>
          </label>
          <div class="action-bar">
            <button class="button secondary" data-action="tour-insert-template" data-template="confirm">📝 確定テンプレ</button>
            <button class="button secondary" data-action="tour-insert-template" data-template="decline">📝 お断りテンプレ</button>
            <button class="button primary" data-action="tour-send-reply" data-tour-id="${s.id}">送信 + 確定</button>
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
  `}const Tl=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Nl=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Ml(e,t){const s=t?e.find(i=>i.id===t):null,n=t==="__new__";return`
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
            ${e.map(i=>`
              <tr>
                <td>
                  ${i.name}
                  ${i.isDefault?'<span class="status-pill success" style="margin-left:6px;">既定</span>':""}
                </td>
                <td class="mono">${i.email}</td>
                <td>${i.displayName??"―"}</td>
                <td>
                  ${i.isVerified?'<span class="status-pill success">✓認証済</span>':'<span class="status-pill warning">未認証</span>'}
                </td>
                <td>
                  <button class="button-sm secondary" data-action="ms-edit" data-id="${i.id}">編集</button>
                  <button class="button-sm secondary" data-action="ms-delete" data-id="${i.id}" style="color:var(--danger);">削除</button>
                </td>
              </tr>
            `).join("")}
            ${e.length===0?'<tr><td colspan="5" class="empty-row">送信元が未登録です</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>

    ${s||n?`
      <section class="panel">
        <div class="panel-header">
          <h2>${n?"新規送信元":"編集"}: ${s?.name??""}</h2>
        </div>
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>名前 (識別用)</span>
            <input id="ms-name" type="text" value="${s?.name??""}" placeholder="営業部" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス</span>
            <input id="ms-email" type="email" value="${s?.email??""}" placeholder="sales@kaneishuzo.co.jp" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 (差出人名)</span>
            <input id="ms-display-name" type="text" value="${s?.displayName??""}" placeholder="金井酒造店 営業部" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>返信先 (任意)</span>
            <input id="ms-reply-to" type="email" value="${s?.replyTo??""}" placeholder="info@kaneishuzo.co.jp" />
          </label>
          <label class="field" style="flex:1 1 100%;">
            <span>署名</span>
            <textarea id="ms-signature" rows="4" placeholder="社名&#10;住所&#10;TEL">${s?.signature??""}</textarea>
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="ms-default" type="checkbox" ${s?.isDefault?"checked":""} />
            既定の送信元にする
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="ms-cancel">キャンセル</button>
          <button class="button primary" data-action="ms-save" data-id="${s?.id??""}">保存</button>
        </div>
        ${s?.isVerified?"":'<p class="form-hint" style="margin-top:8px;">⚠️ 未認証のアドレスは送信時にエラーになります。Resendダッシュボードでドメイン認証を行ってください。</p>'}
      </section>
      `:""}
  `}function Rl(e,t,s,n){const[i,r]=t.split("-").map(x=>parseInt(x,10)),c=new Date(i,r-1,1),p=new Date(i,r,0),u=c.getDay(),y=p.getDate(),f=[];for(let x=0;x<u;x++)f.push({isOutside:!0});for(let x=1;x<=y;x++)f.push({date:new Date(i,r-1,x)});for(;f.length%7!==0;)f.push({isOutside:!0});const v=s?e.filter(x=>x.category===s):e,b={};v.forEach(x=>{const A=x.startsAt.slice(0,10);b[A]??=[],b[A].push(x)});const w=new Date().toISOString().slice(0,10),P=f.map(x=>{if(x.isOutside)return'<div class="cal-cell cal-outside"></div>';const A=x.date,S=`${A.getFullYear()}-${String(A.getMonth()+1).padStart(2,"0")}-${String(A.getDate()).padStart(2,"0")}`,C=b[S]??[],I=S===w,L=A.getDay();return`
        <div class="cal-cell ${I?"cal-today":""} ${L===0?"cal-sun":L===6?"cal-sat":""}"
             data-cal-date="${S}">
          <div class="cal-day-num">${A.getDate()}</div>
          <div class="cal-events">
            ${C.slice(0,3).map(T=>`
              <button class="cal-event" data-cal-event-id="${T.id}"
                      style="background:${T.color||Ca[T.category]||"#0F5B8D"};"
                      title="${T.title}">
                <span class="cal-event-time">${T.isAllDay?"終日":new Date(T.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${T.title}</span>
              </button>
            `).join("")}
            ${C.length>3?`<button class="cal-event-more" data-cal-date="${S}">+${C.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),o=n?.isOpen?Ol(n):"",l=new Date(i,r-2,1),d=new Date(i,r,1),m=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`,g=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,$=(()=>{const x=new Date;return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${i}年 ${r}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${m}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${$}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${g}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Aa).map(([x,A])=>`<option value="${x}" ${s===x?"selected":""}>${A}</option>`).join("")}
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
        ${P}
      </div>
    </section>

    ${o}
  `}function Ol(e){const t=e.event;return`
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
                ${Object.entries(Aa).map(([s,n])=>`<option value="${s}" ${t.category===s?"selected":""}>${n}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?cs(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?cs(t.endsAt):""}" />
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
  `}function cs(e){const t=new Date(e),s=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${s(t.getMonth()+1)}-${s(t.getDate())}T${s(t.getHours())}:${s(t.getMinutes())}`}const We={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function jl(e,t){const s=t?e.find(n=>n.id===t):null;return`
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

    ${s?`
      <section class="panel">
        <div class="panel-header">
          <h2>${s.name} の設定</h2>
        </div>
        <p class="form-hint">${We[s.provider]?.description??""}</p>
        ${We[s.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${We[s.provider].setupUrl}" target="_blank">${We[s.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(We[s.provider]?.fields??[]).map(n=>`
            <label class="field" style="flex:1 1 100%;">
              <span>${n.label}</span>
              <input id="int-${n.key}" type="text" value="${s.config[n.key]??""}" placeholder="${n.placeholder}" />
            </label>
          `).join("")}
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="int-enabled" type="checkbox" ${s.isEnabled?"checked":""} />
            この連携を有効にする
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="int-cancel">キャンセル</button>
          <button class="button primary" data-action="int-save" data-id="${s.id}">保存</button>
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
  `}function Fl(e,t){const s=e.reduce((r,c)=>r+c.totalAmount,0),n=e.filter(r=>r.financialStatus==="paid").length,i=e.filter(r=>r.fulfillmentStatus!=="fulfilled"&&r.fulfillmentStatus!=="shipped").length;return`
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
        <p class="kpi-value">¥${s.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">支払済 ${n}件</p>
      </article>
      <article class="panel kpi-card ${i>0?"kpi-alert":""}">
        <p class="panel-title">未発送</p>
        <p class="kpi-value">${i}件</p>
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
            ${e.map(r=>`
              <tr>
                <td class="mono">${r.orderNumber}</td>
                <td>${r.orderDate.slice(0,16).replace("T"," ")}</td>
                <td>${r.customerName}<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${r.customerEmail}</span></td>
                <td class="numeric">¥${r.totalAmount.toLocaleString("ja-JP")}</td>
                <td>
                  <span class="status-pill ${r.financialStatus==="paid"?"success":"warning"}">${r.financialStatus}</span>
                </td>
                <td>
                  <span class="status-pill ${r.fulfillmentStatus==="fulfilled"||r.fulfillmentStatus==="shipped"?"success":"warning"}">${r.fulfillmentStatus||"未"}</span>
                </td>
                <td style="font-size:12px;">${r.lineItems.map(c=>`${c.name} ×${c.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function zl(e,t,s){return`
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
      ${s?`
        <div style="margin-top:16px;">
          <h3 style="margin:0 0 8px;">📝 OCR結果</h3>
          <pre style="background:var(--surface-alt);padding:12px;border-radius:6px;white-space:pre-wrap;font-family:'Noto Sans JP',monospace;font-size:12px;max-height:300px;overflow:auto;">${s}</pre>
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
  `}function Bl(e,t,s){const n=t==="__new__"?null:e.find(c=>c.id===t),i=t==="__new__";return s?.role==="admin"?`
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
                <td><strong>${c.displayName}</strong>${c.id===s?.id?'<span style="color:var(--primary);font-size:11px;"> (あなた)</span>':""}</td>
                <td class="mono" style="font-size:12px;">${c.email}</td>
                <td>${kt[c.department]}</td>
                <td>${St[c.role]}</td>
                <td style="font-size:12px;">${c.lastSignInAt?c.lastSignInAt.slice(0,16).replace("T"," "):"―"}</td>
                <td>${c.isActive?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}</td>
                <td>
                  <button class="button-sm secondary" data-action="user-edit" data-id="${c.id}">編集</button>
                  ${c.id!==s?.id?`<button class="button-sm secondary" data-action="user-delete" data-id="${c.id}" style="color:var(--danger);">削除</button>`:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    ${n||i?`
      <section class="panel">
        <div class="panel-header">
          <h2>${i?"新規ユーザー":`${n?.displayName} 編集`}</h2>
        </div>
        ${i?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${n?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${n?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${n?"readonly":""} />
          </label>
          ${i?`<label class="field" style="flex:1 1 200px;">
                  <span>初期パスワード *</span>
                  <input id="user-password" type="password" placeholder="8文字以上" />
                </label>`:""}
          <label class="field" style="flex:1 1 120px;">
            <span>担当者コード</span>
            <input id="user-code" type="text" value="${n?.staffCode??""}" placeholder="S001" />
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>部署</span>
            <select id="user-dept">
              ${Object.entries(kt).map(([c,p])=>`<option value="${c}" ${n?.department===c?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(St).map(([c,p])=>`<option value="${c}" ${n?.role===c?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 160px;">
            <span>電話</span>
            <input id="user-phone" type="tel" value="${n?.phone??""}" placeholder="090-1234-5678" />
          </label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input id="user-active" type="checkbox" ${n?.isActive!==!1?"checked":""} />
            有効
          </label>
        </div>
        <div class="action-bar">
          <button class="button secondary" data-action="user-cancel">キャンセル</button>
          <button class="button primary" data-action="user-save" data-id="${n?.id??""}">保存</button>
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
    `}function Vl(e,t,s){return e?`
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
        <div><dt>部署</dt><dd>${kt[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${St[e.role]}</dd></div>
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
          ${s.map(n=>`<option value="${n.id}" ${e.defaultMailSenderId===n.id?"selected":""}>${n.name} &lt;${n.email}&gt;</option>`).join("")}
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
              ${t.slice(0,20).map(n=>`
                <tr>
                  <td style="font-size:12px;">${n.createdAt.slice(0,16).replace("T"," ")}</td>
                  <td><strong>${n.action}</strong></td>
                  <td style="font-size:12px;">${n.entityType??""} ${n.entityId??""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`}
    </section>
  `:`
      <section class="page-head"><div><h1>プロフィール</h1></div></section>
      <section class="panel"><p>プロフィール未登録です。ログインしてください。</p></section>
    `}function Jl(e){const t={};return e.forEach(s=>{const n=s.userEmail??"(anonymous)";t[n]=(t[n]??0)+1}),`
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
            ${e.map(s=>`
              <tr>
                <td style="font-size:12px;">${s.createdAt.replace("T"," ").slice(0,19)}</td>
                <td class="mono" style="font-size:12px;">${s.userEmail??"anonymous"}</td>
                <td><strong>${s.action}</strong></td>
                <td>${s.entityType??"―"} ${s.entityId?`<span class="mono" style="font-size:11px;">(${s.entityId})</span>`:""}</td>
                <td style="font-size:11px;color:var(--text-secondary);max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                  ${s.changes?JSON.stringify(s.changes).slice(0,100):"―"}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Yl(e){const t=e.prospects.reduce((r,c)=>r+c.expectedAmount,0),s=e.prospects.reduce((r,c)=>r+c.expectedAmount*c.probability/100,0),n=e.prospects.filter(r=>r.stage==="won").length,i=e.prospects.filter(r=>r.stage==="hot"||r.stage==="negotiating").length;return`
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
        <p class="kpi-value">¥${Math.round(s).toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">確度考慮</p>
      </article>
      <article class="panel kpi-card ${i>0?"kpi-alert":""}">
        <p class="panel-title">ホット案件</p>
        <p class="kpi-value">${i}件</p>
        <p class="kpi-sub">見込み高 + 商談中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注</p>
        <p class="kpi-value">${n}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?Ul(e.prospects):Ql(e.prospects)}

    ${Hl(e)}
  `}function Ul(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(n=>{const i=e.filter(c=>c.stage===n),r=i.reduce((c,p)=>c+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${n}">
          <div class="pk-col-header" style="--pk-color:${Ea[n]};">
            <span class="pk-col-label">${qt[n]}</span>
            <span class="pk-col-count">${i.length}</span>
          </div>
          <div class="pk-col-sub">¥${r.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${i.length===0?'<div class="wf-empty">―</div>':i.map(c=>`
              <div class="pk-card" data-prospect-id="${c.id}" draggable="true">
                <div class="pk-card-company">${c.companyName}</div>
                <div class="pk-card-meta">${c.businessType??""} ${c.contactName?"· "+c.contactName:""}</div>
                <div class="pk-card-amount">¥${c.expectedAmount.toLocaleString("ja-JP")} <span style="color:var(--text-secondary);">(${c.probability}%)</span></div>
                ${c.nextAction?`<div class="pk-card-action">🎯 ${c.nextAction}${c.nextActionDate?" ("+c.nextActionDate+")":""}</div>`:""}
                ${c.assignedStaffCode?`<div class="pk-card-staff">👤 ${c.assignedStaffCode}</div>`:""}
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function Ql(e){return`
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
                <td><span class="status-pill" style="background:${Ea[t.stage]};color:white;">${qt[t.stage]}</span></td>
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
  `}function Hl(e){if(!e.editingId)return"";const t=e.editingId==="__new__",s=t?null:e.prospects.find(n=>n.id===e.editingId);return!t&&!s?"":`
    <div class="modal-backdrop" data-action="prospect-close">
      <div class="modal-panel" onclick="event.stopPropagation()" style="width:min(720px, 100%);">
        <div class="modal-header">
          <h3>${t?"新規見込客":s.companyName}</h3>
          <button class="modal-close" data-action="prospect-close">×</button>
        </div>
        <div class="modal-body">
          <div class="filter-grid filter-grid--wide">
            <label class="field" style="flex:1 1 240px;">
              <span>会社名 *</span>
              <input id="prospect-company" type="text" value="${s?.companyName??""}" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>担当者</span>
              <input id="prospect-contact" type="text" value="${s?.contactName??""}" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>電話</span>
              <input id="prospect-phone" type="tel" value="${s?.phone??""}" />
            </label>
            <label class="field" style="flex:1 1 200px;">
              <span>メール</span>
              <input id="prospect-email" type="email" value="${s?.email??""}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>業種</span>
              <select id="prospect-business-type">
                ${["","飲食店","酒店","百貨店","スーパー","宿泊","小売","卸","その他"].map(n=>`<option value="${n}" ${s?.businessType===n?"selected":""}>${n||"―"}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>ステージ</span>
              <select id="prospect-stage">
                ${Object.entries(qt).map(([n,i])=>`<option value="${n}" ${s?.stage===n?"selected":""}>${i}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>流入元</span>
              <select id="prospect-source">
                ${["","展示会","紹介","WEB","コールド","問合せ","リピート"].map(n=>`<option value="${n}" ${s?.source===n?"selected":""}>${n||"―"}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>想定金額(円)</span>
              <input id="prospect-amount" type="number" value="${s?.expectedAmount??0}" />
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>成約確度(%)</span>
              <input id="prospect-probability" type="number" min="0" max="100" value="${s?.probability??10}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>担当者コード</span>
              <input id="prospect-staff" type="text" value="${s?.assignedStaffCode??""}" placeholder="S001" />
            </label>
            <label class="field" style="flex:1 1 160px;">
              <span>次回アクション日</span>
              <input id="prospect-next-date" type="date" value="${s?.nextActionDate??""}" />
            </label>
            <label class="field" style="flex:1 1 100%;">
              <span>次回アクション内容</span>
              <input id="prospect-next-action" type="text" value="${s?.nextAction??""}" placeholder="提案書持参で訪問" />
            </label>
            <label class="field" style="flex:1 1 100%;">
              <span>備考・メモ</span>
              <textarea id="prospect-note" rows="3">${s?.note??""}</textarea>
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
            <button class="button secondary" data-action="prospect-add-activity" data-id="${s.id}">記録</button>
          </div>
          <div class="summary-list">
            ${e.activities.slice(0,10).map(n=>`
              <div>
                <dt>${n.activityDate.slice(0,10)} - ${n.activityType}</dt>
                <dd>${n.title??""} ${n.result?`→ ${n.result}`:""}</dd>
              </div>
            `).join("")}
          </div>
          `}
        </div>
        <div class="action-bar" style="padding:12px 20px;border-top:1px solid var(--border);">
          ${t?"":`<button class="button secondary" data-action="prospect-convert" data-id="${s.id}" style="margin-right:auto;">🎯 得意先化</button>`}
          <button class="button secondary" data-action="prospect-close">キャンセル</button>
          <button class="button primary" data-action="prospect-save" data-id="${s?.id??""}">保存</button>
        </div>
      </div>
    </div>
  `}function Gl(e,t,s){const n=e?.config.webhook_url??"",i=e?.config.default_channel??"#general";return`
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
          <input id="slack-webhook" type="text" value="${n}" placeholder="https://hooks.slack.com/services/..." />
        </label>
        <label class="field" style="flex:0 0 140px;">
          <span>デフォルト先</span>
          <input id="slack-default-channel" type="text" value="${i}" />
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
            ${t.map(r=>`
              <tr>
                <td>${Pt[r.eventType]||r.eventType}</td>
                <td>
                  <label style="display:flex;align-items:center;gap:6px;">
                    <input type="checkbox" data-slack-rule-id="${r.id}" data-slack-field="enabled" ${r.enabled?"checked":""} />
                    ${r.enabled?"ON":"OFF"}
                  </label>
                </td>
                <td>
                  <input type="text" data-slack-rule-id="${r.id}" data-slack-field="channel" value="${r.channel}" style="width:180px;padding:4px 8px;" />
                </td>
                <td style="font-size:12px;color:var(--text-secondary);">${r.lastTriggeredAt?r.lastTriggeredAt.slice(0,16).replace("T"," "):"未通知"}</td>
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
        <h2>📋 送信履歴 (${s.length}件)</h2>
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
            ${s.length===0?'<tr><td colspan="5" class="empty-row">送信履歴がありません</td></tr>':""}
            ${s.map(r=>`
              <tr>
                <td style="font-size:12px;">${r.sentAt.slice(0,16).replace("T"," ")}</td>
                <td>${Pt[r.eventType]||r.eventType}</td>
                <td class="mono" style="font-size:12px;">${r.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${r.message}</td>
                <td><span class="status-pill ${r.status==="sent"?"success":"warning"}">${r.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Xl(e,t,s,n){const i=new Map(t.map(v=>[v.code,v])),r=e.filter(v=>v.callDirection==="inbound").length,c=e.filter(v=>v.callDirection==="outbound").length,p=e.filter(v=>v.callStatus==="missed").length,u=e.reduce((v,b)=>v+(b.durationSeconds??0),0),y=v=>{if(v===0)return"―";const b=Math.floor(v/60),w=v%60;return b>0?`${b}分${w}秒`:`${w}秒`},f=v=>{if(v.matchedCustomerCode){const b=i.get(v.matchedCustomerCode);if(b)return`${b.name} (既存)`}return"未登録番号"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">IVRy 電話連携</p>
        <h1>通話履歴</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="ivry-sync" ${n?"":"disabled"}>🔄 IVRyから同期</button>
        <button class="button secondary" data-action="ivry-push-phonebook" ${n?"":"disabled"}>📱 電話帳を送信</button>
      </div>
    </section>

    ${n?"":`
      <section class="panel">
        <p class="form-hint" style="margin:0;">
          ⚠️ IVRy連携が無効です。<a href="#" data-link="/integrations">連携設定</a>からAPIキーを設定してください。
        </p>
      </section>
    `}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">着信</p>
        <p class="kpi-value">${r}件</p>
        <p class="kpi-sub">不在 ${p}件</p>
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
        <p class="kpi-value" style="font-size:13px;">${s?s.slice(0,16).replace("T"," "):"未同期"}</p>
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
            ${e.map(v=>`
              <tr>
                <td style="font-size:12px;">${v.startedAt?new Date(v.startedAt).toLocaleString("ja-JP"):"―"}</td>
                <td>
                  ${v.callDirection==="inbound"?'<span class="status-pill neutral">📞 着信</span>':'<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${f(v)}</strong>
                  ${v.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${v.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${v.callDirection==="inbound"?v.fromNumber:v.toNumber}</td>
                <td>
                  ${v.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':v.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${v.callStatus}</span>`}
                </td>
                <td>${y(v.durationSeconds??0)}</td>
                <td>${v.recordingUrl?`<a href="${v.recordingUrl}" target="_blank" class="button-sm secondary">🎧 再生</a>`:"―"}</td>
                <td>
                  ${v.matchedCustomerCode?"":`<button class="button-sm secondary" data-action="call-link-customer" data-id="${v.id}" data-phone="${v.callDirection==="inbound"?v.fromNumber:v.toNumber}">顧客に紐付け</button>`}
                  <button class="button-sm secondary" data-action="call-memo" data-id="${v.id}">メモ</button>
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
  `}const Kl=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function Wl(e){const t=e.activeListId?e.lists.find(r=>r.id===e.activeListId):null,s=e.items.filter(r=>r.status==="new").length,n=e.items.filter(r=>r.status==="imported").length,i=e.items.filter(r=>r.status==="excluded").length;return`
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
            ${Kl.map(r=>`<option value="${r}" ${e.searchBusinessType===r?"selected":""}>${r}</option>`).join("")}
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
                ${e.searchResults.map((r,c)=>`
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${c}" checked /></td>
                    <td><strong>${r.companyName}</strong></td>
                    <td style="font-size:12px;">${r.address??"―"}</td>
                    <td class="numeric">${r.rating?`⭐${r.rating}`:"―"}</td>
                    <td class="numeric">${r.reviewCount??"―"}</td>
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
        ${e.lists.map(r=>`
          <button class="button ${e.activeListId===r.id?"primary":"secondary"}"
                  data-action="lb-select-list" data-id="${r.id}">
            ${r.name} (${r.totalCount})
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
            <span>🆕 新規: <strong>${s}</strong></span>
            <span>✅ 取込済: <strong>${n}</strong></span>
            <span>❌ 除外: <strong>${i}</strong></span>
          </div>
        </div>

        <div style="margin-bottom:12px;">
          <button class="button primary" data-action="lb-bulk-convert" ${s===0?"disabled":""}>
            🎯 選択行を見込客に一括変換 (${s}件)
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
              ${e.items.map(r=>`
                <tr ${r.status==="excluded"?'style="opacity:0.4;"':""}>
                  <td>${r.status==="new"?`<input type="checkbox" class="lb-item-check" data-id="${r.id}" />`:""}</td>
                  <td><strong>${r.companyName}</strong></td>
                  <td style="font-size:12px;">${r.address??"―"}</td>
                  <td class="mono" style="font-size:12px;">${r.phone??"―"}</td>
                  <td class="numeric">${r.rating?`⭐${r.rating}(${r.reviewCount??0})`:"―"}</td>
                  <td>
                    ${r.status==="new"?'<span class="status-pill neutral">新規</span>':r.status==="imported"?'<span class="status-pill success">取込済</span>':'<span class="status-pill warning">除外</span>'}
                  </td>
                  <td>
                    ${r.status==="new"?`<button class="button-sm secondary" data-action="lb-exclude" data-id="${r.id}">除外</button>`:""}
                    ${r.status==="new"?`<button class="button-sm primary" data-action="lb-convert-one" data-id="${r.id}">→見込客</button>`:""}
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
  `}const ds={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Zl={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},ec={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function te(e){return"¥"+e.toLocaleString("ja-JP")}function st(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Pn(e,t){const s=e.reduce((r,c)=>r+c.amount,0),n=Math.floor(s*t),i=s+n;return{subtotal:s,taxAmount:n,total:i}}const Y={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function H(e,t){const s=e.align??"left",n=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${s}`,`font-size:${n}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Jt(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),s=t.getFullYear(),n=s-2018;return{y:n>0?String(n).padStart(2,"0"):String(s).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function tc(e,t,s){const n=Jt(e.documentDate),i=Jt(e.orderDate??e.documentDate),r=Jt(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((l,d)=>{const m=Y.detailStartY+d*Y.detailRowH,g=Y.detailCols,$=[],x=(A,S)=>{S&&$.push(H({...A,y:m,x:A.x+0},S))};return x(g.productName,l.productName+(l.spec?` ${l.spec}`:"")),x(g.productCode,l.productCode),x(g.color,l.color??""),x(g.size,[l.size,l.caseQty?`×${l.caseQty}`:""].filter(Boolean).join(" ")),x(g.unit,l.unit),x(g.quantity,l.quantity>0?l.quantity.toLocaleString("ja-JP"):""),x(g.correctedQty,l.correctedQuantity?l.correctedQuantity.toLocaleString("ja-JP"):""),x(g.discount,l.discount?l.discount.toLocaleString("ja-JP"):""),x(g.unitPrice,l.unitPrice>0?l.unitPrice.toLocaleString("ja-JP"):""),x(g.costAmount,l.amount>0?l.amount.toLocaleString("ja-JP"):""),x(g.retailPrice,l.retailPrice?l.retailPrice.toLocaleString("ja-JP"):""),x(g.note,l.receivedAmount?l.receivedAmount.toLocaleString("ja-JP"):""),$.join("")}).join(""),p=e.lines.reduce((l,d)=>l+(d.amount||0),0),u=e.lines.reduce((l,d)=>l+(d.retailPrice||0)*(d.correctedQuantity??d.quantity),0),y=e.lines.reduce((l,d)=>l+(d.receivedAmount||0),0),f=e.lines.reduce((l,d)=>l+(d.returnAmount||0),0),v=e.lines.reduce((l,d)=>l+d.quantity,0),b=s.showReferenceOverlay?`background-image: url('${s.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",w=s.calibrationOffsetX||0,P=s.calibrationOffsetY||0,o=`transform: translate(${w}mm, ${P}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${b}">
        ${s.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-s.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${o}">
        ${H(Y.currentDateY,n.y)}
        ${H(Y.currentDateM,n.m)}
        ${H(Y.currentDateD,n.d)}
        ${H(Y.documentNo,e.documentNo)}
        ${e.settlementPrint?H(Y.settlementCheck,"✓"):""}

        ${H(Y.vendorName,t.name)}
        ${H(Y.vendorAddress,t.address1)}
        ${H(Y.chainStoreCode,e.chainStoreCode??"")}
        ${H(Y.categoryCode,e.categoryCode??"")}
        ${H(Y.slipNumber,e.documentNo)}
        ${H(Y.vendorCode,e.slipTypeCode??"")}

        ${H(Y.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${H(Y.orderDateY,i.y)}
        ${H(Y.orderDateM,i.m)}
        ${H(Y.orderDateD,i.d)}
        ${H(Y.deliveryDateY,r.y)}
        ${H(Y.deliveryDateM,r.m)}
        ${H(Y.deliveryDateD,r.d)}
        ${H(Y.orderNo,e.orderNo??"")}
        ${H(Y.partnerCode,e.vendorCode??"")}

        ${c}

        ${H(Y.totalQty,v.toLocaleString("ja-JP"))}
        ${H(Y.receivedTotal,y.toLocaleString("ja-JP"))}
        ${H(Y.returnTotal,f.toLocaleString("ja-JP"))}
        ${H(Y.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${H(Y.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function ac(e,t,s){const{subtotal:n,taxAmount:i,total:r}=Pn(e.lines,e.taxRate),c=e.previousBalance??0,p=e.paymentAmount??0,u=c-p+r,y=e.lines.map(v=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${v.note??""}</td>
        <td>${v.productName}${v.spec?` <span style="color:#636e72;font-size:9pt;">/ ${v.spec}</span>`:""}</td>
        <td class="numeric">${v.quantity.toLocaleString("ja-JP")}</td>
        ${s.showUnit?`<td>${v.unit}</td>`:""}
        <td class="numeric">${te(v.unitPrice)}</td>
        <td class="numeric">${te(v.amount)}</td>
      </tr>
    `).join(""),f=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td><td></td>${s.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page invoice-freee ${s.fontSize}">
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
          ${s.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${t.registrationNo}</span></p>`:""}
          ${s.showSeal?`<div class="freee-seal-wrap">${t.sealImageUrl?`<img src="${t.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
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
        <div><dt>請求日</dt><dd>${st(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${st(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${te(u)}</span>
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
        <tbody>${y}${f}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${s.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${te(n)} / 消費税: ${te(i)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${te(c)}</td></tr>`:""}
          ${p?`<tr><th>ご入金額</th><td>▲ ${te(p)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${te(n)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${te(i)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${te(u)}</td></tr>
        </table>
      </div>

      <!-- 振込先 -->
      ${s.showBankInfo?`
        <div class="freee-bank">
          <h3>お振込先</h3>
          <p><strong>${t.bankName}</strong> ${t.bankBranch}　${t.bankAccountType} ${t.bankAccountNo}</p>
          <p>口座名義: ${t.bankAccountHolder}</p>
          <p class="freee-bank-note">※ お振込手数料はお客様にてご負担くださいますようお願い申し上げます。</p>
        </div>`:""}

      <!-- 備考 -->
      ${s.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}
    </div>
  `}function sc(e,t,s){const{subtotal:n,taxAmount:i,total:r}=Pn(e.lines,e.taxRate),c=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${s.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${te(u.unitPrice)}</td>
        <td class="numeric">${te(u.amount)}</td>
      </tr>
    `).join(""),p=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td>${s.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page quotation-freee ${s.fontSize}">
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
          ${s.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${t.registrationNo}</span></p>`:""}
          ${s.showSeal?`<div class="freee-seal-wrap">${t.sealImageUrl?`<img src="${t.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
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
        <div><dt>見積日</dt><dd>${st(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${st(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${te(r)}</span>
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
        <tbody>${c}${p}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${s.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${te(n)} / 消費税: ${te(i)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${te(n)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${te(i)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${te(r)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${s.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?st(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function nc(e,t,s,n){let i="";switch(e){case"chain_store":i=tc(n,s,t);break;case"quotation":i=sc(n,s,t);break;case"invoice_monthly":i=ac(n,s,t);break}const r=Object.keys(ds).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${ds[u]}</button>`).join(""),c=n.lines.map((u,y)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${y}" data-print-lfield="productName" value="${u.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${y}" data-print-lfield="quantity" value="${u.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${y}" data-print-lfield="unitPrice" value="${u.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${y}">✕</button></td>
      </tr>`).join(""),p=[{key:"showSeal",label:"印影"},{key:"showRegistrationNo",label:"登録番号"},{key:"showBankInfo",label:"振込先"},{key:"showJanCode",label:"JAN"},{key:"showRemarks",label:"備考"}].map(u=>`<label style="font-size:12px;"><input type="checkbox" data-print-opt="${u.key}" ${t[u.key]?"checked":""} /> ${u.label}</label>`).join(" ");return`
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
      <div class="tab-group">${r}</div>
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
              <tbody>${c||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
            </table>
          </div>
        </div>

        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">⚙️ 表示オプション</summary>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
            ${p}
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
              ${i}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 印刷時はプレビューだけ表示 -->
    <div class="print-only">
      <div class="print-preview ${t.colorMode}">
        ${i}
      </div>
    </div>
  `}const oc={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},ic={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function rc(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let s=[],n="",i=!1;for(let p=0;p<e.length;p++){const u=e[p];i?u==='"'?e[p+1]==='"'?(n+='"',p++):i=!1:n+=u:u==='"'?i=!0:u===","?(s.push(n),n=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,s.push(n),s.some(y=>y!=="")&&t.push(s),s=[],n=""):n+=u}if((n!==""||s.length>0)&&(s.push(n),s.some(p=>p!=="")&&t.push(s)),t.length===0)return{columns:[],rows:[]};const r=t[0].map(p=>p.trim()),c=[];for(let p=1;p<t.length;p++){const u={};r.forEach((y,f)=>{u[y]=(t[p][f]??"").trim()}),c.push(u)}return{columns:r,rows:c}}function lc(e,t,s){const n=oc[e],i=n.filter(p=>!t.includes(p)),r=s.map(p=>{const u=[];i.length>0&&u.push(`必須列欠損: ${i.join(",")}`);for(const y of n)t.includes(y)&&!p[y]&&u.push(`${y}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),c=r.filter(p=>p._valid).length;return{entity:e,columns:t,rows:r,totalRows:s.length,validRows:c,invalidRows:r.length-c}}function cc(e){const s=ic[e],i={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+s.join(",")+`
`+i.join(",")+`
`}async function dc(e,t){const{supabaseInsert:s}=await E(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>z);return{supabaseInsert:p}},void 0);let n=0,i=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:y,...f}=p,v={...f};if(!v.id){const b=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";v.id=String(f[b]??`${e}-${Date.now()}-${n+i}`)}for(const b of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof v[b]=="string"&&v[b]!==""){const w=Number(v[b]);Number.isFinite(w)&&(v[b]=w)}try{await s(c,v)!==null?n++:i++}catch{i++}}return{inserted:n,failed:i}}function Yt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function uc(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function pc(e,t,s,n,i){const r=s.reduce((y,f)=>y+f.rowCount,0),c=s.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(i/p));return`
    <section class="page-head">
      <div>
        <p class="eyebrow">raw同期データ</p>
        <h1>データブラウザ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">テーブル数</p>
        <p class="kpi-value">${s.length}</p>
        <p class="kpi-sub">酒仙iファイル</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">合計レコード</p>
        <p class="kpi-value">${r.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">全テーブル合計</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">最終同期</p>
        <p class="kpi-value">${c?Yt(c):"---"}</p>
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
        ${s.map(y=>`
          <button
            class="panel kpi-card ${e===y.tableName?"kpi-alert":""}"
            type="button"
            data-action="raw-select-table"
            data-table="${y.tableName}"
            style="cursor:pointer;text-align:left;border:2px solid ${e===y.tableName?"var(--primary)":"transparent"};transition:border-color .15s;"
          >
            <p class="panel-title" style="font-size:12px;">${y.displayName}</p>
            <p class="kpi-value" style="font-size:18px;">${y.rowCount.toLocaleString("ja-JP")}</p>
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?Yt(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${s.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${i.toLocaleString("ja-JP")}件中 ${((n-1)*p+1).toLocaleString("ja-JP")}-${Math.min(n*p,i).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${n<=1?"disabled":""}>← 前</button>
          <span style="padding:0 8px;">${n} / ${u}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${n>=u?"disabled":""}>次 →</button>
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
              <td>${y._synced_at?Yt(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${uc(y._raw_b64)}</td>
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
  `}const ra=400,la=240;function U(e){return e.toLocaleString("ja-JP")}function Ut(e){const[t,s]=e.split("-");return`${t.slice(2)}/${s}`}function mc(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function fe(e,t,s,n=""){return`<th class="${n}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${mc(s,t)}</th>`}function Ze(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function yc(e){const{months:t,matrix:s}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const n=e.products.slice().sort((d,m)=>(e.productTotals[m.code]??0)-(e.productTotals[d.code]??0)).slice(0,6),i=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],r=820,c=280,p={top:20,right:20,bottom:40,left:60},u=r-p.left-p.right,y=c-p.top-p.bottom,f=t.map(d=>n.reduce((m,g)=>m+(s[g.code]?.[d]??0),0)),v=Math.max(...f,1),b=u/t.length,w=Math.max(b-10,14),P=[0,.25,.5,.75,1].map(d=>{const m=p.top+y-y*d,g=`${Math.round(v*d/100)*100}`;return`
      <line x1="${p.left}" y1="${m}" x2="${r-p.right}" y2="${m}" class="chart-grid" />
      <text x="6" y="${m+4}" class="chart-axis">${Number(g).toLocaleString("ja-JP")}</text>
    `}).join(""),o=t.map((d,m)=>{let g=p.top+y;const $=p.left+m*b+(b-w)/2,x=n.map((T,R)=>{const K=(s[T.code]?.[d]??0)/v*y;return g-=K,`<rect x="${$}" y="${g}" width="${w}" height="${K}" fill="${i[R%i.length]}" opacity="0.85" rx="${R===n.length-1?3:0}" />`}).join(""),[A,S]=d.split("-"),C=parseInt(S),I=C===1||m%3===0,L=C===1?`${A.slice(2)}年`:`${C}月`;return`<g>${x}${I?`<text x="${$+w/2}" y="${c-10}" class="chart-axis centered-axis">${L}</text>`:""}</g>`}).join(""),l=n.map((d,m)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${i[m%i.length]};"></span>
       ${d.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${P}${o}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${l}</div>
  `}function hc(e){const{months:t,products:s}=e,n=s.slice().sort((c,p)=>(e.productTotals[p.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),i=t.map(c=>{const[p,u]=c.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${p.slice(2)}年1月`:`${y}月`}</th>`}).join(""),r=n.map(c=>{const p=t.map(u=>{const y=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${y>0?U(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${c.code}</td>
        <td style="white-space:nowrap;">${c.name}</td>
        ${p}
        <td class="numeric"><strong>${U(e.productTotals[c.code]??0)}</strong></td>
        <td class="numeric">${U(Math.round(e.productAvg[c.code]??0))}</td>
        <td class="numeric">${U(Math.round(e.productStdDev[c.code]??0))}</td>
      </tr>
    `}).join("");return`
    <div class="table-wrap" style="overflow-x:auto;">
      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>商品名</th>
            ${i}
            <th class="numeric">合計</th>
            <th class="numeric">月平均</th>
            <th class="numeric">標準偏差</th>
          </tr>
        </thead>
        <tbody>${r||`<tr><td colspan="${t.length+5}" class="empty-row">データなし</td></tr>`}</tbody>
      </table>
    </div>
  `}function fc(e,t){const s=e.months[e.months.length-1]??"",n=e.months[e.months.length-2]??"",i=e.months.length-13,r=i>=0?e.months[i]:"",c=e.products.reduce((w,P)=>w+(e.matrix[P.code]?.[s]??0),0),p=e.products.reduce((w,P)=>w+(e.matrix[P.code]?.[n]??0),0),u=r?e.products.reduce((w,P)=>w+(e.matrix[P.code]?.[r]??0),0):0,y=p>0?(c-p)/p*100:0,f=u>0?(c-u)/u*100:0,v=w=>w>=0?"+":"",b=[1,2,3,5].map(w=>`<option value="${w}" ${w===t?"selected":""}>${w}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${U(c)} 本</p>
        <p class="kpi-sub">${Ut(s)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${v(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${Ut(n)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${f>=0?"":"text-danger"}">${u>0?`${v(f)}${f.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${r?`${Ut(r)} 比`:"前年データなし"}</p>
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
            <select data-action="demand-years-back" style="width:80px;">${b}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${yc(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${hc(e)}
    </section>
  `}function vc(e,t){const n=e.slice().sort((r,c)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*r.productName.localeCompare(c.productName,"ja");case"ss-avg":return p*(r.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return p*(r.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(Ze(r.serviceLevel)*r.demandStdDev*Math.sqrt(r.leadTimeDays/30)),y=Math.ceil(Ze(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-y)}case"ss-rop":{const u=Math.ceil(r.avgMonthlyDemand*(r.leadTimeDays/30)+Ze(r.serviceLevel)*r.demandStdDev*Math.sqrt(r.leadTimeDays/30)),y=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+Ze(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-y)}default:return 0}}).map(r=>{const c=Ze(r.serviceLevel),p=r.leadTimeDays/30,u=Math.ceil(c*r.demandStdDev*Math.sqrt(p)),y=Math.ceil(r.avgMonthlyDemand*p+u),f=u-r.safetyStockQty,v=f>0?"text-danger":f<-u*.3?"text-warning":"",b=[.9,.95,.99].map(w=>`<option value="${w}" ${Math.abs(r.serviceLevel-w)<.01?"selected":""}>${(w*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${r.productName}</td>
        <td class="numeric">${U(Math.round(r.avgMonthlyDemand))}</td>
        <td class="numeric">${U(Math.round(r.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${r.leadTimeDays}"
            data-action="ss-lead-time" data-code="${r.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${r.productCode}"
            style="width:64px;">${b}</select>
        </td>
        <td class="numeric"><strong>${U(u)}</strong></td>
        <td class="numeric">${U(y)}</td>
        <td class="numeric ${v}">
          ${f>0?`+${U(f)}`:U(f)}
          ${f>0?'<span class="status-pill warning" style="margin-left:4px">不足</span>':""}
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
          <select id="bulk-service-level" style="width:90px;">${[.9,.95,.99].map(r=>`<option value="${r}" ${r===.95?"selected":""}>${(r*100).toFixed(0)}%</option>`).join("")}</select>
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
              ${fe("商品名","ss-name",t)}
              ${fe("月平均需要","ss-avg",t,"numeric")}
              ${fe("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${fe("安全在庫[算出]","ss-ss",t,"numeric")}
              ${fe("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${n||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const gc={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function bc(e,t,s,n){const i={draft:"下書き",confirmed:"確定",actual:"実績入力済"},r={draft:"neutral",confirmed:"info",actual:"success"},c=S=>Object.entries(gc).map(([C,I])=>`<option value="${C}" ${C===S?"selected":""}>${I}</option>`).join(""),p=640,u=S=>S.map(C=>{const I=Math.max(0,C.demandForecast+C.safetyStockTarget-C.openingStock),L=C.plannedQty>0?C.plannedQty:Math.round(I),T=L>0?Math.ceil(L/p*10)/10:0,R=C.plannedQty>0?(C.actualQty-C.plannedQty)/C.plannedQty*100:null,j=R!==null?R>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${C.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${C.productCode}"
            style="width:92px;">${c(C.productionType)}</select>
        </td>
        <td class="numeric">${U(Math.round(C.demandForecast))}</td>
        <td class="numeric">${U(Math.round(C.safetyStockTarget))}</td>
        <td class="numeric">${U(Math.round(C.openingStock))}</td>
        <td class="numeric"><strong>${U(Math.round(I))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${C.plannedQty}"
            data-action="plan-qty" data-code="${C.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${C.actualQty>0?U(C.actualQty):"—"}</td>
        <td class="numeric ${j}">
          ${R!==null?`${R>=0?"+":""}${R.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${T>0?`${T.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${r[C.status]??"neutral"}">${i[C.status]??C.status}</span>
        </td>
      </tr>
    `}).join(""),f=(s==="all"?e:e.filter(S=>S.productionType===s)).slice().sort((S,C)=>{if(!n)return 0;const I=n.dir==="asc"?1:-1,L=Math.max(0,S.demandForecast+S.safetyStockTarget-S.openingStock),T=Math.max(0,C.demandForecast+C.safetyStockTarget-C.openingStock);switch(n.column){case"plan-name":return I*S.productName.localeCompare(C.productName,"ja");case"plan-forecast":return I*(S.demandForecast-C.demandForecast);case"plan-required":return I*(L-T);case"plan-planned":return I*(S.plannedQty-C.plannedQty);case"plan-actual":return I*(S.actualQty-C.actualQty);case"plan-label":{const R=S.plannedQty>0?S.plannedQty:Math.round(L),j=C.plannedQty>0?C.plannedQty:Math.round(T);return I*(R-j)}default:return 0}}),v=u(f),b=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],w=S=>{const I=(S==="all"?e:e.filter(L=>L.productionType===S)).reduce((L,T)=>{const R=Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock);return L+(T.plannedQty>0?T.plannedQty:Math.round(R))},0);return Math.ceil(I/p*10)/10},P=b.filter(S=>S.key!=="all").map(S=>{const C=w(S.key),I=e.filter(T=>T.productionType===S.key).length,L=S.key==="make_to_order"?e.filter(T=>T.productionType==="make_to_order"&&T.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${S.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${C>0?C.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${I}商品${L!==null?` · 受注${L}件`:""}</p>
      </div>
    `}).join(""),o=f.reduce((S,C)=>S+C.demandForecast,0),l=f.reduce((S,C)=>S+Math.max(0,C.demandForecast+C.safetyStockTarget-C.openingStock),0),d=f.reduce((S,C)=>S+C.plannedQty,0),m=f.reduce((S,C)=>S+C.actualQty,0),g=w(s),$=new Date,x=Array.from({length:24},(S,C)=>{const I=new Date($.getFullYear(),$.getMonth()-6+C,1),L=`${I.getFullYear()}-${String(I.getMonth()+1).padStart(2,"0")}`;return`<option value="${L}" ${L===t?"selected":""}>${L.replace("-","年")}月</option>`}).join(""),A=b.map(S=>`<button class="button ${s===S.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${S.key}"
       style="padding:4px 12px;font-size:13px;">${S.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${x}</select>
      </label>
      <button class="button secondary" type="button" data-action="plan-recalc">需要予測を再計算</button>
    </div>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>ラベル工数サマリ</h2><p class="panel-caption">表+裏 手貼り 80本/時 × 8h = 640本/人日</p></div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${P}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>生産計画 — ${t.replace("-","年")}月</h2>
          <p class="panel-caption">必要生産数 = 需要予測 + 安全在庫目標 − 期首在庫</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="button secondary" type="button" data-action="plan-csv-export">CSV出力</button>
          <button class="button primary" type="button" data-action="plan-save">計画を保存</button>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${A}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${fe("商品名","plan-name",n)}
              <th>生産区分</th>
              ${fe("需要予測","plan-forecast",n,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${fe("必要生産数","plan-required",n,"numeric")}
              ${fe("計画数","plan-planned",n,"numeric")}
              ${fe("実績数","plan-actual",n,"numeric")}
              <th class="numeric">達成率</th>
              ${fe("ラベル工数","plan-label",n,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${v||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${f.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${U(Math.round(o))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${U(Math.round(l))}</td>
                <td class="numeric">${U(d)}</td>
                <td class="numeric">${m>0?U(m):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${g.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function An(e){const[t,s]=e.split("-").map(Number),n=new Date(t,s,0).getDate();return Array.from({length:n},(i,r)=>{const c=r+1;return`${e}-${String(c).padStart(2,"0")}`})}function us(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function ps(e){const t=new Date(e).getDay();return t===0||t===6}function $c(e){return e.partTimers*ra+e.employees*la}function Cn(e){return e.partTimers+e.employees}function _c(e,t){const s=t.filter(c=>Cn(c)>0).map(c=>c.date).sort();if(s.length===0)return t.map(c=>({date:c.date,partTimers:c.partTimers,employees:c.employees,confirmed:c.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const n={monthly:0,november:1,annual:2,make_to_order:3},i=e.filter(c=>c.plannedQty>0||Math.max(0,c.demandForecast+c.safetyStockTarget-c.openingStock)>0).map(c=>({productCode:c.productCode,productName:c.productName,productionType:c.productionType,remaining:c.plannedQty>0?c.plannedQty:Math.max(0,c.demandForecast+c.safetyStockTarget-c.openingStock)})).filter(c=>c.remaining>0).sort((c,p)=>(n[c.productionType]??99)-(n[p.productionType]??99)||p.remaining-c.remaining),r=new Map;for(const c of t){const p=$c(c);r.set(c.date,{date:c.date,partTimers:c.partTimers,employees:c.employees,confirmed:c.confirmed,capacity:p,items:[],totalQty:0,utilization:0})}for(const c of i){let p=c.remaining;if(p<=0)continue;if(s.reduce((y,f)=>{const v=r.get(f);return y+Math.max(0,v.capacity-v.totalQty)},0)<=0)break;for(const y of s){if(p<=0)break;const f=r.get(y),v=Math.max(0,f.capacity-f.totalQty);if(v<=0)continue;const b=Math.min(p,v);f.items.push({productCode:c.productCode,productName:c.productName,productionType:c.productionType,qty:b}),f.totalQty+=b,f.utilization=f.capacity>0?f.totalQty/f.capacity:0,p-=b}}return t.map(c=>r.get(c.date))}function xt(e,t=1,s=1){return An(e).map(n=>({date:n,partTimers:ps(n)?0:t,employees:ps(n)?0:s,confirmed:!1}))}function wc(e,t,s,n=null){const i=An(t),r=_c(e,s),c=new Map(r.map(L=>[L.date,L])),p=e.reduce((L,T)=>L+(T.plannedQty>0?T.plannedQty:Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock)),0),u=r.reduce((L,T)=>L+T.totalQty,0),y=s.filter(L=>Cn(L)>0).length,f=r.reduce((L,T)=>L+T.capacity,0),v=s.reduce((L,T)=>L+T.partTimers,0),b=s.reduce((L,T)=>L+T.employees,0),w=s.find(L=>L.partTimers>0)?.partTimers??1,P=s.find(L=>L.employees>0)?.employees??1,o=[0,1,2,3,4,5].map(L=>`<option value="${L}" ${L===w?"selected":""}>${L}</option>`).join(""),l=[0,1,2,3].map(L=>`<option value="${L}" ${L===P?"selected":""}>${L}</option>`).join(""),d=new Date,m=Array.from({length:24},(L,T)=>{const R=new Date(d.getFullYear(),d.getMonth()-6+T,1),j=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}`;return`<option value="${j}" ${j===t?"selected":""}>${j.replace("-","年")}月</option>`}).join(""),g=new Date(i[0]).getDay(),$=[];for(let L=0;L<g;L++)$.push('<div style="min-height:44px;"></div>');for(const L of i){const T=c.get(L),R=new Date(L).getDay(),j=parseInt(L.split("-")[2]),K=T?.partTimers??0,se=T?.employees??0,oe=K+se,ve=T?.totalQty??0,ie=T?.utilization??0,M=L===n,X=oe===0?"var(--surface-alt)":ie>.95?"rgba(197,61,61,0.12)":ie>.7?"rgba(183,121,31,0.10)":ie>0?"rgba(47,133,90,0.08)":"var(--surface)",Ue=oe===0?"transparent":ie>.95?"#c53d3d":ie>.7?"#b7791f":ie>0?"#2f855a":"var(--border)",De=R===0?"#c53d3d":R===6?"#0F5B8D":"var(--text)",qe=oe>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${K>0?`パ${K}`:""}${se>0?`社${se}`:""}</span>`:"";$.push(`
      <div data-action="cal-select-day" data-date="${L}"
        style="min-height:44px;padding:3px;border:${M?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${X};cursor:pointer;display:flex;flex-direction:column;
          ${M?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${De};line-height:1;">${j}</span>
          ${qe}
        </div>
        ${oe>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${ve>0?U(ve):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(ie*100,100)}%;background:${Ue};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const A=$.length%7;if(A>0)for(let L=0;L<7-A;L++)$.push('<div style="min-height:44px;"></div>');const S=n?c.get(n):null;n&&s.find(L=>L.date===n);const C=n&&S?(()=>{const L=S,T=parseInt(n.split("-")[2]),R=us(n),j=Math.round(L.utilization*100),K=s.find(M=>M.date===n),se={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},oe={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},ve=L.items.map(M=>`
      <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="width:8px;height:8px;border-radius:50%;background:${se[M.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${M.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${oe[M.productionType]??M.productionType}</div>
        </div>
        <div style="font-size:14px;font-weight:700;white-space:nowrap;">${U(M.qty)}<span style="font-size:11px;font-weight:400;">本</span></div>
      </div>
    `).join(""),ie=`パート${L.partTimers}人×${ra} + 社員${L.employees}人×${la} = ${U(L.capacity)}本`;return`
      <section class="panel" style="margin-top:12px;border:2px solid #0F5B8D;">
        <div class="panel-header" style="padding-bottom:8px;">
          <h2>${T}日（${R}）の生産内訳</h2>
          <p class="panel-caption">${ie} ・ 稼働率${j}%</p>
        </div>
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${K?.partTimers??0}"
              data-action="cal-shift-part" data-date="${n}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${K?.employees??0}"
              data-action="cal-shift-emp" data-date="${n}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${L.items.length>0?`
          <div style="padding:0 4px;">
            ${ve}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${U(L.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():n?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(n.split("-")[2])}日（${us(n)}）— 休日</p>
        <div style="display:flex;gap:12px;justify-content:center;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="0"
              data-action="cal-shift-part" data-date="${n}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="0"
              data-action="cal-shift-emp" data-date="${n}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
      </div>
    </section>
  `:"",I=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(L=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${L.color};"></span>${L.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${m}</select>
      </label>
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>パート</span>
        <select data-action="cal-default-part" style="width:54px;">${o}</select>
      </label>
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>社員</span>
        <select data-action="cal-default-emp" style="width:54px;">${l}</select>
      </label>
      <button class="button secondary" type="button" data-action="cal-reset-shifts"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">リセット</button>
      <button class="button primary" type="button" data-action="cal-confirm-all"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">全日確定</button>
    </div>

    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;font-size:12px;">
      <span><strong>${U(Math.round(p))}</strong>本予定</span>
      <span><strong>${U(Math.round(u))}</strong>本配分${p>0?`（${Math.round(u/p*100)}%）`:""}</span>
      <span><strong>${y}</strong>日稼働</span>
      <span>パ<strong>${v}</strong> 社<strong>${b}</strong>人日</span>
      <span>キャパ<strong>${U(f)}</strong>本</span>
    </div>
    <div style="font-size:10px;color:var(--text-secondary);margin-bottom:8px;">
      パート: 80本/時×5h=<strong>${ra}</strong>本/人日　社員: 80本/時×3h=<strong>${la}</strong>本/人日
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${I}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((L,T)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${T===0?"#c53d3d":T===6?"#0F5B8D":"var(--text-secondary)"};">${L}</div>`).join("")}
        ${$.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付をタップで詳細表示</p>
    </section>

    ${C}
  `}function xc(e,t,s,n,i,r,c="all",p=null,u=[],y=null){const v=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(w=>`<button class="tab-button ${n===w.key?"active":""}"
       data-demand-tab="${w.key}">${w.label}</button>`).join("");let b="";if(n==="demand")b=e?fc(e,r):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(n==="safety")b=vc(t,p);else if(n==="plan")b=bc(s,i,c,p);else if(n==="calendar")try{b=wc(s,i,u,y)}catch(w){console.error("[renderCalendarTab] error:",w),b=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(w)}
${w?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${v}
    </div>

    ${b}
  `}const ot={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Nt=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function Fe(e){return e.toLocaleString("ja-JP")}function ze(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function Ta(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Sc(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function kc(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(l=>l.month))].sort(),s=Nt.filter(l=>e.some(d=>d.brewCategory===l)),n={};for(const l of e)n[l.month]||(n[l.month]={}),n[l.month][l.brewCategory]=l.shipmentMl;const i=820,r=300,c={top:20,right:20,bottom:50,left:70},p=i-c.left-c.right,u=r-c.top-c.bottom,y=t.map(l=>s.reduce((d,m)=>d+(n[l]?.[m]??0),0)),f=Math.max(...y,1),v=p/t.length,b=Math.max(v-8,14),w=[0,.25,.5,.75,1].map(l=>{const d=c.top+u-u*l,m=f*l/1e3;return`
      <line x1="${c.left}" y1="${d}" x2="${i-c.right}" y2="${d}" class="chart-grid" />
      <text x="6" y="${d+4}" class="chart-axis">${Math.round(m).toLocaleString("ja-JP")}L</text>
    `}).join(""),P=t.map((l,d)=>{let m=c.top+u;const g=c.left+d*v+(v-b)/2,$=s.map(L=>{const T=n[l]?.[L]??0,R=T/f*u;return m-=R,R>0?`<rect x="${g}" y="${m}" width="${b}" height="${R}" fill="${ot[L]??"#9ca3af"}" opacity="0.85" rx="1"><title>${L}: ${ze(T)}L</title></rect>`:""}).join(""),[x,A]=l.split("-"),S=parseInt(A),C=S===10||d%2===0,I=S===10?`${x}年度`:`${S}月`;return`<g>${$}${C?`<text x="${g+b/2}" y="${r-12}" class="chart-axis centered-axis" style="font-size:10px;">${I}</text>`:""}</g>`}).join(""),o=s.map(l=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${ot[l]??"#9ca3af"};"></span>
       ${l}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${i} ${r}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${w}${P}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${o}</div>
  `}function Pc(e){const t=new Map;for(const n of e){const i=n.brewCategory;t.has(i)||t.set(i,{rows:[],totalMl:0,avgMl:0,stockL:0,months:0});const r=t.get(i);r.rows.push(n),r.totalMl+=n.totalShipmentMl,r.avgMl+=n.monthlyAvgMl,r.stockL=n.currentStockL,r.months=n.monthsRemaining}for(const[,n]of t)n.avgMl>0&&(n.months=Math.round(n.stockL*1e3/n.avgMl*10)/10);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Nt.filter(n=>t.has(n)).map(n=>{const i=t.get(n),r=ot[n]??"#9ca3af",c=Ta(i.months),p=Sc(i.months),u=Math.min(i.months/6*100,100);return`
        <div class="card" style="border-top:3px solid ${r};min-width:220px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${r};">${n}</h4>
            <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${c}20;color:${c};font-weight:600;">${p}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:12px;margin-bottom:8px;">
            <div><span style="color:#6b7280;">現在庫</span><br><strong>${Fe(i.stockL)}L</strong></div>
            <div><span style="color:#6b7280;">月平均移出</span><br><strong>${ze(i.avgMl)}L</strong></div>
          </div>
          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数</span>
            <span style="font-weight:600;color:${c};">${i.months.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${c};height:100%;width:${u}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function Ac(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const i of e)t.has(i.brewCategory)||t.set(i.brewCategory,[]),t.get(i.brewCategory).push(i);const s=`
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
  `,n=[];for(const i of Nt){const r=t.get(i);if(!r)continue;const c=ot[i]??"#9ca3af",p=r.length>1,u=r.reduce((l,d)=>l+d.totalShipmentQty,0),y=r.reduce((l,d)=>l+d.totalShipmentMl,0),f=r.reduce((l,d)=>l+d.monthlyAvgQty,0),v=r.reduce((l,d)=>l+d.monthlyAvgMl,0),b=r.reduce((l,d)=>l+d.productCount,0),w=r[0].currentStockL,P=v>0?Math.round(w*1e3/v*10)/10:0,o=Ta(P);if(n.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${i}"`:""}>
        <td style="color:${c};">
          ${p?`<span class="toggle-icon" data-cat="${i}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${i}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${b}</td>
        <td style="text-align:right;">${Fe(u)}</td>
        <td style="text-align:right;">${ze(y)}</td>
        <td style="text-align:right;">${Fe(f)}</td>
        <td style="text-align:right;">${ze(v)}</td>
        <td style="text-align:right;">${Fe(w)}</td>
        <td style="text-align:right;color:${o};font-weight:700;">${P.toFixed(1)}</td>
      </tr>
    `),p)for(const l of r)n.push(`
          <tr class="sub-row-${i.replace(/[^a-zA-Z0-9]/g,"_")}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${l.subCategory}</td>
            <td style="text-align:right;">${l.productCount}</td>
            <td style="text-align:right;">${Fe(l.totalShipmentQty)}</td>
            <td style="text-align:right;">${ze(l.totalShipmentMl)}</td>
            <td style="text-align:right;">${Fe(l.monthlyAvgQty)}</td>
            <td style="text-align:right;">${ze(l.monthlyAvgMl)}</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
          </tr>
        `)}return`
    <div class="table-wrap">
      <table class="data-table">
        <thead>${s}</thead>
        <tbody>${n.join("")}</tbody>
      </table>
    </div>
  `}function Cc(e){const t=new Map;for(const n of e)t.has(n.brewCategory)||t.set(n.brewCategory,{avgMl:0,stockL:n.currentStockL}),t.get(n.brewCategory).avgMl+=n.monthlyAvgMl;return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫残月数プロジェクション</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕あり</span>
      </div>
      ${Nt.filter(n=>t.has(n)).map(n=>{const i=t.get(n),r=i.avgMl>0?Math.round(i.stockL*1e3/i.avgMl*10)/10:0,c=ot[n]??"#9ca3af",p=Ta(r),u=Math.min(r/8*100,100);return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:80px;font-size:12px;font-weight:500;color:${c};text-align:right;">${n}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:20px;overflow:hidden;position:relative;">
            <div style="background:${p};height:100%;width:${u}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:2px;left:8px;font-size:11px;font-weight:600;color:#374151;">${r.toFixed(1)}ヶ月</span>
          </div>
        </div>
      `}).join("")}
    </div>
  `}function Ec(e,t,s){const n=new Date,i=n.getMonth()>=9?n.getFullYear():n.getFullYear()-1,r=Array.from({length:5},(p,u)=>{const y=i-u;return`<option value="${y}" ${y===s?"selected":""}>${y}年度 (${y}/10-${y+1}/9)</option>`}).join(""),c=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return c||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${r}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${kc(t)}
      </div>

      ${Pc(e)}

      ${Cc(e)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${Ac(e)}
      </div>
    </section>
  `}function ca(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function Lc(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function En(e){return e?It.find(t=>t.value===e)?.label??e:""}function Dc(e){const t=[],s=[],n=[];for(const i of e){const r=i.amount_last_year_same_month>0?i.amount_this_month/i.amount_last_year_same_month:1,c={code:i.customer_code,name:i.customer_name,businessType:i.business_type,areaCode:i.area_code,phone:i.phone,lastOrderDate:i.last_order_date,daysSinceLastOrder:i.days_since_order,totalAmountLast12m:i.amount_12m,amount3m:i.amount_3m,amountThisMonth:i.amount_this_month,amountLastYearSameMonth:i.amount_last_year_same_month,annualRevenue:i.annual_revenue,yoyRatio:r,status:"dormant"};i.is_at_risk?t.push({...c,status:"at-risk"}):i.is_dormant?s.push({...c,status:"dormant"}):i.amount_last_year_same_month>0&&r<.8&&n.push({...c,status:"declining"})}return t.sort((i,r)=>r.totalAmountLast12m-i.totalAmountLast12m),s.sort((i,r)=>r.daysSinceLastOrder-i.daysSinceLastOrder),n.sort((i,r)=>i.yoyRatio-r.yoyRatio),{atRiskCustomers:t,dormantCustomers:s,decliningCustomers:n}}function qc(e,t){const s=t?.reason??"",n=It.map(i=>`<option value="${i.value}" ${s===i.value?"selected":""}>${i.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${n}
    </select>`}function Ic(e,t){const s={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],n=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',i=!!t?.actionedAt,r=i?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${En(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${i?"1":"0"}" ${r}>
      <td><span class="status-pill ${s.cls}">${s.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${n}
      <td class="numeric">${ca(e.totalAmountLast12m)}</td>
      <td>${qc(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${i?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function Qt(e,t,s,n,i,r,c,p){if(i.length===0)return"";const u=i.map(y=>Ic(y,p.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${n}" style="margin-right:8px;">${i.length}社</span>${t}</h2>
          <p class="panel-caption">${s} — 対象売上合計: ${Lc(r)}</p>
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
    </section>`}function Tc(e,t=[]){const{atRiskCustomers:s,dormantCustomers:n,decliningCustomers:i}=e,r=s.length+n.length+i.length,c=s.reduce((l,d)=>l+d.totalAmountLast12m,0),p=n.reduce((l,d)=>l+d.totalAmountLast12m,0),u=i.reduce((l,d)=>l+d.totalAmountLast12m,0),y=[...s,...n,...i],f=[...new Set(y.map(l=>l.areaCode).filter(Boolean))].sort(),v=[...new Set(y.map(l=>l.businessType).filter(Boolean))].sort(),b=new Map(t.map(l=>[l.customerCode,l])),w=t.filter(l=>l.actionedAt).length,P=new Map;t.forEach(l=>{l.reason&&P.set(l.reason,(P.get(l.reason)??0)+1)});const o=[...P.entries()].sort((l,d)=>d[1]-l[1]).slice(0,5).map(([l,d])=>`<span class="status-pill info" style="font-size:0.75rem;">${En(l)} ${d}社</span>`).join(" ");return`
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
        <div class="kpi-value">${s.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-danger);">${ca(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${n.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${ca(p)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${i.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${w}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${r}社中</div>
      </div>
    </section>

    ${o?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${o}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${r})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${s.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${i.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${f.map(l=>`<option value="${l}">${l}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${v.map(l=>`<option value="${l}">${l}</option>`).join("")}
      </select>
    </div>

    ${Qt("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",s,c,"状況",b)}
    ${Qt("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",n,p,"経過日数",b)}
    ${Qt("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",i,u,"前年同月比",b)}

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
    <\/script>`}const we=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],da={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},_e={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Nc(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Mc(e){const t=e.reduce((r,c)=>r+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const n=Math.max(...e);return e.filter(r=>r>n*.1).length<=6?"seasonal":"year-round"}function Rc(e){const t=e.reduce((r,c)=>r+c,0);if(t===0)return[];const n=t/12*1.5,i=[];for(let r=0;r<12;r++)e[r]>n&&i.push(r);if(i.length===0){const r=Math.max(...e);r>0&&i.push(e.indexOf(r))}return i.sort((r,c)=>r-c)}function Oc(e){return e.length===0?0:(e[0]-2+12)%12}function ms(e){const t=new Date().getMonth(),s=e.map(i=>{const r=Mc(i.monthlyQuantity),c=Rc(i.monthlyQuantity),p=Oc(c);return{code:i.code,name:i.name,category:i.category,peakMonths:c,proposalStartMonth:p,seasonType:r,monthlyQuantity:i.monthlyQuantity}}),n=[];for(let i=0;i<12;i++){const r=s.filter(c=>{if(c.peakMonths.length===0)return!1;const p=c.proposalStartMonth,u=c.peakMonths[0];return p<=u?i>=p&&i<=u:i>=p||i<=u});n.push({month:i,products:r,targetCustomers:[]})}return{products:s,proposals:n,selectedMonth:t}}function jc(e){const{products:t,proposals:s,selectedMonth:n}=e,i=new Date().getMonth(),r={"year-round":[],seasonal:[],"year-end":[]};t.forEach(v=>r[v.seasonType].push(v));const c=s[n],p=t.length,u=c?.products.length??0,y=t.filter(v=>v.peakMonths.includes(n)).length,f=c?.targetCustomers.length??0;return`
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
      <div class="mono numeric" style="font-size:1.5rem">${p}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${we[n]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${we[n]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${f}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${we.map((v,b)=>{const w=b===i,P=b===n;return`<button class="button" style="padding:4px 10px;background:${P?"#0F5B8D":w?"#e2e8f0":"transparent"};color:${P?"#fff":"#333"};border:${w&&!P?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${b}">${v}${w?" ●":""}</button>`}).join("")}
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
            ${we.map((v,b)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${b===i?"background:#f0f7ff;":""}">${v.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Fc(r,i)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${zc(r,n)}

  <!-- Target customer list for selected month -->
  ${Bc(c)}
</div>`}function Fc(e,t){const s=[],n=["year-round","seasonal","year-end"];for(const i of n){const r=e[i];if(r.length!==0){s.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${_e[i]}15;color:${_e[i]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${da[i]}</span>
    </td></tr>`);for(const c of r){const p=we.map((u,y)=>{const f=c.peakMonths.includes(y),v=Ln(c,y),b=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let w="transparent";f?w=_e[c.seasonType]:v&&(w=_e[c.seasonType]+"40");const P=f||v?`background:${w};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${b}"><div style="${P}" title="${f?"ピーク":v?"提案期間":""}"></div></td>`}).join("");s.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${_e[c.seasonType]}15;color:${_e[c.seasonType]}">${da[c.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return s.join("")}function Ln(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const s=e.proposalStartMonth,n=e.peakMonths[0];return s<=n?t>=s&&t<n:t>=s||t<n}function zc(e,t){const n=["year-round","seasonal","year-end"].map(i=>{const r=e[i];if(r.length===0)return"";const c=r.filter(u=>u.peakMonths.includes(t)||Ln(u,t));if(c.length===0)return"";const p=c.map(u=>{const f=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',v=u.monthlyQuantity.reduce((b,w)=>b+w,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${f}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${v.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(b=>we[b]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${_e[i]}15;color:${_e[i]}">${da[i]}</span>
        <span style="font-size:0.85rem;color:#666">${we[t]}の対象: ${c.length}品</span>
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
        <tbody>${p}</tbody>
      </table>
    </div>`}).filter(Boolean);return n.length===0?`<div style="padding:1rem;color:#666;text-align:center">${we[t]}に提案対象の商品はありません</div>`:n.join("")}function Bc(e){return!e||e.targetCustomers.length===0?`
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
      <tbody>${e.targetCustomers.map(s=>`
    <tr style="border-bottom:1px solid #f0f0f0">
      <td class="mono" style="padding:6px 8px">${s.code}</td>
      <td style="padding:6px 8px">${s.name}</td>
      <td class="mono numeric" style="padding:6px 8px">${Nc(s.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${s.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const Vc=["日","月","火","水","木","金","土"];function Jc(e){const[t,s]=e.split("-").map(Number),n=new Date(t,s-1,1),i=new Date(t,s,0),r=[];for(let c=0;c<n.getDay();c++)r.push({outside:!0});for(let c=1;c<=i.getDate();c++)r.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;r.length%7!==0;)r.push({outside:!0});return r}function Yc(e,t,s){const[n,i]=t.split("-").map(Number),r=new Date(n,i-2,1),c=new Date(n,i,1),p=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`,u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,y=new Date().toISOString().slice(0,10),v=Jc(t).map(o=>{if(o.outside)return'<div class="sc-cell sc-outside"></div>';const l=o.date,d=Number(l.split("-")[2]),m=new Date(`${l}T00:00:00`).getDay(),g=e?.[l],$=l===y,x=l===s;let A="",S="";return g&&(A=`<span class="sc-badge">${g.count}件</span>`,S=g.cityGroups.slice(0,3).map(C=>`<span class="sc-city-tag">${C.city}<em>${C.count}</em></span>`).join(""),g.cityGroups.length>3&&(S+=`<span class="sc-city-more">+${g.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${$?"sc-today":""} ${x?"sc-selected":""} ${g?"sc-has-data":""}"
           data-sc-date="${l}">
        <div class="sc-day-header">
          <span class="sc-day-num ${m===0?"sc-sun":m===6?"sc-sat":""}">${d}</span>
          ${A}
        </div>
        <div class="sc-cities">${S}</div>
      </div>
    `}).join(""),b=s&&e?.[s]?Uc(e[s]):s?`<div class="sc-detail-empty"><p>📦 ${s.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',w=Object.values(e??{}).reduce((o,l)=>o+l.count,0),P=Object.values(e??{}).reduce((o,l)=>o+l.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${w>0?`月計: <strong>${w}件</strong> / <strong>¥${P.toLocaleString()}</strong>`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${p}">◀</button>
          <span class="sc-month-label">${n}年${i}月</span>
          <button class="sc-nav-btn" data-sc-ym="${u}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays">
            ${Vc.map((o,l)=>`<div class="sc-weekday ${l===0?"sc-sun":l===6?"sc-sat":""}">${o}</div>`).join("")}
          </div>
          <div class="sc-grid">
            ${e===null?'<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>':v}
          </div>
        </div>

        <div class="sc-detail-col">
          ${b}
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
      .sc-nav-btn { background: var(--bg-subtle, #f3f4f6); border: 1px solid var(--border, #e5e7eb); border-radius: 6px; padding: 4px 12px; cursor: pointer; font-size: 0.9rem; }
      .sc-nav-btn:hover { background: var(--bg-hover, #e5e7eb); }
      .sc-month-label { font-size: 1rem; font-weight: 600; min-width: 100px; text-align: center; }

      .sc-body { display: grid; grid-template-columns: 1fr 280px; min-height: 480px; }
      @media (max-width: 900px) { .sc-body { grid-template-columns: 1fr; } }

      .sc-calendar-col { padding: 12px 16px; border-right: 1px solid var(--border, #e5e7eb); }
      .sc-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 4px; }
      .sc-weekday { text-align: center; font-size: 0.75rem; font-weight: 600; color: var(--text-muted, #6b7280); padding: 4px 0; }
      .sc-weekday.sc-sun { color: #ef4444; }
      .sc-weekday.sc-sat { color: #3b82f6; }

      .sc-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
      .sc-cell { min-height: 72px; border: 1px solid var(--border, #e5e7eb); border-radius: 6px; padding: 4px 6px; cursor: pointer; transition: background 0.1s, border-color 0.1s; }
      .sc-cell.sc-outside { background: transparent; border-color: transparent; cursor: default; }
      .sc-cell:not(.sc-outside):hover { background: var(--bg-hover, #f9fafb); border-color: var(--primary, #0F5B8D); }
      .sc-cell.sc-today { background: #eff6ff; border-color: #3b82f6; }
      .sc-cell.sc-selected { background: #dbeafe; border-color: #2563eb; border-width: 2px; }
      .sc-cell.sc-has-data .sc-day-num { font-weight: 700; }

      .sc-day-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
      .sc-day-num { font-size: 0.8rem; color: var(--text, #111); }
      .sc-day-num.sc-sun { color: #ef4444; }
      .sc-day-num.sc-sat { color: #3b82f6; }
      .sc-badge { font-size: 0.65rem; background: var(--primary, #0F5B8D); color: #fff; border-radius: 10px; padding: 1px 5px; }

      .sc-cities { display: flex; flex-wrap: wrap; gap: 2px; }
      .sc-city-tag { font-size: 0.6rem; background: #e0f2fe; color: #0369a1; border-radius: 4px; padding: 1px 4px; display: flex; align-items: center; gap: 2px; }
      .sc-city-tag em { font-style: normal; font-weight: 700; }
      .sc-city-more { font-size: 0.6rem; color: var(--text-muted, #6b7280); }

      .sc-loading { grid-column: 1/-1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; gap: 12px; color: var(--text-muted, #6b7280); }

      .sc-detail-col { padding: 16px; overflow-y: auto; max-height: 600px; }
      .sc-detail-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted, #6b7280); font-size: 0.9rem; text-align: center; padding: 40px 20px; }

      .sc-detail-date { font-size: 1rem; font-weight: 700; margin: 0 0 4px; }
      .sc-detail-meta { font-size: 0.8rem; color: var(--text-muted, #6b7280); margin-bottom: 12px; }
      .sc-city-section { margin-bottom: 12px; }
      .sc-city-label { font-size: 0.75rem; font-weight: 700; color: var(--primary, #0F5B8D); border-bottom: 1px solid #dbeafe; padding-bottom: 4px; margin-bottom: 6px; }
      .sc-customer-row { display: flex; justify-content: space-between; align-items: baseline; padding: 3px 0; font-size: 0.8rem; border-bottom: 1px solid var(--border, #e5e7eb); gap: 8px; }
      .sc-customer-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .sc-customer-amt { flex-shrink: 0; color: var(--text-muted, #6b7280); font-size: 0.75rem; }
    </style>
  `}function Uc(e){const t=e.date.replace(/-/g,"/").slice(5),s={};for(const i of e.entries)(s[i.city]??=[]).push(i);const n=Object.entries(s).sort((i,r)=>r[1].length-i[1].length).map(([i,r])=>{const c=r.sort((p,u)=>u.amount-p.amount).map(p=>`
          <div class="sc-customer-row">
            <span class="sc-customer-name" title="${p.customerName}">${p.customerName}</span>
            <span class="sc-customer-amt">${p.amount>0?`¥${p.amount.toLocaleString()}`:"-"}</span>
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${i}（${r.length}件）</div>
          ${c}
        </div>`}).join("");return`
    <p class="sc-detail-date">${t}の出荷</p>
    <p class="sc-detail-meta">${e.count}件 / ¥${e.totalAmount.toLocaleString()}</p>
    ${n}
  `}const Qc=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),Ht=["月","火","水","木","金"],ys=6;function Hc(e,t){if(!e)return 9999;const s=new Date(e);return isNaN(s.getTime())?9999:Math.floor((t.getTime()-s.getTime())/(1e3*60*60*24))}function Gc(e,t){if(t.length===0)return 0;const s=[...t].sort((i,r)=>i-r);return s.filter(i=>i<=e).length/s.length}function Xc(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function hs(e){const t=new Date,s=e.map(u=>u.annualRevenue),n=e.map(u=>{const y=Hc(u.lastOrderDate,t);let f=0;const v=[];y>=60&&(f+=50,v.push("離反リスク")),u.hasSeasonalProposal&&(f+=30,v.push("季節提案タイミング")),y>=30&&y<60&&(f+=20,v.push("定期巡回"));const b=Gc(u.annualRevenue,s),w=Math.round(b*20);w>0&&(f+=w,v.push("金額ウェイト"));const P=Xc(v,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:f,reasons:v,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:P}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),i=new Map;for(const u of n){const y=u.areaCode||"その他";i.has(y)||i.set(y,[]),i.get(y).push(u)}const r=[...i.entries()].sort((u,y)=>y[1].reduce((f,v)=>f+v.priorityScore,0)-u[1].reduce((f,v)=>f+v.priorityScore,0)),c=[];let p=0;for(const[u,y]of r){const f=y.sort((v,b)=>b.priorityScore-v.priorityScore);for(let v=0;v<f.length&&!(p>=Ht.length);v+=ys){const b=f.slice(v,v+ys);c.push({dayLabel:Ht[p],area:u,visits:b}),p++}if(p>=Ht.length)break}return{candidates:n,weekPlan:c,filterArea:"",filterMinScore:0}}function Kc(e){const{candidates:t,weekPlan:s,filterArea:n,filterMinScore:i}=e,r=t.filter(v=>!(n&&v.areaCode!==n||i>0&&v.priorityScore<i)),c=Array.from(new Set(t.map(v=>v.areaCode))).sort(),p=r.length,u=r.filter(v=>v.priorityScore>=50).length,y=r.filter(v=>v.reasons.includes("離反リスク")).length,f=s.reduce((v,b)=>v+b.visits.length,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業支援</p>
        <h1>訪問計画 / ルート最適化</h1>
      </div>
    </section>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">${p}</div>
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
        <div class="kpi-value">${f}</div>
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
            ${c.map(v=>`<option value="${v}"${n===v?" selected":""}>${v}</option>`).join("")}
          </select>
        </label>
        <label>
          最低スコア:
          <input type="number" min="0" max="100" step="10" value="${i}" data-action="visit-filter-score" style="width:5rem;" />
        </label>
        <button class="button" data-action="visit-apply-filter">絞り込み</button>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">週間訪問プラン</h2>
      ${s.length===0?"<p>訪問候補がありません。</p>":Wc(s)}
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
            ${r.map(v=>Zc(v)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Wc(e){return`
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1rem;">
      ${e.map(t=>`
        <div class="kpi-card" style="text-align:left;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <strong>${t.dayLabel}曜日</strong>
            <span class="status-pill">${t.area}</span>
          </div>
          <div style="font-size:0.85rem;">
            ${t.visits.map(s=>`
              <div style="padding:0.25rem 0;border-bottom:1px solid var(--border, #eee);">
                <span class="mono">${s.priorityScore}</span>
                ${s.name}
              </div>
            `).join("")}
          </div>
          <div style="margin-top:0.5rem;font-size:0.75rem;color:var(--muted, #888);">
            ${t.visits.length}件
          </div>
        </div>
      `).join("")}
    </div>
  `}function Zc(e){return`
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
      <td>${e.reasons.map(s=>`<span class="status-pill">${s}</span>`).join(" ")}</td>
      <td class="mono">${e.lastOrderDate||"—"}<br/><span style="font-size:0.75rem;">(${e.daysSinceOrder===9999?"—":e.daysSinceOrder+"日前"})</span></td>
      <td class="numeric">${Qc.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function ed(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},s={empty:"neutral",in_use:"warning",aging:"success"},n=e.map(y=>{const f=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${y.tankNo}</strong></td>
          <td class="numeric">${y.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${y.currentVolume>0?y.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${f}%"></div>
            </div>
            <span class="progress-label">${f}%</span>
          </td>
          <td>${y.productName||"―"}</td>
          <td class="mono">${y.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${s[y.status]}">${t[y.status]}</span>
          </td>
          <td>${y.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${y.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),i=e.filter(y=>y.status==="in_use").length,r=e.filter(y=>y.status==="aging").length,c=e.filter(y=>y.status==="empty").length,p=e.reduce((y,f)=>y+f.capacity,0),u=e.reduce((y,f)=>y+f.currentVolume,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${p.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${p>0?Math.round(u/p*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${i} 基</p>
        <p class="kpi-sub">熟成中 ${r} 基</p>
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
          <tbody>${n||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function td(e,t,s){const n=e.rows.map((y,f)=>`
      <tr>
        <td class="mono">${y.taxCategory}</td>
        <td>${y.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${f}" data-tax-field="alcoholDegree" value="${y.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${f}" data-tax-field="productionVolume" value="${y.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${f}" data-tax-field="previousBalance" value="${y.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${f}" data-tax-field="exportDeduction" value="${y.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${f}" data-tax-field="sampleDeduction" value="${y.sampleDeduction}" />
        </td>
        <td class="numeric">${y.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${y.taxRate}</td>
        <td class="numeric"><strong>${Gt(y.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${f}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=e.deductions.map((y,f)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${f}" data-ded-field="type">
            ${Object.keys(ea).map(v=>`<option value="${v}" ${v===y.type?"selected":""}>${ea[v]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${f}" data-ded-field="categoryCode">
            ${Xs.map(v=>`<option value="${v.code}" ${v.code===y.categoryCode?"selected":""}>${v.code}:${v.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${f}" data-ded-field="volume" value="${y.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${f}" data-ded-field="reason" value="${y.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${f}" data-ded-field="documentNo" value="${y.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${f}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),r=Array.from({length:12},(y,f)=>f+1),c=e.rows.reduce((y,f)=>y+f.exportDeduction+f.sampleDeduction,0),p=e.rows.reduce((y,f)=>y+f.productionVolume,0),u=p>0?c/p*100:0;return`
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
            ${[2025,2026,2027].map(y=>`<option value="${y}" ${t===y?"selected":""}>${y}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${r.map(y=>`<option value="${y}" ${s===y?"selected":""}>${y}月</option>`).join("")}
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
        <p class="kpi-value">${Gt(e.totalTax)}</p>
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
      <article class="panel kpi-card ${u>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${u.toFixed(1)}%</p>
        <p class="kpi-sub">${u>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
              <th class="numeric">${Gt(e.totalTax)}</th>
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
  `}const ad={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let Pe=null,sd=0;const ua=[];function nd(){return Pe&&document.body.contains(Pe)||(Pe=document.createElement("div"),Pe.className="toast-container",document.body.appendChild(Pe)),Pe}function D(e,t="success",s){const n=nd(),i=++sd,r=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${ad[t]}</span>
    <span class="toast-msg">${id(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:i,message:e,type:t,el:c};ua.push(p),n.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>od(p);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},r)}function od(e){const t=ua.indexOf(e);t!==-1&&(ua.splice(t,1),e.el.remove())}function id(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ue(e,t={}){const{title:s="確認",confirmLabel:n="OK",cancelLabel:i="キャンセル",variant:r="primary"}=t;return new Promise(c=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${r}">
            ${r==="danger"?rd:ld}
          </div>
          <h3 class="confirm-title">${bt(s)}</h3>
          <p class="confirm-message">${bt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${bt(i)}</button>
          <button class="button ${r} confirm-ok">${bt(n)}</button>
        </div>
      </div>
    `;const u=f=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),c(f)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",f=>{f.target===p&&u(!1)});const y=f=>{f.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const rd=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,ld=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function bt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function fs(e){const s=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(s)?`"${s}"`:s}function pa(e,t,s){if(t.length===0&&(!s||s.length===0))return;const n=s&&s.length>0?s:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),r=`\uFEFF${[n.map(y=>fs(y.label)).join(","),...t.map(y=>n.map(f=>fs(y[f.key])).join(","))].join(`\r
`)}`,c=new Blob([r],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(c),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const cd=Object.fromEntries(It.map(e=>[e.value,e.label])),dd=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan"];let Be=[];async function ud(){const{supabaseQueryAll:e}=await E(async()=>{const{supabaseQueryAll:s}=await Promise.resolve().then(()=>z);return{supabaseQueryAll:s}},void 0);Be=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(s=>typeof s.email=="string"&&s.email.length>0).map(s=>({name:String(s.name??""),email:String(s.email??""),area:String(s.delivery_area_code??""),historySegment:"seasonal"}))}const vs=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"}];function Dn(e){const t=ga[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Na(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function pd(){const e=Dn("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const Mt=new Date,md=Mt.toISOString().slice(0,7),yd=Mt.getFullYear(),hd=Mt.getMonth()+1,fd=Mt.toISOString().slice(0,10),vd="C0011",Ae=pd();function qn(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",s=e.startsWith(t)?e.slice(t.length)||"/":e;return dd.includes(s)?s:"/"}function Ma(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const gs=qn(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:Na(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:md,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:yd,taxMonth:hd,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Zl,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...ec},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:fd,route:gs,currentCategory:Ma(gs),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:vd,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Da(aa()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:aa(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],masterTab:"customers",masterFilter:{...qa},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Ae.mode,emailRegion:Ae.region,emailHistorySegment:Ae.historySegment,emailTemplateId:Ae.templateId,emailSubject:Ae.subject,emailBody:Ae.body,emailSaveMessage:Ae.saveMessage,emailSending:!1,demandForecast:{...Hi},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:xt(new Date().toISOString().slice(0,7),1,1),calendarDefaultPart:1,calendarDefaultEmp:1,calendarSelectedDate:null,brewingSchedule:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function bs(e){return e.slice(0,10)}function gd(e){return{...e}}function Ct(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function In(){a.invoiceForm=Na(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Ct()}function Tn(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((s,n)=>{s.productCode.trim()||(t[`lines.${n}.productCode`]="商品コードは必須です。"),s.productName.trim()||(t[`lines.${n}.productName`]="商品名は必須です。"),s.quantity<=0&&(t[`lines.${n}.quantity`]="数量は1以上を入力してください。"),s.unitPrice<0&&(t[`lines.${n}.unitPrice`]="単価は0円以上で入力してください。")}),t}function bd(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,gd(t))}function $d(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],s=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:s.map((n,i)=>{const r=i===0?1:2,c=1200*(i+1);return{productCode:n.code,productName:n.name,quantity:r,unitPrice:c,unit:"本",amount:r*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function _d(e){const t=a.masterStats?.customers.find(s=>s.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function wd(e){const t=a.masterStats?.customers.find(s=>s.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Nn(e){if(ge(e),a.invoiceErrors=Tn(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){_();return}a.invoiceSaving=!0,_(),Ts(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=Na(),_()}).catch(()=>{a.invoiceSaving=!1,_()})}function Mn(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,s=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((n,i)=>new Date(i.date).getTime()-new Date(n.date).getTime()).filter(n=>{const i=new Date(n.date);return!(t&&i<t||s&&i>s)})}function Rn(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?Be:Be.filter(e=>e.area===a.emailRegion);case"history":return Be.filter(e=>e.historySegment===a.emailHistorySegment);default:return Be}}function xd(){const e=Rn();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function Xt(e){const t=Rn(),s=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:s,recipientCount:t.length,recipients:t.map(n=>n.email),status:e}}function Ra(){return a.user,!1}function it(){a.globalSearchOpen=!1,a.globalQuery=""}function Sd(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:vs.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:vs}}function kd(){let e=[],t,s="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Mn(a.salesSummary):[]).map(n=>({documentNo:n.documentNo,date:n.date,customerCode:n.customerCode,customerName:n.customerName,amount:n.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],s="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((n,i)=>i.balanceAmount-n.balanceAmount).map(n=>({...n})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],s="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(n=>({...n})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],s="invoices.csv";break;case"/purchase":e=a.purchaseList.map(n=>({...n})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],s="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(n=>({...n})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],s="jikomi.csv";break;case"/tanks":e=a.tankList.map(n=>({...n})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],s="tanks.csv";break;case"/kentei":e=a.kenteiList.map(n=>({...n})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],s="kentei.csv";break;case"/materials":e=a.materialList.map(n=>({...n})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],s="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(n=>({...n}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],s="master-customers.csv"):(e=a.masterStats?.products.map(n=>({...n}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],s="master-products.csv");break;default:return}pa(s,e,t)}function $s(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=Ma(e),a.sidebarOpen=!1,it(),Oa(e)}async function Oa(e){a.actionLoading=!0,_();try{switch(e){case"/quote":a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,_(),a.quoteList=await La(),a.quoteListLoading=!1);break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await nt(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await _a());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await wa(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await E(async()=>{const{fetchShipmentCalendar:s}=await Promise.resolve().then(()=>q);return{fetchShipmentCalendar:s}},void 0);a.shipmentCalendarData=await t(a.shipmentCalendarYearMonth);break}case"/billing":a.billingSummary||(a.billingSummary=await xa(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Dt());break;case"/product-power":a.productPower.length===0&&(a.productPower=await js());break;case"/customer-efficiency":a.customerEfficiency.length===0&&(a.customerEfficiency=await Fs());break;case"/customer-analysis":a.customerAnalysis||(a.customerAnalysis=await zs());break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:s}=await E(async()=>{const{fetchDemandForecasts:r,fetchDeliverySchedule:c}=await Promise.resolve().then(()=>q);return{fetchDemandForecasts:r,fetchDeliverySchedule:c}},void 0),[n,i]=await Promise.all([t(),s()]);a.demandForecast.forecasts=n.map(r=>({code:r.productCode,name:r.productName,segment:r.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(r.avgMonthly),adjustedAvg:Math.round(r.avgMonthly),nextMonthForecast:Math.round(r.forecastQuantity),annualForecast:Math.round(r.avgMonthly*12),safetyStock:Math.round(r.safetyStock)})),a.demandForecast.deliveries=Gi(i)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:s}=await E(async()=>{const{fetchChurnAlerts:n,fetchChurnNotes:i}=await Promise.resolve().then(()=>q);return{fetchChurnAlerts:n,fetchChurnNotes:i}},void 0);if(!a.churnAlert){const n=await t();a.churnAlert=Dc(n)}a.churnNotes=await s();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await E(async()=>{const{fetchProductShipmentsFromTable:n}=await Promise.resolve().then(()=>q);return{fetchProductShipmentsFromTable:n}},void 0),s=await t();if(s.length>0)a.seasonalCalendar=ms(s.map(n=>({code:n.code,name:n.name,category:"",monthlyQuantity:n.monthlyQuantity})));else{const{fetchProductMonthlyShipments:n}=await E(async()=>{const{fetchProductMonthlyShipments:r}=await Promise.resolve().then(()=>q);return{fetchProductMonthlyShipments:r}},void 0),i=await n();a.seasonalCalendar=ms(i.map(r=>({code:r.code,name:r.name,category:"",monthlyQuantity:r.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await E(async()=>{const{fetchVisitPriorities:n}=await Promise.resolve().then(()=>q);return{fetchVisitPriorities:n}},void 0),s=await t();if(s.length>0)a.visitPlanner={candidates:s.map(n=>({code:n.customer_code,name:n.customer_name,phone:n.phone,address:n.address,areaCode:n.area_code,businessType:n.business_type,priorityScore:n.priority_score,reasons:n.reasons,lastOrderDate:n.last_order_date,daysSinceOrder:n.days_since_order,annualRevenue:n.annual_revenue,recommendedAction:n.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=hs(s.map(n=>({code:n.customer_code,name:n.customer_name,phone:n.phone,address1:n.address,areaCode:n.area_code,businessType:n.business_type,annualRevenue:n.annual_revenue,lastOrderDate:n.last_order_date,hasSeasonalProposal:n.reasons.some(i=>i.includes("季節"))})));else{const{supabaseQueryAll:n}=await E(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>z);return{supabaseQueryAll:u}},void 0),[i,r]=await Promise.all([n("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):ba().then(u=>u.customers)]),c=a.masterStats?.customers??r,p=new Map;i.forEach(u=>{const y=u.legacy_customer_code||"",f=u.sales_date||"",v=Number(u.total_amount)||0,b=p.get(y);!b||f>b.lastDate?p.set(y,{lastDate:f,total:(b?.total??0)+v}):b.total+=v}),a.visitPlanner=hs(c.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:s,fetchProductionPlan:n}=await E(async()=>{const{fetchDemandAnalysis:i,fetchSafetyStockParams:r,fetchProductionPlan:c}=await Promise.resolve().then(()=>q);return{fetchDemandAnalysis:i,fetchSafetyStockParams:r,fetchProductionPlan:c}},void 0);if(!a.demandAnalysis){const[i,r]=await Promise.all([t(a.demandYearsBack*12),s()]);a.demandAnalysis=i,a.safetyStockParams=r}if(a.productionPlan.length===0){const i=await n(a.demandPlanYearMonth);if(i.length>0)a.productionPlan=i;else if(a.demandAnalysis&&a.safetyStockParams.length>0){const r=a.demandPlanYearMonth,c=a.demandAnalysis.months.filter(p=>p<r).slice(-3);a.productionPlan=a.safetyStockParams.map(p=>{const u=p.productionType==="make_to_order",y=c.map(w=>a.demandAnalysis.matrix[p.productCode]?.[w]??0),f=u?0:y.length>0?Math.ceil(y.reduce((w,P)=>w+P,0)/y.length):Math.ceil(p.avgMonthlyDemand),v=u?0:Math.ceil(p.safetyStockQty),b=Math.max(0,f+v);return{id:"",yearMonth:r,productCode:p.productCode,productName:p.productName,demandForecast:f,safetyStockTarget:v,openingStock:0,requiredProduction:b,plannedQty:u?0:b,actualQty:0,status:"draft",productionType:p.productionType??"monthly",notes:""}})}}break}case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:s,fetchBrewingSchedule:n}=await E(async()=>{const{fetchBrewingPlanSummary:f,fetchBrewingMonthlyTrend:v,fetchBrewingSchedule:b}=await Promise.resolve().then(()=>q);return{fetchBrewingPlanSummary:f,fetchBrewingMonthlyTrend:v,fetchBrewingSchedule:b}},void 0),i=a.brewingPlanFY,r=`${i}-10-01`,c=`${i+1}-09-30`,[p,u,y]=await Promise.all([t(r,c),s(r,c),n(i)]);a.brewingPlanData=p,a.brewingMonthlyTrend=u,a.brewingSchedule=y;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Vs());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Js());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Ys());break;case"/materials":a.materialList.length===0&&(a.materialList=await Zt());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Us(),Qs()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Hs(),Gs()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await ka(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Pa(a.storeSalesDate),Ws()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await E(async()=>{const{fetchMailSenders:s}=await Promise.resolve().then(()=>q);return{fetchMailSenders:s}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(s=>s.id===a.emailSenderId)){const s=a.mailSenders.find(n=>n.isDefault)??a.mailSenders[0];s&&(a.emailSenderId=s.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await E(async()=>{const{fetchCalendarEvents:s}=await Promise.resolve().then(()=>q);return{fetchCalendarEvents:s}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await E(async()=>{const{fetchIntegrationSettings:s}=await Promise.resolve().then(()=>q);return{fetchIntegrationSettings:s}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:s}=await E(async()=>{const{fetchShopifyOrders:n,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>q);return{fetchShopifyOrders:n,fetchIntegrationSettings:i}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await s())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:s}=await E(async()=>{const{fetchFaxInbox:n,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>q);return{fetchFaxInbox:n,fetchIntegrationSettings:i}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await s())}break;case"/users":{const{fetchUserProfiles:t}=await E(async()=>{const{fetchUserProfiles:s}=await Promise.resolve().then(()=>q);return{fetchUserProfiles:s}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:s,fetchMailSenders:n}=await E(async()=>{const{fetchMyProfile:r,fetchAuditLogs:c,fetchMailSenders:p}=await Promise.resolve().then(()=>q);return{fetchMyProfile:r,fetchAuditLogs:c,fetchMailSenders:p}},void 0),i=a.user?.email??a.myProfile?.email??"";i&&(a.myProfile=await t(i)),a.mailSenders.length===0&&(a.mailSenders=await n()),a.auditLogs=await s(50)}break;case"/audit":{const{fetchAuditLogs:t}=await E(async()=>{const{fetchAuditLogs:s}=await Promise.resolve().then(()=>q);return{fetchAuditLogs:s}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await E(async()=>{const{fetchProspects:s}=await Promise.resolve().then(()=>q);return{fetchProspects:s}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:s}=await E(async()=>{const{fetchMapCustomers:r,fetchDeliveryLocations:c}=await Promise.resolve().then(()=>q);return{fetchMapCustomers:r,fetchDeliveryLocations:c}},void 0),[n,i]=await Promise.all([t(),s()]);a.mapCustomers=n,a.deliveryLocations=i}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:s}=await E(async()=>{const{fetchCallLogs:n,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>q);return{fetchCallLogs:n,fetchIntegrationSettings:i}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await s())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:s}=await E(async()=>{const{fetchLeadLists:n,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>q);return{fetchLeadLists:n,fetchIntegrationSettings:i}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await s())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await E(async()=>{const{fetchWorkflowOrdersFromDb:s}=await Promise.resolve().then(()=>q);return{fetchWorkflowOrdersFromDb:s}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await E(async()=>{const{fetchTourInquiriesFromDb:s}=await Promise.resolve().then(()=>q);return{fetchTourInquiriesFromDb:s}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:s,fetchIntegrationSettings:n}=await E(async()=>{const{fetchSlackRules:i,fetchSlackLogs:r,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>q);return{fetchSlackRules:i,fetchSlackLogs:r,fetchIntegrationSettings:c}},void 0);a.slackRules=await t(),a.slackLogs=await s(50),a.integrations.length===0&&(a.integrations=await n())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:s,fetchWorkflowOrdersFromDb:n,fetchTourInquiriesFromDb:i,fetchOrderHeaders:r}=await E(async()=>{const{fetchProspects:c,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:f}=await Promise.resolve().then(()=>q);return{fetchProspects:c,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:f}},void 0);a.prospects.length===0&&(a.prospects=await t()),a.calendarEvents.length===0&&(a.calendarEvents=await s(a.calendarYearMonth)),a.materialList.length===0&&(a.materialList=await Zt()),a.workflowOrders.length===0&&(a.workflowOrders=await n()),a.tourInquiries.length===0&&(a.tourInquiries=await i()),a.orderHeaders.length===0&&(a.orderHeaders=await r())}break;default:break}}catch(t){console.error("Route data load error:",e,t),D(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,_()}}function _s(){if(Ra())return Fr(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return ct("sales");case"/cat/brewery":return ct("brewery");case"/cat/purchase":return ct("purchase");case"/cat/more":return ct("more");case"/invoice-entry":return pr(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?gr(a.quoteList,a.quoteListLoading):bn(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return $r(a.quoteCompanySettings);case"/email":return lr(xd());case"/delivery":return a.deliveryNote?ir(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return Yc(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate);case"/billing":return a.billingSummary?zi(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?gl(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Cr(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return Er(a.customerEfficiency,a.customerSortState);case"/customer-analysis":return a.customerAnalysis?cl(a.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Zi(a.demandForecast);case"/demand":return xc(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate);case"/brewing-plan":return Ec(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY);case"/churn-alert":return a.churnAlert?Tc(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?jc(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?Kc(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/jikomi":return a.jikomiView==="calendar"?`${Ka(a.jikomiList,a.jikomiView)}${Rr(a.jikomiList)}`:Ka(a.jikomiList,a.jikomiView);case"/tanks":return ed(a.tankList);case"/kentei":return Or(a.kenteiList);case"/materials":return Xr(a.materialList)+Gr(a.materialEditing,a.materialEditingIsNew);case"/purchase":return tl(a.purchaseList,a.payableList);case"/raw-material":return al(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?td(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return wl(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?ol(a.pipelineMeta,ae,V,a.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return pc(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return Sl(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return nc(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Pl(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapCustomers.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>':Al(a.mapCustomers,a.deliveryLocations,a.mapFilters);case"/workflow":return Ll(a.workflowOrders);case"/mobile-order":return Dl(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return Il(a.tourInquiries,a.tourActiveId);case"/mail-senders":return Ml(a.mailSenders,a.mailSenderEditingId);case"/calendar":return Rl(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return jl(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Fl(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return zl(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/users":return Bl(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return Vl(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return Jl(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return Yl(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return Gl(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return Xl(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return Wl(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return _l(Mn(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return Zr([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Hr(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return qr(a.invoiceRecords,a.invoiceFilter);case"/ledger":return Ui(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return kn(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return Ad();default:return ar(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function Pd(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},s=a.announcements.filter(i=>!a.dismissedAnnouncements.has(i.id)).map(i=>{const r=e[i.level]??e.info;return`
      <div class="announcement-bar" style="background:${r.bg};border-bottom:2px solid ${r.border};">
        <span class="announcement-text">${r.icon} ${i.message}</span>
        ${i.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${i.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),n=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return s+n}function Ad(){function e(s,n,i,r){return`<a href="${`${"/".replace(/\/$/,"")||"/"}${s}`}" data-link="${s}" class="home-card">
      <span class="home-card-icon">${n}</span>
      <span class="home-card-label">${i}</span>
      <span class="home-card-desc">${r}</span>
    </a>`}const t=[{title:"販売業務",color:"#1a56db",cards:[e("/invoice-entry","📝","伝票入力","売上・返品を入力"),e("/quote","📄","見積作成","見積書の作成・管理"),e("/invoice","🔍","伝票照会","過去伝票の照会"),e("/delivery","🚚","納品書","納品書の発行"),e("/billing","💳","月次請求","請求書・入金管理"),e("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[e("/analytics","📊","売上分析","期間・商品・得意先別"),e("/customer-analysis","👥","得意先分析","ABC分析・ランク"),e("/product-power","📦","商品力分析","商品別販売力"),e("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),e("/report","📈","集計帳票","各種集計帳票"),e("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[e("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),e("/visit-planner","📅","訪問計画","訪問スケジュール"),e("/map","🗺️","取引先マップ","地図で取引先を確認"),e("/prospects","🌱","新規営業","新規開拓の進捗"),e("/email","✉️","メール配信","一斉メール配信"),e("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[e("/workflow","🔄","受注ワークフロー","受注から出荷まで"),e("/shopify","🛒","Shopify注文","EC受注の確認"),e("/purchase","📥","仕入・買掛","仕入管理・買掛金"),e("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[e("/jikomi","🍶","仕込管理","仕込帳・製造記録"),e("/tanks","🛢️","タンク管理","タンク在庫の管理"),e("/tax","📋","酒税申告","酒税申告書の作成"),e("/demand","📆","需要・生産計画","需要予測・生産計画"),e("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[e("/master","⚙️","マスタ管理","商品・得意先マスタ"),e("/store","🏪","店舗・直売所","直売所の販売管理"),e("/tour","🏯","酒蔵見学","見学予約の管理"),e("/setup","🔗","連動設定","酒仙iとの連動"),e("/import","📤","データ取込","CSVデータ取込"),e("/users","👤","ユーザー管理","アカウント管理")].join("")}];return`
    <div class="home-page">
      <div class="home-welcome">
        <p class="home-welcome-date">${new Date().toLocaleDateString("ja-JP",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}</p>
        <h2 class="home-welcome-title">何をしますか？</h2>
      </div>
      ${t.map(s=>`
        <div class="home-section">
          <h3 class="home-section-title" style="--section-color:${s.color}">
            <span class="home-section-bar"></span>${s.title}
          </h3>
          <div class="home-card-grid">${s.cards}</div>
        </div>
      `).join("")}
    </div>
  `}function Cd(){if(Ra())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${_s()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",s=e[a.route]??"",n=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?dr(a.masterStats.customers,a.pickerQuery):el(a.masterStats.products,a.pickerQuery):"",i=a.globalSearchOpen?cr(a.globalQuery,Sd()):"",r=a.user?`<span class="app-header-user">${a.user.email}</span>
       <button class="button secondary small" type="button" data-action="auth-logout">ログアウト</button>`:a.authSkipped?'<span class="app-header-user">デモモード</span>':"";return`
    <div class="shell-v2">
      <header class="app-header">
        <div class="app-header-left">${t?`<div class="app-brand">
        <span class="app-brand-mark">syusen-cloud</span>
        <span class="app-brand-name">酒仙i クラウド</span>
       </div>`:`<a href="${"/".replace(/\/$/,"")||"/"}" data-link="/" class="app-back-btn">← ホーム</a>
       <span class="app-page-title">${s}</span>`}</div>
        <div class="app-header-right">
          <button class="button secondary small" type="button" data-action="global-search-open">検索 <kbd>Ctrl+K</kbd></button>
          ${r}
        </div>
      </header>
      ${Pd()}
      <main class="main-v2">
        <div class="view ${a.actionLoading?"is-busy":""}">${_s()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${n}
      ${i}
    </div>
  `}async function Ed(){a.actionLoading=!0,_();try{const{fetchSalesSummary:e}=await E(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>q);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,_()}}async function Ld(e){a.actionLoading=!0,_();try{a.invoiceRecords=await nt(e)}finally{a.actionLoading=!1,_()}}async function Dd(e){a.actionLoading=!0,_();try{a.customerLedger=await $a(e)}finally{a.actionLoading=!1,_()}}function ge(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,s)=>{const n=parseFloat(e.querySelector(`[data-line="${s}"][data-field="quantity"]`)?.value??"")||0,i=parseFloat(e.querySelector(`[data-line="${s}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${s}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${s}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${s}"][data-field="unit"]`)?.value??t.unit,quantity:n,unitPrice:i,amount:n*i}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function Ce(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function qd(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,_()}),e.querySelectorAll("[data-action='global-search-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("global-search")&&l.target instanceof HTMLElement&&!l.target.classList.contains("global-search")||(it(),_())})}),e.querySelector("#global-search-input")?.addEventListener("input",o=>{a.globalQuery=o.target.value,_()}),e.querySelectorAll("[data-action='global-nav']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.path;l&&(it(),$s(l))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{kd()}),e.querySelectorAll("[data-jikomi-tab]").forEach(o=>{o.addEventListener("click",()=>{a.jikomiView=o.dataset.jikomiTab,_()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const o=e.querySelector("#auth-email")?.value.trim()??"",l=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,_(),Jn(o,l).then(async d=>{a.user=d,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:g}=await E(async()=>{const{fetchMyProfile:$,recordAudit:x}=await Promise.resolve().then(()=>q);return{fetchMyProfile:$,recordAudit:x}},void 0);a.myProfile=await m(d.email),await g({action:"sign_in",userEmail:d.email}),_()}).catch(async d=>{try{const m=await Fa(o,l);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:g}=await E(async()=>{const{fetchMyProfile:$}=await Promise.resolve().then(()=>q);return{fetchMyProfile:$}},void 0);a.myProfile=await g(m.email)}catch{a.authError=d instanceof Error?d.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,_()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,_()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Yn().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,_()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(o=>{o.addEventListener("click",()=>{a.sidebarOpen=!1,_()})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let o=0;t.addEventListener("touchstart",l=>{o=l.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",l=>{l.changedTouches[0].clientX-o<-60&&(a.sidebarOpen=!1,_())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"";a.dismissedAnnouncements.add(l),_()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",l=>{l.preventDefault(),$s(o.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async o=>{o.preventDefault();const l=e.querySelector("#fr-title")?.value??"",d=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",g=e.querySelector("#fr-result");if(!l.trim())return;const $=await Ms(l,d,m);if(g&&(g.textContent=$?"送信しました":"送信に失敗しました",g.className=`fr-result ${$?"success":"error"}`),$){const x=e.querySelector("#feature-request-form");x&&x.reset()}}),e.querySelectorAll("[data-period]").forEach(o=>{o.addEventListener("click",()=>{a.salesPeriod=o.dataset.period,_()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const o=e.querySelector("#range-start")?.value??"",l=e.querySelector("#range-end")?.value??"";o&&l&&(a.customRange={start:o,end:l},a.salesPeriod="custom",_())}),e.querySelectorAll("[data-edit-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editCustomer??"",d=a.masterStats?.customers.find(g=>g.id===l);if(!d)return;const m=document.createElement("div");m.innerHTML=zr(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async g=>{g.preventDefault();const $=document.getElementById("edit-result"),x=await Rs(l,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,manual_override:!0});$&&($.textContent=x?"保存しました":"保存に失敗",$.className=`fr-result ${x?"success":"error"}`),x&&(document.getElementById("edit-modal")?.remove(),Ve())})})}),e.querySelectorAll("[data-edit-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editProduct??"",d=a.masterStats?.products.find(g=>g.id===l);if(!d)return;const m=document.createElement("div");m.innerHTML=Br(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async g=>{g.preventDefault();const $=document.getElementById("edit-result"),x=await Os(l,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});$&&($.textContent=x?"保存しました":"保存に失敗",$.className=`fr-result ${x?"success":"error"}`),x&&(document.getElementById("edit-modal")?.remove(),Ve())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Da(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,_()}),e.querySelectorAll("[data-open-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.openQuote,d=await cn(l);if(!d){D("見積の読み込みに失敗しました","error");return}a.quoteState={id:d.id,quoteNo:d.quote_no,quoteDate:d.quote_date,validUntil:d.valid_until??"",customerCode:d.legacy_customer_code??"",customerName:d.customer_name,customerAddress:d.customer_address,subject:d.subject,lines:d.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:d.remarks,taxRate:d.tax_rate,deliveryDate:d.delivery_date,paymentTerms:d.payment_terms,deliveryPlace:d.delivery_place,templateType:d.template_type??"sake",previewMode:!1},a.quoteEditId=l,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,_()})}),e.querySelectorAll("[data-delete-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.deleteQuote,d=o.dataset.quoteNo??l;if(!await ue(`見積 ${d} を削除しますか？`))return;await ws("quotes",l)?(a.quoteList=a.quoteList.filter($=>$.id!==l),D("削除しました","success"),_()):D("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,_(),La().then(o=>{a.quoteList=o,a.quoteListLoading=!1,_()})}),e.querySelectorAll("[name='q-template']").forEach(o=>{o.addEventListener("change",()=>{a.quoteState.templateType=o.value,_()})});function s(o){return(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function n(o){return o.length?o.map(l=>`<button class="search-item" type="button" data-select-customer="${s(l.code)}" data-cust-name="${s(l.name)}" data-cust-addr="${s(l.address1||"")}"><span class="mono">${s(l.code)}</span><span style="font-size:13px;font-weight:600;">${s(l.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function i(o){o.querySelectorAll("[data-select-customer]").forEach(l=>{l.addEventListener("click",async()=>{const d=l.dataset.selectCustomer??"";a.quoteState.customerCode=d,a.quoteState.customerName=l.dataset.custName??"",a.quoteState.customerAddress=l.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),o.remove(),a.quotePricing=await Wt(a.masterStats?.customers??[],d),_()})})}function r(o){const l=e.querySelector("#q-cust-search")?.closest(".form-row");if(!l)return;let d=document.getElementById("cust-search-results");d||(d=document.createElement("div"),d.id="cust-search-results",d.className="search-results",l.after(d));const m=a.masterStats?.customers??[],g=o.trim().toLowerCase(),$=g.length===0?m:m.filter(x=>x.name.includes(o)||x.kanaName.includes(o)||x.code.includes(o)||x.name.toLowerCase().includes(g)||x.kanaName.toLowerCase().includes(g));d.innerHTML=n($),i(d)}function c(o,l){return o.length?o.map(d=>{const m=l?Sa(d,l):{price:d.salePrice||0,label:"卸価格"},g=d.listPrice||0,$=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${s(d.code)}" data-prod-name="${s(d.name)}" data-prod-price="${m.price}" data-prod-retail="${g}" data-prod-jan="${s(d.janCode??"")}" data-prod-unit="${s(d.unit)}" data-prod-case="${d.caseQty??""}"><span class="mono">${s(d.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${s(d.name)}</span><span class="numeric"${$?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${s(m.label)})</small>${g?`　定価 ¥${g.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function p(o){o.querySelectorAll("[data-add-product]").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.addProduct??"",m=l.dataset.prodName??"",g=parseInt(l.dataset.prodPrice??"0"),$=parseInt(l.dataset.prodRetail??"0")||null,x=l.dataset.prodJan??"",A=l.dataset.prodUnit||"本",S=l.dataset.prodCase??"",C=S?parseInt(S):null;a.quoteState.lines.push({productCode:d,productName:m,janCode:x,caseQty:C,quantity:1,unit:A,unitPrice:g,retailPrice:$,amount:g}),a.quoteProductQuery="";const I=e.querySelector("#q-prod-search");I&&(I.value=""),_()})})}function u(o){const l=e.querySelector("#q-prod-search")?.closest(".form-row");if(!l)return;let d=document.getElementById("prod-search-results");if(d||(d=document.createElement("div"),d.id="prod-search-results",d.className="search-results",l.after(d)),!a.masterStats){d.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,g=o.trim().toLowerCase(),$=g.length===0?m:m.filter(x=>x.name.includes(o)||x.kanaName.includes(o)||x.code.includes(o)||x.name.toLowerCase().includes(g)||x.kanaName.toLowerCase().includes(g));d.innerHTML=c($,a.quotePricing),p(d)}function y(o,l){let d=null;function m(){d||(d=g=>{const $=document.getElementById(l);if(!$){document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null;return}o.contains(g.target)||$.contains(g.target)||($.remove(),document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null)},document.addEventListener("touchstart",d,{passive:!0}),document.addEventListener("mousedown",d))}return m}(function(){const o=e.querySelector("#q-cust-search");if(!o)return;const l=y(o,"cust-search-results");o.addEventListener("focus",()=>{r(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteCustomerQuery=o.value,r(o.value)}),o.addEventListener("input",d=>{d.isComposing||(a.quoteCustomerQuery=o.value,r(o.value))}),o.value&&r(o.value)})(),(function(){const o=e.querySelector("#q-prod-search");if(!o)return;const l=y(o,"prod-search-results");o.addEventListener("focus",()=>{u(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteProductQuery=o.value,u(o.value)}),o.addEventListener("input",d=>{d.isComposing||(a.quoteProductQuery=o.value,u(o.value))}),o.value&&u(o.value)})(),e.querySelectorAll("[data-select-customer]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.selectCustomer??"";a.quoteState.customerCode=l,a.quoteState.customerName=o.dataset.custName??"",a.quoteState.customerAddress=o.dataset.custAddr??"",a.quoteCustomerQuery="",a.quotePricing=await Wt(a.masterStats?.customers??[],l),_()})}),e.querySelectorAll("[data-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.addProduct??"",d=o.dataset.prodName??"",m=parseInt(o.dataset.prodPrice??"0"),g=parseInt(o.dataset.prodRetail??"0")||null,$=o.dataset.prodJan??"",x=o.dataset.prodUnit||"本",A=o.dataset.prodCase??"",S=A?parseInt(A):null;a.quoteState.lines.push({productCode:l,productName:d,janCode:$,caseQty:S,quantity:1,unit:x,unitPrice:m,retailPrice:g,amount:m}),a.quoteProductQuery="",_()})});function f(){mt(a.quoteState);const o=e.querySelector("#q-preview-scaler");if(!o)return;o.innerHTML=bn(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const l=o.querySelector(".q-preview-doc"),d=o.parentElement?.clientWidth??0,m=l?.offsetWidth??0;if(d>0&&m>0&&m>d-24){const g=(d-24)/m;o.style.transform=`scale(${g})`,o.style.transformOrigin="top left",o.style.height=`${((l?.offsetHeight??0)+48)*g}px`}else o.style.transform="",o.style.height=""}for(const o of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${o}`)?.addEventListener("input",f);e.querySelector("#q-remarks")?.addEventListener("input",f),e.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.quantity=parseFloat(o.value)||0,d.amount=d.quantity*d.unitPrice,f())})}),e.querySelectorAll(".price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.unitPrice=parseInt(o.value)||0,d.amount=d.quantity*d.unitPrice,f())})}),e.querySelectorAll(".jan-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.janCode=o.value,f())})}),e.querySelectorAll(".case-qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.caseQty=o.value?parseInt(o.value):null,f())})}),e.querySelectorAll(".retail-price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.retailPrice=o.value?parseInt(o.value):null,f())})}),e.querySelectorAll("[data-remove-line]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.removeLine??"0");a.quoteState.lines.splice(l,1),_()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{mt(a.quoteState),a.quoteState.previewMode=!0,_()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,_()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",()=>{mt(a.quoteState),Sr(a.quoteState,a.companySettings)}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{mt(a.quoteState);const o=a.quoteState,l=o.lines.reduce((A,S)=>A+S.amount,0),d=Math.round(l*o.taxRate/100),m=l+d;if(!o.quoteNo)try{const{supabaseRpc:A}=await E(async()=>{const{supabaseRpc:C}=await Promise.resolve().then(()=>z);return{supabaseRpc:C}},void 0),S=await A("generate_quote_no",{});o.quoteNo=S??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{o.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const g=new Date().toISOString().slice(0,10),$=o.templateType==="sake"||o.templateType==="standard"?o.templateType:"sake",x={quote_no:o.quoteNo,quote_date:o.quoteDate||g,valid_until:o.validUntil||null,legacy_customer_code:o.customerCode||null,customer_name:o.customerName||"",customer_address:o.customerAddress||"",subject:o.subject||"",template_type:$,subtotal:l,tax_amount:d,total_amount:m,tax_rate:o.taxRate||10,remarks:o.remarks||"",delivery_date:o.deliveryDate||"",payment_terms:o.paymentTerms||"",delivery_place:o.deliveryPlace||"",updated_at:new Date().toISOString()};try{let A=o.id;if(o.id){const S=await fetch(`${ae}/rest/v1/quotes?id=eq.${encodeURIComponent(o.id)}`,{method:"PATCH",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(x)});if(!S.ok){const C=await S.text();throw new Error(`quotes更新失敗 ${S.status}: ${C}`)}await fetch(`${ae}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(o.id)}`,{method:"DELETE",headers:{apikey:V,Authorization:`Bearer ${V}`}})}else{const S=await fetch(`${ae}/rest/v1/quotes`,{method:"POST",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(x)});if(!S.ok){const I=await S.text();throw new Error(`quotes作成失敗 ${S.status}: ${I}`)}const C=await S.json();if(!C?.[0]?.id)throw new Error("IDが返りませんでした");A=C[0].id,o.id=A}if(o.lines.length>0){const S=o.lines.map((I,L)=>({quote_id:A,line_no:L+1,legacy_product_code:I.productCode||null,product_name:I.productName,jan_code:I.janCode||null,case_qty:I.caseQty??null,quantity:I.quantity,unit:I.unit,unit_price:I.unitPrice,retail_price:I.retailPrice??null,amount:I.amount})),C=await fetch(`${ae}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(S)});if(!C.ok){const I=await C.text();throw new Error(`明細保存失敗 ${C.status}: ${I}`)}}D(`見積 ${o.quoteNo} を保存しました`,"success"),_()}catch(A){console.error("[save-quote]",A),D(`保存失敗: ${String(A).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const o=d=>document.getElementById(d)?.value??"",l={...a.quoteCompanySettings,companyName:o("qs-company-name"),companyPostal:o("qs-company-postal"),companyAddress1:o("qs-company-addr1"),companyAddress2:o("qs-company-addr2"),companyTel:o("qs-company-tel"),companyFax:o("qs-company-fax"),companyEmail:o("qs-company-email"),companyRegistrationNo:o("qs-company-regno"),bankName:o("qs-bank-name"),bankBranch:o("qs-bank-branch"),bankAccountType:o("qs-bank-type"),bankAccountNo:o("qs-bank-no"),bankAccountHolder:o("qs-bank-holder"),defaultPaymentTerms:o("qs-payment-terms"),defaultHeaderNote:o("qs-header-note"),defaultFooterNote:o("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Le(l),je("quote_company",l),a.quoteCompanySettings=l,D("設定を保存しました","success"),_()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},Le(a.quoteCompanySettings),je("quote_company",a.quoteCompanySettings),_()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",o=>{const l=o.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},Le(a.quoteCompanySettings),_()}),e.querySelector("#qs-seal-file")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const d=new FileReader;d.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:d.result},Le(a.quoteCompanySettings),je("quote_company",a.quoteCompanySettings),_()},d.readAsDataURL(l)}),e.querySelector("#qs-seal-size")?.addEventListener("input",o=>{const l=parseInt(o.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:l},Le(a.quoteCompanySettings),je("quote_company",a.quoteCompanySettings),_()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Le(a.quoteCompanySettings),je("quote_company",a.quoteCompanySettings),_()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.month;l&&(a.demandForecast.calendarMonth=l,_())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.segment;a.demandForecast.selectedSegment=l,_()})}),e.querySelectorAll("[data-demand-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.demandTab;l&&(a.demandTab=l,_())})});function v(o){const l=a.demandAnalysis,d=a.safetyStockParams;if(!l||d.length===0)return[];const m=l.months.filter(g=>g<o).slice(-3);return d.map(g=>{const $=g.productionType==="make_to_order",x=m.map(I=>l.matrix[g.productCode]?.[I]??0),A=$?0:x.length>0?Math.ceil(x.reduce((I,L)=>I+L,0)/x.length):Math.ceil(g.avgMonthlyDemand),S=$?0:Math.ceil(g.safetyStockQty),C=Math.max(0,A+S);return{id:"",yearMonth:o,productCode:g.productCode,productName:g.productName,demandForecast:A,safetyStockTarget:S,openingStock:0,requiredProduction:C,plannedQty:$?0:C,actualQty:0,status:"draft",productionType:g.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value)||3;a.demandYearsBack=l,a.demandAnalysis=null;const{fetchDemandAnalysis:d}=await E(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>q);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await d(l*12),_()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=parseInt(o.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const g=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,$=d/30,x=Math.ceil(g*m.demandStdDev*Math.sqrt($)),A=Math.ceil(m.avgMonthlyDemand*$+x);return{...m,leadTimeDays:d,safetyStockQty:x,reorderPoint:A}}),_()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=parseFloat(o.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const g=d>=.99?2.33:d>=.97?1.88:d>=.95?1.65:d>=.9?1.28:1.04,$=m.leadTimeDays/30,x=Math.ceil(g*m.demandStdDev*Math.sqrt($)),A=Math.ceil(m.avgMonthlyDemand*$+x);return{...m,serviceLevel:d,safetyStockQty:x,reorderPoint:A}}),_()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async o=>{if(a.safetyStockParams.length===0)return;const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveSafetyStockParamsBulk:d}=await E(async()=>{const{saveSafetyStockParamsBulk:g}=await Promise.resolve().then(()=>q);return{saveSafetyStockParamsBulk:g}},void 0),m=await d(a.safetyStockParams);l.disabled=!1,l.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const o=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),l=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(d=>{const m=o>=.99?2.33:o>=.97?1.88:o>=.95?1.65:o>=.9?1.28:1.04,g=l/30,$=Math.ceil(m*d.demandStdDev*Math.sqrt(g)),x=Math.ceil(d.avgMonthlyDemand*g+$);return{...d,serviceLevel:o,leadTimeDays:l,safetyStockQty:$,reorderPoint:x}}),_()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=o.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===l?{...m,productionType:d}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarShifts=xt(l,a.calendarDefaultPart,a.calendarDefaultEmp);const{fetchProductionPlan:d}=await E(async()=>{const{fetchProductionPlan:g}=await Promise.resolve().then(()=>q);return{fetchProductionPlan:g}},void 0),m=await d(l);a.productionPlan=m.length>0?m:v(l),_()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(o=>{o.addEventListener("click",()=>{a.demandPlanTypeFilter=o.dataset.filter??"all",_()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.sortCol??"";a.demandSort?.column===l?a.demandSort=a.demandSort.dir==="desc"?{column:l,dir:"asc"}:null:a.demandSort={column:l,dir:"desc"},_()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=v(a.demandPlanYearMonth),_()}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(d=>{const m=d.dataset.code??"",g=a.productionPlan.find($=>$.productCode===m);g&&(g.plannedQty=parseFloat(d.value)||0)});const{saveProductionPlan:o}=await E(async()=>{const{saveProductionPlan:d}=await Promise.resolve().then(()=>q);return{saveProductionPlan:d}},void 0);await Promise.all(a.productionPlan.map(d=>o(d)));const{fetchProductionPlan:l}=await E(async()=>{const{fetchProductionPlan:d}=await Promise.resolve().then(()=>q);return{fetchProductionPlan:d}},void 0);a.productionPlan=await l(a.demandPlanYearMonth),_()}),e.querySelectorAll("[data-action='cal-select-day']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.date??"";a.calendarSelectedDate=a.calendarSelectedDate===l?null:l,_()})}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",d=parseInt(o.value)||0,m=a.calendarShifts.find(g=>g.date===l);m&&(m.partTimers=d),_()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",d=parseInt(o.value)||0,m=a.calendarShifts.find(g=>g.date===l);m&&(m.employees=d),_()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarSelectedDate=null,a.calendarShifts=xt(l,a.calendarDefaultPart,a.calendarDefaultEmp);const{fetchProductionPlan:d}=await E(async()=>{const{fetchProductionPlan:g}=await Promise.resolve().then(()=>q);return{fetchProductionPlan:g}},void 0),m=await d(l);a.productionPlan=m.length>0?m:v(l),_()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultPart=l;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.partTimers=m?0:l}_()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultEmp=l;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.employees=m?0:l}_()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=xt(a.demandPlanYearMonth,a.calendarDefaultPart,a.calendarDefaultEmp),_()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const o of a.calendarShifts)o.confirmed=!0;_()}),e.querySelectorAll("[data-action='select-month']").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=l,_())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterArea=o.target.value,_())}),e.querySelector("#visit-filter-score")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(o.target.value)||0,_())}),e.querySelectorAll("[data-sort-col]").forEach(o=>{o.addEventListener("click",l=>{const d=o.dataset.sortCol??"",m=l.shiftKey;a.route==="/product-power"?a.productSortState=Qe(a.productSortState,d,m):a.route==="/customer-efficiency"?a.customerSortState=Qe(a.customerSortState,d,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=Qe(a.dashboardSortState,d,m):a.route==="/master"?a.masterSortState=Qe(a.masterSortState,d,m):a.route==="/analytics"&&(a.analyticsSortState=Qe(a.analyticsSortState,d,m)),_()})}),e.querySelectorAll("[data-product-period]").forEach(o=>{o.addEventListener("click",()=>{a.productPeriod=o.dataset.productPeriod??"year",_()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const o=document.getElementById("pp-range-start")?.value??"",l=document.getElementById("pp-range-end")?.value??"";o&&l&&(a.productCustomStart=o,a.productCustomEnd=l,a.productPeriod="custom",_())}),e.querySelectorAll("[data-product-filter]").forEach(o=>{o.addEventListener("click",()=>{a.productFilter=o.dataset.productFilter??"all",_()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…",await Ve(),l.disabled=!1,l.textContent="↻ 更新",D("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const o=e.querySelector("#sales-start")?.value??"",l=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:o,endDate:l},Ed()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const o={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=o,Ld(o)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const o=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=o.trim().toUpperCase(),Dd(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{a.masterTab=o.dataset.tab,a.masterFilter={...qa},_()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},_()}),e.querySelector("#master-search")?.addEventListener("keydown",o=>{o.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.page);l>=1&&(a.masterFilter={...a.masterFilter,page:l},_())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.table;if(!l)return;a.rawSelectedTable=l,a.rawPage=1;const d=await _t(l,1);a.rawRecords=d.records,a.rawTotalCount=d.total,_()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const o=await _t(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,_()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const o=await _t(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,_()}),e.querySelectorAll("[data-analytics-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsTab=o.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:d}=await E(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:g}=await Promise.resolve().then(()=>q);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:g}},void 0);a.analyticsPeriodOptions=await d(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await l(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}_()})}),e.querySelectorAll("[data-analytics-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:d,fetchPeriodChartData:m,prevYearFilter:g}=await E(async()=>{const{fetchAnalyticsByPeriod:x,fetchAvailablePeriods:A,fetchPeriodChartData:S,prevYearFilter:C}=await Promise.resolve().then(()=>q);return{fetchAnalyticsByPeriod:x,fetchAvailablePeriods:A,fetchPeriodChartData:S,prevYearFilter:C}},void 0),$=o.dataset.analyticsPeriod;if(a.analyticsPeriod=$,a.analyticsDrilldown=null,$==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await d(a.analyticsTab,$),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const x=a.analyticsPeriodFilter,[A,S,C]=await Promise.all([l(a.analyticsTab,$,x),m($,x),m($,g(x))]);a.analyticsPeriodRows=A,a.analyticsPeriodChartData=S,a.analyticsPrevYearChartData=C}_()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async o=>{const{fetchAnalyticsByPeriod:l,fetchPeriodChartData:d,prevYearFilter:m}=await E(async()=>{const{fetchAnalyticsByPeriod:x,fetchPeriodChartData:A,prevYearFilter:S}=await Promise.resolve().then(()=>q);return{fetchAnalyticsByPeriod:x,fetchPeriodChartData:A,prevYearFilter:S}},void 0);a.analyticsPeriodFilter=o.target.value,a.analyticsDrilldown=null;const g=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:x}=await E(async()=>{const{fiscalYearToDateRange:j}=await Promise.resolve().then(()=>ns);return{fiscalYearToDateRange:j}},void 0),A=parseInt(g),S=x(A);x(A-1);const C=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:I}=await E(async()=>{const{supabaseRpc:j}=await Promise.resolve().then(()=>z);return{supabaseRpc:j}},void 0),[L,T,R]=await Promise.all([I(C,{p_date_from:S.from,p_date_to:S.to}),d("yearly",g),d("yearly",String(A-1))]);a.analyticsPeriodRows=(L??[]).map(j=>({code:String(j.code??""),name:String(j.name??""),amount:Number(j.amount??0),quantity:Number(j.quantity??0),documents:Number(j.documents??0),volumeMl:Number(j.volume_ml??0)})),a.analyticsPeriodChartData=(T??[]).map(j=>({...j})),a.analyticsPrevYearChartData=(R??[]).map(j=>({...j}))}else{const[x,A,S]=await Promise.all([l(a.analyticsTab,a.analyticsPeriod,g),d(a.analyticsPeriod,g),d(a.analyticsPeriod,m(g))]);a.analyticsPeriodRows=x,a.analyticsPeriodChartData=A,a.analyticsPrevYearChartData=S}_()}),e.querySelectorAll("[data-fiscal-mode]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsFiscalMode=o.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:l}=await E(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>ns);return{monthToFiscalYear:m}},void 0),d=new Set;for(const m of a.salesAnalytics.monthlySales)d.add(l(m.month));a.analyticsPeriodOptions=[...d].sort((m,g)=>g-m).map(String)}else{const{fetchAvailablePeriods:l}=await E(async()=>{const{fetchAvailablePeriods:d}=await Promise.resolve().then(()=>q);return{fetchAvailablePeriods:d}},void 0);a.analyticsPeriodOptions=await l(a.analyticsTab,"yearly")}_()})}),e.querySelectorAll("[data-chart-metric]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsChartMetric=o.dataset.chartMetric,_()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.analyticsDrilldown??"",d=o.dataset.drilldownName??l,m=a.analyticsTab,{fetchCustomerProductBreakdown:g,fetchProductCustomerBreakdown:$,fetchEntityMonthlySales:x,periodToDateRange:A}=await E(async()=>{const{fetchCustomerProductBreakdown:L,fetchProductCustomerBreakdown:T,fetchEntityMonthlySales:R,periodToDateRange:j}=await Promise.resolve().then(()=>q);return{fetchCustomerProductBreakdown:L,fetchProductCustomerBreakdown:T,fetchEntityMonthlySales:R,periodToDateRange:j}},void 0),S=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?A(a.analyticsPeriod,a.analyticsPeriodFilter):null,[C,I]=await Promise.all([x(l,m==="customers"?"customer":"product"),m==="customers"?g(l,S?.from,S?.to):$(l,S?.from,S?.to)]);a.analyticsDrilldown={tab:m,code:l,name:d,monthlySales:C,breakdownRows:I},_()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,_()}),e.querySelector("#staff-filter-input")?.addEventListener("input",o=>{a.analyticsStaffFilter=o.target.value,_()}),e.querySelectorAll("[data-staff-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.staffDrilldown??"",d=o.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:g,periodToDateRange:$}=await E(async()=>{const{fetchStaffCustomerBreakdown:I,fetchStaffProductBreakdown:L,periodToDateRange:T}=await Promise.resolve().then(()=>q);return{fetchStaffCustomerBreakdown:I,fetchStaffProductBreakdown:L,periodToDateRange:T}},void 0),x=$(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),A=a.analyticsStaffDrilldown?.breakdownTab??"customers",[S,C]=await Promise.all([m(l,x?.from,x?.to),g(l,x?.from,x?.to)]);a.analyticsStaffDrilldown={code:l,name:d,breakdownTab:A,customerRows:S,productRows:C},_()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:o.dataset.staffBreakdownTab},_())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,_()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",o=>{a.analyticsTagFilter=o.target.value,_()}),e.querySelectorAll("[data-staff-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAvailablePeriods:l,fetchStaffTotalsByPeriod:d,periodToDateRange:m}=await E(async()=>{const{fetchAvailablePeriods:$,fetchStaffTotalsByPeriod:x,periodToDateRange:A}=await Promise.resolve().then(()=>q);return{fetchAvailablePeriods:$,fetchStaffTotalsByPeriod:x,periodToDateRange:A}},void 0),g=o.dataset.staffPeriod;if(a.analyticsStaffPeriod=g,a.analyticsStaffDrilldown=null,g==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await l("staff",g),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const $=m(g,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await d($?.from,$?.to)}_()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async o=>{const{fetchStaffTotalsByPeriod:l,periodToDateRange:d}=await E(async()=>{const{fetchStaffTotalsByPeriod:g,periodToDateRange:$}=await Promise.resolve().then(()=>q);return{fetchStaffTotalsByPeriod:g,periodToDateRange:$}},void 0);a.analyticsStaffPeriodFilter=o.target.value;const m=d(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await l(m?.from,m?.to),a.analyticsStaffDrilldown=null,_()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{ge(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},_()}),e.querySelectorAll("[data-action='remove-line']").forEach(o=>{o.addEventListener("click",()=>{ge(e);const l=parseInt(o.dataset.line??"0",10);a.invoiceForm.lines.splice(l,1),a.invoiceErrors=Tn(a.invoiceForm),_()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(o=>{o.addEventListener("click",()=>{ge(e),bd(parseInt(o.dataset.line??"0",10)),a.invoiceErrors={},_()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{$d(),_()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{ge(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,_()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(o=>{o.addEventListener("click",()=>{ge(e);const l=parseInt(o.dataset.line??"0",10),d=a.invoiceForm.lines[l];a.pickerMode="product",a.pickerTargetLine=l,a.pickerQuery=d?d.productCode||d.productName:"",_()})}),e.querySelectorAll("[data-action='modal-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("modal-backdrop")&&l.target instanceof HTMLElement&&!l.target.classList.contains("modal-backdrop")||(Ct(),_())})}),e.querySelectorAll("[data-action='picker-select']").forEach(o=>{const l=async()=>{const d=o.dataset.code??"",m=o.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=d,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const g=a.masterStats?.customers.find($=>$.code===d);a.invoicePriceGroup=g?.priceGroup||"",!a.invoicePriceGroup&&d&&(a.invoicePriceGroup=await ta(d))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const g=a.invoiceForm.lines[a.pickerTargetLine];if(g){g.productCode=d,g.productName=m;const $=await ln(a.invoicePriceGroup,d);$>0&&(g.unitPrice=$),g.amount=g.quantity*g.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Ct(),_()};o.addEventListener("click",l),o.addEventListener("keydown",d=>{d.key==="Enter"&&l()})}),e.querySelector("#modal-search")?.addEventListener("input",o=>{a.pickerQuery=o.target.value,_()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{In(),_()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Nn(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{ge(e),_d(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await ta(a.invoiceForm.customerCode)),_())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{ge(e),wd(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,_())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(o=>{o.addEventListener("input",()=>{ge(e),a.invoiceSavedDocNo=null;const l=o.dataset.field;(l==="quantity"||l==="unitPrice")&&_()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{ge(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const o=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=o.trim(),a.deliveryNote=null,a.actionLoading=!0,_(),!a.deliverySearchDocNo){D("伝票番号を入力してください","error"),a.actionLoading=!1,_();return}wa(a.deliverySearchDocNo).then(l=>{a.deliveryNote=l,a.actionLoading=!1,_()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const o=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=o,a.billingSummary=null,a.actionLoading=!0,_(),xa(o).then(l=>{a.billingSummary=l,a.actionLoading=!1,_()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const o=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),l=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=o,a.taxMonth=l,a.taxDeclaration=null,a.actionLoading=!0,_(),ka(o,l).then(d=>{a.taxDeclaration=d,a.actionLoading=!1,_()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:o}=await E(async()=>{const{generateTaxXML:$}=await Promise.resolve().then(()=>q);return{generateTaxXML:$}},void 0),l=o(a.taxDeclaration),d=new Blob([l],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(d),g=document.createElement("a");g.href=m,g.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,g.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:o}=await E(async()=>{const{generateTaxCSV:$}=await Promise.resolve().then(()=>q);return{generateTaxCSV:$}},void 0),l=o(a.taxDeclaration),d=new Blob([l],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(d),g=document.createElement("a");g.href=m,g.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,g.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:o}=await E(async()=>{const{saveTaxDeclaration:l}=await Promise.resolve().then(()=>q);return{saveTaxDeclaration:l}},void 0);try{await o(a.taxDeclaration),D("下書き保存しました")}catch(l){D("保存に失敗: "+(l instanceof Error?l.message:String(l)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(o=>{o.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),d=o.dataset.taxField,m=o.type==="number"?Number(o.value)||0:o.value,g=[...a.taxDeclaration.rows];g[l]={...g[l],[d]:m};const{recalculateTaxDeclaration:$}=await E(async()=>{const{recalculateTaxDeclaration:x}=await Promise.resolve().then(()=>q);return{recalculateTaxDeclaration:x}},void 0);a.taxDeclaration=$({...a.taxDeclaration,rows:g}),_()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),d=o.dataset.dedField,m=o.type==="number"?Number(o.value)||0:o.value,g=[...a.taxDeclaration.deductions];g[l]={...g[l],[d]:m},a.taxDeclaration={...a.taxDeclaration,deductions:g},_()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=o.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[l]:o.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:l}=await E(async()=>{const{recalculateTaxDeclaration:g,TAX_RATE_CATEGORIES:$}=await Promise.resolve().then(()=>q);return{recalculateTaxDeclaration:g,TAX_RATE_CATEGORIES:$}},void 0),d=l[0],m={taxCategory:d.code,taxCategoryName:d.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:d.taxRatePerLiter,taxAmount:0};a.taxDeclaration=o({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),_()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(o=>{o.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),{recalculateTaxDeclaration:d}=await E(async()=>{const{recalculateTaxDeclaration:g}=await Promise.resolve().then(()=>q);return{recalculateTaxDeclaration:g}},void 0),m=a.taxDeclaration.rows.filter((g,$)=>$!==l);a.taxDeclaration=d({...a.taxDeclaration,rows:m}),_()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,o]},_()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(o=>{o.addEventListener("click",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),d=a.taxDeclaration.deductions.filter((m,g)=>g!==l);a.taxDeclaration={...a.taxDeclaration,deductions:d},_()})}),e.querySelectorAll("[data-store-tab]").forEach(o=>{o.addEventListener("click",()=>{a.storeTab=o.dataset.storeTab,_()})}),e.querySelectorAll("[data-import-entity]").forEach(o=>{o.addEventListener("click",()=>{a.importEntity=o.dataset.importEntity,a.importPreview=null,a.importResult=null,_()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const o=cc(a.importEntity),l=new Blob([o],{type:"text/csv;charset=utf-8"}),d=URL.createObjectURL(l),m=document.createElement("a");m.href=d,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const l=e.querySelector("#import-file")?.files?.[0];if(!l){D("CSVファイルを選択してください","warning");return}const d=new FileReader;d.onload=()=>{const m=String(d.result??""),{columns:g,rows:$}=rc(m);a.importPreview=lc(a.importEntity,g,$),a.importResult=null,_()},d.readAsText(l,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,_()}),e.querySelectorAll("[data-print-template]").forEach(o=>{o.addEventListener("click",()=>{a.printTemplate=o.dataset.printTemplate,_()})}),e.querySelectorAll("[data-print-field]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.printField;let d=o.value;(l==="taxRate"||l==="previousBalance"||l==="paymentAmount")&&(d=Number(o.value)||0),a.printData={...a.printData,[l]:d},_()})}),e.querySelectorAll("[data-print-opt]").forEach(o=>{const l=()=>{const d=o.dataset.printOpt;let m;o.type==="checkbox"?m=o.checked:d==="copies"?m=Number(o.value)||1:d==="overlayOpacity"||d==="calibrationOffsetX"||d==="calibrationOffsetY"?m=Number(o.value)||0:m=o.value,a.printOptions={...a.printOptions,[d]:m},_()};o.addEventListener("change",l),o.type==="range"&&o.addEventListener("input",l)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(o=>{o.addEventListener("change",()=>{const l=Number(o.dataset.printLine),d=o.dataset.printLfield,m=[...a.printData.lines];let g=o.value;(d==="quantity"||d==="unitPrice")&&(g=Number(o.value)||0),m[l]={...m[l],[d]:g},m[l].amount=(Number(m[l].quantity)||0)*(Number(m[l].unitPrice)||0),a.printData={...a.printData,lines:m},_()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},_()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((d,m)=>m!==l)},_()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),D("印刷設定を保存しました")}catch(o){D("保存失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const o=a.printCompany,l=prompt("会社名",o.name);if(l===null)return;const d=prompt("郵便番号",o.postalCode)??o.postalCode,m=prompt("住所",o.address1)??o.address1,g=prompt("TEL",o.tel)??o.tel,$=prompt("FAX",o.fax)??o.fax,x=prompt("適格請求書登録番号 (T+13桁)",o.registrationNo)??o.registrationNo,A=prompt("取引銀行名",o.bankName)??o.bankName,S=prompt("支店名",o.bankBranch)??o.bankBranch,C=prompt("口座番号",o.bankAccountNo)??o.bankAccountNo,I=prompt("口座名義",o.bankAccountHolder)??o.bankAccountHolder;a.printCompany={...o,name:l,postalCode:d,address1:m,tel:g,fax:$,registrationNo:x,bankName:A,bankBranch:S,bankAccountNo:C,bankAccountHolder:I},_()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,_()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const d=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=Vt(o),{savePrintLayout:g}=await E(async()=>{const{savePrintLayout:x}=await Promise.resolve().then(()=>q);return{savePrintLayout:x}},void 0),$={id:`bp1701_${d.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:d,templateKey:"chain_store",positions:m};try{await g($)?(D(`クラウド保存成功: ${d}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),_()):(D("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(x){D("保存エラー: "+(x instanceof Error?x.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const l=Vt(o);a.fdSavedPositions=l;try{localStorage.setItem("sake_fd_positions",JSON.stringify(l)),D(`ローカル保存完了: ${Object.keys(l).length}件`)}catch(d){D("保存失敗: "+(d instanceof Error?d.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const d={templateKey:"chain_store",positions:Vt(o),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),g=URL.createObjectURL(m),$=document.createElement("a");$.href=g,$.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,$.click(),URL.revokeObjectURL(g)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async o=>{const l=o.target.files?.[0];if(l)try{const d=await l.text(),g=JSON.parse(d).positions;if(!g)throw new Error("positions field not found");a.fdSavedPositions=g,localStorage.setItem("sake_fd_positions",JSON.stringify(g)),D(`インポート成功: ${Object.keys(g).length}件`),_()}catch(d){D("インポート失敗: "+(d instanceof Error?d.message:""),"error")}});const b=e.querySelector("#fd-saved-layouts");b&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:o}=await E(async()=>{const{fetchPrintLayouts:d}=await Promise.resolve().then(()=>q);return{fetchPrintLayouts:d}},void 0),l=await o("chain_store");l.length===0?b.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(b.innerHTML=`☁️ クラウド保存済み (${l.length}件):<br/>`+l.map(d=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${d.id}" style="margin:4px 4px 0 0;">${d.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${d.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),b.querySelectorAll("[data-action='fd-load-layout']").forEach(d=>{d.addEventListener("click",()=>{const m=d.dataset.layoutId,g=l.find($=>$.id===m);g&&(a.fdSavedPositions=g.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(g.positions)),D(`読込完了: ${g.name}`),_())})}),b.querySelectorAll("[data-action='fd-delete-layout']").forEach(d=>{d.addEventListener("click",async()=>{const m=d.dataset.layoutId;if(!m||!await ue("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:g}=await E(async()=>{const{deletePrintLayout:x}=await Promise.resolve().then(()=>q);return{deletePrintLayout:x}},void 0);await g(m)?(D("削除しました"),_()):D("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await ue("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),_())});const w=e.querySelector("#fd-sel-x"),P=e.querySelector("#fd-sel-y");[w,P].forEach(o=>{o?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const l=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);l&&(w&&(l.style.left=w.value+"mm"),P&&(l.style.top=P.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(o=>{o.addEventListener("dragstart",l=>{o.classList.add("wf-dragging"),l.dataTransfer?.setData("text/plain",o.dataset.wfOrder??"")}),o.addEventListener("dragend",()=>o.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",l=>{l.preventDefault();const d=l.dataTransfer?.getData("text/plain"),m=o.dataset.wfStage;if(!d||!m)return;const g=a.workflowOrders.find($=>$.id===d);g&&(g.stage=m,_())})}),e.querySelectorAll("[data-mo-step]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moStep;o.disabled||(a.mobileOrder.step=l,_())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",o=>{a.mobileOrder.customerQuery=o.target.value,_()}),e.querySelector("#mo-product-q")?.addEventListener("input",o=>{a.mobileOrder.productQuery=o.target.value,_()}),e.querySelectorAll("[data-mo-select-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moSelectCustomer,d=a.masterStats?.customers.find(m=>m.id===l);d&&(a.mobileOrder.selectedCustomer=d),_()})}),e.querySelectorAll("[data-mo-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moAddProduct,d=a.masterStats?.products.find(g=>g.code===l);if(!d)return;const m=1800;a.mobileOrder.cart.push({productCode:d.code,productName:d.name,quantity:1,unit:"本",unitPrice:m,amount:m}),_()})}),e.querySelectorAll("[data-mo-qty]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moQty),d=o.dataset.moProduct,m=a.mobileOrder.cart.find(g=>g.productCode===d);m&&(m.quantity=Math.max(0,m.quantity+l),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(g=>g.productCode!==d)),_())})}),e.querySelectorAll("[data-mo-remove]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moRemove);a.mobileOrder.cart.splice(l,1),_()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const o=e.querySelector("#mo-memo");a.mobileOrder.memo=o?.value??"";const l="MO"+Date.now().toString().slice(-8);a.mobileOrder.submittedDocNo=l,a.mobileOrder.step="done",_()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},_()}),e.querySelectorAll("[data-tour-id]").forEach(o=>{o.addEventListener("click",()=>{a.tourActiveId=o.dataset.tourId??null,_()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(o=>{o.addEventListener("click",()=>{const l=a.tourInquiries.find(x=>x.id===a.tourActiveId);if(!l)return;const d=o.dataset.template==="confirm"?Tl:Nl,m=e.querySelector("#tour-confirmed-time"),g=d.replaceAll("{name}",l.name).replaceAll("{partySize}",String(l.partySize)).replaceAll("{confirmedTime}",m?.value??l.visitDate),$=e.querySelector("#tour-reply-body");$&&($.value=g)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const o=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",l=a.tourInquiries.find(m=>m.id===o);if(!l)return;const d=e.querySelector("#tour-confirmed-time");l.status="confirmed",l.repliedAt=new Date().toISOString(),l.confirmedTime=d?.value??"",D("返信メールを下書き保存し、ステータスを確定にしました"),_()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const o=e.querySelector("#lb-type")?.value??"",l=e.querySelector("#lb-area")?.value??"",d=e.querySelector("#lb-keyword")?.value??"";if(!o&&!d){D("業種かキーワードを入力してください","warning");return}a.leadSearchType=o,a.leadSearchArea=l,a.leadSearchQuery=d,a.leadSearching=!0,_();const m=a.integrations.find(A=>A.provider==="google_maps");if(!m||!m.config.api_key){D("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,_();return}const{searchPlaces:g}=await E(async()=>{const{searchPlaces:A}=await Promise.resolve().then(()=>q);return{searchPlaces:A}},void 0),$=[o,d].filter(Boolean).join(" "),x=await g(m,$,l);a.leadSearching=!1,x.error?D("検索失敗: "+x.error,"error"):a.leadSearchResults=x.results,_()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],_()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const o=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!o)return;const l=`ll_${Date.now()}`,d={id:l,name:o,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:g,fetchLeadLists:$,fetchLeadItems:x}=await E(async()=>{const{saveLeadList:C,saveLeadItem:I,fetchLeadLists:L,fetchLeadItems:T}=await Promise.resolve().then(()=>q);return{saveLeadList:C,saveLeadItem:I,fetchLeadLists:L,fetchLeadItems:T}},void 0);await m(d);const A=e.querySelectorAll(".lb-search-check:checked"),S=Array.from(A).map(C=>Number(C.dataset.idx));for(const C of S){const I=a.leadSearchResults[C];I&&await g({...I,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:l,businessType:a.leadSearchType})}a.leadLists=await $(),a.leadActiveListId=l,a.leadItems=await x(l),a.leadSearchResults=[],D(`${S.length}件を「${o}」として保存しました`),_()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.leadActiveListId=l,l){const{fetchLeadItems:d}=await E(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>q);return{fetchLeadItems:m}},void 0);a.leadItems=await d(l)}_()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.leadItems.find($=>$.id===l);if(!d)return;const{saveLeadItem:m,fetchLeadItems:g}=await E(async()=>{const{saveLeadItem:$,fetchLeadItems:x}=await Promise.resolve().then(()=>q);return{saveLeadItem:$,fetchLeadItems:x}},void 0);await m({...d,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await g(a.leadActiveListId)),_()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.leadItems.find(x=>x.id===l);if(!d)return;const{convertLeadToProspect:m,fetchLeadItems:g}=await E(async()=>{const{convertLeadToProspect:x,fetchLeadItems:A}=await Promise.resolve().then(()=>q);return{convertLeadToProspect:x,fetchLeadItems:A}},void 0);await m(d)&&(D("見込客に追加しました: "+d.companyName),a.leadActiveListId&&(a.leadItems=await g(a.leadActiveListId)),_())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const o=e.querySelectorAll(".lb-item-check:checked");if(o.length===0&&!await ue("全ての新規アイテムを見込客に変換しますか？"))return;const l=o.length>0?Array.from(o).map($=>$.dataset.id):a.leadItems.filter($=>$.status==="new").map($=>$.id),{convertLeadToProspect:d,fetchLeadItems:m}=await E(async()=>{const{convertLeadToProspect:$,fetchLeadItems:x}=await Promise.resolve().then(()=>q);return{convertLeadToProspect:$,fetchLeadItems:x}},void 0);let g=0;for(const $ of l){const x=a.leadItems.find(A=>A.id===$);x&&x.status==="new"&&await d(x)&&g++}D(`${g}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),_()}),e.querySelectorAll("[data-map-filter]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.mapFilter;let d;o.type==="checkbox"?d=o.checked:d=o.value,a.mapFilters={...a.mapFilters,[l]:d},_()})}),e.querySelectorAll(".churn-reason-select").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",d=o.value;try{const{saveChurnNote:m}=await E(async()=>{const{saveChurnNote:x}=await Promise.resolve().then(()=>q);return{saveChurnNote:x}},void 0);await m({customerCode:l,reason:d,memo:"",actionedAt:null});const g=a.churnNotes.find(x=>x.customerCode===l);g?g.reason=d:a.churnNotes.push({customerCode:l,reason:d,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const $=o.closest("tr");if($){const x=$.querySelector("td:nth-child(2)");if(x){let A=x.querySelector(".reason-badge");!A&&d&&(A=document.createElement("span"),A.className="status-pill info reason-badge",A.style.fontSize="0.72rem",x.appendChild(A)),A&&(A.textContent=d?cd[d]??"":"")}}D("理由を保存しました")}catch(m){D("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",d=o.checked,m=o.closest("tr");m&&(m.style.opacity=d?"0.45":"",m.setAttribute("data-actioned",d?"1":"0"));try{const{saveChurnNote:g}=await E(async()=>{const{saveChurnNote:S}=await Promise.resolve().then(()=>q);return{saveChurnNote:S}},void 0),$=a.churnNotes.find(S=>S.customerCode===l),x=$?.reason??"",A=new Date().toISOString().slice(0,10);await g({customerCode:l,reason:x,memo:"",actionedAt:d?A:null}),$?$.actionedAt=d?A:null:a.churnNotes.push({customerCode:l,reason:x,memo:"",actionedAt:d?A:null,updatedAt:new Date().toISOString()}),D(d?"対応済みにしました":"対応済みを解除しました")}catch(g){D("保存に失敗しました","error"),console.error(g)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const o=a.integrations.find(g=>g.provider==="ivry");if(!o||!o.isEnabled){D("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:l,fetchCallLogs:d}=await E(async()=>{const{syncIvryCallLogs:g,fetchCallLogs:$}=await Promise.resolve().then(()=>q);return{syncIvryCallLogs:g,fetchCallLogs:$}},void 0),m=await l(o);m.error?D("同期失敗: "+m.error,"error"):(D(`${m.count}件の通話履歴を同期しました`),a.callLogs=await d(100),_())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const o=a.integrations.find(g=>g.provider==="ivry");if(!o||!o.isEnabled){D("IVRy連携が無効です","warning");return}if(!await ue("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:l}=await E(async()=>{const{syncPhoneBookToIvry:g}=await Promise.resolve().then(()=>q);return{syncPhoneBookToIvry:g}},void 0),d=[];a.masterStats?.customers.forEach(g=>{d.push({name:g.name,phone:"",customerCode:g.code,note:"既存取引先"})}),a.prospects.forEach(g=>{g.phone&&d.push({name:g.companyName,phone:g.phone,customerCode:g.id,note:`見込客 (${g.stage})`})});const m=await l(o,d);m.error?D("送信失敗: "+m.error,"error"):D(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=o.dataset.phone??"",m=prompt(`電話番号 ${d} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const g=a.callLogs.find(A=>A.id===l);if(!g)return;const{saveCallLog:$,fetchCallLogs:x}=await E(async()=>{const{saveCallLog:A,fetchCallLogs:S}=await Promise.resolve().then(()=>q);return{saveCallLog:A,fetchCallLogs:S}},void 0);await $({...g,matchedCustomerCode:m}),a.callLogs=await x(100),_()})}),e.querySelectorAll("[data-action='call-memo']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.callLogs.find(x=>x.id===l);if(!d)return;const m=prompt("メモを入力:",d.notes??"");if(m===null)return;const{saveCallLog:g,fetchCallLogs:$}=await E(async()=>{const{saveCallLog:x,fetchCallLogs:A}=await Promise.resolve().then(()=>q);return{saveCallLog:x,fetchCallLogs:A}},void 0);await g({...d,notes:m}),a.callLogs=await $(100),_()})}),e.querySelectorAll("[data-prospect-view]").forEach(o=>{o.addEventListener("click",()=>{a.prospectViewMode=o.dataset.prospectView,_()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",_()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:d}=await E(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>q);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(l)}_()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.prospectId??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:d}=await E(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>q);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(l)}_()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],_())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const o=a.prospectEditingId==="__new__",l=o?`p_${Date.now()}`:a.prospectEditingId??"",d={id:l,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!d.companyName){D("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:g,recordAudit:$,sendSlackNotification:x}=await E(async()=>{const{saveProspect:S,fetchProspects:C,recordAudit:I,sendSlackNotification:L}=await Promise.resolve().then(()=>q);return{saveProspect:S,fetchProspects:C,recordAudit:I,sendSlackNotification:L}},void 0);await m(d)?(o&&await x("new_prospect",`新規見込客: ${d.companyName} / 想定 ¥${d.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await $({action:o?"prospect_create":"prospect_update",entityType:"prospect",entityId:l,userEmail:a.user?.email}),a.prospects=await g(),a.prospectEditingId=null,_()):D("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteProspect:d,fetchProspects:m}=await E(async()=>{const{deleteProspect:g,fetchProspects:$}=await Promise.resolve().then(()=>q);return{deleteProspect:g,fetchProspects:$}},void 0);await d(l)&&(a.prospects=await m(),_())})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",l=e.querySelector("#prospect-activity-type")?.value??"call",d=e.querySelector("#prospect-activity-title")?.value??"";if(!d){D("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:g}=await E(async()=>{const{saveProspectActivity:$,fetchProspectActivities:x}=await Promise.resolve().then(()=>q);return{saveProspectActivity:$,fetchProspectActivities:x}},void 0);await m({id:`act_${Date.now()}`,prospectId:o,activityType:l,title:d,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await g(o),_()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("dragstart",l=>{l.dataTransfer?.setData("text/plain",o.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",async l=>{l.preventDefault();const d=l.dataTransfer?.getData("text/plain"),m=o.dataset.prospectStage;if(!d)return;const g=a.prospects.find($=>$.id===d);if(g&&g.stage!==m){const $={...g,stage:m},{saveProspect:x}=await E(async()=>{const{saveProspect:A}=await Promise.resolve().then(()=>q);return{saveProspect:A}},void 0);await x($),g.stage=m,_()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:o,saveIntegrationSetting:l}=await E(async()=>{const{fetchIntegrationSettings:A,saveIntegrationSetting:S}=await Promise.resolve().then(()=>q);return{fetchIntegrationSettings:A,saveIntegrationSetting:S}},void 0),m=(a.integrations.length>0?a.integrations:await o()).find(A=>A.provider==="slack");if(!m)return;const g=e.querySelector("#slack-webhook")?.value??"",$=e.querySelector("#slack-default-channel")?.value??"",x=e.querySelector("#slack-enabled")?.checked??!1;await l({...m,config:{...m.config,webhook_url:g,default_channel:$},isEnabled:x}),a.integrations=await o(),D("保存しました"),_()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:o,fetchSlackRules:l}=await E(async()=>{const{saveSlackRule:d,fetchSlackRules:m}=await Promise.resolve().then(()=>q);return{saveSlackRule:d,fetchSlackRules:m}},void 0);for(const d of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="enabled"]`)?.checked??d.enabled,g=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="channel"]`)?.value??d.channel;await o({...d,enabled:m,channel:g})}a.slackRules=await l(),D("ルールを保存しました"),_()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:o}=await E(async()=>{const{sendSlackNotification:d}=await Promise.resolve().then(()=>q);return{sendSlackNotification:d}},void 0),l=await o("new_order","🧪 これはテスト通知です (syusen-cloud)");l.ok?D("テスト送信成功"):D("送信失敗: "+(l.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,_()}),e.querySelectorAll("[data-action='material-adjust']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"",d=a.materialList.find(m=>m.id===l);d&&(a.materialEditing=d,a.materialEditingIsNew=!1,_())})}),e.querySelectorAll("[data-action='material-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,_())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const l={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(l.materialType=e.querySelector("#mat-type")?.value??"",!l.code||!l.name){D("コードと品名は必須です","warning");return}const{saveMaterial:d,fetchMaterialList:m}=await E(async()=>{const{saveMaterial:$,fetchMaterialList:x}=await Promise.resolve().then(()=>q);return{saveMaterial:$,fetchMaterialList:x}},void 0);await d(l)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,D("保存しました"),_()):D("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!o||!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:l,fetchMaterialList:d}=await E(async()=>{const{deleteMaterial:m,fetchMaterialList:g}=await Promise.resolve().then(()=>q);return{deleteMaterial:m,fetchMaterialList:g}},void 0);await l(o)&&(a.materialList=await d(),a.materialEditing=null,_())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",_()}),e.querySelectorAll("[data-action='user-edit']").forEach(o=>{o.addEventListener("click",()=>{a.userEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,_()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const o=a.userEditingId==="__new__",l=o?crypto.randomUUID():a.userEditingId??"",d=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!d||!m){D("名前とメールアドレスは必須です","warning");return}const g={id:l,email:d,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(o){const C=e.querySelector("#user-password")?.value??"";if(C.length<8){D("パスワードは8文字以上必要です","warning");return}try{await Fa(d,C)}catch(I){D("Auth登録失敗: "+(I instanceof Error?I.message:""),"error");return}}const{saveUserProfile:$,fetchUserProfiles:x,recordAudit:A}=await E(async()=>{const{saveUserProfile:C,fetchUserProfiles:I,recordAudit:L}=await Promise.resolve().then(()=>q);return{saveUserProfile:C,fetchUserProfiles:I,recordAudit:L}},void 0);await $(g)?(await A({action:o?"user_create":"user_update",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await x(),a.userEditingId=null,D("保存しました"),_()):D("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteUserProfile:d,fetchUserProfiles:m,recordAudit:g}=await E(async()=>{const{deleteUserProfile:x,fetchUserProfiles:A,recordAudit:S}=await Promise.resolve().then(()=>q);return{deleteUserProfile:x,fetchUserProfiles:A,recordAudit:S}},void 0);await d(l)?(await g({action:"user_delete",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await m(),_()):D("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const o=e.querySelector("#profile-sender")?.value??"",l={...a.myProfile,defaultMailSenderId:o},{saveUserProfile:d}=await E(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>q);return{saveUserProfile:m}},void 0);await d(l),a.myProfile=l,D("保存しました"),_()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const o=e.querySelector("#profile-new-password")?.value??"";if(o.length<8){D("8文字以上のパスワードを入力してください","warning");return}try{await Qn(o),D("パスワードを変更しました")}catch(l){D("変更失敗: "+(l instanceof Error?l.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(o=>{o.addEventListener("click",()=>{a.integrationEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,_()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='int-save']")?.dataset.id??"",l=a.integrations.find(A=>A.id===o);if(!l)return;const d={...l.config};Object.keys(d).forEach(A=>{const S=e.querySelector(`#int-${A}`);S&&(d[A]=S.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:g,fetchIntegrationSettings:$}=await E(async()=>{const{saveIntegrationSetting:A,fetchIntegrationSettings:S}=await Promise.resolve().then(()=>q);return{saveIntegrationSetting:A,fetchIntegrationSettings:S}},void 0);await g({...l,config:d,isEnabled:m})?(a.integrations=await $(),a.integrationEditingId=null,D("保存しました"),_()):D("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find($=>$.provider==="shopify");if(!l){D("Shopify連携が未設定です","warning");return}o.textContent="同期中…",o.disabled=!0;const{syncShopifyOrders:d,fetchShopifyOrders:m}=await E(async()=>{const{syncShopifyOrders:$,fetchShopifyOrders:x}=await Promise.resolve().then(()=>q);return{syncShopifyOrders:$,fetchShopifyOrders:x}},void 0),g=await d(l);g.error?D("同期失敗: "+g.error,"error"):(D(`${g.count}件を同期しました`),a.shopifyOrders=await m()),_()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find($=>$.provider==="google_calendar");if(!l)return;o.textContent="同期中…",o.disabled=!0;const{syncGoogleCalendar:d,fetchCalendarEvents:m}=await E(async()=>{const{syncGoogleCalendar:$,fetchCalendarEvents:x}=await Promise.resolve().then(()=>q);return{syncGoogleCalendar:$,fetchCalendarEvents:x}},void 0),g=await d(l);g.error?D("同期失敗: "+g.error,"error"):(D(`${g.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),_()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const l=e.querySelector("#fax-file")?.files?.[0];if(!l){D("FAX画像を選択してください","warning");return}const d=a.integrations.find(m=>m.provider==="cloud_vision");if(!d||!d.config.api_key){D("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,_();try{const m=new FileReader;m.onload=async()=>{const g=String(m.result??""),{ocrFaxImage:$,saveFaxRecord:x,fetchFaxInbox:A}=await E(async()=>{const{ocrFaxImage:L,saveFaxRecord:T,fetchFaxInbox:R}=await Promise.resolve().then(()=>q);return{ocrFaxImage:L,saveFaxRecord:T,fetchFaxInbox:R}},void 0),S=await $(d,g),C=e.querySelector("#fax-sender-name")?.value??"",I=e.querySelector("#fax-sender-phone")?.value??"";await x({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:C,senderPhone:I,ocrStatus:S.error?"failed":"done",ocrText:S.text}),a.faxOcrText=S.error?`エラー: ${S.error}`:S.text,a.faxRecords=await A(),a.faxProcessing=!1,_()},m.readAsDataURL(l)}catch(m){D("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,_()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",_()}),e.querySelectorAll("[data-action='ms-edit']").forEach(o=>{o.addEventListener("click",()=>{a.mailSenderEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,_()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,l={id:o,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find($=>$.id===o)?.isVerified??!1};if(!l.name||!l.email){D("名前とメールアドレスは必須です","warning");return}const{saveMailSender:d,fetchMailSenders:m}=await E(async()=>{const{saveMailSender:$,fetchMailSenders:x}=await Promise.resolve().then(()=>q);return{saveMailSender:$,fetchMailSenders:x}},void 0);await d(l)?(a.mailSenders=await m(),a.mailSenderEditingId=null,D("保存しました"),_()):D("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteMailSender:d,fetchMailSenders:m}=await E(async()=>{const{deleteMailSender:$,fetchMailSenders:x}=await Promise.resolve().then(()=>q);return{deleteMailSender:$,fetchMailSenders:x}},void 0);await d(l)?(a.mailSenders=await m(),_()):D("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(o=>{o.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){D("データなし","error");return}const o=a.demandAnalysis,l=Object.entries(o.matrix).map(([m,g])=>{const $={productCode:m};return o.months.forEach(x=>{$[x]=g[x]??0}),$}),d=[{key:"productCode",label:"商品コード"},...o.months.map(m=>({key:m,label:m}))];pa("demand-analysis.csv",l,d)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){D("データなし","error");return}const o=a.productionPlan.map(d=>({...d}));pa("production-plan.csv",o,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数量"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await ue("当月の全請求を締め切りますか？")&&D("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async o=>{const l=parseInt(o.target.value);a.brewingPlanFY=l;const{fetchBrewingPlanSummary:d,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:g}=await E(async()=>{const{fetchBrewingPlanSummary:S,fetchBrewingMonthlyTrend:C,fetchBrewingSchedule:I}=await Promise.resolve().then(()=>q);return{fetchBrewingPlanSummary:S,fetchBrewingMonthlyTrend:C,fetchBrewingSchedule:I}},void 0),[$,x,A]=await Promise.all([d(`${l}-10-01`,`${l+1}-09-30`),m(`${l}-10-01`,`${l+1}-09-30`),g(l)]);a.brewingPlanData=$,a.brewingMonthlyTrend=x,a.brewingSchedule=A,_()}),e.querySelectorAll(".btn-edit-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"";e.querySelector(`#stock-display-${l}`).style.display="none",e.querySelector(`#stock-edit-${l}`).style.display="",o.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"";e.querySelector(`#stock-display-${l}`).style.display="",e.querySelector(`#stock-edit-${l}`).style.display="none",e.querySelector(`.btn-edit-stock[data-cat-id="${l}"]`).style.display=""})}),e.querySelectorAll(".btn-add-schedule-row").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",d=e.querySelector(`#schedule-rows-${l}`);if(!d)return;const m=d.querySelectorAll(".schedule-edit-row").length,g=document.createElement("div");g.innerHTML=buildScheduleEditRowHTML(l,m,9,2,0,"");const $=g.firstElementChild;d.appendChild($),$.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>$.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(o=>{o.addEventListener("click",()=>o.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=o.dataset.catId??"",m=e.querySelector(`#stock-input-${d}`),g=e.querySelector(`#cost-input-${d}`),$=parseFloat(m?.value??""),x=parseFloat(g?.value??"0")||0;if(isNaN($)||$<0){alert("有効な数値を入力してください");return}const A=[...e.querySelectorAll(`#schedule-rows-${d} .schedule-edit-row`)].map(S=>({brewMonth:parseInt(S.querySelector(".schedule-month")?.value??"0"),durationMonths:parseInt(S.querySelector(".schedule-duration")?.value??"2"),plannedVolumeL:parseFloat(S.querySelector(".schedule-volume")?.value??"0")})).filter(S=>S.brewMonth>=1&&S.brewMonth<=12);o.textContent="保存中...",o.setAttribute("disabled","true");try{const{upsertBrewingStock:S,saveBrewingSchedule:C,fetchBrewingPlanSummary:I,fetchBrewingMonthlyTrend:L,fetchBrewingSchedule:T}=await E(async()=>{const{upsertBrewingStock:oe,saveBrewingSchedule:ve,fetchBrewingPlanSummary:ie,fetchBrewingMonthlyTrend:M,fetchBrewingSchedule:X}=await Promise.resolve().then(()=>q);return{upsertBrewingStock:oe,saveBrewingSchedule:ve,fetchBrewingPlanSummary:ie,fetchBrewingMonthlyTrend:M,fetchBrewingSchedule:X}},void 0),R=a.brewingPlanFY;await Promise.all([S(l,$,x),C(l,R,A)]);const[j,K,se]=await Promise.all([I(`${R}-10-01`,`${R+1}-09-30`),L(`${R}-10-01`,`${R+1}-09-30`),T(R)]);a.brewingPlanData=j,a.brewingMonthlyTrend=K,a.brewingSchedule=se,_()}catch(S){console.error("[brewing save]",S),alert(`保存エラー: ${String(S)}`),o.textContent="保存",o.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(o=>{o.addEventListener("click",()=>{const d=`sub-row-${(o.dataset.toggleCat??"").replace(/[^a-zA-Z0-9]/g,"_")}`,m=e.querySelectorAll(`.${d}`),g=o.querySelector(".toggle-icon"),$=m[0]?.style.display!=="none";m.forEach(x=>{x.style.display=$?"none":""}),g&&(g.innerHTML=$?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{D("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{D("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{D("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{D("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(o=>{o.addEventListener("click",async()=>{await ue("この買掛を入金済みにしますか？")&&D("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(o=>{o.addEventListener("click",()=>{D("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{D("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.closest("tr")?.querySelector("td")?.textContent??"";D(`タンク ${l} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{D("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.closest("tr")?.querySelector("td")?.textContent??"";D(`注文 ${l} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{D("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(o=>{o.addEventListener("click",()=>{D("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{D("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.customer??"";D(`得意先 ${l} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{D("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!o||!await ue("このリストを削除しますか？"))return;const{supabaseDelete:d}=await E(async()=>{const{supabaseDelete:g}=await Promise.resolve().then(()=>z);return{supabaseDelete:g}},void 0);if(await d("lead_lists",o)){const{fetchLeadLists:g}=await E(async()=>{const{fetchLeadLists:$}=await Promise.resolve().then(()=>q);return{fetchLeadLists:$}},void 0);a.leadLists=await g(),D("削除しました","success"),_()}else D("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{D("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.scYm;if(!l)return;a.shipmentCalendarYearMonth=l,a.shipmentCalendarData=null,a.shipmentCalendarSelectedDate=null,_();const{fetchShipmentCalendar:d}=await E(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>q);return{fetchShipmentCalendar:m}},void 0);a.shipmentCalendarData=await d(l),_()})}),e.querySelectorAll("[data-sc-date]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.scDate;l&&(a.shipmentCalendarSelectedDate=a.shipmentCalendarSelectedDate===l?null:l,_())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(o=>{o.addEventListener("click",async()=>{a.calendarYearMonth=o.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:l}=await E(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>q);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await l(a.calendarYearMonth),_()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async o=>{a.calendarYearMonth=o.target.value;const{fetchCalendarEvents:l}=await E(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>q);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await l(a.calendarYearMonth),_()}),e.querySelector("#cal-filter-category")?.addEventListener("change",o=>{a.calendarFilterCategory=o.target.value,_()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const o=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(o.getTime()+3600*1e3).toISOString(),isAllDay:!1}},_()}),e.querySelectorAll("[data-cal-date]").forEach(o=>{o.tagName!=="BUTTON"&&o.addEventListener("click",l=>{if(l.target.closest(".cal-event"))return;const d=o.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${d}T10:00:00`,isAllDay:!1}},_()})}),e.querySelectorAll("[data-cal-event-id]").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const d=o.dataset.calEventId,m=a.calendarEvents.find(g=>g.id===d);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},_())})}),e.querySelectorAll("[data-action='cal-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.calendarEdit=null,_())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:o,fetchCalendarEvents:l,CALENDAR_CATEGORY_COLORS:d}=await E(async()=>{const{saveCalendarEvent:A,fetchCalendarEvents:S,CALENDAR_CATEGORY_COLORS:C}=await Promise.resolve().then(()=>q);return{saveCalendarEvent:A,fetchCalendarEvents:S,CALENDAR_CATEGORY_COLORS:C}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,g=e.querySelector("#cal-category")?.value??"general",$={id:m,title:e.querySelector("#cal-title")?.value??"",category:g,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:d[g]};if(!$.title){D("タイトルは必須です","warning");return}await o($)?(a.calendarEvents=await l(a.calendarYearMonth),a.calendarEdit=null,D("保存しました"),_()):D("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!o||!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:l,fetchCalendarEvents:d}=await E(async()=>{const{deleteCalendarEvent:g,fetchCalendarEvents:$}=await Promise.resolve().then(()=>q);return{deleteCalendarEvent:g,fetchCalendarEvents:$}},void 0);await l(o)?(a.calendarEvents=await d(a.calendarYearMonth),a.calendarEdit=null,D("削除しました"),_()):D("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,_();try{const o=a.importPreview.rows.filter(d=>d._valid),l=await dc(a.importEntity,o);a.importResult=`取り込み完了: ${l.inserted}件成功 / ${l.failed}件失敗`,a.importPreview=null}catch(o){a.importResult=`エラー: ${o instanceof Error?o.message:String(o)}`}finally{a.importing=!1,_()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const o=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=o,a.storeSales=[],a.actionLoading=!0,_(),Pa(o).then(l=>{a.storeSales=l,a.actionLoading=!1,_()})}),e.querySelectorAll("[data-action='copy-config']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.configValue??"";if(l)try{await navigator.clipboard.writeText(l),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(d){console.warn("Clipboard copy failed",d)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const l=JSON.stringify({supabase_url:ae,supabase_anon_key:V,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),d=new Blob([l],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(d),g=document.createElement("a");g.href=m,g.download="relay_config.json",g.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.code??"";if(l)try{await navigator.clipboard.writeText(decodeURIComponent(l)),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(d){console.warn("Clipboard code copy failed",d)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(o=>{o.addEventListener("change",()=>{Ce(e),a.emailSaveMessage=null,_()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(o=>{o.addEventListener("change",()=>{Ce(e),a.emailSaveMessage=null,_()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{Ce(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{Ce(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(o=>{o.addEventListener("click",()=>{a.emailTemplateId=o.dataset.templateId??"custom";const l=Dn(a.emailTemplateId);a.emailSubject=l.subject,a.emailBody=l.body,a.emailSaveMessage=null,_()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{Ce(e);const o=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${o}`),a.emailSaveMessage=null,_()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{Ce(e),a.actionLoading=!0,_(),$t(Xt("draft")).then(o=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(o.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,_()})}),e.querySelector("#email-sender")?.addEventListener("change",o=>{a.emailSenderId=o.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{Ce(e),a.actionLoading=!0,a.emailSending=!0,_();const o=Xt("sent");a.mailSenders.find(l=>l.id===a.emailSenderId),Zs().then(async l=>{await $t({...o,recipientCount:l.sent}),a.emailSaveMessage=`${l.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,_(),D(`${l.sent}件送信完了`)}).catch(async()=>{await $t(Xt("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,_(),D("APIキー未設定のため下書き保存しました","warning")})})}function _(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=Cd()}catch(s){console.error("[renderApp] render error:",s),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(s)}

${s?.stack??""}</div>`;return}qd(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Ra()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const s of["fd-scaler","print-scaler","q-preview-scaler"]){const n=e.querySelector(`#${s}`),i=n?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),r=i?.querySelector(".print-page")??i;if(!n||!r)continue;const c=n.parentElement?.clientWidth??0,p=r.offsetWidth;if(c>0&&p>0&&p>c-24){const u=(c-24)/p;n.style.transform=`scale(${u})`,n.style.transformOrigin="top left",n.style.height=`${(r.offsetHeight+48)*u}px`}else n.style.transform="",n.style.height=""}});const t=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const On="sake-cloud-cache",Id=300*1e3;function Td(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(On,JSON.stringify(e))}catch{}}function Nd(){try{const e=localStorage.getItem(On);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Id?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let jn=0;async function Ve(){const e=Nd();e&&(a.loading=!1,_()),a.loading=!e,e||_();try{const[t,s,n,i,r,c,p,u,y]=await Promise.all([Cs(),Es(),ba(),Ls(),nt(a.invoiceFilter),$a(a.ledgerCustomerCode),_a(),Ds(),As("quote_company")]);if(a.salesSummary=t,a.paymentStatus=s,a.masterStats=n,a.pipelineMeta=i,a.invoiceRecords=r,a.customerLedger=c,a.salesAnalytics=p,a.syncDashboard=u,y){const f={...wt,...aa(),...y};a.quoteCompanySettings=f,Le(f)}if(Ns().then(f=>{a.announcements=f,_()}),Be.length===0&&ud(),a.rawTableList.length===0&&rn().then(f=>{a.rawTableList=f,a.route==="/raw-browser"&&_()}),!a.salesFilter.startDate||!a.salesFilter.endDate){const v=[...t.salesRecords].sort((P,o)=>new Date(o.date).getTime()-new Date(P.date).getTime())[0]?.date??new Date().toISOString(),b=new Date(v),w=new Date(b);w.setDate(b.getDate()-30),a.salesFilter={startDate:bs(w.toISOString()),endDate:bs(b.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await nt(a.invoiceFilter)),a.error=null,Td()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,_(),Oa(a.route),jn=Date.now()}}window.addEventListener("popstate",()=>{a.route=qn(location.pathname),a.currentCategory=Ma(a.route),a.sidebarOpen=!1,it(),Oa(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,_();return}if(e.key==="Escape"){if(a.globalSearchOpen){it(),_();return}if(a.pickerMode){Ct(),_();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(In(),_());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Nn(t)}});a.user=Lt()?Un():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await E(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>q);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),_()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const s=localStorage.getItem("sake_fd_positions");s&&(a.fdSavedPositions=JSON.parse(s))}catch{}(function(){let t=null,s=0,n=0,i=0,r=0,c=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const f=y.getBoundingClientRect();if(f.width===0)return;c=228.6/f.width,t=u,s=p.clientX,n=p.clientY,i=parseFloat(u.style.left)||0,r=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(P=>P.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const v=document.querySelector("#fd-selected-info");v&&(v.textContent=`選択中: ${u.title}`);const b=document.querySelector("#fd-sel-x"),w=document.querySelector("#fd-sel-y");b&&(b.value=String(i)),w&&(w.value=String(r))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-s)*c,y=(p.clientY-n)*c,f=Math.round((i+u)*2)/2,v=Math.round((r+y)*2)/2;t.style.left=f+"mm",t.style.top=v+"mm";const b=document.querySelector("#fd-sel-x"),w=document.querySelector("#fd-sel-y");b&&(b.value=String(f)),w&&(w.value=String(v))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const y=.5;let f=parseFloat(u.style.left)||0,v=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?f-=y:p.key==="ArrowRight"?f+=y:p.key==="ArrowUp"?v-=y:p.key==="ArrowDown"&&(v+=y),u.style.left=f+"mm",u.style.top=v+"mm";const b=document.querySelector("#fd-sel-x"),w=document.querySelector("#fd-sel-y");b&&(b.value=String(f)),w&&(w.value=String(v))})})();Ve();const Md=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&Ve()},Md);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-jn>60*1e3&&Ve()});let ma="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{ma=e}).catch(()=>{});setInterval(async()=>{if(!(!ma||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==ma&&!a.updateAvailable&&(a.updateAvailable=!0,_())}catch{}},120*1e3);
